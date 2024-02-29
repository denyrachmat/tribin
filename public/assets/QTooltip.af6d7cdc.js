import{c as ee,T as te,U as ae,V as oe,s as O,a as f,W as ne,X as ie,Y as le,Z as se,$ as re,w as k,j as C,a0 as E,a1 as x,k as ue,h as H,a2 as ce,g as de,d as fe,a3 as ve}from"./index.ecb3cc79.js";import{e as he,v as j,f as ge,p as A,g as me,h as Te,r as q,s as ye,i as D,j as pe}from"./use-dialog-plugin-component.2a3e5d80.js";var Pe=ee({name:"QTooltip",inheritAttrs:!1,props:{...he,...te,...ae,maxHeight:{type:String,default:null},maxWidth:{type:String,default:null},transitionShow:{default:"jump-down"},transitionHide:{default:"jump-up"},anchor:{type:String,default:"bottom middle",validator:j},self:{type:String,default:"top middle",validator:j},offset:{type:Array,default:()=>[14,14],validator:ge},scrollTarget:{default:void 0},delay:{type:Number,default:0},hideDelay:{type:Number,default:0}},emits:[...oe],setup(e,{slots:M,emit:T,attrs:v}){let i,l;const h=de(),{proxy:{$q:a}}=h,s=O(null),c=O(!1),L=f(()=>A(e.anchor,a.lang.rtl)),W=f(()=>A(e.self,a.lang.rtl)),Q=f(()=>e.persistent!==!0),{registerTick:N,removeTick:R}=ne(),{registerTimeout:d}=ie(),{transitionProps:U,transitionStyle:V}=le(e),{localScrollTarget:y,changeScrollEvent:_,unconfigureScrollTarget:$}=me(e,P),{anchorEl:o,canShow:B,anchorEvents:r}=Te({showing:c,configureAnchorEl:G}),{show:I,hide:g}=se({showing:c,canShow:B,handleShow:Y,handleHide:Z,hideOnRouteChange:Q,processOnMount:!0});Object.assign(r,{delayShow:z,delayHide:F});const{showPortal:p,hidePortal:b,renderPortal:X}=re(h,s,K,"tooltip");if(a.platform.is.mobile===!0){const t={anchorEl:o,innerRef:s,onClickOutside(n){return g(n),n.target.classList.contains("q-dialog__backdrop")&&ve(n),!0}},m=f(()=>e.modelValue===null&&e.persistent!==!0&&c.value===!0);k(m,n=>{(n===!0?pe:q)(t)}),C(()=>{q(t)})}function Y(t){p(),N(()=>{l=new MutationObserver(()=>u()),l.observe(s.value,{attributes:!1,childList:!0,characterData:!0,subtree:!0}),u(),P()}),i===void 0&&(i=k(()=>a.screen.width+"|"+a.screen.height+"|"+e.self+"|"+e.anchor+"|"+a.lang.rtl,u)),d(()=>{p(!0),T("show",t)},e.transitionDuration)}function Z(t){R(),b(),S(),d(()=>{b(!0),T("hide",t)},e.transitionDuration)}function S(){l!==void 0&&(l.disconnect(),l=void 0),i!==void 0&&(i(),i=void 0),$(),E(r,"tooltipTemp")}function u(){ye({targetEl:s.value,offset:e.offset,anchorEl:o.value,anchorOrigin:L.value,selfOrigin:W.value,maxHeight:e.maxHeight,maxWidth:e.maxWidth})}function z(t){if(a.platform.is.mobile===!0){D(),document.body.classList.add("non-selectable");const m=o.value,n=["touchmove","touchcancel","touchend","click"].map(w=>[m,w,"delayHide","passiveCapture"]);x(r,"tooltipTemp",n)}d(()=>{I(t)},e.delay)}function F(t){a.platform.is.mobile===!0&&(E(r,"tooltipTemp"),D(),setTimeout(()=>{document.body.classList.remove("non-selectable")},10)),d(()=>{g(t)},e.hideDelay)}function G(){if(e.noParentEvent===!0||o.value===null)return;const t=a.platform.is.mobile===!0?[[o.value,"touchstart","delayShow","passive"]]:[[o.value,"mouseenter","delayShow","passive"],[o.value,"mouseleave","delayHide","passive"]];x(r,"anchor",t)}function P(){if(o.value!==null||e.scrollTarget!==void 0){y.value=ue(o.value,e.scrollTarget);const t=e.noParentEvent===!0?u:g;_(y.value,t)}}function J(){return c.value===!0?H("div",{...v,ref:s,class:["q-tooltip q-tooltip--style q-position-engine no-pointer-events",v.class],style:[v.style,V.value],role:"tooltip"},fe(M.default)):null}function K(){return H(ce,U.value,J)}return C(S),Object.assign(h.proxy,{updatePosition:u}),X}});export{Pe as Q};
