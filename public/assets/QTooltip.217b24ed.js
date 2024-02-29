import{c as ee,L as te,M as oe,O as ae,s as O,a as f,P as ne,R as ie,S as le,T as se,U as re,w as k,j as C,V as E,W as x,k as ue,h as H,X as ce,g as de,d as fe,Y as ve}from"./index.83bc94a0.js";import{c as he,v as A,d as ge,p as M,e as me,f as Te,r as j,s as ye,g as q,h as pe}from"./use-dialog-plugin-component.c360013a.js";var Pe=ee({name:"QTooltip",inheritAttrs:!1,props:{...he,...te,...oe,maxHeight:{type:String,default:null},maxWidth:{type:String,default:null},transitionShow:{default:"jump-down"},transitionHide:{default:"jump-up"},anchor:{type:String,default:"bottom middle",validator:A},self:{type:String,default:"top middle",validator:A},offset:{type:Array,default:()=>[14,14],validator:ge},scrollTarget:{default:void 0},delay:{type:Number,default:0},hideDelay:{type:Number,default:0}},emits:[...ae],setup(e,{slots:D,emit:T,attrs:v}){let i,l;const h=de(),{proxy:{$q:o}}=h,s=O(null),c=O(!1),L=f(()=>M(e.anchor,o.lang.rtl)),W=f(()=>M(e.self,o.lang.rtl)),Q=f(()=>e.persistent!==!0),{registerTick:R,removeTick:N}=ne(),{registerTimeout:d}=ie(),{transitionProps:U,transitionStyle:V}=le(e),{localScrollTarget:y,changeScrollEvent:_,unconfigureScrollTarget:B}=me(e,P),{anchorEl:a,canShow:I,anchorEvents:r}=Te({showing:c,configureAnchorEl:J}),{show:X,hide:g}=se({showing:c,canShow:I,handleShow:$,handleHide:z,hideOnRouteChange:Q,processOnMount:!0});Object.assign(r,{delayShow:F,delayHide:G});const{showPortal:p,hidePortal:S,renderPortal:Y}=re(h,s,Z,"tooltip");if(o.platform.is.mobile===!0){const t={anchorEl:a,innerRef:s,onClickOutside(n){return g(n),n.target.classList.contains("q-dialog__backdrop")&&ve(n),!0}},m=f(()=>e.modelValue===null&&e.persistent!==!0&&c.value===!0);k(m,n=>{(n===!0?pe:j)(t)}),C(()=>{j(t)})}function $(t){p(),R(()=>{l=new MutationObserver(()=>u()),l.observe(s.value,{attributes:!1,childList:!0,characterData:!0,subtree:!0}),u(),P()}),i===void 0&&(i=k(()=>o.screen.width+"|"+o.screen.height+"|"+e.self+"|"+e.anchor+"|"+o.lang.rtl,u)),d(()=>{p(!0),T("show",t)},e.transitionDuration)}function z(t){N(),S(),b(),d(()=>{S(!0),T("hide",t)},e.transitionDuration)}function b(){l!==void 0&&(l.disconnect(),l=void 0),i!==void 0&&(i(),i=void 0),B(),E(r,"tooltipTemp")}function u(){ye({targetEl:s.value,offset:e.offset,anchorEl:a.value,anchorOrigin:L.value,selfOrigin:W.value,maxHeight:e.maxHeight,maxWidth:e.maxWidth})}function F(t){if(o.platform.is.mobile===!0){q(),document.body.classList.add("non-selectable");const m=a.value,n=["touchmove","touchcancel","touchend","click"].map(w=>[m,w,"delayHide","passiveCapture"]);x(r,"tooltipTemp",n)}d(()=>{X(t)},e.delay)}function G(t){o.platform.is.mobile===!0&&(E(r,"tooltipTemp"),q(),setTimeout(()=>{document.body.classList.remove("non-selectable")},10)),d(()=>{g(t)},e.hideDelay)}function J(){if(e.noParentEvent===!0||a.value===null)return;const t=o.platform.is.mobile===!0?[[a.value,"touchstart","delayShow","passive"]]:[[a.value,"mouseenter","delayShow","passive"],[a.value,"mouseleave","delayHide","passive"]];x(r,"anchor",t)}function P(){if(a.value!==null||e.scrollTarget!==void 0){y.value=ue(a.value,e.scrollTarget);const t=e.noParentEvent===!0?u:g;_(y.value,t)}}function K(){return c.value===!0?H("div",{...v,ref:s,class:["q-tooltip q-tooltip--style q-position-engine no-pointer-events",v.class],style:[v.style,V.value],role:"tooltip"},fe(D.default)):null}function Z(){return H(ce,U.value,K)}return C(b),Object.assign(h.proxy,{updatePosition:u}),Y}});export{Pe as Q};
