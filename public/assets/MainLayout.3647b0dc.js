import{c as k,i as W,e as x,p as M,a as u,h as d,d as j,g as T,l as B,f as A,w as L,o as N,j as V,n as K,k as U,m as G,q as I,r as J,s as h,t as X,u as $,v as z,x as Y,y as Z,_ as ee,z as te,A as oe,B as ne,C as ie,D as R,E as F}from"./index.dd036461.js";import{Q as H}from"./QResizeObserver.7eaca5cf.js";var ae=k({name:"QPageContainer",setup(e,{slots:g}){const{proxy:{$q:n}}=T(),o=W(B,x);if(o===x)return console.error("QPageContainer needs to be child of QLayout"),x;M(A,!0);const a=u(()=>{const l={};return o.header.space===!0&&(l.paddingTop=`${o.header.size}px`),o.right.space===!0&&(l[`padding${n.lang.rtl===!0?"Left":"Right"}`]=`${o.right.size}px`),o.footer.space===!0&&(l.paddingBottom=`${o.footer.size}px`),o.left.space===!0&&(l[`padding${n.lang.rtl===!0?"Right":"Left"}`]=`${o.left.size}px`),l});return()=>d("div",{class:"q-page-container",style:a.value},j(g.default))}});const{passive:E}=G,le=["both","horizontal","vertical"];var re=k({name:"QScrollObserver",props:{axis:{type:String,validator:e=>le.includes(e),default:"vertical"},debounce:[String,Number],scrollTarget:{default:void 0}},emits:["scroll"],setup(e,{emit:g}){const n={position:{top:0,left:0},direction:"down",directionChanged:!1,delta:{top:0,left:0},inflectionPoint:{top:0,left:0}};let o=null,a,l;L(()=>e.scrollTarget,()=>{f(),y()});function c(){o!==null&&o();const m=Math.max(0,I(a)),p=J(a),s={top:m-n.position.top,left:p-n.position.left};if(e.axis==="vertical"&&s.top===0||e.axis==="horizontal"&&s.left===0)return;const S=Math.abs(s.top)>=Math.abs(s.left)?s.top<0?"up":"down":s.left<0?"left":"right";n.position={top:m,left:p},n.directionChanged=n.direction!==S,n.delta=s,n.directionChanged===!0&&(n.direction=S,n.inflectionPoint=n.position),g("scroll",{...n})}function y(){a=U(l,e.scrollTarget),a.addEventListener("scroll",r,E),r(!0)}function f(){a!==void 0&&(a.removeEventListener("scroll",r,E),a=void 0)}function r(m){if(m===!0||e.debounce===0||e.debounce==="0")c();else if(o===null){const[p,s]=e.debounce?[setTimeout(c,e.debounce),clearTimeout]:[requestAnimationFrame(c),cancelAnimationFrame];o=()=>{s(p),o=null}}}const{proxy:w}=T();return L(()=>w.$q.lang.rtl,c),N(()=>{l=w.$el.parentNode,y()}),V(()=>{o!==null&&o(),f()}),Object.assign(w,{trigger:r,getPosition:()=>n}),K}}),se=k({name:"QLayout",props:{container:Boolean,view:{type:String,default:"hhh lpr fff",validator:e=>/^(h|l)h(h|r) lpr (f|l)f(f|r)$/.test(e.toLowerCase())},onScroll:Function,onScrollHeight:Function,onResize:Function},setup(e,{slots:g,emit:n}){const{proxy:{$q:o}}=T(),a=h(null),l=h(o.screen.height),c=h(e.container===!0?0:o.screen.width),y=h({position:0,direction:"down",inflectionPoint:0}),f=h(0),r=h(X.value===!0?0:$()),w=u(()=>"q-layout q-layout--"+(e.container===!0?"containerized":"standard")),m=u(()=>e.container===!1?{minHeight:o.screen.height+"px"}:null),p=u(()=>r.value!==0?{[o.lang.rtl===!0?"left":"right"]:`${r.value}px`}:null),s=u(()=>r.value!==0?{[o.lang.rtl===!0?"right":"left"]:0,[o.lang.rtl===!0?"left":"right"]:`-${r.value}px`,width:`calc(100% + ${r.value}px)`}:null);function S(t){if(e.container===!0||document.qScrollPrevented!==!0){const i={position:t.position.top,direction:t.direction,directionChanged:t.directionChanged,inflectionPoint:t.inflectionPoint.top,delta:t.delta.top};y.value=i,e.onScroll!==void 0&&n("scroll",i)}}function D(t){const{height:i,width:v}=t;let b=!1;l.value!==i&&(b=!0,l.value=i,e.onScrollHeight!==void 0&&n("scrollHeight",i),_()),c.value!==v&&(b=!0,c.value=v),b===!0&&e.onResize!==void 0&&n("resize",t)}function O({height:t}){f.value!==t&&(f.value=t,_())}function _(){if(e.container===!0){const t=l.value>f.value?$():0;r.value!==t&&(r.value=t)}}let q=null;const P={instances:{},view:u(()=>e.view),isContainer:u(()=>e.container),rootRef:a,height:l,containerHeight:f,scrollbarWidth:r,totalWidth:u(()=>c.value+r.value),rows:u(()=>{const t=e.view.toLowerCase().split(" ");return{top:t[0].split(""),middle:t[1].split(""),bottom:t[2].split("")}}),header:z({size:0,offset:0,space:!1}),right:z({size:300,offset:0,space:!1}),footer:z({size:0,offset:0,space:!1}),left:z({size:300,offset:0,space:!1}),scroll:y,animate(){q!==null?clearTimeout(q):document.body.classList.add("q-body--layout-animate"),q=setTimeout(()=>{q=null,document.body.classList.remove("q-body--layout-animate")},155)},update(t,i,v){P[t][i]=v}};if(M(B,P),$()>0){let v=function(){t=null,i.classList.remove("hide-scrollbar")},b=function(){if(t===null){if(i.scrollHeight>o.screen.height)return;i.classList.add("hide-scrollbar")}else clearTimeout(t);t=setTimeout(v,300)},C=function(Q){t!==null&&Q==="remove"&&(clearTimeout(t),v()),window[`${Q}EventListener`]("resize",b)},t=null;const i=document.body;L(()=>e.container!==!0?"add":"remove",C),e.container!==!0&&C("add"),Y(()=>{C("remove")})}return()=>{const t=Z(g.default,[d(re,{onScroll:S}),d(H,{onResize:D})]),i=d("div",{class:w.value,style:m.value,ref:e.container===!0?void 0:a,tabindex:-1},t);return e.container===!0?d("div",{class:"q-layout-container overflow-hidden",ref:a},[d(H,{onResize:O}),d("div",{class:"absolute-full",style:p.value},[d("div",{class:"scroll",style:s.value},[i])])]):i}}});const ce=[{title:"Docs",caption:"quasar.dev",icon:"school",link:"https://quasar.dev"},{title:"Github",caption:"github.com/quasarframework",icon:"code",link:"https://github.com/quasarframework"},{title:"Discord Chat Channel",caption:"chat.quasar.dev",icon:"chat",link:"https://chat.quasar.dev"},{title:"Forum",caption:"forum.quasar.dev",icon:"record_voice_over",link:"https://forum.quasar.dev"},{title:"Twitter",caption:"@quasarframework",icon:"rss_feed",link:"https://twitter.quasar.dev"},{title:"Facebook",caption:"@QuasarFramework",icon:"public",link:"https://facebook.quasar.dev"},{title:"Quasar Awesome",caption:"Community Quasar projects",icon:"favorite",link:"https://awesome.quasar.dev"}],ue=te({name:"MainLayout",components:{},setup(){const e=h(!1);return{essentialLinks:ce,leftDrawerOpen:e,toggleLeftDrawer(){e.value=!e.value}}}});function de(e,g,n,o,a,l){const c=oe("router-view");return ne(),ie(se,{view:"lHh Lpr lFf"},{default:R(()=>[F(ae,null,{default:R(()=>[F(c)]),_:1})]),_:1})}var he=ee(ue,[["render",de]]);export{he as default};
