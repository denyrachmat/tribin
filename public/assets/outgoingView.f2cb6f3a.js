import{Q as x}from"./QTooltip.09c9d372.js";import{h as S,c as F,J as de,K as re,ah as ue,a1 as ie,aj as ce,a5 as me,a as j,aa as _e,g as fe,bd as pe,s as r,o as z,B as D,C as w,D as l,E as e,L as J,M as N,I as a,Z as T,am as K,P as M,R as I,S as $,H as V,O as Q,W,Q as O,X as q,Y as Z,T as G,U as ve,V as De,aX as ge}from"./index.338346b3.js";import{u as Y,j as ee,k as le,l as E,Q as Ce,a as X,b as k,c as U}from"./QTable.f49cfbe4.js";import{Q as H,a as B}from"./QTd.8fd56c30.js";import{api_web as A}from"./axios.16557c16.js";import{Q as Ve,a as be,C as Le}from"./ClosePopup.cbb44a26.js";import{u as ae}from"./use-dialog-plugin-component.6a651287.js";import"./use-cache.b0833c75.js";import"./date.7472fa8f.js";const Se=[S("g",{transform:"translate(-20,-20)"},[S("path",{d:"M79.9,52.6C80,51.8,80,50.9,80,50s0-1.8-0.1-2.6l-5.1-0.4c-0.3-2.4-0.9-4.6-1.8-6.7l4.2-2.9c-0.7-1.6-1.6-3.1-2.6-4.5 L70,35c-1.4-1.9-3.1-3.5-4.9-4.9l2.2-4.6c-1.4-1-2.9-1.9-4.5-2.6L59.8,27c-2.1-0.9-4.4-1.5-6.7-1.8l-0.4-5.1C51.8,20,50.9,20,50,20 s-1.8,0-2.6,0.1l-0.4,5.1c-2.4,0.3-4.6,0.9-6.7,1.8l-2.9-4.1c-1.6,0.7-3.1,1.6-4.5,2.6l2.1,4.6c-1.9,1.4-3.5,3.1-5,4.9l-4.5-2.1 c-1,1.4-1.9,2.9-2.6,4.5l4.1,2.9c-0.9,2.1-1.5,4.4-1.8,6.8l-5,0.4C20,48.2,20,49.1,20,50s0,1.8,0.1,2.6l5,0.4 c0.3,2.4,0.9,4.7,1.8,6.8l-4.1,2.9c0.7,1.6,1.6,3.1,2.6,4.5l4.5-2.1c1.4,1.9,3.1,3.5,5,4.9l-2.1,4.6c1.4,1,2.9,1.9,4.5,2.6l2.9-4.1 c2.1,0.9,4.4,1.5,6.7,1.8l0.4,5.1C48.2,80,49.1,80,50,80s1.8,0,2.6-0.1l0.4-5.1c2.3-0.3,4.6-0.9,6.7-1.8l2.9,4.2 c1.6-0.7,3.1-1.6,4.5-2.6L65,69.9c1.9-1.4,3.5-3,4.9-4.9l4.6,2.2c1-1.4,1.9-2.9,2.6-4.5L73,59.8c0.9-2.1,1.5-4.4,1.8-6.7L79.9,52.6 z M50,65c-8.3,0-15-6.7-15-15c0-8.3,6.7-15,15-15s15,6.7,15,15C65,58.3,58.3,65,50,65z",fill:"currentColor"},[S("animateTransform",{attributeName:"transform",type:"rotate",from:"90 50 50",to:"0 50 50",dur:"1s",repeatCount:"indefinite"})])]),S("g",{transform:"translate(20,20) rotate(15 50 50)"},[S("path",{d:"M79.9,52.6C80,51.8,80,50.9,80,50s0-1.8-0.1-2.6l-5.1-0.4c-0.3-2.4-0.9-4.6-1.8-6.7l4.2-2.9c-0.7-1.6-1.6-3.1-2.6-4.5 L70,35c-1.4-1.9-3.1-3.5-4.9-4.9l2.2-4.6c-1.4-1-2.9-1.9-4.5-2.6L59.8,27c-2.1-0.9-4.4-1.5-6.7-1.8l-0.4-5.1C51.8,20,50.9,20,50,20 s-1.8,0-2.6,0.1l-0.4,5.1c-2.4,0.3-4.6,0.9-6.7,1.8l-2.9-4.1c-1.6,0.7-3.1,1.6-4.5,2.6l2.1,4.6c-1.9,1.4-3.5,3.1-5,4.9l-4.5-2.1 c-1,1.4-1.9,2.9-2.6,4.5l4.1,2.9c-0.9,2.1-1.5,4.4-1.8,6.8l-5,0.4C20,48.2,20,49.1,20,50s0,1.8,0.1,2.6l5,0.4 c0.3,2.4,0.9,4.7,1.8,6.8l-4.1,2.9c0.7,1.6,1.6,3.1,2.6,4.5l4.5-2.1c1.4,1.9,3.1,3.5,5,4.9l-2.1,4.6c1.4,1,2.9,1.9,4.5,2.6l2.9-4.1 c2.1,0.9,4.4,1.5,6.7,1.8l0.4,5.1C48.2,80,49.1,80,50,80s1.8,0,2.6-0.1l0.4-5.1c2.3-0.3,4.6-0.9,6.7-1.8l2.9,4.2 c1.6-0.7,3.1-1.6,4.5-2.6L65,69.9c1.9-1.4,3.5-3,4.9-4.9l4.6,2.2c1-1.4,1.9-2.9,2.6-4.5L73,59.8c0.9-2.1,1.5-4.4,1.8-6.7L79.9,52.6 z M50,65c-8.3,0-15-6.7-15-15c0-8.3,6.7-15,15-15s15,6.7,15,15C65,58.3,58.3,65,50,65z",fill:"currentColor"},[S("animateTransform",{attributeName:"transform",type:"rotate",from:"0 50 50",to:"90 50 50",dur:"1s",repeatCount:"indefinite"})])])];var he=F({name:"QSpinnerGears",props:de,setup(m){const{cSize:f,classes:o}=re(m);return()=>S("svg",{class:o.value,width:f.value,height:f.value,viewBox:"0 0 100 100",preserveAspectRatio:"xMidYMid",xmlns:"http://www.w3.org/2000/svg"},Se)}}),Te=F({name:"QInnerLoading",props:{...ue,...ie,showing:Boolean,color:String,size:{type:[String,Number],default:42},label:String,labelClass:String,labelStyle:[String,Array,Object]},setup(m,{slots:f}){const o=fe(),n=ce(m,o.proxy.$q),{transitionProps:u,transitionStyle:b}=me(m),L=j(()=>"q-inner-loading absolute-full column flex-center"+(n.value===!0?" q-inner-loading--dark":"")),p=j(()=>"q-inner-loading__label"+(m.labelClass!==void 0?` ${m.labelClass}`:""));function g(){const i=[S(pe,{size:m.size,color:m.color})];return m.label!==void 0&&i.push(S("div",{class:p.value,style:m.labelStyle},[m.label])),i}function h(){return m.showing===!0?S("div",{class:L.value,style:b.value},f.default!==void 0?f.default():g()):null}return()=>S(_e,u.value,h)}});const Oe=a("div",{class:"text-h6"},"Sales Order Choose",-1),ye={class:"row"},we={class:"col"},ke={__name:"salesOrderChoose",setup(m){Y();const f=r([]),o=r([{name:"TSLO_SLOCD",label:"Sales Ord Code",field:"TSLO_SLOCD",sortable:!0,align:"left"},{name:"MCUS_CUSNM",label:"Customer Name",field:"MCUS_CUSNM",sortable:!0,align:"left"},{name:"TSLO_PLAN_DLVDT",label:"DLV Plan Date",field:"TSLO_PLAN_DLVDT",sortable:!0,align:"left"}]),n=r(!1),u=r(""),b=r("");z(()=>{L()});const L=async()=>{n.value=!0,await A.post("delivery/outstanding-warehouse-api",{searchBy:u.value,searchValue:b.value}).then(t=>{n.value=!1,f.value=t.data.data}).catch(t=>{n.value=!1})},p=t=>{i(t)},{dialogRef:g,onDialogHide:h,onDialogOK:i,onDialogCancel:d}=ae();return(t,_)=>(D(),w(Z,{ref_key:"dialogRef",ref:g,onHide:q(h),"transition-show":"slide-up","transition-hide":"slide-down","full-width":"",persistent:""},{default:l(()=>[e(J,{class:"q-dialog-plugin bg-white q-pa-sm"},{default:l(()=>[e(N,null,{default:l(()=>[Oe]),_:1}),e(N,{class:"q-pa-sm"},{default:l(()=>[a("div",ye,[a("div",we,[e(ee,{title:"Outgoing List",rows:f.value,columns:o.value,"row-key":"TDLVORD_DLVCD",loading:n.value,dense:"",pagination:{rowsPerPage:20},class:"my-sticky-header-column-table"},{"top-right":l(()=>[e(le,{outlined:"",modelValue:u.value,"onUpdate:modelValue":_[0]||(_[0]=v=>u.value=v),options:o.value,label:"Search Columns","option-value":"name","option-label":"label","emit-value":"",dense:"","map-options":""},null,8,["modelValue","options"]),e(T,{borderless:"",dense:"",modelValue:b.value,"onUpdate:modelValue":[_[1]||(_[1]=v=>b.value=v),_[2]||(_[2]=v=>t.getOutgoingData())],placeholder:"Search",outlined:"",debounce:"1000"},{append:l(()=>[e(K,{name:"search"})]),_:1},8,["modelValue"])]),header:l(v=>[e(H,{props:v},{default:l(()=>[(D(!0),M(I,null,$(v.cols,y=>(D(),w(E,{key:y.name,props:v},{default:l(()=>[V(Q(y.label),1)]),_:2},1032,["props"]))),128))]),_:2},1032,["props"])]),body:l(v=>[e(H,{props:v,onClick:y=>p(v.row)},{default:l(()=>[(D(!0),M(I,null,$(v.cols,y=>(D(),w(B,{key:y.name,props:v},{default:l(()=>[V(Q(y.value),1)]),_:2},1032,["props"]))),128))]),_:2},1032,["props","onClick"])]),_:1},8,["rows","columns","loading"])])])]),_:1}),e(W,{align:"right"},{default:l(()=>[e(O,{flat:"",label:"Cancel",color:"red",onClick:q(d)},null,8,["onClick"])]),_:1})]),_:1})]),_:1},8,["onHide"]))}},Re=a("div",{class:"text-h6"},"Create Outgoing Delivery",-1),Ue={style:{border:"1px black solid","border-radius":"10px"}},Me=a("legend",{style:{"margin-left":"1em",padding:"0.2em 0.8em"}},[a("b",null,"Header")],-1),Qe={class:"row"},Ie={class:"col"},$e={class:"col q-pl-md"},Ae={class:"row items-center justify-end"},Ne={class:"row q-pt-md"},qe={class:"col"},He={class:"col q-pl-md"},Pe={class:"row q-pt-md"},xe={class:"col"},Ee={style:{border:"1px black solid","border-radius":"10px",height:"35vh",overflow:"auto"}},Be=a("legend",{style:{"margin-left":"1em",padding:"0.2em 0.8em"}},[a("b",null,"List Of Items")],-1),ze={__name:"outgoingCreate",props:{dataHeader:Array},setup(m){const f=Y(),o=m;z(()=>{Object.values(o.dataHeader).length>0&&(console.log(o.dataHeader),u.value=o.dataHeader.TDLVORD_DLVCD,b.value=o.dataHeader.TDLVORD_INVCD,L.value=o.dataHeader.TDLVORD_CUSCD,p.value=o.dataHeader.TDLVORD_ISSUDT,g.value=o.dataHeader.TDLVORDDETA_SLOCD,h.value=o.dataHeader.MCUS_CUSNM,i.value=o.dataHeader.TDLVORD_REMARK,d.value=o.dataHeader.listItems)});const n=r(!1),u=r(""),b=r(""),L=r(""),p=r(""),g=r(""),h=r(""),i=r(""),d=r([]),t=()=>{f.dialog({title:"Confirmation",message:"Are you sure wan to save this outgoing ?",cancel:!0,persistent:!0}).onOk(async()=>{n.value=!0,await A.post("delivery",{TDLVORD_DLVCD:u.value,TDLVORD_CUSCD:L.value,TDLVORD_ISSUDT:p.value,TDLVORDDETA_SLOCD:g.value,TDLVORD_REMARK:i.value,SO_DET:d.value}).then(C=>{n.value=!1,se()}).catch(C=>{n.value=!1})})},_=()=>{f.dialog({component:ke}).onOk(async C=>{g.value=C.TSLO_SLOCD,h.value=C.MCUS_CUSNM,L.value=C.TSLO_CUSCD,v(C.TSLO_SLOCD)})},v=async C=>{n.value=!0,await A.get(`delivery/outstanding-warehouse/${btoa(C)}`).then(c=>{n.value=!1,d.value=c.data.data}).catch(c=>{n.value=!1})},y=C=>{f.dialog({title:"Confirmation",message:`Do you want to delete this lines no ${C+1} ?`,cancel:!0,persistent:!0}).onOk(async()=>{d.value.splice(C,1)})},{dialogRef:te,onDialogHide:oe,onDialogOK:se,onDialogCancel:ne}=ae();return(C,c)=>(D(),w(Z,{ref_key:"dialogRef",ref:te,onHide:q(oe),"transition-show":"slide-up","transition-hide":"slide-down","full-width":"",persistent:""},{default:l(()=>[e(J,{class:"q-dialog-plugin bg-white q-pa-sm"},{default:l(()=>[e(N,null,{default:l(()=>[Re]),_:1}),e(N,{class:"q-pa-sm"},{default:l(()=>[a("fieldset",Ue,[Me,e(Te,{showing:n.value,dark:""},{default:l(()=>[e(he,{size:"50px",color:"primary"})]),_:1},8,["showing"]),a("div",Qe,[a("div",Ie,[e(T,{label:"Code",readonly:"",dense:"",filled:"",modelValue:u.value,"onUpdate:modelValue":c[0]||(c[0]=s=>u.value=s)},null,8,["modelValue"])]),a("div",$e,[e(T,{filled:"",modelValue:p.value,"onUpdate:modelValue":c[2]||(c[2]=s=>p.value=s),dense:"",label:"Issue Date"},{append:l(()=>[e(K,{name:"event",class:"cursor-pointer"},{default:l(()=>[e(Ve,{cover:"","transition-show":"scale","transition-hide":"scale"},{default:l(()=>[e(be,{modelValue:p.value,"onUpdate:modelValue":c[1]||(c[1]=s=>p.value=s),mask:"YYYY-MM-DD"},{default:l(()=>[a("div",Ae,[G(e(O,{label:"Close",color:"primary",flat:""},null,512),[[Le]])])]),_:1},8,["modelValue"])]),_:1})]),_:1})]),_:1},8,["modelValue"])])]),a("div",Ne,[a("div",qe,[e(T,{modelValue:g.value,"onUpdate:modelValue":c[3]||(c[3]=s=>g.value=s),label:"Sales Order",dense:"",readonly:""},{append:l(()=>[e(O,{round:"",dense:"",flat:"",icon:"search",onClick:_})]),_:1},8,["modelValue"])]),a("div",He,[e(T,{modelValue:h.value,"onUpdate:modelValue":c[4]||(c[4]=s=>h.value=s),label:"Customer",dense:"",readonly:""},null,8,["modelValue"])])]),a("div",Pe,[a("div",xe,[e(T,{modelValue:i.value,"onUpdate:modelValue":c[5]||(c[5]=s=>i.value=s),label:"Remarks",dense:""},null,8,["modelValue"])])])]),a("fieldset",Ee,[Be,e(Ce,{bordered:"",dense:""},{default:l(()=>[d.value.length>0?(D(!0),M(I,{key:0},$(d.value,(s,P)=>(D(),w(X,{key:P,class:"q-my-sm",dense:"",loading:n.value},{default:l(()=>[e(k,{avatar:""},{default:l(()=>[e(ve,{"text-color":"blue"},{default:l(()=>[V(Q(P+1),1)]),_:2},1024)]),_:2},1024),e(k,null,{default:l(()=>[e(U,null,{default:l(()=>[e(T,{dense:"",label:"Item Code",filled:"",modelValue:s.TSLODETA_ITMCD,"onUpdate:modelValue":R=>s.TSLODETA_ITMCD=R,readonly:""},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1024)]),_:2},1024),e(k,null,{default:l(()=>[e(U,null,{default:l(()=>[e(T,{dense:"",label:"Item Name",filled:"",modelValue:s.MITM_ITMNM,"onUpdate:modelValue":R=>s.MITM_ITMNM=R,readonly:""},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1024)]),_:2},1024),e(k,null,{default:l(()=>[e(U,null,{default:l(()=>[e(T,{dense:"",label:"Qty",filled:"",modelValue:s.BALQT,"onUpdate:modelValue":R=>s.BALQT=R},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1024)]),_:2},1024),e(k,null,{default:l(()=>[e(U,null,{default:l(()=>[V(" Rp. "+Q(s.TSLODETA_PRC.toLocaleString()),1)]),_:2},1024),e(U,{caption:""},{default:l(()=>[V(" Price ")]),_:1})]),_:2},1024),e(k,{side:""},{default:l(()=>[e(O,{icon:"delete",color:"red",flat:"",onClick:R=>y(P)},null,8,["onClick"])]),_:2},1024)]),_:2},1032,["loading"]))),128)):G((D(),w(X,{key:1,class:"q-my-sm",clickable:""},{default:l(()=>[e(k,null,{default:l(()=>[e(U,null,{default:l(()=>[V(" Choose sales order first to access item list ")]),_:1})]),_:1})]),_:1})),[[De]])]),_:1})])]),_:1}),e(W,{align:"right"},{default:l(()=>[e(O,{label:"OK",color:"primary",onClick:c[6]||(c[6]=s=>t()),loading:n.value},null,8,["loading"]),e(O,{flat:"",label:"Cancel",color:"red",onClick:q(ne)},null,8,["onClick"])]),_:1})]),_:1})]),_:1},8,["onHide"]))}},Ke={class:"q-pa-md"},Ye={class:"row q-pb-md"},je=a("div",{class:"col"},[a("span",{class:"text-h4"},"Outgoing")],-1),Ge={class:"col text-right"},Xe={class:"row q-pt-md"},Fe={class:"col"},nl={__name:"outgoingView",setup(m){const f=Y(),o=r([]),n=r([{name:"TDLVORD_DLVCD",label:"Delivery ID",field:"TDLVORD_DLVCD",sortable:!0,align:"left"},{name:"MCUS_CUSNM",label:"Customer Name",field:"MCUS_CUSNM",sortable:!0,align:"left"},{name:"TDLVORD_ISSUDT",label:"Issue Date",field:"TDLVORD_ISSUDT",sortable:!0,align:"left"},{name:"TDLVORD_REMARK",label:"Remark",field:"TDLVORD_REMARK",sortable:!0,align:"left"}]),u=r(!1),b=r(""),L=r("");z(()=>{p()});const p=async()=>{u.value=!0,await A.post("delivery/searchAPI",{searchBy:b.value,searchValue:L.value}).then(i=>{u.value=!1,o.value=i.data.data}).catch(i=>{u.value=!1})},g=(i=[])=>{f.dialog({component:ze,componentProps:{dataHeader:i}}).onOk(async d=>{p()})},h=i=>{f.dialog({title:"Confirmation",message:"Are you sure want to delete this data ?",cancel:!0,persistent:!0}).onOk(async()=>{u.value=!0,await A.delete(`delivery/${btoa(i)}`).then(d=>{u.value=!1,p()})})};return(i,d)=>(D(),M("div",Ke,[a("div",Ye,[je,a("div",Ge,[e(O,{icon:"add",color:"blue",onClick:d[0]||(d[0]=t=>g([]))},{default:l(()=>[e(x,null,{default:l(()=>[V("Create New Delivery")]),_:1})]),_:1})])]),e(ge),a("div",Xe,[a("div",Fe,[e(ee,{title:"Outgoing List",rows:o.value,columns:n.value,"row-key":"TDLVORD_DLVCD",loading:u.value,dense:"",pagination:{rowsPerPage:20},class:"my-sticky-header-column-table"},{"top-right":l(()=>[e(le,{outlined:"",modelValue:b.value,"onUpdate:modelValue":d[1]||(d[1]=t=>b.value=t),options:n.value,label:"Search Columns","option-value":"name","option-label":"label","emit-value":"",dense:"","map-options":""},null,8,["modelValue","options"]),e(T,{borderless:"",dense:"",modelValue:L.value,"onUpdate:modelValue":[d[2]||(d[2]=t=>L.value=t),d[3]||(d[3]=t=>p())],placeholder:"Search",outlined:"",debounce:"1000"},{append:l(()=>[e(K,{name:"search"})]),_:1},8,["modelValue"])]),header:l(t=>[e(H,{props:t},{default:l(()=>[(D(!0),M(I,null,$(t.cols,_=>(D(),w(E,{key:_.name,props:t},{default:l(()=>[V(Q(_.label),1)]),_:2},1032,["props"]))),128)),e(E,{"auto-width":""},{default:l(()=>[V("Action")]),_:1})]),_:2},1032,["props"])]),body:l(t=>[e(H,{props:t},{default:l(()=>[(D(!0),M(I,null,$(t.cols,_=>(D(),w(B,{key:_.name,props:t},{default:l(()=>[V(Q(_.value),1)]),_:2},1032,["props"]))),128)),e(B,{"auto-width":""},{default:l(()=>[e(O,{flat:"",color:"orange",icon:"edit",onClick:_=>g(t.row),dense:""},{default:l(()=>[e(x,null,{default:l(()=>[V("Edit Data")]),_:1})]),_:2},1032,["onClick"]),e(O,{flat:"",color:"red",icon:"delete",onClick:_=>h(t.row.TDLVORD_DLVCD),dense:""},{default:l(()=>[e(x,null,{default:l(()=>[V("Edit Data")]),_:1})]),_:2},1032,["onClick"])]),_:2},1024)]),_:2},1032,["props"])]),_:1},8,["rows","columns","loading"])])])]))}};export{nl as default};
