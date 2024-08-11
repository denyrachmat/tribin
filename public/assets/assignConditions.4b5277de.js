import{h as p,c as z,K as Y,L as J,t as h,o as V,C as _,D as b,E as e,F as t,M as W,O as $,J as r,P as N,R as S,S as x,T as U,U as Q,V as X,I as i,Q as m,W as R,X as Z,Y as q,Z as j,$ as ee,a0 as te}from"./index.47e6d248.js";import{Q as k}from"./QTooltip.e7ad09ef.js";import{Q as ae}from"./QBtnGroup.18e06438.js";import{Q as M,a as v,b as P}from"./QItemLabel.4a10ec21.js";import{Q as G}from"./QList.91870e15.js";import{u as H}from"./use-quasar.06bbb39a.js";import{u as F}from"./use-dialog-plugin-component.52fc6c4a.js";import{api as A,api_web as B}from"./axios.470586e0.js";import{_ as oe}from"./assignConditionsView.3dd39e7e.js";import"./format.0a4f001e.js";import"./QTable.7f1bf3c1.js";import"./QSelect.4ad6604a.js";const le=[p("g",{transform:"translate(20 50)"},[p("rect",{x:"-10",y:"-30",width:"20",height:"60",fill:"currentColor",opacity:"0.6"},[p("animateTransform",{attributeName:"transform",type:"scale",from:"2",to:"1",begin:"0s",repeatCount:"indefinite",dur:"1s",calcMode:"spline",keySplines:"0.1 0.9 0.4 1",keyTimes:"0;1",values:"2;1"})])]),p("g",{transform:"translate(50 50)"},[p("rect",{x:"-10",y:"-30",width:"20",height:"60",fill:"currentColor",opacity:"0.8"},[p("animateTransform",{attributeName:"transform",type:"scale",from:"2",to:"1",begin:"0.1s",repeatCount:"indefinite",dur:"1s",calcMode:"spline",keySplines:"0.1 0.9 0.4 1",keyTimes:"0;1",values:"2;1"})])]),p("g",{transform:"translate(80 50)"},[p("rect",{x:"-10",y:"-30",width:"20",height:"60",fill:"currentColor",opacity:"0.9"},[p("animateTransform",{attributeName:"transform",type:"scale",from:"2",to:"1",begin:"0.2s",repeatCount:"indefinite",dur:"1s",calcMode:"spline",keySplines:"0.1 0.9 0.4 1",keyTimes:"0;1",values:"2;1"})])])];var K=z({name:"QSpinnerFacebook",props:Y,setup(D){const{cSize:g,classes:u}=J(D);return()=>p("svg",{class:u.value,width:g.value,height:g.value,viewBox:"0 0 100 100",xmlns:"http://www.w3.org/2000/svg",preserveAspectRatio:"xMidYMid"},le)}});const ne=r("div",{class:"text-h6"},"Position Assign",-1),se={class:"text-h5"},ie={__name:"positionAssignCondition",props:{groups:String,listCond:Array},setup(D){const{dialogRef:g,onDialogHide:u,onDialogOK:c,onDialogCancel:w}=F(),f=H(),d=D,n=h([]);V(()=>{n.value=d.listCond,n.value=n.value.sort((o,s)=>o.MCONDITION_ORDER_NUMBER-s.MCONDITION_ORDER_NUMBER)});const I=o=>{O(n.value,o,o-1)},y=o=>{O(n.value,o,o+1)},O=(o,s,a)=>{let l=o[s];o[s]=o[a],o[a]=l},T=()=>{f.dialog({title:"Confirmation",message:"Do you want to save this group ?",cancel:!0,persistent:!0}).onOk(async()=>{f.loading.show({spinner:K,spinnerColor:"yellow",spinnerSize:140,backgroundColor:"purple",message:"Save your information, Hang on...",messageColor:"black"});const o=n.value.map(s=>s.id);await A.post("/master/conditions/assignGroup",{data:o,MCONDITION_RPT_STAT:d.groups}).then(async s=>{f.loading.hide(),c()}).catch(s=>{f.loading.hide()})})};return(o,s)=>(_(),b(j,{ref_key:"dialogRef",ref:g,onHide:q(u),"transition-show":"slide-up","transition-hide":"slide-down","full-width":""},{default:e(()=>[t(W,{class:"q-dialog-plugin bg-white q-pa-sm"},{default:e(()=>[t($,null,{default:e(()=>[ne]),_:1}),t($,{class:"q-pa-sm"},{default:e(()=>[r("span",se,N(d.groups),1),t(G,{bordered:""},{default:e(()=>[(_(!0),S(x,null,U(n.value,(a,l)=>Q((_(),b(M,{key:a.id,class:"q-my-sm",clickable:"",dense:""},{default:e(()=>[t(v,{avatar:""},{default:e(()=>[t(X,{color:"primary","text-color":"white"},{default:e(()=>[i(N(l+1),1)]),_:2},1024)]),_:2},1024),t(v,null,{default:e(()=>[t(P,null,{default:e(()=>[i(N(a.MCONDITION_DESCRIPTION),1)]),_:2},1024)]),_:2},1024),t(v,{side:""},{default:e(()=>[t(m,{icon:"arrow_upward",color:"green",flat:"",disable:l===0,onClick:C=>I(l)},{default:e(()=>[t(k,null,{default:e(()=>[i("Promote Positions")]),_:1})]),_:2},1032,["disable","onClick"])]),_:2},1024),t(v,{side:""},{default:e(()=>[t(m,{icon:"arrow_downward",color:"green",flat:"",disable:l===n.value.length-1,onClick:C=>y(l)},{default:e(()=>[t(k,null,{default:e(()=>[i("Demote Positions")]),_:1})]),_:2},1032,["disable","onClick"])]),_:2},1024)]),_:2},1024)),[[R]])),128))]),_:1})]),_:1}),t(Z,{align:"right"},{default:e(()=>[t(m,{label:"OK",color:"primary",onClick:s[0]||(s[0]=a=>T()),disable:o.loading,loading:o.loading},null,8,["disable","loading"]),t(m,{flat:"",label:"Cancel",color:"red",onClick:q(w),loading:o.loading},null,8,["onClick","loading"])]),_:1})]),_:1})]),_:1},8,["onHide"]))}};const re={class:"q-pa-md"},de=r("div",{class:"row"},[r("div",{class:"col"},[r("div",{class:"text-h6"},"Assign Condition Group")])],-1),ue={class:"row q-pt-md"},ce={class:"col"},pe={class:"row"},me={class:"col"},ge={class:"col text-right"},fe={class:"row q-pt-md"},_e={class:"col",style:{"max-height":"80vh",overflow:"auto"}},Se={__name:"assignConditions",setup(D){h([{name:"id",align:"left",label:"ID",field:"id",sortable:!0},{name:"MCONDITION_DESCRIPTION",align:"left",label:"Description",field:"MCONDITION_DESCRIPTION",sortable:!0}]);const g=h([]);h({sortBy:"desc",descending:!1,rowsPerPage:0});const u=h([]),c=h(""),w=h("new"),f=h(!1),d=H();F(),V(()=>{y()});const n=()=>{u.value=[],c.value="",w.value="new"},I=()=>{d.dialog({title:"Confirmation",message:"Are you sure want to delete this group ?",cancel:!0,persistent:!0}).onOk(async()=>{d.loading.show({spinner:K,spinnerColor:"yellow",spinnerSize:140,backgroundColor:"purple",message:"Save your information, Hang on...",messageColor:"black"}),await A.delete(`/master/conditions/deleteDataGroup/${btoa(c.value)}`).then(a=>{d.loading.hide(),n()})})},y=async()=>{f.value=!0,await A.get("/master/conditions/getdata").then(a=>{console.log(a),f.value=!1,g.value=a.data}).catch(a=>{f.value=!1})},O=()=>{d.dialog({component:oe}).onOk(async a=>{c.value=a.MCONDITION_RPT_STAT,u.value=a.group.map(l=>l.id),w.value="edit"})},T=()=>{d.dialog({component:ie,componentProps:{groups:c.value,listCond:g.value.filter(a=>u.value.includes(a.id))}}).onOk(async a=>{n()})},o=()=>{d.dialog({title:"Add Conditions",message:"Input conditions",prompt:{model:"",isValid:a=>a.length>2,type:"text"},cancel:!0,persistent:!0}).onOk(async a=>{await B.post("condition",{MCONDITION_DESCRIPTION:a,MCONDITION_ORDER_NUMBER:null}).then(async l=>{n(),await y()})})},s=a=>{d.dialog({title:"Confirmation",message:"Are you sure want to delete this data ?",cancel:!0,persistent:!0}).onOk(async()=>{await B.delete(`condition/${btoa(a)}`).then(async l=>{n(),await y()})})};return(a,l)=>(_(),S("div",re,[de,r("div",ue,[r("div",ce,[r("div",pe,[r("div",me,[t(ee,{label:"Group Name",outlined:"",dense:"",modelValue:c.value,"onUpdate:modelValue":l[0]||(l[0]=C=>c.value=C),disable:w.value==="edit"},{after:e(()=>[t(m,{dense:"",icon:"search",color:"blue",flat:"",onClick:O})]),_:1},8,["modelValue","disable"])]),r("div",ge,[t(ae,{outline:""},{default:e(()=>[t(m,{outline:"",color:"blue",icon:"description",onClick:n},{default:e(()=>[t(k,null,{default:e(()=>[i("New")]),_:1})]),_:1}),t(m,{outline:"",color:"blue",icon:"save",onClick:T,disable:!c.value||u.value.length===0},{default:e(()=>[t(k,null,{default:e(()=>[i("Save Conditions")]),_:1})]),_:1},8,["disable"]),t(m,{outline:"",color:"blue",icon:"add",onClick:l[1]||(l[1]=C=>o())},{default:e(()=>[t(k,null,{default:e(()=>[i("Add more conditions")]),_:1})]),_:1}),t(m,{outline:"",color:"red",icon:"delete",onClick:I,disable:!c.value},{default:e(()=>[t(k,null,{default:e(()=>[i("Delete")]),_:1})]),_:1},8,["disable"])]),_:1})])]),r("div",fe,[r("div",_e,[t(G,{bordered:""},{default:e(()=>[g.value.length===0?Q((_(),b(M,{key:0,class:"q-my-sm",clickable:"",tag:"label"},{default:e(()=>[f.value?(_(),b(v,{key:0},{default:e(()=>[i(" Data is loading, please wait. ")]),_:1})):(_(),b(v,{key:1},{default:e(()=>[i(" No Data Available ! ")]),_:1}))]),_:1})),[[R]]):(_(!0),S(x,{key:1},U(g.value,(C,L)=>Q((_(),b(M,{key:L,class:"q-my-sm",clickable:"",tag:"label"},{default:e(()=>[t(v,{side:"",top:""},{default:e(()=>[t(te,{modelValue:u.value,"onUpdate:modelValue":l[2]||(l[2]=E=>u.value=E),val:C.id},null,8,["modelValue","val"])]),_:2},1024),t(v,null,{default:e(()=>[t(P,null,{default:e(()=>[i(N(C.MCONDITION_DESCRIPTION),1)]),_:2},1024),t(P,{caption:"",lines:"1"},{default:e(()=>[i("Description")]),_:1})]),_:2},1024),t(v,{side:""},{default:e(()=>[t(m,{icon:"delete",color:"red",outline:"",onClick:E=>s(C.id)},null,8,["onClick"])]),_:2},1024)]),_:2},1024)),[[R]])),128))]),_:1})])])])])]))}};export{Se as default};
