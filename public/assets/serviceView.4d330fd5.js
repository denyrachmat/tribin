import{Q as k}from"./QTooltip.b3c77739.js";import{s as m,o as J,B as C,C as y,D as l,E as e,J as W,K as N,I as a,P as T,L as X,Q as f,M as A,O as Z,aa as z,aW as x,H as M,R as $,aU as H,aV as P,aZ as ae,aX as E,ap as te,S as oe}from"./index.84e7fc4a.js";import{u as G,b as Y,c as R,Q as se,j as B,k as O,l as L,a as ne,m as K}from"./use-dialog-plugin-component.b06fdc67.js";import{Q as F,a as j}from"./date.d3b7ef4f.js";import{api_web as U}from"./axios.f114ae70.js";import{Q as de,a as ie,C as ue}from"./ClosePopup.8b411eb8.js";const re=a("div",{class:"text-h6"},"Create Item Master",-1),me={class:"row"},ce={class:"col"},_e={class:"col q-pl-md"},pe={class:"row q-pt-md"},ve={class:"col"},fe={class:"col q-pl-md"},Me={class:"row q-pt-md"},Ce={class:"col"},Ie={class:"col q-pl-md"},Ve={class:"row q-pt-md"},ge={class:"col"},Te={__name:"itemCreate",props:{ItemCat:String},setup(q){const{dialogRef:Q,onDialogHide:D,onDialogOK:h,onDialogCancel:w}=G(),b=Y(),t=m({MITM_ITMCD:"",MITM_ITMNM:"",MITM_STKUOM:"",MITM_ITMTYPE:1,MITM_BRAND:"",MITM_MODEL:"",MITM_SPEC:"",MITM_ITMCAT:"",MITM_COACD:"",MITM_ITMCAT:""}),p=m(!1),S=m([]),c=m([]),n=q;J(()=>{_(),t.value.MITM_ITMCAT=n.ItemCat});const v=(I,s,d,u)=>{s(async()=>{await U.post("item/getListCoasAPI",{search:I}).then(o=>{c.value=o.data})})},i=()=>{b.dialog({title:"Confirmation",message:"Do you want to save this item ?",cancel:!0,persistent:!0}).onOk(async()=>{await U.post("item",t.value).then(I=>{h(I.data.data.value)})})},_=async()=>{p.value=!0,await U.get("item/formAPI").then(I=>{p.value=!1,S.value=I.data.uoms,c.value=I.data.coas}).catch(()=>{p.value=!1})};return(I,s)=>(C(),y(Z,{ref_key:"dialogRef",ref:Q,onHide:A(D),"transition-show":"slide-up","transition-hide":"slide-down","full-width":"",persistent:""},{default:l(()=>[e(W,{class:"q-dialog-plugin bg-white q-pa-sm"},{default:l(()=>[e(N,null,{default:l(()=>[re]),_:1}),e(N,{class:"q-pa-sm"},{default:l(()=>[a("div",me,[a("div",ce,[e(T,{label:"Item Code",dense:"",modelValue:t.value.MITM_ITMCD,"onUpdate:modelValue":s[0]||(s[0]=d=>t.value.MITM_ITMCD=d),filled:""},null,8,["modelValue"])]),a("div",_e,[e(T,{label:"Item Name",dense:"",modelValue:t.value.MITM_ITMNM,"onUpdate:modelValue":s[1]||(s[1]=d=>t.value.MITM_ITMNM=d),filled:""},null,8,["modelValue"])])]),a("div",pe,[a("div",ve,[e(R,{dense:"",filled:"",label:"UOM",modelValue:t.value.MITM_STKUOM,"onUpdate:modelValue":s[2]||(s[2]=d=>t.value.MITM_STKUOM=d),options:S.value,behavior:"dialog","option-label":"MUOM_UOMNM","option-value":"MUOM_UOMCD","emit-value":"","map-options":"",loading:p.value},null,8,["modelValue","options","loading"])]),a("div",fe,[e(T,{label:"Item Brand",dense:"",modelValue:t.value.MITM_BRAND,"onUpdate:modelValue":s[3]||(s[3]=d=>t.value.MITM_BRAND=d),filled:""},null,8,["modelValue"])])]),a("div",Me,[a("div",Ce,[e(T,{label:"Item Model",dense:"",modelValue:t.value.MITM_MODEL,"onUpdate:modelValue":s[4]||(s[4]=d=>t.value.MITM_MODEL=d),filled:""},null,8,["modelValue"])]),a("div",Ie,[e(T,{label:"Item Specification",dense:"",modelValue:t.value.MITM_SPEC,"onUpdate:modelValue":s[5]||(s[5]=d=>t.value.MITM_SPEC=d),filled:""},null,8,["modelValue"])])]),a("div",Ve,[a("div",ge,[e(R,{dense:"",filled:"",label:"COA",modelValue:t.value.MITM_COACD,"onUpdate:modelValue":s[6]||(s[6]=d=>t.value.MITM_COACD=d),options:c.value,"use-input":"",behavior:"dialog","option-label":"MCOA_COANM","option-value":"MCOA_COACD",onFilter:s[7]||(s[7]=(d,u,o)=>v(d,u,o)),"emit-value":"","map-options":"",loading:p.value},null,8,["modelValue","options","loading"])])])]),_:1}),e(X,{align:"right"},{default:l(()=>[e(f,{label:"OK",color:"primary",onClick:s[8]||(s[8]=d=>i())}),e(f,{flat:"",label:"Cancel",color:"red",onClick:A(w)},null,8,["onClick"])]),_:1})]),_:1})]),_:1},8,["onHide"]))}},De=a("div",{class:"text-h6"},"Create Order",-1),be={style:{border:"1px black solid","border-radius":"10px"}},Se=a("legend",{style:{"margin-left":"1em",padding:"0.2em 0.8em"}},[a("b",null,"Header")],-1),he={class:"row"},we={class:"col"},Oe={class:"col q-pl-md"},ke={class:"row items-center justify-end"},ye={class:"row"},Ue={class:"col"},Qe={style:{border:"1px black solid","border-radius":"10px",height:"35vh",overflow:"auto"}},Re=a("legend",{style:{"margin-left":"1em",padding:"0.2em 0.8em"}},[a("b",null,"Detail Items")],-1),$e={class:"row q-pb-sm"},Ne={class:"col text-right"},Ae={__name:"serviceCreateOrder",setup(q){const{dialogRef:Q,onDialogHide:D,onDialogOK:h,onDialogCancel:w}=G(),b=Y(),t=m({SRVH_DOCNO:"",SRVH_ISSDT:"",SRVH_CUSCD:""}),p=m([]),S=m([]),c=m([]),n=m(!1),v=(u,o,r,V)=>{o(async()=>{V==="cust"&&await i(u),V==="item"&&await _(u)})},i=async u=>{n.value=!0,await U.post("customer/searchAPI",{searchValue:u}).then(o=>{n.value=!1,S.value=o.data.data}).catch(()=>{n.value=!1})},_=async u=>{n.value=!0,await U.post("item/searchAPI",{searchValue:u}).then(o=>{n.value=!1,p.value=o.data.data}).catch(()=>{n.value=!1})},I=()=>{c.value.push({TSRVD_ITMCD:"",TSRVD_LINE:c.value.length+1,TSRVD_QTY:1})},s=u=>{b.dialog({title:"Confirmation",message:`Do you want to delete this lines no ${u+1} ?`,cancel:!0,persistent:!0}).onOk(async()=>{c.value.splice(u,1)})},d=u=>{b.dialog({component:Te,componentProps:{ItemCat:"SERVICE_ITEMM"}}).onOk(async o=>{await _(""),c.value[u].TSRVD_ITMCD=o.MITM_ITMNM})};return(u,o)=>(C(),y(Z,{ref_key:"dialogRef",ref:Q,onHide:A(D),"transition-show":"slide-up","transition-hide":"slide-down","full-width":"",persistent:""},{default:l(()=>[e(W,{class:"q-dialog-plugin bg-white q-pa-sm"},{default:l(()=>[e(N,null,{default:l(()=>[De]),_:1}),e(N,{class:"q-pa-sm"},{default:l(()=>[a("fieldset",be,[Se,a("div",he,[a("div",we,[e(T,{label:"SPK No",readonly:"",dense:"",modelValue:t.value.SRVH_DOCNO,"onUpdate:modelValue":o[0]||(o[0]=r=>t.value.SRVH_DOCNO=r),filled:""},null,8,["modelValue"])]),a("div",Oe,[e(T,{filled:"",modelValue:t.value.SRVH_ISSDT,"onUpdate:modelValue":o[2]||(o[2]=r=>t.value.SRVH_ISSDT=r),dense:"",label:"Issue Date",loading:n.value,onClick:o[3]||(o[3]=r=>u.quotationIssueDate.qDateProxy.show()),mask:"####-##-##","fill-mask":"",hint:"Mask: YYYY-MM-DD"},{append:l(()=>[e(z,{name:"event",class:"cursor-pointer"},{default:l(()=>[e(de,{cover:"","transition-show":"scale","transition-hide":"scale"},{default:l(()=>[e(ie,{modelValue:t.value.SRVH_ISSDT,"onUpdate:modelValue":o[1]||(o[1]=r=>t.value.SRVH_ISSDT=r),mask:"YYYY-MM-DD"},{default:l(()=>[a("div",ke,[x(e(f,{label:"Close",color:"primary",flat:""},null,512),[[ue]])])]),_:1},8,["modelValue"])]),_:1})]),_:1})]),_:1},8,["modelValue","loading"])])]),a("div",ye,[a("div",Ue,[e(R,{dense:"",filled:"",label:"Customer Choose",modelValue:t.value.SRVH_CUSCD,"onUpdate:modelValue":o[4]||(o[4]=r=>t.value.SRVH_CUSCD=r),"use-input":"","input-debounce":"500",options:S.value,onFilter:o[5]||(o[5]=(r,V,g)=>v(r,V,g,"cust")),behavior:"dialog","option-label":"MCUS_CUSNM","option-value":"MCUS_CUSCD","emit-value":"","map-options":"",loading:n.value},null,8,["modelValue","options","loading"])])])]),a("fieldset",Qe,[Re,a("div",$e,[a("div",Ne,[e(f,{flat:"",icon:"add",color:"blue",onClick:o[6]||(o[6]=r=>I())},{default:l(()=>[e(k,null,{default:l(()=>[M("Add lines")]),_:1})]),_:1})])]),e(se,{bordered:"",dense:""},{default:l(()=>[c.value.length>0?(C(!0),$(H,{key:0},P(c.value,(r,V)=>(C(),y(B,{key:V,class:"q-my-sm",dense:""},{default:l(()=>[e(O,{avatar:""},{default:l(()=>[e(ae,{"text-color":"blue"},{default:l(()=>[M(E(V+1),1)]),_:2},1024)]),_:2},1024),e(O,null,{default:l(()=>[e(L,null,{default:l(()=>[e(R,{dense:"",filled:"",label:"Item Name",modelValue:r.TSRVD_ITMCD,"onUpdate:modelValue":g=>r.TSRVD_ITMCD=g,"use-input":"","input-debounce":"500",options:p.value,onFilter:o[7]||(o[7]=(g,ee,le)=>v(g,ee,le,"item")),behavior:"dialog","option-label":"MITM_ITMNM","option-value":"MITM_ITMNM","emit-value":"","map-options":"",loading:n.value},null,8,["modelValue","onUpdate:modelValue","options","loading"])]),_:2},1024)]),_:2},1024),e(O,null,{default:l(()=>[e(T,{label:"Qty",filled:"",dense:"",modelValue:r.TSRVD_QTY,"onUpdate:modelValue":g=>r.TSRVD_QTY=g},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1024),e(O,{side:""},{default:l(()=>[e(f,{icon:"delete",color:"red",flat:"",onClick:g=>s(V)},{default:l(()=>[e(k,null,{default:l(()=>[M("Delete line")]),_:1})]),_:2},1032,["onClick"])]),_:2},1024),e(O,{side:""},{default:l(()=>[e(f,{icon:"library_add",color:"indigo",flat:"",onClick:g=>d(V)},{default:l(()=>[e(k,null,{default:l(()=>[M("Add new item")]),_:1})]),_:2},1032,["onClick"])]),_:2},1024)]),_:2},1024))),128)):x((C(),y(B,{key:1,class:"q-my-sm",clickable:""},{default:l(()=>[e(O,null,{default:l(()=>[e(L,null,{default:l(()=>[M(" No Items Added ")]),_:1})]),_:1})]),_:1})),[[te]])]),_:1})])]),_:1}),e(X,{align:"right"},{default:l(()=>[e(f,{label:"OK",color:"primary",onClick:o[8]||(o[8]=r=>u.onSubmitData()),disable:u.stateSubmit},null,8,["disable"]),e(f,{flat:"",label:"Cancel",color:"red",onClick:A(w)},null,8,["onClick"])]),_:1})]),_:1})]),_:1},8,["onHide"]))}};const qe={class:"q-pa-md"},He={class:"row q-pb-md"},Pe=a("div",{class:"col"},[a("span",{class:"text-h4"},"Receive Order ")],-1),Ee={class:"col text-right"},Ye={class:"row q-pt-md"},xe={class:"col"},We={__name:"serviceView",setup(q){const Q=Y(),D=m("SRVH_DOCNO"),h=m(""),w=m([]),b=m([{name:"SRVH_DOCNO",label:"SPK No",field:"SRVH_DOCNO",sortable:!0,align:"left"},{name:"SRVH_CUSCD",label:"Cust",field:"SRVH_CUSCD",sortable:!0,align:"left"},{name:"created_at",label:"Created Date",field:"created_at",sortable:!0,align:"left"}]),t=m(!1);J(()=>{p()});const p=async()=>{t.value=!0,await U.post("service/search",{searchBy:D.value,searchValue:h.value}).then(n=>{t.value=!1,w.value=n.data.data}).catch(n=>{t.value=!1})},S=()=>{Q.dialog({component:Ae}).onOk(async n=>{p()})},c=n=>{window.open("https://joss.jatpowerindo.co.id/PDF/quotation/"+btoa(n),"_blank").focus()};return(n,v)=>(C(),$("div",qe,[a("div",He,[Pe,a("div",Ee,[e(f,{icon:"add",color:"blue",onClick:S},{default:l(()=>[e(k,null,{default:l(()=>[M("Create New Order")]),_:1})]),_:1})])]),e(oe),a("div",Ye,[a("div",xe,[e(ne,{title:"Created Order",rows:w.value,columns:b.value,"row-key":"name",loading:t.value,dense:"",pagination:{rowsPerPage:20},class:"my-sticky-header-column-table"},{"top-right":l(()=>[e(R,{outlined:"",modelValue:D.value,"onUpdate:modelValue":v[0]||(v[0]=i=>D.value=i),options:b.value,label:"Search Columns","option-value":"name","option-label":"label","emit-value":"",dense:"","map-options":""},null,8,["modelValue","options"]),e(T,{borderless:"",dense:"",modelValue:h.value,"onUpdate:modelValue":[v[1]||(v[1]=i=>h.value=i),v[2]||(v[2]=i=>n.dataQuo())],placeholder:"Search",outlined:"",debounce:"1000"},{append:l(()=>[e(z,{name:"search"})]),_:1},8,["modelValue"])]),header:l(i=>[e(F,{props:i},{default:l(()=>[(C(!0),$(H,null,P(i.cols,_=>(C(),y(K,{key:_.name,props:i},{default:l(()=>[M(E(_.label),1)]),_:2},1032,["props"]))),128)),e(K,{"auto-width":""},{default:l(()=>[M("Action")]),_:1})]),_:2},1032,["props"])]),body:l(i=>[e(F,{props:i},{default:l(()=>[(C(!0),$(H,null,P(i.cols,_=>(C(),y(j,{key:_.name,props:i},{default:l(()=>[M(E(_.value),1)]),_:2},1032,["props"]))),128)),e(j,{"auto-width":""},{default:l(()=>[e(f,{flat:"",color:"orange",icon:"edit",onClick:_=>n.onClickEdit(i.row.TQUO_QUOCD),dense:""},{default:l(()=>[e(k,null,{default:l(()=>[M("Edit this quotation")]),_:1})]),_:2},1032,["onClick"]),e(f,{flat:"",color:"indigo",icon:"print",onClick:_=>c(i.row.TQUO_QUOCD),dense:""},{default:l(()=>[e(k,null,{default:l(()=>[M("Print this order")]),_:1})]),_:2},1032,["onClick"])]),_:2},1024)]),_:2},1032,["props"])]),_:1},8,["rows","columns","loading"])])])]))}};export{We as default};
