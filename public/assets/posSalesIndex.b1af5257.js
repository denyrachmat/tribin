import{h as c,c as G,K as H,L as J,t as v,o as W,a as Y,C as u,R as g,J as l,F as a,E as o,P as _,aY as X,Q as y,$ as Z,S as L,T as A,U as ee,D as O,V as te,I as m,at as P,O as ae,M as se,W as le}from"./index.df02b146.js";import{c as oe,a as C,b as w,Q as T}from"./QSelect.c3f2ad19.js";import{Q as ne}from"./QBtnGroup.2b1fc9ab.js";import{Q as U}from"./QList.87e81641.js";import{Q as ie}from"./QTooltip.f4607926.js";import{Q as re}from"./QBadge.c4faff49.js";import{u as ce}from"./format.dd82047c.js";import{api_web as Q}from"./axios.a480fa85.js";import{_ as de}from"./customerView.a513961e.js";import"./use-dialog-plugin-component.701a213e.js";const ue=[c("circle",{cx:"15",cy:"15",r:"15"},[c("animate",{attributeName:"r",from:"15",to:"15",begin:"0s",dur:"0.8s",values:"15;9;15",calcMode:"linear",repeatCount:"indefinite"}),c("animate",{attributeName:"fill-opacity",from:"1",to:"1",begin:"0s",dur:"0.8s",values:"1;.5;1",calcMode:"linear",repeatCount:"indefinite"})]),c("circle",{cx:"60",cy:"15",r:"9","fill-opacity":".3"},[c("animate",{attributeName:"r",from:"9",to:"9",begin:"0s",dur:"0.8s",values:"9;15;9",calcMode:"linear",repeatCount:"indefinite"}),c("animate",{attributeName:"fill-opacity",from:".5",to:".5",begin:"0s",dur:"0.8s",values:".5;1;.5",calcMode:"linear",repeatCount:"indefinite"})]),c("circle",{cx:"105",cy:"15",r:"15"},[c("animate",{attributeName:"r",from:"15",to:"15",begin:"0s",dur:"0.8s",values:"15;9;15",calcMode:"linear",repeatCount:"indefinite"}),c("animate",{attributeName:"fill-opacity",from:"1",to:"1",begin:"0s",dur:"0.8s",values:"1;.5;1",calcMode:"linear",repeatCount:"indefinite"})])];var me=G({name:"QSpinnerDots",props:H,setup(k){const{cSize:d,classes:f}=J(k);return()=>c("svg",{class:f.value,fill:"currentColor",width:d.value,height:d.value,viewBox:"0 0 120 30",xmlns:"http://www.w3.org/2000/svg"},ue)}});const pe={class:"q-pa-md"},ve=l("div",{class:"row q-pb-md"},[l("div",{class:"col"},[l("span",{class:"text-h4"},"POS")]),l("div",{class:"col text-right"})],-1),_e={class:"row bg-grey q-pa-md full-width",style:{height:"86vh"}},fe={class:"col-4 q-pa-xs"},he={class:"row bg-white"},ge={class:"col",style:{height:"50vh",overflow:"auto","font-size":"10px"}},ye={class:"row q-pt-xs",style:{height:"30vh"}},Ce={class:"col bg-white vertical-middle"},Se={class:"row"},Me={class:"col q-pa-sm",style:{height:"20vh"}},we={class:"text-h6 text-bold"},be={class:"row",style:{height:"10vh"}},Ie={class:"col-sm-6 col-12 q-pa-sm"},Te={class:"col-sm-6 col-12 q-pa-sm"},Qe={class:"col q-pa-xs q-gutter-sm"},ke={class:"row bg-white"},xe={class:"col"},Ne={class:"row bg-white"},qe={class:"col"},Le={class:"col"},Ae={class:"row q-col-gutter-sm"},Oe={class:"text-center"},Pe={class:"row items-center"},Ue={class:"col text-bold ellipsis"},Ve={key:0,class:"row justify-center q-my-md"},De={key:1,class:"row justify-center q-my-md"},Je={__name:"posSalesIndex",setup(k){const d=ce(),f=v(""),h=v([]),x=v([]),n=v([]),r=v(!1),S=v(0),N=v(""),b=v(0);W(()=>{M(""),I("")});const V=Y(()=>n.value.length>0?n.value.reduce((s,t)=>s+parseFloat(t.LATEST_PRC)*parseInt(t.sellQty),0):0),M=async s=>{r.value=!0,h.value.length>0&&(S.value=S.value+1),await Q.post("item/searchAPIStockAndPriceOnly",{searchValue:s,page:s?S.value:1}).then(t=>{r.value=!1,s?h.value=t.data.data.data:t.data.data.data.map(e=>{n.value.findIndex(p=>p.MITM_ITMNM===e.MITM_ITMNM)===-1&&h.value.push(e)})}).catch(()=>{r.value=!1})},I=async(s,t="MCUS_CUSNM")=>{r.value=!0,await Q.post("customer/searchAPI",{searchValue:s,searchCol:t,type:[1]}).then(e=>{r.value=!1,x.value=e.data.data}).catch(()=>{r.value=!1})},D=(s,t)=>{d.dialog({dark:!0,title:"Prompt",message:"How many qty?",prompt:{model:0,type:"number",isValid:e=>e>0&&e<=h.value[t].STOCK},cancel:!0,persistent:!0}).onOk(e=>{b.value=b.value+1;const i=n.value.findIndex(p=>p.MITM_ITMNM===s.MITM_ITMNM);i!==-1?n.value[i].sellQty=e:n.value.push({...s,sellQty:e})}).onCancel(()=>{}).onDismiss(()=>{})},R=()=>{d.dialog({component:de,componentProps:{CustType:1,Groups:"POS_CUST",Curr:"IDR"}}).onOk(async s=>{await I(""),f.value=s.MCUS_CUSCD})},$=async(s,t)=>{await M(""),t()},E=s=>{S.value=0,s||(h.value=[]),M(s)},B=(s,t,e,i)=>{t(async()=>{i==="cust"&&await I(s),i==="item"&&await M(s)})},F=s=>{d.dialog({dark:!0,title:"Prompt",message:"How many qty?",prompt:{model:n.value[s].sellQty,type:"number",isValid:t=>t>0&&t<=n.value[s].STOCK},cancel:!0,persistent:!0}).onOk(t=>{n.value[s].sellQty=t})},K=s=>{d.dialog({title:"Confirmation",message:"Are you sure want to delete this line ??",cancel:!0,persistent:!0}).onOk(async()=>{n.value.splice(s,1)})},q=s=>{let t=n.value.findIndex(e=>e.MITM_ITMNM===s);return t!==-1&&n.value[t].sellQty?n.value[t].sellQty:0},z=()=>{d.dialog({title:"Confirmation",message:"Are you sure want to cancel sales ??",cancel:!0,persistent:!0}).onOk(async()=>{n.value=[]})},j=()=>{d.dialog({title:"Confirmation",message:"Are you sure want to process this sales ??",cancel:!0,persistent:!0}).onOk(async()=>{await Q.post("pos",{TPOS_CUSTCD:f.value,det:h.value}).then(s=>{r.value=!1,n.value=[]}).catch(()=>{r.value=!1})})};return(s,t)=>(u(),g("div",pe,[ve,l("div",_e,[l("div",fe,[l("div",he,[l("div",ge,[a(U,{bordered:"",loading:r.value},{default:o(()=>[n.value.length>0?(u(!0),g(L,{key:0},A(n.value,(e,i)=>ee((u(),O(T,{key:e.id,class:"q-my-sm"},{default:o(()=>[a(C,{avatar:""},{default:o(()=>[a(te,{color:"primary","text-color":"white",icon:"category"})]),_:1}),a(C,null,{default:o(()=>[a(w,null,{default:o(()=>[m(_(e.MITM_ITMNMREAL),1)]),_:2},1024),a(w,{lines:"1"},{default:o(()=>[m(" Rp "+_(e.LATEST_PRC.toLocaleString())+" x "+_(e.sellQty.toLocaleString())+" = ",1),l("b",null,_((e.LATEST_PRC*e.sellQty).toLocaleString()),1)]),_:2},1024)]),_:2},1024),a(C,{side:""},{default:o(()=>[a(ne,{flat:""},{default:o(()=>[a(y,{icon:"edit",color:"orange",onClick:p=>F(i),dense:""},null,8,["onClick"]),a(y,{icon:"delete",color:"red",onClick:p=>K(i),dense:""},null,8,["onClick"])]),_:2},1024)]),_:2},1024)]),_:2},1024)),[[le]])),128)):(u(),O(T,{key:1},{default:o(()=>[a(C,null,{default:o(()=>[m(" No item selected!! ")]),_:1})]),_:1}))]),_:1},8,["loading"])])]),l("div",ye,[l("div",Ce,[l("div",Se,[l("div",Me,[l("div",we," Total : Rp. "+_(V.value.toLocaleString()),1)])]),a(X),l("div",be,[l("div",Ie,[a(y,{color:"primary",class:"full-width",onClick:t[0]||(t[0]=e=>j()),loading:r.value,disable:!f.value},{default:o(()=>[m(" Submit ")]),_:1},8,["loading","disable"])]),l("div",Te,[a(y,{color:"red",class:"full-width",onClick:t[1]||(t[1]=e=>z()),loading:r.value},{default:o(()=>[m(" Cancel ")]),_:1},8,["loading"])])])])])]),l("div",Qe,[l("div",ke,[l("div",xe,[a(Z,{filled:"",modelValue:N.value,"onUpdate:modelValue":[t[2]||(t[2]=e=>N.value=e),t[3]||(t[3]=e=>E(e))],label:"Search Item",dense:"",debounce:1e3},null,8,["modelValue"])])]),l("div",Ne,[l("div",qe,[a(oe,{dense:"",filled:"",label:"Customer Choose",modelValue:f.value,"onUpdate:modelValue":t[5]||(t[5]=e=>f.value=e),"use-input":"","input-debounce":"500",options:x.value,onFilter:t[6]||(t[6]=(e,i,p)=>B(e,i,p,"cust")),behavior:"dialog","option-label":"MCUS_CUSNM","option-value":"MCUS_CUSCD","emit-value":"","map-options":"",loading:r.value},{after:o(()=>[a(y,{round:"",dense:"",flat:"",icon:"person_add",onClick:t[4]||(t[4]=e=>R()),color:"cyan"},{default:o(()=>[a(ie,null,{default:o(()=>[m("Add new customer")]),_:1})]),_:1})]),_:1},8,["modelValue","options","loading"])])]),(u(),g("div",{class:"row bg-white q-pa-sm",style:{height:"67vh",overflow:"auto"},key:b.value},[l("div",Le,[l("div",Ae,[(u(!0),g(L,null,A(h.value,(e,i)=>(u(),g("div",{class:"col-6 q-pa-sm",key:`sm-${i}`},[a(se,{flat:"",bordered:""},{default:o(()=>[a(re,{color:"orange",floating:""},{default:o(()=>[m(_((parseInt(e.STOCK)-q(e.MITM_ITMNM)).toLocaleString()),1)]),_:2},1024),l("div",Oe,[a(P,{name:"category",size:"8em"})]),a(ae,null,{default:o(()=>[l("div",Pe,[l("div",Ue,_(e.MITM_ITMNMREAL),1)])]),_:2},1024),a(U,null,{default:o(()=>[a(T,{clickable:"",onClick:p=>D(e,i),disable:e.STOCK-q(e.MITM_ITMNM)===0},{default:o(()=>[a(C,{avatar:""},{default:o(()=>[a(P,{color:"primary",name:"add"})]),_:1}),a(C,null,{default:o(()=>[a(w,null,{default:o(()=>[m("Add Item")]),_:1}),a(w,{caption:"",lines:"2"},{default:o(()=>[m(" Rp. "+_(parseInt(e.LATEST_PRC).toLocaleString()),1)]),_:2},1024)]),_:2},1024)]),_:2},1032,["onClick","disable"])]),_:2},1024)]),_:2},1024)]))),128))]),r.value?(u(),g("div",Ve,[a(me,{color:"primary",size:"40px"})])):(u(),g("div",De,[a(y,{color:"primary",label:"Load more",onClick:$})]))])]))])])]))}};export{Je as default};
