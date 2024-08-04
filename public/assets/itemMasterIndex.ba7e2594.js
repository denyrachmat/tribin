import{Q as m}from"./QTooltip.f10090e6.js";import{t as d,o as U,C as u,R as M,J as i,F as a,E as e,Q as c,aI as V,I as s,$ as O,av as B,S as w,T as g,D as C,P as h}from"./index.30bd8662.js";import{Q as N}from"./QSelect.c085eec3.js";import{Q as S,a as k}from"./QTable.3230fdea.js";import{Q as y,a as Q}from"./QTd.14f58dc8.js";import{api_web as D}from"./axios.0cd86c36.js";import{u as $}from"./use-quasar.b22769cd.js";import{_ as L}from"./itemCreate.ae33ed51.js";import"./format.0ee675cb.js";import"./QItemLabel.5c395ce1.js";import"./QList.cc004763.js";import"./use-dialog-plugin-component.72a23949.js";const P={class:"q-pa-md"},A={class:"row q-pb-md"},R=i("div",{class:"col"},[i("span",{class:"text-h4"},"Item Master")],-1),q={class:"col text-right"},F={class:"row q-pt-md"},j={class:"col"},oe={__name:"itemMasterIndex",setup(K){const _=$(),T=d([]),I=d([{name:"MITM_ITMCD",label:"Item Code",field:"MITM_ITMCD",sortable:!0,align:"left"},{name:"MITM_ITMNM",label:"Item Name",field:"MITM_ITMNM",sortable:!0,align:"left"},{name:"MITM_ITMTYPE",label:"Item Type",field:"MITM_ITMTYPE",sortable:!0,align:"left"},{name:"MITM_STKUOM",label:"UOM",field:"MITM_STKUOM",sortable:!0,align:"left"},{name:"MITM_ITMCAT",label:"Category",field:"MITM_ITMCAT",sortable:!0,align:"left"}]),r=d(!1),p=d(""),f=d("");U(()=>{v()});const v=async()=>{r.value=!0,await D.post("item/searchAPITBL",{searchBy:p.value,searchValue:f.value,isITMCD:1}).then(o=>{r.value=!1,T.value=o.data.data}).catch(o=>{r.value=!1})},b=(o=null)=>{_.dialog({component:L,componentProps:{ItemCat:"",ItemType:"",isAutoCD:!1,listOpenField:[],dataForUpdate:o}}).onOk(async t=>{v()})},x=()=>{_.dialog({title:"Confirmation",message:"Do you want to export all this item ?",cancel:!0,persistent:!0}).onOk(async()=>{r.value=!0,await D.post("item/exportExcel",null,{responseType:"arraybuffer"}).then(o=>{r.value=!1;const t=document.createElement("a");t.download=name,t.href=window.URL.createObjectURL(new Blob([o.data],{type:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"})),t.click(),t.remove(),window.URL.revokeObjectURL(t.href)})})},E=o=>{};return(o,t)=>(u(),M("div",P,[i("div",A,[R,i("div",q,[a(c,{icon:"add",color:"blue",onClick:t[0]||(t[0]=l=>b())},{default:e(()=>[a(m,null,{default:e(()=>[s("Create New Item")]),_:1})]),_:1}),a(c,{icon:"download",color:"blue",onClick:t[1]||(t[1]=l=>x()),flat:""},{default:e(()=>[a(m,null,{default:e(()=>[s("Export to Excel")]),_:1})]),_:1})])]),a(V),i("div",F,[i("div",j,[a(S,{title:"Item Master List",rows:T.value,columns:I.value,"row-key":"MITM_ITMCD",loading:r.value,dense:"",pagination:{rowsPerPage:20},class:"my-sticky-header-column-table"},{"top-right":e(()=>[a(N,{outlined:"",modelValue:p.value,"onUpdate:modelValue":t[2]||(t[2]=l=>p.value=l),options:I.value,label:"Search Columns","option-value":"name","option-label":"label","emit-value":"",dense:"","map-options":""},null,8,["modelValue","options"]),a(O,{borderless:"",dense:"",modelValue:f.value,"onUpdate:modelValue":[t[3]||(t[3]=l=>f.value=l),t[4]||(t[4]=l=>o.getOutgoingData())],placeholder:"Search",outlined:"",debounce:"1000"},{append:e(()=>[a(B,{name:"search"})]),_:1},8,["modelValue"])]),header:e(l=>[a(y,{props:l},{default:e(()=>[a(k,{"auto-width":""},{default:e(()=>[s("Action")]),_:1}),(u(!0),M(w,null,g(l.cols,n=>(u(),C(k,{key:n.name,props:l},{default:e(()=>[s(h(n.label),1)]),_:2},1032,["props"]))),128))]),_:2},1032,["props"])]),body:e(l=>[a(y,{props:l},{default:e(()=>[a(Q,{"auto-width":""},{default:e(()=>[a(c,{flat:"",color:"orange",icon:"edit",onClick:n=>b(l.row),dense:""},{default:e(()=>[a(m,null,{default:e(()=>[s("Edit Data")]),_:1})]),_:2},1032,["onClick"]),a(c,{flat:"",color:"red",icon:"delete",onClick:n=>E(l.row.id),dense:""},{default:e(()=>[a(m,null,{default:e(()=>[s("Delete Data")]),_:1})]),_:2},1032,["onClick"])]),_:2},1024),(u(!0),M(w,null,g(l.cols,n=>(u(),C(Q,{key:n.name,props:l},{default:e(()=>[s(h(n.value),1)]),_:2},1032,["props"]))),128))]),_:2},1032,["props"])]),_:1},8,["rows","columns","loading"])])])]))}};export{oe as default};
