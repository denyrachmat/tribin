import{t as i,o as V,C as u,R as f,F as t,aI as k,J as r,E as a,$ as D,av as A,S as Q,T as w,D as T,I as d,P as c,Q as h}from"./index.86d107a2.js";import{Q as q}from"./QSelect.a58b7123.js";import{Q as B,a as b}from"./QTable.01d6bc68.js";import{Q as g,a as L}from"./QTd.3016428b.js";import{Q as P}from"./QTooltip.a06a11c9.js";import{api_web as v}from"./axios.255eaf2a.js";import{u as I}from"./use-quasar.4d94120d.js";import"./QItemLabel.2d2c0619.js";import"./format.24898063.js";import"./QList.1349df42.js";const N={class:"q-pa-md"},S=r("div",{class:"row q-pb-md"},[r("div",{class:"col"},[r("span",{class:"text-h4"},"Transfer Request")]),r("div",{class:"col text-right"})],-1),F={class:"row q-pt-md"},Y={class:"col"},X={__name:"transferRequestIndex",setup($){const _=I(),C=i([]),R=i([{name:"TLOCREQ_DOCNO",label:"Doc Np",field:"TLOCREQ_DOCNO",sortable:!0,align:"left"},{name:"TLOCREQ_FRLOC",label:"From Location",field:"TLOCREQ_FRLOC",sortable:!0,align:"left"},{name:"TLOCREQ_TOLOC",label:"To Location",field:"TLOCREQ_TOLOC",sortable:!0,align:"left"},{name:"TLOCREQ_ISREP",label:"Is Replacement ?",field:"TLOCREQ_ISREP",sortable:!0,format:n=>`${n==1?"Yes":"No"}`,align:"left"}]),o=i(!1),m=i(""),p=i("");V(()=>{O()});const O=async()=>{o.value=!0,await v.post("inventory/transferRequest/searchAPI",{searchBy:m.value,searchValue:p.value}).then(n=>{o.value=!1,C.value=n.data.data}).catch(n=>{o.value=!1})},E=n=>{_.dialog({title:"Confirmation",message:"Are you sure want to approve this transfer ?",cancel:!0,persistent:!0}).onOk(async()=>{o.value=!0,await v.get(`inventory/transferRequest/approve/${btoa(n)}`).then(l=>{o.value=!1,O()}).catch(l=>{o.value=!1})})},y=n=>{_.dialog({title:"Confirmation",message:"Are you sure want to print this transfer ?",cancel:!0,persistent:!0}).onOk(async()=>{o.value=!0,await v.post("inventory/printHandoverPDF",{data:btoa(n)}).then(l=>{o.value=!1,window.open("").document.write("<iframe width='100%' height='100%' src='data:application/pdf;base64, "+encodeURI(l.data)+"'></iframe>")}).catch(l=>{o.value=!1})})};return(n,l)=>(u(),f("div",N,[S,t(k),r("div",F,[r("div",Y,[t(B,{title:"Transfer Request List",rows:C.value,columns:R.value,"row-key":"TDLVORD_DLVCD",loading:o.value,dense:"",pagination:{rowsPerPage:20},class:"my-sticky-header-column-table"},{"top-right":a(()=>[t(q,{outlined:"",modelValue:m.value,"onUpdate:modelValue":l[0]||(l[0]=e=>m.value=e),options:R.value,label:"Search Columns","option-value":"name","option-label":"label","emit-value":"",dense:"","map-options":""},null,8,["modelValue","options"]),t(D,{borderless:"",dense:"",modelValue:p.value,"onUpdate:modelValue":[l[1]||(l[1]=e=>p.value=e),l[2]||(l[2]=e=>n.getOutgoingData())],placeholder:"Search",outlined:"",debounce:"1000"},{append:a(()=>[t(A,{name:"search"})]),_:1},8,["modelValue"])]),header:a(e=>[t(g,{props:e},{default:a(()=>[(u(!0),f(Q,null,w(e.cols,s=>(u(),T(b,{key:s.name,props:e},{default:a(()=>[d(c(s.label),1)]),_:2},1032,["props"]))),128)),t(b,{"auto-width":""},{default:a(()=>[d("Action")]),_:1})]),_:2},1032,["props"])]),body:a(e=>[t(g,{props:e},{default:a(()=>[(u(!0),f(Q,null,w(e.cols,s=>(u(),T(L,{key:s.name,props:e},{default:a(()=>[d(c(s.value),1)]),_:2},1032,["props"]))),128)),t(L,{"auto-width":""},{default:a(()=>[t(h,{flat:"",color:e.row.TLOCREQ_APPRVBY!==null?"grey":"indigo",icon:"check",onClick:s=>E(e.row.TLOCREQ_DOCNO),dense:"",disable:e.row.TLOCREQ_APPRVBY!==null},{default:a(()=>[t(P,null,{default:a(()=>[d(c(e.row.TLOCREQ_APPRVBY!==null?"Request has been approved":"Approve Data"),1)]),_:2},1024)]),_:2},1032,["color","onClick","disable"]),t(h,{flat:"",color:e.row.TLOCREQ_APPRVBY!==null?"cyan":"grey",icon:"print",onClick:s=>y(e.row.TLOCREQ_DOCNO),dense:"",disable:e.row.TLOCREQ_APPRVBY===null},{default:a(()=>[t(P,null,{default:a(()=>[d(c(e.row.TLOCREQ_APPRVBY===null?"Please Aprove first":"Print handover request"),1)]),_:2},1024)]),_:2},1032,["color","onClick","disable"])]),_:2},1024)]),_:2},1032,["props"])]),_:1},8,["rows","columns","loading"])])])]))}};export{X as default};
