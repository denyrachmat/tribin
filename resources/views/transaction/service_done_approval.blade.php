<div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
    <h1 class="h2">Service Done Confirmation Approval</h1>
    <div class="btn-toolbar mb-2 mb-md-0">
    </div>
</div>
<div class="container-fluid">
    <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3" id="svcdoneContainer">

    </div>
    <nav aria-label="Service done pagination" class="mt-3">
        <ul class="pagination pagination-sm justify-content-center" id="svcdonePagination"></ul>
    </nav>
</div>
<div class="modal fade" id="svcdoneModal" tabindex="-1">
    <div class="modal-dialog modal-lg modal-dialog-scrollable">
        <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5">Service : <span id="svcdoneModalDoc"></span></h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col" id="svcdoneDivAlert"></div>
                </div>
                <div class="row mb-3">
                    <div class="col-md-4">
                        <label for="svcdoneDate" class="form-label">Approval Date (Delivery Issue Date)</label>
                        <input type="date" class="form-control form-control-sm" id="svcdoneDate">
                        <div class="form-text">Oldest allowed is H-1 (yesterday). Future dates are allowed.</div>
                    </div>
                </div>
                <div class="table-responsive">
                    <table id="svcdoneTable" class="table table-sm table-striped table-bordered table-hover caption-top">
                        <caption>Used parts</caption>
                        <thead class="table-light">
                            <tr>
                                <th>Item Code</th>
                                <th>Item Name</th>
                                <th class="text-center">Qty</th>
                                <th class="text-end">Price</th>
                                <th>Barcode</th>
                            </tr>
                        </thead>
                        <tbody></tbody>
                    </table>
                </div>
            </div>
            <div class="modal-footer">
                <div class="container">
                    <div class="row">
                        <div class="col text-center">
                            <button class="btn btn-success btn-sm" id="btnSvcdoneApprove" onclick="approveServiceDone()">
                                <i class="fas fa-check"></i> Approve
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<script>
    window.svcdonePage = window.svcdonePage || 1
    window.svcdoneId = null

    function svcdoneMinDate() {
        const d = new Date()
        d.setDate(d.getDate() - 1)
        const m = String(d.getMonth() + 1).padStart(2, '0')
        const day = String(d.getDate()).padStart(2, '0')
        return `${d.getFullYear()}-${m}-${day}`
    }

    function svcdoneMaxDate() {
        return new Date().toISOString().split('T')[0]
    }

    function loadServiceDoneApproval(page) {
        svcdonePage = page || 1
        svcdoneContainer.innerHTML = 'Please wait'
        $.ajax({
            type: "GET",
            url: "/approval/service-done/list",
            data: { page: svcdonePage },
            dataType: "json",
            success: function(response) {
                svcdoneContainer.innerHTML = ''
                const list = Array.isArray(response) ? response : (response.data || [])
                if (list.length === 0 && svcdonePage > 1) {
                    loadServiceDoneApproval(svcdonePage - 1)
                    return
                }
                if (list.length === 0) {
                    svcdoneContainer.innerHTML = '<div class="col">No pending service done confirmation.</div>'
                    renderServiceDonePagination(null)
                    return
                }
                list.forEach(function(item) {
                    const col = document.createElement('div')
                    col.classList.add('col')
                    const card = document.createElement('div')
                    card.classList.add(...['card', 'shadow-sm'])
                    card.innerHTML = `<div class="card-body">
                        <h6 class="card-title">${item.SRVH_DOCNO}-${item.TSRVD_LINE}</h6>
                        <p class="card-text"><b>${item.MCUS_CUSNM || ''}</b><br>
                        ${item.TSRVD_ITMCD || ''}</p>
                        <small class="text-body-secondary">${item.TSRVD_DONE_SUBMITTED ? moment(item.TSRVD_DONE_SUBMITTED).startOf('hour').fromNow() : ''}</small>
                    </div>`
                    const btn = document.createElement('button')
                    btn.classList.add(...['btn', 'btn-outline-primary', 'btn-sm'])
                    btn.innerText = 'Preview'
                    btn.onclick = function() {
                        showServiceDoneDetail(item.id, item.SRVH_DOCNO + '-' + item.TSRVD_LINE)
                    }
                    card.querySelector('.card-body').appendChild(btn)
                    col.appendChild(card)
                    svcdoneContainer.appendChild(col)
                })
                renderServiceDonePagination(Array.isArray(response) ? null : response)
            },
            error: function(xhr) {
                svcdoneContainer.innerHTML = xhr.responseText
            }
        })
    }

    function renderServiceDonePagination(meta) {
        const pag = document.getElementById('svcdonePagination')
        pag.innerHTML = ''
        if (!meta || !meta.last_page || meta.last_page <= 1) return
        ;(meta.links || []).forEach(function(link) {
            const li = document.createElement('li')
            li.classList.add('page-item')
            if (!link.url) li.classList.add('disabled')
            if (link.active) li.classList.add('active')
            const a = document.createElement('a')
            a.classList.add('page-link')
            a.href = '#'
            a.innerHTML = link.label
            if (link.url) {
                a.onclick = function(e) {
                    e.preventDefault()
                    const m = link.url.match(/page=(\d+)/)
                    loadServiceDoneApproval(m ? parseInt(m[1], 10) : 1)
                }
            }
            li.appendChild(a)
            pag.appendChild(li)
        })
    }

    function showServiceDoneDetail(id, label) {
        window.svcdoneId = id
        svcdoneModalDoc.innerText = label
        svcdoneDivAlert.innerHTML = ''
        const dateInput = document.getElementById('svcdoneDate')
        dateInput.min = svcdoneMinDate()
        dateInput.value = svcdoneMaxDate()
        $("#svcdoneModal").modal('show')
        svcdoneTable.getElementsByTagName('tbody')[0].innerHTML = '<tr><td colspan="5">Please wait</td></tr>'
        $.ajax({
            type: "GET",
            url: "/approval/service-done/detail/" + btoa(String(id)),
            dataType: "json",
            success: function(response) {
                const tbody = svcdoneTable.getElementsByTagName('tbody')[0]
                tbody.innerHTML = ''
                const items = (response && response.items) || []
                if (items.length === 0) {
                    tbody.innerHTML = '<tr><td colspan="5">No used parts found.</td></tr>'
                    return
                }
                items.forEach(function(line) {
                    const tr = document.createElement('tr')
                    let html = `<td>${line.TSRVF_ITMCD}</td>`
                    html += `<td>${line.MITM_ITMNM || ''}</td>`
                    html += `<td class="text-center">${line.TSRVF_QTY}</td>`
                    html += `<td class="text-end">${Number(line.TSRVF_PRC || 0).toLocaleString()}</td>`
                    html += `<td>${line.TSRVF_BC || ''}</td>`
                    tr.innerHTML = html
                    tbody.appendChild(tr)
                })
            },
            error: function(xhr) {
                let msg = xhr.responseText
                try { const r = xhr.responseJSON; if (r && r.error) msg = Array.isArray(r.error) ? r.error.join('<br>') : r.error } catch (e) {}
                svcdoneDivAlert.innerHTML = `<div class="alert alert-warning">${msg}</div>`
            }
        })
    }

    function approveServiceDone() {
        const dateVal = document.getElementById('svcdoneDate').value
        if (!dateVal) {
            svcdoneDivAlert.innerHTML = '<div class="alert alert-warning">Please choose an approval date.</div>'
            return
        }
        if (!confirm('Approve service done confirmation for ' + svcdoneModalDoc.innerText + ' with date ' + dateVal + ' ?')) return
        const btn = document.getElementById('btnSvcdoneApprove')
        const origHtml = btn.innerHTML
        btn.disabled = true
        btn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Approving...'
        $.ajax({
            type: "POST",
            url: "/approval/service-done/approve/" + btoa(String(window.svcdoneId)),
            data: { _token: '{{ csrf_token() }}', TSRVD_DONE_APPRVDT: dateVal },
            dataType: "json",
            success: function() {
                btn.innerHTML = origHtml
                btn.disabled = false
                $("#svcdoneModal").modal('hide')
                loadServiceDoneApproval(svcdonePage)
                if (typeof showNotificationToApprove === 'function') showNotificationToApprove()
            },
            error: function(xhr) {
                btn.innerHTML = origHtml
                btn.disabled = false
                let msg = xhr.responseText
                try {
                    const resp = xhr.responseJSON
                    if (resp && resp.error) msg = Array.isArray(resp.error) ? resp.error.join('<br>') : resp.error
                    else if (resp && resp.msg) msg = resp.msg
                } catch (e) {}
                svcdoneDivAlert.innerHTML = `<div class="alert alert-warning">${msg}</div>`
            }
        })
    }

    loadServiceDoneApproval()
</script>
