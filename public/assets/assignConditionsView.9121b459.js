import{s as n,o as k,B as v,C as D,D as o,E as a,L as T,M as i,W as Q,Q as l,X as r,Y as y,I as h}from"./index.de913cb1.js";import{Q as O,j as x}from"./QTable.93f54612.js";import{u as B}from"./use-dialog-plugin-component.e1bc3074.js";import{api as N}from"./axios.f37d8f86.js";const P=h("div",{class:"text-h6"},"List Group Conditions",-1),A={__name:"assignConditionsView",setup(I){const d=n([{name:"MCONDITION_RPT_STAT",align:"left",label:"Group Desc",field:"MCONDITION_RPT_STAT",sortable:!0}]),t=n([]),c=n({sortBy:"desc",descending:!1,rowsPerPage:0}),{dialogRef:u,onDialogHide:g,onDialogOK:_,onDialogCancel:f}=B();k(()=>{p()});const p=async()=>{await N.get("/master/conditions/getdataGroup").then(e=>{console.log(e),t.value=e.data.data})},m=e=>{_(e)},C=()=>{};return(e,s)=>(v(),D(y,{ref_key:"dialogRef",ref:u,onHide:r(g),"transition-show":"slide-up","transition-hide":"slide-down","full-width":""},{default:o(()=>[a(T,{class:"q-dialog-plugin bg-white q-pa-sm"},{default:o(()=>[a(i,null,{default:o(()=>[P]),_:1}),a(i,{class:"q-pa-sm"},{default:o(()=>[a(O,{bordered:"",class:"rounded-borders"},{default:o(()=>[a(x,{class:"my-sticky-header-table",flat:"",bordered:"",title:"Group",rows:t.value,columns:d.value,dense:"",onRowClick:s[0]||(s[0]=(w,b,R)=>m(b)),pagination:c.value},null,8,["rows","columns","pagination"])]),_:1})]),_:1}),a(Q,{align:"right"},{default:o(()=>[a(l,{label:"OK",color:"primary",onClick:s[1]||(s[1]=w=>C())}),a(l,{flat:"",label:"Cancel",color:"red",onClick:r(f)},null,8,["onClick"])]),_:1})]),_:1})]),_:1},8,["onHide"]))}};export{A as _};
