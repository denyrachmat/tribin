import{Q as x}from"./QTooltip.5d1a6b93.js";import{o as B,t as T,C as L,D as h,E as l,F as e,M as Z,O as $,J as s,$ as m,X as z,Q as c,Y as q,Z as ee,an as y,U as w,R as N,a_ as Te,a0 as ce,P as R,S as F,T as H,V as De,I as D,W as Oe,aY as ve}from"./index.2cc490fd.js";import{a as G,u as le,l as Y,Q as pe,b as j,c as A,d as O,k as Ce,m as K}from"./QTable.e3bbeb42.js";import{Q as J,a as W}from"./QTd.69b78fae.js";import{api_web as b,api as fe}from"./axios.ffd8f3d6.js";import{Q as M,a as k,C as Q}from"./ClosePopup.da9f31d3.js";import{Q as Le}from"./QBtnToggle.27076c82.js";import{d as ge}from"./date.8e41d244.js";import"./use-render-cache.3aae9b27.js";import"./QBtnGroup.4a16c476.js";const Ee=s("div",{class:"text-h6"},"Customer Detail",-1),Ae={class:"row"},Ve={class:"col"},Ue={class:"col q-pl-md"},be={class:"col q-pl-md"},Ie={class:"row q-pt-md"},Re={class:"col"},he={class:"row q-pt-md"},we={class:"col"},ye={__name:"customerView",props:{custData:Array},setup(P){G();const g=P;B(()=>{_.value=g.custData});const _=T({TSLO_CUSCD:"",MCUS_CUSNM:"",TSLO_ATTN:"",TSLO_ADDRESS_NAME:"",TSLO_ADDRESS_DESCRIPTION:""}),t=()=>{C(_.value)},{dialogRef:V,onDialogHide:U,onDialogOK:C,onDialogCancel:n}=le();return(I,u)=>(L(),h(ee,{ref_key:"dialogRef",ref:V,onHide:q(U),"transition-show":"slide-up","transition-hide":"slide-down","full-width":""},{default:l(()=>[e(Z,{class:"q-dialog-plugin bg-white q-pa-sm"},{default:l(()=>[e($,null,{default:l(()=>[Ee]),_:1}),e($,{class:"q-pa-sm"},{default:l(()=>[s("div",Ae,[s("div",Ve,[e(m,{label:"Customer Code",readonly:"",modelValue:_.value.TSLO_CUSCD,"onUpdate:modelValue":u[0]||(u[0]=S=>_.value.TSLO_CUSCD=S),dense:""},null,8,["modelValue"])]),s("div",Ue,[e(m,{label:"Customer Name",readonly:"",modelValue:_.value.MCUS_CUSNM,"onUpdate:modelValue":u[1]||(u[1]=S=>_.value.MCUS_CUSNM=S),dense:""},null,8,["modelValue"])]),s("div",be,[e(m,{label:"Attn.",modelValue:_.value.TSLO_ATTN,"onUpdate:modelValue":u[2]||(u[2]=S=>_.value.TSLO_ATTN=S),dense:""},null,8,["modelValue"])])]),s("div",Ie,[s("div",Re,[e(m,{label:"Destination Name",modelValue:_.value.TSLO_ADDRESS_NAME,"onUpdate:modelValue":u[3]||(u[3]=S=>_.value.TSLO_ADDRESS_NAME=S),dense:""},null,8,["modelValue"])])]),s("div",he,[s("div",we,[e(m,{label:"Destination Address",modelValue:_.value.TSLO_ADDRESS_DESCRIPTION,"onUpdate:modelValue":u[4]||(u[4]=S=>_.value.TSLO_ADDRESS_DESCRIPTION=S),dense:""},null,8,["modelValue"])])])]),_:1}),e(z,{align:"right"},{default:l(()=>[e(c,{label:"OK",color:"primary",onClick:u[5]||(u[5]=S=>t()),disable:I.stateSubmit,loading:I.loading},null,8,["disable","loading"]),e(c,{flat:"",label:"Cancel",color:"red",onClick:q(n)},null,8,["onClick"])]),_:1})]),_:1})]),_:1},8,["onHide"]))}},Ne=s("div",{class:"text-h6"},"RO Maintenance",-1),Pe={style:{border:"1px black solid","border-radius":"10px"}},Me=s("legend",{style:{"margin-left":"1em",padding:"0.2em 0.8em"}},[s("b",null,"Header")],-1),ke={class:"row"},Qe={class:"col"},Ye={class:"col q-pl-md"},$e={class:"row items-center justify-end"},qe={class:"col q-pl-md"},xe={class:"row items-center justify-end"},Fe={class:"row"},He={class:"col"},Be={class:"col q-pl-md"},Ge={class:"col q-pl-md"},je={class:"row q-py-md"},Ke={class:"col"},Je={key:0,class:"row"},We={class:"col"},Xe={class:"row"},Ze={class:"col"},ze={style:{border:"1px black solid","border-radius":"10px",height:"35vh",overflow:"auto"},class:"q-pa-md"},el=s("legend",{style:{"margin-left":"1em",padding:"0.2em 0.8em"}},[s("b",null,"Detail Items")],-1),ll={class:"row q-pb-md"},al={class:"col"},ol={class:"text-h6"},tl={class:"col text-right"},sl={class:"row"},nl={class:"col"},dl={class:"row items-center justify-end"},il={class:"row items-center justify-end"},X={__name:"salesOrderCreate",props:{sloHeader:String},setup(P){const g=G(),_=P,t=T({TSLO_SLOCD:"",TSLO_ISSUDT:ge.formatDate(Date.now(),"YYYY-MM-DD"),TSLO_PLAN_DLVDT:"",TSLO_QUOCD:"",TSLO_POCD:"",TSLO_CUSCD:"",TSLO_ATTN:"",TSLO_TYPE:1,TSLO_ADDRESS_NAME:"",TSLO_ADDRESS_DESCRIPTION:"",TSLO_SERVTRANS_COST:0,TSLO_ISCON:!1});T(""),T("");const V=T([]),U=T([]),C=T([]),n=T(!1),I=T(1),u=T([]);B(async()=>{_.sloHeader&&_.sloHeader!==""&&(await ae(_.sloHeader),console.log(t.value),await v(t.value.TSLO_QUOCD)),E()});const S=(d,a,o,f)=>{a(async()=>{f==="quotation"&&await v(d),f==="item"&&await p(d),f==="cust"&&await E(d)})},v=async(d="")=>{n.value=!0,await b.post("quotation/search",{searchBy:"MCUS_CUSNM",searchValue:d,approval:1}).then(a=>{n.value=!1,V.value=a.data.data}).catch(a=>{n.value=!1})},p=async d=>{n.value=!0,await b.post("item/searchAPI",{searchValue:d}).then(a=>{n.value=!1,U.value=a.data.data}).catch(()=>{n.value=!1})},r=()=>t.value.TSLO_TYPE===1?"Rental":t.value.TSLO_TYPE===2?"Sales":"Service",E=async d=>{n.value=!0,await b.post("customer/searchAPI",{searchValue:d}).then(a=>{n.value=!1,C.value=a.data.data}).catch(()=>{n.value=!1})},ae=async d=>{n.value=!0,await b.get(`receive-order/getData/${btoa(d)}`).then(a=>{n.value=!1,console.log(a.data.det),t.value=a.data,u.value=a.data.det}).catch(()=>{n.value=!1})},oe=async d=>{console.log(d),n.value=!0,await fe.get(`transaction/quotation/view/${btoa(d)}`).then(a=>{n.value=!1,console.log(a.data.data),t.value.TSLO_CUSCD=a.data.data.TQUO_CUSCD,t.value.TSLO_ADDRESS_NAME=a.data.data.cust.MCUS_CUSNM,t.value.TSLO_ADDRESS_DESCRIPTION=a.data.data.cust.TQUO_PROJECT_LOCATION,t.value.TSLO_ATTN=a.data.data.TQUO_ATTN,u.value=[],a.data.data.det.map(o=>{u.value.push({TSLODETA_ITMCD:o.TQUODETA_ITMCD,TSLODETA_ITMQT:o.TQUODETA_ITMQT,TSLODETA_USAGE_DESCRIPTION:o.TQUODETA_USAGE,TSLODETA_PRC:o.TQUODETA_PRC,TSLODETA_PERIOD_FR:o.TQUODETA_PERIOD_FR,TSLODETA_PERIOD_TO:o.TQUODETA_PERIOD_TO})})}).catch(a=>{n.value=!1})},te=()=>{u.value.push({TSLODETA_ITMCD:"",TSLODETA_ITMQT:"",TSLODETA_USAGE_DESCRIPTION:"",TSLODETA_PRC:0,TSLODETA_PERIOD_FR:"",TSLODETA_PERIOD_TO:""})},se=d=>{g.dialog({title:"Confirmation",message:`Do you want to delete this lines no ${d+1} ?`,cancel:!0,persistent:!0}).onOk(async()=>{u.value.splice(d,1)})},ne=()=>{g.dialog({title:"Confirmation",message:"Are you sure want to save this RO ?",cancel:!0,persistent:!0}).onOk(async()=>{n.value=!0,await b.post("receive-order/saveAPI",{...t.value,det:u.value}).then(d=>{n.value=!1,g.notify({color:"green",message:`${d.data.msg}`}),re()}).catch(()=>{n.value=!1})})},de=()=>{g.dialog({component:ye,componentProps:{custData:{TSLO_CUSCD:t.value.TSLO_CUSCD,MCUS_CUSNM:t.value.TSLO_ADDRESS_NAME,TSLO_ATTN:t.value.TSLO_ATTN,TSLO_ADDRESS_NAME:t.value.TSLO_ADDRESS_NAME,TSLO_ADDRESS_DESCRIPTION:t.value.TSLO_ADDRESS_DESCRIPTION}}}).onOk(async d=>{console.log(d),t.value.TSLO_CUSCD=d.TSLO_CUSCD,t.value.TSLO_ATTN=d.TSLO_ATTN,t.value.TSLO_ADDRESS_NAME=d.TSLO_ADDRESS_NAME,t.value.TSLO_ADDRESS_DESCRIPTION=d.TSLO_ADDRESS_DESCRIPTION})},{dialogRef:ie,onDialogHide:ue,onDialogOK:re,onDialogCancel:_e}=le();return(d,a)=>(L(),h(ee,{ref_key:"dialogRef",ref:ie,onHide:q(ue),"transition-show":"slide-up","transition-hide":"slide-down","full-width":""},{default:l(()=>[e(Z,{class:"q-dialog-plugin bg-white q-pa-sm"},{default:l(()=>[e($,null,{default:l(()=>[Ne]),_:1}),e($,{class:"q-pa-sm"},{default:l(()=>[s("fieldset",Pe,[Me,s("div",ke,[s("div",Qe,[e(m,{label:"RO Code",dense:"",filled:"",modelValue:t.value.TSLO_SLOCD,"onUpdate:modelValue":a[0]||(a[0]=o=>t.value.TSLO_SLOCD=o),disable:"",loading:n.value},null,8,["modelValue","loading"])]),s("div",Ye,[e(m,{filled:"",modelValue:t.value.TSLO_ISSUDT,"onUpdate:modelValue":a[2]||(a[2]=o=>t.value.TSLO_ISSUDT=o),dense:"",label:"Issue Date",loading:n.value,onClick:a[3]||(a[3]=o=>d.quotationIssueDate.qDateProxy.show()),mask:"####-##-##","fill-mask":"",hint:"Mask: YYYY-MM-DD"},{append:l(()=>[e(y,{name:"event",class:"cursor-pointer"},{default:l(()=>[e(M,{cover:"","transition-show":"scale","transition-hide":"scale"},{default:l(()=>[e(k,{modelValue:t.value.TSLO_ISSUDT,"onUpdate:modelValue":a[1]||(a[1]=o=>t.value.TSLO_ISSUDT=o),mask:"YYYY-MM-DD"},{default:l(()=>[s("div",$e,[w(e(c,{label:"Close",color:"primary",flat:""},null,512),[[Q]])])]),_:1},8,["modelValue"])]),_:1})]),_:1})]),_:1},8,["modelValue","loading"])]),s("div",qe,[e(m,{filled:"",modelValue:t.value.TSLO_PLAN_DLVDT,"onUpdate:modelValue":a[5]||(a[5]=o=>t.value.TSLO_PLAN_DLVDT=o),dense:"",label:"Delivery Date",loading:n.value,onClick:a[6]||(a[6]=o=>d.quotationIssueDate.qDateProxy.show()),mask:"####-##-##","fill-mask":"",hint:"Mask: YYYY-MM-DD"},{append:l(()=>[e(y,{name:"event",class:"cursor-pointer"},{default:l(()=>[e(M,{cover:"","transition-show":"scale","transition-hide":"scale"},{default:l(()=>[e(k,{modelValue:t.value.TSLO_PLAN_DLVDT,"onUpdate:modelValue":a[4]||(a[4]=o=>t.value.TSLO_PLAN_DLVDT=o),mask:"YYYY-MM-DD"},{default:l(()=>[s("div",xe,[w(e(c,{label:"Close",color:"primary",flat:""},null,512),[[Q]])])]),_:1},8,["modelValue"])]),_:1})]),_:1})]),_:1},8,["modelValue","loading"])])]),s("div",Fe,[s("div",He,[e(Y,{dense:"",filled:"",label:"Sales Quotation Code",modelValue:t.value.TSLO_QUOCD,"onUpdate:modelValue":[a[7]||(a[7]=o=>t.value.TSLO_QUOCD=o),oe],"use-input":"","input-debounce":"500",options:V.value,onFilter:a[8]||(a[8]=(o,f,i)=>S(o,f,i,"quotation")),behavior:"dialog","option-label":"DESCSEL","option-value":"TQUO_QUOCD","emit-value":"","map-options":"",loading:n.value},null,8,["modelValue","options","loading"])]),s("div",Be,[e(m,{label:"PO Number",dense:"",filled:"",modelValue:t.value.TSLO_POCD,"onUpdate:modelValue":a[9]||(a[9]=o=>t.value.TSLO_POCD=o),loading:n.value},null,8,["modelValue","loading"])]),s("div",Ge,[e(Y,{dense:"",filled:"",label:"Customer Name",modelValue:t.value.TSLO_CUSCD,"onUpdate:modelValue":a[10]||(a[10]=o=>t.value.TSLO_CUSCD=o),"use-input":"","input-debounce":"500",options:C.value,onFilter:a[11]||(a[11]=(o,f,i)=>S(o,f,i,"cust")),behavior:"dialog","option-label":"MCUS_CUSNM","option-value":"MCUS_CUSCD","emit-value":"","map-options":"",loading:n.value,readonly:I.value===3},null,8,["modelValue","options","loading","readonly"])])])]),s("div",je,[s("div",Ke,[e(Le,{modelValue:t.value.TSLO_TYPE,"onUpdate:modelValue":a[12]||(a[12]=o=>t.value.TSLO_TYPE=o),spread:"","no-caps":"","toggle-color":"purple",color:"white","text-color":"black",options:[{label:"Rental",value:1},{label:"Sales",value:2},{label:"Service",value:3}]},null,8,["modelValue"])])]),t.value.TSLO_TYPE!=1?(L(),N("div",Je,[s("div",We,[e(m,{prefix:"Rp",label:"Service & Transportation Price",modelValue:t.value.TSLO_SERVTRANS_COST,"onUpdate:modelValue":a[13]||(a[13]=o=>t.value.TSLO_SERVTRANS_COST=o),filled:"",dense:""},null,8,["modelValue"])])])):Te("",!0),s("div",Xe,[s("div",Ze,[e(ce,{modelValue:t.value.TSLO_ISCON,"onUpdate:modelValue":a[14]||(a[14]=o=>t.value.TSLO_ISCON=o),label:"Is Contract ?",color:"teal","toggle-indeterminate":!1,"true-value":1,"false-value":0,"indeterminate-value":0,disable:n.value},null,8,["modelValue","disable"])])]),s("fieldset",ze,[el,s("div",ll,[s("div",al,[s("span",ol,R(r()),1)]),s("div",tl,[e(c,{flat:"",icon:"add",color:"blue",label:"Add Lines",onClick:te,loading:n.value},null,8,["loading"]),e(c,{flat:"",icon:"person",color:"indigo",label:"Customer",onClick:de,loading:n.value},null,8,["loading"])])]),s("div",sl,[s("div",nl,[e(pe,{bordered:"",dense:""},{default:l(()=>[u.value.length>0?(L(!0),N(F,{key:0},H(u.value,(o,f)=>(L(),h(j,{key:f,class:"q-my-sm",dense:""},{default:l(()=>[e(A,{avatar:""},{default:l(()=>[e(De,{"text-color":"blue"},{default:l(()=>[D(R(f+1),1)]),_:2},1024)]),_:2},1024),e(A,null,{default:l(()=>[e(O,{class:"text-center"},{default:l(()=>[e(Y,{dense:"",filled:"",label:"Item Name",modelValue:o.TSLODETA_ITMCD,"onUpdate:modelValue":i=>o.TSLODETA_ITMCD=i,"use-input":"","input-debounce":"500",options:U.value,onFilter:a[15]||(a[15]=(i,Se,me)=>S(i,Se,me,"item")),behavior:"dialog","option-label":"MITM_ITMNM","option-value":"MITM_ITMNM","emit-value":"","map-options":"",loading:n.value},null,8,["modelValue","onUpdate:modelValue","options","loading"])]),_:2},1024),e(O,{caption:""},{default:l(()=>[D(" Item Name ")]),_:1})]),_:2},1024),e(A,null,{default:l(()=>[e(O,null,{default:l(()=>[e(m,{modelValue:o.TSLODETA_ITMQT,"onUpdate:modelValue":i=>o.TSLODETA_ITMQT=i,dense:""},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1024),e(O,{caption:""},{default:l(()=>[D(" Qty ")]),_:1})]),_:2},1024),e(A,null,{default:l(()=>[e(O,null,{default:l(()=>[e(m,{modelValue:o.TSLODETA_USAGE_DESCRIPTION,"onUpdate:modelValue":i=>o.TSLODETA_USAGE_DESCRIPTION=i,dense:""},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1024),e(O,{caption:""},{default:l(()=>[D(" Usage ")]),_:1})]),_:2},1024),e(A,null,{default:l(()=>[e(O,null,{default:l(()=>[e(m,{modelValue:o.TSLODETA_PRC,"onUpdate:modelValue":i=>o.TSLODETA_PRC=i,dense:""},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1024),e(O,{caption:""},{default:l(()=>[D(" Price ")]),_:1})]),_:2},1024),e(A,null,{default:l(()=>[e(O,null,{default:l(()=>[e(m,{filled:"",modelValue:o.TSLODETA_PERIOD_FR,"onUpdate:modelValue":i=>o.TSLODETA_PERIOD_FR=i,dense:"",loading:n.value,onClick:a[16]||(a[16]=i=>d.quotationIssueDate.qDateProxy.show()),mask:"####-##-##","fill-mask":""},{append:l(()=>[e(y,{name:"event",class:"cursor-pointer"},{default:l(()=>[e(M,{cover:"","transition-show":"scale","transition-hide":"scale"},{default:l(()=>[e(k,{modelValue:o.TSLODETA_PERIOD_FR,"onUpdate:modelValue":i=>o.TSLODETA_PERIOD_FR=i,mask:"YYYY-MM-DD"},{default:l(()=>[s("div",dl,[w(e(c,{label:"Close",color:"primary",flat:""},null,512),[[Q]])])]),_:2},1032,["modelValue","onUpdate:modelValue"])]),_:2},1024)]),_:2},1024)]),_:2},1032,["modelValue","onUpdate:modelValue","loading"])]),_:2},1024),e(O,{caption:""},{default:l(()=>[D(" Period From ")]),_:1})]),_:2},1024),e(A,null,{default:l(()=>[e(O,null,{default:l(()=>[e(m,{filled:"",modelValue:o.TSLODETA_PERIOD_TO,"onUpdate:modelValue":i=>o.TSLODETA_PERIOD_TO=i,dense:"",loading:n.value,onClick:a[17]||(a[17]=i=>d.quotationIssueDate.qDateProxy.show()),mask:"####-##-##","fill-mask":""},{append:l(()=>[e(y,{name:"event",class:"cursor-pointer"},{default:l(()=>[e(M,{cover:"","transition-show":"scale","transition-hide":"scale"},{default:l(()=>[e(k,{modelValue:o.TSLODETA_PERIOD_TO,"onUpdate:modelValue":i=>o.TSLODETA_PERIOD_TO=i,mask:"YYYY-MM-DD"},{default:l(()=>[s("div",il,[w(e(c,{label:"Close",color:"primary",flat:""},null,512),[[Q]])])]),_:2},1032,["modelValue","onUpdate:modelValue"])]),_:2},1024)]),_:2},1024)]),_:2},1032,["modelValue","onUpdate:modelValue","loading"])]),_:2},1024),e(O,{caption:""},{default:l(()=>[D(" Period To ")]),_:1})]),_:2},1024),e(A,{side:""},{default:l(()=>[e(c,{icon:"delete",color:"red",flat:"",onClick:i=>se(f)},null,8,["onClick"])]),_:2},1024)]),_:2},1024))),128)):w((L(),h(j,{key:1,class:"q-my-sm",clickable:""},{default:l(()=>[e(A,null,{default:l(()=>[e(O,null,{default:l(()=>[D(" No Items Added ")]),_:1})]),_:1})]),_:1})),[[Oe]])]),_:1})])])])]),_:1}),e(z,{align:"right"},{default:l(()=>[e(c,{label:"OK",color:"primary",onClick:a[18]||(a[18]=o=>ne()),disable:d.stateSubmit,loading:n.value},null,8,["disable","loading"]),e(c,{flat:"",label:"Cancel",color:"red",onClick:q(_e)},null,8,["onClick"])]),_:1})]),_:1})]),_:1},8,["onHide"]))}};const ul={class:"q-pa-md"},rl={class:"row q-pb-md"},_l=s("div",{class:"col"},[s("span",{class:"text-h4"},"Sales Order / Receive Order")],-1),Sl={class:"col text-right"},ml={class:"row q-pt-md"},Tl={class:"col"},Al={__name:"salesOrderView",setup(P){const g=G(),_=T("TSLO_SLOCD"),t=T(""),V=T([]),U=T([{name:"TSLO_SLOCD",label:"RO. Code",field:"TSLO_SLOCD",sortable:!0,align:"left"},{name:"MCUS_CUSNM",label:"Customer Name",field:"MCUS_CUSNM",sortable:!0,align:"left"},{name:"TSLO_ADDRESS_NAME",label:"Customer Addr.",field:"TSLO_ADDRESS_NAME",sortable:!0,align:"left"},{name:"TSLO_CUSCD",label:"Customer Code",field:"TSLO_CUSCD",sortable:!0,align:"left"},{name:"TSLO_ISSUDT",label:"Issue Date",field:"TSLO_ISSUDT",sortable:!0,align:"left"},{name:"TSLO_QUOCD",label:"Quot. Code",field:"TSLO_QUOCD",sortable:!0,align:"left"}]),C=T(!1);B(()=>{n()});const n=async()=>{C.value=!0,await b.post("receive-order/searchAPI",{searchBy:_.value,searchValue:t.value}).then(v=>{C.value=!1,V.value=v.data.data}).catch(v=>{C.value=!1})},I=()=>{g.dialog({component:X}).onOk(async v=>{n()})},u=v=>{console.log(v),g.dialog({component:X,componentProps:{sloHeader:v}}).onOk(async p=>{n()})},S=v=>{g.dialog({title:"Confirmation",message:"Are you sure want to delete this data ?",cancel:!0,persistent:!0}).onOk(async()=>{C.value=!0,await b.delete(`receive-order/itemsAPI/${btoa(v)}`).then(p=>{C.value=!1,n()})})};return(v,p)=>(L(),N("div",ul,[s("div",rl,[_l,s("div",Sl,[e(c,{icon:"add",color:"blue",onClick:p[0]||(p[0]=r=>I())},{default:l(()=>[e(x,null,{default:l(()=>[D("Create New RO")]),_:1})]),_:1})])]),e(ve),s("div",ml,[s("div",Tl,[e(Ce,{title:"Created RO",rows:V.value,columns:U.value,"row-key":"name",loading:C.value,dense:"",pagination:{rowsPerPage:20},class:"my-sticky-header-column-table"},{"top-right":l(()=>[e(Y,{outlined:"",modelValue:_.value,"onUpdate:modelValue":p[1]||(p[1]=r=>_.value=r),options:U.value,label:"Search Columns","option-value":"name","option-label":"label","emit-value":"",dense:"","map-options":""},null,8,["modelValue","options"]),e(m,{borderless:"",dense:"",modelValue:t.value,"onUpdate:modelValue":[p[2]||(p[2]=r=>t.value=r),p[3]||(p[3]=r=>n())],placeholder:"Search",outlined:"",debounce:"1000"},{append:l(()=>[e(y,{name:"search"})]),_:1},8,["modelValue"])]),header:l(r=>[e(J,{props:r},{default:l(()=>[e(K,{"auto-width":""},{default:l(()=>[D("Action")]),_:1}),(L(!0),N(F,null,H(r.cols,E=>(L(),h(K,{key:E.name,props:r},{default:l(()=>[D(R(E.label),1)]),_:2},1032,["props"]))),128))]),_:2},1032,["props"])]),body:l(r=>[e(J,{props:r},{default:l(()=>[e(W,{"auto-width":""},{default:l(()=>[e(c,{flat:"",color:r.row.dlv.length>0?"grey":"orange",icon:"edit",onClick:E=>u(r.row.TSLO_SLOCD),dense:""},{default:l(()=>[e(x,null,{default:l(()=>[D(R(r.row.dlv.length>0?"RO already used for delivery, cannot edit !":"Edit this RO"),1)]),_:2},1024)]),_:2},1032,["color","onClick"]),e(c,{flat:"",color:r.row.dlv.length>0?"grey":"red",icon:"delete",onClick:E=>S(r.row.TSLO_SLOCD),dense:"",disable:r.row.dlv.length>0},{default:l(()=>[e(x,null,{default:l(()=>[D(R(r.row.dlv.length>0?"RO already used for delivery, cannot delete !":"Delete this RO"),1)]),_:2},1024)]),_:2},1032,["color","onClick","disable"])]),_:2},1024),(L(!0),N(F,null,H(r.cols,E=>(L(),h(W,{key:E.name,props:r},{default:l(()=>[D(R(E.value),1)]),_:2},1032,["props"]))),128))]),_:2},1032,["props"])]),_:1},8,["rows","columns","loading"])])])]))}};export{Al as default};
