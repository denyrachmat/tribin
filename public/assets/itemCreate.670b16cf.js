import{t as T,o as h,C as i,D as n,E as M,F as d,M as q,O as A,J as o,$ as I,aZ as r,Q as f,I as F,P as B,a$ as x,X as K,Y as y,Z as R}from"./index.8744554e.js";import{Q as g}from"./QSelect.55362f50.js";import{Q as L}from"./QTooltip.4640eb68.js";import{api_web as C}from"./axios.637b717e.js";import{u as Y}from"./use-quasar.18cd65a0.js";import{u as $}from"./use-dialog-plugin-component.ebebea2b.js";const H=o("div",{class:"text-h6"},"Create Item Master",-1),G={class:"row"},Z={class:"col"},j={class:"col q-pl-md"},J={class:"row q-pt-md"},X={class:"col"},z={class:"col q-pl-md"},W={class:"row q-pt-md"},ee={class:"col"},le={class:"col q-pl-md"},ae={class:"row q-pt-md"},oe={class:"col"},te={class:"col q-pl-md"},se={class:"row q-pt-md"},ie={class:"col"},Te={__name:"itemCreate",props:{ItemCat:String,ItemType:String,isAutoCD:Boolean,listOpenField:Array,dataForUpdate:Object},setup(b){const{dialogRef:U,onDialogHide:w,onDialogOK:k,onDialogCancel:N}=$(),S=Y(),a=T({MITM_ITMCD:"",MITM_ITMNM:"",MITM_STKUOM:"",MITM_ITMTYPE:1,MITM_BRAND:"",MITM_MODEL:"",MITM_SPEC:"",MITM_ITMCAT:"",MITM_COACD:"",MITM_ITMCAT:""}),s=T(!1),v=T(!1),O=T([]),c=T([]),D=T([]),m=b;h(()=>{P(),Q(),a.value.MITM_ITMCAT=m.ItemCat,a.value.MITM_ITMTYPE=m.ItemType,m.dataForUpdate&&(a.value=m.dataForUpdate)});const V=(t,e,l,_)=>{e(async()=>{await C.post("item/getListCoasAPI",{search:t}).then(p=>{c.value=p.data})})},E=()=>{S.dialog({title:"Confirmation",message:"Do you want to save this item ?",cancel:!0,persistent:!0}).onOk(async()=>{await C.post("item",a.value).then(t=>{k(t.data.data)})})},P=async()=>{s.value=!0,await C.get("item/formAPI").then(t=>{s.value=!1,O.value=t.data.uoms,c.value=t.data.coas}).catch(()=>{s.value=!1})},Q=async()=>{s.value=!0,await C.get("item/getCategory").then(t=>{s.value=!1,D.value=t.data}).catch(()=>{s.value=!1})},u=t=>m.listOpenField.length===0||m.listOpenField.includes(t);return(t,e)=>(i(),n(R,{ref_key:"dialogRef",ref:U,onHide:y(w),"transition-show":"slide-up","transition-hide":"slide-down","full-width":"",persistent:""},{default:M(()=>[d(q,{class:"q-dialog-plugin bg-white q-pa-sm"},{default:M(()=>[d(A,null,{default:M(()=>[H]),_:1}),d(A,{class:"q-pa-sm"},{default:M(()=>[o("div",G,[o("div",Z,[u("MITM_ITMCD")?(i(),n(I,{key:0,label:"Item Code",dense:"",modelValue:a.value.MITM_ITMCD,"onUpdate:modelValue":e[0]||(e[0]=l=>a.value.MITM_ITMCD=l),filled:"",readonly:m.isAutoCD},null,8,["modelValue","readonly"])):r("",!0)]),o("div",j,[u("MITM_ITMNM")?(i(),n(I,{key:0,label:"Item Name",dense:"",modelValue:a.value.MITM_ITMNM,"onUpdate:modelValue":e[1]||(e[1]=l=>a.value.MITM_ITMNM=l),filled:""},null,8,["modelValue"])):r("",!0)])]),o("div",J,[o("div",X,[u("MITM_STKUOM")?(i(),n(g,{key:0,dense:"",filled:"",label:"UOM",modelValue:a.value.MITM_STKUOM,"onUpdate:modelValue":e[2]||(e[2]=l=>a.value.MITM_STKUOM=l),options:O.value,behavior:"dialog","option-label":"MUOM_UOMNM","option-value":"MUOM_UOMCD","emit-value":"","map-options":"",loading:s.value},null,8,["modelValue","options","loading"])):r("",!0)]),o("div",z,[u("MITM_BRAND")?(i(),n(I,{key:0,label:"Item Brand",dense:"",modelValue:a.value.MITM_BRAND,"onUpdate:modelValue":e[3]||(e[3]=l=>a.value.MITM_BRAND=l),filled:""},null,8,["modelValue"])):r("",!0)])]),o("div",W,[o("div",ee,[u("MITM_MODEL")?(i(),n(I,{key:0,label:"Item Model",dense:"",modelValue:a.value.MITM_MODEL,"onUpdate:modelValue":e[4]||(e[4]=l=>a.value.MITM_MODEL=l),filled:""},null,8,["modelValue"])):r("",!0)]),o("div",le,[u("MITM_SPEC")?(i(),n(I,{key:0,label:"Item Specification",dense:"",modelValue:a.value.MITM_SPEC,"onUpdate:modelValue":e[5]||(e[5]=l=>a.value.MITM_SPEC=l),filled:""},null,8,["modelValue"])):r("",!0)])]),o("div",ae,[o("div",oe,[u("MITM_COACD")?(i(),n(g,{key:0,dense:"",filled:"",label:"COA",modelValue:a.value.MITM_COACD,"onUpdate:modelValue":e[6]||(e[6]=l=>a.value.MITM_COACD=l),options:c.value,"use-input":"",behavior:"dialog","option-label":"MCOA_COANM","option-value":"MCOA_COACD",onFilter:e[7]||(e[7]=(l,_,p)=>V(l,_,p)),"emit-value":"","map-options":"",loading:s.value},null,8,["modelValue","options","loading"])):r("",!0)]),o("div",te,[u("MITM_ITMCAT")?(i(),n(g,{key:0,dense:"",filled:"",label:"Category",modelValue:a.value.MITM_ITMCAT,"onUpdate:modelValue":e[9]||(e[9]=l=>a.value.MITM_ITMCAT=l),options:D.value,"use-input":"",behavior:"dialog","option-label":"MITM_ITMCAT","option-value":"MITM_ITMCAT",onFilter:e[10]||(e[10]=(l,_,p)=>V(l,_,p)),"emit-value":"","map-options":"",loading:s.value},{append:M(()=>[d(f,{round:"",dense:"",flat:"",icon:v.value?"list":"add",onClick:e[8]||(e[8]=l=>v.value=!v.value)},{default:M(()=>[d(L,null,{default:M(()=>[F(B(v.value?"Choose existing category":"Insert new category"),1)]),_:1})]),_:1},8,["icon"])]),_:1},8,["modelValue","options","loading"])):r("",!0)])]),o("div",se,[o("div",ie,[d(x,{modelValue:a.value.MITM_ITMTYPE,"onUpdate:modelValue":e[11]||(e[11]=l=>a.value.MITM_ITMTYPE=l),options:[{label:"Finished Good",value:1},{label:"Spare Parts",value:2},{label:"Service",value:3}],color:"primary",inline:""},null,8,["modelValue"])])])]),_:1}),d(K,{align:"right"},{default:M(()=>[d(f,{label:"OK",color:"primary",onClick:e[12]||(e[12]=l=>E())}),d(f,{flat:"",label:"Cancel",color:"red",onClick:y(N)},null,8,["onClick"])]),_:1})]),_:1})]),_:1},8,["onHide"]))}};export{Te as _};
