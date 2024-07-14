import{Q as p}from"./QTooltip.1cce05ef.js";import{t as u,o as E,C as d,R as f,J as i,F as t,E as e,Q as _,aM as V,I as r,$ as N,at as I,S as b,T as Q,D as T,P as D}from"./index.4c80060b.js";import{e as S}from"./QSelect.7b84b4b3.js";import{a as $,b as L}from"./QTable.2644b6c7.js";import{Q as h,a as R}from"./QTd.9b6c9de7.js";import{api_web as w}from"./axios.d4f63fd6.js";import{u as q}from"./format.54bff36a.js";const P={class:"q-pa-md"},x={class:"row q-pb-md"},B=i("div",{class:"col"},[i("span",{class:"text-h4"},"Outgoing")],-1),F={class:"col text-right"},A={class:"row q-pt-md"},M={class:"col"},W={__name:"transferRequestIndex",setup(U){const g=q(),v=u([]),C=u([{name:"TLOCREQ_DOCNO",label:"Doc Np",field:"TLOCREQ_DOCNO",sortable:!0,align:"left"},{name:"TLOCREQ_FRLOC",label:"From Location",field:"TLOCREQ_FRLOC",sortable:!0,align:"left"},{name:"TLOCREQ_TOLOC",label:"To Location",field:"TLOCREQ_TOLOC",sortable:!0,align:"left"},{name:"TLOCREQ_ISREP",label:"Is Replacement ?",field:"TLOCREQ_ISREP",sortable:!0,format:o=>`${o==1?"Yes":"No"}`,align:"left"}]),n=u(!1),c=u(""),m=u("");E(()=>{k()});const k=async()=>{n.value=!0,await w.post("inventory/transferRequest/searchAPI",{searchBy:c.value,searchValue:m.value}).then(o=>{n.value=!1,v.value=o.data.data}).catch(o=>{n.value=!1})},O=(o=[])=>{g.dialog({component:outgoingCreate,componentProps:{dataHeader:o}}).onOk(async l=>{getOutgoingData()})},y=o=>{g.dialog({title:"Confirmation",message:"Are you sure want to delete this data ?",cancel:!0,persistent:!0}).onOk(async()=>{n.value=!0,await w.delete(`delivery/${btoa(o)}`).then(l=>{n.value=!1,getOutgoingData()})})};return(o,l)=>(d(),f("div",P,[i("div",x,[B,i("div",F,[t(_,{icon:"add",color:"blue",onClick:l[0]||(l[0]=a=>O([]))},{default:e(()=>[t(p,null,{default:e(()=>[r("Create New Delivery")]),_:1})]),_:1})])]),t(V),i("div",A,[i("div",M,[t($,{title:"Outgoing List",rows:v.value,columns:C.value,"row-key":"TDLVORD_DLVCD",loading:n.value,dense:"",pagination:{rowsPerPage:20},class:"my-sticky-header-column-table"},{"top-right":e(()=>[t(S,{outlined:"",modelValue:c.value,"onUpdate:modelValue":l[1]||(l[1]=a=>c.value=a),options:C.value,label:"Search Columns","option-value":"name","option-label":"label","emit-value":"",dense:"","map-options":""},null,8,["modelValue","options"]),t(N,{borderless:"",dense:"",modelValue:m.value,"onUpdate:modelValue":[l[2]||(l[2]=a=>m.value=a),l[3]||(l[3]=a=>o.getOutgoingData())],placeholder:"Search",outlined:"",debounce:"1000"},{append:e(()=>[t(I,{name:"search"})]),_:1},8,["modelValue"])]),header:e(a=>[t(h,{props:a},{default:e(()=>[(d(!0),f(b,null,Q(a.cols,s=>(d(),T(L,{key:s.name,props:a},{default:e(()=>[r(D(s.label),1)]),_:2},1032,["props"]))),128)),t(L,{"auto-width":""},{default:e(()=>[r("Action")]),_:1})]),_:2},1032,["props"])]),body:e(a=>[t(h,{props:a},{default:e(()=>[(d(!0),f(b,null,Q(a.cols,s=>(d(),T(R,{key:s.name,props:a},{default:e(()=>[r(D(s.value),1)]),_:2},1032,["props"]))),128)),t(R,{"auto-width":""},{default:e(()=>[t(_,{flat:"",color:"orange",icon:"edit",onClick:s=>O(a.row),dense:""},{default:e(()=>[t(p,null,{default:e(()=>[r("Edit Data")]),_:1})]),_:2},1032,["onClick"]),t(_,{flat:"",color:"red",icon:"delete",onClick:s=>y(a.row.TDLVORD_DLVCD),dense:""},{default:e(()=>[t(p,null,{default:e(()=>[r("Edit Data")]),_:1})]),_:2},1032,["onClick"])]),_:2},1024)]),_:2},1032,["props"])]),_:1},8,["rows","columns","loading"])])])]))}};export{W as default};
