import{u as O,j as R,k as U,l as _}from"./QTable.e89c3978.js";import{s as r,o as B,B as d,P as f,I as g,E as t,D as a,Z as $,am as N,R as b,S as C,C as D,H as s,O as V,Q as m}from"./index.25228a7b.js";import{Q as k,a as y}from"./QTd.04584db7.js";import{Q as v}from"./QTooltip.bc842b8b.js";import{api_web as u}from"./axios.8d4875bc.js";const P={class:"q-pa-md"},W={class:"row"},M={class:"col"},G={__name:"invoiceView",setup(x){const Q=O(),w=r([]),h=r([{name:"TDLVORD_DLVCD",label:"DO Number",field:"TDLVORD_DLVCD",sortable:!0,align:"left"},{name:"MCUS_CUSNM",label:"Customer",field:"MCUS_CUSNM",sortable:!0,align:"left"}]),l=r(!1),c=r(""),p=r("");B(()=>{S()});const S=async()=>{l.value=!0,await u.post("invoices/search",{searchBy:c.value,searchValue:p.value}).then(n=>{l.value=!1,w.value=n.data.data}).catch(n=>{l.value=!1})},I=async n=>{l.value=!0,await u.post("invoices/printInvoice",n).then(o=>{l.value=!1,window.open("").document.write("<iframe width='100%' height='100%' src='data:application/pdf;base64, "+encodeURI(o.data)+"'></iframe>")}).catch(o=>{l.value=!1})},L=async n=>{l.value=!0,await u.get(`invoices/printKwitansi/${btoa(n)}`).then(o=>{l.value=!1,window.open("").document.write("<iframe width='100%' height='100%' src='data:application/pdf;base64, "+encodeURI(o.data)+"'></iframe>")}).catch(o=>{l.value=!1})},T=async n=>{Q.dialog({title:"Options",message:"Choose type surat jalan",options:{type:"radio",model:"general",items:[{label:"General",value:"general"},{label:"Forklift",value:"forklift"},{label:"Genset",value:"genset"}]},cancel:!0,persistent:!0}).onOk(async o=>{l.value=!0,await u.get(`invoices/printSJ/${btoa(n)}`).then(e=>{l.value=!1,window.open("").document.write("<iframe width='100%' height='100%' src='data:application/pdf;base64, "+encodeURI(e.data)+"'></iframe>")}).catch(e=>{l.value=!1})})};return(n,o)=>(d(),f("div",P,[g("div",W,[g("div",M,[t(R,{title:"Invoice List",rows:w.value,columns:h.value,"row-key":"name",loading:l.value,dense:"",pagination:{rowsPerPage:20},class:"my-sticky-header-column-table"},{"top-right":a(()=>[t(U,{outlined:"",modelValue:c.value,"onUpdate:modelValue":o[0]||(o[0]=e=>c.value=e),options:h.value,label:"Search Columns","option-value":"name","option-label":"label","emit-value":"",dense:"","map-options":""},null,8,["modelValue","options"]),t($,{borderless:"",dense:"",modelValue:p.value,"onUpdate:modelValue":[o[1]||(o[1]=e=>p.value=e),o[2]||(o[2]=e=>n.dataOutstanding())],placeholder:"Search",outlined:"",debounce:"1000"},{append:a(()=>[t(N,{name:"search"})]),_:1},8,["modelValue"])]),header:a(e=>[t(k,{props:e},{default:a(()=>[(d(!0),f(b,null,C(e.cols,i=>(d(),D(_,{key:i.name,props:e},{default:a(()=>[s(V(i.label),1)]),_:2},1032,["props"]))),128)),t(_,{"auto-width":""},{default:a(()=>[s("Action")]),_:1})]),_:2},1032,["props"])]),body:a(e=>[t(k,{props:e},{default:a(()=>[(d(!0),f(b,null,C(e.cols,i=>(d(),D(y,{key:i.name,props:e},{default:a(()=>[s(V(i.value),1)]),_:2},1032,["props"]))),128)),t(y,{"auto-width":""},{default:a(()=>[t(m,{flat:"",color:"green",icon:"print",dense:"",onClick:i=>I(e.row)},{default:a(()=>[t(v,null,{default:a(()=>[s("Print Invoice")]),_:1})]),_:2},1032,["onClick"]),t(m,{flat:"",color:"indigo",icon:"print",dense:"",onClick:i=>L(e.row.TDLVORD_DLVCD)},{default:a(()=>[t(v,null,{default:a(()=>[s("Print Receipt")]),_:1})]),_:2},1032,["onClick"]),t(m,{flat:"",color:"orange",icon:"print",dense:"",onClick:i=>T(e.row.TDLVORD_DLVCD)},{default:a(()=>[t(v,null,{default:a(()=>[s("Print Surat Jalan")]),_:1})]),_:2},1032,["onClick"])]),_:2},1024)]),_:2},1032,["props"])]),_:1},8,["rows","columns","loading"])])])]))}};export{G as default};
