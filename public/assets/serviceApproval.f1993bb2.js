import{s as i,o as g,B as h,P as S,I as t,E as a,D as s,Z as f,am as m,L as w,M as d,bc as b,O as n,aX as C,Q as V}from"./index.9fe75200.js";import{a as D,k as R}from"./QTable.db962687.js";import{api_web as x}from"./axios.282e3c26.js";const T={class:"q-pa-md"},p={class:"row"},M={class:"col"},N={class:"q-pa-xs col-xs-12 col-sm-6 col-md-4"},Q={class:"text-h5 text-bold"},U={class:"text-h6 text-bold"},O={class:"text-subtitle2"},P={class:"text-h6 text-bold"},k=t("div",{class:"text-subtitle2"},"Resolved Items",-1),I={class:"row"},L={class:"col"},H=t("div",{class:"col text-right"},null,-1),G={__name:"serviceApproval",setup(A){D(),i([{name:"SRVH_DOCNO",label:"SPK No",field:"SRVH_DOCNO",sortable:!0,align:"left"},{name:"MCUS_CUSNM",label:"Customer Name",field:"MCUS_CUSNM",sortable:!0,align:"left"},{name:"resolve",label:"Resolved Line",sortable:!0,align:"left",field:l=>l.resolve.length},{name:"unresolve",label:"Unresolved Line",sortable:!0,align:"left",field:l=>l.unresolve.length},{name:"SRVH_ISSDT",label:"Submited Date",field:"SRVH_ISSDT",sortable:!0,align:"left"}]);const u=i([]),c=i(""),r=i(!1);i(null),g(()=>{v()});const v=async()=>{r.value=!0,await x.get("servicesAdmins/listUnapproveMgr").then(l=>{r.value=!1,u.value=l.data}).catch(l=>{r.value=!1})};return(l,_)=>(h(),S("div",T,[t("div",p,[t("div",M,[a(R,{grid:"",flat:"",bordered:"","card-container-class":l.cardContainerClass,title:"Approve Service Pricing",rows:u.value,columns:l.columns,"row-key":"name",filter:c.value,"hide-header":"",pagination:{rowsPerPage:50},"rows-per-page-options":l.rowsPerPageOptions,loading:r.value},{"top-right":s(()=>[a(f,{borderless:"",dense:"",debounce:"300",modelValue:c.value,"onUpdate:modelValue":_[0]||(_[0]=e=>c.value=e),placeholder:"Search"},{append:s(()=>[a(m,{name:"search"})]),_:1},8,["modelValue"])]),item:s(e=>[t("div",N,[a(w,{flat:"",bordered:""},{default:s(()=>[a(d,{class:b("text-center bg-green text-white")},{default:s(()=>[t("div",Q,n(e.row.SRVH_DOCNO),1)]),_:2},1024),a(C),a(d,null,{default:s(()=>[t("div",U,n(e.row.MCUS_CUSNM),1),t("div",O,n(e.row.SRVH_ISSDT),1)]),_:2},1024),a(d,null,{default:s(()=>[t("div",P,n(e.row.resolve.length)+" of "+n(e.row.detail.length),1),k]),_:2},1024),a(d,null,{default:s(()=>[t("div",I,[t("div",L,[a(V,{label:e.row.detail.filter(o=>o.TSRVD_FLGSTS===1).length==e.row.detail.length?"Waiting Cust. Approval":e.row.detail.filter(o=>o.TSRVD_FLGSTS===5).length==e.row.detail.length?"Waiting Mgr. Approval":"Resolve",color:"primary",outline:"",onClick:o=>l.onClickPreview(e.row,e.row.resolve.length==e.row.detail.length?"approve":"edit"),disable:e.row.detail.filter(o=>o.TSRVD_FLGSTS===1).length==e.row.detail.length||e.row.detail.filter(o=>o.TSRVD_FLGSTS===5).length==e.row.detail.length},null,8,["label","onClick","disable"])]),H])]),_:2},1024)]),_:2},1024)])]),_:1},8,["card-container-class","rows","columns","filter","rows-per-page-options","loading"])])])]))}};export{G as default};
