import{Q as S}from"./QTooltip.68594dc6.js";import{s as m,B as c,C as L,D as l,E as e,L as q,M as b,I as t,Z as T,am as Q,T as V,Q as f,X as I,Y as N,o as $,P as g,aX as E,H as u,R as w,S as U,O as v}from"./index.9553b905.js";import{a as R,u as B,k as x,l as H,m as h}from"./QTable.ae68308e.js";import{Q as k,a as P}from"./QTd.6d84ab18.js";import{api_web as j}from"./axios.4f162a3d.js";import{Q as y,a as M,C as A}from"./ClosePopup.1ad5f769.js";import"./use-cache.b0833c75.js";import"./date.92051e8d.js";const X=t("div",{class:"text-h6"}," RO Maintenance ",-1),F={style:{border:"1px black solid","border-radius":"10px"}},K=t("legend",{style:{"margin-left":"1em",padding:"0.2em 0.8em"}},[t("b",null,"Header")],-1),Z={class:"row"},z={class:"col"},G={class:"col q-pl-md"},J={class:"row items-center justify-end"},W={class:"col q-pl-md"},ee={class:"row items-center justify-end"},le={__name:"salesOrderCreate",setup(Y){R();const n=m({TSLO_SLOCD:"",TSLO_ISSUDT:"",TSLO_PLAN_DLVDT:""}),{dialogRef:D,onDialogHide:p,onDialogOK:O,onDialogCancel:C}=B();return(d,o)=>(c(),L(N,{ref_key:"dialogRef",ref:D,onHide:I(p),"transition-show":"slide-up","transition-hide":"slide-down","full-width":""},{default:l(()=>[e(q,{class:"q-dialog-plugin bg-white q-pa-sm"},{default:l(()=>[e(b,null,{default:l(()=>[X]),_:1}),e(b,{class:"q-pa-sm"},{default:l(()=>[t("fieldset",F,[K,t("div",Z,[t("div",z,[e(T,{label:"RO Code",dense:"",filled:"",modelValue:n.value.TSLO_SLOCD,"onUpdate:modelValue":o[0]||(o[0]=s=>n.value.TSLO_SLOCD=s),disable:"",loading:d.loading},null,8,["modelValue","loading"])]),t("div",G,[e(T,{filled:"",modelValue:n.value.TSLO_ISSUDT,"onUpdate:modelValue":o[2]||(o[2]=s=>n.value.TSLO_ISSUDT=s),dense:"",label:"Issue Date",loading:d.loading,onClick:o[3]||(o[3]=s=>d.quotationIssueDate.qDateProxy.show()),mask:"####-##-##","fill-mask":"",hint:"Mask: YYYY-MM-DD"},{append:l(()=>[e(Q,{name:"event",class:"cursor-pointer"},{default:l(()=>[e(y,{cover:"","transition-show":"scale","transition-hide":"scale"},{default:l(()=>[e(M,{modelValue:n.value.TSLO_ISSUDT,"onUpdate:modelValue":o[1]||(o[1]=s=>n.value.TSLO_ISSUDT=s),mask:"YYYY-MM-DD"},{default:l(()=>[t("div",J,[V(e(f,{label:"Close",color:"primary",flat:""},null,512),[[A]])])]),_:1},8,["modelValue"])]),_:1})]),_:1})]),_:1},8,["modelValue","loading"])]),t("div",W,[e(T,{filled:"",modelValue:n.value.TSLO_PLAN_DLVDT,"onUpdate:modelValue":o[5]||(o[5]=s=>n.value.TSLO_PLAN_DLVDT=s),dense:"",label:"Issue Date",loading:d.loading,onClick:o[6]||(o[6]=s=>d.quotationIssueDate.qDateProxy.show()),mask:"####-##-##","fill-mask":"",hint:"Mask: YYYY-MM-DD"},{append:l(()=>[e(Q,{name:"event",class:"cursor-pointer"},{default:l(()=>[e(y,{cover:"","transition-show":"scale","transition-hide":"scale"},{default:l(()=>[e(M,{modelValue:n.value.TSLO_PLAN_DLVDT,"onUpdate:modelValue":o[4]||(o[4]=s=>n.value.TSLO_PLAN_DLVDT=s),mask:"YYYY-MM-DD"},{default:l(()=>[t("div",ee,[V(e(f,{label:"Close",color:"primary",flat:""},null,512),[[A]])])]),_:1},8,["modelValue"])]),_:1})]),_:1})]),_:1},8,["modelValue","loading"])])])])]),_:1})]),_:1})]),_:1},8,["onHide"]))}};const ae={class:"q-pa-md"},oe={class:"row q-pb-md"},te=t("div",{class:"col"},[t("span",{class:"text-h4"},"Sales Order / Receive Order")],-1),se={class:"col text-right"},ne={class:"row q-pt-md"},de={class:"col"},pe={__name:"salesOrderView",setup(Y){const n=R(),D=m("TQUO_QUOCD"),p=m(""),O=m([]),C=m([{name:"TSLO_SLOCD",label:"RO. Code",field:"TSLO_SLOCD",sortable:!0,align:"left"},{name:"MCUS_CUSNM",label:"Customer Name",field:"MCUS_CUSNM",sortable:!0,align:"left"},{name:"TSLO_ADDRESS_NAME",label:"Customer Addr.",field:"TSLO_ADDRESS_NAME",sortable:!0,align:"left"},{name:"TSLO_CUSCD",label:"Customer Code",field:"TSLO_CUSCD",sortable:!0,align:"left"},{name:"TSLO_ISSUDT",label:"Issue Date",field:"TSLO_ISSUDT",sortable:!0,align:"left"},{name:"TSLO_QUOCD",label:"Quot. Code",field:"TSLO_QUOCD",sortable:!0,align:"left"}]),d=m(!1);$(()=>{o()});const o=async()=>{d.value=!0,await j.post("receive-order/searchAPI",{searchBy:D.value,searchValue:p.value}).then(i=>{d.value=!1,O.value=i.data.data}).catch(i=>{d.value=!1})},s=()=>{n.dialog({component:le}).onOk(async i=>{o()})};return(i,_)=>(c(),g("div",ae,[t("div",oe,[te,t("div",se,[e(f,{icon:"add",color:"blue",onClick:s},{default:l(()=>[e(S,null,{default:l(()=>[u("Create New RO")]),_:1})]),_:1})])]),e(E),t("div",ne,[t("div",de,[e(x,{title:"Created RO",rows:O.value,columns:C.value,"row-key":"name",loading:d.value,dense:"",pagination:{rowsPerPage:20},class:"my-sticky-header-column-table"},{"top-right":l(()=>[e(H,{outlined:"",modelValue:D.value,"onUpdate:modelValue":_[0]||(_[0]=a=>D.value=a),options:C.value,label:"Search Columns","option-value":"name","option-label":"label","emit-value":"",dense:"","map-options":""},null,8,["modelValue","options"]),e(T,{borderless:"",dense:"",modelValue:p.value,"onUpdate:modelValue":[_[1]||(_[1]=a=>p.value=a),_[2]||(_[2]=a=>i.dataQuo())],placeholder:"Search",outlined:"",debounce:"1000"},{append:l(()=>[e(Q,{name:"search"})]),_:1},8,["modelValue"])]),header:l(a=>[e(k,{props:a},{default:l(()=>[e(h,{"auto-width":""},{default:l(()=>[u("Action")]),_:1}),(c(!0),g(w,null,U(a.cols,r=>(c(),L(h,{key:r.name,props:a},{default:l(()=>[u(v(r.label),1)]),_:2},1032,["props"]))),128))]),_:2},1032,["props"])]),body:l(a=>[e(k,{props:a},{default:l(()=>[e(P,{"auto-width":""},{default:l(()=>[e(f,{flat:"",color:a.row.TQUO_APPRVDT!==null?"grey":"orange",icon:"edit",onClick:r=>i.onClickEdit(a.row.TQUO_QUOCD),dense:"",disable:a.row.TQUO_APPRVDT!==null},{default:l(()=>[e(S,null,{default:l(()=>[u(v(a.row.TQUO_APPRVDT?"Quotation already approved, cannot edit !":"Edit this quotation"),1)]),_:2},1024)]),_:2},1032,["color","onClick","disable"]),e(f,{flat:"",color:a.row.TQUO_APPRVDT!==null?"grey":"red",icon:"delete",onClick:r=>i.onClickDelete(a.row.TQUO_QUOCD),dense:"",disable:a.row.TQUO_APPRVDT!==null},{default:l(()=>[e(S,null,{default:l(()=>[u(v(a.row.TQUO_APPRVDT?"Quotation already approved, cannot delete !":"Delete this quotation"),1)]),_:2},1024)]),_:2},1032,["color","onClick","disable"]),e(f,{flat:"",color:"indigo",icon:"print",onClick:r=>i.onClickPrint(a.row.TQUO_QUOCD),dense:""},{default:l(()=>[e(S,null,{default:l(()=>[u("Print this quotation")]),_:1})]),_:2},1032,["onClick"])]),_:2},1024),(c(!0),g(w,null,U(a.cols,r=>(c(),L(P,{key:r.name,props:a},{default:l(()=>[u(v(r.value),1)]),_:2},1032,["props"]))),128))]),_:2},1032,["props"])]),_:1},8,["rows","columns","loading"])])])]))}};export{pe as default};
