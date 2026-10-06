<div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
    <h1 class="h2">Item Mapping</h1>
    <div class="btn-toolbar mb-2 mb-md-0">
        <div class="btn-group btn-group-sm">
            <button type="button" class="btn btn-outline-primary" id="btnNew" onclick="btnNewOnclick(this)"><i class="fas fa-file"></i></button>
            <button type="button" class="btn btn-outline-primary" id="btnSave" onclick="btnSaveOnclick(this)"><i class="fas fa-save"></i></button>
            <button type="button" class="btn btn-outline-primary" id="btnSearch" onclick="btnShowSearchModal()"><i class="fas fa-search"></i></button>
        </div>
    </div>
</div>

<form id="item-mapping-form">
    <div class="row">
        <div class="col mb-1" id="div-alert"></div>
    </div>
    <div class="row">
        <div class="col-md-3 mb-1">
            <div class="input-group input-group-sm mb-1">
                <span class="input-group-text">Role</span>
                <select id="mapRole" class="form-select form-select-sm"></select>
            </div>
        </div>
        <div class="col-md-3 mb-1">
            <div class="input-group input-group-sm mb-1">
                <span class="input-group-text">Company</span>
                <select id="mapCG" class="form-select form-select-sm" onchange="onCompanyChange()"></select>
            </div>
        </div>
        <div class="col-md-2 mb-1">
            <div class="input-group input-group-sm mb-1">
                <span class="input-group-text">Branch</span>
                <select id="mapBranch" class="form-select form-select-sm"></select>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-md-3 mb-1">
            <div class="input-group input-group-sm mb-1">
                <span class="input-group-text">Item</span>
                <input type="text" id="mapItem" class="form-control" placeholder="Item Code" readonly>
                <button class="btn btn-primary" type="button" onclick="btnShowItemModal()"><i class="fas fa-search"></i></button>
            </div>
        </div>
        <div class="col-md-4 mb-1">
            <div class="input-group input-group-sm mb-1">
                <span class="input-group-text">Item Name</span>
                <input type="text" id="mapItemName" class="form-control" placeholder="-" readonly>
            </div>
        </div>
        <div class="col-md-3 mb-1">
            <div class="input-group input-group-sm mb-1">
                <span class="input-group-text">Default Loc</span>
                <select id="mapLoc" class="form-select form-select-sm"></select>
            </div>
        </div>
        <div class="col-md-2 mb-1">
            <div class="input-group input-group-sm mb-1">
                <span class="input-group-text">Active</span>
                <select id="mapActive" class="form-select form-select-sm">
                    <option value="1" selected>Yes</option>
                    <option value="0">No</option>
                </select>
            </div>
        </div>
    </div>
    <input type="hidden" id="mapInputMode" value="0">
    <input type="hidden" id="mapId" value="">
</form>

<div class="row mt-3">
    <div class="col">
        <table id="tblItemMapping" class="table table-sm table-striped table-bordered" style="width:100%">
            <thead>
                <tr>
                    <th>Role</th>
                    <th>Company</th>
                    <th>Branch</th>
                    <th>Item Code</th>
                    <th>Item Name</th>
                    <th>Default Loc</th>
                    <th>Active</th>
                    <th></th>
                </tr>
            </thead>
            <tbody></tbody>
        </table>
    </div>
</div>

<!-- Item picker modal -->
<div class="modal fade" id="itemModal" tabindex="-1">
    <div class="modal-dialog modal-xl modal-dialog-scrollable">
        <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5">Item List</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="row mb-2">
                    <div class="col">
                        <div class="input-group input-group-sm">
                            <input type="text" id="itemSearchInput" class="form-control" placeholder="Search code / name">
                            <button class="btn btn-primary" type="button" onclick="loadItems()"><i class="fas fa-search"></i></button>
                        </div>
                    </div>
                </div>
                <table id="tblItemPicker" class="table table-sm table-hover" style="width:100%">
                    <thead>
                        <tr><th>Code</th><th>Name</th><th>UOM</th><th></th></tr>
                    </thead>
                    <tbody></tbody>
                </table>
            </div>
        </div>
    </div>
</div>

