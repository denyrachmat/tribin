import{Q as m}from"./QTooltip.27c225a1.js";import{t as d,o as E,C as u,R as M,J as i,F as a,E as e,Q as c,aI as N,I as s,$ as U,av as V,S as C,T as g,D as w,P as h}from"./index.e1aaab6d.js";import{Q as O}from"./QSelect.3d54ddb9.js";import{Q as S,a as k}from"./QTable.caa0e655.js";import{Q as y,a as Q}from"./QTd.2eda361a.js";import{api_web as D}from"./axios.a82415b8.js";import{u as $}from"./use-quasar.c96efa63.js";import{_ as A}from"./itemCreate.cf7fcb7d.js";import"./format.7ecdca76.js";import"./QItemLabel.27d1cf2c.js";import"./QList.7c99e8d4.js";import"./use-dialog-plugin-component.0746bea4.js";const L={class:"q-pa-md"},P={class:"row q-pb-md"},R=i("div",{class:"col"},[i("span",{class:"text-h4"},"Item Master")],-1),q={class:"col text-right"},F={class:"row q-pt-md"},j={class:"col"},oe={__name:"itemMasterIndex",setup(H){const _=$(),T=d([]),I=d([{name:"MITM_ITMCD",label:"Item Code",field:"MITM_ITMCD",sortable:!0,align:"left"},{name:"MITM_ITMNM",label:"Item Name",field:"MITM_ITMNM",sortable:!0,align:"left"},{name:"MITM_ITMTYPE",label:"Item Type",field:"MITM_ITMTYPE",sortable:!0,align:"left"},{name:"MITM_STKUOM",label:"UOM",field:"MITM_STKUOM",sortable:!0,align:"left"},{name:"MITM_ITMCAT",label:"Category",field:"MITM_ITMCAT",sortable:!0,align:"left"},{name:"MITM_BRANCH",label:"Category",field:"MITM_BRANCH",sortable:!0,align:"left"}]),r=d(!1),p=d(""),f=d("");E(()=>{v()});const v=async()=>{r.value=!0,await D.post("item/searchAPITBL",{searchBy:p.value,searchValue:f.value,isITMCD:1}).then(o=>{r.value=!1,T.value=o.data.data}).catch(o=>{r.value=!1})},b=(o=null)=>{_.dialog({component:A,componentProps:{ItemCat:"",ItemType:"",isAutoCD:!1,listOpenField:[],dataForUpdate:o}}).onOk(async t=>{v()})},x=()=>{_.dialog({title:"Confirmation",message:"Do you want to export all this item ?",cancel:!0,persistent:!0}).onOk(async()=>{r.value=!0,await D.post("item/exportExcel",null,{responseType:"arraybuffer"}).then(o=>{r.value=!1;const t=document.createElement("a");t.download=name,t.href=window.URL.createObjectURL(new Blob([o.data],{type:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"})),t.click(),t.remove(),window.URL.revokeObjectURL(t.href)})})},B=o=>{};return(o,t)=>(u(),M("div",L,[i("div",P,[R,i("div",q,[a(c,{icon:"add",color:"blue",onClick:t[0]||(t[0]=l=>b())},{default:e(()=>[a(m,null,{default:e(()=>[s("Create New Item")]),_:1})]),_:1}),a(c,{icon:"download",color:"blue",onClick:t[1]||(t[1]=l=>x()),flat:""},{default:e(()=>[a(m,null,{default:e(()=>[s("Export to Excel")]),_:1})]),_:1})])]),a(N),i("div",F,[i("div",j,[a(S,{title:"Item Master List",rows:T.value,columns:I.value,"row-key":"MITM_ITMCD",loading:r.value,dense:"",pagination:{rowsPerPage:20},class:"my-sticky-header-column-table"},{"top-right":e(()=>[a(O,{outlined:"",modelValue:p.value,"onUpdate:modelValue":t[2]||(t[2]=l=>p.value=l),options:I.value,label:"Search Columns","option-value":"name","option-label":"label","emit-value":"",dense:"","map-options":""},null,8,["modelValue","options"]),a(U,{borderless:"",dense:"",modelValue:f.value,"onUpdate:modelValue":[t[3]||(t[3]=l=>f.value=l),t[4]||(t[4]=l=>o.getOutgoingData())],placeholder:"Search",outlined:"",debounce:"1000"},{append:e(()=>[a(V,{name:"search"})]),_:1},8,["modelValue"])]),header:e(l=>[a(y,{props:l},{default:e(()=>[a(k,{"auto-width":""},{default:e(()=>[s("Action")]),_:1}),(u(!0),M(C,null,g(l.cols,n=>(u(),w(k,{key:n.name,props:l},{default:e(()=>[s(h(n.label),1)]),_:2},1032,["props"]))),128))]),_:2},1032,["props"])]),body:e(l=>[a(y,{props:l},{default:e(()=>[a(Q,{"auto-width":""},{default:e(()=>[a(c,{flat:"",color:"orange",icon:"edit",onClick:n=>b(l.row),dense:""},{default:e(()=>[a(m,null,{default:e(()=>[s("Edit Data")]),_:1})]),_:2},1032,["onClick"]),a(c,{flat:"",color:"red",icon:"delete",onClick:n=>B(l.row.id),dense:""},{default:e(()=>[a(m,null,{default:e(()=>[s("Delete Data")]),_:1})]),_:2},1032,["onClick"])]),_:2},1024),(u(!0),M(C,null,g(l.cols,n=>(u(),w(Q,{key:n.name,props:l},{default:e(()=>[s(h(n.value),1)]),_:2},1032,["props"]))),128))]),_:2},1032,["props"])]),_:1},8,["rows","columns","loading"])])])]))}};export{oe as default};
