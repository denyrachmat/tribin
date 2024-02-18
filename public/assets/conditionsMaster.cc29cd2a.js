import{c as U,a as L,h as j,d as F,s as i,o as $,B as R,C as x,D as o,E as e,J as B,K as w,L as M,Q as r,M as O,O as S,I as d,P as Q,H as y,R as J,S as z}from"./index.97d39e12.js";import{u as V,Q as H,a as E,b as K,c as N,d as G}from"./use-dialog-plugin-component.3198771c.js";import{api as T,api_web as P}from"./axios.51d063fe.js";var A=U({name:"QBtnGroup",props:{unelevated:Boolean,outline:Boolean,flat:Boolean,rounded:Boolean,square:Boolean,push:Boolean,stretch:Boolean,glossy:Boolean,spread:Boolean},setup(h,{slots:c}){const n=L(()=>{const l=["unelevated","outline","flat","rounded","square","push","stretch","glossy"].filter(s=>h[s]===!0).map(s=>`q-btn-group--${s}`).join(" ");return`q-btn-group row no-wrap${l.length!==0?" "+l:""}`+(h.spread===!0?" q-btn-group--spread":" inline")});return()=>j("div",{class:n.value},F(c.default))}});const W=d("div",{class:"text-h6"},"List Conditions",-1),X={__name:"chooseConditions",setup(h){const c=i([{name:"MCONDITION_DESCRIPTION",align:"left",label:"Description",field:"MCONDITION_DESCRIPTION",sortable:!0}]),n=i([]),l=i({sortBy:"desc",descending:!1,rowsPerPage:0}),{dialogRef:s,onDialogHide:p,onDialogOK:m,onDialogCancel:f}=V();$(()=>{_()});const _=async()=>{await T.get("/master/conditions/getdata").then(a=>{console.log(a),n.value=a.data})},v=a=>{console.log(a),m(a)},D=()=>{};return(a,t)=>(R(),x(S,{ref_key:"dialogRef",ref:s,onHide:O(p),"transition-show":"slide-up","transition-hide":"slide-down","full-width":""},{default:o(()=>[e(B,{class:"q-dialog-plugin bg-white q-pa-sm"},{default:o(()=>[e(w,null,{default:o(()=>[W]),_:1}),e(w,{class:"q-pa-sm"},{default:o(()=>[e(H,{bordered:"",class:"rounded-borders"},{default:o(()=>[e(E,{class:"my-sticky-header-table",flat:"",bordered:"",title:"Conditions",rows:n.value,columns:c.value,"row-key":"id",dense:"",onRowClick:t[0]||(t[0]=(u,g,k)=>v(g)),pagination:l.value},null,8,["rows","columns","pagination"])]),_:1})]),_:1}),e(M,{align:"right"},{default:o(()=>[e(r,{label:"OK",color:"primary",onClick:t[1]||(t[1]=u=>D())}),e(r,{flat:"",label:"Cancel",color:"red",onClick:O(f)},null,8,["onClick"])]),_:1})]),_:1})]),_:1},8,["onHide"]))}};const Y=d("div",{class:"text-h6"},"List Group Conditions",-1),Z={__name:"assignConditionsView",setup(h){const c=i([{name:"MCONDITION_RPT_STAT",align:"left",label:"Group Desc",field:"MCONDITION_RPT_STAT",sortable:!0}]),n=i([]),l=i({sortBy:"desc",descending:!1,rowsPerPage:0}),{dialogRef:s,onDialogHide:p,onDialogOK:m,onDialogCancel:f}=V();$(()=>{_()});const _=async()=>{await T.get("/master/conditions/getdataGroup").then(a=>{console.log(a),n.value=a.data.data})},v=a=>{m(a)},D=()=>{};return(a,t)=>(R(),x(S,{ref_key:"dialogRef",ref:s,onHide:O(p),"transition-show":"slide-up","transition-hide":"slide-down","full-width":""},{default:o(()=>[e(B,{class:"q-dialog-plugin bg-white q-pa-sm"},{default:o(()=>[e(w,null,{default:o(()=>[Y]),_:1}),e(w,{class:"q-pa-sm"},{default:o(()=>[e(H,{bordered:"",class:"rounded-borders"},{default:o(()=>[e(E,{class:"my-sticky-header-table",flat:"",bordered:"",title:"Group",rows:n.value,columns:c.value,dense:"",onRowClick:t[0]||(t[0]=(u,g,k)=>v(g)),pagination:l.value},null,8,["rows","columns","pagination"])]),_:1})]),_:1}),e(M,{align:"right"},{default:o(()=>[e(r,{label:"OK",color:"primary",onClick:t[1]||(t[1]=u=>D())}),e(r,{flat:"",label:"Cancel",color:"red",onClick:O(f)},null,8,["onClick"])]),_:1})]),_:1})]),_:1},8,["onHide"]))}};const ee=d("div",{class:"text-h6"},"Assign Condition Group",-1),oe={class:"row"},te={class:"col"},ne={class:"col text-right"},ae={class:"row q-pt-md"},le={class:"col"},se={__name:"assignConditions",setup(h){const c=i([{name:"id",align:"left",label:"ID",field:"id",sortable:!0},{name:"MCONDITION_DESCRIPTION",align:"left",label:"Description",field:"MCONDITION_DESCRIPTION",sortable:!0}]),n=i([]),l=i({sortBy:"desc",descending:!1,rowsPerPage:0}),s=i([]),p=i(""),m=i("new"),f=K(),{dialogRef:_,onDialogHide:v,onDialogOK:D,onDialogCancel:a}=V();$(()=>{g()});const t=()=>{s.value=[],p.value="",m.value="new"},u=()=>{f.dialog({title:"Confirmation",message:"Are you sure want to delete this group ?",cancel:!0,persistent:!0}).onOk(async()=>{await T.delete(`/master/conditions/deleteDataGroup/${btoa(p.value)}`).then(b=>{t()})})},g=async()=>{await T.get("/master/conditions/getdata").then(b=>{console.log(b),n.value=b.data})},k=()=>{f.dialog({component:Z}).onOk(async b=>{p.value=b.MCONDITION_RPT_STAT,s.value=b.group,m.value="edit"})},C=()=>{f.dialog({title:"Confirmation",message:"Do you want to save this group ?",cancel:!0,persistent:!0}).onOk(async()=>{await T.post("/master/conditions/assignGroup",{data:s.value,MCONDITION_RPT_STAT:p.value}).then(b=>{t()})})};return(b,I)=>(R(),x(S,{ref_key:"dialogRef",ref:_,onHide:O(v),"transition-show":"slide-up","transition-hide":"slide-down","full-width":""},{default:o(()=>[e(B,{class:"q-dialog-plugin bg-white q-pa-sm"},{default:o(()=>[e(w,null,{default:o(()=>[ee]),_:1}),e(w,{class:"q-pa-sm"},{default:o(()=>[d("div",oe,[d("div",te,[e(Q,{label:"Group Name",outlined:"",dense:"",modelValue:p.value,"onUpdate:modelValue":I[0]||(I[0]=q=>p.value=q),disable:m.value==="edit"},{after:o(()=>[e(r,{dense:"",icon:"search",color:"blue",flat:"",onClick:k})]),_:1},8,["modelValue","disable"])]),d("div",ne,[e(A,{outline:""},{default:o(()=>[e(r,{outline:"",color:"blue",icon:"description",onClick:t},{default:o(()=>[e(N,null,{default:o(()=>[y("New")]),_:1})]),_:1}),e(r,{outline:"",color:"red",icon:"delete",onClick:u},{default:o(()=>[e(N,null,{default:o(()=>[y("Delete")]),_:1})]),_:1})]),_:1})])]),d("div",ae,[d("div",le,[e(E,{class:"my-sticky-header-table",flat:"",bordered:"",title:"Conditions",rows:n.value,columns:c.value,"row-key":"id",dense:"",pagination:l.value,selection:"multiple",selected:s.value,"onUpdate:selected":I[1]||(I[1]=q=>s.value=q)},null,8,["rows","columns","pagination","selected"])])])]),_:1}),e(M,{align:"right"},{default:o(()=>[e(r,{label:"OK",color:"primary",onClick:I[2]||(I[2]=q=>C()),disable:s.value.length===0||!p.value},null,8,["disable"]),e(r,{flat:"",label:"Cancel",color:"red",onClick:O(a)},null,8,["onClick"])]),_:1})]),_:1})]),_:1},8,["onHide"]))}},ie=d("div",{class:"text-h6"},"Import Data from another business",-1),de={class:"row"},ue={class:"col"},re={class:"row q-pt-md"},ce={class:"col"},pe={__name:"importData",setup(h){const c=i([]),n=i([]),l=i(""),s=i(""),{dialogRef:p,onDialogHide:m,onDialogOK:f,onDialogCancel:_}=V();$(()=>{v()});const v=async()=>{await T.get("/master/conditions/getCompaniesDetail").then(a=>{c.value=a.data.companies,n.value=a.data.CurrentCompanies,s.value=n.value[0],connection})},D=()=>{$q.dialog({title:"Confirmation",message:`Do you want to import data from ${l.value.name} ?`,cancel:!0,persistent:!0}).onOk(async()=>{await P.post("condition/import",{fromConnection:l.value}).then(a=>{newData()}),f()})};return(a,t)=>(R(),x(S,{ref_key:"dialogRef",ref:p,onHide:O(m),"transition-show":"slide-up","transition-hide":"slide-down"},{default:o(()=>[e(B,{class:"q-dialog-plugin bg-white q-pa-sm"},{default:o(()=>[e(w,null,{default:o(()=>[ie]),_:1}),e(w,{class:"q-pa-sm"},{default:o(()=>[d("div",de,[d("div",ue,[e(G,{standout:"",modelValue:l.value,"onUpdate:modelValue":t[0]||(t[0]=u=>l.value=u),options:c.value,label:"From Source","option-value":"connection","option-label":"name"},null,8,["modelValue","options"])])]),d("div",re,[d("div",ce,[e(G,{standout:"",modelValue:s.value,"onUpdate:modelValue":t[1]||(t[1]=u=>s.value=u),options:n.value,label:"Destination Source","option-value":"connection","option-label":"name"},null,8,["modelValue","options"])])])]),_:1}),e(M,{align:"right"},{default:o(()=>[e(r,{label:"OK",color:"primary",onClick:t[2]||(t[2]=u=>D())}),e(r,{flat:"",label:"Cancel",color:"red",onClick:O(_)},null,8,["onClick"])]),_:1})]),_:1})]),_:1},8,["onHide"]))}},_e={class:"q-pa-md"},ge={class:"row q-pb-md"},me=d("div",{class:"col"},[d("span",{class:"text-h4"}," Condition Master ")],-1),fe={class:"col text-right"},ve={class:"row q-pt-md"},Ce={class:"col"},De={class:"col q-pl-md"},he={__name:"conditionsMaster",setup(h){const c=K(),n=i(""),l=i(""),s=i("");i([]),$(()=>{let t=p("CGID");s.value=t});const p=t=>{for(var u=t+"=",g=document.cookie.split(";"),k=0;k<g.length;k++){for(var C=g[k];C.charAt(0)==" ";)C=C.substring(1,C.length);if(C.indexOf(u)==0)return C.substring(u.length,C.length)}return null},m=()=>{c.dialog({component:pe}).onOk(async t=>{})},f=()=>{c.dialog({title:"Confirmation",message:"Do you want to save this data ?",cancel:!0,persistent:!0}).onOk(async()=>{n.value?await P.put(`condition/${btoa(n.value)}`,{MCONDITION_DESCRIPTION:l.value,MCONDITION_ORDER_NUMBER:null}).then(t=>{_()}):await P.post("condition",{MCONDITION_DESCRIPTION:l.value,MCONDITION_ORDER_NUMBER:null}).then(t=>{_()})})},_=()=>{n.value="",l.value=""},v=()=>{c.dialog({component:X}).onOk(async t=>{n.value=t.id,l.value=t.MCONDITION_DESCRIPTION})},D=()=>{c.dialog({title:"Confirmation",message:"Are you sure want to delete this data ?",cancel:!0,persistent:!0}).onOk(async()=>{await P.delete(`condition/${btoa(n.value)}`).then(t=>{_()})})},a=()=>{c.dialog({component:se}).onOk(async t=>{console.log(t)})};return(t,u)=>(R(),J("div",_e,[d("div",ge,[me,d("div",fe,[e(A,{outline:""},{default:o(()=>[e(r,{outline:"",color:"blue",label:"Assign Condition Group",onClick:a}),e(r,{outline:"",color:"blue",icon:"description",onClick:_},{default:o(()=>[e(N,null,{default:o(()=>[y("New")]),_:1})]),_:1}),e(r,{outline:"",color:"blue",icon:"save",onClick:f},{default:o(()=>[e(N,null,{default:o(()=>[y("Save")]),_:1})]),_:1}),e(r,{outline:"",color:"blue",icon:"send",onClick:m},{default:o(()=>[e(N,null,{default:o(()=>[y("Import Data")]),_:1})]),_:1}),e(r,{outline:"",color:"red",icon:"delete",disable:!n.value,onClick:D},{default:o(()=>[e(N,null,{default:o(()=>[y("Delete")]),_:1})]),_:1},8,["disable"])]),_:1})])]),e(z),d("div",ve,[d("div",Ce,[e(Q,{label:"Condition Code",dense:"",outlined:"",modelValue:n.value,"onUpdate:modelValue":u[0]||(u[0]=g=>n.value=g),disable:""},{after:o(()=>[e(r,{dense:"",icon:"search",color:"blue",flat:"",onClick:v})]),_:1},8,["modelValue"])]),d("div",De,[e(Q,{label:"Condition Name",dense:"",outlined:"",modelValue:l.value,"onUpdate:modelValue":u[1]||(u[1]=g=>l.value=g),type:"textarea"},null,8,["modelValue"])])])]))}};export{he as default};
