import{t as u,o as E,C as i,R as f,F as t,aM as y,J as r,E as a,$ as V,at as k,S as _,T as C,D as O,I as d,P as Q,Q as D}from"./index.74b9c478.js";import{e as q}from"./QSelect.d252a962.js";import{a as I,b as R}from"./QTable.88ee543c.js";import{Q as T,a as b}from"./QTd.732cf379.js";import{Q as N}from"./QTooltip.6ca11845.js";import{api_web as g}from"./axios.1b54c3f4.js";import{u as P}from"./format.c4dc1dd4.js";const S={class:"q-pa-md"},B=r("div",{class:"row q-pb-md"},[r("div",{class:"col"},[r("span",{class:"text-h4"},"Transfer Request")]),r("div",{class:"col text-right"})],-1),x={class:"row q-pt-md"},A={class:"col"},G={__name:"transferRequestIndex",setup(F){const h=P(),c=u([]),v=u([{name:"TLOCREQ_DOCNO",label:"Doc Np",field:"TLOCREQ_DOCNO",sortable:!0,align:"left"},{name:"TLOCREQ_FRLOC",label:"From Location",field:"TLOCREQ_FRLOC",sortable:!0,align:"left"},{name:"TLOCREQ_TOLOC",label:"To Location",field:"TLOCREQ_TOLOC",sortable:!0,align:"left"},{name:"TLOCREQ_ISREP",label:"Is Replacement ?",field:"TLOCREQ_ISREP",sortable:!0,format:o=>`${o==1?"Yes":"No"}`,align:"left"}]),s=u(!1),p=u(""),m=u("");E(()=>{L()});const L=async()=>{s.value=!0,await g.post("inventory/transferRequest/searchAPI",{searchBy:p.value,searchValue:m.value}).then(o=>{s.value=!1,c.value=o.data.data}).catch(o=>{s.value=!1})},w=o=>{h.dialog({title:"Confirmation",message:"Are you sure want to approve this transfer ?",cancel:!0,persistent:!0}).onOk(async()=>{s.value=!0,await g.get(`inventory/transferRequest/approve/${btoa(o)}`).then(l=>{s.value=!1,c.value=l.data.data}).catch(l=>{s.value=!1})})};return(o,l)=>(i(),f("div",S,[B,t(y),r("div",x,[r("div",A,[t(I,{title:"Transfer Request List",rows:c.value,columns:v.value,"row-key":"TDLVORD_DLVCD",loading:s.value,dense:"",pagination:{rowsPerPage:20},class:"my-sticky-header-column-table"},{"top-right":a(()=>[t(q,{outlined:"",modelValue:p.value,"onUpdate:modelValue":l[0]||(l[0]=e=>p.value=e),options:v.value,label:"Search Columns","option-value":"name","option-label":"label","emit-value":"",dense:"","map-options":""},null,8,["modelValue","options"]),t(V,{borderless:"",dense:"",modelValue:m.value,"onUpdate:modelValue":[l[1]||(l[1]=e=>m.value=e),l[2]||(l[2]=e=>o.getOutgoingData())],placeholder:"Search",outlined:"",debounce:"1000"},{append:a(()=>[t(k,{name:"search"})]),_:1},8,["modelValue"])]),header:a(e=>[t(T,{props:e},{default:a(()=>[(i(!0),f(_,null,C(e.cols,n=>(i(),O(R,{key:n.name,props:e},{default:a(()=>[d(Q(n.label),1)]),_:2},1032,["props"]))),128)),t(R,{"auto-width":""},{default:a(()=>[d("Action")]),_:1})]),_:2},1032,["props"])]),body:a(e=>[t(T,{props:e},{default:a(()=>[(i(!0),f(_,null,C(e.cols,n=>(i(),O(b,{key:n.name,props:e},{default:a(()=>[d(Q(n.value),1)]),_:2},1032,["props"]))),128)),t(b,{"auto-width":""},{default:a(()=>[t(D,{flat:"",color:"indigo",icon:"check",onClick:n=>w(e.row.TLOCREQ_DOCNO),dense:"",disable:e.row.TLOCREQ_APPRVBY!==null},{default:a(()=>[t(N,null,{default:a(()=>[d("Approve Data")]),_:1})]),_:2},1032,["onClick","disable"])]),_:2},1024)]),_:2},1032,["props"])]),_:1},8,["rows","columns","loading"])])])]))}};export{G as default};
