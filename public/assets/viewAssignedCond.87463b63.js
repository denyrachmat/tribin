import{s as O,B as i,C as r,D as e,E as t,L as N,M as c,I as n,Q as d,P as T,R as k,S as w,T as Q,H as u,O as S,V as R,W as b,X as p,Y as x}from"./index.917b264a.js";import{a as y,u as P,b as V,c as v,d as _}from"./QTable.e3e4da49.js";import{api as B}from"./axios.9db8ae2e.js";const E={class:"row"},q=n("div",{class:"col text-h6"},"View Condition",-1),A={class:"col text-right"},K={__name:"viewAssignedCond",props:{listCond:Array},setup(m){const o=m,g=y();O(!1);const C=()=>{g.dialog({title:"Prompt",message:"Input group name conditions",prompt:{model:"",isValid:s=>s.length>2,type:"text"},cancel:!0,persistent:!0}).onOk(async s=>{let l=[];console.log(o.listCond),o.listCond.map(a=>{l.push({id:a.id,MCONDITION_DESCRIPTION:a.MCONDITION_DESCRIPTION})}),await B.post("/master/conditions/assignGroup",{data:l,MCONDITION_RPT_STAT:s}).then(a=>{console.log(a)})})},{dialogRef:f,onDialogHide:I,onDialogOK:h,onDialogCancel:H}=P();return(s,l)=>(i(),r(x,{ref_key:"dialogRef",ref:f,onHide:p(I),"transition-show":"slide-up","transition-hide":"slide-down","full-width":""},{default:e(()=>[t(N,{class:"q-dialog-plugin bg-white q-pa-sm"},{default:e(()=>[t(c,null,{default:e(()=>[n("div",E,[q,n("div",A,[t(d,{label:"Save Template",color:"blue",onClick:C})])])]),_:1}),t(c,{class:"q-pa-sm"},{default:e(()=>[(i(!0),T(k,null,w(o.listCond,(a,D)=>Q((i(),r(V,{clickable:"",key:D},{default:e(()=>[t(v,null,{default:e(()=>[t(_,null,{default:e(()=>[u(S(a.MCONDITION_DESCRIPTION),1)]),_:2},1024),t(_,{caption:""},{default:e(()=>[u("Description")]),_:1})]),_:2},1024)]),_:2},1024)),[[R]])),128))]),_:1}),t(b,{align:"right"},{default:e(()=>[t(d,{label:"OK",color:"primary",onClick:p(h)},null,8,["onClick"])]),_:1})]),_:1})]),_:1},8,["onHide"]))}};export{K as _};
