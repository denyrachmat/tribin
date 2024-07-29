import{t as c,o as S,C as p,D as P,E as l,F as e,M as H,O as M,J as o,$ as k,R as Q,S as I,T as q,a0 as z,aZ as K,X as W,Q as E,Y as N,Z,aI as G,av as J,I as T,P as y}from"./index.50b62a57.js";import{Q as V}from"./QSelect.b71cc6f2.js";import{Q as X,a as x}from"./QTable.b912197d.js";import{Q as U,a as B}from"./QTd.f204c287.js";import{Q as F}from"./QTooltip.a057eefd.js";import{api_web as D}from"./axios.7f6d9a9e.js";import{u as $}from"./use-quasar.8013322c.js";import{Q as j,a as ee}from"./QInnerLoading.8fcd893e.js";import{u as ae}from"./use-dialog-plugin-component.1efadce1.js";import"./QItemLabel.c6165783.js";import"./format.9c7080c9.js";import"./QList.56f6ca6d.js";const le=o("div",{class:"text-h6"},"Request Part",-1),oe={style:{border:"1px black solid","border-radius":"10px"}},te=o("legend",{style:{"margin-left":"1em",padding:"0.2em 0.8em"}},[o("b",null,"Header")],-1),ne={class:"row q-col-gutter-md"},se={class:"col-12"},ie={style:{border:"1px black solid","border-radius":"10px",height:"35vh",overflow:"auto"}},de=o("legend",{style:{"margin-left":"1em",padding:"0.2em 0.8em"}},[o("b",null,"List Of Items")],-1),re={class:"col-12 col-sm-3"},ue={class:"col-12 col-sm-3"},ce={class:"col-12 col-sm-3"},me={class:"col-12 col-sm-2"},pe={class:"col-12 col-sm-1"},fe={__name:"transferRequestPreview",props:{dataHeader:Array,dataDet:Array,qtyOnly:Boolean},setup(A){const b=$(),C=A,O=c({TLOCREQ_DOCNO:"",TLOCREQ_FRLOC:"",TLOCREQ_TOLOC:""}),u=c([]),f=c([]),_=c([]),i=c(!1);S(async()=>{console.log(C),await h(""),await d(""),O.value=C.dataHeader,_.value=C.dataDet});const g=(v,n,t,w)=>{n(async()=>{w==="loc"&&await h(v),w==="item"&&await d(v)})},h=async(v,n="MSUP_SUPNM")=>{i.value=!0,await D.post("location/searchAPI",{searchBy:n,searchValue:v}).then(t=>{i.value=!1,f.value=t.data.data}).catch(t=>{i.value=!1})},d=async v=>{i.value=!0,await D.post("item/searchAPITBL",{searchValue:v}).then(n=>{i.value=!1,u.value=n.data.data}).catch(()=>{i.value=!1})},r=()=>{b.dialog({title:"Confirmation",message:"Are you sure want to send this request ?",cancel:!0,persistent:!0}).onOk(async()=>{i.value=!0})},{dialogRef:a,onDialogHide:m,onDialogOK:ge,onDialogCancel:Y}=ae();return(v,n)=>(p(),P(Z,{ref_key:"dialogRef",ref:a,onHide:N(m),"transition-show":"slide-up","transition-hide":"slide-down","full-width":"",persistent:""},{default:l(()=>[e(H,{class:"q-dialog-plugin bg-white q-pa-sm"},{default:l(()=>[e(M,null,{default:l(()=>[le]),_:1}),e(M,{class:"q-pa-sm"},{default:l(()=>[o("fieldset",oe,[te,e(j,{showing:i.value,dark:""},{default:l(()=>[e(ee,{size:"50px",color:"primary"})]),_:1},8,["showing"]),o("div",ne,[o("div",se,[e(k,{label:"Doc No",dense:"",filled:"",modelValue:O.value.TLOCREQ_DOCNO,"onUpdate:modelValue":n[0]||(n[0]=t=>O.value.TLOCREQ_DOCNO=t),readonly:!0},null,8,["modelValue"])])])]),o("fieldset",ie,[de,_.value.length>0?(p(!0),Q(I,{key:0},q(_.value,(t,w)=>(p(),Q("div",{class:"row q-col-gutter-md q-pt-md",key:w,style:{"font-size":"10px"}},[o("div",re,[e(V,{dense:"",filled:"",label:"Item Name",modelValue:t.TLOCREQ_ITMCD,"onUpdate:modelValue":s=>t.TLOCREQ_ITMCD=s,"use-input":"","input-debounce":"500",options:u.value,onFilter:n[1]||(n[1]=(s,L,R)=>g(s,L,R,"item")),behavior:"dialog","option-label":"MITM_ITMNM","option-value":"MITM_ITMCD","emit-value":"","map-options":"",loading:i.value,readonly:!0,"input-style":"font-size:11px"},null,8,["modelValue","onUpdate:modelValue","options","loading"])]),o("div",ue,[e(V,{dense:"",filled:"",label:"Transfer From",modelValue:t.TLOCREQ_FRLOC,"onUpdate:modelValue":s=>t.TLOCREQ_FRLOC=s,"use-input":"","input-debounce":"500",options:f.value,onFilter:n[2]||(n[2]=(s,L,R)=>g(s,L,R,"loc")),behavior:"dialog","option-label":"MLOC_LOCNM","option-value":"MLOC_LOCCD","emit-value":"","map-options":"",loading:i.value,readonly:!0},null,8,["modelValue","onUpdate:modelValue","options","loading"])]),o("div",ce,[e(V,{dense:"",filled:"",label:"Transfer To",modelValue:t.TLOCREQ_TOLOC,"onUpdate:modelValue":s=>t.TLOCREQ_TOLOC=s,"use-input":"","input-debounce":"500",options:f.value,onFilter:n[3]||(n[3]=(s,L,R)=>g(s,L,R,"loc")),behavior:"dialog","option-label":"MLOC_LOCNM","option-value":"MLOC_LOCCD","emit-value":"","map-options":"",loading:i.value,readonly:!0},null,8,["modelValue","onUpdate:modelValue","options","loading"])]),o("div",me,[e(k,{label:"Qty",dense:"",filled:"",modelValue:t.TLOCREQ_QTY,"onUpdate:modelValue":s=>t.TLOCREQ_QTY=s},null,8,["modelValue","onUpdate:modelValue"])]),o("div",pe,[e(z,{modelValue:t.TLOCREQ_ISREP,"onUpdate:modelValue":s=>t.TLOCREQ_ISREP=s,label:"Is replacement ?",color:"teal","true-value":1,"false-value":0,disable:!0},null,8,["modelValue","onUpdate:modelValue"])])]))),128)):K("",!0)])]),_:1}),e(W,{align:"right"},{default:l(()=>[e(E,{label:"approve",color:"primary",onClick:n[4]||(n[4]=t=>r()),loading:i.value},null,8,["loading"]),e(E,{flat:"",label:"Cancel",color:"red",onClick:N(Y)},null,8,["onClick"])]),_:1})]),_:1})]),_:1},8,["onHide"]))}},_e={class:"q-pa-md"},ve=o("div",{class:"row q-pb-md"},[o("div",{class:"col"},[o("span",{class:"text-h4"},"Transfer Request")]),o("div",{class:"col text-right"})],-1),Ce={class:"row q-pt-md"},Oe={class:"col"},ke={__name:"transferRequestIndex",setup(A){const b=$(),C=c([]),O=c([{name:"TLOCREQ_DOCNO",label:"Doc Np",field:"TLOCREQ_DOCNO",sortable:!0,align:"left"},{name:"TLOCREQ_FRLOC",label:"From Location",field:"TLOCREQ_FRLOC",sortable:!0,align:"left"},{name:"TLOCREQ_TOLOC",label:"To Location",field:"TLOCREQ_TOLOC",sortable:!0,align:"left"},{name:"TLOCREQ_ISREP",label:"Is Replacement ?",field:"TLOCREQ_ISREP",sortable:!0,format:d=>`${d==1?"Yes":"No"}`,align:"left"}]),u=c(!1),f=c(""),_=c("");S(()=>{i()});const i=async()=>{u.value=!0,await D.post("inventory/transferRequest/searchAPI",{searchBy:f.value,searchValue:_.value}).then(d=>{u.value=!1,C.value=d.data.data}).catch(d=>{u.value=!1})},g=d=>{b.dialog({component:fe,componentProps:{dataHeader:d,dataDet:d.detail}}).onOk(async r=>{u.value=!1,onDialogOK()})},h=d=>{b.dialog({title:"Confirmation",message:"Are you sure want to print this transfer ?",cancel:!0,persistent:!0}).onOk(async()=>{u.value=!0,await D.post("inventory/printHandoverPDF",{data:btoa(d)}).then(r=>{u.value=!1,window.open("").document.write("<iframe width='100%' height='100%' src='data:application/pdf;base64, "+encodeURI(r.data)+"'></iframe>")}).catch(r=>{u.value=!1})})};return(d,r)=>(p(),Q("div",_e,[ve,e(G),o("div",Ce,[o("div",Oe,[e(X,{title:"Transfer Request List",rows:C.value,columns:O.value,"row-key":"TDLVORD_DLVCD",loading:u.value,dense:"",pagination:{rowsPerPage:20},class:"my-sticky-header-column-table"},{"top-right":l(()=>[e(V,{outlined:"",modelValue:f.value,"onUpdate:modelValue":r[0]||(r[0]=a=>f.value=a),options:O.value,label:"Search Columns","option-value":"name","option-label":"label","emit-value":"",dense:"","map-options":""},null,8,["modelValue","options"]),e(k,{borderless:"",dense:"",modelValue:_.value,"onUpdate:modelValue":[r[1]||(r[1]=a=>_.value=a),r[2]||(r[2]=a=>d.getOutgoingData())],placeholder:"Search",outlined:"",debounce:"1000"},{append:l(()=>[e(J,{name:"search"})]),_:1},8,["modelValue"])]),header:l(a=>[e(U,{props:a},{default:l(()=>[(p(!0),Q(I,null,q(a.cols,m=>(p(),P(x,{key:m.name,props:a},{default:l(()=>[T(y(m.label),1)]),_:2},1032,["props"]))),128)),e(x,{"auto-width":""},{default:l(()=>[T("Action")]),_:1})]),_:2},1032,["props"])]),body:l(a=>[e(U,{props:a},{default:l(()=>[(p(!0),Q(I,null,q(a.cols,m=>(p(),P(B,{key:m.name,props:a},{default:l(()=>[T(y(m.value),1)]),_:2},1032,["props"]))),128)),e(B,{"auto-width":""},{default:l(()=>[e(E,{flat:"",color:a.row.TLOCREQ_APPRVBY!==null?"grey":"indigo",icon:"done_all",onClick:m=>g(a.row),dense:"",disable:a.row.TLOCREQ_APPRVBY!==null},{default:l(()=>[e(F,null,{default:l(()=>[T(y(a.row.TLOCREQ_APPRVBY!==null?"Request has been approved":"Approve All Data"),1)]),_:2},1024)]),_:2},1032,["color","onClick","disable"]),e(E,{flat:"",color:a.row.TLOCREQ_APPRVBY!==null?"cyan":"grey",icon:"print",onClick:m=>h(a.row.TLOCREQ_DOCNO),dense:"",disable:a.row.TLOCREQ_APPRVBY===null},{default:l(()=>[e(F,null,{default:l(()=>[T(y(a.row.TLOCREQ_APPRVBY===null?"Please Aprove first":"Print handover request"),1)]),_:2},1024)]),_:2},1032,["color","onClick","disable"])]),_:2},1024)]),_:2},1032,["props"])]),_:1},8,["rows","columns","loading"])])])]))}};export{ke as default};
