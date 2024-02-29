import{Q as U}from"./QTooltip.37687f55.js";import{s as c,o as B,B as p,C as b,D as l,E as e,J as ee,K as Y,I as a,P as S,L as le,Q as C,M as q,O as ae,aa as te,aW as j,R as Q,H as D,aY as P,aU as E,aV as K,aZ as de,aX as L,ap as ie,S as ue}from"./index.6877af1f.js";import{u as oe,b as F,c as $,Q as re,j as G,k as O,l as J,a as me,m as W}from"./use-dialog-plugin-component.93de69ba.js";import{Q as X,a as Z}from"./use-cache.566bf211.js";import{d as x}from"./date.06354990.js";import{api_web as R}from"./axios.cab1cc43.js";import{Q as ce,a as _e,C as ve}from"./ClosePopup.278f97f1.js";const pe=a("div",{class:"text-h6"},"Create Item Master",-1),fe={class:"row"},Me={class:"col"},Ce={class:"col q-pl-md"},De={class:"row q-pt-md"},Ve={class:"col"},Se={class:"col q-pl-md"},Te={class:"row q-pt-md"},Ie={class:"col"},ge={class:"col q-pl-md"},be={class:"row q-pt-md"},he={class:"col"},we={__name:"itemCreate",props:{ItemCat:String},setup(A){const{dialogRef:y,onDialogHide:h,onDialogOK:w,onDialogCancel:k}=oe(),I=F(),t=c({MITM_ITMCD:"",MITM_ITMNM:"",MITM_STKUOM:"",MITM_ITMTYPE:1,MITM_BRAND:"",MITM_MODEL:"",MITM_SPEC:"",MITM_ITMCAT:"",MITM_COACD:"",MITM_ITMCAT:""}),m=c(!1),V=c([]),g=c([]),f=A;B(()=>{d(),t.value.MITM_ITMCAT=f.ItemCat});const o=(s,i,r,H)=>{i(async()=>{await R.post("item/getListCoasAPI",{search:s}).then(N=>{g.value=N.data})})},v=()=>{I.dialog({title:"Confirmation",message:"Do you want to save this item ?",cancel:!0,persistent:!0}).onOk(async()=>{await R.post("item",t.value).then(s=>{w(s.data.data.value)})})},d=async()=>{m.value=!0,await R.get("item/formAPI").then(s=>{m.value=!1,V.value=s.data.uoms,g.value=s.data.coas}).catch(()=>{m.value=!1})};return(s,i)=>(p(),b(ae,{ref_key:"dialogRef",ref:y,onHide:q(h),"transition-show":"slide-up","transition-hide":"slide-down","full-width":"",persistent:""},{default:l(()=>[e(ee,{class:"q-dialog-plugin bg-white q-pa-sm"},{default:l(()=>[e(Y,null,{default:l(()=>[pe]),_:1}),e(Y,{class:"q-pa-sm"},{default:l(()=>[a("div",fe,[a("div",Me,[e(S,{label:"Item Code",dense:"",modelValue:t.value.MITM_ITMCD,"onUpdate:modelValue":i[0]||(i[0]=r=>t.value.MITM_ITMCD=r),filled:""},null,8,["modelValue"])]),a("div",Ce,[e(S,{label:"Item Name",dense:"",modelValue:t.value.MITM_ITMNM,"onUpdate:modelValue":i[1]||(i[1]=r=>t.value.MITM_ITMNM=r),filled:""},null,8,["modelValue"])])]),a("div",De,[a("div",Ve,[e($,{dense:"",filled:"",label:"UOM",modelValue:t.value.MITM_STKUOM,"onUpdate:modelValue":i[2]||(i[2]=r=>t.value.MITM_STKUOM=r),options:V.value,behavior:"dialog","option-label":"MUOM_UOMNM","option-value":"MUOM_UOMCD","emit-value":"","map-options":"",loading:m.value},null,8,["modelValue","options","loading"])]),a("div",Se,[e(S,{label:"Item Brand",dense:"",modelValue:t.value.MITM_BRAND,"onUpdate:modelValue":i[3]||(i[3]=r=>t.value.MITM_BRAND=r),filled:""},null,8,["modelValue"])])]),a("div",Te,[a("div",Ie,[e(S,{label:"Item Model",dense:"",modelValue:t.value.MITM_MODEL,"onUpdate:modelValue":i[4]||(i[4]=r=>t.value.MITM_MODEL=r),filled:""},null,8,["modelValue"])]),a("div",ge,[e(S,{label:"Item Specification",dense:"",modelValue:t.value.MITM_SPEC,"onUpdate:modelValue":i[5]||(i[5]=r=>t.value.MITM_SPEC=r),filled:""},null,8,["modelValue"])])]),a("div",be,[a("div",he,[e($,{dense:"",filled:"",label:"COA",modelValue:t.value.MITM_COACD,"onUpdate:modelValue":i[6]||(i[6]=r=>t.value.MITM_COACD=r),options:g.value,"use-input":"",behavior:"dialog","option-label":"MCOA_COANM","option-value":"MCOA_COACD",onFilter:i[7]||(i[7]=(r,H,N)=>o(r,H,N)),"emit-value":"","map-options":"",loading:m.value},null,8,["modelValue","options","loading"])])])]),_:1}),e(le,{align:"right"},{default:l(()=>[e(C,{label:"OK",color:"primary",onClick:i[8]||(i[8]=r=>v())}),e(C,{flat:"",label:"Cancel",color:"red",onClick:q(k)},null,8,["onClick"])]),_:1})]),_:1})]),_:1},8,["onHide"]))}},Oe=a("div",{class:"text-h6"},"Create Order",-1),Re={style:{border:"1px black solid","border-radius":"10px"}},ye=a("legend",{style:{"margin-left":"1em",padding:"0.2em 0.8em"}},[a("b",null,"Header")],-1),ke={class:"row"},Ue={class:"col"},Ne={class:"col q-pl-md"},Qe={class:"row items-center justify-end"},$e={class:"row"},Ae={class:"col"},He={style:{border:"1px black solid","border-radius":"10px",height:"35vh",overflow:"auto"}},Ye=a("legend",{style:{"margin-left":"1em",padding:"0.2em 0.8em"}},[a("b",null,"Detail Items")],-1),qe={key:0,class:"row q-pb-sm"},Pe={class:"col text-right"},z={__name:"serviceCreateOrder",props:{header:Array,detail:Array,mode:String},setup(A){const{dialogRef:y,onDialogHide:h,onDialogOK:w,onDialogCancel:k}=oe(),I=F(),t=A;B(async()=>{t.header&&(await d(),await s(),m.value=t.header,f.value=t.detail)});const m=c({SRVH_DOCNO:"",SRVH_ISSDT:x.formatDate(Date.now(),"YYYY-MM-DD"),SRVH_CUSCD:""}),V=c([]),g=c([]),f=c([]),o=c(!1),v=(_,n,u,T)=>{n(async()=>{T==="cust"&&await d(_),T==="item"&&await s(_)})},d=async _=>{o.value=!0,await R.post("customer/searchAPI",{searchValue:_}).then(n=>{o.value=!1,g.value=n.data.data}).catch(()=>{o.value=!1})},s=async _=>{o.value=!0,await R.post("item/searchAPI",{searchValue:_}).then(n=>{o.value=!1,V.value=n.data.data}).catch(()=>{o.value=!1})},i=()=>{f.value.push({TSRVD_ITMCD:"",TSRVD_LINE:f.value.length+1,TSRVD_QTY:1,TSRVD_CUSTRMK:""})},r=_=>{I.dialog({title:"Confirmation",message:`Do you want to delete this lines no ${_+1} ?`,cancel:!0,persistent:!0}).onOk(async()=>{f.value.splice(_,1)})},H=_=>{I.dialog({component:we,componentProps:{ItemCat:"SERVICE_ITEMM"}}).onOk(async n=>{await s(""),f.value[_].TSRVD_ITMCD=n.MITM_ITMNM})},N=()=>{I.dialog({title:"Confirmation",message:"Do you want to submit this data ?",cancel:!0,persistent:!0}).onOk(async()=>{o.value=!0,await R.post("servicesAdmin",{header:m.value,detail:f.value}).then(_=>{o.value=!1,w()})})};return(_,n)=>(p(),b(ae,{ref_key:"dialogRef",ref:y,onHide:q(h),"transition-show":"slide-up","transition-hide":"slide-down","full-width":"",persistent:""},{default:l(()=>[e(ee,{class:"q-dialog-plugin bg-white q-pa-sm"},{default:l(()=>[e(Y,null,{default:l(()=>[Oe]),_:1}),e(Y,{class:"q-pa-sm"},{default:l(()=>[a("fieldset",Re,[ye,a("div",ke,[a("div",Ue,[e(S,{label:"SPK No",readonly:"",dense:"",modelValue:m.value.SRVH_DOCNO,"onUpdate:modelValue":n[0]||(n[0]=u=>m.value.SRVH_DOCNO=u),filled:""},null,8,["modelValue"])]),a("div",Ne,[e(S,{filled:"",modelValue:m.value.SRVH_ISSDT,"onUpdate:modelValue":n[2]||(n[2]=u=>m.value.SRVH_ISSDT=u),dense:"",label:"Issue Date",loading:o.value,onClick:n[3]||(n[3]=u=>_.quotationIssueDate.qDateProxy.show()),mask:"####-##-##","fill-mask":"",hint:"Mask: YYYY-MM-DD",readonly:t.mode==="view"},{append:l(()=>[e(te,{name:"event",class:"cursor-pointer",disable:t.mode==="view"},{default:l(()=>[e(ce,{cover:"","transition-show":"scale","transition-hide":"scale"},{default:l(()=>[e(_e,{modelValue:m.value.SRVH_ISSDT,"onUpdate:modelValue":n[1]||(n[1]=u=>m.value.SRVH_ISSDT=u),mask:"YYYY-MM-DD"},{default:l(()=>[a("div",Qe,[j(e(C,{label:"Close",color:"primary",flat:""},null,512),[[ve]])])]),_:1},8,["modelValue"])]),_:1})]),_:1},8,["disable"])]),_:1},8,["modelValue","loading","readonly"])])]),a("div",$e,[a("div",Ae,[e($,{dense:"",filled:"",label:"Customer Choose",modelValue:m.value.SRVH_CUSCD,"onUpdate:modelValue":n[4]||(n[4]=u=>m.value.SRVH_CUSCD=u),"use-input":"","input-debounce":"500",options:g.value,onFilter:n[5]||(n[5]=(u,T,M)=>v(u,T,M,"cust")),behavior:"dialog","option-label":"MCUS_CUSNM","option-value":"MCUS_CUSCD","emit-value":"","map-options":"",loading:o.value,readonly:t.mode==="view"},null,8,["modelValue","options","loading","readonly"])])])]),a("fieldset",He,[Ye,t.mode!=="view"?(p(),Q("div",qe,[a("div",Pe,[e(C,{flat:"",icon:"add",color:"blue",onClick:n[6]||(n[6]=u=>i())},{default:l(()=>[e(U,null,{default:l(()=>[D("Add lines")]),_:1})]),_:1})])])):P("",!0),e(re,{bordered:"",dense:""},{default:l(()=>[f.value.length>0?(p(!0),Q(E,{key:0},K(f.value,(u,T)=>(p(),b(G,{key:T,class:"q-my-sm",dense:""},{default:l(()=>[e(O,{avatar:""},{default:l(()=>[e(de,{"text-color":"blue"},{default:l(()=>[D(L(T+1),1)]),_:2},1024)]),_:2},1024),e(O,null,{default:l(()=>[e(J,null,{default:l(()=>[e($,{dense:"",filled:"",label:"Item Name",modelValue:u.TSRVD_ITMCD,"onUpdate:modelValue":M=>u.TSRVD_ITMCD=M,"use-input":"","input-debounce":"500",options:V.value,onFilter:n[7]||(n[7]=(M,se,ne)=>v(M,se,ne,"item")),behavior:"dialog","option-label":"MITM_ITMNM","option-value":"MITM_ITMNM","emit-value":"","map-options":"",loading:o.value},null,8,["modelValue","onUpdate:modelValue","options","loading"])]),_:2},1024)]),_:2},1024),e(O,null,{default:l(()=>[e(S,{label:"Qty",filled:"",dense:"",modelValue:u.TSRVD_QTY,"onUpdate:modelValue":M=>u.TSRVD_QTY=M},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1024),e(O,null,{default:l(()=>[e(S,{label:"Problem",filled:"",dense:"",modelValue:u.TSRVD_CUSTRMK,"onUpdate:modelValue":M=>u.TSRVD_CUSTRMK=M},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1024),t.mode!=="view"?(p(),b(O,{key:0,side:""},{default:l(()=>[e(C,{icon:"delete",color:"red",flat:"",onClick:M=>r(T)},{default:l(()=>[e(U,null,{default:l(()=>[D("Delete line")]),_:1})]),_:2},1032,["onClick"])]),_:2},1024)):P("",!0),t.mode!=="view"?(p(),b(O,{key:1,side:""},{default:l(()=>[e(C,{icon:"library_add",color:"indigo",flat:"",onClick:M=>H(T)},{default:l(()=>[e(U,null,{default:l(()=>[D("Add new item")]),_:1})]),_:2},1032,["onClick"])]),_:2},1024)):P("",!0)]),_:2},1024))),128)):j((p(),b(G,{key:1,class:"q-my-sm",clickable:""},{default:l(()=>[e(O,null,{default:l(()=>[e(J,null,{default:l(()=>[D(" No Items Added ")]),_:1})]),_:1})]),_:1})),[[ie]])]),_:1})])]),_:1}),e(le,{align:"right"},{default:l(()=>[e(C,{label:"OK",color:"primary",onClick:n[8]||(n[8]=u=>N()),disable:o.value,loading:o.value},null,8,["disable","loading"]),e(C,{flat:"",label:"Cancel",color:"red",onClick:q(k),loading:o.value},null,8,["onClick","loading"])]),_:1})]),_:1})]),_:1},8,["onHide"]))}};const Ee={class:"q-pa-md"},Ke={class:"row q-pb-md"},Le=a("div",{class:"col"},[a("span",{class:"text-h4"},"Receive Order ")],-1),xe={class:"col text-right"},Be={class:"row q-pt-md"},Fe={class:"col"},el={__name:"serviceView",setup(A){const y=F(),h=c("SRVH_DOCNO"),w=c(""),k=c([]),I=c([{name:"SRVH_DOCNO",label:"SPK No",field:"SRVH_DOCNO",sortable:!0,align:"left"},{name:"MCUS_CUSNM",label:"Cust",field:"MCUS_CUSNM",sortable:!0,align:"left"},{name:"created_at",label:"Created Date",field:"created_at",sortable:!0,align:"left",format:o=>x.formatDate(new Date(o),"DD MMM YYYY")}]),t=c(!1),m=c(null);B(()=>{V(),m.value=setInterval(()=>{V()},1e4)});const V=async()=>{t.value=!0,await R.post("servicesAdmin/search",{searchBy:h.value,searchValue:w.value}).then(o=>{t.value=!1,k.value=o.data.data}).catch(o=>{t.value=!1})},g=()=>{y.dialog({component:z}).onOk(async o=>{V()})},f=o=>{const v={SRVH_DOCNO:o.SRVH_DOCNO,SRVH_ISSDT:x.formatDate(o.SRVH_ISSDT,"YYYY-MM-DD"),SRVH_CUSCD:o.MCUS_CUSCD};let d=[];o.detail.map(s=>{d.push({TSRVD_ITMCD:s.TSRVD_ITMCD,TSRVD_LINE:s.TSRVD_LINE,TSRVD_QTY:s.TSRVD_QTY,TSRVD_CUSTRMK:s.TSRVD_CUSTRMK})}),y.dialog({component:z,componentProps:{header:v,detail:d}}).onOk(async s=>{V()})};return(o,v)=>(p(),Q("div",Ee,[a("div",Ke,[Le,a("div",xe,[e(C,{icon:"add",color:"blue",onClick:g},{default:l(()=>[e(U,null,{default:l(()=>[D("Create New Order")]),_:1})]),_:1})])]),e(ue),a("div",Be,[a("div",Fe,[e(me,{title:"Created Order",rows:k.value,columns:I.value,"row-key":"name",loading:t.value,dense:"",pagination:{rowsPerPage:20},class:"my-sticky-header-column-table"},{"top-right":l(()=>[e($,{outlined:"",modelValue:h.value,"onUpdate:modelValue":v[0]||(v[0]=d=>h.value=d),options:I.value,label:"Search Columns","option-value":"name","option-label":"label","emit-value":"",dense:"","map-options":""},null,8,["modelValue","options"]),e(S,{borderless:"",dense:"",modelValue:w.value,"onUpdate:modelValue":[v[1]||(v[1]=d=>w.value=d),v[2]||(v[2]=d=>o.dataQuo())],placeholder:"Search",outlined:"",debounce:"1000"},{append:l(()=>[e(te,{name:"search"})]),_:1},8,["modelValue"])]),header:l(d=>[e(X,{props:d},{default:l(()=>[(p(!0),Q(E,null,K(d.cols,s=>(p(),b(W,{key:s.name,props:d},{default:l(()=>[D(L(s.label),1)]),_:2},1032,["props"]))),128)),e(W,{"auto-width":""},{default:l(()=>[D("Action")]),_:1})]),_:2},1032,["props"])]),body:l(d=>[e(X,{props:d},{default:l(()=>[(p(!0),Q(E,null,K(d.cols,s=>(p(),b(Z,{key:s.name,props:d},{default:l(()=>[D(L(s.value),1)]),_:2},1032,["props"]))),128)),e(Z,{"auto-width":""},{default:l(()=>[e(C,{flat:"",color:"orange",icon:"edit",onClick:s=>f(d.row),dense:"",disable:d.row.detail.filter(s=>s.TSRVD_FLGSTS>0).length>0},{default:l(()=>[e(U,null,{default:l(()=>[D("Edit this Order")]),_:1})]),_:2},1032,["onClick","disable"]),e(C,{flat:"",color:"red",icon:"delete",onClick:s=>o.onClickDelete(d.row.SRVH_DOCNO),dense:"",disable:d.row.detail.filter(s=>s.TSRVD_FLGSTS>0).length>0},{default:l(()=>[e(U,null,{default:l(()=>[D("Delete this Order")]),_:1})]),_:2},1032,["onClick","disable"])]),_:2},1024)]),_:2},1032,["props"])]),_:1},8,["rows","columns","loading"])])])]))}};export{el as default};
