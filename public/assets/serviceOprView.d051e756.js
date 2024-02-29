import{s as n,o as g,B as D,R as v,I as l,E as a,D as o,P as V,aa as C,J as b,K as S,ba as w,aX as r,S as T,Q as O}from"./index.8861766e.js";import{b as x,a as I}from"./use-dialog-plugin-component.3217057c.js";import{d as N}from"./date.40b8ed37.js";import{api_web as U}from"./axios.1303807f.js";import{_ as H}from"./serviceOprUpdateOrder.1cb30f6a.js";import"./QTooltip.29434a9d.js";import"./QBadge.6e717037.js";const Q={class:"q-pa-md"},p={class:"row"},M={class:"col"},P={class:"q-pa-xs col-xs-12 col-sm-6 col-md-4"},L={class:"text-h5 text-bold"},k={class:"text-h6 text-bold"},y={class:"text-subtitle2"},B={class:"text-h6 text-bold"},E=l("div",{class:"text-subtitle2"},"Resolved Items",-1),K={class:"row"},Y={class:"col"},F=l("div",{class:"col text-right"},null,-1),j={__name:"serviceOprView",setup(G){const h=x();n([{name:"SRVH_DOCNO",label:"SPK No",field:"SRVH_DOCNO",sortable:!0,align:"left"},{name:"MCUS_CUSNM",label:"Customer Name",field:"MCUS_CUSNM",sortable:!0,align:"left"},{name:"resolve",label:"Resolved Line",sortable:!0,align:"left",field:t=>t.resolve.length},{name:"unresolve",label:"Unresolved Line",sortable:!0,align:"left",field:t=>t.unresolve.length},{name:"SRVH_ISSDT",label:"Submited Date",field:"SRVH_ISSDT",sortable:!0,align:"left"}]);const m=n([]),d=n(""),c=n(!1),f=n(null);g(()=>{u(),f.value=setInterval(()=>{u()},1e4)});const u=async()=>{c.value=!0,await U.post("servicesOPR/search",{searchBy:"",searchValue:d.value}).then(t=>{c.value=!1,m.value=t.data.data}).catch(t=>{c.value=!1})},R=(t,_)=>{const e={SRVH_DOCNO:t.SRVH_DOCNO,SRVH_ISSDT:N.formatDate(t.SRVH_ISSDT,"YYYY-MM-DD"),SRVH_CUSCD:t.MCUS_CUSCD};let i=[];t.detail.map(s=>{i.push({id:s.id,TSRVD_ITMCD:s.TSRVD_ITMCD,TSRVD_FLGSTS:s.TSRVD_FLGSTS,TSRVD_LINE:s.TSRVD_LINE,TSRVD_QTY:s.TSRVD_QTY,TSRVD_CUSTRMK:s.TSRVD_CUSTRMK,TSRVD_REMARK:s.TSRVD_REMARK,listFixDet:s.list_fix_det})}),h.dialog({component:H,componentProps:{header:e,detail:i,mode:_}}).onOk(async s=>{u()})};return(t,_)=>(D(),v("div",Q,[l("div",p,[l("div",M,[a(I,{grid:"",flat:"",bordered:"","card-container-class":t.cardContainerClass,title:"Outstanding Order",rows:m.value,columns:t.columns,"row-key":"name",filter:d.value,"hide-header":"",pagination:{rowsPerPage:50},"rows-per-page-options":t.rowsPerPageOptions,loading:c.value},{"top-right":o(()=>[a(V,{borderless:"",dense:"",debounce:"300",modelValue:d.value,"onUpdate:modelValue":_[0]||(_[0]=e=>d.value=e),placeholder:"Search"},{append:o(()=>[a(C,{name:"search"})]),_:1},8,["modelValue"])]),item:o(e=>[l("div",P,[a(b,{flat:"",bordered:""},{default:o(()=>[a(S,{class:w(`text-center ${e.row.resolve.length==e.row.detail.length?"bg-indigo ":"bg-secondary "}text-white`)},{default:o(()=>[l("div",L,r(e.row.SRVH_DOCNO),1)]),_:2},1032,["class"]),a(T),a(S,null,{default:o(()=>[l("div",k,r(e.row.MCUS_CUSNM),1),l("div",y,r(e.row.SRVH_ISSDT),1)]),_:2},1024),a(S,null,{default:o(()=>[l("div",B,r(e.row.resolve.length)+" of "+r(e.row.detail.length),1),E]),_:2},1024),a(S,null,{default:o(()=>[l("div",K,[l("div",Y,[a(O,{label:e.row.detail.filter(i=>i.TSRVD_FLGSTS===1).length==e.row.detail.length?"Waiting Cust Approval":"Resolve",color:"primary",outline:"",onClick:i=>R(e.row,e.row.resolve.length==e.row.detail.length?"approve":"edit"),disable:e.row.detail.filter(i=>i.TSRVD_FLGSTS===1).length==e.row.detail.length},null,8,["label","onClick","disable"])]),F])]),_:2},1024)]),_:2},1024)])]),_:1},8,["card-container-class","rows","columns","filter","rows-per-page-options","loading"])])])]))}};export{j as default};
