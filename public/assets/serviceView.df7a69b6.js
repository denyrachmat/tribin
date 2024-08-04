import{Q as N}from"./QTooltip.776239ab.js";import{t as v,C as g,D as V,E as t,F as e,M as oe,O as B,J as u,$ as Q,X as ne,Q as R,Y as j,Z as ie,a as Y,c as ve,a5 as se,u as Ce,o as X,h as A,ab as he,d as De,a_ as Te,w as Ve,be as ee,g as pe,aI as Se,I as y,a0 as ye,av as ge,U as re,R as E,aZ as P,S as te,T as le,V as Re,P as K,W as we}from"./index.647454e3.js";import{Q as ae,b as be}from"./QSelect.4967bf7a.js";import{Q as ke,a as de}from"./QTable.e30bb904.js";import{Q as ue,a as ce}from"./QTd.4c4b99fd.js";import{u as J}from"./use-quasar.e10499fd.js";import{d as W}from"./date.13308228.js";import{api_web as F}from"./axios.9b9feaab.js";import{Q as Me,a as Ie,C as Ue}from"./ClosePopup.d7d5b508.js";import{Q as me,a as q,b as _e}from"./QItemLabel.fbbb30ae.js";import{Q as Oe}from"./QList.55b8810e.js";import{u as Z}from"./use-dialog-plugin-component.60d6770e.js";import{_ as Ne}from"./itemCreate.f4b1a5dd.js";import{Q as He}from"./QUploader.d56ec7cc.js";import{_ as $e}from"./serviceOprUpdateOrder.0a08f34c.js";import"./format.cd3c1f7f.js";import"./use-render-cache.3aae9b27.js";import"./QBtnGroup.cc4ab389.js";import"./QBadge.8d5036ab.js";import"./serviceOprItemAdd.f0badd89.js";import"./QInnerLoading.06f90f28.js";const Pe=u("div",{class:"text-h6"},"Create New Customer Data",-1),Qe={class:"row q-pb-md"},Le={class:"col"},Ae={class:"row q-pb-md"},qe={class:"col"},Ye={class:"col q-pl-md"},Ee={class:"row"},Fe={class:"col"},xe={__name:"customerView",setup(o){const{dialogRef:D,onDialogHide:T,onDialogOK:M,onDialogCancel:O}=Z(),p=J(),r=v({MCUS_CUSCD:"",MCUS_CUSNM:"",MCUS_CURCD:"IDR",MCUS_TAXREG:"-",MCUS_ADDR1:"",MCUS_TELNO:"",MCUS_PIC_NAME:"-",MCUS_PIC_TELNO:"-",MCUS_TYPE:1,MCUS_GROUP:"SERVICE",MCUS_EMAIL:""}),f=v(!1),b=()=>{p.dialog({title:"Confirmation",message:"Do you want to save this customer ?",cancel:!0,persistent:!0}).onOk(async()=>{f.value=!0,await F.post("customer",r.value).then(w=>{f.value=!1,M(w.data)}).catch(w=>{f.value=!1})})};return(w,c)=>(g(),V(ie,{ref_key:"dialogRef",ref:D,onHide:j(T),"transition-show":"slide-up","transition-hide":"slide-down","full-width":""},{default:t(()=>[e(oe,{class:"q-dialog-plugin bg-white q-pa-sm"},{default:t(()=>[e(B,null,{default:t(()=>[Pe]),_:1}),e(B,{class:"q-pa-sm"},{default:t(()=>[u("div",Qe,[u("div",Le,[e(Q,{label:"Customer Name",dense:"",modelValue:r.value.MCUS_CUSNM,"onUpdate:modelValue":c[0]||(c[0]=d=>r.value.MCUS_CUSNM=d),filled:""},null,8,["modelValue"])])]),u("div",Ae,[u("div",qe,[e(Q,{label:"Customer Email",dense:"",modelValue:r.value.MCUS_EMAIL,"onUpdate:modelValue":c[1]||(c[1]=d=>r.value.MCUS_EMAIL=d),filled:""},null,8,["modelValue"])]),u("div",Ye,[e(Q,{label:"Customer Phone",dense:"",modelValue:r.value.MCUS_TELNO,"onUpdate:modelValue":c[2]||(c[2]=d=>r.value.MCUS_TELNO=d),filled:"",mask:"####-####-####"},null,8,["modelValue"])])]),u("div",Ee,[u("div",Fe,[e(Q,{label:"Customer Address",dense:"",modelValue:r.value.MCUS_ADDR1,"onUpdate:modelValue":c[3]||(c[3]=d=>r.value.MCUS_ADDR1=d),filled:"",type:"textarea"},null,8,["modelValue"])])])]),_:1}),e(ne,{align:"right"},{default:t(()=>[e(R,{label:"OK",color:"primary",onClick:c[4]||(c[4]=d=>b()),loading:f.value},null,8,["loading"]),e(R,{flat:"",label:"Cancel",color:"red",onClick:j(O),loading:f.value},null,8,["onClick","loading"])]),_:1})]),_:1})]),_:1},8,["onHide"]))}},Ge={ratio:[String,Number]};function Ke(o,D){return Y(()=>{const T=Number(o.ratio||(D!==void 0?D.value:void 0));return isNaN(T)!==!0&&T>0?{paddingBottom:`${100/T}%`}:null})}const Be=1.7778;var je=ve({name:"QImg",props:{...Ge,src:String,srcset:String,sizes:String,alt:String,crossorigin:String,decoding:String,referrerpolicy:String,draggable:Boolean,loading:{type:String,default:"lazy"},loadingShowDelay:{type:[Number,String],default:0},fetchpriority:{type:String,default:"auto"},width:String,height:String,initialRatio:{type:[Number,String],default:Be},placeholderSrc:String,errorSrc:String,fit:{type:String,default:"cover"},position:{type:String,default:"50% 50%"},imgClass:String,imgStyle:Object,noSpinner:Boolean,noNativeMenu:Boolean,noTransition:Boolean,spinnerColor:String,spinnerSize:String},emits:["load","error"],setup(o,{slots:D,emit:T}){const M=v(o.initialRatio),O=Ke(o,M),p=pe(),{registerTimeout:r,removeTimeout:f}=se(),{registerTimeout:b,removeTimeout:w}=se(),c=Y(()=>o.placeholderSrc!==void 0?{src:o.placeholderSrc}:null),d=Y(()=>o.errorSrc!==void 0?{src:o.errorSrc,__qerror:!0}:null),_=[v(null),v(c.value)],h=v(0),H=v(!1),k=v(!1),a=Y(()=>`q-img q-img--${o.noNativeMenu===!0?"no-":""}menu`),C=Y(()=>({width:o.width,height:o.height})),n=Y(()=>`q-img__image ${o.imgClass!==void 0?o.imgClass+" ":""}q-img__image--with${o.noTransition===!0?"out":""}-transition q-img__image--`),l=Y(()=>({...o.imgStyle,objectFit:o.fit,objectPosition:o.position}));function x(){if(w(),o.loadingShowDelay===0){H.value=!0;return}b(()=>{H.value=!0},o.loadingShowDelay)}function L(){w(),H.value=!1}function I({target:s}){ee(p)===!1&&(f(),M.value=s.naturalHeight===0?.5:s.naturalWidth/s.naturalHeight,z(s,1))}function z(s,$){$===1e3||ee(p)===!0||(s.complete===!0?S(s):r(()=>{z(s,$+1)},50))}function S(s){ee(p)!==!0&&(h.value=h.value^1,_[h.value].value=null,L(),s.getAttribute("__qerror")!=="true"&&(k.value=!1),T("load",s.currentSrc||s.src))}function i(s){f(),L(),k.value=!0,_[h.value].value=d.value,_[h.value^1].value=c.value,T("error",s)}function m(s){const $=_[s].value,G={key:"img_"+s,class:n.value,style:l.value,alt:o.alt,crossorigin:o.crossorigin,decoding:o.decoding,referrerpolicy:o.referrerpolicy,height:o.height,width:o.width,loading:o.loading,fetchpriority:o.fetchpriority,"aria-hidden":"true",draggable:o.draggable,...$};return h.value===s?Object.assign(G,{class:G.class+"current",onLoad:I,onError:i}):G.class+="loaded",A("div",{class:"q-img__container absolute-full",key:"img"+s},A("img",G))}function U(){return H.value===!1?A("div",{key:"content",class:"q-img__content absolute-full q-anchor--skip"},De(D[k.value===!0?"error":"default"])):A("div",{key:"loading",class:"q-img__loading absolute-full flex flex-center"},D.loading!==void 0?D.loading():o.noSpinner===!0?void 0:[A(Te,{color:o.spinnerColor,size:o.spinnerSize})])}{let s=function(){Ve(()=>o.src||o.srcset||o.sizes?{src:o.src,srcset:o.srcset,sizes:o.sizes}:null,$=>{f(),k.value=!1,$===null?(L(),_[h.value^1].value=c.value):x(),_[h.value].value=$},{immediate:!0})};Ce.value===!0?X(s):s()}return()=>{const s=[];return O.value!==null&&s.push(A("div",{key:"filler",style:O.value})),_[0].value!==null&&s.push(m(0)),_[1].value!==null&&s.push(m(1)),s.push(A(he,{name:"q-transition--fade"},U)),A("div",{key:"main",class:a.value,style:C.value,role:"img","aria-label":o.alt},s)}}});const ze={class:"bg-white"},We={class:"row",style:{"min-height":"50vh","max-width":"90vh"}},Ze={class:"col"},Xe=u("div",{class:"text-h6"},"Preview Photo",-1),Je={__name:"uploadPhoto",props:{photo:String},emits:[...Z.emits],setup(o){const D=J(),T=v(""),M=o;X(()=>{M.photo!==""&&(T.value=M.photo)});const O=()=>{D.dialog({title:"Confirmation",message:"Do you want to remove this photo ?",cancel:!0,persistent:!0}).onOk(async()=>{w("")})},p=async d=>{const _=await r(d[0]);_&&(console.log(_),w(_))};function r(d){var _=new FileReader;return d&&_.readAsDataURL(d),new Promise((h,H)=>{_.onload=function(k){h(k.target.result)}})}const{dialogRef:f,onDialogHide:b,onDialogOK:w,onDialogCancel:c}=Z();return(d,_)=>(g(),V(ie,{ref_key:"dialogRef",ref:f,onHide:j(b)},{default:t(()=>[u("div",ze,[u("div",We,[u("div",Ze,[T.value?(g(),V(oe,{key:0},{default:t(()=>[e(B,null,{default:t(()=>[Xe]),_:1}),e(Se),e(B,null,{default:t(()=>[e(je,{src:T.value,style:{width:"80vh"}},null,8,["src"])]),_:1}),e(ne,{vertical:""},{default:t(()=>[e(R,{flat:"",onClick:_[0]||(_[0]=h=>O())},{default:t(()=>[y("Change Photo")]),_:1})]),_:1})]),_:1})):(g(),V(He,{key:1,class:"full-height",url:h=>p(h),label:"Upload Photo",color:"amber","text-color":"black",accept:"image/*",style:{"min-width":"500px"},"max-files":1,"auto-upload":"","send-raw":""},null,8,["url"]))])])])]),_:1},8,["onHide"]))}},et=u("div",{class:"text-h6"},"Create Order",-1),tt={class:"row q-pb-md"},lt={class:"col"},at={style:{border:"1px black solid","border-radius":"10px"}},ot=u("legend",{style:{"margin-left":"1em",padding:"0.2em 0.8em"}},[u("b",null,"Header")],-1),nt={class:"row"},it={class:"col"},st={class:"col q-pl-md"},rt={class:"row items-center justify-end"},dt={class:"row"},ut={class:"col"},ct=u("legend",{style:{"margin-left":"1em",padding:"0.2em 0.8em"}},[u("b",null,"Detail Items")],-1),mt={key:0,class:"row q-pb-sm"},_t={class:"col text-right"},fe={__name:"serviceCreateOrder",props:{header:Array,detail:Array,mode:String},setup(o){const{dialogRef:D,onDialogHide:T,onDialogOK:M,onDialogCancel:O}=Z(),p=J(),r=o;X(async()=>{r.header&&(await k(),await a(),f.value=r.header,c.value=r.detail,_.value=parseInt(r.header.SRVH_ISINT))});const f=v({SRVH_DOCNO:"",SRVH_ISSDT:W.formatDate(Date.now(),"YYYY-MM-DD"),SRVH_CUSCD:""}),b=v([]),w=v([]),c=v([]),d=v(!1),_=v(0),h=v(0),H=(S,i,m,U)=>{i(async()=>{U==="cust"&&(_.value==1?await k("connect_jos","MCUS_CGCON"):await k(S)),U==="item"&&await a(S)})},k=async(S,i="MCUS_CUSNM")=>{d.value=!0,await F.post("customer/searchAPI",{searchValue:S,searchCol:i}).then(m=>{d.value=!1,w.value=m.data.data}).catch(()=>{d.value=!1})},a=async S=>{d.value=!0,await F.post("item/searchAPI",{searchValue:S,isForServ:_.value==1?0:1,isITMCD:1,useCustomer:f.value.SRVH_CUSCD}).then(i=>{d.value=!1,b.value=i.data.data}).catch(()=>{d.value=!1})},C=()=>{c.value.push({TSRVD_ITMCD:"",TSRVD_LINE:c.value.length+1,TSRVD_QTY:1,TSRVD_CUSTRMK:"",TSRVD_PHOTO:""})},n=S=>{p.dialog({title:"Confirmation",message:`Do you want to delete this lines no ${S+1} ?`,cancel:!0,persistent:!0}).onOk(async()=>{c.value.splice(S,1)}).catch(i=>{p.notify({color:"red",message:"Something's wrong."})})},l=S=>{p.dialog({component:Ne,componentProps:{ItemCat:"SERVICE_ITEM",ItemType:3,listOpenField:["MITM_ITMCD","MITM_ITMNM","MITM_STKUOM"]}}).onOk(async i=>{console.log(i),await a(""),c.value[S].TSRVD_ITMCD=i.MITM_ITMNM})},x=()=>{p.dialog({title:"Confirmation",message:"Do you want to submit this data ?",cancel:!0,persistent:!0}).onOk(async()=>{d.value=!0,await F.post("servicesAdmin",{header:{...f.value,SRVH_ISINT:_.value},detail:c.value}).then(S=>{d.value=!1,M()})})},L=()=>{p.dialog({component:xe}).onOk(async S=>{console.log(S),await k(""),c.value[idx].SRVH_CUSCD=S.MCUS_CUSCD})},I=S=>{p.dialog({component:Je,componentProps:{photo:c.value[S].TSRVD_PHOTO}}).onOk(async i=>{console.log(i),i?c.value[S].TSRVD_PHOTO=i:c.value[S].TSRVD_PHOTO="",h.value=h.value+1,console.log(c.value[S])})},z=async S=>{S==1&&(f.value.SRVH_CUSCD="",w.value=[],await k("connect_jos","MCUS_CGCON"))};return(S,i)=>(g(),V(ie,{ref_key:"dialogRef",ref:D,onHide:j(T),"transition-show":"slide-up","transition-hide":"slide-down","full-width":"",persistent:""},{default:t(()=>[e(oe,{class:"q-dialog-plugin bg-white q-pa-sm"},{default:t(()=>[e(B,null,{default:t(()=>[et]),_:1}),e(B,{class:"q-pa-sm"},{default:t(()=>[u("div",tt,[u("div",lt,[e(ye,{modelValue:_.value,"onUpdate:modelValue":[i[0]||(i[0]=m=>_.value=m),i[1]||(i[1]=m=>z(m))],label:"Internal Service ?",color:"teal","true-value":1,"false-value":0,disable:d.value},null,8,["modelValue","disable"])])]),u("fieldset",at,[ot,u("div",nt,[u("div",it,[e(Q,{label:"SPK No",readonly:"",dense:"",modelValue:f.value.SRVH_DOCNO,"onUpdate:modelValue":i[2]||(i[2]=m=>f.value.SRVH_DOCNO=m),filled:""},null,8,["modelValue"])]),u("div",st,[e(Q,{filled:"",modelValue:f.value.SRVH_ISSDT,"onUpdate:modelValue":i[4]||(i[4]=m=>f.value.SRVH_ISSDT=m),dense:"",label:"Issue Date",loading:d.value,onClick:i[5]||(i[5]=m=>S.quotationIssueDate.qDateProxy.show()),mask:"####-##-##","fill-mask":"",hint:"Mask: YYYY-MM-DD",readonly:r.mode==="view"},{append:t(()=>[e(ge,{name:"event",class:"cursor-pointer",disable:r.mode==="view"},{default:t(()=>[e(Me,{cover:"","transition-show":"scale","transition-hide":"scale"},{default:t(()=>[e(Ie,{modelValue:f.value.SRVH_ISSDT,"onUpdate:modelValue":i[3]||(i[3]=m=>f.value.SRVH_ISSDT=m),mask:"YYYY-MM-DD"},{default:t(()=>[u("div",rt,[re(e(R,{label:"Close",color:"primary",flat:""},null,512),[[Ue]])])]),_:1},8,["modelValue"])]),_:1})]),_:1},8,["disable"])]),_:1},8,["modelValue","loading","readonly"])])]),u("div",dt,[u("div",ut,[e(ae,{dense:"",filled:"",label:"Customer Choose",modelValue:f.value.SRVH_CUSCD,"onUpdate:modelValue":[i[7]||(i[7]=m=>f.value.SRVH_CUSCD=m),i[9]||(i[9]=m=>c.value=[])],"use-input":"","input-debounce":"500",options:w.value,onFilter:i[8]||(i[8]=(m,U,s)=>H(m,U,s,"cust")),behavior:"dialog","option-label":"MCUS_CUSNM","option-value":"MCUS_CUSCD","emit-value":"","map-options":"",loading:d.value,readonly:r.mode==="view"},{after:t(()=>[e(R,{round:"",dense:"",flat:"",icon:"person_add",onClick:i[6]||(i[6]=m=>L()),color:"cyan"},{default:t(()=>[e(N,null,{default:t(()=>[y("Add new customer")]),_:1})]),_:1})]),_:1},8,["modelValue","options","loading","readonly"])])])]),(g(),E("fieldset",{style:{border:"1px black solid","border-radius":"10px",height:"35vh",overflow:"auto"},key:h.value},[ct,r.mode!=="view"?(g(),E("div",mt,[u("div",_t,[e(R,{flat:"",icon:"add",color:"blue",onClick:i[10]||(i[10]=m=>C())},{default:t(()=>[e(N,null,{default:t(()=>[y("Add lines")]),_:1})]),_:1})])])):P("",!0),e(Oe,{bordered:"",dense:""},{default:t(()=>[c.value.length>0?(g(!0),E(te,{key:0},le(c.value,(m,U)=>(g(),V(me,{key:U,class:"q-my-sm",dense:""},{default:t(()=>[e(q,{avatar:""},{default:t(()=>[e(Re,{"text-color":"blue"},{default:t(()=>[y(K(U+1),1)]),_:2},1024)]),_:2},1024),e(q,null,{default:t(()=>[e(_e,{class:"text-center"},{default:t(()=>[e(ae,{dense:"",filled:"",label:"Item Name",modelValue:m.TSRVD_ITMCD,"onUpdate:modelValue":s=>m.TSRVD_ITMCD=s,"use-input":"","input-debounce":"500",options:b.value,onFilter:i[11]||(i[11]=(s,$,G)=>H(s,$,G,"item")),behavior:"dialog","option-label":"MITM_ITMNMREAL","option-value":"MITM_ITMNM","emit-value":"","map-options":"",loading:d.value},null,8,["modelValue","onUpdate:modelValue","options","loading"])]),_:2},1024)]),_:2},1024),e(q,null,{default:t(()=>[e(Q,{label:"Qty",filled:"",dense:"",modelValue:m.TSRVD_QTY,"onUpdate:modelValue":s=>m.TSRVD_QTY=s},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1024),e(q,null,{default:t(()=>[e(Q,{label:"Problem",filled:"",dense:"",modelValue:m.TSRVD_CUSTRMK,"onUpdate:modelValue":s=>m.TSRVD_CUSTRMK=s},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1024),r.mode!=="view"?(g(),V(q,{key:0,side:""},{default:t(()=>[e(R,{icon:"delete",color:"red",flat:"",onClick:s=>n(U),dense:""},{default:t(()=>[e(N,null,{default:t(()=>[y("Delete line")]),_:1})]),_:2},1032,["onClick"])]),_:2},1024)):P("",!0),r.mode!=="view"?(g(),V(q,{key:1,side:""},{default:t(()=>[e(R,{icon:"library_add",color:"indigo",flat:"",onClick:s=>l(U),dense:""},{default:t(()=>[e(N,null,{default:t(()=>[y("Add new item")]),_:1})]),_:2},1032,["onClick"])]),_:2},1024)):P("",!0),r.mode!=="view"?(g(),V(q,{key:2,side:""},{default:t(()=>[e(R,{icon:"photo",color:m.TSRVD_PHOTO!=""?"blue":"orange",flat:"",onClick:s=>I(U),dense:""},{default:t(()=>[e(N,null,{default:t(()=>[y("Add photo")]),_:1})]),_:2},1032,["color","onClick"])]),_:2},1024)):P("",!0)]),_:2},1024))),128)):re((g(),V(me,{key:1,class:"q-my-sm",clickable:""},{default:t(()=>[e(q,null,{default:t(()=>[e(_e,null,{default:t(()=>[y(" No Items Added ")]),_:1})]),_:1})]),_:1})),[[we]])]),_:1})]))]),_:1}),e(ne,{align:"right"},{default:t(()=>[e(R,{label:"OK",color:"primary",onClick:i[12]||(i[12]=m=>x()),disable:d.value,loading:d.value},null,8,["disable","loading"]),e(R,{flat:"",label:"Cancel",color:"red",onClick:j(O),loading:d.value},null,8,["onClick","loading"])]),_:1})]),_:1})]),_:1},8,["onHide"]))}};const ft={class:"q-pa-md"},St={class:"row q-pb-md"},gt=u("div",{class:"col"},[u("span",{class:"text-h4"},"Receive Order ")],-1),vt={class:"col text-right"},Ct={class:"row q-pt-md"},ht={class:"col"},Dt={key:1},Et={__name:"serviceView",setup(o){const D=J(),T=v("SRVH_DOCNO"),M=v(""),O=v([]),p=v([{name:"SRVH_DOCNO",label:"SPK No",field:"SRVH_DOCNO",sortable:!0,align:"left"},{name:"MCUS_CUSNM",label:"Cust",field:"MCUS_CUSNM",sortable:!0,align:"left"},{name:"STAT",label:"Status",field:a=>k(a),sortable:!0,align:"left"},{name:"created_at",label:"Created Date",field:"created_at",sortable:!0,align:"left",format:a=>W.formatDate(new Date(a),"DD MMM YYYY")}]),r=v(!1),f=v(null);X(()=>{b(),f.value=setInterval(()=>{b()},1e4)});const b=async()=>{r.value=!0,await F.post("servicesAdmins/search",{searchBy:T.value,searchValue:M.value}).then(a=>{r.value=!1,O.value=a.data.data}).catch(a=>{r.value=!1})},w=()=>{D.dialog({component:fe}).onOk(async a=>{b()})},c=a=>{const C={SRVH_DOCNO:a.SRVH_DOCNO,SRVH_ISSDT:W.formatDate(a.SRVH_ISSDT,"YYYY-MM-DD"),SRVH_CUSCD:a.MCUS_CUSCD};let n=[];a.detail.map(l=>{n.push({id:l.id,TSRVD_ITMCD:l.TSRVD_ITMCD,TSRVD_LINE:l.TSRVD_LINE,TSRVD_QTY:l.TSRVD_QTY,TSRVD_CUSTRMK:l.TSRVD_CUSTRMK,TSRVD_REMARK:l.TSRVD_REMARK,TSRVD_FLGSTS:l.TSRVD_FLGSTS,listFixDet:l.list_fix_det})}),D.dialog({component:$e,componentProps:{header:C,detail:n,mode:a.detail.filter(l=>l.TSRVD_FLGSTS===1).length===a.detail.length?"approvecust":"view"}}).onOk(async l=>{b()})},d=a=>{window.open("https://joss.jatpowerindo.co.id/servicesAdmins/printInvoice/"+btoa(a),"_blank").focus()},_=a=>{const C={SRVH_DOCNO:a.SRVH_DOCNO,SRVH_ISSDT:W.formatDate(a.SRVH_ISSDT,"YYYY-MM-DD"),SRVH_CUSCD:a.MCUS_CUSCD};let n=[];a.detail.map(l=>{n.push({TSRVD_ITMCD:l.TSRVD_ITMCD,TSRVD_LINE:l.TSRVD_LINE,TSRVD_QTY:l.TSRVD_QTY,TSRVD_CUSTRMK:l.TSRVD_CUSTRMK})}),D.dialog({component:fe,componentProps:{header:C,detail:n}}).onOk(async l=>{b()})},h=a=>{D.dialog({title:"Confirmation",message:"Do you want to proceed to service ?",cancel:!0,persistent:!0}).onOk(async()=>{r.value=!0,await F.put(`servicesAdmins/updateDetByIDHead/${btoa(a.id)}`,{TSRVD_FLGSTS:2}).then(C=>{r.value=!1}).catch(C=>{r.value=!1})})},H=a=>{D.dialog({title:"Confirmation",message:"Are you sure want to delete this order ?",cancel:!0,persistent:!0}).onOk(async()=>{r.value=!0,await F.delete(`servicesAdmin/${btoa(a.SRVH_DOCNO)}`).then(C=>{r.value=!1}).catch(C=>{r.value=!1})})},k=a=>{const C=a.detail.filter(I=>I.TSRVD_FLGSTS==0),n=a.detail.filter(I=>I.TSRVD_FLGSTS==1),l=a.detail.filter(I=>I.TSRVD_FLGSTS==2),x=a.detail.filter(I=>I.TSRVD_FLGSTS==3),L=a.detail.filter(I=>I.TSRVD_FLGSTS==5);if(C.length==a.detail.length)return{color:"red",label:"No Price Added yet !",icon:"edit"};if(n.length>0&&n.length<a.detail.length)return{color:"warning",label:"Please Add item & price",icon:"payments"};if(L.length>0&&L.length==a.detail.length)return{color:"indigo",label:"Added Price Done, Waiting Manager Confirmation",icon:"price_check"};if(n.length>0&&n.length==a.detail.length)return{color:"green",label:"Manager has been approve, Waiting Cust. Confirmation",icon:"price_check"};if(l.length>0&&l.length>=a.detail.length)return{color:"cyan",label:"Cust. has been approved, continue to fix.",icon:"engineering"};if(x.length>0&&x.length===a.detail.length)return{color:"primary",label:"Fix has been done",icon:"fact_check"}};return(a,C)=>(g(),E("div",ft,[u("div",St,[gt,u("div",vt,[e(R,{icon:"add",color:"blue",onClick:w},{default:t(()=>[e(N,null,{default:t(()=>[y("Create New Order")]),_:1})]),_:1})])]),e(Se),u("div",Ct,[u("div",ht,[e(ke,{title:"Created Order",rows:O.value,columns:p.value,"row-key":"name",loading:r.value,dense:"",pagination:{rowsPerPage:20},class:"my-sticky-header-column-table"},{"top-right":t(()=>[e(ae,{outlined:"",modelValue:T.value,"onUpdate:modelValue":C[0]||(C[0]=n=>T.value=n),options:p.value,label:"Search Columns","option-value":"name","option-label":"label","emit-value":"",dense:"","map-options":""},null,8,["modelValue","options"]),e(Q,{borderless:"",dense:"",modelValue:M.value,"onUpdate:modelValue":[C[1]||(C[1]=n=>M.value=n),C[2]||(C[2]=n=>a.dataQuo())],placeholder:"Search",outlined:"",debounce:"1000"},{append:t(()=>[e(ge,{name:"search"})]),_:1},8,["modelValue"])]),header:t(n=>[e(ue,{props:n},{default:t(()=>[(g(!0),E(te,null,le(n.cols,l=>(g(),V(de,{key:l.name,props:n},{default:t(()=>[y(K(l.label),1)]),_:2},1032,["props"]))),128)),e(de,{"auto-width":""},{default:t(()=>[y("Action")]),_:1})]),_:2},1032,["props"])]),body:t(n=>[e(ue,{props:n},{default:t(()=>[(g(!0),E(te,null,le(n.cols,l=>(g(),V(ce,{key:l.name,props:n},{default:t(()=>[l.name==="STAT"?(g(),V(be,{key:0,clickable:"",color:l.value.color,"text-color":"white",icon:l.value.icon},{default:t(()=>[y(K(l.value.label),1)]),_:2},1032,["color","icon"])):(g(),E("span",Dt,K(l.value),1))]),_:2},1032,["props"]))),128)),e(ce,{"auto-width":""},{default:t(()=>[n.row.detail.filter(l=>l.TSRVD_FLGSTS>0).length===0?(g(),V(R,{key:0,flat:"",color:"orange",icon:"edit",onClick:l=>_(n.row),dense:""},{default:t(()=>[e(N,null,{default:t(()=>[y("Edit this Order")]),_:1})]),_:2},1032,["onClick"])):P("",!0),n.row.detail.filter(l=>l.TSRVD_FLGSTS>0).length===n.row.detail.length?(g(),V(R,{key:1,flat:"",color:"indigo",icon:"print",onClick:l=>d(n.row.SRVH_DOCNO),dense:""},{default:t(()=>[e(N,null,{default:t(()=>[y("Print Estimation Price")]),_:1})]),_:2},1032,["onClick"])):P("",!0),n.row.detail.filter(l=>l.TSRVD_FLGSTS>0).length===0?(g(),V(R,{key:2,flat:"",color:"red",icon:"delete",onClick:l=>H(n.row.SRVH_DOCNO),dense:""},{default:t(()=>[e(N,null,{default:t(()=>[y(K(n.row.detail.filter(l=>l.TSRVD_FLGSTS>0).length>0?"Cannot delete processed order":"Delete this Order"),1)]),_:2},1024)]),_:2},1032,["onClick"])):P("",!0),n.row.detail.filter(l=>l.TSRVD_FLGSTS>0).length>0?(g(),V(R,{key:3,flat:"",color:"cyan",icon:"visibility",onClick:l=>c(n.row),dense:""},{default:t(()=>[e(N,null,{default:t(()=>[y("View this Order")]),_:1})]),_:2},1032,["onClick"])):P("",!0),n.row.detail.filter(l=>l.TSRVD_FLGSTS==1).length===n.row.detail.length?(g(),V(R,{key:4,flat:"",color:"indigo",icon:"check",onClick:l=>h(n.row),dense:""},{default:t(()=>[e(N,null,{default:t(()=>[y(K(n.row.detail.filter(l=>l.TSRVD_FLGSTS>0).length!==n.row.detail.length?"Please wait until all item checked":"Proceed all item to service"),1)]),_:2},1024)]),_:2},1032,["onClick"])):P("",!0)]),_:2},1024)]),_:2},1032,["props"])]),_:1},8,["rows","columns","loading"])])])]))}};export{Et as default};
