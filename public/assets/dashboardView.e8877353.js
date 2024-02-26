import{i as _t,e as ke,s as w,a as k,j as et,o as be,b4 as tt,a_ as Ie,ap as $e,h as I,a3 as se,a5 as Tt,aI as yt,aa as te,y as Ct,g as he,aD as Pt,b5 as wt,c as ge,W as qe,X as We,w as ie,p as At,af as kt,ag as qt,d as _e,aU as St,a8 as re,n as Dt,b6 as xt,a1 as fe,b7 as Se,at as Fe,a0 as De,F as Rt,a2 as It,b8 as $t,b9 as Mt,ab as Bt,ac as Lt,an as Ot,B as M,C as J,D as i,E as o,J as pe,K as G,S as at,I as q,P as me,b0 as Et,R as j,aY as Z,aZ as ue,b1 as Qt,H as z,a$ as E,M as ce,L as nt,Q as ee,O as lt,ba as Nt}from"./index.5afd1def.js";import{w as Ut,i as Vt,u as ot,b as Me,a as Be,Q as Ke,m as Ye,n as le,o as oe,c as Ht,q as jt}from"./use-dialog-plugin-component.1cf83508.js";import{u as zt,d as rt,Q as Ge,b as Wt}from"./date.029cebdf.js";import{api_web as it}from"./axios.bbc8d7b0.js";import{Q as Ft}from"./QResizeObserver.20173565.js";let Kt=0;const Yt=["click","keydown"],Gt={icon:String,label:[Number,String],alert:[Boolean,String],alertIcon:String,name:{type:[Number,String],default:()=>`t_${Kt++}`},noCaps:Boolean,tabindex:[String,Number],disable:Boolean,contentClass:String,ripple:{type:[Boolean,Object],default:!0}};function Jt(e,n,p,f){const l=_t(tt,ke);if(l===ke)return console.error("QTab/QRouteTab component needs to be child of QTabs"),ke;const{proxy:t}=he(),s=w(null),y=w(null),S=w(null),D=k(()=>e.disable===!0||e.ripple===!1?!1:Object.assign({keyCodes:[13,32],early:!0},e.ripple===!0?{}:e.ripple)),u=k(()=>l.currentModel.value===e.name),m=k(()=>"q-tab relative-position self-stretch flex flex-center text-center"+(u.value===!0?" q-tab--active"+(l.tabProps.value.activeClass?" "+l.tabProps.value.activeClass:"")+(l.tabProps.value.activeColor?` text-${l.tabProps.value.activeColor}`:"")+(l.tabProps.value.activeBgColor?` bg-${l.tabProps.value.activeBgColor}`:""):" q-tab--inactive")+(e.icon&&e.label&&l.tabProps.value.inlineLabel===!1?" q-tab--full":"")+(e.noCaps===!0||l.tabProps.value.noCaps===!0?" q-tab--no-caps":"")+(e.disable===!0?" disabled":" q-focusable q-hoverable cursor-pointer")+(f!==void 0?f.linkClass.value:"")),h=k(()=>"q-tab__content self-stretch flex-center relative-position q-anchor--skip non-selectable "+(l.tabProps.value.inlineLabel===!0?"row no-wrap q-tab__content--inline":"column")+(e.contentClass!==void 0?` ${e.contentClass}`:"")),c=k(()=>e.disable===!0||l.hasFocus.value===!0||u.value===!1&&l.hasActiveTab.value===!0?-1:e.tabindex||0);function d(v,B){if(B!==!0&&s.value!==null&&s.value.focus(),e.disable===!0){f!==void 0&&f.hasRouterLink.value===!0&&se(v);return}if(f===void 0){l.updateModel({name:e.name}),p("click",v);return}if(f.hasRouterLink.value===!0){const N=($={})=>{let L;const V=$.to===void 0||Pt($.to,e.to)===!0?l.avoidRouteWatcher=wt():null;return f.navigateToRouterLink(v,{...$,returnRouterError:!0}).catch(H=>{L=H}).then(H=>{if(V===l.avoidRouteWatcher&&(l.avoidRouteWatcher=!1,L===void 0&&(H===void 0||H.message!==void 0&&H.message.startsWith("Avoided redundant navigation")===!0)&&l.updateModel({name:e.name})),$.returnRouterError===!0)return L!==void 0?Promise.reject(L):H})};p("click",v,N),v.defaultPrevented!==!0&&N();return}p("click",v)}function C(v){Tt(v,[13,32])?d(v,!0):yt(v)!==!0&&v.keyCode>=35&&v.keyCode<=40&&v.altKey!==!0&&v.metaKey!==!0&&l.onKbdNavigate(v.keyCode,t.$el)===!0&&se(v),p("keydown",v)}function _(){const v=l.tabProps.value.narrowIndicator,B=[],N=I("div",{ref:S,class:["q-tab__indicator",l.tabProps.value.indicatorClass]});e.icon!==void 0&&B.push(I(te,{class:"q-tab__icon",name:e.icon})),e.label!==void 0&&B.push(I("div",{class:"q-tab__label"},e.label)),e.alert!==!1&&B.push(e.alertIcon!==void 0?I(te,{class:"q-tab__alert-icon",color:e.alert!==!0?e.alert:void 0,name:e.alertIcon}):I("div",{class:"q-tab__alert"+(e.alert!==!0?` text-${e.alert}`:"")})),v===!0&&B.push(N);const $=[I("div",{class:"q-focus-helper",tabindex:-1,ref:s}),I("div",{class:h.value},Ct(n.default,B))];return v===!1&&$.push(N),$}const Q={name:k(()=>e.name),rootRef:y,tabIndicatorRef:S,routeData:f};et(()=>{l.unregisterTab(Q)}),be(()=>{l.registerTab(Q)});function X(v,B){const N={ref:y,class:m.value,tabindex:c.value,role:"tab","aria-selected":u.value===!0?"true":"false","aria-disabled":e.disable===!0?"true":void 0,onClick:d,onKeydown:C,...B};return Ie(I(v,N,_()),[[$e,D.value]])}return{renderTab:X,$tabs:l}}var xe=ge({name:"QTab",props:Gt,emits:Yt,setup(e,{slots:n,emit:p}){const{renderTab:f}=Jt(e,n,p);return()=>f("div")}});function Xt(e,n,p){const f=p===!0?["left","right"]:["top","bottom"];return`absolute-${n===!0?f[0]:f[1]}${e?` text-${e}`:""}`}const Zt=["left","center","right","justify"];var ea=ge({name:"QTabs",props:{modelValue:[Number,String],align:{type:String,default:"center",validator:e=>Zt.includes(e)},breakpoint:{type:[String,Number],default:600},vertical:Boolean,shrink:Boolean,stretch:Boolean,activeClass:String,activeColor:String,activeBgColor:String,indicatorColor:String,leftIcon:String,rightIcon:String,outsideArrows:Boolean,mobileArrows:Boolean,switchIndicator:Boolean,narrowIndicator:Boolean,inlineLabel:Boolean,noCaps:Boolean,dense:Boolean,contentClass:String,"onUpdate:modelValue":[Function,Array]},setup(e,{slots:n,emit:p}){const{proxy:f}=he(),{$q:l}=f,{registerTick:t}=qe(),{registerTick:s}=qe(),{registerTick:y}=qe(),{registerTimeout:S,removeTimeout:D}=We(),{registerTimeout:u,removeTimeout:m}=We(),h=w(null),c=w(null),d=w(e.modelValue),C=w(!1),_=w(!0),Q=w(!1),X=w(!1),v=[],B=w(0),N=w(!1);let $=null,L=null,V;const H=k(()=>({activeClass:e.activeClass,activeColor:e.activeColor,activeBgColor:e.activeBgColor,indicatorClass:Xt(e.indicatorColor,e.switchIndicator,e.vertical),narrowIndicator:e.narrowIndicator,inlineLabel:e.inlineLabel,noCaps:e.noCaps})),Te=k(()=>{const a=B.value,r=d.value;for(let b=0;b<a;b++)if(v[b].name.value===r)return!0;return!1}),ye=k(()=>`q-tabs__content--align-${C.value===!0?"left":X.value===!0?"justify":e.align}`),Ce=k(()=>`q-tabs row no-wrap items-center q-tabs--${C.value===!0?"":"not-"}scrollable q-tabs--${e.vertical===!0?"vertical":"horizontal"} q-tabs__arrows--${e.outsideArrows===!0?"outside":"inside"} q-tabs--mobile-with${e.mobileArrows===!0?"":"out"}-arrows`+(e.dense===!0?" q-tabs--dense":"")+(e.shrink===!0?" col-shrink":"")+(e.stretch===!0?" self-stretch":"")),g=k(()=>"q-tabs__content scroll--mobile row no-wrap items-center self-stretch hide-scrollbar relative-position "+ye.value+(e.contentClass!==void 0?` ${e.contentClass}`:"")),A=k(()=>e.vertical===!0?{container:"height",content:"offsetHeight",scroll:"scrollHeight"}:{container:"width",content:"offsetWidth",scroll:"scrollWidth"}),U=k(()=>e.vertical!==!0&&l.lang.rtl===!0),F=k(()=>Ut===!1&&U.value===!0);ie(U,ne),ie(()=>e.modelValue,a=>{Pe({name:a,setCurrent:!0,skipEmit:!0})}),ie(()=>e.outsideArrows,de);function Pe({name:a,setCurrent:r,skipEmit:b}){d.value!==a&&(b!==!0&&e["onUpdate:modelValue"]!==void 0&&p("update:modelValue",a),(r===!0||e["onUpdate:modelValue"]===void 0)&&(st(d.value,a),d.value=a))}function de(){t(()=>{Oe({width:h.value.offsetWidth,height:h.value.offsetHeight})})}function Oe(a){if(A.value===void 0||c.value===null)return;const r=a[A.value.container],b=Math.min(c.value[A.value.scroll],Array.prototype.reduce.call(c.value.children,(R,P)=>R+(P[A.value.content]||0),0)),x=r>0&&b>r;C.value=x,x===!0&&s(ne),X.value=r<parseInt(e.breakpoint,10)}function st(a,r){const b=a!=null&&a!==""?v.find(R=>R.name.value===a):null,x=r!=null&&r!==""?v.find(R=>R.name.value===r):null;if(b&&x){const R=b.tabIndicatorRef.value,P=x.tabIndicatorRef.value;$!==null&&(clearTimeout($),$=null),R.style.transition="none",R.style.transform="none",P.style.transition="none",P.style.transform="none";const T=R.getBoundingClientRect(),O=P.getBoundingClientRect();P.style.transform=e.vertical===!0?`translate3d(0,${T.top-O.top}px,0) scale3d(1,${O.height?T.height/O.height:1},1)`:`translate3d(${T.left-O.left}px,0,0) scale3d(${O.width?T.width/O.width:1},1,1)`,y(()=>{$=setTimeout(()=>{$=null,P.style.transition="transform .25s cubic-bezier(.4, 0, .2, 1)",P.style.transform="none"},70)})}x&&C.value===!0&&ae(x.rootRef.value)}function ae(a){const{left:r,width:b,top:x,height:R}=c.value.getBoundingClientRect(),P=a.getBoundingClientRect();let T=e.vertical===!0?P.top-x:P.left-r;if(T<0){c.value[e.vertical===!0?"scrollTop":"scrollLeft"]+=Math.floor(T),ne();return}T+=e.vertical===!0?P.height-R:P.width-b,T>0&&(c.value[e.vertical===!0?"scrollTop":"scrollLeft"]+=Math.ceil(T),ne())}function ne(){const a=c.value;if(a===null)return;const r=a.getBoundingClientRect(),b=e.vertical===!0?a.scrollTop:Math.abs(a.scrollLeft);U.value===!0?(_.value=Math.ceil(b+r.width)<a.scrollWidth-1,Q.value=b>0):(_.value=b>0,Q.value=e.vertical===!0?Math.ceil(b+r.height)<a.scrollHeight:Math.ceil(b+r.width)<a.scrollWidth)}function Ee(a){L!==null&&clearInterval(L),L=setInterval(()=>{dt(a)===!0&&K()},5)}function Qe(){Ee(F.value===!0?Number.MAX_SAFE_INTEGER:0)}function Ne(){Ee(F.value===!0?0:Number.MAX_SAFE_INTEGER)}function K(){L!==null&&(clearInterval(L),L=null)}function ut(a,r){const b=Array.prototype.filter.call(c.value.children,O=>O===r||O.matches&&O.matches(".q-tab.q-focusable")===!0),x=b.length;if(x===0)return;if(a===36)return ae(b[0]),b[0].focus(),!0;if(a===35)return ae(b[x-1]),b[x-1].focus(),!0;const R=a===(e.vertical===!0?38:37),P=a===(e.vertical===!0?40:39),T=R===!0?-1:P===!0?1:void 0;if(T!==void 0){const O=U.value===!0?-1:1,W=b.indexOf(r)+T*O;return W>=0&&W<x&&(ae(b[W]),b[W].focus({preventScroll:!0})),!0}}const ct=k(()=>F.value===!0?{get:a=>Math.abs(a.scrollLeft),set:(a,r)=>{a.scrollLeft=-r}}:e.vertical===!0?{get:a=>a.scrollTop,set:(a,r)=>{a.scrollTop=r}}:{get:a=>a.scrollLeft,set:(a,r)=>{a.scrollLeft=r}});function dt(a){const r=c.value,{get:b,set:x}=ct.value;let R=!1,P=b(r);const T=a<P?-1:1;return P+=T*5,P<0?(R=!0,P=0):(T===-1&&P<=a||T===1&&P>=a)&&(R=!0,P=a),x(r,P),ne(),R}function Ue(a,r){for(const b in a)if(a[b]!==r[b])return!1;return!0}function vt(){let a=null,r={matchedLen:0,queryDiff:9999,hrefLen:0};const b=v.filter(T=>T.routeData!==void 0&&T.routeData.hasRouterLink.value===!0),{hash:x,query:R}=f.$route,P=Object.keys(R).length;for(const T of b){const O=T.routeData.exact.value===!0;if(T.routeData[O===!0?"linkIsExactActive":"linkIsActive"].value!==!0)continue;const{hash:W,query:we,matched:ht,href:gt}=T.routeData.resolvedLink.value,Ae=Object.keys(we).length;if(O===!0){if(W!==x||Ae!==P||Ue(R,we)===!1)continue;a=T.name.value;break}if(W!==""&&W!==x||Ae!==0&&Ue(we,R)===!1)continue;const Y={matchedLen:ht.length,queryDiff:P-Ae,hrefLen:gt.length-W.length};if(Y.matchedLen>r.matchedLen){a=T.name.value,r=Y;continue}else if(Y.matchedLen!==r.matchedLen)continue;if(Y.queryDiff<r.queryDiff)a=T.name.value,r=Y;else if(Y.queryDiff!==r.queryDiff)continue;Y.hrefLen>r.hrefLen&&(a=T.name.value,r=Y)}a===null&&v.some(T=>T.routeData===void 0&&T.name.value===d.value)===!0||Pe({name:a,setCurrent:!0})}function ft(a){if(D(),N.value!==!0&&h.value!==null&&a.target&&typeof a.target.closest=="function"){const r=a.target.closest(".q-tab");r&&h.value.contains(r)===!0&&(N.value=!0,C.value===!0&&ae(r))}}function mt(){S(()=>{N.value=!1},30)}function ve(){He.avoidRouteWatcher===!1?u(vt):m()}function Ve(){if(V===void 0){const a=ie(()=>f.$route.fullPath,ve);V=()=>{a(),V=void 0}}}function bt(a){v.push(a),B.value++,de(),a.routeData===void 0||f.$route===void 0?u(()=>{if(C.value===!0){const r=d.value,b=r!=null&&r!==""?v.find(x=>x.name.value===r):null;b&&ae(b.rootRef.value)}}):(Ve(),a.routeData.hasRouterLink.value===!0&&ve())}function pt(a){v.splice(v.indexOf(a),1),B.value--,de(),V!==void 0&&a.routeData!==void 0&&(v.every(r=>r.routeData===void 0)===!0&&V(),ve())}const He={currentModel:d,tabProps:H,hasFocus:N,hasActiveTab:Te,registerTab:bt,unregisterTab:pt,verifyRouteModel:ve,updateModel:Pe,onKbdNavigate:ut,avoidRouteWatcher:!1};At(tt,He);function je(){$!==null&&clearTimeout($),K(),V!==void 0&&V()}let ze;return et(je),kt(()=>{ze=V!==void 0,je()}),qt(()=>{ze===!0&&Ve(),de()}),()=>I("div",{ref:h,class:Ce.value,role:"tablist",onFocusin:ft,onFocusout:mt},[I(Ft,{onResize:Oe}),I("div",{ref:c,class:g.value,onScroll:ne},_e(n.default)),I(te,{class:"q-tabs__arrow q-tabs__arrow--left absolute q-tab__icon"+(_.value===!0?"":" q-tabs__arrow--faded"),name:e.leftIcon||l.iconSet.tabs[e.vertical===!0?"up":"left"],onMousedownPassive:Qe,onTouchstartPassive:Qe,onMouseupPassive:K,onMouseleavePassive:K,onTouchendPassive:K}),I(te,{class:"q-tabs__arrow q-tabs__arrow--right absolute q-tab__icon"+(Q.value===!0?"":" q-tabs__arrow--faded"),name:e.rightIcon||l.iconSet.tabs[e.vertical===!0?"down":"right"],onMousedownPassive:Ne,onTouchstartPassive:Ne,onMouseupPassive:K,onMouseleavePassive:K,onTouchendPassive:K})])}});const Le={left:!0,right:!0,up:!0,down:!0,horizontal:!0,vertical:!0},ta=Object.keys(Le);Le.all=!0;function Je(e){const n={};for(const p of ta)e[p]===!0&&(n[p]=!0);return Object.keys(n).length===0?Le:(n.horizontal===!0?n.left=n.right=!0:n.left===!0&&n.right===!0&&(n.horizontal=!0),n.vertical===!0?n.up=n.down=!0:n.up===!0&&n.down===!0&&(n.vertical=!0),n.horizontal===!0&&n.vertical===!0&&(n.all=!0),n)}const aa=["INPUT","TEXTAREA"];function Xe(e,n){return n.event===void 0&&e.target!==void 0&&e.target.draggable!==!0&&typeof n.handler=="function"&&aa.includes(e.target.nodeName.toUpperCase())===!1&&(e.qClonedBy===void 0||e.qClonedBy.indexOf(n.uid)===-1)}function na(e){const n=[.06,6,50];return typeof e=="string"&&e.length&&e.split(":").forEach((p,f)=>{const l=parseFloat(p);l&&(n[f]=l)}),n}var la=St({name:"touch-swipe",beforeMount(e,{value:n,arg:p,modifiers:f}){if(f.mouse!==!0&&re.has.touch!==!0)return;const l=f.mouseCapture===!0?"Capture":"",t={handler:n,sensitivity:na(p),direction:Je(f),noop:Dt,mouseStart(s){Xe(s,t)&&xt(s)&&(fe(t,"temp",[[document,"mousemove","move",`notPassive${l}`],[document,"mouseup","end","notPassiveCapture"]]),t.start(s,!0))},touchStart(s){if(Xe(s,t)){const y=s.target;fe(t,"temp",[[y,"touchmove","move","notPassiveCapture"],[y,"touchcancel","end","notPassiveCapture"],[y,"touchend","end","notPassiveCapture"]]),t.start(s)}},start(s,y){re.is.firefox===!0&&Se(e,!0);const S=Fe(s);t.event={x:S.left,y:S.top,time:Date.now(),mouse:y===!0,dir:!1}},move(s){if(t.event===void 0)return;if(t.event.dir!==!1){se(s);return}const y=Date.now()-t.event.time;if(y===0)return;const S=Fe(s),D=S.left-t.event.x,u=Math.abs(D),m=S.top-t.event.y,h=Math.abs(m);if(t.event.mouse!==!0){if(u<t.sensitivity[1]&&h<t.sensitivity[1]){t.end(s);return}}else if(window.getSelection().toString()!==""){t.end(s);return}else if(u<t.sensitivity[2]&&h<t.sensitivity[2])return;const c=u/y,d=h/y;t.direction.vertical===!0&&u<h&&u<100&&d>t.sensitivity[0]&&(t.event.dir=m<0?"up":"down"),t.direction.horizontal===!0&&u>h&&h<100&&c>t.sensitivity[0]&&(t.event.dir=D<0?"left":"right"),t.direction.up===!0&&u<h&&m<0&&u<100&&d>t.sensitivity[0]&&(t.event.dir="up"),t.direction.down===!0&&u<h&&m>0&&u<100&&d>t.sensitivity[0]&&(t.event.dir="down"),t.direction.left===!0&&u>h&&D<0&&h<100&&c>t.sensitivity[0]&&(t.event.dir="left"),t.direction.right===!0&&u>h&&D>0&&h<100&&c>t.sensitivity[0]&&(t.event.dir="right"),t.event.dir!==!1?(se(s),t.event.mouse===!0&&(document.body.classList.add("no-pointer-events--children"),document.body.classList.add("non-selectable"),Vt(),t.styleCleanup=C=>{t.styleCleanup=void 0,document.body.classList.remove("non-selectable");const _=()=>{document.body.classList.remove("no-pointer-events--children")};C===!0?setTimeout(_,50):_()}),t.handler({evt:s,touch:t.event.mouse!==!0,mouse:t.event.mouse,direction:t.event.dir,duration:y,distance:{x:u,y:h}})):t.end(s)},end(s){t.event!==void 0&&(De(t,"temp"),re.is.firefox===!0&&Se(e,!1),t.styleCleanup!==void 0&&t.styleCleanup(!0),s!==void 0&&t.event.dir!==!1&&se(s),t.event=void 0)}};if(e.__qtouchswipe=t,f.mouse===!0){const s=f.mouseCapture===!0||f.mousecapture===!0?"Capture":"";fe(t,"main",[[e,"mousedown","mouseStart",`passive${s}`]])}re.has.touch===!0&&fe(t,"main",[[e,"touchstart","touchStart",`passive${f.capture===!0?"Capture":""}`],[e,"touchmove","noop","notPassiveCapture"]])},updated(e,n){const p=e.__qtouchswipe;p!==void 0&&(n.oldValue!==n.value&&(typeof n.value!="function"&&p.end(),p.handler=n.value),p.direction=Je(n.modifiers))},beforeUnmount(e){const n=e.__qtouchswipe;n!==void 0&&(De(n,"main"),De(n,"temp"),re.is.firefox===!0&&Se(e,!1),n.styleCleanup!==void 0&&n.styleCleanup(),delete e.__qtouchswipe)}});const oa={name:{required:!0},disable:Boolean},Ze={setup(e,{slots:n}){return()=>I("div",{class:"q-panel scroll",role:"tabpanel"},_e(n.default))}},ra={modelValue:{required:!0},animated:Boolean,infinite:Boolean,swipeable:Boolean,vertical:Boolean,transitionPrev:String,transitionNext:String,transitionDuration:{type:[String,Number],default:300},keepAlive:Boolean,keepAliveInclude:[String,Array,RegExp],keepAliveExclude:[String,Array,RegExp],keepAliveMax:Number},ia=["update:modelValue","beforeTransition","transition"];function sa(){const{props:e,emit:n,proxy:p}=he(),{getCacheWithFn:f}=zt();let l,t;const s=w(null),y=w(null);function S(g){const A=e.vertical===!0?"up":"left";L((p.$q.lang.rtl===!0?-1:1)*(g.direction===A?1:-1))}const D=k(()=>[[la,S,void 0,{horizontal:e.vertical!==!0,vertical:e.vertical,mouse:!0}]]),u=k(()=>e.transitionPrev||`slide-${e.vertical===!0?"down":"right"}`),m=k(()=>e.transitionNext||`slide-${e.vertical===!0?"up":"left"}`),h=k(()=>`--q-transition-duration: ${e.transitionDuration}ms`),c=k(()=>typeof e.modelValue=="string"||typeof e.modelValue=="number"?e.modelValue:String(e.modelValue)),d=k(()=>({include:e.keepAliveInclude,exclude:e.keepAliveExclude,max:e.keepAliveMax})),C=k(()=>e.keepAliveInclude!==void 0||e.keepAliveExclude!==void 0);ie(()=>e.modelValue,(g,A)=>{const U=v(g)===!0?B(g):-1;t!==!0&&$(U===-1?0:U<B(A)?-1:1),s.value!==U&&(s.value=U,n("beforeTransition",g,A),Rt(()=>{n("transition",g,A)}))});function _(){L(1)}function Q(){L(-1)}function X(g){n("update:modelValue",g)}function v(g){return g!=null&&g!==""}function B(g){return l.findIndex(A=>A.props.name===g&&A.props.disable!==""&&A.props.disable!==!0)}function N(){return l.filter(g=>g.props.disable!==""&&g.props.disable!==!0)}function $(g){const A=g!==0&&e.animated===!0&&s.value!==-1?"q-transition--"+(g===-1?u.value:m.value):null;y.value!==A&&(y.value=A)}function L(g,A=s.value){let U=A+g;for(;U>-1&&U<l.length;){const F=l[U];if(F!==void 0&&F.props.disable!==""&&F.props.disable!==!0){$(g),t=!0,n("update:modelValue",F.props.name),setTimeout(()=>{t=!1});return}U+=g}e.infinite===!0&&l.length!==0&&A!==-1&&A!==l.length&&L(g,g===-1?l.length:-1)}function V(){const g=B(e.modelValue);return s.value!==g&&(s.value=g),!0}function H(){const g=v(e.modelValue)===!0&&V()&&l[s.value];return e.keepAlive===!0?[I(Mt,d.value,[I(C.value===!0?f(c.value,()=>({...Ze,name:c.value})):Ze,{key:c.value,style:h.value},()=>g)])]:[I("div",{class:"q-panel scroll",style:h.value,key:c.value,role:"tabpanel"},[g])]}function Te(){if(l.length!==0)return e.animated===!0?[I(It,{name:y.value},H)]:H()}function ye(g){return l=$t(_e(g.default,[])).filter(A=>A.props!==null&&A.props.slot===void 0&&v(A.props.name)===!0),l.length}function Ce(){return l}return Object.assign(p,{next:_,previous:Q,goTo:X}),{panelIndex:s,panelDirectives:D,updatePanelsList:ye,updatePanelIndex:V,getPanelContent:Te,getEnabledPanels:N,getPanels:Ce,isValidPanelName:v,keepAliveProps:d,needsUniqueKeepAliveWrapper:C,goToPanelByOffset:L,goToPanel:X,nextPanel:_,previousPanel:Q}}var Re=ge({name:"QTabPanel",props:oa,setup(e,{slots:n}){return()=>I("div",{class:"q-tab-panel",role:"tabpanel"},_e(n.default))}}),ua=ge({name:"QTabPanels",props:{...ra,...Bt},emits:ia,setup(e,{slots:n}){const p=he(),f=Lt(e,p.proxy.$q),{updatePanelsList:l,getPanelContent:t,panelDirectives:s}=sa(),y=k(()=>"q-tab-panels q-panel-parent"+(f.value===!0?" q-tab-panels--dark q-dark":""));return()=>(l(n),Ot("div",{class:y.value},t(),"pan",e.swipeable,()=>s.value))}});const ca=q("div",{class:"text-h6"},"Review Item List",-1),da={class:"row q-py-md"},va={class:"col"},fa={class:"col q-pl-md"},ma={class:"row q-pb-md"},ba={class:"col"},pa={__name:"viewListApprovalItem",props:{dataHeader:Array,cd:String,typeCD:String},setup(e){const{dialogRef:n,onDialogHide:p,onDialogOK:f,onDialogCancel:l}=ot();Me();const t=w({MCUS_CUSNM:"",TQUO_ATTN:"",TQUO_SBJCT:""}),s=e;be(()=>{t.value=s.dataHeader});const y=w(!1),S=w([{name:"MITM_ITMNM",label:"Item Name",field:"MITM_ITMNM",sortable:!0,align:"left"},{name:"TQUODETA_USAGE_DESCRIPTION",label:"Usage",field:"TQUODETA_USAGE_DESCRIPTION",sortable:!0,align:"left"},{name:"TQUODETA_PRC",label:"Price",field:"TQUODETA_PRC",sortable:!0,align:"left",format:d=>d.toLocaleString()},{name:"TQUODETA_OPRPRC",label:"Operator",field:"TQUODETA_OPRPRC",sortable:!0,align:"left",format:d=>d.toLocaleString()},{name:"TQUODETA_MOBDEMOB",label:"MOB DEMOB",field:"TQUODETA_MOBDEMOB",sortable:!0,align:"left",format:d=>d.toLocaleString()},{name:"SUBTOT",label:"SUBTOTAL",sortable:!0,field:d=>d.TQUODETA_PRC+d.TQUODETA_OPRPRC+d.TQUODETA_MOBDEMOB,align:"left",format:d=>d.toLocaleString()}]),D=w([]),u=w("items");be(()=>{m()});const m=async()=>{y.value=!0,await it.get(`${s.typeCD}/${btoa(s.cd)}`).then(d=>{y.value=!1,D.value=d.data}).catch(d=>{y.value=!1})},h=()=>{},c=()=>{};return(d,C)=>(M(),J(lt,{ref_key:"dialogRef",ref:n,onHide:ce(p),"transition-show":"slide-up","transition-hide":"slide-down","full-width":"",persistent:""},{default:i(()=>[o(pe,{class:"q-dialog-plugin bg-white q-pa-sm"},{default:i(()=>[o(G,null,{default:i(()=>[ca]),_:1}),o(G,{class:"q-pa-sm",style:{height:"70vh",overflow:"auto"}},{default:i(()=>[o(ea,{modelValue:u.value,"onUpdate:modelValue":C[0]||(C[0]=_=>u.value=_),dense:"",class:"text-grey","active-color":"primary","indicator-color":"primary",align:"justify","narrow-indicator":""},{default:i(()=>[o(xe,{name:"items",label:"Items"}),o(xe,{name:"conditions",label:"Conditions"}),o(xe,{name:"histCond",label:"Approval History"})]),_:1},8,["modelValue"]),o(at),o(ua,{modelValue:u.value,"onUpdate:modelValue":C[4]||(C[4]=_=>u.value=_),animated:""},{default:i(()=>[o(Re,{name:"items"},{default:i(()=>[q("div",da,[q("div",va,[o(me,{dense:"",filled:"",label:"Customer Name",modelValue:t.value.APP_CUSNM,"onUpdate:modelValue":C[1]||(C[1]=_=>t.value.APP_CUSNM=_),readonly:""},null,8,["modelValue"])]),q("div",fa,[o(me,{dense:"",filled:"",label:"Attn.",modelValue:t.value.APP_ATTN,"onUpdate:modelValue":C[2]||(C[2]=_=>t.value.APP_ATTN=_),readonly:""},null,8,["modelValue"])])]),q("div",ma,[q("div",ba,[o(me,{dense:"",filled:"",label:"Subject",modelValue:t.value.APP_SBJCT,"onUpdate:modelValue":C[3]||(C[3]=_=>t.value.APP_SBJCT=_),readonly:""},null,8,["modelValue"])])]),s.typeCD=="quotation"?(M(),J(Be,{key:0,title:"Item List",rows:D.value.dataItem,columns:S.value,"row-key":"name",dense:"",loading:y.value},null,8,["rows","columns","loading"])):Et("",!0)]),_:1}),o(Re,{name:"conditions"},{default:i(()=>[o(Ke,{bordered:"",dense:""},{default:i(()=>[(M(!0),j(Z,null,ue(D.value.dataCondition,(_,Q)=>Ie((M(),J(Ye,{clickable:"",key:Q},{default:i(()=>[o(le,{avatar:""},{default:i(()=>[o(Qt,{color:"primary","text-color":"white",size:"sm"},{default:i(()=>[z(E(Q+1),1)]),_:2},1024)]),_:2},1024),o(le,null,{default:i(()=>[z(E(_.TQUOCOND_CONDI),1)]),_:2},1024)]),_:2},1024)),[[$e]])),128))]),_:1})]),_:1}),o(Re,{name:"histCond"},{default:i(()=>[o(Ke,{bordered:"",separator:""},{default:i(()=>[(M(!0),j(Z,null,ue(D.value.approvalHistories,(_,Q)=>Ie((M(),J(Ye,{clickable:"",key:Q},{default:i(()=>[o(le,null,{default:i(()=>[o(oe,null,{default:i(()=>[z(E(ce(rt).formatDate(_.created_at,"DD MMM YYYY HH:mm")),1)]),_:2},1024),o(oe,{caption:""},{default:i(()=>[z("Time")]),_:1})]),_:2},1024),o(le,null,{default:i(()=>[o(oe,null,{default:i(()=>[z(E(_.type==2?"Rejected":"Approved"),1)]),_:2},1024),o(oe,{caption:""},{default:i(()=>[z("Status")]),_:1})]),_:2},1024),o(le,null,{default:i(()=>[o(oe,null,{default:i(()=>[z(E(_.remark),1)]),_:2},1024),o(oe,{caption:""},{default:i(()=>[z("Remarks")]),_:1})]),_:2},1024),o(le,{side:""},{default:i(()=>[o(te,{name:_.type==2?"cancel":"check_circle",color:_.type==2?"red":"green"},null,8,["name","color"])]),_:2},1024)]),_:2},1024)),[[$e]])),128))]),_:1})]),_:1})]),_:1},8,["modelValue"])]),_:1}),o(nt,{align:"center"},{default:i(()=>[o(Ht,null,{default:i(()=>[o(ee,{color:"primary",icon:"check",label:"Approve",disable:D.value.length>0,onClick:C[5]||(C[5]=_=>h())},null,8,["disable"]),o(ee,{color:"red",icon:"cancel",label:"Reject",disable:D.value.length>0,onClick:C[6]||(C[6]=_=>c())},null,8,["disable"]),o(ee,{color:"orange",flat:"",label:"cancel",onClick:ce(l)},null,8,["onClick"])]),_:1})]),_:1})]),_:1})]),_:1},8,["onHide"]))}},ha=q("div",{class:"text-h6"},"Approval List",-1),ga={class:"q-pa-xs col-xs-12 col-sm-6 col-md-4"},_a={class:"text-h5 text-bold"},Ta={class:"text-h6 text-bold"},ya={class:"text-subtitle2"},Ca={class:"row"},Pa={class:"col"},wa={class:"col text-right"},Aa={__name:"viewListApproval",props:{listApprv:Array,typeAPI:String},setup(e){const n=Me(),p=e,f=w([{name:"APP_CD",label:"Doc Code",field:"APP_CD"},{name:"APP_CUSNM",label:"Customer",field:"APP_CUSNM"},{name:"APP_SBJCT",label:"Subject",field:"APP_SBJCT"},{name:"APP_ATTN",label:"Attn",field:"APP_ATTN"},{name:"CREATED_AT",label:"Created Date",field:"CREATED_AT"}]),l=w(""),t=(m,h="days")=>{const c=new Date,d=new Date(m);return rt.getDateDiff(c,d,h)},s=(m,h)=>{let c="";p.typeAPI=="quot"?c="quotation":p.typeAPI=="pr"?c="purchase-request-approval":p.typeAPI=="po"&&(c="purchase-order/approval-document"),n.dialog({component:pa,componentProps:{dataHeader:h,cd:m,typeCD:c}}).onOk(async d=>{quotationGroupConditions.value=d.MCONDITION_RPT_STAT,quotationConditions.value=d.group})},{dialogRef:y,onDialogHide:S,onDialogOK:D,onDialogCancel:u}=ot();return(m,h)=>(M(),J(lt,{ref_key:"dialogRef",ref:y,onHide:ce(S),"transition-show":"slide-up","transition-hide":"slide-down","full-width":"",persistent:""},{default:i(()=>[o(pe,{class:"q-dialog-plugin bg-white q-pa-sm"},{default:i(()=>[o(G,null,{default:i(()=>[ha]),_:1}),o(G,{class:"q-pa-sm",style:{height:"70vh",overflow:"auto"}},{default:i(()=>[o(Be,{grid:"",flat:"",bordered:"","card-container-class":m.cardContainerClass,title:"Outstanding Approval",rows:p.listApprv,columns:f.value,"row-key":"name",filter:l.value,"hide-header":"",pagination:{rowsPerPage:50},"rows-per-page-options":m.rowsPerPageOptions},{"top-right":i(()=>[o(me,{borderless:"",dense:"",debounce:"300",modelValue:l.value,"onUpdate:modelValue":h[0]||(h[0]=c=>l.value=c),placeholder:"Search"},{append:i(()=>[o(te,{name:"search"})]),_:1},8,["modelValue"])]),item:i(c=>[q("div",ga,[o(pe,{flat:"",bordered:""},{default:i(()=>[o(G,{class:"text-center bg-secondary text-white"},{default:i(()=>[q("div",_a,E(c.row.APP_CUSNM),1)]),_:2},1024),o(at),o(G,null,{default:i(()=>[q("div",Ta,E(c.row.APP_CD),1),q("div",ya,E(c.row.APP_SBJCT),1)]),_:2},1024),o(G,null,{default:i(()=>[q("div",Ca,[q("div",Pa,[o(ee,{label:"Preview",color:"primary",outline:"",onClick:d=>s(c.row.APP_CD,c.row)},null,8,["onClick"])]),q("div",wa,E(t(c.row.CREATED_AT)<30?`${t(c.row.CREATED_AT)} Days Ago`:`${t(c.row.CREATED_AT,"months")} Month ago`),1)])]),_:2},1024)]),_:2},1024)])]),_:1},8,["card-container-class","rows","columns","filter","rows-per-page-options"])]),_:1}),o(nt,{align:"right"},{default:i(()=>[o(ee,{label:"OK",color:"primary",onClick:h[1]||(h[1]=c=>ce(D)()),disable:m.stateSubmit},null,8,["disable"])]),_:1})]),_:1})]),_:1},8,["onHide"]))}},ka={class:"q-pa-md bg-grey-5 window-height"},qa={class:"row"},Sa={class:"row"},Da={class:"col"},xa={class:"text-h3 text-cyan"},Ra={class:"text-subtitle2 text-cyan"},Ia={class:"col text-right"},$a={class:"row q-pa-sm"},Ma={class:"col"},Ba={key:1},Ua={__name:"dashboardView",setup(e){const n=Me(),p=w([{total:900,title:"Total Sales",icon:"shopping_cart",color:"cyan"},{total:900,title:"Total Purchase",icon:"shopping_bag",color:"cyan"},{total:900,title:"Total Profit",icon:"payments",color:"cyan"},{total:15,title:"Total Customer",icon:"group",color:"cyan"},{total:15,title:"Total Customer",icon:"group",color:"cyan"},{total:15,title:"Total Customer",icon:"group",color:"cyan"},{total:15,title:"Total Customer",icon:"group",color:"cyan"},{total:15,title:"Total Customer",icon:"group",color:"cyan"}]),f=w([{name:"name",label:"Business",field:"name",sortable:!0,align:"left"},{name:"quot",label:"Quotation",field:"quot_count",sortable:!0,align:"center"},{name:"pr",label:"Purchase Request",field:"pr_count",sortable:!0,align:"center"},{name:"po",label:"Purchase Order",field:"po_count",sortable:!0,align:"center"}]),l=w([]),t=w(!1);w(null),be(async()=>{await s()});const s=async()=>{t.value=!0,await it.get("/approval/notificationsAPI/top-user").then(S=>{t.value=!1,l.value=S.data}).catch(S=>{t.value=!1})},y=(S,D)=>{n.dialog({component:Aa,componentProps:{listApprv:S,typeAPI:D}}).onOk(async u=>{quotationGroupConditions.value=u.MCONDITION_RPT_STAT,quotationConditions.value=u.group})};return(S,D)=>(M(),j("div",ka,[q("div",qa,[(M(!0),j(Z,null,ue(p.value,(u,m)=>(M(),j("div",{class:Nt("col-3 q-pa-sm"),key:m},[o(pe,null,{default:i(()=>[o(G,null,{default:i(()=>[q("div",Sa,[q("div",Da,[q("div",xa,E(u.total),1),q("div",Ra,E(u.title),1)]),q("div",Ia,[o(te,{name:u.icon,size:"4.4em",color:u.color},null,8,["name","color"])])])]),_:2},1024)]),_:2},1024)]))),128))]),q("div",$a,[q("div",Ma,[o(Be,{flat:"",bordered:"",title:"Approval List",rows:l.value,columns:f.value,"row-key":"name",loading:t.value},{"top-right":i(()=>[o(ee,{flat:"",icon:"refresh",color:"cyan",onClick:s})]),header:i(u=>[o(Ge,{props:u},{default:i(()=>[(M(!0),j(Z,null,ue(u.cols,m=>(M(),J(jt,{key:m.name,props:u},{default:i(()=>[z(E(m.label),1)]),_:2},1032,["props"]))),128))]),_:2},1032,["props"])]),body:i(u=>[o(Ge,{props:u},{default:i(()=>[(M(!0),j(Z,null,ue(u.cols,m=>(M(),J(Wt,{key:m.name,props:u},{default:i(()=>[m.name==="quot"||m.name==="pr"||m.name==="po"||m.name==="spk"?(M(),j(Z,{key:0},[m.value>0?(M(),J(ee,{key:0,flat:"",color:"blue",onClick:h=>y(u.row[m.name.split("_")[0]],m.name)},{default:i(()=>[q("b",null,E(m.value),1)]),_:2},1032,["onClick"])):(M(),j("span",Ba,E(m.value),1))],64)):(M(),j(Z,{key:1},[z(E(m.value),1)],64))]),_:2},1032,["props"]))),128))]),_:2},1032,["props"])]),_:1},8,["rows","columns","loading"])])])]))}};export{Ua as default};
