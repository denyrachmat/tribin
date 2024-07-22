import{h as d,c as X,K as ae,L as se,s as le,t as h,a as z,w as N,ax as oe,ay as ie,j as ne,o as Y,H as re,d as ce,m as ue,bn as q,G as J,q as D,bo as R,k as de,bp as W,aJ as ve,g as fe,C as m,R as Q,J as t,F as a,E as s,P as k,aI as me,Q as G,S as V,T as H,U as he,D as O,V as _e,I as y,av as $,O as ge,M as pe,W as be}from"./index.c5ac1c05.js";import{a as x,b as L,Q as j}from"./QItemLabel.bda84e06.js";import{Q as K}from"./QList.b6e39f7d.js";import{u as ye}from"./use-quasar.94828f5b.js";import{api_web as we}from"./axios.b96ef1d2.js";const Se=[d("circle",{cx:"15",cy:"15",r:"15"},[d("animate",{attributeName:"r",from:"15",to:"15",begin:"0s",dur:"0.8s",values:"15;9;15",calcMode:"linear",repeatCount:"indefinite"}),d("animate",{attributeName:"fill-opacity",from:"1",to:"1",begin:"0s",dur:"0.8s",values:"1;.5;1",calcMode:"linear",repeatCount:"indefinite"})]),d("circle",{cx:"60",cy:"15",r:"9","fill-opacity":".3"},[d("animate",{attributeName:"r",from:"9",to:"9",begin:"0s",dur:"0.8s",values:"9;15;9",calcMode:"linear",repeatCount:"indefinite"}),d("animate",{attributeName:"fill-opacity",from:".5",to:".5",begin:"0s",dur:"0.8s",values:".5;1;.5",calcMode:"linear",repeatCount:"indefinite"})]),d("circle",{cx:"105",cy:"15",r:"15"},[d("animate",{attributeName:"r",from:"15",to:"15",begin:"0s",dur:"0.8s",values:"15;9;15",calcMode:"linear",repeatCount:"indefinite"}),d("animate",{attributeName:"fill-opacity",from:"1",to:"1",begin:"0s",dur:"0.8s",values:"1;.5;1",calcMode:"linear",repeatCount:"indefinite"})])];var xe=X({name:"QSpinnerDots",props:ae,setup(o){const{cSize:_,classes:g}=se(o);return()=>d("svg",{class:g.value,fill:"currentColor",width:_.value,height:_.value,viewBox:"0 0 120 30",xmlns:"http://www.w3.org/2000/svg"},Se)}});const{passive:w}=ue;var Ie=X({name:"QInfiniteScroll",props:{offset:{type:Number,default:500},debounce:{type:[String,Number],default:100},scrollTarget:le,initialIndex:{type:Number,default:0},disable:Boolean,reverse:Boolean},emits:["load"],setup(o,{slots:_,emit:g}){const n=h(!1),i=h(!0),f=h(null),I=h(null);let p=o.initialIndex,e,r;const P=z(()=>"q-infinite-scroll__loading"+(n.value===!0?"":" invisible"));function c(){if(o.disable===!0||n.value===!0||i.value===!1)return;const l=q(e),v=D(e),M=W(e);o.reverse===!1?Math.round(v+M+o.offset)>=Math.round(l)&&u():Math.round(v)<=o.offset&&u()}function u(){if(o.disable===!0||n.value===!0||i.value===!1)return;p++,n.value=!0;const l=q(e);g("load",p,v=>{i.value===!0&&(n.value=!1,J(()=>{if(o.reverse===!0){const M=q(e),ee=D(e),te=M-l;R(e,ee+te)}v===!0?b():f.value&&f.value.closest("body")&&r()}))})}function S(){p=0}function T(){i.value===!1&&(i.value=!0,e.addEventListener("scroll",r,w)),c()}function b(){i.value===!0&&(i.value=!1,n.value=!1,e.removeEventListener("scroll",r,w),r!==void 0&&r.cancel!==void 0&&r.cancel())}function C(){if(e&&i.value===!0&&e.removeEventListener("scroll",r,w),e=de(f.value,o.scrollTarget),i.value===!0){if(e.addEventListener("scroll",r,w),o.reverse===!0){const l=q(e),v=W(e);R(e,l-v)}c()}}function F(l){p=l}function U(l){l=parseInt(l,10);const v=r;r=l<=0?c:ve(c,isNaN(l)===!0?100:l),e&&i.value===!0&&(v!==void 0&&e.removeEventListener("scroll",v,w),e.addEventListener("scroll",r,w))}function A(l){if(E.value===!0){if(I.value===null){l!==!0&&J(()=>{A(!0)});return}const v=`${n.value===!0?"un":""}pauseAnimations`;Array.from(I.value.getElementsByTagName("svg")).forEach(M=>{M[v]()})}}const E=z(()=>o.disable!==!0&&i.value===!0);N([n,E],()=>{A()}),N(()=>o.disable,l=>{l===!0?b():T()}),N(()=>o.reverse,()=>{n.value===!1&&i.value===!0&&c()}),N(()=>o.scrollTarget,C),N(()=>o.debounce,U);let B=!1;oe(()=>{B!==!1&&e&&R(e,B)}),ie(()=>{B=e?D(e):!1}),ne(()=>{i.value===!0&&e.removeEventListener("scroll",r,w)}),Y(()=>{U(o.debounce),C(),n.value===!1&&A()});const Z=fe();return Object.assign(Z.proxy,{poll:()=>{r!==void 0&&r()},trigger:u,stop:b,reset:S,resume:T,setIndex:F,updateScrollTarget:C}),()=>{const l=re(_.default,[]);return E.value===!0&&l[o.reverse===!1?"push":"unshift"](d("div",{ref:I,class:P.value},ce(_.loading))),d("div",{class:"q-infinite-scroll",ref:f},l)}}});const Te={class:"q-pa-md"},Ce=t("div",{class:"row q-pb-md"},[t("div",{class:"col"},[t("span",{class:"text-h4"},"POS")]),t("div",{class:"col text-right"})],-1),Me={class:"row bg-grey q-pa-md full-width",style:{height:"86vh"}},Ne={class:"col-4 q-pa-xs"},Qe={class:"row bg-white"},ke={class:"col",style:{height:"50vh",overflow:"auto"}},qe={class:"row q-pt-xs",style:{height:"30vh"}},Le={class:"col bg-white vertical-middle"},Pe={class:"row"},Ae={class:"col q-pa-sm",style:{height:"20vh"}},Ee={class:"text-h6 text-bold"},Be={class:"row",style:{height:"10vh"}},De={class:"col-sm-6 col-12 q-pa-sm"},Re={class:"col-sm-6 col-12 q-pa-sm"},Ve={class:"col q-pa-xs"},He={class:"row bg-white",style:{height:"80vh",overflow:"auto"}},Oe={class:"col"},$e={class:"row q-col-gutter-sm"},je={class:"text-center"},ze={class:"row items-center"},Fe={class:"col text-bold ellipsis"},Ue={class:"row justify-center q-my-md"},Ye={__name:"posSalesIndex",setup(o){const _=ye(),g=h([]),n=h([]),i=h(!1),f=h(0);Y(()=>{p("")});const I=z(()=>n.value.length>0?n.value.reduce((c,u)=>c+u.LATEST_PRC,0):0),p=async c=>{i.value=!0,f.value=f.value+1,await we.post("item/searchAPIStockAndPriceOnly",{searchValue:c,page:f.value}).then(u=>{i.value=!1,g.value.push(...u.data.data.data)}).catch(()=>{i.value=!1})},e=c=>{n.value.push(c)},r=async(c,u)=>{await p(""),u()},P=c=>{_.dialog({title:"Confirmation",message:"Are you sure want to delete this line ??",cancel:!0,persistent:!0}).onOk(async()=>{n.value.splice(c,1)})};return(c,u)=>(m(),Q("div",Te,[Ce,t("div",Me,[t("div",Ne,[t("div",Qe,[t("div",ke,[a(K,{bordered:"",loading:i.value},{default:s(()=>[n.value.length>0?(m(!0),Q(V,{key:0},H(n.value,S=>he((m(),O(j,{key:S.id,class:"q-my-sm"},{default:s(()=>[a(x,{avatar:""},{default:s(()=>[a(_e,{color:"primary","text-color":"white",icon:"category"})]),_:1}),a(x,null,{default:s(()=>[a(L,null,{default:s(()=>[y(k(S.MITM_ITMNM),1)]),_:2},1024),a(L,{caption:"",lines:"1"},{default:s(()=>[y(k(S.LATEST_PRC),1)]),_:2},1024)]),_:2},1024),a(x,{side:""},{default:s(()=>[a($,{name:"delete",color:"red",onClick:u[0]||(u[0]=T=>P(c.idx))})]),_:1})]),_:2},1024)),[[be]])),128)):(m(),O(j,{key:1},{default:s(()=>[a(x,null,{default:s(()=>[y(" No item selected!! ")]),_:1})]),_:1}))]),_:1},8,["loading"])])]),t("div",qe,[t("div",Le,[t("div",Pe,[t("div",Ae,[t("div",Ee,"Total : Rp. "+k(I.value),1)])]),a(me),t("div",Be,[t("div",De,[a(G,{color:"primary",class:"full-width"},{default:s(()=>[y(" Submit ")]),_:1})]),t("div",Re,[a(G,{color:"red",class:"full-width"},{default:s(()=>[y(" Cancel ")]),_:1})])])])])]),t("div",Ve,[t("div",He,[t("div",Oe,[a(Ie,{onLoad:r,offset:300,debounce:2e3},{loading:s(()=>[t("div",Ue,[a(xe,{color:"primary",size:"40px"})])]),default:s(()=>[t("div",$e,[(m(!0),Q(V,null,H(g.value,(S,T)=>(m(),Q("div",{class:"col-4",key:`sm-${T}`},[(m(!0),Q(V,null,H(g.value,(b,C)=>(m(),O(pe,{flat:"",bordered:"",key:`sm-${C}`,style:{width:"15em"}},{default:s(()=>[t("div",je,[a($,{name:"category",size:"8em"})]),a(ge,null,{default:s(()=>[t("div",ze,[t("div",Fe,k(b.MITM_ITMNM),1)])]),_:2},1024),a(K,null,{default:s(()=>[a(j,{clickable:"",onClick:F=>e(b)},{default:s(()=>[a(x,{avatar:""},{default:s(()=>[a($,{color:"primary",name:"add"})]),_:1}),a(x,null,{default:s(()=>[a(L,null,{default:s(()=>[y("Add Item")]),_:1}),a(L,{caption:""},{default:s(()=>[y("Rp. "+k(b.LATEST_PRC),1)]),_:2},1024)]),_:2},1024)]),_:2},1032,["onClick"])]),_:2},1024)]),_:2},1024))),128))]))),128))])]),_:1})])])])])]))}};export{Ye as default};
