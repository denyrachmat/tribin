import{s as a,B as l,R as s,I as t,a_ as m,a$ as _,E as e,b4 as p,D as n,K as h,b1 as c,aa as g,J as b}from"./index.f63a7d5a.js";import{a as y}from"./QTable.17bcfdcf.js";import"./axios.a70d5a80.js";const f={class:"q-pa-md bg-grey-5 window-height"},v={class:"row"},w={class:"row"},x={class:"col"},C={class:"text-h3 text-cyan"},T={class:"text-subtitle2 text-cyan"},k={class:"col text-right"},q={class:"row q-px-sm"},B={class:"col"},E={__name:"dashboardView",setup(Q){const r=a([{total:900,title:"Total Sales",icon:"shopping_cart",color:"cyan"},{total:900,title:"Total Purchase",icon:"shopping_bag",color:"cyan"},{total:900,title:"Total Profit",icon:"payments",color:"cyan"},{total:15,title:"Total Customer",icon:"group",color:"cyan"},{total:15,title:"Total Customer",icon:"group",color:"cyan"},{total:15,title:"Total Customer",icon:"group",color:"cyan"},{total:15,title:"Total Customer",icon:"group",color:"cyan"},{total:15,title:"Total Customer",icon:"group",color:"cyan"}]),i=a([{name:"name",label:"Business",field:"name",sortable:!0,align:"left"},{name:"quo",label:"Quotation",field:"quo",sortable:!0,align:"center"},{name:"pr",label:"Purchase Request",field:"pr",sortable:!0,align:"center"},{name:"spk",label:"SPK",field:"spk",sortable:!0,align:"center"}]),u=a([]);return(P,S)=>(l(),s("div",f,[t("div",v,[(l(!0),s(m,null,_(r.value,(o,d)=>(l(),s("div",{class:p("col-3 q-pa-sm"),key:d},[e(b,null,{default:n(()=>[e(h,null,{default:n(()=>[t("div",w,[t("div",x,[t("div",C,c(o.total),1),t("div",T,c(o.title),1)]),t("div",k,[e(g,{name:o.icon,size:"4.4em",color:o.color},null,8,["name","color"])])])]),_:2},1024)]),_:2},1024)]))),128))]),t("div",q,[t("div",B,[e(y,{flat:"",bordered:"",title:"Approval List",rows:u.value,columns:i.value,"row-key":"name"},null,8,["rows","columns"])])])]))}};export{E as default};
