import{n as Xe,c as oe,bb as pe,U as Je,s as T,bc as Ze,a as q,aR as et,w as K,o as j,h as b,aa as ne,d as ve,Q as x,g as le,aH as be,aI as Se,a6 as fe,ab as tt,ac as ot,bd as nt,j as lt,a3 as at,F as _e,ay as it,aQ as rt,aD as st,B as L,C as F,D as d,E as c,J as ae,K as A,I as D,R as U,aY as J,aW as he,H as I,ap as me,aU as ye,aV as we,aZ as Ce,aX as $,P as ke,L as Te,M as H,O as Re,ba as ut,be as ct,S as dt}from"./index.93ddd96d.js";import{o as De,k as z,j as Y,w as ft,x as ht,y as mt,u as xe,b as ie,Q as Oe,l as E,c as gt,a as pt}from"./use-dialog-plugin-component.d3193f33.js";import{d as qe}from"./date.b75d9522.js";import{api_web as re}from"./axios.a98c9a66.js";import{Q as vt}from"./QBtnGroup.06b09108.js";import{Q as te}from"./QTooltip.ee8f8141.js";import{Q as bt}from"./QBadge.58cf3c8a.js";function Be(e,t){if(t&&e===t)return null;const o=e.nodeName.toLowerCase();if(["div","li","ul","ol","blockquote"].includes(o)===!0)return e;const l=window.getComputedStyle?window.getComputedStyle(e):e.currentStyle,i=l.display;return i==="block"||i==="table"?e:Be(e.parentNode)}function Z(e,t,o){return!e||e===document.body?!1:o===!0&&e===t||(t===document?document.body:t).contains(e.parentNode)}function Pe(e,t,o){if(o||(o=document.createRange(),o.selectNode(e),o.setStart(e,0)),t.count===0)o.setEnd(e,t.count);else if(t.count>0)if(e.nodeType===Node.TEXT_NODE)e.textContent.length<t.count?t.count-=e.textContent.length:(o.setEnd(e,t.count),t.count=0);else for(let l=0;t.count!==0&&l<e.childNodes.length;l++)o=Pe(e.childNodes[l],t,o);return o}const St=/^https?:\/\//;class _t{constructor(t,o){this.el=t,this.eVm=o,this._range=null}get selection(){if(this.el){const t=document.getSelection();if(Z(t.anchorNode,this.el,!0)&&Z(t.focusNode,this.el,!0))return t}return null}get hasSelection(){return this.selection!==null?this.selection.toString().length!==0:!1}get range(){const t=this.selection;return t!==null&&t.rangeCount?t.getRangeAt(0):this._range}get parent(){const t=this.range;if(t!==null){const o=t.startContainer;return o.nodeType===document.ELEMENT_NODE?o:o.parentNode}return null}get blockParent(){const t=this.parent;return t!==null?Be(t,this.el):null}save(t=this.range){t!==null&&(this._range=t)}restore(t=this._range){const o=document.createRange(),l=document.getSelection();t!==null?(o.setStart(t.startContainer,t.startOffset),o.setEnd(t.endContainer,t.endOffset),l.removeAllRanges(),l.addRange(o)):(l.selectAllChildren(this.el),l.collapseToEnd())}savePosition(){let t=-1,o;const l=document.getSelection(),i=this.el.parentNode;if(l.focusNode&&Z(l.focusNode,i))for(o=l.focusNode,t=l.focusOffset;o&&o!==i;)o!==this.el&&o.previousSibling?(o=o.previousSibling,t+=o.textContent.length):o=o.parentNode;this.savedPos=t}restorePosition(t=0){if(this.savedPos>0&&this.savedPos<t){const o=window.getSelection(),l=Pe(this.el,{count:this.savedPos});l&&(l.collapse(!1),o.removeAllRanges(),o.addRange(l))}}hasParent(t,o){const l=o?this.parent:this.blockParent;return l!==null?l.nodeName.toLowerCase()===t.toLowerCase():!1}hasParents(t,o,l=this.parent){return l===null?!1:t.includes(l.nodeName.toLowerCase())===!0?!0:o===!0?this.hasParents(t,o,l.parentNode):!1}is(t,o){if(this.selection===null)return!1;switch(t){case"formatBlock":return o==="DIV"&&this.parent===this.el||this.hasParent(o,o==="PRE");case"link":return this.hasParent("A",!0);case"fontSize":return document.queryCommandValue(t)===o;case"fontName":const l=document.queryCommandValue(t);return l===`"${o}"`||l===o;case"fullscreen":return this.eVm.inFullscreen.value;case"viewsource":return this.eVm.isViewingSource.value;case void 0:return!1;default:const i=document.queryCommandState(t);return o!==void 0?i===o:i}}getParentAttribute(t){return this.parent!==null?this.parent.getAttribute(t):null}can(t){if(t==="outdent")return this.hasParents(["blockquote","li"],!0);if(t==="indent")return this.hasParents(["li"],!0);if(t==="link")return this.selection!==null||this.is("link")}apply(t,o,l=Xe){if(t==="formatBlock")["BLOCKQUOTE","H1","H2","H3","H4","H5","H6"].includes(o)&&this.is(t,o)&&(t="outdent",o=null),o==="PRE"&&this.is(t,"PRE")&&(o="P");else if(t==="print"){l();const i=window.open();i.document.write(`
        <!doctype html>
        <html>
          <head>
            <title>Print - ${document.title}</title>
          </head>
          <body>
            <div>${this.el.innerHTML}</div>
          </body>
        </html>
      `),i.print(),i.close();return}else if(t==="link"){const i=this.getParentAttribute("href");if(i===null){const s=this.selectWord(this.selection),r=s?s.toString():"";if(!r.length&&(!this.range||!this.range.cloneContents().querySelector("img")))return;this.eVm.editLinkUrl.value=St.test(r)?r:"https://",document.execCommand("createLink",!1,this.eVm.editLinkUrl.value),this.save(s.getRangeAt(0))}else this.eVm.editLinkUrl.value=i,this.range.selectNodeContents(this.parent),this.save();return}else if(t==="fullscreen"){this.eVm.toggleFullscreen(),l();return}else if(t==="viewsource"){this.eVm.isViewingSource.value=this.eVm.isViewingSource.value===!1,this.eVm.setContent(this.eVm.props.modelValue),l();return}document.execCommand(t,!1,o),l()}selectWord(t){if(t===null||t.isCollapsed!==!0||t.modify===void 0)return t;const o=document.createRange();o.setStart(t.anchorNode,t.anchorOffset),o.setEnd(t.focusNode,t.focusOffset);const l=o.collapsed?["backward","forward"]:["forward","backward"];o.detach();const i=t.focusNode,s=t.focusOffset;return t.collapse(t.anchorNode,t.anchorOffset),t.modify("move",l[0],"character"),t.modify("move",l[1],"word"),t.extend(i,s),t.modify("extend",l[1],"character"),t.modify("extend",l[0],"word"),t}}const yt=Object.keys(pe),wt=e=>yt.reduce((t,o)=>{const l=e[o];return l!==void 0&&(t[o]=l),t},{});var Ct=oe({name:"QBtnDropdown",props:{...pe,...Je,modelValue:Boolean,split:Boolean,dropdownIcon:String,contentClass:[Array,String,Object],contentStyle:[Array,String,Object],cover:Boolean,persistent:Boolean,noRouteDismiss:Boolean,autoClose:Boolean,menuAnchor:{type:String,default:"bottom end"},menuSelf:{type:String,default:"top end"},menuOffset:Array,disableMainBtn:Boolean,disableDropdown:Boolean,noIconAnimation:Boolean,toggleAriaLabel:String},emits:["update:modelValue","click","beforeShow","show","beforeHide","hide"],setup(e,{slots:t,emit:o}){const{proxy:l}=le(),i=T(e.modelValue),s=T(null),r=Ze(),u=q(()=>{const m={"aria-expanded":i.value===!0?"true":"false","aria-haspopup":"true","aria-controls":r.value,"aria-label":e.toggleAriaLabel||l.$q.lang.label[i.value===!0?"collapse":"expand"](e.label)};return(e.disable===!0||e.split===!1&&e.disableMainBtn===!0||e.disableDropdown===!0)&&(m["aria-disabled"]="true"),m}),h=q(()=>"q-btn-dropdown__arrow"+(i.value===!0&&e.noIconAnimation===!1?" rotate-180":"")+(e.split===!1?" q-btn-dropdown__arrow-container":"")),g=q(()=>et(e)),f=q(()=>wt(e));K(()=>e.modelValue,m=>{s.value!==null&&s.value[m?"show":"hide"]()}),K(()=>e.split,O);function C(m){i.value=!0,o("beforeShow",m)}function S(m){o("show",m),o("update:modelValue",!0)}function p(m){i.value=!1,o("beforeHide",m)}function v(m){o("hide",m),o("update:modelValue",!1)}function w(m){o("click",m)}function y(m){be(m),O(),o("click",m)}function k(m){s.value!==null&&s.value.toggle(m)}function B(m){s.value!==null&&s.value.show(m)}function O(m){s.value!==null&&s.value.hide(m)}return Object.assign(l,{show:B,hide:O,toggle:k}),j(()=>{e.modelValue===!0&&B()}),()=>{const m=[b(ne,{class:h.value,name:e.dropdownIcon||l.$q.iconSet.arrow.dropdown})];return e.disableDropdown!==!0&&m.push(b(De,{ref:s,id:r.value,class:e.contentClass,style:e.contentStyle,cover:e.cover,fit:!0,persistent:e.persistent,noRouteDismiss:e.noRouteDismiss,autoClose:e.autoClose,anchor:e.menuAnchor,self:e.menuSelf,offset:e.menuOffset,separateClosePopup:!0,transitionShow:e.transitionShow,transitionHide:e.transitionHide,transitionDuration:e.transitionDuration,onBeforeShow:C,onShow:S,onBeforeHide:p,onHide:v},t.default)),e.split===!1?b(x,{class:"q-btn-dropdown q-btn-dropdown--simple",...f.value,...u.value,disable:e.disable===!0||e.disableMainBtn===!0,noWrap:!0,round:!1,onClick:w},{default:()=>ve(t.label,[]).concat(m),loading:t.loading}):b(vt,{class:"q-btn-dropdown q-btn-dropdown--split no-wrap q-btn-item",rounded:e.rounded,square:e.square,...g.value,glossy:e.glossy,stretch:e.stretch},()=>[b(x,{class:"q-btn-dropdown--current",...f.value,disable:e.disable===!0||e.disableMainBtn===!0,noWrap:!0,round:!1,onClick:y},{default:t.label,loading:t.loading}),b(x,{class:"q-btn-dropdown__arrow-container q-anchor--skip",...u.value,...g.value,disable:e.disable===!0||e.disableDropdown===!0,rounded:e.rounded,color:e.color,textColor:e.textColor,dense:e.dense,size:e.size,padding:e.padding,ripple:e.ripple},()=>m)])}}});function He(e,t,o){t.handler?t.handler(e,o,o.caret):o.runCmd(t.cmd,t.param)}function se(e){return b("div",{class:"q-editor__toolbar-group"},e)}function ze(e,t,o,l=!1){const i=l||(t.type==="toggle"?t.toggled?t.toggled(e):t.cmd&&e.caret.is(t.cmd,t.param):!1),s=[];if(t.tip&&e.$q.platform.is.desktop){const r=t.key?b("div",[b("small",`(CTRL + ${String.fromCharCode(t.key)})`)]):null;s.push(b(te,{delay:1e3},()=>[b("div",{innerHTML:t.tip}),r]))}return b(x,{...e.buttonProps.value,icon:t.icon!==null?t.icon:void 0,color:i?t.toggleColor||e.props.toolbarToggleColor:t.color||e.props.toolbarColor,textColor:i&&!e.props.toolbarPush?null:t.textColor||e.props.toolbarTextColor,label:t.label,disable:t.disable?typeof t.disable=="function"?t.disable(e):!0:!1,size:"sm",onClick(r){o&&o(),He(r,t,e)}},()=>s)}function kt(e,t){const o=t.list==="only-icons";let l=t.label,i=t.icon!==null?t.icon:void 0,s,r;function u(){g.component.proxy.hide()}if(o)r=t.options.map(f=>{const C=f.type===void 0?e.caret.is(f.cmd,f.param):!1;return C&&(l=f.tip,i=f.icon!==null?f.icon:void 0),ze(e,f,u,C)}),s=e.toolbarBackgroundClass.value,r=[se(r)];else{const f=e.props.toolbarToggleColor!==void 0?`text-${e.props.toolbarToggleColor}`:null,C=e.props.toolbarTextColor!==void 0?`text-${e.props.toolbarTextColor}`:null,S=t.list==="no-icons";r=t.options.map(p=>{const v=p.disable?p.disable(e):!1,w=p.type===void 0?e.caret.is(p.cmd,p.param):!1;w&&(l=p.tip,i=p.icon!==null?p.icon:void 0);const y=p.htmlTip;return b(Y,{active:w,activeClass:f,clickable:!0,disable:v,dense:!0,onClick(k){u(),e.contentRef.value!==null&&e.contentRef.value.focus(),e.caret.restore(),He(k,p,e)}},()=>[S===!0?null:b(z,{class:w?f:C,side:!0},()=>b(ne,{name:p.icon!==null?p.icon:void 0})),b(z,y?()=>b("div",{class:"text-no-wrap",innerHTML:p.htmlTip}):p.tip?()=>b("div",{class:"text-no-wrap"},p.tip):void 0)])}),s=[e.toolbarBackgroundClass.value,C]}const h=t.highlight&&l!==t.label,g=b(Ct,{...e.buttonProps.value,noCaps:!0,noWrap:!0,color:h?e.props.toolbarToggleColor:e.props.toolbarColor,textColor:h&&!e.props.toolbarPush?null:e.props.toolbarTextColor,label:t.fixedLabel?t.label:l,icon:t.fixedIcon?t.icon!==null?t.icon:void 0:i,contentClass:s,onShow:f=>e.emit("dropdownShow",f),onHide:f=>e.emit("dropdownHide",f),onBeforeShow:f=>e.emit("dropdownBeforeShow",f),onBeforeHide:f=>e.emit("dropdownBeforeHide",f)},()=>r);return g}function Tt(e){if(e.caret)return e.buttons.value.filter(t=>!e.isViewingSource.value||t.find(o=>o.cmd==="viewsource")).map(t=>se(t.map(o=>e.isViewingSource.value&&o.cmd!=="viewsource"?!1:o.type==="slot"?ve(e.slots[o.slot]):o.type==="dropdown"?kt(e,o):ze(e,o))))}function Rt(e,t,o,l={}){const i=Object.keys(l);if(i.length===0)return{};const s={default_font:{cmd:"fontName",param:e,icon:o,tip:t}};return i.forEach(r=>{const u=l[r];s[r]={cmd:"fontName",param:u,icon:o,tip:u,htmlTip:`<font face="${u}">${u}</font>`}}),s}function Dt(e){if(e.caret){const t=e.props.toolbarColor||e.props.toolbarTextColor;let o=e.editLinkUrl.value;const l=()=>{e.caret.restore(),o!==e.editLinkUrl.value&&document.execCommand("createLink",!1,o===""?" ":o),e.editLinkUrl.value=null};return[b("div",{class:`q-mx-xs text-${t}`},`${e.$q.lang.editor.url}: `),b("input",{key:"qedt_btm_input",class:"col q-editor__link-input",value:o,onInput:i=>{be(i),o=i.target.value},onKeydown:i=>{if(Se(i)!==!0)switch(i.keyCode){case 13:return fe(i),l();case 27:fe(i),e.caret.restore(),(!e.editLinkUrl.value||e.editLinkUrl.value==="https://")&&document.execCommand("unlink"),e.editLinkUrl.value=null;break}}}),se([b(x,{key:"qedt_btm_rem",tabindex:-1,...e.buttonProps.value,label:e.$q.lang.label.remove,noCaps:!0,onClick:()=>{e.caret.restore(),document.execCommand("unlink"),e.editLinkUrl.value=null}}),b(x,{key:"qedt_btm_upd",...e.buttonProps.value,label:e.$q.lang.label.update,noCaps:!0,onClick:l})])]}}const xt=Object.prototype.toString,ee=Object.prototype.hasOwnProperty,Ot=new Set(["Boolean","Number","String","Function","Array","Date","RegExp"].map(e=>"[object "+e+"]"));function ge(e){if(e!==Object(e)||Ot.has(xt.call(e))===!0||e.constructor&&ee.call(e,"constructor")===!1&&ee.call(e.constructor.prototype,"isPrototypeOf")===!1)return!1;let t;for(t in e);return t===void 0||ee.call(e,t)}function Le(){let e,t,o,l,i,s,r=arguments[0]||{},u=1,h=!1;const g=arguments.length;for(typeof r=="boolean"&&(h=r,r=arguments[1]||{},u=2),Object(r)!==r&&typeof r!="function"&&(r={}),g===u&&(r=this,u--);u<g;u++)if((e=arguments[u])!==null)for(t in e)o=r[t],l=e[t],r!==l&&(h===!0&&l&&((i=Array.isArray(l))||ge(l)===!0)?(i===!0?s=Array.isArray(o)===!0?o:[]:s=ge(o)===!0?o:{},r[t]=Le(h,s,l)):l!==void 0&&(r[t]=l));return r}var qt=oe({name:"QEditor",props:{...tt,...ft,modelValue:{type:String,required:!0},readonly:Boolean,disable:Boolean,minHeight:{type:String,default:"10rem"},maxHeight:String,height:String,definitions:Object,fonts:Object,placeholder:String,toolbar:{type:Array,validator:e=>e.length===0||e.every(t=>t.length),default(){return[["left","center","right","justify"],["bold","italic","underline","strike"],["undo","redo"]]}},toolbarColor:String,toolbarBg:String,toolbarTextColor:String,toolbarToggleColor:{type:String,default:"primary"},toolbarOutline:Boolean,toolbarPush:Boolean,toolbarRounded:Boolean,paragraphTag:{type:String,validator:e=>["div","p"].includes(e),default:"div"},contentStyle:Object,contentClass:[Object,Array,String],square:Boolean,flat:Boolean,dense:Boolean},emits:[...ht,"update:modelValue","keydown","click","mouseup","keyup","touchend","focus","blur","dropdownShow","dropdownHide","dropdownBeforeShow","dropdownBeforeHide","linkShow","linkHide"],setup(e,{slots:t,emit:o,attrs:l}){const{proxy:i,vnode:s}=le(),{$q:r}=i,u=ot(e,r),{inFullscreen:h,toggleFullscreen:g}=mt(),f=nt(l,s),C=T(null),S=T(null),p=T(null),v=T(!1),w=q(()=>!e.readonly&&!e.disable);let y,k,B=e.modelValue;document.execCommand("defaultParagraphSeparator",!1,e.paragraphTag),y=window.getComputedStyle(document.body).fontFamily;const O=q(()=>e.toolbarBg?` bg-${e.toolbarBg}`:""),m=q(()=>{const n=e.toolbarOutline!==!0&&e.toolbarPush!==!0;return{type:"a",flat:n,noWrap:!0,outline:e.toolbarOutline,push:e.toolbarPush,rounded:e.toolbarRounded,dense:!0,color:e.toolbarColor,disable:!w.value,size:"sm"}}),M=q(()=>{const n=r.lang.editor,a=r.iconSet.editor;return{bold:{cmd:"bold",icon:a.bold,tip:n.bold,key:66},italic:{cmd:"italic",icon:a.italic,tip:n.italic,key:73},strike:{cmd:"strikeThrough",icon:a.strikethrough,tip:n.strikethrough,key:83},underline:{cmd:"underline",icon:a.underline,tip:n.underline,key:85},unordered:{cmd:"insertUnorderedList",icon:a.unorderedList,tip:n.unorderedList},ordered:{cmd:"insertOrderedList",icon:a.orderedList,tip:n.orderedList},subscript:{cmd:"subscript",icon:a.subscript,tip:n.subscript,htmlTip:"x<subscript>2</subscript>"},superscript:{cmd:"superscript",icon:a.superscript,tip:n.superscript,htmlTip:"x<superscript>2</superscript>"},link:{cmd:"link",disable:_=>_.caret&&!_.caret.can("link"),icon:a.hyperlink,tip:n.hyperlink,key:76},fullscreen:{cmd:"fullscreen",icon:a.toggleFullscreen,tip:n.toggleFullscreen,key:70},viewsource:{cmd:"viewsource",icon:a.viewSource,tip:n.viewSource},quote:{cmd:"formatBlock",param:"BLOCKQUOTE",icon:a.quote,tip:n.quote,key:81},left:{cmd:"justifyLeft",icon:a.left,tip:n.left},center:{cmd:"justifyCenter",icon:a.center,tip:n.center},right:{cmd:"justifyRight",icon:a.right,tip:n.right},justify:{cmd:"justifyFull",icon:a.justify,tip:n.justify},print:{type:"no-state",cmd:"print",icon:a.print,tip:n.print,key:80},outdent:{type:"no-state",disable:_=>_.caret&&!_.caret.can("outdent"),cmd:"outdent",icon:a.outdent,tip:n.outdent},indent:{type:"no-state",disable:_=>_.caret&&!_.caret.can("indent"),cmd:"indent",icon:a.indent,tip:n.indent},removeFormat:{type:"no-state",cmd:"removeFormat",icon:a.removeFormat,tip:n.removeFormat},hr:{type:"no-state",cmd:"insertHorizontalRule",icon:a.hr,tip:n.hr},undo:{type:"no-state",cmd:"undo",icon:a.undo,tip:n.undo,key:90},redo:{type:"no-state",cmd:"redo",icon:a.redo,tip:n.redo,key:89},h1:{cmd:"formatBlock",param:"H1",icon:a.heading1||a.heading,tip:n.heading1,htmlTip:`<h1 class="q-ma-none">${n.heading1}</h1>`},h2:{cmd:"formatBlock",param:"H2",icon:a.heading2||a.heading,tip:n.heading2,htmlTip:`<h2 class="q-ma-none">${n.heading2}</h2>`},h3:{cmd:"formatBlock",param:"H3",icon:a.heading3||a.heading,tip:n.heading3,htmlTip:`<h3 class="q-ma-none">${n.heading3}</h3>`},h4:{cmd:"formatBlock",param:"H4",icon:a.heading4||a.heading,tip:n.heading4,htmlTip:`<h4 class="q-ma-none">${n.heading4}</h4>`},h5:{cmd:"formatBlock",param:"H5",icon:a.heading5||a.heading,tip:n.heading5,htmlTip:`<h5 class="q-ma-none">${n.heading5}</h5>`},h6:{cmd:"formatBlock",param:"H6",icon:a.heading6||a.heading,tip:n.heading6,htmlTip:`<h6 class="q-ma-none">${n.heading6}</h6>`},p:{cmd:"formatBlock",param:e.paragraphTag,icon:a.heading,tip:n.paragraph},code:{cmd:"formatBlock",param:"PRE",icon:a.code,htmlTip:`<code>${n.code}</code>`},"size-1":{cmd:"fontSize",param:"1",icon:a.size1||a.size,tip:n.size1,htmlTip:`<font size="1">${n.size1}</font>`},"size-2":{cmd:"fontSize",param:"2",icon:a.size2||a.size,tip:n.size2,htmlTip:`<font size="2">${n.size2}</font>`},"size-3":{cmd:"fontSize",param:"3",icon:a.size3||a.size,tip:n.size3,htmlTip:`<font size="3">${n.size3}</font>`},"size-4":{cmd:"fontSize",param:"4",icon:a.size4||a.size,tip:n.size4,htmlTip:`<font size="4">${n.size4}</font>`},"size-5":{cmd:"fontSize",param:"5",icon:a.size5||a.size,tip:n.size5,htmlTip:`<font size="5">${n.size5}</font>`},"size-6":{cmd:"fontSize",param:"6",icon:a.size6||a.size,tip:n.size6,htmlTip:`<font size="6">${n.size6}</font>`},"size-7":{cmd:"fontSize",param:"7",icon:a.size7||a.size,tip:n.size7,htmlTip:`<font size="7">${n.size7}</font>`}}}),ue=q(()=>{const n=e.definitions||{},a=e.definitions||e.fonts?Le(!0,{},M.value,n,Rt(y,r.lang.editor.defaultFont,r.iconSet.editor.font,e.fonts)):M.value;return e.toolbar.map(_=>_.map(R=>{if(R.options)return{type:"dropdown",icon:R.icon,label:R.label,size:"sm",dense:!0,fixedLabel:R.fixedLabel,fixedIcon:R.fixedIcon,highlight:R.highlight,list:R.list,options:R.options.map(We=>a[We])};const V=a[R];return V?V.type==="no-state"||n[R]&&(V.cmd===void 0||M.value[V.cmd]&&M.value[V.cmd].type==="no-state")?V:Object.assign({type:"toggle"},V):{type:"slot",slot:R}}))}),P={$q:r,props:e,slots:t,emit:o,inFullscreen:h,toggleFullscreen:g,runCmd:W,isViewingSource:v,editLinkUrl:p,toolbarBackgroundClass:O,buttonProps:m,contentRef:S,buttons:ue,setContent:G};K(()=>e.modelValue,n=>{B!==n&&(B=n,G(n,!0))}),K(p,n=>{o(`link${n?"Show":"Hide"}`)});const Ie=q(()=>e.toolbar&&e.toolbar.length!==0),$e=q(()=>{const n={},a=_=>{_.key&&(n[_.key]={cmd:_.cmd,param:_.param})};return ue.value.forEach(_=>{_.forEach(R=>{R.options?R.options.forEach(a):a(R)})}),n}),Ve=q(()=>h.value?e.contentStyle:[{minHeight:e.minHeight,height:e.height,maxHeight:e.maxHeight},e.contentStyle]),Ne=q(()=>`q-editor q-editor--${v.value===!0?"source":"default"}`+(e.disable===!0?" disabled":"")+(h.value===!0?" fullscreen column":"")+(e.square===!0?" q-editor--square no-border-radius":"")+(e.flat===!0?" q-editor--flat":"")+(e.dense===!0?" q-editor--dense":"")+(u.value===!0?" q-editor--dark q-dark":"")),Ae=q(()=>[e.contentClass,"q-editor__content",{col:h.value,"overflow-auto":h.value||e.maxHeight}]),Ee=q(()=>e.disable===!0?{"aria-disabled":"true"}:{});function Me(){if(S.value!==null){const n=`inner${v.value===!0?"Text":"HTML"}`,a=S.value[n];a!==e.modelValue&&(B=a,o("update:modelValue",a))}}function Fe(n){if(o("keydown",n),n.ctrlKey!==!0||Se(n)===!0){N();return}const a=n.keyCode,_=$e.value[a];if(_!==void 0){const{cmd:R,param:V}=_;at(n),W(R,V,!1)}}function Ue(n){N(),o("click",n)}function Qe(n){if(S.value!==null){const{scrollTop:a,scrollHeight:_}=S.value;k=_-a}P.caret.save(),o("blur",n)}function je(n){_e(()=>{S.value!==null&&k!==void 0&&(S.value.scrollTop=S.value.scrollHeight-k)}),o("focus",n)}function Ke(n){const a=C.value;if(a!==null&&a.contains(n.target)===!0&&(n.relatedTarget===null||a.contains(n.relatedTarget)!==!0)){const _=`inner${v.value===!0?"Text":"HTML"}`;P.caret.restorePosition(S.value[_].length),N()}}function Ye(n){const a=C.value;a!==null&&a.contains(n.target)===!0&&(n.relatedTarget===null||a.contains(n.relatedTarget)!==!0)&&(P.caret.savePosition(),N())}function ce(){k=void 0}function de(n){P.caret.save()}function G(n,a){if(S.value!==null){a===!0&&P.caret.savePosition();const _=`inner${v.value===!0?"Text":"HTML"}`;S.value[_]=n,a===!0&&(P.caret.restorePosition(S.value[_].length),N())}}function W(n,a,_=!0){X(),P.caret.restore(),P.caret.apply(n,a,()=>{X(),P.caret.save(),_&&N()})}function N(){setTimeout(()=>{p.value=null,i.$forceUpdate()},1)}function X(){it(()=>{S.value!==null&&S.value.focus({preventScroll:!0})})}function Ge(){return S.value}return j(()=>{P.caret=i.caret=new _t(S.value,P),G(e.modelValue),N(),document.addEventListener("selectionchange",de)}),lt(()=>{document.removeEventListener("selectionchange",de)}),Object.assign(i,{runCmd:W,refreshToolbar:N,focus:X,getContentEl:Ge}),()=>{let n;if(Ie.value){const a=[b("div",{key:"qedt_top",class:"q-editor__toolbar row no-wrap scroll-x"+O.value},Tt(P))];p.value!==null&&a.push(b("div",{key:"qedt_btm",class:"q-editor__toolbar row no-wrap items-center scroll-x"+O.value},Dt(P))),n=b("div",{key:"toolbar_ctainer",class:"q-editor__toolbars-container"},a)}return b("div",{ref:C,class:Ne.value,style:{height:h.value===!0?"100%":null},...Ee.value,onFocusin:Ke,onFocusout:Ye},[n,b("div",{ref:S,style:Ve.value,class:Ae.value,contenteditable:w.value,placeholder:e.placeholder,...f.listeners.value,onInput:Me,onKeydown:Fe,onClick:Ue,onBlur:Qe,onFocus:je,onMousedown:ce,onTouchstartPassive:ce})])}}});function Q(e,t=new WeakMap){if(Object(e)!==e)return e;if(t.has(e))return t.get(e);const o=e instanceof Date?new Date(e):e instanceof RegExp?new RegExp(e.source,e.flags):e instanceof Set?new Set:e instanceof Map?new Map:typeof e.constructor!="function"?Object.create(null):e.prototype!==void 0&&typeof e.prototype.constructor=="function"?e:new e.constructor;if(typeof e.constructor=="function"&&typeof e.valueOf=="function"){const l=e.valueOf();if(Object(l)!==l){const i=new e.constructor(l);return t.set(e,i),i}}return t.set(e,o),e instanceof Set?e.forEach(l=>{o.add(Q(l,t))}):e instanceof Map&&e.forEach((l,i)=>{o.set(i,Q(l,t))}),Object.assign(o,...Object.keys(e).map(l=>({[l]:Q(e[l],t)})))}var Bt=oe({name:"QPopupEdit",props:{modelValue:{required:!0},title:String,buttons:Boolean,labelSet:String,labelCancel:String,color:{type:String,default:"primary"},validate:{type:Function,default:()=>!0},autoSave:Boolean,cover:{type:Boolean,default:!0},disable:Boolean},emits:["update:modelValue","save","cancel","beforeShow","show","beforeHide","hide"],setup(e,{slots:t,emit:o}){const{proxy:l}=le(),{$q:i}=l,s=T(null),r=T(""),u=T("");let h=!1;const g=q(()=>rt({initialValue:r.value,validate:e.validate,set:f,cancel:C,updatePosition:S},"value",()=>u.value,m=>{u.value=m}));function f(){e.validate(u.value)!==!1&&(p()===!0&&(o("save",u.value,r.value),o("update:modelValue",u.value)),v())}function C(){p()===!0&&o("cancel",u.value,r.value),v()}function S(){_e(()=>{s.value.updatePosition()})}function p(){return st(u.value,r.value)===!1}function v(){h=!0,s.value.hide()}function w(){h=!1,r.value=Q(e.modelValue),u.value=Q(e.modelValue),o("beforeShow")}function y(){o("show")}function k(){h===!1&&p()===!0&&(e.autoSave===!0&&e.validate(u.value)===!0?(o("save",u.value,r.value),o("update:modelValue",u.value)):o("cancel",u.value,r.value)),o("beforeHide")}function B(){o("hide")}function O(){const m=t.default!==void 0?[].concat(t.default(g.value)):[];return e.title&&m.unshift(b("div",{class:"q-dialog__title q-mt-sm q-mb-sm"},e.title)),e.buttons===!0&&m.push(b("div",{class:"q-popup-edit__buttons row justify-center no-wrap"},[b(x,{flat:!0,color:e.color,label:e.labelCancel||i.lang.label.cancel,onClick:C}),b(x,{flat:!0,color:e.color,label:e.labelSet||i.lang.label.set,onClick:f})])),m}return Object.assign(l,{set:f,cancel:C,show(m){s.value!==null&&s.value.show(m)},hide(m){s.value!==null&&s.value.hide(m)},updatePosition:S}),()=>{if(e.disable!==!0)return b(De,{ref:s,class:"q-popup-edit",cover:e.cover,onBeforeShow:w,onShow:y,onBeforeHide:k,onHide:B,onEscapeKey:C},O)}}});const Pt={class:"row"},Ht=D("div",{class:"col"},[D("div",{class:"text-h6"},"Update Used Item")],-1),zt={key:0,class:"col text-right"},Lt={__name:"serviceOprItemAdd",props:{mode:String,dataItem:Array},setup(e){const{dialogRef:t,onDialogHide:o,onDialogOK:l,onDialogCancel:i}=xe(),s=ie(),r=e;j(()=>{r.dataItem.listFixDet&&(h.value=r.dataItem.listFixDet)});const u=T([]),h=T([]),g=T(!1),f=()=>{h.value.push({TSRVD_ID:r.dataItem.id,TSRVF_ITMCD:"",TSRVF_PRC:0})},C=(w,y,k,B)=>{y(async()=>{B==="item"&&await S(w)})},S=async w=>{g.value=!0,await re.post("item/searchAPITBL",{searchValue:w}).then(y=>{g.value=!1,u.value=y.data.data}).catch(()=>{g.value=!1})},p=()=>{r.mode==="view"?l(h.value):s.dialog({title:"Confirmation",message:"Are you sure want to save this items ?",cancel:!0,persistent:!0}).onOk(async()=>{l(h.value)})},v=w=>{s.dialog({title:"Confirmation",message:`Do you want to delete this lines no ${w+1} ?`,cancel:!0,persistent:!0}).onOk(async()=>{h.value.splice(w,1)})};return(w,y)=>(L(),F(Re,{ref_key:"dialogRef",ref:t,onHide:H(o),"transition-show":"slide-up","transition-hide":"slide-down","full-width":""},{default:d(()=>[c(ae,{class:"q-dialog-plugin bg-white q-pa-sm"},{default:d(()=>[c(A,null,{default:d(()=>[D("div",Pt,[Ht,r.mode!=="view"?(L(),U("div",zt,[c(x,{icon:"add",outline:"",color:"blue",onClick:f})])):J("",!0)])]),_:1}),c(A,{class:"q-pa-sm",style:{"max-height":"50vh"}},{default:d(()=>[c(Oe,{bordered:""},{default:d(()=>[h.value.length===0?he((L(),F(Y,{key:0,class:"q-my-sm",clickable:""},{default:d(()=>[c(z,null,{default:d(()=>[I(" No items added ")]),_:1})]),_:1})),[[me]]):J("",!0),(L(!0),U(ye,null,we(h.value,(k,B)=>he((L(),F(Y,{key:B,class:"q-my-sm",clickable:""},{default:d(()=>[c(z,{avatar:""},{default:d(()=>[c(Ce,{color:"primary","text-color":"white"},{default:d(()=>[I($(B+1),1)]),_:2},1024)]),_:2},1024),c(z,null,{default:d(()=>[c(E,null,{default:d(()=>[c(gt,{dense:"",filled:"",label:"Item Name",modelValue:k.TSRVF_ITMCD,"onUpdate:modelValue":O=>k.TSRVF_ITMCD=O,"use-input":"","input-debounce":"500",options:u.value,onFilter:y[0]||(y[0]=(O,m,M)=>C(O,m,M,"item")),behavior:"dialog","option-label":"MITM_ITMNM","option-value":"MITM_ITMCD","emit-value":"","map-options":"",loading:g.value,readonly:r.mode==="view"},null,8,["modelValue","onUpdate:modelValue","options","loading","readonly"])]),_:2},1024)]),_:2},1024),c(z,null,{default:d(()=>[c(ke,{label:"Price",modelValue:k.TSRVF_PRC,"onUpdate:modelValue":O=>k.TSRVF_PRC=O,filled:"",dense:"",readonly:r.mode==="view"},null,8,["modelValue","onUpdate:modelValue","readonly"])]),_:2},1024),e.mode!=="view"?(L(),F(z,{key:0,side:""},{default:d(()=>[c(x,{icon:"delete",flat:"",color:"red",onClick:O=>v(B)},null,8,["onClick"])]),_:2},1024)):J("",!0)]),_:2},1024)),[[me]])),128))]),_:1})]),_:1}),c(Te,{align:"right"},{default:d(()=>[c(x,{label:"OK",color:"primary",onClick:y[1]||(y[1]=k=>p()),disable:g.value,loading:g.value},null,8,["disable","loading"]),c(x,{flat:"",label:"Cancel",color:"red",onClick:H(i),loading:g.value},null,8,["onClick","loading"])]),_:1})]),_:1})]),_:1},8,["onHide"]))}},It={class:"text-h6"},$t={class:"cursor-pointer"},Vt={key:0},Nt={key:1},At=["innerHTML"],Et={__name:"serviceOprUpdateOrder",props:{header:Array,detail:Array},setup(e){const{dialogRef:t,onDialogHide:o,onDialogOK:l,onDialogCancel:i}=xe(),s=ie(),r=e,u=T({SRVH_DOCNO:"",SRVH_ISSDT:qe.formatDate(Date.now(),"YYYY-MM-DD"),SRVH_CUSCD:""}),h=T([]),g=T(!1);j(async()=>{r.header&&(u.value=r.header,h.value=r.detail)});const f=(S,p="add")=>{s.dialog({component:Lt,componentProps:{mode:p,dataItem:h.value[S]}}).onOk(async v=>{h.value[S].TSRVD_FLGSTS=1,h.value[S].listFixDet=v})},C=()=>{s.dialog({title:"Confirmation",message:"Do you want to submit this data ?",cancel:!0,persistent:!0}).onOk(async()=>{g.value=!0,await re.post("servicesOPR",{data:h.value}).then(S=>{g.value=!1,l()})})};return(S,p)=>(L(),F(Re,{ref_key:"dialogRef",ref:t,onHide:H(o),"transition-show":"slide-up","transition-hide":"slide-down","full-width":""},{default:d(()=>[c(ae,{class:"q-dialog-plugin bg-white q-pa-sm"},{default:d(()=>[c(A,null,{default:d(()=>[D("div",It,"Update Order "+$(u.value.SRVH_DOCNO),1)]),_:1}),c(A,{class:"q-pa-sm"},{default:d(()=>[c(Oe,{bordered:""},{default:d(()=>[(L(!0),U(ye,null,we(h.value,(v,w)=>(L(),F(Y,{key:w,class:ut(`q-my-sm ${v.TSRVD_FLGSTS===1?"bg-orange text-white":v.TSRVD_FLGSTS===2?"bg-green text-white":""}`)},{default:d(()=>[c(z,{avatar:""},{default:d(()=>[c(Ce,{color:"primary","text-color":"white"},{default:d(()=>[I($(v.TSRVD_LINE),1)]),_:2},1024)]),_:2},1024),c(z,null,{default:d(()=>[c(E,null,{default:d(()=>[I($(v.TSRVD_ITMCD),1)]),_:2},1024),c(E,{caption:"",lines:"1"},{default:d(()=>[I("Item")]),_:1})]),_:2},1024),c(z,null,{default:d(()=>[c(E,null,{default:d(()=>[I($(v.TSRVD_CUSTRMK),1)]),_:2},1024),c(E,{caption:"",lines:"1"},{default:d(()=>[I("Customer Remarks")]),_:1})]),_:2},1024),c(z,null,{default:d(()=>[c(E,null,{default:d(()=>[D("div",$t,[v.TSRVD_REMARK?(L(),U("span",Nt,[D("div",{innerHTML:v.TSRVD_REMARK},null,8,At)])):(L(),U("span",Vt," No comment yet !, Click here to add comment. ")),c(Bt,{modelValue:v.TSRVD_REMARK,"onUpdate:modelValue":y=>v.TSRVD_REMARK=y,"auto-save":""},{default:d(y=>[c(qt,{onKeyup:ct(y.set,["enter"]),modelValue:y.value,"onUpdate:modelValue":k=>y.value=k,dense:H(s).screen.lt.md,toolbar:[[{label:H(s).lang.editor.align,icon:H(s).iconSet.editor.align,fixedLabel:!0,options:["left","center","right","justify"]}],["bold","italic","strike","underline","subscript","superscript"],["token","hr","link","custom_btn"],["print","fullscreen"],[{label:H(s).lang.editor.formatting,icon:H(s).iconSet.editor.formatting,list:"no-icons",options:["p","h1","h2","h3","h4","h5","h6","code"]},{label:H(s).lang.editor.fontSize,icon:H(s).iconSet.editor.fontSize,fixedLabel:!0,fixedIcon:!0,list:"no-icons",options:["size-1","size-2","size-3","size-4","size-5","size-6","size-7"]},{label:H(s).lang.editor.defaultFont,icon:H(s).iconSet.editor.font,fixedIcon:!0,list:"no-icons",options:["default_font","arial","arial_black","comic_sans","courier_new","impact","lucida_grande","times_new_roman","verdana"]},"removeFormat"],["quote","unordered","ordered","outdent","indent"],["undo","redo"],["viewsource"]],fonts:{arial:"Arial",arial_black:"Arial Black",comic_sans:"Comic Sans MS",courier_new:"Courier New",impact:"Impact",lucida_grande:"Lucida Grande",times_new_roman:"Times New Roman",verdana:"Verdana"}},null,8,["onKeyup","modelValue","onUpdate:modelValue","dense","toolbar"])]),_:2},1032,["modelValue","onUpdate:modelValue"])])]),_:2},1024),c(E,{caption:"",lines:"1"},{default:d(()=>[I("Operator Remarks")]),_:1})]),_:2},1024),c(z,{side:""},{default:d(()=>[c(x,{icon:"construction",color:"green",flat:"",onClick:y=>f(w,"add")},{default:d(()=>[c(te,null,{default:d(()=>[I("Update Fix Data")]),_:1})]),_:2},1032,["onClick"])]),_:2},1024),c(z,{side:""},{default:d(()=>[c(x,{icon:"visibility",color:"cyan",flat:"",onClick:y=>f(w,"view"),disable:!v.listFixDet},{default:d(()=>[c(te,null,{default:d(()=>[I("View Added Item")]),_:1}),c(bt,{color:"red",floating:""},{default:d(()=>[I($(v.listFixDet.length),1)]),_:2},1024)]),_:2},1032,["onClick","disable"])]),_:2},1024)]),_:2},1032,["class"]))),128))]),_:1})]),_:1}),c(Te,{align:"right"},{default:d(()=>[c(x,{label:"OK",color:"primary",onClick:p[0]||(p[0]=v=>C()),disable:g.value||h.value.filter(v=>v.listFixDet).length===0||h.value.filter(v=>v.TSRVD_REMARK).length===0,loading:g.value},null,8,["disable","loading"]),c(x,{flat:"",label:"Cancel",color:"red",onClick:H(i),loading:g.value},null,8,["onClick","loading"])]),_:1})]),_:1})]),_:1},8,["onHide"]))}},Mt={class:"q-pa-md"},Ft={class:"row"},Ut={class:"col"},Qt={class:"q-pa-xs col-xs-12 col-sm-6 col-md-4"},jt={class:"text-h5 text-bold"},Kt={class:"text-h6 text-bold"},Yt={class:"text-subtitle2"},Gt={class:"text-h6 text-bold"},Wt=D("div",{class:"text-subtitle2"},"Resolved Items",-1),Xt={class:"row"},Jt={class:"col"},Zt=D("div",{class:"col text-right"},null,-1),ro={__name:"serviceOprView",setup(e){const t=ie();T([{name:"SRVH_DOCNO",label:"SPK No",field:"SRVH_DOCNO",sortable:!0,align:"left"},{name:"MCUS_CUSNM",label:"Customer Name",field:"MCUS_CUSNM",sortable:!0,align:"left"},{name:"resolve",label:"Resolved Line",sortable:!0,align:"left",field:u=>u.resolve.length},{name:"unresolve",label:"Unresolved Line",sortable:!0,align:"left",field:u=>u.unresolve.length},{name:"SRVH_ISSDT",label:"Submited Date",field:"SRVH_ISSDT",sortable:!0,align:"left"}]);const o=T([]),l=T(""),i=T(!1);j(()=>{s()});const s=async()=>{i.value=!0,await re.post("servicesOPR/search",{searchBy:"",searchValue:l.value}).then(u=>{i.value=!1,o.value=u.data.data}).catch(u=>{i.value=!1})},r=u=>{const h={SRVH_DOCNO:u.SRVH_DOCNO,SRVH_ISSDT:qe.formatDate(u.SRVH_ISSDT,"YYYY-MM-DD"),SRVH_CUSCD:u.MCUS_CUSCD};let g=[];u.detail.map(f=>{g.push({id:f.id,TSRVD_ITMCD:f.TSRVD_ITMCD,TSRVD_FLGSTS:f.TSRVD_FLGSTS,TSRVD_LINE:f.TSRVD_LINE,TSRVD_QTY:f.TSRVD_QTY,TSRVD_CUSTRMK:f.TSRVD_CUSTRMK,TSRVD_REMARK:f.TSRVD_REMARK,listFixDet:f.list_fix_det})}),t.dialog({component:Et,componentProps:{header:h,detail:g}}).onOk(async f=>{s()})};return(u,h)=>(L(),U("div",Mt,[D("div",Ft,[D("div",Ut,[c(pt,{grid:"",flat:"",bordered:"","card-container-class":u.cardContainerClass,title:"Outstanding Order",rows:o.value,columns:u.columns,"row-key":"name",filter:l.value,"hide-header":"",pagination:{rowsPerPage:50},"rows-per-page-options":u.rowsPerPageOptions,loading:i.value},{"top-right":d(()=>[c(ke,{borderless:"",dense:"",debounce:"300",modelValue:l.value,"onUpdate:modelValue":h[0]||(h[0]=g=>l.value=g),placeholder:"Search"},{append:d(()=>[c(ne,{name:"search"})]),_:1},8,["modelValue"])]),item:d(g=>[D("div",Qt,[c(ae,{flat:"",bordered:""},{default:d(()=>[c(A,{class:"text-center bg-secondary text-white"},{default:d(()=>[D("div",jt,$(g.row.SRVH_DOCNO),1)]),_:2},1024),c(dt),c(A,null,{default:d(()=>[D("div",Kt,$(g.row.MCUS_CUSNM),1),D("div",Yt,$(g.row.SRVH_ISSDT),1)]),_:2},1024),c(A,null,{default:d(()=>[D("div",Gt,$(g.row.resolve.length)+" of "+$(g.row.detail.length),1),Wt]),_:2},1024),c(A,null,{default:d(()=>[D("div",Xt,[D("div",Jt,[c(x,{label:"Resolve",color:"primary",outline:"",onClick:f=>r(g.row)},null,8,["onClick"])]),Zt])]),_:2},1024)]),_:2},1024)])]),_:1},8,["card-container-class","rows","columns","filter","rows-per-page-options","loading"])])])]))}};export{ro as default};
