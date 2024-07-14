import{t as i,o as D,C as d,R as f,F as t,aM as y,J as s,E as a,$ as k,at as N,I as c,S as _,T as v,D as T,P as p,Q as b}from"./index.de8191cc.js";import{e as S}from"./QSelect.8582b3a4.js";import{a as P,b as g}from"./QTable.06b4fb02.js";import{Q as w,a as B}from"./QTd.6eb7a696.js";import{Q as h}from"./QTooltip.fcc08f9f.js";import{api_web as V}from"./axios.e24c2dbd.js";import{u as O}from"./format.8fd05917.js";const U={class:"q-pa-md"},$=s("div",{class:"row q-pb-md"},[s("div",{class:"col"},[s("span",{class:"text-h4"},"Incoming Barcode")]),s("div",{class:"col text-right"})],-1),q={class:"row q-pt-md"},E={class:"col"},z={__name:"incomingBarcodeIndex",setup(F){const I=O(),C=i([]),Q=i([{name:"TRCVBC_BCCD",label:"Barcode ID",field:"TRCVBC_BCCD",sortable:!0,align:"left"},{name:"TRCV_RCVCD",label:"Doc No",field:"TRCV_RCVCD",sortable:!0,align:"left"},{name:"MSUP_SUPNM",label:"Supplier",field:"MSUP_SUPNM",sortable:!0,align:"left"},{name:"MITM_ITMNM",label:"Item Name",field:"MITM_ITMNM",sortable:!0,align:"left"},{name:"TRCVBC_BCQT",label:"Qty",field:"TRCVBC_BCQT",sortable:!0,align:"right",format:l=>`${l.toLocaleString()}`}]),r=i(!1),u=i(""),m=i("");D(()=>{M()});const M=async()=>{r.value=!0,await V.post("receiveBarcode/searchAPI",{searchBy:u.value,searchValue:m.value}).then(l=>{r.value=!1,C.value=l.data.data}).catch(l=>{r.value=!1})},R=l=>{I.dialog({title:"Confirmation",message:"Are you sure want to print this barcode ?",cancel:!0,persistent:!0}).onOk(async()=>{r.value=!0,await V.post("receiveBarcode/printBarcode",{data:[l]}).then(o=>{r.value=!1,window.open("").document.write("<iframe width='100%' height='100%' src='data:application/pdf;base64, "+encodeURI(o.data)+"'></iframe>")})})};return(l,o)=>(d(),f("div",U,[$,t(y),s("div",q,[s("div",E,[t(P,{title:"Barcoded Incoming List",rows:C.value,columns:Q.value,"row-key":"TRCVBC_BCCD",loading:r.value,dense:"",pagination:{rowsPerPage:20},class:"my-sticky-header-column-table"},{"top-right":a(()=>[t(S,{outlined:"",modelValue:u.value,"onUpdate:modelValue":o[0]||(o[0]=e=>u.value=e),options:l.col,label:"Search Columns","option-value":"name","option-label":"label","emit-value":"",dense:"","map-options":""},null,8,["modelValue","options"]),t(k,{borderless:"",dense:"",modelValue:m.value,"onUpdate:modelValue":[o[1]||(o[1]=e=>m.value=e),o[2]||(o[2]=e=>l.getOutgoingData())],placeholder:"Search",outlined:"",debounce:"1000"},{append:a(()=>[t(N,{name:"search"})]),_:1},8,["modelValue"])]),header:a(e=>[t(w,{props:e},{default:a(()=>[t(g,{"auto-width":""},{default:a(()=>[c("Action")]),_:1}),(d(!0),f(_,null,v(e.cols,n=>(d(),T(g,{key:n.name,props:e},{default:a(()=>[c(p(n.label),1)]),_:2},1032,["props"]))),128))]),_:2},1032,["props"])]),body:a(e=>[t(w,{props:e},{default:a(()=>[t(B,{"auto-width":""},{default:a(()=>[t(b,{flat:"",color:"red",icon:"delete",onClick:n=>l.onDelete(e.row.id),dense:"",disable:parseInt(e.row.CONFIRMED_QTY)==e.row.TOT_RCV},{default:a(()=>[t(h,null,{default:a(()=>[c(p(parseInt(e.row.CONFIRMED_QTY)==e.row.TOT_RCV?"All qty already confirmed":"Cancel Barcode"),1)]),_:2},1024)]),_:2},1032,["onClick","disable"]),t(b,{flat:"",color:"indigo",icon:"print",onClick:n=>R(e.row),dense:"",disable:parseInt(e.row.CONFIRMED_QTY)==e.row.TOT_RCV},{default:a(()=>[t(h,null,{default:a(()=>[c("Print Barcode")]),_:1})]),_:2},1032,["onClick","disable"])]),_:2},1024),(d(!0),f(_,null,v(e.cols,n=>(d(),T(B,{key:n.name,props:e},{default:a(()=>[c(p(n.value),1)]),_:2},1032,["props"]))),128))]),_:2},1032,["props"])]),_:1},8,["rows","columns","loading"])])])]))}};export{z as default};
