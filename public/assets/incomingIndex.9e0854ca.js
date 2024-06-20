import{Q}from"./QTooltip.3aef67e1.js";import{t as r,C as c,D as b,E as l,F as e,M as A,O as U,J as o,$ as T,an as L,U as R,Q as D,R as h,S as y,T as w,V as x,I as u,P as S,W as B,Z as H,o as E,aY as Y}from"./index.752c7ca7.js";import{a as O,l as N,Q as F,b as I,c as f,d as V,k as j,m as k}from"./QTable.beda646e.js";import{Q as P,a as M}from"./QTd.c7e8bf8d.js";import{api_web as $}from"./axios.3cebd726.js";import{Q as z,a as G}from"./QInnerLoading.0b7bd3e9.js";import{Q as J,a as W,C as Z}from"./ClosePopup.f5ecb8f6.js";import"./use-render-cache.3aae9b27.js";import"./date.b11dbba4.js";const K=o("div",{class:"text-h6"},"Create Incoming",-1),X={style:{border:"1px black solid","border-radius":"10px"}},ee=o("legend",{style:{"margin-left":"1em",padding:"0.2em 0.8em"}},[o("b",null,"Header")],-1),le={class:"row q-col-gutter-sm"},ae={class:"col-12 col-sm-6"},te={class:"col-12 col-sm-6"},oe={class:"row items-center justify-end"},se={class:"row q-col-gutter-sm"},ne={class:"col-12 col-sm-6"},de={style:{border:"1px black solid","border-radius":"10px",height:"35vh",overflow:"auto"}},ie=o("legend",{style:{"margin-left":"1em",padding:"0.2em 0.8em"}},[o("b",null,"List Of Items")],-1),ue={__name:"incomingCreate",props:{dataHeader:Array},setup(q){O();const d=r({TRCV_RCVCD:"",TRCV_SUPCD:"",TRCV_ISSUDT:""}),v=r([]),m=r(!1),p=r([]),g=(i,n,a,s)=>{n(async()=>{s==="cust"&&C(i),s==="item"&&await getItem(i)})},C=async(i,n="MSUP_SUPNM")=>{m.value=!0,await $.post("supplier/searchAPI",{searchValue:i,searchCol:n}).then(a=>{m.value=!1,p.value=a.data.data}).catch(()=>{m.value=!1})};return(i,n)=>(c(),b(H,{ref:"dialogRef",onHide:i.onDialogHide,"transition-show":"slide-up","transition-hide":"slide-down","full-width":"",persistent:""},{default:l(()=>[e(A,{class:"q-dialog-plugin bg-white q-pa-sm"},{default:l(()=>[e(U,null,{default:l(()=>[K]),_:1}),e(U,{class:"q-pa-sm"},{default:l(()=>[o("fieldset",X,[ee,e(z,{showing:m.value,dark:""},{default:l(()=>[e(G,{size:"50px",color:"primary"})]),_:1},8,["showing"]),o("div",le,[o("div",ae,[e(T,{label:"Code",readonly:"",dense:"",filled:"",modelValue:d.value.TRCV_RCVCD,"onUpdate:modelValue":n[0]||(n[0]=a=>d.value.TRCV_RCVCD=a)},null,8,["modelValue"])]),o("div",te,[e(T,{filled:"",modelValue:d.value.TRCV_ISSUDT,"onUpdate:modelValue":n[2]||(n[2]=a=>d.value.TRCV_ISSUDT=a),dense:"",label:"Receive Date"},{append:l(()=>[e(L,{name:"event",class:"cursor-pointer"},{default:l(()=>[e(J,{cover:"","transition-show":"scale","transition-hide":"scale"},{default:l(()=>[e(W,{modelValue:d.value.TRCV_ISSUDT,"onUpdate:modelValue":n[1]||(n[1]=a=>d.value.TRCV_ISSUDT=a),mask:"YYYY-MM-DD"},{default:l(()=>[o("div",oe,[R(e(D,{label:"Close",color:"primary",flat:""},null,512),[[Z]])])]),_:1},8,["modelValue"])]),_:1})]),_:1})]),_:1},8,["modelValue"])])]),o("div",se,[o("div",ne,[e(N,{dense:"",filled:"",label:"Supplier Name",modelValue:d.value.TRCV_SUPCD,"onUpdate:modelValue":n[3]||(n[3]=a=>d.value.TRCV_SUPCD=a),"use-input":"","input-debounce":"500",options:p.value,onFilter:n[4]||(n[4]=(a,s,t)=>g(a,s,t,"cust")),behavior:"dialog","option-label":"MSUP_SUPNM","option-value":"MSUP_SUPCD","emit-value":"","map-options":"",loading:m.value,disable:i.forms.TSLO_QUOCD!==""},null,8,["modelValue","options","loading","disable"])])])]),o("fieldset",de,[ie,e(F,{bordered:"",dense:""},{default:l(()=>[v.value.length>0?(c(!0),h(y,{key:0},w(v.value,(a,s)=>(c(),b(I,{key:s,class:"q-my-sm",dense:"",loading:m.value},{default:l(()=>[e(f,{avatar:""},{default:l(()=>[e(x,{"text-color":"blue"},{default:l(()=>[u(S(s+1),1)]),_:2},1024)]),_:2},1024),e(f,null,{default:l(()=>[e(V,null,{default:l(()=>[e(T,{dense:"",label:"Item Name",filled:"",modelValue:a.MITM_ITMNM,"onUpdate:modelValue":t=>a.MITM_ITMNM=t,readonly:""},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1024)]),_:2},1024),e(f,null,{default:l(()=>[e(V,null,{default:l(()=>[e(T,{dense:"",label:"Qty",filled:"",modelValue:a.BALQT,"onUpdate:modelValue":t=>a.BALQT=t},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1024)]),_:2},1024),e(f,null,{default:l(()=>[e(V,null,{default:l(()=>[u(" Rp. "+S(a.TSLODETA_PRC.toLocaleString()),1)]),_:2},1024),e(V,{caption:""},{default:l(()=>[u(" Price ")]),_:1})]),_:2},1024),e(f,{side:""},{default:l(()=>[e(D,{icon:"delete",color:"red",flat:"",onClick:t=>i.onClickDeleteLines(s)},null,8,["onClick"])]),_:2},1024)]),_:2},1032,["loading"]))),128)):R((c(),b(I,{key:1,class:"q-my-sm",clickable:""},{default:l(()=>[e(f,null,{default:l(()=>[e(V,null,{default:l(()=>[u(" Choose sales order first to access item list ")]),_:1})]),_:1})]),_:1})),[[B]])]),_:1})])]),_:1})]),_:1})]),_:1},8,["onHide"]))}},re={class:"q-pa-md"},ce={class:"row q-pb-md"},me=o("div",{class:"col"},[o("span",{class:"text-h4"},"Incoming")],-1),pe={class:"col text-right"},_e={class:"row q-pt-md"},fe={class:"col"},Qe={__name:"incomingIndex",setup(q){const d=O(),v=r([]),m=r([{name:"TRCV_RCVCD",label:"Receive ID",field:"TRCV_RCVCD",sortable:!0,align:"left"},{name:"MSUP_SUPNM",label:"Supplier Name",field:"MSUP_SUPNM",sortable:!0,align:"left"},{name:"TOT_RCV",label:"Total Qty",field:"TOT_RCV",sortable:!0,align:"left"},{name:"TOT_AMT",label:"Total Amount",field:"TOT_AMT",sortable:!0,align:"left"}]),p=r(!1),g=r(""),C=r("");E(()=>{i()});const i=async()=>{p.value=!0,await $.post("receive/searchAPI",{searchBy:g.value,searchValue:C.value}).then(a=>{p.value=!1,v.value=a.data.data}).catch(a=>{p.value=!1})},n=(a=[])=>{d.dialog({component:ue,componentProps:{dataHeader:a}}).onOk(async s=>{getOutgoingData()})};return(a,s)=>(c(),h("div",re,[o("div",ce,[me,o("div",pe,[e(D,{icon:"add",color:"blue",onClick:s[0]||(s[0]=t=>n())},{default:l(()=>[e(Q,null,{default:l(()=>[u("Create New Delivery")]),_:1})]),_:1})])]),e(Y),o("div",_e,[o("div",fe,[e(j,{title:"Outgoing List",rows:v.value,columns:m.value,"row-key":"TDLVORD_DLVCD",loading:p.value,dense:"",pagination:{rowsPerPage:20},class:"my-sticky-header-column-table"},{"top-right":l(()=>[e(N,{outlined:"",modelValue:g.value,"onUpdate:modelValue":s[1]||(s[1]=t=>g.value=t),options:a.columns,label:"Search Columns","option-value":"name","option-label":"label","emit-value":"",dense:"","map-options":""},null,8,["modelValue","options"]),e(T,{borderless:"",dense:"",modelValue:C.value,"onUpdate:modelValue":[s[2]||(s[2]=t=>C.value=t),s[3]||(s[3]=t=>a.getOutgoingData())],placeholder:"Search",outlined:"",debounce:"1000"},{append:l(()=>[e(L,{name:"search"})]),_:1},8,["modelValue"])]),header:l(t=>[e(P,{props:t},{default:l(()=>[(c(!0),h(y,null,w(t.cols,_=>(c(),b(k,{key:_.name,props:t},{default:l(()=>[u(S(_.label),1)]),_:2},1032,["props"]))),128)),e(k,{"auto-width":""},{default:l(()=>[u("Action")]),_:1})]),_:2},1032,["props"])]),body:l(t=>[e(P,{props:t},{default:l(()=>[(c(!0),h(y,null,w(t.cols,_=>(c(),b(M,{key:_.name,props:t},{default:l(()=>[u(S(_.value),1)]),_:2},1032,["props"]))),128)),e(M,{"auto-width":""},{default:l(()=>[e(D,{flat:"",color:"orange",icon:"edit",onClick:_=>n(t.row),dense:""},{default:l(()=>[e(Q,null,{default:l(()=>[u("Edit Data")]),_:1})]),_:2},1032,["onClick"]),e(D,{flat:"",color:"red",icon:"delete",onClick:_=>a.onDelete(t.row.TDLVORD_DLVCD),dense:""},{default:l(()=>[e(Q,null,{default:l(()=>[u("Edit Data")]),_:1})]),_:2},1032,["onClick"])]),_:2},1024)]),_:2},1032,["props"])]),_:1},8,["rows","columns","loading"])])])]))}};export{Qe as default};
