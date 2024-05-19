import{Q as Y}from"./QTooltip.eb29a4ba.js";import{t as r,o as W,C as f,D as w,E as l,F as e,M as re,O as F,J as n,$ as O,an as h,U as P,Q as S,R,a_ as _e,a0 as ce,P as b,S as $,T as q,V as me,I as _,W as Te,X as Se,Y as H,Z as ve,aY as Oe}from"./index.6a60f6d4.js";import{a as X,u as De,l as M,Q as pe,b as B,c as L,d as c,k as fe,m as G}from"./QTable.2f297dc1.js";import{Q as j,a as K}from"./QTd.b6a41725.js";import{api_web as E,api as Ce}from"./axios.0fb5b4bd.js";import{Q as y,a as Q,C as k}from"./ClosePopup.4821f7cb.js";import{Q as Le}from"./QBtnToggle.7fb912ca.js";import{d as ge}from"./date.93c4e03e.js";import"./use-render-cache.3aae9b27.js";import"./QBtnGroup.9138e9b3.js";const Ve=n("div",{class:"text-h6"},"RO Maintenance",-1),Ee={style:{border:"1px black solid","border-radius":"10px"}},be=n("legend",{style:{"margin-left":"1em",padding:"0.2em 0.8em"}},[n("b",null,"Header")],-1),Ae={class:"row"},Ue={class:"col"},Ie={class:"col q-pl-md"},Pe={class:"row items-center justify-end"},he={class:"col q-pl-md"},we={class:"row items-center justify-end"},Re={class:"row"},ye={class:"col"},Qe={class:"col q-pl-md"},ke={class:"col q-pl-md"},Me={class:"row q-py-md"},Ne={class:"col"},Ye={key:0,class:"row"},$e={class:"col"},qe={class:"row"},xe={class:"col"},Fe={style:{border:"1px black solid","border-radius":"10px",height:"35vh",overflow:"auto"},class:"q-pa-md"},He=n("legend",{style:{"margin-left":"1em",padding:"0.2em 0.8em"}},[n("b",null,"Detail Items")],-1),Be={class:"row q-pb-md"},Ge={class:"col"},je={class:"text-h6"},Ke={class:"col text-right"},Je={class:"row"},We={class:"col"},Xe={class:"row items-center justify-end"},Ze={class:"row items-center justify-end"},J={__name:"salesOrderCreate",props:{sloHeader:String},setup(x){const g=X(),V=x,t=r({TSLO_SLOCD:"",TSLO_ISSUDT:ge.formatDate(Date.now(),"YYYY-MM-DD"),TSLO_PLAN_DLVDT:"",TSLO_QUOCD:"",TSLO_POCD:"",TSLO_CUSCD:"",TSLO_ATTN:"",TSLO_TYPE:1,TSLO_ADDRESS_NAME:"",TSLO_ADDRESS_DESCRIPTION:"",TSLO_SERVTRANS_COST:0,TSLO_ISCON:!1});r(""),r("");const A=r([]),U=r([]),C=r([]),s=r(!1),N=r(1),D=r([]);W(async()=>{V.sloHeader&&V.sloHeader!==""&&(await Z(V.sloHeader),console.log(t.value),await m(t.value.TSLO_QUOCD)),p()});const I=(d,a,o,v)=>{a(async()=>{v==="quotation"&&await m(d),v==="item"&&await T(d),v==="cust"&&await p(d)})},m=async(d="")=>{s.value=!0,await E.post("quotation/search",{searchBy:"MCUS_CUSNM",searchValue:d,approval:1}).then(a=>{s.value=!1,A.value=a.data.data}).catch(a=>{s.value=!1})},T=async d=>{s.value=!0,await E.post("item/searchAPI",{searchValue:d}).then(a=>{s.value=!1,U.value=a.data.data}).catch(()=>{s.value=!1})},u=()=>t.value.TSLO_TYPE===1?"Rental":t.value.TSLO_TYPE===2?"Sales":"Service",p=async d=>{s.value=!0,await E.post("customer/searchAPI",{searchValue:d}).then(a=>{s.value=!1,C.value=a.data.data}).catch(()=>{s.value=!1})},Z=async d=>{s.value=!0,await E.get(`receive-order/getData/${btoa(d)}`).then(a=>{s.value=!1,console.log(a.data.det),t.value=a.data,D.value=a.data.det}).catch(()=>{s.value=!1})},z=async d=>{console.log(d),s.value=!0,await Ce.get(`transaction/quotation/view/${btoa(d)}`).then(a=>{s.value=!1,t.value.TSLO_CUSCD=a.data.data.TQUO_CUSCD,t.value.TSLO_ADDRESS_NAME=a.data.data.cust.MCUS_CUSNM,t.value.TSLO_ADDRESS_DESCRIPTION=a.data.data.cust.MCUS_ADDR1,t.value.TSLO_ATTN=a.data.data.TQUO_ATTN,D.value=[],a.data.data.det.map(o=>{D.value.push({TSLODETA_ITMCD:o.TQUODETA_ITMCD,TSLODETA_ITMQT:o.TQUODETA_ITMQT,TSLODETA_USAGE_DESCRIPTION:o.TQUODETA_USAGE,TSLODETA_PRC:o.TQUODETA_PRC,TSLODETA_PERIOD_FR:o.TQUODETA_PERIOD_FR,TSLODETA_PERIOD_TO:o.TQUODETA_PERIOD_TO})})}).catch(a=>{s.value=!1})},ee=()=>{D.value.push({TSLODETA_ITMCD:"",TSLODETA_ITMQT:"",TSLODETA_USAGE_DESCRIPTION:"",TSLODETA_PRC:0,TSLODETA_PERIOD_FR:"",TSLODETA_PERIOD_TO:""})},le=d=>{g.dialog({title:"Confirmation",message:`Do you want to delete this lines no ${d+1} ?`,cancel:!0,persistent:!0}).onOk(async()=>{D.value.splice(d,1)})},ae=()=>{g.dialog({title:"Confirmation",message:"Are you sure want to save this RO ?",cancel:!0,persistent:!0}).onOk(async()=>{s.value=!0,await E.post("receive-order/saveAPI",{...t.value,det:D.value}).then(d=>{s.value=!1,g.notify({color:"green",message:`${d.data.msg}`}),ne()}).catch(()=>{s.value=!1})})},oe=()=>{},{dialogRef:te,onDialogHide:se,onDialogOK:ne,onDialogCancel:de}=De();return(d,a)=>(f(),w(ve,{ref_key:"dialogRef",ref:te,onHide:H(se),"transition-show":"slide-up","transition-hide":"slide-down","full-width":""},{default:l(()=>[e(re,{class:"q-dialog-plugin bg-white q-pa-sm"},{default:l(()=>[e(F,null,{default:l(()=>[Ve]),_:1}),e(F,{class:"q-pa-sm"},{default:l(()=>[n("fieldset",Ee,[be,n("div",Ae,[n("div",Ue,[e(O,{label:"RO Code",dense:"",filled:"",modelValue:t.value.TSLO_SLOCD,"onUpdate:modelValue":a[0]||(a[0]=o=>t.value.TSLO_SLOCD=o),disable:"",loading:s.value},null,8,["modelValue","loading"])]),n("div",Ie,[e(O,{filled:"",modelValue:t.value.TSLO_ISSUDT,"onUpdate:modelValue":a[2]||(a[2]=o=>t.value.TSLO_ISSUDT=o),dense:"",label:"Issue Date",loading:s.value,onClick:a[3]||(a[3]=o=>d.quotationIssueDate.qDateProxy.show()),mask:"####-##-##","fill-mask":"",hint:"Mask: YYYY-MM-DD"},{append:l(()=>[e(h,{name:"event",class:"cursor-pointer"},{default:l(()=>[e(y,{cover:"","transition-show":"scale","transition-hide":"scale"},{default:l(()=>[e(Q,{modelValue:t.value.TSLO_ISSUDT,"onUpdate:modelValue":a[1]||(a[1]=o=>t.value.TSLO_ISSUDT=o),mask:"YYYY-MM-DD"},{default:l(()=>[n("div",Pe,[P(e(S,{label:"Close",color:"primary",flat:""},null,512),[[k]])])]),_:1},8,["modelValue"])]),_:1})]),_:1})]),_:1},8,["modelValue","loading"])]),n("div",he,[e(O,{filled:"",modelValue:t.value.TSLO_PLAN_DLVDT,"onUpdate:modelValue":a[5]||(a[5]=o=>t.value.TSLO_PLAN_DLVDT=o),dense:"",label:"Delivery Date",loading:s.value,onClick:a[6]||(a[6]=o=>d.quotationIssueDate.qDateProxy.show()),mask:"####-##-##","fill-mask":"",hint:"Mask: YYYY-MM-DD"},{append:l(()=>[e(h,{name:"event",class:"cursor-pointer"},{default:l(()=>[e(y,{cover:"","transition-show":"scale","transition-hide":"scale"},{default:l(()=>[e(Q,{modelValue:t.value.TSLO_PLAN_DLVDT,"onUpdate:modelValue":a[4]||(a[4]=o=>t.value.TSLO_PLAN_DLVDT=o),mask:"YYYY-MM-DD"},{default:l(()=>[n("div",we,[P(e(S,{label:"Close",color:"primary",flat:""},null,512),[[k]])])]),_:1},8,["modelValue"])]),_:1})]),_:1})]),_:1},8,["modelValue","loading"])])]),n("div",Re,[n("div",ye,[e(M,{dense:"",filled:"",label:"Sales Quotation Code",modelValue:t.value.TSLO_QUOCD,"onUpdate:modelValue":[a[7]||(a[7]=o=>t.value.TSLO_QUOCD=o),z],"use-input":"","input-debounce":"500",options:A.value,onFilter:a[8]||(a[8]=(o,v,i)=>I(o,v,i,"quotation")),behavior:"dialog","option-label":"DESCSEL","option-value":"TQUO_QUOCD","emit-value":"","map-options":"",loading:s.value},null,8,["modelValue","options","loading"])]),n("div",Qe,[e(O,{label:"PO Number",dense:"",filled:"",modelValue:t.value.TSLO_POCD,"onUpdate:modelValue":a[9]||(a[9]=o=>t.value.TSLO_POCD=o),loading:s.value},null,8,["modelValue","loading"])]),n("div",ke,[e(M,{dense:"",filled:"",label:"Customer Name",modelValue:t.value.TSLO_CUSCD,"onUpdate:modelValue":a[10]||(a[10]=o=>t.value.TSLO_CUSCD=o),"use-input":"","input-debounce":"500",options:C.value,onFilter:a[11]||(a[11]=(o,v,i)=>I(o,v,i,"cust")),behavior:"dialog","option-label":"MCUS_CUSNM","option-value":"MCUS_CUSCD","emit-value":"","map-options":"",loading:s.value,readonly:N.value===3},null,8,["modelValue","options","loading","readonly"])])])]),n("div",Me,[n("div",Ne,[e(Le,{modelValue:t.value.TSLO_TYPE,"onUpdate:modelValue":a[12]||(a[12]=o=>t.value.TSLO_TYPE=o),spread:"","no-caps":"","toggle-color":"purple",color:"white","text-color":"black",options:[{label:"Rental",value:1},{label:"Sales",value:2},{label:"Service",value:3}]},null,8,["modelValue"])])]),t.value.TSLO_TYPE!=1?(f(),R("div",Ye,[n("div",$e,[e(O,{prefix:"Rp",label:"Service & Transportation Price",modelValue:t.value.TSLO_SERVTRANS_COST,"onUpdate:modelValue":a[13]||(a[13]=o=>t.value.TSLO_SERVTRANS_COST=o),filled:"",dense:""},null,8,["modelValue"])])])):_e("",!0),n("div",qe,[n("div",xe,[e(ce,{modelValue:t.value.TSLO_ISCON,"onUpdate:modelValue":a[14]||(a[14]=o=>t.value.TSLO_ISCON=o),label:"Is Contract ?",color:"teal","toggle-indeterminate":!1,"indeterminate-value":"0"},null,8,["modelValue"])])]),n("fieldset",Fe,[He,n("div",Be,[n("div",Ge,[n("span",je,b(u()),1)]),n("div",Ke,[e(S,{flat:"",icon:"add",color:"blue",label:"Add Lines",onClick:ee,loading:s.value},null,8,["loading"]),e(S,{flat:"",icon:"person",color:"indigo",label:"Customer",onClick:oe,loading:s.value},null,8,["loading"])])]),n("div",Je,[n("div",We,[e(pe,{bordered:"",dense:""},{default:l(()=>[D.value.length>0?(f(!0),R($,{key:0},q(D.value,(o,v)=>(f(),w(B,{key:v,class:"q-my-sm",dense:""},{default:l(()=>[e(L,{avatar:""},{default:l(()=>[e(me,{"text-color":"blue"},{default:l(()=>[_(b(v+1),1)]),_:2},1024)]),_:2},1024),e(L,null,{default:l(()=>[e(c,{class:"text-center"},{default:l(()=>[e(M,{dense:"",filled:"",label:"Item Name",modelValue:o.TSLODETA_ITMCD,"onUpdate:modelValue":i=>o.TSLODETA_ITMCD=i,"use-input":"","input-debounce":"500",options:U.value,onFilter:a[15]||(a[15]=(i,ie,ue)=>I(i,ie,ue,"item")),behavior:"dialog","option-label":"MITM_ITMNM","option-value":"MITM_ITMNM","emit-value":"","map-options":"",loading:s.value},null,8,["modelValue","onUpdate:modelValue","options","loading"])]),_:2},1024),e(c,{caption:""},{default:l(()=>[_(" Item Name ")]),_:1})]),_:2},1024),e(L,null,{default:l(()=>[e(c,null,{default:l(()=>[e(O,{modelValue:o.TSLODETA_ITMQT,"onUpdate:modelValue":i=>o.TSLODETA_ITMQT=i,dense:""},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1024),e(c,{caption:""},{default:l(()=>[_(" Qty ")]),_:1})]),_:2},1024),e(L,null,{default:l(()=>[e(c,null,{default:l(()=>[e(O,{modelValue:o.TSLODETA_USAGE_DESCRIPTION,"onUpdate:modelValue":i=>o.TSLODETA_USAGE_DESCRIPTION=i,dense:""},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1024),e(c,{caption:""},{default:l(()=>[_(" Usage ")]),_:1})]),_:2},1024),e(L,null,{default:l(()=>[e(c,null,{default:l(()=>[e(O,{modelValue:o.TSLODETA_PRC,"onUpdate:modelValue":i=>o.TSLODETA_PRC=i,dense:""},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1024),e(c,{caption:""},{default:l(()=>[_(" Price ")]),_:1})]),_:2},1024),e(L,null,{default:l(()=>[e(c,null,{default:l(()=>[e(O,{filled:"",modelValue:o.TSLODETA_PERIOD_FR,"onUpdate:modelValue":i=>o.TSLODETA_PERIOD_FR=i,dense:"",loading:s.value,onClick:a[16]||(a[16]=i=>d.quotationIssueDate.qDateProxy.show()),mask:"####-##-##","fill-mask":""},{append:l(()=>[e(h,{name:"event",class:"cursor-pointer"},{default:l(()=>[e(y,{cover:"","transition-show":"scale","transition-hide":"scale"},{default:l(()=>[e(Q,{modelValue:o.TSLODETA_PERIOD_FR,"onUpdate:modelValue":i=>o.TSLODETA_PERIOD_FR=i,mask:"YYYY-MM-DD"},{default:l(()=>[n("div",Xe,[P(e(S,{label:"Close",color:"primary",flat:""},null,512),[[k]])])]),_:2},1032,["modelValue","onUpdate:modelValue"])]),_:2},1024)]),_:2},1024)]),_:2},1032,["modelValue","onUpdate:modelValue","loading"])]),_:2},1024),e(c,{caption:""},{default:l(()=>[_(" Period From ")]),_:1})]),_:2},1024),e(L,null,{default:l(()=>[e(c,null,{default:l(()=>[e(O,{filled:"",modelValue:o.TSLODETA_PERIOD_TO,"onUpdate:modelValue":i=>o.TSLODETA_PERIOD_TO=i,dense:"",loading:s.value,onClick:a[17]||(a[17]=i=>d.quotationIssueDate.qDateProxy.show()),mask:"####-##-##","fill-mask":""},{append:l(()=>[e(h,{name:"event",class:"cursor-pointer"},{default:l(()=>[e(y,{cover:"","transition-show":"scale","transition-hide":"scale"},{default:l(()=>[e(Q,{modelValue:o.TSLODETA_PERIOD_TO,"onUpdate:modelValue":i=>o.TSLODETA_PERIOD_TO=i,mask:"YYYY-MM-DD"},{default:l(()=>[n("div",Ze,[P(e(S,{label:"Close",color:"primary",flat:""},null,512),[[k]])])]),_:2},1032,["modelValue","onUpdate:modelValue"])]),_:2},1024)]),_:2},1024)]),_:2},1032,["modelValue","onUpdate:modelValue","loading"])]),_:2},1024),e(c,{caption:""},{default:l(()=>[_(" Period To ")]),_:1})]),_:2},1024),e(L,{side:""},{default:l(()=>[e(S,{icon:"delete",color:"red",flat:"",onClick:i=>le(v)},null,8,["onClick"])]),_:2},1024)]),_:2},1024))),128)):P((f(),w(B,{key:1,class:"q-my-sm",clickable:""},{default:l(()=>[e(L,null,{default:l(()=>[e(c,null,{default:l(()=>[_(" No Items Added ")]),_:1})]),_:1})]),_:1})),[[Te]])]),_:1})])])])]),_:1}),e(Se,{align:"right"},{default:l(()=>[e(S,{label:"OK",color:"primary",onClick:a[18]||(a[18]=o=>ae()),disable:d.stateSubmit,loading:s.value},null,8,["disable","loading"]),e(S,{flat:"",label:"Cancel",color:"red",onClick:H(de)},null,8,["onClick"])]),_:1})]),_:1})]),_:1},8,["onHide"]))}};const ze={class:"q-pa-md"},el={class:"row q-pb-md"},ll=n("div",{class:"col"},[n("span",{class:"text-h4"},"Sales Order / Receive Order")],-1),al={class:"col text-right"},ol={class:"row q-pt-md"},tl={class:"col"},Sl={__name:"salesOrderView",setup(x){const g=X(),V=r("TSLO_SLOCD"),t=r(""),A=r([]),U=r([{name:"TSLO_SLOCD",label:"RO. Code",field:"TSLO_SLOCD",sortable:!0,align:"left"},{name:"MCUS_CUSNM",label:"Customer Name",field:"MCUS_CUSNM",sortable:!0,align:"left"},{name:"TSLO_ADDRESS_NAME",label:"Customer Addr.",field:"TSLO_ADDRESS_NAME",sortable:!0,align:"left"},{name:"TSLO_CUSCD",label:"Customer Code",field:"TSLO_CUSCD",sortable:!0,align:"left"},{name:"TSLO_ISSUDT",label:"Issue Date",field:"TSLO_ISSUDT",sortable:!0,align:"left"},{name:"TSLO_QUOCD",label:"Quot. Code",field:"TSLO_QUOCD",sortable:!0,align:"left"}]),C=r(!1);W(()=>{s()});const s=async()=>{C.value=!0,await E.post("receive-order/searchAPI",{searchBy:V.value,searchValue:t.value}).then(m=>{C.value=!1,A.value=m.data.data}).catch(m=>{C.value=!1})},N=()=>{g.dialog({component:J}).onOk(async m=>{s()})},D=m=>{console.log(m),g.dialog({component:J,componentProps:{sloHeader:m}}).onOk(async T=>{s()})},I=m=>{g.dialog({title:"Confirmation",message:"Are you sure want to delete this data ?",cancel:!0,persistent:!0}).onOk(async()=>{C.value=!0,await E.delete(`receive-order/itemsAPI/${btoa(m)}`).then(T=>{C.value=!1,s()})})};return(m,T)=>(f(),R("div",ze,[n("div",el,[ll,n("div",al,[e(S,{icon:"add",color:"blue",onClick:T[0]||(T[0]=u=>N())},{default:l(()=>[e(Y,null,{default:l(()=>[_("Create New RO")]),_:1})]),_:1})])]),e(Oe),n("div",ol,[n("div",tl,[e(fe,{title:"Created RO",rows:A.value,columns:U.value,"row-key":"name",loading:C.value,dense:"",pagination:{rowsPerPage:20},class:"my-sticky-header-column-table"},{"top-right":l(()=>[e(M,{outlined:"",modelValue:V.value,"onUpdate:modelValue":T[1]||(T[1]=u=>V.value=u),options:U.value,label:"Search Columns","option-value":"name","option-label":"label","emit-value":"",dense:"","map-options":""},null,8,["modelValue","options"]),e(O,{borderless:"",dense:"",modelValue:t.value,"onUpdate:modelValue":[T[2]||(T[2]=u=>t.value=u),T[3]||(T[3]=u=>s())],placeholder:"Search",outlined:"",debounce:"1000"},{append:l(()=>[e(h,{name:"search"})]),_:1},8,["modelValue"])]),header:l(u=>[e(j,{props:u},{default:l(()=>[e(G,{"auto-width":""},{default:l(()=>[_("Action")]),_:1}),(f(!0),R($,null,q(u.cols,p=>(f(),w(G,{key:p.name,props:u},{default:l(()=>[_(b(p.label),1)]),_:2},1032,["props"]))),128))]),_:2},1032,["props"])]),body:l(u=>[e(j,{props:u},{default:l(()=>[e(K,{"auto-width":""},{default:l(()=>[e(S,{flat:"",color:u.row.TSLO_APPRVDT!==null?"grey":"orange",icon:"edit",onClick:p=>D(u.row.TSLO_SLOCD),dense:""},{default:l(()=>[e(Y,null,{default:l(()=>[_(b(u.row.TSLO_APPRVDT?"Quotation already approved, cannot edit !":"Edit this quotation"),1)]),_:2},1024)]),_:2},1032,["color","onClick"]),e(S,{flat:"",color:u.row.TSLO_APPRVDT!==null?"grey":"red",icon:"delete",onClick:p=>I(u.row.TSLO_SLOCD),dense:"",disable:u.row.TSLO_APPRVDT!==null},{default:l(()=>[e(Y,null,{default:l(()=>[_(b(u.row.TQUO_APPRVDT?"Quotation already approved, cannot delete !":"Delete this quotation"),1)]),_:2},1024)]),_:2},1032,["color","onClick","disable"])]),_:2},1024),(f(!0),R($,null,q(u.cols,p=>(f(),w(K,{key:p.name,props:u},{default:l(()=>[_(b(p.value),1)]),_:2},1032,["props"]))),128))]),_:2},1032,["props"])]),_:1},8,["rows","columns","loading"])])])]))}};export{Sl as default};
