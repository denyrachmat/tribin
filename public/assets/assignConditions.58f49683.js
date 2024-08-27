import{h,c as Z,K as j,L as ee,t as f,o as E,C as b,D as N,E as a,F as e,M as K,O as Q,J as s,P as R,R as M,S as F,T as L,U as G,V as ae,I as u,Q as c,W as P,X as z,Y as $,Z as Y,$ as te,a0 as oe}from"./index.62517fcc.js";import{Q as O}from"./QTooltip.e5597fe1.js";import{Q as le}from"./QBtnGroup.15dbaede.js";import{Q as A,a as y,b as V,c as H}from"./QSelect.cdd726ea.js";import{Q as J}from"./QList.ae3270e5.js";import{u as x}from"./format.13d3d63a.js";import{u as B}from"./use-dialog-plugin-component.126a3a01.js";import{api as q,api_web as S}from"./axios.4c6d6ef6.js";import{_ as ne}from"./assignConditionsView.6e59196b.js";import"./QTable.5986d2c4.js";const se=[h("g",{transform:"translate(20 50)"},[h("rect",{x:"-10",y:"-30",width:"20",height:"60",fill:"currentColor",opacity:"0.6"},[h("animateTransform",{attributeName:"transform",type:"scale",from:"2",to:"1",begin:"0s",repeatCount:"indefinite",dur:"1s",calcMode:"spline",keySplines:"0.1 0.9 0.4 1",keyTimes:"0;1",values:"2;1"})])]),h("g",{transform:"translate(50 50)"},[h("rect",{x:"-10",y:"-30",width:"20",height:"60",fill:"currentColor",opacity:"0.8"},[h("animateTransform",{attributeName:"transform",type:"scale",from:"2",to:"1",begin:"0.1s",repeatCount:"indefinite",dur:"1s",calcMode:"spline",keySplines:"0.1 0.9 0.4 1",keyTimes:"0;1",values:"2;1"})])]),h("g",{transform:"translate(80 50)"},[h("rect",{x:"-10",y:"-30",width:"20",height:"60",fill:"currentColor",opacity:"0.9"},[h("animateTransform",{attributeName:"transform",type:"scale",from:"2",to:"1",begin:"0.2s",repeatCount:"indefinite",dur:"1s",calcMode:"spline",keySplines:"0.1 0.9 0.4 1",keyTimes:"0;1",values:"2;1"})])])];var W=Z({name:"QSpinnerFacebook",props:j,setup(I){const{cSize:g,classes:p}=ee(I);return()=>h("svg",{class:p.value,width:g.value,height:g.value,viewBox:"0 0 100 100",xmlns:"http://www.w3.org/2000/svg",preserveAspectRatio:"xMidYMid"},se)}});const ie=s("div",{class:"text-h6"},"Position Assign",-1),re={class:"text-h5"},de={__name:"positionAssignCondition",props:{groups:String,listCond:Array},setup(I){const{dialogRef:g,onDialogHide:p,onDialogOK:v,onDialogCancel:k}=B(),_=x(),d=I,n=f([]);E(()=>{n.value=d.listCond,n.value=n.value.sort((l,r)=>l.MCONDITION_ORDER_NUMBER-r.MCONDITION_ORDER_NUMBER)});const D=l=>{i(n.value,l,l-1)},w=l=>{i(n.value,l,l+1)},i=(l,r,C)=>{let t=l[r];l[r]=l[C],l[C]=t},T=()=>{_.dialog({title:"Confirmation",message:"Do you want to save this group ?",cancel:!0,persistent:!0}).onOk(async()=>{_.loading.show({spinner:W,spinnerColor:"yellow",spinnerSize:140,backgroundColor:"purple",message:"Save your information, Hang on...",messageColor:"black"});const l=n.value.map(r=>r.id);await q.post("/master/conditions/assignGroup",{data:l,MCONDITION_RPT_STAT:d.groups}).then(async r=>{_.loading.hide(),v()}).catch(r=>{_.loading.hide()})})};return(l,r)=>(b(),N(Y,{ref_key:"dialogRef",ref:g,onHide:$(p),"transition-show":"slide-up","transition-hide":"slide-down","full-width":""},{default:a(()=>[e(K,{class:"q-dialog-plugin bg-white q-pa-sm"},{default:a(()=>[e(Q,null,{default:a(()=>[ie]),_:1}),e(Q,{class:"q-pa-sm"},{default:a(()=>[s("span",re,R(d.groups),1),e(J,{bordered:""},{default:a(()=>[(b(!0),M(F,null,L(n.value,(C,t)=>G((b(),N(A,{key:C.id,class:"q-my-sm",clickable:"",dense:""},{default:a(()=>[e(y,{avatar:""},{default:a(()=>[e(ae,{color:"primary","text-color":"white"},{default:a(()=>[u(R(t+1),1)]),_:2},1024)]),_:2},1024),e(y,null,{default:a(()=>[e(V,null,{default:a(()=>[u(R(C.MCONDITION_DESCRIPTION),1)]),_:2},1024)]),_:2},1024),e(y,{side:""},{default:a(()=>[e(c,{icon:"arrow_upward",color:"green",flat:"",disable:t===0,onClick:o=>D(t)},{default:a(()=>[e(O,null,{default:a(()=>[u("Promote Positions")]),_:1})]),_:2},1032,["disable","onClick"])]),_:2},1024),e(y,{side:""},{default:a(()=>[e(c,{icon:"arrow_downward",color:"green",flat:"",disable:t===n.value.length-1,onClick:o=>w(t)},{default:a(()=>[e(O,null,{default:a(()=>[u("Demote Positions")]),_:1})]),_:2},1032,["disable","onClick"])]),_:2},1024)]),_:2},1024)),[[P]])),128))]),_:1})]),_:1}),e(z,{align:"right"},{default:a(()=>[e(c,{label:"OK",color:"primary",onClick:r[0]||(r[0]=C=>T()),disable:l.loading,loading:l.loading},null,8,["disable","loading"]),e(c,{flat:"",label:"Cancel",color:"red",onClick:$(k),loading:l.loading},null,8,["onClick","loading"])]),_:1})]),_:1})]),_:1},8,["onHide"]))}},ue=s("div",{class:"text-h6"},"Transfer data to another CG",-1),ce={class:"row"},pe={class:"col"},me={class:"row q-pt-md"},fe={class:"col"},ge={__name:"exportDataView",props:{table:Array},setup(I){const{dialogRef:g,onDialogHide:p,onDialogOK:v,onDialogCancel:k}=B(),_=x(),d=I,n=f(""),D=f(""),w=f([]),i=f(!1);E(()=>{T(),l()});const T=async()=>{i.value=!0,await S.get("company").then(t=>{i.value=!1,w.value=t.data.data}).catch(t=>{i.value=!1})},l=async()=>{i.value=!0,await S.get("companies/nowCG").then(t=>{i.value=!1,n.value=t.data}).catch(t=>{i.value=!1})},r=()=>{_.dialog({title:"Confirmation",message:"Do you want to transfer all this data ? all data on destination CG will be deleted !!",cancel:!0,persistent:!0}).onOk(async()=>{d.table.map(async t=>{C(t)})})},C=async t=>{i.value=!0,await S.post("companies/transferData",{frCG:n.value,toCG:D.value,table:t}).then(o=>{i.value=!1}).catch(o=>{i.value=!1})};return(t,o)=>(b(),N(Y,{ref_key:"dialogRef",ref:g,onHide:$(p),"transition-show":"slide-up","transition-hide":"slide-down","full-width":""},{default:a(()=>[e(K,{class:"q-dialog-plugin bg-white q-pa-sm"},{default:a(()=>[e(Q,null,{default:a(()=>[ue]),_:1}),e(Q,{class:"q-pa-sm"},{default:a(()=>[s("div",ce,[s("div",pe,[e(H,{dense:"",filled:"",label:"From CG",modelValue:n.value,"onUpdate:modelValue":o[0]||(o[0]=m=>n.value=m),options:w.value,"option-label":"name","option-value":"connection","emit-value":"","map-options":"",loading:i.value},null,8,["modelValue","options","loading"])])]),s("div",me,[s("div",fe,[e(H,{dense:"",filled:"",label:"To CG",modelValue:D.value,"onUpdate:modelValue":o[1]||(o[1]=m=>D.value=m),options:w.value,"option-label":"name","option-value":"connection","emit-value":"","map-options":"",loading:i.value},null,8,["modelValue","options","loading"])])])]),_:1}),e(z,{align:"right"},{default:a(()=>[e(c,{label:"OK",color:"primary",onClick:o[2]||(o[2]=m=>r())}),e(c,{flat:"",label:"Cancel",color:"red",onClick:$(k)},null,8,["onClick"])]),_:1})]),_:1})]),_:1},8,["onHide"]))}};const ve={class:"q-pa-md"},_e=s("div",{class:"row"},[s("div",{class:"col"},[s("div",{class:"text-h6"},"Assign Condition Group")])],-1),Ce={class:"row q-pt-md"},he={class:"col"},be={class:"row"},we={class:"col"},ye={class:"col text-right"},ke={class:"row q-pt-md"},De={class:"col",style:{"max-height":"80vh",overflow:"auto"}},Pe={__name:"assignConditions",setup(I){f([{name:"id",align:"left",label:"ID",field:"id",sortable:!0},{name:"MCONDITION_DESCRIPTION",align:"left",label:"Description",field:"MCONDITION_DESCRIPTION",sortable:!0}]);const g=f([]);f({sortBy:"desc",descending:!1,rowsPerPage:0});const p=f([]),v=f(""),k=f("new"),_=f(!1),d=x();B(),E(()=>{w()});const n=()=>{p.value=[],v.value="",k.value="new"},D=()=>{d.dialog({title:"Confirmation",message:"Are you sure want to delete this group ?",cancel:!0,persistent:!0}).onOk(async()=>{d.loading.show({spinner:W,spinnerColor:"yellow",spinnerSize:140,backgroundColor:"purple",message:"Save your information, Hang on...",messageColor:"black"}),await q.delete(`/master/conditions/deleteDataGroup/${btoa(v.value)}`).then(t=>{d.loading.hide(),n()})})},w=async()=>{_.value=!0,await q.get("/master/conditions/getdata").then(t=>{console.log(t),_.value=!1,g.value=t.data}).catch(t=>{_.value=!1})},i=()=>{d.dialog({component:ne}).onOk(async t=>{v.value=t.MCONDITION_RPT_STAT,p.value=t.group.map(o=>o.id),k.value="edit"})},T=()=>{d.dialog({component:de,componentProps:{groups:v.value,listCond:g.value.filter(t=>p.value.includes(t.id))}}).onOk(async t=>{n()})},l=()=>{d.dialog({title:"Add Conditions",message:"Input conditions",prompt:{model:"",isValid:t=>t.length>2,type:"text"},cancel:!0,persistent:!0}).onOk(async t=>{await S.post("condition",{MCONDITION_DESCRIPTION:t,MCONDITION_ORDER_NUMBER:null}).then(async o=>{n(),await w()})})},r=t=>{d.dialog({title:"Confirmation",message:"Are you sure want to delete this data ?",cancel:!0,persistent:!0}).onOk(async()=>{await S.delete(`condition/${btoa(t)}`).then(async o=>{n(),await w()})})},C=()=>{d.dialog({component:ge,componentProps:{table:["M_COND_GROUP","M_CONDITIONS"]}}).onOk(async t=>{})};return(t,o)=>(b(),M("div",ve,[_e,s("div",Ce,[s("div",he,[s("div",be,[s("div",we,[e(te,{label:"Group Name",outlined:"",dense:"",modelValue:v.value,"onUpdate:modelValue":o[0]||(o[0]=m=>v.value=m),disable:k.value==="edit"},{after:a(()=>[e(c,{dense:"",icon:"search",color:"blue",flat:"",onClick:i})]),_:1},8,["modelValue","disable"])]),s("div",ye,[e(le,{outline:""},{default:a(()=>[e(c,{outline:"",color:"blue",icon:"description",onClick:n},{default:a(()=>[e(O,null,{default:a(()=>[u("New")]),_:1})]),_:1}),e(c,{outline:"",color:"blue",icon:"save",onClick:T,disable:!v.value||p.value.length===0},{default:a(()=>[e(O,null,{default:a(()=>[u("Save Conditions")]),_:1})]),_:1},8,["disable"]),e(c,{outline:"",color:"blue",icon:"add",onClick:o[1]||(o[1]=m=>l())},{default:a(()=>[e(O,null,{default:a(()=>[u("Add more conditions")]),_:1})]),_:1}),e(c,{outline:"",color:"orange",icon:"send",onClick:o[2]||(o[2]=m=>C())},{default:a(()=>[e(O,null,{default:a(()=>[u("Transfer Data from This CG to Another CG")]),_:1})]),_:1}),e(c,{outline:"",color:"red",icon:"delete",onClick:D,disable:!v.value},{default:a(()=>[e(O,null,{default:a(()=>[u("Delete")]),_:1})]),_:1},8,["disable"])]),_:1})])]),s("div",ke,[s("div",De,[e(J,{bordered:""},{default:a(()=>[g.value.length===0?G((b(),N(A,{key:0,class:"q-my-sm",clickable:"",tag:"label"},{default:a(()=>[_.value?(b(),N(y,{key:0},{default:a(()=>[u(" Data is loading, please wait. ")]),_:1})):(b(),N(y,{key:1},{default:a(()=>[u(" No Data Available ! ")]),_:1}))]),_:1})),[[P]]):(b(!0),M(F,{key:1},L(g.value,(m,X)=>G((b(),N(A,{key:X,class:"q-my-sm",clickable:"",tag:"label"},{default:a(()=>[e(y,{side:"",top:""},{default:a(()=>[e(oe,{modelValue:p.value,"onUpdate:modelValue":o[3]||(o[3]=U=>p.value=U),val:m.id},null,8,["modelValue","val"])]),_:2},1024),e(y,null,{default:a(()=>[e(V,null,{default:a(()=>[u(R(m.MCONDITION_DESCRIPTION),1)]),_:2},1024),e(V,{caption:"",lines:"1"},{default:a(()=>[u("Description")]),_:1})]),_:2},1024),e(y,{side:""},{default:a(()=>[e(c,{icon:"delete",color:"red",outline:"",onClick:U=>r(m.id)},null,8,["onClick"])]),_:2},1024)]),_:2},1024)),[[P]])),128))]),_:1})])])])])]))}};export{Pe as default};
