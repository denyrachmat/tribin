import{Q as I}from"./QTooltip.cd346e65.js";import{s as f,o as x,B as c,C as v,D as t,E as l,J as ee,K as q,I as i,P as M,L as le,Q as C,M as E,O as te,aa as ae,aW as B,R as Q,H as S,aY as k,aU as F,aV as K,aZ as se,aX as H,ap as de,S as ue}from"./index.95d05fb3.js";import{u as oe,b as G,d as Y,Q as re,k as j,l as U,m as W,a as ce,n as Z,x as _e}from"./use-dialog-plugin-component.bfc25e13.js";import{Q as J,a as X}from"./use-cache.b6c7a2f0.js";import{d as P}from"./date.1695a3e7.js";import{api_web as R}from"./axios.cb280446.js";import{Q as me,a as fe,C as Se}from"./ClosePopup.915833cb.js";import{_ as ve}from"./serviceOprUpdateOrder.fa1afc83.js";import"./QBadge.1f2da2b0.js";const Ce=i("div",{class:"text-h6"},"Create Item Master",-1),De={class:"row"},Te={class:"col"},pe={class:"col q-pl-md"},Ve={class:"row q-pt-md"},Me={class:"col"},ge={class:"col q-pl-md"},he={class:"row q-pt-md"},Ie={class:"col"},Re={class:"col q-pl-md"},be={class:"row q-pt-md"},we={class:"col"},ke={__name:"itemCreate",props:{ItemCat:String},setup(L){const{dialogRef:g,onDialogHide:O,onDialogOK:y,onDialogCancel:N}=oe(),b=G(),n=f({MITM_ITMCD:"",MITM_ITMNM:"",MITM_STKUOM:"",MITM_ITMTYPE:1,MITM_BRAND:"",MITM_MODEL:"",MITM_SPEC:"",MITM_ITMCAT:"",MITM_COACD:"",MITM_ITMCAT:""}),_=f(!1),p=f([]),w=f([]),T=L;x(()=>{A(),n.value.MITM_ITMCAT=T.ItemCat});const m=(D,d,a,u)=>{d(async()=>{await R.post("item/getListCoasAPI",{search:D}).then(o=>{w.value=o.data})})},$=()=>{b.dialog({title:"Confirmation",message:"Do you want to save this item ?",cancel:!0,persistent:!0}).onOk(async()=>{await R.post("item",n.value).then(D=>{y(D.data.data.value)})})},A=async()=>{_.value=!0,await R.get("item/formAPI").then(D=>{_.value=!1,p.value=D.data.uoms,w.value=D.data.coas}).catch(()=>{_.value=!1})};return(D,d)=>(c(),v(te,{ref_key:"dialogRef",ref:g,onHide:E(O),"transition-show":"slide-up","transition-hide":"slide-down","full-width":"",persistent:""},{default:t(()=>[l(ee,{class:"q-dialog-plugin bg-white q-pa-sm"},{default:t(()=>[l(q,null,{default:t(()=>[Ce]),_:1}),l(q,{class:"q-pa-sm"},{default:t(()=>[i("div",De,[i("div",Te,[l(M,{label:"Item Code",dense:"",modelValue:n.value.MITM_ITMCD,"onUpdate:modelValue":d[0]||(d[0]=a=>n.value.MITM_ITMCD=a),filled:""},null,8,["modelValue"])]),i("div",pe,[l(M,{label:"Item Name",dense:"",modelValue:n.value.MITM_ITMNM,"onUpdate:modelValue":d[1]||(d[1]=a=>n.value.MITM_ITMNM=a),filled:""},null,8,["modelValue"])])]),i("div",Ve,[i("div",Me,[l(Y,{dense:"",filled:"",label:"UOM",modelValue:n.value.MITM_STKUOM,"onUpdate:modelValue":d[2]||(d[2]=a=>n.value.MITM_STKUOM=a),options:p.value,behavior:"dialog","option-label":"MUOM_UOMNM","option-value":"MUOM_UOMCD","emit-value":"","map-options":"",loading:_.value},null,8,["modelValue","options","loading"])]),i("div",ge,[l(M,{label:"Item Brand",dense:"",modelValue:n.value.MITM_BRAND,"onUpdate:modelValue":d[3]||(d[3]=a=>n.value.MITM_BRAND=a),filled:""},null,8,["modelValue"])])]),i("div",he,[i("div",Ie,[l(M,{label:"Item Model",dense:"",modelValue:n.value.MITM_MODEL,"onUpdate:modelValue":d[4]||(d[4]=a=>n.value.MITM_MODEL=a),filled:""},null,8,["modelValue"])]),i("div",Re,[l(M,{label:"Item Specification",dense:"",modelValue:n.value.MITM_SPEC,"onUpdate:modelValue":d[5]||(d[5]=a=>n.value.MITM_SPEC=a),filled:""},null,8,["modelValue"])])]),i("div",be,[i("div",we,[l(Y,{dense:"",filled:"",label:"COA",modelValue:n.value.MITM_COACD,"onUpdate:modelValue":d[6]||(d[6]=a=>n.value.MITM_COACD=a),options:w.value,"use-input":"",behavior:"dialog","option-label":"MCOA_COANM","option-value":"MCOA_COACD",onFilter:d[7]||(d[7]=(a,u,o)=>m(a,u,o)),"emit-value":"","map-options":"",loading:_.value},null,8,["modelValue","options","loading"])])])]),_:1}),l(le,{align:"right"},{default:t(()=>[l(C,{label:"OK",color:"primary",onClick:d[8]||(d[8]=a=>$())}),l(C,{flat:"",label:"Cancel",color:"red",onClick:E(N)},null,8,["onClick"])]),_:1})]),_:1})]),_:1},8,["onHide"]))}},Oe=i("div",{class:"text-h6"},"Create Order",-1),ye={style:{border:"1px black solid","border-radius":"10px"}},Ue=i("legend",{style:{"margin-left":"1em",padding:"0.2em 0.8em"}},[i("b",null,"Header")],-1),Ne={class:"row"},$e={class:"col"},Ae={class:"col q-pl-md"},He={class:"row items-center justify-end"},Qe={class:"row"},Ye={class:"col"},Le={style:{border:"1px black solid","border-radius":"10px",height:"35vh",overflow:"auto"}},Pe=i("legend",{style:{"margin-left":"1em",padding:"0.2em 0.8em"}},[i("b",null,"Detail Items")],-1),qe={key:0,class:"row q-pb-sm"},Ee={class:"col text-right"},z={__name:"serviceCreateOrder",props:{header:Array,detail:Array,mode:String},setup(L){const{dialogRef:g,onDialogHide:O,onDialogOK:y,onDialogCancel:N}=oe(),b=G(),n=L;x(async()=>{n.header&&(await A(),await D(),_.value=n.header,T.value=n.detail)});const _=f({SRVH_DOCNO:"",SRVH_ISSDT:P.formatDate(Date.now(),"YYYY-MM-DD"),SRVH_CUSCD:""}),p=f([]),w=f([]),T=f([]),m=f(!1),$=(e,s,r,h)=>{s(async()=>{h==="cust"&&await A(e),h==="item"&&await D(e)})},A=async e=>{m.value=!0,await R.post("customer/searchAPI",{searchValue:e}).then(s=>{m.value=!1,w.value=s.data.data}).catch(()=>{m.value=!1})},D=async e=>{m.value=!0,await R.post("item/searchAPI",{searchValue:e}).then(s=>{m.value=!1,p.value=s.data.data}).catch(()=>{m.value=!1})},d=()=>{T.value.push({TSRVD_ITMCD:"",TSRVD_LINE:T.value.length+1,TSRVD_QTY:1,TSRVD_CUSTRMK:""})},a=e=>{b.dialog({title:"Confirmation",message:`Do you want to delete this lines no ${e+1} ?`,cancel:!0,persistent:!0}).onOk(async()=>{T.value.splice(e,1)})},u=e=>{b.dialog({component:ke,componentProps:{ItemCat:"SERVICE_ITEMM"}}).onOk(async s=>{await D(""),T.value[e].TSRVD_ITMCD=s.MITM_ITMNM})},o=()=>{b.dialog({title:"Confirmation",message:"Do you want to submit this data ?",cancel:!0,persistent:!0}).onOk(async()=>{m.value=!0,await R.post("servicesAdmin",{header:_.value,detail:T.value}).then(e=>{m.value=!1,y()})})};return(e,s)=>(c(),v(te,{ref_key:"dialogRef",ref:g,onHide:E(O),"transition-show":"slide-up","transition-hide":"slide-down","full-width":"",persistent:""},{default:t(()=>[l(ee,{class:"q-dialog-plugin bg-white q-pa-sm"},{default:t(()=>[l(q,null,{default:t(()=>[Oe]),_:1}),l(q,{class:"q-pa-sm"},{default:t(()=>[i("fieldset",ye,[Ue,i("div",Ne,[i("div",$e,[l(M,{label:"SPK No",readonly:"",dense:"",modelValue:_.value.SRVH_DOCNO,"onUpdate:modelValue":s[0]||(s[0]=r=>_.value.SRVH_DOCNO=r),filled:""},null,8,["modelValue"])]),i("div",Ae,[l(M,{filled:"",modelValue:_.value.SRVH_ISSDT,"onUpdate:modelValue":s[2]||(s[2]=r=>_.value.SRVH_ISSDT=r),dense:"",label:"Issue Date",loading:m.value,onClick:s[3]||(s[3]=r=>e.quotationIssueDate.qDateProxy.show()),mask:"####-##-##","fill-mask":"",hint:"Mask: YYYY-MM-DD",readonly:n.mode==="view"},{append:t(()=>[l(ae,{name:"event",class:"cursor-pointer",disable:n.mode==="view"},{default:t(()=>[l(me,{cover:"","transition-show":"scale","transition-hide":"scale"},{default:t(()=>[l(fe,{modelValue:_.value.SRVH_ISSDT,"onUpdate:modelValue":s[1]||(s[1]=r=>_.value.SRVH_ISSDT=r),mask:"YYYY-MM-DD"},{default:t(()=>[i("div",He,[B(l(C,{label:"Close",color:"primary",flat:""},null,512),[[Se]])])]),_:1},8,["modelValue"])]),_:1})]),_:1},8,["disable"])]),_:1},8,["modelValue","loading","readonly"])])]),i("div",Qe,[i("div",Ye,[l(Y,{dense:"",filled:"",label:"Customer Choose",modelValue:_.value.SRVH_CUSCD,"onUpdate:modelValue":s[4]||(s[4]=r=>_.value.SRVH_CUSCD=r),"use-input":"","input-debounce":"500",options:w.value,onFilter:s[5]||(s[5]=(r,h,V)=>$(r,h,V,"cust")),behavior:"dialog","option-label":"MCUS_CUSNM","option-value":"MCUS_CUSCD","emit-value":"","map-options":"",loading:m.value,readonly:n.mode==="view"},null,8,["modelValue","options","loading","readonly"])])])]),i("fieldset",Le,[Pe,n.mode!=="view"?(c(),Q("div",qe,[i("div",Ee,[l(C,{flat:"",icon:"add",color:"blue",onClick:s[6]||(s[6]=r=>d())},{default:t(()=>[l(I,null,{default:t(()=>[S("Add lines")]),_:1})]),_:1})])])):k("",!0),l(re,{bordered:"",dense:""},{default:t(()=>[T.value.length>0?(c(!0),Q(F,{key:0},K(T.value,(r,h)=>(c(),v(j,{key:h,class:"q-my-sm",dense:""},{default:t(()=>[l(U,{avatar:""},{default:t(()=>[l(se,{"text-color":"blue"},{default:t(()=>[S(H(h+1),1)]),_:2},1024)]),_:2},1024),l(U,null,{default:t(()=>[l(W,null,{default:t(()=>[l(Y,{dense:"",filled:"",label:"Item Name",modelValue:r.TSRVD_ITMCD,"onUpdate:modelValue":V=>r.TSRVD_ITMCD=V,"use-input":"","input-debounce":"500",options:p.value,onFilter:s[7]||(s[7]=(V,ne,ie)=>$(V,ne,ie,"item")),behavior:"dialog","option-label":"MITM_ITMNM","option-value":"MITM_ITMNM","emit-value":"","map-options":"",loading:m.value},null,8,["modelValue","onUpdate:modelValue","options","loading"])]),_:2},1024)]),_:2},1024),l(U,null,{default:t(()=>[l(M,{label:"Qty",filled:"",dense:"",modelValue:r.TSRVD_QTY,"onUpdate:modelValue":V=>r.TSRVD_QTY=V},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1024),l(U,null,{default:t(()=>[l(M,{label:"Problem",filled:"",dense:"",modelValue:r.TSRVD_CUSTRMK,"onUpdate:modelValue":V=>r.TSRVD_CUSTRMK=V},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1024),n.mode!=="view"?(c(),v(U,{key:0,side:""},{default:t(()=>[l(C,{icon:"delete",color:"red",flat:"",onClick:V=>a(h)},{default:t(()=>[l(I,null,{default:t(()=>[S("Delete line")]),_:1})]),_:2},1032,["onClick"])]),_:2},1024)):k("",!0),n.mode!=="view"?(c(),v(U,{key:1,side:""},{default:t(()=>[l(C,{icon:"library_add",color:"indigo",flat:"",onClick:V=>u(h)},{default:t(()=>[l(I,null,{default:t(()=>[S("Add new item")]),_:1})]),_:2},1032,["onClick"])]),_:2},1024)):k("",!0)]),_:2},1024))),128)):B((c(),v(j,{key:1,class:"q-my-sm",clickable:""},{default:t(()=>[l(U,null,{default:t(()=>[l(W,null,{default:t(()=>[S(" No Items Added ")]),_:1})]),_:1})]),_:1})),[[de]])]),_:1})])]),_:1}),l(le,{align:"right"},{default:t(()=>[l(C,{label:"OK",color:"primary",onClick:s[8]||(s[8]=r=>o()),disable:m.value,loading:m.value},null,8,["disable","loading"]),l(C,{flat:"",label:"Cancel",color:"red",onClick:E(N),loading:m.value},null,8,["onClick","loading"])]),_:1})]),_:1})]),_:1},8,["onHide"]))}};const Fe={class:"q-pa-md"},Ke={class:"row q-pb-md"},xe=i("div",{class:"col"},[i("span",{class:"text-h4"},"Receive Order ")],-1),Ge={class:"col text-right"},Be={class:"row q-pt-md"},je={class:"col"},We={key:1},nl={__name:"serviceView",setup(L){const g=G(),O=f("SRVH_DOCNO"),y=f(""),N=f([]),b=f([{name:"SRVH_DOCNO",label:"SPK No",field:"SRVH_DOCNO",sortable:!0,align:"left"},{name:"MCUS_CUSNM",label:"Cust",field:"MCUS_CUSNM",sortable:!0,align:"left"},{name:"STAT",label:"Status",field:a=>d(a),sortable:!0,align:"left"},{name:"created_at",label:"Created Date",field:"created_at",sortable:!0,align:"left",format:a=>P.formatDate(new Date(a),"DD MMM YYYY")}]),n=f(!1),_=f(null);x(()=>{p(),_.value=setInterval(()=>{p()},1e4)});const p=async()=>{n.value=!0,await R.post("servicesAdmin/search",{searchBy:O.value,searchValue:y.value}).then(a=>{n.value=!1,N.value=a.data.data}).catch(a=>{n.value=!1})},w=()=>{g.dialog({component:z}).onOk(async a=>{p()})},T=a=>{const u={SRVH_DOCNO:a.SRVH_DOCNO,SRVH_ISSDT:P.formatDate(a.SRVH_ISSDT,"YYYY-MM-DD"),SRVH_CUSCD:a.MCUS_CUSCD};let o=[];a.detail.map(e=>{o.push({TSRVD_ITMCD:e.TSRVD_ITMCD,TSRVD_LINE:e.TSRVD_LINE,TSRVD_QTY:e.TSRVD_QTY,TSRVD_CUSTRMK:e.TSRVD_CUSTRMK,TSRVD_REMARK:e.TSRVD_REMARK,TSRVD_FLGSTS:e.TSRVD_FLGSTS,listFixDet:e.list_fix_det})}),g.dialog({component:ve,componentProps:{header:u,detail:o,mode:a.detail.filter(e=>e.TSRVD_FLGSTS===1).length===a.detail.length?"approvecust":"view"}}).onOk(async e=>{p()})},m=a=>{window.open("https://joss.jatpowerindo.co.id/servicesAdmin/printInvoice/"+btoa(a),"_blank").focus()},$=a=>{const u={SRVH_DOCNO:a.SRVH_DOCNO,SRVH_ISSDT:P.formatDate(a.SRVH_ISSDT,"YYYY-MM-DD"),SRVH_CUSCD:a.MCUS_CUSCD};let o=[];a.detail.map(e=>{o.push({TSRVD_ITMCD:e.TSRVD_ITMCD,TSRVD_LINE:e.TSRVD_LINE,TSRVD_QTY:e.TSRVD_QTY,TSRVD_CUSTRMK:e.TSRVD_CUSTRMK})}),g.dialog({component:z,componentProps:{header:u,detail:o}}).onOk(async e=>{p()})},A=a=>{g.dialog({title:"Confirmation",message:"Do you want to proceed to service ?",cancel:!0,persistent:!0}).onOk(async()=>{n.value=!0,await R.put(`servicesAdmin/${btoa(a.SRVH_DOCNO)}`,{TSRVD_FLGSTS:2}).then(u=>{n.value=!1}).catch(u=>{n.value=!1})})},D=a=>{g.dialog({title:"Confirmation",message:"Are you sure want to delete this order ?",cancel:!0,persistent:!0}).onOk(async()=>{n.value=!0,await R.delete(`servicesAdmin/${btoa(a.SRVH_DOCNO)}`).then(u=>{n.value=!1}).catch(u=>{n.value=!1})})},d=a=>{const u=a.detail.filter(e=>e.TSRVD_FLGSTS===0),o=a.detail.filter(e=>e.TSRVD_FLGSTS===1);if(a.detail.filter(e=>e.TSRVD_FLGSTS===2),u.length==a.detail.length)return{color:"warning",label:"On Draft",icon:"edit"};if(o.length>0&&o.length<a.detail.length)return{color:"green",label:"On Checking Price",icon:"payments"};if(o.length>0&&o.length==a.detail.length)return{color:"primary",label:"Checking Price Done, Waiting Cust Confirmation",icon:"price_check"}};return(a,u)=>(c(),Q("div",Fe,[i("div",Ke,[xe,i("div",Ge,[l(C,{icon:"add",color:"blue",onClick:w},{default:t(()=>[l(I,null,{default:t(()=>[S("Create New Order")]),_:1})]),_:1})])]),l(ue),i("div",Be,[i("div",je,[l(ce,{title:"Created Order",rows:N.value,columns:b.value,"row-key":"name",loading:n.value,dense:"",pagination:{rowsPerPage:20},class:"my-sticky-header-column-table"},{"top-right":t(()=>[l(Y,{outlined:"",modelValue:O.value,"onUpdate:modelValue":u[0]||(u[0]=o=>O.value=o),options:b.value,label:"Search Columns","option-value":"name","option-label":"label","emit-value":"",dense:"","map-options":""},null,8,["modelValue","options"]),l(M,{borderless:"",dense:"",modelValue:y.value,"onUpdate:modelValue":[u[1]||(u[1]=o=>y.value=o),u[2]||(u[2]=o=>a.dataQuo())],placeholder:"Search",outlined:"",debounce:"1000"},{append:t(()=>[l(ae,{name:"search"})]),_:1},8,["modelValue"])]),header:t(o=>[l(J,{props:o},{default:t(()=>[(c(!0),Q(F,null,K(o.cols,e=>(c(),v(Z,{key:e.name,props:o},{default:t(()=>[S(H(e.label),1)]),_:2},1032,["props"]))),128)),l(Z,{"auto-width":""},{default:t(()=>[S("Action")]),_:1})]),_:2},1032,["props"])]),body:t(o=>[l(J,{props:o},{default:t(()=>[(c(!0),Q(F,null,K(o.cols,e=>(c(),v(X,{key:e.name,props:o},{default:t(()=>[e.name==="STAT"?(c(),v(_e,{key:0,clickable:"",color:e.value.color,"text-color":"white",icon:e.value.icon},{default:t(()=>[S(H(e.value.label),1)]),_:2},1032,["color","icon"])):(c(),Q("span",We,H(e.value),1))]),_:2},1032,["props"]))),128)),l(X,{"auto-width":""},{default:t(()=>[o.row.detail.filter(e=>e.TSRVD_FLGSTS>0).length===0?(c(),v(C,{key:0,flat:"",color:"orange",icon:"edit",onClick:e=>$(o.row),dense:""},{default:t(()=>[l(I,null,{default:t(()=>[S("Edit this Order")]),_:1})]),_:2},1032,["onClick"])):k("",!0),o.row.detail.filter(e=>e.TSRVD_FLGSTS>0).length===o.row.detail.length?(c(),v(C,{key:1,flat:"",color:"indigo",icon:"print",onClick:e=>m(o.row.SRVH_DOCNO),dense:""},{default:t(()=>[l(I,null,{default:t(()=>[S("Print this order")]),_:1})]),_:2},1032,["onClick"])):k("",!0),o.row.detail.filter(e=>e.TSRVD_FLGSTS>0).length===0?(c(),v(C,{key:2,flat:"",color:"red",icon:"delete",onClick:e=>D(o.row.SRVH_DOCNO),dense:""},{default:t(()=>[l(I,null,{default:t(()=>[S(H(o.row.detail.filter(e=>e.TSRVD_FLGSTS>0).length>0?"Cannot delete processed order":"Delete this Order"),1)]),_:2},1024)]),_:2},1032,["onClick"])):k("",!0),o.row.detail.filter(e=>e.TSRVD_FLGSTS>0).length>0?(c(),v(C,{key:3,flat:"",color:"cyan",icon:"visibility",onClick:e=>T(o.row),dense:""},{default:t(()=>[l(I,null,{default:t(()=>[S("View this Order")]),_:1})]),_:2},1032,["onClick"])):k("",!0),o.row.detail.filter(e=>e.TSRVD_FLGSTS===1).length===o.row.detail.length?(c(),v(C,{key:4,flat:"",color:"indigo",icon:"check",onClick:e=>A(o.row.SRVH_DOCNO),dense:""},{default:t(()=>[l(I,null,{default:t(()=>[S(H(o.row.detail.filter(e=>e.TSRVD_FLGSTS>0).length!==o.row.detail.length?"Please wait until all item checked":"Proceed all item to service"),1)]),_:2},1024)]),_:2},1032,["onClick"])):k("",!0)]),_:2},1024)]),_:2},1032,["props"])]),_:1},8,["rows","columns","loading"])])])]))}};export{nl as default};
