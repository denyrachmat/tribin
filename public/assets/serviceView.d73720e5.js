import{Q as y}from"./QTooltip.6bf4acca.js";import{s as p,o as x,B as D,C as U,D as l,E as e,J as z,K as Y,I as a,P as V,L as ee,Q as M,M as q,O as le,aa as ae,aW as F,H as C,R as H,aU as P,aV as E,aZ as ne,aX as K,ap as de,S as ie}from"./index.26902160.js";import{u as te,b as B,c as Q,Q as ue,j,k as w,l as G,a as re,m as J}from"./use-dialog-plugin-component.47429a23.js";import{Q as W,a as X}from"./use-cache.546da72a.js";import{d as L}from"./date.d5ca1955.js";import{api_web as O}from"./axios.4dfb0eea.js";import{Q as me,a as ce,C as _e}from"./ClosePopup.97b2b453.js";const pe=a("div",{class:"text-h6"},"Create Item Master",-1),ve={class:"row"},fe={class:"col"},Me={class:"col q-pl-md"},Ce={class:"row q-pt-md"},De={class:"col"},Ve={class:"col q-pl-md"},Te={class:"row q-pt-md"},Se={class:"col"},Ie={class:"col q-pl-md"},ge={class:"row q-pt-md"},be={class:"col"},he={__name:"itemCreate",props:{ItemCat:String},setup($){const{dialogRef:R,onDialogHide:g,onDialogOK:b,onDialogCancel:k}=te(),S=B(),o=p({MITM_ITMCD:"",MITM_ITMNM:"",MITM_STKUOM:"",MITM_ITMTYPE:1,MITM_BRAND:"",MITM_MODEL:"",MITM_SPEC:"",MITM_ITMCAT:"",MITM_COACD:"",MITM_ITMCAT:""}),r=p(!1),h=p([]),I=p([]),n=$;x(()=>{i(),o.value.MITM_ITMCAT=n.ItemCat});const s=(v,u,c,A)=>{u(async()=>{await O.post("item/getListCoasAPI",{search:v}).then(N=>{I.value=N.data})})},d=()=>{S.dialog({title:"Confirmation",message:"Do you want to save this item ?",cancel:!0,persistent:!0}).onOk(async()=>{await O.post("item",o.value).then(v=>{b(v.data.data.value)})})},i=async()=>{r.value=!0,await O.get("item/formAPI").then(v=>{r.value=!1,h.value=v.data.uoms,I.value=v.data.coas}).catch(()=>{r.value=!1})};return(v,u)=>(D(),U(le,{ref_key:"dialogRef",ref:R,onHide:q(g),"transition-show":"slide-up","transition-hide":"slide-down","full-width":"",persistent:""},{default:l(()=>[e(z,{class:"q-dialog-plugin bg-white q-pa-sm"},{default:l(()=>[e(Y,null,{default:l(()=>[pe]),_:1}),e(Y,{class:"q-pa-sm"},{default:l(()=>[a("div",ve,[a("div",fe,[e(V,{label:"Item Code",dense:"",modelValue:o.value.MITM_ITMCD,"onUpdate:modelValue":u[0]||(u[0]=c=>o.value.MITM_ITMCD=c),filled:""},null,8,["modelValue"])]),a("div",Me,[e(V,{label:"Item Name",dense:"",modelValue:o.value.MITM_ITMNM,"onUpdate:modelValue":u[1]||(u[1]=c=>o.value.MITM_ITMNM=c),filled:""},null,8,["modelValue"])])]),a("div",Ce,[a("div",De,[e(Q,{dense:"",filled:"",label:"UOM",modelValue:o.value.MITM_STKUOM,"onUpdate:modelValue":u[2]||(u[2]=c=>o.value.MITM_STKUOM=c),options:h.value,behavior:"dialog","option-label":"MUOM_UOMNM","option-value":"MUOM_UOMCD","emit-value":"","map-options":"",loading:r.value},null,8,["modelValue","options","loading"])]),a("div",Ve,[e(V,{label:"Item Brand",dense:"",modelValue:o.value.MITM_BRAND,"onUpdate:modelValue":u[3]||(u[3]=c=>o.value.MITM_BRAND=c),filled:""},null,8,["modelValue"])])]),a("div",Te,[a("div",Se,[e(V,{label:"Item Model",dense:"",modelValue:o.value.MITM_MODEL,"onUpdate:modelValue":u[4]||(u[4]=c=>o.value.MITM_MODEL=c),filled:""},null,8,["modelValue"])]),a("div",Ie,[e(V,{label:"Item Specification",dense:"",modelValue:o.value.MITM_SPEC,"onUpdate:modelValue":u[5]||(u[5]=c=>o.value.MITM_SPEC=c),filled:""},null,8,["modelValue"])])]),a("div",ge,[a("div",be,[e(Q,{dense:"",filled:"",label:"COA",modelValue:o.value.MITM_COACD,"onUpdate:modelValue":u[6]||(u[6]=c=>o.value.MITM_COACD=c),options:I.value,"use-input":"",behavior:"dialog","option-label":"MCOA_COANM","option-value":"MCOA_COACD",onFilter:u[7]||(u[7]=(c,A,N)=>s(c,A,N)),"emit-value":"","map-options":"",loading:r.value},null,8,["modelValue","options","loading"])])])]),_:1}),e(ee,{align:"right"},{default:l(()=>[e(M,{label:"OK",color:"primary",onClick:u[8]||(u[8]=c=>d())}),e(M,{flat:"",label:"Cancel",color:"red",onClick:q(k)},null,8,["onClick"])]),_:1})]),_:1})]),_:1},8,["onHide"]))}},we=a("div",{class:"text-h6"},"Create Order",-1),Oe={style:{border:"1px black solid","border-radius":"10px"}},Re=a("legend",{style:{"margin-left":"1em",padding:"0.2em 0.8em"}},[a("b",null,"Header")],-1),ke={class:"row"},ye={class:"col"},Ue={class:"col q-pl-md"},Ne={class:"row items-center justify-end"},Qe={class:"row"},$e={class:"col"},Ae={style:{border:"1px black solid","border-radius":"10px",height:"35vh",overflow:"auto"}},He=a("legend",{style:{"margin-left":"1em",padding:"0.2em 0.8em"}},[a("b",null,"Detail Items")],-1),Ye={class:"row q-pb-sm"},qe={class:"col text-right"},Z={__name:"serviceCreateOrder",props:{header:Array,detail:Array},setup($){const{dialogRef:R,onDialogHide:g,onDialogOK:b,onDialogCancel:k}=te(),S=B(),o=$;x(async()=>{o.header&&(await i(),await v(),r.value=o.header,n.value=o.detail)});const r=p({SRVH_DOCNO:"",SRVH_ISSDT:L.formatDate(Date.now(),"YYYY-MM-DD"),SRVH_CUSCD:""}),h=p([]),I=p([]),n=p([]),s=p(!1),d=(_,t,m,T)=>{t(async()=>{T==="cust"&&await i(_),T==="item"&&await v(_)})},i=async _=>{s.value=!0,await O.post("customer/searchAPI",{searchValue:_}).then(t=>{s.value=!1,I.value=t.data.data}).catch(()=>{s.value=!1})},v=async _=>{s.value=!0,await O.post("item/searchAPI",{searchValue:_}).then(t=>{s.value=!1,h.value=t.data.data}).catch(()=>{s.value=!1})},u=()=>{n.value.push({TSRVD_ITMCD:"",TSRVD_LINE:n.value.length+1,TSRVD_QTY:1,TSRVD_CUSTRMK:""})},c=_=>{S.dialog({title:"Confirmation",message:`Do you want to delete this lines no ${_+1} ?`,cancel:!0,persistent:!0}).onOk(async()=>{n.value.splice(_,1)})},A=_=>{S.dialog({component:he,componentProps:{ItemCat:"SERVICE_ITEMM"}}).onOk(async t=>{await v(""),n.value[_].TSRVD_ITMCD=t.MITM_ITMNM})},N=()=>{S.dialog({title:"Confirmation",message:"Do you want to submit this data ?",cancel:!0,persistent:!0}).onOk(async()=>{s.value=!0,await O.post("servicesAdmin",{header:r.value,detail:n.value}).then(_=>{s.value=!1,b()})})};return(_,t)=>(D(),U(le,{ref_key:"dialogRef",ref:R,onHide:q(g),"transition-show":"slide-up","transition-hide":"slide-down","full-width":"",persistent:""},{default:l(()=>[e(z,{class:"q-dialog-plugin bg-white q-pa-sm"},{default:l(()=>[e(Y,null,{default:l(()=>[we]),_:1}),e(Y,{class:"q-pa-sm"},{default:l(()=>[a("fieldset",Oe,[Re,a("div",ke,[a("div",ye,[e(V,{label:"SPK No",readonly:"",dense:"",modelValue:r.value.SRVH_DOCNO,"onUpdate:modelValue":t[0]||(t[0]=m=>r.value.SRVH_DOCNO=m),filled:""},null,8,["modelValue"])]),a("div",Ue,[e(V,{filled:"",modelValue:r.value.SRVH_ISSDT,"onUpdate:modelValue":t[2]||(t[2]=m=>r.value.SRVH_ISSDT=m),dense:"",label:"Issue Date",loading:s.value,onClick:t[3]||(t[3]=m=>_.quotationIssueDate.qDateProxy.show()),mask:"####-##-##","fill-mask":"",hint:"Mask: YYYY-MM-DD"},{append:l(()=>[e(ae,{name:"event",class:"cursor-pointer"},{default:l(()=>[e(me,{cover:"","transition-show":"scale","transition-hide":"scale"},{default:l(()=>[e(ce,{modelValue:r.value.SRVH_ISSDT,"onUpdate:modelValue":t[1]||(t[1]=m=>r.value.SRVH_ISSDT=m),mask:"YYYY-MM-DD"},{default:l(()=>[a("div",Ne,[F(e(M,{label:"Close",color:"primary",flat:""},null,512),[[_e]])])]),_:1},8,["modelValue"])]),_:1})]),_:1})]),_:1},8,["modelValue","loading"])])]),a("div",Qe,[a("div",$e,[e(Q,{dense:"",filled:"",label:"Customer Choose",modelValue:r.value.SRVH_CUSCD,"onUpdate:modelValue":t[4]||(t[4]=m=>r.value.SRVH_CUSCD=m),"use-input":"","input-debounce":"500",options:I.value,onFilter:t[5]||(t[5]=(m,T,f)=>d(m,T,f,"cust")),behavior:"dialog","option-label":"MCUS_CUSNM","option-value":"MCUS_CUSCD","emit-value":"","map-options":"",loading:s.value},null,8,["modelValue","options","loading"])])])]),a("fieldset",Ae,[He,a("div",Ye,[a("div",qe,[e(M,{flat:"",icon:"add",color:"blue",onClick:t[6]||(t[6]=m=>u())},{default:l(()=>[e(y,null,{default:l(()=>[C("Add lines")]),_:1})]),_:1})])]),e(ue,{bordered:"",dense:""},{default:l(()=>[n.value.length>0?(D(!0),H(P,{key:0},E(n.value,(m,T)=>(D(),U(j,{key:T,class:"q-my-sm",dense:""},{default:l(()=>[e(w,{avatar:""},{default:l(()=>[e(ne,{"text-color":"blue"},{default:l(()=>[C(K(T+1),1)]),_:2},1024)]),_:2},1024),e(w,null,{default:l(()=>[e(G,null,{default:l(()=>[e(Q,{dense:"",filled:"",label:"Item Name",modelValue:m.TSRVD_ITMCD,"onUpdate:modelValue":f=>m.TSRVD_ITMCD=f,"use-input":"","input-debounce":"500",options:h.value,onFilter:t[7]||(t[7]=(f,oe,se)=>d(f,oe,se,"item")),behavior:"dialog","option-label":"MITM_ITMNM","option-value":"MITM_ITMNM","emit-value":"","map-options":"",loading:s.value},null,8,["modelValue","onUpdate:modelValue","options","loading"])]),_:2},1024)]),_:2},1024),e(w,null,{default:l(()=>[e(V,{label:"Qty",filled:"",dense:"",modelValue:m.TSRVD_QTY,"onUpdate:modelValue":f=>m.TSRVD_QTY=f},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1024),e(w,null,{default:l(()=>[e(V,{label:"Problem",filled:"",dense:"",modelValue:m.TSRVD_CUSTRMK,"onUpdate:modelValue":f=>m.TSRVD_CUSTRMK=f},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1024),e(w,{side:""},{default:l(()=>[e(M,{icon:"delete",color:"red",flat:"",onClick:f=>c(T)},{default:l(()=>[e(y,null,{default:l(()=>[C("Delete line")]),_:1})]),_:2},1032,["onClick"])]),_:2},1024),e(w,{side:""},{default:l(()=>[e(M,{icon:"library_add",color:"indigo",flat:"",onClick:f=>A(T)},{default:l(()=>[e(y,null,{default:l(()=>[C("Add new item")]),_:1})]),_:2},1032,["onClick"])]),_:2},1024)]),_:2},1024))),128)):F((D(),U(j,{key:1,class:"q-my-sm",clickable:""},{default:l(()=>[e(w,null,{default:l(()=>[e(G,null,{default:l(()=>[C(" No Items Added ")]),_:1})]),_:1})]),_:1})),[[de]])]),_:1})])]),_:1}),e(ee,{align:"right"},{default:l(()=>[e(M,{label:"OK",color:"primary",onClick:t[8]||(t[8]=m=>N()),disable:s.value,loading:s.value},null,8,["disable","loading"]),e(M,{flat:"",label:"Cancel",color:"red",onClick:q(k),loading:s.value},null,8,["onClick","loading"])]),_:1})]),_:1})]),_:1},8,["onHide"]))}};const Pe={class:"q-pa-md"},Ee={class:"row q-pb-md"},Ke=a("div",{class:"col"},[a("span",{class:"text-h4"},"Receive Order ")],-1),Le={class:"col text-right"},xe={class:"row q-pt-md"},Be={class:"col"},ze={__name:"serviceView",setup($){const R=B(),g=p("SRVH_DOCNO"),b=p(""),k=p([]),S=p([{name:"SRVH_DOCNO",label:"SPK No",field:"SRVH_DOCNO",sortable:!0,align:"left"},{name:"MCUS_CUSNM",label:"Cust",field:"MCUS_CUSNM",sortable:!0,align:"left"},{name:"created_at",label:"Created Date",field:"created_at",sortable:!0,align:"left",format:n=>L.formatDate(new Date(n),"DD MMM YYYY")}]),o=p(!1);x(()=>{r()});const r=async()=>{o.value=!0,await O.post("servicesAdmin/search",{searchBy:g.value,searchValue:b.value}).then(n=>{o.value=!1,k.value=n.data.data}).catch(n=>{o.value=!1})},h=()=>{R.dialog({component:Z}).onOk(async n=>{r()})},I=n=>{const s={SRVH_DOCNO:n.SRVH_DOCNO,SRVH_ISSDT:L.formatDate(n.SRVH_ISSDT,"YYYY-MM-DD"),SRVH_CUSCD:n.MCUS_CUSCD};let d=[];n.detail.map(i=>{d.push({TSRVD_ITMCD:i.TSRVD_ITMCD,TSRVD_LINE:i.TSRVD_LINE,TSRVD_QTY:i.TSRVD_QTY,TSRVD_CUSTRMK:i.TSRVD_CUSTRMK})}),R.dialog({component:Z,componentProps:{header:s,detail:d}}).onOk(async i=>{r()})};return(n,s)=>(D(),H("div",Pe,[a("div",Ee,[Ke,a("div",Le,[e(M,{icon:"add",color:"blue",onClick:h},{default:l(()=>[e(y,null,{default:l(()=>[C("Create New Order")]),_:1})]),_:1})])]),e(ie),a("div",xe,[a("div",Be,[e(re,{title:"Created Order",rows:k.value,columns:S.value,"row-key":"name",loading:o.value,dense:"",pagination:{rowsPerPage:20},class:"my-sticky-header-column-table"},{"top-right":l(()=>[e(Q,{outlined:"",modelValue:g.value,"onUpdate:modelValue":s[0]||(s[0]=d=>g.value=d),options:S.value,label:"Search Columns","option-value":"name","option-label":"label","emit-value":"",dense:"","map-options":""},null,8,["modelValue","options"]),e(V,{borderless:"",dense:"",modelValue:b.value,"onUpdate:modelValue":[s[1]||(s[1]=d=>b.value=d),s[2]||(s[2]=d=>n.dataQuo())],placeholder:"Search",outlined:"",debounce:"1000"},{append:l(()=>[e(ae,{name:"search"})]),_:1},8,["modelValue"])]),header:l(d=>[e(W,{props:d},{default:l(()=>[(D(!0),H(P,null,E(d.cols,i=>(D(),U(J,{key:i.name,props:d},{default:l(()=>[C(K(i.label),1)]),_:2},1032,["props"]))),128)),e(J,{"auto-width":""},{default:l(()=>[C("Action")]),_:1})]),_:2},1032,["props"])]),body:l(d=>[e(W,{props:d},{default:l(()=>[(D(!0),H(P,null,E(d.cols,i=>(D(),U(X,{key:i.name,props:d},{default:l(()=>[C(K(i.value),1)]),_:2},1032,["props"]))),128)),e(X,{"auto-width":""},{default:l(()=>[e(M,{flat:"",color:"orange",icon:"edit",onClick:i=>I(d.row),dense:"",disable:d.row.detail.filter(i=>i.TSRVD_FLGSTS>0).length>0},{default:l(()=>[e(y,null,{default:l(()=>[C("Edit this Order")]),_:1})]),_:2},1032,["onClick","disable"]),e(M,{flat:"",color:"red",icon:"delete",onClick:i=>n.onClickDelete(d.row.SRVH_DOCNO),dense:"",disable:d.row.detail.filter(i=>i.TSRVD_FLGSTS>0).length>0},{default:l(()=>[e(y,null,{default:l(()=>[C("Delete this Order")]),_:1})]),_:2},1032,["onClick","disable"])]),_:2},1024)]),_:2},1032,["props"])]),_:1},8,["rows","columns","loading"])])])]))}};export{ze as default};
