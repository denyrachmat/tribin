import{c as q,h as I,a as J}from"./render.f4cb449e.js";import{i as Z,e as k,p as V,c as m,h as p,l as A,a as ee,g as T,w as _,o as C,d as E,n as K,f as P,r as g,j as U,k as F,m as S,q as te,_ as oe,s as ne,t as ie,u as re,v as le,x as W,y as D}from"./index.fa28521b.js";import{c as M,g as ae}from"./dom.6423a1f8.js";var se=q({name:"QPageContainer",setup(e,{slots:s}){const{proxy:{$q:o}}=T(),t=Z(A,k);if(t===k)return console.error("QPageContainer needs to be child of QLayout"),k;V(ee,!0);const l=m(()=>{const a={};return t.header.space===!0&&(a.paddingTop=`${t.header.size}px`),t.right.space===!0&&(a[`padding${o.lang.rtl===!0?"Left":"Right"}`]=`${t.right.size}px`),t.footer.space===!0&&(a.paddingBottom=`${t.footer.size}px`),t.left.space===!0&&(a[`padding${o.lang.rtl===!0?"Right":"Left"}`]=`${t.left.size}px`),a});return()=>p("div",{class:"q-page-container",style:l.value},I(s.default))}});const ce=[null,document,document.body,document.scrollingElement,document.documentElement];function ue(e,s){let o=ae(s);if(o===void 0){if(e==null)return window;o=e.closest(".scroll,.scroll-y,.overflow-auto")}return ce.includes(o)?window:o}function de(e){return e===window?window.pageYOffset||window.scrollY||document.body.scrollTop||0:e.scrollTop}function fe(e){return e===window?window.pageXOffset||window.scrollX||document.body.scrollLeft||0:e.scrollLeft}let L;function R(){if(L!==void 0)return L;const e=document.createElement("p"),s=document.createElement("div");M(e,{width:"100%",height:"200px"}),M(s,{position:"absolute",top:"0px",left:"0px",visibility:"hidden",width:"200px",height:"150px",overflow:"hidden"}),s.appendChild(e),document.body.appendChild(s);const o=e.offsetWidth;s.style.overflow="scroll";let t=e.offsetWidth;return o===t&&(t=s.clientWidth),s.remove(),L=o-t,L}const{passive:j}=P,ve=["both","horizontal","vertical"];var he=q({name:"QScrollObserver",props:{axis:{type:String,validator:e=>ve.includes(e),default:"vertical"},debounce:[String,Number],scrollTarget:{default:void 0}},emits:["scroll"],setup(e,{emit:s}){const o={position:{top:0,left:0},direction:"down",directionChanged:!1,delta:{top:0,left:0},inflectionPoint:{top:0,left:0}};let t=null,l,a;_(()=>e.scrollTarget,()=>{r(),v()});function c(){t!==null&&t();const h=Math.max(0,de(l)),b=fe(l),d={top:h-o.position.top,left:b-o.position.left};if(e.axis==="vertical"&&d.top===0||e.axis==="horizontal"&&d.left===0)return;const z=Math.abs(d.top)>=Math.abs(d.left)?d.top<0?"up":"down":d.left<0?"left":"right";o.position={top:h,left:b},o.directionChanged=o.direction!==z,o.delta=d,o.directionChanged===!0&&(o.direction=z,o.inflectionPoint=o.position),s("scroll",{...o})}function v(){l=ue(a,e.scrollTarget),l.addEventListener("scroll",i,j),i(!0)}function r(){l!==void 0&&(l.removeEventListener("scroll",i,j),l=void 0)}function i(h){if(h===!0||e.debounce===0||e.debounce==="0")c();else if(t===null){const[b,d]=e.debounce?[setTimeout(c,e.debounce),clearTimeout]:[requestAnimationFrame(c),cancelAnimationFrame];t=()=>{d(b),t=null}}}const{proxy:f}=T();return _(()=>f.$q.lang.rtl,c),C(()=>{a=f.$el.parentNode,v()}),E(()=>{t!==null&&t(),r()}),Object.assign(f,{trigger:i,getPosition:()=>o}),K}});function me(){const e=g(!U.value);return e.value===!1&&C(()=>{e.value=!0}),e}const X=typeof ResizeObserver!="undefined",B=X===!0?{}:{style:"display:block;position:absolute;top:0;left:0;right:0;bottom:0;height:100%;width:100%;overflow:hidden;pointer-events:none;z-index:-1;",url:"about:blank"};var N=q({name:"QResizeObserver",props:{debounce:{type:[String,Number],default:100}},emits:["resize"],setup(e,{emit:s}){let o=null,t,l={width:-1,height:-1};function a(r){r===!0||e.debounce===0||e.debounce==="0"?c():o===null&&(o=setTimeout(c,e.debounce))}function c(){if(o!==null&&(clearTimeout(o),o=null),t){const{offsetWidth:r,offsetHeight:i}=t;(r!==l.width||i!==l.height)&&(l={width:r,height:i},s("resize",l))}}const{proxy:v}=T();if(v.trigger=a,X===!0){let r;const i=f=>{t=v.$el.parentNode,t?(r=new ResizeObserver(a),r.observe(t),c()):f!==!0&&F(()=>{i(!0)})};return C(()=>{i()}),E(()=>{o!==null&&clearTimeout(o),r!==void 0&&(r.disconnect!==void 0?r.disconnect():t&&r.unobserve(t))}),K}else{let f=function(){o!==null&&(clearTimeout(o),o=null),i!==void 0&&(i.removeEventListener!==void 0&&i.removeEventListener("resize",a,P.passive),i=void 0)},h=function(){f(),t&&t.contentDocument&&(i=t.contentDocument.defaultView,i.addEventListener("resize",a,P.passive),c())};const r=me();let i;return C(()=>{F(()=>{t=v.$el,t&&h()})}),E(f),()=>{if(r.value===!0)return p("object",{style:B.style,tabindex:-1,type:"text/html",data:B.url,"aria-hidden":"true",onLoad:h})}}}}),pe=q({name:"QLayout",props:{container:Boolean,view:{type:String,default:"hhh lpr fff",validator:e=>/^(h|l)h(h|r) lpr (f|l)f(f|r)$/.test(e.toLowerCase())},onScroll:Function,onScrollHeight:Function,onResize:Function},setup(e,{slots:s,emit:o}){const{proxy:{$q:t}}=T(),l=g(null),a=g(t.screen.height),c=g(e.container===!0?0:t.screen.width),v=g({position:0,direction:"down",inflectionPoint:0}),r=g(0),i=g(U.value===!0?0:R()),f=m(()=>"q-layout q-layout--"+(e.container===!0?"containerized":"standard")),h=m(()=>e.container===!1?{minHeight:t.screen.height+"px"}:null),b=m(()=>i.value!==0?{[t.lang.rtl===!0?"left":"right"]:`${i.value}px`}:null),d=m(()=>i.value!==0?{[t.lang.rtl===!0?"right":"left"]:0,[t.lang.rtl===!0?"left":"right"]:`-${i.value}px`,width:`calc(100% + ${i.value}px)`}:null);function z(n){if(e.container===!0||document.qScrollPrevented!==!0){const u={position:n.position.top,direction:n.direction,directionChanged:n.directionChanged,inflectionPoint:n.inflectionPoint.top,delta:n.delta.top};v.value=u,e.onScroll!==void 0&&o("scroll",u)}}function Y(n){const{height:u,width:w}=n;let y=!1;a.value!==u&&(y=!0,a.value=u,e.onScrollHeight!==void 0&&o("scrollHeight",u),O()),c.value!==w&&(y=!0,c.value=w),y===!0&&e.onResize!==void 0&&o("resize",n)}function G({height:n}){r.value!==n&&(r.value=n,O())}function O(){if(e.container===!0){const n=a.value>r.value?R():0;i.value!==n&&(i.value=n)}}let x=null;const Q={instances:{},view:m(()=>e.view),isContainer:m(()=>e.container),rootRef:l,height:a,containerHeight:r,scrollbarWidth:i,totalWidth:m(()=>c.value+i.value),rows:m(()=>{const n=e.view.toLowerCase().split(" ");return{top:n[0].split(""),middle:n[1].split(""),bottom:n[2].split("")}}),header:S({size:0,offset:0,space:!1}),right:S({size:300,offset:0,space:!1}),footer:S({size:0,offset:0,space:!1}),left:S({size:300,offset:0,space:!1}),scroll:v,animate(){x!==null?clearTimeout(x):document.body.classList.add("q-body--layout-animate"),x=setTimeout(()=>{x=null,document.body.classList.remove("q-body--layout-animate")},155)},update(n,u,w){Q[n][u]=w}};if(V(A,Q),R()>0){let w=function(){n=null,u.classList.remove("hide-scrollbar")},y=function(){if(n===null){if(u.scrollHeight>t.screen.height)return;u.classList.add("hide-scrollbar")}else clearTimeout(n);n=setTimeout(w,300)},$=function(H){n!==null&&H==="remove"&&(clearTimeout(n),w()),window[`${H}EventListener`]("resize",y)},n=null;const u=document.body;_(()=>e.container!==!0?"add":"remove",$),e.container!==!0&&$("add"),te(()=>{$("remove")})}return()=>{const n=J(s.default,[p(he,{onScroll:z}),p(N,{onResize:Y})]),u=p("div",{class:f.value,style:h.value,ref:e.container===!0?void 0:l,tabindex:-1},n);return e.container===!0?p("div",{class:"q-layout-container overflow-hidden",ref:l},[p(N,{onResize:G}),p("div",{class:"absolute-full",style:b.value},[p("div",{class:"scroll",style:d.value},[u])])]):u}}});const ge=[{title:"Docs",caption:"quasar.dev",icon:"school",link:"https://quasar.dev"},{title:"Github",caption:"github.com/quasarframework",icon:"code",link:"https://github.com/quasarframework"},{title:"Discord Chat Channel",caption:"chat.quasar.dev",icon:"chat",link:"https://chat.quasar.dev"},{title:"Forum",caption:"forum.quasar.dev",icon:"record_voice_over",link:"https://forum.quasar.dev"},{title:"Twitter",caption:"@quasarframework",icon:"rss_feed",link:"https://twitter.quasar.dev"},{title:"Facebook",caption:"@QuasarFramework",icon:"public",link:"https://facebook.quasar.dev"},{title:"Quasar Awesome",caption:"Community Quasar projects",icon:"favorite",link:"https://awesome.quasar.dev"}],we=ne({name:"MainLayout",components:{},setup(){const e=g(!1);return{essentialLinks:ge,leftDrawerOpen:e,toggleLeftDrawer(){e.value=!e.value}}}});function be(e,s,o,t,l,a){const c=ie("router-view");return re(),le(pe,{view:"lHh Lpr lFf"},{default:W(()=>[D(se,null,{default:W(()=>[D(c)]),_:1})]),_:1})}var Se=oe(we,[["render",be]]);export{Se as default};
