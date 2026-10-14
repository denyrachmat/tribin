<div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
    <h1 class="h2">Stock Adjustment</h1>
    <div class="btn-toolbar mb-2 mb-md-0">
        <div class="btn-group btn-group-sm">
            <button type="button" class="btn btn-outline-secondary" onclick="addRow()">
                <i class="fas fa-plus"></i> Add Row
            </button>
        </div>
    </div>
</div>

<div class="row">
    <div class="col mb-2" id="adj-alert"></div>
</div>

<div class="row">
    <div class="col">
        <table class="table table-sm table-bordered align-middle" id="tblAdj">
            <thead class="table-light">
                <tr>
                    <th style="min-width:240px">Item</th>
                    <th style="min-width:170px">Location</th>
                    <th style="width:110px">Type</th>
                    <th style="width:110px">Qty</th>
                    <th style="width:150px">Current Stock</th>
                    <th style="width:150px">After</th>
                    <th style="width:50px"></th>
                </tr>
            </thead>
            <tbody></tbody>
        </table>
    </div>
</div>

<div class="row">
    <div class="col mb-3">
        <label class="form-label small text-muted mb-1">Reason / Note (required)</label>
        <input type="text" class="form-control form-control-sm" id="adjNote" maxlength="255"
            placeholder="e.g. damaged goods write-off, cycle count correction">
    </div>
</div>

<div class="row">
    <div class="col mb-4">
        <button class="btn btn-sm btn-primary" onclick="submitAdj(this)">
            <i class="fas fa-paper-plane"></i> Submit for Approval
        </button>
        <span class="ms-2 small text-muted">Nothing is written to stock until an approver approves this.</span>
    </div>
</div>

<script>
    let rowSeq = 0;

    function itemOptions(items) {
        return items.map(i => `<option value="${i.MITM_ITMCD}"></option>`).join('');
    }

    function addRow() {
        rowSeq++;
        const id = 'row' + rowSeq;
        const html = `<tr id="${id}">
            <td>
                <input class="form-control form-control-sm adj-item" list="itemList" placeholder="type item code / name"
                    onchange="onItemChange('${id}')" onkeyup="onItemChange('${id}')">
            </td>
            <td><select class="form-select form-select-sm adj-loc" onchange="refreshAfter('${id}')"></select></td>
            <td>
                <select class="form-select form-select-sm adj-type" onchange="refreshAfter('${id}')">
                    <option value="INC">Increase (+)</option>
                    <option value="OUT">Decrease (-)</option>
                </select>
            </td>
            <td><input type="number" min="0" step="any" class="form-control form-control-sm adj-qty"
                    onkeyup="refreshAfter('${id}')" onchange="refreshAfter('${id}')"></td>
            <td class="text-end adj-current text-muted">-</td>
            <td class="text-end adj-after text-muted">-</td>
            <td class="text-center"><button class="btn btn-sm btn-outline-danger" onclick="delRow('${id}')">&times;</button></td>
        </tr>`;
        $('#tblAdj tbody').append(html);
        loadLocations($('#' + id + ' .adj-loc'));
    }

    function delRow(id) { $('#' + id).remove(); }

    function onItemChange(id) {
        const val = $('#' + id + ' .adj-item').val().trim().toUpperCase();
        $('#' + id + ' .adj-item').val(val);
        refreshAfter(id);
    }

    let locationsCache = null;
    function loadLocations($sel) {
        const fill = (data) => {
            $sel.html(data.map(l => `<option value="${l.MLOC_LOCCD}">${l.MLOC_LOCCD} - ${l.MLOC_LOCNM ?? ''}</option>`).join(''));
        };
        if (locationsCache) { fill(locationsCache); return; }
        $.get('inventory/stockAdjustment/locations', res => { locationsCache = res.data || []; fill(locationsCache); });
    }

    function refreshAfter(id) {
        const item = $('#' + id + ' .adj-item').val().trim().toUpperCase();
        const loc = $('#' + id + ' .adj-loc').val();
        const type = $('#' + id + ' .adj-type').val();
        const qty = parseFloat($('#' + id + ' .adj-qty').val() || 0);
        if (!item || !loc) return;
        $.get('inventory/stockAdjustment/stock', { item: item, loc: loc }, res => {
            const cur = Number(res.stock || 0);
            const delta = type === 'INC' ? Math.abs(qty) : -Math.abs(qty);
            const after = cur + delta;
            $('#' + id + ' .adj-current').text(cur.toLocaleString());
            $('#' + id + ' .adj-after').text(after.toLocaleString())
                .removeClass('text-muted text-danger text-success')
                .addClass(after < 0 ? 'text-danger' : (delta === 0 ? 'text-muted' : 'text-success'));
        });
    }

    function collectRows() {
        const rows = [];
        $('#tblAdj tbody tr').each(function () {
            const item = $(this).find('.adj-item').val().trim().toUpperCase();
            const loc = $(this).find('.adj-loc').val();
            const type = $(this).find('.adj-type').val();
            const qty = parseFloat($(this).find('.adj-qty').val() || 0);
            if (item && loc && qty > 0) rows.push({ item, loc, type, qty });
        });
        return rows;
    }

    function submitAdj(btn) {
        const rows = collectRows();
        $('#adj-alert').html('');
        if (rows.length === 0) { $('#adj-alert').html('<div class="alert alert-warning py-2">Add at least one row with item, location and quantity.</div>'); return; }
        const note = $('#adjNote').val().trim();
        if (!note) { $('#adj-alert').html('<div class="alert alert-warning py-2">Reason / note is required.</div>'); return; }
        if (!confirm('Submit ' + rows.length + ' adjustment row(s) for approval?')) return;
        btn.disabled = true;
        $.ajax({
            url: 'inventory/stockAdjustment/save',
            method: 'POST',
            contentType: 'application/json',
            headers: { 'X-CSRF-TOKEN': '{{ csrf_token() }}' },
            data: JSON.stringify({ rows: rows, note: note })
        }).done(res => {
            $('#adj-alert').html(`<div class="alert alert-success py-2">${res.msg}</div>`);
            $('#tblAdj tbody').empty();
            $('#adjNote').val('');
            addRow();
            if (typeof loadAdjPendingCount === 'function') loadAdjPendingCount();
        }).fail(xhr => {
            let m = ''; const rj = xhr.responseJSON;
            if (rj) Object.keys(rj).forEach(k => { m += (Array.isArray(rj[k]) ? rj[k].join(' ') : rj[k]) + ' '; });
            $('#adj-alert').html(`<div class="alert alert-danger py-2">${m || 'Submit failed'}</div>`);
        }).always(() => btn.disabled = false);
    }

    $(function () {
        $.get('inventory/stockAdjustment/items', res => {
            $('#itemList').remove();
            $('body').append(`<datalist id="itemList">${itemOptions(res.data || [])}</datalist>`);
        });
        addRow();
    });
</script>
