import{Q as V}from"./QTooltip.fbc969a9.js";import{s as m,o as F,B as C,C as b,D as a,E as e,J as ee,K as q,I as o,P as M,L as le,Q as f,M as L,O as ae,aa as te,aW as G,R as Q,H as v,aY as E,aU as K,aV as x,aZ as de,aX as $,ap as ie,S as ue}from"./index.dd28f860.js";import{u as oe,b as B,d as H,Q as re,k as j,l as O,m as J,a as ce,n as W}from"./use-dialog-plugin-component.686b0a9b.js";import{Q as X,a as Z}from"./use-cache.1ade33c6.js";import{d as P}from"./date.e69c89bf.js";import{api_web as k}from"./axios.680ba101.js";import{Q as me,a as _e,C as ve}from"./ClosePopup.4252c8fe.js";import{_ as fe}from"./serviceOprUpdateOrder.1b202f24.js";import"./QBadge.2040f623.js";const Ce=o("div",{class:"text-h6"},"Create Item Master",-1),pe={class:"row"},Se={class:"col"},De={class:"col q-pl-md"},Me={class:"row q-pt-md"},Te={class:"col"},Ve={class:"col q-pl-md"},Ie={class:"row q-pt-md"},ge={class:"col"},be={class:"col q-pl-md"},he={class:"row q-pt-md"},we={class:"col"},Re={__name:"itemCreate",props:{ItemCat:String},setup(Y){const{dialogRef:h,onDialogHide:w,onDialogOK:R,onDialogCancel:y}=oe(),I=B(),n=m({MITM_ITMCD:"",MITM_ITMNM:"",MITM_STKUOM:"",MITM_ITMTYPE:1,MITM_BRAND:"",MITM_MODEL:"",MITM_SPEC:"",MITM_ITMCAT:"",MITM_COACD:"",MITM_ITMCAT:""}),r=m(!1),S=m([]),g=m([]),p=Y;F(()=>{s(),n.value.MITM_ITMCAT=p.ItemCat});const c=(i,t,l,A)=>{t(async()=>{await k.post("item/getListCoasAPI",{search:i}).then(N=>{g.value=N.data})})},U=()=>{I.dialog({title:"Confirmation",message:"Do you want to save this item ?",cancel:!0,persistent:!0}).onOk(async()=>{await k.post("item",n.value).then(i=>{R(i.data.data.value)})})},s=async()=>{r.value=!0,await k.get("item/formAPI").then(i=>{r.value=!1,S.value=i.data.uoms,g.value=i.data.coas}).catch(()=>{r.value=!1})};return(i,t)=>(C(),b(ae,{ref_key:"dialogRef",ref:h,onHide:L(w),"transition-show":"slide-up","transition-hide":"slide-down","full-width":"",persistent:""},{default:a(()=>[e(ee,{class:"q-dialog-plugin bg-white q-pa-sm"},{default:a(()=>[e(q,null,{default:a(()=>[Ce]),_:1}),e(q,{class:"q-pa-sm"},{default:a(()=>[o("div",pe,[o("div",Se,[e(M,{label:"Item Code",dense:"",modelValue:n.value.MITM_ITMCD,"onUpdate:modelValue":t[0]||(t[0]=l=>n.value.MITM_ITMCD=l),filled:""},null,8,["modelValue"])]),o("div",De,[e(M,{label:"Item Name",dense:"",modelValue:n.value.MITM_ITMNM,"onUpdate:modelValue":t[1]||(t[1]=l=>n.value.MITM_ITMNM=l),filled:""},null,8,["modelValue"])])]),o("div",Me,[o("div",Te,[e(H,{dense:"",filled:"",label:"UOM",modelValue:n.value.MITM_STKUOM,"onUpdate:modelValue":t[2]||(t[2]=l=>n.value.MITM_STKUOM=l),options:S.value,behavior:"dialog","option-label":"MUOM_UOMNM","option-value":"MUOM_UOMCD","emit-value":"","map-options":"",loading:r.value},null,8,["modelValue","options","loading"])]),o("div",Ve,[e(M,{label:"Item Brand",dense:"",modelValue:n.value.MITM_BRAND,"onUpdate:modelValue":t[3]||(t[3]=l=>n.value.MITM_BRAND=l),filled:""},null,8,["modelValue"])])]),o("div",Ie,[o("div",ge,[e(M,{label:"Item Model",dense:"",modelValue:n.value.MITM_MODEL,"onUpdate:modelValue":t[4]||(t[4]=l=>n.value.MITM_MODEL=l),filled:""},null,8,["modelValue"])]),o("div",be,[e(M,{label:"Item Specification",dense:"",modelValue:n.value.MITM_SPEC,"onUpdate:modelValue":t[5]||(t[5]=l=>n.value.MITM_SPEC=l),filled:""},null,8,["modelValue"])])]),o("div",he,[o("div",we,[e(H,{dense:"",filled:"",label:"COA",modelValue:n.value.MITM_COACD,"onUpdate:modelValue":t[6]||(t[6]=l=>n.value.MITM_COACD=l),options:g.value,"use-input":"",behavior:"dialog","option-label":"MCOA_COANM","option-value":"MCOA_COACD",onFilter:t[7]||(t[7]=(l,A,N)=>c(l,A,N)),"emit-value":"","map-options":"",loading:r.value},null,8,["modelValue","options","loading"])])])]),_:1}),e(le,{align:"right"},{default:a(()=>[e(f,{label:"OK",color:"primary",onClick:t[8]||(t[8]=l=>U())}),e(f,{flat:"",label:"Cancel",color:"red",onClick:L(y)},null,8,["onClick"])]),_:1})]),_:1})]),_:1},8,["onHide"]))}},Oe=o("div",{class:"text-h6"},"Create Order",-1),ke={style:{border:"1px black solid","border-radius":"10px"}},ye=o("legend",{style:{"margin-left":"1em",padding:"0.2em 0.8em"}},[o("b",null,"Header")],-1),Ue={class:"row"},Ne={class:"col"},$e={class:"col q-pl-md"},Qe={class:"row items-center justify-end"},He={class:"row"},Ye={class:"col"},Ae={style:{border:"1px black solid","border-radius":"10px",height:"35vh",overflow:"auto"}},Pe=o("legend",{style:{"margin-left":"1em",padding:"0.2em 0.8em"}},[o("b",null,"Detail Items")],-1),qe={key:0,class:"row q-pb-sm"},Le={class:"col text-right"},z={__name:"serviceCreateOrder",props:{header:Array,detail:Array,mode:String},setup(Y){const{dialogRef:h,onDialogHide:w,onDialogOK:R,onDialogCancel:y}=oe(),I=B(),n=Y;F(async()=>{n.header&&(await s(),await i(),r.value=n.header,p.value=n.detail)});const r=m({SRVH_DOCNO:"",SRVH_ISSDT:P.formatDate(Date.now(),"YYYY-MM-DD"),SRVH_CUSCD:""}),S=m([]),g=m([]),p=m([]),c=m(!1),U=(_,d,u,T)=>{d(async()=>{T==="cust"&&await s(_),T==="item"&&await i(_)})},s=async _=>{c.value=!0,await k.post("customer/searchAPI",{searchValue:_}).then(d=>{c.value=!1,g.value=d.data.data}).catch(()=>{c.value=!1})},i=async _=>{c.value=!0,await k.post("item/searchAPI",{searchValue:_}).then(d=>{c.value=!1,S.value=d.data.data}).catch(()=>{c.value=!1})},t=()=>{p.value.push({TSRVD_ITMCD:"",TSRVD_LINE:p.value.length+1,TSRVD_QTY:1,TSRVD_CUSTRMK:""})},l=_=>{I.dialog({title:"Confirmation",message:`Do you want to delete this lines no ${_+1} ?`,cancel:!0,persistent:!0}).onOk(async()=>{p.value.splice(_,1)})},A=_=>{I.dialog({component:Re,componentProps:{ItemCat:"SERVICE_ITEMM"}}).onOk(async d=>{await i(""),p.value[_].TSRVD_ITMCD=d.MITM_ITMNM})},N=()=>{I.dialog({title:"Confirmation",message:"Do you want to submit this data ?",cancel:!0,persistent:!0}).onOk(async()=>{c.value=!0,await k.post("servicesAdmin",{header:r.value,detail:p.value}).then(_=>{c.value=!1,R()})})};return(_,d)=>(C(),b(ae,{ref_key:"dialogRef",ref:h,onHide:L(w),"transition-show":"slide-up","transition-hide":"slide-down","full-width":"",persistent:""},{default:a(()=>[e(ee,{class:"q-dialog-plugin bg-white q-pa-sm"},{default:a(()=>[e(q,null,{default:a(()=>[Oe]),_:1}),e(q,{class:"q-pa-sm"},{default:a(()=>[o("fieldset",ke,[ye,o("div",Ue,[o("div",Ne,[e(M,{label:"SPK No",readonly:"",dense:"",modelValue:r.value.SRVH_DOCNO,"onUpdate:modelValue":d[0]||(d[0]=u=>r.value.SRVH_DOCNO=u),filled:""},null,8,["modelValue"])]),o("div",$e,[e(M,{filled:"",modelValue:r.value.SRVH_ISSDT,"onUpdate:modelValue":d[2]||(d[2]=u=>r.value.SRVH_ISSDT=u),dense:"",label:"Issue Date",loading:c.value,onClick:d[3]||(d[3]=u=>_.quotationIssueDate.qDateProxy.show()),mask:"####-##-##","fill-mask":"",hint:"Mask: YYYY-MM-DD",readonly:n.mode==="view"},{append:a(()=>[e(te,{name:"event",class:"cursor-pointer",disable:n.mode==="view"},{default:a(()=>[e(me,{cover:"","transition-show":"scale","transition-hide":"scale"},{default:a(()=>[e(_e,{modelValue:r.value.SRVH_ISSDT,"onUpdate:modelValue":d[1]||(d[1]=u=>r.value.SRVH_ISSDT=u),mask:"YYYY-MM-DD"},{default:a(()=>[o("div",Qe,[G(e(f,{label:"Close",color:"primary",flat:""},null,512),[[ve]])])]),_:1},8,["modelValue"])]),_:1})]),_:1},8,["disable"])]),_:1},8,["modelValue","loading","readonly"])])]),o("div",He,[o("div",Ye,[e(H,{dense:"",filled:"",label:"Customer Choose",modelValue:r.value.SRVH_CUSCD,"onUpdate:modelValue":d[4]||(d[4]=u=>r.value.SRVH_CUSCD=u),"use-input":"","input-debounce":"500",options:g.value,onFilter:d[5]||(d[5]=(u,T,D)=>U(u,T,D,"cust")),behavior:"dialog","option-label":"MCUS_CUSNM","option-value":"MCUS_CUSCD","emit-value":"","map-options":"",loading:c.value,readonly:n.mode==="view"},null,8,["modelValue","options","loading","readonly"])])])]),o("fieldset",Ae,[Pe,n.mode!=="view"?(C(),Q("div",qe,[o("div",Le,[e(f,{flat:"",icon:"add",color:"blue",onClick:d[6]||(d[6]=u=>t())},{default:a(()=>[e(V,null,{default:a(()=>[v("Add lines")]),_:1})]),_:1})])])):E("",!0),e(re,{bordered:"",dense:""},{default:a(()=>[p.value.length>0?(C(!0),Q(K,{key:0},x(p.value,(u,T)=>(C(),b(j,{key:T,class:"q-my-sm",dense:""},{default:a(()=>[e(O,{avatar:""},{default:a(()=>[e(de,{"text-color":"blue"},{default:a(()=>[v($(T+1),1)]),_:2},1024)]),_:2},1024),e(O,null,{default:a(()=>[e(J,null,{default:a(()=>[e(H,{dense:"",filled:"",label:"Item Name",modelValue:u.TSRVD_ITMCD,"onUpdate:modelValue":D=>u.TSRVD_ITMCD=D,"use-input":"","input-debounce":"500",options:S.value,onFilter:d[7]||(d[7]=(D,ne,se)=>U(D,ne,se,"item")),behavior:"dialog","option-label":"MITM_ITMNM","option-value":"MITM_ITMNM","emit-value":"","map-options":"",loading:c.value},null,8,["modelValue","onUpdate:modelValue","options","loading"])]),_:2},1024)]),_:2},1024),e(O,null,{default:a(()=>[e(M,{label:"Qty",filled:"",dense:"",modelValue:u.TSRVD_QTY,"onUpdate:modelValue":D=>u.TSRVD_QTY=D},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1024),e(O,null,{default:a(()=>[e(M,{label:"Problem",filled:"",dense:"",modelValue:u.TSRVD_CUSTRMK,"onUpdate:modelValue":D=>u.TSRVD_CUSTRMK=D},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1024),n.mode!=="view"?(C(),b(O,{key:0,side:""},{default:a(()=>[e(f,{icon:"delete",color:"red",flat:"",onClick:D=>l(T)},{default:a(()=>[e(V,null,{default:a(()=>[v("Delete line")]),_:1})]),_:2},1032,["onClick"])]),_:2},1024)):E("",!0),n.mode!=="view"?(C(),b(O,{key:1,side:""},{default:a(()=>[e(f,{icon:"library_add",color:"indigo",flat:"",onClick:D=>A(T)},{default:a(()=>[e(V,null,{default:a(()=>[v("Add new item")]),_:1})]),_:2},1032,["onClick"])]),_:2},1024)):E("",!0)]),_:2},1024))),128)):G((C(),b(j,{key:1,class:"q-my-sm",clickable:""},{default:a(()=>[e(O,null,{default:a(()=>[e(J,null,{default:a(()=>[v(" No Items Added ")]),_:1})]),_:1})]),_:1})),[[ie]])]),_:1})])]),_:1}),e(le,{align:"right"},{default:a(()=>[e(f,{label:"OK",color:"primary",onClick:d[8]||(d[8]=u=>N()),disable:c.value,loading:c.value},null,8,["disable","loading"]),e(f,{flat:"",label:"Cancel",color:"red",onClick:L(y),loading:c.value},null,8,["onClick","loading"])]),_:1})]),_:1})]),_:1},8,["onHide"]))}};const Ee={class:"q-pa-md"},Ke={class:"row q-pb-md"},xe=o("div",{class:"col"},[o("span",{class:"text-h4"},"Receive Order ")],-1),Fe={class:"col text-right"},Be={class:"row q-pt-md"},Ge={class:"col"},tl={__name:"serviceView",setup(Y){const h=B(),w=m("SRVH_DOCNO"),R=m(""),y=m([]),I=m([{name:"SRVH_DOCNO",label:"SPK No",field:"SRVH_DOCNO",sortable:!0,align:"left"},{name:"MCUS_CUSNM",label:"Cust",field:"MCUS_CUSNM",sortable:!0,align:"left"},{name:"created_at",label:"Created Date",field:"created_at",sortable:!0,align:"left",format:s=>P.formatDate(new Date(s),"DD MMM YYYY")}]),n=m(!1),r=m(null);F(()=>{S(),r.value=setInterval(()=>{S()},1e4)});const S=async()=>{n.value=!0,await k.post("servicesAdmin/search",{searchBy:w.value,searchValue:R.value}).then(s=>{n.value=!1,y.value=s.data.data}).catch(s=>{n.value=!1})},g=()=>{h.dialog({component:z}).onOk(async s=>{S()})},p=s=>{const i={SRVH_DOCNO:s.SRVH_DOCNO,SRVH_ISSDT:P.formatDate(s.SRVH_ISSDT,"YYYY-MM-DD"),SRVH_CUSCD:s.MCUS_CUSCD};let t=[];s.detail.map(l=>{t.push({TSRVD_ITMCD:l.TSRVD_ITMCD,TSRVD_LINE:l.TSRVD_LINE,TSRVD_QTY:l.TSRVD_QTY,TSRVD_CUSTRMK:l.TSRVD_CUSTRMK,listFixDet:l.list_fix_det})}),h.dialog({component:fe,componentProps:{header:i,detail:t,mode:"view"}}).onOk(async l=>{S()})},c=s=>{window.open("https://joss.jatpowerindo.co.id/servicesAdmin/printInvoice/"+btoa(s),"_blank").focus()},U=s=>{const i={SRVH_DOCNO:s.SRVH_DOCNO,SRVH_ISSDT:P.formatDate(s.SRVH_ISSDT,"YYYY-MM-DD"),SRVH_CUSCD:s.MCUS_CUSCD};let t=[];s.detail.map(l=>{t.push({TSRVD_ITMCD:l.TSRVD_ITMCD,TSRVD_LINE:l.TSRVD_LINE,TSRVD_QTY:l.TSRVD_QTY,TSRVD_CUSTRMK:l.TSRVD_CUSTRMK})}),h.dialog({component:z,componentProps:{header:i,detail:t}}).onOk(async l=>{S()})};return(s,i)=>(C(),Q("div",Ee,[o("div",Ke,[xe,o("div",Fe,[e(f,{icon:"add",color:"blue",onClick:g},{default:a(()=>[e(V,null,{default:a(()=>[v("Create New Order")]),_:1})]),_:1})])]),e(ue),o("div",Be,[o("div",Ge,[e(ce,{title:"Created Order",rows:y.value,columns:I.value,"row-key":"name",loading:n.value,dense:"",pagination:{rowsPerPage:20},class:"my-sticky-header-column-table"},{"top-right":a(()=>[e(H,{outlined:"",modelValue:w.value,"onUpdate:modelValue":i[0]||(i[0]=t=>w.value=t),options:I.value,label:"Search Columns","option-value":"name","option-label":"label","emit-value":"",dense:"","map-options":""},null,8,["modelValue","options"]),e(M,{borderless:"",dense:"",modelValue:R.value,"onUpdate:modelValue":[i[1]||(i[1]=t=>R.value=t),i[2]||(i[2]=t=>s.dataQuo())],placeholder:"Search",outlined:"",debounce:"1000"},{append:a(()=>[e(te,{name:"search"})]),_:1},8,["modelValue"])]),header:a(t=>[e(X,{props:t},{default:a(()=>[(C(!0),Q(K,null,x(t.cols,l=>(C(),b(W,{key:l.name,props:t},{default:a(()=>[v($(l.label),1)]),_:2},1032,["props"]))),128)),e(W,{"auto-width":""},{default:a(()=>[v("Action")]),_:1})]),_:2},1032,["props"])]),body:a(t=>[e(X,{props:t},{default:a(()=>[(C(!0),Q(K,null,x(t.cols,l=>(C(),b(Z,{key:l.name,props:t},{default:a(()=>[v($(l.value),1)]),_:2},1032,["props"]))),128)),e(Z,{"auto-width":""},{default:a(()=>[e(f,{flat:"",color:"orange",icon:"edit",onClick:l=>U(t.row),dense:"",disable:t.row.detail.filter(l=>l.TSRVD_FLGSTS>0).length>0},{default:a(()=>[e(V,null,{default:a(()=>[v("Edit this Order")]),_:1})]),_:2},1032,["onClick","disable"]),e(f,{flat:"",color:"indigo",icon:"print",onClick:l=>c(t.row.SRVH_DOCNO),dense:""},{default:a(()=>[e(V,null,{default:a(()=>[v("Print this order")]),_:1})]),_:2},1032,["onClick"]),e(f,{flat:"",color:"red",icon:"delete",onClick:l=>s.onClickDelete(t.row.SRVH_DOCNO),dense:"",disable:t.row.detail.filter(l=>l.TSRVD_FLGSTS>0).length>0},{default:a(()=>[e(V,null,{default:a(()=>[v($(t.row.detail.filter(l=>l.TSRVD_FLGSTS>0).length>0?"Cannot delete processed order":"Delete this Order"),1)]),_:2},1024)]),_:2},1032,["onClick","disable"]),e(f,{flat:"",color:"cyan",icon:"visibility",onClick:l=>p(t.row),dense:"",disable:t.row.detail.filter(l=>l.TSRVD_FLGSTS>0).length===0},{default:a(()=>[e(V,null,{default:a(()=>[v("View this Order")]),_:1})]),_:2},1032,["onClick","disable"]),e(f,{flat:"",color:"indigo",icon:"check",onClick:l=>s.onClickProceed(t.row.SRVH_DOCNO),dense:"",disable:t.row.detail.filter(l=>l.TSRVD_FLGSTS>0).length!==t.row.detail.length},{default:a(()=>[e(V,null,{default:a(()=>[v($(t.row.detail.filter(l=>l.TSRVD_FLGSTS>0).length!==t.row.detail.length?"Please wait until all item checked":"Proceed to service"),1)]),_:2},1024)]),_:2},1032,["onClick","disable"])]),_:2},1024)]),_:2},1032,["props"])]),_:1},8,["rows","columns","loading"])])])]))}};export{tl as default};
