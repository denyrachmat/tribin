import{t as n,o as k,C as D,D as Q,E as o,F as a,M as T,O as i,X as h,Q as r,Y as d,Z as y,J as O}from"./index.08308679.js";import{Q as x}from"./QTable.9215c82a.js";import{Q as N}from"./QList.611e548a.js";import{u as P}from"./use-dialog-plugin-component.82a57269.js";import{api as B}from"./axios.4c94c384.js";const R=O("div",{class:"text-h6"},"List Group Conditions",-1),K={__name:"assignConditionsView",setup(G){const c=n([{name:"MCONDITION_RPT_STAT",align:"left",label:"Group Desc",field:"MCONDITION_RPT_STAT",sortable:!0}]),s=n([]),u=n({sortBy:"desc",descending:!1,rowsPerPage:0}),l=n(!1),{dialogRef:g,onDialogHide:f,onDialogOK:_,onDialogCancel:p}=P();k(()=>{m()});const m=async()=>{l.value=!0,await B.get("/master/conditions/getdataGroup").then(e=>{l.value=!1,console.log(e),s.value=e.data.data}).catch(e=>{l.value=!1})},C=e=>{_(e)},v=()=>{};return(e,t)=>(D(),Q(y,{ref_key:"dialogRef",ref:g,onHide:d(f),"transition-show":"slide-up","transition-hide":"slide-down","full-width":""},{default:o(()=>[a(T,{class:"q-dialog-plugin bg-white q-pa-sm"},{default:o(()=>[a(i,null,{default:o(()=>[R]),_:1}),a(i,{class:"q-pa-sm"},{default:o(()=>[a(N,{bordered:"",class:"rounded-borders"},{default:o(()=>[a(x,{class:"my-sticky-header-table",flat:"",bordered:"",title:"Group",rows:s.value,columns:c.value,dense:"",onRowClick:t[0]||(t[0]=(w,b,I)=>C(b)),pagination:u.value,loading:l.value},null,8,["rows","columns","pagination","loading"])]),_:1})]),_:1}),a(h,{align:"right"},{default:o(()=>[a(r,{label:"OK",color:"primary",onClick:t[1]||(t[1]=w=>v())}),a(r,{flat:"",label:"Cancel",color:"red",onClick:d(p)},null,8,["onClick"])]),_:1})]),_:1})]),_:1},8,["onHide"]))}};export{K as _};
