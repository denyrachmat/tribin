import{Q as H}from"./QTooltip.c20a1be7.js";import{o as j,t as S,C as L,D as h,E as l,F as e,M as le,O as $,J as s,$ as T,X as ae,Q as v,Y as q,Z as oe,an as y,U as w,R as P,a_ as ve,a0 as De,P as R,S as B,T as G,V as Oe,I as D,W as pe,aY as fe}from"./index.80bc3d12.js";import{a as K,u as te,l as N,Q as Ce,b as W,c as A,d as p,k as Le,m as X}from"./QTable.5d47c1d6.js";import{Q as Z,a as z}from"./QTd.93aa613d.js";import{api_web as V,api as ge}from"./axios.a75485ab.js";import{Q as k,a as Q,C as Y}from"./ClosePopup.079d8e0a.js";import{Q as Ee}from"./QBtnToggle.9e749cc7.js";import{d as Ae}from"./date.2ad60b45.js";import"./use-render-cache.3aae9b27.js";import"./QBtnGroup.64083146.js";const Ve=s("div",{class:"text-h6"},"Customer Detail",-1),Ue={class:"row"},be={class:"col"},Ie={class:"col q-pl-md"},Re={class:"col q-pl-md"},he={class:"row q-pt-md"},we={class:"col"},ye={class:"row q-pt-md"},Ne={class:"col"},Pe={__name:"customerView",props:{custData:Array},setup(M){K();const g=M;j(()=>{_.value=g.custData});const _=S({TSLO_CUSCD:"",MCUS_CUSNM:"",TSLO_ATTN:"",TSLO_ADDRESS_NAME:"",TSLO_ADDRESS_DESCRIPTION:""}),t=()=>{C(_.value)},{dialogRef:U,onDialogHide:b,onDialogOK:C,onDialogCancel:n}=te();return(I,u)=>(L(),h(oe,{ref_key:"dialogRef",ref:U,onHide:q(b),"transition-show":"slide-up","transition-hide":"slide-down","full-width":""},{default:l(()=>[e(le,{class:"q-dialog-plugin bg-white q-pa-sm"},{default:l(()=>[e($,null,{default:l(()=>[Ve]),_:1}),e($,{class:"q-pa-sm"},{default:l(()=>[s("div",Ue,[s("div",be,[e(T,{label:"Customer Code",readonly:"",modelValue:_.value.TSLO_CUSCD,"onUpdate:modelValue":u[0]||(u[0]=m=>_.value.TSLO_CUSCD=m),dense:""},null,8,["modelValue"])]),s("div",Ie,[e(T,{label:"Customer Name",readonly:"",modelValue:_.value.MCUS_CUSNM,"onUpdate:modelValue":u[1]||(u[1]=m=>_.value.MCUS_CUSNM=m),dense:""},null,8,["modelValue"])]),s("div",Re,[e(T,{label:"Attn.",modelValue:_.value.TSLO_ATTN,"onUpdate:modelValue":u[2]||(u[2]=m=>_.value.TSLO_ATTN=m),dense:""},null,8,["modelValue"])])]),s("div",he,[s("div",we,[e(T,{label:"Destination Name",modelValue:_.value.TSLO_ADDRESS_NAME,"onUpdate:modelValue":u[3]||(u[3]=m=>_.value.TSLO_ADDRESS_NAME=m),dense:""},null,8,["modelValue"])])]),s("div",ye,[s("div",Ne,[e(T,{label:"Destination Address",modelValue:_.value.TSLO_ADDRESS_DESCRIPTION,"onUpdate:modelValue":u[4]||(u[4]=m=>_.value.TSLO_ADDRESS_DESCRIPTION=m),dense:""},null,8,["modelValue"])])])]),_:1}),e(ae,{align:"right"},{default:l(()=>[e(v,{label:"OK",color:"primary",onClick:u[5]||(u[5]=m=>t()),disable:I.stateSubmit,loading:I.loading},null,8,["disable","loading"]),e(v,{flat:"",label:"Cancel",color:"red",onClick:q(n)},null,8,["onClick"])]),_:1})]),_:1})]),_:1},8,["onHide"]))}},Me=s("div",{class:"text-h6"},"RO Maintenance",-1),ke={style:{border:"1px black solid","border-radius":"10px"}},Qe=s("legend",{style:{"margin-left":"1em",padding:"0.2em 0.8em"}},[s("b",null,"Header")],-1),Ye={class:"row"},$e={class:"col"},qe={class:"col q-pl-md"},xe={class:"row items-center justify-end"},Fe={class:"col q-pl-md"},He={class:"row items-center justify-end"},Be={class:"row"},Ge={class:"col"},je={class:"col q-pl-md"},Ke={class:"col q-pl-md"},Je={class:"row q-py-md"},We={class:"col"},Xe={key:0,class:"row"},Ze={class:"col"},ze={class:"row"},el={class:"col"},ll={style:{border:"1px black solid","border-radius":"10px",height:"35vh",overflow:"auto"},class:"q-pa-md"},al=s("legend",{style:{"margin-left":"1em",padding:"0.2em 0.8em"}},[s("b",null,"Detail Items")],-1),ol={class:"row q-pb-md"},tl={class:"col"},sl={class:"text-h6"},nl={class:"col text-right"},dl={class:"row"},il={class:"col"},ul={class:"row items-center justify-end"},rl={class:"row items-center justify-end"},ee={__name:"salesOrderCreate",props:{sloHeader:String},setup(M){const g=K(),_=M,t=S({TSLO_SLOCD:"",TSLO_ISSUDT:Ae.formatDate(Date.now(),"YYYY-MM-DD"),TSLO_PLAN_DLVDT:"",TSLO_QUOCD:"",TSLO_POCD:"",TSLO_CUSCD:"",TSLO_ATTN:"",TSLO_TYPE:1,TSLO_ADDRESS_NAME:"",TSLO_ADDRESS_DESCRIPTION:"",TSLO_SERVTRANS_COST:0,TSLO_ISCON:!1});S(""),S("");const U=S([]),b=S([]),C=S([]),n=S(!1),I=S(1),u=S([]),m=S([]);j(async()=>{_.sloHeader&&_.sloHeader!==""&&(await ne(_.sloHeader),console.log(t.value),await O(t.value.TSLO_QUOCD)),J()});const c=(d,a,o,f)=>{a(async()=>{f==="quotation"&&await O(d),f==="item"&&await r(d),f==="cust"&&await J(d),f==="usage"&&await se(d)})},O=async(d="")=>{n.value=!0,await V.post("quotation/search",{searchBy:"MCUS_CUSNM",searchValue:d,approval:1}).then(a=>{n.value=!1,U.value=a.data.data}).catch(a=>{n.value=!1})},r=async d=>{n.value=!0,await V.post("item/searchAPI",{searchValue:d}).then(a=>{n.value=!1,b.value=a.data.data}).catch(()=>{n.value=!1})},E=()=>t.value.TSLO_TYPE===1?"Rental":t.value.TSLO_TYPE===2?"Sales":"Service",J=async d=>{n.value=!0,await V.post("customer/searchAPI",{searchValue:d}).then(a=>{n.value=!1,C.value=a.data.data}).catch(()=>{n.value=!1})},se=async d=>{n.value=!0,await V.post("usage/searchAPI",{searchValue:d}).then(a=>{n.value=!1,m.value=a.data.data}).catch(()=>{n.value=!1})},ne=async d=>{n.value=!0,await V.get(`receive-order/getData/${btoa(d)}`).then(a=>{n.value=!1,console.log(a.data.det),t.value=a.data,u.value=a.data.det}).catch(()=>{n.value=!1})},de=async d=>{console.log(d),n.value=!0,await ge.get(`transaction/quotation/view/${btoa(d)}`).then(a=>{n.value=!1,console.log(a.data.data),t.value.TSLO_CUSCD=a.data.data.TQUO_CUSCD,t.value.TSLO_ADDRESS_NAME=a.data.data.cust.MCUS_CUSNM,t.value.TSLO_ADDRESS_DESCRIPTION=a.data.data.cust.TQUO_PROJECT_LOCATION,t.value.TSLO_ATTN=a.data.data.TQUO_ATTN,u.value=[],a.data.data.det.map(o=>{u.value.push({TSLODETA_ITMCD:o.TQUODETA_ITMCD,TSLODETA_ITMQT:o.TQUODETA_ITMQT,TSLODETA_USAGE_DESCRIPTION:o.TQUODETA_USAGE,TSLODETA_PRC:o.TQUODETA_PRC,TSLODETA_PERIOD_FR:o.TQUODETA_PERIOD_FR,TSLODETA_PERIOD_TO:o.TQUODETA_PERIOD_TO})})}).catch(a=>{n.value=!1})},ie=()=>{u.value.push({TSLODETA_ITMCD:"",TSLODETA_ITMQT:"",TSLODETA_USAGE_DESCRIPTION:"",TSLODETA_PRC:0,TSLODETA_PERIOD_FR:"",TSLODETA_PERIOD_TO:""})},ue=d=>{g.dialog({title:"Confirmation",message:`Do you want to delete this lines no ${d+1} ?`,cancel:!0,persistent:!0}).onOk(async()=>{u.value.splice(d,1)})},re=()=>{g.dialog({title:"Confirmation",message:"Are you sure want to save this RO ?",cancel:!0,persistent:!0}).onOk(async()=>{n.value=!0,await V.post("receive-order/saveAPI",{...t.value,det:u.value}).then(d=>{n.value=!1,g.notify({color:"green",message:`${d.data.msg}`}),Te()}).catch(()=>{n.value=!1})})},_e=()=>{g.dialog({component:Pe,componentProps:{custData:{TSLO_CUSCD:t.value.TSLO_CUSCD,MCUS_CUSNM:t.value.TSLO_ADDRESS_NAME,TSLO_ATTN:t.value.TSLO_ATTN,TSLO_ADDRESS_NAME:t.value.TSLO_ADDRESS_NAME,TSLO_ADDRESS_DESCRIPTION:t.value.TSLO_ADDRESS_DESCRIPTION}}}).onOk(async d=>{console.log(d),t.value.TSLO_CUSCD=d.TSLO_CUSCD,t.value.TSLO_ATTN=d.TSLO_ATTN,t.value.TSLO_ADDRESS_NAME=d.TSLO_ADDRESS_NAME,t.value.TSLO_ADDRESS_DESCRIPTION=d.TSLO_ADDRESS_DESCRIPTION})},{dialogRef:Se,onDialogHide:me,onDialogOK:Te,onDialogCancel:ce}=te();return(d,a)=>(L(),h(oe,{ref_key:"dialogRef",ref:Se,onHide:q(me),"transition-show":"slide-up","transition-hide":"slide-down","full-width":""},{default:l(()=>[e(le,{class:"q-dialog-plugin bg-white q-pa-sm"},{default:l(()=>[e($,null,{default:l(()=>[Me]),_:1}),e($,{class:"q-pa-sm"},{default:l(()=>[s("fieldset",ke,[Qe,s("div",Ye,[s("div",$e,[e(T,{label:"RO Code",dense:"",filled:"",modelValue:t.value.TSLO_SLOCD,"onUpdate:modelValue":a[0]||(a[0]=o=>t.value.TSLO_SLOCD=o),disable:"",loading:n.value},null,8,["modelValue","loading"])]),s("div",qe,[e(T,{filled:"",modelValue:t.value.TSLO_ISSUDT,"onUpdate:modelValue":a[2]||(a[2]=o=>t.value.TSLO_ISSUDT=o),dense:"",label:"Issue Date",loading:n.value,onClick:a[3]||(a[3]=o=>d.quotationIssueDate.qDateProxy.show()),mask:"####-##-##","fill-mask":"",hint:"Mask: YYYY-MM-DD"},{append:l(()=>[e(y,{name:"event",class:"cursor-pointer"},{default:l(()=>[e(k,{cover:"","transition-show":"scale","transition-hide":"scale"},{default:l(()=>[e(Q,{modelValue:t.value.TSLO_ISSUDT,"onUpdate:modelValue":a[1]||(a[1]=o=>t.value.TSLO_ISSUDT=o),mask:"YYYY-MM-DD"},{default:l(()=>[s("div",xe,[w(e(v,{label:"Close",color:"primary",flat:""},null,512),[[Y]])])]),_:1},8,["modelValue"])]),_:1})]),_:1})]),_:1},8,["modelValue","loading"])]),s("div",Fe,[e(T,{filled:"",modelValue:t.value.TSLO_PLAN_DLVDT,"onUpdate:modelValue":a[5]||(a[5]=o=>t.value.TSLO_PLAN_DLVDT=o),dense:"",label:"Delivery Date",loading:n.value,onClick:a[6]||(a[6]=o=>d.quotationIssueDate.qDateProxy.show()),mask:"####-##-##","fill-mask":"",hint:"Mask: YYYY-MM-DD"},{append:l(()=>[e(y,{name:"event",class:"cursor-pointer"},{default:l(()=>[e(k,{cover:"","transition-show":"scale","transition-hide":"scale"},{default:l(()=>[e(Q,{modelValue:t.value.TSLO_PLAN_DLVDT,"onUpdate:modelValue":a[4]||(a[4]=o=>t.value.TSLO_PLAN_DLVDT=o),mask:"YYYY-MM-DD"},{default:l(()=>[s("div",He,[w(e(v,{label:"Close",color:"primary",flat:""},null,512),[[Y]])])]),_:1},8,["modelValue"])]),_:1})]),_:1})]),_:1},8,["modelValue","loading"])])]),s("div",Be,[s("div",Ge,[e(N,{dense:"",filled:"",label:"Sales Quotation Code",modelValue:t.value.TSLO_QUOCD,"onUpdate:modelValue":[a[7]||(a[7]=o=>t.value.TSLO_QUOCD=o),de],"use-input":"","input-debounce":"500",options:U.value,onFilter:a[8]||(a[8]=(o,f,i)=>c(o,f,i,"quotation")),behavior:"dialog","option-label":"DESCSEL","option-value":"TQUO_QUOCD","emit-value":"","map-options":"",loading:n.value},null,8,["modelValue","options","loading"])]),s("div",je,[e(T,{label:"PO Number",dense:"",filled:"",modelValue:t.value.TSLO_POCD,"onUpdate:modelValue":a[9]||(a[9]=o=>t.value.TSLO_POCD=o),loading:n.value},null,8,["modelValue","loading"])]),s("div",Ke,[e(N,{dense:"",filled:"",label:"Customer Name",modelValue:t.value.TSLO_CUSCD,"onUpdate:modelValue":a[10]||(a[10]=o=>t.value.TSLO_CUSCD=o),"use-input":"","input-debounce":"500",options:C.value,onFilter:a[11]||(a[11]=(o,f,i)=>c(o,f,i,"cust")),behavior:"dialog","option-label":"MCUS_CUSNM","option-value":"MCUS_CUSCD","emit-value":"","map-options":"",loading:n.value,readonly:I.value===3},null,8,["modelValue","options","loading","readonly"])])])]),s("div",Je,[s("div",We,[e(Ee,{modelValue:t.value.TSLO_TYPE,"onUpdate:modelValue":a[12]||(a[12]=o=>t.value.TSLO_TYPE=o),spread:"","no-caps":"","toggle-color":"purple",color:"white","text-color":"black",options:[{label:"Rental",value:1},{label:"Sales",value:2},{label:"Service",value:3}]},null,8,["modelValue"])])]),t.value.TSLO_TYPE!=1?(L(),P("div",Xe,[s("div",Ze,[e(T,{prefix:"Rp",label:"Service & Transportation Price",modelValue:t.value.TSLO_SERVTRANS_COST,"onUpdate:modelValue":a[13]||(a[13]=o=>t.value.TSLO_SERVTRANS_COST=o),filled:"",dense:""},null,8,["modelValue"])])])):ve("",!0),s("div",ze,[s("div",el,[e(De,{modelValue:t.value.TSLO_ISCON,"onUpdate:modelValue":a[14]||(a[14]=o=>t.value.TSLO_ISCON=o),label:"Is Contract ?",color:"teal","toggle-indeterminate":!1,"true-value":1,"false-value":0,"indeterminate-value":0,disable:n.value},null,8,["modelValue","disable"])])]),s("fieldset",ll,[al,s("div",ol,[s("div",tl,[s("span",sl,R(E()),1)]),s("div",nl,[e(v,{flat:"",icon:"add",color:"blue",label:"Add Lines",onClick:ie,loading:n.value},null,8,["loading"]),e(v,{flat:"",icon:"person",color:"indigo",label:"Customer",onClick:_e,loading:n.value},null,8,["loading"])])]),s("div",dl,[s("div",il,[e(Ce,{bordered:"",dense:""},{default:l(()=>[u.value.length>0?(L(!0),P(B,{key:0},G(u.value,(o,f)=>(L(),h(W,{key:f,class:"q-my-sm",dense:""},{default:l(()=>[e(A,{avatar:""},{default:l(()=>[e(Oe,{"text-color":"blue"},{default:l(()=>[D(R(f+1),1)]),_:2},1024)]),_:2},1024),e(A,null,{default:l(()=>[e(p,{class:"text-center"},{default:l(()=>[e(N,{dense:"",filled:"",label:"Item Name",modelValue:o.TSLODETA_ITMCD,"onUpdate:modelValue":i=>o.TSLODETA_ITMCD=i,"use-input":"","input-debounce":"500",options:b.value,onFilter:a[15]||(a[15]=(i,x,F)=>c(i,x,F,"item")),behavior:"dialog","option-label":"MITM_ITMNM","option-value":"MITM_ITMNM","emit-value":"","map-options":"",loading:n.value},null,8,["modelValue","onUpdate:modelValue","options","loading"])]),_:2},1024),e(p,{caption:""},{default:l(()=>[D(" Item Name ")]),_:1})]),_:2},1024),e(A,null,{default:l(()=>[e(p,null,{default:l(()=>[e(T,{modelValue:o.TSLODETA_ITMQT,"onUpdate:modelValue":i=>o.TSLODETA_ITMQT=i,dense:""},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1024),e(p,{caption:""},{default:l(()=>[D(" Qty ")]),_:1})]),_:2},1024),e(A,null,{default:l(()=>[e(p,null,{default:l(()=>[e(N,{dense:"",filled:"",label:"Usage",modelValue:o.TSLODETA_USAGE_DESCRIPTION,"onUpdate:modelValue":i=>o.TSLODETA_USAGE_DESCRIPTION=i,"use-input":"","input-debounce":"500",options:m.value,onFilter:a[16]||(a[16]=(i,x,F)=>c(i,x,F,"usage")),behavior:"dialog","option-label":"MUSAGE_DESCALL","option-value":"id","emit-value":"","map-options":"",loading:n.value},null,8,["modelValue","onUpdate:modelValue","options","loading"])]),_:2},1024),e(p,{caption:""},{default:l(()=>[D(" Usage ")]),_:1})]),_:2},1024),e(A,null,{default:l(()=>[e(p,null,{default:l(()=>[e(T,{modelValue:o.TSLODETA_PRC,"onUpdate:modelValue":i=>o.TSLODETA_PRC=i,dense:""},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1024),e(p,{caption:""},{default:l(()=>[D(" Price ")]),_:1})]),_:2},1024),e(A,null,{default:l(()=>[e(p,null,{default:l(()=>[e(T,{filled:"",modelValue:o.TSLODETA_PERIOD_FR,"onUpdate:modelValue":i=>o.TSLODETA_PERIOD_FR=i,dense:"",loading:n.value,onClick:a[17]||(a[17]=i=>d.quotationIssueDate.qDateProxy.show()),mask:"####-##-##","fill-mask":""},{append:l(()=>[e(y,{name:"event",class:"cursor-pointer"},{default:l(()=>[e(k,{cover:"","transition-show":"scale","transition-hide":"scale"},{default:l(()=>[e(Q,{modelValue:o.TSLODETA_PERIOD_FR,"onUpdate:modelValue":i=>o.TSLODETA_PERIOD_FR=i,mask:"YYYY-MM-DD"},{default:l(()=>[s("div",ul,[w(e(v,{label:"Close",color:"primary",flat:""},null,512),[[Y]])])]),_:2},1032,["modelValue","onUpdate:modelValue"])]),_:2},1024)]),_:2},1024)]),_:2},1032,["modelValue","onUpdate:modelValue","loading"])]),_:2},1024),e(p,{caption:""},{default:l(()=>[D(" Period From ")]),_:1})]),_:2},1024),e(A,null,{default:l(()=>[e(p,null,{default:l(()=>[e(T,{filled:"",modelValue:o.TSLODETA_PERIOD_TO,"onUpdate:modelValue":i=>o.TSLODETA_PERIOD_TO=i,dense:"",loading:n.value,onClick:a[18]||(a[18]=i=>d.quotationIssueDate.qDateProxy.show()),mask:"####-##-##","fill-mask":""},{append:l(()=>[e(y,{name:"event",class:"cursor-pointer"},{default:l(()=>[e(k,{cover:"","transition-show":"scale","transition-hide":"scale"},{default:l(()=>[e(Q,{modelValue:o.TSLODETA_PERIOD_TO,"onUpdate:modelValue":i=>o.TSLODETA_PERIOD_TO=i,mask:"YYYY-MM-DD"},{default:l(()=>[s("div",rl,[w(e(v,{label:"Close",color:"primary",flat:""},null,512),[[Y]])])]),_:2},1032,["modelValue","onUpdate:modelValue"])]),_:2},1024)]),_:2},1024)]),_:2},1032,["modelValue","onUpdate:modelValue","loading"])]),_:2},1024),e(p,{caption:""},{default:l(()=>[D(" Period To ")]),_:1})]),_:2},1024),e(A,{side:""},{default:l(()=>[e(v,{icon:"delete",color:"red",flat:"",onClick:i=>ue(f)},null,8,["onClick"])]),_:2},1024)]),_:2},1024))),128)):w((L(),h(W,{key:1,class:"q-my-sm",clickable:""},{default:l(()=>[e(A,null,{default:l(()=>[e(p,null,{default:l(()=>[D(" No Items Added ")]),_:1})]),_:1})]),_:1})),[[pe]])]),_:1})])])])]),_:1}),e(ae,{align:"right"},{default:l(()=>[e(v,{label:"OK",color:"primary",onClick:a[19]||(a[19]=o=>re()),disable:d.stateSubmit,loading:n.value},null,8,["disable","loading"]),e(v,{flat:"",label:"Cancel",color:"red",onClick:q(ce)},null,8,["onClick"])]),_:1})]),_:1})]),_:1},8,["onHide"]))}};const _l={class:"q-pa-md"},Sl={class:"row q-pb-md"},ml=s("div",{class:"col"},[s("span",{class:"text-h4"},"Sales Order / Receive Order")],-1),Tl={class:"col text-right"},cl={class:"row q-pt-md"},vl={class:"col"},Ul={__name:"salesOrderView",setup(M){const g=K(),_=S("TSLO_SLOCD"),t=S(""),U=S([]),b=S([{name:"TSLO_SLOCD",label:"RO. Code",field:"TSLO_SLOCD",sortable:!0,align:"left"},{name:"MCUS_CUSNM",label:"Customer Name",field:"MCUS_CUSNM",sortable:!0,align:"left"},{name:"TSLO_ADDRESS_NAME",label:"Customer Addr.",field:"TSLO_ADDRESS_NAME",sortable:!0,align:"left"},{name:"TSLO_CUSCD",label:"Customer Code",field:"TSLO_CUSCD",sortable:!0,align:"left"},{name:"TSLO_ISSUDT",label:"Issue Date",field:"TSLO_ISSUDT",sortable:!0,align:"left"},{name:"TSLO_QUOCD",label:"Quot. Code",field:"TSLO_QUOCD",sortable:!0,align:"left"}]),C=S(!1);j(()=>{n()});const n=async()=>{C.value=!0,await V.post("receive-order/searchAPI",{searchBy:_.value,searchValue:t.value}).then(c=>{C.value=!1,U.value=c.data.data}).catch(c=>{C.value=!1})},I=()=>{g.dialog({component:ee}).onOk(async c=>{n()})},u=c=>{console.log(c),g.dialog({component:ee,componentProps:{sloHeader:c}}).onOk(async O=>{n()})},m=c=>{g.dialog({title:"Confirmation",message:"Are you sure want to delete this data ?",cancel:!0,persistent:!0}).onOk(async()=>{C.value=!0,await V.delete(`receive-order/itemsAPI/${btoa(c)}`).then(O=>{C.value=!1,n()})})};return(c,O)=>(L(),P("div",_l,[s("div",Sl,[ml,s("div",Tl,[e(v,{icon:"add",color:"blue",onClick:O[0]||(O[0]=r=>I())},{default:l(()=>[e(H,null,{default:l(()=>[D("Create New RO")]),_:1})]),_:1})])]),e(fe),s("div",cl,[s("div",vl,[e(Le,{title:"Created RO",rows:U.value,columns:b.value,"row-key":"name",loading:C.value,dense:"",pagination:{rowsPerPage:20},class:"my-sticky-header-column-table"},{"top-right":l(()=>[e(N,{outlined:"",modelValue:_.value,"onUpdate:modelValue":O[1]||(O[1]=r=>_.value=r),options:b.value,label:"Search Columns","option-value":"name","option-label":"label","emit-value":"",dense:"","map-options":""},null,8,["modelValue","options"]),e(T,{borderless:"",dense:"",modelValue:t.value,"onUpdate:modelValue":[O[2]||(O[2]=r=>t.value=r),O[3]||(O[3]=r=>n())],placeholder:"Search",outlined:"",debounce:"1000"},{append:l(()=>[e(y,{name:"search"})]),_:1},8,["modelValue"])]),header:l(r=>[e(Z,{props:r},{default:l(()=>[e(X,{"auto-width":""},{default:l(()=>[D("Action")]),_:1}),(L(!0),P(B,null,G(r.cols,E=>(L(),h(X,{key:E.name,props:r},{default:l(()=>[D(R(E.label),1)]),_:2},1032,["props"]))),128))]),_:2},1032,["props"])]),body:l(r=>[e(Z,{props:r},{default:l(()=>[e(z,{"auto-width":""},{default:l(()=>[e(v,{flat:"",color:r.row.dlv.length>0?"grey":"orange",icon:"edit",onClick:E=>u(r.row.TSLO_SLOCD),dense:""},{default:l(()=>[e(H,null,{default:l(()=>[D(R(r.row.dlv.length>0?"RO already used for delivery, cannot edit !":"Edit this RO"),1)]),_:2},1024)]),_:2},1032,["color","onClick"]),e(v,{flat:"",color:r.row.dlv.length>0?"grey":"red",icon:"delete",onClick:E=>m(r.row.TSLO_SLOCD),dense:"",disable:r.row.dlv.length>0},{default:l(()=>[e(H,null,{default:l(()=>[D(R(r.row.dlv.length>0?"RO already used for delivery, cannot delete !":"Delete this RO"),1)]),_:2},1024)]),_:2},1032,["color","onClick","disable"])]),_:2},1024),(L(!0),P(B,null,G(r.cols,E=>(L(),h(z,{key:E.name,props:r},{default:l(()=>[D(R(E.value),1)]),_:2},1032,["props"]))),128))]),_:2},1032,["props"])]),_:1},8,["rows","columns","loading"])])])]))}};export{Ul as default};
