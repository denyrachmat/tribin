import{c as N,ad as le,af as ae,a as c,h as r,d as te,g as Q,H as bt,at as Ve,s as mt,t as A,w as D,aj as Me,o as je,al as St,ak as yt,j as Ee,k as ht,m as Be,z as Ae,aq as _t,ar as wt,aF as qt,aG as Fe,aH as Se,aI as Oe,aJ as Pt,G as Ne,aK as Ct,a0 as me,aL as H,Q as Z,aM as kt}from"./index.cbc0c0ec.js";import{u as Rt,c as xt,d as Qe,e as Tt}from"./QSelect.c785006f.js";var Bt=N({name:"QList",props:{...le,bordered:Boolean,dense:Boolean,separator:Boolean,padding:Boolean,tag:{type:String,default:"div"}},setup(e,{slots:a}){const n=Q(),v=ae(e,n.proxy.$q),o=c(()=>"q-list"+(e.bordered===!0?" q-list--bordered":"")+(e.dense===!0?" q-list--dense":"")+(e.separator===!0?" q-list--separator":"")+(v.value===!0?" q-list--dark":"")+(e.padding===!0?" q-list--padding":""));return()=>r(e.tag,{class:o.value},te(a.default))}}),Ft=N({name:"QTh",props:{props:Object,autoWidth:Boolean},emits:["click"],setup(e,{slots:a,emit:n}){const v=Q(),{proxy:{$q:o}}=v,g=s=>{n("click",s)};return()=>{if(e.props===void 0)return r("th",{class:e.autoWidth===!0?"q-table--col-auto-width":"",onClick:g},te(a.default));let s,u;const d=v.vnode.key;if(d){if(s=e.props.colsMap[d],s===void 0)return}else s=e.props.col;if(s.sortable===!0){const l=s.align==="right"?"unshift":"push";u=bt(a.default,[]),u[l](r(Ve,{class:s.__iconClass,name:o.iconSet.table.arrowUp}))}else u=te(a.default);const S={class:s.__thClass+(e.autoWidth===!0?" q-table--col-auto-width":""),style:s.headerStyle,onClick:l=>{s.sortable===!0&&e.props.sort(s),g(l)}};return r("th",S,u)}}});const Ot=["horizontal","vertical","cell","none"];var $t=N({name:"QMarkupTable",props:{...le,dense:Boolean,flat:Boolean,bordered:Boolean,square:Boolean,wrapCells:Boolean,separator:{type:String,default:"horizontal",validator:e=>Ot.includes(e)}},setup(e,{slots:a}){const n=Q(),v=ae(e,n.proxy.$q),o=c(()=>`q-markup-table q-table__container q-table__card q-table--${e.separator}-separator`+(v.value===!0?" q-table--dark q-table__card--dark q-dark":"")+(e.dense===!0?" q-table--dense":"")+(e.flat===!0?" q-table--flat":"")+(e.bordered===!0?" q-table--bordered":"")+(e.square===!0?" q-table--square":"")+(e.wrapCells===!1?" q-table--no-wrap":""));return()=>r("div",{class:o.value},[r("table",{class:"q-table"},te(a.default))])}});function He(e,a){return r("div",e,[r("table",{class:"q-table"},a)])}const Lt={list:Bt,table:$t},Dt=["list","table","__qtable"];var Vt=N({name:"QVirtualScroll",props:{...Rt,type:{type:String,default:"list",validator:e=>Dt.includes(e)},items:{type:Array,default:()=>[]},itemsFn:Function,itemsSize:Number,scrollTarget:mt},setup(e,{slots:a,attrs:n}){let v;const o=A(null),g=c(()=>e.itemsSize>=0&&e.itemsFn!==void 0?parseInt(e.itemsSize,10):Array.isArray(e.items)?e.items.length:0),{virtualScrollSliceRange:s,localResetVirtualScroll:u,padVirtualScroll:d,onVirtualScrollEvt:S}=xt({virtualScrollLength:g,getVirtualScrollTarget:P,getVirtualScrollEl:q}),l=c(()=>{if(g.value===0)return[];const F=(O,R)=>({index:s.value.from+R,item:O});return e.itemsFn===void 0?e.items.slice(s.value.from,s.value.to).map(F):e.itemsFn(s.value.from,s.value.to-s.value.from).map(F)}),b=c(()=>"q-virtual-scroll q-virtual-scroll"+(e.virtualScrollHorizontal===!0?"--horizontal":"--vertical")+(e.scrollTarget!==void 0?"":" scroll")),w=c(()=>e.scrollTarget!==void 0?{}:{tabindex:0});D(g,()=>{u()}),D(()=>e.scrollTarget,()=>{y(),_()});function q(){return o.value.$el||o.value}function P(){return v}function _(){v=ht(q(),e.scrollTarget),v.addEventListener("scroll",S,Be.passive)}function y(){v!==void 0&&(v.removeEventListener("scroll",S,Be.passive),v=void 0)}function B(){let F=d(e.type==="list"?"div":"tbody",l.value.map(a.default));return a.before!==void 0&&(F=a.before().concat(F)),Ae(a.after,F)}return Me(()=>{u()}),je(()=>{_()}),St(()=>{_()}),yt(()=>{y()}),Ee(()=>{y()}),()=>{if(a.default===void 0){console.error("QVirtualScroll: default scoped slot is required for rendering");return}return e.type==="__qtable"?He({ref:o,class:"q-table__middle "+b.value},B()):r(Lt[e.type],{...n,ref:o,class:[n.class,b.value],...w.value},B)}}});const Mt={xs:2,sm:4,md:6,lg:10,xl:14};function $e(e,a,n){return{transform:a===!0?`translateX(${n.lang.rtl===!0?"-":""}100%) scale3d(${-e},1,1)`:`scale3d(${e},1,1)`}}var jt=N({name:"QLinearProgress",props:{...le,..._t,value:{type:Number,default:0},buffer:Number,color:String,trackColor:String,reverse:Boolean,stripe:Boolean,indeterminate:Boolean,query:Boolean,rounded:Boolean,animationSpeed:{type:[String,Number],default:2100},instantFeedback:Boolean},setup(e,{slots:a}){const{proxy:n}=Q(),v=ae(e,n.$q),o=wt(e,Mt),g=c(()=>e.indeterminate===!0||e.query===!0),s=c(()=>e.reverse!==e.query),u=c(()=>({...o.value!==null?o.value:{},"--q-linear-progress-speed":`${e.animationSpeed}ms`})),d=c(()=>"q-linear-progress"+(e.color!==void 0?` text-${e.color}`:"")+(e.reverse===!0||e.query===!0?" q-linear-progress--reverse":"")+(e.rounded===!0?" rounded-borders":"")),S=c(()=>$e(e.buffer!==void 0?e.buffer:1,s.value,n.$q)),l=c(()=>`with${e.instantFeedback===!0?"out":""}-transition`),b=c(()=>`q-linear-progress__track absolute-full q-linear-progress__track--${l.value} q-linear-progress__track--${v.value===!0?"dark":"light"}`+(e.trackColor!==void 0?` bg-${e.trackColor}`:"")),w=c(()=>$e(g.value===!0?1:e.value,s.value,n.$q)),q=c(()=>`q-linear-progress__model absolute-full q-linear-progress__model--${l.value} q-linear-progress__model--${g.value===!0?"in":""}determinate`),P=c(()=>({width:`${e.value*100}%`})),_=c(()=>`q-linear-progress__stripe absolute-${e.reverse===!0?"right":"left"} q-linear-progress__stripe--${l.value}`);return()=>{const y=[r("div",{class:b.value,style:S.value}),r("div",{class:q.value,style:w.value})];return e.stripe===!0&&g.value===!1&&y.push(r("div",{class:_.value,style:P.value})),r("div",{class:d.value,style:u.value,role:"progressbar","aria-valuemin":0,"aria-valuemax":1,"aria-valuenow":e.indeterminate===!0?void 0:e.value},Ae(a.default,y))}}});let z=0;const Et={fullscreen:Boolean,noRouteFullscreenExit:Boolean},At=["update:fullscreen","fullscreen"];function Nt(){const e=Q(),{props:a,emit:n,proxy:v}=e;let o,g,s;const u=A(!1);qt(e)===!0&&D(()=>v.$route.fullPath,()=>{a.noRouteFullscreenExit!==!0&&l()}),D(()=>a.fullscreen,b=>{u.value!==b&&d()}),D(u,b=>{n("update:fullscreen",b),n("fullscreen",b)});function d(){u.value===!0?l():S()}function S(){u.value!==!0&&(u.value=!0,s=v.$el.parentNode,s.replaceChild(g,v.$el),document.body.appendChild(v.$el),z++,z===1&&document.body.classList.add("q-body--fullscreen-mixin"),o={handler:l},Fe.add(o))}function l(){u.value===!0&&(o!==void 0&&(Fe.remove(o),o=void 0),s.replaceChild(v.$el,g),u.value=!1,z=Math.max(0,z-1),z===0&&(document.body.classList.remove("q-body--fullscreen-mixin"),v.$el.scrollIntoView!==void 0&&setTimeout(()=>{v.$el.scrollIntoView()})))}return Me(()=>{g=document.createElement("span")}),je(()=>{a.fullscreen===!0&&S()}),Ee(l),Object.assign(v,{toggleFullscreen:d,setFullscreen:S,exitFullscreen:l}),{inFullscreen:u,toggleFullscreen:d}}function Qt(e,a){return new Date(e)-new Date(a)}const Ht={sortMethod:Function,binaryStateSort:Boolean,columnSortOrder:{type:String,validator:e=>e==="ad"||e==="da",default:"ad"}};function zt(e,a,n,v){const o=c(()=>{const{sortBy:u}=a.value;return u&&n.value.find(d=>d.name===u)||null}),g=c(()=>e.sortMethod!==void 0?e.sortMethod:(u,d,S)=>{const l=n.value.find(q=>q.name===d);if(l===void 0||l.field===void 0)return u;const b=S===!0?-1:1,w=typeof l.field=="function"?q=>l.field(q):q=>q[l.field];return u.sort((q,P)=>{let _=w(q),y=w(P);return l.rawSort!==void 0?l.rawSort(_,y,q,P)*b:_==null?-1*b:y==null?1*b:l.sort!==void 0?l.sort(_,y,q,P)*b:Se(_)===!0&&Se(y)===!0?(_-y)*b:Oe(_)===!0&&Oe(y)===!0?Qt(_,y)*b:typeof _=="boolean"&&typeof y=="boolean"?(_-y)*b:([_,y]=[_,y].map(B=>(B+"").toLocaleString().toLowerCase()),_<y?-1*b:_===y?0:b)})});function s(u){let d=e.columnSortOrder;if(Pt(u)===!0)u.sortOrder&&(d=u.sortOrder),u=u.name;else{const b=n.value.find(w=>w.name===u);b!==void 0&&b.sortOrder&&(d=b.sortOrder)}let{sortBy:S,descending:l}=a.value;S!==u?(S=u,l=d==="da"):e.binaryStateSort===!0?l=!l:l===!0?d==="ad"?S=null:l=!1:d==="ad"?l=!0:S=null,v({sortBy:S,descending:l,page:1})}return{columnToSort:o,computedSortMethod:g,sort:s}}const pt={filter:[String,Object],filterMethod:Function};function Ut(e,a){const n=c(()=>e.filterMethod!==void 0?e.filterMethod:(v,o,g,s)=>{const u=o?o.toLowerCase():"";return v.filter(d=>g.some(S=>{const l=s(S,d)+"";return(l==="undefined"||l==="null"?"":l.toLowerCase()).indexOf(u)!==-1}))});return D(()=>e.filter,()=>{Ne(()=>{a({page:1},!0)})},{deep:!0}),{computedFilterMethod:n}}function It(e,a){for(const n in a)if(a[n]!==e[n])return!1;return!0}function Le(e){return e.page<1&&(e.page=1),e.rowsPerPage!==void 0&&e.rowsPerPage<1&&(e.rowsPerPage=0),e}const Gt={pagination:Object,rowsPerPageOptions:{type:Array,default:()=>[5,7,10,15,20,25,50,0]},"onUpdate:pagination":[Function,Array]};function Kt(e,a){const{props:n,emit:v}=e,o=A(Object.assign({sortBy:null,descending:!1,page:1,rowsPerPage:n.rowsPerPageOptions.length!==0?n.rowsPerPageOptions[0]:5},n.pagination)),g=c(()=>{const l=n["onUpdate:pagination"]!==void 0?{...o.value,...n.pagination}:o.value;return Le(l)}),s=c(()=>g.value.rowsNumber!==void 0);function u(l){d({pagination:l,filter:n.filter})}function d(l={}){Ne(()=>{v("request",{pagination:l.pagination||g.value,filter:l.filter||n.filter,getCellValue:a})})}function S(l,b){const w=Le({...g.value,...l});if(It(g.value,w)===!0){s.value===!0&&b===!0&&u(w);return}if(s.value===!0){u(w);return}n.pagination!==void 0&&n["onUpdate:pagination"]!==void 0?v("update:pagination",w):o.value=w}return{innerPagination:o,computedPagination:g,isServerSide:s,requestServerInteraction:d,setPagination:S}}function Wt(e,a,n,v,o,g){const{props:s,emit:u,proxy:{$q:d}}=e,S=c(()=>v.value===!0?n.value.rowsNumber||0:g.value),l=c(()=>{const{page:R,rowsPerPage:x}=n.value;return(R-1)*x}),b=c(()=>{const{page:R,rowsPerPage:x}=n.value;return R*x}),w=c(()=>n.value.page===1),q=c(()=>n.value.rowsPerPage===0?1:Math.max(1,Math.ceil(S.value/n.value.rowsPerPage))),P=c(()=>b.value===0?!0:n.value.page>=q.value),_=c(()=>(s.rowsPerPageOptions.includes(a.value.rowsPerPage)?s.rowsPerPageOptions:[a.value.rowsPerPage].concat(s.rowsPerPageOptions)).map(x=>({label:x===0?d.lang.table.allRows:""+x,value:x})));D(q,(R,x)=>{if(R===x)return;const p=n.value.page;R&&!p?o({page:1}):R<p&&o({page:R})});function y(){o({page:1})}function B(){const{page:R}=n.value;R>1&&o({page:R-1})}function F(){const{page:R,rowsPerPage:x}=n.value;b.value>0&&R*x<S.value&&o({page:R+1})}function O(){o({page:q.value})}return s["onUpdate:pagination"]!==void 0&&u("update:pagination",{...n.value}),{firstRowIndex:l,lastRowIndex:b,isFirstPage:w,isLastPage:P,pagesNumber:q,computedRowsPerPageOptions:_,computedRowsNumber:S,firstPage:y,prevPage:B,nextPage:F,lastPage:O}}const Jt={selection:{type:String,default:"none",validator:e=>["single","multiple","none"].includes(e)},selected:{type:Array,default:()=>[]}},Xt=["update:selected","selection"];function Yt(e,a,n,v){const o=c(()=>{const P={};return e.selected.map(v.value).forEach(_=>{P[_]=!0}),P}),g=c(()=>e.selection!=="none"),s=c(()=>e.selection==="single"),u=c(()=>e.selection==="multiple"),d=c(()=>n.value.length!==0&&n.value.every(P=>o.value[v.value(P)]===!0)),S=c(()=>d.value!==!0&&n.value.some(P=>o.value[v.value(P)]===!0)),l=c(()=>e.selected.length);function b(P){return o.value[P]===!0}function w(){a("update:selected",[])}function q(P,_,y,B){a("selection",{rows:_,added:y,keys:P,evt:B});const F=s.value===!0?y===!0?_:[]:y===!0?e.selected.concat(_):e.selected.filter(O=>P.includes(v.value(O))===!1);a("update:selected",F)}return{hasSelectionMode:g,singleSelection:s,multipleSelection:u,allRowsSelected:d,someRowsSelected:S,rowsSelectedNumber:l,isRowSelected:b,clearSelection:w,updateSelection:q}}function De(e){return Array.isArray(e)?e.slice():[]}const Zt={expanded:Array},el=["update:expanded"];function tl(e,a){const n=A(De(e.expanded));D(()=>e.expanded,s=>{n.value=De(s)});function v(s){return n.value.includes(s)}function o(s){e.expanded!==void 0?a("update:expanded",s):n.value=s}function g(s,u){const d=n.value.slice(),S=d.indexOf(s);u===!0?S===-1&&(d.push(s),o(d)):S!==-1&&(d.splice(S,1),o(d))}return{isRowExpanded:v,setExpanded:o,updateExpanded:g}}const ll={visibleColumns:Array};function al(e,a,n){const v=c(()=>{if(e.columns!==void 0)return e.columns;const u=e.rows[0];return u!==void 0?Object.keys(u).map(d=>({name:d,label:d.toUpperCase(),field:d,align:Se(u[d])?"right":"left",sortable:!0})):[]}),o=c(()=>{const{sortBy:u,descending:d}=a.value;return(e.visibleColumns!==void 0?v.value.filter(l=>l.required===!0||e.visibleColumns.includes(l.name)===!0):v.value).map(l=>{const b=l.align||"right",w=`text-${b}`;return{...l,align:b,__iconClass:`q-table__sort-icon q-table__sort-icon--${b}`,__thClass:w+(l.headerClasses!==void 0?" "+l.headerClasses:"")+(l.sortable===!0?" sortable":"")+(l.name===u?` sorted ${d===!0?"sort-desc":""}`:""),__tdStyle:l.style!==void 0?typeof l.style!="function"?()=>l.style:l.style:()=>null,__tdClass:l.classes!==void 0?typeof l.classes!="function"?()=>w+" "+l.classes:q=>w+" "+l.classes(q):()=>w}})}),g=c(()=>{const u={};return o.value.forEach(d=>{u[d.name]=d}),u}),s=c(()=>e.tableColspan!==void 0?e.tableColspan:o.value.length+(n.value===!0?1:0));return{colList:v,computedCols:o,computedColsMap:g,computedColspan:s}}const ee="q-table__bottom row items-center",ze={};Qe.forEach(e=>{ze[e]={}});var ol=N({name:"QTable",props:{rows:{type:Array,required:!0},rowKey:{type:[String,Function],default:"id"},columns:Array,loading:Boolean,iconFirstPage:String,iconPrevPage:String,iconNextPage:String,iconLastPage:String,title:String,hideHeader:Boolean,grid:Boolean,gridHeader:Boolean,dense:Boolean,flat:Boolean,bordered:Boolean,square:Boolean,separator:{type:String,default:"horizontal",validator:e=>["horizontal","vertical","cell","none"].includes(e)},wrapCells:Boolean,virtualScroll:Boolean,virtualScrollTarget:{},...ze,noDataLabel:String,noResultsLabel:String,loadingLabel:String,selectedRowsLabel:Function,rowsPerPageLabel:String,paginationLabel:Function,color:{type:String,default:"grey-8"},titleClass:[String,Array,Object],tableStyle:[String,Array,Object],tableClass:[String,Array,Object],tableHeaderStyle:[String,Array,Object],tableHeaderClass:[String,Array,Object],cardContainerClass:[String,Array,Object],cardContainerStyle:[String,Array,Object],cardStyle:[String,Array,Object],cardClass:[String,Array,Object],hideBottom:Boolean,hideSelectedBanner:Boolean,hideNoData:Boolean,hidePagination:Boolean,onRowClick:Function,onRowDblclick:Function,onRowContextmenu:Function,...le,...Et,...ll,...pt,...Gt,...Zt,...Jt,...Ht},emits:["request","virtualScroll",...At,...el,...Xt],setup(e,{slots:a,emit:n}){const v=Q(),{proxy:{$q:o}}=v,g=ae(e,o),{inFullscreen:s,toggleFullscreen:u}=Nt(),d=c(()=>typeof e.rowKey=="function"?e.rowKey:t=>t[e.rowKey]),S=A(null),l=A(null),b=c(()=>e.grid!==!0&&e.virtualScroll===!0),w=c(()=>" q-table__card"+(g.value===!0?" q-table__card--dark q-dark":"")+(e.square===!0?" q-table--square":"")+(e.flat===!0?" q-table--flat":"")+(e.bordered===!0?" q-table--bordered":"")),q=c(()=>`q-table__container q-table--${e.separator}-separator column no-wrap`+(e.grid===!0?" q-table--grid":w.value)+(g.value===!0?" q-table--dark":"")+(e.dense===!0?" q-table--dense":"")+(e.wrapCells===!1?" q-table--no-wrap":"")+(s.value===!0?" fullscreen scroll":"")),P=c(()=>q.value+(e.loading===!0?" q-table--loading":""));D(()=>e.tableStyle+e.tableClass+e.tableHeaderStyle+e.tableHeaderClass+q.value,()=>{b.value===!0&&l.value!==null&&l.value.reset()});const{innerPagination:_,computedPagination:y,isServerSide:B,requestServerInteraction:F,setPagination:O}=Kt(v,j),{computedFilterMethod:R}=Ut(e,O),{isRowExpanded:x,setExpanded:p,updateExpanded:pe}=tl(e,n),ne=c(()=>{let t=e.rows;if(B.value===!0||t.length===0)return t;const{sortBy:i,descending:f}=y.value;return e.filter&&(t=R.value(t,e.filter,$.value,j)),We.value!==null&&(t=Je.value(e.rows===t?t.slice():t,i,f)),t}),ye=c(()=>ne.value.length),V=c(()=>{let t=ne.value;if(B.value===!0)return t;const{rowsPerPage:i}=y.value;return i!==0&&(I.value===0&&e.rows!==t?t.length>G.value&&(t=t.slice(0,G.value)):t=t.slice(I.value,G.value)),t}),{hasSelectionMode:M,singleSelection:Ue,multipleSelection:he,allRowsSelected:Ie,someRowsSelected:_e,rowsSelectedNumber:re,isRowSelected:oe,clearSelection:Ge,updateSelection:U}=Yt(e,n,V,d),{colList:Ke,computedCols:$,computedColsMap:we,computedColspan:qe}=al(e,y,M),{columnToSort:We,computedSortMethod:Je,sort:ie}=zt(e,y,Ke,O),{firstRowIndex:I,lastRowIndex:G,isFirstPage:se,isLastPage:ue,pagesNumber:K,computedRowsPerPageOptions:Xe,computedRowsNumber:W,firstPage:ce,prevPage:de,nextPage:ve,lastPage:fe}=Wt(v,_,y,B,O,ye),Ye=c(()=>V.value.length===0),Ze=c(()=>{const t={};return Qe.forEach(i=>{t[i]=e[i]}),t.virtualScrollItemSize===void 0&&(t.virtualScrollItemSize=e.dense===!0?28:48),t});function et(){b.value===!0&&l.value.reset()}function tt(){if(e.grid===!0)return ft();const t=e.hideHeader!==!0?xe:null;if(b.value===!0){const f=a["top-row"],m=a["bottom-row"],h={default:k=>Ce(k.item,a.body,k.index)};if(f!==void 0){const k=r("tbody",f({cols:$.value}));h.before=t===null?()=>k:()=>[t()].concat(k)}else t!==null&&(h.before=t);return m!==void 0&&(h.after=()=>r("tbody",m({cols:$.value}))),r(Vt,{ref:l,class:e.tableClass,style:e.tableStyle,...Ze.value,scrollTarget:e.virtualScrollTarget,items:V.value,type:"__qtable",tableColspan:qe.value,onVirtualScroll:at},h)}const i=[nt()];return t!==null&&i.unshift(t()),He({class:["q-table__middle scroll",e.tableClass],style:e.tableStyle},i)}function lt(t,i){if(l.value!==null){l.value.scrollTo(t,i);return}t=parseInt(t,10);const f=S.value.querySelector(`tbody tr:nth-of-type(${t+1})`);if(f!==null){const m=S.value.querySelector(".q-table__middle.scroll"),h=f.offsetTop-e.virtualScrollStickySizeStart,k=h<m.scrollTop?"decrease":"increase";m.scrollTop=h,n("virtualScroll",{index:t,from:0,to:_.value.rowsPerPage-1,direction:k})}}function at(t){n("virtualScroll",t)}function Pe(){return[r(jt,{class:"q-table__linear-progress",color:e.color,dark:g.value,indeterminate:!0,trackColor:"transparent"})]}function Ce(t,i,f){const m=d.value(t),h=oe(m);if(i!==void 0)return i(ke({key:m,row:t,pageIndex:f,__trClass:h?"selected":""}));const k=a["body-cell"],C=$.value.map(T=>{const X=a[`body-cell-${T.name}`],Y=X!==void 0?X:k;return Y!==void 0?Y(rt({key:m,row:t,pageIndex:f,col:T})):r("td",{class:T.__tdClass(t),style:T.__tdStyle(t)},j(T,t))});if(M.value===!0){const T=a["body-selection"],X=T!==void 0?T(ot({key:m,row:t,pageIndex:f})):[r(me,{modelValue:h,color:e.color,dark:g.value,dense:e.dense,"onUpdate:modelValue":(Y,gt)=>{U([m],[t],Y,gt)}})];C.unshift(r("td",{class:"q-table--col-auto-width"},X))}const L={key:m,class:{selected:h}};return e.onRowClick!==void 0&&(L.class["cursor-pointer"]=!0,L.onClick=T=>{n("rowClick",T,t,f)}),e.onRowDblclick!==void 0&&(L.class["cursor-pointer"]=!0,L.onDblclick=T=>{n("rowDblclick",T,t,f)}),e.onRowContextmenu!==void 0&&(L.class["cursor-pointer"]=!0,L.onContextmenu=T=>{n("rowContextmenu",T,t,f)}),r("tr",L,C)}function nt(){const t=a.body,i=a["top-row"],f=a["bottom-row"];let m=V.value.map((h,k)=>Ce(h,t,k));return i!==void 0&&(m=i({cols:$.value}).concat(m)),f!==void 0&&(m=m.concat(f({cols:$.value}))),r("tbody",m)}function ke(t){return ge(t),t.cols=t.cols.map(i=>H({...i},"value",()=>j(i,t.row))),t}function rt(t){return ge(t),H(t,"value",()=>j(t.col,t.row)),t}function ot(t){return ge(t),t}function ge(t){Object.assign(t,{cols:$.value,colsMap:we.value,sort:ie,rowIndex:I.value+t.pageIndex,color:e.color,dark:g.value,dense:e.dense}),M.value===!0&&H(t,"selected",()=>oe(t.key),(i,f)=>{U([t.key],[t.row],i,f)}),H(t,"expand",()=>x(t.key),i=>{pe(t.key,i)})}function j(t,i){const f=typeof t.field=="function"?t.field(i):i[t.field];return t.format!==void 0?t.format(f,i):f}const E=c(()=>({pagination:y.value,pagesNumber:K.value,isFirstPage:se.value,isLastPage:ue.value,firstPage:ce,prevPage:de,nextPage:ve,lastPage:fe,inFullscreen:s.value,toggleFullscreen:u}));function it(){const t=a.top,i=a["top-left"],f=a["top-right"],m=a["top-selection"],h=M.value===!0&&m!==void 0&&re.value>0,k="q-table__top relative-position row items-center";if(t!==void 0)return r("div",{class:k},[t(E.value)]);let C;if(h===!0?C=m(E.value).slice():(C=[],i!==void 0?C.push(r("div",{class:"q-table__control"},[i(E.value)])):e.title&&C.push(r("div",{class:"q-table__control"},[r("div",{class:["q-table__title",e.titleClass]},e.title)]))),f!==void 0&&(C.push(r("div",{class:"q-table__separator col"})),C.push(r("div",{class:"q-table__control"},[f(E.value)]))),C.length!==0)return r("div",{class:k},C)}const Re=c(()=>_e.value===!0?null:Ie.value);function xe(){const t=st();return e.loading===!0&&a.loading===void 0&&t.push(r("tr",{class:"q-table__progress"},[r("th",{class:"relative-position",colspan:qe.value},Pe())])),r("thead",t)}function st(){const t=a.header,i=a["header-cell"];if(t!==void 0)return t(be({header:!0})).slice();const f=$.value.map(m=>{const h=a[`header-cell-${m.name}`],k=h!==void 0?h:i,C=be({col:m});return k!==void 0?k(C):r(Ft,{key:m.name,props:C},()=>m.label)});if(Ue.value===!0&&e.grid!==!0)f.unshift(r("th",{class:"q-table--col-auto-width"}," "));else if(he.value===!0){const m=a["header-selection"],h=m!==void 0?m(be({})):[r(me,{color:e.color,modelValue:Re.value,dark:g.value,dense:e.dense,"onUpdate:modelValue":Te})];f.unshift(r("th",{class:"q-table--col-auto-width"},h))}return[r("tr",{class:e.tableHeaderClass,style:e.tableHeaderStyle},f)]}function be(t){return Object.assign(t,{cols:$.value,sort:ie,colsMap:we.value,color:e.color,dark:g.value,dense:e.dense}),he.value===!0&&H(t,"selected",()=>Re.value,Te),t}function Te(t){_e.value===!0&&(t=!1),U(V.value.map(d.value),V.value,t)}const J=c(()=>{const t=[e.iconFirstPage||o.iconSet.table.firstPage,e.iconPrevPage||o.iconSet.table.prevPage,e.iconNextPage||o.iconSet.table.nextPage,e.iconLastPage||o.iconSet.table.lastPage];return o.lang.rtl===!0?t.reverse():t});function ut(){if(e.hideBottom===!0)return;if(Ye.value===!0){if(e.hideNoData===!0)return;const f=e.loading===!0?e.loadingLabel||o.lang.table.loading:e.filter?e.noResultsLabel||o.lang.table.noResults:e.noDataLabel||o.lang.table.noData,m=a["no-data"],h=m!==void 0?[m({message:f,icon:o.iconSet.table.warning,filter:e.filter})]:[r(Ve,{class:"q-table__bottom-nodata-icon",name:o.iconSet.table.warning}),f];return r("div",{class:ee+" q-table__bottom--nodata"},h)}const t=a.bottom;if(t!==void 0)return r("div",{class:ee},[t(E.value)]);const i=e.hideSelectedBanner!==!0&&M.value===!0&&re.value>0?[r("div",{class:"q-table__control"},[r("div",[(e.selectedRowsLabel||o.lang.table.selectedRecords)(re.value)])])]:[];if(e.hidePagination!==!0)return r("div",{class:ee+" justify-end"},dt(i));if(i.length!==0)return r("div",{class:ee},i)}function ct(t){O({page:1,rowsPerPage:t.value})}function dt(t){let i;const{rowsPerPage:f}=y.value,m=e.paginationLabel||o.lang.table.pagination,h=a.pagination,k=e.rowsPerPageOptions.length>1;if(t.push(r("div",{class:"q-table__separator col"})),k===!0&&t.push(r("div",{class:"q-table__control"},[r("span",{class:"q-table__bottom-item"},[e.rowsPerPageLabel||o.lang.table.recordsPerPage]),r(Tt,{class:"q-table__select inline q-table__bottom-item",color:e.color,modelValue:f,options:Xe.value,displayValue:f===0?o.lang.table.allRows:f,dark:g.value,borderless:!0,dense:!0,optionsDense:!0,optionsCover:!0,"onUpdate:modelValue":ct})])),h!==void 0)i=h(E.value);else if(i=[r("span",f!==0?{class:"q-table__bottom-item"}:{},[f?m(I.value+1,Math.min(G.value,W.value),W.value):m(1,ye.value,W.value)])],f!==0&&K.value>1){const C={color:e.color,round:!0,dense:!0,flat:!0};e.dense===!0&&(C.size="sm"),K.value>2&&i.push(r(Z,{key:"pgFirst",...C,icon:J.value[0],disable:se.value,onClick:ce})),i.push(r(Z,{key:"pgPrev",...C,icon:J.value[1],disable:se.value,onClick:de}),r(Z,{key:"pgNext",...C,icon:J.value[2],disable:ue.value,onClick:ve})),K.value>2&&i.push(r(Z,{key:"pgLast",...C,icon:J.value[3],disable:ue.value,onClick:fe}))}return t.push(r("div",{class:"q-table__control"},i)),t}function vt(){const t=e.gridHeader===!0?[r("table",{class:"q-table"},[xe()])]:e.loading===!0&&a.loading===void 0?Pe():void 0;return r("div",{class:"q-table__middle"},t)}function ft(){const t=a.item!==void 0?a.item:i=>{const f=i.cols.map(h=>r("div",{class:"q-table__grid-item-row"},[r("div",{class:"q-table__grid-item-title"},[h.label]),r("div",{class:"q-table__grid-item-value"},[h.value])]));if(M.value===!0){const h=a["body-selection"],k=h!==void 0?h(i):[r(me,{modelValue:i.selected,color:e.color,dark:g.value,dense:e.dense,"onUpdate:modelValue":(C,L)=>{U([i.key],[i.row],C,L)}})];f.unshift(r("div",{class:"q-table__grid-item-row"},k),r(kt,{dark:g.value}))}const m={class:["q-table__grid-item-card"+w.value,e.cardClass],style:e.cardStyle};return(e.onRowClick!==void 0||e.onRowDblclick!==void 0)&&(m.class[0]+=" cursor-pointer",e.onRowClick!==void 0&&(m.onClick=h=>{n("RowClick",h,i.row,i.pageIndex)}),e.onRowDblclick!==void 0&&(m.onDblclick=h=>{n("RowDblclick",h,i.row,i.pageIndex)})),r("div",{class:"q-table__grid-item col-xs-12 col-sm-6 col-md-4 col-lg-3"+(i.selected===!0?" q-table__grid-item--selected":"")},[r("div",m,f)])};return r("div",{class:["q-table__grid-content row",e.cardContainerClass],style:e.cardContainerStyle},V.value.map((i,f)=>t(ke({key:d.value(i),row:i,pageIndex:f}))))}return Object.assign(v.proxy,{requestServerInteraction:F,setPagination:O,firstPage:ce,prevPage:de,nextPage:ve,lastPage:fe,isRowSelected:oe,clearSelection:Ge,isRowExpanded:x,setExpanded:p,sort:ie,resetVirtualScroll:et,scrollTo:lt,getCellValue:j}),Ct(v.proxy,{filteredSortedRows:()=>ne.value,computedRows:()=>V.value,computedRowsNumber:()=>W.value}),()=>{const t=[it()],i={ref:S,class:P.value};return e.grid===!0?t.push(vt()):Object.assign(i,{class:[i.class,e.cardClass],style:e.cardStyle}),t.push(tt(),ut()),e.loading===!0&&a.loading!==void 0&&t.push(a.loading()),r("div",i,t)}}});export{Bt as Q,ol as a,Ft as b,At as c,Nt as d,Et as u};
