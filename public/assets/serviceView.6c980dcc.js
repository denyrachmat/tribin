import{Q as B}from"./QTooltip.b1641185.js";import{s as w,o as me,B as q,C as $,D as i,E as a,L as fe,M as X,I as y,Z as E,W as _e,Q as N,X as ee,Y as ge,a as O,c as ye,w as ze,j as Ee,h as V,aa as Xe,d as Ze,bd as Se,av as Je,aw as et,ay as tt,g as Te,aO as He,ab as Be,ag as lt,ah as at,aj as ot,be as nt,p as it,bf as st,bg as ut,aW as rt,aV as dt,am as De,aU as ct,aX as Qe,H as x,T as Fe,P as J,a$ as G,R as he,S as Ce,U as vt,O as ne,V as mt}from"./index.e1b00595.js";import{u as re,k as se,t as ft,w as Oe,Q as _t,a as qe,b as W,c as Ne,j as gt,l as $e,x as pt}from"./QTable.19d4c796.js";import{Q as xe,a as Pe}from"./QTd.201550cf.js";import{d as ve}from"./date.768ce18a.js";import{api_web as Y}from"./axios.06cf289d.js";import{Q as St,a as ht,C as Ct}from"./ClosePopup.6e1428ef.js";import{u as ue,g as bt}from"./use-dialog-plugin-component.c4e2827a.js";import{_ as yt}from"./serviceOprUpdateOrder.3b368b33.js";import"./use-cache.b0833c75.js";import"./QBtnGroup.e7fab9a6.js";import"./QBadge.b26a3346.js";import"./serviceOprItemAdd.4cde51c5.js";const Tt=y("div",{class:"text-h6"},"Create Item Master",-1),Dt={class:"row"},wt={class:"col"},Mt={class:"col q-pl-md"},kt={class:"row q-pt-md"},Vt={class:"col"},Rt={class:"col q-pl-md"},Ut={class:"row q-pt-md"},It={class:"col"},Ft={class:"col q-pl-md"},Ot={class:"row q-pt-md"},qt={class:"col"},Nt={__name:"itemCreate",props:{ItemCat:String},setup(t){const{dialogRef:T,onDialogHide:_,onDialogOK:c,onDialogCancel:h}=ue(),f=re(),n=w({MITM_ITMCD:"",MITM_ITMNM:"",MITM_STKUOM:"",MITM_ITMTYPE:1,MITM_BRAND:"",MITM_MODEL:"",MITM_SPEC:"",MITM_ITMCAT:"",MITM_COACD:"",MITM_ITMCAT:""}),S=w(!1),M=w([]),R=w([]),p=t;me(()=>{k(),n.value.MITM_ITMCAT=p.ItemCat});const C=(e,m,o,g)=>{m(async()=>{await Y.post("item/getListCoasAPI",{search:e}).then(l=>{R.value=l.data})})},I=()=>{f.dialog({title:"Confirmation",message:"Do you want to save this item ?",cancel:!0,persistent:!0}).onOk(async()=>{await Y.post("item",n.value).then(e=>{c(e.data.data.value)})})},k=async()=>{S.value=!0,await Y.get("item/formAPI").then(e=>{S.value=!1,M.value=e.data.uoms,R.value=e.data.coas}).catch(()=>{S.value=!1})};return(e,m)=>(q(),$(ge,{ref_key:"dialogRef",ref:T,onHide:ee(_),"transition-show":"slide-up","transition-hide":"slide-down","full-width":"",persistent:""},{default:i(()=>[a(fe,{class:"q-dialog-plugin bg-white q-pa-sm"},{default:i(()=>[a(X,null,{default:i(()=>[Tt]),_:1}),a(X,{class:"q-pa-sm"},{default:i(()=>[y("div",Dt,[y("div",wt,[a(E,{label:"Item Code",dense:"",modelValue:n.value.MITM_ITMCD,"onUpdate:modelValue":m[0]||(m[0]=o=>n.value.MITM_ITMCD=o),filled:""},null,8,["modelValue"])]),y("div",Mt,[a(E,{label:"Item Name",dense:"",modelValue:n.value.MITM_ITMNM,"onUpdate:modelValue":m[1]||(m[1]=o=>n.value.MITM_ITMNM=o),filled:""},null,8,["modelValue"])])]),y("div",kt,[y("div",Vt,[a(se,{dense:"",filled:"",label:"UOM",modelValue:n.value.MITM_STKUOM,"onUpdate:modelValue":m[2]||(m[2]=o=>n.value.MITM_STKUOM=o),options:M.value,behavior:"dialog","option-label":"MUOM_UOMNM","option-value":"MUOM_UOMCD","emit-value":"","map-options":"",loading:S.value},null,8,["modelValue","options","loading"])]),y("div",Rt,[a(E,{label:"Item Brand",dense:"",modelValue:n.value.MITM_BRAND,"onUpdate:modelValue":m[3]||(m[3]=o=>n.value.MITM_BRAND=o),filled:""},null,8,["modelValue"])])]),y("div",Ut,[y("div",It,[a(E,{label:"Item Model",dense:"",modelValue:n.value.MITM_MODEL,"onUpdate:modelValue":m[4]||(m[4]=o=>n.value.MITM_MODEL=o),filled:""},null,8,["modelValue"])]),y("div",Ft,[a(E,{label:"Item Specification",dense:"",modelValue:n.value.MITM_SPEC,"onUpdate:modelValue":m[5]||(m[5]=o=>n.value.MITM_SPEC=o),filled:""},null,8,["modelValue"])])]),y("div",Ot,[y("div",qt,[a(se,{dense:"",filled:"",label:"COA",modelValue:n.value.MITM_COACD,"onUpdate:modelValue":m[6]||(m[6]=o=>n.value.MITM_COACD=o),options:R.value,"use-input":"",behavior:"dialog","option-label":"MCOA_COANM","option-value":"MCOA_COACD",onFilter:m[7]||(m[7]=(o,g,l)=>C(o,g,l)),"emit-value":"","map-options":"",loading:S.value},null,8,["modelValue","options","loading"])])])]),_:1}),a(_e,{align:"right"},{default:i(()=>[a(N,{label:"OK",color:"primary",onClick:m[8]||(m[8]=o=>I())}),a(N,{flat:"",label:"Cancel",color:"red",onClick:ee(h)},null,8,["onClick"])]),_:1})]),_:1})]),_:1},8,["onHide"]))}},$t=y("div",{class:"text-h6"},"Create New Customer Data",-1),xt={class:"row q-pb-md"},Pt={class:"col"},At={class:"row q-pb-md"},Lt={class:"col"},zt={class:"col q-pl-md"},Et={class:"row"},Ht={class:"col"},Bt={__name:"customerView",setup(t){const{dialogRef:T,onDialogHide:_,onDialogOK:c,onDialogCancel:h}=ue(),f=re(),n=w({MCUS_CUSCD:"",MCUS_CUSNM:"",MCUS_CURCD:"IDR",MCUS_TAXREG:"-",MCUS_ADDR1:"",MCUS_TELNO:"",MCUS_PIC_NAME:"-",MCUS_PIC_TELNO:"-",MCUS_TYPE:1,MCUS_GROUP:"SERVICE",MCUS_EMAIL:""}),S=w(!1),M=()=>{f.dialog({title:"Confirmation",message:"Do you want to save this customer ?",cancel:!0,persistent:!0}).onOk(async()=>{S.value=!0,await Y.post("customer",n.value).then(R=>{S.value=!1,c(R.data)}).catch(R=>{S.value=!1})})};return(R,p)=>(q(),$(ge,{ref_key:"dialogRef",ref:T,onHide:ee(_),"transition-show":"slide-up","transition-hide":"slide-down","full-width":""},{default:i(()=>[a(fe,{class:"q-dialog-plugin bg-white q-pa-sm"},{default:i(()=>[a(X,null,{default:i(()=>[$t]),_:1}),a(X,{class:"q-pa-sm"},{default:i(()=>[y("div",xt,[y("div",Pt,[a(E,{label:"Customer Name",dense:"",modelValue:n.value.MCUS_CUSNM,"onUpdate:modelValue":p[0]||(p[0]=C=>n.value.MCUS_CUSNM=C),filled:""},null,8,["modelValue"])])]),y("div",At,[y("div",Lt,[a(E,{label:"Customer Email",dense:"",modelValue:n.value.MCUS_EMAIL,"onUpdate:modelValue":p[1]||(p[1]=C=>n.value.MCUS_EMAIL=C),filled:""},null,8,["modelValue"])]),y("div",zt,[a(E,{label:"Customer Phone",dense:"",modelValue:n.value.MCUS_TELNO,"onUpdate:modelValue":p[2]||(p[2]=C=>n.value.MCUS_TELNO=C),filled:"",mask:"####-####-####"},null,8,["modelValue"])])]),y("div",Et,[y("div",Ht,[a(E,{label:"Customer Address",dense:"",modelValue:n.value.MCUS_ADDR1,"onUpdate:modelValue":p[3]||(p[3]=C=>n.value.MCUS_ADDR1=C),filled:"",type:"textarea"},null,8,["modelValue"])])])]),_:1}),a(_e,{align:"right"},{default:i(()=>[a(N,{label:"OK",color:"primary",onClick:p[4]||(p[4]=C=>M()),loading:S.value},null,8,["loading"]),a(N,{flat:"",label:"Cancel",color:"red",onClick:ee(h),loading:S.value},null,8,["onClick","loading"])]),_:1})]),_:1})]),_:1},8,["onHide"]))}},Qt={ratio:[String,Number]};function Yt(t,T){return O(()=>{const _=Number(t.ratio||(T!==void 0?T.value:void 0));return isNaN(_)!==!0&&_>0?{paddingBottom:`${100/_}%`}:null})}const jt=16/9;var Kt=ye({name:"QImg",props:{...Qt,src:String,srcset:String,sizes:String,alt:String,crossorigin:String,decoding:String,referrerpolicy:String,draggable:Boolean,loading:{type:String,default:"lazy"},fetchpriority:{type:String,default:"auto"},width:String,height:String,initialRatio:{type:[Number,String],default:jt},placeholderSrc:String,fit:{type:String,default:"cover"},position:{type:String,default:"50% 50%"},imgClass:String,imgStyle:Object,noSpinner:Boolean,noNativeMenu:Boolean,noTransition:Boolean,spinnerColor:String,spinnerSize:String},emits:["load","error"],setup(t,{slots:T,emit:_}){const c=w(t.initialRatio),h=Yt(t,c);let f=null,n=!1;const S=[w(null),w(o())],M=w(0),R=w(!1),p=w(!1),C=O(()=>`q-img q-img--${t.noNativeMenu===!0?"no-":""}menu`),I=O(()=>({width:t.width,height:t.height})),k=O(()=>`q-img__image ${t.imgClass!==void 0?t.imgClass+" ":""}q-img__image--with${t.noTransition===!0?"out":""}-transition`),e=O(()=>({...t.imgStyle,objectFit:t.fit,objectPosition:t.position}));ze(()=>m(),g);function m(){return t.src||t.srcset||t.sizes?{src:t.src,srcset:t.srcset,sizes:t.sizes}:null}function o(){return t.placeholderSrc!==void 0?{src:t.placeholderSrc}:null}function g(d){f!==null&&(clearTimeout(f),f=null),p.value=!1,d===null?(R.value=!1,S[M.value^1].value=o()):R.value=!0,S[M.value].value=d}function l({target:d}){n!==!0&&(f!==null&&(clearTimeout(f),f=null),c.value=d.naturalHeight===0?.5:d.naturalWidth/d.naturalHeight,s(d,1))}function s(d,b){n===!0||b===1e3||(d.complete===!0?P(d):f=setTimeout(()=>{f=null,s(d,b+1)},50))}function P(d){n!==!0&&(M.value=M.value^1,S[M.value].value=null,R.value=!1,p.value=!1,_("load",d.currentSrc||d.src))}function A(d){f!==null&&(clearTimeout(f),f=null),R.value=!1,p.value=!0,S[M.value].value=null,S[M.value^1].value=o(),_("error",d)}function u(d){const b=S[d].value,D={key:"img_"+d,class:k.value,style:e.value,crossorigin:t.crossorigin,decoding:t.decoding,referrerpolicy:t.referrerpolicy,height:t.height,width:t.width,loading:t.loading,fetchpriority:t.fetchpriority,"aria-hidden":"true",draggable:t.draggable,...b};return M.value===d?(D.class+=" q-img__image--waiting",Object.assign(D,{onLoad:l,onError:A})):D.class+=" q-img__image--loaded",V("div",{class:"q-img__container absolute-full",key:"img"+d},V("img",D))}function v(){return R.value!==!0?V("div",{key:"content",class:"q-img__content absolute-full q-anchor--skip"},Ze(T[p.value===!0?"error":"default"])):V("div",{key:"loading",class:"q-img__loading absolute-full flex flex-center"},T.loading!==void 0?T.loading():t.noSpinner===!0?void 0:[V(Se,{color:t.spinnerColor,size:t.spinnerSize})])}return g(m()),Ee(()=>{n=!0,f!==null&&(clearTimeout(f),f=null)}),()=>{const d=[];return h.value!==null&&d.push(V("div",{key:"filler",style:h.value})),p.value!==!0&&(S[0].value!==null&&d.push(u(0)),S[1].value!==null&&d.push(u(1))),d.push(V(Xe,{name:"q-transition--fade"},v)),V("div",{class:C.value,style:I.value,role:"img","aria-label":t.alt},d)}}});const Gt={...Je,min:{type:Number,default:0},max:{type:Number,default:100},color:String,centerColor:String,trackColor:String,fontSize:String,rounded:Boolean,thickness:{type:Number,default:.2,validator:t=>t>=0&&t<=1},angle:{type:Number,default:0},showValue:Boolean,reverse:Boolean,instantFeedback:Boolean},be=50,Ye=2*be,je=Ye*Math.PI,Wt=Math.round(je*1e3)/1e3;var Xt=ye({name:"QCircularProgress",props:{...Gt,value:{type:Number,default:0},animationSpeed:{type:[String,Number],default:600},indeterminate:Boolean},setup(t,{slots:T}){const{proxy:{$q:_}}=Te(),c=et(t),h=O(()=>{const k=(_.lang.rtl===!0?-1:1)*t.angle;return{transform:t.reverse!==(_.lang.rtl===!0)?`scale3d(-1, 1, 1) rotate3d(0, 0, 1, ${-90-k}deg)`:`rotate3d(0, 0, 1, ${k-90}deg)`}}),f=O(()=>t.instantFeedback!==!0&&t.indeterminate!==!0?{transition:`stroke-dashoffset ${t.animationSpeed}ms ease 0s, stroke ${t.animationSpeed}ms ease`}:""),n=O(()=>Ye/(1-t.thickness/2)),S=O(()=>`${n.value/2} ${n.value/2} ${n.value} ${n.value}`),M=O(()=>ft(t.value,t.min,t.max)),R=O(()=>t.max-t.min),p=O(()=>t.thickness/2*n.value),C=O(()=>{const k=(t.max-M.value)/R.value,e=t.rounded===!0&&M.value<t.max&&k<.25?p.value/2*(1-k/.25):0;return je*k+e});function I({thickness:k,offset:e,color:m,cls:o,rounded:g}){return V("circle",{class:"q-circular-progress__"+o+(m!==void 0?` text-${m}`:""),style:f.value,fill:"transparent",stroke:"currentColor","stroke-width":k,"stroke-dasharray":Wt,"stroke-dashoffset":e,"stroke-linecap":g,cx:n.value,cy:n.value,r:be})}return()=>{const k=[];t.centerColor!==void 0&&t.centerColor!=="transparent"&&k.push(V("circle",{class:`q-circular-progress__center text-${t.centerColor}`,fill:"currentColor",r:be-p.value/2,cx:n.value,cy:n.value})),t.trackColor!==void 0&&t.trackColor!=="transparent"&&k.push(I({cls:"track",thickness:p.value,offset:0,color:t.trackColor})),k.push(I({cls:"circle",thickness:p.value,offset:C.value,color:t.color,rounded:t.rounded===!0?"round":void 0}));const e=[V("svg",{class:"q-circular-progress__svg",style:h.value,viewBox:S.value,"aria-hidden":"true"},k)];return t.showValue===!0&&e.push(V("div",{class:"q-circular-progress__text absolute-full row flex-center content-center",style:{fontSize:t.fontSize}},T.default!==void 0?T.default():[V("div",M.value)])),V("div",{class:`q-circular-progress q-circular-progress--${t.indeterminate===!0?"in":""}determinate`,style:c.value,role:"progressbar","aria-valuemin":t.min,"aria-valuemax":t.max,"aria-valuenow":t.indeterminate===!0?void 0:M.value},tt(T.internal,e))}}});function oe(t,T,_,c){const h=[];return t.forEach(f=>{c(f)===!0?h.push(f):T.push({failedPropValidation:_,file:f})}),h}function ce(t){t&&t.dataTransfer&&(t.dataTransfer.dropEffect="copy"),Be(t)}const Zt={multiple:Boolean,accept:String,capture:String,maxFileSize:[Number,String],maxTotalSize:[Number,String],maxFiles:[Number,String],filter:Function},Jt=["rejected"];function el({editable:t,dnd:T,getFileInput:_,addFilesToQueue:c}){const{props:h,emit:f,proxy:n}=Te(),S=w(null),M=O(()=>h.accept!==void 0?h.accept.split(",").map(l=>(l=l.trim(),l==="*"?"*/":(l.endsWith("/*")&&(l=l.slice(0,l.length-1)),l.toUpperCase()))):null),R=O(()=>parseInt(h.maxFiles,10)),p=O(()=>parseInt(h.maxTotalSize,10));function C(l){if(t.value)if(l!==Object(l)&&(l={target:null}),l.target!==null&&l.target.matches('input[type="file"]')===!0)l.clientX===0&&l.clientY===0&&He(l);else{const s=_();s&&s!==l.target&&s.click(l)}}function I(l){t.value&&l&&c(null,l)}function k(l,s,P,A){let u=Array.from(s||l.target.files);const v=[],d=()=>{v.length!==0&&f("rejected",v)};if(h.accept!==void 0&&M.value.indexOf("*/")===-1&&(u=oe(u,v,"accept",b=>M.value.some(D=>b.type.toUpperCase().startsWith(D)||b.name.toUpperCase().endsWith(D))),u.length===0))return d();if(h.maxFileSize!==void 0){const b=parseInt(h.maxFileSize,10);if(u=oe(u,v,"max-file-size",D=>D.size<=b),u.length===0)return d()}if(h.multiple!==!0&&u.length!==0&&(u=[u[0]]),u.forEach(b=>{b.__key=b.webkitRelativePath+b.lastModified+b.name+b.size}),A===!0){const b=P.map(D=>D.__key);u=oe(u,v,"duplicate",D=>b.includes(D.__key)===!1)}if(u.length===0)return d();if(h.maxTotalSize!==void 0){let b=A===!0?P.reduce((D,H)=>D+H.size,0):0;if(u=oe(u,v,"max-total-size",D=>(b+=D.size,b<=p.value)),u.length===0)return d()}if(typeof h.filter=="function"){const b=h.filter(u);u=oe(u,v,"filter",D=>b.includes(D))}if(h.maxFiles!==void 0){let b=A===!0?P.length:0;if(u=oe(u,v,"max-files",()=>(b++,b<=R.value)),u.length===0)return d()}if(d(),u.length!==0)return u}function e(l){ce(l),T.value!==!0&&(T.value=!0)}function m(l){Be(l),(l.relatedTarget!==null||lt.is.safari!==!0?l.relatedTarget!==S.value:document.elementsFromPoint(l.clientX,l.clientY).includes(S.value)===!1)===!0&&(T.value=!1)}function o(l){ce(l);const s=l.dataTransfer.files;s.length!==0&&c(null,s),T.value=!1}function g(l){if(T.value===!0)return V("div",{ref:S,class:`q-${l}__dnd absolute-full`,onDragenter:ce,onDragover:ce,onDragleave:m,onDrop:o})}return Object.assign(n,{pickFiles:C,addFiles:I}),{pickFiles:C,addFiles:I,onDragover:e,onDragleave:m,processFiles:k,getDndNode:g,maxFilesNumber:R,maxTotalSizeNumber:p}}function Ae(t){return(t*100).toFixed(2)+"%"}const tl={...at,...Zt,label:String,color:String,textColor:String,square:Boolean,flat:Boolean,bordered:Boolean,noThumbnails:Boolean,autoUpload:Boolean,hideUploadBtn:Boolean,disable:Boolean,readonly:Boolean},Ke=[...Jt,"start","finish","added","removed"];function ll(t,T){const _=Te(),{props:c,slots:h,emit:f,proxy:n}=_,{$q:S}=n,M=ot(c,S);function R(r,F,L){if(r.__status=F,F==="idle"){r.__uploaded=0,r.__progress=0,r.__sizeLabel=Oe(r.size),r.__progressLabel="0.00%";return}if(F==="failed"){n.$forceUpdate();return}r.__uploaded=F==="uploaded"?r.size:L,r.__progress=F==="uploaded"?1:Math.min(.9999,r.__uploaded/r.size),r.__progressLabel=Ae(r.__progress),n.$forceUpdate()}const p=O(()=>c.disable!==!0&&c.readonly!==!0),C=w(!1),I=w(null),k=w(null),e={files:w([]),queuedFiles:w([]),uploadedFiles:w([]),uploadedSize:w(0),updateFileStatus:R,isAlive:()=>nt(_)===!1},{pickFiles:m,addFiles:o,onDragover:g,onDragleave:l,processFiles:s,getDndNode:P,maxFilesNumber:A,maxTotalSizeNumber:u}=el({editable:p,dnd:C,getFileInput:ke,addFilesToQueue:Ve});Object.assign(e,t({props:c,slots:h,emit:f,helpers:e,exposeApi:r=>{Object.assign(e,r)}})),e.isBusy===void 0&&(e.isBusy=w(!1));const v=w(0),d=O(()=>v.value===0?0:e.uploadedSize.value/v.value),b=O(()=>Ae(d.value)),D=O(()=>Oe(v.value)),H=O(()=>p.value===!0&&e.isUploading.value!==!0&&(c.multiple===!0||e.queuedFiles.value.length===0)&&(c.maxFiles===void 0||e.files.value.length<A.value)&&(c.maxTotalSize===void 0||v.value<u.value)),U=O(()=>p.value===!0&&e.isBusy.value!==!0&&e.isUploading.value!==!0&&e.queuedFiles.value.length!==0);it(st,Ue);const Z=O(()=>"q-uploader column no-wrap"+(M.value===!0?" q-uploader--dark q-dark":"")+(c.bordered===!0?" q-uploader--bordered":"")+(c.square===!0?" q-uploader--square no-border-radius":"")+(c.flat===!0?" q-uploader--flat no-shadow":"")+(c.disable===!0?" disabled q-uploader--disable":"")+(C.value===!0?" q-uploader--dnd":"")),te=O(()=>"q-uploader__header"+(c.color!==void 0?` bg-${c.color}`:"")+(c.textColor!==void 0?` text-${c.textColor}`:""));ze(e.isUploading,(r,F)=>{F===!1&&r===!0?f("start"):F===!0&&r===!1&&f("finish")});function le(){c.disable===!1&&(e.abort(),e.uploadedSize.value=0,v.value=0,Me(),e.files.value=[],e.queuedFiles.value=[],e.uploadedFiles.value=[])}function Q(){c.disable===!1&&we(["uploaded"],()=>{e.uploadedFiles.value=[]})}function de(){we(["idle","failed"],({size:r})=>{v.value-=r,e.queuedFiles.value=[]})}function we(r,F){if(c.disable===!0)return;const L={files:[],size:0},j=e.files.value.filter(z=>r.indexOf(z.__status)===-1?!0:(L.size+=z.size,L.files.push(z),z.__img!==void 0&&window.URL.revokeObjectURL(z.__img.src),!1));L.files.length!==0&&(e.files.value=j,F(L),f("removed",L.files))}function pe(r){c.disable||(r.__status==="uploaded"?e.uploadedFiles.value=e.uploadedFiles.value.filter(F=>F.__key!==r.__key):r.__status==="uploading"?r.__abort():v.value-=r.size,e.files.value=e.files.value.filter(F=>F.__key!==r.__key?!0:(F.__img!==void 0&&window.URL.revokeObjectURL(F.__img.src),!1)),e.queuedFiles.value=e.queuedFiles.value.filter(F=>F.__key!==r.__key),f("removed",[r]))}function Me(){e.files.value.forEach(r=>{r.__img!==void 0&&window.URL.revokeObjectURL(r.__img.src)})}function ke(){return k.value||I.value.getElementsByClassName("q-uploader__input")[0]}function Ve(r,F){const L=s(r,F,e.files.value,!0),j=ke();j!=null&&(j.value=""),L!==void 0&&(L.forEach(z=>{if(e.updateFileStatus(z,"idle"),v.value+=z.size,c.noThumbnails!==!0&&z.type.toUpperCase().startsWith("IMAGE")){const Ie=new Image;Ie.src=window.URL.createObjectURL(z),z.__img=Ie}}),e.files.value=e.files.value.concat(L),e.queuedFiles.value=e.queuedFiles.value.concat(L),f("added",L),c.autoUpload===!0&&e.upload())}function Re(){U.value===!0&&e.upload()}function ie(r,F,L){if(r===!0){const j={type:"a",key:F,icon:S.iconSet.uploader[F],flat:!0,dense:!0};let z;return F==="add"?(j.onClick=m,z=Ue):j.onClick=L,V(N,j,z)}}function Ue(){return V("input",{ref:k,class:"q-uploader__input overflow-hidden absolute-full",tabindex:-1,type:"file",title:"",accept:c.accept,multiple:c.multiple===!0?"multiple":void 0,capture:c.capture,onMousedown:He,onClick:m,onChange:Ve})}function Ge(){return h.header!==void 0?h.header(ae):[V("div",{class:"q-uploader__header-content column"},[V("div",{class:"flex flex-center no-wrap q-gutter-xs"},[ie(e.queuedFiles.value.length!==0,"removeQueue",de),ie(e.uploadedFiles.value.length!==0,"removeUploaded",Q),e.isUploading.value===!0?V(Se,{class:"q-uploader__spinner"}):null,V("div",{class:"col column justify-center"},[c.label!==void 0?V("div",{class:"q-uploader__title"},[c.label]):null,V("div",{class:"q-uploader__subtitle"},[D.value+" / "+b.value])]),ie(H.value,"add"),ie(c.hideUploadBtn===!1&&U.value===!0,"upload",e.upload),ie(e.isUploading.value,"clear",e.abort)])])]}function We(){return h.list!==void 0?h.list(ae):e.files.value.map(r=>V("div",{key:r.__key,class:"q-uploader__file relative-position"+(c.noThumbnails!==!0&&r.__img!==void 0?" q-uploader__file--img":"")+(r.__status==="failed"?" q-uploader__file--failed":r.__status==="uploaded"?" q-uploader__file--uploaded":""),style:c.noThumbnails!==!0&&r.__img!==void 0?{backgroundImage:'url("'+r.__img.src+'")'}:null},[V("div",{class:"q-uploader__file-header row flex-center no-wrap"},[r.__status==="failed"?V(De,{class:"q-uploader__file-status",name:S.iconSet.type.negative,color:"negative"}):null,V("div",{class:"q-uploader__file-header-content col"},[V("div",{class:"q-uploader__title"},[r.name]),V("div",{class:"q-uploader__subtitle row items-center no-wrap"},[r.__sizeLabel+" / "+r.__progressLabel])]),r.__status==="uploading"?V(Xt,{value:r.__progress,min:0,max:1,indeterminate:r.__progress===0}):V(N,{round:!0,dense:!0,flat:!0,icon:S.iconSet.uploader[r.__status==="uploaded"?"done":"clear"],onClick:()=>{pe(r)}})])]))}Ee(()=>{e.isUploading.value===!0&&e.abort(),e.files.value.length!==0&&Me()});const ae={};for(const r in e)ut(e[r])===!0?rt(ae,r,()=>e[r].value):ae[r]=e[r];return Object.assign(ae,{upload:Re,reset:le,removeUploadedFiles:Q,removeQueuedFiles:de,removeFile:pe,pickFiles:m,addFiles:o}),dt(ae,{canAddFiles:()=>H.value,canUpload:()=>U.value,uploadSizeLabel:()=>D.value,uploadProgressLabel:()=>b.value}),T({...e,upload:Re,reset:le,removeUploadedFiles:Q,removeQueuedFiles:de,removeFile:pe,pickFiles:m,addFiles:o,canAddFiles:H,canUpload:U,uploadSizeLabel:D,uploadProgressLabel:b}),()=>{const r=[V("div",{class:te.value},Ge()),V("div",{class:"q-uploader__list scroll"},We()),P("uploader")];e.isBusy.value===!0&&r.push(V("div",{class:"q-uploader__overlay absolute-full flex flex-center"},[V(Se)]));const F={ref:I,class:Z.value};return H.value===!0&&Object.assign(F,{onDragover:g,onDragleave:l}),V("div",F,r)}}const al=bt(Ke);var ol=({name:t,props:T,emits:_,injectPlugin:c})=>ye({name:t,props:{...tl,...T},emits:ct(_)===!0?{...al,..._}:[...Ke,..._],setup(h,{expose:f}){return ll(c,f)}});function K(t){return typeof t=="function"?t:()=>t}const nl={url:[Function,String],method:{type:[Function,String],default:"POST"},fieldName:{type:[Function,String],default:()=>t=>t.name},headers:[Function,Array],formFields:[Function,Array],withCredentials:[Function,Boolean],sendRaw:[Function,Boolean],batch:[Function,Boolean],factory:Function},il=["factoryFailed","uploaded","failed","uploading"];function sl({props:t,emit:T,helpers:_}){const c=w([]),h=w([]),f=w(0),n=O(()=>({url:K(t.url),method:K(t.method),headers:K(t.headers),formFields:K(t.formFields),fieldName:K(t.fieldName),withCredentials:K(t.withCredentials),sendRaw:K(t.sendRaw),batch:K(t.batch)})),S=O(()=>f.value>0),M=O(()=>h.value.length!==0);let R;function p(){c.value.forEach(e=>{e.abort()}),h.value.length!==0&&(R=!0)}function C(){const e=_.queuedFiles.value.slice(0);_.queuedFiles.value=[],n.value.batch(e)?I(e):e.forEach(m=>{I([m])})}function I(e){if(f.value++,typeof t.factory!="function"){k(e,{});return}const m=t.factory(e);if(!m)T("factoryFailed",new Error("QUploader: factory() does not return properly"),e),f.value--;else if(typeof m.catch=="function"&&typeof m.then=="function"){h.value.push(m);const o=g=>{_.isAlive()===!0&&(h.value=h.value.filter(l=>l!==m),h.value.length===0&&(R=!1),_.queuedFiles.value=_.queuedFiles.value.concat(e),e.forEach(l=>{_.updateFileStatus(l,"failed")}),T("factoryFailed",g,e),f.value--)};m.then(g=>{R===!0?o(new Error("Aborted")):_.isAlive()===!0&&(h.value=h.value.filter(l=>l!==m),k(e,g))}).catch(o)}else k(e,m||{})}function k(e,m){const o=new FormData,g=new XMLHttpRequest,l=(U,Z)=>m[U]!==void 0?K(m[U])(Z):n.value[U](Z),s=l("url",e);if(!s){console.error("q-uploader: invalid or no URL specified"),f.value--;return}const P=l("formFields",e);P!==void 0&&P.forEach(U=>{o.append(U.name,U.value)});let A=0,u=0,v=0,d=0,b;g.upload.addEventListener("progress",U=>{if(b===!0)return;const Z=Math.min(d,U.loaded);_.uploadedSize.value+=Z-v,v=Z;let te=v-u;for(let le=A;te>0&&le<e.length;le++){const Q=e[le];if(te>Q.size)te-=Q.size,A++,u+=Q.size,_.updateFileStatus(Q,"uploading",Q.size);else{_.updateFileStatus(Q,"uploading",te);return}}},!1),g.onreadystatechange=()=>{g.readyState<4||(g.status&&g.status<400?(_.uploadedFiles.value=_.uploadedFiles.value.concat(e),e.forEach(U=>{_.updateFileStatus(U,"uploaded")}),T("uploaded",{files:e,xhr:g})):(b=!0,_.uploadedSize.value-=v,_.queuedFiles.value=_.queuedFiles.value.concat(e),e.forEach(U=>{_.updateFileStatus(U,"failed")}),T("failed",{files:e,xhr:g})),f.value--,c.value=c.value.filter(U=>U!==g))},g.open(l("method",e),s),l("withCredentials",e)===!0&&(g.withCredentials=!0);const D=l("headers",e);D!==void 0&&D.forEach(U=>{g.setRequestHeader(U.name,U.value)});const H=l("sendRaw",e);e.forEach(U=>{_.updateFileStatus(U,"uploading",0),H!==!0&&o.append(l("fieldName",U),U,U.name),U.xhr=g,U.__abort=()=>{g.abort()},d+=U.size}),T("uploading",{files:e,xhr:g}),c.value.push(g),H===!0?g.send(new Blob(e)):g.send(o)}return{isUploading:S,isBusy:M,abort:p,upload:C}}var ul={name:"QUploader",props:nl,emits:il,injectPlugin:sl},rl=ol(ul);const dl={class:"bg-white"},cl={class:"row",style:{"min-height":"50vh","min-width":"50vh"}},vl={class:"col"},ml=y("div",{class:"text-h6"},"Preview Photo",-1),fl={__name:"uploadPhoto",props:{photo:String},emits:[...ue.emits],setup(t){const T=re(),_=w(""),c=t;me(()=>{c.photo!==""&&(_.value=c.photo)});const h=()=>{T.dialog({title:"Confirmation",message:"Do you want to remove this photo ?",cancel:!0,persistent:!0}).onOk(async()=>{R("")})},f=async C=>{const I=await n(C[0]);I&&(console.log(I),R(I))};function n(C){var I=new FileReader;return C&&I.readAsDataURL(C),new Promise((k,e)=>{I.onload=function(m){k(m.target.result)}})}const{dialogRef:S,onDialogHide:M,onDialogOK:R,onDialogCancel:p}=ue();return(C,I)=>(q(),$(ge,{ref_key:"dialogRef",ref:S,onHide:ee(M)},{default:i(()=>[y("div",dl,[y("div",cl,[y("div",vl,[_.value?(q(),$(fe,{key:0,class:"window-width window-height"},{default:i(()=>[a(X,null,{default:i(()=>[ml]),_:1}),a(Qe),a(X,null,{default:i(()=>[a(Kt,{src:_.value,style:{"max-height":"20em"}},null,8,["src"])]),_:1}),a(_e,{vertical:""},{default:i(()=>[a(N,{flat:"",onClick:I[0]||(I[0]=k=>h())},{default:i(()=>[x("Change Photo")]),_:1})]),_:1})]),_:1})):(q(),$(rl,{key:1,class:"full-height",url:k=>f(k),label:"Upload Photo",color:"amber","text-color":"black",accept:"image/*",style:{"min-width":"500px"},"max-files":1,"auto-upload":"","send-raw":""},null,8,["url"]))])])])]),_:1},8,["onHide"]))}},_l=y("div",{class:"text-h6"},"Create Order",-1),gl={style:{border:"1px black solid","border-radius":"10px"}},pl=y("legend",{style:{"margin-left":"1em",padding:"0.2em 0.8em"}},[y("b",null,"Header")],-1),Sl={class:"row"},hl={class:"col"},Cl={class:"col q-pl-md"},bl={class:"row items-center justify-end"},yl={class:"row"},Tl={class:"col"},Dl=y("legend",{style:{"margin-left":"1em",padding:"0.2em 0.8em"}},[y("b",null,"Detail Items")],-1),wl={key:0,class:"row q-pb-sm"},Ml={class:"col text-right"},Le={__name:"serviceCreateOrder",props:{header:Array,detail:Array,mode:String},setup(t){const{dialogRef:T,onDialogHide:_,onDialogOK:c,onDialogCancel:h}=ue(),f=re(),n=t;me(async()=>{n.header&&(await e(),await m(),S.value=n.header,p.value=n.detail)});const S=w({SRVH_DOCNO:"",SRVH_ISSDT:ve.formatDate(Date.now(),"YYYY-MM-DD"),SRVH_CUSCD:""}),M=w([]),R=w([]),p=w([]),C=w(!1),I=w(0),k=(u,v,d,b)=>{v(async()=>{b==="cust"&&await e(u),b==="item"&&await m(u)})},e=async u=>{C.value=!0,await Y.post("customer/searchAPI",{searchValue:u}).then(v=>{C.value=!1,R.value=v.data.data}).catch(()=>{C.value=!1})},m=async u=>{C.value=!0,await Y.post("item/searchAPI",{searchValue:u}).then(v=>{C.value=!1,M.value=v.data.data}).catch(()=>{C.value=!1})},o=()=>{p.value.push({TSRVD_ITMCD:"",TSRVD_LINE:p.value.length+1,TSRVD_QTY:1,TSRVD_CUSTRMK:"",TSRVD_PHOTO:""})},g=u=>{f.dialog({title:"Confirmation",message:`Do you want to delete this lines no ${u+1} ?`,cancel:!0,persistent:!0}).onOk(async()=>{p.value.splice(u,1)}).catch(v=>{f.notify({color:"red",message:"Something's wrong."})})},l=u=>{f.dialog({component:Nt,componentProps:{ItemCat:"SERVICE_ITEMM"}}).onOk(async v=>{await m(""),p.value[u].TSRVD_ITMCD=v.MITM_ITMNM})},s=()=>{f.dialog({title:"Confirmation",message:"Do you want to submit this data ?",cancel:!0,persistent:!0}).onOk(async()=>{C.value=!0,await Y.post("servicesAdmin",{header:S.value,detail:p.value}).then(u=>{C.value=!1,c()})})},P=()=>{f.dialog({component:Bt}).onOk(async u=>{console.log(u),await e(""),p.value[idx].SRVH_CUSCD=u.MCUS_CUSCD})},A=u=>{f.dialog({component:fl,componentProps:{photo:p.value[u].TSRVD_PHOTO}}).onOk(async v=>{console.log(v),v?p.value[u].TSRVD_PHOTO=v:p.value[u].TSRVD_PHOTO="",I.value=I.value+1,console.log(p.value[u])})};return(u,v)=>(q(),$(ge,{ref_key:"dialogRef",ref:T,onHide:ee(_),"transition-show":"slide-up","transition-hide":"slide-down","full-width":"",persistent:""},{default:i(()=>[a(fe,{class:"q-dialog-plugin bg-white q-pa-sm"},{default:i(()=>[a(X,null,{default:i(()=>[_l]),_:1}),a(X,{class:"q-pa-sm"},{default:i(()=>[y("fieldset",gl,[pl,y("div",Sl,[y("div",hl,[a(E,{label:"SPK No",readonly:"",dense:"",modelValue:S.value.SRVH_DOCNO,"onUpdate:modelValue":v[0]||(v[0]=d=>S.value.SRVH_DOCNO=d),filled:""},null,8,["modelValue"])]),y("div",Cl,[a(E,{filled:"",modelValue:S.value.SRVH_ISSDT,"onUpdate:modelValue":v[2]||(v[2]=d=>S.value.SRVH_ISSDT=d),dense:"",label:"Issue Date",loading:C.value,onClick:v[3]||(v[3]=d=>u.quotationIssueDate.qDateProxy.show()),mask:"####-##-##","fill-mask":"",hint:"Mask: YYYY-MM-DD",readonly:n.mode==="view"},{append:i(()=>[a(De,{name:"event",class:"cursor-pointer",disable:n.mode==="view"},{default:i(()=>[a(St,{cover:"","transition-show":"scale","transition-hide":"scale"},{default:i(()=>[a(ht,{modelValue:S.value.SRVH_ISSDT,"onUpdate:modelValue":v[1]||(v[1]=d=>S.value.SRVH_ISSDT=d),mask:"YYYY-MM-DD"},{default:i(()=>[y("div",bl,[Fe(a(N,{label:"Close",color:"primary",flat:""},null,512),[[Ct]])])]),_:1},8,["modelValue"])]),_:1})]),_:1},8,["disable"])]),_:1},8,["modelValue","loading","readonly"])])]),y("div",yl,[y("div",Tl,[a(se,{dense:"",filled:"",label:"Customer Choose",modelValue:S.value.SRVH_CUSCD,"onUpdate:modelValue":v[5]||(v[5]=d=>S.value.SRVH_CUSCD=d),"use-input":"","input-debounce":"500",options:R.value,onFilter:v[6]||(v[6]=(d,b,D)=>k(d,b,D,"cust")),behavior:"dialog","option-label":"MCUS_CUSNM","option-value":"MCUS_CUSCD","emit-value":"","map-options":"",loading:C.value,readonly:n.mode==="view"},{after:i(()=>[a(N,{round:"",dense:"",flat:"",icon:"person_add",onClick:v[4]||(v[4]=d=>P()),color:"cyan"},{default:i(()=>[a(B,null,{default:i(()=>[x("Add new customer")]),_:1})]),_:1})]),_:1},8,["modelValue","options","loading","readonly"])])])]),(q(),J("fieldset",{style:{border:"1px black solid","border-radius":"10px",height:"35vh",overflow:"auto"},key:I.value},[Dl,n.mode!=="view"?(q(),J("div",wl,[y("div",Ml,[a(N,{flat:"",icon:"add",color:"blue",onClick:v[7]||(v[7]=d=>o())},{default:i(()=>[a(B,null,{default:i(()=>[x("Add lines")]),_:1})]),_:1})])])):G("",!0),a(_t,{bordered:"",dense:""},{default:i(()=>[p.value.length>0?(q(!0),J(he,{key:0},Ce(p.value,(d,b)=>(q(),$(qe,{key:b,class:"q-my-sm",dense:""},{default:i(()=>[a(W,{avatar:""},{default:i(()=>[a(vt,{"text-color":"blue"},{default:i(()=>[x(ne(b+1),1)]),_:2},1024)]),_:2},1024),a(W,null,{default:i(()=>[a(Ne,null,{default:i(()=>[a(se,{dense:"",filled:"",label:"Item Name",modelValue:d.TSRVD_ITMCD,"onUpdate:modelValue":D=>d.TSRVD_ITMCD=D,"use-input":"","input-debounce":"500",options:M.value,onFilter:v[8]||(v[8]=(D,H,U)=>k(D,H,U,"item")),behavior:"dialog","option-label":"MITM_ITMNM","option-value":"MITM_ITMNM","emit-value":"","map-options":"",loading:C.value},null,8,["modelValue","onUpdate:modelValue","options","loading"])]),_:2},1024)]),_:2},1024),a(W,null,{default:i(()=>[a(E,{label:"Qty",filled:"",dense:"",modelValue:d.TSRVD_QTY,"onUpdate:modelValue":D=>d.TSRVD_QTY=D},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1024),a(W,null,{default:i(()=>[a(E,{label:"Problem",filled:"",dense:"",modelValue:d.TSRVD_CUSTRMK,"onUpdate:modelValue":D=>d.TSRVD_CUSTRMK=D},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1024),n.mode!=="view"?(q(),$(W,{key:0,side:""},{default:i(()=>[a(N,{icon:"delete",color:"red",flat:"",onClick:D=>g(b),dense:""},{default:i(()=>[a(B,null,{default:i(()=>[x("Delete line")]),_:1})]),_:2},1032,["onClick"])]),_:2},1024)):G("",!0),n.mode!=="view"?(q(),$(W,{key:1,side:""},{default:i(()=>[a(N,{icon:"library_add",color:"indigo",flat:"",onClick:D=>l(b),dense:""},{default:i(()=>[a(B,null,{default:i(()=>[x("Add new item")]),_:1})]),_:2},1032,["onClick"])]),_:2},1024)):G("",!0),n.mode!=="view"?(q(),$(W,{key:2,side:""},{default:i(()=>[a(N,{icon:"photo",color:d.TSRVD_PHOTO!=""?"blue":"orange",flat:"",onClick:D=>A(b),dense:""},{default:i(()=>[a(B,null,{default:i(()=>[x("Add photo")]),_:1})]),_:2},1032,["color","onClick"])]),_:2},1024)):G("",!0)]),_:2},1024))),128)):Fe((q(),$(qe,{key:1,class:"q-my-sm",clickable:""},{default:i(()=>[a(W,null,{default:i(()=>[a(Ne,null,{default:i(()=>[x(" No Items Added ")]),_:1})]),_:1})]),_:1})),[[mt]])]),_:1})]))]),_:1}),a(_e,{align:"right"},{default:i(()=>[a(N,{label:"OK",color:"primary",onClick:v[9]||(v[9]=d=>s()),disable:C.value,loading:C.value},null,8,["disable","loading"]),a(N,{flat:"",label:"Cancel",color:"red",onClick:ee(h),loading:C.value},null,8,["onClick","loading"])]),_:1})]),_:1})]),_:1},8,["onHide"]))}};const kl={class:"q-pa-md"},Vl={class:"row q-pb-md"},Rl=y("div",{class:"col"},[y("span",{class:"text-h4"},"Receive Order ")],-1),Ul={class:"col text-right"},Il={class:"row q-pt-md"},Fl={class:"col"},Ol={key:1},jl={__name:"serviceView",setup(t){const T=re(),_=w("SRVH_DOCNO"),c=w(""),h=w([]),f=w([{name:"SRVH_DOCNO",label:"SPK No",field:"SRVH_DOCNO",sortable:!0,align:"left"},{name:"MCUS_CUSNM",label:"Cust",field:"MCUS_CUSNM",sortable:!0,align:"left"},{name:"STAT",label:"Status",field:o=>m(o),sortable:!0,align:"left"},{name:"created_at",label:"Created Date",field:"created_at",sortable:!0,align:"left",format:o=>ve.formatDate(new Date(o),"DD MMM YYYY")}]),n=w(!1),S=w(null);me(()=>{M(),S.value=setInterval(()=>{M()},1e4)});const M=async()=>{n.value=!0,await Y.post("servicesAdmins/search",{searchBy:_.value,searchValue:c.value}).then(o=>{n.value=!1,h.value=o.data.data}).catch(o=>{n.value=!1})},R=()=>{T.dialog({component:Le}).onOk(async o=>{M()})},p=o=>{const g={SRVH_DOCNO:o.SRVH_DOCNO,SRVH_ISSDT:ve.formatDate(o.SRVH_ISSDT,"YYYY-MM-DD"),SRVH_CUSCD:o.MCUS_CUSCD};let l=[];o.detail.map(s=>{l.push({id:s.id,TSRVD_ITMCD:s.TSRVD_ITMCD,TSRVD_LINE:s.TSRVD_LINE,TSRVD_QTY:s.TSRVD_QTY,TSRVD_CUSTRMK:s.TSRVD_CUSTRMK,TSRVD_REMARK:s.TSRVD_REMARK,TSRVD_FLGSTS:s.TSRVD_FLGSTS,listFixDet:s.list_fix_det})}),T.dialog({component:yt,componentProps:{header:g,detail:l,mode:o.detail.filter(s=>s.TSRVD_FLGSTS===1).length===o.detail.length?"approvecust":"view"}}).onOk(async s=>{M()})},C=o=>{window.open("http://tribin.test/servicesAdmins/printInvoice/"+btoa(o),"_blank").focus()},I=o=>{const g={SRVH_DOCNO:o.SRVH_DOCNO,SRVH_ISSDT:ve.formatDate(o.SRVH_ISSDT,"YYYY-MM-DD"),SRVH_CUSCD:o.MCUS_CUSCD};let l=[];o.detail.map(s=>{l.push({TSRVD_ITMCD:s.TSRVD_ITMCD,TSRVD_LINE:s.TSRVD_LINE,TSRVD_QTY:s.TSRVD_QTY,TSRVD_CUSTRMK:s.TSRVD_CUSTRMK})}),T.dialog({component:Le,componentProps:{header:g,detail:l}}).onOk(async s=>{M()})},k=o=>{T.dialog({title:"Confirmation",message:"Do you want to proceed to service ?",cancel:!0,persistent:!0}).onOk(async()=>{n.value=!0,await Y.put(`servicesAdmin/${btoa(o.SRVH_DOCNO)}`,{TSRVD_FLGSTS:2}).then(g=>{n.value=!1}).catch(g=>{n.value=!1})})},e=o=>{T.dialog({title:"Confirmation",message:"Are you sure want to delete this order ?",cancel:!0,persistent:!0}).onOk(async()=>{n.value=!0,await Y.delete(`servicesAdmin/${btoa(o.SRVH_DOCNO)}`).then(g=>{n.value=!1}).catch(g=>{n.value=!1})})},m=o=>{const g=o.detail.filter(u=>u.TSRVD_FLGSTS==0),l=o.detail.filter(u=>u.TSRVD_FLGSTS==1),s=o.detail.filter(u=>u.TSRVD_FLGSTS==2),P=o.detail.filter(u=>u.TSRVD_FLGSTS==3),A=o.detail.filter(u=>u.TSRVD_FLGSTS==5);if(g.length==o.detail.length)return{color:"red",label:"No Price Added yet !",icon:"edit"};if(l.length>0&&l.length<o.detail.length)return{color:"warning",label:"Please Add item & price",icon:"payments"};if(A.length>0&&A.length==o.detail.length)return{color:"indigo",label:"Added Price Done, Waiting Manager Confirmation",icon:"price_check"};if(l.length>0&&l.length==o.detail.length)return{color:"green",label:"Manager has been approve, Waiting Cust. Confirmation",icon:"price_check"};if(s.length>0&&s.length>=o.detail.length)return{color:"cyan",label:"Cust. has been approved, continue to fix.",icon:"engineering"};if(P.length>0&&P.length===o.detail.length)return{color:"primary",label:"Fix has been done",icon:"fact_check"}};return(o,g)=>(q(),J("div",kl,[y("div",Vl,[Rl,y("div",Ul,[a(N,{icon:"add",color:"blue",onClick:R},{default:i(()=>[a(B,null,{default:i(()=>[x("Create New Order")]),_:1})]),_:1})])]),a(Qe),y("div",Il,[y("div",Fl,[a(gt,{title:"Created Order",rows:h.value,columns:f.value,"row-key":"name",loading:n.value,dense:"",pagination:{rowsPerPage:20},class:"my-sticky-header-column-table"},{"top-right":i(()=>[a(se,{outlined:"",modelValue:_.value,"onUpdate:modelValue":g[0]||(g[0]=l=>_.value=l),options:f.value,label:"Search Columns","option-value":"name","option-label":"label","emit-value":"",dense:"","map-options":""},null,8,["modelValue","options"]),a(E,{borderless:"",dense:"",modelValue:c.value,"onUpdate:modelValue":[g[1]||(g[1]=l=>c.value=l),g[2]||(g[2]=l=>o.dataQuo())],placeholder:"Search",outlined:"",debounce:"1000"},{append:i(()=>[a(De,{name:"search"})]),_:1},8,["modelValue"])]),header:i(l=>[a(xe,{props:l},{default:i(()=>[(q(!0),J(he,null,Ce(l.cols,s=>(q(),$($e,{key:s.name,props:l},{default:i(()=>[x(ne(s.label),1)]),_:2},1032,["props"]))),128)),a($e,{"auto-width":""},{default:i(()=>[x("Action")]),_:1})]),_:2},1032,["props"])]),body:i(l=>[a(xe,{props:l},{default:i(()=>[(q(!0),J(he,null,Ce(l.cols,s=>(q(),$(Pe,{key:s.name,props:l},{default:i(()=>[s.name==="STAT"?(q(),$(pt,{key:0,clickable:"",color:s.value.color,"text-color":"white",icon:s.value.icon},{default:i(()=>[x(ne(s.value.label),1)]),_:2},1032,["color","icon"])):(q(),J("span",Ol,ne(s.value),1))]),_:2},1032,["props"]))),128)),a(Pe,{"auto-width":""},{default:i(()=>[l.row.detail.filter(s=>s.TSRVD_FLGSTS>0).length===0?(q(),$(N,{key:0,flat:"",color:"orange",icon:"edit",onClick:s=>I(l.row),dense:""},{default:i(()=>[a(B,null,{default:i(()=>[x("Edit this Order")]),_:1})]),_:2},1032,["onClick"])):G("",!0),l.row.detail.filter(s=>s.TSRVD_FLGSTS>0).length===l.row.detail.length?(q(),$(N,{key:1,flat:"",color:"indigo",icon:"print",onClick:s=>C(l.row.SRVH_DOCNO),dense:""},{default:i(()=>[a(B,null,{default:i(()=>[x("Print this order")]),_:1})]),_:2},1032,["onClick"])):G("",!0),l.row.detail.filter(s=>s.TSRVD_FLGSTS>0).length===0?(q(),$(N,{key:2,flat:"",color:"red",icon:"delete",onClick:s=>e(l.row.SRVH_DOCNO),dense:""},{default:i(()=>[a(B,null,{default:i(()=>[x(ne(l.row.detail.filter(s=>s.TSRVD_FLGSTS>0).length>0?"Cannot delete processed order":"Delete this Order"),1)]),_:2},1024)]),_:2},1032,["onClick"])):G("",!0),l.row.detail.filter(s=>s.TSRVD_FLGSTS>0).length>0?(q(),$(N,{key:3,flat:"",color:"cyan",icon:"visibility",onClick:s=>p(l.row),dense:""},{default:i(()=>[a(B,null,{default:i(()=>[x("View this Order")]),_:1})]),_:2},1032,["onClick"])):G("",!0),l.row.detail.filter(s=>s.TSRVD_FLGSTS==1).length===l.row.detail.length?(q(),$(N,{key:4,flat:"",color:"indigo",icon:"check",onClick:s=>k(l.row),dense:""},{default:i(()=>[a(B,null,{default:i(()=>[x(ne(l.row.detail.filter(s=>s.TSRVD_FLGSTS>0).length!==l.row.detail.length?"Please wait until all item checked":"Proceed all item to service"),1)]),_:2},1024)]),_:2},1032,["onClick"])):G("",!0)]),_:2},1024)]),_:2},1032,["props"])]),_:1},8,["rows","columns","loading"])])])]))}};export{jl as default};
