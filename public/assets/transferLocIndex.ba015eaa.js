import{t as n,o as I,C as h,R as T,F as i,aM as y,J as l,$ as w,Q as L}from"./index.6fab3150.js";import{e as g}from"./QSelect.edb84f43.js";import{u as D}from"./format.032697d9.js";import"./use-dialog-plugin-component.93d02daf.js";import{api_web as C}from"./axios.5e75fb70.js";const N={class:"q-pa-md"},Q=l("div",{class:"row q-pb-md"},[l("div",{class:"col"},[l("span",{class:"text-h4"},"Transfer Location")]),l("div",{class:"col text-right"})],-1),F={class:"row q-col-gutter-md q-pt-md"},U={class:"col-12"},$={class:"row q-col-gutter-md q-pt-md"},S={class:"col-12"},k={class:"row q-col-gutter-md q-pt-md"},x={class:"col-12 col-sm-6"},B={class:"col-12 col-sm-6"},A={class:"row q-col-gutter-md q-pt-md"},P={class:"col-12"},R={class:"row q-col-gutter-md q-pt-md"},E={class:"col-12"},H={__name:"transferLocIndex",setup(J){const _=D(),c=n(""),u=n(""),r=n(""),v=n(""),m=n(0),a=n(!1),M=n([]),p=n([]);I(async()=>{await b(""),await V("")});const f=(t,e,o,s)=>{e(async()=>{s==="loc"&&await b(t),s==="item"&&await V(t)})},b=async(t,e="MSUP_SUPNM")=>{a.value=!0,await C.post("location/searchAPI",{searchBy:e,searchValue:t}).then(o=>{a.value=!1,p.value=o.data.data}).catch(o=>{a.value=!1})},V=async t=>{a.value=!0,await C.post("item/searchAPI",{searchValue:t,isITMCD:1}).then(e=>{a.value=!1,M.value=e.data.data}).catch(()=>{a.value=!1})},O=()=>{_.dialog({title:"Confirmation",message:`Are you sure want to transfer from ${u.value} to ${r.value} ?`,cancel:!0,persistent:!0}).onOk(async()=>{a.value=!0,await C.post("location",{header:header.value}).then(t=>{a.value=!1,_.notify({color:"green",message:`${t.data.msg}`}),onDialogOK()}).catch(()=>{a.value=!1})})},q=()=>{c.value="",u.value="",r.value="",v.value="",m.value=0};return(t,e)=>(h(),T("div",N,[Q,i(y),l("div",F,[l("div",U,[i(w,{label:"Doc Code",dense:"",filled:"",modelValue:c.value,"onUpdate:modelValue":e[0]||(e[0]=o=>c.value=o)},null,8,["modelValue"])])]),l("div",$,[l("div",S,[i(g,{dense:"",filled:"",label:"Item Name",modelValue:v.value,"onUpdate:modelValue":e[1]||(e[1]=o=>v.value=o),"use-input":"","input-debounce":"500",options:M.value,onFilter:e[2]||(e[2]=(o,s,d)=>f(o,s,d,"item")),behavior:"dialog","option-label":"MITM_ITMNMREAL","option-value":"MITM_ITMNM","emit-value":"","map-options":"",loading:a.value},null,8,["modelValue","options","loading"])])]),l("div",k,[l("div",x,[i(g,{dense:"",filled:"",label:"Transfer From",modelValue:u.value,"onUpdate:modelValue":e[3]||(e[3]=o=>u.value=o),"use-input":"","input-debounce":"500",options:p.value,onFilter:e[4]||(e[4]=(o,s,d)=>f(o,s,d,"loc")),behavior:"dialog","option-label":"MLOC_LOCCD","option-value":"MLOC_LOCNM","emit-value":"","map-options":"",loading:a.value},null,8,["modelValue","options","loading"])]),l("div",B,[i(g,{dense:"",filled:"",label:"Transfer To",modelValue:r.value,"onUpdate:modelValue":e[5]||(e[5]=o=>r.value=o),"use-input":"","input-debounce":"500",options:p.value,onFilter:e[6]||(e[6]=(o,s,d)=>f(o,s,d,"loc")),behavior:"dialog","option-label":"MLOC_LOCCD","option-value":"MLOC_LOCNM","emit-value":"","map-options":"",loading:a.value},null,8,["modelValue","options","loading"])])]),l("div",A,[l("div",P,[i(w,{label:"Qty",dense:"",filled:"",modelValue:m.value,"onUpdate:modelValue":e[7]||(e[7]=o=>m.value=o)},null,8,["modelValue"])])]),l("div",R,[l("div",E,[i(L,{color:"primary",label:"Save",onClick:e[8]||(e[8]=o=>O())}),i(L,{color:"warning",label:"Clear",onClick:e[9]||(e[9]=o=>q())})])])]))}};export{H as default};
