import{Q as I}from"./QTooltip.44e687d8.js";import{s as f,o as K,B as c,C,D as a,E as l,J as ee,K as q,I as i,P as M,L as le,Q as v,M as F,O as te,aa as ae,aW as B,R as Q,H as S,aY as k,aU as E,aV as x,aZ as se,aX as H,ap as de,S as ue}from"./index.848c5e11.js";import{u as oe,b as G,d as Y,Q as re,k as j,l as U,m as W,a as ce,n as Z,x as _e}from"./use-dialog-plugin-component.f688655a.js";import{Q as J,a as X}from"./use-cache.3cc0d5ed.js";import{d as P}from"./date.d6bf290c.js";import{api_web as R}from"./axios.87174c21.js";import{Q as me,a as fe,C as Se}from"./ClosePopup.6579f105.js";import{_ as Ce}from"./serviceOprUpdateOrder.b40e4002.js";import"./QBadge.3c695ede.js";const ve=i("div",{class:"text-h6"},"Create Item Master",-1),Te={class:"row"},De={class:"col"},pe={class:"col q-pl-md"},Ve={class:"row q-pt-md"},Me={class:"col"},ge={class:"col q-pl-md"},he={class:"row q-pt-md"},Ie={class:"col"},Re={class:"col q-pl-md"},be={class:"row q-pt-md"},we={class:"col"},ke={__name:"itemCreate",props:{ItemCat:String},setup(L){const{dialogRef:g,onDialogHide:O,onDialogOK:y,onDialogCancel:N}=oe(),b=G(),n=f({MITM_ITMCD:"",MITM_ITMNM:"",MITM_STKUOM:"",MITM_ITMTYPE:1,MITM_BRAND:"",MITM_MODEL:"",MITM_SPEC:"",MITM_ITMCAT:"",MITM_COACD:"",MITM_ITMCAT:""}),_=f(!1),p=f([]),w=f([]),D=L;K(()=>{A(),n.value.MITM_ITMCAT=D.ItemCat});const m=(T,u,t,r)=>{u(async()=>{await R.post("item/getListCoasAPI",{search:T}).then(o=>{w.value=o.data})})},$=()=>{b.dialog({title:"Confirmation",message:"Do you want to save this item ?",cancel:!0,persistent:!0}).onOk(async()=>{await R.post("item",n.value).then(T=>{y(T.data.data.value)})})},A=async()=>{_.value=!0,await R.get("item/formAPI").then(T=>{_.value=!1,p.value=T.data.uoms,w.value=T.data.coas}).catch(()=>{_.value=!1})};return(T,u)=>(c(),C(te,{ref_key:"dialogRef",ref:g,onHide:F(O),"transition-show":"slide-up","transition-hide":"slide-down","full-width":"",persistent:""},{default:a(()=>[l(ee,{class:"q-dialog-plugin bg-white q-pa-sm"},{default:a(()=>[l(q,null,{default:a(()=>[ve]),_:1}),l(q,{class:"q-pa-sm"},{default:a(()=>[i("div",Te,[i("div",De,[l(M,{label:"Item Code",dense:"",modelValue:n.value.MITM_ITMCD,"onUpdate:modelValue":u[0]||(u[0]=t=>n.value.MITM_ITMCD=t),filled:""},null,8,["modelValue"])]),i("div",pe,[l(M,{label:"Item Name",dense:"",modelValue:n.value.MITM_ITMNM,"onUpdate:modelValue":u[1]||(u[1]=t=>n.value.MITM_ITMNM=t),filled:""},null,8,["modelValue"])])]),i("div",Ve,[i("div",Me,[l(Y,{dense:"",filled:"",label:"UOM",modelValue:n.value.MITM_STKUOM,"onUpdate:modelValue":u[2]||(u[2]=t=>n.value.MITM_STKUOM=t),options:p.value,behavior:"dialog","option-label":"MUOM_UOMNM","option-value":"MUOM_UOMCD","emit-value":"","map-options":"",loading:_.value},null,8,["modelValue","options","loading"])]),i("div",ge,[l(M,{label:"Item Brand",dense:"",modelValue:n.value.MITM_BRAND,"onUpdate:modelValue":u[3]||(u[3]=t=>n.value.MITM_BRAND=t),filled:""},null,8,["modelValue"])])]),i("div",he,[i("div",Ie,[l(M,{label:"Item Model",dense:"",modelValue:n.value.MITM_MODEL,"onUpdate:modelValue":u[4]||(u[4]=t=>n.value.MITM_MODEL=t),filled:""},null,8,["modelValue"])]),i("div",Re,[l(M,{label:"Item Specification",dense:"",modelValue:n.value.MITM_SPEC,"onUpdate:modelValue":u[5]||(u[5]=t=>n.value.MITM_SPEC=t),filled:""},null,8,["modelValue"])])]),i("div",be,[i("div",we,[l(Y,{dense:"",filled:"",label:"COA",modelValue:n.value.MITM_COACD,"onUpdate:modelValue":u[6]||(u[6]=t=>n.value.MITM_COACD=t),options:w.value,"use-input":"",behavior:"dialog","option-label":"MCOA_COANM","option-value":"MCOA_COACD",onFilter:u[7]||(u[7]=(t,r,o)=>m(t,r,o)),"emit-value":"","map-options":"",loading:_.value},null,8,["modelValue","options","loading"])])])]),_:1}),l(le,{align:"right"},{default:a(()=>[l(v,{label:"OK",color:"primary",onClick:u[8]||(u[8]=t=>$())}),l(v,{flat:"",label:"Cancel",color:"red",onClick:F(N)},null,8,["onClick"])]),_:1})]),_:1})]),_:1},8,["onHide"]))}},Oe=i("div",{class:"text-h6"},"Create Order",-1),ye={style:{border:"1px black solid","border-radius":"10px"}},Ue=i("legend",{style:{"margin-left":"1em",padding:"0.2em 0.8em"}},[i("b",null,"Header")],-1),Ne={class:"row"},$e={class:"col"},Ae={class:"col q-pl-md"},He={class:"row items-center justify-end"},Qe={class:"row"},Ye={class:"col"},Le={style:{border:"1px black solid","border-radius":"10px",height:"35vh",overflow:"auto"}},Pe=i("legend",{style:{"margin-left":"1em",padding:"0.2em 0.8em"}},[i("b",null,"Detail Items")],-1),qe={key:0,class:"row q-pb-sm"},Fe={class:"col text-right"},z={__name:"serviceCreateOrder",props:{header:Array,detail:Array,mode:String},setup(L){const{dialogRef:g,onDialogHide:O,onDialogOK:y,onDialogCancel:N}=oe(),b=G(),n=L;K(async()=>{n.header&&(await A(),await T(),_.value=n.header,D.value=n.detail)});const _=f({SRVH_DOCNO:"",SRVH_ISSDT:P.formatDate(Date.now(),"YYYY-MM-DD"),SRVH_CUSCD:""}),p=f([]),w=f([]),D=f([]),m=f(!1),$=(e,s,d,h)=>{s(async()=>{h==="cust"&&await A(e),h==="item"&&await T(e)})},A=async e=>{m.value=!0,await R.post("customer/searchAPI",{searchValue:e}).then(s=>{m.value=!1,w.value=s.data.data}).catch(()=>{m.value=!1})},T=async e=>{m.value=!0,await R.post("item/searchAPI",{searchValue:e}).then(s=>{m.value=!1,p.value=s.data.data}).catch(()=>{m.value=!1})},u=()=>{D.value.push({TSRVD_ITMCD:"",TSRVD_LINE:D.value.length+1,TSRVD_QTY:1,TSRVD_CUSTRMK:""})},t=e=>{b.dialog({title:"Confirmation",message:`Do you want to delete this lines no ${e+1} ?`,cancel:!0,persistent:!0}).onOk(async()=>{D.value.splice(e,1)})},r=e=>{b.dialog({component:ke,componentProps:{ItemCat:"SERVICE_ITEMM"}}).onOk(async s=>{await T(""),D.value[e].TSRVD_ITMCD=s.MITM_ITMNM})},o=()=>{b.dialog({title:"Confirmation",message:"Do you want to submit this data ?",cancel:!0,persistent:!0}).onOk(async()=>{m.value=!0,await R.post("servicesAdmin",{header:_.value,detail:D.value}).then(e=>{m.value=!1,y()})})};return(e,s)=>(c(),C(te,{ref_key:"dialogRef",ref:g,onHide:F(O),"transition-show":"slide-up","transition-hide":"slide-down","full-width":"",persistent:""},{default:a(()=>[l(ee,{class:"q-dialog-plugin bg-white q-pa-sm"},{default:a(()=>[l(q,null,{default:a(()=>[Oe]),_:1}),l(q,{class:"q-pa-sm"},{default:a(()=>[i("fieldset",ye,[Ue,i("div",Ne,[i("div",$e,[l(M,{label:"SPK No",readonly:"",dense:"",modelValue:_.value.SRVH_DOCNO,"onUpdate:modelValue":s[0]||(s[0]=d=>_.value.SRVH_DOCNO=d),filled:""},null,8,["modelValue"])]),i("div",Ae,[l(M,{filled:"",modelValue:_.value.SRVH_ISSDT,"onUpdate:modelValue":s[2]||(s[2]=d=>_.value.SRVH_ISSDT=d),dense:"",label:"Issue Date",loading:m.value,onClick:s[3]||(s[3]=d=>e.quotationIssueDate.qDateProxy.show()),mask:"####-##-##","fill-mask":"",hint:"Mask: YYYY-MM-DD",readonly:n.mode==="view"},{append:a(()=>[l(ae,{name:"event",class:"cursor-pointer",disable:n.mode==="view"},{default:a(()=>[l(me,{cover:"","transition-show":"scale","transition-hide":"scale"},{default:a(()=>[l(fe,{modelValue:_.value.SRVH_ISSDT,"onUpdate:modelValue":s[1]||(s[1]=d=>_.value.SRVH_ISSDT=d),mask:"YYYY-MM-DD"},{default:a(()=>[i("div",He,[B(l(v,{label:"Close",color:"primary",flat:""},null,512),[[Se]])])]),_:1},8,["modelValue"])]),_:1})]),_:1},8,["disable"])]),_:1},8,["modelValue","loading","readonly"])])]),i("div",Qe,[i("div",Ye,[l(Y,{dense:"",filled:"",label:"Customer Choose",modelValue:_.value.SRVH_CUSCD,"onUpdate:modelValue":s[4]||(s[4]=d=>_.value.SRVH_CUSCD=d),"use-input":"","input-debounce":"500",options:w.value,onFilter:s[5]||(s[5]=(d,h,V)=>$(d,h,V,"cust")),behavior:"dialog","option-label":"MCUS_CUSNM","option-value":"MCUS_CUSCD","emit-value":"","map-options":"",loading:m.value,readonly:n.mode==="view"},null,8,["modelValue","options","loading","readonly"])])])]),i("fieldset",Le,[Pe,n.mode!=="view"?(c(),Q("div",qe,[i("div",Fe,[l(v,{flat:"",icon:"add",color:"blue",onClick:s[6]||(s[6]=d=>u())},{default:a(()=>[l(I,null,{default:a(()=>[S("Add lines")]),_:1})]),_:1})])])):k("",!0),l(re,{bordered:"",dense:""},{default:a(()=>[D.value.length>0?(c(!0),Q(E,{key:0},x(D.value,(d,h)=>(c(),C(j,{key:h,class:"q-my-sm",dense:""},{default:a(()=>[l(U,{avatar:""},{default:a(()=>[l(se,{"text-color":"blue"},{default:a(()=>[S(H(h+1),1)]),_:2},1024)]),_:2},1024),l(U,null,{default:a(()=>[l(W,null,{default:a(()=>[l(Y,{dense:"",filled:"",label:"Item Name",modelValue:d.TSRVD_ITMCD,"onUpdate:modelValue":V=>d.TSRVD_ITMCD=V,"use-input":"","input-debounce":"500",options:p.value,onFilter:s[7]||(s[7]=(V,ne,ie)=>$(V,ne,ie,"item")),behavior:"dialog","option-label":"MITM_ITMNM","option-value":"MITM_ITMNM","emit-value":"","map-options":"",loading:m.value},null,8,["modelValue","onUpdate:modelValue","options","loading"])]),_:2},1024)]),_:2},1024),l(U,null,{default:a(()=>[l(M,{label:"Qty",filled:"",dense:"",modelValue:d.TSRVD_QTY,"onUpdate:modelValue":V=>d.TSRVD_QTY=V},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1024),l(U,null,{default:a(()=>[l(M,{label:"Problem",filled:"",dense:"",modelValue:d.TSRVD_CUSTRMK,"onUpdate:modelValue":V=>d.TSRVD_CUSTRMK=V},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1024),n.mode!=="view"?(c(),C(U,{key:0,side:""},{default:a(()=>[l(v,{icon:"delete",color:"red",flat:"",onClick:V=>t(h)},{default:a(()=>[l(I,null,{default:a(()=>[S("Delete line")]),_:1})]),_:2},1032,["onClick"])]),_:2},1024)):k("",!0),n.mode!=="view"?(c(),C(U,{key:1,side:""},{default:a(()=>[l(v,{icon:"library_add",color:"indigo",flat:"",onClick:V=>r(h)},{default:a(()=>[l(I,null,{default:a(()=>[S("Add new item")]),_:1})]),_:2},1032,["onClick"])]),_:2},1024)):k("",!0)]),_:2},1024))),128)):B((c(),C(j,{key:1,class:"q-my-sm",clickable:""},{default:a(()=>[l(U,null,{default:a(()=>[l(W,null,{default:a(()=>[S(" No Items Added ")]),_:1})]),_:1})]),_:1})),[[de]])]),_:1})])]),_:1}),l(le,{align:"right"},{default:a(()=>[l(v,{label:"OK",color:"primary",onClick:s[8]||(s[8]=d=>o()),disable:m.value,loading:m.value},null,8,["disable","loading"]),l(v,{flat:"",label:"Cancel",color:"red",onClick:F(N),loading:m.value},null,8,["onClick","loading"])]),_:1})]),_:1})]),_:1},8,["onHide"]))}};const Ee={class:"q-pa-md"},xe={class:"row q-pb-md"},Ke=i("div",{class:"col"},[i("span",{class:"text-h4"},"Receive Order ")],-1),Ge={class:"col text-right"},Be={class:"row q-pt-md"},je={class:"col"},We={key:1},nl={__name:"serviceView",setup(L){const g=G(),O=f("SRVH_DOCNO"),y=f(""),N=f([]),b=f([{name:"SRVH_DOCNO",label:"SPK No",field:"SRVH_DOCNO",sortable:!0,align:"left"},{name:"MCUS_CUSNM",label:"Cust",field:"MCUS_CUSNM",sortable:!0,align:"left"},{name:"STAT",label:"Status",field:t=>u(t),sortable:!0,align:"left"},{name:"created_at",label:"Created Date",field:"created_at",sortable:!0,align:"left",format:t=>P.formatDate(new Date(t),"DD MMM YYYY")}]),n=f(!1),_=f(null);K(()=>{p(),_.value=setInterval(()=>{p()},1e4)});const p=async()=>{n.value=!0,await R.post("servicesAdmin/search",{searchBy:O.value,searchValue:y.value}).then(t=>{n.value=!1,N.value=t.data.data}).catch(t=>{n.value=!1})},w=()=>{g.dialog({component:z}).onOk(async t=>{p()})},D=t=>{const r={SRVH_DOCNO:t.SRVH_DOCNO,SRVH_ISSDT:P.formatDate(t.SRVH_ISSDT,"YYYY-MM-DD"),SRVH_CUSCD:t.MCUS_CUSCD};let o=[];t.detail.map(e=>{o.push({id:e.id,TSRVD_ITMCD:e.TSRVD_ITMCD,TSRVD_LINE:e.TSRVD_LINE,TSRVD_QTY:e.TSRVD_QTY,TSRVD_CUSTRMK:e.TSRVD_CUSTRMK,TSRVD_REMARK:e.TSRVD_REMARK,TSRVD_FLGSTS:e.TSRVD_FLGSTS,listFixDet:e.list_fix_det})}),g.dialog({component:Ce,componentProps:{header:r,detail:o,mode:t.detail.filter(e=>e.TSRVD_FLGSTS===1).length===t.detail.length?"approvecust":"view"}}).onOk(async e=>{p()})},m=t=>{window.open("https://joss.jatpowerindo.co.id/servicesAdmin/printInvoice/"+btoa(t),"_blank").focus()},$=t=>{const r={SRVH_DOCNO:t.SRVH_DOCNO,SRVH_ISSDT:P.formatDate(t.SRVH_ISSDT,"YYYY-MM-DD"),SRVH_CUSCD:t.MCUS_CUSCD};let o=[];t.detail.map(e=>{o.push({TSRVD_ITMCD:e.TSRVD_ITMCD,TSRVD_LINE:e.TSRVD_LINE,TSRVD_QTY:e.TSRVD_QTY,TSRVD_CUSTRMK:e.TSRVD_CUSTRMK})}),g.dialog({component:z,componentProps:{header:r,detail:o}}).onOk(async e=>{p()})},A=t=>{g.dialog({title:"Confirmation",message:"Do you want to proceed to service ?",cancel:!0,persistent:!0}).onOk(async()=>{n.value=!0,await R.put(`servicesAdmin/${btoa(t.SRVH_DOCNO)}`,{TSRVD_FLGSTS:2}).then(r=>{n.value=!1}).catch(r=>{n.value=!1})})},T=t=>{g.dialog({title:"Confirmation",message:"Are you sure want to delete this order ?",cancel:!0,persistent:!0}).onOk(async()=>{n.value=!0,await R.delete(`servicesAdmin/${btoa(t.SRVH_DOCNO)}`).then(r=>{n.value=!1}).catch(r=>{n.value=!1})})},u=t=>{const r=t.detail.filter(d=>d.TSRVD_FLGSTS===0),o=t.detail.filter(d=>d.TSRVD_FLGSTS===1),e=t.detail.filter(d=>d.TSRVD_FLGSTS===2),s=t.detail.filter(d=>d.TSRVD_FLGSTS===3);if(r.length==t.detail.length)return{color:"warning",label:"On Draft",icon:"edit"};if(o.length>0&&o.length<t.detail.length)return{color:"green",label:"On Checking Price",icon:"payments"};if(o.length>0&&o.length==t.detail.length)return{color:"primary",label:"Checking Price Done, Waiting Cust Confirmation",icon:"price_check"};if(e.length>0&&e.length>=t.detail.length)return{color:"green",label:"On progress Fix by Technician",icon:"engineering"};if(s.length>0&&s.length===t.detail.length)return{color:"primary",label:"Fix has been done",icon:"fact_check"}};return(t,r)=>(c(),Q("div",Ee,[i("div",xe,[Ke,i("div",Ge,[l(v,{icon:"add",color:"blue",onClick:w},{default:a(()=>[l(I,null,{default:a(()=>[S("Create New Order")]),_:1})]),_:1})])]),l(ue),i("div",Be,[i("div",je,[l(ce,{title:"Created Order",rows:N.value,columns:b.value,"row-key":"name",loading:n.value,dense:"",pagination:{rowsPerPage:20},class:"my-sticky-header-column-table"},{"top-right":a(()=>[l(Y,{outlined:"",modelValue:O.value,"onUpdate:modelValue":r[0]||(r[0]=o=>O.value=o),options:b.value,label:"Search Columns","option-value":"name","option-label":"label","emit-value":"",dense:"","map-options":""},null,8,["modelValue","options"]),l(M,{borderless:"",dense:"",modelValue:y.value,"onUpdate:modelValue":[r[1]||(r[1]=o=>y.value=o),r[2]||(r[2]=o=>t.dataQuo())],placeholder:"Search",outlined:"",debounce:"1000"},{append:a(()=>[l(ae,{name:"search"})]),_:1},8,["modelValue"])]),header:a(o=>[l(J,{props:o},{default:a(()=>[(c(!0),Q(E,null,x(o.cols,e=>(c(),C(Z,{key:e.name,props:o},{default:a(()=>[S(H(e.label),1)]),_:2},1032,["props"]))),128)),l(Z,{"auto-width":""},{default:a(()=>[S("Action")]),_:1})]),_:2},1032,["props"])]),body:a(o=>[l(J,{props:o},{default:a(()=>[(c(!0),Q(E,null,x(o.cols,e=>(c(),C(X,{key:e.name,props:o},{default:a(()=>[e.name==="STAT"?(c(),C(_e,{key:0,clickable:"",color:e.value.color,"text-color":"white",icon:e.value.icon},{default:a(()=>[S(H(e.value.label),1)]),_:2},1032,["color","icon"])):(c(),Q("span",We,H(e.value),1))]),_:2},1032,["props"]))),128)),l(X,{"auto-width":""},{default:a(()=>[o.row.detail.filter(e=>e.TSRVD_FLGSTS>0).length===0?(c(),C(v,{key:0,flat:"",color:"orange",icon:"edit",onClick:e=>$(o.row),dense:""},{default:a(()=>[l(I,null,{default:a(()=>[S("Edit this Order")]),_:1})]),_:2},1032,["onClick"])):k("",!0),o.row.detail.filter(e=>e.TSRVD_FLGSTS>0).length===o.row.detail.length?(c(),C(v,{key:1,flat:"",color:"indigo",icon:"print",onClick:e=>m(o.row.SRVH_DOCNO),dense:""},{default:a(()=>[l(I,null,{default:a(()=>[S("Print this order")]),_:1})]),_:2},1032,["onClick"])):k("",!0),o.row.detail.filter(e=>e.TSRVD_FLGSTS>0).length===0?(c(),C(v,{key:2,flat:"",color:"red",icon:"delete",onClick:e=>T(o.row.SRVH_DOCNO),dense:""},{default:a(()=>[l(I,null,{default:a(()=>[S(H(o.row.detail.filter(e=>e.TSRVD_FLGSTS>0).length>0?"Cannot delete processed order":"Delete this Order"),1)]),_:2},1024)]),_:2},1032,["onClick"])):k("",!0),o.row.detail.filter(e=>e.TSRVD_FLGSTS>0).length>0?(c(),C(v,{key:3,flat:"",color:"cyan",icon:"visibility",onClick:e=>D(o.row),dense:""},{default:a(()=>[l(I,null,{default:a(()=>[S("View this Order")]),_:1})]),_:2},1032,["onClick"])):k("",!0),o.row.detail.filter(e=>e.TSRVD_FLGSTS===1).length===o.row.detail.length?(c(),C(v,{key:4,flat:"",color:"indigo",icon:"check",onClick:e=>A(o.row.SRVH_DOCNO),dense:""},{default:a(()=>[l(I,null,{default:a(()=>[S(H(o.row.detail.filter(e=>e.TSRVD_FLGSTS>0).length!==o.row.detail.length?"Please wait until all item checked":"Proceed all item to service"),1)]),_:2},1024)]),_:2},1032,["onClick"])):k("",!0)]),_:2},1024)]),_:2},1032,["props"])]),_:1},8,["rows","columns","loading"])])])]))}};export{nl as default};
