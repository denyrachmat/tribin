import{n as We,c as ie,bd as pe,a1 as Xe,s as z,be as Ze,a as L,aY as Je,w as W,o as Z,h as v,am as me,d as ge,Q as B,g as re,aO as ve,aP as ye,ae as de,ah as et,aj as tt,bf as ot,j as nt,ab as lt,F as be,aF as at,aW as it,aK as rt,B as T,C as O,D as r,E as u,L as _e,M as X,I as N,P as E,a$ as $,T as oe,H as R,V as ne,R as we,S as Se,U as ke,O as H,Z as fe,W as Ce,X as M,Y as Te,bc as st,bg as ut}from"./index.5a7122bc.js";import{n as Re,b as D,a as K,w as ct,x as dt,y as ft,u as De,Q as qe,c as P,k as ht}from"./QTable.dc67c442.js";import{Q as pt}from"./QBtnGroup.9ffe9ac1.js";import{Q as U}from"./QTooltip.b28ef7e6.js";import{Q as mt}from"./QBadge.3980d81a.js";import{api_web as j}from"./axios.80863566.js";import{d as gt}from"./date.646504c1.js";import{u as Be}from"./use-dialog-plugin-component.76407d3f.js";function xe(e,t){if(t&&e===t)return null;const o=e.nodeName.toLowerCase();if(["div","li","ul","ol","blockquote"].includes(o)===!0)return e;const l=window.getComputedStyle?window.getComputedStyle(e):e.currentStyle,s=l.display;return s==="block"||s==="table"?e:xe(e.parentNode)}function le(e,t,o){return!e||e===document.body?!1:o===!0&&e===t||(t===document?document.body:t).contains(e.parentNode)}function Pe(e,t,o){if(o||(o=document.createRange(),o.selectNode(e),o.setStart(e,0)),t.count===0)o.setEnd(e,t.count);else if(t.count>0)if(e.nodeType===Node.TEXT_NODE)e.textContent.length<t.count?t.count-=e.textContent.length:(o.setEnd(e,t.count),t.count=0);else for(let l=0;t.count!==0&&l<e.childNodes.length;l++)o=Pe(e.childNodes[l],t,o);return o}const vt=/^https?:\/\//;class yt{constructor(t,o){this.el=t,this.eVm=o,this._range=null}get selection(){if(this.el){const t=document.getSelection();if(le(t.anchorNode,this.el,!0)&&le(t.focusNode,this.el,!0))return t}return null}get hasSelection(){return this.selection!==null?this.selection.toString().length!==0:!1}get range(){const t=this.selection;return t!==null&&t.rangeCount?t.getRangeAt(0):this._range}get parent(){const t=this.range;if(t!==null){const o=t.startContainer;return o.nodeType===document.ELEMENT_NODE?o:o.parentNode}return null}get blockParent(){const t=this.parent;return t!==null?xe(t,this.el):null}save(t=this.range){t!==null&&(this._range=t)}restore(t=this._range){const o=document.createRange(),l=document.getSelection();t!==null?(o.setStart(t.startContainer,t.startOffset),o.setEnd(t.endContainer,t.endOffset),l.removeAllRanges(),l.addRange(o)):(l.selectAllChildren(this.el),l.collapseToEnd())}savePosition(){let t=-1,o;const l=document.getSelection(),s=this.el.parentNode;if(l.focusNode&&le(l.focusNode,s))for(o=l.focusNode,t=l.focusOffset;o&&o!==s;)o!==this.el&&o.previousSibling?(o=o.previousSibling,t+=o.textContent.length):o=o.parentNode;this.savedPos=t}restorePosition(t=0){if(this.savedPos>0&&this.savedPos<t){const o=window.getSelection(),l=Pe(this.el,{count:this.savedPos});l&&(l.collapse(!1),o.removeAllRanges(),o.addRange(l))}}hasParent(t,o){const l=o?this.parent:this.blockParent;return l!==null?l.nodeName.toLowerCase()===t.toLowerCase():!1}hasParents(t,o,l=this.parent){return l===null?!1:t.includes(l.nodeName.toLowerCase())===!0?!0:o===!0?this.hasParents(t,o,l.parentNode):!1}is(t,o){if(this.selection===null)return!1;switch(t){case"formatBlock":return o==="DIV"&&this.parent===this.el||this.hasParent(o,o==="PRE");case"link":return this.hasParent("A",!0);case"fontSize":return document.queryCommandValue(t)===o;case"fontName":const l=document.queryCommandValue(t);return l===`"${o}"`||l===o;case"fullscreen":return this.eVm.inFullscreen.value;case"viewsource":return this.eVm.isViewingSource.value;case void 0:return!1;default:const s=document.queryCommandState(t);return o!==void 0?s===o:s}}getParentAttribute(t){return this.parent!==null?this.parent.getAttribute(t):null}can(t){if(t==="outdent")return this.hasParents(["blockquote","li"],!0);if(t==="indent")return this.hasParents(["li"],!0);if(t==="link")return this.selection!==null||this.is("link")}apply(t,o,l=We){if(t==="formatBlock")["BLOCKQUOTE","H1","H2","H3","H4","H5","H6"].includes(o)&&this.is(t,o)&&(t="outdent",o=null),o==="PRE"&&this.is(t,"PRE")&&(o="P");else if(t==="print"){l();const s=window.open();s.document.write(`
        <!doctype html>
        <html>
          <head>
            <title>Print - ${document.title}</title>
          </head>
          <body>
            <div>${this.el.innerHTML}</div>
          </body>
        </html>
      `),s.print(),s.close();return}else if(t==="link"){const s=this.getParentAttribute("href");if(s===null){const c=this.selectWord(this.selection),i=c?c.toString():"";if(!i.length&&(!this.range||!this.range.cloneContents().querySelector("img")))return;this.eVm.editLinkUrl.value=vt.test(i)?i:"https://",document.execCommand("createLink",!1,this.eVm.editLinkUrl.value),this.save(c.getRangeAt(0))}else this.eVm.editLinkUrl.value=s,this.range.selectNodeContents(this.parent),this.save();return}else if(t==="fullscreen"){this.eVm.toggleFullscreen(),l();return}else if(t==="viewsource"){this.eVm.isViewingSource.value=this.eVm.isViewingSource.value===!1,this.eVm.setContent(this.eVm.props.modelValue),l();return}document.execCommand(t,!1,o),l()}selectWord(t){if(t===null||t.isCollapsed!==!0||t.modify===void 0)return t;const o=document.createRange();o.setStart(t.anchorNode,t.anchorOffset),o.setEnd(t.focusNode,t.focusOffset);const l=o.collapsed?["backward","forward"]:["forward","backward"];o.detach();const s=t.focusNode,c=t.focusOffset;return t.collapse(t.anchorNode,t.anchorOffset),t.modify("move",l[0],"character"),t.modify("move",l[1],"word"),t.extend(s,c),t.modify("extend",l[1],"character"),t.modify("extend",l[0],"word"),t}}const bt=Object.keys(pe),_t=e=>bt.reduce((t,o)=>{const l=e[o];return l!==void 0&&(t[o]=l),t},{});var wt=ie({name:"QBtnDropdown",props:{...pe,...Xe,modelValue:Boolean,split:Boolean,dropdownIcon:String,contentClass:[Array,String,Object],contentStyle:[Array,String,Object],cover:Boolean,persistent:Boolean,noRouteDismiss:Boolean,autoClose:Boolean,menuAnchor:{type:String,default:"bottom end"},menuSelf:{type:String,default:"top end"},menuOffset:Array,disableMainBtn:Boolean,disableDropdown:Boolean,noIconAnimation:Boolean,toggleAriaLabel:String},emits:["update:modelValue","click","beforeShow","show","beforeHide","hide"],setup(e,{slots:t,emit:o}){const{proxy:l}=re(),s=z(e.modelValue),c=z(null),i=Ze(),p=L(()=>{const d={"aria-expanded":s.value===!0?"true":"false","aria-haspopup":"true","aria-controls":i.value,"aria-label":e.toggleAriaLabel||l.$q.lang.label[s.value===!0?"collapse":"expand"](e.label)};return(e.disable===!0||e.split===!1&&e.disableMainBtn===!0||e.disableDropdown===!0)&&(d["aria-disabled"]="true"),d}),h=L(()=>"q-btn-dropdown__arrow"+(s.value===!0&&e.noIconAnimation===!1?" rotate-180":"")+(e.split===!1?" q-btn-dropdown__arrow-container":"")),m=L(()=>Je(e)),y=L(()=>_t(e));W(()=>e.modelValue,d=>{c.value!==null&&c.value[d?"show":"hide"]()}),W(()=>e.split,k);function q(d){s.value=!0,o("beforeShow",d)}function _(d){o("show",d),o("update:modelValue",!0)}function b(d){s.value=!1,o("beforeHide",d)}function I(d){o("hide",d),o("update:modelValue",!1)}function C(d){o("click",d)}function w(d){ve(d),k(),o("click",d)}function f(d){c.value!==null&&c.value.toggle(d)}function g(d){c.value!==null&&c.value.show(d)}function k(d){c.value!==null&&c.value.hide(d)}return Object.assign(l,{show:g,hide:k,toggle:f}),Z(()=>{e.modelValue===!0&&g()}),()=>{const d=[v(me,{class:h.value,name:e.dropdownIcon||l.$q.iconSet.arrow.dropdown})];return e.disableDropdown!==!0&&d.push(v(Re,{ref:c,id:i.value,class:e.contentClass,style:e.contentStyle,cover:e.cover,fit:!0,persistent:e.persistent,noRouteDismiss:e.noRouteDismiss,autoClose:e.autoClose,anchor:e.menuAnchor,self:e.menuSelf,offset:e.menuOffset,separateClosePopup:!0,transitionShow:e.transitionShow,transitionHide:e.transitionHide,transitionDuration:e.transitionDuration,onBeforeShow:q,onShow:_,onBeforeHide:b,onHide:I},t.default)),e.split===!1?v(B,{class:"q-btn-dropdown q-btn-dropdown--simple",...y.value,...p.value,disable:e.disable===!0||e.disableMainBtn===!0,noWrap:!0,round:!1,onClick:C},{default:()=>ge(t.label,[]).concat(d),loading:t.loading}):v(pt,{class:"q-btn-dropdown q-btn-dropdown--split no-wrap q-btn-item",rounded:e.rounded,square:e.square,...m.value,glossy:e.glossy,stretch:e.stretch},()=>[v(B,{class:"q-btn-dropdown--current",...y.value,disable:e.disable===!0||e.disableMainBtn===!0,noWrap:!0,round:!1,onClick:w},{default:t.label,loading:t.loading}),v(B,{class:"q-btn-dropdown__arrow-container q-anchor--skip",...p.value,...m.value,disable:e.disable===!0||e.disableDropdown===!0,rounded:e.rounded,color:e.color,textColor:e.textColor,dense:e.dense,size:e.size,padding:e.padding,ripple:e.ripple},()=>d)])}}});function Oe(e,t,o){t.handler?t.handler(e,o,o.caret):o.runCmd(t.cmd,t.param)}function se(e){return v("div",{class:"q-editor__toolbar-group"},e)}function Ie(e,t,o,l=!1){const s=l||(t.type==="toggle"?t.toggled?t.toggled(e):t.cmd&&e.caret.is(t.cmd,t.param):!1),c=[];if(t.tip&&e.$q.platform.is.desktop){const i=t.key?v("div",[v("small",`(CTRL + ${String.fromCharCode(t.key)})`)]):null;c.push(v(U,{delay:1e3},()=>[v("div",{innerHTML:t.tip}),i]))}return v(B,{...e.buttonProps.value,icon:t.icon!==null?t.icon:void 0,color:s?t.toggleColor||e.props.toolbarToggleColor:t.color||e.props.toolbarColor,textColor:s&&!e.props.toolbarPush?null:t.textColor||e.props.toolbarTextColor,label:t.label,disable:t.disable?typeof t.disable=="function"?t.disable(e):!0:!1,size:"sm",onClick(i){o&&o(),Oe(i,t,e)}},()=>c)}function St(e,t){const o=t.list==="only-icons";let l=t.label,s=t.icon!==null?t.icon:void 0,c,i;function p(){m.component.proxy.hide()}if(o)i=t.options.map(y=>{const q=y.type===void 0?e.caret.is(y.cmd,y.param):!1;return q&&(l=y.tip,s=y.icon!==null?y.icon:void 0),Ie(e,y,p,q)}),c=e.toolbarBackgroundClass.value,i=[se(i)];else{const y=e.props.toolbarToggleColor!==void 0?`text-${e.props.toolbarToggleColor}`:null,q=e.props.toolbarTextColor!==void 0?`text-${e.props.toolbarTextColor}`:null,_=t.list==="no-icons";i=t.options.map(b=>{const I=b.disable?b.disable(e):!1,C=b.type===void 0?e.caret.is(b.cmd,b.param):!1;C&&(l=b.tip,s=b.icon!==null?b.icon:void 0);const w=b.htmlTip;return v(K,{active:C,activeClass:y,clickable:!0,disable:I,dense:!0,onClick(f){p(),e.contentRef.value!==null&&e.contentRef.value.focus(),e.caret.restore(),Oe(f,b,e)}},()=>[_===!0?null:v(D,{class:C?y:q,side:!0},()=>v(me,{name:b.icon!==null?b.icon:void 0})),v(D,w?()=>v("div",{class:"text-no-wrap",innerHTML:b.htmlTip}):b.tip?()=>v("div",{class:"text-no-wrap"},b.tip):void 0)])}),c=[e.toolbarBackgroundClass.value,q]}const h=t.highlight&&l!==t.label,m=v(wt,{...e.buttonProps.value,noCaps:!0,noWrap:!0,color:h?e.props.toolbarToggleColor:e.props.toolbarColor,textColor:h&&!e.props.toolbarPush?null:e.props.toolbarTextColor,label:t.fixedLabel?t.label:l,icon:t.fixedIcon?t.icon!==null?t.icon:void 0:s,contentClass:c,onShow:y=>e.emit("dropdownShow",y),onHide:y=>e.emit("dropdownHide",y),onBeforeShow:y=>e.emit("dropdownBeforeShow",y),onBeforeHide:y=>e.emit("dropdownBeforeHide",y)},()=>i);return m}function kt(e){if(e.caret)return e.buttons.value.filter(t=>!e.isViewingSource.value||t.find(o=>o.cmd==="viewsource")).map(t=>se(t.map(o=>e.isViewingSource.value&&o.cmd!=="viewsource"?!1:o.type==="slot"?ge(e.slots[o.slot]):o.type==="dropdown"?St(e,o):Ie(e,o))))}function Ct(e,t,o,l={}){const s=Object.keys(l);if(s.length===0)return{};const c={default_font:{cmd:"fontName",param:e,icon:o,tip:t}};return s.forEach(i=>{const p=l[i];c[i]={cmd:"fontName",param:p,icon:o,tip:p,htmlTip:`<font face="${p}">${p}</font>`}}),c}function Tt(e){if(e.caret){const t=e.props.toolbarColor||e.props.toolbarTextColor;let o=e.editLinkUrl.value;const l=()=>{e.caret.restore(),o!==e.editLinkUrl.value&&document.execCommand("createLink",!1,o===""?" ":o),e.editLinkUrl.value=null};return[v("div",{class:`q-mx-xs text-${t}`},`${e.$q.lang.editor.url}: `),v("input",{key:"qedt_btm_input",class:"col q-editor__link-input",value:o,onInput:s=>{ve(s),o=s.target.value},onKeydown:s=>{if(ye(s)!==!0)switch(s.keyCode){case 13:return de(s),l();case 27:de(s),e.caret.restore(),(!e.editLinkUrl.value||e.editLinkUrl.value==="https://")&&document.execCommand("unlink"),e.editLinkUrl.value=null;break}}}),se([v(B,{key:"qedt_btm_rem",tabindex:-1,...e.buttonProps.value,label:e.$q.lang.label.remove,noCaps:!0,onClick:()=>{e.caret.restore(),document.execCommand("unlink"),e.editLinkUrl.value=null}}),v(B,{key:"qedt_btm_upd",...e.buttonProps.value,label:e.$q.lang.label.update,noCaps:!0,onClick:l})])]}}const Rt=Object.prototype.toString,ae=Object.prototype.hasOwnProperty,Dt=new Set(["Boolean","Number","String","Function","Array","Date","RegExp"].map(e=>"[object "+e+"]"));function he(e){if(e!==Object(e)||Dt.has(Rt.call(e))===!0||e.constructor&&ae.call(e,"constructor")===!1&&ae.call(e.constructor.prototype,"isPrototypeOf")===!1)return!1;let t;for(t in e);return t===void 0||ae.call(e,t)}function Le(){let e,t,o,l,s,c,i=arguments[0]||{},p=1,h=!1;const m=arguments.length;for(typeof i=="boolean"&&(h=i,i=arguments[1]||{},p=2),Object(i)!==i&&typeof i!="function"&&(i={}),m===p&&(i=this,p--);p<m;p++)if((e=arguments[p])!==null)for(t in e)o=i[t],l=e[t],i!==l&&(h===!0&&l&&((s=Array.isArray(l))||he(l)===!0)?(s===!0?c=Array.isArray(o)===!0?o:[]:c=he(o)===!0?o:{},i[t]=Le(h,c,l)):l!==void 0&&(i[t]=l));return i}var qt=ie({name:"QEditor",props:{...et,...ct,modelValue:{type:String,required:!0},readonly:Boolean,disable:Boolean,minHeight:{type:String,default:"10rem"},maxHeight:String,height:String,definitions:Object,fonts:Object,placeholder:String,toolbar:{type:Array,validator:e=>e.length===0||e.every(t=>t.length),default(){return[["left","center","right","justify"],["bold","italic","underline","strike"],["undo","redo"]]}},toolbarColor:String,toolbarBg:String,toolbarTextColor:String,toolbarToggleColor:{type:String,default:"primary"},toolbarOutline:Boolean,toolbarPush:Boolean,toolbarRounded:Boolean,paragraphTag:{type:String,validator:e=>["div","p"].includes(e),default:"div"},contentStyle:Object,contentClass:[Object,Array,String],square:Boolean,flat:Boolean,dense:Boolean},emits:[...dt,"update:modelValue","keydown","click","mouseup","keyup","touchend","focus","blur","dropdownShow","dropdownHide","dropdownBeforeShow","dropdownBeforeHide","linkShow","linkHide"],setup(e,{slots:t,emit:o,attrs:l}){const{proxy:s,vnode:c}=re(),{$q:i}=s,p=tt(e,i),{inFullscreen:h,toggleFullscreen:m}=ft(),y=ot(l,c),q=z(null),_=z(null),b=z(null),I=z(!1),C=L(()=>!e.readonly&&!e.disable);let w,f,g=e.modelValue;document.execCommand("defaultParagraphSeparator",!1,e.paragraphTag),w=window.getComputedStyle(document.body).fontFamily;const k=L(()=>e.toolbarBg?` bg-${e.toolbarBg}`:""),d=L(()=>{const n=e.toolbarOutline!==!0&&e.toolbarPush!==!0;return{type:"a",flat:n,noWrap:!0,outline:e.toolbarOutline,push:e.toolbarPush,rounded:e.toolbarRounded,dense:!0,color:e.toolbarColor,disable:!C.value,size:"sm"}}),Q=L(()=>{const n=i.lang.editor,a=i.iconSet.editor;return{bold:{cmd:"bold",icon:a.bold,tip:n.bold,key:66},italic:{cmd:"italic",icon:a.italic,tip:n.italic,key:73},strike:{cmd:"strikeThrough",icon:a.strikethrough,tip:n.strikethrough,key:83},underline:{cmd:"underline",icon:a.underline,tip:n.underline,key:85},unordered:{cmd:"insertUnorderedList",icon:a.unorderedList,tip:n.unorderedList},ordered:{cmd:"insertOrderedList",icon:a.orderedList,tip:n.orderedList},subscript:{cmd:"subscript",icon:a.subscript,tip:n.subscript,htmlTip:"x<subscript>2</subscript>"},superscript:{cmd:"superscript",icon:a.superscript,tip:n.superscript,htmlTip:"x<superscript>2</superscript>"},link:{cmd:"link",disable:S=>S.caret&&!S.caret.can("link"),icon:a.hyperlink,tip:n.hyperlink,key:76},fullscreen:{cmd:"fullscreen",icon:a.toggleFullscreen,tip:n.toggleFullscreen,key:70},viewsource:{cmd:"viewsource",icon:a.viewSource,tip:n.viewSource},quote:{cmd:"formatBlock",param:"BLOCKQUOTE",icon:a.quote,tip:n.quote,key:81},left:{cmd:"justifyLeft",icon:a.left,tip:n.left},center:{cmd:"justifyCenter",icon:a.center,tip:n.center},right:{cmd:"justifyRight",icon:a.right,tip:n.right},justify:{cmd:"justifyFull",icon:a.justify,tip:n.justify},print:{type:"no-state",cmd:"print",icon:a.print,tip:n.print,key:80},outdent:{type:"no-state",disable:S=>S.caret&&!S.caret.can("outdent"),cmd:"outdent",icon:a.outdent,tip:n.outdent},indent:{type:"no-state",disable:S=>S.caret&&!S.caret.can("indent"),cmd:"indent",icon:a.indent,tip:n.indent},removeFormat:{type:"no-state",cmd:"removeFormat",icon:a.removeFormat,tip:n.removeFormat},hr:{type:"no-state",cmd:"insertHorizontalRule",icon:a.hr,tip:n.hr},undo:{type:"no-state",cmd:"undo",icon:a.undo,tip:n.undo,key:90},redo:{type:"no-state",cmd:"redo",icon:a.redo,tip:n.redo,key:89},h1:{cmd:"formatBlock",param:"H1",icon:a.heading1||a.heading,tip:n.heading1,htmlTip:`<h1 class="q-ma-none">${n.heading1}</h1>`},h2:{cmd:"formatBlock",param:"H2",icon:a.heading2||a.heading,tip:n.heading2,htmlTip:`<h2 class="q-ma-none">${n.heading2}</h2>`},h3:{cmd:"formatBlock",param:"H3",icon:a.heading3||a.heading,tip:n.heading3,htmlTip:`<h3 class="q-ma-none">${n.heading3}</h3>`},h4:{cmd:"formatBlock",param:"H4",icon:a.heading4||a.heading,tip:n.heading4,htmlTip:`<h4 class="q-ma-none">${n.heading4}</h4>`},h5:{cmd:"formatBlock",param:"H5",icon:a.heading5||a.heading,tip:n.heading5,htmlTip:`<h5 class="q-ma-none">${n.heading5}</h5>`},h6:{cmd:"formatBlock",param:"H6",icon:a.heading6||a.heading,tip:n.heading6,htmlTip:`<h6 class="q-ma-none">${n.heading6}</h6>`},p:{cmd:"formatBlock",param:e.paragraphTag,icon:a.heading,tip:n.paragraph},code:{cmd:"formatBlock",param:"PRE",icon:a.code,htmlTip:`<code>${n.code}</code>`},"size-1":{cmd:"fontSize",param:"1",icon:a.size1||a.size,tip:n.size1,htmlTip:`<font size="1">${n.size1}</font>`},"size-2":{cmd:"fontSize",param:"2",icon:a.size2||a.size,tip:n.size2,htmlTip:`<font size="2">${n.size2}</font>`},"size-3":{cmd:"fontSize",param:"3",icon:a.size3||a.size,tip:n.size3,htmlTip:`<font size="3">${n.size3}</font>`},"size-4":{cmd:"fontSize",param:"4",icon:a.size4||a.size,tip:n.size4,htmlTip:`<font size="4">${n.size4}</font>`},"size-5":{cmd:"fontSize",param:"5",icon:a.size5||a.size,tip:n.size5,htmlTip:`<font size="5">${n.size5}</font>`},"size-6":{cmd:"fontSize",param:"6",icon:a.size6||a.size,tip:n.size6,htmlTip:`<font size="6">${n.size6}</font>`},"size-7":{cmd:"fontSize",param:"7",icon:a.size7||a.size,tip:n.size7,htmlTip:`<font size="7">${n.size7}</font>`}}}),G=L(()=>{const n=e.definitions||{},a=e.definitions||e.fonts?Le(!0,{},Q.value,n,Ct(w,i.lang.editor.defaultFont,i.iconSet.editor.font,e.fonts)):Q.value;return e.toolbar.map(S=>S.map(x=>{if(x.options)return{type:"dropdown",icon:x.icon,label:x.label,size:"sm",dense:!0,fixedLabel:x.fixedLabel,fixedIcon:x.fixedIcon,highlight:x.highlight,list:x.list,options:x.options.map(Ge=>a[Ge])};const A=a[x];return A?A.type==="no-state"||n[x]&&(A.cmd===void 0||Q.value[A.cmd]&&Q.value[A.cmd].type==="no-state")?A:Object.assign({type:"toggle"},A):{type:"slot",slot:x}}))}),F={$q:i,props:e,slots:t,emit:o,inFullscreen:h,toggleFullscreen:m,runCmd:ee,isViewingSource:I,editLinkUrl:b,toolbarBackgroundClass:k,buttonProps:d,contentRef:_,buttons:G,setContent:J};W(()=>e.modelValue,n=>{g!==n&&(g=n,J(n,!0))}),W(b,n=>{o(`link${n?"Show":"Hide"}`)});const ze=L(()=>e.toolbar&&e.toolbar.length!==0),Fe=L(()=>{const n={},a=S=>{S.key&&(n[S.key]={cmd:S.cmd,param:S.param})};return G.value.forEach(S=>{S.forEach(x=>{x.options?x.options.forEach(a):a(x)})}),n}),Me=L(()=>h.value?e.contentStyle:[{minHeight:e.minHeight,height:e.height,maxHeight:e.maxHeight},e.contentStyle]),$e=L(()=>`q-editor q-editor--${I.value===!0?"source":"default"}`+(e.disable===!0?" disabled":"")+(h.value===!0?" fullscreen column":"")+(e.square===!0?" q-editor--square no-border-radius":"")+(e.flat===!0?" q-editor--flat":"")+(e.dense===!0?" q-editor--dense":"")+(p.value===!0?" q-editor--dark q-dark":"")),He=L(()=>[e.contentClass,"q-editor__content",{col:h.value,"overflow-auto":h.value||e.maxHeight}]),Ae=L(()=>e.disable===!0?{"aria-disabled":"true"}:{});function Ve(){if(_.value!==null){const n=`inner${I.value===!0?"Text":"HTML"}`,a=_.value[n];a!==e.modelValue&&(g=a,o("update:modelValue",a))}}function Ee(n){if(o("keydown",n),n.ctrlKey!==!0||ye(n)===!0){V();return}const a=n.keyCode,S=Fe.value[a];if(S!==void 0){const{cmd:x,param:A}=S;lt(n),ee(x,A,!1)}}function Ne(n){V(),o("click",n)}function Qe(n){if(_.value!==null){const{scrollTop:a,scrollHeight:S}=_.value;f=S-a}F.caret.save(),o("blur",n)}function Ue(n){be(()=>{_.value!==null&&f!==void 0&&(_.value.scrollTop=_.value.scrollHeight-f)}),o("focus",n)}function je(n){const a=q.value;if(a!==null&&a.contains(n.target)===!0&&(n.relatedTarget===null||a.contains(n.relatedTarget)!==!0)){const S=`inner${I.value===!0?"Text":"HTML"}`;F.caret.restorePosition(_.value[S].length),V()}}function Ke(n){const a=q.value;a!==null&&a.contains(n.target)===!0&&(n.relatedTarget===null||a.contains(n.relatedTarget)!==!0)&&(F.caret.savePosition(),V())}function ue(){f=void 0}function ce(n){F.caret.save()}function J(n,a){if(_.value!==null){a===!0&&F.caret.savePosition();const S=`inner${I.value===!0?"Text":"HTML"}`;_.value[S]=n,a===!0&&(F.caret.restorePosition(_.value[S].length),V())}}function ee(n,a,S=!0){te(),F.caret.restore(),F.caret.apply(n,a,()=>{te(),F.caret.save(),S&&V()})}function V(){setTimeout(()=>{b.value=null,s.$forceUpdate()},1)}function te(){at(()=>{_.value!==null&&_.value.focus({preventScroll:!0})})}function Ye(){return _.value}return Z(()=>{F.caret=s.caret=new yt(_.value,F),J(e.modelValue),V(),document.addEventListener("selectionchange",ce)}),nt(()=>{document.removeEventListener("selectionchange",ce)}),Object.assign(s,{runCmd:ee,refreshToolbar:V,focus:te,getContentEl:Ye}),()=>{let n;if(ze.value){const a=[v("div",{key:"qedt_top",class:"q-editor__toolbar row no-wrap scroll-x"+k.value},kt(F))];b.value!==null&&a.push(v("div",{key:"qedt_btm",class:"q-editor__toolbar row no-wrap items-center scroll-x"+k.value},Tt(F))),n=v("div",{key:"toolbar_ctainer",class:"q-editor__toolbars-container"},a)}return v("div",{ref:q,class:$e.value,style:{height:h.value===!0?"100%":null},...Ae.value,onFocusin:je,onFocusout:Ke},[n,v("div",{ref:_,style:Me.value,class:He.value,contenteditable:C.value,placeholder:e.placeholder,...y.listeners.value,onInput:Ve,onKeydown:Ee,onClick:Ne,onBlur:Qe,onFocus:Ue,onMousedown:ue,onTouchstartPassive:ue})])}}});function Y(e,t=new WeakMap){if(Object(e)!==e)return e;if(t.has(e))return t.get(e);const o=e instanceof Date?new Date(e):e instanceof RegExp?new RegExp(e.source,e.flags):e instanceof Set?new Set:e instanceof Map?new Map:typeof e.constructor!="function"?Object.create(null):e.prototype!==void 0&&typeof e.prototype.constructor=="function"?e:new e.constructor;if(typeof e.constructor=="function"&&typeof e.valueOf=="function"){const l=e.valueOf();if(Object(l)!==l){const s=new e.constructor(l);return t.set(e,s),s}}return t.set(e,o),e instanceof Set?e.forEach(l=>{o.add(Y(l,t))}):e instanceof Map&&e.forEach((l,s)=>{o.set(s,Y(l,t))}),Object.assign(o,...Object.keys(e).map(l=>({[l]:Y(e[l],t)})))}var Bt=ie({name:"QPopupEdit",props:{modelValue:{required:!0},title:String,buttons:Boolean,labelSet:String,labelCancel:String,color:{type:String,default:"primary"},validate:{type:Function,default:()=>!0},autoSave:Boolean,cover:{type:Boolean,default:!0},disable:Boolean},emits:["update:modelValue","save","cancel","beforeShow","show","beforeHide","hide"],setup(e,{slots:t,emit:o}){const{proxy:l}=re(),{$q:s}=l,c=z(null),i=z(""),p=z("");let h=!1;const m=L(()=>it({initialValue:i.value,validate:e.validate,set:y,cancel:q,updatePosition:_},"value",()=>p.value,d=>{p.value=d}));function y(){e.validate(p.value)!==!1&&(b()===!0&&(o("save",p.value,i.value),o("update:modelValue",p.value)),I())}function q(){b()===!0&&o("cancel",p.value,i.value),I()}function _(){be(()=>{c.value.updatePosition()})}function b(){return rt(p.value,i.value)===!1}function I(){h=!0,c.value.hide()}function C(){h=!1,i.value=Y(e.modelValue),p.value=Y(e.modelValue),o("beforeShow")}function w(){o("show")}function f(){h===!1&&b()===!0&&(e.autoSave===!0&&e.validate(p.value)===!0?(o("save",p.value,i.value),o("update:modelValue",p.value)):o("cancel",p.value,i.value)),o("beforeHide")}function g(){o("hide")}function k(){const d=t.default!==void 0?[].concat(t.default(m.value)):[];return e.title&&d.unshift(v("div",{class:"q-dialog__title q-mt-sm q-mb-sm"},e.title)),e.buttons===!0&&d.push(v("div",{class:"q-popup-edit__buttons row justify-center no-wrap"},[v(B,{flat:!0,color:e.color,label:e.labelCancel||s.lang.label.cancel,onClick:q}),v(B,{flat:!0,color:e.color,label:e.labelSet||s.lang.label.set,onClick:y})])),d}return Object.assign(l,{set:y,cancel:q,show(d){c.value!==null&&c.value.show(d)},hide(d){c.value!==null&&c.value.hide(d)},updatePosition:_}),()=>{if(e.disable!==!0)return v(Re,{ref:c,class:"q-popup-edit",cover:e.cover,onBeforeShow:C,onShow:w,onBeforeHide:f,onHide:g,onEscapeKey:q},k)}}});const xt={class:"row"},Pt=N("div",{class:"col"},[N("div",{class:"text-h6"},"Update Used Item")],-1),Ot={key:0,class:"col text-right"},It={key:0},Lt={key:0},zt={key:0},Ft={class:"text-h5 text-bold"},Mt={__name:"serviceOprItemAdd",props:{mode:String,dataItem:Array},setup(e){const{dialogRef:t,onDialogHide:o,onDialogOK:l,onDialogCancel:s}=Be(),c=De(),i=e;Z(async()=>{i.dataItem.listFixDet&&(h.value=i.dataItem.listFixDet,await _())});const p=z([]),h=z([]),m=z(!1),y=()=>{h.value.push({TSRVD_ID:i.dataItem.id,TSRVF_ITMCD:"",TSRVF_PRC:0,TSRVF_QTY:1})},q=(w,f,g,k)=>{f(async()=>{k==="item"&&await _(w)})},_=async w=>{m.value=!0,await j.post("item/searchAPITBL",{searchValue:w}).then(f=>{m.value=!1,p.value=f.data.data}).catch(()=>{m.value=!1})},b=()=>{i.mode==="view"?s():c.dialog({title:"Confirmation",message:"Are you sure want to save this items ?",cancel:!0,persistent:!0}).onOk(async()=>{l(h.value)})},I=w=>{c.dialog({title:"Confirmation",message:`Do you want to delete this lines no ${w+1} ?`,cancel:!0,persistent:!0}).onOk(async()=>{h.value.splice(w,1)})},C=w=>{let f=0;return w.map(g=>{f+=parseInt(g.TSRVF_PRC)*parseInt(g.TSRVF_QTY)}),f.toLocaleString()};return(w,f)=>(T(),O(Te,{ref_key:"dialogRef",ref:t,onHide:M(o),"transition-show":"slide-up","transition-hide":"slide-down","full-width":""},{default:r(()=>[u(_e,{class:"q-dialog-plugin bg-white q-pa-sm"},{default:r(()=>[u(X,null,{default:r(()=>[N("div",xt,[Pt,i.mode!=="view"?(T(),E("div",Ot,[u(B,{icon:"add",outline:"",color:"blue",onClick:y})])):$("",!0)])]),_:1}),u(X,{class:"q-pa-sm",style:{"max-height":"50vh"}},{default:r(()=>[u(qe,{bordered:""},{default:r(()=>[h.value.length===0?oe((T(),O(K,{key:0,class:"q-my-sm",clickable:""},{default:r(()=>[u(D,null,{default:r(()=>[R(" No items added ")]),_:1})]),_:1})),[[ne]]):$("",!0),(T(!0),E(we,null,Se(h.value,(g,k)=>oe((T(),O(K,{key:k,class:"q-my-sm",clickable:""},{default:r(()=>[u(D,{avatar:""},{default:r(()=>[u(ke,{color:"primary","text-color":"white"},{default:r(()=>[R(H(k+1),1)]),_:2},1024)]),_:2},1024),u(D,null,{default:r(()=>[u(P,null,{default:r(()=>[i.mode==="view"?(T(),E("div",It,[u(P,null,{default:r(()=>[R(H(g.MITM_ITMNM?g.MITM_ITMNM:p.value.filter(d=>d.MITM_ITMCD==g.TSRVF_ITMCD)[0].MITM_ITMNM),1)]),_:2},1024),u(P,{caption:""},{default:r(()=>[R(" Item ")]),_:1})])):(T(),O(ht,{key:1,dense:"",filled:"",label:"Item Name",modelValue:g.TSRVF_ITMCD,"onUpdate:modelValue":d=>g.TSRVF_ITMCD=d,"use-input":"","input-debounce":"500",options:p.value,onFilter:f[0]||(f[0]=(d,Q,G)=>q(d,Q,G,"item")),behavior:"dialog","option-label":"MITM_ITMNM","option-value":"MITM_ITMCD","emit-value":"","map-options":"",loading:m.value,readonly:i.mode==="view"},null,8,["modelValue","onUpdate:modelValue","options","loading","readonly"]))]),_:2},1024)]),_:2},1024),u(D,null,{default:r(()=>[i.mode==="view"?(T(),E("div",Lt,[u(P,null,{default:r(()=>[R(H(g.TSRVF_PRC.toLocaleString()),1)]),_:2},1024),u(P,{caption:""},{default:r(()=>[R(" Price ")]),_:1})])):(T(),O(fe,{key:1,label:"Price",modelValue:g.TSRVF_PRC,"onUpdate:modelValue":d=>g.TSRVF_PRC=d,filled:"",dense:"",readonly:i.mode==="view"},null,8,["modelValue","onUpdate:modelValue","readonly"]))]),_:2},1024),u(D,null,{default:r(()=>[i.mode==="view"?(T(),E("div",zt,[u(P,null,{default:r(()=>[R(H(g.TSRVF_QTY.toLocaleString()),1)]),_:2},1024),u(P,{caption:""},{default:r(()=>[R(" Qty ")]),_:1})])):(T(),O(fe,{key:1,label:"Qty",modelValue:g.TSRVF_QTY,"onUpdate:modelValue":d=>g.TSRVF_QTY=d,filled:"",dense:"",readonly:i.mode==="view"},null,8,["modelValue","onUpdate:modelValue","readonly"]))]),_:2},1024),i.mode==="view"?(T(),O(D,{key:0},{default:r(()=>[u(P,null,{default:r(()=>[R(" Rp "+H((parseInt(g.TSRVF_PRC)*parseInt(g.TSRVF_QTY)).toLocaleString()),1)]),_:2},1024),u(P,{caption:""},{default:r(()=>[R(" Total Price ")]),_:1})]),_:2},1024)):$("",!0),e.mode!=="view"?(T(),O(D,{key:1,side:""},{default:r(()=>[u(B,{icon:"delete",flat:"",color:"red",onClick:d=>I(k)},null,8,["onClick"])]),_:2},1024)):$("",!0)]),_:2},1024)),[[ne]])),128)),e.mode==="view"?oe((T(),O(K,{key:1,class:"q-my-sm",clickable:""},{default:r(()=>[u(D),u(D),u(D),u(D,null,{default:r(()=>[u(P,null,{default:r(()=>[N("span",Ft," Rp "+H(C(h.value)),1)]),_:1}),u(P,{caption:""},{default:r(()=>[R(" Total Price ")]),_:1})]),_:1})]),_:1})),[[ne]]):$("",!0)]),_:1})]),_:1}),u(Ce,{align:"right"},{default:r(()=>[u(B,{label:"OK",color:"primary",onClick:f[1]||(f[1]=g=>b()),disable:m.value,loading:m.value},null,8,["disable","loading"]),u(B,{flat:"",label:"Cancel",color:"red",onClick:M(s),loading:m.value},null,8,["onClick","loading"])]),_:1})]),_:1})]),_:1},8,["onHide"]))}},$t={class:"text-h6"},Ht={class:"cursor-pointer"},At={key:0},Vt={key:1},Et=["innerHTML"],Xt={__name:"serviceOprUpdateOrder",props:{header:Array,detail:Array,mode:String},setup(e){const{dialogRef:t,onDialogHide:o,onDialogOK:l,onDialogCancel:s}=Be(),c=De(),i=e,p=z({SRVH_DOCNO:"",SRVH_ISSDT:gt.formatDate(Date.now(),"YYYY-MM-DD"),SRVH_CUSCD:""}),h=z([]),m=z(!1);Z(async()=>{i.header&&(p.value=i.header,h.value=i.detail)});const y=(C,w="add")=>{c.dialog({component:Mt,componentProps:{mode:w,dataItem:h.value[C]}}).onOk(async f=>{h.value[C].TSRVD_FLGSTS=1,h.value[C].listFixDet=f})},q=()=>{i.mode!=="edit"?l():c.dialog({title:"Confirmation",message:"Do you want to submit this data ?",cancel:!0,persistent:!0}).onOk(async()=>{m.value=!0,await j.post("servicesOPR",{data:h.value}).then(C=>{m.value=!1,l()})})},_=C=>{console.log(h.value[C]),c.dialog({title:"Confirmation",message:"Do you want to approve this price ?",cancel:!0,persistent:!0}).onOk(async()=>{m.value=!0,await j.put(`servicesAdmin/updateByDet/${btoa(h.value[C].id)}`,{TSRVD_FLGSTS:2}).then(w=>{m.value=!1,l()}).catch(w=>{m.value=!1})})},b=C=>{c.dialog({title:"Confirmation",message:"Do you want to reject this price ?",cancel:!0,persistent:!0}).onOk(async()=>{m.value=!0,await j.put(`servicesAdmin/updateByDet/${btoa(h.value[C].id)}`,{TSRVD_FLGSTS:0}).then(w=>{m.value=!1,l()}).catch(w=>{m.value=!1})})},I=C=>{c.dialog({title:"Confirmation",message:"Do you want to mark this problem as done ?",cancel:!0,persistent:!0}).onOk(async()=>{m.value=!0,await j.put(`servicesAdmin/updateByDet/${btoa(h.value[C].id)}`,{TSRVD_FLGSTS:3}).then(w=>{m.value=!1,l()}).catch(w=>{m.value=!1})})};return(C,w)=>(T(),O(Te,{ref_key:"dialogRef",ref:t,onHide:M(o),"transition-show":"slide-up","transition-hide":"slide-down","full-width":""},{default:r(()=>[u(_e,{class:"q-dialog-plugin bg-white q-pa-sm"},{default:r(()=>[u(X,null,{default:r(()=>[N("div",$t,"Update Order "+H(p.value.SRVH_DOCNO),1)]),_:1}),u(X,{class:"q-pa-sm"},{default:r(()=>[u(qe,{bordered:""},{default:r(()=>[(T(!0),E(we,null,Se(h.value,(f,g)=>(T(),O(K,{key:g,class:st("q-my-sm")},{default:r(()=>[u(D,{avatar:""},{default:r(()=>[u(ke,{color:f.TSRVD_FLGSTS===0?"red":"primary","text-color":"white"},{default:r(()=>[R(H(f.TSRVD_LINE),1)]),_:2},1032,["color"])]),_:2},1024),u(D,null,{default:r(()=>[u(P,null,{default:r(()=>[R(H(f.TSRVD_ITMCD),1)]),_:2},1024),u(P,{caption:"",lines:"1"},{default:r(()=>[R("Item")]),_:1})]),_:2},1024),u(D,null,{default:r(()=>[u(P,null,{default:r(()=>[R(H(f.TSRVD_CUSTRMK),1)]),_:2},1024),u(P,{caption:"",lines:"1"},{default:r(()=>[R("Customer Remarks")]),_:1})]),_:2},1024),u(D,null,{default:r(()=>[u(P,null,{default:r(()=>[N("div",Ht,[f.TSRVD_REMARK?(T(),E("span",Vt,[N("div",{innerHTML:f.TSRVD_REMARK},null,8,Et)])):(T(),E("span",At," No comment yet !, Click here to add comment. ")),i.mode!=="view"?(T(),O(Bt,{key:2,modelValue:f.TSRVD_REMARK,"onUpdate:modelValue":k=>f.TSRVD_REMARK=k,"auto-save":""},{default:r(k=>[u(qt,{onKeyup:ut(k.set,["enter"]),modelValue:k.value,"onUpdate:modelValue":d=>k.value=d,dense:M(c).screen.lt.md,toolbar:[[{label:M(c).lang.editor.align,icon:M(c).iconSet.editor.align,fixedLabel:!0,options:["left","center","right","justify"]}],["bold","italic","strike","underline","subscript","superscript"],["token","hr","link","custom_btn"],["print","fullscreen"],[{label:M(c).lang.editor.formatting,icon:M(c).iconSet.editor.formatting,list:"no-icons",options:["p","h1","h2","h3","h4","h5","h6","code"]},{label:M(c).lang.editor.fontSize,icon:M(c).iconSet.editor.fontSize,fixedLabel:!0,fixedIcon:!0,list:"no-icons",options:["size-1","size-2","size-3","size-4","size-5","size-6","size-7"]},{label:M(c).lang.editor.defaultFont,icon:M(c).iconSet.editor.font,fixedIcon:!0,list:"no-icons",options:["default_font","arial","arial_black","comic_sans","courier_new","impact","lucida_grande","times_new_roman","verdana"]},"removeFormat"],["quote","unordered","ordered","outdent","indent"],["undo","redo"],["viewsource"]],fonts:{arial:"Arial",arial_black:"Arial Black",comic_sans:"Comic Sans MS",courier_new:"Courier New",impact:"Impact",lucida_grande:"Lucida Grande",times_new_roman:"Times New Roman",verdana:"Verdana"}},null,8,["onKeyup","modelValue","onUpdate:modelValue","dense","toolbar"])]),_:2},1032,["modelValue","onUpdate:modelValue"])):$("",!0)])]),_:2},1024),u(P,{caption:"",lines:"1"},{default:r(()=>[R("Operator Remarks")]),_:1})]),_:2},1024),i.mode==="edit"&&f.TSRVD_FLGSTS<2?(T(),O(D,{key:0,side:""},{default:r(()=>[u(B,{icon:"construction",color:"green",flat:"",onClick:k=>y(g,"add")},{default:r(()=>[u(U,null,{default:r(()=>[R("Update Fix Data")]),_:1})]),_:2},1032,["onClick"])]),_:2},1024)):$("",!0),u(D,{side:""},{default:r(()=>[u(B,{icon:"visibility",color:"cyan",flat:"",onClick:k=>y(g,"view"),disable:!f.listFixDet},{default:r(()=>[u(U,null,{default:r(()=>[R("View Added Item")]),_:1}),f.listFixDet.length>0?(T(),O(mt,{key:0,color:"red",floating:""},{default:r(()=>[R(H(f.listFixDet.length),1)]),_:2},1024)):$("",!0)]),_:2},1032,["onClick","disable"])]),_:2},1024),i.mode==="approvecust"?(T(),O(D,{key:1,side:""},{default:r(()=>[u(B,{icon:"how_to_reg",color:"green",outline:"",onClick:k=>_(g)},{default:r(()=>[u(U,null,{default:r(()=>[R("Approve this as customer")]),_:1})]),_:2},1032,["onClick"])]),_:2},1024)):$("",!0),i.mode==="approvecust"?(T(),O(D,{key:2,side:""},{default:r(()=>[u(B,{icon:"cancel",color:"red",outline:"",onClick:k=>b(g)},{default:r(()=>[u(U,null,{default:r(()=>[R("Reject this as customer")]),_:1})]),_:2},1032,["onClick"])]),_:2},1024)):$("",!0),i.mode==="edit"&&f.TSRVD_FLGSTS===2?(T(),O(D,{key:3,side:""},{default:r(()=>[u(B,{icon:"task",color:"indigo",outline:"",onClick:k=>I(g)},{default:r(()=>[u(U,null,{default:r(()=>[R("Mark this problem as done")]),_:1})]),_:2},1032,["onClick"])]),_:2},1024)):$("",!0)]),_:2},1024))),128))]),_:1})]),_:1}),u(Ce,{align:"right"},{default:r(()=>[u(B,{label:"OK",color:"primary",onClick:w[0]||(w[0]=f=>q()),disable:m.value||h.value.filter(f=>f.listFixDet).length===0||h.value.filter(f=>f.TSRVD_REMARK).length===0,loading:m.value},null,8,["disable","loading"]),u(B,{flat:"",label:"Cancel",color:"red",onClick:M(s),loading:m.value},null,8,["onClick","loading"])]),_:1})]),_:1})]),_:1},8,["onHide"]))}};export{Xt as _};
