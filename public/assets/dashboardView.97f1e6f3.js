import{i as yt,e as xe,t as P,a as S,j as it,o as ee,b0 as st,U as Ve,W as Be,h as x,ac as fe,ah as Pt,aE as At,at as oe,z as wt,g as ye,ay as Rt,b1 as kt,c as Pe,a4 as He,a5 as Ze,w as ve,p as Dt,ak as St,al as qt,d as Ae,b2 as It,aH as de,n as $t,b3 as Mt,aa as Ce,b4 as Qe,aK as et,a9 as Oe,G as Et,ab as xt,b5 as Ht,b6 as Qt,ad as Ot,af as Vt,as as Bt,C as M,D as z,E as r,F as t,M as ce,O as K,aY as we,J as A,$ as W,R as J,S as ne,T as me,V as Nt,I as Y,P as N,Y as Z,X as Re,Q as V,Z as ke,aZ as ut,b7 as Ut}from"./index.b3549cdb.js";import{Q as ge,a as Lt}from"./QTable.df604df4.js";import{Q as tt,a as jt}from"./QTd.9559b118.js";import{e as Kt,u as he}from"./format.5a4ef85b.js";import{api_web as G}from"./axios.73940ff8.js";import{d as ct}from"./date.d77f3747.js";import{u as De}from"./use-dialog-plugin-component.c75d84b7.js";import{Q as Ft}from"./QResizeObserver.55422eb4.js";import{r as Wt,Q as at,a as se,b as ue}from"./QSelect.d17be9e1.js";import{g as lt,s as nt}from"./touch.9135741d.js";import{u as zt}from"./use-render-cache.3aae9b27.js";import{Q as ot}from"./QList.d2d6274e.js";import{Q as Ne}from"./QBtnGroup.52f25596.js";let Jt=0;const Yt=["click","keydown"],Gt={icon:String,label:[Number,String],alert:[Boolean,String],alertIcon:String,name:{type:[Number,String],default:()=>`t_${Jt++}`},noCaps:Boolean,tabindex:[String,Number],disable:Boolean,contentClass:String,ripple:{type:[Boolean,Object],default:!0}};function Xt(e,m,T,b){const c=yt(st,xe);if(c===xe)return console.error("QTab/QRouteTab component needs to be child of QTabs"),xe;const{proxy:a}=ye(),l=P(null),d=P(null),q=P(null),h=S(()=>e.disable===!0||e.ripple===!1?!1:Object.assign({keyCodes:[13,32],early:!0},e.ripple===!0?{}:e.ripple)),_=S(()=>c.currentModel.value===e.name),s=S(()=>"q-tab relative-position self-stretch flex flex-center text-center"+(_.value===!0?" q-tab--active"+(c.tabProps.value.activeClass?" "+c.tabProps.value.activeClass:"")+(c.tabProps.value.activeColor?` text-${c.tabProps.value.activeColor}`:"")+(c.tabProps.value.activeBgColor?` bg-${c.tabProps.value.activeBgColor}`:""):" q-tab--inactive")+(e.icon&&e.label&&c.tabProps.value.inlineLabel===!1?" q-tab--full":"")+(e.noCaps===!0||c.tabProps.value.noCaps===!0?" q-tab--no-caps":"")+(e.disable===!0?" disabled":" q-focusable q-hoverable cursor-pointer")+(b!==void 0?b.linkClass.value:"")),i=S(()=>"q-tab__content self-stretch flex-center relative-position q-anchor--skip non-selectable "+(c.tabProps.value.inlineLabel===!0?"row no-wrap q-tab__content--inline":"column")+(e.contentClass!==void 0?` ${e.contentClass}`:"")),f=S(()=>e.disable===!0||c.hasFocus.value===!0||_.value===!1&&c.hasActiveTab.value===!0?-1:e.tabindex||0);function R(g,Q){if(Q!==!0&&l.value!==null&&l.value.focus(),e.disable===!0){b!==void 0&&b.hasRouterLink.value===!0&&fe(g);return}if(b===void 0){c.updateModel({name:e.name}),T("click",g);return}if(b.hasRouterLink.value===!0){const U=(H={})=>{let O;const j=H.to===void 0||Rt(H.to,e.to)===!0?c.avoidRouteWatcher=kt():null;return b.navigateToRouterLink(g,{...H,returnRouterError:!0}).catch(F=>{O=F}).then(F=>{if(j===c.avoidRouteWatcher&&(c.avoidRouteWatcher=!1,O===void 0&&(F===void 0||F.message!==void 0&&F.message.startsWith("Avoided redundant navigation")===!0)&&c.updateModel({name:e.name})),H.returnRouterError===!0)return O!==void 0?Promise.reject(O):F})};T("click",g,U),g.defaultPrevented!==!0&&U();return}T("click",g)}function E(g){Pt(g,[13,32])?R(g,!0):At(g)!==!0&&g.keyCode>=35&&g.keyCode<=40&&g.altKey!==!0&&g.metaKey!==!0&&c.onKbdNavigate(g.keyCode,a.$el)===!0&&fe(g),T("keydown",g)}function p(){const g=c.tabProps.value.narrowIndicator,Q=[],U=x("div",{ref:q,class:["q-tab__indicator",c.tabProps.value.indicatorClass]});e.icon!==void 0&&Q.push(x(oe,{class:"q-tab__icon",name:e.icon})),e.label!==void 0&&Q.push(x("div",{class:"q-tab__label"},e.label)),e.alert!==!1&&Q.push(e.alertIcon!==void 0?x(oe,{class:"q-tab__alert-icon",color:e.alert!==!0?e.alert:void 0,name:e.alertIcon}):x("div",{class:"q-tab__alert"+(e.alert!==!0?` text-${e.alert}`:"")})),g===!0&&Q.push(U);const H=[x("div",{class:"q-focus-helper",tabindex:-1,ref:l}),x("div",{class:i.value},wt(m.default,Q))];return g===!1&&H.push(U),H}const n={name:S(()=>e.name),rootRef:d,tabIndicatorRef:q,routeData:b};it(()=>{c.unregisterTab(n)}),ee(()=>{c.registerTab(n)});function u(g,Q){const U={ref:d,class:s.value,tabindex:f.value,role:"tab","aria-selected":_.value===!0?"true":"false","aria-disabled":e.disable===!0?"true":void 0,onClick:R,onKeydown:E,...Q};return Ve(x(g,U,p()),[[Be,h.value]])}return{renderTab:u,$tabs:c}}var pe=Pe({name:"QTab",props:Gt,emits:Yt,setup(e,{slots:m,emit:T}){const{renderTab:b}=Xt(e,m,T);return()=>b("div")}});function Zt(e,m,T){const b=T===!0?["left","right"]:["top","bottom"];return`absolute-${m===!0?b[0]:b[1]}${e?` text-${e}`:""}`}const ea=["left","center","right","justify"];var Ue=Pe({name:"QTabs",props:{modelValue:[Number,String],align:{type:String,default:"center",validator:e=>ea.includes(e)},breakpoint:{type:[String,Number],default:600},vertical:Boolean,shrink:Boolean,stretch:Boolean,activeClass:String,activeColor:String,activeBgColor:String,indicatorColor:String,leftIcon:String,rightIcon:String,outsideArrows:Boolean,mobileArrows:Boolean,switchIndicator:Boolean,narrowIndicator:Boolean,inlineLabel:Boolean,noCaps:Boolean,dense:Boolean,contentClass:String,"onUpdate:modelValue":[Function,Array]},setup(e,{slots:m,emit:T}){const{proxy:b}=ye(),{$q:c}=b,{registerTick:a}=He(),{registerTick:l}=He(),{registerTick:d}=He(),{registerTimeout:q,removeTimeout:h}=Ze(),{registerTimeout:_,removeTimeout:s}=Ze(),i=P(null),f=P(null),R=P(e.modelValue),E=P(!1),p=P(!0),n=P(!1),u=P(!1),g=[],Q=P(0),U=P(!1);let H=null,O=null,j;const F=S(()=>({activeClass:e.activeClass,activeColor:e.activeColor,activeBgColor:e.activeBgColor,indicatorClass:Zt(e.indicatorColor,e.switchIndicator,e.vertical),narrowIndicator:e.narrowIndicator,inlineLabel:e.inlineLabel,noCaps:e.noCaps})),Se=S(()=>{const o=Q.value,v=R.value;for(let C=0;C<o;C++)if(g[C].name.value===v)return!0;return!1}),qe=S(()=>`q-tabs__content--align-${E.value===!0?"left":u.value===!0?"justify":e.align}`),Ie=S(()=>`q-tabs row no-wrap items-center q-tabs--${E.value===!0?"":"not-"}scrollable q-tabs--${e.vertical===!0?"vertical":"horizontal"} q-tabs__arrows--${e.outsideArrows===!0?"outside":"inside"} q-tabs--mobile-with${e.mobileArrows===!0?"":"out"}-arrows`+(e.dense===!0?" q-tabs--dense":"")+(e.shrink===!0?" col-shrink":"")+(e.stretch===!0?" self-stretch":"")),y=S(()=>"q-tabs__content scroll--mobile row no-wrap items-center self-stretch hide-scrollbar relative-position "+qe.value+(e.contentClass!==void 0?` ${e.contentClass}`:"")),D=S(()=>e.vertical===!0?{container:"height",content:"offsetHeight",scroll:"scrollHeight"}:{container:"width",content:"offsetWidth",scroll:"scrollWidth"}),L=S(()=>e.vertical!==!0&&c.lang.rtl===!0),te=S(()=>Wt===!1&&L.value===!0);ve(L,ie),ve(()=>e.modelValue,o=>{$e({name:o,setCurrent:!0,skipEmit:!0})}),ve(()=>e.outsideArrows,_e);function $e({name:o,setCurrent:v,skipEmit:C}){R.value!==o&&(C!==!0&&e["onUpdate:modelValue"]!==void 0&&T("update:modelValue",o),(v===!0||e["onUpdate:modelValue"]===void 0)&&(dt(R.value,o),R.value=o))}function _e(){a(()=>{je({width:i.value.offsetWidth,height:i.value.offsetHeight})})}function je(o){if(D.value===void 0||f.value===null)return;const v=o[D.value.container],C=Math.min(f.value[D.value.scroll],Array.prototype.reduce.call(f.value.children,($,k)=>$+(k[D.value.content]||0),0)),I=v>0&&C>v;E.value=I,I===!0&&l(ie),u.value=v<parseInt(e.breakpoint,10)}function dt(o,v){const C=o!=null&&o!==""?g.find($=>$.name.value===o):null,I=v!=null&&v!==""?g.find($=>$.name.value===v):null;if(C&&I){const $=C.tabIndicatorRef.value,k=I.tabIndicatorRef.value;H!==null&&(clearTimeout(H),H=null),$.style.transition="none",$.style.transform="none",k.style.transition="none",k.style.transform="none";const w=$.getBoundingClientRect(),B=k.getBoundingClientRect();k.style.transform=e.vertical===!0?`translate3d(0,${w.top-B.top}px,0) scale3d(1,${B.height?w.height/B.height:1},1)`:`translate3d(${w.left-B.left}px,0,0) scale3d(${B.width?w.width/B.width:1},1,1)`,d(()=>{H=setTimeout(()=>{H=null,k.style.transition="transform .25s cubic-bezier(.4, 0, .2, 1)",k.style.transform="none"},70)})}I&&E.value===!0&&re(I.rootRef.value)}function re(o){const{left:v,width:C,top:I,height:$}=f.value.getBoundingClientRect(),k=o.getBoundingClientRect();let w=e.vertical===!0?k.top-I:k.left-v;if(w<0){f.value[e.vertical===!0?"scrollTop":"scrollLeft"]+=Math.floor(w),ie();return}w+=e.vertical===!0?k.height-$:k.width-C,w>0&&(f.value[e.vertical===!0?"scrollTop":"scrollLeft"]+=Math.ceil(w),ie())}function ie(){const o=f.value;if(o===null)return;const v=o.getBoundingClientRect(),C=e.vertical===!0?o.scrollTop:Math.abs(o.scrollLeft);L.value===!0?(p.value=Math.ceil(C+v.width)<o.scrollWidth-1,n.value=C>0):(p.value=C>0,n.value=e.vertical===!0?Math.ceil(C+v.height)<o.scrollHeight:Math.ceil(C+v.width)<o.scrollWidth)}function Ke(o){O!==null&&clearInterval(O),O=setInterval(()=>{mt(o)===!0&&ae()},5)}function Fe(){Ke(te.value===!0?Number.MAX_SAFE_INTEGER:0)}function We(){Ke(te.value===!0?0:Number.MAX_SAFE_INTEGER)}function ae(){O!==null&&(clearInterval(O),O=null)}function vt(o,v){const C=Array.prototype.filter.call(f.value.children,B=>B===v||B.matches&&B.matches(".q-tab.q-focusable")===!0),I=C.length;if(I===0)return;if(o===36)return re(C[0]),C[0].focus(),!0;if(o===35)return re(C[I-1]),C[I-1].focus(),!0;const $=o===(e.vertical===!0?38:37),k=o===(e.vertical===!0?40:39),w=$===!0?-1:k===!0?1:void 0;if(w!==void 0){const B=L.value===!0?-1:1,X=C.indexOf(v)+w*B;return X>=0&&X<I&&(re(C[X]),C[X].focus({preventScroll:!0})),!0}}const ft=S(()=>te.value===!0?{get:o=>Math.abs(o.scrollLeft),set:(o,v)=>{o.scrollLeft=-v}}:e.vertical===!0?{get:o=>o.scrollTop,set:(o,v)=>{o.scrollTop=v}}:{get:o=>o.scrollLeft,set:(o,v)=>{o.scrollLeft=v}});function mt(o){const v=f.value,{get:C,set:I}=ft.value;let $=!1,k=C(v);const w=o<k?-1:1;return k+=w*5,k<0?($=!0,k=0):(w===-1&&k<=o||w===1&&k>=o)&&($=!0,k=o),I(v,k),ie(),$}function ze(o,v){for(const C in o)if(o[C]!==v[C])return!1;return!0}function pt(){let o=null,v={matchedLen:0,queryDiff:9999,hrefLen:0};const C=g.filter(w=>w.routeData!==void 0&&w.routeData.hasRouterLink.value===!0),{hash:I,query:$}=b.$route,k=Object.keys($).length;for(const w of C){const B=w.routeData.exact.value===!0;if(w.routeData[B===!0?"linkIsExactActive":"linkIsActive"].value!==!0)continue;const{hash:X,query:Me,matched:Tt,href:Ct}=w.routeData.resolvedLink.value,Ee=Object.keys(Me).length;if(B===!0){if(X!==I||Ee!==k||ze($,Me)===!1)continue;o=w.name.value;break}if(X!==""&&X!==I||Ee!==0&&ze(Me,$)===!1)continue;const le={matchedLen:Tt.length,queryDiff:k-Ee,hrefLen:Ct.length-X.length};if(le.matchedLen>v.matchedLen){o=w.name.value,v=le;continue}else if(le.matchedLen!==v.matchedLen)continue;if(le.queryDiff<v.queryDiff)o=w.name.value,v=le;else if(le.queryDiff!==v.queryDiff)continue;le.hrefLen>v.hrefLen&&(o=w.name.value,v=le)}o===null&&g.some(w=>w.routeData===void 0&&w.name.value===R.value)===!0||$e({name:o,setCurrent:!0})}function bt(o){if(h(),U.value!==!0&&i.value!==null&&o.target&&typeof o.target.closest=="function"){const v=o.target.closest(".q-tab");v&&i.value.contains(v)===!0&&(U.value=!0,E.value===!0&&re(v))}}function gt(){q(()=>{U.value=!1},30)}function Te(){Ye.avoidRouteWatcher===!1?_(pt):s()}function Je(){if(j===void 0){const o=ve(()=>b.$route.fullPath,Te);j=()=>{o(),j=void 0}}}function ht(o){g.push(o),Q.value++,_e(),o.routeData===void 0||b.$route===void 0?_(()=>{if(E.value===!0){const v=R.value,C=v!=null&&v!==""?g.find(I=>I.name.value===v):null;C&&re(C.rootRef.value)}}):(Je(),o.routeData.hasRouterLink.value===!0&&Te())}function _t(o){g.splice(g.indexOf(o),1),Q.value--,_e(),j!==void 0&&o.routeData!==void 0&&(g.every(v=>v.routeData===void 0)===!0&&j(),Te())}const Ye={currentModel:R,tabProps:F,hasFocus:U,hasActiveTab:Se,registerTab:ht,unregisterTab:_t,verifyRouteModel:Te,updateModel:$e,onKbdNavigate:vt,avoidRouteWatcher:!1};Dt(st,Ye);function Ge(){H!==null&&clearTimeout(H),ae(),j!==void 0&&j()}let Xe;return it(Ge),St(()=>{Xe=j!==void 0,Ge()}),qt(()=>{Xe===!0&&Je(),_e()}),()=>x("div",{ref:i,class:Ie.value,role:"tablist",onFocusin:bt,onFocusout:gt},[x(Ft,{onResize:je}),x("div",{ref:f,class:y.value,onScroll:ie},Ae(m.default)),x(oe,{class:"q-tabs__arrow q-tabs__arrow--left absolute q-tab__icon"+(p.value===!0?"":" q-tabs__arrow--faded"),name:e.leftIcon||c.iconSet.tabs[e.vertical===!0?"up":"left"],onMousedownPassive:Fe,onTouchstartPassive:Fe,onMouseupPassive:ae,onMouseleavePassive:ae,onTouchendPassive:ae}),x(oe,{class:"q-tabs__arrow q-tabs__arrow--right absolute q-tab__icon"+(n.value===!0?"":" q-tabs__arrow--faded"),name:e.rightIcon||c.iconSet.tabs[e.vertical===!0?"down":"right"],onMousedownPassive:We,onTouchstartPassive:We,onMouseupPassive:ae,onMouseleavePassive:ae,onTouchendPassive:ae})])}});function ta(e){const m=[.06,6,50];return typeof e=="string"&&e.length&&e.split(":").forEach((T,b)=>{const c=parseFloat(T);c&&(m[b]=c)}),m}var aa=It({name:"touch-swipe",beforeMount(e,{value:m,arg:T,modifiers:b}){if(b.mouse!==!0&&de.has.touch!==!0)return;const c=b.mouseCapture===!0?"Capture":"",a={handler:m,sensitivity:ta(T),direction:lt(b),noop:$t,mouseStart(l){nt(l,a)&&Mt(l)&&(Ce(a,"temp",[[document,"mousemove","move",`notPassive${c}`],[document,"mouseup","end","notPassiveCapture"]]),a.start(l,!0))},touchStart(l){if(nt(l,a)){const d=l.target;Ce(a,"temp",[[d,"touchmove","move","notPassiveCapture"],[d,"touchcancel","end","notPassiveCapture"],[d,"touchend","end","notPassiveCapture"]]),a.start(l)}},start(l,d){de.is.firefox===!0&&Qe(e,!0);const q=et(l);a.event={x:q.left,y:q.top,time:Date.now(),mouse:d===!0,dir:!1}},move(l){if(a.event===void 0)return;if(a.event.dir!==!1){fe(l);return}const d=Date.now()-a.event.time;if(d===0)return;const q=et(l),h=q.left-a.event.x,_=Math.abs(h),s=q.top-a.event.y,i=Math.abs(s);if(a.event.mouse!==!0){if(_<a.sensitivity[1]&&i<a.sensitivity[1]){a.end(l);return}}else if(window.getSelection().toString()!==""){a.end(l);return}else if(_<a.sensitivity[2]&&i<a.sensitivity[2])return;const f=_/d,R=i/d;a.direction.vertical===!0&&_<i&&_<100&&R>a.sensitivity[0]&&(a.event.dir=s<0?"up":"down"),a.direction.horizontal===!0&&_>i&&i<100&&f>a.sensitivity[0]&&(a.event.dir=h<0?"left":"right"),a.direction.up===!0&&_<i&&s<0&&_<100&&R>a.sensitivity[0]&&(a.event.dir="up"),a.direction.down===!0&&_<i&&s>0&&_<100&&R>a.sensitivity[0]&&(a.event.dir="down"),a.direction.left===!0&&_>i&&h<0&&i<100&&f>a.sensitivity[0]&&(a.event.dir="left"),a.direction.right===!0&&_>i&&h>0&&i<100&&f>a.sensitivity[0]&&(a.event.dir="right"),a.event.dir!==!1?(fe(l),a.event.mouse===!0&&(document.body.classList.add("no-pointer-events--children"),document.body.classList.add("non-selectable"),Kt(),a.styleCleanup=E=>{a.styleCleanup=void 0,document.body.classList.remove("non-selectable");const p=()=>{document.body.classList.remove("no-pointer-events--children")};E===!0?setTimeout(p,50):p()}),a.handler({evt:l,touch:a.event.mouse!==!0,mouse:a.event.mouse,direction:a.event.dir,duration:d,distance:{x:_,y:i}})):a.end(l)},end(l){a.event!==void 0&&(Oe(a,"temp"),de.is.firefox===!0&&Qe(e,!1),a.styleCleanup!==void 0&&a.styleCleanup(!0),l!==void 0&&a.event.dir!==!1&&fe(l),a.event=void 0)}};if(e.__qtouchswipe=a,b.mouse===!0){const l=b.mouseCapture===!0||b.mousecapture===!0?"Capture":"";Ce(a,"main",[[e,"mousedown","mouseStart",`passive${l}`]])}de.has.touch===!0&&Ce(a,"main",[[e,"touchstart","touchStart",`passive${b.capture===!0?"Capture":""}`],[e,"touchmove","noop","notPassiveCapture"]])},updated(e,m){const T=e.__qtouchswipe;T!==void 0&&(m.oldValue!==m.value&&(typeof m.value!="function"&&T.end(),T.handler=m.value),T.direction=lt(m.modifiers))},beforeUnmount(e){const m=e.__qtouchswipe;m!==void 0&&(Oe(m,"main"),Oe(m,"temp"),de.is.firefox===!0&&Qe(e,!1),m.styleCleanup!==void 0&&m.styleCleanup(),delete e.__qtouchswipe)}});const la={name:{required:!0},disable:Boolean},rt={setup(e,{slots:m}){return()=>x("div",{class:"q-panel scroll",role:"tabpanel"},Ae(m.default))}},na={modelValue:{required:!0},animated:Boolean,infinite:Boolean,swipeable:Boolean,vertical:Boolean,transitionPrev:String,transitionNext:String,transitionDuration:{type:[String,Number],default:300},keepAlive:Boolean,keepAliveInclude:[String,Array,RegExp],keepAliveExclude:[String,Array,RegExp],keepAliveMax:Number},oa=["update:modelValue","beforeTransition","transition"];function ra(){const{props:e,emit:m,proxy:T}=ye(),{getCache:b}=zt();let c,a;const l=P(null),d=P(null);function q(y){const D=e.vertical===!0?"up":"left";O((T.$q.lang.rtl===!0?-1:1)*(y.direction===D?1:-1))}const h=S(()=>[[aa,q,void 0,{horizontal:e.vertical!==!0,vertical:e.vertical,mouse:!0}]]),_=S(()=>e.transitionPrev||`slide-${e.vertical===!0?"down":"right"}`),s=S(()=>e.transitionNext||`slide-${e.vertical===!0?"up":"left"}`),i=S(()=>`--q-transition-duration: ${e.transitionDuration}ms`),f=S(()=>typeof e.modelValue=="string"||typeof e.modelValue=="number"?e.modelValue:String(e.modelValue)),R=S(()=>({include:e.keepAliveInclude,exclude:e.keepAliveExclude,max:e.keepAliveMax})),E=S(()=>e.keepAliveInclude!==void 0||e.keepAliveExclude!==void 0);ve(()=>e.modelValue,(y,D)=>{const L=g(y)===!0?Q(y):-1;a!==!0&&H(L===-1?0:L<Q(D)?-1:1),l.value!==L&&(l.value=L,m("beforeTransition",y,D),Et(()=>{m("transition",y,D)}))});function p(){O(1)}function n(){O(-1)}function u(y){m("update:modelValue",y)}function g(y){return y!=null&&y!==""}function Q(y){return c.findIndex(D=>D.props.name===y&&D.props.disable!==""&&D.props.disable!==!0)}function U(){return c.filter(y=>y.props.disable!==""&&y.props.disable!==!0)}function H(y){const D=y!==0&&e.animated===!0&&l.value!==-1?"q-transition--"+(y===-1?_.value:s.value):null;d.value!==D&&(d.value=D)}function O(y,D=l.value){let L=D+y;for(;L!==-1&&L<c.length;){const te=c[L];if(te!==void 0&&te.props.disable!==""&&te.props.disable!==!0){H(y),a=!0,m("update:modelValue",te.props.name),setTimeout(()=>{a=!1});return}L+=y}e.infinite===!0&&c.length!==0&&D!==-1&&D!==c.length&&O(y,y===-1?c.length:-1)}function j(){const y=Q(e.modelValue);return l.value!==y&&(l.value=y),!0}function F(){const y=g(e.modelValue)===!0&&j()&&c[l.value];return e.keepAlive===!0?[x(Qt,R.value,[x(E.value===!0?b(f.value,()=>({...rt,name:f.value})):rt,{key:f.value,style:i.value},()=>y)])]:[x("div",{class:"q-panel scroll",style:i.value,key:f.value,role:"tabpanel"},[y])]}function Se(){if(c.length!==0)return e.animated===!0?[x(xt,{name:d.value},F)]:F()}function qe(y){return c=Ht(Ae(y.default,[])).filter(D=>D.props!==null&&D.props.slot===void 0&&g(D.props.name)===!0),c.length}function Ie(){return c}return Object.assign(T,{next:p,previous:n,goTo:u}),{panelIndex:l,panelDirectives:h,updatePanelsList:qe,updatePanelIndex:j,getPanelContent:Se,getEnabledPanels:U,getPanels:Ie,isValidPanelName:g,keepAliveProps:R,needsUniqueKeepAliveWrapper:E,goToPanelByOffset:O,goToPanel:u,nextPanel:p,previousPanel:n}}var be=Pe({name:"QTabPanel",props:la,setup(e,{slots:m}){return()=>x("div",{class:"q-tab-panel",role:"tabpanel"},Ae(m.default))}}),Le=Pe({name:"QTabPanels",props:{...na,...Ot},emits:oa,setup(e,{slots:m}){const T=ye(),b=Vt(e,T.proxy.$q),{updatePanelsList:c,getPanelContent:a,panelDirectives:l}=ra(),d=S(()=>"q-tab-panels q-panel-parent"+(b.value===!0?" q-tab-panels--dark q-dark":""));return()=>(c(m),Bt("div",{class:d.value},a(),"pan",e.swipeable,()=>l.value))}});const ia=A("div",{class:"text-h6"},"Quotation Review",-1),sa={class:"row q-py-md"},ua={class:"col"},ca={class:"col q-pl-md"},da={class:"row q-pb-md"},va={class:"col"},fa={__name:"viewListApprovalItem",props:{dataHeader:Array,cd:String,typeCD:String,conn:String},setup(e){const{dialogRef:m,onDialogHide:T,onDialogOK:b,onDialogCancel:c}=De(),a=he(),l=e;ee(()=>{s.value=l.dataHeader});const d=P(!1),q=P([{name:"MITM_ITMNM",label:"Item Name",field:"MITM_ITMNM",sortable:!0,align:"left"},{name:"TQUODETA_USAGE_DESCRIPTION",label:"Usage",field:"TQUODETA_USAGE_DESCRIPTION",sortable:!0,align:"left"},{name:"TQUODETA_PRC",label:"Price",field:"TQUODETA_PRC",sortable:!0,align:"left",format:p=>parseInt(p).toLocaleString()},{name:"SUBTOT",label:"SUBTOTAL",sortable:!0,field:p=>parseInt(p.TQUODETA_PRC)+parseInt(p.TQUODETA_OPRPRC)+parseInt(p.TQUODETA_MOBDEMOB),align:"left",format:p=>p.toLocaleString()}]),h=P([]),_=P("items"),s=P({MCUS_CUSNM:"",TQUO_ATTN:"",TQUO_SBJCT:""});ee(()=>{i()});const i=async()=>{d.value=!0,await G.post(`${l.typeCD}`,{id:btoa(l.cd),TQUO_BRANCH:l.dataHeader.TQUO_BRANCH,conn:l.conn}).then(p=>{d.value=!1,h.value=p.data}).catch(p=>{d.value=!1})},f=()=>{a.dialog({title:"Confirm",message:"Are you sure want to Approve this quotation ?",cancel:!0,persistent:!0}).onOk(async p=>{d.value=!0,await G.put(`approve/quotations/${btoa(l.cd)}`,{TQUO_BRANCH:l.dataHeader.TQUO_BRANCH,conn:l.conn}).then(n=>{d.value=!1,i(),b()}).catch(n=>{d.value=!1})})},R=()=>{a.dialog({title:"Confirm",message:"Are you sure want to Reject this quotation ?",cancel:!0,persistent:!0}).onOk(async p=>{a.dialog({title:"Prompt",message:"Input reject reason.",prompt:{model:"",isValid:n=>n.length>2,type:"text"},cancel:!0,persistent:!0}).onOk(async n=>{d.value=!0,await G.put(`revise/quotations/${btoa(l.cd)}`,{remark:n,TQUO_BRANCH:l.dataHeader.TQUO_BRANCH,conn:l.conn}).then(u=>{d.value=!1,i()}).catch(u=>{d.value=!1})})})},E=()=>{window.open("https://joss.jatpowerindo.co.id/PDF/quotation/"+btoa(l.cd)+"/"+btoa(l.conn),"_blank").focus()};return(p,n)=>(M(),z(ke,{ref_key:"dialogRef",ref:m,onHide:Z(T),"transition-show":"slide-up","transition-hide":"slide-down","full-width":""},{default:r(()=>[t(ce,{class:"q-dialog-plugin bg-white q-pa-sm"},{default:r(()=>[t(K,null,{default:r(()=>[ia]),_:1}),t(K,{class:"q-pa-sm",style:{height:"70vh",overflow:"auto"}},{default:r(()=>[t(Ue,{modelValue:_.value,"onUpdate:modelValue":n[0]||(n[0]=u=>_.value=u),dense:"",class:"text-grey","active-color":"primary","indicator-color":"primary",align:"justify","narrow-indicator":""},{default:r(()=>[t(pe,{name:"items",label:"Items"}),t(pe,{name:"conditions",label:"Conditions"}),t(pe,{name:"histCond",label:"Approval History"})]),_:1},8,["modelValue"]),t(we),t(Le,{modelValue:_.value,"onUpdate:modelValue":n[4]||(n[4]=u=>_.value=u),animated:""},{default:r(()=>[t(be,{name:"items"},{default:r(()=>[A("div",sa,[A("div",ua,[t(W,{dense:"",filled:"",label:"Customer Name",modelValue:s.value.APP_CUSNM,"onUpdate:modelValue":n[1]||(n[1]=u=>s.value.APP_CUSNM=u),readonly:""},null,8,["modelValue"])]),A("div",ca,[t(W,{dense:"",filled:"",label:"Attn.",modelValue:s.value.APP_ATTN,"onUpdate:modelValue":n[2]||(n[2]=u=>s.value.APP_ATTN=u),readonly:""},null,8,["modelValue"])])]),A("div",da,[A("div",va,[t(W,{dense:"",filled:"",label:"Subject",modelValue:s.value.APP_SBJCT,"onUpdate:modelValue":n[3]||(n[3]=u=>s.value.APP_SBJCT=u),readonly:""},null,8,["modelValue"])])]),t(ge,{title:"Item List",rows:h.value.dataItem,columns:q.value,"row-key":"name",dense:"",loading:d.value},null,8,["rows","columns","loading"])]),_:1}),t(be,{name:"conditions"},{default:r(()=>[t(ot,{bordered:"",dense:""},{default:r(()=>[(M(!0),J(ne,null,me(h.value.dataCondition,(u,g)=>Ve((M(),z(at,{clickable:"",key:g},{default:r(()=>[t(se,{avatar:""},{default:r(()=>[t(Nt,{color:"primary","text-color":"white",size:"sm"},{default:r(()=>[Y(N(g+1),1)]),_:2},1024)]),_:2},1024),t(se,null,{default:r(()=>[Y(N(u.TQUOCOND_CONDI),1)]),_:2},1024)]),_:2},1024)),[[Be]])),128))]),_:1})]),_:1}),t(be,{name:"histCond"},{default:r(()=>[t(ot,{bordered:"",separator:""},{default:r(()=>[(M(!0),J(ne,null,me(h.value.approvalHistories,(u,g)=>Ve((M(),z(at,{clickable:"",key:g},{default:r(()=>[t(se,null,{default:r(()=>[t(ue,null,{default:r(()=>[Y(N(Z(ct).formatDate(u.created_at,"DD MMM YYYY HH:mm")),1)]),_:2},1024),t(ue,{caption:""},{default:r(()=>[Y("Time")]),_:1})]),_:2},1024),t(se,null,{default:r(()=>[t(ue,null,{default:r(()=>[Y(N(u.type==2?"Rejected":"Approved"),1)]),_:2},1024),t(ue,{caption:""},{default:r(()=>[Y("Status")]),_:1})]),_:2},1024),t(se,null,{default:r(()=>[t(ue,null,{default:r(()=>[Y(N(u.remark),1)]),_:2},1024),t(ue,{caption:""},{default:r(()=>[Y("Remarks")]),_:1})]),_:2},1024),t(se,{side:""},{default:r(()=>[t(oe,{name:u.type==2?"cancel":"check_circle",color:u.type==2?"red":"green"},null,8,["name","color"])]),_:2},1024)]),_:2},1024)),[[Be]])),128))]),_:1})]),_:1})]),_:1},8,["modelValue"])]),_:1}),t(Re,{align:"center"},{default:r(()=>[t(Ne,null,{default:r(()=>[t(V,{color:"primary",icon:"print",disable:h.value.length===0,onClick:n[5]||(n[5]=u=>E()),flat:""},null,8,["disable"]),t(V,{color:"primary",icon:"check",label:"Approve",disable:h.value.length===0,onClick:n[6]||(n[6]=u=>f())},null,8,["disable"]),t(V,{color:"red",icon:"cancel",label:"Reject",disable:h.value.length===0,onClick:n[7]||(n[7]=u=>R())},null,8,["disable"]),t(V,{color:"orange",flat:"",label:"cancel",onClick:Z(c)},null,8,["onClick"])]),_:1})]),_:1})]),_:1})]),_:1},8,["onHide"]))}},ma=A("div",{class:"text-h6"},"PR Review",-1),pa={class:"row q-pb-md"},ba={class:"col"},ga={class:"row q-pb-md"},ha={class:"col"},_a={class:"col q-pl-md"},Ta={__name:"viewListPRItem",props:{dataHeader:Array,cd:String,typeCD:String,conn:String},setup(e){const{dialogRef:m,onDialogHide:T,onDialogOK:b,onDialogCancel:c}=De(),a=he(),l=e;ee(()=>{s.value=l.dataHeader});const d=P(!1),q=P([{name:"MITM_ITMNM",label:"Item Name",field:"MITM_ITMNM",sortable:!0,align:"left"},{name:"TPCHREQDETA_REMARK",label:"Remark",field:"TPCHREQDETA_REMARK",sortable:!0,align:"left"},{name:"TPCHREQDETA_REQDT",label:"Request Date",field:"TPCHREQDETA_REQDT",sortable:!0,align:"left"}]),h=P([]),_=P("items"),s=P({MCUS_CUSNM:"",TQUO_ATTN:"",TQUO_SBJCT:""});ee(()=>{i()});const i=async()=>{d.value=!0,await G.post(`${l.typeCD}`,{id:btoa(l.cd),TPCHREQDETA_BRANCH:l.dataHeader.TPCHREQ_BRANCH,conn:l.conn}).then(p=>{console.log(p.data.dataItem),d.value=!1,h.value=p.data}).catch(p=>{d.value=!1})},f=()=>{a.dialog({title:"Confirm",message:"Are you sure want to Approve this quotation ?",cancel:!0,persistent:!0}).onOk(async p=>{d.value=!0,await G.put(`approve/purchase-request/${btoa(l.cd)}`,{TPCHREQ_BRANCH:l.dataHeader.TPCHREQ_BRANCH,conn:l.conn}).then(n=>{d.value=!1,i(),b()}).catch(n=>{d.value=!1})})},R=()=>{a.dialog({title:"Confirm",message:"Are you sure want to Reject this quotation ?",cancel:!0,persistent:!0}).onOk(async p=>{a.dialog({title:"Prompt",message:"Input reject reason.",prompt:{model:"",isValid:n=>n.length>2,type:"text"},cancel:!0,persistent:!0}).onOk(async n=>{d.value=!0,await G.put(`revise/purchase-request/${btoa(l.cd)}`,{remark:n,TPCHREQ_BRANCH:l.dataHeader.TPCHREQ_BRANCH,conn:l.conn}).then(u=>{d.value=!1,i(),b()}).catch(u=>{d.value=!1})})})},E=()=>{window.open("https://joss.jatpowerindo.co.id/PDF/purchase/pr/"+btoa(l.cd)+"/"+btoa(l.conn),"_blank").focus()};return(p,n)=>(M(),z(ke,{ref_key:"dialogRef",ref:m,onHide:Z(T),"transition-show":"slide-up","transition-hide":"slide-down","full-width":""},{default:r(()=>[t(ce,{class:"q-dialog-plugin bg-white q-pa-sm"},{default:r(()=>[t(K,null,{default:r(()=>[ma]),_:1}),t(K,{class:"q-pa-sm",style:{height:"70vh",overflow:"auto"}},{default:r(()=>[t(Ue,{modelValue:_.value,"onUpdate:modelValue":n[0]||(n[0]=u=>_.value=u),dense:"",class:"text-grey","active-color":"primary","indicator-color":"primary",align:"justify","narrow-indicator":""},{default:r(()=>[t(pe,{name:"items",label:"Items"})]),_:1},8,["modelValue"]),t(we),t(Le,{modelValue:_.value,"onUpdate:modelValue":n[4]||(n[4]=u=>_.value=u),animated:""},{default:r(()=>[t(be,{name:"items"},{default:r(()=>[A("div",pa,[A("div",ba,[t(W,{dense:"",filled:"",label:"Purpose",modelValue:s.value.APP_SBJCT,"onUpdate:modelValue":n[1]||(n[1]=u=>s.value.APP_SBJCT=u),readonly:""},null,8,["modelValue"])])]),A("div",ga,[A("div",ha,[t(W,{dense:"",filled:"",label:"Supplier",modelValue:s.value.MSUP_SUPNM,"onUpdate:modelValue":n[2]||(n[2]=u=>s.value.MSUP_SUPNM=u),readonly:""},null,8,["modelValue"])]),A("div",_a,[t(W,{dense:"",filled:"",label:"Created Date",modelValue:s.value.CREATED_AT,"onUpdate:modelValue":n[3]||(n[3]=u=>s.value.CREATED_AT=u),readonly:""},null,8,["modelValue"])])]),h.value.dataItem?(M(),z(ge,{key:0,title:"Item List",rows:h.value.dataItem,columns:q.value,"row-key":"name",dense:"",loading:d.value},null,8,["rows","columns","loading"])):ut("",!0)]),_:1})]),_:1},8,["modelValue"])]),_:1}),t(Re,{align:"center"},{default:r(()=>[t(Ne,null,{default:r(()=>[t(V,{color:"primary",icon:"print",disable:h.value.length===0,onClick:n[5]||(n[5]=u=>E()),flat:""},null,8,["disable"]),t(V,{color:"primary",icon:"check",label:"Approve",disable:h.value.length===0,onClick:n[6]||(n[6]=u=>f())},null,8,["disable"]),t(V,{color:"red",icon:"cancel",label:"Reject",disable:h.value.length===0,onClick:n[7]||(n[7]=u=>R())},null,8,["disable"]),t(V,{color:"orange",flat:"",label:"cancel",onClick:Z(c)},null,8,["onClick"])]),_:1})]),_:1})]),_:1})]),_:1},8,["onHide"]))}},Ca=A("div",{class:"text-h6"},"PO Review",-1),ya={class:"row q-pb-md"},Pa={class:"col"},Aa={class:"col q-pl-md"},wa={class:"row q-pb-md"},Ra={class:"col"},ka={class:"col q-pl-md"},Da={__name:"viewListPOItem",props:{dataHeader:Array,cd:String,typeCD:String,conn:String},setup(e){const{dialogRef:m,onDialogHide:T,onDialogOK:b,onDialogCancel:c}=De(),a=he(),l=e;ee(()=>{s.value=l.dataHeader});const d=P(!1),q=P([{name:"MITM_ITMNM",label:"Item Name",field:"MITM_ITMNM",sortable:!0,align:"left"},{name:"TPCHORDDETA_ITMPRC_PER",label:"Price",field:"TPCHORDDETA_ITMPRC_PER",sortable:!0,align:"left",format:p=>p.toLocaleString()},{name:"TPCHORDDETA_ITMQT",label:"Qty",field:"TPCHORDDETA_ITMQT",sortable:!0,align:"left",format:p=>p.toLocaleString()},{name:"SUBTOT",label:"SUBTOTAL",sortable:!0,field:p=>p.TPCHORDDETA_ITMPRC_PER*p.TPCHORDDETA_ITMQT,align:"left",format:p=>p.toLocaleString()}]),h=P([]),_=P("items"),s=P({MCUS_CUSNM:"",TQUO_ATTN:"",TQUO_SBJCT:""});ee(()=>{i()});const i=async()=>{d.value=!0,await G.post(`${l.typeCD}`,{id:btoa(l.cd),TPCHORD_BRANCH:l.dataHeader.TPCHORD_BRANCH,conn:l.conn}).then(p=>{d.value=!1,h.value=p.data}).catch(p=>{d.value=!1})},f=()=>{a.dialog({title:"Confirm",message:"Are you sure want to Approve this quotation ?",cancel:!0,persistent:!0}).onOk(async p=>{d.value=!0,await G.put(`approve/purchase-order/${btoa(l.cd)}`,{TPCHORD_BRANCH:l.dataHeader.TPCHORD_BRANCH,conn:l.conn}).then(n=>{d.value=!1,i(),b()}).catch(n=>{d.value=!1})})},R=()=>{a.dialog({title:"Confirm",message:"Are you sure want to Reject this quotation ?",cancel:!0,persistent:!0}).onOk(async p=>{a.dialog({title:"Prompt",message:"Input reject reason.",prompt:{model:"",isValid:n=>n.length>2,type:"text"},cancel:!0,persistent:!0}).onOk(async n=>{d.value=!0,await G.put(`revise/purchase-order/${btoa(l.cd)}`,{remark:n,TPCHORD_BRANCH:l.dataHeader.TPCHORD_BRANCH,conn:l.conn}).then(u=>{d.value=!1,i(),b()}).catch(u=>{d.value=!1})})})},E=()=>{window.open("https://joss.jatpowerindo.co.id/PDF/purchase/po/"+btoa(l.cd)+"/"+btoa(l.conn),"_blank").focus()};return(p,n)=>(M(),z(ke,{ref_key:"dialogRef",ref:m,onHide:Z(T),"transition-show":"slide-up","transition-hide":"slide-down","full-width":""},{default:r(()=>[t(ce,{class:"q-dialog-plugin bg-white q-pa-sm"},{default:r(()=>[t(K,null,{default:r(()=>[Ca]),_:1}),t(K,{class:"q-pa-sm",style:{height:"70vh",overflow:"auto"}},{default:r(()=>[t(Ue,{modelValue:_.value,"onUpdate:modelValue":n[0]||(n[0]=u=>_.value=u),dense:"",class:"text-grey","active-color":"primary","indicator-color":"primary",align:"justify","narrow-indicator":""},{default:r(()=>[t(pe,{name:"items",label:"Items"})]),_:1},8,["modelValue"]),t(we),t(Le,{modelValue:_.value,"onUpdate:modelValue":n[5]||(n[5]=u=>_.value=u),animated:""},{default:r(()=>[t(be,{name:"items"},{default:r(()=>[A("div",ya,[A("div",Pa,[t(W,{dense:"",filled:"",label:"PR Code",modelValue:s.value.REQ_CD,"onUpdate:modelValue":n[1]||(n[1]=u=>s.value.REQ_CD=u),readonly:""},null,8,["modelValue"])]),A("div",Aa,[t(W,{dense:"",filled:"",label:"Subject",modelValue:s.value.APP_SBJCT,"onUpdate:modelValue":n[2]||(n[2]=u=>s.value.APP_SBJCT=u),readonly:""},null,8,["modelValue"])])]),A("div",wa,[A("div",Ra,[t(W,{dense:"",filled:"",label:"Supplier",modelValue:s.value.APP_CUSNM,"onUpdate:modelValue":n[3]||(n[3]=u=>s.value.APP_CUSNM=u),readonly:""},null,8,["modelValue"])]),A("div",ka,[t(W,{dense:"",filled:"",label:"Created Date",modelValue:s.value.CREATED_AT,"onUpdate:modelValue":n[4]||(n[4]=u=>s.value.CREATED_AT=u),readonly:""},null,8,["modelValue"])])]),h.value.dataItem?(M(),z(ge,{key:0,title:"Item List",rows:h.value.dataItem,columns:q.value,"row-key":"name",dense:"",loading:d.value},null,8,["rows","columns","loading"])):ut("",!0)]),_:1})]),_:1},8,["modelValue"])]),_:1}),t(Re,{align:"center"},{default:r(()=>[t(Ne,null,{default:r(()=>[t(V,{color:"primary",icon:"print",disable:h.value.length===0,onClick:n[6]||(n[6]=u=>E()),flat:""},null,8,["disable"]),t(V,{color:"primary",icon:"check",label:"Approve",disable:h.value.length===0,onClick:n[7]||(n[7]=u=>f())},null,8,["disable"]),t(V,{color:"red",icon:"cancel",label:"Reject",disable:h.value.length===0,onClick:n[8]||(n[8]=u=>R())},null,8,["disable"]),t(V,{color:"orange",flat:"",label:"cancel",onClick:Z(c)},null,8,["onClick"])]),_:1})]),_:1})]),_:1})]),_:1},8,["onHide"]))}},Sa=A("div",{class:"text-h6"},"Approval List",-1),qa={class:"q-pa-xs col-xs-12 col-sm-6 col-md-4"},Ia={class:"text-h5 text-bold"},$a={class:"text-h6 text-bold"},Ma={class:"text-subtitle2"},Ea={class:"row"},xa={class:"col"},Ha={class:"col text-right"},Qa={__name:"viewListApproval",props:{listApprv:Array,typeAPI:String,conn:String},setup(e){const m=he(),T=e,b=P([{name:"APP_CD",label:"Doc Code",field:"APP_CD"},{name:"APP_CUSNM",label:"Customer",field:"APP_CUSNM"},{name:"APP_SBJCT",label:"Subject",field:"APP_SBJCT"},{name:"APP_ATTN",label:"Attn",field:"APP_ATTN"},{name:"CREATED_AT",label:"Created Date",field:"CREATED_AT"}]),c=P(""),a=(s,i="days")=>{const f=new Date,R=new Date(s);return ct.getDateDiff(f,R,i)},l=(s,i)=>{let f="";T.typeAPI=="quot"?(f="quotation/quotation-approval",m.dialog({component:fa,componentProps:{dataHeader:i,cd:s,typeCD:f,conn:T.conn}}).onOk(async R=>{})):T.typeAPI=="pr"?(f="purchase-request-approval",m.dialog({component:Ta,componentProps:{dataHeader:i,cd:s,typeCD:f,conn:T.conn}}).onOk(async R=>{})):T.typeAPI=="po"&&(f="purchase-order/approval-document",m.dialog({component:Da,componentProps:{dataHeader:i,cd:s,typeCD:f,conn:T.conn}}).onOk(async R=>{}))},{dialogRef:d,onDialogHide:q,onDialogOK:h,onDialogCancel:_}=De();return(s,i)=>(M(),z(ke,{ref_key:"dialogRef",ref:d,onHide:Z(q),"transition-show":"slide-up","transition-hide":"slide-down","full-width":""},{default:r(()=>[t(ce,{class:"q-dialog-plugin bg-white q-pa-sm"},{default:r(()=>[t(K,null,{default:r(()=>[Sa]),_:1}),t(K,{class:"q-pa-sm",style:{height:"70vh",overflow:"auto"}},{default:r(()=>[t(ge,{grid:"",flat:"",bordered:"","card-container-class":s.cardContainerClass,title:"Outstanding Approval",rows:T.listApprv,columns:b.value,"row-key":"name",filter:c.value,"hide-header":"",pagination:{rowsPerPage:50},"rows-per-page-options":s.rowsPerPageOptions},{"top-right":r(()=>[t(W,{borderless:"",dense:"",debounce:"300",modelValue:c.value,"onUpdate:modelValue":i[0]||(i[0]=f=>c.value=f),placeholder:"Search"},{append:r(()=>[t(oe,{name:"search"})]),_:1},8,["modelValue"])]),item:r(f=>[A("div",qa,[t(ce,{flat:"",bordered:""},{default:r(()=>[t(K,{class:"text-center bg-secondary text-white"},{default:r(()=>[A("div",Ia,N(f.row.APP_CUSNM),1)]),_:2},1024),t(we),t(K,null,{default:r(()=>[A("div",$a,N(f.row.APP_CD),1),A("div",Ma,N(f.row.APP_SBJCT),1)]),_:2},1024),t(K,null,{default:r(()=>[A("div",Ea,[A("div",xa,[t(V,{label:"Preview",color:"primary",outline:"",onClick:R=>l(f.row.APP_CD,f.row)},null,8,["onClick"])]),A("div",Ha,N(a(f.row.CREATED_AT)<30?`${a(f.row.CREATED_AT)} Days Ago`:`${a(f.row.CREATED_AT,"months")} Month ago`),1)])]),_:2},1024)]),_:2},1024)])]),_:1},8,["card-container-class","rows","columns","filter","rows-per-page-options"])]),_:1}),t(Re,{align:"right"},{default:r(()=>[t(V,{label:"OK",color:"primary",onClick:i[1]||(i[1]=f=>Z(h)()),disable:s.stateSubmit},null,8,["disable"])]),_:1})]),_:1})]),_:1},8,["onHide"]))}},Oa={class:"q-pa-md bg-grey-5 window-height"},Va={class:"row"},Ba={class:"row"},Na={class:"col"},Ua={class:"text-h3 text-cyan"},La={class:"text-subtitle2 text-cyan"},ja={class:"col text-right"},Ka={class:"row q-pa-sm"},Fa={class:"col"},Wa={key:1},il={__name:"dashboardView",setup(e){const m=he(),T=P([{total:900,title:"Total Sales",icon:"shopping_cart",color:"cyan"},{total:900,title:"Total Purchase",icon:"shopping_bag",color:"cyan"},{total:900,title:"Total Profit",icon:"payments",color:"cyan"},{total:15,title:"Total Customer",icon:"group",color:"cyan"},{total:15,title:"Total Customer",icon:"group",color:"cyan"},{total:15,title:"Total Customer",icon:"group",color:"cyan"},{total:15,title:"Total Customer",icon:"group",color:"cyan"},{total:15,title:"Total Customer",icon:"group",color:"cyan"}]),b=P([{name:"name",label:"Business",field:"name",sortable:!0,align:"left"},{name:"quot",label:"Quotation",field:"quot_count",sortable:!0,align:"center"},{name:"pr",label:"Purchase Request",field:"pr_count",sortable:!0,align:"center"},{name:"po",label:"Purchase Order",field:"po_count",sortable:!0,align:"center"}]),c=P([]),a=P(!1),l=P(null);ee(async()=>{await d()&&(l.value=setInterval(d,1e4))}),ee(()=>{clearInterval(l.value)});const d=async()=>(a.value=!0,await G.get("/approval/notificationsAPI/top-user").then(h=>(a.value=!1,c.value=h.data,h.data)).catch(h=>{a.value=!1})),q=(h,_,s)=>{m.dialog({component:Qa,componentProps:{listApprv:h,typeAPI:_,conn:s}}).onOk(async i=>{quotationGroupConditions.value=i.MCONDITION_RPT_STAT,quotationConditions.value=i.group,d()})};return(h,_)=>(M(),J("div",Oa,[A("div",Va,[(M(!0),J(ne,null,me(T.value,(s,i)=>(M(),J("div",{class:Ut("col-3 q-pa-sm"),key:i},[t(ce,null,{default:r(()=>[t(K,null,{default:r(()=>[A("div",Ba,[A("div",Na,[A("div",Ua,N(s.total),1),A("div",La,N(s.title),1)]),A("div",ja,[t(oe,{name:s.icon,size:"4.4em",color:s.color},null,8,["name","color"])])])]),_:2},1024)]),_:2},1024)]))),128))]),A("div",Ka,[A("div",Fa,[t(ge,{flat:"",bordered:"",title:"Approval List",rows:c.value,columns:b.value,"row-key":"name",loading:a.value},{"top-right":r(()=>[t(V,{flat:"",icon:"refresh",color:"cyan",onClick:d})]),header:r(s=>[t(tt,{props:s},{default:r(()=>[(M(!0),J(ne,null,me(s.cols,i=>(M(),z(Lt,{key:i.name,props:s},{default:r(()=>[Y(N(i.label),1)]),_:2},1032,["props"]))),128))]),_:2},1032,["props"])]),body:r(s=>[t(tt,{props:s},{default:r(()=>[(M(!0),J(ne,null,me(s.cols,i=>(M(),z(jt,{key:i.name,props:s},{default:r(()=>[i.name==="quot"||i.name==="pr"||i.name==="po"||i.name==="spk"?(M(),J(ne,{key:0},[i.value>0?(M(),z(V,{key:0,flat:"",color:"blue",onClick:f=>q(s.row[i.name.split("_")[0]],i.name,s.row.connection)},{default:r(()=>[A("b",null,N(i.value),1)]),_:2},1032,["onClick"])):(M(),J("span",Wa,N(i.value),1))],64)):(M(),J(ne,{key:1},[Y(N(i.value),1)],64))]),_:2},1032,["props"]))),128))]),_:2},1032,["props"])]),_:1},8,["rows","columns","loading"])])])]))}};export{il as default};
