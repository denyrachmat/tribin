import{t as n,C as V,R as h,F as o,aI as b,J as a,E as l,$ as c,Q as i,av as p,U as m}from"./index.93306b57.js";import{Q as v,a as f,C as _}from"./ClosePopup.077baaf2.js";import{u as y}from"./use-quasar.86585ee1.js";import{api_web as C}from"./axios.566cbf6f.js";import"./use-render-cache.3aae9b27.js";import"./date.60909097.js";import"./format.64b8710f.js";const g={class:"q-pa-md"},k=a("div",{class:"row q-pb-md"},[a("div",{class:"col"},[a("span",{class:"text-h4"},"Journal Report")]),a("div",{class:"col text-right"})],-1),Q={class:"row q-pt-md"},R={class:"col"},U={class:"row items-center justify-end"},D={class:"col q-pl-md"},Y={class:"row items-center justify-end"},q={class:"row q-pt-md"},j={class:"col"},O={__name:"journalReportIndex",setup(B){const w=y(),s=n(""),r=n("");n([]);const d=n(!1),x=()=>{w.dialog({title:"Confirmation",message:"Are you sure want to export excel report ?",cancel:!0,persistent:!0}).onOk(async()=>{d.value=!0,await C.post("acc/exportJournalReport",{dateFr:s.value,dateTo:r.value},{responseType:"arraybuffer"}).then(u=>{d.value=!1;const e=document.createElement("a");e.download=name,e.href=window.URL.createObjectURL(new Blob([u.data],{type:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"})),e.click(),e.remove(),window.URL.revokeObjectURL(e.href)})})};return(u,e)=>(V(),h("div",g,[k,o(b),a("div",Q,[a("div",R,[o(c,{filled:"",modelValue:s.value,"onUpdate:modelValue":e[1]||(e[1]=t=>s.value=t),label:"Closing Date From"},{prepend:l(()=>[o(p,{name:"event",class:"cursor-pointer"},{default:l(()=>[o(v,{cover:"","transition-show":"scale","transition-hide":"scale"},{default:l(()=>[o(f,{modelValue:s.value,"onUpdate:modelValue":e[0]||(e[0]=t=>s.value=t),mask:"YYYY-MM-DD"},{default:l(()=>[a("div",U,[m(o(i,{label:"Close",color:"primary",flat:""},null,512),[[_]])])]),_:1},8,["modelValue"])]),_:1})]),_:1})]),_:1},8,["modelValue"])]),a("div",D,[o(c,{filled:"",modelValue:r.value,"onUpdate:modelValue":e[3]||(e[3]=t=>r.value=t),label:"Closing Date To"},{prepend:l(()=>[o(p,{name:"event",class:"cursor-pointer"},{default:l(()=>[o(v,{cover:"","transition-show":"scale","transition-hide":"scale"},{default:l(()=>[o(f,{modelValue:r.value,"onUpdate:modelValue":e[2]||(e[2]=t=>r.value=t),mask:"YYYY-MM-DD"},{default:l(()=>[a("div",Y,[m(o(i,{label:"Close",color:"primary",flat:""},null,512),[[_]])])]),_:1},8,["modelValue"])]),_:1})]),_:1})]),_:1},8,["modelValue"])])]),a("div",q,[a("div",j,[o(i,{loading:d.value,label:"export excel",color:"green",onClick:e[4]||(e[4]=t=>x())},null,8,["loading"])])])]))}};export{O as default};
