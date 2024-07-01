import{t as v,o as $,C,D as G,E as t,F as e,M as N,O as k,J as l,$ as I,at as P,U as K,Q as f,R as S,S as O,T as V,P as y,X,Y as E,Z,aM as z,I as D}from"./index.02b29f63.js";import{e as R}from"./QSelect.18f53098.js";import{u as W,a as ee,b as M}from"./QTable.ec37e1cb.js";import{Q,a as F}from"./QTd.40693142.js";import{Q as U}from"./QTooltip.b3f4536b.js";import{u as q}from"./format.43d8446a.js";import{api_web as L}from"./axios.ee7b4878.js";import{Q as le}from"./QBtnToggle.dc06c38f.js";import{Q as ae,a as oe,C as te}from"./ClosePopup.17f999cb.js";import"./QBtnGroup.19f9ed5e.js";import"./use-render-cache.3aae9b27.js";import"./date.3b479f30.js";const se=l("div",{class:"text-h6"},"Closing Period",-1),ne={style:{border:"1px black solid","border-radius":"10px"}},de=l("legend",{style:{"margin-left":"1em",padding:"0.2em 0.8em"}},[l("b",null,"Header")],-1),ie={class:"row q-col-gutter-sm"},ue={class:"col-12"},re={class:"row q-col-gutter-sm q-pt-sm"},ce={class:"col-12 col-sm-6"},me={class:"col-12 col-sm-6"},_e={class:"row items-center justify-end"},pe={style:{border:"1px black solid","border-radius":"10px"}},ve=l("legend",{style:{"margin-left":"1em",padding:"0.2em 0.8em"}},[l("b",null,"Detail")],-1),Ce={class:"row q-col-gutter-sm q-pt-sm"},fe={class:"col-12 col-sm-12 text-right"},Te={class:"col-12 col-sm-3"},ge={class:"col-12 col-sm-2"},he={class:"col-12 col-sm-3"},Ie={class:"col-12 col-sm-3"},Se={class:"col-12 col-sm-1"},be={key:1,class:"row q-col-gutter-sm q-pt-sm"},De={class:"col-12 text-center"},He={__name:"journalInputCreate",props:{header:String},setup(w){const g=q(),a=v({GLHIST_DOC:"",GLHIST_EFFDT:"",MCOA_TYPE:"INC"}),_=v([]),c=v(!1),h=v([]),i=w;$(async()=>{i.header&&i.header!==""&&(await s(""),a.value.GLHIST_DOC=i.header.GLHIST_DOC,a.value.GLHIST_EFFDT=i.header.GLHIST_EFFDT,a.value.MCOA_TYPE=i.header.MCOA_TYPE,_.value=i.header.det)});const{dialogRef:b,onDialogHide:A,onDialogOK:H,onDialogCancel:u}=W(),d=(r,n,o,T)=>{n(async()=>{T==="coa"&&await s(r)})},s=async(r,n="MCOA_COACD")=>{c.value=!0,await L.post("coa/searchAPI",{searchValue:r,searchCol:n}).then(o=>{c.value=!1,h.value=o.data.data}).catch(()=>{c.value=!1})},p=()=>{_.value.push({GLHIST_ACC:a.value.GLHIST_ACC,GLHIST_DOC:a.value.GLHIST_DOC,GLHIST_AMT:0,GLHIST_DESC:"",GLHIST_EFFDT:a.value.GLHIST_EFFDT,MCOA_TYPE:a.value.MCOA_TYPE})},x=r=>{g.dialog({title:"Confirmation",message:`Do you want to delete this lines no ${r+1} ?`,cancel:!0,persistent:!0}).onOk(async()=>{_.value.splice(r,1)})},Y=(r,n)=>{let o=h.value.filter(T=>T.MCOA_COACD===r);o.length>0&&(_.value[n].GLHIST_CURR=o[0].MCOA_CURR)},j=()=>{g.dialog({title:"Confirmation",message:"Are you sure want to save this journal ?",cancel:!0,persistent:!0}).onOk(async()=>{c.value=!0,await L.post(`${a.value.GLHIST_DOC?`acc/journal/${btoa(a.value.GLHIST_DOC)}`:"acc/journal"}`,{...a.value,det:_.value}).then(r=>{c.value=!1,g.notify({color:"green",message:`${r.data.msg}`}),H()}).catch(r=>{c.value=!1})})};return(r,n)=>(C(),G(Z,{ref_key:"dialogRef",ref:b,onHide:E(A),"transition-show":"slide-up","transition-hide":"slide-down","full-width":""},{default:t(()=>[e(N,{class:"q-dialog-plugin bg-white q-pa-sm"},{default:t(()=>[e(k,null,{default:t(()=>[se]),_:1}),e(k,{class:"q-pa-sm"},{default:t(()=>[l("fieldset",ne,[de,l("div",ie,[l("div",ue,[e(le,{modelValue:a.value.MCOA_TYPE,"onUpdate:modelValue":n[0]||(n[0]=o=>a.value.MCOA_TYPE=o),spread:"",class:"my-custom-toggle","no-caps":"",rounded:"",unelevated:"","toggle-color":"primary",color:"white","text-color":"primary",options:[{label:"Income",value:"INC"},{label:"Expense",value:"OUT"}],disable:a.value.GLHIST_DOC!==""},null,8,["modelValue","disable"])])]),l("div",re,[l("div",ce,[e(I,{filled:"",label:"Doc Reference",modelValue:a.value.GLHIST_DOC,"onUpdate:modelValue":n[1]||(n[1]=o=>a.value.GLHIST_DOC=o),readonly:"",dense:""},null,8,["modelValue"])]),l("div",me,[e(I,{filled:"",modelValue:a.value.GLHIST_EFFDT,"onUpdate:modelValue":n[3]||(n[3]=o=>a.value.GLHIST_EFFDT=o),label:"Eff Date",dense:""},{prepend:t(()=>[e(P,{name:"event",class:"cursor-pointer"},{default:t(()=>[e(ae,{cover:"","transition-show":"scale","transition-hide":"scale"},{default:t(()=>[e(oe,{modelValue:a.value.GLHIST_EFFDT,"onUpdate:modelValue":n[2]||(n[2]=o=>a.value.GLHIST_EFFDT=o),mask:"YYYY-MM-DD"},{default:t(()=>[l("div",_e,[K(e(f,{label:"Close",color:"primary",flat:""},null,512),[[te]])])]),_:1},8,["modelValue"])]),_:1})]),_:1})]),_:1},8,["modelValue"])])])]),l("fieldset",pe,[ve,l("div",Ce,[l("div",fe,[e(f,{flat:"",color:"primary",icon:"add",onClick:p})])]),_.value.length>0?(C(!0),S(O,{key:0},V(_.value,(o,T)=>(C(),S("div",{class:"row q-col-gutter-sm q-pt-sm",key:T},[l("div",Te,[e(R,{filled:"",label:"Account Code",modelValue:o.GLHIST_ACC,"onUpdate:modelValue":[m=>o.GLHIST_ACC=m,m=>Y(m,T)],"use-input":"","input-debounce":"500",options:h.value,onFilter:n[4]||(n[4]=(m,B,J)=>d(m,B,J,"coa")),behavior:"dialog","option-label":"MCOA_COANM","option-value":"MCOA_COACD","emit-value":"","map-options":"",loading:c.value,dense:""},null,8,["modelValue","onUpdate:modelValue","options","loading"])]),l("div",ge,[e(I,{filled:"",label:"Valuta",modelValue:o.GLHIST_CURR,"onUpdate:modelValue":m=>o.GLHIST_CURR=m,dense:""},null,8,["modelValue","onUpdate:modelValue"])]),l("div",he,[e(I,{filled:"",label:"Description",modelValue:o.GLHIST_DESC,"onUpdate:modelValue":m=>o.GLHIST_DESC=m,dense:""},null,8,["modelValue","onUpdate:modelValue"])]),l("div",Ie,[e(I,{filled:"",label:"Amount",modelValue:o.GLHIST_AMT,"onUpdate:modelValue":m=>o.GLHIST_AMT=m,dense:""},null,8,["modelValue","onUpdate:modelValue"])]),l("div",Se,[e(f,{icon:"delete",onClick:m=>x(T),flat:"",color:"red"},null,8,["onClick"])])]))),128)):(C(),S("div",be,[l("div",De," Click + button to add "+y(a.value.MCOA_TYPE==="INC"?"Income":"Expense"),1)]))])]),_:1}),e(X,{align:"right"},{default:t(()=>[e(f,{label:"OK",color:"primary",onClick:n[5]||(n[5]=o=>j()),disable:r.stateSubmit,loading:c.value},null,8,["disable","loading"]),e(f,{flat:"",label:"Cancel",color:"red",onClick:E(u)},null,8,["onClick"])]),_:1})]),_:1})]),_:1},8,["onHide"]))}},Le={class:"q-pa-md"},Ae={class:"row q-pb-md"},Ge=l("div",{class:"col"},[l("span",{class:"text-h4"},"Journal Input")],-1),Oe={class:"col text-right"},Ve={class:"row q-pt-md"},ye={class:"col"},Ye={__name:"journalInputIndex",setup(w){const g=q(),a=v("GLHIST_DOC"),_=v(""),c=v([]),h=v([{name:"GLHIST_DOC",label:"Journal Doc",field:"GLHIST_DOC",sortable:!0,align:"left"},{name:"GLHIST_CURR",label:"Valuta",field:"GLHIST_CURR",sortable:!0,align:"left"},{name:"GLHIST_AMT_DB",label:"Debit",field:"GLHIST_AMT_DB",sortable:!0,format:u=>u.toLocaleString(),align:"left"},{name:"GLHIST_AMT_CR",label:"Credit",field:"GLHIST_AMT_CR",sortable:!0,format:u=>u.toLocaleString(),align:"left"}]),i=v(!1);$(()=>{b()});const b=async()=>{i.value=!0,await L.post("acc/journal/searchAPI",{searchBy:a.value,searchValue:_.value}).then(u=>{i.value=!1,c.value=u.data.data}).catch(u=>{i.value=!1})},A=u=>{g.dialog({title:"Confirmation",message:"Are you sure want to delete this journal doc ?",cancel:!0,persistent:!0}).onOk(async()=>{L.delete(`acc/journal/${btoa(u)}`).then(d=>{i.value=!1,c.value=d.data.data}).catch(d=>{i.value=!1})})},H=(u=null)=>{g.dialog({component:He,componentProps:{header:u}}).onOk(async d=>{b()})};return(u,d)=>(C(),S("div",Le,[l("div",Ae,[Ge,l("div",Oe,[e(f,{icon:"add",color:"primary",onClick:d[0]||(d[0]=s=>H())})])]),e(z),l("div",Ve,[l("div",ye,[e(ee,{title:"Journal History",rows:c.value,columns:h.value,"row-key":"name",loading:i.value,dense:"",pagination:{rowsPerPage:20},class:"my-sticky-header-column-table"},{"top-right":t(()=>[e(R,{outlined:"",modelValue:a.value,"onUpdate:modelValue":d[1]||(d[1]=s=>a.value=s),options:h.value,label:"Search Columns","option-value":"name","option-label":"label","emit-value":"",dense:"","map-options":""},null,8,["modelValue","options"]),e(I,{borderless:"",dense:"",modelValue:_.value,"onUpdate:modelValue":[d[2]||(d[2]=s=>_.value=s),d[3]||(d[3]=s=>b())],placeholder:"Search",outlined:"",debounce:"1000"},{append:t(()=>[e(P,{name:"search"})]),_:1},8,["modelValue"])]),header:t(s=>[e(Q,{props:s},{default:t(()=>[e(M,{"auto-width":""},{default:t(()=>[D("Action")]),_:1}),(C(!0),S(O,null,V(s.cols,p=>(C(),G(M,{key:p.name,props:s},{default:t(()=>[D(y(p.label),1)]),_:2},1032,["props"]))),128))]),_:2},1032,["props"])]),body:t(s=>[e(Q,{props:s},{default:t(()=>[e(F,{"auto-width":""},{default:t(()=>[e(f,{flat:"",color:"orange",icon:"edit",onClick:p=>H(s.row),dense:""},{default:t(()=>[e(U,null,{default:t(()=>[D("Journal Edit")]),_:1})]),_:2},1032,["onClick"]),e(f,{flat:"",color:"red",icon:"delete",onClick:p=>A(s.row.GLHIST_DOC),dense:""},{default:t(()=>[e(U,null,{default:t(()=>[D("Journal Delete")]),_:1})]),_:2},1032,["onClick"])]),_:2},1024),(C(!0),S(O,null,V(s.cols,p=>(C(),G(F,{key:p.name,props:s},{default:t(()=>[D(y(p.value),1)]),_:2},1032,["props"]))),128))]),_:2},1032,["props"])]),_:1},8,["rows","columns","loading"])])])]))}};export{Ye as default};
