import{n as We,c as ne,bb as pe,U as Xe,s as H,bc as Je,a as P,aR as Ze,w as G,o as X,h as g,aa as me,d as ge,Q as q,g as le,aH as ve,aI as ye,a6 as ue,ab as et,ac as tt,bd as ot,j as nt,a3 as lt,F as be,ay as at,aQ as it,aD as rt,B as C,C as z,D as s,E as c,J as we,K as Y,I as U,R as N,aY as A,aW as ce,H as T,ap as de,aU as _e,aV as ke,aZ as Se,aX as F,P as fe,L as Ce,M as $,O as Te,ba as st,be as ut}from"./index.8f85041b.js";import{q as Re,c as ct,l as B,k as W,y as dt,z as ft,A as ht,u as De,b as qe,Q as Be,m as L,d as pt}from"./use-dialog-plugin-component.f6146246.js";import{Q}from"./QTooltip.12cdac68.js";import{Q as mt}from"./QBadge.a8cdfa96.js";import{api_web as j}from"./axios.42b22e93.js";import{d as gt}from"./date.fbcc2ea1.js";function xe(e,t){if(t&&e===t)return null;const o=e.nodeName.toLowerCase();if(["div","li","ul","ol","blockquote"].includes(o)===!0)return e;const l=window.getComputedStyle?window.getComputedStyle(e):e.currentStyle,r=l.display;return r==="block"||r==="table"?e:xe(e.parentNode)}function te(e,t,o){return!e||e===document.body?!1:o===!0&&e===t||(t===document?document.body:t).contains(e.parentNode)}function Oe(e,t,o){if(o||(o=document.createRange(),o.selectNode(e),o.setStart(e,0)),t.count===0)o.setEnd(e,t.count);else if(t.count>0)if(e.nodeType===Node.TEXT_NODE)e.textContent.length<t.count?t.count-=e.textContent.length:(o.setEnd(e,t.count),t.count=0);else for(let l=0;t.count!==0&&l<e.childNodes.length;l++)o=Oe(e.childNodes[l],t,o);return o}const vt=/^https?:\/\//;class yt{constructor(t,o){this.el=t,this.eVm=o,this._range=null}get selection(){if(this.el){const t=document.getSelection();if(te(t.anchorNode,this.el,!0)&&te(t.focusNode,this.el,!0))return t}return null}get hasSelection(){return this.selection!==null?this.selection.toString().length!==0:!1}get range(){const t=this.selection;return t!==null&&t.rangeCount?t.getRangeAt(0):this._range}get parent(){const t=this.range;if(t!==null){const o=t.startContainer;return o.nodeType===document.ELEMENT_NODE?o:o.parentNode}return null}get blockParent(){const t=this.parent;return t!==null?xe(t,this.el):null}save(t=this.range){t!==null&&(this._range=t)}restore(t=this._range){const o=document.createRange(),l=document.getSelection();t!==null?(o.setStart(t.startContainer,t.startOffset),o.setEnd(t.endContainer,t.endOffset),l.removeAllRanges(),l.addRange(o)):(l.selectAllChildren(this.el),l.collapseToEnd())}savePosition(){let t=-1,o;const l=document.getSelection(),r=this.el.parentNode;if(l.focusNode&&te(l.focusNode,r))for(o=l.focusNode,t=l.focusOffset;o&&o!==r;)o!==this.el&&o.previousSibling?(o=o.previousSibling,t+=o.textContent.length):o=o.parentNode;this.savedPos=t}restorePosition(t=0){if(this.savedPos>0&&this.savedPos<t){const o=window.getSelection(),l=Oe(this.el,{count:this.savedPos});l&&(l.collapse(!1),o.removeAllRanges(),o.addRange(l))}}hasParent(t,o){const l=o?this.parent:this.blockParent;return l!==null?l.nodeName.toLowerCase()===t.toLowerCase():!1}hasParents(t,o,l=this.parent){return l===null?!1:t.includes(l.nodeName.toLowerCase())===!0?!0:o===!0?this.hasParents(t,o,l.parentNode):!1}is(t,o){if(this.selection===null)return!1;switch(t){case"formatBlock":return o==="DIV"&&this.parent===this.el||this.hasParent(o,o==="PRE");case"link":return this.hasParent("A",!0);case"fontSize":return document.queryCommandValue(t)===o;case"fontName":const l=document.queryCommandValue(t);return l===`"${o}"`||l===o;case"fullscreen":return this.eVm.inFullscreen.value;case"viewsource":return this.eVm.isViewingSource.value;case void 0:return!1;default:const r=document.queryCommandState(t);return o!==void 0?r===o:r}}getParentAttribute(t){return this.parent!==null?this.parent.getAttribute(t):null}can(t){if(t==="outdent")return this.hasParents(["blockquote","li"],!0);if(t==="indent")return this.hasParents(["li"],!0);if(t==="link")return this.selection!==null||this.is("link")}apply(t,o,l=We){if(t==="formatBlock")["BLOCKQUOTE","H1","H2","H3","H4","H5","H6"].includes(o)&&this.is(t,o)&&(t="outdent",o=null),o==="PRE"&&this.is(t,"PRE")&&(o="P");else if(t==="print"){l();const r=window.open();r.document.write(`
        <!doctype html>
        <html>
          <head>
            <title>Print - ${document.title}</title>
          </head>
          <body>
            <div>${this.el.innerHTML}</div>
          </body>
        </html>
      `),r.print(),r.close();return}else if(t==="link"){const r=this.getParentAttribute("href");if(r===null){const u=this.selectWord(this.selection),i=u?u.toString():"";if(!i.length&&(!this.range||!this.range.cloneContents().querySelector("img")))return;this.eVm.editLinkUrl.value=vt.test(i)?i:"https://",document.execCommand("createLink",!1,this.eVm.editLinkUrl.value),this.save(u.getRangeAt(0))}else this.eVm.editLinkUrl.value=r,this.range.selectNodeContents(this.parent),this.save();return}else if(t==="fullscreen"){this.eVm.toggleFullscreen(),l();return}else if(t==="viewsource"){this.eVm.isViewingSource.value=this.eVm.isViewingSource.value===!1,this.eVm.setContent(this.eVm.props.modelValue),l();return}document.execCommand(t,!1,o),l()}selectWord(t){if(t===null||t.isCollapsed!==!0||t.modify===void 0)return t;const o=document.createRange();o.setStart(t.anchorNode,t.anchorOffset),o.setEnd(t.focusNode,t.focusOffset);const l=o.collapsed?["backward","forward"]:["forward","backward"];o.detach();const r=t.focusNode,u=t.focusOffset;return t.collapse(t.anchorNode,t.anchorOffset),t.modify("move",l[0],"character"),t.modify("move",l[1],"word"),t.extend(r,u),t.modify("extend",l[1],"character"),t.modify("extend",l[0],"word"),t}}const bt=Object.keys(pe),wt=e=>bt.reduce((t,o)=>{const l=e[o];return l!==void 0&&(t[o]=l),t},{});var _t=ne({name:"QBtnDropdown",props:{...pe,...Xe,modelValue:Boolean,split:Boolean,dropdownIcon:String,contentClass:[Array,String,Object],contentStyle:[Array,String,Object],cover:Boolean,persistent:Boolean,noRouteDismiss:Boolean,autoClose:Boolean,menuAnchor:{type:String,default:"bottom end"},menuSelf:{type:String,default:"top end"},menuOffset:Array,disableMainBtn:Boolean,disableDropdown:Boolean,noIconAnimation:Boolean,toggleAriaLabel:String},emits:["update:modelValue","click","beforeShow","show","beforeHide","hide"],setup(e,{slots:t,emit:o}){const{proxy:l}=le(),r=H(e.modelValue),u=H(null),i=Je(),p=P(()=>{const f={"aria-expanded":r.value===!0?"true":"false","aria-haspopup":"true","aria-controls":i.value,"aria-label":e.toggleAriaLabel||l.$q.lang.label[r.value===!0?"collapse":"expand"](e.label)};return(e.disable===!0||e.split===!1&&e.disableMainBtn===!0||e.disableDropdown===!0)&&(f["aria-disabled"]="true"),f}),h=P(()=>"q-btn-dropdown__arrow"+(r.value===!0&&e.noIconAnimation===!1?" rotate-180":"")+(e.split===!1?" q-btn-dropdown__arrow-container":"")),m=P(()=>Ze(e)),v=P(()=>wt(e));G(()=>e.modelValue,f=>{u.value!==null&&u.value[f?"show":"hide"]()}),G(()=>e.split,_);function D(f){r.value=!0,o("beforeShow",f)}function w(f){o("show",f),o("update:modelValue",!0)}function b(f){r.value=!1,o("beforeHide",f)}function O(f){o("hide",f),o("update:modelValue",!1)}function y(f){o("click",f)}function S(f){ve(f),_(),o("click",f)}function d(f){u.value!==null&&u.value.toggle(f)}function R(f){u.value!==null&&u.value.show(f)}function _(f){u.value!==null&&u.value.hide(f)}return Object.assign(l,{show:R,hide:_,toggle:d}),X(()=>{e.modelValue===!0&&R()}),()=>{const f=[g(me,{class:h.value,name:e.dropdownIcon||l.$q.iconSet.arrow.dropdown})];return e.disableDropdown!==!0&&f.push(g(Re,{ref:u,id:i.value,class:e.contentClass,style:e.contentStyle,cover:e.cover,fit:!0,persistent:e.persistent,noRouteDismiss:e.noRouteDismiss,autoClose:e.autoClose,anchor:e.menuAnchor,self:e.menuSelf,offset:e.menuOffset,separateClosePopup:!0,transitionShow:e.transitionShow,transitionHide:e.transitionHide,transitionDuration:e.transitionDuration,onBeforeShow:D,onShow:w,onBeforeHide:b,onHide:O},t.default)),e.split===!1?g(q,{class:"q-btn-dropdown q-btn-dropdown--simple",...v.value,...p.value,disable:e.disable===!0||e.disableMainBtn===!0,noWrap:!0,round:!1,onClick:y},{default:()=>ge(t.label,[]).concat(f),loading:t.loading}):g(ct,{class:"q-btn-dropdown q-btn-dropdown--split no-wrap q-btn-item",rounded:e.rounded,square:e.square,...m.value,glossy:e.glossy,stretch:e.stretch},()=>[g(q,{class:"q-btn-dropdown--current",...v.value,disable:e.disable===!0||e.disableMainBtn===!0,noWrap:!0,round:!1,onClick:S},{default:t.label,loading:t.loading}),g(q,{class:"q-btn-dropdown__arrow-container q-anchor--skip",...p.value,...m.value,disable:e.disable===!0||e.disableDropdown===!0,rounded:e.rounded,color:e.color,textColor:e.textColor,dense:e.dense,size:e.size,padding:e.padding,ripple:e.ripple},()=>f)])}}});function Pe(e,t,o){t.handler?t.handler(e,o,o.caret):o.runCmd(t.cmd,t.param)}function ae(e){return g("div",{class:"q-editor__toolbar-group"},e)}function ze(e,t,o,l=!1){const r=l||(t.type==="toggle"?t.toggled?t.toggled(e):t.cmd&&e.caret.is(t.cmd,t.param):!1),u=[];if(t.tip&&e.$q.platform.is.desktop){const i=t.key?g("div",[g("small",`(CTRL + ${String.fromCharCode(t.key)})`)]):null;u.push(g(Q,{delay:1e3},()=>[g("div",{innerHTML:t.tip}),i]))}return g(q,{...e.buttonProps.value,icon:t.icon!==null?t.icon:void 0,color:r?t.toggleColor||e.props.toolbarToggleColor:t.color||e.props.toolbarColor,textColor:r&&!e.props.toolbarPush?null:t.textColor||e.props.toolbarTextColor,label:t.label,disable:t.disable?typeof t.disable=="function"?t.disable(e):!0:!1,size:"sm",onClick(i){o&&o(),Pe(i,t,e)}},()=>u)}function kt(e,t){const o=t.list==="only-icons";let l=t.label,r=t.icon!==null?t.icon:void 0,u,i;function p(){m.component.proxy.hide()}if(o)i=t.options.map(v=>{const D=v.type===void 0?e.caret.is(v.cmd,v.param):!1;return D&&(l=v.tip,r=v.icon!==null?v.icon:void 0),ze(e,v,p,D)}),u=e.toolbarBackgroundClass.value,i=[ae(i)];else{const v=e.props.toolbarToggleColor!==void 0?`text-${e.props.toolbarToggleColor}`:null,D=e.props.toolbarTextColor!==void 0?`text-${e.props.toolbarTextColor}`:null,w=t.list==="no-icons";i=t.options.map(b=>{const O=b.disable?b.disable(e):!1,y=b.type===void 0?e.caret.is(b.cmd,b.param):!1;y&&(l=b.tip,r=b.icon!==null?b.icon:void 0);const S=b.htmlTip;return g(W,{active:y,activeClass:v,clickable:!0,disable:O,dense:!0,onClick(d){p(),e.contentRef.value!==null&&e.contentRef.value.focus(),e.caret.restore(),Pe(d,b,e)}},()=>[w===!0?null:g(B,{class:y?v:D,side:!0},()=>g(me,{name:b.icon!==null?b.icon:void 0})),g(B,S?()=>g("div",{class:"text-no-wrap",innerHTML:b.htmlTip}):b.tip?()=>g("div",{class:"text-no-wrap"},b.tip):void 0)])}),u=[e.toolbarBackgroundClass.value,D]}const h=t.highlight&&l!==t.label,m=g(_t,{...e.buttonProps.value,noCaps:!0,noWrap:!0,color:h?e.props.toolbarToggleColor:e.props.toolbarColor,textColor:h&&!e.props.toolbarPush?null:e.props.toolbarTextColor,label:t.fixedLabel?t.label:l,icon:t.fixedIcon?t.icon!==null?t.icon:void 0:r,contentClass:u,onShow:v=>e.emit("dropdownShow",v),onHide:v=>e.emit("dropdownHide",v),onBeforeShow:v=>e.emit("dropdownBeforeShow",v),onBeforeHide:v=>e.emit("dropdownBeforeHide",v)},()=>i);return m}function St(e){if(e.caret)return e.buttons.value.filter(t=>!e.isViewingSource.value||t.find(o=>o.cmd==="viewsource")).map(t=>ae(t.map(o=>e.isViewingSource.value&&o.cmd!=="viewsource"?!1:o.type==="slot"?ge(e.slots[o.slot]):o.type==="dropdown"?kt(e,o):ze(e,o))))}function Ct(e,t,o,l={}){const r=Object.keys(l);if(r.length===0)return{};const u={default_font:{cmd:"fontName",param:e,icon:o,tip:t}};return r.forEach(i=>{const p=l[i];u[i]={cmd:"fontName",param:p,icon:o,tip:p,htmlTip:`<font face="${p}">${p}</font>`}}),u}function Tt(e){if(e.caret){const t=e.props.toolbarColor||e.props.toolbarTextColor;let o=e.editLinkUrl.value;const l=()=>{e.caret.restore(),o!==e.editLinkUrl.value&&document.execCommand("createLink",!1,o===""?" ":o),e.editLinkUrl.value=null};return[g("div",{class:`q-mx-xs text-${t}`},`${e.$q.lang.editor.url}: `),g("input",{key:"qedt_btm_input",class:"col q-editor__link-input",value:o,onInput:r=>{ve(r),o=r.target.value},onKeydown:r=>{if(ye(r)!==!0)switch(r.keyCode){case 13:return ue(r),l();case 27:ue(r),e.caret.restore(),(!e.editLinkUrl.value||e.editLinkUrl.value==="https://")&&document.execCommand("unlink"),e.editLinkUrl.value=null;break}}}),ae([g(q,{key:"qedt_btm_rem",tabindex:-1,...e.buttonProps.value,label:e.$q.lang.label.remove,noCaps:!0,onClick:()=>{e.caret.restore(),document.execCommand("unlink"),e.editLinkUrl.value=null}}),g(q,{key:"qedt_btm_upd",...e.buttonProps.value,label:e.$q.lang.label.update,noCaps:!0,onClick:l})])]}}const Rt=Object.prototype.toString,oe=Object.prototype.hasOwnProperty,Dt=new Set(["Boolean","Number","String","Function","Array","Date","RegExp"].map(e=>"[object "+e+"]"));function he(e){if(e!==Object(e)||Dt.has(Rt.call(e))===!0||e.constructor&&oe.call(e,"constructor")===!1&&oe.call(e.constructor.prototype,"isPrototypeOf")===!1)return!1;let t;for(t in e);return t===void 0||oe.call(e,t)}function Le(){let e,t,o,l,r,u,i=arguments[0]||{},p=1,h=!1;const m=arguments.length;for(typeof i=="boolean"&&(h=i,i=arguments[1]||{},p=2),Object(i)!==i&&typeof i!="function"&&(i={}),m===p&&(i=this,p--);p<m;p++)if((e=arguments[p])!==null)for(t in e)o=i[t],l=e[t],i!==l&&(h===!0&&l&&((r=Array.isArray(l))||he(l)===!0)?(r===!0?u=Array.isArray(o)===!0?o:[]:u=he(o)===!0?o:{},i[t]=Le(h,u,l)):l!==void 0&&(i[t]=l));return i}var qt=ne({name:"QEditor",props:{...et,...dt,modelValue:{type:String,required:!0},readonly:Boolean,disable:Boolean,minHeight:{type:String,default:"10rem"},maxHeight:String,height:String,definitions:Object,fonts:Object,placeholder:String,toolbar:{type:Array,validator:e=>e.length===0||e.every(t=>t.length),default(){return[["left","center","right","justify"],["bold","italic","underline","strike"],["undo","redo"]]}},toolbarColor:String,toolbarBg:String,toolbarTextColor:String,toolbarToggleColor:{type:String,default:"primary"},toolbarOutline:Boolean,toolbarPush:Boolean,toolbarRounded:Boolean,paragraphTag:{type:String,validator:e=>["div","p"].includes(e),default:"div"},contentStyle:Object,contentClass:[Object,Array,String],square:Boolean,flat:Boolean,dense:Boolean},emits:[...ft,"update:modelValue","keydown","click","mouseup","keyup","touchend","focus","blur","dropdownShow","dropdownHide","dropdownBeforeShow","dropdownBeforeHide","linkShow","linkHide"],setup(e,{slots:t,emit:o,attrs:l}){const{proxy:r,vnode:u}=le(),{$q:i}=r,p=tt(e,i),{inFullscreen:h,toggleFullscreen:m}=ht(),v=ot(l,u),D=H(null),w=H(null),b=H(null),O=H(!1),y=P(()=>!e.readonly&&!e.disable);let S,d,R=e.modelValue;document.execCommand("defaultParagraphSeparator",!1,e.paragraphTag),S=window.getComputedStyle(document.body).fontFamily;const _=P(()=>e.toolbarBg?` bg-${e.toolbarBg}`:""),f=P(()=>{const n=e.toolbarOutline!==!0&&e.toolbarPush!==!0;return{type:"a",flat:n,noWrap:!0,outline:e.toolbarOutline,push:e.toolbarPush,rounded:e.toolbarRounded,dense:!0,color:e.toolbarColor,disable:!y.value,size:"sm"}}),V=P(()=>{const n=i.lang.editor,a=i.iconSet.editor;return{bold:{cmd:"bold",icon:a.bold,tip:n.bold,key:66},italic:{cmd:"italic",icon:a.italic,tip:n.italic,key:73},strike:{cmd:"strikeThrough",icon:a.strikethrough,tip:n.strikethrough,key:83},underline:{cmd:"underline",icon:a.underline,tip:n.underline,key:85},unordered:{cmd:"insertUnorderedList",icon:a.unorderedList,tip:n.unorderedList},ordered:{cmd:"insertOrderedList",icon:a.orderedList,tip:n.orderedList},subscript:{cmd:"subscript",icon:a.subscript,tip:n.subscript,htmlTip:"x<subscript>2</subscript>"},superscript:{cmd:"superscript",icon:a.superscript,tip:n.superscript,htmlTip:"x<superscript>2</superscript>"},link:{cmd:"link",disable:k=>k.caret&&!k.caret.can("link"),icon:a.hyperlink,tip:n.hyperlink,key:76},fullscreen:{cmd:"fullscreen",icon:a.toggleFullscreen,tip:n.toggleFullscreen,key:70},viewsource:{cmd:"viewsource",icon:a.viewSource,tip:n.viewSource},quote:{cmd:"formatBlock",param:"BLOCKQUOTE",icon:a.quote,tip:n.quote,key:81},left:{cmd:"justifyLeft",icon:a.left,tip:n.left},center:{cmd:"justifyCenter",icon:a.center,tip:n.center},right:{cmd:"justifyRight",icon:a.right,tip:n.right},justify:{cmd:"justifyFull",icon:a.justify,tip:n.justify},print:{type:"no-state",cmd:"print",icon:a.print,tip:n.print,key:80},outdent:{type:"no-state",disable:k=>k.caret&&!k.caret.can("outdent"),cmd:"outdent",icon:a.outdent,tip:n.outdent},indent:{type:"no-state",disable:k=>k.caret&&!k.caret.can("indent"),cmd:"indent",icon:a.indent,tip:n.indent},removeFormat:{type:"no-state",cmd:"removeFormat",icon:a.removeFormat,tip:n.removeFormat},hr:{type:"no-state",cmd:"insertHorizontalRule",icon:a.hr,tip:n.hr},undo:{type:"no-state",cmd:"undo",icon:a.undo,tip:n.undo,key:90},redo:{type:"no-state",cmd:"redo",icon:a.redo,tip:n.redo,key:89},h1:{cmd:"formatBlock",param:"H1",icon:a.heading1||a.heading,tip:n.heading1,htmlTip:`<h1 class="q-ma-none">${n.heading1}</h1>`},h2:{cmd:"formatBlock",param:"H2",icon:a.heading2||a.heading,tip:n.heading2,htmlTip:`<h2 class="q-ma-none">${n.heading2}</h2>`},h3:{cmd:"formatBlock",param:"H3",icon:a.heading3||a.heading,tip:n.heading3,htmlTip:`<h3 class="q-ma-none">${n.heading3}</h3>`},h4:{cmd:"formatBlock",param:"H4",icon:a.heading4||a.heading,tip:n.heading4,htmlTip:`<h4 class="q-ma-none">${n.heading4}</h4>`},h5:{cmd:"formatBlock",param:"H5",icon:a.heading5||a.heading,tip:n.heading5,htmlTip:`<h5 class="q-ma-none">${n.heading5}</h5>`},h6:{cmd:"formatBlock",param:"H6",icon:a.heading6||a.heading,tip:n.heading6,htmlTip:`<h6 class="q-ma-none">${n.heading6}</h6>`},p:{cmd:"formatBlock",param:e.paragraphTag,icon:a.heading,tip:n.paragraph},code:{cmd:"formatBlock",param:"PRE",icon:a.code,htmlTip:`<code>${n.code}</code>`},"size-1":{cmd:"fontSize",param:"1",icon:a.size1||a.size,tip:n.size1,htmlTip:`<font size="1">${n.size1}</font>`},"size-2":{cmd:"fontSize",param:"2",icon:a.size2||a.size,tip:n.size2,htmlTip:`<font size="2">${n.size2}</font>`},"size-3":{cmd:"fontSize",param:"3",icon:a.size3||a.size,tip:n.size3,htmlTip:`<font size="3">${n.size3}</font>`},"size-4":{cmd:"fontSize",param:"4",icon:a.size4||a.size,tip:n.size4,htmlTip:`<font size="4">${n.size4}</font>`},"size-5":{cmd:"fontSize",param:"5",icon:a.size5||a.size,tip:n.size5,htmlTip:`<font size="5">${n.size5}</font>`},"size-6":{cmd:"fontSize",param:"6",icon:a.size6||a.size,tip:n.size6,htmlTip:`<font size="6">${n.size6}</font>`},"size-7":{cmd:"fontSize",param:"7",icon:a.size7||a.size,tip:n.size7,htmlTip:`<font size="7">${n.size7}</font>`}}}),ie=P(()=>{const n=e.definitions||{},a=e.definitions||e.fonts?Le(!0,{},V.value,n,Ct(S,i.lang.editor.defaultFont,i.iconSet.editor.font,e.fonts)):V.value;return e.toolbar.map(k=>k.map(x=>{if(x.options)return{type:"dropdown",icon:x.icon,label:x.label,size:"sm",dense:!0,fixedLabel:x.fixedLabel,fixedIcon:x.fixedIcon,highlight:x.highlight,list:x.list,options:x.options.map(Ye=>a[Ye])};const M=a[x];return M?M.type==="no-state"||n[x]&&(M.cmd===void 0||V.value[M.cmd]&&V.value[M.cmd].type==="no-state")?M:Object.assign({type:"toggle"},M):{type:"slot",slot:x}}))}),I={$q:i,props:e,slots:t,emit:o,inFullscreen:h,toggleFullscreen:m,runCmd:Z,isViewingSource:O,editLinkUrl:b,toolbarBackgroundClass:_,buttonProps:f,contentRef:w,buttons:ie,setContent:J};G(()=>e.modelValue,n=>{R!==n&&(R=n,J(n,!0))}),G(b,n=>{o(`link${n?"Show":"Hide"}`)});const He=P(()=>e.toolbar&&e.toolbar.length!==0),Ie=P(()=>{const n={},a=k=>{k.key&&(n[k.key]={cmd:k.cmd,param:k.param})};return ie.value.forEach(k=>{k.forEach(x=>{x.options?x.options.forEach(a):a(x)})}),n}),$e=P(()=>h.value?e.contentStyle:[{minHeight:e.minHeight,height:e.height,maxHeight:e.maxHeight},e.contentStyle]),Ae=P(()=>`q-editor q-editor--${O.value===!0?"source":"default"}`+(e.disable===!0?" disabled":"")+(h.value===!0?" fullscreen column":"")+(e.square===!0?" q-editor--square no-border-radius":"")+(e.flat===!0?" q-editor--flat":"")+(e.dense===!0?" q-editor--dense":"")+(p.value===!0?" q-editor--dark q-dark":"")),Fe=P(()=>[e.contentClass,"q-editor__content",{col:h.value,"overflow-auto":h.value||e.maxHeight}]),Me=P(()=>e.disable===!0?{"aria-disabled":"true"}:{});function Ee(){if(w.value!==null){const n=`inner${O.value===!0?"Text":"HTML"}`,a=w.value[n];a!==e.modelValue&&(R=a,o("update:modelValue",a))}}function Ne(n){if(o("keydown",n),n.ctrlKey!==!0||ye(n)===!0){E();return}const a=n.keyCode,k=Ie.value[a];if(k!==void 0){const{cmd:x,param:M}=k;lt(n),Z(x,M,!1)}}function Ve(n){E(),o("click",n)}function Qe(n){if(w.value!==null){const{scrollTop:a,scrollHeight:k}=w.value;d=k-a}I.caret.save(),o("blur",n)}function Ue(n){be(()=>{w.value!==null&&d!==void 0&&(w.value.scrollTop=w.value.scrollHeight-d)}),o("focus",n)}function je(n){const a=D.value;if(a!==null&&a.contains(n.target)===!0&&(n.relatedTarget===null||a.contains(n.relatedTarget)!==!0)){const k=`inner${O.value===!0?"Text":"HTML"}`;I.caret.restorePosition(w.value[k].length),E()}}function Ke(n){const a=D.value;a!==null&&a.contains(n.target)===!0&&(n.relatedTarget===null||a.contains(n.relatedTarget)!==!0)&&(I.caret.savePosition(),E())}function re(){d=void 0}function se(n){I.caret.save()}function J(n,a){if(w.value!==null){a===!0&&I.caret.savePosition();const k=`inner${O.value===!0?"Text":"HTML"}`;w.value[k]=n,a===!0&&(I.caret.restorePosition(w.value[k].length),E())}}function Z(n,a,k=!0){ee(),I.caret.restore(),I.caret.apply(n,a,()=>{ee(),I.caret.save(),k&&E()})}function E(){setTimeout(()=>{b.value=null,r.$forceUpdate()},1)}function ee(){at(()=>{w.value!==null&&w.value.focus({preventScroll:!0})})}function Ge(){return w.value}return X(()=>{I.caret=r.caret=new yt(w.value,I),J(e.modelValue),E(),document.addEventListener("selectionchange",se)}),nt(()=>{document.removeEventListener("selectionchange",se)}),Object.assign(r,{runCmd:Z,refreshToolbar:E,focus:ee,getContentEl:Ge}),()=>{let n;if(He.value){const a=[g("div",{key:"qedt_top",class:"q-editor__toolbar row no-wrap scroll-x"+_.value},St(I))];b.value!==null&&a.push(g("div",{key:"qedt_btm",class:"q-editor__toolbar row no-wrap items-center scroll-x"+_.value},Tt(I))),n=g("div",{key:"toolbar_ctainer",class:"q-editor__toolbars-container"},a)}return g("div",{ref:D,class:Ae.value,style:{height:h.value===!0?"100%":null},...Me.value,onFocusin:je,onFocusout:Ke},[n,g("div",{ref:w,style:$e.value,class:Fe.value,contenteditable:y.value,placeholder:e.placeholder,...v.listeners.value,onInput:Ee,onKeydown:Ne,onClick:Ve,onBlur:Qe,onFocus:Ue,onMousedown:re,onTouchstartPassive:re})])}}});function K(e,t=new WeakMap){if(Object(e)!==e)return e;if(t.has(e))return t.get(e);const o=e instanceof Date?new Date(e):e instanceof RegExp?new RegExp(e.source,e.flags):e instanceof Set?new Set:e instanceof Map?new Map:typeof e.constructor!="function"?Object.create(null):e.prototype!==void 0&&typeof e.prototype.constructor=="function"?e:new e.constructor;if(typeof e.constructor=="function"&&typeof e.valueOf=="function"){const l=e.valueOf();if(Object(l)!==l){const r=new e.constructor(l);return t.set(e,r),r}}return t.set(e,o),e instanceof Set?e.forEach(l=>{o.add(K(l,t))}):e instanceof Map&&e.forEach((l,r)=>{o.set(r,K(l,t))}),Object.assign(o,...Object.keys(e).map(l=>({[l]:K(e[l],t)})))}var Bt=ne({name:"QPopupEdit",props:{modelValue:{required:!0},title:String,buttons:Boolean,labelSet:String,labelCancel:String,color:{type:String,default:"primary"},validate:{type:Function,default:()=>!0},autoSave:Boolean,cover:{type:Boolean,default:!0},disable:Boolean},emits:["update:modelValue","save","cancel","beforeShow","show","beforeHide","hide"],setup(e,{slots:t,emit:o}){const{proxy:l}=le(),{$q:r}=l,u=H(null),i=H(""),p=H("");let h=!1;const m=P(()=>it({initialValue:i.value,validate:e.validate,set:v,cancel:D,updatePosition:w},"value",()=>p.value,f=>{p.value=f}));function v(){e.validate(p.value)!==!1&&(b()===!0&&(o("save",p.value,i.value),o("update:modelValue",p.value)),O())}function D(){b()===!0&&o("cancel",p.value,i.value),O()}function w(){be(()=>{u.value.updatePosition()})}function b(){return rt(p.value,i.value)===!1}function O(){h=!0,u.value.hide()}function y(){h=!1,i.value=K(e.modelValue),p.value=K(e.modelValue),o("beforeShow")}function S(){o("show")}function d(){h===!1&&b()===!0&&(e.autoSave===!0&&e.validate(p.value)===!0?(o("save",p.value,i.value),o("update:modelValue",p.value)):o("cancel",p.value,i.value)),o("beforeHide")}function R(){o("hide")}function _(){const f=t.default!==void 0?[].concat(t.default(m.value)):[];return e.title&&f.unshift(g("div",{class:"q-dialog__title q-mt-sm q-mb-sm"},e.title)),e.buttons===!0&&f.push(g("div",{class:"q-popup-edit__buttons row justify-center no-wrap"},[g(q,{flat:!0,color:e.color,label:e.labelCancel||r.lang.label.cancel,onClick:D}),g(q,{flat:!0,color:e.color,label:e.labelSet||r.lang.label.set,onClick:v})])),f}return Object.assign(l,{set:v,cancel:D,show(f){u.value!==null&&u.value.show(f)},hide(f){u.value!==null&&u.value.hide(f)},updatePosition:w}),()=>{if(e.disable!==!0)return g(Re,{ref:u,class:"q-popup-edit",cover:e.cover,onBeforeShow:y,onShow:S,onBeforeHide:d,onHide:R,onEscapeKey:D},_)}}});const xt={class:"row"},Ot=U("div",{class:"col"},[U("div",{class:"text-h6"},"Update Used Item")],-1),Pt={key:0,class:"col text-right"},zt={key:0},Lt={key:0},Ht={key:0},It={__name:"serviceOprItemAdd",props:{mode:String,dataItem:Array},setup(e){const{dialogRef:t,onDialogHide:o,onDialogOK:l,onDialogCancel:r}=De(),u=qe(),i=e;X(async()=>{i.dataItem.listFixDet&&(h.value=i.dataItem.listFixDet,await w())});const p=H([]),h=H([]),m=H(!1),v=()=>{h.value.push({TSRVD_ID:i.dataItem.id,TSRVF_ITMCD:"",TSRVF_PRC:0,TSRVF_QTY:1})},D=(y,S,d,R)=>{S(async()=>{R==="item"&&await w(y)})},w=async y=>{m.value=!0,await j.post("item/searchAPITBL",{searchValue:y}).then(S=>{m.value=!1,p.value=S.data.data}).catch(()=>{m.value=!1})},b=()=>{i.mode==="view"?l(h.value):u.dialog({title:"Confirmation",message:"Are you sure want to save this items ?",cancel:!0,persistent:!0}).onOk(async()=>{l(h.value)})},O=y=>{u.dialog({title:"Confirmation",message:`Do you want to delete this lines no ${y+1} ?`,cancel:!0,persistent:!0}).onOk(async()=>{h.value.splice(y,1)})};return(y,S)=>(C(),z(Te,{ref_key:"dialogRef",ref:t,onHide:$(o),"transition-show":"slide-up","transition-hide":"slide-down","full-width":""},{default:s(()=>[c(we,{class:"q-dialog-plugin bg-white q-pa-sm"},{default:s(()=>[c(Y,null,{default:s(()=>[U("div",xt,[Ot,i.mode!=="view"?(C(),N("div",Pt,[c(q,{icon:"add",outline:"",color:"blue",onClick:v})])):A("",!0)])]),_:1}),c(Y,{class:"q-pa-sm",style:{"max-height":"50vh"}},{default:s(()=>[c(Be,{bordered:""},{default:s(()=>[h.value.length===0?ce((C(),z(W,{key:0,class:"q-my-sm",clickable:""},{default:s(()=>[c(B,null,{default:s(()=>[T(" No items added ")]),_:1})]),_:1})),[[de]]):A("",!0),(C(!0),N(_e,null,ke(h.value,(d,R)=>ce((C(),z(W,{key:R,class:"q-my-sm",clickable:""},{default:s(()=>[c(B,{avatar:""},{default:s(()=>[c(Se,{color:"primary","text-color":"white"},{default:s(()=>[T(F(R+1),1)]),_:2},1024)]),_:2},1024),c(B,null,{default:s(()=>[c(L,null,{default:s(()=>[i.mode==="view"?(C(),N("div",zt,[c(L,null,{default:s(()=>[T(F(d.MITM_ITMNM),1)]),_:2},1024),c(L,{caption:""},{default:s(()=>[T(" Item ")]),_:1})])):(C(),z(pt,{key:1,dense:"",filled:"",label:"Item Name",modelValue:d.TSRVF_ITMCD,"onUpdate:modelValue":_=>d.TSRVF_ITMCD=_,"use-input":"","input-debounce":"500",options:p.value,onFilter:S[0]||(S[0]=(_,f,V)=>D(_,f,V,"item")),behavior:"dialog","option-label":"MITM_ITMNM","option-value":"MITM_ITMCD","emit-value":"","map-options":"",loading:m.value,readonly:i.mode==="view"},null,8,["modelValue","onUpdate:modelValue","options","loading","readonly"]))]),_:2},1024)]),_:2},1024),c(B,null,{default:s(()=>[i.mode==="view"?(C(),N("div",Lt,[c(L,null,{default:s(()=>[T(F(d.TSRVF_PRC.toLocaleString()),1)]),_:2},1024),c(L,{caption:""},{default:s(()=>[T(" Price ")]),_:1})])):(C(),z(fe,{key:1,label:"Price",modelValue:d.TSRVF_PRC,"onUpdate:modelValue":_=>d.TSRVF_PRC=_,filled:"",dense:"",readonly:i.mode==="view"},null,8,["modelValue","onUpdate:modelValue","readonly"]))]),_:2},1024),c(B,null,{default:s(()=>[i.mode==="view"?(C(),N("div",Ht,[c(L,null,{default:s(()=>[T(F(d.TSRVF_QTY.toLocaleString()),1)]),_:2},1024),c(L,{caption:""},{default:s(()=>[T(" Qty ")]),_:1})])):(C(),z(fe,{key:1,label:"Qty",modelValue:d.TSRVF_QTY,"onUpdate:modelValue":_=>d.TSRVF_QTY=_,filled:"",dense:"",readonly:i.mode==="view"},null,8,["modelValue","onUpdate:modelValue","readonly"]))]),_:2},1024),i.mode==="view"?(C(),z(B,{key:0},{default:s(()=>[c(L,null,{default:s(()=>[T(" Rp "+F((parseInt(d.TSRVF_PRC)*parseInt(d.TSRVF_QTY)).toLocaleString()),1)]),_:2},1024),c(L,{caption:""},{default:s(()=>[T(" Total Price ")]),_:1})]),_:2},1024)):A("",!0),e.mode!=="view"?(C(),z(B,{key:1,side:""},{default:s(()=>[c(q,{icon:"delete",flat:"",color:"red",onClick:_=>O(R)},null,8,["onClick"])]),_:2},1024)):A("",!0)]),_:2},1024)),[[de]])),128))]),_:1})]),_:1}),c(Ce,{align:"right"},{default:s(()=>[c(q,{label:"OK",color:"primary",onClick:S[1]||(S[1]=d=>b()),disable:m.value,loading:m.value},null,8,["disable","loading"]),c(q,{flat:"",label:"Cancel",color:"red",onClick:$(r),loading:m.value},null,8,["onClick","loading"])]),_:1})]),_:1})]),_:1},8,["onHide"]))}},$t={class:"text-h6"},At={class:"cursor-pointer"},Ft={key:0},Mt={key:1},Et=["innerHTML"],Gt={__name:"serviceOprUpdateOrder",props:{header:Array,detail:Array,mode:String},setup(e){const{dialogRef:t,onDialogHide:o,onDialogOK:l,onDialogCancel:r}=De(),u=qe(),i=e,p=H({SRVH_DOCNO:"",SRVH_ISSDT:gt.formatDate(Date.now(),"YYYY-MM-DD"),SRVH_CUSCD:""}),h=H([]),m=H(!1);X(async()=>{i.header&&(p.value=i.header,h.value=i.detail)});const v=(y,S="add")=>{u.dialog({component:It,componentProps:{mode:S,dataItem:h.value[y]}}).onOk(async d=>{h.value[y].TSRVD_FLGSTS=1,h.value[y].listFixDet=d})},D=()=>{i.mode==="view"?l():u.dialog({title:"Confirmation",message:"Do you want to submit this data ?",cancel:!0,persistent:!0}).onOk(async()=>{m.value=!0,await j.post("servicesOPR",{data:h.value}).then(y=>{m.value=!1,l()})})},w=y=>{console.log(h.value[y]),u.dialog({title:"Confirmation",message:"Do you want to approve this price ?",cancel:!0,persistent:!0}).onOk(async()=>{m.value=!0,await j.put(`servicesAdmin/updateByDet/${btoa(h.value[y].id)}`,{TSRVD_FLGSTS:2}).then(S=>{m.value=!1,l()}).catch(S=>{m.value=!1})})},b=y=>{u.dialog({title:"Confirmation",message:"Do you want to reject this price ?",cancel:!0,persistent:!0}).onOk(async()=>{m.value=!0,await j.put(`servicesAdmin/updateByDet/${btoa(h[y].value[y].id)}`,{TSRVD_FLGSTS:1}).then(S=>{m.value=!1,l()}).catch(S=>{m.value=!1})})},O=y=>{u.dialog({title:"Confirmation",message:"Do you want to mark this problem as done ?",cancel:!0,persistent:!0}).onOk(async()=>{m.value=!0,await j.put(`servicesAdmin/${btoa(val.SRVH_DOCNO)}`,{TSRVD_FLGSTS:3}).then(S=>{m.value=!1}).catch(S=>{m.value=!1})})};return(y,S)=>(C(),z(Te,{ref_key:"dialogRef",ref:t,onHide:$(o),"transition-show":"slide-up","transition-hide":"slide-down","full-width":""},{default:s(()=>[c(we,{class:"q-dialog-plugin bg-white q-pa-sm"},{default:s(()=>[c(Y,null,{default:s(()=>[U("div",$t,"Update Order "+F(p.value.SRVH_DOCNO),1)]),_:1}),c(Y,{class:"q-pa-sm"},{default:s(()=>[c(Be,{bordered:""},{default:s(()=>[(C(!0),N(_e,null,ke(h.value,(d,R)=>(C(),z(W,{key:R,class:st("q-my-sm")},{default:s(()=>[c(B,{avatar:""},{default:s(()=>[c(Se,{color:d.TSRVD_FLGSTS===0?"red":"primary","text-color":"white"},{default:s(()=>[T(F(d.TSRVD_LINE),1)]),_:2},1032,["color"])]),_:2},1024),c(B,null,{default:s(()=>[c(L,null,{default:s(()=>[T(F(d.TSRVD_ITMCD),1)]),_:2},1024),c(L,{caption:"",lines:"1"},{default:s(()=>[T("Item")]),_:1})]),_:2},1024),c(B,null,{default:s(()=>[c(L,null,{default:s(()=>[T(F(d.TSRVD_CUSTRMK),1)]),_:2},1024),c(L,{caption:"",lines:"1"},{default:s(()=>[T("Customer Remarks")]),_:1})]),_:2},1024),c(B,null,{default:s(()=>[c(L,null,{default:s(()=>[U("div",At,[d.TSRVD_REMARK?(C(),N("span",Mt,[U("div",{innerHTML:d.TSRVD_REMARK},null,8,Et)])):(C(),N("span",Ft," No comment yet !, Click here to add comment. ")),i.mode!=="view"?(C(),z(Bt,{key:2,modelValue:d.TSRVD_REMARK,"onUpdate:modelValue":_=>d.TSRVD_REMARK=_,"auto-save":""},{default:s(_=>[c(qt,{onKeyup:ut(_.set,["enter"]),modelValue:_.value,"onUpdate:modelValue":f=>_.value=f,dense:$(u).screen.lt.md,toolbar:[[{label:$(u).lang.editor.align,icon:$(u).iconSet.editor.align,fixedLabel:!0,options:["left","center","right","justify"]}],["bold","italic","strike","underline","subscript","superscript"],["token","hr","link","custom_btn"],["print","fullscreen"],[{label:$(u).lang.editor.formatting,icon:$(u).iconSet.editor.formatting,list:"no-icons",options:["p","h1","h2","h3","h4","h5","h6","code"]},{label:$(u).lang.editor.fontSize,icon:$(u).iconSet.editor.fontSize,fixedLabel:!0,fixedIcon:!0,list:"no-icons",options:["size-1","size-2","size-3","size-4","size-5","size-6","size-7"]},{label:$(u).lang.editor.defaultFont,icon:$(u).iconSet.editor.font,fixedIcon:!0,list:"no-icons",options:["default_font","arial","arial_black","comic_sans","courier_new","impact","lucida_grande","times_new_roman","verdana"]},"removeFormat"],["quote","unordered","ordered","outdent","indent"],["undo","redo"],["viewsource"]],fonts:{arial:"Arial",arial_black:"Arial Black",comic_sans:"Comic Sans MS",courier_new:"Courier New",impact:"Impact",lucida_grande:"Lucida Grande",times_new_roman:"Times New Roman",verdana:"Verdana"}},null,8,["onKeyup","modelValue","onUpdate:modelValue","dense","toolbar"])]),_:2},1032,["modelValue","onUpdate:modelValue"])):A("",!0)])]),_:2},1024),c(L,{caption:"",lines:"1"},{default:s(()=>[T("Operator Remarks")]),_:1})]),_:2},1024),i.mode==="edit"&&d.TSRVD_FLGSTS<2?(C(),z(B,{key:0,side:""},{default:s(()=>[c(q,{icon:"construction",color:"green",flat:"",onClick:_=>v(R,"add")},{default:s(()=>[c(Q,null,{default:s(()=>[T("Update Fix Data")]),_:1})]),_:2},1032,["onClick"])]),_:2},1024)):A("",!0),c(B,{side:""},{default:s(()=>[c(q,{icon:"visibility",color:"cyan",flat:"",onClick:_=>v(R,"view"),disable:!d.listFixDet},{default:s(()=>[c(Q,null,{default:s(()=>[T("View Added Item")]),_:1}),d.listFixDet.length>0?(C(),z(mt,{key:0,color:"red",floating:""},{default:s(()=>[T(F(d.listFixDet.length),1)]),_:2},1024)):A("",!0)]),_:2},1032,["onClick","disable"])]),_:2},1024),i.mode==="approvecust"?(C(),z(B,{key:1,side:""},{default:s(()=>[c(q,{icon:"how_to_reg",color:"green",outline:"",onClick:_=>w(R)},{default:s(()=>[c(Q,null,{default:s(()=>[T("Approve this as customer")]),_:1})]),_:2},1032,["onClick"])]),_:2},1024)):A("",!0),i.mode==="approvecust"?(C(),z(B,{key:2,side:""},{default:s(()=>[c(q,{icon:"cancel",color:"red",outline:"",onClick:_=>b(R)},{default:s(()=>[c(Q,null,{default:s(()=>[T("Reject this as customer")]),_:1})]),_:2},1032,["onClick"])]),_:2},1024)):A("",!0),i.mode==="edit"&&d.TSRVD_FLGSTS===2?(C(),z(B,{key:3,side:""},{default:s(()=>[c(q,{icon:"task",color:"indigo",outline:"",onClick:_=>O(R)},{default:s(()=>[c(Q,null,{default:s(()=>[T("Mark this problem as done")]),_:1})]),_:2},1032,["onClick"])]),_:2},1024)):A("",!0)]),_:2},1024))),128))]),_:1})]),_:1}),c(Ce,{align:"right"},{default:s(()=>[c(q,{label:"OK",color:"primary",onClick:S[0]||(S[0]=d=>D()),disable:m.value||h.value.filter(d=>d.listFixDet).length===0||h.value.filter(d=>d.TSRVD_REMARK).length===0,loading:m.value},null,8,["disable","loading"]),c(q,{flat:"",label:"Cancel",color:"red",onClick:$(r),loading:m.value},null,8,["onClick","loading"])]),_:1})]),_:1})]),_:1},8,["onHide"]))}};export{Gt as _};
