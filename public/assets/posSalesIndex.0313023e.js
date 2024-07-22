import{h as d,c as X,K as ae,L as le,s as se,t as p,a as z,w as N,ax as oe,ay as ie,j as ne,o as Y,H as re,d as ce,m as ue,bn as q,G as J,q as D,bo as R,k as de,bp as W,aJ as fe,g as ve,C as g,R as Q,J as t,F as a,E as l,P as k,aI as me,Q as G,S as V,T as H,U as he,D as O,V as _e,I as x,av as $,O as ge,M as pe,W as be}from"./index.2a6068d3.js";import{a as I,b as L,Q as j}from"./QItemLabel.d1438271.js";import{Q as K}from"./QList.a9f0a156.js";import{u as ye}from"./use-quasar.d7bea8fd.js";import{api_web as we}from"./axios.e535aaa9.js";const xe=[d("circle",{cx:"15",cy:"15",r:"15"},[d("animate",{attributeName:"r",from:"15",to:"15",begin:"0s",dur:"0.8s",values:"15;9;15",calcMode:"linear",repeatCount:"indefinite"}),d("animate",{attributeName:"fill-opacity",from:"1",to:"1",begin:"0s",dur:"0.8s",values:"1;.5;1",calcMode:"linear",repeatCount:"indefinite"})]),d("circle",{cx:"60",cy:"15",r:"9","fill-opacity":".3"},[d("animate",{attributeName:"r",from:"9",to:"9",begin:"0s",dur:"0.8s",values:"9;15;9",calcMode:"linear",repeatCount:"indefinite"}),d("animate",{attributeName:"fill-opacity",from:".5",to:".5",begin:"0s",dur:"0.8s",values:".5;1;.5",calcMode:"linear",repeatCount:"indefinite"})]),d("circle",{cx:"105",cy:"15",r:"15"},[d("animate",{attributeName:"r",from:"15",to:"15",begin:"0s",dur:"0.8s",values:"15;9;15",calcMode:"linear",repeatCount:"indefinite"}),d("animate",{attributeName:"fill-opacity",from:"1",to:"1",begin:"0s",dur:"0.8s",values:"1;.5;1",calcMode:"linear",repeatCount:"indefinite"})])];var Se=X({name:"QSpinnerDots",props:ae,setup(o){const{cSize:b,classes:y}=le(o);return()=>d("svg",{class:y.value,fill:"currentColor",width:b.value,height:b.value,viewBox:"0 0 120 30",xmlns:"http://www.w3.org/2000/svg"},xe)}});const{passive:S}=ue;var Ie=X({name:"QInfiniteScroll",props:{offset:{type:Number,default:500},debounce:{type:[String,Number],default:100},scrollTarget:se,initialIndex:{type:Number,default:0},disable:Boolean,reverse:Boolean},emits:["load"],setup(o,{slots:b,emit:y}){const n=p(!1),i=p(!0),h=p(null),T=p(null);let w=o.initialIndex,e,r;const P=z(()=>"q-infinite-scroll__loading"+(n.value===!0?"":" invisible"));function c(){if(o.disable===!0||n.value===!0||i.value===!1)return;const s=q(e),f=D(e),C=W(e);o.reverse===!1?Math.round(f+C+o.offset)>=Math.round(s)&&u():Math.round(f)<=o.offset&&u()}function u(){if(o.disable===!0||n.value===!0||i.value===!1)return;w++,n.value=!0;const s=q(e);y("load",w,f=>{i.value===!0&&(n.value=!1,J(()=>{if(o.reverse===!0){const C=q(e),ee=D(e),te=C-s;R(e,ee+te)}f===!0?m():h.value&&h.value.closest("body")&&r()}))})}function v(){w=0}function _(){i.value===!1&&(i.value=!0,e.addEventListener("scroll",r,S)),c()}function m(){i.value===!0&&(i.value=!1,n.value=!1,e.removeEventListener("scroll",r,S),r!==void 0&&r.cancel!==void 0&&r.cancel())}function M(){if(e&&i.value===!0&&e.removeEventListener("scroll",r,S),e=de(h.value,o.scrollTarget),i.value===!0){if(e.addEventListener("scroll",r,S),o.reverse===!0){const s=q(e),f=W(e);R(e,s-f)}c()}}function F(s){w=s}function U(s){s=parseInt(s,10);const f=r;r=s<=0?c:fe(c,isNaN(s)===!0?100:s),e&&i.value===!0&&(f!==void 0&&e.removeEventListener("scroll",f,S),e.addEventListener("scroll",r,S))}function A(s){if(E.value===!0){if(T.value===null){s!==!0&&J(()=>{A(!0)});return}const f=`${n.value===!0?"un":""}pauseAnimations`;Array.from(T.value.getElementsByTagName("svg")).forEach(C=>{C[f]()})}}const E=z(()=>o.disable!==!0&&i.value===!0);N([n,E],()=>{A()}),N(()=>o.disable,s=>{s===!0?m():_()}),N(()=>o.reverse,()=>{n.value===!1&&i.value===!0&&c()}),N(()=>o.scrollTarget,M),N(()=>o.debounce,U);let B=!1;oe(()=>{B!==!1&&e&&R(e,B)}),ie(()=>{B=e?D(e):!1}),ne(()=>{i.value===!0&&e.removeEventListener("scroll",r,S)}),Y(()=>{U(o.debounce),M(),n.value===!1&&A()});const Z=ve();return Object.assign(Z.proxy,{poll:()=>{r!==void 0&&r()},trigger:u,stop:m,reset:v,resume:_,setIndex:F,updateScrollTarget:M}),()=>{const s=re(b.default,[]);return E.value===!0&&s[o.reverse===!1?"push":"unshift"](d("div",{ref:T,class:P.value},ce(b.loading))),d("div",{class:"q-infinite-scroll",ref:h},s)}}});const Te={class:"q-pa-md"},Me=t("div",{class:"row q-pb-md"},[t("div",{class:"col"},[t("span",{class:"text-h4"},"POS")]),t("div",{class:"col text-right"})],-1),Ce={class:"row bg-grey q-pa-md full-width",style:{height:"86vh"}},Ne={class:"col-4 q-pa-xs"},Qe={class:"row bg-white"},ke={class:"col",style:{height:"50vh",overflow:"auto"}},qe={class:"row q-pt-xs",style:{height:"30vh"}},Le={class:"col bg-white vertical-middle"},Pe={class:"row"},Ae={class:"col q-pa-sm",style:{height:"20vh"}},Ee={class:"text-h6 text-bold"},Be={class:"row",style:{height:"10vh"}},De={class:"col-sm-6 col-12 q-pa-sm"},Re={class:"col-sm-6 col-12 q-pa-sm"},Ve={class:"col q-pa-xs"},He={class:"row bg-white",style:{height:"80vh",overflow:"auto"}},Oe={class:"col"},$e={class:"row q-col-gutter-sm"},je={class:"text-center"},ze={class:"row items-center"},Fe={class:"col text-bold ellipsis"},Ue={class:"row justify-center q-my-md"},Ye={__name:"posSalesIndex",setup(o){const b=ye(),y=p([]),n=p([]),i=p(!1),h=p(0);Y(()=>{w("")});const T=z(()=>n.value.length>0?n.value.reduce((c,u)=>c+u.LATEST_PRC,0):0),w=async c=>{i.value=!0,h.value=h.value+1,await we.post("item/searchAPIStockAndPriceOnly",{searchValue:c,page:h.value}).then(u=>{i.value=!1,u.data.data.data.map(v=>{let _=u.data.data.data.findIndex(m=>m.MITM_ITMCD===v.MITM_ITMCD);console.log(_),_===-1&&y.value.push(v)})}).catch(()=>{i.value=!1})},e=c=>{n.value.push(c)},r=async(c,u)=>{await w(""),u()},P=c=>{b.dialog({title:"Confirmation",message:"Are you sure want to delete this line ??",cancel:!0,persistent:!0}).onOk(async()=>{n.value.splice(c,1)})};return(c,u)=>(g(),Q("div",Te,[Me,t("div",Ce,[t("div",Ne,[t("div",Qe,[t("div",ke,[a(K,{bordered:"",loading:i.value},{default:l(()=>[n.value.length>0?(g(!0),Q(V,{key:0},H(n.value,v=>he((g(),O(j,{key:v.id,class:"q-my-sm"},{default:l(()=>[a(I,{avatar:""},{default:l(()=>[a(_e,{color:"primary","text-color":"white",icon:"category"})]),_:1}),a(I,null,{default:l(()=>[a(L,null,{default:l(()=>[x(k(v.MITM_ITMNM),1)]),_:2},1024),a(L,{caption:"",lines:"1"},{default:l(()=>[x(k(v.LATEST_PRC),1)]),_:2},1024)]),_:2},1024),a(I,{side:""},{default:l(()=>[a($,{name:"delete",color:"red",onClick:u[0]||(u[0]=_=>P(c.idx))})]),_:1})]),_:2},1024)),[[be]])),128)):(g(),O(j,{key:1},{default:l(()=>[a(I,null,{default:l(()=>[x(" No item selected!! ")]),_:1})]),_:1}))]),_:1},8,["loading"])])]),t("div",qe,[t("div",Le,[t("div",Pe,[t("div",Ae,[t("div",Ee,"Total : Rp. "+k(T.value),1)])]),a(me),t("div",Be,[t("div",De,[a(G,{color:"primary",class:"full-width"},{default:l(()=>[x(" Submit ")]),_:1})]),t("div",Re,[a(G,{color:"red",class:"full-width"},{default:l(()=>[x(" Cancel ")]),_:1})])])])])]),t("div",Ve,[t("div",He,[t("div",Oe,[a(Ie,{onLoad:r,offset:300,debounce:2e3},{loading:l(()=>[t("div",Ue,[a(Se,{color:"primary",size:"40px"})])]),default:l(()=>[t("div",$e,[(g(!0),Q(V,null,H(y.value,(v,_)=>(g(),Q("div",{class:"col-6",key:`sm-${_}`},[(g(!0),Q(V,null,H(y.value,(m,M)=>(g(),O(pe,{flat:"",bordered:"",key:`sm-${M}`,style:{width:"15em"}},{default:l(()=>[t("div",je,[a($,{name:"category",size:"8em"})]),a(ge,null,{default:l(()=>[t("div",ze,[t("div",Fe,k(m.MITM_ITMNM),1)])]),_:2},1024),a(K,null,{default:l(()=>[a(j,{clickable:"",onClick:F=>e(m)},{default:l(()=>[a(I,{avatar:""},{default:l(()=>[a($,{color:"primary",name:"add"})]),_:1}),a(I,null,{default:l(()=>[a(L,null,{default:l(()=>[x("Add Item")]),_:1}),a(L,{caption:""},{default:l(()=>[x("Rp. "+k(m.LATEST_PRC),1)]),_:2},1024)]),_:2},1024)]),_:2},1032,["onClick"])]),_:2},1024)]),_:2},1024))),128))]))),128))])]),_:1})])])])])]))}};export{Ye as default};
