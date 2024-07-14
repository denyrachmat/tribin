import{c as b,a as s,h as v,d as x,i as Q,e as c,t as C,w as p,j as k,H as P,g as B,l as V,f as O,C as I,D as L,E as y,F as _,I as N,J as h,Q as j}from"./index.1994d2d5.js";import{Q as S}from"./QResizeObserver.f7db8d98.js";var R=b({name:"QToolbarTitle",props:{shrink:Boolean},setup(t,{slots:l}){const n=s(()=>"q-toolbar__title ellipsis"+(t.shrink===!0?" col-shrink":""));return()=>v("div",{class:n.value},x(l.default))}}),A=b({name:"QToolbar",props:{inset:Boolean},setup(t,{slots:l}){const n=s(()=>"q-toolbar row no-wrap items-center"+(t.inset===!0?" q-toolbar--inset":""));return()=>v("div",{class:n.value,role:"toolbar"},x(l.default))}}),J=b({name:"QHeader",props:{modelValue:{type:Boolean,default:!0},reveal:Boolean,revealOffset:{type:Number,default:250},bordered:Boolean,elevated:Boolean,heightHint:{type:[String,Number],default:50}},emits:["reveal","focusin"],setup(t,{slots:l,emit:n}){const{proxy:{$q:o}}=B(),a=Q(V,c);if(a===c)return console.error("QHeader needs to be child of QLayout"),c;const f=C(parseInt(t.heightHint,10)),r=C(!0),u=s(()=>t.reveal===!0||a.view.value.indexOf("H")!==-1||o.platform.is.ios&&a.isContainer.value===!0),g=s(()=>{if(t.modelValue!==!0)return 0;if(u.value===!0)return r.value===!0?f.value:0;const e=f.value-a.scroll.value.position;return e>0?e:0}),q=s(()=>t.modelValue!==!0||u.value===!0&&r.value!==!0),z=s(()=>t.modelValue===!0&&q.value===!0&&t.reveal===!0),H=s(()=>"q-header q-layout__section--marginal "+(u.value===!0?"fixed":"absolute")+"-top"+(t.bordered===!0?" q-header--bordered":"")+(q.value===!0?" q-header--hidden":"")+(t.modelValue!==!0?" q-layout--prevent-focus":"")),$=s(()=>{const e=a.rows.value.top,d={};return e[0]==="l"&&a.left.space===!0&&(d[o.lang.rtl===!0?"right":"left"]=`${a.left.size}px`),e[2]==="r"&&a.right.space===!0&&(d[o.lang.rtl===!0?"left":"right"]=`${a.right.size}px`),d});function i(e,d){a.update("header",e,d)}function m(e,d){e.value!==d&&(e.value=d)}function T({height:e}){m(f,e),i("size",e)}function F(e){z.value===!0&&m(r,!0),n("focusin",e)}p(()=>t.modelValue,e=>{i("space",e),m(r,!0),a.animate()}),p(g,e=>{i("offset",e)}),p(()=>t.reveal,e=>{e===!1&&m(r,t.modelValue)}),p(r,e=>{a.animate(),n("reveal",e)}),p(a.scroll,e=>{t.reveal===!0&&m(r,e.direction==="up"||e.position<=t.revealOffset||e.position-e.inflectionPoint<100)});const w={};return a.instances.header=w,t.modelValue===!0&&i("size",f.value),i("space",t.modelValue),i("offset",g.value),k(()=>{a.instances.header===w&&(a.instances.header=void 0,i("size",0),i("offset",0),i("space",!1))}),()=>{const e=P(l.default,[]);return t.elevated===!0&&e.push(v("div",{class:"q-layout__shadow absolute-full overflow-hidden no-pointer-events"})),e.push(v(S,{debounce:0,onResize:T})),v("header",{class:H.value,style:$.value,onFocusin:F},e)}}}),K=b({name:"QPage",props:{padding:Boolean,styleFn:Function},setup(t,{slots:l}){const{proxy:{$q:n}}=B(),o=Q(V,c);if(o===c)return console.error("QPage needs to be a deep child of QLayout"),c;if(Q(O,c)===c)return console.error("QPage needs to be child of QPageContainer"),c;const f=s(()=>{const u=(o.header.space===!0?o.header.size:0)+(o.footer.space===!0?o.footer.size:0);if(typeof t.styleFn=="function"){const g=o.isContainer.value===!0?o.containerHeight.value:n.screen.height;return t.styleFn(u,g)}return{minHeight:o.isContainer.value===!0?o.containerHeight.value-u+"px":n.screen.height===0?u!==0?`calc(100vh - ${u}px)`:"100vh":n.screen.height-u+"px"}}),r=s(()=>`q-page${t.padding===!0?" q-layout-padding":""}`);return()=>v("main",{class:r.value,style:f.value},x(l.default))}}),U="/assets/download.c998d3c6.png";const D=h("span",null,"v2.0.0",-1),E=h("div",{class:"row"},[h("div",{class:"col text-center"},[h("img",{alt:"Quasar logo",src:U,style:{height:"200px"}})])],-1),G={class:"row q-pt-md"},M={class:"col text-center"},Y={__name:"IndexPage",setup(t){const l=()=>{document.location.href="https://joss.jatpowerindo.co.id/welcome"};return(n,o)=>(I(),L(K,{class:"q-pa-md"},{default:y(()=>[_(J,{elevated:""},{default:y(()=>[_(A,null,{default:y(()=>[_(R,null,{default:y(()=>[N("JAT Integrated Online System")]),_:1}),D]),_:1})]),_:1}),E,h("div",G,[h("div",M,[_(j,{flat:"",color:"blue",label:"Continue To App",icon:"login",onClick:l})])])]),_:1}))}};export{Y as default};
