import{s as p,o as x,B as i,C as L,D as a,E as e,L as P,M as E,I as l,O as Q,P as C,R as y,S as k,bc as U,Z as I,Q as h,H as V,W as K,X as $,Y as X,aX as z,am as W}from"./index.30cdaf56.js";import{a as B,u as Z,l as O,k as j,m as q}from"./QTable.d9fccaab.js";import{Q as N,a as H}from"./QTd.06fbb590.js";import{Q as Y}from"./QTooltip.00c91dba.js";import{api_web as w}from"./axios.f6599727.js";const G={class:"text-h6"},J={style:{border:"1px black solid","border-radius":"10px"}},ee=l("legend",{style:{"margin-left":"1em",padding:"0.2em 0.8em"}},[l("b",null,"Item Checker")],-1),le={class:"col"},ae={class:"col q-pl-md"},oe={class:"col q-pl-md"},te={style:{border:"1px black solid","border-radius":"10px",height:"35vh",overflow:"auto"}},se=l("legend",{style:{"margin-left":"1em",padding:"0.2em 0.8em"}},[l("div",{class:"row"},[l("div",{class:"col"},[l("b",null,"Accesories")])])],-1),ne={class:"row"},de={class:"col text-right"},ie={class:"col"},ue={class:"col q-pl-md"},re={class:"col-2 q-pl-md"},ce={key:1},me=l("div",{class:"row"},[l("div",{class:"col text-bold text-center"}," No accesories choose, please click + button ")],-1),pe=[me],_e={__name:"onCheckItem",props:{idHead:String,dataHeader:Array},setup(R){const M=B(),g=R,T=p([]),r=p([]),c=p([]),d=p(!1);x(()=>{T.value=g.dataHeader.dlvdet,D()});const D=async v=>{d.value=!0,await w.post("item/searchAPITBL",{searchValue:v}).then(o=>{d.value=!1,r.value=o.data.data}).catch(()=>{d.value=!1})},b=(v,o,t,f)=>{o(async()=>{f==="item"&&await D(v)})},u=()=>{const v=T.value.filter(o=>!o.TDLVORDDETA_ITMCD_ACT);v.length>0?v.map(o=>{M.notify({color:"negative",message:`item ${o.MITM_ITMNMREAL} item actual not filled yet, please add it first !!`})}):M.dialog({title:"Confirmation",message:"Are you sure want to save this outgoing ?",cancel:!0,persistent:!0}).onOk(async()=>{d.value=!0,await w.post("delivery/confirm",{id:g.idHead,data:T.value,acc:c.value}).then(o=>{d.value=!1,r.value=o.data.data,_()}).catch(()=>{d.value=!1})})},{dialogRef:m,onDialogHide:s,onDialogOK:_,onDialogCancel:F}=Z();return(v,o)=>(i(),L(X,{ref_key:"dialogRef",ref:m,onHide:$(s),"transition-show":"slide-up","transition-hide":"slide-down","full-width":""},{default:a(()=>[e(P,{class:"q-dialog-plugin bg-white q-pa-sm"},{default:a(()=>[e(E,null,{default:a(()=>[l("div",G,"Item Check "+Q(v.val),1)]),_:1}),e(E,null,{default:a(()=>[l("fieldset",J,[ee,(i(!0),C(y,null,k(T.value,(t,f)=>(i(),C("div",{class:U(`row ${f>0?"q-pt-md":""}`),key:f},[l("div",le,[e(I,{filled:"",dense:"",label:"Item Request",modelValue:t.MITM_ITMNMREAL,"onUpdate:modelValue":n=>t.MITM_ITMNMREAL=n,readonly:""},null,8,["modelValue","onUpdate:modelValue"])]),l("div",ae,[e(I,{filled:"",dense:"",label:"Qty",modelValue:t.TDLVORDDETA_ITMQT,"onUpdate:modelValue":n=>t.TDLVORDDETA_ITMQT=n,readonly:""},null,8,["modelValue","onUpdate:modelValue"])]),l("div",oe,[e(O,{dense:"",filled:"",label:"Item Code Confirmation",modelValue:t.TDLVORDDETA_ITMCD_ACT,"onUpdate:modelValue":n=>t.TDLVORDDETA_ITMCD_ACT=n,"use-input":"","input-debounce":"500",options:r.value,onFilter:(n,A,S)=>b(n||t.MITM_ITMNMREAL,A,S,"item"),behavior:"dialog","option-label":"MITM_ITMNM","option-value":"MITM_ITMCD","emit-value":"","map-options":"",loading:d.value},null,8,["modelValue","onUpdate:modelValue","options","onFilter","loading"])])],2))),128))]),l("fieldset",te,[se,l("div",ne,[l("div",de,[e(h,{icon:"add",color:"indigo",flat:"",dense:"",onClick:o[0]||(o[0]=t=>c.value.push({TDLVACCESSORY_ITMCD:"",TDLVACCESSORY_ITMQT:0}))},{default:a(()=>[e(Y,null,{default:a(()=>[V("Add Accesories")]),_:1})]),_:1})])]),c.value.length>0?(i(!0),C(y,{key:0},k(c.value,(t,f)=>(i(),C("div",{class:U(`row ${f>0?"q-pt-md":""}`),key:f},[l("div",ie,[e(O,{dense:"",filled:"",label:"Item Code Accesories",modelValue:t.TDLVACCESSORY_ITMCD,"onUpdate:modelValue":n=>t.TDLVACCESSORY_ITMCD=n,"use-input":"","input-debounce":"500",options:r.value,onFilter:o[1]||(o[1]=(n,A,S)=>b(n,A,S,"item")),behavior:"dialog","option-label":"MITM_ITMNM","option-value":"MITM_ITMCD","emit-value":"","map-options":"",loading:d.value},null,8,["modelValue","onUpdate:modelValue","options","loading"])]),l("div",ue,[e(I,{filled:"",dense:"",label:"Qty",modelValue:t.TDLVACCESSORY_ITMQT,"onUpdate:modelValue":n=>t.TDLVACCESSORY_ITMQT=n,readonly:!t.TDLVACCESSORY_ITMCD},null,8,["modelValue","onUpdate:modelValue","readonly"])]),l("div",re,[e(h,{icon:"delete",color:"red",flat:"",dense:"",onClick:n=>c.value.splice(f,1)},null,8,["onClick"])])],2))),128)):(i(),C("div",ce,pe))])]),_:1}),e(K,{align:"right"},{default:a(()=>[e(h,{label:"OK",color:"primary",onClick:o[2]||(o[2]=t=>u()),loading:d.value},null,8,["loading"]),e(h,{flat:"",label:"Cancel",color:"red",onClick:$(F)},null,8,["onClick"])]),_:1})]),_:1})]),_:1},8,["onHide"]))}},ve={class:"q-pa-md"},fe=l("div",{class:"row q-pb-md"},[l("div",{class:"col"},[l("span",{class:"text-h4"},"Outgoing Confirmation")])],-1),Ce={class:"row q-pt-md"},Te={class:"col"},be={__name:"outConfView",setup(R){const M=B(),g=p([]),T=p([{name:"TDLVORD_DLVCD",label:"DO Number",field:"TDLVORD_DLVCD",sortable:!0,align:"left"},{name:"MCUS_CUSNM",label:"Customer",field:"MCUS_CUSNM",sortable:!0,align:"left"}]),r=p(!1),c=p(""),d=p("");x(()=>{D()});const D=async()=>{r.value=!0,await w.post("delivery/unconfirmed",{searchBy:c.value,searchValue:d.value}).then(u=>{r.value=!1,g.value=u.data.data}).catch(u=>{r.value=!1})},b=u=>{console.log(u),M.dialog({component:_e,componentProps:{idHead:u.TDLVORD_DLVCD,dataHeader:u}}).onOk(async m=>{D()})};return(u,m)=>(i(),C("div",ve,[fe,e(z),l("div",Ce,[l("div",Te,[e(j,{title:"Outstanding Confirmation",rows:g.value,columns:T.value,"row-key":"name",loading:r.value,dense:"",pagination:{rowsPerPage:20},class:"my-sticky-header-column-table"},{"top-right":a(()=>[e(O,{outlined:"",modelValue:c.value,"onUpdate:modelValue":m[0]||(m[0]=s=>c.value=s),options:T.value,label:"Search Columns","option-value":"name","option-label":"label","emit-value":"",dense:"","map-options":""},null,8,["modelValue","options"]),e(I,{borderless:"",dense:"",modelValue:d.value,"onUpdate:modelValue":[m[1]||(m[1]=s=>d.value=s),m[2]||(m[2]=s=>u.dataOutstanding())],placeholder:"Search",outlined:"",debounce:"1000"},{append:a(()=>[e(W,{name:"search"})]),_:1},8,["modelValue"])]),header:a(s=>[e(N,{props:s},{default:a(()=>[(i(!0),C(y,null,k(s.cols,_=>(i(),L(q,{key:_.name,props:s},{default:a(()=>[V(Q(_.label),1)]),_:2},1032,["props"]))),128)),e(q,{"auto-width":""},{default:a(()=>[V("Action")]),_:1})]),_:2},1032,["props"])]),body:a(s=>[e(N,{props:s},{default:a(()=>[(i(!0),C(y,null,k(s.cols,_=>(i(),L(H,{key:_.name,props:s},{default:a(()=>[V(Q(_.value),1)]),_:2},1032,["props"]))),128)),e(H,{"auto-width":""},{default:a(()=>[e(h,{flat:"",color:"green",icon:"check",onClick:_=>b(s.row),dense:""},{default:a(()=>[e(Y,null,{default:a(()=>[V("Confirm Delivery")]),_:1})]),_:2},1032,["onClick"])]),_:2},1024)]),_:2},1032,["props"])]),_:1},8,["rows","columns","loading"])])])]))}};export{be as default};
