import{u as T,j as B,k as I,l as v}from"./QTable.dc52c5c7.js";import{s as r,o as L,B as u,P as m,I as _,E as l,D as e,Z as N,am as U,R as g,S as h,C as b,H as i,O as V,Q as w}from"./index.de986107.js";import{Q as C,a as Q}from"./QTd.d38599f0.js";import{Q as D}from"./QTooltip.752d15ed.js";import{api_web as k}from"./axios.b76bd004.js";const M={class:"q-pa-md"},O={class:"row"},P={class:"col"},A={__name:"invoiceView",setup(R){T();const p=r([]),f=r([{name:"TDLVORD_DLVCD",label:"DO Number",field:"TDLVORD_DLVCD",sortable:!0,align:"left"},{name:"MCUS_CUSNM",label:"Customer",field:"MCUS_CUSNM",sortable:!0,align:"left"}]),o=r(!1),d=r(""),c=r("");L(()=>{y()});const y=async()=>{o.value=!0,await k.post("invoices/search",{searchBy:d.value,searchValue:c.value}).then(s=>{o.value=!1,p.value=s.data.data}).catch(s=>{o.value=!1})},S=async s=>{o.value=!0,await k.post("invoices/printInvoice",s).then(t=>{o.value=!1,console.log(t)}).catch(t=>{o.value=!1})};return(s,t)=>(u(),m("div",M,[_("div",O,[_("div",P,[l(B,{title:"Invoice List",rows:p.value,columns:f.value,"row-key":"name",loading:o.value,dense:"",pagination:{rowsPerPage:20},class:"my-sticky-header-column-table"},{"top-right":e(()=>[l(I,{outlined:"",modelValue:d.value,"onUpdate:modelValue":t[0]||(t[0]=a=>d.value=a),options:f.value,label:"Search Columns","option-value":"name","option-label":"label","emit-value":"",dense:"","map-options":""},null,8,["modelValue","options"]),l(N,{borderless:"",dense:"",modelValue:c.value,"onUpdate:modelValue":[t[1]||(t[1]=a=>c.value=a),t[2]||(t[2]=a=>s.dataOutstanding())],placeholder:"Search",outlined:"",debounce:"1000"},{append:e(()=>[l(U,{name:"search"})]),_:1},8,["modelValue"])]),header:e(a=>[l(C,{props:a},{default:e(()=>[(u(!0),m(g,null,h(a.cols,n=>(u(),b(v,{key:n.name,props:a},{default:e(()=>[i(V(n.label),1)]),_:2},1032,["props"]))),128)),l(v,{"auto-width":""},{default:e(()=>[i("Action")]),_:1})]),_:2},1032,["props"])]),body:e(a=>[l(C,{props:a},{default:e(()=>[(u(!0),m(g,null,h(a.cols,n=>(u(),b(Q,{key:n.name,props:a},{default:e(()=>[i(V(n.value),1)]),_:2},1032,["props"]))),128)),l(Q,{"auto-width":""},{default:e(()=>[l(w,{flat:"",color:"green",icon:"print",dense:"",onClick:n=>S(a.row)},{default:e(()=>[l(D,null,{default:e(()=>[i("Print Invoice")]),_:1})]),_:2},1032,["onClick"]),l(w,{flat:"",color:"green",icon:"indigo",dense:""},{default:e(()=>[l(D,null,{default:e(()=>[i("Print Receipt")]),_:1})]),_:1})]),_:2},1024)]),_:2},1032,["props"])]),_:1},8,["rows","columns","loading"])])])]))}};export{A as default};
