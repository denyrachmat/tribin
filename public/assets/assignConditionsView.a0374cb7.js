import{s as n,o as k,B as v,C as D,D as e,E as a,L as T,M as l,W as Q,Q as i,X as r,Y as y,I as h}from"./index.25ddd3ed.js";import{u as O,Q as x,l as B}from"./QTable.0b5983d9.js";import{api as N}from"./axios.42d686d5.js";const P=h("div",{class:"text-h6"},"List Group Conditions",-1),q={__name:"assignConditionsView",setup(I){const d=n([{name:"MCONDITION_RPT_STAT",align:"left",label:"Group Desc",field:"MCONDITION_RPT_STAT",sortable:!0}]),t=n([]),c=n({sortBy:"desc",descending:!1,rowsPerPage:0}),{dialogRef:u,onDialogHide:g,onDialogOK:_,onDialogCancel:f}=O();k(()=>{p()});const p=async()=>{await N.get("/master/conditions/getdataGroup").then(o=>{console.log(o),t.value=o.data.data})},C=o=>{_(o)},m=()=>{};return(o,s)=>(v(),D(y,{ref_key:"dialogRef",ref:u,onHide:r(g),"transition-show":"slide-up","transition-hide":"slide-down","full-width":""},{default:e(()=>[a(T,{class:"q-dialog-plugin bg-white q-pa-sm"},{default:e(()=>[a(l,null,{default:e(()=>[P]),_:1}),a(l,{class:"q-pa-sm"},{default:e(()=>[a(x,{bordered:"",class:"rounded-borders"},{default:e(()=>[a(B,{class:"my-sticky-header-table",flat:"",bordered:"",title:"Group",rows:t.value,columns:d.value,dense:"",onRowClick:s[0]||(s[0]=(w,b,R)=>C(b)),pagination:c.value},null,8,["rows","columns","pagination"])]),_:1})]),_:1}),a(Q,{align:"right"},{default:e(()=>[a(i,{label:"OK",color:"primary",onClick:s[1]||(s[1]=w=>m())}),a(i,{flat:"",label:"Cancel",color:"red",onClick:r(f)},null,8,["onClick"])]),_:1})]),_:1})]),_:1},8,["onHide"]))}};export{q as _};
