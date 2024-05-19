import{t as f,o as x,C as c,D as _,E as e,F as a,M as $,O as C,U as N,I as s,W as U,R as P,S as A,T as q,bd as I,V as F,P as p,J as i,Q as g,X as B,Y as Q,Z as K,$ as G,an as Y,aY as j}from"./index.7e2e366a.js";import{a as O,u as E,Q as z,b as H,c as d,d as n,k as J}from"./QTable.a9ee3597.js";import{api_web as V}from"./axios.6aa0ad1d.js";import{Q as W}from"./QTooltip.00ea5949.js";import{_ as X}from"./serviceOprItemAdd.1e395742.js";const Z=i("div",{class:"text-h6"},"View List Price",-1),ee=["innerHTML"],ae=["innerHTML"],le={__name:"serviceApprovalDetView",props:{idHeader:String},setup(T){const R=O(),{dialogRef:w,onDialogHide:S,onDialogOK:v,onDialogCancel:D}=E(),m=T,b=f([]),l=f(!1);x(()=>{h()});const h=async()=>{l.value=!0,await V.get(`servicesAdmins/viewUnapproveMgrDet/${btoa(m.idHeader.SRVH_DOCNO)}`).then(o=>{l.value=!1,b.value=o.data}).catch(o=>{l.value=!1})},u=o=>{let r=0;return o.map(t=>{r+=t.TSRVF_QTY*t.TSRVF_PRC}),r},k=o=>{o.listFixDet=o.list_fix_det,R.dialog({component:X,componentProps:{mode:"view",dataItem:o}}).onOk(async r=>{})},y=(o=!1)=>{R.dialog({title:`${o?"Approval Message Confirmation":"Rejection Message Confirmation"}`,message:`Please add message before ${o?"approve":"reject"} this service.`,cancel:!0,persistent:!0,prompt:{model:"",type:"text"}}).onOk(async r=>{l.value=!0,await V.put(`servicesAdmins/updateDetByIDHead/${btoa(m.idHeader.id)}`,{TSRVD_FLGSTS:o?1:0,TSRVD_MGRRMK:r}).then(t=>{l.value=!1,v()}).catch(t=>{l.value=!1})})};return(o,r)=>(c(),_(K,{ref_key:"dialogRef",ref:w,onHide:Q(S),"transition-show":"slide-up","transition-hide":"slide-down","full-width":""},{default:e(()=>[a($,{class:"q-dialog-plugin bg-white q-pa-sm"},{default:e(()=>[a(C,null,{default:e(()=>[Z]),_:1}),a(C,{class:"q-pa-sm"},{default:e(()=>[a(z,{bordered:"",loading:l.value},{default:e(()=>[b.value.length===0?N((c(),_(H,{key:0,class:"q-my-sm",clickable:""},{default:e(()=>[l.value?(c(),_(d,{key:1},{default:e(()=>[s("Please wait, loading data... ")]),_:1})):(c(),_(d,{key:0},{default:e(()=>[s(" No items added ")]),_:1}))]),_:1})),[[U]]):(c(!0),P(A,{key:1},q(b.value,(t,M)=>(c(),_(H,{key:M,class:I("q-my-sm")},{default:e(()=>[a(d,{avatar:""},{default:e(()=>[a(F,{color:t.TSRVD_FLGSTS===0?"red":"primary","text-color":"white"},{default:e(()=>[s(p(M+1),1)]),_:2},1032,["color"])]),_:2},1024),a(d,null,{default:e(()=>[a(n,null,{default:e(()=>[s(p(t.TSRVD_ITMCD),1)]),_:2},1024),a(n,{caption:""},{default:e(()=>[s(" Item ")]),_:1})]),_:2},1024),a(d,null,{default:e(()=>[a(n,null,{default:e(()=>[s(p(t.TSRVD_QTY),1)]),_:2},1024),a(n,{caption:""},{default:e(()=>[s(" Qty ")]),_:1})]),_:2},1024),a(d,null,{default:e(()=>[a(n,null,{default:e(()=>[i("div",{innerHTML:t.TSRVD_REMARK},null,8,ee)]),_:2},1024),a(n,{caption:""},{default:e(()=>[s(" Tech. Remarks")]),_:1})]),_:2},1024),a(d,null,{default:e(()=>[t.TSRVD_MGRRMK?(c(),_(n,{key:0},{default:e(()=>[i("div",{innerHTML:t.TSRVD_MGRRMK},null,8,ae)]),_:2},1024)):(c(),_(n,{key:1},{default:e(()=>[a(g,{icon:"edit",flat:"",color:"primary",onClick:L=>k(t),label:"Update Remarks"},null,8,["onClick"])]),_:2},1024)),a(n,{caption:""},{default:e(()=>[s(" Mgr. Remarks")]),_:1})]),_:2},1024),a(d,null,{default:e(()=>[a(n,null,{default:e(()=>[s("Rp. "+p(u(t.list_fix_det).toLocaleString()),1)]),_:2},1024),a(n,{caption:""},{default:e(()=>[s(" Total Fix Price ")]),_:1})]),_:2},1024),a(d,{side:""},{default:e(()=>[a(g,{icon:"visibility",flat:"",color:"primary",onClick:L=>k(t)},{default:e(()=>[a(W,null,{default:e(()=>[s("View list fix items")]),_:1})]),_:2},1032,["onClick"])]),_:2},1024)]),_:2},1024))),128))]),_:1},8,["loading"])]),_:1}),a(B,{align:"right"},{default:e(()=>[a(g,{label:"Approve",color:"primary",onClick:r[0]||(r[0]=t=>y(!0)),disable:l.value,loading:l.value},null,8,["disable","loading"]),a(g,{label:"Reject",color:"red",onClick:r[1]||(r[1]=t=>y()),loading:l.value},null,8,["loading"]),a(g,{label:"Cancel",color:"red",onClick:Q(D),disable:l.value,loading:l.value,flat:""},null,8,["onClick","disable","loading"])]),_:1})]),_:1})]),_:1},8,["onHide"]))}},te={class:"q-pa-md"},oe={class:"row"},se={class:"col"},ne={class:"q-pa-xs col-xs-12 col-sm-6 col-md-4"},ie={class:"text-h5 text-bold"},re={class:"text-h6 text-bold"},de={class:"text-subtitle2"},ce={class:"row"},ue={class:"col"},ge={__name:"serviceApproval",setup(T){const R=O();f([{name:"SRVH_DOCNO",label:"SPK No",field:"SRVH_DOCNO",sortable:!0,align:"left"},{name:"MCUS_CUSNM",label:"Customer Name",field:"MCUS_CUSNM",sortable:!0,align:"left"},{name:"resolve",label:"Resolved Line",sortable:!0,align:"left",field:l=>l.resolve.length},{name:"unresolve",label:"Unresolved Line",sortable:!0,align:"left",field:l=>l.unresolve.length},{name:"SRVH_ISSDT",label:"Submited Date",field:"SRVH_ISSDT",sortable:!0,align:"left"}]);const w=f([]),S=f(""),v=f(!1),D=f(null);x(()=>{m(),D.value=setInterval(()=>{m()},1e4)});const m=async()=>{v.value=!0,await V.get("servicesAdmins/listUnapproveMgr").then(l=>{v.value=!1,w.value=l.data}).catch(l=>{v.value=!1})},b=l=>{R.dialog({component:le,componentProps:{idHeader:l}}).onOk(async h=>{m()})};return(l,h)=>(c(),P("div",te,[i("div",oe,[i("div",se,[a(J,{grid:"",flat:"",bordered:"","card-container-class":l.cardContainerClass,title:"Approve Service Pricing",rows:w.value,columns:l.columns,"row-key":"name",filter:S.value,"hide-header":"",pagination:{rowsPerPage:50},"rows-per-page-options":l.rowsPerPageOptions,loading:v.value},{"top-right":e(()=>[a(G,{borderless:"",dense:"",debounce:"300",modelValue:S.value,"onUpdate:modelValue":h[0]||(h[0]=u=>S.value=u),placeholder:"Search"},{append:e(()=>[a(Y,{name:"search"})]),_:1},8,["modelValue"])]),item:e(u=>[i("div",ne,[a($,{flat:"",bordered:""},{default:e(()=>[a(C,{class:I("text-center bg-green text-white")},{default:e(()=>[i("div",ie,p(u.row.SRVH_DOCNO),1)]),_:2},1024),a(j),a(C,null,{default:e(()=>[i("div",re,p(u.row.MCUS_CUSNM),1),i("div",de,p(u.row.SRVH_ISSDT),1)]),_:2},1024),a(C,null,{default:e(()=>[i("div",ce,[i("div",ue,[a(g,{color:"primary",label:"View Data",onClick:k=>b(u.row)},null,8,["onClick"])])])]),_:2},1024)]),_:2},1024)])]),_:1},8,["card-container-class","rows","columns","filter","rows-per-page-options","loading"])])])]))}};export{ge as default};
