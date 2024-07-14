import{a as c,c as Ae,av as st,ad as ct,af as dt,b0 as vt,t as k,aJ as ft,w as K,h as u,ab as Z,d as mt,g as Ne,b1 as ht,G as Ie,Q as T,aL as yt,Z as gt,b2 as bt,b3 as _t,b4 as wt,ah as xt}from"./index.14b6a7f2.js";import{u as Dt}from"./use-render-cache.3aae9b27.js";import{t as qt,a as Ee,f as Mt,g as Ct,j as _e,_ as kt}from"./date.875b71d7.js";import{g as A,h as Ht,d as St,Q as Vt}from"./format.107b7fed.js";const Yt=["gregorian","persian"],Pe={mask:{type:String},locale:Object,calendar:{type:String,validator:a=>Yt.includes(a),default:"gregorian"},landscape:Boolean,color:String,textColor:String,square:Boolean,flat:Boolean,bordered:Boolean,readonly:Boolean,disable:Boolean},jt=["update:modelValue"];function I(a){return a.year+"/"+A(a.month)+"/"+A(a.day)}function Ot(a,g){const y=c(()=>a.disable!==!0&&a.readonly!==!0),M=c(()=>y.value===!0?0:-1),b=c(()=>{const f=[];return a.color!==void 0&&f.push(`bg-${a.color}`),a.textColor!==void 0&&f.push(`text-${a.textColor}`),f.join(" ")});function N(){return a.locale!==void 0?{...g.lang.date,...a.locale}:g.lang.date}function _(f){const Y=new Date,j=f===!0?null:0;if(a.calendar==="persian"){const S=qt(Y);return{year:S.jy,month:S.jm,day:S.jd}}return{year:Y.getFullYear(),month:Y.getMonth()+1,day:Y.getDate(),hour:j,minute:j,second:j,millisecond:j}}return{editable:y,tabindex:M,headerClass:b,getLocale:N,getCurrentDate:_}}const $=20,Tt=["Calendar","Years","Months"],Be=a=>Tt.includes(a),we=a=>/^-?[\d]+\/[0-1]\d$/.test(a),z=" \u2014 ";function E(a){return a.year+"/"+A(a.month)}var Bt=Ae({name:"QDate",props:{...Pe,...st,...ct,modelValue:{required:!0,validator:a=>typeof a=="string"||Array.isArray(a)===!0||Object(a)===a||a===null},multiple:Boolean,range:Boolean,title:String,subtitle:String,mask:{...Pe.mask,default:"YYYY/MM/DD"},defaultYearMonth:{type:String,validator:we},yearsInMonthView:Boolean,events:[Array,Function],eventColor:[String,Function],emitImmediately:Boolean,options:[Array,Function],navigationMinYearMonth:{type:String,validator:we},navigationMaxYearMonth:{type:String,validator:we},noUnset:Boolean,firstDayOfWeek:[String,Number],todayBtn:Boolean,minimal:Boolean,defaultView:{type:String,default:"Calendar",validator:Be}},emits:[...jt,"rangeStart","rangeEnd","navigation"],setup(a,{slots:g,emit:y}){const{proxy:M}=Ne(),{$q:b}=M,N=dt(a,b),{getCache:_}=Dt(),{tabindex:f,headerClass:Y,getLocale:j,getCurrentDate:S}=Ot(a,b);let V;const re=vt(a),ue=ht(re),W=k(null),m=k(Se()),h=k(j()),Re=c(()=>Se()),Le=c(()=>j()),O=c(()=>S()),i=k(Ve(m.value,h.value)),q=k(a.defaultView),xe=c(()=>b.lang.rtl===!0?"right":"left"),X=k(xe.value),ie=k(xe.value),se=i.value.year,ee=k(se-se%$-(se<0?$:0)),D=k(null),Qe=c(()=>{const e=a.landscape===!0?"landscape":"portrait";return`q-date q-date--${e} q-date--${e}-${a.minimal===!0?"minimal":"standard"}`+(N.value===!0?" q-date--dark q-dark":"")+(a.bordered===!0?" q-date--bordered":"")+(a.square===!0?" q-date--square no-border-radius":"")+(a.flat===!0?" q-date--flat no-shadow":"")+(a.disable===!0?" disabled":a.readonly===!0?" q-date--readonly":"")}),P=c(()=>a.color||"primary"),R=c(()=>a.textColor||"white"),te=c(()=>a.emitImmediately===!0&&a.multiple!==!0&&a.range!==!0),ce=c(()=>Array.isArray(a.modelValue)===!0?a.modelValue:a.modelValue!==null&&a.modelValue!==void 0?[a.modelValue]:[]),H=c(()=>ce.value.filter(e=>typeof e=="string").map(e=>me(e,m.value,h.value)).filter(e=>e.dateHash!==null&&e.day!==null&&e.month!==null&&e.year!==null)),L=c(()=>{const e=t=>me(t,m.value,h.value);return ce.value.filter(t=>ft(t)===!0&&t.from!==void 0&&t.to!==void 0).map(t=>({from:e(t.from),to:e(t.to)})).filter(t=>t.from.dateHash!==null&&t.to.dateHash!==null&&t.from.dateHash<t.to.dateHash)}),ae=c(()=>a.calendar!=="persian"?e=>new Date(e.year,e.month-1,e.day):e=>{const t=Ee(e.year,e.month,e.day);return new Date(t.gy,t.gm-1,t.gd)}),de=c(()=>a.calendar==="persian"?I:(e,t,n)=>Mt(new Date(e.year,e.month-1,e.day,e.hour,e.minute,e.second,e.millisecond),t===void 0?m.value:t,n===void 0?h.value:n,e.year,e.timezoneOffset)),J=c(()=>H.value.length+L.value.reduce((e,t)=>e+1+Ct(ae.value(t.to),ae.value(t.from)),0)),De=c(()=>{if(a.title!==void 0&&a.title!==null&&a.title.length!==0)return a.title;if(D.value!==null){const n=D.value.init,l=ae.value(n);return h.value.daysShort[l.getDay()]+", "+h.value.monthsShort[n.month-1]+" "+n.day+z+"?"}if(J.value===0)return z;if(J.value>1)return`${J.value} ${h.value.pluralDay}`;const e=H.value[0],t=ae.value(e);return isNaN(t.valueOf())===!0?z:h.value.headerTitle!==void 0?h.value.headerTitle(t,e):h.value.daysShort[t.getDay()]+", "+h.value.monthsShort[e.month-1]+" "+e.day}),pe=c(()=>H.value.concat(L.value.map(t=>t.from)).sort((t,n)=>t.year-n.year||t.month-n.month)[0]),ze=c(()=>H.value.concat(L.value.map(t=>t.to)).sort((t,n)=>n.year-t.year||n.month-t.month)[0]),qe=c(()=>{if(a.subtitle!==void 0&&a.subtitle!==null&&a.subtitle.length!==0)return a.subtitle;if(J.value===0)return z;if(J.value>1){const e=pe.value,t=ze.value,n=h.value.monthsShort;return n[e.month-1]+(e.year!==t.year?" "+e.year+z+n[t.month-1]+" ":e.month!==t.month?z+n[t.month-1]:"")+" "+t.year}return H.value[0].year}),ne=c(()=>{const e=[b.iconSet.datetime.arrowLeft,b.iconSet.datetime.arrowRight];return b.lang.rtl===!0?e.reverse():e}),Me=c(()=>a.firstDayOfWeek!==void 0?Number(a.firstDayOfWeek):h.value.firstDayOfWeek),Ke=c(()=>{const e=h.value.daysShort,t=Me.value;return t>0?e.slice(t,7).concat(e.slice(0,t)):e}),F=c(()=>{const e=i.value;return a.calendar!=="persian"?new Date(e.year,e.month,0).getDate():_e(e.year,e.month)}),We=c(()=>typeof a.eventColor=="function"?a.eventColor:()=>a.eventColor),w=c(()=>{if(a.navigationMinYearMonth===void 0)return null;const e=a.navigationMinYearMonth.split("/");return{year:parseInt(e[0],10),month:parseInt(e[1],10)}}),x=c(()=>{if(a.navigationMaxYearMonth===void 0)return null;const e=a.navigationMaxYearMonth.split("/");return{year:parseInt(e[0],10),month:parseInt(e[1],10)}}),ve=c(()=>{const e={month:{prev:!0,next:!0},year:{prev:!0,next:!0}};return w.value!==null&&w.value.year>=i.value.year&&(e.year.prev=!1,w.value.year===i.value.year&&w.value.month>=i.value.month&&(e.month.prev=!1)),x.value!==null&&x.value.year<=i.value.year&&(e.year.next=!1,x.value.year===i.value.year&&x.value.month<=i.value.month&&(e.month.next=!1)),e}),le=c(()=>{const e={};return H.value.forEach(t=>{const n=E(t);e[n]===void 0&&(e[n]=[]),e[n].push(t.day)}),e}),Ce=c(()=>{const e={};return L.value.forEach(t=>{const n=E(t.from),l=E(t.to);if(e[n]===void 0&&(e[n]=[]),e[n].push({from:t.from.day,to:n===l?t.to.day:void 0,range:t}),n<l){let o;const{year:d,month:r}=t.from,s=r<12?{year:d,month:r+1}:{year:d+1,month:1};for(;(o=E(s))<=l;)e[o]===void 0&&(e[o]=[]),e[o].push({from:void 0,to:o===l?t.to.day:void 0,range:t}),s.month++,s.month>12&&(s.year++,s.month=1)}}),e}),U=c(()=>{if(D.value===null)return;const{init:e,initHash:t,final:n,finalHash:l}=D.value,[o,d]=t<=l?[e,n]:[n,e],r=E(o),s=E(d);if(r!==C.value&&s!==C.value)return;const v={};return r===C.value?(v.from=o.day,v.includeFrom=!0):v.from=1,s===C.value?(v.to=d.day,v.includeTo=!0):v.to=F.value,v}),C=c(()=>E(i.value)),Je=c(()=>{const e={};if(a.options===void 0){for(let n=1;n<=F.value;n++)e[n]=!0;return e}const t=typeof a.options=="function"?a.options:n=>a.options.includes(n);for(let n=1;n<=F.value;n++){const l=C.value+"/"+A(n);e[n]=t(l)}return e}),Ue=c(()=>{const e={};if(a.events===void 0)for(let t=1;t<=F.value;t++)e[t]=!1;else{const t=typeof a.events=="function"?a.events:n=>a.events.includes(n);for(let n=1;n<=F.value;n++){const l=C.value+"/"+A(n);e[n]=t(l)===!0&&We.value(l)}}return e}),Ge=c(()=>{let e,t;const{year:n,month:l}=i.value;if(a.calendar!=="persian")e=new Date(n,l-1,1),t=new Date(n,l-1,0).getDate();else{const o=Ee(n,l,1);e=new Date(o.gy,o.gm-1,o.gd);let d=l-1,r=n;d===0&&(d=12,r--),t=_e(r,d)}return{days:e.getDay()-Me.value-1,endDay:t}}),ke=c(()=>{const e=[],{days:t,endDay:n}=Ge.value,l=t<0?t+7:t;if(l<6)for(let r=n-l;r<=n;r++)e.push({i:r,fill:!0});const o=e.length;for(let r=1;r<=F.value;r++){const s={i:r,event:Ue.value[r],classes:[]};Je.value[r]===!0&&(s.in=!0,s.flat=!0),e.push(s)}if(le.value[C.value]!==void 0&&le.value[C.value].forEach(r=>{const s=o+r-1;Object.assign(e[s],{selected:!0,unelevated:!0,flat:!1,color:P.value,textColor:R.value})}),Ce.value[C.value]!==void 0&&Ce.value[C.value].forEach(r=>{if(r.from!==void 0){const s=o+r.from-1,v=o+(r.to||F.value)-1;for(let G=s;G<=v;G++)Object.assign(e[G],{range:r.range,unelevated:!0,color:P.value,textColor:R.value});Object.assign(e[s],{rangeFrom:!0,flat:!1}),r.to!==void 0&&Object.assign(e[v],{rangeTo:!0,flat:!1})}else if(r.to!==void 0){const s=o+r.to-1;for(let v=o;v<=s;v++)Object.assign(e[v],{range:r.range,unelevated:!0,color:P.value,textColor:R.value});Object.assign(e[s],{flat:!1,rangeTo:!0})}else{const s=o+F.value-1;for(let v=o;v<=s;v++)Object.assign(e[v],{range:r.range,unelevated:!0,color:P.value,textColor:R.value})}}),U.value!==void 0){const r=o+U.value.from-1,s=o+U.value.to-1;for(let v=r;v<=s;v++)e[v].color=P.value,e[v].editRange=!0;U.value.includeFrom===!0&&(e[r].editRangeFrom=!0),U.value.includeTo===!0&&(e[s].editRangeTo=!0)}i.value.year===O.value.year&&i.value.month===O.value.month&&(e[o+O.value.day-1].today=!0);const d=e.length%7;if(d>0){const r=7-d;for(let s=1;s<=r;s++)e.push({i:s,fill:!0})}return e.forEach(r=>{let s="q-date__calendar-item ";r.fill===!0?s+="q-date__calendar-item--fill":(s+=`q-date__calendar-item--${r.in===!0?"in":"out"}`,r.range!==void 0&&(s+=` q-date__range${r.rangeTo===!0?"-to":r.rangeFrom===!0?"-from":""}`),r.editRange===!0&&(s+=` q-date__edit-range${r.editRangeFrom===!0?"-from":""}${r.editRangeTo===!0?"-to":""}`),(r.range!==void 0||r.editRange===!0)&&(s+=` text-${r.color}`)),r.classes=s}),e}),Ze=c(()=>a.disable===!0?{"aria-disabled":"true"}:{});K(()=>a.modelValue,e=>{if(V===e)V=0;else{const t=Ve(m.value,h.value);Q(t.year,t.month,t)}}),K(q,()=>{W.value!==null&&M.$el.contains(document.activeElement)===!0&&W.value.focus()}),K(()=>i.value.year+"|"+i.value.month,()=>{y("navigation",{year:i.value.year,month:i.value.month})}),K(Re,e=>{Fe(e,h.value,"mask"),m.value=e}),K(Le,e=>{Fe(m.value,e,"locale"),h.value=e});function He(){const{year:e,month:t,day:n}=O.value,l={...i.value,year:e,month:t,day:n},o=le.value[E(l)];(o===void 0||o.includes(l.day)===!1)&&ye(l),fe(l.year,l.month)}function Xe(e){Be(e)===!0&&(q.value=e)}function et(e,t){["month","year"].includes(e)&&(e==="month"?je:he)(t===!0?-1:1)}function fe(e,t){q.value="Calendar",Q(e,t)}function tt(e,t){if(a.range===!1||!e){D.value=null;return}const n=Object.assign({...i.value},e),l=t!==void 0?Object.assign({...i.value},t):n;D.value={init:n,initHash:I(n),final:l,finalHash:I(l)},fe(n.year,n.month)}function Se(){return a.calendar==="persian"?"YYYY/MM/DD":a.mask}function me(e,t,n){return kt(e,t,n,a.calendar,{hour:0,minute:0,second:0,millisecond:0})}function Ve(e,t){const n=Array.isArray(a.modelValue)===!0?a.modelValue:a.modelValue?[a.modelValue]:[];if(n.length===0)return Ye();const l=n[n.length-1],o=me(l.from!==void 0?l.from:l,e,t);return o.dateHash===null?Ye():o}function Ye(){let e,t;if(a.defaultYearMonth!==void 0){const n=a.defaultYearMonth.split("/");e=parseInt(n[0],10),t=parseInt(n[1],10)}else{const n=O.value!==void 0?O.value:S();e=n.year,t=n.month}return{year:e,month:t,day:1,hour:0,minute:0,second:0,millisecond:0,dateHash:e+"/"+A(t)+"/01"}}function je(e){let t=i.value.year,n=Number(i.value.month)+e;n===13?(n=1,t++):n===0&&(n=12,t--),Q(t,n),te.value===!0&&oe("month")}function he(e){const t=Number(i.value.year)+e;Q(t,i.value.month),te.value===!0&&oe("year")}function at(e){Q(e,i.value.month),q.value=a.defaultView==="Years"?"Months":"Calendar",te.value===!0&&oe("year")}function nt(e){Q(i.value.year,e),q.value="Calendar",te.value===!0&&oe("month")}function lt(e,t){const n=le.value[t];(n!==void 0&&n.includes(e.day)===!0?ge:ye)(e)}function B(e){return{year:e.year,month:e.month,day:e.day}}function Q(e,t,n){if(w.value!==null&&e<=w.value.year&&((t<w.value.month||e<w.value.year)&&(t=w.value.month),e=w.value.year),x.value!==null&&e>=x.value.year&&((t>x.value.month||e>x.value.year)&&(t=x.value.month),e=x.value.year),n!==void 0){const{hour:o,minute:d,second:r,millisecond:s,timezoneOffset:v,timeHash:G}=n;Object.assign(i.value,{hour:o,minute:d,second:r,millisecond:s,timezoneOffset:v,timeHash:G})}const l=e+"/"+A(t)+"/01";l!==i.value.dateHash&&(X.value=i.value.dateHash<l==(b.lang.rtl!==!0)?"left":"right",e!==i.value.year&&(ie.value=X.value),Ie(()=>{ee.value=e-e%$-(e<0?$:0),Object.assign(i.value,{year:e,month:t,day:1,dateHash:l})}))}function Oe(e,t,n){const l=e!==null&&e.length===1&&a.multiple===!1?e[0]:e;V=l;const{reason:o,details:d}=Te(t,n);y("update:modelValue",l,o,d)}function oe(e){const t=H.value[0]!==void 0&&H.value[0].dateHash!==null?{...H.value[0]}:{...i.value};Ie(()=>{t.year=i.value.year,t.month=i.value.month;const n=a.calendar!=="persian"?new Date(t.year,t.month,0).getDate():_e(t.year,t.month);t.day=Math.min(Math.max(1,t.day),n);const l=p(t);V=l;const{details:o}=Te("",t);y("update:modelValue",l,e,o)})}function Te(e,t){return t.from!==void 0?{reason:`${e}-range`,details:{...B(t.target),from:B(t.from),to:B(t.to)}}:{reason:`${e}-day`,details:B(t)}}function p(e,t,n){return e.from!==void 0?{from:de.value(e.from,t,n),to:de.value(e.to,t,n)}:de.value(e,t,n)}function ye(e){let t;if(a.multiple===!0)if(e.from!==void 0){const n=I(e.from),l=I(e.to),o=H.value.filter(r=>r.dateHash<n||r.dateHash>l),d=L.value.filter(({from:r,to:s})=>s.dateHash<n||r.dateHash>l);t=o.concat(d).concat(e).map(r=>p(r))}else{const n=ce.value.slice();n.push(p(e)),t=n}else t=p(e);Oe(t,"add",e)}function ge(e){if(a.noUnset===!0)return;let t=null;if(a.multiple===!0&&Array.isArray(a.modelValue)===!0){const n=p(e);e.from!==void 0?t=a.modelValue.filter(l=>l.from!==void 0?l.from!==n.from&&l.to!==n.to:!0):t=a.modelValue.filter(l=>l!==n),t.length===0&&(t=null)}Oe(t,"remove",e)}function Fe(e,t,n){const l=H.value.concat(L.value).map(o=>p(o,e,t)).filter(o=>o.from!==void 0?o.from.dateHash!==null&&o.to.dateHash!==null:o.dateHash!==null);y("update:modelValue",(a.multiple===!0?l:l[0])||null,n)}function ot(){if(a.minimal!==!0)return u("div",{class:"q-date__header "+Y.value},[u("div",{class:"relative-position"},[u(Z,{name:"q-transition--fade"},()=>u("div",{key:"h-yr-"+qe.value,class:"q-date__header-subtitle q-date__header-link "+(q.value==="Years"?"q-date__header-link--active":"cursor-pointer"),tabindex:f.value,..._("vY",{onClick(){q.value="Years"},onKeyup(e){e.keyCode===13&&(q.value="Years")}})},[qe.value]))]),u("div",{class:"q-date__header-title relative-position flex no-wrap"},[u("div",{class:"relative-position col"},[u(Z,{name:"q-transition--fade"},()=>u("div",{key:"h-sub"+De.value,class:"q-date__header-title-label q-date__header-link "+(q.value==="Calendar"?"q-date__header-link--active":"cursor-pointer"),tabindex:f.value,..._("vC",{onClick(){q.value="Calendar"},onKeyup(e){e.keyCode===13&&(q.value="Calendar")}})},[De.value]))]),a.todayBtn===!0?u(T,{class:"q-date__header-today self-start",icon:b.iconSet.datetime.today,flat:!0,size:"sm",round:!0,tabindex:f.value,onClick:He}):null])])}function be({label:e,type:t,key:n,dir:l,goTo:o,boundaries:d,cls:r}){return[u("div",{class:"row items-center q-date__arrow"},[u(T,{round:!0,dense:!0,size:"sm",flat:!0,icon:ne.value[0],tabindex:f.value,disable:d.prev===!1,..._("go-#"+t,{onClick(){o(-1)}})})]),u("div",{class:"relative-position overflow-hidden flex flex-center"+r},[u(Z,{name:"q-transition--jump-"+l},()=>u("div",{key:n},[u(T,{flat:!0,dense:!0,noCaps:!0,label:e,tabindex:f.value,..._("view#"+t,{onClick:()=>{q.value=t}})})]))]),u("div",{class:"row items-center q-date__arrow"},[u(T,{round:!0,dense:!0,size:"sm",flat:!0,icon:ne.value[1],tabindex:f.value,disable:d.next===!1,..._("go+#"+t,{onClick(){o(1)}})})])]}const rt={Calendar:()=>[u("div",{key:"calendar-view",class:"q-date__view q-date__calendar"},[u("div",{class:"q-date__navigation row items-center no-wrap"},be({label:h.value.months[i.value.month-1],type:"Months",key:i.value.month,dir:X.value,goTo:je,boundaries:ve.value.month,cls:" col"}).concat(be({label:i.value.year,type:"Years",key:i.value.year,dir:ie.value,goTo:he,boundaries:ve.value.year,cls:""}))),u("div",{class:"q-date__calendar-weekdays row items-center no-wrap"},Ke.value.map(e=>u("div",{class:"q-date__calendar-item"},[u("div",e)]))),u("div",{class:"q-date__calendar-days-container relative-position overflow-hidden"},[u(Z,{name:"q-transition--slide-"+X.value},()=>u("div",{key:C.value,class:"q-date__calendar-days fit"},ke.value.map(e=>u("div",{class:e.classes},[e.in===!0?u(T,{class:e.today===!0?"q-date__today":"",dense:!0,flat:e.flat,unelevated:e.unelevated,color:e.color,textColor:e.textColor,label:e.i,tabindex:f.value,..._("day#"+e.i,{onClick:()=>{ut(e.i)},onMouseover:()=>{it(e.i)}})},e.event!==!1?()=>u("div",{class:"q-date__event bg-"+e.event}):null):u("div",""+e.i)]))))])])],Months(){const e=i.value.year===O.value.year,t=l=>w.value!==null&&i.value.year===w.value.year&&w.value.month>l||x.value!==null&&i.value.year===x.value.year&&x.value.month<l,n=h.value.monthsShort.map((l,o)=>{const d=i.value.month===o+1;return u("div",{class:"q-date__months-item flex flex-center"},[u(T,{class:e===!0&&O.value.month===o+1?"q-date__today":null,flat:d!==!0,label:l,unelevated:d,color:d===!0?P.value:null,textColor:d===!0?R.value:null,tabindex:f.value,disable:t(o+1),..._("month#"+o,{onClick:()=>{nt(o+1)}})})])});return a.yearsInMonthView===!0&&n.unshift(u("div",{class:"row no-wrap full-width"},[be({label:i.value.year,type:"Years",key:i.value.year,dir:ie.value,goTo:he,boundaries:ve.value.year,cls:" col"})])),u("div",{key:"months-view",class:"q-date__view q-date__months flex flex-center"},n)},Years(){const e=ee.value,t=e+$,n=[],l=o=>w.value!==null&&w.value.year>o||x.value!==null&&x.value.year<o;for(let o=e;o<=t;o++){const d=i.value.year===o;n.push(u("div",{class:"q-date__years-item flex flex-center"},[u(T,{key:"yr"+o,class:O.value.year===o?"q-date__today":null,flat:!d,label:o,dense:!0,unelevated:d,color:d===!0?P.value:null,textColor:d===!0?R.value:null,tabindex:f.value,disable:l(o),..._("yr#"+o,{onClick:()=>{at(o)}})})]))}return u("div",{class:"q-date__view q-date__years flex flex-center"},[u("div",{class:"col-auto"},[u(T,{round:!0,dense:!0,flat:!0,icon:ne.value[0],tabindex:f.value,disable:l(e),..._("y-",{onClick:()=>{ee.value-=$}})})]),u("div",{class:"q-date__years-content col self-stretch row items-center"},n),u("div",{class:"col-auto"},[u(T,{round:!0,dense:!0,flat:!0,icon:ne.value[1],tabindex:f.value,disable:l(t),..._("y+",{onClick:()=>{ee.value+=$}})})])])}};function ut(e){const t={...i.value,day:e};if(a.range===!1){lt(t,C.value);return}if(D.value===null){const n=ke.value.find(o=>o.fill!==!0&&o.i===e);if(a.noUnset!==!0&&n.range!==void 0){ge({target:t,from:n.range.from,to:n.range.to});return}if(n.selected===!0){ge(t);return}const l=I(t);D.value={init:t,initHash:l,final:t,finalHash:l},y("rangeStart",B(t))}else{const n=D.value.initHash,l=I(t),o=n<=l?{from:D.value.init,to:t}:{from:t,to:D.value.init};D.value=null,ye(n===l?t:{target:t,...o}),y("rangeEnd",{from:B(o.from),to:B(o.to)})}}function it(e){if(D.value!==null){const t={...i.value,day:e};Object.assign(D.value,{final:t,finalHash:I(t)})}}return Object.assign(M,{setToday:He,setView:Xe,offsetCalendar:et,setCalendarTo:fe,setEditingRange:tt}),()=>{const e=[u("div",{class:"q-date__content col relative-position"},[u(Z,{name:"q-transition--fade"},rt[q.value])])],t=mt(g.default);return t!==void 0&&e.push(u("div",{class:"q-date__actions"},t)),a.name!==void 0&&a.disable!==!0&&ue(e,"push"),u("div",{class:Qe.value,...Ze.value},[ot(),u("div",{ref:W,class:"q-date__main col column",tabindex:-1},e)])}}}),$t=Ae({name:"QPopupProxy",props:{...Ht,breakpoint:{type:[String,Number],default:450}},emits:["show","hide"],setup(a,{slots:g,emit:y,attrs:M}){const{proxy:b}=Ne(),{$q:N}=b,_=k(!1),f=k(null),Y=c(()=>parseInt(a.breakpoint,10)),{canShow:j}=St({showing:_});function S(){return N.screen.width<Y.value||N.screen.height<Y.value?"dialog":"menu"}const V=k(S()),re=c(()=>V.value==="menu"?{maxHeight:"99vh"}:{});K(()=>S(),m=>{_.value!==!0&&(V.value=m)});function ue(m){_.value=!0,y("show",m)}function W(m){_.value=!1,V.value=S(),y("hide",m)}return Object.assign(b,{show(m){j(m)===!0&&f.value.show(m)},hide(m){f.value.hide(m)},toggle(m){f.value.toggle(m)}}),yt(b,"currentComponent",()=>({type:V.value,ref:f.value})),()=>{const m={ref:f,...re.value,...M,onShow:ue,onHide:W};let h;return V.value==="dialog"?h=gt:(h=Vt,Object.assign(m,{target:a.target,contextMenu:a.contextMenu,noParentEvent:!0,separateClosePopup:!0})),u(h,m,g.default)}}});function $e(a){if(a===!1)return 0;if(a===!0||a===void 0)return 1;const g=parseInt(a,10);return isNaN(g)?0:g}var At=bt({name:"close-popup",beforeMount(a,{value:g}){const y={depth:$e(g),handler(M){y.depth!==0&&setTimeout(()=>{const b=_t(a);b!==void 0&&wt(b,M,y.depth)})},handlerKey(M){xt(M,13)===!0&&y.handler(M)}};a.__qclosepopup=y,a.addEventListener("click",y.handler),a.addEventListener("keyup",y.handlerKey)},updated(a,{value:g,oldValue:y}){g!==y&&(a.__qclosepopup.depth=$e(g))},beforeUnmount(a){const g=a.__qclosepopup;a.removeEventListener("click",g.handler),a.removeEventListener("keyup",g.handlerKey),delete a.__qclosepopup}});export{At as C,$t as Q,Bt as a,jt as b,Ot as c,I as g,Pe as u};
