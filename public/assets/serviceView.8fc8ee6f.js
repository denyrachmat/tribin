import{Q as Y}from"./QTooltip.ee3fa4ea.js";import{t as M,o as ue,C as q,D as $,E as n,F as a,M as _e,O as J,J as y,$ as H,X as ge,Q as N,Y as te,Z as pe,a as F,c as De,a5 as Oe,u as Ze,h as R,ab as Je,d as et,be as Ce,w as He,bf as me,g as Se,aw as tt,ax as lt,az as at,aP as Be,ac as Qe,ah as ot,ai as nt,ak as it,p as st,bg as rt,j as ut,bh as dt,aX as ct,aW as vt,an as we,aV as mt,aY as Ye,I as P,U as qe,R as ee,a_ as X,S as be,T as ye,V as ft,P as ne,W as _t}from"./index.8180fff2.js";import{u as se,a as de,l as re,x as gt,y as Ne,z as pt,Q as St,b as $e,c as Z,d as xe,k as ht,m as Pe,A as Ct}from"./QTable.c887845b.js";import{Q as Ae,a as Le}from"./QTd.d4c9857e.js";import{d as fe}from"./date.a5e3b0c9.js";import{api_web as K}from"./axios.425acea2.js";import{Q as bt,a as yt,C as Tt}from"./ClosePopup.75cfc801.js";import{_ as Dt}from"./serviceOprUpdateOrder.b6827025.js";import"./use-render-cache.3aae9b27.js";import"./QBtnGroup.91413fa8.js";import"./QBadge.da46d14b.js";import"./serviceOprItemAdd.0a817034.js";const wt=y("div",{class:"text-h6"},"Create Item Master",-1),Mt={class:"row"},kt={class:"col"},Vt={class:"col q-pl-md"},Rt={class:"row q-pt-md"},Ut={class:"col"},It={class:"col q-pl-md"},Ft={class:"row q-pt-md"},Ot={class:"col"},qt={class:"col q-pl-md"},Nt={class:"row q-pt-md"},$t={class:"col"},xt={__name:"itemCreate",props:{ItemCat:String},setup(t){const{dialogRef:T,onDialogHide:f,onDialogOK:c,onDialogCancel:g}=se(),h=de(),i=M({MITM_ITMCD:"",MITM_ITMNM:"",MITM_STKUOM:"",MITM_ITMTYPE:1,MITM_BRAND:"",MITM_MODEL:"",MITM_SPEC:"",MITM_ITMCAT:"",MITM_COACD:"",MITM_ITMCAT:""}),C=M(!1),U=M([]),I=M([]),p=t;ue(()=>{b(),i.value.MITM_ITMCAT=p.ItemCat});const S=(e,m,o,_)=>{m(async()=>{await K.post("item/getListCoasAPI",{search:e}).then(l=>{I.value=l.data})})},w=()=>{h.dialog({title:"Confirmation",message:"Do you want to save this item ?",cancel:!0,persistent:!0}).onOk(async()=>{await K.post("item",i.value).then(e=>{c(e.data.data.value)})})},b=async()=>{C.value=!0,await K.get("item/formAPI").then(e=>{C.value=!1,U.value=e.data.uoms,I.value=e.data.coas}).catch(()=>{C.value=!1})};return(e,m)=>(q(),$(pe,{ref_key:"dialogRef",ref:T,onHide:te(f),"transition-show":"slide-up","transition-hide":"slide-down","full-width":"",persistent:""},{default:n(()=>[a(_e,{class:"q-dialog-plugin bg-white q-pa-sm"},{default:n(()=>[a(J,null,{default:n(()=>[wt]),_:1}),a(J,{class:"q-pa-sm"},{default:n(()=>[y("div",Mt,[y("div",kt,[a(H,{label:"Item Code",dense:"",modelValue:i.value.MITM_ITMCD,"onUpdate:modelValue":m[0]||(m[0]=o=>i.value.MITM_ITMCD=o),filled:""},null,8,["modelValue"])]),y("div",Vt,[a(H,{label:"Item Name",dense:"",modelValue:i.value.MITM_ITMNM,"onUpdate:modelValue":m[1]||(m[1]=o=>i.value.MITM_ITMNM=o),filled:""},null,8,["modelValue"])])]),y("div",Rt,[y("div",Ut,[a(re,{dense:"",filled:"",label:"UOM",modelValue:i.value.MITM_STKUOM,"onUpdate:modelValue":m[2]||(m[2]=o=>i.value.MITM_STKUOM=o),options:U.value,behavior:"dialog","option-label":"MUOM_UOMNM","option-value":"MUOM_UOMCD","emit-value":"","map-options":"",loading:C.value},null,8,["modelValue","options","loading"])]),y("div",It,[a(H,{label:"Item Brand",dense:"",modelValue:i.value.MITM_BRAND,"onUpdate:modelValue":m[3]||(m[3]=o=>i.value.MITM_BRAND=o),filled:""},null,8,["modelValue"])])]),y("div",Ft,[y("div",Ot,[a(H,{label:"Item Model",dense:"",modelValue:i.value.MITM_MODEL,"onUpdate:modelValue":m[4]||(m[4]=o=>i.value.MITM_MODEL=o),filled:""},null,8,["modelValue"])]),y("div",qt,[a(H,{label:"Item Specification",dense:"",modelValue:i.value.MITM_SPEC,"onUpdate:modelValue":m[5]||(m[5]=o=>i.value.MITM_SPEC=o),filled:""},null,8,["modelValue"])])]),y("div",Nt,[y("div",$t,[a(re,{dense:"",filled:"",label:"COA",modelValue:i.value.MITM_COACD,"onUpdate:modelValue":m[6]||(m[6]=o=>i.value.MITM_COACD=o),options:I.value,"use-input":"",behavior:"dialog","option-label":"MCOA_COANM","option-value":"MCOA_COACD",onFilter:m[7]||(m[7]=(o,_,l)=>S(o,_,l)),"emit-value":"","map-options":"",loading:C.value},null,8,["modelValue","options","loading"])])])]),_:1}),a(ge,{align:"right"},{default:n(()=>[a(N,{label:"OK",color:"primary",onClick:m[8]||(m[8]=o=>w())}),a(N,{flat:"",label:"Cancel",color:"red",onClick:te(g)},null,8,["onClick"])]),_:1})]),_:1})]),_:1},8,["onHide"]))}},Pt=y("div",{class:"text-h6"},"Create New Customer Data",-1),At={class:"row q-pb-md"},Lt={class:"col"},zt={class:"row q-pb-md"},Et={class:"col"},Ht={class:"col q-pl-md"},Bt={class:"row"},Qt={class:"col"},Yt={__name:"customerView",setup(t){const{dialogRef:T,onDialogHide:f,onDialogOK:c,onDialogCancel:g}=se(),h=de(),i=M({MCUS_CUSCD:"",MCUS_CUSNM:"",MCUS_CURCD:"IDR",MCUS_TAXREG:"-",MCUS_ADDR1:"",MCUS_TELNO:"",MCUS_PIC_NAME:"-",MCUS_PIC_TELNO:"-",MCUS_TYPE:1,MCUS_GROUP:"SERVICE",MCUS_EMAIL:""}),C=M(!1),U=()=>{h.dialog({title:"Confirmation",message:"Do you want to save this customer ?",cancel:!0,persistent:!0}).onOk(async()=>{C.value=!0,await K.post("customer",i.value).then(I=>{C.value=!1,c(I.data)}).catch(I=>{C.value=!1})})};return(I,p)=>(q(),$(pe,{ref_key:"dialogRef",ref:T,onHide:te(f),"transition-show":"slide-up","transition-hide":"slide-down","full-width":""},{default:n(()=>[a(_e,{class:"q-dialog-plugin bg-white q-pa-sm"},{default:n(()=>[a(J,null,{default:n(()=>[Pt]),_:1}),a(J,{class:"q-pa-sm"},{default:n(()=>[y("div",At,[y("div",Lt,[a(H,{label:"Customer Name",dense:"",modelValue:i.value.MCUS_CUSNM,"onUpdate:modelValue":p[0]||(p[0]=S=>i.value.MCUS_CUSNM=S),filled:""},null,8,["modelValue"])])]),y("div",zt,[y("div",Et,[a(H,{label:"Customer Email",dense:"",modelValue:i.value.MCUS_EMAIL,"onUpdate:modelValue":p[1]||(p[1]=S=>i.value.MCUS_EMAIL=S),filled:""},null,8,["modelValue"])]),y("div",Ht,[a(H,{label:"Customer Phone",dense:"",modelValue:i.value.MCUS_TELNO,"onUpdate:modelValue":p[2]||(p[2]=S=>i.value.MCUS_TELNO=S),filled:"",mask:"####-####-####"},null,8,["modelValue"])])]),y("div",Bt,[y("div",Qt,[a(H,{label:"Customer Address",dense:"",modelValue:i.value.MCUS_ADDR1,"onUpdate:modelValue":p[3]||(p[3]=S=>i.value.MCUS_ADDR1=S),filled:"",type:"textarea"},null,8,["modelValue"])])])]),_:1}),a(ge,{align:"right"},{default:n(()=>[a(N,{label:"OK",color:"primary",onClick:p[4]||(p[4]=S=>U()),loading:C.value},null,8,["loading"]),a(N,{flat:"",label:"Cancel",color:"red",onClick:te(g),loading:C.value},null,8,["onClick","loading"])]),_:1})]),_:1})]),_:1},8,["onHide"]))}},jt={ratio:[String,Number]};function Kt(t,T){return F(()=>{const f=Number(t.ratio||(T!==void 0?T.value:void 0));return isNaN(f)!==!0&&f>0?{paddingBottom:`${100/f}%`}:null})}const Gt=1.7778;var Wt=De({name:"QImg",props:{...jt,src:String,srcset:String,sizes:String,alt:String,crossorigin:String,decoding:String,referrerpolicy:String,draggable:Boolean,loading:{type:String,default:"lazy"},loadingShowDelay:{type:[Number,String],default:0},fetchpriority:{type:String,default:"auto"},width:String,height:String,initialRatio:{type:[Number,String],default:Gt},placeholderSrc:String,errorSrc:String,fit:{type:String,default:"cover"},position:{type:String,default:"50% 50%"},imgClass:String,imgStyle:Object,noSpinner:Boolean,noNativeMenu:Boolean,noTransition:Boolean,spinnerColor:String,spinnerSize:String},emits:["load","error"],setup(t,{slots:T,emit:f}){const c=M(t.initialRatio),g=Kt(t,c),h=Se(),{registerTimeout:i,removeTimeout:C}=Oe(),{registerTimeout:U,removeTimeout:I}=Oe(),p=F(()=>t.placeholderSrc!==void 0?{src:t.placeholderSrc}:null),S=F(()=>t.errorSrc!==void 0?{src:t.errorSrc,__qerror:!0}:null),w=[M(null),M(p.value)],b=M(0),e=M(!1),m=M(!1),o=F(()=>`q-img q-img--${t.noNativeMenu===!0?"no-":""}menu`),_=F(()=>({width:t.width,height:t.height})),l=F(()=>`q-img__image ${t.imgClass!==void 0?t.imgClass+" ":""}q-img__image--with${t.noTransition===!0?"out":""}-transition q-img__image--`),s=F(()=>({...t.imgStyle,objectFit:t.fit,objectPosition:t.position}));function A(){if(I(),t.loadingShowDelay===0){e.value=!0;return}U(()=>{e.value=!0},t.loadingShowDelay)}function x(){I(),e.value=!1}function r({target:d}){me(h)===!1&&(C(),c.value=d.naturalHeight===0?.5:d.naturalWidth/d.naturalHeight,v(d,1))}function v(d,L){L===1e3||me(h)===!0||(d.complete===!0?V(d):i(()=>{v(d,L+1)},50))}function V(d){me(h)!==!0&&(b.value=b.value^1,w[b.value].value=null,x(),d.getAttribute("__qerror")!=="true"&&(m.value=!1),f("load",d.currentSrc||d.src))}function D(d){C(),x(),m.value=!0,w[b.value].value=S.value,w[b.value^1].value=p.value,f("error",d)}function k(d){const L=w[d].value,Q={key:"img_"+d,class:l.value,style:s.value,alt:t.alt,crossorigin:t.crossorigin,decoding:t.decoding,referrerpolicy:t.referrerpolicy,height:t.height,width:t.width,loading:t.loading,fetchpriority:t.fetchpriority,"aria-hidden":"true",draggable:t.draggable,...L};return b.value===d?Object.assign(Q,{class:Q.class+"current",onLoad:r,onError:D}):Q.class+="loaded",R("div",{class:"q-img__container absolute-full",key:"img"+d},R("img",Q))}function B(){return e.value===!1?R("div",{key:"content",class:"q-img__content absolute-full q-anchor--skip"},et(T[m.value===!0?"error":"default"])):R("div",{key:"loading",class:"q-img__loading absolute-full flex flex-center"},T.loading!==void 0?T.loading():t.noSpinner===!0?void 0:[R(Ce,{color:t.spinnerColor,size:t.spinnerSize})])}{let d=function(){He(()=>t.src||t.srcset||t.sizes?{src:t.src,srcset:t.srcset,sizes:t.sizes}:null,L=>{C(),m.value=!1,L===null?(x(),w[b.value^1].value=p.value):A(),w[b.value].value=L},{immediate:!0})};Ze.value===!0?ue(d):d()}return()=>{const d=[];return g.value!==null&&d.push(R("div",{key:"filler",style:g.value})),w[0].value!==null&&d.push(k(0)),w[1].value!==null&&d.push(k(1)),d.push(R(Je,{name:"q-transition--fade"},B)),R("div",{key:"main",class:o.value,style:_.value,role:"img","aria-label":t.alt},d)}}});const Xt={...tt,min:{type:Number,default:0},max:{type:Number,default:100},color:String,centerColor:String,trackColor:String,fontSize:String,rounded:Boolean,thickness:{type:Number,default:.2,validator:t=>t>=0&&t<=1},angle:{type:Number,default:0},showValue:Boolean,reverse:Boolean,instantFeedback:Boolean},Te=50,je=2*Te,Ke=je*Math.PI,Zt=Math.round(Ke*1e3)/1e3;var Jt=De({name:"QCircularProgress",props:{...Xt,value:{type:Number,default:0},animationSpeed:{type:[String,Number],default:600},indeterminate:Boolean},setup(t,{slots:T}){const{proxy:{$q:f}}=Se(),c=lt(t),g=F(()=>{const b=(f.lang.rtl===!0?-1:1)*t.angle;return{transform:t.reverse!==(f.lang.rtl===!0)?`scale3d(-1, 1, 1) rotate3d(0, 0, 1, ${-90-b}deg)`:`rotate3d(0, 0, 1, ${b-90}deg)`}}),h=F(()=>t.instantFeedback!==!0&&t.indeterminate!==!0?{transition:`stroke-dashoffset ${t.animationSpeed}ms ease 0s, stroke ${t.animationSpeed}ms ease`}:""),i=F(()=>je/(1-t.thickness/2)),C=F(()=>`${i.value/2} ${i.value/2} ${i.value} ${i.value}`),U=F(()=>gt(t.value,t.min,t.max)),I=F(()=>t.max-t.min),p=F(()=>t.thickness/2*i.value),S=F(()=>{const b=(t.max-U.value)/I.value,e=t.rounded===!0&&U.value<t.max&&b<.25?p.value/2*(1-b/.25):0;return Ke*b+e});function w({thickness:b,offset:e,color:m,cls:o,rounded:_}){return R("circle",{class:"q-circular-progress__"+o+(m!==void 0?` text-${m}`:""),style:h.value,fill:"transparent",stroke:"currentColor","stroke-width":b,"stroke-dasharray":Zt,"stroke-dashoffset":e,"stroke-linecap":_,cx:i.value,cy:i.value,r:Te})}return()=>{const b=[];t.centerColor!==void 0&&t.centerColor!=="transparent"&&b.push(R("circle",{class:`q-circular-progress__center text-${t.centerColor}`,fill:"currentColor",r:Te-p.value/2,cx:i.value,cy:i.value})),t.trackColor!==void 0&&t.trackColor!=="transparent"&&b.push(w({cls:"track",thickness:p.value,offset:0,color:t.trackColor})),b.push(w({cls:"circle",thickness:p.value,offset:S.value,color:t.color,rounded:t.rounded===!0?"round":void 0}));const e=[R("svg",{class:"q-circular-progress__svg",style:g.value,viewBox:C.value,"aria-hidden":"true"},b)];return t.showValue===!0&&e.push(R("div",{class:"q-circular-progress__text absolute-full row flex-center content-center",style:{fontSize:t.fontSize}},T.default!==void 0?T.default():[R("div",U.value)])),R("div",{class:`q-circular-progress q-circular-progress--${t.indeterminate===!0?"in":""}determinate`,style:c.value,role:"progressbar","aria-valuemin":t.min,"aria-valuemax":t.max,"aria-valuenow":t.indeterminate===!0?void 0:U.value},at(T.internal,e))}}});function oe(t,T,f,c){const g=[];return t.forEach(h=>{c(h)===!0?g.push(h):T.push({failedPropValidation:f,file:h})}),g}function ve(t){t&&t.dataTransfer&&(t.dataTransfer.dropEffect="copy"),Qe(t)}const el={multiple:Boolean,accept:String,capture:String,maxFileSize:[Number,String],maxTotalSize:[Number,String],maxFiles:[Number,String],filter:Function},tl=["rejected"];function ll({editable:t,dnd:T,getFileInput:f,addFilesToQueue:c}){const{props:g,emit:h,proxy:i}=Se(),C=M(null),U=F(()=>g.accept!==void 0?g.accept.split(",").map(l=>(l=l.trim(),l==="*"?"*/":(l.endsWith("/*")&&(l=l.slice(0,l.length-1)),l.toUpperCase()))):null),I=F(()=>parseInt(g.maxFiles,10)),p=F(()=>parseInt(g.maxTotalSize,10));function S(l){if(t.value)if(l!==Object(l)&&(l={target:null}),l.target!==null&&l.target.matches('input[type="file"]')===!0)l.clientX===0&&l.clientY===0&&Be(l);else{const s=f();s&&s!==l.target&&s.click(l)}}function w(l){t.value&&l&&c(null,l)}function b(l,s,A,x){let r=Array.from(s||l.target.files);const v=[],V=()=>{v.length!==0&&h("rejected",v)};if(g.accept!==void 0&&U.value.indexOf("*/")===-1&&(r=oe(r,v,"accept",D=>U.value.some(k=>D.type.toUpperCase().startsWith(k)||D.name.toUpperCase().endsWith(k))),r.length===0))return V();if(g.maxFileSize!==void 0){const D=parseInt(g.maxFileSize,10);if(r=oe(r,v,"max-file-size",k=>k.size<=D),r.length===0)return V()}if(g.multiple!==!0&&r.length!==0&&(r=[r[0]]),r.forEach(D=>{D.__key=D.webkitRelativePath+D.lastModified+D.name+D.size}),x===!0){const D=A.map(k=>k.__key);r=oe(r,v,"duplicate",k=>D.includes(k.__key)===!1)}if(r.length===0)return V();if(g.maxTotalSize!==void 0){let D=x===!0?A.reduce((k,B)=>k+B.size,0):0;if(r=oe(r,v,"max-total-size",k=>(D+=k.size,D<=p.value)),r.length===0)return V()}if(typeof g.filter=="function"){const D=g.filter(r);r=oe(r,v,"filter",k=>D.includes(k))}if(g.maxFiles!==void 0){let D=x===!0?A.length:0;if(r=oe(r,v,"max-files",()=>(D++,D<=I.value)),r.length===0)return V()}if(V(),r.length!==0)return r}function e(l){ve(l),T.value!==!0&&(T.value=!0)}function m(l){Qe(l),(l.relatedTarget!==null||ot.is.safari!==!0?l.relatedTarget!==C.value:document.elementsFromPoint(l.clientX,l.clientY).includes(C.value)===!1)===!0&&(T.value=!1)}function o(l){ve(l);const s=l.dataTransfer.files;s.length!==0&&c(null,s),T.value=!1}function _(l){if(T.value===!0)return R("div",{ref:C,class:`q-${l}__dnd absolute-full`,onDragenter:ve,onDragover:ve,onDragleave:m,onDrop:o})}return Object.assign(i,{pickFiles:S,addFiles:w}),{pickFiles:S,addFiles:w,onDragover:e,onDragleave:m,processFiles:b,getDndNode:_,maxFilesNumber:I,maxTotalSizeNumber:p}}function ze(t){return(t*100).toFixed(2)+"%"}const al={...nt,...el,label:String,color:String,textColor:String,square:Boolean,flat:Boolean,bordered:Boolean,noThumbnails:Boolean,autoUpload:Boolean,hideUploadBtn:Boolean,disable:Boolean,readonly:Boolean},Ge=[...tl,"start","finish","added","removed"];function ol(t,T){const f=Se(),{props:c,slots:g,emit:h,proxy:i}=f,{$q:C}=i,U=it(c,C);function I(u,O,z){if(u.__status=O,O==="idle"){u.__uploaded=0,u.__progress=0,u.__sizeLabel=Ne(u.size),u.__progressLabel="0.00%";return}if(O==="failed"){i.$forceUpdate();return}u.__uploaded=O==="uploaded"?u.size:z,u.__progress=O==="uploaded"?1:Math.min(.9999,u.__uploaded/u.size),u.__progressLabel=ze(u.__progress),i.$forceUpdate()}const p=F(()=>c.disable!==!0&&c.readonly!==!0),S=M(!1),w=M(null),b=M(null),e={files:M([]),queuedFiles:M([]),uploadedFiles:M([]),uploadedSize:M(0),updateFileStatus:I,isAlive:()=>me(f)===!1},{pickFiles:m,addFiles:o,onDragover:_,onDragleave:l,processFiles:s,getDndNode:A,maxFilesNumber:x,maxTotalSizeNumber:r}=ll({editable:p,dnd:S,getFileInput:Ve,addFilesToQueue:Re});Object.assign(e,t({props:c,slots:g,emit:h,helpers:e,exposeApi:u=>{Object.assign(e,u)}})),e.isBusy===void 0&&(e.isBusy=M(!1));const v=M(0),V=F(()=>v.value===0?0:e.uploadedSize.value/v.value),D=F(()=>ze(V.value)),k=F(()=>Ne(v.value)),B=F(()=>p.value===!0&&e.isUploading.value!==!0&&(c.multiple===!0||e.queuedFiles.value.length===0)&&(c.maxFiles===void 0||e.files.value.length<x.value)&&(c.maxTotalSize===void 0||v.value<r.value)),d=F(()=>p.value===!0&&e.isBusy.value!==!0&&e.isUploading.value!==!0&&e.queuedFiles.value.length!==0);st(rt,Ie);const L=F(()=>"q-uploader column no-wrap"+(U.value===!0?" q-uploader--dark q-dark":"")+(c.bordered===!0?" q-uploader--bordered":"")+(c.square===!0?" q-uploader--square no-border-radius":"")+(c.flat===!0?" q-uploader--flat no-shadow":"")+(c.disable===!0?" disabled q-uploader--disable":"")+(S.value===!0?" q-uploader--dnd":"")),Q=F(()=>"q-uploader__header"+(c.color!==void 0?` bg-${c.color}`:"")+(c.textColor!==void 0?` text-${c.textColor}`:""));He(e.isUploading,(u,O)=>{O===!1&&u===!0?h("start"):O===!0&&u===!1&&h("finish")});function le(){c.disable===!1&&(e.abort(),e.uploadedSize.value=0,v.value=0,ke(),e.files.value=[],e.queuedFiles.value=[],e.uploadedFiles.value=[])}function j(){c.disable===!1&&Me(["uploaded"],()=>{e.uploadedFiles.value=[]})}function ce(){Me(["idle","failed"],({size:u})=>{v.value-=u,e.queuedFiles.value=[]})}function Me(u,O){if(c.disable===!0)return;const z={files:[],size:0},G=e.files.value.filter(E=>u.indexOf(E.__status)===-1?!0:(z.size+=E.size,z.files.push(E),E.__img!==void 0&&window.URL.revokeObjectURL(E.__img.src),!1));z.files.length!==0&&(e.files.value=G,O(z),h("removed",z.files))}function he(u){c.disable||(u.__status==="uploaded"?e.uploadedFiles.value=e.uploadedFiles.value.filter(O=>O.__key!==u.__key):u.__status==="uploading"?u.__abort():v.value-=u.size,e.files.value=e.files.value.filter(O=>O.__key!==u.__key?!0:(O.__img!==void 0&&window.URL.revokeObjectURL(O.__img.src),!1)),e.queuedFiles.value=e.queuedFiles.value.filter(O=>O.__key!==u.__key),h("removed",[u]))}function ke(){e.files.value.forEach(u=>{u.__img!==void 0&&window.URL.revokeObjectURL(u.__img.src)})}function Ve(){return b.value||w.value.getElementsByClassName("q-uploader__input")[0]}function Re(u,O){const z=s(u,O,e.files.value,!0),G=Ve();G!=null&&(G.value=""),z!==void 0&&(z.forEach(E=>{if(e.updateFileStatus(E,"idle"),v.value+=E.size,c.noThumbnails!==!0&&E.type.toUpperCase().startsWith("IMAGE")){const Fe=new Image;Fe.src=window.URL.createObjectURL(E),E.__img=Fe}}),e.files.value=e.files.value.concat(z),e.queuedFiles.value=e.queuedFiles.value.concat(z),h("added",z),c.autoUpload===!0&&e.upload())}function Ue(){d.value===!0&&e.upload()}function ie(u,O,z){if(u===!0){const G={type:"a",key:O,icon:C.iconSet.uploader[O],flat:!0,dense:!0};let E;return O==="add"?(G.onClick=m,E=Ie):G.onClick=z,R(N,G,E)}}function Ie(){return R("input",{ref:b,class:"q-uploader__input overflow-hidden absolute-full",tabindex:-1,type:"file",title:"",accept:c.accept,multiple:c.multiple===!0?"multiple":void 0,capture:c.capture,onMousedown:Be,onClick:m,onChange:Re})}function We(){return g.header!==void 0?g.header(ae):[R("div",{class:"q-uploader__header-content column"},[R("div",{class:"flex flex-center no-wrap q-gutter-xs"},[ie(e.queuedFiles.value.length!==0,"removeQueue",ce),ie(e.uploadedFiles.value.length!==0,"removeUploaded",j),e.isUploading.value===!0?R(Ce,{class:"q-uploader__spinner"}):null,R("div",{class:"col column justify-center"},[c.label!==void 0?R("div",{class:"q-uploader__title"},[c.label]):null,R("div",{class:"q-uploader__subtitle"},[k.value+" / "+D.value])]),ie(B.value,"add"),ie(c.hideUploadBtn===!1&&d.value===!0,"upload",e.upload),ie(e.isUploading.value,"clear",e.abort)])])]}function Xe(){return g.list!==void 0?g.list(ae):e.files.value.map(u=>R("div",{key:u.__key,class:"q-uploader__file relative-position"+(c.noThumbnails!==!0&&u.__img!==void 0?" q-uploader__file--img":"")+(u.__status==="failed"?" q-uploader__file--failed":u.__status==="uploaded"?" q-uploader__file--uploaded":""),style:c.noThumbnails!==!0&&u.__img!==void 0?{backgroundImage:'url("'+u.__img.src+'")'}:null},[R("div",{class:"q-uploader__file-header row flex-center no-wrap"},[u.__status==="failed"?R(we,{class:"q-uploader__file-status",name:C.iconSet.type.negative,color:"negative"}):null,R("div",{class:"q-uploader__file-header-content col"},[R("div",{class:"q-uploader__title"},[u.name]),R("div",{class:"q-uploader__subtitle row items-center no-wrap"},[u.__sizeLabel+" / "+u.__progressLabel])]),u.__status==="uploading"?R(Jt,{value:u.__progress,min:0,max:1,indeterminate:u.__progress===0}):R(N,{round:!0,dense:!0,flat:!0,icon:C.iconSet.uploader[u.__status==="uploaded"?"done":"clear"],onClick:()=>{he(u)}})])]))}ut(()=>{e.isUploading.value===!0&&e.abort(),e.files.value.length!==0&&ke()});const ae={};for(const u in e)dt(e[u])===!0?ct(ae,u,()=>e[u].value):ae[u]=e[u];return Object.assign(ae,{upload:Ue,reset:le,removeUploadedFiles:j,removeQueuedFiles:ce,removeFile:he,pickFiles:m,addFiles:o}),vt(ae,{canAddFiles:()=>B.value,canUpload:()=>d.value,uploadSizeLabel:()=>k.value,uploadProgressLabel:()=>D.value}),T({...e,upload:Ue,reset:le,removeUploadedFiles:j,removeQueuedFiles:ce,removeFile:he,pickFiles:m,addFiles:o,canAddFiles:B,canUpload:d,uploadSizeLabel:k,uploadProgressLabel:D}),()=>{const u=[R("div",{class:Q.value},We()),R("div",{class:"q-uploader__list scroll"},Xe()),A("uploader")];e.isBusy.value===!0&&u.push(R("div",{class:"q-uploader__overlay absolute-full flex flex-center"},[R(Ce)]));const O={ref:w,class:L.value};return B.value===!0&&Object.assign(O,{onDragover:_,onDragleave:l}),R("div",O,u)}}const nl=pt(Ge);var il=({name:t,props:T,emits:f,injectPlugin:c})=>De({name:t,props:{...al,...T},emits:mt(f)===!0?{...nl,...f}:[...Ge,...f],setup(g,{expose:h}){return ol(c,h)}});function W(t){return typeof t=="function"?t:()=>t}const sl="QUploader",rl={url:[Function,String],method:{type:[Function,String],default:"POST"},fieldName:{type:[Function,String],default:()=>t=>t.name},headers:[Function,Array],formFields:[Function,Array],withCredentials:[Function,Boolean],sendRaw:[Function,Boolean],batch:[Function,Boolean],factory:Function},ul=["factoryFailed","uploaded","failed","uploading"];function dl({props:t,emit:T,helpers:f}){const c=M([]),g=M([]),h=M(0),i=F(()=>({url:W(t.url),method:W(t.method),headers:W(t.headers),formFields:W(t.formFields),fieldName:W(t.fieldName),withCredentials:W(t.withCredentials),sendRaw:W(t.sendRaw),batch:W(t.batch)})),C=F(()=>h.value>0),U=F(()=>g.value.length!==0);let I;function p(){c.value.forEach(e=>{e.abort()}),g.value.length!==0&&(I=!0)}function S(){const e=f.queuedFiles.value.slice(0);f.queuedFiles.value=[],i.value.batch(e)?w(e):e.forEach(m=>{w([m])})}function w(e){if(h.value++,typeof t.factory!="function"){b(e,{});return}const m=t.factory(e);if(!m)T("factoryFailed",new Error("QUploader: factory() does not return properly"),e),h.value--;else if(typeof m.catch=="function"&&typeof m.then=="function"){g.value.push(m);const o=_=>{f.isAlive()===!0&&(g.value=g.value.filter(l=>l!==m),g.value.length===0&&(I=!1),f.queuedFiles.value=f.queuedFiles.value.concat(e),e.forEach(l=>{f.updateFileStatus(l,"failed")}),T("factoryFailed",_,e),h.value--)};m.then(_=>{I===!0?o(new Error("Aborted")):f.isAlive()===!0&&(g.value=g.value.filter(l=>l!==m),b(e,_))}).catch(o)}else b(e,m||{})}function b(e,m){const o=new FormData,_=new XMLHttpRequest,l=(d,L)=>m[d]!==void 0?W(m[d])(L):i.value[d](L),s=l("url",e);if(!s){console.error("q-uploader: invalid or no URL specified"),h.value--;return}const A=l("formFields",e);A!==void 0&&A.forEach(d=>{o.append(d.name,d.value)});let x=0,r=0,v=0,V=0,D;_.upload.addEventListener("progress",d=>{if(D===!0)return;const L=Math.min(V,d.loaded);f.uploadedSize.value+=L-v,v=L;let Q=v-r;for(let le=x;Q>0&&le<e.length;le++){const j=e[le];if(Q>j.size)Q-=j.size,x++,r+=j.size,f.updateFileStatus(j,"uploading",j.size);else{f.updateFileStatus(j,"uploading",Q);return}}},!1),_.onreadystatechange=()=>{_.readyState<4||(_.status&&_.status<400?(f.uploadedFiles.value=f.uploadedFiles.value.concat(e),e.forEach(d=>{f.updateFileStatus(d,"uploaded")}),T("uploaded",{files:e,xhr:_})):(D=!0,f.uploadedSize.value-=v,f.queuedFiles.value=f.queuedFiles.value.concat(e),e.forEach(d=>{f.updateFileStatus(d,"failed")}),T("failed",{files:e,xhr:_})),h.value--,c.value=c.value.filter(d=>d!==_))},_.open(l("method",e),s),l("withCredentials",e)===!0&&(_.withCredentials=!0);const k=l("headers",e);k!==void 0&&k.forEach(d=>{_.setRequestHeader(d.name,d.value)});const B=l("sendRaw",e);e.forEach(d=>{f.updateFileStatus(d,"uploading",0),B!==!0&&o.append(l("fieldName",d),d,d.name),d.xhr=_,d.__abort=()=>{_.abort()},V+=d.size}),T("uploading",{files:e,xhr:_}),c.value.push(_),B===!0?_.send(new Blob(e)):_.send(o)}return{isUploading:C,isBusy:U,abort:p,upload:S}}var cl={name:sl,props:rl,emits:ul,injectPlugin:dl},vl=il(cl);const ml={class:"bg-white"},fl={class:"row",style:{"min-height":"50vh","max-width":"80vh"}},_l={class:"col"},gl=y("div",{class:"text-h6"},"Preview Photo",-1),pl={__name:"uploadPhoto",props:{photo:String},emits:[...se.emits],setup(t){const T=de(),f=M(""),c=t;ue(()=>{c.photo!==""&&(f.value=c.photo)});const g=()=>{T.dialog({title:"Confirmation",message:"Do you want to remove this photo ?",cancel:!0,persistent:!0}).onOk(async()=>{I("")})},h=async S=>{const w=await i(S[0]);w&&(console.log(w),I(w))};function i(S){var w=new FileReader;return S&&w.readAsDataURL(S),new Promise((b,e)=>{w.onload=function(m){b(m.target.result)}})}const{dialogRef:C,onDialogHide:U,onDialogOK:I,onDialogCancel:p}=se();return(S,w)=>(q(),$(pe,{ref_key:"dialogRef",ref:C,onHide:te(U)},{default:n(()=>[y("div",ml,[y("div",fl,[y("div",_l,[f.value?(q(),$(_e,{key:0},{default:n(()=>[a(J,null,{default:n(()=>[gl]),_:1}),a(Ye),a(J,null,{default:n(()=>[a(Wt,{src:f.value,style:{width:"80vh"}},null,8,["src"])]),_:1}),a(ge,{vertical:""},{default:n(()=>[a(N,{flat:"",onClick:w[0]||(w[0]=b=>g())},{default:n(()=>[P("Change Photo")]),_:1})]),_:1})]),_:1})):(q(),$(vl,{key:1,class:"full-height",url:b=>h(b),label:"Upload Photo",color:"amber","text-color":"black",accept:"image/*",style:{"min-width":"500px"},"max-files":1,"auto-upload":"","send-raw":""},null,8,["url"]))])])])]),_:1},8,["onHide"]))}},Sl=y("div",{class:"text-h6"},"Create Order",-1),hl={style:{border:"1px black solid","border-radius":"10px"}},Cl=y("legend",{style:{"margin-left":"1em",padding:"0.2em 0.8em"}},[y("b",null,"Header")],-1),bl={class:"row"},yl={class:"col"},Tl={class:"col q-pl-md"},Dl={class:"row items-center justify-end"},wl={class:"row"},Ml={class:"col"},kl=y("legend",{style:{"margin-left":"1em",padding:"0.2em 0.8em"}},[y("b",null,"Detail Items")],-1),Vl={key:0,class:"row q-pb-sm"},Rl={class:"col text-right"},Ee={__name:"serviceCreateOrder",props:{header:Array,detail:Array,mode:String},setup(t){const{dialogRef:T,onDialogHide:f,onDialogOK:c,onDialogCancel:g}=se(),h=de(),i=t;ue(async()=>{i.header&&(await e(),await m(),C.value=i.header,p.value=i.detail)});const C=M({SRVH_DOCNO:"",SRVH_ISSDT:fe.formatDate(Date.now(),"YYYY-MM-DD"),SRVH_CUSCD:""}),U=M([]),I=M([]),p=M([]),S=M(!1),w=M(0),b=(r,v,V,D)=>{v(async()=>{D==="cust"&&await e(r),D==="item"&&await m(r)})},e=async r=>{S.value=!0,await K.post("customer/searchAPI",{searchValue:r}).then(v=>{S.value=!1,I.value=v.data.data}).catch(()=>{S.value=!1})},m=async r=>{S.value=!0,await K.post("item/searchAPI",{searchValue:r}).then(v=>{S.value=!1,U.value=v.data.data}).catch(()=>{S.value=!1})},o=()=>{p.value.push({TSRVD_ITMCD:"",TSRVD_LINE:p.value.length+1,TSRVD_QTY:1,TSRVD_CUSTRMK:"",TSRVD_PHOTO:""})},_=r=>{h.dialog({title:"Confirmation",message:`Do you want to delete this lines no ${r+1} ?`,cancel:!0,persistent:!0}).onOk(async()=>{p.value.splice(r,1)}).catch(v=>{h.notify({color:"red",message:"Something's wrong."})})},l=r=>{h.dialog({component:xt,componentProps:{ItemCat:"SERVICE_ITEMM"}}).onOk(async v=>{await m(""),p.value[r].TSRVD_ITMCD=v.MITM_ITMNM})},s=()=>{h.dialog({title:"Confirmation",message:"Do you want to submit this data ?",cancel:!0,persistent:!0}).onOk(async()=>{S.value=!0,await K.post("servicesAdmin",{header:C.value,detail:p.value}).then(r=>{S.value=!1,c()})})},A=()=>{h.dialog({component:Yt}).onOk(async r=>{console.log(r),await e(""),p.value[idx].SRVH_CUSCD=r.MCUS_CUSCD})},x=r=>{h.dialog({component:pl,componentProps:{photo:p.value[r].TSRVD_PHOTO}}).onOk(async v=>{console.log(v),v?p.value[r].TSRVD_PHOTO=v:p.value[r].TSRVD_PHOTO="",w.value=w.value+1,console.log(p.value[r])})};return(r,v)=>(q(),$(pe,{ref_key:"dialogRef",ref:T,onHide:te(f),"transition-show":"slide-up","transition-hide":"slide-down","full-width":"",persistent:""},{default:n(()=>[a(_e,{class:"q-dialog-plugin bg-white q-pa-sm"},{default:n(()=>[a(J,null,{default:n(()=>[Sl]),_:1}),a(J,{class:"q-pa-sm"},{default:n(()=>[y("fieldset",hl,[Cl,y("div",bl,[y("div",yl,[a(H,{label:"SPK No",readonly:"",dense:"",modelValue:C.value.SRVH_DOCNO,"onUpdate:modelValue":v[0]||(v[0]=V=>C.value.SRVH_DOCNO=V),filled:""},null,8,["modelValue"])]),y("div",Tl,[a(H,{filled:"",modelValue:C.value.SRVH_ISSDT,"onUpdate:modelValue":v[2]||(v[2]=V=>C.value.SRVH_ISSDT=V),dense:"",label:"Issue Date",loading:S.value,onClick:v[3]||(v[3]=V=>r.quotationIssueDate.qDateProxy.show()),mask:"####-##-##","fill-mask":"",hint:"Mask: YYYY-MM-DD",readonly:i.mode==="view"},{append:n(()=>[a(we,{name:"event",class:"cursor-pointer",disable:i.mode==="view"},{default:n(()=>[a(bt,{cover:"","transition-show":"scale","transition-hide":"scale"},{default:n(()=>[a(yt,{modelValue:C.value.SRVH_ISSDT,"onUpdate:modelValue":v[1]||(v[1]=V=>C.value.SRVH_ISSDT=V),mask:"YYYY-MM-DD"},{default:n(()=>[y("div",Dl,[qe(a(N,{label:"Close",color:"primary",flat:""},null,512),[[Tt]])])]),_:1},8,["modelValue"])]),_:1})]),_:1},8,["disable"])]),_:1},8,["modelValue","loading","readonly"])])]),y("div",wl,[y("div",Ml,[a(re,{dense:"",filled:"",label:"Customer Choose",modelValue:C.value.SRVH_CUSCD,"onUpdate:modelValue":v[5]||(v[5]=V=>C.value.SRVH_CUSCD=V),"use-input":"","input-debounce":"500",options:I.value,onFilter:v[6]||(v[6]=(V,D,k)=>b(V,D,k,"cust")),behavior:"dialog","option-label":"MCUS_CUSNM","option-value":"MCUS_CUSCD","emit-value":"","map-options":"",loading:S.value,readonly:i.mode==="view"},{after:n(()=>[a(N,{round:"",dense:"",flat:"",icon:"person_add",onClick:v[4]||(v[4]=V=>A()),color:"cyan"},{default:n(()=>[a(Y,null,{default:n(()=>[P("Add new customer")]),_:1})]),_:1})]),_:1},8,["modelValue","options","loading","readonly"])])])]),(q(),ee("fieldset",{style:{border:"1px black solid","border-radius":"10px",height:"35vh",overflow:"auto"},key:w.value},[kl,i.mode!=="view"?(q(),ee("div",Vl,[y("div",Rl,[a(N,{flat:"",icon:"add",color:"blue",onClick:v[7]||(v[7]=V=>o())},{default:n(()=>[a(Y,null,{default:n(()=>[P("Add lines")]),_:1})]),_:1})])])):X("",!0),a(St,{bordered:"",dense:""},{default:n(()=>[p.value.length>0?(q(!0),ee(be,{key:0},ye(p.value,(V,D)=>(q(),$($e,{key:D,class:"q-my-sm",dense:""},{default:n(()=>[a(Z,{avatar:""},{default:n(()=>[a(ft,{"text-color":"blue"},{default:n(()=>[P(ne(D+1),1)]),_:2},1024)]),_:2},1024),a(Z,null,{default:n(()=>[a(xe,null,{default:n(()=>[a(re,{dense:"",filled:"",label:"Item Name",modelValue:V.TSRVD_ITMCD,"onUpdate:modelValue":k=>V.TSRVD_ITMCD=k,"use-input":"","input-debounce":"500",options:U.value,onFilter:v[8]||(v[8]=(k,B,d)=>b(k,B,d,"item")),behavior:"dialog","option-label":"MITM_ITMNM","option-value":"MITM_ITMNM","emit-value":"","map-options":"",loading:S.value},null,8,["modelValue","onUpdate:modelValue","options","loading"])]),_:2},1024)]),_:2},1024),a(Z,null,{default:n(()=>[a(H,{label:"Qty",filled:"",dense:"",modelValue:V.TSRVD_QTY,"onUpdate:modelValue":k=>V.TSRVD_QTY=k},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1024),a(Z,null,{default:n(()=>[a(H,{label:"Problem",filled:"",dense:"",modelValue:V.TSRVD_CUSTRMK,"onUpdate:modelValue":k=>V.TSRVD_CUSTRMK=k},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1024),i.mode!=="view"?(q(),$(Z,{key:0,side:""},{default:n(()=>[a(N,{icon:"delete",color:"red",flat:"",onClick:k=>_(D),dense:""},{default:n(()=>[a(Y,null,{default:n(()=>[P("Delete line")]),_:1})]),_:2},1032,["onClick"])]),_:2},1024)):X("",!0),i.mode!=="view"?(q(),$(Z,{key:1,side:""},{default:n(()=>[a(N,{icon:"library_add",color:"indigo",flat:"",onClick:k=>l(D),dense:""},{default:n(()=>[a(Y,null,{default:n(()=>[P("Add new item")]),_:1})]),_:2},1032,["onClick"])]),_:2},1024)):X("",!0),i.mode!=="view"?(q(),$(Z,{key:2,side:""},{default:n(()=>[a(N,{icon:"photo",color:V.TSRVD_PHOTO!=""?"blue":"orange",flat:"",onClick:k=>x(D),dense:""},{default:n(()=>[a(Y,null,{default:n(()=>[P("Add photo")]),_:1})]),_:2},1032,["color","onClick"])]),_:2},1024)):X("",!0)]),_:2},1024))),128)):qe((q(),$($e,{key:1,class:"q-my-sm",clickable:""},{default:n(()=>[a(Z,null,{default:n(()=>[a(xe,null,{default:n(()=>[P(" No Items Added ")]),_:1})]),_:1})]),_:1})),[[_t]])]),_:1})]))]),_:1}),a(ge,{align:"right"},{default:n(()=>[a(N,{label:"OK",color:"primary",onClick:v[9]||(v[9]=V=>s()),disable:S.value,loading:S.value},null,8,["disable","loading"]),a(N,{flat:"",label:"Cancel",color:"red",onClick:te(g),loading:S.value},null,8,["onClick","loading"])]),_:1})]),_:1})]),_:1},8,["onHide"]))}};const Ul={class:"q-pa-md"},Il={class:"row q-pb-md"},Fl=y("div",{class:"col"},[y("span",{class:"text-h4"},"Receive Order ")],-1),Ol={class:"col text-right"},ql={class:"row q-pt-md"},Nl={class:"col"},$l={key:1},Gl={__name:"serviceView",setup(t){const T=de(),f=M("SRVH_DOCNO"),c=M(""),g=M([]),h=M([{name:"SRVH_DOCNO",label:"SPK No",field:"SRVH_DOCNO",sortable:!0,align:"left"},{name:"MCUS_CUSNM",label:"Cust",field:"MCUS_CUSNM",sortable:!0,align:"left"},{name:"STAT",label:"Status",field:o=>m(o),sortable:!0,align:"left"},{name:"created_at",label:"Created Date",field:"created_at",sortable:!0,align:"left",format:o=>fe.formatDate(new Date(o),"DD MMM YYYY")}]),i=M(!1),C=M(null);ue(()=>{U(),C.value=setInterval(()=>{U()},1e4)});const U=async()=>{i.value=!0,await K.post("servicesAdmins/search",{searchBy:f.value,searchValue:c.value}).then(o=>{i.value=!1,g.value=o.data.data}).catch(o=>{i.value=!1})},I=()=>{T.dialog({component:Ee}).onOk(async o=>{U()})},p=o=>{const _={SRVH_DOCNO:o.SRVH_DOCNO,SRVH_ISSDT:fe.formatDate(o.SRVH_ISSDT,"YYYY-MM-DD"),SRVH_CUSCD:o.MCUS_CUSCD};let l=[];o.detail.map(s=>{l.push({id:s.id,TSRVD_ITMCD:s.TSRVD_ITMCD,TSRVD_LINE:s.TSRVD_LINE,TSRVD_QTY:s.TSRVD_QTY,TSRVD_CUSTRMK:s.TSRVD_CUSTRMK,TSRVD_REMARK:s.TSRVD_REMARK,TSRVD_FLGSTS:s.TSRVD_FLGSTS,listFixDet:s.list_fix_det})}),T.dialog({component:Dt,componentProps:{header:_,detail:l,mode:o.detail.filter(s=>s.TSRVD_FLGSTS===1).length===o.detail.length?"approvecust":"view"}}).onOk(async s=>{U()})},S=o=>{window.open("https://joss.jatpowerindo.co.id/servicesAdmins/printInvoice/"+btoa(o),"_blank").focus()},w=o=>{const _={SRVH_DOCNO:o.SRVH_DOCNO,SRVH_ISSDT:fe.formatDate(o.SRVH_ISSDT,"YYYY-MM-DD"),SRVH_CUSCD:o.MCUS_CUSCD};let l=[];o.detail.map(s=>{l.push({TSRVD_ITMCD:s.TSRVD_ITMCD,TSRVD_LINE:s.TSRVD_LINE,TSRVD_QTY:s.TSRVD_QTY,TSRVD_CUSTRMK:s.TSRVD_CUSTRMK})}),T.dialog({component:Ee,componentProps:{header:_,detail:l}}).onOk(async s=>{U()})},b=o=>{T.dialog({title:"Confirmation",message:"Do you want to proceed to service ?",cancel:!0,persistent:!0}).onOk(async()=>{i.value=!0,await K.put(`servicesAdmins/updateDetByIDHead/${btoa(o.id)}`,{TSRVD_FLGSTS:2}).then(_=>{i.value=!1}).catch(_=>{i.value=!1})})},e=o=>{T.dialog({title:"Confirmation",message:"Are you sure want to delete this order ?",cancel:!0,persistent:!0}).onOk(async()=>{i.value=!0,await K.delete(`servicesAdmin/${btoa(o.SRVH_DOCNO)}`).then(_=>{i.value=!1}).catch(_=>{i.value=!1})})},m=o=>{const _=o.detail.filter(r=>r.TSRVD_FLGSTS==0),l=o.detail.filter(r=>r.TSRVD_FLGSTS==1),s=o.detail.filter(r=>r.TSRVD_FLGSTS==2),A=o.detail.filter(r=>r.TSRVD_FLGSTS==3),x=o.detail.filter(r=>r.TSRVD_FLGSTS==5);if(_.length==o.detail.length)return{color:"red",label:"No Price Added yet !",icon:"edit"};if(l.length>0&&l.length<o.detail.length)return{color:"warning",label:"Please Add item & price",icon:"payments"};if(x.length>0&&x.length==o.detail.length)return{color:"indigo",label:"Added Price Done, Waiting Manager Confirmation",icon:"price_check"};if(l.length>0&&l.length==o.detail.length)return{color:"green",label:"Manager has been approve, Waiting Cust. Confirmation",icon:"price_check"};if(s.length>0&&s.length>=o.detail.length)return{color:"cyan",label:"Cust. has been approved, continue to fix.",icon:"engineering"};if(A.length>0&&A.length===o.detail.length)return{color:"primary",label:"Fix has been done",icon:"fact_check"}};return(o,_)=>(q(),ee("div",Ul,[y("div",Il,[Fl,y("div",Ol,[a(N,{icon:"add",color:"blue",onClick:I},{default:n(()=>[a(Y,null,{default:n(()=>[P("Create New Order")]),_:1})]),_:1})])]),a(Ye),y("div",ql,[y("div",Nl,[a(ht,{title:"Created Order",rows:g.value,columns:h.value,"row-key":"name",loading:i.value,dense:"",pagination:{rowsPerPage:20},class:"my-sticky-header-column-table"},{"top-right":n(()=>[a(re,{outlined:"",modelValue:f.value,"onUpdate:modelValue":_[0]||(_[0]=l=>f.value=l),options:h.value,label:"Search Columns","option-value":"name","option-label":"label","emit-value":"",dense:"","map-options":""},null,8,["modelValue","options"]),a(H,{borderless:"",dense:"",modelValue:c.value,"onUpdate:modelValue":[_[1]||(_[1]=l=>c.value=l),_[2]||(_[2]=l=>o.dataQuo())],placeholder:"Search",outlined:"",debounce:"1000"},{append:n(()=>[a(we,{name:"search"})]),_:1},8,["modelValue"])]),header:n(l=>[a(Ae,{props:l},{default:n(()=>[(q(!0),ee(be,null,ye(l.cols,s=>(q(),$(Pe,{key:s.name,props:l},{default:n(()=>[P(ne(s.label),1)]),_:2},1032,["props"]))),128)),a(Pe,{"auto-width":""},{default:n(()=>[P("Action")]),_:1})]),_:2},1032,["props"])]),body:n(l=>[a(Ae,{props:l},{default:n(()=>[(q(!0),ee(be,null,ye(l.cols,s=>(q(),$(Le,{key:s.name,props:l},{default:n(()=>[s.name==="STAT"?(q(),$(Ct,{key:0,clickable:"",color:s.value.color,"text-color":"white",icon:s.value.icon},{default:n(()=>[P(ne(s.value.label),1)]),_:2},1032,["color","icon"])):(q(),ee("span",$l,ne(s.value),1))]),_:2},1032,["props"]))),128)),a(Le,{"auto-width":""},{default:n(()=>[l.row.detail.filter(s=>s.TSRVD_FLGSTS>0).length===0?(q(),$(N,{key:0,flat:"",color:"orange",icon:"edit",onClick:s=>w(l.row),dense:""},{default:n(()=>[a(Y,null,{default:n(()=>[P("Edit this Order")]),_:1})]),_:2},1032,["onClick"])):X("",!0),l.row.detail.filter(s=>s.TSRVD_FLGSTS>0).length===l.row.detail.length?(q(),$(N,{key:1,flat:"",color:"indigo",icon:"print",onClick:s=>S(l.row.SRVH_DOCNO),dense:""},{default:n(()=>[a(Y,null,{default:n(()=>[P("Print this order")]),_:1})]),_:2},1032,["onClick"])):X("",!0),l.row.detail.filter(s=>s.TSRVD_FLGSTS>0).length===0?(q(),$(N,{key:2,flat:"",color:"red",icon:"delete",onClick:s=>e(l.row.SRVH_DOCNO),dense:""},{default:n(()=>[a(Y,null,{default:n(()=>[P(ne(l.row.detail.filter(s=>s.TSRVD_FLGSTS>0).length>0?"Cannot delete processed order":"Delete this Order"),1)]),_:2},1024)]),_:2},1032,["onClick"])):X("",!0),l.row.detail.filter(s=>s.TSRVD_FLGSTS>0).length>0?(q(),$(N,{key:3,flat:"",color:"cyan",icon:"visibility",onClick:s=>p(l.row),dense:""},{default:n(()=>[a(Y,null,{default:n(()=>[P("View this Order")]),_:1})]),_:2},1032,["onClick"])):X("",!0),l.row.detail.filter(s=>s.TSRVD_FLGSTS==1).length===l.row.detail.length?(q(),$(N,{key:4,flat:"",color:"indigo",icon:"check",onClick:s=>b(l.row),dense:""},{default:n(()=>[a(Y,null,{default:n(()=>[P(ne(l.row.detail.filter(s=>s.TSRVD_FLGSTS>0).length!==l.row.detail.length?"Please wait until all item checked":"Proceed all item to service"),1)]),_:2},1024)]),_:2},1032,["onClick"])):X("",!0)]),_:2},1024)]),_:2},1032,["props"])]),_:1},8,["rows","columns","loading"])])])]))}};export{Gl as default};
