import{t as c,C as m,R as p,F as o,aI as u,J as a,E as s,$ as f,av as v,U as _,Q as h}from"./index.90196154.js";import{Q as x,a as w,C as Q}from"./ClosePopup.36ddd8c3.js";import{Q as y}from"./QUploader.baa921c5.js";import{u as k}from"./use-quasar.77fc711c.js";import"./use-dialog-plugin-component.1fa08fdd.js";import"./axios.0aadc113.js";import"./use-render-cache.3aae9b27.js";import"./date.047e77cf.js";import"./format.01226ec5.js";const q={class:"q-pa-md"},V=a("div",{class:"row q-pb-md"},[a("div",{class:"col"},[a("span",{class:"text-h4"},"Transfer Location")]),a("div",{class:"col text-right"})],-1),b={class:"row q-col-gutter-md q-pt-md"},g={class:"col-12"},C={class:"row items-center justify-end"},P={class:"row q-col-gutter-md q-pt-md"},U={class:"col-12"},D=a("div",{class:"row q-col-gutter-md q-pt-md"},null,-1),O={__name:"stockTakeIndex",setup(T){k();const l=c(""),d=async r=>{const e=await new Promise((t,n)=>{t({url:{}.api_web+"div/ems2/uploadPOManual",method:"POST",header:[{name:"Content-Type",value:"multipart/form-data"},{name:"Accept",value:"application/json, text/plain, */*"}]})});if(e)return e},i=(r,e)=>{console.log(r)};return(r,e)=>(m(),p("div",q,[V,o(u),a("div",b,[a("div",g,[o(f,{filled:"",modelValue:l.value,"onUpdate:modelValue":e[1]||(e[1]=t=>l.value=t),label:"Eff Date",dense:""},{prepend:s(()=>[o(v,{name:"event",class:"cursor-pointer"},{default:s(()=>[o(x,{cover:"","transition-show":"scale","transition-hide":"scale"},{default:s(()=>[o(w,{modelValue:l.value,"onUpdate:modelValue":e[0]||(e[0]=t=>l.value=t),mask:"YYYY-MM-DD"},{default:s(()=>[a("div",C,[_(o(h,{label:"Close",color:"primary",flat:""},null,512),[[Q]])])]),_:1},8,["modelValue"])]),_:1})]),_:1})]),_:1},8,["modelValue"])])]),a("div",P,[a("div",U,[o(y,{class:"full-height",url:"http://localhost:4444/upload",label:"Upload Stock Take",color:"amber","text-color":"black",accept:".xlsx, .xls","max-files":l.value?1:0,style:{width:"100%"},"auto-upload":"",factory:d,"form-fields":t=>[{name:"file",value:t[0]},{name:"date",value:l.value}],onFactoryFailed:e[2]||(e[2]=(t,n)=>i(t))},null,8,["max-files","form-fields"])])]),D]))}};export{O as default};
