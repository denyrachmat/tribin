import{t as i,o as D,C as d,R as p,F as t,aI as y,J as s,E as a,$ as k,av as N,I as c,S as _,T as v,D as T,P as f,Q as g}from"./index.540ff2cd.js";import{Q as S}from"./QSelect.cda1dc5b.js";import{Q as P,a as w}from"./QTable.4a542e2a.js";import{Q as b,a as B}from"./QTd.5f11952d.js";import{Q as h}from"./QTooltip.aa8425ff.js";import{api_web as I}from"./axios.c1b94b6b.js";import{u as O}from"./use-quasar.986ed798.js";import"./QItemLabel.208b369b.js";import"./format.912b63a8.js";import"./QList.81bc3927.js";const U={class:"q-pa-md"},$=s("div",{class:"row q-pb-md"},[s("div",{class:"col"},[s("span",{class:"text-h4"},"Incoming Barcode")]),s("div",{class:"col text-right"})],-1),q={class:"row q-pt-md"},E={class:"col"},K={__name:"incomingBarcodeIndex",setup(F){const Q=O(),C=i([]),V=i([{name:"TRCVBC_BCCD",label:"Barcode ID",field:"TRCVBC_BCCD",sortable:!0,align:"left"},{name:"TRCV_RCVCD",label:"Doc No",field:"TRCV_RCVCD",sortable:!0,align:"left"},{name:"MSUP_SUPNM",label:"Supplier",field:"MSUP_SUPNM",sortable:!0,align:"left"},{name:"MITM_ITMNM",label:"Item Name",field:"MITM_ITMNM",sortable:!0,align:"left"},{name:"TRCVBC_BCQT",label:"Qty",field:"TRCVBC_BCQT",sortable:!0,align:"right",format:o=>`${o.toLocaleString()}`}]),r=i(!1),u=i(""),m=i("");D(()=>{R()});const R=async()=>{r.value=!0,await I.post("receiveBarcode/searchAPI",{searchBy:u.value,searchValue:m.value}).then(o=>{r.value=!1,C.value=o.data.data}).catch(o=>{r.value=!1})},M=o=>{Q.dialog({title:"Confirmation",message:"Are you sure want to print this barcode ?",cancel:!0,persistent:!0}).onOk(async()=>{r.value=!0,await I.post("receiveBarcode/printBarcode",{data:[o]}).then(l=>{r.value=!1,window.open("").document.write("<iframe width='100%' height='100%' src='data:application/pdf;base64, "+encodeURI(l.data)+"'></iframe>")})})};return(o,l)=>(d(),p("div",U,[$,t(y),s("div",q,[s("div",E,[t(P,{title:"Barcoded Incoming List",rows:C.value,columns:V.value,"row-key":"TRCVBC_BCCD",loading:r.value,dense:"",pagination:{rowsPerPage:20},class:"my-sticky-header-column-table"},{"top-right":a(()=>[t(S,{outlined:"",modelValue:u.value,"onUpdate:modelValue":l[0]||(l[0]=e=>u.value=e),options:o.col,label:"Search Columns","option-value":"name","option-label":"label","emit-value":"",dense:"","map-options":""},null,8,["modelValue","options"]),t(k,{borderless:"",dense:"",modelValue:m.value,"onUpdate:modelValue":[l[1]||(l[1]=e=>m.value=e),l[2]||(l[2]=e=>o.getOutgoingData())],placeholder:"Search",outlined:"",debounce:"1000"},{append:a(()=>[t(N,{name:"search"})]),_:1},8,["modelValue"])]),header:a(e=>[t(b,{props:e},{default:a(()=>[t(w,{"auto-width":""},{default:a(()=>[c("Action")]),_:1}),(d(!0),p(_,null,v(e.cols,n=>(d(),T(w,{key:n.name,props:e},{default:a(()=>[c(f(n.label),1)]),_:2},1032,["props"]))),128))]),_:2},1032,["props"])]),body:a(e=>[t(b,{props:e},{default:a(()=>[t(B,{"auto-width":""},{default:a(()=>[t(g,{flat:"",color:"red",icon:"delete",onClick:n=>o.onDelete(e.row.id),dense:"",disable:parseInt(e.row.CONFIRMED_QTY)==e.row.TOT_RCV},{default:a(()=>[t(h,null,{default:a(()=>[c(f(parseInt(e.row.CONFIRMED_QTY)==e.row.TOT_RCV?"All qty already confirmed":"Cancel Barcode"),1)]),_:2},1024)]),_:2},1032,["onClick","disable"]),t(g,{flat:"",color:"indigo",icon:"print",onClick:n=>M(e.row),dense:"",disable:parseInt(e.row.CONFIRMED_QTY)==e.row.TOT_RCV},{default:a(()=>[t(h,null,{default:a(()=>[c("Print Barcode")]),_:1})]),_:2},1032,["onClick","disable"])]),_:2},1024),(d(!0),p(_,null,v(e.cols,n=>(d(),T(B,{key:n.name,props:e},{default:a(()=>[c(f(n.value),1)]),_:2},1032,["props"]))),128))]),_:2},1032,["props"])]),_:1},8,["rows","columns","loading"])])])]))}};export{K as default};
