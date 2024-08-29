import{h,c as Z,K as j,L as ee,t as g,o as E,C as b,D as N,E as a,F as e,M as K,O as Q,J as s,P as R,R as M,S as F,T as L,U as G,V as ae,I as u,Q as c,W as P,X as z,Y as $,Z as Y,$ as oe,a0 as te}from"./index.47737d5f.js";import{Q as O}from"./QTooltip.4f8a8d8e.js";import{Q as le}from"./QBtnGroup.677a92a3.js";import{Q as A,a as y,b as V,c as H}from"./QSelect.dac0d20b.js";import{Q as J}from"./QList.55a53ce9.js";import{u as x}from"./format.34540d76.js";import{u as B}from"./use-dialog-plugin-component.f12ac136.js";import{api as q,api_web as S}from"./axios.6e8ef3b7.js";import{_ as ne}from"./assignConditionsView.7e7c5858.js";import"./QTable.d27de781.js";const se=[h("g",{transform:"translate(20 50)"},[h("rect",{x:"-10",y:"-30",width:"20",height:"60",fill:"currentColor",opacity:"0.6"},[h("animateTransform",{attributeName:"transform",type:"scale",from:"2",to:"1",begin:"0s",repeatCount:"indefinite",dur:"1s",calcMode:"spline",keySplines:"0.1 0.9 0.4 1",keyTimes:"0;1",values:"2;1"})])]),h("g",{transform:"translate(50 50)"},[h("rect",{x:"-10",y:"-30",width:"20",height:"60",fill:"currentColor",opacity:"0.8"},[h("animateTransform",{attributeName:"transform",type:"scale",from:"2",to:"1",begin:"0.1s",repeatCount:"indefinite",dur:"1s",calcMode:"spline",keySplines:"0.1 0.9 0.4 1",keyTimes:"0;1",values:"2;1"})])]),h("g",{transform:"translate(80 50)"},[h("rect",{x:"-10",y:"-30",width:"20",height:"60",fill:"currentColor",opacity:"0.9"},[h("animateTransform",{attributeName:"transform",type:"scale",from:"2",to:"1",begin:"0.2s",repeatCount:"indefinite",dur:"1s",calcMode:"spline",keySplines:"0.1 0.9 0.4 1",keyTimes:"0;1",values:"2;1"})])])];var W=Z({name:"QSpinnerFacebook",props:j,setup(I){const{cSize:v,classes:p}=ee(I);return()=>h("svg",{class:p.value,width:v.value,height:v.value,viewBox:"0 0 100 100",xmlns:"http://www.w3.org/2000/svg",preserveAspectRatio:"xMidYMid"},se)}});const ie=s("div",{class:"text-h6"},"Position Assign",-1),re={class:"text-h5"},de={__name:"positionAssignCondition",props:{groups:String,listCond:Array},setup(I){const{dialogRef:v,onDialogHide:p,onDialogOK:m,onDialogCancel:k}=B(),_=x(),d=I,n=g([]);E(()=>{n.value=d.listCond,n.value=n.value.sort((l,r)=>l.MCONDITION_ORDER_NUMBER-r.MCONDITION_ORDER_NUMBER)});const D=l=>{i(n.value,l,l-1)},w=l=>{i(n.value,l,l+1)},i=(l,r,C)=>{let o=l[r];l[r]=l[C],l[C]=o},T=()=>{_.dialog({title:"Confirmation",message:"Do you want to save this group ?",cancel:!0,persistent:!0}).onOk(async()=>{_.loading.show({spinner:W,spinnerColor:"yellow",spinnerSize:140,backgroundColor:"purple",message:"Save your information, Hang on...",messageColor:"black"});const l=n.value.map(r=>r.id);await q.post("/master/conditions/assignGroup",{data:l,MCONDITION_RPT_STAT:d.groups}).then(async r=>{_.loading.hide(),m()}).catch(r=>{_.loading.hide()})})};return(l,r)=>(b(),N(Y,{ref_key:"dialogRef",ref:v,onHide:$(p),"transition-show":"slide-up","transition-hide":"slide-down","full-width":""},{default:a(()=>[e(K,{class:"q-dialog-plugin bg-white q-pa-sm"},{default:a(()=>[e(Q,null,{default:a(()=>[ie]),_:1}),e(Q,{class:"q-pa-sm"},{default:a(()=>[s("span",re,R(d.groups),1),e(J,{bordered:""},{default:a(()=>[(b(!0),M(F,null,L(n.value,(C,o)=>G((b(),N(A,{key:C.id,class:"q-my-sm",clickable:"",dense:""},{default:a(()=>[e(y,{avatar:""},{default:a(()=>[e(ae,{color:"primary","text-color":"white"},{default:a(()=>[u(R(o+1),1)]),_:2},1024)]),_:2},1024),e(y,null,{default:a(()=>[e(V,null,{default:a(()=>[u(R(C.MCONDITION_DESCRIPTION),1)]),_:2},1024)]),_:2},1024),e(y,{side:""},{default:a(()=>[e(c,{icon:"arrow_upward",color:"green",flat:"",disable:o===0,onClick:t=>D(o)},{default:a(()=>[e(O,null,{default:a(()=>[u("Promote Positions")]),_:1})]),_:2},1032,["disable","onClick"])]),_:2},1024),e(y,{side:""},{default:a(()=>[e(c,{icon:"arrow_downward",color:"green",flat:"",disable:o===n.value.length-1,onClick:t=>w(o)},{default:a(()=>[e(O,null,{default:a(()=>[u("Demote Positions")]),_:1})]),_:2},1032,["disable","onClick"])]),_:2},1024)]),_:2},1024)),[[P]])),128))]),_:1})]),_:1}),e(z,{align:"right"},{default:a(()=>[e(c,{label:"OK",color:"primary",onClick:r[0]||(r[0]=C=>T()),disable:l.loading,loading:l.loading},null,8,["disable","loading"]),e(c,{flat:"",label:"Cancel",color:"red",onClick:$(k),loading:l.loading},null,8,["onClick","loading"])]),_:1})]),_:1})]),_:1},8,["onHide"]))}},ue=s("div",{class:"text-h6"},"Transfer data to another CG",-1),ce={class:"row"},pe={class:"col"},me={class:"row q-pt-md"},fe={class:"col"},ge={__name:"exportDataView",props:{table:Array},setup(I){const{dialogRef:v,onDialogHide:p,onDialogOK:m,onDialogCancel:k}=B(),_=x(),d=I,n=g(""),D=g(""),w=g([]),i=g(!1);E(()=>{T(),l()});const T=async()=>{i.value=!0,await S.get("company").then(o=>{i.value=!1,w.value=o.data.data}).catch(o=>{i.value=!1})},l=async()=>{i.value=!0,await S.get("companies/nowCG").then(o=>{i.value=!1,n.value=o.data}).catch(o=>{i.value=!1})},r=()=>{_.dialog({title:"Confirmation",message:"Do you want to transfer all this data ? all data on destination CG will be deleted !!",cancel:!0,persistent:!0}).onOk(async()=>{d.table.map(async o=>{C(o)})})},C=async o=>{i.value=!0,await S.post("companies/transferData",{frCG:n.value,toCG:D.value,table:o}).then(t=>{m(),i.value=!1}).catch(t=>{i.value=!1})};return(o,t)=>(b(),N(Y,{ref_key:"dialogRef",ref:v,onHide:$(p),"transition-show":"slide-up","transition-hide":"slide-down","full-width":""},{default:a(()=>[e(K,{class:"q-dialog-plugin bg-white q-pa-sm"},{default:a(()=>[e(Q,null,{default:a(()=>[ue]),_:1}),e(Q,{class:"q-pa-sm"},{default:a(()=>[s("div",ce,[s("div",pe,[e(H,{dense:"",filled:"",label:"From CG",modelValue:n.value,"onUpdate:modelValue":t[0]||(t[0]=f=>n.value=f),options:w.value,"option-label":"name","option-value":"connection","emit-value":"","map-options":"",loading:i.value,readonly:""},null,8,["modelValue","options","loading"])])]),s("div",me,[s("div",fe,[e(H,{dense:"",filled:"",label:"To CG",modelValue:D.value,"onUpdate:modelValue":t[1]||(t[1]=f=>D.value=f),options:w.value,"option-label":"name","option-value":"connection","emit-value":"","map-options":"",loading:i.value},null,8,["modelValue","options","loading"])])])]),_:1}),e(z,{align:"right"},{default:a(()=>[e(c,{label:"OK",color:"primary",onClick:t[2]||(t[2]=f=>r())}),e(c,{flat:"",label:"Cancel",color:"red",onClick:$(k)},null,8,["onClick"])]),_:1})]),_:1})]),_:1},8,["onHide"]))}};const ve={class:"q-pa-md"},_e=s("div",{class:"row"},[s("div",{class:"col"},[s("div",{class:"text-h6"},"Assign Condition Group")])],-1),Ce={class:"row q-pt-md"},he={class:"col"},be={class:"row"},we={class:"col"},ye={class:"col text-right"},ke={class:"row q-pt-md"},De={class:"col",style:{"max-height":"80vh",overflow:"auto"}},Pe={__name:"assignConditions",setup(I){g([{name:"id",align:"left",label:"ID",field:"id",sortable:!0},{name:"MCONDITION_DESCRIPTION",align:"left",label:"Description",field:"MCONDITION_DESCRIPTION",sortable:!0}]);const v=g([]);g({sortBy:"desc",descending:!1,rowsPerPage:0});const p=g([]),m=g(""),k=g("new"),_=g(!1),d=x();B(),E(()=>{w()});const n=()=>{p.value=[],m.value="",k.value="new"},D=()=>{d.dialog({title:"Confirmation",message:"Are you sure want to delete this group ?",cancel:!0,persistent:!0}).onOk(async()=>{d.loading.show({spinner:W,spinnerColor:"yellow",spinnerSize:140,backgroundColor:"purple",message:"Save your information, Hang on...",messageColor:"black"}),await q.delete(`/master/conditions/deleteDataGroup/${btoa(m.value)}`).then(o=>{d.loading.hide(),n()})})},w=async()=>{_.value=!0,await q.get("/master/conditions/getdata").then(o=>{console.log(o),_.value=!1,v.value=o.data}).catch(o=>{_.value=!1})},i=()=>{d.dialog({component:ne}).onOk(async o=>{m.value=o.MCONDITION_RPT_STAT,p.value=o.group.map(t=>t.id),k.value="edit"})},T=()=>{d.dialog({component:de,componentProps:{groups:m.value,listCond:v.value.filter(o=>p.value.includes(o.id))}}).onOk(async o=>{n()})},l=()=>{d.dialog({title:"Add Conditions",message:"Input conditions",prompt:{model:"",isValid:o=>o.length>2,type:"text"},cancel:!0,persistent:!0}).onOk(async o=>{await S.post("condition",{MCONDITION_DESCRIPTION:o,MCONDITION_ORDER_NUMBER:null}).then(async t=>{n(),await w()})})},r=o=>{d.dialog({title:"Confirmation",message:"Are you sure want to delete this data ?",cancel:!0,persistent:!0}).onOk(async()=>{await S.delete(`condition/${btoa(o)}`).then(async t=>{n(),await w()})})},C=()=>{d.dialog({component:ge,componentProps:{table:["M_COND_GROUP","M_CONDITIONS"]}}).onOk(async o=>{})};return(o,t)=>(b(),M("div",ve,[_e,s("div",Ce,[s("div",he,[s("div",be,[s("div",we,[e(oe,{label:"Group Name",outlined:"",dense:"",modelValue:m.value,"onUpdate:modelValue":t[0]||(t[0]=f=>m.value=f),disable:k.value==="edit"},{after:a(()=>[e(c,{dense:"",icon:"search",color:"blue",flat:"",onClick:i})]),_:1},8,["modelValue","disable"])]),s("div",ye,[e(le,{outline:""},{default:a(()=>[e(c,{outline:"",color:"blue",icon:"description",onClick:n},{default:a(()=>[e(O,null,{default:a(()=>[u("New")]),_:1})]),_:1}),e(c,{outline:"",color:"blue",icon:"save",onClick:T,disable:!m.value||p.value.length===0},{default:a(()=>[e(O,null,{default:a(()=>[u("Save Conditions")]),_:1})]),_:1},8,["disable"]),e(c,{outline:"",color:"blue",icon:"add",onClick:t[1]||(t[1]=f=>l())},{default:a(()=>[e(O,null,{default:a(()=>[u("Add more conditions")]),_:1})]),_:1}),e(c,{outline:"",color:"orange",icon:"send",onClick:t[2]||(t[2]=f=>C())},{default:a(()=>[e(O,null,{default:a(()=>[u("Transfer Data from This CG to Another CG")]),_:1})]),_:1}),e(c,{outline:"",color:"red",icon:"delete",onClick:D,disable:!m.value},{default:a(()=>[e(O,null,{default:a(()=>[u("Delete")]),_:1})]),_:1},8,["disable"])]),_:1})])]),s("div",ke,[s("div",De,[e(J,{bordered:""},{default:a(()=>[v.value.length===0?G((b(),N(A,{key:0,class:"q-my-sm",clickable:"",tag:"label"},{default:a(()=>[_.value?(b(),N(y,{key:0},{default:a(()=>[u(" Data is loading, please wait. ")]),_:1})):(b(),N(y,{key:1},{default:a(()=>[u(" No Data Available ! ")]),_:1}))]),_:1})),[[P]]):(b(!0),M(F,{key:1},L(v.value,(f,X)=>G((b(),N(A,{key:X,class:"q-my-sm",clickable:"",tag:"label"},{default:a(()=>[e(y,{side:"",top:""},{default:a(()=>[e(te,{modelValue:p.value,"onUpdate:modelValue":t[3]||(t[3]=U=>p.value=U),val:f.id},null,8,["modelValue","val"])]),_:2},1024),e(y,null,{default:a(()=>[e(V,null,{default:a(()=>[u(R(f.MCONDITION_DESCRIPTION),1)]),_:2},1024),e(V,{caption:"",lines:"1"},{default:a(()=>[u("Description")]),_:1})]),_:2},1024),e(y,{side:""},{default:a(()=>[e(c,{icon:"delete",color:"red",outline:"",onClick:U=>r(f.id)},null,8,["onClick"])]),_:2},1024)]),_:2},1024)),[[P]])),128))]),_:1})])])])])]))}};export{Pe as default};
