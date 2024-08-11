import{Q as $}from"./QTooltip.99b675db.js";import{t as i,o as K,C as v,D as y,E as l,F as e,M as G,O as N,J as t,$ as w,at as Y,R,S as Q,T as A,I as D,P as U,X as J,Q as g,Y as H,Z as W,U as j,V as re,W as ce,aY as me}from"./index.136457f2.js";import{e as q,Q as z,a as k,b as I}from"./QSelect.45ccee5e.js";import{Q as X,a as x}from"./QTable.bdae20b4.js";import{Q as P,a as B}from"./QTd.8adc3a9e.js";import{api_web as M}from"./axios.851b5a35.js";import{u as F}from"./format.e96711e3.js";import{Q as pe,a as _e}from"./QInnerLoading.246c8637.js";import{Q as ve,a as fe,C as De}from"./ClosePopup.dfd04e51.js";import{Q as Ce}from"./QList.8e510d84.js";import{u as Z}from"./use-dialog-plugin-component.96984626.js";import"./use-render-cache.3aae9b27.js";import"./date.029d3589.js";const ge=t("div",{class:"text-h6"},"Sales Order Choose",-1),Ve={class:"row"},be={class:"col"},Se={__name:"salesOrderChoose",setup(E){F();const V=i([]),r=i([{name:"TSLO_SLOCD",label:"Sales Ord Code",field:"TSLO_SLOCD",sortable:!0,align:"left"},{name:"MCUS_CUSNM",label:"Customer Name",field:"MCUS_CUSNM",sortable:!0,align:"left"},{name:"TSLO_PLAN_DLVDT",label:"DLV Plan Date",field:"TSLO_PLAN_DLVDT",sortable:!0,align:"left"}]),n=i(!1),p=i(""),b=i("");K(()=>{S()});const S=async()=>{n.value=!0,await M.post("delivery/outstanding-warehouse-api",{searchBy:p.value,searchValue:b.value}).then(o=>{n.value=!1,V.value=o.data.data}).catch(o=>{n.value=!1})},f=o=>{_(o)},{dialogRef:C,onDialogHide:L,onDialogOK:_,onDialogCancel:d}=Z();return(o,c)=>(v(),y(W,{ref_key:"dialogRef",ref:C,onHide:H(L),"transition-show":"slide-up","transition-hide":"slide-down","full-width":"",persistent:""},{default:l(()=>[e(G,{class:"q-dialog-plugin bg-white q-pa-sm"},{default:l(()=>[e(N,null,{default:l(()=>[ge]),_:1}),e(N,{class:"q-pa-sm"},{default:l(()=>[t("div",Ve,[t("div",be,[e(X,{title:"Outgoing List",rows:V.value,columns:r.value,"row-key":"TDLVORD_DLVCD",loading:n.value,dense:"",pagination:{rowsPerPage:20},class:"my-sticky-header-column-table"},{"top-right":l(()=>[e(q,{outlined:"",modelValue:p.value,"onUpdate:modelValue":c[0]||(c[0]=m=>p.value=m),options:r.value,label:"Search Columns","option-value":"name","option-label":"label","emit-value":"",dense:"","map-options":""},null,8,["modelValue","options"]),e(w,{borderless:"",dense:"",modelValue:b.value,"onUpdate:modelValue":[c[1]||(c[1]=m=>b.value=m),c[2]||(c[2]=m=>o.getOutgoingData())],placeholder:"Search",outlined:"",debounce:"1000"},{append:l(()=>[e(Y,{name:"search"})]),_:1},8,["modelValue"])]),header:l(m=>[e(P,{props:m},{default:l(()=>[(v(!0),R(Q,null,A(m.cols,T=>(v(),y(x,{key:T.name,props:m},{default:l(()=>[D(U(T.label),1)]),_:2},1032,["props"]))),128))]),_:2},1032,["props"])]),body:l(m=>[e(P,{props:m,onClick:T=>f(m.row)},{default:l(()=>[(v(!0),R(Q,null,A(m.cols,T=>(v(),y(B,{key:T.name,props:m},{default:l(()=>[D(U(T.value),1)]),_:2},1032,["props"]))),128))]),_:2},1032,["props","onClick"])]),_:1},8,["rows","columns","loading"])])])]),_:1}),e(J,{align:"right"},{default:l(()=>[e(g,{flat:"",label:"Cancel",color:"red",onClick:H(d)},null,8,["onClick"])]),_:1})]),_:1})]),_:1},8,["onHide"]))}},Le=t("div",{class:"text-h6"},"Create Outgoing Delivery",-1),Te={style:{border:"1px black solid","border-radius":"10px"}},he=t("legend",{style:{"margin-left":"1em",padding:"0.2em 0.8em"}},[t("b",null,"Header")],-1),Oe={class:"row"},ye={class:"col"},we={class:"col q-pl-md"},ke={class:"row items-center justify-end"},Re={class:"row q-pt-md"},Me={class:"col"},Ue={class:"col q-pl-md"},Ie={class:"row q-pt-md"},Qe={class:"col"},Ae={style:{border:"1px black solid","border-radius":"10px",height:"35vh",overflow:"auto"}},$e=t("legend",{style:{"margin-left":"1em",padding:"0.2em 0.8em"}},[t("b",null,"List Of Items")],-1),Ne={class:"q-pb-sm text-right"},He={__name:"outgoingCreate",props:{dataHeader:Array},setup(E){const V=F(),r=E;K(async()=>{await m(r.dataHeader.TDLVORD_CUSCD),Object.values(r.dataHeader).length>0&&(console.log(r.dataHeader),p.value=r.dataHeader.TDLVORD_DLVCD,b.value=r.dataHeader.TDLVORD_INVCD,S.value=r.dataHeader.TDLVORD_CUSCD,f.value=r.dataHeader.TDLVORD_ISSUDT,C.value=r.dataHeader.TDLVORDDETA_SLOCD,L.value=r.dataHeader.MCUS_CUSNM,_.value=r.dataHeader.TDLVORD_REMARK,d.value=r.dataHeader.listItems)});const n=i(!1),p=i(""),b=i(""),S=i(""),f=i(""),C=i(""),L=i(""),_=i(""),d=i([]),o=i([]),c=(u,a,s,h)=>{a(async()=>{h==="cust"&&m(u),h==="item"&&await getItem(u)})},m=async(u,a="MCUS_CUSNM")=>{n.value=!0,await M.post("customer/searchAPI",{searchValue:u,searchCol:a}).then(s=>{n.value=!1,o.value=s.data.data}).catch(()=>{n.value=!1})},T=()=>{V.dialog({title:"Confirmation",message:"Are you sure want to save this outgoing ?",cancel:!0,persistent:!0}).onOk(async()=>{n.value=!0,await M.post("delivery",{TDLVORD_DLVCD:p.value,TDLVORD_CUSCD:S.value,TDLVORD_ISSUDT:f.value,TDLVORDDETA_SLOCD:C.value,TDLVORD_REMARK:_.value,SO_DET:d.value}).then(u=>{n.value=!1,ne()}).catch(u=>{n.value=!1})})},ee=()=>{V.dialog({component:Se}).onOk(async u=>{C.value=u.TSLO_SLOCD,L.value=u.MCUS_CUSNM,S.value=u.TSLO_CUSCD,le(u.TSLO_SLOCD)})},le=async u=>{n.value=!0,await M.get(`delivery/outstanding-warehouse/${btoa(u)}`).then(a=>{n.value=!1,d.value=a.data.data}).catch(a=>{n.value=!1})},ae=u=>{V.dialog({title:"Confirmation",message:`Do you want to delete this lines no ${u+1} ?`,cancel:!0,persistent:!0}).onOk(async()=>{d.value.splice(u,1)})},te=()=>{d.value.push({MITM_ITMNM:"",BALQT:0,TSLODETA_PRC:0})},{dialogRef:oe,onDialogHide:se,onDialogOK:ne,onDialogCancel:de}=Z();return(u,a)=>(v(),y(W,{ref_key:"dialogRef",ref:oe,onHide:H(se),"transition-show":"slide-up","transition-hide":"slide-down","full-width":"",persistent:""},{default:l(()=>[e(G,{class:"q-dialog-plugin bg-white q-pa-sm"},{default:l(()=>[e(N,null,{default:l(()=>[Le]),_:1}),e(N,{class:"q-pa-sm"},{default:l(()=>[t("fieldset",Te,[he,e(pe,{showing:n.value,dark:""},{default:l(()=>[e(_e,{size:"50px",color:"primary"})]),_:1},8,["showing"]),t("div",Oe,[t("div",ye,[e(w,{label:"Code",readonly:"",dense:"",filled:"",modelValue:p.value,"onUpdate:modelValue":a[0]||(a[0]=s=>p.value=s)},null,8,["modelValue"])]),t("div",we,[e(w,{filled:"",modelValue:f.value,"onUpdate:modelValue":a[2]||(a[2]=s=>f.value=s),dense:"",label:"Issue Date"},{append:l(()=>[e(Y,{name:"event",class:"cursor-pointer"},{default:l(()=>[e(ve,{cover:"","transition-show":"scale","transition-hide":"scale"},{default:l(()=>[e(fe,{modelValue:f.value,"onUpdate:modelValue":a[1]||(a[1]=s=>f.value=s),mask:"YYYY-MM-DD"},{default:l(()=>[t("div",ke,[j(e(g,{label:"Close",color:"primary",flat:""},null,512),[[De]])])]),_:1},8,["modelValue"])]),_:1})]),_:1})]),_:1},8,["modelValue"])])]),t("div",Re,[t("div",Me,[e(w,{modelValue:C.value,"onUpdate:modelValue":a[3]||(a[3]=s=>C.value=s),label:"Sales Order",dense:"",readonly:""},{append:l(()=>[e(g,{round:"",dense:"",flat:"",icon:"search",onClick:ee})]),_:1},8,["modelValue"])]),t("div",Ue,[e(q,{dense:"",filled:"",label:"Customer Choose",modelValue:L.value,"onUpdate:modelValue":a[5]||(a[5]=s=>L.value=s),"use-input":"","input-debounce":"500",options:o.value,onFilter:a[6]||(a[6]=(s,h,O)=>c(s,h,O,"cust")),behavior:"dialog","option-label":"MCUS_CUSNM","option-value":"MCUS_CUSCD","emit-value":"","map-options":"",loading:n.value,readonly:C.value!=""},{after:l(()=>[e(g,{round:"",dense:"",flat:"",icon:"person_add",onClick:a[4]||(a[4]=s=>u.onAddCustClick()),color:"cyan"},{default:l(()=>[e($,null,{default:l(()=>[D("Add new customer")]),_:1})]),_:1})]),_:1},8,["modelValue","options","loading","readonly"])])]),t("div",Ie,[t("div",Qe,[e(w,{modelValue:_.value,"onUpdate:modelValue":a[7]||(a[7]=s=>_.value=s),label:"Remarks",dense:""},null,8,["modelValue"])])])]),t("fieldset",Ae,[$e,t("div",Ne,[e(g,{icon:"add",dense:"",outline:"",onClick:a[8]||(a[8]=s=>te()),color:"primary"})]),e(Ce,{bordered:"",dense:""},{default:l(()=>[d.value.length>0?(v(!0),R(Q,{key:0},A(d.value,(s,h)=>(v(),y(z,{key:h,class:"q-my-sm",dense:"",loading:n.value},{default:l(()=>[e(k,{avatar:""},{default:l(()=>[e(re,{"text-color":"blue"},{default:l(()=>[D(U(h+1),1)]),_:2},1024)]),_:2},1024),e(k,null,{default:l(()=>[e(I,null,{default:l(()=>[e(q,{dense:"",filled:"",label:"Item Name",modelValue:s.MITM_ITMNM,"onUpdate:modelValue":O=>s.MITM_ITMNM=O,"use-input":"","input-debounce":"500",options:d.value,onFilter:a[9]||(a[9]=(O,ie,ue)=>c(O,ie,ue,"item")),behavior:"dialog","option-label":"MITM_ITMNMREAL","option-value":"MITM_ITMNM","emit-value":"","map-options":"",loading:n.value,readonly:C.value!=""},null,8,["modelValue","onUpdate:modelValue","options","loading","readonly"])]),_:2},1024)]),_:2},1024),e(k,null,{default:l(()=>[e(I,null,{default:l(()=>[e(w,{dense:"",label:"Qty",filled:"",modelValue:s.BALQT,"onUpdate:modelValue":O=>s.BALQT=O},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1024)]),_:2},1024),e(k,null,{default:l(()=>[e(I,null,{default:l(()=>[D(" Rp. "+U(s.TSLODETA_PRC.toLocaleString()),1)]),_:2},1024),e(I,{caption:""},{default:l(()=>[D(" Price ")]),_:1})]),_:2},1024),e(k,{side:""},{default:l(()=>[e(g,{icon:"delete",color:"red",flat:"",onClick:O=>ae(h)},null,8,["onClick"])]),_:2},1024)]),_:2},1032,["loading"]))),128)):j((v(),y(z,{key:1,class:"q-my-sm",clickable:""},{default:l(()=>[e(k,null,{default:l(()=>[e(I,null,{default:l(()=>[D(" Choose sales order first to access item list or Add by click + button above ")]),_:1})]),_:1})]),_:1})),[[ce]])]),_:1})])]),_:1}),e(J,{align:"right"},{default:l(()=>[e(g,{label:"OK",color:"primary",onClick:a[10]||(a[10]=s=>T()),loading:n.value},null,8,["loading"]),e(g,{flat:"",label:"Cancel",color:"red",onClick:H(de)},null,8,["onClick"])]),_:1})]),_:1})]),_:1},8,["onHide"]))}},qe={class:"q-pa-md"},Pe={class:"row q-pb-md"},Ee=t("div",{class:"col"},[t("span",{class:"text-h4"},"Outgoing")],-1),xe={class:"col text-right"},Be={class:"row q-pt-md"},Ke={class:"col"},ol={__name:"outgoingView",setup(E){const V=F(),r=i([]),n=i([{name:"TDLVORD_DLVCD",label:"Delivery ID",field:"TDLVORD_DLVCD",sortable:!0,align:"left"},{name:"MCUS_CUSNM",label:"Customer Name",field:"MCUS_CUSNM",sortable:!0,align:"left"},{name:"TDLVORD_ISSUDT",label:"Issue Date",field:"TDLVORD_ISSUDT",sortable:!0,align:"left"},{name:"TDLVORD_REMARK",label:"Remark",field:"TDLVORD_REMARK",sortable:!0,align:"left"}]),p=i(!1),b=i(""),S=i("");K(()=>{f()});const f=async()=>{p.value=!0,await M.post("delivery/searchAPI",{searchBy:b.value,searchValue:S.value}).then(_=>{p.value=!1,r.value=_.data.data}).catch(_=>{p.value=!1})},C=(_=[])=>{V.dialog({component:He,componentProps:{dataHeader:_}}).onOk(async d=>{f()})},L=_=>{V.dialog({title:"Confirmation",message:"Are you sure want to delete this data ?",cancel:!0,persistent:!0}).onOk(async()=>{p.value=!0,await M.delete(`delivery/${btoa(_)}`).then(d=>{p.value=!1,f()})})};return(_,d)=>(v(),R("div",qe,[t("div",Pe,[Ee,t("div",xe,[e(g,{icon:"add",color:"blue",onClick:d[0]||(d[0]=o=>C([]))},{default:l(()=>[e($,null,{default:l(()=>[D("Create New Delivery")]),_:1})]),_:1})])]),e(me),t("div",Be,[t("div",Ke,[e(X,{title:"Outgoing List",rows:r.value,columns:n.value,"row-key":"TDLVORD_DLVCD",loading:p.value,dense:"",pagination:{rowsPerPage:20},class:"my-sticky-header-column-table"},{"top-right":l(()=>[e(q,{outlined:"",modelValue:b.value,"onUpdate:modelValue":d[1]||(d[1]=o=>b.value=o),options:n.value,label:"Search Columns","option-value":"name","option-label":"label","emit-value":"",dense:"","map-options":""},null,8,["modelValue","options"]),e(w,{borderless:"",dense:"",modelValue:S.value,"onUpdate:modelValue":[d[2]||(d[2]=o=>S.value=o),d[3]||(d[3]=o=>f())],placeholder:"Search",outlined:"",debounce:"1000"},{append:l(()=>[e(Y,{name:"search"})]),_:1},8,["modelValue"])]),header:l(o=>[e(P,{props:o},{default:l(()=>[(v(!0),R(Q,null,A(o.cols,c=>(v(),y(x,{key:c.name,props:o},{default:l(()=>[D(U(c.label),1)]),_:2},1032,["props"]))),128)),e(x,{"auto-width":""},{default:l(()=>[D("Action")]),_:1})]),_:2},1032,["props"])]),body:l(o=>[e(P,{props:o},{default:l(()=>[(v(!0),R(Q,null,A(o.cols,c=>(v(),y(B,{key:c.name,props:o},{default:l(()=>[D(U(c.value),1)]),_:2},1032,["props"]))),128)),e(B,{"auto-width":""},{default:l(()=>[e(g,{flat:"",color:"orange",icon:"edit",onClick:c=>C(o.row),dense:""},{default:l(()=>[e($,null,{default:l(()=>[D("Edit Data")]),_:1})]),_:2},1032,["onClick"]),e(g,{flat:"",color:"red",icon:"delete",onClick:c=>L(o.row.TDLVORD_DLVCD),dense:""},{default:l(()=>[e($,null,{default:l(()=>[D("Edit Data")]),_:1})]),_:2},1032,["onClick"])]),_:2},1024)]),_:2},1032,["props"])]),_:1},8,["rows","columns","loading"])])])]))}};export{ol as default};
