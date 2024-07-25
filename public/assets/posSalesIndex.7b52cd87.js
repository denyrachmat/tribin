import{h as i,c as L,K as P,L as V,t as f,o as R,a as B,C as n,R as d,J as t,F as e,E as s,P as p,aI as O,Q as w,$,S,T,U as E,D as k,V as z,I as r,av as b,O as j,M as F,W as K}from"./index.ce88d0eb.js";import{a as u,b as g,Q as I}from"./QItemLabel.6e3c5fc9.js";import{Q}from"./QList.dc89d9cc.js";import{u as U}from"./use-quasar.3f540e98.js";import{api_web as H}from"./axios.b1e043ea.js";const J=[i("circle",{cx:"15",cy:"15",r:"15"},[i("animate",{attributeName:"r",from:"15",to:"15",begin:"0s",dur:"0.8s",values:"15;9;15",calcMode:"linear",repeatCount:"indefinite"}),i("animate",{attributeName:"fill-opacity",from:"1",to:"1",begin:"0s",dur:"0.8s",values:"1;.5;1",calcMode:"linear",repeatCount:"indefinite"})]),i("circle",{cx:"60",cy:"15",r:"9","fill-opacity":".3"},[i("animate",{attributeName:"r",from:"9",to:"9",begin:"0s",dur:"0.8s",values:"9;15;9",calcMode:"linear",repeatCount:"indefinite"}),i("animate",{attributeName:"fill-opacity",from:".5",to:".5",begin:"0s",dur:"0.8s",values:".5;1;.5",calcMode:"linear",repeatCount:"indefinite"})]),i("circle",{cx:"105",cy:"15",r:"15"},[i("animate",{attributeName:"r",from:"15",to:"15",begin:"0s",dur:"0.8s",values:"15;9;15",calcMode:"linear",repeatCount:"indefinite"}),i("animate",{attributeName:"fill-opacity",from:"1",to:"1",begin:"0s",dur:"0.8s",values:"1;.5;1",calcMode:"linear",repeatCount:"indefinite"})])];var W=L({name:"QSpinnerDots",props:P,setup(C){const{cSize:m,classes:h}=V(C);return()=>i("svg",{class:h.value,fill:"currentColor",width:m.value,height:m.value,viewBox:"0 0 120 30",xmlns:"http://www.w3.org/2000/svg"},J)}});const G={class:"q-pa-md"},X=t("div",{class:"row q-pb-md"},[t("div",{class:"col"},[t("span",{class:"text-h4"},"POS")]),t("div",{class:"col text-right"})],-1),Y={class:"row bg-grey q-pa-md full-width",style:{height:"86vh"}},Z={class:"col-4 q-pa-xs"},ee={class:"row bg-white"},te={class:"col",style:{height:"50vh",overflow:"auto"}},se={class:"row q-pt-xs",style:{height:"30vh"}},ae={class:"col bg-white vertical-middle"},le={class:"row"},oe={class:"col q-pa-sm",style:{height:"20vh"}},ie={class:"text-h6 text-bold"},ne={class:"row",style:{height:"10vh"}},ce={class:"col-sm-6 col-12 q-pa-sm"},re={class:"col-sm-6 col-12 q-pa-sm"},de={class:"col q-pa-xs q-gutter-sm"},ue={class:"row bg-white",style:{height:"10vh",overflow:"auto"}},me={class:"col"},_e={class:"row bg-white",style:{height:"80vh",overflow:"auto"}},ve={class:"col"},pe={class:"row q-col-gutter-sm"},he={class:"text-center"},fe={class:"row items-center"},ge={class:"col text-bold ellipsis"},ye={key:0,class:"row justify-center q-my-md"},we={key:1,class:"row justify-center q-my-md"},Se={__name:"posSalesIndex",setup(C){const m=U(),h=f([]),c=f([]),_=f(!1),y=f(0);R(()=>{x("")});const q=B(()=>c.value.length>0?c.value.reduce((l,a)=>l+a.LATEST_PRC,0):0),x=async l=>{_.value=!0,y.value=y.value+1,await H.post("item/searchAPIStockAndPriceOnly",{searchValue:l,page:y.value}).then(a=>{_.value=!1,a.data.data.data.map(o=>{let v=c.value.findIndex(M=>M.MITM_ITMCD===o.MITM_ITMCD);console.log(v),v===-1&&h.value.push(o)})}).catch(()=>{_.value=!1})},N=l=>{m.dialog({dark:!0,title:"Prompt",message:"How many qty?",prompt:{model:"",type:"number",isValid:a=>a.STOCK>0},cancel:!0,persistent:!0}).onOk(a=>{c.value.push({...l,sellQty:a})}).onCancel(()=>{}).onDismiss(()=>{})},A=async(l,a)=>{await x(""),a()},D=l=>{m.dialog({title:"Confirmation",message:"Are you sure want to delete this line ??",cancel:!0,persistent:!0}).onOk(async()=>{c.value.splice(l,1)})};return(l,a)=>(n(),d("div",G,[X,t("div",Y,[t("div",Z,[t("div",ee,[t("div",te,[e(Q,{bordered:"",loading:_.value},{default:s(()=>[c.value.length>0?(n(!0),d(S,{key:0},T(c.value,o=>E((n(),k(I,{key:o.id,class:"q-my-sm"},{default:s(()=>[e(u,{avatar:""},{default:s(()=>[e(z,{color:"primary","text-color":"white",icon:"category"})]),_:1}),e(u,null,{default:s(()=>[e(g,null,{default:s(()=>[r(p(o.MITM_ITMNM),1)]),_:2},1024),e(g,{caption:"",lines:"1"},{default:s(()=>[r(p(o.LATEST_PRC),1)]),_:2},1024)]),_:2},1024),e(u,{side:""},{default:s(()=>[e(b,{name:"delete",color:"red",onClick:a[0]||(a[0]=v=>D(l.idx))})]),_:1})]),_:2},1024)),[[K]])),128)):(n(),k(I,{key:1},{default:s(()=>[e(u,null,{default:s(()=>[r(" No item selected!! ")]),_:1})]),_:1}))]),_:1},8,["loading"])])]),t("div",se,[t("div",ae,[t("div",le,[t("div",oe,[t("div",ie,"Total : Rp. "+p(q.value),1)])]),e(O),t("div",ne,[t("div",ce,[e(w,{color:"primary",class:"full-width"},{default:s(()=>[r(" Submit ")]),_:1})]),t("div",re,[e(w,{color:"red",class:"full-width"},{default:s(()=>[r(" Cancel ")]),_:1})])])])])]),t("div",de,[t("div",ue,[t("div",me,[e($,{filled:"",modelValue:l.searchItem,"onUpdate:modelValue":[a[1]||(a[1]=o=>l.searchItem=o),a[2]||(a[2]=o=>l.onInputSearch())],label:"Search Item",dense:""},null,8,["modelValue"])])]),t("div",_e,[t("div",ve,[t("div",pe,[(n(!0),d(S,null,T(h.value,(o,v)=>(n(),d("div",{class:"col-6",key:`sm-${v}`},[e(F,{flat:"",bordered:""},{default:s(()=>[t("div",he,[e(b,{name:"category",size:"8em"})]),e(j,null,{default:s(()=>[t("div",fe,[t("div",ge,p(o.MITM_ITMNM),1)])]),_:2},1024),e(Q,null,{default:s(()=>[e(I,{clickable:"",onClick:M=>N(o)},{default:s(()=>[e(u,{avatar:""},{default:s(()=>[e(b,{color:"primary",name:"add"})]),_:1}),e(u,null,{default:s(()=>[e(g,null,{default:s(()=>[r("Add Item")]),_:1}),e(g,{caption:""},{default:s(()=>[r("Rp. "+p(o.LATEST_PRC),1)]),_:2},1024)]),_:2},1024)]),_:2},1032,["onClick"])]),_:2},1024)]),_:2},1024)]))),128))]),_.value?(n(),d("div",ye,[e(W,{color:"primary",size:"40px"})])):(n(),d("div",we,[e(w,{color:"primary",label:"Load more",onClick:A})]))])])])])]))}};export{Se as default};
