import{Q as $}from"./QTooltip.d2e4dac2.js";import{c as De,aH as qe,a as L,aY as Ae,h as te,Q as b,y as Ie,aZ as Pe,a_ as Be,s as m,o as W,B as Q,C as q,D as l,E as e,L as ce,M as Y,I as d,Z as k,am as z,W as me,X as H,Y as ve,O as I,T as oe,P as M,a$ as x,H as V,R as G,S as K,U as Ne,V as Le,aX as $e}from"./index.81debb10.js";import{a as X,u as ge,k as pe,l as E,Q as Me,b as ne,c as A,d as N,m as se}from"./QTable.9a4dd24b.js";import{Q as ie,a as ue}from"./QTd.8b10fcb9.js";import{api_web as P,api as Ee}from"./axios.134ed65c.js";import{Q as Re,a as xe,C as Ye}from"./ClosePopup.5155fc36.js";import{Q as He}from"./QBtnGroup.c9811087.js";import{Q as de}from"./QBadge.b4b68174.js";import{_ as je}from"./assignConditionsView.05b2b524.js";import{_ as Fe}from"./viewAssignedCond.51588ae4.js";import"./use-cache.b0833c75.js";import"./date.f3350008.js";var Je=De({name:"QBtnToggle",props:{...qe,modelValue:{required:!0},options:{type:Array,required:!0,validator:t=>t.every(p=>("label"in p||"icon"in p||"slot"in p)&&"value"in p)},color:String,textColor:String,toggleColor:{type:String,default:"primary"},toggleTextColor:String,outline:Boolean,flat:Boolean,unelevated:Boolean,rounded:Boolean,push:Boolean,glossy:Boolean,size:String,padding:String,noCaps:Boolean,noWrap:Boolean,dense:Boolean,readonly:Boolean,disable:Boolean,stack:Boolean,stretch:Boolean,spread:Boolean,clearable:Boolean,ripple:{type:[Boolean,Object],default:!0}},emits:["update:modelValue","clear","click"],setup(t,{slots:p,emit:v}){const O=L(()=>t.options.find(u=>u.value===t.modelValue)!==void 0),i=L(()=>({type:"hidden",name:t.name,value:t.modelValue})),T=Pe(i),g=L(()=>Ae(t)),U=L(()=>({rounded:t.rounded,dense:t.dense,...g.value})),w=L(()=>t.options.map((u,n)=>{const{attrs:s,value:c,slot:y,..._}=u;return{slot:y,props:{key:n,"aria-pressed":c===t.modelValue?"true":"false",...s,..._,...U.value,disable:t.disable===!0||_.disable===!0,color:c===t.modelValue?f(_,"toggleColor"):f(_,"color"),textColor:c===t.modelValue?f(_,"toggleTextColor"):f(_,"textColor"),noCaps:f(_,"noCaps")===!0,noWrap:f(_,"noWrap")===!0,size:f(_,"size"),padding:f(_,"padding"),ripple:f(_,"ripple"),stack:f(_,"stack")===!0,stretch:f(_,"stretch")===!0,onClick(B){S(c,u,B)}}}}));function S(u,n,s){t.readonly!==!0&&(t.modelValue===u?t.clearable===!0&&(v("update:modelValue",null,null),v("clear")):v("update:modelValue",u,n),v("click",s))}function f(u,n){return u[n]===void 0?t[n]:u[n]}function D(){const u=w.value.map(n=>te(b,n.props,n.slot!==void 0?p[n.slot]:void 0));return t.name!==void 0&&t.disable!==!0&&O.value===!0&&T(u,"push"),Ie(p.default,u)}return()=>te(He,{class:"q-btn-toggle",...g.value,rounded:t.rounded,stretch:t.stretch,glossy:t.glossy,spread:t.spread},D)}});const Ge=Be("counter",{state:()=>({customerList:[],itemList:[],usageList:[]}),getters:{doubleCount(t){return t.counter*2},getCustomer(t){return t.customerList},getItem(t){return t.itemList},getUsage(t){return t.usageList}},actions:{increment(){this.counter++},setCustomer(t){this.customerList=t},setItem(t){this.itemList=t},setUsage(t){this.usageList=t}}}),Ke=d("div",{class:"text-h6"},"Choose Bank Transfer",-1),We={class:"row q-pt-md"},ze={class:"col"},Xe={__name:"quotationBankChoose",props:{payment:Array},setup(t){const p=X(),v=m(!1),O=m([{name:"id",label:"id",field:"id",sortable:!0,align:"left"},{name:"bank_name",label:"Bank Name",field:"bank_name",sortable:!0,align:"left"},{name:"bank_account_name",label:"Bank Acc Name",field:"bank_account_name",sortable:!0,align:"left"},{name:"bank_account_number",label:"Bank Acc Number",field:"bank_account_number",sortable:!0,align:"left"}]),i=m([]),T=m([]),g=t;W(()=>{g.payment&&g.payment.length>0&&(console.log(g.payment),T.value=g.payment),U()});const U=async()=>{v.value=!0,await P.get("payment-account").then(n=>{console.log(n.data),v.value=!1,i.value=n.data.data}).catch(()=>{v.value=!1})},w=()=>{p.dialog({title:"Confirmation",message:"Do you want to choose all this data ?",cancel:!0,persistent:!0}).onOk(async()=>{console.log(T.value),D(T.value)})},{dialogRef:S,onDialogHide:f,onDialogOK:D,onDialogCancel:u}=ge();return(n,s)=>(Q(),q(ve,{ref_key:"dialogRef",ref:S,onHide:H(f),"transition-show":"slide-up","transition-hide":"slide-down","full-width":"",persistent:""},{default:l(()=>[e(ce,{class:"q-dialog-plugin bg-white q-pa-sm"},{default:l(()=>[e(Y,null,{default:l(()=>[Ke]),_:1}),e(Y,{class:"q-pa-sm"},{default:l(()=>[d("div",We,[d("div",ze,[e(pe,{title:"List Bank Account",rows:i.value,columns:O.value,"row-key":"id",loading:v.value,dense:"",pagination:{rowsPerPage:20},class:"my-sticky-header-column-table",selection:"multiple",selected:T.value,"onUpdate:selected":s[3]||(s[3]=c=>T.value=c)},{"top-right":l(()=>[e(E,{outlined:"",modelValue:n.filterCol,"onUpdate:modelValue":s[0]||(s[0]=c=>n.filterCol=c),options:O.value,label:"Search Columns","option-value":"name","option-label":"label","emit-value":"",dense:"","map-options":""},null,8,["modelValue","options"]),e(k,{borderless:"",dense:"",modelValue:n.filter,"onUpdate:modelValue":[s[1]||(s[1]=c=>n.filter=c),s[2]||(s[2]=c=>n.dataQuo())],placeholder:"Search",outlined:"",debounce:"1000"},{append:l(()=>[e(z,{name:"search"})]),_:1},8,["modelValue"])]),_:1},8,["rows","columns","loading","selected"])])])]),_:1}),e(me,{align:"right"},{default:l(()=>[e(b,{label:"OK",color:"primary",onClick:s[4]||(s[4]=c=>w())}),e(b,{flat:"",label:"Cancel",color:"red",onClick:H(u)},null,8,["onClick"])]),_:1})]),_:1})]),_:1},8,["onHide"]))}},Ze={class:"text-h6"},el={style:{border:"1px black solid","border-radius":"10px"}},ll=d("legend",{style:{"margin-left":"1em",padding:"0.2em 0.8em"}},[d("b",null,"Header")],-1),al={class:"row"},tl={class:"col"},ol={class:"col q-pl-md"},nl={class:"row items-center justify-end"},sl={class:"row"},il={class:"col"},ul={class:"col q-pl-md"},dl={class:"row q-pt-md"},rl={class:"col"},cl={class:"col q-pl-md"},ml={class:"q-pa-sm"},vl={key:0,class:"q-pb-md"},gl={style:{border:"1px black solid","border-radius":"10px",height:"35vh",overflow:"auto"}},pl=d("legend",{style:{"margin-left":"1em",padding:"0.2em 0.8em"}},[d("b",null,"Detail Items")],-1),fl={class:"row q-pb-md"},_l={class:"col"},Cl={class:"col text-right"},bl={class:"row"},Tl={class:"col"},re={__name:"quotationCreate",props:{quoHeader:String},setup(t){const p=X(),v=Ge(),O=t;W(async()=>{v.getCustomer.length===0?(await Z(""),v.setCustomer(B.value)):B.value=v.getCustomer,v.getItem.length===0?(await ee(""),v.setItem(_.value)):_.value=v.getItem,v.getUsage.length===0?(await le(""),v.setUsage(R.value)):R.value=v.getUsage,O.quoHeader&&_e(O.quoHeader)});const i=m(!1),T=m(""),g=m(""),U=m(""),w=m(""),S=m(""),f=m(""),D=m(""),u=m([]),n=m(1),s=m(0),c=m([]),y=m([]),_=m([]),B=m([]),R=m([]),fe=L(()=>n.value===1?y.value.length===0||y.value.filter(r=>!r.item||!r.price).length>0:y.value.length===0||y.value.filter(r=>!r.item||!r.price||!r.qty).length>0),j=(r,o,a,h)=>{o(async()=>{h==="cust"&&await Z(r),h==="item"&&await ee(r),h==="usage"&&await le(r)})},Z=async r=>{i.value=!0,await P.post("customer/searchAPI",{searchValue:r}).then(o=>{i.value=!1,B.value=o.data.data}).catch(()=>{i.value=!1})},ee=async r=>{i.value=!0,await P.post("item/searchAPI",{searchValue:r}).then(o=>{i.value=!1,_.value=o.data.data}).catch(()=>{i.value=!1})},le=async r=>{i.value=!0,await P.post("usage/searchAPI",{searchValue:r}).then(o=>{i.value=!1,R.value=o.data.data}).catch(()=>{i.value=!1})},_e=async r=>{i.value=!0,await Ee.get(`transaction/quotation/view/${btoa(r)}`).then(o=>{i.value=!1;const a=o.data.data;T.value=a.TQUO_QUOCD,g.value=a.TQUO_ISSUDT,U.value=a.TQUO_CUSCD,w.value=a.TQUO_ATTN,S.value=a.TQUO_SBJCT,f.value=a.TQUO_PROJECT_LOCATION,D.value=a.cond,u.value=a.condlist,n.value=parseInt(a.TQUO_TYPE),s.value=a.TQUO_SERVTRANS_COST,c.value=a.payment,a.det.map(h=>{y.value.push({item:h.TQUODETA_ITMCD,usage:parseInt(h.TQUODETA_USAGE),price:h.TQUODETA_PRC,electric:h.TQUODETA_ELECTRICITY,qty:h.TQUODETA_ITMQT})}),console.log(o)}).catch(()=>{i.value=!1})},Ce=()=>{y.value.push({item:"",usage:"",price:"",electric:"",qty:1})},be=r=>{p.dialog({title:"Confirmation",message:`Do you want to delete this lines no ${r+1} ?`,cancel:!0,persistent:!0}).onOk(async()=>{y.value.splice(r,1)})},Te=()=>{p.dialog({title:"Confirmation",message:"Do you want to clear all this line ?",cancel:!0,persistent:!0}).onOk(async()=>{y.value=[]})},he=()=>{p.dialog({component:je}).onOk(async r=>{D.value=r.MCONDITION_RPT_STAT,u.value=r.group})},Ue=()=>{p.dialog({component:Fe,componentProps:{listCond:u.value}}).onOk(async r=>{})},ye=()=>{p.dialog({component:Xe,componentProps:{payment:c.value}}).onOk(async r=>{c.value=r})},Qe=async()=>{p.dialog({title:"Confirmation",message:"Do you want to save all this data ?",cancel:!0,persistent:!0}).onOk(async()=>{u.value.length===0?p.dialog({title:"Confirmation",message:"You're not selecting any condition, are you sure want to continue ?",cancel:!0,persistent:!0}).onOk(async()=>{ae()}):ae()})},ae=async()=>{i.value=!0,await P.post("quotationNew/saveAPI",{TQUO_QUOCD:T.value,TQUO_CUSCD:U.value,TQUO_ATTN:w.value,TQUO_SBJCT:S.value,TQUO_ISSUDT:g.value,TQUO_PROJECT_LOCATION:f.value,TQUO_TYPE:n.value,TQUO_SERVTRANS_COST:s.value,DET:y.value,COND:D.value,CONDLIST:u.value,PAYMENT:c.value}).then(r=>{i.value=!1,console.log(r),we()}).catch(()=>{i.value=!1})},Ve=r=>{D.value="",u.value=[],s.value=0,y.value=[]},{dialogRef:Oe,onDialogHide:ke,onDialogOK:we,onDialogCancel:Se}=ge();return(r,o)=>(Q(),q(ve,{ref_key:"dialogRef",ref:Oe,onHide:H(ke),"transition-show":"slide-up","transition-hide":"slide-down","full-width":"",persistent:""},{default:l(()=>[e(ce,{class:"q-dialog-plugin bg-white q-pa-sm"},{default:l(()=>[e(Y,null,{default:l(()=>[d("div",Ze,I(O.quoHeader?"Edit ":"Create ")+" Quotation ",1)]),_:1}),e(Y,{class:"q-pa-sm"},{default:l(()=>[d("fieldset",el,[ll,d("div",al,[d("div",tl,[e(k,{label:"Quotation Code",dense:"",filled:"",modelValue:T.value,"onUpdate:modelValue":o[0]||(o[0]=a=>T.value=a),disable:"",loading:i.value},null,8,["modelValue","loading"])]),d("div",ol,[e(k,{filled:"",modelValue:g.value,"onUpdate:modelValue":o[2]||(o[2]=a=>g.value=a),dense:"",label:"Issue Date",loading:i.value,onClick:o[3]||(o[3]=a=>g.value.qDateProxy.show()),mask:"####-##-##","fill-mask":"",hint:"Mask: YYYY-MM-DD"},{append:l(()=>[e(z,{name:"event",class:"cursor-pointer"},{default:l(()=>[e(Re,{cover:"","transition-show":"scale","transition-hide":"scale"},{default:l(()=>[e(xe,{modelValue:g.value,"onUpdate:modelValue":o[1]||(o[1]=a=>g.value=a),mask:"YYYY-MM-DD"},{default:l(()=>[d("div",nl,[oe(e(b,{label:"Close",color:"primary",flat:""},null,512),[[Ye]])])]),_:1},8,["modelValue"])]),_:1})]),_:1})]),_:1},8,["modelValue","loading"])])]),d("div",sl,[d("div",il,[e(E,{dense:"",filled:"",label:"Customer Name",modelValue:U.value,"onUpdate:modelValue":o[4]||(o[4]=a=>U.value=a),"use-input":"","input-debounce":"500",options:B.value,onFilter:o[5]||(o[5]=(a,h,C)=>j(a,h,C,"cust")),behavior:"dialog","option-label":"MCUS_CUSNM","option-value":"MCUS_CUSCD","emit-value":"","map-options":"",loading:i.value},null,8,["modelValue","options","loading"])]),d("div",ul,[e(k,{label:"Attn.",dense:"",filled:"",modelValue:w.value,"onUpdate:modelValue":o[6]||(o[6]=a=>w.value=a),loading:i.value},null,8,["modelValue","loading"])])]),d("div",dl,[d("div",rl,[e(k,{label:"Subject",dense:"",filled:"",modelValue:S.value,"onUpdate:modelValue":o[7]||(o[7]=a=>S.value=a),loading:i.value},null,8,["modelValue","loading"])]),d("div",cl,[e(k,{label:"Project Location",dense:"",filled:"",modelValue:f.value,"onUpdate:modelValue":o[8]||(o[8]=a=>f.value=a),loading:i.value},null,8,["modelValue","loading"])])])]),d("div",ml,[e(Je,{modelValue:n.value,"onUpdate:modelValue":[o[9]||(o[9]=a=>n.value=a),o[10]||(o[10]=a=>Ve(a))],spread:"",class:"my-custom-toggle","no-caps":"",rounded:"",unelevated:"","toggle-color":"primary",color:"white","text-color":"primary",options:[{label:"Rental",value:1},{label:"Sale",value:2}],dense:"",loading:i.value},null,8,["modelValue","loading"])]),n.value===2?(Q(),M("div",vl,[e(k,{prefix:"Rp",label:"Service & Transportation Price",modelValue:s.value,"onUpdate:modelValue":o[11]||(o[11]=a=>s.value=a),filled:"",dense:"",loading:i.value},null,8,["modelValue","loading"])])):x("",!0),d("fieldset",gl,[pl,d("div",fl,[d("div",_l,[e(b,{flat:"",icon:"add",color:"blue",label:"Add Lines",onClick:Ce,disable:!n.value,loading:i.value},null,8,["disable","loading"]),e(b,{color:"red",onClick:Te,flat:"",icon:"refresh",loading:i.value},{default:l(()=>[e($,null,{default:l(()=>[V("Clear All Lines")]),_:1})]),_:1},8,["loading"])]),d("div",Cl,[e(b,{color:"blue",label:"Assign Conditions",onClick:he,loading:i.value},null,8,["loading"]),e(b,{color:"indigo",label:"Assign Bank Account",onClick:ye,loading:i.value},{default:l(()=>[e(de,{color:"red",floating:""},{default:l(()=>[V(I(c.value.length),1)]),_:1})]),_:1},8,["loading"]),e(b,{icon:"visibility",color:"indigo",flat:"",onClick:Ue,loading:i.value},{default:l(()=>[e($,null,{default:l(()=>[V("View Conditions")]),_:1}),e(de,{color:"red",floating:""},{default:l(()=>[V(I(u.value.length),1)]),_:1})]),_:1},8,["loading"])])]),d("div",bl,[d("div",Tl,[e(Me,{bordered:"",dense:""},{default:l(()=>[y.value.length>0?(Q(!0),M(G,{key:0},K(y.value,(a,h)=>(Q(),q(ne,{key:h,class:"q-my-sm",dense:""},{default:l(()=>[e(A,{avatar:""},{default:l(()=>[e(Ne,{"text-color":"blue"},{default:l(()=>[V(I(h+1),1)]),_:2},1024)]),_:2},1024),e(A,null,{default:l(()=>[e(N,null,{default:l(()=>[e(E,{dense:"",filled:"",label:"Item Name",modelValue:a.item,"onUpdate:modelValue":C=>a.item=C,"use-input":"","input-debounce":"500",options:_.value,onFilter:o[12]||(o[12]=(C,F,J)=>j(C,F,J,"item")),behavior:"dialog","option-label":"MITM_ITMNM","option-value":"MITM_ITMNM","emit-value":"","map-options":"",loading:i.value},null,8,["modelValue","onUpdate:modelValue","options","loading"])]),_:2},1024)]),_:2},1024),n.value===1?(Q(),q(A,{key:0},{default:l(()=>[e(N,null,{default:l(()=>[e(E,{dense:"",filled:"",label:"Usage",modelValue:a.usage,"onUpdate:modelValue":C=>a.usage=C,"use-input":"","input-debounce":"500",options:R.value,onFilter:o[13]||(o[13]=(C,F,J)=>j(C,F,J,"usage")),behavior:"dialog","option-label":"MUSAGE_DESCALL","option-value":"id","emit-value":"","map-options":"",loading:i.value},null,8,["modelValue","onUpdate:modelValue","options","loading"])]),_:2},1024)]),_:2},1024)):x("",!0),e(A,null,{default:l(()=>[e(N,null,{default:l(()=>[e(k,{prefix:"Rp",dense:"",label:"Price",filled:"",modelValue:a.price,"onUpdate:modelValue":C=>a.price=C},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1024)]),_:2},1024),n.value===1?(Q(),q(A,{key:1},{default:l(()=>[e(N,null,{default:l(()=>[e(k,{dense:"",label:"Electricity",filled:"",modelValue:a.electric,"onUpdate:modelValue":C=>a.electric=C},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1024)]),_:2},1024)):x("",!0),n.value===2?(Q(),q(A,{key:2},{default:l(()=>[e(N,null,{default:l(()=>[e(k,{dense:"",label:"Qty",filled:"",modelValue:a.qty,"onUpdate:modelValue":C=>a.qty=C},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1024)]),_:2},1024)):x("",!0),e(A,{side:""},{default:l(()=>[e(b,{icon:"delete",color:"red",flat:"",onClick:C=>be(h)},null,8,["onClick"])]),_:2},1024)]),_:2},1024))),128)):oe((Q(),q(ne,{key:1,class:"q-my-sm",clickable:""},{default:l(()=>[e(A,null,{default:l(()=>[e(N,null,{default:l(()=>[V(" No Items Added ")]),_:1})]),_:1})]),_:1})),[[Le]])]),_:1})])])])]),_:1}),e(me,{align:"right"},{default:l(()=>[e(b,{label:"OK",color:"primary",onClick:o[14]||(o[14]=a=>Qe()),disable:fe.value},null,8,["disable"]),e(b,{flat:"",label:"Cancel",color:"red",onClick:H(Se)},null,8,["onClick"])]),_:1})]),_:1})]),_:1},8,["onHide"]))}};const hl={class:"q-pa-md"},Ul={class:"row q-pb-md"},yl=d("div",{class:"col"},[d("span",{class:"text-h4"},"Quotation ")],-1),Ql={class:"col text-right"},Vl={class:"row q-pt-md"},Ol={class:"col"},Ml={__name:"quotationView",setup(t){const p=X(),v=m("TQUO_QUOCD"),O=m(""),i=m([]),T=m([{name:"TQUO_QUOCD",label:"Quot. Code",field:"TQUO_QUOCD",sortable:!0,align:"left"},{name:"TQUO_SBJCT",label:"Quot. Subject",field:"TQUO_SBJCT",sortable:!0,align:"left"},{name:"MCUS_CUSNM",label:"Customer Name",field:"MCUS_CUSNM",sortable:!0,align:"left"},{name:"TQUO_ATTN",label:"Customer Attn",field:"TQUO_ATTN",sortable:!0,align:"left"},{name:"TQUO_CUSCD",label:"Customer Code",field:"TQUO_CUSCD",sortable:!0,align:"left"},{name:"TQUO_ISSUDT",label:"Issue Date",field:"TQUO_ISSUDT",sortable:!0,align:"left"},{name:"TQUO_PROJECT_LOCATION",label:"Proj. Loc",field:"TQUO_PROJECT_LOCATION",sortable:!0,align:"left"}]),g=m(!1);W(()=>{U()});const U=async()=>{g.value=!0,await P.post("quotation/search",{searchBy:v.value,searchValue:O.value}).then(u=>{g.value=!1,i.value=u.data.data}).catch(u=>{g.value=!1})},w=()=>{p.dialog({component:re}).onOk(async u=>{U()})},S=u=>{console.log(u),p.dialog({component:re,componentProps:{quoHeader:u}}).onOk(async n=>{U()})},f=u=>{p.dialog({title:"Confirmation",message:"Are you sure want to delete this data ?",cancel:!0,persistent:!0}).onOk(async()=>{g.value=!0,await P.delete(`quotationNew/${btoa(u)}`).then(n=>{g.value=!1,U()})})},D=u=>{window.open("http://tribin.test/PDF/quotation/"+btoa(u),"_blank").focus()};return(u,n)=>(Q(),M("div",hl,[d("div",Ul,[yl,d("div",Ql,[e(b,{icon:"add",color:"blue",onClick:w},{default:l(()=>[e($,null,{default:l(()=>[V("Create New Quotation")]),_:1})]),_:1})])]),e($e),d("div",Vl,[d("div",Ol,[e(pe,{title:"Created Quotation",rows:i.value,columns:T.value,"row-key":"name",loading:g.value,dense:"",pagination:{rowsPerPage:20},class:"my-sticky-header-column-table"},{"top-right":l(()=>[e(E,{outlined:"",modelValue:v.value,"onUpdate:modelValue":n[0]||(n[0]=s=>v.value=s),options:T.value,label:"Search Columns","option-value":"name","option-label":"label","emit-value":"",dense:"","map-options":""},null,8,["modelValue","options"]),e(k,{borderless:"",dense:"",modelValue:O.value,"onUpdate:modelValue":[n[1]||(n[1]=s=>O.value=s),n[2]||(n[2]=s=>U())],placeholder:"Search",outlined:"",debounce:"1000"},{append:l(()=>[e(z,{name:"search"})]),_:1},8,["modelValue"])]),header:l(s=>[e(ie,{props:s},{default:l(()=>[(Q(!0),M(G,null,K(s.cols,c=>(Q(),q(se,{key:c.name,props:s},{default:l(()=>[V(I(c.label),1)]),_:2},1032,["props"]))),128)),e(se,{"auto-width":""},{default:l(()=>[V("Action")]),_:1})]),_:2},1032,["props"])]),body:l(s=>[e(ie,{props:s},{default:l(()=>[(Q(!0),M(G,null,K(s.cols,c=>(Q(),q(ue,{key:c.name,props:s},{default:l(()=>[V(I(c.value),1)]),_:2},1032,["props"]))),128)),e(ue,{"auto-width":""},{default:l(()=>[e(b,{flat:"",color:"orange",icon:"edit",onClick:c=>S(s.row.TQUO_QUOCD),dense:"",disable:s.row.TQUO_APPRVDT!==null},{default:l(()=>[e($,null,{default:l(()=>[V(I(s.row.TQUO_APPRVDT?"Quotation already approved, cannot edit !":"Edit this quotation"),1)]),_:2},1024)]),_:2},1032,["onClick","disable"]),e(b,{flat:"",color:"red",icon:"delete",onClick:c=>f(s.row.TQUO_QUOCD),dense:"",disable:s.row.TQUO_APPRVDT!==null},{default:l(()=>[e($,null,{default:l(()=>[V(I(s.row.TQUO_APPRVDT?"Quotation already approved, cannot delete !":"Delete this quotation"),1)]),_:2},1024)]),_:2},1032,["onClick","disable"]),e(b,{flat:"",color:"indigo",icon:"print",onClick:c=>D(s.row.TQUO_QUOCD),dense:""},{default:l(()=>[e($,null,{default:l(()=>[V("Print this quotation")]),_:1})]),_:2},1032,["onClick"])]),_:2},1024)]),_:2},1032,["props"])]),_:1},8,["rows","columns","loading"])])])]))}};export{Ml as default};
