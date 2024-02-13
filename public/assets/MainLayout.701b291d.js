import{c as q,i as I,e as $,p as W,a as h,h as g,d as J,g as C,l as N,f as X,w as R,o as L,j as _,n as V,k as Y,m as P,q as Z,r as ee,s as p,t as A,u as H,v as k,x,y as te,z as ne,_ as oe,A as ie,B as re,C as le,D as ae,E as O,F as D}from"./index.6c0550ac.js";var se=q({name:"QPageContainer",setup(e,{slots:m}){const{proxy:{$q:n}}=C(),t=I(N,$);if(t===$)return console.error("QPageContainer needs to be child of QLayout"),$;W(X,!0);const l=h(()=>{const a={};return t.header.space===!0&&(a.paddingTop=`${t.header.size}px`),t.right.space===!0&&(a[`padding${n.lang.rtl===!0?"Left":"Right"}`]=`${t.right.size}px`),t.footer.space===!0&&(a.paddingBottom=`${t.footer.size}px`),t.left.space===!0&&(a[`padding${n.lang.rtl===!0?"Right":"Left"}`]=`${t.left.size}px`),a});return()=>g("div",{class:"q-page-container",style:l.value},J(m.default))}});const{passive:M}=P,ce=["both","horizontal","vertical"];var ue=q({name:"QScrollObserver",props:{axis:{type:String,validator:e=>ce.includes(e),default:"vertical"},debounce:[String,Number],scrollTarget:{default:void 0}},emits:["scroll"],setup(e,{emit:m}){const n={position:{top:0,left:0},direction:"down",directionChanged:!1,delta:{top:0,left:0},inflectionPoint:{top:0,left:0}};let t=null,l,a;R(()=>e.scrollTarget,()=>{r(),f()});function s(){t!==null&&t();const v=Math.max(0,Z(l)),y=ee(l),u={top:v-n.position.top,left:y-n.position.left};if(e.axis==="vertical"&&u.top===0||e.axis==="horizontal"&&u.left===0)return;const z=Math.abs(u.top)>=Math.abs(u.left)?u.top<0?"up":"down":u.left<0?"left":"right";n.position={top:v,left:y},n.directionChanged=n.direction!==z,n.delta=u,n.directionChanged===!0&&(n.direction=z,n.inflectionPoint=n.position),m("scroll",{...n})}function f(){l=Y(a,e.scrollTarget),l.addEventListener("scroll",i,M),i(!0)}function r(){l!==void 0&&(l.removeEventListener("scroll",i,M),l=void 0)}function i(v){if(v===!0||e.debounce===0||e.debounce==="0")s();else if(t===null){const[y,u]=e.debounce?[setTimeout(s,e.debounce),clearTimeout]:[requestAnimationFrame(s),cancelAnimationFrame];t=()=>{u(y),t=null}}}const{proxy:d}=C();return R(()=>d.$q.lang.rtl,s),L(()=>{a=d.$el.parentNode,f()}),_(()=>{t!==null&&t(),r()}),Object.assign(d,{trigger:i,getPosition:()=>n}),V}});function de(){const e=p(!A.value);return e.value===!1&&L(()=>{e.value=!0}),e}const K=typeof ResizeObserver!="undefined",j=K===!0?{}:{style:"display:block;position:absolute;top:0;left:0;right:0;bottom:0;height:100%;width:100%;overflow:hidden;pointer-events:none;z-index:-1;",url:"about:blank"};var B=q({name:"QResizeObserver",props:{debounce:{type:[String,Number],default:100}},emits:["resize"],setup(e,{emit:m}){let n=null,t,l={width:-1,height:-1};function a(r){r===!0||e.debounce===0||e.debounce==="0"?s():n===null&&(n=setTimeout(s,e.debounce))}function s(){if(n!==null&&(clearTimeout(n),n=null),t){const{offsetWidth:r,offsetHeight:i}=t;(r!==l.width||i!==l.height)&&(l={width:r,height:i},m("resize",l))}}const{proxy:f}=C();if(f.trigger=a,K===!0){let r;const i=d=>{t=f.$el.parentNode,t?(r=new ResizeObserver(a),r.observe(t),s()):d!==!0&&H(()=>{i(!0)})};return L(()=>{i()}),_(()=>{n!==null&&clearTimeout(n),r!==void 0&&(r.disconnect!==void 0?r.disconnect():t&&r.unobserve(t))}),V}else{let d=function(){n!==null&&(clearTimeout(n),n=null),i!==void 0&&(i.removeEventListener!==void 0&&i.removeEventListener("resize",a,P.passive),i=void 0)},v=function(){d(),t&&t.contentDocument&&(i=t.contentDocument.defaultView,i.addEventListener("resize",a,P.passive),s())};const r=de();let i;return L(()=>{H(()=>{t=f.$el,t&&v()})}),_(d),()=>{if(r.value===!0)return g("object",{style:j.style,tabindex:-1,type:"text/html",data:j.url,"aria-hidden":"true",onLoad:v})}}}}),fe=q({name:"QLayout",props:{container:Boolean,view:{type:String,default:"hhh lpr fff",validator:e=>/^(h|l)h(h|r) lpr (f|l)f(f|r)$/.test(e.toLowerCase())},onScroll:Function,onScrollHeight:Function,onResize:Function},setup(e,{slots:m,emit:n}){const{proxy:{$q:t}}=C(),l=p(null),a=p(t.screen.height),s=p(e.container===!0?0:t.screen.width),f=p({position:0,direction:"down",inflectionPoint:0}),r=p(0),i=p(A.value===!0?0:k()),d=h(()=>"q-layout q-layout--"+(e.container===!0?"containerized":"standard")),v=h(()=>e.container===!1?{minHeight:t.screen.height+"px"}:null),y=h(()=>i.value!==0?{[t.lang.rtl===!0?"left":"right"]:`${i.value}px`}:null),u=h(()=>i.value!==0?{[t.lang.rtl===!0?"right":"left"]:0,[t.lang.rtl===!0?"left":"right"]:`-${i.value}px`,width:`calc(100% + ${i.value}px)`}:null);function z(o){if(e.container===!0||document.qScrollPrevented!==!0){const c={position:o.position.top,direction:o.direction,directionChanged:o.directionChanged,inflectionPoint:o.inflectionPoint.top,delta:o.delta.top};f.value=c,e.onScroll!==void 0&&n("scroll",c)}}function U(o){const{height:c,width:b}=o;let w=!1;a.value!==c&&(w=!0,a.value=c,e.onScrollHeight!==void 0&&n("scrollHeight",c),Q()),s.value!==b&&(w=!0,s.value=b),w===!0&&e.onResize!==void 0&&n("resize",o)}function G({height:o}){r.value!==o&&(r.value=o,Q())}function Q(){if(e.container===!0){const o=a.value>r.value?k():0;i.value!==o&&(i.value=o)}}let S=null;const E={instances:{},view:h(()=>e.view),isContainer:h(()=>e.container),rootRef:l,height:a,containerHeight:r,scrollbarWidth:i,totalWidth:h(()=>s.value+i.value),rows:h(()=>{const o=e.view.toLowerCase().split(" ");return{top:o[0].split(""),middle:o[1].split(""),bottom:o[2].split("")}}),header:x({size:0,offset:0,space:!1}),right:x({size:300,offset:0,space:!1}),footer:x({size:0,offset:0,space:!1}),left:x({size:300,offset:0,space:!1}),scroll:f,animate(){S!==null?clearTimeout(S):document.body.classList.add("q-body--layout-animate"),S=setTimeout(()=>{S=null,document.body.classList.remove("q-body--layout-animate")},155)},update(o,c,b){E[o][c]=b}};if(W(N,E),k()>0){let b=function(){o=null,c.classList.remove("hide-scrollbar")},w=function(){if(o===null){if(c.scrollHeight>t.screen.height)return;c.classList.add("hide-scrollbar")}else clearTimeout(o);o=setTimeout(b,300)},T=function(F){o!==null&&F==="remove"&&(clearTimeout(o),b()),window[`${F}EventListener`]("resize",w)},o=null;const c=document.body;R(()=>e.container!==!0?"add":"remove",T),e.container!==!0&&T("add"),te(()=>{T("remove")})}return()=>{const o=ne(m.default,[g(ue,{onScroll:z}),g(B,{onResize:U})]),c=g("div",{class:d.value,style:v.value,ref:e.container===!0?void 0:l,tabindex:-1},o);return e.container===!0?g("div",{class:"q-layout-container overflow-hidden",ref:l},[g(B,{onResize:G}),g("div",{class:"absolute-full",style:y.value},[g("div",{class:"scroll",style:u.value},[c])])]):c}}});const ve=[{title:"Docs",caption:"quasar.dev",icon:"school",link:"https://quasar.dev"},{title:"Github",caption:"github.com/quasarframework",icon:"code",link:"https://github.com/quasarframework"},{title:"Discord Chat Channel",caption:"chat.quasar.dev",icon:"chat",link:"https://chat.quasar.dev"},{title:"Forum",caption:"forum.quasar.dev",icon:"record_voice_over",link:"https://forum.quasar.dev"},{title:"Twitter",caption:"@quasarframework",icon:"rss_feed",link:"https://twitter.quasar.dev"},{title:"Facebook",caption:"@QuasarFramework",icon:"public",link:"https://facebook.quasar.dev"},{title:"Quasar Awesome",caption:"Community Quasar projects",icon:"favorite",link:"https://awesome.quasar.dev"}],he=ie({name:"MainLayout",components:{},setup(){const e=p(!1);return{essentialLinks:ve,leftDrawerOpen:e,toggleLeftDrawer(){e.value=!e.value}}}});function ge(e,m,n,t,l,a){const s=re("router-view");return le(),ae(fe,{view:"lHh Lpr lFf"},{default:O(()=>[D(se,null,{default:O(()=>[D(s)]),_:1})]),_:1})}var pe=oe(he,[["render",ge]]);export{pe as default};
