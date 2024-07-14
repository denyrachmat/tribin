import{t as d,o as b,C as w,R as C,J as i,F as n,E as s,$ as v,at as M,M as p,O as h,b8 as O,P as c,aM as x,Q as I}from"./index.61f2a1e9.js";import{a as L}from"./QTable.f2de366e.js";import{d as N}from"./date.3c1c7dd8.js";import"./use-dialog-plugin-component.8240704e.js";import{u as F}from"./format.c513066d.js";import{api_web as H}from"./axios.49df4c49.js";import{_ as G}from"./serviceOprUpdateOrder.d6c3f8c2.js";import"./QSelect.a1d80cea.js";import"./QBtnGroup.05944284.js";import"./QTooltip.17a13d40.js";import"./QBadge.e55f8fad.js";import"./serviceOprItemAdd.8b507dd0.js";import"./QInnerLoading.4dcb3a97.js";const k={class:"q-pa-md"},P={class:"row"},U={class:"col"},y={class:"q-pa-xs col-xs-12 col-sm-6 col-md-4"},Q={class:"text-h5 text-bold"},K=["innerHTML"],A={class:"text-h6 text-bold"},E={class:"text-subtitle2"},Y={class:"text-h6 text-bold"},$=i("div",{class:"text-subtitle2"},"Resolved Items",-1),B={class:"row"},W={class:"col"},q=i("div",{class:"col text-right"},null,-1),de={__name:"serviceOprView",setup(j){const R=F();d([{name:"SRVH_DOCNO",label:"SPK No",field:"SRVH_DOCNO",sortable:!0,align:"left"},{name:"MCUS_CUSNM",label:"Customer Name",field:"MCUS_CUSNM",sortable:!0,align:"left"},{name:"resolve",label:"Resolved Line",sortable:!0,align:"left",field:e=>e.resolve.length},{name:"unresolve",label:"Unresolved Line",sortable:!0,align:"left",field:e=>e.unresolve.length},{name:"SRVH_ISSDT",label:"Submited Date",field:"SRVH_ISSDT",sortable:!0,align:"left"}]);const g=d([]),S=d(""),_=d(!1),T=d(null);b(()=>{u(),T.value=setInterval(()=>{u()},1e4)});const u=async()=>{_.value=!0,await H.post("servicesOPRs/search",{searchBy:"",searchValue:S.value}).then(e=>{_.value=!1,g.value=e.data.data}).catch(e=>{_.value=!1})},D=(e,r)=>{const t={SRVH_DOCNO:e.SRVH_DOCNO,SRVH_ISSDT:N.formatDate(e.SRVH_ISSDT,"YYYY-MM-DD"),SRVH_CUSCD:e.MCUS_CUSCD,SRVH_ISINT:e.SRVH_ISINT};let l=[];e.detail.map(o=>{l.push({id:o.id,TSRVD_ITMCD:o.TSRVD_ITMCD,TSRVD_FLGSTS:o.TSRVD_FLGSTS,TSRVD_LINE:o.TSRVD_LINE,TSRVD_QTY:o.TSRVD_QTY,TSRVD_CUSTRMK:o.TSRVD_CUSTRMK,TSRVD_REMARK:o.TSRVD_REMARK,listFixDet:o.list_fix_det})}),R.dialog({component:G,componentProps:{header:t,detail:l,mode:r}}).onOk(async o=>{u()})},m=e=>{const r=e.detail.filter(a=>a.TSRVD_FLGSTS==0),t=e.detail.filter(a=>a.TSRVD_FLGSTS==1),l=e.detail.filter(a=>a.TSRVD_FLGSTS==2),o=e.detail.filter(a=>a.TSRVD_FLGSTS==3),f=e.detail.filter(a=>a.TSRVD_FLGSTS==5);if(r.length==e.detail.length){const a=e.detail.filter(V=>V.TSRVD_MGRRMK!="");return{color:"red",label:a.length>0&&a[0].TSRVD_MGRRMK?`Price Rejected by Mgr. <br>${a[0].TSRVD_MGRRMK}`:"No Price Added yet !",icon:"edit"}}else{if(t.length>0&&t.length<e.detail.length)return{color:"warning",label:"Please Add item & price",icon:"payments"};if(f.length>0&&f.length==e.detail.length)return{color:"indigo",label:"Added Price Done, Waiting Manager Confirmation",icon:"price_check"};if(t.length>0&&t.length==e.detail.length)return{color:"green",label:"Manager has been approve, Waiting Cust. Confirmation",icon:"price_check"};if(l.length>0&&l.length>=e.detail.length)return{color:"cyan",label:"Cust. has been approved, continue to fix.",icon:"engineering"};if(o.length>0&&o.length===e.detail.length)return{color:"primary",label:"Fix has been done",icon:"fact_check"}}};return(e,r)=>(w(),C("div",k,[i("div",P,[i("div",U,[n(L,{grid:"",flat:"",bordered:"","card-container-class":e.cardContainerClass,title:"Outstanding Order",rows:g.value,columns:e.columns,"row-key":"name",filter:S.value,"hide-header":"",pagination:{rowsPerPage:50},"rows-per-page-options":e.rowsPerPageOptions,loading:_.value},{"top-right":s(()=>[n(v,{borderless:"",dense:"",debounce:"300",modelValue:S.value,"onUpdate:modelValue":r[0]||(r[0]=t=>S.value=t),placeholder:"Search"},{append:s(()=>[n(M,{name:"search"})]),_:1},8,["modelValue"])]),item:s(t=>[i("div",y,[n(p,{flat:"",bordered:""},{default:s(()=>[n(h,{class:O(`text-center bg-${m(t.row).color} text-white`)},{default:s(()=>[i("div",Q,c(t.row.SRVH_DOCNO),1),i("div",{innerHTML:m(t.row).label},null,8,K)]),_:2},1032,["class"]),n(x),n(h,null,{default:s(()=>[i("div",A,c(t.row.MCUS_CUSNM),1),i("div",E,c(t.row.SRVH_ISSDT),1)]),_:2},1024),n(h,null,{default:s(()=>[i("div",Y,c(t.row.resolve.length)+" of "+c(t.row.detail.length),1),$]),_:2},1024),n(h,null,{default:s(()=>[i("div",B,[i("div",W,[n(I,{label:t.row.detail.filter(l=>l.TSRVD_FLGSTS===1).length==t.row.detail.length?"Waiting Cust. Approval":t.row.detail.filter(l=>l.TSRVD_FLGSTS===5).length==t.row.detail.length?"Waiting Mgr. Approval":"Resolve",color:"primary",outline:"",onClick:l=>D(t.row,t.row.resolve.length==t.row.detail.length?"approve":"edit"),disable:t.row.detail.filter(l=>l.TSRVD_FLGSTS===1).length==t.row.detail.length||t.row.detail.filter(l=>l.TSRVD_FLGSTS===5).length==t.row.detail.length},null,8,["label","onClick","disable"])]),q])]),_:2},1024)]),_:2},1024)])]),_:1},8,["card-container-class","rows","columns","filter","rows-per-page-options","loading"])])])]))}};export{de as default};
