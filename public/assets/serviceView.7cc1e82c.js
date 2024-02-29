import{Q as T}from"./QTooltip.a0913b57.js";import{s as m,o as B,B as C,C as b,D as l,E as e,J as ee,K as P,I as o,P as D,L as le,Q as f,M as q,O as ae,aa as te,aW as G,R as $,H as v,aY as L,aU as E,aV as K,aZ as de,aX as Y,ap as ie,S as ue}from"./index.4c1648c5.js";import{u as oe,b as F,c as Q,Q as re,j,k as O,l as J,a as ce,m as W}from"./use-dialog-plugin-component.3fa22fc2.js";import{Q as X,a as Z}from"./use-cache.47664a64.js";import{d as x}from"./date.a11ef43d.js";import{api_web as R}from"./axios.94e20ed1.js";import{Q as me,a as _e,C as ve}from"./ClosePopup.ac7233d9.js";const fe=o("div",{class:"text-h6"},"Create Item Master",-1),pe={class:"row"},Ce={class:"col"},Me={class:"col q-pl-md"},Se={class:"row q-pt-md"},De={class:"col"},Ve={class:"col q-pl-md"},Te={class:"row q-pt-md"},ge={class:"col"},Ie={class:"col q-pl-md"},be={class:"row q-pt-md"},he={class:"col"},we={__name:"itemCreate",props:{ItemCat:String},setup(A){const{dialogRef:k,onDialogHide:h,onDialogOK:w,onDialogCancel:y}=oe(),g=F(),n=m({MITM_ITMCD:"",MITM_ITMNM:"",MITM_STKUOM:"",MITM_ITMTYPE:1,MITM_BRAND:"",MITM_MODEL:"",MITM_SPEC:"",MITM_ITMCAT:"",MITM_COACD:"",MITM_ITMCAT:""}),r=m(!1),S=m([]),I=m([]),p=A;B(()=>{d(),n.value.MITM_ITMCAT=p.ItemCat});const c=(i,a,t,H)=>{a(async()=>{await R.post("item/getListCoasAPI",{search:i}).then(N=>{I.value=N.data})})},U=()=>{g.dialog({title:"Confirmation",message:"Do you want to save this item ?",cancel:!0,persistent:!0}).onOk(async()=>{await R.post("item",n.value).then(i=>{w(i.data.data.value)})})},d=async()=>{r.value=!0,await R.get("item/formAPI").then(i=>{r.value=!1,S.value=i.data.uoms,I.value=i.data.coas}).catch(()=>{r.value=!1})};return(i,a)=>(C(),b(ae,{ref_key:"dialogRef",ref:k,onHide:q(h),"transition-show":"slide-up","transition-hide":"slide-down","full-width":"",persistent:""},{default:l(()=>[e(ee,{class:"q-dialog-plugin bg-white q-pa-sm"},{default:l(()=>[e(P,null,{default:l(()=>[fe]),_:1}),e(P,{class:"q-pa-sm"},{default:l(()=>[o("div",pe,[o("div",Ce,[e(D,{label:"Item Code",dense:"",modelValue:n.value.MITM_ITMCD,"onUpdate:modelValue":a[0]||(a[0]=t=>n.value.MITM_ITMCD=t),filled:""},null,8,["modelValue"])]),o("div",Me,[e(D,{label:"Item Name",dense:"",modelValue:n.value.MITM_ITMNM,"onUpdate:modelValue":a[1]||(a[1]=t=>n.value.MITM_ITMNM=t),filled:""},null,8,["modelValue"])])]),o("div",Se,[o("div",De,[e(Q,{dense:"",filled:"",label:"UOM",modelValue:n.value.MITM_STKUOM,"onUpdate:modelValue":a[2]||(a[2]=t=>n.value.MITM_STKUOM=t),options:S.value,behavior:"dialog","option-label":"MUOM_UOMNM","option-value":"MUOM_UOMCD","emit-value":"","map-options":"",loading:r.value},null,8,["modelValue","options","loading"])]),o("div",Ve,[e(D,{label:"Item Brand",dense:"",modelValue:n.value.MITM_BRAND,"onUpdate:modelValue":a[3]||(a[3]=t=>n.value.MITM_BRAND=t),filled:""},null,8,["modelValue"])])]),o("div",Te,[o("div",ge,[e(D,{label:"Item Model",dense:"",modelValue:n.value.MITM_MODEL,"onUpdate:modelValue":a[4]||(a[4]=t=>n.value.MITM_MODEL=t),filled:""},null,8,["modelValue"])]),o("div",Ie,[e(D,{label:"Item Specification",dense:"",modelValue:n.value.MITM_SPEC,"onUpdate:modelValue":a[5]||(a[5]=t=>n.value.MITM_SPEC=t),filled:""},null,8,["modelValue"])])]),o("div",be,[o("div",he,[e(Q,{dense:"",filled:"",label:"COA",modelValue:n.value.MITM_COACD,"onUpdate:modelValue":a[6]||(a[6]=t=>n.value.MITM_COACD=t),options:I.value,"use-input":"",behavior:"dialog","option-label":"MCOA_COANM","option-value":"MCOA_COACD",onFilter:a[7]||(a[7]=(t,H,N)=>c(t,H,N)),"emit-value":"","map-options":"",loading:r.value},null,8,["modelValue","options","loading"])])])]),_:1}),e(le,{align:"right"},{default:l(()=>[e(f,{label:"OK",color:"primary",onClick:a[8]||(a[8]=t=>U())}),e(f,{flat:"",label:"Cancel",color:"red",onClick:q(y)},null,8,["onClick"])]),_:1})]),_:1})]),_:1},8,["onHide"]))}},Oe=o("div",{class:"text-h6"},"Create Order",-1),Re={style:{border:"1px black solid","border-radius":"10px"}},ke=o("legend",{style:{"margin-left":"1em",padding:"0.2em 0.8em"}},[o("b",null,"Header")],-1),ye={class:"row"},Ue={class:"col"},Ne={class:"col q-pl-md"},$e={class:"row items-center justify-end"},Qe={class:"row"},Ae={class:"col"},He={style:{border:"1px black solid","border-radius":"10px",height:"35vh",overflow:"auto"}},Ye=o("legend",{style:{"margin-left":"1em",padding:"0.2em 0.8em"}},[o("b",null,"Detail Items")],-1),Pe={key:0,class:"row q-pb-sm"},qe={class:"col text-right"},z={__name:"serviceCreateOrder",props:{header:Array,detail:Array,mode:String},setup(A){const{dialogRef:k,onDialogHide:h,onDialogOK:w,onDialogCancel:y}=oe(),g=F(),n=A;B(async()=>{n.header&&(await d(),await i(),r.value=n.header,p.value=n.detail)});const r=m({SRVH_DOCNO:"",SRVH_ISSDT:x.formatDate(Date.now(),"YYYY-MM-DD"),SRVH_CUSCD:""}),S=m([]),I=m([]),p=m([]),c=m(!1),U=(_,s,u,V)=>{s(async()=>{V==="cust"&&await d(_),V==="item"&&await i(_)})},d=async _=>{c.value=!0,await R.post("customer/searchAPI",{searchValue:_}).then(s=>{c.value=!1,I.value=s.data.data}).catch(()=>{c.value=!1})},i=async _=>{c.value=!0,await R.post("item/searchAPI",{searchValue:_}).then(s=>{c.value=!1,S.value=s.data.data}).catch(()=>{c.value=!1})},a=()=>{p.value.push({TSRVD_ITMCD:"",TSRVD_LINE:p.value.length+1,TSRVD_QTY:1,TSRVD_CUSTRMK:""})},t=_=>{g.dialog({title:"Confirmation",message:`Do you want to delete this lines no ${_+1} ?`,cancel:!0,persistent:!0}).onOk(async()=>{p.value.splice(_,1)})},H=_=>{g.dialog({component:we,componentProps:{ItemCat:"SERVICE_ITEMM"}}).onOk(async s=>{await i(""),p.value[_].TSRVD_ITMCD=s.MITM_ITMNM})},N=()=>{g.dialog({title:"Confirmation",message:"Do you want to submit this data ?",cancel:!0,persistent:!0}).onOk(async()=>{c.value=!0,await R.post("servicesAdmin",{header:r.value,detail:p.value}).then(_=>{c.value=!1,w()})})};return(_,s)=>(C(),b(ae,{ref_key:"dialogRef",ref:k,onHide:q(h),"transition-show":"slide-up","transition-hide":"slide-down","full-width":"",persistent:""},{default:l(()=>[e(ee,{class:"q-dialog-plugin bg-white q-pa-sm"},{default:l(()=>[e(P,null,{default:l(()=>[Oe]),_:1}),e(P,{class:"q-pa-sm"},{default:l(()=>[o("fieldset",Re,[ke,o("div",ye,[o("div",Ue,[e(D,{label:"SPK No",readonly:"",dense:"",modelValue:r.value.SRVH_DOCNO,"onUpdate:modelValue":s[0]||(s[0]=u=>r.value.SRVH_DOCNO=u),filled:""},null,8,["modelValue"])]),o("div",Ne,[e(D,{filled:"",modelValue:r.value.SRVH_ISSDT,"onUpdate:modelValue":s[2]||(s[2]=u=>r.value.SRVH_ISSDT=u),dense:"",label:"Issue Date",loading:c.value,onClick:s[3]||(s[3]=u=>_.quotationIssueDate.qDateProxy.show()),mask:"####-##-##","fill-mask":"",hint:"Mask: YYYY-MM-DD",readonly:n.mode==="view"},{append:l(()=>[e(te,{name:"event",class:"cursor-pointer",disable:n.mode==="view"},{default:l(()=>[e(me,{cover:"","transition-show":"scale","transition-hide":"scale"},{default:l(()=>[e(_e,{modelValue:r.value.SRVH_ISSDT,"onUpdate:modelValue":s[1]||(s[1]=u=>r.value.SRVH_ISSDT=u),mask:"YYYY-MM-DD"},{default:l(()=>[o("div",$e,[G(e(f,{label:"Close",color:"primary",flat:""},null,512),[[ve]])])]),_:1},8,["modelValue"])]),_:1})]),_:1},8,["disable"])]),_:1},8,["modelValue","loading","readonly"])])]),o("div",Qe,[o("div",Ae,[e(Q,{dense:"",filled:"",label:"Customer Choose",modelValue:r.value.SRVH_CUSCD,"onUpdate:modelValue":s[4]||(s[4]=u=>r.value.SRVH_CUSCD=u),"use-input":"","input-debounce":"500",options:I.value,onFilter:s[5]||(s[5]=(u,V,M)=>U(u,V,M,"cust")),behavior:"dialog","option-label":"MCUS_CUSNM","option-value":"MCUS_CUSCD","emit-value":"","map-options":"",loading:c.value,readonly:n.mode==="view"},null,8,["modelValue","options","loading","readonly"])])])]),o("fieldset",He,[Ye,n.mode!=="view"?(C(),$("div",Pe,[o("div",qe,[e(f,{flat:"",icon:"add",color:"blue",onClick:s[6]||(s[6]=u=>a())},{default:l(()=>[e(T,null,{default:l(()=>[v("Add lines")]),_:1})]),_:1})])])):L("",!0),e(re,{bordered:"",dense:""},{default:l(()=>[p.value.length>0?(C(!0),$(E,{key:0},K(p.value,(u,V)=>(C(),b(j,{key:V,class:"q-my-sm",dense:""},{default:l(()=>[e(O,{avatar:""},{default:l(()=>[e(de,{"text-color":"blue"},{default:l(()=>[v(Y(V+1),1)]),_:2},1024)]),_:2},1024),e(O,null,{default:l(()=>[e(J,null,{default:l(()=>[e(Q,{dense:"",filled:"",label:"Item Name",modelValue:u.TSRVD_ITMCD,"onUpdate:modelValue":M=>u.TSRVD_ITMCD=M,"use-input":"","input-debounce":"500",options:S.value,onFilter:s[7]||(s[7]=(M,ne,se)=>U(M,ne,se,"item")),behavior:"dialog","option-label":"MITM_ITMNM","option-value":"MITM_ITMNM","emit-value":"","map-options":"",loading:c.value},null,8,["modelValue","onUpdate:modelValue","options","loading"])]),_:2},1024)]),_:2},1024),e(O,null,{default:l(()=>[e(D,{label:"Qty",filled:"",dense:"",modelValue:u.TSRVD_QTY,"onUpdate:modelValue":M=>u.TSRVD_QTY=M},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1024),e(O,null,{default:l(()=>[e(D,{label:"Problem",filled:"",dense:"",modelValue:u.TSRVD_CUSTRMK,"onUpdate:modelValue":M=>u.TSRVD_CUSTRMK=M},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1024),n.mode!=="view"?(C(),b(O,{key:0,side:""},{default:l(()=>[e(f,{icon:"delete",color:"red",flat:"",onClick:M=>t(V)},{default:l(()=>[e(T,null,{default:l(()=>[v("Delete line")]),_:1})]),_:2},1032,["onClick"])]),_:2},1024)):L("",!0),n.mode!=="view"?(C(),b(O,{key:1,side:""},{default:l(()=>[e(f,{icon:"library_add",color:"indigo",flat:"",onClick:M=>H(V)},{default:l(()=>[e(T,null,{default:l(()=>[v("Add new item")]),_:1})]),_:2},1032,["onClick"])]),_:2},1024)):L("",!0)]),_:2},1024))),128)):G((C(),b(j,{key:1,class:"q-my-sm",clickable:""},{default:l(()=>[e(O,null,{default:l(()=>[e(J,null,{default:l(()=>[v(" No Items Added ")]),_:1})]),_:1})]),_:1})),[[ie]])]),_:1})])]),_:1}),e(le,{align:"right"},{default:l(()=>[e(f,{label:"OK",color:"primary",onClick:s[8]||(s[8]=u=>N()),disable:c.value,loading:c.value},null,8,["disable","loading"]),e(f,{flat:"",label:"Cancel",color:"red",onClick:q(y),loading:c.value},null,8,["onClick","loading"])]),_:1})]),_:1})]),_:1},8,["onHide"]))}};const Le={class:"q-pa-md"},Ee={class:"row q-pb-md"},Ke=o("div",{class:"col"},[o("span",{class:"text-h4"},"Receive Order ")],-1),xe={class:"col text-right"},Be={class:"row q-pt-md"},Fe={class:"col"},el={__name:"serviceView",setup(A){const k=F(),h=m("SRVH_DOCNO"),w=m(""),y=m([]),g=m([{name:"SRVH_DOCNO",label:"SPK No",field:"SRVH_DOCNO",sortable:!0,align:"left"},{name:"MCUS_CUSNM",label:"Cust",field:"MCUS_CUSNM",sortable:!0,align:"left"},{name:"created_at",label:"Created Date",field:"created_at",sortable:!0,align:"left",format:d=>x.formatDate(new Date(d),"DD MMM YYYY")}]),n=m(!1),r=m(null);B(()=>{S(),r.value=setInterval(()=>{S()},1e4)});const S=async()=>{n.value=!0,await R.post("servicesAdmin/search",{searchBy:h.value,searchValue:w.value}).then(d=>{n.value=!1,y.value=d.data.data}).catch(d=>{n.value=!1})},I=()=>{k.dialog({component:z}).onOk(async d=>{S()})},p=()=>{},c=d=>{window.open("https://joss.jatpowerindo.co.id/servicesAdmin/printInvoice/"+btoa(d),"_blank").focus()},U=d=>{const i={SRVH_DOCNO:d.SRVH_DOCNO,SRVH_ISSDT:x.formatDate(d.SRVH_ISSDT,"YYYY-MM-DD"),SRVH_CUSCD:d.MCUS_CUSCD};let a=[];d.detail.map(t=>{a.push({TSRVD_ITMCD:t.TSRVD_ITMCD,TSRVD_LINE:t.TSRVD_LINE,TSRVD_QTY:t.TSRVD_QTY,TSRVD_CUSTRMK:t.TSRVD_CUSTRMK})}),k.dialog({component:z,componentProps:{header:i,detail:a}}).onOk(async t=>{S()})};return(d,i)=>(C(),$("div",Le,[o("div",Ee,[Ke,o("div",xe,[e(f,{icon:"add",color:"blue",onClick:I},{default:l(()=>[e(T,null,{default:l(()=>[v("Create New Order")]),_:1})]),_:1})])]),e(ue),o("div",Be,[o("div",Fe,[e(ce,{title:"Created Order",rows:y.value,columns:g.value,"row-key":"name",loading:n.value,dense:"",pagination:{rowsPerPage:20},class:"my-sticky-header-column-table"},{"top-right":l(()=>[e(Q,{outlined:"",modelValue:h.value,"onUpdate:modelValue":i[0]||(i[0]=a=>h.value=a),options:g.value,label:"Search Columns","option-value":"name","option-label":"label","emit-value":"",dense:"","map-options":""},null,8,["modelValue","options"]),e(D,{borderless:"",dense:"",modelValue:w.value,"onUpdate:modelValue":[i[1]||(i[1]=a=>w.value=a),i[2]||(i[2]=a=>d.dataQuo())],placeholder:"Search",outlined:"",debounce:"1000"},{append:l(()=>[e(te,{name:"search"})]),_:1},8,["modelValue"])]),header:l(a=>[e(X,{props:a},{default:l(()=>[(C(!0),$(E,null,K(a.cols,t=>(C(),b(W,{key:t.name,props:a},{default:l(()=>[v(Y(t.label),1)]),_:2},1032,["props"]))),128)),e(W,{"auto-width":""},{default:l(()=>[v("Action")]),_:1})]),_:2},1032,["props"])]),body:l(a=>[e(X,{props:a},{default:l(()=>[(C(!0),$(E,null,K(a.cols,t=>(C(),b(Z,{key:t.name,props:a},{default:l(()=>[v(Y(t.value),1)]),_:2},1032,["props"]))),128)),e(Z,{"auto-width":""},{default:l(()=>[e(f,{flat:"",color:"orange",icon:"edit",onClick:t=>U(a.row),dense:"",disable:a.row.detail.filter(t=>t.TSRVD_FLGSTS>0).length>0},{default:l(()=>[e(T,null,{default:l(()=>[v("Edit this Order")]),_:1})]),_:2},1032,["onClick","disable"]),e(f,{flat:"",color:"indigo",icon:"print",onClick:t=>c(a.row.SRVH_DOCNO),dense:""},{default:l(()=>[e(T,null,{default:l(()=>[v("Print this order")]),_:1})]),_:2},1032,["onClick"]),e(f,{flat:"",color:"red",icon:"delete",onClick:t=>d.onClickDelete(a.row.SRVH_DOCNO),dense:"",disable:a.row.detail.filter(t=>t.TSRVD_FLGSTS>0).length>0},{default:l(()=>[e(T,null,{default:l(()=>[v("Delete this Order")]),_:1})]),_:2},1032,["onClick","disable"]),e(f,{flat:"",color:"red",icon:"delete",onClick:t=>p(a.row.SRVH_DOCNO),dense:"",disable:a.row.detail.filter(t=>t.TSRVD_FLGSTS>0).length===0},{default:l(()=>[e(T,null,{default:l(()=>[v("View this Order")]),_:1})]),_:2},1032,["onClick","disable"]),e(f,{flat:"",color:"indigo",icon:"check",onClick:t=>p(a.row.SRVH_DOCNO),dense:"",disable:a.row.detail.filter(t=>t.TSRVD_FLGSTS>0).length!==a.row.detail.length},{default:l(()=>[e(T,null,{default:l(()=>[v(Y(a.row.detail.filter(t=>t.TSRVD_FLGSTS>0).length!==a.row.detail.length?"Please wait until all item checked":"Proceed to service"),1)]),_:2},1024)]),_:2},1032,["onClick","disable"])]),_:2},1024)]),_:2},1032,["props"])]),_:1},8,["rows","columns","loading"])])])]))}};export{el as default};
