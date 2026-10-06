<div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
    <h1 class="h2">Approval History</h1>
    <div class="btn-toolbar mb-2 mb-md-0">
        <div class="btn-group btn-group-sm">
            <button type="button" class="btn btn-outline-primary" onclick="btnReloadHistory(this)">
                <i class="fas fa-sync"></i> Refresh
            </button>
        </div>
    </div>
</div>

<form id="history-filter-form">
    <div class="row">
        <div class="col-md-3 mb-1">
            <div class="input-group input-group-sm mb-1">
                <span class="input-group-text">Module</span>
                <select class="form-select form-select-sm" id="histForm">
                    <option value="">-- All modules --</option>
                    <option value="SPK">SPK</option>
                    <option value="STK">Stock Take</option>
                    <option value="ADJ">Stock Adjustment</option>
                    <option value="QUOTATION">Quotation</option>
                    <option value="PURCHASE_REQUEST">Purchase Request</option>
                    <option value="PURCHASE_ORDER">Purchase Order</option>
                    <option value="SERVICE">Service</option>
                </select>
            </div>
        </div>
        <div class="col-md-3 mb-1">
            <div class="input-group input-group-sm mb-1">
                <span class="input-group-text">Document</span>
                <input type="text" class="form-control" id="histCode" placeholder="Document no / id">
            </div>
        </div>
        <div class="col-md-2 mb-1">
            <div class="input-group input-group-sm mb-1">
                <span class="input-group-text">Rows</span>
                <input type="number" class="form-control" id="histLimit" value="50" min="5" max="100">
            </div>
        </div>
    </div>
</form>

<div class="row mt-3">
    <div class="col">
        <ul class="nav nav-tabs" id="histTab" role="tablist">
            <li class="nav-item" role="presentation">
                <button class="nav-link active" id="tab-recent-btn" data-bs-toggle="tab"
                    data-bs-target="#tab-recent" type="button" role="tab">Recent Activity</button>
            </li>
            <li class="nav-item" role="presentation">
                <button class="nav-link" id="tab-doc-btn" data-bs-toggle="tab"
                    data-bs-target="#tab-doc" type="button" role="tab">By Document</button>
            </li>
        </ul>

        <div class="tab-content border border-top-0 p-2">
            <div class="tab-pane fade show active" id="tab-recent" role="tabpanel">
                <table id="tblRecent" class="table table-sm table-striped table-bordered" style="width:100%">
                    <thead>
                        <tr>
                            <th>When</th><th>Module</th><th>Document</th><th>Action</th>
                            <th>By</th><th>Note</th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>
            </div>
            <div class="tab-pane fade" id="tab-doc" role="tabpanel">
                <div class="row mb-2">
                    <div class="col">
                        <div class="input-group input-group-sm">
                            <span class="input-group-text">Module</span>
                            <select class="form-select form-select-sm" id="histFormDoc">
                                <option value="SPK">SPK</option>
                                <option value="STK">Stock Take</option>
                                <option value="ADJ">Stock Adjustment</option>
                                <option value="QUOTATION">Quotation</option>
                            </select>
                            <span class="input-group-text">Document</span>
                            <input type="text" class="form-control" id="histCodeDoc" placeholder="e.g. 41">
                            <button class="btn btn-primary" type="button" onclick="loadTimeline()">
                                <i class="fas fa-search"></i> Show
                            </button>
                        </div>
                    </div>
                </div>
                <div id="timelineWrap" class="ps-3"></div>
            </div>
        </div>
    </div>
</div>

<script>
    let dtRecent = null;
    const ACTION_COLOR = {
        SUBMITTED: 'secondary', APPROVED: 'success', REJECTED: 'danger',
        REVISED: 'warning', REVOKED: 'dark', POSTED: 'primary'
    };

    function actionBadge(a) {
        const c = ACTION_COLOR[a] || (/^LEGACY/.test(a || '') ? 'light' : 'secondary');
        return `<span class="badge text-bg-${c}">${a ?? '-'}</span>`;
    }

    function btnReloadHistory() { loadRecent(); }

    function loadRecent() {
        const params = {
            form: $('#histForm').val(),
            limit: $('#histLimit').val() || 50,
        };
        if ($('#histCode').val().trim()) { params.code = $('#histCode').val().trim(); }

        $.ajax({
            type: 'GET', url: 'approval/history/recent', data: params, dataType: 'json',
            success: function(res) {
                const rows = (res.data || []).map(r => [
                    r.at ?? '', r.form ?? '', r.code ?? '', actionBadge(r.action),
                    r.by ?? '', r.note ?? ''
                ]);
                if (dtRecent) { dtRecent.destroy(); }
                dtRecent = $('#tblRecent').DataTable({
                    data: rows, order: [[0, 'desc']],
                    columnDefs: [{ targets: 3, orderable: false }]
                });
            }
        });
    }

    function loadTimeline() {
        const form = $('#histFormDoc').val();
        const code = $('#histCodeDoc').val().trim();
        if (!code) { alertify.warning('Document is required'); return; }

        $.ajax({
            type: 'GET', url: 'approval/history', data: { form: form, code: code }, dataType: 'json',
            success: function(res) {
                const rows = res.data || [];
                if (rows.length === 0) {
                    $('#timelineWrap').html('<div class="text-muted">No history for this document.</div>');
                    return;
                }
                let html = `<table class="table table-sm table-bordered mb-0" style="max-width:900px">
                    <thead><tr><th>When</th><th>Action</th><th>By</th><th>Note</th></tr></thead><tbody>`;
                rows.forEach(r => {
                    html += `<tr><td>${r.at ?? ''}</td><td>${actionBadge(r.action)}</td>
                             <td>${r.by ?? ''}</td><td>${r.note ?? ''}</td></tr>`;
                });
                html += '</tbody></table>';
                $('#timelineWrap').html(html);
            }
        });
    }

    $(function() { loadRecent(); });
</script>
