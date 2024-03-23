import{Q as M}from"./QTooltip.77acb610.js";import{c as Ie,aH as qe,a as $,aY as Ae,h as de,Q as C,y as Pe,aZ as Ne,a_ as Be,s as m,B as b,C as I,D as l,E as e,L as Z,M as R,I as d,P as L,R as j,S as F,T as z,H as w,O as P,V as pe,W as ee,X as E,Y as le,o as ae,Z as S,am as te,a$ as Y,U as $e,aX as Me}from"./index.7239e6de.js";import{u as J,a as X,b as q,c as A,j as ge,k as x,Q as Le,l as re}from"./QTable.d4817ffd.js";import{Q as ce,a as me}from"./QTd.01546703.js";import{api as fe,api_web as N}from"./axios.1c730bac.js";import{Q as Re,a as Ee,C as xe}from"./ClosePopup.bd6db220.js";import{Q as He,u as oe}from"./use-dialog-plugin-component.b0112f4a.js";import{Q as Ye}from"./QBadge.db649e7b.js";import{_ as je}from"./assignConditionsView.77edc5b2.js";import"./use-cache.b0833c75.js";import"./date.229f0a83.js";var Fe=Ie({name:"QBtnToggle",props:{...qe,modelValue:{required:!0},options:{type:Array,required:!0,validator:t=>t.every(v=>("label"in v||"icon"in v||"slot"in v)&&"value"in v)},color:String,textColor:String,toggleColor:{type:String,default:"primary"},toggleTextColor:String,outline:Boolean,flat:Boolean,unelevated:Boolean,rounded:Boolean,push:Boolean,glossy:Boolean,size:String,padding:String,noCaps:Boolean,noWrap:Boolean,dense:Boolean,readonly:Boolean,disable:Boolean,stack:Boolean,stretch:Boolean,spread:Boolean,clearable:Boolean,ripple:{type:[Boolean,Object],default:!0}},emits:["update:modelValue","clear","click"],setup(t,{slots:v,emit:p}){const Q=$(()=>t.options.find(u=>u.value===t.modelValue)!==void 0),n=$(()=>({type:"hidden",name:t.name,value:t.modelValue})),h=Ne(n),f=$(()=>Ae(t)),y=$(()=>({rounded:t.rounded,dense:t.dense,...f.value})),O=$(()=>t.options.map((u,i)=>{const{attrs:s,value:g,slot:k,..._}=u;return{slot:k,props:{key:i,"aria-pressed":g===t.modelValue?"true":"false",...s,..._,...y.value,disable:t.disable===!0||_.disable===!0,color:g===t.modelValue?c(_,"toggleColor"):c(_,"color"),textColor:g===t.modelValue?c(_,"toggleTextColor"):c(_,"textColor"),noCaps:c(_,"noCaps")===!0,noWrap:c(_,"noWrap")===!0,size:c(_,"size"),padding:c(_,"padding"),ripple:c(_,"ripple"),stack:c(_,"stack")===!0,stretch:c(_,"stretch")===!0,onClick(B){V(g,u,B)}}}}));function V(u,i,s){t.readonly!==!0&&(t.modelValue===u?t.clearable===!0&&(p("update:modelValue",null,null),p("clear")):p("update:modelValue",u,i),p("click",s))}function c(u,i){return u[i]===void 0?t[i]:u[i]}function D(){const u=O.value.map(i=>de(C,i.props,i.slot!==void 0?v[i.slot]:void 0));return t.name!==void 0&&t.disable!==!0&&Q.value===!0&&h(u,"push"),Pe(v.default,u)}return()=>de(He,{class:"q-btn-toggle",...f.value,rounded:t.rounded,stretch:t.stretch,glossy:t.glossy,spread:t.spread},D)}});const Je=Be("counter",{state:()=>({customerList:[],itemList:[],usageList:[]}),getters:{doubleCount(t){return t.counter*2},getCustomer(t){return t.customerList},getItem(t){return t.itemList},getUsage(t){return t.usageList}},actions:{increment(){this.counter++},setCustomer(t){this.customerList=t},setItem(t){this.itemList=t},setUsage(t){this.usageList=t}}}),Ge={class:"row"},Ke=d("div",{class:"col text-h6"},"View Condition",-1),We={class:"col text-right"},ze={__name:"viewAssignedCond",props:{listCond:Array},setup(t){const v=t,p=J();m(!1);const Q=()=>{p.dialog({title:"Prompt",message:"Input group name conditions",prompt:{model:"",isValid:O=>O.length>2,type:"text"},cancel:!0,persistent:!0}).onOk(async O=>{let V=[];console.log(v.listCond),v.listCond.map(c=>{V.push({id:c.id,MCONDITION_DESCRIPTION:c.MCONDITION_DESCRIPTION})}),await fe.post("/master/conditions/assignGroup",{data:V,MCONDITION_RPT_STAT:O}).then(c=>{console.log(c)})})},{dialogRef:n,onDialogHide:h,onDialogOK:f,onDialogCancel:y}=oe();return(O,V)=>(b(),I(le,{ref_key:"dialogRef",ref:n,onHide:E(h),"transition-show":"slide-up","transition-hide":"slide-down","full-width":""},{default:l(()=>[e(Z,{class:"q-dialog-plugin bg-white q-pa-sm"},{default:l(()=>[e(R,null,{default:l(()=>[d("div",Ge,[Ke,d("div",We,[e(C,{label:"Save Template",color:"blue",onClick:Q})])])]),_:1}),e(R,{class:"q-pa-sm"},{default:l(()=>[(b(!0),L(j,null,F(v.listCond,(c,D)=>z((b(),I(X,{clickable:"",key:D},{default:l(()=>[e(q,null,{default:l(()=>[e(A,null,{default:l(()=>[w(P(c.MCONDITION_DESCRIPTION),1)]),_:2},1024),e(A,{caption:""},{default:l(()=>[w("Description")]),_:1})]),_:2},1024)]),_:2},1024)),[[pe]])),128))]),_:1}),e(ee,{align:"right"},{default:l(()=>[e(C,{label:"OK",color:"primary",onClick:E(f)},null,8,["onClick"])]),_:1})]),_:1})]),_:1},8,["onHide"]))}},Xe=d("div",{class:"text-h6"},"Choose Bank Transfer",-1),Ze={class:"row q-pt-md"},el={class:"col"},ll={__name:"quotationBankChoose",props:{payment:Array},setup(t){const v=J(),p=m(!1),Q=m(""),n=m(""),h=m([]),f=t;ae(()=>{console.log(f.payment),y()});const y=async()=>{p.value=!0,await N.get("payment-account").then(i=>{p.value=!1,n.value=i.data.data}).catch(()=>{p.value=!1})},O=()=>{v.dialog({title:"Confirmation",message:"Do you want to choose all this data ?",cancel:!0,persistent:!0}).onOk(async()=>{D(h.value)})},{dialogRef:V,onDialogHide:c,onDialogOK:D,onDialogCancel:u}=oe();return(i,s)=>(b(),I(le,{ref_key:"dialogRef",ref:V,onHide:E(c),"transition-show":"slide-up","transition-hide":"slide-down","full-width":"",persistent:""},{default:l(()=>[e(Z,{class:"q-dialog-plugin bg-white q-pa-sm"},{default:l(()=>[e(R,null,{default:l(()=>[Xe]),_:1}),e(R,{class:"q-pa-sm"},{default:l(()=>[d("div",Ze,[d("div",el,[e(ge,{title:"Created Quotation",rows:n.value,columns:Q.value,"row-key":"name",loading:p.value,dense:"",pagination:{rowsPerPage:20},class:"my-sticky-header-column-table",selection:"multiple",selected:h.value,"onUpdate:selected":s[3]||(s[3]=g=>h.value=g)},{"top-right":l(()=>[e(x,{outlined:"",modelValue:i.filterCol,"onUpdate:modelValue":s[0]||(s[0]=g=>i.filterCol=g),options:Q.value,label:"Search Columns","option-value":"name","option-label":"label","emit-value":"",dense:"","map-options":""},null,8,["modelValue","options"]),e(S,{borderless:"",dense:"",modelValue:i.filter,"onUpdate:modelValue":[s[1]||(s[1]=g=>i.filter=g),s[2]||(s[2]=g=>i.dataQuo())],placeholder:"Search",outlined:"",debounce:"1000"},{append:l(()=>[e(te,{name:"search"})]),_:1},8,["modelValue"])]),_:1},8,["rows","columns","loading","selected"])])])]),_:1}),e(ee,{align:"right"},{default:l(()=>[e(C,{label:"OK",color:"primary",onClick:s[4]||(s[4]=g=>O())}),e(C,{flat:"",label:"Cancel",color:"red",onClick:E(u)},null,8,["onClick"])]),_:1})]),_:1})]),_:1},8,["onHide"]))}},al={class:"text-h6"},tl={style:{border:"1px black solid","border-radius":"10px"}},ol=d("legend",{style:{"margin-left":"1em",padding:"0.2em 0.8em"}},[d("b",null,"Header")],-1),nl={class:"row"},sl={class:"col"},il={class:"col q-pl-md"},ul={class:"row items-center justify-end"},dl={class:"row"},rl={class:"col"},cl={class:"col q-pl-md"},ml={class:"row q-pt-md"},vl={class:"col"},pl={class:"col q-pl-md"},gl={class:"q-pa-sm"},fl={key:0,class:"q-pb-md"},_l={style:{border:"1px black solid","border-radius":"10px",height:"35vh",overflow:"auto"}},Cl=d("legend",{style:{"margin-left":"1em",padding:"0.2em 0.8em"}},[d("b",null,"Detail Items")],-1),bl={class:"row q-pb-md"},Tl={class:"col"},hl={class:"col text-right"},yl={class:"row"},Ol={class:"col"},ve={__name:"quotationCreate",props:{quoHeader:String},setup(t){const v=J(),p=Je(),Q=t;ae(async()=>{p.getCustomer.length===0?(await ne(""),p.setCustomer(B.value)):B.value=p.getCustomer,p.getItem.length===0?(await se(""),p.setItem(_.value)):_.value=p.getItem,p.getUsage.length===0?(await ie(""),p.setUsage(H.value)):H.value=p.getUsage,Q.quoHeader&&Ce(Q.quoHeader)});const n=m(!1),h=m(""),f=m(""),y=m(""),O=m(""),V=m(""),c=m(""),D=m(""),u=m([]),i=m(1),s=m(0),g=m([]),k=m([]),_=m([]),B=m([]),H=m([]),_e=$(()=>i.value===1?k.value.length===0||k.value.filter(r=>!r.item||!r.price).length>0:k.value.length===0||k.value.filter(r=>!r.item||!r.price||!r.qty).length>0),G=(r,o,a,U)=>{o(async()=>{U==="cust"&&await ne(r),U==="item"&&await se(r),U==="usage"&&await ie(r)})},ne=async r=>{n.value=!0,await N.post("customer/searchAPI",{searchValue:r}).then(o=>{n.value=!1,B.value=o.data.data}).catch(()=>{n.value=!1})},se=async r=>{n.value=!0,await N.post("item/searchAPI",{searchValue:r}).then(o=>{n.value=!1,_.value=o.data.data}).catch(()=>{n.value=!1})},ie=async r=>{n.value=!0,await N.post("usage/searchAPI",{searchValue:r}).then(o=>{n.value=!1,H.value=o.data.data}).catch(()=>{n.value=!1})},Ce=async r=>{n.value=!0,await fe.get(`transaction/quotation/view/${btoa(r)}`).then(o=>{n.value=!1;const a=o.data.data;h.value=a.TQUO_QUOCD,f.value=a.TQUO_ISSUDT,y.value=a.TQUO_CUSCD,O.value=a.TQUO_ATTN,V.value=a.TQUO_SBJCT,c.value=a.TQUO_PROJECT_LOCATION,D.value=a.cond,u.value=a.condlist,i.value=parseInt(a.TQUO_TYPE),s.value=a.TQUO_SERVTRANS_COST,a.det.map(U=>{k.value.push({item:U.TQUODETA_ITMCD,usage:parseInt(U.TQUODETA_USAGE),price:U.TQUODETA_PRC,electric:U.TQUODETA_ELECTRICITY,qty:U.TQUODETA_ITMQT})}),console.log(o)}).catch(()=>{n.value=!1})},be=()=>{k.value.push({item:"",usage:"",price:"",electric:"",qty:1})},Te=r=>{v.dialog({title:"Confirmation",message:`Do you want to delete this lines no ${r+1} ?`,cancel:!0,persistent:!0}).onOk(async()=>{k.value.splice(r,1)})},he=()=>{v.dialog({title:"Confirmation",message:"Do you want to clear all this line ?",cancel:!0,persistent:!0}).onOk(async()=>{k.value=[]})},ye=()=>{v.dialog({component:je}).onOk(async r=>{D.value=r.MCONDITION_RPT_STAT,u.value=r.group})},Oe=()=>{v.dialog({component:ze,componentProps:{listCond:u.value}}).onOk(async r=>{})},Ue=()=>{v.dialog({component:ll,componentProps:{payment:g.value}}).onOk(async r=>{})},Qe=async()=>{v.dialog({title:"Confirmation",message:"Do you want to save all this data ?",cancel:!0,persistent:!0}).onOk(async()=>{u.value.length===0?v.dialog({title:"Confirmation",message:"You're not selecting any condition, are you sure want to continue ?",cancel:!0,persistent:!0}).onOk(async()=>{ue()}):ue()})},ue=async()=>{n.value=!0,await N.post("quotationNew/saveAPI",{TQUO_QUOCD:h.value,TQUO_CUSCD:y.value,TQUO_ATTN:O.value,TQUO_SBJCT:V.value,TQUO_ISSUDT:f.value,TQUO_PROJECT_LOCATION:c.value,TQUO_TYPE:i.value,TQUO_SERVTRANS_COST:s.value,DET:k.value,COND:D.value,CONDLIST:u.value,PAYMENT:g.value}).then(r=>{n.value=!1,console.log(r),De()}).catch(()=>{n.value=!1})},Ve=r=>{D.value="",u.value=[],s.value=0,k.value=[]},{dialogRef:ke,onDialogHide:we,onDialogOK:De,onDialogCancel:Se}=oe();return(r,o)=>(b(),I(le,{ref_key:"dialogRef",ref:ke,onHide:E(we),"transition-show":"slide-up","transition-hide":"slide-down","full-width":"",persistent:""},{default:l(()=>[e(Z,{class:"q-dialog-plugin bg-white q-pa-sm"},{default:l(()=>[e(R,null,{default:l(()=>[d("div",al,P(Q.quoHeader?"Edit ":"Create ")+" Quotation ",1)]),_:1}),e(R,{class:"q-pa-sm"},{default:l(()=>[d("fieldset",tl,[ol,d("div",nl,[d("div",sl,[e(S,{label:"Quotation Code",dense:"",filled:"",modelValue:h.value,"onUpdate:modelValue":o[0]||(o[0]=a=>h.value=a),disable:"",loading:n.value},null,8,["modelValue","loading"])]),d("div",il,[e(S,{filled:"",modelValue:f.value,"onUpdate:modelValue":o[2]||(o[2]=a=>f.value=a),dense:"",label:"Issue Date",loading:n.value,onClick:o[3]||(o[3]=a=>f.value.qDateProxy.show()),mask:"####-##-##","fill-mask":"",hint:"Mask: YYYY-MM-DD"},{append:l(()=>[e(te,{name:"event",class:"cursor-pointer"},{default:l(()=>[e(Re,{cover:"","transition-show":"scale","transition-hide":"scale"},{default:l(()=>[e(Ee,{modelValue:f.value,"onUpdate:modelValue":o[1]||(o[1]=a=>f.value=a),mask:"YYYY-MM-DD"},{default:l(()=>[d("div",ul,[z(e(C,{label:"Close",color:"primary",flat:""},null,512),[[xe]])])]),_:1},8,["modelValue"])]),_:1})]),_:1})]),_:1},8,["modelValue","loading"])])]),d("div",dl,[d("div",rl,[e(x,{dense:"",filled:"",label:"Customer Name",modelValue:y.value,"onUpdate:modelValue":o[4]||(o[4]=a=>y.value=a),"use-input":"","input-debounce":"500",options:B.value,onFilter:o[5]||(o[5]=(a,U,T)=>G(a,U,T,"cust")),behavior:"dialog","option-label":"MCUS_CUSNM","option-value":"MCUS_CUSCD","emit-value":"","map-options":"",loading:n.value},null,8,["modelValue","options","loading"])]),d("div",cl,[e(S,{label:"Attn.",dense:"",filled:"",modelValue:O.value,"onUpdate:modelValue":o[6]||(o[6]=a=>O.value=a),loading:n.value},null,8,["modelValue","loading"])])]),d("div",ml,[d("div",vl,[e(S,{label:"Subject",dense:"",filled:"",modelValue:V.value,"onUpdate:modelValue":o[7]||(o[7]=a=>V.value=a),loading:n.value},null,8,["modelValue","loading"])]),d("div",pl,[e(S,{label:"Project Location",dense:"",filled:"",modelValue:c.value,"onUpdate:modelValue":o[8]||(o[8]=a=>c.value=a),loading:n.value},null,8,["modelValue","loading"])])])]),d("div",gl,[e(Fe,{modelValue:i.value,"onUpdate:modelValue":[o[9]||(o[9]=a=>i.value=a),o[10]||(o[10]=a=>Ve(a))],spread:"",class:"my-custom-toggle","no-caps":"",rounded:"",unelevated:"","toggle-color":"primary",color:"white","text-color":"primary",options:[{label:"Rental",value:1},{label:"Sale",value:2}],dense:"",loading:n.value},null,8,["modelValue","loading"])]),i.value===2?(b(),L("div",fl,[e(S,{prefix:"Rp",label:"Service & Transportation Price",modelValue:s.value,"onUpdate:modelValue":o[11]||(o[11]=a=>s.value=a),filled:"",dense:"",loading:n.value},null,8,["modelValue","loading"])])):Y("",!0),d("fieldset",_l,[Cl,d("div",bl,[d("div",Tl,[e(C,{flat:"",icon:"add",color:"blue",label:"Add Lines",onClick:be,disable:!i.value,loading:n.value},null,8,["disable","loading"]),e(C,{color:"red",onClick:he,flat:"",icon:"refresh",loading:n.value},{default:l(()=>[e(M,null,{default:l(()=>[w("Clear All Lines")]),_:1})]),_:1},8,["loading"])]),d("div",hl,[e(C,{color:"blue",label:"Assign Conditions",onClick:ye,loading:n.value},null,8,["loading"]),e(C,{color:"indigo",label:"Assign Bank Account",onClick:Ue,loading:n.value},null,8,["loading"]),e(C,{icon:"visibility",color:"indigo",flat:"",onClick:Oe,loading:n.value},{default:l(()=>[e(M,null,{default:l(()=>[w("View Conditions")]),_:1}),e(Ye,{color:"red",floating:""},{default:l(()=>[w(P(u.value.length),1)]),_:1})]),_:1},8,["loading"])])]),d("div",yl,[d("div",Ol,[e(Le,{bordered:"",dense:""},{default:l(()=>[k.value.length>0?(b(!0),L(j,{key:0},F(k.value,(a,U)=>(b(),I(X,{key:U,class:"q-my-sm",dense:""},{default:l(()=>[e(q,{avatar:""},{default:l(()=>[e($e,{"text-color":"blue"},{default:l(()=>[w(P(U+1),1)]),_:2},1024)]),_:2},1024),e(q,null,{default:l(()=>[e(A,null,{default:l(()=>[e(x,{dense:"",filled:"",label:"Item Name",modelValue:a.item,"onUpdate:modelValue":T=>a.item=T,"use-input":"","input-debounce":"500",options:_.value,onFilter:o[12]||(o[12]=(T,K,W)=>G(T,K,W,"item")),behavior:"dialog","option-label":"MITM_ITMNM","option-value":"MITM_ITMNM","emit-value":"","map-options":"",loading:n.value},null,8,["modelValue","onUpdate:modelValue","options","loading"])]),_:2},1024)]),_:2},1024),i.value===1?(b(),I(q,{key:0},{default:l(()=>[e(A,null,{default:l(()=>[e(x,{dense:"",filled:"",label:"Usage",modelValue:a.usage,"onUpdate:modelValue":T=>a.usage=T,"use-input":"","input-debounce":"500",options:H.value,onFilter:o[13]||(o[13]=(T,K,W)=>G(T,K,W,"usage")),behavior:"dialog","option-label":"MUSAGE_DESCALL","option-value":"id","emit-value":"","map-options":"",loading:n.value},null,8,["modelValue","onUpdate:modelValue","options","loading"])]),_:2},1024)]),_:2},1024)):Y("",!0),e(q,null,{default:l(()=>[e(A,null,{default:l(()=>[e(S,{prefix:"Rp",dense:"",label:"Price",filled:"",modelValue:a.price,"onUpdate:modelValue":T=>a.price=T},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1024)]),_:2},1024),i.value===1?(b(),I(q,{key:1},{default:l(()=>[e(A,null,{default:l(()=>[e(S,{dense:"",label:"Electricity",filled:"",modelValue:a.electric,"onUpdate:modelValue":T=>a.electric=T},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1024)]),_:2},1024)):Y("",!0),i.value===2?(b(),I(q,{key:2},{default:l(()=>[e(A,null,{default:l(()=>[e(S,{dense:"",label:"Qty",filled:"",modelValue:a.qty,"onUpdate:modelValue":T=>a.qty=T},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1024)]),_:2},1024)):Y("",!0),e(q,{side:""},{default:l(()=>[e(C,{icon:"delete",color:"red",flat:"",onClick:T=>Te(U)},null,8,["onClick"])]),_:2},1024)]),_:2},1024))),128)):z((b(),I(X,{key:1,class:"q-my-sm",clickable:""},{default:l(()=>[e(q,null,{default:l(()=>[e(A,null,{default:l(()=>[w(" No Items Added ")]),_:1})]),_:1})]),_:1})),[[pe]])]),_:1})])])])]),_:1}),e(ee,{align:"right"},{default:l(()=>[e(C,{label:"OK",color:"primary",onClick:o[14]||(o[14]=a=>Qe()),disable:_e.value},null,8,["disable"]),e(C,{flat:"",label:"Cancel",color:"red",onClick:E(Se)},null,8,["onClick"])]),_:1})]),_:1})]),_:1},8,["onHide"]))}};const Ul={class:"q-pa-md"},Ql={class:"row q-pb-md"},Vl=d("div",{class:"col"},[d("span",{class:"text-h4"},"Quotation ")],-1),kl={class:"col text-right"},wl={class:"row q-pt-md"},Dl={class:"col"},El={__name:"quotationView",setup(t){const v=J(),p=m("TQUO_QUOCD"),Q=m(""),n=m([]),h=m([{name:"TQUO_QUOCD",label:"Quot. Code",field:"TQUO_QUOCD",sortable:!0,align:"left"},{name:"TQUO_SBJCT",label:"Quot. Subject",field:"TQUO_SBJCT",sortable:!0,align:"left"},{name:"MCUS_CUSNM",label:"Customer Name",field:"MCUS_CUSNM",sortable:!0,align:"left"},{name:"TQUO_ATTN",label:"Customer Attn",field:"TQUO_ATTN",sortable:!0,align:"left"},{name:"TQUO_CUSCD",label:"Customer Code",field:"TQUO_CUSCD",sortable:!0,align:"left"},{name:"TQUO_ISSUDT",label:"Issue Date",field:"TQUO_ISSUDT",sortable:!0,align:"left"},{name:"TQUO_PROJECT_LOCATION",label:"Proj. Loc",field:"TQUO_PROJECT_LOCATION",sortable:!0,align:"left"}]),f=m(!1);ae(()=>{y()});const y=async()=>{f.value=!0,await N.post("quotation/search",{searchBy:p.value,searchValue:Q.value}).then(u=>{f.value=!1,n.value=u.data.data}).catch(u=>{f.value=!1})},O=()=>{v.dialog({component:ve}).onOk(async u=>{y()})},V=u=>{console.log(u),v.dialog({component:ve,componentProps:{quoHeader:u}}).onOk(async i=>{y()})},c=u=>{v.dialog({title:"Confirmation",message:"Are you sure want to delete this data ?",cancel:!0,persistent:!0}).onOk(async()=>{f.value=!0,await N.delete(`quotationNew/${btoa(u)}`).then(i=>{f.value=!1,y()})})},D=u=>{window.open("https://joss.jatpowerindo.co.id/PDF/quotation/"+btoa(u),"_blank").focus()};return(u,i)=>(b(),L("div",Ul,[d("div",Ql,[Vl,d("div",kl,[e(C,{icon:"add",color:"blue",onClick:O},{default:l(()=>[e(M,null,{default:l(()=>[w("Create New Quotation")]),_:1})]),_:1})])]),e(Me),d("div",wl,[d("div",Dl,[e(ge,{title:"Created Quotation",rows:n.value,columns:h.value,"row-key":"name",loading:f.value,dense:"",pagination:{rowsPerPage:20},class:"my-sticky-header-column-table"},{"top-right":l(()=>[e(x,{outlined:"",modelValue:p.value,"onUpdate:modelValue":i[0]||(i[0]=s=>p.value=s),options:h.value,label:"Search Columns","option-value":"name","option-label":"label","emit-value":"",dense:"","map-options":""},null,8,["modelValue","options"]),e(S,{borderless:"",dense:"",modelValue:Q.value,"onUpdate:modelValue":[i[1]||(i[1]=s=>Q.value=s),i[2]||(i[2]=s=>y())],placeholder:"Search",outlined:"",debounce:"1000"},{append:l(()=>[e(te,{name:"search"})]),_:1},8,["modelValue"])]),header:l(s=>[e(ce,{props:s},{default:l(()=>[(b(!0),L(j,null,F(s.cols,g=>(b(),I(re,{key:g.name,props:s},{default:l(()=>[w(P(g.label),1)]),_:2},1032,["props"]))),128)),e(re,{"auto-width":""},{default:l(()=>[w("Action")]),_:1})]),_:2},1032,["props"])]),body:l(s=>[e(ce,{props:s},{default:l(()=>[(b(!0),L(j,null,F(s.cols,g=>(b(),I(me,{key:g.name,props:s},{default:l(()=>[w(P(g.value),1)]),_:2},1032,["props"]))),128)),e(me,{"auto-width":""},{default:l(()=>[e(C,{flat:"",color:"orange",icon:"edit",onClick:g=>V(s.row.TQUO_QUOCD),dense:"",disable:s.row.TQUO_APPRVDT!==null},{default:l(()=>[e(M,null,{default:l(()=>[w(P(s.row.TQUO_APPRVDT?"Quotation already approved, cannot edit !":"Edit this quotation"),1)]),_:2},1024)]),_:2},1032,["onClick","disable"]),e(C,{flat:"",color:"red",icon:"delete",onClick:g=>c(s.row.TQUO_QUOCD),dense:"",disable:s.row.TQUO_APPRVDT!==null},{default:l(()=>[e(M,null,{default:l(()=>[w(P(s.row.TQUO_APPRVDT?"Quotation already approved, cannot delete !":"Delete this quotation"),1)]),_:2},1024)]),_:2},1032,["onClick","disable"]),e(C,{flat:"",color:"indigo",icon:"print",onClick:g=>D(s.row.TQUO_QUOCD),dense:""},{default:l(()=>[e(M,null,{default:l(()=>[w("Print this quotation")]),_:1})]),_:2},1032,["onClick"])]),_:2},1024)]),_:2},1032,["props"])]),_:1},8,["rows","columns","loading"])])])]))}};export{El as default};
