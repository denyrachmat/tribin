import{s as c,o as T,B as b,R as V,I as a,E as s,D as n,P as C,aa as w,J as v,K as u,ba as x,aX as d,S as O,Q as p}from"./index.848c5e11.js";import{b as N,a as I}from"./use-dialog-plugin-component.f688655a.js";import{d as U}from"./date.d6bf290c.js";import{api_web as L}from"./axios.87174c21.js";import{_ as P}from"./serviceOprUpdateOrder.b40e4002.js";import"./QTooltip.44e687d8.js";import"./QBadge.3c695ede.js";const H={class:"q-pa-md"},Q={class:"row"},k={class:"col"},y={class:"q-pa-xs col-xs-12 col-sm-6 col-md-4"},F={class:"text-h5 text-bold"},M={class:"text-h6 text-bold"},G={class:"text-subtitle2"},A={class:"text-h6 text-bold"},B=a("div",{class:"text-subtitle2"},"Resolved Items",-1),E={class:"row"},K={class:"col"},Y=a("div",{class:"col text-right"},null,-1),ee={__name:"serviceOprView",setup($){const m=N();c([{name:"SRVH_DOCNO",label:"SPK No",field:"SRVH_DOCNO",sortable:!0,align:"left"},{name:"MCUS_CUSNM",label:"Customer Name",field:"MCUS_CUSNM",sortable:!0,align:"left"},{name:"resolve",label:"Resolved Line",sortable:!0,align:"left",field:e=>e.resolve.length},{name:"unresolve",label:"Unresolved Line",sortable:!0,align:"left",field:e=>e.unresolve.length},{name:"SRVH_ISSDT",label:"Submited Date",field:"SRVH_ISSDT",sortable:!0,align:"left"}]);const g=c([]),_=c(""),S=c(!1),D=c(null);T(()=>{h(),D.value=setInterval(()=>{h()},1e4)});const h=async()=>{S.value=!0,await L.post("servicesOPR/search",{searchBy:"",searchValue:_.value}).then(e=>{S.value=!1,g.value=e.data.data}).catch(e=>{S.value=!1})},R=(e,r)=>{const t={SRVH_DOCNO:e.SRVH_DOCNO,SRVH_ISSDT:U.formatDate(e.SRVH_ISSDT,"YYYY-MM-DD"),SRVH_CUSCD:e.MCUS_CUSCD};let o=[];e.detail.map(l=>{o.push({id:l.id,TSRVD_ITMCD:l.TSRVD_ITMCD,TSRVD_FLGSTS:l.TSRVD_FLGSTS,TSRVD_LINE:l.TSRVD_LINE,TSRVD_QTY:l.TSRVD_QTY,TSRVD_CUSTRMK:l.TSRVD_CUSTRMK,TSRVD_REMARK:l.TSRVD_REMARK,listFixDet:l.list_fix_det})}),m.dialog({component:P,componentProps:{header:t,detail:o,mode:r}}).onOk(async l=>{h()})},f=e=>{const r=e.detail.filter(i=>i.TSRVD_FLGSTS===0),t=e.detail.filter(i=>i.TSRVD_FLGSTS===1),o=e.detail.filter(i=>i.TSRVD_FLGSTS===2),l=e.detail.filter(i=>i.TSRVD_FLGSTS===3);if(r.length==e.detail.length)return{color:"red",label:"No Price Added yet !",icon:"edit"};if(t.length>0&&t.length<e.detail.length)return{color:"warning",label:"Please Add item & price",icon:"payments"};if(t.length>0&&t.length==e.detail.length)return{color:"green",label:"Added Price Done, Waiting Cust. Confirmation",icon:"price_check"};if(o.length>0&&o.length>=e.detail.length)return{color:"cyan",label:"Cust. has been approved, continue to fix.",icon:"engineering"};if(l.length>0&&l.length===e.detail.length)return{color:"primary",label:"Fix has been done",icon:"fact_check"}};return(e,r)=>(b(),V("div",H,[a("div",Q,[a("div",k,[s(I,{grid:"",flat:"",bordered:"","card-container-class":e.cardContainerClass,title:"Outstanding Order",rows:g.value,columns:e.columns,"row-key":"name",filter:_.value,"hide-header":"",pagination:{rowsPerPage:50},"rows-per-page-options":e.rowsPerPageOptions,loading:S.value},{"top-right":n(()=>[s(C,{borderless:"",dense:"",debounce:"300",modelValue:_.value,"onUpdate:modelValue":r[0]||(r[0]=t=>_.value=t),placeholder:"Search"},{append:n(()=>[s(w,{name:"search"})]),_:1},8,["modelValue"])]),item:n(t=>[a("div",y,[s(v,{flat:"",bordered:""},{default:n(()=>[s(u,{class:x(`text-center bg-${f(t.row).color} text-white`)},{default:n(()=>[a("div",F,d(t.row.SRVH_DOCNO),1),a("div",null,d(f(t.row).label),1)]),_:2},1032,["class"]),s(O),s(u,null,{default:n(()=>[a("div",M,d(t.row.MCUS_CUSNM),1),a("div",G,d(t.row.SRVH_ISSDT),1)]),_:2},1024),s(u,null,{default:n(()=>[a("div",A,d(t.row.resolve.length)+" of "+d(t.row.detail.length),1),B]),_:2},1024),s(u,null,{default:n(()=>[a("div",E,[a("div",K,[s(p,{label:t.row.detail.filter(o=>o.TSRVD_FLGSTS===1).length==t.row.detail.length?"Waiting Cust Approval":"Resolve",color:"primary",outline:"",onClick:o=>R(t.row,t.row.resolve.length==t.row.detail.length?"approve":"edit"),disable:t.row.detail.filter(o=>o.TSRVD_FLGSTS===1).length==t.row.detail.length},null,8,["label","onClick","disable"])]),Y])]),_:2},1024)]),_:2},1024)])]),_:1},8,["card-container-class","rows","columns","filter","rows-per-page-options","loading"])])])]))}};export{ee as default};
