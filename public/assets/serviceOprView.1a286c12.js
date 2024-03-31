import{s as c,o as R,B as b,P as V,I as a,E as s,D as n,Z as C,am as w,L as v,M as u,bc as p,O as d,aX as O,Q as x}from"./index.5b04e928.js";import{u as N,j as I}from"./QTable.e0730deb.js";import{d as L}from"./date.f02924af.js";import"./use-dialog-plugin-component.e4efc8e5.js";import{api_web as U}from"./axios.2430881d.js";import{_ as P}from"./serviceOprUpdateOrder.b876aae2.js";import"./QBtnGroup.287456f9.js";import"./QTooltip.b5d689be.js";import"./QBadge.70d76272.js";const H={class:"q-pa-md"},M={class:"row"},Q={class:"col"},k={class:"q-pa-xs col-xs-12 col-sm-6 col-md-4"},y={class:"text-h5 text-bold"},F={class:"text-h6 text-bold"},G={class:"text-subtitle2"},A={class:"text-h6 text-bold"},B=a("div",{class:"text-subtitle2"},"Resolved Items",-1),E={class:"row"},Y={class:"col"},K=a("div",{class:"col text-right"},null,-1),le={__name:"serviceOprView",setup($){const f=N();c([{name:"SRVH_DOCNO",label:"SPK No",field:"SRVH_DOCNO",sortable:!0,align:"left"},{name:"MCUS_CUSNM",label:"Customer Name",field:"MCUS_CUSNM",sortable:!0,align:"left"},{name:"resolve",label:"Resolved Line",sortable:!0,align:"left",field:e=>e.resolve.length},{name:"unresolve",label:"Unresolved Line",sortable:!0,align:"left",field:e=>e.unresolve.length},{name:"SRVH_ISSDT",label:"Submited Date",field:"SRVH_ISSDT",sortable:!0,align:"left"}]);const m=c([]),_=c(""),S=c(!1),D=c(null);R(()=>{h(),D.value=setInterval(()=>{h()},1e4)});const h=async()=>{S.value=!0,await U.post("servicesOPR/search",{searchBy:"",searchValue:_.value}).then(e=>{S.value=!1,m.value=e.data.data}).catch(e=>{S.value=!1})},T=(e,r)=>{const t={SRVH_DOCNO:e.SRVH_DOCNO,SRVH_ISSDT:L.formatDate(e.SRVH_ISSDT,"YYYY-MM-DD"),SRVH_CUSCD:e.MCUS_CUSCD};let o=[];e.detail.map(l=>{o.push({id:l.id,TSRVD_ITMCD:l.TSRVD_ITMCD,TSRVD_FLGSTS:l.TSRVD_FLGSTS,TSRVD_LINE:l.TSRVD_LINE,TSRVD_QTY:l.TSRVD_QTY,TSRVD_CUSTRMK:l.TSRVD_CUSTRMK,TSRVD_REMARK:l.TSRVD_REMARK,listFixDet:l.list_fix_det})}),f.dialog({component:P,componentProps:{header:t,detail:o,mode:r}}).onOk(async l=>{h()})},g=e=>{const r=e.detail.filter(i=>i.TSRVD_FLGSTS==0),t=e.detail.filter(i=>i.TSRVD_FLGSTS==1),o=e.detail.filter(i=>i.TSRVD_FLGSTS==2),l=e.detail.filter(i=>i.TSRVD_FLGSTS==3);if(r.length==e.detail.length)return{color:"red",label:"No Price Added yet !",icon:"edit"};if(t.length>0&&t.length<e.detail.length)return{color:"warning",label:"Please Add item & price",icon:"payments"};if(t.length>0&&t.length==e.detail.length)return{color:"green",label:"Added Price Done, Waiting Cust. Confirmation",icon:"price_check"};if(o.length>0&&o.length>=e.detail.length)return{color:"cyan",label:"Cust. has been approved, continue to fix.",icon:"engineering"};if(l.length>0&&l.length===e.detail.length)return{color:"primary",label:"Fix has been done",icon:"fact_check"}};return(e,r)=>(b(),V("div",H,[a("div",M,[a("div",Q,[s(I,{grid:"",flat:"",bordered:"","card-container-class":e.cardContainerClass,title:"Outstanding Order",rows:m.value,columns:e.columns,"row-key":"name",filter:_.value,"hide-header":"",pagination:{rowsPerPage:50},"rows-per-page-options":e.rowsPerPageOptions,loading:S.value},{"top-right":n(()=>[s(C,{borderless:"",dense:"",debounce:"300",modelValue:_.value,"onUpdate:modelValue":r[0]||(r[0]=t=>_.value=t),placeholder:"Search"},{append:n(()=>[s(w,{name:"search"})]),_:1},8,["modelValue"])]),item:n(t=>[a("div",k,[s(v,{flat:"",bordered:""},{default:n(()=>[s(u,{class:p(`text-center bg-${g(t.row).color} text-white`)},{default:n(()=>[a("div",y,d(t.row.SRVH_DOCNO),1),a("div",null,d(g(t.row).label),1)]),_:2},1032,["class"]),s(O),s(u,null,{default:n(()=>[a("div",F,d(t.row.MCUS_CUSNM),1),a("div",G,d(t.row.SRVH_ISSDT),1)]),_:2},1024),s(u,null,{default:n(()=>[a("div",A,d(t.row.resolve.length)+" of "+d(t.row.detail.length),1),B]),_:2},1024),s(u,null,{default:n(()=>[a("div",E,[a("div",Y,[s(x,{label:t.row.detail.filter(o=>o.TSRVD_FLGSTS===1).length==t.row.detail.length?"Waiting Cust Approval":"Resolve",color:"primary",outline:"",onClick:o=>T(t.row,t.row.resolve.length==t.row.detail.length?"approve":"edit"),disable:t.row.detail.filter(o=>o.TSRVD_FLGSTS===1).length==t.row.detail.length},null,8,["label","onClick","disable"])]),K])]),_:2},1024)]),_:2},1024)])]),_:1},8,["card-container-class","rows","columns","filter","rows-per-page-options","loading"])])])]))}};export{le as default};
