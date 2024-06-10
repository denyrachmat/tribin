import{Q as q}from"./QTooltip.6d4ff365.js";import{h,c as W,K as re,L as ue,ai as ce,a2 as me,ak as ve,a6 as fe,a as j,ab as pe,g as _e,be as De,t as u,o as z,C,D as k,E as l,F as e,M as X,O as P,J as t,$ as w,an as K,R as M,S as N,T as A,I as b,P as I,X as Z,Q as y,Y as H,Z as ee,U as G,V as Ce,W as ge,aY as be}from"./index.256a0257.js";import{a as Y,u as le,k as ae,l as F,m as E,Q as Ve,b as J,c as U,d as $}from"./QTable.c8552291.js";import{Q as x,a as B}from"./QTd.63d8b005.js";import{api_web as Q}from"./axios.ca4e7365.js";import{Q as Se,a as he,C as Le}from"./ClosePopup.a63ecff8.js";import"./use-render-cache.3aae9b27.js";import"./date.02a18065.js";const ye=[h("g",{transform:"translate(-20,-20)"},[h("path",{d:"M79.9,52.6C80,51.8,80,50.9,80,50s0-1.8-0.1-2.6l-5.1-0.4c-0.3-2.4-0.9-4.6-1.8-6.7l4.2-2.9c-0.7-1.6-1.6-3.1-2.6-4.5 L70,35c-1.4-1.9-3.1-3.5-4.9-4.9l2.2-4.6c-1.4-1-2.9-1.9-4.5-2.6L59.8,27c-2.1-0.9-4.4-1.5-6.7-1.8l-0.4-5.1C51.8,20,50.9,20,50,20 s-1.8,0-2.6,0.1l-0.4,5.1c-2.4,0.3-4.6,0.9-6.7,1.8l-2.9-4.1c-1.6,0.7-3.1,1.6-4.5,2.6l2.1,4.6c-1.9,1.4-3.5,3.1-5,4.9l-4.5-2.1 c-1,1.4-1.9,2.9-2.6,4.5l4.1,2.9c-0.9,2.1-1.5,4.4-1.8,6.8l-5,0.4C20,48.2,20,49.1,20,50s0,1.8,0.1,2.6l5,0.4 c0.3,2.4,0.9,4.7,1.8,6.8l-4.1,2.9c0.7,1.6,1.6,3.1,2.6,4.5l4.5-2.1c1.4,1.9,3.1,3.5,5,4.9l-2.1,4.6c1.4,1,2.9,1.9,4.5,2.6l2.9-4.1 c2.1,0.9,4.4,1.5,6.7,1.8l0.4,5.1C48.2,80,49.1,80,50,80s1.8,0,2.6-0.1l0.4-5.1c2.3-0.3,4.6-0.9,6.7-1.8l2.9,4.2 c1.6-0.7,3.1-1.6,4.5-2.6L65,69.9c1.9-1.4,3.5-3,4.9-4.9l4.6,2.2c1-1.4,1.9-2.9,2.6-4.5L73,59.8c0.9-2.1,1.5-4.4,1.8-6.7L79.9,52.6 z M50,65c-8.3,0-15-6.7-15-15c0-8.3,6.7-15,15-15s15,6.7,15,15C65,58.3,58.3,65,50,65z",fill:"currentColor"},[h("animateTransform",{attributeName:"transform",type:"rotate",from:"90 50 50",to:"0 50 50",dur:"1s",repeatCount:"indefinite"})])]),h("g",{transform:"translate(20,20) rotate(15 50 50)"},[h("path",{d:"M79.9,52.6C80,51.8,80,50.9,80,50s0-1.8-0.1-2.6l-5.1-0.4c-0.3-2.4-0.9-4.6-1.8-6.7l4.2-2.9c-0.7-1.6-1.6-3.1-2.6-4.5 L70,35c-1.4-1.9-3.1-3.5-4.9-4.9l2.2-4.6c-1.4-1-2.9-1.9-4.5-2.6L59.8,27c-2.1-0.9-4.4-1.5-6.7-1.8l-0.4-5.1C51.8,20,50.9,20,50,20 s-1.8,0-2.6,0.1l-0.4,5.1c-2.4,0.3-4.6,0.9-6.7,1.8l-2.9-4.1c-1.6,0.7-3.1,1.6-4.5,2.6l2.1,4.6c-1.9,1.4-3.5,3.1-5,4.9l-4.5-2.1 c-1,1.4-1.9,2.9-2.6,4.5l4.1,2.9c-0.9,2.1-1.5,4.4-1.8,6.8l-5,0.4C20,48.2,20,49.1,20,50s0,1.8,0.1,2.6l5,0.4 c0.3,2.4,0.9,4.7,1.8,6.8l-4.1,2.9c0.7,1.6,1.6,3.1,2.6,4.5l4.5-2.1c1.4,1.9,3.1,3.5,5,4.9l-2.1,4.6c1.4,1,2.9,1.9,4.5,2.6l2.9-4.1 c2.1,0.9,4.4,1.5,6.7,1.8l0.4,5.1C48.2,80,49.1,80,50,80s1.8,0,2.6-0.1l0.4-5.1c2.3-0.3,4.6-0.9,6.7-1.8l2.9,4.2 c1.6-0.7,3.1-1.6,4.5-2.6L65,69.9c1.9-1.4,3.5-3,4.9-4.9l4.6,2.2c1-1.4,1.9-2.9,2.6-4.5L73,59.8c0.9-2.1,1.5-4.4,1.8-6.7L79.9,52.6 z M50,65c-8.3,0-15-6.7-15-15c0-8.3,6.7-15,15-15s15,6.7,15,15C65,58.3,58.3,65,50,65z",fill:"currentColor"},[h("animateTransform",{attributeName:"transform",type:"rotate",from:"0 50 50",to:"90 50 50",dur:"1s",repeatCount:"indefinite"})])])];var Oe=W({name:"QSpinnerGears",props:re,setup(f){const{cSize:p,classes:d}=ue(f);return()=>h("svg",{class:d.value,width:p.value,height:p.value,viewBox:"0 0 100 100",preserveAspectRatio:"xMidYMid",xmlns:"http://www.w3.org/2000/svg"},ye)}}),Te=W({name:"QInnerLoading",props:{...ce,...me,showing:Boolean,color:String,size:{type:[String,Number],default:"42px"},label:String,labelClass:String,labelStyle:[String,Array,Object]},setup(f,{slots:p}){const d=_e(),n=ve(f,d.proxy.$q),{transitionProps:c,transitionStyle:V}=fe(f),S=j(()=>"q-inner-loading q--avoid-card-border absolute-full column flex-center"+(n.value===!0?" q-inner-loading--dark":"")),_=j(()=>"q-inner-loading__label"+(f.labelClass!==void 0?` ${f.labelClass}`:""));function g(){const m=[h(De,{size:f.size,color:f.color})];return f.label!==void 0&&m.push(h("div",{class:_.value,style:f.labelStyle},[f.label])),m}function L(){return f.showing===!0?h("div",{class:S.value,style:V.value},p.default!==void 0?p.default():g()):null}return()=>h(pe,c.value,L)}});const we=t("div",{class:"text-h6"},"Sales Order Choose",-1),ke={class:"row"},Re={class:"col"},Ue={__name:"salesOrderChoose",setup(f){Y();const p=u([]),d=u([{name:"TSLO_SLOCD",label:"Sales Ord Code",field:"TSLO_SLOCD",sortable:!0,align:"left"},{name:"MCUS_CUSNM",label:"Customer Name",field:"MCUS_CUSNM",sortable:!0,align:"left"},{name:"TSLO_PLAN_DLVDT",label:"DLV Plan Date",field:"TSLO_PLAN_DLVDT",sortable:!0,align:"left"}]),n=u(!1),c=u(""),V=u("");z(()=>{S()});const S=async()=>{n.value=!0,await Q.post("delivery/outstanding-warehouse-api",{searchBy:c.value,searchValue:V.value}).then(o=>{n.value=!1,p.value=o.data.data}).catch(o=>{n.value=!1})},_=o=>{m(o)},{dialogRef:g,onDialogHide:L,onDialogOK:m,onDialogCancel:i}=le();return(o,v)=>(C(),k(ee,{ref_key:"dialogRef",ref:g,onHide:H(L),"transition-show":"slide-up","transition-hide":"slide-down","full-width":"",persistent:""},{default:l(()=>[e(X,{class:"q-dialog-plugin bg-white q-pa-sm"},{default:l(()=>[e(P,null,{default:l(()=>[we]),_:1}),e(P,{class:"q-pa-sm"},{default:l(()=>[t("div",ke,[t("div",Re,[e(ae,{title:"Outgoing List",rows:p.value,columns:d.value,"row-key":"TDLVORD_DLVCD",loading:n.value,dense:"",pagination:{rowsPerPage:20},class:"my-sticky-header-column-table"},{"top-right":l(()=>[e(F,{outlined:"",modelValue:c.value,"onUpdate:modelValue":v[0]||(v[0]=D=>c.value=D),options:d.value,label:"Search Columns","option-value":"name","option-label":"label","emit-value":"",dense:"","map-options":""},null,8,["modelValue","options"]),e(w,{borderless:"",dense:"",modelValue:V.value,"onUpdate:modelValue":[v[1]||(v[1]=D=>V.value=D),v[2]||(v[2]=D=>o.getOutgoingData())],placeholder:"Search",outlined:"",debounce:"1000"},{append:l(()=>[e(K,{name:"search"})]),_:1},8,["modelValue"])]),header:l(D=>[e(x,{props:D},{default:l(()=>[(C(!0),M(N,null,A(D.cols,O=>(C(),k(E,{key:O.name,props:D},{default:l(()=>[b(I(O.label),1)]),_:2},1032,["props"]))),128))]),_:2},1032,["props"])]),body:l(D=>[e(x,{props:D,onClick:O=>_(D.row)},{default:l(()=>[(C(!0),M(N,null,A(D.cols,O=>(C(),k(B,{key:O.name,props:D},{default:l(()=>[b(I(O.value),1)]),_:2},1032,["props"]))),128))]),_:2},1032,["props","onClick"])]),_:1},8,["rows","columns","loading"])])])]),_:1}),e(Z,{align:"right"},{default:l(()=>[e(y,{flat:"",label:"Cancel",color:"red",onClick:H(i)},null,8,["onClick"])]),_:1})]),_:1})]),_:1},8,["onHide"]))}},Me=t("div",{class:"text-h6"},"Create Outgoing Delivery",-1),Qe={style:{border:"1px black solid","border-radius":"10px"}},Ie=t("legend",{style:{"margin-left":"1em",padding:"0.2em 0.8em"}},[t("b",null,"Header")],-1),$e={class:"row"},Ne={class:"col"},Ae={class:"col q-pl-md"},qe={class:"row items-center justify-end"},Pe={class:"row q-pt-md"},He={class:"col"},xe={class:"col q-pl-md"},Ee={class:"row q-pt-md"},Be={class:"col"},ze={style:{border:"1px black solid","border-radius":"10px",height:"35vh",overflow:"auto"}},Ke=t("legend",{style:{"margin-left":"1em",padding:"0.2em 0.8em"}},[t("b",null,"List Of Items")],-1),Ye={__name:"outgoingCreate",props:{dataHeader:Array},setup(f){const p=Y(),d=f;z(async()=>{await v(d.dataHeader.TDLVORD_CUSCD),Object.values(d.dataHeader).length>0&&(console.log(d.dataHeader),c.value=d.dataHeader.TDLVORD_DLVCD,V.value=d.dataHeader.TDLVORD_INVCD,S.value=d.dataHeader.TDLVORD_CUSCD,_.value=d.dataHeader.TDLVORD_ISSUDT,g.value=d.dataHeader.TDLVORDDETA_SLOCD,L.value=d.dataHeader.MCUS_CUSNM,m.value=d.dataHeader.TDLVORD_REMARK,i.value=d.dataHeader.listItems)});const n=u(!1),c=u(""),V=u(""),S=u(""),_=u(""),g=u(""),L=u(""),m=u(""),i=u([]),o=(r,a,s,T)=>{a(async()=>{T==="cust"&&v(r),T==="item"&&await getItem(r)})},v=async(r,a="MCUS_CUSNM")=>{n.value=!0,await Q.post("customer/searchAPI",{searchValue:r,searchCol:a}).then(s=>{n.value=!1,listCustomers.value=s.data.data}).catch(()=>{n.value=!1})},D=()=>{p.dialog({title:"Confirmation",message:"Are you sure want to save this outgoing ?",cancel:!0,persistent:!0}).onOk(async()=>{n.value=!0,await Q.post("delivery",{TDLVORD_DLVCD:c.value,TDLVORD_CUSCD:S.value,TDLVORD_ISSUDT:_.value,TDLVORDDETA_SLOCD:g.value,TDLVORD_REMARK:m.value,SO_DET:i.value}).then(r=>{n.value=!1,de()}).catch(r=>{n.value=!1})})},O=()=>{p.dialog({component:Ue}).onOk(async r=>{g.value=r.TSLO_SLOCD,L.value=r.MCUS_CUSNM,S.value=r.TSLO_CUSCD,te(r.TSLO_SLOCD)})},te=async r=>{n.value=!0,await Q.get(`delivery/outstanding-warehouse/${btoa(r)}`).then(a=>{n.value=!1,i.value=a.data.data}).catch(a=>{n.value=!1})},oe=r=>{p.dialog({title:"Confirmation",message:`Do you want to delete this lines no ${r+1} ?`,cancel:!0,persistent:!0}).onOk(async()=>{i.value.splice(r,1)})},{dialogRef:se,onDialogHide:ne,onDialogOK:de,onDialogCancel:ie}=le();return(r,a)=>(C(),k(ee,{ref_key:"dialogRef",ref:se,onHide:H(ne),"transition-show":"slide-up","transition-hide":"slide-down","full-width":"",persistent:""},{default:l(()=>[e(X,{class:"q-dialog-plugin bg-white q-pa-sm"},{default:l(()=>[e(P,null,{default:l(()=>[Me]),_:1}),e(P,{class:"q-pa-sm"},{default:l(()=>[t("fieldset",Qe,[Ie,e(Te,{showing:n.value,dark:""},{default:l(()=>[e(Oe,{size:"50px",color:"primary"})]),_:1},8,["showing"]),t("div",$e,[t("div",Ne,[e(w,{label:"Code",readonly:"",dense:"",filled:"",modelValue:c.value,"onUpdate:modelValue":a[0]||(a[0]=s=>c.value=s)},null,8,["modelValue"])]),t("div",Ae,[e(w,{filled:"",modelValue:_.value,"onUpdate:modelValue":a[2]||(a[2]=s=>_.value=s),dense:"",label:"Issue Date"},{append:l(()=>[e(K,{name:"event",class:"cursor-pointer"},{default:l(()=>[e(Se,{cover:"","transition-show":"scale","transition-hide":"scale"},{default:l(()=>[e(he,{modelValue:_.value,"onUpdate:modelValue":a[1]||(a[1]=s=>_.value=s),mask:"YYYY-MM-DD"},{default:l(()=>[t("div",qe,[G(e(y,{label:"Close",color:"primary",flat:""},null,512),[[Le]])])]),_:1},8,["modelValue"])]),_:1})]),_:1})]),_:1},8,["modelValue"])])]),t("div",Pe,[t("div",He,[e(w,{modelValue:g.value,"onUpdate:modelValue":a[3]||(a[3]=s=>g.value=s),label:"Sales Order",dense:"",readonly:""},{append:l(()=>[e(y,{round:"",dense:"",flat:"",icon:"search",onClick:O})]),_:1},8,["modelValue"])]),t("div",xe,[e(F,{dense:"",filled:"",label:"Customer Choose",modelValue:L.value,"onUpdate:modelValue":a[5]||(a[5]=s=>L.value=s),"use-input":"","input-debounce":"500",options:r.listCustomers,onFilter:a[6]||(a[6]=(s,T,R)=>o(s,T,R,"cust")),behavior:"dialog","option-label":"MCUS_CUSNM","option-value":"MCUS_CUSCD","emit-value":"","map-options":"",loading:n.value,readonly:g.value==""},{after:l(()=>[e(y,{round:"",dense:"",flat:"",icon:"person_add",onClick:a[4]||(a[4]=s=>r.onAddCustClick()),color:"cyan"},{default:l(()=>[e(q,null,{default:l(()=>[b("Add new customer")]),_:1})]),_:1})]),_:1},8,["modelValue","options","loading","readonly"])])]),t("div",Ee,[t("div",Be,[e(w,{modelValue:m.value,"onUpdate:modelValue":a[7]||(a[7]=s=>m.value=s),label:"Remarks",dense:""},null,8,["modelValue"])])])]),t("fieldset",ze,[Ke,e(Ve,{bordered:"",dense:""},{default:l(()=>[i.value.length>0?(C(!0),M(N,{key:0},A(i.value,(s,T)=>(C(),k(J,{key:T,class:"q-my-sm",dense:"",loading:n.value},{default:l(()=>[e(U,{avatar:""},{default:l(()=>[e(Ce,{"text-color":"blue"},{default:l(()=>[b(I(T+1),1)]),_:2},1024)]),_:2},1024),e(U,null,{default:l(()=>[e($,null,{default:l(()=>[e(w,{dense:"",label:"Item Name",filled:"",modelValue:s.MITM_ITMNM,"onUpdate:modelValue":R=>s.MITM_ITMNM=R,readonly:""},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1024)]),_:2},1024),e(U,null,{default:l(()=>[e($,null,{default:l(()=>[e(w,{dense:"",label:"Qty",filled:"",modelValue:s.BALQT,"onUpdate:modelValue":R=>s.BALQT=R},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1024)]),_:2},1024),e(U,null,{default:l(()=>[e($,null,{default:l(()=>[b(" Rp. "+I(s.TSLODETA_PRC.toLocaleString()),1)]),_:2},1024),e($,{caption:""},{default:l(()=>[b(" Price ")]),_:1})]),_:2},1024),e(U,{side:""},{default:l(()=>[e(y,{icon:"delete",color:"red",flat:"",onClick:R=>oe(T)},null,8,["onClick"])]),_:2},1024)]),_:2},1032,["loading"]))),128)):G((C(),k(J,{key:1,class:"q-my-sm",clickable:""},{default:l(()=>[e(U,null,{default:l(()=>[e($,null,{default:l(()=>[b(" Choose sales order first to access item list ")]),_:1})]),_:1})]),_:1})),[[ge]])]),_:1})])]),_:1}),e(Z,{align:"right"},{default:l(()=>[e(y,{label:"OK",color:"primary",onClick:a[8]||(a[8]=s=>D()),loading:n.value},null,8,["loading"]),e(y,{flat:"",label:"Cancel",color:"red",onClick:H(ie)},null,8,["onClick"])]),_:1})]),_:1})]),_:1},8,["onHide"]))}},Fe={class:"q-pa-md"},je={class:"row q-pb-md"},Ge=t("div",{class:"col"},[t("span",{class:"text-h4"},"Outgoing")],-1),Je={class:"col text-right"},We={class:"row q-pt-md"},Xe={class:"col"},dl={__name:"outgoingView",setup(f){const p=Y(),d=u([]),n=u([{name:"TDLVORD_DLVCD",label:"Delivery ID",field:"TDLVORD_DLVCD",sortable:!0,align:"left"},{name:"MCUS_CUSNM",label:"Customer Name",field:"MCUS_CUSNM",sortable:!0,align:"left"},{name:"TDLVORD_ISSUDT",label:"Issue Date",field:"TDLVORD_ISSUDT",sortable:!0,align:"left"},{name:"TDLVORD_REMARK",label:"Remark",field:"TDLVORD_REMARK",sortable:!0,align:"left"}]),c=u(!1),V=u(""),S=u("");z(()=>{_()});const _=async()=>{c.value=!0,await Q.post("delivery/searchAPI",{searchBy:V.value,searchValue:S.value}).then(m=>{c.value=!1,d.value=m.data.data}).catch(m=>{c.value=!1})},g=(m=[])=>{p.dialog({component:Ye,componentProps:{dataHeader:m}}).onOk(async i=>{_()})},L=m=>{p.dialog({title:"Confirmation",message:"Are you sure want to delete this data ?",cancel:!0,persistent:!0}).onOk(async()=>{c.value=!0,await Q.delete(`delivery/${btoa(m)}`).then(i=>{c.value=!1,_()})})};return(m,i)=>(C(),M("div",Fe,[t("div",je,[Ge,t("div",Je,[e(y,{icon:"add",color:"blue",onClick:i[0]||(i[0]=o=>g([]))},{default:l(()=>[e(q,null,{default:l(()=>[b("Create New Delivery")]),_:1})]),_:1})])]),e(be),t("div",We,[t("div",Xe,[e(ae,{title:"Outgoing List",rows:d.value,columns:n.value,"row-key":"TDLVORD_DLVCD",loading:c.value,dense:"",pagination:{rowsPerPage:20},class:"my-sticky-header-column-table"},{"top-right":l(()=>[e(F,{outlined:"",modelValue:V.value,"onUpdate:modelValue":i[1]||(i[1]=o=>V.value=o),options:n.value,label:"Search Columns","option-value":"name","option-label":"label","emit-value":"",dense:"","map-options":""},null,8,["modelValue","options"]),e(w,{borderless:"",dense:"",modelValue:S.value,"onUpdate:modelValue":[i[2]||(i[2]=o=>S.value=o),i[3]||(i[3]=o=>_())],placeholder:"Search",outlined:"",debounce:"1000"},{append:l(()=>[e(K,{name:"search"})]),_:1},8,["modelValue"])]),header:l(o=>[e(x,{props:o},{default:l(()=>[(C(!0),M(N,null,A(o.cols,v=>(C(),k(E,{key:v.name,props:o},{default:l(()=>[b(I(v.label),1)]),_:2},1032,["props"]))),128)),e(E,{"auto-width":""},{default:l(()=>[b("Action")]),_:1})]),_:2},1032,["props"])]),body:l(o=>[e(x,{props:o},{default:l(()=>[(C(!0),M(N,null,A(o.cols,v=>(C(),k(B,{key:v.name,props:o},{default:l(()=>[b(I(v.value),1)]),_:2},1032,["props"]))),128)),e(B,{"auto-width":""},{default:l(()=>[e(y,{flat:"",color:"orange",icon:"edit",onClick:v=>g(o.row),dense:""},{default:l(()=>[e(q,null,{default:l(()=>[b("Edit Data")]),_:1})]),_:2},1032,["onClick"]),e(y,{flat:"",color:"red",icon:"delete",onClick:v=>L(o.row.TDLVORD_DLVCD),dense:""},{default:l(()=>[e(q,null,{default:l(()=>[b("Edit Data")]),_:1})]),_:2},1032,["onClick"])]),_:2},1024)]),_:2},1032,["props"])]),_:1},8,["rows","columns","loading"])])])]))}};export{dl as default};
