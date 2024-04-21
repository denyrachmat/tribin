import{s as c,o as V,B as b,P as w,I as o,E as n,D as s,Z as C,am as v,L as O,M as u,bc as x,O as d,aX as L,Q as N}from"./index.bb2e070d.js";import{a as p,k as F}from"./QTable.b3725c53.js";import{d as I}from"./date.3d6baee7.js";import{api_web as M}from"./axios.70ba37e9.js";import{_ as U}from"./serviceOprUpdateOrder.a7a75091.js";import"./QBtnGroup.b3464b69.js";import"./QTooltip.e31f3b03.js";import"./QBadge.98fb1197.js";const k={class:"q-pa-md"},P={class:"row"},G={class:"col"},H={class:"q-pa-xs col-xs-12 col-sm-6 col-md-4"},Q={class:"text-h5 text-bold"},y={class:"text-h6 text-bold"},A={class:"text-subtitle2"},B={class:"text-h6 text-bold"},E=o("div",{class:"text-subtitle2"},"Resolved Items",-1),Y={class:"row"},K={class:"col"},W=o("div",{class:"col text-right"},null,-1),le={__name:"serviceOprView",setup($){const T=p();c([{name:"SRVH_DOCNO",label:"SPK No",field:"SRVH_DOCNO",sortable:!0,align:"left"},{name:"MCUS_CUSNM",label:"Customer Name",field:"MCUS_CUSNM",sortable:!0,align:"left"},{name:"resolve",label:"Resolved Line",sortable:!0,align:"left",field:e=>e.resolve.length},{name:"unresolve",label:"Unresolved Line",sortable:!0,align:"left",field:e=>e.unresolve.length},{name:"SRVH_ISSDT",label:"Submited Date",field:"SRVH_ISSDT",sortable:!0,align:"left"}]);const g=c([]),S=c(""),_=c(!1),D=c(null);V(()=>{h(),D.value=setInterval(()=>{h()},1e4)});const h=async()=>{_.value=!0,await M.post("servicesOPR/search",{searchBy:"",searchValue:S.value}).then(e=>{_.value=!1,g.value=e.data.data}).catch(e=>{_.value=!1})},R=(e,r)=>{const t={SRVH_DOCNO:e.SRVH_DOCNO,SRVH_ISSDT:I.formatDate(e.SRVH_ISSDT,"YYYY-MM-DD"),SRVH_CUSCD:e.MCUS_CUSCD};let l=[];e.detail.map(a=>{l.push({id:a.id,TSRVD_ITMCD:a.TSRVD_ITMCD,TSRVD_FLGSTS:a.TSRVD_FLGSTS,TSRVD_LINE:a.TSRVD_LINE,TSRVD_QTY:a.TSRVD_QTY,TSRVD_CUSTRMK:a.TSRVD_CUSTRMK,TSRVD_REMARK:a.TSRVD_REMARK,listFixDet:a.list_fix_det})}),T.dialog({component:U,componentProps:{header:t,detail:l,mode:r}}).onOk(async a=>{h()})},f=e=>{const r=e.detail.filter(i=>i.TSRVD_FLGSTS==0),t=e.detail.filter(i=>i.TSRVD_FLGSTS==1),l=e.detail.filter(i=>i.TSRVD_FLGSTS==2),a=e.detail.filter(i=>i.TSRVD_FLGSTS==3),m=e.detail.filter(i=>i.TSRVD_FLGSTS==5);if(r.length==e.detail.length)return{color:"red",label:"No Price Added yet !",icon:"edit"};if(t.length>0&&t.length<e.detail.length)return{color:"warning",label:"Please Add item & price",icon:"payments"};if(m.length>0&&m.length==e.detail.length)return{color:"indigo",label:"Added Price Done, Waiting Manager Confirmation",icon:"price_check"};if(t.length>0&&t.length==e.detail.length)return{color:"green",label:"Manager has been approve, Waiting Cust. Confirmation",icon:"price_check"};if(l.length>0&&l.length>=e.detail.length)return{color:"cyan",label:"Cust. has been approved, continue to fix.",icon:"engineering"};if(a.length>0&&a.length===e.detail.length)return{color:"primary",label:"Fix has been done",icon:"fact_check"}};return(e,r)=>(b(),w("div",k,[o("div",P,[o("div",G,[n(F,{grid:"",flat:"",bordered:"","card-container-class":e.cardContainerClass,title:"Outstanding Order",rows:g.value,columns:e.columns,"row-key":"name",filter:S.value,"hide-header":"",pagination:{rowsPerPage:50},"rows-per-page-options":e.rowsPerPageOptions,loading:_.value},{"top-right":s(()=>[n(C,{borderless:"",dense:"",debounce:"300",modelValue:S.value,"onUpdate:modelValue":r[0]||(r[0]=t=>S.value=t),placeholder:"Search"},{append:s(()=>[n(v,{name:"search"})]),_:1},8,["modelValue"])]),item:s(t=>[o("div",H,[n(O,{flat:"",bordered:""},{default:s(()=>[n(u,{class:x(`text-center bg-${f(t.row).color} text-white`)},{default:s(()=>[o("div",Q,d(t.row.SRVH_DOCNO),1),o("div",null,d(f(t.row).label),1)]),_:2},1032,["class"]),n(L),n(u,null,{default:s(()=>[o("div",y,d(t.row.MCUS_CUSNM),1),o("div",A,d(t.row.SRVH_ISSDT),1)]),_:2},1024),n(u,null,{default:s(()=>[o("div",B,d(t.row.resolve.length)+" of "+d(t.row.detail.length),1),E]),_:2},1024),n(u,null,{default:s(()=>[o("div",Y,[o("div",K,[n(N,{label:t.row.detail.filter(l=>l.TSRVD_FLGSTS===1).length==t.row.detail.length?"Waiting Cust. Approval":t.row.detail.filter(l=>l.TSRVD_FLGSTS===5).length==t.row.detail.length?"Waiting Mgr. Approval":"Resolve",color:"primary",outline:"",onClick:l=>R(t.row,t.row.resolve.length==t.row.detail.length?"approve":"edit"),disable:t.row.detail.filter(l=>l.TSRVD_FLGSTS===1).length==t.row.detail.length||t.row.detail.filter(l=>l.TSRVD_FLGSTS===5).length==t.row.detail.length},null,8,["label","onClick","disable"])]),W])]),_:2},1024)]),_:2},1024)])]),_:1},8,["card-container-class","rows","columns","filter","rows-per-page-options","loading"])])])]))}};export{le as default};
