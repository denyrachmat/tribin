import{Q as c}from"./QTooltip.7c5d03c8.js";import{s as d,o as h,B as i,P as O,I as r,E as a,D as l,Q as _,aX as g,H as n,Z as k,am as P,R as T,S,C as p,O as m}from"./index.3e46ec86.js";import{u as V,j as y,k as R,l as b}from"./QTable.2e0b170a.js";import{Q as D,a as U}from"./QTd.f7aa37f9.js";import{api_web as A}from"./axios.0c41c01b.js";const L={class:"q-pa-md"},N={class:"row q-pb-md"},E=r("div",{class:"col"},[r("span",{class:"text-h4"},"Sales Order / Receive Order")],-1),B={class:"col text-right"},I={class:"row q-pt-md"},M={class:"col"},X={__name:"salesOrderView",setup(q){V();const f=d("TQUO_QUOCD"),C=d(""),v=d([]),Q=d([{name:"TSLO_SLOCD",label:"RO. Code",field:"TSLO_SLOCD",sortable:!0,align:"left"},{name:"MCUS_CUSNM",label:"Customer Name",field:"MCUS_CUSNM",sortable:!0,align:"left"},{name:"TSLO_ADDRESS_NAME",label:"Customer Addr.",field:"TSLO_ADDRESS_NAME",sortable:!0,align:"left"},{name:"TSLO_CUSCD",label:"Customer Code",field:"TSLO_CUSCD",sortable:!0,align:"left"},{name:"TSLO_ISSUDT",label:"Issue Date",field:"TSLO_ISSUDT",sortable:!0,align:"left"},{name:"TSLO_QUOCD",label:"Quot. Code",field:"TSLO_QUOCD",sortable:!0,align:"left"}]),u=d(!1);h(()=>{w()});const w=async()=>{u.value=!0,await A.post("receive-order/searchAPI",{searchBy:f.value,searchValue:C.value}).then(t=>{u.value=!1,v.value=t.data.data}).catch(t=>{u.value=!1})};return(t,s)=>(i(),O("div",L,[r("div",N,[E,r("div",B,[a(_,{icon:"add",color:"blue",onClick:t.onClickNew},{default:l(()=>[a(c,null,{default:l(()=>[n("Create New RO")]),_:1})]),_:1},8,["onClick"])])]),a(g),r("div",I,[r("div",M,[a(y,{title:"Created RO",rows:v.value,columns:Q.value,"row-key":"name",loading:u.value,dense:"",pagination:{rowsPerPage:20},class:"my-sticky-header-column-table"},{"top-right":l(()=>[a(R,{outlined:"",modelValue:f.value,"onUpdate:modelValue":s[0]||(s[0]=e=>f.value=e),options:Q.value,label:"Search Columns","option-value":"name","option-label":"label","emit-value":"",dense:"","map-options":""},null,8,["modelValue","options"]),a(k,{borderless:"",dense:"",modelValue:C.value,"onUpdate:modelValue":[s[1]||(s[1]=e=>C.value=e),s[2]||(s[2]=e=>t.dataQuo())],placeholder:"Search",outlined:"",debounce:"1000"},{append:l(()=>[a(P,{name:"search"})]),_:1},8,["modelValue"])]),header:l(e=>[a(D,{props:e},{default:l(()=>[a(b,{"auto-width":""},{default:l(()=>[n("Action")]),_:1}),(i(!0),O(T,null,S(e.cols,o=>(i(),p(b,{key:o.name,props:e},{default:l(()=>[n(m(o.label),1)]),_:2},1032,["props"]))),128))]),_:2},1032,["props"])]),body:l(e=>[a(D,{props:e},{default:l(()=>[a(U,{"auto-width":""},{default:l(()=>[a(_,{flat:"",color:e.row.TQUO_APPRVDT!==null?"grey":"orange",icon:"edit",onClick:o=>t.onClickEdit(e.row.TQUO_QUOCD),dense:"",disable:e.row.TQUO_APPRVDT!==null},{default:l(()=>[a(c,null,{default:l(()=>[n(m(e.row.TQUO_APPRVDT?"Quotation already approved, cannot edit !":"Edit this quotation"),1)]),_:2},1024)]),_:2},1032,["color","onClick","disable"]),a(_,{flat:"",color:e.row.TQUO_APPRVDT!==null?"grey":"red",icon:"delete",onClick:o=>t.onClickDelete(e.row.TQUO_QUOCD),dense:"",disable:e.row.TQUO_APPRVDT!==null},{default:l(()=>[a(c,null,{default:l(()=>[n(m(e.row.TQUO_APPRVDT?"Quotation already approved, cannot delete !":"Delete this quotation"),1)]),_:2},1024)]),_:2},1032,["color","onClick","disable"]),a(_,{flat:"",color:"indigo",icon:"print",onClick:o=>t.onClickPrint(e.row.TQUO_QUOCD),dense:""},{default:l(()=>[a(c,null,{default:l(()=>[n("Print this quotation")]),_:1})]),_:2},1032,["onClick"])]),_:2},1024),(i(!0),O(T,null,S(e.cols,o=>(i(),p(U,{key:o.name,props:e},{default:l(()=>[n(m(o.value),1)]),_:2},1032,["props"]))),128))]),_:2},1032,["props"])]),_:1},8,["rows","columns","loading"])])])]))}};export{X as default};
