import{Q as x}from"./QTooltip.28818d73.js";import{o as B,t as S,C,D as k,E as n,F as e,M as W,O as Q,J as t,$ as c,X as ee,Q as v,Y,Z as le,an as I,U as N,R as U,a_ as Te,a0 as ce,P as R,S as F,T as H,V as me,I as V,aY as ve}from"./index.21ac5b08.js";import{a as G,u as ae,l as h,k as Oe,m as J}from"./QTable.36899841.js";import{Q as X,a as Z}from"./QTd.cacbe1e6.js";import{api_web as g,api as De}from"./axios.d775ddd2.js";import{Q as P,a as y,C as M}from"./ClosePopup.9549a402.js";import{Q as pe}from"./QBtnToggle.cead7ddf.js";import{d as Ce}from"./date.f772b368.js";import"./use-render-cache.3aae9b27.js";import"./QBtnGroup.95cd7be7.js";const Le=t("div",{class:"text-h6"},"Customer Detail",-1),fe={class:"row"},ge={class:"col"},Ee={class:"col q-pl-md"},Ae={class:"col q-pl-md"},Ve={class:"row q-pt-md"},Ue={class:"col"},be={class:"row q-pt-md"},Re={class:"col"},Ie={__name:"customerView",props:{custData:Array},setup(w){G();const L=w;B(()=>{_.value=L.custData});const _=S({TSLO_CUSCD:"",MCUS_CUSNM:"",TSLO_ATTN:"",TSLO_ADDRESS_NAME:"",TSLO_ADDRESS_DESCRIPTION:""}),a=()=>{p(_.value)},{dialogRef:E,onDialogHide:A,onDialogOK:p,onDialogCancel:s}=ae();return(b,u)=>(C(),k(le,{ref_key:"dialogRef",ref:E,onHide:Y(A),"transition-show":"slide-up","transition-hide":"slide-down","full-width":""},{default:n(()=>[e(W,{class:"q-dialog-plugin bg-white q-pa-sm"},{default:n(()=>[e(Q,null,{default:n(()=>[Le]),_:1}),e(Q,{class:"q-pa-sm"},{default:n(()=>[t("div",fe,[t("div",ge,[e(c,{label:"Customer Code",readonly:"",modelValue:_.value.TSLO_CUSCD,"onUpdate:modelValue":u[0]||(u[0]=T=>_.value.TSLO_CUSCD=T),dense:""},null,8,["modelValue"])]),t("div",Ee,[e(c,{label:"Customer Name",readonly:"",modelValue:_.value.MCUS_CUSNM,"onUpdate:modelValue":u[1]||(u[1]=T=>_.value.MCUS_CUSNM=T),dense:""},null,8,["modelValue"])]),t("div",Ae,[e(c,{label:"Attn.",modelValue:_.value.TSLO_ATTN,"onUpdate:modelValue":u[2]||(u[2]=T=>_.value.TSLO_ATTN=T),dense:""},null,8,["modelValue"])])]),t("div",Ve,[t("div",Ue,[e(c,{label:"Destination Name",modelValue:_.value.TSLO_ADDRESS_NAME,"onUpdate:modelValue":u[3]||(u[3]=T=>_.value.TSLO_ADDRESS_NAME=T),dense:""},null,8,["modelValue"])])]),t("div",be,[t("div",Re,[e(c,{label:"Destination Address",modelValue:_.value.TSLO_ADDRESS_DESCRIPTION,"onUpdate:modelValue":u[4]||(u[4]=T=>_.value.TSLO_ADDRESS_DESCRIPTION=T),dense:""},null,8,["modelValue"])])])]),_:1}),e(ee,{align:"right"},{default:n(()=>[e(v,{label:"OK",color:"primary",onClick:u[5]||(u[5]=T=>a()),disable:b.stateSubmit,loading:b.loading},null,8,["disable","loading"]),e(v,{flat:"",label:"Cancel",color:"red",onClick:Y(s)},null,8,["onClick"])]),_:1})]),_:1})]),_:1},8,["onHide"]))}},he=t("div",{class:"text-h6"},"RO Maintenance",-1),we={style:{border:"1px black solid","border-radius":"10px"}},Ne=t("legend",{style:{"margin-left":"1em",padding:"0.2em 0.8em"}},[t("b",null,"Header")],-1),Pe={class:"row"},ye={class:"col-lg-12"},Me={class:"col-lg-12 q-pl-md"},ke={class:"row items-center justify-end"},Qe={class:"col-lg-12 q-pl-md"},Ye={class:"row items-center justify-end"},$e={class:"row"},qe={class:"col-lg-12"},xe={class:"col-lg-12 q-pl-md"},Fe={class:"col-lg-12 q-pl-md"},He={class:"row q-py-md"},Be={class:"col"},Ge={key:0,class:"row"},je={class:"col"},Ke={class:"row"},Je={class:"col"},Xe={style:{border:"1px black solid","border-radius":"10px",height:"35vh",overflow:"auto"},class:"q-pa-md"},Ze=t("legend",{style:{"margin-left":"1em",padding:"0.2em 0.8em"}},[t("b",null,"Detail Items")],-1),ze={class:"row q-pb-md"},We={class:"col"},el={class:"text-h6"},ll={class:"col text-right"},al={class:"col"},ol={class:"col"},tl={class:"col"},sl={class:"col"},nl={class:"col"},dl={class:"col"},il={class:"row items-center justify-end"},ul={class:"col"},rl={class:"row items-center justify-end"},_l={class:"col-1"},Sl={key:1,class:"text-center"},z={__name:"salesOrderCreate",props:{sloHeader:String},setup(w){const L=G(),_=w,a=S({TSLO_SLOCD:"",TSLO_ISSUDT:Ce.formatDate(Date.now(),"YYYY-MM-DD"),TSLO_PLAN_DLVDT:"",TSLO_QUOCD:"",TSLO_POCD:"",TSLO_CUSCD:"",TSLO_ATTN:"",TSLO_TYPE:1,TSLO_ADDRESS_NAME:"",TSLO_ADDRESS_DESCRIPTION:"",TSLO_SERVTRANS_COST:0,TSLO_ISCON:!1});S(""),S("");const E=S([]),A=S([]),p=S([]),s=S(!1),b=S(1),u=S([]),T=S([]);B(async()=>{await K(),await j(),_.sloHeader&&_.sloHeader!==""&&(await oe(_.sloHeader),console.log(a.value),await O(a.value.TSLO_QUOCD))});const m=(d,l,o,D)=>{l(async()=>{D==="quotation"&&await O(d),D==="item"&&await r(d),D==="cust"&&await j(d),D==="usage"&&await K(d)})},O=async(d="")=>{s.value=!0,await g.post("quotation/search",{searchBy:"MCUS_CUSNM",searchValue:d,approval:1}).then(l=>{s.value=!1,E.value=l.data.data}).catch(l=>{s.value=!1})},r=async d=>{s.value=!0,await g.post("item/searchAPI",{searchValue:d}).then(l=>{s.value=!1,A.value=l.data.data}).catch(()=>{s.value=!1})},f=()=>a.value.TSLO_TYPE===1?"Rental":a.value.TSLO_TYPE===2?"Sales":"Service",j=async d=>{s.value=!0,await g.post("customer/searchAPI",{searchValue:d}).then(l=>{s.value=!1,p.value=l.data.data}).catch(()=>{s.value=!1})},K=async d=>{s.value=!0,await g.post("usage/searchAPI",{searchValue:d}).then(l=>{s.value=!1,T.value=l.data.data}).catch(()=>{s.value=!1})},oe=async d=>{s.value=!0,await g.get(`receive-order/getData/${btoa(d)}`).then(l=>{s.value=!1,console.log(l.data.det),a.value=l.data,a.value.TSLO_TYPE=parseInt(l.data.TSLO_TYPE),u.value=l.data.det}).catch(()=>{s.value=!1})},te=async d=>{console.log(d),s.value=!0,await De.get(`transaction/quotation/view/${btoa(d)}`).then(l=>{s.value=!1,console.log(l.data.data),a.value.TSLO_CUSCD=l.data.data.TQUO_CUSCD,a.value.TSLO_ADDRESS_NAME=l.data.data.cust.MCUS_CUSNM,a.value.TSLO_ADDRESS_DESCRIPTION=l.data.data.cust.TQUO_PROJECT_LOCATION,a.value.TSLO_ATTN=l.data.data.TQUO_ATTN,a.value.TSLO_TYPE=parseInt(l.data.data.TQUO_TYPE),a.value.TSLO_SERVTRANS_COST=parseInt(l.data.data.TQUO_SERVTRANS_COST),u.value=[],l.data.data.det.map(o=>{u.value.push({TSLODETA_ITMCD:o.TQUODETA_ITMCD,TSLODETA_ITMQT:o.TQUODETA_ITMQT,TSLODETA_USAGE_DESCRIPTION:parseInt(o.TQUODETA_USAGE),TSLODETA_PRC:o.TQUODETA_PRC,TSLODETA_PERIOD_FR:o.TQUODETA_PERIOD_FR,TSLODETA_PERIOD_TO:o.TQUODETA_PERIOD_TO})})}).catch(l=>{s.value=!1})},se=()=>{u.value.push({TSLODETA_ITMCD:"",TSLODETA_ITMQT:"",TSLODETA_USAGE_DESCRIPTION:"",TSLODETA_PRC:0,TSLODETA_PERIOD_FR:"",TSLODETA_PERIOD_TO:""})},ne=d=>{L.dialog({title:"Confirmation",message:`Do you want to delete this lines no ${d+1} ?`,cancel:!0,persistent:!0}).onOk(async()=>{u.value.splice(d,1)})},de=()=>{L.dialog({title:"Confirmation",message:"Are you sure want to save this RO ?",cancel:!0,persistent:!0}).onOk(async()=>{s.value=!0,await g.post("receive-order/saveAPI",{...a.value,det:u.value}).then(d=>{s.value=!1,L.notify({color:"green",message:`${d.data.msg}`}),_e()}).catch(()=>{s.value=!1})})},ie=()=>{L.dialog({component:Ie,componentProps:{custData:{TSLO_CUSCD:a.value.TSLO_CUSCD,MCUS_CUSNM:a.value.TSLO_ADDRESS_NAME,TSLO_ATTN:a.value.TSLO_ATTN,TSLO_ADDRESS_NAME:a.value.TSLO_ADDRESS_NAME,TSLO_ADDRESS_DESCRIPTION:a.value.TSLO_ADDRESS_DESCRIPTION}}}).onOk(async d=>{console.log(d),a.value.TSLO_CUSCD=d.TSLO_CUSCD,a.value.TSLO_ATTN=d.TSLO_ATTN,a.value.TSLO_ADDRESS_NAME=d.TSLO_ADDRESS_NAME,a.value.TSLO_ADDRESS_DESCRIPTION=d.TSLO_ADDRESS_DESCRIPTION})},{dialogRef:ue,onDialogHide:re,onDialogOK:_e,onDialogCancel:Se}=ae();return(d,l)=>(C(),k(le,{ref_key:"dialogRef",ref:ue,onHide:Y(re),"transition-show":"slide-up","transition-hide":"slide-down","full-width":""},{default:n(()=>[e(W,{class:"q-dialog-plugin bg-white q-pa-sm"},{default:n(()=>[e(Q,null,{default:n(()=>[he]),_:1}),e(Q,{class:"q-pa-sm"},{default:n(()=>[t("fieldset",we,[Ne,t("div",Pe,[t("div",ye,[e(c,{label:"RO Code",dense:"",filled:"",modelValue:a.value.TSLO_SLOCD,"onUpdate:modelValue":l[0]||(l[0]=o=>a.value.TSLO_SLOCD=o),disable:"",loading:s.value},null,8,["modelValue","loading"])]),t("div",Me,[e(c,{filled:"",modelValue:a.value.TSLO_ISSUDT,"onUpdate:modelValue":l[2]||(l[2]=o=>a.value.TSLO_ISSUDT=o),dense:"",label:"Issue Date",loading:s.value,onClick:l[3]||(l[3]=o=>d.quotationIssueDate.qDateProxy.show()),mask:"####-##-##","fill-mask":"",hint:"Mask: YYYY-MM-DD"},{append:n(()=>[e(I,{name:"event",class:"cursor-pointer"},{default:n(()=>[e(P,{cover:"","transition-show":"scale","transition-hide":"scale"},{default:n(()=>[e(y,{modelValue:a.value.TSLO_ISSUDT,"onUpdate:modelValue":l[1]||(l[1]=o=>a.value.TSLO_ISSUDT=o),mask:"YYYY-MM-DD"},{default:n(()=>[t("div",ke,[N(e(v,{label:"Close",color:"primary",flat:""},null,512),[[M]])])]),_:1},8,["modelValue"])]),_:1})]),_:1})]),_:1},8,["modelValue","loading"])]),t("div",Qe,[e(c,{filled:"",modelValue:a.value.TSLO_PLAN_DLVDT,"onUpdate:modelValue":l[5]||(l[5]=o=>a.value.TSLO_PLAN_DLVDT=o),dense:"",label:"Delivery Date",loading:s.value,onClick:l[6]||(l[6]=o=>d.quotationIssueDate.qDateProxy.show()),mask:"####-##-##","fill-mask":"",hint:"Mask: YYYY-MM-DD"},{append:n(()=>[e(I,{name:"event",class:"cursor-pointer"},{default:n(()=>[e(P,{cover:"","transition-show":"scale","transition-hide":"scale"},{default:n(()=>[e(y,{modelValue:a.value.TSLO_PLAN_DLVDT,"onUpdate:modelValue":l[4]||(l[4]=o=>a.value.TSLO_PLAN_DLVDT=o),mask:"YYYY-MM-DD"},{default:n(()=>[t("div",Ye,[N(e(v,{label:"Close",color:"primary",flat:""},null,512),[[M]])])]),_:1},8,["modelValue"])]),_:1})]),_:1})]),_:1},8,["modelValue","loading"])])]),t("div",$e,[t("div",qe,[e(h,{dense:"",filled:"",label:"Sales Quotation Code",modelValue:a.value.TSLO_QUOCD,"onUpdate:modelValue":[l[7]||(l[7]=o=>a.value.TSLO_QUOCD=o),te],"use-input":"","input-debounce":"500",options:E.value,onFilter:l[8]||(l[8]=(o,D,i)=>m(o,D,i,"quotation")),behavior:"dialog","option-label":"DESCSEL","option-value":"TQUO_QUOCD","emit-value":"","map-options":"",loading:s.value},null,8,["modelValue","options","loading"])]),t("div",xe,[e(c,{label:"PO Number",dense:"",filled:"",modelValue:a.value.TSLO_POCD,"onUpdate:modelValue":l[9]||(l[9]=o=>a.value.TSLO_POCD=o),loading:s.value},null,8,["modelValue","loading"])]),t("div",Fe,[e(h,{dense:"",filled:"",label:"Customer Name",modelValue:a.value.TSLO_CUSCD,"onUpdate:modelValue":l[10]||(l[10]=o=>a.value.TSLO_CUSCD=o),"use-input":"","input-debounce":"500",options:p.value,onFilter:l[11]||(l[11]=(o,D,i)=>m(o,D,i,"cust")),behavior:"dialog","option-label":"MCUS_CUSNM","option-value":"MCUS_CUSCD","emit-value":"","map-options":"",loading:s.value,readonly:b.value===3},null,8,["modelValue","options","loading","readonly"])])])]),t("div",He,[t("div",Be,[e(pe,{modelValue:a.value.TSLO_TYPE,"onUpdate:modelValue":l[12]||(l[12]=o=>a.value.TSLO_TYPE=o),spread:"","no-caps":"","toggle-color":"purple",color:"white","text-color":"black",options:[{label:"Rental",value:1},{label:"Sales",value:2},{label:"Service",value:3}],disable:a.value.TSLO_QUOCD!==""},null,8,["modelValue","disable"])])]),a.value.TSLO_TYPE!=1?(C(),U("div",Ge,[t("div",je,[e(c,{prefix:"Rp",label:"Service & Transportation Price",modelValue:a.value.TSLO_SERVTRANS_COST,"onUpdate:modelValue":l[13]||(l[13]=o=>a.value.TSLO_SERVTRANS_COST=o),filled:"",dense:"",disable:a.value.TSLO_QUOCD!==""},null,8,["modelValue","disable"])])])):Te("",!0),t("div",Ke,[t("div",Je,[e(ce,{modelValue:a.value.TSLO_ISCON,"onUpdate:modelValue":l[14]||(l[14]=o=>a.value.TSLO_ISCON=o),label:"Is Contract ?",color:"teal","toggle-indeterminate":!1,"true-value":1,"false-value":0,"indeterminate-value":0,disable:s.value},null,8,["modelValue","disable"])])]),t("fieldset",Xe,[Ze,t("div",ze,[t("div",We,[t("span",el,R(f()),1)]),t("div",ll,[e(v,{flat:"",icon:"add",color:"blue",label:"Add Lines",onClick:se,loading:s.value},null,8,["loading"]),e(v,{flat:"",icon:"person",color:"indigo",label:"Customer",onClick:ie,loading:s.value},null,8,["loading"])])]),u.value.length>0?(C(!0),U(F,{key:0},H(u.value,(o,D)=>(C(),U("div",{class:"row",key:D},[t("div",al,[e(me,{"text-color":"blue"},{default:n(()=>[V(R(D+1),1)]),_:2},1024)]),t("div",ol,[e(h,{dense:"",filled:"",label:"Item Name",modelValue:o.TSLODETA_ITMCD,"onUpdate:modelValue":i=>o.TSLODETA_ITMCD=i,"use-input":"","input-debounce":"500",options:A.value,onFilter:l[15]||(l[15]=(i,$,q)=>m(i,$,q,"item")),behavior:"dialog","option-label":"MITM_ITMNM","option-value":"MITM_ITMNM","emit-value":"","map-options":"",loading:s.value},null,8,["modelValue","onUpdate:modelValue","options","loading"])]),t("div",tl,[e(c,{modelValue:o.TSLODETA_ITMQT,"onUpdate:modelValue":i=>o.TSLODETA_ITMQT=i,dense:""},null,8,["modelValue","onUpdate:modelValue"])]),t("div",sl,[e(h,{dense:"",filled:"",label:"Usage",modelValue:o.TSLODETA_USAGE_DESCRIPTION,"onUpdate:modelValue":i=>o.TSLODETA_USAGE_DESCRIPTION=i,"use-input":"","input-debounce":"500",options:T.value,onFilter:l[16]||(l[16]=(i,$,q)=>m(i,$,q,"usage")),behavior:"dialog","option-label":"MUSAGE_DESCALL","option-value":"id","emit-value":"","map-options":"",loading:s.value},null,8,["modelValue","onUpdate:modelValue","options","loading"])]),t("div",nl,[e(c,{modelValue:o.TSLODETA_PRC,"onUpdate:modelValue":i=>o.TSLODETA_PRC=i,dense:""},null,8,["modelValue","onUpdate:modelValue"])]),t("div",dl,[e(c,{filled:"",modelValue:o.TSLODETA_PERIOD_FR,"onUpdate:modelValue":i=>o.TSLODETA_PERIOD_FR=i,dense:"",loading:s.value,onClick:l[17]||(l[17]=i=>d.quotationIssueDate.qDateProxy.show()),mask:"####-##-##","fill-mask":""},{append:n(()=>[e(I,{name:"event",class:"cursor-pointer"},{default:n(()=>[e(P,{cover:"","transition-show":"scale","transition-hide":"scale"},{default:n(()=>[e(y,{modelValue:o.TSLODETA_PERIOD_FR,"onUpdate:modelValue":i=>o.TSLODETA_PERIOD_FR=i,mask:"YYYY-MM-DD"},{default:n(()=>[t("div",il,[N(e(v,{label:"Close",color:"primary",flat:""},null,512),[[M]])])]),_:2},1032,["modelValue","onUpdate:modelValue"])]),_:2},1024)]),_:2},1024)]),_:2},1032,["modelValue","onUpdate:modelValue","loading"])]),t("div",ul,[e(c,{filled:"",modelValue:o.TSLODETA_PERIOD_TO,"onUpdate:modelValue":i=>o.TSLODETA_PERIOD_TO=i,dense:"",loading:s.value,onClick:l[18]||(l[18]=i=>d.quotationIssueDate.qDateProxy.show()),mask:"####-##-##","fill-mask":""},{append:n(()=>[e(I,{name:"event",class:"cursor-pointer"},{default:n(()=>[e(P,{cover:"","transition-show":"scale","transition-hide":"scale"},{default:n(()=>[e(y,{modelValue:o.TSLODETA_PERIOD_TO,"onUpdate:modelValue":i=>o.TSLODETA_PERIOD_TO=i,mask:"YYYY-MM-DD"},{default:n(()=>[t("div",rl,[N(e(v,{label:"Close",color:"primary",flat:""},null,512),[[M]])])]),_:2},1032,["modelValue","onUpdate:modelValue"])]),_:2},1024)]),_:2},1024)]),_:2},1032,["modelValue","onUpdate:modelValue","loading"])]),t("div",_l,[e(v,{icon:"delete",color:"red",flat:"",onClick:i=>ne(D)},null,8,["onClick"])])]))),128)):(C(),U("div",Sl," No Items Added "))])]),_:1}),e(ee,{align:"right"},{default:n(()=>[e(v,{label:"OK",color:"primary",onClick:l[19]||(l[19]=o=>de()),disable:d.stateSubmit,loading:s.value},null,8,["disable","loading"]),e(v,{flat:"",label:"Cancel",color:"red",onClick:Y(Se)},null,8,["onClick"])]),_:1})]),_:1})]),_:1},8,["onHide"]))}};const Tl={class:"q-pa-md"},cl={class:"row q-pb-md"},ml=t("div",{class:"col"},[t("span",{class:"text-h4"},"Sales Order / Receive Order")],-1),vl={class:"col text-right"},Ol={class:"row q-pt-md"},Dl={class:"col"},Rl={__name:"salesOrderView",setup(w){const L=G(),_=S("TSLO_SLOCD"),a=S(""),E=S([]),A=S([{name:"TSLO_SLOCD",label:"RO. Code",field:"TSLO_SLOCD",sortable:!0,align:"left"},{name:"MCUS_CUSNM",label:"Customer Name",field:"MCUS_CUSNM",sortable:!0,align:"left"},{name:"TSLO_ADDRESS_NAME",label:"Customer Addr.",field:"TSLO_ADDRESS_NAME",sortable:!0,align:"left"},{name:"TSLO_CUSCD",label:"Customer Code",field:"TSLO_CUSCD",sortable:!0,align:"left"},{name:"TSLO_ISSUDT",label:"Issue Date",field:"TSLO_ISSUDT",sortable:!0,align:"left"},{name:"TSLO_QUOCD",label:"Quot. Code",field:"TSLO_QUOCD",sortable:!0,align:"left"}]),p=S(!1);B(()=>{s()});const s=async()=>{p.value=!0,await g.post("receive-order/searchAPI",{searchBy:_.value,searchValue:a.value}).then(m=>{p.value=!1,E.value=m.data.data}).catch(m=>{p.value=!1})},b=()=>{L.dialog({component:z}).onOk(async m=>{s()})},u=m=>{console.log(m),L.dialog({component:z,componentProps:{sloHeader:m}}).onOk(async O=>{s()})},T=m=>{L.dialog({title:"Confirmation",message:"Are you sure want to delete this data ?",cancel:!0,persistent:!0}).onOk(async()=>{p.value=!0,await g.delete(`receive-order/itemsAPI/${btoa(m)}`).then(O=>{p.value=!1,s()})})};return(m,O)=>(C(),U("div",Tl,[t("div",cl,[ml,t("div",vl,[e(v,{icon:"add",color:"blue",onClick:O[0]||(O[0]=r=>b())},{default:n(()=>[e(x,null,{default:n(()=>[V("Create New RO")]),_:1})]),_:1})])]),e(ve),t("div",Ol,[t("div",Dl,[e(Oe,{title:"Created RO",rows:E.value,columns:A.value,"row-key":"name",loading:p.value,dense:"",pagination:{rowsPerPage:20},class:"my-sticky-header-column-table"},{"top-right":n(()=>[e(h,{outlined:"",modelValue:_.value,"onUpdate:modelValue":O[1]||(O[1]=r=>_.value=r),options:A.value,label:"Search Columns","option-value":"name","option-label":"label","emit-value":"",dense:"","map-options":""},null,8,["modelValue","options"]),e(c,{borderless:"",dense:"",modelValue:a.value,"onUpdate:modelValue":[O[2]||(O[2]=r=>a.value=r),O[3]||(O[3]=r=>s())],placeholder:"Search",outlined:"",debounce:"1000"},{append:n(()=>[e(I,{name:"search"})]),_:1},8,["modelValue"])]),header:n(r=>[e(X,{props:r},{default:n(()=>[e(J,{"auto-width":""},{default:n(()=>[V("Action")]),_:1}),(C(!0),U(F,null,H(r.cols,f=>(C(),k(J,{key:f.name,props:r},{default:n(()=>[V(R(f.label),1)]),_:2},1032,["props"]))),128))]),_:2},1032,["props"])]),body:n(r=>[e(X,{props:r},{default:n(()=>[e(Z,{"auto-width":""},{default:n(()=>[e(v,{flat:"",color:r.row.dlv.length>0?"grey":"orange",icon:"edit",onClick:f=>u(r.row.TSLO_SLOCD),dense:""},{default:n(()=>[e(x,null,{default:n(()=>[V(R(r.row.dlv.length>0?"RO already used for delivery, cannot edit !":"Edit this RO"),1)]),_:2},1024)]),_:2},1032,["color","onClick"]),e(v,{flat:"",color:r.row.dlv.length>0?"grey":"red",icon:"delete",onClick:f=>T(r.row.TSLO_SLOCD),dense:"",disable:r.row.dlv.length>0},{default:n(()=>[e(x,null,{default:n(()=>[V(R(r.row.dlv.length>0?"RO already used for delivery, cannot delete !":"Delete this RO"),1)]),_:2},1024)]),_:2},1032,["color","onClick","disable"])]),_:2},1024),(C(!0),U(F,null,H(r.cols,f=>(C(),k(Z,{key:f.name,props:r},{default:n(()=>[V(R(f.value),1)]),_:2},1032,["props"]))),128))]),_:2},1032,["props"])]),_:1},8,["rows","columns","loading"])])])]))}};export{Rl as default};