<script>
    const ROLE_OPTS = @json($rolesJson ?? []);
    const COMPANIES = @json($companiesJson ?? []);

    let dtMapping = null;
    let dtItem = null;

    $(function() {
        COMPANIES.forEach(function(c) {
            $('#mapCG').append(`<option value="${c.connection}">${c.name}</option>`);
        });
        ROLE_OPTS.forEach(function(r) {
            $('#mapRole').append(`<option value="${r.MGECD_VALUE}">${r.MGECD_VALUE} - ${r.MGECD_DESC ?? ''}</option>`);
        });
        onCompanyChange();
        loadMappings();
    });

    function onCompanyChange() {
        const cg = $('#mapCG').val();
        $('#mapBranch').html('');
        $('#mapLoc').html('<option value="">-</option>');
        $('#mapItem').val('');
        $('#mapItemName').val('');
        if (!cg) return;

        $.get('item-mapping/branches', { CG: cg }, function(res) {
            (res.data || []).forEach(function(b) {
                $('#mapBranch').append(`<option value="${b.MBRANCH_CD}">${b.MBRANCH_CD} - ${b.MBRANCH_NM ?? ''}</option>`);
            });
        });

        $.get('item-mapping/locations', { CG: cg }, function(res) {
            (res.data || []).forEach(function(l) {
                $('#mapLoc').append(`<option value="${l.MLOC_LOCCD}">${l.MLOC_LOCCD} - ${l.MLOC_LOCNM ?? ''}</option>`);
            });
        });
    }

    function loadMappings() {
        $.ajax({
            type: "get",
            url: "item-mapping",
            dataType: "json",
            success: function(res) {
                const rows = (res.data || []).map(function(r) {
                    return [
                        r.MAP_ROLE,
                        r.MAP_CG,
                        r.MAP_BRANCH,
                        r.MAP_ITMCD,
                        r.ITEM_NAME ?? '',
                        r.MAP_LOCCD ?? '',
                        r.MAP_ACTIVE == 1 ? 'Yes' : 'No',
                        `<button class="btn btn-sm btn-outline-danger" onclick="onDeleteRow(${r.id})"><i class="fas fa-trash"></i></button>`
                    ];
                });
                if (dtMapping) { dtMapping.destroy(); }
                dtMapping = $('#tblItemMapping').DataTable({
                    data: rows,
                    order: [],
                    columnDefs: [{ targets: 7, orderable: false }]
                });
            }
        });
    }

    function btnShowItemModal() {
        if (!$('#mapCG').val()) {
            alertify.warning('Select a company first');
            return;
        }
        $('#itemSearchInput').val('');
        loadItems();
        new bootstrap.Modal(document.getElementById('itemModal')).show();
    }

    function loadItems() {
        $.ajax({
            type: "get",
            url: "item-mapping/items",
            data: { CG: $('#mapCG').val(), search: $('#itemSearchInput').val() },
            dataType: "json",
            success: function(res) {
                const rows = (res.data || []).map(function(i) {
                    return [
                        i.MITM_ITMCD,
                        i.MITM_ITMNM ?? '',
                        i.MITM_STKUOM ?? '',
                        `<button class="btn btn-sm btn-primary" onclick="pickItem('${i.MITM_ITMCD}','${(i.MITM_ITMNM ?? '').replace(/'/g, "\\'")}')">Pick</button>`
                    ];
                });
                if (dtItem) { dtItem.destroy(); }
                dtItem = $('#tblItemPicker').DataTable({
                    data: rows,
                    order: [],
                    columnDefs: [{ targets: 3, orderable: false }]
                });
            }
        });
    }

    function pickItem(code, name) {
        $('#mapItem').val(code);
        $('#mapItemName').val(name);
        bootstrap.Modal.getInstance(document.getElementById('itemModal')).hide();
    }

    function btnNewOnclick() {
        $('#mapInputMode').val('0');
        $('#mapId').val('');
        $('#mapItem').val('');
        $('#mapItemName').val('');
        $('#mapActive').val('1');
        $('#div-alert').html('');
    }

    function btnSaveOnclick(pthis) {
        if (!$('#mapRole').val()) { alertify.warning('Role is required'); return; }
        if (!$('#mapCG').val()) { alertify.warning('Company is required'); return; }
        if (!$('#mapBranch').val()) { alertify.warning('Branch is required'); return; }
        if (!$('#mapItem').val()) { alertify.warning('Item is required'); return; }

        const data = {
            id: $('#mapId').val(),
            MAP_ROLE: $('#mapRole').val(),
            MAP_CG: $('#mapCG').val(),
            MAP_BRANCH: $('#mapBranch').val(),
            MAP_ITMCD: $('#mapItem').val(),
            MAP_LOCCD: $('#mapLoc').val(),
            MAP_ACTIVE: $('#mapActive').val(),
            _token: '{{ csrf_token() }}',
        };

        const mode = $('#mapInputMode').val();
        const url = mode === '0' ? 'item-mapping' : `item-mapping/${data.id}`;
        const type = mode === '0' ? 'post' : 'put';

        pthis.disabled = true;
        $.ajax({
            type: type,
            url: url,
            data: data,
            dataType: "json",
            success: function(response) {
                pthis.disabled = false;
                $('#div-alert').html('');
                alertify.success(response.msg || 'Saved');
                loadMappings();
            },
            error: function(xhr) {
                pthis.disabled = false;
                let msg = '';
                if (xhr.responseJSON) {
                    Object.keys(xhr.responseJSON).forEach(function(k) {
                        msg += `<p>${xhr.responseJSON[k]}</p>`;
                    });
                } else {
                    msg = '<p>Unexpected error</p>';
                }
                $('#div-alert').html(`<div class="alert alert-danger py-2 mb-1">${msg}</div>`);
            }
        });
    }

    function onDeleteRow(id) {
        if (!confirm('Delete this mapping ?')) return;
        $.ajax({
            type: "delete",
            url: `item-mapping/${btoa(id)}`,
            data: { _token: '{{ csrf_token() }}' },
            dataType: "json",
            success: function(res) {
                alertify.success(res.msg || 'Deleted');
                loadMappings();
            }
        });
    }
</script>
