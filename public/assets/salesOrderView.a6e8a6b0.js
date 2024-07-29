import{Q as F}from"./QTooltip.de33b557.js";import{o as j,t as c,C,D as k,E as n,F as e,M as ee,O as Q,J as t,$ as T,X as le,Q as m,Y,Z as ae,av as I,U as P,R as A,aZ as J,a0 as Te,P as R,S as B,T as G,V as me,I as b,b6 as H,aI as ve}from"./index.adb6bcc0.js";import{Q as h}from"./QSelect.53ab5b3b.js";import{Q as Oe,a as Z}from"./QTable.264ec4fa.js";import{Q as z,a as X}from"./QTd.949d5bcf.js";import{u as K}from"./use-quasar.b660f995.js";import{api_web as E,api as De}from"./axios.7c1df3e3.js";import{Q as N,a as y,C as M}from"./ClosePopup.79550a13.js";import{Q as pe}from"./QBtnToggle.c7337d66.js";import{u as oe}from"./use-dialog-plugin-component.dc05722a.js";import{d as Ce}from"./date.afc574fe.js";import"./format.56704866.js";import"./QItemLabel.87b564d8.js";import"./QList.e109810c.js";import"./use-render-cache.3aae9b27.js";import"./QBtnGroup.045e6652.js";const Le=t("div",{class:"text-h6"},"Customer Detail",-1),fe={class:"row"},ge={class:"col"},Ee={class:"col q-pl-md"},Ae={class:"col q-pl-md"},Ve={class:"row q-pt-md"},Ue={class:"col"},be={class:"row q-pt-md"},Re={class:"col"},Ie={__name:"customerView",props:{custData:Array},setup(w){K();const f=w;j(()=>{r.value=f.custData});const r=c({TSLO_CUSCD:"",MCUS_CUSNM:"",TSLO_ATTN:"",TSLO_ADDRESS_NAME:"",TSLO_ADDRESS_DESCRIPTION:""}),a=()=>{L(r.value)},{dialogRef:V,onDialogHide:U,onDialogOK:L,onDialogCancel:s}=oe();return(v,_)=>(C(),k(ae,{ref_key:"dialogRef",ref:V,onHide:Y(U),"transition-show":"slide-up","transition-hide":"slide-down","full-width":""},{default:n(()=>[e(ee,{class:"q-dialog-plugin bg-white q-pa-sm"},{default:n(()=>[e(Q,null,{default:n(()=>[Le]),_:1}),e(Q,{class:"q-pa-sm"},{default:n(()=>[t("div",fe,[t("div",ge,[e(T,{label:"Customer Code",readonly:"",modelValue:r.value.TSLO_CUSCD,"onUpdate:modelValue":_[0]||(_[0]=S=>r.value.TSLO_CUSCD=S),dense:""},null,8,["modelValue"])]),t("div",Ee,[e(T,{label:"Customer Name",readonly:"",modelValue:r.value.MCUS_CUSNM,"onUpdate:modelValue":_[1]||(_[1]=S=>r.value.MCUS_CUSNM=S),dense:""},null,8,["modelValue"])]),t("div",Ae,[e(T,{label:"Attn.",modelValue:r.value.TSLO_ATTN,"onUpdate:modelValue":_[2]||(_[2]=S=>r.value.TSLO_ATTN=S),dense:""},null,8,["modelValue"])])]),t("div",Ve,[t("div",Ue,[e(T,{label:"Destination Name",modelValue:r.value.TSLO_ADDRESS_NAME,"onUpdate:modelValue":_[3]||(_[3]=S=>r.value.TSLO_ADDRESS_NAME=S),dense:""},null,8,["modelValue"])])]),t("div",be,[t("div",Re,[e(T,{label:"Destination Address",modelValue:r.value.TSLO_ADDRESS_DESCRIPTION,"onUpdate:modelValue":_[4]||(_[4]=S=>r.value.TSLO_ADDRESS_DESCRIPTION=S),dense:""},null,8,["modelValue"])])])]),_:1}),e(le,{align:"right"},{default:n(()=>[e(m,{label:"OK",color:"primary",onClick:_[5]||(_[5]=S=>a()),disable:v.stateSubmit,loading:v.loading},null,8,["disable","loading"]),e(m,{flat:"",label:"Cancel",color:"red",onClick:Y(s)},null,8,["onClick"])]),_:1})]),_:1})]),_:1},8,["onHide"]))}},he=t("div",{class:"text-h6"},"RO Maintenance",-1),we={style:{border:"1px black solid","border-radius":"10px"}},Pe=t("legend",{style:{"margin-left":"1em",padding:"0.2em 0.8em"}},[t("b",null,"Header")],-1),Ne={class:"row q-col-gutter-sm"},ye={class:"col-12 col-sm-4"},Me={class:"col-12 col-sm-4"},ke={class:"row items-center justify-end"},Qe={class:"col-12 col-sm-4"},Ye={class:"row items-center justify-end"},$e={class:"row q-col-gutter-sm"},qe={class:"col-12 col-sm-4"},xe={class:"col-12 col-sm-4"},Fe={class:"col-12 col-sm-4"},He={class:"row q-py-md"},Be={class:"col"},Ge={key:0,class:"row"},je={class:"col"},Ke={class:"row"},Je={class:"col-4"},Ze={class:"col text-right"},ze={style:{border:"1px black solid","border-radius":"10px",height:"35vh",overflow:"auto"},class:"q-pa-md"},Xe=t("legend",{style:{"margin-left":"1em",padding:"0.2em 0.8em"}},[t("b",null,"Detail Items")],-1),We={class:"row q-pb-md"},el={class:"col"},ll={class:"text-h6"},al={class:"col-12 col-md-1 text-center"},ol={class:"col-4 col-md-2"},tl={class:"col-4 col-md-1"},sl={key:0,class:"col-4 col-md-2"},nl={class:"row items-center justify-end"},dl={class:"row items-center justify-end"},il={class:"col-12 col-md-1 text-center"},ul={key:1,class:"text-center"},W={__name:"salesOrderCreate",props:{sloHeader:String},setup(w){const f=K(),r=w,a=c({TSLO_SLOCD:"",TSLO_ISSUDT:Ce.formatDate(Date.now(),"YYYY-MM-DD"),TSLO_PLAN_DLVDT:"",TSLO_QUOCD:"",TSLO_POCD:"",TSLO_CUSCD:"",TSLO_ATTN:"",TSLO_TYPE:1,TSLO_ADDRESS_NAME:"",TSLO_ADDRESS_DESCRIPTION:"",TSLO_SERVTRANS_COST:0,TSLO_ISCON:0});c(""),c("");const V=c([]),U=c([]),L=c([]),s=c(!1);c(1);const v=c([]),_=c([]);j(async()=>{await $(),await g(),r.sloHeader&&r.sloHeader!==""&&(await te(r.sloHeader),console.log(a.value),await D(a.value.TSLO_QUOCD))});const S=(d,l,o,p)=>{l(async()=>{p==="quotation"&&await D(d),p==="item"&&await O(d),p==="cust"&&await g(d),p==="usage"&&await $(d)})},D=async(d="")=>{s.value=!0,await E.post("quotation/search",{searchBy:"MCUS_CUSNM",searchValue:d,approval:1}).then(l=>{s.value=!1,V.value=l.data.data}).catch(l=>{s.value=!1})},O=async d=>{s.value=!0,await E.post("item/searchAPI",{searchValue:d}).then(l=>{s.value=!1,U.value=l.data.data}).catch(()=>{s.value=!1})},u=()=>a.value.TSLO_TYPE===1?"Rental":a.value.TSLO_TYPE===2?"Sales":"Service",g=async d=>{s.value=!0,await E.post("customer/searchAPI",{searchValue:d}).then(l=>{s.value=!1,L.value=l.data.data}).catch(()=>{s.value=!1})},$=async d=>{s.value=!0,await E.post("usage/searchAPI",{searchValue:d}).then(l=>{s.value=!1,_.value=l.data.data}).catch(()=>{s.value=!1})},te=async d=>{s.value=!0,await E.get(`receive-order/getData/${btoa(d)}`).then(l=>{s.value=!1,console.log(l.data.det),a.value=l.data,a.value.TSLO_TYPE=parseInt(l.data.TSLO_TYPE),v.value=l.data.det}).catch(()=>{s.value=!1})},se=async d=>{console.log(d),s.value=!0,await De.get(`transaction/quotation/view/${btoa(d)}`).then(async l=>{s.value=!1,await $(),await O(),a.value.TSLO_CUSCD=l.data.data.TQUO_CUSCD,a.value.TSLO_ADDRESS_NAME=l.data.data.cust.MCUS_CUSNM,a.value.TSLO_ADDRESS_DESCRIPTION=l.data.data.TQUO_PROJECT_LOCATION,a.value.TSLO_ATTN=l.data.data.TQUO_ATTN,a.value.TSLO_TYPE=parseInt(l.data.data.TQUO_TYPE),a.value.TSLO_SERVTRANS_COST=parseInt(l.data.data.TQUO_SERVTRANS_COST),v.value=[],l.data.data.det.map(o=>{v.value.push({TSLODETA_ITMCD:o.TQUODETA_ITMCD,TSLODETA_ITMQT:o.TQUODETA_ITMQT,TSLODETA_USAGE_DESCRIPTION:parseInt(o.TQUODETA_USAGE),TSLODETA_PRC:o.TQUODETA_PRC,TSLODETA_PERIOD_FR:o.TQUODETA_PERIOD_FR,TSLODETA_PERIOD_TO:o.TQUODETA_PERIOD_TO})})}).catch(l=>{s.value=!1})},ne=()=>{v.value.push({TSLODETA_ITMCD:"",TSLODETA_ITMQT:0,TSLODETA_USAGE_DESCRIPTION:"",TSLODETA_PRC:0,TSLODETA_PERIOD_FR:"",TSLODETA_PERIOD_TO:""})},de=d=>{f.dialog({title:"Confirmation",message:`Do you want to delete this lines no ${d+1} ?`,cancel:!0,persistent:!0}).onOk(async()=>{v.value.splice(d,1)})},ie=()=>{f.dialog({title:"Confirmation",message:"Are you sure want to save this RO ?",cancel:!0,persistent:!0}).onOk(async()=>{s.value=!0,await E.post("receive-order/saveAPI",{...a.value,det:v.value}).then(d=>{s.value=!1,f.notify({color:"green",message:`${d.data.msg}`}),Se()}).catch(()=>{s.value=!1})})},ue=()=>{f.dialog({component:Ie,componentProps:{custData:{TSLO_CUSCD:a.value.TSLO_CUSCD,MCUS_CUSNM:a.value.TSLO_ADDRESS_NAME,TSLO_ATTN:a.value.TSLO_ATTN,TSLO_ADDRESS_NAME:a.value.TSLO_ADDRESS_NAME,TSLO_ADDRESS_DESCRIPTION:a.value.TSLO_ADDRESS_DESCRIPTION}}}).onOk(async d=>{console.log(d),a.value.TSLO_CUSCD=d.TSLO_CUSCD,a.value.TSLO_ATTN=d.TSLO_ATTN,a.value.TSLO_ADDRESS_NAME=d.TSLO_ADDRESS_NAME,a.value.TSLO_ADDRESS_DESCRIPTION=d.TSLO_ADDRESS_DESCRIPTION})},{dialogRef:re,onDialogHide:_e,onDialogOK:Se,onDialogCancel:ce}=oe();return(d,l)=>(C(),k(ae,{ref_key:"dialogRef",ref:re,onHide:Y(_e),"transition-show":"slide-up","transition-hide":"slide-down","full-width":""},{default:n(()=>[e(ee,{class:"q-dialog-plugin bg-white q-pa-sm"},{default:n(()=>[e(Q,null,{default:n(()=>[he]),_:1}),e(Q,{class:"q-pa-sm"},{default:n(()=>[t("fieldset",we,[Pe,t("div",Ne,[t("div",ye,[e(T,{label:"RO Code",dense:"",filled:"",modelValue:a.value.TSLO_SLOCD,"onUpdate:modelValue":l[0]||(l[0]=o=>a.value.TSLO_SLOCD=o),disable:"",loading:s.value},null,8,["modelValue","loading"])]),t("div",Me,[e(T,{filled:"",modelValue:a.value.TSLO_ISSUDT,"onUpdate:modelValue":l[2]||(l[2]=o=>a.value.TSLO_ISSUDT=o),dense:"",label:"Issue Date",loading:s.value,onClick:l[3]||(l[3]=o=>d.quotationIssueDate.qDateProxy.show()),mask:"####-##-##","fill-mask":"",hint:"Mask: YYYY-MM-DD"},{append:n(()=>[e(I,{name:"event",class:"cursor-pointer"},{default:n(()=>[e(N,{cover:"","transition-show":"scale","transition-hide":"scale"},{default:n(()=>[e(y,{modelValue:a.value.TSLO_ISSUDT,"onUpdate:modelValue":l[1]||(l[1]=o=>a.value.TSLO_ISSUDT=o),mask:"YYYY-MM-DD"},{default:n(()=>[t("div",ke,[P(e(m,{label:"Close",color:"primary",flat:""},null,512),[[M]])])]),_:1},8,["modelValue"])]),_:1})]),_:1})]),_:1},8,["modelValue","loading"])]),t("div",Qe,[e(T,{filled:"",modelValue:a.value.TSLO_PLAN_DLVDT,"onUpdate:modelValue":l[5]||(l[5]=o=>a.value.TSLO_PLAN_DLVDT=o),dense:"",label:"Delivery Date",loading:s.value,onClick:l[6]||(l[6]=o=>d.quotationIssueDate.qDateProxy.show()),mask:"####-##-##","fill-mask":"",hint:"Mask: YYYY-MM-DD"},{append:n(()=>[e(I,{name:"event",class:"cursor-pointer"},{default:n(()=>[e(N,{cover:"","transition-show":"scale","transition-hide":"scale"},{default:n(()=>[e(y,{modelValue:a.value.TSLO_PLAN_DLVDT,"onUpdate:modelValue":l[4]||(l[4]=o=>a.value.TSLO_PLAN_DLVDT=o),mask:"YYYY-MM-DD"},{default:n(()=>[t("div",Ye,[P(e(m,{label:"Close",color:"primary",flat:""},null,512),[[M]])])]),_:1},8,["modelValue"])]),_:1})]),_:1})]),_:1},8,["modelValue","loading"])])]),t("div",$e,[t("div",qe,[e(h,{dense:"",filled:"",label:"Sales Quotation Code",modelValue:a.value.TSLO_QUOCD,"onUpdate:modelValue":[l[7]||(l[7]=o=>a.value.TSLO_QUOCD=o),se],"use-input":"","input-debounce":"500",options:V.value,onFilter:l[8]||(l[8]=(o,p,i)=>S(o,p,i,"quotation")),behavior:"dialog","option-label":"DESCSEL","option-value":"TQUO_QUOCD","emit-value":"","map-options":"",loading:s.value},null,8,["modelValue","options","loading"])]),t("div",xe,[e(T,{label:"PO Number",dense:"",filled:"",modelValue:a.value.TSLO_POCD,"onUpdate:modelValue":l[9]||(l[9]=o=>a.value.TSLO_POCD=o),loading:s.value},null,8,["modelValue","loading"])]),t("div",Fe,[e(h,{dense:"",filled:"",label:"Customer Name",modelValue:a.value.TSLO_CUSCD,"onUpdate:modelValue":l[10]||(l[10]=o=>a.value.TSLO_CUSCD=o),"use-input":"","input-debounce":"500",options:L.value,onFilter:l[11]||(l[11]=(o,p,i)=>S(o,p,i,"cust")),behavior:"dialog","option-label":"MCUS_CUSNM","option-value":"MCUS_CUSCD","emit-value":"","map-options":"",loading:s.value,disable:a.value.TSLO_QUOCD!==""},null,8,["modelValue","options","loading","disable"])])])]),t("div",He,[t("div",Be,[e(pe,{modelValue:a.value.TSLO_TYPE,"onUpdate:modelValue":l[12]||(l[12]=o=>a.value.TSLO_TYPE=o),spread:"","no-caps":"","toggle-color":"purple",color:"white","text-color":"black",options:[{label:"Rental",value:1},{label:"Sales",value:2},{label:"Service",value:3}],disable:a.value.TSLO_QUOCD!==""},null,8,["modelValue","disable"])])]),a.value.TSLO_TYPE!=1?(C(),A("div",Ge,[t("div",je,[e(T,{prefix:"Rp",label:"Service & Transportation Price",modelValue:a.value.TSLO_SERVTRANS_COST,"onUpdate:modelValue":l[13]||(l[13]=o=>a.value.TSLO_SERVTRANS_COST=o),filled:"",dense:"",disable:a.value.TSLO_QUOCD!==""},null,8,["modelValue","disable"])])])):J("",!0),t("div",Ke,[t("div",Je,[e(Te,{modelValue:a.value.TSLO_ISCON,"onUpdate:modelValue":l[14]||(l[14]=o=>a.value.TSLO_ISCON=o),label:"Is Contract ?",color:"teal","toggle-indeterminate":!1,"true-value":1,"false-value":0,disable:s.value},null,8,["modelValue","disable"])]),t("div",Ze,[e(m,{flat:"",icon:"add",color:"blue",label:"Add Lines",onClick:ne,loading:s.value},null,8,["loading"]),e(m,{flat:"",icon:"person",color:"indigo",label:"Customer",onClick:ue,loading:s.value},null,8,["loading"])])]),t("fieldset",ze,[Xe,t("div",We,[t("div",el,[t("span",ll,R(u()),1)])]),v.value.length>0?(C(!0),A(B,{key:0},G(v.value,(o,p)=>(C(),A("div",{class:"row q-col-gutter-xs q-pb-md",key:p},[t("div",al,[e(me,{"text-color":"white",color:"primary"},{default:n(()=>[b(R(p+1),1)]),_:2},1024)]),t("div",ol,[e(h,{dense:"",filled:"",label:"Item Name",modelValue:o.TSLODETA_ITMCD,"onUpdate:modelValue":i=>o.TSLODETA_ITMCD=i,"use-input":"","input-debounce":"500",options:U.value,onFilter:l[15]||(l[15]=(i,q,x)=>S(i,q,x,"item")),behavior:"dialog","option-label":"MITM_ITMNMREAL","option-value":"MITM_ITMNM","emit-value":"","map-options":"",loading:s.value},null,8,["modelValue","onUpdate:modelValue","options","loading"])]),t("div",tl,[e(T,{modelValue:o.TSLODETA_ITMQT,"onUpdate:modelValue":i=>o.TSLODETA_ITMQT=i,dense:"",hint:"Qty",outline:""},null,8,["modelValue","onUpdate:modelValue"])]),a.value.TSLO_TYPE==1?(C(),A("div",sl,[e(h,{dense:"",filled:"",label:"Usage",modelValue:o.TSLODETA_USAGE_DESCRIPTION,"onUpdate:modelValue":i=>o.TSLODETA_USAGE_DESCRIPTION=i,"use-input":"","input-debounce":"500",options:_.value,onFilter:l[16]||(l[16]=(i,q,x)=>S(i,q,x,"usage")),behavior:"dialog","option-label":"MUSAGE_DESCALL","option-value":"id","emit-value":"","map-options":"",loading:s.value,hint:"Usage"},null,8,["modelValue","onUpdate:modelValue","options","loading"])])):J("",!0),t("div",{class:H(`${a.value.TSLO_TYPE==1?"col-4 col-md-1":"col-4 col-md-3"}`)},[e(T,{modelValue:o.TSLODETA_PRC,"onUpdate:modelValue":i=>o.TSLODETA_PRC=i,dense:"",hint:"Price",outline:""},null,8,["modelValue","onUpdate:modelValue"])],2),t("div",{class:H(`${a.value.TSLO_TYPE==1?"col-4 col-md-2":"col-6 col-md-2"}`)},[e(T,{filled:"",modelValue:o.TSLODETA_PERIOD_FR,"onUpdate:modelValue":i=>o.TSLODETA_PERIOD_FR=i,dense:"",loading:s.value,onClick:l[17]||(l[17]=i=>d.quotationIssueDate.qDateProxy.show()),mask:"####-##-##","fill-mask":"",hint:"First Period"},{append:n(()=>[e(I,{name:"event",class:"cursor-pointer"},{default:n(()=>[e(N,{cover:"","transition-show":"scale","transition-hide":"scale"},{default:n(()=>[e(y,{modelValue:o.TSLODETA_PERIOD_FR,"onUpdate:modelValue":i=>o.TSLODETA_PERIOD_FR=i,mask:"YYYY-MM-DD"},{default:n(()=>[t("div",nl,[P(e(m,{label:"Close",color:"primary",flat:""},null,512),[[M]])])]),_:2},1032,["modelValue","onUpdate:modelValue"])]),_:2},1024)]),_:2},1024)]),_:2},1032,["modelValue","onUpdate:modelValue","loading"])],2),t("div",{class:H(`${a.value.TSLO_TYPE==1?"col-4 col-md-2":"col-6 col-md-2"}`)},[e(T,{filled:"",modelValue:o.TSLODETA_PERIOD_TO,"onUpdate:modelValue":i=>o.TSLODETA_PERIOD_TO=i,dense:"",loading:s.value,onClick:l[18]||(l[18]=i=>d.quotationIssueDate.qDateProxy.show()),mask:"####-##-##","fill-mask":"",hint:"Last Period"},{append:n(()=>[e(I,{name:"event",class:"cursor-pointer"},{default:n(()=>[e(N,{cover:"","transition-show":"scale","transition-hide":"scale"},{default:n(()=>[e(y,{modelValue:o.TSLODETA_PERIOD_TO,"onUpdate:modelValue":i=>o.TSLODETA_PERIOD_TO=i,mask:"YYYY-MM-DD"},{default:n(()=>[t("div",dl,[P(e(m,{label:"Close",color:"primary",flat:""},null,512),[[M]])])]),_:2},1032,["modelValue","onUpdate:modelValue"])]),_:2},1024)]),_:2},1024)]),_:2},1032,["modelValue","onUpdate:modelValue","loading"])],2),t("div",il,[e(m,{icon:"delete",color:"red",outline:"",onClick:i=>de(p)},null,8,["onClick"])])]))),128)):(C(),A("div",ul," No Items Added "))])]),_:1}),e(le,{align:"right"},{default:n(()=>[e(m,{label:"OK",color:"primary",onClick:l[19]||(l[19]=o=>ie()),disable:d.stateSubmit,loading:s.value},null,8,["disable","loading"]),e(m,{flat:"",label:"Cancel",color:"red",onClick:Y(ce)},null,8,["onClick"])]),_:1})]),_:1})]),_:1},8,["onHide"]))}};const rl={class:"q-pa-md"},_l={class:"row q-pb-md"},Sl=t("div",{class:"col"},[t("span",{class:"text-h4"},"Sales Order / Receive Order")],-1),cl={class:"col text-right"},Tl={class:"row q-pt-md"},ml={class:"col"},wl={__name:"salesOrderView",setup(w){const f=K(),r=c("TSLO_SLOCD"),a=c(""),V=c([]),U=c([{name:"TSLO_SLOCD",label:"RO. Code",field:"TSLO_SLOCD",sortable:!0,align:"left"},{name:"MCUS_CUSNM",label:"Customer Name",field:"MCUS_CUSNM",sortable:!0,align:"left"},{name:"TSLO_ADDRESS_NAME",label:"Customer Addr.",field:"TSLO_ADDRESS_NAME",sortable:!0,align:"left"},{name:"TSLO_CUSCD",label:"Customer Code",field:"TSLO_CUSCD",sortable:!0,align:"left"},{name:"TSLO_ISSUDT",label:"Issue Date",field:"TSLO_ISSUDT",sortable:!0,align:"left"},{name:"TSLO_QUOCD",label:"Quot. Code",field:"TSLO_QUOCD",sortable:!0,align:"left"}]),L=c(!1);j(()=>{s()});const s=async()=>{L.value=!0,await E.post("receive-order/searchAPI",{searchBy:r.value,searchValue:a.value}).then(D=>{L.value=!1,V.value=D.data.data}).catch(D=>{L.value=!1})},v=()=>{f.dialog({component:W}).onOk(async D=>{s()})},_=D=>{console.log(D),f.dialog({component:W,componentProps:{sloHeader:D}}).onOk(async O=>{s()})},S=D=>{f.dialog({title:"Confirmation",message:"Are you sure want to delete this data ?",cancel:!0,persistent:!0}).onOk(async()=>{L.value=!0,await E.delete(`receive-order/itemsAPI/${btoa(D)}`).then(O=>{L.value=!1,s()})})};return(D,O)=>(C(),A("div",rl,[t("div",_l,[Sl,t("div",cl,[e(m,{icon:"add",color:"blue",onClick:O[0]||(O[0]=u=>v())},{default:n(()=>[e(F,null,{default:n(()=>[b("Create New RO")]),_:1})]),_:1})])]),e(ve),t("div",Tl,[t("div",ml,[e(Oe,{title:"Created RO",rows:V.value,columns:U.value,"row-key":"name",loading:L.value,dense:"",pagination:{rowsPerPage:20},class:"my-sticky-header-column-table"},{"top-right":n(()=>[e(h,{outlined:"",modelValue:r.value,"onUpdate:modelValue":O[1]||(O[1]=u=>r.value=u),options:U.value,label:"Search Columns","option-value":"name","option-label":"label","emit-value":"",dense:"","map-options":""},null,8,["modelValue","options"]),e(T,{borderless:"",dense:"",modelValue:a.value,"onUpdate:modelValue":[O[2]||(O[2]=u=>a.value=u),O[3]||(O[3]=u=>s())],placeholder:"Search",outlined:"",debounce:"1000"},{append:n(()=>[e(I,{name:"search"})]),_:1},8,["modelValue"])]),header:n(u=>[e(z,{props:u},{default:n(()=>[e(Z,{"auto-width":""},{default:n(()=>[b("Action")]),_:1}),(C(!0),A(B,null,G(u.cols,g=>(C(),k(Z,{key:g.name,props:u},{default:n(()=>[b(R(g.label),1)]),_:2},1032,["props"]))),128))]),_:2},1032,["props"])]),body:n(u=>[e(z,{props:u},{default:n(()=>[e(X,{"auto-width":""},{default:n(()=>[e(m,{flat:"",color:u.row.dlv.length>0?"grey":"orange",icon:"edit",onClick:g=>_(u.row.TSLO_SLOCD),dense:"",disable:u.row.dlv.length>0},{default:n(()=>[e(F,null,{default:n(()=>[b(R(u.row.dlv.length>0?"RO already used for delivery, cannot edit !":"Edit this RO"),1)]),_:2},1024)]),_:2},1032,["color","onClick","disable"]),e(m,{flat:"",color:u.row.dlv.length>0?"grey":"red",icon:"delete",onClick:g=>S(u.row.TSLO_SLOCD),dense:"",disable:u.row.dlv.length>0},{default:n(()=>[e(F,null,{default:n(()=>[b(R(u.row.dlv.length>0?"RO already used for delivery, cannot delete !":"Delete this RO"),1)]),_:2},1024)]),_:2},1032,["color","onClick","disable"])]),_:2},1024),(C(!0),A(B,null,G(u.cols,g=>(C(),k(X,{key:g.name,props:u},{default:n(()=>[b(R(g.value),1)]),_:2},1032,["props"]))),128))]),_:2},1032,["props"])]),_:1},8,["rows","columns","loading"])])])]))}};export{wl as default};
