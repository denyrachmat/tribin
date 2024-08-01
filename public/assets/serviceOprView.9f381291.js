import{t as d,o as b,C as w,R as C,J as i,F as n,E as r,$ as v,av as p,M,O as h,b6 as x,P as c,aI as I,Q as O}from"./index.5d493791.js";import{Q as L}from"./QTable.38bb805e.js";import{d as N}from"./date.f4c158bd.js";import"./use-dialog-plugin-component.a93cd6ac.js";import{u as F}from"./use-quasar.5ff04d5d.js";import{api_web as H}from"./axios.8fce3e86.js";import{_ as G}from"./serviceOprUpdateOrder.1e79b77f.js";import"./QList.e4da8cc8.js";import"./QSelect.cf6a2fc6.js";import"./QItemLabel.24928778.js";import"./format.fbf5c514.js";import"./QBtnGroup.8a735205.js";import"./QTooltip.0adef6a3.js";import"./QBadge.e247df15.js";import"./serviceOprItemAdd.40ea003c.js";import"./QInnerLoading.aeb4d6db.js";const k={class:"q-pa-md"},P={class:"row"},U={class:"col"},Q={class:"q-pa-xs col-xs-12 col-sm-6 col-md-4"},y={class:"text-h5 text-bold"},K=["innerHTML"],A={class:"text-h6 text-bold"},E={class:"text-subtitle2"},Y={class:"text-h6 text-bold"},$=i("div",{class:"text-subtitle2"},"Resolved Items",-1),q={class:"row"},B={class:"col"},W=i("div",{class:"col text-right"},null,-1),_e={__name:"serviceOprView",setup(j){const f=F();d([{name:"SRVH_DOCNO",label:"SPK No",field:"SRVH_DOCNO",sortable:!0,align:"left"},{name:"MCUS_CUSNM",label:"Customer Name",field:"MCUS_CUSNM",sortable:!0,align:"left"},{name:"resolve",label:"Resolved Line",sortable:!0,align:"left",field:e=>e.resolve.length},{name:"unresolve",label:"Unresolved Line",sortable:!0,align:"left",field:e=>e.unresolve.length},{name:"SRVH_ISSDT",label:"Submited Date",field:"SRVH_ISSDT",sortable:!0,align:"left"}]);const g=d([]),S=d(""),_=d(!1),T=d(null);b(()=>{u(),T.value=setInterval(()=>{u()},1e4)});const u=async()=>{_.value=!0,await H.post("servicesOPRs/search",{searchBy:"",searchValue:S.value,allFixed:1}).then(e=>{_.value=!1,g.value=e.data.data}).catch(e=>{_.value=!1})},D=(e,s)=>{const t={SRVH_DOCNO:e.SRVH_DOCNO,SRVH_ISSDT:N.formatDate(e.SRVH_ISSDT,"YYYY-MM-DD"),SRVH_CUSCD:e.MCUS_CUSCD,SRVH_ISINT:e.SRVH_ISINT};let l=[];e.detail.map(a=>{l.push({id:a.id,TSRVD_ITMCD:a.TSRVD_ITMCD,TSRVD_FLGSTS:a.TSRVD_FLGSTS,TSRVD_LINE:a.TSRVD_LINE,TSRVD_QTY:a.TSRVD_QTY,TSRVD_CUSTRMK:a.TSRVD_CUSTRMK,TSRVD_REMARK:a.TSRVD_REMARK,listFixDet:a.list_fix_det,partReq:a.partReq})}),f.dialog({component:G,componentProps:{header:t,detail:l,mode:s}}).onOk(async a=>{u()})},m=e=>{const s=e.detail.filter(o=>o.TSRVD_FLGSTS==0),t=e.detail.filter(o=>o.TSRVD_FLGSTS==1),l=e.detail.filter(o=>o.TSRVD_FLGSTS==2),a=e.detail.filter(o=>o.TSRVD_FLGSTS==3),R=e.detail.filter(o=>o.TSRVD_FLGSTS==5);if(s.length==e.detail.length){const o=e.detail.filter(V=>V.TSRVD_MGRRMK!="");return{color:"red",label:o.length>0&&o[0].TSRVD_MGRRMK?`Price Rejected by Mgr. <br>${o[0].TSRVD_MGRRMK}`:"No Price Added yet !",icon:"edit"}}else{if(t.length>0&&t.length<e.detail.length)return{color:"warning",label:"Please Add item & price",icon:"payments"};if(R.length>0&&R.length==e.detail.length)return{color:"indigo",label:"Added Price Done, Waiting Manager Confirmation",icon:"price_check"};if(t.length>0&&t.length==e.detail.length)return{color:"green",label:"Manager has been approve, Waiting Cust. Confirmation",icon:"price_check"};if(l.length>0&&l.length>=e.detail.length)return{color:"cyan",label:"Cust. has been approved, continue to fix.",icon:"engineering"};if(a.length>0&&a.length===e.detail.length)return{color:"primary",label:"Fix has been done",icon:"fact_check"}}};return(e,s)=>(w(),C("div",k,[i("div",P,[i("div",U,[n(L,{grid:"",flat:"",bordered:"","card-container-class":e.cardContainerClass,title:"Outstanding Order",rows:g.value,columns:e.columns,"row-key":"name",filter:S.value,"hide-header":"",pagination:{rowsPerPage:50},"rows-per-page-options":e.rowsPerPageOptions,loading:_.value},{"top-right":r(()=>[n(v,{borderless:"",dense:"",debounce:"300",modelValue:S.value,"onUpdate:modelValue":s[0]||(s[0]=t=>S.value=t),placeholder:"Search"},{append:r(()=>[n(p,{name:"search"})]),_:1},8,["modelValue"])]),item:r(t=>[i("div",Q,[n(M,{flat:"",bordered:""},{default:r(()=>[n(h,{class:x(`text-center bg-${m(t.row).color} text-white`)},{default:r(()=>[i("div",y,c(t.row.SRVH_DOCNO),1),i("div",{innerHTML:m(t.row).label},null,8,K)]),_:2},1032,["class"]),n(I),n(h,null,{default:r(()=>[i("div",A,c(t.row.MCUS_CUSNM),1),i("div",E,c(t.row.SRVH_ISSDT),1)]),_:2},1024),n(h,null,{default:r(()=>[i("div",Y,c(t.row.resolve.length)+" of "+c(t.row.detail.length),1),$]),_:2},1024),n(h,null,{default:r(()=>[i("div",q,[i("div",B,[n(O,{label:t.row.detail.filter(l=>l.TSRVD_FLGSTS===1).length==t.row.detail.length?"Waiting Cust. Approval":t.row.detail.filter(l=>l.TSRVD_FLGSTS===5).length==t.row.detail.length?"Waiting Mgr. Approval":"Resolve",color:"primary",outline:"",onClick:l=>D(t.row,t.row.resolve.length==t.row.detail.length?"approve":"edit"),disable:t.row.detail.filter(l=>l.TSRVD_FLGSTS===1).length==t.row.detail.length||t.row.detail.filter(l=>l.TSRVD_FLGSTS===5).length==t.row.detail.length},null,8,["label","onClick","disable"])]),W])]),_:2},1024)]),_:2},1024)])]),_:1},8,["card-container-class","rows","columns","filter","rows-per-page-options","loading"])])])]))}};export{_e as default};
