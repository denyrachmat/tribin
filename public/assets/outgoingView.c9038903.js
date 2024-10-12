import{Q as N}from"./QTooltip.149ce7ab.js";import{t as d,o as K,C as _,D as y,E as l,F as e,M as G,O as $,J as t,$ as w,at as Y,R,S as Q,T as A,I as D,P as U,X as J,Q as g,Y as H,Z as W,U as j,V as me,W as pe,aY as ve}from"./index.1e375242.js";import{c as P,Q as z,a as M,b as I}from"./QSelect.1db30609.js";import{Q as X,a as x}from"./QTable.9d25a805.js";import{Q as q,a as B}from"./QTd.8384590e.js";import{api_web as k}from"./axios.04acb653.js";import{u as F}from"./format.671ffb0a.js";import{Q as _e,a as fe}from"./QInnerLoading.0c5845cb.js";import{Q as De,a as Ce,C as ge}from"./ClosePopup.39ebb4ff.js";import{Q as Ve}from"./QList.0834f91e.js";import{u as Z}from"./use-dialog-plugin-component.a8557da3.js";import"./use-render-cache.3aae9b27.js";import"./date.78751b10.js";const be=t("div",{class:"text-h6"},"Sales Order Choose",-1),he={class:"row"},Se={class:"col"},Le={__name:"salesOrderChoose",setup(E){F();const V=d([]),r=d([{name:"TSLO_SLOCD",label:"Sales Ord Code",field:"TSLO_SLOCD",sortable:!0,align:"left"},{name:"MCUS_CUSNM",label:"Customer Name",field:"MCUS_CUSNM",sortable:!0,align:"left"},{name:"TSLO_PLAN_DLVDT",label:"DLV Plan Date",field:"TSLO_PLAN_DLVDT",sortable:!0,align:"left"}]),o=d(!1),p=d(""),b=d("");K(()=>{h()});const h=async()=>{o.value=!0,await k.post("delivery/outstanding-warehouse-api",{searchBy:p.value,searchValue:b.value}).then(s=>{o.value=!1,V.value=s.data.data}).catch(s=>{o.value=!1})},f=s=>{v(s)},{dialogRef:C,onDialogHide:L,onDialogOK:v,onDialogCancel:u}=Z();return(s,c)=>(_(),y(W,{ref_key:"dialogRef",ref:C,onHide:H(L),"transition-show":"slide-up","transition-hide":"slide-down","full-width":"",persistent:""},{default:l(()=>[e(G,{class:"q-dialog-plugin bg-white q-pa-sm"},{default:l(()=>[e($,null,{default:l(()=>[be]),_:1}),e($,{class:"q-pa-sm"},{default:l(()=>[t("div",he,[t("div",Se,[e(X,{title:"Outgoing List",rows:V.value,columns:r.value,"row-key":"TDLVORD_DLVCD",loading:o.value,dense:"",pagination:{rowsPerPage:20},class:"my-sticky-header-column-table"},{"top-right":l(()=>[e(P,{outlined:"",modelValue:p.value,"onUpdate:modelValue":c[0]||(c[0]=m=>p.value=m),options:r.value,label:"Search Columns","option-value":"name","option-label":"label","emit-value":"",dense:"","map-options":""},null,8,["modelValue","options"]),e(w,{borderless:"",dense:"",modelValue:b.value,"onUpdate:modelValue":[c[1]||(c[1]=m=>b.value=m),c[2]||(c[2]=m=>s.getOutgoingData())],placeholder:"Search",outlined:"",debounce:"1000"},{append:l(()=>[e(Y,{name:"search"})]),_:1},8,["modelValue"])]),header:l(m=>[e(q,{props:m},{default:l(()=>[(_(!0),R(Q,null,A(m.cols,S=>(_(),y(x,{key:S.name,props:m},{default:l(()=>[D(U(S.label),1)]),_:2},1032,["props"]))),128))]),_:2},1032,["props"])]),body:l(m=>[e(q,{props:m,onClick:S=>f(m.row)},{default:l(()=>[(_(!0),R(Q,null,A(m.cols,S=>(_(),y(B,{key:S.name,props:m},{default:l(()=>[D(U(S.value),1)]),_:2},1032,["props"]))),128))]),_:2},1032,["props","onClick"])]),_:1},8,["rows","columns","loading"])])])]),_:1}),e(J,{align:"right"},{default:l(()=>[e(g,{flat:"",label:"Cancel",color:"red",onClick:H(u)},null,8,["onClick"])]),_:1})]),_:1})]),_:1},8,["onHide"]))}},Oe=t("div",{class:"text-h6"},"Create Outgoing Delivery",-1),Te={style:{border:"1px black solid","border-radius":"10px"}},ye=t("legend",{style:{"margin-left":"1em",padding:"0.2em 0.8em"}},[t("b",null,"Header")],-1),we={class:"row"},ke={class:"col"},Me={class:"col q-pl-md"},Re={class:"row items-center justify-end"},Ue={class:"row q-pt-md"},Ie={class:"col"},Qe={class:"col q-pl-md"},Ae={class:"row q-pt-md"},Ne={class:"col"},$e={style:{border:"1px black solid","border-radius":"10px",height:"35vh",overflow:"auto"}},He=t("legend",{style:{"margin-left":"1em",padding:"0.2em 0.8em"}},[t("b",null,"List Of Items")],-1),Pe={class:"q-pb-sm text-right"},qe={__name:"outgoingCreate",props:{dataHeader:Array},setup(E){const V=F(),r=E;K(async()=>{await S(r.dataHeader.TDLVORD_CUSCD),Object.values(r.dataHeader).length>0&&(console.log(r.dataHeader),p.value=r.dataHeader.TDLVORD_DLVCD,b.value=r.dataHeader.TDLVORD_INVCD,h.value=r.dataHeader.TDLVORD_CUSCD,f.value=r.dataHeader.TDLVORD_ISSUDT,C.value=r.dataHeader.TDLVORDDETA_SLOCD,L.value=r.dataHeader.MCUS_CUSNM,v.value=r.dataHeader.TDLVORD_REMARK,u.value=r.dataHeader.listItems)});const o=d(!1),p=d(""),b=d(""),h=d(""),f=d(""),C=d(""),L=d(""),v=d(""),u=d([]),s=d([]),c=d([]),m=(i,a,n,O)=>{a(async()=>{O==="cust"&&S(i),O==="item"&&await se(i)})},S=async(i,a="MCUS_CUSNM")=>{o.value=!0,await k.post("customer/searchAPI",{searchValue:i,searchCol:a}).then(n=>{o.value=!1,s.value=n.data.data}).catch(()=>{o.value=!1})},ee=()=>{V.dialog({title:"Confirmation",message:"Are you sure want to save this outgoing ?",cancel:!0,persistent:!0}).onOk(async()=>{o.value=!0,await k.post("delivery",{TDLVORD_DLVCD:p.value,TDLVORD_CUSCD:h.value,TDLVORD_ISSUDT:f.value,TDLVORDDETA_SLOCD:C.value,TDLVORD_REMARK:v.value,SO_DET:u.value}).then(i=>{o.value=!1,ue()}).catch(i=>{o.value=!1})})},le=()=>{V.dialog({component:Le}).onOk(async i=>{C.value=i.TSLO_SLOCD,L.value=i.MCUS_CUSNM,h.value=i.TSLO_CUSCD,ae(i.TSLO_SLOCD)})},ae=async i=>{o.value=!0,await k.get(`delivery/outstanding-warehouse/${btoa(i)}`).then(a=>{o.value=!1,u.value=a.data.data}).catch(a=>{o.value=!1})},te=i=>{V.dialog({title:"Confirmation",message:`Do you want to delete this lines no ${i+1} ?`,cancel:!0,persistent:!0}).onOk(async()=>{u.value.splice(i,1)})},oe=()=>{u.value.push({MITM_ITMNM:"",BALQT:0,TSLODETA_PRC:0})},se=async i=>{o.value=!0,await k.post("item/searchAPINameOnly",{searchValue:i}).then(a=>{o.value=!1,c.value=a.data.data}).catch(()=>{o.value=!1})},{dialogRef:ne,onDialogHide:de,onDialogOK:ue,onDialogCancel:ie}=Z();return(i,a)=>(_(),y(W,{ref_key:"dialogRef",ref:ne,onHide:H(de),"transition-show":"slide-up","transition-hide":"slide-down","full-width":"",persistent:""},{default:l(()=>[e(G,{class:"q-dialog-plugin bg-white q-pa-sm"},{default:l(()=>[e($,null,{default:l(()=>[Oe]),_:1}),e($,{class:"q-pa-sm"},{default:l(()=>[t("fieldset",Te,[ye,e(_e,{showing:o.value,dark:""},{default:l(()=>[e(fe,{size:"50px",color:"primary"})]),_:1},8,["showing"]),t("div",we,[t("div",ke,[e(w,{label:"Code",readonly:"",dense:"",filled:"",modelValue:p.value,"onUpdate:modelValue":a[0]||(a[0]=n=>p.value=n)},null,8,["modelValue"])]),t("div",Me,[e(w,{filled:"",modelValue:f.value,"onUpdate:modelValue":a[2]||(a[2]=n=>f.value=n),dense:"",label:"Issue Date"},{append:l(()=>[e(Y,{name:"event",class:"cursor-pointer"},{default:l(()=>[e(De,{cover:"","transition-show":"scale","transition-hide":"scale"},{default:l(()=>[e(Ce,{modelValue:f.value,"onUpdate:modelValue":a[1]||(a[1]=n=>f.value=n),mask:"YYYY-MM-DD"},{default:l(()=>[t("div",Re,[j(e(g,{label:"Close",color:"primary",flat:""},null,512),[[ge]])])]),_:1},8,["modelValue"])]),_:1})]),_:1})]),_:1},8,["modelValue"])])]),t("div",Ue,[t("div",Ie,[e(w,{modelValue:C.value,"onUpdate:modelValue":a[3]||(a[3]=n=>C.value=n),label:"Sales Order",dense:"",readonly:""},{append:l(()=>[e(g,{round:"",dense:"",flat:"",icon:"search",onClick:le})]),_:1},8,["modelValue"])]),t("div",Qe,[e(P,{dense:"",filled:"",label:"Customer Choose",modelValue:L.value,"onUpdate:modelValue":a[5]||(a[5]=n=>L.value=n),"use-input":"","input-debounce":"500",options:s.value,onFilter:a[6]||(a[6]=(n,O,T)=>m(n,O,T,"cust")),behavior:"dialog","option-label":"MCUS_CUSNM","option-value":"MCUS_CUSCD","emit-value":"","map-options":"",loading:o.value,readonly:C.value!=""},{after:l(()=>[e(g,{round:"",dense:"",flat:"",icon:"person_add",onClick:a[4]||(a[4]=n=>i.onAddCustClick()),color:"cyan"},{default:l(()=>[e(N,null,{default:l(()=>[D("Add new customer")]),_:1})]),_:1})]),_:1},8,["modelValue","options","loading","readonly"])])]),t("div",Ae,[t("div",Ne,[e(w,{modelValue:v.value,"onUpdate:modelValue":a[7]||(a[7]=n=>v.value=n),label:"Remarks",dense:""},null,8,["modelValue"])])])]),t("fieldset",$e,[He,t("div",Pe,[e(g,{icon:"add",dense:"",outline:"",onClick:a[8]||(a[8]=n=>oe()),color:"primary"})]),e(Ve,{bordered:"",dense:""},{default:l(()=>[u.value.length>0?(_(!0),R(Q,{key:0},A(u.value,(n,O)=>(_(),y(z,{key:O,class:"q-my-sm",dense:"",loading:o.value},{default:l(()=>[e(M,{avatar:""},{default:l(()=>[e(me,{"text-color":"blue"},{default:l(()=>[D(U(O+1),1)]),_:2},1024)]),_:2},1024),e(M,null,{default:l(()=>[e(I,null,{default:l(()=>[e(P,{dense:"",filled:"",label:"Item Name",modelValue:n.MITM_ITMNM,"onUpdate:modelValue":T=>n.MITM_ITMNM=T,"use-input":"","input-debounce":"500",options:c.value,onFilter:a[9]||(a[9]=(T,re,ce)=>m(T,re,ce,"item")),behavior:"dialog","option-label":"MITM_ITMNM","option-value":"MITM_ITMNM","emit-value":"","map-options":"",loading:o.value,readonly:C.value!=""},null,8,["modelValue","onUpdate:modelValue","options","loading","readonly"])]),_:2},1024)]),_:2},1024),e(M,null,{default:l(()=>[e(I,null,{default:l(()=>[e(w,{dense:"",label:"Qty",filled:"",modelValue:n.BALQT,"onUpdate:modelValue":T=>n.BALQT=T},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1024)]),_:2},1024),e(M,null,{default:l(()=>[e(I,null,{default:l(()=>[D(" Rp. "+U(n.TSLODETA_PRC.toLocaleString()),1)]),_:2},1024),e(I,{caption:""},{default:l(()=>[D(" Price ")]),_:1})]),_:2},1024),e(M,{side:""},{default:l(()=>[e(g,{icon:"delete",color:"red",flat:"",onClick:T=>te(O)},null,8,["onClick"])]),_:2},1024)]),_:2},1032,["loading"]))),128)):j((_(),y(z,{key:1,class:"q-my-sm",clickable:""},{default:l(()=>[e(M,null,{default:l(()=>[e(I,null,{default:l(()=>[D(" Choose sales order first to access item list or Add by click + button above ")]),_:1})]),_:1})]),_:1})),[[pe]])]),_:1})])]),_:1}),e(J,{align:"right"},{default:l(()=>[e(g,{label:"OK",color:"primary",onClick:a[10]||(a[10]=n=>ee()),loading:o.value},null,8,["loading"]),e(g,{flat:"",label:"Cancel",color:"red",onClick:H(ie)},null,8,["onClick"])]),_:1})]),_:1})]),_:1},8,["onHide"]))}},Ee={class:"q-pa-md"},xe={class:"row q-pb-md"},Be=t("div",{class:"col"},[t("span",{class:"text-h4"},"Outgoing")],-1),Ke={class:"col text-right"},Ye={class:"row q-pt-md"},Fe={class:"col"},nl={__name:"outgoingView",setup(E){const V=F(),r=d([]),o=d([{name:"TDLVORD_DLVCD",label:"Delivery ID",field:"TDLVORD_DLVCD",sortable:!0,align:"left"},{name:"MCUS_CUSNM",label:"Customer Name",field:"MCUS_CUSNM",sortable:!0,align:"left"},{name:"TDLVORD_ISSUDT",label:"Issue Date",field:"TDLVORD_ISSUDT",sortable:!0,align:"left"},{name:"TDLVORD_REMARK",label:"Remark",field:"TDLVORD_REMARK",sortable:!0,align:"left"}]),p=d(!1),b=d(""),h=d("");K(()=>{f()});const f=async()=>{p.value=!0,await k.post("delivery/searchAPI",{searchBy:b.value,searchValue:h.value}).then(v=>{p.value=!1,r.value=v.data.data}).catch(v=>{p.value=!1})},C=(v=[])=>{V.dialog({component:qe,componentProps:{dataHeader:v}}).onOk(async u=>{f()})},L=v=>{V.dialog({title:"Confirmation",message:"Are you sure want to delete this data ?",cancel:!0,persistent:!0}).onOk(async()=>{p.value=!0,await k.delete(`delivery/${btoa(v)}`).then(u=>{p.value=!1,f()})})};return(v,u)=>(_(),R("div",Ee,[t("div",xe,[Be,t("div",Ke,[e(g,{icon:"add",color:"blue",onClick:u[0]||(u[0]=s=>C([]))},{default:l(()=>[e(N,null,{default:l(()=>[D("Create New Delivery")]),_:1})]),_:1})])]),e(ve),t("div",Ye,[t("div",Fe,[e(X,{title:"Outgoing List",rows:r.value,columns:o.value,"row-key":"TDLVORD_DLVCD",loading:p.value,dense:"",pagination:{rowsPerPage:20},class:"my-sticky-header-column-table"},{"top-right":l(()=>[e(P,{outlined:"",modelValue:b.value,"onUpdate:modelValue":u[1]||(u[1]=s=>b.value=s),options:o.value,label:"Search Columns","option-value":"name","option-label":"label","emit-value":"",dense:"","map-options":""},null,8,["modelValue","options"]),e(w,{borderless:"",dense:"",modelValue:h.value,"onUpdate:modelValue":[u[2]||(u[2]=s=>h.value=s),u[3]||(u[3]=s=>f())],placeholder:"Search",outlined:"",debounce:"1000"},{append:l(()=>[e(Y,{name:"search"})]),_:1},8,["modelValue"])]),header:l(s=>[e(q,{props:s},{default:l(()=>[(_(!0),R(Q,null,A(s.cols,c=>(_(),y(x,{key:c.name,props:s},{default:l(()=>[D(U(c.label),1)]),_:2},1032,["props"]))),128)),e(x,{"auto-width":""},{default:l(()=>[D("Action")]),_:1})]),_:2},1032,["props"])]),body:l(s=>[e(q,{props:s},{default:l(()=>[(_(!0),R(Q,null,A(s.cols,c=>(_(),y(B,{key:c.name,props:s},{default:l(()=>[D(U(c.value),1)]),_:2},1032,["props"]))),128)),e(B,{"auto-width":""},{default:l(()=>[e(g,{flat:"",color:"orange",icon:"edit",onClick:c=>C(s.row),dense:""},{default:l(()=>[e(N,null,{default:l(()=>[D("Edit Data")]),_:1})]),_:2},1032,["onClick"]),e(g,{flat:"",color:"red",icon:"delete",onClick:c=>L(s.row.TDLVORD_DLVCD),dense:""},{default:l(()=>[e(N,null,{default:l(()=>[D("Edit Data")]),_:1})]),_:2},1032,["onClick"])]),_:2},1024)]),_:2},1032,["props"])]),_:1},8,["rows","columns","loading"])])])]))}};export{nl as default};
