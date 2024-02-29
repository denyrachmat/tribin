import{c as ee,P as te,R as oe,S as ae,s as O,a as f,T as ne,U as ie,V as le,W as se,X as re,w as k,j as C,Y as E,Z as x,k as ue,h as H,$ as ce,g as de,d as fe,a0 as ve}from"./index.6b9b0f2b.js";import{c as he,v as A,d as ge,p as j,e as me,f as Te,r as q,s as ye,g as D,h as pe}from"./use-dialog-plugin-component.38249702.js";var Pe=ee({name:"QTooltip",inheritAttrs:!1,props:{...he,...te,...oe,maxHeight:{type:String,default:null},maxWidth:{type:String,default:null},transitionShow:{default:"jump-down"},transitionHide:{default:"jump-up"},anchor:{type:String,default:"bottom middle",validator:A},self:{type:String,default:"top middle",validator:A},offset:{type:Array,default:()=>[14,14],validator:ge},scrollTarget:{default:void 0},delay:{type:Number,default:0},hideDelay:{type:Number,default:0}},emits:[...ae],setup(e,{slots:M,emit:T,attrs:v}){let i,l;const h=de(),{proxy:{$q:o}}=h,s=O(null),c=O(!1),L=f(()=>j(e.anchor,o.lang.rtl)),W=f(()=>j(e.self,o.lang.rtl)),Q=f(()=>e.persistent!==!0),{registerTick:R,removeTick:N}=ne(),{registerTimeout:d}=ie(),{transitionProps:U,transitionStyle:V}=le(e),{localScrollTarget:y,changeScrollEvent:_,unconfigureScrollTarget:$}=me(e,P),{anchorEl:a,canShow:B,anchorEvents:r}=Te({showing:c,configureAnchorEl:G}),{show:I,hide:g}=se({showing:c,canShow:B,handleShow:Y,handleHide:Z,hideOnRouteChange:Q,processOnMount:!0});Object.assign(r,{delayShow:z,delayHide:F});const{showPortal:p,hidePortal:S,renderPortal:X}=re(h,s,K,"tooltip");if(o.platform.is.mobile===!0){const t={anchorEl:a,innerRef:s,onClickOutside(n){return g(n),n.target.classList.contains("q-dialog__backdrop")&&ve(n),!0}},m=f(()=>e.modelValue===null&&e.persistent!==!0&&c.value===!0);k(m,n=>{(n===!0?pe:q)(t)}),C(()=>{q(t)})}function Y(t){p(),R(()=>{l=new MutationObserver(()=>u()),l.observe(s.value,{attributes:!1,childList:!0,characterData:!0,subtree:!0}),u(),P()}),i===void 0&&(i=k(()=>o.screen.width+"|"+o.screen.height+"|"+e.self+"|"+e.anchor+"|"+o.lang.rtl,u)),d(()=>{p(!0),T("show",t)},e.transitionDuration)}function Z(t){N(),S(),b(),d(()=>{S(!0),T("hide",t)},e.transitionDuration)}function b(){l!==void 0&&(l.disconnect(),l=void 0),i!==void 0&&(i(),i=void 0),$(),E(r,"tooltipTemp")}function u(){ye({targetEl:s.value,offset:e.offset,anchorEl:a.value,anchorOrigin:L.value,selfOrigin:W.value,maxHeight:e.maxHeight,maxWidth:e.maxWidth})}function z(t){if(o.platform.is.mobile===!0){D(),document.body.classList.add("non-selectable");const m=a.value,n=["touchmove","touchcancel","touchend","click"].map(w=>[m,w,"delayHide","passiveCapture"]);x(r,"tooltipTemp",n)}d(()=>{I(t)},e.delay)}function F(t){o.platform.is.mobile===!0&&(E(r,"tooltipTemp"),D(),setTimeout(()=>{document.body.classList.remove("non-selectable")},10)),d(()=>{g(t)},e.hideDelay)}function G(){if(e.noParentEvent===!0||a.value===null)return;const t=o.platform.is.mobile===!0?[[a.value,"touchstart","delayShow","passive"]]:[[a.value,"mouseenter","delayShow","passive"],[a.value,"mouseleave","delayHide","passive"]];x(r,"anchor",t)}function P(){if(a.value!==null||e.scrollTarget!==void 0){y.value=ue(a.value,e.scrollTarget);const t=e.noParentEvent===!0?u:g;_(y.value,t)}}function J(){return c.value===!0?H("div",{...v,ref:s,class:["q-tooltip q-tooltip--style q-position-engine no-pointer-events",v.class],style:[v.style,V.value],role:"tooltip"},fe(M.default)):null}function K(){return H(ce,U.value,J)}return C(b),Object.assign(h.proxy,{updatePosition:u}),X}});export{Pe as Q};
