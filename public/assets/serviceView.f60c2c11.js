import{Q as b}from"./QTooltip.76e29bc6.js";import{s as D,o as B,B as _,C as T,D as l,E as e,L as j,M as E,I as s,Z as V,W as X,Q as v,X as P,Y as W,am as ne,T as z,H as p,P as Q,a$ as N,R as K,S as G,U as de,O as L,V as ue,aX as re}from"./index.39656609.js";import{u as Z,a as F,m as q,Q as ce,b as J,c as A,d as ee,l as _e,n as le,x as me}from"./QTable.a127746f.js";import{Q as te,a as ae}from"./use-cache.91902d76.js";import{d as x}from"./date.3316dce9.js";import{api_web as w}from"./axios.c773d462.js";import{Q as Ce,a as Se,C as fe}from"./ClosePopup.f82a6b86.js";import{_ as ve}from"./serviceOprUpdateOrder.0e736321.js";import"./QBadge.713af369.js";const De=s("div",{class:"text-h6"},"Create Item Master",-1),pe={class:"row"},Te={class:"col"},Me={class:"col q-pl-md"},Ve={class:"row q-pt-md"},ge={class:"col"},he={class:"col q-pl-md"},Re={class:"row q-pt-md"},Ie={class:"col"},be={class:"col q-pl-md"},we={class:"row q-pt-md"},ke={class:"col"},Oe={__name:"itemCreate",props:{ItemCat:String},setup(Y){const{dialogRef:h,onDialogHide:k,onDialogOK:O,onDialogCancel:y}=Z(),R=F(),o=D({MITM_ITMCD:"",MITM_ITMNM:"",MITM_STKUOM:"",MITM_ITMTYPE:1,MITM_BRAND:"",MITM_MODEL:"",MITM_SPEC:"",MITM_ITMCAT:"",MITM_COACD:"",MITM_ITMCAT:""}),m=D(!1),M=D([]),S=D([]),u=Y;B(()=>{$(),o.value.MITM_ITMCAT=u.ItemCat});const f=(g,d,t,r)=>{d(async()=>{await w.post("item/getListCoasAPI",{search:g}).then(n=>{S.value=n.data})})},H=()=>{R.dialog({title:"Confirmation",message:"Do you want to save this item ?",cancel:!0,persistent:!0}).onOk(async()=>{await w.post("item",o.value).then(g=>{O(g.data.data.value)})})},$=async()=>{m.value=!0,await w.get("item/formAPI").then(g=>{m.value=!1,M.value=g.data.uoms,S.value=g.data.coas}).catch(()=>{m.value=!1})};return(g,d)=>(_(),T(W,{ref_key:"dialogRef",ref:h,onHide:P(k),"transition-show":"slide-up","transition-hide":"slide-down","full-width":"",persistent:""},{default:l(()=>[e(j,{class:"q-dialog-plugin bg-white q-pa-sm"},{default:l(()=>[e(E,null,{default:l(()=>[De]),_:1}),e(E,{class:"q-pa-sm"},{default:l(()=>[s("div",pe,[s("div",Te,[e(V,{label:"Item Code",dense:"",modelValue:o.value.MITM_ITMCD,"onUpdate:modelValue":d[0]||(d[0]=t=>o.value.MITM_ITMCD=t),filled:""},null,8,["modelValue"])]),s("div",Me,[e(V,{label:"Item Name",dense:"",modelValue:o.value.MITM_ITMNM,"onUpdate:modelValue":d[1]||(d[1]=t=>o.value.MITM_ITMNM=t),filled:""},null,8,["modelValue"])])]),s("div",Ve,[s("div",ge,[e(q,{dense:"",filled:"",label:"UOM",modelValue:o.value.MITM_STKUOM,"onUpdate:modelValue":d[2]||(d[2]=t=>o.value.MITM_STKUOM=t),options:M.value,behavior:"dialog","option-label":"MUOM_UOMNM","option-value":"MUOM_UOMCD","emit-value":"","map-options":"",loading:m.value},null,8,["modelValue","options","loading"])]),s("div",he,[e(V,{label:"Item Brand",dense:"",modelValue:o.value.MITM_BRAND,"onUpdate:modelValue":d[3]||(d[3]=t=>o.value.MITM_BRAND=t),filled:""},null,8,["modelValue"])])]),s("div",Re,[s("div",Ie,[e(V,{label:"Item Model",dense:"",modelValue:o.value.MITM_MODEL,"onUpdate:modelValue":d[4]||(d[4]=t=>o.value.MITM_MODEL=t),filled:""},null,8,["modelValue"])]),s("div",be,[e(V,{label:"Item Specification",dense:"",modelValue:o.value.MITM_SPEC,"onUpdate:modelValue":d[5]||(d[5]=t=>o.value.MITM_SPEC=t),filled:""},null,8,["modelValue"])])]),s("div",we,[s("div",ke,[e(q,{dense:"",filled:"",label:"COA",modelValue:o.value.MITM_COACD,"onUpdate:modelValue":d[6]||(d[6]=t=>o.value.MITM_COACD=t),options:S.value,"use-input":"",behavior:"dialog","option-label":"MCOA_COANM","option-value":"MCOA_COACD",onFilter:d[7]||(d[7]=(t,r,n)=>f(t,r,n)),"emit-value":"","map-options":"",loading:m.value},null,8,["modelValue","options","loading"])])])]),_:1}),e(X,{align:"right"},{default:l(()=>[e(v,{label:"OK",color:"primary",onClick:d[8]||(d[8]=t=>H())}),e(v,{flat:"",label:"Cancel",color:"red",onClick:P(y)},null,8,["onClick"])]),_:1})]),_:1})]),_:1},8,["onHide"]))}},Ue=s("div",{class:"text-h6"},"Create New Customer Data",-1),ye={class:"row q-pb-md"},Ne={class:"col"},$e={class:"row q-pb-md"},Ae={class:"col"},He={class:"col q-pl-md"},Le={class:"row"},Qe={class:"col"},Ee={__name:"customerView",setup(Y){const{dialogRef:h,onDialogHide:k,onDialogOK:O,onDialogCancel:y}=Z(),R=F(),o=D({MCUS_CUSCD:"",MCUS_CUSNM:"",MCUS_CURCD:"IDR",MCUS_TAXREG:"-",MCUS_ADDR1:"",MCUS_TELNO:"",MCUS_PIC_NAME:"-",MCUS_PIC_TELNO:"-",MCUS_TYPE:1,MCUS_GROUP:"SERVICE",MCUS_EMAIL:""}),m=()=>{R.dialog({title:"Confirmation",message:"Do you want to save this customer ?",cancel:!0,persistent:!0}).onOk(async()=>{await w.post("customer",o.value).then(M=>{O(M.data)})})};return(M,S)=>(_(),T(W,{ref_key:"dialogRef",ref:h,onHide:P(k),"transition-show":"slide-up","transition-hide":"slide-down","full-width":""},{default:l(()=>[e(j,{class:"q-dialog-plugin bg-white q-pa-sm"},{default:l(()=>[e(E,null,{default:l(()=>[Ue]),_:1}),e(E,{class:"q-pa-sm"},{default:l(()=>[s("div",ye,[s("div",Ne,[e(V,{label:"Customer Name",dense:"",modelValue:o.value.MCUS_CUSNM,"onUpdate:modelValue":S[0]||(S[0]=u=>o.value.MCUS_CUSNM=u),filled:""},null,8,["modelValue"])])]),s("div",$e,[s("div",Ae,[e(V,{label:"Customer Email",dense:"",modelValue:o.value.MCUS_EMAIL,"onUpdate:modelValue":S[1]||(S[1]=u=>o.value.MCUS_EMAIL=u),filled:""},null,8,["modelValue"])]),s("div",He,[e(V,{label:"Customer Phone",dense:"",modelValue:o.value.MCUS_TELNO,"onUpdate:modelValue":S[2]||(S[2]=u=>o.value.MCUS_TELNO=u),filled:"",mask:"####-####-####"},null,8,["modelValue"])])]),s("div",Le,[s("div",Qe,[e(V,{label:"Customer Address",dense:"",modelValue:o.value.MCUS_ADDR1,"onUpdate:modelValue":S[3]||(S[3]=u=>o.value.MCUS_ADDR1=u),filled:"",type:"textarea"},null,8,["modelValue"])])])]),_:1}),e(X,{align:"right"},{default:l(()=>[e(v,{label:"OK",color:"primary",onClick:S[4]||(S[4]=u=>m())}),e(v,{flat:"",label:"Cancel",color:"red",onClick:P(y)},null,8,["onClick"])]),_:1})]),_:1})]),_:1},8,["onHide"]))}},Pe=s("div",{class:"text-h6"},"Create Order",-1),Ye={style:{border:"1px black solid","border-radius":"10px"}},qe=s("legend",{style:{"margin-left":"1em",padding:"0.2em 0.8em"}},[s("b",null,"Header")],-1),xe={class:"row"},Fe={class:"col"},Ke={class:"col q-pl-md"},Ge={class:"row items-center justify-end"},Be={class:"row"},je={class:"col"},Xe={style:{border:"1px black solid","border-radius":"10px",height:"35vh",overflow:"auto"}},We=s("legend",{style:{"margin-left":"1em",padding:"0.2em 0.8em"}},[s("b",null,"Detail Items")],-1),Ze={key:0,class:"row q-pb-sm"},ze={class:"col text-right"},oe={__name:"serviceCreateOrder",props:{header:Array,detail:Array,mode:String},setup(Y){const{dialogRef:h,onDialogHide:k,onDialogOK:O,onDialogCancel:y}=Z(),R=F(),o=Y;B(async()=>{o.header&&(await $(),await g(),m.value=o.header,u.value=o.detail)});const m=D({SRVH_DOCNO:"",SRVH_ISSDT:x.formatDate(Date.now(),"YYYY-MM-DD"),SRVH_CUSCD:""}),M=D([]),S=D([]),u=D([]),f=D(!1),H=(C,i,c,U)=>{i(async()=>{U==="cust"&&await $(C),U==="item"&&await g(C)})},$=async C=>{f.value=!0,await w.post("customer/searchAPI",{searchValue:C}).then(i=>{f.value=!1,S.value=i.data.data}).catch(()=>{f.value=!1})},g=async C=>{f.value=!0,await w.post("item/searchAPI",{searchValue:C}).then(i=>{f.value=!1,M.value=i.data.data}).catch(()=>{f.value=!1})},d=()=>{u.value.push({TSRVD_ITMCD:"",TSRVD_LINE:u.value.length+1,TSRVD_QTY:1,TSRVD_CUSTRMK:""})},t=C=>{R.dialog({title:"Confirmation",message:`Do you want to delete this lines no ${C+1} ?`,cancel:!0,persistent:!0}).onOk(async()=>{u.value.splice(C,1)})},r=C=>{R.dialog({component:Oe,componentProps:{ItemCat:"SERVICE_ITEMM"}}).onOk(async i=>{await g(""),u.value[C].TSRVD_ITMCD=i.MITM_ITMNM})},n=()=>{R.dialog({title:"Confirmation",message:"Do you want to submit this data ?",cancel:!0,persistent:!0}).onOk(async()=>{f.value=!0,await w.post("servicesAdmin",{header:m.value,detail:u.value}).then(C=>{f.value=!1,O()})})},a=()=>{R.dialog({component:Ee}).onOk(async C=>{console.log(C),await $(""),u.value[idx].SRVH_CUSCD=C.MCUS_CUSCD})};return(C,i)=>(_(),T(W,{ref_key:"dialogRef",ref:h,onHide:P(k),"transition-show":"slide-up","transition-hide":"slide-down","full-width":"",persistent:""},{default:l(()=>[e(j,{class:"q-dialog-plugin bg-white q-pa-sm"},{default:l(()=>[e(E,null,{default:l(()=>[Pe]),_:1}),e(E,{class:"q-pa-sm"},{default:l(()=>[s("fieldset",Ye,[qe,s("div",xe,[s("div",Fe,[e(V,{label:"SPK No",readonly:"",dense:"",modelValue:m.value.SRVH_DOCNO,"onUpdate:modelValue":i[0]||(i[0]=c=>m.value.SRVH_DOCNO=c),filled:""},null,8,["modelValue"])]),s("div",Ke,[e(V,{filled:"",modelValue:m.value.SRVH_ISSDT,"onUpdate:modelValue":i[2]||(i[2]=c=>m.value.SRVH_ISSDT=c),dense:"",label:"Issue Date",loading:f.value,onClick:i[3]||(i[3]=c=>C.quotationIssueDate.qDateProxy.show()),mask:"####-##-##","fill-mask":"",hint:"Mask: YYYY-MM-DD",readonly:o.mode==="view"},{append:l(()=>[e(ne,{name:"event",class:"cursor-pointer",disable:o.mode==="view"},{default:l(()=>[e(Ce,{cover:"","transition-show":"scale","transition-hide":"scale"},{default:l(()=>[e(Se,{modelValue:m.value.SRVH_ISSDT,"onUpdate:modelValue":i[1]||(i[1]=c=>m.value.SRVH_ISSDT=c),mask:"YYYY-MM-DD"},{default:l(()=>[s("div",Ge,[z(e(v,{label:"Close",color:"primary",flat:""},null,512),[[fe]])])]),_:1},8,["modelValue"])]),_:1})]),_:1},8,["disable"])]),_:1},8,["modelValue","loading","readonly"])])]),s("div",Be,[s("div",je,[e(q,{dense:"",filled:"",label:"Customer Choose",modelValue:m.value.SRVH_CUSCD,"onUpdate:modelValue":i[5]||(i[5]=c=>m.value.SRVH_CUSCD=c),"use-input":"","input-debounce":"500",options:S.value,onFilter:i[6]||(i[6]=(c,U,I)=>H(c,U,I,"cust")),behavior:"dialog","option-label":"MCUS_CUSNM","option-value":"MCUS_CUSCD","emit-value":"","map-options":"",loading:f.value,readonly:o.mode==="view"},{after:l(()=>[e(v,{round:"",dense:"",flat:"",icon:"person_add",onClick:i[4]||(i[4]=c=>a()),color:"cyan"},{default:l(()=>[e(b,null,{default:l(()=>[p("Add new customer")]),_:1})]),_:1})]),_:1},8,["modelValue","options","loading","readonly"])])])]),s("fieldset",Xe,[We,o.mode!=="view"?(_(),Q("div",Ze,[s("div",ze,[e(v,{flat:"",icon:"add",color:"blue",onClick:i[7]||(i[7]=c=>d())},{default:l(()=>[e(b,null,{default:l(()=>[p("Add lines")]),_:1})]),_:1})])])):N("",!0),e(ce,{bordered:"",dense:""},{default:l(()=>[u.value.length>0?(_(!0),Q(K,{key:0},G(u.value,(c,U)=>(_(),T(J,{key:U,class:"q-my-sm",dense:""},{default:l(()=>[e(A,{avatar:""},{default:l(()=>[e(de,{"text-color":"blue"},{default:l(()=>[p(L(U+1),1)]),_:2},1024)]),_:2},1024),e(A,null,{default:l(()=>[e(ee,null,{default:l(()=>[e(q,{dense:"",filled:"",label:"Item Name",modelValue:c.TSRVD_ITMCD,"onUpdate:modelValue":I=>c.TSRVD_ITMCD=I,"use-input":"","input-debounce":"500",options:M.value,onFilter:i[8]||(i[8]=(I,se,ie)=>H(I,se,ie,"item")),behavior:"dialog","option-label":"MITM_ITMNM","option-value":"MITM_ITMNM","emit-value":"","map-options":"",loading:f.value},null,8,["modelValue","onUpdate:modelValue","options","loading"])]),_:2},1024)]),_:2},1024),e(A,null,{default:l(()=>[e(V,{label:"Qty",filled:"",dense:"",modelValue:c.TSRVD_QTY,"onUpdate:modelValue":I=>c.TSRVD_QTY=I},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1024),e(A,null,{default:l(()=>[e(V,{label:"Problem",filled:"",dense:"",modelValue:c.TSRVD_CUSTRMK,"onUpdate:modelValue":I=>c.TSRVD_CUSTRMK=I},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1024),o.mode!=="view"?(_(),T(A,{key:0,side:""},{default:l(()=>[e(v,{icon:"delete",color:"red",flat:"",onClick:I=>t(U)},{default:l(()=>[e(b,null,{default:l(()=>[p("Delete line")]),_:1})]),_:2},1032,["onClick"])]),_:2},1024)):N("",!0),o.mode!=="view"?(_(),T(A,{key:1,side:""},{default:l(()=>[e(v,{icon:"library_add",color:"indigo",flat:"",onClick:I=>r(U)},{default:l(()=>[e(b,null,{default:l(()=>[p("Add new item")]),_:1})]),_:2},1032,["onClick"])]),_:2},1024)):N("",!0)]),_:2},1024))),128)):z((_(),T(J,{key:1,class:"q-my-sm",clickable:""},{default:l(()=>[e(A,null,{default:l(()=>[e(ee,null,{default:l(()=>[p(" No Items Added ")]),_:1})]),_:1})]),_:1})),[[ue]])]),_:1})])]),_:1}),e(X,{align:"right"},{default:l(()=>[e(v,{label:"OK",color:"primary",onClick:i[9]||(i[9]=c=>n()),disable:f.value,loading:f.value},null,8,["disable","loading"]),e(v,{flat:"",label:"Cancel",color:"red",onClick:P(y),loading:f.value},null,8,["onClick","loading"])]),_:1})]),_:1})]),_:1},8,["onHide"]))}};const Je={class:"q-pa-md"},el={class:"row q-pb-md"},ll=s("div",{class:"col"},[s("span",{class:"text-h4"},"Receive Order ")],-1),tl={class:"col text-right"},al={class:"row q-pt-md"},ol={class:"col"},nl={key:1},Sl={__name:"serviceView",setup(Y){const h=F(),k=D("SRVH_DOCNO"),O=D(""),y=D([]),R=D([{name:"SRVH_DOCNO",label:"SPK No",field:"SRVH_DOCNO",sortable:!0,align:"left"},{name:"MCUS_CUSNM",label:"Cust",field:"MCUS_CUSNM",sortable:!0,align:"left"},{name:"STAT",label:"Status",field:t=>d(t),sortable:!0,align:"left"},{name:"created_at",label:"Created Date",field:"created_at",sortable:!0,align:"left",format:t=>x.formatDate(new Date(t),"DD MMM YYYY")}]),o=D(!1),m=D(null);B(()=>{M(),m.value=setInterval(()=>{M()},1e4)});const M=async()=>{o.value=!0,await w.post("servicesAdmin/search",{searchBy:k.value,searchValue:O.value}).then(t=>{o.value=!1,y.value=t.data.data}).catch(t=>{o.value=!1})},S=()=>{h.dialog({component:oe}).onOk(async t=>{M()})},u=t=>{const r={SRVH_DOCNO:t.SRVH_DOCNO,SRVH_ISSDT:x.formatDate(t.SRVH_ISSDT,"YYYY-MM-DD"),SRVH_CUSCD:t.MCUS_CUSCD};let n=[];t.detail.map(a=>{n.push({id:a.id,TSRVD_ITMCD:a.TSRVD_ITMCD,TSRVD_LINE:a.TSRVD_LINE,TSRVD_QTY:a.TSRVD_QTY,TSRVD_CUSTRMK:a.TSRVD_CUSTRMK,TSRVD_REMARK:a.TSRVD_REMARK,TSRVD_FLGSTS:a.TSRVD_FLGSTS,listFixDet:a.list_fix_det})}),h.dialog({component:ve,componentProps:{header:r,detail:n,mode:t.detail.filter(a=>a.TSRVD_FLGSTS===1).length===t.detail.length?"approvecust":"view"}}).onOk(async a=>{M()})},f=t=>{window.open("https://joss.jatpowerindo.co.id/servicesAdmin/printInvoice/"+btoa(t),"_blank").focus()},H=t=>{const r={SRVH_DOCNO:t.SRVH_DOCNO,SRVH_ISSDT:x.formatDate(t.SRVH_ISSDT,"YYYY-MM-DD"),SRVH_CUSCD:t.MCUS_CUSCD};let n=[];t.detail.map(a=>{n.push({TSRVD_ITMCD:a.TSRVD_ITMCD,TSRVD_LINE:a.TSRVD_LINE,TSRVD_QTY:a.TSRVD_QTY,TSRVD_CUSTRMK:a.TSRVD_CUSTRMK})}),h.dialog({component:oe,componentProps:{header:r,detail:n}}).onOk(async a=>{M()})},$=t=>{h.dialog({title:"Confirmation",message:"Do you want to proceed to service ?",cancel:!0,persistent:!0}).onOk(async()=>{o.value=!0,await w.put(`servicesAdmin/${btoa(t.SRVH_DOCNO)}`,{TSRVD_FLGSTS:2}).then(r=>{o.value=!1}).catch(r=>{o.value=!1})})},g=t=>{h.dialog({title:"Confirmation",message:"Are you sure want to delete this order ?",cancel:!0,persistent:!0}).onOk(async()=>{o.value=!0,await w.delete(`servicesAdmin/${btoa(t.SRVH_DOCNO)}`).then(r=>{o.value=!1}).catch(r=>{o.value=!1})})},d=t=>{const r=t.detail.filter(i=>i.TSRVD_FLGSTS==0),n=t.detail.filter(i=>i.TSRVD_FLGSTS==1),a=t.detail.filter(i=>i.TSRVD_FLGSTS==2),C=t.detail.filter(i=>i.TSRVD_FLGSTS==3);if(r.length==t.detail.length)return{color:"warning",label:"On Draft",icon:"edit"};if(n.length>0&&n.length<t.detail.length)return{color:"green",label:"On Checking Price",icon:"payments"};if(n.length>0&&n.length==t.detail.length)return{color:"primary",label:"Checking Price Done, Waiting Cust Confirmation",icon:"price_check"};if(a.length>0&&a.length>=t.detail.length)return{color:"green",label:"On progress Fix by Technician",icon:"engineering"};if(C.length>0&&C.length===t.detail.length)return{color:"primary",label:"Fix has been done",icon:"fact_check"}};return(t,r)=>(_(),Q("div",Je,[s("div",el,[ll,s("div",tl,[e(v,{icon:"add",color:"blue",onClick:S},{default:l(()=>[e(b,null,{default:l(()=>[p("Create New Order")]),_:1})]),_:1})])]),e(re),s("div",al,[s("div",ol,[e(_e,{title:"Created Order",rows:y.value,columns:R.value,"row-key":"name",loading:o.value,dense:"",pagination:{rowsPerPage:20},class:"my-sticky-header-column-table"},{"top-right":l(()=>[e(q,{outlined:"",modelValue:k.value,"onUpdate:modelValue":r[0]||(r[0]=n=>k.value=n),options:R.value,label:"Search Columns","option-value":"name","option-label":"label","emit-value":"",dense:"","map-options":""},null,8,["modelValue","options"]),e(V,{borderless:"",dense:"",modelValue:O.value,"onUpdate:modelValue":[r[1]||(r[1]=n=>O.value=n),r[2]||(r[2]=n=>t.dataQuo())],placeholder:"Search",outlined:"",debounce:"1000"},{append:l(()=>[e(ne,{name:"search"})]),_:1},8,["modelValue"])]),header:l(n=>[e(te,{props:n},{default:l(()=>[(_(!0),Q(K,null,G(n.cols,a=>(_(),T(le,{key:a.name,props:n},{default:l(()=>[p(L(a.label),1)]),_:2},1032,["props"]))),128)),e(le,{"auto-width":""},{default:l(()=>[p("Action")]),_:1})]),_:2},1032,["props"])]),body:l(n=>[e(te,{props:n},{default:l(()=>[(_(!0),Q(K,null,G(n.cols,a=>(_(),T(ae,{key:a.name,props:n},{default:l(()=>[a.name==="STAT"?(_(),T(me,{key:0,clickable:"",color:a.value.color,"text-color":"white",icon:a.value.icon},{default:l(()=>[p(L(a.value.label),1)]),_:2},1032,["color","icon"])):(_(),Q("span",nl,L(a.value),1))]),_:2},1032,["props"]))),128)),e(ae,{"auto-width":""},{default:l(()=>[n.row.detail.filter(a=>a.TSRVD_FLGSTS>0).length===0?(_(),T(v,{key:0,flat:"",color:"orange",icon:"edit",onClick:a=>H(n.row),dense:""},{default:l(()=>[e(b,null,{default:l(()=>[p("Edit this Order")]),_:1})]),_:2},1032,["onClick"])):N("",!0),n.row.detail.filter(a=>a.TSRVD_FLGSTS>0).length===n.row.detail.length?(_(),T(v,{key:1,flat:"",color:"indigo",icon:"print",onClick:a=>f(n.row.SRVH_DOCNO),dense:""},{default:l(()=>[e(b,null,{default:l(()=>[p("Print this order")]),_:1})]),_:2},1032,["onClick"])):N("",!0),n.row.detail.filter(a=>a.TSRVD_FLGSTS>0).length===0?(_(),T(v,{key:2,flat:"",color:"red",icon:"delete",onClick:a=>g(n.row.SRVH_DOCNO),dense:""},{default:l(()=>[e(b,null,{default:l(()=>[p(L(n.row.detail.filter(a=>a.TSRVD_FLGSTS>0).length>0?"Cannot delete processed order":"Delete this Order"),1)]),_:2},1024)]),_:2},1032,["onClick"])):N("",!0),n.row.detail.filter(a=>a.TSRVD_FLGSTS>0).length>0?(_(),T(v,{key:3,flat:"",color:"cyan",icon:"visibility",onClick:a=>u(n.row),dense:""},{default:l(()=>[e(b,null,{default:l(()=>[p("View this Order")]),_:1})]),_:2},1032,["onClick"])):N("",!0),n.row.detail.filter(a=>a.TSRVD_FLGSTS===1).length===n.row.detail.length?(_(),T(v,{key:4,flat:"",color:"indigo",icon:"check",onClick:a=>$(n.row.SRVH_DOCNO),dense:""},{default:l(()=>[e(b,null,{default:l(()=>[p(L(n.row.detail.filter(a=>a.TSRVD_FLGSTS>0).length!==n.row.detail.length?"Please wait until all item checked":"Proceed all item to service"),1)]),_:2},1024)]),_:2},1032,["onClick"])):N("",!0)]),_:2},1024)]),_:2},1032,["props"])]),_:1},8,["rows","columns","loading"])])])]))}};export{Sl as default};
