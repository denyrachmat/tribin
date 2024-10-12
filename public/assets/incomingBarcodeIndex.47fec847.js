import{Q as p}from"./QTooltip.e47750c2.js";import{t as d,o as R,C as c,R as C,J as i,F as t,E as a,Q as g,aY as S,I as s,$ as P,at as N,S as B,T as h,D as T,P as _}from"./index.6be7d67c.js";import{c as $}from"./QSelect.72be038f.js";import{Q as U,a as V}from"./QTable.83ecbd3a.js";import{Q,a as y}from"./QTd.eabaa2f8.js";import{api_web as v}from"./axios.7b4bd93a.js";import{u as q}from"./format.6c00395e.js";import"./QList.9a259dfb.js";const x={class:"q-pa-md"},A={class:"row q-pb-md"},O=i("div",{class:"col"},[i("span",{class:"text-h4"},"Incoming Barcode")],-1),L={class:"col text-right"},E={class:"row q-pt-md"},F={class:"col"},Z={__name:"incomingBarcodeIndex",setup(W){const u=q(),w=d([]),k=d([{name:"TRCVBC_BCCD",label:"Barcode ID",field:"TRCVBC_BCCD",sortable:!0,align:"left"},{name:"TRCV_RCVCD",label:"Doc No",field:"TRCV_RCVCD",sortable:!0,align:"left"},{name:"MSUP_SUPNM",label:"Supplier",field:"MSUP_SUPNM",sortable:!0,align:"left"},{name:"MITM_ITMNM",label:"Item Name",field:"MITM_ITMNM",sortable:!0,align:"left"},{name:"TRCVBC_BCQT",label:"Qty",field:"TRCVBC_BCQT",sortable:!0,align:"right",format:o=>`${o.toLocaleString()}`}]),n=d(!1),m=d(""),f=d("");R(()=>{b()});const b=async()=>{n.value=!0,await v.post("receiveBarcodes/searchAPI",{searchBy:m.value,searchValue:f.value}).then(o=>{n.value=!1,w.value=o.data.data}).catch(o=>{n.value=!1})},I=o=>{u.dialog({title:"Confirmation",message:"Are you sure want to print this barcode ?",cancel:!0,persistent:!0}).onOk(async()=>{n.value=!0,await v.post("receiveBarcodes/printBarcode",{data:[o]}).then(l=>{n.value=!1,window.open("").document.write("<iframe width='100%' height='100%' src='data:application/pdf;base64, "+encodeURI(l.data)+"'></iframe>")})})},D=o=>{u.dialog({title:"Confirmation",message:"Are you sure want to delete this barcode ?",cancel:!0,persistent:!0}).onOk(async()=>{n.value=!0,await v.delete(`receiveBarcode/${o}`).then(l=>{n.value=!1,b()})})},M=(o=[])=>{u.dialog({component:incomingCreate,componentProps:{dataHeader:o}}).onOk(async l=>{getOutgoingData()})};return(o,l)=>(c(),C("div",x,[i("div",A,[O,i("div",L,[t(g,{icon:"add",color:"blue",onClick:l[0]||(l[0]=e=>M())},{default:a(()=>[t(p,null,{default:a(()=>[s("Create Barcode")]),_:1})]),_:1})])]),t(S),i("div",E,[i("div",F,[t(U,{title:"Barcoded Incoming List",rows:w.value,columns:k.value,"row-key":"TRCVBC_BCCD",loading:n.value,dense:"",pagination:{rowsPerPage:20},class:"my-sticky-header-column-table"},{"top-right":a(()=>[t($,{outlined:"",modelValue:m.value,"onUpdate:modelValue":l[1]||(l[1]=e=>m.value=e),options:o.col,label:"Search Columns","option-value":"name","option-label":"label","emit-value":"",dense:"","map-options":""},null,8,["modelValue","options"]),t(P,{borderless:"",dense:"",modelValue:f.value,"onUpdate:modelValue":[l[2]||(l[2]=e=>f.value=e),l[3]||(l[3]=e=>o.getOutgoingData())],placeholder:"Search",outlined:"",debounce:"1000"},{append:a(()=>[t(N,{name:"search"})]),_:1},8,["modelValue"])]),header:a(e=>[t(Q,{props:e},{default:a(()=>[t(V,{"auto-width":""},{default:a(()=>[s("Action")]),_:1}),(c(!0),C(B,null,h(e.cols,r=>(c(),T(V,{key:r.name,props:e},{default:a(()=>[s(_(r.label),1)]),_:2},1032,["props"]))),128))]),_:2},1032,["props"])]),body:a(e=>[t(Q,{props:e},{default:a(()=>[t(y,{"auto-width":""},{default:a(()=>[t(g,{flat:"",color:"red",icon:"delete",onClick:r=>D(e.row.TRCVBC_BCCD),dense:"",disable:e.row.det&&e.row.det.length===0},{default:a(()=>[t(p,null,{default:a(()=>[s(_(e.row.det&&e.row.det.length===0?"All qty already confirmed":"Cancel Barcode"),1)]),_:2},1024)]),_:2},1032,["onClick","disable"]),t(g,{flat:"",color:"indigo",icon:"print",onClick:r=>I(e.row),dense:"",disable:e.row.det&&e.row.det.length===0},{default:a(()=>[t(p,null,{default:a(()=>[s("Print Barcode")]),_:1})]),_:2},1032,["onClick","disable"])]),_:2},1024),(c(!0),C(B,null,h(e.cols,r=>(c(),T(y,{key:r.name,props:e},{default:a(()=>[s(_(r.value),1)]),_:2},1032,["props"]))),128))]),_:2},1032,["props"])]),_:1},8,["rows","columns","loading"])])])]))}};export{Z as default};
