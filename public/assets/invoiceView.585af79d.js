import{i as mt,n as $,a as Fe,u as ht,k as pt,l as _t,m as Oe}from"./QTable.772eef36.js";import{b1 as Dt,ag as F,n as gt,b8 as yt,a9 as ue,b9 as De,ae as Je,aO as ge,aA as de,a8 as ye,ab as Tt,c as Ct,ah as wt,aH as bt,aj as kt,b0 as Vt,s as O,a as V,w as xe,d as St,h as C,g as qt,aZ as Et,F as Mt,be as At,aa as Lt,T as K,Q as L,o as Ke,B,C as be,D as s,E as u,L as Ot,M as Te,aX as Ye,I as A,bl as Jt,H,O as ke,Z as Ve,am as j,X as Pe,Y as xt,P as Ce,R as He,S as Qe}from"./index.b8b5f5b3.js";import{Q as $e,a as Be}from"./QTd.8dcaebe9.js";import{Q as X}from"./QTooltip.0911104f.js";import{api_web as G}from"./axios.57893544.js";import{Q as Yt}from"./QBadge.d069dde7.js";import{u as Pt,b as Ht,c as Qt,g as $t,Q as ie,a as Ne,C as se}from"./ClosePopup.dace07a1.js";import{g as Ie,s as Re}from"./touch.3df10340.js";import{_ as re,f as Bt,d as Nt}from"./date.64c3b307.js";import{_ as It}from"./assignConditionsView.77ebf56c.js";import{_ as Rt}from"./viewAssignedCond.e37bc9db.js";import"./use-cache.b0833c75.js";function we(a,d,p){const k=de(a);let e,n=k.left-d.event.x,r=k.top-d.event.y,y=Math.abs(n),T=Math.abs(r);const f=d.direction;f.horizontal===!0&&f.vertical!==!0?e=n<0?"left":"right":f.horizontal!==!0&&f.vertical===!0?e=r<0?"up":"down":f.up===!0&&r<0?(e="up",y>T&&(f.left===!0&&n<0?e="left":f.right===!0&&n>0&&(e="right"))):f.down===!0&&r>0?(e="down",y>T&&(f.left===!0&&n<0?e="left":f.right===!0&&n>0&&(e="right"))):f.left===!0&&n<0?(e="left",y<T&&(f.up===!0&&r<0?e="up":f.down===!0&&r>0&&(e="down"))):f.right===!0&&n>0&&(e="right",y<T&&(f.up===!0&&r<0?e="up":f.down===!0&&r>0&&(e="down")));let J=!1;if(e===void 0&&p===!1){if(d.event.isFirst===!0||d.event.lastDir===void 0)return{};e=d.event.lastDir,J=!0,e==="left"||e==="right"?(k.left-=n,y=0,n=0):(k.top-=r,T=0,r=0)}return{synthetic:J,payload:{evt:a,touch:d.event.mouse!==!0,mouse:d.event.mouse===!0,position:k,direction:e,isFirst:d.event.isFirst,isFinal:p===!0,duration:Date.now()-d.event.time,distance:{x:y,y:T},offset:{x:n,y:r},delta:{x:k.left-d.event.lastX,y:k.top-d.event.lastY}}}}let Ut=0;var Ft=Dt({name:"touch-pan",beforeMount(a,{value:d,modifiers:p}){if(p.mouse!==!0&&F.has.touch!==!0)return;function k(n,r){p.mouse===!0&&r===!0?Tt(n):(p.stop===!0&&ge(n),p.prevent===!0&&Je(n))}const e={uid:"qvtp_"+Ut++,handler:d,modifiers:p,direction:Ie(p),noop:gt,mouseStart(n){Re(n,e)&&yt(n)&&(ue(e,"temp",[[document,"mousemove","move","notPassiveCapture"],[document,"mouseup","end","passiveCapture"]]),e.start(n,!0))},touchStart(n){if(Re(n,e)){const r=n.target;ue(e,"temp",[[r,"touchmove","move","notPassiveCapture"],[r,"touchcancel","end","passiveCapture"],[r,"touchend","end","passiveCapture"]]),e.start(n)}},start(n,r){if(F.is.firefox===!0&&De(a,!0),e.lastEvt=n,r===!0||p.stop===!0){if(e.direction.all!==!0&&(r!==!0||e.modifiers.mouseAllDir!==!0&&e.modifiers.mousealldir!==!0)){const f=n.type.indexOf("mouse")>-1?new MouseEvent(n.type,n):new TouchEvent(n.type,n);n.defaultPrevented===!0&&Je(f),n.cancelBubble===!0&&ge(f),Object.assign(f,{qKeyEvent:n.qKeyEvent,qClickOutside:n.qClickOutside,qAnchorHandled:n.qAnchorHandled,qClonedBy:n.qClonedBy===void 0?[e.uid]:n.qClonedBy.concat(e.uid)}),e.initialEvent={target:n.target,event:f}}ge(n)}const{left:y,top:T}=de(n);e.event={x:y,y:T,time:Date.now(),mouse:r===!0,detected:!1,isFirst:!0,isFinal:!1,lastX:y,lastY:T}},move(n){if(e.event===void 0)return;const r=de(n),y=r.left-e.event.x,T=r.top-e.event.y;if(y===0&&T===0)return;e.lastEvt=n;const f=e.event.mouse===!0,J=()=>{k(n,f);let h;p.preserveCursor!==!0&&p.preservecursor!==!0&&(h=document.documentElement.style.cursor||"",document.documentElement.style.cursor="grabbing"),f===!0&&document.body.classList.add("no-pointer-events--children"),document.body.classList.add("non-selectable"),mt(),e.styleCleanup=c=>{if(e.styleCleanup=void 0,h!==void 0&&(document.documentElement.style.cursor=h),document.body.classList.remove("non-selectable"),f===!0){const g=()=>{document.body.classList.remove("no-pointer-events--children")};c!==void 0?setTimeout(()=>{g(),c()},50):g()}else c!==void 0&&c()}};if(e.event.detected===!0){e.event.isFirst!==!0&&k(n,e.event.mouse);const{payload:h,synthetic:c}=we(n,e,!1);h!==void 0&&(e.handler(h)===!1?e.end(n):(e.styleCleanup===void 0&&e.event.isFirst===!0&&J(),e.event.lastX=h.position.left,e.event.lastY=h.position.top,e.event.lastDir=c===!0?void 0:h.direction,e.event.isFirst=!1));return}if(e.direction.all===!0||f===!0&&(e.modifiers.mouseAllDir===!0||e.modifiers.mousealldir===!0)){J(),e.event.detected=!0,e.move(n);return}const M=Math.abs(y),D=Math.abs(T);M!==D&&(e.direction.horizontal===!0&&M>D||e.direction.vertical===!0&&M<D||e.direction.up===!0&&M<D&&T<0||e.direction.down===!0&&M<D&&T>0||e.direction.left===!0&&M>D&&y<0||e.direction.right===!0&&M>D&&y>0?(e.event.detected=!0,e.move(n)):e.end(n,!0))},end(n,r){if(e.event!==void 0){if(ye(e,"temp"),F.is.firefox===!0&&De(a,!1),r===!0)e.styleCleanup!==void 0&&e.styleCleanup(),e.event.detected!==!0&&e.initialEvent!==void 0&&e.initialEvent.target.dispatchEvent(e.initialEvent.event);else if(e.event.detected===!0){e.event.isFirst===!0&&e.handler(we(n===void 0?e.lastEvt:n,e).payload);const{payload:y}=we(n===void 0?e.lastEvt:n,e,!0),T=()=>{e.handler(y)};e.styleCleanup!==void 0?e.styleCleanup(T):T()}e.event=void 0,e.initialEvent=void 0,e.lastEvt=void 0}}};if(a.__qtouchpan=e,p.mouse===!0){const n=p.mouseCapture===!0||p.mousecapture===!0?"Capture":"";ue(e,"main",[[a,"mousedown","mouseStart",`passive${n}`]])}F.has.touch===!0&&ue(e,"main",[[a,"touchstart","touchStart",`passive${p.capture===!0?"Capture":""}`],[a,"touchmove","noop","notPassiveCapture"]])},updated(a,d){const p=a.__qtouchpan;p!==void 0&&(d.oldValue!==d.value&&(typeof value!="function"&&p.end(),p.handler=d.value),p.direction=Ie(d.modifiers))},beforeUnmount(a){const d=a.__qtouchpan;d!==void 0&&(d.event!==void 0&&d.end(),ye(d,"main"),ye(d,"temp"),F.is.firefox===!0&&De(a,!1),d.styleCleanup!==void 0&&d.styleCleanup(),delete a.__qtouchpan)}});function Kt(a,d){if(a.hour!==null){if(a.minute===null)return"minute";if(d===!0&&a.second===null)return"second"}return"hour"}function jt(){const a=new Date;return{hour:a.getHours(),minute:a.getMinutes(),second:a.getSeconds(),millisecond:a.getMilliseconds()}}var Ue=Ct({name:"QTime",props:{...wt,...bt,...Pt,mask:{default:null},format24h:{type:Boolean,default:null},defaultDate:{type:String,validator:a=>/^-?[\d]+\/[0-1]\d\/[0-3]\d$/.test(a)},options:Function,hourOptions:Array,minuteOptions:Array,secondOptions:Array,withSeconds:Boolean,nowBtn:Boolean},emits:Ht,setup(a,{slots:d,emit:p}){const k=qt(),{$q:e}=k.proxy,n=kt(a,e),{tabindex:r,headerClass:y,getLocale:T,getCurrentDate:f}=Qt(a,e),J=Vt(a),M=Et(J);let D,h;const c=O(null),g=V(()=>Ze()),w=V(()=>T()),S=V(()=>et()),W=re(a.modelValue,g.value,w.value,a.calendar,S.value),_=O(Kt(W)),o=O(W),q=O(W.hour===null||W.hour<12),je=V(()=>`q-time q-time--${a.landscape===!0?"landscape":"portrait"}`+(n.value===!0?" q-time--dark q-dark":"")+(a.disable===!0?" disabled":a.readonly===!0?" q-time--readonly":"")+(a.bordered===!0?" q-time--bordered":"")+(a.square===!0?" q-time--square no-border-radius":"")+(a.flat===!0?" q-time--flat no-shadow":"")),ce=V(()=>{const t=o.value;return{hour:t.hour===null?"--":x.value===!0?$(t.hour):String(q.value===!0?t.hour===0?12:t.hour:t.hour>12?t.hour-12:t.hour),minute:t.minute===null?"--":$(t.minute),second:t.second===null?"--":$(t.second)}}),x=V(()=>a.format24h!==null?a.format24h:e.lang.date.format24h),Xe=V(()=>{const t=_.value==="hour",l=t===!0?12:60,i=o.value[_.value];let b=`rotate(${Math.round(i*(360/l))-180}deg) translateX(-50%)`;return t===!0&&x.value===!0&&o.value.hour>=12&&(b+=" scale(.7)"),{transform:b}}),Se=V(()=>o.value.hour!==null),Ge=V(()=>Se.value===!0&&o.value.minute!==null),N=V(()=>a.hourOptions!==void 0?t=>a.hourOptions.includes(t):a.options!==void 0?t=>a.options(t,null,null):null),z=V(()=>a.minuteOptions!==void 0?t=>a.minuteOptions.includes(t):a.options!==void 0?t=>a.options(o.value.hour,t,null):null),Z=V(()=>a.secondOptions!==void 0?t=>a.secondOptions.includes(t):a.options!==void 0?t=>a.options(o.value.hour,o.value.minute,t):null),P=V(()=>{if(N.value===null)return null;const t=te(0,11,N.value),l=te(12,11,N.value);return{am:t,pm:l,values:t.values.concat(l.values)}}),I=V(()=>z.value!==null?te(0,59,z.value):null),R=V(()=>Z.value!==null?te(0,59,Z.value):null),ee=V(()=>{switch(_.value){case"hour":return P.value;case"minute":return I.value;case"second":return R.value}}),We=V(()=>{let t,l,i=0,m=1;const b=ee.value!==null?ee.value.values:void 0;_.value==="hour"?x.value===!0?(t=0,l=23):(t=0,l=11,q.value===!1&&(i=12)):(t=0,l=55,m=5);const Y=[];for(let v=t,E=t;v<=l;v+=m,E++){const Q=v+i,vt=b!==void 0&&b.includes(Q)===!1,ft=_.value==="hour"&&v===0?x.value===!0?"00":"12":v;Y.push({val:Q,index:E,disable:vt,label:ft})}return Y}),ze=V(()=>[[Ft,tt,void 0,{stop:!0,prevent:!0,mouse:!0}]]);xe(()=>a.modelValue,t=>{const l=re(t,g.value,w.value,a.calendar,S.value);(l.dateHash!==o.value.dateHash||l.timeHash!==o.value.timeHash)&&(o.value=l,l.hour===null?_.value="hour":q.value=l.hour<12)}),xe([g,w],()=>{Mt(()=>{_e()})});function qe(){const t={...f(),...jt()};_e(t),Object.assign(o.value,t),_.value="hour"}function te(t,l,i){const m=Array.apply(null,{length:l+1}).map((b,Y)=>{const v=Y+t;return{index:v,val:i(v)===!0}}).filter(b=>b.val===!0).map(b=>b.index);return{min:m[0],max:m[m.length-1],values:m,threshold:l+1}}function Ee(t,l,i){const m=Math.abs(t-l);return Math.min(m,i-m)}function ve(t,{min:l,max:i,values:m,threshold:b}){if(t===l)return l;if(t<l||t>i)return Ee(t,l,b)<=Ee(t,i,b)?l:i;const Y=m.findIndex(Q=>t<=Q),v=m[Y-1],E=m[Y];return t-v<=E-t?v:E}function Ze(){return a.calendar!=="persian"&&a.mask!==null?a.mask:`HH:mm${a.withSeconds===!0?":ss":""}`}function et(){if(typeof a.defaultDate!="string"){const t=f(!0);return t.dateHash=$t(t),t}return re(a.defaultDate,"YYYY/MM/DD",void 0,a.calendar)}function fe(){return At(k)===!0||ee.value!==null&&(ee.value.values.length===0||_.value==="hour"&&x.value!==!0&&P.value[q.value===!0?"am":"pm"].values.length===0)}function me(){const t=c.value,{top:l,left:i,width:m}=t.getBoundingClientRect(),b=m/2;return{top:l+b,left:i+b,dist:b*.7}}function tt(t){if(fe()!==!0){if(t.isFirst===!0){D=me(),h=le(t.evt,D);return}h=le(t.evt,D,h),t.isFinal===!0&&(D=!1,h=null,Me())}}function Me(){_.value==="hour"?_.value="minute":a.withSeconds&&_.value==="minute"&&(_.value="second")}function le(t,l,i){const m=de(t),b=Math.abs(m.top-l.top),Y=Math.sqrt(Math.pow(Math.abs(m.top-l.top),2)+Math.pow(Math.abs(m.left-l.left),2));let v,E=Math.asin(b/Y)*(180/Math.PI);if(m.top<l.top?E=l.left<m.left?90-E:270+E:E=l.left<m.left?E+90:270-E,_.value==="hour"){if(v=E/30,P.value!==null){const Q=x.value!==!0?q.value===!0:P.value.am.values.length!==0&&P.value.pm.values.length!==0?Y>=l.dist:P.value.am.values.length!==0;v=ve(v+(Q===!0?0:12),P.value[Q===!0?"am":"pm"])}else v=Math.round(v),x.value===!0?Y<l.dist?v<12&&(v+=12):v===12&&(v=0):q.value===!0&&v===12?v=0:q.value===!1&&v!==12&&(v+=12);x.value===!0&&(q.value=v<12)}else v=Math.round(E/6)%60,_.value==="minute"&&I.value!==null?v=ve(v,I.value):_.value==="second"&&R.value!==null&&(v=ve(v,R.value));return i!==v&&rt[_.value](v),v}const he={hour(){_.value="hour"},minute(){_.value="minute"},second(){_.value="second"}};function lt(t){t.keyCode===13&&Ae()}function at(t){t.keyCode===13&&Le()}function nt(t){fe()!==!0&&(e.platform.is.desktop!==!0&&le(t,me()),Me())}function ot(t){fe()!==!0&&le(t,me())}function ut(t){if(t.keyCode===13)_.value="hour";else if([37,39].includes(t.keyCode)){const l=t.keyCode===37?-1:1;if(P.value!==null){const i=x.value===!0?P.value.values:P.value[q.value===!0?"am":"pm"].values;if(i.length===0)return;if(o.value.hour===null)ae(i[0]);else{const m=(i.length+i.indexOf(o.value.hour)+l)%i.length;ae(i[m])}}else{const i=x.value===!0?24:12,m=x.value!==!0&&q.value===!1?12:0,b=o.value.hour===null?-l:o.value.hour;ae(m+(24+b+l)%i)}}}function it(t){if(t.keyCode===13)_.value="minute";else if([37,39].includes(t.keyCode)){const l=t.keyCode===37?-1:1;if(I.value!==null){const i=I.value.values;if(i.length===0)return;if(o.value.minute===null)ne(i[0]);else{const m=(i.length+i.indexOf(o.value.minute)+l)%i.length;ne(i[m])}}else{const i=o.value.minute===null?-l:o.value.minute;ne((60+i+l)%60)}}}function st(t){if(t.keyCode===13)_.value="second";else if([37,39].includes(t.keyCode)){const l=t.keyCode===37?-1:1;if(R.value!==null){const i=R.value.values;if(i.length===0)return;if(o.value.seconds===null)oe(i[0]);else{const m=(i.length+i.indexOf(o.value.second)+l)%i.length;oe(i[m])}}else{const i=o.value.second===null?-l:o.value.second;oe((60+i+l)%60)}}}function ae(t){o.value.hour!==t&&(o.value.hour=t,U())}function ne(t){o.value.minute!==t&&(o.value.minute=t,U())}function oe(t){o.value.second!==t&&(o.value.second=t,U())}const rt={hour:ae,minute:ne,second:oe};function Ae(){q.value===!1&&(q.value=!0,o.value.hour!==null&&(o.value.hour-=12,U()))}function Le(){q.value===!0&&(q.value=!1,o.value.hour!==null&&(o.value.hour+=12,U()))}function pe(t){const l=a.modelValue;_.value!==t&&l!==void 0&&l!==null&&l!==""&&typeof l!="string"&&(_.value=t)}function U(){if(N.value!==null&&N.value(o.value.hour)!==!0){o.value=re(),pe("hour");return}if(z.value!==null&&z.value(o.value.minute)!==!0){o.value.minute=null,o.value.second=null,pe("minute");return}if(a.withSeconds===!0&&Z.value!==null&&Z.value(o.value.second)!==!0){o.value.second=null,pe("second");return}o.value.hour===null||o.value.minute===null||a.withSeconds===!0&&o.value.second===null||_e()}function _e(t){const l=Object.assign({...o.value},t),i=a.calendar==="persian"?$(l.hour)+":"+$(l.minute)+(a.withSeconds===!0?":"+$(l.second):""):Bt(new Date(l.year,l.month===null?null:l.month-1,l.day,l.hour,l.minute,l.second,l.millisecond),g.value,w.value,l.year,l.timezoneOffset);l.changed=i!==a.modelValue,p("update:modelValue",i,l)}function dt(){const t=[C("div",{class:"q-time__link "+(_.value==="hour"?"q-time__link--active":"cursor-pointer"),tabindex:r.value,onClick:he.hour,onKeyup:ut},ce.value.hour),C("div",":"),C("div",Se.value===!0?{class:"q-time__link "+(_.value==="minute"?"q-time__link--active":"cursor-pointer"),tabindex:r.value,onKeyup:it,onClick:he.minute}:{class:"q-time__link"},ce.value.minute)];a.withSeconds===!0&&t.push(C("div",":"),C("div",Ge.value===!0?{class:"q-time__link "+(_.value==="second"?"q-time__link--active":"cursor-pointer"),tabindex:r.value,onKeyup:st,onClick:he.second}:{class:"q-time__link"},ce.value.second));const l=[C("div",{class:"q-time__header-label row items-center no-wrap",dir:"ltr"},t)];return x.value===!1&&l.push(C("div",{class:"q-time__header-ampm column items-between no-wrap"},[C("div",{class:"q-time__link "+(q.value===!0?"q-time__link--active":"cursor-pointer"),tabindex:r.value,onClick:Ae,onKeyup:lt},"AM"),C("div",{class:"q-time__link "+(q.value!==!0?"q-time__link--active":"cursor-pointer"),tabindex:r.value,onClick:Le,onKeyup:at},"PM")])),C("div",{class:"q-time__header flex flex-center no-wrap "+y.value},l)}function ct(){const t=o.value[_.value];return C("div",{class:"q-time__content col relative-position"},[C(Lt,{name:"q-transition--scale"},()=>C("div",{key:"clock"+_.value,class:"q-time__container-parent absolute-full"},[C("div",{ref:c,class:"q-time__container-child fit overflow-hidden"},[K(C("div",{class:"q-time__clock cursor-pointer non-selectable",onClick:nt,onMousedown:ot},[C("div",{class:"q-time__clock-circle fit"},[C("div",{class:"q-time__clock-pointer"+(o.value[_.value]===null?" hidden":a.color!==void 0?` text-${a.color}`:""),style:Xe.value}),We.value.map(l=>C("div",{class:`q-time__clock-position row flex-center q-time__clock-pos-${l.index}`+(l.val===t?" q-time__clock-position--active "+y.value:l.disable===!0?" q-time__clock-position--disable":"")},[C("span",l.label)]))])]),ze.value)])])),a.nowBtn===!0?C(L,{class:"q-time__now-button absolute",icon:e.iconSet.datetime.now,unelevated:!0,size:"sm",round:!0,color:a.color,textColor:a.textColor,tabindex:r.value,onClick:qe}):null])}return k.proxy.setNow=qe,()=>{const t=[ct()],l=St(d.default);return l!==void 0&&t.push(C("div",{class:"q-time__actions"},l)),a.name!==void 0&&a.disable!==!0&&M(t,"push"),C("div",{class:je.value,tabindex:-1},[dt(),C("div",{class:"q-time__main col overflow-auto"},t)])}}});const Xt=A("div",{class:"text-h6"},"Update Surat Jalan",-1),Gt={class:"row q-pb-md"},Wt={class:"col"},zt={class:"col text-right"},Zt={class:"row q-pt-md"},el={class:"col"},tl={class:"row items-center justify-end"},ll={class:"row items-center justify-end"},al={class:"col q-pl-md"},nl={class:"row items-center justify-end"},ol={class:"row items-center justify-end"},ul={__name:"updateSJ",props:{idDlv:String,dataSJDB:Array},setup(a){const d=Fe(),p=a;Ke(()=>{e.value.TDLVSJDETA_DLVCD=p.idDlv,p.dataSJDB&&(e.value=p.dataSJDB)});const k=O([{label:"General",value:"general"},{label:"Forklift",value:"forklift"},{label:"Genset",value:"genset"}]),e=O({TDLVSJDETA_DLVCD:"",TDLVSJDETA_TYPE:"",TDLVSJDETA_CONDGRP:"",TDLVSJDETA_STARTDT:"",TDLVSJDETA_ENDDT:"",condition:[]});O([]);const n=O(!1),r=()=>!e.value.TDLVSJDETA_DLVCD||!e.value.TDLVSJDETA_TYPE||!e.value.TDLVSJDETA_CONDGRP||!e.value.TDLVSJDETA_STARTDT||!e.value.TDLVSJDETA_ENDDT,y=()=>{d.dialog({component:It}).onOk(async g=>{e.value.TDLVSJDETA_CONDGRP=g.MCONDITION_RPT_STAT,e.value.condition=g.group})},T=()=>{d.dialog({component:Rt,componentProps:{listCond:e.value.condition}}).onOk(async g=>{})},f=()=>{d.dialog({title:"Confirmation",message:"Do you want to save all this data ?",cancel:!0,persistent:!0}).onOk(async()=>{n.value=!0,await G.post("invoice",e.value).then(g=>{h(e.value),n.value=!1}).catch(g=>{n.value=!1})})},J=g=>g>=Nt.formatDate(new Date,"YYYY/MM/DD"),{dialogRef:M,onDialogHide:D,onDialogOK:h,onDialogCancel:c}=ht();return(g,w)=>(B(),be(xt,{ref_key:"dialogRef",ref:M,onHide:Pe(D),"transition-show":"slide-up","transition-hide":"slide-down","full-width":""},{default:s(()=>[u(Ot,{class:"q-dialog-plugin bg-white q-pa-sm"},{default:s(()=>[u(Te,null,{default:s(()=>[Xt]),_:1}),u(Ye),u(Te,{class:"q-pa-sm"},{default:s(()=>[A("div",Gt,[A("div",Wt,[u(Jt,{options:k.value,type:"radio",modelValue:e.value.TDLVSJDETA_TYPE,"onUpdate:modelValue":w[0]||(w[0]=S=>e.value.TDLVSJDETA_TYPE=S)},null,8,["options","modelValue"])]),A("div",zt,[u(L,{color:"blue",label:"Assign Conditions",onClick:y,loading:n.value},null,8,["loading"]),u(L,{icon:"visibility",color:"indigo",flat:"",onClick:T,loading:n.value},{default:s(()=>[u(X,null,{default:s(()=>[H("View Conditions")]),_:1}),u(Yt,{color:"red",floating:""},{default:s(()=>[H(ke(e.value.condition.length),1)]),_:1})]),_:1},8,["loading"])])]),u(Ye),A("div",Zt,[A("div",el,[u(Ve,{filled:"",modelValue:e.value.TDLVSJDETA_STARTDT,"onUpdate:modelValue":w[3]||(w[3]=S=>e.value.TDLVSJDETA_STARTDT=S),label:"Jam Masuk"},{prepend:s(()=>[u(j,{name:"event",class:"cursor-pointer"},{default:s(()=>[u(ie,{cover:"","transition-show":"scale","transition-hide":"scale"},{default:s(()=>[u(Ne,{modelValue:e.value.TDLVSJDETA_STARTDT,"onUpdate:modelValue":w[1]||(w[1]=S=>e.value.TDLVSJDETA_STARTDT=S),mask:"YYYY-MM-DD HH:mm",options:J},{default:s(()=>[A("div",tl,[K(u(L,{label:"Close",color:"primary",flat:""},null,512),[[se]])])]),_:1},8,["modelValue"])]),_:1})]),_:1})]),append:s(()=>[u(j,{name:"access_time",class:"cursor-pointer"},{default:s(()=>[u(ie,{cover:"","transition-show":"scale","transition-hide":"scale"},{default:s(()=>[u(Ue,{modelValue:e.value.TDLVSJDETA_STARTDT,"onUpdate:modelValue":w[2]||(w[2]=S=>e.value.TDLVSJDETA_STARTDT=S),mask:"YYYY-MM-DD HH:mm",format24h:""},{default:s(()=>[A("div",ll,[K(u(L,{label:"Close",color:"primary",flat:""},null,512),[[se]])])]),_:1},8,["modelValue"])]),_:1})]),_:1})]),_:1},8,["modelValue"])]),A("div",al,[u(Ve,{filled:"",modelValue:e.value.TDLVSJDETA_ENDDT,"onUpdate:modelValue":w[6]||(w[6]=S=>e.value.TDLVSJDETA_ENDDT=S),label:"Jam Keluar"},{prepend:s(()=>[u(j,{name:"event",class:"cursor-pointer"},{default:s(()=>[u(ie,{cover:"","transition-show":"scale","transition-hide":"scale"},{default:s(()=>[u(Ne,{modelValue:e.value.TDLVSJDETA_ENDDT,"onUpdate:modelValue":w[4]||(w[4]=S=>e.value.TDLVSJDETA_ENDDT=S),mask:"YYYY-MM-DD HH:mm",options:J},{default:s(()=>[A("div",nl,[K(u(L,{label:"Close",color:"primary",flat:""},null,512),[[se]])])]),_:1},8,["modelValue"])]),_:1})]),_:1})]),append:s(()=>[u(j,{name:"access_time",class:"cursor-pointer"},{default:s(()=>[u(ie,{cover:"","transition-show":"scale","transition-hide":"scale"},{default:s(()=>[u(Ue,{modelValue:e.value.TDLVSJDETA_ENDDT,"onUpdate:modelValue":w[5]||(w[5]=S=>e.value.TDLVSJDETA_ENDDT=S),mask:"YYYY-MM-DD HH:mm",format24h:""},{default:s(()=>[A("div",ol,[K(u(L,{label:"Close",color:"primary",flat:""},null,512),[[se]])])]),_:1},8,["modelValue"])]),_:1})]),_:1})]),_:1},8,["modelValue"])])])]),_:1}),u(Te,{class:"q-pa-sm"},{default:s(()=>[u(L,{label:"OK",color:"primary",onClick:w[7]||(w[7]=S=>f()),disable:r(),loading:n.value},null,8,["disable","loading"]),u(L,{flat:"",label:"Cancel",color:"red",onClick:Pe(c)},null,8,["onClick"])]),_:1})]),_:1})]),_:1},8,["onHide"]))}},il={class:"q-pa-md"},sl={class:"row"},rl={class:"col"},Cl={__name:"invoiceView",setup(a){const d=Fe(),p=O([]),k=O([{name:"TDLVORD_DLVCD",label:"DO Number",field:"TDLVORD_DLVCD",sortable:!0,align:"left"},{name:"MCUS_CUSNM",label:"Customer",field:"MCUS_CUSNM",sortable:!0,align:"left"}]),e=O(!1),n=O(""),r=O("");Ke(()=>{y()});const y=async()=>{e.value=!0,await G.post("invoices/search",{searchBy:n.value,searchValue:r.value}).then(D=>{e.value=!1,p.value=D.data.data}).catch(D=>{e.value=!1})},T=async D=>{e.value=!0,await G.post("invoices/printInvoice",D).then(h=>{e.value=!1,window.open("").document.write("<iframe width='100%' height='100%' src='data:application/pdf;base64, "+encodeURI(h.data)+"'></iframe>")}).catch(h=>{e.value=!1})},f=async D=>{e.value=!0,await G.get(`invoices/printKwitansi/${btoa(D)}`).then(h=>{e.value=!1,window.open("").document.write("<iframe width='100%' height='100%' src='data:application/pdf;base64, "+encodeURI(h.data)+"'></iframe>")}).catch(h=>{e.value=!1})},J=async D=>{d.dialog({title:"Options",message:"Choose type surat jalan",options:{type:"radio",model:"general",items:[{label:"General",value:"general"},{label:"Forklift",value:"forklift"},{label:"Genset",value:"genset"}]},cancel:!0,persistent:!0}).onOk(async h=>{e.value=!0,await G.get(`invoices/printSJ/${btoa(D)}`).then(c=>{e.value=!1,window.open("").document.write("<iframe width='100%' height='100%' src='data:application/pdf;base64, "+encodeURI(c.data)+"'></iframe>")}).catch(c=>{e.value=!1})})},M=D=>{d.dialog({component:ul,componentProps:{idDlv:D.TDLVORD_DLVCD,dataSJDB:D.dlvsj}}).onOk(async h=>{y()})};return(D,h)=>(B(),Ce("div",il,[A("div",sl,[A("div",rl,[u(pt,{title:"Invoice List",rows:p.value,columns:k.value,"row-key":"name",loading:e.value,dense:"",pagination:{rowsPerPage:20},class:"my-sticky-header-column-table"},{"top-right":s(()=>[u(_t,{outlined:"",modelValue:n.value,"onUpdate:modelValue":h[0]||(h[0]=c=>n.value=c),options:k.value,label:"Search Columns","option-value":"name","option-label":"label","emit-value":"",dense:"","map-options":""},null,8,["modelValue","options"]),u(Ve,{borderless:"",dense:"",modelValue:r.value,"onUpdate:modelValue":[h[1]||(h[1]=c=>r.value=c),h[2]||(h[2]=c=>D.dataOutstanding())],placeholder:"Search",outlined:"",debounce:"1000"},{append:s(()=>[u(j,{name:"search"})]),_:1},8,["modelValue"])]),header:s(c=>[u($e,{props:c},{default:s(()=>[(B(!0),Ce(He,null,Qe(c.cols,g=>(B(),be(Oe,{key:g.name,props:c},{default:s(()=>[H(ke(g.label),1)]),_:2},1032,["props"]))),128)),u(Oe,{"auto-width":""},{default:s(()=>[H("Action")]),_:1})]),_:2},1032,["props"])]),body:s(c=>[u($e,{props:c},{default:s(()=>[(B(!0),Ce(He,null,Qe(c.cols,g=>(B(),be(Be,{key:g.name,props:c},{default:s(()=>[H(ke(g.value),1)]),_:2},1032,["props"]))),128)),u(Be,{"auto-width":""},{default:s(()=>[u(L,{flat:"",color:"red",icon:"list",dense:"",onClick:g=>M(c.row)},{default:s(()=>[u(X,null,{default:s(()=>[H("Update Surat Jalan")]),_:1})]),_:2},1032,["onClick"]),u(L,{flat:"",color:"green",icon:"print",dense:"",onClick:g=>T(c.row)},{default:s(()=>[u(X,null,{default:s(()=>[H("Print Invoice")]),_:1})]),_:2},1032,["onClick"]),u(L,{flat:"",color:"indigo",icon:"print",dense:"",onClick:g=>f(c.row.TDLVORD_DLVCD)},{default:s(()=>[u(X,null,{default:s(()=>[H("Print Receipt")]),_:1})]),_:2},1032,["onClick"]),u(L,{flat:"",color:c.row.dlvsj?"orange":"grey",icon:"print",dense:"",onClick:g=>J(c.row.TDLVORD_DLVCD),disable:!c.row.dlvsj},{default:s(()=>[u(X,null,{default:s(()=>[H("Print Surat Jalan")]),_:1})]),_:2},1032,["color","onClick","disable"])]),_:2},1024)]),_:2},1032,["props"])]),_:1},8,["rows","columns","loading"])])])]))}};export{Cl as default};
