import{s as n,o as k,B as v,C as D,D as e,E as a,aN as T,aO as i,aP as Q,Q as l,aQ as r,aC as y,I as O}from"./index.83bc94a0.js";import{a as h,i as N,b as P}from"./use-dialog-plugin-component.c360013a.js";import{api as x}from"./axios.960036d4.js";const B=O("div",{class:"text-h6"},"List Group Conditions",-1),A={__name:"assignConditionsView",setup(I){const d=n([{name:"MCONDITION_RPT_STAT",align:"left",label:"Group Desc",field:"MCONDITION_RPT_STAT",sortable:!0}]),t=n([]),c=n({sortBy:"desc",descending:!1,rowsPerPage:0}),{dialogRef:u,onDialogHide:g,onDialogOK:_,onDialogCancel:f}=h();k(()=>{p()});const p=async()=>{await x.get("/master/conditions/getdataGroup").then(o=>{console.log(o),t.value=o.data.data})},C=o=>{_(o)},m=()=>{};return(o,s)=>(v(),D(y,{ref_key:"dialogRef",ref:u,onHide:r(g),"transition-show":"slide-up","transition-hide":"slide-down","full-width":""},{default:e(()=>[a(T,{class:"q-dialog-plugin bg-white q-pa-sm"},{default:e(()=>[a(i,null,{default:e(()=>[B]),_:1}),a(i,{class:"q-pa-sm"},{default:e(()=>[a(N,{bordered:"",class:"rounded-borders"},{default:e(()=>[a(P,{class:"my-sticky-header-table",flat:"",bordered:"",title:"Group",rows:t.value,columns:d.value,dense:"",onRowClick:s[0]||(s[0]=(w,b,R)=>C(b)),pagination:c.value},null,8,["rows","columns","pagination"])]),_:1})]),_:1}),a(Q,{align:"right"},{default:e(()=>[a(l,{label:"OK",color:"primary",onClick:s[1]||(s[1]=w=>m())}),a(l,{flat:"",label:"Cancel",color:"red",onClick:r(f)},null,8,["onClick"])]),_:1})]),_:1})]),_:1},8,["onHide"]))}};export{A as _};
