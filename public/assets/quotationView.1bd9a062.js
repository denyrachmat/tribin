import{s,o as r,B as l,a3 as i,E as e,a4 as d,I as a}from"./index.d4d5fc6d.js";import{f as u}from"./QTable.e4d38dbd.js";import{api_web as m}from"./axios.dc90fa96.js";const _={class:"q-pa-md"},p=a("div",{class:"row q-pb-md"},[a("div",{class:"col"},[a("span",{class:"text-h4"},"Quotation ")])],-1),f={class:"row q-pt-md"},h={class:"col"},Q={__name:"quotationView",setup(w){const o=s([]),c=s([{name:"fat",label:"Fat (g)",field:"fat",sortable:!0}]);r(()=>{n()});const n=async()=>{await m.post("quotation",{searchBy:"",searchValue:""}).then(t=>{o.value=t.data})};return(t,v)=>(l(),i("div",_,[p,e(d),a("div",f,[a("div",h,[e(u,{title:"Created Quotation",rows:o.value,columns:c.value,"row-key":"name"},null,8,["rows","columns"])])])]))}};export{Q as default};
