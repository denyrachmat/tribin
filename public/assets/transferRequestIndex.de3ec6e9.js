import{t as _,o as A,C,D as I,E as t,F as e,M as W,O as F,J as n,$ as S,R as b,S as k,T as M,a0 as X,aZ as Z,X as G,Q as E,Y as P,Z as J,aY as j,at as ee,I as h,P as w}from"./index.a4bd984a.js";import{e as D}from"./QSelect.246acdd8.js";import{Q as ae,a as N}from"./QTable.b4276117.js";import{Q as x,a as U}from"./QTd.589ad153.js";import{Q as $}from"./QTooltip.2c9ab2ea.js";import{api_web as R}from"./axios.d3fb9b5f.js";import{u as Y}from"./format.5ae90226.js";import{Q as le,a as oe}from"./QInnerLoading.7dbe5c3e.js";import{u as te}from"./use-dialog-plugin-component.972a778f.js";import"./QList.13a0318b.js";const ne=n("div",{class:"text-h6"},"Request Part",-1),se={style:{border:"1px black solid","border-radius":"10px"}},ie=n("legend",{style:{"margin-left":"1em",padding:"0.2em 0.8em"}},[n("b",null,"Header")],-1),re={class:"row q-col-gutter-md"},de={class:"col-12"},ue={style:{border:"1px black solid","border-radius":"10px",height:"35vh",overflow:"auto"}},ce=n("legend",{style:{"margin-left":"1em",padding:"0.2em 0.8em"}},[n("b",null,"List Of Items")],-1),me={class:"col-12 col-sm-3"},pe={class:"col-12 col-sm-3"},_e={class:"col-12 col-sm-3"},Ce={class:"col-12 col-sm-2"},fe={class:"col-12 col-sm-1"},Oe={__name:"transferRequestPreview",props:{dataHeader:Array,dataDet:Array,qtyOnly:Boolean},setup(q){const v=Y(),O=q,T=_({TLOCREQ_DOCNO:"",TLOCREQ_FRLOC:"",TLOCREQ_TOLOC:""}),m=_([]),f=_([]),p=_([]),r=_(!1);A(async()=>{console.log(O),await d(""),await c(""),T.value=O.dataHeader,O.dataDet.map(l=>{p.value.push({...l,TLOCREQ_QTY:u(l.TLOCREQ_ITMCD).STOCK>=l.TLOCREQ_QTY?l.TLOCREQ_QTY:u(l.TLOCREQ_ITMCD).STOCK,IS_STOCK_EX:u(l.TLOCREQ_ITMCD).STOCK>=l.TLOCREQ_QTY})})});const V=()=>{let l=[];return p.value.map(o=>{u(o.TLOCREQ_ITMCD).STOCK<o.TLOCREQ_QTY&&l.push(o)}),l.length>0},g=(l,o,s,y)=>{o(async()=>{y==="loc"&&await d(l),y==="item"&&await c(l)})},d=async(l,o="MSUP_SUPNM")=>{r.value=!0,await R.post("location/searchAPI",{searchBy:o,searchValue:l}).then(s=>{r.value=!1,f.value=s.data.data}).catch(s=>{r.value=!1})},c=async l=>{r.value=!0,await R.post("item/searchAPITBL",{searchValue:l}).then(o=>{r.value=!1,m.value=o.data.data}).catch(()=>{r.value=!1})},a=()=>{v.dialog({title:"Confirmation",message:"Are you sure want to approve all this request ?",cancel:!0,persistent:!0}).onOk(async()=>{r.value=!0,console.log(p.value),await R.post("inventory/transferRequest",{data:p.value}).then(async l=>{r.value=!1,v.notify({color:"green",message:`${l.data.msg}`}),H()}).catch(l=>{r.value=!1})})},u=l=>m.value.filter(o=>o.MITM_ITMCD==l)[0],{dialogRef:B,onDialogHide:K,onDialogOK:H,onDialogCancel:z}=te();return(l,o)=>(C(),I(J,{ref_key:"dialogRef",ref:B,onHide:P(K),"transition-show":"slide-up","transition-hide":"slide-down","full-width":"",persistent:""},{default:t(()=>[e(W,{class:"q-dialog-plugin bg-white q-pa-sm"},{default:t(()=>[e(F,null,{default:t(()=>[ne]),_:1}),e(F,{class:"q-pa-sm"},{default:t(()=>[n("fieldset",se,[ie,e(le,{showing:r.value,dark:""},{default:t(()=>[e(oe,{size:"50px",color:"primary"})]),_:1},8,["showing"]),n("div",re,[n("div",de,[e(S,{label:"Doc No",dense:"",filled:"",modelValue:T.value.TLOCREQ_DOCNO,"onUpdate:modelValue":o[0]||(o[0]=s=>T.value.TLOCREQ_DOCNO=s),readonly:!0},null,8,["modelValue"])])])]),n("fieldset",ue,[ce,p.value.length>0?(C(!0),b(k,{key:0},M(p.value,(s,y)=>(C(),b("div",{class:"row q-col-gutter-md q-pt-md",key:y,style:{"font-size":"10px"}},[n("div",me,[e(D,{dense:"",filled:"",label:"Item Name",modelValue:s.TLOCREQ_ITMCD,"onUpdate:modelValue":i=>s.TLOCREQ_ITMCD=i,"use-input":"","input-debounce":"500",options:m.value,onFilter:o[1]||(o[1]=(i,Q,L)=>g(i,Q,L,"item")),behavior:"dialog","option-label":"MITM_ITMNM","option-value":"MITM_ITMCD","emit-value":"","map-options":"",loading:r.value,readonly:!0,"input-style":"font-size:11px"},null,8,["modelValue","onUpdate:modelValue","options","loading"])]),n("div",pe,[e(D,{dense:"",filled:"",label:"Transfer From",modelValue:s.TLOCREQ_FRLOC,"onUpdate:modelValue":i=>s.TLOCREQ_FRLOC=i,"use-input":"","input-debounce":"500",options:f.value,onFilter:o[2]||(o[2]=(i,Q,L)=>g(i,Q,L,"loc")),behavior:"dialog","option-label":"MLOC_LOCNM","option-value":"MLOC_LOCCD","emit-value":"","map-options":"",loading:r.value,readonly:!0},null,8,["modelValue","onUpdate:modelValue","options","loading"])]),n("div",_e,[e(D,{dense:"",filled:"",label:"Transfer To",modelValue:s.TLOCREQ_TOLOC,"onUpdate:modelValue":i=>s.TLOCREQ_TOLOC=i,"use-input":"","input-debounce":"500",options:f.value,onFilter:o[3]||(o[3]=(i,Q,L)=>g(i,Q,L,"loc")),behavior:"dialog","option-label":"MLOC_LOCNM","option-value":"MLOC_LOCCD","emit-value":"","map-options":"",loading:r.value,readonly:!0},null,8,["modelValue","onUpdate:modelValue","options","loading"])]),n("div",Ce,[e(S,{label:"Qty",dense:"",filled:"",modelValue:s.TLOCREQ_QTY,"onUpdate:modelValue":i=>s.TLOCREQ_QTY=i,rules:[i=>i<=u(s.TLOCREQ_ITMCD).STOCK||`Stock is less than needed, stock only ${u(s.TLOCREQ_ITMCD).STOCK}`]},null,8,["modelValue","onUpdate:modelValue","rules"])]),n("div",fe,[e(X,{modelValue:s.TLOCREQ_ISREP,"onUpdate:modelValue":i=>s.TLOCREQ_ISREP=i,label:"Is replacement ?",color:"teal","true-value":1,"false-value":0,disable:!0},null,8,["modelValue","onUpdate:modelValue"])])]))),128)):Z("",!0)])]),_:1}),e(G,{align:"right"},{default:t(()=>[e(E,{label:"approve",color:"primary",onClick:o[4]||(o[4]=s=>a()),loading:r.value,disable:V()},null,8,["loading","disable"]),e(E,{flat:"",label:"Cancel",color:"red",onClick:P(z)},null,8,["onClick"])]),_:1})]),_:1})]),_:1},8,["onHide"]))}},Te={class:"q-pa-md"},ve=n("div",{class:"row q-pb-md"},[n("div",{class:"col"},[n("span",{class:"text-h4"},"Transfer Request")]),n("div",{class:"col text-right"})],-1),ge={class:"row q-pt-md"},Qe={class:"col"},Se={__name:"transferRequestIndex",setup(q){const v=Y(),O=_([]),T=_([{name:"TLOCREQ_DOCNO",label:"Doc Np",field:"TLOCREQ_DOCNO",sortable:!0,align:"left"},{name:"TLOCREQ_FRLOC",label:"From Location",field:"TLOCREQ_FRLOC",sortable:!0,align:"left"},{name:"TLOCREQ_TOLOC",label:"To Location",field:"TLOCREQ_TOLOC",sortable:!0,align:"left"},{name:"OS_TF",label:"Qty Need to Transfer",field:"OS_TF",sortable:!0,align:"left"},{name:"TLOCREQ_ISREP",label:"Is Replacement ?",field:"TLOCREQ_ISREP",sortable:!0,format:d=>`${d==1?"Yes":"No"}`,align:"left"}]),m=_(!1),f=_(""),p=_("");A(()=>{r()});const r=async()=>{m.value=!0,await R.post("inventory/transferRequest/searchAPI",{searchBy:f.value,searchValue:p.value}).then(d=>{m.value=!1,O.value=d.data.data}).catch(d=>{m.value=!1})},V=d=>{v.dialog({component:Oe,componentProps:{dataHeader:d,dataDet:d.detail}}).onOk(async c=>{m.value=!1,onDialogOK()})},g=d=>{v.dialog({title:"Confirmation",message:"Are you sure want to print this transfer ?",cancel:!0,persistent:!0}).onOk(async()=>{m.value=!0,await R.post("inventory/printHandoverPDF",{data:btoa(d)}).then(c=>{m.value=!1,window.open("").document.write("<iframe width='100%' height='100%' src='data:application/pdf;base64, "+encodeURI(c.data)+"'></iframe>")}).catch(c=>{m.value=!1})})};return(d,c)=>(C(),b("div",Te,[ve,e(j),n("div",ge,[n("div",Qe,[e(ae,{title:"Transfer Request List",rows:O.value,columns:T.value,"row-key":"TDLVORD_DLVCD",loading:m.value,dense:"",pagination:{rowsPerPage:20},class:"my-sticky-header-column-table"},{"top-right":t(()=>[e(D,{outlined:"",modelValue:f.value,"onUpdate:modelValue":c[0]||(c[0]=a=>f.value=a),options:T.value,label:"Search Columns","option-value":"name","option-label":"label","emit-value":"",dense:"","map-options":""},null,8,["modelValue","options"]),e(S,{borderless:"",dense:"",modelValue:p.value,"onUpdate:modelValue":[c[1]||(c[1]=a=>p.value=a),c[2]||(c[2]=a=>d.getOutgoingData())],placeholder:"Search",outlined:"",debounce:"1000"},{append:t(()=>[e(ee,{name:"search"})]),_:1},8,["modelValue"])]),header:t(a=>[e(x,{props:a},{default:t(()=>[(C(!0),b(k,null,M(a.cols,u=>(C(),I(N,{key:u.name,props:a},{default:t(()=>[h(w(u.label),1)]),_:2},1032,["props"]))),128)),e(N,{"auto-width":""},{default:t(()=>[h("Action")]),_:1})]),_:2},1032,["props"])]),body:t(a=>[e(x,{props:a},{default:t(()=>[(C(!0),b(k,null,M(a.cols,u=>(C(),I(U,{key:u.name,props:a},{default:t(()=>[h(w(u.value),1)]),_:2},1032,["props"]))),128)),e(U,{"auto-width":""},{default:t(()=>[e(E,{flat:"",color:a.row.OS_TF==0?"grey":"indigo",icon:"done_all",onClick:u=>V(a.row),dense:"",disable:a.row.OS_TF==0},{default:t(()=>[e($,null,{default:t(()=>[h(w(a.row.OS_TF==0?"Request has been approved":"Approve All Data"),1)]),_:2},1024)]),_:2},1032,["color","onClick","disable"]),e(E,{flat:"",color:a.row.OS_TF==0?"cyan":"grey",icon:"print",onClick:u=>g(a.row.TLOCREQ_DOCNO),dense:"",disable:a.row.OS_TF==0},{default:t(()=>[e($,null,{default:t(()=>[h(w(a.row.OS_TF==0?"Please Aprove first":"Print handover request"),1)]),_:2},1024)]),_:2},1032,["color","onClick","disable"])]),_:2},1024)]),_:2},1032,["props"])]),_:1},8,["rows","columns","loading"])])])]))}};export{Se as default};
