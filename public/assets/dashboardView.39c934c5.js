import{i as Pt,e as Ie,s as P,a as I,j as rt,o as ne,b4 as it,a_ as Qe,ap as Me,h as Q,a3 as ve,a5 as At,aI as wt,aa as oe,y as kt,g as Ce,aD as Dt,b5 as qt,c as ye,W as Be,X as Xe,w as de,p as St,af as Rt,ag as Ot,d as Pe,aU as It,a8 as ce,n as Bt,b6 as Et,a1 as he,b7 as Ee,at as Ze,a0 as xe,F as xt,a2 as Qt,b8 as Mt,b9 as $t,ab as Ut,ac as Lt,an as Nt,B as x,C as Y,D as i,E as l,J as pe,K as J,S as $e,I as S,P as fe,b0 as Vt,R as K,aY as te,aZ as me,b1 as Ht,H as W,a$ as N,M as ae,L as Ue,Q as F,O as Le,ba as jt}from"./index.cc66ab88.js";import{w as zt,i as Ft,u as Ne,b as Ae,a as we,Q as et,m as tt,n as se,o as ue,c as st,q as Kt}from"./use-dialog-plugin-component.54fecb48.js";import{u as Wt,d as ut,Q as at,b as Jt}from"./date.16f65533.js";import{api_web as le}from"./axios.ddff5020.js";import{Q as Gt}from"./QResizeObserver.05431f0e.js";let Yt=0;const Xt=["click","keydown"],Zt={icon:String,label:[Number,String],alert:[Boolean,String],alertIcon:String,name:{type:[Number,String],default:()=>`t_${Yt++}`},noCaps:Boolean,tabindex:[String,Number],disable:Boolean,contentClass:String,ripple:{type:[Boolean,Object],default:!0}};function ea(e,n,g,h){const r=Pt(it,Ie);if(r===Ie)return console.error("QTab/QRouteTab component needs to be child of QTabs"),Ie;const{proxy:t}=Ce(),o=P(null),d=P(null),O=P(null),w=I(()=>e.disable===!0||e.ripple===!1?!1:Object.assign({keyCodes:[13,32],early:!0},e.ripple===!0?{}:e.ripple)),c=I(()=>r.currentModel.value===e.name),s=I(()=>"q-tab relative-position self-stretch flex flex-center text-center"+(c.value===!0?" q-tab--active"+(r.tabProps.value.activeClass?" "+r.tabProps.value.activeClass:"")+(r.tabProps.value.activeColor?` text-${r.tabProps.value.activeColor}`:"")+(r.tabProps.value.activeBgColor?` bg-${r.tabProps.value.activeBgColor}`:""):" q-tab--inactive")+(e.icon&&e.label&&r.tabProps.value.inlineLabel===!1?" q-tab--full":"")+(e.noCaps===!0||r.tabProps.value.noCaps===!0?" q-tab--no-caps":"")+(e.disable===!0?" disabled":" q-focusable q-hoverable cursor-pointer")+(h!==void 0?h.linkClass.value:"")),m=I(()=>"q-tab__content self-stretch flex-center relative-position q-anchor--skip non-selectable "+(r.tabProps.value.inlineLabel===!0?"row no-wrap q-tab__content--inline":"column")+(e.contentClass!==void 0?` ${e.contentClass}`:"")),f=I(()=>e.disable===!0||r.hasFocus.value===!0||c.value===!1&&r.hasActiveTab.value===!0?-1:e.tabindex||0);function D(p,$){if($!==!0&&o.value!==null&&o.value.focus(),e.disable===!0){h!==void 0&&h.hasRouterLink.value===!0&&ve(p);return}if(h===void 0){r.updateModel({name:e.name}),g("click",p);return}if(h.hasRouterLink.value===!0){const V=(M={})=>{let U;const j=M.to===void 0||Dt(M.to,e.to)===!0?r.avoidRouteWatcher=qt():null;return h.navigateToRouterLink(p,{...M,returnRouterError:!0}).catch(z=>{U=z}).then(z=>{if(j===r.avoidRouteWatcher&&(r.avoidRouteWatcher=!1,U===void 0&&(z===void 0||z.message!==void 0&&z.message.startsWith("Avoided redundant navigation")===!0)&&r.updateModel({name:e.name})),M.returnRouterError===!0)return U!==void 0?Promise.reject(U):z})};g("click",p,V),p.defaultPrevented!==!0&&V();return}g("click",p)}function C(p){At(p,[13,32])?D(p,!0):wt(p)!==!0&&p.keyCode>=35&&p.keyCode<=40&&p.altKey!==!0&&p.metaKey!==!0&&r.onKbdNavigate(p.keyCode,t.$el)===!0&&ve(p),g("keydown",p)}function v(){const p=r.tabProps.value.narrowIndicator,$=[],V=Q("div",{ref:O,class:["q-tab__indicator",r.tabProps.value.indicatorClass]});e.icon!==void 0&&$.push(Q(oe,{class:"q-tab__icon",name:e.icon})),e.label!==void 0&&$.push(Q("div",{class:"q-tab__label"},e.label)),e.alert!==!1&&$.push(e.alertIcon!==void 0?Q(oe,{class:"q-tab__alert-icon",color:e.alert!==!0?e.alert:void 0,name:e.alertIcon}):Q("div",{class:"q-tab__alert"+(e.alert!==!0?` text-${e.alert}`:"")})),p===!0&&$.push(V);const M=[Q("div",{class:"q-focus-helper",tabindex:-1,ref:o}),Q("div",{class:m.value},kt(n.default,$))];return p===!1&&M.push(V),M}const b={name:I(()=>e.name),rootRef:d,tabIndicatorRef:O,routeData:h};rt(()=>{r.unregisterTab(b)}),ne(()=>{r.registerTab(b)});function A(p,$){const V={ref:d,class:s.value,tabindex:f.value,role:"tab","aria-selected":c.value===!0?"true":"false","aria-disabled":e.disable===!0?"true":void 0,onClick:D,onKeydown:C,...$};return Qe(Q(p,V,v()),[[Me,w.value]])}return{renderTab:A,$tabs:r}}var _e=ye({name:"QTab",props:Zt,emits:Xt,setup(e,{slots:n,emit:g}){const{renderTab:h}=ea(e,n,g);return()=>h("div")}});function ta(e,n,g){const h=g===!0?["left","right"]:["top","bottom"];return`absolute-${n===!0?h[0]:h[1]}${e?` text-${e}`:""}`}const aa=["left","center","right","justify"];var ct=ye({name:"QTabs",props:{modelValue:[Number,String],align:{type:String,default:"center",validator:e=>aa.includes(e)},breakpoint:{type:[String,Number],default:600},vertical:Boolean,shrink:Boolean,stretch:Boolean,activeClass:String,activeColor:String,activeBgColor:String,indicatorColor:String,leftIcon:String,rightIcon:String,outsideArrows:Boolean,mobileArrows:Boolean,switchIndicator:Boolean,narrowIndicator:Boolean,inlineLabel:Boolean,noCaps:Boolean,dense:Boolean,contentClass:String,"onUpdate:modelValue":[Function,Array]},setup(e,{slots:n,emit:g}){const{proxy:h}=Ce(),{$q:r}=h,{registerTick:t}=Be(),{registerTick:o}=Be(),{registerTick:d}=Be(),{registerTimeout:O,removeTimeout:w}=Xe(),{registerTimeout:c,removeTimeout:s}=Xe(),m=P(null),f=P(null),D=P(e.modelValue),C=P(!1),v=P(!0),b=P(!1),A=P(!1),p=[],$=P(0),V=P(!1);let M=null,U=null,j;const z=I(()=>({activeClass:e.activeClass,activeColor:e.activeColor,activeBgColor:e.activeBgColor,indicatorClass:ta(e.indicatorColor,e.switchIndicator,e.vertical),narrowIndicator:e.narrowIndicator,inlineLabel:e.inlineLabel,noCaps:e.noCaps})),ke=I(()=>{const a=$.value,u=D.value;for(let _=0;_<a;_++)if(p[_].name.value===u)return!0;return!1}),De=I(()=>`q-tabs__content--align-${C.value===!0?"left":A.value===!0?"justify":e.align}`),qe=I(()=>`q-tabs row no-wrap items-center q-tabs--${C.value===!0?"":"not-"}scrollable q-tabs--${e.vertical===!0?"vertical":"horizontal"} q-tabs__arrows--${e.outsideArrows===!0?"outside":"inside"} q-tabs--mobile-with${e.mobileArrows===!0?"":"out"}-arrows`+(e.dense===!0?" q-tabs--dense":"")+(e.shrink===!0?" col-shrink":"")+(e.stretch===!0?" self-stretch":"")),T=I(()=>"q-tabs__content scroll--mobile row no-wrap items-center self-stretch hide-scrollbar relative-position "+De.value+(e.contentClass!==void 0?` ${e.contentClass}`:"")),R=I(()=>e.vertical===!0?{container:"height",content:"offsetHeight",scroll:"scrollHeight"}:{container:"width",content:"offsetWidth",scroll:"scrollWidth"}),H=I(()=>e.vertical!==!0&&r.lang.rtl===!0),X=I(()=>zt===!1&&H.value===!0);de(H,ie),de(()=>e.modelValue,a=>{Se({name:a,setCurrent:!0,skipEmit:!0})}),de(()=>e.outsideArrows,be);function Se({name:a,setCurrent:u,skipEmit:_}){D.value!==a&&(_!==!0&&e["onUpdate:modelValue"]!==void 0&&g("update:modelValue",a),(u===!0||e["onUpdate:modelValue"]===void 0)&&(vt(D.value,a),D.value=a))}function be(){t(()=>{He({width:m.value.offsetWidth,height:m.value.offsetHeight})})}function He(a){if(R.value===void 0||f.value===null)return;const u=a[R.value.container],_=Math.min(f.value[R.value.scroll],Array.prototype.reduce.call(f.value.children,(E,k)=>E+(k[R.value.content]||0),0)),B=u>0&&_>u;C.value=B,B===!0&&o(ie),A.value=u<parseInt(e.breakpoint,10)}function vt(a,u){const _=a!=null&&a!==""?p.find(E=>E.name.value===a):null,B=u!=null&&u!==""?p.find(E=>E.name.value===u):null;if(_&&B){const E=_.tabIndicatorRef.value,k=B.tabIndicatorRef.value;M!==null&&(clearTimeout(M),M=null),E.style.transition="none",E.style.transform="none",k.style.transition="none",k.style.transform="none";const y=E.getBoundingClientRect(),L=k.getBoundingClientRect();k.style.transform=e.vertical===!0?`translate3d(0,${y.top-L.top}px,0) scale3d(1,${L.height?y.height/L.height:1},1)`:`translate3d(${y.left-L.left}px,0,0) scale3d(${L.width?y.width/L.width:1},1,1)`,d(()=>{M=setTimeout(()=>{M=null,k.style.transition="transform .25s cubic-bezier(.4, 0, .2, 1)",k.style.transform="none"},70)})}B&&C.value===!0&&re(B.rootRef.value)}function re(a){const{left:u,width:_,top:B,height:E}=f.value.getBoundingClientRect(),k=a.getBoundingClientRect();let y=e.vertical===!0?k.top-B:k.left-u;if(y<0){f.value[e.vertical===!0?"scrollTop":"scrollLeft"]+=Math.floor(y),ie();return}y+=e.vertical===!0?k.height-E:k.width-_,y>0&&(f.value[e.vertical===!0?"scrollTop":"scrollLeft"]+=Math.ceil(y),ie())}function ie(){const a=f.value;if(a===null)return;const u=a.getBoundingClientRect(),_=e.vertical===!0?a.scrollTop:Math.abs(a.scrollLeft);H.value===!0?(v.value=Math.ceil(_+u.width)<a.scrollWidth-1,b.value=_>0):(v.value=_>0,b.value=e.vertical===!0?Math.ceil(_+u.height)<a.scrollHeight:Math.ceil(_+u.width)<a.scrollWidth)}function je(a){U!==null&&clearInterval(U),U=setInterval(()=>{pt(a)===!0&&Z()},5)}function ze(){je(X.value===!0?Number.MAX_SAFE_INTEGER:0)}function Fe(){je(X.value===!0?0:Number.MAX_SAFE_INTEGER)}function Z(){U!==null&&(clearInterval(U),U=null)}function ft(a,u){const _=Array.prototype.filter.call(f.value.children,L=>L===u||L.matches&&L.matches(".q-tab.q-focusable")===!0),B=_.length;if(B===0)return;if(a===36)return re(_[0]),_[0].focus(),!0;if(a===35)return re(_[B-1]),_[B-1].focus(),!0;const E=a===(e.vertical===!0?38:37),k=a===(e.vertical===!0?40:39),y=E===!0?-1:k===!0?1:void 0;if(y!==void 0){const L=H.value===!0?-1:1,G=_.indexOf(u)+y*L;return G>=0&&G<B&&(re(_[G]),_[G].focus({preventScroll:!0})),!0}}const mt=I(()=>X.value===!0?{get:a=>Math.abs(a.scrollLeft),set:(a,u)=>{a.scrollLeft=-u}}:e.vertical===!0?{get:a=>a.scrollTop,set:(a,u)=>{a.scrollTop=u}}:{get:a=>a.scrollLeft,set:(a,u)=>{a.scrollLeft=u}});function pt(a){const u=f.value,{get:_,set:B}=mt.value;let E=!1,k=_(u);const y=a<k?-1:1;return k+=y*5,k<0?(E=!0,k=0):(y===-1&&k<=a||y===1&&k>=a)&&(E=!0,k=a),B(u,k),ie(),E}function Ke(a,u){for(const _ in a)if(a[_]!==u[_])return!1;return!0}function bt(){let a=null,u={matchedLen:0,queryDiff:9999,hrefLen:0};const _=p.filter(y=>y.routeData!==void 0&&y.routeData.hasRouterLink.value===!0),{hash:B,query:E}=h.$route,k=Object.keys(E).length;for(const y of _){const L=y.routeData.exact.value===!0;if(y.routeData[L===!0?"linkIsExactActive":"linkIsActive"].value!==!0)continue;const{hash:G,query:Re,matched:Ct,href:yt}=y.routeData.resolvedLink.value,Oe=Object.keys(Re).length;if(L===!0){if(G!==B||Oe!==k||Ke(E,Re)===!1)continue;a=y.name.value;break}if(G!==""&&G!==B||Oe!==0&&Ke(Re,E)===!1)continue;const ee={matchedLen:Ct.length,queryDiff:k-Oe,hrefLen:yt.length-G.length};if(ee.matchedLen>u.matchedLen){a=y.name.value,u=ee;continue}else if(ee.matchedLen!==u.matchedLen)continue;if(ee.queryDiff<u.queryDiff)a=y.name.value,u=ee;else if(ee.queryDiff!==u.queryDiff)continue;ee.hrefLen>u.hrefLen&&(a=y.name.value,u=ee)}a===null&&p.some(y=>y.routeData===void 0&&y.name.value===D.value)===!0||Se({name:a,setCurrent:!0})}function gt(a){if(w(),V.value!==!0&&m.value!==null&&a.target&&typeof a.target.closest=="function"){const u=a.target.closest(".q-tab");u&&m.value.contains(u)===!0&&(V.value=!0,C.value===!0&&re(u))}}function ht(){O(()=>{V.value=!1},30)}function ge(){Je.avoidRouteWatcher===!1?c(bt):s()}function We(){if(j===void 0){const a=de(()=>h.$route.fullPath,ge);j=()=>{a(),j=void 0}}}function _t(a){p.push(a),$.value++,be(),a.routeData===void 0||h.$route===void 0?c(()=>{if(C.value===!0){const u=D.value,_=u!=null&&u!==""?p.find(B=>B.name.value===u):null;_&&re(_.rootRef.value)}}):(We(),a.routeData.hasRouterLink.value===!0&&ge())}function Tt(a){p.splice(p.indexOf(a),1),$.value--,be(),j!==void 0&&a.routeData!==void 0&&(p.every(u=>u.routeData===void 0)===!0&&j(),ge())}const Je={currentModel:D,tabProps:z,hasFocus:V,hasActiveTab:ke,registerTab:_t,unregisterTab:Tt,verifyRouteModel:ge,updateModel:Se,onKbdNavigate:ft,avoidRouteWatcher:!1};St(it,Je);function Ge(){M!==null&&clearTimeout(M),Z(),j!==void 0&&j()}let Ye;return rt(Ge),Rt(()=>{Ye=j!==void 0,Ge()}),Ot(()=>{Ye===!0&&We(),be()}),()=>Q("div",{ref:m,class:qe.value,role:"tablist",onFocusin:gt,onFocusout:ht},[Q(Gt,{onResize:He}),Q("div",{ref:f,class:T.value,onScroll:ie},Pe(n.default)),Q(oe,{class:"q-tabs__arrow q-tabs__arrow--left absolute q-tab__icon"+(v.value===!0?"":" q-tabs__arrow--faded"),name:e.leftIcon||r.iconSet.tabs[e.vertical===!0?"up":"left"],onMousedownPassive:ze,onTouchstartPassive:ze,onMouseupPassive:Z,onMouseleavePassive:Z,onTouchendPassive:Z}),Q(oe,{class:"q-tabs__arrow q-tabs__arrow--right absolute q-tab__icon"+(b.value===!0?"":" q-tabs__arrow--faded"),name:e.rightIcon||r.iconSet.tabs[e.vertical===!0?"down":"right"],onMousedownPassive:Fe,onTouchstartPassive:Fe,onMouseupPassive:Z,onMouseleavePassive:Z,onTouchendPassive:Z})])}});const Ve={left:!0,right:!0,up:!0,down:!0,horizontal:!0,vertical:!0},la=Object.keys(Ve);Ve.all=!0;function lt(e){const n={};for(const g of la)e[g]===!0&&(n[g]=!0);return Object.keys(n).length===0?Ve:(n.horizontal===!0?n.left=n.right=!0:n.left===!0&&n.right===!0&&(n.horizontal=!0),n.vertical===!0?n.up=n.down=!0:n.up===!0&&n.down===!0&&(n.vertical=!0),n.horizontal===!0&&n.vertical===!0&&(n.all=!0),n)}const na=["INPUT","TEXTAREA"];function nt(e,n){return n.event===void 0&&e.target!==void 0&&e.target.draggable!==!0&&typeof n.handler=="function"&&na.includes(e.target.nodeName.toUpperCase())===!1&&(e.qClonedBy===void 0||e.qClonedBy.indexOf(n.uid)===-1)}function oa(e){const n=[.06,6,50];return typeof e=="string"&&e.length&&e.split(":").forEach((g,h)=>{const r=parseFloat(g);r&&(n[h]=r)}),n}var ra=It({name:"touch-swipe",beforeMount(e,{value:n,arg:g,modifiers:h}){if(h.mouse!==!0&&ce.has.touch!==!0)return;const r=h.mouseCapture===!0?"Capture":"",t={handler:n,sensitivity:oa(g),direction:lt(h),noop:Bt,mouseStart(o){nt(o,t)&&Et(o)&&(he(t,"temp",[[document,"mousemove","move",`notPassive${r}`],[document,"mouseup","end","notPassiveCapture"]]),t.start(o,!0))},touchStart(o){if(nt(o,t)){const d=o.target;he(t,"temp",[[d,"touchmove","move","notPassiveCapture"],[d,"touchcancel","end","notPassiveCapture"],[d,"touchend","end","notPassiveCapture"]]),t.start(o)}},start(o,d){ce.is.firefox===!0&&Ee(e,!0);const O=Ze(o);t.event={x:O.left,y:O.top,time:Date.now(),mouse:d===!0,dir:!1}},move(o){if(t.event===void 0)return;if(t.event.dir!==!1){ve(o);return}const d=Date.now()-t.event.time;if(d===0)return;const O=Ze(o),w=O.left-t.event.x,c=Math.abs(w),s=O.top-t.event.y,m=Math.abs(s);if(t.event.mouse!==!0){if(c<t.sensitivity[1]&&m<t.sensitivity[1]){t.end(o);return}}else if(window.getSelection().toString()!==""){t.end(o);return}else if(c<t.sensitivity[2]&&m<t.sensitivity[2])return;const f=c/d,D=m/d;t.direction.vertical===!0&&c<m&&c<100&&D>t.sensitivity[0]&&(t.event.dir=s<0?"up":"down"),t.direction.horizontal===!0&&c>m&&m<100&&f>t.sensitivity[0]&&(t.event.dir=w<0?"left":"right"),t.direction.up===!0&&c<m&&s<0&&c<100&&D>t.sensitivity[0]&&(t.event.dir="up"),t.direction.down===!0&&c<m&&s>0&&c<100&&D>t.sensitivity[0]&&(t.event.dir="down"),t.direction.left===!0&&c>m&&w<0&&m<100&&f>t.sensitivity[0]&&(t.event.dir="left"),t.direction.right===!0&&c>m&&w>0&&m<100&&f>t.sensitivity[0]&&(t.event.dir="right"),t.event.dir!==!1?(ve(o),t.event.mouse===!0&&(document.body.classList.add("no-pointer-events--children"),document.body.classList.add("non-selectable"),Ft(),t.styleCleanup=C=>{t.styleCleanup=void 0,document.body.classList.remove("non-selectable");const v=()=>{document.body.classList.remove("no-pointer-events--children")};C===!0?setTimeout(v,50):v()}),t.handler({evt:o,touch:t.event.mouse!==!0,mouse:t.event.mouse,direction:t.event.dir,duration:d,distance:{x:c,y:m}})):t.end(o)},end(o){t.event!==void 0&&(xe(t,"temp"),ce.is.firefox===!0&&Ee(e,!1),t.styleCleanup!==void 0&&t.styleCleanup(!0),o!==void 0&&t.event.dir!==!1&&ve(o),t.event=void 0)}};if(e.__qtouchswipe=t,h.mouse===!0){const o=h.mouseCapture===!0||h.mousecapture===!0?"Capture":"";he(t,"main",[[e,"mousedown","mouseStart",`passive${o}`]])}ce.has.touch===!0&&he(t,"main",[[e,"touchstart","touchStart",`passive${h.capture===!0?"Capture":""}`],[e,"touchmove","noop","notPassiveCapture"]])},updated(e,n){const g=e.__qtouchswipe;g!==void 0&&(n.oldValue!==n.value&&(typeof n.value!="function"&&g.end(),g.handler=n.value),g.direction=lt(n.modifiers))},beforeUnmount(e){const n=e.__qtouchswipe;n!==void 0&&(xe(n,"main"),xe(n,"temp"),ce.is.firefox===!0&&Ee(e,!1),n.styleCleanup!==void 0&&n.styleCleanup(),delete e.__qtouchswipe)}});const ia={name:{required:!0},disable:Boolean},ot={setup(e,{slots:n}){return()=>Q("div",{class:"q-panel scroll",role:"tabpanel"},Pe(n.default))}},sa={modelValue:{required:!0},animated:Boolean,infinite:Boolean,swipeable:Boolean,vertical:Boolean,transitionPrev:String,transitionNext:String,transitionDuration:{type:[String,Number],default:300},keepAlive:Boolean,keepAliveInclude:[String,Array,RegExp],keepAliveExclude:[String,Array,RegExp],keepAliveMax:Number},ua=["update:modelValue","beforeTransition","transition"];function ca(){const{props:e,emit:n,proxy:g}=Ce(),{getCacheWithFn:h}=Wt();let r,t;const o=P(null),d=P(null);function O(T){const R=e.vertical===!0?"up":"left";U((g.$q.lang.rtl===!0?-1:1)*(T.direction===R?1:-1))}const w=I(()=>[[ra,O,void 0,{horizontal:e.vertical!==!0,vertical:e.vertical,mouse:!0}]]),c=I(()=>e.transitionPrev||`slide-${e.vertical===!0?"down":"right"}`),s=I(()=>e.transitionNext||`slide-${e.vertical===!0?"up":"left"}`),m=I(()=>`--q-transition-duration: ${e.transitionDuration}ms`),f=I(()=>typeof e.modelValue=="string"||typeof e.modelValue=="number"?e.modelValue:String(e.modelValue)),D=I(()=>({include:e.keepAliveInclude,exclude:e.keepAliveExclude,max:e.keepAliveMax})),C=I(()=>e.keepAliveInclude!==void 0||e.keepAliveExclude!==void 0);de(()=>e.modelValue,(T,R)=>{const H=p(T)===!0?$(T):-1;t!==!0&&M(H===-1?0:H<$(R)?-1:1),o.value!==H&&(o.value=H,n("beforeTransition",T,R),xt(()=>{n("transition",T,R)}))});function v(){U(1)}function b(){U(-1)}function A(T){n("update:modelValue",T)}function p(T){return T!=null&&T!==""}function $(T){return r.findIndex(R=>R.props.name===T&&R.props.disable!==""&&R.props.disable!==!0)}function V(){return r.filter(T=>T.props.disable!==""&&T.props.disable!==!0)}function M(T){const R=T!==0&&e.animated===!0&&o.value!==-1?"q-transition--"+(T===-1?c.value:s.value):null;d.value!==R&&(d.value=R)}function U(T,R=o.value){let H=R+T;for(;H>-1&&H<r.length;){const X=r[H];if(X!==void 0&&X.props.disable!==""&&X.props.disable!==!0){M(T),t=!0,n("update:modelValue",X.props.name),setTimeout(()=>{t=!1});return}H+=T}e.infinite===!0&&r.length!==0&&R!==-1&&R!==r.length&&U(T,T===-1?r.length:-1)}function j(){const T=$(e.modelValue);return o.value!==T&&(o.value=T),!0}function z(){const T=p(e.modelValue)===!0&&j()&&r[o.value];return e.keepAlive===!0?[Q($t,D.value,[Q(C.value===!0?h(f.value,()=>({...ot,name:f.value})):ot,{key:f.value,style:m.value},()=>T)])]:[Q("div",{class:"q-panel scroll",style:m.value,key:f.value,role:"tabpanel"},[T])]}function ke(){if(r.length!==0)return e.animated===!0?[Q(Qt,{name:d.value},z)]:z()}function De(T){return r=Mt(Pe(T.default,[])).filter(R=>R.props!==null&&R.props.slot===void 0&&p(R.props.name)===!0),r.length}function qe(){return r}return Object.assign(g,{next:v,previous:b,goTo:A}),{panelIndex:o,panelDirectives:w,updatePanelsList:De,updatePanelIndex:j,getPanelContent:ke,getEnabledPanels:V,getPanels:qe,isValidPanelName:p,keepAliveProps:D,needsUniqueKeepAliveWrapper:C,goToPanelByOffset:U,goToPanel:A,nextPanel:v,previousPanel:b}}var Te=ye({name:"QTabPanel",props:ia,setup(e,{slots:n}){return()=>Q("div",{class:"q-tab-panel",role:"tabpanel"},Pe(n.default))}}),dt=ye({name:"QTabPanels",props:{...sa,...Ut},emits:ua,setup(e,{slots:n}){const g=Ce(),h=Lt(e,g.proxy.$q),{updatePanelsList:r,getPanelContent:t,panelDirectives:o}=ca(),d=I(()=>"q-tab-panels q-panel-parent"+(h.value===!0?" q-tab-panels--dark q-dark":""));return()=>(r(n),Nt("div",{class:d.value},t(),"pan",e.swipeable,()=>o.value))}});const da=S("div",{class:"text-h6"},"Quotation Review",-1),va={class:"row q-py-md"},fa={class:"col"},ma={class:"col q-pl-md"},pa={class:"row q-pb-md"},ba={class:"col"},ga={__name:"viewListApprovalItem",props:{dataHeader:Array,cd:String,typeCD:String},setup(e){const{dialogRef:n,onDialogHide:g,onDialogOK:h,onDialogCancel:r}=Ne(),t=Ae(),o=e;ne(()=>{s.value=o.dataHeader});const d=P(!1),O=P([{name:"MITM_ITMNM",label:"Item Name",field:"MITM_ITMNM",sortable:!0,align:"left"},{name:"TQUODETA_USAGE_DESCRIPTION",label:"Usage",field:"TQUODETA_USAGE_DESCRIPTION",sortable:!0,align:"left"},{name:"TQUODETA_PRC",label:"Price",field:"TQUODETA_PRC",sortable:!0,align:"left",format:v=>v.toLocaleString()},{name:"TQUODETA_OPRPRC",label:"Operator",field:"TQUODETA_OPRPRC",sortable:!0,align:"left",format:v=>v.toLocaleString()},{name:"TQUODETA_MOBDEMOB",label:"MOB DEMOB",field:"TQUODETA_MOBDEMOB",sortable:!0,align:"left",format:v=>v.toLocaleString()},{name:"SUBTOT",label:"SUBTOTAL",sortable:!0,field:v=>v.TQUODETA_PRC+v.TQUODETA_OPRPRC+v.TQUODETA_MOBDEMOB,align:"left",format:v=>v.toLocaleString()}]),w=P([]),c=P("items"),s=P({MCUS_CUSNM:"",TQUO_ATTN:"",TQUO_SBJCT:""});ne(()=>{m()});const m=async()=>{d.value=!0,await le.get(`${o.typeCD}/${btoa(o.cd)}`).then(v=>{d.value=!1,w.value=v.data}).catch(v=>{d.value=!1})},f=()=>{q.dialog({title:"Confirm",message:"Are you sure want to Approve this quotation ?",cancel:!0,persistent:!0}).onOk(async v=>{d.value=!0,await le.put(`approve/quotations/${btoa(o.cd)}`,{TQUO_BRANCH:o.dataHeader.TQUO_BRANCH}).then(b=>{d.value=!1,m()}).catch(b=>{d.value=!1})})},D=()=>{t.dialog({title:"Confirm",message:"Are you sure want to Reject this quotation ?",cancel:!0,persistent:!0}).onOk(async v=>{t.dialog({title:"Prompt",message:"Input reject reason.",prompt:{model:"",isValid:b=>b.length>2,type:"text"},cancel:!0,persistent:!0}).onOk(async b=>{d.value=!0,await le.put(`revise/quotations/${btoa(o.cd)}`,{remark:b,TQUO_BRANCH:o.dataHeader.TQUO_BRANCH}).then(A=>{d.value=!1,m()}).catch(A=>{d.value=!1})})})},C=()=>{window.open("https://joss.jatpowerindo.co.id/PDF/quotation/"+btoa(o.cd),"_blank").focus()};return(v,b)=>(x(),Y(Le,{ref_key:"dialogRef",ref:n,onHide:ae(g),"transition-show":"slide-up","transition-hide":"slide-down","full-width":""},{default:i(()=>[l(pe,{class:"q-dialog-plugin bg-white q-pa-sm"},{default:i(()=>[l(J,null,{default:i(()=>[da]),_:1}),l(J,{class:"q-pa-sm",style:{height:"70vh",overflow:"auto"}},{default:i(()=>[l(ct,{modelValue:c.value,"onUpdate:modelValue":b[0]||(b[0]=A=>c.value=A),dense:"",class:"text-grey","active-color":"primary","indicator-color":"primary",align:"justify","narrow-indicator":""},{default:i(()=>[l(_e,{name:"items",label:"Items"}),l(_e,{name:"conditions",label:"Conditions"}),l(_e,{name:"histCond",label:"Approval History"})]),_:1},8,["modelValue"]),l($e),l(dt,{modelValue:c.value,"onUpdate:modelValue":b[4]||(b[4]=A=>c.value=A),animated:""},{default:i(()=>[l(Te,{name:"items"},{default:i(()=>[S("div",va,[S("div",fa,[l(fe,{dense:"",filled:"",label:"Customer Name",modelValue:s.value.APP_CUSNM,"onUpdate:modelValue":b[1]||(b[1]=A=>s.value.APP_CUSNM=A),readonly:""},null,8,["modelValue"])]),S("div",ma,[l(fe,{dense:"",filled:"",label:"Attn.",modelValue:s.value.APP_ATTN,"onUpdate:modelValue":b[2]||(b[2]=A=>s.value.APP_ATTN=A),readonly:""},null,8,["modelValue"])])]),S("div",pa,[S("div",ba,[l(fe,{dense:"",filled:"",label:"Subject",modelValue:s.value.APP_SBJCT,"onUpdate:modelValue":b[3]||(b[3]=A=>s.value.APP_SBJCT=A),readonly:""},null,8,["modelValue"])])]),o.typeCD=="quotation"?(x(),Y(we,{key:0,title:"Item List",rows:w.value.dataItem,columns:O.value,"row-key":"name",dense:"",loading:d.value},null,8,["rows","columns","loading"])):Vt("",!0)]),_:1}),l(Te,{name:"conditions"},{default:i(()=>[l(et,{bordered:"",dense:""},{default:i(()=>[(x(!0),K(te,null,me(w.value.dataCondition,(A,p)=>Qe((x(),Y(tt,{clickable:"",key:p},{default:i(()=>[l(se,{avatar:""},{default:i(()=>[l(Ht,{color:"primary","text-color":"white",size:"sm"},{default:i(()=>[W(N(p+1),1)]),_:2},1024)]),_:2},1024),l(se,null,{default:i(()=>[W(N(A.TQUOCOND_CONDI),1)]),_:2},1024)]),_:2},1024)),[[Me]])),128))]),_:1})]),_:1}),l(Te,{name:"histCond"},{default:i(()=>[l(et,{bordered:"",separator:""},{default:i(()=>[(x(!0),K(te,null,me(w.value.approvalHistories,(A,p)=>Qe((x(),Y(tt,{clickable:"",key:p},{default:i(()=>[l(se,null,{default:i(()=>[l(ue,null,{default:i(()=>[W(N(ae(ut).formatDate(A.created_at,"DD MMM YYYY HH:mm")),1)]),_:2},1024),l(ue,{caption:""},{default:i(()=>[W("Time")]),_:1})]),_:2},1024),l(se,null,{default:i(()=>[l(ue,null,{default:i(()=>[W(N(A.type==2?"Rejected":"Approved"),1)]),_:2},1024),l(ue,{caption:""},{default:i(()=>[W("Status")]),_:1})]),_:2},1024),l(se,null,{default:i(()=>[l(ue,null,{default:i(()=>[W(N(A.remark),1)]),_:2},1024),l(ue,{caption:""},{default:i(()=>[W("Remarks")]),_:1})]),_:2},1024),l(se,{side:""},{default:i(()=>[l(oe,{name:A.type==2?"cancel":"check_circle",color:A.type==2?"red":"green"},null,8,["name","color"])]),_:2},1024)]),_:2},1024)),[[Me]])),128))]),_:1})]),_:1})]),_:1},8,["modelValue"])]),_:1}),l(Ue,{align:"center"},{default:i(()=>[l(st,null,{default:i(()=>[l(F,{color:"primary",icon:"print",disable:w.value.length===0,onClick:b[5]||(b[5]=A=>C()),flat:""},null,8,["disable"]),l(F,{color:"primary",icon:"check",label:"Approve",disable:w.value.length===0,onClick:b[6]||(b[6]=A=>f())},null,8,["disable"]),l(F,{color:"red",icon:"cancel",label:"Reject",disable:w.value.length===0,onClick:b[7]||(b[7]=A=>D())},null,8,["disable"]),l(F,{color:"orange",flat:"",label:"cancel",onClick:ae(r)},null,8,["onClick"])]),_:1})]),_:1})]),_:1})]),_:1},8,["onHide"]))}},ha=S("div",{class:"text-h6"},"Quotation Review",-1),_a={class:"row q-pb-md"},Ta={class:"col"},Ca={__name:"viewListPRItem",props:{dataHeader:Array,cd:String,typeCD:String,conn:String},setup(e){const{dialogRef:n,onDialogHide:g,onDialogOK:h,onDialogCancel:r}=Ne(),t=Ae(),o=e;ne(()=>{console.log(o),s.value=o.dataHeader});const d=P(!1),O=P([{name:"MITM_ITMNM",label:"Item Name",field:"MITM_ITMNM",sortable:!0,align:"left"},{name:"TQUODETA_USAGE_DESCRIPTION",label:"Usage",field:"TQUODETA_USAGE_DESCRIPTION",sortable:!0,align:"left"},{name:"TQUODETA_PRC",label:"Price",field:"TQUODETA_PRC",sortable:!0,align:"left",format:C=>C.toLocaleString()},{name:"TQUODETA_OPRPRC",label:"Operator",field:"TQUODETA_OPRPRC",sortable:!0,align:"left",format:C=>C.toLocaleString()},{name:"TQUODETA_MOBDEMOB",label:"MOB DEMOB",field:"TQUODETA_MOBDEMOB",sortable:!0,align:"left",format:C=>C.toLocaleString()},{name:"SUBTOT",label:"SUBTOTAL",sortable:!0,field:C=>C.TQUODETA_PRC+C.TQUODETA_OPRPRC+C.TQUODETA_MOBDEMOB,align:"left",format:C=>C.toLocaleString()}]),w=P([]),c=P("items"),s=P({MCUS_CUSNM:"",TQUO_ATTN:"",TQUO_SBJCT:""});ne(()=>{m()});const m=async()=>{d.value=!0,await le.post(`${o.typeCD}`,{id:btoa(o.cd),TPCHREQDETA_BRANCH:o.dataHeader.TPCHREQ_BRANCH,conn:o.conn}).then(C=>{d.value=!1,w.value=C.data}).catch(C=>{d.value=!1})},f=()=>{q.dialog({title:"Confirm",message:"Are you sure want to Approve this quotation ?",cancel:!0,persistent:!0}).onOk(async C=>{d.value=!0,await le.put(`approve/quotations/${btoa(o.cd)}`,{TQUO_BRANCH:o.dataHeader.TPCHREQ_BRANCH}).then(v=>{d.value=!1,m()}).catch(v=>{d.value=!1})})},D=()=>{t.dialog({title:"Confirm",message:"Are you sure want to Reject this quotation ?",cancel:!0,persistent:!0}).onOk(async C=>{t.dialog({title:"Prompt",message:"Input reject reason.",prompt:{model:"",isValid:v=>v.length>2,type:"text"},cancel:!0,persistent:!0}).onOk(async v=>{d.value=!0,await le.put(`revise/quotations/${btoa(o.cd)}`,{remark:v,TQUO_BRANCH:o.dataHeader.TPCHREQ_BRANCH}).then(b=>{d.value=!1,m()}).catch(b=>{d.value=!1})})})};return(C,v)=>(x(),Y(Le,{ref_key:"dialogRef",ref:n,onHide:ae(g),"transition-show":"slide-up","transition-hide":"slide-down","full-width":""},{default:i(()=>[l(pe,{class:"q-dialog-plugin bg-white q-pa-sm"},{default:i(()=>[l(J,null,{default:i(()=>[ha]),_:1}),l(J,{class:"q-pa-sm",style:{height:"70vh",overflow:"auto"}},{default:i(()=>[l(ct,{modelValue:c.value,"onUpdate:modelValue":v[0]||(v[0]=b=>c.value=b),dense:"",class:"text-grey","active-color":"primary","indicator-color":"primary",align:"justify","narrow-indicator":""},{default:i(()=>[l(_e,{name:"items",label:"Items"})]),_:1},8,["modelValue"]),l($e),l(dt,{modelValue:c.value,"onUpdate:modelValue":v[2]||(v[2]=b=>c.value=b),animated:""},{default:i(()=>[l(Te,{name:"items"},{default:i(()=>[S("div",_a,[S("div",Ta,[l(fe,{dense:"",filled:"",label:"Purpose",modelValue:s.value.APP_SBJCT,"onUpdate:modelValue":v[1]||(v[1]=b=>s.value.APP_SBJCT=b),readonly:""},null,8,["modelValue"])])]),l(we,{title:"Item List",rows:w.value.dataItem,columns:O.value,"row-key":"name",dense:"",loading:d.value},null,8,["rows","columns","loading"])]),_:1})]),_:1},8,["modelValue"])]),_:1}),l(Ue,{align:"center"},{default:i(()=>[l(st,null,{default:i(()=>[l(F,{color:"primary",icon:"check",label:"Approve",disable:w.value.length===0,onClick:v[3]||(v[3]=b=>f())},null,8,["disable"]),l(F,{color:"red",icon:"cancel",label:"Reject",disable:w.value.length===0,onClick:v[4]||(v[4]=b=>D())},null,8,["disable"]),l(F,{color:"orange",flat:"",label:"cancel",onClick:ae(r)},null,8,["onClick"])]),_:1})]),_:1})]),_:1})]),_:1},8,["onHide"]))}},ya=S("div",{class:"text-h6"},"Approval List",-1),Pa={class:"q-pa-xs col-xs-12 col-sm-6 col-md-4"},Aa={class:"text-h5 text-bold"},wa={class:"text-h6 text-bold"},ka={class:"text-subtitle2"},Da={class:"row"},qa={class:"col"},Sa={class:"col text-right"},Ra={__name:"viewListApproval",props:{listApprv:Array,typeAPI:String,conn:String},setup(e){const n=Ae(),g=e;ne(()=>{console.log(g)});const h=P([{name:"APP_CD",label:"Doc Code",field:"APP_CD"},{name:"APP_CUSNM",label:"Customer",field:"APP_CUSNM"},{name:"APP_SBJCT",label:"Subject",field:"APP_SBJCT"},{name:"APP_ATTN",label:"Attn",field:"APP_ATTN"},{name:"CREATED_AT",label:"Created Date",field:"CREATED_AT"}]),r=P(""),t=(s,m="days")=>{const f=new Date,D=new Date(s);return ut.getDateDiff(f,D,m)},o=(s,m)=>{let f="";g.typeAPI=="quot"?(f="quotation",n.dialog({component:ga,componentProps:{dataHeader:m,cd:s,typeCD:f}}).onOk(async D=>{})):g.typeAPI=="pr"?(f="purchase-request-approval",n.dialog({component:Ca,componentProps:{dataHeader:m,cd:s,typeCD:f,conn:g.conn}}).onOk(async D=>{})):g.typeAPI=="po"&&(f="purchase-order/approval-document")},{dialogRef:d,onDialogHide:O,onDialogOK:w,onDialogCancel:c}=Ne();return(s,m)=>(x(),Y(Le,{ref_key:"dialogRef",ref:d,onHide:ae(O),"transition-show":"slide-up","transition-hide":"slide-down","full-width":""},{default:i(()=>[l(pe,{class:"q-dialog-plugin bg-white q-pa-sm"},{default:i(()=>[l(J,null,{default:i(()=>[ya]),_:1}),l(J,{class:"q-pa-sm",style:{height:"70vh",overflow:"auto"}},{default:i(()=>[l(we,{grid:"",flat:"",bordered:"","card-container-class":s.cardContainerClass,title:"Outstanding Approval",rows:g.listApprv,columns:h.value,"row-key":"name",filter:r.value,"hide-header":"",pagination:{rowsPerPage:50},"rows-per-page-options":s.rowsPerPageOptions},{"top-right":i(()=>[l(fe,{borderless:"",dense:"",debounce:"300",modelValue:r.value,"onUpdate:modelValue":m[0]||(m[0]=f=>r.value=f),placeholder:"Search"},{append:i(()=>[l(oe,{name:"search"})]),_:1},8,["modelValue"])]),item:i(f=>[S("div",Pa,[l(pe,{flat:"",bordered:""},{default:i(()=>[l(J,{class:"text-center bg-secondary text-white"},{default:i(()=>[S("div",Aa,N(f.row.APP_CUSNM),1)]),_:2},1024),l($e),l(J,null,{default:i(()=>[S("div",wa,N(f.row.APP_CD),1),S("div",ka,N(f.row.APP_SBJCT),1)]),_:2},1024),l(J,null,{default:i(()=>[S("div",Da,[S("div",qa,[l(F,{label:"Preview",color:"primary",outline:"",onClick:D=>o(f.row.APP_CD,f.row)},null,8,["onClick"])]),S("div",Sa,N(t(f.row.CREATED_AT)<30?`${t(f.row.CREATED_AT)} Days Ago`:`${t(f.row.CREATED_AT,"months")} Month ago`),1)])]),_:2},1024)]),_:2},1024)])]),_:1},8,["card-container-class","rows","columns","filter","rows-per-page-options"])]),_:1}),l(Ue,{align:"right"},{default:i(()=>[l(F,{label:"OK",color:"primary",onClick:m[1]||(m[1]=f=>ae(w)()),disable:s.stateSubmit},null,8,["disable"])]),_:1})]),_:1})]),_:1},8,["onHide"]))}},Oa={class:"q-pa-md bg-grey-5 window-height"},Ia={class:"row"},Ba={class:"row"},Ea={class:"col"},xa={class:"text-h3 text-cyan"},Qa={class:"text-subtitle2 text-cyan"},Ma={class:"col text-right"},$a={class:"row q-pa-sm"},Ua={class:"col"},La={key:1},Fa={__name:"dashboardView",setup(e){const n=Ae(),g=P([{total:900,title:"Total Sales",icon:"shopping_cart",color:"cyan"},{total:900,title:"Total Purchase",icon:"shopping_bag",color:"cyan"},{total:900,title:"Total Profit",icon:"payments",color:"cyan"},{total:15,title:"Total Customer",icon:"group",color:"cyan"},{total:15,title:"Total Customer",icon:"group",color:"cyan"},{total:15,title:"Total Customer",icon:"group",color:"cyan"},{total:15,title:"Total Customer",icon:"group",color:"cyan"},{total:15,title:"Total Customer",icon:"group",color:"cyan"}]),h=P([{name:"name",label:"Business",field:"name",sortable:!0,align:"left"},{name:"quot",label:"Quotation",field:"quot_count",sortable:!0,align:"center"},{name:"pr",label:"Purchase Request",field:"pr_count",sortable:!0,align:"center"},{name:"po",label:"Purchase Order",field:"po_count",sortable:!0,align:"center"}]),r=P([]),t=P(!1);P(null),ne(async()=>{await o()});const o=async()=>{t.value=!0,await le.get("/approval/notificationsAPI/top-user").then(O=>{t.value=!1,r.value=O.data}).catch(O=>{t.value=!1})},d=(O,w,c)=>{n.dialog({component:Ra,componentProps:{listApprv:O,typeAPI:w,conn:c}}).onOk(async s=>{quotationGroupConditions.value=s.MCONDITION_RPT_STAT,quotationConditions.value=s.group})};return(O,w)=>(x(),K("div",Oa,[S("div",Ia,[(x(!0),K(te,null,me(g.value,(c,s)=>(x(),K("div",{class:jt("col-3 q-pa-sm"),key:s},[l(pe,null,{default:i(()=>[l(J,null,{default:i(()=>[S("div",Ba,[S("div",Ea,[S("div",xa,N(c.total),1),S("div",Qa,N(c.title),1)]),S("div",Ma,[l(oe,{name:c.icon,size:"4.4em",color:c.color},null,8,["name","color"])])])]),_:2},1024)]),_:2},1024)]))),128))]),S("div",$a,[S("div",Ua,[l(we,{flat:"",bordered:"",title:"Approval List",rows:r.value,columns:h.value,"row-key":"name",loading:t.value},{"top-right":i(()=>[l(F,{flat:"",icon:"refresh",color:"cyan",onClick:o})]),header:i(c=>[l(at,{props:c},{default:i(()=>[(x(!0),K(te,null,me(c.cols,s=>(x(),Y(Kt,{key:s.name,props:c},{default:i(()=>[W(N(s.label),1)]),_:2},1032,["props"]))),128))]),_:2},1032,["props"])]),body:i(c=>[l(at,{props:c},{default:i(()=>[(x(!0),K(te,null,me(c.cols,s=>(x(),Y(Jt,{key:s.name,props:c},{default:i(()=>[s.name==="quot"||s.name==="pr"||s.name==="po"||s.name==="spk"?(x(),K(te,{key:0},[s.value>0?(x(),Y(F,{key:0,flat:"",color:"blue",onClick:m=>d(c.row[s.name.split("_")[0]],s.name,s.connection)},{default:i(()=>[S("b",null,N(s.value),1)]),_:2},1032,["onClick"])):(x(),K("span",La,N(s.value),1))],64)):(x(),K(te,{key:1},[W(N(s.value),1)],64))]),_:2},1032,["props"]))),128))]),_:2},1032,["props"])]),_:1},8,["rows","columns","loading"])])])]))}};export{Fa as default};
