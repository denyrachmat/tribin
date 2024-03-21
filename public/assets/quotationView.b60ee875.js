import{Q as L}from"./QTooltip.dcda38aa.js";import{c as De,aH as ke,a as B,aY as Se,h as ae,Q as h,y as Ie,aZ as qe,a_ as Ae,s as g,B as T,C as S,D as l,E as e,L as ie,M as $,I as i,P as E,R as H,S as Y,T as K,H as O,O as A,V as ue,W as de,X as j,Y as re,o as ce,Z as k,am as me,a$ as R,U as Pe,aX as Ne}from"./index.dd036461.js";import{u as z,a as W,b as I,c as q,k as x,Q as Be,j as Le,l as te}from"./QTable.cf8d56d7.js";import{Q as oe,a as ne}from"./QTd.8ae53f09.js";import{api as ve,api_web as M}from"./axios.c6f21a49.js";import{Q as Me,a as Ee,C as Re}from"./ClosePopup.b840559a.js";import{Q as xe,u as ge}from"./use-dialog-plugin-component.0ee78367.js";import{Q as $e}from"./QBadge.7b255648.js";import{_ as He}from"./assignConditionsView.6c58978a.js";import"./use-cache.b0833c75.js";import"./date.5b3f0347.js";var Ye=De({name:"QBtnToggle",props:{...ke,modelValue:{required:!0},options:{type:Array,required:!0,validator:t=>t.every(v=>("label"in v||"icon"in v||"slot"in v)&&"value"in v)},color:String,textColor:String,toggleColor:{type:String,default:"primary"},toggleTextColor:String,outline:Boolean,flat:Boolean,unelevated:Boolean,rounded:Boolean,push:Boolean,glossy:Boolean,size:String,padding:String,noCaps:Boolean,noWrap:Boolean,dense:Boolean,readonly:Boolean,disable:Boolean,stack:Boolean,stretch:Boolean,spread:Boolean,clearable:Boolean,ripple:{type:[Boolean,Object],default:!0}},emits:["update:modelValue","clear","click"],setup(t,{slots:v,emit:p}){const V=B(()=>t.options.find(s=>s.value===t.modelValue)!==void 0),n=B(()=>({type:"hidden",name:t.name,value:t.modelValue})),w=qe(n),_=B(()=>Se(t)),U=B(()=>({rounded:t.rounded,dense:t.dense,..._.value})),Q=B(()=>t.options.map((s,u)=>{const{attrs:d,value:c,slot:P,...f}=s;return{slot:P,props:{key:u,"aria-pressed":c===t.modelValue?"true":"false",...d,...f,...U.value,disable:t.disable===!0||f.disable===!0,color:c===t.modelValue?m(f,"toggleColor"):m(f,"color"),textColor:c===t.modelValue?m(f,"toggleTextColor"):m(f,"textColor"),noCaps:m(f,"noCaps")===!0,noWrap:m(f,"noWrap")===!0,size:m(f,"size"),padding:m(f,"padding"),ripple:m(f,"ripple"),stack:m(f,"stack")===!0,stretch:m(f,"stretch")===!0,onClick(N){y(c,s,N)}}}}));function y(s,u,d){t.readonly!==!0&&(t.modelValue===s?t.clearable===!0&&(p("update:modelValue",null,null),p("clear")):p("update:modelValue",s,u),p("click",d))}function m(s,u){return s[u]===void 0?t[u]:s[u]}function D(){const s=Q.value.map(u=>ae(h,u.props,u.slot!==void 0?v[u.slot]:void 0));return t.name!==void 0&&t.disable!==!0&&V.value===!0&&w(s,"push"),Ie(v.default,s)}return()=>ae(xe,{class:"q-btn-toggle",..._.value,rounded:t.rounded,stretch:t.stretch,glossy:t.glossy,spread:t.spread},D)}});const je=Ae("counter",{state:()=>({customerList:[],itemList:[],usageList:[]}),getters:{doubleCount(t){return t.counter*2},getCustomer(t){return t.customerList},getItem(t){return t.itemList},getUsage(t){return t.usageList}},actions:{increment(){this.counter++},setCustomer(t){this.customerList=t},setItem(t){this.itemList=t},setUsage(t){this.usageList=t}}}),Fe={class:"row"},Je=i("div",{class:"col text-h6"},"View Condition",-1),Ge={class:"col text-right"},Ke={__name:"viewAssignedCond",props:{listCond:Array},setup(t){const v=t,p=z();g(!1);const V=()=>{p.dialog({title:"Prompt",message:"Input group name conditions",prompt:{model:"",isValid:Q=>Q.length>2,type:"text"},cancel:!0,persistent:!0}).onOk(async Q=>{let y=[];console.log(v.listCond),v.listCond.map(m=>{y.push({id:m.id,MCONDITION_DESCRIPTION:m.MCONDITION_DESCRIPTION})}),await ve.post("/master/conditions/assignGroup",{data:y,MCONDITION_RPT_STAT:Q}).then(m=>{console.log(m)})})},{dialogRef:n,onDialogHide:w,onDialogOK:_,onDialogCancel:U}=ge();return(Q,y)=>(T(),S(re,{ref_key:"dialogRef",ref:n,onHide:j(w),"transition-show":"slide-up","transition-hide":"slide-down","full-width":""},{default:l(()=>[e(ie,{class:"q-dialog-plugin bg-white q-pa-sm"},{default:l(()=>[e($,null,{default:l(()=>[i("div",Fe,[Je,i("div",Ge,[e(h,{label:"Save Template",color:"blue",onClick:V})])])]),_:1}),e($,{class:"q-pa-sm"},{default:l(()=>[(T(!0),E(H,null,Y(v.listCond,(m,D)=>K((T(),S(W,{clickable:"",key:D},{default:l(()=>[e(I,null,{default:l(()=>[e(q,null,{default:l(()=>[O(A(m.MCONDITION_DESCRIPTION),1)]),_:2},1024),e(q,{caption:""},{default:l(()=>[O("Description")]),_:1})]),_:2},1024)]),_:2},1024)),[[ue]])),128))]),_:1}),e(de,{align:"right"},{default:l(()=>[e(h,{label:"OK",color:"primary",onClick:j(_)},null,8,["onClick"])]),_:1})]),_:1})]),_:1},8,["onHide"]))}},We={class:"text-h6"},ze={style:{border:"1px black solid","border-radius":"10px"}},Xe=i("legend",{style:{"margin-left":"1em",padding:"0.2em 0.8em"}},[i("b",null,"Header")],-1),Ze={class:"row"},el={class:"col"},ll={class:"col q-pl-md"},al={class:"row items-center justify-end"},tl={class:"row"},ol={class:"col"},nl={class:"col q-pl-md"},sl={class:"row q-pt-md"},il={class:"col"},ul={class:"col q-pl-md"},dl={class:"q-pa-sm"},rl={key:0,class:"q-pb-md"},cl={style:{border:"1px black solid","border-radius":"10px",height:"35vh",overflow:"auto"}},ml=i("legend",{style:{"margin-left":"1em",padding:"0.2em 0.8em"}},[i("b",null,"Detail Items")],-1),vl={class:"row q-pb-md"},gl={class:"col"},pl={class:"col text-right"},_l={class:"row"},fl={class:"col"},se={__name:"quotationCreate",props:{quoHeader:String},setup(t){const v=z(),p=je(),V=t;ce(async()=>{p.getCustomer.length===0?(await X(""),p.setCustomer(f.value)):f.value=p.getCustomer,p.getItem.length===0?(await Z(""),p.setItem(P.value)):P.value=p.getItem,p.getUsage.length===0?(await ee(""),p.setUsage(N.value)):N.value=p.getUsage,V.quoHeader&&_e(V.quoHeader)});const n=g(!1),w=g(""),_=g(""),U=g(""),Q=g(""),y=g(""),m=g(""),D=g(""),s=g([]),u=g(1),d=g(0),c=g([]),P=g([]),f=g([]),N=g([]),pe=B(()=>u.value===1?c.value.length===0||c.value.filter(r=>!r.item||!r.price).length>0:c.value.length===0||c.value.filter(r=>!r.item||!r.price||!r.qty).length>0),F=(r,o,a,b)=>{o(async()=>{b==="cust"&&await X(r),b==="item"&&await Z(r),b==="usage"&&await ee(r)})},X=async r=>{n.value=!0,await M.post("customer/searchAPI",{searchValue:r}).then(o=>{n.value=!1,f.value=o.data.data}).catch(()=>{n.value=!1})},Z=async r=>{n.value=!0,await M.post("item/searchAPI",{searchValue:r}).then(o=>{n.value=!1,P.value=o.data.data}).catch(()=>{n.value=!1})},ee=async r=>{n.value=!0,await M.post("usage/searchAPI",{searchValue:r}).then(o=>{n.value=!1,N.value=o.data.data}).catch(()=>{n.value=!1})},_e=async r=>{n.value=!0,await ve.get(`transaction/quotation/view/${btoa(r)}`).then(o=>{n.value=!1;const a=o.data.data;w.value=a.TQUO_QUOCD,_.value=a.TQUO_ISSUDT,U.value=a.TQUO_CUSCD,Q.value=a.TQUO_ATTN,y.value=a.TQUO_SBJCT,m.value=a.TQUO_PROJECT_LOCATION,D.value=a.cond,s.value=a.condlist,u.value=parseInt(a.TQUO_TYPE),d.value=a.TQUO_SERVTRANS_COST,a.det.map(b=>{c.value.push({item:b.TQUODETA_ITMCD,usage:parseInt(b.TQUODETA_USAGE),price:b.TQUODETA_PRC,electric:b.TQUODETA_ELECTRICITY,qty:b.TQUODETA_ITMQT})}),console.log(o)}).catch(()=>{n.value=!1})},fe=()=>{c.value.push({item:"",usage:"",price:"",electric:"",qty:1})},Ce=r=>{v.dialog({title:"Confirmation",message:`Do you want to delete this lines no ${r+1} ?`,cancel:!0,persistent:!0}).onOk(async()=>{c.value.splice(r,1)})},Te=()=>{v.dialog({title:"Confirmation",message:"Do you want to clear all this line ?",cancel:!0,persistent:!0}).onOk(async()=>{c.value=[]})},be=()=>{v.dialog({component:He}).onOk(async r=>{D.value=r.MCONDITION_RPT_STAT,s.value=r.group})},he=()=>{v.dialog({component:Ke,componentProps:{listCond:s.value}}).onOk(async r=>{})},Oe=async()=>{v.dialog({title:"Confirmation",message:"Do you want to save all this data ?",cancel:!0,persistent:!0}).onOk(async()=>{s.value.length===0?v.dialog({title:"Confirmation",message:"You're not selecting any condition, are you sure want to continue ?",cancel:!0,persistent:!0}).onOk(async()=>{le()}):le()})},le=async()=>{n.value=!0,await M.post("quotationNew/saveAPI",{TQUO_QUOCD:w.value,TQUO_CUSCD:U.value,TQUO_ATTN:Q.value,TQUO_SBJCT:y.value,TQUO_ISSUDT:_.value,TQUO_PROJECT_LOCATION:m.value,TQUO_TYPE:u.value,TQUO_SERVTRANS_COST:d.value,DET:c.value,COND:D.value,CONDLIST:s.value}).then(r=>{n.value=!1,console.log(r),Ve()}).catch(()=>{n.value=!1})},Ue=r=>{v.dialog({title:"Confirmation",message:"Are you sure want to change type ? This action will clear you lines !!",cancel:!0,persistent:!0}).onOk(async()=>{D.value="",s.value=[],d.value=0,c.value=[]})},{dialogRef:Qe,onDialogHide:ye,onDialogOK:Ve,onDialogCancel:we}=ge();return(r,o)=>(T(),S(re,{ref_key:"dialogRef",ref:Qe,onHide:j(ye),"transition-show":"slide-up","transition-hide":"slide-down","full-width":"",persistent:""},{default:l(()=>[e(ie,{class:"q-dialog-plugin bg-white q-pa-sm"},{default:l(()=>[e($,null,{default:l(()=>[i("div",We,A(V.quoHeader?"Edit ":"Create ")+" Quotation ",1)]),_:1}),e($,{class:"q-pa-sm"},{default:l(()=>[i("fieldset",ze,[Xe,i("div",Ze,[i("div",el,[e(k,{label:"Quotation Code",dense:"",filled:"",modelValue:w.value,"onUpdate:modelValue":o[0]||(o[0]=a=>w.value=a),disable:"",loading:n.value},null,8,["modelValue","loading"])]),i("div",ll,[e(k,{filled:"",modelValue:_.value,"onUpdate:modelValue":o[2]||(o[2]=a=>_.value=a),dense:"",label:"Issue Date",loading:n.value,onClick:o[3]||(o[3]=a=>_.value.qDateProxy.show()),mask:"####-##-##","fill-mask":"",hint:"Mask: YYYY-MM-DD"},{append:l(()=>[e(me,{name:"event",class:"cursor-pointer"},{default:l(()=>[e(Me,{cover:"","transition-show":"scale","transition-hide":"scale"},{default:l(()=>[e(Ee,{modelValue:_.value,"onUpdate:modelValue":o[1]||(o[1]=a=>_.value=a),mask:"YYYY-MM-DD"},{default:l(()=>[i("div",al,[K(e(h,{label:"Close",color:"primary",flat:""},null,512),[[Re]])])]),_:1},8,["modelValue"])]),_:1})]),_:1})]),_:1},8,["modelValue","loading"])])]),i("div",tl,[i("div",ol,[e(x,{dense:"",filled:"",label:"Customer Name",modelValue:U.value,"onUpdate:modelValue":o[4]||(o[4]=a=>U.value=a),"use-input":"","input-debounce":"500",options:f.value,onFilter:o[5]||(o[5]=(a,b,C)=>F(a,b,C,"cust")),behavior:"dialog","option-label":"MCUS_CUSNM","option-value":"MCUS_CUSCD","emit-value":"","map-options":"",loading:n.value},null,8,["modelValue","options","loading"])]),i("div",nl,[e(k,{label:"Attn.",dense:"",filled:"",modelValue:Q.value,"onUpdate:modelValue":o[6]||(o[6]=a=>Q.value=a),loading:n.value},null,8,["modelValue","loading"])])]),i("div",sl,[i("div",il,[e(k,{label:"Subject",dense:"",filled:"",modelValue:y.value,"onUpdate:modelValue":o[7]||(o[7]=a=>y.value=a),loading:n.value},null,8,["modelValue","loading"])]),i("div",ul,[e(k,{label:"Project Location",dense:"",filled:"",modelValue:m.value,"onUpdate:modelValue":o[8]||(o[8]=a=>m.value=a),loading:n.value},null,8,["modelValue","loading"])])])]),i("div",dl,[e(Ye,{modelValue:u.value,"onUpdate:modelValue":[o[9]||(o[9]=a=>u.value=a),o[10]||(o[10]=a=>Ue(a))],spread:"",class:"my-custom-toggle","no-caps":"",rounded:"",unelevated:"","toggle-color":"primary",color:"white","text-color":"primary",options:[{label:"Rental",value:1},{label:"Sale",value:2}],dense:"",loading:n.value},null,8,["modelValue","loading"])]),u.value===2?(T(),E("div",rl,[e(k,{prefix:"Rp",label:"Service & Transportation Price",modelValue:d.value,"onUpdate:modelValue":o[11]||(o[11]=a=>d.value=a),filled:"",dense:"",loading:n.value},null,8,["modelValue","loading"])])):R("",!0),i("fieldset",cl,[ml,i("div",vl,[i("div",gl,[e(h,{flat:"",icon:"add",color:"blue",label:"Add Lines",onClick:fe,disable:!u.value,loading:n.value},null,8,["disable","loading"]),e(h,{color:"red",onClick:Te,flat:"",icon:"refresh",loading:n.value},{default:l(()=>[e(L,null,{default:l(()=>[O("Clear All Lines")]),_:1})]),_:1},8,["loading"])]),i("div",pl,[e(h,{color:"blue",label:"Assign Conditions",onClick:be,loading:n.value},null,8,["loading"]),e(h,{icon:"visibility",color:"indigo",flat:"",onClick:he,loading:n.value},{default:l(()=>[e(L,null,{default:l(()=>[O("View Conditions")]),_:1}),e($e,{color:"red",floating:""},{default:l(()=>[O(A(s.value.length),1)]),_:1})]),_:1},8,["loading"])])]),i("div",_l,[i("div",fl,[e(Be,{bordered:"",dense:""},{default:l(()=>[c.value.length>0?(T(!0),E(H,{key:0},Y(c.value,(a,b)=>(T(),S(W,{key:b,class:"q-my-sm",dense:""},{default:l(()=>[e(I,{avatar:""},{default:l(()=>[e(Pe,{"text-color":"blue"},{default:l(()=>[O(A(b+1),1)]),_:2},1024)]),_:2},1024),e(I,null,{default:l(()=>[e(q,null,{default:l(()=>[e(x,{dense:"",filled:"",label:"Item Name",modelValue:a.item,"onUpdate:modelValue":C=>a.item=C,"use-input":"","input-debounce":"500",options:P.value,onFilter:o[12]||(o[12]=(C,J,G)=>F(C,J,G,"item")),behavior:"dialog","option-label":"MITM_ITMNM","option-value":"MITM_ITMNM","emit-value":"","map-options":"",loading:n.value},null,8,["modelValue","onUpdate:modelValue","options","loading"])]),_:2},1024)]),_:2},1024),u.value===1?(T(),S(I,{key:0},{default:l(()=>[e(q,null,{default:l(()=>[e(x,{dense:"",filled:"",label:"Usage",modelValue:a.usage,"onUpdate:modelValue":C=>a.usage=C,"use-input":"","input-debounce":"500",options:N.value,onFilter:o[13]||(o[13]=(C,J,G)=>F(C,J,G,"usage")),behavior:"dialog","option-label":"MUSAGE_DESCALL","option-value":"id","emit-value":"","map-options":"",loading:n.value},null,8,["modelValue","onUpdate:modelValue","options","loading"])]),_:2},1024)]),_:2},1024)):R("",!0),e(I,null,{default:l(()=>[e(q,null,{default:l(()=>[e(k,{prefix:"Rp",dense:"",label:"Price",filled:"",modelValue:a.price,"onUpdate:modelValue":C=>a.price=C},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1024)]),_:2},1024),u.value===1?(T(),S(I,{key:1},{default:l(()=>[e(q,null,{default:l(()=>[e(k,{dense:"",label:"Electricity",filled:"",modelValue:a.electric,"onUpdate:modelValue":C=>a.electric=C},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1024)]),_:2},1024)):R("",!0),u.value===2?(T(),S(I,{key:2},{default:l(()=>[e(q,null,{default:l(()=>[e(k,{dense:"",label:"Qty",filled:"",modelValue:a.qty,"onUpdate:modelValue":C=>a.qty=C},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1024)]),_:2},1024)):R("",!0),e(I,{side:""},{default:l(()=>[e(h,{icon:"delete",color:"red",flat:"",onClick:C=>Ce(b)},null,8,["onClick"])]),_:2},1024)]),_:2},1024))),128)):K((T(),S(W,{key:1,class:"q-my-sm",clickable:""},{default:l(()=>[e(I,null,{default:l(()=>[e(q,null,{default:l(()=>[O(" No Items Added ")]),_:1})]),_:1})]),_:1})),[[ue]])]),_:1})])])])]),_:1}),e(de,{align:"right"},{default:l(()=>[e(h,{label:"OK",color:"primary",onClick:o[14]||(o[14]=a=>Oe()),disable:pe.value},null,8,["disable"]),e(h,{flat:"",label:"Cancel",color:"red",onClick:j(we)},null,8,["onClick"])]),_:1})]),_:1})]),_:1},8,["onHide"]))}};const Cl={class:"q-pa-md"},Tl={class:"row q-pb-md"},bl=i("div",{class:"col"},[i("span",{class:"text-h4"},"Quotation ")],-1),hl={class:"col text-right"},Ol={class:"row q-pt-md"},Ul={class:"col"},Nl={__name:"quotationView",setup(t){const v=z(),p=g("TQUO_QUOCD"),V=g(""),n=g([]),w=g([{name:"TQUO_QUOCD",label:"Quot. Code",field:"TQUO_QUOCD",sortable:!0,align:"left"},{name:"TQUO_SBJCT",label:"Quot. Subject",field:"TQUO_SBJCT",sortable:!0,align:"left"},{name:"MCUS_CUSNM",label:"Customer Name",field:"MCUS_CUSNM",sortable:!0,align:"left"},{name:"TQUO_ATTN",label:"Customer Attn",field:"TQUO_ATTN",sortable:!0,align:"left"},{name:"TQUO_CUSCD",label:"Customer Code",field:"TQUO_CUSCD",sortable:!0,align:"left"},{name:"TQUO_ISSUDT",label:"Issue Date",field:"TQUO_ISSUDT",sortable:!0,align:"left"},{name:"TQUO_PROJECT_LOCATION",label:"Proj. Loc",field:"TQUO_PROJECT_LOCATION",sortable:!0,align:"left"}]),_=g(!1);ce(()=>{U()});const U=async()=>{_.value=!0,await M.post("quotation/search",{searchBy:p.value,searchValue:V.value}).then(s=>{_.value=!1,n.value=s.data.data}).catch(s=>{_.value=!1})},Q=()=>{v.dialog({component:se}).onOk(async s=>{U()})},y=s=>{console.log(s),v.dialog({component:se,componentProps:{quoHeader:s}}).onOk(async u=>{U()})},m=s=>{v.dialog({title:"Confirmation",message:"Are you sure want to delete this data ?",cancel:!0,persistent:!0}).onOk(async()=>{_.value=!0,await M.delete(`quotationNew/${btoa(s)}`).then(u=>{_.value=!1,U()})})},D=s=>{window.open("https://joss.jatpowerindo.co.id/PDF/quotation/"+btoa(s),"_blank").focus()};return(s,u)=>(T(),E("div",Cl,[i("div",Tl,[bl,i("div",hl,[e(h,{icon:"add",color:"blue",onClick:Q},{default:l(()=>[e(L,null,{default:l(()=>[O("Create New Quotation")]),_:1})]),_:1})])]),e(Ne),i("div",Ol,[i("div",Ul,[e(Le,{title:"Created Quotation",rows:n.value,columns:w.value,"row-key":"name",loading:_.value,dense:"",pagination:{rowsPerPage:20},class:"my-sticky-header-column-table"},{"top-right":l(()=>[e(x,{outlined:"",modelValue:p.value,"onUpdate:modelValue":u[0]||(u[0]=d=>p.value=d),options:w.value,label:"Search Columns","option-value":"name","option-label":"label","emit-value":"",dense:"","map-options":""},null,8,["modelValue","options"]),e(k,{borderless:"",dense:"",modelValue:V.value,"onUpdate:modelValue":[u[1]||(u[1]=d=>V.value=d),u[2]||(u[2]=d=>U())],placeholder:"Search",outlined:"",debounce:"1000"},{append:l(()=>[e(me,{name:"search"})]),_:1},8,["modelValue"])]),header:l(d=>[e(oe,{props:d},{default:l(()=>[(T(!0),E(H,null,Y(d.cols,c=>(T(),S(te,{key:c.name,props:d},{default:l(()=>[O(A(c.label),1)]),_:2},1032,["props"]))),128)),e(te,{"auto-width":""},{default:l(()=>[O("Action")]),_:1})]),_:2},1032,["props"])]),body:l(d=>[e(oe,{props:d},{default:l(()=>[(T(!0),E(H,null,Y(d.cols,c=>(T(),S(ne,{key:c.name,props:d},{default:l(()=>[O(A(c.value),1)]),_:2},1032,["props"]))),128)),e(ne,{"auto-width":""},{default:l(()=>[e(h,{flat:"",color:"orange",icon:"edit",onClick:c=>y(d.row.TQUO_QUOCD),dense:"",disable:d.row.TQUO_APPRVDT!==null},{default:l(()=>[e(L,null,{default:l(()=>[O(A(d.row.TQUO_APPRVDT?"Quotation already approved, cannot edit !":"Edit this quotation"),1)]),_:2},1024)]),_:2},1032,["onClick","disable"]),e(h,{flat:"",color:"red",icon:"delete",onClick:c=>m(d.row.TQUO_QUOCD),dense:"",disable:d.row.TQUO_APPRVDT!==null},{default:l(()=>[e(L,null,{default:l(()=>[O(A(d.row.TQUO_APPRVDT?"Quotation already approved, cannot delete !":"Delete this quotation"),1)]),_:2},1024)]),_:2},1032,["onClick","disable"]),e(h,{flat:"",color:"indigo",icon:"print",onClick:c=>D(d.row.TQUO_QUOCD),dense:""},{default:l(()=>[e(L,null,{default:l(()=>[O("Print this quotation")]),_:1})]),_:2},1032,["onClick"])]),_:2},1024)]),_:2},1032,["props"])]),_:1},8,["rows","columns","loading"])])])]))}};export{Nl as default};
