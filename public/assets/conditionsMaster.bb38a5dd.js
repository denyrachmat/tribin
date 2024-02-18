import{c as A,a as U,h as L,d as j,s as i,o as q,B,C as M,D as o,E as e,J as P,K as N,L as S,Q as u,M as y,O as V,I as a,P as x,H as I,R as F,S as J}from"./index.0a29f986.js";import{u as Q,Q as z,a as G,b as H,c as k,_ as W,d as E}from"./assignConditionsView.5f7ccffe.js";import{api as T,api_web as R}from"./axios.871ade61.js";var K=A({name:"QBtnGroup",props:{unelevated:Boolean,outline:Boolean,flat:Boolean,rounded:Boolean,square:Boolean,push:Boolean,stretch:Boolean,glossy:Boolean,spread:Boolean},setup(h,{slots:r}){const n=U(()=>{const l=["unelevated","outline","flat","rounded","square","push","stretch","glossy"].filter(s=>h[s]===!0).map(s=>`q-btn-group--${s}`).join(" ");return`q-btn-group row no-wrap${l.length!==0?" "+l:""}`+(h.spread===!0?" q-btn-group--spread":" inline")});return()=>L("div",{class:n.value},j(r.default))}});const X=a("div",{class:"text-h6"},"List Conditions",-1),Y={__name:"chooseConditions",setup(h){const r=i([{name:"MCONDITION_DESCRIPTION",align:"left",label:"Description",field:"MCONDITION_DESCRIPTION",sortable:!0}]),n=i([]),l=i({sortBy:"desc",descending:!1,rowsPerPage:0}),{dialogRef:s,onDialogHide:p,onDialogOK:g,onDialogCancel:v}=Q();q(()=>{_()});const _=async()=>{await T.get("/master/conditions/getdata").then(c=>{console.log(c),n.value=c.data})},D=c=>{g(c)},O=()=>{};return(c,t)=>(B(),M(V,{ref_key:"dialogRef",ref:s,onHide:y(p),"transition-show":"slide-up","transition-hide":"slide-down","full-width":""},{default:o(()=>[e(P,{class:"q-dialog-plugin bg-white q-pa-sm"},{default:o(()=>[e(N,null,{default:o(()=>[X]),_:1}),e(N,{class:"q-pa-sm"},{default:o(()=>[e(z,{bordered:"",class:"rounded-borders"},{default:o(()=>[e(G,{class:"my-sticky-header-table",flat:"",bordered:"",title:"Conditions",rows:n.value,columns:r.value,"row-key":"id",dense:"",onRowClick:t[0]||(t[0]=(d,m,b)=>D(m)),pagination:l.value},null,8,["rows","columns","pagination"])]),_:1})]),_:1}),e(S,{align:"right"},{default:o(()=>[e(u,{label:"OK",color:"primary",onClick:t[1]||(t[1]=d=>O())}),e(u,{flat:"",label:"Cancel",color:"red",onClick:y(v)},null,8,["onClick"])]),_:1})]),_:1})]),_:1},8,["onHide"]))}};const Z=a("div",{class:"text-h6"},"Assign Condition Group",-1),ee={class:"row"},oe={class:"col"},te={class:"col text-right"},ne={class:"row q-pt-md"},ae={class:"col"},le={__name:"assignConditions",setup(h){const r=i([{name:"id",align:"left",label:"ID",field:"id",sortable:!0},{name:"MCONDITION_DESCRIPTION",align:"left",label:"Description",field:"MCONDITION_DESCRIPTION",sortable:!0}]),n=i([]),l=i({sortBy:"desc",descending:!1,rowsPerPage:0}),s=i([]),p=i(""),g=i("new"),v=H(),{dialogRef:_,onDialogHide:D,onDialogOK:O,onDialogCancel:c}=Q();q(()=>{m()});const t=()=>{s.value=[],p.value="",g.value="new"},d=()=>{v.dialog({title:"Confirmation",message:"Are you sure want to delete this group ?",cancel:!0,persistent:!0}).onOk(async()=>{await T.delete(`/master/conditions/deleteDataGroup/${btoa(p.value)}`).then(C=>{t()})})},m=async()=>{await T.get("/master/conditions/getdata").then(C=>{console.log(C),n.value=C.data})},b=()=>{v.dialog({component:W}).onOk(async C=>{p.value=C.MCONDITION_RPT_STAT,s.value=C.group,g.value="edit"})},f=()=>{v.dialog({title:"Confirmation",message:"Do you want to save this group ?",cancel:!0,persistent:!0}).onOk(async()=>{await T.post("/master/conditions/assignGroup",{data:s.value,MCONDITION_RPT_STAT:p.value}).then(C=>{t()})})};return(C,w)=>(B(),M(V,{ref_key:"dialogRef",ref:_,onHide:y(D),"transition-show":"slide-up","transition-hide":"slide-down","full-width":""},{default:o(()=>[e(P,{class:"q-dialog-plugin bg-white q-pa-sm"},{default:o(()=>[e(N,null,{default:o(()=>[Z]),_:1}),e(N,{class:"q-pa-sm"},{default:o(()=>[a("div",ee,[a("div",oe,[e(x,{label:"Group Name",outlined:"",dense:"",modelValue:p.value,"onUpdate:modelValue":w[0]||(w[0]=$=>p.value=$),disable:g.value==="edit"},{after:o(()=>[e(u,{dense:"",icon:"search",color:"blue",flat:"",onClick:b})]),_:1},8,["modelValue","disable"])]),a("div",te,[e(K,{outline:""},{default:o(()=>[e(u,{outline:"",color:"blue",icon:"description",onClick:t},{default:o(()=>[e(k,null,{default:o(()=>[I("New")]),_:1})]),_:1}),e(u,{outline:"",color:"red",icon:"delete",onClick:d},{default:o(()=>[e(k,null,{default:o(()=>[I("Delete")]),_:1})]),_:1})]),_:1})])]),a("div",ne,[a("div",ae,[e(G,{class:"my-sticky-header-table",flat:"",bordered:"",title:"Conditions",rows:n.value,columns:r.value,"row-key":"id",dense:"",pagination:l.value,selection:"multiple",selected:s.value,"onUpdate:selected":w[1]||(w[1]=$=>s.value=$)},null,8,["rows","columns","pagination","selected"])])])]),_:1}),e(S,{align:"right"},{default:o(()=>[e(u,{label:"OK",color:"primary",onClick:w[2]||(w[2]=$=>f()),disable:s.value.length===0||!p.value},null,8,["disable"]),e(u,{flat:"",label:"Cancel",color:"red",onClick:y(c)},null,8,["onClick"])]),_:1})]),_:1})]),_:1},8,["onHide"]))}},se=a("div",{class:"text-h6"},"Import Data from another business",-1),ie={class:"row"},de={class:"col"},ue={class:"row q-pt-md"},re={class:"col"},ce={__name:"importData",setup(h){const r=i([]),n=i([]),l=i(""),s=i(""),{dialogRef:p,onDialogHide:g,onDialogOK:v,onDialogCancel:_}=Q();q(()=>{D()});const D=async()=>{await T.get("/master/conditions/getCompaniesDetail").then(c=>{r.value=c.data.companies,n.value=c.data.CurrentCompanies,s.value=n.value[0],connection})},O=()=>{$q.dialog({title:"Confirmation",message:`Do you want to import data from ${l.value.name} ?`,cancel:!0,persistent:!0}).onOk(async()=>{await R.post("condition/import",{fromConnection:l.value}).then(c=>{newData()}),v()})};return(c,t)=>(B(),M(V,{ref_key:"dialogRef",ref:p,onHide:y(g),"transition-show":"slide-up","transition-hide":"slide-down"},{default:o(()=>[e(P,{class:"q-dialog-plugin bg-white q-pa-sm"},{default:o(()=>[e(N,null,{default:o(()=>[se]),_:1}),e(N,{class:"q-pa-sm"},{default:o(()=>[a("div",ie,[a("div",de,[e(E,{standout:"",modelValue:l.value,"onUpdate:modelValue":t[0]||(t[0]=d=>l.value=d),options:r.value,label:"From Source","option-value":"connection","option-label":"name"},null,8,["modelValue","options"])])]),a("div",ue,[a("div",re,[e(E,{standout:"",modelValue:s.value,"onUpdate:modelValue":t[1]||(t[1]=d=>s.value=d),options:n.value,label:"Destination Source","option-value":"connection","option-label":"name"},null,8,["modelValue","options"])])])]),_:1}),e(S,{align:"right"},{default:o(()=>[e(u,{label:"OK",color:"primary",onClick:t[2]||(t[2]=d=>O())}),e(u,{flat:"",label:"Cancel",color:"red",onClick:y(_)},null,8,["onClick"])]),_:1})]),_:1})]),_:1},8,["onHide"]))}},pe={class:"q-pa-md"},_e={class:"row q-pb-md"},me=a("div",{class:"col"},[a("span",{class:"text-h4"}," Condition Master ")],-1),ge={class:"col text-right"},ve={class:"row q-pt-md"},fe={class:"col"},Ce={class:"col q-pl-md"},be={__name:"conditionsMaster",setup(h){const r=H(),n=i(""),l=i(""),s=i("");i([]),q(()=>{let t=p("CGID");s.value=t});const p=t=>{for(var d=t+"=",m=document.cookie.split(";"),b=0;b<m.length;b++){for(var f=m[b];f.charAt(0)==" ";)f=f.substring(1,f.length);if(f.indexOf(d)==0)return f.substring(d.length,f.length)}return null},g=()=>{r.dialog({component:ce}).onOk(async t=>{})},v=()=>{r.dialog({title:"Confirmation",message:"Do you want to save this data ?",cancel:!0,persistent:!0}).onOk(async()=>{n.value?await R.put(`condition/${btoa(n.value)}`,{MCONDITION_DESCRIPTION:l.value,MCONDITION_ORDER_NUMBER:null}).then(t=>{_()}):await R.post("condition",{MCONDITION_DESCRIPTION:l.value,MCONDITION_ORDER_NUMBER:null}).then(t=>{_()})})},_=()=>{n.value="",l.value=""},D=()=>{r.dialog({component:Y}).onOk(async t=>{n.value=t.id,l.value=t.MCONDITION_DESCRIPTION})},O=()=>{r.dialog({title:"Confirmation",message:"Are you sure want to delete this data ?",cancel:!0,persistent:!0}).onOk(async()=>{await R.delete(`condition/${btoa(n.value)}`).then(t=>{_()})})},c=()=>{r.dialog({component:le}).onOk(async t=>{console.log(t)})};return(t,d)=>(B(),F("div",pe,[a("div",_e,[me,a("div",ge,[e(K,{outline:""},{default:o(()=>[e(u,{outline:"",color:"blue",label:"Assign Condition Group",onClick:c}),e(u,{outline:"",color:"blue",icon:"description",onClick:_},{default:o(()=>[e(k,null,{default:o(()=>[I("New")]),_:1})]),_:1}),e(u,{outline:"",color:"blue",icon:"save",onClick:v},{default:o(()=>[e(k,null,{default:o(()=>[I("Save")]),_:1})]),_:1}),e(u,{outline:"",color:"blue",icon:"send",onClick:g},{default:o(()=>[e(k,null,{default:o(()=>[I("Import Data")]),_:1})]),_:1}),e(u,{outline:"",color:"red",icon:"delete",disable:!n.value,onClick:O},{default:o(()=>[e(k,null,{default:o(()=>[I("Delete")]),_:1})]),_:1},8,["disable"])]),_:1})])]),e(J),a("div",ve,[a("div",fe,[e(x,{label:"Condition Code",dense:"",outlined:"",modelValue:n.value,"onUpdate:modelValue":d[0]||(d[0]=m=>n.value=m),disable:""},{after:o(()=>[e(u,{dense:"",icon:"search",color:"blue",flat:"",onClick:D})]),_:1},8,["modelValue"])]),a("div",Ce,[e(x,{label:"Condition Name",dense:"",outlined:"",modelValue:l.value,"onUpdate:modelValue":d[1]||(d[1]=m=>l.value=m),type:"textarea"},null,8,["modelValue"])])])]))}};export{be as default};
