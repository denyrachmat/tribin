import{u as T,j as R,k as U,l as _}from"./QTable.93a40213.js";import{s as r,o as B,B as d,P as f,I as b,E as o,D as a,Z as O,am as N,R as g,S as C,C as D,H as s,O as V,Q as m}from"./index.c2075af3.js";import{Q as k,a as Q}from"./QTd.12fb3732.js";import{Q as v}from"./QTooltip.928f75eb.js";import{api_web as u}from"./axios.37c98ba5.js";const P={class:"q-pa-md"},W={class:"row"},$={class:"col"},q={__name:"invoiceView",setup(M){T();const w=r([]),h=r([{name:"TDLVORD_DLVCD",label:"DO Number",field:"TDLVORD_DLVCD",sortable:!0,align:"left"},{name:"MCUS_CUSNM",label:"Customer",field:"MCUS_CUSNM",sortable:!0,align:"left"}]),l=r(!1),c=r(""),p=r("");B(()=>{y()});const y=async()=>{l.value=!0,await u.post("invoices/search",{searchBy:c.value,searchValue:p.value}).then(n=>{l.value=!1,w.value=n.data.data}).catch(n=>{l.value=!1})},S=async n=>{l.value=!0,await u.post("invoices/printInvoice",n).then(t=>{l.value=!1,window.open("").document.write("<iframe width='100%' height='100%' src='data:application/pdf;base64, "+encodeURI(t.data)+"'></iframe>")}).catch(t=>{l.value=!1})},I=async n=>{l.value=!0,await u.get(`invoices/printKwitansi/${btoa(n)}`).then(t=>{l.value=!1,window.open("").document.write("<iframe width='100%' height='100%' src='data:application/pdf;base64, "+encodeURI(t.data)+"'></iframe>")}).catch(t=>{l.value=!1})},L=async n=>{l.value=!0,await u.get(`invoices/printSJ/${btoa(n)}`).then(t=>{l.value=!1,window.open("").document.write("<iframe width='100%' height='100%' src='data:application/pdf;base64, "+encodeURI(t.data)+"'></iframe>")}).catch(t=>{l.value=!1})};return(n,t)=>(d(),f("div",P,[b("div",W,[b("div",$,[o(R,{title:"Invoice List",rows:w.value,columns:h.value,"row-key":"name",loading:l.value,dense:"",pagination:{rowsPerPage:20},class:"my-sticky-header-column-table"},{"top-right":a(()=>[o(U,{outlined:"",modelValue:c.value,"onUpdate:modelValue":t[0]||(t[0]=e=>c.value=e),options:h.value,label:"Search Columns","option-value":"name","option-label":"label","emit-value":"",dense:"","map-options":""},null,8,["modelValue","options"]),o(O,{borderless:"",dense:"",modelValue:p.value,"onUpdate:modelValue":[t[1]||(t[1]=e=>p.value=e),t[2]||(t[2]=e=>n.dataOutstanding())],placeholder:"Search",outlined:"",debounce:"1000"},{append:a(()=>[o(N,{name:"search"})]),_:1},8,["modelValue"])]),header:a(e=>[o(k,{props:e},{default:a(()=>[(d(!0),f(g,null,C(e.cols,i=>(d(),D(_,{key:i.name,props:e},{default:a(()=>[s(V(i.label),1)]),_:2},1032,["props"]))),128)),o(_,{"auto-width":""},{default:a(()=>[s("Action")]),_:1})]),_:2},1032,["props"])]),body:a(e=>[o(k,{props:e},{default:a(()=>[(d(!0),f(g,null,C(e.cols,i=>(d(),D(Q,{key:i.name,props:e},{default:a(()=>[s(V(i.value),1)]),_:2},1032,["props"]))),128)),o(Q,{"auto-width":""},{default:a(()=>[o(m,{flat:"",color:"green",icon:"print",dense:"",onClick:i=>S(e.row)},{default:a(()=>[o(v,null,{default:a(()=>[s("Print Invoice")]),_:1})]),_:2},1032,["onClick"]),o(m,{flat:"",color:"indigo",icon:"print",dense:"",onClick:i=>I(e.row.TDLVORD_DLVCD)},{default:a(()=>[o(v,null,{default:a(()=>[s("Print Receipt")]),_:1})]),_:2},1032,["onClick"]),o(m,{flat:"",color:"orange",icon:"print",dense:"",onClick:i=>L(e.row.TDLVORD_DLVCD)},{default:a(()=>[o(v,null,{default:a(()=>[s("Print Surat Jalan")]),_:1})]),_:2},1032,["onClick"])]),_:2},1024)]),_:2},1032,["props"])]),_:1},8,["rows","columns","loading"])])])]))}};export{q as default};
