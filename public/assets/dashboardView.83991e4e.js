import{i as _t,e as ke,s as w,a as S,j as tt,o as pe,b4 as at,a_ as Ie,ap as $e,h as $,a3 as se,a5 as Tt,aI as yt,aa as te,y as Ct,g as he,aD as Pt,b5 as wt,c as ge,W as qe,X as Fe,w as ie,p as At,af as kt,ag as qt,d as _e,aU as St,a8 as re,n as Dt,b6 as xt,a1 as fe,b7 as Se,at as Ke,a0 as De,F as Rt,a2 as It,b8 as $t,b9 as Mt,ab as Bt,ac as Ot,an as Et,B,C as X,D as s,E as l,J as be,K as J,S as nt,I as D,P as me,b0 as Lt,R as z,aY as ee,aZ as ue,b1 as Qt,H as W,a$ as N,M as ce,L as lt,Q as Z,O as ot,ba as Nt}from"./index.e3afee7e.js";import{w as Ut,i as Vt,u as rt,b as Be,a as Oe,Q as Ye,m as Ge,n as le,o as oe,c as jt,q as Ht}from"./use-dialog-plugin-component.19a59b9a.js";import{u as zt,d as it,Q as Je,b as Wt}from"./date.48017124.js";import{api_web as Me}from"./axios.dc1f334b.js";import{Q as Ft}from"./QResizeObserver.45e609e6.js";let Kt=0;const Yt=["click","keydown"],Gt={icon:String,label:[Number,String],alert:[Boolean,String],alertIcon:String,name:{type:[Number,String],default:()=>`t_${Kt++}`},noCaps:Boolean,tabindex:[String,Number],disable:Boolean,contentClass:String,ripple:{type:[Boolean,Object],default:!0}};function Jt(e,n,p,f){const o=_t(at,ke);if(o===ke)return console.error("QTab/QRouteTab component needs to be child of QTabs"),ke;const{proxy:t}=he(),i=w(null),g=w(null),x=w(null),q=S(()=>e.disable===!0||e.ripple===!1?!1:Object.assign({keyCodes:[13,32],early:!0},e.ripple===!0?{}:e.ripple)),u=S(()=>o.currentModel.value===e.name),c=S(()=>"q-tab relative-position self-stretch flex flex-center text-center"+(u.value===!0?" q-tab--active"+(o.tabProps.value.activeClass?" "+o.tabProps.value.activeClass:"")+(o.tabProps.value.activeColor?` text-${o.tabProps.value.activeColor}`:"")+(o.tabProps.value.activeBgColor?` bg-${o.tabProps.value.activeBgColor}`:""):" q-tab--inactive")+(e.icon&&e.label&&o.tabProps.value.inlineLabel===!1?" q-tab--full":"")+(e.noCaps===!0||o.tabProps.value.noCaps===!0?" q-tab--no-caps":"")+(e.disable===!0?" disabled":" q-focusable q-hoverable cursor-pointer")+(f!==void 0?f.linkClass.value:"")),b=S(()=>"q-tab__content self-stretch flex-center relative-position q-anchor--skip non-selectable "+(o.tabProps.value.inlineLabel===!0?"row no-wrap q-tab__content--inline":"column")+(e.contentClass!==void 0?` ${e.contentClass}`:"")),v=S(()=>e.disable===!0||o.hasFocus.value===!0||u.value===!1&&o.hasActiveTab.value===!0?-1:e.tabindex||0);function A(d,O){if(O!==!0&&i.value!==null&&i.value.focus(),e.disable===!0){f!==void 0&&f.hasRouterLink.value===!0&&se(d);return}if(f===void 0){o.updateModel({name:e.name}),p("click",d);return}if(f.hasRouterLink.value===!0){const U=(M={})=>{let E;const j=M.to===void 0||Pt(M.to,e.to)===!0?o.avoidRouteWatcher=wt():null;return f.navigateToRouterLink(d,{...M,returnRouterError:!0}).catch(H=>{E=H}).then(H=>{if(j===o.avoidRouteWatcher&&(o.avoidRouteWatcher=!1,E===void 0&&(H===void 0||H.message!==void 0&&H.message.startsWith("Avoided redundant navigation")===!0)&&o.updateModel({name:e.name})),M.returnRouterError===!0)return E!==void 0?Promise.reject(E):H})};p("click",d,U),d.defaultPrevented!==!0&&U();return}p("click",d)}function L(d){Tt(d,[13,32])?A(d,!0):yt(d)!==!0&&d.keyCode>=35&&d.keyCode<=40&&d.altKey!==!0&&d.metaKey!==!0&&o.onKbdNavigate(d.keyCode,t.$el)===!0&&se(d),p("keydown",d)}function C(){const d=o.tabProps.value.narrowIndicator,O=[],U=$("div",{ref:x,class:["q-tab__indicator",o.tabProps.value.indicatorClass]});e.icon!==void 0&&O.push($(te,{class:"q-tab__icon",name:e.icon})),e.label!==void 0&&O.push($("div",{class:"q-tab__label"},e.label)),e.alert!==!1&&O.push(e.alertIcon!==void 0?$(te,{class:"q-tab__alert-icon",color:e.alert!==!0?e.alert:void 0,name:e.alertIcon}):$("div",{class:"q-tab__alert"+(e.alert!==!0?` text-${e.alert}`:"")})),d===!0&&O.push(U);const M=[$("div",{class:"q-focus-helper",tabindex:-1,ref:i}),$("div",{class:b.value},Ct(n.default,O))];return d===!1&&M.push(U),M}const y={name:S(()=>e.name),rootRef:g,tabIndicatorRef:x,routeData:f};tt(()=>{o.unregisterTab(y)}),pe(()=>{o.registerTab(y)});function _(d,O){const U={ref:g,class:c.value,tabindex:v.value,role:"tab","aria-selected":u.value===!0?"true":"false","aria-disabled":e.disable===!0?"true":void 0,onClick:A,onKeydown:L,...O};return Ie($(d,U,C()),[[$e,q.value]])}return{renderTab:_,$tabs:o}}var xe=ge({name:"QTab",props:Gt,emits:Yt,setup(e,{slots:n,emit:p}){const{renderTab:f}=Jt(e,n,p);return()=>f("div")}});function Xt(e,n,p){const f=p===!0?["left","right"]:["top","bottom"];return`absolute-${n===!0?f[0]:f[1]}${e?` text-${e}`:""}`}const Zt=["left","center","right","justify"];var ea=ge({name:"QTabs",props:{modelValue:[Number,String],align:{type:String,default:"center",validator:e=>Zt.includes(e)},breakpoint:{type:[String,Number],default:600},vertical:Boolean,shrink:Boolean,stretch:Boolean,activeClass:String,activeColor:String,activeBgColor:String,indicatorColor:String,leftIcon:String,rightIcon:String,outsideArrows:Boolean,mobileArrows:Boolean,switchIndicator:Boolean,narrowIndicator:Boolean,inlineLabel:Boolean,noCaps:Boolean,dense:Boolean,contentClass:String,"onUpdate:modelValue":[Function,Array]},setup(e,{slots:n,emit:p}){const{proxy:f}=he(),{$q:o}=f,{registerTick:t}=qe(),{registerTick:i}=qe(),{registerTick:g}=qe(),{registerTimeout:x,removeTimeout:q}=Fe(),{registerTimeout:u,removeTimeout:c}=Fe(),b=w(null),v=w(null),A=w(e.modelValue),L=w(!1),C=w(!0),y=w(!1),_=w(!1),d=[],O=w(0),U=w(!1);let M=null,E=null,j;const H=S(()=>({activeClass:e.activeClass,activeColor:e.activeColor,activeBgColor:e.activeBgColor,indicatorClass:Xt(e.indicatorColor,e.switchIndicator,e.vertical),narrowIndicator:e.narrowIndicator,inlineLabel:e.inlineLabel,noCaps:e.noCaps})),Te=S(()=>{const a=O.value,r=A.value;for(let m=0;m<a;m++)if(d[m].name.value===r)return!0;return!1}),ye=S(()=>`q-tabs__content--align-${L.value===!0?"left":_.value===!0?"justify":e.align}`),Ce=S(()=>`q-tabs row no-wrap items-center q-tabs--${L.value===!0?"":"not-"}scrollable q-tabs--${e.vertical===!0?"vertical":"horizontal"} q-tabs__arrows--${e.outsideArrows===!0?"outside":"inside"} q-tabs--mobile-with${e.mobileArrows===!0?"":"out"}-arrows`+(e.dense===!0?" q-tabs--dense":"")+(e.shrink===!0?" col-shrink":"")+(e.stretch===!0?" self-stretch":"")),h=S(()=>"q-tabs__content scroll--mobile row no-wrap items-center self-stretch hide-scrollbar relative-position "+ye.value+(e.contentClass!==void 0?` ${e.contentClass}`:"")),k=S(()=>e.vertical===!0?{container:"height",content:"offsetHeight",scroll:"scrollHeight"}:{container:"width",content:"offsetWidth",scroll:"scrollWidth"}),V=S(()=>e.vertical!==!0&&o.lang.rtl===!0),K=S(()=>Ut===!1&&V.value===!0);ie(V,ne),ie(()=>e.modelValue,a=>{Pe({name:a,setCurrent:!0,skipEmit:!0})}),ie(()=>e.outsideArrows,de);function Pe({name:a,setCurrent:r,skipEmit:m}){A.value!==a&&(m!==!0&&e["onUpdate:modelValue"]!==void 0&&p("update:modelValue",a),(r===!0||e["onUpdate:modelValue"]===void 0)&&(st(A.value,a),A.value=a))}function de(){t(()=>{Le({width:b.value.offsetWidth,height:b.value.offsetHeight})})}function Le(a){if(k.value===void 0||v.value===null)return;const r=a[k.value.container],m=Math.min(v.value[k.value.scroll],Array.prototype.reduce.call(v.value.children,(I,P)=>I+(P[k.value.content]||0),0)),R=r>0&&m>r;L.value=R,R===!0&&i(ne),_.value=r<parseInt(e.breakpoint,10)}function st(a,r){const m=a!=null&&a!==""?d.find(I=>I.name.value===a):null,R=r!=null&&r!==""?d.find(I=>I.name.value===r):null;if(m&&R){const I=m.tabIndicatorRef.value,P=R.tabIndicatorRef.value;M!==null&&(clearTimeout(M),M=null),I.style.transition="none",I.style.transform="none",P.style.transition="none",P.style.transform="none";const T=I.getBoundingClientRect(),Q=P.getBoundingClientRect();P.style.transform=e.vertical===!0?`translate3d(0,${T.top-Q.top}px,0) scale3d(1,${Q.height?T.height/Q.height:1},1)`:`translate3d(${T.left-Q.left}px,0,0) scale3d(${Q.width?T.width/Q.width:1},1,1)`,g(()=>{M=setTimeout(()=>{M=null,P.style.transition="transform .25s cubic-bezier(.4, 0, .2, 1)",P.style.transform="none"},70)})}R&&L.value===!0&&ae(R.rootRef.value)}function ae(a){const{left:r,width:m,top:R,height:I}=v.value.getBoundingClientRect(),P=a.getBoundingClientRect();let T=e.vertical===!0?P.top-R:P.left-r;if(T<0){v.value[e.vertical===!0?"scrollTop":"scrollLeft"]+=Math.floor(T),ne();return}T+=e.vertical===!0?P.height-I:P.width-m,T>0&&(v.value[e.vertical===!0?"scrollTop":"scrollLeft"]+=Math.ceil(T),ne())}function ne(){const a=v.value;if(a===null)return;const r=a.getBoundingClientRect(),m=e.vertical===!0?a.scrollTop:Math.abs(a.scrollLeft);V.value===!0?(C.value=Math.ceil(m+r.width)<a.scrollWidth-1,y.value=m>0):(C.value=m>0,y.value=e.vertical===!0?Math.ceil(m+r.height)<a.scrollHeight:Math.ceil(m+r.width)<a.scrollWidth)}function Qe(a){E!==null&&clearInterval(E),E=setInterval(()=>{dt(a)===!0&&Y()},5)}function Ne(){Qe(K.value===!0?Number.MAX_SAFE_INTEGER:0)}function Ue(){Qe(K.value===!0?0:Number.MAX_SAFE_INTEGER)}function Y(){E!==null&&(clearInterval(E),E=null)}function ut(a,r){const m=Array.prototype.filter.call(v.value.children,Q=>Q===r||Q.matches&&Q.matches(".q-tab.q-focusable")===!0),R=m.length;if(R===0)return;if(a===36)return ae(m[0]),m[0].focus(),!0;if(a===35)return ae(m[R-1]),m[R-1].focus(),!0;const I=a===(e.vertical===!0?38:37),P=a===(e.vertical===!0?40:39),T=I===!0?-1:P===!0?1:void 0;if(T!==void 0){const Q=V.value===!0?-1:1,F=m.indexOf(r)+T*Q;return F>=0&&F<R&&(ae(m[F]),m[F].focus({preventScroll:!0})),!0}}const ct=S(()=>K.value===!0?{get:a=>Math.abs(a.scrollLeft),set:(a,r)=>{a.scrollLeft=-r}}:e.vertical===!0?{get:a=>a.scrollTop,set:(a,r)=>{a.scrollTop=r}}:{get:a=>a.scrollLeft,set:(a,r)=>{a.scrollLeft=r}});function dt(a){const r=v.value,{get:m,set:R}=ct.value;let I=!1,P=m(r);const T=a<P?-1:1;return P+=T*5,P<0?(I=!0,P=0):(T===-1&&P<=a||T===1&&P>=a)&&(I=!0,P=a),R(r,P),ne(),I}function Ve(a,r){for(const m in a)if(a[m]!==r[m])return!1;return!0}function vt(){let a=null,r={matchedLen:0,queryDiff:9999,hrefLen:0};const m=d.filter(T=>T.routeData!==void 0&&T.routeData.hasRouterLink.value===!0),{hash:R,query:I}=f.$route,P=Object.keys(I).length;for(const T of m){const Q=T.routeData.exact.value===!0;if(T.routeData[Q===!0?"linkIsExactActive":"linkIsActive"].value!==!0)continue;const{hash:F,query:we,matched:ht,href:gt}=T.routeData.resolvedLink.value,Ae=Object.keys(we).length;if(Q===!0){if(F!==R||Ae!==P||Ve(I,we)===!1)continue;a=T.name.value;break}if(F!==""&&F!==R||Ae!==0&&Ve(we,I)===!1)continue;const G={matchedLen:ht.length,queryDiff:P-Ae,hrefLen:gt.length-F.length};if(G.matchedLen>r.matchedLen){a=T.name.value,r=G;continue}else if(G.matchedLen!==r.matchedLen)continue;if(G.queryDiff<r.queryDiff)a=T.name.value,r=G;else if(G.queryDiff!==r.queryDiff)continue;G.hrefLen>r.hrefLen&&(a=T.name.value,r=G)}a===null&&d.some(T=>T.routeData===void 0&&T.name.value===A.value)===!0||Pe({name:a,setCurrent:!0})}function ft(a){if(q(),U.value!==!0&&b.value!==null&&a.target&&typeof a.target.closest=="function"){const r=a.target.closest(".q-tab");r&&b.value.contains(r)===!0&&(U.value=!0,L.value===!0&&ae(r))}}function mt(){x(()=>{U.value=!1},30)}function ve(){He.avoidRouteWatcher===!1?u(vt):c()}function je(){if(j===void 0){const a=ie(()=>f.$route.fullPath,ve);j=()=>{a(),j=void 0}}}function pt(a){d.push(a),O.value++,de(),a.routeData===void 0||f.$route===void 0?u(()=>{if(L.value===!0){const r=A.value,m=r!=null&&r!==""?d.find(R=>R.name.value===r):null;m&&ae(m.rootRef.value)}}):(je(),a.routeData.hasRouterLink.value===!0&&ve())}function bt(a){d.splice(d.indexOf(a),1),O.value--,de(),j!==void 0&&a.routeData!==void 0&&(d.every(r=>r.routeData===void 0)===!0&&j(),ve())}const He={currentModel:A,tabProps:H,hasFocus:U,hasActiveTab:Te,registerTab:pt,unregisterTab:bt,verifyRouteModel:ve,updateModel:Pe,onKbdNavigate:ut,avoidRouteWatcher:!1};At(at,He);function ze(){M!==null&&clearTimeout(M),Y(),j!==void 0&&j()}let We;return tt(ze),kt(()=>{We=j!==void 0,ze()}),qt(()=>{We===!0&&je(),de()}),()=>$("div",{ref:b,class:Ce.value,role:"tablist",onFocusin:ft,onFocusout:mt},[$(Ft,{onResize:Le}),$("div",{ref:v,class:h.value,onScroll:ne},_e(n.default)),$(te,{class:"q-tabs__arrow q-tabs__arrow--left absolute q-tab__icon"+(C.value===!0?"":" q-tabs__arrow--faded"),name:e.leftIcon||o.iconSet.tabs[e.vertical===!0?"up":"left"],onMousedownPassive:Ne,onTouchstartPassive:Ne,onMouseupPassive:Y,onMouseleavePassive:Y,onTouchendPassive:Y}),$(te,{class:"q-tabs__arrow q-tabs__arrow--right absolute q-tab__icon"+(y.value===!0?"":" q-tabs__arrow--faded"),name:e.rightIcon||o.iconSet.tabs[e.vertical===!0?"down":"right"],onMousedownPassive:Ue,onTouchstartPassive:Ue,onMouseupPassive:Y,onMouseleavePassive:Y,onTouchendPassive:Y})])}});const Ee={left:!0,right:!0,up:!0,down:!0,horizontal:!0,vertical:!0},ta=Object.keys(Ee);Ee.all=!0;function Xe(e){const n={};for(const p of ta)e[p]===!0&&(n[p]=!0);return Object.keys(n).length===0?Ee:(n.horizontal===!0?n.left=n.right=!0:n.left===!0&&n.right===!0&&(n.horizontal=!0),n.vertical===!0?n.up=n.down=!0:n.up===!0&&n.down===!0&&(n.vertical=!0),n.horizontal===!0&&n.vertical===!0&&(n.all=!0),n)}const aa=["INPUT","TEXTAREA"];function Ze(e,n){return n.event===void 0&&e.target!==void 0&&e.target.draggable!==!0&&typeof n.handler=="function"&&aa.includes(e.target.nodeName.toUpperCase())===!1&&(e.qClonedBy===void 0||e.qClonedBy.indexOf(n.uid)===-1)}function na(e){const n=[.06,6,50];return typeof e=="string"&&e.length&&e.split(":").forEach((p,f)=>{const o=parseFloat(p);o&&(n[f]=o)}),n}var la=St({name:"touch-swipe",beforeMount(e,{value:n,arg:p,modifiers:f}){if(f.mouse!==!0&&re.has.touch!==!0)return;const o=f.mouseCapture===!0?"Capture":"",t={handler:n,sensitivity:na(p),direction:Xe(f),noop:Dt,mouseStart(i){Ze(i,t)&&xt(i)&&(fe(t,"temp",[[document,"mousemove","move",`notPassive${o}`],[document,"mouseup","end","notPassiveCapture"]]),t.start(i,!0))},touchStart(i){if(Ze(i,t)){const g=i.target;fe(t,"temp",[[g,"touchmove","move","notPassiveCapture"],[g,"touchcancel","end","notPassiveCapture"],[g,"touchend","end","notPassiveCapture"]]),t.start(i)}},start(i,g){re.is.firefox===!0&&Se(e,!0);const x=Ke(i);t.event={x:x.left,y:x.top,time:Date.now(),mouse:g===!0,dir:!1}},move(i){if(t.event===void 0)return;if(t.event.dir!==!1){se(i);return}const g=Date.now()-t.event.time;if(g===0)return;const x=Ke(i),q=x.left-t.event.x,u=Math.abs(q),c=x.top-t.event.y,b=Math.abs(c);if(t.event.mouse!==!0){if(u<t.sensitivity[1]&&b<t.sensitivity[1]){t.end(i);return}}else if(window.getSelection().toString()!==""){t.end(i);return}else if(u<t.sensitivity[2]&&b<t.sensitivity[2])return;const v=u/g,A=b/g;t.direction.vertical===!0&&u<b&&u<100&&A>t.sensitivity[0]&&(t.event.dir=c<0?"up":"down"),t.direction.horizontal===!0&&u>b&&b<100&&v>t.sensitivity[0]&&(t.event.dir=q<0?"left":"right"),t.direction.up===!0&&u<b&&c<0&&u<100&&A>t.sensitivity[0]&&(t.event.dir="up"),t.direction.down===!0&&u<b&&c>0&&u<100&&A>t.sensitivity[0]&&(t.event.dir="down"),t.direction.left===!0&&u>b&&q<0&&b<100&&v>t.sensitivity[0]&&(t.event.dir="left"),t.direction.right===!0&&u>b&&q>0&&b<100&&v>t.sensitivity[0]&&(t.event.dir="right"),t.event.dir!==!1?(se(i),t.event.mouse===!0&&(document.body.classList.add("no-pointer-events--children"),document.body.classList.add("non-selectable"),Vt(),t.styleCleanup=L=>{t.styleCleanup=void 0,document.body.classList.remove("non-selectable");const C=()=>{document.body.classList.remove("no-pointer-events--children")};L===!0?setTimeout(C,50):C()}),t.handler({evt:i,touch:t.event.mouse!==!0,mouse:t.event.mouse,direction:t.event.dir,duration:g,distance:{x:u,y:b}})):t.end(i)},end(i){t.event!==void 0&&(De(t,"temp"),re.is.firefox===!0&&Se(e,!1),t.styleCleanup!==void 0&&t.styleCleanup(!0),i!==void 0&&t.event.dir!==!1&&se(i),t.event=void 0)}};if(e.__qtouchswipe=t,f.mouse===!0){const i=f.mouseCapture===!0||f.mousecapture===!0?"Capture":"";fe(t,"main",[[e,"mousedown","mouseStart",`passive${i}`]])}re.has.touch===!0&&fe(t,"main",[[e,"touchstart","touchStart",`passive${f.capture===!0?"Capture":""}`],[e,"touchmove","noop","notPassiveCapture"]])},updated(e,n){const p=e.__qtouchswipe;p!==void 0&&(n.oldValue!==n.value&&(typeof n.value!="function"&&p.end(),p.handler=n.value),p.direction=Xe(n.modifiers))},beforeUnmount(e){const n=e.__qtouchswipe;n!==void 0&&(De(n,"main"),De(n,"temp"),re.is.firefox===!0&&Se(e,!1),n.styleCleanup!==void 0&&n.styleCleanup(),delete e.__qtouchswipe)}});const oa={name:{required:!0},disable:Boolean},et={setup(e,{slots:n}){return()=>$("div",{class:"q-panel scroll",role:"tabpanel"},_e(n.default))}},ra={modelValue:{required:!0},animated:Boolean,infinite:Boolean,swipeable:Boolean,vertical:Boolean,transitionPrev:String,transitionNext:String,transitionDuration:{type:[String,Number],default:300},keepAlive:Boolean,keepAliveInclude:[String,Array,RegExp],keepAliveExclude:[String,Array,RegExp],keepAliveMax:Number},ia=["update:modelValue","beforeTransition","transition"];function sa(){const{props:e,emit:n,proxy:p}=he(),{getCacheWithFn:f}=zt();let o,t;const i=w(null),g=w(null);function x(h){const k=e.vertical===!0?"up":"left";E((p.$q.lang.rtl===!0?-1:1)*(h.direction===k?1:-1))}const q=S(()=>[[la,x,void 0,{horizontal:e.vertical!==!0,vertical:e.vertical,mouse:!0}]]),u=S(()=>e.transitionPrev||`slide-${e.vertical===!0?"down":"right"}`),c=S(()=>e.transitionNext||`slide-${e.vertical===!0?"up":"left"}`),b=S(()=>`--q-transition-duration: ${e.transitionDuration}ms`),v=S(()=>typeof e.modelValue=="string"||typeof e.modelValue=="number"?e.modelValue:String(e.modelValue)),A=S(()=>({include:e.keepAliveInclude,exclude:e.keepAliveExclude,max:e.keepAliveMax})),L=S(()=>e.keepAliveInclude!==void 0||e.keepAliveExclude!==void 0);ie(()=>e.modelValue,(h,k)=>{const V=d(h)===!0?O(h):-1;t!==!0&&M(V===-1?0:V<O(k)?-1:1),i.value!==V&&(i.value=V,n("beforeTransition",h,k),Rt(()=>{n("transition",h,k)}))});function C(){E(1)}function y(){E(-1)}function _(h){n("update:modelValue",h)}function d(h){return h!=null&&h!==""}function O(h){return o.findIndex(k=>k.props.name===h&&k.props.disable!==""&&k.props.disable!==!0)}function U(){return o.filter(h=>h.props.disable!==""&&h.props.disable!==!0)}function M(h){const k=h!==0&&e.animated===!0&&i.value!==-1?"q-transition--"+(h===-1?u.value:c.value):null;g.value!==k&&(g.value=k)}function E(h,k=i.value){let V=k+h;for(;V>-1&&V<o.length;){const K=o[V];if(K!==void 0&&K.props.disable!==""&&K.props.disable!==!0){M(h),t=!0,n("update:modelValue",K.props.name),setTimeout(()=>{t=!1});return}V+=h}e.infinite===!0&&o.length!==0&&k!==-1&&k!==o.length&&E(h,h===-1?o.length:-1)}function j(){const h=O(e.modelValue);return i.value!==h&&(i.value=h),!0}function H(){const h=d(e.modelValue)===!0&&j()&&o[i.value];return e.keepAlive===!0?[$(Mt,A.value,[$(L.value===!0?f(v.value,()=>({...et,name:v.value})):et,{key:v.value,style:b.value},()=>h)])]:[$("div",{class:"q-panel scroll",style:b.value,key:v.value,role:"tabpanel"},[h])]}function Te(){if(o.length!==0)return e.animated===!0?[$(It,{name:g.value},H)]:H()}function ye(h){return o=$t(_e(h.default,[])).filter(k=>k.props!==null&&k.props.slot===void 0&&d(k.props.name)===!0),o.length}function Ce(){return o}return Object.assign(p,{next:C,previous:y,goTo:_}),{panelIndex:i,panelDirectives:q,updatePanelsList:ye,updatePanelIndex:j,getPanelContent:Te,getEnabledPanels:U,getPanels:Ce,isValidPanelName:d,keepAliveProps:A,needsUniqueKeepAliveWrapper:L,goToPanelByOffset:E,goToPanel:_,nextPanel:C,previousPanel:y}}var Re=ge({name:"QTabPanel",props:oa,setup(e,{slots:n}){return()=>$("div",{class:"q-tab-panel",role:"tabpanel"},_e(n.default))}}),ua=ge({name:"QTabPanels",props:{...ra,...Bt},emits:ia,setup(e,{slots:n}){const p=he(),f=Ot(e,p.proxy.$q),{updatePanelsList:o,getPanelContent:t,panelDirectives:i}=sa(),g=S(()=>"q-tab-panels q-panel-parent"+(f.value===!0?" q-tab-panels--dark q-dark":""));return()=>(o(n),Et("div",{class:g.value},t(),"pan",e.swipeable,()=>i.value))}});const ca=D("div",{class:"text-h6"},"Quotation Review",-1),da={class:"row q-py-md"},va={class:"col"},fa={class:"col q-pl-md"},ma={class:"row q-pb-md"},pa={class:"col"},ba={__name:"viewListApprovalItem",props:{dataHeader:Array,cd:String,typeCD:String},setup(e){const{dialogRef:n,onDialogHide:p,onDialogOK:f,onDialogCancel:o}=rt(),t=Be(),i=e;pe(()=>{c.value=i.dataHeader});const g=w(!1),x=w([{name:"MITM_ITMNM",label:"Item Name",field:"MITM_ITMNM",sortable:!0,align:"left"},{name:"TQUODETA_USAGE_DESCRIPTION",label:"Usage",field:"TQUODETA_USAGE_DESCRIPTION",sortable:!0,align:"left"},{name:"TQUODETA_PRC",label:"Price",field:"TQUODETA_PRC",sortable:!0,align:"left",format:C=>C.toLocaleString()},{name:"TQUODETA_OPRPRC",label:"Operator",field:"TQUODETA_OPRPRC",sortable:!0,align:"left",format:C=>C.toLocaleString()},{name:"TQUODETA_MOBDEMOB",label:"MOB DEMOB",field:"TQUODETA_MOBDEMOB",sortable:!0,align:"left",format:C=>C.toLocaleString()},{name:"SUBTOT",label:"SUBTOTAL",sortable:!0,field:C=>C.TQUODETA_PRC+C.TQUODETA_OPRPRC+C.TQUODETA_MOBDEMOB,align:"left",format:C=>C.toLocaleString()}]),q=w([]),u=w("items"),c=w({MCUS_CUSNM:"",TQUO_ATTN:"",TQUO_SBJCT:""});pe(()=>{b()});const b=async()=>{g.value=!0,await Me.get(`${i.typeCD}/${btoa(i.cd)}`).then(C=>{g.value=!1,q.value=C.data}).catch(C=>{g.value=!1})},v=()=>{},A=()=>{t.dialog({title:"Confirm",message:"Are you sure want to Reject this quotation ?",cancel:!0,persistent:!0}).onOk(async C=>{t.dialog({title:"Prompt",message:"Input reject reason.",prompt:{model:"",isValid:y=>y.length>2,type:"text"},cancel:!0,persistent:!0}).onOk(async y=>{g.value=!0,await Me.put(`revise/quotations/${btoa(i.cd)}`,{remark:y}).then(_=>{g.value=!1,q.value=_.data}).catch(_=>{g.value=!1})})})},L=()=>{};return(C,y)=>(B(),X(ot,{ref_key:"dialogRef",ref:n,onHide:ce(p),"transition-show":"slide-up","transition-hide":"slide-down","full-width":"",persistent:""},{default:s(()=>[l(be,{class:"q-dialog-plugin bg-white q-pa-sm"},{default:s(()=>[l(J,null,{default:s(()=>[ca]),_:1}),l(J,{class:"q-pa-sm",style:{height:"70vh",overflow:"auto"}},{default:s(()=>[l(ea,{modelValue:u.value,"onUpdate:modelValue":y[0]||(y[0]=_=>u.value=_),dense:"",class:"text-grey","active-color":"primary","indicator-color":"primary",align:"justify","narrow-indicator":""},{default:s(()=>[l(xe,{name:"items",label:"Items"}),l(xe,{name:"conditions",label:"Conditions"}),l(xe,{name:"histCond",label:"Approval History"})]),_:1},8,["modelValue"]),l(nt),l(ua,{modelValue:u.value,"onUpdate:modelValue":y[4]||(y[4]=_=>u.value=_),animated:""},{default:s(()=>[l(Re,{name:"items"},{default:s(()=>[D("div",da,[D("div",va,[l(me,{dense:"",filled:"",label:"Customer Name",modelValue:c.value.APP_CUSNM,"onUpdate:modelValue":y[1]||(y[1]=_=>c.value.APP_CUSNM=_),readonly:""},null,8,["modelValue"])]),D("div",fa,[l(me,{dense:"",filled:"",label:"Attn.",modelValue:c.value.APP_ATTN,"onUpdate:modelValue":y[2]||(y[2]=_=>c.value.APP_ATTN=_),readonly:""},null,8,["modelValue"])])]),D("div",ma,[D("div",pa,[l(me,{dense:"",filled:"",label:"Subject",modelValue:c.value.APP_SBJCT,"onUpdate:modelValue":y[3]||(y[3]=_=>c.value.APP_SBJCT=_),readonly:""},null,8,["modelValue"])])]),i.typeCD=="quotation"?(B(),X(Oe,{key:0,title:"Item List",rows:q.value.dataItem,columns:x.value,"row-key":"name",dense:"",loading:g.value},null,8,["rows","columns","loading"])):Lt("",!0)]),_:1}),l(Re,{name:"conditions"},{default:s(()=>[l(Ye,{bordered:"",dense:""},{default:s(()=>[(B(!0),z(ee,null,ue(q.value.dataCondition,(_,d)=>Ie((B(),X(Ge,{clickable:"",key:d},{default:s(()=>[l(le,{avatar:""},{default:s(()=>[l(Qt,{color:"primary","text-color":"white",size:"sm"},{default:s(()=>[W(N(d+1),1)]),_:2},1024)]),_:2},1024),l(le,null,{default:s(()=>[W(N(_.TQUOCOND_CONDI),1)]),_:2},1024)]),_:2},1024)),[[$e]])),128))]),_:1})]),_:1}),l(Re,{name:"histCond"},{default:s(()=>[l(Ye,{bordered:"",separator:""},{default:s(()=>[(B(!0),z(ee,null,ue(q.value.approvalHistories,(_,d)=>Ie((B(),X(Ge,{clickable:"",key:d},{default:s(()=>[l(le,null,{default:s(()=>[l(oe,null,{default:s(()=>[W(N(ce(it).formatDate(_.created_at,"DD MMM YYYY HH:mm")),1)]),_:2},1024),l(oe,{caption:""},{default:s(()=>[W("Time")]),_:1})]),_:2},1024),l(le,null,{default:s(()=>[l(oe,null,{default:s(()=>[W(N(_.type==2?"Rejected":"Approved"),1)]),_:2},1024),l(oe,{caption:""},{default:s(()=>[W("Status")]),_:1})]),_:2},1024),l(le,null,{default:s(()=>[l(oe,null,{default:s(()=>[W(N(_.remark),1)]),_:2},1024),l(oe,{caption:""},{default:s(()=>[W("Remarks")]),_:1})]),_:2},1024),l(le,{side:""},{default:s(()=>[l(te,{name:_.type==2?"cancel":"check_circle",color:_.type==2?"red":"green"},null,8,["name","color"])]),_:2},1024)]),_:2},1024)),[[$e]])),128))]),_:1})]),_:1})]),_:1},8,["modelValue"])]),_:1}),l(lt,{align:"center"},{default:s(()=>[l(jt,null,{default:s(()=>[l(Z,{color:"primary",icon:"print",disable:q.value.length===0,onClick:y[5]||(y[5]=_=>L())},null,8,["disable"]),l(Z,{color:"primary",icon:"check",label:"Approve",disable:q.value.length===0,onClick:y[6]||(y[6]=_=>v())},null,8,["disable"]),l(Z,{color:"red",icon:"cancel",label:"Reject",disable:q.value.length===0,onClick:y[7]||(y[7]=_=>A())},null,8,["disable"]),l(Z,{color:"orange",flat:"",label:"cancel",onClick:ce(o)},null,8,["onClick"])]),_:1})]),_:1})]),_:1})]),_:1},8,["onHide"]))}},ha=D("div",{class:"text-h6"},"Approval List",-1),ga={class:"q-pa-xs col-xs-12 col-sm-6 col-md-4"},_a={class:"text-h5 text-bold"},Ta={class:"text-h6 text-bold"},ya={class:"text-subtitle2"},Ca={class:"row"},Pa={class:"col"},wa={class:"col text-right"},Aa={__name:"viewListApproval",props:{listApprv:Array,typeAPI:String},setup(e){const n=Be(),p=e,f=w([{name:"APP_CD",label:"Doc Code",field:"APP_CD"},{name:"APP_CUSNM",label:"Customer",field:"APP_CUSNM"},{name:"APP_SBJCT",label:"Subject",field:"APP_SBJCT"},{name:"APP_ATTN",label:"Attn",field:"APP_ATTN"},{name:"CREATED_AT",label:"Created Date",field:"CREATED_AT"}]),o=w(""),t=(c,b="days")=>{const v=new Date,A=new Date(c);return it.getDateDiff(v,A,b)},i=(c,b)=>{let v="";p.typeAPI=="quot"?v="quotation":p.typeAPI=="pr"?v="purchase-request-approval":p.typeAPI=="po"&&(v="purchase-order/approval-document"),n.dialog({component:ba,componentProps:{dataHeader:b,cd:c,typeCD:v}}).onOk(async A=>{quotationGroupConditions.value=A.MCONDITION_RPT_STAT,quotationConditions.value=A.group})},{dialogRef:g,onDialogHide:x,onDialogOK:q,onDialogCancel:u}=rt();return(c,b)=>(B(),X(ot,{ref_key:"dialogRef",ref:g,onHide:ce(x),"transition-show":"slide-up","transition-hide":"slide-down","full-width":"",persistent:""},{default:s(()=>[l(be,{class:"q-dialog-plugin bg-white q-pa-sm"},{default:s(()=>[l(J,null,{default:s(()=>[ha]),_:1}),l(J,{class:"q-pa-sm",style:{height:"70vh",overflow:"auto"}},{default:s(()=>[l(Oe,{grid:"",flat:"",bordered:"","card-container-class":c.cardContainerClass,title:"Outstanding Approval",rows:p.listApprv,columns:f.value,"row-key":"name",filter:o.value,"hide-header":"",pagination:{rowsPerPage:50},"rows-per-page-options":c.rowsPerPageOptions},{"top-right":s(()=>[l(me,{borderless:"",dense:"",debounce:"300",modelValue:o.value,"onUpdate:modelValue":b[0]||(b[0]=v=>o.value=v),placeholder:"Search"},{append:s(()=>[l(te,{name:"search"})]),_:1},8,["modelValue"])]),item:s(v=>[D("div",ga,[l(be,{flat:"",bordered:""},{default:s(()=>[l(J,{class:"text-center bg-secondary text-white"},{default:s(()=>[D("div",_a,N(v.row.APP_CUSNM),1)]),_:2},1024),l(nt),l(J,null,{default:s(()=>[D("div",Ta,N(v.row.APP_CD),1),D("div",ya,N(v.row.APP_SBJCT),1)]),_:2},1024),l(J,null,{default:s(()=>[D("div",Ca,[D("div",Pa,[l(Z,{label:"Preview",color:"primary",outline:"",onClick:A=>i(v.row.APP_CD,v.row)},null,8,["onClick"])]),D("div",wa,N(t(v.row.CREATED_AT)<30?`${t(v.row.CREATED_AT)} Days Ago`:`${t(v.row.CREATED_AT,"months")} Month ago`),1)])]),_:2},1024)]),_:2},1024)])]),_:1},8,["card-container-class","rows","columns","filter","rows-per-page-options"])]),_:1}),l(lt,{align:"right"},{default:s(()=>[l(Z,{label:"OK",color:"primary",onClick:b[1]||(b[1]=v=>ce(q)()),disable:c.stateSubmit},null,8,["disable"])]),_:1})]),_:1})]),_:1},8,["onHide"]))}},ka={class:"q-pa-md bg-grey-5 window-height"},qa={class:"row"},Sa={class:"row"},Da={class:"col"},xa={class:"text-h3 text-cyan"},Ra={class:"text-subtitle2 text-cyan"},Ia={class:"col text-right"},$a={class:"row q-pa-sm"},Ma={class:"col"},Ba={key:1},Ua={__name:"dashboardView",setup(e){const n=Be(),p=w([{total:900,title:"Total Sales",icon:"shopping_cart",color:"cyan"},{total:900,title:"Total Purchase",icon:"shopping_bag",color:"cyan"},{total:900,title:"Total Profit",icon:"payments",color:"cyan"},{total:15,title:"Total Customer",icon:"group",color:"cyan"},{total:15,title:"Total Customer",icon:"group",color:"cyan"},{total:15,title:"Total Customer",icon:"group",color:"cyan"},{total:15,title:"Total Customer",icon:"group",color:"cyan"},{total:15,title:"Total Customer",icon:"group",color:"cyan"}]),f=w([{name:"name",label:"Business",field:"name",sortable:!0,align:"left"},{name:"quot",label:"Quotation",field:"quot_count",sortable:!0,align:"center"},{name:"pr",label:"Purchase Request",field:"pr_count",sortable:!0,align:"center"},{name:"po",label:"Purchase Order",field:"po_count",sortable:!0,align:"center"}]),o=w([]),t=w(!1);w(null),pe(async()=>{await i()});const i=async()=>{t.value=!0,await Me.get("/approval/notificationsAPI/top-user").then(x=>{t.value=!1,o.value=x.data}).catch(x=>{t.value=!1})},g=(x,q)=>{n.dialog({component:Aa,componentProps:{listApprv:x,typeAPI:q}}).onOk(async u=>{quotationGroupConditions.value=u.MCONDITION_RPT_STAT,quotationConditions.value=u.group})};return(x,q)=>(B(),z("div",ka,[D("div",qa,[(B(!0),z(ee,null,ue(p.value,(u,c)=>(B(),z("div",{class:Nt("col-3 q-pa-sm"),key:c},[l(be,null,{default:s(()=>[l(J,null,{default:s(()=>[D("div",Sa,[D("div",Da,[D("div",xa,N(u.total),1),D("div",Ra,N(u.title),1)]),D("div",Ia,[l(te,{name:u.icon,size:"4.4em",color:u.color},null,8,["name","color"])])])]),_:2},1024)]),_:2},1024)]))),128))]),D("div",$a,[D("div",Ma,[l(Oe,{flat:"",bordered:"",title:"Approval List",rows:o.value,columns:f.value,"row-key":"name",loading:t.value},{"top-right":s(()=>[l(Z,{flat:"",icon:"refresh",color:"cyan",onClick:i})]),header:s(u=>[l(Je,{props:u},{default:s(()=>[(B(!0),z(ee,null,ue(u.cols,c=>(B(),X(Ht,{key:c.name,props:u},{default:s(()=>[W(N(c.label),1)]),_:2},1032,["props"]))),128))]),_:2},1032,["props"])]),body:s(u=>[l(Je,{props:u},{default:s(()=>[(B(!0),z(ee,null,ue(u.cols,c=>(B(),X(Wt,{key:c.name,props:u},{default:s(()=>[c.name==="quot"||c.name==="pr"||c.name==="po"||c.name==="spk"?(B(),z(ee,{key:0},[c.value>0?(B(),X(Z,{key:0,flat:"",color:"blue",onClick:b=>g(u.row[c.name.split("_")[0]],c.name)},{default:s(()=>[D("b",null,N(c.value),1)]),_:2},1032,["onClick"])):(B(),z("span",Ba,N(c.value),1))],64)):(B(),z(ee,{key:1},[W(N(c.value),1)],64))]),_:2},1032,["props"]))),128))]),_:2},1032,["props"])]),_:1},8,["rows","columns","loading"])])])]))}};export{Ua as default};
