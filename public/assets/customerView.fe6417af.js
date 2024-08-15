import{t as r,C as g,D,E as u,F as l,M as V,O as C,J as s,$ as d,X as E,Q as m,Y as _,Z as w}from"./index.4ea75c62.js";import{api_web as N}from"./axios.bdf20fa4.js";import{u as b}from"./format.1262ef80.js";import{u as h}from"./use-dialog-plugin-component.d0c3b73f.js";const A=s("div",{class:"text-h6"},"Create New Customer Data",-1),R={class:"row q-pb-md"},O={class:"col"},T={class:"row q-pb-md"},k={class:"col"},y={class:"col q-pl-md"},I={class:"row"},Q={class:"col"},G={__name:"customerView",props:{CustType:Number,Groups:String,Curr:String},setup(c){const{dialogRef:p,onDialogHide:U,onDialogOK:S,onDialogCancel:M}=h(),f=b(),t=c,a=r({MCUS_CUSCD:"",MCUS_CUSNM:"",MCUS_CURCD:t.Curr?t.Curr:"IDR",MCUS_TAXREG:"-",MCUS_ADDR1:"",MCUS_TELNO:"",MCUS_PIC_NAME:"-",MCUS_PIC_TELNO:"-",MCUS_TYPE:t.CustType?t.CustType:1,MCUS_GROUP:t.Groups?t.Groups:"SERVICE",MCUS_EMAIL:""}),n=r(!1),v=()=>{f.dialog({title:"Confirmation",message:"Do you want to save this customer ?",cancel:!0,persistent:!0}).onOk(async()=>{n.value=!0,await N.post("customer",a.value).then(i=>{n.value=!1,S(i.data)}).catch(i=>{n.value=!1})})};return(i,e)=>(g(),D(w,{ref_key:"dialogRef",ref:p,onHide:_(U),"transition-show":"slide-up","transition-hide":"slide-down","full-width":""},{default:u(()=>[l(V,{class:"q-dialog-plugin bg-white q-pa-sm"},{default:u(()=>[l(C,null,{default:u(()=>[A]),_:1}),l(C,{class:"q-pa-sm"},{default:u(()=>[s("div",R,[s("div",O,[l(d,{label:"Customer Name",dense:"",modelValue:a.value.MCUS_CUSNM,"onUpdate:modelValue":e[0]||(e[0]=o=>a.value.MCUS_CUSNM=o),filled:""},null,8,["modelValue"])])]),s("div",T,[s("div",k,[l(d,{label:"Customer Email",dense:"",modelValue:a.value.MCUS_EMAIL,"onUpdate:modelValue":e[1]||(e[1]=o=>a.value.MCUS_EMAIL=o),filled:""},null,8,["modelValue"])]),s("div",y,[l(d,{label:"Customer Phone",dense:"",modelValue:a.value.MCUS_TELNO,"onUpdate:modelValue":e[2]||(e[2]=o=>a.value.MCUS_TELNO=o),filled:"",mask:"####-####-####"},null,8,["modelValue"])])]),s("div",I,[s("div",Q,[l(d,{label:"Customer Address",dense:"",modelValue:a.value.MCUS_ADDR1,"onUpdate:modelValue":e[3]||(e[3]=o=>a.value.MCUS_ADDR1=o),filled:"",type:"textarea"},null,8,["modelValue"])])])]),_:1}),l(E,{align:"right"},{default:u(()=>[l(m,{label:"OK",color:"primary",onClick:e[4]||(e[4]=o=>v()),loading:n.value},null,8,["loading"]),l(m,{flat:"",label:"Cancel",color:"red",onClick:_(M),loading:n.value},null,8,["onClick","loading"])]),_:1})]),_:1})]),_:1},8,["onHide"]))}};export{G as _};
