import{Q}from"./QTooltip.d749d768.js";import{t as c,C,D as y,E as l,F as e,M as E,O as N,J as o,$ as T,an as H,U as q,Q as h,R as w,S as I,T as k,V as Y,I as _,P,W as j,Z as z,o as G,aY as J}from"./index.213aa8b8.js";import{a as B,l as M,Q as W,b as $,c as V,d as b,k as Z,m as L}from"./QTable.ccca1780.js";import{Q as x,a as A}from"./QTd.50a52e48.js";import{api_web as O}from"./axios.9a876490.js";import{Q as K,a as X}from"./QInnerLoading.9c336aa4.js";import{Q as ee,a as le,C as ae}from"./ClosePopup.e44f025c.js";import{Q as oe}from"./QBtnToggle.be5bc6ed.js";import"./use-render-cache.3aae9b27.js";import"./date.a1ef5de9.js";import"./QBtnGroup.06c252f8.js";const te=o("div",{class:"text-h6"},"Create Incoming",-1),se={style:{border:"1px black solid","border-radius":"10px"}},ne=o("legend",{style:{"margin-left":"1em",padding:"0.2em 0.8em"}},[o("b",null,"Header")],-1),de={class:"row q-col-gutter-sm"},ie={class:"col-12 col-sm-6"},ue={class:"col-12 col-sm-6"},re={class:"row items-center justify-end"},ce={class:"row q-col-gutter-sm"},me={class:"col-12 col-sm-6"},pe={class:"col-12 col-sm-6"},_e={class:"row q-py-md"},fe={class:"col"},ve={style:{border:"1px black solid","border-radius":"10px",height:"35vh",overflow:"auto"}},Ce=o("legend",{style:{"margin-left":"1em",padding:"0.2em 0.8em"}},[o("b",null,"List Of Items")],-1),Ve={class:"row q-pb-sm"},ge={class:"col text-right"},be={__name:"incomingCreate",props:{dataHeader:Array},setup(F){const U=B(),n=c({TRCV_RCVCD:"",TRCV_SUPCD:"",TRCV_ISSUDT:""}),S=c(1),f=c([]),d=c(!1),g=c([]),R=c([]),D=(i,t,a,r)=>{t(async()=>{r==="cust"&&m(i),r==="item"&&await getItem(i),r==="po"&&await u(i)})},m=async(i,t="MSUP_SUPNM")=>{d.value=!0,await O.post("supplier/searchAPI",{searchValue:i,searchCol:t}).then(a=>{d.value=!1,g.value=a.data.data}).catch(()=>{d.value=!1})},u=async(i,t="TPCHORD_PCHCD")=>{d.value=!0,await O.post("purchase-order/searchApprovedPO",{searchValue:i,searchCol:t}).then(a=>{d.value=!1,R.value=a.data.data}).catch(()=>{d.value=!1})},s=i=>{U.dialog({title:"Confirmation",message:`Do you want to delete this lines no ${i+1} ?`,cancel:!0,persistent:!0}).onOk(async()=>{f.value.splice(i,1)})},v=()=>{f.value.push({item_code:"",MITM_ITMNM:"",quantity:"",unit_price:""})};return(i,t)=>(C(),y(z,{ref:"dialogRef",onHide:i.onDialogHide,"transition-show":"slide-up","transition-hide":"slide-down","full-width":"",persistent:""},{default:l(()=>[e(E,{class:"q-dialog-plugin bg-white q-pa-sm"},{default:l(()=>[e(N,null,{default:l(()=>[te]),_:1}),e(N,{class:"q-pa-sm"},{default:l(()=>[o("fieldset",se,[ne,e(K,{showing:d.value,dark:""},{default:l(()=>[e(X,{size:"50px",color:"primary"})]),_:1},8,["showing"]),o("div",de,[o("div",ie,[e(T,{label:"Code",readonly:"",dense:"",filled:"",modelValue:n.value.TRCV_RCVCD,"onUpdate:modelValue":t[0]||(t[0]=a=>n.value.TRCV_RCVCD=a)},null,8,["modelValue"])]),o("div",ue,[e(T,{filled:"",modelValue:n.value.TRCV_ISSUDT,"onUpdate:modelValue":t[2]||(t[2]=a=>n.value.TRCV_ISSUDT=a),dense:"",label:"Receive Date"},{append:l(()=>[e(H,{name:"event",class:"cursor-pointer"},{default:l(()=>[e(ee,{cover:"","transition-show":"scale","transition-hide":"scale"},{default:l(()=>[e(le,{modelValue:n.value.TRCV_ISSUDT,"onUpdate:modelValue":t[1]||(t[1]=a=>n.value.TRCV_ISSUDT=a),mask:"YYYY-MM-DD"},{default:l(()=>[o("div",re,[q(e(h,{label:"Close",color:"primary",flat:""},null,512),[[ae]])])]),_:1},8,["modelValue"])]),_:1})]),_:1})]),_:1},8,["modelValue"])])]),o("div",ce,[o("div",me,[e(M,{dense:"",filled:"",label:"Supplier Name",modelValue:n.value.TRCV_SUPCD,"onUpdate:modelValue":t[3]||(t[3]=a=>n.value.TRCV_SUPCD=a),"use-input":"","input-debounce":"500",options:g.value,onFilter:t[4]||(t[4]=(a,r,p)=>D(a,r,p,"cust")),behavior:"dialog","option-label":"MSUP_SUPNM","option-value":"MSUP_SUPCD","emit-value":"","map-options":"",loading:d.value,disable:n.value.TRCV_RCVCD!==""},null,8,["modelValue","options","loading","disable"])]),o("div",pe,[e(M,{dense:"",filled:"",label:"PO Number",modelValue:n.value.PO_NO,"onUpdate:modelValue":t[5]||(t[5]=a=>n.value.PO_NO=a),"use-input":"","input-debounce":"500",options:R.value,onFilter:t[6]||(t[6]=(a,r,p)=>D(a,r,p,"po")),behavior:"dialog","option-label":"PO_CUSTDESC","option-value":"TPCHORD_PCHCD","emit-value":"","map-options":"",loading:d.value,disable:n.value.TRCV_RCVCD!==""},null,8,["modelValue","options","loading","disable"])])])]),o("div",_e,[o("div",fe,[e(oe,{modelValue:S.value,"onUpdate:modelValue":t[7]||(t[7]=a=>S.value=a),spread:"","no-caps":"","toggle-color":"purple",color:"white","text-color":"black",options:[{label:"From PO",value:1},{label:"Return",value:2}],disable:n.value.TRCV_RCVCD!==""},null,8,["modelValue","disable"])])]),o("fieldset",ve,[Ce,o("div",Ve,[o("div",ge,[e(h,{flat:"",icon:"add",color:"blue",label:"Add Lines",onClick:v,loading:d.value},null,8,["loading"])])]),e(W,{bordered:"",dense:""},{default:l(()=>[f.value.length>0?(C(!0),w(I,{key:0},k(f.value,(a,r)=>(C(),y($,{key:r,class:"q-my-sm",dense:"",loading:d.value},{default:l(()=>[e(V,{avatar:""},{default:l(()=>[e(Y,{"text-color":"blue"},{default:l(()=>[_(P(r+1),1)]),_:2},1024)]),_:2},1024),e(V,null,{default:l(()=>[e(b,null,{default:l(()=>[e(T,{dense:"",label:"Item Code",filled:"",modelValue:a.item_code,"onUpdate:modelValue":p=>a.item_code=p,readonly:""},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1024)]),_:2},1024),e(V,null,{default:l(()=>[e(b,null,{default:l(()=>[e(T,{dense:"",label:"Item Name",filled:"",modelValue:a.MITM_ITMNM,"onUpdate:modelValue":p=>a.MITM_ITMNM=p,readonly:""},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1024)]),_:2},1024),e(V,null,{default:l(()=>[e(b,null,{default:l(()=>[e(T,{dense:"",label:"Qty",filled:"",modelValue:a.quantity,"onUpdate:modelValue":p=>a.quantity=p},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1024)]),_:2},1024),e(V,null,{default:l(()=>[e(b,null,{default:l(()=>[_(" Rp. "+P(a.unit_price.toLocaleString()),1)]),_:2},1024),e(b,{caption:""},{default:l(()=>[_(" Price ")]),_:1})]),_:2},1024),e(V,{side:""},{default:l(()=>[e(h,{icon:"delete",color:"red",flat:"",onClick:p=>s(r)},null,8,["onClick"])]),_:2},1024)]),_:2},1032,["loading"]))),128)):q((C(),y($,{key:1,class:"q-my-sm",clickable:""},{default:l(()=>[e(V,null,{default:l(()=>[e(b,null,{default:l(()=>[_(" Choose sales order first to access item list ")]),_:1})]),_:1})]),_:1})),[[j]])]),_:1})])]),_:1})]),_:1})]),_:1},8,["onHide"]))}},Te={class:"q-pa-md"},he={class:"row q-pb-md"},De=o("div",{class:"col"},[o("span",{class:"text-h4"},"Incoming")],-1),ye={class:"col text-right"},Se={class:"row q-pt-md"},Re={class:"col"},Le={__name:"incomingIndex",setup(F){const U=B(),n=c([]),S=c([{name:"TRCV_RCVCD",label:"Receive ID",field:"TRCV_RCVCD",sortable:!0,align:"left"},{name:"MSUP_SUPNM",label:"Supplier Name",field:"MSUP_SUPNM",sortable:!0,align:"left"},{name:"TOT_RCV",label:"Total Qty",field:"TOT_RCV",sortable:!0,align:"left"},{name:"TOT_AMT",label:"Total Amount",field:"TOT_AMT",sortable:!0,align:"left"}]),f=c(!1),d=c(""),g=c("");G(()=>{R()});const R=async()=>{f.value=!0,await O.post("receive/searchAPI",{searchBy:d.value,searchValue:g.value}).then(m=>{f.value=!1,n.value=m.data.data}).catch(m=>{f.value=!1})},D=(m=[])=>{U.dialog({component:be,componentProps:{dataHeader:m}}).onOk(async u=>{getOutgoingData()})};return(m,u)=>(C(),w("div",Te,[o("div",he,[De,o("div",ye,[e(h,{icon:"add",color:"blue",onClick:u[0]||(u[0]=s=>D())},{default:l(()=>[e(Q,null,{default:l(()=>[_("Create New Delivery")]),_:1})]),_:1})])]),e(J),o("div",Se,[o("div",Re,[e(Z,{title:"Outgoing List",rows:n.value,columns:S.value,"row-key":"TDLVORD_DLVCD",loading:f.value,dense:"",pagination:{rowsPerPage:20},class:"my-sticky-header-column-table"},{"top-right":l(()=>[e(M,{outlined:"",modelValue:d.value,"onUpdate:modelValue":u[1]||(u[1]=s=>d.value=s),options:m.columns,label:"Search Columns","option-value":"name","option-label":"label","emit-value":"",dense:"","map-options":""},null,8,["modelValue","options"]),e(T,{borderless:"",dense:"",modelValue:g.value,"onUpdate:modelValue":[u[2]||(u[2]=s=>g.value=s),u[3]||(u[3]=s=>m.getOutgoingData())],placeholder:"Search",outlined:"",debounce:"1000"},{append:l(()=>[e(H,{name:"search"})]),_:1},8,["modelValue"])]),header:l(s=>[e(x,{props:s},{default:l(()=>[(C(!0),w(I,null,k(s.cols,v=>(C(),y(L,{key:v.name,props:s},{default:l(()=>[_(P(v.label),1)]),_:2},1032,["props"]))),128)),e(L,{"auto-width":""},{default:l(()=>[_("Action")]),_:1})]),_:2},1032,["props"])]),body:l(s=>[e(x,{props:s},{default:l(()=>[(C(!0),w(I,null,k(s.cols,v=>(C(),y(A,{key:v.name,props:s},{default:l(()=>[_(P(v.value),1)]),_:2},1032,["props"]))),128)),e(A,{"auto-width":""},{default:l(()=>[e(h,{flat:"",color:"orange",icon:"edit",onClick:v=>D(s.row),dense:""},{default:l(()=>[e(Q,null,{default:l(()=>[_("Edit Data")]),_:1})]),_:2},1032,["onClick"]),e(h,{flat:"",color:"red",icon:"delete",onClick:v=>m.onDelete(s.row.TDLVORD_DLVCD),dense:""},{default:l(()=>[e(Q,null,{default:l(()=>[_("Edit Data")]),_:1})]),_:2},1032,["onClick"])]),_:2},1024)]),_:2},1032,["props"])]),_:1},8,["rows","columns","loading"])])])]))}};export{Le as default};
