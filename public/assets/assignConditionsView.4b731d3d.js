import{s as n,o as T,B as k,C as v,D as e,E as a,aR as D,aS as l,aT as y,Q as i,aU as r,aI as Q,I as h}from"./index.05ce2e6f.js";import{a as O,b as x,l as B}from"./QTable.5b967f61.js";import{api as I}from"./axios.edff6011.js";const N=h("div",{class:"text-h6"},"List Group Conditions",-1),q={__name:"assignConditionsView",setup(P){const d=n([{name:"MCONDITION_RPT_STAT",align:"left",label:"Group Desc",field:"MCONDITION_RPT_STAT",sortable:!0}]),t=n([]),c=n({sortBy:"desc",descending:!1,rowsPerPage:0}),{dialogRef:u,onDialogHide:g,onDialogOK:_,onDialogCancel:f}=O();T(()=>{p()});const p=async()=>{await I.get("/master/conditions/getdataGroup").then(o=>{console.log(o),t.value=o.data.data})},C=o=>{_(o)},m=()=>{};return(o,s)=>(k(),v(Q,{ref_key:"dialogRef",ref:u,onHide:r(g),"transition-show":"slide-up","transition-hide":"slide-down","full-width":""},{default:e(()=>[a(D,{class:"q-dialog-plugin bg-white q-pa-sm"},{default:e(()=>[a(l,null,{default:e(()=>[N]),_:1}),a(l,{class:"q-pa-sm"},{default:e(()=>[a(x,{bordered:"",class:"rounded-borders"},{default:e(()=>[a(B,{class:"my-sticky-header-table",flat:"",bordered:"",title:"Group",rows:t.value,columns:d.value,dense:"",onRowClick:s[0]||(s[0]=(w,b,R)=>C(b)),pagination:c.value},null,8,["rows","columns","pagination"])]),_:1})]),_:1}),a(y,{align:"right"},{default:e(()=>[a(i,{label:"OK",color:"primary",onClick:s[1]||(s[1]=w=>m())}),a(i,{flat:"",label:"Cancel",color:"red",onClick:r(f)},null,8,["onClick"])]),_:1})]),_:1})]),_:1},8,["onHide"]))}};export{q as _};
