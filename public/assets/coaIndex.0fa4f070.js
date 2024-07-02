import{Q as $}from"./QTooltip.7abe8090.js";import{t as _,o as Y,C as p,D as N,E as a,F as e,M as J,O as q,J as l,$ as y,R as O,Q as f,S as P,T as Q,aZ as K,X as Z,Y as I,Z as X,aM as z,I as b,at as W,P as S}from"./index.8f31d21b.js";import{e as V}from"./QSelect.9039ac8d.js";import{u as ee,a as le,b as E}from"./QTable.f5625775.js";import{Q as x,a as B}from"./QTd.e493cf57.js";import{u as H}from"./format.a8ab40aa.js";import{api_web as k}from"./axios.127697c4.js";const ae=l("div",{class:"text-h6"},"Closing Period",-1),oe={style:{border:"1px black solid","border-radius":"10px"}},te=l("legend",{style:{"margin-left":"1em",padding:"0.2em 0.8em"}},[l("b",null,"Header")],-1),se={class:"row q-col-gutter-sm"},ne={class:"col-12 col-sm-6"},de={class:"col-12 col-sm-6"},ie={class:"row q-col-gutter-sm q-pt-sm"},ue={class:"col-12 col-sm-6"},re={class:"col-12 col-sm-6"},ce={key:0,style:{border:"1px black solid","border-radius":"10px"}},Ce=l("legend",{style:{"margin-left":"1em",padding:"0.2em 0.8em"}},[l("b",null,"COA Mapping")],-1),me={class:"row q-col-gutter-sm q-pt-sm"},_e={class:"col-12 col-sm-12 text-right"},pe={class:"col-12 col-sm-2"},Ae={class:"col-12 col-sm-2"},ve={class:"col-12 col-sm-1"},Oe={key:1,class:"row q-col-gutter-sm q-pt-sm"},fe=l("div",{class:"col-12 text-center"},"Click + button to add",-1),ge=[fe],Me={__name:"coaCreate",props:{header:String},setup(U){const g=H(),o=_({MCOA_COACD:"",MCOA_COANM:"",MCOA_CURR:"",MCOA_TYPE:"INC"}),r=_([]),i=_(!1),M=_([]),A=_([{label:"Income",value:"INC"},{label:"Expense",value:"OUT"},{label:"Account Group",value:"group"}]),c=U;Y(async()=>{c.header&&c.header!==""&&(await m(""),o.value.MCOA_COACD=c.header.MCOA_COACD,o.value.MCOA_COANM=c.header.MCOA_COANM,o.value.MCOA_CURR=c.header.MCOA_CURR,o.value.MCOA_TYPE=c.header.MCOA_TYPE,r.value=c.header.det)});const{dialogRef:w,onDialogHide:h,onDialogOK:C,onDialogCancel:d}=ee(),s=(u,t,n,D)=>{t(async()=>{D==="coa"&&await m(u)})},m=async(u,t="MCOA_COACD")=>{i.value=!0,await k.post("coa/searchAPI",{searchValue:u,searchCol:t}).then(n=>{i.value=!1,M.value=n.data.data}).catch(()=>{i.value=!1})},L=()=>{r.value.push({MCOAM_CR_COACD:"",MCOAM_DB_COACD:""})},F=u=>{g.dialog({title:"Confirmation",message:`Do you want to delete this lines no ${u+1} ?`,cancel:!0,persistent:!0}).onOk(async()=>{r.value.splice(u,1),r.value.splice(u+1,1)})},j=u=>{r.value=[]},G=()=>{g.dialog({title:"Confirmation",message:"Are you sure want to save this journal ?",cancel:!0,persistent:!0}).onOk(async()=>{i.value=!0,await k.post(`${o.value.GLHIST_DOC?`acc/journal/${btoa(o.value.GLHIST_DOC)}`:"acc/journal"}`,{...o.value,det:r.value}).then(u=>{i.value=!1,g.notify({color:"green",message:`${u.data.msg}`}),C()}).catch(u=>{i.value=!1})})};return(u,t)=>(p(),N(X,{ref_key:"dialogRef",ref:w,onHide:I(h),"transition-show":"slide-up","transition-hide":"slide-down","full-width":""},{default:a(()=>[e(J,{class:"q-dialog-plugin bg-white q-pa-sm"},{default:a(()=>[e(q,null,{default:a(()=>[ae]),_:1}),e(q,{class:"q-pa-sm"},{default:a(()=>[l("fieldset",oe,[te,l("div",se,[l("div",ne,[e(y,{filled:"",label:"COA Number",modelValue:o.value.MCOA_COACD,"onUpdate:modelValue":t[0]||(t[0]=n=>o.value.MCOA_COACD=n),dense:""},null,8,["modelValue"])]),l("div",de,[e(y,{filled:"",modelValue:o.value.MCOA_COANM,"onUpdate:modelValue":t[1]||(t[1]=n=>o.value.MCOA_COANM=n),label:"COA Name",dense:""},null,8,["modelValue"])])]),l("div",ie,[l("div",ue,[e(y,{filled:"",label:"Valuta",modelValue:o.value.MCOA_CURR,"onUpdate:modelValue":t[2]||(t[2]=n=>o.value.MCOA_CURR=n),dense:""},null,8,["modelValue"])]),l("div",re,[e(V,{filled:"",modelValue:o.value.MCOA_TYPE,"onUpdate:modelValue":[t[3]||(t[3]=n=>o.value.MCOA_TYPE=n),t[4]||(t[4]=n=>j(n))],options:A.value,label:"Filled",dense:""},null,8,["modelValue","options"])])])]),o.value.MCOA_TYPE==="group"?(p(),O("fieldset",ce,[Ce,l("div",me,[l("div",_e,[e(f,{flat:"",color:"primary",icon:"add",onClick:L})])]),r.value.length>0?(p(!0),O(P,{key:0},Q(r.value,(n,D)=>(p(),O("div",{class:"row q-col-gutter-sm q-pt-sm",key:D},[l("div",pe,[e(V,{filled:"",label:"Account Code Credit",modelValue:n.MCOAM_CR_COACD,"onUpdate:modelValue":v=>n.MCOAM_CR_COACD=v,"use-input":"","input-debounce":"500",options:M.value,onFilter:t[5]||(t[5]=(v,R,T)=>s(v,R,T,"coa")),behavior:"dialog","option-label":"MCOA_COANM","option-value":"MCOA_COACD","emit-value":"","map-options":"",loading:i.value,dense:""},null,8,["modelValue","onUpdate:modelValue","options","loading"])]),l("div",Ae,[e(V,{filled:"",label:"Account Code Debit",modelValue:n.MCOAM_DB_COACD,"onUpdate:modelValue":v=>n.MCOAM_DB_COACD=v,"use-input":"","input-debounce":"500",options:M.value,onFilter:t[6]||(t[6]=(v,R,T)=>s(v,R,T,"coa")),behavior:"dialog","option-label":"MCOA_COANM","option-value":"MCOA_COACD","emit-value":"","map-options":"",loading:i.value,dense:""},null,8,["modelValue","onUpdate:modelValue","options","loading"])]),l("div",ve,[e(f,{icon:"delete",onClick:v=>F(D),flat:"",color:"red"},null,8,["onClick"])])]))),128)):(p(),O("div",Oe,ge))])):K("",!0)]),_:1}),e(Z,{align:"right"},{default:a(()=>[e(f,{label:"OK",color:"primary",onClick:t[7]||(t[7]=n=>G()),disable:u.stateSubmit,loading:i.value},null,8,["disable","loading"]),e(f,{flat:"",label:"Cancel",color:"red",onClick:I(d)},null,8,["onClick"])]),_:1})]),_:1})]),_:1},8,["onHide"]))}},be={class:"q-pa-md"},he={class:"row q-pb-md"},De=l("div",{class:"col"},[l("span",{class:"text-h4"},"Chart of Account")],-1),ye={class:"col text-right"},Ve={class:"row q-pt-md"},ke={class:"col"},Ue={__name:"coaIndex",setup(U){const g=H(),o=_("MCOA_COANM"),r=_(""),i=_([]),M=_([{name:"MCOA_COACD",label:"COA Code",field:"MCOA_COACD",sortable:!0,align:"left"},{name:"MCOA_COANM",label:"COA Name",field:"MCOA_COANM",sortable:!0,align:"left"},{name:"MCOA_TYPE",label:"Type",field:"MCOA_TYPE",sortable:!0,align:"left"},{name:"MCOA_CURR",label:"Valuta",field:"MCOA_CURR",sortable:!0,align:"left"},{name:"MAP_PARAM",label:"COA Configured",field:"MAP_PARAM",sortable:!0,align:"left"}]),A=_(!1);Y(()=>{c()});const c=async()=>{A.value=!0,await k.post("coa/searchAPI",{searchBy:o.value,searchValue:r.value}).then(C=>{A.value=!1,i.value=C.data.data}).catch(C=>{A.value=!1})},w=C=>{g.dialog({title:"Confirmation",message:"Are you sure want to delete this journal doc ?",cancel:!0,persistent:!0}).onOk(async()=>{k.delete(`acc/journal/${btoa(C)}`).then(d=>{A.value=!1,i.value=d.data.data}).catch(d=>{A.value=!1})})},h=(C=null)=>{g.dialog({component:Me,componentProps:{header:C}}).onOk(async d=>{c()})};return(C,d)=>(p(),O("div",be,[l("div",he,[De,l("div",ye,[e(f,{icon:"add",color:"blue",onClick:d[0]||(d[0]=s=>h())},{default:a(()=>[e($,null,{default:a(()=>[b("Create New COA")]),_:1})]),_:1})])]),e(z),l("div",Ve,[l("div",ke,[e(le,{title:"COA List",rows:i.value,columns:M.value,"row-key":"name",loading:A.value,dense:"",pagination:{rowsPerPage:20},class:"my-sticky-header-column-table"},{"top-right":a(()=>[e(V,{outlined:"",modelValue:o.value,"onUpdate:modelValue":d[1]||(d[1]=s=>o.value=s),options:M.value,label:"Search Columns","option-value":"name","option-label":"label","emit-value":"",dense:"","map-options":""},null,8,["modelValue","options"]),e(y,{borderless:"",dense:"",modelValue:r.value,"onUpdate:modelValue":[d[2]||(d[2]=s=>r.value=s),d[3]||(d[3]=s=>C.dataAcc())],placeholder:"Search",outlined:"",debounce:"1000"},{append:a(()=>[e(W,{name:"search"})]),_:1},8,["modelValue"])]),header:a(s=>[e(x,{props:s},{default:a(()=>[e(E,{"auto-width":""},{default:a(()=>[b("Action")]),_:1}),(p(!0),O(P,null,Q(s.cols,m=>(p(),N(E,{key:m.name,props:s},{default:a(()=>[b(S(m.label),1)]),_:2},1032,["props"]))),128))]),_:2},1032,["props"])]),body:a(s=>[e(x,{props:s},{default:a(()=>[e(B,{"auto-width":""},{default:a(()=>[e(f,{flat:"",color:"orange",icon:"edit",onClick:m=>h(s.row),dense:""},{default:a(()=>[e($,null,{default:a(()=>[b("Journal Edit")]),_:1})]),_:2},1032,["onClick"]),e(f,{flat:"",color:"red",icon:"delete",onClick:m=>w(s.row.GLHIST_DOC),dense:""},{default:a(()=>[e($,null,{default:a(()=>[b("Journal Delete")]),_:1})]),_:2},1032,["onClick"])]),_:2},1024),(p(!0),O(P,null,Q(s.cols,m=>(p(),N(B,{key:m.name,props:s},{default:a(()=>[b(S(m.value),1)]),_:2},1032,["props"]))),128))]),_:2},1032,["props"])]),_:1},8,["rows","columns","loading"])])])]))}};export{Ue as default};
