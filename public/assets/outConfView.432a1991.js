import{t as p,o as H,C as d,D as S,E as a,F as e,M as P,O as E,J as l,P as L,R as C,S as y,T as k,b6 as U,$ as I,Q as h,I as V,X as K,Y as $,Z as z,aI as J,av as X}from"./index.cf9bb16f.js";import{Q as O}from"./QSelect.b4e51940.js";import{Q as Z,a as q}from"./QTable.e9d4f383.js";import{Q as N,a as x}from"./QTd.decd5540.js";import{Q as Y}from"./QTooltip.d4490103.js";import{api_web as w}from"./axios.e40d991b.js";import{u as B}from"./use-quasar.968675fa.js";import{u as j}from"./use-dialog-plugin-component.d7aa9db2.js";import"./QItemLabel.e17bdfb4.js";import"./format.36d947c1.js";import"./QList.189b2691.js";const G={class:"text-h6"},W={style:{border:"1px black solid","border-radius":"10px"}},ee=l("legend",{style:{"margin-left":"1em",padding:"0.2em 0.8em"}},[l("b",null,"Item Checker")],-1),le={class:"col"},ae={class:"col q-pl-md"},oe={class:"col q-pl-md"},te={style:{border:"1px black solid","border-radius":"10px",height:"35vh",overflow:"auto"}},se=l("legend",{style:{"margin-left":"1em",padding:"0.2em 0.8em"}},[l("div",{class:"row"},[l("div",{class:"col"},[l("b",null,"Accesories")])])],-1),ne={class:"row"},ie={class:"col text-right"},de={class:"col"},ue={class:"col q-pl-md"},re={class:"col-2 q-pl-md"},ce={key:1},me=l("div",{class:"row"},[l("div",{class:"col text-bold text-center"}," No accesories choose, please click + button ")],-1),pe=[me],_e={__name:"onCheckItem",props:{idHead:String,dataHeader:Array},setup(R){const M=B(),g=R,T=p([]),r=p([]),c=p([]),i=p(!1);H(()=>{T.value=g.dataHeader.dlvdet,D()});const D=async v=>{i.value=!0,await w.post("item/searchAPITBL",{searchValue:v}).then(o=>{i.value=!1,r.value=o.data.data}).catch(()=>{i.value=!1})},b=(v,o,t,f)=>{o(async()=>{f==="item"&&await D(v)})},u=()=>{const v=T.value.filter(o=>!o.TDLVORDDETA_ITMCD_ACT);v.length>0?v.map(o=>{M.notify({color:"negative",message:`item ${o.MITM_ITMNMREAL} item actual not filled yet, please add it first !!`})}):M.dialog({title:"Confirmation",message:"Are you sure want to save this outgoing ?",cancel:!0,persistent:!0}).onOk(async()=>{i.value=!0,await w.post("delivery/confirm",{id:g.idHead,data:T.value,acc:c.value}).then(o=>{i.value=!1,r.value=o.data.data,_()}).catch(()=>{i.value=!1})})},{dialogRef:m,onDialogHide:s,onDialogOK:_,onDialogCancel:F}=j();return(v,o)=>(d(),S(z,{ref_key:"dialogRef",ref:m,onHide:$(s),"transition-show":"slide-up","transition-hide":"slide-down","full-width":""},{default:a(()=>[e(P,{class:"q-dialog-plugin bg-white q-pa-sm"},{default:a(()=>[e(E,null,{default:a(()=>[l("div",G,"Item Check "+L(v.val),1)]),_:1}),e(E,null,{default:a(()=>[l("fieldset",W,[ee,(d(!0),C(y,null,k(T.value,(t,f)=>(d(),C("div",{class:U(`row ${f>0?"q-pt-md":""}`),key:f},[l("div",le,[e(I,{filled:"",dense:"",label:"Item Request",modelValue:t.MITM_ITMNMREAL,"onUpdate:modelValue":n=>t.MITM_ITMNMREAL=n,readonly:""},null,8,["modelValue","onUpdate:modelValue"])]),l("div",ae,[e(I,{filled:"",dense:"",label:"Qty",modelValue:t.TDLVORDDETA_ITMQT,"onUpdate:modelValue":n=>t.TDLVORDDETA_ITMQT=n,readonly:""},null,8,["modelValue","onUpdate:modelValue"])]),l("div",oe,[e(O,{dense:"",filled:"",label:"Item Code Confirmation",modelValue:t.TDLVORDDETA_ITMCD_ACT,"onUpdate:modelValue":n=>t.TDLVORDDETA_ITMCD_ACT=n,"use-input":"","input-debounce":"500",options:r.value,onFilter:(n,A,Q)=>b(n||t.MITM_ITMNMREAL,A,Q,"item"),behavior:"dialog","option-label":"MITM_ITMNM","option-value":"MITM_ITMCD","emit-value":"","map-options":"",loading:i.value},null,8,["modelValue","onUpdate:modelValue","options","onFilter","loading"])])],2))),128))]),l("fieldset",te,[se,l("div",ne,[l("div",ie,[e(h,{icon:"add",color:"indigo",flat:"",dense:"",onClick:o[0]||(o[0]=t=>c.value.push({TDLVACCESSORY_ITMCD:"",TDLVACCESSORY_ITMQT:0}))},{default:a(()=>[e(Y,null,{default:a(()=>[V("Add Accesories")]),_:1})]),_:1})])]),c.value.length>0?(d(!0),C(y,{key:0},k(c.value,(t,f)=>(d(),C("div",{class:U(`row ${f>0?"q-pt-md":""}`),key:f},[l("div",de,[e(O,{dense:"",filled:"",label:"Item Code Accesories",modelValue:t.TDLVACCESSORY_ITMCD,"onUpdate:modelValue":n=>t.TDLVACCESSORY_ITMCD=n,"use-input":"","input-debounce":"500",options:r.value,onFilter:o[1]||(o[1]=(n,A,Q)=>b(n,A,Q,"item")),behavior:"dialog","option-label":"MITM_ITMNM","option-value":"MITM_ITMCD","emit-value":"","map-options":"",loading:i.value},null,8,["modelValue","onUpdate:modelValue","options","loading"])]),l("div",ue,[e(I,{filled:"",dense:"",label:"Qty",modelValue:t.TDLVACCESSORY_ITMQT,"onUpdate:modelValue":n=>t.TDLVACCESSORY_ITMQT=n,readonly:!t.TDLVACCESSORY_ITMCD},null,8,["modelValue","onUpdate:modelValue","readonly"])]),l("div",re,[e(h,{icon:"delete",color:"red",flat:"",dense:"",onClick:n=>c.value.splice(f,1)},null,8,["onClick"])])],2))),128)):(d(),C("div",ce,pe))])]),_:1}),e(K,{align:"right"},{default:a(()=>[e(h,{label:"OK",color:"primary",onClick:o[2]||(o[2]=t=>u()),loading:i.value},null,8,["loading"]),e(h,{flat:"",label:"Cancel",color:"red",onClick:$(F)},null,8,["onClick"])]),_:1})]),_:1})]),_:1},8,["onHide"]))}},ve={class:"q-pa-md"},fe=l("div",{class:"row q-pb-md"},[l("div",{class:"col"},[l("span",{class:"text-h4"},"Outgoing Confirmation")])],-1),Ce={class:"row q-pt-md"},Te={class:"col"},Se={__name:"outConfView",setup(R){const M=B(),g=p([]),T=p([{name:"TDLVORD_DLVCD",label:"DO Number",field:"TDLVORD_DLVCD",sortable:!0,align:"left"},{name:"MCUS_CUSNM",label:"Customer",field:"MCUS_CUSNM",sortable:!0,align:"left"}]),r=p(!1),c=p(""),i=p("");H(()=>{D()});const D=async()=>{r.value=!0,await w.post("delivery/unconfirmed",{searchBy:c.value,searchValue:i.value}).then(u=>{r.value=!1,g.value=u.data.data}).catch(u=>{r.value=!1})},b=u=>{console.log(u),M.dialog({component:_e,componentProps:{idHead:u.TDLVORD_DLVCD,dataHeader:u}}).onOk(async m=>{D()})};return(u,m)=>(d(),C("div",ve,[fe,e(J),l("div",Ce,[l("div",Te,[e(Z,{title:"Outstanding Confirmation",rows:g.value,columns:T.value,"row-key":"name",loading:r.value,dense:"",pagination:{rowsPerPage:20},class:"my-sticky-header-column-table"},{"top-right":a(()=>[e(O,{outlined:"",modelValue:c.value,"onUpdate:modelValue":m[0]||(m[0]=s=>c.value=s),options:T.value,label:"Search Columns","option-value":"name","option-label":"label","emit-value":"",dense:"","map-options":""},null,8,["modelValue","options"]),e(I,{borderless:"",dense:"",modelValue:i.value,"onUpdate:modelValue":[m[1]||(m[1]=s=>i.value=s),m[2]||(m[2]=s=>u.dataOutstanding())],placeholder:"Search",outlined:"",debounce:"1000"},{append:a(()=>[e(X,{name:"search"})]),_:1},8,["modelValue"])]),header:a(s=>[e(N,{props:s},{default:a(()=>[(d(!0),C(y,null,k(s.cols,_=>(d(),S(q,{key:_.name,props:s},{default:a(()=>[V(L(_.label),1)]),_:2},1032,["props"]))),128)),e(q,{"auto-width":""},{default:a(()=>[V("Action")]),_:1})]),_:2},1032,["props"])]),body:a(s=>[e(N,{props:s},{default:a(()=>[(d(!0),C(y,null,k(s.cols,_=>(d(),S(x,{key:_.name,props:s},{default:a(()=>[V(L(_.value),1)]),_:2},1032,["props"]))),128)),e(x,{"auto-width":""},{default:a(()=>[e(h,{flat:"",color:"green",icon:"check",onClick:_=>b(s.row),dense:""},{default:a(()=>[e(Y,null,{default:a(()=>[V("Confirm Delivery")]),_:1})]),_:2},1032,["onClick"])]),_:2},1024)]),_:2},1032,["props"])]),_:1},8,["rows","columns","loading"])])])]))}};export{Se as default};
