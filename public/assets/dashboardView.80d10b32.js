import{s as _,o as x,B as s,C as v,D as e,E as t,J as D,K as f,R as p,aY as C,aZ as T,a_ as L,H as k,a$ as c,ap as H,b0 as V,L as N,Q as A,M as q,O as R,I as l,P as K,aa as O,S as U,b4 as J}from"./index.5dbaa5a6.js";import{u as E,b as I,Q as z,l as G,m as j,n as Q,a as M,o as F}from"./use-dialog-plugin-component.50542f75.js";import{d as Y,Q as S,b as Z}from"./date.b5f44740.js";import{api_web as B}from"./axios.0095c5f3.js";const W=l("div",{class:"text-h6"},"Review Item List",-1),X={__name:"viewListApprovalItem",props:{cd:String,typeCD:String},setup(P){const{dialogRef:y,onDialogHide:m,onDialogOK:w,onDialogCancel:g}=E();I();const r=P,h=_(!1),b=_([]);x(()=>{d()});const d=async()=>{await B.get(`${r.typeCD}/${btoa(r.cd)}`).then(u=>{h.value=!1,b.value=u.data}).catch(u=>{h.value=!1})};return(u,o)=>(s(),v(R,{ref_key:"dialogRef",ref:y,onHide:q(m),"transition-show":"slide-up","transition-hide":"slide-down","full-width":"",persistent:""},{default:e(()=>[t(D,{class:"q-dialog-plugin bg-white q-pa-sm"},{default:e(()=>[t(f,null,{default:e(()=>[W]),_:1}),t(f,{class:"q-pa-sm",style:{height:"70vh",overflow:"auto"}},{default:e(()=>[r.typeCD==="quotation"?(s(),v(z,{key:0,dark:"",bordered:"",separator:""},{default:e(()=>[(s(!0),p(C,null,T(b.value.dataItem,(a,i)=>L((s(),v(G,{clickable:"",key:i},{default:e(()=>[t(j,null,{default:e(()=>[t(Q,null,{default:e(()=>[k(c(a.MITM_ITMNM),1)]),_:2},1024),t(Q,{caption:""},{default:e(()=>[k("Item Name")]),_:1})]),_:2},1024)]),_:2},1024)),[[H]])),128))]),_:1})):V("",!0)]),_:1}),t(N,{align:"center"},{default:e(()=>[t(A,{label:"OK",color:"primary",onClick:o[0]||(o[0]=a=>q(w)()),disable:u.stateSubmit},null,8,["disable"])]),_:1})]),_:1})]),_:1},8,["onHide"]))}},ee=l("div",{class:"text-h6"},"Approval List",-1),te={class:"q-pa-xs col-xs-12 col-sm-6 col-md-4"},ae={class:"text-h5 text-bold"},oe={class:"text-h6 text-bold"},le={class:"text-subtitle2"},se={class:"row"},ne={class:"col"},ie={class:"col text-right"},re={__name:"viewListApproval",props:{listApprv:Array,typeAPI:String},setup(P){const y=I(),m=P,w=_([{name:"APP_CD",label:"Doc Code",field:"APP_CD"},{name:"APP_CUSNM",label:"Customer",field:"APP_CUSNM"},{name:"APP_SBJCT",label:"Subject",field:"APP_SBJCT"},{name:"APP_ATTN",label:"Attn",field:"APP_ATTN"},{name:"CREATED_AT",label:"Created Date",field:"CREATED_AT"}]),g=_(""),r=(a,i="days")=>{const n=new Date,$=new Date(a);return Y.getDateDiff(n,$,i)},h=a=>{const i="";m.typeAPI=="quot"?i="quotation":m.typeAPI=="pr"?i="purchase-request-approval":m.typeAPI=="po"&&(i="purchase-order/approval-document"),y.dialog({component:X,componentProps:{cd:a,typeCD:i}}).onOk(async n=>{quotationGroupConditions.value=n.MCONDITION_RPT_STAT,quotationConditions.value=n.group})},{dialogRef:b,onDialogHide:d,onDialogOK:u,onDialogCancel:o}=E();return(a,i)=>(s(),v(R,{ref_key:"dialogRef",ref:b,onHide:q(d),"transition-show":"slide-up","transition-hide":"slide-down","full-width":"",persistent:""},{default:e(()=>[t(D,{class:"q-dialog-plugin bg-white q-pa-sm"},{default:e(()=>[t(f,null,{default:e(()=>[ee]),_:1}),t(f,{class:"q-pa-sm",style:{height:"70vh",overflow:"auto"}},{default:e(()=>[t(M,{grid:"",flat:"",bordered:"","card-container-class":a.cardContainerClass,title:"Outstanding Approval",rows:m.listApprv,columns:w.value,"row-key":"name",filter:g.value,"hide-header":"",pagination:{rowsPerPage:50},"rows-per-page-options":a.rowsPerPageOptions},{"top-right":e(()=>[t(K,{borderless:"",dense:"",debounce:"300",modelValue:g.value,"onUpdate:modelValue":i[0]||(i[0]=n=>g.value=n),placeholder:"Search"},{append:e(()=>[t(O,{name:"search"})]),_:1},8,["modelValue"])]),item:e(n=>[l("div",te,[t(D,{flat:"",bordered:""},{default:e(()=>[t(f,{class:"text-center bg-secondary text-white"},{default:e(()=>[l("div",ae,c(n.row.APP_CUSNM),1)]),_:2},1024),t(U),t(f,null,{default:e(()=>[l("div",oe,c(n.row.APP_CD),1),l("div",le,c(n.row.APP_SBJCT),1)]),_:2},1024),t(f,null,{default:e(()=>[l("div",se,[l("div",ne,[t(A,{label:"Preview",color:"primary",outline:"",onClick:$=>h(n.row.APP_CD)},null,8,["onClick"])]),l("div",ie,c(r(n.row.CREATED_AT)<30?`${r(n.row.CREATED_AT)} Days Ago`:`${r(n.row.CREATED_AT,"months")} Month ago`),1)])]),_:2},1024)]),_:2},1024)])]),_:1},8,["card-container-class","rows","columns","filter","rows-per-page-options"])]),_:1}),t(N,{align:"right"},{default:e(()=>[t(A,{label:"OK",color:"primary",onClick:i[1]||(i[1]=n=>q(u)()),disable:a.stateSubmit},null,8,["disable"])]),_:1})]),_:1})]),_:1},8,["onHide"]))}},ce={class:"q-pa-md bg-grey-5 window-height"},de={class:"row"},ue={class:"row"},pe={class:"col"},_e={class:"text-h3 text-cyan"},me={class:"text-subtitle2 text-cyan"},fe={class:"col text-right"},ge={class:"row q-pa-sm"},he={class:"col"},ve={key:1},Pe={__name:"dashboardView",setup(P){const y=I(),m=_([{total:900,title:"Total Sales",icon:"shopping_cart",color:"cyan"},{total:900,title:"Total Purchase",icon:"shopping_bag",color:"cyan"},{total:900,title:"Total Profit",icon:"payments",color:"cyan"},{total:15,title:"Total Customer",icon:"group",color:"cyan"},{total:15,title:"Total Customer",icon:"group",color:"cyan"},{total:15,title:"Total Customer",icon:"group",color:"cyan"},{total:15,title:"Total Customer",icon:"group",color:"cyan"},{total:15,title:"Total Customer",icon:"group",color:"cyan"}]),w=_([{name:"name",label:"Business",field:"name",sortable:!0,align:"left"},{name:"quot",label:"Quotation",field:"quot_count",sortable:!0,align:"center"},{name:"pr",label:"Purchase Request",field:"pr_count",sortable:!0,align:"center"},{name:"po",label:"Purchase Order",field:"po_count",sortable:!0,align:"center"}]),g=_([]),r=_(!1);_(null),x(async()=>{await h()});const h=async()=>{r.value=!0,await B.get("/approval/notificationsAPI/top-user").then(d=>{r.value=!1,g.value=d.data}).catch(d=>{r.value=!1})},b=(d,u)=>{y.dialog({component:re,componentProps:{listApprv:d,typeAPI:u}}).onOk(async o=>{quotationGroupConditions.value=o.MCONDITION_RPT_STAT,quotationConditions.value=o.group})};return(d,u)=>(s(),p("div",ce,[l("div",de,[(s(!0),p(C,null,T(m.value,(o,a)=>(s(),p("div",{class:J("col-3 q-pa-sm"),key:a},[t(D,null,{default:e(()=>[t(f,null,{default:e(()=>[l("div",ue,[l("div",pe,[l("div",_e,c(o.total),1),l("div",me,c(o.title),1)]),l("div",fe,[t(O,{name:o.icon,size:"4.4em",color:o.color},null,8,["name","color"])])])]),_:2},1024)]),_:2},1024)]))),128))]),l("div",ge,[l("div",he,[t(M,{flat:"",bordered:"",title:"Approval List",rows:g.value,columns:w.value,"row-key":"name",loading:r.value},{"top-right":e(()=>[t(A,{flat:"",icon:"refresh",color:"cyan",onClick:h})]),header:e(o=>[t(S,{props:o},{default:e(()=>[(s(!0),p(C,null,T(o.cols,a=>(s(),v(F,{key:a.name,props:o},{default:e(()=>[k(c(a.label),1)]),_:2},1032,["props"]))),128))]),_:2},1032,["props"])]),body:e(o=>[t(S,{props:o},{default:e(()=>[(s(!0),p(C,null,T(o.cols,a=>(s(),v(Z,{key:a.name,props:o},{default:e(()=>[a.name==="quot"||a.name==="pr"||a.name==="po"||a.name==="spk"?(s(),p(C,{key:0},[a.value>0?(s(),v(A,{key:0,flat:"",color:"blue",onClick:i=>b(o.row[a.name.split("_")[0]],a.name)},{default:e(()=>[l("b",null,c(a.value),1)]),_:2},1032,["onClick"])):(s(),p("span",ve,c(a.value),1))],64)):(s(),p(C,{key:1},[k(c(a.value),1)],64))]),_:2},1032,["props"]))),128))]),_:2},1032,["props"])]),_:1},8,["rows","columns","loading"])])])]))}};export{Pe as default};
