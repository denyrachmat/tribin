import{t as c,o as x,C as p,D as P,E as l,F as e,M as H,O as M,J as o,$ as k,R as b,S as I,T as q,a0 as K,aZ as W,X as Z,Q as E,Y as N,Z as z,aI as G,av as J,I as T,P as V}from"./index.db9d4144.js";import{Q as y}from"./QSelect.ef1e4c0f.js";import{Q as X,a as U}from"./QTable.8ffe6f86.js";import{Q as B,a as F}from"./QTd.d74c9cab.js";import{Q as S}from"./QTooltip.6252c375.js";import{api_web as D}from"./axios.0c601feb.js";import{u as $}from"./use-quasar.1c84fc78.js";import{Q as j,a as ee}from"./QInnerLoading.93dee563.js";import{u as ae}from"./use-dialog-plugin-component.a4fa98d8.js";import"./QItemLabel.7cbb5064.js";import"./format.1dd423f7.js";import"./QList.6bc6188b.js";const le=o("div",{class:"text-h6"},"Request Part",-1),oe={style:{border:"1px black solid","border-radius":"10px"}},te=o("legend",{style:{"margin-left":"1em",padding:"0.2em 0.8em"}},[o("b",null,"Header")],-1),ne={class:"row q-col-gutter-md"},se={class:"col-12"},ie={style:{border:"1px black solid","border-radius":"10px",height:"35vh",overflow:"auto"}},de=o("legend",{style:{"margin-left":"1em",padding:"0.2em 0.8em"}},[o("b",null,"List Of Items")],-1),re={class:"col-12 col-sm-3"},ue={class:"col-12 col-sm-3"},ce={class:"col-12 col-sm-3"},me={class:"col-12 col-sm-2"},pe={class:"col-12 col-sm-1"},fe={__name:"transferRequestPreview",props:{dataHeader:Array,dataDet:Array,qtyOnly:Boolean},setup(A){const Q=$(),C=A,O=c({TLOCREQ_DOCNO:"",TLOCREQ_FRLOC:"",TLOCREQ_TOLOC:""}),u=c([]),f=c([]),_=c([]),s=c(!1);x(async()=>{console.log(C),await h(""),await d(""),O.value=C.dataHeader,_.value=C.dataDet});const g=(v,n,t,w)=>{n(async()=>{w==="loc"&&await h(v),w==="item"&&await d(v)})},h=async(v,n="MSUP_SUPNM")=>{s.value=!0,await D.post("location/searchAPI",{searchBy:n,searchValue:v}).then(t=>{s.value=!1,f.value=t.data.data}).catch(t=>{s.value=!1})},d=async v=>{s.value=!0,await D.post("item/searchAPITBL",{searchValue:v}).then(n=>{s.value=!1,u.value=n.data.data}).catch(()=>{s.value=!1})},r=()=>{Q.dialog({title:"Confirmation",message:"Are you sure want to send this request ?",cancel:!0,persistent:!0}).onOk(async()=>{s.value=!0})},{dialogRef:a,onDialogHide:m,onDialogOK:ge,onDialogCancel:Y}=ae();return(v,n)=>(p(),P(z,{ref_key:"dialogRef",ref:a,onHide:N(m),"transition-show":"slide-up","transition-hide":"slide-down","full-width":"",persistent:""},{default:l(()=>[e(H,{class:"q-dialog-plugin bg-white q-pa-sm"},{default:l(()=>[e(M,null,{default:l(()=>[le]),_:1}),e(M,{class:"q-pa-sm"},{default:l(()=>[o("fieldset",oe,[te,e(j,{showing:s.value,dark:""},{default:l(()=>[e(ee,{size:"50px",color:"primary"})]),_:1},8,["showing"]),o("div",ne,[o("div",se,[e(k,{label:"Doc No",dense:"",filled:"",modelValue:O.value.TLOCREQ_DOCNO,"onUpdate:modelValue":n[0]||(n[0]=t=>O.value.TLOCREQ_DOCNO=t),readonly:!0},null,8,["modelValue"])])])]),o("fieldset",ie,[de,_.value.length>0?(p(!0),b(I,{key:0},q(_.value,(t,w)=>(p(),b("div",{class:"row q-col-gutter-md q-pt-md",key:w},[o("div",re,[e(y,{dense:"",filled:"",label:"Item Name",modelValue:t.TLOCREQ_ITMCD,"onUpdate:modelValue":i=>t.TLOCREQ_ITMCD=i,"use-input":"","input-debounce":"500",options:u.value,onFilter:n[1]||(n[1]=(i,L,R)=>g(i,L,R,"item")),behavior:"dialog","option-label":"MITM_ITMNM","option-value":"MITM_ITMCD","emit-value":"","map-options":"",loading:s.value,readonly:!0},null,8,["modelValue","onUpdate:modelValue","options","loading"])]),o("div",ue,[e(y,{dense:"",filled:"",label:"Transfer From",modelValue:t.TLOCREQ_FRLOC,"onUpdate:modelValue":i=>t.TLOCREQ_FRLOC=i,"use-input":"","input-debounce":"500",options:f.value,onFilter:n[2]||(n[2]=(i,L,R)=>g(i,L,R,"loc")),behavior:"dialog","option-label":"MLOC_LOCNM","option-value":"MLOC_LOCCD","emit-value":"","map-options":"",loading:s.value,readonly:!0},null,8,["modelValue","onUpdate:modelValue","options","loading"])]),o("div",ce,[e(y,{dense:"",filled:"",label:"Transfer To",modelValue:t.TLOCREQ_TOLOC,"onUpdate:modelValue":i=>t.TLOCREQ_TOLOC=i,"use-input":"","input-debounce":"500",options:f.value,onFilter:n[3]||(n[3]=(i,L,R)=>g(i,L,R,"loc")),behavior:"dialog","option-label":"MLOC_LOCNM","option-value":"MLOC_LOCCD","emit-value":"","map-options":"",loading:s.value,readonly:!0},null,8,["modelValue","onUpdate:modelValue","options","loading"])]),o("div",me,[e(k,{label:"Qty",dense:"",filled:"",modelValue:t.TLOCREQ_QTY,"onUpdate:modelValue":i=>t.TLOCREQ_QTY=i},null,8,["modelValue","onUpdate:modelValue"])]),o("div",pe,[e(K,{modelValue:t.TLOCREQ_ISREP,"onUpdate:modelValue":i=>t.TLOCREQ_ISREP=i,label:"Is replacement ?",color:"teal","true-value":1,"false-value":0,disable:s.value,readonly:!0},null,8,["modelValue","onUpdate:modelValue","disable"])])]))),128)):W("",!0)])]),_:1}),e(Z,{align:"right"},{default:l(()=>[e(E,{label:"approve",color:"primary",onClick:n[4]||(n[4]=t=>r()),loading:s.value},null,8,["loading"]),e(E,{flat:"",label:"Cancel",color:"red",onClick:N(Y)},null,8,["onClick"])]),_:1})]),_:1})]),_:1},8,["onHide"]))}},_e={class:"q-pa-md"},ve=o("div",{class:"row q-pb-md"},[o("div",{class:"col"},[o("span",{class:"text-h4"},"Transfer Request")]),o("div",{class:"col text-right"})],-1),Ce={class:"row q-pt-md"},Oe={class:"col"},ke={__name:"transferRequestIndex",setup(A){const Q=$(),C=c([]),O=c([{name:"TLOCREQ_DOCNO",label:"Doc Np",field:"TLOCREQ_DOCNO",sortable:!0,align:"left"},{name:"TLOCREQ_FRLOC",label:"From Location",field:"TLOCREQ_FRLOC",sortable:!0,align:"left"},{name:"TLOCREQ_TOLOC",label:"To Location",field:"TLOCREQ_TOLOC",sortable:!0,align:"left"},{name:"TLOCREQ_ISREP",label:"Is Replacement ?",field:"TLOCREQ_ISREP",sortable:!0,format:d=>`${d==1?"Yes":"No"}`,align:"left"}]),u=c(!1),f=c(""),_=c("");x(()=>{s()});const s=async()=>{u.value=!0,await D.post("inventory/transferRequest/searchAPI",{searchBy:f.value,searchValue:_.value}).then(d=>{u.value=!1,C.value=d.data.data}).catch(d=>{u.value=!1})},g=d=>{Q.dialog({component:fe,componentProps:{dataHeader:d,dataDet:d.detail}}).onOk(async r=>{u.value=!1,onDialogOK()})},h=d=>{Q.dialog({title:"Confirmation",message:"Are you sure want to print this transfer ?",cancel:!0,persistent:!0}).onOk(async()=>{u.value=!0,await D.post("inventory/printHandoverPDF",{data:btoa(d)}).then(r=>{u.value=!1,window.open("").document.write("<iframe width='100%' height='100%' src='data:application/pdf;base64, "+encodeURI(r.data)+"'></iframe>")}).catch(r=>{u.value=!1})})};return(d,r)=>(p(),b("div",_e,[ve,e(G),o("div",Ce,[o("div",Oe,[e(X,{title:"Transfer Request List",rows:C.value,columns:O.value,"row-key":"TDLVORD_DLVCD",loading:u.value,dense:"",pagination:{rowsPerPage:20},class:"my-sticky-header-column-table"},{"top-right":l(()=>[e(y,{outlined:"",modelValue:f.value,"onUpdate:modelValue":r[0]||(r[0]=a=>f.value=a),options:O.value,label:"Search Columns","option-value":"name","option-label":"label","emit-value":"",dense:"","map-options":""},null,8,["modelValue","options"]),e(k,{borderless:"",dense:"",modelValue:_.value,"onUpdate:modelValue":[r[1]||(r[1]=a=>_.value=a),r[2]||(r[2]=a=>d.getOutgoingData())],placeholder:"Search",outlined:"",debounce:"1000"},{append:l(()=>[e(J,{name:"search"})]),_:1},8,["modelValue"])]),header:l(a=>[e(B,{props:a},{default:l(()=>[(p(!0),b(I,null,q(a.cols,m=>(p(),P(U,{key:m.name,props:a},{default:l(()=>[T(V(m.label),1)]),_:2},1032,["props"]))),128)),e(U,{"auto-width":""},{default:l(()=>[T("Action")]),_:1})]),_:2},1032,["props"])]),body:l(a=>[e(B,{props:a},{default:l(()=>[(p(!0),b(I,null,q(a.cols,m=>(p(),P(F,{key:m.name,props:a},{default:l(()=>[T(V(m.value),1)]),_:2},1032,["props"]))),128)),e(F,{"auto-width":""},{default:l(()=>[e(E,{flat:"",color:a.row.TLOCREQ_APPRVBY!==null?"grey":"indigo",icon:"done_all",onClick:m=>g(a.row),dense:"",disable:a.row.TLOCREQ_APPRVBY!==null},{default:l(()=>[e(S,null,{default:l(()=>[T(V(a.row.TLOCREQ_APPRVBY!==null?"Request has been approved":"Approve All Data"),1)]),_:2},1024)]),_:2},1032,["color","onClick","disable"]),e(E,{flat:"",color:a.row.TLOCREQ_APPRVBY!==null?"cyan":"grey",icon:"print",onClick:m=>h(a.row.TLOCREQ_DOCNO),dense:"",disable:a.row.TLOCREQ_APPRVBY===null},{default:l(()=>[e(S,null,{default:l(()=>[T(V(a.row.TLOCREQ_APPRVBY===null?"Please Aprove first":"Print handover request"),1)]),_:2},1024)]),_:2},1032,["color","onClick","disable"])]),_:2},1024)]),_:2},1032,["props"])]),_:1},8,["rows","columns","loading"])])])]))}};export{ke as default};
