import{t as I,o as B,C as i,D as u,E as s,F as d,M as x,O as y,J as o,$ as v,aZ as m,Q as p,I as D,P as A,a$ as R,X as K,Y as U,Z as L}from"./index.0accd03e.js";import{Q as f}from"./QSelect.fda4be59.js";import{Q as b}from"./QTooltip.a5dc12f1.js";import{api_web as _}from"./axios.84c9da95.js";import{u as $}from"./use-quasar.442c1978.js";import{u as Y}from"./use-dialog-plugin-component.038b5b08.js";const H=o("div",{class:"text-h6"},"Create Item Master",-1),G={class:"row"},Z={class:"col"},j={class:"col q-pl-md"},J={class:"row q-pt-md"},X={class:"col"},z={class:"col q-pl-md"},W={class:"row q-pt-md"},ee={class:"col"},le={class:"col q-pl-md"},ae={class:"row q-pt-md"},oe={class:"col"},te={class:"col q-pl-md"},se={class:"row q-pt-md"},de={class:"col"},me={__name:"itemCreate",props:{ItemCat:String,ItemType:String,isAutoCD:Boolean,listOpenField:Array,dataForUpdate:Object},setup(k){const{dialogRef:w,onDialogHide:N,onDialogOK:S,onDialogCancel:E}=Y(),P=$(),l=I({MITM_ITMCD:"",MITM_ITMNM:"",MITM_STKUOM:"",MITM_ITMTYPE:1,MITM_BRAND:"",MITM_MODEL:"",MITM_SPEC:"",MITM_ITMCAT:"",MITM_COACD:"",MITM_ITMCAT:""}),M=I(!1),n=I(!1),g=I([]),C=I([]),V=I([]),T=k;B(()=>{F(),h(),l.value.MITM_ITMCAT=T.ItemCat,l.value.MITM_ITMTYPE=T.ItemType,T.dataForUpdate&&(l.value=T.dataForUpdate,l.value.MITM_ITMNM=T.dataForUpdate.MITM_ITMNMREAL)});const Q=(t,e,a,O)=>{e(async()=>{await _.post("item/getListCoasAPI",{search:t}).then(c=>{C.value=c.data})})},q=()=>{P.dialog({title:"Confirmation",message:"Do you want to save this item ?",cancel:!0,persistent:!0}).onOk(async()=>{await _.post("item",l.value).then(t=>{S(t.data.data)})})},F=async()=>{M.value=!0,await _.get("item/formAPI").then(t=>{M.value=!1,g.value=t.data.uoms,C.value=t.data.coas}).catch(()=>{M.value=!1})},h=async()=>{M.value=!0,await _.get("item/getCategory").then(t=>{M.value=!1,V.value=t.data}).catch(()=>{M.value=!1})},r=t=>T.listOpenField.length===0||T.listOpenField.includes(t);return(t,e)=>(i(),u(L,{ref_key:"dialogRef",ref:w,onHide:U(N),"transition-show":"slide-up","transition-hide":"slide-down","full-width":"",persistent:""},{default:s(()=>[d(x,{class:"q-dialog-plugin bg-white q-pa-sm"},{default:s(()=>[d(y,null,{default:s(()=>[H]),_:1}),d(y,{class:"q-pa-sm"},{default:s(()=>[o("div",G,[o("div",Z,[r("MITM_ITMCD")?(i(),u(v,{key:0,label:"Item Code",dense:"",modelValue:l.value.MITM_ITMCD,"onUpdate:modelValue":e[0]||(e[0]=a=>l.value.MITM_ITMCD=a),filled:"",readonly:T.isAutoCD},null,8,["modelValue","readonly"])):m("",!0)]),o("div",j,[r("MITM_ITMNM")?(i(),u(v,{key:0,label:"Item Name",dense:"",modelValue:l.value.MITM_ITMNM,"onUpdate:modelValue":e[1]||(e[1]=a=>l.value.MITM_ITMNM=a),filled:""},null,8,["modelValue"])):m("",!0)])]),o("div",J,[o("div",X,[r("MITM_STKUOM")?(i(),u(f,{key:0,dense:"",filled:"",label:"UOM",modelValue:l.value.MITM_STKUOM,"onUpdate:modelValue":e[2]||(e[2]=a=>l.value.MITM_STKUOM=a),options:g.value,behavior:"dialog","option-label":"MUOM_UOMNM","option-value":"MUOM_UOMCD","emit-value":"","map-options":"",loading:M.value},null,8,["modelValue","options","loading"])):m("",!0)]),o("div",z,[r("MITM_BRAND")?(i(),u(v,{key:0,label:"Item Brand",dense:"",modelValue:l.value.MITM_BRAND,"onUpdate:modelValue":e[3]||(e[3]=a=>l.value.MITM_BRAND=a),filled:""},null,8,["modelValue"])):m("",!0)])]),o("div",W,[o("div",ee,[r("MITM_MODEL")?(i(),u(v,{key:0,label:"Item Model",dense:"",modelValue:l.value.MITM_MODEL,"onUpdate:modelValue":e[4]||(e[4]=a=>l.value.MITM_MODEL=a),filled:""},null,8,["modelValue"])):m("",!0)]),o("div",le,[r("MITM_SPEC")?(i(),u(v,{key:0,label:"Item Specification",dense:"",modelValue:l.value.MITM_SPEC,"onUpdate:modelValue":e[5]||(e[5]=a=>l.value.MITM_SPEC=a),filled:""},null,8,["modelValue"])):m("",!0)])]),o("div",ae,[o("div",oe,[r("MITM_COACD")?(i(),u(f,{key:0,dense:"",filled:"",label:"COA",modelValue:l.value.MITM_COACD,"onUpdate:modelValue":e[6]||(e[6]=a=>l.value.MITM_COACD=a),options:C.value,"use-input":"",behavior:"dialog","option-label":"MCOA_COANM","option-value":"MCOA_COACD",onFilter:e[7]||(e[7]=(a,O,c)=>Q(a,O,c)),"emit-value":"","map-options":"",loading:M.value},null,8,["modelValue","options","loading"])):m("",!0)]),o("div",te,[r("MITM_ITMCAT")&&n.value?(i(),u(v,{key:0,label:"Category",dense:"",modelValue:l.value.MITM_ITMCAT,"onUpdate:modelValue":e[9]||(e[9]=a=>l.value.MITM_ITMCAT=a),filled:""},{append:s(()=>[d(p,{round:"",dense:"",flat:"",icon:n.value?"list":"add",onClick:e[8]||(e[8]=a=>n.value=!n.value)},{default:s(()=>[d(b,null,{default:s(()=>[D(A(n.value?"Choose existing category":"Insert new category"),1)]),_:1})]),_:1},8,["icon"])]),_:1},8,["modelValue"])):r("MITM_ITMCAT")&&!n.value?(i(),u(f,{key:1,dense:"",filled:"",label:"Category",modelValue:l.value.MITM_ITMCAT,"onUpdate:modelValue":e[11]||(e[11]=a=>l.value.MITM_ITMCAT=a),options:V.value,loading:M.value},{append:s(()=>[d(p,{round:"",dense:"",flat:"",icon:n.value?"list":"add",onClick:e[10]||(e[10]=a=>n.value=!n.value)},{default:s(()=>[d(b,null,{default:s(()=>[D(A(n.value?"Choose existing category":"Insert new category"),1)]),_:1})]),_:1},8,["icon"])]),_:1},8,["modelValue","options","loading"])):m("",!0)])]),o("div",se,[o("div",de,[d(R,{modelValue:l.value.MITM_ITMTYPE,"onUpdate:modelValue":e[12]||(e[12]=a=>l.value.MITM_ITMTYPE=a),options:[{label:"Finished Good",value:"1"},{label:"Spare Parts",value:"2"},{label:"Service",value:"3"}],color:"primary",inline:""},null,8,["modelValue"])])])]),_:1}),d(K,{align:"right"},{default:s(()=>[d(p,{label:"OK",color:"primary",onClick:e[13]||(e[13]=a=>q())}),d(p,{flat:"",label:"Cancel",color:"red",onClick:U(E)},null,8,["onClick"])]),_:1})]),_:1})]),_:1},8,["onHide"]))}};export{me as _};
