import{Q as K}from"./QTooltip.dd8713ab.js";import{h as C,c as X,J as oe,K as se,ah as ne,a1 as de,aj as ie,a5 as re,a as Y,aa as ue,g as ce,bh as me,s,o as F,B as p,C as w,D as l,E as e,L as J,M as $,I as a,Z as V,am as E,P as O,R as Q,S as U,H as S,O as I,W,Q as L,X as q,Y as Z,T as j,U as pe,V as fe,aX as _e}from"./index.f6450154.js";import{u as z,j as ee,k as le,l as A,Q as ve,a as G,b as M,c as P}from"./QTable.b054c6c9.js";import{Q as N,a as B}from"./QTd.24fe1e21.js";import{api_web as H}from"./axios.a198c52e.js";import{Q as ge,a as Ce,C as De}from"./ClosePopup.bd8bd84b.js";import{u as ae}from"./use-dialog-plugin-component.dec3aeaf.js";import"./use-cache.b0833c75.js";import"./date.a25a0093.js";const be=[C("g",{transform:"translate(-20,-20)"},[C("path",{d:"M79.9,52.6C80,51.8,80,50.9,80,50s0-1.8-0.1-2.6l-5.1-0.4c-0.3-2.4-0.9-4.6-1.8-6.7l4.2-2.9c-0.7-1.6-1.6-3.1-2.6-4.5 L70,35c-1.4-1.9-3.1-3.5-4.9-4.9l2.2-4.6c-1.4-1-2.9-1.9-4.5-2.6L59.8,27c-2.1-0.9-4.4-1.5-6.7-1.8l-0.4-5.1C51.8,20,50.9,20,50,20 s-1.8,0-2.6,0.1l-0.4,5.1c-2.4,0.3-4.6,0.9-6.7,1.8l-2.9-4.1c-1.6,0.7-3.1,1.6-4.5,2.6l2.1,4.6c-1.9,1.4-3.5,3.1-5,4.9l-4.5-2.1 c-1,1.4-1.9,2.9-2.6,4.5l4.1,2.9c-0.9,2.1-1.5,4.4-1.8,6.8l-5,0.4C20,48.2,20,49.1,20,50s0,1.8,0.1,2.6l5,0.4 c0.3,2.4,0.9,4.7,1.8,6.8l-4.1,2.9c0.7,1.6,1.6,3.1,2.6,4.5l4.5-2.1c1.4,1.9,3.1,3.5,5,4.9l-2.1,4.6c1.4,1,2.9,1.9,4.5,2.6l2.9-4.1 c2.1,0.9,4.4,1.5,6.7,1.8l0.4,5.1C48.2,80,49.1,80,50,80s1.8,0,2.6-0.1l0.4-5.1c2.3-0.3,4.6-0.9,6.7-1.8l2.9,4.2 c1.6-0.7,3.1-1.6,4.5-2.6L65,69.9c1.9-1.4,3.5-3,4.9-4.9l4.6,2.2c1-1.4,1.9-2.9,2.6-4.5L73,59.8c0.9-2.1,1.5-4.4,1.8-6.7L79.9,52.6 z M50,65c-8.3,0-15-6.7-15-15c0-8.3,6.7-15,15-15s15,6.7,15,15C65,58.3,58.3,65,50,65z",fill:"currentColor"},[C("animateTransform",{attributeName:"transform",type:"rotate",from:"90 50 50",to:"0 50 50",dur:"1s",repeatCount:"indefinite"})])]),C("g",{transform:"translate(20,20) rotate(15 50 50)"},[C("path",{d:"M79.9,52.6C80,51.8,80,50.9,80,50s0-1.8-0.1-2.6l-5.1-0.4c-0.3-2.4-0.9-4.6-1.8-6.7l4.2-2.9c-0.7-1.6-1.6-3.1-2.6-4.5 L70,35c-1.4-1.9-3.1-3.5-4.9-4.9l2.2-4.6c-1.4-1-2.9-1.9-4.5-2.6L59.8,27c-2.1-0.9-4.4-1.5-6.7-1.8l-0.4-5.1C51.8,20,50.9,20,50,20 s-1.8,0-2.6,0.1l-0.4,5.1c-2.4,0.3-4.6,0.9-6.7,1.8l-2.9-4.1c-1.6,0.7-3.1,1.6-4.5,2.6l2.1,4.6c-1.9,1.4-3.5,3.1-5,4.9l-4.5-2.1 c-1,1.4-1.9,2.9-2.6,4.5l4.1,2.9c-0.9,2.1-1.5,4.4-1.8,6.8l-5,0.4C20,48.2,20,49.1,20,50s0,1.8,0.1,2.6l5,0.4 c0.3,2.4,0.9,4.7,1.8,6.8l-4.1,2.9c0.7,1.6,1.6,3.1,2.6,4.5l4.5-2.1c1.4,1.9,3.1,3.5,5,4.9l-2.1,4.6c1.4,1,2.9,1.9,4.5,2.6l2.9-4.1 c2.1,0.9,4.4,1.5,6.7,1.8l0.4,5.1C48.2,80,49.1,80,50,80s1.8,0,2.6-0.1l0.4-5.1c2.3-0.3,4.6-0.9,6.7-1.8l2.9,4.2 c1.6-0.7,3.1-1.6,4.5-2.6L65,69.9c1.9-1.4,3.5-3,4.9-4.9l4.6,2.2c1-1.4,1.9-2.9,2.6-4.5L73,59.8c0.9-2.1,1.5-4.4,1.8-6.7L79.9,52.6 z M50,65c-8.3,0-15-6.7-15-15c0-8.3,6.7-15,15-15s15,6.7,15,15C65,58.3,58.3,65,50,65z",fill:"currentColor"},[C("animateTransform",{attributeName:"transform",type:"rotate",from:"0 50 50",to:"90 50 50",dur:"1s",repeatCount:"indefinite"})])])];var he=X({name:"QSpinnerGears",props:oe,setup(d){const{cSize:f,classes:i}=se(d);return()=>C("svg",{class:i.value,width:f.value,height:f.value,viewBox:"0 0 100 100",preserveAspectRatio:"xMidYMid",xmlns:"http://www.w3.org/2000/svg"},be)}}),Ve=X({name:"QInnerLoading",props:{...ne,...de,showing:Boolean,color:String,size:{type:[String,Number],default:42},label:String,labelClass:String,labelStyle:[String,Array,Object]},setup(d,{slots:f}){const i=ce(),_=ie(d,i.proxy.$q),{transitionProps:r,transitionStyle:v}=re(d),D=Y(()=>"q-inner-loading absolute-full column flex-center"+(_.value===!0?" q-inner-loading--dark":"")),b=Y(()=>"q-inner-loading__label"+(d.labelClass!==void 0?` ${d.labelClass}`:""));function h(){const u=[C(me,{size:d.size,color:d.color})];return d.label!==void 0&&u.push(C("div",{class:b.value,style:d.labelStyle},[d.label])),u}function g(){return d.showing===!0?C("div",{class:D.value,style:v.value},f.default!==void 0?f.default():h()):null}return()=>C(ue,r.value,g)}});const Se=a("div",{class:"text-h6"},"Sales Order Choose",-1),ye={class:"row"},Le={class:"col"},we={__name:"salesOrderChoose",setup(d){z();const f=s([]),i=s([{name:"TSLO_SLOCD",label:"Sales Ord Code",field:"TSLO_SLOCD",sortable:!0,align:"left"},{name:"MCUS_CUSNM",label:"Customer Name",field:"MCUS_CUSNM",sortable:!0,align:"left"},{name:"TSLO_PLAN_DLVDT",label:"DLV Plan Date",field:"TSLO_PLAN_DLVDT",sortable:!0,align:"left"}]),_=s(!1),r=s(""),v=s("");F(()=>{D()});const D=async()=>{_.value=!0,await H.post("delivery/outstanding-warehouse-api",{searchBy:r.value,searchValue:v.value}).then(c=>{_.value=!1,f.value=c.data.data}).catch(c=>{_.value=!1})},b=c=>{u(c)},{dialogRef:h,onDialogHide:g,onDialogOK:u,onDialogCancel:n}=ae();return(c,y)=>(p(),w(Z,{ref_key:"dialogRef",ref:h,onHide:q(g),"transition-show":"slide-up","transition-hide":"slide-down","full-width":"",persistent:""},{default:l(()=>[e(J,{class:"q-dialog-plugin bg-white q-pa-sm"},{default:l(()=>[e($,null,{default:l(()=>[Se]),_:1}),e($,{class:"q-pa-sm"},{default:l(()=>[a("div",ye,[a("div",Le,[e(ee,{title:"Outgoing List",rows:f.value,columns:i.value,"row-key":"TDLVORD_DLVCD",loading:_.value,dense:"",pagination:{rowsPerPage:20},class:"my-sticky-header-column-table"},{"top-right":l(()=>[e(le,{outlined:"",modelValue:r.value,"onUpdate:modelValue":y[0]||(y[0]=m=>r.value=m),options:i.value,label:"Search Columns","option-value":"name","option-label":"label","emit-value":"",dense:"","map-options":""},null,8,["modelValue","options"]),e(V,{borderless:"",dense:"",modelValue:v.value,"onUpdate:modelValue":[y[1]||(y[1]=m=>v.value=m),y[2]||(y[2]=m=>c.getOutgoingData())],placeholder:"Search",outlined:"",debounce:"1000"},{append:l(()=>[e(E,{name:"search"})]),_:1},8,["modelValue"])]),header:l(m=>[e(N,{props:m},{default:l(()=>[(p(!0),O(Q,null,U(m.cols,T=>(p(),w(A,{key:T.name,props:m},{default:l(()=>[S(I(T.label),1)]),_:2},1032,["props"]))),128))]),_:2},1032,["props"])]),body:l(m=>[e(N,{props:m,onClick:T=>b(m.row)},{default:l(()=>[(p(!0),O(Q,null,U(m.cols,T=>(p(),w(B,{key:T.name,props:m},{default:l(()=>[S(I(T.value),1)]),_:2},1032,["props"]))),128))]),_:2},1032,["props","onClick"])]),_:1},8,["rows","columns","loading"])])])]),_:1}),e(W,{align:"right"},{default:l(()=>[e(L,{flat:"",label:"Cancel",color:"red",onClick:q(n)},null,8,["onClick"])]),_:1})]),_:1})]),_:1},8,["onHide"]))}},Te=a("div",{class:"text-h6"},"Create Outgoing Delivery",-1),ke={style:{border:"1px black solid","border-radius":"10px"}},Oe=a("legend",{style:{"margin-left":"1em",padding:"0.2em 0.8em"}},[a("b",null,"Header")],-1),Me={class:"row"},Qe={class:"col"},Ue={class:"col q-pl-md"},Ie={class:"row items-center justify-end"},Re={class:"row q-pt-md"},$e={class:"col"},qe={class:"col q-pl-md"},Ne={class:"row q-pt-md"},xe={class:"col"},Pe={style:{border:"1px black solid","border-radius":"10px",height:"35vh",overflow:"auto"}},Ae=a("legend",{style:{"margin-left":"1em",padding:"0.2em 0.8em"}},[a("b",null,"List Of Items")],-1),Be={__name:"outgoingCreate",setup(d){const f=z(),i=s(!1),_=s(""),r=s(""),v=s(""),D=s(""),b=s(""),h=s([]),g=()=>{},u=()=>{f.dialog({component:we}).onOk(async k=>{n(k.TSLO_SLOCD)})},n=async k=>{i.value=!0,await H.get(`delivery/outstanding-warehouse/${btoa(k)}`).then(t=>{i.value=!1,h.value=t.data.data}).catch(t=>{i.value=!1})},c=k=>{console.log(h[k])},{dialogRef:y,onDialogHide:m,onDialogOK:T,onDialogCancel:te}=ae();return(k,t)=>(p(),w(Z,{ref_key:"dialogRef",ref:y,onHide:q(m),"transition-show":"slide-up","transition-hide":"slide-down","full-width":"",persistent:""},{default:l(()=>[e(J,{class:"q-dialog-plugin bg-white q-pa-sm"},{default:l(()=>[e($,null,{default:l(()=>[Te]),_:1}),e($,{class:"q-pa-sm"},{default:l(()=>[a("fieldset",ke,[Oe,e(Ve,{showing:i.value,dark:""},{default:l(()=>[e(he,{size:"50px",color:"primary"})]),_:1},8,["showing"]),a("div",Me,[a("div",Qe,[e(V,{label:"Code",readonly:"",dense:"",filled:"",modelValue:_.value,"onUpdate:modelValue":t[0]||(t[0]=o=>_.value=o)},null,8,["modelValue"])]),a("div",Ue,[e(V,{filled:"",modelValue:r.value,"onUpdate:modelValue":t[2]||(t[2]=o=>r.value=o),dense:""},{append:l(()=>[e(E,{name:"event",class:"cursor-pointer"},{default:l(()=>[e(ge,{cover:"","transition-show":"scale","transition-hide":"scale"},{default:l(()=>[e(Ce,{modelValue:r.value,"onUpdate:modelValue":t[1]||(t[1]=o=>r.value=o),mask:"YYYY-MM-DD"},{default:l(()=>[a("div",Ie,[j(e(L,{label:"Close",color:"primary",flat:""},null,512),[[De]])])]),_:1},8,["modelValue"])]),_:1})]),_:1})]),_:1},8,["modelValue"])])]),a("div",Re,[a("div",$e,[e(V,{modelValue:v.value,"onUpdate:modelValue":t[3]||(t[3]=o=>v.value=o),label:"Sales Order",dense:"",readonly:""},{append:l(()=>[e(L,{round:"",dense:"",flat:"",icon:"search",onClick:u})]),_:1},8,["modelValue"])]),a("div",qe,[e(V,{modelValue:D.value,"onUpdate:modelValue":t[4]||(t[4]=o=>D.value=o),label:"Customer",dense:"",readonly:""},null,8,["modelValue"])])]),a("div",Ne,[a("div",xe,[e(V,{modelValue:b.value,"onUpdate:modelValue":t[5]||(t[5]=o=>b.value=o),label:"Remarks",dense:""},null,8,["modelValue"])])])]),a("fieldset",Pe,[Ae,e(ve,{bordered:"",dense:""},{default:l(()=>[h.value.length>0?(p(!0),O(Q,{key:0},U(h.value,(o,x)=>(p(),w(G,{key:x,class:"q-my-sm",dense:"",loading:i.value},{default:l(()=>[e(M,{avatar:""},{default:l(()=>[e(pe,{"text-color":"blue"},{default:l(()=>[S(I(x+1),1)]),_:2},1024)]),_:2},1024),e(M,null,{default:l(()=>[e(P,null,{default:l(()=>[e(V,{dense:"",label:"Item Code",filled:"",modelValue:o.TSLODETA_ITMCD,"onUpdate:modelValue":R=>o.TSLODETA_ITMCD=R,readonly:""},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1024)]),_:2},1024),e(M,null,{default:l(()=>[e(P,null,{default:l(()=>[e(V,{dense:"",label:"Item Name",filled:"",modelValue:o.MITM_ITMNM,"onUpdate:modelValue":R=>o.MITM_ITMNM=R,readonly:""},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1024)]),_:2},1024),e(M,{side:""},{default:l(()=>[e(L,{icon:"delete",color:"red",flat:"",onClick:R=>c(x)},null,8,["onClick"])]),_:2},1024)]),_:2},1032,["loading"]))),128)):j((p(),w(G,{key:1,class:"q-my-sm",clickable:""},{default:l(()=>[e(M,null,{default:l(()=>[e(P,null,{default:l(()=>[S(" Choose sales order first to access item list ")]),_:1})]),_:1})]),_:1})),[[fe]])]),_:1})])]),_:1}),e(W,{align:"right"},{default:l(()=>[e(L,{label:"OK",color:"primary",onClick:t[6]||(t[6]=o=>g())}),e(L,{flat:"",label:"Cancel",color:"red",onClick:q(te)},null,8,["onClick"])]),_:1})]),_:1})]),_:1},8,["onHide"]))}},Ee={class:"q-pa-md"},ze={class:"row q-pb-md"},He=a("div",{class:"col"},[a("span",{class:"text-h4"},"Outgoing")],-1),Ke={class:"col text-right"},Ye={class:"row q-pt-md"},je={class:"col"},tl={__name:"outgoingView",setup(d){const f=z(),i=s([]),_=s([{name:"TDLVORD_DLVCD",label:"Delivery ID",field:"TDLVORD_DLVCD",sortable:!0,align:"left"},{name:"MCUS_CUSNM",label:"Customer Name",field:"MCUS_CUSNM",sortable:!0,align:"left"},{name:"TDLVORD_ISSUDT",label:"Issue Date",field:"TDLVORD_ISSUDT",sortable:!0,align:"left"},{name:"TDLVORD_REMARK",label:"Remark",field:"TDLVORD_REMARK",sortable:!0,align:"left"}]),r=s(!1),v=s(""),D=s("");F(()=>{b()});const b=async()=>{r.value=!0,await H.post("delivery/searchAPI",{searchBy:v.value,searchValue:D.value}).then(g=>{r.value=!1,i.value=g.data.data}).catch(g=>{r.value=!1})},h=()=>{f.dialog({component:Be}).onOk(async g=>{b()})};return(g,u)=>(p(),O("div",Ee,[a("div",ze,[He,a("div",Ke,[e(L,{icon:"add",color:"blue",onClick:h},{default:l(()=>[e(K,null,{default:l(()=>[S("Create New Delivery")]),_:1})]),_:1})])]),e(_e),a("div",Ye,[a("div",je,[e(ee,{title:"Outgoing List",rows:i.value,columns:_.value,"row-key":"TDLVORD_DLVCD",loading:r.value,dense:"",pagination:{rowsPerPage:20},class:"my-sticky-header-column-table"},{"top-right":l(()=>[e(le,{outlined:"",modelValue:v.value,"onUpdate:modelValue":u[0]||(u[0]=n=>v.value=n),options:_.value,label:"Search Columns","option-value":"name","option-label":"label","emit-value":"",dense:"","map-options":""},null,8,["modelValue","options"]),e(V,{borderless:"",dense:"",modelValue:D.value,"onUpdate:modelValue":[u[1]||(u[1]=n=>D.value=n),u[2]||(u[2]=n=>b())],placeholder:"Search",outlined:"",debounce:"1000"},{append:l(()=>[e(E,{name:"search"})]),_:1},8,["modelValue"])]),header:l(n=>[e(N,{props:n},{default:l(()=>[(p(!0),O(Q,null,U(n.cols,c=>(p(),w(A,{key:c.name,props:n},{default:l(()=>[S(I(c.label),1)]),_:2},1032,["props"]))),128)),e(A,{"auto-width":""},{default:l(()=>[S("Action")]),_:1})]),_:2},1032,["props"])]),body:l(n=>[e(N,{props:n},{default:l(()=>[(p(!0),O(Q,null,U(n.cols,c=>(p(),w(B,{key:c.name,props:n},{default:l(()=>[S(I(c.value),1)]),_:2},1032,["props"]))),128)),e(B,{"auto-width":""},{default:l(()=>[e(L,{flat:"",color:"orange",icon:"edit",onClick:u[3]||(u[3]=c=>g.onEdit()),dense:""},{default:l(()=>[e(K,null,{default:l(()=>[S("Edit Data")]),_:1})]),_:1})]),_:1})]),_:2},1032,["props"])]),_:1},8,["rows","columns","loading"])])])]))}};export{tl as default};
