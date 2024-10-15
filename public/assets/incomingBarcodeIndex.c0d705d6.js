import{Q as p}from"./QTooltip.c1478b5b.js";import{t as d,o as S,C as c,R as C,J as i,F as t,E as a,Q as _,aY as P,I as r,$ as R,at as N,S as h,T as w,D as T,P as g}from"./index.3b9c52c5.js";import{c as $}from"./QSelect.cb6d904d.js";import{Q as U,a as V}from"./QTable.fef2b15f.js";import{Q,a as y}from"./QTd.a1cdd702.js";import{api_web as v}from"./axios.2a342cf6.js";import{u as q}from"./format.f0268495.js";import x from"./barcodeCreate.e7da8eac.js";import"./QList.d4f55b86.js";import"./use-dialog-plugin-component.0b9c7880.js";const A={class:"q-pa-md"},O={class:"row q-pb-md"},L=i("div",{class:"col"},[i("span",{class:"text-h4"},"Incoming Barcode")],-1),E={class:"col text-right"},F={class:"row q-pt-md"},H={class:"col"},te={__name:"incomingBarcodeIndex",setup(J){const u=q(),B=d([]),k=d([{name:"TRCVBC_BCCD",label:"Barcode ID",field:"TRCVBC_BCCD",sortable:!0,align:"left"},{name:"TRCV_RCVCD",label:"Doc No",field:"TRCV_RCVCD",sortable:!0,align:"left"},{name:"MSUP_SUPNM",label:"Supplier",field:"MSUP_SUPNM",sortable:!0,align:"left"},{name:"MITM_ITMNM",label:"Item Name",field:"MITM_ITMNM",sortable:!0,align:"left"},{name:"TRCVBC_BCQT",label:"Qty",field:"TRCVBC_BCQT",sortable:!0,align:"right",format:o=>`${o.toLocaleString()}`}]),n=d(!1),m=d(""),f=d("");S(()=>{b()});const b=async()=>{n.value=!0,await v.post("receiveBarcodes/searchAPI",{searchBy:m.value,searchValue:f.value}).then(o=>{n.value=!1,B.value=o.data.data}).catch(o=>{n.value=!1})},D=o=>{u.dialog({title:"Confirmation",message:"Are you sure want to print this barcode ?",cancel:!0,persistent:!0}).onOk(async()=>{n.value=!0,await v.post("receiveBarcodes/printBarcode",{data:[o]}).then(l=>{n.value=!1})})},I=o=>{u.dialog({title:"Confirmation",message:"Are you sure want to delete this barcode ?",cancel:!0,persistent:!0}).onOk(async()=>{n.value=!0,await v.delete(`receiveBarcode/${o}`).then(l=>{n.value=!1,b()})})},M=(o=[])=>{u.dialog({component:x,componentProps:{dataHeader:o}}).onOk(async l=>{getOutgoingData()})};return(o,l)=>(c(),C("div",A,[i("div",O,[L,i("div",E,[t(_,{icon:"add",color:"blue",onClick:l[0]||(l[0]=e=>M())},{default:a(()=>[t(p,null,{default:a(()=>[r("Create Barcode")]),_:1})]),_:1})])]),t(P),i("div",F,[i("div",H,[t(U,{title:"Barcoded Incoming List",rows:B.value,columns:k.value,"row-key":"TRCVBC_BCCD",loading:n.value,dense:"",pagination:{rowsPerPage:20},class:"my-sticky-header-column-table"},{"top-right":a(()=>[t($,{outlined:"",modelValue:m.value,"onUpdate:modelValue":l[1]||(l[1]=e=>m.value=e),options:o.col,label:"Search Columns","option-value":"name","option-label":"label","emit-value":"",dense:"","map-options":""},null,8,["modelValue","options"]),t(R,{borderless:"",dense:"",modelValue:f.value,"onUpdate:modelValue":[l[2]||(l[2]=e=>f.value=e),l[3]||(l[3]=e=>o.getOutgoingData())],placeholder:"Search",outlined:"",debounce:"1000"},{append:a(()=>[t(N,{name:"search"})]),_:1},8,["modelValue"])]),header:a(e=>[t(Q,{props:e},{default:a(()=>[t(V,{"auto-width":""},{default:a(()=>[r("Action")]),_:1}),(c(!0),C(h,null,w(e.cols,s=>(c(),T(V,{key:s.name,props:e},{default:a(()=>[r(g(s.label),1)]),_:2},1032,["props"]))),128))]),_:2},1032,["props"])]),body:a(e=>[t(Q,{props:e},{default:a(()=>[t(y,{"auto-width":""},{default:a(()=>[t(_,{flat:"",color:"red",icon:"delete",onClick:s=>I(e.row.TRCVBC_BCCD),dense:"",disable:e.row.det&&e.row.det.length===0},{default:a(()=>[t(p,null,{default:a(()=>[r(g(e.row.det&&e.row.det.length===0?"All qty already confirmed":"Cancel Barcode"),1)]),_:2},1024)]),_:2},1032,["onClick","disable"]),t(_,{flat:"",color:"indigo",icon:"print",onClick:s=>D(e.row),dense:"",disable:e.row.det&&e.row.det.length===0},{default:a(()=>[t(p,null,{default:a(()=>[r("Print Barcode")]),_:1})]),_:2},1032,["onClick","disable"])]),_:2},1024),(c(!0),C(h,null,w(e.cols,s=>(c(),T(y,{key:s.name,props:e},{default:a(()=>[r(g(s.value),1)]),_:2},1032,["props"]))),128))]),_:2},1032,["props"])]),_:1},8,["rows","columns","loading"])])])]))}};export{te as default};
