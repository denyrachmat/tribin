<div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
    <h1 class="h2">Stock Take Approval</h1>
    <div class="btn-toolbar mb-2 mb-md-0">
        <div class="btn-group btn-group-sm">
            <button type="button" class="btn btn-outline-primary" onclick="loadBatches(this)">
                <i class="fas fa-sync"></i> Refresh
            </button>
        </div>
    </div>
</div>

<div class="row">
    <div class="col mb-1" id="stk-alert"></div>
</div>

<div class="row">
    <div class="col">
        <table id="tblBatches" class="table table-sm table-striped table-bordered" style="width:100%">
            <thead>
                <tr>
                    <th>Document</th><th>Date</th><th>Branch</th><th>Submitted By</th>
                    <th>Items</th><th>Status</th><th></th>
                </tr>
            </thead>
            <tbody></tbody>
        </table>
    </div>
</div>

<!-- Review modal -->
<div class="modal fade" id="reviewModal" tabindex="-1">
    <div class="modal-dialog modal-xl modal-dialog-scrollable">
        <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="reviewTitle">Review Stock Take</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body">
                <div class="alert alert-info py-2">
                    Counted figures are staged only. Nothing is written to stock until you approve.
                    The <b>Diff</b> column is what will be applied (negative = add to stock, positive = remove).
                    Batches over {{ number_format($postLimit ?? 3000) }} rows can't be approved in one click
                    (Cloudflare request limit) — split the count sheet instead.
                </div>
                <table id="tblReview" class="table table-sm table-bordered" style="width:100%">
                    <thead>
                        <tr>
                            <th>Item</th><th>Name</th><th>Location</th><th>UOM</th>
                            <th class="text-end">Current</th><th class="text-end">Counted</th>
                            <th class="text-end">Diff</th><th>Adjustment</th>
                        </tr>
                    </thead>
                    <tbody id="reviewBody"></tbody>
                </table>
            </div>
            <div class="modal-footer">
                <input type="text" class="form-control form-control-sm me-2" id="rejectNote"
                    placeholder="Rejection reason (required to reject)" style="max-width:340px">
                <button class="btn btn-sm btn-danger" onclick="doReject(this)">Reject</button>
                <button class="btn btn-sm btn-success" onclick="doApprove(this)">Approve &amp; Post</button>
            </div>
        </div>
    </div>
</div>

<script>
    let dtBatches = null;
    let currentDocno = null;

    function loadBatches(btn) {
        if (btn) { btn.disabled = true; }
        $.get('inventory/stockTakePending', function(res) {
            const rows = (res.data || []).map(b => [
                b.TRCV_DOCNO ?? '', b.TRCV_ISSUDT ?? '', b.TRCV_BRANCH ?? '',
                b.TRCV_SUBMITTED_BY ?? b.created_by ?? '',
                b.STAGED_ROWS ?? 0,
                `<span class="badge text-bg-warning">${b.TRCV_STK_STATUS ?? ''}</span>`,
                `<button class="btn btn-sm btn-primary" onclick="openReview('${b.TRCV_DOCNO}')">Review</button>`
            ]);
            if (dtBatches) { dtBatches.destroy(); }
            dtBatches = $('#tblBatches').DataTable({
                data: rows, order: [], columnDefs: [{ targets: 6, orderable: false }]
            });
        }).always(() => { if (btn) { btn.disabled = false; } });
    }

    function openReview(docno) {
        currentDocno = docno;
        $('#reviewTitle').text('Review Stock Take — ' + docno);
        $('#rejectNote').val('');
        $('#reviewBody').html('<tr><td colspan="8" class="text-center">Loading…</td></tr>');
        new bootstrap.Modal(document.getElementById('reviewModal')).show();

        $.post('inventory/stockTakeApprovalDetail', { docno: docno, _token: '{{ csrf_token() }}' }, function(res) {
            let html = '';
            (res.data || []).forEach(r => {
                const cls = r.diff > 0 ? 'text-danger' : (r.diff < 0 ? 'text-success' : 'text-muted');
                html += `<tr>
                    <td>${r.item}</td><td>${r.item_name ?? ''}</td><td>${r.loc}</td><td>${r.uom ?? ''}</td>
                    <td class="text-end">${Number(r.current).toLocaleString()}</td>
                    <td class="text-end">${Number(r.target).toLocaleString()}</td>
                    <td class="text-end ${cls}">${Number(r.diff).toLocaleString()}</td>
                    <td>${r.form}</td></tr>`;
            });
            $('#reviewBody').html(html || '<tr><td colspan="8" class="text-center text-muted">No staged rows.</td></tr>');
        });
    }

    function doApprove(btn) {
        if (!confirm('Post these adjustments to stock?')) return;
        btn.disabled = true;
        $.post('inventory/stockTakeApprove', { docno: currentDocno, _token: '{{ csrf_token() }}' })
            .done(res => {
                alertify.success(res.msg ?? 'Approved');
                bootstrap.Modal.getInstance(document.getElementById('reviewModal')).hide();
                loadBatches();
            })
            .fail(xhr => {
                let m = ''; const rj = xhr.responseJSON;
                if (rj) { Object.keys(rj).forEach(k => { m += (Array.isArray(rj[k]) ? rj[k].join(' ') : rj[k]) + ' '; }); }
                $('#stk-alert').html(`<div class="alert alert-danger py-2">${m || 'Approve failed'}</div>`);
            })
            .always(() => { btn.disabled = false; });
    }

    function doReject(btn) {
        const note = $('#rejectNote').val().trim();
        if (!note) { alertify.warning('Rejection reason is required'); return; }
        if (!confirm('Reject this count sheet? Nothing will be posted.')) return;
        btn.disabled = true;
        $.post('inventory/stockTakeReject', { docno: currentDocno, note: note, _token: '{{ csrf_token() }}' })
            .done(res => {
                alertify.success(res.msg ?? 'Rejected');
                bootstrap.Modal.getInstance(document.getElementById('reviewModal')).hide();
                loadBatches();
            })
            .fail(xhr => {
                alertify.error(xhr.responseJSON ? JSON.stringify(xhr.responseJSON) : 'Reject failed');
            })
            .always(() => { btn.disabled = false; });
    }

    $(function() { loadBatches(); });
</script>
