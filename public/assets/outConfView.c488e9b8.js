import{s as m,o as B,B as u,C as L,D as a,E as e,L as P,M as E,I as l,O as Q,P as T,R as y,S as A,bc as U,Z as I,Q as V,H as h,W as K,X as $,Y as X,aX as j,am as z}from"./index.2010af2d.js";import{u as Y,k as O,j as W,l as q}from"./QTable.2d8e532c.js";import{Q as N,a as H}from"./QTd.2e22adcc.js";import{Q as x}from"./QTooltip.5850606b.js";import{api_web as R}from"./axios.16ebe505.js";import{u as Z}from"./use-dialog-plugin-component.7560017b.js";const G={class:"text-h6"},J={style:{border:"1px black solid","border-radius":"10px"}},ee=l("legend",{style:{"margin-left":"1em",padding:"0.2em 0.8em"}},[l("b",null,"Item Checker")],-1),le={class:"col"},ae={class:"col q-pl-md"},oe={class:"col q-pl-md"},te={style:{border:"1px black solid","border-radius":"10px",height:"35vh",overflow:"auto"}},ne=l("legend",{style:{"margin-left":"1em",padding:"0.2em 0.8em"}},[l("div",{class:"row"},[l("div",{class:"col"},[l("b",null,"Accesories")])])],-1),se={class:"row"},de={class:"col text-right"},ie={class:"col"},ue={class:"col q-pl-md"},re={class:"col-2 q-pl-md"},ce={__name:"onCheckItem",props:{idHead:String,dataHeader:Array},setup(w){const M=Y(),g=w,C=m([]),r=m([]),p=m([]),d=m(!1);B(()=>{C.value=g.dataHeader.dlvdet,D()});const D=async f=>{d.value=!0,await R.post("item/searchAPITBL",{searchValue:f}).then(o=>{d.value=!1,r.value=o.data.data}).catch(()=>{d.value=!1})},b=(f,o,t,v)=>{o(async()=>{v==="item"&&await D(f)})},i=()=>{const f=C.value.filter(o=>!o.TDLVORDDETA_ITMCD_ACT);f.length>0?f.map(o=>{M.notify({color:"negative",message:`item ${o.MITM_ITMNMREAL} item actual not filled yet, please add it first !!`})}):M.dialog({title:"Confirmation",message:"Are you sure want to save this outgoing ?",cancel:!0,persistent:!0}).onOk(async()=>{d.value=!0,await R.post("delivery/confirm",{id:g.idHead,data:C.value,acc:p.value}).then(o=>{d.value=!1,r.value=o.data.data,_()}).catch(()=>{d.value=!1})})},{dialogRef:c,onDialogHide:n,onDialogOK:_,onDialogCancel:F}=Z();return(f,o)=>(u(),L(X,{ref_key:"dialogRef",ref:c,onHide:$(n),"transition-show":"slide-up","transition-hide":"slide-down","full-width":""},{default:a(()=>[e(P,{class:"q-dialog-plugin bg-white q-pa-sm"},{default:a(()=>[e(E,null,{default:a(()=>[l("div",G,"Item Check "+Q(f.val),1)]),_:1}),e(E,null,{default:a(()=>[l("fieldset",J,[ee,(u(!0),T(y,null,A(C.value,(t,v)=>(u(),T("div",{class:U(`row ${v>0?"q-pt-md":""}`),key:v},[l("div",le,[e(I,{filled:"",dense:"",label:"Item Request",modelValue:t.MITM_ITMNMREAL,"onUpdate:modelValue":s=>t.MITM_ITMNMREAL=s,readonly:""},null,8,["modelValue","onUpdate:modelValue"])]),l("div",ae,[e(I,{filled:"",dense:"",label:"Qty",modelValue:t.TDLVORDDETA_ITMQT,"onUpdate:modelValue":s=>t.TDLVORDDETA_ITMQT=s,readonly:""},null,8,["modelValue","onUpdate:modelValue"])]),l("div",oe,[e(O,{dense:"",filled:"",label:"Item Code Confirmation",modelValue:t.TDLVORDDETA_ITMCD_ACT,"onUpdate:modelValue":s=>t.TDLVORDDETA_ITMCD_ACT=s,"use-input":"","input-debounce":"500",options:r.value,onFilter:(s,k,S)=>b(s||t.MITM_ITMNMREAL,k,S,"item"),behavior:"dialog","option-label":"MITM_ITMNM","option-value":"MITM_ITMCD","emit-value":"","map-options":"",loading:d.value},null,8,["modelValue","onUpdate:modelValue","options","onFilter","loading"])])],2))),128))]),l("fieldset",te,[ne,l("div",se,[l("div",de,[e(V,{icon:"add",color:"indigo",flat:"",dense:"",onClick:o[0]||(o[0]=t=>p.value.push({TDLVACCESSORY_ITMCD:"",TDLVACCESSORY_ITMQT:0}))},{default:a(()=>[e(x,null,{default:a(()=>[h("Add Accesories")]),_:1})]),_:1})])]),(u(!0),T(y,null,A(p.value,(t,v)=>(u(),T("div",{class:U(`row ${v>0?"q-pt-md":""}`),key:v},[l("div",ie,[e(O,{dense:"",filled:"",label:"Item Code Accesories",modelValue:t.TDLVACCESSORY_ITMCD,"onUpdate:modelValue":s=>t.TDLVACCESSORY_ITMCD=s,"use-input":"","input-debounce":"500",options:r.value,onFilter:o[1]||(o[1]=(s,k,S)=>b(s,k,S,"item")),behavior:"dialog","option-label":"MITM_ITMNM","option-value":"MITM_ITMCD","emit-value":"","map-options":"",loading:d.value},null,8,["modelValue","onUpdate:modelValue","options","loading"])]),l("div",ue,[e(I,{filled:"",dense:"",label:"Qty",modelValue:t.TDLVACCESSORY_ITMQT,"onUpdate:modelValue":s=>t.TDLVACCESSORY_ITMQT=s,readonly:!t.TDLVACCESSORY_ITMCD},null,8,["modelValue","onUpdate:modelValue","readonly"])]),l("div",re,[e(V,{icon:"delete",color:"red",flat:"",dense:"",onClick:s=>p.value.splice(v,1)},null,8,["onClick"])])],2))),128))])]),_:1}),e(K,{align:"right"},{default:a(()=>[e(V,{label:"OK",color:"primary",onClick:o[2]||(o[2]=t=>i()),loading:d.value},null,8,["loading"]),e(V,{flat:"",label:"Cancel",color:"red",onClick:$(F)},null,8,["onClick"])]),_:1})]),_:1})]),_:1},8,["onHide"]))}},me={class:"q-pa-md"},pe=l("div",{class:"row q-pb-md"},[l("div",{class:"col"},[l("span",{class:"text-h4"},"Outgoing Confirmation")])],-1),_e={class:"row q-pt-md"},fe={class:"col"},he={__name:"outConfView",setup(w){const M=Y(),g=m([]),C=m([{name:"TDLVORD_DLVCD",label:"DO Number",field:"TDLVORD_DLVCD",sortable:!0,align:"left"},{name:"MCUS_CUSNM",label:"Customer",field:"MCUS_CUSNM",sortable:!0,align:"left"}]),r=m(!1),p=m(""),d=m("");B(()=>{D()});const D=async()=>{r.value=!0,await R.post("delivery/unconfirmed",{searchBy:p.value,searchValue:d.value}).then(i=>{r.value=!1,g.value=i.data.data}).catch(i=>{r.value=!1})},b=i=>{console.log(i),M.dialog({component:ce,componentProps:{idHead:i.TDLVORD_DLVCD,dataHeader:i}}).onOk(async c=>{D()})};return(i,c)=>(u(),T("div",me,[pe,e(j),l("div",_e,[l("div",fe,[e(W,{title:"Outstanding Confirmation",rows:g.value,columns:C.value,"row-key":"name",loading:r.value,dense:"",pagination:{rowsPerPage:20},class:"my-sticky-header-column-table"},{"top-right":a(()=>[e(O,{outlined:"",modelValue:p.value,"onUpdate:modelValue":c[0]||(c[0]=n=>p.value=n),options:C.value,label:"Search Columns","option-value":"name","option-label":"label","emit-value":"",dense:"","map-options":""},null,8,["modelValue","options"]),e(I,{borderless:"",dense:"",modelValue:d.value,"onUpdate:modelValue":[c[1]||(c[1]=n=>d.value=n),c[2]||(c[2]=n=>i.dataOutstanding())],placeholder:"Search",outlined:"",debounce:"1000"},{append:a(()=>[e(z,{name:"search"})]),_:1},8,["modelValue"])]),header:a(n=>[e(N,{props:n},{default:a(()=>[(u(!0),T(y,null,A(n.cols,_=>(u(),L(q,{key:_.name,props:n},{default:a(()=>[h(Q(_.label),1)]),_:2},1032,["props"]))),128)),e(q,{"auto-width":""},{default:a(()=>[h("Action")]),_:1})]),_:2},1032,["props"])]),body:a(n=>[e(N,{props:n},{default:a(()=>[(u(!0),T(y,null,A(n.cols,_=>(u(),L(H,{key:_.name,props:n},{default:a(()=>[h(Q(_.value),1)]),_:2},1032,["props"]))),128)),e(H,{"auto-width":""},{default:a(()=>[e(V,{flat:"",color:"green",icon:"check",onClick:_=>b(n.row),dense:""},{default:a(()=>[e(x,null,{default:a(()=>[h("Confirm Delivery")]),_:1})]),_:2},1032,["onClick"])]),_:2},1024)]),_:2},1032,["props"])]),_:1},8,["rows","columns","loading"])])])]))}};export{he as default};
