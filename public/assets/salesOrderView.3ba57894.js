import{Q as w}from"./QTooltip.2870cad8.js";import{t as c,o as W,C as p,D as h,E as l,F as e,M as ue,O as F,J as t,$ as D,an as Q,U as P,Q as T,R,a_ as re,P as E,S as Y,T as $,V as _e,I as r,W as ce,X as me,Y as B,Z as Te,aY as Se}from"./index.b073d553.js";import{a as X,u as De,l as N,Q as Oe,b as H,c as f,d as m,k as ve,m as G}from"./QTable.3919f009.js";import{Q as j,a as K}from"./QTd.a950e6ed.js";import{api_web as U,api as pe}from"./axios.56ea9882.js";import{Q as y,a as k,C as M}from"./ClosePopup.60dbcac0.js";import{Q as fe}from"./QBtnToggle.9ea49579.js";import{d as Ce}from"./date.f7d49e1f.js";import"./use-render-cache.3aae9b27.js";import"./QBtnGroup.572b8b6f.js";const Le=t("div",{class:"text-h6"},"RO Maintenance",-1),ge={style:{border:"1px black solid","border-radius":"10px"}},Ve=t("legend",{style:{"margin-left":"1em",padding:"0.2em 0.8em"}},[t("b",null,"Header")],-1),Ue={class:"row"},Ee={class:"col"},be={class:"col q-pl-md"},Ae={class:"row items-center justify-end"},Ie={class:"col q-pl-md"},Pe={class:"row items-center justify-end"},Qe={class:"row"},he={class:"col"},Re={class:"col q-pl-md"},we={class:"col q-pl-md"},ye={class:"row q-px-md"},ke={class:"col"},Me={key:0,class:"row"},Ne={class:"col"},Ye={style:{border:"1px black solid","border-radius":"10px",height:"35vh",overflow:"auto"},class:"q-pa-md"},$e=t("legend",{style:{"margin-left":"1em",padding:"0.2em 0.8em"}},[t("b",null,"Detail Items")],-1),qe={class:"row q-pb-md"},xe={class:"col"},Fe={class:"text-h6"},Be={class:"col text-right"},He={class:"row"},Ge={class:"col"},je={class:"row items-center justify-end"},Ke={class:"row items-center justify-end"},J={__name:"salesOrderCreate",props:{sloHeader:String},setup(q){const g=X(),V=q,s=c({TSLO_SLOCD:"",TSLO_ISSUDT:Ce.formatDate(Date.now(),"YYYY-MM-DD"),TSLO_PLAN_DLVDT:"",TSLO_QUOCD:"",TSLO_POCD:"",TSLO_CUSCD:"",TSLO_ATTN:"",TSLO_TYPE:1,TSLO_ADDRESS_NAME:"",TSLO_ADDRESS_DESCRIPTION:"",TSLO_SERVTRANS_COST:0});c(""),c("");const b=c([]),A=c([]),L=c([]),n=c(!1),I=c(1),C=c([]);W(async()=>{V.sloHeader&&(await Z(V.sloHeader),console.log(s.value),await O(s.value.TSLO_QUOCD)),x()});const _=(d,a,o,S)=>{a(async()=>{S==="quotation"&&await O(d),S==="item"&&await u(d),S==="cust"&&await x(d)})},O=async(d="")=>{n.value=!0,await U.post("quotation/search",{searchBy:"MCUS_CUSNM",searchValue:d}).then(a=>{n.value=!1,b.value=a.data.data}).catch(a=>{n.value=!1})},u=async d=>{n.value=!0,await U.post("item/searchAPI",{searchValue:d}).then(a=>{n.value=!1,A.value=a.data.data}).catch(()=>{n.value=!1})},v=()=>I.value===1?"Rental":I.value===2?"Sales":"Service",x=async d=>{n.value=!0,await U.post("customer/searchAPI",{searchValue:d}).then(a=>{n.value=!1,L.value=a.data.data}).catch(()=>{n.value=!1})},Z=async d=>{n.value=!0,await U.get(`receive-order/getData/${btoa(d)}`).then(a=>{n.value=!1,s.value=a.data}).catch(()=>{n.value=!1})},z=async d=>{console.log(d),n.value=!0,await pe.get(`transaction/quotation/view/${btoa(d)}`).then(a=>{n.value=!1,s.value.TSLO_CUSCD=a.data.data.TQUO_CUSCD,s.value.TSLO_ADDRESS_NAME=a.data.data.cust.MCUS_CUSNM,s.value.TSLO_ADDRESS_DESCRIPTION=a.data.data.cust.MCUS_ADDR1,s.value.TSLO_ATTN=a.data.data.TQUO_ATTN,a.data.data.det.map(o=>{C.value.push({TSLODETA_ITMCD:o.TQUODETA_ITMCD,TSLODETA_ITMQT:o.TQUODETA_ITMQT,TSLODETA_USAGE_DESCRIPTION:o.TQUODETA_USAGE,TSLODETA_PRC:o.TQUODETA_PRC,TSLODETA_PERIOD_FR:o.TQUODETA_PERIOD_FR,TSLODETA_PERIOD_TO:o.TQUODETA_PERIOD_TO})})}).catch(a=>{n.value=!1})},ee=()=>{C.value.push({TSLODETA_ITMCD:"",TSLODETA_ITMQT:"",TSLODETA_USAGE_DESCRIPTION:"",TSLODETA_PRC:0,TSLODETA_PERIOD_FR:"",TSLODETA_PERIOD_TO:""})},le=d=>{g.dialog({title:"Confirmation",message:`Do you want to delete this lines no ${d+1} ?`,cancel:!0,persistent:!0}).onOk(async()=>{C.value.splice(d,1)})},ae=()=>{g.dialog({title:"Confirmation",message:"Are you sure want to save this RO ?",cancel:!0,persistent:!0}).onOk(async()=>{n.value=!0,await U.post("receive-order/saveAPI",{...s.value,det:C.value}).then(d=>{n.value=!1,g.notify({color:"green",message:`${d.data.msg}`}),se()}).catch(()=>{n.value=!1})})},{dialogRef:oe,onDialogHide:te,onDialogOK:se,onDialogCancel:ne}=De();return(d,a)=>(p(),h(Te,{ref_key:"dialogRef",ref:oe,onHide:B(te),"transition-show":"slide-up","transition-hide":"slide-down","full-width":""},{default:l(()=>[e(ue,{class:"q-dialog-plugin bg-white q-pa-sm"},{default:l(()=>[e(F,null,{default:l(()=>[Le]),_:1}),e(F,{class:"q-pa-sm"},{default:l(()=>[t("fieldset",ge,[Ve,t("div",Ue,[t("div",Ee,[e(D,{label:"RO Code",dense:"",filled:"",modelValue:s.value.TSLO_SLOCD,"onUpdate:modelValue":a[0]||(a[0]=o=>s.value.TSLO_SLOCD=o),disable:"",loading:n.value},null,8,["modelValue","loading"])]),t("div",be,[e(D,{filled:"",modelValue:s.value.TSLO_ISSUDT,"onUpdate:modelValue":a[2]||(a[2]=o=>s.value.TSLO_ISSUDT=o),dense:"",label:"Issue Date",loading:n.value,onClick:a[3]||(a[3]=o=>d.quotationIssueDate.qDateProxy.show()),mask:"####-##-##","fill-mask":"",hint:"Mask: YYYY-MM-DD"},{append:l(()=>[e(Q,{name:"event",class:"cursor-pointer"},{default:l(()=>[e(y,{cover:"","transition-show":"scale","transition-hide":"scale"},{default:l(()=>[e(k,{modelValue:s.value.TSLO_ISSUDT,"onUpdate:modelValue":a[1]||(a[1]=o=>s.value.TSLO_ISSUDT=o),mask:"YYYY-MM-DD"},{default:l(()=>[t("div",Ae,[P(e(T,{label:"Close",color:"primary",flat:""},null,512),[[M]])])]),_:1},8,["modelValue"])]),_:1})]),_:1})]),_:1},8,["modelValue","loading"])]),t("div",Ie,[e(D,{filled:"",modelValue:s.value.TSLO_PLAN_DLVDT,"onUpdate:modelValue":a[5]||(a[5]=o=>s.value.TSLO_PLAN_DLVDT=o),dense:"",label:"Delivery Date",loading:n.value,onClick:a[6]||(a[6]=o=>d.quotationIssueDate.qDateProxy.show()),mask:"####-##-##","fill-mask":"",hint:"Mask: YYYY-MM-DD"},{append:l(()=>[e(Q,{name:"event",class:"cursor-pointer"},{default:l(()=>[e(y,{cover:"","transition-show":"scale","transition-hide":"scale"},{default:l(()=>[e(k,{modelValue:s.value.TSLO_PLAN_DLVDT,"onUpdate:modelValue":a[4]||(a[4]=o=>s.value.TSLO_PLAN_DLVDT=o),mask:"YYYY-MM-DD"},{default:l(()=>[t("div",Pe,[P(e(T,{label:"Close",color:"primary",flat:""},null,512),[[M]])])]),_:1},8,["modelValue"])]),_:1})]),_:1})]),_:1},8,["modelValue","loading"])])]),t("div",Qe,[t("div",he,[e(N,{dense:"",filled:"",label:"Sales Quotation Code",modelValue:s.value.TSLO_QUOCD,"onUpdate:modelValue":[a[7]||(a[7]=o=>s.value.TSLO_QUOCD=o),z],"use-input":"","input-debounce":"500",options:b.value,onFilter:a[8]||(a[8]=(o,S,i)=>_(o,S,i,"quotation")),behavior:"dialog","option-label":"DESCSEL","option-value":"TQUO_QUOCD","emit-value":"","map-options":"",loading:n.value},null,8,["modelValue","options","loading"])]),t("div",Re,[e(D,{label:"PO Number",dense:"",filled:"",modelValue:s.value.TSLO_POCD,"onUpdate:modelValue":a[9]||(a[9]=o=>s.value.TSLO_POCD=o),loading:n.value},null,8,["modelValue","loading"])]),t("div",we,[e(N,{dense:"",filled:"",label:"Customer Name",modelValue:s.value.TSLO_CUSCD,"onUpdate:modelValue":a[10]||(a[10]=o=>s.value.TSLO_CUSCD=o),"use-input":"","input-debounce":"500",options:L.value,onFilter:a[11]||(a[11]=(o,S,i)=>_(o,S,i,"cust")),behavior:"dialog","option-label":"MCUS_CUSNM","option-value":"MCUS_CUSCD","emit-value":"","map-options":"",loading:n.value,readonly:I.value===3},null,8,["modelValue","options","loading","readonly"])])])]),t("div",ye,[t("div",ke,[e(fe,{modelValue:s.value.TSLO_TYPE,"onUpdate:modelValue":a[12]||(a[12]=o=>s.value.TSLO_TYPE=o),spread:"","no-caps":"","toggle-color":"purple",color:"white","text-color":"black",options:[{label:"Rental",value:1},{label:"Sales",value:2},{label:"Service",value:3}]},null,8,["modelValue"])])]),s.value.TSLO_TYPE>1?(p(),R("div",Me,[t("div",Ne,[e(D,{prefix:"Rp",label:"Service & Transportation Price",modelValue:s.value.TSLO_SERVTRANS_COST,"onUpdate:modelValue":a[13]||(a[13]=o=>s.value.TSLO_SERVTRANS_COST=o),filled:"",dense:"",loading:n.value},null,8,["modelValue","loading"])])])):re("",!0),t("fieldset",Ye,[$e,t("div",qe,[t("div",xe,[t("span",Fe,E(v()),1)]),t("div",Be,[e(T,{flat:"",icon:"add",color:"blue",label:"Add Lines",onClick:ee,loading:n.value},null,8,["loading"])])]),t("div",He,[t("div",Ge,[e(Oe,{bordered:"",dense:""},{default:l(()=>[C.value.length>0?(p(!0),R(Y,{key:0},$(C.value,(o,S)=>(p(),h(H,{key:S,class:"q-my-sm",dense:""},{default:l(()=>[e(f,{avatar:""},{default:l(()=>[e(_e,{"text-color":"blue"},{default:l(()=>[r(E(S+1),1)]),_:2},1024)]),_:2},1024),e(f,null,{default:l(()=>[e(m,{class:"text-center"},{default:l(()=>[e(N,{dense:"",filled:"",label:"Item Name",modelValue:o.TSLODETA_ITMCD,"onUpdate:modelValue":i=>o.TSLODETA_ITMCD=i,"use-input":"","input-debounce":"500",options:A.value,onFilter:a[14]||(a[14]=(i,de,ie)=>_(i,de,ie,"item")),behavior:"dialog","option-label":"MITM_ITMNM","option-value":"MITM_ITMNM","emit-value":"","map-options":"",loading:n.value},null,8,["modelValue","onUpdate:modelValue","options","loading"])]),_:2},1024),e(m,{caption:""},{default:l(()=>[r(" Item Name ")]),_:1})]),_:2},1024),e(f,null,{default:l(()=>[e(m,null,{default:l(()=>[e(D,{modelValue:o.TSLODETA_ITMQT,"onUpdate:modelValue":i=>o.TSLODETA_ITMQT=i,dense:""},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1024),e(m,{caption:""},{default:l(()=>[r(" Qty ")]),_:1})]),_:2},1024),e(f,null,{default:l(()=>[e(m,null,{default:l(()=>[e(D,{modelValue:o.TSLODETA_USAGE_DESCRIPTION,"onUpdate:modelValue":i=>o.TSLODETA_USAGE_DESCRIPTION=i,dense:""},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1024),e(m,{caption:""},{default:l(()=>[r(" Usage ")]),_:1})]),_:2},1024),e(f,null,{default:l(()=>[e(m,null,{default:l(()=>[e(D,{modelValue:o.TSLODETA_PRC,"onUpdate:modelValue":i=>o.TSLODETA_PRC=i,dense:""},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1024),e(m,{caption:""},{default:l(()=>[r(" Price ")]),_:1})]),_:2},1024),e(f,null,{default:l(()=>[e(m,null,{default:l(()=>[e(D,{filled:"",modelValue:o.TSLODETA_PERIOD_FROM,"onUpdate:modelValue":i=>o.TSLODETA_PERIOD_FROM=i,dense:"",loading:n.value,onClick:a[15]||(a[15]=i=>d.quotationIssueDate.qDateProxy.show()),mask:"####-##-##","fill-mask":""},{append:l(()=>[e(Q,{name:"event",class:"cursor-pointer"},{default:l(()=>[e(y,{cover:"","transition-show":"scale","transition-hide":"scale"},{default:l(()=>[e(k,{modelValue:o.TSLODETA_PERIOD_FROM,"onUpdate:modelValue":i=>o.TSLODETA_PERIOD_FROM=i,mask:"YYYY-MM-DD"},{default:l(()=>[t("div",je,[P(e(T,{label:"Close",color:"primary",flat:""},null,512),[[M]])])]),_:2},1032,["modelValue","onUpdate:modelValue"])]),_:2},1024)]),_:2},1024)]),_:2},1032,["modelValue","onUpdate:modelValue","loading"])]),_:2},1024),e(m,{caption:""},{default:l(()=>[r(" Period From ")]),_:1})]),_:2},1024),e(f,null,{default:l(()=>[e(m,null,{default:l(()=>[e(D,{filled:"",modelValue:o.TSLODETA_PERIOD_TO,"onUpdate:modelValue":i=>o.TSLODETA_PERIOD_TO=i,dense:"",loading:n.value,onClick:a[16]||(a[16]=i=>d.quotationIssueDate.qDateProxy.show()),mask:"####-##-##","fill-mask":""},{append:l(()=>[e(Q,{name:"event",class:"cursor-pointer"},{default:l(()=>[e(y,{cover:"","transition-show":"scale","transition-hide":"scale"},{default:l(()=>[e(k,{modelValue:o.TSLODETA_PERIOD_TO,"onUpdate:modelValue":i=>o.TSLODETA_PERIOD_TO=i,mask:"YYYY-MM-DD"},{default:l(()=>[t("div",Ke,[P(e(T,{label:"Close",color:"primary",flat:""},null,512),[[M]])])]),_:2},1032,["modelValue","onUpdate:modelValue"])]),_:2},1024)]),_:2},1024)]),_:2},1032,["modelValue","onUpdate:modelValue","loading"])]),_:2},1024),e(m,{caption:""},{default:l(()=>[r(" Period To ")]),_:1})]),_:2},1024),e(f,{side:""},{default:l(()=>[e(T,{icon:"delete",color:"red",flat:"",onClick:i=>le(S)},null,8,["onClick"])]),_:2},1024)]),_:2},1024))),128)):P((p(),h(H,{key:1,class:"q-my-sm",clickable:""},{default:l(()=>[e(f,null,{default:l(()=>[e(m,null,{default:l(()=>[r(" No Items Added ")]),_:1})]),_:1})]),_:1})),[[ce]])]),_:1})])])])]),_:1}),e(me,{align:"right"},{default:l(()=>[e(T,{label:"OK",color:"primary",onClick:a[17]||(a[17]=o=>ae()),disable:d.stateSubmit,loading:n.value},null,8,["disable","loading"]),e(T,{flat:"",label:"Cancel",color:"red",onClick:B(ne)},null,8,["onClick"])]),_:1})]),_:1})]),_:1},8,["onHide"]))}};const Je={class:"q-pa-md"},We={class:"row q-pb-md"},Xe=t("div",{class:"col"},[t("span",{class:"text-h4"},"Sales Order / Receive Order")],-1),Ze={class:"col text-right"},ze={class:"row q-pt-md"},el={class:"col"},_l={__name:"salesOrderView",setup(q){const g=X(),V=c("TSLO_SLOCD"),s=c(""),b=c([]),A=c([{name:"TSLO_SLOCD",label:"RO. Code",field:"TSLO_SLOCD",sortable:!0,align:"left"},{name:"MCUS_CUSNM",label:"Customer Name",field:"MCUS_CUSNM",sortable:!0,align:"left"},{name:"TSLO_ADDRESS_NAME",label:"Customer Addr.",field:"TSLO_ADDRESS_NAME",sortable:!0,align:"left"},{name:"TSLO_CUSCD",label:"Customer Code",field:"TSLO_CUSCD",sortable:!0,align:"left"},{name:"TSLO_ISSUDT",label:"Issue Date",field:"TSLO_ISSUDT",sortable:!0,align:"left"},{name:"TSLO_QUOCD",label:"Quot. Code",field:"TSLO_QUOCD",sortable:!0,align:"left"}]),L=c(!1);W(()=>{n()});const n=async()=>{L.value=!0,await U.post("receive-order/searchAPI",{searchBy:V.value,searchValue:s.value}).then(_=>{L.value=!1,b.value=_.data.data}).catch(_=>{L.value=!1})},I=()=>{g.dialog({component:J}).onOk(async _=>{n()})},C=_=>{console.log(_),g.dialog({component:J,componentProps:{sloHeader:_}}).onOk(async O=>{dataQuo()})};return(_,O)=>(p(),R("div",Je,[t("div",We,[Xe,t("div",Ze,[e(T,{icon:"add",color:"blue",onClick:I},{default:l(()=>[e(w,null,{default:l(()=>[r("Create New RO")]),_:1})]),_:1})])]),e(Se),t("div",ze,[t("div",el,[e(ve,{title:"Created RO",rows:b.value,columns:A.value,"row-key":"name",loading:L.value,dense:"",pagination:{rowsPerPage:20},class:"my-sticky-header-column-table"},{"top-right":l(()=>[e(N,{outlined:"",modelValue:V.value,"onUpdate:modelValue":O[0]||(O[0]=u=>V.value=u),options:A.value,label:"Search Columns","option-value":"name","option-label":"label","emit-value":"",dense:"","map-options":""},null,8,["modelValue","options"]),e(D,{borderless:"",dense:"",modelValue:s.value,"onUpdate:modelValue":[O[1]||(O[1]=u=>s.value=u),O[2]||(O[2]=u=>_.dataQuo())],placeholder:"Search",outlined:"",debounce:"1000"},{append:l(()=>[e(Q,{name:"search"})]),_:1},8,["modelValue"])]),header:l(u=>[e(j,{props:u},{default:l(()=>[e(G,{"auto-width":""},{default:l(()=>[r("Action")]),_:1}),(p(!0),R(Y,null,$(u.cols,v=>(p(),h(G,{key:v.name,props:u},{default:l(()=>[r(E(v.label),1)]),_:2},1032,["props"]))),128))]),_:2},1032,["props"])]),body:l(u=>[e(j,{props:u},{default:l(()=>[e(K,{"auto-width":""},{default:l(()=>[e(T,{flat:"",color:u.row.TQUO_APPRVDT!==null?"grey":"orange",icon:"edit",onClick:v=>C(u.row.TSLO_SLOCD),dense:""},{default:l(()=>[e(w,null,{default:l(()=>[r(E(u.row.TQUO_APPRVDT?"Quotation already approved, cannot edit !":"Edit this quotation"),1)]),_:2},1024)]),_:2},1032,["color","onClick"]),e(T,{flat:"",color:u.row.TQUO_APPRVDT!==null?"grey":"red",icon:"delete",onClick:v=>_.onClickDelete(u.row.TQUO_QUOCD),dense:"",disable:u.row.TQUO_APPRVDT!==null},{default:l(()=>[e(w,null,{default:l(()=>[r(E(u.row.TQUO_APPRVDT?"Quotation already approved, cannot delete !":"Delete this quotation"),1)]),_:2},1024)]),_:2},1032,["color","onClick","disable"]),e(T,{flat:"",color:"indigo",icon:"print",onClick:v=>_.onClickPrint(u.row.TQUO_QUOCD),dense:""},{default:l(()=>[e(w,null,{default:l(()=>[r("Print this quotation")]),_:1})]),_:2},1032,["onClick"])]),_:2},1024),(p(!0),R(Y,null,$(u.cols,v=>(p(),h(K,{key:v.name,props:u},{default:l(()=>[r(E(v.value),1)]),_:2},1032,["props"]))),128))]),_:2},1032,["props"])]),_:1},8,["rows","columns","loading"])])])]))}};export{_l as default};
