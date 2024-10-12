import{t as d,C as M,D,E as i,Y as m,Z as Q,F as l,O as c,J as s,$ as p,X as y,Q as f,M as q}from"./index.1289449d.js";import{c as B}from"./QSelect.8c1b7c3e.js";import{api_web as N}from"./axios.b1c3184b.js";import{u as R}from"./format.da7c0d32.js";import{u as S}from"./use-dialog-plugin-component.529a3df5.js";const T=s("div",{class:"text-h6"},"Create New Barcode",-1),O={class:"row"},A={class:"col"},F={class:"row q-pt-md"},H={class:"col"},U={class:"col q-pl-md"},X={__name:"barcodeCreate",setup($){const{dialogRef:v,onDialogHide:g,onDialogOK:C,onDialogCancel:b}=S(),_=R(),u=d({refCode:"",items:""}),r=d([]),t=d(!1),w=(a,e,o,n)=>{e(async()=>{n==="item"&&await I()})},I=async a=>{t.value=!0,await N.post("item/searchItemDyn",{filter:[{cols:"IS_ITMCD",param:"=",value:1}]}).then(e=>{t.value=!1,r.value=e.data.data}).catch(()=>{t.value=!1})},V=()=>{_.dialog({title:"Confirmation",message:"Are you sure want to save this Barcode ?",cancel:!0,persistent:!0}).onOk(async()=>{t.value=!0,C()})},h=a=>{console.log(a)};return(a,e)=>(M(),D(Q,{ref_key:"dialogRef",ref:v,onHide:m(g),"transition-show":"slide-up","transition-hide":"slide-down","full-width":"",persistent:""},{default:i(()=>[l(q,{class:"q-dialog-plugin bg-white q-pa-sm"},{default:i(()=>[l(c,null,{default:i(()=>[T]),_:1}),l(c,{class:"q-pa-sm"},{default:i(()=>[s("div",O,[s("div",A,[l(p,{dense:"",modelValue:a.refCode,"onUpdate:modelValue":e[0]||(e[0]=o=>a.refCode=o),outlined:"",label:"Ref Code"},null,8,["modelValue"])])]),s("div",F,[s("div",H,[l(B,{dense:"",filled:"",label:"Item Name",modelValue:u.value.items,"onUpdate:modelValue":e[1]||(e[1]=o=>u.value.items=o),"use-input":"","input-debounce":"500",options:r.value,onFilter:e[2]||(e[2]=(o,n,k)=>w(o,n,k,"item")),behavior:"dialog","option-label":"MITM_ITMNMREAL","option-value":"MITM_ITMNM","map-options":"","emit-value":"",loading:t.value,"update:model-value":o=>h(o)},null,8,["modelValue","options","loading","update:model-value"])]),s("div",U,[l(p,{type:"number",dense:"",modelValue:a.stockRef,"onUpdate:modelValue":e[3]||(e[3]=o=>a.stockRef=o),outlined:"",label:"stock"},null,8,["modelValue"])])])]),_:1}),l(y,{align:"right"},{default:i(()=>[l(f,{label:"OK",color:"primary",onClick:e[4]||(e[4]=o=>V()),disable:a.stateSubmit,loading:t.value},null,8,["disable","loading"]),l(f,{flat:"",label:"Cancel",color:"red",onClick:m(b)},null,8,["onClick"])]),_:1})]),_:1})]),_:1},8,["onHide"]))}};export{X as default};
