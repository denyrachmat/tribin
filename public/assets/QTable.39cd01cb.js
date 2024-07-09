import{c as H,ad as le,af as ae,a as c,h as o,d as te,g as M,t as j,H as St,at as Ve,s as yt,w as L,aj as je,o as Me,al as ht,ak as wt,j as Ee,k as _t,m as Be,z as Ae,aq as qt,ar as Pt,aF as Ct,aG as Oe,aH as Se,aI as Fe,aJ as kt,G as Ne,aK as Rt,a0 as me,aL as Q,Q as Z,aM as xt}from"./index.466711c3.js";import{u as Tt,c as Bt,d as He,e as Ot}from"./QSelect.4caeed78.js";var Ft=H({name:"QList",props:{...le,bordered:Boolean,dense:Boolean,separator:Boolean,padding:Boolean,tag:{type:String,default:"div"}},setup(e,{slots:l}){const a=M(),d=ae(e,a.proxy.$q),r=c(()=>"q-list"+(e.bordered===!0?" q-list--bordered":"")+(e.dense===!0?" q-list--dense":"")+(e.separator===!0?" q-list--separator":"")+(d.value===!0?" q-list--dark":"")+(e.padding===!0?" q-list--padding":""));return()=>o(e.tag,{class:r.value},te(l.default))}});const $t=()=>!0;function Dt(e){const l={};return e.forEach(a=>{l[a]=$t}),l}function Qe(){const{emit:e,proxy:l}=M(),a=j(null);function d(){a.value.show()}function r(){a.value.hide()}function f(u){e("ok",u),r()}function s(){e("hide")}return Object.assign(l,{show:d,hide:r}),{dialogRef:a,onDialogHide:s,onDialogOK:f,onDialogCancel:r}}const ze=["ok","hide"];Qe.emits=ze;Qe.emitsObject=Dt(ze);var Lt=H({name:"QTh",props:{props:Object,autoWidth:Boolean},emits:["click"],setup(e,{slots:l,emit:a}){const d=M(),{proxy:{$q:r}}=d,f=s=>{a("click",s)};return()=>{if(e.props===void 0)return o("th",{class:e.autoWidth===!0?"q-table--col-auto-width":"",onClick:f},te(l.default));let s,u;const v=d.vnode.key;if(v){if(s=e.props.colsMap[v],s===void 0)return}else s=e.props.col;if(s.sortable===!0){const n=s.align==="right"?"unshift":"push";u=St(l.default,[]),u[n](o(Ve,{class:s.__iconClass,name:r.iconSet.table.arrowUp}))}else u=te(l.default);const S={class:s.__thClass+(e.autoWidth===!0?" q-table--col-auto-width":""),style:s.headerStyle,onClick:n=>{s.sortable===!0&&e.props.sort(s),f(n)}};return o("th",S,u)}}});const Vt=["horizontal","vertical","cell","none"];var jt=H({name:"QMarkupTable",props:{...le,dense:Boolean,flat:Boolean,bordered:Boolean,square:Boolean,wrapCells:Boolean,separator:{type:String,default:"horizontal",validator:e=>Vt.includes(e)}},setup(e,{slots:l}){const a=M(),d=ae(e,a.proxy.$q),r=c(()=>`q-markup-table q-table__container q-table__card q-table--${e.separator}-separator`+(d.value===!0?" q-table--dark q-table__card--dark q-dark":"")+(e.dense===!0?" q-table--dense":"")+(e.flat===!0?" q-table--flat":"")+(e.bordered===!0?" q-table--bordered":"")+(e.square===!0?" q-table--square":"")+(e.wrapCells===!1?" q-table--no-wrap":""));return()=>o("div",{class:r.value},[o("table",{class:"q-table"},te(l.default))])}});function pe(e,l){return o("div",e,[o("table",{class:"q-table"},l)])}const Mt={list:Ft,table:jt},Et=["list","table","__qtable"];var At=H({name:"QVirtualScroll",props:{...Tt,type:{type:String,default:"list",validator:e=>Et.includes(e)},items:{type:Array,default:()=>[]},itemsFn:Function,itemsSize:Number,scrollTarget:yt},setup(e,{slots:l,attrs:a}){let d;const r=j(null),f=c(()=>e.itemsSize>=0&&e.itemsFn!==void 0?parseInt(e.itemsSize,10):Array.isArray(e.items)?e.items.length:0),{virtualScrollSliceRange:s,localResetVirtualScroll:u,padVirtualScroll:v,onVirtualScrollEvt:S}=Bt({virtualScrollLength:f,getVirtualScrollTarget:P,getVirtualScrollEl:q}),n=c(()=>{if(f.value===0)return[];const O=(F,R)=>({index:s.value.from+R,item:F});return e.itemsFn===void 0?e.items.slice(s.value.from,s.value.to).map(O):e.itemsFn(s.value.from,s.value.to-s.value.from).map(O)}),b=c(()=>"q-virtual-scroll q-virtual-scroll"+(e.virtualScrollHorizontal===!0?"--horizontal":"--vertical")+(e.scrollTarget!==void 0?"":" scroll")),_=c(()=>e.scrollTarget!==void 0?{}:{tabindex:0});L(f,()=>{u()}),L(()=>e.scrollTarget,()=>{y(),w()});function q(){return r.value.$el||r.value}function P(){return d}function w(){d=_t(q(),e.scrollTarget),d.addEventListener("scroll",S,Be.passive)}function y(){d!==void 0&&(d.removeEventListener("scroll",S,Be.passive),d=void 0)}function B(){let O=v(e.type==="list"?"div":"tbody",n.value.map(l.default));return l.before!==void 0&&(O=l.before().concat(O)),Ae(l.after,O)}return je(()=>{u()}),Me(()=>{w()}),ht(()=>{w()}),wt(()=>{y()}),Ee(()=>{y()}),()=>{if(l.default===void 0){console.error("QVirtualScroll: default scoped slot is required for rendering");return}return e.type==="__qtable"?pe({ref:r,class:"q-table__middle "+b.value},B()):o(Mt[e.type],{...a,ref:r,class:[a.class,b.value],..._.value},B)}}});const Nt={xs:2,sm:4,md:6,lg:10,xl:14};function $e(e,l,a){return{transform:l===!0?`translateX(${a.lang.rtl===!0?"-":""}100%) scale3d(${-e},1,1)`:`scale3d(${e},1,1)`}}var Ht=H({name:"QLinearProgress",props:{...le,...qt,value:{type:Number,default:0},buffer:Number,color:String,trackColor:String,reverse:Boolean,stripe:Boolean,indeterminate:Boolean,query:Boolean,rounded:Boolean,animationSpeed:{type:[String,Number],default:2100},instantFeedback:Boolean},setup(e,{slots:l}){const{proxy:a}=M(),d=ae(e,a.$q),r=Pt(e,Nt),f=c(()=>e.indeterminate===!0||e.query===!0),s=c(()=>e.reverse!==e.query),u=c(()=>({...r.value!==null?r.value:{},"--q-linear-progress-speed":`${e.animationSpeed}ms`})),v=c(()=>"q-linear-progress"+(e.color!==void 0?` text-${e.color}`:"")+(e.reverse===!0||e.query===!0?" q-linear-progress--reverse":"")+(e.rounded===!0?" rounded-borders":"")),S=c(()=>$e(e.buffer!==void 0?e.buffer:1,s.value,a.$q)),n=c(()=>`with${e.instantFeedback===!0?"out":""}-transition`),b=c(()=>`q-linear-progress__track absolute-full q-linear-progress__track--${n.value} q-linear-progress__track--${d.value===!0?"dark":"light"}`+(e.trackColor!==void 0?` bg-${e.trackColor}`:"")),_=c(()=>$e(f.value===!0?1:e.value,s.value,a.$q)),q=c(()=>`q-linear-progress__model absolute-full q-linear-progress__model--${n.value} q-linear-progress__model--${f.value===!0?"in":""}determinate`),P=c(()=>({width:`${e.value*100}%`})),w=c(()=>`q-linear-progress__stripe absolute-${e.reverse===!0?"right":"left"} q-linear-progress__stripe--${n.value}`);return()=>{const y=[o("div",{class:b.value,style:S.value}),o("div",{class:q.value,style:_.value})];return e.stripe===!0&&f.value===!1&&y.push(o("div",{class:w.value,style:P.value})),o("div",{class:v.value,style:u.value,role:"progressbar","aria-valuemin":0,"aria-valuemax":1,"aria-valuenow":e.indeterminate===!0?void 0:e.value},Ae(l.default,y))}}});let z=0;const Qt={fullscreen:Boolean,noRouteFullscreenExit:Boolean},zt=["update:fullscreen","fullscreen"];function pt(){const e=M(),{props:l,emit:a,proxy:d}=e;let r,f,s;const u=j(!1);Ct(e)===!0&&L(()=>d.$route.fullPath,()=>{l.noRouteFullscreenExit!==!0&&n()}),L(()=>l.fullscreen,b=>{u.value!==b&&v()}),L(u,b=>{a("update:fullscreen",b),a("fullscreen",b)});function v(){u.value===!0?n():S()}function S(){u.value!==!0&&(u.value=!0,s=d.$el.parentNode,s.replaceChild(f,d.$el),document.body.appendChild(d.$el),z++,z===1&&document.body.classList.add("q-body--fullscreen-mixin"),r={handler:n},Oe.add(r))}function n(){u.value===!0&&(r!==void 0&&(Oe.remove(r),r=void 0),s.replaceChild(d.$el,f),u.value=!1,z=Math.max(0,z-1),z===0&&(document.body.classList.remove("q-body--fullscreen-mixin"),d.$el.scrollIntoView!==void 0&&setTimeout(()=>{d.$el.scrollIntoView()})))}return je(()=>{f=document.createElement("span")}),Me(()=>{l.fullscreen===!0&&S()}),Ee(n),Object.assign(d,{toggleFullscreen:v,setFullscreen:S,exitFullscreen:n}),{inFullscreen:u,toggleFullscreen:v}}function Ut(e,l){return new Date(e)-new Date(l)}const It={sortMethod:Function,binaryStateSort:Boolean,columnSortOrder:{type:String,validator:e=>e==="ad"||e==="da",default:"ad"}};function Kt(e,l,a,d){const r=c(()=>{const{sortBy:u}=l.value;return u&&a.value.find(v=>v.name===u)||null}),f=c(()=>e.sortMethod!==void 0?e.sortMethod:(u,v,S)=>{const n=a.value.find(q=>q.name===v);if(n===void 0||n.field===void 0)return u;const b=S===!0?-1:1,_=typeof n.field=="function"?q=>n.field(q):q=>q[n.field];return u.sort((q,P)=>{let w=_(q),y=_(P);return n.rawSort!==void 0?n.rawSort(w,y,q,P)*b:w==null?-1*b:y==null?1*b:n.sort!==void 0?n.sort(w,y,q,P)*b:Se(w)===!0&&Se(y)===!0?(w-y)*b:Fe(w)===!0&&Fe(y)===!0?Ut(w,y)*b:typeof w=="boolean"&&typeof y=="boolean"?(w-y)*b:([w,y]=[w,y].map(B=>(B+"").toLocaleString().toLowerCase()),w<y?-1*b:w===y?0:b)})});function s(u){let v=e.columnSortOrder;if(kt(u)===!0)u.sortOrder&&(v=u.sortOrder),u=u.name;else{const b=a.value.find(_=>_.name===u);b!==void 0&&b.sortOrder&&(v=b.sortOrder)}let{sortBy:S,descending:n}=l.value;S!==u?(S=u,n=v==="da"):e.binaryStateSort===!0?n=!n:n===!0?v==="ad"?S=null:n=!1:v==="ad"?n=!0:S=null,d({sortBy:S,descending:n,page:1})}return{columnToSort:r,computedSortMethod:f,sort:s}}const Gt={filter:[String,Object],filterMethod:Function};function Wt(e,l){const a=c(()=>e.filterMethod!==void 0?e.filterMethod:(d,r,f,s)=>{const u=r?r.toLowerCase():"";return d.filter(v=>f.some(S=>{const n=s(S,v)+"";return(n==="undefined"||n==="null"?"":n.toLowerCase()).indexOf(u)!==-1}))});return L(()=>e.filter,()=>{Ne(()=>{l({page:1},!0)})},{deep:!0}),{computedFilterMethod:a}}function Jt(e,l){for(const a in l)if(l[a]!==e[a])return!1;return!0}function De(e){return e.page<1&&(e.page=1),e.rowsPerPage!==void 0&&e.rowsPerPage<1&&(e.rowsPerPage=0),e}const Xt={pagination:Object,rowsPerPageOptions:{type:Array,default:()=>[5,7,10,15,20,25,50,0]},"onUpdate:pagination":[Function,Array]};function Yt(e,l){const{props:a,emit:d}=e,r=j(Object.assign({sortBy:null,descending:!1,page:1,rowsPerPage:a.rowsPerPageOptions.length!==0?a.rowsPerPageOptions[0]:5},a.pagination)),f=c(()=>{const n=a["onUpdate:pagination"]!==void 0?{...r.value,...a.pagination}:r.value;return De(n)}),s=c(()=>f.value.rowsNumber!==void 0);function u(n){v({pagination:n,filter:a.filter})}function v(n={}){Ne(()=>{d("request",{pagination:n.pagination||f.value,filter:n.filter||a.filter,getCellValue:l})})}function S(n,b){const _=De({...f.value,...n});if(Jt(f.value,_)===!0){s.value===!0&&b===!0&&u(_);return}if(s.value===!0){u(_);return}a.pagination!==void 0&&a["onUpdate:pagination"]!==void 0?d("update:pagination",_):r.value=_}return{innerPagination:r,computedPagination:f,isServerSide:s,requestServerInteraction:v,setPagination:S}}function Zt(e,l,a,d,r,f){const{props:s,emit:u,proxy:{$q:v}}=e,S=c(()=>d.value===!0?a.value.rowsNumber||0:f.value),n=c(()=>{const{page:R,rowsPerPage:x}=a.value;return(R-1)*x}),b=c(()=>{const{page:R,rowsPerPage:x}=a.value;return R*x}),_=c(()=>a.value.page===1),q=c(()=>a.value.rowsPerPage===0?1:Math.max(1,Math.ceil(S.value/a.value.rowsPerPage))),P=c(()=>b.value===0?!0:a.value.page>=q.value),w=c(()=>(s.rowsPerPageOptions.includes(l.value.rowsPerPage)?s.rowsPerPageOptions:[l.value.rowsPerPage].concat(s.rowsPerPageOptions)).map(x=>({label:x===0?v.lang.table.allRows:""+x,value:x})));L(q,(R,x)=>{if(R===x)return;const p=a.value.page;R&&!p?r({page:1}):R<p&&r({page:R})});function y(){r({page:1})}function B(){const{page:R}=a.value;R>1&&r({page:R-1})}function O(){const{page:R,rowsPerPage:x}=a.value;b.value>0&&R*x<S.value&&r({page:R+1})}function F(){r({page:q.value})}return s["onUpdate:pagination"]!==void 0&&u("update:pagination",{...a.value}),{firstRowIndex:n,lastRowIndex:b,isFirstPage:_,isLastPage:P,pagesNumber:q,computedRowsPerPageOptions:w,computedRowsNumber:S,firstPage:y,prevPage:B,nextPage:O,lastPage:F}}const el={selection:{type:String,default:"none",validator:e=>["single","multiple","none"].includes(e)},selected:{type:Array,default:()=>[]}},tl=["update:selected","selection"];function ll(e,l,a,d){const r=c(()=>{const P={};return e.selected.map(d.value).forEach(w=>{P[w]=!0}),P}),f=c(()=>e.selection!=="none"),s=c(()=>e.selection==="single"),u=c(()=>e.selection==="multiple"),v=c(()=>a.value.length!==0&&a.value.every(P=>r.value[d.value(P)]===!0)),S=c(()=>v.value!==!0&&a.value.some(P=>r.value[d.value(P)]===!0)),n=c(()=>e.selected.length);function b(P){return r.value[P]===!0}function _(){l("update:selected",[])}function q(P,w,y,B){l("selection",{rows:w,added:y,keys:P,evt:B});const O=s.value===!0?y===!0?w:[]:y===!0?e.selected.concat(w):e.selected.filter(F=>P.includes(d.value(F))===!1);l("update:selected",O)}return{hasSelectionMode:f,singleSelection:s,multipleSelection:u,allRowsSelected:v,someRowsSelected:S,rowsSelectedNumber:n,isRowSelected:b,clearSelection:_,updateSelection:q}}function Le(e){return Array.isArray(e)?e.slice():[]}const al={expanded:Array},nl=["update:expanded"];function rl(e,l){const a=j(Le(e.expanded));L(()=>e.expanded,s=>{a.value=Le(s)});function d(s){return a.value.includes(s)}function r(s){e.expanded!==void 0?l("update:expanded",s):a.value=s}function f(s,u){const v=a.value.slice(),S=v.indexOf(s);u===!0?S===-1&&(v.push(s),r(v)):S!==-1&&(v.splice(S,1),r(v))}return{isRowExpanded:d,setExpanded:r,updateExpanded:f}}const ol={visibleColumns:Array};function il(e,l,a){const d=c(()=>{if(e.columns!==void 0)return e.columns;const u=e.rows[0];return u!==void 0?Object.keys(u).map(v=>({name:v,label:v.toUpperCase(),field:v,align:Se(u[v])?"right":"left",sortable:!0})):[]}),r=c(()=>{const{sortBy:u,descending:v}=l.value;return(e.visibleColumns!==void 0?d.value.filter(n=>n.required===!0||e.visibleColumns.includes(n.name)===!0):d.value).map(n=>{const b=n.align||"right",_=`text-${b}`;return{...n,align:b,__iconClass:`q-table__sort-icon q-table__sort-icon--${b}`,__thClass:_+(n.headerClasses!==void 0?" "+n.headerClasses:"")+(n.sortable===!0?" sortable":"")+(n.name===u?` sorted ${v===!0?"sort-desc":""}`:""),__tdStyle:n.style!==void 0?typeof n.style!="function"?()=>n.style:n.style:()=>null,__tdClass:n.classes!==void 0?typeof n.classes!="function"?()=>_+" "+n.classes:q=>_+" "+n.classes(q):()=>_}})}),f=c(()=>{const u={};return r.value.forEach(v=>{u[v.name]=v}),u}),s=c(()=>e.tableColspan!==void 0?e.tableColspan:r.value.length+(a.value===!0?1:0));return{colList:d,computedCols:r,computedColsMap:f,computedColspan:s}}const ee="q-table__bottom row items-center",Ue={};He.forEach(e=>{Ue[e]={}});var cl=H({name:"QTable",props:{rows:{type:Array,required:!0},rowKey:{type:[String,Function],default:"id"},columns:Array,loading:Boolean,iconFirstPage:String,iconPrevPage:String,iconNextPage:String,iconLastPage:String,title:String,hideHeader:Boolean,grid:Boolean,gridHeader:Boolean,dense:Boolean,flat:Boolean,bordered:Boolean,square:Boolean,separator:{type:String,default:"horizontal",validator:e=>["horizontal","vertical","cell","none"].includes(e)},wrapCells:Boolean,virtualScroll:Boolean,virtualScrollTarget:{},...Ue,noDataLabel:String,noResultsLabel:String,loadingLabel:String,selectedRowsLabel:Function,rowsPerPageLabel:String,paginationLabel:Function,color:{type:String,default:"grey-8"},titleClass:[String,Array,Object],tableStyle:[String,Array,Object],tableClass:[String,Array,Object],tableHeaderStyle:[String,Array,Object],tableHeaderClass:[String,Array,Object],cardContainerClass:[String,Array,Object],cardContainerStyle:[String,Array,Object],cardStyle:[String,Array,Object],cardClass:[String,Array,Object],hideBottom:Boolean,hideSelectedBanner:Boolean,hideNoData:Boolean,hidePagination:Boolean,onRowClick:Function,onRowDblclick:Function,onRowContextmenu:Function,...le,...Qt,...ol,...Gt,...Xt,...al,...el,...It},emits:["request","virtualScroll",...zt,...nl,...tl],setup(e,{slots:l,emit:a}){const d=M(),{proxy:{$q:r}}=d,f=ae(e,r),{inFullscreen:s,toggleFullscreen:u}=pt(),v=c(()=>typeof e.rowKey=="function"?e.rowKey:t=>t[e.rowKey]),S=j(null),n=j(null),b=c(()=>e.grid!==!0&&e.virtualScroll===!0),_=c(()=>" q-table__card"+(f.value===!0?" q-table__card--dark q-dark":"")+(e.square===!0?" q-table--square":"")+(e.flat===!0?" q-table--flat":"")+(e.bordered===!0?" q-table--bordered":"")),q=c(()=>`q-table__container q-table--${e.separator}-separator column no-wrap`+(e.grid===!0?" q-table--grid":_.value)+(f.value===!0?" q-table--dark":"")+(e.dense===!0?" q-table--dense":"")+(e.wrapCells===!1?" q-table--no-wrap":"")+(s.value===!0?" fullscreen scroll":"")),P=c(()=>q.value+(e.loading===!0?" q-table--loading":""));L(()=>e.tableStyle+e.tableClass+e.tableHeaderStyle+e.tableHeaderClass+q.value,()=>{b.value===!0&&n.value!==null&&n.value.reset()});const{innerPagination:w,computedPagination:y,isServerSide:B,requestServerInteraction:O,setPagination:F}=Yt(d,A),{computedFilterMethod:R}=Wt(e,F),{isRowExpanded:x,setExpanded:p,updateExpanded:Ie}=rl(e,a),ne=c(()=>{let t=e.rows;if(B.value===!0||t.length===0)return t;const{sortBy:i,descending:g}=y.value;return e.filter&&(t=R.value(t,e.filter,$.value,A)),Xe.value!==null&&(t=Ye.value(e.rows===t?t.slice():t,i,g)),t}),ye=c(()=>ne.value.length),V=c(()=>{let t=ne.value;if(B.value===!0)return t;const{rowsPerPage:i}=y.value;return i!==0&&(I.value===0&&e.rows!==t?t.length>K.value&&(t=t.slice(0,K.value)):t=t.slice(I.value,K.value)),t}),{hasSelectionMode:E,singleSelection:Ke,multipleSelection:he,allRowsSelected:Ge,someRowsSelected:we,rowsSelectedNumber:re,isRowSelected:oe,clearSelection:We,updateSelection:U}=ll(e,a,V,v),{colList:Je,computedCols:$,computedColsMap:_e,computedColspan:qe}=il(e,y,E),{columnToSort:Xe,computedSortMethod:Ye,sort:ie}=Kt(e,y,Je,F),{firstRowIndex:I,lastRowIndex:K,isFirstPage:se,isLastPage:ue,pagesNumber:G,computedRowsPerPageOptions:Ze,computedRowsNumber:W,firstPage:ce,prevPage:de,nextPage:ve,lastPage:fe}=Zt(d,w,y,B,F,ye),et=c(()=>V.value.length===0),tt=c(()=>{const t={};return He.forEach(i=>{t[i]=e[i]}),t.virtualScrollItemSize===void 0&&(t.virtualScrollItemSize=e.dense===!0?28:48),t});function lt(){b.value===!0&&n.value.reset()}function at(){if(e.grid===!0)return bt();const t=e.hideHeader!==!0?xe:null;if(b.value===!0){const g=l["top-row"],m=l["bottom-row"],h={default:k=>Ce(k.item,l.body,k.index)};if(g!==void 0){const k=o("tbody",g({cols:$.value}));h.before=t===null?()=>k:()=>[t()].concat(k)}else t!==null&&(h.before=t);return m!==void 0&&(h.after=()=>o("tbody",m({cols:$.value}))),o(At,{ref:n,class:e.tableClass,style:e.tableStyle,...tt.value,scrollTarget:e.virtualScrollTarget,items:V.value,type:"__qtable",tableColspan:qe.value,onVirtualScroll:rt},h)}const i=[ot()];return t!==null&&i.unshift(t()),pe({class:["q-table__middle scroll",e.tableClass],style:e.tableStyle},i)}function nt(t,i){if(n.value!==null){n.value.scrollTo(t,i);return}t=parseInt(t,10);const g=S.value.querySelector(`tbody tr:nth-of-type(${t+1})`);if(g!==null){const m=S.value.querySelector(".q-table__middle.scroll"),h=g.offsetTop-e.virtualScrollStickySizeStart,k=h<m.scrollTop?"decrease":"increase";m.scrollTop=h,a("virtualScroll",{index:t,from:0,to:w.value.rowsPerPage-1,direction:k})}}function rt(t){a("virtualScroll",t)}function Pe(){return[o(Ht,{class:"q-table__linear-progress",color:e.color,dark:f.value,indeterminate:!0,trackColor:"transparent"})]}function Ce(t,i,g){const m=v.value(t),h=oe(m);if(i!==void 0)return i(ke({key:m,row:t,pageIndex:g,__trClass:h?"selected":""}));const k=l["body-cell"],C=$.value.map(T=>{const X=l[`body-cell-${T.name}`],Y=X!==void 0?X:k;return Y!==void 0?Y(it({key:m,row:t,pageIndex:g,col:T})):o("td",{class:T.__tdClass(t),style:T.__tdStyle(t)},A(T,t))});if(E.value===!0){const T=l["body-selection"],X=T!==void 0?T(st({key:m,row:t,pageIndex:g})):[o(me,{modelValue:h,color:e.color,dark:f.value,dense:e.dense,"onUpdate:modelValue":(Y,mt)=>{U([m],[t],Y,mt)}})];C.unshift(o("td",{class:"q-table--col-auto-width"},X))}const D={key:m,class:{selected:h}};return e.onRowClick!==void 0&&(D.class["cursor-pointer"]=!0,D.onClick=T=>{a("rowClick",T,t,g)}),e.onRowDblclick!==void 0&&(D.class["cursor-pointer"]=!0,D.onDblclick=T=>{a("rowDblclick",T,t,g)}),e.onRowContextmenu!==void 0&&(D.class["cursor-pointer"]=!0,D.onContextmenu=T=>{a("rowContextmenu",T,t,g)}),o("tr",D,C)}function ot(){const t=l.body,i=l["top-row"],g=l["bottom-row"];let m=V.value.map((h,k)=>Ce(h,t,k));return i!==void 0&&(m=i({cols:$.value}).concat(m)),g!==void 0&&(m=m.concat(g({cols:$.value}))),o("tbody",m)}function ke(t){return ge(t),t.cols=t.cols.map(i=>Q({...i},"value",()=>A(i,t.row))),t}function it(t){return ge(t),Q(t,"value",()=>A(t.col,t.row)),t}function st(t){return ge(t),t}function ge(t){Object.assign(t,{cols:$.value,colsMap:_e.value,sort:ie,rowIndex:I.value+t.pageIndex,color:e.color,dark:f.value,dense:e.dense}),E.value===!0&&Q(t,"selected",()=>oe(t.key),(i,g)=>{U([t.key],[t.row],i,g)}),Q(t,"expand",()=>x(t.key),i=>{Ie(t.key,i)})}function A(t,i){const g=typeof t.field=="function"?t.field(i):i[t.field];return t.format!==void 0?t.format(g,i):g}const N=c(()=>({pagination:y.value,pagesNumber:G.value,isFirstPage:se.value,isLastPage:ue.value,firstPage:ce,prevPage:de,nextPage:ve,lastPage:fe,inFullscreen:s.value,toggleFullscreen:u}));function ut(){const t=l.top,i=l["top-left"],g=l["top-right"],m=l["top-selection"],h=E.value===!0&&m!==void 0&&re.value>0,k="q-table__top relative-position row items-center";if(t!==void 0)return o("div",{class:k},[t(N.value)]);let C;if(h===!0?C=m(N.value).slice():(C=[],i!==void 0?C.push(o("div",{class:"q-table__control"},[i(N.value)])):e.title&&C.push(o("div",{class:"q-table__control"},[o("div",{class:["q-table__title",e.titleClass]},e.title)]))),g!==void 0&&(C.push(o("div",{class:"q-table__separator col"})),C.push(o("div",{class:"q-table__control"},[g(N.value)]))),C.length!==0)return o("div",{class:k},C)}const Re=c(()=>we.value===!0?null:Ge.value);function xe(){const t=ct();return e.loading===!0&&l.loading===void 0&&t.push(o("tr",{class:"q-table__progress"},[o("th",{class:"relative-position",colspan:qe.value},Pe())])),o("thead",t)}function ct(){const t=l.header,i=l["header-cell"];if(t!==void 0)return t(be({header:!0})).slice();const g=$.value.map(m=>{const h=l[`header-cell-${m.name}`],k=h!==void 0?h:i,C=be({col:m});return k!==void 0?k(C):o(Lt,{key:m.name,props:C},()=>m.label)});if(Ke.value===!0&&e.grid!==!0)g.unshift(o("th",{class:"q-table--col-auto-width"}," "));else if(he.value===!0){const m=l["header-selection"],h=m!==void 0?m(be({})):[o(me,{color:e.color,modelValue:Re.value,dark:f.value,dense:e.dense,"onUpdate:modelValue":Te})];g.unshift(o("th",{class:"q-table--col-auto-width"},h))}return[o("tr",{class:e.tableHeaderClass,style:e.tableHeaderStyle},g)]}function be(t){return Object.assign(t,{cols:$.value,sort:ie,colsMap:_e.value,color:e.color,dark:f.value,dense:e.dense}),he.value===!0&&Q(t,"selected",()=>Re.value,Te),t}function Te(t){we.value===!0&&(t=!1),U(V.value.map(v.value),V.value,t)}const J=c(()=>{const t=[e.iconFirstPage||r.iconSet.table.firstPage,e.iconPrevPage||r.iconSet.table.prevPage,e.iconNextPage||r.iconSet.table.nextPage,e.iconLastPage||r.iconSet.table.lastPage];return r.lang.rtl===!0?t.reverse():t});function dt(){if(e.hideBottom===!0)return;if(et.value===!0){if(e.hideNoData===!0)return;const g=e.loading===!0?e.loadingLabel||r.lang.table.loading:e.filter?e.noResultsLabel||r.lang.table.noResults:e.noDataLabel||r.lang.table.noData,m=l["no-data"],h=m!==void 0?[m({message:g,icon:r.iconSet.table.warning,filter:e.filter})]:[o(Ve,{class:"q-table__bottom-nodata-icon",name:r.iconSet.table.warning}),g];return o("div",{class:ee+" q-table__bottom--nodata"},h)}const t=l.bottom;if(t!==void 0)return o("div",{class:ee},[t(N.value)]);const i=e.hideSelectedBanner!==!0&&E.value===!0&&re.value>0?[o("div",{class:"q-table__control"},[o("div",[(e.selectedRowsLabel||r.lang.table.selectedRecords)(re.value)])])]:[];if(e.hidePagination!==!0)return o("div",{class:ee+" justify-end"},ft(i));if(i.length!==0)return o("div",{class:ee},i)}function vt(t){F({page:1,rowsPerPage:t.value})}function ft(t){let i;const{rowsPerPage:g}=y.value,m=e.paginationLabel||r.lang.table.pagination,h=l.pagination,k=e.rowsPerPageOptions.length>1;if(t.push(o("div",{class:"q-table__separator col"})),k===!0&&t.push(o("div",{class:"q-table__control"},[o("span",{class:"q-table__bottom-item"},[e.rowsPerPageLabel||r.lang.table.recordsPerPage]),o(Ot,{class:"q-table__select inline q-table__bottom-item",color:e.color,modelValue:g,options:Ze.value,displayValue:g===0?r.lang.table.allRows:g,dark:f.value,borderless:!0,dense:!0,optionsDense:!0,optionsCover:!0,"onUpdate:modelValue":vt})])),h!==void 0)i=h(N.value);else if(i=[o("span",g!==0?{class:"q-table__bottom-item"}:{},[g?m(I.value+1,Math.min(K.value,W.value),W.value):m(1,ye.value,W.value)])],g!==0&&G.value>1){const C={color:e.color,round:!0,dense:!0,flat:!0};e.dense===!0&&(C.size="sm"),G.value>2&&i.push(o(Z,{key:"pgFirst",...C,icon:J.value[0],disable:se.value,onClick:ce})),i.push(o(Z,{key:"pgPrev",...C,icon:J.value[1],disable:se.value,onClick:de}),o(Z,{key:"pgNext",...C,icon:J.value[2],disable:ue.value,onClick:ve})),G.value>2&&i.push(o(Z,{key:"pgLast",...C,icon:J.value[3],disable:ue.value,onClick:fe}))}return t.push(o("div",{class:"q-table__control"},i)),t}function gt(){const t=e.gridHeader===!0?[o("table",{class:"q-table"},[xe()])]:e.loading===!0&&l.loading===void 0?Pe():void 0;return o("div",{class:"q-table__middle"},t)}function bt(){const t=l.item!==void 0?l.item:i=>{const g=i.cols.map(h=>o("div",{class:"q-table__grid-item-row"},[o("div",{class:"q-table__grid-item-title"},[h.label]),o("div",{class:"q-table__grid-item-value"},[h.value])]));if(E.value===!0){const h=l["body-selection"],k=h!==void 0?h(i):[o(me,{modelValue:i.selected,color:e.color,dark:f.value,dense:e.dense,"onUpdate:modelValue":(C,D)=>{U([i.key],[i.row],C,D)}})];g.unshift(o("div",{class:"q-table__grid-item-row"},k),o(xt,{dark:f.value}))}const m={class:["q-table__grid-item-card"+_.value,e.cardClass],style:e.cardStyle};return(e.onRowClick!==void 0||e.onRowDblclick!==void 0)&&(m.class[0]+=" cursor-pointer",e.onRowClick!==void 0&&(m.onClick=h=>{a("RowClick",h,i.row,i.pageIndex)}),e.onRowDblclick!==void 0&&(m.onDblclick=h=>{a("RowDblclick",h,i.row,i.pageIndex)})),o("div",{class:"q-table__grid-item col-xs-12 col-sm-6 col-md-4 col-lg-3"+(i.selected===!0?" q-table__grid-item--selected":"")},[o("div",m,g)])};return o("div",{class:["q-table__grid-content row",e.cardContainerClass],style:e.cardContainerStyle},V.value.map((i,g)=>t(ke({key:v.value(i),row:i,pageIndex:g}))))}return Object.assign(d.proxy,{requestServerInteraction:O,setPagination:F,firstPage:ce,prevPage:de,nextPage:ve,lastPage:fe,isRowSelected:oe,clearSelection:We,isRowExpanded:x,setExpanded:p,sort:ie,resetVirtualScroll:lt,scrollTo:nt,getCellValue:A}),Rt(d.proxy,{filteredSortedRows:()=>ne.value,computedRows:()=>V.value,computedRowsNumber:()=>W.value}),()=>{const t=[ut()],i={ref:S,class:P.value};return e.grid===!0?t.push(gt()):Object.assign(i,{class:[i.class,e.cardClass],style:e.cardStyle}),t.push(at(),dt()),e.loading===!0&&l.loading!==void 0&&t.push(l.loading()),o("div",i,t)}}});export{Ft as Q,cl as a,Lt as b,Qt as c,zt as d,pt as e,Dt as g,Qe as u};
