import{Q as O}from"./QTooltip.df1240e7.js";import{s as c,B as m,C as g,D as a,E as e,J as W,K as N,I as t,P as y,aa as B,aW as U,Q as f,R as Q,aU as R,aV as T,aZ as X,H as p,aX as H,ap as Z,L as z,M as $,O as G,o as ee,S as ae}from"./index.b15e7673.js";import{u as le,b as L,Q as te,j as q,k as w,l as P,c as E,a as oe,m as x}from"./use-dialog-plugin-component.28caba0b.js";import{Q as Y,a as A}from"./date.4596781b.js";import{api_web as M}from"./axios.477437c4.js";import{Q as se,a as ne,C as ie}from"./ClosePopup.19ff9ac9.js";const de=t("div",{class:"text-h6"},"Create Order",-1),ue={style:{border:"1px black solid","border-radius":"10px"}},re=t("legend",{style:{"margin-left":"1em",padding:"0.2em 0.8em"}},[t("b",null,"Header")],-1),ce={class:"row"},me={class:"col"},_e={class:"col q-pl-md"},pe={class:"row items-center justify-end"},fe={class:"row"},ve={class:"col"},Ce={style:{border:"1px black solid","border-radius":"10px",height:"35vh",overflow:"auto"}},be=t("legend",{style:{"margin-left":"1em",padding:"0.2em 0.8em"}},[t("b",null,"Detail Items")],-1),Ve={class:"row"},ge={class:"col text-right"},he={__name:"serviceCreateOrder",setup(K){const{dialogRef:I,onDialogHide:V,onDialogOK:h,onDialogCancel:S}=le(),D=L(),n=c({SRVH_DOCNO:"",SRVH_ISSDT:"",SRVH_CUSCD:""}),v=c([]),C=c([]),d=c(!1),u=(i,l,s,b)=>{l(async()=>{b==="cust"&&await _(i),b==="item"&&await o(i)})},_=async i=>{d.value=!0,await M.post("customer/searchAPI",{searchValue:i}).then(l=>{d.value=!1,listCustomers.value=l.data.data}).catch(()=>{d.value=!1})},o=async i=>{d.value=!0,await M.post("item/searchAPI",{searchValue:i}).then(l=>{d.value=!1,v.value=l.data.data}).catch(()=>{d.value=!1})},r=()=>{C.value.push({TSRVD_ITMCD:"",TSRVD_LINE:C.value.length+1})},j=i=>{D.dialog({title:"Confirmation",message:`Do you want to delete this lines no ${i+1} ?`,cancel:!0,persistent:!0}).onOk(async()=>{C.value.splice(i,1)})};return(i,l)=>(m(),g(G,{ref_key:"dialogRef",ref:I,onHide:$(V),"transition-show":"slide-up","transition-hide":"slide-down","full-width":"",persistent:""},{default:a(()=>[e(W,{class:"q-dialog-plugin bg-white q-pa-sm"},{default:a(()=>[e(N,null,{default:a(()=>[de]),_:1}),e(N,{class:"q-pa-sm"},{default:a(()=>[t("fieldset",ue,[re,t("div",ce,[t("div",me,[e(y,{label:"SPK No",readonly:"",dense:"",modelValue:n.value.SRVH_DOCNO,"onUpdate:modelValue":l[0]||(l[0]=s=>n.value.SRVH_DOCNO=s),filled:""},null,8,["modelValue"])]),t("div",_e,[e(y,{filled:"",modelValue:n.value.SRVH_ISSDT,"onUpdate:modelValue":l[2]||(l[2]=s=>n.value.SRVH_ISSDT=s),dense:"",label:"Issue Date",loading:d.value,onClick:l[3]||(l[3]=s=>i.quotationIssueDate.qDateProxy.show()),mask:"####-##-##","fill-mask":"",hint:"Mask: YYYY-MM-DD"},{append:a(()=>[e(B,{name:"event",class:"cursor-pointer"},{default:a(()=>[e(se,{cover:"","transition-show":"scale","transition-hide":"scale"},{default:a(()=>[e(ne,{modelValue:n.value.SRVH_ISSDT,"onUpdate:modelValue":l[1]||(l[1]=s=>n.value.SRVH_ISSDT=s),mask:"YYYY-MM-DD"},{default:a(()=>[t("div",pe,[U(e(f,{label:"Close",color:"primary",flat:""},null,512),[[ie]])])]),_:1},8,["modelValue"])]),_:1})]),_:1})]),_:1},8,["modelValue","loading"])])]),t("div",fe,[t("div",ve,[e(y,{label:"Customer Choose",dense:"",modelValue:n.value.SRVH_CUSCD,"onUpdate:modelValue":l[4]||(l[4]=s=>n.value.SRVH_CUSCD=s),filled:""},null,8,["modelValue"])])])]),t("fieldset",Ce,[be,t("div",Ve,[t("div",ge,[e(f,{flat:"",icon:"add",color:"blue",onClick:l[5]||(l[5]=s=>r())})])]),e(te,{bordered:"",dense:""},{default:a(()=>[v.value.length>0?(m(!0),Q(R,{key:0},T(C.value,(s,b)=>(m(),g(q,{key:b,class:"q-my-sm",dense:""},{default:a(()=>[e(w,{avatar:""},{default:a(()=>[e(X,{"text-color":"blue"},{default:a(()=>[p(H(b+1),1)]),_:2},1024)]),_:2},1024),e(w,null,{default:a(()=>[e(P,null,{default:a(()=>[e(E,{dense:"",filled:"",label:"Item Name",modelValue:s.TSRVD_ITMCD,"onUpdate:modelValue":k=>s.TSRVD_ITMCD=k,"use-input":"","input-debounce":"500",options:v.value,onFilter:l[6]||(l[6]=(k,F,J)=>u(k,F,J,"item")),behavior:"dialog","option-label":"MITM_ITMNM","option-value":"MITM_ITMNM","emit-value":"","map-options":"",loading:d.value},null,8,["modelValue","onUpdate:modelValue","options","loading"])]),_:2},1024)]),_:2},1024),e(w,{side:""},{default:a(()=>[e(f,{icon:"delete",color:"red",flat:"",onClick:k=>j(b)},null,8,["onClick"])]),_:2},1024)]),_:2},1024))),128)):U((m(),g(q,{key:1,class:"q-my-sm",clickable:""},{default:a(()=>[e(w,null,{default:a(()=>[e(P,null,{default:a(()=>[p(" No Items Added ")]),_:1})]),_:1})]),_:1})),[[Z]])]),_:1})])]),_:1}),e(z,{align:"right"},{default:a(()=>[e(f,{label:"OK",color:"primary",onClick:l[7]||(l[7]=s=>i.onSubmitData()),disable:i.stateSubmit},null,8,["disable"]),e(f,{flat:"",label:"Cancel",color:"red",onClick:$(S)},null,8,["onClick"])]),_:1})]),_:1})]),_:1},8,["onHide"]))}};const Se={class:"q-pa-md"},De={class:"row q-pb-md"},ke=t("div",{class:"col"},[t("span",{class:"text-h4"},"Receive Order ")],-1),we={class:"col text-right"},ye={class:"row q-pt-md"},Qe={class:"col"},Ne={__name:"serviceView",setup(K){const I=L(),V=c("SRVH_DOCNO"),h=c(""),S=c([]),D=c([{name:"SRVH_DOCNO",label:"SPK No",field:"SRVH_DOCNO",sortable:!0,align:"left"},{name:"SRVH_CUSCD",label:"Cust",field:"SRVH_CUSCD",sortable:!0,align:"left"},{name:"created_at",label:"Created Date",field:"created_at",sortable:!0,align:"left"}]),n=c(!1);ee(()=>{v()});const v=async()=>{n.value=!0,await M.post("service/search",{searchBy:V.value,searchValue:h.value}).then(u=>{n.value=!1,S.value=u.data.data}).catch(u=>{n.value=!1})},C=()=>{I.dialog({component:he}).onOk(async u=>{v()})},d=u=>{window.open("https://joss.jatpowerindo.co.id/PDF/quotation/"+btoa(u),"_blank").focus()};return(u,_)=>(m(),Q("div",Se,[t("div",De,[ke,t("div",we,[e(f,{icon:"add",color:"blue",onClick:C},{default:a(()=>[e(O,null,{default:a(()=>[p("Create New Order")]),_:1})]),_:1})])]),e(ae),t("div",ye,[t("div",Qe,[e(oe,{title:"Created Order",rows:S.value,columns:D.value,"row-key":"name",loading:n.value,dense:"",pagination:{rowsPerPage:20},class:"my-sticky-header-column-table"},{"top-right":a(()=>[e(E,{outlined:"",modelValue:V.value,"onUpdate:modelValue":_[0]||(_[0]=o=>V.value=o),options:D.value,label:"Search Columns","option-value":"name","option-label":"label","emit-value":"",dense:"","map-options":""},null,8,["modelValue","options"]),e(y,{borderless:"",dense:"",modelValue:h.value,"onUpdate:modelValue":[_[1]||(_[1]=o=>h.value=o),_[2]||(_[2]=o=>u.dataQuo())],placeholder:"Search",outlined:"",debounce:"1000"},{append:a(()=>[e(B,{name:"search"})]),_:1},8,["modelValue"])]),header:a(o=>[e(Y,{props:o},{default:a(()=>[(m(!0),Q(R,null,T(o.cols,r=>(m(),g(x,{key:r.name,props:o},{default:a(()=>[p(H(r.label),1)]),_:2},1032,["props"]))),128)),e(x,{"auto-width":""},{default:a(()=>[p("Action")]),_:1})]),_:2},1032,["props"])]),body:a(o=>[e(Y,{props:o},{default:a(()=>[(m(!0),Q(R,null,T(o.cols,r=>(m(),g(A,{key:r.name,props:o},{default:a(()=>[p(H(r.value),1)]),_:2},1032,["props"]))),128)),e(A,{"auto-width":""},{default:a(()=>[e(f,{flat:"",color:"orange",icon:"edit",onClick:r=>u.onClickEdit(o.row.TQUO_QUOCD),dense:""},{default:a(()=>[e(O,null,{default:a(()=>[p("Edit this quotation")]),_:1})]),_:2},1032,["onClick"]),e(f,{flat:"",color:"indigo",icon:"print",onClick:r=>d(o.row.TQUO_QUOCD),dense:""},{default:a(()=>[e(O,null,{default:a(()=>[p("Print this order")]),_:1})]),_:2},1032,["onClick"])]),_:2},1024)]),_:2},1032,["props"])]),_:1},8,["rows","columns","loading"])])])]))}};export{Ne as default};
