import{t as C,o as $,a as J,C as p,D as O,E as o,F as e,M as K,O as w,J as l,$ as S,av as R,U as Z,Q as f,R as g,S as y,T as G,aZ as X,P as A,X as z,Y as E,Z as W,aI as ee,I as b}from"./index.9e797fbd.js";import{Q as P}from"./QSelect.5c13fc95.js";import{Q as le,a as Q}from"./QTable.07c456cf.js";import{Q as M,a as U}from"./QTd.b3ca9534.js";import{Q as F}from"./QTooltip.518bee1f.js";import{u as q}from"./use-quasar.79d54588.js";import{api_web as L}from"./axios.c5514372.js";import{Q as ae,a as oe,C as te}from"./ClosePopup.483d7355.js";import{Q as se}from"./QBtnToggle.970cf2d1.js";import{u as ne}from"./use-dialog-plugin-component.7068c66f.js";import"./QItemLabel.bee88e45.js";import"./format.e66eab64.js";import"./QList.2cdc02df.js";import"./use-render-cache.3aae9b27.js";import"./date.d4930703.js";import"./QBtnGroup.61a135fb.js";const de=l("div",{class:"text-h6"},"Closing Period",-1),ie={style:{border:"1px black solid","border-radius":"10px"}},ue=l("legend",{style:{"margin-left":"1em",padding:"0.2em 0.8em"}},[l("b",null,"Header")],-1),re={class:"row q-col-gutter-sm q-pt-sm"},ce={class:"col-12 col-sm-6"},me={class:"col-12 col-sm-6"},_e={class:"row items-center justify-end"},pe={style:{border:"1px black solid","border-radius":"10px"}},ve=l("legend",{style:{"margin-left":"1em",padding:"0.2em 0.8em"}},[l("b",null,"Detail")],-1),Ce={class:"row q-col-gutter-sm q-pt-sm"},fe={class:"col-12 col-sm-12 text-right"},Te={class:"col-12 col-sm-3"},ge={class:"col-12 col-sm-2"},he={class:"col-12 col-sm-2"},Ie={class:"col-12 col-sm-2"},Se={class:"col-12 col-sm-2"},De={key:0,class:"col-12 col-sm-1"},be={key:1,class:"row q-col-gutter-sm q-pt-sm"},He={class:"col-12 text-center"},Le={__name:"journalInputCreate",props:{header:String},setup(k){const h=q(),t=C({GLHIST_DOC:"",GLHIST_EFFDT:"",MCOA_TYPE:"INC"}),c=C([]),m=C(!1),I=C([]),_=k;$(async()=>{_.header&&_.header!==""&&(await s(""),t.value.GLHIST_DOC=_.header.GLHIST_DOC,t.value.GLHIST_EFFDT=_.header.GLHIST_EFFDT,c.value=_.header.det)});const{dialogRef:D,onDialogHide:V,onDialogOK:H,onDialogCancel:r}=ne(),d=(i,n,a,T)=>{n(async()=>{T==="coa"&&await s(i)})},s=async(i,n="MCOA_COACD")=>{m.value=!0,await L.post("coa/searchAPI",{searchValue:i,searchCol:n}).then(a=>{m.value=!1,I.value=a.data.data}).catch(()=>{m.value=!1})},v=()=>{c.value.push({GLHIST_ACC:"",GLHIST_DOC:t.value.GLHIST_DOC,GLHIST_AMT:0,GLHIST_DESC:"",GLHIST_EFFDT:t.value.GLHIST_EFFDT,MCOA_TYPE:"INC"})},x=i=>{h.dialog({title:"Confirmation",message:`Do you want to delete this lines no ${i+1} ?`,cancel:!0,persistent:!0}).onOk(async()=>{c.value.splice(i,1),c.value.splice(i+1,1)})},Y=(i,n)=>{let a=I.value.filter(T=>T.MCOA_COACD===i);a.length>0&&(c.value[n].GLHIST_CURR=a[0].MCOA_CURR)},B=()=>{h.dialog({title:"Confirmation",message:"Are you sure want to save this journal ?",cancel:!0,persistent:!0}).onOk(async()=>{m.value=!0,await L.post(`${t.value.GLHIST_DOC?`acc/journal/${btoa(t.value.GLHIST_DOC)}`:"acc/journal"}`,{...t.value,det:c.value}).then(i=>{m.value=!1,h.notify({color:"green",message:`${i.data.msg}`}),H()}).catch(i=>{m.value=!1})})};return J(()=>0),(i,n)=>(p(),O(W,{ref_key:"dialogRef",ref:D,onHide:E(V),"transition-show":"slide-up","transition-hide":"slide-down","full-width":""},{default:o(()=>[e(K,{class:"q-dialog-plugin bg-white q-pa-sm"},{default:o(()=>[e(w,null,{default:o(()=>[de]),_:1}),e(w,{class:"q-pa-sm"},{default:o(()=>[l("fieldset",ie,[ue,l("div",re,[l("div",ce,[e(S,{filled:"",label:"Doc Reference",modelValue:t.value.GLHIST_DOC,"onUpdate:modelValue":n[0]||(n[0]=a=>t.value.GLHIST_DOC=a),readonly:"",dense:""},null,8,["modelValue"])]),l("div",me,[e(S,{filled:"",modelValue:t.value.GLHIST_EFFDT,"onUpdate:modelValue":n[2]||(n[2]=a=>t.value.GLHIST_EFFDT=a),label:"Eff Date",dense:""},{prepend:o(()=>[e(R,{name:"event",class:"cursor-pointer"},{default:o(()=>[e(ae,{cover:"","transition-show":"scale","transition-hide":"scale"},{default:o(()=>[e(oe,{modelValue:t.value.GLHIST_EFFDT,"onUpdate:modelValue":n[1]||(n[1]=a=>t.value.GLHIST_EFFDT=a),mask:"YYYY-MM-DD"},{default:o(()=>[l("div",_e,[Z(e(f,{label:"Close",color:"primary",flat:""},null,512),[[te]])])]),_:1},8,["modelValue"])]),_:1})]),_:1})]),_:1},8,["modelValue"])])])]),l("fieldset",pe,[ve,l("div",Ce,[l("div",fe,[e(f,{flat:"",color:"primary",icon:"add",onClick:v})])]),c.value.length>0?(p(!0),g(y,{key:0},G(c.value,(a,T)=>(p(),g("div",{class:"row q-col-gutter-sm q-pt-sm",key:T},[l("div",Te,[e(se,{modelValue:a.MCOA_TYPE,"onUpdate:modelValue":u=>a.MCOA_TYPE=u,spread:"",class:"my-custom-toggle","no-caps":"",rounded:"",unelevated:"","toggle-color":"primary",color:"white","text-color":"primary",options:[{label:"Income",value:"INC"},{label:"Expense",value:"OUT"}],disable:""},null,8,["modelValue","onUpdate:modelValue"])]),l("div",ge,[e(P,{filled:"",label:"Account Code",modelValue:a.GLHIST_ACC,"onUpdate:modelValue":[u=>a.GLHIST_ACC=u,u=>Y(u,T)],"use-input":"","input-debounce":"500",options:I.value,onFilter:n[3]||(n[3]=(u,j,N)=>d(u,j,N,"coa")),behavior:"dialog","option-label":"MCOA_COANM_COMB","option-value":"MCOA_COACD","emit-value":"","map-options":"",loading:m.value,dense:""},null,8,["modelValue","onUpdate:modelValue","options","loading"])]),l("div",he,[e(S,{filled:"",label:"Valuta",modelValue:a.GLHIST_CURR,"onUpdate:modelValue":u=>a.GLHIST_CURR=u,dense:""},null,8,["modelValue","onUpdate:modelValue"])]),l("div",Ie,[e(S,{filled:"",label:"Description",modelValue:a.GLHIST_DESC,"onUpdate:modelValue":u=>a.GLHIST_DESC=u,dense:""},null,8,["modelValue","onUpdate:modelValue"])]),l("div",Se,[e(S,{filled:"",label:"Amount",modelValue:a.GLHIST_AMT,"onUpdate:modelValue":u=>a.GLHIST_AMT=u,dense:""},null,8,["modelValue","onUpdate:modelValue"])]),a.MCOA_TYPE==="OUT"?(p(),g("div",De,[e(f,{icon:"delete",onClick:u=>x(T),flat:"",color:"red"},null,8,["onClick"])])):X("",!0)]))),128)):(p(),g("div",be,[l("div",He," Click + button to add "+A(t.value.MCOA_TYPE==="INC"?"Income":"Expense"),1)]))])]),_:1}),e(z,{align:"right"},{default:o(()=>[e(f,{label:"OK",color:"primary",onClick:n[4]||(n[4]=a=>B()),disable:i.stateSubmit,loading:m.value},null,8,["disable","loading"]),e(f,{flat:"",label:"Cancel",color:"red",onClick:E(r)},null,8,["onClick"])]),_:1})]),_:1})]),_:1},8,["onHide"]))}},Ve={class:"q-pa-md"},Oe={class:"row q-pb-md"},ye=l("div",{class:"col"},[l("span",{class:"text-h4"},"Journal Input")],-1),Ge={class:"col text-right"},Ae={class:"row q-pt-md"},ke={class:"col"},Ke={__name:"journalInputIndex",setup(k){const h=q(),t=C("GLHIST_DOC"),c=C(""),m=C([]),I=C([{name:"GLHIST_DOC",label:"Journal Doc",field:"GLHIST_DOC",sortable:!0,align:"left"},{name:"GLHIST_CURR",label:"Valuta",field:"GLHIST_CURR",sortable:!0,align:"left"},{name:"GLHIST_AMT_DB",label:"Debit",field:"GLHIST_AMT_DB",sortable:!0,format:r=>r.toLocaleString(),align:"left"},{name:"GLHIST_AMT_CR",label:"Credit",field:"GLHIST_AMT_CR",sortable:!0,format:r=>r.toLocaleString(),align:"left"}]),_=C(!1);$(()=>{D()});const D=async()=>{_.value=!0,await L.post("acc/journal/searchAPI",{searchBy:t.value,searchValue:c.value}).then(r=>{_.value=!1,m.value=r.data.data}).catch(r=>{_.value=!1})},V=r=>{h.dialog({title:"Confirmation",message:"Are you sure want to delete this journal doc ?",cancel:!0,persistent:!0}).onOk(async()=>{L.delete(`acc/journal/${btoa(r)}`).then(d=>{_.value=!1,m.value=d.data.data}).catch(d=>{_.value=!1})})},H=(r=null)=>{h.dialog({component:Le,componentProps:{header:r}}).onOk(async d=>{D()})};return(r,d)=>(p(),g("div",Ve,[l("div",Oe,[ye,l("div",Ge,[e(f,{icon:"add",color:"primary",onClick:d[0]||(d[0]=s=>H())})])]),e(ee),l("div",Ae,[l("div",ke,[e(le,{title:"Journal History",rows:m.value,columns:I.value,"row-key":"name",loading:_.value,dense:"",pagination:{rowsPerPage:20},class:"my-sticky-header-column-table"},{"top-right":o(()=>[e(P,{outlined:"",modelValue:t.value,"onUpdate:modelValue":d[1]||(d[1]=s=>t.value=s),options:I.value,label:"Search Columns","option-value":"name","option-label":"label","emit-value":"",dense:"","map-options":""},null,8,["modelValue","options"]),e(S,{borderless:"",dense:"",modelValue:c.value,"onUpdate:modelValue":[d[2]||(d[2]=s=>c.value=s),d[3]||(d[3]=s=>D())],placeholder:"Search",outlined:"",debounce:"1000"},{append:o(()=>[e(R,{name:"search"})]),_:1},8,["modelValue"])]),header:o(s=>[e(M,{props:s},{default:o(()=>[e(Q,{"auto-width":""},{default:o(()=>[b("Action")]),_:1}),(p(!0),g(y,null,G(s.cols,v=>(p(),O(Q,{key:v.name,props:s},{default:o(()=>[b(A(v.label),1)]),_:2},1032,["props"]))),128))]),_:2},1032,["props"])]),body:o(s=>[e(M,{props:s},{default:o(()=>[e(U,{"auto-width":""},{default:o(()=>[e(f,{flat:"",color:"orange",icon:"edit",onClick:v=>H(s.row),dense:""},{default:o(()=>[e(F,null,{default:o(()=>[b("Journal Edit")]),_:1})]),_:2},1032,["onClick"]),e(f,{flat:"",color:"red",icon:"delete",onClick:v=>V(s.row.GLHIST_DOC),dense:""},{default:o(()=>[e(F,null,{default:o(()=>[b("Journal Delete")]),_:1})]),_:2},1032,["onClick"])]),_:2},1024),(p(!0),g(y,null,G(s.cols,v=>(p(),O(U,{key:v.name,props:s},{default:o(()=>[b(A(v.value),1)]),_:2},1032,["props"]))),128))]),_:2},1032,["props"])]),_:1},8,["rows","columns","loading"])])])]))}};export{Ke as default};
