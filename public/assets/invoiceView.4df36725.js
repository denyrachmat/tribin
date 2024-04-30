import{i as vt,n as H,a as Ue,u as ft,k as mt,l as ht,m as Oe}from"./QTable.00c985ce.js";import{b1 as pt,ag as U,n as _t,b8 as gt,a9 as ne,b9 as _e,ae as Le,aO as ge,aA as re,a8 as De,ab as Dt,c as yt,ah as Ct,aH as wt,aj as bt,b0 as Tt,s as q,a as k,w as xe,d as kt,h as w,g as Vt,aZ as St,F as qt,be as Mt,aa as Et,T as F,Q as x,o as Fe,B as Q,C as we,D as r,E as s,L as At,M as Je,I as M,bl as Ot,H as P,O as be,aX as Lt,Z as Te,am as R,X as xt,Y as Jt,P as ye,R as Pe,S as Ye}from"./index.6c397426.js";import{Q as He,a as Qe}from"./QTd.23547ff7.js";import{Q as K}from"./QTooltip.0b3a679a.js";import{api_web as oe}from"./axios.8bffc033.js";import{Q as Pt}from"./QBadge.33ff0a65.js";import{u as Yt,b as Ht,c as Qt,g as $t,Q as ue,a as $e,C as ie}from"./ClosePopup.ddf458fd.js";import{g as Be,s as Ie}from"./touch.3df10340.js";import{_ as se,f as Bt}from"./date.0f662cc2.js";import{_ as It}from"./assignConditionsView.ccfcfb6e.js";import{_ as Nt}from"./viewAssignedCond.f441d01c.js";import"./use-cache.b0833c75.js";function Ce(a,c,g){const T=re(a);let e,n=T.left-c.event.x,d=T.top-c.event.y,y=Math.abs(n),C=Math.abs(d);const m=c.direction;m.horizontal===!0&&m.vertical!==!0?e=n<0?"left":"right":m.horizontal!==!0&&m.vertical===!0?e=d<0?"up":"down":m.up===!0&&d<0?(e="up",y>C&&(m.left===!0&&n<0?e="left":m.right===!0&&n>0&&(e="right"))):m.down===!0&&d>0?(e="down",y>C&&(m.left===!0&&n<0?e="left":m.right===!0&&n>0&&(e="right"))):m.left===!0&&n<0?(e="left",y<C&&(m.up===!0&&d<0?e="up":m.down===!0&&d>0&&(e="down"))):m.right===!0&&n>0&&(e="right",y<C&&(m.up===!0&&d<0?e="up":m.down===!0&&d>0&&(e="down")));let O=!1;if(e===void 0&&g===!1){if(c.event.isFirst===!0||c.event.lastDir===void 0)return{};e=c.event.lastDir,O=!0,e==="left"||e==="right"?(T.left-=n,y=0,n=0):(T.top-=d,C=0,d=0)}return{synthetic:O,payload:{evt:a,touch:c.event.mouse!==!0,mouse:c.event.mouse===!0,position:T,direction:e,isFirst:c.event.isFirst,isFinal:g===!0,duration:Date.now()-c.event.time,distance:{x:y,y:C},offset:{x:n,y:d},delta:{x:T.left-c.event.lastX,y:T.top-c.event.lastY}}}}let Ut=0;var Ft=pt({name:"touch-pan",beforeMount(a,{value:c,modifiers:g}){if(g.mouse!==!0&&U.has.touch!==!0)return;function T(n,d){g.mouse===!0&&d===!0?Dt(n):(g.stop===!0&&ge(n),g.prevent===!0&&Le(n))}const e={uid:"qvtp_"+Ut++,handler:c,modifiers:g,direction:Be(g),noop:_t,mouseStart(n){Ie(n,e)&&gt(n)&&(ne(e,"temp",[[document,"mousemove","move","notPassiveCapture"],[document,"mouseup","end","passiveCapture"]]),e.start(n,!0))},touchStart(n){if(Ie(n,e)){const d=n.target;ne(e,"temp",[[d,"touchmove","move","notPassiveCapture"],[d,"touchcancel","end","passiveCapture"],[d,"touchend","end","passiveCapture"]]),e.start(n)}},start(n,d){if(U.is.firefox===!0&&_e(a,!0),e.lastEvt=n,d===!0||g.stop===!0){if(e.direction.all!==!0&&(d!==!0||e.modifiers.mouseAllDir!==!0&&e.modifiers.mousealldir!==!0)){const m=n.type.indexOf("mouse")>-1?new MouseEvent(n.type,n):new TouchEvent(n.type,n);n.defaultPrevented===!0&&Le(m),n.cancelBubble===!0&&ge(m),Object.assign(m,{qKeyEvent:n.qKeyEvent,qClickOutside:n.qClickOutside,qAnchorHandled:n.qAnchorHandled,qClonedBy:n.qClonedBy===void 0?[e.uid]:n.qClonedBy.concat(e.uid)}),e.initialEvent={target:n.target,event:m}}ge(n)}const{left:y,top:C}=re(n);e.event={x:y,y:C,time:Date.now(),mouse:d===!0,detected:!1,isFirst:!0,isFinal:!1,lastX:y,lastY:C}},move(n){if(e.event===void 0)return;const d=re(n),y=d.left-e.event.x,C=d.top-e.event.y;if(y===0&&C===0)return;e.lastEvt=n;const m=e.event.mouse===!0,O=()=>{T(n,m);let v;g.preserveCursor!==!0&&g.preservecursor!==!0&&(v=document.documentElement.style.cursor||"",document.documentElement.style.cursor="grabbing"),m===!0&&document.body.classList.add("no-pointer-events--children"),document.body.classList.add("non-selectable"),vt(),e.styleCleanup=o=>{if(e.styleCleanup=void 0,v!==void 0&&(document.documentElement.style.cursor=v),document.body.classList.remove("non-selectable"),m===!0){const h=()=>{document.body.classList.remove("no-pointer-events--children")};o!==void 0?setTimeout(()=>{h(),o()},50):h()}else o!==void 0&&o()}};if(e.event.detected===!0){e.event.isFirst!==!0&&T(n,e.event.mouse);const{payload:v,synthetic:o}=Ce(n,e,!1);v!==void 0&&(e.handler(v)===!1?e.end(n):(e.styleCleanup===void 0&&e.event.isFirst===!0&&O(),e.event.lastX=v.position.left,e.event.lastY=v.position.top,e.event.lastDir=o===!0?void 0:v.direction,e.event.isFirst=!1));return}if(e.direction.all===!0||m===!0&&(e.modifiers.mouseAllDir===!0||e.modifiers.mousealldir===!0)){O(),e.event.detected=!0,e.move(n);return}const E=Math.abs(y),D=Math.abs(C);E!==D&&(e.direction.horizontal===!0&&E>D||e.direction.vertical===!0&&E<D||e.direction.up===!0&&E<D&&C<0||e.direction.down===!0&&E<D&&C>0||e.direction.left===!0&&E>D&&y<0||e.direction.right===!0&&E>D&&y>0?(e.event.detected=!0,e.move(n)):e.end(n,!0))},end(n,d){if(e.event!==void 0){if(De(e,"temp"),U.is.firefox===!0&&_e(a,!1),d===!0)e.styleCleanup!==void 0&&e.styleCleanup(),e.event.detected!==!0&&e.initialEvent!==void 0&&e.initialEvent.target.dispatchEvent(e.initialEvent.event);else if(e.event.detected===!0){e.event.isFirst===!0&&e.handler(Ce(n===void 0?e.lastEvt:n,e).payload);const{payload:y}=Ce(n===void 0?e.lastEvt:n,e,!0),C=()=>{e.handler(y)};e.styleCleanup!==void 0?e.styleCleanup(C):C()}e.event=void 0,e.initialEvent=void 0,e.lastEvt=void 0}}};if(a.__qtouchpan=e,g.mouse===!0){const n=g.mouseCapture===!0||g.mousecapture===!0?"Capture":"";ne(e,"main",[[a,"mousedown","mouseStart",`passive${n}`]])}U.has.touch===!0&&ne(e,"main",[[a,"touchstart","touchStart",`passive${g.capture===!0?"Capture":""}`],[a,"touchmove","noop","notPassiveCapture"]])},updated(a,c){const g=a.__qtouchpan;g!==void 0&&(c.oldValue!==c.value&&(typeof value!="function"&&g.end(),g.handler=c.value),g.direction=Be(c.modifiers))},beforeUnmount(a){const c=a.__qtouchpan;c!==void 0&&(c.event!==void 0&&c.end(),De(c,"main"),De(c,"temp"),U.is.firefox===!0&&_e(a,!1),c.styleCleanup!==void 0&&c.styleCleanup(),delete a.__qtouchpan)}});function Rt(a,c){if(a.hour!==null){if(a.minute===null)return"minute";if(c===!0&&a.second===null)return"second"}return"hour"}function Kt(){const a=new Date;return{hour:a.getHours(),minute:a.getMinutes(),second:a.getSeconds(),millisecond:a.getMilliseconds()}}var Ne=yt({name:"QTime",props:{...Ct,...wt,...Yt,mask:{default:null},format24h:{type:Boolean,default:null},defaultDate:{type:String,validator:a=>/^-?[\d]+\/[0-1]\d\/[0-3]\d$/.test(a)},options:Function,hourOptions:Array,minuteOptions:Array,secondOptions:Array,withSeconds:Boolean,nowBtn:Boolean},emits:Ht,setup(a,{slots:c,emit:g}){const T=Vt(),{$q:e}=T.proxy,n=bt(a,e),{tabindex:d,headerClass:y,getLocale:C,getCurrentDate:m}=Qt(a,e),O=Tt(a),E=St(O);let D,v;const o=q(null),h=k(()=>Ge()),j=k(()=>C()),ke=k(()=>ze()),X=se(a.modelValue,h.value,j.value,a.calendar,ke.value),_=q(Rt(X)),u=q(X),V=q(X.hour===null||X.hour<12),Re=k(()=>`q-time q-time--${a.landscape===!0?"landscape":"portrait"}`+(n.value===!0?" q-time--dark q-dark":"")+(a.disable===!0?" disabled":a.readonly===!0?" q-time--readonly":"")+(a.bordered===!0?" q-time--bordered":"")+(a.square===!0?" q-time--square no-border-radius":"")+(a.flat===!0?" q-time--flat no-shadow":"")),de=k(()=>{const t=u.value;return{hour:t.hour===null?"--":A.value===!0?H(t.hour):String(V.value===!0?t.hour===0?12:t.hour:t.hour>12?t.hour-12:t.hour),minute:t.minute===null?"--":H(t.minute),second:t.second===null?"--":H(t.second)}}),A=k(()=>a.format24h!==null?a.format24h:e.lang.date.format24h),Ke=k(()=>{const t=_.value==="hour",l=t===!0?12:60,i=u.value[_.value];let b=`rotate(${Math.round(i*(360/l))-180}deg) translateX(-50%)`;return t===!0&&A.value===!0&&u.value.hour>=12&&(b+=" scale(.7)"),{transform:b}}),Ve=k(()=>u.value.hour!==null),je=k(()=>Ve.value===!0&&u.value.minute!==null),$=k(()=>a.hourOptions!==void 0?t=>a.hourOptions.includes(t):a.options!==void 0?t=>a.options(t,null,null):null),W=k(()=>a.minuteOptions!==void 0?t=>a.minuteOptions.includes(t):a.options!==void 0?t=>a.options(u.value.hour,t,null):null),G=k(()=>a.secondOptions!==void 0?t=>a.secondOptions.includes(t):a.options!==void 0?t=>a.options(u.value.hour,u.value.minute,t):null),J=k(()=>{if($.value===null)return null;const t=Z(0,11,$.value),l=Z(12,11,$.value);return{am:t,pm:l,values:t.values.concat(l.values)}}),B=k(()=>W.value!==null?Z(0,59,W.value):null),I=k(()=>G.value!==null?Z(0,59,G.value):null),z=k(()=>{switch(_.value){case"hour":return J.value;case"minute":return B.value;case"second":return I.value}}),Xe=k(()=>{let t,l,i=0,p=1;const b=z.value!==null?z.value.values:void 0;_.value==="hour"?A.value===!0?(t=0,l=23):(t=0,l=11,V.value===!1&&(i=12)):(t=0,l=55,p=5);const L=[];for(let f=t,S=t;f<=l;f+=p,S++){const Y=f+i,dt=b!==void 0&&b.includes(Y)===!1,ct=_.value==="hour"&&f===0?A.value===!0?"00":"12":f;L.push({val:Y,index:S,disable:dt,label:ct})}return L}),We=k(()=>[[Ft,Ze,void 0,{stop:!0,prevent:!0,mouse:!0}]]);xe(()=>a.modelValue,t=>{const l=se(t,h.value,j.value,a.calendar,ke.value);(l.dateHash!==u.value.dateHash||l.timeHash!==u.value.timeHash)&&(u.value=l,l.hour===null?_.value="hour":V.value=l.hour<12)}),xe([h,j],()=>{qt(()=>{pe()})});function Se(){const t={...m(),...Kt()};pe(t),Object.assign(u.value,t),_.value="hour"}function Z(t,l,i){const p=Array.apply(null,{length:l+1}).map((b,L)=>{const f=L+t;return{index:f,val:i(f)===!0}}).filter(b=>b.val===!0).map(b=>b.index);return{min:p[0],max:p[p.length-1],values:p,threshold:l+1}}function qe(t,l,i){const p=Math.abs(t-l);return Math.min(p,i-p)}function ce(t,{min:l,max:i,values:p,threshold:b}){if(t===l)return l;if(t<l||t>i)return qe(t,l,b)<=qe(t,i,b)?l:i;const L=p.findIndex(Y=>t<=Y),f=p[L-1],S=p[L];return t-f<=S-t?f:S}function Ge(){return a.calendar!=="persian"&&a.mask!==null?a.mask:`HH:mm${a.withSeconds===!0?":ss":""}`}function ze(){if(typeof a.defaultDate!="string"){const t=m(!0);return t.dateHash=$t(t),t}return se(a.defaultDate,"YYYY/MM/DD",void 0,a.calendar)}function ve(){return Mt(T)===!0||z.value!==null&&(z.value.values.length===0||_.value==="hour"&&A.value!==!0&&J.value[V.value===!0?"am":"pm"].values.length===0)}function fe(){const t=o.value,{top:l,left:i,width:p}=t.getBoundingClientRect(),b=p/2;return{top:l+b,left:i+b,dist:b*.7}}function Ze(t){if(ve()!==!0){if(t.isFirst===!0){D=fe(),v=ee(t.evt,D);return}v=ee(t.evt,D,v),t.isFinal===!0&&(D=!1,v=null,Me())}}function Me(){_.value==="hour"?_.value="minute":a.withSeconds&&_.value==="minute"&&(_.value="second")}function ee(t,l,i){const p=re(t),b=Math.abs(p.top-l.top),L=Math.sqrt(Math.pow(Math.abs(p.top-l.top),2)+Math.pow(Math.abs(p.left-l.left),2));let f,S=Math.asin(b/L)*(180/Math.PI);if(p.top<l.top?S=l.left<p.left?90-S:270+S:S=l.left<p.left?S+90:270-S,_.value==="hour"){if(f=S/30,J.value!==null){const Y=A.value!==!0?V.value===!0:J.value.am.values.length!==0&&J.value.pm.values.length!==0?L>=l.dist:J.value.am.values.length!==0;f=ce(f+(Y===!0?0:12),J.value[Y===!0?"am":"pm"])}else f=Math.round(f),A.value===!0?L<l.dist?f<12&&(f+=12):f===12&&(f=0):V.value===!0&&f===12?f=0:V.value===!1&&f!==12&&(f+=12);A.value===!0&&(V.value=f<12)}else f=Math.round(S/6)%60,_.value==="minute"&&B.value!==null?f=ce(f,B.value):_.value==="second"&&I.value!==null&&(f=ce(f,I.value));return i!==f&&it[_.value](f),f}const me={hour(){_.value="hour"},minute(){_.value="minute"},second(){_.value="second"}};function et(t){t.keyCode===13&&Ee()}function tt(t){t.keyCode===13&&Ae()}function lt(t){ve()!==!0&&(e.platform.is.desktop!==!0&&ee(t,fe()),Me())}function at(t){ve()!==!0&&ee(t,fe())}function nt(t){if(t.keyCode===13)_.value="hour";else if([37,39].includes(t.keyCode)){const l=t.keyCode===37?-1:1;if(J.value!==null){const i=A.value===!0?J.value.values:J.value[V.value===!0?"am":"pm"].values;if(i.length===0)return;if(u.value.hour===null)te(i[0]);else{const p=(i.length+i.indexOf(u.value.hour)+l)%i.length;te(i[p])}}else{const i=A.value===!0?24:12,p=A.value!==!0&&V.value===!1?12:0,b=u.value.hour===null?-l:u.value.hour;te(p+(24+b+l)%i)}}}function ot(t){if(t.keyCode===13)_.value="minute";else if([37,39].includes(t.keyCode)){const l=t.keyCode===37?-1:1;if(B.value!==null){const i=B.value.values;if(i.length===0)return;if(u.value.minute===null)le(i[0]);else{const p=(i.length+i.indexOf(u.value.minute)+l)%i.length;le(i[p])}}else{const i=u.value.minute===null?-l:u.value.minute;le((60+i+l)%60)}}}function ut(t){if(t.keyCode===13)_.value="second";else if([37,39].includes(t.keyCode)){const l=t.keyCode===37?-1:1;if(I.value!==null){const i=I.value.values;if(i.length===0)return;if(u.value.seconds===null)ae(i[0]);else{const p=(i.length+i.indexOf(u.value.second)+l)%i.length;ae(i[p])}}else{const i=u.value.second===null?-l:u.value.second;ae((60+i+l)%60)}}}function te(t){u.value.hour!==t&&(u.value.hour=t,N())}function le(t){u.value.minute!==t&&(u.value.minute=t,N())}function ae(t){u.value.second!==t&&(u.value.second=t,N())}const it={hour:te,minute:le,second:ae};function Ee(){V.value===!1&&(V.value=!0,u.value.hour!==null&&(u.value.hour-=12,N()))}function Ae(){V.value===!0&&(V.value=!1,u.value.hour!==null&&(u.value.hour+=12,N()))}function he(t){const l=a.modelValue;_.value!==t&&l!==void 0&&l!==null&&l!==""&&typeof l!="string"&&(_.value=t)}function N(){if($.value!==null&&$.value(u.value.hour)!==!0){u.value=se(),he("hour");return}if(W.value!==null&&W.value(u.value.minute)!==!0){u.value.minute=null,u.value.second=null,he("minute");return}if(a.withSeconds===!0&&G.value!==null&&G.value(u.value.second)!==!0){u.value.second=null,he("second");return}u.value.hour===null||u.value.minute===null||a.withSeconds===!0&&u.value.second===null||pe()}function pe(t){const l=Object.assign({...u.value},t),i=a.calendar==="persian"?H(l.hour)+":"+H(l.minute)+(a.withSeconds===!0?":"+H(l.second):""):Bt(new Date(l.year,l.month===null?null:l.month-1,l.day,l.hour,l.minute,l.second,l.millisecond),h.value,j.value,l.year,l.timezoneOffset);l.changed=i!==a.modelValue,g("update:modelValue",i,l)}function st(){const t=[w("div",{class:"q-time__link "+(_.value==="hour"?"q-time__link--active":"cursor-pointer"),tabindex:d.value,onClick:me.hour,onKeyup:nt},de.value.hour),w("div",":"),w("div",Ve.value===!0?{class:"q-time__link "+(_.value==="minute"?"q-time__link--active":"cursor-pointer"),tabindex:d.value,onKeyup:ot,onClick:me.minute}:{class:"q-time__link"},de.value.minute)];a.withSeconds===!0&&t.push(w("div",":"),w("div",je.value===!0?{class:"q-time__link "+(_.value==="second"?"q-time__link--active":"cursor-pointer"),tabindex:d.value,onKeyup:ut,onClick:me.second}:{class:"q-time__link"},de.value.second));const l=[w("div",{class:"q-time__header-label row items-center no-wrap",dir:"ltr"},t)];return A.value===!1&&l.push(w("div",{class:"q-time__header-ampm column items-between no-wrap"},[w("div",{class:"q-time__link "+(V.value===!0?"q-time__link--active":"cursor-pointer"),tabindex:d.value,onClick:Ee,onKeyup:et},"AM"),w("div",{class:"q-time__link "+(V.value!==!0?"q-time__link--active":"cursor-pointer"),tabindex:d.value,onClick:Ae,onKeyup:tt},"PM")])),w("div",{class:"q-time__header flex flex-center no-wrap "+y.value},l)}function rt(){const t=u.value[_.value];return w("div",{class:"q-time__content col relative-position"},[w(Et,{name:"q-transition--scale"},()=>w("div",{key:"clock"+_.value,class:"q-time__container-parent absolute-full"},[w("div",{ref:o,class:"q-time__container-child fit overflow-hidden"},[F(w("div",{class:"q-time__clock cursor-pointer non-selectable",onClick:lt,onMousedown:at},[w("div",{class:"q-time__clock-circle fit"},[w("div",{class:"q-time__clock-pointer"+(u.value[_.value]===null?" hidden":a.color!==void 0?` text-${a.color}`:""),style:Ke.value}),Xe.value.map(l=>w("div",{class:`q-time__clock-position row flex-center q-time__clock-pos-${l.index}`+(l.val===t?" q-time__clock-position--active "+y.value:l.disable===!0?" q-time__clock-position--disable":"")},[w("span",l.label)]))])]),We.value)])])),a.nowBtn===!0?w(x,{class:"q-time__now-button absolute",icon:e.iconSet.datetime.now,unelevated:!0,size:"sm",round:!0,color:a.color,textColor:a.textColor,tabindex:d.value,onClick:Se}):null])}return T.proxy.setNow=Se,()=>{const t=[rt()],l=kt(c.default);return l!==void 0&&t.push(w("div",{class:"q-time__actions"},l)),a.name!==void 0&&a.disable!==!0&&E(t,"push"),w("div",{class:Re.value,tabindex:-1},[st(),w("div",{class:"q-time__main col overflow-auto"},t)])}}});const jt=M("div",{class:"text-h6"},"Update Surat Jalan",-1),Xt={class:"row q-pb-md"},Wt={class:"col"},Gt={class:"col text-right"},zt={class:"row q-pt-md"},Zt={class:"col"},el={class:"row items-center justify-end"},tl={class:"row items-center justify-end"},ll={class:"col q-pl-md"},al={class:"row items-center justify-end"},nl={class:"row items-center justify-end"},ol={__name:"updateSJ",props:{dataSJDB:Array},setup(a){const c=Ue(),g=a;Fe(()=>{g.dataSJDB&&(e.value=g.dataSJDB)});const T=q([{label:"General",value:"general"},{label:"Forklift",value:"forklift"},{label:"Genset",value:"genset"}]);q("");const e=q({TDLVSJDETA_DLVCD:"",TDLVSJDETA_TYPE:"",TDLVSJDETA_CONDGRP:"",TDLVSJDETA_STARTDT:"",TDLVSJDETA_ENDDT:""}),n=q([]),d=q(!1),y=()=>{c.dialog({component:It}).onOk(async v=>{e.value.TDLVSJDETA_CONDGRP=v.MCONDITION_RPT_STAT,n.value=v.group})},C=()=>{c.dialog({component:Nt,componentProps:{listCond:n.value}}).onOk(async v=>{})},{dialogRef:m,onDialogHide:O,onDialogOK:E,onDialogCancel:D}=ft();return(v,o)=>(Q(),we(Jt,{ref_key:"dialogRef",ref:m,onHide:xt(O),"transition-show":"slide-up","transition-hide":"slide-down","full-width":""},{default:r(()=>[s(At,{class:"q-dialog-plugin bg-white q-pa-sm"},{default:r(()=>[s(Je,null,{default:r(()=>[jt]),_:1}),s(Je,{class:"q-pa-sm"},{default:r(()=>[M("div",Xt,[M("div",Wt,[s(Ot,{options:T.value,type:"radio",modelValue:e.value.TDLVSJDETA_TYPE,"onUpdate:modelValue":o[0]||(o[0]=h=>e.value.TDLVSJDETA_TYPE=h)},null,8,["options","modelValue"])]),M("div",Gt,[s(x,{color:"blue",label:"Assign Conditions",onClick:y,loading:d.value},null,8,["loading"]),s(x,{icon:"visibility",color:"indigo",flat:"",onClick:C,loading:d.value},{default:r(()=>[s(K,null,{default:r(()=>[P("View Conditions")]),_:1}),s(Pt,{color:"red",floating:""},{default:r(()=>[P(be(n.value.length),1)]),_:1})]),_:1},8,["loading"])])]),s(Lt),M("div",zt,[M("div",Zt,[s(Te,{filled:"",modelValue:e.value.TDLVSJDETA_STARTDT,"onUpdate:modelValue":o[3]||(o[3]=h=>e.value.TDLVSJDETA_STARTDT=h)},{prepend:r(()=>[s(R,{name:"event",class:"cursor-pointer"},{default:r(()=>[s(ue,{cover:"","transition-show":"scale","transition-hide":"scale"},{default:r(()=>[s($e,{modelValue:e.value.TDLVSJDETA_STARTDT,"onUpdate:modelValue":o[1]||(o[1]=h=>e.value.TDLVSJDETA_STARTDT=h),mask:"YYYY-MM-DD HH:mm"},{default:r(()=>[M("div",el,[F(s(x,{label:"Close",color:"primary",flat:""},null,512),[[ie]])])]),_:1},8,["modelValue"])]),_:1})]),_:1})]),append:r(()=>[s(R,{name:"access_time",class:"cursor-pointer"},{default:r(()=>[s(ue,{cover:"","transition-show":"scale","transition-hide":"scale"},{default:r(()=>[s(Ne,{modelValue:e.value.TDLVSJDETA_STARTDT,"onUpdate:modelValue":o[2]||(o[2]=h=>e.value.TDLVSJDETA_STARTDT=h),mask:"YYYY-MM-DD HH:mm",format24h:""},{default:r(()=>[M("div",tl,[F(s(x,{label:"Close",color:"primary",flat:""},null,512),[[ie]])])]),_:1},8,["modelValue"])]),_:1})]),_:1})]),_:1},8,["modelValue"])]),M("div",ll,[s(Te,{filled:"",modelValue:e.value.TDLVSJDETA_ENDDT,"onUpdate:modelValue":o[6]||(o[6]=h=>e.value.TDLVSJDETA_ENDDT=h)},{prepend:r(()=>[s(R,{name:"event",class:"cursor-pointer"},{default:r(()=>[s(ue,{cover:"","transition-show":"scale","transition-hide":"scale"},{default:r(()=>[s($e,{modelValue:e.value.TDLVSJDETA_ENDDT,"onUpdate:modelValue":o[4]||(o[4]=h=>e.value.TDLVSJDETA_ENDDT=h),mask:"YYYY-MM-DD HH:mm"},{default:r(()=>[M("div",al,[F(s(x,{label:"Close",color:"primary",flat:""},null,512),[[ie]])])]),_:1},8,["modelValue"])]),_:1})]),_:1})]),append:r(()=>[s(R,{name:"access_time",class:"cursor-pointer"},{default:r(()=>[s(ue,{cover:"","transition-show":"scale","transition-hide":"scale"},{default:r(()=>[s(Ne,{modelValue:e.value.TDLVSJDETA_ENDDT,"onUpdate:modelValue":o[5]||(o[5]=h=>e.value.TDLVSJDETA_ENDDT=h),mask:"YYYY-MM-DD HH:mm",format24h:""},{default:r(()=>[M("div",nl,[F(s(x,{label:"Close",color:"primary",flat:""},null,512),[[ie]])])]),_:1},8,["modelValue"])]),_:1})]),_:1})]),_:1},8,["modelValue"])])])]),_:1})]),_:1})]),_:1},8,["onHide"]))}},ul={class:"q-pa-md"},il={class:"row"},sl={class:"col"},Cl={__name:"invoiceView",setup(a){const c=Ue(),g=q([]),T=q([{name:"TDLVORD_DLVCD",label:"DO Number",field:"TDLVORD_DLVCD",sortable:!0,align:"left"},{name:"MCUS_CUSNM",label:"Customer",field:"MCUS_CUSNM",sortable:!0,align:"left"}]),e=q(!1),n=q(""),d=q("");Fe(()=>{y()});const y=async()=>{e.value=!0,await oe.post("invoices/search",{searchBy:n.value,searchValue:d.value}).then(D=>{e.value=!1,g.value=D.data.data}).catch(D=>{e.value=!1})},C=async D=>{e.value=!0,await oe.post("invoices/printInvoice",D).then(v=>{e.value=!1,window.open("").document.write("<iframe width='100%' height='100%' src='data:application/pdf;base64, "+encodeURI(v.data)+"'></iframe>")}).catch(v=>{e.value=!1})},m=async D=>{e.value=!0,await oe.get(`invoices/printKwitansi/${btoa(D)}`).then(v=>{e.value=!1,window.open("").document.write("<iframe width='100%' height='100%' src='data:application/pdf;base64, "+encodeURI(v.data)+"'></iframe>")}).catch(v=>{e.value=!1})},O=async D=>{c.dialog({title:"Options",message:"Choose type surat jalan",options:{type:"radio",model:"general",items:[{label:"General",value:"general"},{label:"Forklift",value:"forklift"},{label:"Genset",value:"genset"}]},cancel:!0,persistent:!0}).onOk(async v=>{e.value=!0,await oe.get(`invoices/printSJ/${btoa(D)}`).then(o=>{e.value=!1,window.open("").document.write("<iframe width='100%' height='100%' src='data:application/pdf;base64, "+encodeURI(o.data)+"'></iframe>")}).catch(o=>{e.value=!1})})},E=D=>{c.dialog({component:ol}).onOk(async v=>{y()})};return(D,v)=>(Q(),ye("div",ul,[M("div",il,[M("div",sl,[s(mt,{title:"Invoice List",rows:g.value,columns:T.value,"row-key":"name",loading:e.value,dense:"",pagination:{rowsPerPage:20},class:"my-sticky-header-column-table"},{"top-right":r(()=>[s(ht,{outlined:"",modelValue:n.value,"onUpdate:modelValue":v[0]||(v[0]=o=>n.value=o),options:T.value,label:"Search Columns","option-value":"name","option-label":"label","emit-value":"",dense:"","map-options":""},null,8,["modelValue","options"]),s(Te,{borderless:"",dense:"",modelValue:d.value,"onUpdate:modelValue":[v[1]||(v[1]=o=>d.value=o),v[2]||(v[2]=o=>D.dataOutstanding())],placeholder:"Search",outlined:"",debounce:"1000"},{append:r(()=>[s(R,{name:"search"})]),_:1},8,["modelValue"])]),header:r(o=>[s(He,{props:o},{default:r(()=>[(Q(!0),ye(Pe,null,Ye(o.cols,h=>(Q(),we(Oe,{key:h.name,props:o},{default:r(()=>[P(be(h.label),1)]),_:2},1032,["props"]))),128)),s(Oe,{"auto-width":""},{default:r(()=>[P("Action")]),_:1})]),_:2},1032,["props"])]),body:r(o=>[s(He,{props:o},{default:r(()=>[(Q(!0),ye(Pe,null,Ye(o.cols,h=>(Q(),we(Qe,{key:h.name,props:o},{default:r(()=>[P(be(h.value),1)]),_:2},1032,["props"]))),128)),s(Qe,{"auto-width":""},{default:r(()=>[s(x,{flat:"",color:"red",icon:"list",dense:"",onClick:h=>E(o.row.dlvsj)},{default:r(()=>[s(K,null,{default:r(()=>[P("Update Surat Jalan")]),_:1})]),_:2},1032,["onClick"]),s(x,{flat:"",color:"green",icon:"print",dense:"",onClick:h=>C(o.row)},{default:r(()=>[s(K,null,{default:r(()=>[P("Print Invoice")]),_:1})]),_:2},1032,["onClick"]),s(x,{flat:"",color:"indigo",icon:"print",dense:"",onClick:h=>m(o.row.TDLVORD_DLVCD)},{default:r(()=>[s(K,null,{default:r(()=>[P("Print Receipt")]),_:1})]),_:2},1032,["onClick"]),s(x,{flat:"",color:o.row.dlvsj?"orange":"grey",icon:"print",dense:"",onClick:h=>O(o.row.TDLVORD_DLVCD),disable:!o.row.dlvsj},{default:r(()=>[s(K,null,{default:r(()=>[P("Print Surat Jalan")]),_:1})]),_:2},1032,["color","onClick","disable"])]),_:2},1024)]),_:2},1032,["props"])]),_:1},8,["rows","columns","loading"])])])]))}};export{Cl as default};
