import{Q as V}from"./QTooltip.194165d7.js";import{s as m,o as F,B as C,C as b,D as l,E as e,J as ee,K as q,I as s,P as M,L as le,Q as f,M as E,O as ae,aa as te,aW as G,R as H,H as v,aY as L,aU as K,aV as x,aZ as de,aX as Q,ap as ie,S as ue}from"./index.37776549.js";import{u as oe,b as B,d as A,Q as re,k as j,l as O,m as J,a as ce,n as W}from"./use-dialog-plugin-component.17725f0f.js";import{Q as X,a as Z}from"./use-cache.1dca1dea.js";import{d as P}from"./date.05d64d42.js";import{api_web as k}from"./axios.f85f77e6.js";import{Q as me,a as _e,C as ve}from"./ClosePopup.31ce1401.js";import{_ as fe}from"./serviceOprUpdateOrder.936d1d2b.js";import"./QBadge.4bcf8d34.js";const Ce=s("div",{class:"text-h6"},"Create Item Master",-1),Se={class:"row"},pe={class:"col"},De={class:"col q-pl-md"},Me={class:"row q-pt-md"},Te={class:"col"},Ve={class:"col q-pl-md"},Ie={class:"row q-pt-md"},ge={class:"col"},be={class:"col q-pl-md"},Re={class:"row q-pt-md"},he={class:"col"},we={__name:"itemCreate",props:{ItemCat:String},setup(Y){const{dialogRef:R,onDialogHide:h,onDialogOK:w,onDialogCancel:y}=oe(),I=B(),d=m({MITM_ITMCD:"",MITM_ITMNM:"",MITM_STKUOM:"",MITM_ITMTYPE:1,MITM_BRAND:"",MITM_MODEL:"",MITM_SPEC:"",MITM_ITMCAT:"",MITM_COACD:"",MITM_ITMCAT:""}),r=m(!1),p=m([]),g=m([]),S=Y;F(()=>{N(),d.value.MITM_ITMCAT=S.ItemCat});const c=(o,n,a,t)=>{n(async()=>{await k.post("item/getListCoasAPI",{search:o}).then($=>{g.value=$.data})})},U=()=>{I.dialog({title:"Confirmation",message:"Do you want to save this item ?",cancel:!0,persistent:!0}).onOk(async()=>{await k.post("item",d.value).then(o=>{w(o.data.data.value)})})},N=async()=>{r.value=!0,await k.get("item/formAPI").then(o=>{r.value=!1,p.value=o.data.uoms,g.value=o.data.coas}).catch(()=>{r.value=!1})};return(o,n)=>(C(),b(ae,{ref_key:"dialogRef",ref:R,onHide:E(h),"transition-show":"slide-up","transition-hide":"slide-down","full-width":"",persistent:""},{default:l(()=>[e(ee,{class:"q-dialog-plugin bg-white q-pa-sm"},{default:l(()=>[e(q,null,{default:l(()=>[Ce]),_:1}),e(q,{class:"q-pa-sm"},{default:l(()=>[s("div",Se,[s("div",pe,[e(M,{label:"Item Code",dense:"",modelValue:d.value.MITM_ITMCD,"onUpdate:modelValue":n[0]||(n[0]=a=>d.value.MITM_ITMCD=a),filled:""},null,8,["modelValue"])]),s("div",De,[e(M,{label:"Item Name",dense:"",modelValue:d.value.MITM_ITMNM,"onUpdate:modelValue":n[1]||(n[1]=a=>d.value.MITM_ITMNM=a),filled:""},null,8,["modelValue"])])]),s("div",Me,[s("div",Te,[e(A,{dense:"",filled:"",label:"UOM",modelValue:d.value.MITM_STKUOM,"onUpdate:modelValue":n[2]||(n[2]=a=>d.value.MITM_STKUOM=a),options:p.value,behavior:"dialog","option-label":"MUOM_UOMNM","option-value":"MUOM_UOMCD","emit-value":"","map-options":"",loading:r.value},null,8,["modelValue","options","loading"])]),s("div",Ve,[e(M,{label:"Item Brand",dense:"",modelValue:d.value.MITM_BRAND,"onUpdate:modelValue":n[3]||(n[3]=a=>d.value.MITM_BRAND=a),filled:""},null,8,["modelValue"])])]),s("div",Ie,[s("div",ge,[e(M,{label:"Item Model",dense:"",modelValue:d.value.MITM_MODEL,"onUpdate:modelValue":n[4]||(n[4]=a=>d.value.MITM_MODEL=a),filled:""},null,8,["modelValue"])]),s("div",be,[e(M,{label:"Item Specification",dense:"",modelValue:d.value.MITM_SPEC,"onUpdate:modelValue":n[5]||(n[5]=a=>d.value.MITM_SPEC=a),filled:""},null,8,["modelValue"])])]),s("div",Re,[s("div",he,[e(A,{dense:"",filled:"",label:"COA",modelValue:d.value.MITM_COACD,"onUpdate:modelValue":n[6]||(n[6]=a=>d.value.MITM_COACD=a),options:g.value,"use-input":"",behavior:"dialog","option-label":"MCOA_COANM","option-value":"MCOA_COACD",onFilter:n[7]||(n[7]=(a,t,$)=>c(a,t,$)),"emit-value":"","map-options":"",loading:r.value},null,8,["modelValue","options","loading"])])])]),_:1}),e(le,{align:"right"},{default:l(()=>[e(f,{label:"OK",color:"primary",onClick:n[8]||(n[8]=a=>U())}),e(f,{flat:"",label:"Cancel",color:"red",onClick:E(y)},null,8,["onClick"])]),_:1})]),_:1})]),_:1},8,["onHide"]))}},Oe=s("div",{class:"text-h6"},"Create Order",-1),ke={style:{border:"1px black solid","border-radius":"10px"}},ye=s("legend",{style:{"margin-left":"1em",padding:"0.2em 0.8em"}},[s("b",null,"Header")],-1),Ue={class:"row"},Ne={class:"col"},$e={class:"col q-pl-md"},Qe={class:"row items-center justify-end"},He={class:"row"},Ae={class:"col"},Ye={style:{border:"1px black solid","border-radius":"10px",height:"35vh",overflow:"auto"}},Pe=s("legend",{style:{"margin-left":"1em",padding:"0.2em 0.8em"}},[s("b",null,"Detail Items")],-1),qe={key:0,class:"row q-pb-sm"},Ee={class:"col text-right"},z={__name:"serviceCreateOrder",props:{header:Array,detail:Array,mode:String},setup(Y){const{dialogRef:R,onDialogHide:h,onDialogOK:w,onDialogCancel:y}=oe(),I=B(),d=Y;F(async()=>{d.header&&(await N(),await o(),r.value=d.header,S.value=d.detail)});const r=m({SRVH_DOCNO:"",SRVH_ISSDT:P.formatDate(Date.now(),"YYYY-MM-DD"),SRVH_CUSCD:""}),p=m([]),g=m([]),S=m([]),c=m(!1),U=(_,i,u,T)=>{i(async()=>{T==="cust"&&await N(_),T==="item"&&await o(_)})},N=async _=>{c.value=!0,await k.post("customer/searchAPI",{searchValue:_}).then(i=>{c.value=!1,g.value=i.data.data}).catch(()=>{c.value=!1})},o=async _=>{c.value=!0,await k.post("item/searchAPI",{searchValue:_}).then(i=>{c.value=!1,p.value=i.data.data}).catch(()=>{c.value=!1})},n=()=>{S.value.push({TSRVD_ITMCD:"",TSRVD_LINE:S.value.length+1,TSRVD_QTY:1,TSRVD_CUSTRMK:""})},a=_=>{I.dialog({title:"Confirmation",message:`Do you want to delete this lines no ${_+1} ?`,cancel:!0,persistent:!0}).onOk(async()=>{S.value.splice(_,1)})},t=_=>{I.dialog({component:we,componentProps:{ItemCat:"SERVICE_ITEMM"}}).onOk(async i=>{await o(""),S.value[_].TSRVD_ITMCD=i.MITM_ITMNM})},$=()=>{I.dialog({title:"Confirmation",message:"Do you want to submit this data ?",cancel:!0,persistent:!0}).onOk(async()=>{c.value=!0,await k.post("servicesAdmin",{header:r.value,detail:S.value}).then(_=>{c.value=!1,w()})})};return(_,i)=>(C(),b(ae,{ref_key:"dialogRef",ref:R,onHide:E(h),"transition-show":"slide-up","transition-hide":"slide-down","full-width":"",persistent:""},{default:l(()=>[e(ee,{class:"q-dialog-plugin bg-white q-pa-sm"},{default:l(()=>[e(q,null,{default:l(()=>[Oe]),_:1}),e(q,{class:"q-pa-sm"},{default:l(()=>[s("fieldset",ke,[ye,s("div",Ue,[s("div",Ne,[e(M,{label:"SPK No",readonly:"",dense:"",modelValue:r.value.SRVH_DOCNO,"onUpdate:modelValue":i[0]||(i[0]=u=>r.value.SRVH_DOCNO=u),filled:""},null,8,["modelValue"])]),s("div",$e,[e(M,{filled:"",modelValue:r.value.SRVH_ISSDT,"onUpdate:modelValue":i[2]||(i[2]=u=>r.value.SRVH_ISSDT=u),dense:"",label:"Issue Date",loading:c.value,onClick:i[3]||(i[3]=u=>_.quotationIssueDate.qDateProxy.show()),mask:"####-##-##","fill-mask":"",hint:"Mask: YYYY-MM-DD",readonly:d.mode==="view"},{append:l(()=>[e(te,{name:"event",class:"cursor-pointer",disable:d.mode==="view"},{default:l(()=>[e(me,{cover:"","transition-show":"scale","transition-hide":"scale"},{default:l(()=>[e(_e,{modelValue:r.value.SRVH_ISSDT,"onUpdate:modelValue":i[1]||(i[1]=u=>r.value.SRVH_ISSDT=u),mask:"YYYY-MM-DD"},{default:l(()=>[s("div",Qe,[G(e(f,{label:"Close",color:"primary",flat:""},null,512),[[ve]])])]),_:1},8,["modelValue"])]),_:1})]),_:1},8,["disable"])]),_:1},8,["modelValue","loading","readonly"])])]),s("div",He,[s("div",Ae,[e(A,{dense:"",filled:"",label:"Customer Choose",modelValue:r.value.SRVH_CUSCD,"onUpdate:modelValue":i[4]||(i[4]=u=>r.value.SRVH_CUSCD=u),"use-input":"","input-debounce":"500",options:g.value,onFilter:i[5]||(i[5]=(u,T,D)=>U(u,T,D,"cust")),behavior:"dialog","option-label":"MCUS_CUSNM","option-value":"MCUS_CUSCD","emit-value":"","map-options":"",loading:c.value,readonly:d.mode==="view"},null,8,["modelValue","options","loading","readonly"])])])]),s("fieldset",Ye,[Pe,d.mode!=="view"?(C(),H("div",qe,[s("div",Ee,[e(f,{flat:"",icon:"add",color:"blue",onClick:i[6]||(i[6]=u=>n())},{default:l(()=>[e(V,null,{default:l(()=>[v("Add lines")]),_:1})]),_:1})])])):L("",!0),e(re,{bordered:"",dense:""},{default:l(()=>[S.value.length>0?(C(!0),H(K,{key:0},x(S.value,(u,T)=>(C(),b(j,{key:T,class:"q-my-sm",dense:""},{default:l(()=>[e(O,{avatar:""},{default:l(()=>[e(de,{"text-color":"blue"},{default:l(()=>[v(Q(T+1),1)]),_:2},1024)]),_:2},1024),e(O,null,{default:l(()=>[e(J,null,{default:l(()=>[e(A,{dense:"",filled:"",label:"Item Name",modelValue:u.TSRVD_ITMCD,"onUpdate:modelValue":D=>u.TSRVD_ITMCD=D,"use-input":"","input-debounce":"500",options:p.value,onFilter:i[7]||(i[7]=(D,ne,se)=>U(D,ne,se,"item")),behavior:"dialog","option-label":"MITM_ITMNM","option-value":"MITM_ITMNM","emit-value":"","map-options":"",loading:c.value},null,8,["modelValue","onUpdate:modelValue","options","loading"])]),_:2},1024)]),_:2},1024),e(O,null,{default:l(()=>[e(M,{label:"Qty",filled:"",dense:"",modelValue:u.TSRVD_QTY,"onUpdate:modelValue":D=>u.TSRVD_QTY=D},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1024),e(O,null,{default:l(()=>[e(M,{label:"Problem",filled:"",dense:"",modelValue:u.TSRVD_CUSTRMK,"onUpdate:modelValue":D=>u.TSRVD_CUSTRMK=D},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1024),d.mode!=="view"?(C(),b(O,{key:0,side:""},{default:l(()=>[e(f,{icon:"delete",color:"red",flat:"",onClick:D=>a(T)},{default:l(()=>[e(V,null,{default:l(()=>[v("Delete line")]),_:1})]),_:2},1032,["onClick"])]),_:2},1024)):L("",!0),d.mode!=="view"?(C(),b(O,{key:1,side:""},{default:l(()=>[e(f,{icon:"library_add",color:"indigo",flat:"",onClick:D=>t(T)},{default:l(()=>[e(V,null,{default:l(()=>[v("Add new item")]),_:1})]),_:2},1032,["onClick"])]),_:2},1024)):L("",!0)]),_:2},1024))),128)):G((C(),b(j,{key:1,class:"q-my-sm",clickable:""},{default:l(()=>[e(O,null,{default:l(()=>[e(J,null,{default:l(()=>[v(" No Items Added ")]),_:1})]),_:1})]),_:1})),[[ie]])]),_:1})])]),_:1}),e(le,{align:"right"},{default:l(()=>[e(f,{label:"OK",color:"primary",onClick:i[8]||(i[8]=u=>$()),disable:c.value,loading:c.value},null,8,["disable","loading"]),e(f,{flat:"",label:"Cancel",color:"red",onClick:E(y),loading:c.value},null,8,["onClick","loading"])]),_:1})]),_:1})]),_:1},8,["onHide"]))}};const Le={class:"q-pa-md"},Ke={class:"row q-pb-md"},xe=s("div",{class:"col"},[s("span",{class:"text-h4"},"Receive Order ")],-1),Fe={class:"col text-right"},Be={class:"row q-pt-md"},Ge={class:"col"},tl={__name:"serviceView",setup(Y){const R=B(),h=m("SRVH_DOCNO"),w=m(""),y=m([]),I=m([{name:"SRVH_DOCNO",label:"SPK No",field:"SRVH_DOCNO",sortable:!0,align:"left"},{name:"MCUS_CUSNM",label:"Cust",field:"MCUS_CUSNM",sortable:!0,align:"left"},{name:"created_at",label:"Created Date",field:"created_at",sortable:!0,align:"left",format:o=>P.formatDate(new Date(o),"DD MMM YYYY")}]),d=m(!1),r=m(null);F(()=>{p(),r.value=setInterval(()=>{p()},1e4)});const p=async()=>{d.value=!0,await k.post("servicesAdmin/search",{searchBy:h.value,searchValue:w.value}).then(o=>{d.value=!1,y.value=o.data.data}).catch(o=>{d.value=!1})},g=()=>{R.dialog({component:z}).onOk(async o=>{p()})},S=o=>{const n={SRVH_DOCNO:o.SRVH_DOCNO,SRVH_ISSDT:P.formatDate(o.SRVH_ISSDT,"YYYY-MM-DD"),SRVH_CUSCD:o.MCUS_CUSCD};let a=[];o.detail.map(t=>{a.push({TSRVD_ITMCD:t.TSRVD_ITMCD,TSRVD_LINE:t.TSRVD_LINE,TSRVD_QTY:t.TSRVD_QTY,TSRVD_CUSTRMK:t.TSRVD_CUSTRMK,TSRVD_REMARK:t.TSRVD_REMARK,listFixDet:t.list_fix_det})}),R.dialog({component:fe,componentProps:{header:n,detail:a,mode:"view"}}).onOk(async t=>{p()})},c=o=>{window.open("https://joss.jatpowerindo.co.id/servicesAdmin/printInvoice/"+btoa(o),"_blank").focus()},U=o=>{const n={SRVH_DOCNO:o.SRVH_DOCNO,SRVH_ISSDT:P.formatDate(o.SRVH_ISSDT,"YYYY-MM-DD"),SRVH_CUSCD:o.MCUS_CUSCD};let a=[];o.detail.map(t=>{a.push({TSRVD_ITMCD:t.TSRVD_ITMCD,TSRVD_LINE:t.TSRVD_LINE,TSRVD_QTY:t.TSRVD_QTY,TSRVD_CUSTRMK:t.TSRVD_CUSTRMK})}),R.dialog({component:z,componentProps:{header:n,detail:a}}).onOk(async t=>{p()})},N=o=>{};return(o,n)=>(C(),H("div",Le,[s("div",Ke,[xe,s("div",Fe,[e(f,{icon:"add",color:"blue",onClick:g},{default:l(()=>[e(V,null,{default:l(()=>[v("Create New Order")]),_:1})]),_:1})])]),e(ue),s("div",Be,[s("div",Ge,[e(ce,{title:"Created Order",rows:y.value,columns:I.value,"row-key":"name",loading:d.value,dense:"",pagination:{rowsPerPage:20},class:"my-sticky-header-column-table"},{"top-right":l(()=>[e(A,{outlined:"",modelValue:h.value,"onUpdate:modelValue":n[0]||(n[0]=a=>h.value=a),options:I.value,label:"Search Columns","option-value":"name","option-label":"label","emit-value":"",dense:"","map-options":""},null,8,["modelValue","options"]),e(M,{borderless:"",dense:"",modelValue:w.value,"onUpdate:modelValue":[n[1]||(n[1]=a=>w.value=a),n[2]||(n[2]=a=>o.dataQuo())],placeholder:"Search",outlined:"",debounce:"1000"},{append:l(()=>[e(te,{name:"search"})]),_:1},8,["modelValue"])]),header:l(a=>[e(X,{props:a},{default:l(()=>[(C(!0),H(K,null,x(a.cols,t=>(C(),b(W,{key:t.name,props:a},{default:l(()=>[v(Q(t.label),1)]),_:2},1032,["props"]))),128)),e(W,{"auto-width":""},{default:l(()=>[v("Action")]),_:1})]),_:2},1032,["props"])]),body:l(a=>[e(X,{props:a},{default:l(()=>[(C(!0),H(K,null,x(a.cols,t=>(C(),b(Z,{key:t.name,props:a},{default:l(()=>[v(Q(t.value),1)]),_:2},1032,["props"]))),128)),e(Z,{"auto-width":""},{default:l(()=>[e(f,{flat:"",color:"orange",icon:"edit",onClick:t=>U(a.row),dense:"",disable:a.row.detail.filter(t=>t.TSRVD_FLGSTS>0).length>0},{default:l(()=>[e(V,null,{default:l(()=>[v("Edit this Order")]),_:1})]),_:2},1032,["onClick","disable"]),e(f,{flat:"",color:"indigo",icon:"print",onClick:t=>c(a.row.SRVH_DOCNO),dense:""},{default:l(()=>[e(V,null,{default:l(()=>[v("Print this order")]),_:1})]),_:2},1032,["onClick"]),e(f,{flat:"",color:"red",icon:"delete",onClick:t=>o.onClickDelete(a.row.SRVH_DOCNO),dense:"",disable:a.row.detail.filter(t=>t.TSRVD_FLGSTS>0).length>0},{default:l(()=>[e(V,null,{default:l(()=>[v(Q(a.row.detail.filter(t=>t.TSRVD_FLGSTS>0).length>0?"Cannot delete processed order":"Delete this Order"),1)]),_:2},1024)]),_:2},1032,["onClick","disable"]),e(f,{flat:"",color:"cyan",icon:"visibility",onClick:t=>S(a.row),dense:"",disable:a.row.detail.filter(t=>t.TSRVD_FLGSTS>0).length===0},{default:l(()=>[e(V,null,{default:l(()=>[v("View this Order")]),_:1})]),_:2},1032,["onClick","disable"]),e(f,{flat:"",color:"indigo",icon:"check",onClick:t=>N(a.row.SRVH_DOCNO),dense:"",disable:a.row.detail.filter(t=>t.TSRVD_FLGSTS>0).length!==a.row.detail.length},{default:l(()=>[e(V,null,{default:l(()=>[v(Q(a.row.detail.filter(t=>t.TSRVD_FLGSTS>0).length!==a.row.detail.length?"Please wait until all item checked":"Proceed to service"),1)]),_:2},1024)]),_:2},1032,["onClick","disable"])]),_:2},1024)]),_:2},1032,["props"])]),_:1},8,["rows","columns","loading"])])])]))}};export{tl as default};
