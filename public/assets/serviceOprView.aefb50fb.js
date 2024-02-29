import{s as c,o as h,B as R,R as D,I as s,E as o,D as l,P as V,aa as C,J as v,K as _,aX as r,S as T,Q as b}from"./index.a68eece5.js";import{b as g,a as p}from"./use-dialog-plugin-component.833da5ca.js";import{d as w}from"./date.759f3e0a.js";import{api_web as O}from"./axios.edc4be66.js";import{_ as x}from"./serviceOprUpdateOrder.b462ae4a.js";import"./QTooltip.daca6b90.js";import"./QBadge.fec7cf51.js";const N={class:"q-pa-md"},I={class:"row"},U={class:"col"},H={class:"q-pa-xs col-xs-12 col-sm-6 col-md-4"},Q={class:"text-h5 text-bold"},M={class:"text-h6 text-bold"},P={class:"text-subtitle2"},k={class:"text-h6 text-bold"},y=s("div",{class:"text-subtitle2"},"Resolved Items",-1),B={class:"row"},E={class:"col"},K=s("div",{class:"col text-right"},null,-1),X={__name:"serviceOprView",setup(L){const m=g();c([{name:"SRVH_DOCNO",label:"SPK No",field:"SRVH_DOCNO",sortable:!0,align:"left"},{name:"MCUS_CUSNM",label:"Customer Name",field:"MCUS_CUSNM",sortable:!0,align:"left"},{name:"resolve",label:"Resolved Line",sortable:!0,align:"left",field:e=>e.resolve.length},{name:"unresolve",label:"Unresolved Line",sortable:!0,align:"left",field:e=>e.unresolve.length},{name:"SRVH_ISSDT",label:"Submited Date",field:"SRVH_ISSDT",sortable:!0,align:"left"}]);const S=c([]),n=c(""),i=c(!1);h(()=>{u()});const u=async()=>{i.value=!0,await O.post("servicesOPR/search",{searchBy:"",searchValue:n.value}).then(e=>{i.value=!1,S.value=e.data.data}).catch(e=>{i.value=!1})},f=e=>{const d={SRVH_DOCNO:e.SRVH_DOCNO,SRVH_ISSDT:w.formatDate(e.SRVH_ISSDT,"YYYY-MM-DD"),SRVH_CUSCD:e.MCUS_CUSCD};let t=[];e.detail.map(a=>{t.push({id:a.id,TSRVD_ITMCD:a.TSRVD_ITMCD,TSRVD_FLGSTS:a.TSRVD_FLGSTS,TSRVD_LINE:a.TSRVD_LINE,TSRVD_QTY:a.TSRVD_QTY,TSRVD_CUSTRMK:a.TSRVD_CUSTRMK,TSRVD_REMARK:a.TSRVD_REMARK,listFixDet:a.list_fix_det})}),m.dialog({component:x,componentProps:{header:d,detail:t}}).onOk(async a=>{u()})};return(e,d)=>(R(),D("div",N,[s("div",I,[s("div",U,[o(p,{grid:"",flat:"",bordered:"","card-container-class":e.cardContainerClass,title:"Outstanding Order",rows:S.value,columns:e.columns,"row-key":"name",filter:n.value,"hide-header":"",pagination:{rowsPerPage:50},"rows-per-page-options":e.rowsPerPageOptions,loading:i.value},{"top-right":l(()=>[o(V,{borderless:"",dense:"",debounce:"300",modelValue:n.value,"onUpdate:modelValue":d[0]||(d[0]=t=>n.value=t),placeholder:"Search"},{append:l(()=>[o(C,{name:"search"})]),_:1},8,["modelValue"])]),item:l(t=>[s("div",H,[o(v,{flat:"",bordered:""},{default:l(()=>[o(_,{class:"text-center bg-secondary text-white"},{default:l(()=>[s("div",Q,r(t.row.SRVH_DOCNO),1)]),_:2},1024),o(T),o(_,null,{default:l(()=>[s("div",M,r(t.row.MCUS_CUSNM),1),s("div",P,r(t.row.SRVH_ISSDT),1)]),_:2},1024),o(_,null,{default:l(()=>[s("div",k,r(t.row.resolve.length)+" of "+r(t.row.detail.length),1),y]),_:2},1024),o(_,null,{default:l(()=>[s("div",B,[s("div",E,[o(b,{label:"Resolve",color:"primary",outline:"",onClick:a=>f(t.row)},null,8,["onClick"])]),K])]),_:2},1024)]),_:2},1024)])]),_:1},8,["card-container-class","rows","columns","filter","rows-per-page-options","loading"])])])]))}};export{X as default};
