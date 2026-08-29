<div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
    <h1 class="h2">Service Transfer Approval</h1>
    <div class="btn-toolbar mb-2 mb-md-0">
    </div>
</div>
<div class="container-fluid">
    <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3" id="svctrfContainer">

    </div>
    <nav aria-label="Service transfer pagination" class="mt-3">
        <ul class="pagination pagination-sm justify-content-center" id="svctrfPagination"></ul>
    </nav>
</div>
<div class="modal fade" id="svctrfModal" tabindex="-1">
    <div class="modal-dialog modal-lg modal-dialog-scrollable">
        <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5">Transfer : <span id="svctrfModalDoc"></span></h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col" id="svctrfDivAlert"></div>
                </div>
                <div class="table-responsive">
                    <table id="svctrfTable" class="table table-sm table-striped table-bordered table-hover caption-top">
                        <caption>Transfer lines</caption>
                        <thead class="table-light">
                            <tr>
                                <th>Item Code</th>
                                <th>Item Name</th>
                                <th class="text-center">Qty</th>
                                <th class="text-center">From</th>
                                <th class="text-center">To</th>
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
                            <button class="btn btn-success btn-sm" id="btnSvctrfApprove" onclick="approveServiceTransfer()">
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
    let svctrfPage = 1

    function loadServiceTransferApproval(page) {
        svctrfPage = page || 1
        svctrfContainer.innerHTML = 'Please wait'
        $.ajax({
            type: "GET",
            url: "/approval/service-transfer/list",
            data: { page: svctrfPage },
            dataType: "json",
            success: function(response) {
                svctrfContainer.innerHTML = ''
                let list = Array.isArray(response) ? response : (response.data || [])
                if (list.length === 0 && svctrfPage > 1) {
                    loadServiceTransferApproval(svctrfPage - 1)
                    return
                }
                if (list.length === 0) {
                    svctrfContainer.innerHTML = '<div class="col">No pending service transfer.</div>'
                    renderServiceTransferPagination(null)
                    return
                }
                list.forEach(function(item) {
                    const col = document.createElement('div')
                    col.classList.add('col')
                    const card = document.createElement('div')
                    card.classList.add(...['card', 'shadow-sm'])
                    card.innerHTML = `<div class="card-body">
                        <h6 class="card-title">${item.TLOCREQ_DOCNO}</h6>
                        <p class="card-text"><b>${item.ITEMS}</b><br>
                        Qty ${item.QTY} &nbsp; ${item.TLOCREQ_FRLOC} -> ${item.TLOCREQ_TOLOC}</p>
                        <small class="text-body-secondary">${moment(item.CREATED_AT).startOf('hour').fromNow()}</small>
                    </div>`
                    const btn = document.createElement('button')
                    btn.classList.add(...['btn', 'btn-outline-primary', 'btn-sm'])
                    btn.innerText = 'Preview'
                    btn.onclick = function() {
                        showServiceTransferDetail(item.TLOCREQ_DOCNO)
                    }
                    card.querySelector('.card-body').appendChild(btn)
                    col.appendChild(card)
                    svctrfContainer.appendChild(col)
                })
                renderServiceTransferPagination(Array.isArray(response) ? null : response)
            },
            error: function(xhr) {
                svctrfContainer.innerHTML = xhr.responseText
            }
        })
    }

    function renderServiceTransferPagination(meta) {
        const pag = document.getElementById('svctrfPagination')
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
                    loadServiceTransferApproval(m ? parseInt(m[1], 10) : 1)
                }
            }
            li.appendChild(a)
            pag.appendChild(li)
        })
    }

    function showServiceTransferDetail(doc) {
        svctrfModalDoc.innerText = doc
        $("#svctrfModal").modal('show')
        svctrfTable.getElementsByTagName('tbody')[0].innerHTML = '<tr><td colspan="6">Please wait</td></tr>'
        $.ajax({
            type: "GET",
            url: "/approval/service-transfer/detail/" + btoa(doc),
            dataType: "json",
            success: function(response) {
                const tbody = svctrfTable.getElementsByTagName('tbody')[0]
                tbody.innerHTML = ''
                response.forEach(function(line) {
                    const tr = document.createElement('tr')
                    let html = `<td>${line.TLOCREQ_ITMCD}</td>`
                    html += `<td>${line.MITM_ITMNM || ''}</td>`
                    html += `<td class="text-center">${line.TLOCREQ_QTY}</td>`
                    html += `<td class="text-center">${line.TLOCREQ_FRLOC}</td>`
                    html += `<td class="text-center">${line.TLOCREQ_TOLOC}</td>`
                    html += `<td>${line.TSRVF_BC || ''}</td>`
                    tr.innerHTML = html
                    tbody.appendChild(tr)
                })
            },
            error: function(xhr) {
                svctrfDivAlert.innerHTML = `<div class="alert alert-warning">${xhr.responseText}</div>`
            }
        })
    }

    function approveServiceTransfer() {
        if (!confirm('Approve service transfer ' + svctrfModalDoc.innerText + ' ?')) return
        const btn = document.getElementById('btnSvctrfApprove')
        const origHtml = btn.innerHTML
        btn.disabled = true
        btn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Approving...'
        $.ajax({
            type: "GET",
            url: "/inventory/transferRequest/approve/" + btoa(svctrfModalDoc.innerText),
            dataType: "json",
            success: function() {
                btn.innerHTML = origHtml
                btn.disabled = false
                $("#svctrfModal").modal('hide')
                loadServiceTransferApproval(svctrfPage)
                showNotificationToApprove()
            },
            error: function(xhr) {
                btn.innerHTML = origHtml
                btn.disabled = false
                let msg = ''
                try {
                    const resp = xhr.responseJSON
                    msg = resp && resp.msg ? resp.msg : xhr.responseText
                } catch (e) {
                    msg = xhr.responseText
                }
                svctrfDivAlert.innerHTML = `<div class="alert alert-warning">${msg}</div>`
            }
        })
    }

    loadServiceTransferApproval()
</script>
