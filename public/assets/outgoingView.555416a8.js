import{Q as H}from"./QTooltip.6f2020b0.js";import{h as S,c as J,K as de,L as re,ai as ie,a2 as ue,ak as ce,a6 as me,a as j,ab as ve,g as _e,be as fe,t as d,o as z,C as D,D as w,E as l,F as e,M as W,O as q,J as a,$ as O,an as K,R,S as Q,T as I,I as V,P as U,X,Q as y,Y as A,Z,U as F,V as pe,W as De,aY as ge}from"./index.62fde6ab.js";import{a as Y,u as ee,k as le,l as ae,m as E,Q as Ce,b as G,c as k,d as M}from"./QTable.cb6a1370.js";import{Q as P,a as B}from"./QTd.972012bf.js";import{api_web as $}from"./axios.bc42db58.js";import{Q as Ve,a as be,C as Le}from"./ClosePopup.b9eb6795.js";import"./use-render-cache.3aae9b27.js";import"./date.b5d23ec2.js";const Se=[S("g",{transform:"translate(-20,-20)"},[S("path",{d:"M79.9,52.6C80,51.8,80,50.9,80,50s0-1.8-0.1-2.6l-5.1-0.4c-0.3-2.4-0.9-4.6-1.8-6.7l4.2-2.9c-0.7-1.6-1.6-3.1-2.6-4.5 L70,35c-1.4-1.9-3.1-3.5-4.9-4.9l2.2-4.6c-1.4-1-2.9-1.9-4.5-2.6L59.8,27c-2.1-0.9-4.4-1.5-6.7-1.8l-0.4-5.1C51.8,20,50.9,20,50,20 s-1.8,0-2.6,0.1l-0.4,5.1c-2.4,0.3-4.6,0.9-6.7,1.8l-2.9-4.1c-1.6,0.7-3.1,1.6-4.5,2.6l2.1,4.6c-1.9,1.4-3.5,3.1-5,4.9l-4.5-2.1 c-1,1.4-1.9,2.9-2.6,4.5l4.1,2.9c-0.9,2.1-1.5,4.4-1.8,6.8l-5,0.4C20,48.2,20,49.1,20,50s0,1.8,0.1,2.6l5,0.4 c0.3,2.4,0.9,4.7,1.8,6.8l-4.1,2.9c0.7,1.6,1.6,3.1,2.6,4.5l4.5-2.1c1.4,1.9,3.1,3.5,5,4.9l-2.1,4.6c1.4,1,2.9,1.9,4.5,2.6l2.9-4.1 c2.1,0.9,4.4,1.5,6.7,1.8l0.4,5.1C48.2,80,49.1,80,50,80s1.8,0,2.6-0.1l0.4-5.1c2.3-0.3,4.6-0.9,6.7-1.8l2.9,4.2 c1.6-0.7,3.1-1.6,4.5-2.6L65,69.9c1.9-1.4,3.5-3,4.9-4.9l4.6,2.2c1-1.4,1.9-2.9,2.6-4.5L73,59.8c0.9-2.1,1.5-4.4,1.8-6.7L79.9,52.6 z M50,65c-8.3,0-15-6.7-15-15c0-8.3,6.7-15,15-15s15,6.7,15,15C65,58.3,58.3,65,50,65z",fill:"currentColor"},[S("animateTransform",{attributeName:"transform",type:"rotate",from:"90 50 50",to:"0 50 50",dur:"1s",repeatCount:"indefinite"})])]),S("g",{transform:"translate(20,20) rotate(15 50 50)"},[S("path",{d:"M79.9,52.6C80,51.8,80,50.9,80,50s0-1.8-0.1-2.6l-5.1-0.4c-0.3-2.4-0.9-4.6-1.8-6.7l4.2-2.9c-0.7-1.6-1.6-3.1-2.6-4.5 L70,35c-1.4-1.9-3.1-3.5-4.9-4.9l2.2-4.6c-1.4-1-2.9-1.9-4.5-2.6L59.8,27c-2.1-0.9-4.4-1.5-6.7-1.8l-0.4-5.1C51.8,20,50.9,20,50,20 s-1.8,0-2.6,0.1l-0.4,5.1c-2.4,0.3-4.6,0.9-6.7,1.8l-2.9-4.1c-1.6,0.7-3.1,1.6-4.5,2.6l2.1,4.6c-1.9,1.4-3.5,3.1-5,4.9l-4.5-2.1 c-1,1.4-1.9,2.9-2.6,4.5l4.1,2.9c-0.9,2.1-1.5,4.4-1.8,6.8l-5,0.4C20,48.2,20,49.1,20,50s0,1.8,0.1,2.6l5,0.4 c0.3,2.4,0.9,4.7,1.8,6.8l-4.1,2.9c0.7,1.6,1.6,3.1,2.6,4.5l4.5-2.1c1.4,1.9,3.1,3.5,5,4.9l-2.1,4.6c1.4,1,2.9,1.9,4.5,2.6l2.9-4.1 c2.1,0.9,4.4,1.5,6.7,1.8l0.4,5.1C48.2,80,49.1,80,50,80s1.8,0,2.6-0.1l0.4-5.1c2.3-0.3,4.6-0.9,6.7-1.8l2.9,4.2 c1.6-0.7,3.1-1.6,4.5-2.6L65,69.9c1.9-1.4,3.5-3,4.9-4.9l4.6,2.2c1-1.4,1.9-2.9,2.6-4.5L73,59.8c0.9-2.1,1.5-4.4,1.8-6.7L79.9,52.6 z M50,65c-8.3,0-15-6.7-15-15c0-8.3,6.7-15,15-15s15,6.7,15,15C65,58.3,58.3,65,50,65z",fill:"currentColor"},[S("animateTransform",{attributeName:"transform",type:"rotate",from:"0 50 50",to:"90 50 50",dur:"1s",repeatCount:"indefinite"})])])];var he=J({name:"QSpinnerGears",props:de,setup(m){const{cSize:_,classes:o}=re(m);return()=>S("svg",{class:o.value,width:_.value,height:_.value,viewBox:"0 0 100 100",preserveAspectRatio:"xMidYMid",xmlns:"http://www.w3.org/2000/svg"},Se)}}),Oe=J({name:"QInnerLoading",props:{...ie,...ue,showing:Boolean,color:String,size:{type:[String,Number],default:"42px"},label:String,labelClass:String,labelStyle:[String,Array,Object]},setup(m,{slots:_}){const o=_e(),s=ce(m,o.proxy.$q),{transitionProps:i,transitionStyle:b}=me(m),L=j(()=>"q-inner-loading q--avoid-card-border absolute-full column flex-center"+(s.value===!0?" q-inner-loading--dark":"")),f=j(()=>"q-inner-loading__label"+(m.labelClass!==void 0?` ${m.labelClass}`:""));function g(){const u=[S(fe,{size:m.size,color:m.color})];return m.label!==void 0&&u.push(S("div",{class:f.value,style:m.labelStyle},[m.label])),u}function h(){return m.showing===!0?S("div",{class:L.value,style:b.value},_.default!==void 0?_.default():g()):null}return()=>S(ve,i.value,h)}});const ye=a("div",{class:"text-h6"},"Sales Order Choose",-1),Te={class:"row"},we={class:"col"},ke={__name:"salesOrderChoose",setup(m){Y();const _=d([]),o=d([{name:"TSLO_SLOCD",label:"Sales Ord Code",field:"TSLO_SLOCD",sortable:!0,align:"left"},{name:"MCUS_CUSNM",label:"Customer Name",field:"MCUS_CUSNM",sortable:!0,align:"left"},{name:"TSLO_PLAN_DLVDT",label:"DLV Plan Date",field:"TSLO_PLAN_DLVDT",sortable:!0,align:"left"}]),s=d(!1),i=d(""),b=d("");z(()=>{L()});const L=async()=>{s.value=!0,await $.post("delivery/outstanding-warehouse-api",{searchBy:i.value,searchValue:b.value}).then(t=>{s.value=!1,_.value=t.data.data}).catch(t=>{s.value=!1})},f=t=>{u(t)},{dialogRef:g,onDialogHide:h,onDialogOK:u,onDialogCancel:n}=ee();return(t,v)=>(D(),w(Z,{ref_key:"dialogRef",ref:g,onHide:A(h),"transition-show":"slide-up","transition-hide":"slide-down","full-width":"",persistent:""},{default:l(()=>[e(W,{class:"q-dialog-plugin bg-white q-pa-sm"},{default:l(()=>[e(q,null,{default:l(()=>[ye]),_:1}),e(q,{class:"q-pa-sm"},{default:l(()=>[a("div",Te,[a("div",we,[e(le,{title:"Outgoing List",rows:_.value,columns:o.value,"row-key":"TDLVORD_DLVCD",loading:s.value,dense:"",pagination:{rowsPerPage:20},class:"my-sticky-header-column-table"},{"top-right":l(()=>[e(ae,{outlined:"",modelValue:i.value,"onUpdate:modelValue":v[0]||(v[0]=p=>i.value=p),options:o.value,label:"Search Columns","option-value":"name","option-label":"label","emit-value":"",dense:"","map-options":""},null,8,["modelValue","options"]),e(O,{borderless:"",dense:"",modelValue:b.value,"onUpdate:modelValue":[v[1]||(v[1]=p=>b.value=p),v[2]||(v[2]=p=>t.getOutgoingData())],placeholder:"Search",outlined:"",debounce:"1000"},{append:l(()=>[e(K,{name:"search"})]),_:1},8,["modelValue"])]),header:l(p=>[e(P,{props:p},{default:l(()=>[(D(!0),R(Q,null,I(p.cols,T=>(D(),w(E,{key:T.name,props:p},{default:l(()=>[V(U(T.label),1)]),_:2},1032,["props"]))),128))]),_:2},1032,["props"])]),body:l(p=>[e(P,{props:p,onClick:T=>f(p.row)},{default:l(()=>[(D(!0),R(Q,null,I(p.cols,T=>(D(),w(B,{key:T.name,props:p},{default:l(()=>[V(U(T.value),1)]),_:2},1032,["props"]))),128))]),_:2},1032,["props","onClick"])]),_:1},8,["rows","columns","loading"])])])]),_:1}),e(X,{align:"right"},{default:l(()=>[e(y,{flat:"",label:"Cancel",color:"red",onClick:A(n)},null,8,["onClick"])]),_:1})]),_:1})]),_:1},8,["onHide"]))}},Re=a("div",{class:"text-h6"},"Create Outgoing Delivery",-1),Ue={style:{border:"1px black solid","border-radius":"10px"}},Me=a("legend",{style:{"margin-left":"1em",padding:"0.2em 0.8em"}},[a("b",null,"Header")],-1),Qe={class:"row"},Ie={class:"col"},$e={class:"col q-pl-md"},Ne={class:"row items-center justify-end"},qe={class:"row q-pt-md"},Ae={class:"col"},Pe={class:"col q-pl-md"},xe={class:"row q-pt-md"},He={class:"col"},Ee={style:{border:"1px black solid","border-radius":"10px",height:"35vh",overflow:"auto"}},Be=a("legend",{style:{"margin-left":"1em",padding:"0.2em 0.8em"}},[a("b",null,"List Of Items")],-1),ze={__name:"outgoingCreate",props:{dataHeader:Array},setup(m){const _=Y(),o=m;z(()=>{Object.values(o.dataHeader).length>0&&(console.log(o.dataHeader),i.value=o.dataHeader.TDLVORD_DLVCD,b.value=o.dataHeader.TDLVORD_INVCD,L.value=o.dataHeader.TDLVORD_CUSCD,f.value=o.dataHeader.TDLVORD_ISSUDT,g.value=o.dataHeader.TDLVORDDETA_SLOCD,h.value=o.dataHeader.MCUS_CUSNM,u.value=o.dataHeader.TDLVORD_REMARK,n.value=o.dataHeader.listItems)});const s=d(!1),i=d(""),b=d(""),L=d(""),f=d(""),g=d(""),h=d(""),u=d(""),n=d([]),t=()=>{_.dialog({title:"Confirmation",message:"Are you sure wan to save this outgoing ?",cancel:!0,persistent:!0}).onOk(async()=>{s.value=!0,await $.post("delivery",{TDLVORD_DLVCD:i.value,TDLVORD_CUSCD:L.value,TDLVORD_ISSUDT:f.value,TDLVORDDETA_SLOCD:g.value,TDLVORD_REMARK:u.value,SO_DET:n.value}).then(C=>{s.value=!1,se()}).catch(C=>{s.value=!1})})},v=()=>{_.dialog({component:ke}).onOk(async C=>{g.value=C.TSLO_SLOCD,h.value=C.MCUS_CUSNM,L.value=C.TSLO_CUSCD,p(C.TSLO_SLOCD)})},p=async C=>{s.value=!0,await $.get(`delivery/outstanding-warehouse/${btoa(C)}`).then(c=>{s.value=!1,n.value=c.data.data}).catch(c=>{s.value=!1})},T=C=>{_.dialog({title:"Confirmation",message:`Do you want to delete this lines no ${C+1} ?`,cancel:!0,persistent:!0}).onOk(async()=>{n.value.splice(C,1)})},{dialogRef:te,onDialogHide:oe,onDialogOK:se,onDialogCancel:ne}=ee();return(C,c)=>(D(),w(Z,{ref_key:"dialogRef",ref:te,onHide:A(oe),"transition-show":"slide-up","transition-hide":"slide-down","full-width":"",persistent:""},{default:l(()=>[e(W,{class:"q-dialog-plugin bg-white q-pa-sm"},{default:l(()=>[e(q,null,{default:l(()=>[Re]),_:1}),e(q,{class:"q-pa-sm"},{default:l(()=>[a("fieldset",Ue,[Me,e(Oe,{showing:s.value,dark:""},{default:l(()=>[e(he,{size:"50px",color:"primary"})]),_:1},8,["showing"]),a("div",Qe,[a("div",Ie,[e(O,{label:"Code",readonly:"",dense:"",filled:"",modelValue:i.value,"onUpdate:modelValue":c[0]||(c[0]=r=>i.value=r)},null,8,["modelValue"])]),a("div",$e,[e(O,{filled:"",modelValue:f.value,"onUpdate:modelValue":c[2]||(c[2]=r=>f.value=r),dense:"",label:"Issue Date"},{append:l(()=>[e(K,{name:"event",class:"cursor-pointer"},{default:l(()=>[e(Ve,{cover:"","transition-show":"scale","transition-hide":"scale"},{default:l(()=>[e(be,{modelValue:f.value,"onUpdate:modelValue":c[1]||(c[1]=r=>f.value=r),mask:"YYYY-MM-DD"},{default:l(()=>[a("div",Ne,[F(e(y,{label:"Close",color:"primary",flat:""},null,512),[[Le]])])]),_:1},8,["modelValue"])]),_:1})]),_:1})]),_:1},8,["modelValue"])])]),a("div",qe,[a("div",Ae,[e(O,{modelValue:g.value,"onUpdate:modelValue":c[3]||(c[3]=r=>g.value=r),label:"Sales Order",dense:"",readonly:""},{append:l(()=>[e(y,{round:"",dense:"",flat:"",icon:"search",onClick:v})]),_:1},8,["modelValue"])]),a("div",Pe,[e(O,{modelValue:h.value,"onUpdate:modelValue":c[4]||(c[4]=r=>h.value=r),label:"Customer",dense:"",readonly:""},null,8,["modelValue"])])]),a("div",xe,[a("div",He,[e(O,{modelValue:u.value,"onUpdate:modelValue":c[5]||(c[5]=r=>u.value=r),label:"Remarks",dense:""},null,8,["modelValue"])])])]),a("fieldset",Ee,[Be,e(Ce,{bordered:"",dense:""},{default:l(()=>[n.value.length>0?(D(!0),R(Q,{key:0},I(n.value,(r,x)=>(D(),w(G,{key:x,class:"q-my-sm",dense:"",loading:s.value},{default:l(()=>[e(k,{avatar:""},{default:l(()=>[e(pe,{"text-color":"blue"},{default:l(()=>[V(U(x+1),1)]),_:2},1024)]),_:2},1024),e(k,null,{default:l(()=>[e(M,null,{default:l(()=>[e(O,{dense:"",label:"Item Name",filled:"",modelValue:r.MITM_ITMNM,"onUpdate:modelValue":N=>r.MITM_ITMNM=N,readonly:""},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1024)]),_:2},1024),e(k,null,{default:l(()=>[e(M,null,{default:l(()=>[e(O,{dense:"",label:"Qty",filled:"",modelValue:r.BALQT,"onUpdate:modelValue":N=>r.BALQT=N},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1024)]),_:2},1024),e(k,null,{default:l(()=>[e(M,null,{default:l(()=>[V(" Rp. "+U(r.TSLODETA_PRC.toLocaleString()),1)]),_:2},1024),e(M,{caption:""},{default:l(()=>[V(" Price ")]),_:1})]),_:2},1024),e(k,{side:""},{default:l(()=>[e(y,{icon:"delete",color:"red",flat:"",onClick:N=>T(x)},null,8,["onClick"])]),_:2},1024)]),_:2},1032,["loading"]))),128)):F((D(),w(G,{key:1,class:"q-my-sm",clickable:""},{default:l(()=>[e(k,null,{default:l(()=>[e(M,null,{default:l(()=>[V(" Choose sales order first to access item list ")]),_:1})]),_:1})]),_:1})),[[De]])]),_:1})])]),_:1}),e(X,{align:"right"},{default:l(()=>[e(y,{label:"OK",color:"primary",onClick:c[6]||(c[6]=r=>t()),loading:s.value},null,8,["loading"]),e(y,{flat:"",label:"Cancel",color:"red",onClick:A(ne)},null,8,["onClick"])]),_:1})]),_:1})]),_:1},8,["onHide"]))}},Ke={class:"q-pa-md"},Ye={class:"row q-pb-md"},je=a("div",{class:"col"},[a("span",{class:"text-h4"},"Outgoing")],-1),Fe={class:"col text-right"},Ge={class:"row q-pt-md"},Je={class:"col"},sl={__name:"outgoingView",setup(m){const _=Y(),o=d([]),s=d([{name:"TDLVORD_DLVCD",label:"Delivery ID",field:"TDLVORD_DLVCD",sortable:!0,align:"left"},{name:"MCUS_CUSNM",label:"Customer Name",field:"MCUS_CUSNM",sortable:!0,align:"left"},{name:"TDLVORD_ISSUDT",label:"Issue Date",field:"TDLVORD_ISSUDT",sortable:!0,align:"left"},{name:"TDLVORD_REMARK",label:"Remark",field:"TDLVORD_REMARK",sortable:!0,align:"left"}]),i=d(!1),b=d(""),L=d("");z(()=>{f()});const f=async()=>{i.value=!0,await $.post("delivery/searchAPI",{searchBy:b.value,searchValue:L.value}).then(u=>{i.value=!1,o.value=u.data.data}).catch(u=>{i.value=!1})},g=(u=[])=>{_.dialog({component:ze,componentProps:{dataHeader:u}}).onOk(async n=>{f()})},h=u=>{_.dialog({title:"Confirmation",message:"Are you sure want to delete this data ?",cancel:!0,persistent:!0}).onOk(async()=>{i.value=!0,await $.delete(`delivery/${btoa(u)}`).then(n=>{i.value=!1,f()})})};return(u,n)=>(D(),R("div",Ke,[a("div",Ye,[je,a("div",Fe,[e(y,{icon:"add",color:"blue",onClick:n[0]||(n[0]=t=>g([]))},{default:l(()=>[e(H,null,{default:l(()=>[V("Create New Delivery")]),_:1})]),_:1})])]),e(ge),a("div",Ge,[a("div",Je,[e(le,{title:"Outgoing List",rows:o.value,columns:s.value,"row-key":"TDLVORD_DLVCD",loading:i.value,dense:"",pagination:{rowsPerPage:20},class:"my-sticky-header-column-table"},{"top-right":l(()=>[e(ae,{outlined:"",modelValue:b.value,"onUpdate:modelValue":n[1]||(n[1]=t=>b.value=t),options:s.value,label:"Search Columns","option-value":"name","option-label":"label","emit-value":"",dense:"","map-options":""},null,8,["modelValue","options"]),e(O,{borderless:"",dense:"",modelValue:L.value,"onUpdate:modelValue":[n[2]||(n[2]=t=>L.value=t),n[3]||(n[3]=t=>f())],placeholder:"Search",outlined:"",debounce:"1000"},{append:l(()=>[e(K,{name:"search"})]),_:1},8,["modelValue"])]),header:l(t=>[e(P,{props:t},{default:l(()=>[(D(!0),R(Q,null,I(t.cols,v=>(D(),w(E,{key:v.name,props:t},{default:l(()=>[V(U(v.label),1)]),_:2},1032,["props"]))),128)),e(E,{"auto-width":""},{default:l(()=>[V("Action")]),_:1})]),_:2},1032,["props"])]),body:l(t=>[e(P,{props:t},{default:l(()=>[(D(!0),R(Q,null,I(t.cols,v=>(D(),w(B,{key:v.name,props:t},{default:l(()=>[V(U(v.value),1)]),_:2},1032,["props"]))),128)),e(B,{"auto-width":""},{default:l(()=>[e(y,{flat:"",color:"orange",icon:"edit",onClick:v=>g(t.row),dense:""},{default:l(()=>[e(H,null,{default:l(()=>[V("Edit Data")]),_:1})]),_:2},1032,["onClick"]),e(y,{flat:"",color:"red",icon:"delete",onClick:v=>h(t.row.TDLVORD_DLVCD),dense:""},{default:l(()=>[e(H,null,{default:l(()=>[V("Edit Data")]),_:1})]),_:2},1032,["onClick"])]),_:2},1024)]),_:2},1032,["props"])]),_:1},8,["rows","columns","loading"])])])]))}};export{sl as default};
