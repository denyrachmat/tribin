import{Q as U}from"./QTooltip.b50a6b71.js";import{a as A,c as ve,t as h,a5 as oe,u as he,o as W,h as L,ab as Ce,d as De,a_ as Te,w as Ve,be as Z,g as pe,C as _,D as T,E as e,Y as J,Z as me,J as f,M as fe,F as t,O as z,aY as _e,Q as R,I as D,X as Se,a0 as ye,$ as K,at as ge,U as ne,R as F,aZ as P,S as X,T as ee,V as Re,P as E,W as we}from"./index.bd1472cc.js";import{c as te,Q as ie,a as Y,b as se,f as be}from"./QSelect.01cca00c.js";import{Q as ke,a as re}from"./QTable.c6d944ba.js";import{Q as de,a as ue}from"./QTd.e99bd9f1.js";import{u as ae}from"./format.9a90dc8d.js";import{d as j}from"./date.b81b277e.js";import{api_web as G}from"./axios.7916642a.js";import{Q as Ie,a as Me,C as Oe}from"./ClosePopup.29fd7a3e.js";import{Q as Ue}from"./QList.3c9936cd.js";import{u as le}from"./use-dialog-plugin-component.f89c511a.js";import{_ as Ne}from"./itemCreate.5b7dc59c.js";import{_ as He}from"./customerView.e1a9c3da.js";import{Q as Qe}from"./QUploader.67320cd6.js";import{_ as Pe}from"./serviceOprUpdateOrder.3b8bd350.js";import"./use-render-cache.3aae9b27.js";import"./QBtnGroup.51609a49.js";import"./QBadge.0721b7bf.js";import"./serviceOprItemAdd.0130a8d5.js";import"./QInnerLoading.46ae837d.js";const $e={ratio:[String,Number]};function Le(o,V){return A(()=>{const p=Number(o.ratio||(V!==void 0?V.value:void 0));return isNaN(p)!==!0&&p>0?{paddingBottom:`${100/p}%`}:null})}const Ye=1.7778;var Ae=ve({name:"QImg",props:{...$e,src:String,srcset:String,sizes:String,alt:String,crossorigin:String,decoding:String,referrerpolicy:String,draggable:Boolean,loading:{type:String,default:"lazy"},loadingShowDelay:{type:[Number,String],default:0},fetchpriority:{type:String,default:"auto"},width:String,height:String,initialRatio:{type:[Number,String],default:Ye},placeholderSrc:String,errorSrc:String,fit:{type:String,default:"cover"},position:{type:String,default:"50% 50%"},imgClass:String,imgStyle:Object,noSpinner:Boolean,noNativeMenu:Boolean,noTransition:Boolean,spinnerColor:String,spinnerSize:String},emits:["load","error"],setup(o,{slots:V,emit:p}){const M=h(o.initialRatio),H=Le(o,M),y=pe(),{registerTimeout:u,removeTimeout:g}=oe(),{registerTimeout:k,removeTimeout:O}=oe(),S=A(()=>o.placeholderSrc!==void 0?{src:o.placeholderSrc}:null),m=A(()=>o.errorSrc!==void 0?{src:o.errorSrc,__qerror:!0}:null),d=[h(null),h(S.value)],C=h(0),N=h(!1),w=h(!1),a=A(()=>`q-img q-img--${o.noNativeMenu===!0?"no-":""}menu`),v=A(()=>({width:o.width,height:o.height})),n=A(()=>`q-img__image ${o.imgClass!==void 0?o.imgClass+" ":""}q-img__image--with${o.noTransition===!0?"out":""}-transition q-img__image--`),l=A(()=>({...o.imgStyle,objectFit:o.fit,objectPosition:o.position}));function q(){if(O(),o.loadingShowDelay===0){N.value=!0;return}k(()=>{N.value=!0},o.loadingShowDelay)}function $(){O(),N.value=!1}function b({target:s}){Z(y)===!1&&(g(),M.value=s.naturalHeight===0?.5:s.naturalWidth/s.naturalHeight,B(s,1))}function B(s,Q){Q===1e3||Z(y)===!0||(s.complete===!0?c(s):u(()=>{B(s,Q+1)},50))}function c(s){Z(y)!==!0&&(C.value=C.value^1,d[C.value].value=null,$(),s.getAttribute("__qerror")!=="true"&&(w.value=!1),p("load",s.currentSrc||s.src))}function i(s){g(),$(),w.value=!0,d[C.value].value=m.value,d[C.value^1].value=S.value,p("error",s)}function r(s){const Q=d[s].value,x={key:"img_"+s,class:n.value,style:l.value,alt:o.alt,crossorigin:o.crossorigin,decoding:o.decoding,referrerpolicy:o.referrerpolicy,height:o.height,width:o.width,loading:o.loading,fetchpriority:o.fetchpriority,"aria-hidden":"true",draggable:o.draggable,...Q};return C.value===s?Object.assign(x,{class:x.class+"current",onLoad:b,onError:i}):x.class+="loaded",L("div",{class:"q-img__container absolute-full",key:"img"+s},L("img",x))}function I(){return N.value===!1?L("div",{key:"content",class:"q-img__content absolute-full q-anchor--skip"},De(V[w.value===!0?"error":"default"])):L("div",{key:"loading",class:"q-img__loading absolute-full flex flex-center"},V.loading!==void 0?V.loading():o.noSpinner===!0?void 0:[L(Te,{color:o.spinnerColor,size:o.spinnerSize})])}{let s=function(){Ve(()=>o.src||o.srcset||o.sizes?{src:o.src,srcset:o.srcset,sizes:o.sizes}:null,Q=>{g(),w.value=!1,Q===null?($(),d[C.value^1].value=S.value):q(),d[C.value].value=Q},{immediate:!0})};he.value===!0?W(s):s()}return()=>{const s=[];return H.value!==null&&s.push(L("div",{key:"filler",style:H.value})),d[0].value!==null&&s.push(r(0)),d[1].value!==null&&s.push(r(1)),s.push(L(Ce,{name:"q-transition--fade"},I)),L("div",{key:"main",class:a.value,style:v.value,role:"img","aria-label":o.alt},s)}}});const Fe={class:"bg-white"},qe={class:"row",style:{"min-height":"50vh","max-width":"90vh"}},xe={class:"col"},Ee=f("div",{class:"text-h6"},"Preview Photo",-1),Ge={__name:"uploadPhoto",props:{photo:String},emits:[...le.emits],setup(o){const V=ae(),p=h(""),M=o;W(()=>{M.photo!==""&&(p.value=M.photo)});const H=()=>{V.dialog({title:"Confirmation",message:"Do you want to remove this photo ?",cancel:!0,persistent:!0}).onOk(async()=>{O("")})},y=async m=>{const d=await u(m[0]);d&&(console.log(d),O(d))};function u(m){var d=new FileReader;return m&&d.readAsDataURL(m),new Promise((C,N)=>{d.onload=function(w){C(w.target.result)}})}const{dialogRef:g,onDialogHide:k,onDialogOK:O,onDialogCancel:S}=le();return(m,d)=>(_(),T(me,{ref_key:"dialogRef",ref:g,onHide:J(k)},{default:e(()=>[f("div",Fe,[f("div",qe,[f("div",xe,[p.value?(_(),T(fe,{key:0},{default:e(()=>[t(z,null,{default:e(()=>[Ee]),_:1}),t(_e),t(z,null,{default:e(()=>[t(Ae,{src:p.value,style:{width:"80vh"}},null,8,["src"])]),_:1}),t(Se,{vertical:""},{default:e(()=>[t(R,{flat:"",onClick:d[0]||(d[0]=C=>H())},{default:e(()=>[D("Change Photo")]),_:1})]),_:1})]),_:1})):(_(),T(Qe,{key:1,class:"full-height",url:C=>y(C),label:"Upload Photo",color:"amber","text-color":"black",accept:"image/*",style:{"min-width":"500px"},"max-files":1,"auto-upload":"","send-raw":""},null,8,["url"]))])])])]),_:1},8,["onHide"]))}},Ke=f("div",{class:"text-h6"},"Create Order",-1),Be={class:"row q-pb-md"},je={class:"col"},ze={style:{border:"1px black solid","border-radius":"10px"}},We=f("legend",{style:{"margin-left":"1em",padding:"0.2em 0.8em"}},[f("b",null,"Header")],-1),Ze={class:"row"},Je={class:"col"},Xe={class:"col q-pl-md"},et={class:"row items-center justify-end"},tt={class:"row"},lt={class:"col"},at=f("legend",{style:{"margin-left":"1em",padding:"0.2em 0.8em"}},[f("b",null,"Detail Items")],-1),ot={key:0,class:"row q-pb-sm"},nt={class:"col text-right"},ce={__name:"serviceCreateOrder",props:{header:Array,detail:Array,mode:String},setup(o){const{dialogRef:V,onDialogHide:p,onDialogOK:M,onDialogCancel:H}=le(),y=ae(),u=o;W(async()=>{u.header&&(await w(),await a(),g.value=u.header,S.value=u.detail,d.value=parseInt(u.header.SRVH_ISINT))});const g=h({SRVH_DOCNO:"",SRVH_ISSDT:j.formatDate(Date.now(),"YYYY-MM-DD"),SRVH_CUSCD:""}),k=h([]),O=h([]),S=h([]),m=h(!1),d=h(0),C=h(0),N=(c,i,r,I)=>{i(async()=>{I==="cust"&&(d.value==1?await w("connect_jos","MCUS_CGCON"):await w(c)),I==="item"&&await a(c)})},w=async(c,i="MCUS_CUSNM")=>{m.value=!0,await G.post("customer/searchAPI",{searchValue:c,searchCol:i}).then(r=>{m.value=!1,O.value=r.data.data}).catch(()=>{m.value=!1})},a=async c=>{m.value=!0,await G.post("item/searchAPI",{searchValue:c,isForServ:d.value==1?0:1,isITMCD:1,useCustomer:g.value.SRVH_CUSCD}).then(i=>{m.value=!1,k.value=i.data.data}).catch(()=>{m.value=!1})},v=()=>{S.value.push({TSRVD_ITMCD:"",TSRVD_LINE:S.value.length+1,TSRVD_QTY:1,TSRVD_CUSTRMK:"",TSRVD_PHOTO:""})},n=c=>{y.dialog({title:"Confirmation",message:`Do you want to delete this lines no ${c+1} ?`,cancel:!0,persistent:!0}).onOk(async()=>{S.value.splice(c,1)}).catch(i=>{y.notify({color:"red",message:"Something's wrong."})})},l=c=>{y.dialog({component:Ne,componentProps:{ItemCat:"SERVICE_ITEM",ItemType:3,listOpenField:["MITM_ITMCD","MITM_ITMNM","MITM_STKUOM"]}}).onOk(async i=>{console.log(i),await a(""),S.value[c].TSRVD_ITMCD=i.MITM_ITMNM})},q=()=>{y.dialog({title:"Confirmation",message:"Do you want to submit this data ?",cancel:!0,persistent:!0}).onOk(async()=>{m.value=!0,await G.post("servicesAdmin",{header:{...g.value,SRVH_ISINT:d.value},detail:S.value}).then(c=>{m.value=!1,M()})})},$=()=>{y.dialog({component:He}).onOk(async c=>{console.log(c),await w(""),S.value[idx].SRVH_CUSCD=c.MCUS_CUSCD})},b=c=>{y.dialog({component:Ge,componentProps:{photo:S.value[c].TSRVD_PHOTO}}).onOk(async i=>{console.log(i),i?S.value[c].TSRVD_PHOTO=i:S.value[c].TSRVD_PHOTO="",C.value=C.value+1,console.log(S.value[c])})},B=async c=>{c==1&&(g.value.SRVH_CUSCD="",O.value=[],await w("connect_jos","MCUS_CGCON"))};return(c,i)=>(_(),T(me,{ref_key:"dialogRef",ref:V,onHide:J(p),"transition-show":"slide-up","transition-hide":"slide-down","full-width":"",persistent:""},{default:e(()=>[t(fe,{class:"q-dialog-plugin bg-white q-pa-sm"},{default:e(()=>[t(z,null,{default:e(()=>[Ke]),_:1}),t(z,{class:"q-pa-sm"},{default:e(()=>[f("div",Be,[f("div",je,[t(ye,{modelValue:d.value,"onUpdate:modelValue":[i[0]||(i[0]=r=>d.value=r),i[1]||(i[1]=r=>B(r))],label:"Internal Service ?",color:"teal","true-value":1,"false-value":0,disable:m.value},null,8,["modelValue","disable"])])]),f("fieldset",ze,[We,f("div",Ze,[f("div",Je,[t(K,{label:"SPK No",readonly:"",dense:"",modelValue:g.value.SRVH_DOCNO,"onUpdate:modelValue":i[2]||(i[2]=r=>g.value.SRVH_DOCNO=r),filled:""},null,8,["modelValue"])]),f("div",Xe,[t(K,{filled:"",modelValue:g.value.SRVH_ISSDT,"onUpdate:modelValue":i[4]||(i[4]=r=>g.value.SRVH_ISSDT=r),dense:"",label:"Issue Date",loading:m.value,onClick:i[5]||(i[5]=r=>c.quotationIssueDate.qDateProxy.show()),mask:"####-##-##","fill-mask":"",hint:"Mask: YYYY-MM-DD",readonly:u.mode==="view"},{append:e(()=>[t(ge,{name:"event",class:"cursor-pointer",disable:u.mode==="view"},{default:e(()=>[t(Ie,{cover:"","transition-show":"scale","transition-hide":"scale"},{default:e(()=>[t(Me,{modelValue:g.value.SRVH_ISSDT,"onUpdate:modelValue":i[3]||(i[3]=r=>g.value.SRVH_ISSDT=r),mask:"YYYY-MM-DD"},{default:e(()=>[f("div",et,[ne(t(R,{label:"Close",color:"primary",flat:""},null,512),[[Oe]])])]),_:1},8,["modelValue"])]),_:1})]),_:1},8,["disable"])]),_:1},8,["modelValue","loading","readonly"])])]),f("div",tt,[f("div",lt,[t(te,{dense:"",filled:"",label:"Customer Choose",modelValue:g.value.SRVH_CUSCD,"onUpdate:modelValue":[i[7]||(i[7]=r=>g.value.SRVH_CUSCD=r),i[9]||(i[9]=r=>S.value=[])],"use-input":"","input-debounce":"500",options:O.value,onFilter:i[8]||(i[8]=(r,I,s)=>N(r,I,s,"cust")),behavior:"dialog","option-label":"MCUS_CUSNM","option-value":"MCUS_CUSCD","emit-value":"","map-options":"",loading:m.value,readonly:u.mode==="view"},{after:e(()=>[t(R,{round:"",dense:"",flat:"",icon:"person_add",onClick:i[6]||(i[6]=r=>$()),color:"cyan"},{default:e(()=>[t(U,null,{default:e(()=>[D("Add new customer")]),_:1})]),_:1})]),_:1},8,["modelValue","options","loading","readonly"])])])]),(_(),F("fieldset",{style:{border:"1px black solid","border-radius":"10px",height:"35vh",overflow:"auto"},key:C.value},[at,u.mode!=="view"?(_(),F("div",ot,[f("div",nt,[t(R,{flat:"",icon:"add",color:"blue",onClick:i[10]||(i[10]=r=>v())},{default:e(()=>[t(U,null,{default:e(()=>[D("Add lines")]),_:1})]),_:1})])])):P("",!0),t(Ue,{bordered:"",dense:""},{default:e(()=>[S.value.length>0?(_(!0),F(X,{key:0},ee(S.value,(r,I)=>(_(),T(ie,{key:I,class:"q-my-sm",dense:""},{default:e(()=>[t(Y,{avatar:""},{default:e(()=>[t(Re,{"text-color":"blue"},{default:e(()=>[D(E(I+1),1)]),_:2},1024)]),_:2},1024),t(Y,null,{default:e(()=>[t(se,{class:"text-center"},{default:e(()=>[t(te,{dense:"",filled:"",label:"Item Name",modelValue:r.TSRVD_ITMCD,"onUpdate:modelValue":s=>r.TSRVD_ITMCD=s,"use-input":"","input-debounce":"500",options:k.value,onFilter:i[11]||(i[11]=(s,Q,x)=>N(s,Q,x,"item")),behavior:"dialog","option-label":"MITM_ITMNMREAL","option-value":"MITM_ITMNM","emit-value":"","map-options":"",loading:m.value},null,8,["modelValue","onUpdate:modelValue","options","loading"])]),_:2},1024)]),_:2},1024),t(Y,null,{default:e(()=>[t(K,{label:"Qty",filled:"",dense:"",modelValue:r.TSRVD_QTY,"onUpdate:modelValue":s=>r.TSRVD_QTY=s},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1024),t(Y,null,{default:e(()=>[t(K,{label:"Problem",filled:"",dense:"",modelValue:r.TSRVD_CUSTRMK,"onUpdate:modelValue":s=>r.TSRVD_CUSTRMK=s},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1024),u.mode!=="view"?(_(),T(Y,{key:0,side:""},{default:e(()=>[t(R,{icon:"delete",color:"red",flat:"",onClick:s=>n(I),dense:""},{default:e(()=>[t(U,null,{default:e(()=>[D("Delete line")]),_:1})]),_:2},1032,["onClick"])]),_:2},1024)):P("",!0),u.mode!=="view"?(_(),T(Y,{key:1,side:""},{default:e(()=>[t(R,{icon:"library_add",color:"indigo",flat:"",onClick:s=>l(I),dense:""},{default:e(()=>[t(U,null,{default:e(()=>[D("Add new item")]),_:1})]),_:2},1032,["onClick"])]),_:2},1024)):P("",!0),u.mode!=="view"?(_(),T(Y,{key:2,side:""},{default:e(()=>[t(R,{icon:"photo",color:r.TSRVD_PHOTO!=""?"blue":"orange",flat:"",onClick:s=>b(I),dense:""},{default:e(()=>[t(U,null,{default:e(()=>[D("Add photo")]),_:1})]),_:2},1032,["color","onClick"])]),_:2},1024)):P("",!0)]),_:2},1024))),128)):ne((_(),T(ie,{key:1,class:"q-my-sm",clickable:""},{default:e(()=>[t(Y,null,{default:e(()=>[t(se,null,{default:e(()=>[D(" No Items Added ")]),_:1})]),_:1})]),_:1})),[[we]])]),_:1})]))]),_:1}),t(Se,{align:"right"},{default:e(()=>[t(R,{label:"OK",color:"primary",onClick:i[12]||(i[12]=r=>q()),disable:m.value,loading:m.value},null,8,["disable","loading"]),t(R,{flat:"",label:"Cancel",color:"red",onClick:J(H),loading:m.value},null,8,["onClick","loading"])]),_:1})]),_:1})]),_:1},8,["onHide"]))}};const it={class:"q-pa-md"},st={class:"row q-pb-md"},rt=f("div",{class:"col"},[f("span",{class:"text-h4"},"Receive Order ")],-1),dt={class:"col text-right"},ut={class:"row q-pt-md"},ct={class:"col"},mt={key:1},Nt={__name:"serviceView",setup(o){const V=ae(),p=h("SRVH_DOCNO"),M=h(""),H=h([]),y=h([{name:"SRVH_DOCNO",label:"SPK No",field:"SRVH_DOCNO",sortable:!0,align:"left"},{name:"MCUS_CUSNM",label:"Cust",field:"MCUS_CUSNM",sortable:!0,align:"left"},{name:"STAT",label:"Status",field:a=>w(a),sortable:!0,align:"left"},{name:"created_at",label:"Created Date",field:"created_at",sortable:!0,align:"left",format:a=>j.formatDate(new Date(a),"DD MMM YYYY")}]),u=h(!1),g=h(null);W(()=>{k(),g.value=setInterval(()=>{k()},1e4)});const k=async()=>{u.value=!0,await G.post("servicesAdmins/search",{searchBy:p.value,searchValue:M.value}).then(a=>{u.value=!1,H.value=a.data.data}).catch(a=>{u.value=!1})},O=()=>{V.dialog({component:ce}).onOk(async a=>{k()})},S=a=>{const v={SRVH_DOCNO:a.SRVH_DOCNO,SRVH_ISSDT:j.formatDate(a.SRVH_ISSDT,"YYYY-MM-DD"),SRVH_CUSCD:a.MCUS_CUSCD};let n=[];a.detail.map(l=>{n.push({id:l.id,TSRVD_ITMCD:l.TSRVD_ITMCD,TSRVD_LINE:l.TSRVD_LINE,TSRVD_QTY:l.TSRVD_QTY,TSRVD_CUSTRMK:l.TSRVD_CUSTRMK,TSRVD_REMARK:l.TSRVD_REMARK,TSRVD_FLGSTS:l.TSRVD_FLGSTS,listFixDet:l.list_fix_det})}),V.dialog({component:Pe,componentProps:{header:v,detail:n,mode:a.detail.filter(l=>l.TSRVD_FLGSTS===1).length===a.detail.length?"approvecust":"view"}}).onOk(async l=>{k()})},m=a=>{window.open("https://joss.jatpowerindo.co.id/servicesAdmins/printInvoice/"+btoa(a),"_blank").focus()},d=a=>{const v={SRVH_DOCNO:a.SRVH_DOCNO,SRVH_ISSDT:j.formatDate(a.SRVH_ISSDT,"YYYY-MM-DD"),SRVH_CUSCD:a.MCUS_CUSCD};let n=[];a.detail.map(l=>{n.push({TSRVD_ITMCD:l.TSRVD_ITMCD,TSRVD_LINE:l.TSRVD_LINE,TSRVD_QTY:l.TSRVD_QTY,TSRVD_CUSTRMK:l.TSRVD_CUSTRMK})}),V.dialog({component:ce,componentProps:{header:v,detail:n}}).onOk(async l=>{k()})},C=a=>{V.dialog({title:"Confirmation",message:"Do you want to proceed to service ?",cancel:!0,persistent:!0}).onOk(async()=>{u.value=!0,await G.put(`servicesAdmins/updateDetByIDHead/${btoa(a.id)}`,{TSRVD_FLGSTS:2}).then(v=>{u.value=!1}).catch(v=>{u.value=!1})})},N=a=>{V.dialog({title:"Confirmation",message:"Are you sure want to delete this order ?",cancel:!0,persistent:!0}).onOk(async()=>{u.value=!0,await G.delete(`servicesAdmin/${btoa(a.SRVH_DOCNO)}`).then(v=>{u.value=!1}).catch(v=>{u.value=!1})})},w=a=>{const v=a.detail.filter(b=>b.TSRVD_FLGSTS==0),n=a.detail.filter(b=>b.TSRVD_FLGSTS==1),l=a.detail.filter(b=>b.TSRVD_FLGSTS==2),q=a.detail.filter(b=>b.TSRVD_FLGSTS==3),$=a.detail.filter(b=>b.TSRVD_FLGSTS==5);if(v.length==a.detail.length)return{color:"red",label:"No Price Added yet !",icon:"edit"};if(n.length>0&&n.length<a.detail.length)return{color:"warning",label:"Please Add item & price",icon:"payments"};if($.length>0&&$.length==a.detail.length)return{color:"indigo",label:"Added Price Done, Waiting Manager Confirmation",icon:"price_check"};if(n.length>0&&n.length==a.detail.length)return{color:"green",label:"Manager has been approve, Waiting Cust. Confirmation",icon:"price_check"};if(l.length>0&&l.length>=a.detail.length)return{color:"cyan",label:"Cust. has been approved, continue to fix.",icon:"engineering"};if(q.length>0&&q.length===a.detail.length)return{color:"primary",label:"Fix has been done",icon:"fact_check"}};return(a,v)=>(_(),F("div",it,[f("div",st,[rt,f("div",dt,[t(R,{icon:"add",color:"blue",onClick:O},{default:e(()=>[t(U,null,{default:e(()=>[D("Create New Order")]),_:1})]),_:1})])]),t(_e),f("div",ut,[f("div",ct,[t(ke,{title:"Created Order",rows:H.value,columns:y.value,"row-key":"name",loading:u.value,dense:"",pagination:{rowsPerPage:20},class:"my-sticky-header-column-table"},{"top-right":e(()=>[t(te,{outlined:"",modelValue:p.value,"onUpdate:modelValue":v[0]||(v[0]=n=>p.value=n),options:y.value,label:"Search Columns","option-value":"name","option-label":"label","emit-value":"",dense:"","map-options":""},null,8,["modelValue","options"]),t(K,{borderless:"",dense:"",modelValue:M.value,"onUpdate:modelValue":[v[1]||(v[1]=n=>M.value=n),v[2]||(v[2]=n=>a.dataQuo())],placeholder:"Search",outlined:"",debounce:"1000"},{append:e(()=>[t(ge,{name:"search"})]),_:1},8,["modelValue"])]),header:e(n=>[t(de,{props:n},{default:e(()=>[(_(!0),F(X,null,ee(n.cols,l=>(_(),T(re,{key:l.name,props:n},{default:e(()=>[D(E(l.label),1)]),_:2},1032,["props"]))),128)),t(re,{"auto-width":""},{default:e(()=>[D("Action")]),_:1})]),_:2},1032,["props"])]),body:e(n=>[t(de,{props:n},{default:e(()=>[(_(!0),F(X,null,ee(n.cols,l=>(_(),T(ue,{key:l.name,props:n},{default:e(()=>[l.name==="STAT"?(_(),T(be,{key:0,clickable:"",color:l.value.color,"text-color":"white",icon:l.value.icon},{default:e(()=>[D(E(l.value.label),1)]),_:2},1032,["color","icon"])):(_(),F("span",mt,E(l.value),1))]),_:2},1032,["props"]))),128)),t(ue,{"auto-width":""},{default:e(()=>[n.row.detail.filter(l=>l.TSRVD_FLGSTS>0).length===0?(_(),T(R,{key:0,flat:"",color:"orange",icon:"edit",onClick:l=>d(n.row),dense:""},{default:e(()=>[t(U,null,{default:e(()=>[D("Edit this Order")]),_:1})]),_:2},1032,["onClick"])):P("",!0),n.row.detail.filter(l=>l.TSRVD_FLGSTS>0).length===n.row.detail.length?(_(),T(R,{key:1,flat:"",color:"indigo",icon:"print",onClick:l=>m(n.row.SRVH_DOCNO),dense:""},{default:e(()=>[t(U,null,{default:e(()=>[D("Print Estimation Price")]),_:1})]),_:2},1032,["onClick"])):P("",!0),n.row.detail.filter(l=>l.TSRVD_FLGSTS>0).length===0?(_(),T(R,{key:2,flat:"",color:"red",icon:"delete",onClick:l=>N(n.row.SRVH_DOCNO),dense:""},{default:e(()=>[t(U,null,{default:e(()=>[D(E(n.row.detail.filter(l=>l.TSRVD_FLGSTS>0).length>0?"Cannot delete processed order":"Delete this Order"),1)]),_:2},1024)]),_:2},1032,["onClick"])):P("",!0),n.row.detail.filter(l=>l.TSRVD_FLGSTS>0).length>0?(_(),T(R,{key:3,flat:"",color:"cyan",icon:"visibility",onClick:l=>S(n.row),dense:""},{default:e(()=>[t(U,null,{default:e(()=>[D("View this Order")]),_:1})]),_:2},1032,["onClick"])):P("",!0),n.row.detail.filter(l=>l.TSRVD_FLGSTS==1).length===n.row.detail.length?(_(),T(R,{key:4,flat:"",color:"indigo",icon:"check",onClick:l=>C(n.row),dense:""},{default:e(()=>[t(U,null,{default:e(()=>[D(E(n.row.detail.filter(l=>l.TSRVD_FLGSTS>0).length!==n.row.detail.length?"Please wait until all item checked":"Proceed all item to service"),1)]),_:2},1024)]),_:2},1032,["onClick"])):P("",!0)]),_:2},1024)]),_:2},1032,["props"])]),_:1},8,["rows","columns","loading"])])])]))}};export{Nt as default};
