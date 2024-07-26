import{t as d,o as b,C as w,R as C,J as i,F as n,E as r,$ as v,av as p,M,O as h,b6 as I,P as c,aI as O,Q as x}from"./index.9e797fbd.js";import{Q as L}from"./QTable.07c456cf.js";import{d as N}from"./date.d4930703.js";import"./use-dialog-plugin-component.7068c66f.js";import{u as F}from"./use-quasar.79d54588.js";import{api_web as H}from"./axios.c5514372.js";import{_ as G}from"./serviceOprUpdateOrder.e0a44913.js";import"./QList.2cdc02df.js";import"./QSelect.5c13fc95.js";import"./QItemLabel.bee88e45.js";import"./format.e66eab64.js";import"./QBtnGroup.61a135fb.js";import"./QTooltip.518bee1f.js";import"./QBadge.4be0c92d.js";import"./serviceOprItemAdd.06e1b197.js";import"./QInnerLoading.419a2d17.js";const k={class:"q-pa-md"},P={class:"row"},U={class:"col"},Q={class:"q-pa-xs col-xs-12 col-sm-6 col-md-4"},y={class:"text-h5 text-bold"},K=["innerHTML"],A={class:"text-h6 text-bold"},E={class:"text-subtitle2"},Y={class:"text-h6 text-bold"},$=i("div",{class:"text-subtitle2"},"Resolved Items",-1),q={class:"row"},B={class:"col"},W=i("div",{class:"col text-right"},null,-1),_e={__name:"serviceOprView",setup(j){const f=F();d([{name:"SRVH_DOCNO",label:"SPK No",field:"SRVH_DOCNO",sortable:!0,align:"left"},{name:"MCUS_CUSNM",label:"Customer Name",field:"MCUS_CUSNM",sortable:!0,align:"left"},{name:"resolve",label:"Resolved Line",sortable:!0,align:"left",field:e=>e.resolve.length},{name:"unresolve",label:"Unresolved Line",sortable:!0,align:"left",field:e=>e.unresolve.length},{name:"SRVH_ISSDT",label:"Submited Date",field:"SRVH_ISSDT",sortable:!0,align:"left"}]);const g=d([]),S=d(""),_=d(!1),T=d(null);b(()=>{u(),T.value=setInterval(()=>{u()},1e4)});const u=async()=>{_.value=!0,await H.post("servicesOPRs/search",{searchBy:"",searchValue:S.value}).then(e=>{_.value=!1,g.value=e.data.data}).catch(e=>{_.value=!1})},D=(e,s)=>{const t={SRVH_DOCNO:e.SRVH_DOCNO,SRVH_ISSDT:N.formatDate(e.SRVH_ISSDT,"YYYY-MM-DD"),SRVH_CUSCD:e.MCUS_CUSCD,SRVH_ISINT:e.SRVH_ISINT};let l=[];e.detail.map(o=>{l.push({id:o.id,TSRVD_ITMCD:o.TSRVD_ITMCD,TSRVD_FLGSTS:o.TSRVD_FLGSTS,TSRVD_LINE:o.TSRVD_LINE,TSRVD_QTY:o.TSRVD_QTY,TSRVD_CUSTRMK:o.TSRVD_CUSTRMK,TSRVD_REMARK:o.TSRVD_REMARK,listFixDet:o.list_fix_det,partReq:o.partReq})}),f.dialog({component:G,componentProps:{header:t,detail:l,mode:s}}).onOk(async o=>{u()})},m=e=>{const s=e.detail.filter(a=>a.TSRVD_FLGSTS==0),t=e.detail.filter(a=>a.TSRVD_FLGSTS==1),l=e.detail.filter(a=>a.TSRVD_FLGSTS==2),o=e.detail.filter(a=>a.TSRVD_FLGSTS==3),R=e.detail.filter(a=>a.TSRVD_FLGSTS==5);if(s.length==e.detail.length){const a=e.detail.filter(V=>V.TSRVD_MGRRMK!="");return{color:"red",label:a.length>0&&a[0].TSRVD_MGRRMK?`Price Rejected by Mgr. <br>${a[0].TSRVD_MGRRMK}`:"No Price Added yet !",icon:"edit"}}else{if(t.length>0&&t.length<e.detail.length)return{color:"warning",label:"Please Add item & price",icon:"payments"};if(R.length>0&&R.length==e.detail.length)return{color:"indigo",label:"Added Price Done, Waiting Manager Confirmation",icon:"price_check"};if(t.length>0&&t.length==e.detail.length)return{color:"green",label:"Manager has been approve, Waiting Cust. Confirmation",icon:"price_check"};if(l.length>0&&l.length>=e.detail.length)return{color:"cyan",label:"Cust. has been approved, continue to fix.",icon:"engineering"};if(o.length>0&&o.length===e.detail.length)return{color:"primary",label:"Fix has been done",icon:"fact_check"}}};return(e,s)=>(w(),C("div",k,[i("div",P,[i("div",U,[n(L,{grid:"",flat:"",bordered:"","card-container-class":e.cardContainerClass,title:"Outstanding Order",rows:g.value,columns:e.columns,"row-key":"name",filter:S.value,"hide-header":"",pagination:{rowsPerPage:50},"rows-per-page-options":e.rowsPerPageOptions,loading:_.value},{"top-right":r(()=>[n(v,{borderless:"",dense:"",debounce:"300",modelValue:S.value,"onUpdate:modelValue":s[0]||(s[0]=t=>S.value=t),placeholder:"Search"},{append:r(()=>[n(p,{name:"search"})]),_:1},8,["modelValue"])]),item:r(t=>[i("div",Q,[n(M,{flat:"",bordered:""},{default:r(()=>[n(h,{class:I(`text-center bg-${m(t.row).color} text-white`)},{default:r(()=>[i("div",y,c(t.row.SRVH_DOCNO),1),i("div",{innerHTML:m(t.row).label},null,8,K)]),_:2},1032,["class"]),n(O),n(h,null,{default:r(()=>[i("div",A,c(t.row.MCUS_CUSNM),1),i("div",E,c(t.row.SRVH_ISSDT),1)]),_:2},1024),n(h,null,{default:r(()=>[i("div",Y,c(t.row.resolve.length)+" of "+c(t.row.detail.length),1),$]),_:2},1024),n(h,null,{default:r(()=>[i("div",q,[i("div",B,[n(x,{label:t.row.detail.filter(l=>l.TSRVD_FLGSTS===1).length==t.row.detail.length?"Waiting Cust. Approval":t.row.detail.filter(l=>l.TSRVD_FLGSTS===5).length==t.row.detail.length?"Waiting Mgr. Approval":"Resolve",color:"primary",outline:"",onClick:l=>D(t.row,t.row.resolve.length==t.row.detail.length?"approve":"edit"),disable:t.row.detail.filter(l=>l.TSRVD_FLGSTS===1).length==t.row.detail.length||t.row.detail.filter(l=>l.TSRVD_FLGSTS===5).length==t.row.detail.length},null,8,["label","onClick","disable"])]),W])]),_:2},1024)]),_:2},1024)])]),_:1},8,["card-container-class","rows","columns","filter","rows-per-page-options","loading"])])])]))}};export{_e as default};
