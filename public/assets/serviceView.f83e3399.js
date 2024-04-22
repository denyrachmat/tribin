import{Q as b}from"./QTooltip.c4457f14.js";import{s as v,o as B,B as C,C as D,D as l,E as e,L as j,M as P,I as s,Z as T,W,Q as f,X as E,Y as X,am as ne,T as z,H as p,P as Q,a$ as N,R as K,S as G,U as de,O as L,V as ue,aX as re}from"./index.9d26e409.js";import{u as Z,a as x,l as q,Q as ce,b as J,c as $,d as ee,k as _e,m as le,w as me}from"./QTable.056d2d86.js";import{Q as te,a as ae}from"./QTd.d0fe8735.js";import{d as F}from"./date.67ae6a3b.js";import{api_web as w}from"./axios.79ddf5a9.js";import{Q as Ce,a as Se,C as fe}from"./ClosePopup.65264c37.js";import{_ as ve}from"./serviceOprUpdateOrder.d4b24a44.js";import"./use-cache.b0833c75.js";import"./QBtnGroup.5e1e23be.js";import"./QBadge.9ff8242b.js";const pe=s("div",{class:"text-h6"},"Create Item Master",-1),De={class:"row"},Te={class:"col"},Me={class:"col q-pl-md"},Ve={class:"row q-pt-md"},ge={class:"col"},he={class:"col q-pl-md"},Re={class:"row q-pt-md"},Ie={class:"col"},be={class:"col q-pl-md"},we={class:"row q-pt-md"},ke={class:"col"},Ue={__name:"itemCreate",props:{ItemCat:String},setup(Y){const{dialogRef:h,onDialogHide:k,onDialogOK:U,onDialogCancel:y}=Z(),R=x(),o=v({MITM_ITMCD:"",MITM_ITMNM:"",MITM_STKUOM:"",MITM_ITMTYPE:1,MITM_BRAND:"",MITM_MODEL:"",MITM_SPEC:"",MITM_ITMCAT:"",MITM_COACD:"",MITM_ITMCAT:""}),r=v(!1),M=v([]),g=v([]),c=Y;B(()=>{A(),o.value.MITM_ITMCAT=c.ItemCat});const u=(V,_,t,m)=>{_(async()=>{await w.post("item/getListCoasAPI",{search:V}).then(n=>{g.value=n.data})})},H=()=>{R.dialog({title:"Confirmation",message:"Do you want to save this item ?",cancel:!0,persistent:!0}).onOk(async()=>{await w.post("item",o.value).then(V=>{U(V.data.data.value)})})},A=async()=>{r.value=!0,await w.get("item/formAPI").then(V=>{r.value=!1,M.value=V.data.uoms,g.value=V.data.coas}).catch(()=>{r.value=!1})};return(V,_)=>(C(),D(X,{ref_key:"dialogRef",ref:h,onHide:E(k),"transition-show":"slide-up","transition-hide":"slide-down","full-width":"",persistent:""},{default:l(()=>[e(j,{class:"q-dialog-plugin bg-white q-pa-sm"},{default:l(()=>[e(P,null,{default:l(()=>[pe]),_:1}),e(P,{class:"q-pa-sm"},{default:l(()=>[s("div",De,[s("div",Te,[e(T,{label:"Item Code",dense:"",modelValue:o.value.MITM_ITMCD,"onUpdate:modelValue":_[0]||(_[0]=t=>o.value.MITM_ITMCD=t),filled:""},null,8,["modelValue"])]),s("div",Me,[e(T,{label:"Item Name",dense:"",modelValue:o.value.MITM_ITMNM,"onUpdate:modelValue":_[1]||(_[1]=t=>o.value.MITM_ITMNM=t),filled:""},null,8,["modelValue"])])]),s("div",Ve,[s("div",ge,[e(q,{dense:"",filled:"",label:"UOM",modelValue:o.value.MITM_STKUOM,"onUpdate:modelValue":_[2]||(_[2]=t=>o.value.MITM_STKUOM=t),options:M.value,behavior:"dialog","option-label":"MUOM_UOMNM","option-value":"MUOM_UOMCD","emit-value":"","map-options":"",loading:r.value},null,8,["modelValue","options","loading"])]),s("div",he,[e(T,{label:"Item Brand",dense:"",modelValue:o.value.MITM_BRAND,"onUpdate:modelValue":_[3]||(_[3]=t=>o.value.MITM_BRAND=t),filled:""},null,8,["modelValue"])])]),s("div",Re,[s("div",Ie,[e(T,{label:"Item Model",dense:"",modelValue:o.value.MITM_MODEL,"onUpdate:modelValue":_[4]||(_[4]=t=>o.value.MITM_MODEL=t),filled:""},null,8,["modelValue"])]),s("div",be,[e(T,{label:"Item Specification",dense:"",modelValue:o.value.MITM_SPEC,"onUpdate:modelValue":_[5]||(_[5]=t=>o.value.MITM_SPEC=t),filled:""},null,8,["modelValue"])])]),s("div",we,[s("div",ke,[e(q,{dense:"",filled:"",label:"COA",modelValue:o.value.MITM_COACD,"onUpdate:modelValue":_[6]||(_[6]=t=>o.value.MITM_COACD=t),options:g.value,"use-input":"",behavior:"dialog","option-label":"MCOA_COANM","option-value":"MCOA_COACD",onFilter:_[7]||(_[7]=(t,m,n)=>u(t,m,n)),"emit-value":"","map-options":"",loading:r.value},null,8,["modelValue","options","loading"])])])]),_:1}),e(W,{align:"right"},{default:l(()=>[e(f,{label:"OK",color:"primary",onClick:_[8]||(_[8]=t=>H())}),e(f,{flat:"",label:"Cancel",color:"red",onClick:E(y)},null,8,["onClick"])]),_:1})]),_:1})]),_:1},8,["onHide"]))}},Oe=s("div",{class:"text-h6"},"Create New Customer Data",-1),ye={class:"row q-pb-md"},Ne={class:"col"},Ae={class:"row q-pb-md"},$e={class:"col"},He={class:"col q-pl-md"},Le={class:"row"},Qe={class:"col"},Pe={__name:"customerView",setup(Y){const{dialogRef:h,onDialogHide:k,onDialogOK:U,onDialogCancel:y}=Z(),R=x(),o=v({MCUS_CUSCD:"",MCUS_CUSNM:"",MCUS_CURCD:"IDR",MCUS_TAXREG:"-",MCUS_ADDR1:"",MCUS_TELNO:"",MCUS_PIC_NAME:"-",MCUS_PIC_TELNO:"-",MCUS_TYPE:1,MCUS_GROUP:"SERVICE",MCUS_EMAIL:""}),r=v(!1),M=()=>{R.dialog({title:"Confirmation",message:"Do you want to save this customer ?",cancel:!0,persistent:!0}).onOk(async()=>{r.value=!0,await w.post("customer",o.value).then(g=>{r.value=!1,U(g.data)}).catch(g=>{r.value=!1})})};return(g,c)=>(C(),D(X,{ref_key:"dialogRef",ref:h,onHide:E(k),"transition-show":"slide-up","transition-hide":"slide-down","full-width":""},{default:l(()=>[e(j,{class:"q-dialog-plugin bg-white q-pa-sm"},{default:l(()=>[e(P,null,{default:l(()=>[Oe]),_:1}),e(P,{class:"q-pa-sm"},{default:l(()=>[s("div",ye,[s("div",Ne,[e(T,{label:"Customer Name",dense:"",modelValue:o.value.MCUS_CUSNM,"onUpdate:modelValue":c[0]||(c[0]=u=>o.value.MCUS_CUSNM=u),filled:""},null,8,["modelValue"])])]),s("div",Ae,[s("div",$e,[e(T,{label:"Customer Email",dense:"",modelValue:o.value.MCUS_EMAIL,"onUpdate:modelValue":c[1]||(c[1]=u=>o.value.MCUS_EMAIL=u),filled:""},null,8,["modelValue"])]),s("div",He,[e(T,{label:"Customer Phone",dense:"",modelValue:o.value.MCUS_TELNO,"onUpdate:modelValue":c[2]||(c[2]=u=>o.value.MCUS_TELNO=u),filled:"",mask:"####-####-####"},null,8,["modelValue"])])]),s("div",Le,[s("div",Qe,[e(T,{label:"Customer Address",dense:"",modelValue:o.value.MCUS_ADDR1,"onUpdate:modelValue":c[3]||(c[3]=u=>o.value.MCUS_ADDR1=u),filled:"",type:"textarea"},null,8,["modelValue"])])])]),_:1}),e(W,{align:"right"},{default:l(()=>[e(f,{label:"OK",color:"primary",onClick:c[4]||(c[4]=u=>M()),loading:r.value},null,8,["loading"]),e(f,{flat:"",label:"Cancel",color:"red",onClick:E(y),loading:r.value},null,8,["onClick","loading"])]),_:1})]),_:1})]),_:1},8,["onHide"]))}},Ee=s("div",{class:"text-h6"},"Create Order",-1),Ye={style:{border:"1px black solid","border-radius":"10px"}},qe=s("legend",{style:{"margin-left":"1em",padding:"0.2em 0.8em"}},[s("b",null,"Header")],-1),Fe={class:"row"},xe={class:"col"},Ke={class:"col q-pl-md"},Ge={class:"row items-center justify-end"},Be={class:"row"},je={class:"col"},We={style:{border:"1px black solid","border-radius":"10px",height:"35vh",overflow:"auto"}},Xe=s("legend",{style:{"margin-left":"1em",padding:"0.2em 0.8em"}},[s("b",null,"Detail Items")],-1),Ze={key:0,class:"row q-pb-sm"},ze={class:"col text-right"},oe={__name:"serviceCreateOrder",props:{header:Array,detail:Array,mode:String},setup(Y){const{dialogRef:h,onDialogHide:k,onDialogOK:U,onDialogCancel:y}=Z(),R=x(),o=Y;B(async()=>{o.header&&(await A(),await V(),r.value=o.header,c.value=o.detail)});const r=v({SRVH_DOCNO:"",SRVH_ISSDT:F.formatDate(Date.now(),"YYYY-MM-DD"),SRVH_CUSCD:""}),M=v([]),g=v([]),c=v([]),u=v(!1),H=(S,i,d,O)=>{i(async()=>{O==="cust"&&await A(S),O==="item"&&await V(S)})},A=async S=>{u.value=!0,await w.post("customer/searchAPI",{searchValue:S}).then(i=>{u.value=!1,g.value=i.data.data}).catch(()=>{u.value=!1})},V=async S=>{u.value=!0,await w.post("item/searchAPI",{searchValue:S}).then(i=>{u.value=!1,M.value=i.data.data}).catch(()=>{u.value=!1})},_=()=>{c.value.push({TSRVD_ITMCD:"",TSRVD_LINE:c.value.length+1,TSRVD_QTY:1,TSRVD_CUSTRMK:""})},t=S=>{R.dialog({title:"Confirmation",message:`Do you want to delete this lines no ${S+1} ?`,cancel:!0,persistent:!0}).onOk(async()=>{c.value.splice(S,1)})},m=S=>{R.dialog({component:Ue,componentProps:{ItemCat:"SERVICE_ITEMM"}}).onOk(async i=>{await V(""),c.value[S].TSRVD_ITMCD=i.MITM_ITMNM})},n=()=>{R.dialog({title:"Confirmation",message:"Do you want to submit this data ?",cancel:!0,persistent:!0}).onOk(async()=>{u.value=!0,await w.post("servicesAdmin",{header:r.value,detail:c.value}).then(S=>{u.value=!1,U()})})},a=()=>{R.dialog({component:Pe}).onOk(async S=>{console.log(S),await A(""),c.value[idx].SRVH_CUSCD=S.MCUS_CUSCD})};return(S,i)=>(C(),D(X,{ref_key:"dialogRef",ref:h,onHide:E(k),"transition-show":"slide-up","transition-hide":"slide-down","full-width":"",persistent:""},{default:l(()=>[e(j,{class:"q-dialog-plugin bg-white q-pa-sm"},{default:l(()=>[e(P,null,{default:l(()=>[Ee]),_:1}),e(P,{class:"q-pa-sm"},{default:l(()=>[s("fieldset",Ye,[qe,s("div",Fe,[s("div",xe,[e(T,{label:"SPK No",readonly:"",dense:"",modelValue:r.value.SRVH_DOCNO,"onUpdate:modelValue":i[0]||(i[0]=d=>r.value.SRVH_DOCNO=d),filled:""},null,8,["modelValue"])]),s("div",Ke,[e(T,{filled:"",modelValue:r.value.SRVH_ISSDT,"onUpdate:modelValue":i[2]||(i[2]=d=>r.value.SRVH_ISSDT=d),dense:"",label:"Issue Date",loading:u.value,onClick:i[3]||(i[3]=d=>S.quotationIssueDate.qDateProxy.show()),mask:"####-##-##","fill-mask":"",hint:"Mask: YYYY-MM-DD",readonly:o.mode==="view"},{append:l(()=>[e(ne,{name:"event",class:"cursor-pointer",disable:o.mode==="view"},{default:l(()=>[e(Ce,{cover:"","transition-show":"scale","transition-hide":"scale"},{default:l(()=>[e(Se,{modelValue:r.value.SRVH_ISSDT,"onUpdate:modelValue":i[1]||(i[1]=d=>r.value.SRVH_ISSDT=d),mask:"YYYY-MM-DD"},{default:l(()=>[s("div",Ge,[z(e(f,{label:"Close",color:"primary",flat:""},null,512),[[fe]])])]),_:1},8,["modelValue"])]),_:1})]),_:1},8,["disable"])]),_:1},8,["modelValue","loading","readonly"])])]),s("div",Be,[s("div",je,[e(q,{dense:"",filled:"",label:"Customer Choose",modelValue:r.value.SRVH_CUSCD,"onUpdate:modelValue":i[5]||(i[5]=d=>r.value.SRVH_CUSCD=d),"use-input":"","input-debounce":"500",options:g.value,onFilter:i[6]||(i[6]=(d,O,I)=>H(d,O,I,"cust")),behavior:"dialog","option-label":"MCUS_CUSNM","option-value":"MCUS_CUSCD","emit-value":"","map-options":"",loading:u.value,readonly:o.mode==="view"},{after:l(()=>[e(f,{round:"",dense:"",flat:"",icon:"person_add",onClick:i[4]||(i[4]=d=>a()),color:"cyan"},{default:l(()=>[e(b,null,{default:l(()=>[p("Add new customer")]),_:1})]),_:1})]),_:1},8,["modelValue","options","loading","readonly"])])])]),s("fieldset",We,[Xe,o.mode!=="view"?(C(),Q("div",Ze,[s("div",ze,[e(f,{flat:"",icon:"add",color:"blue",onClick:i[7]||(i[7]=d=>_())},{default:l(()=>[e(b,null,{default:l(()=>[p("Add lines")]),_:1})]),_:1})])])):N("",!0),e(ce,{bordered:"",dense:""},{default:l(()=>[c.value.length>0?(C(!0),Q(K,{key:0},G(c.value,(d,O)=>(C(),D(J,{key:O,class:"q-my-sm",dense:""},{default:l(()=>[e($,{avatar:""},{default:l(()=>[e(de,{"text-color":"blue"},{default:l(()=>[p(L(O+1),1)]),_:2},1024)]),_:2},1024),e($,null,{default:l(()=>[e(ee,null,{default:l(()=>[e(q,{dense:"",filled:"",label:"Item Name",modelValue:d.TSRVD_ITMCD,"onUpdate:modelValue":I=>d.TSRVD_ITMCD=I,"use-input":"","input-debounce":"500",options:M.value,onFilter:i[8]||(i[8]=(I,se,ie)=>H(I,se,ie,"item")),behavior:"dialog","option-label":"MITM_ITMNM","option-value":"MITM_ITMNM","emit-value":"","map-options":"",loading:u.value},null,8,["modelValue","onUpdate:modelValue","options","loading"])]),_:2},1024)]),_:2},1024),e($,null,{default:l(()=>[e(T,{label:"Qty",filled:"",dense:"",modelValue:d.TSRVD_QTY,"onUpdate:modelValue":I=>d.TSRVD_QTY=I},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1024),e($,null,{default:l(()=>[e(T,{label:"Problem",filled:"",dense:"",modelValue:d.TSRVD_CUSTRMK,"onUpdate:modelValue":I=>d.TSRVD_CUSTRMK=I},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1024),o.mode!=="view"?(C(),D($,{key:0,side:""},{default:l(()=>[e(f,{icon:"delete",color:"red",flat:"",onClick:I=>t(O)},{default:l(()=>[e(b,null,{default:l(()=>[p("Delete line")]),_:1})]),_:2},1032,["onClick"])]),_:2},1024)):N("",!0),o.mode!=="view"?(C(),D($,{key:1,side:""},{default:l(()=>[e(f,{icon:"library_add",color:"indigo",flat:"",onClick:I=>m(O)},{default:l(()=>[e(b,null,{default:l(()=>[p("Add new item")]),_:1})]),_:2},1032,["onClick"])]),_:2},1024)):N("",!0)]),_:2},1024))),128)):z((C(),D(J,{key:1,class:"q-my-sm",clickable:""},{default:l(()=>[e($,null,{default:l(()=>[e(ee,null,{default:l(()=>[p(" No Items Added ")]),_:1})]),_:1})]),_:1})),[[ue]])]),_:1})])]),_:1}),e(W,{align:"right"},{default:l(()=>[e(f,{label:"OK",color:"primary",onClick:i[9]||(i[9]=d=>n()),disable:u.value,loading:u.value},null,8,["disable","loading"]),e(f,{flat:"",label:"Cancel",color:"red",onClick:E(y),loading:u.value},null,8,["onClick","loading"])]),_:1})]),_:1})]),_:1},8,["onHide"]))}};const Je={class:"q-pa-md"},el={class:"row q-pb-md"},ll=s("div",{class:"col"},[s("span",{class:"text-h4"},"Receive Order ")],-1),tl={class:"col text-right"},al={class:"row q-pt-md"},ol={class:"col"},nl={key:1},vl={__name:"serviceView",setup(Y){const h=x(),k=v("SRVH_DOCNO"),U=v(""),y=v([]),R=v([{name:"SRVH_DOCNO",label:"SPK No",field:"SRVH_DOCNO",sortable:!0,align:"left"},{name:"MCUS_CUSNM",label:"Cust",field:"MCUS_CUSNM",sortable:!0,align:"left"},{name:"STAT",label:"Status",field:t=>_(t),sortable:!0,align:"left"},{name:"created_at",label:"Created Date",field:"created_at",sortable:!0,align:"left",format:t=>F.formatDate(new Date(t),"DD MMM YYYY")}]),o=v(!1),r=v(null);B(()=>{M(),r.value=setInterval(()=>{M()},1e4)});const M=async()=>{o.value=!0,await w.post("servicesAdmins/search",{searchBy:k.value,searchValue:U.value}).then(t=>{o.value=!1,y.value=t.data.data}).catch(t=>{o.value=!1})},g=()=>{h.dialog({component:oe}).onOk(async t=>{M()})},c=t=>{const m={SRVH_DOCNO:t.SRVH_DOCNO,SRVH_ISSDT:F.formatDate(t.SRVH_ISSDT,"YYYY-MM-DD"),SRVH_CUSCD:t.MCUS_CUSCD};let n=[];t.detail.map(a=>{n.push({id:a.id,TSRVD_ITMCD:a.TSRVD_ITMCD,TSRVD_LINE:a.TSRVD_LINE,TSRVD_QTY:a.TSRVD_QTY,TSRVD_CUSTRMK:a.TSRVD_CUSTRMK,TSRVD_REMARK:a.TSRVD_REMARK,TSRVD_FLGSTS:a.TSRVD_FLGSTS,listFixDet:a.list_fix_det})}),h.dialog({component:ve,componentProps:{header:m,detail:n,mode:t.detail.filter(a=>a.TSRVD_FLGSTS===1).length===t.detail.length?"approvecust":"view"}}).onOk(async a=>{M()})},u=t=>{window.open("https://joss.jatpowerindo.co.id/servicesAdmins/printInvoice/"+btoa(t),"_blank").focus()},H=t=>{const m={SRVH_DOCNO:t.SRVH_DOCNO,SRVH_ISSDT:F.formatDate(t.SRVH_ISSDT,"YYYY-MM-DD"),SRVH_CUSCD:t.MCUS_CUSCD};let n=[];t.detail.map(a=>{n.push({TSRVD_ITMCD:a.TSRVD_ITMCD,TSRVD_LINE:a.TSRVD_LINE,TSRVD_QTY:a.TSRVD_QTY,TSRVD_CUSTRMK:a.TSRVD_CUSTRMK})}),h.dialog({component:oe,componentProps:{header:m,detail:n}}).onOk(async a=>{M()})},A=t=>{h.dialog({title:"Confirmation",message:"Do you want to proceed to service ?",cancel:!0,persistent:!0}).onOk(async()=>{o.value=!0,await w.put(`servicesAdmin/${btoa(t.SRVH_DOCNO)}`,{TSRVD_FLGSTS:2}).then(m=>{o.value=!1}).catch(m=>{o.value=!1})})},V=t=>{h.dialog({title:"Confirmation",message:"Are you sure want to delete this order ?",cancel:!0,persistent:!0}).onOk(async()=>{o.value=!0,await w.delete(`servicesAdmin/${btoa(t.SRVH_DOCNO)}`).then(m=>{o.value=!1}).catch(m=>{o.value=!1})})},_=t=>{const m=t.detail.filter(d=>d.TSRVD_FLGSTS==0),n=t.detail.filter(d=>d.TSRVD_FLGSTS==1),a=t.detail.filter(d=>d.TSRVD_FLGSTS==2),S=t.detail.filter(d=>d.TSRVD_FLGSTS==3),i=t.detail.filter(d=>d.TSRVD_FLGSTS==5);if(m.length==t.detail.length)return{color:"red",label:"No Price Added yet !",icon:"edit"};if(n.length>0&&n.length<t.detail.length)return{color:"warning",label:"Please Add item & price",icon:"payments"};if(i.length>0&&i.length==t.detail.length)return{color:"indigo",label:"Added Price Done, Waiting Manager Confirmation",icon:"price_check"};if(n.length>0&&n.length==t.detail.length)return{color:"green",label:"Manager has been approve, Waiting Cust. Confirmation",icon:"price_check"};if(a.length>0&&a.length>=t.detail.length)return{color:"cyan",label:"Cust. has been approved, continue to fix.",icon:"engineering"};if(S.length>0&&S.length===t.detail.length)return{color:"primary",label:"Fix has been done",icon:"fact_check"}};return(t,m)=>(C(),Q("div",Je,[s("div",el,[ll,s("div",tl,[e(f,{icon:"add",color:"blue",onClick:g},{default:l(()=>[e(b,null,{default:l(()=>[p("Create New Order")]),_:1})]),_:1})])]),e(re),s("div",al,[s("div",ol,[e(_e,{title:"Created Order",rows:y.value,columns:R.value,"row-key":"name",loading:o.value,dense:"",pagination:{rowsPerPage:20},class:"my-sticky-header-column-table"},{"top-right":l(()=>[e(q,{outlined:"",modelValue:k.value,"onUpdate:modelValue":m[0]||(m[0]=n=>k.value=n),options:R.value,label:"Search Columns","option-value":"name","option-label":"label","emit-value":"",dense:"","map-options":""},null,8,["modelValue","options"]),e(T,{borderless:"",dense:"",modelValue:U.value,"onUpdate:modelValue":[m[1]||(m[1]=n=>U.value=n),m[2]||(m[2]=n=>t.dataQuo())],placeholder:"Search",outlined:"",debounce:"1000"},{append:l(()=>[e(ne,{name:"search"})]),_:1},8,["modelValue"])]),header:l(n=>[e(te,{props:n},{default:l(()=>[(C(!0),Q(K,null,G(n.cols,a=>(C(),D(le,{key:a.name,props:n},{default:l(()=>[p(L(a.label),1)]),_:2},1032,["props"]))),128)),e(le,{"auto-width":""},{default:l(()=>[p("Action")]),_:1})]),_:2},1032,["props"])]),body:l(n=>[e(te,{props:n},{default:l(()=>[(C(!0),Q(K,null,G(n.cols,a=>(C(),D(ae,{key:a.name,props:n},{default:l(()=>[a.name==="STAT"?(C(),D(me,{key:0,clickable:"",color:a.value.color,"text-color":"white",icon:a.value.icon},{default:l(()=>[p(L(a.value.label),1)]),_:2},1032,["color","icon"])):(C(),Q("span",nl,L(a.value),1))]),_:2},1032,["props"]))),128)),e(ae,{"auto-width":""},{default:l(()=>[n.row.detail.filter(a=>a.TSRVD_FLGSTS>0).length===0?(C(),D(f,{key:0,flat:"",color:"orange",icon:"edit",onClick:a=>H(n.row),dense:""},{default:l(()=>[e(b,null,{default:l(()=>[p("Edit this Order")]),_:1})]),_:2},1032,["onClick"])):N("",!0),n.row.detail.filter(a=>a.TSRVD_FLGSTS>0).length===n.row.detail.length?(C(),D(f,{key:1,flat:"",color:"indigo",icon:"print",onClick:a=>u(n.row.SRVH_DOCNO),dense:""},{default:l(()=>[e(b,null,{default:l(()=>[p("Print this order")]),_:1})]),_:2},1032,["onClick"])):N("",!0),n.row.detail.filter(a=>a.TSRVD_FLGSTS>0).length===0?(C(),D(f,{key:2,flat:"",color:"red",icon:"delete",onClick:a=>V(n.row.SRVH_DOCNO),dense:""},{default:l(()=>[e(b,null,{default:l(()=>[p(L(n.row.detail.filter(a=>a.TSRVD_FLGSTS>0).length>0?"Cannot delete processed order":"Delete this Order"),1)]),_:2},1024)]),_:2},1032,["onClick"])):N("",!0),n.row.detail.filter(a=>a.TSRVD_FLGSTS>0).length>0?(C(),D(f,{key:3,flat:"",color:"cyan",icon:"visibility",onClick:a=>c(n.row),dense:""},{default:l(()=>[e(b,null,{default:l(()=>[p("View this Order")]),_:1})]),_:2},1032,["onClick"])):N("",!0),n.row.detail.filter(a=>a.TSRVD_FLGSTS==1).length===n.row.detail.length?(C(),D(f,{key:4,flat:"",color:"indigo",icon:"check",onClick:a=>A(n.row.SRVH_DOCNO),dense:""},{default:l(()=>[e(b,null,{default:l(()=>[p(L(n.row.detail.filter(a=>a.TSRVD_FLGSTS>0).length!==n.row.detail.length?"Please wait until all item checked":"Proceed all item to service"),1)]),_:2},1024)]),_:2},1032,["onClick"])):N("",!0)]),_:2},1024)]),_:2},1032,["props"])]),_:1},8,["rows","columns","loading"])])])]))}};export{vl as default};
