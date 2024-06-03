import{n as Ae,c as Z,bi as se,a2 as $e,t as z,bj as Ee,a as T,b4 as Ne,w as U,o as ee,h,an as ue,d as ce,Q as B,g as te,aP as de,aQ as fe,af as ie,ai as Fe,ak as Me,bk as je,j as Ie,ac as Qe,G as he,aG as Ue,aX as Ke,aL as Ve,C as P,D as E,E as f,F as g,M as Ge,O as ae,J as W,P as j,R as Y,S as We,T as Ye,bd as Xe,V as Je,I as x,bl as Ze,Y as L,a_ as N,X as et,Z as tt}from"./index.c7195a9b.js";import{q as pe,c as H,b as ge,B as ot,C as nt,D as lt,u as it,a as at,Q as rt,d as F}from"./QTable.2761e46b.js";import{Q as st}from"./QBtnGroup.e9eae1b0.js";import{Q as M}from"./QTooltip.71600f53.js";import{Q as ut}from"./QBadge.72d97f0d.js";import{api_web as Q}from"./axios.7bd988a8.js";import{d as ct}from"./date.43c7ebd1.js";import{_ as dt}from"./serviceOprItemAdd.418ae7d6.js";function me(e,t){if(t&&e===t)return null;const o=e.nodeName.toLowerCase();if(["div","li","ul","ol","blockquote"].includes(o)===!0)return e;const l=window.getComputedStyle?window.getComputedStyle(e):e.currentStyle,a=l.display;return a==="block"||a==="table"?e:me(e.parentNode)}function X(e,t,o){return!e||e===document.body?!1:o===!0&&e===t||(t===document?document.body:t).contains(e.parentNode)}function ve(e,t,o){if(o||(o=document.createRange(),o.selectNode(e),o.setStart(e,0)),t.count===0)o.setEnd(e,t.count);else if(t.count>0)if(e.nodeType===Node.TEXT_NODE)e.textContent.length<t.count?t.count-=e.textContent.length:(o.setEnd(e,t.count),t.count=0);else for(let l=0;t.count!==0&&l<e.childNodes.length;l++)o=ve(e.childNodes[l],t,o);return o}const ft=/^https?:\/\//;class ht{constructor(t,o){this.el=t,this.eVm=o,this._range=null}get selection(){if(this.el){const t=document.getSelection();if(X(t.anchorNode,this.el,!0)&&X(t.focusNode,this.el,!0))return t}return null}get hasSelection(){return this.selection!==null?this.selection.toString().length!==0:!1}get range(){const t=this.selection;return t!==null&&t.rangeCount?t.getRangeAt(0):this._range}get parent(){const t=this.range;if(t!==null){const o=t.startContainer;return o.nodeType===document.ELEMENT_NODE?o:o.parentNode}return null}get blockParent(){const t=this.parent;return t!==null?me(t,this.el):null}save(t=this.range){t!==null&&(this._range=t)}restore(t=this._range){const o=document.createRange(),l=document.getSelection();t!==null?(o.setStart(t.startContainer,t.startOffset),o.setEnd(t.endContainer,t.endOffset),l.removeAllRanges(),l.addRange(o)):(l.selectAllChildren(this.el),l.collapseToEnd())}savePosition(){let t=-1,o;const l=document.getSelection(),a=this.el.parentNode;if(l.focusNode&&X(l.focusNode,a))for(o=l.focusNode,t=l.focusOffset;o&&o!==a;)o!==this.el&&o.previousSibling?(o=o.previousSibling,t+=o.textContent.length):o=o.parentNode;this.savedPos=t}restorePosition(t=0){if(this.savedPos>0&&this.savedPos<t){const o=window.getSelection(),l=ve(this.el,{count:this.savedPos});l&&(l.collapse(!1),o.removeAllRanges(),o.addRange(l))}}hasParent(t,o){const l=o?this.parent:this.blockParent;return l!==null?l.nodeName.toLowerCase()===t.toLowerCase():!1}hasParents(t,o,l=this.parent){return l===null?!1:t.includes(l.nodeName.toLowerCase())===!0?!0:o===!0?this.hasParents(t,o,l.parentNode):!1}is(t,o){if(this.selection===null)return!1;switch(t){case"formatBlock":return o==="DIV"&&this.parent===this.el||this.hasParent(o,o==="PRE");case"link":return this.hasParent("A",!0);case"fontSize":return document.queryCommandValue(t)===o;case"fontName":const l=document.queryCommandValue(t);return l===`"${o}"`||l===o;case"fullscreen":return this.eVm.inFullscreen.value;case"viewsource":return this.eVm.isViewingSource.value;case void 0:return!1;default:const a=document.queryCommandState(t);return o!==void 0?a===o:a}}getParentAttribute(t){return this.parent!==null?this.parent.getAttribute(t):null}can(t){if(t==="outdent")return this.hasParents(["blockquote","li"],!0);if(t==="indent")return this.hasParents(["li"],!0);if(t==="link")return this.selection!==null||this.is("link")}apply(t,o,l=Ae){if(t==="formatBlock")["BLOCKQUOTE","H1","H2","H3","H4","H5","H6"].includes(o)&&this.is(t,o)&&(t="outdent",o=null),o==="PRE"&&this.is(t,"PRE")&&(o="P");else if(t==="print"){l();const a=window.open();a.document.write(`
        <!doctype html>
        <html>
          <head>
            <title>Print - ${document.title}</title>
          </head>
          <body>
            <div>${this.el.innerHTML}</div>
          </body>
        </html>
      `),a.print(),a.close();return}else if(t==="link"){const a=this.getParentAttribute("href");if(a===null){const s=this.selectWord(this.selection),r=s?s.toString():"";if(!r.length&&(!this.range||!this.range.cloneContents().querySelector("img")))return;this.eVm.editLinkUrl.value=ft.test(r)?r:"https://",document.execCommand("createLink",!1,this.eVm.editLinkUrl.value),this.save(s.getRangeAt(0))}else this.eVm.editLinkUrl.value=a,this.range.selectNodeContents(this.parent),this.save();return}else if(t==="fullscreen"){this.eVm.toggleFullscreen(),l();return}else if(t==="viewsource"){this.eVm.isViewingSource.value=this.eVm.isViewingSource.value===!1,this.eVm.setContent(this.eVm.props.modelValue),l();return}document.execCommand(t,!1,o),l()}selectWord(t){if(t===null||t.isCollapsed!==!0||t.modify===void 0)return t;const o=document.createRange();o.setStart(t.anchorNode,t.anchorOffset),o.setEnd(t.focusNode,t.focusOffset);const l=o.collapsed?["backward","forward"]:["forward","backward"];o.detach();const a=t.focusNode,s=t.focusOffset;return t.collapse(t.anchorNode,t.anchorOffset),t.modify("move",l[0],"character"),t.modify("move",l[1],"word"),t.extend(a,s),t.modify("extend",l[1],"character"),t.modify("extend",l[0],"word"),t}}const pt=Object.keys(se);function gt(e){return pt.reduce((t,o)=>{const l=e[o];return l!==void 0&&(t[o]=l),t},{})}var mt=Z({name:"QBtnDropdown",props:{...se,...$e,modelValue:Boolean,split:Boolean,dropdownIcon:String,contentClass:[Array,String,Object],contentStyle:[Array,String,Object],cover:Boolean,persistent:Boolean,noRouteDismiss:Boolean,autoClose:Boolean,menuAnchor:{type:String,default:"bottom end"},menuSelf:{type:String,default:"top end"},menuOffset:Array,disableMainBtn:Boolean,disableDropdown:Boolean,noIconAnimation:Boolean,toggleAriaLabel:String},emits:["update:modelValue","click","beforeShow","show","beforeHide","hide"],setup(e,{slots:t,emit:o}){const{proxy:l}=te(),a=z(e.modelValue),s=z(null),r=Ee(),d=T(()=>{const c={"aria-expanded":a.value===!0?"true":"false","aria-haspopup":"true","aria-controls":r.value,"aria-label":e.toggleAriaLabel||l.$q.lang.label[a.value===!0?"collapse":"expand"](e.label)};return(e.disable===!0||e.split===!1&&e.disableMainBtn===!0||e.disableDropdown===!0)&&(c["aria-disabled"]="true"),c}),y=T(()=>"q-btn-dropdown__arrow"+(a.value===!0&&e.noIconAnimation===!1?" rotate-180":"")+(e.split===!1?" q-btn-dropdown__arrow-container":"")),m=T(()=>Ne(e)),u=T(()=>gt(e));U(()=>e.modelValue,c=>{s.value!==null&&s.value[c?"show":"hide"]()}),U(()=>e.split,S);function C(c){a.value=!0,o("beforeShow",c)}function D(c){o("show",c),o("update:modelValue",!0)}function b(c){a.value=!1,o("beforeHide",c)}function O(c){o("hide",c),o("update:modelValue",!1)}function w(c){o("click",c)}function k(c){de(c),S(),o("click",c)}function p(c){s.value!==null&&s.value.toggle(c)}function q(c){s.value!==null&&s.value.show(c)}function S(c){s.value!==null&&s.value.hide(c)}return Object.assign(l,{show:q,hide:S,toggle:p}),ee(()=>{e.modelValue===!0&&q()}),()=>{const c=[h(ue,{class:y.value,name:e.dropdownIcon||l.$q.iconSet.arrow.dropdown})];return e.disableDropdown!==!0&&c.push(h(pe,{ref:s,id:r.value,class:e.contentClass,style:e.contentStyle,cover:e.cover,fit:!0,persistent:e.persistent,noRouteDismiss:e.noRouteDismiss,autoClose:e.autoClose,anchor:e.menuAnchor,self:e.menuSelf,offset:e.menuOffset,separateClosePopup:!0,transitionShow:e.transitionShow,transitionHide:e.transitionHide,transitionDuration:e.transitionDuration,onBeforeShow:C,onShow:D,onBeforeHide:b,onHide:O},t.default)),e.split===!1?h(B,{class:"q-btn-dropdown q-btn-dropdown--simple",...u.value,...d.value,disable:e.disable===!0||e.disableMainBtn===!0,noWrap:!0,round:!1,onClick:w},{default:()=>ce(t.label,[]).concat(c),loading:t.loading}):h(st,{class:"q-btn-dropdown q-btn-dropdown--split no-wrap q-btn-item",rounded:e.rounded,square:e.square,...m.value,glossy:e.glossy,stretch:e.stretch},()=>[h(B,{class:"q-btn-dropdown--current",...u.value,disable:e.disable===!0||e.disableMainBtn===!0,noWrap:!0,round:!1,onClick:k},{default:t.label,loading:t.loading}),h(B,{class:"q-btn-dropdown__arrow-container q-anchor--skip",...d.value,...m.value,disable:e.disable===!0||e.disableDropdown===!0,rounded:e.rounded,color:e.color,textColor:e.textColor,dense:e.dense,size:e.size,padding:e.padding,ripple:e.ripple},()=>c)])}}});function ye(e,t,o){t.handler?t.handler(e,o,o.caret):o.runCmd(t.cmd,t.param)}function oe(e){return h("div",{class:"q-editor__toolbar-group"},e)}function be(e,t,o,l=!1){const a=l||(t.type==="toggle"?t.toggled?t.toggled(e):t.cmd&&e.caret.is(t.cmd,t.param):!1),s=[];if(t.tip&&e.$q.platform.is.desktop){const r=t.key?h("div",[h("small",`(CTRL + ${String.fromCharCode(t.key)})`)]):null;s.push(h(M,{delay:1e3},()=>[h("div",{innerHTML:t.tip}),r]))}return h(B,{...e.buttonProps.value,icon:t.icon!==null?t.icon:void 0,color:a?t.toggleColor||e.props.toolbarToggleColor:t.color||e.props.toolbarColor,textColor:a&&!e.props.toolbarPush?null:t.textColor||e.props.toolbarTextColor,label:t.label,disable:t.disable?typeof t.disable=="function"?t.disable(e):!0:!1,size:"sm",onClick(r){o&&o(),ye(r,t,e)}},()=>s)}function vt(e,t){const o=t.list==="only-icons";let l=t.label,a=t.icon!==null?t.icon:void 0,s,r;function d(){m.component.proxy.hide()}if(o)r=t.options.map(u=>{const C=u.type===void 0?e.caret.is(u.cmd,u.param):!1;return C&&(l=u.tip,a=u.icon!==null?u.icon:void 0),be(e,u,d,C)}),s=e.toolbarBackgroundClass.value,r=[oe(r)];else{const u=e.props.toolbarToggleColor!==void 0?`text-${e.props.toolbarToggleColor}`:null,C=e.props.toolbarTextColor!==void 0?`text-${e.props.toolbarTextColor}`:null,D=t.list==="no-icons";r=t.options.map(b=>{const O=b.disable?b.disable(e):!1,w=b.type===void 0?e.caret.is(b.cmd,b.param):!1;w&&(l=b.tip,a=b.icon!==null?b.icon:void 0);const k=b.htmlTip;return h(ge,{active:w,activeClass:u,clickable:!0,disable:O,dense:!0,onClick(p){d(),e.contentRef.value!==null&&e.contentRef.value.focus(),e.caret.restore(),ye(p,b,e)}},()=>[D===!0?null:h(H,{class:w?u:C,side:!0},()=>h(ue,{name:b.icon!==null?b.icon:void 0})),h(H,k?()=>h("div",{class:"text-no-wrap",innerHTML:b.htmlTip}):b.tip?()=>h("div",{class:"text-no-wrap"},b.tip):void 0)])}),s=[e.toolbarBackgroundClass.value,C]}const y=t.highlight&&l!==t.label,m=h(mt,{...e.buttonProps.value,noCaps:!0,noWrap:!0,color:y?e.props.toolbarToggleColor:e.props.toolbarColor,textColor:y&&!e.props.toolbarPush?null:e.props.toolbarTextColor,label:t.fixedLabel?t.label:l,icon:t.fixedIcon?t.icon!==null?t.icon:void 0:a,contentClass:s,onShow:u=>e.emit("dropdownShow",u),onHide:u=>e.emit("dropdownHide",u),onBeforeShow:u=>e.emit("dropdownBeforeShow",u),onBeforeHide:u=>e.emit("dropdownBeforeHide",u)},()=>r);return m}function yt(e){if(e.caret)return e.buttons.value.filter(t=>!e.isViewingSource.value||t.find(o=>o.cmd==="viewsource")).map(t=>oe(t.map(o=>e.isViewingSource.value&&o.cmd!=="viewsource"?!1:o.type==="slot"?ce(e.slots[o.slot]):o.type==="dropdown"?vt(e,o):be(e,o))))}function bt(e,t,o,l={}){const a=Object.keys(l);if(a.length===0)return{};const s={default_font:{cmd:"fontName",param:e,icon:o,tip:t}};return a.forEach(r=>{const d=l[r];s[r]={cmd:"fontName",param:d,icon:o,tip:d,htmlTip:`<font face="${d}">${d}</font>`}}),s}function wt(e){if(e.caret){const t=e.props.toolbarColor||e.props.toolbarTextColor;let o=e.editLinkUrl.value;const l=()=>{e.caret.restore(),o!==e.editLinkUrl.value&&document.execCommand("createLink",!1,o===""?" ":o),e.editLinkUrl.value=null};return[h("div",{class:`q-mx-xs text-${t}`},`${e.$q.lang.editor.url}: `),h("input",{key:"qedt_btm_input",class:"col q-editor__link-input",value:o,onInput:a=>{de(a),o=a.target.value},onKeydown:a=>{if(fe(a)!==!0)switch(a.keyCode){case 13:return ie(a),l();case 27:ie(a),e.caret.restore(),(!e.editLinkUrl.value||e.editLinkUrl.value==="https://")&&document.execCommand("unlink"),e.editLinkUrl.value=null;break}}}),oe([h(B,{key:"qedt_btm_rem",tabindex:-1,...e.buttonProps.value,label:e.$q.lang.label.remove,noCaps:!0,onClick:()=>{e.caret.restore(),document.execCommand("unlink"),e.editLinkUrl.value=null}}),h(B,{key:"qedt_btm_upd",...e.buttonProps.value,label:e.$q.lang.label.update,noCaps:!0,onClick:l})])]}}const St=Object.prototype.toString,J=Object.prototype.hasOwnProperty,kt=new Set(["Boolean","Number","String","Function","Array","Date","RegExp"].map(e=>"[object "+e+"]"));function re(e){if(e!==Object(e)||kt.has(St.call(e))===!0||e.constructor&&J.call(e,"constructor")===!1&&J.call(e.constructor.prototype,"isPrototypeOf")===!1)return!1;let t;for(t in e);return t===void 0||J.call(e,t)}function we(){let e,t,o,l,a,s,r=arguments[0]||{},d=1,y=!1;const m=arguments.length;for(typeof r=="boolean"&&(y=r,r=arguments[1]||{},d=2),Object(r)!==r&&typeof r!="function"&&(r={}),m===d&&(r=this,d--);d<m;d++)if((e=arguments[d])!==null)for(t in e)o=r[t],l=e[t],r!==l&&(y===!0&&l&&((a=Array.isArray(l))||re(l)===!0)?(a===!0?s=Array.isArray(o)===!0?o:[]:s=re(o)===!0?o:{},r[t]=we(y,s,l)):l!==void 0&&(r[t]=l));return r}var Ct=Z({name:"QEditor",props:{...Fe,...ot,modelValue:{type:String,required:!0},readonly:Boolean,disable:Boolean,minHeight:{type:String,default:"10rem"},maxHeight:String,height:String,definitions:Object,fonts:Object,placeholder:String,toolbar:{type:Array,validator:e=>e.length===0||e.every(t=>t.length),default:()=>[["left","center","right","justify"],["bold","italic","underline","strike"],["undo","redo"]]},toolbarColor:String,toolbarBg:String,toolbarTextColor:String,toolbarToggleColor:{type:String,default:"primary"},toolbarOutline:Boolean,toolbarPush:Boolean,toolbarRounded:Boolean,paragraphTag:{type:String,validator:e=>["div","p"].includes(e),default:"div"},contentStyle:Object,contentClass:[Object,Array,String],square:Boolean,flat:Boolean,dense:Boolean},emits:[...nt,"update:modelValue","keydown","click","focus","blur","dropdownShow","dropdownHide","dropdownBeforeShow","dropdownBeforeHide","linkShow","linkHide"],setup(e,{slots:t,emit:o}){const{proxy:l}=te(),{$q:a}=l,s=Me(e,a),{inFullscreen:r,toggleFullscreen:d}=lt(),y=je(),m=z(null),u=z(null),C=z(null),D=z(!1),b=T(()=>!e.readonly&&!e.disable);let O,w,k=e.modelValue;document.execCommand("defaultParagraphSeparator",!1,e.paragraphTag),O=window.getComputedStyle(document.body).fontFamily;const p=T(()=>e.toolbarBg?` bg-${e.toolbarBg}`:""),q=T(()=>{const n=e.toolbarOutline!==!0&&e.toolbarPush!==!0;return{type:"a",flat:n,noWrap:!0,outline:e.toolbarOutline,push:e.toolbarPush,rounded:e.toolbarRounded,dense:!0,color:e.toolbarColor,disable:!b.value,size:"sm"}}),S=T(()=>{const n=a.lang.editor,i=a.iconSet.editor;return{bold:{cmd:"bold",icon:i.bold,tip:n.bold,key:66},italic:{cmd:"italic",icon:i.italic,tip:n.italic,key:73},strike:{cmd:"strikeThrough",icon:i.strikethrough,tip:n.strikethrough,key:83},underline:{cmd:"underline",icon:i.underline,tip:n.underline,key:85},unordered:{cmd:"insertUnorderedList",icon:i.unorderedList,tip:n.unorderedList},ordered:{cmd:"insertOrderedList",icon:i.orderedList,tip:n.orderedList},subscript:{cmd:"subscript",icon:i.subscript,tip:n.subscript,htmlTip:"x<subscript>2</subscript>"},superscript:{cmd:"superscript",icon:i.superscript,tip:n.superscript,htmlTip:"x<superscript>2</superscript>"},link:{cmd:"link",disable:v=>v.caret&&!v.caret.can("link"),icon:i.hyperlink,tip:n.hyperlink,key:76},fullscreen:{cmd:"fullscreen",icon:i.toggleFullscreen,tip:n.toggleFullscreen,key:70},viewsource:{cmd:"viewsource",icon:i.viewSource,tip:n.viewSource},quote:{cmd:"formatBlock",param:"BLOCKQUOTE",icon:i.quote,tip:n.quote,key:81},left:{cmd:"justifyLeft",icon:i.left,tip:n.left},center:{cmd:"justifyCenter",icon:i.center,tip:n.center},right:{cmd:"justifyRight",icon:i.right,tip:n.right},justify:{cmd:"justifyFull",icon:i.justify,tip:n.justify},print:{type:"no-state",cmd:"print",icon:i.print,tip:n.print,key:80},outdent:{type:"no-state",disable:v=>v.caret&&!v.caret.can("outdent"),cmd:"outdent",icon:i.outdent,tip:n.outdent},indent:{type:"no-state",disable:v=>v.caret&&!v.caret.can("indent"),cmd:"indent",icon:i.indent,tip:n.indent},removeFormat:{type:"no-state",cmd:"removeFormat",icon:i.removeFormat,tip:n.removeFormat},hr:{type:"no-state",cmd:"insertHorizontalRule",icon:i.hr,tip:n.hr},undo:{type:"no-state",cmd:"undo",icon:i.undo,tip:n.undo,key:90},redo:{type:"no-state",cmd:"redo",icon:i.redo,tip:n.redo,key:89},h1:{cmd:"formatBlock",param:"H1",icon:i.heading1||i.heading,tip:n.heading1,htmlTip:`<h1 class="q-ma-none">${n.heading1}</h1>`},h2:{cmd:"formatBlock",param:"H2",icon:i.heading2||i.heading,tip:n.heading2,htmlTip:`<h2 class="q-ma-none">${n.heading2}</h2>`},h3:{cmd:"formatBlock",param:"H3",icon:i.heading3||i.heading,tip:n.heading3,htmlTip:`<h3 class="q-ma-none">${n.heading3}</h3>`},h4:{cmd:"formatBlock",param:"H4",icon:i.heading4||i.heading,tip:n.heading4,htmlTip:`<h4 class="q-ma-none">${n.heading4}</h4>`},h5:{cmd:"formatBlock",param:"H5",icon:i.heading5||i.heading,tip:n.heading5,htmlTip:`<h5 class="q-ma-none">${n.heading5}</h5>`},h6:{cmd:"formatBlock",param:"H6",icon:i.heading6||i.heading,tip:n.heading6,htmlTip:`<h6 class="q-ma-none">${n.heading6}</h6>`},p:{cmd:"formatBlock",param:e.paragraphTag,icon:i.heading,tip:n.paragraph},code:{cmd:"formatBlock",param:"PRE",icon:i.code,htmlTip:`<code>${n.code}</code>`},"size-1":{cmd:"fontSize",param:"1",icon:i.size1||i.size,tip:n.size1,htmlTip:`<font size="1">${n.size1}</font>`},"size-2":{cmd:"fontSize",param:"2",icon:i.size2||i.size,tip:n.size2,htmlTip:`<font size="2">${n.size2}</font>`},"size-3":{cmd:"fontSize",param:"3",icon:i.size3||i.size,tip:n.size3,htmlTip:`<font size="3">${n.size3}</font>`},"size-4":{cmd:"fontSize",param:"4",icon:i.size4||i.size,tip:n.size4,htmlTip:`<font size="4">${n.size4}</font>`},"size-5":{cmd:"fontSize",param:"5",icon:i.size5||i.size,tip:n.size5,htmlTip:`<font size="5">${n.size5}</font>`},"size-6":{cmd:"fontSize",param:"6",icon:i.size6||i.size,tip:n.size6,htmlTip:`<font size="6">${n.size6}</font>`},"size-7":{cmd:"fontSize",param:"7",icon:i.size7||i.size,tip:n.size7,htmlTip:`<font size="7">${n.size7}</font>`}}}),c=T(()=>{const n=e.definitions||{},i=e.definitions||e.fonts?we(!0,{},S.value,n,bt(O,a.lang.editor.defaultFont,a.iconSet.editor.font,e.fonts)):S.value;return e.toolbar.map(v=>v.map(_=>{if(_.options)return{type:"dropdown",icon:_.icon,label:_.label,size:"sm",dense:!0,fixedLabel:_.fixedLabel,fixedIcon:_.fixedIcon,highlight:_.highlight,list:_.list,options:_.options.map(He=>i[He])};const A=i[_];return A?A.type==="no-state"||n[_]&&(A.cmd===void 0||S.value[A.cmd]&&S.value[A.cmd].type==="no-state")?A:Object.assign({type:"toggle"},A):{type:"slot",slot:_}}))}),R={$q:a,props:e,slots:t,emit:o,inFullscreen:r,toggleFullscreen:d,runCmd:V,isViewingSource:D,editLinkUrl:C,toolbarBackgroundClass:p,buttonProps:q,contentRef:u,buttons:c,setContent:K};U(()=>e.modelValue,n=>{k!==n&&(k=n,K(n,!0))}),U(C,n=>{o(`link${n?"Show":"Hide"}`)});const Se=T(()=>e.toolbar&&e.toolbar.length!==0),ke=T(()=>{const n={},i=v=>{v.key&&(n[v.key]={cmd:v.cmd,param:v.param})};return c.value.forEach(v=>{v.forEach(_=>{_.options?_.options.forEach(i):i(_)})}),n}),Ce=T(()=>r.value?e.contentStyle:[{minHeight:e.minHeight,height:e.height,maxHeight:e.maxHeight},e.contentStyle]),_e=T(()=>`q-editor q-editor--${D.value===!0?"source":"default"}`+(e.disable===!0?" disabled":"")+(r.value===!0?" fullscreen column":"")+(e.square===!0?" q-editor--square no-border-radius":"")+(e.flat===!0?" q-editor--flat":"")+(e.dense===!0?" q-editor--dense":"")+(s.value===!0?" q-editor--dark q-dark":"")),Te=T(()=>[e.contentClass,"q-editor__content",{col:r.value,"overflow-auto":r.value||e.maxHeight}]),Be=T(()=>e.disable===!0?{"aria-disabled":"true"}:{});function De(){if(u.value!==null){const n=`inner${D.value===!0?"Text":"HTML"}`,i=u.value[n];i!==e.modelValue&&(k=i,o("update:modelValue",i))}}function qe(n){if(o("keydown",n),n.ctrlKey!==!0||fe(n)===!0){$();return}const i=n.keyCode,v=ke.value[i];if(v!==void 0){const{cmd:_,param:A}=v;Qe(n),V(_,A,!1)}}function Re(n){$(),o("click",n)}function xe(n){if(u.value!==null){const{scrollTop:i,scrollHeight:v}=u.value;w=v-i}R.caret.save(),o("blur",n)}function ze(n){he(()=>{u.value!==null&&w!==void 0&&(u.value.scrollTop=u.value.scrollHeight-w)}),o("focus",n)}function Oe(n){const i=m.value;if(i!==null&&i.contains(n.target)===!0&&(n.relatedTarget===null||i.contains(n.relatedTarget)!==!0)){const v=`inner${D.value===!0?"Text":"HTML"}`;R.caret.restorePosition(u.value[v].length),$()}}function Pe(n){const i=m.value;i!==null&&i.contains(n.target)===!0&&(n.relatedTarget===null||i.contains(n.relatedTarget)!==!0)&&(R.caret.savePosition(),$())}function ne(){w=void 0}function le(n){R.caret.save()}function K(n,i){if(u.value!==null){i===!0&&R.caret.savePosition();const v=`inner${D.value===!0?"Text":"HTML"}`;u.value[v]=n,i===!0&&(R.caret.restorePosition(u.value[v].length),$())}}function V(n,i,v=!0){G(),R.caret.restore(),R.caret.apply(n,i,()=>{G(),R.caret.save(),v&&$()})}function $(){setTimeout(()=>{C.value=null,l.$forceUpdate()},1)}function G(){Ue(()=>{u.value!==null&&u.value.focus({preventScroll:!0})})}function Le(){return u.value}return ee(()=>{R.caret=l.caret=new ht(u.value,R),K(e.modelValue),$(),document.addEventListener("selectionchange",le)}),Ie(()=>{document.removeEventListener("selectionchange",le)}),Object.assign(l,{runCmd:V,refreshToolbar:$,focus:G,getContentEl:Le}),()=>{let n;if(Se.value){const i=[h("div",{key:"qedt_top",class:"q-editor__toolbar row no-wrap scroll-x"+p.value},yt(R))];C.value!==null&&i.push(h("div",{key:"qedt_btm",class:"q-editor__toolbar row no-wrap items-center scroll-x"+p.value},wt(R))),n=h("div",{key:"toolbar_ctainer",class:"q-editor__toolbars-container"},i)}return h("div",{ref:m,class:_e.value,style:{height:r.value===!0?"100%":null},...Be.value,onFocusin:Oe,onFocusout:Pe},[n,h("div",{ref:u,style:Ce.value,class:Te.value,contenteditable:b.value,placeholder:e.placeholder,...y.listeners.value,onInput:De,onKeydown:qe,onClick:Re,onBlur:xe,onFocus:ze,onMousedown:ne,onTouchstartPassive:ne})])}}});function I(e,t=new WeakMap){if(Object(e)!==e)return e;if(t.has(e))return t.get(e);const o=e instanceof Date?new Date(e):e instanceof RegExp?new RegExp(e.source,e.flags):e instanceof Set?new Set:e instanceof Map?new Map:typeof e.constructor!="function"?Object.create(null):e.prototype!==void 0&&typeof e.prototype.constructor=="function"?e:new e.constructor;if(typeof e.constructor=="function"&&typeof e.valueOf=="function"){const l=e.valueOf();if(Object(l)!==l){const a=new e.constructor(l);return t.set(e,a),a}}return t.set(e,o),e instanceof Set?e.forEach(l=>{o.add(I(l,t))}):e instanceof Map&&e.forEach((l,a)=>{o.set(a,I(l,t))}),Object.assign(o,...Object.keys(e).map(l=>({[l]:I(e[l],t)})))}var _t=Z({name:"QPopupEdit",props:{modelValue:{required:!0},title:String,buttons:Boolean,labelSet:String,labelCancel:String,color:{type:String,default:"primary"},validate:{type:Function,default:()=>!0},autoSave:Boolean,cover:{type:Boolean,default:!0},disable:Boolean},emits:["update:modelValue","save","cancel","beforeShow","show","beforeHide","hide"],setup(e,{slots:t,emit:o}){const{proxy:l}=te(),{$q:a}=l,s=z(null),r=z(""),d=z("");let y=!1;const m=T(()=>Ke({initialValue:r.value,validate:e.validate,set:u,cancel:C,updatePosition:D},"value",()=>d.value,c=>{d.value=c}));function u(){e.validate(d.value)!==!1&&(b()===!0&&(o("save",d.value,r.value),o("update:modelValue",d.value)),O())}function C(){b()===!0&&o("cancel",d.value,r.value),O()}function D(){he(()=>{s.value.updatePosition()})}function b(){return Ve(d.value,r.value)===!1}function O(){y=!0,s.value.hide()}function w(){y=!1,r.value=I(e.modelValue),d.value=I(e.modelValue),o("beforeShow")}function k(){o("show")}function p(){y===!1&&b()===!0&&(e.autoSave===!0&&e.validate(d.value)===!0?(o("save",d.value,r.value),o("update:modelValue",d.value)):o("cancel",d.value,r.value)),o("beforeHide")}function q(){o("hide")}function S(){const c=t.default!==void 0?[].concat(t.default(m.value)):[];return e.title&&c.unshift(h("div",{class:"q-dialog__title q-mt-sm q-mb-sm"},e.title)),e.buttons===!0&&c.push(h("div",{class:"q-popup-edit__buttons row justify-center no-wrap"},[h(B,{flat:!0,color:e.color,label:e.labelCancel||a.lang.label.cancel,onClick:C}),h(B,{flat:!0,color:e.color,label:e.labelSet||a.lang.label.set,onClick:u})])),c}return Object.assign(l,{set:u,cancel:C,show(c){s.value!==null&&s.value.show(c)},hide(c){s.value!==null&&s.value.hide(c)},updatePosition:D}),()=>{if(e.disable!==!0)return h(pe,{ref:s,class:"q-popup-edit",cover:e.cover,onBeforeShow:w,onShow:k,onBeforeHide:p,onHide:q,onEscapeKey:C},S)}}});const Tt={class:"text-h6"},Bt={class:"cursor-pointer"},Dt={key:0,class:"bg-orange"},qt={key:1},Rt=["innerHTML"],Et={__name:"serviceOprUpdateOrder",props:{header:Array,detail:Array,mode:String},setup(e){const{dialogRef:t,onDialogHide:o,onDialogOK:l,onDialogCancel:a}=it(),s=at(),r=e,d=z({SRVH_DOCNO:"",SRVH_ISSDT:ct.formatDate(Date.now(),"YYYY-MM-DD"),SRVH_CUSCD:""}),y=z([]),m=z(!1);ee(async()=>{r.header&&(d.value=r.header,y.value=r.detail)});const u=(w,k="add")=>{s.dialog({component:dt,componentProps:{mode:k,dataItem:y.value[w]}}).onOk(async p=>{y.value[w].TSRVD_FLGSTS=5,y.value[w].listFixDet=p})},C=()=>{r.mode!=="edit"?l():s.dialog({title:"Confirmation",message:"Do you want to submit this data ?",cancel:!0,persistent:!0}).onOk(async()=>{m.value=!0,await Q.post("servicesOPR",{data:y.value}).then(w=>{m.value=!1,l()})})},D=w=>{console.log(y.value[w]),s.dialog({title:"Confirmation",message:"Do you want to approve this price ?",cancel:!0,persistent:!0}).onOk(async()=>{m.value=!0,await Q.put(`servicesAdmins/updateByDet/${btoa(y.value[w].id)}`,{TSRVD_FLGSTS:2}).then(k=>{m.value=!1,l()}).catch(k=>{m.value=!1})})},b=w=>{s.dialog({title:"Confirmation",message:"Do you want to reject this price ?",cancel:!0,persistent:!0}).onOk(async()=>{m.value=!0,await Q.put(`servicesAdmins/updateByDet/${btoa(y.value[w].id)}`,{TSRVD_FLGSTS:0}).then(k=>{m.value=!1,l()}).catch(k=>{m.value=!1})})},O=w=>{s.dialog({title:"Confirmation",message:"Do you want to mark this problem as done ?",cancel:!0,persistent:!0}).onOk(async()=>{m.value=!0,await Q.put(`servicesAdmins/updateByDet/${btoa(y.value[w].id)}`,{TSRVD_FLGSTS:3}).then(k=>{m.value=!1,l()}).catch(k=>{m.value=!1})})};return(w,k)=>(P(),E(tt,{ref_key:"dialogRef",ref:t,onHide:L(o),"transition-show":"slide-up","transition-hide":"slide-down","full-width":""},{default:f(()=>[g(Ge,{class:"q-dialog-plugin bg-white q-pa-sm"},{default:f(()=>[g(ae,null,{default:f(()=>[W("div",Tt,"Update Order "+j(d.value.SRVH_DOCNO),1)]),_:1}),g(ae,{class:"q-pa-sm"},{default:f(()=>[g(rt,{bordered:""},{default:f(()=>[(P(!0),Y(We,null,Ye(y.value,(p,q)=>(P(),E(ge,{key:q,class:Xe("q-my-sm")},{default:f(()=>[g(H,{avatar:""},{default:f(()=>[g(Je,{color:p.TSRVD_FLGSTS===0?"red":"primary","text-color":"white"},{default:f(()=>[x(j(p.TSRVD_LINE),1)]),_:2},1032,["color"])]),_:2},1024),g(H,null,{default:f(()=>[g(F,null,{default:f(()=>[x(j(p.TSRVD_ITMCD),1)]),_:2},1024),g(F,{caption:"",lines:"1"},{default:f(()=>[x("Item")]),_:1})]),_:2},1024),g(H,null,{default:f(()=>[g(F,null,{default:f(()=>[x(j(p.TSRVD_CUSTRMK),1)]),_:2},1024),g(F,{caption:"",lines:"1"},{default:f(()=>[x("Customer Remarks")]),_:1})]),_:2},1024),g(H,null,{default:f(()=>[g(F,null,{default:f(()=>[W("div",Bt,[p.TSRVD_REMARK?(P(),Y("span",qt,[W("div",{innerHTML:p.TSRVD_REMARK},null,8,Rt)])):(P(),Y("span",Dt," No comment yet !, Click here to add comment. ")),r.mode!=="view"?(P(),E(_t,{key:2,modelValue:p.TSRVD_REMARK,"onUpdate:modelValue":S=>p.TSRVD_REMARK=S,"auto-save":""},{default:f(S=>[g(Ct,{onKeyup:Ze(S.set,["enter"]),modelValue:S.value,"onUpdate:modelValue":c=>S.value=c,dense:L(s).screen.lt.md,toolbar:[[{label:L(s).lang.editor.align,icon:L(s).iconSet.editor.align,fixedLabel:!0,options:["left","center","right","justify"]}],["bold","italic","strike","underline","subscript","superscript"],["token","hr","link","custom_btn"],["print","fullscreen"],[{label:L(s).lang.editor.formatting,icon:L(s).iconSet.editor.formatting,list:"no-icons",options:["p","h1","h2","h3","h4","h5","h6","code"]},{label:L(s).lang.editor.fontSize,icon:L(s).iconSet.editor.fontSize,fixedLabel:!0,fixedIcon:!0,list:"no-icons",options:["size-1","size-2","size-3","size-4","size-5","size-6","size-7"]},{label:L(s).lang.editor.defaultFont,icon:L(s).iconSet.editor.font,fixedIcon:!0,list:"no-icons",options:["default_font","arial","arial_black","comic_sans","courier_new","impact","lucida_grande","times_new_roman","verdana"]},"removeFormat"],["quote","unordered","ordered","outdent","indent"],["undo","redo"],["viewsource"]],fonts:{arial:"Arial",arial_black:"Arial Black",comic_sans:"Comic Sans MS",courier_new:"Courier New",impact:"Impact",lucida_grande:"Lucida Grande",times_new_roman:"Times New Roman",verdana:"Verdana"}},null,8,["onKeyup","modelValue","onUpdate:modelValue","dense","toolbar"])]),_:2},1032,["modelValue","onUpdate:modelValue"])):N("",!0)])]),_:2},1024),g(F,{caption:"",lines:"1"},{default:f(()=>[x("Operator Remarks")]),_:1})]),_:2},1024),r.mode==="edit"&&p.TSRVD_FLGSTS<2?(P(),E(H,{key:0,side:""},{default:f(()=>[g(B,{icon:"construction",color:"green",flat:"",onClick:S=>u(q,"add")},{default:f(()=>[g(M,null,{default:f(()=>[x("Update Fix Data")]),_:1})]),_:2},1032,["onClick"])]),_:2},1024)):N("",!0),g(H,{side:""},{default:f(()=>[g(B,{icon:"visibility",color:"cyan",flat:"",onClick:S=>u(q,"view"),disable:!p.listFixDet},{default:f(()=>[g(M,null,{default:f(()=>[x("View Added Item")]),_:1}),p.listFixDet.length>0?(P(),E(ut,{key:0,color:"red",floating:""},{default:f(()=>[x(j(p.listFixDet.length),1)]),_:2},1024)):N("",!0)]),_:2},1032,["onClick","disable"])]),_:2},1024),r.mode==="approvecust"?(P(),E(H,{key:1,side:""},{default:f(()=>[g(B,{icon:"how_to_reg",color:"green",outline:"",onClick:S=>D(q)},{default:f(()=>[g(M,null,{default:f(()=>[x("Approve this as customer")]),_:1})]),_:2},1032,["onClick"])]),_:2},1024)):N("",!0),r.mode==="approvecust"?(P(),E(H,{key:2,side:""},{default:f(()=>[g(B,{icon:"cancel",color:"red",outline:"",onClick:S=>b(q)},{default:f(()=>[g(M,null,{default:f(()=>[x("Reject this as customer")]),_:1})]),_:2},1032,["onClick"])]),_:2},1024)):N("",!0),r.mode==="edit"&&p.TSRVD_FLGSTS==2?(P(),E(H,{key:3,side:""},{default:f(()=>[g(B,{icon:"task",color:"indigo",outline:"",onClick:S=>O(q)},{default:f(()=>[g(M,null,{default:f(()=>[x("Mark this problem as done")]),_:1})]),_:2},1032,["onClick"])]),_:2},1024)):N("",!0)]),_:2},1024))),128))]),_:1})]),_:1}),g(et,{align:"right"},{default:f(()=>[g(B,{label:"OK",color:"primary",onClick:k[0]||(k[0]=p=>C()),disable:m.value||y.value.filter(p=>p.listFixDet).length===0||y.value.filter(p=>p.TSRVD_REMARK).length===0,loading:m.value},null,8,["disable","loading"]),g(B,{flat:"",label:"Cancel",color:"red",onClick:L(a),loading:m.value},null,8,["onClick","loading"])]),_:1})]),_:1})]),_:1},8,["onHide"]))}};export{Et as _};
