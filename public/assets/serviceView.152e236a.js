import{Q as I}from"./QTooltip.0cdcc39e.js";import{s as v,o as W,B as _,C as D,D as l,E as e,L as X,M as P,I as i,Z as T,W as j,Q as S,X as E,Y as Z,am as ie,T as J,H as p,P as Q,a$ as O,R as G,S as B,U as ue,O as L,V as re,aX as ce}from"./index.64ac019f.js";import{u as K,k as q,Q as _e,a as ee,b as N,c as le,j as me,l as te,t as Ce}from"./QTable.3bcc042c.js";import{Q as ae,a as oe}from"./QTd.61d6c5a4.js";import{d as x}from"./date.10daf55a.js";import{api_web as k}from"./axios.edc6c42e.js";import{Q as fe,a as Se,C as ve}from"./ClosePopup.e84f081f.js";import{u as z}from"./use-dialog-plugin-component.c338f413.js";import{_ as pe}from"./serviceOprUpdateOrder.ba04a025.js";import"./use-cache.b0833c75.js";import"./QBtnGroup.a85accd1.js";import"./QBadge.5c942b59.js";import"./serviceOprItemAdd.1b9aa1f4.js";const De=i("div",{class:"text-h6"},"Create Item Master",-1),Te={class:"row"},Me={class:"col"},Ve={class:"col q-pl-md"},ge={class:"row q-pt-md"},he={class:"col"},Re={class:"col q-pl-md"},be={class:"row q-pt-md"},Ie={class:"col"},we={class:"col q-pl-md"},ke={class:"row q-pt-md"},Ue={class:"col"},ye={__name:"itemCreate",props:{ItemCat:String},setup(Y){const{dialogRef:R,onDialogHide:U,onDialogOK:y,onDialogCancel:A}=z(),b=K(),o=v({MITM_ITMCD:"",MITM_ITMNM:"",MITM_STKUOM:"",MITM_ITMTYPE:1,MITM_BRAND:"",MITM_MODEL:"",MITM_SPEC:"",MITM_ITMCAT:"",MITM_COACD:"",MITM_ITMCAT:""}),u=v(!1),M=v([]),g=v([]),r=Y;W(()=>{$(),o.value.MITM_ITMCAT=r.ItemCat});const d=(V,c,t,m)=>{c(async()=>{await k.post("item/getListCoasAPI",{search:V}).then(n=>{g.value=n.data})})},H=()=>{b.dialog({title:"Confirmation",message:"Do you want to save this item ?",cancel:!0,persistent:!0}).onOk(async()=>{await k.post("item",o.value).then(V=>{y(V.data.data.value)})})},$=async()=>{u.value=!0,await k.get("item/formAPI").then(V=>{u.value=!1,M.value=V.data.uoms,g.value=V.data.coas}).catch(()=>{u.value=!1})};return(V,c)=>(_(),D(Z,{ref_key:"dialogRef",ref:R,onHide:E(U),"transition-show":"slide-up","transition-hide":"slide-down","full-width":"",persistent:""},{default:l(()=>[e(X,{class:"q-dialog-plugin bg-white q-pa-sm"},{default:l(()=>[e(P,null,{default:l(()=>[De]),_:1}),e(P,{class:"q-pa-sm"},{default:l(()=>[i("div",Te,[i("div",Me,[e(T,{label:"Item Code",dense:"",modelValue:o.value.MITM_ITMCD,"onUpdate:modelValue":c[0]||(c[0]=t=>o.value.MITM_ITMCD=t),filled:""},null,8,["modelValue"])]),i("div",Ve,[e(T,{label:"Item Name",dense:"",modelValue:o.value.MITM_ITMNM,"onUpdate:modelValue":c[1]||(c[1]=t=>o.value.MITM_ITMNM=t),filled:""},null,8,["modelValue"])])]),i("div",ge,[i("div",he,[e(q,{dense:"",filled:"",label:"UOM",modelValue:o.value.MITM_STKUOM,"onUpdate:modelValue":c[2]||(c[2]=t=>o.value.MITM_STKUOM=t),options:M.value,behavior:"dialog","option-label":"MUOM_UOMNM","option-value":"MUOM_UOMCD","emit-value":"","map-options":"",loading:u.value},null,8,["modelValue","options","loading"])]),i("div",Re,[e(T,{label:"Item Brand",dense:"",modelValue:o.value.MITM_BRAND,"onUpdate:modelValue":c[3]||(c[3]=t=>o.value.MITM_BRAND=t),filled:""},null,8,["modelValue"])])]),i("div",be,[i("div",Ie,[e(T,{label:"Item Model",dense:"",modelValue:o.value.MITM_MODEL,"onUpdate:modelValue":c[4]||(c[4]=t=>o.value.MITM_MODEL=t),filled:""},null,8,["modelValue"])]),i("div",we,[e(T,{label:"Item Specification",dense:"",modelValue:o.value.MITM_SPEC,"onUpdate:modelValue":c[5]||(c[5]=t=>o.value.MITM_SPEC=t),filled:""},null,8,["modelValue"])])]),i("div",ke,[i("div",Ue,[e(q,{dense:"",filled:"",label:"COA",modelValue:o.value.MITM_COACD,"onUpdate:modelValue":c[6]||(c[6]=t=>o.value.MITM_COACD=t),options:g.value,"use-input":"",behavior:"dialog","option-label":"MCOA_COANM","option-value":"MCOA_COACD",onFilter:c[7]||(c[7]=(t,m,n)=>d(t,m,n)),"emit-value":"","map-options":"",loading:u.value},null,8,["modelValue","options","loading"])])])]),_:1}),e(j,{align:"right"},{default:l(()=>[e(S,{label:"OK",color:"primary",onClick:c[8]||(c[8]=t=>H())}),e(S,{flat:"",label:"Cancel",color:"red",onClick:E(A)},null,8,["onClick"])]),_:1})]),_:1})]),_:1},8,["onHide"]))}},Oe=i("div",{class:"text-h6"},"Create New Customer Data",-1),Ae={class:"row q-pb-md"},Ne={class:"col"},$e={class:"row q-pb-md"},He={class:"col"},Le={class:"col q-pl-md"},Qe={class:"row"},Pe={class:"col"},Ee={__name:"customerView",setup(Y){const{dialogRef:R,onDialogHide:U,onDialogOK:y,onDialogCancel:A}=z(),b=K(),o=v({MCUS_CUSCD:"",MCUS_CUSNM:"",MCUS_CURCD:"IDR",MCUS_TAXREG:"-",MCUS_ADDR1:"",MCUS_TELNO:"",MCUS_PIC_NAME:"-",MCUS_PIC_TELNO:"-",MCUS_TYPE:1,MCUS_GROUP:"SERVICE",MCUS_EMAIL:""}),u=v(!1),M=()=>{b.dialog({title:"Confirmation",message:"Do you want to save this customer ?",cancel:!0,persistent:!0}).onOk(async()=>{u.value=!0,await k.post("customer",o.value).then(g=>{u.value=!1,y(g.data)}).catch(g=>{u.value=!1})})};return(g,r)=>(_(),D(Z,{ref_key:"dialogRef",ref:R,onHide:E(U),"transition-show":"slide-up","transition-hide":"slide-down","full-width":""},{default:l(()=>[e(X,{class:"q-dialog-plugin bg-white q-pa-sm"},{default:l(()=>[e(P,null,{default:l(()=>[Oe]),_:1}),e(P,{class:"q-pa-sm"},{default:l(()=>[i("div",Ae,[i("div",Ne,[e(T,{label:"Customer Name",dense:"",modelValue:o.value.MCUS_CUSNM,"onUpdate:modelValue":r[0]||(r[0]=d=>o.value.MCUS_CUSNM=d),filled:""},null,8,["modelValue"])])]),i("div",$e,[i("div",He,[e(T,{label:"Customer Email",dense:"",modelValue:o.value.MCUS_EMAIL,"onUpdate:modelValue":r[1]||(r[1]=d=>o.value.MCUS_EMAIL=d),filled:""},null,8,["modelValue"])]),i("div",Le,[e(T,{label:"Customer Phone",dense:"",modelValue:o.value.MCUS_TELNO,"onUpdate:modelValue":r[2]||(r[2]=d=>o.value.MCUS_TELNO=d),filled:"",mask:"####-####-####"},null,8,["modelValue"])])]),i("div",Qe,[i("div",Pe,[e(T,{label:"Customer Address",dense:"",modelValue:o.value.MCUS_ADDR1,"onUpdate:modelValue":r[3]||(r[3]=d=>o.value.MCUS_ADDR1=d),filled:"",type:"textarea"},null,8,["modelValue"])])])]),_:1}),e(j,{align:"right"},{default:l(()=>[e(S,{label:"OK",color:"primary",onClick:r[4]||(r[4]=d=>M()),loading:u.value},null,8,["loading"]),e(S,{flat:"",label:"Cancel",color:"red",onClick:E(A),loading:u.value},null,8,["onClick","loading"])]),_:1})]),_:1})]),_:1},8,["onHide"]))}},Ye=i("div",{class:"text-h6"},"Create Order",-1),qe={style:{border:"1px black solid","border-radius":"10px"}},Fe=i("legend",{style:{"margin-left":"1em",padding:"0.2em 0.8em"}},[i("b",null,"Header")],-1),xe={class:"row"},Ke={class:"col"},Ge={class:"col q-pl-md"},Be={class:"row items-center justify-end"},We={class:"row"},Xe={class:"col"},je={style:{border:"1px black solid","border-radius":"10px",height:"35vh",overflow:"auto"}},Ze=i("legend",{style:{"margin-left":"1em",padding:"0.2em 0.8em"}},[i("b",null,"Detail Items")],-1),ze={key:0,class:"row q-pb-sm"},Je={class:"col text-right"},ne={__name:"serviceCreateOrder",props:{header:Array,detail:Array,mode:String},setup(Y){const{dialogRef:R,onDialogHide:U,onDialogOK:y,onDialogCancel:A}=z(),b=K(),o=Y;W(async()=>{o.header&&(await $(),await V(),u.value=o.header,r.value=o.detail)});const u=v({SRVH_DOCNO:"",SRVH_ISSDT:x.formatDate(Date.now(),"YYYY-MM-DD"),SRVH_CUSCD:""}),M=v([]),g=v([]),r=v([]),d=v(!1),H=(C,s,f,w)=>{s(async()=>{w==="cust"&&await $(C),w==="item"&&await V(C)})},$=async C=>{d.value=!0,await k.post("customer/searchAPI",{searchValue:C}).then(s=>{d.value=!1,g.value=s.data.data}).catch(()=>{d.value=!1})},V=async C=>{d.value=!0,await k.post("item/searchAPI",{searchValue:C}).then(s=>{d.value=!1,M.value=s.data.data}).catch(()=>{d.value=!1})},c=()=>{r.value.push({TSRVD_ITMCD:"",TSRVD_LINE:r.value.length+1,TSRVD_QTY:1,TSRVD_CUSTRMK:""})},t=C=>{b.dialog({title:"Confirmation",message:`Do you want to delete this lines no ${C+1} ?`,cancel:!0,persistent:!0}).onOk(async()=>{r.value.splice(C,1)})},m=C=>{b.dialog({component:ye,componentProps:{ItemCat:"SERVICE_ITEMM"}}).onOk(async s=>{await V(""),r.value[C].TSRVD_ITMCD=s.MITM_ITMNM})},n=()=>{b.dialog({title:"Confirmation",message:"Do you want to submit this data ?",cancel:!0,persistent:!0}).onOk(async()=>{d.value=!0,await k.post("servicesAdmin",{header:u.value,detail:r.value}).then(C=>{d.value=!1,y()})})},a=()=>{b.dialog({component:Ee}).onOk(async C=>{console.log(C),await $(""),r.value[idx].SRVH_CUSCD=C.MCUS_CUSCD})},F=C=>{};return(C,s)=>(_(),D(Z,{ref_key:"dialogRef",ref:R,onHide:E(U),"transition-show":"slide-up","transition-hide":"slide-down","full-width":"",persistent:""},{default:l(()=>[e(X,{class:"q-dialog-plugin bg-white q-pa-sm"},{default:l(()=>[e(P,null,{default:l(()=>[Ye]),_:1}),e(P,{class:"q-pa-sm"},{default:l(()=>[i("fieldset",qe,[Fe,i("div",xe,[i("div",Ke,[e(T,{label:"SPK No",readonly:"",dense:"",modelValue:u.value.SRVH_DOCNO,"onUpdate:modelValue":s[0]||(s[0]=f=>u.value.SRVH_DOCNO=f),filled:""},null,8,["modelValue"])]),i("div",Ge,[e(T,{filled:"",modelValue:u.value.SRVH_ISSDT,"onUpdate:modelValue":s[2]||(s[2]=f=>u.value.SRVH_ISSDT=f),dense:"",label:"Issue Date",loading:d.value,onClick:s[3]||(s[3]=f=>C.quotationIssueDate.qDateProxy.show()),mask:"####-##-##","fill-mask":"",hint:"Mask: YYYY-MM-DD",readonly:o.mode==="view"},{append:l(()=>[e(ie,{name:"event",class:"cursor-pointer",disable:o.mode==="view"},{default:l(()=>[e(fe,{cover:"","transition-show":"scale","transition-hide":"scale"},{default:l(()=>[e(Se,{modelValue:u.value.SRVH_ISSDT,"onUpdate:modelValue":s[1]||(s[1]=f=>u.value.SRVH_ISSDT=f),mask:"YYYY-MM-DD"},{default:l(()=>[i("div",Be,[J(e(S,{label:"Close",color:"primary",flat:""},null,512),[[ve]])])]),_:1},8,["modelValue"])]),_:1})]),_:1},8,["disable"])]),_:1},8,["modelValue","loading","readonly"])])]),i("div",We,[i("div",Xe,[e(q,{dense:"",filled:"",label:"Customer Choose",modelValue:u.value.SRVH_CUSCD,"onUpdate:modelValue":s[5]||(s[5]=f=>u.value.SRVH_CUSCD=f),"use-input":"","input-debounce":"500",options:g.value,onFilter:s[6]||(s[6]=(f,w,h)=>H(f,w,h,"cust")),behavior:"dialog","option-label":"MCUS_CUSNM","option-value":"MCUS_CUSCD","emit-value":"","map-options":"",loading:d.value,readonly:o.mode==="view"},{after:l(()=>[e(S,{round:"",dense:"",flat:"",icon:"person_add",onClick:s[4]||(s[4]=f=>a()),color:"cyan"},{default:l(()=>[e(I,null,{default:l(()=>[p("Add new customer")]),_:1})]),_:1})]),_:1},8,["modelValue","options","loading","readonly"])])])]),i("fieldset",je,[Ze,o.mode!=="view"?(_(),Q("div",ze,[i("div",Je,[e(S,{flat:"",icon:"add",color:"blue",onClick:s[7]||(s[7]=f=>c())},{default:l(()=>[e(I,null,{default:l(()=>[p("Add lines")]),_:1})]),_:1})])])):O("",!0),e(_e,{bordered:"",dense:""},{default:l(()=>[r.value.length>0?(_(!0),Q(G,{key:0},B(r.value,(f,w)=>(_(),D(ee,{key:w,class:"q-my-sm",dense:""},{default:l(()=>[e(N,{avatar:""},{default:l(()=>[e(ue,{"text-color":"blue"},{default:l(()=>[p(L(w+1),1)]),_:2},1024)]),_:2},1024),e(N,null,{default:l(()=>[e(le,null,{default:l(()=>[e(q,{dense:"",filled:"",label:"Item Name",modelValue:f.TSRVD_ITMCD,"onUpdate:modelValue":h=>f.TSRVD_ITMCD=h,"use-input":"","input-debounce":"500",options:M.value,onFilter:s[8]||(s[8]=(h,se,de)=>H(h,se,de,"item")),behavior:"dialog","option-label":"MITM_ITMNM","option-value":"MITM_ITMNM","emit-value":"","map-options":"",loading:d.value},null,8,["modelValue","onUpdate:modelValue","options","loading"])]),_:2},1024)]),_:2},1024),e(N,null,{default:l(()=>[e(T,{label:"Qty",filled:"",dense:"",modelValue:f.TSRVD_QTY,"onUpdate:modelValue":h=>f.TSRVD_QTY=h},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1024),e(N,null,{default:l(()=>[e(T,{label:"Problem",filled:"",dense:"",modelValue:f.TSRVD_CUSTRMK,"onUpdate:modelValue":h=>f.TSRVD_CUSTRMK=h},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1024),o.mode!=="view"?(_(),D(N,{key:0,side:""},{default:l(()=>[e(S,{icon:"delete",color:"red",flat:"",onClick:h=>t(w),dense:""},{default:l(()=>[e(I,null,{default:l(()=>[p("Delete line")]),_:1})]),_:2},1032,["onClick"])]),_:2},1024)):O("",!0),o.mode!=="view"?(_(),D(N,{key:1,side:""},{default:l(()=>[e(S,{icon:"library_add",color:"indigo",flat:"",onClick:h=>m(w),dense:""},{default:l(()=>[e(I,null,{default:l(()=>[p("Add new item")]),_:1})]),_:2},1032,["onClick"])]),_:2},1024)):O("",!0),o.mode!=="view"?(_(),D(N,{key:2,side:""},{default:l(()=>[e(S,{icon:"photo",color:"orange",flat:"",onClick:h=>F(w),dense:""},{default:l(()=>[e(I,null,{default:l(()=>[p("Add photo")]),_:1})]),_:2},1032,["onClick"])]),_:2},1024)):O("",!0)]),_:2},1024))),128)):J((_(),D(ee,{key:1,class:"q-my-sm",clickable:""},{default:l(()=>[e(N,null,{default:l(()=>[e(le,null,{default:l(()=>[p(" No Items Added ")]),_:1})]),_:1})]),_:1})),[[re]])]),_:1})])]),_:1}),e(j,{align:"right"},{default:l(()=>[e(S,{label:"OK",color:"primary",onClick:s[9]||(s[9]=f=>n()),disable:d.value,loading:d.value},null,8,["disable","loading"]),e(S,{flat:"",label:"Cancel",color:"red",onClick:E(A),loading:d.value},null,8,["onClick","loading"])]),_:1})]),_:1})]),_:1},8,["onHide"]))}};const el={class:"q-pa-md"},ll={class:"row q-pb-md"},tl=i("div",{class:"col"},[i("span",{class:"text-h4"},"Receive Order ")],-1),al={class:"col text-right"},ol={class:"row q-pt-md"},nl={class:"col"},il={key:1},Tl={__name:"serviceView",setup(Y){const R=K(),U=v("SRVH_DOCNO"),y=v(""),A=v([]),b=v([{name:"SRVH_DOCNO",label:"SPK No",field:"SRVH_DOCNO",sortable:!0,align:"left"},{name:"MCUS_CUSNM",label:"Cust",field:"MCUS_CUSNM",sortable:!0,align:"left"},{name:"STAT",label:"Status",field:t=>c(t),sortable:!0,align:"left"},{name:"created_at",label:"Created Date",field:"created_at",sortable:!0,align:"left",format:t=>x.formatDate(new Date(t),"DD MMM YYYY")}]),o=v(!1),u=v(null);W(()=>{M(),u.value=setInterval(()=>{M()},1e4)});const M=async()=>{o.value=!0,await k.post("servicesAdmins/search",{searchBy:U.value,searchValue:y.value}).then(t=>{o.value=!1,A.value=t.data.data}).catch(t=>{o.value=!1})},g=()=>{R.dialog({component:ne}).onOk(async t=>{M()})},r=t=>{const m={SRVH_DOCNO:t.SRVH_DOCNO,SRVH_ISSDT:x.formatDate(t.SRVH_ISSDT,"YYYY-MM-DD"),SRVH_CUSCD:t.MCUS_CUSCD};let n=[];t.detail.map(a=>{n.push({id:a.id,TSRVD_ITMCD:a.TSRVD_ITMCD,TSRVD_LINE:a.TSRVD_LINE,TSRVD_QTY:a.TSRVD_QTY,TSRVD_CUSTRMK:a.TSRVD_CUSTRMK,TSRVD_REMARK:a.TSRVD_REMARK,TSRVD_FLGSTS:a.TSRVD_FLGSTS,listFixDet:a.list_fix_det})}),R.dialog({component:pe,componentProps:{header:m,detail:n,mode:t.detail.filter(a=>a.TSRVD_FLGSTS===1).length===t.detail.length?"approvecust":"view"}}).onOk(async a=>{M()})},d=t=>{window.open("http://tribin.test/servicesAdmins/printInvoice/"+btoa(t),"_blank").focus()},H=t=>{const m={SRVH_DOCNO:t.SRVH_DOCNO,SRVH_ISSDT:x.formatDate(t.SRVH_ISSDT,"YYYY-MM-DD"),SRVH_CUSCD:t.MCUS_CUSCD};let n=[];t.detail.map(a=>{n.push({TSRVD_ITMCD:a.TSRVD_ITMCD,TSRVD_LINE:a.TSRVD_LINE,TSRVD_QTY:a.TSRVD_QTY,TSRVD_CUSTRMK:a.TSRVD_CUSTRMK})}),R.dialog({component:ne,componentProps:{header:m,detail:n}}).onOk(async a=>{M()})},$=t=>{R.dialog({title:"Confirmation",message:"Do you want to proceed to service ?",cancel:!0,persistent:!0}).onOk(async()=>{o.value=!0,await k.put(`servicesAdmin/${btoa(t.SRVH_DOCNO)}`,{TSRVD_FLGSTS:2}).then(m=>{o.value=!1}).catch(m=>{o.value=!1})})},V=t=>{R.dialog({title:"Confirmation",message:"Are you sure want to delete this order ?",cancel:!0,persistent:!0}).onOk(async()=>{o.value=!0,await k.delete(`servicesAdmin/${btoa(t.SRVH_DOCNO)}`).then(m=>{o.value=!1}).catch(m=>{o.value=!1})})},c=t=>{const m=t.detail.filter(s=>s.TSRVD_FLGSTS==0),n=t.detail.filter(s=>s.TSRVD_FLGSTS==1),a=t.detail.filter(s=>s.TSRVD_FLGSTS==2),F=t.detail.filter(s=>s.TSRVD_FLGSTS==3),C=t.detail.filter(s=>s.TSRVD_FLGSTS==5);if(m.length==t.detail.length)return{color:"red",label:"No Price Added yet !",icon:"edit"};if(n.length>0&&n.length<t.detail.length)return{color:"warning",label:"Please Add item & price",icon:"payments"};if(C.length>0&&C.length==t.detail.length)return{color:"indigo",label:"Added Price Done, Waiting Manager Confirmation",icon:"price_check"};if(n.length>0&&n.length==t.detail.length)return{color:"green",label:"Manager has been approve, Waiting Cust. Confirmation",icon:"price_check"};if(a.length>0&&a.length>=t.detail.length)return{color:"cyan",label:"Cust. has been approved, continue to fix.",icon:"engineering"};if(F.length>0&&F.length===t.detail.length)return{color:"primary",label:"Fix has been done",icon:"fact_check"}};return(t,m)=>(_(),Q("div",el,[i("div",ll,[tl,i("div",al,[e(S,{icon:"add",color:"blue",onClick:g},{default:l(()=>[e(I,null,{default:l(()=>[p("Create New Order")]),_:1})]),_:1})])]),e(ce),i("div",ol,[i("div",nl,[e(me,{title:"Created Order",rows:A.value,columns:b.value,"row-key":"name",loading:o.value,dense:"",pagination:{rowsPerPage:20},class:"my-sticky-header-column-table"},{"top-right":l(()=>[e(q,{outlined:"",modelValue:U.value,"onUpdate:modelValue":m[0]||(m[0]=n=>U.value=n),options:b.value,label:"Search Columns","option-value":"name","option-label":"label","emit-value":"",dense:"","map-options":""},null,8,["modelValue","options"]),e(T,{borderless:"",dense:"",modelValue:y.value,"onUpdate:modelValue":[m[1]||(m[1]=n=>y.value=n),m[2]||(m[2]=n=>t.dataQuo())],placeholder:"Search",outlined:"",debounce:"1000"},{append:l(()=>[e(ie,{name:"search"})]),_:1},8,["modelValue"])]),header:l(n=>[e(ae,{props:n},{default:l(()=>[(_(!0),Q(G,null,B(n.cols,a=>(_(),D(te,{key:a.name,props:n},{default:l(()=>[p(L(a.label),1)]),_:2},1032,["props"]))),128)),e(te,{"auto-width":""},{default:l(()=>[p("Action")]),_:1})]),_:2},1032,["props"])]),body:l(n=>[e(ae,{props:n},{default:l(()=>[(_(!0),Q(G,null,B(n.cols,a=>(_(),D(oe,{key:a.name,props:n},{default:l(()=>[a.name==="STAT"?(_(),D(Ce,{key:0,clickable:"",color:a.value.color,"text-color":"white",icon:a.value.icon},{default:l(()=>[p(L(a.value.label),1)]),_:2},1032,["color","icon"])):(_(),Q("span",il,L(a.value),1))]),_:2},1032,["props"]))),128)),e(oe,{"auto-width":""},{default:l(()=>[n.row.detail.filter(a=>a.TSRVD_FLGSTS>0).length===0?(_(),D(S,{key:0,flat:"",color:"orange",icon:"edit",onClick:a=>H(n.row),dense:""},{default:l(()=>[e(I,null,{default:l(()=>[p("Edit this Order")]),_:1})]),_:2},1032,["onClick"])):O("",!0),n.row.detail.filter(a=>a.TSRVD_FLGSTS>0).length===n.row.detail.length?(_(),D(S,{key:1,flat:"",color:"indigo",icon:"print",onClick:a=>d(n.row.SRVH_DOCNO),dense:""},{default:l(()=>[e(I,null,{default:l(()=>[p("Print this order")]),_:1})]),_:2},1032,["onClick"])):O("",!0),n.row.detail.filter(a=>a.TSRVD_FLGSTS>0).length===0?(_(),D(S,{key:2,flat:"",color:"red",icon:"delete",onClick:a=>V(n.row.SRVH_DOCNO),dense:""},{default:l(()=>[e(I,null,{default:l(()=>[p(L(n.row.detail.filter(a=>a.TSRVD_FLGSTS>0).length>0?"Cannot delete processed order":"Delete this Order"),1)]),_:2},1024)]),_:2},1032,["onClick"])):O("",!0),n.row.detail.filter(a=>a.TSRVD_FLGSTS>0).length>0?(_(),D(S,{key:3,flat:"",color:"cyan",icon:"visibility",onClick:a=>r(n.row),dense:""},{default:l(()=>[e(I,null,{default:l(()=>[p("View this Order")]),_:1})]),_:2},1032,["onClick"])):O("",!0),n.row.detail.filter(a=>a.TSRVD_FLGSTS==1).length===n.row.detail.length?(_(),D(S,{key:4,flat:"",color:"indigo",icon:"check",onClick:a=>$(n.row),dense:""},{default:l(()=>[e(I,null,{default:l(()=>[p(L(n.row.detail.filter(a=>a.TSRVD_FLGSTS>0).length!==n.row.detail.length?"Please wait until all item checked":"Proceed all item to service"),1)]),_:2},1024)]),_:2},1032,["onClick"])):O("",!0)]),_:2},1024)]),_:2},1032,["props"])]),_:1},8,["rows","columns","loading"])])])]))}};export{Tl as default};
