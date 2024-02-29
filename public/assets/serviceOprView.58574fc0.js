import{s as n,o as R,B as D,R as v,I as l,E as a,D as i,P as w,aa as V,J as T,K as S,ba as b,aX as r,S as C,Q as O}from"./index.64282f74.js";import{b as x,a as I}from"./use-dialog-plugin-component.f74aca9e.js";import{d as N}from"./date.30d46a89.js";import{api_web as U}from"./axios.bf2981d8.js";import{_ as H}from"./serviceOprUpdateOrder.f5b74fd9.js";import"./QTooltip.d75c98c5.js";import"./QBadge.a899192d.js";const Q={class:"q-pa-md"},L={class:"row"},M={class:"col"},P={class:"q-pa-xs col-xs-12 col-sm-6 col-md-4"},k={class:"text-h5 text-bold"},y={class:"text-h6 text-bold"},p={class:"text-subtitle2"},B={class:"text-h6 text-bold"},E=l("div",{class:"text-subtitle2"},"Resolved Items",-1),F={class:"row"},K={class:"col"},Y=l("div",{class:"col text-right"},null,-1),j={__name:"serviceOprView",setup(G){const m=x();n([{name:"SRVH_DOCNO",label:"SPK No",field:"SRVH_DOCNO",sortable:!0,align:"left"},{name:"MCUS_CUSNM",label:"Customer Name",field:"MCUS_CUSNM",sortable:!0,align:"left"},{name:"resolve",label:"Resolved Line",sortable:!0,align:"left",field:t=>t.resolve.length},{name:"unresolve",label:"Unresolved Line",sortable:!0,align:"left",field:t=>t.unresolve.length},{name:"SRVH_ISSDT",label:"Submited Date",field:"SRVH_ISSDT",sortable:!0,align:"left"}]);const h=n([]),d=n(""),c=n(!1),g=n(null);R(()=>{u(),g.value=setInterval(()=>{u()},1e4)});const u=async()=>{c.value=!0,await U.post("servicesOPR/search",{searchBy:"",searchValue:d.value}).then(t=>{c.value=!1,h.value=t.data.data}).catch(t=>{c.value=!1})},f=(t,_)=>{const e={SRVH_DOCNO:t.SRVH_DOCNO,SRVH_ISSDT:N.formatDate(t.SRVH_ISSDT,"YYYY-MM-DD"),SRVH_CUSCD:t.MCUS_CUSCD};let s=[];t.detail.map(o=>{s.push({id:o.id,TSRVD_ITMCD:o.TSRVD_ITMCD,TSRVD_FLGSTS:o.TSRVD_FLGSTS,TSRVD_LINE:o.TSRVD_LINE,TSRVD_QTY:o.TSRVD_QTY,TSRVD_CUSTRMK:o.TSRVD_CUSTRMK,TSRVD_REMARK:o.TSRVD_REMARK,listFixDet:o.list_fix_det})}),m.dialog({component:H,componentProps:{header:e,detail:s,mode:_}}).onOk(async o=>{u()})};return(t,_)=>(D(),v("div",Q,[l("div",L,[l("div",M,[a(I,{grid:"",flat:"",bordered:"","card-container-class":t.cardContainerClass,title:"Outstanding Order",rows:h.value,columns:t.columns,"row-key":"name",filter:d.value,"hide-header":"",pagination:{rowsPerPage:50},"rows-per-page-options":t.rowsPerPageOptions,loading:c.value},{"top-right":i(()=>[a(w,{borderless:"",dense:"",debounce:"300",modelValue:d.value,"onUpdate:modelValue":_[0]||(_[0]=e=>d.value=e),placeholder:"Search"},{append:i(()=>[a(V,{name:"search"})]),_:1},8,["modelValue"])]),item:i(e=>[l("div",P,[a(T,{flat:"",bordered:""},{default:i(()=>[a(S,{class:b(`text-center ${e.row.resolve.length==e.row.detail.length?"bg-indigo ":e.row.detail.filter(s=>s.TSRVD_FLGSTS===1).length==e.row.detail.length?"bg-warning":"bg-secondary "}text-white`)},{default:i(()=>[l("div",k,r(e.row.SRVH_DOCNO),1)]),_:2},1032,["class"]),a(C),a(S,null,{default:i(()=>[l("div",y,r(e.row.MCUS_CUSNM),1),l("div",p,r(e.row.SRVH_ISSDT),1)]),_:2},1024),a(S,null,{default:i(()=>[l("div",B,r(e.row.resolve.length)+" of "+r(e.row.detail.length),1),E]),_:2},1024),a(S,null,{default:i(()=>[l("div",F,[l("div",K,[a(O,{label:e.row.detail.filter(s=>s.TSRVD_FLGSTS===1).length==e.row.detail.length?"Waiting Cust Approval":"Resolve",color:"primary",outline:"",onClick:s=>f(e.row,e.row.resolve.length==e.row.detail.length?"approve":"edit"),disable:e.row.detail.filter(s=>s.TSRVD_FLGSTS===1).length==e.row.detail.length},null,8,["label","onClick","disable"])]),Y])]),_:2},1024)]),_:2},1024)])]),_:1},8,["card-container-class","rows","columns","filter","rows-per-page-options","loading"])])])]))}};export{j as default};
