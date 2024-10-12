import{i as yt,e as xe,t as P,a as I,j as st,o as ee,b0 as ut,U as Ve,W as Be,h as x,ac as fe,ah as Pt,aE as wt,at as oe,z as At,g as ye,ay as Rt,b1 as kt,c as Pe,a4 as He,a5 as et,w as ve,p as Dt,ak as St,al as qt,d as we,b2 as It,aH as de,n as $t,b3 as Mt,aa as Ce,b4 as Qe,aK as tt,a9 as Oe,G as Et,ab as xt,b5 as Ht,b6 as Qt,ad as Ot,af as Vt,as as Bt,C as q,D as K,E as r,F as t,M as ce,O as F,aY as Ae,J as A,$ as z,aZ as Ne,R as Y,S as ne,T as me,V as Nt,I as G,P as N,Y as Z,X as Re,Q as V,Z as ke,b7 as Ut}from"./index.3bcf5f15.js";import{Q as ge,a as Lt}from"./QTable.b369b649.js";import{Q as at,a as jt}from"./QTd.81f71940.js";import{e as Kt,u as he}from"./format.d64d2675.js";import{api_web as J}from"./axios.a5eb9c00.js";import{d as ct}from"./date.339e5357.js";import{u as De}from"./use-dialog-plugin-component.e3ac2415.js";import{Q as Ft}from"./QResizeObserver.4866d824.js";import{r as Wt,Q as lt,a as se,b as ue}from"./QSelect.7d62ec4f.js";import{g as nt,s as ot}from"./touch.9135741d.js";import{u as zt}from"./use-render-cache.3aae9b27.js";import{Q as it}from"./QList.bb586619.js";import{Q as Ue}from"./QBtnGroup.ca24b7fa.js";let Jt=0;const Yt=["click","keydown"],Gt={icon:String,label:[Number,String],alert:[Boolean,String],alertIcon:String,name:{type:[Number,String],default:()=>`t_${Jt++}`},noCaps:Boolean,tabindex:[String,Number],disable:Boolean,contentClass:String,ripple:{type:[Boolean,Object],default:!0}};function Xt(e,m,T,p){const c=yt(ut,xe);if(c===xe)return console.error("QTab/QRouteTab component needs to be child of QTabs"),xe;const{proxy:a}=ye(),l=P(null),i=P(null),$=P(null),g=I(()=>e.disable===!0||e.ripple===!1?!1:Object.assign({keyCodes:[13,32],early:!0},e.ripple===!0?{}:e.ripple)),b=I(()=>c.currentModel.value===e.name),d=I(()=>"q-tab relative-position self-stretch flex flex-center text-center"+(b.value===!0?" q-tab--active"+(c.tabProps.value.activeClass?" "+c.tabProps.value.activeClass:"")+(c.tabProps.value.activeColor?` text-${c.tabProps.value.activeColor}`:"")+(c.tabProps.value.activeBgColor?` bg-${c.tabProps.value.activeBgColor}`:""):" q-tab--inactive")+(e.icon&&e.label&&c.tabProps.value.inlineLabel===!1?" q-tab--full":"")+(e.noCaps===!0||c.tabProps.value.noCaps===!0?" q-tab--no-caps":"")+(e.disable===!0?" disabled":" q-focusable q-hoverable cursor-pointer")+(p!==void 0?p.linkClass.value:"")),s=I(()=>"q-tab__content self-stretch flex-center relative-position q-anchor--skip non-selectable "+(c.tabProps.value.inlineLabel===!0?"row no-wrap q-tab__content--inline":"column")+(e.contentClass!==void 0?` ${e.contentClass}`:"")),C=I(()=>e.disable===!0||c.hasFocus.value===!0||b.value===!1&&c.hasActiveTab.value===!0?-1:e.tabindex||0);function h(_,Q){if(Q!==!0&&l.value!==null&&l.value.focus(),e.disable===!0){p!==void 0&&p.hasRouterLink.value===!0&&fe(_);return}if(p===void 0){c.updateModel({name:e.name}),T("click",_);return}if(p.hasRouterLink.value===!0){const U=(H={})=>{let O;const j=H.to===void 0||Rt(H.to,e.to)===!0?c.avoidRouteWatcher=kt():null;return p.navigateToRouterLink(_,{...H,returnRouterError:!0}).catch(W=>{O=W}).then(W=>{if(j===c.avoidRouteWatcher&&(c.avoidRouteWatcher=!1,O===void 0&&(W===void 0||W.message!==void 0&&W.message.startsWith("Avoided redundant navigation")===!0)&&c.updateModel({name:e.name})),H.returnRouterError===!0)return O!==void 0?Promise.reject(O):W})};T("click",_,U),_.defaultPrevented!==!0&&U();return}T("click",_)}function D(_){Pt(_,[13,32])?h(_,!0):wt(_)!==!0&&_.keyCode>=35&&_.keyCode<=40&&_.altKey!==!0&&_.metaKey!==!0&&c.onKbdNavigate(_.keyCode,a.$el)===!0&&fe(_),T("keydown",_)}function f(){const _=c.tabProps.value.narrowIndicator,Q=[],U=x("div",{ref:$,class:["q-tab__indicator",c.tabProps.value.indicatorClass]});e.icon!==void 0&&Q.push(x(oe,{class:"q-tab__icon",name:e.icon})),e.label!==void 0&&Q.push(x("div",{class:"q-tab__label"},e.label)),e.alert!==!1&&Q.push(e.alertIcon!==void 0?x(oe,{class:"q-tab__alert-icon",color:e.alert!==!0?e.alert:void 0,name:e.alertIcon}):x("div",{class:"q-tab__alert"+(e.alert!==!0?` text-${e.alert}`:"")})),_===!0&&Q.push(U);const H=[x("div",{class:"q-focus-helper",tabindex:-1,ref:l}),x("div",{class:s.value},At(m.default,Q))];return _===!1&&H.push(U),H}const n={name:I(()=>e.name),rootRef:i,tabIndicatorRef:$,routeData:p};st(()=>{c.unregisterTab(n)}),ee(()=>{c.registerTab(n)});function u(_,Q){const U={ref:i,class:d.value,tabindex:C.value,role:"tab","aria-selected":b.value===!0?"true":"false","aria-disabled":e.disable===!0?"true":void 0,onClick:h,onKeydown:D,...Q};return Ve(x(_,U,f()),[[Be,g.value]])}return{renderTab:u,$tabs:c}}var pe=Pe({name:"QTab",props:Gt,emits:Yt,setup(e,{slots:m,emit:T}){const{renderTab:p}=Xt(e,m,T);return()=>p("div")}});function Zt(e,m,T){const p=T===!0?["left","right"]:["top","bottom"];return`absolute-${m===!0?p[0]:p[1]}${e?` text-${e}`:""}`}const ea=["left","center","right","justify"];var Le=Pe({name:"QTabs",props:{modelValue:[Number,String],align:{type:String,default:"center",validator:e=>ea.includes(e)},breakpoint:{type:[String,Number],default:600},vertical:Boolean,shrink:Boolean,stretch:Boolean,activeClass:String,activeColor:String,activeBgColor:String,indicatorColor:String,leftIcon:String,rightIcon:String,outsideArrows:Boolean,mobileArrows:Boolean,switchIndicator:Boolean,narrowIndicator:Boolean,inlineLabel:Boolean,noCaps:Boolean,dense:Boolean,contentClass:String,"onUpdate:modelValue":[Function,Array]},setup(e,{slots:m,emit:T}){const{proxy:p}=ye(),{$q:c}=p,{registerTick:a}=He(),{registerTick:l}=He(),{registerTick:i}=He(),{registerTimeout:$,removeTimeout:g}=et(),{registerTimeout:b,removeTimeout:d}=et(),s=P(null),C=P(null),h=P(e.modelValue),D=P(!1),f=P(!0),n=P(!1),u=P(!1),_=[],Q=P(0),U=P(!1);let H=null,O=null,j;const W=I(()=>({activeClass:e.activeClass,activeColor:e.activeColor,activeBgColor:e.activeBgColor,indicatorClass:Zt(e.indicatorColor,e.switchIndicator,e.vertical),narrowIndicator:e.narrowIndicator,inlineLabel:e.inlineLabel,noCaps:e.noCaps})),Se=I(()=>{const o=Q.value,v=h.value;for(let y=0;y<o;y++)if(_[y].name.value===v)return!0;return!1}),qe=I(()=>`q-tabs__content--align-${D.value===!0?"left":u.value===!0?"justify":e.align}`),Ie=I(()=>`q-tabs row no-wrap items-center q-tabs--${D.value===!0?"":"not-"}scrollable q-tabs--${e.vertical===!0?"vertical":"horizontal"} q-tabs__arrows--${e.outsideArrows===!0?"outside":"inside"} q-tabs--mobile-with${e.mobileArrows===!0?"":"out"}-arrows`+(e.dense===!0?" q-tabs--dense":"")+(e.shrink===!0?" col-shrink":"")+(e.stretch===!0?" self-stretch":"")),w=I(()=>"q-tabs__content scroll--mobile row no-wrap items-center self-stretch hide-scrollbar relative-position "+qe.value+(e.contentClass!==void 0?` ${e.contentClass}`:"")),S=I(()=>e.vertical===!0?{container:"height",content:"offsetHeight",scroll:"scrollHeight"}:{container:"width",content:"offsetWidth",scroll:"scrollWidth"}),L=I(()=>e.vertical!==!0&&c.lang.rtl===!0),te=I(()=>Wt===!1&&L.value===!0);ve(L,re),ve(()=>e.modelValue,o=>{$e({name:o,setCurrent:!0,skipEmit:!0})}),ve(()=>e.outsideArrows,_e);function $e({name:o,setCurrent:v,skipEmit:y}){h.value!==o&&(y!==!0&&e["onUpdate:modelValue"]!==void 0&&T("update:modelValue",o),(v===!0||e["onUpdate:modelValue"]===void 0)&&(dt(h.value,o),h.value=o))}function _e(){a(()=>{Ke({width:s.value.offsetWidth,height:s.value.offsetHeight})})}function Ke(o){if(S.value===void 0||C.value===null)return;const v=o[S.value.container],y=Math.min(C.value[S.value.scroll],Array.prototype.reduce.call(C.value.children,(E,k)=>E+(k[S.value.content]||0),0)),M=v>0&&y>v;D.value=M,M===!0&&l(re),u.value=v<parseInt(e.breakpoint,10)}function dt(o,v){const y=o!=null&&o!==""?_.find(E=>E.name.value===o):null,M=v!=null&&v!==""?_.find(E=>E.name.value===v):null;if(y&&M){const E=y.tabIndicatorRef.value,k=M.tabIndicatorRef.value;H!==null&&(clearTimeout(H),H=null),E.style.transition="none",E.style.transform="none",k.style.transition="none",k.style.transform="none";const R=E.getBoundingClientRect(),B=k.getBoundingClientRect();k.style.transform=e.vertical===!0?`translate3d(0,${R.top-B.top}px,0) scale3d(1,${B.height?R.height/B.height:1},1)`:`translate3d(${R.left-B.left}px,0,0) scale3d(${B.width?R.width/B.width:1},1,1)`,i(()=>{H=setTimeout(()=>{H=null,k.style.transition="transform .25s cubic-bezier(.4, 0, .2, 1)",k.style.transform="none"},70)})}M&&D.value===!0&&ie(M.rootRef.value)}function ie(o){const{left:v,width:y,top:M,height:E}=C.value.getBoundingClientRect(),k=o.getBoundingClientRect();let R=e.vertical===!0?k.top-M:k.left-v;if(R<0){C.value[e.vertical===!0?"scrollTop":"scrollLeft"]+=Math.floor(R),re();return}R+=e.vertical===!0?k.height-E:k.width-y,R>0&&(C.value[e.vertical===!0?"scrollTop":"scrollLeft"]+=Math.ceil(R),re())}function re(){const o=C.value;if(o===null)return;const v=o.getBoundingClientRect(),y=e.vertical===!0?o.scrollTop:Math.abs(o.scrollLeft);L.value===!0?(f.value=Math.ceil(y+v.width)<o.scrollWidth-1,n.value=y>0):(f.value=y>0,n.value=e.vertical===!0?Math.ceil(y+v.height)<o.scrollHeight:Math.ceil(y+v.width)<o.scrollWidth)}function Fe(o){O!==null&&clearInterval(O),O=setInterval(()=>{mt(o)===!0&&ae()},5)}function We(){Fe(te.value===!0?Number.MAX_SAFE_INTEGER:0)}function ze(){Fe(te.value===!0?0:Number.MAX_SAFE_INTEGER)}function ae(){O!==null&&(clearInterval(O),O=null)}function vt(o,v){const y=Array.prototype.filter.call(C.value.children,B=>B===v||B.matches&&B.matches(".q-tab.q-focusable")===!0),M=y.length;if(M===0)return;if(o===36)return ie(y[0]),y[0].focus(),!0;if(o===35)return ie(y[M-1]),y[M-1].focus(),!0;const E=o===(e.vertical===!0?38:37),k=o===(e.vertical===!0?40:39),R=E===!0?-1:k===!0?1:void 0;if(R!==void 0){const B=L.value===!0?-1:1,X=y.indexOf(v)+R*B;return X>=0&&X<M&&(ie(y[X]),y[X].focus({preventScroll:!0})),!0}}const ft=I(()=>te.value===!0?{get:o=>Math.abs(o.scrollLeft),set:(o,v)=>{o.scrollLeft=-v}}:e.vertical===!0?{get:o=>o.scrollTop,set:(o,v)=>{o.scrollTop=v}}:{get:o=>o.scrollLeft,set:(o,v)=>{o.scrollLeft=v}});function mt(o){const v=C.value,{get:y,set:M}=ft.value;let E=!1,k=y(v);const R=o<k?-1:1;return k+=R*5,k<0?(E=!0,k=0):(R===-1&&k<=o||R===1&&k>=o)&&(E=!0,k=o),M(v,k),re(),E}function Je(o,v){for(const y in o)if(o[y]!==v[y])return!1;return!0}function pt(){let o=null,v={matchedLen:0,queryDiff:9999,hrefLen:0};const y=_.filter(R=>R.routeData!==void 0&&R.routeData.hasRouterLink.value===!0),{hash:M,query:E}=p.$route,k=Object.keys(E).length;for(const R of y){const B=R.routeData.exact.value===!0;if(R.routeData[B===!0?"linkIsExactActive":"linkIsActive"].value!==!0)continue;const{hash:X,query:Me,matched:Tt,href:Ct}=R.routeData.resolvedLink.value,Ee=Object.keys(Me).length;if(B===!0){if(X!==M||Ee!==k||Je(E,Me)===!1)continue;o=R.name.value;break}if(X!==""&&X!==M||Ee!==0&&Je(Me,E)===!1)continue;const le={matchedLen:Tt.length,queryDiff:k-Ee,hrefLen:Ct.length-X.length};if(le.matchedLen>v.matchedLen){o=R.name.value,v=le;continue}else if(le.matchedLen!==v.matchedLen)continue;if(le.queryDiff<v.queryDiff)o=R.name.value,v=le;else if(le.queryDiff!==v.queryDiff)continue;le.hrefLen>v.hrefLen&&(o=R.name.value,v=le)}o===null&&_.some(R=>R.routeData===void 0&&R.name.value===h.value)===!0||$e({name:o,setCurrent:!0})}function bt(o){if(g(),U.value!==!0&&s.value!==null&&o.target&&typeof o.target.closest=="function"){const v=o.target.closest(".q-tab");v&&s.value.contains(v)===!0&&(U.value=!0,D.value===!0&&ie(v))}}function gt(){$(()=>{U.value=!1},30)}function Te(){Ge.avoidRouteWatcher===!1?b(pt):d()}function Ye(){if(j===void 0){const o=ve(()=>p.$route.fullPath,Te);j=()=>{o(),j=void 0}}}function ht(o){_.push(o),Q.value++,_e(),o.routeData===void 0||p.$route===void 0?b(()=>{if(D.value===!0){const v=h.value,y=v!=null&&v!==""?_.find(M=>M.name.value===v):null;y&&ie(y.rootRef.value)}}):(Ye(),o.routeData.hasRouterLink.value===!0&&Te())}function _t(o){_.splice(_.indexOf(o),1),Q.value--,_e(),j!==void 0&&o.routeData!==void 0&&(_.every(v=>v.routeData===void 0)===!0&&j(),Te())}const Ge={currentModel:h,tabProps:W,hasFocus:U,hasActiveTab:Se,registerTab:ht,unregisterTab:_t,verifyRouteModel:Te,updateModel:$e,onKbdNavigate:vt,avoidRouteWatcher:!1};Dt(ut,Ge);function Xe(){H!==null&&clearTimeout(H),ae(),j!==void 0&&j()}let Ze;return st(Xe),St(()=>{Ze=j!==void 0,Xe()}),qt(()=>{Ze===!0&&Ye(),_e()}),()=>x("div",{ref:s,class:Ie.value,role:"tablist",onFocusin:bt,onFocusout:gt},[x(Ft,{onResize:Ke}),x("div",{ref:C,class:w.value,onScroll:re},we(m.default)),x(oe,{class:"q-tabs__arrow q-tabs__arrow--left absolute q-tab__icon"+(f.value===!0?"":" q-tabs__arrow--faded"),name:e.leftIcon||c.iconSet.tabs[e.vertical===!0?"up":"left"],onMousedownPassive:We,onTouchstartPassive:We,onMouseupPassive:ae,onMouseleavePassive:ae,onTouchendPassive:ae}),x(oe,{class:"q-tabs__arrow q-tabs__arrow--right absolute q-tab__icon"+(n.value===!0?"":" q-tabs__arrow--faded"),name:e.rightIcon||c.iconSet.tabs[e.vertical===!0?"down":"right"],onMousedownPassive:ze,onTouchstartPassive:ze,onMouseupPassive:ae,onMouseleavePassive:ae,onTouchendPassive:ae})])}});function ta(e){const m=[.06,6,50];return typeof e=="string"&&e.length&&e.split(":").forEach((T,p)=>{const c=parseFloat(T);c&&(m[p]=c)}),m}var aa=It({name:"touch-swipe",beforeMount(e,{value:m,arg:T,modifiers:p}){if(p.mouse!==!0&&de.has.touch!==!0)return;const c=p.mouseCapture===!0?"Capture":"",a={handler:m,sensitivity:ta(T),direction:nt(p),noop:$t,mouseStart(l){ot(l,a)&&Mt(l)&&(Ce(a,"temp",[[document,"mousemove","move",`notPassive${c}`],[document,"mouseup","end","notPassiveCapture"]]),a.start(l,!0))},touchStart(l){if(ot(l,a)){const i=l.target;Ce(a,"temp",[[i,"touchmove","move","notPassiveCapture"],[i,"touchcancel","end","notPassiveCapture"],[i,"touchend","end","notPassiveCapture"]]),a.start(l)}},start(l,i){de.is.firefox===!0&&Qe(e,!0);const $=tt(l);a.event={x:$.left,y:$.top,time:Date.now(),mouse:i===!0,dir:!1}},move(l){if(a.event===void 0)return;if(a.event.dir!==!1){fe(l);return}const i=Date.now()-a.event.time;if(i===0)return;const $=tt(l),g=$.left-a.event.x,b=Math.abs(g),d=$.top-a.event.y,s=Math.abs(d);if(a.event.mouse!==!0){if(b<a.sensitivity[1]&&s<a.sensitivity[1]){a.end(l);return}}else if(window.getSelection().toString()!==""){a.end(l);return}else if(b<a.sensitivity[2]&&s<a.sensitivity[2])return;const C=b/i,h=s/i;a.direction.vertical===!0&&b<s&&b<100&&h>a.sensitivity[0]&&(a.event.dir=d<0?"up":"down"),a.direction.horizontal===!0&&b>s&&s<100&&C>a.sensitivity[0]&&(a.event.dir=g<0?"left":"right"),a.direction.up===!0&&b<s&&d<0&&b<100&&h>a.sensitivity[0]&&(a.event.dir="up"),a.direction.down===!0&&b<s&&d>0&&b<100&&h>a.sensitivity[0]&&(a.event.dir="down"),a.direction.left===!0&&b>s&&g<0&&s<100&&C>a.sensitivity[0]&&(a.event.dir="left"),a.direction.right===!0&&b>s&&g>0&&s<100&&C>a.sensitivity[0]&&(a.event.dir="right"),a.event.dir!==!1?(fe(l),a.event.mouse===!0&&(document.body.classList.add("no-pointer-events--children"),document.body.classList.add("non-selectable"),Kt(),a.styleCleanup=D=>{a.styleCleanup=void 0,document.body.classList.remove("non-selectable");const f=()=>{document.body.classList.remove("no-pointer-events--children")};D===!0?setTimeout(f,50):f()}),a.handler({evt:l,touch:a.event.mouse!==!0,mouse:a.event.mouse,direction:a.event.dir,duration:i,distance:{x:b,y:s}})):a.end(l)},end(l){a.event!==void 0&&(Oe(a,"temp"),de.is.firefox===!0&&Qe(e,!1),a.styleCleanup!==void 0&&a.styleCleanup(!0),l!==void 0&&a.event.dir!==!1&&fe(l),a.event=void 0)}};if(e.__qtouchswipe=a,p.mouse===!0){const l=p.mouseCapture===!0||p.mousecapture===!0?"Capture":"";Ce(a,"main",[[e,"mousedown","mouseStart",`passive${l}`]])}de.has.touch===!0&&Ce(a,"main",[[e,"touchstart","touchStart",`passive${p.capture===!0?"Capture":""}`],[e,"touchmove","noop","notPassiveCapture"]])},updated(e,m){const T=e.__qtouchswipe;T!==void 0&&(m.oldValue!==m.value&&(typeof m.value!="function"&&T.end(),T.handler=m.value),T.direction=nt(m.modifiers))},beforeUnmount(e){const m=e.__qtouchswipe;m!==void 0&&(Oe(m,"main"),Oe(m,"temp"),de.is.firefox===!0&&Qe(e,!1),m.styleCleanup!==void 0&&m.styleCleanup(),delete e.__qtouchswipe)}});const la={name:{required:!0},disable:Boolean},rt={setup(e,{slots:m}){return()=>x("div",{class:"q-panel scroll",role:"tabpanel"},we(m.default))}},na={modelValue:{required:!0},animated:Boolean,infinite:Boolean,swipeable:Boolean,vertical:Boolean,transitionPrev:String,transitionNext:String,transitionDuration:{type:[String,Number],default:300},keepAlive:Boolean,keepAliveInclude:[String,Array,RegExp],keepAliveExclude:[String,Array,RegExp],keepAliveMax:Number},oa=["update:modelValue","beforeTransition","transition"];function ia(){const{props:e,emit:m,proxy:T}=ye(),{getCache:p}=zt();let c,a;const l=P(null),i=P(null);function $(w){const S=e.vertical===!0?"up":"left";O((T.$q.lang.rtl===!0?-1:1)*(w.direction===S?1:-1))}const g=I(()=>[[aa,$,void 0,{horizontal:e.vertical!==!0,vertical:e.vertical,mouse:!0}]]),b=I(()=>e.transitionPrev||`slide-${e.vertical===!0?"down":"right"}`),d=I(()=>e.transitionNext||`slide-${e.vertical===!0?"up":"left"}`),s=I(()=>`--q-transition-duration: ${e.transitionDuration}ms`),C=I(()=>typeof e.modelValue=="string"||typeof e.modelValue=="number"?e.modelValue:String(e.modelValue)),h=I(()=>({include:e.keepAliveInclude,exclude:e.keepAliveExclude,max:e.keepAliveMax})),D=I(()=>e.keepAliveInclude!==void 0||e.keepAliveExclude!==void 0);ve(()=>e.modelValue,(w,S)=>{const L=_(w)===!0?Q(w):-1;a!==!0&&H(L===-1?0:L<Q(S)?-1:1),l.value!==L&&(l.value=L,m("beforeTransition",w,S),Et(()=>{m("transition",w,S)}))});function f(){O(1)}function n(){O(-1)}function u(w){m("update:modelValue",w)}function _(w){return w!=null&&w!==""}function Q(w){return c.findIndex(S=>S.props.name===w&&S.props.disable!==""&&S.props.disable!==!0)}function U(){return c.filter(w=>w.props.disable!==""&&w.props.disable!==!0)}function H(w){const S=w!==0&&e.animated===!0&&l.value!==-1?"q-transition--"+(w===-1?b.value:d.value):null;i.value!==S&&(i.value=S)}function O(w,S=l.value){let L=S+w;for(;L!==-1&&L<c.length;){const te=c[L];if(te!==void 0&&te.props.disable!==""&&te.props.disable!==!0){H(w),a=!0,m("update:modelValue",te.props.name),setTimeout(()=>{a=!1});return}L+=w}e.infinite===!0&&c.length!==0&&S!==-1&&S!==c.length&&O(w,w===-1?c.length:-1)}function j(){const w=Q(e.modelValue);return l.value!==w&&(l.value=w),!0}function W(){const w=_(e.modelValue)===!0&&j()&&c[l.value];return e.keepAlive===!0?[x(Qt,h.value,[x(D.value===!0?p(C.value,()=>({...rt,name:C.value})):rt,{key:C.value,style:s.value},()=>w)])]:[x("div",{class:"q-panel scroll",style:s.value,key:C.value,role:"tabpanel"},[w])]}function Se(){if(c.length!==0)return e.animated===!0?[x(xt,{name:i.value},W)]:W()}function qe(w){return c=Ht(we(w.default,[])).filter(S=>S.props!==null&&S.props.slot===void 0&&_(S.props.name)===!0),c.length}function Ie(){return c}return Object.assign(T,{next:f,previous:n,goTo:u}),{panelIndex:l,panelDirectives:g,updatePanelsList:qe,updatePanelIndex:j,getPanelContent:Se,getEnabledPanels:U,getPanels:Ie,isValidPanelName:_,keepAliveProps:h,needsUniqueKeepAliveWrapper:D,goToPanelByOffset:O,goToPanel:u,nextPanel:f,previousPanel:n}}var be=Pe({name:"QTabPanel",props:la,setup(e,{slots:m}){return()=>x("div",{class:"q-tab-panel",role:"tabpanel"},we(m.default))}}),je=Pe({name:"QTabPanels",props:{...na,...Ot},emits:oa,setup(e,{slots:m}){const T=ye(),p=Vt(e,T.proxy.$q),{updatePanelsList:c,getPanelContent:a,panelDirectives:l}=ia(),i=I(()=>"q-tab-panels q-panel-parent"+(p.value===!0?" q-tab-panels--dark q-dark":""));return()=>(c(m),Bt("div",{class:i.value},a(),"pan",e.swipeable,()=>l.value))}});const ra=A("div",{class:"text-h6"},"Quotation Review",-1),sa={class:"row q-py-md"},ua={class:"col"},ca={class:"col q-pl-md"},da={class:"row q-pb-md"},va={class:"col"},fa={__name:"viewListApprovalItem",props:{dataHeader:Array,cd:String,typeCD:String,conn:String},setup(e){const{dialogRef:m,onDialogHide:T,onDialogOK:p,onDialogCancel:c}=De(),a=he(),l=e;ee(()=>{d.value=l.dataHeader});const i=P(!1),$=P([{name:"MITM_ITMNM",label:"Item Name",field:"MITM_ITMNM",sortable:!0,align:"left"},{name:"TQUODETA_USAGE_DESCRIPTION",label:"Usage",field:"TQUODETA_USAGE_DESCRIPTION",sortable:!0,align:"left"},{name:"TQUODETA_PRC",label:"Price",field:"TQUODETA_PRC",sortable:!0,align:"left",format:f=>parseInt(f).toLocaleString()},{name:"SUBTOT",label:"SUBTOTAL",sortable:!0,field:f=>parseInt(f.TQUODETA_PRC)+parseInt(f.TQUODETA_OPRPRC)+parseInt(f.TQUODETA_MOBDEMOB),align:"left",format:f=>f.toLocaleString()}]),g=P([]),b=P("items"),d=P({MCUS_CUSNM:"",TQUO_ATTN:"",TQUO_SBJCT:""});ee(()=>{s()});const s=async()=>{i.value=!0,await J.post(`${l.typeCD}`,{id:btoa(l.cd),TQUO_BRANCH:l.dataHeader.TQUO_BRANCH,conn:l.conn}).then(f=>{i.value=!1,g.value=f.data}).catch(f=>{i.value=!1})},C=()=>{a.dialog({title:"Confirm",message:"Are you sure want to Approve this quotation ?",cancel:!0,persistent:!0}).onOk(async f=>{i.value=!0,await J.put(`approve/quotations/${btoa(l.cd)}`,{TQUO_BRANCH:l.dataHeader.TQUO_BRANCH,conn:l.conn}).then(n=>{i.value=!1,s(),p()}).catch(n=>{i.value=!1})})},h=()=>{a.dialog({title:"Confirm",message:"Are you sure want to Reject this quotation ?",cancel:!0,persistent:!0}).onOk(async f=>{a.dialog({title:"Prompt",message:"Input reject reason.",prompt:{model:"",isValid:n=>n.length>2,type:"text"},cancel:!0,persistent:!0}).onOk(async n=>{i.value=!0,await J.put(`revise/quotations/${btoa(l.cd)}`,{remark:n,TQUO_BRANCH:l.dataHeader.TQUO_BRANCH,conn:l.conn}).then(u=>{i.value=!1,s(),p()}).catch(u=>{i.value=!1})})})},D=async()=>{i.value=!0,await J.get(`PDF/quotation/${btoa(l.cd)}/${btoa(l.conn)}`).then(f=>{i.value=!1,window.open("").document.write("<iframe width='100%' height='100%' src='data:application/pdf;base64, "+encodeURI(f.data)+"'></iframe>")}).catch(f=>{i.value=!1})};return(f,n)=>(q(),K(ke,{ref_key:"dialogRef",ref:m,onHide:Z(T),"transition-show":"slide-up","transition-hide":"slide-down","full-width":""},{default:r(()=>[t(ce,{class:"q-dialog-plugin bg-white q-pa-sm"},{default:r(()=>[t(F,null,{default:r(()=>[ra]),_:1}),t(F,{class:"q-pa-sm",style:{height:"70vh",overflow:"auto"}},{default:r(()=>[t(Le,{modelValue:b.value,"onUpdate:modelValue":n[0]||(n[0]=u=>b.value=u),dense:"",class:"text-grey","active-color":"primary","indicator-color":"primary",align:"justify","narrow-indicator":""},{default:r(()=>[t(pe,{name:"items",label:"Items"}),t(pe,{name:"conditions",label:"Conditions"}),t(pe,{name:"histCond",label:"Approval History"})]),_:1},8,["modelValue"]),t(Ae),t(je,{modelValue:b.value,"onUpdate:modelValue":n[4]||(n[4]=u=>b.value=u),animated:""},{default:r(()=>[t(be,{name:"items"},{default:r(()=>[A("div",sa,[A("div",ua,[t(z,{dense:"",filled:"",label:"Customer Name",modelValue:d.value.APP_CUSNM,"onUpdate:modelValue":n[1]||(n[1]=u=>d.value.APP_CUSNM=u),readonly:""},null,8,["modelValue"])]),A("div",ca,[t(z,{dense:"",filled:"",label:"Attn.",modelValue:d.value.APP_ATTN,"onUpdate:modelValue":n[2]||(n[2]=u=>d.value.APP_ATTN=u),readonly:""},null,8,["modelValue"])])]),A("div",da,[A("div",va,[t(z,{dense:"",filled:"",label:"Subject",modelValue:d.value.APP_SBJCT,"onUpdate:modelValue":n[3]||(n[3]=u=>d.value.APP_SBJCT=u),readonly:""},null,8,["modelValue"])])]),g.value&&g.value.dataItem?(q(),K(ge,{key:0,title:"Item List",rows:g.value.dataItem,columns:$.value,"row-key":"name",dense:"",loading:i.value},null,8,["rows","columns","loading"])):Ne("",!0)]),_:1}),t(be,{name:"conditions"},{default:r(()=>[t(it,{bordered:"",dense:""},{default:r(()=>[(q(!0),Y(ne,null,me(g.value.dataCondition,(u,_)=>Ve((q(),K(lt,{clickable:"",key:_},{default:r(()=>[t(se,{avatar:""},{default:r(()=>[t(Nt,{color:"primary","text-color":"white",size:"sm"},{default:r(()=>[G(N(_+1),1)]),_:2},1024)]),_:2},1024),t(se,null,{default:r(()=>[G(N(u.TQUOCOND_CONDI),1)]),_:2},1024)]),_:2},1024)),[[Be]])),128))]),_:1})]),_:1}),t(be,{name:"histCond"},{default:r(()=>[t(it,{bordered:"",separator:""},{default:r(()=>[(q(!0),Y(ne,null,me(g.value.approvalHistories,(u,_)=>Ve((q(),K(lt,{clickable:"",key:_},{default:r(()=>[t(se,null,{default:r(()=>[t(ue,null,{default:r(()=>[G(N(Z(ct).formatDate(u.created_at,"DD MMM YYYY HH:mm")),1)]),_:2},1024),t(ue,{caption:""},{default:r(()=>[G("Time")]),_:1})]),_:2},1024),t(se,null,{default:r(()=>[t(ue,null,{default:r(()=>[G(N(u.type==2?"Rejected":"Approved"),1)]),_:2},1024),t(ue,{caption:""},{default:r(()=>[G("Status")]),_:1})]),_:2},1024),t(se,null,{default:r(()=>[t(ue,null,{default:r(()=>[G(N(u.remark),1)]),_:2},1024),t(ue,{caption:""},{default:r(()=>[G("Remarks")]),_:1})]),_:2},1024),t(se,{side:""},{default:r(()=>[t(oe,{name:u.type==2?"cancel":"check_circle",color:u.type==2?"red":"green"},null,8,["name","color"])]),_:2},1024)]),_:2},1024)),[[Be]])),128))]),_:1})]),_:1})]),_:1},8,["modelValue"])]),_:1}),t(Re,{align:"center"},{default:r(()=>[t(Ue,null,{default:r(()=>[t(V,{color:"primary",icon:"print",disable:g.value.length===0,onClick:n[5]||(n[5]=u=>D()),flat:""},null,8,["disable"]),t(V,{color:"primary",icon:"check",label:"Approve",disable:g.value.length===0,onClick:n[6]||(n[6]=u=>C()),loading:i.value},null,8,["disable","loading"]),t(V,{color:"red",icon:"cancel",label:"Reject",disable:g.value.length===0,onClick:n[7]||(n[7]=u=>h()),loading:i.value},null,8,["disable","loading"]),t(V,{color:"orange",flat:"",label:"cancel",onClick:Z(c)},null,8,["onClick"])]),_:1})]),_:1})]),_:1})]),_:1},8,["onHide"]))}},ma=A("div",{class:"text-h6"},"PR Review",-1),pa={class:"row q-pb-md"},ba={class:"col"},ga={class:"row q-pb-md"},ha={class:"col"},_a={class:"col q-pl-md"},Ta={__name:"viewListPRItem",props:{dataHeader:Array,cd:String,typeCD:String,conn:String},setup(e){const{dialogRef:m,onDialogHide:T,onDialogOK:p,onDialogCancel:c}=De(),a=he(),l=e;ee(()=>{d.value=l.dataHeader});const i=P(!1),$=P([{name:"MITM_ITMNM",label:"Item Name",field:"MITM_ITMNM",sortable:!0,align:"left"},{name:"TPCHREQDETA_REMARK",label:"Remark",field:"TPCHREQDETA_REMARK",sortable:!0,align:"left"},{name:"TPCHREQDETA_REQDT",label:"Request Date",field:"TPCHREQDETA_REQDT",sortable:!0,align:"left"}]),g=P([]),b=P("items"),d=P({MCUS_CUSNM:"",TQUO_ATTN:"",TQUO_SBJCT:""});ee(()=>{s()});const s=async()=>{i.value=!0,await J.post(`${l.typeCD}`,{id:btoa(l.cd),TPCHREQDETA_BRANCH:l.dataHeader.TPCHREQ_BRANCH,conn:l.conn}).then(f=>{console.log(f.data.dataItem),i.value=!1,g.value=f.data}).catch(f=>{i.value=!1})},C=()=>{a.dialog({title:"Confirm",message:"Are you sure want to Approve this quotation ?",cancel:!0,persistent:!0}).onOk(async f=>{i.value=!0,await J.put(`approve/purchase-request/${btoa(l.cd)}`,{TPCHREQ_BRANCH:l.dataHeader.TPCHREQ_BRANCH,conn:l.conn}).then(n=>{i.value=!1,s(),p()}).catch(n=>{i.value=!1})})},h=()=>{a.dialog({title:"Confirm",message:"Are you sure want to Reject this quotation ?",cancel:!0,persistent:!0}).onOk(async f=>{a.dialog({title:"Prompt",message:"Input reject reason.",prompt:{model:"",isValid:n=>n.length>2,type:"text"},cancel:!0,persistent:!0}).onOk(async n=>{i.value=!0,await J.put(`revise/purchase-request/${btoa(l.cd)}`,{remark:n,TPCHREQ_BRANCH:l.dataHeader.TPCHREQ_BRANCH,conn:l.conn}).then(u=>{i.value=!1,s(),p()}).catch(u=>{i.value=!1})})})},D=()=>{window.open("https://joss.jatpowerindo.co.id/PDF/purchase/pr/"+btoa(l.cd)+"/"+btoa(l.conn),"_blank").focus()};return(f,n)=>(q(),K(ke,{ref_key:"dialogRef",ref:m,onHide:Z(T),"transition-show":"slide-up","transition-hide":"slide-down","full-width":""},{default:r(()=>[t(ce,{class:"q-dialog-plugin bg-white q-pa-sm"},{default:r(()=>[t(F,null,{default:r(()=>[ma]),_:1}),t(F,{class:"q-pa-sm",style:{height:"70vh",overflow:"auto"}},{default:r(()=>[t(Le,{modelValue:b.value,"onUpdate:modelValue":n[0]||(n[0]=u=>b.value=u),dense:"",class:"text-grey","active-color":"primary","indicator-color":"primary",align:"justify","narrow-indicator":""},{default:r(()=>[t(pe,{name:"items",label:"Items"})]),_:1},8,["modelValue"]),t(Ae),t(je,{modelValue:b.value,"onUpdate:modelValue":n[4]||(n[4]=u=>b.value=u),animated:""},{default:r(()=>[t(be,{name:"items"},{default:r(()=>[A("div",pa,[A("div",ba,[t(z,{dense:"",filled:"",label:"Purpose",modelValue:d.value.APP_SBJCT,"onUpdate:modelValue":n[1]||(n[1]=u=>d.value.APP_SBJCT=u),readonly:""},null,8,["modelValue"])])]),A("div",ga,[A("div",ha,[t(z,{dense:"",filled:"",label:"Supplier",modelValue:d.value.MSUP_SUPNM,"onUpdate:modelValue":n[2]||(n[2]=u=>d.value.MSUP_SUPNM=u),readonly:""},null,8,["modelValue"])]),A("div",_a,[t(z,{dense:"",filled:"",label:"Created Date",modelValue:d.value.CREATED_AT,"onUpdate:modelValue":n[3]||(n[3]=u=>d.value.CREATED_AT=u),readonly:""},null,8,["modelValue"])])]),g.value.dataItem?(q(),K(ge,{key:0,title:"Item List",rows:g.value.dataItem,columns:$.value,"row-key":"name",dense:"",loading:i.value},null,8,["rows","columns","loading"])):Ne("",!0)]),_:1})]),_:1},8,["modelValue"])]),_:1}),t(Re,{align:"center"},{default:r(()=>[t(Ue,null,{default:r(()=>[t(V,{color:"primary",icon:"print",disable:g.value.length===0,onClick:n[5]||(n[5]=u=>D()),flat:""},null,8,["disable"]),t(V,{color:"primary",icon:"check",label:"Approve",disable:g.value.length===0,onClick:n[6]||(n[6]=u=>C()),loading:i.value},null,8,["disable","loading"]),t(V,{color:"red",icon:"cancel",label:"Reject",disable:g.value.length===0,onClick:n[7]||(n[7]=u=>h()),loading:i.value},null,8,["disable","loading"]),t(V,{color:"orange",flat:"",label:"cancel",onClick:Z(c)},null,8,["onClick"])]),_:1})]),_:1})]),_:1})]),_:1},8,["onHide"]))}},Ca=A("div",{class:"text-h6"},"PO Review",-1),ya={class:"row q-pb-md"},Pa={class:"col"},wa={class:"col q-pl-md"},Aa={class:"row q-pb-md"},Ra={class:"col"},ka={class:"col q-pl-md"},Da={__name:"viewListPOItem",props:{dataHeader:Array,cd:String,typeCD:String,conn:String},setup(e){const{dialogRef:m,onDialogHide:T,onDialogOK:p,onDialogCancel:c}=De(),a=he(),l=e;ee(()=>{d.value=l.dataHeader});const i=P(!1),$=P([{name:"MITM_ITMNM",label:"Item Name",field:"MITM_ITMNM",sortable:!0,align:"left"},{name:"TPCHORDDETA_ITMPRC_PER",label:"Price",field:"TPCHORDDETA_ITMPRC_PER",sortable:!0,align:"left",format:f=>f.toLocaleString()},{name:"TPCHORDDETA_ITMQT",label:"Qty",field:"TPCHORDDETA_ITMQT",sortable:!0,align:"left",format:f=>f.toLocaleString()},{name:"SUBTOT",label:"SUBTOTAL",sortable:!0,field:f=>f.TPCHORDDETA_ITMPRC_PER*f.TPCHORDDETA_ITMQT,align:"left",format:f=>f.toLocaleString()}]),g=P([]),b=P("items"),d=P({MCUS_CUSNM:"",TQUO_ATTN:"",TQUO_SBJCT:""});ee(()=>{s()});const s=async()=>{i.value=!0,await J.post(`${l.typeCD}`,{id:btoa(l.cd),TPCHORD_BRANCH:l.dataHeader.TPCHORD_BRANCH,conn:l.conn}).then(f=>{i.value=!1,g.value=f.data}).catch(f=>{i.value=!1})},C=()=>{a.dialog({title:"Confirm",message:"Are you sure want to Approve this quotation ?",cancel:!0,persistent:!0}).onOk(async f=>{i.value=!0,await J.put(`approve/purchase-order/${btoa(l.cd)}`,{TPCHORD_BRANCH:l.dataHeader.TPCHORD_BRANCH,conn:l.conn}).then(n=>{i.value=!1,s(),p()}).catch(n=>{i.value=!1})})},h=()=>{a.dialog({title:"Confirm",message:"Are you sure want to Reject this quotation ?",cancel:!0,persistent:!0}).onOk(async f=>{a.dialog({title:"Prompt",message:"Input reject reason.",prompt:{model:"",isValid:n=>n.length>2,type:"text"},cancel:!0,persistent:!0}).onOk(async n=>{i.value=!0,await J.put(`revise/purchase-order/${btoa(l.cd)}`,{remark:n,TPCHORD_BRANCH:l.dataHeader.TPCHORD_BRANCH,conn:l.conn}).then(u=>{i.value=!1,s(),p()}).catch(u=>{i.value=!1})})})},D=()=>{window.open("https://joss.jatpowerindo.co.id/PDF/purchase/po/"+btoa(l.cd)+"/"+btoa(l.conn),"_blank").focus()};return(f,n)=>(q(),K(ke,{ref_key:"dialogRef",ref:m,onHide:Z(T),"transition-show":"slide-up","transition-hide":"slide-down","full-width":""},{default:r(()=>[t(ce,{class:"q-dialog-plugin bg-white q-pa-sm"},{default:r(()=>[t(F,null,{default:r(()=>[Ca]),_:1}),t(F,{class:"q-pa-sm",style:{height:"70vh",overflow:"auto"}},{default:r(()=>[t(Le,{modelValue:b.value,"onUpdate:modelValue":n[0]||(n[0]=u=>b.value=u),dense:"",class:"text-grey","active-color":"primary","indicator-color":"primary",align:"justify","narrow-indicator":""},{default:r(()=>[t(pe,{name:"items",label:"Items"})]),_:1},8,["modelValue"]),t(Ae),t(je,{modelValue:b.value,"onUpdate:modelValue":n[5]||(n[5]=u=>b.value=u),animated:""},{default:r(()=>[t(be,{name:"items"},{default:r(()=>[A("div",ya,[A("div",Pa,[t(z,{dense:"",filled:"",label:"PR Code",modelValue:d.value.REQ_CD,"onUpdate:modelValue":n[1]||(n[1]=u=>d.value.REQ_CD=u),readonly:""},null,8,["modelValue"])]),A("div",wa,[t(z,{dense:"",filled:"",label:"Subject",modelValue:d.value.APP_SBJCT,"onUpdate:modelValue":n[2]||(n[2]=u=>d.value.APP_SBJCT=u),readonly:""},null,8,["modelValue"])])]),A("div",Aa,[A("div",Ra,[t(z,{dense:"",filled:"",label:"Supplier",modelValue:d.value.APP_CUSNM,"onUpdate:modelValue":n[3]||(n[3]=u=>d.value.APP_CUSNM=u),readonly:""},null,8,["modelValue"])]),A("div",ka,[t(z,{dense:"",filled:"",label:"Created Date",modelValue:d.value.CREATED_AT,"onUpdate:modelValue":n[4]||(n[4]=u=>d.value.CREATED_AT=u),readonly:""},null,8,["modelValue"])])]),g.value.dataItem?(q(),K(ge,{key:0,title:"Item List",rows:g.value.dataItem,columns:$.value,"row-key":"name",dense:"",loading:i.value},null,8,["rows","columns","loading"])):Ne("",!0)]),_:1})]),_:1},8,["modelValue"])]),_:1}),t(Re,{align:"center"},{default:r(()=>[t(Ue,null,{default:r(()=>[t(V,{color:"primary",icon:"print",disable:g.value.length===0,onClick:n[6]||(n[6]=u=>D()),flat:""},null,8,["disable"]),t(V,{color:"primary",icon:"check",label:"Approve",disable:g.value.length===0,onClick:n[7]||(n[7]=u=>C()),loading:i.value},null,8,["disable","loading"]),t(V,{color:"red",icon:"cancel",label:"Reject",disable:g.value.length===0,onClick:n[8]||(n[8]=u=>h()),loading:i.value},null,8,["disable","loading"]),t(V,{color:"orange",flat:"",label:"cancel",onClick:Z(c)},null,8,["onClick"])]),_:1})]),_:1})]),_:1})]),_:1},8,["onHide"]))}},Sa=A("div",{class:"text-h6"},"Approval List",-1),qa={class:"q-pa-xs col-xs-12 col-sm-6 col-md-4"},Ia={class:"text-h5 text-bold"},$a={class:"text-h6 text-bold"},Ma={class:"text-subtitle2"},Ea={class:"row"},xa={class:"col"},Ha={class:"col text-right"},Qa={__name:"viewListApproval",props:{listApprv:Array,typeAPI:String,conn:String},setup(e){const m=he(),T=e,p=P([{name:"APP_CD",label:"Doc Code",field:"APP_CD"},{name:"APP_CUSNM",label:"Customer",field:"APP_CUSNM"},{name:"APP_SBJCT",label:"Subject",field:"APP_SBJCT"},{name:"APP_ATTN",label:"Attn",field:"APP_ATTN"},{name:"CREATED_AT",label:"Created Date",field:"CREATED_AT"}]),c=P(""),a=P(0),l=(s,C="days")=>{const h=new Date,D=new Date(s);return ct.getDateDiff(h,D,C)},i=(s,C)=>{let h="";T.typeAPI=="quot"?(h="quotation/quotation-approval",m.dialog({component:fa,componentProps:{dataHeader:C,cd:s,typeCD:h,conn:T.conn}}).onOk(async D=>{a.value=a.value+1,b()})):T.typeAPI=="pr"?(h="purchase-request-approval",m.dialog({component:Ta,componentProps:{dataHeader:C,cd:s,typeCD:h,conn:T.conn}}).onOk(async D=>{a.value=a.value+1,b()})):T.typeAPI=="po"&&(h="purchase-order/approval-document",m.dialog({component:Da,componentProps:{dataHeader:C,cd:s,typeCD:h,conn:T.conn}}).onOk(async D=>{a.value=a.value+1,b()}))},{dialogRef:$,onDialogHide:g,onDialogOK:b,onDialogCancel:d}=De();return(s,C)=>(q(),K(ke,{ref_key:"dialogRef",ref:$,onHide:Z(g),"transition-show":"slide-up","transition-hide":"slide-down","full-width":""},{default:r(()=>[t(ce,{class:"q-dialog-plugin bg-white q-pa-sm"},{default:r(()=>[t(F,null,{default:r(()=>[Sa]),_:1}),t(F,{class:"q-pa-sm",style:{height:"70vh",overflow:"auto"}},{default:r(()=>[(q(),K(ge,{grid:"",flat:"",bordered:"","card-container-class":s.cardContainerClass,title:"Outstanding Approval",rows:T.listApprv,columns:p.value,"row-key":"name",filter:c.value,"hide-header":"",pagination:{rowsPerPage:50},"rows-per-page-options":s.rowsPerPageOptions,key:a.value},{"top-right":r(()=>[t(z,{borderless:"",dense:"",debounce:"300",modelValue:c.value,"onUpdate:modelValue":C[0]||(C[0]=h=>c.value=h),placeholder:"Search"},{append:r(()=>[t(oe,{name:"search"})]),_:1},8,["modelValue"])]),item:r(h=>[A("div",qa,[t(ce,{flat:"",bordered:""},{default:r(()=>[t(F,{class:"text-center bg-secondary text-white"},{default:r(()=>[A("div",Ia,N(h.row.APP_CUSNM),1)]),_:2},1024),t(Ae),t(F,null,{default:r(()=>[A("div",$a,N(h.row.APP_CD),1),A("div",Ma,N(h.row.APP_SBJCT),1)]),_:2},1024),t(F,null,{default:r(()=>[A("div",Ea,[A("div",xa,[t(V,{label:"Preview",color:"primary",outline:"",onClick:D=>i(h.row.APP_CD,h.row)},null,8,["onClick"])]),A("div",Ha,N(l(h.row.CREATED_AT)<30?`${l(h.row.CREATED_AT)} Days Ago`:`${l(h.row.CREATED_AT,"months")} Month ago`),1)])]),_:2},1024)]),_:2},1024)])]),_:1},8,["card-container-class","rows","columns","filter","rows-per-page-options"]))]),_:1}),t(Re,{align:"right"},{default:r(()=>[t(V,{label:"OK",color:"primary",onClick:C[1]||(C[1]=h=>Z(b)()),disable:s.stateSubmit},null,8,["disable"])]),_:1})]),_:1})]),_:1},8,["onHide"]))}},Oa={class:"q-pa-md bg-grey-5 window-height"},Va={class:"row"},Ba={class:"row"},Na={class:"col"},Ua={class:"text-h3 text-cyan"},La={class:"text-subtitle2 text-cyan"},ja={class:"col text-right"},Ka={class:"row q-pa-sm"},Fa={class:"col"},Wa={key:1},rl={__name:"dashboardView",setup(e){const m=he(),T=P([{total:900,title:"Total Sales",icon:"shopping_cart",color:"cyan"},{total:900,title:"Total Purchase",icon:"shopping_bag",color:"cyan"},{total:900,title:"Total Profit",icon:"payments",color:"cyan"},{total:15,title:"Total Customer",icon:"group",color:"cyan"},{total:15,title:"Total Customer",icon:"group",color:"cyan"},{total:15,title:"Total Customer",icon:"group",color:"cyan"},{total:15,title:"Total Customer",icon:"group",color:"cyan"},{total:15,title:"Total Customer",icon:"group",color:"cyan"}]),p=P([{name:"name",label:"Business",field:"name",sortable:!0,align:"left"},{name:"quot",label:"Quotation",field:"quot_count",sortable:!0,align:"center"},{name:"pr",label:"Purchase Request",field:"pr_count",sortable:!0,align:"center"},{name:"po",label:"Purchase Order",field:"po_count",sortable:!0,align:"center"}]),c=P([]),a=P(!1),l=P(null);ee(async()=>{await i()&&(l.value=setInterval(i,1e4))}),ee(()=>{clearInterval(l.value)});const i=async()=>(a.value=!0,await J.get("/approval/notificationsAPI/top-user").then(g=>(a.value=!1,c.value=g.data,g.data)).catch(g=>{a.value=!1})),$=(g,b,d)=>{m.dialog({component:Qa,componentProps:{listApprv:g,typeAPI:b,conn:d}}).onOk(async s=>{quotationGroupConditions.value=s.MCONDITION_RPT_STAT,quotationConditions.value=s.group,i()})};return(g,b)=>(q(),Y("div",Oa,[A("div",Va,[(q(!0),Y(ne,null,me(T.value,(d,s)=>(q(),Y("div",{class:Ut("col-3 q-pa-sm"),key:s},[t(ce,null,{default:r(()=>[t(F,null,{default:r(()=>[A("div",Ba,[A("div",Na,[A("div",Ua,N(d.total),1),A("div",La,N(d.title),1)]),A("div",ja,[t(oe,{name:d.icon,size:"4.4em",color:d.color},null,8,["name","color"])])])]),_:2},1024)]),_:2},1024)]))),128))]),A("div",Ka,[A("div",Fa,[t(ge,{flat:"",bordered:"",title:"Approval List",rows:c.value,columns:p.value,"row-key":"name",loading:a.value},{"top-right":r(()=>[t(V,{flat:"",icon:"refresh",color:"cyan",onClick:i})]),header:r(d=>[t(at,{props:d},{default:r(()=>[(q(!0),Y(ne,null,me(d.cols,s=>(q(),K(Lt,{key:s.name,props:d},{default:r(()=>[G(N(s.label),1)]),_:2},1032,["props"]))),128))]),_:2},1032,["props"])]),body:r(d=>[t(at,{props:d},{default:r(()=>[(q(!0),Y(ne,null,me(d.cols,s=>(q(),K(jt,{key:s.name,props:d},{default:r(()=>[s.name==="quot"||s.name==="pr"||s.name==="po"||s.name==="spk"?(q(),Y(ne,{key:0},[s.value>0?(q(),K(V,{key:0,flat:"",color:"blue",onClick:C=>$(d.row[s.name.split("_")[0]],s.name,d.row.connection)},{default:r(()=>[A("b",null,N(s.value),1)]),_:2},1032,["onClick"])):(q(),Y("span",Wa,N(s.value),1))],64)):(q(),Y(ne,{key:1},[G(N(s.value),1)],64))]),_:2},1032,["props"]))),128))]),_:2},1032,["props"])]),_:1},8,["rows","columns","loading"])])])]))}};export{rl as default};
