import{h as p,c as F,J as Y,K as J,s as h,o as V,B as _,C as b,D as e,E as a,L as W,M as $,I as r,O as N,P as S,R as x,S as H,T as Q,U as X,H as i,Q as m,V as R,W as Z,X as B,Y as j,Z as ee,$ as ae}from"./index.610d82f9.js";import{Q as k}from"./QTooltip.a9466050.js";import{Q as te}from"./QBtnGroup.f3ef46ed.js";import{u as U,a as G,Q as K,b as M,c as v,d as P}from"./QTable.cad84299.js";import{api as A,api_web as q}from"./axios.65d3993c.js";import{_ as oe}from"./assignConditionsView.55be74a5.js";const le=[p("g",{transform:"translate(20 50)"},[p("rect",{x:"-10",y:"-30",width:"20",height:"60",fill:"currentColor",opacity:"0.6"},[p("animateTransform",{attributeName:"transform",type:"scale",from:"2",to:"1",begin:"0s",repeatCount:"indefinite",dur:"1s",calcMode:"spline",keySplines:"0.1 0.9 0.4 1",keyTimes:"0;1",values:"2;1"})])]),p("g",{transform:"translate(50 50)"},[p("rect",{x:"-10",y:"-30",width:"20",height:"60",fill:"currentColor",opacity:"0.8"},[p("animateTransform",{attributeName:"transform",type:"scale",from:"2",to:"1",begin:"0.1s",repeatCount:"indefinite",dur:"1s",calcMode:"spline",keySplines:"0.1 0.9 0.4 1",keyTimes:"0;1",values:"2;1"})])]),p("g",{transform:"translate(80 50)"},[p("rect",{x:"-10",y:"-30",width:"20",height:"60",fill:"currentColor",opacity:"0.9"},[p("animateTransform",{attributeName:"transform",type:"scale",from:"2",to:"1",begin:"0.2s",repeatCount:"indefinite",dur:"1s",calcMode:"spline",keySplines:"0.1 0.9 0.4 1",keyTimes:"0;1",values:"2;1"})])])];var L=F({name:"QSpinnerFacebook",props:Y,setup(D){const{cSize:g,classes:u}=J(D);return()=>p("svg",{class:u.value,width:g.value,height:g.value,viewBox:"0 0 100 100",xmlns:"http://www.w3.org/2000/svg",preserveAspectRatio:"xMidYMid"},le)}});const ne=r("div",{class:"text-h6"},"Position Assign",-1),se={class:"text-h5"},ie={__name:"positionAssignCondition",props:{groups:String,listCond:Array},setup(D){const{dialogRef:g,onDialogHide:u,onDialogOK:c,onDialogCancel:w}=U(),f=G(),d=D,n=h([]);V(()=>{n.value=d.listCond,n.value=n.value.sort((o,s)=>o.MCONDITION_ORDER_NUMBER-s.MCONDITION_ORDER_NUMBER)});const I=o=>{O(n.value,o,o-1)},y=o=>{O(n.value,o,o+1)},O=(o,s,t)=>{let l=o[s];o[s]=o[t],o[t]=l},T=()=>{f.dialog({title:"Confirmation",message:"Do you want to save this group ?",cancel:!0,persistent:!0}).onOk(async()=>{f.loading.show({spinner:L,spinnerColor:"yellow",spinnerSize:140,backgroundColor:"purple",message:"Save your information, Hang on...",messageColor:"black"});const o=n.value.map(s=>s.id);await A.post("/master/conditions/assignGroup",{data:o,MCONDITION_RPT_STAT:d.groups}).then(async s=>{f.loading.hide(),c()}).catch(s=>{f.loading.hide()})})};return(o,s)=>(_(),b(j,{ref_key:"dialogRef",ref:g,onHide:B(u),"transition-show":"slide-up","transition-hide":"slide-down","full-width":""},{default:e(()=>[a(W,{class:"q-dialog-plugin bg-white q-pa-sm"},{default:e(()=>[a($,null,{default:e(()=>[ne]),_:1}),a($,{class:"q-pa-sm"},{default:e(()=>[r("span",se,N(d.groups),1),a(K,{bordered:""},{default:e(()=>[(_(!0),S(x,null,H(n.value,(t,l)=>Q((_(),b(M,{key:t.id,class:"q-my-sm",clickable:"",dense:""},{default:e(()=>[a(v,{avatar:""},{default:e(()=>[a(X,{color:"primary","text-color":"white"},{default:e(()=>[i(N(l+1),1)]),_:2},1024)]),_:2},1024),a(v,null,{default:e(()=>[a(P,null,{default:e(()=>[i(N(t.MCONDITION_DESCRIPTION),1)]),_:2},1024)]),_:2},1024),a(v,{side:""},{default:e(()=>[a(m,{icon:"arrow_upward",color:"green",flat:"",disable:l===0,onClick:C=>I(l)},{default:e(()=>[a(k,null,{default:e(()=>[i("Promote Positions")]),_:1})]),_:2},1032,["disable","onClick"])]),_:2},1024),a(v,{side:""},{default:e(()=>[a(m,{icon:"arrow_downward",color:"green",flat:"",disable:l===n.value.length-1,onClick:C=>y(l)},{default:e(()=>[a(k,null,{default:e(()=>[i("Demote Positions")]),_:1})]),_:2},1032,["disable","onClick"])]),_:2},1024)]),_:2},1024)),[[R]])),128))]),_:1})]),_:1}),a(Z,{align:"right"},{default:e(()=>[a(m,{label:"OK",color:"primary",onClick:s[0]||(s[0]=t=>T()),disable:o.loading,loading:o.loading},null,8,["disable","loading"]),a(m,{flat:"",label:"Cancel",color:"red",onClick:B(w),loading:o.loading},null,8,["onClick","loading"])]),_:1})]),_:1})]),_:1},8,["onHide"]))}};const re={class:"q-pa-md"},de=r("div",{class:"row"},[r("div",{class:"col"},[r("div",{class:"text-h6"},"Assign Condition Group")])],-1),ue={class:"row q-pt-md"},ce={class:"col"},pe={class:"row"},me={class:"col"},ge={class:"col text-right"},fe={class:"row q-pt-md"},_e={class:"col",style:{"max-height":"80vh",overflow:"auto"}},ye={__name:"assignConditions",setup(D){h([{name:"id",align:"left",label:"ID",field:"id",sortable:!0},{name:"MCONDITION_DESCRIPTION",align:"left",label:"Description",field:"MCONDITION_DESCRIPTION",sortable:!0}]);const g=h([]);h({sortBy:"desc",descending:!1,rowsPerPage:0});const u=h([]),c=h(""),w=h("new"),f=h(!1),d=G();U(),V(()=>{y()});const n=()=>{u.value=[],c.value="",w.value="new"},I=()=>{d.dialog({title:"Confirmation",message:"Are you sure want to delete this group ?",cancel:!0,persistent:!0}).onOk(async()=>{d.loading.show({spinner:L,spinnerColor:"yellow",spinnerSize:140,backgroundColor:"purple",message:"Save your information, Hang on...",messageColor:"black"}),await A.delete(`/master/conditions/deleteDataGroup/${btoa(c.value)}`).then(t=>{d.loading.hide(),n()})})},y=async()=>{f.value=!0,await A.get("/master/conditions/getdata").then(t=>{console.log(t),f.value=!1,g.value=t.data}).catch(t=>{f.value=!1})},O=()=>{d.dialog({component:oe}).onOk(async t=>{c.value=t.MCONDITION_RPT_STAT,u.value=t.group.map(l=>l.id),w.value="edit"})},T=()=>{d.dialog({component:ie,componentProps:{groups:c.value,listCond:g.value.filter(t=>u.value.includes(t.id))}}).onOk(async t=>{n()})},o=()=>{d.dialog({title:"Add Conditions",message:"Input conditions",prompt:{model:"",isValid:t=>t.length>2,type:"text"},cancel:!0,persistent:!0}).onOk(async t=>{await q.post("condition",{MCONDITION_DESCRIPTION:t,MCONDITION_ORDER_NUMBER:null}).then(async l=>{n(),await y()})})},s=t=>{d.dialog({title:"Confirmation",message:"Are you sure want to delete this data ?",cancel:!0,persistent:!0}).onOk(async()=>{await q.delete(`condition/${btoa(t)}`).then(async l=>{n(),await y()})})};return(t,l)=>(_(),S("div",re,[de,r("div",ue,[r("div",ce,[r("div",pe,[r("div",me,[a(ee,{label:"Group Name",outlined:"",dense:"",modelValue:c.value,"onUpdate:modelValue":l[0]||(l[0]=C=>c.value=C),disable:w.value==="edit"},{after:e(()=>[a(m,{dense:"",icon:"search",color:"blue",flat:"",onClick:O})]),_:1},8,["modelValue","disable"])]),r("div",ge,[a(te,{outline:""},{default:e(()=>[a(m,{outline:"",color:"blue",icon:"description",onClick:n},{default:e(()=>[a(k,null,{default:e(()=>[i("New")]),_:1})]),_:1}),a(m,{outline:"",color:"blue",icon:"save",onClick:T,disable:!c.value||u.value.length===0},{default:e(()=>[a(k,null,{default:e(()=>[i("Save Conditions")]),_:1})]),_:1},8,["disable"]),a(m,{outline:"",color:"blue",icon:"add",onClick:l[1]||(l[1]=C=>o())},{default:e(()=>[a(k,null,{default:e(()=>[i("Add more conditions")]),_:1})]),_:1}),a(m,{outline:"",color:"red",icon:"delete",onClick:I,disable:!c.value},{default:e(()=>[a(k,null,{default:e(()=>[i("Delete")]),_:1})]),_:1},8,["disable"])]),_:1})])]),r("div",fe,[r("div",_e,[a(K,{bordered:""},{default:e(()=>[g.value.length===0?Q((_(),b(M,{key:0,class:"q-my-sm",clickable:"",tag:"label"},{default:e(()=>[f.value?(_(),b(v,{key:0},{default:e(()=>[i(" Data is loading, please wait. ")]),_:1})):(_(),b(v,{key:1},{default:e(()=>[i(" No Data Available ! ")]),_:1}))]),_:1})),[[R]]):(_(!0),S(x,{key:1},H(g.value,(C,z)=>Q((_(),b(M,{key:z,class:"q-my-sm",clickable:"",tag:"label"},{default:e(()=>[a(v,{side:"",top:""},{default:e(()=>[a(ae,{modelValue:u.value,"onUpdate:modelValue":l[2]||(l[2]=E=>u.value=E),val:C.id},null,8,["modelValue","val"])]),_:2},1024),a(v,null,{default:e(()=>[a(P,null,{default:e(()=>[i(N(C.MCONDITION_DESCRIPTION),1)]),_:2},1024),a(P,{caption:"",lines:"1"},{default:e(()=>[i("Description")]),_:1})]),_:2},1024),a(v,{side:""},{default:e(()=>[a(m,{icon:"delete",color:"red",outline:"",onClick:E=>s(C.id)},null,8,["onClick"])]),_:2},1024)]),_:2},1024)),[[R]])),128))]),_:1})])])])])]))}};export{ye as default};
