import{s,o as y,B as n,P as p,E as o,aX as k,I as r,D as a,Z as S,am as T,R as _,S as C,C as b,H as d,O as g,Q as B}from"./index.5a7122bc.js";import{u as O,j as U,k as N,l as V}from"./QTable.dc67c442.js";import{Q as h,a as Q}from"./QTd.abc70778.js";import{Q as L}from"./QTooltip.b28ef7e6.js";import{api_web as M}from"./axios.80863566.js";const x={class:"q-pa-md"},q=r("div",{class:"row q-pb-md"},[r("div",{class:"col"},[r("span",{class:"text-h4"},"Outgoing Confirmation")])],-1),I={class:"row q-pt-md"},P={class:"col"},H={__name:"outConfView",setup(R){O();const f=s([]),v=s([{name:"TDLVORD_DLVCD",label:"DO Number",field:"TDLVORD_DLVCD",sortable:!0,align:"left"},{name:"MCUS_CUSNM",label:"Customer",field:"MCUS_CUSNM",sortable:!0,align:"left"}]),u=s(!1),m=s(""),c=s("");y(()=>{w()});const w=async()=>{u.value=!0,await M.post("delivery/unconfirmed",{searchBy:m.value,searchValue:c.value}).then(i=>{u.value=!1,f.value=i.data.data}).catch(i=>{u.value=!1})},D=()=>{};return(i,t)=>(n(),p("div",x,[q,o(k),r("div",I,[r("div",P,[o(U,{title:"Outstanding Confirmation",rows:f.value,columns:v.value,"row-key":"name",loading:u.value,dense:"",pagination:{rowsPerPage:20},class:"my-sticky-header-column-table"},{"top-right":a(()=>[o(N,{outlined:"",modelValue:m.value,"onUpdate:modelValue":t[0]||(t[0]=e=>m.value=e),options:v.value,label:"Search Columns","option-value":"name","option-label":"label","emit-value":"",dense:"","map-options":""},null,8,["modelValue","options"]),o(S,{borderless:"",dense:"",modelValue:c.value,"onUpdate:modelValue":[t[1]||(t[1]=e=>c.value=e),t[2]||(t[2]=e=>i.dataOutstanding())],placeholder:"Search",outlined:"",debounce:"1000"},{append:a(()=>[o(T,{name:"search"})]),_:1},8,["modelValue"])]),header:a(e=>[o(h,{props:e},{default:a(()=>[(n(!0),p(_,null,C(e.cols,l=>(n(),b(V,{key:l.name,props:e},{default:a(()=>[d(g(l.label),1)]),_:2},1032,["props"]))),128)),o(V,{"auto-width":""},{default:a(()=>[d("Action")]),_:1})]),_:2},1032,["props"])]),body:a(e=>[o(h,{props:e},{default:a(()=>[(n(!0),p(_,null,C(e.cols,l=>(n(),b(Q,{key:l.name,props:e},{default:a(()=>[d(g(l.value),1)]),_:2},1032,["props"]))),128)),o(Q,{"auto-width":""},{default:a(()=>[o(B,{flat:"",color:"green",icon:"check",onClick:t[3]||(t[3]=l=>D()),dense:""},{default:a(()=>[o(L,null,{default:a(()=>[d("Confirm Delivery")]),_:1})]),_:1})]),_:1})]),_:2},1032,["props"])]),_:1},8,["rows","columns","loading"])])])]))}};export{H as default};
