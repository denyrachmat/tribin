import{n as Ee,c as ee,bd as ce,a1 as Fe,s as z,be as Ne,a as B,aY as Me,w as K,o as te,h as f,am as de,d as fe,Q as q,g as oe,aO as he,aP as pe,ae as re,ah as je,aj as Ie,bf as Qe,j as Ue,ab as Ke,F as ge,aF as Ve,aW as Ge,aK as We,B as P,C as E,D as d,E as m,L as Ye,M as se,I as Y,O as j,P as X,R as Xe,S as Je,bc as Ze,U as et,H as O,bg as tt,X as L,a$ as F,W as ot,Y as nt}from"./index.16d819ca.js";import{n as me,b as H,a as ve,w as lt,x as it,y as at,u as rt,Q as st,c as N}from"./QTable.c7b912b7.js";import{Q as ut}from"./QBtnGroup.a78e9c74.js";import{Q as M}from"./QTooltip.7048c8db.js";import{Q as ct}from"./QBadge.2b99cdf5.js";import{api_web as U}from"./axios.defc1a5f.js";import{d as dt}from"./date.bab16d1f.js";import{u as ft}from"./use-dialog-plugin-component.130d37e7.js";import{_ as ht}from"./serviceOprItemAdd.4108c9eb.js";function ye(e,t){if(t&&e===t)return null;const o=e.nodeName.toLowerCase();if(["div","li","ul","ol","blockquote"].includes(o)===!0)return e;const l=window.getComputedStyle?window.getComputedStyle(e):e.currentStyle,a=l.display;return a==="block"||a==="table"?e:ye(e.parentNode)}function J(e,t,o){return!e||e===document.body?!1:o===!0&&e===t||(t===document?document.body:t).contains(e.parentNode)}function be(e,t,o){if(o||(o=document.createRange(),o.selectNode(e),o.setStart(e,0)),t.count===0)o.setEnd(e,t.count);else if(t.count>0)if(e.nodeType===Node.TEXT_NODE)e.textContent.length<t.count?t.count-=e.textContent.length:(o.setEnd(e,t.count),t.count=0);else for(let l=0;t.count!==0&&l<e.childNodes.length;l++)o=be(e.childNodes[l],t,o);return o}const pt=/^https?:\/\//;class gt{constructor(t,o){this.el=t,this.eVm=o,this._range=null}get selection(){if(this.el){const t=document.getSelection();if(J(t.anchorNode,this.el,!0)&&J(t.focusNode,this.el,!0))return t}return null}get hasSelection(){return this.selection!==null?this.selection.toString().length!==0:!1}get range(){const t=this.selection;return t!==null&&t.rangeCount?t.getRangeAt(0):this._range}get parent(){const t=this.range;if(t!==null){const o=t.startContainer;return o.nodeType===document.ELEMENT_NODE?o:o.parentNode}return null}get blockParent(){const t=this.parent;return t!==null?ye(t,this.el):null}save(t=this.range){t!==null&&(this._range=t)}restore(t=this._range){const o=document.createRange(),l=document.getSelection();t!==null?(o.setStart(t.startContainer,t.startOffset),o.setEnd(t.endContainer,t.endOffset),l.removeAllRanges(),l.addRange(o)):(l.selectAllChildren(this.el),l.collapseToEnd())}savePosition(){let t=-1,o;const l=document.getSelection(),a=this.el.parentNode;if(l.focusNode&&J(l.focusNode,a))for(o=l.focusNode,t=l.focusOffset;o&&o!==a;)o!==this.el&&o.previousSibling?(o=o.previousSibling,t+=o.textContent.length):o=o.parentNode;this.savedPos=t}restorePosition(t=0){if(this.savedPos>0&&this.savedPos<t){const o=window.getSelection(),l=be(this.el,{count:this.savedPos});l&&(l.collapse(!1),o.removeAllRanges(),o.addRange(l))}}hasParent(t,o){const l=o?this.parent:this.blockParent;return l!==null?l.nodeName.toLowerCase()===t.toLowerCase():!1}hasParents(t,o,l=this.parent){return l===null?!1:t.includes(l.nodeName.toLowerCase())===!0?!0:o===!0?this.hasParents(t,o,l.parentNode):!1}is(t,o){if(this.selection===null)return!1;switch(t){case"formatBlock":return o==="DIV"&&this.parent===this.el||this.hasParent(o,o==="PRE");case"link":return this.hasParent("A",!0);case"fontSize":return document.queryCommandValue(t)===o;case"fontName":const l=document.queryCommandValue(t);return l===`"${o}"`||l===o;case"fullscreen":return this.eVm.inFullscreen.value;case"viewsource":return this.eVm.isViewingSource.value;case void 0:return!1;default:const a=document.queryCommandState(t);return o!==void 0?a===o:a}}getParentAttribute(t){return this.parent!==null?this.parent.getAttribute(t):null}can(t){if(t==="outdent")return this.hasParents(["blockquote","li"],!0);if(t==="indent")return this.hasParents(["li"],!0);if(t==="link")return this.selection!==null||this.is("link")}apply(t,o,l=Ee){if(t==="formatBlock")["BLOCKQUOTE","H1","H2","H3","H4","H5","H6"].includes(o)&&this.is(t,o)&&(t="outdent",o=null),o==="PRE"&&this.is(t,"PRE")&&(o="P");else if(t==="print"){l();const a=window.open();a.document.write(`
        <!doctype html>
        <html>
          <head>
            <title>Print - ${document.title}</title>
          </head>
          <body>
            <div>${this.el.innerHTML}</div>
          </body>
        </html>
      `),a.print(),a.close();return}else if(t==="link"){const a=this.getParentAttribute("href");if(a===null){const s=this.selectWord(this.selection),r=s?s.toString():"";if(!r.length&&(!this.range||!this.range.cloneContents().querySelector("img")))return;this.eVm.editLinkUrl.value=pt.test(r)?r:"https://",document.execCommand("createLink",!1,this.eVm.editLinkUrl.value),this.save(s.getRangeAt(0))}else this.eVm.editLinkUrl.value=a,this.range.selectNodeContents(this.parent),this.save();return}else if(t==="fullscreen"){this.eVm.toggleFullscreen(),l();return}else if(t==="viewsource"){this.eVm.isViewingSource.value=this.eVm.isViewingSource.value===!1,this.eVm.setContent(this.eVm.props.modelValue),l();return}document.execCommand(t,!1,o),l()}selectWord(t){if(t===null||t.isCollapsed!==!0||t.modify===void 0)return t;const o=document.createRange();o.setStart(t.anchorNode,t.anchorOffset),o.setEnd(t.focusNode,t.focusOffset);const l=o.collapsed?["backward","forward"]:["forward","backward"];o.detach();const a=t.focusNode,s=t.focusOffset;return t.collapse(t.anchorNode,t.anchorOffset),t.modify("move",l[0],"character"),t.modify("move",l[1],"word"),t.extend(a,s),t.modify("extend",l[1],"character"),t.modify("extend",l[0],"word"),t}}const mt=Object.keys(ce),vt=e=>mt.reduce((t,o)=>{const l=e[o];return l!==void 0&&(t[o]=l),t},{});var yt=ee({name:"QBtnDropdown",props:{...ce,...Fe,modelValue:Boolean,split:Boolean,dropdownIcon:String,contentClass:[Array,String,Object],contentStyle:[Array,String,Object],cover:Boolean,persistent:Boolean,noRouteDismiss:Boolean,autoClose:Boolean,menuAnchor:{type:String,default:"bottom end"},menuSelf:{type:String,default:"top end"},menuOffset:Array,disableMainBtn:Boolean,disableDropdown:Boolean,noIconAnimation:Boolean,toggleAriaLabel:String},emits:["update:modelValue","click","beforeShow","show","beforeHide","hide"],setup(e,{slots:t,emit:o}){const{proxy:l}=oe(),a=z(e.modelValue),s=z(null),r=Ne(),c=B(()=>{const u={"aria-expanded":a.value===!0?"true":"false","aria-haspopup":"true","aria-controls":r.value,"aria-label":e.toggleAriaLabel||l.$q.lang.label[a.value===!0?"collapse":"expand"](e.label)};return(e.disable===!0||e.split===!1&&e.disableMainBtn===!0||e.disableDropdown===!0)&&(u["aria-disabled"]="true"),u}),h=B(()=>"q-btn-dropdown__arrow"+(a.value===!0&&e.noIconAnimation===!1?" rotate-180":"")+(e.split===!1?" q-btn-dropdown__arrow-container":"")),b=B(()=>Me(e)),g=B(()=>vt(e));K(()=>e.modelValue,u=>{s.value!==null&&s.value[u?"show":"hide"]()}),K(()=>e.split,k);function _(u){a.value=!0,o("beforeShow",u)}function w(u){o("show",u),o("update:modelValue",!0)}function y(u){a.value=!1,o("beforeHide",u)}function x(u){o("hide",u),o("update:modelValue",!1)}function S(u){o("click",u)}function C(u){he(u),k(),o("click",u)}function p(u){s.value!==null&&s.value.toggle(u)}function D(u){s.value!==null&&s.value.show(u)}function k(u){s.value!==null&&s.value.hide(u)}return Object.assign(l,{show:D,hide:k,toggle:p}),te(()=>{e.modelValue===!0&&D()}),()=>{const u=[f(de,{class:h.value,name:e.dropdownIcon||l.$q.iconSet.arrow.dropdown})];return e.disableDropdown!==!0&&u.push(f(me,{ref:s,id:r.value,class:e.contentClass,style:e.contentStyle,cover:e.cover,fit:!0,persistent:e.persistent,noRouteDismiss:e.noRouteDismiss,autoClose:e.autoClose,anchor:e.menuAnchor,self:e.menuSelf,offset:e.menuOffset,separateClosePopup:!0,transitionShow:e.transitionShow,transitionHide:e.transitionHide,transitionDuration:e.transitionDuration,onBeforeShow:_,onShow:w,onBeforeHide:y,onHide:x},t.default)),e.split===!1?f(q,{class:"q-btn-dropdown q-btn-dropdown--simple",...g.value,...c.value,disable:e.disable===!0||e.disableMainBtn===!0,noWrap:!0,round:!1,onClick:S},{default:()=>fe(t.label,[]).concat(u),loading:t.loading}):f(ut,{class:"q-btn-dropdown q-btn-dropdown--split no-wrap q-btn-item",rounded:e.rounded,square:e.square,...b.value,glossy:e.glossy,stretch:e.stretch},()=>[f(q,{class:"q-btn-dropdown--current",...g.value,disable:e.disable===!0||e.disableMainBtn===!0,noWrap:!0,round:!1,onClick:C},{default:t.label,loading:t.loading}),f(q,{class:"q-btn-dropdown__arrow-container q-anchor--skip",...c.value,...b.value,disable:e.disable===!0||e.disableDropdown===!0,rounded:e.rounded,color:e.color,textColor:e.textColor,dense:e.dense,size:e.size,padding:e.padding,ripple:e.ripple},()=>u)])}}});function we(e,t,o){t.handler?t.handler(e,o,o.caret):o.runCmd(t.cmd,t.param)}function ne(e){return f("div",{class:"q-editor__toolbar-group"},e)}function Se(e,t,o,l=!1){const a=l||(t.type==="toggle"?t.toggled?t.toggled(e):t.cmd&&e.caret.is(t.cmd,t.param):!1),s=[];if(t.tip&&e.$q.platform.is.desktop){const r=t.key?f("div",[f("small",`(CTRL + ${String.fromCharCode(t.key)})`)]):null;s.push(f(M,{delay:1e3},()=>[f("div",{innerHTML:t.tip}),r]))}return f(q,{...e.buttonProps.value,icon:t.icon!==null?t.icon:void 0,color:a?t.toggleColor||e.props.toolbarToggleColor:t.color||e.props.toolbarColor,textColor:a&&!e.props.toolbarPush?null:t.textColor||e.props.toolbarTextColor,label:t.label,disable:t.disable?typeof t.disable=="function"?t.disable(e):!0:!1,size:"sm",onClick(r){o&&o(),we(r,t,e)}},()=>s)}function bt(e,t){const o=t.list==="only-icons";let l=t.label,a=t.icon!==null?t.icon:void 0,s,r;function c(){b.component.proxy.hide()}if(o)r=t.options.map(g=>{const _=g.type===void 0?e.caret.is(g.cmd,g.param):!1;return _&&(l=g.tip,a=g.icon!==null?g.icon:void 0),Se(e,g,c,_)}),s=e.toolbarBackgroundClass.value,r=[ne(r)];else{const g=e.props.toolbarToggleColor!==void 0?`text-${e.props.toolbarToggleColor}`:null,_=e.props.toolbarTextColor!==void 0?`text-${e.props.toolbarTextColor}`:null,w=t.list==="no-icons";r=t.options.map(y=>{const x=y.disable?y.disable(e):!1,S=y.type===void 0?e.caret.is(y.cmd,y.param):!1;S&&(l=y.tip,a=y.icon!==null?y.icon:void 0);const C=y.htmlTip;return f(ve,{active:S,activeClass:g,clickable:!0,disable:x,dense:!0,onClick(p){c(),e.contentRef.value!==null&&e.contentRef.value.focus(),e.caret.restore(),we(p,y,e)}},()=>[w===!0?null:f(H,{class:S?g:_,side:!0},()=>f(de,{name:y.icon!==null?y.icon:void 0})),f(H,C?()=>f("div",{class:"text-no-wrap",innerHTML:y.htmlTip}):y.tip?()=>f("div",{class:"text-no-wrap"},y.tip):void 0)])}),s=[e.toolbarBackgroundClass.value,_]}const h=t.highlight&&l!==t.label,b=f(yt,{...e.buttonProps.value,noCaps:!0,noWrap:!0,color:h?e.props.toolbarToggleColor:e.props.toolbarColor,textColor:h&&!e.props.toolbarPush?null:e.props.toolbarTextColor,label:t.fixedLabel?t.label:l,icon:t.fixedIcon?t.icon!==null?t.icon:void 0:a,contentClass:s,onShow:g=>e.emit("dropdownShow",g),onHide:g=>e.emit("dropdownHide",g),onBeforeShow:g=>e.emit("dropdownBeforeShow",g),onBeforeHide:g=>e.emit("dropdownBeforeHide",g)},()=>r);return b}function wt(e){if(e.caret)return e.buttons.value.filter(t=>!e.isViewingSource.value||t.find(o=>o.cmd==="viewsource")).map(t=>ne(t.map(o=>e.isViewingSource.value&&o.cmd!=="viewsource"?!1:o.type==="slot"?fe(e.slots[o.slot]):o.type==="dropdown"?bt(e,o):Se(e,o))))}function St(e,t,o,l={}){const a=Object.keys(l);if(a.length===0)return{};const s={default_font:{cmd:"fontName",param:e,icon:o,tip:t}};return a.forEach(r=>{const c=l[r];s[r]={cmd:"fontName",param:c,icon:o,tip:c,htmlTip:`<font face="${c}">${c}</font>`}}),s}function kt(e){if(e.caret){const t=e.props.toolbarColor||e.props.toolbarTextColor;let o=e.editLinkUrl.value;const l=()=>{e.caret.restore(),o!==e.editLinkUrl.value&&document.execCommand("createLink",!1,o===""?" ":o),e.editLinkUrl.value=null};return[f("div",{class:`q-mx-xs text-${t}`},`${e.$q.lang.editor.url}: `),f("input",{key:"qedt_btm_input",class:"col q-editor__link-input",value:o,onInput:a=>{he(a),o=a.target.value},onKeydown:a=>{if(pe(a)!==!0)switch(a.keyCode){case 13:return re(a),l();case 27:re(a),e.caret.restore(),(!e.editLinkUrl.value||e.editLinkUrl.value==="https://")&&document.execCommand("unlink"),e.editLinkUrl.value=null;break}}}),ne([f(q,{key:"qedt_btm_rem",tabindex:-1,...e.buttonProps.value,label:e.$q.lang.label.remove,noCaps:!0,onClick:()=>{e.caret.restore(),document.execCommand("unlink"),e.editLinkUrl.value=null}}),f(q,{key:"qedt_btm_upd",...e.buttonProps.value,label:e.$q.lang.label.update,noCaps:!0,onClick:l})])]}}const Ct=Object.prototype.toString,Z=Object.prototype.hasOwnProperty,_t=new Set(["Boolean","Number","String","Function","Array","Date","RegExp"].map(e=>"[object "+e+"]"));function ue(e){if(e!==Object(e)||_t.has(Ct.call(e))===!0||e.constructor&&Z.call(e,"constructor")===!1&&Z.call(e.constructor.prototype,"isPrototypeOf")===!1)return!1;let t;for(t in e);return t===void 0||Z.call(e,t)}function ke(){let e,t,o,l,a,s,r=arguments[0]||{},c=1,h=!1;const b=arguments.length;for(typeof r=="boolean"&&(h=r,r=arguments[1]||{},c=2),Object(r)!==r&&typeof r!="function"&&(r={}),b===c&&(r=this,c--);c<b;c++)if((e=arguments[c])!==null)for(t in e)o=r[t],l=e[t],r!==l&&(h===!0&&l&&((a=Array.isArray(l))||ue(l)===!0)?(a===!0?s=Array.isArray(o)===!0?o:[]:s=ue(o)===!0?o:{},r[t]=ke(h,s,l)):l!==void 0&&(r[t]=l));return r}var Tt=ee({name:"QEditor",props:{...je,...lt,modelValue:{type:String,required:!0},readonly:Boolean,disable:Boolean,minHeight:{type:String,default:"10rem"},maxHeight:String,height:String,definitions:Object,fonts:Object,placeholder:String,toolbar:{type:Array,validator:e=>e.length===0||e.every(t=>t.length),default(){return[["left","center","right","justify"],["bold","italic","underline","strike"],["undo","redo"]]}},toolbarColor:String,toolbarBg:String,toolbarTextColor:String,toolbarToggleColor:{type:String,default:"primary"},toolbarOutline:Boolean,toolbarPush:Boolean,toolbarRounded:Boolean,paragraphTag:{type:String,validator:e=>["div","p"].includes(e),default:"div"},contentStyle:Object,contentClass:[Object,Array,String],square:Boolean,flat:Boolean,dense:Boolean},emits:[...it,"update:modelValue","keydown","click","mouseup","keyup","touchend","focus","blur","dropdownShow","dropdownHide","dropdownBeforeShow","dropdownBeforeHide","linkShow","linkHide"],setup(e,{slots:t,emit:o,attrs:l}){const{proxy:a,vnode:s}=oe(),{$q:r}=a,c=Ie(e,r),{inFullscreen:h,toggleFullscreen:b}=at(),g=Qe(l,s),_=z(null),w=z(null),y=z(null),x=z(!1),S=B(()=>!e.readonly&&!e.disable);let C,p,D=e.modelValue;document.execCommand("defaultParagraphSeparator",!1,e.paragraphTag),C=window.getComputedStyle(document.body).fontFamily;const k=B(()=>e.toolbarBg?` bg-${e.toolbarBg}`:""),u=B(()=>{const n=e.toolbarOutline!==!0&&e.toolbarPush!==!0;return{type:"a",flat:n,noWrap:!0,outline:e.toolbarOutline,push:e.toolbarPush,rounded:e.toolbarRounded,dense:!0,color:e.toolbarColor,disable:!S.value,size:"sm"}}),Q=B(()=>{const n=r.lang.editor,i=r.iconSet.editor;return{bold:{cmd:"bold",icon:i.bold,tip:n.bold,key:66},italic:{cmd:"italic",icon:i.italic,tip:n.italic,key:73},strike:{cmd:"strikeThrough",icon:i.strikethrough,tip:n.strikethrough,key:83},underline:{cmd:"underline",icon:i.underline,tip:n.underline,key:85},unordered:{cmd:"insertUnorderedList",icon:i.unorderedList,tip:n.unorderedList},ordered:{cmd:"insertOrderedList",icon:i.orderedList,tip:n.orderedList},subscript:{cmd:"subscript",icon:i.subscript,tip:n.subscript,htmlTip:"x<subscript>2</subscript>"},superscript:{cmd:"superscript",icon:i.superscript,tip:n.superscript,htmlTip:"x<superscript>2</superscript>"},link:{cmd:"link",disable:v=>v.caret&&!v.caret.can("link"),icon:i.hyperlink,tip:n.hyperlink,key:76},fullscreen:{cmd:"fullscreen",icon:i.toggleFullscreen,tip:n.toggleFullscreen,key:70},viewsource:{cmd:"viewsource",icon:i.viewSource,tip:n.viewSource},quote:{cmd:"formatBlock",param:"BLOCKQUOTE",icon:i.quote,tip:n.quote,key:81},left:{cmd:"justifyLeft",icon:i.left,tip:n.left},center:{cmd:"justifyCenter",icon:i.center,tip:n.center},right:{cmd:"justifyRight",icon:i.right,tip:n.right},justify:{cmd:"justifyFull",icon:i.justify,tip:n.justify},print:{type:"no-state",cmd:"print",icon:i.print,tip:n.print,key:80},outdent:{type:"no-state",disable:v=>v.caret&&!v.caret.can("outdent"),cmd:"outdent",icon:i.outdent,tip:n.outdent},indent:{type:"no-state",disable:v=>v.caret&&!v.caret.can("indent"),cmd:"indent",icon:i.indent,tip:n.indent},removeFormat:{type:"no-state",cmd:"removeFormat",icon:i.removeFormat,tip:n.removeFormat},hr:{type:"no-state",cmd:"insertHorizontalRule",icon:i.hr,tip:n.hr},undo:{type:"no-state",cmd:"undo",icon:i.undo,tip:n.undo,key:90},redo:{type:"no-state",cmd:"redo",icon:i.redo,tip:n.redo,key:89},h1:{cmd:"formatBlock",param:"H1",icon:i.heading1||i.heading,tip:n.heading1,htmlTip:`<h1 class="q-ma-none">${n.heading1}</h1>`},h2:{cmd:"formatBlock",param:"H2",icon:i.heading2||i.heading,tip:n.heading2,htmlTip:`<h2 class="q-ma-none">${n.heading2}</h2>`},h3:{cmd:"formatBlock",param:"H3",icon:i.heading3||i.heading,tip:n.heading3,htmlTip:`<h3 class="q-ma-none">${n.heading3}</h3>`},h4:{cmd:"formatBlock",param:"H4",icon:i.heading4||i.heading,tip:n.heading4,htmlTip:`<h4 class="q-ma-none">${n.heading4}</h4>`},h5:{cmd:"formatBlock",param:"H5",icon:i.heading5||i.heading,tip:n.heading5,htmlTip:`<h5 class="q-ma-none">${n.heading5}</h5>`},h6:{cmd:"formatBlock",param:"H6",icon:i.heading6||i.heading,tip:n.heading6,htmlTip:`<h6 class="q-ma-none">${n.heading6}</h6>`},p:{cmd:"formatBlock",param:e.paragraphTag,icon:i.heading,tip:n.paragraph},code:{cmd:"formatBlock",param:"PRE",icon:i.code,htmlTip:`<code>${n.code}</code>`},"size-1":{cmd:"fontSize",param:"1",icon:i.size1||i.size,tip:n.size1,htmlTip:`<font size="1">${n.size1}</font>`},"size-2":{cmd:"fontSize",param:"2",icon:i.size2||i.size,tip:n.size2,htmlTip:`<font size="2">${n.size2}</font>`},"size-3":{cmd:"fontSize",param:"3",icon:i.size3||i.size,tip:n.size3,htmlTip:`<font size="3">${n.size3}</font>`},"size-4":{cmd:"fontSize",param:"4",icon:i.size4||i.size,tip:n.size4,htmlTip:`<font size="4">${n.size4}</font>`},"size-5":{cmd:"fontSize",param:"5",icon:i.size5||i.size,tip:n.size5,htmlTip:`<font size="5">${n.size5}</font>`},"size-6":{cmd:"fontSize",param:"6",icon:i.size6||i.size,tip:n.size6,htmlTip:`<font size="6">${n.size6}</font>`},"size-7":{cmd:"fontSize",param:"7",icon:i.size7||i.size,tip:n.size7,htmlTip:`<font size="7">${n.size7}</font>`}}}),le=B(()=>{const n=e.definitions||{},i=e.definitions||e.fonts?ke(!0,{},Q.value,n,St(C,r.lang.editor.defaultFont,r.iconSet.editor.font,e.fonts)):Q.value;return e.toolbar.map(v=>v.map(T=>{if(T.options)return{type:"dropdown",icon:T.icon,label:T.label,size:"sm",dense:!0,fixedLabel:T.fixedLabel,fixedIcon:T.fixedIcon,highlight:T.highlight,list:T.list,options:T.options.map($e=>i[$e])};const A=i[T];return A?A.type==="no-state"||n[T]&&(A.cmd===void 0||Q.value[A.cmd]&&Q.value[A.cmd].type==="no-state")?A:Object.assign({type:"toggle"},A):{type:"slot",slot:T}}))}),R={$q:r,props:e,slots:t,emit:o,inFullscreen:h,toggleFullscreen:b,runCmd:G,isViewingSource:x,editLinkUrl:y,toolbarBackgroundClass:k,buttonProps:u,contentRef:w,buttons:le,setContent:V};K(()=>e.modelValue,n=>{D!==n&&(D=n,V(n,!0))}),K(y,n=>{o(`link${n?"Show":"Hide"}`)});const Ce=B(()=>e.toolbar&&e.toolbar.length!==0),_e=B(()=>{const n={},i=v=>{v.key&&(n[v.key]={cmd:v.cmd,param:v.param})};return le.value.forEach(v=>{v.forEach(T=>{T.options?T.options.forEach(i):i(T)})}),n}),Te=B(()=>h.value?e.contentStyle:[{minHeight:e.minHeight,height:e.height,maxHeight:e.maxHeight},e.contentStyle]),Be=B(()=>`q-editor q-editor--${x.value===!0?"source":"default"}`+(e.disable===!0?" disabled":"")+(h.value===!0?" fullscreen column":"")+(e.square===!0?" q-editor--square no-border-radius":"")+(e.flat===!0?" q-editor--flat":"")+(e.dense===!0?" q-editor--dense":"")+(c.value===!0?" q-editor--dark q-dark":"")),De=B(()=>[e.contentClass,"q-editor__content",{col:h.value,"overflow-auto":h.value||e.maxHeight}]),qe=B(()=>e.disable===!0?{"aria-disabled":"true"}:{});function xe(){if(w.value!==null){const n=`inner${x.value===!0?"Text":"HTML"}`,i=w.value[n];i!==e.modelValue&&(D=i,o("update:modelValue",i))}}function Re(n){if(o("keydown",n),n.ctrlKey!==!0||pe(n)===!0){$();return}const i=n.keyCode,v=_e.value[i];if(v!==void 0){const{cmd:T,param:A}=v;Ke(n),G(T,A,!1)}}function Oe(n){$(),o("click",n)}function ze(n){if(w.value!==null){const{scrollTop:i,scrollHeight:v}=w.value;p=v-i}R.caret.save(),o("blur",n)}function Pe(n){ge(()=>{w.value!==null&&p!==void 0&&(w.value.scrollTop=w.value.scrollHeight-p)}),o("focus",n)}function Le(n){const i=_.value;if(i!==null&&i.contains(n.target)===!0&&(n.relatedTarget===null||i.contains(n.relatedTarget)!==!0)){const v=`inner${x.value===!0?"Text":"HTML"}`;R.caret.restorePosition(w.value[v].length),$()}}function He(n){const i=_.value;i!==null&&i.contains(n.target)===!0&&(n.relatedTarget===null||i.contains(n.relatedTarget)!==!0)&&(R.caret.savePosition(),$())}function ie(){p=void 0}function ae(n){R.caret.save()}function V(n,i){if(w.value!==null){i===!0&&R.caret.savePosition();const v=`inner${x.value===!0?"Text":"HTML"}`;w.value[v]=n,i===!0&&(R.caret.restorePosition(w.value[v].length),$())}}function G(n,i,v=!0){W(),R.caret.restore(),R.caret.apply(n,i,()=>{W(),R.caret.save(),v&&$()})}function $(){setTimeout(()=>{y.value=null,a.$forceUpdate()},1)}function W(){Ve(()=>{w.value!==null&&w.value.focus({preventScroll:!0})})}function Ae(){return w.value}return te(()=>{R.caret=a.caret=new gt(w.value,R),V(e.modelValue),$(),document.addEventListener("selectionchange",ae)}),Ue(()=>{document.removeEventListener("selectionchange",ae)}),Object.assign(a,{runCmd:G,refreshToolbar:$,focus:W,getContentEl:Ae}),()=>{let n;if(Ce.value){const i=[f("div",{key:"qedt_top",class:"q-editor__toolbar row no-wrap scroll-x"+k.value},wt(R))];y.value!==null&&i.push(f("div",{key:"qedt_btm",class:"q-editor__toolbar row no-wrap items-center scroll-x"+k.value},kt(R))),n=f("div",{key:"toolbar_ctainer",class:"q-editor__toolbars-container"},i)}return f("div",{ref:_,class:Be.value,style:{height:h.value===!0?"100%":null},...qe.value,onFocusin:Le,onFocusout:He},[n,f("div",{ref:w,style:Te.value,class:De.value,contenteditable:S.value,placeholder:e.placeholder,...g.listeners.value,onInput:xe,onKeydown:Re,onClick:Oe,onBlur:ze,onFocus:Pe,onMousedown:ie,onTouchstartPassive:ie})])}}});function I(e,t=new WeakMap){if(Object(e)!==e)return e;if(t.has(e))return t.get(e);const o=e instanceof Date?new Date(e):e instanceof RegExp?new RegExp(e.source,e.flags):e instanceof Set?new Set:e instanceof Map?new Map:typeof e.constructor!="function"?Object.create(null):e.prototype!==void 0&&typeof e.prototype.constructor=="function"?e:new e.constructor;if(typeof e.constructor=="function"&&typeof e.valueOf=="function"){const l=e.valueOf();if(Object(l)!==l){const a=new e.constructor(l);return t.set(e,a),a}}return t.set(e,o),e instanceof Set?e.forEach(l=>{o.add(I(l,t))}):e instanceof Map&&e.forEach((l,a)=>{o.set(a,I(l,t))}),Object.assign(o,...Object.keys(e).map(l=>({[l]:I(e[l],t)})))}var Bt=ee({name:"QPopupEdit",props:{modelValue:{required:!0},title:String,buttons:Boolean,labelSet:String,labelCancel:String,color:{type:String,default:"primary"},validate:{type:Function,default:()=>!0},autoSave:Boolean,cover:{type:Boolean,default:!0},disable:Boolean},emits:["update:modelValue","save","cancel","beforeShow","show","beforeHide","hide"],setup(e,{slots:t,emit:o}){const{proxy:l}=oe(),{$q:a}=l,s=z(null),r=z(""),c=z("");let h=!1;const b=B(()=>Ge({initialValue:r.value,validate:e.validate,set:g,cancel:_,updatePosition:w},"value",()=>c.value,u=>{c.value=u}));function g(){e.validate(c.value)!==!1&&(y()===!0&&(o("save",c.value,r.value),o("update:modelValue",c.value)),x())}function _(){y()===!0&&o("cancel",c.value,r.value),x()}function w(){ge(()=>{s.value.updatePosition()})}function y(){return We(c.value,r.value)===!1}function x(){h=!0,s.value.hide()}function S(){h=!1,r.value=I(e.modelValue),c.value=I(e.modelValue),o("beforeShow")}function C(){o("show")}function p(){h===!1&&y()===!0&&(e.autoSave===!0&&e.validate(c.value)===!0?(o("save",c.value,r.value),o("update:modelValue",c.value)):o("cancel",c.value,r.value)),o("beforeHide")}function D(){o("hide")}function k(){const u=t.default!==void 0?[].concat(t.default(b.value)):[];return e.title&&u.unshift(f("div",{class:"q-dialog__title q-mt-sm q-mb-sm"},e.title)),e.buttons===!0&&u.push(f("div",{class:"q-popup-edit__buttons row justify-center no-wrap"},[f(q,{flat:!0,color:e.color,label:e.labelCancel||a.lang.label.cancel,onClick:_}),f(q,{flat:!0,color:e.color,label:e.labelSet||a.lang.label.set,onClick:g})])),u}return Object.assign(l,{set:g,cancel:_,show(u){s.value!==null&&s.value.show(u)},hide(u){s.value!==null&&s.value.hide(u)},updatePosition:w}),()=>{if(e.disable!==!0)return f(me,{ref:s,class:"q-popup-edit",cover:e.cover,onBeforeShow:S,onShow:C,onBeforeHide:p,onHide:D,onEscapeKey:_},k)}}});const Dt={class:"text-h6"},qt={class:"cursor-pointer"},xt={key:0},Rt={key:1},Ot=["innerHTML"],Mt={__name:"serviceOprUpdateOrder",props:{header:Array,detail:Array,mode:String},setup(e){const{dialogRef:t,onDialogHide:o,onDialogOK:l,onDialogCancel:a}=ft(),s=rt(),r=e,c=z({SRVH_DOCNO:"",SRVH_ISSDT:dt.formatDate(Date.now(),"YYYY-MM-DD"),SRVH_CUSCD:""}),h=z([]),b=z(!1);te(async()=>{r.header&&(c.value=r.header,h.value=r.detail)});const g=(S,C="add")=>{s.dialog({component:ht,componentProps:{mode:C,dataItem:h.value[S]}}).onOk(async p=>{h.value[S].TSRVD_FLGSTS=5,h.value[S].listFixDet=p})},_=()=>{r.mode!=="edit"?l():s.dialog({title:"Confirmation",message:"Do you want to submit this data ?",cancel:!0,persistent:!0}).onOk(async()=>{b.value=!0,await U.post("servicesOPR",{data:h.value}).then(S=>{b.value=!1,l()})})},w=S=>{console.log(h.value[S]),s.dialog({title:"Confirmation",message:"Do you want to approve this price ?",cancel:!0,persistent:!0}).onOk(async()=>{b.value=!0,await U.put(`servicesAdmins/updateByDet/${btoa(h.value[S].id)}`,{TSRVD_FLGSTS:2}).then(C=>{b.value=!1,l()}).catch(C=>{b.value=!1})})},y=S=>{s.dialog({title:"Confirmation",message:"Do you want to reject this price ?",cancel:!0,persistent:!0}).onOk(async()=>{b.value=!0,await U.put(`servicesAdmins/updateByDet/${btoa(h.value[S].id)}`,{TSRVD_FLGSTS:0}).then(C=>{b.value=!1,l()}).catch(C=>{b.value=!1})})},x=S=>{s.dialog({title:"Confirmation",message:"Do you want to mark this problem as done ?",cancel:!0,persistent:!0}).onOk(async()=>{b.value=!0,await U.put(`servicesAdmins/updateByDet/${btoa(h.value[S].id)}`,{TSRVD_FLGSTS:3}).then(C=>{b.value=!1,l()}).catch(C=>{b.value=!1})})};return(S,C)=>(P(),E(nt,{ref_key:"dialogRef",ref:t,onHide:L(o),"transition-show":"slide-up","transition-hide":"slide-down","full-width":""},{default:d(()=>[m(Ye,{class:"q-dialog-plugin bg-white q-pa-sm"},{default:d(()=>[m(se,null,{default:d(()=>[Y("div",Dt,"Update Order "+j(c.value.SRVH_DOCNO),1)]),_:1}),m(se,{class:"q-pa-sm"},{default:d(()=>[m(st,{bordered:""},{default:d(()=>[(P(!0),X(Xe,null,Je(h.value,(p,D)=>(P(),E(ve,{key:D,class:Ze("q-my-sm")},{default:d(()=>[m(H,{avatar:""},{default:d(()=>[m(et,{color:p.TSRVD_FLGSTS===0?"red":"primary","text-color":"white"},{default:d(()=>[O(j(p.TSRVD_LINE),1)]),_:2},1032,["color"])]),_:2},1024),m(H,null,{default:d(()=>[m(N,null,{default:d(()=>[O(j(p.TSRVD_ITMCD),1)]),_:2},1024),m(N,{caption:"",lines:"1"},{default:d(()=>[O("Item")]),_:1})]),_:2},1024),m(H,null,{default:d(()=>[m(N,null,{default:d(()=>[O(j(p.TSRVD_CUSTRMK),1)]),_:2},1024),m(N,{caption:"",lines:"1"},{default:d(()=>[O("Customer Remarks")]),_:1})]),_:2},1024),m(H,null,{default:d(()=>[m(N,null,{default:d(()=>[Y("div",qt,[p.TSRVD_REMARK?(P(),X("span",Rt,[Y("div",{innerHTML:p.TSRVD_REMARK},null,8,Ot)])):(P(),X("span",xt," No comment yet !, Click here to add comment. ")),r.mode!=="view"?(P(),E(Bt,{key:2,modelValue:p.TSRVD_REMARK,"onUpdate:modelValue":k=>p.TSRVD_REMARK=k,"auto-save":""},{default:d(k=>[m(Tt,{onKeyup:tt(k.set,["enter"]),modelValue:k.value,"onUpdate:modelValue":u=>k.value=u,dense:L(s).screen.lt.md,toolbar:[[{label:L(s).lang.editor.align,icon:L(s).iconSet.editor.align,fixedLabel:!0,options:["left","center","right","justify"]}],["bold","italic","strike","underline","subscript","superscript"],["token","hr","link","custom_btn"],["print","fullscreen"],[{label:L(s).lang.editor.formatting,icon:L(s).iconSet.editor.formatting,list:"no-icons",options:["p","h1","h2","h3","h4","h5","h6","code"]},{label:L(s).lang.editor.fontSize,icon:L(s).iconSet.editor.fontSize,fixedLabel:!0,fixedIcon:!0,list:"no-icons",options:["size-1","size-2","size-3","size-4","size-5","size-6","size-7"]},{label:L(s).lang.editor.defaultFont,icon:L(s).iconSet.editor.font,fixedIcon:!0,list:"no-icons",options:["default_font","arial","arial_black","comic_sans","courier_new","impact","lucida_grande","times_new_roman","verdana"]},"removeFormat"],["quote","unordered","ordered","outdent","indent"],["undo","redo"],["viewsource"]],fonts:{arial:"Arial",arial_black:"Arial Black",comic_sans:"Comic Sans MS",courier_new:"Courier New",impact:"Impact",lucida_grande:"Lucida Grande",times_new_roman:"Times New Roman",verdana:"Verdana"}},null,8,["onKeyup","modelValue","onUpdate:modelValue","dense","toolbar"])]),_:2},1032,["modelValue","onUpdate:modelValue"])):F("",!0)])]),_:2},1024),m(N,{caption:"",lines:"1"},{default:d(()=>[O("Operator Remarks")]),_:1})]),_:2},1024),r.mode==="edit"&&p.TSRVD_FLGSTS<2?(P(),E(H,{key:0,side:""},{default:d(()=>[m(q,{icon:"construction",color:"green",flat:"",onClick:k=>g(D,"add")},{default:d(()=>[m(M,null,{default:d(()=>[O("Update Fix Data")]),_:1})]),_:2},1032,["onClick"])]),_:2},1024)):F("",!0),m(H,{side:""},{default:d(()=>[m(q,{icon:"visibility",color:"cyan",flat:"",onClick:k=>g(D,"view"),disable:!p.listFixDet},{default:d(()=>[m(M,null,{default:d(()=>[O("View Added Item")]),_:1}),p.listFixDet.length>0?(P(),E(ct,{key:0,color:"red",floating:""},{default:d(()=>[O(j(p.listFixDet.length),1)]),_:2},1024)):F("",!0)]),_:2},1032,["onClick","disable"])]),_:2},1024),r.mode==="approvecust"?(P(),E(H,{key:1,side:""},{default:d(()=>[m(q,{icon:"how_to_reg",color:"green",outline:"",onClick:k=>w(D)},{default:d(()=>[m(M,null,{default:d(()=>[O("Approve this as customer")]),_:1})]),_:2},1032,["onClick"])]),_:2},1024)):F("",!0),r.mode==="approvecust"?(P(),E(H,{key:2,side:""},{default:d(()=>[m(q,{icon:"cancel",color:"red",outline:"",onClick:k=>y(D)},{default:d(()=>[m(M,null,{default:d(()=>[O("Reject this as customer")]),_:1})]),_:2},1032,["onClick"])]),_:2},1024)):F("",!0),r.mode==="edit"&&p.TSRVD_FLGSTS===2?(P(),E(H,{key:3,side:""},{default:d(()=>[m(q,{icon:"task",color:"indigo",outline:"",onClick:k=>x(D)},{default:d(()=>[m(M,null,{default:d(()=>[O("Mark this problem as done")]),_:1})]),_:2},1032,["onClick"])]),_:2},1024)):F("",!0)]),_:2},1024))),128))]),_:1})]),_:1}),m(ot,{align:"right"},{default:d(()=>[m(q,{label:"OK",color:"primary",onClick:C[0]||(C[0]=p=>_()),disable:b.value||h.value.filter(p=>p.listFixDet).length===0||h.value.filter(p=>p.TSRVD_REMARK).length===0,loading:b.value},null,8,["disable","loading"]),m(q,{flat:"",label:"Cancel",color:"red",onClick:L(a),loading:b.value},null,8,["onClick","loading"])]),_:1})]),_:1})]),_:1},8,["onHide"]))}};export{Mt as _};
