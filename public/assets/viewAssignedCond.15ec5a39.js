import{t as O,C as i,D as r,E as e,F as t,M as N,O as c,J as n,Q as d,R as T,S as k,T as w,U as Q,I as u,P as S,W as R,X as b,Y as p,Z as x}from"./index.3fb2e215.js";import{a as y,u as P,b as v,c as V,d as _}from"./QTable.43ee5cd2.js";import{api as B}from"./axios.6d243bf1.js";const E={class:"row"},q=n("div",{class:"col text-h6"},"View Condition",-1),A={class:"col text-right"},K={__name:"viewAssignedCond",props:{listCond:Array},setup(m){const s=m,g=y();O(!1);const C=()=>{g.dialog({title:"Prompt",message:"Input group name conditions",prompt:{model:"",isValid:o=>o.length>2,type:"text"},cancel:!0,persistent:!0}).onOk(async o=>{let l=[];console.log(s.listCond),s.listCond.map(a=>{l.push({id:a.id,MCONDITION_DESCRIPTION:a.MCONDITION_DESCRIPTION})}),await B.post("/master/conditions/assignGroup",{data:l,MCONDITION_RPT_STAT:o}).then(a=>{console.log(a)})})},{dialogRef:f,onDialogHide:I,onDialogOK:h,onDialogCancel:M}=P();return(o,l)=>(i(),r(x,{ref_key:"dialogRef",ref:f,onHide:p(I),"transition-show":"slide-up","transition-hide":"slide-down","full-width":""},{default:e(()=>[t(N,{class:"q-dialog-plugin bg-white q-pa-sm"},{default:e(()=>[t(c,null,{default:e(()=>[n("div",E,[q,n("div",A,[t(d,{label:"Save Template",color:"blue",onClick:C})])])]),_:1}),t(c,{class:"q-pa-sm"},{default:e(()=>[(i(!0),T(k,null,w(s.listCond,(a,D)=>Q((i(),r(v,{clickable:"",key:D},{default:e(()=>[t(V,null,{default:e(()=>[t(_,null,{default:e(()=>[u(S(a.MCONDITION_DESCRIPTION),1)]),_:2},1024),t(_,{caption:""},{default:e(()=>[u("Description")]),_:1})]),_:2},1024)]),_:2},1024)),[[R]])),128))]),_:1}),t(b,{align:"right"},{default:e(()=>[t(d,{label:"OK",color:"primary",onClick:p(h)},null,8,["onClick"])]),_:1})]),_:1})]),_:1},8,["onHide"]))}};export{K as _};
