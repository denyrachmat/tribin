import{t as r,C as _,R as h,F as t,aY as x,J as a,E as n,$ as g,a0 as k,at as w,U as Q,Q as V}from"./index.dfd39094.js";import{Q as b,a as y,C as q}from"./ClosePopup.c2718344.js";import{Q as I}from"./QUploader.cebf25c5.js";import{u as U}from"./format.f05086a4.js";import"./use-dialog-plugin-component.308f9e55.js";import{api_web as C}from"./axios.089670e9.js";import"./use-render-cache.3aae9b27.js";import"./date.e8735b26.js";const D={class:"q-pa-md"},F=a("div",{class:"row q-pb-md"},[a("div",{class:"col"},[a("span",{class:"text-h4"},"Stock Taking")]),a("div",{class:"col text-right"})],-1),R={class:"row q-col-gutter-md q-pt-md"},Y={class:"col-10"},B={class:"row items-center justify-end"},P={class:"col-2 text-right"},S={class:"row q-col-gutter-md q-pt-md"},T={class:"col-12"},E=a("div",{class:"row q-col-gutter-md q-pt-md"},null,-1),K={__name:"stockTakeIndex",setup(N){U();const o=r(""),c=r(null),u=r(!1),i=r(!1),m=s=>{c.value=s[0],u.value=!0},p=async s=>{console.log(s),await new Promise((e,l)=>{let d=new FormData;d.append("file",c.value),d.append("date",o.value),d.append("isRegItem",i.value),C.post("inventory/uploadStockTake",d).then(v=>{e(v)})})},f=(s,e)=>{console.log(s)};return(s,e)=>(_(),h("div",D,[F,t(x),a("div",R,[a("div",Y,[t(g,{filled:"",modelValue:o.value,"onUpdate:modelValue":e[1]||(e[1]=l=>o.value=l),label:"Eff Date",dense:""},{prepend:n(()=>[t(w,{name:"event",class:"cursor-pointer"},{default:n(()=>[t(b,{cover:"","transition-show":"scale","transition-hide":"scale"},{default:n(()=>[t(y,{modelValue:o.value,"onUpdate:modelValue":e[0]||(e[0]=l=>o.value=l),mask:"YYYY-MM-DD"},{default:n(()=>[a("div",B,[Q(t(V,{label:"Close",color:"primary",flat:""},null,512),[[q]])])]),_:1},8,["modelValue"])]),_:1})]),_:1})]),_:1},8,["modelValue"])]),a("div",P,[t(k,{name:"registerItem",modelValue:i.value,"onUpdate:modelValue":e[2]||(e[2]=l=>i.value=l),label:"Register New Item ?"},null,8,["modelValue"])])]),a("div",S,[a("div",T,[t(I,{class:"full-height",url:"http://localhost:4444/upload",label:"Upload Stock Take",color:"amber","text-color":"black",accept:".xlsx, .xls","max-files":o.value?1:0,style:{width:"100%"},"auto-upload":"",factory:p,"form-fields":l=>[{name:"isRegItem",value:i.value},{name:"file",value:l[0]},{name:"date",value:o.value}],onFactoryFailed:e[3]||(e[3]=(l,d)=>f(l)),onAdded:m},null,8,["max-files","form-fields"])])]),E]))}};export{K as default};
