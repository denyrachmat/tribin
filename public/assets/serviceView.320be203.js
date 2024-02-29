import{Q as y}from"./QTooltip.ee96e849.js";import{s as c,o as x,B as V,C as U,D as l,E as e,J as z,K as Y,I as a,P as T,L as ee,Q as M,M as q,O as le,aa as ae,aW as F,H as C,R as H,aU as P,aV as E,aZ as ne,aX as K,ap as de,S as ie}from"./index.7d2b586c.js";import{u as te,b as B,c as Q,Q as ue,j,k as w,l as G,a as re,m as J}from"./use-dialog-plugin-component.67bcaf70.js";import{Q as W,a as X}from"./use-cache.c4164ba2.js";import{d as L}from"./date.4fc2c149.js";import{api_web as O}from"./axios.e41cf982.js";import{Q as me,a as ce,C as _e}from"./ClosePopup.3b987284.js";const pe=a("div",{class:"text-h6"},"Create Item Master",-1),ve={class:"row"},fe={class:"col"},Me={class:"col q-pl-md"},Ce={class:"row q-pt-md"},De={class:"col"},Ve={class:"col q-pl-md"},Te={class:"row q-pt-md"},Se={class:"col"},Ie={class:"col q-pl-md"},ge={class:"row q-pt-md"},be={class:"col"},he={__name:"itemCreate",props:{ItemCat:String},setup($){const{dialogRef:R,onDialogHide:b,onDialogOK:h,onDialogCancel:k}=te(),I=B(),n=c({MITM_ITMCD:"",MITM_ITMNM:"",MITM_STKUOM:"",MITM_ITMTYPE:1,MITM_BRAND:"",MITM_MODEL:"",MITM_SPEC:"",MITM_ITMCAT:"",MITM_COACD:"",MITM_ITMCAT:""}),m=c(!1),D=c([]),g=c([]),v=$;x(()=>{d(),n.value.MITM_ITMCAT=v.ItemCat});const t=(o,i,r,A)=>{i(async()=>{await O.post("item/getListCoasAPI",{search:o}).then(N=>{g.value=N.data})})},p=()=>{I.dialog({title:"Confirmation",message:"Do you want to save this item ?",cancel:!0,persistent:!0}).onOk(async()=>{await O.post("item",n.value).then(o=>{h(o.data.data.value)})})},d=async()=>{m.value=!0,await O.get("item/formAPI").then(o=>{m.value=!1,D.value=o.data.uoms,g.value=o.data.coas}).catch(()=>{m.value=!1})};return(o,i)=>(V(),U(le,{ref_key:"dialogRef",ref:R,onHide:q(b),"transition-show":"slide-up","transition-hide":"slide-down","full-width":"",persistent:""},{default:l(()=>[e(z,{class:"q-dialog-plugin bg-white q-pa-sm"},{default:l(()=>[e(Y,null,{default:l(()=>[pe]),_:1}),e(Y,{class:"q-pa-sm"},{default:l(()=>[a("div",ve,[a("div",fe,[e(T,{label:"Item Code",dense:"",modelValue:n.value.MITM_ITMCD,"onUpdate:modelValue":i[0]||(i[0]=r=>n.value.MITM_ITMCD=r),filled:""},null,8,["modelValue"])]),a("div",Me,[e(T,{label:"Item Name",dense:"",modelValue:n.value.MITM_ITMNM,"onUpdate:modelValue":i[1]||(i[1]=r=>n.value.MITM_ITMNM=r),filled:""},null,8,["modelValue"])])]),a("div",Ce,[a("div",De,[e(Q,{dense:"",filled:"",label:"UOM",modelValue:n.value.MITM_STKUOM,"onUpdate:modelValue":i[2]||(i[2]=r=>n.value.MITM_STKUOM=r),options:D.value,behavior:"dialog","option-label":"MUOM_UOMNM","option-value":"MUOM_UOMCD","emit-value":"","map-options":"",loading:m.value},null,8,["modelValue","options","loading"])]),a("div",Ve,[e(T,{label:"Item Brand",dense:"",modelValue:n.value.MITM_BRAND,"onUpdate:modelValue":i[3]||(i[3]=r=>n.value.MITM_BRAND=r),filled:""},null,8,["modelValue"])])]),a("div",Te,[a("div",Se,[e(T,{label:"Item Model",dense:"",modelValue:n.value.MITM_MODEL,"onUpdate:modelValue":i[4]||(i[4]=r=>n.value.MITM_MODEL=r),filled:""},null,8,["modelValue"])]),a("div",Ie,[e(T,{label:"Item Specification",dense:"",modelValue:n.value.MITM_SPEC,"onUpdate:modelValue":i[5]||(i[5]=r=>n.value.MITM_SPEC=r),filled:""},null,8,["modelValue"])])]),a("div",ge,[a("div",be,[e(Q,{dense:"",filled:"",label:"COA",modelValue:n.value.MITM_COACD,"onUpdate:modelValue":i[6]||(i[6]=r=>n.value.MITM_COACD=r),options:g.value,"use-input":"",behavior:"dialog","option-label":"MCOA_COANM","option-value":"MCOA_COACD",onFilter:i[7]||(i[7]=(r,A,N)=>t(r,A,N)),"emit-value":"","map-options":"",loading:m.value},null,8,["modelValue","options","loading"])])])]),_:1}),e(ee,{align:"right"},{default:l(()=>[e(M,{label:"OK",color:"primary",onClick:i[8]||(i[8]=r=>p())}),e(M,{flat:"",label:"Cancel",color:"red",onClick:q(k)},null,8,["onClick"])]),_:1})]),_:1})]),_:1},8,["onHide"]))}},we=a("div",{class:"text-h6"},"Create Order",-1),Oe={style:{border:"1px black solid","border-radius":"10px"}},Re=a("legend",{style:{"margin-left":"1em",padding:"0.2em 0.8em"}},[a("b",null,"Header")],-1),ke={class:"row"},ye={class:"col"},Ue={class:"col q-pl-md"},Ne={class:"row items-center justify-end"},Qe={class:"row"},$e={class:"col"},Ae={style:{border:"1px black solid","border-radius":"10px",height:"35vh",overflow:"auto"}},He=a("legend",{style:{"margin-left":"1em",padding:"0.2em 0.8em"}},[a("b",null,"Detail Items")],-1),Ye={class:"row q-pb-sm"},qe={class:"col text-right"},Z={__name:"serviceCreateOrder",props:{header:Array,detail:Array},setup($){const{dialogRef:R,onDialogHide:b,onDialogOK:h,onDialogCancel:k}=te(),I=B(),n=$;x(async()=>{n.header&&(await d(),await o(),m.value=n.header,v.value=n.detail)});const m=c({SRVH_DOCNO:"",SRVH_ISSDT:L.formatDate(Date.now(),"YYYY-MM-DD"),SRVH_CUSCD:""}),D=c([]),g=c([]),v=c([]),t=c(!1),p=(_,s,u,S)=>{s(async()=>{S==="cust"&&await d(_),S==="item"&&await o(_)})},d=async _=>{t.value=!0,await O.post("customer/searchAPI",{searchValue:_}).then(s=>{t.value=!1,g.value=s.data.data}).catch(()=>{t.value=!1})},o=async _=>{t.value=!0,await O.post("item/searchAPI",{searchValue:_}).then(s=>{t.value=!1,D.value=s.data.data}).catch(()=>{t.value=!1})},i=()=>{v.value.push({TSRVD_ITMCD:"",TSRVD_LINE:v.value.length+1,TSRVD_QTY:1,TSRVD_CUSTRMK:""})},r=_=>{I.dialog({title:"Confirmation",message:`Do you want to delete this lines no ${_+1} ?`,cancel:!0,persistent:!0}).onOk(async()=>{v.value.splice(_,1)})},A=_=>{I.dialog({component:he,componentProps:{ItemCat:"SERVICE_ITEMM"}}).onOk(async s=>{await o(""),v.value[_].TSRVD_ITMCD=s.MITM_ITMNM})},N=()=>{I.dialog({title:"Confirmation",message:"Do you want to submit this data ?",cancel:!0,persistent:!0}).onOk(async()=>{t.value=!0,await O.post("servicesAdmin",{header:m.value,detail:v.value}).then(_=>{t.value=!1,h()})})};return(_,s)=>(V(),U(le,{ref_key:"dialogRef",ref:R,onHide:q(b),"transition-show":"slide-up","transition-hide":"slide-down","full-width":"",persistent:""},{default:l(()=>[e(z,{class:"q-dialog-plugin bg-white q-pa-sm"},{default:l(()=>[e(Y,null,{default:l(()=>[we]),_:1}),e(Y,{class:"q-pa-sm"},{default:l(()=>[a("fieldset",Oe,[Re,a("div",ke,[a("div",ye,[e(T,{label:"SPK No",readonly:"",dense:"",modelValue:m.value.SRVH_DOCNO,"onUpdate:modelValue":s[0]||(s[0]=u=>m.value.SRVH_DOCNO=u),filled:""},null,8,["modelValue"])]),a("div",Ue,[e(T,{filled:"",modelValue:m.value.SRVH_ISSDT,"onUpdate:modelValue":s[2]||(s[2]=u=>m.value.SRVH_ISSDT=u),dense:"",label:"Issue Date",loading:t.value,onClick:s[3]||(s[3]=u=>_.quotationIssueDate.qDateProxy.show()),mask:"####-##-##","fill-mask":"",hint:"Mask: YYYY-MM-DD"},{append:l(()=>[e(ae,{name:"event",class:"cursor-pointer"},{default:l(()=>[e(me,{cover:"","transition-show":"scale","transition-hide":"scale"},{default:l(()=>[e(ce,{modelValue:m.value.SRVH_ISSDT,"onUpdate:modelValue":s[1]||(s[1]=u=>m.value.SRVH_ISSDT=u),mask:"YYYY-MM-DD"},{default:l(()=>[a("div",Ne,[F(e(M,{label:"Close",color:"primary",flat:""},null,512),[[_e]])])]),_:1},8,["modelValue"])]),_:1})]),_:1})]),_:1},8,["modelValue","loading"])])]),a("div",Qe,[a("div",$e,[e(Q,{dense:"",filled:"",label:"Customer Choose",modelValue:m.value.SRVH_CUSCD,"onUpdate:modelValue":s[4]||(s[4]=u=>m.value.SRVH_CUSCD=u),"use-input":"","input-debounce":"500",options:g.value,onFilter:s[5]||(s[5]=(u,S,f)=>p(u,S,f,"cust")),behavior:"dialog","option-label":"MCUS_CUSNM","option-value":"MCUS_CUSCD","emit-value":"","map-options":"",loading:t.value},null,8,["modelValue","options","loading"])])])]),a("fieldset",Ae,[He,a("div",Ye,[a("div",qe,[e(M,{flat:"",icon:"add",color:"blue",onClick:s[6]||(s[6]=u=>i())},{default:l(()=>[e(y,null,{default:l(()=>[C("Add lines")]),_:1})]),_:1})])]),e(ue,{bordered:"",dense:""},{default:l(()=>[v.value.length>0?(V(!0),H(P,{key:0},E(v.value,(u,S)=>(V(),U(j,{key:S,class:"q-my-sm",dense:""},{default:l(()=>[e(w,{avatar:""},{default:l(()=>[e(ne,{"text-color":"blue"},{default:l(()=>[C(K(S+1),1)]),_:2},1024)]),_:2},1024),e(w,null,{default:l(()=>[e(G,null,{default:l(()=>[e(Q,{dense:"",filled:"",label:"Item Name",modelValue:u.TSRVD_ITMCD,"onUpdate:modelValue":f=>u.TSRVD_ITMCD=f,"use-input":"","input-debounce":"500",options:D.value,onFilter:s[7]||(s[7]=(f,oe,se)=>p(f,oe,se,"item")),behavior:"dialog","option-label":"MITM_ITMNM","option-value":"MITM_ITMNM","emit-value":"","map-options":"",loading:t.value},null,8,["modelValue","onUpdate:modelValue","options","loading"])]),_:2},1024)]),_:2},1024),e(w,null,{default:l(()=>[e(T,{label:"Qty",filled:"",dense:"",modelValue:u.TSRVD_QTY,"onUpdate:modelValue":f=>u.TSRVD_QTY=f},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1024),e(w,null,{default:l(()=>[e(T,{label:"Problem",filled:"",dense:"",modelValue:u.TSRVD_CUSTRMK,"onUpdate:modelValue":f=>u.TSRVD_CUSTRMK=f},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1024),e(w,{side:""},{default:l(()=>[e(M,{icon:"delete",color:"red",flat:"",onClick:f=>r(S)},{default:l(()=>[e(y,null,{default:l(()=>[C("Delete line")]),_:1})]),_:2},1032,["onClick"])]),_:2},1024),e(w,{side:""},{default:l(()=>[e(M,{icon:"library_add",color:"indigo",flat:"",onClick:f=>A(S)},{default:l(()=>[e(y,null,{default:l(()=>[C("Add new item")]),_:1})]),_:2},1032,["onClick"])]),_:2},1024)]),_:2},1024))),128)):F((V(),U(j,{key:1,class:"q-my-sm",clickable:""},{default:l(()=>[e(w,null,{default:l(()=>[e(G,null,{default:l(()=>[C(" No Items Added ")]),_:1})]),_:1})]),_:1})),[[de]])]),_:1})])]),_:1}),e(ee,{align:"right"},{default:l(()=>[e(M,{label:"OK",color:"primary",onClick:s[8]||(s[8]=u=>N()),disable:t.value,loading:t.value},null,8,["disable","loading"]),e(M,{flat:"",label:"Cancel",color:"red",onClick:q(k),loading:t.value},null,8,["onClick","loading"])]),_:1})]),_:1})]),_:1},8,["onHide"]))}};const Pe={class:"q-pa-md"},Ee={class:"row q-pb-md"},Ke=a("div",{class:"col"},[a("span",{class:"text-h4"},"Receive Order ")],-1),Le={class:"col text-right"},xe={class:"row q-pt-md"},Be={class:"col"},ze={__name:"serviceView",setup($){const R=B(),b=c("SRVH_DOCNO"),h=c(""),k=c([]),I=c([{name:"SRVH_DOCNO",label:"SPK No",field:"SRVH_DOCNO",sortable:!0,align:"left"},{name:"MCUS_CUSNM",label:"Cust",field:"MCUS_CUSNM",sortable:!0,align:"left"},{name:"created_at",label:"Created Date",field:"created_at",sortable:!0,align:"left",format:t=>L.formatDate(new Date(t),"DD MMM YYYY")}]),n=c(!1),m=c(null);x(()=>{D(),m.value=setInterval(()=>{D()},1e4)});const D=async()=>{n.value=!0,await O.post("servicesAdmin/search",{searchBy:b.value,searchValue:h.value}).then(t=>{n.value=!1,k.value=t.data.data}).catch(t=>{n.value=!1})},g=()=>{R.dialog({component:Z}).onOk(async t=>{D()})},v=t=>{const p={SRVH_DOCNO:t.SRVH_DOCNO,SRVH_ISSDT:L.formatDate(t.SRVH_ISSDT,"YYYY-MM-DD"),SRVH_CUSCD:t.MCUS_CUSCD};let d=[];t.detail.map(o=>{d.push({TSRVD_ITMCD:o.TSRVD_ITMCD,TSRVD_LINE:o.TSRVD_LINE,TSRVD_QTY:o.TSRVD_QTY,TSRVD_CUSTRMK:o.TSRVD_CUSTRMK})}),R.dialog({component:Z,componentProps:{header:p,detail:d}}).onOk(async o=>{D()})};return(t,p)=>(V(),H("div",Pe,[a("div",Ee,[Ke,a("div",Le,[e(M,{icon:"add",color:"blue",onClick:g},{default:l(()=>[e(y,null,{default:l(()=>[C("Create New Order")]),_:1})]),_:1})])]),e(ie),a("div",xe,[a("div",Be,[e(re,{title:"Created Order",rows:k.value,columns:I.value,"row-key":"name",loading:n.value,dense:"",pagination:{rowsPerPage:20},class:"my-sticky-header-column-table"},{"top-right":l(()=>[e(Q,{outlined:"",modelValue:b.value,"onUpdate:modelValue":p[0]||(p[0]=d=>b.value=d),options:I.value,label:"Search Columns","option-value":"name","option-label":"label","emit-value":"",dense:"","map-options":""},null,8,["modelValue","options"]),e(T,{borderless:"",dense:"",modelValue:h.value,"onUpdate:modelValue":[p[1]||(p[1]=d=>h.value=d),p[2]||(p[2]=d=>t.dataQuo())],placeholder:"Search",outlined:"",debounce:"1000"},{append:l(()=>[e(ae,{name:"search"})]),_:1},8,["modelValue"])]),header:l(d=>[e(W,{props:d},{default:l(()=>[(V(!0),H(P,null,E(d.cols,o=>(V(),U(J,{key:o.name,props:d},{default:l(()=>[C(K(o.label),1)]),_:2},1032,["props"]))),128)),e(J,{"auto-width":""},{default:l(()=>[C("Action")]),_:1})]),_:2},1032,["props"])]),body:l(d=>[e(W,{props:d},{default:l(()=>[(V(!0),H(P,null,E(d.cols,o=>(V(),U(X,{key:o.name,props:d},{default:l(()=>[C(K(o.value),1)]),_:2},1032,["props"]))),128)),e(X,{"auto-width":""},{default:l(()=>[e(M,{flat:"",color:"orange",icon:"edit",onClick:o=>v(d.row),dense:"",disable:d.row.detail.filter(o=>o.TSRVD_FLGSTS>0).length>0},{default:l(()=>[e(y,null,{default:l(()=>[C("Edit this Order")]),_:1})]),_:2},1032,["onClick","disable"]),e(M,{flat:"",color:"red",icon:"delete",onClick:o=>t.onClickDelete(d.row.SRVH_DOCNO),dense:"",disable:d.row.detail.filter(o=>o.TSRVD_FLGSTS>0).length>0},{default:l(()=>[e(y,null,{default:l(()=>[C("Delete this Order")]),_:1})]),_:2},1032,["onClick","disable"])]),_:2},1024)]),_:2},1032,["props"])]),_:1},8,["rows","columns","loading"])])])]))}};export{ze as default};
