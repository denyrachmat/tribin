import{t as O,C as l,D as r,E as e,F as t,M as N,O as c,J as n,Q as d,R as T,S as Q,T as k,U as w,I as u,P as S,W as R,X as b,Y as p,Z as x}from"./index.1994d2d5.js";import{Q as y,a as P,b as m}from"./QSelect.30362b2f.js";import{u as v}from"./format.e01e569a.js";import{u as V}from"./use-dialog-plugin-component.ab6fe4b7.js";import{api as B}from"./axios.60216c5a.js";const E={class:"row"},q=n("div",{class:"col text-h6"},"View Condition",-1),A={class:"col text-right"},J={__name:"viewAssignedCond",props:{listCond:Array},setup(_){const s=_,g=v();O(!1);const f=()=>{g.dialog({title:"Prompt",message:"Input group name conditions",prompt:{model:"",isValid:o=>o.length>2,type:"text"},cancel:!0,persistent:!0}).onOk(async o=>{let i=[];console.log(s.listCond),s.listCond.map(a=>{i.push({id:a.id,MCONDITION_DESCRIPTION:a.MCONDITION_DESCRIPTION})}),await B.post("/master/conditions/assignGroup",{data:i,MCONDITION_RPT_STAT:o}).then(a=>{console.log(a)})})},{dialogRef:C,onDialogHide:I,onDialogOK:h,onDialogCancel:M}=V();return(o,i)=>(l(),r(x,{ref_key:"dialogRef",ref:C,onHide:p(I),"transition-show":"slide-up","transition-hide":"slide-down","full-width":""},{default:e(()=>[t(N,{class:"q-dialog-plugin bg-white q-pa-sm"},{default:e(()=>[t(c,null,{default:e(()=>[n("div",E,[q,n("div",A,[t(d,{label:"Save Template",color:"blue",onClick:f})])])]),_:1}),t(c,{class:"q-pa-sm"},{default:e(()=>[(l(!0),T(Q,null,k(s.listCond,(a,D)=>w((l(),r(y,{clickable:"",key:D},{default:e(()=>[t(P,null,{default:e(()=>[t(m,null,{default:e(()=>[u(S(a.MCONDITION_DESCRIPTION),1)]),_:2},1024),t(m,{caption:""},{default:e(()=>[u("Description")]),_:1})]),_:2},1024)]),_:2},1024)),[[R]])),128))]),_:1}),t(b,{align:"right"},{default:e(()=>[t(d,{label:"OK",color:"primary",onClick:p(h)},null,8,["onClick"])]),_:1})]),_:1})]),_:1},8,["onHide"]))}};export{J as _};
