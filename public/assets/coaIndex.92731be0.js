import{Q as P}from"./QTooltip.1c4b098d.js";import{t as p,o as Y,C as A,D as T,E as a,F as e,M as G,O as q,J as l,$ as h,R as v,Q as f,S as U,T as Q,aZ as K,X as Z,Y as E,Z as X,aY as z,I as b,at as W,P as S}from"./index.4ea75c62.js";import{e as y}from"./QSelect.4adb3f7f.js";import{Q as ee,a as x}from"./QTable.63b944a6.js";import{Q as B,a as I}from"./QTd.3346c8f3.js";import{u as F}from"./format.1262ef80.js";import{api_web as k}from"./axios.bdf20fa4.js";import{u as le}from"./use-dialog-plugin-component.d0c3b73f.js";import"./QList.b0964507.js";const ae=l("div",{class:"text-h6"},"Closing Period",-1),oe={style:{border:"1px black solid","border-radius":"10px"}},te=l("legend",{style:{"margin-left":"1em",padding:"0.2em 0.8em"}},[l("b",null,"Header")],-1),se={class:"row q-col-gutter-sm"},ne={class:"col-12 col-sm-6"},de={class:"col-12 col-sm-6"},ie={class:"row q-col-gutter-sm q-pt-sm"},ue={class:"col-12 col-sm-6"},re={class:"col-12 col-sm-6"},ce={key:0,style:{border:"1px black solid","border-radius":"10px"}},Ce=l("legend",{style:{"margin-left":"1em",padding:"0.2em 0.8em"}},[l("b",null,"COA Mapping")],-1),me={class:"row q-col-gutter-sm q-pt-sm"},_e={class:"col-12 col-sm-12 text-right"},pe={class:"col-12 col-sm-4"},Ae={class:"col-12 col-sm-3"},Oe={class:"col-12 col-sm-4"},ve={class:"col-12 col-sm-1"},fe={key:1,class:"row q-col-gutter-sm q-pt-sm"},Me=l("div",{class:"col-12 text-center"},"Click + button to add",-1),ge=[Me],be={__name:"coaCreate",props:{header:String},setup($){const M=F(),s=p({MCOA_COACD:"",MCOA_COANM:"",MCOA_CURR:"",MCOA_TYPE:"INC"}),r=p([]),i=p(!1),g=p([]),O=p([{label:"Income",value:"INC"},{label:"Expense",value:"OUT"},{label:"Account Group",value:"group"}]),c=$;Y(async()=>{c.header&&c.header!==""&&(await m(""),s.value.MCOA_COACD=c.header.MCOA_COACD,s.value.MCOA_COANM=c.header.MCOA_COANM,s.value.MCOA_CURR=c.header.MCOA_CURR,s.value.MCOA_TYPE=c.header.MCOA_TYPE,r.value=c.header.det)});const{dialogRef:w,onDialogHide:D,onDialogOK:C,onDialogCancel:d}=le(),n=(u,o,t,V)=>{o(async()=>{V==="coa"&&await m(u)})},m=async(u,o="MCOA_COACD")=>{i.value=!0,await k.post("coa/searchAPI",{searchValue:u,searchCol:o}).then(t=>{i.value=!1,g.value=t.data.data}).catch(()=>{i.value=!1})},H=()=>{r.value.push({MCOAM_H_COACD:s.value.MCOA_COACD,MCOAM_CR_COACD:"",MCOAM_DB_COACD:"",MCOAM_DESC:""})},L=u=>{M.dialog({title:"Confirmation",message:`Do you want to delete this lines no ${u+1} ?`,cancel:!0,persistent:!0}).onOk(async()=>{r.value.splice(u,1),r.value.splice(u+1,1)})},J=u=>{r.value=[]},j=()=>{M.dialog({title:"Confirmation",message:"Are you sure want to save this COA ?",cancel:!0,persistent:!0}).onOk(async()=>{i.value=!0,await k.post("coa",{...s.value,det:r.value}).then(u=>{i.value=!1,M.notify({color:"green",message:`${u.data.msg}`}),C()}).catch(u=>{i.value=!1})})};return(u,o)=>(A(),T(X,{ref_key:"dialogRef",ref:w,onHide:E(D),"transition-show":"slide-up","transition-hide":"slide-down","full-width":""},{default:a(()=>[e(G,{class:"q-dialog-plugin bg-white q-pa-sm"},{default:a(()=>[e(q,null,{default:a(()=>[ae]),_:1}),e(q,{class:"q-pa-sm"},{default:a(()=>[l("fieldset",oe,[te,l("div",se,[l("div",ne,[e(h,{filled:"",label:"COA Number",modelValue:s.value.MCOA_COACD,"onUpdate:modelValue":o[0]||(o[0]=t=>s.value.MCOA_COACD=t),dense:""},null,8,["modelValue"])]),l("div",de,[e(h,{filled:"",modelValue:s.value.MCOA_COANM,"onUpdate:modelValue":o[1]||(o[1]=t=>s.value.MCOA_COANM=t),label:"COA Name",dense:""},null,8,["modelValue"])])]),l("div",ie,[l("div",ue,[e(h,{filled:"",label:"Valuta",modelValue:s.value.MCOA_CURR,"onUpdate:modelValue":o[2]||(o[2]=t=>s.value.MCOA_CURR=t),dense:""},null,8,["modelValue"])]),l("div",re,[e(y,{filled:"",modelValue:s.value.MCOA_TYPE,"onUpdate:modelValue":[o[3]||(o[3]=t=>s.value.MCOA_TYPE=t),o[4]||(o[4]=t=>J(t))],options:O.value,label:"Filled",dense:"","emit-value":"","map-options":""},null,8,["modelValue","options"])])])]),s.value.MCOA_TYPE==="group"?(A(),v("fieldset",ce,[Ce,l("div",me,[l("div",_e,[e(f,{flat:"",color:"primary",icon:"add",onClick:H})])]),r.value.length>0?(A(!0),v(U,{key:0},Q(r.value,(t,V)=>(A(),v("div",{class:"row q-col-gutter-sm q-pt-sm",key:V},[l("div",pe,[e(y,{filled:"",label:"Account Code Credit",modelValue:t.MCOAM_CR_COACD,"onUpdate:modelValue":_=>t.MCOAM_CR_COACD=_,"use-input":"","input-debounce":"500",options:g.value,onFilter:o[5]||(o[5]=(_,R,N)=>n(_,R,N,"coa")),behavior:"dialog","option-label":"MCOA_COANM_COMB","option-value":"MCOA_COACD","emit-value":"","map-options":"",loading:i.value,dense:""},null,8,["modelValue","onUpdate:modelValue","options","loading"])]),l("div",Ae,[e(y,{filled:"",label:"Account Code Debit",modelValue:t.MCOAM_DB_COACD,"onUpdate:modelValue":_=>t.MCOAM_DB_COACD=_,"use-input":"","input-debounce":"500",options:g.value,onFilter:o[6]||(o[6]=(_,R,N)=>n(_,R,N,"coa")),behavior:"dialog","option-label":"MCOA_COANM_COMB","option-value":"MCOA_COACD","emit-value":"","map-options":"",loading:i.value,dense:""},null,8,["modelValue","onUpdate:modelValue","options","loading"])]),l("div",Oe,[e(h,{filled:"",label:"Description",modelValue:t.MCOAM_DESC,"onUpdate:modelValue":_=>t.MCOAM_DESC=_,dense:""},null,8,["modelValue","onUpdate:modelValue"])]),l("div",ve,[e(f,{icon:"delete",onClick:_=>L(V),flat:"",color:"red"},null,8,["onClick"])])]))),128)):(A(),v("div",fe,ge))])):K("",!0)]),_:1}),e(Z,{align:"right"},{default:a(()=>[e(f,{label:"OK",color:"primary",onClick:o[7]||(o[7]=t=>j()),disable:u.stateSubmit,loading:i.value},null,8,["disable","loading"]),e(f,{flat:"",label:"Cancel",color:"red",onClick:E(d)},null,8,["onClick"])]),_:1})]),_:1})]),_:1},8,["onHide"]))}},he={class:"q-pa-md"},De={class:"row q-pb-md"},Ve=l("div",{class:"col"},[l("span",{class:"text-h4"},"Chart of Account")],-1),ye={class:"col text-right"},ke={class:"row q-pt-md"},we={class:"col"},Se={__name:"coaIndex",setup($){const M=F(),s=p("MCOA_COANM"),r=p(""),i=p([]),g=p([{name:"MCOA_COACD",label:"COA Code",field:"MCOA_COACD",sortable:!0,align:"left"},{name:"MCOA_COANM",label:"COA Name",field:"MCOA_COANM",sortable:!0,align:"left"},{name:"MCOA_TYPE",label:"Type",field:"MCOA_TYPE",sortable:!0,align:"left"},{name:"MCOA_CURR",label:"Valuta",field:"MCOA_CURR",sortable:!0,align:"left"},{name:"MAP_PARAM",label:"COA Configured",field:"MAP_PARAM",sortable:!0,align:"left"}]),O=p(!1);Y(()=>{c()});const c=async()=>{O.value=!0,await k.post("coa/searchAPI",{searchBy:s.value,searchValue:r.value}).then(C=>{O.value=!1,i.value=C.data.data}).catch(C=>{O.value=!1})},w=C=>{M.dialog({title:"Confirmation",message:"Are you sure want to delete this journal doc ?",cancel:!0,persistent:!0}).onOk(async()=>{k.delete(`acc/journal/${btoa(C)}`).then(d=>{O.value=!1,i.value=d.data.data}).catch(d=>{O.value=!1})})},D=(C=null)=>{M.dialog({component:be,componentProps:{header:C}}).onOk(async d=>{c()})};return(C,d)=>(A(),v("div",he,[l("div",De,[Ve,l("div",ye,[e(f,{icon:"add",color:"blue",onClick:d[0]||(d[0]=n=>D())},{default:a(()=>[e(P,null,{default:a(()=>[b("Create New COA")]),_:1})]),_:1})])]),e(z),l("div",ke,[l("div",we,[e(ee,{title:"COA List",rows:i.value,columns:g.value,"row-key":"name",loading:O.value,dense:"",pagination:{rowsPerPage:20},class:"my-sticky-header-column-table"},{"top-right":a(()=>[e(y,{outlined:"",modelValue:s.value,"onUpdate:modelValue":d[1]||(d[1]=n=>s.value=n),options:g.value,label:"Search Columns","option-value":"name","option-label":"label","emit-value":"",dense:"","map-options":""},null,8,["modelValue","options"]),e(h,{borderless:"",dense:"",modelValue:r.value,"onUpdate:modelValue":[d[2]||(d[2]=n=>r.value=n),d[3]||(d[3]=n=>C.dataAcc())],placeholder:"Search",outlined:"",debounce:"1000"},{append:a(()=>[e(W,{name:"search"})]),_:1},8,["modelValue"])]),header:a(n=>[e(B,{props:n},{default:a(()=>[e(x,{"auto-width":""},{default:a(()=>[b("Action")]),_:1}),(A(!0),v(U,null,Q(n.cols,m=>(A(),T(x,{key:m.name,props:n},{default:a(()=>[b(S(m.label),1)]),_:2},1032,["props"]))),128))]),_:2},1032,["props"])]),body:a(n=>[e(B,{props:n},{default:a(()=>[e(I,{"auto-width":""},{default:a(()=>[e(f,{flat:"",color:"orange",icon:"edit",onClick:m=>D(n.row),dense:""},{default:a(()=>[e(P,null,{default:a(()=>[b("Journal Edit")]),_:1})]),_:2},1032,["onClick"]),e(f,{flat:"",color:"red",icon:"delete",onClick:m=>w(n.row.GLHIST_DOC),dense:""},{default:a(()=>[e(P,null,{default:a(()=>[b("Journal Delete")]),_:1})]),_:2},1032,["onClick"])]),_:2},1024),(A(!0),v(U,null,Q(n.cols,m=>(A(),T(I,{key:m.name,props:n},{default:a(()=>[b(S(m.value),1)]),_:2},1032,["props"]))),128))]),_:2},1032,["props"])]),_:1},8,["rows","columns","loading"])])])]))}};export{Se as default};
