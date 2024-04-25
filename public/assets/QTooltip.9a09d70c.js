import{c as ee,a0 as te,a1 as ae,a2 as oe,s as O,a as f,a3 as ne,a4 as ie,a5 as le,a6 as se,a7 as re,w as k,j as C,a8 as E,a9 as x,k as ue,h as H,aa as ce,g as de,d as fe,ab as ve}from"./index.608ac73b.js";import{d as he,v as A,e as ge,p as j,f as me,g as ye,r as q,s as Te,h as D,i as pe}from"./QTable.81cb2ff7.js";var Pe=ee({name:"QTooltip",inheritAttrs:!1,props:{...he,...te,...ae,maxHeight:{type:String,default:null},maxWidth:{type:String,default:null},transitionShow:{default:"jump-down"},transitionHide:{default:"jump-up"},anchor:{type:String,default:"bottom middle",validator:A},self:{type:String,default:"top middle",validator:A},offset:{type:Array,default:()=>[14,14],validator:ge},scrollTarget:{default:void 0},delay:{type:Number,default:0},hideDelay:{type:Number,default:0}},emits:[...oe],setup(e,{slots:M,emit:y,attrs:v}){let i,l;const h=de(),{proxy:{$q:a}}=h,s=O(null),c=O(!1),L=f(()=>j(e.anchor,a.lang.rtl)),Q=f(()=>j(e.self,a.lang.rtl)),W=f(()=>e.persistent!==!0),{registerTick:N,removeTick:R}=ne(),{registerTimeout:d}=ie(),{transitionProps:_,transitionStyle:B}=le(e),{localScrollTarget:T,changeScrollEvent:I,unconfigureScrollTarget:U}=me(e,P),{anchorEl:o,canShow:V,anchorEvents:r}=ye({showing:c,configureAnchorEl:X}),{show:$,hide:g}=se({showing:c,canShow:V,handleShow:F,handleHide:G,hideOnRouteChange:W,processOnMount:!0});Object.assign(r,{delayShow:J,delayHide:K});const{showPortal:p,hidePortal:b,renderPortal:z}=re(h,s,Z,"tooltip");if(a.platform.is.mobile===!0){const t={anchorEl:o,innerRef:s,onClickOutside(n){return g(n),n.target.classList.contains("q-dialog__backdrop")&&ve(n),!0}},m=f(()=>e.modelValue===null&&e.persistent!==!0&&c.value===!0);k(m,n=>{(n===!0?pe:q)(t)}),C(()=>{q(t)})}function F(t){p(),N(()=>{l=new MutationObserver(()=>u()),l.observe(s.value,{attributes:!1,childList:!0,characterData:!0,subtree:!0}),u(),P()}),i===void 0&&(i=k(()=>a.screen.width+"|"+a.screen.height+"|"+e.self+"|"+e.anchor+"|"+a.lang.rtl,u)),d(()=>{p(!0),y("show",t)},e.transitionDuration)}function G(t){R(),b(),S(),d(()=>{b(!0),y("hide",t)},e.transitionDuration)}function S(){l!==void 0&&(l.disconnect(),l=void 0),i!==void 0&&(i(),i=void 0),U(),E(r,"tooltipTemp")}function u(){Te({targetEl:s.value,offset:e.offset,anchorEl:o.value,anchorOrigin:L.value,selfOrigin:Q.value,maxHeight:e.maxHeight,maxWidth:e.maxWidth})}function J(t){if(a.platform.is.mobile===!0){D(),document.body.classList.add("non-selectable");const m=o.value,n=["touchmove","touchcancel","touchend","click"].map(w=>[m,w,"delayHide","passiveCapture"]);x(r,"tooltipTemp",n)}d(()=>{$(t)},e.delay)}function K(t){a.platform.is.mobile===!0&&(E(r,"tooltipTemp"),D(),setTimeout(()=>{document.body.classList.remove("non-selectable")},10)),d(()=>{g(t)},e.hideDelay)}function X(){if(e.noParentEvent===!0||o.value===null)return;const t=a.platform.is.mobile===!0?[[o.value,"touchstart","delayShow","passive"]]:[[o.value,"mouseenter","delayShow","passive"],[o.value,"mouseleave","delayHide","passive"]];x(r,"anchor",t)}function P(){if(o.value!==null||e.scrollTarget!==void 0){T.value=ue(o.value,e.scrollTarget);const t=e.noParentEvent===!0?u:g;I(T.value,t)}}function Y(){return c.value===!0?H("div",{...v,ref:s,class:["q-tooltip q-tooltip--style q-position-engine no-pointer-events",v.class],style:[v.style,B.value],role:"tooltip"},fe(M.default)):null}function Z(){return H(ce,_.value,Y)}return C(S),Object.assign(h.proxy,{updatePosition:u}),z}});export{Pe as Q};
