import{t as s,o as k,C as D,D as T,E as o,F as a,M as Q,O as i,X as h,Q as r,Y as d,Z as y,J as O}from"./index.c62a6938.js";import{u as x,Q as N,k as P}from"./QTable.da74a710.js";import{api as B}from"./axios.d0606a07.js";const R=O("div",{class:"text-h6"},"List Group Conditions",-1),A={__name:"assignConditionsView",setup(G){const c=s([{name:"MCONDITION_RPT_STAT",align:"left",label:"Group Desc",field:"MCONDITION_RPT_STAT",sortable:!0}]),t=s([]),u=s({sortBy:"desc",descending:!1,rowsPerPage:0}),l=s(!1),{dialogRef:g,onDialogHide:f,onDialogOK:_,onDialogCancel:p}=x();k(()=>{C()});const C=async()=>{l.value=!0,await B.get("/master/conditions/getdataGroup").then(e=>{l.value=!1,console.log(e),t.value=e.data.data}).catch(e=>{l.value=!1})},m=e=>{_(e)},v=()=>{};return(e,n)=>(D(),T(y,{ref_key:"dialogRef",ref:g,onHide:d(f),"transition-show":"slide-up","transition-hide":"slide-down","full-width":""},{default:o(()=>[a(Q,{class:"q-dialog-plugin bg-white q-pa-sm"},{default:o(()=>[a(i,null,{default:o(()=>[R]),_:1}),a(i,{class:"q-pa-sm"},{default:o(()=>[a(N,{bordered:"",class:"rounded-borders"},{default:o(()=>[a(P,{class:"my-sticky-header-table",flat:"",bordered:"",title:"Group",rows:t.value,columns:c.value,dense:"",onRowClick:n[0]||(n[0]=(w,b,I)=>m(b)),pagination:u.value,loading:l.value},null,8,["rows","columns","pagination","loading"])]),_:1})]),_:1}),a(h,{align:"right"},{default:o(()=>[a(r,{label:"OK",color:"primary",onClick:n[1]||(n[1]=w=>v())}),a(r,{flat:"",label:"Cancel",color:"red",onClick:d(p)},null,8,["onClick"])]),_:1})]),_:1})]),_:1},8,["onHide"]))}};export{A as _};
