import{c as he,a as s,h as v,d as vt,ad as mt,ae as Ht,af as St,ag as Dt,t as E,g as Re,ah as ht,ac as Z,H as Pt,n as Nt,w as me,G,ai as $t,aj as jt,ak as Kt,al as Qt,j as gt,am as Ue,an as bt,ao as yt,ap as wt,aq as Ut,ar as Wt,as as Xt,at as Ee,au as Yt,W as Gt,av as Zt,aw as Jt,ax as rt,ay as qe,az as el,aA as tl,aB as Ke,aC as ll,aD as ve,aE as ul,Z as nl,z as al}from"./index.3e611071.js";import{n as ct,Q as il}from"./format.91cfcbc0.js";var ol=he({name:"QItemSection",props:{avatar:Boolean,thumbnail:Boolean,side:Boolean,top:Boolean,noWrap:Boolean},setup(e,{slots:r}){const o=s(()=>`q-item__section column q-item__section--${e.avatar===!0||e.side===!0||e.thumbnail===!0?"side":"main"}`+(e.top===!0?" q-item__section--top justify-start":" justify-center")+(e.avatar===!0?" q-item__section--avatar":"")+(e.thumbnail===!0?" q-item__section--thumbnail":"")+(e.noWrap===!0?" q-item__section--nowrap":""));return()=>v("div",{class:o.value},vt(r.default))}}),rl=he({name:"QItem",props:{...mt,...Ht,tag:{type:String,default:"div"},active:{type:Boolean,default:null},clickable:Boolean,dense:Boolean,insetLevel:Number,tabindex:[String,Number],focused:Boolean,manualFocus:Boolean},emits:["click","keyup"],setup(e,{slots:r,emit:o}){const{proxy:{$q:m}}=Re(),p=St(e,m),{hasLink:i,linkAttrs:O,linkClass:y,linkTag:h,navigateOnClick:I}=Dt(),c=E(null),S=E(null),k=s(()=>e.clickable===!0||i.value===!0||e.tag==="label"),V=s(()=>e.disable!==!0&&k.value===!0),z=s(()=>"q-item q-item-type row no-wrap"+(e.dense===!0?" q-item--dense":"")+(p.value===!0?" q-item--dark":"")+(i.value===!0&&e.active===null?y.value:e.active===!0?` q-item--active${e.activeClass!==void 0?` ${e.activeClass}`:""}`:"")+(e.disable===!0?" disabled":"")+(V.value===!0?" q-item--clickable q-link cursor-pointer "+(e.manualFocus===!0?"q-manual-focusable":"q-focusable q-hoverable")+(e.focused===!0?" q-manual-focusable--focused":""):"")),H=s(()=>{if(e.insetLevel===void 0)return null;const C=m.lang.rtl===!0?"Right":"Left";return{["padding"+C]:16+e.insetLevel*56+"px"}});function d(C){V.value===!0&&(S.value!==null&&(C.qKeyEvent!==!0&&document.activeElement===c.value?S.value.focus():document.activeElement===S.value&&c.value.focus()),I(C))}function D(C){if(V.value===!0&&ht(C,[13,32])===!0){Z(C),C.qKeyEvent=!0;const B=new MouseEvent("click",C);B.qKeyEvent=!0,c.value.dispatchEvent(B)}o("keyup",C)}function K(){const C=Pt(r.default,[]);return V.value===!0&&C.unshift(v("div",{class:"q-focus-helper",tabindex:-1,ref:S})),C}return()=>{const C={ref:c,class:z.value,style:H.value,role:"listitem",onClick:d,onKeyup:D};return V.value===!0?(C.tabindex=e.tabindex||"0",Object.assign(C,O.value)):k.value===!0&&(C["aria-disabled"]="true"),v(h.value,C,K())}}}),cl=he({name:"QItemLabel",props:{overline:Boolean,caption:Boolean,header:Boolean,lines:[Number,String]},setup(e,{slots:r}){const o=s(()=>parseInt(e.lines,10)),m=s(()=>"q-item__label"+(e.overline===!0?" q-item__label--overline text-overline":"")+(e.caption===!0?" q-item__label--caption text-caption":"")+(e.header===!0?" q-item__label--header":"")+(o.value===1?" ellipsis":"")),p=s(()=>e.lines!==void 0&&o.value>1?{overflow:"hidden",display:"-webkit-box","-webkit-box-orient":"vertical","-webkit-line-clamp":o.value}:null);return()=>v("div",{style:p.value,class:m.value},vt(r.default))}});let Le=!1;{const e=document.createElement("div");e.setAttribute("dir","rtl"),Object.assign(e.style,{width:"1px",height:"1px",overflow:"auto"});const r=document.createElement("div");Object.assign(r.style,{width:"1000px",height:"1px"}),document.body.appendChild(e),e.appendChild(r),e.scrollLeft=-1e3,Le=e.scrollLeft>=0,e.remove()}const j=1e3,sl=["start","center","end","start-force","center-force","end-force"],Ct=Array.prototype.filter,dl=window.getComputedStyle(document.body).overflowAnchor===void 0?Nt:function(e,r){e!==null&&(e._qOverflowAnimationFrame!==void 0&&cancelAnimationFrame(e._qOverflowAnimationFrame),e._qOverflowAnimationFrame=requestAnimationFrame(()=>{if(e===null)return;e._qOverflowAnimationFrame=void 0;const o=e.children||[];Ct.call(o,p=>p.dataset&&p.dataset.qVsAnchor!==void 0).forEach(p=>{delete p.dataset.qVsAnchor});const m=o[r];m&&m.dataset&&(m.dataset.qVsAnchor="")}))};function Se(e,r){return e+r}function Qe(e,r,o,m,p,i,O,y){const h=e===window?document.scrollingElement||document.documentElement:e,I=p===!0?"offsetWidth":"offsetHeight",c={scrollStart:0,scrollViewSize:-O-y,scrollMaxSize:0,offsetStart:-O,offsetEnd:-y};if(p===!0?(e===window?(c.scrollStart=window.pageXOffset||window.scrollX||document.body.scrollLeft||0,c.scrollViewSize+=document.documentElement.clientWidth):(c.scrollStart=h.scrollLeft,c.scrollViewSize+=h.clientWidth),c.scrollMaxSize=h.scrollWidth,i===!0&&(c.scrollStart=(Le===!0?c.scrollMaxSize-c.scrollViewSize:0)-c.scrollStart)):(e===window?(c.scrollStart=window.pageYOffset||window.scrollY||document.body.scrollTop||0,c.scrollViewSize+=document.documentElement.clientHeight):(c.scrollStart=h.scrollTop,c.scrollViewSize+=h.clientHeight),c.scrollMaxSize=h.scrollHeight),o!==null)for(let S=o.previousElementSibling;S!==null;S=S.previousElementSibling)S.classList.contains("q-virtual-scroll--skip")===!1&&(c.offsetStart+=S[I]);if(m!==null)for(let S=m.nextElementSibling;S!==null;S=S.nextElementSibling)S.classList.contains("q-virtual-scroll--skip")===!1&&(c.offsetEnd+=S[I]);if(r!==e){const S=h.getBoundingClientRect(),k=r.getBoundingClientRect();p===!0?(c.offsetStart+=k.left-S.left,c.offsetEnd-=k.width):(c.offsetStart+=k.top-S.top,c.offsetEnd-=k.height),e!==window&&(c.offsetStart+=c.scrollStart),c.offsetEnd+=c.scrollMaxSize-c.offsetStart}return c}function st(e,r,o,m){r==="end"&&(r=(e===window?document.body:e)[o===!0?"scrollWidth":"scrollHeight"]),e===window?o===!0?(m===!0&&(r=(Le===!0?document.body.scrollWidth-document.documentElement.clientWidth:0)-r),window.scrollTo(r,window.pageYOffset||window.scrollY||document.body.scrollTop||0)):window.scrollTo(window.pageXOffset||window.scrollX||document.body.scrollLeft||0,r):o===!0?(m===!0&&(r=(Le===!0?e.scrollWidth-e.offsetWidth:0)-r),e.scrollLeft=r):e.scrollTop=r}function xe(e,r,o,m){if(o>=m)return 0;const p=r.length,i=Math.floor(o/j),O=Math.floor((m-1)/j)+1;let y=e.slice(i,O).reduce(Se,0);return o%j!==0&&(y-=r.slice(i*j,o).reduce(Se,0)),m%j!==0&&m!==p&&(y-=r.slice(m,O*j).reduce(Se,0)),y}const Vt={virtualScrollSliceSize:{type:[Number,String],default:10},virtualScrollSliceRatioBefore:{type:[Number,String],default:1},virtualScrollSliceRatioAfter:{type:[Number,String],default:1},virtualScrollItemSize:{type:[Number,String],default:24},virtualScrollStickySizeStart:{type:[Number,String],default:0},virtualScrollStickySizeEnd:{type:[Number,String],default:0},tableColspan:[Number,String]},wl=Object.keys(Vt),dt={virtualScrollHorizontal:Boolean,onVirtualScroll:Function,...Vt};function fl({virtualScrollLength:e,getVirtualScrollTarget:r,getVirtualScrollEl:o,virtualScrollItemSizeComputed:m}){const p=Re(),{props:i,emit:O,proxy:y}=p,{$q:h}=y;let I,c,S,k=[],V;const z=E(0),H=E(0),d=E({}),D=E(null),K=E(null),C=E(null),B=E({from:0,to:0}),_e=s(()=>i.tableColspan!==void 0?i.tableColspan:100);m===void 0&&(m=s(()=>i.virtualScrollItemSize));const F=s(()=>m.value+";"+i.virtualScrollHorizontal),X=s(()=>F.value+";"+i.virtualScrollSliceRatioBefore+";"+i.virtualScrollSliceRatioAfter);me(X,()=>{Q()}),me(F,J);function J(){ae(c,!0)}function ge(l){ae(l===void 0?c:l)}function ee(l,a){const g=r();if(g==null||g.nodeType===8)return;const A=Qe(g,o(),D.value,K.value,i.virtualScrollHorizontal,h.lang.rtl,i.virtualScrollStickySizeStart,i.virtualScrollStickySizeEnd);S!==A.scrollViewSize&&Q(A.scrollViewSize),P(g,A,Math.min(e.value-1,Math.max(0,parseInt(l,10)||0)),0,sl.indexOf(a)!==-1?a:c!==-1&&l>c?"end":"start")}function Ae(){const l=r();if(l==null||l.nodeType===8)return;const a=Qe(l,o(),D.value,K.value,i.virtualScrollHorizontal,h.lang.rtl,i.virtualScrollStickySizeStart,i.virtualScrollStickySizeEnd),g=e.value-1,A=a.scrollMaxSize-a.offsetStart-a.offsetEnd-H.value;if(I===a.scrollStart)return;if(a.scrollMaxSize<=0){P(l,a,0,0);return}S!==a.scrollViewSize&&Q(a.scrollViewSize),be(B.value.from);const L=Math.floor(a.scrollMaxSize-Math.max(a.scrollViewSize,a.offsetEnd)-Math.min(V[g],a.scrollViewSize/2));if(L>0&&Math.ceil(a.scrollStart)>=L){P(l,a,g,a.scrollMaxSize-a.offsetEnd-k.reduce(Se,0));return}let q=0,w=a.scrollStart-a.offsetStart,R=w;if(w<=A&&w+a.scrollViewSize>=z.value)w-=z.value,q=B.value.from,R=w;else for(let b=0;w>=k[b]&&q<g;b++)w-=k[b],q+=j;for(;w>0&&q<g;)w-=V[q],w>-a.scrollViewSize?(q++,R=w):R=V[q]+w;P(l,a,q,R)}function P(l,a,g,A,L){const q=typeof L=="string"&&L.indexOf("-force")!==-1,w=q===!0?L.replace("-force",""):L,R=w!==void 0?w:"start";let b=Math.max(0,g-d.value[R]),N=b+d.value.total;N>e.value&&(N=e.value,b=Math.max(0,N-d.value.total)),I=a.scrollStart;const Y=b!==B.value.from||N!==B.value.to;if(Y===!1&&w===void 0){ye(g);return}const{activeElement:ze}=document,U=C.value;Y===!0&&U!==null&&U!==ze&&U.contains(ze)===!0&&(U.addEventListener("focusout",pe),setTimeout(()=>{U!==null&&U.removeEventListener("focusout",pe)})),dl(U,g-b);const Ie=w!==void 0?V.slice(b,g).reduce(Se,0):0;if(Y===!0){const te=N>=B.value.from&&b<=B.value.to?B.value.to:N;B.value={from:b,to:te},z.value=xe(k,V,0,b),H.value=xe(k,V,N,e.value),requestAnimationFrame(()=>{B.value.to!==N&&I===a.scrollStart&&(B.value={from:B.value.from,to:N},H.value=xe(k,V,N,e.value))})}requestAnimationFrame(()=>{if(I!==a.scrollStart)return;Y===!0&&be(b);const te=V.slice(b,g).reduce(Se,0),le=te+a.offsetStart+z.value,Be=le+V[g];let Ce=le+A;if(w!==void 0){const He=te-Ie,Ve=a.scrollStart+He;Ce=q!==!0&&Ve<le&&Be<Ve+a.scrollViewSize?Ve:w==="end"?Be-a.scrollViewSize:le-(w==="start"?0:Math.round((a.scrollViewSize-V[g])/2))}I=Ce,st(l,Ce,i.virtualScrollHorizontal,h.lang.rtl),ye(g)})}function be(l){const a=C.value;if(a){const g=Ct.call(a.children,b=>b.classList&&b.classList.contains("q-virtual-scroll--skip")===!1),A=g.length,L=i.virtualScrollHorizontal===!0?b=>b.getBoundingClientRect().width:b=>b.offsetHeight;let q=l,w,R;for(let b=0;b<A;){for(w=L(g[b]),b++;b<A&&g[b].classList.contains("q-virtual-scroll--with-prev")===!0;)w+=L(g[b]),b++;R=w-V[q],R!==0&&(V[q]+=R,k[Math.floor(q/j)]+=R),q++}}}function pe(){C.value!==null&&C.value!==void 0&&C.value.focus()}function ae(l,a){const g=1*m.value;(a===!0||Array.isArray(V)===!1)&&(V=[]);const A=V.length;V.length=e.value;for(let q=e.value-1;q>=A;q--)V[q]=g;const L=Math.floor((e.value-1)/j);k=[];for(let q=0;q<=L;q++){let w=0;const R=Math.min((q+1)*j,e.value);for(let b=q*j;b<R;b++)w+=V[b];k.push(w)}c=-1,I=void 0,z.value=xe(k,V,0,B.value.from),H.value=xe(k,V,B.value.to,e.value),l>=0?(be(B.value.from),G(()=>{ee(l)})):ie()}function Q(l){if(l===void 0&&typeof window!="undefined"){const w=r();w!=null&&w.nodeType!==8&&(l=Qe(w,o(),D.value,K.value,i.virtualScrollHorizontal,h.lang.rtl,i.virtualScrollStickySizeStart,i.virtualScrollStickySizeEnd).scrollViewSize)}S=l;const a=parseFloat(i.virtualScrollSliceRatioBefore)||0,g=parseFloat(i.virtualScrollSliceRatioAfter)||0,A=1+a+g,L=l===void 0||l<=0?1:Math.ceil(l/m.value),q=Math.max(1,L,Math.ceil((i.virtualScrollSliceSize>0?i.virtualScrollSliceSize:10)/A));d.value={total:Math.ceil(q*A),start:Math.ceil(q*a),center:Math.ceil(q*(.5+a)),end:Math.ceil(q*(1+a)),view:L}}function Te(l,a){const g=i.virtualScrollHorizontal===!0?"width":"height",A={["--q-virtual-scroll-item-"+g]:m.value+"px"};return[l==="tbody"?v(l,{class:"q-virtual-scroll__padding",key:"before",ref:D},[v("tr",[v("td",{style:{[g]:`${z.value}px`,...A},colspan:_e.value})])]):v(l,{class:"q-virtual-scroll__padding",key:"before",ref:D,style:{[g]:`${z.value}px`,...A}}),v(l,{class:"q-virtual-scroll__content",key:"content",ref:C,tabindex:-1},a.flat()),l==="tbody"?v(l,{class:"q-virtual-scroll__padding",key:"after",ref:K},[v("tr",[v("td",{style:{[g]:`${H.value}px`,...A},colspan:_e.value})])]):v(l,{class:"q-virtual-scroll__padding",key:"after",ref:K,style:{[g]:`${H.value}px`,...A}})]}function ye(l){c!==l&&(i.onVirtualScroll!==void 0&&O("virtualScroll",{index:l,from:B.value.from,to:B.value.to-1,direction:l<c?"decrease":"increase",ref:y}),c=l)}Q();const ie=$t(Ae,h.platform.is.ios===!0?120:35);jt(()=>{Q()});let we=!1;return Kt(()=>{we=!0}),Qt(()=>{if(we!==!0)return;const l=r();I!==void 0&&l!==void 0&&l!==null&&l.nodeType!==8?st(l,I,i.virtualScrollHorizontal,h.lang.rtl):ee(c)}),gt(()=>{ie.cancel()}),Object.assign(y,{scrollTo:ee,reset:J,refresh:ge}),{virtualScrollSliceRange:B,virtualScrollSliceSizeComputed:d,setVirtualScrollSize:Q,onVirtualScrollEvt:ie,localResetVirtualScroll:ae,padVirtualScroll:Te,scrollTo:ee,reset:J,refresh:ge}}var vl=he({name:"QField",inheritAttrs:!1,props:{...Ue,tag:{type:String,default:"label"}},emits:bt,setup(){return yt(wt({tagProp:!0}))}});const ml={xs:8,sm:10,md:14,lg:20,xl:24};var Sl=he({name:"QChip",props:{...mt,...Ut,dense:Boolean,icon:String,iconRight:String,iconRemove:String,iconSelected:String,label:[String,Number],color:String,textColor:String,modelValue:{type:Boolean,default:!0},selected:{type:Boolean,default:null},square:Boolean,outline:Boolean,clickable:Boolean,removable:Boolean,removeAriaLabel:String,tabindex:[String,Number],disable:Boolean,ripple:{type:[Boolean,Object],default:!0}},emits:["update:modelValue","update:selected","remove","click"],setup(e,{slots:r,emit:o}){const{proxy:{$q:m}}=Re(),p=St(e,m),i=Wt(e,ml),O=s(()=>e.selected===!0||e.icon!==void 0),y=s(()=>e.selected===!0?e.iconSelected||m.iconSet.chip.selected:e.icon),h=s(()=>e.iconRemove||m.iconSet.chip.remove),I=s(()=>e.disable===!1&&(e.clickable===!0||e.selected!==null)),c=s(()=>{const d=e.outline===!0&&e.color||e.textColor;return"q-chip row inline no-wrap items-center"+(e.outline===!1&&e.color!==void 0?` bg-${e.color}`:"")+(d?` text-${d} q-chip--colored`:"")+(e.disable===!0?" disabled":"")+(e.dense===!0?" q-chip--dense":"")+(e.outline===!0?" q-chip--outline":"")+(e.selected===!0?" q-chip--selected":"")+(I.value===!0?" q-chip--clickable cursor-pointer non-selectable q-hoverable":"")+(e.square===!0?" q-chip--square":"")+(p.value===!0?" q-chip--dark q-dark":"")}),S=s(()=>{const d=e.disable===!0?{tabindex:-1,"aria-disabled":"true"}:{tabindex:e.tabindex||0},D={...d,role:"button","aria-hidden":"false","aria-label":e.removeAriaLabel||m.lang.label.remove};return{chip:d,remove:D}});function k(d){d.keyCode===13&&V(d)}function V(d){e.disable||(o("update:selected",!e.selected),o("click",d))}function z(d){(d.keyCode===void 0||d.keyCode===13)&&(Z(d),e.disable===!1&&(o("update:modelValue",!1),o("remove")))}function H(){const d=[];I.value===!0&&d.push(v("div",{class:"q-focus-helper"})),O.value===!0&&d.push(v(Ee,{class:"q-chip__icon q-chip__icon--left",name:y.value}));const D=e.label!==void 0?[v("div",{class:"ellipsis"},[e.label])]:void 0;return d.push(v("div",{class:"q-chip__content col row no-wrap items-center q-anchor--skip"},Yt(r.default,D))),e.iconRight&&d.push(v(Ee,{class:"q-chip__icon q-chip__icon--right",name:e.iconRight})),e.removable===!0&&d.push(v(Ee,{class:"q-chip__icon q-chip__icon--remove cursor-pointer",name:h.value,...S.value.remove,onClick:z,onKeyup:z})),d}return()=>{if(e.modelValue===!1)return;const d={class:c.value,style:i.value};return I.value===!0&&Object.assign(d,S.value.chip,{onClick:V,onKeyup:k}),Xt("div",d,H(),"ripple",e.ripple!==!1&&e.disable!==!0,()=>[[Gt,e.ripple]])}}});const ft=e=>["add","add-unique","toggle"].includes(e),hl=".*+?^${}()|[]\\",gl=Object.keys(Ue);var Cl=he({name:"QSelect",inheritAttrs:!1,props:{...dt,...Zt,...Ue,modelValue:{required:!0},multiple:Boolean,displayValue:[String,Number],displayValueHtml:Boolean,dropdownIcon:String,options:{type:Array,default:()=>[]},optionValue:[Function,String],optionLabel:[Function,String],optionDisable:[Function,String],hideSelected:Boolean,hideDropdownIcon:Boolean,fillInput:Boolean,maxValues:[Number,String],optionsDense:Boolean,optionsDark:{type:Boolean,default:null},optionsSelectedClass:String,optionsHtml:Boolean,optionsCover:Boolean,menuShrink:Boolean,menuAnchor:String,menuSelf:String,menuOffset:Array,popupContentClass:String,popupContentStyle:[String,Array,Object],popupNoRouteDismiss:Boolean,useInput:Boolean,useChips:Boolean,newValueMode:{type:String,validator:ft},mapOptions:Boolean,emitValue:Boolean,inputDebounce:{type:[Number,String],default:500},inputClass:[Array,String,Object],inputStyle:[Array,String,Object],tabindex:{type:[String,Number],default:0},autocomplete:String,transitionShow:{},transitionHide:{},transitionDuration:{},behavior:{type:String,validator:e=>["default","menu","dialog"].includes(e),default:"default"},virtualScrollItemSize:dt.virtualScrollItemSize.type,onNewValue:Function,onFilter:Function},emits:[...bt,"add","remove","inputValue","keyup","keypress","keydown","popupShow","popupHide","filterAbort"],setup(e,{slots:r,emit:o}){const{proxy:m}=Re(),{$q:p}=m,i=E(!1),O=E(!1),y=E(-1),h=E(""),I=E(!1),c=E(!1);let S=null,k=null,V,z,H,d=null,D,K,C,B;const _e=E(null),F=E(null),X=E(null),J=E(null),ge=E(null),ee=Jt(e),Ae=ll(ut),P=s(()=>Array.isArray(e.options)?e.options.length:0),be=s(()=>e.virtualScrollItemSize===void 0?e.optionsDense===!0?24:48:e.virtualScrollItemSize),{virtualScrollSliceRange:pe,virtualScrollSliceSizeComputed:ae,localResetVirtualScroll:Q,padVirtualScroll:Te,onVirtualScrollEvt:ye,scrollTo:ie,setVirtualScrollSize:we}=fl({virtualScrollLength:P,getVirtualScrollTarget:_t,getVirtualScrollEl:tt,virtualScrollItemSizeComputed:be}),l=wt(),a=s(()=>{const t=e.mapOptions===!0&&e.multiple!==!0,n=e.modelValue!==void 0&&(e.modelValue!==null||t===!0)?e.multiple===!0&&Array.isArray(e.modelValue)?e.modelValue:[e.modelValue]:[];if(e.mapOptions===!0&&Array.isArray(e.options)===!0){const u=e.mapOptions===!0&&V!==void 0?V:[],f=n.map(_=>xt(_,u));return e.modelValue===null&&t===!0?f.filter(_=>_!==null):f}return n}),g=s(()=>{const t={};return gl.forEach(n=>{const u=e[n];u!==void 0&&(t[n]=u)}),t}),A=s(()=>e.optionsDark===null?l.isDark.value:e.optionsDark),L=s(()=>rt(a.value)),q=s(()=>{let t="q-field__input q-placeholder col";return e.hideSelected===!0||a.value.length===0?[t,e.inputClass]:(t+=" q-field__input--padding",e.inputClass===void 0?t:[t,e.inputClass])}),w=s(()=>(e.virtualScrollHorizontal===!0?"q-virtual-scroll--horizontal":"")+(e.popupContentClass?" "+e.popupContentClass:"")),R=s(()=>P.value===0),b=s(()=>a.value.map(t=>$.value(t)).join(", ")),N=s(()=>e.displayValue!==void 0?e.displayValue:b.value),Y=s(()=>e.optionsHtml===!0?()=>!0:t=>t!=null&&t.html===!0),ze=s(()=>e.displayValueHtml===!0||e.displayValue===void 0&&(e.optionsHtml===!0||a.value.some(Y.value))),U=s(()=>l.focused.value===!0?e.tabindex:-1),Ie=s(()=>{const t={tabindex:e.tabindex,role:"combobox","aria-label":e.label,"aria-readonly":e.readonly===!0?"true":"false","aria-autocomplete":e.useInput===!0?"list":"none","aria-expanded":i.value===!0?"true":"false","aria-controls":`${l.targetUid.value}_lb`};return y.value>=0&&(t["aria-activedescendant"]=`${l.targetUid.value}_${y.value}`),t}),te=s(()=>({id:`${l.targetUid.value}_lb`,role:"listbox","aria-multiselectable":e.multiple===!0?"true":"false"})),le=s(()=>a.value.map((t,n)=>({index:n,opt:t,html:Y.value(t),selected:!0,removeAtIndex:qt,toggleOption:ue,tabindex:U.value}))),Be=s(()=>{if(P.value===0)return[];const{from:t,to:n}=pe.value;return e.options.slice(t,n).map((u,f)=>{const _=oe.value(u)===!0,x=Ne(u)===!0,T=t+f,M={clickable:!0,active:x,activeClass:Ve.value,manualFocus:!0,focused:!1,disable:_,tabindex:-1,dense:e.optionsDense,dark:A.value,role:"option","aria-selected":x===!0?"true":"false",id:`${l.targetUid.value}_${T}`,onClick:()=>{ue(u)}};return _!==!0&&(y.value===T&&(M.focused=!0),p.platform.is.desktop===!0&&(M.onMousemove=()=>{i.value===!0&&re(T)})),{index:T,opt:u,html:Y.value(u),label:$.value(u),selected:M.active,focused:M.focused,toggleOption:ue,setOptionIndex:re,itemProps:M}})}),Ce=s(()=>e.dropdownIcon!==void 0?e.dropdownIcon:p.iconSet.arrow.dropdown),He=s(()=>e.optionsCover===!1&&e.outlined!==!0&&e.standout!==!0&&e.borderless!==!0&&e.rounded!==!0),Ve=s(()=>e.optionsSelectedClass!==void 0?e.optionsSelectedClass:e.color!==void 0?`text-${e.color}`:""),W=s(()=>Pe(e.optionValue,"value")),$=s(()=>Pe(e.optionLabel,"label")),oe=s(()=>Pe(e.optionDisable,"disable")),Oe=s(()=>a.value.map(t=>W.value(t))),kt=s(()=>{const t={onInput:ut,onChange:Ae,onKeydown:et,onKeyup:Ze,onKeypress:Je,onFocus:Ye,onClick(n){z===!0&&ve(n)}};return t.onCompositionstart=t.onCompositionupdate=t.onCompositionend=Ae,t});me(a,t=>{V=t,e.useInput===!0&&e.fillInput===!0&&e.multiple!==!0&&l.innerLoading.value!==!0&&(O.value!==!0&&i.value!==!0||L.value!==!0)&&(H!==!0&&fe(),(O.value===!0||i.value===!0)&&ce(""))},{immediate:!0}),me(()=>e.fillInput,fe),me(i,$e),me(P,Tt);function We(t){return e.emitValue===!0?W.value(t):t}function De(t){if(t!==-1&&t<a.value.length)if(e.multiple===!0){const n=e.modelValue.slice();o("remove",{index:t,value:n.splice(t,1)[0]}),o("update:modelValue",n)}else o("update:modelValue",null)}function qt(t){De(t),l.focus()}function Xe(t,n){const u=We(t);if(e.multiple!==!0){e.fillInput===!0&&ke($.value(t),!0,!0),o("update:modelValue",u);return}if(a.value.length===0){o("add",{index:0,value:u}),o("update:modelValue",e.multiple===!0?[u]:u);return}if(n===!0&&Ne(t)===!0||e.maxValues!==void 0&&e.modelValue.length>=e.maxValues)return;const f=e.modelValue.slice();o("add",{index:f.length,value:u}),f.push(u),o("update:modelValue",f)}function ue(t,n){if(l.editable.value!==!0||t===void 0||oe.value(t)===!0)return;const u=W.value(t);if(e.multiple!==!0){n!==!0&&(ke(e.fillInput===!0?$.value(t):"",!0,!0),ne()),F.value!==null&&F.value.focus(),(a.value.length===0||qe(W.value(a.value[0]),u)!==!0)&&o("update:modelValue",e.emitValue===!0?u:t);return}if((z!==!0||I.value===!0)&&l.focus(),Ye(),a.value.length===0){const x=e.emitValue===!0?u:t;o("add",{index:0,value:x}),o("update:modelValue",e.multiple===!0?[x]:x);return}const f=e.modelValue.slice(),_=Oe.value.findIndex(x=>qe(x,u));if(_!==-1)o("remove",{index:_,value:f.splice(_,1)[0]});else{if(e.maxValues!==void 0&&f.length>=e.maxValues)return;const x=e.emitValue===!0?u:t;o("add",{index:f.length,value:x}),f.push(x)}o("update:modelValue",f)}function re(t){if(p.platform.is.desktop!==!0)return;const n=t!==-1&&t<P.value?t:-1;y.value!==n&&(y.value=n)}function Me(t=1,n){if(i.value===!0){let u=y.value;do u=ct(u+t,-1,P.value-1);while(u!==-1&&u!==y.value&&oe.value(e.options[u])===!0);y.value!==u&&(re(u),ie(u),n!==!0&&e.useInput===!0&&e.fillInput===!0&&Fe(u>=0?$.value(e.options[u]):D,!0))}}function xt(t,n){const u=f=>qe(W.value(f),t);return e.options.find(u)||n.find(u)||t}function Pe(t,n){const u=t!==void 0?t:n;return typeof u=="function"?u:f=>f!==null&&typeof f=="object"&&u in f?f[u]:f}function Ne(t){const n=W.value(t);return Oe.value.find(u=>qe(u,n))!==void 0}function Ye(t){e.useInput===!0&&F.value!==null&&(t===void 0||F.value===t.target&&t.target.value===b.value)&&F.value.select()}function Ge(t){ht(t,27)===!0&&i.value===!0&&(ve(t),ne(),fe()),o("keyup",t)}function Ze(t){const{value:n}=t.target;if(t.keyCode!==void 0){Ge(t);return}if(t.target.value="",S!==null&&(clearTimeout(S),S=null),k!==null&&(clearTimeout(k),k=null),fe(),typeof n=="string"&&n.length!==0){const u=n.toLocaleLowerCase(),f=x=>{const T=e.options.find(M=>x.value(M).toLocaleLowerCase()===u);return T===void 0?!1:(a.value.indexOf(T)===-1?ue(T):ne(),!0)},_=x=>{f(W)!==!0&&(f($)===!0||x===!0||ce(n,!0,()=>_(!0)))};_()}else l.clearValue(t)}function Je(t){o("keypress",t)}function et(t){if(o("keydown",t),ul(t)===!0)return;const n=h.value.length!==0&&(e.newValueMode!==void 0||e.onNewValue!==void 0),u=t.shiftKey!==!0&&e.multiple!==!0&&(y.value!==-1||n===!0);if(t.keyCode===27){Ke(t);return}if(t.keyCode===9&&u===!1){se();return}if(t.target===void 0||t.target.id!==l.targetUid.value||l.editable.value!==!0)return;if(t.keyCode===40&&l.innerLoading.value!==!0&&i.value===!1){Z(t),de();return}if(t.keyCode===8&&(e.useChips===!0||e.clearable===!0)&&e.hideSelected!==!0&&h.value.length===0){e.multiple===!0&&Array.isArray(e.modelValue)===!0?De(e.modelValue.length-1):e.multiple!==!0&&e.modelValue!==null&&o("update:modelValue",null);return}(t.keyCode===35||t.keyCode===36)&&(typeof h.value!="string"||h.value.length===0)&&(Z(t),y.value=-1,Me(t.keyCode===36?1:-1,e.multiple)),(t.keyCode===33||t.keyCode===34)&&ae.value!==void 0&&(Z(t),y.value=Math.max(-1,Math.min(P.value,y.value+(t.keyCode===33?-1:1)*ae.value.view)),Me(t.keyCode===33?1:-1,e.multiple)),(t.keyCode===38||t.keyCode===40)&&(Z(t),Me(t.keyCode===38?-1:1,e.multiple));const f=P.value;if((C===void 0||B<Date.now())&&(C=""),f>0&&e.useInput!==!0&&t.key!==void 0&&t.key.length===1&&t.altKey===!1&&t.ctrlKey===!1&&t.metaKey===!1&&(t.keyCode!==32||C.length!==0)){i.value!==!0&&de(t);const _=t.key.toLocaleLowerCase(),x=C.length===1&&C[0]===_;B=Date.now()+1500,x===!1&&(Z(t),C+=_);const T=new RegExp("^"+C.split("").map(je=>hl.indexOf(je)!==-1?"\\"+je:je).join(".*"),"i");let M=y.value;if(x===!0||M<0||T.test($.value(e.options[M]))!==!0)do M=ct(M+1,-1,f-1);while(M!==y.value&&(oe.value(e.options[M])===!0||T.test($.value(e.options[M]))!==!0));y.value!==M&&G(()=>{re(M),ie(M),M>=0&&e.useInput===!0&&e.fillInput===!0&&Fe($.value(e.options[M]),!0)});return}if(!(t.keyCode!==13&&(t.keyCode!==32||e.useInput===!0||C!=="")&&(t.keyCode!==9||u===!1))){if(t.keyCode!==9&&Z(t),y.value!==-1&&y.value<f){ue(e.options[y.value]);return}if(n===!0){const _=(x,T)=>{if(T){if(ft(T)!==!0)return}else T=e.newValueMode;if(ke("",e.multiple!==!0,!0),x==null)return;(T==="toggle"?ue:Xe)(x,T==="add-unique"),e.multiple!==!0&&(F.value!==null&&F.value.focus(),ne())};if(e.onNewValue!==void 0?o("newValue",h.value,_):_(h.value),e.multiple!==!0)return}i.value===!0?se():l.innerLoading.value!==!0&&de()}}function tt(){return z===!0?ge.value:X.value!==null&&X.value.contentEl!==null?X.value.contentEl:void 0}function _t(){return tt()}function At(){return e.hideSelected===!0?[]:r["selected-item"]!==void 0?le.value.map(t=>r["selected-item"](t)).slice():r.selected!==void 0?[].concat(r.selected()):e.useChips===!0?le.value.map((t,n)=>v(Sl,{key:"option-"+n,removable:l.editable.value===!0&&oe.value(t.opt)!==!0,dense:!0,textColor:e.color,tabindex:U.value,onRemove(){t.removeAtIndex(n)}},()=>v("span",{class:"ellipsis",[t.html===!0?"innerHTML":"textContent"]:$.value(t.opt)}))):[v("span",{[ze.value===!0?"innerHTML":"textContent"]:N.value})]}function lt(){if(R.value===!0)return r["no-option"]!==void 0?r["no-option"]({inputValue:h.value}):void 0;const t=r.option!==void 0?r.option:u=>v(rl,{key:u.index,...u.itemProps},()=>v(ol,()=>v(cl,()=>v("span",{[u.html===!0?"innerHTML":"textContent"]:u.label}))));let n=Te("div",Be.value.map(t));return r["before-options"]!==void 0&&(n=r["before-options"]().concat(n)),al(r["after-options"],n)}function pt(t,n){const u=n===!0?{...Ie.value,...l.splitAttrs.attributes.value}:void 0,f={ref:n===!0?F:void 0,key:"i_t",class:q.value,style:e.inputStyle,value:h.value!==void 0?h.value:"",type:"search",...u,id:n===!0?l.targetUid.value:void 0,maxlength:e.maxlength,autocomplete:e.autocomplete,"data-autofocus":t===!0||e.autofocus===!0||void 0,disabled:e.disable===!0,readonly:e.readonly===!0,...kt.value};return t!==!0&&z===!0&&(Array.isArray(f.class)===!0?f.class=[...f.class,"no-pointer-events"]:f.class+=" no-pointer-events"),v("input",f)}function ut(t){S!==null&&(clearTimeout(S),S=null),k!==null&&(clearTimeout(k),k=null),!(t&&t.target&&t.target.qComposing===!0)&&(Fe(t.target.value||""),H=!0,D=h.value,l.focused.value!==!0&&(z!==!0||I.value===!0)&&l.focus(),e.onFilter!==void 0&&(S=setTimeout(()=>{S=null,ce(h.value)},e.inputDebounce)))}function Fe(t,n){h.value!==t&&(h.value=t,n===!0||e.inputDebounce===0||e.inputDebounce==="0"?o("inputValue",t):k=setTimeout(()=>{k=null,o("inputValue",t)},e.inputDebounce))}function ke(t,n,u){H=u!==!0,e.useInput===!0&&(Fe(t,!0),(n===!0||u!==!0)&&(D=t),n!==!0&&ce(t))}function ce(t,n,u){if(e.onFilter===void 0||n!==!0&&l.focused.value!==!0)return;l.innerLoading.value===!0?o("filterAbort"):(l.innerLoading.value=!0,c.value=!0),t!==""&&e.multiple!==!0&&a.value.length!==0&&H!==!0&&t===$.value(a.value[0])&&(t="");const f=setTimeout(()=>{i.value===!0&&(i.value=!1)},10);d!==null&&clearTimeout(d),d=f,o("filter",t,(_,x)=>{(n===!0||l.focused.value===!0)&&d===f&&(clearTimeout(d),typeof _=="function"&&_(),c.value=!1,G(()=>{l.innerLoading.value=!1,l.editable.value===!0&&(n===!0?i.value===!0&&ne():i.value===!0?$e(!0):i.value=!0),typeof x=="function"&&G(()=>{x(m)}),typeof u=="function"&&G(()=>{u(m)})}))},()=>{l.focused.value===!0&&d===f&&(clearTimeout(d),l.innerLoading.value=!1,c.value=!1),i.value===!0&&(i.value=!1)})}function zt(){return v(il,{ref:X,class:w.value,style:e.popupContentStyle,modelValue:i.value,fit:e.menuShrink!==!0,cover:e.optionsCover===!0&&R.value!==!0&&e.useInput!==!0,anchor:e.menuAnchor,self:e.menuSelf,offset:e.menuOffset,dark:A.value,noParentEvent:!0,noRefocus:!0,noFocus:!0,noRouteDismiss:e.popupNoRouteDismiss,square:He.value,transitionShow:e.transitionShow,transitionHide:e.transitionHide,transitionDuration:e.transitionDuration,separateClosePopup:!0,...te.value,onScrollPassive:ye,onBeforeShow:at,onBeforeHide:It,onShow:Bt},lt)}function It(t){it(t),se()}function Bt(){we()}function Ot(t){ve(t),F.value!==null&&F.value.focus(),I.value=!0,window.scrollTo(window.pageXOffset||window.scrollX||document.body.scrollLeft||0,0)}function Mt(t){ve(t),G(()=>{I.value=!1})}function Ft(){const t=[v(vl,{class:`col-auto ${l.fieldClass.value}`,...g.value,for:l.targetUid.value,dark:A.value,square:!0,loading:c.value,itemAligned:!1,filled:!0,stackLabel:h.value.length!==0,...l.splitAttrs.listeners.value,onFocus:Ot,onBlur:Mt},{...r,rawControl:()=>l.getControl(!0),before:void 0,after:void 0})];return i.value===!0&&t.push(v("div",{ref:ge,class:w.value+" scroll",style:e.popupContentStyle,...te.value,onClick:Ke,onScrollPassive:ye},lt())),v(nl,{ref:J,modelValue:O.value,position:e.useInput===!0?"top":void 0,transitionShow:K,transitionHide:e.transitionHide,transitionDuration:e.transitionDuration,noRouteDismiss:e.popupNoRouteDismiss,onBeforeShow:at,onBeforeHide:Et,onHide:Lt,onShow:Rt},()=>v("div",{class:"q-select__dialog"+(A.value===!0?" q-select__dialog--dark q-dark":"")+(I.value===!0?" q-select__dialog--focused":"")},t))}function Et(t){it(t),J.value!==null&&J.value.__updateRefocusTarget(l.rootRef.value.querySelector(".q-field__native > [tabindex]:last-child")),l.focused.value=!1}function Lt(t){ne(),l.focused.value===!1&&o("blur",t),fe()}function Rt(){const t=document.activeElement;(t===null||t.id!==l.targetUid.value)&&F.value!==null&&F.value!==t&&F.value.focus(),we()}function se(){O.value!==!0&&(y.value=-1,i.value===!0&&(i.value=!1),l.focused.value===!1&&(d!==null&&(clearTimeout(d),d=null),l.innerLoading.value===!0&&(o("filterAbort"),l.innerLoading.value=!1,c.value=!1)))}function de(t){l.editable.value===!0&&(z===!0?(l.onControlFocusin(t),O.value=!0,G(()=>{l.focus()})):l.focus(),e.onFilter!==void 0?ce(h.value):(R.value!==!0||r["no-option"]!==void 0)&&(i.value=!0))}function ne(){O.value=!1,se()}function fe(){e.useInput===!0&&ke(e.multiple!==!0&&e.fillInput===!0&&a.value.length!==0&&$.value(a.value[0])||"",!0,!0)}function $e(t){let n=-1;if(t===!0){if(a.value.length!==0){const u=W.value(a.value[0]);n=e.options.findIndex(f=>qe(W.value(f),u))}Q(n)}re(n)}function Tt(t,n){i.value===!0&&l.innerLoading.value===!1&&(Q(-1,!0),G(()=>{i.value===!0&&l.innerLoading.value===!1&&(t>n?Q():$e(!0))}))}function nt(){O.value===!1&&X.value!==null&&X.value.updatePosition()}function at(t){t!==void 0&&ve(t),o("popupShow",t),l.hasPopupOpen=!0,l.onControlFocusin(t)}function it(t){t!==void 0&&ve(t),o("popupHide",t),l.hasPopupOpen=!1,l.onControlFocusout(t)}function ot(){z=p.platform.is.mobile!==!0&&e.behavior!=="dialog"?!1:e.behavior!=="menu"&&(e.useInput===!0?r["no-option"]!==void 0||e.onFilter!==void 0||R.value===!1:!0),K=p.platform.is.ios===!0&&z===!0&&e.useInput===!0?"fade":e.transitionShow}return el(ot),tl(nt),ot(),gt(()=>{S!==null&&clearTimeout(S),k!==null&&clearTimeout(k)}),Object.assign(m,{showPopup:de,hidePopup:ne,removeAtIndex:De,add:Xe,toggleOption:ue,getOptionIndex:()=>y.value,setOptionIndex:re,moveOptionSelection:Me,filter:ce,updateMenuPosition:nt,updateInputValue:ke,isOptionSelected:Ne,getEmittingOptionValue:We,isOptionDisabled:(...t)=>oe.value.apply(null,t)===!0,getOptionValue:(...t)=>W.value.apply(null,t),getOptionLabel:(...t)=>$.value.apply(null,t)}),Object.assign(l,{innerValue:a,fieldClass:s(()=>`q-select q-field--auto-height q-select--with${e.useInput!==!0?"out":""}-input q-select--with${e.useChips!==!0?"out":""}-chips q-select--${e.multiple===!0?"multiple":"single"}`),inputRef:_e,targetRef:F,hasValue:L,showPopup:de,floatingLabel:s(()=>e.hideSelected!==!0&&L.value===!0||typeof h.value=="number"||h.value.length!==0||rt(e.displayValue)),getControlChild:()=>{if(l.editable.value!==!1&&(O.value===!0||R.value!==!0||r["no-option"]!==void 0))return z===!0?Ft():zt();l.hasPopupOpen===!0&&(l.hasPopupOpen=!1)},controlEvents:{onFocusin(t){l.onControlFocusin(t)},onFocusout(t){l.onControlFocusout(t,()=>{fe(),se()})},onClick(t){if(Ke(t),z!==!0&&i.value===!0){se(),F.value!==null&&F.value.focus();return}de(t)}},getControl:t=>{const n=At(),u=t===!0||O.value!==!0||z!==!0;if(e.useInput===!0)n.push(pt(t,u));else if(l.editable.value===!0){const _=u===!0?Ie.value:void 0;n.push(v("input",{ref:u===!0?F:void 0,key:"d_t",class:"q-select__focus-target",id:u===!0?l.targetUid.value:void 0,value:N.value,readonly:!0,"data-autofocus":t===!0||e.autofocus===!0||void 0,..._,onKeydown:et,onKeyup:Ge,onKeypress:Je})),u===!0&&typeof e.autocomplete=="string"&&e.autocomplete.length!==0&&n.push(v("input",{class:"q-select__autocomplete-input",autocomplete:e.autocomplete,tabindex:-1,onKeyup:Ze}))}if(ee.value!==void 0&&e.disable!==!0&&Oe.value.length!==0){const _=Oe.value.map(x=>v("option",{value:x,selected:!0}));n.push(v("select",{class:"hidden",name:ee.value,multiple:e.multiple},_))}const f=e.useInput===!0||u!==!0?void 0:l.splitAttrs.attributes.value;return v("div",{class:"q-field__native row items-center",...f,...l.splitAttrs.listeners.value},n)},getInnerAppend:()=>e.loading!==!0&&c.value!==!0&&e.hideDropdownIcon!==!0?[v(Ee,{class:"q-select__dropdown-icon"+(i.value===!0?" rotate-180":""),name:Ce.value})]:null}),yt(l)}});export{rl as Q,ol as a,cl as b,fl as c,wl as d,Cl as e,Sl as f,Le as r,dt as u};
