import{a as c,c as Be,aA as it,ab as st,ac as ct,a_ as dt,s as k,aN as vt,w as K,h as u,a2 as X,d as ft,g as Ae,aS as mt,F as Ie,Q as T,aQ as ht,O as yt,a$ as gt,b0 as _t,b1 as bt,a5 as wt}from"./index.04057656.js";import{u as xt}from"./use-cache.b83d8e68.js";import{t as Dt,a as Ee,f as qt,g as Mt,j as be,_ as Ct}from"./date.358e1f55.js";import{o as A,e as kt,h as Ht,q as St}from"./use-dialog-plugin-component.8a91fc75.js";const Vt=["gregorian","persian"],Yt={modelValue:{required:!0},mask:{type:String},locale:Object,calendar:{type:String,validator:n=>Vt.includes(n),default:"gregorian"},landscape:Boolean,color:String,textColor:String,square:Boolean,flat:Boolean,bordered:Boolean,readonly:Boolean,disable:Boolean},jt=["update:modelValue"];function I(n){return n.year+"/"+A(n.month)+"/"+A(n.day)}function Ot(n,g){const y=c(()=>n.disable!==!0&&n.readonly!==!0),M=c(()=>y.value===!0?0:-1),_=c(()=>{const f=[];return n.color!==void 0&&f.push(`bg-${n.color}`),n.textColor!==void 0&&f.push(`text-${n.textColor}`),f.join(" ")});function N(){return n.locale!==void 0?{...g.lang.date,...n.locale}:g.lang.date}function b(f){const Y=new Date,j=f===!0?null:0;if(n.calendar==="persian"){const S=Dt(Y);return{year:S.jy,month:S.jm,day:S.jd}}return{year:Y.getFullYear(),month:Y.getMonth()+1,day:Y.getDate(),hour:j,minute:j,second:j,millisecond:j}}return{editable:y,tabindex:M,headerClass:_,getLocale:N,getCurrentDate:b}}const B=20,Tt=["Calendar","Years","Months"],Pe=n=>Tt.includes(n),we=n=>/^-?[\d]+\/[0-1]\d$/.test(n),z=" \u2014 ";function E(n){return n.year+"/"+A(n.month)}var $t=Be({name:"QDate",props:{...Yt,...it,...st,multiple:Boolean,range:Boolean,title:String,subtitle:String,mask:{default:"YYYY/MM/DD"},defaultYearMonth:{type:String,validator:we},yearsInMonthView:Boolean,events:[Array,Function],eventColor:[String,Function],emitImmediately:Boolean,options:[Array,Function],navigationMinYearMonth:{type:String,validator:we},navigationMaxYearMonth:{type:String,validator:we},noUnset:Boolean,firstDayOfWeek:[String,Number],todayBtn:Boolean,minimal:Boolean,defaultView:{type:String,default:"Calendar",validator:Pe}},emits:[...jt,"rangeStart","rangeEnd","navigation"],setup(n,{slots:g,emit:y}){const{proxy:M}=Ae(),{$q:_}=M,N=ct(n,_),{getCache:b}=xt(),{tabindex:f,headerClass:Y,getLocale:j,getCurrentDate:S}=Ot(n,_);let V;const re=dt(n),ue=mt(re),W=k(null),m=k(Se()),h=k(j()),Ne=c(()=>Se()),Re=c(()=>j()),O=c(()=>S()),i=k(Ve(m.value,h.value)),q=k(n.defaultView),xe=_.lang.rtl===!0?"right":"left",Z=k(xe.value),ie=k(xe.value),se=i.value.year,ee=k(se-se%B-(se<0?B:0)),D=k(null),Qe=c(()=>{const e=n.landscape===!0?"landscape":"portrait";return`q-date q-date--${e} q-date--${e}-${n.minimal===!0?"minimal":"standard"}`+(N.value===!0?" q-date--dark q-dark":"")+(n.bordered===!0?" q-date--bordered":"")+(n.square===!0?" q-date--square no-border-radius":"")+(n.flat===!0?" q-date--flat no-shadow":"")+(n.disable===!0?" disabled":n.readonly===!0?" q-date--readonly":"")}),P=c(()=>n.color||"primary"),R=c(()=>n.textColor||"white"),te=c(()=>n.emitImmediately===!0&&n.multiple!==!0&&n.range!==!0),ce=c(()=>Array.isArray(n.modelValue)===!0?n.modelValue:n.modelValue!==null&&n.modelValue!==void 0?[n.modelValue]:[]),H=c(()=>ce.value.filter(e=>typeof e=="string").map(e=>me(e,m.value,h.value)).filter(e=>e.dateHash!==null&&e.day!==null&&e.month!==null&&e.year!==null)),Q=c(()=>{const e=t=>me(t,m.value,h.value);return ce.value.filter(t=>vt(t)===!0&&t.from!==void 0&&t.to!==void 0).map(t=>({from:e(t.from),to:e(t.to)})).filter(t=>t.from.dateHash!==null&&t.to.dateHash!==null&&t.from.dateHash<t.to.dateHash)}),ae=c(()=>n.calendar!=="persian"?e=>new Date(e.year,e.month-1,e.day):e=>{const t=Ee(e.year,e.month,e.day);return new Date(t.gy,t.gm-1,t.gd)}),de=c(()=>n.calendar==="persian"?I:(e,t,a)=>qt(new Date(e.year,e.month-1,e.day,e.hour,e.minute,e.second,e.millisecond),t===void 0?m.value:t,a===void 0?h.value:a,e.year,e.timezoneOffset)),U=c(()=>H.value.length+Q.value.reduce((e,t)=>e+1+Mt(ae.value(t.to),ae.value(t.from)),0)),De=c(()=>{if(n.title!==void 0&&n.title!==null&&n.title.length!==0)return n.title;if(D.value!==null){const a=D.value.init,l=ae.value(a);return h.value.daysShort[l.getDay()]+", "+h.value.monthsShort[a.month-1]+" "+a.day+z+"?"}if(U.value===0)return z;if(U.value>1)return`${U.value} ${h.value.pluralDay}`;const e=H.value[0],t=ae.value(e);return isNaN(t.valueOf())===!0?z:h.value.headerTitle!==void 0?h.value.headerTitle(t,e):h.value.daysShort[t.getDay()]+", "+h.value.monthsShort[e.month-1]+" "+e.day}),Le=c(()=>H.value.concat(Q.value.map(t=>t.from)).sort((t,a)=>t.year-a.year||t.month-a.month)[0]),pe=c(()=>H.value.concat(Q.value.map(t=>t.to)).sort((t,a)=>a.year-t.year||a.month-t.month)[0]),qe=c(()=>{if(n.subtitle!==void 0&&n.subtitle!==null&&n.subtitle.length!==0)return n.subtitle;if(U.value===0)return z;if(U.value>1){const e=Le.value,t=pe.value,a=h.value.monthsShort;return a[e.month-1]+(e.year!==t.year?" "+e.year+z+a[t.month-1]+" ":e.month!==t.month?z+a[t.month-1]:"")+" "+t.year}return H.value[0].year}),ne=c(()=>{const e=[_.iconSet.datetime.arrowLeft,_.iconSet.datetime.arrowRight];return _.lang.rtl===!0?e.reverse():e}),Me=c(()=>n.firstDayOfWeek!==void 0?Number(n.firstDayOfWeek):h.value.firstDayOfWeek),ze=c(()=>{const e=h.value.daysShort,t=Me.value;return t>0?e.slice(t,7).concat(e.slice(0,t)):e}),F=c(()=>{const e=i.value;return n.calendar!=="persian"?new Date(e.year,e.month,0).getDate():be(e.year,e.month)}),Ke=c(()=>typeof n.eventColor=="function"?n.eventColor:()=>n.eventColor),w=c(()=>{if(n.navigationMinYearMonth===void 0)return null;const e=n.navigationMinYearMonth.split("/");return{year:parseInt(e[0],10),month:parseInt(e[1],10)}}),x=c(()=>{if(n.navigationMaxYearMonth===void 0)return null;const e=n.navigationMaxYearMonth.split("/");return{year:parseInt(e[0],10),month:parseInt(e[1],10)}}),ve=c(()=>{const e={month:{prev:!0,next:!0},year:{prev:!0,next:!0}};return w.value!==null&&w.value.year>=i.value.year&&(e.year.prev=!1,w.value.year===i.value.year&&w.value.month>=i.value.month&&(e.month.prev=!1)),x.value!==null&&x.value.year<=i.value.year&&(e.year.next=!1,x.value.year===i.value.year&&x.value.month<=i.value.month&&(e.month.next=!1)),e}),le=c(()=>{const e={};return H.value.forEach(t=>{const a=E(t);e[a]===void 0&&(e[a]=[]),e[a].push(t.day)}),e}),Ce=c(()=>{const e={};return Q.value.forEach(t=>{const a=E(t.from),l=E(t.to);if(e[a]===void 0&&(e[a]=[]),e[a].push({from:t.from.day,to:a===l?t.to.day:void 0,range:t}),a<l){let o;const{year:d,month:r}=t.from,s=r<12?{year:d,month:r+1}:{year:d+1,month:1};for(;(o=E(s))<=l;)e[o]===void 0&&(e[o]=[]),e[o].push({from:void 0,to:o===l?t.to.day:void 0,range:t}),s.month++,s.month>12&&(s.year++,s.month=1)}}),e}),J=c(()=>{if(D.value===null)return;const{init:e,initHash:t,final:a,finalHash:l}=D.value,[o,d]=t<=l?[e,a]:[a,e],r=E(o),s=E(d);if(r!==C.value&&s!==C.value)return;const v={};return r===C.value?(v.from=o.day,v.includeFrom=!0):v.from=1,s===C.value?(v.to=d.day,v.includeTo=!0):v.to=F.value,v}),C=c(()=>E(i.value)),We=c(()=>{const e={};if(n.options===void 0){for(let a=1;a<=F.value;a++)e[a]=!0;return e}const t=typeof n.options=="function"?n.options:a=>n.options.includes(a);for(let a=1;a<=F.value;a++){const l=C.value+"/"+A(a);e[a]=t(l)}return e}),Ue=c(()=>{const e={};if(n.events===void 0)for(let t=1;t<=F.value;t++)e[t]=!1;else{const t=typeof n.events=="function"?n.events:a=>n.events.includes(a);for(let a=1;a<=F.value;a++){const l=C.value+"/"+A(a);e[a]=t(l)===!0&&Ke.value(l)}}return e}),Je=c(()=>{let e,t;const{year:a,month:l}=i.value;if(n.calendar!=="persian")e=new Date(a,l-1,1),t=new Date(a,l-1,0).getDate();else{const o=Ee(a,l,1);e=new Date(o.gy,o.gm-1,o.gd);let d=l-1,r=a;d===0&&(d=12,r--),t=be(r,d)}return{days:e.getDay()-Me.value-1,endDay:t}}),ke=c(()=>{const e=[],{days:t,endDay:a}=Je.value,l=t<0?t+7:t;if(l<6)for(let r=a-l;r<=a;r++)e.push({i:r,fill:!0});const o=e.length;for(let r=1;r<=F.value;r++){const s={i:r,event:Ue.value[r],classes:[]};We.value[r]===!0&&(s.in=!0,s.flat=!0),e.push(s)}if(le.value[C.value]!==void 0&&le.value[C.value].forEach(r=>{const s=o+r-1;Object.assign(e[s],{selected:!0,unelevated:!0,flat:!1,color:P.value,textColor:R.value})}),Ce.value[C.value]!==void 0&&Ce.value[C.value].forEach(r=>{if(r.from!==void 0){const s=o+r.from-1,v=o+(r.to||F.value)-1;for(let G=s;G<=v;G++)Object.assign(e[G],{range:r.range,unelevated:!0,color:P.value,textColor:R.value});Object.assign(e[s],{rangeFrom:!0,flat:!1}),r.to!==void 0&&Object.assign(e[v],{rangeTo:!0,flat:!1})}else if(r.to!==void 0){const s=o+r.to-1;for(let v=o;v<=s;v++)Object.assign(e[v],{range:r.range,unelevated:!0,color:P.value,textColor:R.value});Object.assign(e[s],{flat:!1,rangeTo:!0})}else{const s=o+F.value-1;for(let v=o;v<=s;v++)Object.assign(e[v],{range:r.range,unelevated:!0,color:P.value,textColor:R.value})}}),J.value!==void 0){const r=o+J.value.from-1,s=o+J.value.to-1;for(let v=r;v<=s;v++)e[v].color=P.value,e[v].editRange=!0;J.value.includeFrom===!0&&(e[r].editRangeFrom=!0),J.value.includeTo===!0&&(e[s].editRangeTo=!0)}i.value.year===O.value.year&&i.value.month===O.value.month&&(e[o+O.value.day-1].today=!0);const d=e.length%7;if(d>0){const r=7-d;for(let s=1;s<=r;s++)e.push({i:s,fill:!0})}return e.forEach(r=>{let s="q-date__calendar-item ";r.fill===!0?s+="q-date__calendar-item--fill":(s+=`q-date__calendar-item--${r.in===!0?"in":"out"}`,r.range!==void 0&&(s+=` q-date__range${r.rangeTo===!0?"-to":r.rangeFrom===!0?"-from":""}`),r.editRange===!0&&(s+=` q-date__edit-range${r.editRangeFrom===!0?"-from":""}${r.editRangeTo===!0?"-to":""}`),(r.range!==void 0||r.editRange===!0)&&(s+=` text-${r.color}`)),r.classes=s}),e}),Ge=c(()=>n.disable===!0?{"aria-disabled":"true"}:{});K(()=>n.modelValue,e=>{if(V===e)V=0;else{const t=Ve(m.value,h.value);L(t.year,t.month,t)}}),K(q,()=>{W.value!==null&&M.$el.contains(document.activeElement)===!0&&W.value.focus()}),K(()=>i.value.year+"|"+i.value.month,()=>{y("navigation",{year:i.value.year,month:i.value.month})}),K(Ne,e=>{Fe(e,h.value,"mask"),m.value=e}),K(Re,e=>{Fe(m.value,e,"locale"),h.value=e});function He(){const{year:e,month:t,day:a}=O.value,l={...i.value,year:e,month:t,day:a},o=le.value[E(l)];(o===void 0||o.includes(l.day)===!1)&&ye(l),fe(l.year,l.month)}function Xe(e){Pe(e)===!0&&(q.value=e)}function Ze(e,t){["month","year"].includes(e)&&(e==="month"?je:he)(t===!0?-1:1)}function fe(e,t){q.value="Calendar",L(e,t)}function et(e,t){if(n.range===!1||!e){D.value=null;return}const a=Object.assign({...i.value},e),l=t!==void 0?Object.assign({...i.value},t):a;D.value={init:a,initHash:I(a),final:l,finalHash:I(l)},fe(a.year,a.month)}function Se(){return n.calendar==="persian"?"YYYY/MM/DD":n.mask}function me(e,t,a){return Ct(e,t,a,n.calendar,{hour:0,minute:0,second:0,millisecond:0})}function Ve(e,t){const a=Array.isArray(n.modelValue)===!0?n.modelValue:n.modelValue?[n.modelValue]:[];if(a.length===0)return Ye();const l=a[a.length-1],o=me(l.from!==void 0?l.from:l,e,t);return o.dateHash===null?Ye():o}function Ye(){let e,t;if(n.defaultYearMonth!==void 0){const a=n.defaultYearMonth.split("/");e=parseInt(a[0],10),t=parseInt(a[1],10)}else{const a=O.value!==void 0?O.value:S();e=a.year,t=a.month}return{year:e,month:t,day:1,hour:0,minute:0,second:0,millisecond:0,dateHash:e+"/"+A(t)+"/01"}}function je(e){let t=i.value.year,a=Number(i.value.month)+e;a===13?(a=1,t++):a===0&&(a=12,t--),L(t,a),te.value===!0&&oe("month")}function he(e){const t=Number(i.value.year)+e;L(t,i.value.month),te.value===!0&&oe("year")}function tt(e){L(e,i.value.month),q.value=n.defaultView==="Years"?"Months":"Calendar",te.value===!0&&oe("year")}function at(e){L(i.value.year,e),q.value="Calendar",te.value===!0&&oe("month")}function nt(e,t){const a=le.value[t];(a!==void 0&&a.includes(e.day)===!0?ge:ye)(e)}function $(e){return{year:e.year,month:e.month,day:e.day}}function L(e,t,a){if(w.value!==null&&e<=w.value.year&&((t<w.value.month||e<w.value.year)&&(t=w.value.month),e=w.value.year),x.value!==null&&e>=x.value.year&&((t>x.value.month||e>x.value.year)&&(t=x.value.month),e=x.value.year),a!==void 0){const{hour:o,minute:d,second:r,millisecond:s,timezoneOffset:v,timeHash:G}=a;Object.assign(i.value,{hour:o,minute:d,second:r,millisecond:s,timezoneOffset:v,timeHash:G})}const l=e+"/"+A(t)+"/01";l!==i.value.dateHash&&(Z.value=i.value.dateHash<l==(_.lang.rtl!==!0)?"left":"right",e!==i.value.year&&(ie.value=Z.value),Ie(()=>{ee.value=e-e%B-(e<0?B:0),Object.assign(i.value,{year:e,month:t,day:1,dateHash:l})}))}function Oe(e,t,a){const l=e!==null&&e.length===1&&n.multiple===!1?e[0]:e;V=l;const{reason:o,details:d}=Te(t,a);y("update:modelValue",l,o,d)}function oe(e){const t=H.value[0]!==void 0&&H.value[0].dateHash!==null?{...H.value[0]}:{...i.value};Ie(()=>{t.year=i.value.year,t.month=i.value.month;const a=n.calendar!=="persian"?new Date(t.year,t.month,0).getDate():be(t.year,t.month);t.day=Math.min(Math.max(1,t.day),a);const l=p(t);V=l;const{details:o}=Te("",t);y("update:modelValue",l,e,o)})}function Te(e,t){return t.from!==void 0?{reason:`${e}-range`,details:{...$(t.target),from:$(t.from),to:$(t.to)}}:{reason:`${e}-day`,details:$(t)}}function p(e,t,a){return e.from!==void 0?{from:de.value(e.from,t,a),to:de.value(e.to,t,a)}:de.value(e,t,a)}function ye(e){let t;if(n.multiple===!0)if(e.from!==void 0){const a=I(e.from),l=I(e.to),o=H.value.filter(r=>r.dateHash<a||r.dateHash>l),d=Q.value.filter(({from:r,to:s})=>s.dateHash<a||r.dateHash>l);t=o.concat(d).concat(e).map(r=>p(r))}else{const a=ce.value.slice();a.push(p(e)),t=a}else t=p(e);Oe(t,"add",e)}function ge(e){if(n.noUnset===!0)return;let t=null;if(n.multiple===!0&&Array.isArray(n.modelValue)===!0){const a=p(e);e.from!==void 0?t=n.modelValue.filter(l=>l.from!==void 0?l.from!==a.from&&l.to!==a.to:!0):t=n.modelValue.filter(l=>l!==a),t.length===0&&(t=null)}Oe(t,"remove",e)}function Fe(e,t,a){const l=H.value.concat(Q.value).map(o=>p(o,e,t)).filter(o=>o.from!==void 0?o.from.dateHash!==null&&o.to.dateHash!==null:o.dateHash!==null);y("update:modelValue",(n.multiple===!0?l:l[0])||null,a)}function lt(){if(n.minimal!==!0)return u("div",{class:"q-date__header "+Y.value},[u("div",{class:"relative-position"},[u(X,{name:"q-transition--fade"},()=>u("div",{key:"h-yr-"+qe.value,class:"q-date__header-subtitle q-date__header-link "+(q.value==="Years"?"q-date__header-link--active":"cursor-pointer"),tabindex:f.value,...b("vY",{onClick(){q.value="Years"},onKeyup(e){e.keyCode===13&&(q.value="Years")}})},[qe.value]))]),u("div",{class:"q-date__header-title relative-position flex no-wrap"},[u("div",{class:"relative-position col"},[u(X,{name:"q-transition--fade"},()=>u("div",{key:"h-sub"+De.value,class:"q-date__header-title-label q-date__header-link "+(q.value==="Calendar"?"q-date__header-link--active":"cursor-pointer"),tabindex:f.value,...b("vC",{onClick(){q.value="Calendar"},onKeyup(e){e.keyCode===13&&(q.value="Calendar")}})},[De.value]))]),n.todayBtn===!0?u(T,{class:"q-date__header-today self-start",icon:_.iconSet.datetime.today,flat:!0,size:"sm",round:!0,tabindex:f.value,onClick:He}):null])])}function _e({label:e,type:t,key:a,dir:l,goTo:o,boundaries:d,cls:r}){return[u("div",{class:"row items-center q-date__arrow"},[u(T,{round:!0,dense:!0,size:"sm",flat:!0,icon:ne.value[0],tabindex:f.value,disable:d.prev===!1,...b("go-#"+t,{onClick(){o(-1)}})})]),u("div",{class:"relative-position overflow-hidden flex flex-center"+r},[u(X,{name:"q-transition--jump-"+l},()=>u("div",{key:a},[u(T,{flat:!0,dense:!0,noCaps:!0,label:e,tabindex:f.value,...b("view#"+t,{onClick:()=>{q.value=t}})})]))]),u("div",{class:"row items-center q-date__arrow"},[u(T,{round:!0,dense:!0,size:"sm",flat:!0,icon:ne.value[1],tabindex:f.value,disable:d.next===!1,...b("go+#"+t,{onClick(){o(1)}})})])]}const ot={Calendar:()=>[u("div",{key:"calendar-view",class:"q-date__view q-date__calendar"},[u("div",{class:"q-date__navigation row items-center no-wrap"},_e({label:h.value.months[i.value.month-1],type:"Months",key:i.value.month,dir:Z.value,goTo:je,boundaries:ve.value.month,cls:" col"}).concat(_e({label:i.value.year,type:"Years",key:i.value.year,dir:ie.value,goTo:he,boundaries:ve.value.year,cls:""}))),u("div",{class:"q-date__calendar-weekdays row items-center no-wrap"},ze.value.map(e=>u("div",{class:"q-date__calendar-item"},[u("div",e)]))),u("div",{class:"q-date__calendar-days-container relative-position overflow-hidden"},[u(X,{name:"q-transition--slide-"+Z.value},()=>u("div",{key:C.value,class:"q-date__calendar-days fit"},ke.value.map(e=>u("div",{class:e.classes},[e.in===!0?u(T,{class:e.today===!0?"q-date__today":"",dense:!0,flat:e.flat,unelevated:e.unelevated,color:e.color,textColor:e.textColor,label:e.i,tabindex:f.value,...b("day#"+e.i,{onClick:()=>{rt(e.i)},onMouseover:()=>{ut(e.i)}})},e.event!==!1?()=>u("div",{class:"q-date__event bg-"+e.event}):null):u("div",""+e.i)]))))])])],Months(){const e=i.value.year===O.value.year,t=l=>w.value!==null&&i.value.year===w.value.year&&w.value.month>l||x.value!==null&&i.value.year===x.value.year&&x.value.month<l,a=h.value.monthsShort.map((l,o)=>{const d=i.value.month===o+1;return u("div",{class:"q-date__months-item flex flex-center"},[u(T,{class:e===!0&&O.value.month===o+1?"q-date__today":null,flat:d!==!0,label:l,unelevated:d,color:d===!0?P.value:null,textColor:d===!0?R.value:null,tabindex:f.value,disable:t(o+1),...b("month#"+o,{onClick:()=>{at(o+1)}})})])});return n.yearsInMonthView===!0&&a.unshift(u("div",{class:"row no-wrap full-width"},[_e({label:i.value.year,type:"Years",key:i.value.year,dir:ie.value,goTo:he,boundaries:ve.value.year,cls:" col"})])),u("div",{key:"months-view",class:"q-date__view q-date__months flex flex-center"},a)},Years(){const e=ee.value,t=e+B,a=[],l=o=>w.value!==null&&w.value.year>o||x.value!==null&&x.value.year<o;for(let o=e;o<=t;o++){const d=i.value.year===o;a.push(u("div",{class:"q-date__years-item flex flex-center"},[u(T,{key:"yr"+o,class:O.value.year===o?"q-date__today":null,flat:!d,label:o,dense:!0,unelevated:d,color:d===!0?P.value:null,textColor:d===!0?R.value:null,tabindex:f.value,disable:l(o),...b("yr#"+o,{onClick:()=>{tt(o)}})})]))}return u("div",{class:"q-date__view q-date__years flex flex-center"},[u("div",{class:"col-auto"},[u(T,{round:!0,dense:!0,flat:!0,icon:ne.value[0],tabindex:f.value,disable:l(e),...b("y-",{onClick:()=>{ee.value-=B}})})]),u("div",{class:"q-date__years-content col self-stretch row items-center"},a),u("div",{class:"col-auto"},[u(T,{round:!0,dense:!0,flat:!0,icon:ne.value[1],tabindex:f.value,disable:l(t),...b("y+",{onClick:()=>{ee.value+=B}})})])])}};function rt(e){const t={...i.value,day:e};if(n.range===!1){nt(t,C.value);return}if(D.value===null){const a=ke.value.find(o=>o.fill!==!0&&o.i===e);if(n.noUnset!==!0&&a.range!==void 0){ge({target:t,from:a.range.from,to:a.range.to});return}if(a.selected===!0){ge(t);return}const l=I(t);D.value={init:t,initHash:l,final:t,finalHash:l},y("rangeStart",$(t))}else{const a=D.value.initHash,l=I(t),o=a<=l?{from:D.value.init,to:t}:{from:t,to:D.value.init};D.value=null,ye(a===l?t:{target:t,...o}),y("rangeEnd",{from:$(o.from),to:$(o.to)})}}function ut(e){if(D.value!==null){const t={...i.value,day:e};Object.assign(D.value,{final:t,finalHash:I(t)})}}return Object.assign(M,{setToday:He,setView:Xe,offsetCalendar:Ze,setCalendarTo:fe,setEditingRange:et}),()=>{const e=[u("div",{class:"q-date__content col relative-position"},[u(X,{name:"q-transition--fade"},ot[q.value])])],t=ft(g.default);return t!==void 0&&e.push(u("div",{class:"q-date__actions"},t)),n.name!==void 0&&n.disable!==!0&&ue(e,"push"),u("div",{class:Qe.value,...Ge.value},[lt(),u("div",{ref:W,class:"q-date__main col column",tabindex:-1},e)])}}}),Bt=Be({name:"QPopupProxy",props:{...kt,breakpoint:{type:[String,Number],default:450}},emits:["show","hide"],setup(n,{slots:g,emit:y,attrs:M}){const{proxy:_}=Ae(),{$q:N}=_,b=k(!1),f=k(null),Y=c(()=>parseInt(n.breakpoint,10)),{canShow:j}=Ht({showing:b});function S(){return N.screen.width<Y.value||N.screen.height<Y.value?"dialog":"menu"}const V=k(S()),re=c(()=>V.value==="menu"?{maxHeight:"99vh"}:{});K(()=>S(),m=>{b.value!==!0&&(V.value=m)});function ue(m){b.value=!0,y("show",m)}function W(m){b.value=!1,V.value=S(),y("hide",m)}return Object.assign(_,{show(m){j(m)===!0&&f.value.show(m)},hide(m){f.value.hide(m)},toggle(m){f.value.toggle(m)}}),ht(_,"currentComponent",()=>({type:V.value,ref:f.value})),()=>{const m={ref:f,...re.value,...M,onShow:ue,onHide:W};let h;return V.value==="dialog"?h=yt:(h=St,Object.assign(m,{target:n.target,contextMenu:n.contextMenu,noParentEvent:!0,separateClosePopup:!0})),u(h,m,g.default)}}});function $e(n){if(n===!1)return 0;if(n===!0||n===void 0)return 1;const g=parseInt(n,10);return isNaN(g)?0:g}var At=gt({name:"close-popup",beforeMount(n,{value:g}){const y={depth:$e(g),handler(M){y.depth!==0&&setTimeout(()=>{const _=_t(n);_!==void 0&&bt(_,M,y.depth)})},handlerKey(M){wt(M,13)===!0&&y.handler(M)}};n.__qclosepopup=y,n.addEventListener("click",y.handler),n.addEventListener("keyup",y.handlerKey)},updated(n,{value:g,oldValue:y}){g!==y&&(n.__qclosepopup.depth=$e(g))},beforeUnmount(n){const g=n.__qclosepopup;n.removeEventListener("click",g.handler),n.removeEventListener("keyup",g.handlerKey),delete n.__qclosepopup}});export{At as C,Bt as Q,$t as a};
