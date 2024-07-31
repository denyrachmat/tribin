import{h as i,c as E,K,L as z,t as _,o as F,a as j,C as c,R as v,J as s,F as t,E as l,P as u,aI as H,Q as y,$ as U,S as Q,T as k,U as G,D as q,V as J,I as m,av as L,O as W,M as X,W as Y}from"./index.b07dae43.js";import{a as f,b as I,Q as b}from"./QItemLabel.27fa81fe.js";import{Q as Z}from"./QBtnGroup.97036f06.js";import{Q as D}from"./QList.8e13ce94.js";import{Q as ee}from"./QBadge.2249f81c.js";import{u as te}from"./use-quasar.09dafc03.js";import{api_web as ae}from"./axios.0b3ffaa9.js";const se=[i("circle",{cx:"15",cy:"15",r:"15"},[i("animate",{attributeName:"r",from:"15",to:"15",begin:"0s",dur:"0.8s",values:"15;9;15",calcMode:"linear",repeatCount:"indefinite"}),i("animate",{attributeName:"fill-opacity",from:"1",to:"1",begin:"0s",dur:"0.8s",values:"1;.5;1",calcMode:"linear",repeatCount:"indefinite"})]),i("circle",{cx:"60",cy:"15",r:"9","fill-opacity":".3"},[i("animate",{attributeName:"r",from:"9",to:"9",begin:"0s",dur:"0.8s",values:"9;15;9",calcMode:"linear",repeatCount:"indefinite"}),i("animate",{attributeName:"fill-opacity",from:".5",to:".5",begin:"0s",dur:"0.8s",values:".5;1;.5",calcMode:"linear",repeatCount:"indefinite"})]),i("circle",{cx:"105",cy:"15",r:"15"},[i("animate",{attributeName:"r",from:"15",to:"15",begin:"0s",dur:"0.8s",values:"15;9;15",calcMode:"linear",repeatCount:"indefinite"}),i("animate",{attributeName:"fill-opacity",from:"1",to:"1",begin:"0s",dur:"0.8s",values:"1;.5;1",calcMode:"linear",repeatCount:"indefinite"})])];var le=E({name:"QSpinnerDots",props:K,setup(S){const{cSize:d,classes:h}=z(S);return()=>i("svg",{class:h.value,fill:"currentColor",width:d.value,height:d.value,viewBox:"0 0 120 30",xmlns:"http://www.w3.org/2000/svg"},se)}});const oe={class:"q-pa-md"},ne=s("div",{class:"row q-pb-md"},[s("div",{class:"col"},[s("span",{class:"text-h4"},"POS")]),s("div",{class:"col text-right"})],-1),ie={class:"row bg-grey q-pa-md full-width",style:{height:"86vh"}},re={class:"col-4 q-pa-xs"},ce={class:"row bg-white"},de={class:"col",style:{height:"50vh",overflow:"auto","font-size":"10px"}},ue={class:"row q-pt-xs",style:{height:"30vh"}},me={class:"col bg-white vertical-middle"},ve={class:"row"},pe={class:"col q-pa-sm",style:{height:"20vh"}},_e={class:"text-h6 text-bold"},fe={class:"row",style:{height:"10vh"}},he={class:"col-sm-6 col-12 q-pa-sm"},ge={class:"col-sm-6 col-12 q-pa-sm"},ye={class:"col q-pa-xs q-gutter-sm"},Ie={class:"row bg-white",style:{height:"10vh",overflow:"auto"}},Ce={class:"col"},we={class:"col"},Me={class:"row q-col-gutter-sm"},be={class:"text-center"},Se={class:"row items-center"},Te={class:"col text-bold ellipsis"},xe={key:0,class:"row justify-center q-my-md"},Qe={key:1,class:"row justify-center q-my-md"},Pe={__name:"posSalesIndex",setup(S){const d=te(),h=_([]),n=_([]),g=_(!1),C=_(0),T=_(""),w=_(0);F(()=>{M("")});const A=j(()=>n.value.length>0?n.value.reduce((o,a)=>o+parseFloat(a.LATEST_PRC)*parseInt(a.sellQty),0):0),M=async o=>{g.value=!0,C.value=C.value+1,await ae.post("item/searchAPIStockAndPriceOnly",{searchValue:o,page:C.value}).then(a=>{g.value=!1,a.data.data.data.map(e=>{n.value.findIndex(p=>p.MITM_ITMCD===e.MITM_ITMCD)===-1&&h.value.push(e)})}).catch(()=>{g.value=!1})},N=(o,a)=>{d.dialog({dark:!0,title:"Prompt",message:"How many qty?",prompt:{model:0,type:"number",isValid:e=>e>0&&e<=h.value[a].STOCK},cancel:!0,persistent:!0}).onOk(e=>{w.value=w.value+1;const r=n.value.findIndex(p=>p.MITM_ITMCD===o.MITM_ITMCD);r!==-1?n.value[r].sellQty=e:n.value.push({...o,sellQty:e})}).onCancel(()=>{}).onDismiss(()=>{})},O=async(o,a)=>{await M(""),a()},P=o=>{M(o)},V=o=>{d.dialog({dark:!0,title:"Prompt",message:"How many qty?",prompt:{model:n.value[o].sellQty,type:"number",isValid:a=>a>0&&a<=n.value[o].STOCK},cancel:!0,persistent:!0}).onOk(a=>{n.value[o].sellQty=a})},R=o=>{d.dialog({title:"Confirmation",message:"Are you sure want to delete this line ??",cancel:!0,persistent:!0}).onOk(async()=>{n.value.splice(o,1)})},x=o=>{let a=n.value.findIndex(e=>e.MITM_ITMCD===o);return a!==-1&&n.value[a].sellQty?n.value[a].sellQty:0},B=()=>{d.dialog({title:"Confirmation",message:"Are you sure want to cancel sales ??",cancel:!0,persistent:!0}).onOk(async()=>{n.value=[]})},$=()=>{d.dialog({title:"Confirmation",message:"Are you sure want to process this sales ??",cancel:!0,persistent:!0}).onOk(async()=>{n.value=[]})};return(o,a)=>(c(),v("div",oe,[ne,s("div",ie,[s("div",re,[s("div",ce,[s("div",de,[t(D,{bordered:"",loading:g.value},{default:l(()=>[n.value.length>0?(c(!0),v(Q,{key:0},k(n.value,(e,r)=>G((c(),q(b,{key:e.id,class:"q-my-sm"},{default:l(()=>[t(f,{avatar:""},{default:l(()=>[t(J,{color:"primary","text-color":"white",icon:"category"})]),_:1}),t(f,null,{default:l(()=>[t(I,null,{default:l(()=>[m(u(e.MITM_ITMNM),1)]),_:2},1024),t(I,{lines:"1"},{default:l(()=>[m(" Rp "+u(e.LATEST_PRC.toLocaleString())+" x "+u(e.sellQty.toLocaleString())+" = ",1),s("b",null,u((e.LATEST_PRC*e.sellQty).toLocaleString()),1)]),_:2},1024)]),_:2},1024),t(f,{side:""},{default:l(()=>[t(Z,{flat:""},{default:l(()=>[t(y,{icon:"edit",color:"orange",onClick:p=>V(r),dense:""},null,8,["onClick"]),t(y,{icon:"delete",color:"red",onClick:p=>R(r),dense:""},null,8,["onClick"])]),_:2},1024)]),_:2},1024)]),_:2},1024)),[[Y]])),128)):(c(),q(b,{key:1},{default:l(()=>[t(f,null,{default:l(()=>[m(" No item selected!! ")]),_:1})]),_:1}))]),_:1},8,["loading"])])]),s("div",ue,[s("div",me,[s("div",ve,[s("div",pe,[s("div",_e," Total : Rp. "+u(A.value.toLocaleString()),1)])]),t(H),s("div",fe,[s("div",he,[t(y,{color:"primary",class:"full-width",onClick:a[0]||(a[0]=e=>$())},{default:l(()=>[m(" Submit ")]),_:1})]),s("div",ge,[t(y,{color:"red",class:"full-width",onClick:a[1]||(a[1]=e=>B())},{default:l(()=>[m(" Cancel ")]),_:1})])])])])]),s("div",ye,[s("div",Ie,[s("div",Ce,[t(U,{filled:"",modelValue:T.value,"onUpdate:modelValue":[a[2]||(a[2]=e=>T.value=e),a[3]||(a[3]=e=>P(e))],label:"Search Item",dense:"",debounce:1e3},null,8,["modelValue"])])]),(c(),v("div",{class:"row bg-white",style:{height:"70vh",overflow:"auto"},key:w.value},[s("div",we,[s("div",Me,[(c(!0),v(Q,null,k(h.value,(e,r)=>(c(),v("div",{class:"col-6 q-pa-sm",key:`sm-${r}`},[t(X,{flat:"",bordered:""},{default:l(()=>[t(ee,{color:"orange",floating:""},{default:l(()=>[m(u((parseInt(e.STOCK)-x(e.MITM_ITMCD)).toLocaleString()),1)]),_:2},1024),s("div",be,[t(L,{name:"category",size:"8em"})]),t(W,null,{default:l(()=>[s("div",Se,[s("div",Te,u(e.MITM_ITMNM),1)])]),_:2},1024),t(D,null,{default:l(()=>[t(b,{clickable:"",onClick:p=>N(e,r),disable:e.STOCK-x(e.MITM_ITMCD)===0},{default:l(()=>[t(f,{avatar:""},{default:l(()=>[t(L,{color:"primary",name:"add"})]),_:1}),t(f,null,{default:l(()=>[t(I,null,{default:l(()=>[m("Add Item")]),_:1}),t(I,{caption:"",lines:"2"},{default:l(()=>[m(" Rp. "+u(parseInt(e.LATEST_PRC).toLocaleString()),1)]),_:2},1024)]),_:2},1024)]),_:2},1032,["onClick","disable"])]),_:2},1024)]),_:2},1024)]))),128))]),g.value?(c(),v("div",xe,[t(le,{color:"primary",size:"40px"})])):(c(),v("div",Qe,[t(y,{color:"primary",label:"Load more",onClick:O})]))])]))])])]))}};export{Pe as default};
