import{s as l,o as b,B as m,P as f,E as e,aX as V,I as s,D as t,Z as D,am as Q,R as w,S as h,C as y,H as v,O as S,Q as k}from"./index.cfa2175e.js";import{u as B,j as O,k as T}from"./QTable.202c778a.js";import{Q as U,a as _}from"./QTd.df459092.js";import{Q as N}from"./QTooltip.5600edd4.js";import{api_web as L}from"./axios.d728f84e.js";const M={class:"q-pa-md"},x=s("div",{class:"row q-pb-md"},[s("div",{class:"col"},[s("span",{class:"text-h4"},"Outgoing Confirmation")])],-1),q={class:"row q-pt-md"},I={class:"col"},H={__name:"outConfView",setup(P){B();const c=l([]),p=l([{name:"TDLVORD_DLVCD",label:"DO Number",field:"TDLVORD_DLVCD",sortable:!0,align:"left"},{name:"MCUS_CUSNM",label:"Customer",field:"MCUS_CUSNM",sortable:!0,align:"left"}]),n=l(!1),u=l(""),i=l("");b(()=>{C()});const C=async()=>{n.value=!0,await L.post("delivery/unconfirmed",{searchBy:u.value,searchValue:i.value}).then(r=>{n.value=!1,c.value=r.data.data}).catch(r=>{n.value=!1})},g=()=>{};return(r,a)=>(m(),f("div",M,[x,e(V),s("div",q,[s("div",I,[e(O,{title:"Outstanding Confirmation",rows:c.value,columns:p.value,"row-key":"name",loading:n.value,dense:"",pagination:{rowsPerPage:20},class:"my-sticky-header-column-table"},{"top-right":t(()=>[e(T,{outlined:"",modelValue:u.value,"onUpdate:modelValue":a[0]||(a[0]=o=>u.value=o),options:p.value,label:"Search Columns","option-value":"name","option-label":"label","emit-value":"",dense:"","map-options":""},null,8,["modelValue","options"]),e(D,{borderless:"",dense:"",modelValue:i.value,"onUpdate:modelValue":[a[1]||(a[1]=o=>i.value=o),a[2]||(a[2]=o=>r.dataOutstanding())],placeholder:"Search",outlined:"",debounce:"1000"},{append:t(()=>[e(Q,{name:"search"})]),_:1},8,["modelValue"])]),body:t(o=>[e(U,{props:o},{default:t(()=>[(m(!0),f(w,null,h(o.cols,d=>(m(),y(_,{key:d.name,props:o},{default:t(()=>[v(S(d.value),1)]),_:2},1032,["props"]))),128)),e(_,{"auto-width":""},{default:t(()=>[e(k,{flat:"",color:"green",icon:"check",onClick:a[3]||(a[3]=d=>g()),dense:""},{default:t(()=>[e(N,null,{default:t(()=>[v("Confirm Delivery")]),_:1})]),_:1})]),_:1})]),_:2},1032,["props"])]),_:1},8,["rows","columns","loading"])])])]))}};export{H as default};
