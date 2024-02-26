import{i as mt,e as Ce,s as w,a as A,j as Ke,o as Se,b4 as Ge,a_ as Xe,ap as Je,h as x,a3 as le,a5 as bt,aI as ht,aa as ae,y as pt,g as fe,aD as gt,b5 as _t,c as me,W as Pe,X as Ue,w as oe,p as Tt,af as yt,ag as Ct,d as be,aU as Pt,a8 as ne,n as wt,b6 as At,a1 as ue,b7 as we,at as Ve,a0 as Ae,F as qt,a2 as kt,b8 as St,b9 as Dt,ab as xt,ac as It,an as Rt,B as E,C as J,D as v,E as u,J as de,K as G,S as Ye,b0 as Lt,R as W,aY as te,aZ as ce,b1 as Bt,H as ie,a$ as U,L as Ze,Q as Y,M as ve,O as et,I as R,P as Et,ba as $t}from"./index.0a9302b2.js";import{w as Ot,i as Mt,u as tt,b as De,a as xe,Q as Qt,m as Nt,n as je,c as Ut,q as Vt}from"./use-dialog-plugin-component.06babcc2.js";import{u as jt,d as zt,Q as ze,b as Wt}from"./date.a9db6b35.js";import{api_web as at}from"./axios.f1e254dd.js";import{Q as Ft}from"./QResizeObserver.5d4da6f2.js";let Ht=0;const Kt=["click","keydown"],Gt={icon:String,label:[Number,String],alert:[Boolean,String],alertIcon:String,name:{type:[Number,String],default:()=>`t_${Ht++}`},noCaps:Boolean,tabindex:[String,Number],disable:Boolean,contentClass:String,ripple:{type:[Boolean,Object],default:!0}};function Xt(e,n,h,f){const o=mt(Ge,Ce);if(o===Ce)return console.error("QTab/QRouteTab component needs to be child of QTabs"),Ce;const{proxy:t}=fe(),r=w(null),T=w(null),C=w(null),D=A(()=>e.disable===!0||e.ripple===!1?!1:Object.assign({keyCodes:[13,32],early:!0},e.ripple===!0?{}:e.ripple)),s=A(()=>o.currentModel.value===e.name),m=A(()=>"q-tab relative-position self-stretch flex flex-center text-center"+(s.value===!0?" q-tab--active"+(o.tabProps.value.activeClass?" "+o.tabProps.value.activeClass:"")+(o.tabProps.value.activeColor?` text-${o.tabProps.value.activeColor}`:"")+(o.tabProps.value.activeBgColor?` bg-${o.tabProps.value.activeBgColor}`:""):" q-tab--inactive")+(e.icon&&e.label&&o.tabProps.value.inlineLabel===!1?" q-tab--full":"")+(e.noCaps===!0||o.tabProps.value.noCaps===!0?" q-tab--no-caps":"")+(e.disable===!0?" disabled":" q-focusable q-hoverable cursor-pointer")+(f!==void 0?f.linkClass.value:"")),c=A(()=>"q-tab__content self-stretch flex-center relative-position q-anchor--skip non-selectable "+(o.tabProps.value.inlineLabel===!0?"row no-wrap q-tab__content--inline":"column")+(e.contentClass!==void 0?` ${e.contentClass}`:"")),l=A(()=>e.disable===!0||o.hasFocus.value===!0||s.value===!1&&o.hasActiveTab.value===!0?-1:e.tabindex||0);function _(d,L){if(L!==!0&&r.value!==null&&r.value.focus(),e.disable===!0){f!==void 0&&f.hasRouterLink.value===!0&&le(d);return}if(f===void 0){o.updateModel({name:e.name}),h("click",d);return}if(f.hasRouterLink.value===!0){const M=(I={})=>{let B;const N=I.to===void 0||gt(I.to,e.to)===!0?o.avoidRouteWatcher=_t():null;return f.navigateToRouterLink(d,{...I,returnRouterError:!0}).catch(V=>{B=V}).then(V=>{if(N===o.avoidRouteWatcher&&(o.avoidRouteWatcher=!1,B===void 0&&(V===void 0||V.message!==void 0&&V.message.startsWith("Avoided redundant navigation")===!0)&&o.updateModel({name:e.name})),I.returnRouterError===!0)return B!==void 0?Promise.reject(B):V})};h("click",d,M),d.defaultPrevented!==!0&&M();return}h("click",d)}function q(d){bt(d,[13,32])?_(d,!0):ht(d)!==!0&&d.keyCode>=35&&d.keyCode<=40&&d.altKey!==!0&&d.metaKey!==!0&&o.onKbdNavigate(d.keyCode,t.$el)===!0&&le(d),h("keydown",d)}function O(){const d=o.tabProps.value.narrowIndicator,L=[],M=x("div",{ref:C,class:["q-tab__indicator",o.tabProps.value.indicatorClass]});e.icon!==void 0&&L.push(x(ae,{class:"q-tab__icon",name:e.icon})),e.label!==void 0&&L.push(x("div",{class:"q-tab__label"},e.label)),e.alert!==!1&&L.push(e.alertIcon!==void 0?x(ae,{class:"q-tab__alert-icon",color:e.alert!==!0?e.alert:void 0,name:e.alertIcon}):x("div",{class:"q-tab__alert"+(e.alert!==!0?` text-${e.alert}`:"")})),d===!0&&L.push(M);const I=[x("div",{class:"q-focus-helper",tabindex:-1,ref:r}),x("div",{class:c.value},pt(n.default,L))];return d===!1&&I.push(M),I}const j={name:A(()=>e.name),rootRef:T,tabIndicatorRef:C,routeData:f};Ke(()=>{o.unregisterTab(j)}),Se(()=>{o.registerTab(j)});function X(d,L){const M={ref:T,class:m.value,tabindex:l.value,role:"tab","aria-selected":s.value===!0?"true":"false","aria-disabled":e.disable===!0?"true":void 0,onClick:_,onKeydown:q,...L};return Xe(x(d,M,O()),[[Je,D.value]])}return{renderTab:X,$tabs:o}}var qe=me({name:"QTab",props:Gt,emits:Kt,setup(e,{slots:n,emit:h}){const{renderTab:f}=Xt(e,n,h);return()=>f("div")}});function Jt(e,n,h){const f=h===!0?["left","right"]:["top","bottom"];return`absolute-${n===!0?f[0]:f[1]}${e?` text-${e}`:""}`}const Yt=["left","center","right","justify"];var Zt=me({name:"QTabs",props:{modelValue:[Number,String],align:{type:String,default:"center",validator:e=>Yt.includes(e)},breakpoint:{type:[String,Number],default:600},vertical:Boolean,shrink:Boolean,stretch:Boolean,activeClass:String,activeColor:String,activeBgColor:String,indicatorColor:String,leftIcon:String,rightIcon:String,outsideArrows:Boolean,mobileArrows:Boolean,switchIndicator:Boolean,narrowIndicator:Boolean,inlineLabel:Boolean,noCaps:Boolean,dense:Boolean,contentClass:String,"onUpdate:modelValue":[Function,Array]},setup(e,{slots:n,emit:h}){const{proxy:f}=fe(),{$q:o}=f,{registerTick:t}=Pe(),{registerTick:r}=Pe(),{registerTick:T}=Pe(),{registerTimeout:C,removeTimeout:D}=Ue(),{registerTimeout:s,removeTimeout:m}=Ue(),c=w(null),l=w(null),_=w(e.modelValue),q=w(!1),O=w(!0),j=w(!1),X=w(!1),d=[],L=w(0),M=w(!1);let I=null,B=null,N;const V=A(()=>({activeClass:e.activeClass,activeColor:e.activeColor,activeBgColor:e.activeBgColor,indicatorClass:Jt(e.indicatorColor,e.switchIndicator,e.vertical),narrowIndicator:e.narrowIndicator,inlineLabel:e.inlineLabel,noCaps:e.noCaps})),he=A(()=>{const a=L.value,i=_.value;for(let b=0;b<a;b++)if(d[b].name.value===i)return!0;return!1}),pe=A(()=>`q-tabs__content--align-${q.value===!0?"left":X.value===!0?"justify":e.align}`),ge=A(()=>`q-tabs row no-wrap items-center q-tabs--${q.value===!0?"":"not-"}scrollable q-tabs--${e.vertical===!0?"vertical":"horizontal"} q-tabs__arrows--${e.outsideArrows===!0?"outside":"inside"} q-tabs--mobile-with${e.mobileArrows===!0?"":"out"}-arrows`+(e.dense===!0?" q-tabs--dense":"")+(e.shrink===!0?" col-shrink":"")+(e.stretch===!0?" self-stretch":"")),p=A(()=>"q-tabs__content scroll--mobile row no-wrap items-center self-stretch hide-scrollbar relative-position "+pe.value+(e.contentClass!==void 0?` ${e.contentClass}`:"")),P=A(()=>e.vertical===!0?{container:"height",content:"offsetHeight",scroll:"scrollHeight"}:{container:"width",content:"offsetWidth",scroll:"scrollWidth"}),Q=A(()=>e.vertical!==!0&&o.lang.rtl===!0),F=A(()=>Ot===!1&&Q.value===!0);oe(Q,ee),oe(()=>e.modelValue,a=>{_e({name:a,setCurrent:!0,skipEmit:!0})}),oe(()=>e.outsideArrows,re);function _e({name:a,setCurrent:i,skipEmit:b}){_.value!==a&&(b!==!0&&e["onUpdate:modelValue"]!==void 0&&h("update:modelValue",a),(i===!0||e["onUpdate:modelValue"]===void 0)&&(nt(_.value,a),_.value=a))}function re(){t(()=>{Re({width:c.value.offsetWidth,height:c.value.offsetHeight})})}function Re(a){if(P.value===void 0||l.value===null)return;const i=a[P.value.container],b=Math.min(l.value[P.value.scroll],Array.prototype.reduce.call(l.value.children,(S,y)=>S+(y[P.value.content]||0),0)),k=i>0&&b>i;q.value=k,k===!0&&r(ee),X.value=i<parseInt(e.breakpoint,10)}function nt(a,i){const b=a!=null&&a!==""?d.find(S=>S.name.value===a):null,k=i!=null&&i!==""?d.find(S=>S.name.value===i):null;if(b&&k){const S=b.tabIndicatorRef.value,y=k.tabIndicatorRef.value;I!==null&&(clearTimeout(I),I=null),S.style.transition="none",S.style.transform="none",y.style.transition="none",y.style.transform="none";const g=S.getBoundingClientRect(),$=y.getBoundingClientRect();y.style.transform=e.vertical===!0?`translate3d(0,${g.top-$.top}px,0) scale3d(1,${$.height?g.height/$.height:1},1)`:`translate3d(${g.left-$.left}px,0,0) scale3d(${$.width?g.width/$.width:1},1,1)`,T(()=>{I=setTimeout(()=>{I=null,y.style.transition="transform .25s cubic-bezier(.4, 0, .2, 1)",y.style.transform="none"},70)})}k&&q.value===!0&&Z(k.rootRef.value)}function Z(a){const{left:i,width:b,top:k,height:S}=l.value.getBoundingClientRect(),y=a.getBoundingClientRect();let g=e.vertical===!0?y.top-k:y.left-i;if(g<0){l.value[e.vertical===!0?"scrollTop":"scrollLeft"]+=Math.floor(g),ee();return}g+=e.vertical===!0?y.height-S:y.width-b,g>0&&(l.value[e.vertical===!0?"scrollTop":"scrollLeft"]+=Math.ceil(g),ee())}function ee(){const a=l.value;if(a===null)return;const i=a.getBoundingClientRect(),b=e.vertical===!0?a.scrollTop:Math.abs(a.scrollLeft);Q.value===!0?(O.value=Math.ceil(b+i.width)<a.scrollWidth-1,j.value=b>0):(O.value=b>0,j.value=e.vertical===!0?Math.ceil(b+i.height)<a.scrollHeight:Math.ceil(b+i.width)<a.scrollWidth)}function Le(a){B!==null&&clearInterval(B),B=setInterval(()=>{it(a)===!0&&H()},5)}function Be(){Le(F.value===!0?Number.MAX_SAFE_INTEGER:0)}function Ee(){Le(F.value===!0?0:Number.MAX_SAFE_INTEGER)}function H(){B!==null&&(clearInterval(B),B=null)}function ot(a,i){const b=Array.prototype.filter.call(l.value.children,$=>$===i||$.matches&&$.matches(".q-tab.q-focusable")===!0),k=b.length;if(k===0)return;if(a===36)return Z(b[0]),b[0].focus(),!0;if(a===35)return Z(b[k-1]),b[k-1].focus(),!0;const S=a===(e.vertical===!0?38:37),y=a===(e.vertical===!0?40:39),g=S===!0?-1:y===!0?1:void 0;if(g!==void 0){const $=Q.value===!0?-1:1,z=b.indexOf(i)+g*$;return z>=0&&z<k&&(Z(b[z]),b[z].focus({preventScroll:!0})),!0}}const lt=A(()=>F.value===!0?{get:a=>Math.abs(a.scrollLeft),set:(a,i)=>{a.scrollLeft=-i}}:e.vertical===!0?{get:a=>a.scrollTop,set:(a,i)=>{a.scrollTop=i}}:{get:a=>a.scrollLeft,set:(a,i)=>{a.scrollLeft=i}});function it(a){const i=l.value,{get:b,set:k}=lt.value;let S=!1,y=b(i);const g=a<y?-1:1;return y+=g*5,y<0?(S=!0,y=0):(g===-1&&y<=a||g===1&&y>=a)&&(S=!0,y=a),k(i,y),ee(),S}function $e(a,i){for(const b in a)if(a[b]!==i[b])return!1;return!0}function rt(){let a=null,i={matchedLen:0,queryDiff:9999,hrefLen:0};const b=d.filter(g=>g.routeData!==void 0&&g.routeData.hasRouterLink.value===!0),{hash:k,query:S}=f.$route,y=Object.keys(S).length;for(const g of b){const $=g.routeData.exact.value===!0;if(g.routeData[$===!0?"linkIsExactActive":"linkIsActive"].value!==!0)continue;const{hash:z,query:Te,matched:vt,href:ft}=g.routeData.resolvedLink.value,ye=Object.keys(Te).length;if($===!0){if(z!==k||ye!==y||$e(S,Te)===!1)continue;a=g.name.value;break}if(z!==""&&z!==k||ye!==0&&$e(Te,S)===!1)continue;const K={matchedLen:vt.length,queryDiff:y-ye,hrefLen:ft.length-z.length};if(K.matchedLen>i.matchedLen){a=g.name.value,i=K;continue}else if(K.matchedLen!==i.matchedLen)continue;if(K.queryDiff<i.queryDiff)a=g.name.value,i=K;else if(K.queryDiff!==i.queryDiff)continue;K.hrefLen>i.hrefLen&&(a=g.name.value,i=K)}a===null&&d.some(g=>g.routeData===void 0&&g.name.value===_.value)===!0||_e({name:a,setCurrent:!0})}function st(a){if(D(),M.value!==!0&&c.value!==null&&a.target&&typeof a.target.closest=="function"){const i=a.target.closest(".q-tab");i&&c.value.contains(i)===!0&&(M.value=!0,q.value===!0&&Z(i))}}function ut(){C(()=>{M.value=!1},30)}function se(){Me.avoidRouteWatcher===!1?s(rt):m()}function Oe(){if(N===void 0){const a=oe(()=>f.$route.fullPath,se);N=()=>{a(),N=void 0}}}function ct(a){d.push(a),L.value++,re(),a.routeData===void 0||f.$route===void 0?s(()=>{if(q.value===!0){const i=_.value,b=i!=null&&i!==""?d.find(k=>k.name.value===i):null;b&&Z(b.rootRef.value)}}):(Oe(),a.routeData.hasRouterLink.value===!0&&se())}function dt(a){d.splice(d.indexOf(a),1),L.value--,re(),N!==void 0&&a.routeData!==void 0&&(d.every(i=>i.routeData===void 0)===!0&&N(),se())}const Me={currentModel:_,tabProps:V,hasFocus:M,hasActiveTab:he,registerTab:ct,unregisterTab:dt,verifyRouteModel:se,updateModel:_e,onKbdNavigate:ot,avoidRouteWatcher:!1};Tt(Ge,Me);function Qe(){I!==null&&clearTimeout(I),H(),N!==void 0&&N()}let Ne;return Ke(Qe),yt(()=>{Ne=N!==void 0,Qe()}),Ct(()=>{Ne===!0&&Oe(),re()}),()=>x("div",{ref:c,class:ge.value,role:"tablist",onFocusin:st,onFocusout:ut},[x(Ft,{onResize:Re}),x("div",{ref:l,class:p.value,onScroll:ee},be(n.default)),x(ae,{class:"q-tabs__arrow q-tabs__arrow--left absolute q-tab__icon"+(O.value===!0?"":" q-tabs__arrow--faded"),name:e.leftIcon||o.iconSet.tabs[e.vertical===!0?"up":"left"],onMousedownPassive:Be,onTouchstartPassive:Be,onMouseupPassive:H,onMouseleavePassive:H,onTouchendPassive:H}),x(ae,{class:"q-tabs__arrow q-tabs__arrow--right absolute q-tab__icon"+(j.value===!0?"":" q-tabs__arrow--faded"),name:e.rightIcon||o.iconSet.tabs[e.vertical===!0?"down":"right"],onMousedownPassive:Ee,onTouchstartPassive:Ee,onMouseupPassive:H,onMouseleavePassive:H,onTouchendPassive:H})])}});const Ie={left:!0,right:!0,up:!0,down:!0,horizontal:!0,vertical:!0},ea=Object.keys(Ie);Ie.all=!0;function We(e){const n={};for(const h of ea)e[h]===!0&&(n[h]=!0);return Object.keys(n).length===0?Ie:(n.horizontal===!0?n.left=n.right=!0:n.left===!0&&n.right===!0&&(n.horizontal=!0),n.vertical===!0?n.up=n.down=!0:n.up===!0&&n.down===!0&&(n.vertical=!0),n.horizontal===!0&&n.vertical===!0&&(n.all=!0),n)}const ta=["INPUT","TEXTAREA"];function Fe(e,n){return n.event===void 0&&e.target!==void 0&&e.target.draggable!==!0&&typeof n.handler=="function"&&ta.includes(e.target.nodeName.toUpperCase())===!1&&(e.qClonedBy===void 0||e.qClonedBy.indexOf(n.uid)===-1)}function aa(e){const n=[.06,6,50];return typeof e=="string"&&e.length&&e.split(":").forEach((h,f)=>{const o=parseFloat(h);o&&(n[f]=o)}),n}var na=Pt({name:"touch-swipe",beforeMount(e,{value:n,arg:h,modifiers:f}){if(f.mouse!==!0&&ne.has.touch!==!0)return;const o=f.mouseCapture===!0?"Capture":"",t={handler:n,sensitivity:aa(h),direction:We(f),noop:wt,mouseStart(r){Fe(r,t)&&At(r)&&(ue(t,"temp",[[document,"mousemove","move",`notPassive${o}`],[document,"mouseup","end","notPassiveCapture"]]),t.start(r,!0))},touchStart(r){if(Fe(r,t)){const T=r.target;ue(t,"temp",[[T,"touchmove","move","notPassiveCapture"],[T,"touchcancel","end","notPassiveCapture"],[T,"touchend","end","notPassiveCapture"]]),t.start(r)}},start(r,T){ne.is.firefox===!0&&we(e,!0);const C=Ve(r);t.event={x:C.left,y:C.top,time:Date.now(),mouse:T===!0,dir:!1}},move(r){if(t.event===void 0)return;if(t.event.dir!==!1){le(r);return}const T=Date.now()-t.event.time;if(T===0)return;const C=Ve(r),D=C.left-t.event.x,s=Math.abs(D),m=C.top-t.event.y,c=Math.abs(m);if(t.event.mouse!==!0){if(s<t.sensitivity[1]&&c<t.sensitivity[1]){t.end(r);return}}else if(window.getSelection().toString()!==""){t.end(r);return}else if(s<t.sensitivity[2]&&c<t.sensitivity[2])return;const l=s/T,_=c/T;t.direction.vertical===!0&&s<c&&s<100&&_>t.sensitivity[0]&&(t.event.dir=m<0?"up":"down"),t.direction.horizontal===!0&&s>c&&c<100&&l>t.sensitivity[0]&&(t.event.dir=D<0?"left":"right"),t.direction.up===!0&&s<c&&m<0&&s<100&&_>t.sensitivity[0]&&(t.event.dir="up"),t.direction.down===!0&&s<c&&m>0&&s<100&&_>t.sensitivity[0]&&(t.event.dir="down"),t.direction.left===!0&&s>c&&D<0&&c<100&&l>t.sensitivity[0]&&(t.event.dir="left"),t.direction.right===!0&&s>c&&D>0&&c<100&&l>t.sensitivity[0]&&(t.event.dir="right"),t.event.dir!==!1?(le(r),t.event.mouse===!0&&(document.body.classList.add("no-pointer-events--children"),document.body.classList.add("non-selectable"),Mt(),t.styleCleanup=q=>{t.styleCleanup=void 0,document.body.classList.remove("non-selectable");const O=()=>{document.body.classList.remove("no-pointer-events--children")};q===!0?setTimeout(O,50):O()}),t.handler({evt:r,touch:t.event.mouse!==!0,mouse:t.event.mouse,direction:t.event.dir,duration:T,distance:{x:s,y:c}})):t.end(r)},end(r){t.event!==void 0&&(Ae(t,"temp"),ne.is.firefox===!0&&we(e,!1),t.styleCleanup!==void 0&&t.styleCleanup(!0),r!==void 0&&t.event.dir!==!1&&le(r),t.event=void 0)}};if(e.__qtouchswipe=t,f.mouse===!0){const r=f.mouseCapture===!0||f.mousecapture===!0?"Capture":"";ue(t,"main",[[e,"mousedown","mouseStart",`passive${r}`]])}ne.has.touch===!0&&ue(t,"main",[[e,"touchstart","touchStart",`passive${f.capture===!0?"Capture":""}`],[e,"touchmove","noop","notPassiveCapture"]])},updated(e,n){const h=e.__qtouchswipe;h!==void 0&&(n.oldValue!==n.value&&(typeof n.value!="function"&&h.end(),h.handler=n.value),h.direction=We(n.modifiers))},beforeUnmount(e){const n=e.__qtouchswipe;n!==void 0&&(Ae(n,"main"),Ae(n,"temp"),ne.is.firefox===!0&&we(e,!1),n.styleCleanup!==void 0&&n.styleCleanup(),delete e.__qtouchswipe)}});const oa={name:{required:!0},disable:Boolean},He={setup(e,{slots:n}){return()=>x("div",{class:"q-panel scroll",role:"tabpanel"},be(n.default))}},la={modelValue:{required:!0},animated:Boolean,infinite:Boolean,swipeable:Boolean,vertical:Boolean,transitionPrev:String,transitionNext:String,transitionDuration:{type:[String,Number],default:300},keepAlive:Boolean,keepAliveInclude:[String,Array,RegExp],keepAliveExclude:[String,Array,RegExp],keepAliveMax:Number},ia=["update:modelValue","beforeTransition","transition"];function ra(){const{props:e,emit:n,proxy:h}=fe(),{getCacheWithFn:f}=jt();let o,t;const r=w(null),T=w(null);function C(p){const P=e.vertical===!0?"up":"left";B((h.$q.lang.rtl===!0?-1:1)*(p.direction===P?1:-1))}const D=A(()=>[[na,C,void 0,{horizontal:e.vertical!==!0,vertical:e.vertical,mouse:!0}]]),s=A(()=>e.transitionPrev||`slide-${e.vertical===!0?"down":"right"}`),m=A(()=>e.transitionNext||`slide-${e.vertical===!0?"up":"left"}`),c=A(()=>`--q-transition-duration: ${e.transitionDuration}ms`),l=A(()=>typeof e.modelValue=="string"||typeof e.modelValue=="number"?e.modelValue:String(e.modelValue)),_=A(()=>({include:e.keepAliveInclude,exclude:e.keepAliveExclude,max:e.keepAliveMax})),q=A(()=>e.keepAliveInclude!==void 0||e.keepAliveExclude!==void 0);oe(()=>e.modelValue,(p,P)=>{const Q=d(p)===!0?L(p):-1;t!==!0&&I(Q===-1?0:Q<L(P)?-1:1),r.value!==Q&&(r.value=Q,n("beforeTransition",p,P),qt(()=>{n("transition",p,P)}))});function O(){B(1)}function j(){B(-1)}function X(p){n("update:modelValue",p)}function d(p){return p!=null&&p!==""}function L(p){return o.findIndex(P=>P.props.name===p&&P.props.disable!==""&&P.props.disable!==!0)}function M(){return o.filter(p=>p.props.disable!==""&&p.props.disable!==!0)}function I(p){const P=p!==0&&e.animated===!0&&r.value!==-1?"q-transition--"+(p===-1?s.value:m.value):null;T.value!==P&&(T.value=P)}function B(p,P=r.value){let Q=P+p;for(;Q>-1&&Q<o.length;){const F=o[Q];if(F!==void 0&&F.props.disable!==""&&F.props.disable!==!0){I(p),t=!0,n("update:modelValue",F.props.name),setTimeout(()=>{t=!1});return}Q+=p}e.infinite===!0&&o.length!==0&&P!==-1&&P!==o.length&&B(p,p===-1?o.length:-1)}function N(){const p=L(e.modelValue);return r.value!==p&&(r.value=p),!0}function V(){const p=d(e.modelValue)===!0&&N()&&o[r.value];return e.keepAlive===!0?[x(Dt,_.value,[x(q.value===!0?f(l.value,()=>({...He,name:l.value})):He,{key:l.value,style:c.value},()=>p)])]:[x("div",{class:"q-panel scroll",style:c.value,key:l.value,role:"tabpanel"},[p])]}function he(){if(o.length!==0)return e.animated===!0?[x(kt,{name:T.value},V)]:V()}function pe(p){return o=St(be(p.default,[])).filter(P=>P.props!==null&&P.props.slot===void 0&&d(P.props.name)===!0),o.length}function ge(){return o}return Object.assign(h,{next:O,previous:j,goTo:X}),{panelIndex:r,panelDirectives:D,updatePanelsList:pe,updatePanelIndex:N,getPanelContent:he,getEnabledPanels:M,getPanels:ge,isValidPanelName:d,keepAliveProps:_,needsUniqueKeepAliveWrapper:q,goToPanelByOffset:B,goToPanel:X,nextPanel:O,previousPanel:j}}var ke=me({name:"QTabPanel",props:oa,setup(e,{slots:n}){return()=>x("div",{class:"q-tab-panel",role:"tabpanel"},be(n.default))}}),sa=me({name:"QTabPanels",props:{...la,...xt},emits:ia,setup(e,{slots:n}){const h=fe(),f=It(e,h.proxy.$q),{updatePanelsList:o,getPanelContent:t,panelDirectives:r}=ra(),T=A(()=>"q-tab-panels q-panel-parent"+(f.value===!0?" q-tab-panels--dark q-dark":""));return()=>(o(n),Rt("div",{class:T.value},t(),"pan",e.swipeable,()=>r.value))}});const ua=R("div",{class:"text-h6"},"Review Item List",-1),ca={__name:"viewListApprovalItem",props:{cd:String,typeCD:String},setup(e){const{dialogRef:n,onDialogHide:h,onDialogOK:f,onDialogCancel:o}=tt();De();const t=e,r=w(!1),T=w([{name:"MITM_ITMNM",label:"Item Name",field:"MITM_ITMNM",sortable:!0,align:"left"},{name:"TQUODETA_USAGE_DESCRIPTION",label:"Usage",field:"TQUODETA_USAGE_DESCRIPTION",sortable:!0,align:"left"},{name:"TQUODETA_PRC",label:"Price",field:"TQUODETA_PRC",sortable:!0,align:"left",format:l=>l.toLocaleString()},{name:"TQUODETA_OPRPRC",label:"Operator",field:"TQUODETA_OPRPRC",sortable:!0,align:"left",format:l=>l.toLocaleString()},{name:"TQUODETA_MOBDEMOB",label:"MOB DEMOB",field:"TQUODETA_MOBDEMOB",sortable:!0,align:"left",format:l=>l.toLocaleString()},{name:"SUBTOT",label:"SUBTOTAL",sortable:!0,field:l=>l.TQUODETA_PRC+l.TQUODETA_OPRPRC+l.TQUODETA_MOBDEMOB,align:"left",format:l=>l.toLocaleString()}]),C=w([]),D=w("items");Se(()=>{s()});const s=async()=>{r.value=!0,await at.get(`${t.typeCD}/${btoa(t.cd)}`).then(l=>{r.value=!1,C.value=l.data}).catch(l=>{r.value=!1})},m=()=>{},c=()=>{};return(l,_)=>(E(),J(et,{ref_key:"dialogRef",ref:n,onHide:ve(h),"transition-show":"slide-up","transition-hide":"slide-down","full-width":"",persistent:""},{default:v(()=>[u(de,{class:"q-dialog-plugin bg-white q-pa-sm"},{default:v(()=>[u(G,null,{default:v(()=>[ua]),_:1}),u(G,{class:"q-pa-sm",style:{height:"70vh",overflow:"auto"}},{default:v(()=>[u(Zt,{modelValue:D.value,"onUpdate:modelValue":_[0]||(_[0]=q=>D.value=q),dense:"",class:"text-grey","active-color":"primary","indicator-color":"primary",align:"justify","narrow-indicator":""},{default:v(()=>[u(qe,{name:"items",label:"Items"}),u(qe,{name:"conditions",label:"Conditions"}),u(qe,{name:"histCond",label:"Approval History"})]),_:1},8,["modelValue"]),u(Ye),u(sa,{modelValue:D.value,"onUpdate:modelValue":_[1]||(_[1]=q=>D.value=q),animated:""},{default:v(()=>[u(ke,{name:"items"},{default:v(()=>[t.typeCD=="quotation"?(E(),J(xe,{key:0,title:"Item List",rows:C.value.dataItem,columns:T.value,"row-key":"name",dense:"",loading:r.value},null,8,["rows","columns","loading"])):Lt("",!0)]),_:1}),u(ke,{name:"conditions"},{default:v(()=>[u(Qt,{bordered:"",dense:""},{default:v(()=>[(E(!0),W(te,null,ce(C.value.dataCondition,(q,O)=>Xe((E(),J(Nt,{clickable:"",key:O},{default:v(()=>[u(je,{avatar:""},{default:v(()=>[u(Bt,{color:"primary","text-color":"white",size:"sm"},{default:v(()=>[ie(U(O+1),1)]),_:2},1024)]),_:2},1024),u(je,null,{default:v(()=>[ie(U(q.TQUOCOND_CONDI),1)]),_:2},1024)]),_:2},1024)),[[Je]])),128))]),_:1})]),_:1}),u(ke,{name:"histCond"},{default:v(()=>[ie(" Lorem ipsum dolor sit amet consectetur adipisicing elit. ")]),_:1})]),_:1},8,["modelValue"])]),_:1}),u(Ze,{align:"center"},{default:v(()=>[u(Ut,null,{default:v(()=>[u(Y,{color:"primary",icon:"check",label:"Approve",disable:C.value.length>0,onClick:_[2]||(_[2]=q=>m())},null,8,["disable"]),u(Y,{color:"red",icon:"cancel",label:"Reject",disable:C.value.length>0,onClick:_[3]||(_[3]=q=>c())},null,8,["disable"]),u(Y,{color:"orange",flat:"",label:"cancel",onClick:ve(o)},null,8,["onClick"])]),_:1})]),_:1})]),_:1})]),_:1},8,["onHide"]))}},da=R("div",{class:"text-h6"},"Approval List",-1),va={class:"q-pa-xs col-xs-12 col-sm-6 col-md-4"},fa={class:"text-h5 text-bold"},ma={class:"text-h6 text-bold"},ba={class:"text-subtitle2"},ha={class:"row"},pa={class:"col"},ga={class:"col text-right"},_a={__name:"viewListApproval",props:{listApprv:Array,typeAPI:String},setup(e){const n=De(),h=e,f=w([{name:"APP_CD",label:"Doc Code",field:"APP_CD"},{name:"APP_CUSNM",label:"Customer",field:"APP_CUSNM"},{name:"APP_SBJCT",label:"Subject",field:"APP_SBJCT"},{name:"APP_ATTN",label:"Attn",field:"APP_ATTN"},{name:"CREATED_AT",label:"Created Date",field:"CREATED_AT"}]),o=w(""),t=(m,c="days")=>{const l=new Date,_=new Date(m);return zt.getDateDiff(l,_,c)},r=m=>{let c="";h.typeAPI=="quot"?c="quotation":h.typeAPI=="pr"?c="purchase-request-approval":h.typeAPI=="po"&&(c="purchase-order/approval-document"),n.dialog({component:ca,componentProps:{cd:m,typeCD:c}}).onOk(async l=>{quotationGroupConditions.value=l.MCONDITION_RPT_STAT,quotationConditions.value=l.group})},{dialogRef:T,onDialogHide:C,onDialogOK:D,onDialogCancel:s}=tt();return(m,c)=>(E(),J(et,{ref_key:"dialogRef",ref:T,onHide:ve(C),"transition-show":"slide-up","transition-hide":"slide-down","full-width":"",persistent:""},{default:v(()=>[u(de,{class:"q-dialog-plugin bg-white q-pa-sm"},{default:v(()=>[u(G,null,{default:v(()=>[da]),_:1}),u(G,{class:"q-pa-sm",style:{height:"70vh",overflow:"auto"}},{default:v(()=>[u(xe,{grid:"",flat:"",bordered:"","card-container-class":m.cardContainerClass,title:"Outstanding Approval",rows:h.listApprv,columns:f.value,"row-key":"name",filter:o.value,"hide-header":"",pagination:{rowsPerPage:50},"rows-per-page-options":m.rowsPerPageOptions},{"top-right":v(()=>[u(Et,{borderless:"",dense:"",debounce:"300",modelValue:o.value,"onUpdate:modelValue":c[0]||(c[0]=l=>o.value=l),placeholder:"Search"},{append:v(()=>[u(ae,{name:"search"})]),_:1},8,["modelValue"])]),item:v(l=>[R("div",va,[u(de,{flat:"",bordered:""},{default:v(()=>[u(G,{class:"text-center bg-secondary text-white"},{default:v(()=>[R("div",fa,U(l.row.APP_CUSNM),1)]),_:2},1024),u(Ye),u(G,null,{default:v(()=>[R("div",ma,U(l.row.APP_CD),1),R("div",ba,U(l.row.APP_SBJCT),1)]),_:2},1024),u(G,null,{default:v(()=>[R("div",ha,[R("div",pa,[u(Y,{label:"Preview",color:"primary",outline:"",onClick:_=>r(l.row.APP_CD)},null,8,["onClick"])]),R("div",ga,U(t(l.row.CREATED_AT)<30?`${t(l.row.CREATED_AT)} Days Ago`:`${t(l.row.CREATED_AT,"months")} Month ago`),1)])]),_:2},1024)]),_:2},1024)])]),_:1},8,["card-container-class","rows","columns","filter","rows-per-page-options"])]),_:1}),u(Ze,{align:"right"},{default:v(()=>[u(Y,{label:"OK",color:"primary",onClick:c[1]||(c[1]=l=>ve(D)()),disable:m.stateSubmit},null,8,["disable"])]),_:1})]),_:1})]),_:1},8,["onHide"]))}},Ta={class:"q-pa-md bg-grey-5 window-height"},ya={class:"row"},Ca={class:"row"},Pa={class:"col"},wa={class:"text-h3 text-cyan"},Aa={class:"text-subtitle2 text-cyan"},qa={class:"col text-right"},ka={class:"row q-pa-sm"},Sa={class:"col"},Da={key:1},Ea={__name:"dashboardView",setup(e){const n=De(),h=w([{total:900,title:"Total Sales",icon:"shopping_cart",color:"cyan"},{total:900,title:"Total Purchase",icon:"shopping_bag",color:"cyan"},{total:900,title:"Total Profit",icon:"payments",color:"cyan"},{total:15,title:"Total Customer",icon:"group",color:"cyan"},{total:15,title:"Total Customer",icon:"group",color:"cyan"},{total:15,title:"Total Customer",icon:"group",color:"cyan"},{total:15,title:"Total Customer",icon:"group",color:"cyan"},{total:15,title:"Total Customer",icon:"group",color:"cyan"}]),f=w([{name:"name",label:"Business",field:"name",sortable:!0,align:"left"},{name:"quot",label:"Quotation",field:"quot_count",sortable:!0,align:"center"},{name:"pr",label:"Purchase Request",field:"pr_count",sortable:!0,align:"center"},{name:"po",label:"Purchase Order",field:"po_count",sortable:!0,align:"center"}]),o=w([]),t=w(!1);w(null),Se(async()=>{await r()});const r=async()=>{t.value=!0,await at.get("/approval/notificationsAPI/top-user").then(C=>{t.value=!1,o.value=C.data}).catch(C=>{t.value=!1})},T=(C,D)=>{n.dialog({component:_a,componentProps:{listApprv:C,typeAPI:D}}).onOk(async s=>{quotationGroupConditions.value=s.MCONDITION_RPT_STAT,quotationConditions.value=s.group})};return(C,D)=>(E(),W("div",Ta,[R("div",ya,[(E(!0),W(te,null,ce(h.value,(s,m)=>(E(),W("div",{class:$t("col-3 q-pa-sm"),key:m},[u(de,null,{default:v(()=>[u(G,null,{default:v(()=>[R("div",Ca,[R("div",Pa,[R("div",wa,U(s.total),1),R("div",Aa,U(s.title),1)]),R("div",qa,[u(ae,{name:s.icon,size:"4.4em",color:s.color},null,8,["name","color"])])])]),_:2},1024)]),_:2},1024)]))),128))]),R("div",ka,[R("div",Sa,[u(xe,{flat:"",bordered:"",title:"Approval List",rows:o.value,columns:f.value,"row-key":"name",loading:t.value},{"top-right":v(()=>[u(Y,{flat:"",icon:"refresh",color:"cyan",onClick:r})]),header:v(s=>[u(ze,{props:s},{default:v(()=>[(E(!0),W(te,null,ce(s.cols,m=>(E(),J(Vt,{key:m.name,props:s},{default:v(()=>[ie(U(m.label),1)]),_:2},1032,["props"]))),128))]),_:2},1032,["props"])]),body:v(s=>[u(ze,{props:s},{default:v(()=>[(E(!0),W(te,null,ce(s.cols,m=>(E(),J(Wt,{key:m.name,props:s},{default:v(()=>[m.name==="quot"||m.name==="pr"||m.name==="po"||m.name==="spk"?(E(),W(te,{key:0},[m.value>0?(E(),J(Y,{key:0,flat:"",color:"blue",onClick:c=>T(s.row[m.name.split("_")[0]],m.name)},{default:v(()=>[R("b",null,U(m.value),1)]),_:2},1032,["onClick"])):(E(),W("span",Da,U(m.value),1))],64)):(E(),W(te,{key:1},[ie(U(m.value),1)],64))]),_:2},1032,["props"]))),128))]),_:2},1032,["props"])]),_:1},8,["rows","columns","loading"])])])]))}};export{Ea as default};
