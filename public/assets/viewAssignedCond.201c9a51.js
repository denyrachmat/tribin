import{s as O,B as l,C as r,D as e,E as t,L as N,M as c,I as n,Q as d,P as T,R as k,S as w,T as Q,H as u,O as S,V as R,W as b,X as p,Y as x}from"./index.534ab6c6.js";import{u as y,a as P,b as V,c as _}from"./QTable.b325610d.js";import{u as v}from"./use-dialog-plugin-component.d78beec2.js";import{api as B}from"./axios.1f5ab7bd.js";const E={class:"row"},q=n("div",{class:"col text-h6"},"View Condition",-1),A={class:"col text-right"},F={__name:"viewAssignedCond",props:{listCond:Array},setup(m){const s=m,g=y();O(!1);const C=()=>{g.dialog({title:"Prompt",message:"Input group name conditions",prompt:{model:"",isValid:o=>o.length>2,type:"text"},cancel:!0,persistent:!0}).onOk(async o=>{let i=[];console.log(s.listCond),s.listCond.map(a=>{i.push({id:a.id,MCONDITION_DESCRIPTION:a.MCONDITION_DESCRIPTION})}),await B.post("/master/conditions/assignGroup",{data:i,MCONDITION_RPT_STAT:o}).then(a=>{console.log(a)})})},{dialogRef:f,onDialogHide:I,onDialogOK:h,onDialogCancel:H}=v();return(o,i)=>(l(),r(x,{ref_key:"dialogRef",ref:f,onHide:p(I),"transition-show":"slide-up","transition-hide":"slide-down","full-width":""},{default:e(()=>[t(N,{class:"q-dialog-plugin bg-white q-pa-sm"},{default:e(()=>[t(c,null,{default:e(()=>[n("div",E,[q,n("div",A,[t(d,{label:"Save Template",color:"blue",onClick:C})])])]),_:1}),t(c,{class:"q-pa-sm"},{default:e(()=>[(l(!0),T(k,null,w(s.listCond,(a,D)=>Q((l(),r(P,{clickable:"",key:D},{default:e(()=>[t(V,null,{default:e(()=>[t(_,null,{default:e(()=>[u(S(a.MCONDITION_DESCRIPTION),1)]),_:2},1024),t(_,{caption:""},{default:e(()=>[u("Description")]),_:1})]),_:2},1024)]),_:2},1024)),[[R]])),128))]),_:1}),t(b,{align:"right"},{default:e(()=>[t(d,{label:"OK",color:"primary",onClick:p(h)},null,8,["onClick"])]),_:1})]),_:1})]),_:1},8,["onHide"]))}};export{F as _};
