import{i as Pt,e as Ie,s as P,a as I,j as rt,o as ce,b4 as it,a_ as Me,ap as Ue,h as M,a3 as fe,a5 as At,aI as wt,aa as oe,y as kt,g as Ce,aD as qt,b5 as Dt,c as ye,W as Be,X as Xe,w as ve,p as St,af as Ot,ag as Rt,d as Pe,aU as It,a8 as de,n as Bt,b6 as $t,a1 as he,b7 as $e,at as Ze,a0 as xe,F as xt,a2 as Mt,b8 as Ut,b9 as Qt,ab as Et,ac as Nt,an as Lt,B as x,C as Y,D as i,E as a,J as pe,K as J,S as Qe,I as w,P as ae,b0 as Vt,R as K,aY as te,aZ as me,b1 as Ht,H as W,a$ as L,M as le,L as Ee,Q as F,O as Ne,ba as jt}from"./index.7c676021.js";import{w as zt,i as Ft,u as Le,b as Ae,a as we,Q as et,m as tt,n as se,o as ue,c as st,q as Kt}from"./use-dialog-plugin-component.6770dcf1.js";import{u as Wt,d as ut,Q as at,b as Jt}from"./date.dbb53663.js";import{api_web as ne}from"./axios.66c24412.js";import{Q as Gt}from"./QResizeObserver.e0ec6342.js";let Yt=0;const Xt=["click","keydown"],Zt={icon:String,label:[Number,String],alert:[Boolean,String],alertIcon:String,name:{type:[Number,String],default:()=>`t_${Yt++}`},noCaps:Boolean,tabindex:[String,Number],disable:Boolean,contentClass:String,ripple:{type:[Boolean,Object],default:!0}};function ea(e,n,g,h){const r=Pt(it,Ie);if(r===Ie)return console.error("QTab/QRouteTab component needs to be child of QTabs"),Ie;const{proxy:t}=Ce(),o=P(null),v=P(null),R=P(null),k=I(()=>e.disable===!0||e.ripple===!1?!1:Object.assign({keyCodes:[13,32],early:!0},e.ripple===!0?{}:e.ripple)),c=I(()=>r.currentModel.value===e.name),s=I(()=>"q-tab relative-position self-stretch flex flex-center text-center"+(c.value===!0?" q-tab--active"+(r.tabProps.value.activeClass?" "+r.tabProps.value.activeClass:"")+(r.tabProps.value.activeColor?` text-${r.tabProps.value.activeColor}`:"")+(r.tabProps.value.activeBgColor?` bg-${r.tabProps.value.activeBgColor}`:""):" q-tab--inactive")+(e.icon&&e.label&&r.tabProps.value.inlineLabel===!1?" q-tab--full":"")+(e.noCaps===!0||r.tabProps.value.noCaps===!0?" q-tab--no-caps":"")+(e.disable===!0?" disabled":" q-focusable q-hoverable cursor-pointer")+(h!==void 0?h.linkClass.value:"")),p=I(()=>"q-tab__content self-stretch flex-center relative-position q-anchor--skip non-selectable "+(r.tabProps.value.inlineLabel===!0?"row no-wrap q-tab__content--inline":"column")+(e.contentClass!==void 0?` ${e.contentClass}`:"")),m=I(()=>e.disable===!0||r.hasFocus.value===!0||c.value===!1&&r.hasActiveTab.value===!0?-1:e.tabindex||0);function S(b,Q){if(Q!==!0&&o.value!==null&&o.value.focus(),e.disable===!0){h!==void 0&&h.hasRouterLink.value===!0&&fe(b);return}if(h===void 0){r.updateModel({name:e.name}),g("click",b);return}if(h.hasRouterLink.value===!0){const V=(U={})=>{let E;const j=U.to===void 0||qt(U.to,e.to)===!0?r.avoidRouteWatcher=Dt():null;return h.navigateToRouterLink(b,{...U,returnRouterError:!0}).catch(z=>{E=z}).then(z=>{if(j===r.avoidRouteWatcher&&(r.avoidRouteWatcher=!1,E===void 0&&(z===void 0||z.message!==void 0&&z.message.startsWith("Avoided redundant navigation")===!0)&&r.updateModel({name:e.name})),U.returnRouterError===!0)return E!==void 0?Promise.reject(E):z})};g("click",b,V),b.defaultPrevented!==!0&&V();return}g("click",b)}function C(b){At(b,[13,32])?S(b,!0):wt(b)!==!0&&b.keyCode>=35&&b.keyCode<=40&&b.altKey!==!0&&b.metaKey!==!0&&r.onKbdNavigate(b.keyCode,t.$el)===!0&&fe(b),g("keydown",b)}function d(){const b=r.tabProps.value.narrowIndicator,Q=[],V=M("div",{ref:R,class:["q-tab__indicator",r.tabProps.value.indicatorClass]});e.icon!==void 0&&Q.push(M(oe,{class:"q-tab__icon",name:e.icon})),e.label!==void 0&&Q.push(M("div",{class:"q-tab__label"},e.label)),e.alert!==!1&&Q.push(e.alertIcon!==void 0?M(oe,{class:"q-tab__alert-icon",color:e.alert!==!0?e.alert:void 0,name:e.alertIcon}):M("div",{class:"q-tab__alert"+(e.alert!==!0?` text-${e.alert}`:"")})),b===!0&&Q.push(V);const U=[M("div",{class:"q-focus-helper",tabindex:-1,ref:o}),M("div",{class:p.value},kt(n.default,Q))];return b===!1&&U.push(V),U}const f={name:I(()=>e.name),rootRef:v,tabIndicatorRef:R,routeData:h};rt(()=>{r.unregisterTab(f)}),ce(()=>{r.registerTab(f)});function A(b,Q){const V={ref:v,class:s.value,tabindex:m.value,role:"tab","aria-selected":c.value===!0?"true":"false","aria-disabled":e.disable===!0?"true":void 0,onClick:S,onKeydown:C,...Q};return Me(M(b,V,d()),[[Ue,k.value]])}return{renderTab:A,$tabs:r}}var _e=ye({name:"QTab",props:Zt,emits:Xt,setup(e,{slots:n,emit:g}){const{renderTab:h}=ea(e,n,g);return()=>h("div")}});function ta(e,n,g){const h=g===!0?["left","right"]:["top","bottom"];return`absolute-${n===!0?h[0]:h[1]}${e?` text-${e}`:""}`}const aa=["left","center","right","justify"];var ct=ye({name:"QTabs",props:{modelValue:[Number,String],align:{type:String,default:"center",validator:e=>aa.includes(e)},breakpoint:{type:[String,Number],default:600},vertical:Boolean,shrink:Boolean,stretch:Boolean,activeClass:String,activeColor:String,activeBgColor:String,indicatorColor:String,leftIcon:String,rightIcon:String,outsideArrows:Boolean,mobileArrows:Boolean,switchIndicator:Boolean,narrowIndicator:Boolean,inlineLabel:Boolean,noCaps:Boolean,dense:Boolean,contentClass:String,"onUpdate:modelValue":[Function,Array]},setup(e,{slots:n,emit:g}){const{proxy:h}=Ce(),{$q:r}=h,{registerTick:t}=Be(),{registerTick:o}=Be(),{registerTick:v}=Be(),{registerTimeout:R,removeTimeout:k}=Xe(),{registerTimeout:c,removeTimeout:s}=Xe(),p=P(null),m=P(null),S=P(e.modelValue),C=P(!1),d=P(!0),f=P(!1),A=P(!1),b=[],Q=P(0),V=P(!1);let U=null,E=null,j;const z=I(()=>({activeClass:e.activeClass,activeColor:e.activeColor,activeBgColor:e.activeBgColor,indicatorClass:ta(e.indicatorColor,e.switchIndicator,e.vertical),narrowIndicator:e.narrowIndicator,inlineLabel:e.inlineLabel,noCaps:e.noCaps})),ke=I(()=>{const l=Q.value,u=S.value;for(let _=0;_<l;_++)if(b[_].name.value===u)return!0;return!1}),qe=I(()=>`q-tabs__content--align-${C.value===!0?"left":A.value===!0?"justify":e.align}`),De=I(()=>`q-tabs row no-wrap items-center q-tabs--${C.value===!0?"":"not-"}scrollable q-tabs--${e.vertical===!0?"vertical":"horizontal"} q-tabs__arrows--${e.outsideArrows===!0?"outside":"inside"} q-tabs--mobile-with${e.mobileArrows===!0?"":"out"}-arrows`+(e.dense===!0?" q-tabs--dense":"")+(e.shrink===!0?" col-shrink":"")+(e.stretch===!0?" self-stretch":"")),T=I(()=>"q-tabs__content scroll--mobile row no-wrap items-center self-stretch hide-scrollbar relative-position "+qe.value+(e.contentClass!==void 0?` ${e.contentClass}`:"")),O=I(()=>e.vertical===!0?{container:"height",content:"offsetHeight",scroll:"scrollHeight"}:{container:"width",content:"offsetWidth",scroll:"scrollWidth"}),H=I(()=>e.vertical!==!0&&r.lang.rtl===!0),X=I(()=>zt===!1&&H.value===!0);ve(H,ie),ve(()=>e.modelValue,l=>{Se({name:l,setCurrent:!0,skipEmit:!0})}),ve(()=>e.outsideArrows,be);function Se({name:l,setCurrent:u,skipEmit:_}){S.value!==l&&(_!==!0&&e["onUpdate:modelValue"]!==void 0&&g("update:modelValue",l),(u===!0||e["onUpdate:modelValue"]===void 0)&&(vt(S.value,l),S.value=l))}function be(){t(()=>{He({width:p.value.offsetWidth,height:p.value.offsetHeight})})}function He(l){if(O.value===void 0||m.value===null)return;const u=l[O.value.container],_=Math.min(m.value[O.value.scroll],Array.prototype.reduce.call(m.value.children,($,D)=>$+(D[O.value.content]||0),0)),B=u>0&&_>u;C.value=B,B===!0&&o(ie),A.value=u<parseInt(e.breakpoint,10)}function vt(l,u){const _=l!=null&&l!==""?b.find($=>$.name.value===l):null,B=u!=null&&u!==""?b.find($=>$.name.value===u):null;if(_&&B){const $=_.tabIndicatorRef.value,D=B.tabIndicatorRef.value;U!==null&&(clearTimeout(U),U=null),$.style.transition="none",$.style.transform="none",D.style.transition="none",D.style.transform="none";const y=$.getBoundingClientRect(),N=D.getBoundingClientRect();D.style.transform=e.vertical===!0?`translate3d(0,${y.top-N.top}px,0) scale3d(1,${N.height?y.height/N.height:1},1)`:`translate3d(${y.left-N.left}px,0,0) scale3d(${N.width?y.width/N.width:1},1,1)`,v(()=>{U=setTimeout(()=>{U=null,D.style.transition="transform .25s cubic-bezier(.4, 0, .2, 1)",D.style.transform="none"},70)})}B&&C.value===!0&&re(B.rootRef.value)}function re(l){const{left:u,width:_,top:B,height:$}=m.value.getBoundingClientRect(),D=l.getBoundingClientRect();let y=e.vertical===!0?D.top-B:D.left-u;if(y<0){m.value[e.vertical===!0?"scrollTop":"scrollLeft"]+=Math.floor(y),ie();return}y+=e.vertical===!0?D.height-$:D.width-_,y>0&&(m.value[e.vertical===!0?"scrollTop":"scrollLeft"]+=Math.ceil(y),ie())}function ie(){const l=m.value;if(l===null)return;const u=l.getBoundingClientRect(),_=e.vertical===!0?l.scrollTop:Math.abs(l.scrollLeft);H.value===!0?(d.value=Math.ceil(_+u.width)<l.scrollWidth-1,f.value=_>0):(d.value=_>0,f.value=e.vertical===!0?Math.ceil(_+u.height)<l.scrollHeight:Math.ceil(_+u.width)<l.scrollWidth)}function je(l){E!==null&&clearInterval(E),E=setInterval(()=>{pt(l)===!0&&Z()},5)}function ze(){je(X.value===!0?Number.MAX_SAFE_INTEGER:0)}function Fe(){je(X.value===!0?0:Number.MAX_SAFE_INTEGER)}function Z(){E!==null&&(clearInterval(E),E=null)}function ft(l,u){const _=Array.prototype.filter.call(m.value.children,N=>N===u||N.matches&&N.matches(".q-tab.q-focusable")===!0),B=_.length;if(B===0)return;if(l===36)return re(_[0]),_[0].focus(),!0;if(l===35)return re(_[B-1]),_[B-1].focus(),!0;const $=l===(e.vertical===!0?38:37),D=l===(e.vertical===!0?40:39),y=$===!0?-1:D===!0?1:void 0;if(y!==void 0){const N=H.value===!0?-1:1,G=_.indexOf(u)+y*N;return G>=0&&G<B&&(re(_[G]),_[G].focus({preventScroll:!0})),!0}}const mt=I(()=>X.value===!0?{get:l=>Math.abs(l.scrollLeft),set:(l,u)=>{l.scrollLeft=-u}}:e.vertical===!0?{get:l=>l.scrollTop,set:(l,u)=>{l.scrollTop=u}}:{get:l=>l.scrollLeft,set:(l,u)=>{l.scrollLeft=u}});function pt(l){const u=m.value,{get:_,set:B}=mt.value;let $=!1,D=_(u);const y=l<D?-1:1;return D+=y*5,D<0?($=!0,D=0):(y===-1&&D<=l||y===1&&D>=l)&&($=!0,D=l),B(u,D),ie(),$}function Ke(l,u){for(const _ in l)if(l[_]!==u[_])return!1;return!0}function bt(){let l=null,u={matchedLen:0,queryDiff:9999,hrefLen:0};const _=b.filter(y=>y.routeData!==void 0&&y.routeData.hasRouterLink.value===!0),{hash:B,query:$}=h.$route,D=Object.keys($).length;for(const y of _){const N=y.routeData.exact.value===!0;if(y.routeData[N===!0?"linkIsExactActive":"linkIsActive"].value!==!0)continue;const{hash:G,query:Oe,matched:Ct,href:yt}=y.routeData.resolvedLink.value,Re=Object.keys(Oe).length;if(N===!0){if(G!==B||Re!==D||Ke($,Oe)===!1)continue;l=y.name.value;break}if(G!==""&&G!==B||Re!==0&&Ke(Oe,$)===!1)continue;const ee={matchedLen:Ct.length,queryDiff:D-Re,hrefLen:yt.length-G.length};if(ee.matchedLen>u.matchedLen){l=y.name.value,u=ee;continue}else if(ee.matchedLen!==u.matchedLen)continue;if(ee.queryDiff<u.queryDiff)l=y.name.value,u=ee;else if(ee.queryDiff!==u.queryDiff)continue;ee.hrefLen>u.hrefLen&&(l=y.name.value,u=ee)}l===null&&b.some(y=>y.routeData===void 0&&y.name.value===S.value)===!0||Se({name:l,setCurrent:!0})}function gt(l){if(k(),V.value!==!0&&p.value!==null&&l.target&&typeof l.target.closest=="function"){const u=l.target.closest(".q-tab");u&&p.value.contains(u)===!0&&(V.value=!0,C.value===!0&&re(u))}}function ht(){R(()=>{V.value=!1},30)}function ge(){Je.avoidRouteWatcher===!1?c(bt):s()}function We(){if(j===void 0){const l=ve(()=>h.$route.fullPath,ge);j=()=>{l(),j=void 0}}}function _t(l){b.push(l),Q.value++,be(),l.routeData===void 0||h.$route===void 0?c(()=>{if(C.value===!0){const u=S.value,_=u!=null&&u!==""?b.find(B=>B.name.value===u):null;_&&re(_.rootRef.value)}}):(We(),l.routeData.hasRouterLink.value===!0&&ge())}function Tt(l){b.splice(b.indexOf(l),1),Q.value--,be(),j!==void 0&&l.routeData!==void 0&&(b.every(u=>u.routeData===void 0)===!0&&j(),ge())}const Je={currentModel:S,tabProps:z,hasFocus:V,hasActiveTab:ke,registerTab:_t,unregisterTab:Tt,verifyRouteModel:ge,updateModel:Se,onKbdNavigate:ft,avoidRouteWatcher:!1};St(it,Je);function Ge(){U!==null&&clearTimeout(U),Z(),j!==void 0&&j()}let Ye;return rt(Ge),Ot(()=>{Ye=j!==void 0,Ge()}),Rt(()=>{Ye===!0&&We(),be()}),()=>M("div",{ref:p,class:De.value,role:"tablist",onFocusin:gt,onFocusout:ht},[M(Gt,{onResize:He}),M("div",{ref:m,class:T.value,onScroll:ie},Pe(n.default)),M(oe,{class:"q-tabs__arrow q-tabs__arrow--left absolute q-tab__icon"+(d.value===!0?"":" q-tabs__arrow--faded"),name:e.leftIcon||r.iconSet.tabs[e.vertical===!0?"up":"left"],onMousedownPassive:ze,onTouchstartPassive:ze,onMouseupPassive:Z,onMouseleavePassive:Z,onTouchendPassive:Z}),M(oe,{class:"q-tabs__arrow q-tabs__arrow--right absolute q-tab__icon"+(f.value===!0?"":" q-tabs__arrow--faded"),name:e.rightIcon||r.iconSet.tabs[e.vertical===!0?"down":"right"],onMousedownPassive:Fe,onTouchstartPassive:Fe,onMouseupPassive:Z,onMouseleavePassive:Z,onTouchendPassive:Z})])}});const Ve={left:!0,right:!0,up:!0,down:!0,horizontal:!0,vertical:!0},la=Object.keys(Ve);Ve.all=!0;function lt(e){const n={};for(const g of la)e[g]===!0&&(n[g]=!0);return Object.keys(n).length===0?Ve:(n.horizontal===!0?n.left=n.right=!0:n.left===!0&&n.right===!0&&(n.horizontal=!0),n.vertical===!0?n.up=n.down=!0:n.up===!0&&n.down===!0&&(n.vertical=!0),n.horizontal===!0&&n.vertical===!0&&(n.all=!0),n)}const na=["INPUT","TEXTAREA"];function nt(e,n){return n.event===void 0&&e.target!==void 0&&e.target.draggable!==!0&&typeof n.handler=="function"&&na.includes(e.target.nodeName.toUpperCase())===!1&&(e.qClonedBy===void 0||e.qClonedBy.indexOf(n.uid)===-1)}function oa(e){const n=[.06,6,50];return typeof e=="string"&&e.length&&e.split(":").forEach((g,h)=>{const r=parseFloat(g);r&&(n[h]=r)}),n}var ra=It({name:"touch-swipe",beforeMount(e,{value:n,arg:g,modifiers:h}){if(h.mouse!==!0&&de.has.touch!==!0)return;const r=h.mouseCapture===!0?"Capture":"",t={handler:n,sensitivity:oa(g),direction:lt(h),noop:Bt,mouseStart(o){nt(o,t)&&$t(o)&&(he(t,"temp",[[document,"mousemove","move",`notPassive${r}`],[document,"mouseup","end","notPassiveCapture"]]),t.start(o,!0))},touchStart(o){if(nt(o,t)){const v=o.target;he(t,"temp",[[v,"touchmove","move","notPassiveCapture"],[v,"touchcancel","end","notPassiveCapture"],[v,"touchend","end","notPassiveCapture"]]),t.start(o)}},start(o,v){de.is.firefox===!0&&$e(e,!0);const R=Ze(o);t.event={x:R.left,y:R.top,time:Date.now(),mouse:v===!0,dir:!1}},move(o){if(t.event===void 0)return;if(t.event.dir!==!1){fe(o);return}const v=Date.now()-t.event.time;if(v===0)return;const R=Ze(o),k=R.left-t.event.x,c=Math.abs(k),s=R.top-t.event.y,p=Math.abs(s);if(t.event.mouse!==!0){if(c<t.sensitivity[1]&&p<t.sensitivity[1]){t.end(o);return}}else if(window.getSelection().toString()!==""){t.end(o);return}else if(c<t.sensitivity[2]&&p<t.sensitivity[2])return;const m=c/v,S=p/v;t.direction.vertical===!0&&c<p&&c<100&&S>t.sensitivity[0]&&(t.event.dir=s<0?"up":"down"),t.direction.horizontal===!0&&c>p&&p<100&&m>t.sensitivity[0]&&(t.event.dir=k<0?"left":"right"),t.direction.up===!0&&c<p&&s<0&&c<100&&S>t.sensitivity[0]&&(t.event.dir="up"),t.direction.down===!0&&c<p&&s>0&&c<100&&S>t.sensitivity[0]&&(t.event.dir="down"),t.direction.left===!0&&c>p&&k<0&&p<100&&m>t.sensitivity[0]&&(t.event.dir="left"),t.direction.right===!0&&c>p&&k>0&&p<100&&m>t.sensitivity[0]&&(t.event.dir="right"),t.event.dir!==!1?(fe(o),t.event.mouse===!0&&(document.body.classList.add("no-pointer-events--children"),document.body.classList.add("non-selectable"),Ft(),t.styleCleanup=C=>{t.styleCleanup=void 0,document.body.classList.remove("non-selectable");const d=()=>{document.body.classList.remove("no-pointer-events--children")};C===!0?setTimeout(d,50):d()}),t.handler({evt:o,touch:t.event.mouse!==!0,mouse:t.event.mouse,direction:t.event.dir,duration:v,distance:{x:c,y:p}})):t.end(o)},end(o){t.event!==void 0&&(xe(t,"temp"),de.is.firefox===!0&&$e(e,!1),t.styleCleanup!==void 0&&t.styleCleanup(!0),o!==void 0&&t.event.dir!==!1&&fe(o),t.event=void 0)}};if(e.__qtouchswipe=t,h.mouse===!0){const o=h.mouseCapture===!0||h.mousecapture===!0?"Capture":"";he(t,"main",[[e,"mousedown","mouseStart",`passive${o}`]])}de.has.touch===!0&&he(t,"main",[[e,"touchstart","touchStart",`passive${h.capture===!0?"Capture":""}`],[e,"touchmove","noop","notPassiveCapture"]])},updated(e,n){const g=e.__qtouchswipe;g!==void 0&&(n.oldValue!==n.value&&(typeof n.value!="function"&&g.end(),g.handler=n.value),g.direction=lt(n.modifiers))},beforeUnmount(e){const n=e.__qtouchswipe;n!==void 0&&(xe(n,"main"),xe(n,"temp"),de.is.firefox===!0&&$e(e,!1),n.styleCleanup!==void 0&&n.styleCleanup(),delete e.__qtouchswipe)}});const ia={name:{required:!0},disable:Boolean},ot={setup(e,{slots:n}){return()=>M("div",{class:"q-panel scroll",role:"tabpanel"},Pe(n.default))}},sa={modelValue:{required:!0},animated:Boolean,infinite:Boolean,swipeable:Boolean,vertical:Boolean,transitionPrev:String,transitionNext:String,transitionDuration:{type:[String,Number],default:300},keepAlive:Boolean,keepAliveInclude:[String,Array,RegExp],keepAliveExclude:[String,Array,RegExp],keepAliveMax:Number},ua=["update:modelValue","beforeTransition","transition"];function ca(){const{props:e,emit:n,proxy:g}=Ce(),{getCacheWithFn:h}=Wt();let r,t;const o=P(null),v=P(null);function R(T){const O=e.vertical===!0?"up":"left";E((g.$q.lang.rtl===!0?-1:1)*(T.direction===O?1:-1))}const k=I(()=>[[ra,R,void 0,{horizontal:e.vertical!==!0,vertical:e.vertical,mouse:!0}]]),c=I(()=>e.transitionPrev||`slide-${e.vertical===!0?"down":"right"}`),s=I(()=>e.transitionNext||`slide-${e.vertical===!0?"up":"left"}`),p=I(()=>`--q-transition-duration: ${e.transitionDuration}ms`),m=I(()=>typeof e.modelValue=="string"||typeof e.modelValue=="number"?e.modelValue:String(e.modelValue)),S=I(()=>({include:e.keepAliveInclude,exclude:e.keepAliveExclude,max:e.keepAliveMax})),C=I(()=>e.keepAliveInclude!==void 0||e.keepAliveExclude!==void 0);ve(()=>e.modelValue,(T,O)=>{const H=b(T)===!0?Q(T):-1;t!==!0&&U(H===-1?0:H<Q(O)?-1:1),o.value!==H&&(o.value=H,n("beforeTransition",T,O),xt(()=>{n("transition",T,O)}))});function d(){E(1)}function f(){E(-1)}function A(T){n("update:modelValue",T)}function b(T){return T!=null&&T!==""}function Q(T){return r.findIndex(O=>O.props.name===T&&O.props.disable!==""&&O.props.disable!==!0)}function V(){return r.filter(T=>T.props.disable!==""&&T.props.disable!==!0)}function U(T){const O=T!==0&&e.animated===!0&&o.value!==-1?"q-transition--"+(T===-1?c.value:s.value):null;v.value!==O&&(v.value=O)}function E(T,O=o.value){let H=O+T;for(;H>-1&&H<r.length;){const X=r[H];if(X!==void 0&&X.props.disable!==""&&X.props.disable!==!0){U(T),t=!0,n("update:modelValue",X.props.name),setTimeout(()=>{t=!1});return}H+=T}e.infinite===!0&&r.length!==0&&O!==-1&&O!==r.length&&E(T,T===-1?r.length:-1)}function j(){const T=Q(e.modelValue);return o.value!==T&&(o.value=T),!0}function z(){const T=b(e.modelValue)===!0&&j()&&r[o.value];return e.keepAlive===!0?[M(Qt,S.value,[M(C.value===!0?h(m.value,()=>({...ot,name:m.value})):ot,{key:m.value,style:p.value},()=>T)])]:[M("div",{class:"q-panel scroll",style:p.value,key:m.value,role:"tabpanel"},[T])]}function ke(){if(r.length!==0)return e.animated===!0?[M(Mt,{name:v.value},z)]:z()}function qe(T){return r=Ut(Pe(T.default,[])).filter(O=>O.props!==null&&O.props.slot===void 0&&b(O.props.name)===!0),r.length}function De(){return r}return Object.assign(g,{next:d,previous:f,goTo:A}),{panelIndex:o,panelDirectives:k,updatePanelsList:qe,updatePanelIndex:j,getPanelContent:ke,getEnabledPanels:V,getPanels:De,isValidPanelName:b,keepAliveProps:S,needsUniqueKeepAliveWrapper:C,goToPanelByOffset:E,goToPanel:A,nextPanel:d,previousPanel:f}}var Te=ye({name:"QTabPanel",props:ia,setup(e,{slots:n}){return()=>M("div",{class:"q-tab-panel",role:"tabpanel"},Pe(n.default))}}),dt=ye({name:"QTabPanels",props:{...sa,...Et},emits:ua,setup(e,{slots:n}){const g=Ce(),h=Nt(e,g.proxy.$q),{updatePanelsList:r,getPanelContent:t,panelDirectives:o}=ca(),v=I(()=>"q-tab-panels q-panel-parent"+(h.value===!0?" q-tab-panels--dark q-dark":""));return()=>(r(n),Lt("div",{class:v.value},t(),"pan",e.swipeable,()=>o.value))}});const da=w("div",{class:"text-h6"},"Quotation Review",-1),va={class:"row q-py-md"},fa={class:"col"},ma={class:"col q-pl-md"},pa={class:"row q-pb-md"},ba={class:"col"},ga={__name:"viewListApprovalItem",props:{dataHeader:Array,cd:String,typeCD:String},setup(e){const{dialogRef:n,onDialogHide:g,onDialogOK:h,onDialogCancel:r}=Le(),t=Ae(),o=e;ce(()=>{s.value=o.dataHeader});const v=P(!1),R=P([{name:"MITM_ITMNM",label:"Item Name",field:"MITM_ITMNM",sortable:!0,align:"left"},{name:"TQUODETA_USAGE_DESCRIPTION",label:"Usage",field:"TQUODETA_USAGE_DESCRIPTION",sortable:!0,align:"left"},{name:"TQUODETA_PRC",label:"Price",field:"TQUODETA_PRC",sortable:!0,align:"left",format:d=>d.toLocaleString()},{name:"TQUODETA_OPRPRC",label:"Operator",field:"TQUODETA_OPRPRC",sortable:!0,align:"left",format:d=>d.toLocaleString()},{name:"TQUODETA_MOBDEMOB",label:"MOB DEMOB",field:"TQUODETA_MOBDEMOB",sortable:!0,align:"left",format:d=>d.toLocaleString()},{name:"SUBTOT",label:"SUBTOTAL",sortable:!0,field:d=>d.TQUODETA_PRC+d.TQUODETA_OPRPRC+d.TQUODETA_MOBDEMOB,align:"left",format:d=>d.toLocaleString()}]),k=P([]),c=P("items"),s=P({MCUS_CUSNM:"",TQUO_ATTN:"",TQUO_SBJCT:""});ce(()=>{p()});const p=async()=>{v.value=!0,await ne.get(`${o.typeCD}/${btoa(o.cd)}`).then(d=>{v.value=!1,k.value=d.data}).catch(d=>{v.value=!1})},m=()=>{q.dialog({title:"Confirm",message:"Are you sure want to Approve this quotation ?",cancel:!0,persistent:!0}).onOk(async d=>{v.value=!0,await ne.put(`approve/quotations/${btoa(o.cd)}`,{TQUO_BRANCH:o.dataHeader.TQUO_BRANCH}).then(f=>{v.value=!1,p()}).catch(f=>{v.value=!1})})},S=()=>{t.dialog({title:"Confirm",message:"Are you sure want to Reject this quotation ?",cancel:!0,persistent:!0}).onOk(async d=>{t.dialog({title:"Prompt",message:"Input reject reason.",prompt:{model:"",isValid:f=>f.length>2,type:"text"},cancel:!0,persistent:!0}).onOk(async f=>{v.value=!0,await ne.put(`revise/quotations/${btoa(o.cd)}`,{remark:f,TQUO_BRANCH:o.dataHeader.TQUO_BRANCH}).then(A=>{v.value=!1,p()}).catch(A=>{v.value=!1})})})},C=()=>{window.open("https://joss.jatpowerindo.co.id/PDF/quotation/"+btoa(o.cd),"_blank").focus()};return(d,f)=>(x(),Y(Ne,{ref_key:"dialogRef",ref:n,onHide:le(g),"transition-show":"slide-up","transition-hide":"slide-down","full-width":"",persistent:""},{default:i(()=>[a(pe,{class:"q-dialog-plugin bg-white q-pa-sm"},{default:i(()=>[a(J,null,{default:i(()=>[da]),_:1}),a(J,{class:"q-pa-sm",style:{height:"70vh",overflow:"auto"}},{default:i(()=>[a(ct,{modelValue:c.value,"onUpdate:modelValue":f[0]||(f[0]=A=>c.value=A),dense:"",class:"text-grey","active-color":"primary","indicator-color":"primary",align:"justify","narrow-indicator":""},{default:i(()=>[a(_e,{name:"items",label:"Items"}),a(_e,{name:"conditions",label:"Conditions"}),a(_e,{name:"histCond",label:"Approval History"})]),_:1},8,["modelValue"]),a(Qe),a(dt,{modelValue:c.value,"onUpdate:modelValue":f[4]||(f[4]=A=>c.value=A),animated:""},{default:i(()=>[a(Te,{name:"items"},{default:i(()=>[w("div",va,[w("div",fa,[a(ae,{dense:"",filled:"",label:"Customer Name",modelValue:s.value.APP_CUSNM,"onUpdate:modelValue":f[1]||(f[1]=A=>s.value.APP_CUSNM=A),readonly:""},null,8,["modelValue"])]),w("div",ma,[a(ae,{dense:"",filled:"",label:"Attn.",modelValue:s.value.APP_ATTN,"onUpdate:modelValue":f[2]||(f[2]=A=>s.value.APP_ATTN=A),readonly:""},null,8,["modelValue"])])]),w("div",pa,[w("div",ba,[a(ae,{dense:"",filled:"",label:"Subject",modelValue:s.value.APP_SBJCT,"onUpdate:modelValue":f[3]||(f[3]=A=>s.value.APP_SBJCT=A),readonly:""},null,8,["modelValue"])])]),o.typeCD=="quotation"?(x(),Y(we,{key:0,title:"Item List",rows:k.value.dataItem,columns:R.value,"row-key":"name",dense:"",loading:v.value},null,8,["rows","columns","loading"])):Vt("",!0)]),_:1}),a(Te,{name:"conditions"},{default:i(()=>[a(et,{bordered:"",dense:""},{default:i(()=>[(x(!0),K(te,null,me(k.value.dataCondition,(A,b)=>Me((x(),Y(tt,{clickable:"",key:b},{default:i(()=>[a(se,{avatar:""},{default:i(()=>[a(Ht,{color:"primary","text-color":"white",size:"sm"},{default:i(()=>[W(L(b+1),1)]),_:2},1024)]),_:2},1024),a(se,null,{default:i(()=>[W(L(A.TQUOCOND_CONDI),1)]),_:2},1024)]),_:2},1024)),[[Ue]])),128))]),_:1})]),_:1}),a(Te,{name:"histCond"},{default:i(()=>[a(et,{bordered:"",separator:""},{default:i(()=>[(x(!0),K(te,null,me(k.value.approvalHistories,(A,b)=>Me((x(),Y(tt,{clickable:"",key:b},{default:i(()=>[a(se,null,{default:i(()=>[a(ue,null,{default:i(()=>[W(L(le(ut).formatDate(A.created_at,"DD MMM YYYY HH:mm")),1)]),_:2},1024),a(ue,{caption:""},{default:i(()=>[W("Time")]),_:1})]),_:2},1024),a(se,null,{default:i(()=>[a(ue,null,{default:i(()=>[W(L(A.type==2?"Rejected":"Approved"),1)]),_:2},1024),a(ue,{caption:""},{default:i(()=>[W("Status")]),_:1})]),_:2},1024),a(se,null,{default:i(()=>[a(ue,null,{default:i(()=>[W(L(A.remark),1)]),_:2},1024),a(ue,{caption:""},{default:i(()=>[W("Remarks")]),_:1})]),_:2},1024),a(se,{side:""},{default:i(()=>[a(oe,{name:A.type==2?"cancel":"check_circle",color:A.type==2?"red":"green"},null,8,["name","color"])]),_:2},1024)]),_:2},1024)),[[Ue]])),128))]),_:1})]),_:1})]),_:1},8,["modelValue"])]),_:1}),a(Ee,{align:"center"},{default:i(()=>[a(st,null,{default:i(()=>[a(F,{color:"primary",icon:"print",disable:k.value.length===0,onClick:f[5]||(f[5]=A=>C()),flat:""},null,8,["disable"]),a(F,{color:"primary",icon:"check",label:"Approve",disable:k.value.length===0,onClick:f[6]||(f[6]=A=>m())},null,8,["disable"]),a(F,{color:"red",icon:"cancel",label:"Reject",disable:k.value.length===0,onClick:f[7]||(f[7]=A=>S())},null,8,["disable"]),a(F,{color:"orange",flat:"",label:"cancel",onClick:le(r)},null,8,["onClick"])]),_:1})]),_:1})]),_:1})]),_:1},8,["onHide"]))}},ha=w("div",{class:"text-h6"},"Quotation Review",-1),_a={class:"row q-py-md"},Ta={class:"col"},Ca={class:"col q-pl-md"},ya={class:"row q-pb-md"},Pa={class:"col"},Aa={__name:"viewListPRItem",props:{dataHeader:Array,cd:String,typeCD:String},setup(e){const{dialogRef:n,onDialogHide:g,onDialogOK:h,onDialogCancel:r}=Le(),t=Ae(),o=e;ce(()=>{s.value=o.dataHeader});const v=P(!1),R=P([{name:"MITM_ITMNM",label:"Item Name",field:"MITM_ITMNM",sortable:!0,align:"left"},{name:"TQUODETA_USAGE_DESCRIPTION",label:"Usage",field:"TQUODETA_USAGE_DESCRIPTION",sortable:!0,align:"left"},{name:"TQUODETA_PRC",label:"Price",field:"TQUODETA_PRC",sortable:!0,align:"left",format:C=>C.toLocaleString()},{name:"TQUODETA_OPRPRC",label:"Operator",field:"TQUODETA_OPRPRC",sortable:!0,align:"left",format:C=>C.toLocaleString()},{name:"TQUODETA_MOBDEMOB",label:"MOB DEMOB",field:"TQUODETA_MOBDEMOB",sortable:!0,align:"left",format:C=>C.toLocaleString()},{name:"SUBTOT",label:"SUBTOTAL",sortable:!0,field:C=>C.TQUODETA_PRC+C.TQUODETA_OPRPRC+C.TQUODETA_MOBDEMOB,align:"left",format:C=>C.toLocaleString()}]),k=P([]),c=P("items"),s=P({MCUS_CUSNM:"",TQUO_ATTN:"",TQUO_SBJCT:""});ce(()=>{p()});const p=async()=>{v.value=!0,await ne.get(`${o.typeCD}/${btoa(o.cd)}?TPCHREQDETA_BRANCH=${o.dataHeader.TQUO_BRANCH}`).then(C=>{v.value=!1,k.value=C.data}).catch(C=>{v.value=!1})},m=()=>{q.dialog({title:"Confirm",message:"Are you sure want to Approve this quotation ?",cancel:!0,persistent:!0}).onOk(async C=>{v.value=!0,await ne.put(`approve/quotations/${btoa(o.cd)}`,{TQUO_BRANCH:o.dataHeader.TQUO_BRANCH}).then(d=>{v.value=!1,p()}).catch(d=>{v.value=!1})})},S=()=>{t.dialog({title:"Confirm",message:"Are you sure want to Reject this quotation ?",cancel:!0,persistent:!0}).onOk(async C=>{t.dialog({title:"Prompt",message:"Input reject reason.",prompt:{model:"",isValid:d=>d.length>2,type:"text"},cancel:!0,persistent:!0}).onOk(async d=>{v.value=!0,await ne.put(`revise/quotations/${btoa(o.cd)}`,{remark:d,TQUO_BRANCH:o.dataHeader.TQUO_BRANCH}).then(f=>{v.value=!1,p()}).catch(f=>{v.value=!1})})})};return(C,d)=>(x(),Y(Ne,{ref_key:"dialogRef",ref:n,onHide:le(g),"transition-show":"slide-up","transition-hide":"slide-down","full-width":"",persistent:""},{default:i(()=>[a(pe,{class:"q-dialog-plugin bg-white q-pa-sm"},{default:i(()=>[a(J,null,{default:i(()=>[ha]),_:1}),a(J,{class:"q-pa-sm",style:{height:"70vh",overflow:"auto"}},{default:i(()=>[a(ct,{modelValue:c.value,"onUpdate:modelValue":d[0]||(d[0]=f=>c.value=f),dense:"",class:"text-grey","active-color":"primary","indicator-color":"primary",align:"justify","narrow-indicator":""},{default:i(()=>[a(_e,{name:"items",label:"Items"})]),_:1},8,["modelValue"]),a(Qe),a(dt,{modelValue:c.value,"onUpdate:modelValue":d[4]||(d[4]=f=>c.value=f),animated:""},{default:i(()=>[a(Te,{name:"items"},{default:i(()=>[w("div",_a,[w("div",Ta,[a(ae,{dense:"",filled:"",label:"Customer Name",modelValue:s.value.APP_CUSNM,"onUpdate:modelValue":d[1]||(d[1]=f=>s.value.APP_CUSNM=f),readonly:""},null,8,["modelValue"])]),w("div",Ca,[a(ae,{dense:"",filled:"",label:"Attn.",modelValue:s.value.APP_ATTN,"onUpdate:modelValue":d[2]||(d[2]=f=>s.value.APP_ATTN=f),readonly:""},null,8,["modelValue"])])]),w("div",ya,[w("div",Pa,[a(ae,{dense:"",filled:"",label:"Subject",modelValue:s.value.APP_SBJCT,"onUpdate:modelValue":d[3]||(d[3]=f=>s.value.APP_SBJCT=f),readonly:""},null,8,["modelValue"])])]),a(we,{title:"Item List",rows:k.value.dataItem,columns:R.value,"row-key":"name",dense:"",loading:v.value},null,8,["rows","columns","loading"])]),_:1})]),_:1},8,["modelValue"])]),_:1}),a(Ee,{align:"center"},{default:i(()=>[a(st,null,{default:i(()=>[a(F,{color:"primary",icon:"check",label:"Approve",disable:k.value.length===0,onClick:d[5]||(d[5]=f=>m())},null,8,["disable"]),a(F,{color:"red",icon:"cancel",label:"Reject",disable:k.value.length===0,onClick:d[6]||(d[6]=f=>S())},null,8,["disable"]),a(F,{color:"orange",flat:"",label:"cancel",onClick:le(r)},null,8,["onClick"])]),_:1})]),_:1})]),_:1})]),_:1},8,["onHide"]))}},wa=w("div",{class:"text-h6"},"Approval List",-1),ka={class:"q-pa-xs col-xs-12 col-sm-6 col-md-4"},qa={class:"text-h5 text-bold"},Da={class:"text-h6 text-bold"},Sa={class:"text-subtitle2"},Oa={class:"row"},Ra={class:"col"},Ia={class:"col text-right"},Ba={__name:"viewListApproval",props:{listApprv:Array,typeAPI:String},setup(e){const n=Ae(),g=e,h=P([{name:"APP_CD",label:"Doc Code",field:"APP_CD"},{name:"APP_CUSNM",label:"Customer",field:"APP_CUSNM"},{name:"APP_SBJCT",label:"Subject",field:"APP_SBJCT"},{name:"APP_ATTN",label:"Attn",field:"APP_ATTN"},{name:"CREATED_AT",label:"Created Date",field:"CREATED_AT"}]),r=P(""),t=(s,p="days")=>{const m=new Date,S=new Date(s);return ut.getDateDiff(m,S,p)},o=(s,p)=>{let m="";g.typeAPI=="quot"?(m="quotation",n.dialog({component:ga,componentProps:{dataHeader:p,cd:s,typeCD:m}}).onOk(async S=>{})):g.typeAPI=="pr"?(m="purchase-request-approval",n.dialog({component:Aa,componentProps:{dataHeader:p,cd:s,typeCD:m}}).onOk(async S=>{})):g.typeAPI=="po"&&(m="purchase-order/approval-document")},{dialogRef:v,onDialogHide:R,onDialogOK:k,onDialogCancel:c}=Le();return(s,p)=>(x(),Y(Ne,{ref_key:"dialogRef",ref:v,onHide:le(R),"transition-show":"slide-up","transition-hide":"slide-down","full-width":"",persistent:""},{default:i(()=>[a(pe,{class:"q-dialog-plugin bg-white q-pa-sm"},{default:i(()=>[a(J,null,{default:i(()=>[wa]),_:1}),a(J,{class:"q-pa-sm",style:{height:"70vh",overflow:"auto"}},{default:i(()=>[a(we,{grid:"",flat:"",bordered:"","card-container-class":s.cardContainerClass,title:"Outstanding Approval",rows:g.listApprv,columns:h.value,"row-key":"name",filter:r.value,"hide-header":"",pagination:{rowsPerPage:50},"rows-per-page-options":s.rowsPerPageOptions},{"top-right":i(()=>[a(ae,{borderless:"",dense:"",debounce:"300",modelValue:r.value,"onUpdate:modelValue":p[0]||(p[0]=m=>r.value=m),placeholder:"Search"},{append:i(()=>[a(oe,{name:"search"})]),_:1},8,["modelValue"])]),item:i(m=>[w("div",ka,[a(pe,{flat:"",bordered:""},{default:i(()=>[a(J,{class:"text-center bg-secondary text-white"},{default:i(()=>[w("div",qa,L(m.row.APP_CUSNM),1)]),_:2},1024),a(Qe),a(J,null,{default:i(()=>[w("div",Da,L(m.row.APP_CD),1),w("div",Sa,L(m.row.APP_SBJCT),1)]),_:2},1024),a(J,null,{default:i(()=>[w("div",Oa,[w("div",Ra,[a(F,{label:"Preview",color:"primary",outline:"",onClick:S=>o(m.row.APP_CD,m.row)},null,8,["onClick"])]),w("div",Ia,L(t(m.row.CREATED_AT)<30?`${t(m.row.CREATED_AT)} Days Ago`:`${t(m.row.CREATED_AT,"months")} Month ago`),1)])]),_:2},1024)]),_:2},1024)])]),_:1},8,["card-container-class","rows","columns","filter","rows-per-page-options"])]),_:1}),a(Ee,{align:"right"},{default:i(()=>[a(F,{label:"OK",color:"primary",onClick:p[1]||(p[1]=m=>le(k)()),disable:s.stateSubmit},null,8,["disable"])]),_:1})]),_:1})]),_:1},8,["onHide"]))}},$a={class:"q-pa-md bg-grey-5 window-height"},xa={class:"row"},Ma={class:"row"},Ua={class:"col"},Qa={class:"text-h3 text-cyan"},Ea={class:"text-subtitle2 text-cyan"},Na={class:"col text-right"},La={class:"row q-pa-sm"},Va={class:"col"},Ha={key:1},Ja={__name:"dashboardView",setup(e){const n=Ae(),g=P([{total:900,title:"Total Sales",icon:"shopping_cart",color:"cyan"},{total:900,title:"Total Purchase",icon:"shopping_bag",color:"cyan"},{total:900,title:"Total Profit",icon:"payments",color:"cyan"},{total:15,title:"Total Customer",icon:"group",color:"cyan"},{total:15,title:"Total Customer",icon:"group",color:"cyan"},{total:15,title:"Total Customer",icon:"group",color:"cyan"},{total:15,title:"Total Customer",icon:"group",color:"cyan"},{total:15,title:"Total Customer",icon:"group",color:"cyan"}]),h=P([{name:"name",label:"Business",field:"name",sortable:!0,align:"left"},{name:"quot",label:"Quotation",field:"quot_count",sortable:!0,align:"center"},{name:"pr",label:"Purchase Request",field:"pr_count",sortable:!0,align:"center"},{name:"po",label:"Purchase Order",field:"po_count",sortable:!0,align:"center"}]),r=P([]),t=P(!1);P(null),ce(async()=>{await o()});const o=async()=>{t.value=!0,await ne.get("/approval/notificationsAPI/top-user").then(R=>{t.value=!1,r.value=R.data}).catch(R=>{t.value=!1})},v=(R,k)=>{n.dialog({component:Ba,componentProps:{listApprv:R,typeAPI:k}}).onOk(async c=>{quotationGroupConditions.value=c.MCONDITION_RPT_STAT,quotationConditions.value=c.group})};return(R,k)=>(x(),K("div",$a,[w("div",xa,[(x(!0),K(te,null,me(g.value,(c,s)=>(x(),K("div",{class:jt("col-3 q-pa-sm"),key:s},[a(pe,null,{default:i(()=>[a(J,null,{default:i(()=>[w("div",Ma,[w("div",Ua,[w("div",Qa,L(c.total),1),w("div",Ea,L(c.title),1)]),w("div",Na,[a(oe,{name:c.icon,size:"4.4em",color:c.color},null,8,["name","color"])])])]),_:2},1024)]),_:2},1024)]))),128))]),w("div",La,[w("div",Va,[a(we,{flat:"",bordered:"",title:"Approval List",rows:r.value,columns:h.value,"row-key":"name",loading:t.value},{"top-right":i(()=>[a(F,{flat:"",icon:"refresh",color:"cyan",onClick:o})]),header:i(c=>[a(at,{props:c},{default:i(()=>[(x(!0),K(te,null,me(c.cols,s=>(x(),Y(Kt,{key:s.name,props:c},{default:i(()=>[W(L(s.label),1)]),_:2},1032,["props"]))),128))]),_:2},1032,["props"])]),body:i(c=>[a(at,{props:c},{default:i(()=>[(x(!0),K(te,null,me(c.cols,s=>(x(),Y(Jt,{key:s.name,props:c},{default:i(()=>[s.name==="quot"||s.name==="pr"||s.name==="po"||s.name==="spk"?(x(),K(te,{key:0},[s.value>0?(x(),Y(F,{key:0,flat:"",color:"blue",onClick:p=>v(c.row[s.name.split("_")[0]],s.name)},{default:i(()=>[w("b",null,L(s.value),1)]),_:2},1032,["onClick"])):(x(),K("span",Ha,L(s.value),1))],64)):(x(),K(te,{key:1},[W(L(s.value),1)],64))]),_:2},1032,["props"]))),128))]),_:2},1032,["props"])]),_:1},8,["rows","columns","loading"])])])]))}};export{Ja as default};
