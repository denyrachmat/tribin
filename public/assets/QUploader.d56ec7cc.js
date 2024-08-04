import{az as me,c as ne,aA as ge,a as _,h as s,aP as _e,g as Y,t as z,aX as ie,ac as se,am as he,ad as be,af as Fe,be as ye,p as Se,bg as qe,w as xe,j as ke,bh as ze,aH as we,aG as Ue,a_ as le,av as Ce,Q as re,aF as Be}from"./index.647454e3.js";import{i as Pe,j as ue}from"./format.cd3c1f7f.js";import{g as Re}from"./use-dialog-plugin-component.60d6770e.js";const je={...me,min:{type:Number,default:0},max:{type:Number,default:100},color:String,centerColor:String,trackColor:String,fontSize:String,rounded:Boolean,thickness:{type:Number,default:.2,validator:a=>a>=0&&a<=1},angle:{type:Number,default:0},showValue:Boolean,reverse:Boolean,instantFeedback:Boolean},G=50,de=2*G,ce=de*Math.PI,Ee=Math.round(ce*1e3)/1e3;var Le=ne({name:"QCircularProgress",props:{...je,value:{type:Number,default:0},animationSpeed:{type:[String,Number],default:600},indeterminate:Boolean},setup(a,{slots:h}){const{proxy:{$q:o}}=Y(),r=ge(a),u=_(()=>{const m=(o.lang.rtl===!0?-1:1)*a.angle;return{transform:a.reverse!==(o.lang.rtl===!0)?`scale3d(-1, 1, 1) rotate3d(0, 0, 1, ${-90-m}deg)`:`rotate3d(0, 0, 1, ${m-90}deg)`}}),p=_(()=>a.instantFeedback!==!0&&a.indeterminate!==!0?{transition:`stroke-dashoffset ${a.animationSpeed}ms ease 0s, stroke ${a.animationSpeed}ms ease`}:""),F=_(()=>de/(1-a.thickness/2)),w=_(()=>`${F.value/2} ${F.value/2} ${F.value} ${F.value}`),U=_(()=>Pe(a.value,a.min,a.max)),P=_(()=>a.max-a.min),x=_(()=>a.thickness/2*F.value),j=_(()=>{const m=(a.max-U.value)/P.value,e=a.rounded===!0&&U.value<a.max&&m<.25?x.value/2*(1-m/.25):0;return ce*m+e});function C({thickness:m,offset:e,color:f,cls:k,rounded:d}){return s("circle",{class:"q-circular-progress__"+k+(f!==void 0?` text-${f}`:""),style:p.value,fill:"transparent",stroke:"currentColor","stroke-width":m,"stroke-dasharray":Ee,"stroke-dashoffset":e,"stroke-linecap":d,cx:F.value,cy:F.value,r:G})}return()=>{const m=[];a.centerColor!==void 0&&a.centerColor!=="transparent"&&m.push(s("circle",{class:`q-circular-progress__center text-${a.centerColor}`,fill:"currentColor",r:G-x.value/2,cx:F.value,cy:F.value})),a.trackColor!==void 0&&a.trackColor!=="transparent"&&m.push(C({cls:"track",thickness:x.value,offset:0,color:a.trackColor})),m.push(C({cls:"circle",thickness:x.value,offset:j.value,color:a.color,rounded:a.rounded===!0?"round":void 0}));const e=[s("svg",{class:"q-circular-progress__svg",style:u.value,viewBox:w.value,"aria-hidden":"true"},m)];return a.showValue===!0&&e.push(s("div",{class:"q-circular-progress__text absolute-full row flex-center content-center",style:{fontSize:a.fontSize}},h.default!==void 0?h.default():[s("div",U.value)])),s("div",{class:`q-circular-progress q-circular-progress--${a.indeterminate===!0?"in":""}determinate`,style:r.value,role:"progressbar","aria-valuemin":a.min,"aria-valuemax":a.max,"aria-valuenow":a.indeterminate===!0?void 0:U.value},_e(h.internal,e))}}});function Q(a,h,o,r){const u=[];return a.forEach(p=>{r(p)===!0?u.push(p):h.push({failedPropValidation:o,file:p})}),u}function H(a){a&&a.dataTransfer&&(a.dataTransfer.dropEffect="copy"),se(a)}const Ne={multiple:Boolean,accept:String,capture:String,maxFileSize:[Number,String],maxTotalSize:[Number,String],maxFiles:[Number,String],filter:Function},$e=["rejected"];function Ae({editable:a,dnd:h,getFileInput:o,addFilesToQueue:r}){const{props:u,emit:p,proxy:F}=Y(),w=z(null),U=_(()=>u.accept!==void 0?u.accept.split(",").map(l=>(l=l.trim(),l==="*"?"*/":(l.endsWith("/*")&&(l=l.slice(0,l.length-1)),l.toUpperCase()))):null),P=_(()=>parseInt(u.maxFiles,10)),x=_(()=>parseInt(u.maxTotalSize,10));function j(l){if(a.value)if(l!==Object(l)&&(l={target:null}),l.target!==null&&l.target.matches('input[type="file"]')===!0)l.clientX===0&&l.clientY===0&&ie(l);else{const S=o();S&&S!==l.target&&S.click(l)}}function C(l){a.value&&l&&r(null,l)}function m(l,S,$,A){let i=Array.from(S||l.target.files);const g=[],B=()=>{g.length!==0&&p("rejected",g)};if(u.accept!==void 0&&U.value.indexOf("*/")===-1&&(i=Q(i,g,"accept",c=>U.value.some(b=>c.type.toUpperCase().startsWith(b)||c.name.toUpperCase().endsWith(b))),i.length===0))return B();if(u.maxFileSize!==void 0){const c=parseInt(u.maxFileSize,10);if(i=Q(i,g,"max-file-size",b=>b.size<=c),i.length===0)return B()}if(u.multiple!==!0&&i.length!==0&&(i=[i[0]]),i.forEach(c=>{c.__key=c.webkitRelativePath+c.lastModified+c.name+c.size}),A===!0){const c=$.map(b=>b.__key);i=Q(i,g,"duplicate",b=>c.includes(b.__key)===!1)}if(i.length===0)return B();if(u.maxTotalSize!==void 0){let c=A===!0?$.reduce((b,E)=>b+E.size,0):0;if(i=Q(i,g,"max-total-size",b=>(c+=b.size,c<=x.value)),i.length===0)return B()}if(typeof u.filter=="function"){const c=u.filter(i);i=Q(i,g,"filter",b=>c.includes(b))}if(u.maxFiles!==void 0){let c=A===!0?$.length:0;if(i=Q(i,g,"max-files",()=>(c++,c<=P.value)),i.length===0)return B()}if(B(),i.length!==0)return i}function e(l){H(l),h.value!==!0&&(h.value=!0)}function f(l){se(l),(l.relatedTarget!==null||he.is.safari!==!0?l.relatedTarget!==w.value:document.elementsFromPoint(l.clientX,l.clientY).includes(w.value)===!1)===!0&&(h.value=!1)}function k(l){H(l);const S=l.dataTransfer.files;S.length!==0&&r(null,S),h.value=!1}function d(l){if(h.value===!0)return s("div",{ref:w,class:`q-${l}__dnd absolute-full`,onDragenter:H,onDragover:H,onDragleave:f,onDrop:k})}return Object.assign(F,{pickFiles:j,addFiles:C}),{pickFiles:j,addFiles:C,onDragover:e,onDragleave:f,processFiles:m,getDndNode:d,maxFilesNumber:P,maxTotalSizeNumber:x}}function oe(a){return(a*100).toFixed(2)+"%"}const De={...be,...Ne,label:String,color:String,textColor:String,square:Boolean,flat:Boolean,bordered:Boolean,noThumbnails:Boolean,autoUpload:Boolean,hideUploadBtn:Boolean,disable:Boolean,readonly:Boolean},ve=[...$e,"start","finish","added","removed"];function Oe(a,h){const o=Y(),{props:r,slots:u,emit:p,proxy:F}=o,{$q:w}=F,U=Fe(r,w);function P(t,v,y){if(t.__status=v,v==="idle"){t.__uploaded=0,t.__progress=0,t.__sizeLabel=ue(t.size),t.__progressLabel="0.00%";return}if(v==="failed"){F.$forceUpdate();return}t.__uploaded=v==="uploaded"?t.size:y,t.__progress=v==="uploaded"?1:Math.min(.9999,t.__uploaded/t.size),t.__progressLabel=oe(t.__progress),F.$forceUpdate()}const x=_(()=>r.disable!==!0&&r.readonly!==!0),j=z(!1),C=z(null),m=z(null),e={files:z([]),queuedFiles:z([]),uploadedFiles:z([]),uploadedSize:z(0),updateFileStatus:P,isAlive:()=>ye(o)===!1},{pickFiles:f,addFiles:k,onDragover:d,onDragleave:l,processFiles:S,getDndNode:$,maxFilesNumber:A,maxTotalSizeNumber:i}=Ae({editable:x,dnd:j,getFileInput:V,addFilesToQueue:Z});Object.assign(e,a({props:r,slots:u,emit:p,helpers:e,exposeApi:t=>{Object.assign(e,t)}})),e.isBusy===void 0&&(e.isBusy=z(!1));const g=z(0),B=_(()=>g.value===0?0:e.uploadedSize.value/g.value),c=_(()=>oe(B.value)),b=_(()=>ue(g.value)),E=_(()=>x.value===!0&&e.isUploading.value!==!0&&(r.multiple===!0||e.queuedFiles.value.length===0)&&(r.maxFiles===void 0||e.files.value.length<A.value)&&(r.maxTotalSize===void 0||g.value<i.value)),n=_(()=>x.value===!0&&e.isBusy.value!==!0&&e.isUploading.value!==!0&&e.queuedFiles.value.length!==0);Se(qe,ae);const D=_(()=>"q-uploader column no-wrap"+(U.value===!0?" q-uploader--dark q-dark":"")+(r.bordered===!0?" q-uploader--bordered":"")+(r.square===!0?" q-uploader--square no-border-radius":"")+(r.flat===!0?" q-uploader--flat no-shadow":"")+(r.disable===!0?" disabled q-uploader--disable":"")+(j.value===!0?" q-uploader--dnd":"")),O=_(()=>"q-uploader__header"+(r.color!==void 0?` bg-${r.color}`:"")+(r.textColor!==void 0?` text-${r.textColor}`:""));xe(e.isUploading,(t,v)=>{v===!1&&t===!0?p("start"):v===!0&&t===!1&&p("finish")});function T(){r.disable===!1&&(e.abort(),e.uploadedSize.value=0,g.value=0,J(),e.files.value=[],e.queuedFiles.value=[],e.uploadedFiles.value=[])}function R(){r.disable===!1&&K(["uploaded"],()=>{e.uploadedFiles.value=[]})}function W(){K(["idle","failed"],({size:t})=>{g.value-=t,e.queuedFiles.value=[]})}function K(t,v){if(r.disable===!0)return;const y={files:[],size:0},L=e.files.value.filter(q=>t.indexOf(q.__status)===-1?!0:(y.size+=q.size,y.files.push(q),q.__img!==void 0&&window.URL.revokeObjectURL(q.__img.src),!1));y.files.length!==0&&(e.files.value=L,v(y),p("removed",y.files))}function X(t){r.disable||(t.__status==="uploaded"?e.uploadedFiles.value=e.uploadedFiles.value.filter(v=>v.__key!==t.__key):t.__status==="uploading"?t.__abort():g.value-=t.size,e.files.value=e.files.value.filter(v=>v.__key!==t.__key?!0:(v.__img!==void 0&&window.URL.revokeObjectURL(v.__img.src),!1)),e.queuedFiles.value=e.queuedFiles.value.filter(v=>v.__key!==t.__key),p("removed",[t]))}function J(){e.files.value.forEach(t=>{t.__img!==void 0&&window.URL.revokeObjectURL(t.__img.src)})}function V(){return m.value||C.value.getElementsByClassName("q-uploader__input")[0]}function Z(t,v){const y=S(t,v,e.files.value,!0),L=V();L!=null&&(L.value=""),y!==void 0&&(y.forEach(q=>{if(e.updateFileStatus(q,"idle"),g.value+=q.size,r.noThumbnails!==!0&&q.type.toUpperCase().startsWith("IMAGE")){const te=new Image;te.src=window.URL.createObjectURL(q),q.__img=te}}),e.files.value=e.files.value.concat(y),e.queuedFiles.value=e.queuedFiles.value.concat(y),p("added",y),r.autoUpload===!0&&e.upload())}function ee(){n.value===!0&&e.upload()}function M(t,v,y){if(t===!0){const L={type:"a",key:v,icon:w.iconSet.uploader[v],flat:!0,dense:!0};let q;return v==="add"?(L.onClick=f,q=ae):L.onClick=y,s(re,L,q)}}function ae(){return s("input",{ref:m,class:"q-uploader__input overflow-hidden absolute-full",tabindex:-1,type:"file",title:"",accept:r.accept,multiple:r.multiple===!0?"multiple":void 0,capture:r.capture,onMousedown:ie,onClick:f,onChange:Z})}function fe(){return u.header!==void 0?u.header(I):[s("div",{class:"q-uploader__header-content column"},[s("div",{class:"flex flex-center no-wrap q-gutter-xs"},[M(e.queuedFiles.value.length!==0,"removeQueue",W),M(e.uploadedFiles.value.length!==0,"removeUploaded",R),e.isUploading.value===!0?s(le,{class:"q-uploader__spinner"}):null,s("div",{class:"col column justify-center"},[r.label!==void 0?s("div",{class:"q-uploader__title"},[r.label]):null,s("div",{class:"q-uploader__subtitle"},[b.value+" / "+c.value])]),M(E.value,"add"),M(r.hideUploadBtn===!1&&n.value===!0,"upload",e.upload),M(e.isUploading.value,"clear",e.abort)])])]}function pe(){return u.list!==void 0?u.list(I):e.files.value.map(t=>s("div",{key:t.__key,class:"q-uploader__file relative-position"+(r.noThumbnails!==!0&&t.__img!==void 0?" q-uploader__file--img":"")+(t.__status==="failed"?" q-uploader__file--failed":t.__status==="uploaded"?" q-uploader__file--uploaded":""),style:r.noThumbnails!==!0&&t.__img!==void 0?{backgroundImage:'url("'+t.__img.src+'")'}:null},[s("div",{class:"q-uploader__file-header row flex-center no-wrap"},[t.__status==="failed"?s(Ce,{class:"q-uploader__file-status",name:w.iconSet.type.negative,color:"negative"}):null,s("div",{class:"q-uploader__file-header-content col"},[s("div",{class:"q-uploader__title"},[t.name]),s("div",{class:"q-uploader__subtitle row items-center no-wrap"},[t.__sizeLabel+" / "+t.__progressLabel])]),t.__status==="uploading"?s(Le,{value:t.__progress,min:0,max:1,indeterminate:t.__progress===0}):s(re,{round:!0,dense:!0,flat:!0,icon:w.iconSet.uploader[t.__status==="uploaded"?"done":"clear"],onClick:()=>{X(t)}})])]))}ke(()=>{e.isUploading.value===!0&&e.abort(),e.files.value.length!==0&&J()});const I={};for(const t in e)ze(e[t])===!0?we(I,t,()=>e[t].value):I[t]=e[t];return Object.assign(I,{upload:ee,reset:T,removeUploadedFiles:R,removeQueuedFiles:W,removeFile:X,pickFiles:f,addFiles:k}),Ue(I,{canAddFiles:()=>E.value,canUpload:()=>n.value,uploadSizeLabel:()=>b.value,uploadProgressLabel:()=>c.value}),h({...e,upload:ee,reset:T,removeUploadedFiles:R,removeQueuedFiles:W,removeFile:X,pickFiles:f,addFiles:k,canAddFiles:E,canUpload:n,uploadSizeLabel:b,uploadProgressLabel:c}),()=>{const t=[s("div",{class:O.value},fe()),s("div",{class:"q-uploader__list scroll"},pe()),$("uploader")];e.isBusy.value===!0&&t.push(s("div",{class:"q-uploader__overlay absolute-full flex flex-center"},[s(le)]));const v={ref:C,class:D.value};return E.value===!0&&Object.assign(v,{onDragover:d,onDragleave:l}),s("div",v,t)}}const Te=Re(ve);var Ie=({name:a,props:h,emits:o,injectPlugin:r})=>ne({name:a,props:{...De,...h},emits:Be(o)===!0?{...Te,...o}:[...ve,...o],setup(u,{expose:p}){return Oe(r,p)}});function N(a){return typeof a=="function"?a:()=>a}const Qe="QUploader",Me={url:[Function,String],method:{type:[Function,String],default:"POST"},fieldName:{type:[Function,String],default:()=>a=>a.name},headers:[Function,Array],formFields:[Function,Array],withCredentials:[Function,Boolean],sendRaw:[Function,Boolean],batch:[Function,Boolean],factory:Function},We=["factoryFailed","uploaded","failed","uploading"];function He({props:a,emit:h,helpers:o}){const r=z([]),u=z([]),p=z(0),F=_(()=>({url:N(a.url),method:N(a.method),headers:N(a.headers),formFields:N(a.formFields),fieldName:N(a.fieldName),withCredentials:N(a.withCredentials),sendRaw:N(a.sendRaw),batch:N(a.batch)})),w=_(()=>p.value>0),U=_(()=>u.value.length!==0);let P;function x(){r.value.forEach(e=>{e.abort()}),u.value.length!==0&&(P=!0)}function j(){const e=o.queuedFiles.value.slice(0);o.queuedFiles.value=[],F.value.batch(e)?C(e):e.forEach(f=>{C([f])})}function C(e){if(p.value++,typeof a.factory!="function"){m(e,{});return}const f=a.factory(e);if(!f)h("factoryFailed",new Error("QUploader: factory() does not return properly"),e),p.value--;else if(typeof f.catch=="function"&&typeof f.then=="function"){u.value.push(f);const k=d=>{o.isAlive()===!0&&(u.value=u.value.filter(l=>l!==f),u.value.length===0&&(P=!1),o.queuedFiles.value=o.queuedFiles.value.concat(e),e.forEach(l=>{o.updateFileStatus(l,"failed")}),h("factoryFailed",d,e),p.value--)};f.then(d=>{P===!0?k(new Error("Aborted")):o.isAlive()===!0&&(u.value=u.value.filter(l=>l!==f),m(e,d))}).catch(k)}else m(e,f||{})}function m(e,f){const k=new FormData,d=new XMLHttpRequest,l=(n,D)=>f[n]!==void 0?N(f[n])(D):F.value[n](D),S=l("url",e);if(!S){console.error("q-uploader: invalid or no URL specified"),p.value--;return}const $=l("formFields",e);$!==void 0&&$.forEach(n=>{k.append(n.name,n.value)});let A=0,i=0,g=0,B=0,c;d.upload.addEventListener("progress",n=>{if(c===!0)return;const D=Math.min(B,n.loaded);o.uploadedSize.value+=D-g,g=D;let O=g-i;for(let T=A;O>0&&T<e.length;T++){const R=e[T];if(O>R.size)O-=R.size,A++,i+=R.size,o.updateFileStatus(R,"uploading",R.size);else{o.updateFileStatus(R,"uploading",O);return}}},!1),d.onreadystatechange=()=>{d.readyState<4||(d.status&&d.status<400?(o.uploadedFiles.value=o.uploadedFiles.value.concat(e),e.forEach(n=>{o.updateFileStatus(n,"uploaded")}),h("uploaded",{files:e,xhr:d})):(c=!0,o.uploadedSize.value-=g,o.queuedFiles.value=o.queuedFiles.value.concat(e),e.forEach(n=>{o.updateFileStatus(n,"failed")}),h("failed",{files:e,xhr:d})),p.value--,r.value=r.value.filter(n=>n!==d))},d.open(l("method",e),S),l("withCredentials",e)===!0&&(d.withCredentials=!0);const b=l("headers",e);b!==void 0&&b.forEach(n=>{d.setRequestHeader(n.name,n.value)});const E=l("sendRaw",e);e.forEach(n=>{o.updateFileStatus(n,"uploading",0),E!==!0&&k.append(l("fieldName",n),n,n.name),n.xhr=d,n.__abort=()=>{d.abort()},B+=n.size}),h("uploading",{files:e,xhr:d}),r.value.push(d),E===!0?d.send(new Blob(e)):d.send(k)}return{isUploading:w,isBusy:U,abort:x,upload:j}}var Xe={name:Qe,props:Me,emits:We,injectPlugin:He},Je=Ie(Xe);export{Je as Q};
