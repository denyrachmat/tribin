import{Q as c}from"./QTooltip.5b3f3e67.js";import{s as i,o as P,B as d,P as f,I as r,E as a,D as l,Q as _,aX as g,H as n,Z as k,am as S,R as U,S as b,C as v,O as m}from"./index.e21e6631.js";import{u as V,j as y,k as A,l as p}from"./QTable.a9350315.js";import{Q as w,a as h}from"./QTd.93c4a04e.js";import{api_web as R}from"./axios.0175c4de.js";const N={class:"q-pa-md"},B={class:"row q-pb-md"},I=r("div",{class:"col"},[r("span",{class:"text-h4"},"Sales Order / Receive Order")],-1),q={class:"col text-right"},E={class:"row q-pt-md"},M={class:"col"},H={__name:"salesOrderView",setup(J){V();const Q=i("TQUO_QUOCD"),T=i(""),C=i([]),O=i([{name:"TQUO_QUOCD",label:"Quot. Code",field:"TQUO_QUOCD",sortable:!0,align:"left"},{name:"TQUO_SBJCT",label:"Quot. Subject",field:"TQUO_SBJCT",sortable:!0,align:"left"},{name:"MCUS_CUSNM",label:"Customer Name",field:"MCUS_CUSNM",sortable:!0,align:"left"},{name:"TQUO_ATTN",label:"Customer Attn",field:"TQUO_ATTN",sortable:!0,align:"left"},{name:"TQUO_CUSCD",label:"Customer Code",field:"TQUO_CUSCD",sortable:!0,align:"left"},{name:"TQUO_ISSUDT",label:"Issue Date",field:"TQUO_ISSUDT",sortable:!0,align:"left"},{name:"TQUO_PROJECT_LOCATION",label:"Proj. Loc",field:"TQUO_PROJECT_LOCATION",sortable:!0,align:"left"}]),u=i(!1);P(()=>{D()});const D=async()=>{u.value=!0,await R.post("receive-order/searchAPI",{searchBy:Q.value,searchValue:T.value}).then(t=>{u.value=!1,C.value=t.data.data}).catch(t=>{u.value=!1})};return(t,s)=>(d(),f("div",N,[r("div",B,[I,r("div",q,[a(_,{icon:"add",color:"blue",onClick:t.onClickNew},{default:l(()=>[a(c,null,{default:l(()=>[n("Create New RO")]),_:1})]),_:1},8,["onClick"])])]),a(g),r("div",E,[r("div",M,[a(y,{title:"Created RO",rows:C.value,columns:O.value,"row-key":"name",loading:u.value,dense:"",pagination:{rowsPerPage:20},class:"my-sticky-header-column-table"},{"top-right":l(()=>[a(A,{outlined:"",modelValue:Q.value,"onUpdate:modelValue":s[0]||(s[0]=e=>Q.value=e),options:O.value,label:"Search Columns","option-value":"name","option-label":"label","emit-value":"",dense:"","map-options":""},null,8,["modelValue","options"]),a(k,{borderless:"",dense:"",modelValue:T.value,"onUpdate:modelValue":[s[1]||(s[1]=e=>T.value=e),s[2]||(s[2]=e=>t.dataQuo())],placeholder:"Search",outlined:"",debounce:"1000"},{append:l(()=>[a(S,{name:"search"})]),_:1},8,["modelValue"])]),header:l(e=>[a(w,{props:e},{default:l(()=>[a(p,{"auto-width":""},{default:l(()=>[n("Action")]),_:1}),(d(!0),f(U,null,b(e.cols,o=>(d(),v(p,{key:o.name,props:e},{default:l(()=>[n(m(o.label),1)]),_:2},1032,["props"]))),128))]),_:2},1032,["props"])]),body:l(e=>[a(w,{props:e},{default:l(()=>[a(h,{"auto-width":""},{default:l(()=>[a(_,{flat:"",color:e.row.TQUO_APPRVDT!==null?"grey":"orange",icon:"edit",onClick:o=>t.onClickEdit(e.row.TQUO_QUOCD),dense:"",disable:e.row.TQUO_APPRVDT!==null},{default:l(()=>[a(c,null,{default:l(()=>[n(m(e.row.TQUO_APPRVDT?"Quotation already approved, cannot edit !":"Edit this quotation"),1)]),_:2},1024)]),_:2},1032,["color","onClick","disable"]),a(_,{flat:"",color:e.row.TQUO_APPRVDT!==null?"grey":"red",icon:"delete",onClick:o=>t.onClickDelete(e.row.TQUO_QUOCD),dense:"",disable:e.row.TQUO_APPRVDT!==null},{default:l(()=>[a(c,null,{default:l(()=>[n(m(e.row.TQUO_APPRVDT?"Quotation already approved, cannot delete !":"Delete this quotation"),1)]),_:2},1024)]),_:2},1032,["color","onClick","disable"]),a(_,{flat:"",color:"indigo",icon:"print",onClick:o=>t.onClickPrint(e.row.TQUO_QUOCD),dense:""},{default:l(()=>[a(c,null,{default:l(()=>[n("Print this quotation")]),_:1})]),_:2},1032,["onClick"])]),_:2},1024),(d(!0),f(U,null,b(e.cols,o=>(d(),v(h,{key:o.name,props:e},{default:l(()=>[n(m(o.value),1)]),_:2},1032,["props"]))),128))]),_:2},1032,["props"])]),_:1},8,["rows","columns","loading"])])])]))}};export{H as default};
