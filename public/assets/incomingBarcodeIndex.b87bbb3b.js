import{t as i,o as M,C as d,R as f,F as t,aY as k,J as s,E as a,$ as N,at as S,I as c,S as w,T,D as b,P as p,Q as B}from"./index.a38f6b89.js";import{e as P}from"./QSelect.5e448e6f.js";import{Q as O,a as h}from"./QTable.28473792.js";import{Q as V,a as I}from"./QTd.5ba48316.js";import{Q}from"./QTooltip.920708cb.js";import{api_web as C}from"./axios.0653ec3e.js";import{u as U}from"./format.303e1f67.js";import"./QList.55cf63e4.js";const $={class:"q-pa-md"},q=s("div",{class:"row q-pb-md"},[s("div",{class:"col"},[s("span",{class:"text-h4"},"Incoming Barcode")]),s("div",{class:"col text-right"})],-1),x={class:"row q-pt-md"},A={class:"col"},H={__name:"incomingBarcodeIndex",setup(E){const _=U(),v=i([]),R=i([{name:"TRCVBC_BCCD",label:"Barcode ID",field:"TRCVBC_BCCD",sortable:!0,align:"left"},{name:"TRCV_RCVCD",label:"Doc No",field:"TRCV_RCVCD",sortable:!0,align:"left"},{name:"MSUP_SUPNM",label:"Supplier",field:"MSUP_SUPNM",sortable:!0,align:"left"},{name:"MITM_ITMNM",label:"Item Name",field:"MITM_ITMNM",sortable:!0,align:"left"},{name:"TRCVBC_BCQT",label:"Qty",field:"TRCVBC_BCQT",sortable:!0,align:"right",format:o=>`${o.toLocaleString()}`}]),n=i(!1),u=i(""),m=i("");M(()=>{g()});const g=async()=>{n.value=!0,await C.post("receiveBarcodes/searchAPI",{searchBy:u.value,searchValue:m.value}).then(o=>{n.value=!1,v.value=o.data.data}).catch(o=>{n.value=!1})},y=o=>{_.dialog({title:"Confirmation",message:"Are you sure want to print this barcode ?",cancel:!0,persistent:!0}).onOk(async()=>{n.value=!0,await C.post("receiveBarcodes/printBarcode",{data:[o]}).then(l=>{n.value=!1,window.open("").document.write("<iframe width='100%' height='100%' src='data:application/pdf;base64, "+encodeURI(l.data)+"'></iframe>")})})},D=o=>{_.dialog({title:"Confirmation",message:"Are you sure want to delete this barcode ?",cancel:!0,persistent:!0}).onOk(async()=>{n.value=!0,await C.delete(`receiveBarcode/${o}`).then(l=>{n.value=!1,g()})})};return(o,l)=>(d(),f("div",$,[q,t(k),s("div",x,[s("div",A,[t(O,{title:"Barcoded Incoming List",rows:v.value,columns:R.value,"row-key":"TRCVBC_BCCD",loading:n.value,dense:"",pagination:{rowsPerPage:20},class:"my-sticky-header-column-table"},{"top-right":a(()=>[t(P,{outlined:"",modelValue:u.value,"onUpdate:modelValue":l[0]||(l[0]=e=>u.value=e),options:o.col,label:"Search Columns","option-value":"name","option-label":"label","emit-value":"",dense:"","map-options":""},null,8,["modelValue","options"]),t(N,{borderless:"",dense:"",modelValue:m.value,"onUpdate:modelValue":[l[1]||(l[1]=e=>m.value=e),l[2]||(l[2]=e=>o.getOutgoingData())],placeholder:"Search",outlined:"",debounce:"1000"},{append:a(()=>[t(S,{name:"search"})]),_:1},8,["modelValue"])]),header:a(e=>[t(V,{props:e},{default:a(()=>[t(h,{"auto-width":""},{default:a(()=>[c("Action")]),_:1}),(d(!0),f(w,null,T(e.cols,r=>(d(),b(h,{key:r.name,props:e},{default:a(()=>[c(p(r.label),1)]),_:2},1032,["props"]))),128))]),_:2},1032,["props"])]),body:a(e=>[t(V,{props:e},{default:a(()=>[t(I,{"auto-width":""},{default:a(()=>[t(B,{flat:"",color:"red",icon:"delete",onClick:r=>D(e.row.TRCVBC_BCCD),dense:"",disable:parseInt(e.row.CONFIRMED_QTY)==e.row.TOT_RCV},{default:a(()=>[t(Q,null,{default:a(()=>[c(p(parseInt(e.row.CONFIRMED_QTY)==e.row.TOT_RCV?"All qty already confirmed":"Cancel Barcode"),1)]),_:2},1024)]),_:2},1032,["onClick","disable"]),t(B,{flat:"",color:"indigo",icon:"print",onClick:r=>y(e.row),dense:"",disable:parseInt(e.row.CONFIRMED_QTY)==e.row.TOT_RCV},{default:a(()=>[t(Q,null,{default:a(()=>[c("Print Barcode")]),_:1})]),_:2},1032,["onClick","disable"])]),_:2},1024),(d(!0),f(w,null,T(e.cols,r=>(d(),b(I,{key:r.name,props:e},{default:a(()=>[c(p(r.value),1)]),_:2},1032,["props"]))),128))]),_:2},1032,["props"])]),_:1},8,["rows","columns","loading"])])])]))}};export{H as default};
