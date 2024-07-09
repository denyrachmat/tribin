import{t as v,o as $,C as p,D as O,E as o,F as e,M as J,O as w,J as l,$ as S,at as P,U as K,Q as T,R as g,S as V,T as A,aZ as Z,P as y,X,Y as E,Z as z,aM as W,I as b}from"./index.25645e5c.js";import{e as R}from"./QSelect.519a14c0.js";import{a as ee,b as M}from"./QTable.59b4bbc0.js";import{Q as F,a as U}from"./QTd.4ec94286.js";import{Q}from"./QTooltip.b32cbc16.js";import{u as q}from"./format.8fcdfb18.js";import{api_web as L}from"./axios.d3324d07.js";import{Q as le,a as ae,C as oe}from"./ClosePopup.671ae7d8.js";import{Q as te}from"./QBtnToggle.3740dd8f.js";import{u as se}from"./use-dialog-plugin-component.418e5cd1.js";import"./use-render-cache.3aae9b27.js";import"./date.7f4bc432.js";import"./QBtnGroup.d04df57a.js";const ne=l("div",{class:"text-h6"},"Closing Period",-1),de={style:{border:"1px black solid","border-radius":"10px"}},ie=l("legend",{style:{"margin-left":"1em",padding:"0.2em 0.8em"}},[l("b",null,"Header")],-1),ue={class:"row q-col-gutter-sm q-pt-sm"},re={class:"col-12 col-sm-6"},ce={class:"col-12 col-sm-6"},me={class:"row items-center justify-end"},_e={style:{border:"1px black solid","border-radius":"10px"}},pe=l("legend",{style:{"margin-left":"1em",padding:"0.2em 0.8em"}},[l("b",null,"Detail")],-1),Ce={class:"row q-col-gutter-sm q-pt-sm"},ve={class:"col-12 col-sm-12 text-right"},Te={class:"col-12 col-sm-3"},fe={class:"col-12 col-sm-2"},ge={class:"col-12 col-sm-2"},he={class:"col-12 col-sm-2"},Ie={class:"col-12 col-sm-2"},Se={key:0,class:"col-12 col-sm-1"},De={key:1,class:"row q-col-gutter-sm q-pt-sm"},be={class:"col-12 text-center"},He={__name:"journalInputCreate",props:{header:String},setup(k){const h=q(),t=v({GLHIST_DOC:"",GLHIST_EFFDT:"",MCOA_TYPE:"INC"}),r=v([]),m=v(!1),I=v([]),_=k;$(async()=>{_.header&&_.header!==""&&(await s(""),t.value.GLHIST_DOC=_.header.GLHIST_DOC,t.value.GLHIST_EFFDT=_.header.GLHIST_EFFDT,r.value=_.header.det)});const{dialogRef:D,onDialogHide:G,onDialogOK:H,onDialogCancel:c}=se(),d=(i,n,a,f)=>{n(async()=>{f==="coa"&&await s(i)})},s=async(i,n="MCOA_COACD")=>{m.value=!0,await L.post("coa/searchAPI",{searchValue:i,searchCol:n}).then(a=>{m.value=!1,I.value=a.data.data}).catch(()=>{m.value=!1})},C=()=>{r.value.push({GLHIST_ACC:"",GLHIST_DOC:t.value.GLHIST_DOC,GLHIST_AMT:0,GLHIST_DESC:"",GLHIST_EFFDT:t.value.GLHIST_EFFDT,MCOA_TYPE:"OUT"}),r.value.push({GLHIST_ACC:"",GLHIST_DOC:t.value.GLHIST_DOC,GLHIST_AMT:0,GLHIST_DESC:"",GLHIST_EFFDT:t.value.GLHIST_EFFDT,MCOA_TYPE:"INC"})},x=i=>{h.dialog({title:"Confirmation",message:`Do you want to delete this lines no ${i+1} ?`,cancel:!0,persistent:!0}).onOk(async()=>{r.value.splice(i,1),r.value.splice(i+1,1)})},Y=(i,n)=>{let a=I.value.filter(f=>f.MCOA_COACD===i);a.length>0&&(r.value[n].GLHIST_CURR=a[0].MCOA_CURR)},B=()=>{h.dialog({title:"Confirmation",message:"Are you sure want to save this journal ?",cancel:!0,persistent:!0}).onOk(async()=>{m.value=!0,await L.post(`${t.value.GLHIST_DOC?`acc/journal/${btoa(t.value.GLHIST_DOC)}`:"acc/journal"}`,{...t.value,det:r.value}).then(i=>{m.value=!1,h.notify({color:"green",message:`${i.data.msg}`}),H()}).catch(i=>{m.value=!1})})};return(i,n)=>(p(),O(z,{ref_key:"dialogRef",ref:D,onHide:E(G),"transition-show":"slide-up","transition-hide":"slide-down","full-width":""},{default:o(()=>[e(J,{class:"q-dialog-plugin bg-white q-pa-sm"},{default:o(()=>[e(w,null,{default:o(()=>[ne]),_:1}),e(w,{class:"q-pa-sm"},{default:o(()=>[l("fieldset",de,[ie,l("div",ue,[l("div",re,[e(S,{filled:"",label:"Doc Reference",modelValue:t.value.GLHIST_DOC,"onUpdate:modelValue":n[0]||(n[0]=a=>t.value.GLHIST_DOC=a),readonly:"",dense:""},null,8,["modelValue"])]),l("div",ce,[e(S,{filled:"",modelValue:t.value.GLHIST_EFFDT,"onUpdate:modelValue":n[2]||(n[2]=a=>t.value.GLHIST_EFFDT=a),label:"Eff Date",dense:""},{prepend:o(()=>[e(P,{name:"event",class:"cursor-pointer"},{default:o(()=>[e(le,{cover:"","transition-show":"scale","transition-hide":"scale"},{default:o(()=>[e(ae,{modelValue:t.value.GLHIST_EFFDT,"onUpdate:modelValue":n[1]||(n[1]=a=>t.value.GLHIST_EFFDT=a),mask:"YYYY-MM-DD"},{default:o(()=>[l("div",me,[K(e(T,{label:"Close",color:"primary",flat:""},null,512),[[oe]])])]),_:1},8,["modelValue"])]),_:1})]),_:1})]),_:1},8,["modelValue"])])])]),l("fieldset",_e,[pe,l("div",Ce,[l("div",ve,[e(T,{flat:"",color:"primary",icon:"add",onClick:C})])]),r.value.length>0?(p(!0),g(V,{key:0},A(r.value,(a,f)=>(p(),g("div",{class:"row q-col-gutter-sm q-pt-sm",key:f},[l("div",Te,[e(te,{modelValue:a.MCOA_TYPE,"onUpdate:modelValue":u=>a.MCOA_TYPE=u,spread:"",class:"my-custom-toggle","no-caps":"",rounded:"",unelevated:"","toggle-color":"primary",color:"white","text-color":"primary",options:[{label:"Income",value:"INC"},{label:"Expense",value:"OUT"}],disable:""},null,8,["modelValue","onUpdate:modelValue"])]),l("div",fe,[e(R,{filled:"",label:"Account Code",modelValue:a.GLHIST_ACC,"onUpdate:modelValue":[u=>a.GLHIST_ACC=u,u=>Y(u,f)],"use-input":"","input-debounce":"500",options:I.value,onFilter:n[3]||(n[3]=(u,j,N)=>d(u,j,N,"coa")),behavior:"dialog","option-label":"MCOA_COANM_COMB","option-value":"MCOA_COACD","emit-value":"","map-options":"",loading:m.value,dense:""},null,8,["modelValue","onUpdate:modelValue","options","loading"])]),l("div",ge,[e(S,{filled:"",label:"Valuta",modelValue:a.GLHIST_CURR,"onUpdate:modelValue":u=>a.GLHIST_CURR=u,dense:""},null,8,["modelValue","onUpdate:modelValue"])]),l("div",he,[e(S,{filled:"",label:"Description",modelValue:a.GLHIST_DESC,"onUpdate:modelValue":u=>a.GLHIST_DESC=u,dense:""},null,8,["modelValue","onUpdate:modelValue"])]),l("div",Ie,[e(S,{filled:"",label:"Amount",modelValue:a.GLHIST_AMT,"onUpdate:modelValue":u=>a.GLHIST_AMT=u,dense:""},null,8,["modelValue","onUpdate:modelValue"])]),a.MCOA_TYPE==="OUT"?(p(),g("div",Se,[e(T,{icon:"delete",onClick:u=>x(f),flat:"",color:"red"},null,8,["onClick"])])):Z("",!0)]))),128)):(p(),g("div",De,[l("div",be," Click + button to add "+y(t.value.MCOA_TYPE==="INC"?"Income":"Expense"),1)]))])]),_:1}),e(X,{align:"right"},{default:o(()=>[e(T,{label:"OK",color:"primary",onClick:n[4]||(n[4]=a=>B()),disable:i.stateSubmit,loading:m.value},null,8,["disable","loading"]),e(T,{flat:"",label:"Cancel",color:"red",onClick:E(c)},null,8,["onClick"])]),_:1})]),_:1})]),_:1},8,["onHide"]))}},Le={class:"q-pa-md"},Ge={class:"row q-pb-md"},Oe=l("div",{class:"col"},[l("span",{class:"text-h4"},"Journal Input")],-1),Ve={class:"col text-right"},Ae={class:"row q-pt-md"},ye={class:"col"},Be={__name:"journalInputIndex",setup(k){const h=q(),t=v("GLHIST_DOC"),r=v(""),m=v([]),I=v([{name:"GLHIST_DOC",label:"Journal Doc",field:"GLHIST_DOC",sortable:!0,align:"left"},{name:"GLHIST_CURR",label:"Valuta",field:"GLHIST_CURR",sortable:!0,align:"left"},{name:"GLHIST_AMT_DB",label:"Debit",field:"GLHIST_AMT_DB",sortable:!0,format:c=>c.toLocaleString(),align:"left"},{name:"GLHIST_AMT_CR",label:"Credit",field:"GLHIST_AMT_CR",sortable:!0,format:c=>c.toLocaleString(),align:"left"}]),_=v(!1);$(()=>{D()});const D=async()=>{_.value=!0,await L.post("acc/journal/searchAPI",{searchBy:t.value,searchValue:r.value}).then(c=>{_.value=!1,m.value=c.data.data}).catch(c=>{_.value=!1})},G=c=>{h.dialog({title:"Confirmation",message:"Are you sure want to delete this journal doc ?",cancel:!0,persistent:!0}).onOk(async()=>{L.delete(`acc/journal/${btoa(c)}`).then(d=>{_.value=!1,m.value=d.data.data}).catch(d=>{_.value=!1})})},H=(c=null)=>{h.dialog({component:He,componentProps:{header:c}}).onOk(async d=>{D()})};return(c,d)=>(p(),g("div",Le,[l("div",Ge,[Oe,l("div",Ve,[e(T,{icon:"add",color:"primary",onClick:d[0]||(d[0]=s=>H())})])]),e(W),l("div",Ae,[l("div",ye,[e(ee,{title:"Journal History",rows:m.value,columns:I.value,"row-key":"name",loading:_.value,dense:"",pagination:{rowsPerPage:20},class:"my-sticky-header-column-table"},{"top-right":o(()=>[e(R,{outlined:"",modelValue:t.value,"onUpdate:modelValue":d[1]||(d[1]=s=>t.value=s),options:I.value,label:"Search Columns","option-value":"name","option-label":"label","emit-value":"",dense:"","map-options":""},null,8,["modelValue","options"]),e(S,{borderless:"",dense:"",modelValue:r.value,"onUpdate:modelValue":[d[2]||(d[2]=s=>r.value=s),d[3]||(d[3]=s=>D())],placeholder:"Search",outlined:"",debounce:"1000"},{append:o(()=>[e(P,{name:"search"})]),_:1},8,["modelValue"])]),header:o(s=>[e(F,{props:s},{default:o(()=>[e(M,{"auto-width":""},{default:o(()=>[b("Action")]),_:1}),(p(!0),g(V,null,A(s.cols,C=>(p(),O(M,{key:C.name,props:s},{default:o(()=>[b(y(C.label),1)]),_:2},1032,["props"]))),128))]),_:2},1032,["props"])]),body:o(s=>[e(F,{props:s},{default:o(()=>[e(U,{"auto-width":""},{default:o(()=>[e(T,{flat:"",color:"orange",icon:"edit",onClick:C=>H(s.row),dense:""},{default:o(()=>[e(Q,null,{default:o(()=>[b("Journal Edit")]),_:1})]),_:2},1032,["onClick"]),e(T,{flat:"",color:"red",icon:"delete",onClick:C=>G(s.row.GLHIST_DOC),dense:""},{default:o(()=>[e(Q,null,{default:o(()=>[b("Journal Delete")]),_:1})]),_:2},1032,["onClick"])]),_:2},1024),(p(!0),g(V,null,A(s.cols,C=>(p(),O(U,{key:C.name,props:s},{default:o(()=>[b(y(C.value),1)]),_:2},1032,["props"]))),128))]),_:2},1032,["props"])]),_:1},8,["rows","columns","loading"])])])]))}};export{Be as default};
