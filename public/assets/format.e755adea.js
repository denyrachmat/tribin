import{aN as pe,t as P,ah as be,aB as Y,G as we,aa as G,w as C,o as Te,j as D,g as ue,a9 as Ee,m as K,aO as _,aP as Se,v as Ce,i as He,aQ as ke,c as Me,a1 as We,ad as Pe,a2 as Be,s as qe,a3 as Ae,a as S,af as Le,a4 as ze,a5 as Re,a6 as $e,a7 as Fe,a8 as Ke,aR as je,aS as De,aT as Oe,aU as J,k as Qe,aV as Ie,h as Z,d as Ve,ab as Ne,aW as Ue,aX as Xe,aY as Ye,ac as Ge}from"./index.ba8005f9.js";function _e(){if(window.getSelection!==void 0){const e=window.getSelection();e.empty!==void 0?e.empty():e.removeAllRanges!==void 0&&(e.removeAllRanges(),pe.is.mobile!==!0&&e.addRange(document.createRange()))}else document.selection!==void 0&&document.selection.empty()}const Je={target:{type:[Boolean,String,Element],default:!0},noParentEvent:Boolean},Ze={...Je,contextMenu:Boolean};function et({showing:e,avoidEmit:t,configureAnchorEl:o}){const{props:n,proxy:l,emit:c}=ue(),i=P(null);let f=null;function h(a){return i.value===null?!1:a===void 0||a.touches===void 0||a.touches.length<=1}const r={};o===void 0&&(Object.assign(r,{hide(a){l.hide(a)},toggle(a){l.toggle(a),a.qAnchorHandled=!0},toggleKey(a){be(a,13)===!0&&r.toggle(a)},contextClick(a){l.hide(a),Y(a),we(()=>{l.show(a),a.qAnchorHandled=!0})},prevent:Y,mobileTouch(a){if(r.mobileCleanup(a),h(a)!==!0)return;l.hide(a),i.value.classList.add("non-selectable");const s=a.target;G(r,"anchor",[[s,"touchmove","mobileCleanup","passive"],[s,"touchend","mobileCleanup","passive"],[s,"touchcancel","mobileCleanup","passive"],[i.value,"contextmenu","prevent","notPassive"]]),f=setTimeout(()=>{f=null,l.show(a),a.qAnchorHandled=!0},300)},mobileCleanup(a){i.value.classList.remove("non-selectable"),f!==null&&(clearTimeout(f),f=null),e.value===!0&&a!==void 0&&_e()}}),o=function(a=n.contextMenu){if(n.noParentEvent===!0||i.value===null)return;let s;a===!0?l.$q.platform.is.mobile===!0?s=[[i.value,"touchstart","mobileTouch","passive"]]:s=[[i.value,"mousedown","hide","passive"],[i.value,"contextmenu","contextClick","notPassive"]]:s=[[i.value,"click","toggle","passive"],[i.value,"keyup","toggleKey","passive"]],G(r,"anchor",s)});function d(){Ee(r,"anchor")}function g(a){for(i.value=a;i.value.classList.contains("q-anchor--skip");)i.value=i.value.parentNode;o()}function x(){if(n.target===!1||n.target===""||l.$el.parentNode===null)i.value=null;else if(n.target===!0)g(l.$el.parentNode);else{let a=n.target;if(typeof n.target=="string")try{a=document.querySelector(n.target)}catch{a=void 0}a!=null?(i.value=a.$el||a,o()):(i.value=null,console.error(`Anchor: target "${n.target}" not found`))}}return C(()=>n.contextMenu,a=>{i.value!==null&&(d(),o(a))}),C(()=>n.target,()=>{i.value!==null&&d(),x()}),C(()=>n.noParentEvent,a=>{i.value!==null&&(a===!0?d():o())}),Te(()=>{x(),t!==!0&&n.modelValue===!0&&i.value===null&&c("update:modelValue",!1)}),D(()=>{f!==null&&clearTimeout(f),d()}),{anchorEl:i,canShow:h,anchorEvents:r}}function tt(e,t){const o=P(null);let n;function l(f,h){const r=`${h!==void 0?"add":"remove"}EventListener`,d=h!==void 0?h:n;f!==window&&f[r]("scroll",d,K.passive),window[r]("scroll",d,K.passive),n=h}function c(){o.value!==null&&(l(o.value),o.value=null)}const i=C(()=>e.noParentEvent,()=>{o.value!==null&&(c(),t())});return D(i),{localScrollTarget:o,unconfigureScrollTarget:c,changeScrollEvent:l}}const{notPassiveCapture:B}=K,T=[];function q(e){const t=e.target;if(t===void 0||t.nodeType===8||t.classList.contains("no-pointer-events")===!0)return;let o=_.length-1;for(;o>=0;){const n=_[o].$;if(n.type.name==="QTooltip"){o--;continue}if(n.type.name!=="QDialog")break;if(n.props.seamless!==!0)return;o--}for(let n=T.length-1;n>=0;n--){const l=T[n];if((l.anchorEl.value===null||l.anchorEl.value.contains(t)===!1)&&(t===document.body||l.innerRef.value!==null&&l.innerRef.value.contains(t)===!1))e.qClickOutside=!0,l.onClickOutside(e);else return}}function nt(e){T.push(e),T.length===1&&(document.addEventListener("mousedown",q,B),document.addEventListener("touchstart",q,B))}function ee(e){const t=T.findIndex(o=>o===e);t!==-1&&(T.splice(t,1),T.length===0&&(document.removeEventListener("mousedown",q,B),document.removeEventListener("touchstart",q,B)))}let te,ne;function oe(e){const t=e.split(" ");return t.length!==2?!1:["top","center","bottom"].includes(t[0])!==!0?(console.error("Anchor/Self position must start with one of top/center/bottom"),!1):["left","middle","right","start","end"].includes(t[1])!==!0?(console.error("Anchor/Self position must end with one of left/middle/right/start/end"),!1):!0}function ot(e){return e?!(e.length!==2||typeof e[0]!="number"||typeof e[1]!="number"):!0}const j={"start#ltr":"left","start#rtl":"right","end#ltr":"right","end#rtl":"left"};["left","middle","right"].forEach(e=>{j[`${e}#ltr`]=e,j[`${e}#rtl`]=e});function le(e,t){const o=e.split(" ");return{vertical:o[0],horizontal:j[`${o[1]}#${t===!0?"rtl":"ltr"}`]}}function lt(e,t){let{top:o,left:n,right:l,bottom:c,width:i,height:f}=e.getBoundingClientRect();return t!==void 0&&(o-=t[1],n-=t[0],c+=t[1],l+=t[0],i+=t[0],f+=t[1]),{top:o,bottom:c,height:f,left:n,right:l,width:i,middle:n+(l-n)/2,center:o+(c-o)/2}}function it(e,t,o){let{top:n,left:l}=e.getBoundingClientRect();return n+=t.top,l+=t.left,o!==void 0&&(n+=o[1],l+=o[0]),{top:n,bottom:n+1,height:1,left:l,right:l+1,width:1,middle:l,center:n}}function at(e,t){return{top:0,center:t/2,bottom:t,left:0,middle:e/2,right:e}}function ie(e,t,o,n){return{top:e[o.vertical]-t[n.vertical],left:e[o.horizontal]-t[n.horizontal]}}function se(e,t=0){if(e.targetEl===null||e.anchorEl===null||t>5)return;if(e.targetEl.offsetHeight===0||e.targetEl.offsetWidth===0){setTimeout(()=>{se(e,t+1)},10);return}const{targetEl:o,offset:n,anchorEl:l,anchorOrigin:c,selfOrigin:i,absoluteOffset:f,fit:h,cover:r,maxHeight:d,maxWidth:g}=e;if(Se.is.ios===!0&&window.visualViewport!==void 0){const E=document.body.style,{offsetLeft:y,offsetTop:p}=window.visualViewport;y!==te&&(E.setProperty("--q-pe-left",y+"px"),te=y),p!==ne&&(E.setProperty("--q-pe-top",p+"px"),ne=p)}const{scrollLeft:x,scrollTop:a}=o,s=f===void 0?lt(l,r===!0?[0,0]:n):it(l,f,n);Object.assign(o.style,{top:0,left:0,minWidth:null,minHeight:null,maxWidth:g||"100vw",maxHeight:d||"100vh",visibility:"visible"});const{offsetWidth:M,offsetHeight:H}=o,{elWidth:W,elHeight:A}=h===!0||r===!0?{elWidth:Math.max(s.width,M),elHeight:r===!0?Math.max(s.height,H):H}:{elWidth:M,elHeight:H};let v={maxWidth:g,maxHeight:d};(h===!0||r===!0)&&(v.minWidth=s.width+"px",r===!0&&(v.minHeight=s.height+"px")),Object.assign(o.style,v);const b=at(W,A);let m=ie(s,b,c,i);if(f===void 0||n===void 0)F(m,s,b,c,i);else{const{top:E,left:y}=m;F(m,s,b,c,i);let p=!1;if(m.top!==E){p=!0;const w=2*n[1];s.center=s.top-=w,s.bottom-=w+2}if(m.left!==y){p=!0;const w=2*n[0];s.middle=s.left-=w,s.right-=w+2}p===!0&&(m=ie(s,b,c,i),F(m,s,b,c,i))}v={top:m.top+"px",left:m.left+"px"},m.maxHeight!==void 0&&(v.maxHeight=m.maxHeight+"px",s.height>m.maxHeight&&(v.minHeight=v.maxHeight)),m.maxWidth!==void 0&&(v.maxWidth=m.maxWidth+"px",s.width>m.maxWidth&&(v.minWidth=v.maxWidth)),Object.assign(o.style,v),o.scrollTop!==a&&(o.scrollTop=a),o.scrollLeft!==x&&(o.scrollLeft=x)}function F(e,t,o,n,l){const c=o.bottom,i=o.right,f=Ce(),h=window.innerHeight-f,r=document.body.clientWidth;if(e.top<0||e.top+c>h)if(l.vertical==="center")e.top=t[n.vertical]>h/2?Math.max(0,h-c):0,e.maxHeight=Math.min(c,h);else if(t[n.vertical]>h/2){const d=Math.min(h,n.vertical==="center"?t.center:n.vertical===l.vertical?t.bottom:t.top);e.maxHeight=Math.min(c,d),e.top=Math.max(0,d-c)}else e.top=Math.max(0,n.vertical==="center"?t.center:n.vertical===l.vertical?t.top:t.bottom),e.maxHeight=Math.min(c,h-e.top);if(e.left<0||e.left+i>r)if(e.maxWidth=Math.min(i,r),l.horizontal==="middle")e.left=t[n.horizontal]>r/2?Math.max(0,r-i):0;else if(t[n.horizontal]>r/2){const d=Math.min(r,n.horizontal==="middle"?t.middle:n.horizontal===l.horizontal?t.right:t.left);e.maxWidth=Math.min(i,d),e.left=Math.max(0,d-e.maxWidth)}else e.left=Math.max(0,n.horizontal==="middle"?t.middle:n.horizontal===l.horizontal?t.left:t.right),e.maxWidth=Math.min(i,r-e.left)}function st(){return He(ke)}var rt=Me({name:"QMenu",inheritAttrs:!1,props:{...Ze,...We,...Pe,...Be,persistent:Boolean,autoClose:Boolean,separateClosePopup:Boolean,noRouteDismiss:Boolean,noRefocus:Boolean,noFocus:Boolean,fit:Boolean,cover:Boolean,square:Boolean,anchor:{type:String,validator:oe},self:{type:String,validator:oe},offset:{type:Array,validator:ot},scrollTarget:qe,touchPosition:Boolean,maxHeight:{type:String,default:null},maxWidth:{type:String,default:null}},emits:[...Ae,"click","escapeKey"],setup(e,{slots:t,emit:o,attrs:n}){let l=null,c,i,f;const h=ue(),{proxy:r}=h,{$q:d}=r,g=P(null),x=P(!1),a=S(()=>e.persistent!==!0&&e.noRouteDismiss!==!0),s=Le(e,d),{registerTick:M,removeTick:H}=ze(),{registerTimeout:W}=Re(),{transitionProps:A,transitionStyle:v}=$e(e),{localScrollTarget:b,changeScrollEvent:m,unconfigureScrollTarget:E}=tt(e,U),{anchorEl:y,canShow:p}=et({showing:x}),{hide:w}=Fe({showing:x,canShow:p,handleShow:he,handleHide:me,hideOnRouteChange:a,processOnMount:!0}),{showPortal:O,hidePortal:Q,renderPortal:re}=Ke(h,g,ge,"menu"),L={anchorEl:y,innerRef:g,onClickOutside(u){if(e.persistent!==!0&&x.value===!0)return w(u),(u.type==="touchstart"||u.target.classList.contains("q-dialog__backdrop"))&&Ge(u),!0}},I=S(()=>le(e.anchor||(e.cover===!0?"center middle":"bottom start"),d.lang.rtl)),ce=S(()=>e.cover===!0?I.value:le(e.self||"top start",d.lang.rtl)),de=S(()=>(e.square===!0?" q-menu--square":"")+(s.value===!0?" q-menu--dark q-dark":"")),fe=S(()=>e.autoClose===!0?{onClick:ve}:{}),V=S(()=>x.value===!0&&e.persistent!==!0);C(V,u=>{u===!0?(Ue(R),nt(L)):(J(R),ee(L))});function z(){Xe(()=>{let u=g.value;u&&u.contains(document.activeElement)!==!0&&(u=u.querySelector("[autofocus][tabindex], [data-autofocus][tabindex]")||u.querySelector("[autofocus] [tabindex], [data-autofocus] [tabindex]")||u.querySelector("[autofocus], [data-autofocus]")||u,u.focus({preventScroll:!0}))})}function he(u){if(l=e.noRefocus===!1?document.activeElement:null,je(X),O(),U(),c=void 0,u!==void 0&&(e.touchPosition||e.contextMenu)){const $=De(u);if($.left!==void 0){const{top:xe,left:ye}=y.value.getBoundingClientRect();c={left:$.left-ye,top:$.top-xe}}}i===void 0&&(i=C(()=>d.screen.width+"|"+d.screen.height+"|"+e.self+"|"+e.anchor+"|"+d.lang.rtl,k)),e.noFocus!==!0&&document.activeElement.blur(),M(()=>{k(),e.noFocus!==!0&&z()}),W(()=>{d.platform.is.ios===!0&&(f=e.autoClose,g.value.click()),k(),O(!0),o("show",u)},e.transitionDuration)}function me(u){H(),Q(),N(!0),l!==null&&(u===void 0||u.qClickOutside!==!0)&&(((u&&u.type.indexOf("key")===0?l.closest('[tabindex]:not([tabindex^="-"])'):void 0)||l).focus(),l=null),W(()=>{Q(!0),o("hide",u)},e.transitionDuration)}function N(u){c=void 0,i!==void 0&&(i(),i=void 0),(u===!0||x.value===!0)&&(Oe(X),E(),ee(L),J(R)),u!==!0&&(l=null)}function U(){(y.value!==null||e.scrollTarget!==void 0)&&(b.value=Qe(y.value,e.scrollTarget),m(b.value,k))}function ve(u){f!==!0?(Ie(r,u),o("click",u)):f=!1}function X(u){V.value===!0&&e.noFocus!==!0&&Ye(g.value,u.target)!==!0&&z()}function R(u){o("escapeKey"),w(u)}function k(){se({targetEl:g.value,offset:e.offset,anchorEl:y.value,anchorOrigin:I.value,selfOrigin:ce.value,absoluteOffset:c,fit:e.fit,cover:e.cover,maxHeight:e.maxHeight,maxWidth:e.maxWidth})}function ge(){return Z(Ne,A.value,()=>x.value===!0?Z("div",{role:"menu",...n,ref:g,tabindex:-1,class:["q-menu q-position-engine scroll"+de.value,n.class],style:[n.style,v.value],...fe.value},Ve(t.default)):null)}return D(N),Object.assign(r,{focus:z,updatePosition:k}),re}});const ae=["B","KB","MB","GB","TB","PB"];function ct(e,t=1){let o=0;for(;parseInt(e,10)>=1024&&o<ae.length-1;)e/=1024,++o;return`${e.toFixed(t)}${ae[o]}`}function dt(e){return e.charAt(0).toUpperCase()+e.slice(1)}function ft(e,t,o){return o<=t?t:Math.min(o,Math.max(t,e))}function ht(e,t,o){if(o<=t)return t;const n=o-t+1;let l=t+(e-t)%n;return l<t&&(l=n+l),l===0?0:l}function mt(e,t=2,o="0"){if(e==null)return e;const n=""+e;return n.length>=t?n:new Array(t-n.length+1).join(o)+n}export{rt as Q,Je as a,ot as b,tt as c,et as d,_e as e,nt as f,mt as g,Ze as h,dt as i,ft as j,ct as k,ht as n,le as p,ee as r,se as s,st as u,oe as v};
