import{h as i,c as B,K as $,L as E,t as f,o as z,a as K,C as u,R as p,J as s,F as t,E as l,P as r,aI as F,Q as g,$ as j,S as k,T as x,U as H,D as T,V as U,I as m,av as M,O as G,M as J,W}from"./index.68ce9174.js";import{a as v,b as w,Q as S}from"./QItemLabel.3ca85f8f.js";import{Q as X}from"./QBtnGroup.ca2c5fb9.js";import{Q as q}from"./QList.f7c99165.js";import{Q as Y}from"./QBadge.35ae3e0a.js";import{u as Z}from"./use-quasar.cfd3440b.js";import{api_web as ee}from"./axios.549ff231.js";const te=[i("circle",{cx:"15",cy:"15",r:"15"},[i("animate",{attributeName:"r",from:"15",to:"15",begin:"0s",dur:"0.8s",values:"15;9;15",calcMode:"linear",repeatCount:"indefinite"}),i("animate",{attributeName:"fill-opacity",from:"1",to:"1",begin:"0s",dur:"0.8s",values:"1;.5;1",calcMode:"linear",repeatCount:"indefinite"})]),i("circle",{cx:"60",cy:"15",r:"9","fill-opacity":".3"},[i("animate",{attributeName:"r",from:"9",to:"9",begin:"0s",dur:"0.8s",values:"9;15;9",calcMode:"linear",repeatCount:"indefinite"}),i("animate",{attributeName:"fill-opacity",from:".5",to:".5",begin:"0s",dur:"0.8s",values:".5;1;.5",calcMode:"linear",repeatCount:"indefinite"})]),i("circle",{cx:"105",cy:"15",r:"15"},[i("animate",{attributeName:"r",from:"15",to:"15",begin:"0s",dur:"0.8s",values:"15;9;15",calcMode:"linear",repeatCount:"indefinite"}),i("animate",{attributeName:"fill-opacity",from:"1",to:"1",begin:"0s",dur:"0.8s",values:"1;.5;1",calcMode:"linear",repeatCount:"indefinite"})])];var se=B({name:"QSpinnerDots",props:$,setup(Q){const{cSize:c,classes:_}=E(Q);return()=>i("svg",{class:_.value,fill:"currentColor",width:c.value,height:c.value,viewBox:"0 0 120 30",xmlns:"http://www.w3.org/2000/svg"},te)}});const ae={class:"q-pa-md"},le=s("div",{class:"row q-pb-md"},[s("div",{class:"col"},[s("span",{class:"text-h4"},"POS")]),s("div",{class:"col text-right"})],-1),oe={class:"row bg-grey q-pa-md full-width",style:{height:"86vh"}},ne={class:"col-4 q-pa-xs"},ie={class:"row bg-white"},re={class:"col",style:{height:"50vh",overflow:"auto","font-size":"10px"}},ce={class:"row q-pt-xs",style:{height:"30vh"}},de={class:"col bg-white vertical-middle"},ue={class:"row"},me={class:"col q-pa-sm",style:{height:"20vh"}},pe={class:"text-h6 text-bold"},ve={class:"row",style:{height:"10vh"}},_e={class:"col-sm-6 col-12 q-pa-sm"},he={class:"col-sm-6 col-12 q-pa-sm"},fe={class:"col q-pa-xs q-gutter-sm"},ge={class:"row bg-white",style:{height:"10vh",overflow:"auto"}},ye={class:"col"},we={class:"row bg-white",style:{height:"70vh",overflow:"auto"}},Ce={class:"col"},be={class:"row q-col-gutter-sm"},Se={class:"text-center"},Qe={class:"row items-center"},Ie={class:"col text-bold ellipsis"},ke={key:0,class:"row justify-center q-my-md"},xe={key:1,class:"row justify-center q-my-md"},Pe={__name:"posSalesIndex",setup(Q){const c=Z(),_=f([]),n=f([]),h=f(!1),C=f(0),I=f("");z(()=>{b("")});const L=K(()=>n.value.length>0?n.value.reduce((o,a)=>o+parseFloat(a.LATEST_PRC)*parseInt(a.sellQty),0):0),b=async o=>{h.value=!0,C.value=C.value+1,await ee.post("item/searchAPIStockAndPriceOnly",{searchValue:o,page:C.value}).then(a=>{h.value=!1,a.data.data.data.map(e=>{let d=n.value.findIndex(y=>y.MITM_ITMCD===e.MITM_ITMCD);console.log(d),d===-1&&_.value.push(e)})}).catch(()=>{h.value=!1})},A=(o,a)=>{c.dialog({dark:!0,title:"Prompt",message:"How many qty?",prompt:{model:0,type:"number",isValid:e=>e>0&&e<=_.value[a].STOCK},cancel:!0,persistent:!0}).onOk(e=>{n.value.push({...o,sellQty:e})}).onCancel(()=>{}).onDismiss(()=>{})},N=async(o,a)=>{await b(""),a()},O=o=>{b(o)},P=o=>{c.dialog({dark:!0,title:"Prompt",message:"How many qty?",prompt:{model:n.value[o].sellQty,type:"number",isValid:a=>a>0&&a<=n.value[o].STOCK},cancel:!0,persistent:!0}).onOk(a=>{n.value[o].sellQty=a})},V=o=>{c.dialog({title:"Confirmation",message:"Are you sure want to delete this line ??",cancel:!0,persistent:!0}).onOk(async()=>{n.value.splice(o,1)})},D=()=>{c.dialog({title:"Confirmation",message:"Are you sure want to cancel sales ??",cancel:!0,persistent:!0}).onOk(async()=>{n.value=[]})},R=()=>{c.dialog({title:"Confirmation",message:"Are you sure want to process this sales ??",cancel:!0,persistent:!0}).onOk(async()=>{n.value=[]})};return(o,a)=>(u(),p("div",ae,[le,s("div",oe,[s("div",ne,[s("div",ie,[s("div",re,[t(q,{bordered:"",loading:h.value},{default:l(()=>[n.value.length>0?(u(!0),p(k,{key:0},x(n.value,(e,d)=>H((u(),T(S,{key:e.id,class:"q-my-sm"},{default:l(()=>[t(v,{avatar:""},{default:l(()=>[t(U,{color:"primary","text-color":"white",icon:"category"})]),_:1}),t(v,null,{default:l(()=>[t(w,null,{default:l(()=>[m(r(e.MITM_ITMNM),1)]),_:2},1024),t(w,{lines:"1"},{default:l(()=>[m(" Rp "+r(e.LATEST_PRC.toLocaleString())+" x "+r(e.sellQty.toLocaleString())+" = ",1),s("b",null,r((e.LATEST_PRC*e.sellQty).toLocaleString()),1)]),_:2},1024)]),_:2},1024),t(v,{side:""},{default:l(()=>[t(X,{flat:""},{default:l(()=>[t(g,{icon:"edit",color:"orange",onClick:y=>P(d),dense:""},null,8,["onClick"]),t(g,{icon:"delete",color:"red",onClick:y=>V(d),dense:""},null,8,["onClick"])]),_:2},1024)]),_:2},1024)]),_:2},1024)),[[W]])),128)):(u(),T(S,{key:1},{default:l(()=>[t(v,null,{default:l(()=>[m(" No item selected!! ")]),_:1})]),_:1}))]),_:1},8,["loading"])])]),s("div",ce,[s("div",de,[s("div",ue,[s("div",me,[s("div",pe," Total : Rp. "+r(L.value.toLocaleString()),1)])]),t(F),s("div",ve,[s("div",_e,[t(g,{color:"primary",class:"full-width",onClick:a[0]||(a[0]=e=>R())},{default:l(()=>[m(" Submit ")]),_:1})]),s("div",he,[t(g,{color:"red",class:"full-width",onClick:a[1]||(a[1]=e=>D())},{default:l(()=>[m(" Cancel ")]),_:1})])])])])]),s("div",fe,[s("div",ge,[s("div",ye,[t(j,{filled:"",modelValue:I.value,"onUpdate:modelValue":[a[2]||(a[2]=e=>I.value=e),a[3]||(a[3]=e=>O(e))],label:"Search Item",dense:"",debounce:1e3},null,8,["modelValue"])])]),s("div",we,[s("div",Ce,[s("div",be,[(u(!0),p(k,null,x(_.value,(e,d)=>(u(),p("div",{class:"col-6 q-pa-sm",key:`sm-${d}`},[t(J,{flat:"",bordered:""},{default:l(()=>[t(Y,{color:"orange",floating:""},{default:l(()=>[m(r((parseInt(e.STOCK)-(e.sellQty?parseInt(e.sellQty):0)).toLocaleString()),1)]),_:2},1024),s("div",Se,[t(M,{name:"category",size:"8em"})]),t(G,null,{default:l(()=>[s("div",Qe,[s("div",Ie,r(e.MITM_ITMNM)+" "+r(e.sellQty),1)])]),_:2},1024),t(q,null,{default:l(()=>[t(S,{clickable:"",onClick:y=>A(e,d)},{default:l(()=>[t(v,{avatar:""},{default:l(()=>[t(M,{color:"primary",name:"add"})]),_:1}),t(v,null,{default:l(()=>[t(w,null,{default:l(()=>[m("Add Item")]),_:1}),t(w,{caption:"",lines:"2"},{default:l(()=>[m(" Rp. "+r(parseInt(e.LATEST_PRC).toLocaleString()),1)]),_:2},1024)]),_:2},1024)]),_:2},1032,["onClick"])]),_:2},1024)]),_:2},1024)]))),128))]),h.value?(u(),p("div",ke,[t(se,{color:"primary",size:"40px"})])):(u(),p("div",xe,[t(g,{color:"primary",label:"Load more",onClick:N})]))])])])])]))}};export{Pe as default};
