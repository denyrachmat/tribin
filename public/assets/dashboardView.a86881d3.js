import{i as yt,e as Oe,t as P,a as I,j as st,o as ee,b8 as ut,U as Ne,W as Ue,h as O,ac as me,ae as Pt,aQ as wt,an as oe,z as At,g as Pe,aL as Rt,b9 as kt,c as we,a4 as Qe,a5 as et,w as fe,p as Dt,aq as qt,ar as St,d as Ae,b1 as It,ah as ve,n as xt,ba as $t,aa as ye,bb as Be,aB as tt,a9 as Ee,G as Mt,ab as Ht,bc as Ot,bd as Qt,ai as Bt,ak as Et,ay as Nt,C as H,D as X,E as o,F as t,M as de,O as F,aY as Re,J as k,$ as ce,R as z,S as ne,T as pe,V as Ut,I as J,P as U,Y as Z,X as ke,Q as j,Z as De,b7 as Vt}from"./index.7347cdc9.js";import{w as Lt,i as jt,u as qe,a as he,k as _e,Q as at,b as lt,c as se,d as ue,m as Kt}from"./QTable.53af305a.js";import{Q as nt,a as Ft}from"./QTd.c0f08433.js";import{api_web as Y}from"./axios.18ddec4d.js";import{d as ct}from"./date.a558d0fd.js";import{Q as Wt}from"./QResizeObserver.af4eeb83.js";import{g as ot,s as rt}from"./touch.9135741d.js";import{u as zt}from"./use-render-cache.3aae9b27.js";import{Q as Ve}from"./QBtnGroup.6deb9289.js";let Jt=0;const Yt=["click","keydown"],Gt={icon:String,label:[Number,String],alert:[Boolean,String],alertIcon:String,name:{type:[Number,String],default:()=>`t_${Jt++}`},noCaps:Boolean,tabindex:[String,Number],disable:Boolean,contentClass:String,ripple:{type:[Boolean,Object],default:!0}};function Xt(e,m,g,h){const i=yt(ut,Oe);if(i===Oe)return console.error("QTab/QRouteTab component needs to be child of QTabs"),Oe;const{proxy:a}=Pe(),l=P(null),s=P(null),x=P(null),C=I(()=>e.disable===!0||e.ripple===!1?!1:Object.assign({keyCodes:[13,32],early:!0},e.ripple===!0?{}:e.ripple)),b=I(()=>i.currentModel.value===e.name),c=I(()=>"q-tab relative-position self-stretch flex flex-center text-center"+(b.value===!0?" q-tab--active"+(i.tabProps.value.activeClass?" "+i.tabProps.value.activeClass:"")+(i.tabProps.value.activeColor?` text-${i.tabProps.value.activeColor}`:"")+(i.tabProps.value.activeBgColor?` bg-${i.tabProps.value.activeBgColor}`:""):" q-tab--inactive")+(e.icon&&e.label&&i.tabProps.value.inlineLabel===!1?" q-tab--full":"")+(e.noCaps===!0||i.tabProps.value.noCaps===!0?" q-tab--no-caps":"")+(e.disable===!0?" disabled":" q-focusable q-hoverable cursor-pointer")+(h!==void 0?h.linkClass.value:"")),r=I(()=>"q-tab__content self-stretch flex-center relative-position q-anchor--skip non-selectable "+(i.tabProps.value.inlineLabel===!0?"row no-wrap q-tab__content--inline":"column")+(e.contentClass!==void 0?` ${e.contentClass}`:"")),f=I(()=>e.disable===!0||i.hasFocus.value===!0||b.value===!1&&i.hasActiveTab.value===!0?-1:e.tabindex||0);function R(p,B){if(B!==!0&&l.value!==null&&l.value.focus(),e.disable===!0){h!==void 0&&h.hasRouterLink.value===!0&&me(p);return}if(h===void 0){i.updateModel({name:e.name}),g("click",p);return}if(h.hasRouterLink.value===!0){const V=(Q={})=>{let E;const K=Q.to===void 0||Rt(Q.to,e.to)===!0?i.avoidRouteWatcher=kt():null;return h.navigateToRouterLink(p,{...Q,returnRouterError:!0}).catch(W=>{E=W}).then(W=>{if(K===i.avoidRouteWatcher&&(i.avoidRouteWatcher=!1,E===void 0&&(W===void 0||W.message!==void 0&&W.message.startsWith("Avoided redundant navigation")===!0)&&i.updateModel({name:e.name})),Q.returnRouterError===!0)return E!==void 0?Promise.reject(E):W})};g("click",p,V),p.defaultPrevented!==!0&&V();return}g("click",p)}function _(p){Pt(p,[13,32])?R(p,!0):wt(p)!==!0&&p.keyCode>=35&&p.keyCode<=40&&p.altKey!==!0&&p.metaKey!==!0&&i.onKbdNavigate(p.keyCode,a.$el)===!0&&me(p),g("keydown",p)}function u(){const p=i.tabProps.value.narrowIndicator,B=[],V=O("div",{ref:x,class:["q-tab__indicator",i.tabProps.value.indicatorClass]});e.icon!==void 0&&B.push(O(oe,{class:"q-tab__icon",name:e.icon})),e.label!==void 0&&B.push(O("div",{class:"q-tab__label"},e.label)),e.alert!==!1&&B.push(e.alertIcon!==void 0?O(oe,{class:"q-tab__alert-icon",color:e.alert!==!0?e.alert:void 0,name:e.alertIcon}):O("div",{class:"q-tab__alert"+(e.alert!==!0?` text-${e.alert}`:"")})),p===!0&&B.push(V);const Q=[O("div",{class:"q-focus-helper",tabindex:-1,ref:l}),O("div",{class:r.value},At(m.default,B))];return p===!1&&Q.push(V),Q}const d={name:I(()=>e.name),rootRef:s,tabIndicatorRef:x,routeData:h};st(()=>{i.unregisterTab(d)}),ee(()=>{i.registerTab(d)});function A(p,B){const V={ref:s,class:c.value,tabindex:f.value,role:"tab","aria-selected":b.value===!0?"true":"false","aria-disabled":e.disable===!0?"true":void 0,onClick:R,onKeydown:_,...B};return Ne(O(p,V,u()),[[Ue,C.value]])}return{renderTab:A,$tabs:i}}var be=we({name:"QTab",props:Gt,emits:Yt,setup(e,{slots:m,emit:g}){const{renderTab:h}=Xt(e,m,g);return()=>h("div")}});function Zt(e,m,g){const h=g===!0?["left","right"]:["top","bottom"];return`absolute-${m===!0?h[0]:h[1]}${e?` text-${e}`:""}`}const ea=["left","center","right","justify"];var Le=we({name:"QTabs",props:{modelValue:[Number,String],align:{type:String,default:"center",validator:e=>ea.includes(e)},breakpoint:{type:[String,Number],default:600},vertical:Boolean,shrink:Boolean,stretch:Boolean,activeClass:String,activeColor:String,activeBgColor:String,indicatorColor:String,leftIcon:String,rightIcon:String,outsideArrows:Boolean,mobileArrows:Boolean,switchIndicator:Boolean,narrowIndicator:Boolean,inlineLabel:Boolean,noCaps:Boolean,dense:Boolean,contentClass:String,"onUpdate:modelValue":[Function,Array]},setup(e,{slots:m,emit:g}){const{proxy:h}=Pe(),{$q:i}=h,{registerTick:a}=Qe(),{registerTick:l}=Qe(),{registerTick:s}=Qe(),{registerTimeout:x,removeTimeout:C}=et(),{registerTimeout:b,removeTimeout:c}=et(),r=P(null),f=P(null),R=P(e.modelValue),_=P(!1),u=P(!0),d=P(!1),A=P(!1),p=[],B=P(0),V=P(!1);let Q=null,E=null,K;const W=I(()=>({activeClass:e.activeClass,activeColor:e.activeColor,activeBgColor:e.activeBgColor,indicatorClass:Zt(e.indicatorColor,e.switchIndicator,e.vertical),narrowIndicator:e.narrowIndicator,inlineLabel:e.inlineLabel,noCaps:e.noCaps})),Se=I(()=>{const n=B.value,v=R.value;for(let T=0;T<n;T++)if(p[T].name.value===v)return!0;return!1}),Ie=I(()=>`q-tabs__content--align-${_.value===!0?"left":A.value===!0?"justify":e.align}`),xe=I(()=>`q-tabs row no-wrap items-center q-tabs--${_.value===!0?"":"not-"}scrollable q-tabs--${e.vertical===!0?"vertical":"horizontal"} q-tabs__arrows--${e.outsideArrows===!0?"outside":"inside"} q-tabs--mobile-with${e.mobileArrows===!0?"":"out"}-arrows`+(e.dense===!0?" q-tabs--dense":"")+(e.shrink===!0?" col-shrink":"")+(e.stretch===!0?" self-stretch":"")),y=I(()=>"q-tabs__content scroll--mobile row no-wrap items-center self-stretch hide-scrollbar relative-position "+Ie.value+(e.contentClass!==void 0?` ${e.contentClass}`:"")),S=I(()=>e.vertical===!0?{container:"height",content:"offsetHeight",scroll:"scrollHeight"}:{container:"width",content:"offsetWidth",scroll:"scrollWidth"}),L=I(()=>e.vertical!==!0&&i.lang.rtl===!0),te=I(()=>Lt===!1&&L.value===!0);fe(L,ie),fe(()=>e.modelValue,n=>{$e({name:n,setCurrent:!0,skipEmit:!0})}),fe(()=>e.outsideArrows,Te);function $e({name:n,setCurrent:v,skipEmit:T}){R.value!==n&&(T!==!0&&e["onUpdate:modelValue"]!==void 0&&g("update:modelValue",n),(v===!0||e["onUpdate:modelValue"]===void 0)&&(dt(R.value,n),R.value=n))}function Te(){a(()=>{Ke({width:r.value.offsetWidth,height:r.value.offsetHeight})})}function Ke(n){if(S.value===void 0||f.value===null)return;const v=n[S.value.container],T=Math.min(f.value[S.value.scroll],Array.prototype.reduce.call(f.value.children,(M,D)=>M+(D[S.value.content]||0),0)),$=v>0&&T>v;_.value=$,$===!0&&l(ie),A.value=v<parseInt(e.breakpoint,10)}function dt(n,v){const T=n!=null&&n!==""?p.find(M=>M.name.value===n):null,$=v!=null&&v!==""?p.find(M=>M.name.value===v):null;if(T&&$){const M=T.tabIndicatorRef.value,D=$.tabIndicatorRef.value;Q!==null&&(clearTimeout(Q),Q=null),M.style.transition="none",M.style.transform="none",D.style.transition="none",D.style.transform="none";const w=M.getBoundingClientRect(),N=D.getBoundingClientRect();D.style.transform=e.vertical===!0?`translate3d(0,${w.top-N.top}px,0) scale3d(1,${N.height?w.height/N.height:1},1)`:`translate3d(${w.left-N.left}px,0,0) scale3d(${N.width?w.width/N.width:1},1,1)`,s(()=>{Q=setTimeout(()=>{Q=null,D.style.transition="transform .25s cubic-bezier(.4, 0, .2, 1)",D.style.transform="none"},70)})}$&&_.value===!0&&re($.rootRef.value)}function re(n){const{left:v,width:T,top:$,height:M}=f.value.getBoundingClientRect(),D=n.getBoundingClientRect();let w=e.vertical===!0?D.top-$:D.left-v;if(w<0){f.value[e.vertical===!0?"scrollTop":"scrollLeft"]+=Math.floor(w),ie();return}w+=e.vertical===!0?D.height-M:D.width-T,w>0&&(f.value[e.vertical===!0?"scrollTop":"scrollLeft"]+=Math.ceil(w),ie())}function ie(){const n=f.value;if(n===null)return;const v=n.getBoundingClientRect(),T=e.vertical===!0?n.scrollTop:Math.abs(n.scrollLeft);L.value===!0?(u.value=Math.ceil(T+v.width)<n.scrollWidth-1,d.value=T>0):(u.value=T>0,d.value=e.vertical===!0?Math.ceil(T+v.height)<n.scrollHeight:Math.ceil(T+v.width)<n.scrollWidth)}function Fe(n){E!==null&&clearInterval(E),E=setInterval(()=>{mt(n)===!0&&ae()},5)}function We(){Fe(te.value===!0?Number.MAX_SAFE_INTEGER:0)}function ze(){Fe(te.value===!0?0:Number.MAX_SAFE_INTEGER)}function ae(){E!==null&&(clearInterval(E),E=null)}function vt(n,v){const T=Array.prototype.filter.call(f.value.children,N=>N===v||N.matches&&N.matches(".q-tab.q-focusable")===!0),$=T.length;if($===0)return;if(n===36)return re(T[0]),T[0].focus(),!0;if(n===35)return re(T[$-1]),T[$-1].focus(),!0;const M=n===(e.vertical===!0?38:37),D=n===(e.vertical===!0?40:39),w=M===!0?-1:D===!0?1:void 0;if(w!==void 0){const N=L.value===!0?-1:1,G=T.indexOf(v)+w*N;return G>=0&&G<$&&(re(T[G]),T[G].focus({preventScroll:!0})),!0}}const ft=I(()=>te.value===!0?{get:n=>Math.abs(n.scrollLeft),set:(n,v)=>{n.scrollLeft=-v}}:e.vertical===!0?{get:n=>n.scrollTop,set:(n,v)=>{n.scrollTop=v}}:{get:n=>n.scrollLeft,set:(n,v)=>{n.scrollLeft=v}});function mt(n){const v=f.value,{get:T,set:$}=ft.value;let M=!1,D=T(v);const w=n<D?-1:1;return D+=w*5,D<0?(M=!0,D=0):(w===-1&&D<=n||w===1&&D>=n)&&(M=!0,D=n),$(v,D),ie(),M}function Je(n,v){for(const T in n)if(n[T]!==v[T])return!1;return!0}function pt(){let n=null,v={matchedLen:0,queryDiff:9999,hrefLen:0};const T=p.filter(w=>w.routeData!==void 0&&w.routeData.hasRouterLink.value===!0),{hash:$,query:M}=h.$route,D=Object.keys(M).length;for(const w of T){const N=w.routeData.exact.value===!0;if(w.routeData[N===!0?"linkIsExactActive":"linkIsActive"].value!==!0)continue;const{hash:G,query:Me,matched:Tt,href:Ct}=w.routeData.resolvedLink.value,He=Object.keys(Me).length;if(N===!0){if(G!==$||He!==D||Je(M,Me)===!1)continue;n=w.name.value;break}if(G!==""&&G!==$||He!==0&&Je(Me,M)===!1)continue;const le={matchedLen:Tt.length,queryDiff:D-He,hrefLen:Ct.length-G.length};if(le.matchedLen>v.matchedLen){n=w.name.value,v=le;continue}else if(le.matchedLen!==v.matchedLen)continue;if(le.queryDiff<v.queryDiff)n=w.name.value,v=le;else if(le.queryDiff!==v.queryDiff)continue;le.hrefLen>v.hrefLen&&(n=w.name.value,v=le)}n===null&&p.some(w=>w.routeData===void 0&&w.name.value===R.value)===!0||$e({name:n,setCurrent:!0})}function bt(n){if(C(),V.value!==!0&&r.value!==null&&n.target&&typeof n.target.closest=="function"){const v=n.target.closest(".q-tab");v&&r.value.contains(v)===!0&&(V.value=!0,_.value===!0&&re(v))}}function gt(){x(()=>{V.value=!1},30)}function Ce(){Ge.avoidRouteWatcher===!1?b(pt):c()}function Ye(){if(K===void 0){const n=fe(()=>h.$route.fullPath,Ce);K=()=>{n(),K=void 0}}}function ht(n){p.push(n),B.value++,Te(),n.routeData===void 0||h.$route===void 0?b(()=>{if(_.value===!0){const v=R.value,T=v!=null&&v!==""?p.find($=>$.name.value===v):null;T&&re(T.rootRef.value)}}):(Ye(),n.routeData.hasRouterLink.value===!0&&Ce())}function _t(n){p.splice(p.indexOf(n),1),B.value--,Te(),K!==void 0&&n.routeData!==void 0&&(p.every(v=>v.routeData===void 0)===!0&&K(),Ce())}const Ge={currentModel:R,tabProps:W,hasFocus:V,hasActiveTab:Se,registerTab:ht,unregisterTab:_t,verifyRouteModel:Ce,updateModel:$e,onKbdNavigate:vt,avoidRouteWatcher:!1};Dt(ut,Ge);function Xe(){Q!==null&&clearTimeout(Q),ae(),K!==void 0&&K()}let Ze;return st(Xe),qt(()=>{Ze=K!==void 0,Xe()}),St(()=>{Ze===!0&&Ye(),Te()}),()=>O("div",{ref:r,class:xe.value,role:"tablist",onFocusin:bt,onFocusout:gt},[O(Wt,{onResize:Ke}),O("div",{ref:f,class:y.value,onScroll:ie},Ae(m.default)),O(oe,{class:"q-tabs__arrow q-tabs__arrow--left absolute q-tab__icon"+(u.value===!0?"":" q-tabs__arrow--faded"),name:e.leftIcon||i.iconSet.tabs[e.vertical===!0?"up":"left"],onMousedownPassive:We,onTouchstartPassive:We,onMouseupPassive:ae,onMouseleavePassive:ae,onTouchendPassive:ae}),O(oe,{class:"q-tabs__arrow q-tabs__arrow--right absolute q-tab__icon"+(d.value===!0?"":" q-tabs__arrow--faded"),name:e.rightIcon||i.iconSet.tabs[e.vertical===!0?"down":"right"],onMousedownPassive:ze,onTouchstartPassive:ze,onMouseupPassive:ae,onMouseleavePassive:ae,onTouchendPassive:ae})])}});function ta(e){const m=[.06,6,50];return typeof e=="string"&&e.length&&e.split(":").forEach((g,h)=>{const i=parseFloat(g);i&&(m[h]=i)}),m}var aa=It({name:"touch-swipe",beforeMount(e,{value:m,arg:g,modifiers:h}){if(h.mouse!==!0&&ve.has.touch!==!0)return;const i=h.mouseCapture===!0?"Capture":"",a={handler:m,sensitivity:ta(g),direction:ot(h),noop:xt,mouseStart(l){rt(l,a)&&$t(l)&&(ye(a,"temp",[[document,"mousemove","move",`notPassive${i}`],[document,"mouseup","end","notPassiveCapture"]]),a.start(l,!0))},touchStart(l){if(rt(l,a)){const s=l.target;ye(a,"temp",[[s,"touchmove","move","notPassiveCapture"],[s,"touchcancel","end","notPassiveCapture"],[s,"touchend","end","notPassiveCapture"]]),a.start(l)}},start(l,s){ve.is.firefox===!0&&Be(e,!0);const x=tt(l);a.event={x:x.left,y:x.top,time:Date.now(),mouse:s===!0,dir:!1}},move(l){if(a.event===void 0)return;if(a.event.dir!==!1){me(l);return}const s=Date.now()-a.event.time;if(s===0)return;const x=tt(l),C=x.left-a.event.x,b=Math.abs(C),c=x.top-a.event.y,r=Math.abs(c);if(a.event.mouse!==!0){if(b<a.sensitivity[1]&&r<a.sensitivity[1]){a.end(l);return}}else if(window.getSelection().toString()!==""){a.end(l);return}else if(b<a.sensitivity[2]&&r<a.sensitivity[2])return;const f=b/s,R=r/s;a.direction.vertical===!0&&b<r&&b<100&&R>a.sensitivity[0]&&(a.event.dir=c<0?"up":"down"),a.direction.horizontal===!0&&b>r&&r<100&&f>a.sensitivity[0]&&(a.event.dir=C<0?"left":"right"),a.direction.up===!0&&b<r&&c<0&&b<100&&R>a.sensitivity[0]&&(a.event.dir="up"),a.direction.down===!0&&b<r&&c>0&&b<100&&R>a.sensitivity[0]&&(a.event.dir="down"),a.direction.left===!0&&b>r&&C<0&&r<100&&f>a.sensitivity[0]&&(a.event.dir="left"),a.direction.right===!0&&b>r&&C>0&&r<100&&f>a.sensitivity[0]&&(a.event.dir="right"),a.event.dir!==!1?(me(l),a.event.mouse===!0&&(document.body.classList.add("no-pointer-events--children"),document.body.classList.add("non-selectable"),jt(),a.styleCleanup=_=>{a.styleCleanup=void 0,document.body.classList.remove("non-selectable");const u=()=>{document.body.classList.remove("no-pointer-events--children")};_===!0?setTimeout(u,50):u()}),a.handler({evt:l,touch:a.event.mouse!==!0,mouse:a.event.mouse,direction:a.event.dir,duration:s,distance:{x:b,y:r}})):a.end(l)},end(l){a.event!==void 0&&(Ee(a,"temp"),ve.is.firefox===!0&&Be(e,!1),a.styleCleanup!==void 0&&a.styleCleanup(!0),l!==void 0&&a.event.dir!==!1&&me(l),a.event=void 0)}};if(e.__qtouchswipe=a,h.mouse===!0){const l=h.mouseCapture===!0||h.mousecapture===!0?"Capture":"";ye(a,"main",[[e,"mousedown","mouseStart",`passive${l}`]])}ve.has.touch===!0&&ye(a,"main",[[e,"touchstart","touchStart",`passive${h.capture===!0?"Capture":""}`],[e,"touchmove","noop","notPassiveCapture"]])},updated(e,m){const g=e.__qtouchswipe;g!==void 0&&(m.oldValue!==m.value&&(typeof m.value!="function"&&g.end(),g.handler=m.value),g.direction=ot(m.modifiers))},beforeUnmount(e){const m=e.__qtouchswipe;m!==void 0&&(Ee(m,"main"),Ee(m,"temp"),ve.is.firefox===!0&&Be(e,!1),m.styleCleanup!==void 0&&m.styleCleanup(),delete e.__qtouchswipe)}});const la={name:{required:!0},disable:Boolean},it={setup(e,{slots:m}){return()=>O("div",{class:"q-panel scroll",role:"tabpanel"},Ae(m.default))}},na={modelValue:{required:!0},animated:Boolean,infinite:Boolean,swipeable:Boolean,vertical:Boolean,transitionPrev:String,transitionNext:String,transitionDuration:{type:[String,Number],default:300},keepAlive:Boolean,keepAliveInclude:[String,Array,RegExp],keepAliveExclude:[String,Array,RegExp],keepAliveMax:Number},oa=["update:modelValue","beforeTransition","transition"];function ra(){const{props:e,emit:m,proxy:g}=Pe(),{getCache:h}=zt();let i,a;const l=P(null),s=P(null);function x(y){const S=e.vertical===!0?"up":"left";E((g.$q.lang.rtl===!0?-1:1)*(y.direction===S?1:-1))}const C=I(()=>[[aa,x,void 0,{horizontal:e.vertical!==!0,vertical:e.vertical,mouse:!0}]]),b=I(()=>e.transitionPrev||`slide-${e.vertical===!0?"down":"right"}`),c=I(()=>e.transitionNext||`slide-${e.vertical===!0?"up":"left"}`),r=I(()=>`--q-transition-duration: ${e.transitionDuration}ms`),f=I(()=>typeof e.modelValue=="string"||typeof e.modelValue=="number"?e.modelValue:String(e.modelValue)),R=I(()=>({include:e.keepAliveInclude,exclude:e.keepAliveExclude,max:e.keepAliveMax})),_=I(()=>e.keepAliveInclude!==void 0||e.keepAliveExclude!==void 0);fe(()=>e.modelValue,(y,S)=>{const L=p(y)===!0?B(y):-1;a!==!0&&Q(L===-1?0:L<B(S)?-1:1),l.value!==L&&(l.value=L,m("beforeTransition",y,S),Mt(()=>{m("transition",y,S)}))});function u(){E(1)}function d(){E(-1)}function A(y){m("update:modelValue",y)}function p(y){return y!=null&&y!==""}function B(y){return i.findIndex(S=>S.props.name===y&&S.props.disable!==""&&S.props.disable!==!0)}function V(){return i.filter(y=>y.props.disable!==""&&y.props.disable!==!0)}function Q(y){const S=y!==0&&e.animated===!0&&l.value!==-1?"q-transition--"+(y===-1?b.value:c.value):null;s.value!==S&&(s.value=S)}function E(y,S=l.value){let L=S+y;for(;L!==-1&&L<i.length;){const te=i[L];if(te!==void 0&&te.props.disable!==""&&te.props.disable!==!0){Q(y),a=!0,m("update:modelValue",te.props.name),setTimeout(()=>{a=!1});return}L+=y}e.infinite===!0&&i.length!==0&&S!==-1&&S!==i.length&&E(y,y===-1?i.length:-1)}function K(){const y=B(e.modelValue);return l.value!==y&&(l.value=y),!0}function W(){const y=p(e.modelValue)===!0&&K()&&i[l.value];return e.keepAlive===!0?[O(Qt,R.value,[O(_.value===!0?h(f.value,()=>({...it,name:f.value})):it,{key:f.value,style:r.value},()=>y)])]:[O("div",{class:"q-panel scroll",style:r.value,key:f.value,role:"tabpanel"},[y])]}function Se(){if(i.length!==0)return e.animated===!0?[O(Ht,{name:s.value},W)]:W()}function Ie(y){return i=Ot(Ae(y.default,[])).filter(S=>S.props!==null&&S.props.slot===void 0&&p(S.props.name)===!0),i.length}function xe(){return i}return Object.assign(g,{next:u,previous:d,goTo:A}),{panelIndex:l,panelDirectives:C,updatePanelsList:Ie,updatePanelIndex:K,getPanelContent:Se,getEnabledPanels:V,getPanels:xe,isValidPanelName:p,keepAliveProps:R,needsUniqueKeepAliveWrapper:_,goToPanelByOffset:E,goToPanel:A,nextPanel:u,previousPanel:d}}var ge=we({name:"QTabPanel",props:la,setup(e,{slots:m}){return()=>O("div",{class:"q-tab-panel",role:"tabpanel"},Ae(m.default))}}),je=we({name:"QTabPanels",props:{...na,...Bt},emits:oa,setup(e,{slots:m}){const g=Pe(),h=Et(e,g.proxy.$q),{updatePanelsList:i,getPanelContent:a,panelDirectives:l}=ra(),s=I(()=>"q-tab-panels q-panel-parent"+(h.value===!0?" q-tab-panels--dark q-dark":""));return()=>(i(m),Nt("div",{class:s.value},a(),"pan",e.swipeable,()=>l.value))}});const ia=k("div",{class:"text-h6"},"Quotation Review",-1),sa={class:"row q-py-md"},ua={class:"col"},ca={class:"col q-pl-md"},da={class:"row q-pb-md"},va={class:"col"},fa={__name:"viewListApprovalItem",props:{dataHeader:Array,cd:String,typeCD:String,conn:String},setup(e){const{dialogRef:m,onDialogHide:g,onDialogOK:h,onDialogCancel:i}=qe(),a=he(),l=e;ee(()=>{c.value=l.dataHeader});const s=P(!1),x=P([{name:"MITM_ITMNM",label:"Item Name",field:"MITM_ITMNM",sortable:!0,align:"left"},{name:"TQUODETA_USAGE_DESCRIPTION",label:"Usage",field:"TQUODETA_USAGE_DESCRIPTION",sortable:!0,align:"left"},{name:"TQUODETA_PRC",label:"Price",field:"TQUODETA_PRC",sortable:!0,align:"left",format:u=>parseInt(u).toLocaleString()},{name:"SUBTOT",label:"SUBTOTAL",sortable:!0,field:u=>parseInt(u.TQUODETA_PRC)+parseInt(u.TQUODETA_OPRPRC)+parseInt(u.TQUODETA_MOBDEMOB),align:"left",format:u=>u.toLocaleString()}]),C=P([]),b=P("items"),c=P({MCUS_CUSNM:"",TQUO_ATTN:"",TQUO_SBJCT:""});ee(()=>{r()});const r=async()=>{s.value=!0,await Y.post(`${l.typeCD}`,{id:btoa(l.cd),TQUO_BRANCH:l.dataHeader.TQUO_BRANCH,conn:l.conn}).then(u=>{s.value=!1,C.value=u.data}).catch(u=>{s.value=!1})},f=()=>{a.dialog({title:"Confirm",message:"Are you sure want to Approve this quotation ?",cancel:!0,persistent:!0}).onOk(async u=>{s.value=!0,await Y.put(`approve/quotations/${btoa(l.cd)}`,{TQUO_BRANCH:l.dataHeader.TQUO_BRANCH,conn:l.conn}).then(d=>{s.value=!1,r(),h()}).catch(d=>{s.value=!1})})},R=()=>{a.dialog({title:"Confirm",message:"Are you sure want to Reject this quotation ?",cancel:!0,persistent:!0}).onOk(async u=>{a.dialog({title:"Prompt",message:"Input reject reason.",prompt:{model:"",isValid:d=>d.length>2,type:"text"},cancel:!0,persistent:!0}).onOk(async d=>{s.value=!0,await Y.put(`revise/quotations/${btoa(l.cd)}`,{remark:d,TQUO_BRANCH:l.dataHeader.TQUO_BRANCH,conn:l.conn}).then(A=>{s.value=!1,r()}).catch(A=>{s.value=!1})})})},_=()=>{window.open("https://joss.jatpowerindo.co.id/PDF/quotation/"+btoa(l.cd)+"/"+btoa(l.conn),"_blank").focus()};return(u,d)=>(H(),X(De,{ref_key:"dialogRef",ref:m,onHide:Z(g),"transition-show":"slide-up","transition-hide":"slide-down","full-width":""},{default:o(()=>[t(de,{class:"q-dialog-plugin bg-white q-pa-sm"},{default:o(()=>[t(F,null,{default:o(()=>[ia]),_:1}),t(F,{class:"q-pa-sm",style:{height:"70vh",overflow:"auto"}},{default:o(()=>[t(Le,{modelValue:b.value,"onUpdate:modelValue":d[0]||(d[0]=A=>b.value=A),dense:"",class:"text-grey","active-color":"primary","indicator-color":"primary",align:"justify","narrow-indicator":""},{default:o(()=>[t(be,{name:"items",label:"Items"}),t(be,{name:"conditions",label:"Conditions"}),t(be,{name:"histCond",label:"Approval History"})]),_:1},8,["modelValue"]),t(Re),t(je,{modelValue:b.value,"onUpdate:modelValue":d[4]||(d[4]=A=>b.value=A),animated:""},{default:o(()=>[t(ge,{name:"items"},{default:o(()=>[k("div",sa,[k("div",ua,[t(ce,{dense:"",filled:"",label:"Customer Name",modelValue:c.value.APP_CUSNM,"onUpdate:modelValue":d[1]||(d[1]=A=>c.value.APP_CUSNM=A),readonly:""},null,8,["modelValue"])]),k("div",ca,[t(ce,{dense:"",filled:"",label:"Attn.",modelValue:c.value.APP_ATTN,"onUpdate:modelValue":d[2]||(d[2]=A=>c.value.APP_ATTN=A),readonly:""},null,8,["modelValue"])])]),k("div",da,[k("div",va,[t(ce,{dense:"",filled:"",label:"Subject",modelValue:c.value.APP_SBJCT,"onUpdate:modelValue":d[3]||(d[3]=A=>c.value.APP_SBJCT=A),readonly:""},null,8,["modelValue"])])]),t(_e,{title:"Item List",rows:C.value.dataItem,columns:x.value,"row-key":"name",dense:"",loading:s.value},null,8,["rows","columns","loading"])]),_:1}),t(ge,{name:"conditions"},{default:o(()=>[t(at,{bordered:"",dense:""},{default:o(()=>[(H(!0),z(ne,null,pe(C.value.dataCondition,(A,p)=>Ne((H(),X(lt,{clickable:"",key:p},{default:o(()=>[t(se,{avatar:""},{default:o(()=>[t(Ut,{color:"primary","text-color":"white",size:"sm"},{default:o(()=>[J(U(p+1),1)]),_:2},1024)]),_:2},1024),t(se,null,{default:o(()=>[J(U(A.TQUOCOND_CONDI),1)]),_:2},1024)]),_:2},1024)),[[Ue]])),128))]),_:1})]),_:1}),t(ge,{name:"histCond"},{default:o(()=>[t(at,{bordered:"",separator:""},{default:o(()=>[(H(!0),z(ne,null,pe(C.value.approvalHistories,(A,p)=>Ne((H(),X(lt,{clickable:"",key:p},{default:o(()=>[t(se,null,{default:o(()=>[t(ue,null,{default:o(()=>[J(U(Z(ct).formatDate(A.created_at,"DD MMM YYYY HH:mm")),1)]),_:2},1024),t(ue,{caption:""},{default:o(()=>[J("Time")]),_:1})]),_:2},1024),t(se,null,{default:o(()=>[t(ue,null,{default:o(()=>[J(U(A.type==2?"Rejected":"Approved"),1)]),_:2},1024),t(ue,{caption:""},{default:o(()=>[J("Status")]),_:1})]),_:2},1024),t(se,null,{default:o(()=>[t(ue,null,{default:o(()=>[J(U(A.remark),1)]),_:2},1024),t(ue,{caption:""},{default:o(()=>[J("Remarks")]),_:1})]),_:2},1024),t(se,{side:""},{default:o(()=>[t(oe,{name:A.type==2?"cancel":"check_circle",color:A.type==2?"red":"green"},null,8,["name","color"])]),_:2},1024)]),_:2},1024)),[[Ue]])),128))]),_:1})]),_:1})]),_:1},8,["modelValue"])]),_:1}),t(ke,{align:"center"},{default:o(()=>[t(Ve,null,{default:o(()=>[t(j,{color:"primary",icon:"print",disable:C.value.length===0,onClick:d[5]||(d[5]=A=>_()),flat:""},null,8,["disable"]),t(j,{color:"primary",icon:"check",label:"Approve",disable:C.value.length===0,onClick:d[6]||(d[6]=A=>f())},null,8,["disable"]),t(j,{color:"red",icon:"cancel",label:"Reject",disable:C.value.length===0,onClick:d[7]||(d[7]=A=>R())},null,8,["disable"]),t(j,{color:"orange",flat:"",label:"cancel",onClick:Z(i)},null,8,["onClick"])]),_:1})]),_:1})]),_:1})]),_:1},8,["onHide"]))}},ma=k("div",{class:"text-h6"},"PR Review",-1),pa={class:"row q-pb-md"},ba={class:"col"},ga={__name:"viewListPRItem",props:{dataHeader:Array,cd:String,typeCD:String,conn:String},setup(e){const{dialogRef:m,onDialogHide:g,onDialogOK:h,onDialogCancel:i}=qe(),a=he(),l=e;ee(()=>{c.value=l.dataHeader});const s=P(!1),x=P([{name:"MITM_ITMNM",label:"Item Name",field:"MITM_ITMNM",sortable:!0,align:"left"},{name:"TPCHREQDETA_REMARK",label:"Remark",field:"TPCHREQDETA_REMARK",sortable:!0,align:"left"},{name:"TPCHREQDETA_REQDT",label:"Request Date",field:"TPCHREQDETA_REQDT",sortable:!0,align:"left"}]),C=P([]),b=P("items"),c=P({MCUS_CUSNM:"",TQUO_ATTN:"",TQUO_SBJCT:""});ee(()=>{r()});const r=async()=>{s.value=!0,await Y.post(`${l.typeCD}`,{id:btoa(l.cd),TPCHREQDETA_BRANCH:l.dataHeader.TPCHREQ_BRANCH,conn:l.conn}).then(_=>{console.log(_.data.dataItem),s.value=!1,C.value=_.data}).catch(_=>{s.value=!1})},f=()=>{q.dialog({title:"Confirm",message:"Are you sure want to Approve this quotation ?",cancel:!0,persistent:!0}).onOk(async _=>{s.value=!0,await Y.put(`approve/purchase-request/${btoa(l.cd)}`,{TPCHREQ_BRANCH:l.dataHeader.TPCHREQ_BRANCH}).then(u=>{s.value=!1,r()}).catch(u=>{s.value=!1})})},R=()=>{a.dialog({title:"Confirm",message:"Are you sure want to Reject this quotation ?",cancel:!0,persistent:!0}).onOk(async _=>{a.dialog({title:"Prompt",message:"Input reject reason.",prompt:{model:"",isValid:u=>u.length>2,type:"text"},cancel:!0,persistent:!0}).onOk(async u=>{s.value=!0,await Y.put(`revise/purchase-request/${btoa(l.cd)}`,{remark:u,TPCHREQ_BRANCH:l.dataHeader.TPCHREQ_BRANCH}).then(d=>{s.value=!1,r()}).catch(d=>{s.value=!1})})})};return(_,u)=>(H(),X(De,{ref_key:"dialogRef",ref:m,onHide:Z(g),"transition-show":"slide-up","transition-hide":"slide-down","full-width":""},{default:o(()=>[t(de,{class:"q-dialog-plugin bg-white q-pa-sm"},{default:o(()=>[t(F,null,{default:o(()=>[ma]),_:1}),t(F,{class:"q-pa-sm",style:{height:"70vh",overflow:"auto"}},{default:o(()=>[t(Le,{modelValue:b.value,"onUpdate:modelValue":u[0]||(u[0]=d=>b.value=d),dense:"",class:"text-grey","active-color":"primary","indicator-color":"primary",align:"justify","narrow-indicator":""},{default:o(()=>[t(be,{name:"items",label:"Items"})]),_:1},8,["modelValue"]),t(Re),t(je,{modelValue:b.value,"onUpdate:modelValue":u[2]||(u[2]=d=>b.value=d),animated:""},{default:o(()=>[t(ge,{name:"items"},{default:o(()=>[k("div",pa,[k("div",ba,[t(ce,{dense:"",filled:"",label:"Purpose",modelValue:c.value.APP_SBJCT,"onUpdate:modelValue":u[1]||(u[1]=d=>c.value.APP_SBJCT=d),readonly:""},null,8,["modelValue"])])]),t(_e,{title:"Item List",rows:C.value.dataItem,columns:x.value,"row-key":"name",dense:"",loading:s.value},null,8,["rows","columns","loading"])]),_:1})]),_:1},8,["modelValue"])]),_:1}),t(ke,{align:"center"},{default:o(()=>[t(Ve,null,{default:o(()=>[t(j,{color:"primary",icon:"check",label:"Approve",disable:C.value.length===0,onClick:u[3]||(u[3]=d=>f())},null,8,["disable"]),t(j,{color:"red",icon:"cancel",label:"Reject",disable:C.value.length===0,onClick:u[4]||(u[4]=d=>R())},null,8,["disable"]),t(j,{color:"orange",flat:"",label:"cancel",onClick:Z(i)},null,8,["onClick"])]),_:1})]),_:1})]),_:1})]),_:1},8,["onHide"]))}},ha=k("div",{class:"text-h6"},"PO Review",-1),_a={class:"row q-pb-md"},Ta={class:"col"},Ca={__name:"viewListPOItem",props:{dataHeader:Array,cd:String,typeCD:String,conn:String},setup(e){const{dialogRef:m,onDialogHide:g,onDialogOK:h,onDialogCancel:i}=qe(),a=he(),l=e;ee(()=>{c.value=l.dataHeader});const s=P(!1),x=P([{name:"MITM_ITMNM",label:"Item Name",field:"MITM_ITMNM",sortable:!0,align:"left"},{name:"TPCHORDDETA_ITMPRC_PER",label:"Price",field:"TPCHORDDETA_ITMPRC_PER",sortable:!0,align:"left",format:_=>_.toLocaleString()},{name:"TPCHORDDETA_ITMQT",label:"Qty",field:"TPCHORDDETA_ITMQT",sortable:!0,align:"left",format:_=>_.toLocaleString()},{name:"SUBTOT",label:"SUBTOTAL",sortable:!0,field:_=>_.TPCHORDDETA_ITMPRC_PER*_.TPCHORDDETA_ITMQT,align:"left",format:_=>_.toLocaleString()}]),C=P([]),b=P("items"),c=P({MCUS_CUSNM:"",TQUO_ATTN:"",TQUO_SBJCT:""});ee(()=>{r()});const r=async()=>{s.value=!0,await Y.post(`${l.typeCD}`,{id:btoa(l.cd),TPCHORD_BRANCH:l.dataHeader.TPCHORD_BRANCH,conn:l.conn}).then(_=>{s.value=!1,C.value=_.data}).catch(_=>{s.value=!1})},f=()=>{q.dialog({title:"Confirm",message:"Are you sure want to Approve this quotation ?",cancel:!0,persistent:!0}).onOk(async _=>{s.value=!0,await Y.put(`approve/purchase-order/${btoa(l.cd)}`,{TPCHORD_BRANCH:l.dataHeader.TPCHORD_BRANCH}).then(u=>{s.value=!1,r()}).catch(u=>{s.value=!1})})},R=()=>{a.dialog({title:"Confirm",message:"Are you sure want to Reject this quotation ?",cancel:!0,persistent:!0}).onOk(async _=>{a.dialog({title:"Prompt",message:"Input reject reason.",prompt:{model:"",isValid:u=>u.length>2,type:"text"},cancel:!0,persistent:!0}).onOk(async u=>{s.value=!0,await Y.put(`revise/purchase-order/${btoa(l.cd)}`,{remark:u,TPCHORD_BRANCH:l.dataHeader.TPCHORD_BRANCH}).then(d=>{s.value=!1,r()}).catch(d=>{s.value=!1})})})};return(_,u)=>(H(),X(De,{ref_key:"dialogRef",ref:m,onHide:Z(g),"transition-show":"slide-up","transition-hide":"slide-down","full-width":""},{default:o(()=>[t(de,{class:"q-dialog-plugin bg-white q-pa-sm"},{default:o(()=>[t(F,null,{default:o(()=>[ha]),_:1}),t(F,{class:"q-pa-sm",style:{height:"70vh",overflow:"auto"}},{default:o(()=>[t(Le,{modelValue:b.value,"onUpdate:modelValue":u[0]||(u[0]=d=>b.value=d),dense:"",class:"text-grey","active-color":"primary","indicator-color":"primary",align:"justify","narrow-indicator":""},{default:o(()=>[t(be,{name:"items",label:"Items"})]),_:1},8,["modelValue"]),t(Re),t(je,{modelValue:b.value,"onUpdate:modelValue":u[2]||(u[2]=d=>b.value=d),animated:""},{default:o(()=>[t(ge,{name:"items"},{default:o(()=>[k("div",_a,[k("div",Ta,[t(ce,{dense:"",filled:"",label:"Supplier",modelValue:c.value.APP_CUSNM,"onUpdate:modelValue":u[1]||(u[1]=d=>c.value.APP_CUSNM=d),readonly:""},null,8,["modelValue"])])]),t(_e,{title:"Item List",rows:C.value.dataItem,columns:x.value,"row-key":"name",dense:"",loading:s.value},null,8,["rows","columns","loading"])]),_:1})]),_:1},8,["modelValue"])]),_:1}),t(ke,{align:"center"},{default:o(()=>[t(Ve,null,{default:o(()=>[t(j,{color:"primary",icon:"check",label:"Approve",disable:C.value.length===0,onClick:u[3]||(u[3]=d=>f())},null,8,["disable"]),t(j,{color:"red",icon:"cancel",label:"Reject",disable:C.value.length===0,onClick:u[4]||(u[4]=d=>R())},null,8,["disable"]),t(j,{color:"orange",flat:"",label:"cancel",onClick:Z(i)},null,8,["onClick"])]),_:1})]),_:1})]),_:1})]),_:1},8,["onHide"]))}},ya=k("div",{class:"text-h6"},"Approval List",-1),Pa={class:"q-pa-xs col-xs-12 col-sm-6 col-md-4"},wa={class:"text-h5 text-bold"},Aa={class:"text-h6 text-bold"},Ra={class:"text-subtitle2"},ka={class:"row"},Da={class:"col"},qa={class:"col text-right"},Sa={__name:"viewListApproval",props:{listApprv:Array,typeAPI:String,conn:String},setup(e){const m=he(),g=e,h=P([{name:"APP_CD",label:"Doc Code",field:"APP_CD"},{name:"APP_CUSNM",label:"Customer",field:"APP_CUSNM"},{name:"APP_SBJCT",label:"Subject",field:"APP_SBJCT"},{name:"APP_ATTN",label:"Attn",field:"APP_ATTN"},{name:"CREATED_AT",label:"Created Date",field:"CREATED_AT"}]),i=P(""),a=(c,r="days")=>{const f=new Date,R=new Date(c);return ct.getDateDiff(f,R,r)},l=(c,r)=>{let f="";g.typeAPI=="quot"?(f="quotation/quotation-approval",m.dialog({component:fa,componentProps:{dataHeader:r,cd:c,typeCD:f,conn:g.conn}}).onOk(async R=>{})):g.typeAPI=="pr"?(f="purchase-request-approval",m.dialog({component:ga,componentProps:{dataHeader:r,cd:c,typeCD:f,conn:g.conn}}).onOk(async R=>{})):g.typeAPI=="po"&&(f="purchase-order/approval-document",m.dialog({component:Ca,componentProps:{dataHeader:r,cd:c,typeCD:f,conn:g.conn}}).onOk(async R=>{}))},{dialogRef:s,onDialogHide:x,onDialogOK:C,onDialogCancel:b}=qe();return(c,r)=>(H(),X(De,{ref_key:"dialogRef",ref:s,onHide:Z(x),"transition-show":"slide-up","transition-hide":"slide-down","full-width":""},{default:o(()=>[t(de,{class:"q-dialog-plugin bg-white q-pa-sm"},{default:o(()=>[t(F,null,{default:o(()=>[ya]),_:1}),t(F,{class:"q-pa-sm",style:{height:"70vh",overflow:"auto"}},{default:o(()=>[t(_e,{grid:"",flat:"",bordered:"","card-container-class":c.cardContainerClass,title:"Outstanding Approval",rows:g.listApprv,columns:h.value,"row-key":"name",filter:i.value,"hide-header":"",pagination:{rowsPerPage:50},"rows-per-page-options":c.rowsPerPageOptions},{"top-right":o(()=>[t(ce,{borderless:"",dense:"",debounce:"300",modelValue:i.value,"onUpdate:modelValue":r[0]||(r[0]=f=>i.value=f),placeholder:"Search"},{append:o(()=>[t(oe,{name:"search"})]),_:1},8,["modelValue"])]),item:o(f=>[k("div",Pa,[t(de,{flat:"",bordered:""},{default:o(()=>[t(F,{class:"text-center bg-secondary text-white"},{default:o(()=>[k("div",wa,U(f.row.APP_CUSNM),1)]),_:2},1024),t(Re),t(F,null,{default:o(()=>[k("div",Aa,U(f.row.APP_CD),1),k("div",Ra,U(f.row.APP_SBJCT),1)]),_:2},1024),t(F,null,{default:o(()=>[k("div",ka,[k("div",Da,[t(j,{label:"Preview",color:"primary",outline:"",onClick:R=>l(f.row.APP_CD,f.row)},null,8,["onClick"])]),k("div",qa,U(a(f.row.CREATED_AT)<30?`${a(f.row.CREATED_AT)} Days Ago`:`${a(f.row.CREATED_AT,"months")} Month ago`),1)])]),_:2},1024)]),_:2},1024)])]),_:1},8,["card-container-class","rows","columns","filter","rows-per-page-options"])]),_:1}),t(ke,{align:"right"},{default:o(()=>[t(j,{label:"OK",color:"primary",onClick:r[1]||(r[1]=f=>Z(C)()),disable:c.stateSubmit},null,8,["disable"])]),_:1})]),_:1})]),_:1},8,["onHide"]))}},Ia={class:"q-pa-md bg-grey-5 window-height"},xa={class:"row"},$a={class:"row"},Ma={class:"col"},Ha={class:"text-h3 text-cyan"},Oa={class:"text-subtitle2 text-cyan"},Qa={class:"col text-right"},Ba={class:"row q-pa-sm"},Ea={class:"col"},Na={key:1},Ya={__name:"dashboardView",setup(e){const m=he(),g=P([{total:900,title:"Total Sales",icon:"shopping_cart",color:"cyan"},{total:900,title:"Total Purchase",icon:"shopping_bag",color:"cyan"},{total:900,title:"Total Profit",icon:"payments",color:"cyan"},{total:15,title:"Total Customer",icon:"group",color:"cyan"},{total:15,title:"Total Customer",icon:"group",color:"cyan"},{total:15,title:"Total Customer",icon:"group",color:"cyan"},{total:15,title:"Total Customer",icon:"group",color:"cyan"},{total:15,title:"Total Customer",icon:"group",color:"cyan"}]),h=P([{name:"name",label:"Business",field:"name",sortable:!0,align:"left"},{name:"quot",label:"Quotation",field:"quot_count",sortable:!0,align:"center"},{name:"pr",label:"Purchase Request",field:"pr_count",sortable:!0,align:"center"},{name:"po",label:"Purchase Order",field:"po_count",sortable:!0,align:"center"}]),i=P([]),a=P(!1),l=P(null);ee(async()=>{await s(),l.value=setInterval(s(),1e4)}),ee(()=>{clearInterval(l.value)});const s=async()=>{a.value=!0,await Y.get("/approval/notificationsAPI/top-user").then(C=>{a.value=!1,i.value=C.data}).catch(C=>{a.value=!1})},x=(C,b,c)=>{m.dialog({component:Sa,componentProps:{listApprv:C,typeAPI:b,conn:c}}).onOk(async r=>{quotationGroupConditions.value=r.MCONDITION_RPT_STAT,quotationConditions.value=r.group,s()})};return(C,b)=>(H(),z("div",Ia,[k("div",xa,[(H(!0),z(ne,null,pe(g.value,(c,r)=>(H(),z("div",{class:Vt("col-3 q-pa-sm"),key:r},[t(de,null,{default:o(()=>[t(F,null,{default:o(()=>[k("div",$a,[k("div",Ma,[k("div",Ha,U(c.total),1),k("div",Oa,U(c.title),1)]),k("div",Qa,[t(oe,{name:c.icon,size:"4.4em",color:c.color},null,8,["name","color"])])])]),_:2},1024)]),_:2},1024)]))),128))]),k("div",Ba,[k("div",Ea,[t(_e,{flat:"",bordered:"",title:"Approval List",rows:i.value,columns:h.value,"row-key":"name",loading:a.value},{"top-right":o(()=>[t(j,{flat:"",icon:"refresh",color:"cyan",onClick:s})]),header:o(c=>[t(nt,{props:c},{default:o(()=>[(H(!0),z(ne,null,pe(c.cols,r=>(H(),X(Kt,{key:r.name,props:c},{default:o(()=>[J(U(r.label),1)]),_:2},1032,["props"]))),128))]),_:2},1032,["props"])]),body:o(c=>[t(nt,{props:c},{default:o(()=>[(H(!0),z(ne,null,pe(c.cols,r=>(H(),X(Ft,{key:r.name,props:c},{default:o(()=>[r.name==="quot"||r.name==="pr"||r.name==="po"||r.name==="spk"?(H(),z(ne,{key:0},[r.value>0?(H(),X(j,{key:0,flat:"",color:"blue",onClick:f=>x(c.row[r.name.split("_")[0]],r.name,c.row.connection)},{default:o(()=>[k("b",null,U(r.value),1)]),_:2},1032,["onClick"])):(H(),z("span",Na,U(r.value),1))],64)):(H(),z(ne,{key:1},[J(U(r.value),1)],64))]),_:2},1032,["props"]))),128))]),_:2},1032,["props"])]),_:1},8,["rows","columns","loading"])])])]))}};export{Ya as default};
