import{Q as h}from"./QTooltip.a393fde3.js";import{t as _,o as H,C as v,D as Q,E as l,F as e,M as ne,O as q,J as s,$ as S,an as A,U as E,Q as T,P as V,R as k,S as N,T as Y,V as de,I as r,W as ie,X as ue,Y as F,Z as re,aY as _e}from"./index.2d615fb7.js";import{a as K,u as me,l as M,Q as ce,b as x,c as f,d as m,k as Te,m as B}from"./QTable.2bad4b5e.js";import{Q as G,a as j}from"./QTd.8585a67d.js";import{api_web as I,api as De}from"./axios.1c6cb42c.js";import{Q as w,a as R,C as y}from"./ClosePopup.e77278d5.js";import{d as Oe}from"./date.2e366218.js";import"./use-render-cache.3aae9b27.js";const Se=s("div",{class:"text-h6"},"RO Maintenance",-1),fe={style:{border:"1px black solid","border-radius":"10px"}},ve=s("legend",{style:{"margin-left":"1em",padding:"0.2em 0.8em"}},[s("b",null,"Header")],-1),pe={class:"row"},Ce={class:"col"},Ue={class:"col q-pl-md"},Le={class:"row items-center justify-end"},Ve={class:"col q-pl-md"},ge={class:"row items-center justify-end"},be={class:"row"},Ee={class:"col"},Ae={class:"col q-pl-md"},Ie={class:"col q-pl-md"},Qe={style:{border:"1px black solid","border-radius":"10px",height:"35vh",overflow:"auto"},class:"q-pa-md"},Pe=s("legend",{style:{"margin-left":"1em",padding:"0.2em 0.8em"}},[s("b",null,"Detail Items")],-1),he={class:"row q-pb-md"},we={class:"col"},Re={class:"text-h6"},ye={class:"col text-right"},ke={class:"row"},Me={class:"col"},Ne={class:"row items-center justify-end"},Ye={class:"row items-center justify-end"},$e={__name:"salesOrderCreate",setup(J){const P=K(),n=_({TSLO_SLOCD:"",TSLO_ISSUDT:Oe.formatDate(Date.now(),"YYYY-MM-DD"),TSLO_PLAN_DLVDT:"",TSLO_QUOCD:"",TSLO_POCD:"",TSLO_CUSCD:"",TSLO_ADDRESS_NAME:"",TSLO_ADDRESS_DESCRIPTION:""});_(""),_("");const U=_([]),g=_([]),b=_([]),o=_(!1),L=_(1),p=_([]);H(()=>{$()});const c=(u,a,t,D)=>{a(async()=>{D==="quotation"&&await C(u),D==="item"&&await i(u),D==="cust"&&await $(u)})},C=async(u="")=>{o.value=!0,await I.post("quotation/search",{searchBy:"MCUS_CUSNM",searchValue:u}).then(a=>{o.value=!1,U.value=a.data.data}).catch(a=>{o.value=!1})},i=async u=>{o.value=!0,await I.post("item/searchAPI",{searchValue:u}).then(a=>{o.value=!1,g.value=a.data.data}).catch(()=>{o.value=!1})},O=()=>L.value===1?"Rental":L.value===2?"Sales":"Service",$=async u=>{o.value=!0,await I.post("customer/searchAPI",{searchValue:u}).then(a=>{o.value=!1,b.value=a.data.data}).catch(()=>{o.value=!1})},W=async u=>{console.log(u),o.value=!0,await De.get(`transaction/quotation/view/${btoa(u)}`).then(a=>{o.value=!1,n.value.TSLO_CUSCD=a.data.data.TQUO_CUSCD,n.value.TSLO_ADDRESS_NAME=a.data.data.cust.MCUS_CUSNM,n.value.TSLO_ADDRESS_DESCRIPTION=a.data.data.cust.MCUS_ADDR1,a.data.data.det.map(t=>{p.value.push({TSLODETA_ITMCD:t.TQUODETA_ITMCD,TSLODETA_ITMQT:t.TQUODETA_ITMQT,TSLODETA_USAGE_DESCRIPTION:t.TQUODETA_USAGE,TSLODETA_PRC:t.TQUODETA_PRC,TSLODETA_PERIOD_FR:t.TQUODETA_PERIOD_FR,TSLODETA_PERIOD_TO:t.TQUODETA_PERIOD_TO})})}).catch(a=>{o.value=!1})},X=()=>{p.value.push({TSLODETA_ITMCD:"",TSLODETA_ITMQT:"",TSLODETA_USAGE_DESCRIPTION:"",TSLODETA_PRC:0,TSLODETA_PERIOD_FR:"",TSLODETA_PERIOD_TO:""})},Z=u=>{P.dialog({title:"Confirmation",message:`Do you want to delete this lines no ${u+1} ?`,cancel:!0,persistent:!0}).onOk(async()=>{p.value.splice(u,1)})},z=()=>{P.dialog({title:"Confirmation",message:"Are you sure want to save this RO ?",cancel:!0,persistent:!0}).onOk(async()=>{o.value=!0,await I.post("receive-order/saveAPI",{...n.value,det:p.value}).then(u=>{o.value=!1,ae()}).catch(()=>{o.value=!1})})},{dialogRef:ee,onDialogHide:le,onDialogOK:ae,onDialogCancel:te}=me();return(u,a)=>(v(),Q(re,{ref_key:"dialogRef",ref:ee,onHide:F(le),"transition-show":"slide-up","transition-hide":"slide-down","full-width":""},{default:l(()=>[e(ne,{class:"q-dialog-plugin bg-white q-pa-sm"},{default:l(()=>[e(q,null,{default:l(()=>[Se]),_:1}),e(q,{class:"q-pa-sm"},{default:l(()=>[s("fieldset",fe,[ve,s("div",pe,[s("div",Ce,[e(S,{label:"RO Code",dense:"",filled:"",modelValue:n.value.TSLO_SLOCD,"onUpdate:modelValue":a[0]||(a[0]=t=>n.value.TSLO_SLOCD=t),disable:"",loading:o.value},null,8,["modelValue","loading"])]),s("div",Ue,[e(S,{filled:"",modelValue:n.value.TSLO_ISSUDT,"onUpdate:modelValue":a[2]||(a[2]=t=>n.value.TSLO_ISSUDT=t),dense:"",label:"Issue Date",loading:o.value,onClick:a[3]||(a[3]=t=>u.quotationIssueDate.qDateProxy.show()),mask:"####-##-##","fill-mask":"",hint:"Mask: YYYY-MM-DD"},{append:l(()=>[e(A,{name:"event",class:"cursor-pointer"},{default:l(()=>[e(w,{cover:"","transition-show":"scale","transition-hide":"scale"},{default:l(()=>[e(R,{modelValue:n.value.TSLO_ISSUDT,"onUpdate:modelValue":a[1]||(a[1]=t=>n.value.TSLO_ISSUDT=t),mask:"YYYY-MM-DD"},{default:l(()=>[s("div",Le,[E(e(T,{label:"Close",color:"primary",flat:""},null,512),[[y]])])]),_:1},8,["modelValue"])]),_:1})]),_:1})]),_:1},8,["modelValue","loading"])]),s("div",Ve,[e(S,{filled:"",modelValue:n.value.TSLO_PLAN_DLVDT,"onUpdate:modelValue":a[5]||(a[5]=t=>n.value.TSLO_PLAN_DLVDT=t),dense:"",label:"Delivery Date",loading:o.value,onClick:a[6]||(a[6]=t=>u.quotationIssueDate.qDateProxy.show()),mask:"####-##-##","fill-mask":"",hint:"Mask: YYYY-MM-DD"},{append:l(()=>[e(A,{name:"event",class:"cursor-pointer"},{default:l(()=>[e(w,{cover:"","transition-show":"scale","transition-hide":"scale"},{default:l(()=>[e(R,{modelValue:n.value.TSLO_PLAN_DLVDT,"onUpdate:modelValue":a[4]||(a[4]=t=>n.value.TSLO_PLAN_DLVDT=t),mask:"YYYY-MM-DD"},{default:l(()=>[s("div",ge,[E(e(T,{label:"Close",color:"primary",flat:""},null,512),[[y]])])]),_:1},8,["modelValue"])]),_:1})]),_:1})]),_:1},8,["modelValue","loading"])])]),s("div",be,[s("div",Ee,[e(M,{dense:"",filled:"",label:"Sales Quotation Code",modelValue:n.value.TSLO_QUOCD,"onUpdate:modelValue":[a[7]||(a[7]=t=>n.value.TSLO_QUOCD=t),W],"use-input":"","input-debounce":"500",options:U.value,onFilter:a[8]||(a[8]=(t,D,d)=>c(t,D,d,"quotation")),behavior:"dialog","option-label":"DESCSEL","option-value":"TQUO_QUOCD","emit-value":"","map-options":"",loading:o.value},null,8,["modelValue","options","loading"])]),s("div",Ae,[e(S,{label:"PO Number",dense:"",filled:"",modelValue:n.value.TSLO_POCD,"onUpdate:modelValue":a[9]||(a[9]=t=>n.value.TSLO_POCD=t),loading:o.value},null,8,["modelValue","loading"])]),s("div",Ie,[e(M,{dense:"",filled:"",label:"Customer Name",modelValue:n.value.TSLO_CUSCD,"onUpdate:modelValue":a[10]||(a[10]=t=>n.value.TSLO_CUSCD=t),"use-input":"","input-debounce":"500",options:b.value,onFilter:a[11]||(a[11]=(t,D,d)=>c(t,D,d,"cust")),behavior:"dialog","option-label":"MCUS_CUSNM","option-value":"MCUS_CUSCD","emit-value":"","map-options":"",loading:o.value,readonly:L.value===3},null,8,["modelValue","options","loading","readonly"])])])]),s("fieldset",Qe,[Pe,s("div",he,[s("div",we,[s("span",Re,V(O()),1)]),s("div",ye,[e(T,{flat:"",icon:"add",color:"blue",label:"Add Lines",onClick:X,loading:o.value},null,8,["loading"])])]),s("div",ke,[s("div",Me,[e(ce,{bordered:"",dense:""},{default:l(()=>[p.value.length>0?(v(!0),k(N,{key:0},Y(p.value,(t,D)=>(v(),Q(x,{key:D,class:"q-my-sm",dense:""},{default:l(()=>[e(f,{avatar:""},{default:l(()=>[e(de,{"text-color":"blue"},{default:l(()=>[r(V(D+1),1)]),_:2},1024)]),_:2},1024),e(f,null,{default:l(()=>[e(m,{class:"text-center"},{default:l(()=>[e(M,{dense:"",filled:"",label:"Item Name",modelValue:t.TSLODETA_ITMCD,"onUpdate:modelValue":d=>t.TSLODETA_ITMCD=d,"use-input":"","input-debounce":"500",options:g.value,onFilter:a[12]||(a[12]=(d,oe,se)=>c(d,oe,se,"item")),behavior:"dialog","option-label":"MITM_ITMNM","option-value":"MITM_ITMNM","emit-value":"","map-options":"",loading:o.value},null,8,["modelValue","onUpdate:modelValue","options","loading"])]),_:2},1024),e(m,{caption:""},{default:l(()=>[r(" Item Name ")]),_:1})]),_:2},1024),e(f,null,{default:l(()=>[e(m,null,{default:l(()=>[e(S,{modelValue:t.TSLODETA_ITMQT,"onUpdate:modelValue":d=>t.TSLODETA_ITMQT=d,dense:""},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1024),e(m,{caption:""},{default:l(()=>[r(" Qty ")]),_:1})]),_:2},1024),e(f,null,{default:l(()=>[e(m,null,{default:l(()=>[e(S,{modelValue:t.TSLODETA_USAGE_DESCRIPTION,"onUpdate:modelValue":d=>t.TSLODETA_USAGE_DESCRIPTION=d,dense:""},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1024),e(m,{caption:""},{default:l(()=>[r(" Usage ")]),_:1})]),_:2},1024),e(f,null,{default:l(()=>[e(m,null,{default:l(()=>[e(S,{modelValue:t.TSLODETA_PRC,"onUpdate:modelValue":d=>t.TSLODETA_PRC=d,dense:""},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1024),e(m,{caption:""},{default:l(()=>[r(" Price ")]),_:1})]),_:2},1024),e(f,null,{default:l(()=>[e(m,null,{default:l(()=>[e(S,{filled:"",modelValue:t.TSLODETA_PERIOD_FROM,"onUpdate:modelValue":d=>t.TSLODETA_PERIOD_FROM=d,dense:"",loading:o.value,onClick:a[13]||(a[13]=d=>u.quotationIssueDate.qDateProxy.show()),mask:"####-##-##","fill-mask":""},{append:l(()=>[e(A,{name:"event",class:"cursor-pointer"},{default:l(()=>[e(w,{cover:"","transition-show":"scale","transition-hide":"scale"},{default:l(()=>[e(R,{modelValue:t.TSLODETA_PERIOD_FROM,"onUpdate:modelValue":d=>t.TSLODETA_PERIOD_FROM=d,mask:"YYYY-MM-DD"},{default:l(()=>[s("div",Ne,[E(e(T,{label:"Close",color:"primary",flat:""},null,512),[[y]])])]),_:2},1032,["modelValue","onUpdate:modelValue"])]),_:2},1024)]),_:2},1024)]),_:2},1032,["modelValue","onUpdate:modelValue","loading"])]),_:2},1024),e(m,{caption:""},{default:l(()=>[r(" Period From ")]),_:1})]),_:2},1024),e(f,null,{default:l(()=>[e(m,null,{default:l(()=>[e(S,{filled:"",modelValue:t.TSLODETA_PERIOD_TO,"onUpdate:modelValue":d=>t.TSLODETA_PERIOD_TO=d,dense:"",loading:o.value,onClick:a[14]||(a[14]=d=>u.quotationIssueDate.qDateProxy.show()),mask:"####-##-##","fill-mask":""},{append:l(()=>[e(A,{name:"event",class:"cursor-pointer"},{default:l(()=>[e(w,{cover:"","transition-show":"scale","transition-hide":"scale"},{default:l(()=>[e(R,{modelValue:t.TSLODETA_PERIOD_TO,"onUpdate:modelValue":d=>t.TSLODETA_PERIOD_TO=d,mask:"YYYY-MM-DD"},{default:l(()=>[s("div",Ye,[E(e(T,{label:"Close",color:"primary",flat:""},null,512),[[y]])])]),_:2},1032,["modelValue","onUpdate:modelValue"])]),_:2},1024)]),_:2},1024)]),_:2},1032,["modelValue","onUpdate:modelValue","loading"])]),_:2},1024),e(m,{caption:""},{default:l(()=>[r(" Period To ")]),_:1})]),_:2},1024),e(f,{side:""},{default:l(()=>[e(T,{icon:"delete",color:"red",flat:"",onClick:d=>Z(D)},null,8,["onClick"])]),_:2},1024)]),_:2},1024))),128)):E((v(),Q(x,{key:1,class:"q-my-sm",clickable:""},{default:l(()=>[e(f,null,{default:l(()=>[e(m,null,{default:l(()=>[r(" No Items Added ")]),_:1})]),_:1})]),_:1})),[[ie]])]),_:1})])])])]),_:1}),e(ue,{align:"right"},{default:l(()=>[e(T,{label:"OK",color:"primary",onClick:a[15]||(a[15]=t=>z()),disable:u.stateSubmit,loading:o.value},null,8,["disable","loading"]),e(T,{flat:"",label:"Cancel",color:"red",onClick:F(te)},null,8,["onClick"])]),_:1})]),_:1})]),_:1},8,["onHide"]))}};const qe={class:"q-pa-md"},Fe={class:"row q-pb-md"},xe=s("div",{class:"col"},[s("span",{class:"text-h4"},"Sales Order / Receive Order")],-1),Be={class:"col text-right"},Ge={class:"row q-pt-md"},je={class:"col"},ll={__name:"salesOrderView",setup(J){const P=K(),n=_("TQUO_QUOCD"),U=_(""),g=_([]),b=_([{name:"TSLO_SLOCD",label:"RO. Code",field:"TSLO_SLOCD",sortable:!0,align:"left"},{name:"MCUS_CUSNM",label:"Customer Name",field:"MCUS_CUSNM",sortable:!0,align:"left"},{name:"TSLO_ADDRESS_NAME",label:"Customer Addr.",field:"TSLO_ADDRESS_NAME",sortable:!0,align:"left"},{name:"TSLO_CUSCD",label:"Customer Code",field:"TSLO_CUSCD",sortable:!0,align:"left"},{name:"TSLO_ISSUDT",label:"Issue Date",field:"TSLO_ISSUDT",sortable:!0,align:"left"},{name:"TSLO_QUOCD",label:"Quot. Code",field:"TSLO_QUOCD",sortable:!0,align:"left"}]),o=_(!1);H(()=>{L()});const L=async()=>{o.value=!0,await I.post("receive-order/searchAPI",{searchBy:n.value,searchValue:U.value}).then(c=>{o.value=!1,g.value=c.data.data}).catch(c=>{o.value=!1})},p=()=>{P.dialog({component:$e}).onOk(async c=>{L()})};return(c,C)=>(v(),k("div",qe,[s("div",Fe,[xe,s("div",Be,[e(T,{icon:"add",color:"blue",onClick:p},{default:l(()=>[e(h,null,{default:l(()=>[r("Create New RO")]),_:1})]),_:1})])]),e(_e),s("div",Ge,[s("div",je,[e(Te,{title:"Created RO",rows:g.value,columns:b.value,"row-key":"name",loading:o.value,dense:"",pagination:{rowsPerPage:20},class:"my-sticky-header-column-table"},{"top-right":l(()=>[e(M,{outlined:"",modelValue:n.value,"onUpdate:modelValue":C[0]||(C[0]=i=>n.value=i),options:b.value,label:"Search Columns","option-value":"name","option-label":"label","emit-value":"",dense:"","map-options":""},null,8,["modelValue","options"]),e(S,{borderless:"",dense:"",modelValue:U.value,"onUpdate:modelValue":[C[1]||(C[1]=i=>U.value=i),C[2]||(C[2]=i=>c.dataQuo())],placeholder:"Search",outlined:"",debounce:"1000"},{append:l(()=>[e(A,{name:"search"})]),_:1},8,["modelValue"])]),header:l(i=>[e(G,{props:i},{default:l(()=>[e(B,{"auto-width":""},{default:l(()=>[r("Action")]),_:1}),(v(!0),k(N,null,Y(i.cols,O=>(v(),Q(B,{key:O.name,props:i},{default:l(()=>[r(V(O.label),1)]),_:2},1032,["props"]))),128))]),_:2},1032,["props"])]),body:l(i=>[e(G,{props:i},{default:l(()=>[e(j,{"auto-width":""},{default:l(()=>[e(T,{flat:"",color:i.row.TQUO_APPRVDT!==null?"grey":"orange",icon:"edit",onClick:O=>c.onClickEdit(i.row.TQUO_QUOCD),dense:"",disable:i.row.TQUO_APPRVDT!==null},{default:l(()=>[e(h,null,{default:l(()=>[r(V(i.row.TQUO_APPRVDT?"Quotation already approved, cannot edit !":"Edit this quotation"),1)]),_:2},1024)]),_:2},1032,["color","onClick","disable"]),e(T,{flat:"",color:i.row.TQUO_APPRVDT!==null?"grey":"red",icon:"delete",onClick:O=>c.onClickDelete(i.row.TQUO_QUOCD),dense:"",disable:i.row.TQUO_APPRVDT!==null},{default:l(()=>[e(h,null,{default:l(()=>[r(V(i.row.TQUO_APPRVDT?"Quotation already approved, cannot delete !":"Delete this quotation"),1)]),_:2},1024)]),_:2},1032,["color","onClick","disable"]),e(T,{flat:"",color:"indigo",icon:"print",onClick:O=>c.onClickPrint(i.row.TQUO_QUOCD),dense:""},{default:l(()=>[e(h,null,{default:l(()=>[r("Print this quotation")]),_:1})]),_:2},1032,["onClick"])]),_:2},1024),(v(!0),k(N,null,Y(i.cols,O=>(v(),Q(j,{key:O.name,props:i},{default:l(()=>[r(V(O.value),1)]),_:2},1032,["props"]))),128))]),_:2},1032,["props"])]),_:1},8,["rows","columns","loading"])])])]))}};export{ll as default};
