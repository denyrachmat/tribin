import{i as Pt,e as xe,s as y,a as O,j as ut,o as le,b4 as ct,aW as Ne,ap as Ue,h as x,a3 as me,a5 as At,aI as wt,aa as oe,y as Rt,g as Pe,aD as kt,b5 as Dt,c as Ae,W as Be,X as tt,w as fe,p as qt,af as St,ag as It,d as we,a$ as Ot,a8 as ve,n as Mt,b6 as Et,a1 as ye,b7 as He,at,a0 as Qe,F as $t,a2 as xt,b8 as Bt,b9 as Ht,ab as Qt,ac as Nt,an as Ut,B as $,C as G,D as r,E as t,J as de,K as W,S as Re,I as k,P as ce,R as F,aU as ne,aV as pe,aZ as Lt,H as J,aX as U,M as Z,L as ke,Q as j,O as De,ba as Vt}from"./index.26902160.js";import{t as jt,h as Kt,u as qe,b as he,a as _e,Q as lt,j as nt,k as se,l as ue,m as Wt}from"./use-dialog-plugin-component.47429a23.js";import{u as zt,Q as ot,a as Ft}from"./use-cache.546da72a.js";import{api_web as X}from"./axios.4dfb0eea.js";import{d as dt}from"./date.d5ca1955.js";import{Q as Jt}from"./QResizeObserver.f83412fe.js";import{Q as Le}from"./QBtnGroup.864dd937.js";let Xt=0;const Yt=["click","keydown"],Gt={icon:String,label:[Number,String],alert:[Boolean,String],alertIcon:String,name:{type:[Number,String],default:()=>`t_${Xt++}`},noCaps:Boolean,tabindex:[String,Number],disable:Boolean,contentClass:String,ripple:{type:[Boolean,Object],default:!0}};function Zt(e,o,g,h){const s=Pt(ct,xe);if(s===xe)return console.error("QTab/QRouteTab component needs to be child of QTabs"),xe;const{proxy:a}=Pe(),l=y(null),u=y(null),S=y(null),P=O(()=>e.disable===!0||e.ripple===!1?!1:Object.assign({keyCodes:[13,32],early:!0},e.ripple===!0?{}:e.ripple)),d=O(()=>s.currentModel.value===e.name),c=O(()=>"q-tab relative-position self-stretch flex flex-center text-center"+(d.value===!0?" q-tab--active"+(s.tabProps.value.activeClass?" "+s.tabProps.value.activeClass:"")+(s.tabProps.value.activeColor?` text-${s.tabProps.value.activeColor}`:"")+(s.tabProps.value.activeBgColor?` bg-${s.tabProps.value.activeBgColor}`:""):" q-tab--inactive")+(e.icon&&e.label&&s.tabProps.value.inlineLabel===!1?" q-tab--full":"")+(e.noCaps===!0||s.tabProps.value.noCaps===!0?" q-tab--no-caps":"")+(e.disable===!0?" disabled":" q-focusable q-hoverable cursor-pointer")+(h!==void 0?h.linkClass.value:"")),m=O(()=>"q-tab__content self-stretch flex-center relative-position q-anchor--skip non-selectable "+(s.tabProps.value.inlineLabel===!0?"row no-wrap q-tab__content--inline":"column")+(e.contentClass!==void 0?` ${e.contentClass}`:"")),p=O(()=>e.disable===!0||s.hasFocus.value===!0||d.value===!1&&s.hasActiveTab.value===!0?-1:e.tabindex||0);function R(b,H){if(H!==!0&&l.value!==null&&l.value.focus(),e.disable===!0){h!==void 0&&h.hasRouterLink.value===!0&&me(b);return}if(h===void 0){s.updateModel({name:e.name}),g("click",b);return}if(h.hasRouterLink.value===!0){const L=(B={})=>{let Q;const K=B.to===void 0||kt(B.to,e.to)===!0?s.avoidRouteWatcher=Dt():null;return h.navigateToRouterLink(b,{...B,returnRouterError:!0}).catch(z=>{Q=z}).then(z=>{if(K===s.avoidRouteWatcher&&(s.avoidRouteWatcher=!1,Q===void 0&&(z===void 0||z.message!==void 0&&z.message.startsWith("Avoided redundant navigation")===!0)&&s.updateModel({name:e.name})),B.returnRouterError===!0)return Q!==void 0?Promise.reject(Q):z})};g("click",b,L),b.defaultPrevented!==!0&&L();return}g("click",b)}function _(b){At(b,[13,32])?R(b,!0):wt(b)!==!0&&b.keyCode>=35&&b.keyCode<=40&&b.altKey!==!0&&b.metaKey!==!0&&s.onKbdNavigate(b.keyCode,a.$el)===!0&&me(b),g("keydown",b)}function i(){const b=s.tabProps.value.narrowIndicator,H=[],L=x("div",{ref:S,class:["q-tab__indicator",s.tabProps.value.indicatorClass]});e.icon!==void 0&&H.push(x(oe,{class:"q-tab__icon",name:e.icon})),e.label!==void 0&&H.push(x("div",{class:"q-tab__label"},e.label)),e.alert!==!1&&H.push(e.alertIcon!==void 0?x(oe,{class:"q-tab__alert-icon",color:e.alert!==!0?e.alert:void 0,name:e.alertIcon}):x("div",{class:"q-tab__alert"+(e.alert!==!0?` text-${e.alert}`:"")})),b===!0&&H.push(L);const B=[x("div",{class:"q-focus-helper",tabindex:-1,ref:l}),x("div",{class:m.value},Rt(o.default,H))];return b===!1&&B.push(L),B}const v={name:O(()=>e.name),rootRef:u,tabIndicatorRef:S,routeData:h};ut(()=>{s.unregisterTab(v)}),le(()=>{s.registerTab(v)});function w(b,H){const L={ref:u,class:c.value,tabindex:p.value,role:"tab","aria-selected":d.value===!0?"true":"false","aria-disabled":e.disable===!0?"true":void 0,onClick:R,onKeydown:_,...H};return Ne(x(b,L,i()),[[Ue,P.value]])}return{renderTab:w,$tabs:s}}var ge=Ae({name:"QTab",props:Gt,emits:Yt,setup(e,{slots:o,emit:g}){const{renderTab:h}=Zt(e,o,g);return()=>h("div")}});function ea(e,o,g){const h=g===!0?["left","right"]:["top","bottom"];return`absolute-${o===!0?h[0]:h[1]}${e?` text-${e}`:""}`}const ta=["left","center","right","justify"];var Ve=Ae({name:"QTabs",props:{modelValue:[Number,String],align:{type:String,default:"center",validator:e=>ta.includes(e)},breakpoint:{type:[String,Number],default:600},vertical:Boolean,shrink:Boolean,stretch:Boolean,activeClass:String,activeColor:String,activeBgColor:String,indicatorColor:String,leftIcon:String,rightIcon:String,outsideArrows:Boolean,mobileArrows:Boolean,switchIndicator:Boolean,narrowIndicator:Boolean,inlineLabel:Boolean,noCaps:Boolean,dense:Boolean,contentClass:String,"onUpdate:modelValue":[Function,Array]},setup(e,{slots:o,emit:g}){const{proxy:h}=Pe(),{$q:s}=h,{registerTick:a}=Be(),{registerTick:l}=Be(),{registerTick:u}=Be(),{registerTimeout:S,removeTimeout:P}=tt(),{registerTimeout:d,removeTimeout:c}=tt(),m=y(null),p=y(null),R=y(e.modelValue),_=y(!1),i=y(!0),v=y(!1),w=y(!1),b=[],H=y(0),L=y(!1);let B=null,Q=null,K;const z=O(()=>({activeClass:e.activeClass,activeColor:e.activeColor,activeBgColor:e.activeBgColor,indicatorClass:ea(e.indicatorColor,e.switchIndicator,e.vertical),narrowIndicator:e.narrowIndicator,inlineLabel:e.inlineLabel,noCaps:e.noCaps})),Se=O(()=>{const n=H.value,f=R.value;for(let T=0;T<n;T++)if(b[T].name.value===f)return!0;return!1}),Ie=O(()=>`q-tabs__content--align-${_.value===!0?"left":w.value===!0?"justify":e.align}`),Oe=O(()=>`q-tabs row no-wrap items-center q-tabs--${_.value===!0?"":"not-"}scrollable q-tabs--${e.vertical===!0?"vertical":"horizontal"} q-tabs__arrows--${e.outsideArrows===!0?"outside":"inside"} q-tabs--mobile-with${e.mobileArrows===!0?"":"out"}-arrows`+(e.dense===!0?" q-tabs--dense":"")+(e.shrink===!0?" col-shrink":"")+(e.stretch===!0?" self-stretch":"")),C=O(()=>"q-tabs__content scroll--mobile row no-wrap items-center self-stretch hide-scrollbar relative-position "+Ie.value+(e.contentClass!==void 0?` ${e.contentClass}`:"")),I=O(()=>e.vertical===!0?{container:"height",content:"offsetHeight",scroll:"scrollHeight"}:{container:"width",content:"offsetWidth",scroll:"scrollWidth"}),V=O(()=>e.vertical!==!0&&s.lang.rtl===!0),ee=O(()=>jt===!1&&V.value===!0);fe(V,ie),fe(()=>e.modelValue,n=>{Me({name:n,setCurrent:!0,skipEmit:!0})}),fe(()=>e.outsideArrows,Te);function Me({name:n,setCurrent:f,skipEmit:T}){R.value!==n&&(T!==!0&&e["onUpdate:modelValue"]!==void 0&&g("update:modelValue",n),(f===!0||e["onUpdate:modelValue"]===void 0)&&(vt(R.value,n),R.value=n))}function Te(){a(()=>{We({width:m.value.offsetWidth,height:m.value.offsetHeight})})}function We(n){if(I.value===void 0||p.value===null)return;const f=n[I.value.container],T=Math.min(p.value[I.value.scroll],Array.prototype.reduce.call(p.value.children,(E,D)=>E+(D[I.value.content]||0),0)),M=f>0&&T>f;_.value=M,M===!0&&l(ie),w.value=f<parseInt(e.breakpoint,10)}function vt(n,f){const T=n!=null&&n!==""?b.find(E=>E.name.value===n):null,M=f!=null&&f!==""?b.find(E=>E.name.value===f):null;if(T&&M){const E=T.tabIndicatorRef.value,D=M.tabIndicatorRef.value;B!==null&&(clearTimeout(B),B=null),E.style.transition="none",E.style.transform="none",D.style.transition="none",D.style.transform="none";const A=E.getBoundingClientRect(),N=D.getBoundingClientRect();D.style.transform=e.vertical===!0?`translate3d(0,${A.top-N.top}px,0) scale3d(1,${N.height?A.height/N.height:1},1)`:`translate3d(${A.left-N.left}px,0,0) scale3d(${N.width?A.width/N.width:1},1,1)`,u(()=>{B=setTimeout(()=>{B=null,D.style.transition="transform .25s cubic-bezier(.4, 0, .2, 1)",D.style.transform="none"},70)})}M&&_.value===!0&&re(M.rootRef.value)}function re(n){const{left:f,width:T,top:M,height:E}=p.value.getBoundingClientRect(),D=n.getBoundingClientRect();let A=e.vertical===!0?D.top-M:D.left-f;if(A<0){p.value[e.vertical===!0?"scrollTop":"scrollLeft"]+=Math.floor(A),ie();return}A+=e.vertical===!0?D.height-E:D.width-T,A>0&&(p.value[e.vertical===!0?"scrollTop":"scrollLeft"]+=Math.ceil(A),ie())}function ie(){const n=p.value;if(n===null)return;const f=n.getBoundingClientRect(),T=e.vertical===!0?n.scrollTop:Math.abs(n.scrollLeft);V.value===!0?(i.value=Math.ceil(T+f.width)<n.scrollWidth-1,v.value=T>0):(i.value=T>0,v.value=e.vertical===!0?Math.ceil(T+f.height)<n.scrollHeight:Math.ceil(T+f.width)<n.scrollWidth)}function ze(n){Q!==null&&clearInterval(Q),Q=setInterval(()=>{pt(n)===!0&&te()},5)}function Fe(){ze(ee.value===!0?Number.MAX_SAFE_INTEGER:0)}function Je(){ze(ee.value===!0?0:Number.MAX_SAFE_INTEGER)}function te(){Q!==null&&(clearInterval(Q),Q=null)}function ft(n,f){const T=Array.prototype.filter.call(p.value.children,N=>N===f||N.matches&&N.matches(".q-tab.q-focusable")===!0),M=T.length;if(M===0)return;if(n===36)return re(T[0]),T[0].focus(),!0;if(n===35)return re(T[M-1]),T[M-1].focus(),!0;const E=n===(e.vertical===!0?38:37),D=n===(e.vertical===!0?40:39),A=E===!0?-1:D===!0?1:void 0;if(A!==void 0){const N=V.value===!0?-1:1,Y=T.indexOf(f)+A*N;return Y>=0&&Y<M&&(re(T[Y]),T[Y].focus({preventScroll:!0})),!0}}const mt=O(()=>ee.value===!0?{get:n=>Math.abs(n.scrollLeft),set:(n,f)=>{n.scrollLeft=-f}}:e.vertical===!0?{get:n=>n.scrollTop,set:(n,f)=>{n.scrollTop=f}}:{get:n=>n.scrollLeft,set:(n,f)=>{n.scrollLeft=f}});function pt(n){const f=p.value,{get:T,set:M}=mt.value;let E=!1,D=T(f);const A=n<D?-1:1;return D+=A*5,D<0?(E=!0,D=0):(A===-1&&D<=n||A===1&&D>=n)&&(E=!0,D=n),M(f,D),ie(),E}function Xe(n,f){for(const T in n)if(n[T]!==f[T])return!1;return!0}function gt(){let n=null,f={matchedLen:0,queryDiff:9999,hrefLen:0};const T=b.filter(A=>A.routeData!==void 0&&A.routeData.hasRouterLink.value===!0),{hash:M,query:E}=h.$route,D=Object.keys(E).length;for(const A of T){const N=A.routeData.exact.value===!0;if(A.routeData[N===!0?"linkIsExactActive":"linkIsActive"].value!==!0)continue;const{hash:Y,query:Ee,matched:Ct,href:yt}=A.routeData.resolvedLink.value,$e=Object.keys(Ee).length;if(N===!0){if(Y!==M||$e!==D||Xe(E,Ee)===!1)continue;n=A.name.value;break}if(Y!==""&&Y!==M||$e!==0&&Xe(Ee,E)===!1)continue;const ae={matchedLen:Ct.length,queryDiff:D-$e,hrefLen:yt.length-Y.length};if(ae.matchedLen>f.matchedLen){n=A.name.value,f=ae;continue}else if(ae.matchedLen!==f.matchedLen)continue;if(ae.queryDiff<f.queryDiff)n=A.name.value,f=ae;else if(ae.queryDiff!==f.queryDiff)continue;ae.hrefLen>f.hrefLen&&(n=A.name.value,f=ae)}n===null&&b.some(A=>A.routeData===void 0&&A.name.value===R.value)===!0||Me({name:n,setCurrent:!0})}function bt(n){if(P(),L.value!==!0&&m.value!==null&&n.target&&typeof n.target.closest=="function"){const f=n.target.closest(".q-tab");f&&m.value.contains(f)===!0&&(L.value=!0,_.value===!0&&re(f))}}function ht(){S(()=>{L.value=!1},30)}function Ce(){Ge.avoidRouteWatcher===!1?d(gt):c()}function Ye(){if(K===void 0){const n=fe(()=>h.$route.fullPath,Ce);K=()=>{n(),K=void 0}}}function _t(n){b.push(n),H.value++,Te(),n.routeData===void 0||h.$route===void 0?d(()=>{if(_.value===!0){const f=R.value,T=f!=null&&f!==""?b.find(M=>M.name.value===f):null;T&&re(T.rootRef.value)}}):(Ye(),n.routeData.hasRouterLink.value===!0&&Ce())}function Tt(n){b.splice(b.indexOf(n),1),H.value--,Te(),K!==void 0&&n.routeData!==void 0&&(b.every(f=>f.routeData===void 0)===!0&&K(),Ce())}const Ge={currentModel:R,tabProps:z,hasFocus:L,hasActiveTab:Se,registerTab:_t,unregisterTab:Tt,verifyRouteModel:Ce,updateModel:Me,onKbdNavigate:ft,avoidRouteWatcher:!1};qt(ct,Ge);function Ze(){B!==null&&clearTimeout(B),te(),K!==void 0&&K()}let et;return ut(Ze),St(()=>{et=K!==void 0,Ze()}),It(()=>{et===!0&&Ye(),Te()}),()=>x("div",{ref:m,class:Oe.value,role:"tablist",onFocusin:bt,onFocusout:ht},[x(Jt,{onResize:We}),x("div",{ref:p,class:C.value,onScroll:ie},we(o.default)),x(oe,{class:"q-tabs__arrow q-tabs__arrow--left absolute q-tab__icon"+(i.value===!0?"":" q-tabs__arrow--faded"),name:e.leftIcon||s.iconSet.tabs[e.vertical===!0?"up":"left"],onMousedownPassive:Fe,onTouchstartPassive:Fe,onMouseupPassive:te,onMouseleavePassive:te,onTouchendPassive:te}),x(oe,{class:"q-tabs__arrow q-tabs__arrow--right absolute q-tab__icon"+(v.value===!0?"":" q-tabs__arrow--faded"),name:e.rightIcon||s.iconSet.tabs[e.vertical===!0?"down":"right"],onMousedownPassive:Je,onTouchstartPassive:Je,onMouseupPassive:te,onMouseleavePassive:te,onTouchendPassive:te})])}});const je={left:!0,right:!0,up:!0,down:!0,horizontal:!0,vertical:!0},aa=Object.keys(je);je.all=!0;function rt(e){const o={};for(const g of aa)e[g]===!0&&(o[g]=!0);return Object.keys(o).length===0?je:(o.horizontal===!0?o.left=o.right=!0:o.left===!0&&o.right===!0&&(o.horizontal=!0),o.vertical===!0?o.up=o.down=!0:o.up===!0&&o.down===!0&&(o.vertical=!0),o.horizontal===!0&&o.vertical===!0&&(o.all=!0),o)}const la=["INPUT","TEXTAREA"];function it(e,o){return o.event===void 0&&e.target!==void 0&&e.target.draggable!==!0&&typeof o.handler=="function"&&la.includes(e.target.nodeName.toUpperCase())===!1&&(e.qClonedBy===void 0||e.qClonedBy.indexOf(o.uid)===-1)}function na(e){const o=[.06,6,50];return typeof e=="string"&&e.length&&e.split(":").forEach((g,h)=>{const s=parseFloat(g);s&&(o[h]=s)}),o}var oa=Ot({name:"touch-swipe",beforeMount(e,{value:o,arg:g,modifiers:h}){if(h.mouse!==!0&&ve.has.touch!==!0)return;const s=h.mouseCapture===!0?"Capture":"",a={handler:o,sensitivity:na(g),direction:rt(h),noop:Mt,mouseStart(l){it(l,a)&&Et(l)&&(ye(a,"temp",[[document,"mousemove","move",`notPassive${s}`],[document,"mouseup","end","notPassiveCapture"]]),a.start(l,!0))},touchStart(l){if(it(l,a)){const u=l.target;ye(a,"temp",[[u,"touchmove","move","notPassiveCapture"],[u,"touchcancel","end","notPassiveCapture"],[u,"touchend","end","notPassiveCapture"]]),a.start(l)}},start(l,u){ve.is.firefox===!0&&He(e,!0);const S=at(l);a.event={x:S.left,y:S.top,time:Date.now(),mouse:u===!0,dir:!1}},move(l){if(a.event===void 0)return;if(a.event.dir!==!1){me(l);return}const u=Date.now()-a.event.time;if(u===0)return;const S=at(l),P=S.left-a.event.x,d=Math.abs(P),c=S.top-a.event.y,m=Math.abs(c);if(a.event.mouse!==!0){if(d<a.sensitivity[1]&&m<a.sensitivity[1]){a.end(l);return}}else if(window.getSelection().toString()!==""){a.end(l);return}else if(d<a.sensitivity[2]&&m<a.sensitivity[2])return;const p=d/u,R=m/u;a.direction.vertical===!0&&d<m&&d<100&&R>a.sensitivity[0]&&(a.event.dir=c<0?"up":"down"),a.direction.horizontal===!0&&d>m&&m<100&&p>a.sensitivity[0]&&(a.event.dir=P<0?"left":"right"),a.direction.up===!0&&d<m&&c<0&&d<100&&R>a.sensitivity[0]&&(a.event.dir="up"),a.direction.down===!0&&d<m&&c>0&&d<100&&R>a.sensitivity[0]&&(a.event.dir="down"),a.direction.left===!0&&d>m&&P<0&&m<100&&p>a.sensitivity[0]&&(a.event.dir="left"),a.direction.right===!0&&d>m&&P>0&&m<100&&p>a.sensitivity[0]&&(a.event.dir="right"),a.event.dir!==!1?(me(l),a.event.mouse===!0&&(document.body.classList.add("no-pointer-events--children"),document.body.classList.add("non-selectable"),Kt(),a.styleCleanup=_=>{a.styleCleanup=void 0,document.body.classList.remove("non-selectable");const i=()=>{document.body.classList.remove("no-pointer-events--children")};_===!0?setTimeout(i,50):i()}),a.handler({evt:l,touch:a.event.mouse!==!0,mouse:a.event.mouse,direction:a.event.dir,duration:u,distance:{x:d,y:m}})):a.end(l)},end(l){a.event!==void 0&&(Qe(a,"temp"),ve.is.firefox===!0&&He(e,!1),a.styleCleanup!==void 0&&a.styleCleanup(!0),l!==void 0&&a.event.dir!==!1&&me(l),a.event=void 0)}};if(e.__qtouchswipe=a,h.mouse===!0){const l=h.mouseCapture===!0||h.mousecapture===!0?"Capture":"";ye(a,"main",[[e,"mousedown","mouseStart",`passive${l}`]])}ve.has.touch===!0&&ye(a,"main",[[e,"touchstart","touchStart",`passive${h.capture===!0?"Capture":""}`],[e,"touchmove","noop","notPassiveCapture"]])},updated(e,o){const g=e.__qtouchswipe;g!==void 0&&(o.oldValue!==o.value&&(typeof o.value!="function"&&g.end(),g.handler=o.value),g.direction=rt(o.modifiers))},beforeUnmount(e){const o=e.__qtouchswipe;o!==void 0&&(Qe(o,"main"),Qe(o,"temp"),ve.is.firefox===!0&&He(e,!1),o.styleCleanup!==void 0&&o.styleCleanup(),delete e.__qtouchswipe)}});const ra={name:{required:!0},disable:Boolean},st={setup(e,{slots:o}){return()=>x("div",{class:"q-panel scroll",role:"tabpanel"},we(o.default))}},ia={modelValue:{required:!0},animated:Boolean,infinite:Boolean,swipeable:Boolean,vertical:Boolean,transitionPrev:String,transitionNext:String,transitionDuration:{type:[String,Number],default:300},keepAlive:Boolean,keepAliveInclude:[String,Array,RegExp],keepAliveExclude:[String,Array,RegExp],keepAliveMax:Number},sa=["update:modelValue","beforeTransition","transition"];function ua(){const{props:e,emit:o,proxy:g}=Pe(),{getCacheWithFn:h}=zt();let s,a;const l=y(null),u=y(null);function S(C){const I=e.vertical===!0?"up":"left";Q((g.$q.lang.rtl===!0?-1:1)*(C.direction===I?1:-1))}const P=O(()=>[[oa,S,void 0,{horizontal:e.vertical!==!0,vertical:e.vertical,mouse:!0}]]),d=O(()=>e.transitionPrev||`slide-${e.vertical===!0?"down":"right"}`),c=O(()=>e.transitionNext||`slide-${e.vertical===!0?"up":"left"}`),m=O(()=>`--q-transition-duration: ${e.transitionDuration}ms`),p=O(()=>typeof e.modelValue=="string"||typeof e.modelValue=="number"?e.modelValue:String(e.modelValue)),R=O(()=>({include:e.keepAliveInclude,exclude:e.keepAliveExclude,max:e.keepAliveMax})),_=O(()=>e.keepAliveInclude!==void 0||e.keepAliveExclude!==void 0);fe(()=>e.modelValue,(C,I)=>{const V=b(C)===!0?H(C):-1;a!==!0&&B(V===-1?0:V<H(I)?-1:1),l.value!==V&&(l.value=V,o("beforeTransition",C,I),$t(()=>{o("transition",C,I)}))});function i(){Q(1)}function v(){Q(-1)}function w(C){o("update:modelValue",C)}function b(C){return C!=null&&C!==""}function H(C){return s.findIndex(I=>I.props.name===C&&I.props.disable!==""&&I.props.disable!==!0)}function L(){return s.filter(C=>C.props.disable!==""&&C.props.disable!==!0)}function B(C){const I=C!==0&&e.animated===!0&&l.value!==-1?"q-transition--"+(C===-1?d.value:c.value):null;u.value!==I&&(u.value=I)}function Q(C,I=l.value){let V=I+C;for(;V>-1&&V<s.length;){const ee=s[V];if(ee!==void 0&&ee.props.disable!==""&&ee.props.disable!==!0){B(C),a=!0,o("update:modelValue",ee.props.name),setTimeout(()=>{a=!1});return}V+=C}e.infinite===!0&&s.length!==0&&I!==-1&&I!==s.length&&Q(C,C===-1?s.length:-1)}function K(){const C=H(e.modelValue);return l.value!==C&&(l.value=C),!0}function z(){const C=b(e.modelValue)===!0&&K()&&s[l.value];return e.keepAlive===!0?[x(Ht,R.value,[x(_.value===!0?h(p.value,()=>({...st,name:p.value})):st,{key:p.value,style:m.value},()=>C)])]:[x("div",{class:"q-panel scroll",style:m.value,key:p.value,role:"tabpanel"},[C])]}function Se(){if(s.length!==0)return e.animated===!0?[x(xt,{name:u.value},z)]:z()}function Ie(C){return s=Bt(we(C.default,[])).filter(I=>I.props!==null&&I.props.slot===void 0&&b(I.props.name)===!0),s.length}function Oe(){return s}return Object.assign(g,{next:i,previous:v,goTo:w}),{panelIndex:l,panelDirectives:P,updatePanelsList:Ie,updatePanelIndex:K,getPanelContent:Se,getEnabledPanels:L,getPanels:Oe,isValidPanelName:b,keepAliveProps:R,needsUniqueKeepAliveWrapper:_,goToPanelByOffset:Q,goToPanel:w,nextPanel:i,previousPanel:v}}var be=Ae({name:"QTabPanel",props:ra,setup(e,{slots:o}){return()=>x("div",{class:"q-tab-panel",role:"tabpanel"},we(o.default))}}),Ke=Ae({name:"QTabPanels",props:{...ia,...Qt},emits:sa,setup(e,{slots:o}){const g=Pe(),h=Nt(e,g.proxy.$q),{updatePanelsList:s,getPanelContent:a,panelDirectives:l}=ua(),u=O(()=>"q-tab-panels q-panel-parent"+(h.value===!0?" q-tab-panels--dark q-dark":""));return()=>(s(o),Ut("div",{class:u.value},a(),"pan",e.swipeable,()=>l.value))}});const ca=k("div",{class:"text-h6"},"Quotation Review",-1),da={class:"row q-py-md"},va={class:"col"},fa={class:"col q-pl-md"},ma={class:"row q-pb-md"},pa={class:"col"},ga={__name:"viewListApprovalItem",props:{dataHeader:Array,cd:String,typeCD:String,conn:String},setup(e){const{dialogRef:o,onDialogHide:g,onDialogOK:h,onDialogCancel:s}=qe(),a=he(),l=e;le(()=>{c.value=l.dataHeader});const u=y(!1),S=y([{name:"MITM_ITMNM",label:"Item Name",field:"MITM_ITMNM",sortable:!0,align:"left"},{name:"TQUODETA_USAGE_DESCRIPTION",label:"Usage",field:"TQUODETA_USAGE_DESCRIPTION",sortable:!0,align:"left"},{name:"TQUODETA_PRC",label:"Price",field:"TQUODETA_PRC",sortable:!0,align:"left",format:i=>parseInt(i).toLocaleString()},{name:"TQUODETA_OPRPRC",label:"Operator",field:"TQUODETA_OPRPRC",sortable:!0,align:"left",format:i=>parseInt(i).toLocaleString()},{name:"TQUODETA_MOBDEMOB",label:"MOB DEMOB",field:"TQUODETA_MOBDEMOB",sortable:!0,align:"left",format:i=>parseInt(i).toLocaleString()},{name:"SUBTOT",label:"SUBTOTAL",sortable:!0,field:i=>parseInt(i.TQUODETA_PRC)+parseInt(i.TQUODETA_OPRPRC)+parseInt(i.TQUODETA_MOBDEMOB),align:"left",format:i=>i.toLocaleString()}]),P=y([]),d=y("items"),c=y({MCUS_CUSNM:"",TQUO_ATTN:"",TQUO_SBJCT:""});le(()=>{m()});const m=async()=>{u.value=!0,await X.post(`${l.typeCD}`,{id:btoa(l.cd),TQUO_BRANCH:l.dataHeader.TQUO_BRANCH,conn:l.conn}).then(i=>{u.value=!1,P.value=i.data}).catch(i=>{u.value=!1})},p=()=>{q.dialog({title:"Confirm",message:"Are you sure want to Approve this quotation ?",cancel:!0,persistent:!0}).onOk(async i=>{u.value=!0,await X.put(`approve/quotations/${btoa(l.cd)}`,{TQUO_BRANCH:l.dataHeader.TQUO_BRANCH}).then(v=>{u.value=!1,m()}).catch(v=>{u.value=!1})})},R=()=>{a.dialog({title:"Confirm",message:"Are you sure want to Reject this quotation ?",cancel:!0,persistent:!0}).onOk(async i=>{a.dialog({title:"Prompt",message:"Input reject reason.",prompt:{model:"",isValid:v=>v.length>2,type:"text"},cancel:!0,persistent:!0}).onOk(async v=>{u.value=!0,await X.put(`revise/quotations/${btoa(l.cd)}`,{remark:v,TQUO_BRANCH:l.dataHeader.TQUO_BRANCH}).then(w=>{u.value=!1,m()}).catch(w=>{u.value=!1})})})},_=()=>{window.open("https://joss.jatpowerindo.co.id/PDF/quotation/"+btoa(l.cd)+"/"+btoa(l.conn),"_blank").focus()};return(i,v)=>($(),G(De,{ref_key:"dialogRef",ref:o,onHide:Z(g),"transition-show":"slide-up","transition-hide":"slide-down","full-width":""},{default:r(()=>[t(de,{class:"q-dialog-plugin bg-white q-pa-sm"},{default:r(()=>[t(W,null,{default:r(()=>[ca]),_:1}),t(W,{class:"q-pa-sm",style:{height:"70vh",overflow:"auto"}},{default:r(()=>[t(Ve,{modelValue:d.value,"onUpdate:modelValue":v[0]||(v[0]=w=>d.value=w),dense:"",class:"text-grey","active-color":"primary","indicator-color":"primary",align:"justify","narrow-indicator":""},{default:r(()=>[t(ge,{name:"items",label:"Items"}),t(ge,{name:"conditions",label:"Conditions"}),t(ge,{name:"histCond",label:"Approval History"})]),_:1},8,["modelValue"]),t(Re),t(Ke,{modelValue:d.value,"onUpdate:modelValue":v[4]||(v[4]=w=>d.value=w),animated:""},{default:r(()=>[t(be,{name:"items"},{default:r(()=>[k("div",da,[k("div",va,[t(ce,{dense:"",filled:"",label:"Customer Name",modelValue:c.value.APP_CUSNM,"onUpdate:modelValue":v[1]||(v[1]=w=>c.value.APP_CUSNM=w),readonly:""},null,8,["modelValue"])]),k("div",fa,[t(ce,{dense:"",filled:"",label:"Attn.",modelValue:c.value.APP_ATTN,"onUpdate:modelValue":v[2]||(v[2]=w=>c.value.APP_ATTN=w),readonly:""},null,8,["modelValue"])])]),k("div",ma,[k("div",pa,[t(ce,{dense:"",filled:"",label:"Subject",modelValue:c.value.APP_SBJCT,"onUpdate:modelValue":v[3]||(v[3]=w=>c.value.APP_SBJCT=w),readonly:""},null,8,["modelValue"])])]),t(_e,{title:"Item List",rows:P.value.dataItem,columns:S.value,"row-key":"name",dense:"",loading:u.value},null,8,["rows","columns","loading"])]),_:1}),t(be,{name:"conditions"},{default:r(()=>[t(lt,{bordered:"",dense:""},{default:r(()=>[($(!0),F(ne,null,pe(P.value.dataCondition,(w,b)=>Ne(($(),G(nt,{clickable:"",key:b},{default:r(()=>[t(se,{avatar:""},{default:r(()=>[t(Lt,{color:"primary","text-color":"white",size:"sm"},{default:r(()=>[J(U(b+1),1)]),_:2},1024)]),_:2},1024),t(se,null,{default:r(()=>[J(U(w.TQUOCOND_CONDI),1)]),_:2},1024)]),_:2},1024)),[[Ue]])),128))]),_:1})]),_:1}),t(be,{name:"histCond"},{default:r(()=>[t(lt,{bordered:"",separator:""},{default:r(()=>[($(!0),F(ne,null,pe(P.value.approvalHistories,(w,b)=>Ne(($(),G(nt,{clickable:"",key:b},{default:r(()=>[t(se,null,{default:r(()=>[t(ue,null,{default:r(()=>[J(U(Z(dt).formatDate(w.created_at,"DD MMM YYYY HH:mm")),1)]),_:2},1024),t(ue,{caption:""},{default:r(()=>[J("Time")]),_:1})]),_:2},1024),t(se,null,{default:r(()=>[t(ue,null,{default:r(()=>[J(U(w.type==2?"Rejected":"Approved"),1)]),_:2},1024),t(ue,{caption:""},{default:r(()=>[J("Status")]),_:1})]),_:2},1024),t(se,null,{default:r(()=>[t(ue,null,{default:r(()=>[J(U(w.remark),1)]),_:2},1024),t(ue,{caption:""},{default:r(()=>[J("Remarks")]),_:1})]),_:2},1024),t(se,{side:""},{default:r(()=>[t(oe,{name:w.type==2?"cancel":"check_circle",color:w.type==2?"red":"green"},null,8,["name","color"])]),_:2},1024)]),_:2},1024)),[[Ue]])),128))]),_:1})]),_:1})]),_:1},8,["modelValue"])]),_:1}),t(ke,{align:"center"},{default:r(()=>[t(Le,null,{default:r(()=>[t(j,{color:"primary",icon:"print",disable:P.value.length===0,onClick:v[5]||(v[5]=w=>_()),flat:""},null,8,["disable"]),t(j,{color:"primary",icon:"check",label:"Approve",disable:P.value.length===0,onClick:v[6]||(v[6]=w=>p())},null,8,["disable"]),t(j,{color:"red",icon:"cancel",label:"Reject",disable:P.value.length===0,onClick:v[7]||(v[7]=w=>R())},null,8,["disable"]),t(j,{color:"orange",flat:"",label:"cancel",onClick:Z(s)},null,8,["onClick"])]),_:1})]),_:1})]),_:1})]),_:1},8,["onHide"]))}},ba=k("div",{class:"text-h6"},"PR Review",-1),ha={class:"row q-pb-md"},_a={class:"col"},Ta={__name:"viewListPRItem",props:{dataHeader:Array,cd:String,typeCD:String,conn:String},setup(e){const{dialogRef:o,onDialogHide:g,onDialogOK:h,onDialogCancel:s}=qe(),a=he(),l=e;le(()=>{c.value=l.dataHeader});const u=y(!1),S=y([{name:"MITM_ITMNM",label:"Item Name",field:"MITM_ITMNM",sortable:!0,align:"left"},{name:"TPCHREQDETA_REMARK",label:"Remark",field:"TPCHREQDETA_REMARK",sortable:!0,align:"left"},{name:"TPCHREQDETA_REQDT",label:"Request Date",field:"TPCHREQDETA_REQDT",sortable:!0,align:"left"}]),P=y([]),d=y("items"),c=y({MCUS_CUSNM:"",TQUO_ATTN:"",TQUO_SBJCT:""});le(()=>{m()});const m=async()=>{u.value=!0,await X.post(`${l.typeCD}`,{id:btoa(l.cd),TPCHREQDETA_BRANCH:l.dataHeader.TPCHREQ_BRANCH,conn:l.conn}).then(_=>{u.value=!1,P.value=_.data}).catch(_=>{u.value=!1})},p=()=>{q.dialog({title:"Confirm",message:"Are you sure want to Approve this quotation ?",cancel:!0,persistent:!0}).onOk(async _=>{u.value=!0,await X.put(`approve/purchase-request/${btoa(l.cd)}`,{TPCHREQ_BRANCH:l.dataHeader.TPCHREQ_BRANCH}).then(i=>{u.value=!1,m()}).catch(i=>{u.value=!1})})},R=()=>{a.dialog({title:"Confirm",message:"Are you sure want to Reject this quotation ?",cancel:!0,persistent:!0}).onOk(async _=>{a.dialog({title:"Prompt",message:"Input reject reason.",prompt:{model:"",isValid:i=>i.length>2,type:"text"},cancel:!0,persistent:!0}).onOk(async i=>{u.value=!0,await X.put(`revise/purchase-request/${btoa(l.cd)}`,{remark:i,TPCHREQ_BRANCH:l.dataHeader.TPCHREQ_BRANCH}).then(v=>{u.value=!1,m()}).catch(v=>{u.value=!1})})})};return(_,i)=>($(),G(De,{ref_key:"dialogRef",ref:o,onHide:Z(g),"transition-show":"slide-up","transition-hide":"slide-down","full-width":""},{default:r(()=>[t(de,{class:"q-dialog-plugin bg-white q-pa-sm"},{default:r(()=>[t(W,null,{default:r(()=>[ba]),_:1}),t(W,{class:"q-pa-sm",style:{height:"70vh",overflow:"auto"}},{default:r(()=>[t(Ve,{modelValue:d.value,"onUpdate:modelValue":i[0]||(i[0]=v=>d.value=v),dense:"",class:"text-grey","active-color":"primary","indicator-color":"primary",align:"justify","narrow-indicator":""},{default:r(()=>[t(ge,{name:"items",label:"Items"})]),_:1},8,["modelValue"]),t(Re),t(Ke,{modelValue:d.value,"onUpdate:modelValue":i[2]||(i[2]=v=>d.value=v),animated:""},{default:r(()=>[t(be,{name:"items"},{default:r(()=>[k("div",ha,[k("div",_a,[t(ce,{dense:"",filled:"",label:"Purpose",modelValue:c.value.APP_SBJCT,"onUpdate:modelValue":i[1]||(i[1]=v=>c.value.APP_SBJCT=v),readonly:""},null,8,["modelValue"])])]),t(_e,{title:"Item List",rows:P.value.dataItem,columns:S.value,"row-key":"name",dense:"",loading:u.value},null,8,["rows","columns","loading"])]),_:1})]),_:1},8,["modelValue"])]),_:1}),t(ke,{align:"center"},{default:r(()=>[t(Le,null,{default:r(()=>[t(j,{color:"primary",icon:"check",label:"Approve",disable:P.value.length===0,onClick:i[3]||(i[3]=v=>p())},null,8,["disable"]),t(j,{color:"red",icon:"cancel",label:"Reject",disable:P.value.length===0,onClick:i[4]||(i[4]=v=>R())},null,8,["disable"]),t(j,{color:"orange",flat:"",label:"cancel",onClick:Z(s)},null,8,["onClick"])]),_:1})]),_:1})]),_:1})]),_:1},8,["onHide"]))}},Ca=k("div",{class:"text-h6"},"PO Review",-1),ya={class:"row q-pb-md"},Pa={class:"col"},Aa={__name:"viewListPOItem",props:{dataHeader:Array,cd:String,typeCD:String,conn:String},setup(e){const{dialogRef:o,onDialogHide:g,onDialogOK:h,onDialogCancel:s}=qe(),a=he(),l=e;le(()=>{c.value=l.dataHeader});const u=y(!1),S=y([{name:"MITM_ITMNM",label:"Item Name",field:"MITM_ITMNM",sortable:!0,align:"left"},{name:"TPCHORDDETA_ITMPRC_PER",label:"Price",field:"TPCHORDDETA_ITMPRC_PER",sortable:!0,align:"left",format:_=>_.toLocaleString()},{name:"TPCHORDDETA_ITMQT",label:"Qty",field:"TPCHORDDETA_ITMQT",sortable:!0,align:"left",format:_=>_.toLocaleString()},{name:"SUBTOT",label:"SUBTOTAL",sortable:!0,field:_=>_.TPCHORDDETA_ITMPRC_PER*_.TPCHORDDETA_ITMQT,align:"left",format:_=>_.toLocaleString()}]),P=y([]),d=y("items"),c=y({MCUS_CUSNM:"",TQUO_ATTN:"",TQUO_SBJCT:""});le(()=>{m()});const m=async()=>{u.value=!0,await X.post(`${l.typeCD}`,{id:btoa(l.cd),TPCHORD_BRANCH:l.dataHeader.TPCHORD_BRANCH,conn:l.conn}).then(_=>{u.value=!1,P.value=_.data}).catch(_=>{u.value=!1})},p=()=>{q.dialog({title:"Confirm",message:"Are you sure want to Approve this quotation ?",cancel:!0,persistent:!0}).onOk(async _=>{u.value=!0,await X.put(`approve/purchase-order/${btoa(l.cd)}`,{TPCHORD_BRANCH:l.dataHeader.TPCHORD_BRANCH}).then(i=>{u.value=!1,m()}).catch(i=>{u.value=!1})})},R=()=>{a.dialog({title:"Confirm",message:"Are you sure want to Reject this quotation ?",cancel:!0,persistent:!0}).onOk(async _=>{a.dialog({title:"Prompt",message:"Input reject reason.",prompt:{model:"",isValid:i=>i.length>2,type:"text"},cancel:!0,persistent:!0}).onOk(async i=>{u.value=!0,await X.put(`revise/purchase-order/${btoa(l.cd)}`,{remark:i,TPCHORD_BRANCH:l.dataHeader.TPCHORD_BRANCH}).then(v=>{u.value=!1,m()}).catch(v=>{u.value=!1})})})};return(_,i)=>($(),G(De,{ref_key:"dialogRef",ref:o,onHide:Z(g),"transition-show":"slide-up","transition-hide":"slide-down","full-width":""},{default:r(()=>[t(de,{class:"q-dialog-plugin bg-white q-pa-sm"},{default:r(()=>[t(W,null,{default:r(()=>[Ca]),_:1}),t(W,{class:"q-pa-sm",style:{height:"70vh",overflow:"auto"}},{default:r(()=>[t(Ve,{modelValue:d.value,"onUpdate:modelValue":i[0]||(i[0]=v=>d.value=v),dense:"",class:"text-grey","active-color":"primary","indicator-color":"primary",align:"justify","narrow-indicator":""},{default:r(()=>[t(ge,{name:"items",label:"Items"})]),_:1},8,["modelValue"]),t(Re),t(Ke,{modelValue:d.value,"onUpdate:modelValue":i[2]||(i[2]=v=>d.value=v),animated:""},{default:r(()=>[t(be,{name:"items"},{default:r(()=>[k("div",ya,[k("div",Pa,[t(ce,{dense:"",filled:"",label:"Supplier",modelValue:c.value.APP_CUSNM,"onUpdate:modelValue":i[1]||(i[1]=v=>c.value.APP_CUSNM=v),readonly:""},null,8,["modelValue"])])]),t(_e,{title:"Item List",rows:P.value.dataItem,columns:S.value,"row-key":"name",dense:"",loading:u.value},null,8,["rows","columns","loading"])]),_:1})]),_:1},8,["modelValue"])]),_:1}),t(ke,{align:"center"},{default:r(()=>[t(Le,null,{default:r(()=>[t(j,{color:"primary",icon:"check",label:"Approve",disable:P.value.length===0,onClick:i[3]||(i[3]=v=>p())},null,8,["disable"]),t(j,{color:"red",icon:"cancel",label:"Reject",disable:P.value.length===0,onClick:i[4]||(i[4]=v=>R())},null,8,["disable"]),t(j,{color:"orange",flat:"",label:"cancel",onClick:Z(s)},null,8,["onClick"])]),_:1})]),_:1})]),_:1})]),_:1},8,["onHide"]))}},wa=k("div",{class:"text-h6"},"Approval List",-1),Ra={class:"q-pa-xs col-xs-12 col-sm-6 col-md-4"},ka={class:"text-h5 text-bold"},Da={class:"text-h6 text-bold"},qa={class:"text-subtitle2"},Sa={class:"row"},Ia={class:"col"},Oa={class:"col text-right"},Ma={__name:"viewListApproval",props:{listApprv:Array,typeAPI:String,conn:String},setup(e){const o=he(),g=e,h=y([{name:"APP_CD",label:"Doc Code",field:"APP_CD"},{name:"APP_CUSNM",label:"Customer",field:"APP_CUSNM"},{name:"APP_SBJCT",label:"Subject",field:"APP_SBJCT"},{name:"APP_ATTN",label:"Attn",field:"APP_ATTN"},{name:"CREATED_AT",label:"Created Date",field:"CREATED_AT"}]),s=y(""),a=(c,m="days")=>{const p=new Date,R=new Date(c);return dt.getDateDiff(p,R,m)},l=(c,m)=>{let p="";g.typeAPI=="quot"?(p="quotation/quotation-approval",o.dialog({component:ga,componentProps:{dataHeader:m,cd:c,typeCD:p,conn:g.conn}}).onOk(async R=>{})):g.typeAPI=="pr"?(p="purchase-request-approval",o.dialog({component:Ta,componentProps:{dataHeader:m,cd:c,typeCD:p,conn:g.conn}}).onOk(async R=>{})):g.typeAPI=="po"&&(p="purchase-order/approval-document",o.dialog({component:Aa,componentProps:{dataHeader:m,cd:c,typeCD:p,conn:g.conn}}).onOk(async R=>{}))},{dialogRef:u,onDialogHide:S,onDialogOK:P,onDialogCancel:d}=qe();return(c,m)=>($(),G(De,{ref_key:"dialogRef",ref:u,onHide:Z(S),"transition-show":"slide-up","transition-hide":"slide-down","full-width":""},{default:r(()=>[t(de,{class:"q-dialog-plugin bg-white q-pa-sm"},{default:r(()=>[t(W,null,{default:r(()=>[wa]),_:1}),t(W,{class:"q-pa-sm",style:{height:"70vh",overflow:"auto"}},{default:r(()=>[t(_e,{grid:"",flat:"",bordered:"","card-container-class":c.cardContainerClass,title:"Outstanding Approval",rows:g.listApprv,columns:h.value,"row-key":"name",filter:s.value,"hide-header":"",pagination:{rowsPerPage:50},"rows-per-page-options":c.rowsPerPageOptions},{"top-right":r(()=>[t(ce,{borderless:"",dense:"",debounce:"300",modelValue:s.value,"onUpdate:modelValue":m[0]||(m[0]=p=>s.value=p),placeholder:"Search"},{append:r(()=>[t(oe,{name:"search"})]),_:1},8,["modelValue"])]),item:r(p=>[k("div",Ra,[t(de,{flat:"",bordered:""},{default:r(()=>[t(W,{class:"text-center bg-secondary text-white"},{default:r(()=>[k("div",ka,U(p.row.APP_CUSNM),1)]),_:2},1024),t(Re),t(W,null,{default:r(()=>[k("div",Da,U(p.row.APP_CD),1),k("div",qa,U(p.row.APP_SBJCT),1)]),_:2},1024),t(W,null,{default:r(()=>[k("div",Sa,[k("div",Ia,[t(j,{label:"Preview",color:"primary",outline:"",onClick:R=>l(p.row.APP_CD,p.row)},null,8,["onClick"])]),k("div",Oa,U(a(p.row.CREATED_AT)<30?`${a(p.row.CREATED_AT)} Days Ago`:`${a(p.row.CREATED_AT,"months")} Month ago`),1)])]),_:2},1024)]),_:2},1024)])]),_:1},8,["card-container-class","rows","columns","filter","rows-per-page-options"])]),_:1}),t(ke,{align:"right"},{default:r(()=>[t(j,{label:"OK",color:"primary",onClick:m[1]||(m[1]=p=>Z(P)()),disable:c.stateSubmit},null,8,["disable"])]),_:1})]),_:1})]),_:1},8,["onHide"]))}},Ea={class:"q-pa-md bg-grey-5 window-height"},$a={class:"row"},xa={class:"row"},Ba={class:"col"},Ha={class:"text-h3 text-cyan"},Qa={class:"text-subtitle2 text-cyan"},Na={class:"col text-right"},Ua={class:"row q-pa-sm"},La={class:"col"},Va={key:1},Ya={__name:"dashboardView",setup(e){const o=he(),g=y([{total:900,title:"Total Sales",icon:"shopping_cart",color:"cyan"},{total:900,title:"Total Purchase",icon:"shopping_bag",color:"cyan"},{total:900,title:"Total Profit",icon:"payments",color:"cyan"},{total:15,title:"Total Customer",icon:"group",color:"cyan"},{total:15,title:"Total Customer",icon:"group",color:"cyan"},{total:15,title:"Total Customer",icon:"group",color:"cyan"},{total:15,title:"Total Customer",icon:"group",color:"cyan"},{total:15,title:"Total Customer",icon:"group",color:"cyan"}]),h=y([{name:"name",label:"Business",field:"name",sortable:!0,align:"left"},{name:"quot",label:"Quotation",field:"quot_count",sortable:!0,align:"center"},{name:"pr",label:"Purchase Request",field:"pr_count",sortable:!0,align:"center"},{name:"po",label:"Purchase Order",field:"po_count",sortable:!0,align:"center"}]),s=y([]),a=y(!1);y(null),le(async()=>{await l()});const l=async()=>{a.value=!0,await X.get("/approval/notificationsAPI/top-user").then(S=>{a.value=!1,s.value=S.data}).catch(S=>{a.value=!1})},u=(S,P,d)=>{o.dialog({component:Ma,componentProps:{listApprv:S,typeAPI:P,conn:d}}).onOk(async c=>{quotationGroupConditions.value=c.MCONDITION_RPT_STAT,quotationConditions.value=c.group})};return(S,P)=>($(),F("div",Ea,[k("div",$a,[($(!0),F(ne,null,pe(g.value,(d,c)=>($(),F("div",{class:Vt("col-3 q-pa-sm"),key:c},[t(de,null,{default:r(()=>[t(W,null,{default:r(()=>[k("div",xa,[k("div",Ba,[k("div",Ha,U(d.total),1),k("div",Qa,U(d.title),1)]),k("div",Na,[t(oe,{name:d.icon,size:"4.4em",color:d.color},null,8,["name","color"])])])]),_:2},1024)]),_:2},1024)]))),128))]),k("div",Ua,[k("div",La,[t(_e,{flat:"",bordered:"",title:"Approval List",rows:s.value,columns:h.value,"row-key":"name",loading:a.value},{"top-right":r(()=>[t(j,{flat:"",icon:"refresh",color:"cyan",onClick:l})]),header:r(d=>[t(ot,{props:d},{default:r(()=>[($(!0),F(ne,null,pe(d.cols,c=>($(),G(Wt,{key:c.name,props:d},{default:r(()=>[J(U(c.label),1)]),_:2},1032,["props"]))),128))]),_:2},1032,["props"])]),body:r(d=>[t(ot,{props:d},{default:r(()=>[($(!0),F(ne,null,pe(d.cols,c=>($(),G(Ft,{key:c.name,props:d},{default:r(()=>[c.name==="quot"||c.name==="pr"||c.name==="po"||c.name==="spk"?($(),F(ne,{key:0},[c.value>0?($(),G(j,{key:0,flat:"",color:"blue",onClick:m=>u(d.row[c.name.split("_")[0]],c.name,d.row.connection)},{default:r(()=>[k("b",null,U(c.value),1)]),_:2},1032,["onClick"])):($(),F("span",Va,U(c.value),1))],64)):($(),F(ne,{key:1},[J(U(c.value),1)],64))]),_:2},1032,["props"]))),128))]),_:2},1032,["props"])]),_:1},8,["rows","columns","loading"])])])]))}};export{Ya as default};
