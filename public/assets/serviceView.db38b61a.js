import{Q as g}from"./QTooltip.3d8e11b8.js";import{s as p,B as v,C as S,D as l,E as e,J as L,K as O,I as a,P as c,L as Y,Q as m,M as $,O as j,aa as F,aW as P,H as _,R as y,aU as R,aV as U,aZ as ee,aX as q,ap as le,o as ae,S as te}from"./index.eff67b29.js";import{u as J,b as N,Q as oe,j as A,k,l as E,c as W,a as se,m as B}from"./use-dialog-plugin-component.a42ca2df.js";import{Q as x,a as K}from"./date.f1f09dc7.js";import{api_web as Q}from"./axios.3e4a53ba.js";import{Q as ne,a as de,C as ie}from"./ClosePopup.2ab967a1.js";const ue=a("div",{class:"text-h6"},"Create Item Master",-1),re={class:"row"},ce={class:"col"},me={class:"col q-pl-md"},_e={class:"row q-pt-md"},pe={class:"col"},ve={class:"col q-pl-md"},fe={class:"row q-pt-md"},Me={class:"col"},Ce={class:"col q-pl-md"},Ve={class:"row q-pt-md"},Ie={class:"col"},De={__name:"itemCreate",setup(H){const{dialogRef:h,onDialogHide:C,onDialogOK:b,onDialogCancel:T}=J(),V=N(),t=p({MITM_ITMCD:"",MITM_ITMNM:"",MITM_STKUOM:"",MITM_ITMTYPE:1,MITM_BRAND:"",MITM_MODEL:"",MITM_SPEC:"",MITM_ITMCAT:"",MITM_COACD:""});p(!1);const I=()=>{V.dialog({title:"Confirmation",message:"Do you want to save this item ?",cancel:!0,persistent:!0}).onOk(async()=>{await Q.post("item",t.value).then(r=>{b(r.data.data.value)})})};return(r,o)=>(v(),S(j,{ref_key:"dialogRef",ref:h,onHide:$(C),"transition-show":"slide-up","transition-hide":"slide-down","full-width":"",persistent:""},{default:l(()=>[e(L,{class:"q-dialog-plugin bg-white q-pa-sm"},{default:l(()=>[e(O,null,{default:l(()=>[ue]),_:1}),e(O,{class:"q-pa-sm"},{default:l(()=>[a("div",re,[a("div",ce,[e(c,{label:"Item Code",readonly:"",dense:"",modelValue:t.value.MITM_ITMCD,"onUpdate:modelValue":o[0]||(o[0]=s=>t.value.MITM_ITMCD=s),filled:""},null,8,["modelValue"])]),a("div",me,[e(c,{label:"Item Name",dense:"",modelValue:t.value.MITM_ITMNM,"onUpdate:modelValue":o[1]||(o[1]=s=>t.value.MITM_ITMNM=s),filled:""},null,8,["modelValue"])])]),a("div",_e,[a("div",pe,[e(c,{label:"UOM",readonly:"",dense:"",modelValue:t.value.MITM_STKUOM,"onUpdate:modelValue":o[2]||(o[2]=s=>t.value.MITM_STKUOM=s),filled:""},null,8,["modelValue"])]),a("div",ve,[e(c,{label:"Item Brand",dense:"",modelValue:t.value.MITM_BRAND,"onUpdate:modelValue":o[3]||(o[3]=s=>t.value.MITM_BRAND=s),filled:""},null,8,["modelValue"])])]),a("div",fe,[a("div",Me,[e(c,{label:"Item Model",readonly:"",dense:"",modelValue:t.value.MITM_MODEL,"onUpdate:modelValue":o[4]||(o[4]=s=>t.value.MITM_MODEL=s),filled:""},null,8,["modelValue"])]),a("div",Ce,[e(c,{label:"Item Specification",dense:"",modelValue:t.value.MITM_SPEC,"onUpdate:modelValue":o[5]||(o[5]=s=>t.value.MITM_SPEC=s),filled:""},null,8,["modelValue"])])]),a("div",Ve,[a("div",Ie,[e(c,{label:"COA",readonly:"",dense:"",modelValue:t.value.MITM_COACD,"onUpdate:modelValue":o[6]||(o[6]=s=>t.value.MITM_COACD=s),filled:""},null,8,["modelValue"])])])]),_:1}),e(Y,{align:"right"},{default:l(()=>[e(m,{label:"OK",color:"primary",onClick:o[7]||(o[7]=s=>I())}),e(m,{flat:"",label:"Cancel",color:"red",onClick:$(T)},null,8,["onClick"])]),_:1})]),_:1})]),_:1},8,["onHide"]))}},be=a("div",{class:"text-h6"},"Create Order",-1),Te={style:{border:"1px black solid","border-radius":"10px"}},ge=a("legend",{style:{"margin-left":"1em",padding:"0.2em 0.8em"}},[a("b",null,"Header")],-1),Se={class:"row"},he={class:"col"},we={class:"col q-pl-md"},ke={class:"row items-center justify-end"},ye={class:"row"},Oe={class:"col"},$e={style:{border:"1px black solid","border-radius":"10px",height:"35vh",overflow:"auto"}},Qe=a("legend",{style:{"margin-left":"1em",padding:"0.2em 0.8em"}},[a("b",null,"Detail Items")],-1),Re={class:"row q-pb-sm"},Ue={class:"col text-right"},qe={__name:"serviceCreateOrder",setup(H){const{dialogRef:h,onDialogHide:C,onDialogOK:b,onDialogCancel:T}=J(),V=N(),t=p({SRVH_DOCNO:"",SRVH_ISSDT:"",SRVH_CUSCD:""}),I=p([]),r=p([]),o=p(!1),s=(i,n,u,D)=>{n(async()=>{D==="cust"&&await M(i),D==="item"&&await d(i)})},M=async i=>{o.value=!0,await Q.post("customer/searchAPI",{searchValue:i}).then(n=>{o.value=!1,listCustomers.value=n.data.data}).catch(()=>{o.value=!1})},d=async i=>{o.value=!0,await Q.post("item/searchAPI",{searchValue:i}).then(n=>{o.value=!1,I.value=n.data.data}).catch(()=>{o.value=!1})},f=()=>{r.value.push({TSRVD_ITMCD:"",TSRVD_LINE:r.value.length+1})},X=i=>{V.dialog({title:"Confirmation",message:`Do you want to delete this lines no ${i+1} ?`,cancel:!0,persistent:!0}).onOk(async()=>{r.value.splice(i,1)})},Z=i=>{V.dialog({component:De}).onOk(async n=>{r.value[i].TSRVD_ITMCD=n.MITM_ITMNM})};return(i,n)=>(v(),S(j,{ref_key:"dialogRef",ref:h,onHide:$(C),"transition-show":"slide-up","transition-hide":"slide-down","full-width":"",persistent:""},{default:l(()=>[e(L,{class:"q-dialog-plugin bg-white q-pa-sm"},{default:l(()=>[e(O,null,{default:l(()=>[be]),_:1}),e(O,{class:"q-pa-sm"},{default:l(()=>[a("fieldset",Te,[ge,a("div",Se,[a("div",he,[e(c,{label:"SPK No",readonly:"",dense:"",modelValue:t.value.SRVH_DOCNO,"onUpdate:modelValue":n[0]||(n[0]=u=>t.value.SRVH_DOCNO=u),filled:""},null,8,["modelValue"])]),a("div",we,[e(c,{filled:"",modelValue:t.value.SRVH_ISSDT,"onUpdate:modelValue":n[2]||(n[2]=u=>t.value.SRVH_ISSDT=u),dense:"",label:"Issue Date",loading:o.value,onClick:n[3]||(n[3]=u=>i.quotationIssueDate.qDateProxy.show()),mask:"####-##-##","fill-mask":"",hint:"Mask: YYYY-MM-DD"},{append:l(()=>[e(F,{name:"event",class:"cursor-pointer"},{default:l(()=>[e(ne,{cover:"","transition-show":"scale","transition-hide":"scale"},{default:l(()=>[e(de,{modelValue:t.value.SRVH_ISSDT,"onUpdate:modelValue":n[1]||(n[1]=u=>t.value.SRVH_ISSDT=u),mask:"YYYY-MM-DD"},{default:l(()=>[a("div",ke,[P(e(m,{label:"Close",color:"primary",flat:""},null,512),[[ie]])])]),_:1},8,["modelValue"])]),_:1})]),_:1})]),_:1},8,["modelValue","loading"])])]),a("div",ye,[a("div",Oe,[e(c,{label:"Customer Choose",dense:"",modelValue:t.value.SRVH_CUSCD,"onUpdate:modelValue":n[4]||(n[4]=u=>t.value.SRVH_CUSCD=u),filled:""},null,8,["modelValue"])])])]),a("fieldset",$e,[Qe,a("div",Re,[a("div",Ue,[e(m,{flat:"",icon:"add",color:"blue",onClick:n[5]||(n[5]=u=>f())},{default:l(()=>[e(g,null,{default:l(()=>[_("Add lines")]),_:1})]),_:1})])]),e(oe,{bordered:"",dense:""},{default:l(()=>[r.value.length>0?(v(!0),y(R,{key:0},U(r.value,(u,D)=>(v(),S(A,{key:D,class:"q-my-sm",dense:""},{default:l(()=>[e(k,{avatar:""},{default:l(()=>[e(ee,{"text-color":"blue"},{default:l(()=>[_(q(D+1),1)]),_:2},1024)]),_:2},1024),e(k,null,{default:l(()=>[e(E,null,{default:l(()=>[e(W,{dense:"",filled:"",label:"Item Name",modelValue:u.TSRVD_ITMCD,"onUpdate:modelValue":w=>u.TSRVD_ITMCD=w,"use-input":"","input-debounce":"500",options:I.value,onFilter:n[6]||(n[6]=(w,z,G)=>s(w,z,G,"item")),behavior:"dialog","option-label":"MITM_ITMNM","option-value":"MITM_ITMNM","emit-value":"","map-options":"",loading:o.value},null,8,["modelValue","onUpdate:modelValue","options","loading"])]),_:2},1024)]),_:2},1024),e(k,{side:""},{default:l(()=>[e(m,{icon:"delete",color:"red",flat:"",onClick:w=>X(D)},{default:l(()=>[e(g,null,{default:l(()=>[_("Delete line")]),_:1})]),_:2},1032,["onClick"])]),_:2},1024),e(k,{side:""},{default:l(()=>[e(m,{icon:"library_add",color:"indigo",flat:"",onClick:w=>Z(D)},{default:l(()=>[e(g,null,{default:l(()=>[_("Add new item")]),_:1})]),_:2},1032,["onClick"])]),_:2},1024)]),_:2},1024))),128)):P((v(),S(A,{key:1,class:"q-my-sm",clickable:""},{default:l(()=>[e(k,null,{default:l(()=>[e(E,null,{default:l(()=>[_(" No Items Added ")]),_:1})]),_:1})]),_:1})),[[le]])]),_:1})])]),_:1}),e(Y,{align:"right"},{default:l(()=>[e(m,{label:"OK",color:"primary",onClick:n[7]||(n[7]=u=>i.onSubmitData()),disable:i.stateSubmit},null,8,["disable"]),e(m,{flat:"",label:"Cancel",color:"red",onClick:$(T)},null,8,["onClick"])]),_:1})]),_:1})]),_:1},8,["onHide"]))}};const Ne={class:"q-pa-md"},He={class:"row q-pb-md"},Pe=a("div",{class:"col"},[a("span",{class:"text-h4"},"Receive Order ")],-1),Ae={class:"col text-right"},Ee={class:"row q-pt-md"},Be={class:"col"},Je={__name:"serviceView",setup(H){const h=N(),C=p("SRVH_DOCNO"),b=p(""),T=p([]),V=p([{name:"SRVH_DOCNO",label:"SPK No",field:"SRVH_DOCNO",sortable:!0,align:"left"},{name:"SRVH_CUSCD",label:"Cust",field:"SRVH_CUSCD",sortable:!0,align:"left"},{name:"created_at",label:"Created Date",field:"created_at",sortable:!0,align:"left"}]),t=p(!1);ae(()=>{I()});const I=async()=>{t.value=!0,await Q.post("service/search",{searchBy:C.value,searchValue:b.value}).then(s=>{t.value=!1,T.value=s.data.data}).catch(s=>{t.value=!1})},r=()=>{h.dialog({component:qe}).onOk(async s=>{I()})},o=s=>{window.open("https://joss.jatpowerindo.co.id/PDF/quotation/"+btoa(s),"_blank").focus()};return(s,M)=>(v(),y("div",Ne,[a("div",He,[Pe,a("div",Ae,[e(m,{icon:"add",color:"blue",onClick:r},{default:l(()=>[e(g,null,{default:l(()=>[_("Create New Order")]),_:1})]),_:1})])]),e(te),a("div",Ee,[a("div",Be,[e(se,{title:"Created Order",rows:T.value,columns:V.value,"row-key":"name",loading:t.value,dense:"",pagination:{rowsPerPage:20},class:"my-sticky-header-column-table"},{"top-right":l(()=>[e(W,{outlined:"",modelValue:C.value,"onUpdate:modelValue":M[0]||(M[0]=d=>C.value=d),options:V.value,label:"Search Columns","option-value":"name","option-label":"label","emit-value":"",dense:"","map-options":""},null,8,["modelValue","options"]),e(c,{borderless:"",dense:"",modelValue:b.value,"onUpdate:modelValue":[M[1]||(M[1]=d=>b.value=d),M[2]||(M[2]=d=>s.dataQuo())],placeholder:"Search",outlined:"",debounce:"1000"},{append:l(()=>[e(F,{name:"search"})]),_:1},8,["modelValue"])]),header:l(d=>[e(x,{props:d},{default:l(()=>[(v(!0),y(R,null,U(d.cols,f=>(v(),S(B,{key:f.name,props:d},{default:l(()=>[_(q(f.label),1)]),_:2},1032,["props"]))),128)),e(B,{"auto-width":""},{default:l(()=>[_("Action")]),_:1})]),_:2},1032,["props"])]),body:l(d=>[e(x,{props:d},{default:l(()=>[(v(!0),y(R,null,U(d.cols,f=>(v(),S(K,{key:f.name,props:d},{default:l(()=>[_(q(f.value),1)]),_:2},1032,["props"]))),128)),e(K,{"auto-width":""},{default:l(()=>[e(m,{flat:"",color:"orange",icon:"edit",onClick:f=>s.onClickEdit(d.row.TQUO_QUOCD),dense:""},{default:l(()=>[e(g,null,{default:l(()=>[_("Edit this quotation")]),_:1})]),_:2},1032,["onClick"]),e(m,{flat:"",color:"indigo",icon:"print",onClick:f=>o(d.row.TQUO_QUOCD),dense:""},{default:l(()=>[e(g,null,{default:l(()=>[_("Print this order")]),_:1})]),_:2},1032,["onClick"])]),_:2},1024)]),_:2},1032,["props"])]),_:1},8,["rows","columns","loading"])])])]))}};export{Je as default};
