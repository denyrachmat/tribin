import{Q as A}from"./QTooltip.14f8cf64.js";import{t as i,o as B,C as f,D as T,E as l,F as e,M as G,O as N,J as t,$ as y,an as K,R,S as I,T as $,I as v,P as M,X as J,Q as g,Y as H,Z as W,U as j,V as ne,W as de,aY as ue}from"./index.2b6ccfed.js";import{a as Y,u as X,k as Z,l as F,m as E,Q as ie,b as z,c as k,d as Q}from"./QTable.138991fc.js";import{Q as q,a as x}from"./QTd.c33a93db.js";import{api_web as U}from"./axios.a9555440.js";import{Q as re,a as ce}from"./QInnerLoading.d95b1885.js";import{Q as me,a as _e,C as pe}from"./ClosePopup.e0a558d8.js";import"./use-render-cache.3aae9b27.js";import"./date.6e44ef68.js";const fe=t("div",{class:"text-h6"},"Sales Order Choose",-1),De={class:"row"},ve={class:"col"},Ce={__name:"salesOrderChoose",setup(P){Y();const V=i([]),r=i([{name:"TSLO_SLOCD",label:"Sales Ord Code",field:"TSLO_SLOCD",sortable:!0,align:"left"},{name:"MCUS_CUSNM",label:"Customer Name",field:"MCUS_CUSNM",sortable:!0,align:"left"},{name:"TSLO_PLAN_DLVDT",label:"DLV Plan Date",field:"TSLO_PLAN_DLVDT",sortable:!0,align:"left"}]),n=i(!1),m=i(""),S=i("");B(()=>{b()});const b=async()=>{n.value=!0,await U.post("delivery/outstanding-warehouse-api",{searchBy:m.value,searchValue:S.value}).then(o=>{n.value=!1,V.value=o.data.data}).catch(o=>{n.value=!1})},D=o=>{p(o)},{dialogRef:C,onDialogHide:h,onDialogOK:p,onDialogCancel:d}=X();return(o,c)=>(f(),T(W,{ref_key:"dialogRef",ref:C,onHide:H(h),"transition-show":"slide-up","transition-hide":"slide-down","full-width":"",persistent:""},{default:l(()=>[e(G,{class:"q-dialog-plugin bg-white q-pa-sm"},{default:l(()=>[e(N,null,{default:l(()=>[fe]),_:1}),e(N,{class:"q-pa-sm"},{default:l(()=>[t("div",De,[t("div",ve,[e(Z,{title:"Outgoing List",rows:V.value,columns:r.value,"row-key":"TDLVORD_DLVCD",loading:n.value,dense:"",pagination:{rowsPerPage:20},class:"my-sticky-header-column-table"},{"top-right":l(()=>[e(F,{outlined:"",modelValue:m.value,"onUpdate:modelValue":c[0]||(c[0]=_=>m.value=_),options:r.value,label:"Search Columns","option-value":"name","option-label":"label","emit-value":"",dense:"","map-options":""},null,8,["modelValue","options"]),e(y,{borderless:"",dense:"",modelValue:S.value,"onUpdate:modelValue":[c[1]||(c[1]=_=>S.value=_),c[2]||(c[2]=_=>o.getOutgoingData())],placeholder:"Search",outlined:"",debounce:"1000"},{append:l(()=>[e(K,{name:"search"})]),_:1},8,["modelValue"])]),header:l(_=>[e(q,{props:_},{default:l(()=>[(f(!0),R(I,null,$(_.cols,L=>(f(),T(E,{key:L.name,props:_},{default:l(()=>[v(M(L.label),1)]),_:2},1032,["props"]))),128))]),_:2},1032,["props"])]),body:l(_=>[e(q,{props:_,onClick:L=>D(_.row)},{default:l(()=>[(f(!0),R(I,null,$(_.cols,L=>(f(),T(x,{key:L.name,props:_},{default:l(()=>[v(M(L.value),1)]),_:2},1032,["props"]))),128))]),_:2},1032,["props","onClick"])]),_:1},8,["rows","columns","loading"])])])]),_:1}),e(J,{align:"right"},{default:l(()=>[e(g,{flat:"",label:"Cancel",color:"red",onClick:H(d)},null,8,["onClick"])]),_:1})]),_:1})]),_:1},8,["onHide"]))}},ge=t("div",{class:"text-h6"},"Create Outgoing Delivery",-1),Ve={style:{border:"1px black solid","border-radius":"10px"}},Se=t("legend",{style:{"margin-left":"1em",padding:"0.2em 0.8em"}},[t("b",null,"Header")],-1),be={class:"row"},he={class:"col"},Le={class:"col q-pl-md"},Oe={class:"row items-center justify-end"},ye={class:"row q-pt-md"},Te={class:"col"},we={class:"col q-pl-md"},ke={class:"row q-pt-md"},Re={class:"col"},Ue={style:{border:"1px black solid","border-radius":"10px",height:"35vh",overflow:"auto"}},Me=t("legend",{style:{"margin-left":"1em",padding:"0.2em 0.8em"}},[t("b",null,"List Of Items")],-1),Qe={__name:"outgoingCreate",props:{dataHeader:Array},setup(P){const V=Y(),r=P;B(async()=>{await c(r.dataHeader.TDLVORD_CUSCD),Object.values(r.dataHeader).length>0&&(console.log(r.dataHeader),m.value=r.dataHeader.TDLVORD_DLVCD,S.value=r.dataHeader.TDLVORD_INVCD,b.value=r.dataHeader.TDLVORD_CUSCD,D.value=r.dataHeader.TDLVORD_ISSUDT,C.value=r.dataHeader.TDLVORDDETA_SLOCD,h.value=r.dataHeader.MCUS_CUSNM,p.value=r.dataHeader.TDLVORD_REMARK,d.value=r.dataHeader.listItems)});const n=i(!1),m=i(""),S=i(""),b=i(""),D=i(""),C=i(""),h=i(""),p=i(""),d=i([]),o=(u,a,s,O)=>{a(async()=>{O==="cust"&&c(u),O==="item"&&await getItem(u)})},c=async(u,a="MCUS_CUSNM")=>{n.value=!0,await U.post("customer/searchAPI",{searchValue:u,searchCol:a}).then(s=>{n.value=!1,listCustomers.value=s.data.data}).catch(()=>{n.value=!1})},_=()=>{V.dialog({title:"Confirmation",message:"Are you sure want to save this outgoing ?",cancel:!0,persistent:!0}).onOk(async()=>{n.value=!0,await U.post("delivery",{TDLVORD_DLVCD:m.value,TDLVORD_CUSCD:b.value,TDLVORD_ISSUDT:D.value,TDLVORDDETA_SLOCD:C.value,TDLVORD_REMARK:p.value,SO_DET:d.value}).then(u=>{n.value=!1,oe()}).catch(u=>{n.value=!1})})},L=()=>{V.dialog({component:Ce}).onOk(async u=>{C.value=u.TSLO_SLOCD,h.value=u.MCUS_CUSNM,b.value=u.TSLO_CUSCD,ee(u.TSLO_SLOCD)})},ee=async u=>{n.value=!0,await U.get(`delivery/outstanding-warehouse/${btoa(u)}`).then(a=>{n.value=!1,d.value=a.data.data}).catch(a=>{n.value=!1})},le=u=>{V.dialog({title:"Confirmation",message:`Do you want to delete this lines no ${u+1} ?`,cancel:!0,persistent:!0}).onOk(async()=>{d.value.splice(u,1)})},{dialogRef:ae,onDialogHide:te,onDialogOK:oe,onDialogCancel:se}=X();return(u,a)=>(f(),T(W,{ref_key:"dialogRef",ref:ae,onHide:H(te),"transition-show":"slide-up","transition-hide":"slide-down","full-width":"",persistent:""},{default:l(()=>[e(G,{class:"q-dialog-plugin bg-white q-pa-sm"},{default:l(()=>[e(N,null,{default:l(()=>[ge]),_:1}),e(N,{class:"q-pa-sm"},{default:l(()=>[t("fieldset",Ve,[Se,e(re,{showing:n.value,dark:""},{default:l(()=>[e(ce,{size:"50px",color:"primary"})]),_:1},8,["showing"]),t("div",be,[t("div",he,[e(y,{label:"Code",readonly:"",dense:"",filled:"",modelValue:m.value,"onUpdate:modelValue":a[0]||(a[0]=s=>m.value=s)},null,8,["modelValue"])]),t("div",Le,[e(y,{filled:"",modelValue:D.value,"onUpdate:modelValue":a[2]||(a[2]=s=>D.value=s),dense:"",label:"Issue Date"},{append:l(()=>[e(K,{name:"event",class:"cursor-pointer"},{default:l(()=>[e(me,{cover:"","transition-show":"scale","transition-hide":"scale"},{default:l(()=>[e(_e,{modelValue:D.value,"onUpdate:modelValue":a[1]||(a[1]=s=>D.value=s),mask:"YYYY-MM-DD"},{default:l(()=>[t("div",Oe,[j(e(g,{label:"Close",color:"primary",flat:""},null,512),[[pe]])])]),_:1},8,["modelValue"])]),_:1})]),_:1})]),_:1},8,["modelValue"])])]),t("div",ye,[t("div",Te,[e(y,{modelValue:C.value,"onUpdate:modelValue":a[3]||(a[3]=s=>C.value=s),label:"Sales Order",dense:"",readonly:""},{append:l(()=>[e(g,{round:"",dense:"",flat:"",icon:"search",onClick:L})]),_:1},8,["modelValue"])]),t("div",we,[e(F,{dense:"",filled:"",label:"Customer Choose",modelValue:h.value,"onUpdate:modelValue":a[5]||(a[5]=s=>h.value=s),"use-input":"","input-debounce":"500",options:u.listCustomers,onFilter:a[6]||(a[6]=(s,O,w)=>o(s,O,w,"cust")),behavior:"dialog","option-label":"MCUS_CUSNM","option-value":"MCUS_CUSCD","emit-value":"","map-options":"",loading:n.value,readonly:C.value==""},{after:l(()=>[e(g,{round:"",dense:"",flat:"",icon:"person_add",onClick:a[4]||(a[4]=s=>u.onAddCustClick()),color:"cyan"},{default:l(()=>[e(A,null,{default:l(()=>[v("Add new customer")]),_:1})]),_:1})]),_:1},8,["modelValue","options","loading","readonly"])])]),t("div",ke,[t("div",Re,[e(y,{modelValue:p.value,"onUpdate:modelValue":a[7]||(a[7]=s=>p.value=s),label:"Remarks",dense:""},null,8,["modelValue"])])])]),t("fieldset",Ue,[Me,e(ie,{bordered:"",dense:""},{default:l(()=>[d.value.length>0?(f(!0),R(I,{key:0},$(d.value,(s,O)=>(f(),T(z,{key:O,class:"q-my-sm",dense:"",loading:n.value},{default:l(()=>[e(k,{avatar:""},{default:l(()=>[e(ne,{"text-color":"blue"},{default:l(()=>[v(M(O+1),1)]),_:2},1024)]),_:2},1024),e(k,null,{default:l(()=>[e(Q,null,{default:l(()=>[e(y,{dense:"",label:"Item Name",filled:"",modelValue:s.MITM_ITMNM,"onUpdate:modelValue":w=>s.MITM_ITMNM=w,readonly:""},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1024)]),_:2},1024),e(k,null,{default:l(()=>[e(Q,null,{default:l(()=>[e(y,{dense:"",label:"Qty",filled:"",modelValue:s.BALQT,"onUpdate:modelValue":w=>s.BALQT=w},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1024)]),_:2},1024),e(k,null,{default:l(()=>[e(Q,null,{default:l(()=>[v(" Rp. "+M(s.TSLODETA_PRC.toLocaleString()),1)]),_:2},1024),e(Q,{caption:""},{default:l(()=>[v(" Price ")]),_:1})]),_:2},1024),e(k,{side:""},{default:l(()=>[e(g,{icon:"delete",color:"red",flat:"",onClick:w=>le(O)},null,8,["onClick"])]),_:2},1024)]),_:2},1032,["loading"]))),128)):j((f(),T(z,{key:1,class:"q-my-sm",clickable:""},{default:l(()=>[e(k,null,{default:l(()=>[e(Q,null,{default:l(()=>[v(" Choose sales order first to access item list ")]),_:1})]),_:1})]),_:1})),[[de]])]),_:1})])]),_:1}),e(J,{align:"right"},{default:l(()=>[e(g,{label:"OK",color:"primary",onClick:a[8]||(a[8]=s=>_()),loading:n.value},null,8,["loading"]),e(g,{flat:"",label:"Cancel",color:"red",onClick:H(se)},null,8,["onClick"])]),_:1})]),_:1})]),_:1},8,["onHide"]))}},Ie={class:"q-pa-md"},$e={class:"row q-pb-md"},Ae=t("div",{class:"col"},[t("span",{class:"text-h4"},"Outgoing")],-1),Ne={class:"col text-right"},He={class:"row q-pt-md"},qe={class:"col"},Ge={__name:"outgoingView",setup(P){const V=Y(),r=i([]),n=i([{name:"TDLVORD_DLVCD",label:"Delivery ID",field:"TDLVORD_DLVCD",sortable:!0,align:"left"},{name:"MCUS_CUSNM",label:"Customer Name",field:"MCUS_CUSNM",sortable:!0,align:"left"},{name:"TDLVORD_ISSUDT",label:"Issue Date",field:"TDLVORD_ISSUDT",sortable:!0,align:"left"},{name:"TDLVORD_REMARK",label:"Remark",field:"TDLVORD_REMARK",sortable:!0,align:"left"}]),m=i(!1),S=i(""),b=i("");B(()=>{D()});const D=async()=>{m.value=!0,await U.post("delivery/searchAPI",{searchBy:S.value,searchValue:b.value}).then(p=>{m.value=!1,r.value=p.data.data}).catch(p=>{m.value=!1})},C=(p=[])=>{V.dialog({component:Qe,componentProps:{dataHeader:p}}).onOk(async d=>{D()})},h=p=>{V.dialog({title:"Confirmation",message:"Are you sure want to delete this data ?",cancel:!0,persistent:!0}).onOk(async()=>{m.value=!0,await U.delete(`delivery/${btoa(p)}`).then(d=>{m.value=!1,D()})})};return(p,d)=>(f(),R("div",Ie,[t("div",$e,[Ae,t("div",Ne,[e(g,{icon:"add",color:"blue",onClick:d[0]||(d[0]=o=>C([]))},{default:l(()=>[e(A,null,{default:l(()=>[v("Create New Delivery")]),_:1})]),_:1})])]),e(ue),t("div",He,[t("div",qe,[e(Z,{title:"Outgoing List",rows:r.value,columns:n.value,"row-key":"TDLVORD_DLVCD",loading:m.value,dense:"",pagination:{rowsPerPage:20},class:"my-sticky-header-column-table"},{"top-right":l(()=>[e(F,{outlined:"",modelValue:S.value,"onUpdate:modelValue":d[1]||(d[1]=o=>S.value=o),options:n.value,label:"Search Columns","option-value":"name","option-label":"label","emit-value":"",dense:"","map-options":""},null,8,["modelValue","options"]),e(y,{borderless:"",dense:"",modelValue:b.value,"onUpdate:modelValue":[d[2]||(d[2]=o=>b.value=o),d[3]||(d[3]=o=>D())],placeholder:"Search",outlined:"",debounce:"1000"},{append:l(()=>[e(K,{name:"search"})]),_:1},8,["modelValue"])]),header:l(o=>[e(q,{props:o},{default:l(()=>[(f(!0),R(I,null,$(o.cols,c=>(f(),T(E,{key:c.name,props:o},{default:l(()=>[v(M(c.label),1)]),_:2},1032,["props"]))),128)),e(E,{"auto-width":""},{default:l(()=>[v("Action")]),_:1})]),_:2},1032,["props"])]),body:l(o=>[e(q,{props:o},{default:l(()=>[(f(!0),R(I,null,$(o.cols,c=>(f(),T(x,{key:c.name,props:o},{default:l(()=>[v(M(c.value),1)]),_:2},1032,["props"]))),128)),e(x,{"auto-width":""},{default:l(()=>[e(g,{flat:"",color:"orange",icon:"edit",onClick:c=>C(o.row),dense:""},{default:l(()=>[e(A,null,{default:l(()=>[v("Edit Data")]),_:1})]),_:2},1032,["onClick"]),e(g,{flat:"",color:"red",icon:"delete",onClick:c=>h(o.row.TDLVORD_DLVCD),dense:""},{default:l(()=>[e(A,null,{default:l(()=>[v("Edit Data")]),_:1})]),_:2},1032,["onClick"])]),_:2},1024)]),_:2},1032,["props"])]),_:1},8,["rows","columns","loading"])])])]))}};export{Ge as default};
