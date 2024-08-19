import{Q as N}from"./QTooltip.9b1f23aa.js";import{bm as Ae,t as d,o as K,C as _,D as k,E as l,F as e,M as me,O as Y,J as u,$ as Q,at as W,X as ve,Q as C,Y as x,Z as pe,a as Ie,P as I,U as ne,R,aZ as $,I as y,S as J,T as G,V as Pe,W as Ne,aY as Le}from"./index.820aad11.js";import{e as L,Q as se,a as A,b as P}from"./QSelect.504acf78.js";import{Q as ge,a as ie}from"./QTable.f7a8d59f.js";import{Q as ue,a as de}from"./QTd.3fb10de5.js";import{u as Z}from"./format.fc98c69e.js";import{api_web as w,api as Re}from"./axios.e44bf803.js";import{Q as $e,a as Me,C as Ee}from"./ClosePopup.93c39e06.js";import{Q as Be}from"./QBtnToggle.8844692c.js";import{Q as re}from"./QBadge.c4bf7db4.js";import{Q as Ye}from"./QList.c0ca7320.js";import{u as fe}from"./use-dialog-plugin-component.ca85053e.js";import{_ as xe}from"./assignConditionsView.bae5ca20.js";import{_ as He}from"./viewAssignedCond.4b62f892.js";import"./use-render-cache.3aae9b27.js";import"./date.8aff8c34.js";import"./QBtnGroup.88ad084a.js";const Fe=Ae("counter",{state:()=>({customerList:[],itemList:[],usageList:[]}),getters:{doubleCount(p){return p.counter*2},getCustomer(p){return p.customerList},getItem(p){return p.itemList},getUsage(p){return p.usageList}},actions:{increment(){this.counter++},setCustomer(p){this.customerList=p},setItem(p){this.itemList=p},setUsage(p){this.usageList=p}}}),je=u("div",{class:"text-h6"},"Choose Bank Transfer",-1),Je={class:"row q-pt-md"},Ge={class:"col"},Ke={__name:"quotationBankChoose",props:{payment:Array},setup(p){const T=Z(),g=d(!1),V=d([{name:"id",label:"id",field:"id",sortable:!0,align:"left"},{name:"bank_name",label:"Bank Name",field:"bank_name",sortable:!0,align:"left"},{name:"bank_account_name",label:"Bank Acc Name",field:"bank_account_name",sortable:!0,align:"left"},{name:"bank_account_number",label:"Bank Acc Number",field:"bank_account_number",sortable:!0,align:"left"}]),o=d([]),b=d([]),v=p;K(()=>{v.payment&&v.payment.length>0&&(console.log(v.payment),b.value=v.payment),U()});const U=async()=>{g.value=!0,await w.get("payment-account").then(i=>{console.log(i.data),g.value=!1,o.value=i.data.data}).catch(()=>{g.value=!1})},S=()=>{T.dialog({title:"Confirmation",message:"Do you want to choose all this data ?",cancel:!0,persistent:!0}).onOk(async()=>{console.log(b.value),q(b.value)})},{dialogRef:O,onDialogHide:D,onDialogOK:q,onDialogCancel:c}=fe();return(i,n)=>(_(),k(pe,{ref_key:"dialogRef",ref:O,onHide:x(D),"transition-show":"slide-up","transition-hide":"slide-down","full-width":"",persistent:""},{default:l(()=>[e(me,{class:"q-dialog-plugin bg-white q-pa-sm"},{default:l(()=>[e(Y,null,{default:l(()=>[je]),_:1}),e(Y,{class:"q-pa-sm"},{default:l(()=>[u("div",Je,[u("div",Ge,[e(ge,{title:"List Bank Account",rows:o.value,columns:V.value,"row-key":"id",loading:g.value,dense:"",pagination:{rowsPerPage:20},class:"my-sticky-header-column-table",selection:"multiple",selected:b.value,"onUpdate:selected":n[3]||(n[3]=r=>b.value=r)},{"top-right":l(()=>[e(L,{outlined:"",modelValue:i.filterCol,"onUpdate:modelValue":n[0]||(n[0]=r=>i.filterCol=r),options:V.value,label:"Search Columns","option-value":"name","option-label":"label","emit-value":"",dense:"","map-options":""},null,8,["modelValue","options"]),e(Q,{borderless:"",dense:"",modelValue:i.filter,"onUpdate:modelValue":[n[1]||(n[1]=r=>i.filter=r),n[2]||(n[2]=r=>i.dataQuo())],placeholder:"Search",outlined:"",debounce:"1000"},{append:l(()=>[e(W,{name:"search"})]),_:1},8,["modelValue"])]),_:1},8,["rows","columns","loading","selected"])])])]),_:1}),e(ve,{align:"right"},{default:l(()=>[e(C,{label:"OK",color:"primary",onClick:n[4]||(n[4]=r=>S())}),e(C,{flat:"",label:"Cancel",color:"red",onClick:x(c)},null,8,["onClick"])]),_:1})]),_:1})]),_:1},8,["onHide"]))}},We={class:"text-h6"},Ze={style:{border:"1px black solid","border-radius":"10px"}},Xe=u("legend",{style:{"margin-left":"1em",padding:"0.2em 0.8em"}},[u("b",null,"Header")],-1),ze={class:"row"},el={class:"col"},ll={class:"col q-pl-md"},al={class:"row items-center justify-end"},tl={class:"row"},ol={class:"col"},nl={class:"col q-pl-md"},sl={class:"row q-pt-md"},il={class:"col"},ul={class:"col q-pl-md"},dl={class:"q-pa-sm"},rl={key:0,class:"q-pb-md"},cl={key:1,class:"q-pb-md"},ml={style:{border:"1px black solid","border-radius":"10px",height:"35vh",overflow:"auto"}},vl=u("legend",{style:{"margin-left":"1em",padding:"0.2em 0.8em"}},[u("b",null,"Detail Items")],-1),pl={class:"row q-pb-md"},gl={class:"col"},fl={class:"col text-right"},_l={class:"row"},Cl={class:"col"},ce={__name:"quotationCreate",props:{quoHeader:String},setup(p){const T=Z(),g=Fe(),V=p;K(async()=>{g.getCustomer.length===0?(await ee(""),g.setCustomer(E.value)):E.value=g.getCustomer,g.getItem.length===0?(await le(""),g.setItem(M.value)):M.value=g.getItem,g.getUsage.length===0?(await ae(""),g.setUsage(B.value)):B.value=g.getUsage,V.quoHeader&&await Ce(V.quoHeader),te()});const o=d(!1),b=d(""),v=d(""),U=d(""),S=d(""),O=d(""),D=d(""),q=d(""),c=d([]),i=d(1),n=d(0),r=d([]),h=d([]),X=d(""),z=d(""),M=d([]),E=d([]),B=d([]),_e=Ie(()=>i.value===1?h.value.length===0||h.value.filter(s=>!s.item||!s.price).length>0:h.value.length===0||h.value.filter(s=>!s.item||!s.price||!s.qty).length>0),H=(s,t,a,f)=>{t(async()=>{f==="cust"&&await ee(s),f==="item"&&await le(s),f==="usage"&&await ae(s)})},ee=async s=>{o.value=!0,await w.post("customer/searchAPI",{searchValue:s}).then(t=>{o.value=!1,E.value=t.data.data}).catch(()=>{o.value=!1})},le=async s=>{o.value=!0,await w.post("item/searchAPI",{searchValue:s}).then(t=>{o.value=!1,M.value=t.data.data}).catch(()=>{o.value=!1})},ae=async s=>{o.value=!0,await w.post("usage/searchAPI",{searchValue:s}).then(t=>{o.value=!1,B.value=t.data.data}).catch(()=>{o.value=!1})},Ce=async s=>{o.value=!0,await Re.get(`transaction/quotation/view/${btoa(s)}`).then(t=>{o.value=!1;const a=t.data.data;b.value=a.TQUO_QUOCD,v.value=a.TQUO_ISSUDT,U.value=a.TQUO_CUSCD,S.value=a.TQUO_ATTN,O.value=a.TQUO_SBJCT,D.value=a.TQUO_PROJECT_LOCATION,q.value=a.cond,c.value=a.condlist,i.value=parseInt(a.TQUO_TYPE),n.value=a.TQUO_SERVTRANS_COST,r.value=a.payment,a.det.map(f=>{h.value.push({item:f.TQUODETA_ITMCD,usage:parseInt(f.TQUODETA_USAGE),price:f.TQUODETA_PRC,electric:f.TQUODETA_ELECTRICITY,qty:f.TQUODETA_ITMQT})}),console.log(t)}).catch(()=>{o.value=!1})},be=()=>{h.value.push({item:"",usage:"",price:"",electric:"",qty:1})},Te=s=>{T.dialog({title:"Confirmation",message:`Do you want to delete this lines no ${s+1} ?`,cancel:!0,persistent:!0}).onOk(async()=>{h.value.splice(s,1)})},Ue=()=>{T.dialog({title:"Confirmation",message:"Do you want to clear all this line ?",cancel:!0,persistent:!0}).onOk(async()=>{h.value=[]})},he=()=>{T.dialog({component:xe}).onOk(async s=>{q.value=s.MCONDITION_RPT_STAT,c.value=s.group})},ye=()=>{T.dialog({component:He,componentProps:{listCond:c.value}}).onOk(async s=>{})},Qe=()=>{T.dialog({component:Ke,componentProps:{payment:r.value}}).onOk(async s=>{r.value=s})},te=async()=>{o.value=!0,await w.post("servicesAdmins/search",{searchBy:"TSRVD_FLGSTS",searchValue:"2",onlyShowWoQuo:!0}).then(s=>{o.value=!1,z.value=s.data.data}).catch(s=>{o.value=!1})},Ve=async()=>{T.dialog({title:"Confirmation",message:"Do you want to save all this data ?",cancel:!0,persistent:!0}).onOk(async()=>{c.value.length===0?T.dialog({title:"Confirmation",message:"You're not selecting any condition, are you sure want to continue ?",cancel:!0,persistent:!0}).onOk(async()=>{oe()}):oe()})},oe=async()=>{o.value=!0,await w.post("quotationNew/saveAPI",{TQUO_QUOCD:b.value,TQUO_CUSCD:U.value,TQUO_ATTN:S.value,TQUO_SBJCT:O.value,TQUO_ISSUDT:v.value,TQUO_PROJECT_LOCATION:D.value,TQUO_TYPE:i.value,TQUO_SERVTRANS_COST:n.value,DET:h.value,COND:q.value,CONDLIST:c.value,PAYMENT:r.value}).then(s=>{o.value=!1,console.log(s),De()}).catch(()=>{o.value=!1})},Oe=s=>{q.value="",c.value=[],n.value=0,h.value=[]},ke=async s=>{o.value=!0,await w.post("servicesAdmins/search",{searchBy:"SRVH_DOCNO",searchValue:s}).then(t=>{o.value=!1;const a=t.data.data[0];U.value=a.MCUS_CUSCD,O.value=`SERVICE - ${s}`,a.detail.map(f=>{f.list_fix_det.map(m=>{h.value.push({item:m.MITM_ITMCD,usage:0,price:m.TSRVF_PRC,electric:"",qty:m.TSRVF_QTY})})}),console.log(a)}).catch(t=>{o.value=!1})},{dialogRef:we,onDialogHide:Se,onDialogOK:De,onDialogCancel:qe}=fe();return(s,t)=>(_(),k(pe,{ref_key:"dialogRef",ref:we,onHide:x(Se),"transition-show":"slide-up","transition-hide":"slide-down","full-width":"",persistent:""},{default:l(()=>[e(me,{class:"q-dialog-plugin bg-white q-pa-sm"},{default:l(()=>[e(Y,null,{default:l(()=>[u("div",We,I(V.quoHeader?"Edit ":"Create ")+" Quotation ",1)]),_:1}),e(Y,{class:"q-pa-sm"},{default:l(()=>[u("fieldset",Ze,[Xe,u("div",ze,[u("div",el,[e(Q,{label:"Quotation Code",dense:"",filled:"",modelValue:b.value,"onUpdate:modelValue":t[0]||(t[0]=a=>b.value=a),disable:"",loading:o.value},null,8,["modelValue","loading"])]),u("div",ll,[e(Q,{filled:"",modelValue:v.value,"onUpdate:modelValue":t[2]||(t[2]=a=>v.value=a),dense:"",label:"Issue Date",loading:o.value,onClick:t[3]||(t[3]=a=>v.value.qDateProxy.show()),mask:"####-##-##","fill-mask":"",hint:"Mask: YYYY-MM-DD"},{append:l(()=>[e(W,{name:"event",class:"cursor-pointer"},{default:l(()=>[e($e,{cover:"","transition-show":"scale","transition-hide":"scale"},{default:l(()=>[e(Me,{modelValue:v.value,"onUpdate:modelValue":t[1]||(t[1]=a=>v.value=a),mask:"YYYY-MM-DD"},{default:l(()=>[u("div",al,[ne(e(C,{label:"Close",color:"primary",flat:""},null,512),[[Ee]])])]),_:1},8,["modelValue"])]),_:1})]),_:1})]),_:1},8,["modelValue","loading"])])]),u("div",tl,[u("div",ol,[e(L,{dense:"",filled:"",label:"Customer Name",modelValue:U.value,"onUpdate:modelValue":t[4]||(t[4]=a=>U.value=a),"use-input":"","input-debounce":"500",options:E.value,onFilter:t[5]||(t[5]=(a,f,m)=>H(a,f,m,"cust")),behavior:"dialog","option-label":"MCUS_CUSNM","option-value":"MCUS_CUSCD","emit-value":"","map-options":"",loading:o.value,readonly:i.value===3,disable:b.value!==""},null,8,["modelValue","options","loading","readonly","disable"])]),u("div",nl,[e(Q,{label:"Attn.",dense:"",filled:"",modelValue:S.value,"onUpdate:modelValue":t[6]||(t[6]=a=>S.value=a),loading:o.value},null,8,["modelValue","loading"])])]),u("div",sl,[u("div",il,[e(Q,{label:"Subject",dense:"",filled:"",modelValue:O.value,"onUpdate:modelValue":t[7]||(t[7]=a=>O.value=a),loading:o.value,readonly:i.value===3},null,8,["modelValue","loading","readonly"])]),u("div",ul,[e(Q,{label:"Project Location",dense:"",filled:"",modelValue:D.value,"onUpdate:modelValue":t[8]||(t[8]=a=>D.value=a),loading:o.value},null,8,["modelValue","loading"])])])]),u("div",dl,[e(Be,{modelValue:i.value,"onUpdate:modelValue":[t[9]||(t[9]=a=>i.value=a),t[10]||(t[10]=a=>Oe(a))],spread:"",class:"my-custom-toggle","no-caps":"",rounded:"",unelevated:"","toggle-color":"primary",color:"white","text-color":"primary",options:[{label:"Rental",value:1},{label:"Sale",value:2},{label:"Service",value:3}],dense:"",loading:o.value},null,8,["modelValue","loading"])]),i.value===3?(_(),R("div",rl,[e(L,{dense:"",filled:"",label:"Service ID",modelValue:X.value,"onUpdate:modelValue":[t[11]||(t[11]=a=>X.value=a),t[12]||(t[12]=a=>ke(a))],options:z.value,behavior:"dialog","option-label":"LBLDATA","option-value":"SRVH_DOCNO","emit-value":"","map-options":"",loading:o.value,onClick:t[13]||(t[13]=a=>te())},null,8,["modelValue","options","loading"])])):$("",!0),i.value===2||i.value===3?(_(),R("div",cl,[e(Q,{prefix:"Rp",label:"Service & Transportation Price",modelValue:n.value,"onUpdate:modelValue":t[14]||(t[14]=a=>n.value=a),filled:"",dense:"",loading:o.value},null,8,["modelValue","loading"])])):$("",!0),u("fieldset",ml,[vl,u("div",pl,[u("div",gl,[e(C,{flat:"",icon:"add",color:"blue",label:"Add Lines",onClick:be,disable:!i.value,loading:o.value},null,8,["disable","loading"]),e(C,{color:"red",onClick:Ue,flat:"",icon:"refresh",loading:o.value},{default:l(()=>[e(N,null,{default:l(()=>[y("Clear All Lines")]),_:1})]),_:1},8,["loading"])]),u("div",fl,[e(C,{color:"blue",label:"Assign Conditions",onClick:he,loading:o.value},null,8,["loading"]),e(C,{color:"indigo",label:"Assign Bank Account",onClick:Qe,loading:o.value},{default:l(()=>[e(re,{color:"red",floating:""},{default:l(()=>[y(I(r.value.length),1)]),_:1})]),_:1},8,["loading"]),e(C,{icon:"visibility",color:"indigo",flat:"",onClick:ye,loading:o.value},{default:l(()=>[e(N,null,{default:l(()=>[y("View Conditions")]),_:1}),e(re,{color:"red",floating:""},{default:l(()=>[y(I(c.value.length),1)]),_:1})]),_:1},8,["loading"])])]),u("div",_l,[u("div",Cl,[e(Ye,{bordered:"",dense:""},{default:l(()=>[h.value.length>0?(_(!0),R(J,{key:0},G(h.value,(a,f)=>(_(),k(se,{key:f,class:"q-my-sm",dense:""},{default:l(()=>[e(A,{avatar:""},{default:l(()=>[e(Pe,{"text-color":"blue"},{default:l(()=>[y(I(f+1),1)]),_:2},1024)]),_:2},1024),e(A,null,{default:l(()=>[e(P,null,{default:l(()=>[e(L,{dense:"",filled:"",label:"Item Name",modelValue:a.item,"onUpdate:modelValue":m=>a.item=m,"use-input":"","input-debounce":"500",options:M.value,onFilter:t[15]||(t[15]=(m,F,j)=>H(m,F,j,"item")),behavior:"dialog","option-label":"MITM_ITMNM","option-value":"MITM_ITMNM","emit-value":"","map-options":"",loading:o.value},null,8,["modelValue","onUpdate:modelValue","options","loading"])]),_:2},1024)]),_:2},1024),i.value===1?(_(),k(A,{key:0},{default:l(()=>[e(P,null,{default:l(()=>[e(L,{dense:"",filled:"",label:"Usage",modelValue:a.usage,"onUpdate:modelValue":m=>a.usage=m,"use-input":"","input-debounce":"500",options:B.value,onFilter:t[16]||(t[16]=(m,F,j)=>H(m,F,j,"usage")),behavior:"dialog","option-label":"MUSAGE_DESCALL","option-value":"id","emit-value":"","map-options":"",loading:o.value},null,8,["modelValue","onUpdate:modelValue","options","loading"])]),_:2},1024)]),_:2},1024)):$("",!0),e(A,null,{default:l(()=>[e(P,null,{default:l(()=>[e(Q,{prefix:"Rp",dense:"",label:"Price",filled:"",modelValue:a.price,"onUpdate:modelValue":m=>a.price=m},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1024)]),_:2},1024),i.value===1?(_(),k(A,{key:1},{default:l(()=>[e(P,null,{default:l(()=>[e(Q,{dense:"",label:"Electricity",filled:"",modelValue:a.electric,"onUpdate:modelValue":m=>a.electric=m},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1024)]),_:2},1024)):$("",!0),i.value===2?(_(),k(A,{key:2},{default:l(()=>[e(P,null,{default:l(()=>[e(Q,{dense:"",label:"Qty",filled:"",modelValue:a.qty,"onUpdate:modelValue":m=>a.qty=m},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1024)]),_:2},1024)):$("",!0),e(A,{side:""},{default:l(()=>[e(C,{icon:"delete",color:"red",flat:"",onClick:m=>Te(f)},null,8,["onClick"])]),_:2},1024)]),_:2},1024))),128)):ne((_(),k(se,{key:1,class:"q-my-sm",clickable:""},{default:l(()=>[e(A,null,{default:l(()=>[e(P,null,{default:l(()=>[y(" No Items Added ")]),_:1})]),_:1})]),_:1})),[[Ne]])]),_:1})])])])]),_:1}),e(ve,{align:"right"},{default:l(()=>[e(C,{label:"OK",color:"primary",onClick:t[17]||(t[17]=a=>Ve()),disable:_e.value,loading:o.value},null,8,["disable","loading"]),e(C,{flat:"",label:"Cancel",color:"red",onClick:x(qe)},null,8,["onClick"])]),_:1})]),_:1})]),_:1},8,["onHide"]))}};const bl={class:"q-pa-md"},Tl={class:"row q-pb-md"},Ul=u("div",{class:"col"},[u("span",{class:"text-h4"},"Quotation ")],-1),hl={class:"col text-right"},yl={class:"row q-pt-md"},Ql={class:"col"},Yl={__name:"quotationView",setup(p){const T=Z(),g=d("TQUO_QUOCD"),V=d(""),o=d([]),b=d([{name:"TQUO_QUOCD",label:"Quot. Code",field:"TQUO_QUOCD",sortable:!0,align:"left"},{name:"TQUO_SBJCT",label:"Quot. Subject",field:"TQUO_SBJCT",sortable:!0,align:"left"},{name:"MCUS_CUSNM",label:"Customer Name",field:"MCUS_CUSNM",sortable:!0,align:"left"},{name:"TQUO_ATTN",label:"Customer Attn",field:"TQUO_ATTN",sortable:!0,align:"left"},{name:"TQUO_CUSCD",label:"Customer Code",field:"TQUO_CUSCD",sortable:!0,align:"left"},{name:"TQUO_ISSUDT",label:"Issue Date",field:"TQUO_ISSUDT",sortable:!0,align:"left"},{name:"TQUO_PROJECT_LOCATION",label:"Proj. Loc",field:"TQUO_PROJECT_LOCATION",sortable:!0,align:"left"}]),v=d(!1);K(()=>{U()});const U=async()=>{v.value=!0,await w.post("quotation/search",{searchBy:g.value,searchValue:V.value}).then(c=>{v.value=!1,o.value=c.data.data}).catch(c=>{v.value=!1})},S=()=>{T.dialog({component:ce}).onOk(async c=>{U()})},O=c=>{console.log(c),T.dialog({component:ce,componentProps:{quoHeader:c}}).onOk(async i=>{U()})},D=c=>{T.dialog({title:"Confirmation",message:"Are you sure want to delete this data ?",cancel:!0,persistent:!0}).onOk(async()=>{v.value=!0,await w.delete(`quotationNew/${btoa(c)}`).then(i=>{v.value=!1,U()})})},q=c=>{window.open("https://joss.jatpowerindo.co.id/PDF/quotation/"+btoa(c),"_blank").focus()};return(c,i)=>(_(),R("div",bl,[u("div",Tl,[Ul,u("div",hl,[e(C,{icon:"add",color:"blue",onClick:S},{default:l(()=>[e(N,null,{default:l(()=>[y("Create New Quotation")]),_:1})]),_:1})])]),e(Le),u("div",yl,[u("div",Ql,[e(ge,{title:"Created Quotation",rows:o.value,columns:b.value,"row-key":"name",loading:v.value,dense:"",pagination:{rowsPerPage:20},class:"my-sticky-header-column-table"},{"top-right":l(()=>[e(L,{outlined:"",modelValue:g.value,"onUpdate:modelValue":i[0]||(i[0]=n=>g.value=n),options:b.value,label:"Search Columns","option-value":"name","option-label":"label","emit-value":"",dense:"","map-options":""},null,8,["modelValue","options"]),e(Q,{borderless:"",dense:"",modelValue:V.value,"onUpdate:modelValue":[i[1]||(i[1]=n=>V.value=n),i[2]||(i[2]=n=>U())],placeholder:"Search",outlined:"",debounce:"1000"},{append:l(()=>[e(W,{name:"search"})]),_:1},8,["modelValue"])]),header:l(n=>[e(ue,{props:n},{default:l(()=>[e(ie,{"auto-width":""},{default:l(()=>[y("Action")]),_:1}),(_(!0),R(J,null,G(n.cols,r=>(_(),k(ie,{key:r.name,props:n},{default:l(()=>[y(I(r.label),1)]),_:2},1032,["props"]))),128))]),_:2},1032,["props"])]),body:l(n=>[e(ue,{props:n},{default:l(()=>[e(de,{"auto-width":""},{default:l(()=>[e(C,{flat:"",color:n.row.TQUO_APPRVDT!==null?"grey":"orange",icon:"edit",onClick:r=>O(n.row.TQUO_QUOCD),dense:"",disable:n.row.TQUO_APPRVDT!==null},{default:l(()=>[e(N,null,{default:l(()=>[y(I(n.row.TQUO_APPRVDT?"Quotation already approved, cannot edit !":"Edit this quotation"),1)]),_:2},1024)]),_:2},1032,["color","onClick","disable"]),e(C,{flat:"",color:n.row.TQUO_APPRVDT!==null?"grey":"red",icon:"delete",onClick:r=>D(n.row.TQUO_QUOCD),dense:"",disable:n.row.TQUO_APPRVDT!==null},{default:l(()=>[e(N,null,{default:l(()=>[y(I(n.row.TQUO_APPRVDT?"Quotation already approved, cannot delete !":"Delete this quotation"),1)]),_:2},1024)]),_:2},1032,["color","onClick","disable"]),e(C,{flat:"",color:"indigo",icon:"print",onClick:r=>q(n.row.TQUO_QUOCD),dense:""},{default:l(()=>[e(N,null,{default:l(()=>[y("Print this quotation")]),_:1})]),_:2},1032,["onClick"])]),_:2},1024),(_(!0),R(J,null,G(n.cols,r=>(_(),k(de,{key:r.name,props:n},{default:l(()=>[y(I(r.value),1)]),_:2},1032,["props"]))),128))]),_:2},1032,["props"])]),_:1},8,["rows","columns","loading"])])])]))}};export{Yl as default};
