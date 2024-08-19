import{t as i,o as M,C as d,R as p,F as t,aY as R,J as r,E as a,$ as S,at as P,I as c,S as b,T as h,D as B,P as f,Q as w}from"./index.90ffc720.js";import{e as N}from"./QSelect.0fab620a.js";import{Q as U,a as T}from"./QTable.8b4e19f8.js";import{Q as V,a as Q}from"./QTd.9fbff6a5.js";import{Q as y}from"./QTooltip.fca0901a.js";import{api_web as C}from"./axios.1276f521.js";import{u as $}from"./format.82174bd2.js";import"./QList.d657dfb2.js";const q={class:"q-pa-md"},x=r("div",{class:"row q-pb-md"},[r("div",{class:"col"},[r("span",{class:"text-h4"},"Incoming Barcode")]),r("div",{class:"col text-right"})],-1),A={class:"row q-pt-md"},L={class:"col"},H={__name:"incomingBarcodeIndex",setup(O){const g=$(),_=i([]),I=i([{name:"TRCVBC_BCCD",label:"Barcode ID",field:"TRCVBC_BCCD",sortable:!0,align:"left"},{name:"TRCV_RCVCD",label:"Doc No",field:"TRCV_RCVCD",sortable:!0,align:"left"},{name:"MSUP_SUPNM",label:"Supplier",field:"MSUP_SUPNM",sortable:!0,align:"left"},{name:"MITM_ITMNM",label:"Item Name",field:"MITM_ITMNM",sortable:!0,align:"left"},{name:"TRCVBC_BCQT",label:"Qty",field:"TRCVBC_BCQT",sortable:!0,align:"right",format:l=>`${l.toLocaleString()}`}]),n=i(!1),u=i(""),m=i("");M(()=>{v()});const v=async()=>{n.value=!0,await C.post("receiveBarcodes/searchAPI",{searchBy:u.value,searchValue:m.value}).then(l=>{n.value=!1,_.value=l.data.data}).catch(l=>{n.value=!1})},k=l=>{g.dialog({title:"Confirmation",message:"Are you sure want to print this barcode ?",cancel:!0,persistent:!0}).onOk(async()=>{n.value=!0,await C.post("receiveBarcodes/printBarcode",{data:[l]}).then(o=>{n.value=!1,window.open("").document.write("<iframe width='100%' height='100%' src='data:application/pdf;base64, "+encodeURI(o.data)+"'></iframe>")})})},D=l=>{g.dialog({title:"Confirmation",message:"Are you sure want to delete this barcode ?",cancel:!0,persistent:!0}).onOk(async()=>{n.value=!0,await C.delete(`receiveBarcode/${l}`).then(o=>{n.value=!1,v()})})};return(l,o)=>(d(),p("div",q,[x,t(R),r("div",A,[r("div",L,[t(U,{title:"Barcoded Incoming List",rows:_.value,columns:I.value,"row-key":"TRCVBC_BCCD",loading:n.value,dense:"",pagination:{rowsPerPage:20},class:"my-sticky-header-column-table"},{"top-right":a(()=>[t(N,{outlined:"",modelValue:u.value,"onUpdate:modelValue":o[0]||(o[0]=e=>u.value=e),options:l.col,label:"Search Columns","option-value":"name","option-label":"label","emit-value":"",dense:"","map-options":""},null,8,["modelValue","options"]),t(S,{borderless:"",dense:"",modelValue:m.value,"onUpdate:modelValue":[o[1]||(o[1]=e=>m.value=e),o[2]||(o[2]=e=>l.getOutgoingData())],placeholder:"Search",outlined:"",debounce:"1000"},{append:a(()=>[t(P,{name:"search"})]),_:1},8,["modelValue"])]),header:a(e=>[t(V,{props:e},{default:a(()=>[t(T,{"auto-width":""},{default:a(()=>[c("Action")]),_:1}),(d(!0),p(b,null,h(e.cols,s=>(d(),B(T,{key:s.name,props:e},{default:a(()=>[c(f(s.label),1)]),_:2},1032,["props"]))),128))]),_:2},1032,["props"])]),body:a(e=>[t(V,{props:e},{default:a(()=>[t(Q,{"auto-width":""},{default:a(()=>[t(w,{flat:"",color:"red",icon:"delete",onClick:s=>D(e.row.TRCVBC_BCCD),dense:"",disable:e.row.det.length===0},{default:a(()=>[t(y,null,{default:a(()=>[c(f(e.row.det.length===0?"All qty already confirmed":"Cancel Barcode"),1)]),_:2},1024)]),_:2},1032,["onClick","disable"]),t(w,{flat:"",color:"indigo",icon:"print",onClick:s=>k(e.row),dense:"",disable:e.row.det.length===0},{default:a(()=>[t(y,null,{default:a(()=>[c("Print Barcode")]),_:1})]),_:2},1032,["onClick","disable"])]),_:2},1024),(d(!0),p(b,null,h(e.cols,s=>(d(),B(Q,{key:s.name,props:e},{default:a(()=>[c(f(s.value),1)]),_:2},1032,["props"]))),128))]),_:2},1032,["props"])]),_:1},8,["rows","columns","loading"])])])]))}};export{H as default};
