import{n as Ge,c as ne,bb as me,U as Xe,s as z,bc as Je,a as x,aR as Ze,w as K,o as G,h as g,aa as pe,d as ge,Q as R,g as le,aH as ve,aI as ye,a6 as ue,ab as et,ac as tt,bd as ot,j as nt,a3 as lt,F as be,ay as at,aQ as it,aD as rt,B,C as A,D as u,E as c,J as we,K as W,I as V,R as U,aY as E,aW as ce,H as L,ap as de,aU as ke,aV as Se,aZ as Ce,aX as M,P as fe,L as _e,M as H,O as Te,ba as st,be as ut}from"./index.a98e900f.js";import{q as De,c as ct,l as O,k as Y,y as dt,z as ft,A as ht,u as Re,b as qe,Q as xe,m as F,d as mt}from"./use-dialog-plugin-component.3206c174.js";import{Q as j}from"./QTooltip.f1ee70c7.js";import{Q as pt}from"./QBadge.41fa7ba6.js";import{api_web as oe}from"./axios.690689c6.js";import{d as gt}from"./date.75c1eede.js";function Be(e,t){if(t&&e===t)return null;const o=e.nodeName.toLowerCase();if(["div","li","ul","ol","blockquote"].includes(o)===!0)return e;const l=window.getComputedStyle?window.getComputedStyle(e):e.currentStyle,r=l.display;return r==="block"||r==="table"?e:Be(e.parentNode)}function ee(e,t,o){return!e||e===document.body?!1:o===!0&&e===t||(t===document?document.body:t).contains(e.parentNode)}function Oe(e,t,o){if(o||(o=document.createRange(),o.selectNode(e),o.setStart(e,0)),t.count===0)o.setEnd(e,t.count);else if(t.count>0)if(e.nodeType===Node.TEXT_NODE)e.textContent.length<t.count?t.count-=e.textContent.length:(o.setEnd(e,t.count),t.count=0);else for(let l=0;t.count!==0&&l<e.childNodes.length;l++)o=Oe(e.childNodes[l],t,o);return o}const vt=/^https?:\/\//;class yt{constructor(t,o){this.el=t,this.eVm=o,this._range=null}get selection(){if(this.el){const t=document.getSelection();if(ee(t.anchorNode,this.el,!0)&&ee(t.focusNode,this.el,!0))return t}return null}get hasSelection(){return this.selection!==null?this.selection.toString().length!==0:!1}get range(){const t=this.selection;return t!==null&&t.rangeCount?t.getRangeAt(0):this._range}get parent(){const t=this.range;if(t!==null){const o=t.startContainer;return o.nodeType===document.ELEMENT_NODE?o:o.parentNode}return null}get blockParent(){const t=this.parent;return t!==null?Be(t,this.el):null}save(t=this.range){t!==null&&(this._range=t)}restore(t=this._range){const o=document.createRange(),l=document.getSelection();t!==null?(o.setStart(t.startContainer,t.startOffset),o.setEnd(t.endContainer,t.endOffset),l.removeAllRanges(),l.addRange(o)):(l.selectAllChildren(this.el),l.collapseToEnd())}savePosition(){let t=-1,o;const l=document.getSelection(),r=this.el.parentNode;if(l.focusNode&&ee(l.focusNode,r))for(o=l.focusNode,t=l.focusOffset;o&&o!==r;)o!==this.el&&o.previousSibling?(o=o.previousSibling,t+=o.textContent.length):o=o.parentNode;this.savedPos=t}restorePosition(t=0){if(this.savedPos>0&&this.savedPos<t){const o=window.getSelection(),l=Oe(this.el,{count:this.savedPos});l&&(l.collapse(!1),o.removeAllRanges(),o.addRange(l))}}hasParent(t,o){const l=o?this.parent:this.blockParent;return l!==null?l.nodeName.toLowerCase()===t.toLowerCase():!1}hasParents(t,o,l=this.parent){return l===null?!1:t.includes(l.nodeName.toLowerCase())===!0?!0:o===!0?this.hasParents(t,o,l.parentNode):!1}is(t,o){if(this.selection===null)return!1;switch(t){case"formatBlock":return o==="DIV"&&this.parent===this.el||this.hasParent(o,o==="PRE");case"link":return this.hasParent("A",!0);case"fontSize":return document.queryCommandValue(t)===o;case"fontName":const l=document.queryCommandValue(t);return l===`"${o}"`||l===o;case"fullscreen":return this.eVm.inFullscreen.value;case"viewsource":return this.eVm.isViewingSource.value;case void 0:return!1;default:const r=document.queryCommandState(t);return o!==void 0?r===o:r}}getParentAttribute(t){return this.parent!==null?this.parent.getAttribute(t):null}can(t){if(t==="outdent")return this.hasParents(["blockquote","li"],!0);if(t==="indent")return this.hasParents(["li"],!0);if(t==="link")return this.selection!==null||this.is("link")}apply(t,o,l=Ge){if(t==="formatBlock")["BLOCKQUOTE","H1","H2","H3","H4","H5","H6"].includes(o)&&this.is(t,o)&&(t="outdent",o=null),o==="PRE"&&this.is(t,"PRE")&&(o="P");else if(t==="print"){l();const r=window.open();r.document.write(`
        <!doctype html>
        <html>
          <head>
            <title>Print - ${document.title}</title>
          </head>
          <body>
            <div>${this.el.innerHTML}</div>
          </body>
        </html>
      `),r.print(),r.close();return}else if(t==="link"){const r=this.getParentAttribute("href");if(r===null){const s=this.selectWord(this.selection),i=s?s.toString():"";if(!i.length&&(!this.range||!this.range.cloneContents().querySelector("img")))return;this.eVm.editLinkUrl.value=vt.test(i)?i:"https://",document.execCommand("createLink",!1,this.eVm.editLinkUrl.value),this.save(s.getRangeAt(0))}else this.eVm.editLinkUrl.value=r,this.range.selectNodeContents(this.parent),this.save();return}else if(t==="fullscreen"){this.eVm.toggleFullscreen(),l();return}else if(t==="viewsource"){this.eVm.isViewingSource.value=this.eVm.isViewingSource.value===!1,this.eVm.setContent(this.eVm.props.modelValue),l();return}document.execCommand(t,!1,o),l()}selectWord(t){if(t===null||t.isCollapsed!==!0||t.modify===void 0)return t;const o=document.createRange();o.setStart(t.anchorNode,t.anchorOffset),o.setEnd(t.focusNode,t.focusOffset);const l=o.collapsed?["backward","forward"]:["forward","backward"];o.detach();const r=t.focusNode,s=t.focusOffset;return t.collapse(t.anchorNode,t.anchorOffset),t.modify("move",l[0],"character"),t.modify("move",l[1],"word"),t.extend(r,s),t.modify("extend",l[1],"character"),t.modify("extend",l[0],"word"),t}}const bt=Object.keys(me),wt=e=>bt.reduce((t,o)=>{const l=e[o];return l!==void 0&&(t[o]=l),t},{});var kt=ne({name:"QBtnDropdown",props:{...me,...Xe,modelValue:Boolean,split:Boolean,dropdownIcon:String,contentClass:[Array,String,Object],contentStyle:[Array,String,Object],cover:Boolean,persistent:Boolean,noRouteDismiss:Boolean,autoClose:Boolean,menuAnchor:{type:String,default:"bottom end"},menuSelf:{type:String,default:"top end"},menuOffset:Array,disableMainBtn:Boolean,disableDropdown:Boolean,noIconAnimation:Boolean,toggleAriaLabel:String},emits:["update:modelValue","click","beforeShow","show","beforeHide","hide"],setup(e,{slots:t,emit:o}){const{proxy:l}=le(),r=z(e.modelValue),s=z(null),i=Je(),f=x(()=>{const d={"aria-expanded":r.value===!0?"true":"false","aria-haspopup":"true","aria-controls":i.value,"aria-label":e.toggleAriaLabel||l.$q.lang.label[r.value===!0?"collapse":"expand"](e.label)};return(e.disable===!0||e.split===!1&&e.disableMainBtn===!0||e.disableDropdown===!0)&&(d["aria-disabled"]="true"),d}),m=x(()=>"q-btn-dropdown__arrow"+(r.value===!0&&e.noIconAnimation===!1?" rotate-180":"")+(e.split===!1?" q-btn-dropdown__arrow-container":"")),y=x(()=>Ze(e)),v=x(()=>wt(e));K(()=>e.modelValue,d=>{s.value!==null&&s.value[d?"show":"hide"]()}),K(()=>e.split,T);function _(d){r.value=!0,o("beforeShow",d)}function w(d){o("show",d),o("update:modelValue",!0)}function p(d){r.value=!1,o("beforeHide",d)}function C(d){o("hide",d),o("update:modelValue",!1)}function h(d){o("click",d)}function S(d){ve(d),T(),o("click",d)}function k(d){s.value!==null&&s.value.toggle(d)}function q(d){s.value!==null&&s.value.show(d)}function T(d){s.value!==null&&s.value.hide(d)}return Object.assign(l,{show:q,hide:T,toggle:k}),G(()=>{e.modelValue===!0&&q()}),()=>{const d=[g(pe,{class:m.value,name:e.dropdownIcon||l.$q.iconSet.arrow.dropdown})];return e.disableDropdown!==!0&&d.push(g(De,{ref:s,id:i.value,class:e.contentClass,style:e.contentStyle,cover:e.cover,fit:!0,persistent:e.persistent,noRouteDismiss:e.noRouteDismiss,autoClose:e.autoClose,anchor:e.menuAnchor,self:e.menuSelf,offset:e.menuOffset,separateClosePopup:!0,transitionShow:e.transitionShow,transitionHide:e.transitionHide,transitionDuration:e.transitionDuration,onBeforeShow:_,onShow:w,onBeforeHide:p,onHide:C},t.default)),e.split===!1?g(R,{class:"q-btn-dropdown q-btn-dropdown--simple",...v.value,...f.value,disable:e.disable===!0||e.disableMainBtn===!0,noWrap:!0,round:!1,onClick:h},{default:()=>ge(t.label,[]).concat(d),loading:t.loading}):g(ct,{class:"q-btn-dropdown q-btn-dropdown--split no-wrap q-btn-item",rounded:e.rounded,square:e.square,...y.value,glossy:e.glossy,stretch:e.stretch},()=>[g(R,{class:"q-btn-dropdown--current",...v.value,disable:e.disable===!0||e.disableMainBtn===!0,noWrap:!0,round:!1,onClick:S},{default:t.label,loading:t.loading}),g(R,{class:"q-btn-dropdown__arrow-container q-anchor--skip",...f.value,...y.value,disable:e.disable===!0||e.disableDropdown===!0,rounded:e.rounded,color:e.color,textColor:e.textColor,dense:e.dense,size:e.size,padding:e.padding,ripple:e.ripple},()=>d)])}}});function ze(e,t,o){t.handler?t.handler(e,o,o.caret):o.runCmd(t.cmd,t.param)}function ae(e){return g("div",{class:"q-editor__toolbar-group"},e)}function Pe(e,t,o,l=!1){const r=l||(t.type==="toggle"?t.toggled?t.toggled(e):t.cmd&&e.caret.is(t.cmd,t.param):!1),s=[];if(t.tip&&e.$q.platform.is.desktop){const i=t.key?g("div",[g("small",`(CTRL + ${String.fromCharCode(t.key)})`)]):null;s.push(g(j,{delay:1e3},()=>[g("div",{innerHTML:t.tip}),i]))}return g(R,{...e.buttonProps.value,icon:t.icon!==null?t.icon:void 0,color:r?t.toggleColor||e.props.toolbarToggleColor:t.color||e.props.toolbarColor,textColor:r&&!e.props.toolbarPush?null:t.textColor||e.props.toolbarTextColor,label:t.label,disable:t.disable?typeof t.disable=="function"?t.disable(e):!0:!1,size:"sm",onClick(i){o&&o(),ze(i,t,e)}},()=>s)}function St(e,t){const o=t.list==="only-icons";let l=t.label,r=t.icon!==null?t.icon:void 0,s,i;function f(){y.component.proxy.hide()}if(o)i=t.options.map(v=>{const _=v.type===void 0?e.caret.is(v.cmd,v.param):!1;return _&&(l=v.tip,r=v.icon!==null?v.icon:void 0),Pe(e,v,f,_)}),s=e.toolbarBackgroundClass.value,i=[ae(i)];else{const v=e.props.toolbarToggleColor!==void 0?`text-${e.props.toolbarToggleColor}`:null,_=e.props.toolbarTextColor!==void 0?`text-${e.props.toolbarTextColor}`:null,w=t.list==="no-icons";i=t.options.map(p=>{const C=p.disable?p.disable(e):!1,h=p.type===void 0?e.caret.is(p.cmd,p.param):!1;h&&(l=p.tip,r=p.icon!==null?p.icon:void 0);const S=p.htmlTip;return g(Y,{active:h,activeClass:v,clickable:!0,disable:C,dense:!0,onClick(k){f(),e.contentRef.value!==null&&e.contentRef.value.focus(),e.caret.restore(),ze(k,p,e)}},()=>[w===!0?null:g(O,{class:h?v:_,side:!0},()=>g(pe,{name:p.icon!==null?p.icon:void 0})),g(O,S?()=>g("div",{class:"text-no-wrap",innerHTML:p.htmlTip}):p.tip?()=>g("div",{class:"text-no-wrap"},p.tip):void 0)])}),s=[e.toolbarBackgroundClass.value,_]}const m=t.highlight&&l!==t.label,y=g(kt,{...e.buttonProps.value,noCaps:!0,noWrap:!0,color:m?e.props.toolbarToggleColor:e.props.toolbarColor,textColor:m&&!e.props.toolbarPush?null:e.props.toolbarTextColor,label:t.fixedLabel?t.label:l,icon:t.fixedIcon?t.icon!==null?t.icon:void 0:r,contentClass:s,onShow:v=>e.emit("dropdownShow",v),onHide:v=>e.emit("dropdownHide",v),onBeforeShow:v=>e.emit("dropdownBeforeShow",v),onBeforeHide:v=>e.emit("dropdownBeforeHide",v)},()=>i);return y}function Ct(e){if(e.caret)return e.buttons.value.filter(t=>!e.isViewingSource.value||t.find(o=>o.cmd==="viewsource")).map(t=>ae(t.map(o=>e.isViewingSource.value&&o.cmd!=="viewsource"?!1:o.type==="slot"?ge(e.slots[o.slot]):o.type==="dropdown"?St(e,o):Pe(e,o))))}function _t(e,t,o,l={}){const r=Object.keys(l);if(r.length===0)return{};const s={default_font:{cmd:"fontName",param:e,icon:o,tip:t}};return r.forEach(i=>{const f=l[i];s[i]={cmd:"fontName",param:f,icon:o,tip:f,htmlTip:`<font face="${f}">${f}</font>`}}),s}function Tt(e){if(e.caret){const t=e.props.toolbarColor||e.props.toolbarTextColor;let o=e.editLinkUrl.value;const l=()=>{e.caret.restore(),o!==e.editLinkUrl.value&&document.execCommand("createLink",!1,o===""?" ":o),e.editLinkUrl.value=null};return[g("div",{class:`q-mx-xs text-${t}`},`${e.$q.lang.editor.url}: `),g("input",{key:"qedt_btm_input",class:"col q-editor__link-input",value:o,onInput:r=>{ve(r),o=r.target.value},onKeydown:r=>{if(ye(r)!==!0)switch(r.keyCode){case 13:return ue(r),l();case 27:ue(r),e.caret.restore(),(!e.editLinkUrl.value||e.editLinkUrl.value==="https://")&&document.execCommand("unlink"),e.editLinkUrl.value=null;break}}}),ae([g(R,{key:"qedt_btm_rem",tabindex:-1,...e.buttonProps.value,label:e.$q.lang.label.remove,noCaps:!0,onClick:()=>{e.caret.restore(),document.execCommand("unlink"),e.editLinkUrl.value=null}}),g(R,{key:"qedt_btm_upd",...e.buttonProps.value,label:e.$q.lang.label.update,noCaps:!0,onClick:l})])]}}const Dt=Object.prototype.toString,te=Object.prototype.hasOwnProperty,Rt=new Set(["Boolean","Number","String","Function","Array","Date","RegExp"].map(e=>"[object "+e+"]"));function he(e){if(e!==Object(e)||Rt.has(Dt.call(e))===!0||e.constructor&&te.call(e,"constructor")===!1&&te.call(e.constructor.prototype,"isPrototypeOf")===!1)return!1;let t;for(t in e);return t===void 0||te.call(e,t)}function He(){let e,t,o,l,r,s,i=arguments[0]||{},f=1,m=!1;const y=arguments.length;for(typeof i=="boolean"&&(m=i,i=arguments[1]||{},f=2),Object(i)!==i&&typeof i!="function"&&(i={}),y===f&&(i=this,f--);f<y;f++)if((e=arguments[f])!==null)for(t in e)o=i[t],l=e[t],i!==l&&(m===!0&&l&&((r=Array.isArray(l))||he(l)===!0)?(r===!0?s=Array.isArray(o)===!0?o:[]:s=he(o)===!0?o:{},i[t]=He(m,s,l)):l!==void 0&&(i[t]=l));return i}var qt=ne({name:"QEditor",props:{...et,...dt,modelValue:{type:String,required:!0},readonly:Boolean,disable:Boolean,minHeight:{type:String,default:"10rem"},maxHeight:String,height:String,definitions:Object,fonts:Object,placeholder:String,toolbar:{type:Array,validator:e=>e.length===0||e.every(t=>t.length),default(){return[["left","center","right","justify"],["bold","italic","underline","strike"],["undo","redo"]]}},toolbarColor:String,toolbarBg:String,toolbarTextColor:String,toolbarToggleColor:{type:String,default:"primary"},toolbarOutline:Boolean,toolbarPush:Boolean,toolbarRounded:Boolean,paragraphTag:{type:String,validator:e=>["div","p"].includes(e),default:"div"},contentStyle:Object,contentClass:[Object,Array,String],square:Boolean,flat:Boolean,dense:Boolean},emits:[...ft,"update:modelValue","keydown","click","mouseup","keyup","touchend","focus","blur","dropdownShow","dropdownHide","dropdownBeforeShow","dropdownBeforeHide","linkShow","linkHide"],setup(e,{slots:t,emit:o,attrs:l}){const{proxy:r,vnode:s}=le(),{$q:i}=r,f=tt(e,i),{inFullscreen:m,toggleFullscreen:y}=ht(),v=ot(l,s),_=z(null),w=z(null),p=z(null),C=z(!1),h=x(()=>!e.readonly&&!e.disable);let S,k,q=e.modelValue;document.execCommand("defaultParagraphSeparator",!1,e.paragraphTag),S=window.getComputedStyle(document.body).fontFamily;const T=x(()=>e.toolbarBg?` bg-${e.toolbarBg}`:""),d=x(()=>{const n=e.toolbarOutline!==!0&&e.toolbarPush!==!0;return{type:"a",flat:n,noWrap:!0,outline:e.toolbarOutline,push:e.toolbarPush,rounded:e.toolbarRounded,dense:!0,color:e.toolbarColor,disable:!h.value,size:"sm"}}),N=x(()=>{const n=i.lang.editor,a=i.iconSet.editor;return{bold:{cmd:"bold",icon:a.bold,tip:n.bold,key:66},italic:{cmd:"italic",icon:a.italic,tip:n.italic,key:73},strike:{cmd:"strikeThrough",icon:a.strikethrough,tip:n.strikethrough,key:83},underline:{cmd:"underline",icon:a.underline,tip:n.underline,key:85},unordered:{cmd:"insertUnorderedList",icon:a.unorderedList,tip:n.unorderedList},ordered:{cmd:"insertOrderedList",icon:a.orderedList,tip:n.orderedList},subscript:{cmd:"subscript",icon:a.subscript,tip:n.subscript,htmlTip:"x<subscript>2</subscript>"},superscript:{cmd:"superscript",icon:a.superscript,tip:n.superscript,htmlTip:"x<superscript>2</superscript>"},link:{cmd:"link",disable:b=>b.caret&&!b.caret.can("link"),icon:a.hyperlink,tip:n.hyperlink,key:76},fullscreen:{cmd:"fullscreen",icon:a.toggleFullscreen,tip:n.toggleFullscreen,key:70},viewsource:{cmd:"viewsource",icon:a.viewSource,tip:n.viewSource},quote:{cmd:"formatBlock",param:"BLOCKQUOTE",icon:a.quote,tip:n.quote,key:81},left:{cmd:"justifyLeft",icon:a.left,tip:n.left},center:{cmd:"justifyCenter",icon:a.center,tip:n.center},right:{cmd:"justifyRight",icon:a.right,tip:n.right},justify:{cmd:"justifyFull",icon:a.justify,tip:n.justify},print:{type:"no-state",cmd:"print",icon:a.print,tip:n.print,key:80},outdent:{type:"no-state",disable:b=>b.caret&&!b.caret.can("outdent"),cmd:"outdent",icon:a.outdent,tip:n.outdent},indent:{type:"no-state",disable:b=>b.caret&&!b.caret.can("indent"),cmd:"indent",icon:a.indent,tip:n.indent},removeFormat:{type:"no-state",cmd:"removeFormat",icon:a.removeFormat,tip:n.removeFormat},hr:{type:"no-state",cmd:"insertHorizontalRule",icon:a.hr,tip:n.hr},undo:{type:"no-state",cmd:"undo",icon:a.undo,tip:n.undo,key:90},redo:{type:"no-state",cmd:"redo",icon:a.redo,tip:n.redo,key:89},h1:{cmd:"formatBlock",param:"H1",icon:a.heading1||a.heading,tip:n.heading1,htmlTip:`<h1 class="q-ma-none">${n.heading1}</h1>`},h2:{cmd:"formatBlock",param:"H2",icon:a.heading2||a.heading,tip:n.heading2,htmlTip:`<h2 class="q-ma-none">${n.heading2}</h2>`},h3:{cmd:"formatBlock",param:"H3",icon:a.heading3||a.heading,tip:n.heading3,htmlTip:`<h3 class="q-ma-none">${n.heading3}</h3>`},h4:{cmd:"formatBlock",param:"H4",icon:a.heading4||a.heading,tip:n.heading4,htmlTip:`<h4 class="q-ma-none">${n.heading4}</h4>`},h5:{cmd:"formatBlock",param:"H5",icon:a.heading5||a.heading,tip:n.heading5,htmlTip:`<h5 class="q-ma-none">${n.heading5}</h5>`},h6:{cmd:"formatBlock",param:"H6",icon:a.heading6||a.heading,tip:n.heading6,htmlTip:`<h6 class="q-ma-none">${n.heading6}</h6>`},p:{cmd:"formatBlock",param:e.paragraphTag,icon:a.heading,tip:n.paragraph},code:{cmd:"formatBlock",param:"PRE",icon:a.code,htmlTip:`<code>${n.code}</code>`},"size-1":{cmd:"fontSize",param:"1",icon:a.size1||a.size,tip:n.size1,htmlTip:`<font size="1">${n.size1}</font>`},"size-2":{cmd:"fontSize",param:"2",icon:a.size2||a.size,tip:n.size2,htmlTip:`<font size="2">${n.size2}</font>`},"size-3":{cmd:"fontSize",param:"3",icon:a.size3||a.size,tip:n.size3,htmlTip:`<font size="3">${n.size3}</font>`},"size-4":{cmd:"fontSize",param:"4",icon:a.size4||a.size,tip:n.size4,htmlTip:`<font size="4">${n.size4}</font>`},"size-5":{cmd:"fontSize",param:"5",icon:a.size5||a.size,tip:n.size5,htmlTip:`<font size="5">${n.size5}</font>`},"size-6":{cmd:"fontSize",param:"6",icon:a.size6||a.size,tip:n.size6,htmlTip:`<font size="6">${n.size6}</font>`},"size-7":{cmd:"fontSize",param:"7",icon:a.size7||a.size,tip:n.size7,htmlTip:`<font size="7">${n.size7}</font>`}}}),ie=x(()=>{const n=e.definitions||{},a=e.definitions||e.fonts?He(!0,{},N.value,n,_t(S,i.lang.editor.defaultFont,i.iconSet.editor.font,e.fonts)):N.value;return e.toolbar.map(b=>b.map(D=>{if(D.options)return{type:"dropdown",icon:D.icon,label:D.label,size:"sm",dense:!0,fixedLabel:D.fixedLabel,fixedIcon:D.fixedIcon,highlight:D.highlight,list:D.list,options:D.options.map(Ye=>a[Ye])};const I=a[D];return I?I.type==="no-state"||n[D]&&(I.cmd===void 0||N.value[I.cmd]&&N.value[I.cmd].type==="no-state")?I:Object.assign({type:"toggle"},I):{type:"slot",slot:D}}))}),P={$q:i,props:e,slots:t,emit:o,inFullscreen:m,toggleFullscreen:y,runCmd:J,isViewingSource:C,editLinkUrl:p,toolbarBackgroundClass:T,buttonProps:d,contentRef:w,buttons:ie,setContent:X};K(()=>e.modelValue,n=>{q!==n&&(q=n,X(n,!0))}),K(p,n=>{o(`link${n?"Show":"Hide"}`)});const Le=x(()=>e.toolbar&&e.toolbar.length!==0),Ae=x(()=>{const n={},a=b=>{b.key&&(n[b.key]={cmd:b.cmd,param:b.param})};return ie.value.forEach(b=>{b.forEach(D=>{D.options?D.options.forEach(a):a(D)})}),n}),Ie=x(()=>m.value?e.contentStyle:[{minHeight:e.minHeight,height:e.height,maxHeight:e.maxHeight},e.contentStyle]),$e=x(()=>`q-editor q-editor--${C.value===!0?"source":"default"}`+(e.disable===!0?" disabled":"")+(m.value===!0?" fullscreen column":"")+(e.square===!0?" q-editor--square no-border-radius":"")+(e.flat===!0?" q-editor--flat":"")+(e.dense===!0?" q-editor--dense":"")+(f.value===!0?" q-editor--dark q-dark":"")),Fe=x(()=>[e.contentClass,"q-editor__content",{col:m.value,"overflow-auto":m.value||e.maxHeight}]),Ee=x(()=>e.disable===!0?{"aria-disabled":"true"}:{});function Ne(){if(w.value!==null){const n=`inner${C.value===!0?"Text":"HTML"}`,a=w.value[n];a!==e.modelValue&&(q=a,o("update:modelValue",a))}}function Me(n){if(o("keydown",n),n.ctrlKey!==!0||ye(n)===!0){$();return}const a=n.keyCode,b=Ae.value[a];if(b!==void 0){const{cmd:D,param:I}=b;lt(n),J(D,I,!1)}}function Ve(n){$(),o("click",n)}function Ue(n){if(w.value!==null){const{scrollTop:a,scrollHeight:b}=w.value;k=b-a}P.caret.save(),o("blur",n)}function Qe(n){be(()=>{w.value!==null&&k!==void 0&&(w.value.scrollTop=w.value.scrollHeight-k)}),o("focus",n)}function je(n){const a=_.value;if(a!==null&&a.contains(n.target)===!0&&(n.relatedTarget===null||a.contains(n.relatedTarget)!==!0)){const b=`inner${C.value===!0?"Text":"HTML"}`;P.caret.restorePosition(w.value[b].length),$()}}function Ke(n){const a=_.value;a!==null&&a.contains(n.target)===!0&&(n.relatedTarget===null||a.contains(n.relatedTarget)!==!0)&&(P.caret.savePosition(),$())}function re(){k=void 0}function se(n){P.caret.save()}function X(n,a){if(w.value!==null){a===!0&&P.caret.savePosition();const b=`inner${C.value===!0?"Text":"HTML"}`;w.value[b]=n,a===!0&&(P.caret.restorePosition(w.value[b].length),$())}}function J(n,a,b=!0){Z(),P.caret.restore(),P.caret.apply(n,a,()=>{Z(),P.caret.save(),b&&$()})}function $(){setTimeout(()=>{p.value=null,r.$forceUpdate()},1)}function Z(){at(()=>{w.value!==null&&w.value.focus({preventScroll:!0})})}function We(){return w.value}return G(()=>{P.caret=r.caret=new yt(w.value,P),X(e.modelValue),$(),document.addEventListener("selectionchange",se)}),nt(()=>{document.removeEventListener("selectionchange",se)}),Object.assign(r,{runCmd:J,refreshToolbar:$,focus:Z,getContentEl:We}),()=>{let n;if(Le.value){const a=[g("div",{key:"qedt_top",class:"q-editor__toolbar row no-wrap scroll-x"+T.value},Ct(P))];p.value!==null&&a.push(g("div",{key:"qedt_btm",class:"q-editor__toolbar row no-wrap items-center scroll-x"+T.value},Tt(P))),n=g("div",{key:"toolbar_ctainer",class:"q-editor__toolbars-container"},a)}return g("div",{ref:_,class:$e.value,style:{height:m.value===!0?"100%":null},...Ee.value,onFocusin:je,onFocusout:Ke},[n,g("div",{ref:w,style:Ie.value,class:Fe.value,contenteditable:h.value,placeholder:e.placeholder,...v.listeners.value,onInput:Ne,onKeydown:Me,onClick:Ve,onBlur:Ue,onFocus:Qe,onMousedown:re,onTouchstartPassive:re})])}}});function Q(e,t=new WeakMap){if(Object(e)!==e)return e;if(t.has(e))return t.get(e);const o=e instanceof Date?new Date(e):e instanceof RegExp?new RegExp(e.source,e.flags):e instanceof Set?new Set:e instanceof Map?new Map:typeof e.constructor!="function"?Object.create(null):e.prototype!==void 0&&typeof e.prototype.constructor=="function"?e:new e.constructor;if(typeof e.constructor=="function"&&typeof e.valueOf=="function"){const l=e.valueOf();if(Object(l)!==l){const r=new e.constructor(l);return t.set(e,r),r}}return t.set(e,o),e instanceof Set?e.forEach(l=>{o.add(Q(l,t))}):e instanceof Map&&e.forEach((l,r)=>{o.set(r,Q(l,t))}),Object.assign(o,...Object.keys(e).map(l=>({[l]:Q(e[l],t)})))}var xt=ne({name:"QPopupEdit",props:{modelValue:{required:!0},title:String,buttons:Boolean,labelSet:String,labelCancel:String,color:{type:String,default:"primary"},validate:{type:Function,default:()=>!0},autoSave:Boolean,cover:{type:Boolean,default:!0},disable:Boolean},emits:["update:modelValue","save","cancel","beforeShow","show","beforeHide","hide"],setup(e,{slots:t,emit:o}){const{proxy:l}=le(),{$q:r}=l,s=z(null),i=z(""),f=z("");let m=!1;const y=x(()=>it({initialValue:i.value,validate:e.validate,set:v,cancel:_,updatePosition:w},"value",()=>f.value,d=>{f.value=d}));function v(){e.validate(f.value)!==!1&&(p()===!0&&(o("save",f.value,i.value),o("update:modelValue",f.value)),C())}function _(){p()===!0&&o("cancel",f.value,i.value),C()}function w(){be(()=>{s.value.updatePosition()})}function p(){return rt(f.value,i.value)===!1}function C(){m=!0,s.value.hide()}function h(){m=!1,i.value=Q(e.modelValue),f.value=Q(e.modelValue),o("beforeShow")}function S(){o("show")}function k(){m===!1&&p()===!0&&(e.autoSave===!0&&e.validate(f.value)===!0?(o("save",f.value,i.value),o("update:modelValue",f.value)):o("cancel",f.value,i.value)),o("beforeHide")}function q(){o("hide")}function T(){const d=t.default!==void 0?[].concat(t.default(y.value)):[];return e.title&&d.unshift(g("div",{class:"q-dialog__title q-mt-sm q-mb-sm"},e.title)),e.buttons===!0&&d.push(g("div",{class:"q-popup-edit__buttons row justify-center no-wrap"},[g(R,{flat:!0,color:e.color,label:e.labelCancel||r.lang.label.cancel,onClick:_}),g(R,{flat:!0,color:e.color,label:e.labelSet||r.lang.label.set,onClick:v})])),d}return Object.assign(l,{set:v,cancel:_,show(d){s.value!==null&&s.value.show(d)},hide(d){s.value!==null&&s.value.hide(d)},updatePosition:w}),()=>{if(e.disable!==!0)return g(De,{ref:s,class:"q-popup-edit",cover:e.cover,onBeforeShow:h,onShow:S,onBeforeHide:k,onHide:q,onEscapeKey:_},T)}}});const Bt={class:"row"},Ot=V("div",{class:"col"},[V("div",{class:"text-h6"},"Update Used Item")],-1),zt={key:0,class:"col text-right"},Pt={__name:"serviceOprItemAdd",props:{mode:String,dataItem:Array},setup(e){const{dialogRef:t,onDialogHide:o,onDialogOK:l,onDialogCancel:r}=Re(),s=qe(),i=e;G(()=>{i.dataItem.listFixDet&&(m.value=i.dataItem.listFixDet)});const f=z([]),m=z([]),y=z(!1),v=()=>{m.value.push({TSRVD_ID:i.dataItem.id,TSRVF_ITMCD:"",TSRVF_PRC:0,TSRVF_QTY:1})},_=(h,S,k,q)=>{S(async()=>{q==="item"&&await w(h)})},w=async h=>{y.value=!0,await oe.post("item/searchAPITBL",{searchValue:h}).then(S=>{y.value=!1,f.value=S.data.data}).catch(()=>{y.value=!1})},p=()=>{i.mode==="view"?l(m.value):s.dialog({title:"Confirmation",message:"Are you sure want to save this items ?",cancel:!0,persistent:!0}).onOk(async()=>{l(m.value)})},C=h=>{s.dialog({title:"Confirmation",message:`Do you want to delete this lines no ${h+1} ?`,cancel:!0,persistent:!0}).onOk(async()=>{m.value.splice(h,1)})};return(h,S)=>(B(),A(Te,{ref_key:"dialogRef",ref:t,onHide:H(o),"transition-show":"slide-up","transition-hide":"slide-down","full-width":""},{default:u(()=>[c(we,{class:"q-dialog-plugin bg-white q-pa-sm"},{default:u(()=>[c(W,null,{default:u(()=>[V("div",Bt,[Ot,i.mode!=="view"?(B(),U("div",zt,[c(R,{icon:"add",outline:"",color:"blue",onClick:v})])):E("",!0)])]),_:1}),c(W,{class:"q-pa-sm",style:{"max-height":"50vh"}},{default:u(()=>[c(xe,{bordered:""},{default:u(()=>[m.value.length===0?ce((B(),A(Y,{key:0,class:"q-my-sm",clickable:""},{default:u(()=>[c(O,null,{default:u(()=>[L(" No items added ")]),_:1})]),_:1})),[[de]]):E("",!0),(B(!0),U(ke,null,Se(m.value,(k,q)=>ce((B(),A(Y,{key:q,class:"q-my-sm",clickable:""},{default:u(()=>[c(O,{avatar:""},{default:u(()=>[c(Ce,{color:"primary","text-color":"white"},{default:u(()=>[L(M(q+1),1)]),_:2},1024)]),_:2},1024),c(O,null,{default:u(()=>[c(F,null,{default:u(()=>[c(mt,{dense:"",filled:"",label:"Item Name",modelValue:k.TSRVF_ITMCD,"onUpdate:modelValue":T=>k.TSRVF_ITMCD=T,"use-input":"","input-debounce":"500",options:f.value,onFilter:S[0]||(S[0]=(T,d,N)=>_(T,d,N,"item")),behavior:"dialog","option-label":"MITM_ITMNM","option-value":"MITM_ITMCD","emit-value":"","map-options":"",loading:y.value,readonly:i.mode==="view"},null,8,["modelValue","onUpdate:modelValue","options","loading","readonly"])]),_:2},1024)]),_:2},1024),c(O,null,{default:u(()=>[c(fe,{label:"Price",modelValue:k.TSRVF_PRC,"onUpdate:modelValue":T=>k.TSRVF_PRC=T,filled:"",dense:"",readonly:i.mode==="view"},null,8,["modelValue","onUpdate:modelValue","readonly"])]),_:2},1024),c(O,null,{default:u(()=>[c(fe,{label:"Qty",modelValue:k.TSRVF_QTY,"onUpdate:modelValue":T=>k.TSRVF_QTY=T,filled:"",dense:"",readonly:i.mode==="view"},null,8,["modelValue","onUpdate:modelValue","readonly"])]),_:2},1024),e.mode!=="view"?(B(),A(O,{key:0,side:""},{default:u(()=>[c(R,{icon:"delete",flat:"",color:"red",onClick:T=>C(q)},null,8,["onClick"])]),_:2},1024)):E("",!0)]),_:2},1024)),[[de]])),128))]),_:1})]),_:1}),c(_e,{align:"right"},{default:u(()=>[c(R,{label:"OK",color:"primary",onClick:S[1]||(S[1]=k=>p()),disable:y.value,loading:y.value},null,8,["disable","loading"]),c(R,{flat:"",label:"Cancel",color:"red",onClick:H(r),loading:y.value},null,8,["onClick","loading"])]),_:1})]),_:1})]),_:1},8,["onHide"]))}},Ht={class:"text-h6"},Lt={class:"cursor-pointer"},At={key:0},It={key:1},$t=["innerHTML"],Qt={__name:"serviceOprUpdateOrder",props:{header:Array,detail:Array,mode:String},setup(e){const{dialogRef:t,onDialogHide:o,onDialogOK:l,onDialogCancel:r}=Re(),s=qe(),i=e,f=z({SRVH_DOCNO:"",SRVH_ISSDT:gt.formatDate(Date.now(),"YYYY-MM-DD"),SRVH_CUSCD:""}),m=z([]),y=z(!1);G(async()=>{i.header&&(f.value=i.header,m.value=i.detail)});const v=(p,C="add")=>{s.dialog({component:Pt,componentProps:{mode:C,dataItem:m.value[p]}}).onOk(async h=>{m.value[p].TSRVD_FLGSTS=1,m.value[p].listFixDet=h})},_=()=>{i.mode==="view"?l():s.dialog({title:"Confirmation",message:"Do you want to submit this data ?",cancel:!0,persistent:!0}).onOk(async()=>{y.value=!0,await oe.post("servicesOPR",{data:m.value}).then(p=>{y.value=!1,l()})})},w=p=>{s.dialog({title:"Confirmation",message:"Do you want to mark this problem as done ?",cancel:!0,persistent:!0}).onOk(async()=>{y.value=!0,await oe.put(`servicesAdmin/${btoa(val.SRVH_DOCNO)}`,{TSRVD_FLGSTS:3}).then(C=>{y.value=!1}).catch(C=>{y.value=!1})})};return(p,C)=>(B(),A(Te,{ref_key:"dialogRef",ref:t,onHide:H(o),"transition-show":"slide-up","transition-hide":"slide-down","full-width":""},{default:u(()=>[c(we,{class:"q-dialog-plugin bg-white q-pa-sm"},{default:u(()=>[c(W,null,{default:u(()=>[V("div",Ht,"Update Order "+M(f.value.SRVH_DOCNO),1)]),_:1}),c(W,{class:"q-pa-sm"},{default:u(()=>[c(xe,{bordered:""},{default:u(()=>[(B(!0),U(ke,null,Se(m.value,(h,S)=>(B(),A(Y,{key:S,class:st("q-my-sm")},{default:u(()=>[c(O,{avatar:""},{default:u(()=>[c(Ce,{color:h.TSRVD_FLGSTS===0?"red":"primary","text-color":"white"},{default:u(()=>[L(M(h.TSRVD_LINE),1)]),_:2},1032,["color"])]),_:2},1024),c(O,null,{default:u(()=>[c(F,null,{default:u(()=>[L(M(h.TSRVD_ITMCD),1)]),_:2},1024),c(F,{caption:"",lines:"1"},{default:u(()=>[L("Item")]),_:1})]),_:2},1024),c(O,null,{default:u(()=>[c(F,null,{default:u(()=>[L(M(h.TSRVD_CUSTRMK),1)]),_:2},1024),c(F,{caption:"",lines:"1"},{default:u(()=>[L("Customer Remarks")]),_:1})]),_:2},1024),c(O,null,{default:u(()=>[c(F,null,{default:u(()=>[V("div",Lt,[h.TSRVD_REMARK?(B(),U("span",It,[V("div",{innerHTML:h.TSRVD_REMARK},null,8,$t)])):(B(),U("span",At," No comment yet !, Click here to add comment. ")),i.mode!=="view"?(B(),A(xt,{key:2,modelValue:h.TSRVD_REMARK,"onUpdate:modelValue":k=>h.TSRVD_REMARK=k,"auto-save":""},{default:u(k=>[c(qt,{onKeyup:ut(k.set,["enter"]),modelValue:k.value,"onUpdate:modelValue":q=>k.value=q,dense:H(s).screen.lt.md,toolbar:[[{label:H(s).lang.editor.align,icon:H(s).iconSet.editor.align,fixedLabel:!0,options:["left","center","right","justify"]}],["bold","italic","strike","underline","subscript","superscript"],["token","hr","link","custom_btn"],["print","fullscreen"],[{label:H(s).lang.editor.formatting,icon:H(s).iconSet.editor.formatting,list:"no-icons",options:["p","h1","h2","h3","h4","h5","h6","code"]},{label:H(s).lang.editor.fontSize,icon:H(s).iconSet.editor.fontSize,fixedLabel:!0,fixedIcon:!0,list:"no-icons",options:["size-1","size-2","size-3","size-4","size-5","size-6","size-7"]},{label:H(s).lang.editor.defaultFont,icon:H(s).iconSet.editor.font,fixedIcon:!0,list:"no-icons",options:["default_font","arial","arial_black","comic_sans","courier_new","impact","lucida_grande","times_new_roman","verdana"]},"removeFormat"],["quote","unordered","ordered","outdent","indent"],["undo","redo"],["viewsource"]],fonts:{arial:"Arial",arial_black:"Arial Black",comic_sans:"Comic Sans MS",courier_new:"Courier New",impact:"Impact",lucida_grande:"Lucida Grande",times_new_roman:"Times New Roman",verdana:"Verdana"}},null,8,["onKeyup","modelValue","onUpdate:modelValue","dense","toolbar"])]),_:2},1032,["modelValue","onUpdate:modelValue"])):E("",!0)])]),_:2},1024),c(F,{caption:"",lines:"1"},{default:u(()=>[L("Operator Remarks")]),_:1})]),_:2},1024),i.mode==="edit"?(B(),A(O,{key:0,side:""},{default:u(()=>[c(R,{icon:"construction",color:"green",flat:"",onClick:k=>v(S,"add")},{default:u(()=>[c(j,null,{default:u(()=>[L("Update Fix Data")]),_:1})]),_:2},1032,["onClick"])]),_:2},1024)):E("",!0),c(O,{side:""},{default:u(()=>[c(R,{icon:"visibility",color:"cyan",flat:"",onClick:k=>v(S,"view"),disable:!h.listFixDet},{default:u(()=>[c(j,null,{default:u(()=>[L("View Added Item")]),_:1}),h.listFixDet.length>0?(B(),A(pt,{key:0,color:"red",floating:""},{default:u(()=>[L(M(h.listFixDet.length),1)]),_:2},1024)):E("",!0)]),_:2},1032,["onClick","disable"])]),_:2},1024),i.mode==="approve"?(B(),A(O,{key:1,side:""},{default:u(()=>[c(R,{icon:"task",color:"indigo",flat:"",onClick:k=>w(S)},{default:u(()=>[c(j,null,{default:u(()=>[L("Mark this problem as done")]),_:1})]),_:2},1032,["onClick"])]),_:2},1024)):E("",!0)]),_:2},1024))),128))]),_:1})]),_:1}),c(_e,{align:"right"},{default:u(()=>[c(R,{label:"OK",color:"primary",onClick:C[0]||(C[0]=h=>_()),disable:y.value||m.value.filter(h=>h.listFixDet).length===0||m.value.filter(h=>h.TSRVD_REMARK).length===0,loading:y.value},null,8,["disable","loading"]),c(R,{flat:"",label:"Cancel",color:"red",onClick:H(r),loading:y.value},null,8,["onClick","loading"])]),_:1})]),_:1})]),_:1},8,["onHide"]))}};export{Qt as _};
