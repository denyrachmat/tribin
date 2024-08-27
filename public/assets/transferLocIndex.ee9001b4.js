import{t as n,o as q,C as I,R as y,F as i,aY as D,J as l,$ as V,Q as L}from"./index.62a1d3ca.js";import{c as C}from"./QSelect.bb4b1e86.js";import{u as h}from"./format.c0b2ab39.js";import"./use-dialog-plugin-component.23878201.js";import{api_web as g}from"./axios.3bd5f3f5.js";const Q={class:"q-pa-md"},F=l("div",{class:"row q-pb-md"},[l("div",{class:"col"},[l("span",{class:"text-h4"},"Transfer Location")]),l("div",{class:"col text-right"})],-1),N={class:"row q-col-gutter-md q-pt-md"},U={class:"col-12"},$={class:"row q-col-gutter-md q-pt-md"},B={class:"col-12"},S={class:"row q-col-gutter-md q-pt-md"},k={class:"col-12 col-sm-6"},x={class:"col-12 col-sm-6"},P={class:"row q-col-gutter-md q-pt-md"},A={class:"col-12"},R={class:"row q-col-gutter-md q-pt-md"},Y={class:"col-12"},H={__name:"transferLocIndex",setup(E){const _=h(),v=n(""),u=n(""),d=n(""),c=n(""),m=n(0),a=n(!1),M=n([]),p=n([]);q(async()=>{await O(""),await b("")});const f=(t,e,o,s)=>{e(async()=>{s==="loc"&&await O(t),s==="item"&&await b(t)})},O=async(t,e="MSUP_SUPNM")=>{a.value=!0,await g.post("location/searchAPI",{searchBy:e,searchValue:t}).then(o=>{a.value=!1,p.value=o.data.data}).catch(o=>{a.value=!1})},b=async t=>{a.value=!0,await g.post("item/searchAPITBL",{searchValue:t}).then(e=>{a.value=!1,M.value=e.data.data}).catch(()=>{a.value=!1})},w=()=>{_.dialog({title:"Confirmation",message:`Are you sure want to transfer from ${u.value} to ${d.value} ?`,cancel:!0,persistent:!0}).onOk(async()=>{a.value=!0,await g.post("inventory/transferLoc",{DOC:v.value,LOCFROM:u.value,LOCTO:d.value,ITMCD:c.value,QTY:m.value}).then(t=>{a.value=!1,_.notify({color:"green",message:`${t.data.msg}`}),onDialogOK()}).catch(t=>{a.value=!1})})},T=()=>{v.value="",u.value="",d.value="",c.value="",m.value=0};return(t,e)=>(I(),y("div",Q,[F,i(D),l("div",N,[l("div",U,[i(V,{label:"Doc Code",dense:"",filled:"",modelValue:v.value,"onUpdate:modelValue":e[0]||(e[0]=o=>v.value=o)},null,8,["modelValue"])])]),l("div",$,[l("div",B,[i(C,{dense:"",filled:"",label:"Item Name",modelValue:c.value,"onUpdate:modelValue":e[1]||(e[1]=o=>c.value=o),"use-input":"","input-debounce":"500",options:M.value,onFilter:e[2]||(e[2]=(o,s,r)=>f(o,s,r,"item")),behavior:"dialog","option-label":"MITM_ITMNM","option-value":"MITM_ITMCD","emit-value":"","map-options":"",loading:a.value},null,8,["modelValue","options","loading"])])]),l("div",S,[l("div",k,[i(C,{dense:"",filled:"",label:"Transfer From",modelValue:u.value,"onUpdate:modelValue":e[3]||(e[3]=o=>u.value=o),"use-input":"","input-debounce":"500",options:p.value,onFilter:e[4]||(e[4]=(o,s,r)=>f(o,s,r,"loc")),behavior:"dialog","option-label":"MLOC_LOCNM","option-value":"MLOC_LOCCD","emit-value":"","map-options":"",loading:a.value},null,8,["modelValue","options","loading"])]),l("div",x,[i(C,{dense:"",filled:"",label:"Transfer To",modelValue:d.value,"onUpdate:modelValue":e[5]||(e[5]=o=>d.value=o),"use-input":"","input-debounce":"500",options:p.value,onFilter:e[6]||(e[6]=(o,s,r)=>f(o,s,r,"loc")),behavior:"dialog","option-label":"MLOC_LOCNM","option-value":"MLOC_LOCCD","emit-value":"","map-options":"",loading:a.value},null,8,["modelValue","options","loading"])])]),l("div",P,[l("div",A,[i(V,{label:"Qty",dense:"",filled:"",modelValue:m.value,"onUpdate:modelValue":e[7]||(e[7]=o=>m.value=o)},null,8,["modelValue"])])]),l("div",R,[l("div",Y,[i(L,{color:"primary",label:"Save",onClick:e[8]||(e[8]=o=>w())}),i(L,{color:"warning",label:"Clear",onClick:e[9]||(e[9]=o=>T())})])])]))}};export{H as default};
