import{h as o,c as V,J as A,K as E,s as u,o as q,B as p,L as N,I as s,E as a,D as e,M as G,Q as m,H as d,O as D,C,P as $,R as L,S as U,T as z,U as O}from"./index.cafb8bea.js";import{Q as h}from"./QTooltip.5b3c8a48.js";import{u as F,a as H,Q as K,b as J,c as v,d as T,e as S}from"./QTable.491e94de.js";import{api as b}from"./axios.256a4cab.js";import{_ as Y}from"./assignConditionsView.8b22f524.js";const j=[o("g",{transform:"translate(20 50)"},[o("rect",{x:"-10",y:"-30",width:"20",height:"60",fill:"currentColor",opacity:"0.6"},[o("animateTransform",{attributeName:"transform",type:"scale",from:"2",to:"1",begin:"0s",repeatCount:"indefinite",dur:"1s",calcMode:"spline",keySplines:"0.1 0.9 0.4 1",keyTimes:"0;1",values:"2;1"})])]),o("g",{transform:"translate(50 50)"},[o("rect",{x:"-10",y:"-30",width:"20",height:"60",fill:"currentColor",opacity:"0.8"},[o("animateTransform",{attributeName:"transform",type:"scale",from:"2",to:"1",begin:"0.1s",repeatCount:"indefinite",dur:"1s",calcMode:"spline",keySplines:"0.1 0.9 0.4 1",keyTimes:"0;1",values:"2;1"})])]),o("g",{transform:"translate(80 50)"},[o("rect",{x:"-10",y:"-30",width:"20",height:"60",fill:"currentColor",opacity:"0.9"},[o("animateTransform",{attributeName:"transform",type:"scale",from:"2",to:"1",begin:"0.2s",repeatCount:"indefinite",dur:"1s",calcMode:"spline",keySplines:"0.1 0.9 0.4 1",keyTimes:"0;1",values:"2;1"})])])];var M=V({name:"QSpinnerFacebook",props:A,setup(k){const{cSize:c,classes:i}=E(k);return()=>o("svg",{class:i.value,width:c.value,height:c.value,viewBox:"0 0 100 100",xmlns:"http://www.w3.org/2000/svg",preserveAspectRatio:"xMidYMid"},j)}});const W={class:"q-pa-md"},X=s("div",{class:"row"},[s("div",{class:"col"},[s("div",{class:"text-h6"},"Assign Condition Group")])],-1),Z={class:"row q-pt-md"},ee={class:"col"},ae={class:"row"},te={class:"col"},oe={class:"col text-right"},se={class:"row q-pt-md"},le={class:"col",style:{"max-height":"80vh",overflow:"auto"}},ce={__name:"assignConditions",setup(k){u([{name:"id",align:"left",label:"ID",field:"id",sortable:!0},{name:"MCONDITION_DESCRIPTION",align:"left",label:"Description",field:"MCONDITION_DESCRIPTION",sortable:!0}]);const c=u([]);u({sortBy:"desc",descending:!1,rowsPerPage:0});const i=u([]),r=u(""),y=u("new"),f=u(!1),l=F();H(),q(()=>{x()});const _=()=>{i.value=[],r.value="",y.value="new"},Q=()=>{l.dialog({title:"Confirmation",message:"Are you sure want to delete this group ?",cancel:!0,persistent:!0}).onOk(async()=>{l.loading.show({spinner:M,spinnerColor:"yellow",spinnerSize:140,backgroundColor:"purple",message:"Save your information, Hang on...",messageColor:"black"}),await b.delete(`/master/conditions/deleteDataGroup/${btoa(r.value)}`).then(t=>{l.loading.hide(),_()})})},x=async()=>{f.value=!0,await b.get("/master/conditions/getdata").then(t=>{console.log(t),f.value=!1,c.value=t.data}).catch(t=>{f.value=!1})},R=()=>{l.dialog({component:Y}).onOk(async t=>{r.value=t.MCONDITION_RPT_STAT,i.value=t.group.map(n=>n.id),y.value="edit"})},P=()=>{l.dialog({title:"Confirmation",message:"Do you want to save this group ?",cancel:!0,persistent:!0}).onOk(async()=>{l.loading.show({spinner:M,spinnerColor:"yellow",spinnerSize:140,backgroundColor:"purple",message:"Save your information, Hang on...",messageColor:"black"}),await b.post("/master/conditions/assignGroup",{data:i.value,MCONDITION_RPT_STAT:r.value}).then(t=>{l.loading.hide(),_()}).catch(t=>{l.loading.hide()})})},B=()=>{l.dialog({title:"Add Conditions",message:"Input conditions",prompt:{model:"",isValid:t=>t.length>2,type:"text"},cancel:!0,persistent:!0}).onOk(async t=>{await api_web.post("condition",{MCONDITION_DESCRIPTION:t,MCONDITION_ORDER_NUMBER:null}).then(n=>{_()})})};return(t,n)=>(p(),N("div",W,[X,s("div",Z,[s("div",ee,[s("div",ae,[s("div",te,[a(G,{label:"Group Name",outlined:"",dense:"",modelValue:r.value,"onUpdate:modelValue":n[0]||(n[0]=g=>r.value=g),disable:y.value==="edit"},{after:e(()=>[a(m,{dense:"",icon:"search",color:"blue",flat:"",onClick:R})]),_:1},8,["modelValue","disable"])]),s("div",oe,[a(K,{outline:""},{default:e(()=>[a(m,{outline:"",color:"blue",icon:"description",onClick:_},{default:e(()=>[a(h,null,{default:e(()=>[d("New")]),_:1})]),_:1}),a(m,{outline:"",color:"blue",icon:"save",onClick:P,disable:!r.value||i.value.length===0},{default:e(()=>[a(h,null,{default:e(()=>[d("Save Conditions")]),_:1})]),_:1},8,["disable"]),a(m,{outline:"",color:"blue",icon:"add",onClick:n[1]||(n[1]=g=>B())},{default:e(()=>[a(h,null,{default:e(()=>[d("Add more conditions")]),_:1})]),_:1}),a(m,{outline:"",color:"red",icon:"delete",onClick:Q,disable:!r.value},{default:e(()=>[a(h,null,{default:e(()=>[d("Delete")]),_:1})]),_:1},8,["disable"])]),_:1})])]),s("div",se,[s("div",le,[a(J,{bordered:""},{default:e(()=>[c.value.length===0?D((p(),C(T,{key:0,class:"q-my-sm",clickable:"",tag:"label"},{default:e(()=>[f.value?(p(),C(v,{key:0},{default:e(()=>[d(" Data is loading, please wait. ")]),_:1})):(p(),C(v,{key:1},{default:e(()=>[d(" No Data Available ! ")]),_:1}))]),_:1})),[[O]]):(p(!0),N($,{key:1},L(c.value,(g,w)=>D((p(),C(T,{key:w,class:"q-my-sm",clickable:"",tag:"label"},{default:e(()=>[a(v,{side:"",top:""},{default:e(()=>[a(U,{modelValue:i.value,"onUpdate:modelValue":n[2]||(n[2]=I=>i.value=I),val:g.id},null,8,["modelValue","val"])]),_:2},1024),a(v,null,{default:e(()=>[a(S,null,{default:e(()=>[d(z(g.MCONDITION_DESCRIPTION),1)]),_:2},1024),a(S,{caption:"",lines:"1"},{default:e(()=>[d("Description")]),_:1})]),_:2},1024),a(v,{side:""},{default:e(()=>[a(m,{name:"delete",color:"red",outline:"",onClick:I=>t.onDeleteCondition(w)},null,8,["onClick"])]),_:2},1024)]),_:2},1024)),[[O]])),128))]),_:1})])])])])]))}};export{ce as default};
