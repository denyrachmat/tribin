import{c as z,a as C,h as S,d as H,g as B,b2 as j,b3 as J,aM as E}from"./index.646ce5e8.js";import{k as f,t as W}from"./use-dialog-plugin-component.bf35631f.js";var $e=z({name:"QTr",props:{props:Object,noHover:Boolean},setup(e,{slots:t}){const a=C(()=>"q-tr"+(e.props===void 0||e.props.header===!0?"":" "+e.props.__trClass)+(e.noHover===!0?" q-tr--no-hover":""));return()=>S("tr",{class:a.value},H(t.default))}}),Oe=z({name:"QTd",props:{props:Object,autoWidth:Boolean,noHover:Boolean},setup(e,{slots:t}){const a=B(),n=C(()=>"q-td"+(e.autoWidth===!0?" q-table--col-auto-width":"")+(e.noHover===!0?" q-td--no-hover":"")+" ");return()=>{if(e.props===void 0)return S("td",{class:n.value},H(t.default));const s=a.vnode.key,r=(e.props.colsMap!==void 0?e.props.colsMap[s]:null)||e.props.col;if(r===void 0)return;const{row:c}=e.props;return S("td",{class:n.value+r.__tdClass(c),style:r.__tdStyle(c)},H(t.default))}}});const m=[-61,9,38,199,426,686,756,818,1111,1181,1210,1635,2060,2097,2192,2262,2324,2394,2456,3178];function Ie(e,t,a){return Object.prototype.toString.call(e)==="[object Date]"&&(a=e.getDate(),t=e.getMonth()+1,e=e.getFullYear()),K(T(e,t,a))}function Te(e,t,a){return A(V(e,t,a))}function P(e){return G(e)===0}function R(e,t){return t<=6?31:t<=11||P(e)?30:29}function G(e){const t=m.length;let a=m[0],n,s,r,c,o;if(e<a||e>=m[t-1])throw new Error("Invalid Jalaali year "+e);for(o=1;o<t&&(n=m[o],s=n-a,!(e<n));o+=1)a=n;return c=e-a,s-c<6&&(c=c-s+d(s+4,33)*33),r=h(h(c+1,33)-1,4),r===-1&&(r=4),r}function Q(e,t){const a=m.length,n=e+621;let s=-14,r=m[0],c,o,i,g,u;if(e<r||e>=m[a-1])throw new Error("Invalid Jalaali year "+e);for(u=1;u<a&&(c=m[u],o=c-r,!(e<c));u+=1)s=s+d(o,33)*8+d(h(o,33),4),r=c;g=e-r,s=s+d(g,33)*8+d(h(g,33)+3,4),h(o,33)===4&&o-g===4&&(s+=1);const l=d(n,4)-d((d(n,100)+1)*3,4)-150,y=20+s-l;return t||(o-g<6&&(g=g-o+d(o+4,33)*33),i=h(h(g+1,33)-1,4),i===-1&&(i=4)),{leap:i,gy:n,march:y}}function V(e,t,a){const n=Q(e,!0);return T(n.gy,3,n.march)+(t-1)*31-d(t,7)*(t-7)+a-1}function K(e){const t=A(e).gy;let a=t-621,n,s,r;const c=Q(a,!1),o=T(t,3,c.march);if(r=e-o,r>=0){if(r<=185)return s=1+d(r,31),n=h(r,31)+1,{jy:a,jm:s,jd:n};r-=186}else a-=1,r+=179,c.leap===1&&(r+=1);return s=7+d(r,30),n=h(r,30)+1,{jy:a,jm:s,jd:n}}function T(e,t,a){let n=d((e+d(t-8,6)+100100)*1461,4)+d(153*h(t+9,12)+2,5)+a-34840408;return n=n-d(d(e+100100+d(t-8,6),100)*3,4)+752,n}function A(e){let t=4*e+139361631;t=t+d(d(4*e+183187720,146097)*3,4)*4-3908;const a=d(h(t,1461),4)*5+308,n=d(h(a,153),5)+1,s=h(d(a,153),12)+1;return{gy:d(t,1461)-100100+d(8-s,6),gm:s,gd:n}}function d(e,t){return~~(e/t)}function h(e,t){return e-~~(e/t)*t}const N=864e5,ee=36e5,$=6e4,k="YYYY-MM-DDTHH:mm:ss.SSSZ",te=/\[((?:[^\]\\]|\\]|\\)*)\]|d{1,4}|M{1,4}|m{1,2}|w{1,2}|Qo|Do|D{1,4}|YY(?:YY)?|H{1,2}|h{1,2}|s{1,2}|S{1,3}|Z{1,2}|a{1,2}|[AQExX]/g,ne=/(\[[^\]]*\])|d{1,4}|M{1,4}|m{1,2}|w{1,2}|Qo|Do|D{1,4}|YY(?:YY)?|H{1,2}|h{1,2}|s{1,2}|S{1,3}|Z{1,2}|a{1,2}|[AQExX]|([.*+:?^,\s${}()|\\]+)/g,Y={};function re(e,t){const a="("+t.days.join("|")+")",n=e+a;if(Y[n]!==void 0)return Y[n];const s="("+t.daysShort.join("|")+")",r="("+t.months.join("|")+")",c="("+t.monthsShort.join("|")+")",o={};let i=0;const g=e.replace(ne,l=>{switch(i++,l){case"YY":return o.YY=i,"(-?\\d{1,2})";case"YYYY":return o.YYYY=i,"(-?\\d{1,4})";case"M":return o.M=i,"(\\d{1,2})";case"MM":return o.M=i,"(\\d{2})";case"MMM":return o.MMM=i,c;case"MMMM":return o.MMMM=i,r;case"D":return o.D=i,"(\\d{1,2})";case"Do":return o.D=i++,"(\\d{1,2}(st|nd|rd|th))";case"DD":return o.D=i,"(\\d{2})";case"H":return o.H=i,"(\\d{1,2})";case"HH":return o.H=i,"(\\d{2})";case"h":return o.h=i,"(\\d{1,2})";case"hh":return o.h=i,"(\\d{2})";case"m":return o.m=i,"(\\d{1,2})";case"mm":return o.m=i,"(\\d{2})";case"s":return o.s=i,"(\\d{1,2})";case"ss":return o.s=i,"(\\d{2})";case"S":return o.S=i,"(\\d{1})";case"SS":return o.S=i,"(\\d{2})";case"SSS":return o.S=i,"(\\d{3})";case"A":return o.A=i,"(AM|PM)";case"a":return o.a=i,"(am|pm)";case"aa":return o.aa=i,"(a\\.m\\.|p\\.m\\.)";case"ddd":return s;case"dddd":return a;case"Q":case"d":case"E":return"(\\d{1})";case"Qo":return"(1st|2nd|3rd|4th)";case"DDD":case"DDDD":return"(\\d{1,3})";case"w":return"(\\d{1,2})";case"ww":return"(\\d{2})";case"Z":return o.Z=i,"(Z|[+-]\\d{2}:\\d{2})";case"ZZ":return o.ZZ=i,"(Z|[+-]\\d{2}\\d{2})";case"X":return o.X=i,"(-?\\d+)";case"x":return o.x=i,"(-?\\d{4,})";default:return i--,l[0]==="["&&(l=l.substring(1,l.length-1)),l.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}}),u={map:o,regex:new RegExp("^"+g)};return Y[n]=u,u}function L(e,t){return e!==void 0?e:t!==void 0?t.date:J.date}function Z(e,t=""){const a=e>0?"-":"+",n=Math.abs(e),s=Math.floor(n/60),r=n%60;return a+f(s)+t+f(r)}function ae(e,t,a){let n=e.getFullYear(),s=e.getMonth();const r=e.getDate();return t.year!==void 0&&(n+=a*t.year,delete t.year),t.month!==void 0&&(s+=a*t.month,delete t.month),e.setDate(1),e.setMonth(2),e.setFullYear(n),e.setMonth(s),e.setDate(Math.min(r,x(e))),t.date!==void 0&&(e.setDate(e.getDate()+a*t.date),delete t.date),e}function se(e,t,a){const n=t.year!==void 0?t.year:e[`get${a}FullYear`](),s=t.month!==void 0?t.month-1:e[`get${a}Month`](),r=new Date(n,s+1,0).getDate(),c=Math.min(r,t.date!==void 0?t.date:e[`get${a}Date`]());return e[`set${a}Date`](1),e[`set${a}Month`](2),e[`set${a}FullYear`](n),e[`set${a}Month`](s),e[`set${a}Date`](c),delete t.year,delete t.month,delete t.date,e}function b(e,t,a){const n=X(t),s=new Date(e),r=n.year!==void 0||n.month!==void 0||n.date!==void 0?ae(s,n,a):s;for(const c in n){const o=W(c);r[`set${o}`](r[`get${o}`]()+a*n[c])}return r}function X(e){const t={...e};return e.years!==void 0&&(t.year=e.years,delete t.years),e.months!==void 0&&(t.month=e.months,delete t.months),e.days!==void 0&&(t.date=e.days,delete t.days),e.day!==void 0&&(t.date=e.day,delete t.day),e.hour!==void 0&&(t.hours=e.hour,delete t.hour),e.minute!==void 0&&(t.minutes=e.minute,delete t.minute),e.second!==void 0&&(t.seconds=e.second,delete t.second),e.millisecond!==void 0&&(t.milliseconds=e.millisecond,delete t.millisecond),t}function U(e,t,a){const n=X(t),s=a===!0?"UTC":"",r=new Date(e),c=n.year!==void 0||n.month!==void 0||n.date!==void 0?se(r,n,s):r;for(const o in n){const i=o.charAt(0).toUpperCase()+o.slice(1);c[`set${s}${i}`](n[o])}return c}function oe(e,t,a){const n=ue(e,t,a),s=new Date(n.year,n.month===null?null:n.month-1,n.day===null?1:n.day,n.hour,n.minute,n.second,n.millisecond),r=s.getTimezoneOffset();return n.timezoneOffset===null||n.timezoneOffset===r?s:b(s,{minutes:n.timezoneOffset-r},1)}function ue(e,t,a,n,s){const r={year:null,month:null,day:null,hour:null,minute:null,second:null,millisecond:null,timezoneOffset:null,dateHash:null,timeHash:null};if(s!==void 0&&Object.assign(r,s),e==null||e===""||typeof e!="string")return r;t===void 0&&(t=k);const c=L(a,j.props),o=c.months,i=c.monthsShort,{regex:g,map:u}=re(t,c),l=e.match(g);if(l===null)return r;let y="";if(u.X!==void 0||u.x!==void 0){const M=parseInt(l[u.X!==void 0?u.X:u.x],10);if(isNaN(M)===!0||M<0)return r;const p=new Date(M*(u.X!==void 0?1e3:1));r.year=p.getFullYear(),r.month=p.getMonth()+1,r.day=p.getDate(),r.hour=p.getHours(),r.minute=p.getMinutes(),r.second=p.getSeconds(),r.millisecond=p.getMilliseconds()}else{if(u.YYYY!==void 0)r.year=parseInt(l[u.YYYY],10);else if(u.YY!==void 0){const M=parseInt(l[u.YY],10);r.year=M<0?M:2e3+M}if(u.M!==void 0){if(r.month=parseInt(l[u.M],10),r.month<1||r.month>12)return r}else u.MMM!==void 0?r.month=i.indexOf(l[u.MMM])+1:u.MMMM!==void 0&&(r.month=o.indexOf(l[u.MMMM])+1);if(u.D!==void 0){if(r.day=parseInt(l[u.D],10),r.year===null||r.month===null||r.day<1)return r;const M=n!=="persian"?new Date(r.year,r.month,0).getDate():R(r.year,r.month);if(r.day>M)return r}u.H!==void 0?r.hour=parseInt(l[u.H],10)%24:u.h!==void 0&&(r.hour=parseInt(l[u.h],10)%12,(u.A&&l[u.A]==="PM"||u.a&&l[u.a]==="pm"||u.aa&&l[u.aa]==="p.m.")&&(r.hour+=12),r.hour=r.hour%24),u.m!==void 0&&(r.minute=parseInt(l[u.m],10)%60),u.s!==void 0&&(r.second=parseInt(l[u.s],10)%60),u.S!==void 0&&(r.millisecond=parseInt(l[u.S],10)*10**(3-l[u.S].length)),(u.Z!==void 0||u.ZZ!==void 0)&&(y=u.Z!==void 0?l[u.Z].replace(":",""):l[u.ZZ],r.timezoneOffset=(y[0]==="+"?-1:1)*(60*y.slice(1,3)+1*y.slice(3,5)))}return r.dateHash=f(r.year,6)+"/"+f(r.month)+"/"+f(r.day),r.timeHash=f(r.hour)+":"+f(r.minute)+":"+f(r.second)+y,r}function ie(e){return typeof e=="number"?!0:isNaN(Date.parse(e))===!1}function ce(e,t){return U(new Date,e,t)}function le(e){const t=new Date(e).getDay();return t===0?7:t}function O(e){const t=new Date(e.getFullYear(),e.getMonth(),e.getDate());t.setDate(t.getDate()-(t.getDay()+6)%7+3);const a=new Date(t.getFullYear(),0,4);a.setDate(a.getDate()-(a.getDay()+6)%7+3);const n=t.getTimezoneOffset()-a.getTimezoneOffset();t.setHours(t.getHours()-n);const s=(t-a)/(N*7);return 1+Math.floor(s)}function de(e){return e.getFullYear()*1e4+e.getMonth()*100+e.getDate()}function w(e,t){const a=new Date(e);return t===!0?de(a):a.getTime()}function fe(e,t,a,n={}){const s=w(t,n.onlyDate),r=w(a,n.onlyDate),c=w(e,n.onlyDate);return(c>s||n.inclusiveFrom===!0&&c===s)&&(c<r||n.inclusiveTo===!0&&c===r)}function he(e,t){return b(e,t,1)}function ge(e,t){return b(e,t,-1)}function D(e,t,a){const n=new Date(e),s=`set${a===!0?"UTC":""}`;switch(t){case"year":case"years":n[`${s}Month`](0);case"month":case"months":n[`${s}Date`](1);case"day":case"days":case"date":n[`${s}Hours`](0);case"hour":case"hours":n[`${s}Minutes`](0);case"minute":case"minutes":n[`${s}Seconds`](0);case"second":case"seconds":n[`${s}Milliseconds`](0)}return n}function De(e,t,a){const n=new Date(e),s=`set${a===!0?"UTC":""}`;switch(t){case"year":case"years":n[`${s}Month`](11);case"month":case"months":n[`${s}Date`](x(n));case"day":case"days":case"date":n[`${s}Hours`](23);case"hour":case"hours":n[`${s}Minutes`](59);case"minute":case"minutes":n[`${s}Seconds`](59);case"second":case"seconds":n[`${s}Milliseconds`](999)}return n}function Me(e){let t=new Date(e);return Array.prototype.slice.call(arguments,1).forEach(a=>{t=Math.max(t,new Date(a))}),t}function me(e){let t=new Date(e);return Array.prototype.slice.call(arguments,1).forEach(a=>{t=Math.min(t,new Date(a))}),t}function v(e,t,a){return(e.getTime()-e.getTimezoneOffset()*$-(t.getTime()-t.getTimezoneOffset()*$))/a}function q(e,t,a="days"){const n=new Date(e),s=new Date(t);switch(a){case"years":case"year":return n.getFullYear()-s.getFullYear();case"months":case"month":return(n.getFullYear()-s.getFullYear())*12+n.getMonth()-s.getMonth();case"days":case"day":case"date":return v(D(n,"day"),D(s,"day"),N);case"hours":case"hour":return v(D(n,"hour"),D(s,"hour"),ee);case"minutes":case"minute":return v(D(n,"minute"),D(s,"minute"),$);case"seconds":case"second":return v(D(n,"second"),D(s,"second"),1e3)}}function I(e){return q(e,D(e,"year"),"days")+1}function ye(e){return E(e)===!0?"date":typeof e=="number"?"number":"string"}function pe(e,t,a){const n=new Date(e);if(t){const s=new Date(t);if(n<s)return s}if(a){const s=new Date(a);if(n>s)return s}return n}function ve(e,t,a){const n=new Date(e),s=new Date(t);if(a===void 0)return n.getTime()===s.getTime();switch(a){case"second":case"seconds":if(n.getSeconds()!==s.getSeconds())return!1;case"minute":case"minutes":if(n.getMinutes()!==s.getMinutes())return!1;case"hour":case"hours":if(n.getHours()!==s.getHours())return!1;case"day":case"days":case"date":if(n.getDate()!==s.getDate())return!1;case"month":case"months":if(n.getMonth()!==s.getMonth())return!1;case"year":case"years":if(n.getFullYear()!==s.getFullYear())return!1;break;default:throw new Error(`date isSameDate unknown unit ${a}`)}return!0}function x(e){return new Date(e.getFullYear(),e.getMonth()+1,0).getDate()}function F(e){if(e>=11&&e<=13)return`${e}th`;switch(e%10){case 1:return`${e}st`;case 2:return`${e}nd`;case 3:return`${e}rd`}return`${e}th`}const _={YY(e,t,a){const n=this.YYYY(e,t,a)%100;return n>=0?f(n):"-"+f(Math.abs(n))},YYYY(e,t,a){return a!=null?a:e.getFullYear()},M(e){return e.getMonth()+1},MM(e){return f(e.getMonth()+1)},MMM(e,t){return t.monthsShort[e.getMonth()]},MMMM(e,t){return t.months[e.getMonth()]},Q(e){return Math.ceil((e.getMonth()+1)/3)},Qo(e){return F(this.Q(e))},D(e){return e.getDate()},Do(e){return F(e.getDate())},DD(e){return f(e.getDate())},DDD(e){return I(e)},DDDD(e){return f(I(e),3)},d(e){return e.getDay()},dd(e,t){return this.dddd(e,t).slice(0,2)},ddd(e,t){return t.daysShort[e.getDay()]},dddd(e,t){return t.days[e.getDay()]},E(e){return e.getDay()||7},w(e){return O(e)},ww(e){return f(O(e))},H(e){return e.getHours()},HH(e){return f(e.getHours())},h(e){const t=e.getHours();return t===0?12:t>12?t%12:t},hh(e){return f(this.h(e))},m(e){return e.getMinutes()},mm(e){return f(e.getMinutes())},s(e){return e.getSeconds()},ss(e){return f(e.getSeconds())},S(e){return Math.floor(e.getMilliseconds()/100)},SS(e){return f(Math.floor(e.getMilliseconds()/10))},SSS(e){return f(e.getMilliseconds(),3)},A(e){return this.H(e)<12?"AM":"PM"},a(e){return this.H(e)<12?"am":"pm"},aa(e){return this.H(e)<12?"a.m.":"p.m."},Z(e,t,a,n){const s=n==null?e.getTimezoneOffset():n;return Z(s,":")},ZZ(e,t,a,n){const s=n==null?e.getTimezoneOffset():n;return Z(s)},X(e){return Math.floor(e.getTime()/1e3)},x(e){return e.getTime()}};function Ye(e,t,a,n,s){if(e!==0&&!e||e===1/0||e===-1/0)return;const r=new Date(e);if(isNaN(r))return;t===void 0&&(t=k);const c=L(a,j.props);return t.replace(te,(o,i)=>o in _?_[o](r,c,n,s):i===void 0?o:i.split("\\]").join("]"))}function we(e){return E(e)===!0?new Date(e.getTime()):e}var be={isValid:ie,extractDate:oe,buildDate:ce,getDayOfWeek:le,getWeekOfYear:O,isBetweenDates:fe,addToDate:he,subtractFromDate:ge,adjustDate:U,startOfDate:D,endOfDate:De,getMaxDate:Me,getMinDate:me,getDateDiff:q,getDayOfYear:I,inferDateFormat:ye,getDateBetween:pe,isSameDate:ve,daysInMonth:x,formatDate:Ye,clone:we};export{$e as Q,ue as _,Te as a,Oe as b,be as d,Ye as f,q as g,R as j,Ie as t};
