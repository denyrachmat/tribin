import{Q as L}from"./QTooltip.a393fde3.js";import{c as Pe,aI as Be,a as N,aZ as Ne,h as se,Q as T,z as Le,a_ as Re,a$ as $e,t as m,o as Z,C as V,D as q,E as l,F as e,M as ge,O as F,J as r,$ as S,an as X,X as pe,Y as j,Z as fe,P,U as ie,R as $,b0 as M,I as Q,S as z,T as K,V as Me,W as Ee,aY as xe}from"./index.2d615fb7.js";import{a as ee,u as _e,k as Ce,l as R,Q as Ye,b as ue,c as I,d as B,m as de}from"./QTable.2bad4b5e.js";import{Q as re,a as ce}from"./QTd.8585a67d.js";import{api_web as A,api as He}from"./axios.1c6cb42c.js";import{Q as Fe,a as je,C as Je}from"./ClosePopup.e77278d5.js";import{Q as Ge}from"./QBtnGroup.acb9d018.js";import{Q as me}from"./QBadge.380a3683.js";import{_ as We}from"./assignConditionsView.a20230c9.js";import{_ as ze}from"./viewAssignedCond.fd4f31b2.js";import"./use-render-cache.3aae9b27.js";import"./date.2e366218.js";var Ke=Pe({name:"QBtnToggle",props:{...Be,modelValue:{required:!0},options:{type:Array,required:!0,validator:s=>s.every(p=>("label"in p||"icon"in p||"slot"in p)&&"value"in p)},color:String,textColor:String,toggleColor:{type:String,default:"primary"},toggleTextColor:String,outline:Boolean,flat:Boolean,unelevated:Boolean,rounded:Boolean,push:Boolean,glossy:Boolean,size:String,padding:String,noCaps:Boolean,noWrap:Boolean,dense:Boolean,readonly:Boolean,disable:Boolean,stack:Boolean,stretch:Boolean,spread:Boolean,clearable:Boolean,ripple:{type:[Boolean,Object],default:!0}},emits:["update:modelValue","clear","click"],setup(s,{slots:p,emit:v}){const O=N(()=>s.options.find(d=>d.value===s.modelValue)!==void 0),o=N(()=>({type:"hidden",name:s.name,value:s.modelValue})),h=Re(o),g=N(()=>Ne(s)),y=N(()=>({rounded:s.rounded,dense:s.dense,...g.value})),w=N(()=>s.options.map((d,n)=>{const{attrs:i,value:c,slot:U,...b}=d;return{slot:U,props:{key:n,"aria-pressed":c===s.modelValue?"true":"false",...i,...b,...y.value,disable:s.disable===!0||b.disable===!0,color:c===s.modelValue?f(b,"toggleColor"):f(b,"color"),textColor:c===s.modelValue?f(b,"toggleTextColor"):f(b,"textColor"),noCaps:f(b,"noCaps")===!0,noWrap:f(b,"noWrap")===!0,size:f(b,"size"),padding:f(b,"padding"),ripple:f(b,"ripple"),stack:f(b,"stack")===!0,stretch:f(b,"stretch")===!0,onClick(E){k(c,d,E)}}}}));function k(d,n,i){s.readonly!==!0&&(s.modelValue===d?s.clearable===!0&&(v("update:modelValue",null,null),v("clear")):v("update:modelValue",d,n),v("click",i))}function f(d,n){return d[n]===void 0?s[n]:d[n]}function D(){const d=w.value.map(n=>se(T,n.props,n.slot!==void 0?p[n.slot]:void 0));return s.name!==void 0&&s.disable!==!0&&O.value===!0&&h(d,"push"),Le(p.default,d)}return()=>se(Ge,{class:"q-btn-toggle",...g.value,rounded:s.rounded,stretch:s.stretch,glossy:s.glossy,spread:s.spread},D)}});const Ze=$e("counter",{state:()=>({customerList:[],itemList:[],usageList:[]}),getters:{doubleCount(s){return s.counter*2},getCustomer(s){return s.customerList},getItem(s){return s.itemList},getUsage(s){return s.usageList}},actions:{increment(){this.counter++},setCustomer(s){this.customerList=s},setItem(s){this.itemList=s},setUsage(s){this.usageList=s}}}),Xe=r("div",{class:"text-h6"},"Choose Bank Transfer",-1),el={class:"row q-pt-md"},ll={class:"col"},al={__name:"quotationBankChoose",props:{payment:Array},setup(s){const p=ee(),v=m(!1),O=m([{name:"id",label:"id",field:"id",sortable:!0,align:"left"},{name:"bank_name",label:"Bank Name",field:"bank_name",sortable:!0,align:"left"},{name:"bank_account_name",label:"Bank Acc Name",field:"bank_account_name",sortable:!0,align:"left"},{name:"bank_account_number",label:"Bank Acc Number",field:"bank_account_number",sortable:!0,align:"left"}]),o=m([]),h=m([]),g=s;Z(()=>{g.payment&&g.payment.length>0&&(console.log(g.payment),h.value=g.payment),y()});const y=async()=>{v.value=!0,await A.get("payment-account").then(n=>{console.log(n.data),v.value=!1,o.value=n.data.data}).catch(()=>{v.value=!1})},w=()=>{p.dialog({title:"Confirmation",message:"Do you want to choose all this data ?",cancel:!0,persistent:!0}).onOk(async()=>{console.log(h.value),D(h.value)})},{dialogRef:k,onDialogHide:f,onDialogOK:D,onDialogCancel:d}=_e();return(n,i)=>(V(),q(fe,{ref_key:"dialogRef",ref:k,onHide:j(f),"transition-show":"slide-up","transition-hide":"slide-down","full-width":"",persistent:""},{default:l(()=>[e(ge,{class:"q-dialog-plugin bg-white q-pa-sm"},{default:l(()=>[e(F,null,{default:l(()=>[Xe]),_:1}),e(F,{class:"q-pa-sm"},{default:l(()=>[r("div",el,[r("div",ll,[e(Ce,{title:"List Bank Account",rows:o.value,columns:O.value,"row-key":"id",loading:v.value,dense:"",pagination:{rowsPerPage:20},class:"my-sticky-header-column-table",selection:"multiple",selected:h.value,"onUpdate:selected":i[3]||(i[3]=c=>h.value=c)},{"top-right":l(()=>[e(R,{outlined:"",modelValue:n.filterCol,"onUpdate:modelValue":i[0]||(i[0]=c=>n.filterCol=c),options:O.value,label:"Search Columns","option-value":"name","option-label":"label","emit-value":"",dense:"","map-options":""},null,8,["modelValue","options"]),e(S,{borderless:"",dense:"",modelValue:n.filter,"onUpdate:modelValue":[i[1]||(i[1]=c=>n.filter=c),i[2]||(i[2]=c=>n.dataQuo())],placeholder:"Search",outlined:"",debounce:"1000"},{append:l(()=>[e(X,{name:"search"})]),_:1},8,["modelValue"])]),_:1},8,["rows","columns","loading","selected"])])])]),_:1}),e(pe,{align:"right"},{default:l(()=>[e(T,{label:"OK",color:"primary",onClick:i[4]||(i[4]=c=>w())}),e(T,{flat:"",label:"Cancel",color:"red",onClick:j(d)},null,8,["onClick"])]),_:1})]),_:1})]),_:1},8,["onHide"]))}},tl={class:"text-h6"},ol={style:{border:"1px black solid","border-radius":"10px"}},nl=r("legend",{style:{"margin-left":"1em",padding:"0.2em 0.8em"}},[r("b",null,"Header")],-1),sl={class:"row"},il={class:"col"},ul={class:"col q-pl-md"},dl={class:"row items-center justify-end"},rl={class:"row"},cl={class:"col"},ml={class:"col q-pl-md"},vl={class:"row q-pt-md"},gl={class:"col"},pl={class:"col q-pl-md"},fl={class:"q-pa-sm"},_l={key:0,class:"q-pb-md"},Cl={key:1,class:"q-pb-md"},bl={style:{border:"1px black solid","border-radius":"10px",height:"35vh",overflow:"auto"}},Tl=r("legend",{style:{"margin-left":"1em",padding:"0.2em 0.8em"}},[r("b",null,"Detail Items")],-1),hl={class:"row q-pb-md"},yl={class:"col"},Ul={class:"col text-right"},Vl={class:"row"},Ql={class:"col"},ve={__name:"quotationCreate",props:{quoHeader:String},setup(s){const p=ee(),v=Ze(),O=s;Z(async()=>{v.getCustomer.length===0?(await le(""),v.setCustomer(Y.value)):Y.value=v.getCustomer,v.getItem.length===0?(await ae(""),v.setItem(x.value)):x.value=v.getItem,v.getUsage.length===0?(await te(""),v.setUsage(H.value)):H.value=v.getUsage,O.quoHeader&&await Te(O.quoHeader),oe()});const o=m(!1),h=m(""),g=m(""),y=m(""),w=m(""),k=m(""),f=m(""),D=m(""),d=m([]),n=m(1),i=m(0),c=m([]),U=m([]),b=m(""),E=m(""),x=m([]),Y=m([]),H=m([]),be=N(()=>n.value===1?U.value.length===0||U.value.filter(u=>!u.item||!u.price).length>0:U.value.length===0||U.value.filter(u=>!u.item||!u.price||!u.qty).length>0),J=(u,t,a,C)=>{t(async()=>{C==="cust"&&await le(u),C==="item"&&await ae(u),C==="usage"&&await te(u)})},le=async u=>{o.value=!0,await A.post("customer/searchAPI",{searchValue:u}).then(t=>{o.value=!1,Y.value=t.data.data}).catch(()=>{o.value=!1})},ae=async u=>{o.value=!0,await A.post("item/searchAPI",{searchValue:u}).then(t=>{o.value=!1,x.value=t.data.data}).catch(()=>{o.value=!1})},te=async u=>{o.value=!0,await A.post("usage/searchAPI",{searchValue:u}).then(t=>{o.value=!1,H.value=t.data.data}).catch(()=>{o.value=!1})},Te=async u=>{o.value=!0,await He.get(`transaction/quotation/view/${btoa(u)}`).then(t=>{o.value=!1;const a=t.data.data;h.value=a.TQUO_QUOCD,g.value=a.TQUO_ISSUDT,y.value=a.TQUO_CUSCD,w.value=a.TQUO_ATTN,k.value=a.TQUO_SBJCT,f.value=a.TQUO_PROJECT_LOCATION,D.value=a.cond,d.value=a.condlist,n.value=parseInt(a.TQUO_TYPE),i.value=a.TQUO_SERVTRANS_COST,c.value=a.payment,a.det.map(C=>{U.value.push({item:C.TQUODETA_ITMCD,usage:parseInt(C.TQUODETA_USAGE),price:C.TQUODETA_PRC,electric:C.TQUODETA_ELECTRICITY,qty:C.TQUODETA_ITMQT})}),console.log(t)}).catch(()=>{o.value=!1})},he=()=>{U.value.push({item:"",usage:"",price:"",electric:"",qty:1})},ye=u=>{p.dialog({title:"Confirmation",message:`Do you want to delete this lines no ${u+1} ?`,cancel:!0,persistent:!0}).onOk(async()=>{U.value.splice(u,1)})},Ue=()=>{p.dialog({title:"Confirmation",message:"Do you want to clear all this line ?",cancel:!0,persistent:!0}).onOk(async()=>{U.value=[]})},Ve=()=>{p.dialog({component:We}).onOk(async u=>{D.value=u.MCONDITION_RPT_STAT,d.value=u.group})},Qe=()=>{p.dialog({component:ze,componentProps:{listCond:d.value}}).onOk(async u=>{})},Oe=()=>{p.dialog({component:al,componentProps:{payment:c.value}}).onOk(async u=>{c.value=u})},oe=async()=>{o.value=!0,await A.post("servicesAdmins/search",{searchBy:"TSRVD_FLGSTS",searchValue:"1",onlyShowWoQuo:!0}).then(u=>{o.value=!1,E.value=u.data.data}).catch(u=>{o.value=!1})},ke=async()=>{p.dialog({title:"Confirmation",message:"Do you want to save all this data ?",cancel:!0,persistent:!0}).onOk(async()=>{d.value.length===0?p.dialog({title:"Confirmation",message:"You're not selecting any condition, are you sure want to continue ?",cancel:!0,persistent:!0}).onOk(async()=>{ne()}):ne()})},ne=async()=>{o.value=!0,await A.post("quotationNew/saveAPI",{TQUO_QUOCD:h.value,TQUO_CUSCD:y.value,TQUO_ATTN:w.value,TQUO_SBJCT:k.value,TQUO_ISSUDT:g.value,TQUO_PROJECT_LOCATION:f.value,TQUO_TYPE:n.value,TQUO_SERVTRANS_COST:i.value,DET:U.value,COND:D.value,CONDLIST:d.value,PAYMENT:c.value}).then(u=>{o.value=!1,console.log(u),Ae()}).catch(()=>{o.value=!1})},Se=u=>{D.value="",d.value=[],i.value=0,U.value=[]},we=async u=>{o.value=!0,await A.post("servicesAdmins/search",{searchBy:"SRVH_DOCNO",searchValue:u}).then(t=>{o.value=!1;const a=t.data.data[0];y.value=a.MCUS_CUSCD,k.value=`SERVICE - ${u}`,a.detail.map(C=>{C.list_fix_det.map(_=>{U.value.push({item:_.MITM_ITMCD,usage:0,price:_.TSRVF_PRC,electric:"",qty:_.TSRVF_QTY})})}),console.log(a)}).catch(t=>{o.value=!1})},{dialogRef:De,onDialogHide:qe,onDialogOK:Ae,onDialogCancel:Ie}=_e();return(u,t)=>(V(),q(fe,{ref_key:"dialogRef",ref:De,onHide:j(qe),"transition-show":"slide-up","transition-hide":"slide-down","full-width":"",persistent:""},{default:l(()=>[e(ge,{class:"q-dialog-plugin bg-white q-pa-sm"},{default:l(()=>[e(F,null,{default:l(()=>[r("div",tl,P(O.quoHeader?"Edit ":"Create ")+" Quotation ",1)]),_:1}),e(F,{class:"q-pa-sm"},{default:l(()=>[r("fieldset",ol,[nl,r("div",sl,[r("div",il,[e(S,{label:"Quotation Code",dense:"",filled:"",modelValue:h.value,"onUpdate:modelValue":t[0]||(t[0]=a=>h.value=a),disable:"",loading:o.value},null,8,["modelValue","loading"])]),r("div",ul,[e(S,{filled:"",modelValue:g.value,"onUpdate:modelValue":t[2]||(t[2]=a=>g.value=a),dense:"",label:"Issue Date",loading:o.value,onClick:t[3]||(t[3]=a=>g.value.qDateProxy.show()),mask:"####-##-##","fill-mask":"",hint:"Mask: YYYY-MM-DD"},{append:l(()=>[e(X,{name:"event",class:"cursor-pointer"},{default:l(()=>[e(Fe,{cover:"","transition-show":"scale","transition-hide":"scale"},{default:l(()=>[e(je,{modelValue:g.value,"onUpdate:modelValue":t[1]||(t[1]=a=>g.value=a),mask:"YYYY-MM-DD"},{default:l(()=>[r("div",dl,[ie(e(T,{label:"Close",color:"primary",flat:""},null,512),[[Je]])])]),_:1},8,["modelValue"])]),_:1})]),_:1})]),_:1},8,["modelValue","loading"])])]),r("div",rl,[r("div",cl,[e(R,{dense:"",filled:"",label:"Customer Name",modelValue:y.value,"onUpdate:modelValue":t[4]||(t[4]=a=>y.value=a),"use-input":"","input-debounce":"500",options:Y.value,onFilter:t[5]||(t[5]=(a,C,_)=>J(a,C,_,"cust")),behavior:"dialog","option-label":"MCUS_CUSNM","option-value":"MCUS_CUSCD","emit-value":"","map-options":"",loading:o.value,readonly:n.value===3},null,8,["modelValue","options","loading","readonly"])]),r("div",ml,[e(S,{label:"Attn.",dense:"",filled:"",modelValue:w.value,"onUpdate:modelValue":t[6]||(t[6]=a=>w.value=a),loading:o.value},null,8,["modelValue","loading"])])]),r("div",vl,[r("div",gl,[e(S,{label:"Subject",dense:"",filled:"",modelValue:k.value,"onUpdate:modelValue":t[7]||(t[7]=a=>k.value=a),loading:o.value,readonly:n.value===3},null,8,["modelValue","loading","readonly"])]),r("div",pl,[e(S,{label:"Project Location",dense:"",filled:"",modelValue:f.value,"onUpdate:modelValue":t[8]||(t[8]=a=>f.value=a),loading:o.value},null,8,["modelValue","loading"])])])]),r("div",fl,[e(Ke,{modelValue:n.value,"onUpdate:modelValue":[t[9]||(t[9]=a=>n.value=a),t[10]||(t[10]=a=>Se(a))],spread:"",class:"my-custom-toggle","no-caps":"",rounded:"",unelevated:"","toggle-color":"primary",color:"white","text-color":"primary",options:[{label:"Rental",value:1},{label:"Sale",value:2},{label:"Service",value:3}],dense:"",loading:o.value},null,8,["modelValue","loading"])]),n.value===3?(V(),$("div",_l,[e(R,{dense:"",filled:"",label:"Service ID",modelValue:b.value,"onUpdate:modelValue":[t[11]||(t[11]=a=>b.value=a),t[12]||(t[12]=a=>we(a))],options:E.value,behavior:"dialog","option-label":"LBLDATA","option-value":"SRVH_DOCNO","emit-value":"","map-options":"",loading:o.value,onClick:t[13]||(t[13]=a=>oe())},null,8,["modelValue","options","loading"])])):M("",!0),n.value===2||n.value===3?(V(),$("div",Cl,[e(S,{prefix:"Rp",label:"Service & Transportation Price",modelValue:i.value,"onUpdate:modelValue":t[14]||(t[14]=a=>i.value=a),filled:"",dense:"",loading:o.value},null,8,["modelValue","loading"])])):M("",!0),r("fieldset",bl,[Tl,r("div",hl,[r("div",yl,[e(T,{flat:"",icon:"add",color:"blue",label:"Add Lines",onClick:he,disable:!n.value,loading:o.value},null,8,["disable","loading"]),e(T,{color:"red",onClick:Ue,flat:"",icon:"refresh",loading:o.value},{default:l(()=>[e(L,null,{default:l(()=>[Q("Clear All Lines")]),_:1})]),_:1},8,["loading"])]),r("div",Ul,[e(T,{color:"blue",label:"Assign Conditions",onClick:Ve,loading:o.value},null,8,["loading"]),e(T,{color:"indigo",label:"Assign Bank Account",onClick:Oe,loading:o.value},{default:l(()=>[e(me,{color:"red",floating:""},{default:l(()=>[Q(P(c.value.length),1)]),_:1})]),_:1},8,["loading"]),e(T,{icon:"visibility",color:"indigo",flat:"",onClick:Qe,loading:o.value},{default:l(()=>[e(L,null,{default:l(()=>[Q("View Conditions")]),_:1}),e(me,{color:"red",floating:""},{default:l(()=>[Q(P(d.value.length),1)]),_:1})]),_:1},8,["loading"])])]),r("div",Vl,[r("div",Ql,[e(Ye,{bordered:"",dense:""},{default:l(()=>[U.value.length>0?(V(!0),$(z,{key:0},K(U.value,(a,C)=>(V(),q(ue,{key:C,class:"q-my-sm",dense:""},{default:l(()=>[e(I,{avatar:""},{default:l(()=>[e(Me,{"text-color":"blue"},{default:l(()=>[Q(P(C+1),1)]),_:2},1024)]),_:2},1024),e(I,null,{default:l(()=>[e(B,null,{default:l(()=>[e(R,{dense:"",filled:"",label:"Item Name",modelValue:a.item,"onUpdate:modelValue":_=>a.item=_,"use-input":"","input-debounce":"500",options:x.value,onFilter:t[15]||(t[15]=(_,G,W)=>J(_,G,W,"item")),behavior:"dialog","option-label":"MITM_ITMNM","option-value":"MITM_ITMNM","emit-value":"","map-options":"",loading:o.value},null,8,["modelValue","onUpdate:modelValue","options","loading"])]),_:2},1024)]),_:2},1024),n.value===1?(V(),q(I,{key:0},{default:l(()=>[e(B,null,{default:l(()=>[e(R,{dense:"",filled:"",label:"Usage",modelValue:a.usage,"onUpdate:modelValue":_=>a.usage=_,"use-input":"","input-debounce":"500",options:H.value,onFilter:t[16]||(t[16]=(_,G,W)=>J(_,G,W,"usage")),behavior:"dialog","option-label":"MUSAGE_DESCALL","option-value":"id","emit-value":"","map-options":"",loading:o.value},null,8,["modelValue","onUpdate:modelValue","options","loading"])]),_:2},1024)]),_:2},1024)):M("",!0),e(I,null,{default:l(()=>[e(B,null,{default:l(()=>[e(S,{prefix:"Rp",dense:"",label:"Price",filled:"",modelValue:a.price,"onUpdate:modelValue":_=>a.price=_},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1024)]),_:2},1024),n.value===1?(V(),q(I,{key:1},{default:l(()=>[e(B,null,{default:l(()=>[e(S,{dense:"",label:"Electricity",filled:"",modelValue:a.electric,"onUpdate:modelValue":_=>a.electric=_},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1024)]),_:2},1024)):M("",!0),n.value===2?(V(),q(I,{key:2},{default:l(()=>[e(B,null,{default:l(()=>[e(S,{dense:"",label:"Qty",filled:"",modelValue:a.qty,"onUpdate:modelValue":_=>a.qty=_},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1024)]),_:2},1024)):M("",!0),e(I,{side:""},{default:l(()=>[e(T,{icon:"delete",color:"red",flat:"",onClick:_=>ye(C)},null,8,["onClick"])]),_:2},1024)]),_:2},1024))),128)):ie((V(),q(ue,{key:1,class:"q-my-sm",clickable:""},{default:l(()=>[e(I,null,{default:l(()=>[e(B,null,{default:l(()=>[Q(" No Items Added ")]),_:1})]),_:1})]),_:1})),[[Ee]])]),_:1})])])])]),_:1}),e(pe,{align:"right"},{default:l(()=>[e(T,{label:"OK",color:"primary",onClick:t[17]||(t[17]=a=>ke()),disable:be.value,loading:o.value},null,8,["disable","loading"]),e(T,{flat:"",label:"Cancel",color:"red",onClick:j(Ie)},null,8,["onClick"])]),_:1})]),_:1})]),_:1},8,["onHide"]))}};const Ol={class:"q-pa-md"},kl={class:"row q-pb-md"},Sl=r("div",{class:"col"},[r("span",{class:"text-h4"},"Quotation ")],-1),wl={class:"col text-right"},Dl={class:"row q-pt-md"},ql={class:"col"},Hl={__name:"quotationView",setup(s){const p=ee(),v=m("TQUO_QUOCD"),O=m(""),o=m([]),h=m([{name:"TQUO_QUOCD",label:"Quot. Code",field:"TQUO_QUOCD",sortable:!0,align:"left"},{name:"TQUO_SBJCT",label:"Quot. Subject",field:"TQUO_SBJCT",sortable:!0,align:"left"},{name:"MCUS_CUSNM",label:"Customer Name",field:"MCUS_CUSNM",sortable:!0,align:"left"},{name:"TQUO_ATTN",label:"Customer Attn",field:"TQUO_ATTN",sortable:!0,align:"left"},{name:"TQUO_CUSCD",label:"Customer Code",field:"TQUO_CUSCD",sortable:!0,align:"left"},{name:"TQUO_ISSUDT",label:"Issue Date",field:"TQUO_ISSUDT",sortable:!0,align:"left"},{name:"TQUO_PROJECT_LOCATION",label:"Proj. Loc",field:"TQUO_PROJECT_LOCATION",sortable:!0,align:"left"}]),g=m(!1);Z(()=>{y()});const y=async()=>{g.value=!0,await A.post("quotation/search",{searchBy:v.value,searchValue:O.value}).then(d=>{g.value=!1,o.value=d.data.data}).catch(d=>{g.value=!1})},w=()=>{p.dialog({component:ve}).onOk(async d=>{y()})},k=d=>{console.log(d),p.dialog({component:ve,componentProps:{quoHeader:d}}).onOk(async n=>{y()})},f=d=>{p.dialog({title:"Confirmation",message:"Are you sure want to delete this data ?",cancel:!0,persistent:!0}).onOk(async()=>{g.value=!0,await A.delete(`quotationNew/${btoa(d)}`).then(n=>{g.value=!1,y()})})},D=d=>{window.open("https://joss.jatpowerindo.co.id/PDF/quotation/"+btoa(d),"_blank").focus()};return(d,n)=>(V(),$("div",Ol,[r("div",kl,[Sl,r("div",wl,[e(T,{icon:"add",color:"blue",onClick:w},{default:l(()=>[e(L,null,{default:l(()=>[Q("Create New Quotation")]),_:1})]),_:1})])]),e(xe),r("div",Dl,[r("div",ql,[e(Ce,{title:"Created Quotation",rows:o.value,columns:h.value,"row-key":"name",loading:g.value,dense:"",pagination:{rowsPerPage:20},class:"my-sticky-header-column-table"},{"top-right":l(()=>[e(R,{outlined:"",modelValue:v.value,"onUpdate:modelValue":n[0]||(n[0]=i=>v.value=i),options:h.value,label:"Search Columns","option-value":"name","option-label":"label","emit-value":"",dense:"","map-options":""},null,8,["modelValue","options"]),e(S,{borderless:"",dense:"",modelValue:O.value,"onUpdate:modelValue":[n[1]||(n[1]=i=>O.value=i),n[2]||(n[2]=i=>y())],placeholder:"Search",outlined:"",debounce:"1000"},{append:l(()=>[e(X,{name:"search"})]),_:1},8,["modelValue"])]),header:l(i=>[e(re,{props:i},{default:l(()=>[e(de,{"auto-width":""},{default:l(()=>[Q("Action")]),_:1}),(V(!0),$(z,null,K(i.cols,c=>(V(),q(de,{key:c.name,props:i},{default:l(()=>[Q(P(c.label),1)]),_:2},1032,["props"]))),128))]),_:2},1032,["props"])]),body:l(i=>[e(re,{props:i},{default:l(()=>[e(ce,{"auto-width":""},{default:l(()=>[e(T,{flat:"",color:i.row.TQUO_APPRVDT!==null?"grey":"orange",icon:"edit",onClick:c=>k(i.row.TQUO_QUOCD),dense:"",disable:i.row.TQUO_APPRVDT!==null},{default:l(()=>[e(L,null,{default:l(()=>[Q(P(i.row.TQUO_APPRVDT?"Quotation already approved, cannot edit !":"Edit this quotation"),1)]),_:2},1024)]),_:2},1032,["color","onClick","disable"]),e(T,{flat:"",color:i.row.TQUO_APPRVDT!==null?"grey":"red",icon:"delete",onClick:c=>f(i.row.TQUO_QUOCD),dense:"",disable:i.row.TQUO_APPRVDT!==null},{default:l(()=>[e(L,null,{default:l(()=>[Q(P(i.row.TQUO_APPRVDT?"Quotation already approved, cannot delete !":"Delete this quotation"),1)]),_:2},1024)]),_:2},1032,["color","onClick","disable"]),e(T,{flat:"",color:"indigo",icon:"print",onClick:c=>D(i.row.TQUO_QUOCD),dense:""},{default:l(()=>[e(L,null,{default:l(()=>[Q("Print this quotation")]),_:1})]),_:2},1032,["onClick"])]),_:2},1024),(V(!0),$(z,null,K(i.cols,c=>(V(),q(ce,{key:c.name,props:i},{default:l(()=>[Q(P(c.value),1)]),_:2},1032,["props"]))),128))]),_:2},1032,["props"])]),_:1},8,["rows","columns","loading"])])])]))}};export{Hl as default};
