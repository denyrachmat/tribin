<div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
    <h1 class="h2">Stock Adjustment Approval</h1>
    <div class="btn-toolbar mb-2 mb-md-0">
        <div class="btn-group btn-group-sm">
            <button type="button" class="btn btn-outline-primary" onclick="loadAdjBatches(this)">
                <i class="fas fa-sync"></i> Refresh
            </button>
        </div>
    </div>
</div>

<div class="row">
    <div class="col mb-1" id="adjap-alert"></div>
</div>

<div class="row">
    <div class="col">
        <table id="tblAdjBatches" class="table table-sm table-striped table-bordered" style="width:100%">
            <thead>
                <tr>
                    <th>Document</th><th>Date</th><th>Branch</th><th>Submitted By</th>
                    <th>Reason</th><th>Rows</th><th>Status</th><th></th>
                </tr>
            </thead>
            <tbody></tbody>
        </table>
    </div>
</div>

<!-- Review modal -->
<div class="modal fade" id="adjReviewModal" tabindex="-1">
    <div class="modal-dialog modal-xl modal-dialog-scrollable">
        <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="adjReviewTitle">Review Adjustment</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body">
                <div class="alert alert-info py-2">
                    The requested <b>Delta</b> is applied exactly as submitted (increase = +, decrease = −).
                    Resulting stock cannot go negative. Batches over {{ number_format($postLimit ?? 3000) }} rows
                    can't be approved in one click (Cloudflare request limit).
                </div>
                <table id="tblAdjReview" class="table table-sm table-bordered" style="width:100%">
                    <thead>
                        <tr>
                            <th>Item</th><th>Name</th><th>Location</th><th>UOM</th>
                            <th class="text-end">Current</th><th class="text-end">Delta</th>
                            <th class="text-end">After</th><th>Form</th>
                        </tr>
                    </thead>
                    <tbody id="adjReviewBody"></tbody>
                </table>
            </div>
            <div class="modal-footer">
                <input type="text" class="form-control form-control-sm me-2" id="adjRejectNote"
                    placeholder="Rejection reason (required to reject)" style="max-width:340px">
                <button class="btn btn-sm btn-danger" onclick="adjReject(this)">Reject</button>
                <button class="btn btn-sm btn-success" onclick="adjApprove(this)">Approve &amp; Post</button>
            </div>
        </div>
    </div>
</div>

<script>
    let dtAdj = null;
    let adjDocno = null;

    function loadAdjBatches(btn) {
        if (btn) { btn.disabled = true; }
        $.get('inventory/stockAdjustmentPending', function(res) {
            const rows = (res.data || []).map(b => [
                b.TRCV_DOCNO ?? '', b.TRCV_ISSUDT ?? '', b.TRCV_BRANCH ?? '',
                b.TRCV_SUBMITTED_BY ?? b.created_by ?? '',
                b.TRCV_STK_APPROVAL_NOTE ?? '',
                b.STAGED_ROWS ?? 0,
                `<span class="badge text-bg-warning">${b.TRCV_STK_STATUS ?? ''}</span>`,
                `<button class="btn btn-sm btn-primary" onclick="openAdjReview('${b.TRCV_DOCNO}')">Review</button>`
            ]);
            if (dtAdj) { dtAdj.destroy(); }
            dtAdj = $('#tblAdjBatches').DataTable({
                data: rows, order: [], columnDefs: [{ targets: 7, orderable: false }]
            });
        }).always(() => { if (btn) { btn.disabled = false; } });
    }

    function openAdjReview(docno) {
        adjDocno = docno;
        $('#adjReviewTitle').text('Review Adjustment — ' + docno);
        $('#adjRejectNote').val('');
        $('#adjReviewBody').html('<tr><td colspan="8" class="text-center">Loading…</td></tr>');
        new bootstrap.Modal(document.getElementById('adjReviewModal')).show();

        $.post('inventory/stockAdjustmentApprovalDetail', { docno: adjDocno, _token: '{{ csrf_token() }}' }, function(res) {
            let html = '';
            (res.data || []).forEach(r => {
                const cls = r.delta > 0 ? 'text-success' : (r.delta < 0 ? 'text-danger' : 'text-muted');
                const afterCls = r.after < 0 ? 'text-danger fw-bold' : '';
                html += `<tr>
                    <td>${r.item}</td><td>${r.item_name ?? ''}</td><td>${r.loc}</td><td>${r.uom ?? ''}</td>
                    <td class="text-end">${Number(r.current).toLocaleString()}</td>
                    <td class="text-end ${cls}">${r.delta > 0 ? '+' : ''}${Number(r.delta).toLocaleString()}</td>
                    <td class="text-end ${afterCls}">${Number(r.after).toLocaleString()}</td>
                    <td>${r.form}</td></tr>`;
            });
            $('#adjReviewBody').html(html || '<tr><td colspan="8" class="text-center text-muted">No staged rows.</td></tr>');
        });
    }

    function adjApprove(btn) {
        if (!confirm('Post these adjustments to stock?')) return;
        btn.disabled = true;
        $.post('inventory/stockAdjustmentApprove', { docno: adjDocno, _token: '{{ csrf_token() }}' })
            .done(res => {
                alertify.success(res.msg ?? 'Approved');
                bootstrap.Modal.getInstance(document.getElementById('adjReviewModal')).hide();
                loadAdjBatches();
            })
            .fail(xhr => {
                let m = ''; const rj = xhr.responseJSON;
                if (rj) { Object.keys(rj).forEach(k => { m += (Array.isArray(rj[k]) ? rj[k].join(' ') : rj[k]) + ' '; }); }
                $('#adjap-alert').html(`<div class="alert alert-danger py-2">${m || 'Approve failed'}</div>`);
            })
            .always(() => { btn.disabled = false; });
    }

    function adjReject(btn) {
        const note = $('#adjRejectNote').val().trim();
        if (!note) { alertify.warning('Rejection reason is required'); return; }
        if (!confirm('Reject this adjustment? Nothing will be posted.')) return;
        btn.disabled = true;
        $.post('inventory/stockAdjustmentReject', { docno: adjDocno, note: note, _token: '{{ csrf_token() }}' })
            .done(res => {
                alertify.success(res.msg ?? 'Rejected');
                bootstrap.Modal.getInstance(document.getElementById('adjReviewModal')).hide();
                loadAdjBatches();
            })
            .fail(xhr => {
                alertify.error(xhr.responseJSON ? JSON.stringify(xhr.responseJSON) : 'Reject failed');
            })
            .always(() => { btn.disabled = false; });
    }

    $(function() { loadAdjBatches(); });
</script>
