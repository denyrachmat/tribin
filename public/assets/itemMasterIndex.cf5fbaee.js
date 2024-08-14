import{Q as c}from"./QTooltip.db3b17c0.js";import{t as d,o as U,C as u,R as _,J as i,F as a,E as e,Q as m,aY as V,I as s,$ as B,at as N,S as w,T as C,D as h,P as g}from"./index.91ad88e4.js";import{e as O}from"./QSelect.965351d7.js";import{Q as S,a as k}from"./QTable.509a866a.js";import{Q as y,a as Q}from"./QTd.fbbc15a0.js";import{api_web as x}from"./axios.38ca4258.js";import{u as $}from"./format.0fffb610.js";import{_ as L}from"./itemCreate.55202457.js";import"./QList.8ca1fded.js";import"./use-dialog-plugin-component.5b51822b.js";const P={class:"q-pa-md"},A={class:"row q-pb-md"},R=i("div",{class:"col"},[i("span",{class:"text-h4"},"Item Master")],-1),q={class:"col text-right"},F={class:"row q-pt-md"},Y={class:"col"},ae={__name:"itemMasterIndex",setup(j){const T=$(),I=d([]),v=d([{name:"MITM_ITMCD",label:"Item Code",field:"MITM_ITMCD",sortable:!0,align:"left"},{name:"MITM_ITMNM",label:"Item Name",field:"MITM_ITMNM",sortable:!0,align:"left"},{name:"MITM_ITMTYPE",label:"Item Type",field:"MITM_ITMTYPE",sortable:!0,align:"left"},{name:"MITM_STKUOM",label:"UOM",field:"MITM_STKUOM",sortable:!0,align:"left"},{name:"MITM_ITMCAT",label:"Category",field:"MITM_ITMCAT",sortable:!0,align:"left"}]),r=d(!1),p=d(""),f=d("");U(()=>{M()});const M=async()=>{r.value=!0,await x.post("item/searchAPITBL",{searchBy:p.value,searchValue:f.value,isITMCD:1}).then(o=>{r.value=!1,I.value=o.data.data}).catch(o=>{r.value=!1})},b=(o=null)=>{T.dialog({component:L,componentProps:{ItemCat:"",ItemType:"",isAutoCD:!1,listOpenField:[],dataForUpdate:o}}).onOk(async t=>{M()})},D=()=>{T.dialog({title:"Confirmation",message:"Do you want to export all this item ?",cancel:!0,persistent:!0}).onOk(async()=>{r.value=!0,await x.post("item/exportExcel",null,{responseType:"arraybuffer"}).then(o=>{r.value=!1;const t=document.createElement("a");t.download=name,t.href=window.URL.createObjectURL(new Blob([o.data],{type:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"})),t.click(),t.remove(),window.URL.revokeObjectURL(t.href)})})},E=o=>{};return(o,t)=>(u(),_("div",P,[i("div",A,[R,i("div",q,[a(m,{icon:"add",color:"blue",onClick:t[0]||(t[0]=l=>b())},{default:e(()=>[a(c,null,{default:e(()=>[s("Create New Item")]),_:1})]),_:1}),a(m,{icon:"download",color:"blue",onClick:t[1]||(t[1]=l=>D()),flat:""},{default:e(()=>[a(c,null,{default:e(()=>[s("Export to Excel")]),_:1})]),_:1})])]),a(V),i("div",F,[i("div",Y,[a(S,{title:"Item Master List",rows:I.value,columns:v.value,"row-key":"MITM_ITMCD",loading:r.value,dense:"",pagination:{rowsPerPage:20},class:"my-sticky-header-column-table"},{"top-right":e(()=>[a(O,{outlined:"",modelValue:p.value,"onUpdate:modelValue":t[2]||(t[2]=l=>p.value=l),options:v.value,label:"Search Columns","option-value":"name","option-label":"label","emit-value":"",dense:"","map-options":""},null,8,["modelValue","options"]),a(B,{borderless:"",dense:"",modelValue:f.value,"onUpdate:modelValue":[t[3]||(t[3]=l=>f.value=l),t[4]||(t[4]=l=>M())],placeholder:"Search",outlined:"",debounce:"1000"},{append:e(()=>[a(N,{name:"search"})]),_:1},8,["modelValue"])]),header:e(l=>[a(y,{props:l},{default:e(()=>[a(k,{"auto-width":""},{default:e(()=>[s("Action")]),_:1}),(u(!0),_(w,null,C(l.cols,n=>(u(),h(k,{key:n.name,props:l},{default:e(()=>[s(g(n.label),1)]),_:2},1032,["props"]))),128))]),_:2},1032,["props"])]),body:e(l=>[a(y,{props:l},{default:e(()=>[a(Q,{"auto-width":""},{default:e(()=>[a(m,{flat:"",color:"orange",icon:"edit",onClick:n=>b(l.row),dense:""},{default:e(()=>[a(c,null,{default:e(()=>[s("Edit Data")]),_:1})]),_:2},1032,["onClick"]),a(m,{flat:"",color:"red",icon:"delete",onClick:n=>E(l.row.id),dense:""},{default:e(()=>[a(c,null,{default:e(()=>[s("Delete Data")]),_:1})]),_:2},1032,["onClick"])]),_:2},1024),(u(!0),_(w,null,C(l.cols,n=>(u(),h(Q,{key:n.name,props:l},{default:e(()=>[s(g(n.value),1)]),_:2},1032,["props"]))),128))]),_:2},1032,["props"])]),_:1},8,["rows","columns","loading"])])])]))}};export{ae as default};
