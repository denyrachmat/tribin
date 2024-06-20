import{Q as k}from"./QTooltip.8f9ce0a3.js";import{t as p,C as v,D as w,E as l,F as e,M as W,O as N,J as t,$ as h,an as x,U as q,Q as V,R,S as M,T as Q,V as X,I as _,P,W as Z,X as ee,Z as le,o as ae,aY as oe}from"./index.bdcbf589.js";import{a as B,l as I,Q as te,b as L,c as g,d as T,k as se,m as $}from"./QTable.b2c29ce4.js";import{Q as A,a as H}from"./QTd.b92ad338.js";import{api_web as S}from"./axios.785d3031.js";import{Q as ne,a as ie}from"./QInnerLoading.d6e014ee.js";import{Q as de,a as ue,C as re}from"./ClosePopup.f3f8ad39.js";import{Q as ce}from"./QBtnToggle.5886e847.js";import"./use-render-cache.3aae9b27.js";import"./date.23876fd6.js";import"./QBtnGroup.e401bc80.js";const pe=t("div",{class:"text-h6"},"Create Incoming",-1),me={style:{border:"1px black solid","border-radius":"10px"}},ve=t("legend",{style:{"margin-left":"1em",padding:"0.2em 0.8em"}},[t("b",null,"Header")],-1),_e={class:"row q-col-gutter-md"},fe={class:"col-12 col-sm-6"},Ce={class:"col-12 col-sm-6"},Ve={class:"row items-center justify-end"},ge={class:"row q-col-gutter-md q-pt-md"},be={class:"col-12 col-sm-6"},De={key:0,class:"col-12 col-sm-6"},Te={key:1,class:"col-12 col-sm-6"},he={class:"row q-col-gutter-md q-pt-md"},Re={class:"col"},ye={class:"row q-py-md"},Ie={class:"col"},Se={style:{border:"1px black solid","border-radius":"10px",height:"35vh",overflow:"auto"}},we=t("legend",{style:{"margin-left":"1em",padding:"0.2em 0.8em"}},[t("b",null,"List Of Items")],-1),Oe={class:"row q-pb-sm"},Pe={class:"col text-right"},Ue={__name:"incomingCreate",props:{dataHeader:Array},setup(F){const U=B(),n=p({TRCV_RCVCD:"",TRCV_SUPCD:"",TRCV_ISSUDT:"",INV_NO:"",PO_NO:"",TRCV_DOCNO:""}),b=p(1),f=p([]),s=p(!1),D=p([]),O=p([]),y=p([]),m=p([]),u=(i,o,a,r)=>{o(async()=>{r==="cust"&&C(i),r==="item"&&await d(i),r==="po"&&await E(i),r==="inv"&&await j(i)})},d=async i=>{s.value=!0,await S.post("item/searchAPI",{searchValue:i}).then(o=>{s.value=!1,y.value=o.data.data}).catch(()=>{s.value=!1})},C=async(i,o="MSUP_SUPNM")=>{s.value=!0,await S.post("supplier/searchAPI",{searchValue:i,searchCol:o}).then(a=>{s.value=!1,D.value=a.data.data}).catch(()=>{s.value=!1})},E=async(i,o="TPCHORD_PCHCD")=>{s.value=!0,await S.post("purchase-order/searchApprovedPO",{searchValue:i,searchCol:o}).then(a=>{s.value=!1,O.value=a.data.data}).catch(()=>{s.value=!1})},Y=i=>{U.dialog({title:"Confirmation",message:`Do you want to delete this lines no ${i+1} ?`,cancel:!0,persistent:!0}).onOk(async()=>{f.value.splice(i,1)})},J=()=>{f.value.push({item_code:"",MITM_ITMNM:"",quantity:"",unit_price:""})},j=async(i,o="TDLVORD_DLVCD")=>{s.value=!0,await S.post("invoices/search",{searchBy:o,searchValue:i}).then(a=>{s.value=!1,m.value=a.data.data}).catch(a=>{s.value=!1})},z=()=>{};return(i,o)=>(v(),w(le,{ref:"dialogRef",onHide:i.onDialogHide,"transition-show":"slide-up","transition-hide":"slide-down","full-width":"",persistent:""},{default:l(()=>[e(W,{class:"q-dialog-plugin bg-white q-pa-sm"},{default:l(()=>[e(N,null,{default:l(()=>[pe]),_:1}),e(N,{class:"q-pa-sm"},{default:l(()=>[t("fieldset",me,[ve,e(ne,{showing:s.value,dark:""},{default:l(()=>[e(ie,{size:"50px",color:"primary"})]),_:1},8,["showing"]),t("div",_e,[t("div",fe,[e(h,{label:"Code",readonly:"",dense:"",filled:"",modelValue:n.value.TRCV_RCVCD,"onUpdate:modelValue":o[0]||(o[0]=a=>n.value.TRCV_RCVCD=a)},null,8,["modelValue"])]),t("div",Ce,[e(h,{filled:"",modelValue:n.value.TRCV_ISSUDT,"onUpdate:modelValue":o[2]||(o[2]=a=>n.value.TRCV_ISSUDT=a),dense:"",label:"Receive Date"},{append:l(()=>[e(x,{name:"event",class:"cursor-pointer"},{default:l(()=>[e(de,{cover:"","transition-show":"scale","transition-hide":"scale"},{default:l(()=>[e(ue,{modelValue:n.value.TRCV_ISSUDT,"onUpdate:modelValue":o[1]||(o[1]=a=>n.value.TRCV_ISSUDT=a),mask:"YYYY-MM-DD"},{default:l(()=>[t("div",Ve,[q(e(V,{label:"Close",color:"primary",flat:""},null,512),[[re]])])]),_:1},8,["modelValue"])]),_:1})]),_:1})]),_:1},8,["modelValue"])])]),t("div",ge,[t("div",be,[e(I,{dense:"",filled:"",label:"Supplier Name",modelValue:n.value.TRCV_SUPCD,"onUpdate:modelValue":o[3]||(o[3]=a=>n.value.TRCV_SUPCD=a),"use-input":"","input-debounce":"500",options:D.value,onFilter:o[4]||(o[4]=(a,r,c)=>u(a,r,c,"cust")),behavior:"dialog","option-label":"MSUP_SUPNM","option-value":"MSUP_SUPCD","emit-value":"","map-options":"",loading:s.value,disable:n.value.TRCV_RCVCD!==""||b.value==1},null,8,["modelValue","options","loading","disable"])]),b.value==1?(v(),R("div",De,[e(I,{dense:"",filled:"",label:"PO Number",modelValue:n.value.PO_NO,"onUpdate:modelValue":o[5]||(o[5]=a=>n.value.PO_NO=a),"use-input":"","input-debounce":"500",options:O.value,onFilter:o[6]||(o[6]=(a,r,c)=>u(a,r,c,"po")),behavior:"dialog","option-label":"PO_CUSTDESC","option-value":"TPCHORD_PCHCD","emit-value":"","map-options":"",loading:s.value,disable:n.value.TRCV_RCVCD!==""},null,8,["modelValue","options","loading","disable"])])):(v(),R("div",Te,[e(I,{dense:"",filled:"",label:"JAT Invoice No",modelValue:n.value.INV_NO,"onUpdate:modelValue":o[7]||(o[7]=a=>n.value.INV_NO=a),"use-input":"","input-debounce":"500",options:m.value,onFilter:o[8]||(o[8]=(a,r,c)=>u(a,r,c,"inv")),behavior:"dialog","option-label":"LABEL","option-value":"TDLVORD_DLVCD","emit-value":"","map-options":"",loading:s.value,disable:n.value.TRCV_RCVCD!==""},null,8,["modelValue","options","loading","disable"])]))]),t("div",he,[t("div",Re,[e(h,{label:"Doc Supplier No",dense:"",filled:"",modelValue:n.value.TRCV_DOCNO,"onUpdate:modelValue":o[9]||(o[9]=a=>n.value.TRCV_DOCNO=a)},null,8,["modelValue"])])])]),t("div",ye,[t("div",Ie,[e(ce,{modelValue:b.value,"onUpdate:modelValue":o[10]||(o[10]=a=>b.value=a),spread:"","no-caps":"","toggle-color":"purple",color:"white","text-color":"black",options:[{label:"From PO",value:1},{label:"Return",value:2}],disable:n.value.TRCV_RCVCD!==""},null,8,["modelValue","disable"])])]),t("fieldset",Se,[we,t("div",Oe,[t("div",Pe,[e(V,{flat:"",icon:"add",color:"blue",label:"Add Lines",onClick:J,loading:s.value},null,8,["loading"])])]),e(te,{bordered:"",dense:""},{default:l(()=>[f.value.length>0?(v(!0),R(M,{key:0},Q(f.value,(a,r)=>(v(),w(L,{key:r,class:"q-my-sm",dense:"",loading:s.value},{default:l(()=>[e(g,{avatar:""},{default:l(()=>[e(X,{"text-color":"blue"},{default:l(()=>[_(P(r+1),1)]),_:2},1024)]),_:2},1024),e(g,null,{default:l(()=>[e(T,null,{default:l(()=>[e(I,{dense:"",filled:"",label:"Item Code",modelValue:a.item_code,"onUpdate:modelValue":c=>a.item_code=c,"use-input":"","input-debounce":"500",options:y.value,onFilter:o[11]||(o[11]=(c,G,K)=>u(c,G,K,"item")),behavior:"dialog","option-label":"MITM_ITMNM","option-value":"MITM_ITMCD","emit-value":"","map-options":"",loading:s.value,disable:n.value.TRCV_RCVCD!==""},null,8,["modelValue","onUpdate:modelValue","options","loading","disable"])]),_:2},1024)]),_:2},1024),e(g,null,{default:l(()=>[e(T,null,{default:l(()=>[e(h,{dense:"",label:"Item Name",filled:"",modelValue:a.MITM_ITMNM,"onUpdate:modelValue":c=>a.MITM_ITMNM=c,readonly:""},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1024)]),_:2},1024),e(g,null,{default:l(()=>[e(T,null,{default:l(()=>[e(h,{dense:"",label:"Qty",filled:"",modelValue:a.quantity,"onUpdate:modelValue":c=>a.quantity=c},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1024)]),_:2},1024),e(g,null,{default:l(()=>[e(T,null,{default:l(()=>[_(" Rp. "+P(a.unit_price.toLocaleString()),1)]),_:2},1024),e(T,{caption:""},{default:l(()=>[_(" Price ")]),_:1})]),_:2},1024),e(g,{side:""},{default:l(()=>[e(V,{icon:"delete",color:"red",flat:"",onClick:c=>Y(r)},null,8,["onClick"])]),_:2},1024)]),_:2},1032,["loading"]))),128)):q((v(),w(L,{key:1,class:"q-my-sm",clickable:""},{default:l(()=>[e(g,null,{default:l(()=>[e(T,null,{default:l(()=>[_(" Choose sales order first to access item list ")]),_:1})]),_:1})]),_:1})),[[Z]])]),_:1})])]),_:1}),e(ee,{align:"right"},{default:l(()=>[e(V,{label:"OK",color:"primary",onClick:o[12]||(o[12]=a=>z()),disable:i.stateSubmit,loading:s.value},null,8,["disable","loading"]),e(V,{flat:"",label:"Cancel",color:"red",onClick:i.onDialogCancel},null,8,["onClick"])]),_:1})]),_:1})]),_:1},8,["onHide"]))}},ke={class:"q-pa-md"},Me={class:"row q-pb-md"},Qe=t("div",{class:"col"},[t("span",{class:"text-h4"},"Incoming")],-1),Ne={class:"col text-right"},qe={class:"row q-pt-md"},Le={class:"col"},Ge={__name:"incomingIndex",setup(F){const U=B(),n=p([]),b=p([{name:"TRCV_RCVCD",label:"Receive ID",field:"TRCV_RCVCD",sortable:!0,align:"left"},{name:"MSUP_SUPNM",label:"Supplier Name",field:"MSUP_SUPNM",sortable:!0,align:"left"},{name:"TOT_RCV",label:"Total Qty",field:"TOT_RCV",sortable:!0,align:"left"},{name:"TOT_AMT",label:"Total Amount",field:"TOT_AMT",sortable:!0,align:"left"}]),f=p(!1),s=p(""),D=p("");ae(()=>{O()});const O=async()=>{f.value=!0,await S.post("receive/searchAPI",{searchBy:s.value,searchValue:D.value}).then(m=>{f.value=!1,n.value=m.data.data}).catch(m=>{f.value=!1})},y=(m=[])=>{U.dialog({component:Ue,componentProps:{dataHeader:m}}).onOk(async u=>{getOutgoingData()})};return(m,u)=>(v(),R("div",ke,[t("div",Me,[Qe,t("div",Ne,[e(V,{icon:"add",color:"blue",onClick:u[0]||(u[0]=d=>y())},{default:l(()=>[e(k,null,{default:l(()=>[_("Create New Delivery")]),_:1})]),_:1})])]),e(oe),t("div",qe,[t("div",Le,[e(se,{title:"Outgoing List",rows:n.value,columns:b.value,"row-key":"TDLVORD_DLVCD",loading:f.value,dense:"",pagination:{rowsPerPage:20},class:"my-sticky-header-column-table"},{"top-right":l(()=>[e(I,{outlined:"",modelValue:s.value,"onUpdate:modelValue":u[1]||(u[1]=d=>s.value=d),options:m.columns,label:"Search Columns","option-value":"name","option-label":"label","emit-value":"",dense:"","map-options":""},null,8,["modelValue","options"]),e(h,{borderless:"",dense:"",modelValue:D.value,"onUpdate:modelValue":[u[2]||(u[2]=d=>D.value=d),u[3]||(u[3]=d=>m.getOutgoingData())],placeholder:"Search",outlined:"",debounce:"1000"},{append:l(()=>[e(x,{name:"search"})]),_:1},8,["modelValue"])]),header:l(d=>[e(A,{props:d},{default:l(()=>[(v(!0),R(M,null,Q(d.cols,C=>(v(),w($,{key:C.name,props:d},{default:l(()=>[_(P(C.label),1)]),_:2},1032,["props"]))),128)),e($,{"auto-width":""},{default:l(()=>[_("Action")]),_:1})]),_:2},1032,["props"])]),body:l(d=>[e(A,{props:d},{default:l(()=>[(v(!0),R(M,null,Q(d.cols,C=>(v(),w(H,{key:C.name,props:d},{default:l(()=>[_(P(C.value),1)]),_:2},1032,["props"]))),128)),e(H,{"auto-width":""},{default:l(()=>[e(V,{flat:"",color:"orange",icon:"edit",onClick:C=>y(d.row),dense:""},{default:l(()=>[e(k,null,{default:l(()=>[_("Edit Data")]),_:1})]),_:2},1032,["onClick"]),e(V,{flat:"",color:"red",icon:"delete",onClick:C=>m.onDelete(d.row.TDLVORD_DLVCD),dense:""},{default:l(()=>[e(k,null,{default:l(()=>[_("Edit Data")]),_:1})]),_:2},1032,["onClick"])]),_:2},1024)]),_:2},1032,["props"])]),_:1},8,["rows","columns","loading"])])])]))}};export{Ge as default};
