import{Q as B}from"./QTooltip.7b5a1c06.js";import{s as D,o as fe,B as O,C as x,D as s,E as a,L as me,M as Z,I as b,Z as H,W as _e,Q as $,X as ee,Y as ge,a as F,c as Te,w as ze,j as Ee,h as k,aa as Xe,d as Ze,bd as Se,av as Je,aw as et,ay as tt,g as ye,aO as He,ab as Be,ag as lt,ah as at,aj as ot,be as nt,p as it,bf as st,bg as ut,aW as rt,aV as dt,am as De,aU as ct,aX as Qe,H as P,T as Fe,P as J,a$ as W,R as he,S as Ce,U as vt,O as ne,V as ft}from"./index.6f9290fd.js";import{u as re,k as se,t as mt,w as Oe,Q as _t,a as qe,b as X,c as Ne,j as gt,l as $e,x as pt}from"./QTable.c8c11ac2.js";import{Q as xe,a as Pe}from"./QTd.67bb7ab3.js";import{d as ve}from"./date.2871f5f8.js";import{api_web as Y}from"./axios.85674107.js";import{Q as St,a as ht,C as Ct}from"./ClosePopup.f1e239d4.js";import{u as ue,g as bt}from"./use-dialog-plugin-component.f3dbd088.js";import{_ as Tt}from"./serviceOprUpdateOrder.89afd64f.js";import"./use-cache.b0833c75.js";import"./QBtnGroup.25790488.js";import"./QBadge.71f564d8.js";import"./serviceOprItemAdd.f462b044.js";const yt=b("div",{class:"text-h6"},"Create Item Master",-1),Dt={class:"row"},Mt={class:"col"},wt={class:"col q-pl-md"},kt={class:"row q-pt-md"},Vt={class:"col"},Rt={class:"col q-pl-md"},Ut={class:"row q-pt-md"},It={class:"col"},Ft={class:"col q-pl-md"},Ot={class:"row q-pt-md"},qt={class:"col"},Nt={__name:"itemCreate",props:{ItemCat:String},setup(t){const{dialogRef:T,onDialogHide:m,onDialogOK:d,onDialogCancel:h}=ue(),v=re(),i=D({MITM_ITMCD:"",MITM_ITMNM:"",MITM_STKUOM:"",MITM_ITMTYPE:1,MITM_BRAND:"",MITM_MODEL:"",MITM_SPEC:"",MITM_ITMCAT:"",MITM_COACD:"",MITM_ITMCAT:""}),S=D(!1),M=D([]),U=D([]),g=t;fe(()=>{R(),i.value.MITM_ITMCAT=g.ItemCat});const y=(e,f,o,_)=>{f(async()=>{await Y.post("item/getListCoasAPI",{search:e}).then(l=>{U.value=l.data})})},q=()=>{v.dialog({title:"Confirmation",message:"Do you want to save this item ?",cancel:!0,persistent:!0}).onOk(async()=>{await Y.post("item",i.value).then(e=>{d(e.data.data.value)})})},R=async()=>{S.value=!0,await Y.get("item/formAPI").then(e=>{S.value=!1,M.value=e.data.uoms,U.value=e.data.coas}).catch(()=>{S.value=!1})};return(e,f)=>(O(),x(ge,{ref_key:"dialogRef",ref:T,onHide:ee(m),"transition-show":"slide-up","transition-hide":"slide-down","full-width":"",persistent:""},{default:s(()=>[a(me,{class:"q-dialog-plugin bg-white q-pa-sm"},{default:s(()=>[a(Z,null,{default:s(()=>[yt]),_:1}),a(Z,{class:"q-pa-sm"},{default:s(()=>[b("div",Dt,[b("div",Mt,[a(H,{label:"Item Code",dense:"",modelValue:i.value.MITM_ITMCD,"onUpdate:modelValue":f[0]||(f[0]=o=>i.value.MITM_ITMCD=o),filled:""},null,8,["modelValue"])]),b("div",wt,[a(H,{label:"Item Name",dense:"",modelValue:i.value.MITM_ITMNM,"onUpdate:modelValue":f[1]||(f[1]=o=>i.value.MITM_ITMNM=o),filled:""},null,8,["modelValue"])])]),b("div",kt,[b("div",Vt,[a(se,{dense:"",filled:"",label:"UOM",modelValue:i.value.MITM_STKUOM,"onUpdate:modelValue":f[2]||(f[2]=o=>i.value.MITM_STKUOM=o),options:M.value,behavior:"dialog","option-label":"MUOM_UOMNM","option-value":"MUOM_UOMCD","emit-value":"","map-options":"",loading:S.value},null,8,["modelValue","options","loading"])]),b("div",Rt,[a(H,{label:"Item Brand",dense:"",modelValue:i.value.MITM_BRAND,"onUpdate:modelValue":f[3]||(f[3]=o=>i.value.MITM_BRAND=o),filled:""},null,8,["modelValue"])])]),b("div",Ut,[b("div",It,[a(H,{label:"Item Model",dense:"",modelValue:i.value.MITM_MODEL,"onUpdate:modelValue":f[4]||(f[4]=o=>i.value.MITM_MODEL=o),filled:""},null,8,["modelValue"])]),b("div",Ft,[a(H,{label:"Item Specification",dense:"",modelValue:i.value.MITM_SPEC,"onUpdate:modelValue":f[5]||(f[5]=o=>i.value.MITM_SPEC=o),filled:""},null,8,["modelValue"])])]),b("div",Ot,[b("div",qt,[a(se,{dense:"",filled:"",label:"COA",modelValue:i.value.MITM_COACD,"onUpdate:modelValue":f[6]||(f[6]=o=>i.value.MITM_COACD=o),options:U.value,"use-input":"",behavior:"dialog","option-label":"MCOA_COANM","option-value":"MCOA_COACD",onFilter:f[7]||(f[7]=(o,_,l)=>y(o,_,l)),"emit-value":"","map-options":"",loading:S.value},null,8,["modelValue","options","loading"])])])]),_:1}),a(_e,{align:"right"},{default:s(()=>[a($,{label:"OK",color:"primary",onClick:f[8]||(f[8]=o=>q())}),a($,{flat:"",label:"Cancel",color:"red",onClick:ee(h)},null,8,["onClick"])]),_:1})]),_:1})]),_:1},8,["onHide"]))}},$t=b("div",{class:"text-h6"},"Create New Customer Data",-1),xt={class:"row q-pb-md"},Pt={class:"col"},At={class:"row q-pb-md"},Lt={class:"col"},zt={class:"col q-pl-md"},Et={class:"row"},Ht={class:"col"},Bt={__name:"customerView",setup(t){const{dialogRef:T,onDialogHide:m,onDialogOK:d,onDialogCancel:h}=ue(),v=re(),i=D({MCUS_CUSCD:"",MCUS_CUSNM:"",MCUS_CURCD:"IDR",MCUS_TAXREG:"-",MCUS_ADDR1:"",MCUS_TELNO:"",MCUS_PIC_NAME:"-",MCUS_PIC_TELNO:"-",MCUS_TYPE:1,MCUS_GROUP:"SERVICE",MCUS_EMAIL:""}),S=D(!1),M=()=>{v.dialog({title:"Confirmation",message:"Do you want to save this customer ?",cancel:!0,persistent:!0}).onOk(async()=>{S.value=!0,await Y.post("customer",i.value).then(U=>{S.value=!1,d(U.data)}).catch(U=>{S.value=!1})})};return(U,g)=>(O(),x(ge,{ref_key:"dialogRef",ref:T,onHide:ee(m),"transition-show":"slide-up","transition-hide":"slide-down","full-width":""},{default:s(()=>[a(me,{class:"q-dialog-plugin bg-white q-pa-sm"},{default:s(()=>[a(Z,null,{default:s(()=>[$t]),_:1}),a(Z,{class:"q-pa-sm"},{default:s(()=>[b("div",xt,[b("div",Pt,[a(H,{label:"Customer Name",dense:"",modelValue:i.value.MCUS_CUSNM,"onUpdate:modelValue":g[0]||(g[0]=y=>i.value.MCUS_CUSNM=y),filled:""},null,8,["modelValue"])])]),b("div",At,[b("div",Lt,[a(H,{label:"Customer Email",dense:"",modelValue:i.value.MCUS_EMAIL,"onUpdate:modelValue":g[1]||(g[1]=y=>i.value.MCUS_EMAIL=y),filled:""},null,8,["modelValue"])]),b("div",zt,[a(H,{label:"Customer Phone",dense:"",modelValue:i.value.MCUS_TELNO,"onUpdate:modelValue":g[2]||(g[2]=y=>i.value.MCUS_TELNO=y),filled:"",mask:"####-####-####"},null,8,["modelValue"])])]),b("div",Et,[b("div",Ht,[a(H,{label:"Customer Address",dense:"",modelValue:i.value.MCUS_ADDR1,"onUpdate:modelValue":g[3]||(g[3]=y=>i.value.MCUS_ADDR1=y),filled:"",type:"textarea"},null,8,["modelValue"])])])]),_:1}),a(_e,{align:"right"},{default:s(()=>[a($,{label:"OK",color:"primary",onClick:g[4]||(g[4]=y=>M()),loading:S.value},null,8,["loading"]),a($,{flat:"",label:"Cancel",color:"red",onClick:ee(h),loading:S.value},null,8,["onClick","loading"])]),_:1})]),_:1})]),_:1},8,["onHide"]))}},Qt={ratio:[String,Number]};function Yt(t,T){return F(()=>{const m=Number(t.ratio||(T!==void 0?T.value:void 0));return isNaN(m)!==!0&&m>0?{paddingBottom:`${100/m}%`}:null})}const jt=16/9;var Kt=Te({name:"QImg",props:{...Qt,src:String,srcset:String,sizes:String,alt:String,crossorigin:String,decoding:String,referrerpolicy:String,draggable:Boolean,loading:{type:String,default:"lazy"},fetchpriority:{type:String,default:"auto"},width:String,height:String,initialRatio:{type:[Number,String],default:jt},placeholderSrc:String,fit:{type:String,default:"cover"},position:{type:String,default:"50% 50%"},imgClass:String,imgStyle:Object,noSpinner:Boolean,noNativeMenu:Boolean,noTransition:Boolean,spinnerColor:String,spinnerSize:String},emits:["load","error"],setup(t,{slots:T,emit:m}){const d=D(t.initialRatio),h=Yt(t,d);let v=null,i=!1;const S=[D(null),D(o())],M=D(0),U=D(!1),g=D(!1),y=F(()=>`q-img q-img--${t.noNativeMenu===!0?"no-":""}menu`),q=F(()=>({width:t.width,height:t.height})),R=F(()=>`q-img__image ${t.imgClass!==void 0?t.imgClass+" ":""}q-img__image--with${t.noTransition===!0?"out":""}-transition`),e=F(()=>({...t.imgStyle,objectFit:t.fit,objectPosition:t.position}));ze(()=>f(),_);function f(){return t.src||t.srcset||t.sizes?{src:t.src,srcset:t.srcset,sizes:t.sizes}:null}function o(){return t.placeholderSrc!==void 0?{src:t.placeholderSrc}:null}function _(n){v!==null&&(clearTimeout(v),v=null),g.value=!1,n===null?(U.value=!1,S[M.value^1].value=o()):U.value=!0,S[M.value].value=n}function l({target:n}){i!==!0&&(v!==null&&(clearTimeout(v),v=null),d.value=n.naturalHeight===0?.5:n.naturalWidth/n.naturalHeight,u(n,1))}function u(n,c){i===!0||c===1e3||(n.complete===!0?A(n):v=setTimeout(()=>{v=null,u(n,c+1)},50))}function A(n){i!==!0&&(M.value=M.value^1,S[M.value].value=null,U.value=!1,g.value=!1,m("load",n.currentSrc||n.src))}function L(n){v!==null&&(clearTimeout(v),v=null),U.value=!1,g.value=!0,S[M.value].value=null,S[M.value^1].value=o(),m("error",n)}function C(n){const c=S[n].value,w={key:"img_"+n,class:R.value,style:e.value,crossorigin:t.crossorigin,decoding:t.decoding,referrerpolicy:t.referrerpolicy,height:t.height,width:t.width,loading:t.loading,fetchpriority:t.fetchpriority,"aria-hidden":"true",draggable:t.draggable,...c};return M.value===n?(w.class+=" q-img__image--waiting",Object.assign(w,{onLoad:l,onError:L})):w.class+=" q-img__image--loaded",k("div",{class:"q-img__container absolute-full",key:"img"+n},k("img",w))}function p(){return U.value!==!0?k("div",{key:"content",class:"q-img__content absolute-full q-anchor--skip"},Ze(T[g.value===!0?"error":"default"])):k("div",{key:"loading",class:"q-img__loading absolute-full flex flex-center"},T.loading!==void 0?T.loading():t.noSpinner===!0?void 0:[k(Se,{color:t.spinnerColor,size:t.spinnerSize})])}return _(f()),Ee(()=>{i=!0,v!==null&&(clearTimeout(v),v=null)}),()=>{const n=[];return h.value!==null&&n.push(k("div",{key:"filler",style:h.value})),g.value!==!0&&(S[0].value!==null&&n.push(C(0)),S[1].value!==null&&n.push(C(1))),n.push(k(Xe,{name:"q-transition--fade"},p)),k("div",{class:y.value,style:q.value,role:"img","aria-label":t.alt},n)}}});const Gt={...Je,min:{type:Number,default:0},max:{type:Number,default:100},color:String,centerColor:String,trackColor:String,fontSize:String,rounded:Boolean,thickness:{type:Number,default:.2,validator:t=>t>=0&&t<=1},angle:{type:Number,default:0},showValue:Boolean,reverse:Boolean,instantFeedback:Boolean},be=50,Ye=2*be,je=Ye*Math.PI,Wt=Math.round(je*1e3)/1e3;var Xt=Te({name:"QCircularProgress",props:{...Gt,value:{type:Number,default:0},animationSpeed:{type:[String,Number],default:600},indeterminate:Boolean},setup(t,{slots:T}){const{proxy:{$q:m}}=ye(),d=et(t),h=F(()=>{const R=(m.lang.rtl===!0?-1:1)*t.angle;return{transform:t.reverse!==(m.lang.rtl===!0)?`scale3d(-1, 1, 1) rotate3d(0, 0, 1, ${-90-R}deg)`:`rotate3d(0, 0, 1, ${R-90}deg)`}}),v=F(()=>t.instantFeedback!==!0&&t.indeterminate!==!0?{transition:`stroke-dashoffset ${t.animationSpeed}ms ease 0s, stroke ${t.animationSpeed}ms ease`}:""),i=F(()=>Ye/(1-t.thickness/2)),S=F(()=>`${i.value/2} ${i.value/2} ${i.value} ${i.value}`),M=F(()=>mt(t.value,t.min,t.max)),U=F(()=>t.max-t.min),g=F(()=>t.thickness/2*i.value),y=F(()=>{const R=(t.max-M.value)/U.value,e=t.rounded===!0&&M.value<t.max&&R<.25?g.value/2*(1-R/.25):0;return je*R+e});function q({thickness:R,offset:e,color:f,cls:o,rounded:_}){return k("circle",{class:"q-circular-progress__"+o+(f!==void 0?` text-${f}`:""),style:v.value,fill:"transparent",stroke:"currentColor","stroke-width":R,"stroke-dasharray":Wt,"stroke-dashoffset":e,"stroke-linecap":_,cx:i.value,cy:i.value,r:be})}return()=>{const R=[];t.centerColor!==void 0&&t.centerColor!=="transparent"&&R.push(k("circle",{class:`q-circular-progress__center text-${t.centerColor}`,fill:"currentColor",r:be-g.value/2,cx:i.value,cy:i.value})),t.trackColor!==void 0&&t.trackColor!=="transparent"&&R.push(q({cls:"track",thickness:g.value,offset:0,color:t.trackColor})),R.push(q({cls:"circle",thickness:g.value,offset:y.value,color:t.color,rounded:t.rounded===!0?"round":void 0}));const e=[k("svg",{class:"q-circular-progress__svg",style:h.value,viewBox:S.value,"aria-hidden":"true"},R)];return t.showValue===!0&&e.push(k("div",{class:"q-circular-progress__text absolute-full row flex-center content-center",style:{fontSize:t.fontSize}},T.default!==void 0?T.default():[k("div",M.value)])),k("div",{class:`q-circular-progress q-circular-progress--${t.indeterminate===!0?"in":""}determinate`,style:d.value,role:"progressbar","aria-valuemin":t.min,"aria-valuemax":t.max,"aria-valuenow":t.indeterminate===!0?void 0:M.value},tt(T.internal,e))}}});function oe(t,T,m,d){const h=[];return t.forEach(v=>{d(v)===!0?h.push(v):T.push({failedPropValidation:m,file:v})}),h}function ce(t){t&&t.dataTransfer&&(t.dataTransfer.dropEffect="copy"),Be(t)}const Zt={multiple:Boolean,accept:String,capture:String,maxFileSize:[Number,String],maxTotalSize:[Number,String],maxFiles:[Number,String],filter:Function},Jt=["rejected"];function el({editable:t,dnd:T,getFileInput:m,addFilesToQueue:d}){const{props:h,emit:v,proxy:i}=ye(),S=D(null),M=F(()=>h.accept!==void 0?h.accept.split(",").map(l=>(l=l.trim(),l==="*"?"*/":(l.endsWith("/*")&&(l=l.slice(0,l.length-1)),l.toUpperCase()))):null),U=F(()=>parseInt(h.maxFiles,10)),g=F(()=>parseInt(h.maxTotalSize,10));function y(l){if(t.value)if(l!==Object(l)&&(l={target:null}),l.target!==null&&l.target.matches('input[type="file"]')===!0)l.clientX===0&&l.clientY===0&&He(l);else{const u=m();u&&u!==l.target&&u.click(l)}}function q(l){t.value&&l&&d(null,l)}function R(l,u,A,L){let C=Array.from(u||l.target.files);const p=[],n=()=>{p.length!==0&&v("rejected",p)};if(h.accept!==void 0&&M.value.indexOf("*/")===-1&&(C=oe(C,p,"accept",c=>M.value.some(w=>c.type.toUpperCase().startsWith(w)||c.name.toUpperCase().endsWith(w))),C.length===0))return n();if(h.maxFileSize!==void 0){const c=parseInt(h.maxFileSize,10);if(C=oe(C,p,"max-file-size",w=>w.size<=c),C.length===0)return n()}if(h.multiple!==!0&&C.length!==0&&(C=[C[0]]),C.forEach(c=>{c.__key=c.webkitRelativePath+c.lastModified+c.name+c.size}),L===!0){const c=A.map(w=>w.__key);C=oe(C,p,"duplicate",w=>c.includes(w.__key)===!1)}if(C.length===0)return n();if(h.maxTotalSize!==void 0){let c=L===!0?A.reduce((w,N)=>w+N.size,0):0;if(C=oe(C,p,"max-total-size",w=>(c+=w.size,c<=g.value)),C.length===0)return n()}if(typeof h.filter=="function"){const c=h.filter(C);C=oe(C,p,"filter",w=>c.includes(w))}if(h.maxFiles!==void 0){let c=L===!0?A.length:0;if(C=oe(C,p,"max-files",()=>(c++,c<=U.value)),C.length===0)return n()}if(n(),C.length!==0)return C}function e(l){ce(l),T.value!==!0&&(T.value=!0)}function f(l){Be(l),(l.relatedTarget!==null||lt.is.safari!==!0?l.relatedTarget!==S.value:document.elementsFromPoint(l.clientX,l.clientY).includes(S.value)===!1)===!0&&(T.value=!1)}function o(l){ce(l);const u=l.dataTransfer.files;u.length!==0&&d(null,u),T.value=!1}function _(l){if(T.value===!0)return k("div",{ref:S,class:`q-${l}__dnd absolute-full`,onDragenter:ce,onDragover:ce,onDragleave:f,onDrop:o})}return Object.assign(i,{pickFiles:y,addFiles:q}),{pickFiles:y,addFiles:q,onDragover:e,onDragleave:f,processFiles:R,getDndNode:_,maxFilesNumber:U,maxTotalSizeNumber:g}}function Ae(t){return(t*100).toFixed(2)+"%"}const tl={...at,...Zt,label:String,color:String,textColor:String,square:Boolean,flat:Boolean,bordered:Boolean,noThumbnails:Boolean,autoUpload:Boolean,hideUploadBtn:Boolean,disable:Boolean,readonly:Boolean},Ke=[...Jt,"start","finish","added","removed"];function ll(t,T){const m=ye(),{props:d,slots:h,emit:v,proxy:i}=m,{$q:S}=i,M=ot(d,S);function U(r,I,z){if(r.__status=I,I==="idle"){r.__uploaded=0,r.__progress=0,r.__sizeLabel=Oe(r.size),r.__progressLabel="0.00%";return}if(I==="failed"){i.$forceUpdate();return}r.__uploaded=I==="uploaded"?r.size:z,r.__progress=I==="uploaded"?1:Math.min(.9999,r.__uploaded/r.size),r.__progressLabel=Ae(r.__progress),i.$forceUpdate()}const g=F(()=>d.disable!==!0&&d.readonly!==!0),y=D(!1),q=D(null),R=D(null),e={files:D([]),queuedFiles:D([]),uploadedFiles:D([]),uploadedSize:D(0),updateFileStatus:U,isAlive:()=>nt(m)===!1},{pickFiles:f,addFiles:o,onDragover:_,onDragleave:l,processFiles:u,getDndNode:A,maxFilesNumber:L,maxTotalSizeNumber:C}=el({editable:g,dnd:y,getFileInput:ke,addFilesToQueue:Ve});Object.assign(e,t({props:d,slots:h,emit:v,helpers:e,exposeApi:r=>{Object.assign(e,r)}})),e.isBusy===void 0&&(e.isBusy=D(!1));const p=D(0),n=F(()=>p.value===0?0:e.uploadedSize.value/p.value),c=F(()=>Ae(n.value)),w=F(()=>Oe(p.value)),N=F(()=>g.value===!0&&e.isUploading.value!==!0&&(d.multiple===!0||e.queuedFiles.value.length===0)&&(d.maxFiles===void 0||e.files.value.length<L.value)&&(d.maxTotalSize===void 0||p.value<C.value)),V=F(()=>g.value===!0&&e.isBusy.value!==!0&&e.isUploading.value!==!0&&e.queuedFiles.value.length!==0);it(st,Ue);const j=F(()=>"q-uploader column no-wrap"+(M.value===!0?" q-uploader--dark q-dark":"")+(d.bordered===!0?" q-uploader--bordered":"")+(d.square===!0?" q-uploader--square no-border-radius":"")+(d.flat===!0?" q-uploader--flat no-shadow":"")+(d.disable===!0?" disabled q-uploader--disable":"")+(y.value===!0?" q-uploader--dnd":"")),te=F(()=>"q-uploader__header"+(d.color!==void 0?` bg-${d.color}`:"")+(d.textColor!==void 0?` text-${d.textColor}`:""));ze(e.isUploading,(r,I)=>{I===!1&&r===!0?v("start"):I===!0&&r===!1&&v("finish")});function le(){d.disable===!1&&(e.abort(),e.uploadedSize.value=0,p.value=0,we(),e.files.value=[],e.queuedFiles.value=[],e.uploadedFiles.value=[])}function Q(){d.disable===!1&&Me(["uploaded"],()=>{e.uploadedFiles.value=[]})}function de(){Me(["idle","failed"],({size:r})=>{p.value-=r,e.queuedFiles.value=[]})}function Me(r,I){if(d.disable===!0)return;const z={files:[],size:0},K=e.files.value.filter(E=>r.indexOf(E.__status)===-1?!0:(z.size+=E.size,z.files.push(E),E.__img!==void 0&&window.URL.revokeObjectURL(E.__img.src),!1));z.files.length!==0&&(e.files.value=K,I(z),v("removed",z.files))}function pe(r){d.disable||(r.__status==="uploaded"?e.uploadedFiles.value=e.uploadedFiles.value.filter(I=>I.__key!==r.__key):r.__status==="uploading"?r.__abort():p.value-=r.size,e.files.value=e.files.value.filter(I=>I.__key!==r.__key?!0:(I.__img!==void 0&&window.URL.revokeObjectURL(I.__img.src),!1)),e.queuedFiles.value=e.queuedFiles.value.filter(I=>I.__key!==r.__key),v("removed",[r]))}function we(){e.files.value.forEach(r=>{r.__img!==void 0&&window.URL.revokeObjectURL(r.__img.src)})}function ke(){return R.value||q.value.getElementsByClassName("q-uploader__input")[0]}function Ve(r,I){const z=u(r,I,e.files.value,!0),K=ke();K!=null&&(K.value=""),z!==void 0&&(z.forEach(E=>{if(e.updateFileStatus(E,"idle"),p.value+=E.size,d.noThumbnails!==!0&&E.type.toUpperCase().startsWith("IMAGE")){const Ie=new Image;Ie.src=window.URL.createObjectURL(E),E.__img=Ie}}),e.files.value=e.files.value.concat(z),e.queuedFiles.value=e.queuedFiles.value.concat(z),v("added",z),d.autoUpload===!0&&e.upload())}function Re(){V.value===!0&&e.upload()}function ie(r,I,z){if(r===!0){const K={type:"a",key:I,icon:S.iconSet.uploader[I],flat:!0,dense:!0};let E;return I==="add"?(K.onClick=f,E=Ue):K.onClick=z,k($,K,E)}}function Ue(){return k("input",{ref:R,class:"q-uploader__input overflow-hidden absolute-full",tabindex:-1,type:"file",title:"",accept:d.accept,multiple:d.multiple===!0?"multiple":void 0,capture:d.capture,onMousedown:He,onClick:f,onChange:Ve})}function Ge(){return h.header!==void 0?h.header(ae):[k("div",{class:"q-uploader__header-content column"},[k("div",{class:"flex flex-center no-wrap q-gutter-xs"},[ie(e.queuedFiles.value.length!==0,"removeQueue",de),ie(e.uploadedFiles.value.length!==0,"removeUploaded",Q),e.isUploading.value===!0?k(Se,{class:"q-uploader__spinner"}):null,k("div",{class:"col column justify-center"},[d.label!==void 0?k("div",{class:"q-uploader__title"},[d.label]):null,k("div",{class:"q-uploader__subtitle"},[w.value+" / "+c.value])]),ie(N.value,"add"),ie(d.hideUploadBtn===!1&&V.value===!0,"upload",e.upload),ie(e.isUploading.value,"clear",e.abort)])])]}function We(){return h.list!==void 0?h.list(ae):e.files.value.map(r=>k("div",{key:r.__key,class:"q-uploader__file relative-position"+(d.noThumbnails!==!0&&r.__img!==void 0?" q-uploader__file--img":"")+(r.__status==="failed"?" q-uploader__file--failed":r.__status==="uploaded"?" q-uploader__file--uploaded":""),style:d.noThumbnails!==!0&&r.__img!==void 0?{backgroundImage:'url("'+r.__img.src+'")'}:null},[k("div",{class:"q-uploader__file-header row flex-center no-wrap"},[r.__status==="failed"?k(De,{class:"q-uploader__file-status",name:S.iconSet.type.negative,color:"negative"}):null,k("div",{class:"q-uploader__file-header-content col"},[k("div",{class:"q-uploader__title"},[r.name]),k("div",{class:"q-uploader__subtitle row items-center no-wrap"},[r.__sizeLabel+" / "+r.__progressLabel])]),r.__status==="uploading"?k(Xt,{value:r.__progress,min:0,max:1,indeterminate:r.__progress===0}):k($,{round:!0,dense:!0,flat:!0,icon:S.iconSet.uploader[r.__status==="uploaded"?"done":"clear"],onClick:()=>{pe(r)}})])]))}Ee(()=>{e.isUploading.value===!0&&e.abort(),e.files.value.length!==0&&we()});const ae={};for(const r in e)ut(e[r])===!0?rt(ae,r,()=>e[r].value):ae[r]=e[r];return Object.assign(ae,{upload:Re,reset:le,removeUploadedFiles:Q,removeQueuedFiles:de,removeFile:pe,pickFiles:f,addFiles:o}),dt(ae,{canAddFiles:()=>N.value,canUpload:()=>V.value,uploadSizeLabel:()=>w.value,uploadProgressLabel:()=>c.value}),T({...e,upload:Re,reset:le,removeUploadedFiles:Q,removeQueuedFiles:de,removeFile:pe,pickFiles:f,addFiles:o,canAddFiles:N,canUpload:V,uploadSizeLabel:w,uploadProgressLabel:c}),()=>{const r=[k("div",{class:te.value},Ge()),k("div",{class:"q-uploader__list scroll"},We()),A("uploader")];e.isBusy.value===!0&&r.push(k("div",{class:"q-uploader__overlay absolute-full flex flex-center"},[k(Se)]));const I={ref:q,class:j.value};return N.value===!0&&Object.assign(I,{onDragover:_,onDragleave:l}),k("div",I,r)}}const al=bt(Ke);var ol=({name:t,props:T,emits:m,injectPlugin:d})=>Te({name:t,props:{...tl,...T},emits:ct(m)===!0?{...al,...m}:[...Ke,...m],setup(h,{expose:v}){return ll(d,v)}});function G(t){return typeof t=="function"?t:()=>t}const nl={url:[Function,String],method:{type:[Function,String],default:"POST"},fieldName:{type:[Function,String],default:()=>t=>t.name},headers:[Function,Array],formFields:[Function,Array],withCredentials:[Function,Boolean],sendRaw:[Function,Boolean],batch:[Function,Boolean],factory:Function},il=["factoryFailed","uploaded","failed","uploading"];function sl({props:t,emit:T,helpers:m}){const d=D([]),h=D([]),v=D(0),i=F(()=>({url:G(t.url),method:G(t.method),headers:G(t.headers),formFields:G(t.formFields),fieldName:G(t.fieldName),withCredentials:G(t.withCredentials),sendRaw:G(t.sendRaw),batch:G(t.batch)})),S=F(()=>v.value>0),M=F(()=>h.value.length!==0);let U;function g(){d.value.forEach(e=>{e.abort()}),h.value.length!==0&&(U=!0)}function y(){const e=m.queuedFiles.value.slice(0);m.queuedFiles.value=[],i.value.batch(e)?q(e):e.forEach(f=>{q([f])})}function q(e){if(v.value++,typeof t.factory!="function"){R(e,{});return}const f=t.factory(e);if(!f)T("factoryFailed",new Error("QUploader: factory() does not return properly"),e),v.value--;else if(typeof f.catch=="function"&&typeof f.then=="function"){h.value.push(f);const o=_=>{m.isAlive()===!0&&(h.value=h.value.filter(l=>l!==f),h.value.length===0&&(U=!1),m.queuedFiles.value=m.queuedFiles.value.concat(e),e.forEach(l=>{m.updateFileStatus(l,"failed")}),T("factoryFailed",_,e),v.value--)};f.then(_=>{U===!0?o(new Error("Aborted")):m.isAlive()===!0&&(h.value=h.value.filter(l=>l!==f),R(e,_))}).catch(o)}else R(e,f||{})}function R(e,f){const o=new FormData,_=new XMLHttpRequest,l=(V,j)=>f[V]!==void 0?G(f[V])(j):i.value[V](j),u=l("url",e);if(!u){console.error("q-uploader: invalid or no URL specified"),v.value--;return}const A=l("formFields",e);A!==void 0&&A.forEach(V=>{o.append(V.name,V.value)});let L=0,C=0,p=0,n=0,c;_.upload.addEventListener("progress",V=>{if(c===!0)return;const j=Math.min(n,V.loaded);m.uploadedSize.value+=j-p,p=j;let te=p-C;for(let le=L;te>0&&le<e.length;le++){const Q=e[le];if(te>Q.size)te-=Q.size,L++,C+=Q.size,m.updateFileStatus(Q,"uploading",Q.size);else{m.updateFileStatus(Q,"uploading",te);return}}},!1),_.onreadystatechange=()=>{_.readyState<4||(_.status&&_.status<400?(m.uploadedFiles.value=m.uploadedFiles.value.concat(e),e.forEach(V=>{m.updateFileStatus(V,"uploaded")}),T("uploaded",{files:e,xhr:_})):(c=!0,m.uploadedSize.value-=p,m.queuedFiles.value=m.queuedFiles.value.concat(e),e.forEach(V=>{m.updateFileStatus(V,"failed")}),T("failed",{files:e,xhr:_})),v.value--,d.value=d.value.filter(V=>V!==_))},_.open(l("method",e),u),l("withCredentials",e)===!0&&(_.withCredentials=!0);const w=l("headers",e);w!==void 0&&w.forEach(V=>{_.setRequestHeader(V.name,V.value)});const N=l("sendRaw",e);e.forEach(V=>{m.updateFileStatus(V,"uploading",0),N!==!0&&o.append(l("fieldName",V),V,V.name),V.xhr=_,V.__abort=()=>{_.abort()},n+=V.size}),T("uploading",{files:e,xhr:_}),d.value.push(_),N===!0?_.send(new Blob(e)):_.send(o)}return{isUploading:S,isBusy:M,abort:g,upload:y}}var ul={name:"QUploader",props:nl,emits:il,injectPlugin:sl},rl=ol(ul);const dl={class:"bg-white"},cl={class:"row",style:{height:"50vh"}},vl={class:"col"},fl=b("div",{class:"text-h6"},"Preview Photo",-1),ml={__name:"uploadPhoto",props:{photo:String},emits:[...ue.emits],setup(t){const T=re(),m=D(""),d=t;fe(()=>{d.photo!==""&&(m.value=d.photo)});const h=()=>{T.dialog({title:"Confirmation",message:"Do you want to remove this photo ?",cancel:!0,persistent:!0}).onOk(async()=>{M("")})},v=g=>{M(g[0])},{dialogRef:i,onDialogHide:S,onDialogOK:M,onDialogCancel:U}=ue();return(g,y)=>(O(),x(ge,{ref_key:"dialogRef",ref:i,onHide:ee(S)},{default:s(()=>[b("div",dl,[b("div",cl,[b("div",vl,[m.value?(O(),x(me,{key:0,class:"my-card"},{default:s(()=>[a(Z,null,{default:s(()=>[fl]),_:1}),a(Qe),a(Z,null,{default:s(()=>[a(Kt,{src:m.value},null,8,["src"])]),_:1}),a(_e,{vertical:""},{default:s(()=>[a($,{flat:"",onClick:y[0]||(y[0]=q=>h())},{default:s(()=>[P("Change Photo")]),_:1})]),_:1})]),_:1})):(O(),x(rl,{key:1,class:"full-height",url:q=>v(q),label:"Upload Photo",color:"amber","text-color":"black",accept:"image/*",style:{"min-width":"500px"},"max-files":1,"auto-upload":"","send-raw":""},null,8,["url"]))])])])]),_:1},8,["onHide"]))}},_l=b("div",{class:"text-h6"},"Create Order",-1),gl={style:{border:"1px black solid","border-radius":"10px"}},pl=b("legend",{style:{"margin-left":"1em",padding:"0.2em 0.8em"}},[b("b",null,"Header")],-1),Sl={class:"row"},hl={class:"col"},Cl={class:"col q-pl-md"},bl={class:"row items-center justify-end"},Tl={class:"row"},yl={class:"col"},Dl=b("legend",{style:{"margin-left":"1em",padding:"0.2em 0.8em"}},[b("b",null,"Detail Items")],-1),Ml={key:0,class:"row q-pb-sm"},wl={class:"col text-right"},Le={__name:"serviceCreateOrder",props:{header:Array,detail:Array,mode:String},setup(t){const{dialogRef:T,onDialogHide:m,onDialogOK:d,onDialogCancel:h}=ue(),v=re(),i=t;fe(async()=>{i.header&&(await e(),await f(),S.value=i.header,g.value=i.detail)});const S=D({SRVH_DOCNO:"",SRVH_ISSDT:ve.formatDate(Date.now(),"YYYY-MM-DD"),SRVH_CUSCD:""}),M=D([]),U=D([]),g=D([]),y=D(!1),q=D(0),R=(p,n,c,w)=>{n(async()=>{w==="cust"&&await e(p),w==="item"&&await f(p)})},e=async p=>{y.value=!0,await Y.post("customer/searchAPI",{searchValue:p}).then(n=>{y.value=!1,U.value=n.data.data}).catch(()=>{y.value=!1})},f=async p=>{y.value=!0,await Y.post("item/searchAPI",{searchValue:p}).then(n=>{y.value=!1,M.value=n.data.data}).catch(()=>{y.value=!1})},o=()=>{g.value.push({TSRVD_ITMCD:"",TSRVD_LINE:g.value.length+1,TSRVD_QTY:1,TSRVD_CUSTRMK:"",TSRVD_PHOTO:""})},_=p=>{v.dialog({title:"Confirmation",message:`Do you want to delete this lines no ${p+1} ?`,cancel:!0,persistent:!0}).onOk(async()=>{g.value.splice(p,1)}).catch(n=>{v.notify({color:"red",message:"Something's wrong."})})},l=p=>{v.dialog({component:Nt,componentProps:{ItemCat:"SERVICE_ITEMM"}}).onOk(async n=>{await f(""),g.value[p].TSRVD_ITMCD=n.MITM_ITMNM})},u=()=>{v.dialog({title:"Confirmation",message:"Do you want to submit this data ?",cancel:!0,persistent:!0}).onOk(async()=>{y.value=!0,await Y.post("servicesAdmin",{header:S.value,detail:g.value}).then(p=>{y.value=!1,d()})})},A=()=>{v.dialog({component:Bt}).onOk(async p=>{console.log(p),await e(""),g.value[idx].SRVH_CUSCD=p.MCUS_CUSCD})},L=p=>{v.dialog({component:ml,componentProps:{photo:g.value[p].TSRVD_PHOTO}}).onOk(async n=>{console.log(n),n?g.value[p].TSRVD_PHOTO=C(n):g.value[p].TSRVD_PHOTO="",q.value=q.value+1,console.log(g.value[p])})},C=p=>{var n=new FileReader;n.readAsDataURL(p),n.onload=function(){},n.onerror=function(c){console.log("Error: ",c)}};return(p,n)=>(O(),x(ge,{ref_key:"dialogRef",ref:T,onHide:ee(m),"transition-show":"slide-up","transition-hide":"slide-down","full-width":"",persistent:""},{default:s(()=>[a(me,{class:"q-dialog-plugin bg-white q-pa-sm"},{default:s(()=>[a(Z,null,{default:s(()=>[_l]),_:1}),a(Z,{class:"q-pa-sm"},{default:s(()=>[b("fieldset",gl,[pl,b("div",Sl,[b("div",hl,[a(H,{label:"SPK No",readonly:"",dense:"",modelValue:S.value.SRVH_DOCNO,"onUpdate:modelValue":n[0]||(n[0]=c=>S.value.SRVH_DOCNO=c),filled:""},null,8,["modelValue"])]),b("div",Cl,[a(H,{filled:"",modelValue:S.value.SRVH_ISSDT,"onUpdate:modelValue":n[2]||(n[2]=c=>S.value.SRVH_ISSDT=c),dense:"",label:"Issue Date",loading:y.value,onClick:n[3]||(n[3]=c=>p.quotationIssueDate.qDateProxy.show()),mask:"####-##-##","fill-mask":"",hint:"Mask: YYYY-MM-DD",readonly:i.mode==="view"},{append:s(()=>[a(De,{name:"event",class:"cursor-pointer",disable:i.mode==="view"},{default:s(()=>[a(St,{cover:"","transition-show":"scale","transition-hide":"scale"},{default:s(()=>[a(ht,{modelValue:S.value.SRVH_ISSDT,"onUpdate:modelValue":n[1]||(n[1]=c=>S.value.SRVH_ISSDT=c),mask:"YYYY-MM-DD"},{default:s(()=>[b("div",bl,[Fe(a($,{label:"Close",color:"primary",flat:""},null,512),[[Ct]])])]),_:1},8,["modelValue"])]),_:1})]),_:1},8,["disable"])]),_:1},8,["modelValue","loading","readonly"])])]),b("div",Tl,[b("div",yl,[a(se,{dense:"",filled:"",label:"Customer Choose",modelValue:S.value.SRVH_CUSCD,"onUpdate:modelValue":n[5]||(n[5]=c=>S.value.SRVH_CUSCD=c),"use-input":"","input-debounce":"500",options:U.value,onFilter:n[6]||(n[6]=(c,w,N)=>R(c,w,N,"cust")),behavior:"dialog","option-label":"MCUS_CUSNM","option-value":"MCUS_CUSCD","emit-value":"","map-options":"",loading:y.value,readonly:i.mode==="view"},{after:s(()=>[a($,{round:"",dense:"",flat:"",icon:"person_add",onClick:n[4]||(n[4]=c=>A()),color:"cyan"},{default:s(()=>[a(B,null,{default:s(()=>[P("Add new customer")]),_:1})]),_:1})]),_:1},8,["modelValue","options","loading","readonly"])])])]),(O(),J("fieldset",{style:{border:"1px black solid","border-radius":"10px",height:"35vh",overflow:"auto"},key:q.value},[Dl,i.mode!=="view"?(O(),J("div",Ml,[b("div",wl,[a($,{flat:"",icon:"add",color:"blue",onClick:n[7]||(n[7]=c=>o())},{default:s(()=>[a(B,null,{default:s(()=>[P("Add lines")]),_:1})]),_:1})])])):W("",!0),a(_t,{bordered:"",dense:""},{default:s(()=>[g.value.length>0?(O(!0),J(he,{key:0},Ce(g.value,(c,w)=>(O(),x(qe,{key:w,class:"q-my-sm",dense:""},{default:s(()=>[a(X,{avatar:""},{default:s(()=>[a(vt,{"text-color":"blue"},{default:s(()=>[P(ne(w+1),1)]),_:2},1024)]),_:2},1024),a(X,null,{default:s(()=>[a(Ne,null,{default:s(()=>[a(se,{dense:"",filled:"",label:"Item Name",modelValue:c.TSRVD_ITMCD,"onUpdate:modelValue":N=>c.TSRVD_ITMCD=N,"use-input":"","input-debounce":"500",options:M.value,onFilter:n[8]||(n[8]=(N,V,j)=>R(N,V,j,"item")),behavior:"dialog","option-label":"MITM_ITMNM","option-value":"MITM_ITMNM","emit-value":"","map-options":"",loading:y.value},null,8,["modelValue","onUpdate:modelValue","options","loading"])]),_:2},1024)]),_:2},1024),a(X,null,{default:s(()=>[a(H,{label:"Qty",filled:"",dense:"",modelValue:c.TSRVD_QTY,"onUpdate:modelValue":N=>c.TSRVD_QTY=N},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1024),a(X,null,{default:s(()=>[a(H,{label:"Problem",filled:"",dense:"",modelValue:c.TSRVD_CUSTRMK,"onUpdate:modelValue":N=>c.TSRVD_CUSTRMK=N},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1024),i.mode!=="view"?(O(),x(X,{key:0,side:""},{default:s(()=>[a($,{icon:"delete",color:"red",flat:"",onClick:N=>_(w),dense:""},{default:s(()=>[a(B,null,{default:s(()=>[P("Delete line")]),_:1})]),_:2},1032,["onClick"])]),_:2},1024)):W("",!0),i.mode!=="view"?(O(),x(X,{key:1,side:""},{default:s(()=>[a($,{icon:"library_add",color:"indigo",flat:"",onClick:N=>l(w),dense:""},{default:s(()=>[a(B,null,{default:s(()=>[P("Add new item")]),_:1})]),_:2},1032,["onClick"])]),_:2},1024)):W("",!0),i.mode!=="view"?(O(),x(X,{key:2,side:""},{default:s(()=>[a($,{icon:"photo",color:c.TSRVD_PHOTO!=""?"blue":"orange",flat:"",onClick:N=>L(w),dense:""},{default:s(()=>[a(B,null,{default:s(()=>[P("Add photo")]),_:1})]),_:2},1032,["color","onClick"])]),_:2},1024)):W("",!0)]),_:2},1024))),128)):Fe((O(),x(qe,{key:1,class:"q-my-sm",clickable:""},{default:s(()=>[a(X,null,{default:s(()=>[a(Ne,null,{default:s(()=>[P(" No Items Added ")]),_:1})]),_:1})]),_:1})),[[ft]])]),_:1})]))]),_:1}),a(_e,{align:"right"},{default:s(()=>[a($,{label:"OK",color:"primary",onClick:n[9]||(n[9]=c=>u()),disable:y.value,loading:y.value},null,8,["disable","loading"]),a($,{flat:"",label:"Cancel",color:"red",onClick:ee(h),loading:y.value},null,8,["onClick","loading"])]),_:1})]),_:1})]),_:1},8,["onHide"]))}};const kl={class:"q-pa-md"},Vl={class:"row q-pb-md"},Rl=b("div",{class:"col"},[b("span",{class:"text-h4"},"Receive Order ")],-1),Ul={class:"col text-right"},Il={class:"row q-pt-md"},Fl={class:"col"},Ol={key:1},jl={__name:"serviceView",setup(t){const T=re(),m=D("SRVH_DOCNO"),d=D(""),h=D([]),v=D([{name:"SRVH_DOCNO",label:"SPK No",field:"SRVH_DOCNO",sortable:!0,align:"left"},{name:"MCUS_CUSNM",label:"Cust",field:"MCUS_CUSNM",sortable:!0,align:"left"},{name:"STAT",label:"Status",field:o=>f(o),sortable:!0,align:"left"},{name:"created_at",label:"Created Date",field:"created_at",sortable:!0,align:"left",format:o=>ve.formatDate(new Date(o),"DD MMM YYYY")}]),i=D(!1),S=D(null);fe(()=>{M(),S.value=setInterval(()=>{M()},1e4)});const M=async()=>{i.value=!0,await Y.post("servicesAdmins/search",{searchBy:m.value,searchValue:d.value}).then(o=>{i.value=!1,h.value=o.data.data}).catch(o=>{i.value=!1})},U=()=>{T.dialog({component:Le}).onOk(async o=>{M()})},g=o=>{const _={SRVH_DOCNO:o.SRVH_DOCNO,SRVH_ISSDT:ve.formatDate(o.SRVH_ISSDT,"YYYY-MM-DD"),SRVH_CUSCD:o.MCUS_CUSCD};let l=[];o.detail.map(u=>{l.push({id:u.id,TSRVD_ITMCD:u.TSRVD_ITMCD,TSRVD_LINE:u.TSRVD_LINE,TSRVD_QTY:u.TSRVD_QTY,TSRVD_CUSTRMK:u.TSRVD_CUSTRMK,TSRVD_REMARK:u.TSRVD_REMARK,TSRVD_FLGSTS:u.TSRVD_FLGSTS,listFixDet:u.list_fix_det})}),T.dialog({component:Tt,componentProps:{header:_,detail:l,mode:o.detail.filter(u=>u.TSRVD_FLGSTS===1).length===o.detail.length?"approvecust":"view"}}).onOk(async u=>{M()})},y=o=>{window.open("http://tribin.test/servicesAdmins/printInvoice/"+btoa(o),"_blank").focus()},q=o=>{const _={SRVH_DOCNO:o.SRVH_DOCNO,SRVH_ISSDT:ve.formatDate(o.SRVH_ISSDT,"YYYY-MM-DD"),SRVH_CUSCD:o.MCUS_CUSCD};let l=[];o.detail.map(u=>{l.push({TSRVD_ITMCD:u.TSRVD_ITMCD,TSRVD_LINE:u.TSRVD_LINE,TSRVD_QTY:u.TSRVD_QTY,TSRVD_CUSTRMK:u.TSRVD_CUSTRMK})}),T.dialog({component:Le,componentProps:{header:_,detail:l}}).onOk(async u=>{M()})},R=o=>{T.dialog({title:"Confirmation",message:"Do you want to proceed to service ?",cancel:!0,persistent:!0}).onOk(async()=>{i.value=!0,await Y.put(`servicesAdmin/${btoa(o.SRVH_DOCNO)}`,{TSRVD_FLGSTS:2}).then(_=>{i.value=!1}).catch(_=>{i.value=!1})})},e=o=>{T.dialog({title:"Confirmation",message:"Are you sure want to delete this order ?",cancel:!0,persistent:!0}).onOk(async()=>{i.value=!0,await Y.delete(`servicesAdmin/${btoa(o.SRVH_DOCNO)}`).then(_=>{i.value=!1}).catch(_=>{i.value=!1})})},f=o=>{const _=o.detail.filter(C=>C.TSRVD_FLGSTS==0),l=o.detail.filter(C=>C.TSRVD_FLGSTS==1),u=o.detail.filter(C=>C.TSRVD_FLGSTS==2),A=o.detail.filter(C=>C.TSRVD_FLGSTS==3),L=o.detail.filter(C=>C.TSRVD_FLGSTS==5);if(_.length==o.detail.length)return{color:"red",label:"No Price Added yet !",icon:"edit"};if(l.length>0&&l.length<o.detail.length)return{color:"warning",label:"Please Add item & price",icon:"payments"};if(L.length>0&&L.length==o.detail.length)return{color:"indigo",label:"Added Price Done, Waiting Manager Confirmation",icon:"price_check"};if(l.length>0&&l.length==o.detail.length)return{color:"green",label:"Manager has been approve, Waiting Cust. Confirmation",icon:"price_check"};if(u.length>0&&u.length>=o.detail.length)return{color:"cyan",label:"Cust. has been approved, continue to fix.",icon:"engineering"};if(A.length>0&&A.length===o.detail.length)return{color:"primary",label:"Fix has been done",icon:"fact_check"}};return(o,_)=>(O(),J("div",kl,[b("div",Vl,[Rl,b("div",Ul,[a($,{icon:"add",color:"blue",onClick:U},{default:s(()=>[a(B,null,{default:s(()=>[P("Create New Order")]),_:1})]),_:1})])]),a(Qe),b("div",Il,[b("div",Fl,[a(gt,{title:"Created Order",rows:h.value,columns:v.value,"row-key":"name",loading:i.value,dense:"",pagination:{rowsPerPage:20},class:"my-sticky-header-column-table"},{"top-right":s(()=>[a(se,{outlined:"",modelValue:m.value,"onUpdate:modelValue":_[0]||(_[0]=l=>m.value=l),options:v.value,label:"Search Columns","option-value":"name","option-label":"label","emit-value":"",dense:"","map-options":""},null,8,["modelValue","options"]),a(H,{borderless:"",dense:"",modelValue:d.value,"onUpdate:modelValue":[_[1]||(_[1]=l=>d.value=l),_[2]||(_[2]=l=>o.dataQuo())],placeholder:"Search",outlined:"",debounce:"1000"},{append:s(()=>[a(De,{name:"search"})]),_:1},8,["modelValue"])]),header:s(l=>[a(xe,{props:l},{default:s(()=>[(O(!0),J(he,null,Ce(l.cols,u=>(O(),x($e,{key:u.name,props:l},{default:s(()=>[P(ne(u.label),1)]),_:2},1032,["props"]))),128)),a($e,{"auto-width":""},{default:s(()=>[P("Action")]),_:1})]),_:2},1032,["props"])]),body:s(l=>[a(xe,{props:l},{default:s(()=>[(O(!0),J(he,null,Ce(l.cols,u=>(O(),x(Pe,{key:u.name,props:l},{default:s(()=>[u.name==="STAT"?(O(),x(pt,{key:0,clickable:"",color:u.value.color,"text-color":"white",icon:u.value.icon},{default:s(()=>[P(ne(u.value.label),1)]),_:2},1032,["color","icon"])):(O(),J("span",Ol,ne(u.value),1))]),_:2},1032,["props"]))),128)),a(Pe,{"auto-width":""},{default:s(()=>[l.row.detail.filter(u=>u.TSRVD_FLGSTS>0).length===0?(O(),x($,{key:0,flat:"",color:"orange",icon:"edit",onClick:u=>q(l.row),dense:""},{default:s(()=>[a(B,null,{default:s(()=>[P("Edit this Order")]),_:1})]),_:2},1032,["onClick"])):W("",!0),l.row.detail.filter(u=>u.TSRVD_FLGSTS>0).length===l.row.detail.length?(O(),x($,{key:1,flat:"",color:"indigo",icon:"print",onClick:u=>y(l.row.SRVH_DOCNO),dense:""},{default:s(()=>[a(B,null,{default:s(()=>[P("Print this order")]),_:1})]),_:2},1032,["onClick"])):W("",!0),l.row.detail.filter(u=>u.TSRVD_FLGSTS>0).length===0?(O(),x($,{key:2,flat:"",color:"red",icon:"delete",onClick:u=>e(l.row.SRVH_DOCNO),dense:""},{default:s(()=>[a(B,null,{default:s(()=>[P(ne(l.row.detail.filter(u=>u.TSRVD_FLGSTS>0).length>0?"Cannot delete processed order":"Delete this Order"),1)]),_:2},1024)]),_:2},1032,["onClick"])):W("",!0),l.row.detail.filter(u=>u.TSRVD_FLGSTS>0).length>0?(O(),x($,{key:3,flat:"",color:"cyan",icon:"visibility",onClick:u=>g(l.row),dense:""},{default:s(()=>[a(B,null,{default:s(()=>[P("View this Order")]),_:1})]),_:2},1032,["onClick"])):W("",!0),l.row.detail.filter(u=>u.TSRVD_FLGSTS==1).length===l.row.detail.length?(O(),x($,{key:4,flat:"",color:"indigo",icon:"check",onClick:u=>R(l.row),dense:""},{default:s(()=>[a(B,null,{default:s(()=>[P(ne(l.row.detail.filter(u=>u.TSRVD_FLGSTS>0).length!==l.row.detail.length?"Please wait until all item checked":"Proceed all item to service"),1)]),_:2},1024)]),_:2},1032,["onClick"])):W("",!0)]),_:2},1024)]),_:2},1032,["props"])]),_:1},8,["rows","columns","loading"])])])]))}};export{jl as default};
