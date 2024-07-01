import{c as te,a1 as ae,a2 as T,s as oe,a3 as ne,t as k,a as f,a4 as ie,a5 as se,a6 as le,a7 as re,a8 as ue,w as C,j as E,a9 as x,aa as H,k as ce,h as A,ab as de,g as fe,d as he,ac as ve}from"./index.056e9e0f.js";import{a as ge,v as j,b as me,p as q,c as Te,d as ye,r as D,s as pe,e as M,f as be}from"./format.0267e120.js";var we=te({name:"QTooltip",inheritAttrs:!1,props:{...ge,...ae,...T,maxHeight:{type:String,default:null},maxWidth:{type:String,default:null},transitionShow:{...T.transitionShow,default:"jump-down"},transitionHide:{...T.transitionHide,default:"jump-up"},anchor:{type:String,default:"bottom middle",validator:j},self:{type:String,default:"top middle",validator:j},offset:{type:Array,default:()=>[14,14],validator:me},scrollTarget:oe,delay:{type:Number,default:0},hideDelay:{type:Number,default:0},persistent:Boolean},emits:[...ne],setup(e,{slots:L,emit:y,attrs:h}){let i,s;const v=fe(),{proxy:{$q:a}}=v,l=k(null),c=k(!1),Q=f(()=>q(e.anchor,a.lang.rtl)),W=f(()=>q(e.self,a.lang.rtl)),B=f(()=>e.persistent!==!0),{registerTick:N,removeTick:R}=ie(),{registerTimeout:d}=se(),{transitionProps:_,transitionStyle:I}=le(e),{localScrollTarget:p,changeScrollEvent:U,unconfigureScrollTarget:V}=Te(e,w),{anchorEl:o,canShow:$,anchorEvents:r}=ye({showing:c,configureAnchorEl:Y}),{show:z,hide:g}=re({showing:c,canShow:$,handleShow:G,handleHide:J,hideOnRouteChange:B,processOnMount:!0});Object.assign(r,{delayShow:K,delayHide:X});const{showPortal:b,hidePortal:S,renderPortal:F}=ue(v,l,ee,"tooltip");if(a.platform.is.mobile===!0){const t={anchorEl:o,innerRef:l,onClickOutside(n){return g(n),n.target.classList.contains("q-dialog__backdrop")&&ve(n),!0}},m=f(()=>e.modelValue===null&&e.persistent!==!0&&c.value===!0);C(m,n=>{(n===!0?be:D)(t)}),E(()=>{D(t)})}function G(t){b(),N(()=>{s=new MutationObserver(()=>u()),s.observe(l.value,{attributes:!1,childList:!0,characterData:!0,subtree:!0}),u(),w()}),i===void 0&&(i=C(()=>a.screen.width+"|"+a.screen.height+"|"+e.self+"|"+e.anchor+"|"+a.lang.rtl,u)),d(()=>{b(!0),y("show",t)},e.transitionDuration)}function J(t){R(),S(),P(),d(()=>{S(!0),y("hide",t)},e.transitionDuration)}function P(){s!==void 0&&(s.disconnect(),s=void 0),i!==void 0&&(i(),i=void 0),V(),x(r,"tooltipTemp")}function u(){pe({targetEl:l.value,offset:e.offset,anchorEl:o.value,anchorOrigin:Q.value,selfOrigin:W.value,maxHeight:e.maxHeight,maxWidth:e.maxWidth})}function K(t){if(a.platform.is.mobile===!0){M(),document.body.classList.add("non-selectable");const m=o.value,n=["touchmove","touchcancel","touchend","click"].map(O=>[m,O,"delayHide","passiveCapture"]);H(r,"tooltipTemp",n)}d(()=>{z(t)},e.delay)}function X(t){a.platform.is.mobile===!0&&(x(r,"tooltipTemp"),M(),setTimeout(()=>{document.body.classList.remove("non-selectable")},10)),d(()=>{g(t)},e.hideDelay)}function Y(){if(e.noParentEvent===!0||o.value===null)return;const t=a.platform.is.mobile===!0?[[o.value,"touchstart","delayShow","passive"]]:[[o.value,"mouseenter","delayShow","passive"],[o.value,"mouseleave","delayHide","passive"]];H(r,"anchor",t)}function w(){if(o.value!==null||e.scrollTarget!==void 0){p.value=ce(o.value,e.scrollTarget);const t=e.noParentEvent===!0?u:g;U(p.value,t)}}function Z(){return c.value===!0?A("div",{...h,ref:l,class:["q-tooltip q-tooltip--style q-position-engine no-pointer-events",h.class],style:[h.style,I.value],role:"tooltip"},he(L.default)):null}function ee(){return A(de,_.value,Z)}return E(P),Object.assign(v.proxy,{updatePosition:u}),F}});export{we as Q};
