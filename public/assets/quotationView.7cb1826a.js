import{Q as E}from"./QTooltip.4a4cce88.js";import{c as ke,aH as we,a as P,aY as De,h as ae,Q as O,y as Ie,aZ as qe,a_ as Ae,s as m,B as b,C as D,D as l,E as e,L as ie,M as $,I as i,P as B,R as H,S as Y,T as K,H as y,O as L,V as ue,W as de,X as j,Y as re,o as ce,Z as w,am as me,a$ as x,U as Ne,aX as Pe}from"./index.6a51df8d.js";import{e as Be,a as z,u as ve,b as W,c as I,d as q,m as R,Q as Le,l as Me,n as te}from"./QTable.95c79e81.js";import{Q as oe,a as ne}from"./use-cache.97091e7f.js";import{api as ge,api_web as M}from"./axios.76460d57.js";import{Q as Ee,a as xe,C as Re}from"./ClosePopup.d834f2a5.js";import{Q as $e}from"./QBadge.7d5bc29a.js";import{_ as He}from"./assignConditionsView.afad0180.js";import"./date.7528365e.js";var Ye=ke({name:"QBtnToggle",props:{...we,modelValue:{required:!0},options:{type:Array,required:!0,validator:t=>t.every(c=>("label"in c||"icon"in c||"slot"in c)&&"value"in c)},color:String,textColor:String,toggleColor:{type:String,default:"primary"},toggleTextColor:String,outline:Boolean,flat:Boolean,unelevated:Boolean,rounded:Boolean,push:Boolean,glossy:Boolean,size:String,padding:String,noCaps:Boolean,noWrap:Boolean,dense:Boolean,readonly:Boolean,disable:Boolean,stack:Boolean,stretch:Boolean,spread:Boolean,clearable:Boolean,ripple:{type:[Boolean,Object],default:!0}},emits:["update:modelValue","clear","click"],setup(t,{slots:c,emit:v}){const S=P(()=>t.options.find(u=>u.value===t.modelValue)!==void 0),s=P(()=>({type:"hidden",name:t.name,value:t.modelValue})),k=qe(s),f=P(()=>De(t)),Q=P(()=>({rounded:t.rounded,dense:t.dense,...f.value})),U=P(()=>t.options.map((u,n)=>{const{attrs:p,value:C,slot:A,..._}=u;return{slot:A,props:{key:n,"aria-pressed":C===t.modelValue?"true":"false",...p,..._,...Q.value,disable:t.disable===!0||_.disable===!0,color:C===t.modelValue?r(_,"toggleColor"):r(_,"color"),textColor:C===t.modelValue?r(_,"toggleTextColor"):r(_,"textColor"),noCaps:r(_,"noCaps")===!0,noWrap:r(_,"noWrap")===!0,size:r(_,"size"),padding:r(_,"padding"),ripple:r(_,"ripple"),stack:r(_,"stack")===!0,stretch:r(_,"stretch")===!0,onClick(N){V(C,u,N)}}}}));function V(u,n,p){t.readonly!==!0&&(t.modelValue===u?t.clearable===!0&&(v("update:modelValue",null,null),v("clear")):v("update:modelValue",u,n),v("click",p))}function r(u,n){return u[n]===void 0?t[n]:u[n]}function g(){const u=U.value.map(n=>ae(O,n.props,n.slot!==void 0?c[n.slot]:void 0));return t.name!==void 0&&t.disable!==!0&&S.value===!0&&k(u,"push"),Ie(c.default,u)}return()=>ae(Be,{class:"q-btn-toggle",...f.value,rounded:t.rounded,stretch:t.stretch,glossy:t.glossy,spread:t.spread},g)}});const je=Ae("counter",{state:()=>({customerList:[],itemList:[],usageList:[]}),getters:{doubleCount(t){return t.counter*2},getCustomer(t){return t.customerList},getItem(t){return t.itemList},getUsage(t){return t.usageList}},actions:{increment(){this.counter++},setCustomer(t){this.customerList=t},setItem(t){this.itemList=t},setUsage(t){this.usageList=t}}}),Fe={class:"row"},Je=i("div",{class:"col text-h6"},"View Condition",-1),Ge={class:"col text-right"},Ke={__name:"viewAssignedCond",props:{listCond:Array},setup(t){const c=t,v=z();m(!1);const S=()=>{v.dialog({title:"Prompt",message:"Input group name conditions",prompt:{model:"",isValid:U=>U.length>2,type:"text"},cancel:!0,persistent:!0}).onOk(async U=>{let V=[];console.log(c.listCond),c.listCond.map(r=>{V.push({id:r.id,MCONDITION_DESCRIPTION:r.MCONDITION_DESCRIPTION})}),await ge.post("/master/conditions/assignGroup",{data:V,MCONDITION_RPT_STAT:U}).then(r=>{console.log(r)})})},{dialogRef:s,onDialogHide:k,onDialogOK:f,onDialogCancel:Q}=ve();return(U,V)=>(b(),D(re,{ref_key:"dialogRef",ref:s,onHide:j(k),"transition-show":"slide-up","transition-hide":"slide-down","full-width":""},{default:l(()=>[e(ie,{class:"q-dialog-plugin bg-white q-pa-sm"},{default:l(()=>[e($,null,{default:l(()=>[i("div",Fe,[Je,i("div",Ge,[e(O,{label:"Save Template",color:"blue",onClick:S})])])]),_:1}),e($,{class:"q-pa-sm"},{default:l(()=>[(b(!0),B(H,null,Y(c.listCond,(r,g)=>K((b(),D(W,{clickable:"",key:g},{default:l(()=>[e(I,null,{default:l(()=>[e(q,null,{default:l(()=>[y(L(r.MCONDITION_DESCRIPTION),1)]),_:2},1024),e(q,{caption:""},{default:l(()=>[y("Description")]),_:1})]),_:2},1024)]),_:2},1024)),[[ue]])),128))]),_:1}),e(de,{align:"right"},{default:l(()=>[e(O,{label:"OK",color:"primary",onClick:j(f)},null,8,["onClick"])]),_:1})]),_:1})]),_:1},8,["onHide"]))}},We={class:"text-h6"},ze={style:{border:"1px black solid","border-radius":"10px"}},Xe=i("legend",{style:{"margin-left":"1em",padding:"0.2em 0.8em"}},[i("b",null,"Header")],-1),Ze={class:"row"},el={class:"col"},ll={class:"col q-pl-md"},al={class:"row items-center justify-end"},tl={class:"row"},ol={class:"col"},nl={class:"col q-pl-md"},sl={class:"row q-pt-md"},il={class:"col"},ul={class:"col q-pl-md"},dl={class:"q-pa-sm"},rl={key:0,class:"q-pb-md"},cl={style:{border:"1px black solid","border-radius":"10px",height:"35vh",overflow:"auto"}},ml=i("legend",{style:{"margin-left":"1em",padding:"0.2em 0.8em"}},[i("b",null,"Detail Items")],-1),vl={class:"row q-pb-md"},gl={class:"col"},pl={class:"col text-right"},_l={class:"row"},fl={class:"col"},se={__name:"quotationCreate",props:{quoHeader:String},setup(t){const c=z(),v=je(),S=t;ce(async()=>{v.getCustomer.length===0?(await X(""),v.setCustomer(_.value)):_.value=v.getCustomer,v.getItem.length===0?(await Z(""),v.setItem(A.value)):A.value=v.getItem,v.getUsage.length===0?(await ee(""),v.setUsage(N.value)):N.value=v.getUsage,S.quoHeader&&_e(S.quoHeader)});const s=m(!1),k=m(""),f=m(""),Q=m(""),U=m(""),V=m(""),r=m(""),g=m(""),u=m([]),n=m(1),p=m(0),C=m([]),A=m([]),_=m([]),N=m([]),pe=P(()=>n.value===1?C.value.length===0||C.value.filter(d=>!d.item||!d.price).length>0:C.value.length===0||C.value.filter(d=>!d.item||!d.price||!d.qty).length>0||!p.value),F=(d,o,a,h)=>{o(async()=>{h==="cust"&&await X(d),h==="item"&&await Z(d),h==="usage"&&await ee(d)})},X=async d=>{s.value=!0,await M.post("customer/searchAPI",{searchValue:d}).then(o=>{s.value=!1,_.value=o.data.data}).catch(()=>{s.value=!1})},Z=async d=>{s.value=!0,await M.post("item/searchAPI",{searchValue:d}).then(o=>{s.value=!1,A.value=o.data.data}).catch(()=>{s.value=!1})},ee=async d=>{s.value=!0,await M.post("usage/searchAPI",{searchValue:d}).then(o=>{s.value=!1,N.value=o.data.data}).catch(()=>{s.value=!1})},_e=async d=>{s.value=!0,await ge.get(`transaction/quotation/view/${btoa(d)}`).then(o=>{s.value=!1;const a=o.data.data;k.value=a.TQUO_QUOCD,f.value=a.TQUO_ISSUDT,Q.value=a.TQUO_CUSCD,U.value=a.TQUO_ATTN,V.value=a.TQUO_SBJCT,r.value=a.TQUO_PROJECT_LOCATION,g.value=a.cond,u.value=a.condlist,n.value=parseInt(a.TQUO_TYPE),p.value=a.TQUO_SERVTRANS_COST,a.det.map(h=>{C.value.push({item:h.TQUODETA_ITMCD,usage:parseInt(h.TQUODETA_USAGE),price:h.TQUODETA_PRC,electric:h.TQUODETA_ELECTRICITY,qty:h.TQUODETA_ITMQT})}),console.log(o)}).catch(()=>{s.value=!1})},fe=()=>{C.value.push({item:"",usage:"",price:"",electric:"",qty:1})},Ce=d=>{c.dialog({title:"Confirmation",message:`Do you want to delete this lines no ${d+1} ?`,cancel:!0,persistent:!0}).onOk(async()=>{C.value.splice(d,1)})},Te=()=>{c.dialog({title:"Confirmation",message:"Do you want to clear all this line ?",cancel:!0,persistent:!0}).onOk(async()=>{C.value=[]})},be=()=>{c.dialog({component:He}).onOk(async d=>{g.value=d.MCONDITION_RPT_STAT,u.value=d.group})},he=()=>{c.dialog({component:Ke,componentProps:{listCond:u.value}}).onOk(async d=>{})},Oe=async()=>{c.dialog({title:"Confirmation",message:"Do you want to save all this data ?",cancel:!0,persistent:!0}).onOk(async()=>{u.value.length===0?c.dialog({title:"Confirmation",message:"You're not selecting any condition, are you sure want to continue ?",cancel:!0,persistent:!0}).onOk(async()=>{le()}):le()})},le=async()=>{s.value=!0,await M.post("quotationNew/saveAPI",{TQUO_QUOCD:k.value,TQUO_CUSCD:Q.value,TQUO_ATTN:U.value,TQUO_SBJCT:V.value,TQUO_ISSUDT:f.value,TQUO_PROJECT_LOCATION:r.value,TQUO_TYPE:n.value,TQUO_SERVTRANS_COST:p.value,DET:C.value,COND:g.value,CONDLIST:u.value}).then(d=>{s.value=!1,console.log(d),Ve()}).catch(()=>{s.value=!1})},Ue=d=>{c.dialog({title:"Confirmation",message:"Are you sure want to change type ? This action will clear you lines !!",cancel:!0,persistent:!0}).onOk(async()=>{g.value="",u.value=[],p.value=0,C.value=[]})},{dialogRef:ye,onDialogHide:Qe,onDialogOK:Ve,onDialogCancel:Se}=ve();return(d,o)=>(b(),D(re,{ref_key:"dialogRef",ref:ye,onHide:j(Qe),"transition-show":"slide-up","transition-hide":"slide-down","full-width":"",persistent:""},{default:l(()=>[e(ie,{class:"q-dialog-plugin bg-white q-pa-sm"},{default:l(()=>[e($,null,{default:l(()=>[i("div",We,L(S.quoHeader?"Edit ":"Create ")+" Quotation ",1)]),_:1}),e($,{class:"q-pa-sm"},{default:l(()=>[i("fieldset",ze,[Xe,i("div",Ze,[i("div",el,[e(w,{label:"Quotation Code",dense:"",filled:"",modelValue:k.value,"onUpdate:modelValue":o[0]||(o[0]=a=>k.value=a),disable:"",loading:s.value},null,8,["modelValue","loading"])]),i("div",ll,[e(w,{filled:"",modelValue:f.value,"onUpdate:modelValue":o[2]||(o[2]=a=>f.value=a),dense:"",label:"Issue Date",loading:s.value,onClick:o[3]||(o[3]=a=>f.value.qDateProxy.show()),mask:"####-##-##","fill-mask":"",hint:"Mask: YYYY-MM-DD"},{append:l(()=>[e(me,{name:"event",class:"cursor-pointer"},{default:l(()=>[e(Ee,{cover:"","transition-show":"scale","transition-hide":"scale"},{default:l(()=>[e(xe,{modelValue:f.value,"onUpdate:modelValue":o[1]||(o[1]=a=>f.value=a),mask:"YYYY-MM-DD"},{default:l(()=>[i("div",al,[K(e(O,{label:"Close",color:"primary",flat:""},null,512),[[Re]])])]),_:1},8,["modelValue"])]),_:1})]),_:1})]),_:1},8,["modelValue","loading"])])]),i("div",tl,[i("div",ol,[e(R,{dense:"",filled:"",label:"Customer Name",modelValue:Q.value,"onUpdate:modelValue":o[4]||(o[4]=a=>Q.value=a),"use-input":"","input-debounce":"500",options:_.value,onFilter:o[5]||(o[5]=(a,h,T)=>F(a,h,T,"cust")),behavior:"dialog","option-label":"MCUS_CUSNM","option-value":"MCUS_CUSCD","emit-value":"","map-options":"",loading:s.value},null,8,["modelValue","options","loading"])]),i("div",nl,[e(w,{label:"Attn.",dense:"",filled:"",modelValue:U.value,"onUpdate:modelValue":o[6]||(o[6]=a=>U.value=a),loading:s.value},null,8,["modelValue","loading"])])]),i("div",sl,[i("div",il,[e(w,{label:"Subject",dense:"",filled:"",modelValue:V.value,"onUpdate:modelValue":o[7]||(o[7]=a=>V.value=a),loading:s.value},null,8,["modelValue","loading"])]),i("div",ul,[e(w,{label:"Project Location",dense:"",filled:"",modelValue:r.value,"onUpdate:modelValue":o[8]||(o[8]=a=>r.value=a),loading:s.value},null,8,["modelValue","loading"])])])]),i("div",dl,[e(Ye,{modelValue:n.value,"onUpdate:modelValue":[o[9]||(o[9]=a=>n.value=a),o[10]||(o[10]=a=>Ue(a))],spread:"",class:"my-custom-toggle","no-caps":"",rounded:"",unelevated:"","toggle-color":"primary",color:"white","text-color":"primary",options:[{label:"Rental",value:1},{label:"Sale",value:2}],dense:"",loading:s.value},null,8,["modelValue","loading"])]),n.value===2?(b(),B("div",rl,[e(w,{prefix:"Rp",label:"Service & Transportation Price",modelValue:p.value,"onUpdate:modelValue":o[11]||(o[11]=a=>p.value=a),filled:"",dense:"",loading:s.value},null,8,["modelValue","loading"])])):x("",!0),i("fieldset",cl,[ml,i("div",vl,[i("div",gl,[e(O,{flat:"",icon:"add",color:"blue",label:"Add Lines",onClick:fe,disable:!n.value,loading:s.value},null,8,["disable","loading"]),e(O,{color:"red",onClick:Te,flat:"",icon:"refresh",loading:s.value},{default:l(()=>[e(E,null,{default:l(()=>[y("Clear All Lines")]),_:1})]),_:1},8,["loading"])]),i("div",pl,[e(O,{color:"blue",label:"Assign Conditions",onClick:be,loading:s.value},null,8,["loading"]),e(O,{icon:"visibility",color:"indigo",flat:"",onClick:he,loading:s.value},{default:l(()=>[e(E,null,{default:l(()=>[y("View Conditions")]),_:1}),e($e,{color:"red",floating:""},{default:l(()=>[y(L(u.value.length),1)]),_:1})]),_:1},8,["loading"])])]),i("div",_l,[i("div",fl,[e(Le,{bordered:"",dense:""},{default:l(()=>[C.value.length>0?(b(!0),B(H,{key:0},Y(C.value,(a,h)=>(b(),D(W,{key:h,class:"q-my-sm",dense:""},{default:l(()=>[e(I,{avatar:""},{default:l(()=>[e(Ne,{"text-color":"blue"},{default:l(()=>[y(L(h+1),1)]),_:2},1024)]),_:2},1024),e(I,null,{default:l(()=>[e(q,null,{default:l(()=>[e(R,{dense:"",filled:"",label:"Item Name",modelValue:a.item,"onUpdate:modelValue":T=>a.item=T,"use-input":"","input-debounce":"500",options:A.value,onFilter:o[12]||(o[12]=(T,J,G)=>F(T,J,G,"item")),behavior:"dialog","option-label":"MITM_ITMNM","option-value":"MITM_ITMNM","emit-value":"","map-options":"",loading:s.value},null,8,["modelValue","onUpdate:modelValue","options","loading"])]),_:2},1024)]),_:2},1024),n.value===1?(b(),D(I,{key:0},{default:l(()=>[e(q,null,{default:l(()=>[e(R,{dense:"",filled:"",label:"Usage",modelValue:a.usage,"onUpdate:modelValue":T=>a.usage=T,"use-input":"","input-debounce":"500",options:N.value,onFilter:o[13]||(o[13]=(T,J,G)=>F(T,J,G,"usage")),behavior:"dialog","option-label":"MUSAGE_DESCALL","option-value":"id","emit-value":"","map-options":"",loading:s.value},null,8,["modelValue","onUpdate:modelValue","options","loading"])]),_:2},1024)]),_:2},1024)):x("",!0),e(I,null,{default:l(()=>[e(q,null,{default:l(()=>[e(w,{prefix:"Rp",dense:"",label:"Price",filled:"",modelValue:a.price,"onUpdate:modelValue":T=>a.price=T},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1024)]),_:2},1024),n.value===1?(b(),D(I,{key:1},{default:l(()=>[e(q,null,{default:l(()=>[e(w,{dense:"",label:"Electricity",filled:"",modelValue:a.electric,"onUpdate:modelValue":T=>a.electric=T},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1024)]),_:2},1024)):x("",!0),n.value===2?(b(),D(I,{key:2},{default:l(()=>[e(q,null,{default:l(()=>[e(w,{dense:"",label:"Qty",filled:"",modelValue:a.qty,"onUpdate:modelValue":T=>a.qty=T},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1024)]),_:2},1024)):x("",!0),e(I,{side:""},{default:l(()=>[e(O,{icon:"delete",color:"red",flat:"",onClick:T=>Ce(h)},null,8,["onClick"])]),_:2},1024)]),_:2},1024))),128)):K((b(),D(W,{key:1,class:"q-my-sm",clickable:""},{default:l(()=>[e(I,null,{default:l(()=>[e(q,null,{default:l(()=>[y(" No Items Added ")]),_:1})]),_:1})]),_:1})),[[ue]])]),_:1})])])])]),_:1}),e(de,{align:"right"},{default:l(()=>[e(O,{label:"OK",color:"primary",onClick:o[14]||(o[14]=a=>Oe()),disable:pe.value},null,8,["disable"]),e(O,{flat:"",label:"Cancel",color:"red",onClick:j(Se)},null,8,["onClick"])]),_:1})]),_:1})]),_:1},8,["onHide"]))}};const Cl={class:"q-pa-md"},Tl={class:"row q-pb-md"},bl=i("div",{class:"col"},[i("span",{class:"text-h4"},"Quotation ")],-1),hl={class:"col text-right"},Ol={class:"row q-pt-md"},Ul={class:"col"},Al={__name:"quotationView",setup(t){const c=z(),v=m("TQUO_QUOCD"),S=m(""),s=m([]),k=m([{name:"TQUO_QUOCD",label:"Quot. Code",field:"TQUO_QUOCD",sortable:!0,align:"left"},{name:"TQUO_SBJCT",label:"Quot. Subject",field:"TQUO_SBJCT",sortable:!0,align:"left"},{name:"MCUS_CUSNM",label:"Customer Name",field:"MCUS_CUSNM",sortable:!0,align:"left"},{name:"TQUO_ATTN",label:"Customer Attn",field:"TQUO_ATTN",sortable:!0,align:"left"},{name:"TQUO_CUSCD",label:"Customer Code",field:"TQUO_CUSCD",sortable:!0,align:"left"},{name:"TQUO_ISSUDT",label:"Issue Date",field:"TQUO_ISSUDT",sortable:!0,align:"left"},{name:"TQUO_PROJECT_LOCATION",label:"Proj. Loc",field:"TQUO_PROJECT_LOCATION",sortable:!0,align:"left"}]),f=m(!1);ce(()=>{Q()});const Q=async()=>{f.value=!0,await M.post("quotation/search",{searchBy:v.value,searchValue:S.value}).then(g=>{f.value=!1,s.value=g.data.data}).catch(g=>{f.value=!1})},U=()=>{c.dialog({component:se}).onOk(async g=>{Q()})},V=g=>{console.log(g),c.dialog({component:se,componentProps:{quoHeader:g}}).onOk(async u=>{Q()})},r=g=>{window.open("https://joss.jatpowerindo.co.id/PDF/quotation/"+btoa(g),"_blank").focus()};return(g,u)=>(b(),B("div",Cl,[i("div",Tl,[bl,i("div",hl,[e(O,{icon:"add",color:"blue",onClick:U},{default:l(()=>[e(E,null,{default:l(()=>[y("Create New Quotation")]),_:1})]),_:1})])]),e(Pe),i("div",Ol,[i("div",Ul,[e(Me,{title:"Created Quotation",rows:s.value,columns:k.value,"row-key":"name",loading:f.value,dense:"",pagination:{rowsPerPage:20},class:"my-sticky-header-column-table"},{"top-right":l(()=>[e(R,{outlined:"",modelValue:v.value,"onUpdate:modelValue":u[0]||(u[0]=n=>v.value=n),options:k.value,label:"Search Columns","option-value":"name","option-label":"label","emit-value":"",dense:"","map-options":""},null,8,["modelValue","options"]),e(w,{borderless:"",dense:"",modelValue:S.value,"onUpdate:modelValue":[u[1]||(u[1]=n=>S.value=n),u[2]||(u[2]=n=>Q())],placeholder:"Search",outlined:"",debounce:"1000"},{append:l(()=>[e(me,{name:"search"})]),_:1},8,["modelValue"])]),header:l(n=>[e(oe,{props:n},{default:l(()=>[(b(!0),B(H,null,Y(n.cols,p=>(b(),D(te,{key:p.name,props:n},{default:l(()=>[y(L(p.label),1)]),_:2},1032,["props"]))),128)),e(te,{"auto-width":""},{default:l(()=>[y("Action")]),_:1})]),_:2},1032,["props"])]),body:l(n=>[e(oe,{props:n},{default:l(()=>[(b(!0),B(H,null,Y(n.cols,p=>(b(),D(ne,{key:p.name,props:n},{default:l(()=>[y(L(p.value),1)]),_:2},1032,["props"]))),128)),e(ne,{"auto-width":""},{default:l(()=>[e(O,{flat:"",color:"orange",icon:"edit",onClick:p=>V(n.row.TQUO_QUOCD),dense:""},{default:l(()=>[e(E,null,{default:l(()=>[y("Edit this quotation")]),_:1})]),_:2},1032,["onClick"]),e(O,{flat:"",color:"indigo",icon:"print",onClick:p=>r(n.row.TQUO_QUOCD),dense:""},{default:l(()=>[e(E,null,{default:l(()=>[y("Print this quotation")]),_:1})]),_:2},1032,["onClick"])]),_:2},1024)]),_:2},1032,["props"])]),_:1},8,["rows","columns","loading"])])])]))}};export{Al as default};
