import{Q as L}from"./QTooltip.c22e9d19.js";import{c as ie,aA as Ie,a as A,aR as De,h as K,Q as O,y as ue,aS as qe,aT as Ae,s as g,B as T,C as I,D as a,E as e,J as de,K as R,I as i,R as P,aU as j,aV as H,aW as W,H as Q,aX as M,ap as re,L as ce,M as Y,O as me,o as ge,P as w,aa as ve,aY as E,aZ as Ne,S as Be}from"./index.d3937286.js";import{b as X,u as pe,j as z,k as D,l as q,c as $,Q as Pe,a as Me,m as te}from"./use-dialog-plugin-component.c2576a9e.js";import{Q as oe,a as ne}from"./date.6234e45d.js";import{api as fe,api_web as x}from"./axios.c7b0bc9c.js";import{Q as xe,a as Le,C as Ee}from"./ClosePopup.97c30ceb.js";import{Q as $e}from"./QBtnGroup.a7b6e5c1.js";import{_ as Re}from"./assignConditionsView.711285ab.js";var je=ie({name:"QBtnToggle",props:{...Ie,modelValue:{required:!0},options:{type:Array,required:!0,validator:l=>l.every(c=>("label"in c||"icon"in c||"slot"in c)&&"value"in c)},color:String,textColor:String,toggleColor:{type:String,default:"primary"},toggleTextColor:String,outline:Boolean,flat:Boolean,unelevated:Boolean,rounded:Boolean,push:Boolean,glossy:Boolean,size:String,padding:String,noCaps:Boolean,noWrap:Boolean,dense:Boolean,readonly:Boolean,disable:Boolean,stack:Boolean,stretch:Boolean,spread:Boolean,clearable:Boolean,ripple:{type:[Boolean,Object],default:!0}},emits:["update:modelValue","clear","click"],setup(l,{slots:c,emit:m}){const U=A(()=>l.options.find(u=>u.value===l.modelValue)!==void 0),n=A(()=>({type:"hidden",name:l.name,value:l.modelValue})),k=qe(n),_=A(()=>De(l)),V=A(()=>({rounded:l.rounded,dense:l.dense,..._.value})),y=A(()=>l.options.map((u,s)=>{const{attrs:p,value:C,slot:N,...f}=u;return{slot:N,props:{key:s,"aria-pressed":C===l.modelValue?"true":"false",...p,...f,...V.value,disable:l.disable===!0||f.disable===!0,color:C===l.modelValue?r(f,"toggleColor"):r(f,"color"),textColor:C===l.modelValue?r(f,"toggleTextColor"):r(f,"textColor"),noCaps:r(f,"noCaps")===!0,noWrap:r(f,"noWrap")===!0,size:r(f,"size"),padding:r(f,"padding"),ripple:r(f,"ripple"),stack:r(f,"stack")===!0,stretch:r(f,"stretch")===!0,onClick(B){S(C,u,B)}}}}));function S(u,s,p){l.readonly!==!0&&(l.modelValue===u?l.clearable===!0&&(m("update:modelValue",null,null),m("clear")):m("update:modelValue",u,s),m("click",p))}function r(u,s){return u[s]===void 0?l[s]:u[s]}function v(){const u=y.value.map(s=>K(O,s.props,s.slot!==void 0?c[s.slot]:void 0));return l.name!==void 0&&l.disable!==!0&&U.value===!0&&k(u,"push"),ue(c.default,u)}return()=>K($e,{class:"q-btn-toggle",..._.value,rounded:l.rounded,stretch:l.stretch,glossy:l.glossy,spread:l.spread},v)}});const He=["top","middle","bottom"];var Ye=ie({name:"QBadge",props:{color:String,textColor:String,floating:Boolean,transparent:Boolean,multiLine:Boolean,outline:Boolean,rounded:Boolean,label:[Number,String],align:{type:String,validator:l=>He.includes(l)}},setup(l,{slots:c}){const m=A(()=>l.align!==void 0?{verticalAlign:l.align}:null),U=A(()=>{const n=l.outline===!0&&l.color||l.textColor;return`q-badge flex inline items-center no-wrap q-badge--${l.multiLine===!0?"multi":"single"}-line`+(l.outline===!0?" q-badge--outline":l.color!==void 0?` bg-${l.color}`:"")+(n!==void 0?` text-${n}`:"")+(l.floating===!0?" q-badge--floating":"")+(l.rounded===!0?" q-badge--rounded":"")+(l.transparent===!0?" q-badge--transparent":"")});return()=>K("div",{class:U.value,style:m.value,role:"status","aria-label":l.label},ue(c.default,l.label!==void 0?[l.label]:[]))}});const Fe=Ae("counter",{state:()=>({customerList:[],itemList:[],usageList:[]}),getters:{doubleCount(l){return l.counter*2},getCustomer(l){return l.customerList},getItem(l){return l.itemList},getUsage(l){return l.usageList}},actions:{increment(){this.counter++},setCustomer(l){this.customerList=l},setItem(l){this.itemList=l},setUsage(l){this.usageList=l}}}),Je={class:"row"},Ge=i("div",{class:"col text-h6"},"View Condition",-1),Ke={class:"col text-right"},We={__name:"viewAssignedCond",props:{listCond:Array},setup(l){const c=l,m=X();g(!1);const U=()=>{m.dialog({title:"Prompt",message:"Input group name conditions",prompt:{model:"",isValid:y=>y.length>2,type:"text"},cancel:!0,persistent:!0}).onOk(async y=>{let S=[];c.listCond.map(r=>{S.push({id:r.id,MCONDITION_DESCRIPTION:r.MCONDITION_DESCRIPTION})}),await fe.post("/master/conditions/assignGroup",{data:S,MCONDITION_RPT_STAT:y}).then(r=>{console.log(r)})})},{dialogRef:n,onDialogHide:k,onDialogOK:_,onDialogCancel:V}=pe();return(y,S)=>(T(),I(me,{ref_key:"dialogRef",ref:n,onHide:Y(k),"transition-show":"slide-up","transition-hide":"slide-down","full-width":""},{default:a(()=>[e(de,{class:"q-dialog-plugin bg-white q-pa-sm"},{default:a(()=>[e(R,null,{default:a(()=>[i("div",Je,[Ge,i("div",Ke,[e(O,{label:"Save Template",color:"blue",onClick:U})])])]),_:1}),e(R,{class:"q-pa-sm"},{default:a(()=>[(T(!0),P(j,null,H(c.listCond,(r,v)=>W((T(),I(z,{clickable:"",key:v},{default:a(()=>[e(D,null,{default:a(()=>[e(q,null,{default:a(()=>[Q(M(r.MCONDITION_DESCRIPTION),1)]),_:2},1024),e(q,{caption:""},{default:a(()=>[Q("Description")]),_:1})]),_:2},1024)]),_:2},1024)),[[re]])),128))]),_:1}),e(ce,{align:"right"},{default:a(()=>[e(O,{label:"OK",color:"primary",onClick:Y(_)},null,8,["onClick"])]),_:1})]),_:1})]),_:1},8,["onHide"]))}},ze={class:"text-h6"},Xe={style:{border:"1px black solid","border-radius":"10px"}},Ze=i("legend",{style:{"margin-left":"1em",padding:"0.2em 0.8em"}},[i("b",null,"Header")],-1),el={class:"row"},ll={class:"col"},al={class:"col q-pl-md"},tl={class:"row items-center justify-end"},ol={class:"row"},nl={class:"col"},sl={class:"col q-pl-md"},il={class:"row q-pt-md"},ul={class:"col"},dl={class:"col q-pl-md"},rl={class:"q-pa-sm"},cl={key:0,class:"q-pb-md"},ml={style:{border:"1px black solid","border-radius":"10px",height:"35vh",overflow:"auto"}},gl=i("legend",{style:{"margin-left":"1em",padding:"0.2em 0.8em"}},[i("b",null,"Detail Items")],-1),vl={class:"row q-pb-md"},pl={class:"col"},fl={class:"col text-right"},_l={class:"row"},Cl={class:"col"},se={__name:"quotationCreate",props:{quoHeader:String},setup(l){const c=X(),m=Fe(),U=l;ge(async()=>{m.getCustomer.length===0?(await Z(""),m.setCustomer(f.value)):f.value=m.getCustomer,m.getItem.length===0?(await ee(""),m.setItem(N.value)):N.value=m.getItem,m.getUsage.length===0?(await le(""),m.setUsage(B.value)):B.value=m.getUsage,U.quoHeader&&Ce(U.quoHeader)});const n=g(!1),k=g(""),_=g(""),V=g(""),y=g(""),S=g(""),r=g(""),v=g(""),u=g([]),s=g(1),p=g(0),C=g([]),N=g([]),f=g([]),B=g([]),_e=A(()=>s.value===1?C.value.length===0||C.value.filter(d=>!d.item||!d.price).length>0:C.value.length===0||C.value.filter(d=>!d.item||!d.price||!d.qty).length>0||!p.value),F=(d,o,t,h)=>{o(async()=>{h==="cust"&&await Z(d),h==="item"&&await ee(d),h==="usage"&&await le(d)})},Z=async d=>{n.value=!0,await x.post("customer/searchAPI",{searchValue:d}).then(o=>{n.value=!1,f.value=o.data.data}).catch(()=>{n.value=!1})},ee=async d=>{n.value=!0,await x.post("item/searchAPI",{searchValue:d}).then(o=>{n.value=!1,N.value=o.data.data}).catch(()=>{n.value=!1})},le=async d=>{n.value=!0,await x.post("usage/searchAPI",{searchValue:d}).then(o=>{n.value=!1,B.value=o.data.data}).catch(()=>{n.value=!1})},Ce=async d=>{n.value=!0,await fe.get(`transaction/quotation/view/${btoa(d)}`).then(o=>{n.value=!1;const t=o.data.data;k.value=t.TQUO_QUOCD,_.value=t.TQUO_ISSUDT,V.value=t.TQUO_CUSCD,y.value=t.TQUO_ATTN,S.value=t.TQUO_SBJCT,r.value=t.TQUO_PROJECT_LOCATION,v.value=t.cond,u.value=t.condlist,s.value=parseInt(t.TQUO_TYPE),p.value=t.TQUO_SERVTRANS_COST,t.det.map(h=>{C.value.push({item:h.MITM_ITMNM,usage:h.TQUODETA_USAGE,price:h.TQUODETA_PRC,electric:h.TQUODETA_ELECTRICITY,qty:h.TQUODETA_ITMQT})}),console.log(o)}).catch(()=>{n.value=!1})},be=()=>{C.value.push({item:"",usage:"",price:"",electric:"",qty:1})},Te=d=>{c.dialog({title:"Confirmation",message:`Do you want to delete this lines no ${d+1} ?`,cancel:!0,persistent:!0}).onOk(async()=>{C.value.splice(d,1)})},he=()=>{c.dialog({title:"Confirmation",message:"Do you want to clear all this line ?",cancel:!0,persistent:!0}).onOk(async()=>{C.value=[]})},Oe=()=>{c.dialog({component:Re}).onOk(async d=>{v.value=d.MCONDITION_RPT_STAT,u.value=d.group})},Ue=()=>{c.dialog({component:We,componentProps:{listCond:u.value}}).onOk(async d=>{})},ye=async()=>{c.dialog({title:"Confirmation",message:"Do you want to save all this data ?",cancel:!0,persistent:!0}).onOk(async()=>{u.value.length===0?c.dialog({title:"Confirmation",message:"You're not selecting any condition, are you sure want to continue ?",cancel:!0,persistent:!0}).onOk(async()=>{ae()}):ae()})},ae=async()=>{n.value=!0,await x.post("quotationNew/saveAPI",{TQUO_QUOCD:k.value,TQUO_CUSCD:V.value,TQUO_ATTN:y.value,TQUO_SBJCT:S.value,TQUO_ISSUDT:_.value,TQUO_PROJECT_LOCATION:r.value,TQUO_TYPE:s.value,TQUO_SERVTRANS_COST:p.value,DET:C.value,COND:v.value,CONDLIST:u.value}).then(d=>{n.value=!1,console.log(d),ke()}).catch(()=>{n.value=!1})},Qe=d=>{c.dialog({title:"Confirmation",message:"Are you sure want to change type ? This action will clear you lines !!",cancel:!0,persistent:!0}).onOk(async()=>{v.value="",u.value=[],p.value=0,C.value=[]})},{dialogRef:Ve,onDialogHide:Se,onDialogOK:ke,onDialogCancel:we}=pe();return(d,o)=>(T(),I(me,{ref_key:"dialogRef",ref:Ve,onHide:Y(Se),"transition-show":"slide-up","transition-hide":"slide-down","full-width":"",persistent:""},{default:a(()=>[e(de,{class:"q-dialog-plugin bg-white q-pa-sm"},{default:a(()=>[e(R,null,{default:a(()=>[i("div",ze,M(U.quoHeader?"Edit ":"Create ")+" Quotation ",1)]),_:1}),e(R,{class:"q-pa-sm"},{default:a(()=>[i("fieldset",Xe,[Ze,i("div",el,[i("div",ll,[e(w,{label:"Quotation Code",dense:"",filled:"",modelValue:k.value,"onUpdate:modelValue":o[0]||(o[0]=t=>k.value=t),disable:"",loading:n.value},null,8,["modelValue","loading"])]),i("div",al,[e(w,{filled:"",modelValue:_.value,"onUpdate:modelValue":o[2]||(o[2]=t=>_.value=t),dense:"",label:"Issue Date",loading:n.value,onClick:o[3]||(o[3]=t=>_.value.qDateProxy.show()),mask:"####-##-##","fill-mask":"",hint:"Mask: YYYY-MM-DD"},{append:a(()=>[e(ve,{name:"event",class:"cursor-pointer"},{default:a(()=>[e(xe,{cover:"","transition-show":"scale","transition-hide":"scale"},{default:a(()=>[e(Le,{modelValue:_.value,"onUpdate:modelValue":o[1]||(o[1]=t=>_.value=t),mask:"YYYY-MM-DD"},{default:a(()=>[i("div",tl,[W(e(O,{label:"Close",color:"primary",flat:""},null,512),[[Ee]])])]),_:1},8,["modelValue"])]),_:1})]),_:1})]),_:1},8,["modelValue","loading"])])]),i("div",ol,[i("div",nl,[e($,{dense:"",filled:"",label:"Customer Name",modelValue:V.value,"onUpdate:modelValue":o[4]||(o[4]=t=>V.value=t),"use-input":"","input-debounce":"500",options:f.value,onFilter:o[5]||(o[5]=(t,h,b)=>F(t,h,b,"cust")),behavior:"dialog","option-label":"MCUS_CUSNM","option-value":"MCUS_CUSCD","emit-value":"","map-options":"",loading:n.value},null,8,["modelValue","options","loading"])]),i("div",sl,[e(w,{label:"Attn.",dense:"",filled:"",modelValue:y.value,"onUpdate:modelValue":o[6]||(o[6]=t=>y.value=t),loading:n.value},null,8,["modelValue","loading"])])]),i("div",il,[i("div",ul,[e(w,{label:"Subject",dense:"",filled:"",modelValue:S.value,"onUpdate:modelValue":o[7]||(o[7]=t=>S.value=t),loading:n.value},null,8,["modelValue","loading"])]),i("div",dl,[e(w,{label:"Project Location",dense:"",filled:"",modelValue:r.value,"onUpdate:modelValue":o[8]||(o[8]=t=>r.value=t),loading:n.value},null,8,["modelValue","loading"])])])]),i("div",rl,[e(je,{modelValue:s.value,"onUpdate:modelValue":[o[9]||(o[9]=t=>s.value=t),o[10]||(o[10]=t=>Qe(t))],spread:"",class:"my-custom-toggle","no-caps":"",rounded:"",unelevated:"","toggle-color":"primary",color:"white","text-color":"primary",options:[{label:"Rental",value:1},{label:"Sale",value:2}],dense:"",loading:n.value},null,8,["modelValue","loading"])]),s.value===2?(T(),P("div",cl,[e(w,{prefix:"Rp",label:"Service & Transportation Price",modelValue:p.value,"onUpdate:modelValue":o[11]||(o[11]=t=>p.value=t),filled:"",dense:"",loading:n.value},null,8,["modelValue","loading"])])):E("",!0),i("fieldset",ml,[gl,i("div",vl,[i("div",pl,[e(O,{flat:"",icon:"add",color:"blue",label:"Add Lines",onClick:be,disable:!s.value,loading:n.value},null,8,["disable","loading"]),e(O,{color:"red",onClick:he,flat:"",icon:"refresh",loading:n.value},{default:a(()=>[e(L,null,{default:a(()=>[Q("Clear All Lines")]),_:1})]),_:1},8,["loading"])]),i("div",fl,[e(O,{color:"blue",label:"Assign Conditions",onClick:Oe,loading:n.value},null,8,["loading"]),e(O,{icon:"visibility",color:"indigo",flat:"",onClick:Ue,loading:n.value},{default:a(()=>[e(L,null,{default:a(()=>[Q("View Conditions")]),_:1}),e(Ye,{color:"red",floating:""},{default:a(()=>[Q(M(u.value.length),1)]),_:1})]),_:1},8,["loading"])])]),i("div",_l,[i("div",Cl,[e(Pe,{bordered:"",dense:""},{default:a(()=>[C.value.length>0?(T(!0),P(j,{key:0},H(C.value,(t,h)=>(T(),I(z,{key:h,class:"q-my-sm",dense:""},{default:a(()=>[e(D,{avatar:""},{default:a(()=>[e(Ne,{"text-color":"blue"},{default:a(()=>[Q(M(h+1),1)]),_:2},1024)]),_:2},1024),e(D,null,{default:a(()=>[e(q,null,{default:a(()=>[e($,{dense:"",filled:"",label:"Item Name",modelValue:t.item,"onUpdate:modelValue":b=>t.item=b,"use-input":"","input-debounce":"500",options:N.value,onFilter:o[12]||(o[12]=(b,J,G)=>F(b,J,G,"item")),behavior:"dialog","option-label":"MITM_ITMNM","option-value":"MITM_ITMNM","emit-value":"","map-options":"",loading:n.value},null,8,["modelValue","onUpdate:modelValue","options","loading"])]),_:2},1024)]),_:2},1024),s.value===1?(T(),I(D,{key:0},{default:a(()=>[e(q,null,{default:a(()=>[e($,{dense:"",filled:"",label:"Usage",modelValue:t.usage,"onUpdate:modelValue":b=>t.usage=b,"use-input":"","input-debounce":"500",options:B.value,onFilter:o[13]||(o[13]=(b,J,G)=>F(b,J,G,"usage")),behavior:"dialog","option-label":"MUSAGE_DESCALL","option-value":"id","emit-value":"","map-options":"",loading:n.value},null,8,["modelValue","onUpdate:modelValue","options","loading"])]),_:2},1024)]),_:2},1024)):E("",!0),e(D,null,{default:a(()=>[e(q,null,{default:a(()=>[e(w,{prefix:"Rp",dense:"",label:"Price",filled:"",modelValue:t.price,"onUpdate:modelValue":b=>t.price=b},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1024)]),_:2},1024),s.value===1?(T(),I(D,{key:1},{default:a(()=>[e(q,null,{default:a(()=>[e(w,{dense:"",label:"Electricity",filled:"",modelValue:t.electric,"onUpdate:modelValue":b=>t.electric=b},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1024)]),_:2},1024)):E("",!0),s.value===2?(T(),I(D,{key:2},{default:a(()=>[e(q,null,{default:a(()=>[e(w,{dense:"",label:"Qty",filled:"",modelValue:t.qty,"onUpdate:modelValue":b=>t.qty=b},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1024)]),_:2},1024)):E("",!0),e(D,{side:""},{default:a(()=>[e(O,{icon:"delete",color:"red",flat:"",onClick:b=>Te(h)},null,8,["onClick"])]),_:2},1024)]),_:2},1024))),128)):W((T(),I(z,{key:1,class:"q-my-sm",clickable:""},{default:a(()=>[e(D,null,{default:a(()=>[e(q,null,{default:a(()=>[Q(" No Items Added ")]),_:1})]),_:1})]),_:1})),[[re]])]),_:1})])])])]),_:1}),e(ce,{align:"right"},{default:a(()=>[e(O,{label:"OK",color:"primary",onClick:o[14]||(o[14]=t=>ye()),disable:_e.value},null,8,["disable"]),e(O,{flat:"",label:"Cancel",color:"red",onClick:Y(we)},null,8,["onClick"])]),_:1})]),_:1})]),_:1},8,["onHide"]))}};const bl={class:"q-pa-md"},Tl={class:"row q-pb-md"},hl=i("div",{class:"col"},[i("span",{class:"text-h4"},"Quotation ")],-1),Ol={class:"col text-right"},Ul={class:"row q-pt-md"},yl={class:"col"},Al={__name:"quotationView",setup(l){const c=X(),m=g("TQUO_QUOCD"),U=g(""),n=g([]),k=g([{name:"TQUO_QUOCD",label:"Quot. Code",field:"TQUO_QUOCD",sortable:!0,align:"left"},{name:"TQUO_SBJCT",label:"Quot. Subject",field:"TQUO_SBJCT",sortable:!0,align:"left"},{name:"MCUS_CUSNM",label:"Customer Name",field:"MCUS_CUSNM",sortable:!0,align:"left"},{name:"TQUO_ATTN",label:"Customer Attn",field:"TQUO_ATTN",sortable:!0,align:"left"},{name:"TQUO_CUSCD",label:"Customer Code",field:"TQUO_CUSCD",sortable:!0,align:"left"},{name:"TQUO_ISSUDT",label:"Issue Date",field:"TQUO_ISSUDT",sortable:!0,align:"left"},{name:"TQUO_PROJECT_LOCATION",label:"Proj. Loc",field:"TQUO_PROJECT_LOCATION",sortable:!0,align:"left"}]),_=g(!1);ge(()=>{V()});const V=async()=>{_.value=!0,await x.post("quotation/search",{searchBy:m.value,searchValue:U.value}).then(v=>{_.value=!1,n.value=v.data.data}).catch(v=>{_.value=!1})},y=()=>{c.dialog({component:se}).onOk(async v=>{V()})},S=v=>{console.log(v),c.dialog({component:se,componentProps:{quoHeader:v}}).onOk(async u=>{V()})},r=v=>{window.open("https://joss.jatpowerindo.co.id/PDF/quotation/"+btoa(v),"_blank").focus()};return(v,u)=>(T(),P("div",bl,[i("div",Tl,[hl,i("div",Ol,[e(O,{icon:"add",color:"blue",onClick:y},{default:a(()=>[e(L,null,{default:a(()=>[Q("Create New Quotation")]),_:1})]),_:1})])]),e(Be),i("div",Ul,[i("div",yl,[e(Me,{title:"Created Quotation",rows:n.value,columns:k.value,"row-key":"name",loading:_.value,dense:"",pagination:{rowsPerPage:20},class:"my-sticky-header-column-table"},{"top-right":a(()=>[e($,{outlined:"",modelValue:m.value,"onUpdate:modelValue":u[0]||(u[0]=s=>m.value=s),options:k.value,label:"Search Columns","option-value":"name","option-label":"label","emit-value":"",dense:"","map-options":""},null,8,["modelValue","options"]),e(w,{borderless:"",dense:"",modelValue:U.value,"onUpdate:modelValue":[u[1]||(u[1]=s=>U.value=s),u[2]||(u[2]=s=>V())],placeholder:"Search",outlined:"",debounce:"1000"},{append:a(()=>[e(ve,{name:"search"})]),_:1},8,["modelValue"])]),header:a(s=>[e(oe,{props:s},{default:a(()=>[(T(!0),P(j,null,H(s.cols,p=>(T(),I(te,{key:p.name,props:s},{default:a(()=>[Q(M(p.label),1)]),_:2},1032,["props"]))),128)),e(te,{"auto-width":""},{default:a(()=>[Q("Action")]),_:1})]),_:2},1032,["props"])]),body:a(s=>[e(oe,{props:s},{default:a(()=>[(T(!0),P(j,null,H(s.cols,p=>(T(),I(ne,{key:p.name,props:s},{default:a(()=>[Q(M(p.value),1)]),_:2},1032,["props"]))),128)),e(ne,{"auto-width":""},{default:a(()=>[e(O,{flat:"",color:"orange",icon:"edit",onClick:p=>S(s.row.TQUO_QUOCD),dense:""},{default:a(()=>[e(L,null,{default:a(()=>[Q("Edit this quotation")]),_:1})]),_:2},1032,["onClick"]),e(O,{flat:"",color:"indigo",icon:"print",onClick:p=>r(s.row.TQUO_QUOCD),dense:""},{default:a(()=>[e(L,null,{default:a(()=>[Q("Print this quotation")]),_:1})]),_:2},1032,["onClick"])]),_:2},1024)]),_:2},1032,["props"])]),_:1},8,["rows","columns","loading"])])])]))}};export{Al as default};
