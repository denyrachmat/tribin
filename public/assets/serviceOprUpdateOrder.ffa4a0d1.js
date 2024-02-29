import{n as Ye,c as ne,bb as pe,U as Xe,s as z,bc as Je,a as O,aR as Ze,w as G,o as X,h as g,aa as me,d as ge,Q as D,g as le,aH as ve,aI as ye,a6 as ue,ab as et,ac as tt,bd as ot,j as nt,a3 as lt,F as be,ay as at,aQ as it,aD as rt,B as q,C as A,D as u,E as c,J as we,K as W,I as U,R as j,aY as I,aW as ce,H as P,ap as de,aU as ke,aV as Ce,aZ as Se,aX as M,P as fe,L as _e,M as L,O as Te,ba as st,be as ut}from"./index.d291c9f5.js";import{q as De,c as ct,l as B,k as Y,y as dt,z as ft,A as ht,u as Re,b as qe,Q as Be,m as E,d as pt}from"./use-dialog-plugin-component.16fb7416.js";import{Q as V}from"./QTooltip.c46ce80d.js";import{Q as mt}from"./QBadge.b5bb0712.js";import{api_web as Q}from"./axios.ceafae4c.js";import{d as gt}from"./date.5e48a307.js";function xe(e,t){if(t&&e===t)return null;const o=e.nodeName.toLowerCase();if(["div","li","ul","ol","blockquote"].includes(o)===!0)return e;const l=window.getComputedStyle?window.getComputedStyle(e):e.currentStyle,r=l.display;return r==="block"||r==="table"?e:xe(e.parentNode)}function te(e,t,o){return!e||e===document.body?!1:o===!0&&e===t||(t===document?document.body:t).contains(e.parentNode)}function Oe(e,t,o){if(o||(o=document.createRange(),o.selectNode(e),o.setStart(e,0)),t.count===0)o.setEnd(e,t.count);else if(t.count>0)if(e.nodeType===Node.TEXT_NODE)e.textContent.length<t.count?t.count-=e.textContent.length:(o.setEnd(e,t.count),t.count=0);else for(let l=0;t.count!==0&&l<e.childNodes.length;l++)o=Oe(e.childNodes[l],t,o);return o}const vt=/^https?:\/\//;class yt{constructor(t,o){this.el=t,this.eVm=o,this._range=null}get selection(){if(this.el){const t=document.getSelection();if(te(t.anchorNode,this.el,!0)&&te(t.focusNode,this.el,!0))return t}return null}get hasSelection(){return this.selection!==null?this.selection.toString().length!==0:!1}get range(){const t=this.selection;return t!==null&&t.rangeCount?t.getRangeAt(0):this._range}get parent(){const t=this.range;if(t!==null){const o=t.startContainer;return o.nodeType===document.ELEMENT_NODE?o:o.parentNode}return null}get blockParent(){const t=this.parent;return t!==null?xe(t,this.el):null}save(t=this.range){t!==null&&(this._range=t)}restore(t=this._range){const o=document.createRange(),l=document.getSelection();t!==null?(o.setStart(t.startContainer,t.startOffset),o.setEnd(t.endContainer,t.endOffset),l.removeAllRanges(),l.addRange(o)):(l.selectAllChildren(this.el),l.collapseToEnd())}savePosition(){let t=-1,o;const l=document.getSelection(),r=this.el.parentNode;if(l.focusNode&&te(l.focusNode,r))for(o=l.focusNode,t=l.focusOffset;o&&o!==r;)o!==this.el&&o.previousSibling?(o=o.previousSibling,t+=o.textContent.length):o=o.parentNode;this.savedPos=t}restorePosition(t=0){if(this.savedPos>0&&this.savedPos<t){const o=window.getSelection(),l=Oe(this.el,{count:this.savedPos});l&&(l.collapse(!1),o.removeAllRanges(),o.addRange(l))}}hasParent(t,o){const l=o?this.parent:this.blockParent;return l!==null?l.nodeName.toLowerCase()===t.toLowerCase():!1}hasParents(t,o,l=this.parent){return l===null?!1:t.includes(l.nodeName.toLowerCase())===!0?!0:o===!0?this.hasParents(t,o,l.parentNode):!1}is(t,o){if(this.selection===null)return!1;switch(t){case"formatBlock":return o==="DIV"&&this.parent===this.el||this.hasParent(o,o==="PRE");case"link":return this.hasParent("A",!0);case"fontSize":return document.queryCommandValue(t)===o;case"fontName":const l=document.queryCommandValue(t);return l===`"${o}"`||l===o;case"fullscreen":return this.eVm.inFullscreen.value;case"viewsource":return this.eVm.isViewingSource.value;case void 0:return!1;default:const r=document.queryCommandState(t);return o!==void 0?r===o:r}}getParentAttribute(t){return this.parent!==null?this.parent.getAttribute(t):null}can(t){if(t==="outdent")return this.hasParents(["blockquote","li"],!0);if(t==="indent")return this.hasParents(["li"],!0);if(t==="link")return this.selection!==null||this.is("link")}apply(t,o,l=Ye){if(t==="formatBlock")["BLOCKQUOTE","H1","H2","H3","H4","H5","H6"].includes(o)&&this.is(t,o)&&(t="outdent",o=null),o==="PRE"&&this.is(t,"PRE")&&(o="P");else if(t==="print"){l();const r=window.open();r.document.write(`
        <!doctype html>
        <html>
          <head>
            <title>Print - ${document.title}</title>
          </head>
          <body>
            <div>${this.el.innerHTML}</div>
          </body>
        </html>
      `),r.print(),r.close();return}else if(t==="link"){const r=this.getParentAttribute("href");if(r===null){const s=this.selectWord(this.selection),i=s?s.toString():"";if(!i.length&&(!this.range||!this.range.cloneContents().querySelector("img")))return;this.eVm.editLinkUrl.value=vt.test(i)?i:"https://",document.execCommand("createLink",!1,this.eVm.editLinkUrl.value),this.save(s.getRangeAt(0))}else this.eVm.editLinkUrl.value=r,this.range.selectNodeContents(this.parent),this.save();return}else if(t==="fullscreen"){this.eVm.toggleFullscreen(),l();return}else if(t==="viewsource"){this.eVm.isViewingSource.value=this.eVm.isViewingSource.value===!1,this.eVm.setContent(this.eVm.props.modelValue),l();return}document.execCommand(t,!1,o),l()}selectWord(t){if(t===null||t.isCollapsed!==!0||t.modify===void 0)return t;const o=document.createRange();o.setStart(t.anchorNode,t.anchorOffset),o.setEnd(t.focusNode,t.focusOffset);const l=o.collapsed?["backward","forward"]:["forward","backward"];o.detach();const r=t.focusNode,s=t.focusOffset;return t.collapse(t.anchorNode,t.anchorOffset),t.modify("move",l[0],"character"),t.modify("move",l[1],"word"),t.extend(r,s),t.modify("extend",l[1],"character"),t.modify("extend",l[0],"word"),t}}const bt=Object.keys(pe),wt=e=>bt.reduce((t,o)=>{const l=e[o];return l!==void 0&&(t[o]=l),t},{});var kt=ne({name:"QBtnDropdown",props:{...pe,...Xe,modelValue:Boolean,split:Boolean,dropdownIcon:String,contentClass:[Array,String,Object],contentStyle:[Array,String,Object],cover:Boolean,persistent:Boolean,noRouteDismiss:Boolean,autoClose:Boolean,menuAnchor:{type:String,default:"bottom end"},menuSelf:{type:String,default:"top end"},menuOffset:Array,disableMainBtn:Boolean,disableDropdown:Boolean,noIconAnimation:Boolean,toggleAriaLabel:String},emits:["update:modelValue","click","beforeShow","show","beforeHide","hide"],setup(e,{slots:t,emit:o}){const{proxy:l}=le(),r=z(e.modelValue),s=z(null),i=Je(),h=O(()=>{const d={"aria-expanded":r.value===!0?"true":"false","aria-haspopup":"true","aria-controls":i.value,"aria-label":e.toggleAriaLabel||l.$q.lang.label[r.value===!0?"collapse":"expand"](e.label)};return(e.disable===!0||e.split===!1&&e.disableMainBtn===!0||e.disableDropdown===!0)&&(d["aria-disabled"]="true"),d}),f=O(()=>"q-btn-dropdown__arrow"+(r.value===!0&&e.noIconAnimation===!1?" rotate-180":"")+(e.split===!1?" q-btn-dropdown__arrow-container":"")),m=O(()=>Ze(e)),v=O(()=>wt(e));G(()=>e.modelValue,d=>{s.value!==null&&s.value[d?"show":"hide"]()}),G(()=>e.split,k);function T(d){r.value=!0,o("beforeShow",d)}function w(d){o("show",d),o("update:modelValue",!0)}function b(d){r.value=!1,o("beforeHide",d)}function x(d){o("hide",d),o("update:modelValue",!1)}function y(d){o("click",d)}function S(d){ve(d),k(),o("click",d)}function p(d){s.value!==null&&s.value.toggle(d)}function _(d){s.value!==null&&s.value.show(d)}function k(d){s.value!==null&&s.value.hide(d)}return Object.assign(l,{show:_,hide:k,toggle:p}),X(()=>{e.modelValue===!0&&_()}),()=>{const d=[g(me,{class:f.value,name:e.dropdownIcon||l.$q.iconSet.arrow.dropdown})];return e.disableDropdown!==!0&&d.push(g(De,{ref:s,id:i.value,class:e.contentClass,style:e.contentStyle,cover:e.cover,fit:!0,persistent:e.persistent,noRouteDismiss:e.noRouteDismiss,autoClose:e.autoClose,anchor:e.menuAnchor,self:e.menuSelf,offset:e.menuOffset,separateClosePopup:!0,transitionShow:e.transitionShow,transitionHide:e.transitionHide,transitionDuration:e.transitionDuration,onBeforeShow:T,onShow:w,onBeforeHide:b,onHide:x},t.default)),e.split===!1?g(D,{class:"q-btn-dropdown q-btn-dropdown--simple",...v.value,...h.value,disable:e.disable===!0||e.disableMainBtn===!0,noWrap:!0,round:!1,onClick:y},{default:()=>ge(t.label,[]).concat(d),loading:t.loading}):g(ct,{class:"q-btn-dropdown q-btn-dropdown--split no-wrap q-btn-item",rounded:e.rounded,square:e.square,...m.value,glossy:e.glossy,stretch:e.stretch},()=>[g(D,{class:"q-btn-dropdown--current",...v.value,disable:e.disable===!0||e.disableMainBtn===!0,noWrap:!0,round:!1,onClick:S},{default:t.label,loading:t.loading}),g(D,{class:"q-btn-dropdown__arrow-container q-anchor--skip",...h.value,...m.value,disable:e.disable===!0||e.disableDropdown===!0,rounded:e.rounded,color:e.color,textColor:e.textColor,dense:e.dense,size:e.size,padding:e.padding,ripple:e.ripple},()=>d)])}}});function ze(e,t,o){t.handler?t.handler(e,o,o.caret):o.runCmd(t.cmd,t.param)}function ae(e){return g("div",{class:"q-editor__toolbar-group"},e)}function Pe(e,t,o,l=!1){const r=l||(t.type==="toggle"?t.toggled?t.toggled(e):t.cmd&&e.caret.is(t.cmd,t.param):!1),s=[];if(t.tip&&e.$q.platform.is.desktop){const i=t.key?g("div",[g("small",`(CTRL + ${String.fromCharCode(t.key)})`)]):null;s.push(g(V,{delay:1e3},()=>[g("div",{innerHTML:t.tip}),i]))}return g(D,{...e.buttonProps.value,icon:t.icon!==null?t.icon:void 0,color:r?t.toggleColor||e.props.toolbarToggleColor:t.color||e.props.toolbarColor,textColor:r&&!e.props.toolbarPush?null:t.textColor||e.props.toolbarTextColor,label:t.label,disable:t.disable?typeof t.disable=="function"?t.disable(e):!0:!1,size:"sm",onClick(i){o&&o(),ze(i,t,e)}},()=>s)}function Ct(e,t){const o=t.list==="only-icons";let l=t.label,r=t.icon!==null?t.icon:void 0,s,i;function h(){m.component.proxy.hide()}if(o)i=t.options.map(v=>{const T=v.type===void 0?e.caret.is(v.cmd,v.param):!1;return T&&(l=v.tip,r=v.icon!==null?v.icon:void 0),Pe(e,v,h,T)}),s=e.toolbarBackgroundClass.value,i=[ae(i)];else{const v=e.props.toolbarToggleColor!==void 0?`text-${e.props.toolbarToggleColor}`:null,T=e.props.toolbarTextColor!==void 0?`text-${e.props.toolbarTextColor}`:null,w=t.list==="no-icons";i=t.options.map(b=>{const x=b.disable?b.disable(e):!1,y=b.type===void 0?e.caret.is(b.cmd,b.param):!1;y&&(l=b.tip,r=b.icon!==null?b.icon:void 0);const S=b.htmlTip;return g(Y,{active:y,activeClass:v,clickable:!0,disable:x,dense:!0,onClick(p){h(),e.contentRef.value!==null&&e.contentRef.value.focus(),e.caret.restore(),ze(p,b,e)}},()=>[w===!0?null:g(B,{class:y?v:T,side:!0},()=>g(me,{name:b.icon!==null?b.icon:void 0})),g(B,S?()=>g("div",{class:"text-no-wrap",innerHTML:b.htmlTip}):b.tip?()=>g("div",{class:"text-no-wrap"},b.tip):void 0)])}),s=[e.toolbarBackgroundClass.value,T]}const f=t.highlight&&l!==t.label,m=g(kt,{...e.buttonProps.value,noCaps:!0,noWrap:!0,color:f?e.props.toolbarToggleColor:e.props.toolbarColor,textColor:f&&!e.props.toolbarPush?null:e.props.toolbarTextColor,label:t.fixedLabel?t.label:l,icon:t.fixedIcon?t.icon!==null?t.icon:void 0:r,contentClass:s,onShow:v=>e.emit("dropdownShow",v),onHide:v=>e.emit("dropdownHide",v),onBeforeShow:v=>e.emit("dropdownBeforeShow",v),onBeforeHide:v=>e.emit("dropdownBeforeHide",v)},()=>i);return m}function St(e){if(e.caret)return e.buttons.value.filter(t=>!e.isViewingSource.value||t.find(o=>o.cmd==="viewsource")).map(t=>ae(t.map(o=>e.isViewingSource.value&&o.cmd!=="viewsource"?!1:o.type==="slot"?ge(e.slots[o.slot]):o.type==="dropdown"?Ct(e,o):Pe(e,o))))}function _t(e,t,o,l={}){const r=Object.keys(l);if(r.length===0)return{};const s={default_font:{cmd:"fontName",param:e,icon:o,tip:t}};return r.forEach(i=>{const h=l[i];s[i]={cmd:"fontName",param:h,icon:o,tip:h,htmlTip:`<font face="${h}">${h}</font>`}}),s}function Tt(e){if(e.caret){const t=e.props.toolbarColor||e.props.toolbarTextColor;let o=e.editLinkUrl.value;const l=()=>{e.caret.restore(),o!==e.editLinkUrl.value&&document.execCommand("createLink",!1,o===""?" ":o),e.editLinkUrl.value=null};return[g("div",{class:`q-mx-xs text-${t}`},`${e.$q.lang.editor.url}: `),g("input",{key:"qedt_btm_input",class:"col q-editor__link-input",value:o,onInput:r=>{ve(r),o=r.target.value},onKeydown:r=>{if(ye(r)!==!0)switch(r.keyCode){case 13:return ue(r),l();case 27:ue(r),e.caret.restore(),(!e.editLinkUrl.value||e.editLinkUrl.value==="https://")&&document.execCommand("unlink"),e.editLinkUrl.value=null;break}}}),ae([g(D,{key:"qedt_btm_rem",tabindex:-1,...e.buttonProps.value,label:e.$q.lang.label.remove,noCaps:!0,onClick:()=>{e.caret.restore(),document.execCommand("unlink"),e.editLinkUrl.value=null}}),g(D,{key:"qedt_btm_upd",...e.buttonProps.value,label:e.$q.lang.label.update,noCaps:!0,onClick:l})])]}}const Dt=Object.prototype.toString,oe=Object.prototype.hasOwnProperty,Rt=new Set(["Boolean","Number","String","Function","Array","Date","RegExp"].map(e=>"[object "+e+"]"));function he(e){if(e!==Object(e)||Rt.has(Dt.call(e))===!0||e.constructor&&oe.call(e,"constructor")===!1&&oe.call(e.constructor.prototype,"isPrototypeOf")===!1)return!1;let t;for(t in e);return t===void 0||oe.call(e,t)}function He(){let e,t,o,l,r,s,i=arguments[0]||{},h=1,f=!1;const m=arguments.length;for(typeof i=="boolean"&&(f=i,i=arguments[1]||{},h=2),Object(i)!==i&&typeof i!="function"&&(i={}),m===h&&(i=this,h--);h<m;h++)if((e=arguments[h])!==null)for(t in e)o=i[t],l=e[t],i!==l&&(f===!0&&l&&((r=Array.isArray(l))||he(l)===!0)?(r===!0?s=Array.isArray(o)===!0?o:[]:s=he(o)===!0?o:{},i[t]=He(f,s,l)):l!==void 0&&(i[t]=l));return i}var qt=ne({name:"QEditor",props:{...et,...dt,modelValue:{type:String,required:!0},readonly:Boolean,disable:Boolean,minHeight:{type:String,default:"10rem"},maxHeight:String,height:String,definitions:Object,fonts:Object,placeholder:String,toolbar:{type:Array,validator:e=>e.length===0||e.every(t=>t.length),default(){return[["left","center","right","justify"],["bold","italic","underline","strike"],["undo","redo"]]}},toolbarColor:String,toolbarBg:String,toolbarTextColor:String,toolbarToggleColor:{type:String,default:"primary"},toolbarOutline:Boolean,toolbarPush:Boolean,toolbarRounded:Boolean,paragraphTag:{type:String,validator:e=>["div","p"].includes(e),default:"div"},contentStyle:Object,contentClass:[Object,Array,String],square:Boolean,flat:Boolean,dense:Boolean},emits:[...ft,"update:modelValue","keydown","click","mouseup","keyup","touchend","focus","blur","dropdownShow","dropdownHide","dropdownBeforeShow","dropdownBeforeHide","linkShow","linkHide"],setup(e,{slots:t,emit:o,attrs:l}){const{proxy:r,vnode:s}=le(),{$q:i}=r,h=tt(e,i),{inFullscreen:f,toggleFullscreen:m}=ht(),v=ot(l,s),T=z(null),w=z(null),b=z(null),x=z(!1),y=O(()=>!e.readonly&&!e.disable);let S,p,_=e.modelValue;document.execCommand("defaultParagraphSeparator",!1,e.paragraphTag),S=window.getComputedStyle(document.body).fontFamily;const k=O(()=>e.toolbarBg?` bg-${e.toolbarBg}`:""),d=O(()=>{const n=e.toolbarOutline!==!0&&e.toolbarPush!==!0;return{type:"a",flat:n,noWrap:!0,outline:e.toolbarOutline,push:e.toolbarPush,rounded:e.toolbarRounded,dense:!0,color:e.toolbarColor,disable:!y.value,size:"sm"}}),N=O(()=>{const n=i.lang.editor,a=i.iconSet.editor;return{bold:{cmd:"bold",icon:a.bold,tip:n.bold,key:66},italic:{cmd:"italic",icon:a.italic,tip:n.italic,key:73},strike:{cmd:"strikeThrough",icon:a.strikethrough,tip:n.strikethrough,key:83},underline:{cmd:"underline",icon:a.underline,tip:n.underline,key:85},unordered:{cmd:"insertUnorderedList",icon:a.unorderedList,tip:n.unorderedList},ordered:{cmd:"insertOrderedList",icon:a.orderedList,tip:n.orderedList},subscript:{cmd:"subscript",icon:a.subscript,tip:n.subscript,htmlTip:"x<subscript>2</subscript>"},superscript:{cmd:"superscript",icon:a.superscript,tip:n.superscript,htmlTip:"x<superscript>2</superscript>"},link:{cmd:"link",disable:C=>C.caret&&!C.caret.can("link"),icon:a.hyperlink,tip:n.hyperlink,key:76},fullscreen:{cmd:"fullscreen",icon:a.toggleFullscreen,tip:n.toggleFullscreen,key:70},viewsource:{cmd:"viewsource",icon:a.viewSource,tip:n.viewSource},quote:{cmd:"formatBlock",param:"BLOCKQUOTE",icon:a.quote,tip:n.quote,key:81},left:{cmd:"justifyLeft",icon:a.left,tip:n.left},center:{cmd:"justifyCenter",icon:a.center,tip:n.center},right:{cmd:"justifyRight",icon:a.right,tip:n.right},justify:{cmd:"justifyFull",icon:a.justify,tip:n.justify},print:{type:"no-state",cmd:"print",icon:a.print,tip:n.print,key:80},outdent:{type:"no-state",disable:C=>C.caret&&!C.caret.can("outdent"),cmd:"outdent",icon:a.outdent,tip:n.outdent},indent:{type:"no-state",disable:C=>C.caret&&!C.caret.can("indent"),cmd:"indent",icon:a.indent,tip:n.indent},removeFormat:{type:"no-state",cmd:"removeFormat",icon:a.removeFormat,tip:n.removeFormat},hr:{type:"no-state",cmd:"insertHorizontalRule",icon:a.hr,tip:n.hr},undo:{type:"no-state",cmd:"undo",icon:a.undo,tip:n.undo,key:90},redo:{type:"no-state",cmd:"redo",icon:a.redo,tip:n.redo,key:89},h1:{cmd:"formatBlock",param:"H1",icon:a.heading1||a.heading,tip:n.heading1,htmlTip:`<h1 class="q-ma-none">${n.heading1}</h1>`},h2:{cmd:"formatBlock",param:"H2",icon:a.heading2||a.heading,tip:n.heading2,htmlTip:`<h2 class="q-ma-none">${n.heading2}</h2>`},h3:{cmd:"formatBlock",param:"H3",icon:a.heading3||a.heading,tip:n.heading3,htmlTip:`<h3 class="q-ma-none">${n.heading3}</h3>`},h4:{cmd:"formatBlock",param:"H4",icon:a.heading4||a.heading,tip:n.heading4,htmlTip:`<h4 class="q-ma-none">${n.heading4}</h4>`},h5:{cmd:"formatBlock",param:"H5",icon:a.heading5||a.heading,tip:n.heading5,htmlTip:`<h5 class="q-ma-none">${n.heading5}</h5>`},h6:{cmd:"formatBlock",param:"H6",icon:a.heading6||a.heading,tip:n.heading6,htmlTip:`<h6 class="q-ma-none">${n.heading6}</h6>`},p:{cmd:"formatBlock",param:e.paragraphTag,icon:a.heading,tip:n.paragraph},code:{cmd:"formatBlock",param:"PRE",icon:a.code,htmlTip:`<code>${n.code}</code>`},"size-1":{cmd:"fontSize",param:"1",icon:a.size1||a.size,tip:n.size1,htmlTip:`<font size="1">${n.size1}</font>`},"size-2":{cmd:"fontSize",param:"2",icon:a.size2||a.size,tip:n.size2,htmlTip:`<font size="2">${n.size2}</font>`},"size-3":{cmd:"fontSize",param:"3",icon:a.size3||a.size,tip:n.size3,htmlTip:`<font size="3">${n.size3}</font>`},"size-4":{cmd:"fontSize",param:"4",icon:a.size4||a.size,tip:n.size4,htmlTip:`<font size="4">${n.size4}</font>`},"size-5":{cmd:"fontSize",param:"5",icon:a.size5||a.size,tip:n.size5,htmlTip:`<font size="5">${n.size5}</font>`},"size-6":{cmd:"fontSize",param:"6",icon:a.size6||a.size,tip:n.size6,htmlTip:`<font size="6">${n.size6}</font>`},"size-7":{cmd:"fontSize",param:"7",icon:a.size7||a.size,tip:n.size7,htmlTip:`<font size="7">${n.size7}</font>`}}}),ie=O(()=>{const n=e.definitions||{},a=e.definitions||e.fonts?He(!0,{},N.value,n,_t(S,i.lang.editor.defaultFont,i.iconSet.editor.font,e.fonts)):N.value;return e.toolbar.map(C=>C.map(R=>{if(R.options)return{type:"dropdown",icon:R.icon,label:R.label,size:"sm",dense:!0,fixedLabel:R.fixedLabel,fixedIcon:R.fixedIcon,highlight:R.highlight,list:R.list,options:R.options.map(We=>a[We])};const $=a[R];return $?$.type==="no-state"||n[R]&&($.cmd===void 0||N.value[$.cmd]&&N.value[$.cmd].type==="no-state")?$:Object.assign({type:"toggle"},$):{type:"slot",slot:R}}))}),H={$q:i,props:e,slots:t,emit:o,inFullscreen:f,toggleFullscreen:m,runCmd:Z,isViewingSource:x,editLinkUrl:b,toolbarBackgroundClass:k,buttonProps:d,contentRef:w,buttons:ie,setContent:J};G(()=>e.modelValue,n=>{_!==n&&(_=n,J(n,!0))}),G(b,n=>{o(`link${n?"Show":"Hide"}`)});const Le=O(()=>e.toolbar&&e.toolbar.length!==0),Ae=O(()=>{const n={},a=C=>{C.key&&(n[C.key]={cmd:C.cmd,param:C.param})};return ie.value.forEach(C=>{C.forEach(R=>{R.options?R.options.forEach(a):a(R)})}),n}),$e=O(()=>f.value?e.contentStyle:[{minHeight:e.minHeight,height:e.height,maxHeight:e.maxHeight},e.contentStyle]),Ie=O(()=>`q-editor q-editor--${x.value===!0?"source":"default"}`+(e.disable===!0?" disabled":"")+(f.value===!0?" fullscreen column":"")+(e.square===!0?" q-editor--square no-border-radius":"")+(e.flat===!0?" q-editor--flat":"")+(e.dense===!0?" q-editor--dense":"")+(h.value===!0?" q-editor--dark q-dark":"")),Fe=O(()=>[e.contentClass,"q-editor__content",{col:f.value,"overflow-auto":f.value||e.maxHeight}]),Ee=O(()=>e.disable===!0?{"aria-disabled":"true"}:{});function Ne(){if(w.value!==null){const n=`inner${x.value===!0?"Text":"HTML"}`,a=w.value[n];a!==e.modelValue&&(_=a,o("update:modelValue",a))}}function Me(n){if(o("keydown",n),n.ctrlKey!==!0||ye(n)===!0){F();return}const a=n.keyCode,C=Ae.value[a];if(C!==void 0){const{cmd:R,param:$}=C;lt(n),Z(R,$,!1)}}function Ve(n){F(),o("click",n)}function Ue(n){if(w.value!==null){const{scrollTop:a,scrollHeight:C}=w.value;p=C-a}H.caret.save(),o("blur",n)}function Qe(n){be(()=>{w.value!==null&&p!==void 0&&(w.value.scrollTop=w.value.scrollHeight-p)}),o("focus",n)}function je(n){const a=T.value;if(a!==null&&a.contains(n.target)===!0&&(n.relatedTarget===null||a.contains(n.relatedTarget)!==!0)){const C=`inner${x.value===!0?"Text":"HTML"}`;H.caret.restorePosition(w.value[C].length),F()}}function Ke(n){const a=T.value;a!==null&&a.contains(n.target)===!0&&(n.relatedTarget===null||a.contains(n.relatedTarget)!==!0)&&(H.caret.savePosition(),F())}function re(){p=void 0}function se(n){H.caret.save()}function J(n,a){if(w.value!==null){a===!0&&H.caret.savePosition();const C=`inner${x.value===!0?"Text":"HTML"}`;w.value[C]=n,a===!0&&(H.caret.restorePosition(w.value[C].length),F())}}function Z(n,a,C=!0){ee(),H.caret.restore(),H.caret.apply(n,a,()=>{ee(),H.caret.save(),C&&F()})}function F(){setTimeout(()=>{b.value=null,r.$forceUpdate()},1)}function ee(){at(()=>{w.value!==null&&w.value.focus({preventScroll:!0})})}function Ge(){return w.value}return X(()=>{H.caret=r.caret=new yt(w.value,H),J(e.modelValue),F(),document.addEventListener("selectionchange",se)}),nt(()=>{document.removeEventListener("selectionchange",se)}),Object.assign(r,{runCmd:Z,refreshToolbar:F,focus:ee,getContentEl:Ge}),()=>{let n;if(Le.value){const a=[g("div",{key:"qedt_top",class:"q-editor__toolbar row no-wrap scroll-x"+k.value},St(H))];b.value!==null&&a.push(g("div",{key:"qedt_btm",class:"q-editor__toolbar row no-wrap items-center scroll-x"+k.value},Tt(H))),n=g("div",{key:"toolbar_ctainer",class:"q-editor__toolbars-container"},a)}return g("div",{ref:T,class:Ie.value,style:{height:f.value===!0?"100%":null},...Ee.value,onFocusin:je,onFocusout:Ke},[n,g("div",{ref:w,style:$e.value,class:Fe.value,contenteditable:y.value,placeholder:e.placeholder,...v.listeners.value,onInput:Ne,onKeydown:Me,onClick:Ve,onBlur:Ue,onFocus:Qe,onMousedown:re,onTouchstartPassive:re})])}}});function K(e,t=new WeakMap){if(Object(e)!==e)return e;if(t.has(e))return t.get(e);const o=e instanceof Date?new Date(e):e instanceof RegExp?new RegExp(e.source,e.flags):e instanceof Set?new Set:e instanceof Map?new Map:typeof e.constructor!="function"?Object.create(null):e.prototype!==void 0&&typeof e.prototype.constructor=="function"?e:new e.constructor;if(typeof e.constructor=="function"&&typeof e.valueOf=="function"){const l=e.valueOf();if(Object(l)!==l){const r=new e.constructor(l);return t.set(e,r),r}}return t.set(e,o),e instanceof Set?e.forEach(l=>{o.add(K(l,t))}):e instanceof Map&&e.forEach((l,r)=>{o.set(r,K(l,t))}),Object.assign(o,...Object.keys(e).map(l=>({[l]:K(e[l],t)})))}var Bt=ne({name:"QPopupEdit",props:{modelValue:{required:!0},title:String,buttons:Boolean,labelSet:String,labelCancel:String,color:{type:String,default:"primary"},validate:{type:Function,default:()=>!0},autoSave:Boolean,cover:{type:Boolean,default:!0},disable:Boolean},emits:["update:modelValue","save","cancel","beforeShow","show","beforeHide","hide"],setup(e,{slots:t,emit:o}){const{proxy:l}=le(),{$q:r}=l,s=z(null),i=z(""),h=z("");let f=!1;const m=O(()=>it({initialValue:i.value,validate:e.validate,set:v,cancel:T,updatePosition:w},"value",()=>h.value,d=>{h.value=d}));function v(){e.validate(h.value)!==!1&&(b()===!0&&(o("save",h.value,i.value),o("update:modelValue",h.value)),x())}function T(){b()===!0&&o("cancel",h.value,i.value),x()}function w(){be(()=>{s.value.updatePosition()})}function b(){return rt(h.value,i.value)===!1}function x(){f=!0,s.value.hide()}function y(){f=!1,i.value=K(e.modelValue),h.value=K(e.modelValue),o("beforeShow")}function S(){o("show")}function p(){f===!1&&b()===!0&&(e.autoSave===!0&&e.validate(h.value)===!0?(o("save",h.value,i.value),o("update:modelValue",h.value)):o("cancel",h.value,i.value)),o("beforeHide")}function _(){o("hide")}function k(){const d=t.default!==void 0?[].concat(t.default(m.value)):[];return e.title&&d.unshift(g("div",{class:"q-dialog__title q-mt-sm q-mb-sm"},e.title)),e.buttons===!0&&d.push(g("div",{class:"q-popup-edit__buttons row justify-center no-wrap"},[g(D,{flat:!0,color:e.color,label:e.labelCancel||r.lang.label.cancel,onClick:T}),g(D,{flat:!0,color:e.color,label:e.labelSet||r.lang.label.set,onClick:v})])),d}return Object.assign(l,{set:v,cancel:T,show(d){s.value!==null&&s.value.show(d)},hide(d){s.value!==null&&s.value.hide(d)},updatePosition:w}),()=>{if(e.disable!==!0)return g(De,{ref:s,class:"q-popup-edit",cover:e.cover,onBeforeShow:y,onShow:S,onBeforeHide:p,onHide:_,onEscapeKey:T},k)}}});const xt={class:"row"},Ot=U("div",{class:"col"},[U("div",{class:"text-h6"},"Update Used Item")],-1),zt={key:0,class:"col text-right"},Pt={__name:"serviceOprItemAdd",props:{mode:String,dataItem:Array},setup(e){const{dialogRef:t,onDialogHide:o,onDialogOK:l,onDialogCancel:r}=Re(),s=qe(),i=e;X(async()=>{i.dataItem.listFixDet&&(f.value=i.dataItem.listFixDet,await w())});const h=z([]),f=z([]),m=z(!1),v=()=>{f.value.push({TSRVD_ID:i.dataItem.id,TSRVF_ITMCD:"",TSRVF_PRC:0,TSRVF_QTY:1})},T=(y,S,p,_)=>{S(async()=>{_==="item"&&await w(y)})},w=async y=>{m.value=!0,await Q.post("item/searchAPITBL",{searchValue:y}).then(S=>{m.value=!1,h.value=S.data.data}).catch(()=>{m.value=!1})},b=()=>{i.mode==="view"?l(f.value):s.dialog({title:"Confirmation",message:"Are you sure want to save this items ?",cancel:!0,persistent:!0}).onOk(async()=>{l(f.value)})},x=y=>{s.dialog({title:"Confirmation",message:`Do you want to delete this lines no ${y+1} ?`,cancel:!0,persistent:!0}).onOk(async()=>{f.value.splice(y,1)})};return(y,S)=>(q(),A(Te,{ref_key:"dialogRef",ref:t,onHide:L(o),"transition-show":"slide-up","transition-hide":"slide-down","full-width":""},{default:u(()=>[c(we,{class:"q-dialog-plugin bg-white q-pa-sm"},{default:u(()=>[c(W,null,{default:u(()=>[U("div",xt,[Ot,i.mode!=="view"?(q(),j("div",zt,[c(D,{icon:"add",outline:"",color:"blue",onClick:v})])):I("",!0)])]),_:1}),c(W,{class:"q-pa-sm",style:{"max-height":"50vh"}},{default:u(()=>[c(Be,{bordered:""},{default:u(()=>[f.value.length===0?ce((q(),A(Y,{key:0,class:"q-my-sm",clickable:""},{default:u(()=>[c(B,null,{default:u(()=>[P(" No items added ")]),_:1})]),_:1})),[[de]]):I("",!0),(q(!0),j(ke,null,Ce(f.value,(p,_)=>ce((q(),A(Y,{key:_,class:"q-my-sm",clickable:""},{default:u(()=>[c(B,{avatar:""},{default:u(()=>[c(Se,{color:"primary","text-color":"white"},{default:u(()=>[P(M(_+1),1)]),_:2},1024)]),_:2},1024),c(B,null,{default:u(()=>[c(E,null,{default:u(()=>[c(pt,{dense:"",filled:"",label:"Item Name",modelValue:p.TSRVF_ITMCD,"onUpdate:modelValue":k=>p.TSRVF_ITMCD=k,"use-input":"","input-debounce":"500",options:h.value,onFilter:S[0]||(S[0]=(k,d,N)=>T(k,d,N,"item")),behavior:"dialog","option-label":"MITM_ITMNM","option-value":"MITM_ITMCD","emit-value":"","map-options":"",loading:m.value,readonly:i.mode==="view"},null,8,["modelValue","onUpdate:modelValue","options","loading","readonly"])]),_:2},1024)]),_:2},1024),c(B,null,{default:u(()=>[c(fe,{label:"Price",modelValue:p.TSRVF_PRC,"onUpdate:modelValue":k=>p.TSRVF_PRC=k,filled:"",dense:"",readonly:i.mode==="view"},null,8,["modelValue","onUpdate:modelValue","readonly"])]),_:2},1024),c(B,null,{default:u(()=>[c(fe,{label:"Qty",modelValue:p.TSRVF_QTY,"onUpdate:modelValue":k=>p.TSRVF_QTY=k,filled:"",dense:"",readonly:i.mode==="view"},null,8,["modelValue","onUpdate:modelValue","readonly"])]),_:2},1024),e.mode!=="view"?(q(),A(B,{key:0,side:""},{default:u(()=>[c(D,{icon:"delete",flat:"",color:"red",onClick:k=>x(_)},null,8,["onClick"])]),_:2},1024)):I("",!0)]),_:2},1024)),[[de]])),128))]),_:1})]),_:1}),c(_e,{align:"right"},{default:u(()=>[c(D,{label:"OK",color:"primary",onClick:S[1]||(S[1]=p=>b()),disable:m.value,loading:m.value},null,8,["disable","loading"]),c(D,{flat:"",label:"Cancel",color:"red",onClick:L(r),loading:m.value},null,8,["onClick","loading"])]),_:1})]),_:1})]),_:1},8,["onHide"]))}},Ht={class:"text-h6"},Lt={class:"cursor-pointer"},At={key:0},$t={key:1},It=["innerHTML"],Qt={__name:"serviceOprUpdateOrder",props:{header:Array,detail:Array,mode:String},setup(e){const{dialogRef:t,onDialogHide:o,onDialogOK:l,onDialogCancel:r}=Re(),s=qe(),i=e,h=z({SRVH_DOCNO:"",SRVH_ISSDT:gt.formatDate(Date.now(),"YYYY-MM-DD"),SRVH_CUSCD:""}),f=z([]),m=z(!1);X(async()=>{i.header&&(h.value=i.header,f.value=i.detail)});const v=(y,S="add")=>{s.dialog({component:Pt,componentProps:{mode:S,dataItem:f.value[y]}}).onOk(async p=>{f.value[y].TSRVD_FLGSTS=1,f.value[y].listFixDet=p})},T=()=>{i.mode==="view"?l():s.dialog({title:"Confirmation",message:"Do you want to submit this data ?",cancel:!0,persistent:!0}).onOk(async()=>{m.value=!0,await Q.post("servicesOPR",{data:f.value}).then(y=>{m.value=!1,l()})})},w=y=>{console.log(f.value[y]),s.dialog({title:"Confirmation",message:"Do you want to approve this price ?",cancel:!0,persistent:!0}).onOk(async()=>{m.value=!0,await Q.put(`servicesAdmin/updateByDet/${btoa(f.value[y].id)}`,{TSRVD_FLGSTS:2}).then(S=>{m.value=!1,l()}).catch(S=>{m.value=!1})})},b=y=>{s.dialog({title:"Confirmation",message:"Do you want to reject this price ?",cancel:!0,persistent:!0}).onOk(async()=>{m.value=!0,await Q.put(`servicesAdmin/updateByDet/${btoa(f[y].value[y].id)}`,{TSRVD_FLGSTS:1}).then(S=>{m.value=!1,l()}).catch(S=>{m.value=!1})})},x=y=>{s.dialog({title:"Confirmation",message:"Do you want to mark this problem as done ?",cancel:!0,persistent:!0}).onOk(async()=>{m.value=!0,await Q.put(`servicesAdmin/${btoa(val.SRVH_DOCNO)}`,{TSRVD_FLGSTS:3}).then(S=>{m.value=!1}).catch(S=>{m.value=!1})})};return(y,S)=>(q(),A(Te,{ref_key:"dialogRef",ref:t,onHide:L(o),"transition-show":"slide-up","transition-hide":"slide-down","full-width":""},{default:u(()=>[c(we,{class:"q-dialog-plugin bg-white q-pa-sm"},{default:u(()=>[c(W,null,{default:u(()=>[U("div",Ht,"Update Order "+M(h.value.SRVH_DOCNO),1)]),_:1}),c(W,{class:"q-pa-sm"},{default:u(()=>[c(Be,{bordered:""},{default:u(()=>[(q(!0),j(ke,null,Ce(f.value,(p,_)=>(q(),A(Y,{key:_,class:st("q-my-sm")},{default:u(()=>[c(B,{avatar:""},{default:u(()=>[c(Se,{color:p.TSRVD_FLGSTS===0?"red":"primary","text-color":"white"},{default:u(()=>[P(M(p.TSRVD_LINE),1)]),_:2},1032,["color"])]),_:2},1024),c(B,null,{default:u(()=>[c(E,null,{default:u(()=>[P(M(p.TSRVD_ITMCD),1)]),_:2},1024),c(E,{caption:"",lines:"1"},{default:u(()=>[P("Item")]),_:1})]),_:2},1024),c(B,null,{default:u(()=>[c(E,null,{default:u(()=>[P(M(p.TSRVD_CUSTRMK),1)]),_:2},1024),c(E,{caption:"",lines:"1"},{default:u(()=>[P("Customer Remarks")]),_:1})]),_:2},1024),c(B,null,{default:u(()=>[c(E,null,{default:u(()=>[U("div",Lt,[p.TSRVD_REMARK?(q(),j("span",$t,[U("div",{innerHTML:p.TSRVD_REMARK},null,8,It)])):(q(),j("span",At," No comment yet !, Click here to add comment. ")),i.mode!=="view"?(q(),A(Bt,{key:2,modelValue:p.TSRVD_REMARK,"onUpdate:modelValue":k=>p.TSRVD_REMARK=k,"auto-save":""},{default:u(k=>[c(qt,{onKeyup:ut(k.set,["enter"]),modelValue:k.value,"onUpdate:modelValue":d=>k.value=d,dense:L(s).screen.lt.md,toolbar:[[{label:L(s).lang.editor.align,icon:L(s).iconSet.editor.align,fixedLabel:!0,options:["left","center","right","justify"]}],["bold","italic","strike","underline","subscript","superscript"],["token","hr","link","custom_btn"],["print","fullscreen"],[{label:L(s).lang.editor.formatting,icon:L(s).iconSet.editor.formatting,list:"no-icons",options:["p","h1","h2","h3","h4","h5","h6","code"]},{label:L(s).lang.editor.fontSize,icon:L(s).iconSet.editor.fontSize,fixedLabel:!0,fixedIcon:!0,list:"no-icons",options:["size-1","size-2","size-3","size-4","size-5","size-6","size-7"]},{label:L(s).lang.editor.defaultFont,icon:L(s).iconSet.editor.font,fixedIcon:!0,list:"no-icons",options:["default_font","arial","arial_black","comic_sans","courier_new","impact","lucida_grande","times_new_roman","verdana"]},"removeFormat"],["quote","unordered","ordered","outdent","indent"],["undo","redo"],["viewsource"]],fonts:{arial:"Arial",arial_black:"Arial Black",comic_sans:"Comic Sans MS",courier_new:"Courier New",impact:"Impact",lucida_grande:"Lucida Grande",times_new_roman:"Times New Roman",verdana:"Verdana"}},null,8,["onKeyup","modelValue","onUpdate:modelValue","dense","toolbar"])]),_:2},1032,["modelValue","onUpdate:modelValue"])):I("",!0)])]),_:2},1024),c(E,{caption:"",lines:"1"},{default:u(()=>[P("Operator Remarks")]),_:1})]),_:2},1024),i.mode==="edit"?(q(),A(B,{key:0,side:""},{default:u(()=>[c(D,{icon:"construction",color:"green",flat:"",onClick:k=>v(_,"add")},{default:u(()=>[c(V,null,{default:u(()=>[P("Update Fix Data")]),_:1})]),_:2},1032,["onClick"])]),_:2},1024)):I("",!0),c(B,{side:""},{default:u(()=>[c(D,{icon:"visibility",color:"cyan",flat:"",onClick:k=>v(_,"view"),disable:!p.listFixDet},{default:u(()=>[c(V,null,{default:u(()=>[P("View Added Item")]),_:1}),p.listFixDet.length>0?(q(),A(mt,{key:0,color:"red",floating:""},{default:u(()=>[P(M(p.listFixDet.length),1)]),_:2},1024)):I("",!0)]),_:2},1032,["onClick","disable"])]),_:2},1024),i.mode==="approvecust"?(q(),A(B,{key:1,side:""},{default:u(()=>[c(D,{icon:"how_to_reg",color:"green",outline:"",onClick:k=>w(_)},{default:u(()=>[c(V,null,{default:u(()=>[P("Approve this as customer")]),_:1})]),_:2},1032,["onClick"])]),_:2},1024)):I("",!0),i.mode==="approvecust"?(q(),A(B,{key:2,side:""},{default:u(()=>[c(D,{icon:"cancel",color:"red",outline:"",onClick:k=>b(_)},{default:u(()=>[c(V,null,{default:u(()=>[P("Reject this as customer")]),_:1})]),_:2},1032,["onClick"])]),_:2},1024)):I("",!0),i.mode==="approve"?(q(),A(B,{key:3,side:""},{default:u(()=>[c(D,{icon:"task",color:"indigo",flat:"",onClick:k=>x(_)},{default:u(()=>[c(V,null,{default:u(()=>[P("Mark this problem as done")]),_:1})]),_:2},1032,["onClick"])]),_:2},1024)):I("",!0)]),_:2},1024))),128))]),_:1})]),_:1}),c(_e,{align:"right"},{default:u(()=>[c(D,{label:"OK",color:"primary",onClick:S[0]||(S[0]=p=>T()),disable:m.value||f.value.filter(p=>p.listFixDet).length===0||f.value.filter(p=>p.TSRVD_REMARK).length===0,loading:m.value},null,8,["disable","loading"]),c(D,{flat:"",label:"Cancel",color:"red",onClick:L(r),loading:m.value},null,8,["onClick","loading"])]),_:1})]),_:1})]),_:1},8,["onHide"]))}};export{Qt as _};
