import{s as o,o as B,B as s,J as I,I as t,E as a,D as e,K as P,Q as m,H as n,L as b,C as p,M as x,O as S,P as q,R as M,S as k}from"./index.0b34278f.js";import{Q as N}from"./QTooltip.9360b43a.js";import{u as R,a as E,Q as A,b as G,c as d,d as w,e as y}from"./QTable.2d4d8f23.js";import{api as O}from"./axios.222c398b.js";import{_ as L}from"./assignConditionsView.74e91e9d.js";const $={class:"q-pa-md"},U=t("div",{class:"row"},[t("div",{class:"col"},[t("div",{class:"text-h6"},"Assign Condition Group")])],-1),F={class:"row q-pt-md"},H={class:"col"},J={class:"row"},K={class:"col"},j={class:"col text-right"},z={class:"row q-pt-md"},W={class:"col",style:{"max-height":"80vh",overflow:"auto"}},le={__name:"assignConditions",setup(X){o([{name:"id",align:"left",label:"ID",field:"id",sortable:!0},{name:"MCONDITION_DESCRIPTION",align:"left",label:"Description",field:"MCONDITION_DESCRIPTION",sortable:!0}]);const v=o([]);o({sortBy:"desc",descending:!1,rowsPerPage:0});const u=o([]),i=o(""),f=o("new"),c=o(!1),g=R();E(),B(()=>{T()});const C=()=>{u.value=[],i.value="",f.value="new"},Q=()=>{g.dialog({title:"Confirmation",message:"Are you sure want to delete this group ?",cancel:!0,persistent:!0}).onOk(async()=>{await O.delete(`/master/conditions/deleteDataGroup/${btoa(i.value)}`).then(l=>{C()})})},T=async()=>{c.value=!0,await O.get("/master/conditions/getdata").then(l=>{console.log(l),c.value=!1,v.value=l.data}).catch(l=>{c.value=!1})},V=()=>{g.dialog({component:L}).onOk(async l=>{i.value=l.MCONDITION_RPT_STAT,u.value=l.group,f.value="edit"})};return(l,r)=>(s(),I("div",$,[U,t("div",F,[t("div",H,[t("div",J,[t("div",K,[a(P,{label:"Group Name",outlined:"",dense:"",modelValue:i.value,"onUpdate:modelValue":r[0]||(r[0]=_=>i.value=_),disable:f.value==="edit"},{after:e(()=>[a(m,{dense:"",icon:"search",color:"blue",flat:"",onClick:V})]),_:1},8,["modelValue","disable"])]),t("div",j,[a(A,{outline:""},{default:e(()=>[a(m,{outline:"",color:"blue",icon:"description",onClick:C},{default:e(()=>[a(N,null,{default:e(()=>[n("New")]),_:1})]),_:1}),a(m,{outline:"",color:"red",icon:"delete",onClick:Q},{default:e(()=>[a(N,null,{default:e(()=>[n("Delete")]),_:1})]),_:1})]),_:1})])]),t("div",z,[t("div",W,[a(G,{bordered:""},{default:e(()=>[v.value.length===0?b((s(),p(w,{key:0,class:"q-my-sm",clickable:"",tag:"label"},{default:e(()=>[c.value?(s(),p(d,{key:0},{default:e(()=>[n(" Data is loading, please wait. ")]),_:1})):(s(),p(d,{key:1},{default:e(()=>[n(" No Data Available ! ")]),_:1}))]),_:1})),[[k]]):(s(!0),I(x,{key:1},S(v.value,(_,D)=>b((s(),p(w,{key:D,class:"q-my-sm",clickable:"",tag:"label"},{default:e(()=>[a(d,{side:"",top:""},{default:e(()=>[a(q,{modelValue:u.value,"onUpdate:modelValue":r[1]||(r[1]=h=>u.value=h),val:_.id},null,8,["modelValue","val"])]),_:2},1024),a(d,null,{default:e(()=>[a(y,null,{default:e(()=>[n(M(_.MCONDITION_DESCRIPTION),1)]),_:2},1024),a(y,{caption:"",lines:"1"},{default:e(()=>[n("Description")]),_:1})]),_:2},1024),a(d,{side:""},{default:e(()=>[a(m,{name:"delete",color:"red",flat:"",onClick:h=>l.onDeleteCondition(D)},null,8,["onClick"])]),_:2},1024)]),_:2},1024)),[[k]])),128))]),_:1})])])])])]))}};export{le as default};
