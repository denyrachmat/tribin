import{s as n,o as k,B as D,C as T,D as o,E as a,L as Q,M as i,W as h,Q as r,X as d,Y as y,I as O}from"./index.eaeb84a9.js";import{u as x,Q as B,k as N}from"./QTable.6ac0016b.js";import{api as P}from"./axios.07cd3488.js";const I=O("div",{class:"text-h6"},"List Group Conditions",-1),A={__name:"assignConditionsView",setup(R){const c=n([{name:"MCONDITION_RPT_STAT",align:"left",label:"Group Desc",field:"MCONDITION_RPT_STAT",sortable:!0}]),t=n([]),u=n({sortBy:"desc",descending:!1,rowsPerPage:0}),l=n(!1),{dialogRef:g,onDialogHide:f,onDialogOK:_,onDialogCancel:p}=x();k(()=>{C()});const C=async()=>{l.value=!0,await P.get("/master/conditions/getdataGroup").then(e=>{l.value=!1,console.log(e),t.value=e.data.data}).catch(e=>{l.value=!1})},m=e=>{_(e)},v=()=>{};return(e,s)=>(D(),T(y,{ref_key:"dialogRef",ref:g,onHide:d(f),"transition-show":"slide-up","transition-hide":"slide-down","full-width":""},{default:o(()=>[a(Q,{class:"q-dialog-plugin bg-white q-pa-sm"},{default:o(()=>[a(i,null,{default:o(()=>[I]),_:1}),a(i,{class:"q-pa-sm"},{default:o(()=>[a(B,{bordered:"",class:"rounded-borders"},{default:o(()=>[a(N,{class:"my-sticky-header-table",flat:"",bordered:"",title:"Group",rows:t.value,columns:c.value,dense:"",onRowClick:s[0]||(s[0]=(w,b,G)=>m(b)),pagination:u.value,loading:l.value},null,8,["rows","columns","pagination","loading"])]),_:1})]),_:1}),a(h,{align:"right"},{default:o(()=>[a(r,{label:"OK",color:"primary",onClick:s[1]||(s[1]=w=>v())}),a(r,{flat:"",label:"Cancel",color:"red",onClick:d(p)},null,8,["onClick"])]),_:1})]),_:1})]),_:1},8,["onHide"]))}};export{A as _};
