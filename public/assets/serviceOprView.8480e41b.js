import{s as c,B as S,C as w,D as a,E as e,J as M,K as m,I as t,Q as O,R as y,aU as x,aV as H,aW as Q,aZ as N,H as _,aX as i,P,ap as q,M as A,O as F,o as $,aa as W,S as X}from"./index.ecfd84e2.js";import{u as Y,b as U,Q as L,j as B,k as f,l as b,c as Z,a as z}from"./use-dialog-plugin-component.79d1af68.js";import{d as K}from"./date.2efdd61c.js";import{api_web as E}from"./axios.293225ae.js";import{Q as k}from"./QTooltip.0082059f.js";const G={class:"row"},ee=t("div",{class:"col"},[t("div",{class:"text-h6"},"Update Used Item")],-1),ae={class:"col text-right"},le={__name:"serviceOprItemAdd",props:{dataItem:Array},setup(I){const{dialogRef:V,onDialogHide:h,onDialogOK:v,onDialogCancel:D}=Y();U();const g=I,r=c([]),l=c([]),s=c(!1),o=()=>{r.value.push({TSRVD_ID:g.dataItem.id,TSRVF_ITMCD:"",TSRVF_PRC:0})},n=(d,u,p,T)=>{u(async()=>{T==="item"&&await C(d)})},C=async d=>{s.value=!0,await E.post("item/searchAPITBL",{searchValue:d}).then(u=>{s.value=!1,r.value=u.data.data}).catch(()=>{s.value=!1})};return(d,u)=>(S(),w(F,{ref_key:"dialogRef",ref:V,onHide:A(h),"transition-show":"slide-up","transition-hide":"slide-down","full-width":""},{default:a(()=>[e(M,{class:"q-dialog-plugin bg-white q-pa-sm"},{default:a(()=>[e(m,null,{default:a(()=>[t("div",G,[ee,t("div",ae,[e(O,{icon:"add",outline:"",color:"blue",onClick:o})])])]),_:1}),e(m,{class:"q-pa-sm",style:{"max-height":"50vh"}},{default:a(()=>[e(L,{bordered:""},{default:a(()=>[(S(!0),y(x,null,H(r.value,(p,T)=>Q((S(),w(B,{key:T,class:"q-my-sm",clickable:""},{default:a(()=>[e(f,{avatar:""},{default:a(()=>[e(N,{color:"primary","text-color":"white"},{default:a(()=>[_(i(T+1),1)]),_:2},1024)]),_:2},1024),e(f,null,{default:a(()=>[e(b,null,{default:a(()=>[e(Z,{dense:"",filled:"",label:"Item Name",modelValue:p.TSRVF_ITMCD,"onUpdate:modelValue":R=>p.TSRVF_ITMCD=R,"use-input":"","input-debounce":"500",options:l.value,onFilter:u[0]||(u[0]=(R,j,J)=>n(R,j,J,"item")),behavior:"dialog","option-label":"MITM_ITMNM","option-value":"MITM_ITMCD","emit-value":"","map-options":"",loading:s.value},null,8,["modelValue","onUpdate:modelValue","options","loading"])]),_:2},1024)]),_:2},1024),e(f,null,{default:a(()=>[e(P,{label:"Price",modelValue:p.TSRVF_PRC,"onUpdate:modelValue":R=>p.TSRVF_PRC=R,filled:"",dense:""},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1024)]),_:2},1024)),[[q]])),128))]),_:1})]),_:1})]),_:1})]),_:1},8,["onHide"]))}},te={class:"text-h6"},oe={__name:"serviceOprUpdateOrder",props:{header:Array,detail:Array},setup(I){const{dialogRef:V,onDialogHide:h,onDialogOK:v,onDialogCancel:D}=Y(),g=U(),r=I,l=c({SRVH_DOCNO:"",SRVH_ISSDT:K.formatDate(Date.now(),"YYYY-MM-DD"),SRVH_CUSCD:""}),s=c([]);$(async()=>{r.header&&(l.value=r.header,s.value=r.detail)});const o=n=>{g.dialog({component:le,componentProps:{dataItem:n}}).onOk(async C=>{console.log(C)})};return(n,C)=>(S(),w(F,{ref_key:"dialogRef",ref:V,onHide:A(h),"transition-show":"slide-up","transition-hide":"slide-down","full-width":""},{default:a(()=>[e(M,{class:"q-dialog-plugin bg-white q-pa-sm"},{default:a(()=>[e(m,null,{default:a(()=>[t("div",te,"Update Order "+i(l.value.SRVH_DOCNO),1)]),_:1}),e(m,{class:"q-pa-sm"},{default:a(()=>[e(L,{bordered:""},{default:a(()=>[(S(!0),y(x,null,H(s.value,(d,u)=>Q((S(),w(B,{key:u,class:"q-my-sm",clickable:""},{default:a(()=>[e(f,{avatar:""},{default:a(()=>[e(N,{color:"primary","text-color":"white"},{default:a(()=>[_(i(d.TSRVD_LINE),1)]),_:2},1024)]),_:2},1024),e(f,null,{default:a(()=>[e(b,null,{default:a(()=>[_(i(d.TSRVD_ITMCD),1)]),_:2},1024),e(b,{caption:"",lines:"1"},{default:a(()=>[_("Item")]),_:1})]),_:2},1024),e(f,null,{default:a(()=>[e(b,null,{default:a(()=>[_(i(d.TSRVD_CUSTRMK),1)]),_:2},1024),e(b,{caption:"",lines:"1"},{default:a(()=>[_("Customer Remarks")]),_:1})]),_:2},1024),e(f,{side:""},{default:a(()=>[e(O,{icon:"construction",color:"green",flat:"",onClick:p=>o(d)},{default:a(()=>[e(k,null,{default:a(()=>[_("Update Fix Data")]),_:1})]),_:2},1032,["onClick"])]),_:2},1024),e(f,{side:""},{default:a(()=>[e(O,{icon:"visibility",color:"cyan",flat:"",onClick:C[0]||(C[0]=p=>n.viewAddedItem()),disable:!d.listFixDet},{default:a(()=>[e(k,null,{default:a(()=>[_("View Added Item")]),_:1})]),_:2},1032,["disable"])]),_:2},1024)]),_:2},1024)),[[q]])),128))]),_:1})]),_:1})]),_:1})]),_:1},8,["onHide"]))}},se={class:"q-pa-md"},ne={class:"row"},de={class:"col"},ie={class:"q-pa-xs col-xs-12 col-sm-6 col-md-4"},re={class:"text-h5 text-bold"},ce={class:"text-h6 text-bold"},ue={class:"text-subtitle2"},_e={class:"text-h6 text-bold"},fe=t("div",{class:"text-subtitle2"},"Resolved Items",-1),me={class:"row"},pe={class:"col"},Se=t("div",{class:"col text-right"},null,-1),Ve={__name:"serviceOprView",setup(I){const V=U();c([{name:"SRVH_DOCNO",label:"SPK No",field:"SRVH_DOCNO",sortable:!0,align:"left"},{name:"MCUS_CUSNM",label:"Customer Name",field:"MCUS_CUSNM",sortable:!0,align:"left"},{name:"resolve",label:"Resolved Line",sortable:!0,align:"left",field:l=>l.resolve.length},{name:"unresolve",label:"Unresolved Line",sortable:!0,align:"left",field:l=>l.unresolve.length},{name:"SRVH_ISSDT",label:"Submited Date",field:"SRVH_ISSDT",sortable:!0,align:"left"}]);const h=c([]),v=c(""),D=c(!1);$(()=>{g()});const g=async()=>{D.value=!0,await E.post("servicesOPR/search",{searchBy:"",searchValue:v.value}).then(l=>{D.value=!1,h.value=l.data.data}).catch(l=>{D.value=!1})},r=l=>{const s={SRVH_DOCNO:l.SRVH_DOCNO,SRVH_ISSDT:K.formatDate(l.SRVH_ISSDT,"YYYY-MM-DD"),SRVH_CUSCD:l.MCUS_CUSCD};let o=[];l.detail.map(n=>{o.push({TSRVD_ITMCD:n.TSRVD_ITMCD,TSRVD_LINE:n.TSRVD_LINE,TSRVD_QTY:n.TSRVD_QTY,TSRVD_CUSTRMK:n.TSRVD_CUSTRMK})}),V.dialog({component:oe,componentProps:{header:s,detail:o}}).onOk(async n=>{g()})};return(l,s)=>(S(),y("div",se,[t("div",ne,[t("div",de,[e(z,{grid:"",flat:"",bordered:"","card-container-class":l.cardContainerClass,title:"Outstanding Order",rows:h.value,columns:l.columns,"row-key":"name",filter:v.value,"hide-header":"",pagination:{rowsPerPage:50},"rows-per-page-options":l.rowsPerPageOptions,loading:D.value},{"top-right":a(()=>[e(P,{borderless:"",dense:"",debounce:"300",modelValue:v.value,"onUpdate:modelValue":s[0]||(s[0]=o=>v.value=o),placeholder:"Search"},{append:a(()=>[e(W,{name:"search"})]),_:1},8,["modelValue"])]),item:a(o=>[t("div",ie,[e(M,{flat:"",bordered:""},{default:a(()=>[e(m,{class:"text-center bg-secondary text-white"},{default:a(()=>[t("div",re,i(o.row.SRVH_DOCNO),1)]),_:2},1024),e(X),e(m,null,{default:a(()=>[t("div",ce,i(o.row.MCUS_CUSNM),1),t("div",ue,i(o.row.SRVH_ISSDT),1)]),_:2},1024),e(m,null,{default:a(()=>[t("div",_e,i(o.row.resolve.length)+" of "+i(o.row.unresolve.length),1),fe]),_:2},1024),e(m,null,{default:a(()=>[t("div",me,[t("div",pe,[e(O,{label:"Resolve",color:"primary",outline:"",onClick:n=>r(o.row)},null,8,["onClick"])]),Se])]),_:2},1024)]),_:2},1024)])]),_:1},8,["card-container-class","rows","columns","filter","rows-per-page-options","loading"])])])]))}};export{Ve as default};
