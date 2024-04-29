import{s as d,o as b,B as w,P as C,I as n,E as i,D as s,Z as v,am as M,L,M as h,bc as O,O as c,aX as x,Q as p}from"./index.c32b141e.js";import{u as N,j as F}from"./QTable.1764ca29.js";import{d as I}from"./date.20e8e860.js";import"./use-dialog-plugin-component.8bffb519.js";import{api_web as k}from"./axios.8fb1697c.js";import{_ as G}from"./serviceOprUpdateOrder.c05eb4b7.js";import"./QBtnGroup.3b23b8eb.js";import"./QTooltip.9371cdbe.js";import"./QBadge.11fa7f33.js";import"./serviceOprItemAdd.507f6d3d.js";const H={class:"q-pa-md"},P={class:"row"},U={class:"col"},y={class:"q-pa-xs col-xs-12 col-sm-6 col-md-4"},Q={class:"text-h5 text-bold"},A=["innerHTML"],K={class:"text-h6 text-bold"},B={class:"text-subtitle2"},E={class:"text-h6 text-bold"},Y=n("div",{class:"text-subtitle2"},"Resolved Items",-1),$={class:"row"},W={class:"col"},q=n("div",{class:"col text-right"},null,-1),ie={__name:"serviceOprView",setup(j){const R=N();d([{name:"SRVH_DOCNO",label:"SPK No",field:"SRVH_DOCNO",sortable:!0,align:"left"},{name:"MCUS_CUSNM",label:"Customer Name",field:"MCUS_CUSNM",sortable:!0,align:"left"},{name:"resolve",label:"Resolved Line",sortable:!0,align:"left",field:e=>e.resolve.length},{name:"unresolve",label:"Unresolved Line",sortable:!0,align:"left",field:e=>e.unresolve.length},{name:"SRVH_ISSDT",label:"Submited Date",field:"SRVH_ISSDT",sortable:!0,align:"left"}]);const g=d([]),S=d(""),_=d(!1),T=d(null);b(()=>{u(),T.value=setInterval(()=>{u()},1e4)});const u=async()=>{_.value=!0,await k.post("servicesOPR/search",{searchBy:"",searchValue:S.value}).then(e=>{_.value=!1,g.value=e.data.data}).catch(e=>{_.value=!1})},D=(e,r)=>{const t={SRVH_DOCNO:e.SRVH_DOCNO,SRVH_ISSDT:I.formatDate(e.SRVH_ISSDT,"YYYY-MM-DD"),SRVH_CUSCD:e.MCUS_CUSCD};let l=[];e.detail.map(a=>{l.push({id:a.id,TSRVD_ITMCD:a.TSRVD_ITMCD,TSRVD_FLGSTS:a.TSRVD_FLGSTS,TSRVD_LINE:a.TSRVD_LINE,TSRVD_QTY:a.TSRVD_QTY,TSRVD_CUSTRMK:a.TSRVD_CUSTRMK,TSRVD_REMARK:a.TSRVD_REMARK,listFixDet:a.list_fix_det})}),R.dialog({component:G,componentProps:{header:t,detail:l,mode:r}}).onOk(async a=>{u()})},f=e=>{const r=e.detail.filter(o=>o.TSRVD_FLGSTS==0),t=e.detail.filter(o=>o.TSRVD_FLGSTS==1),l=e.detail.filter(o=>o.TSRVD_FLGSTS==2),a=e.detail.filter(o=>o.TSRVD_FLGSTS==3),m=e.detail.filter(o=>o.TSRVD_FLGSTS==5);if(r.length==e.detail.length){const o=e.detail.filter(V=>V.TSRVD_MGRRMK!=="");return{color:"red",label:o.length>0?`Price Rejected by Mgr. <br>${o[0].TSRVD_MGRRMK}`:"No Price Added yet !",icon:"edit"}}else{if(t.length>0&&t.length<e.detail.length)return{color:"warning",label:"Please Add item & price",icon:"payments"};if(m.length>0&&m.length==e.detail.length)return{color:"indigo",label:"Added Price Done, Waiting Manager Confirmation",icon:"price_check"};if(t.length>0&&t.length==e.detail.length)return{color:"green",label:"Manager has been approve, Waiting Cust. Confirmation",icon:"price_check"};if(l.length>0&&l.length>=e.detail.length)return{color:"cyan",label:"Cust. has been approved, continue to fix.",icon:"engineering"};if(a.length>0&&a.length===e.detail.length)return{color:"primary",label:"Fix has been done",icon:"fact_check"}}};return(e,r)=>(w(),C("div",H,[n("div",P,[n("div",U,[i(F,{grid:"",flat:"",bordered:"","card-container-class":e.cardContainerClass,title:"Outstanding Order",rows:g.value,columns:e.columns,"row-key":"name",filter:S.value,"hide-header":"",pagination:{rowsPerPage:50},"rows-per-page-options":e.rowsPerPageOptions,loading:_.value},{"top-right":s(()=>[i(v,{borderless:"",dense:"",debounce:"300",modelValue:S.value,"onUpdate:modelValue":r[0]||(r[0]=t=>S.value=t),placeholder:"Search"},{append:s(()=>[i(M,{name:"search"})]),_:1},8,["modelValue"])]),item:s(t=>[n("div",y,[i(L,{flat:"",bordered:""},{default:s(()=>[i(h,{class:O(`text-center bg-${f(t.row).color} text-white`)},{default:s(()=>[n("div",Q,c(t.row.SRVH_DOCNO),1),n("div",{innerHTML:f(t.row).label},null,8,A)]),_:2},1032,["class"]),i(x),i(h,null,{default:s(()=>[n("div",K,c(t.row.MCUS_CUSNM),1),n("div",B,c(t.row.SRVH_ISSDT),1)]),_:2},1024),i(h,null,{default:s(()=>[n("div",E,c(t.row.resolve.length)+" of "+c(t.row.detail.length),1),Y]),_:2},1024),i(h,null,{default:s(()=>[n("div",$,[n("div",W,[i(p,{label:t.row.detail.filter(l=>l.TSRVD_FLGSTS===1).length==t.row.detail.length?"Waiting Cust. Approval":t.row.detail.filter(l=>l.TSRVD_FLGSTS===5).length==t.row.detail.length?"Waiting Mgr. Approval":"Resolve",color:"primary",outline:"",onClick:l=>D(t.row,t.row.resolve.length==t.row.detail.length?"approve":"edit"),disable:t.row.detail.filter(l=>l.TSRVD_FLGSTS===1).length==t.row.detail.length||t.row.detail.filter(l=>l.TSRVD_FLGSTS===5).length==t.row.detail.length},null,8,["label","onClick","disable"])]),q])]),_:2},1024)]),_:2},1024)])]),_:1},8,["card-container-class","rows","columns","filter","rows-per-page-options","loading"])])])]))}};export{ie as default};
