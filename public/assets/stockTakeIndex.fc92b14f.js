import{t as c,C as v,R as h,F as l,aI as k,J as o,E as d,$ as w,av as x,U as Q,Q as y}from"./index.38a60d5a.js";import{Q as g,a as q,C as V}from"./ClosePopup.1dc0e9d6.js";import{Q as b}from"./QUploader.eea77599.js";import{u as D}from"./use-quasar.7c370a0e.js";import"./use-dialog-plugin-component.d7f3c4a4.js";import{api_web as U}from"./axios.42555041.js";import"./use-render-cache.3aae9b27.js";import"./date.c42178ed.js";import"./format.a5af5c3c.js";const C={class:"q-pa-md"},F=o("div",{class:"row q-pb-md"},[o("div",{class:"col"},[o("span",{class:"text-h4"},"Stock Taking")]),o("div",{class:"col text-right"})],-1),B={class:"row q-col-gutter-md q-pt-md"},I={class:"col-12"},P={class:"row items-center justify-end"},S={class:"row q-col-gutter-md q-pt-md"},T={class:"col-12"},Y=o("div",{class:"row q-col-gutter-md q-pt-md"},null,-1),H={__name:"stockTakeIndex",setup(E){D();const t=c(""),i=c(null),n=c(!1),u=s=>{i.value=s[0],n.value=!0},p=async s=>{console.log(s);const e=await new Promise((a,f)=>{let r=new FormData;r.append("file",i.value),r.append("date",t.value),U.post("inventory/uploadStockTake",r).then(_=>{a(_)})});if(e)return e},m=(s,e)=>{console.log(s)};return(s,e)=>(v(),h("div",C,[F,l(k),o("div",B,[o("div",I,[l(w,{filled:"",modelValue:t.value,"onUpdate:modelValue":e[1]||(e[1]=a=>t.value=a),label:"Eff Date",dense:""},{prepend:d(()=>[l(x,{name:"event",class:"cursor-pointer"},{default:d(()=>[l(g,{cover:"","transition-show":"scale","transition-hide":"scale"},{default:d(()=>[l(q,{modelValue:t.value,"onUpdate:modelValue":e[0]||(e[0]=a=>t.value=a),mask:"YYYY-MM-DD"},{default:d(()=>[o("div",P,[Q(l(y,{label:"Close",color:"primary",flat:""},null,512),[[V]])])]),_:1},8,["modelValue"])]),_:1})]),_:1})]),_:1},8,["modelValue"])])]),o("div",S,[o("div",T,[l(b,{class:"full-height",url:"http://localhost:4444/upload",label:"Upload Stock Take",color:"amber","text-color":"black",accept:".xlsx, .xls","max-files":t.value?1:0,style:{width:"100%"},"auto-upload":"",factory:p,"form-fields":a=>[{name:"file",value:a[0]},{name:"date",value:t.value}],onFactoryFailed:e[2]||(e[2]=(a,f)=>m(a)),onAdded:u},null,8,["max-files","form-fields"])])]),Y]))}};export{H as default};
