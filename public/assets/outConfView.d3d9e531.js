import{o as V,B as n,C as v,D as e,E as o,L as T,M as B,I as r,O as g,Y as U,s as i,P as _,aX as q,Z as H,am as L,R as C,S as w,H as c,Q as M}from"./index.17ee3d8f.js";import{a as k,k as N,l as I,m as b}from"./QTable.424611ab.js";import{Q,a as D}from"./QTd.00892745.js";import{Q as $}from"./QTooltip.cef5964a.js";import{api_web as x}from"./axios.845c77b2.js";const P={class:"text-h6"},R={__name:"onCheckItem",props:{dataHeader:Array},setup(y){return k(),V(()=>{console.log(val)}),(d,m)=>(n(),v(U,{ref:"dialogRef",onHide:d.onDialogHide,"transition-show":"slide-up","transition-hide":"slide-down","full-width":"",persistent:""},{default:e(()=>[o(T,{class:"q-dialog-plugin bg-white q-pa-sm"},{default:e(()=>[o(B,null,{default:e(()=>[r("div",P,"Item Check "+g(d.val),1)]),_:1})]),_:1})]),_:1},8,["onHide"]))}},A={class:"q-pa-md"},E=r("div",{class:"row q-pb-md"},[r("div",{class:"col"},[r("span",{class:"text-h4"},"Outgoing Confirmation")])],-1),F={class:"row q-pt-md"},X={class:"col"},J={__name:"outConfView",setup(y){const d=k(),m=i([]),h=i([{name:"TDLVORD_DLVCD",label:"DO Number",field:"TDLVORD_DLVCD",sortable:!0,align:"left"},{name:"MCUS_CUSNM",label:"Customer",field:"MCUS_CUSNM",sortable:!0,align:"left"}]),u=i(!1),p=i(""),f=i("");V(()=>{S()});const S=async()=>{u.value=!0,await x.post("delivery/unconfirmed",{searchBy:p.value,searchValue:f.value}).then(t=>{u.value=!1,m.value=t.data.data}).catch(t=>{u.value=!1})},O=t=>{console.log(t),d.dialog({component:R,componentProps:{dataHeader:t}}).onOk(async l=>{})};return(t,l)=>(n(),_("div",A,[E,o(q),r("div",F,[r("div",X,[o(N,{title:"Outstanding Confirmation",rows:m.value,columns:h.value,"row-key":"name",loading:u.value,dense:"",pagination:{rowsPerPage:20},class:"my-sticky-header-column-table"},{"top-right":e(()=>[o(I,{outlined:"",modelValue:p.value,"onUpdate:modelValue":l[0]||(l[0]=a=>p.value=a),options:h.value,label:"Search Columns","option-value":"name","option-label":"label","emit-value":"",dense:"","map-options":""},null,8,["modelValue","options"]),o(H,{borderless:"",dense:"",modelValue:f.value,"onUpdate:modelValue":[l[1]||(l[1]=a=>f.value=a),l[2]||(l[2]=a=>t.dataOutstanding())],placeholder:"Search",outlined:"",debounce:"1000"},{append:e(()=>[o(L,{name:"search"})]),_:1},8,["modelValue"])]),header:e(a=>[o(Q,{props:a},{default:e(()=>[(n(!0),_(C,null,w(a.cols,s=>(n(),v(b,{key:s.name,props:a},{default:e(()=>[c(g(s.label),1)]),_:2},1032,["props"]))),128)),o(b,{"auto-width":""},{default:e(()=>[c("Action")]),_:1})]),_:2},1032,["props"])]),body:e(a=>[o(Q,{props:a},{default:e(()=>[(n(!0),_(C,null,w(a.cols,s=>(n(),v(D,{key:s.name,props:a},{default:e(()=>[c(g(s.value),1)]),_:2},1032,["props"]))),128)),o(D,{"auto-width":""},{default:e(()=>[o(M,{flat:"",color:"green",icon:"check",onClick:s=>O(a.row),dense:""},{default:e(()=>[o($,null,{default:e(()=>[c("Confirm Delivery")]),_:1})]),_:2},1032,["onClick"])]),_:2},1024)]),_:2},1032,["props"])]),_:1},8,["rows","columns","loading"])])])]))}};export{J as default};
