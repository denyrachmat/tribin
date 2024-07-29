import{Q as h}from"./QTooltip.c6671772.js";import{t as C,o as S,C as f,D as T,E as o,F as a,M as E,O as V,J as t,$ as y,X as A,Q as v,Y as k,Z as B,R as D,aI as U,I as _,av as Y,S as I,T as R,P as w}from"./index.bb3bdf3f.js";import{Q as H}from"./QSelect.9c70f297.js";import{Q as K,a as $}from"./QTable.d7654b7c.js";import{Q as P,a as q}from"./QTd.6c6193cf.js";import{api_web as Q}from"./axios.6bccbf8a.js";import{u as F}from"./use-quasar.b791da39.js";import{Q as j,a as z}from"./QInnerLoading.70154785.js";import{u as G}from"./use-dialog-plugin-component.e95c77d8.js";import"./format.bc5263ff.js";import"./QItemLabel.4f8a9097.js";import"./QList.adf9b094.js";const J=t("div",{class:"text-h6"},"Create Location",-1),X={style:{border:"1px black solid","border-radius":"10px"}},Z=t("legend",{style:{"margin-left":"1em",padding:"0.2em 0.8em"}},[t("b",null,"Header")],-1),W={class:"row q-col-gutter-md"},ee={class:"col-12 col-sm-6"},ae={class:"col-12 col-sm-6"},oe={class:"row q-col-gutter-md q-pt-md"},le={class:"col-12 col-sm-12"},te={__name:"locationCreate",props:{dataHeader:Array},setup(N){const L=F(),c=N,r=C({MLOC_LOCCD:"",MLOC_LOCNM:"",MLOC_LOCPRNTCD:""}),n=C(!1),m=C([]);S(async()=>{await p(""),c.dataHeader&&Object.values(c.dataHeader).length>0&&(r.value={MLOC_LOCCD:c.dataHeader.MLOC_LOCCD,MLOC_LOCNM:c.dataHeader.MLOC_LOCNM,MLOC_LOCPRNTCD:c.dataHeader.MLOC_LOCPRNTCD})});const O=(l,s,i,b)=>{s(async()=>{b==="loc"&&await p(l)})},p=async(l,s="MSUP_SUPNM")=>{n.value=!0,await Q.post("location/searchAPI",{searchBy:s,searchValue:l}).then(i=>{n.value=!1,m.value=i.data.data}).catch(i=>{n.value=!1})},g=()=>{L.dialog({title:"Confirmation",message:"Are you sure want to save this location ?",cancel:!0,persistent:!0}).onOk(async()=>{n.value=!0,await Q.post("location",{header:r.value}).then(l=>{n.value=!1,L.notify({color:"green",message:`${l.data.msg}`}),d()}).catch(()=>{n.value=!1})})},{dialogRef:M,onDialogHide:u,onDialogOK:d,onDialogCancel:e}=G();return(l,s)=>(f(),T(B,{ref_key:"dialogRef",ref:M,onHide:k(u),"transition-show":"slide-up","transition-hide":"slide-down","full-width":"",persistent:""},{default:o(()=>[a(E,{class:"q-dialog-plugin bg-white q-pa-sm"},{default:o(()=>[a(V,null,{default:o(()=>[J]),_:1}),a(V,{class:"q-pa-sm"},{default:o(()=>[t("fieldset",X,[Z,a(j,{showing:n.value,dark:""},{default:o(()=>[a(z,{size:"50px",color:"primary"})]),_:1},8,["showing"]),t("div",W,[t("div",ee,[a(y,{label:"Code",dense:"",filled:"",modelValue:r.value.MLOC_LOCCD,"onUpdate:modelValue":s[0]||(s[0]=i=>r.value.MLOC_LOCCD=i)},null,8,["modelValue"])]),t("div",ae,[a(y,{label:"Location Name",dense:"",filled:"",modelValue:r.value.MLOC_LOCNM,"onUpdate:modelValue":s[1]||(s[1]=i=>r.value.MLOC_LOCNM=i)},null,8,["modelValue"])])]),t("div",oe,[t("div",le,[a(H,{dense:"",filled:"",label:"Parent Location",modelValue:r.value.MLOC_LOCPRNTCD,"onUpdate:modelValue":s[2]||(s[2]=i=>r.value.MLOC_LOCPRNTCD=i),"use-input":"","input-debounce":"500",options:m.value,onFilter:s[3]||(s[3]=(i,b,x)=>O(i,b,x,"loc")),behavior:"dialog","option-label":"MLOC_LOCCD","option-value":"MLOC_LOCNM","emit-value":"","map-options":"",loading:n.value},null,8,["modelValue","options","loading"])])])])]),_:1}),a(A,{align:"right"},{default:o(()=>[a(v,{label:"OK",color:"primary",onClick:s[4]||(s[4]=i=>g()),disable:l.stateSubmit,loading:n.value},null,8,["disable","loading"]),a(v,{flat:"",label:"Cancel",color:"red",onClick:k(e)},null,8,["onClick"])]),_:1})]),_:1})]),_:1},8,["onHide"]))}},ne={class:"q-pa-md"},se={class:"row q-pb-md"},ie=t("div",{class:"col"},[t("span",{class:"text-h4"},"Location")],-1),de={class:"col text-right"},re={class:"row q-pt-md"},ue={class:"col"},be={__name:"locationIndex",setup(N){const L=F(),c=C([]),r=C([{name:"MLOC_LOCCD",label:"Location Code",field:"MLOC_LOCCD",sortable:!0,align:"left"},{name:"MLOC_LOCNM",label:"Location Name",field:"MLOC_LOCNM",sortable:!0,align:"left"}]),n=C(!1),m=C(""),O=C("");S(()=>{p()});const p=async()=>{n.value=!0,await Q.post("location/searchAPI",{searchBy:m.value,searchValue:O.value}).then(u=>{n.value=!1,c.value=u.data.data}).catch(u=>{n.value=!1})},g=(u=[])=>{L.dialog({component:te,componentProps:{dataHeader:u}}).onOk(async d=>{p()})},M=u=>{};return(u,d)=>(f(),D("div",ne,[t("div",se,[ie,t("div",de,[a(v,{icon:"add",color:"blue",onClick:d[0]||(d[0]=e=>g())},{default:o(()=>[a(h,null,{default:o(()=>[_("Create New Location")]),_:1})]),_:1})])]),a(U),t("div",re,[t("div",ue,[a(K,{title:"Location List",rows:c.value,columns:r.value,"row-key":"MLOC_LOCCD",loading:n.value,dense:"",pagination:{rowsPerPage:20},class:"my-sticky-header-column-table"},{"top-right":o(()=>[a(H,{outlined:"",modelValue:m.value,"onUpdate:modelValue":d[1]||(d[1]=e=>m.value=e),options:u.col,label:"Search Columns","option-value":"name","option-label":"label","emit-value":"",dense:"","map-options":""},null,8,["modelValue","options"]),a(y,{borderless:"",dense:"",modelValue:O.value,"onUpdate:modelValue":[d[2]||(d[2]=e=>O.value=e),d[3]||(d[3]=e=>u.getOutgoingData())],placeholder:"Search",outlined:"",debounce:"1000"},{append:o(()=>[a(Y,{name:"search"})]),_:1},8,["modelValue"])]),header:o(e=>[a(P,{props:e},{default:o(()=>[a($,{"auto-width":""},{default:o(()=>[_("Action")]),_:1}),(f(!0),D(I,null,R(e.cols,l=>(f(),T($,{key:l.name,props:e},{default:o(()=>[_(w(l.label),1)]),_:2},1032,["props"]))),128))]),_:2},1032,["props"])]),body:o(e=>[a(P,{props:e},{default:o(()=>[a(q,{"auto-width":""},{default:o(()=>[a(v,{flat:"",color:parseInt(e.row.CONFIRMED_QTY)==e.row.TOT_RCV?"grey":"orange",icon:"edit",onClick:l=>g(e.row),dense:"",disable:parseInt(e.row.CONFIRMED_QTY)==e.row.TOT_RCV},{default:o(()=>[a(h,null,{default:o(()=>[_(w(parseInt(e.row.CONFIRMED_QTY)==e.row.TOT_RCV?"All qty already confirmed":"Edit Data"),1)]),_:2},1024)]),_:2},1032,["color","onClick","disable"]),a(v,{flat:"",color:parseInt(e.row.CONFIRMED_QTY)==e.row.TOT_RCV?"grey":"red",icon:"delete",onClick:l=>M(e.row.id),dense:"",disable:parseInt(e.row.CONFIRMED_QTY)==e.row.TOT_RCV},{default:o(()=>[a(h,null,{default:o(()=>[_(w(parseInt(e.row.CONFIRMED_QTY)==e.row.TOT_RCV?"All qty already confirmed":"Delete Data"),1)]),_:2},1024)]),_:2},1032,["color","onClick","disable"])]),_:2},1024),(f(!0),D(I,null,R(e.cols,l=>(f(),T(q,{key:l.name,props:e},{default:o(()=>[_(w(l.value),1)]),_:2},1032,["props"]))),128))]),_:2},1032,["props"])]),_:1},8,["rows","columns","loading"])])])]))}};export{be as default};
