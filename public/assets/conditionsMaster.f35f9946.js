import{s as l,o as R,B as q,C as P,D as o,E as e,J as Q,K as k,L as V,Q as d,M as N,O as S,I as n,P as M,H as h,R as G,S as U}from"./index.6877af1f.js";import{Q as I}from"./QTooltip.37687f55.js";import{Q as H}from"./QBtnGroup.49d9a714.js";import{u as E,Q as L,a as K,b as A,c as B}from"./use-dialog-plugin-component.93de69ba.js";import{api as y,api_web as $}from"./axios.cab1cc43.js";import{_ as F}from"./assignConditionsView.c0078d90.js";const J=n("div",{class:"text-h6"},"List Conditions",-1),j={__name:"chooseConditions",setup(x){const p=l([{name:"MCONDITION_DESCRIPTION",align:"left",label:"Description",field:"MCONDITION_DESCRIPTION",sortable:!0}]),a=l([]),i=l({sortBy:"desc",descending:!1,rowsPerPage:0}),{dialogRef:u,onDialogHide:r,onDialogOK:g,onDialogCancel:v}=E();R(()=>{_()});const _=async()=>{await y.get("/master/conditions/getdata").then(c=>{console.log(c),a.value=c.data})},D=c=>{g(c)},O=()=>{};return(c,t)=>(q(),P(S,{ref_key:"dialogRef",ref:u,onHide:N(r),"transition-show":"slide-up","transition-hide":"slide-down","full-width":""},{default:o(()=>[e(Q,{class:"q-dialog-plugin bg-white q-pa-sm"},{default:o(()=>[e(k,null,{default:o(()=>[J]),_:1}),e(k,{class:"q-pa-sm"},{default:o(()=>[e(L,{bordered:"",class:"rounded-borders"},{default:o(()=>[e(K,{class:"my-sticky-header-table",flat:"",bordered:"",title:"Conditions",rows:a.value,columns:p.value,"row-key":"id",dense:"",onRowClick:t[0]||(t[0]=(s,m,b)=>D(m)),pagination:i.value},null,8,["rows","columns","pagination"])]),_:1})]),_:1}),e(V,{align:"right"},{default:o(()=>[e(d,{label:"OK",color:"primary",onClick:t[1]||(t[1]=s=>O())}),e(d,{flat:"",label:"Cancel",color:"red",onClick:N(v)},null,8,["onClick"])]),_:1})]),_:1})]),_:1},8,["onHide"]))}};const z=n("div",{class:"text-h6"},"Assign Condition Group",-1),W={class:"row"},X={class:"col"},Y={class:"col text-right"},Z={class:"row q-pt-md"},ee={class:"col"},oe={__name:"assignConditions",setup(x){const p=l([{name:"id",align:"left",label:"ID",field:"id",sortable:!0},{name:"MCONDITION_DESCRIPTION",align:"left",label:"Description",field:"MCONDITION_DESCRIPTION",sortable:!0}]),a=l([]),i=l({sortBy:"desc",descending:!1,rowsPerPage:0}),u=l([]),r=l(""),g=l("new"),v=A(),{dialogRef:_,onDialogHide:D,onDialogOK:O,onDialogCancel:c}=E();R(()=>{m()});const t=()=>{u.value=[],r.value="",g.value="new"},s=()=>{v.dialog({title:"Confirmation",message:"Are you sure want to delete this group ?",cancel:!0,persistent:!0}).onOk(async()=>{await y.delete(`/master/conditions/deleteDataGroup/${btoa(r.value)}`).then(C=>{t()})})},m=async()=>{await y.get("/master/conditions/getdata").then(C=>{console.log(C),a.value=C.data})},b=()=>{v.dialog({component:F}).onOk(async C=>{r.value=C.MCONDITION_RPT_STAT,u.value=C.group,g.value="edit"})},f=()=>{v.dialog({title:"Confirmation",message:"Do you want to save this group ?",cancel:!0,persistent:!0}).onOk(async()=>{await y.post("/master/conditions/assignGroup",{data:u.value,MCONDITION_RPT_STAT:r.value}).then(C=>{t()})})};return(C,w)=>(q(),P(S,{ref_key:"dialogRef",ref:_,onHide:N(D),"transition-show":"slide-up","transition-hide":"slide-down","full-width":""},{default:o(()=>[e(Q,{class:"q-dialog-plugin bg-white q-pa-sm"},{default:o(()=>[e(k,null,{default:o(()=>[z]),_:1}),e(k,{class:"q-pa-sm"},{default:o(()=>[n("div",W,[n("div",X,[e(M,{label:"Group Name",outlined:"",dense:"",modelValue:r.value,"onUpdate:modelValue":w[0]||(w[0]=T=>r.value=T),disable:g.value==="edit"},{after:o(()=>[e(d,{dense:"",icon:"search",color:"blue",flat:"",onClick:b})]),_:1},8,["modelValue","disable"])]),n("div",Y,[e(H,{outline:""},{default:o(()=>[e(d,{outline:"",color:"blue",icon:"description",onClick:t},{default:o(()=>[e(I,null,{default:o(()=>[h("New")]),_:1})]),_:1}),e(d,{outline:"",color:"red",icon:"delete",onClick:s},{default:o(()=>[e(I,null,{default:o(()=>[h("Delete")]),_:1})]),_:1})]),_:1})])]),n("div",Z,[n("div",ee,[e(K,{class:"my-sticky-header-table",flat:"",bordered:"",title:"Conditions",rows:a.value,columns:p.value,"row-key":"id",dense:"",pagination:i.value,selection:"multiple",selected:u.value,"onUpdate:selected":w[1]||(w[1]=T=>u.value=T)},null,8,["rows","columns","pagination","selected"])])])]),_:1}),e(V,{align:"right"},{default:o(()=>[e(d,{label:"OK",color:"primary",onClick:w[2]||(w[2]=T=>f()),disable:u.value.length===0||!r.value},null,8,["disable"]),e(d,{flat:"",label:"Cancel",color:"red",onClick:N(c)},null,8,["onClick"])]),_:1})]),_:1})]),_:1},8,["onHide"]))}},te=n("div",{class:"text-h6"},"Import Data from another business",-1),ne={class:"row"},ae={class:"col"},le={class:"row q-pt-md"},se={class:"col"},ie={__name:"importData",setup(x){const p=l([]),a=l([]),i=l(""),u=l(""),{dialogRef:r,onDialogHide:g,onDialogOK:v,onDialogCancel:_}=E();R(()=>{D()});const D=async()=>{await y.get("/master/conditions/getCompaniesDetail").then(c=>{p.value=c.data.companies,a.value=c.data.CurrentCompanies,u.value=a.value[0],connection})},O=()=>{$q.dialog({title:"Confirmation",message:`Do you want to import data from ${i.value.name} ?`,cancel:!0,persistent:!0}).onOk(async()=>{await $.post("condition/import",{fromConnection:i.value}).then(c=>{newData()}),v()})};return(c,t)=>(q(),P(S,{ref_key:"dialogRef",ref:r,onHide:N(g),"transition-show":"slide-up","transition-hide":"slide-down"},{default:o(()=>[e(Q,{class:"q-dialog-plugin bg-white q-pa-sm"},{default:o(()=>[e(k,null,{default:o(()=>[te]),_:1}),e(k,{class:"q-pa-sm"},{default:o(()=>[n("div",ne,[n("div",ae,[e(B,{standout:"",modelValue:i.value,"onUpdate:modelValue":t[0]||(t[0]=s=>i.value=s),options:p.value,label:"From Source","option-value":"connection","option-label":"name"},null,8,["modelValue","options"])])]),n("div",le,[n("div",se,[e(B,{standout:"",modelValue:u.value,"onUpdate:modelValue":t[1]||(t[1]=s=>u.value=s),options:a.value,label:"Destination Source","option-value":"connection","option-label":"name"},null,8,["modelValue","options"])])])]),_:1}),e(V,{align:"right"},{default:o(()=>[e(d,{label:"OK",color:"primary",onClick:t[2]||(t[2]=s=>O())}),e(d,{flat:"",label:"Cancel",color:"red",onClick:N(_)},null,8,["onClick"])]),_:1})]),_:1})]),_:1},8,["onHide"]))}},de={class:"q-pa-md"},ue={class:"row q-pb-md"},ce=n("div",{class:"col"},[n("span",{class:"text-h4"}," Condition Master ")],-1),re={class:"col text-right"},pe={class:"row q-pt-md"},_e={class:"col"},me={class:"col q-pl-md"},be={__name:"conditionsMaster",setup(x){const p=A(),a=l(""),i=l(""),u=l("");l([]),R(()=>{let t=r("CGID");u.value=t});const r=t=>{for(var s=t+"=",m=document.cookie.split(";"),b=0;b<m.length;b++){for(var f=m[b];f.charAt(0)==" ";)f=f.substring(1,f.length);if(f.indexOf(s)==0)return f.substring(s.length,f.length)}return null},g=()=>{p.dialog({component:ie}).onOk(async t=>{})},v=()=>{p.dialog({title:"Confirmation",message:"Do you want to save this data ?",cancel:!0,persistent:!0}).onOk(async()=>{a.value?await $.put(`condition/${btoa(a.value)}`,{MCONDITION_DESCRIPTION:i.value,MCONDITION_ORDER_NUMBER:null}).then(t=>{_()}):await $.post("condition",{MCONDITION_DESCRIPTION:i.value,MCONDITION_ORDER_NUMBER:null}).then(t=>{_()})})},_=()=>{a.value="",i.value=""},D=()=>{p.dialog({component:j}).onOk(async t=>{a.value=t.id,i.value=t.MCONDITION_DESCRIPTION})},O=()=>{p.dialog({title:"Confirmation",message:"Are you sure want to delete this data ?",cancel:!0,persistent:!0}).onOk(async()=>{await $.delete(`condition/${btoa(a.value)}`).then(t=>{_()})})},c=()=>{p.dialog({component:oe}).onOk(async t=>{console.log(t)})};return(t,s)=>(q(),G("div",de,[n("div",ue,[ce,n("div",re,[e(H,{outline:""},{default:o(()=>[e(d,{outline:"",color:"blue",label:"Assign Condition Group",onClick:c}),e(d,{outline:"",color:"blue",icon:"description",onClick:_},{default:o(()=>[e(I,null,{default:o(()=>[h("New")]),_:1})]),_:1}),e(d,{outline:"",color:"blue",icon:"save",onClick:v},{default:o(()=>[e(I,null,{default:o(()=>[h("Save")]),_:1})]),_:1}),e(d,{outline:"",color:"blue",icon:"send",onClick:g},{default:o(()=>[e(I,null,{default:o(()=>[h("Import Data")]),_:1})]),_:1}),e(d,{outline:"",color:"red",icon:"delete",disable:!a.value,onClick:O},{default:o(()=>[e(I,null,{default:o(()=>[h("Delete")]),_:1})]),_:1},8,["disable"])]),_:1})])]),e(U),n("div",pe,[n("div",_e,[e(M,{label:"Condition Code",dense:"",outlined:"",modelValue:a.value,"onUpdate:modelValue":s[0]||(s[0]=m=>a.value=m),disable:""},{after:o(()=>[e(d,{dense:"",icon:"search",color:"blue",flat:"",onClick:D})]),_:1},8,["modelValue"])]),n("div",me,[e(M,{label:"Condition Name",dense:"",outlined:"",modelValue:i.value,"onUpdate:modelValue":s[1]||(s[1]=m=>i.value=m),type:"textarea"},null,8,["modelValue"])])])]))}};export{be as default};
