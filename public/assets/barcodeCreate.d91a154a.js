import{t as d,C as M,D as h,E as i,Y as m,Z as D,F as o,O as c,J as s,$ as p,X as Q,Q as f,M as y}from"./index.df02b146.js";import{c as q}from"./QSelect.c3f2ad19.js";import{api_web as B}from"./axios.a480fa85.js";import{u as N}from"./format.dd82047c.js";import{u as R}from"./use-dialog-plugin-component.701a213e.js";const S=s("div",{class:"text-h6"},"Create New Barcode",-1),T={class:"row"},O={class:"col"},F={class:"row q-pt-md"},H={class:"col"},U={class:"col q-pl-md"},X={__name:"barcodeCreate",setup($){const{dialogRef:v,onDialogHide:g,onDialogOK:C,onDialogCancel:b}=R(),_=N(),r=d({refCode:"",items:""}),u=d([]),t=d(!1),w=(l,e,a,n)=>{e(async()=>{n==="item"&&await I()})},I=async l=>{t.value=!0,await B.post("item/searchItemDyn",{filter:[{cols:"IS_ITMCD",param:"=",value:1}]}).then(e=>{t.value=!1,u.value=e.data.data}).catch(()=>{t.value=!1})},V=()=>{_.dialog({title:"Confirmation",message:"Are you sure want to save this Barcode ?",cancel:!0,persistent:!0}).onOk(async()=>{t.value=!0,C()})};return(l,e)=>(M(),h(D,{ref_key:"dialogRef",ref:v,onHide:m(g),"transition-show":"slide-up","transition-hide":"slide-down","full-width":"",persistent:""},{default:i(()=>[o(y,{class:"q-dialog-plugin bg-white q-pa-sm"},{default:i(()=>[o(c,null,{default:i(()=>[S]),_:1}),o(c,{class:"q-pa-sm"},{default:i(()=>[s("div",T,[s("div",O,[o(p,{dense:"",modelValue:l.refCode,"onUpdate:modelValue":e[0]||(e[0]=a=>l.refCode=a),outlined:"",label:"Ref Code"},null,8,["modelValue"])])]),s("div",F,[s("div",H,[o(q,{dense:"",filled:"",label:"Item Name",modelValue:r.value.items,"onUpdate:modelValue":e[1]||(e[1]=a=>r.value.items=a),"use-input":"","input-debounce":"500",options:u.value,onFilter:e[2]||(e[2]=(a,n,k)=>w(a,n,k,"item")),behavior:"dialog","option-label":"MITM_ITMNM","option-value":"MITM_ITMNM","emit-value":"","map-options":"",loading:t.value},null,8,["modelValue","options","loading"])]),s("div",U,[o(p,{type:"number",dense:"",modelValue:l.stockRef,"onUpdate:modelValue":e[3]||(e[3]=a=>l.stockRef=a),outlined:"",label:"stock"},null,8,["modelValue"])])])]),_:1}),o(Q,{align:"right"},{default:i(()=>[o(f,{label:"OK",color:"primary",onClick:e[4]||(e[4]=a=>V()),disable:l.stateSubmit,loading:t.value},null,8,["disable","loading"]),o(f,{flat:"",label:"Cancel",color:"red",onClick:m(b)},null,8,["onClick"])]),_:1})]),_:1})]),_:1},8,["onHide"]))}};export{X as default};
