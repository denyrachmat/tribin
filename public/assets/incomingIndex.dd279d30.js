import{Q as k}from"./QTooltip.9e55fdc9.js";import{t as c,o as H,C as _,D as I,E as o,F as l,M as ee,O as M,J as s,$ as S,an as x,U as L,Q as D,R as b,S as U,T as N,V as le,I as C,P as w,W as ae,X as oe,Z as te,aY as se}from"./index.fda21263.js";import{a as B,l as y,Q as ne,b as q,c as T,d as O,k as ie,m as A}from"./QTable.31f502b3.js";import{Q as $,a as E}from"./QTd.1c00856a.js";import{api_web as P}from"./axios.dcd0cb7f.js";import{Q as de,a as ue}from"./QInnerLoading.2bcd6a2b.js";import{Q as re,a as ce,C as pe}from"./ClosePopup.d5b4c646.js";import{Q as me}from"./QBtnToggle.1c785bc5.js";import"./use-render-cache.3aae9b27.js";import"./date.7b890563.js";import"./QBtnGroup.61035f64.js";const ve=s("div",{class:"text-h6"},"Create Incoming",-1),_e={style:{border:"1px black solid","border-radius":"10px"}},Ce=s("legend",{style:{"margin-left":"1em",padding:"0.2em 0.8em"}},[s("b",null,"Header")],-1),fe={class:"row q-col-gutter-md"},De={class:"col-12 col-sm-6"},Ve={class:"col-12 col-sm-6"},ge={class:"row items-center justify-end"},Te={class:"row q-col-gutter-md q-pt-md"},be={class:"col-12 col-sm-6"},Re={key:0,class:"col-12 col-sm-6"},he={key:1,class:"col-12 col-sm-6"},Oe={class:"row q-col-gutter-md q-pt-md"},Se={class:"col"},ye={class:"row q-py-md"},Pe={class:"col"},Ie={style:{border:"1px black solid","border-radius":"10px",height:"35vh",overflow:"auto"}},we=s("legend",{style:{"margin-left":"1em",padding:"0.2em 0.8em"}},[s("b",null,"List Of Items")],-1),Qe={class:"row q-pb-sm"},ke={class:"col text-right"},Ue={__name:"incomingCreate",props:{dataHeader:Array},setup(F){const Q=B(),i=c({TRCV_RCVCD:"",TRCV_SUPCD:"",TRCV_ISSUDT:"",INV_NO:"",PO_NO:"",TRCV_DOCNO:""}),V=c(1),p=c([]),n=c(!1),g=c([]),R=c([]),h=c([]),m=c([]);H(()=>{d("")});const u=(t,a,e,r)=>{a(async()=>{r==="cust"&&f(t),r==="item"&&await d(t),r==="po"&&await Y(t),r==="inv"&&await z(t)})},d=async t=>{n.value=!0,await P.post("item/searchAPI",{searchValue:t,isITMCD:1}).then(a=>{n.value=!1,h.value=a.data.data}).catch(()=>{n.value=!1})},f=async(t,a="MSUP_SUPNM")=>{n.value=!0,await P.post("supplier/searchAPI",{searchValue:t,searchCol:a}).then(e=>{n.value=!1,g.value=e.data.data}).catch(()=>{n.value=!1})},Y=async(t,a="TPCHORD_PCHCD")=>{n.value=!0,await P.post("purchase-order/searchApprovedPO",{searchValue:t,searchCol:a}).then(e=>{n.value=!1,R.value=e.data.data}).catch(()=>{n.value=!1})},J=t=>{Q.dialog({title:"Confirmation",message:`Do you want to delete this lines no ${t+1} ?`,cancel:!0,persistent:!0}).onOk(async()=>{p.value.splice(t,1)})},j=()=>{p.value.push({item_code:"",quantity:"",unit_price:""})},z=async(t,a="TDLVORD_DLVCD")=>{n.value=!0,await P.post("invoices/search",{searchBy:a,searchValue:t}).then(e=>{n.value=!1,m.value=e.data.data}).catch(e=>{n.value=!1})},G=t=>{let a=R.value.filter(e=>e.TPCHORD_PCHCD==t);console.log([t,a]),a.length>0&&a[0].det.map(e=>{p.value.push({item_code:e.TPCHORDDETA_ITMCD,quantity:e.TPCHORDDETA_ITMQT,unit_price:e.TPCHORDDETA_ITMPRC_PER})})},K=t=>{let a=m.value.filter(e=>e.TDLVORD_DLVCD==t);console.log([t,a]),a.length>0&&(a[0].dlvacc.map(e=>{p.value.push({item_code:e.TDLVACCESSORY_ITMCD,quantity:e.TDLVACCESSORY_ITMQT,unit_price:0})}),a[0].dlvdet.map(e=>{p.value.push({item_code:e.TDLVORDDETA_ITMCD,quantity:e.TDLVORDDETA_ITMQT,unit_price:e.TDLVORDDETA_PRC})}))},W=()=>{};return(t,a)=>(_(),I(te,{ref:"dialogRef",onHide:t.onDialogHide,"transition-show":"slide-up","transition-hide":"slide-down","full-width":"",persistent:""},{default:o(()=>[l(ee,{class:"q-dialog-plugin bg-white q-pa-sm"},{default:o(()=>[l(M,null,{default:o(()=>[ve]),_:1}),l(M,{class:"q-pa-sm"},{default:o(()=>[s("fieldset",_e,[Ce,l(de,{showing:n.value,dark:""},{default:o(()=>[l(ue,{size:"50px",color:"primary"})]),_:1},8,["showing"]),s("div",fe,[s("div",De,[l(S,{label:"Code",readonly:"",dense:"",filled:"",modelValue:i.value.TRCV_RCVCD,"onUpdate:modelValue":a[0]||(a[0]=e=>i.value.TRCV_RCVCD=e)},null,8,["modelValue"])]),s("div",Ve,[l(S,{filled:"",modelValue:i.value.TRCV_ISSUDT,"onUpdate:modelValue":a[2]||(a[2]=e=>i.value.TRCV_ISSUDT=e),dense:"",label:"Receive Date"},{append:o(()=>[l(x,{name:"event",class:"cursor-pointer"},{default:o(()=>[l(re,{cover:"","transition-show":"scale","transition-hide":"scale"},{default:o(()=>[l(ce,{modelValue:i.value.TRCV_ISSUDT,"onUpdate:modelValue":a[1]||(a[1]=e=>i.value.TRCV_ISSUDT=e),mask:"YYYY-MM-DD"},{default:o(()=>[s("div",ge,[L(l(D,{label:"Close",color:"primary",flat:""},null,512),[[pe]])])]),_:1},8,["modelValue"])]),_:1})]),_:1})]),_:1},8,["modelValue"])])]),s("div",Te,[s("div",be,[l(y,{dense:"",filled:"",label:"Supplier Name",modelValue:i.value.TRCV_SUPCD,"onUpdate:modelValue":a[3]||(a[3]=e=>i.value.TRCV_SUPCD=e),"use-input":"","input-debounce":"500",options:g.value,onFilter:a[4]||(a[4]=(e,r,v)=>u(e,r,v,"cust")),behavior:"dialog","option-label":"MSUP_SUPNM","option-value":"MSUP_SUPCD","emit-value":"","map-options":"",loading:n.value,disable:i.value.TRCV_RCVCD!==""||V.value==1},null,8,["modelValue","options","loading","disable"])]),V.value==1?(_(),b("div",Re,[l(y,{dense:"",filled:"",label:"PO Number",modelValue:i.value.PO_NO,"onUpdate:modelValue":[a[5]||(a[5]=e=>i.value.PO_NO=e),a[7]||(a[7]=e=>G(e))],"use-input":"","input-debounce":"500",options:R.value,onFilter:a[6]||(a[6]=(e,r,v)=>u(e,r,v,"po")),behavior:"dialog","option-label":"PO_CUSTDESC","option-value":"TPCHORD_PCHCD","emit-value":"","map-options":"",loading:n.value,disable:i.value.TRCV_RCVCD!==""},null,8,["modelValue","options","loading","disable"])])):(_(),b("div",he,[l(y,{dense:"",filled:"",label:"JAT Invoice No",modelValue:i.value.INV_NO,"onUpdate:modelValue":[a[8]||(a[8]=e=>i.value.INV_NO=e),a[10]||(a[10]=e=>K(e))],"use-input":"","input-debounce":"500",options:m.value,onFilter:a[9]||(a[9]=(e,r,v)=>u(e,r,v,"inv")),behavior:"dialog","option-label":"LABEL","option-value":"TDLVORD_DLVCD","emit-value":"","map-options":"",loading:n.value,disable:i.value.TRCV_RCVCD!==""},null,8,["modelValue","options","loading","disable"])]))]),s("div",Oe,[s("div",Se,[l(S,{label:"Doc Supplier No",dense:"",filled:"",modelValue:i.value.TRCV_DOCNO,"onUpdate:modelValue":a[11]||(a[11]=e=>i.value.TRCV_DOCNO=e)},null,8,["modelValue"])])])]),s("div",ye,[s("div",Pe,[l(me,{modelValue:V.value,"onUpdate:modelValue":a[12]||(a[12]=e=>V.value=e),spread:"","no-caps":"","toggle-color":"purple",color:"white","text-color":"black",options:[{label:"From PO",value:1},{label:"Return",value:2}],disable:i.value.TRCV_RCVCD!==""},null,8,["modelValue","disable"])])]),s("fieldset",Ie,[we,s("div",Qe,[s("div",ke,[l(D,{flat:"",icon:"add",color:"blue",label:"Add Lines",onClick:j,loading:n.value},null,8,["loading"])])]),l(ne,{bordered:"",dense:""},{default:o(()=>[p.value.length>0?(_(!0),b(U,{key:0},N(p.value,(e,r)=>(_(),I(q,{key:r,class:"q-my-sm",dense:"",loading:n.value},{default:o(()=>[l(T,{avatar:""},{default:o(()=>[l(le,{"text-color":"blue"},{default:o(()=>[C(w(r+1),1)]),_:2},1024)]),_:2},1024),l(T,null,{default:o(()=>[l(O,null,{default:o(()=>[l(y,{dense:"",filled:"",label:"Item Code",modelValue:e.item_code,"onUpdate:modelValue":v=>e.item_code=v,"use-input":"","input-debounce":"500",options:h.value,onFilter:a[13]||(a[13]=(v,X,Z)=>u(v,X,Z,"item")),behavior:"dialog","option-label":"MITM_ITMNM","option-value":"MITM_ITMCD","emit-value":"","map-options":"",loading:n.value,disable:i.value.TRCV_RCVCD!==""},null,8,["modelValue","onUpdate:modelValue","options","loading","disable"])]),_:2},1024)]),_:2},1024),l(T,null,{default:o(()=>[l(O,null,{default:o(()=>[l(S,{dense:"",label:"Qty",filled:"",modelValue:e.quantity,"onUpdate:modelValue":v=>e.quantity=v},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1024)]),_:2},1024),l(T,null,{default:o(()=>[l(O,null,{default:o(()=>[C(" Rp. "+w(e.unit_price.toLocaleString()),1)]),_:2},1024),l(O,{caption:""},{default:o(()=>[C(" Price ")]),_:1})]),_:2},1024),l(T,{side:""},{default:o(()=>[l(D,{icon:"delete",color:"red",flat:"",onClick:v=>J(r)},null,8,["onClick"])]),_:2},1024)]),_:2},1032,["loading"]))),128)):L((_(),I(q,{key:1,class:"q-my-sm",clickable:""},{default:o(()=>[l(T,null,{default:o(()=>[l(O,null,{default:o(()=>[C(" Choose sales order first to access item list ")]),_:1})]),_:1})]),_:1})),[[ae]])]),_:1})])]),_:1}),l(oe,{align:"right"},{default:o(()=>[l(D,{label:"OK",color:"primary",onClick:a[14]||(a[14]=e=>W()),disable:t.stateSubmit,loading:n.value},null,8,["disable","loading"]),l(D,{flat:"",label:"Cancel",color:"red",onClick:t.onDialogCancel},null,8,["onClick"])]),_:1})]),_:1})]),_:1},8,["onHide"]))}},Ne={class:"q-pa-md"},Me={class:"row q-pb-md"},Le=s("div",{class:"col"},[s("span",{class:"text-h4"},"Incoming")],-1),qe={class:"col text-right"},Ae={class:"row q-pt-md"},$e={class:"col"},We={__name:"incomingIndex",setup(F){const Q=B(),i=c([]),V=c([{name:"TRCV_RCVCD",label:"Receive ID",field:"TRCV_RCVCD",sortable:!0,align:"left"},{name:"MSUP_SUPNM",label:"Supplier Name",field:"MSUP_SUPNM",sortable:!0,align:"left"},{name:"TOT_RCV",label:"Total Qty",field:"TOT_RCV",sortable:!0,align:"left"},{name:"TOT_AMT",label:"Total Amount",field:"TOT_AMT",sortable:!0,align:"left"}]),p=c(!1),n=c(""),g=c("");H(()=>{R()});const R=async()=>{p.value=!0,await P.post("receive/searchAPI",{searchBy:n.value,searchValue:g.value}).then(m=>{p.value=!1,i.value=m.data.data}).catch(m=>{p.value=!1})},h=(m=[])=>{Q.dialog({component:Ue,componentProps:{dataHeader:m}}).onOk(async u=>{getOutgoingData()})};return(m,u)=>(_(),b("div",Ne,[s("div",Me,[Le,s("div",qe,[l(D,{icon:"add",color:"blue",onClick:u[0]||(u[0]=d=>h())},{default:o(()=>[l(k,null,{default:o(()=>[C("Create New Delivery")]),_:1})]),_:1})])]),l(se),s("div",Ae,[s("div",$e,[l(ie,{title:"Outgoing List",rows:i.value,columns:V.value,"row-key":"TDLVORD_DLVCD",loading:p.value,dense:"",pagination:{rowsPerPage:20},class:"my-sticky-header-column-table"},{"top-right":o(()=>[l(y,{outlined:"",modelValue:n.value,"onUpdate:modelValue":u[1]||(u[1]=d=>n.value=d),options:m.columns,label:"Search Columns","option-value":"name","option-label":"label","emit-value":"",dense:"","map-options":""},null,8,["modelValue","options"]),l(S,{borderless:"",dense:"",modelValue:g.value,"onUpdate:modelValue":[u[2]||(u[2]=d=>g.value=d),u[3]||(u[3]=d=>m.getOutgoingData())],placeholder:"Search",outlined:"",debounce:"1000"},{append:o(()=>[l(x,{name:"search"})]),_:1},8,["modelValue"])]),header:o(d=>[l($,{props:d},{default:o(()=>[(_(!0),b(U,null,N(d.cols,f=>(_(),I(A,{key:f.name,props:d},{default:o(()=>[C(w(f.label),1)]),_:2},1032,["props"]))),128)),l(A,{"auto-width":""},{default:o(()=>[C("Action")]),_:1})]),_:2},1032,["props"])]),body:o(d=>[l($,{props:d},{default:o(()=>[(_(!0),b(U,null,N(d.cols,f=>(_(),I(E,{key:f.name,props:d},{default:o(()=>[C(w(f.value),1)]),_:2},1032,["props"]))),128)),l(E,{"auto-width":""},{default:o(()=>[l(D,{flat:"",color:"orange",icon:"edit",onClick:f=>h(d.row),dense:""},{default:o(()=>[l(k,null,{default:o(()=>[C("Edit Data")]),_:1})]),_:2},1032,["onClick"]),l(D,{flat:"",color:"red",icon:"delete",onClick:f=>m.onDelete(d.row.TDLVORD_DLVCD),dense:""},{default:o(()=>[l(k,null,{default:o(()=>[C("Edit Data")]),_:1})]),_:2},1032,["onClick"])]),_:2},1024)]),_:2},1032,["props"])]),_:1},8,["rows","columns","loading"])])])]))}};export{We as default};
