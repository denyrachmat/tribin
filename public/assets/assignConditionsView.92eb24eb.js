import{s as t,o as k,B as D,C as T,D as o,E as a,L as Q,M as i,W as h,Q as r,X as d,Y as y,I as O}from"./index.2010af2d.js";import{Q as x,j as B}from"./QTable.2d8e532c.js";import{u as N}from"./use-dialog-plugin-component.7560017b.js";import{api as P}from"./axios.16ebe505.js";const I=O("div",{class:"text-h6"},"List Group Conditions",-1),H={__name:"assignConditionsView",setup(R){const c=t([{name:"MCONDITION_RPT_STAT",align:"left",label:"Group Desc",field:"MCONDITION_RPT_STAT",sortable:!0}]),n=t([]),u=t({sortBy:"desc",descending:!1,rowsPerPage:0}),l=t(!1),{dialogRef:g,onDialogHide:f,onDialogOK:_,onDialogCancel:p}=N();k(()=>{m()});const m=async()=>{l.value=!0,await P.get("/master/conditions/getdataGroup").then(e=>{l.value=!1,console.log(e),n.value=e.data.data}).catch(e=>{l.value=!1})},C=e=>{_(e)},v=()=>{};return(e,s)=>(D(),T(y,{ref_key:"dialogRef",ref:g,onHide:d(f),"transition-show":"slide-up","transition-hide":"slide-down","full-width":""},{default:o(()=>[a(Q,{class:"q-dialog-plugin bg-white q-pa-sm"},{default:o(()=>[a(i,null,{default:o(()=>[I]),_:1}),a(i,{class:"q-pa-sm"},{default:o(()=>[a(x,{bordered:"",class:"rounded-borders"},{default:o(()=>[a(B,{class:"my-sticky-header-table",flat:"",bordered:"",title:"Group",rows:n.value,columns:c.value,dense:"",onRowClick:s[0]||(s[0]=(w,b,G)=>C(b)),pagination:u.value},null,8,["rows","columns","pagination"])]),_:1})]),_:1}),a(h,{align:"right"},{default:o(()=>[a(r,{label:"OK",color:"primary",onClick:s[1]||(s[1]=w=>v())}),a(r,{flat:"",label:"Cancel",color:"red",onClick:d(p)},null,8,["onClick"])]),_:1})]),_:1})]),_:1},8,["onHide"]))}};export{H as _};
