import{Q as U}from"./QTooltip.44529649.js";import{s as m,o as W,B as V,C as y,D as l,E as e,J as X,K as A,I as a,P as D,L as Z,Q as M,M as q,O as z,aa as G,aW as x,H as C,R as N,aU as P,aV as Y,aZ as te,aX as E,ap as oe,S as se}from"./index.e2213242.js";import{u as ee,b as K,c as Q,Q as ne,j as B,k as w,l as L,a as de,m as F}from"./use-dialog-plugin-component.ca016396.js";import{d as ie,Q as j,a as J}from"./date.1ba06091.js";import{api_web as O}from"./axios.4608e572.js";import{Q as ue,a as re,C as me}from"./ClosePopup.898fc7d5.js";const ce=a("div",{class:"text-h6"},"Create Item Master",-1),_e={class:"row"},pe={class:"col"},ve={class:"col q-pl-md"},fe={class:"row q-pt-md"},Me={class:"col"},Ce={class:"col q-pl-md"},Ve={class:"row q-pt-md"},De={class:"col"},Ie={class:"col q-pl-md"},Te={class:"row q-pt-md"},ge={class:"col"},be={__name:"itemCreate",props:{ItemCat:String},setup(H){const{dialogRef:R,onDialogHide:b,onDialogOK:S,onDialogCancel:k}=ee(),g=K(),t=m({MITM_ITMCD:"",MITM_ITMNM:"",MITM_STKUOM:"",MITM_ITMTYPE:1,MITM_BRAND:"",MITM_MODEL:"",MITM_SPEC:"",MITM_ITMCAT:"",MITM_COACD:"",MITM_ITMCAT:""}),p=m(!1),h=m([]),c=m([]),n=H;W(()=>{_(),t.value.MITM_ITMCAT=n.ItemCat});const v=(I,s,i,$)=>{s(async()=>{await O.post("item/getListCoasAPI",{search:I}).then(u=>{c.value=u.data})})},r=()=>{g.dialog({title:"Confirmation",message:"Do you want to save this item ?",cancel:!0,persistent:!0}).onOk(async()=>{await O.post("item",t.value).then(I=>{S(I.data.data.value)})})},_=async()=>{p.value=!0,await O.get("item/formAPI").then(I=>{p.value=!1,h.value=I.data.uoms,c.value=I.data.coas}).catch(()=>{p.value=!1})};return(I,s)=>(V(),y(z,{ref_key:"dialogRef",ref:R,onHide:q(b),"transition-show":"slide-up","transition-hide":"slide-down","full-width":"",persistent:""},{default:l(()=>[e(X,{class:"q-dialog-plugin bg-white q-pa-sm"},{default:l(()=>[e(A,null,{default:l(()=>[ce]),_:1}),e(A,{class:"q-pa-sm"},{default:l(()=>[a("div",_e,[a("div",pe,[e(D,{label:"Item Code",dense:"",modelValue:t.value.MITM_ITMCD,"onUpdate:modelValue":s[0]||(s[0]=i=>t.value.MITM_ITMCD=i),filled:""},null,8,["modelValue"])]),a("div",ve,[e(D,{label:"Item Name",dense:"",modelValue:t.value.MITM_ITMNM,"onUpdate:modelValue":s[1]||(s[1]=i=>t.value.MITM_ITMNM=i),filled:""},null,8,["modelValue"])])]),a("div",fe,[a("div",Me,[e(Q,{dense:"",filled:"",label:"UOM",modelValue:t.value.MITM_STKUOM,"onUpdate:modelValue":s[2]||(s[2]=i=>t.value.MITM_STKUOM=i),options:h.value,behavior:"dialog","option-label":"MUOM_UOMNM","option-value":"MUOM_UOMCD","emit-value":"","map-options":"",loading:p.value},null,8,["modelValue","options","loading"])]),a("div",Ce,[e(D,{label:"Item Brand",dense:"",modelValue:t.value.MITM_BRAND,"onUpdate:modelValue":s[3]||(s[3]=i=>t.value.MITM_BRAND=i),filled:""},null,8,["modelValue"])])]),a("div",Ve,[a("div",De,[e(D,{label:"Item Model",dense:"",modelValue:t.value.MITM_MODEL,"onUpdate:modelValue":s[4]||(s[4]=i=>t.value.MITM_MODEL=i),filled:""},null,8,["modelValue"])]),a("div",Ie,[e(D,{label:"Item Specification",dense:"",modelValue:t.value.MITM_SPEC,"onUpdate:modelValue":s[5]||(s[5]=i=>t.value.MITM_SPEC=i),filled:""},null,8,["modelValue"])])]),a("div",Te,[a("div",ge,[e(Q,{dense:"",filled:"",label:"COA",modelValue:t.value.MITM_COACD,"onUpdate:modelValue":s[6]||(s[6]=i=>t.value.MITM_COACD=i),options:c.value,"use-input":"",behavior:"dialog","option-label":"MCOA_COANM","option-value":"MCOA_COACD",onFilter:s[7]||(s[7]=(i,$,u)=>v(i,$,u)),"emit-value":"","map-options":"",loading:p.value},null,8,["modelValue","options","loading"])])])]),_:1}),e(Z,{align:"right"},{default:l(()=>[e(M,{label:"OK",color:"primary",onClick:s[8]||(s[8]=i=>r())}),e(M,{flat:"",label:"Cancel",color:"red",onClick:q(k)},null,8,["onClick"])]),_:1})]),_:1})]),_:1},8,["onHide"]))}},Se=a("div",{class:"text-h6"},"Create Order",-1),he={style:{border:"1px black solid","border-radius":"10px"}},we=a("legend",{style:{"margin-left":"1em",padding:"0.2em 0.8em"}},[a("b",null,"Header")],-1),Oe={class:"row"},ke={class:"col"},Ue={class:"col q-pl-md"},ye={class:"row items-center justify-end"},Re={class:"row"},Qe={class:"col"},$e={style:{border:"1px black solid","border-radius":"10px",height:"35vh",overflow:"auto"}},Ne=a("legend",{style:{"margin-left":"1em",padding:"0.2em 0.8em"}},[a("b",null,"Detail Items")],-1),Ae={class:"row q-pb-sm"},qe={class:"col text-right"},He={__name:"serviceCreateOrder",setup(H){const{dialogRef:R,onDialogHide:b,onDialogOK:S,onDialogCancel:k}=ee(),g=K(),t=m({SRVH_DOCNO:"",SRVH_ISSDT:ie.formatDate(Date.now(),"YYYY-MM-DD"),SRVH_CUSCD:""}),p=m([]),h=m([]),c=m([]),n=m(!1),v=(u,o,d,T)=>{o(async()=>{T==="cust"&&await r(u),T==="item"&&await _(u)})},r=async u=>{n.value=!0,await O.post("customer/searchAPI",{searchValue:u}).then(o=>{n.value=!1,h.value=o.data.data}).catch(()=>{n.value=!1})},_=async u=>{n.value=!0,await O.post("item/searchAPI",{searchValue:u}).then(o=>{n.value=!1,p.value=o.data.data}).catch(()=>{n.value=!1})},I=()=>{c.value.push({TSRVD_ITMCD:"",TSRVD_LINE:c.value.length+1,TSRVD_QTY:1,TSRVD_CUSTRMK:""})},s=u=>{g.dialog({title:"Confirmation",message:`Do you want to delete this lines no ${u+1} ?`,cancel:!0,persistent:!0}).onOk(async()=>{c.value.splice(u,1)})},i=u=>{g.dialog({component:be,componentProps:{ItemCat:"SERVICE_ITEMM"}}).onOk(async o=>{await _(""),c.value[u].TSRVD_ITMCD=o.MITM_ITMNM})},$=()=>{g.dialog({title:"Confirmation",message:"Do you want to submit this data ?",cancel:!0,persistent:!0}).onOk(async()=>{await O.post("servicesAdmin",{header:t.value,detail:c.value}).then(u=>{S()})})};return(u,o)=>(V(),y(z,{ref_key:"dialogRef",ref:R,onHide:q(b),"transition-show":"slide-up","transition-hide":"slide-down","full-width":"",persistent:""},{default:l(()=>[e(X,{class:"q-dialog-plugin bg-white q-pa-sm"},{default:l(()=>[e(A,null,{default:l(()=>[Se]),_:1}),e(A,{class:"q-pa-sm"},{default:l(()=>[a("fieldset",he,[we,a("div",Oe,[a("div",ke,[e(D,{label:"SPK No",readonly:"",dense:"",modelValue:t.value.SRVH_DOCNO,"onUpdate:modelValue":o[0]||(o[0]=d=>t.value.SRVH_DOCNO=d),filled:""},null,8,["modelValue"])]),a("div",Ue,[e(D,{filled:"",modelValue:t.value.SRVH_ISSDT,"onUpdate:modelValue":o[2]||(o[2]=d=>t.value.SRVH_ISSDT=d),dense:"",label:"Issue Date",loading:n.value,onClick:o[3]||(o[3]=d=>u.quotationIssueDate.qDateProxy.show()),mask:"####-##-##","fill-mask":"",hint:"Mask: YYYY-MM-DD"},{append:l(()=>[e(G,{name:"event",class:"cursor-pointer"},{default:l(()=>[e(ue,{cover:"","transition-show":"scale","transition-hide":"scale"},{default:l(()=>[e(re,{modelValue:t.value.SRVH_ISSDT,"onUpdate:modelValue":o[1]||(o[1]=d=>t.value.SRVH_ISSDT=d),mask:"YYYY-MM-DD"},{default:l(()=>[a("div",ye,[x(e(M,{label:"Close",color:"primary",flat:""},null,512),[[me]])])]),_:1},8,["modelValue"])]),_:1})]),_:1})]),_:1},8,["modelValue","loading"])])]),a("div",Re,[a("div",Qe,[e(Q,{dense:"",filled:"",label:"Customer Choose",modelValue:t.value.SRVH_CUSCD,"onUpdate:modelValue":o[4]||(o[4]=d=>t.value.SRVH_CUSCD=d),"use-input":"","input-debounce":"500",options:h.value,onFilter:o[5]||(o[5]=(d,T,f)=>v(d,T,f,"cust")),behavior:"dialog","option-label":"MCUS_CUSNM","option-value":"MCUS_CUSCD","emit-value":"","map-options":"",loading:n.value},null,8,["modelValue","options","loading"])])])]),a("fieldset",$e,[Ne,a("div",Ae,[a("div",qe,[e(M,{flat:"",icon:"add",color:"blue",onClick:o[6]||(o[6]=d=>I())},{default:l(()=>[e(U,null,{default:l(()=>[C("Add lines")]),_:1})]),_:1})])]),e(ne,{bordered:"",dense:""},{default:l(()=>[c.value.length>0?(V(!0),N(P,{key:0},Y(c.value,(d,T)=>(V(),y(B,{key:T,class:"q-my-sm",dense:""},{default:l(()=>[e(w,{avatar:""},{default:l(()=>[e(te,{"text-color":"blue"},{default:l(()=>[C(E(T+1),1)]),_:2},1024)]),_:2},1024),e(w,null,{default:l(()=>[e(L,null,{default:l(()=>[e(Q,{dense:"",filled:"",label:"Item Name",modelValue:d.TSRVD_ITMCD,"onUpdate:modelValue":f=>d.TSRVD_ITMCD=f,"use-input":"","input-debounce":"500",options:p.value,onFilter:o[7]||(o[7]=(f,le,ae)=>v(f,le,ae,"item")),behavior:"dialog","option-label":"MITM_ITMNM","option-value":"MITM_ITMNM","emit-value":"","map-options":"",loading:n.value},null,8,["modelValue","onUpdate:modelValue","options","loading"])]),_:2},1024)]),_:2},1024),e(w,null,{default:l(()=>[e(D,{label:"Qty",filled:"",dense:"",modelValue:d.TSRVD_QTY,"onUpdate:modelValue":f=>d.TSRVD_QTY=f},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1024),e(w,null,{default:l(()=>[e(D,{label:"Problem",filled:"",dense:"",modelValue:d.TSRVD_CUSTRMK,"onUpdate:modelValue":f=>d.TSRVD_CUSTRMK=f},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1024),e(w,{side:""},{default:l(()=>[e(M,{icon:"delete",color:"red",flat:"",onClick:f=>s(T)},{default:l(()=>[e(U,null,{default:l(()=>[C("Delete line")]),_:1})]),_:2},1032,["onClick"])]),_:2},1024),e(w,{side:""},{default:l(()=>[e(M,{icon:"library_add",color:"indigo",flat:"",onClick:f=>i(T)},{default:l(()=>[e(U,null,{default:l(()=>[C("Add new item")]),_:1})]),_:2},1032,["onClick"])]),_:2},1024)]),_:2},1024))),128)):x((V(),y(B,{key:1,class:"q-my-sm",clickable:""},{default:l(()=>[e(w,null,{default:l(()=>[e(L,null,{default:l(()=>[C(" No Items Added ")]),_:1})]),_:1})]),_:1})),[[oe]])]),_:1})])]),_:1}),e(Z,{align:"right"},{default:l(()=>[e(M,{label:"OK",color:"primary",onClick:o[8]||(o[8]=d=>$()),disable:u.stateSubmit},null,8,["disable"]),e(M,{flat:"",label:"Cancel",color:"red",onClick:q(k)},null,8,["onClick"])]),_:1})]),_:1})]),_:1},8,["onHide"]))}};const Pe={class:"q-pa-md"},Ye={class:"row q-pb-md"},Ee=a("div",{class:"col"},[a("span",{class:"text-h4"},"Receive Order ")],-1),Ke={class:"col text-right"},xe={class:"row q-pt-md"},Be={class:"col"},Ze={__name:"serviceView",setup(H){const R=K(),b=m("SRVH_DOCNO"),S=m(""),k=m([]),g=m([{name:"SRVH_DOCNO",label:"SPK No",field:"SRVH_DOCNO",sortable:!0,align:"left"},{name:"SRVH_CUSCD",label:"Cust",field:"SRVH_CUSCD",sortable:!0,align:"left"},{name:"created_at",label:"Created Date",field:"created_at",sortable:!0,align:"left"}]),t=m(!1);W(()=>{p()});const p=async()=>{t.value=!0,await O.post("service/search",{searchBy:b.value,searchValue:S.value}).then(n=>{t.value=!1,k.value=n.data.data}).catch(n=>{t.value=!1})},h=()=>{R.dialog({component:He}).onOk(async n=>{p()})},c=n=>{window.open("https://joss.jatpowerindo.co.id/PDF/quotation/"+btoa(n),"_blank").focus()};return(n,v)=>(V(),N("div",Pe,[a("div",Ye,[Ee,a("div",Ke,[e(M,{icon:"add",color:"blue",onClick:h},{default:l(()=>[e(U,null,{default:l(()=>[C("Create New Order")]),_:1})]),_:1})])]),e(se),a("div",xe,[a("div",Be,[e(de,{title:"Created Order",rows:k.value,columns:g.value,"row-key":"name",loading:t.value,dense:"",pagination:{rowsPerPage:20},class:"my-sticky-header-column-table"},{"top-right":l(()=>[e(Q,{outlined:"",modelValue:b.value,"onUpdate:modelValue":v[0]||(v[0]=r=>b.value=r),options:g.value,label:"Search Columns","option-value":"name","option-label":"label","emit-value":"",dense:"","map-options":""},null,8,["modelValue","options"]),e(D,{borderless:"",dense:"",modelValue:S.value,"onUpdate:modelValue":[v[1]||(v[1]=r=>S.value=r),v[2]||(v[2]=r=>n.dataQuo())],placeholder:"Search",outlined:"",debounce:"1000"},{append:l(()=>[e(G,{name:"search"})]),_:1},8,["modelValue"])]),header:l(r=>[e(j,{props:r},{default:l(()=>[(V(!0),N(P,null,Y(r.cols,_=>(V(),y(F,{key:_.name,props:r},{default:l(()=>[C(E(_.label),1)]),_:2},1032,["props"]))),128)),e(F,{"auto-width":""},{default:l(()=>[C("Action")]),_:1})]),_:2},1032,["props"])]),body:l(r=>[e(j,{props:r},{default:l(()=>[(V(!0),N(P,null,Y(r.cols,_=>(V(),y(J,{key:_.name,props:r},{default:l(()=>[C(E(_.value),1)]),_:2},1032,["props"]))),128)),e(J,{"auto-width":""},{default:l(()=>[e(M,{flat:"",color:"orange",icon:"edit",onClick:_=>n.onClickEdit(r.row.TQUO_QUOCD),dense:""},{default:l(()=>[e(U,null,{default:l(()=>[C("Edit this quotation")]),_:1})]),_:2},1032,["onClick"]),e(M,{flat:"",color:"indigo",icon:"print",onClick:_=>c(r.row.TQUO_QUOCD),dense:""},{default:l(()=>[e(U,null,{default:l(()=>[C("Print this order")]),_:1})]),_:2},1032,["onClick"])]),_:2},1024)]),_:2},1032,["props"])]),_:1},8,["rows","columns","loading"])])])]))}};export{Ze as default};
