import{t as T,o as h,C as s,D as i,E as m,F as M,M as E,O as f,J as o,$ as I,aZ as d,X as q,Q as O,Y as D,Z as B}from"./index.c76106d3.js";import{Q as g}from"./QSelect.d8098d3a.js";import{api_web as C}from"./axios.f74a540c.js";import{u as Q}from"./use-quasar.fd72bbbc.js";import{u as P}from"./use-dialog-plugin-component.de1d71d9.js";const F=o("div",{class:"text-h6"},"Create Item Master",-1),K={class:"row"},R={class:"col"},x={class:"col q-pl-md"},L={class:"row q-pt-md"},H={class:"col"},Y={class:"col q-pl-md"},$={class:"row q-pt-md"},Z={class:"col"},J={class:"col q-pl-md"},X={class:"row q-pt-md"},j={class:"col"},ae={__name:"itemCreate",props:{ItemCat:String,ItemType:String,isAutoCD:Boolean,listOpenField:Array},setup(V){const{dialogRef:A,onDialogHide:y,onDialogOK:b,onDialogCancel:U}=P(),k=Q(),l=T({MITM_ITMCD:"",MITM_ITMNM:"",MITM_STKUOM:"",MITM_ITMTYPE:1,MITM_BRAND:"",MITM_MODEL:"",MITM_SPEC:"",MITM_ITMCAT:"",MITM_COACD:"",MITM_ITMCAT:""}),u=T(!1),v=T([]),_=T([]),r=V;h(()=>{S(),l.value.MITM_ITMCAT=r.ItemCat,l.value.MITM_ITMTYPE=r.ItemType});const N=(t,e,a,c)=>{e(async()=>{await C.post("item/getListCoasAPI",{search:t}).then(p=>{_.value=p.data})})},w=()=>{k.dialog({title:"Confirmation",message:"Do you want to save this item ?",cancel:!0,persistent:!0}).onOk(async()=>{await C.post("item",l.value).then(t=>{b(t.data.data)})})},S=async()=>{u.value=!0,await C.get("item/formAPI").then(t=>{u.value=!1,v.value=t.data.uoms,_.value=t.data.coas}).catch(()=>{u.value=!1})},n=t=>r.listOpenField.length===0||r.listOpenField.includes(t);return(t,e)=>(s(),i(B,{ref_key:"dialogRef",ref:A,onHide:D(y),"transition-show":"slide-up","transition-hide":"slide-down","full-width":"",persistent:""},{default:m(()=>[M(E,{class:"q-dialog-plugin bg-white q-pa-sm"},{default:m(()=>[M(f,null,{default:m(()=>[F]),_:1}),M(f,{class:"q-pa-sm"},{default:m(()=>[o("div",K,[o("div",R,[n("MITM_ITMCD")?(s(),i(I,{key:0,label:"Item Code",dense:"",modelValue:l.value.MITM_ITMCD,"onUpdate:modelValue":e[0]||(e[0]=a=>l.value.MITM_ITMCD=a),filled:"",readonly:r.isAutoCD},null,8,["modelValue","readonly"])):d("",!0)]),o("div",x,[n("MITM_ITMNM")?(s(),i(I,{key:0,label:"Item Name",dense:"",modelValue:l.value.MITM_ITMNM,"onUpdate:modelValue":e[1]||(e[1]=a=>l.value.MITM_ITMNM=a),filled:""},null,8,["modelValue"])):d("",!0)])]),o("div",L,[o("div",H,[n("MITM_STKUOM")?(s(),i(g,{key:0,dense:"",filled:"",label:"UOM",modelValue:l.value.MITM_STKUOM,"onUpdate:modelValue":e[2]||(e[2]=a=>l.value.MITM_STKUOM=a),options:v.value,behavior:"dialog","option-label":"MUOM_UOMNM","option-value":"MUOM_UOMCD","emit-value":"","map-options":"",loading:u.value},null,8,["modelValue","options","loading"])):d("",!0)]),o("div",Y,[n("MITM_BRAND")?(s(),i(I,{key:0,label:"Item Brand",dense:"",modelValue:l.value.MITM_BRAND,"onUpdate:modelValue":e[3]||(e[3]=a=>l.value.MITM_BRAND=a),filled:""},null,8,["modelValue"])):d("",!0)])]),o("div",$,[o("div",Z,[n("MITM_MODEL")?(s(),i(I,{key:0,label:"Item Model",dense:"",modelValue:l.value.MITM_MODEL,"onUpdate:modelValue":e[4]||(e[4]=a=>l.value.MITM_MODEL=a),filled:""},null,8,["modelValue"])):d("",!0)]),o("div",J,[n("MITM_SPEC")?(s(),i(I,{key:0,label:"Item Specification",dense:"",modelValue:l.value.MITM_SPEC,"onUpdate:modelValue":e[5]||(e[5]=a=>l.value.MITM_SPEC=a),filled:""},null,8,["modelValue"])):d("",!0)])]),o("div",X,[o("div",j,[n("MITM_COACD")?(s(),i(g,{key:0,dense:"",filled:"",label:"COA",modelValue:l.value.MITM_COACD,"onUpdate:modelValue":e[6]||(e[6]=a=>l.value.MITM_COACD=a),options:_.value,"use-input":"",behavior:"dialog","option-label":"MCOA_COANM","option-value":"MCOA_COACD",onFilter:e[7]||(e[7]=(a,c,p)=>N(a,c,p)),"emit-value":"","map-options":"",loading:u.value},null,8,["modelValue","options","loading"])):d("",!0)])])]),_:1}),M(q,{align:"right"},{default:m(()=>[M(O,{label:"OK",color:"primary",onClick:e[8]||(e[8]=a=>w())}),M(O,{flat:"",label:"Cancel",color:"red",onClick:D(U)},null,8,["onClick"])]),_:1})]),_:1})]),_:1},8,["onHide"]))}};export{ae as _};
