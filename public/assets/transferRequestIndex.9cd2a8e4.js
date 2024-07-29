import{t as m,o as F,C,D as I,E as o,F as a,M as H,O as q,J as t,$ as P,R,S as k,T as M,a0 as X,aZ as z,X as W,Q as V,Y as A,Z,aI as G,av as J,I as g,P as w}from"./index.6faf4632.js";import{Q as y}from"./QSelect.66a0878c.js";import{Q as j,a as N}from"./QTable.6235db6b.js";import{Q as x,a as U}from"./QTd.f9fcc811.js";import{Q as B}from"./QTooltip.13546b4f.js";import{api_web as D}from"./axios.bd3e9810.js";import{u as Y}from"./use-quasar.b0206e26.js";import{Q as ee,a as ae}from"./QInnerLoading.43cda653.js";import{u as le}from"./use-dialog-plugin-component.df5f4af5.js";import"./QItemLabel.cc6907e6.js";import"./format.69cae8f6.js";import"./QList.f32a936c.js";const oe=t("div",{class:"text-h6"},"Request Part",-1),te={style:{border:"1px black solid","border-radius":"10px"}},ne=t("legend",{style:{"margin-left":"1em",padding:"0.2em 0.8em"}},[t("b",null,"Header")],-1),se={class:"row q-col-gutter-md"},ie={class:"col-12"},de={style:{border:"1px black solid","border-radius":"10px",height:"35vh",overflow:"auto"}},re=t("legend",{style:{"margin-left":"1em",padding:"0.2em 0.8em"}},[t("b",null,"List Of Items")],-1),ue={class:"col-12 col-sm-3"},ce={class:"col-12 col-sm-3"},me={class:"col-12 col-sm-3"},pe={class:"col-12 col-sm-2"},Ce={class:"col-12 col-sm-1"},_e={__name:"transferRequestPreview",props:{dataHeader:Array,dataDet:Array,qtyOnly:Boolean},setup(S){const b=Y(),O=S,T=m({TLOCREQ_DOCNO:"",TLOCREQ_FRLOC:"",TLOCREQ_TOLOC:""}),u=m([]),_=m([]),f=m([]),d=m(!1);F(async()=>{console.log(O),await h(""),await r(""),T.value=O.dataHeader,O.dataDet.map(n=>{f.value.push({...n,TLOCREQ_QTY:e(n.TLOCREQ_ITMCD).STOCK>=n.TLOCREQ_QTY?n.TLOCREQ_QTY:e(n.TLOCREQ_ITMCD).STOCK,IS_STOCK_EX:e(n.TLOCREQ_ITMCD).STOCK>0&&e(n.TLOCREQ_ITMCD).STOCK>=n.TLOCREQ_QTY})})});const v=(n,s,l,E)=>{s(async()=>{E==="loc"&&await h(n),E==="item"&&await r(n)})},h=async(n,s="MSUP_SUPNM")=>{d.value=!0,await D.post("location/searchAPI",{searchBy:s,searchValue:n}).then(l=>{d.value=!1,_.value=l.data.data}).catch(l=>{d.value=!1})},r=async n=>{d.value=!0,await D.post("item/searchAPITBL",{searchValue:n}).then(s=>{d.value=!1,u.value=s.data.data}).catch(()=>{d.value=!1})},c=()=>{b.dialog({title:"Confirmation",message:"Are you sure want to send this request ?",cancel:!0,persistent:!0}).onOk(async()=>{d.value=!0})},e=n=>u.value.filter(s=>s.MITM_ITMCD==n)[0],{dialogRef:p,onDialogHide:$,onDialogOK:Qe,onDialogCancel:K}=le();return(n,s)=>(C(),I(Z,{ref_key:"dialogRef",ref:p,onHide:A($),"transition-show":"slide-up","transition-hide":"slide-down","full-width":"",persistent:""},{default:o(()=>[a(H,{class:"q-dialog-plugin bg-white q-pa-sm"},{default:o(()=>[a(q,null,{default:o(()=>[oe]),_:1}),a(q,{class:"q-pa-sm"},{default:o(()=>[t("fieldset",te,[ne,a(ee,{showing:d.value,dark:""},{default:o(()=>[a(ae,{size:"50px",color:"primary"})]),_:1},8,["showing"]),t("div",se,[t("div",ie,[a(P,{label:"Doc No",dense:"",filled:"",modelValue:T.value.TLOCREQ_DOCNO,"onUpdate:modelValue":s[0]||(s[0]=l=>T.value.TLOCREQ_DOCNO=l),readonly:!0},null,8,["modelValue"])])])]),t("fieldset",de,[re,f.value.length>0?(C(!0),R(k,{key:0},M(f.value,(l,E)=>(C(),R("div",{class:"row q-col-gutter-md q-pt-md",key:E,style:{"font-size":"10px"}},[t("div",ue,[a(y,{dense:"",filled:"",label:"Item Name",modelValue:l.TLOCREQ_ITMCD,"onUpdate:modelValue":i=>l.TLOCREQ_ITMCD=i,"use-input":"","input-debounce":"500",options:u.value,onFilter:s[1]||(s[1]=(i,Q,L)=>v(i,Q,L,"item")),behavior:"dialog","option-label":"MITM_ITMNM","option-value":"MITM_ITMCD","emit-value":"","map-options":"",loading:d.value,readonly:!0,"input-style":"font-size:11px"},null,8,["modelValue","onUpdate:modelValue","options","loading"])]),t("div",ce,[a(y,{dense:"",filled:"",label:"Transfer From",modelValue:l.TLOCREQ_FRLOC,"onUpdate:modelValue":i=>l.TLOCREQ_FRLOC=i,"use-input":"","input-debounce":"500",options:_.value,onFilter:s[2]||(s[2]=(i,Q,L)=>v(i,Q,L,"loc")),behavior:"dialog","option-label":"MLOC_LOCNM","option-value":"MLOC_LOCCD","emit-value":"","map-options":"",loading:d.value,readonly:!0},null,8,["modelValue","onUpdate:modelValue","options","loading"])]),t("div",me,[a(y,{dense:"",filled:"",label:"Transfer To",modelValue:l.TLOCREQ_TOLOC,"onUpdate:modelValue":i=>l.TLOCREQ_TOLOC=i,"use-input":"","input-debounce":"500",options:_.value,onFilter:s[3]||(s[3]=(i,Q,L)=>v(i,Q,L,"loc")),behavior:"dialog","option-label":"MLOC_LOCNM","option-value":"MLOC_LOCCD","emit-value":"","map-options":"",loading:d.value,readonly:!0},null,8,["modelValue","onUpdate:modelValue","options","loading"])]),t("div",pe,[a(P,{label:"Qty",disable:l.IS_STOCK_EX,dense:"",filled:"",modelValue:l.TLOCREQ_QTY,"onUpdate:modelValue":i=>l.TLOCREQ_QTY=i,rules:[i=>!l.IS_STOCK_EX||`Stock is less than needed, stock only ${e(l.TLOCREQ_ITMCD).STOCK}`]},null,8,["disable","modelValue","onUpdate:modelValue","rules"])]),t("div",Ce,[a(X,{modelValue:l.TLOCREQ_ISREP,"onUpdate:modelValue":i=>l.TLOCREQ_ISREP=i,label:"Is replacement ?",color:"teal","true-value":1,"false-value":0,disable:!0},null,8,["modelValue","onUpdate:modelValue"])])]))),128)):z("",!0)])]),_:1}),a(W,{align:"right"},{default:o(()=>[a(V,{label:"approve",color:"primary",onClick:s[4]||(s[4]=l=>c()),loading:d.value},null,8,["loading"]),a(V,{flat:"",label:"Cancel",color:"red",onClick:A(K)},null,8,["onClick"])]),_:1})]),_:1})]),_:1},8,["onHide"]))}},fe={class:"q-pa-md"},Oe=t("div",{class:"row q-pb-md"},[t("div",{class:"col"},[t("span",{class:"text-h4"},"Transfer Request")]),t("div",{class:"col text-right"})],-1),Te={class:"row q-pt-md"},ve={class:"col"},ke={__name:"transferRequestIndex",setup(S){const b=Y(),O=m([]),T=m([{name:"TLOCREQ_DOCNO",label:"Doc Np",field:"TLOCREQ_DOCNO",sortable:!0,align:"left"},{name:"TLOCREQ_FRLOC",label:"From Location",field:"TLOCREQ_FRLOC",sortable:!0,align:"left"},{name:"TLOCREQ_TOLOC",label:"To Location",field:"TLOCREQ_TOLOC",sortable:!0,align:"left"},{name:"TLOCREQ_ISREP",label:"Is Replacement ?",field:"TLOCREQ_ISREP",sortable:!0,format:r=>`${r==1?"Yes":"No"}`,align:"left"}]),u=m(!1),_=m(""),f=m("");F(()=>{d()});const d=async()=>{u.value=!0,await D.post("inventory/transferRequest/searchAPI",{searchBy:_.value,searchValue:f.value}).then(r=>{u.value=!1,O.value=r.data.data}).catch(r=>{u.value=!1})},v=r=>{b.dialog({component:_e,componentProps:{dataHeader:r,dataDet:r.detail}}).onOk(async c=>{u.value=!1,onDialogOK()})},h=r=>{b.dialog({title:"Confirmation",message:"Are you sure want to print this transfer ?",cancel:!0,persistent:!0}).onOk(async()=>{u.value=!0,await D.post("inventory/printHandoverPDF",{data:btoa(r)}).then(c=>{u.value=!1,window.open("").document.write("<iframe width='100%' height='100%' src='data:application/pdf;base64, "+encodeURI(c.data)+"'></iframe>")}).catch(c=>{u.value=!1})})};return(r,c)=>(C(),R("div",fe,[Oe,a(G),t("div",Te,[t("div",ve,[a(j,{title:"Transfer Request List",rows:O.value,columns:T.value,"row-key":"TDLVORD_DLVCD",loading:u.value,dense:"",pagination:{rowsPerPage:20},class:"my-sticky-header-column-table"},{"top-right":o(()=>[a(y,{outlined:"",modelValue:_.value,"onUpdate:modelValue":c[0]||(c[0]=e=>_.value=e),options:T.value,label:"Search Columns","option-value":"name","option-label":"label","emit-value":"",dense:"","map-options":""},null,8,["modelValue","options"]),a(P,{borderless:"",dense:"",modelValue:f.value,"onUpdate:modelValue":[c[1]||(c[1]=e=>f.value=e),c[2]||(c[2]=e=>r.getOutgoingData())],placeholder:"Search",outlined:"",debounce:"1000"},{append:o(()=>[a(J,{name:"search"})]),_:1},8,["modelValue"])]),header:o(e=>[a(x,{props:e},{default:o(()=>[(C(!0),R(k,null,M(e.cols,p=>(C(),I(N,{key:p.name,props:e},{default:o(()=>[g(w(p.label),1)]),_:2},1032,["props"]))),128)),a(N,{"auto-width":""},{default:o(()=>[g("Action")]),_:1})]),_:2},1032,["props"])]),body:o(e=>[a(x,{props:e},{default:o(()=>[(C(!0),R(k,null,M(e.cols,p=>(C(),I(U,{key:p.name,props:e},{default:o(()=>[g(w(p.value),1)]),_:2},1032,["props"]))),128)),a(U,{"auto-width":""},{default:o(()=>[a(V,{flat:"",color:e.row.TLOCREQ_APPRVBY!==null?"grey":"indigo",icon:"done_all",onClick:p=>v(e.row),dense:"",disable:e.row.TLOCREQ_APPRVBY!==null},{default:o(()=>[a(B,null,{default:o(()=>[g(w(e.row.TLOCREQ_APPRVBY!==null?"Request has been approved":"Approve All Data"),1)]),_:2},1024)]),_:2},1032,["color","onClick","disable"]),a(V,{flat:"",color:e.row.TLOCREQ_APPRVBY!==null?"cyan":"grey",icon:"print",onClick:p=>h(e.row.TLOCREQ_DOCNO),dense:"",disable:e.row.TLOCREQ_APPRVBY===null},{default:o(()=>[a(B,null,{default:o(()=>[g(w(e.row.TLOCREQ_APPRVBY===null?"Please Aprove first":"Print handover request"),1)]),_:2},1024)]),_:2},1032,["color","onClick","disable"])]),_:2},1024)]),_:2},1032,["props"])]),_:1},8,["rows","columns","loading"])])])]))}};export{ke as default};
