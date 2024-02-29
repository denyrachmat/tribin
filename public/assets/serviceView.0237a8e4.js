import{Q as I}from"./QTooltip.b5199655.js";import{s as m,o as F,B as C,C as w,D as l,E as e,J as ee,K as q,I as i,P as T,L as le,Q as f,M as L,O as ae,aa as te,aW as G,R as H,H as v,aY as E,aU as K,aV as x,aZ as ie,aX as A,ap as de,S as ue}from"./index.e20032ea.js";import{u as oe,b as B,d as Q,Q as re,k as j,l as y,m as J,a as ce,n as W}from"./use-dialog-plugin-component.f5bebeba.js";import{Q as X,a as Z}from"./use-cache.3dabe215.js";import{d as P}from"./date.acd35523.js";import{api_web as b}from"./axios.4babf0f5.js";import{Q as me,a as _e,C as ve}from"./ClosePopup.a3e48e6c.js";import{_ as fe}from"./serviceOprUpdateOrder.17ac9eb1.js";import"./QBadge.dcf678b4.js";const Se=i("div",{class:"text-h6"},"Create Item Master",-1),Ce={class:"row"},De={class:"col"},pe={class:"col q-pl-md"},Me={class:"row q-pt-md"},Te={class:"col"},Ve={class:"col q-pl-md"},ge={class:"row q-pt-md"},Ie={class:"col"},be={class:"col q-pl-md"},he={class:"row q-pt-md"},Re={class:"col"},we={__name:"itemCreate",props:{ItemCat:String},setup(Y){const{dialogRef:V,onDialogHide:O,onDialogOK:k,onDialogCancel:U}=oe(),h=B(),n=m({MITM_ITMCD:"",MITM_ITMNM:"",MITM_STKUOM:"",MITM_ITMTYPE:1,MITM_BRAND:"",MITM_MODEL:"",MITM_SPEC:"",MITM_ITMCAT:"",MITM_COACD:"",MITM_ITMCAT:""}),r=m(!1),p=m([]),R=m([]),D=Y;F(()=>{$(),n.value.MITM_ITMCAT=D.ItemCat});const c=(S,a,s,o)=>{a(async()=>{await b.post("item/getListCoasAPI",{search:S}).then(t=>{R.value=t.data})})},N=()=>{h.dialog({title:"Confirmation",message:"Do you want to save this item ?",cancel:!0,persistent:!0}).onOk(async()=>{await b.post("item",n.value).then(S=>{k(S.data.data.value)})})},$=async()=>{r.value=!0,await b.get("item/formAPI").then(S=>{r.value=!1,p.value=S.data.uoms,R.value=S.data.coas}).catch(()=>{r.value=!1})};return(S,a)=>(C(),w(ae,{ref_key:"dialogRef",ref:V,onHide:L(O),"transition-show":"slide-up","transition-hide":"slide-down","full-width":"",persistent:""},{default:l(()=>[e(ee,{class:"q-dialog-plugin bg-white q-pa-sm"},{default:l(()=>[e(q,null,{default:l(()=>[Se]),_:1}),e(q,{class:"q-pa-sm"},{default:l(()=>[i("div",Ce,[i("div",De,[e(T,{label:"Item Code",dense:"",modelValue:n.value.MITM_ITMCD,"onUpdate:modelValue":a[0]||(a[0]=s=>n.value.MITM_ITMCD=s),filled:""},null,8,["modelValue"])]),i("div",pe,[e(T,{label:"Item Name",dense:"",modelValue:n.value.MITM_ITMNM,"onUpdate:modelValue":a[1]||(a[1]=s=>n.value.MITM_ITMNM=s),filled:""},null,8,["modelValue"])])]),i("div",Me,[i("div",Te,[e(Q,{dense:"",filled:"",label:"UOM",modelValue:n.value.MITM_STKUOM,"onUpdate:modelValue":a[2]||(a[2]=s=>n.value.MITM_STKUOM=s),options:p.value,behavior:"dialog","option-label":"MUOM_UOMNM","option-value":"MUOM_UOMCD","emit-value":"","map-options":"",loading:r.value},null,8,["modelValue","options","loading"])]),i("div",Ve,[e(T,{label:"Item Brand",dense:"",modelValue:n.value.MITM_BRAND,"onUpdate:modelValue":a[3]||(a[3]=s=>n.value.MITM_BRAND=s),filled:""},null,8,["modelValue"])])]),i("div",ge,[i("div",Ie,[e(T,{label:"Item Model",dense:"",modelValue:n.value.MITM_MODEL,"onUpdate:modelValue":a[4]||(a[4]=s=>n.value.MITM_MODEL=s),filled:""},null,8,["modelValue"])]),i("div",be,[e(T,{label:"Item Specification",dense:"",modelValue:n.value.MITM_SPEC,"onUpdate:modelValue":a[5]||(a[5]=s=>n.value.MITM_SPEC=s),filled:""},null,8,["modelValue"])])]),i("div",he,[i("div",Re,[e(Q,{dense:"",filled:"",label:"COA",modelValue:n.value.MITM_COACD,"onUpdate:modelValue":a[6]||(a[6]=s=>n.value.MITM_COACD=s),options:R.value,"use-input":"",behavior:"dialog","option-label":"MCOA_COANM","option-value":"MCOA_COACD",onFilter:a[7]||(a[7]=(s,o,t)=>c(s,o,t)),"emit-value":"","map-options":"",loading:r.value},null,8,["modelValue","options","loading"])])])]),_:1}),e(le,{align:"right"},{default:l(()=>[e(f,{label:"OK",color:"primary",onClick:a[8]||(a[8]=s=>N())}),e(f,{flat:"",label:"Cancel",color:"red",onClick:L(U)},null,8,["onClick"])]),_:1})]),_:1})]),_:1},8,["onHide"]))}},Oe=i("div",{class:"text-h6"},"Create Order",-1),ke={style:{border:"1px black solid","border-radius":"10px"}},ye=i("legend",{style:{"margin-left":"1em",padding:"0.2em 0.8em"}},[i("b",null,"Header")],-1),Ue={class:"row"},Ne={class:"col"},$e={class:"col q-pl-md"},Ae={class:"row items-center justify-end"},He={class:"row"},Qe={class:"col"},Ye={style:{border:"1px black solid","border-radius":"10px",height:"35vh",overflow:"auto"}},Pe=i("legend",{style:{"margin-left":"1em",padding:"0.2em 0.8em"}},[i("b",null,"Detail Items")],-1),qe={key:0,class:"row q-pb-sm"},Le={class:"col text-right"},z={__name:"serviceCreateOrder",props:{header:Array,detail:Array,mode:String},setup(Y){const{dialogRef:V,onDialogHide:O,onDialogOK:k,onDialogCancel:U}=oe(),h=B(),n=Y;F(async()=>{n.header&&(await $(),await S(),r.value=n.header,D.value=n.detail)});const r=m({SRVH_DOCNO:"",SRVH_ISSDT:P.formatDate(Date.now(),"YYYY-MM-DD"),SRVH_CUSCD:""}),p=m([]),R=m([]),D=m([]),c=m(!1),N=(_,d,u,g)=>{d(async()=>{g==="cust"&&await $(_),g==="item"&&await S(_)})},$=async _=>{c.value=!0,await b.post("customer/searchAPI",{searchValue:_}).then(d=>{c.value=!1,R.value=d.data.data}).catch(()=>{c.value=!1})},S=async _=>{c.value=!0,await b.post("item/searchAPI",{searchValue:_}).then(d=>{c.value=!1,p.value=d.data.data}).catch(()=>{c.value=!1})},a=()=>{D.value.push({TSRVD_ITMCD:"",TSRVD_LINE:D.value.length+1,TSRVD_QTY:1,TSRVD_CUSTRMK:""})},s=_=>{h.dialog({title:"Confirmation",message:`Do you want to delete this lines no ${_+1} ?`,cancel:!0,persistent:!0}).onOk(async()=>{D.value.splice(_,1)})},o=_=>{h.dialog({component:we,componentProps:{ItemCat:"SERVICE_ITEMM"}}).onOk(async d=>{await S(""),D.value[_].TSRVD_ITMCD=d.MITM_ITMNM})},t=()=>{h.dialog({title:"Confirmation",message:"Do you want to submit this data ?",cancel:!0,persistent:!0}).onOk(async()=>{c.value=!0,await b.post("servicesAdmin",{header:r.value,detail:D.value}).then(_=>{c.value=!1,k()})})};return(_,d)=>(C(),w(ae,{ref_key:"dialogRef",ref:V,onHide:L(O),"transition-show":"slide-up","transition-hide":"slide-down","full-width":"",persistent:""},{default:l(()=>[e(ee,{class:"q-dialog-plugin bg-white q-pa-sm"},{default:l(()=>[e(q,null,{default:l(()=>[Oe]),_:1}),e(q,{class:"q-pa-sm"},{default:l(()=>[i("fieldset",ke,[ye,i("div",Ue,[i("div",Ne,[e(T,{label:"SPK No",readonly:"",dense:"",modelValue:r.value.SRVH_DOCNO,"onUpdate:modelValue":d[0]||(d[0]=u=>r.value.SRVH_DOCNO=u),filled:""},null,8,["modelValue"])]),i("div",$e,[e(T,{filled:"",modelValue:r.value.SRVH_ISSDT,"onUpdate:modelValue":d[2]||(d[2]=u=>r.value.SRVH_ISSDT=u),dense:"",label:"Issue Date",loading:c.value,onClick:d[3]||(d[3]=u=>_.quotationIssueDate.qDateProxy.show()),mask:"####-##-##","fill-mask":"",hint:"Mask: YYYY-MM-DD",readonly:n.mode==="view"},{append:l(()=>[e(te,{name:"event",class:"cursor-pointer",disable:n.mode==="view"},{default:l(()=>[e(me,{cover:"","transition-show":"scale","transition-hide":"scale"},{default:l(()=>[e(_e,{modelValue:r.value.SRVH_ISSDT,"onUpdate:modelValue":d[1]||(d[1]=u=>r.value.SRVH_ISSDT=u),mask:"YYYY-MM-DD"},{default:l(()=>[i("div",Ae,[G(e(f,{label:"Close",color:"primary",flat:""},null,512),[[ve]])])]),_:1},8,["modelValue"])]),_:1})]),_:1},8,["disable"])]),_:1},8,["modelValue","loading","readonly"])])]),i("div",He,[i("div",Qe,[e(Q,{dense:"",filled:"",label:"Customer Choose",modelValue:r.value.SRVH_CUSCD,"onUpdate:modelValue":d[4]||(d[4]=u=>r.value.SRVH_CUSCD=u),"use-input":"","input-debounce":"500",options:R.value,onFilter:d[5]||(d[5]=(u,g,M)=>N(u,g,M,"cust")),behavior:"dialog","option-label":"MCUS_CUSNM","option-value":"MCUS_CUSCD","emit-value":"","map-options":"",loading:c.value,readonly:n.mode==="view"},null,8,["modelValue","options","loading","readonly"])])])]),i("fieldset",Ye,[Pe,n.mode!=="view"?(C(),H("div",qe,[i("div",Le,[e(f,{flat:"",icon:"add",color:"blue",onClick:d[6]||(d[6]=u=>a())},{default:l(()=>[e(I,null,{default:l(()=>[v("Add lines")]),_:1})]),_:1})])])):E("",!0),e(re,{bordered:"",dense:""},{default:l(()=>[D.value.length>0?(C(!0),H(K,{key:0},x(D.value,(u,g)=>(C(),w(j,{key:g,class:"q-my-sm",dense:""},{default:l(()=>[e(y,{avatar:""},{default:l(()=>[e(ie,{"text-color":"blue"},{default:l(()=>[v(A(g+1),1)]),_:2},1024)]),_:2},1024),e(y,null,{default:l(()=>[e(J,null,{default:l(()=>[e(Q,{dense:"",filled:"",label:"Item Name",modelValue:u.TSRVD_ITMCD,"onUpdate:modelValue":M=>u.TSRVD_ITMCD=M,"use-input":"","input-debounce":"500",options:p.value,onFilter:d[7]||(d[7]=(M,ne,se)=>N(M,ne,se,"item")),behavior:"dialog","option-label":"MITM_ITMNM","option-value":"MITM_ITMNM","emit-value":"","map-options":"",loading:c.value},null,8,["modelValue","onUpdate:modelValue","options","loading"])]),_:2},1024)]),_:2},1024),e(y,null,{default:l(()=>[e(T,{label:"Qty",filled:"",dense:"",modelValue:u.TSRVD_QTY,"onUpdate:modelValue":M=>u.TSRVD_QTY=M},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1024),e(y,null,{default:l(()=>[e(T,{label:"Problem",filled:"",dense:"",modelValue:u.TSRVD_CUSTRMK,"onUpdate:modelValue":M=>u.TSRVD_CUSTRMK=M},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1024),n.mode!=="view"?(C(),w(y,{key:0,side:""},{default:l(()=>[e(f,{icon:"delete",color:"red",flat:"",onClick:M=>s(g)},{default:l(()=>[e(I,null,{default:l(()=>[v("Delete line")]),_:1})]),_:2},1032,["onClick"])]),_:2},1024)):E("",!0),n.mode!=="view"?(C(),w(y,{key:1,side:""},{default:l(()=>[e(f,{icon:"library_add",color:"indigo",flat:"",onClick:M=>o(g)},{default:l(()=>[e(I,null,{default:l(()=>[v("Add new item")]),_:1})]),_:2},1032,["onClick"])]),_:2},1024)):E("",!0)]),_:2},1024))),128)):G((C(),w(j,{key:1,class:"q-my-sm",clickable:""},{default:l(()=>[e(y,null,{default:l(()=>[e(J,null,{default:l(()=>[v(" No Items Added ")]),_:1})]),_:1})]),_:1})),[[de]])]),_:1})])]),_:1}),e(le,{align:"right"},{default:l(()=>[e(f,{label:"OK",color:"primary",onClick:d[8]||(d[8]=u=>t()),disable:c.value,loading:c.value},null,8,["disable","loading"]),e(f,{flat:"",label:"Cancel",color:"red",onClick:L(U),loading:c.value},null,8,["onClick","loading"])]),_:1})]),_:1})]),_:1},8,["onHide"]))}};const Ee={class:"q-pa-md"},Ke={class:"row q-pb-md"},xe=i("div",{class:"col"},[i("span",{class:"text-h4"},"Receive Order ")],-1),Fe={class:"col text-right"},Be={class:"row q-pt-md"},Ge={class:"col"},tl={__name:"serviceView",setup(Y){const V=B(),O=m("SRVH_DOCNO"),k=m(""),U=m([]),h=m([{name:"SRVH_DOCNO",label:"SPK No",field:"SRVH_DOCNO",sortable:!0,align:"left"},{name:"MCUS_CUSNM",label:"Cust",field:"MCUS_CUSNM",sortable:!0,align:"left"},{name:"MCUS_CUSNM",label:"Status",field:a=>a.detail.filter(s=>s.TSRVD_FLGSTS===1).length===0?"On Queue":"On Check Price",sortable:!0,align:"left"},{name:"created_at",label:"Created Date",field:"created_at",sortable:!0,align:"left",format:a=>P.formatDate(new Date(a),"DD MMM YYYY")}]),n=m(!1),r=m(null);F(()=>{p(),r.value=setInterval(()=>{p()},1e4)});const p=async()=>{n.value=!0,await b.post("servicesAdmin/search",{searchBy:O.value,searchValue:k.value}).then(a=>{n.value=!1,U.value=a.data.data}).catch(a=>{n.value=!1})},R=()=>{V.dialog({component:z}).onOk(async a=>{p()})},D=a=>{const s={SRVH_DOCNO:a.SRVH_DOCNO,SRVH_ISSDT:P.formatDate(a.SRVH_ISSDT,"YYYY-MM-DD"),SRVH_CUSCD:a.MCUS_CUSCD};let o=[];a.detail.map(t=>{o.push({TSRVD_ITMCD:t.TSRVD_ITMCD,TSRVD_LINE:t.TSRVD_LINE,TSRVD_QTY:t.TSRVD_QTY,TSRVD_CUSTRMK:t.TSRVD_CUSTRMK,TSRVD_REMARK:t.TSRVD_REMARK,listFixDet:t.list_fix_det})}),V.dialog({component:fe,componentProps:{header:s,detail:o,mode:"view"}}).onOk(async t=>{p()})},c=a=>{window.open("https://joss.jatpowerindo.co.id/servicesAdmin/printInvoice/"+btoa(a),"_blank").focus()},N=a=>{const s={SRVH_DOCNO:a.SRVH_DOCNO,SRVH_ISSDT:P.formatDate(a.SRVH_ISSDT,"YYYY-MM-DD"),SRVH_CUSCD:a.MCUS_CUSCD};let o=[];a.detail.map(t=>{o.push({TSRVD_ITMCD:t.TSRVD_ITMCD,TSRVD_LINE:t.TSRVD_LINE,TSRVD_QTY:t.TSRVD_QTY,TSRVD_CUSTRMK:t.TSRVD_CUSTRMK})}),V.dialog({component:z,componentProps:{header:s,detail:o}}).onOk(async t=>{p()})},$=a=>{V.dialog({title:"Confirmation",message:"Do you want to proceed to service ?",cancel:!0,persistent:!0}).onOk(async()=>{n.value=!0,await b.put(`servicesAdmin/${btoa(a.SRVH_DOCNO)}`,{TSRVD_FLGSTS:2}).then(s=>{n.value=!1}).catch(s=>{n.value=!1})})},S=a=>{V.dialog({title:"Confirmation",message:"Are you sure want to delete this order ?",cancel:!0,persistent:!0}).onOk(async()=>{n.value=!0,await b.delete(`servicesAdmin/${btoa(a.SRVH_DOCNO)}`).then(s=>{n.value=!1}).catch(s=>{n.value=!1})})};return(a,s)=>(C(),H("div",Ee,[i("div",Ke,[xe,i("div",Fe,[e(f,{icon:"add",color:"blue",onClick:R},{default:l(()=>[e(I,null,{default:l(()=>[v("Create New Order")]),_:1})]),_:1})])]),e(ue),i("div",Be,[i("div",Ge,[e(ce,{title:"Created Order",rows:U.value,columns:h.value,"row-key":"name",loading:n.value,dense:"",pagination:{rowsPerPage:20},class:"my-sticky-header-column-table"},{"top-right":l(()=>[e(Q,{outlined:"",modelValue:O.value,"onUpdate:modelValue":s[0]||(s[0]=o=>O.value=o),options:h.value,label:"Search Columns","option-value":"name","option-label":"label","emit-value":"",dense:"","map-options":""},null,8,["modelValue","options"]),e(T,{borderless:"",dense:"",modelValue:k.value,"onUpdate:modelValue":[s[1]||(s[1]=o=>k.value=o),s[2]||(s[2]=o=>a.dataQuo())],placeholder:"Search",outlined:"",debounce:"1000"},{append:l(()=>[e(te,{name:"search"})]),_:1},8,["modelValue"])]),header:l(o=>[e(X,{props:o},{default:l(()=>[(C(!0),H(K,null,x(o.cols,t=>(C(),w(W,{key:t.name,props:o},{default:l(()=>[v(A(t.label),1)]),_:2},1032,["props"]))),128)),e(W,{"auto-width":""},{default:l(()=>[v("Action")]),_:1})]),_:2},1032,["props"])]),body:l(o=>[e(X,{props:o},{default:l(()=>[(C(!0),H(K,null,x(o.cols,t=>(C(),w(Z,{key:t.name,props:o},{default:l(()=>[v(A(t.value),1)]),_:2},1032,["props"]))),128)),e(Z,{"auto-width":""},{default:l(()=>[e(f,{flat:"",color:"orange",icon:"edit",onClick:t=>N(o.row),dense:"",disable:o.row.detail.filter(t=>t.TSRVD_FLGSTS>0).length>0},{default:l(()=>[e(I,null,{default:l(()=>[v("Edit this Order")]),_:1})]),_:2},1032,["onClick","disable"]),e(f,{flat:"",color:"indigo",icon:"print",onClick:t=>c(o.row.SRVH_DOCNO),dense:"",disable:o.row.detail.filter(t=>t.TSRVD_FLGSTS>0).length!==o.row.detail.length},{default:l(()=>[e(I,null,{default:l(()=>[v("Print this order")]),_:1})]),_:2},1032,["onClick","disable"]),e(f,{flat:"",color:"red",icon:"delete",onClick:t=>S(o.row.SRVH_DOCNO),dense:"",disable:o.row.detail.filter(t=>t.TSRVD_FLGSTS>0).length>0},{default:l(()=>[e(I,null,{default:l(()=>[v(A(o.row.detail.filter(t=>t.TSRVD_FLGSTS>0).length>0?"Cannot delete processed order":"Delete this Order"),1)]),_:2},1024)]),_:2},1032,["onClick","disable"]),e(f,{flat:"",color:"cyan",icon:"visibility",onClick:t=>D(o.row),dense:"",disable:o.row.detail.filter(t=>t.TSRVD_FLGSTS>0).length===0},{default:l(()=>[e(I,null,{default:l(()=>[v("View this Order")]),_:1})]),_:2},1032,["onClick","disable"]),e(f,{flat:"",color:"indigo",icon:"check",onClick:t=>$(o.row.SRVH_DOCNO),dense:"",disable:o.row.detail.filter(t=>t.TSRVD_FLGSTS>0).length!==o.row.detail.length},{default:l(()=>[e(I,null,{default:l(()=>[v(A(o.row.detail.filter(t=>t.TSRVD_FLGSTS>0).length!==o.row.detail.length?"Please wait until all item checked":"Proceed to service"),1)]),_:2},1024)]),_:2},1032,["onClick","disable"])]),_:2},1024)]),_:2},1032,["props"])]),_:1},8,["rows","columns","loading"])])])]))}};export{tl as default};
