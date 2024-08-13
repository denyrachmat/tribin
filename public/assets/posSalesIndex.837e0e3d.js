import{h as c,c as z,K as j,L as H,t as p,o as G,a as J,C as d,R as f,J as s,F as a,E as o,P as _,aY as W,Q as h,$ as Y,S as q,T as L,U as X,D as A,V as Z,I as u,at as V,O as ee,M as te,W as ae}from"./index.dbc165b6.js";import{e as se,a as g,b as S,Q as b}from"./QSelect.123a2518.js";import{Q as le}from"./QBtnGroup.4f95a2f6.js";import{Q as O}from"./QList.f6742a50.js";import{Q as oe}from"./QTooltip.ace7fda2.js";import{Q as ne}from"./QBadge.2cfe4f09.js";import{u as ie}from"./format.4fc55a96.js";import{api_web as T}from"./axios.1e6db17f.js";const re=[c("circle",{cx:"15",cy:"15",r:"15"},[c("animate",{attributeName:"r",from:"15",to:"15",begin:"0s",dur:"0.8s",values:"15;9;15",calcMode:"linear",repeatCount:"indefinite"}),c("animate",{attributeName:"fill-opacity",from:"1",to:"1",begin:"0s",dur:"0.8s",values:"1;.5;1",calcMode:"linear",repeatCount:"indefinite"})]),c("circle",{cx:"60",cy:"15",r:"9","fill-opacity":".3"},[c("animate",{attributeName:"r",from:"9",to:"9",begin:"0s",dur:"0.8s",values:"9;15;9",calcMode:"linear",repeatCount:"indefinite"}),c("animate",{attributeName:"fill-opacity",from:".5",to:".5",begin:"0s",dur:"0.8s",values:".5;1;.5",calcMode:"linear",repeatCount:"indefinite"})]),c("circle",{cx:"105",cy:"15",r:"15"},[c("animate",{attributeName:"r",from:"15",to:"15",begin:"0s",dur:"0.8s",values:"15;9;15",calcMode:"linear",repeatCount:"indefinite"}),c("animate",{attributeName:"fill-opacity",from:"1",to:"1",begin:"0s",dur:"0.8s",values:"1;.5;1",calcMode:"linear",repeatCount:"indefinite"})])];var ce=z({name:"QSpinnerDots",props:j,setup(Q){const{cSize:v,classes:y}=H(Q);return()=>c("svg",{class:y.value,fill:"currentColor",width:v.value,height:v.value,viewBox:"0 0 120 30",xmlns:"http://www.w3.org/2000/svg"},re)}});const de={class:"q-pa-md"},ue=s("div",{class:"row q-pb-md"},[s("div",{class:"col"},[s("span",{class:"text-h4"},"POS")]),s("div",{class:"col text-right"})],-1),ve={class:"row bg-grey q-pa-md full-width",style:{height:"86vh"}},me={class:"col-4 q-pa-xs"},pe={class:"row bg-white"},_e={class:"col",style:{height:"50vh",overflow:"auto","font-size":"10px"}},fe={class:"row q-pt-xs",style:{height:"30vh"}},he={class:"col bg-white vertical-middle"},ge={class:"row"},ye={class:"col q-pa-sm",style:{height:"20vh"}},Ce={class:"text-h6 text-bold"},Me={class:"row",style:{height:"10vh"}},Se={class:"col-sm-6 col-12 q-pa-sm"},we={class:"col-sm-6 col-12 q-pa-sm"},Ie={class:"col q-pa-xs q-gutter-sm"},be={class:"row bg-white",style:{height:"10vh",overflow:"auto"}},Te={class:"col"},Qe={class:"row bg-white"},ke={class:"col"},xe={class:"col"},Ne={class:"row q-col-gutter-sm"},qe={class:"text-center"},Le={class:"row items-center"},Ae={class:"col text-bold ellipsis"},Ve={key:0,class:"row justify-center q-my-md"},Oe={key:1,class:"row justify-center q-my-md"},Ke={__name:"posSalesIndex",setup(Q){const v=ie(),y=p(""),C=p([]),k=p([]),n=p([]),i=p(!1),M=p(0),x=p(""),w=p(0);G(()=>{I(""),R("")});const P=J(()=>n.value.length>0?n.value.reduce((l,t)=>l+parseFloat(t.LATEST_PRC)*parseInt(t.sellQty),0):0),I=async l=>{i.value=!0,C.value.length>0&&(M.value=M.value+1),await T.post("item/searchAPIStockAndPriceOnly",{searchValue:l,page:l?M.value:1}).then(t=>{i.value=!1,t.data.data.data.map(e=>{n.value.findIndex(m=>m.MITM_ITMNM===e.MITM_ITMNM)===-1&&C.value.push(e)})}).catch(()=>{i.value=!1})},R=async(l,t="MCUS_CUSNM")=>{i.value=!0,await T.post("customer/searchAPI",{searchValue:l,searchCol:t}).then(e=>{i.value=!1,k.value=e.data.data}).catch(()=>{i.value=!1})},U=(l,t)=>{v.dialog({dark:!0,title:"Prompt",message:"How many qty?",prompt:{model:0,type:"number",isValid:e=>e>0&&e<=C.value[t].STOCK},cancel:!0,persistent:!0}).onOk(e=>{w.value=w.value+1;const r=n.value.findIndex(m=>m.MITM_ITMNM===l.MITM_ITMNM);r!==-1?n.value[r].sellQty=e:n.value.push({...l,sellQty:e})}).onCancel(()=>{}).onDismiss(()=>{})},D=async(l,t)=>{await I(""),t()},E=l=>{I(l)},$=l=>{v.dialog({dark:!0,title:"Prompt",message:"How many qty?",prompt:{model:n.value[l].sellQty,type:"number",isValid:t=>t>0&&t<=n.value[l].STOCK},cancel:!0,persistent:!0}).onOk(t=>{n.value[l].sellQty=t})},B=l=>{v.dialog({title:"Confirmation",message:"Are you sure want to delete this line ??",cancel:!0,persistent:!0}).onOk(async()=>{n.value.splice(l,1)})},N=l=>{let t=n.value.findIndex(e=>e.MITM_ITMNM===l);return t!==-1&&n.value[t].sellQty?n.value[t].sellQty:0},F=()=>{v.dialog({title:"Confirmation",message:"Are you sure want to cancel sales ??",cancel:!0,persistent:!0}).onOk(async()=>{n.value=[]})},K=()=>{v.dialog({title:"Confirmation",message:"Are you sure want to process this sales ??",cancel:!0,persistent:!0}).onOk(async()=>{await T.post("pos",{searchValue:val,page:M.value}).then(l=>{i.value=!1,n.value=[]}).catch(()=>{i.value=!1})})};return(l,t)=>(d(),f("div",de,[ue,s("div",ve,[s("div",me,[s("div",pe,[s("div",_e,[a(O,{bordered:"",loading:i.value},{default:o(()=>[n.value.length>0?(d(!0),f(q,{key:0},L(n.value,(e,r)=>X((d(),A(b,{key:e.id,class:"q-my-sm"},{default:o(()=>[a(g,{avatar:""},{default:o(()=>[a(Z,{color:"primary","text-color":"white",icon:"category"})]),_:1}),a(g,null,{default:o(()=>[a(S,null,{default:o(()=>[u(_(e.MITM_ITMNMREAL),1)]),_:2},1024),a(S,{lines:"1"},{default:o(()=>[u(" Rp "+_(e.LATEST_PRC.toLocaleString())+" x "+_(e.sellQty.toLocaleString())+" = ",1),s("b",null,_((e.LATEST_PRC*e.sellQty).toLocaleString()),1)]),_:2},1024)]),_:2},1024),a(g,{side:""},{default:o(()=>[a(le,{flat:""},{default:o(()=>[a(h,{icon:"edit",color:"orange",onClick:m=>$(r),dense:""},null,8,["onClick"]),a(h,{icon:"delete",color:"red",onClick:m=>B(r),dense:""},null,8,["onClick"])]),_:2},1024)]),_:2},1024)]),_:2},1024)),[[ae]])),128)):(d(),A(b,{key:1},{default:o(()=>[a(g,null,{default:o(()=>[u(" No item selected!! ")]),_:1})]),_:1}))]),_:1},8,["loading"])])]),s("div",fe,[s("div",he,[s("div",ge,[s("div",ye,[s("div",Ce," Total : Rp. "+_(P.value.toLocaleString()),1)])]),a(W),s("div",Me,[s("div",Se,[a(h,{color:"primary",class:"full-width",onClick:t[0]||(t[0]=e=>K())},{default:o(()=>[u(" Submit ")]),_:1})]),s("div",we,[a(h,{color:"red",class:"full-width",onClick:t[1]||(t[1]=e=>F())},{default:o(()=>[u(" Cancel ")]),_:1})])])])])]),s("div",Ie,[s("div",be,[s("div",Te,[a(Y,{filled:"",modelValue:x.value,"onUpdate:modelValue":[t[2]||(t[2]=e=>x.value=e),t[3]||(t[3]=e=>E(e))],label:"Search Item",dense:"",debounce:1e3},null,8,["modelValue"])])]),s("div",Qe,[s("div",ke,[a(se,{dense:"",filled:"",label:"Customer Choose",modelValue:y.value,"onUpdate:modelValue":t[5]||(t[5]=e=>y.value=e),"use-input":"","input-debounce":"500",options:k.value,onFilter:t[6]||(t[6]=(e,r,m)=>l.filterFn(e,r,m,"cust")),behavior:"dialog","option-label":"MCUS_CUSNM","option-value":"MCUS_CUSCD","emit-value":"","map-options":"",loading:i.value},{after:o(()=>[a(h,{round:"",dense:"",flat:"",icon:"person_add",onClick:t[4]||(t[4]=e=>l.onAddCustClick()),color:"cyan"},{default:o(()=>[a(oe,null,{default:o(()=>[u("Add new customer")]),_:1})]),_:1})]),_:1},8,["modelValue","options","loading"])])]),(d(),f("div",{class:"row bg-white",style:{height:"70vh",overflow:"auto"},key:w.value},[s("div",xe,[s("div",Ne,[(d(!0),f(q,null,L(C.value,(e,r)=>(d(),f("div",{class:"col-6 q-pa-sm",key:`sm-${r}`},[a(te,{flat:"",bordered:""},{default:o(()=>[a(ne,{color:"orange",floating:""},{default:o(()=>[u(_((parseInt(e.STOCK)-N(e.MITM_ITMNM)).toLocaleString()),1)]),_:2},1024),s("div",qe,[a(V,{name:"category",size:"8em"})]),a(ee,null,{default:o(()=>[s("div",Le,[s("div",Ae,_(e.MITM_ITMNMREAL),1)])]),_:2},1024),a(O,null,{default:o(()=>[a(b,{clickable:"",onClick:m=>U(e,r),disable:e.STOCK-N(e.MITM_ITMNM)===0},{default:o(()=>[a(g,{avatar:""},{default:o(()=>[a(V,{color:"primary",name:"add"})]),_:1}),a(g,null,{default:o(()=>[a(S,null,{default:o(()=>[u("Add Item")]),_:1}),a(S,{caption:"",lines:"2"},{default:o(()=>[u(" Rp. "+_(parseInt(e.LATEST_PRC).toLocaleString()),1)]),_:2},1024)]),_:2},1024)]),_:2},1032,["onClick","disable"])]),_:2},1024)]),_:2},1024)]))),128))]),i.value?(d(),f("div",Ve,[a(ce,{color:"primary",size:"40px"})])):(d(),f("div",Oe,[a(h,{color:"primary",label:"Load more",onClick:D})]))])]))])])]))}};export{Ke as default};
