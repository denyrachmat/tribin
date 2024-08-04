import{t as I,o as F,C as i,D as u,E as s,F as n,M as x,O as y,J as o,$ as v,aZ as m,Q as p,I as D,P as A,a$ as K,X as R,Y as b,Z as $}from"./index.b4d4c5a4.js";import{Q as f}from"./QSelect.d5c87b06.js";import{Q as U}from"./QTooltip.c1eef0cf.js";import{api_web as _}from"./axios.b64b9f99.js";import{u as L}from"./use-quasar.31e53cd7.js";import{u as Y}from"./use-dialog-plugin-component.70bccfca.js";const H=o("div",{class:"text-h6"},"Create Item Master",-1),G={class:"row"},Z={class:"col"},j={class:"col q-pl-md"},J={class:"row q-pt-md"},X={class:"col"},z={class:"col q-pl-md"},W={class:"row q-pt-md"},ee={class:"col"},le={class:"col q-pl-md"},ae={class:"row q-pt-md"},oe={class:"col"},te={class:"col q-pl-md"},se={class:"row q-pt-md"},ne={class:"col"},Te={__name:"itemCreate",props:{ItemCat:String,ItemType:String,isAutoCD:Boolean,listOpenField:Array,dataForUpdate:Object},setup(k){const{dialogRef:w,onDialogHide:N,onDialogOK:S,onDialogCancel:E}=Y(),P=L(),a=I({MITM_ITMCD:"",MITM_ITMNM:"",MITM_STKUOM:"",MITM_ITMTYPE:1,MITM_BRAND:"",MITM_MODEL:"",MITM_SPEC:"",MITM_ITMCAT:"",MITM_COACD:"",MITM_ITMCAT:""}),M=I(!1),d=I(!1),g=I([]),C=I([]),V=I([]),T=k;F(()=>{h(),B(),a.value.MITM_ITMCAT=T.ItemCat,a.value.MITM_ITMTYPE=T.ItemType,T.dataForUpdate&&(a.value=T.dataForUpdate)});const Q=(t,e,l,O)=>{e(async()=>{await _.post("item/getListCoasAPI",{search:t}).then(c=>{C.value=c.data})})},q=()=>{P.dialog({title:"Confirmation",message:"Do you want to save this item ?",cancel:!0,persistent:!0}).onOk(async()=>{await _.post("item",a.value).then(t=>{S(t.data.data)})})},h=async()=>{M.value=!0,await _.get("item/formAPI").then(t=>{M.value=!1,g.value=t.data.uoms,C.value=t.data.coas}).catch(()=>{M.value=!1})},B=async()=>{M.value=!0,await _.get("item/getCategory").then(t=>{M.value=!1,V.value=t.data}).catch(()=>{M.value=!1})},r=t=>T.listOpenField.length===0||T.listOpenField.includes(t);return(t,e)=>(i(),u($,{ref_key:"dialogRef",ref:w,onHide:b(N),"transition-show":"slide-up","transition-hide":"slide-down","full-width":"",persistent:""},{default:s(()=>[n(x,{class:"q-dialog-plugin bg-white q-pa-sm"},{default:s(()=>[n(y,null,{default:s(()=>[H]),_:1}),n(y,{class:"q-pa-sm"},{default:s(()=>[o("div",G,[o("div",Z,[r("MITM_ITMCD")?(i(),u(v,{key:0,label:"Item Code",dense:"",modelValue:a.value.MITM_ITMCD,"onUpdate:modelValue":e[0]||(e[0]=l=>a.value.MITM_ITMCD=l),filled:"",readonly:T.isAutoCD},null,8,["modelValue","readonly"])):m("",!0)]),o("div",j,[r("MITM_ITMNM")?(i(),u(v,{key:0,label:"Item Name",dense:"",modelValue:a.value.MITM_ITMNM,"onUpdate:modelValue":e[1]||(e[1]=l=>a.value.MITM_ITMNM=l),filled:""},null,8,["modelValue"])):m("",!0)])]),o("div",J,[o("div",X,[r("MITM_STKUOM")?(i(),u(f,{key:0,dense:"",filled:"",label:"UOM",modelValue:a.value.MITM_STKUOM,"onUpdate:modelValue":e[2]||(e[2]=l=>a.value.MITM_STKUOM=l),options:g.value,behavior:"dialog","option-label":"MUOM_UOMNM","option-value":"MUOM_UOMCD","emit-value":"","map-options":"",loading:M.value},null,8,["modelValue","options","loading"])):m("",!0)]),o("div",z,[r("MITM_BRAND")?(i(),u(v,{key:0,label:"Item Brand",dense:"",modelValue:a.value.MITM_BRAND,"onUpdate:modelValue":e[3]||(e[3]=l=>a.value.MITM_BRAND=l),filled:""},null,8,["modelValue"])):m("",!0)])]),o("div",W,[o("div",ee,[r("MITM_MODEL")?(i(),u(v,{key:0,label:"Item Model",dense:"",modelValue:a.value.MITM_MODEL,"onUpdate:modelValue":e[4]||(e[4]=l=>a.value.MITM_MODEL=l),filled:""},null,8,["modelValue"])):m("",!0)]),o("div",le,[r("MITM_SPEC")?(i(),u(v,{key:0,label:"Item Specification",dense:"",modelValue:a.value.MITM_SPEC,"onUpdate:modelValue":e[5]||(e[5]=l=>a.value.MITM_SPEC=l),filled:""},null,8,["modelValue"])):m("",!0)])]),o("div",ae,[o("div",oe,[r("MITM_COACD")?(i(),u(f,{key:0,dense:"",filled:"",label:"COA",modelValue:a.value.MITM_COACD,"onUpdate:modelValue":e[6]||(e[6]=l=>a.value.MITM_COACD=l),options:C.value,"use-input":"",behavior:"dialog","option-label":"MCOA_COANM","option-value":"MCOA_COACD",onFilter:e[7]||(e[7]=(l,O,c)=>Q(l,O,c)),"emit-value":"","map-options":"",loading:M.value},null,8,["modelValue","options","loading"])):m("",!0)]),o("div",te,[r("MITM_ITMCAT")&&d.value?(i(),u(v,{key:0,label:"Category",dense:"",modelValue:a.value.MITM_ITMCAT,"onUpdate:modelValue":e[9]||(e[9]=l=>a.value.MITM_ITMCAT=l),filled:""},{append:s(()=>[n(p,{round:"",dense:"",flat:"",icon:d.value?"list":"add",onClick:e[8]||(e[8]=l=>d.value=!d.value)},{default:s(()=>[n(U,null,{default:s(()=>[D(A(d.value?"Choose existing category":"Insert new category"),1)]),_:1})]),_:1},8,["icon"])]),_:1},8,["modelValue"])):r("MITM_ITMCAT")&&!d.value?(i(),u(f,{key:1,dense:"",filled:"",label:"Category",modelValue:a.value.MITM_ITMCAT,"onUpdate:modelValue":e[11]||(e[11]=l=>a.value.MITM_ITMCAT=l),options:V.value,loading:M.value},{append:s(()=>[n(p,{round:"",dense:"",flat:"",icon:d.value?"list":"add",onClick:e[10]||(e[10]=l=>d.value=!d.value)},{default:s(()=>[n(U,null,{default:s(()=>[D(A(d.value?"Choose existing category":"Insert new category"),1)]),_:1})]),_:1},8,["icon"])]),_:1},8,["modelValue","options","loading"])):m("",!0)])]),o("div",se,[o("div",ne,[n(K,{modelValue:a.value.MITM_ITMTYPE,"onUpdate:modelValue":e[12]||(e[12]=l=>a.value.MITM_ITMTYPE=l),options:[{label:"Finished Good",value:"1"},{label:"Spare Parts",value:"2"},{label:"Service",value:"3"}],color:"primary",inline:""},null,8,["modelValue"])])])]),_:1}),n(R,{align:"right"},{default:s(()=>[n(p,{label:"OK",color:"primary",onClick:e[13]||(e[13]=l=>q())}),n(p,{flat:"",label:"Cancel",color:"red",onClick:b(E)},null,8,["onClick"])]),_:1})]),_:1})]),_:1},8,["onHide"]))}};export{Te as _};
