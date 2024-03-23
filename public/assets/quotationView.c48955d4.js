import{Q as L}from"./QTooltip.4f6ac51e.js";import{c as qe,aH as Ae,a as $,aY as Pe,h as de,Q as C,y as Ne,aZ as Be,a_ as $e,s as m,B as T,C as I,D as l,E as e,L as Z,M as R,I as d,P as M,R as j,S as F,T as z,H as Q,O as A,V as pe,W as ee,X as E,Y as le,o as ae,Z as S,am as te,a$ as Y,U as Le,aX as Me}from"./index.4561efb7.js";import{u as J,a as X,b as q,c as P,j as fe,k as x,Q as Re,l as re}from"./QTable.073ae85b.js";import{Q as ce,a as me}from"./QTd.f8f18e09.js";import{api as _e,api_web as N}from"./axios.25482831.js";import{Q as Ee,a as xe,C as He}from"./ClosePopup.590051e3.js";import{Q as Ye,u as oe}from"./use-dialog-plugin-component.b72a5d06.js";import{Q as ve}from"./QBadge.f72d3c48.js";import{_ as je}from"./assignConditionsView.ac523d57.js";import"./use-cache.b0833c75.js";import"./date.6352da73.js";var Fe=qe({name:"QBtnToggle",props:{...Ae,modelValue:{required:!0},options:{type:Array,required:!0,validator:t=>t.every(v=>("label"in v||"icon"in v||"slot"in v)&&"value"in v)},color:String,textColor:String,toggleColor:{type:String,default:"primary"},toggleTextColor:String,outline:Boolean,flat:Boolean,unelevated:Boolean,rounded:Boolean,push:Boolean,glossy:Boolean,size:String,padding:String,noCaps:Boolean,noWrap:Boolean,dense:Boolean,readonly:Boolean,disable:Boolean,stack:Boolean,stretch:Boolean,spread:Boolean,clearable:Boolean,ripple:{type:[Boolean,Object],default:!0}},emits:["update:modelValue","clear","click"],setup(t,{slots:v,emit:g}){const k=$(()=>t.options.find(u=>u.value===t.modelValue)!==void 0),n=$(()=>({type:"hidden",name:t.name,value:t.modelValue})),b=Be(n),f=$(()=>Pe(t)),y=$(()=>({rounded:t.rounded,dense:t.dense,...f.value})),O=$(()=>t.options.map((u,s)=>{const{attrs:i,value:p,slot:w,..._}=u;return{slot:w,props:{key:s,"aria-pressed":p===t.modelValue?"true":"false",...i,..._,...y.value,disable:t.disable===!0||_.disable===!0,color:p===t.modelValue?c(_,"toggleColor"):c(_,"color"),textColor:p===t.modelValue?c(_,"toggleTextColor"):c(_,"textColor"),noCaps:c(_,"noCaps")===!0,noWrap:c(_,"noWrap")===!0,size:c(_,"size"),padding:c(_,"padding"),ripple:c(_,"ripple"),stack:c(_,"stack")===!0,stretch:c(_,"stretch")===!0,onClick(B){V(p,u,B)}}}}));function V(u,s,i){t.readonly!==!0&&(t.modelValue===u?t.clearable===!0&&(g("update:modelValue",null,null),g("clear")):g("update:modelValue",u,s),g("click",i))}function c(u,s){return u[s]===void 0?t[s]:u[s]}function D(){const u=O.value.map(s=>de(C,s.props,s.slot!==void 0?v[s.slot]:void 0));return t.name!==void 0&&t.disable!==!0&&k.value===!0&&b(u,"push"),Ne(v.default,u)}return()=>de(Ye,{class:"q-btn-toggle",...f.value,rounded:t.rounded,stretch:t.stretch,glossy:t.glossy,spread:t.spread},D)}});const Je=$e("counter",{state:()=>({customerList:[],itemList:[],usageList:[]}),getters:{doubleCount(t){return t.counter*2},getCustomer(t){return t.customerList},getItem(t){return t.itemList},getUsage(t){return t.usageList}},actions:{increment(){this.counter++},setCustomer(t){this.customerList=t},setItem(t){this.itemList=t},setUsage(t){this.usageList=t}}}),Ge={class:"row"},Ke=d("div",{class:"col text-h6"},"View Condition",-1),We={class:"col text-right"},ze={__name:"viewAssignedCond",props:{listCond:Array},setup(t){const v=t,g=J();m(!1);const k=()=>{g.dialog({title:"Prompt",message:"Input group name conditions",prompt:{model:"",isValid:O=>O.length>2,type:"text"},cancel:!0,persistent:!0}).onOk(async O=>{let V=[];console.log(v.listCond),v.listCond.map(c=>{V.push({id:c.id,MCONDITION_DESCRIPTION:c.MCONDITION_DESCRIPTION})}),await _e.post("/master/conditions/assignGroup",{data:V,MCONDITION_RPT_STAT:O}).then(c=>{console.log(c)})})},{dialogRef:n,onDialogHide:b,onDialogOK:f,onDialogCancel:y}=oe();return(O,V)=>(T(),I(le,{ref_key:"dialogRef",ref:n,onHide:E(b),"transition-show":"slide-up","transition-hide":"slide-down","full-width":""},{default:l(()=>[e(Z,{class:"q-dialog-plugin bg-white q-pa-sm"},{default:l(()=>[e(R,null,{default:l(()=>[d("div",Ge,[Ke,d("div",We,[e(C,{label:"Save Template",color:"blue",onClick:k})])])]),_:1}),e(R,{class:"q-pa-sm"},{default:l(()=>[(T(!0),M(j,null,F(v.listCond,(c,D)=>z((T(),I(X,{clickable:"",key:D},{default:l(()=>[e(q,null,{default:l(()=>[e(P,null,{default:l(()=>[Q(A(c.MCONDITION_DESCRIPTION),1)]),_:2},1024),e(P,{caption:""},{default:l(()=>[Q("Description")]),_:1})]),_:2},1024)]),_:2},1024)),[[pe]])),128))]),_:1}),e(ee,{align:"right"},{default:l(()=>[e(C,{label:"OK",color:"primary",onClick:E(f)},null,8,["onClick"])]),_:1})]),_:1})]),_:1},8,["onHide"]))}},Xe=d("div",{class:"text-h6"},"Choose Bank Transfer",-1),Ze={class:"row q-pt-md"},el={class:"col"},ll={__name:"quotationBankChoose",props:{payment:Array},setup(t){const v=J(),g=m(!1),k=m([{name:"id",label:"id",field:"id",sortable:!0,align:"left"},{name:"bank_name",label:"Bank Name",field:"bank_name",sortable:!0,align:"left"},{name:"bank_account_name",label:"Bank Acc Name",field:"bank_account_name",sortable:!0,align:"left"},{name:"bank_account_number",label:"Bank Acc Number",field:"bank_account_number",sortable:!0,align:"left"}]),n=m([]),b=m([]),f=t;ae(()=>{f.payment&&f.payment.length>0&&(console.log(f.payment),b.value=f.payment),y()});const y=async()=>{g.value=!0,await N.get("payment-account").then(s=>{console.log(s.data),g.value=!1,n.value=s.data.data}).catch(()=>{g.value=!1})},O=()=>{v.dialog({title:"Confirmation",message:"Do you want to choose all this data ?",cancel:!0,persistent:!0}).onOk(async()=>{console.log(b.value),D(b.value)})},{dialogRef:V,onDialogHide:c,onDialogOK:D,onDialogCancel:u}=oe();return(s,i)=>(T(),I(le,{ref_key:"dialogRef",ref:V,onHide:E(c),"transition-show":"slide-up","transition-hide":"slide-down","full-width":"",persistent:""},{default:l(()=>[e(Z,{class:"q-dialog-plugin bg-white q-pa-sm"},{default:l(()=>[e(R,null,{default:l(()=>[Xe]),_:1}),e(R,{class:"q-pa-sm"},{default:l(()=>[d("div",Ze,[d("div",el,[e(fe,{title:"List Bank Account",rows:n.value,columns:k.value,"row-key":"id",loading:g.value,dense:"",pagination:{rowsPerPage:20},class:"my-sticky-header-column-table",selection:"multiple",selected:b.value,"onUpdate:selected":i[3]||(i[3]=p=>b.value=p)},{"top-right":l(()=>[e(x,{outlined:"",modelValue:s.filterCol,"onUpdate:modelValue":i[0]||(i[0]=p=>s.filterCol=p),options:k.value,label:"Search Columns","option-value":"name","option-label":"label","emit-value":"",dense:"","map-options":""},null,8,["modelValue","options"]),e(S,{borderless:"",dense:"",modelValue:s.filter,"onUpdate:modelValue":[i[1]||(i[1]=p=>s.filter=p),i[2]||(i[2]=p=>s.dataQuo())],placeholder:"Search",outlined:"",debounce:"1000"},{append:l(()=>[e(te,{name:"search"})]),_:1},8,["modelValue"])]),_:1},8,["rows","columns","loading","selected"])])])]),_:1}),e(ee,{align:"right"},{default:l(()=>[e(C,{label:"OK",color:"primary",onClick:i[4]||(i[4]=p=>O())}),e(C,{flat:"",label:"Cancel",color:"red",onClick:E(u)},null,8,["onClick"])]),_:1})]),_:1})]),_:1},8,["onHide"]))}},al={class:"text-h6"},tl={style:{border:"1px black solid","border-radius":"10px"}},ol=d("legend",{style:{"margin-left":"1em",padding:"0.2em 0.8em"}},[d("b",null,"Header")],-1),nl={class:"row"},sl={class:"col"},il={class:"col q-pl-md"},ul={class:"row items-center justify-end"},dl={class:"row"},rl={class:"col"},cl={class:"col q-pl-md"},ml={class:"row q-pt-md"},vl={class:"col"},gl={class:"col q-pl-md"},pl={class:"q-pa-sm"},fl={key:0,class:"q-pb-md"},_l={style:{border:"1px black solid","border-radius":"10px",height:"35vh",overflow:"auto"}},Cl=d("legend",{style:{"margin-left":"1em",padding:"0.2em 0.8em"}},[d("b",null,"Detail Items")],-1),bl={class:"row q-pb-md"},Tl={class:"col"},hl={class:"col text-right"},yl={class:"row"},Ol={class:"col"},ge={__name:"quotationCreate",props:{quoHeader:String},setup(t){const v=J(),g=Je(),k=t;ae(async()=>{g.getCustomer.length===0?(await ne(""),g.setCustomer(B.value)):B.value=g.getCustomer,g.getItem.length===0?(await se(""),g.setItem(_.value)):_.value=g.getItem,g.getUsage.length===0?(await ie(""),g.setUsage(H.value)):H.value=g.getUsage,k.quoHeader&&be(k.quoHeader)});const n=m(!1),b=m(""),f=m(""),y=m(""),O=m(""),V=m(""),c=m(""),D=m(""),u=m([]),s=m(1),i=m(0),p=m([]),w=m([]),_=m([]),B=m([]),H=m([]),Ce=$(()=>s.value===1?w.value.length===0||w.value.filter(r=>!r.item||!r.price).length>0:w.value.length===0||w.value.filter(r=>!r.item||!r.price||!r.qty).length>0),G=(r,o,a,U)=>{o(async()=>{U==="cust"&&await ne(r),U==="item"&&await se(r),U==="usage"&&await ie(r)})},ne=async r=>{n.value=!0,await N.post("customer/searchAPI",{searchValue:r}).then(o=>{n.value=!1,B.value=o.data.data}).catch(()=>{n.value=!1})},se=async r=>{n.value=!0,await N.post("item/searchAPI",{searchValue:r}).then(o=>{n.value=!1,_.value=o.data.data}).catch(()=>{n.value=!1})},ie=async r=>{n.value=!0,await N.post("usage/searchAPI",{searchValue:r}).then(o=>{n.value=!1,H.value=o.data.data}).catch(()=>{n.value=!1})},be=async r=>{n.value=!0,await _e.get(`transaction/quotation/view/${btoa(r)}`).then(o=>{n.value=!1;const a=o.data.data;b.value=a.TQUO_QUOCD,f.value=a.TQUO_ISSUDT,y.value=a.TQUO_CUSCD,O.value=a.TQUO_ATTN,V.value=a.TQUO_SBJCT,c.value=a.TQUO_PROJECT_LOCATION,D.value=a.cond,u.value=a.condlist,s.value=parseInt(a.TQUO_TYPE),i.value=a.TQUO_SERVTRANS_COST,a.det.map(U=>{w.value.push({item:U.TQUODETA_ITMCD,usage:parseInt(U.TQUODETA_USAGE),price:U.TQUODETA_PRC,electric:U.TQUODETA_ELECTRICITY,qty:U.TQUODETA_ITMQT})}),console.log(o)}).catch(()=>{n.value=!1})},Te=()=>{w.value.push({item:"",usage:"",price:"",electric:"",qty:1})},he=r=>{v.dialog({title:"Confirmation",message:`Do you want to delete this lines no ${r+1} ?`,cancel:!0,persistent:!0}).onOk(async()=>{w.value.splice(r,1)})},ye=()=>{v.dialog({title:"Confirmation",message:"Do you want to clear all this line ?",cancel:!0,persistent:!0}).onOk(async()=>{w.value=[]})},Oe=()=>{v.dialog({component:je}).onOk(async r=>{D.value=r.MCONDITION_RPT_STAT,u.value=r.group})},Ue=()=>{v.dialog({component:ze,componentProps:{listCond:u.value}}).onOk(async r=>{})},Qe=()=>{v.dialog({component:ll,componentProps:{payment:p.value}}).onOk(async r=>{})},ke=async()=>{v.dialog({title:"Confirmation",message:"Do you want to save all this data ?",cancel:!0,persistent:!0}).onOk(async()=>{u.value.length===0?v.dialog({title:"Confirmation",message:"You're not selecting any condition, are you sure want to continue ?",cancel:!0,persistent:!0}).onOk(async()=>{ue()}):ue()})},ue=async()=>{n.value=!0,await N.post("quotationNew/saveAPI",{TQUO_QUOCD:b.value,TQUO_CUSCD:y.value,TQUO_ATTN:O.value,TQUO_SBJCT:V.value,TQUO_ISSUDT:f.value,TQUO_PROJECT_LOCATION:c.value,TQUO_TYPE:s.value,TQUO_SERVTRANS_COST:i.value,DET:w.value,COND:D.value,CONDLIST:u.value,PAYMENT:p.value}).then(r=>{n.value=!1,console.log(r),Se()}).catch(()=>{n.value=!1})},Ve=r=>{D.value="",u.value=[],i.value=0,w.value=[]},{dialogRef:we,onDialogHide:De,onDialogOK:Se,onDialogCancel:Ie}=oe();return(r,o)=>(T(),I(le,{ref_key:"dialogRef",ref:we,onHide:E(De),"transition-show":"slide-up","transition-hide":"slide-down","full-width":"",persistent:""},{default:l(()=>[e(Z,{class:"q-dialog-plugin bg-white q-pa-sm"},{default:l(()=>[e(R,null,{default:l(()=>[d("div",al,A(k.quoHeader?"Edit ":"Create ")+" Quotation ",1)]),_:1}),e(R,{class:"q-pa-sm"},{default:l(()=>[d("fieldset",tl,[ol,d("div",nl,[d("div",sl,[e(S,{label:"Quotation Code",dense:"",filled:"",modelValue:b.value,"onUpdate:modelValue":o[0]||(o[0]=a=>b.value=a),disable:"",loading:n.value},null,8,["modelValue","loading"])]),d("div",il,[e(S,{filled:"",modelValue:f.value,"onUpdate:modelValue":o[2]||(o[2]=a=>f.value=a),dense:"",label:"Issue Date",loading:n.value,onClick:o[3]||(o[3]=a=>f.value.qDateProxy.show()),mask:"####-##-##","fill-mask":"",hint:"Mask: YYYY-MM-DD"},{append:l(()=>[e(te,{name:"event",class:"cursor-pointer"},{default:l(()=>[e(Ee,{cover:"","transition-show":"scale","transition-hide":"scale"},{default:l(()=>[e(xe,{modelValue:f.value,"onUpdate:modelValue":o[1]||(o[1]=a=>f.value=a),mask:"YYYY-MM-DD"},{default:l(()=>[d("div",ul,[z(e(C,{label:"Close",color:"primary",flat:""},null,512),[[He]])])]),_:1},8,["modelValue"])]),_:1})]),_:1})]),_:1},8,["modelValue","loading"])])]),d("div",dl,[d("div",rl,[e(x,{dense:"",filled:"",label:"Customer Name",modelValue:y.value,"onUpdate:modelValue":o[4]||(o[4]=a=>y.value=a),"use-input":"","input-debounce":"500",options:B.value,onFilter:o[5]||(o[5]=(a,U,h)=>G(a,U,h,"cust")),behavior:"dialog","option-label":"MCUS_CUSNM","option-value":"MCUS_CUSCD","emit-value":"","map-options":"",loading:n.value},null,8,["modelValue","options","loading"])]),d("div",cl,[e(S,{label:"Attn.",dense:"",filled:"",modelValue:O.value,"onUpdate:modelValue":o[6]||(o[6]=a=>O.value=a),loading:n.value},null,8,["modelValue","loading"])])]),d("div",ml,[d("div",vl,[e(S,{label:"Subject",dense:"",filled:"",modelValue:V.value,"onUpdate:modelValue":o[7]||(o[7]=a=>V.value=a),loading:n.value},null,8,["modelValue","loading"])]),d("div",gl,[e(S,{label:"Project Location",dense:"",filled:"",modelValue:c.value,"onUpdate:modelValue":o[8]||(o[8]=a=>c.value=a),loading:n.value},null,8,["modelValue","loading"])])])]),d("div",pl,[e(Fe,{modelValue:s.value,"onUpdate:modelValue":[o[9]||(o[9]=a=>s.value=a),o[10]||(o[10]=a=>Ve(a))],spread:"",class:"my-custom-toggle","no-caps":"",rounded:"",unelevated:"","toggle-color":"primary",color:"white","text-color":"primary",options:[{label:"Rental",value:1},{label:"Sale",value:2}],dense:"",loading:n.value},null,8,["modelValue","loading"])]),s.value===2?(T(),M("div",fl,[e(S,{prefix:"Rp",label:"Service & Transportation Price",modelValue:i.value,"onUpdate:modelValue":o[11]||(o[11]=a=>i.value=a),filled:"",dense:"",loading:n.value},null,8,["modelValue","loading"])])):Y("",!0),d("fieldset",_l,[Cl,d("div",bl,[d("div",Tl,[e(C,{flat:"",icon:"add",color:"blue",label:"Add Lines",onClick:Te,disable:!s.value,loading:n.value},null,8,["disable","loading"]),e(C,{color:"red",onClick:ye,flat:"",icon:"refresh",loading:n.value},{default:l(()=>[e(L,null,{default:l(()=>[Q("Clear All Lines")]),_:1})]),_:1},8,["loading"])]),d("div",hl,[e(C,{color:"blue",label:"Assign Conditions",onClick:Oe,loading:n.value},null,8,["loading"]),e(C,{color:"indigo",label:"Assign Bank Account",onClick:Qe,loading:n.value},{default:l(()=>[e(ve,{color:"red",floating:""},{default:l(()=>[Q(A(p.value.length),1)]),_:1})]),_:1},8,["loading"]),e(C,{icon:"visibility",color:"indigo",flat:"",onClick:Ue,loading:n.value},{default:l(()=>[e(L,null,{default:l(()=>[Q("View Conditions")]),_:1}),e(ve,{color:"red",floating:""},{default:l(()=>[Q(A(u.value.length),1)]),_:1})]),_:1},8,["loading"])])]),d("div",yl,[d("div",Ol,[e(Re,{bordered:"",dense:""},{default:l(()=>[w.value.length>0?(T(!0),M(j,{key:0},F(w.value,(a,U)=>(T(),I(X,{key:U,class:"q-my-sm",dense:""},{default:l(()=>[e(q,{avatar:""},{default:l(()=>[e(Le,{"text-color":"blue"},{default:l(()=>[Q(A(U+1),1)]),_:2},1024)]),_:2},1024),e(q,null,{default:l(()=>[e(P,null,{default:l(()=>[e(x,{dense:"",filled:"",label:"Item Name",modelValue:a.item,"onUpdate:modelValue":h=>a.item=h,"use-input":"","input-debounce":"500",options:_.value,onFilter:o[12]||(o[12]=(h,K,W)=>G(h,K,W,"item")),behavior:"dialog","option-label":"MITM_ITMNM","option-value":"MITM_ITMNM","emit-value":"","map-options":"",loading:n.value},null,8,["modelValue","onUpdate:modelValue","options","loading"])]),_:2},1024)]),_:2},1024),s.value===1?(T(),I(q,{key:0},{default:l(()=>[e(P,null,{default:l(()=>[e(x,{dense:"",filled:"",label:"Usage",modelValue:a.usage,"onUpdate:modelValue":h=>a.usage=h,"use-input":"","input-debounce":"500",options:H.value,onFilter:o[13]||(o[13]=(h,K,W)=>G(h,K,W,"usage")),behavior:"dialog","option-label":"MUSAGE_DESCALL","option-value":"id","emit-value":"","map-options":"",loading:n.value},null,8,["modelValue","onUpdate:modelValue","options","loading"])]),_:2},1024)]),_:2},1024)):Y("",!0),e(q,null,{default:l(()=>[e(P,null,{default:l(()=>[e(S,{prefix:"Rp",dense:"",label:"Price",filled:"",modelValue:a.price,"onUpdate:modelValue":h=>a.price=h},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1024)]),_:2},1024),s.value===1?(T(),I(q,{key:1},{default:l(()=>[e(P,null,{default:l(()=>[e(S,{dense:"",label:"Electricity",filled:"",modelValue:a.electric,"onUpdate:modelValue":h=>a.electric=h},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1024)]),_:2},1024)):Y("",!0),s.value===2?(T(),I(q,{key:2},{default:l(()=>[e(P,null,{default:l(()=>[e(S,{dense:"",label:"Qty",filled:"",modelValue:a.qty,"onUpdate:modelValue":h=>a.qty=h},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1024)]),_:2},1024)):Y("",!0),e(q,{side:""},{default:l(()=>[e(C,{icon:"delete",color:"red",flat:"",onClick:h=>he(U)},null,8,["onClick"])]),_:2},1024)]),_:2},1024))),128)):z((T(),I(X,{key:1,class:"q-my-sm",clickable:""},{default:l(()=>[e(q,null,{default:l(()=>[e(P,null,{default:l(()=>[Q(" No Items Added ")]),_:1})]),_:1})]),_:1})),[[pe]])]),_:1})])])])]),_:1}),e(ee,{align:"right"},{default:l(()=>[e(C,{label:"OK",color:"primary",onClick:o[14]||(o[14]=a=>ke()),disable:Ce.value},null,8,["disable"]),e(C,{flat:"",label:"Cancel",color:"red",onClick:E(Ie)},null,8,["onClick"])]),_:1})]),_:1})]),_:1},8,["onHide"]))}};const Ul={class:"q-pa-md"},Ql={class:"row q-pb-md"},kl=d("div",{class:"col"},[d("span",{class:"text-h4"},"Quotation ")],-1),Vl={class:"col text-right"},wl={class:"row q-pt-md"},Dl={class:"col"},El={__name:"quotationView",setup(t){const v=J(),g=m("TQUO_QUOCD"),k=m(""),n=m([]),b=m([{name:"TQUO_QUOCD",label:"Quot. Code",field:"TQUO_QUOCD",sortable:!0,align:"left"},{name:"TQUO_SBJCT",label:"Quot. Subject",field:"TQUO_SBJCT",sortable:!0,align:"left"},{name:"MCUS_CUSNM",label:"Customer Name",field:"MCUS_CUSNM",sortable:!0,align:"left"},{name:"TQUO_ATTN",label:"Customer Attn",field:"TQUO_ATTN",sortable:!0,align:"left"},{name:"TQUO_CUSCD",label:"Customer Code",field:"TQUO_CUSCD",sortable:!0,align:"left"},{name:"TQUO_ISSUDT",label:"Issue Date",field:"TQUO_ISSUDT",sortable:!0,align:"left"},{name:"TQUO_PROJECT_LOCATION",label:"Proj. Loc",field:"TQUO_PROJECT_LOCATION",sortable:!0,align:"left"}]),f=m(!1);ae(()=>{y()});const y=async()=>{f.value=!0,await N.post("quotation/search",{searchBy:g.value,searchValue:k.value}).then(u=>{f.value=!1,n.value=u.data.data}).catch(u=>{f.value=!1})},O=()=>{v.dialog({component:ge}).onOk(async u=>{y()})},V=u=>{console.log(u),v.dialog({component:ge,componentProps:{quoHeader:u}}).onOk(async s=>{y()})},c=u=>{v.dialog({title:"Confirmation",message:"Are you sure want to delete this data ?",cancel:!0,persistent:!0}).onOk(async()=>{f.value=!0,await N.delete(`quotationNew/${btoa(u)}`).then(s=>{f.value=!1,y()})})},D=u=>{window.open("https://joss.jatpowerindo.co.id/PDF/quotation/"+btoa(u),"_blank").focus()};return(u,s)=>(T(),M("div",Ul,[d("div",Ql,[kl,d("div",Vl,[e(C,{icon:"add",color:"blue",onClick:O},{default:l(()=>[e(L,null,{default:l(()=>[Q("Create New Quotation")]),_:1})]),_:1})])]),e(Me),d("div",wl,[d("div",Dl,[e(fe,{title:"Created Quotation",rows:n.value,columns:b.value,"row-key":"name",loading:f.value,dense:"",pagination:{rowsPerPage:20},class:"my-sticky-header-column-table"},{"top-right":l(()=>[e(x,{outlined:"",modelValue:g.value,"onUpdate:modelValue":s[0]||(s[0]=i=>g.value=i),options:b.value,label:"Search Columns","option-value":"name","option-label":"label","emit-value":"",dense:"","map-options":""},null,8,["modelValue","options"]),e(S,{borderless:"",dense:"",modelValue:k.value,"onUpdate:modelValue":[s[1]||(s[1]=i=>k.value=i),s[2]||(s[2]=i=>y())],placeholder:"Search",outlined:"",debounce:"1000"},{append:l(()=>[e(te,{name:"search"})]),_:1},8,["modelValue"])]),header:l(i=>[e(ce,{props:i},{default:l(()=>[(T(!0),M(j,null,F(i.cols,p=>(T(),I(re,{key:p.name,props:i},{default:l(()=>[Q(A(p.label),1)]),_:2},1032,["props"]))),128)),e(re,{"auto-width":""},{default:l(()=>[Q("Action")]),_:1})]),_:2},1032,["props"])]),body:l(i=>[e(ce,{props:i},{default:l(()=>[(T(!0),M(j,null,F(i.cols,p=>(T(),I(me,{key:p.name,props:i},{default:l(()=>[Q(A(p.value),1)]),_:2},1032,["props"]))),128)),e(me,{"auto-width":""},{default:l(()=>[e(C,{flat:"",color:"orange",icon:"edit",onClick:p=>V(i.row.TQUO_QUOCD),dense:"",disable:i.row.TQUO_APPRVDT!==null},{default:l(()=>[e(L,null,{default:l(()=>[Q(A(i.row.TQUO_APPRVDT?"Quotation already approved, cannot edit !":"Edit this quotation"),1)]),_:2},1024)]),_:2},1032,["onClick","disable"]),e(C,{flat:"",color:"red",icon:"delete",onClick:p=>c(i.row.TQUO_QUOCD),dense:"",disable:i.row.TQUO_APPRVDT!==null},{default:l(()=>[e(L,null,{default:l(()=>[Q(A(i.row.TQUO_APPRVDT?"Quotation already approved, cannot delete !":"Delete this quotation"),1)]),_:2},1024)]),_:2},1032,["onClick","disable"]),e(C,{flat:"",color:"indigo",icon:"print",onClick:p=>D(i.row.TQUO_QUOCD),dense:""},{default:l(()=>[e(L,null,{default:l(()=>[Q("Print this quotation")]),_:1})]),_:2},1032,["onClick"])]),_:2},1024)]),_:2},1032,["props"])]),_:1},8,["rows","columns","loading"])])])]))}};export{El as default};
