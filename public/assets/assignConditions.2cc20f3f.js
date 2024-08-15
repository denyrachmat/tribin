import{h as m,c as Y,K as J,L as W,t as h,o as x,C as _,D as w,E as e,F as t,M as X,O as q,J as d,P as I,R as Q,S as G,T as U,U as R,V as Z,I as i,Q as u,W as M,X as j,Y as B,Z as ee,$ as te,a0 as oe}from"./index.fbb4d622.js";import{Q as k}from"./QTooltip.497ec289.js";import{Q as ae}from"./QBtnGroup.7ea5eb0c.js";import{Q as A,a as v,b as P}from"./QSelect.b5f5afbd.js";import{Q as H}from"./QList.3a5a5684.js";import{u as F}from"./format.7e01141f.js";import{u as K}from"./use-dialog-plugin-component.d0abb9f1.js";import{api as $,api_web as V}from"./axios.ae374866.js";import{_ as le}from"./assignConditionsView.6450f53b.js";import"./QTable.5323893d.js";const ne=[m("g",{transform:"translate(20 50)"},[m("rect",{x:"-10",y:"-30",width:"20",height:"60",fill:"currentColor",opacity:"0.6"},[m("animateTransform",{attributeName:"transform",type:"scale",from:"2",to:"1",begin:"0s",repeatCount:"indefinite",dur:"1s",calcMode:"spline",keySplines:"0.1 0.9 0.4 1",keyTimes:"0;1",values:"2;1"})])]),m("g",{transform:"translate(50 50)"},[m("rect",{x:"-10",y:"-30",width:"20",height:"60",fill:"currentColor",opacity:"0.8"},[m("animateTransform",{attributeName:"transform",type:"scale",from:"2",to:"1",begin:"0.1s",repeatCount:"indefinite",dur:"1s",calcMode:"spline",keySplines:"0.1 0.9 0.4 1",keyTimes:"0;1",values:"2;1"})])]),m("g",{transform:"translate(80 50)"},[m("rect",{x:"-10",y:"-30",width:"20",height:"60",fill:"currentColor",opacity:"0.9"},[m("animateTransform",{attributeName:"transform",type:"scale",from:"2",to:"1",begin:"0.2s",repeatCount:"indefinite",dur:"1s",calcMode:"spline",keySplines:"0.1 0.9 0.4 1",keyTimes:"0;1",values:"2;1"})])])];var L=Y({name:"QSpinnerFacebook",props:J,setup(O){const{cSize:f,classes:c}=W(O);return()=>m("svg",{class:c.value,width:f.value,height:f.value,viewBox:"0 0 100 100",xmlns:"http://www.w3.org/2000/svg",preserveAspectRatio:"xMidYMid"},ne)}});const se=d("div",{class:"text-h6"},"Position Assign",-1),ie={class:"text-h5"},re={__name:"positionAssignCondition",props:{groups:String,listCond:Array},setup(O){const{dialogRef:f,onDialogHide:c,onDialogOK:p,onDialogCancel:y}=K(),g=F(),r=O,l=h([]);x(()=>{l.value=r.listCond,l.value=l.value.sort((a,s)=>a.MCONDITION_ORDER_NUMBER-s.MCONDITION_ORDER_NUMBER)});const T=a=>{N(l.value,a,a-1)},D=a=>{N(l.value,a,a+1)},N=(a,s,C)=>{let o=a[s];a[s]=a[C],a[C]=o},S=()=>{g.dialog({title:"Confirmation",message:"Do you want to save this group ?",cancel:!0,persistent:!0}).onOk(async()=>{g.loading.show({spinner:L,spinnerColor:"yellow",spinnerSize:140,backgroundColor:"purple",message:"Save your information, Hang on...",messageColor:"black"});const a=l.value.map(s=>s.id);await $.post("/master/conditions/assignGroup",{data:a,MCONDITION_RPT_STAT:r.groups}).then(async s=>{g.loading.hide(),p()}).catch(s=>{g.loading.hide()})})};return(a,s)=>(_(),w(ee,{ref_key:"dialogRef",ref:f,onHide:B(c),"transition-show":"slide-up","transition-hide":"slide-down","full-width":""},{default:e(()=>[t(X,{class:"q-dialog-plugin bg-white q-pa-sm"},{default:e(()=>[t(q,null,{default:e(()=>[se]),_:1}),t(q,{class:"q-pa-sm"},{default:e(()=>[d("span",ie,I(r.groups),1),t(H,{bordered:""},{default:e(()=>[(_(!0),Q(G,null,U(l.value,(C,o)=>R((_(),w(A,{key:C.id,class:"q-my-sm",clickable:"",dense:""},{default:e(()=>[t(v,{avatar:""},{default:e(()=>[t(Z,{color:"primary","text-color":"white"},{default:e(()=>[i(I(o+1),1)]),_:2},1024)]),_:2},1024),t(v,null,{default:e(()=>[t(P,null,{default:e(()=>[i(I(C.MCONDITION_DESCRIPTION),1)]),_:2},1024)]),_:2},1024),t(v,{side:""},{default:e(()=>[t(u,{icon:"arrow_upward",color:"green",flat:"",disable:o===0,onClick:n=>T(o)},{default:e(()=>[t(k,null,{default:e(()=>[i("Promote Positions")]),_:1})]),_:2},1032,["disable","onClick"])]),_:2},1024),t(v,{side:""},{default:e(()=>[t(u,{icon:"arrow_downward",color:"green",flat:"",disable:o===l.value.length-1,onClick:n=>D(o)},{default:e(()=>[t(k,null,{default:e(()=>[i("Demote Positions")]),_:1})]),_:2},1032,["disable","onClick"])]),_:2},1024)]),_:2},1024)),[[M]])),128))]),_:1})]),_:1}),t(j,{align:"right"},{default:e(()=>[t(u,{label:"OK",color:"primary",onClick:s[0]||(s[0]=C=>S()),disable:a.loading,loading:a.loading},null,8,["disable","loading"]),t(u,{flat:"",label:"Cancel",color:"red",onClick:B(y),loading:a.loading},null,8,["onClick","loading"])]),_:1})]),_:1})]),_:1},8,["onHide"]))}};const de={class:"q-pa-md"},ue=d("div",{class:"row"},[d("div",{class:"col"},[d("div",{class:"text-h6"},"Assign Condition Group")])],-1),ce={class:"row q-pt-md"},pe={class:"col"},me={class:"row"},fe={class:"col"},ge={class:"col text-right"},_e={class:"row q-pt-md"},ve={class:"col",style:{"max-height":"80vh",overflow:"auto"}},Te={__name:"assignConditions",setup(O){h([{name:"id",align:"left",label:"ID",field:"id",sortable:!0},{name:"MCONDITION_DESCRIPTION",align:"left",label:"Description",field:"MCONDITION_DESCRIPTION",sortable:!0}]);const f=h([]);h({sortBy:"desc",descending:!1,rowsPerPage:0});const c=h([]),p=h(""),y=h("new"),g=h(!1),r=F();K(),x(()=>{D()});const l=()=>{c.value=[],p.value="",y.value="new"},T=()=>{r.dialog({title:"Confirmation",message:"Are you sure want to delete this group ?",cancel:!0,persistent:!0}).onOk(async()=>{r.loading.show({spinner:L,spinnerColor:"yellow",spinnerSize:140,backgroundColor:"purple",message:"Save your information, Hang on...",messageColor:"black"}),await $.delete(`/master/conditions/deleteDataGroup/${btoa(p.value)}`).then(o=>{r.loading.hide(),l()})})},D=async()=>{g.value=!0,await $.get("/master/conditions/getdata").then(o=>{console.log(o),g.value=!1,f.value=o.data}).catch(o=>{g.value=!1})},N=()=>{r.dialog({component:le}).onOk(async o=>{p.value=o.MCONDITION_RPT_STAT,c.value=o.group.map(n=>n.id),y.value="edit"})},S=()=>{r.dialog({component:re,componentProps:{groups:p.value,listCond:f.value.filter(o=>c.value.includes(o.id))}}).onOk(async o=>{l()})},a=()=>{r.dialog({title:"Add Conditions",message:"Input conditions",prompt:{model:"",isValid:o=>o.length>2,type:"text"},cancel:!0,persistent:!0}).onOk(async o=>{await V.post("condition",{MCONDITION_DESCRIPTION:o,MCONDITION_ORDER_NUMBER:null}).then(async n=>{l(),await D()})})},s=o=>{r.dialog({title:"Confirmation",message:"Are you sure want to delete this data ?",cancel:!0,persistent:!0}).onOk(async()=>{await V.delete(`condition/${btoa(o)}`).then(async n=>{l(),await D()})})},C=()=>{r.dialog({title:"Confirmation",message:"Are you sure want to transfer condition master ?",cancel:!0,persistent:!0}).onOk(async()=>{})};return(o,n)=>(_(),Q("div",de,[ue,d("div",ce,[d("div",pe,[d("div",me,[d("div",fe,[t(te,{label:"Group Name",outlined:"",dense:"",modelValue:p.value,"onUpdate:modelValue":n[0]||(n[0]=b=>p.value=b),disable:y.value==="edit"},{after:e(()=>[t(u,{dense:"",icon:"search",color:"blue",flat:"",onClick:N})]),_:1},8,["modelValue","disable"])]),d("div",ge,[t(ae,{outline:""},{default:e(()=>[t(u,{outline:"",color:"blue",icon:"description",onClick:l},{default:e(()=>[t(k,null,{default:e(()=>[i("New")]),_:1})]),_:1}),t(u,{outline:"",color:"blue",icon:"save",onClick:S,disable:!p.value||c.value.length===0},{default:e(()=>[t(k,null,{default:e(()=>[i("Save Conditions")]),_:1})]),_:1},8,["disable"]),t(u,{outline:"",color:"blue",icon:"add",onClick:n[1]||(n[1]=b=>a())},{default:e(()=>[t(k,null,{default:e(()=>[i("Add more conditions")]),_:1})]),_:1}),t(u,{outline:"",color:"orange",icon:"send",onClick:n[2]||(n[2]=b=>C())},{default:e(()=>[t(k,null,{default:e(()=>[i("Transfer Data from This CG to Another CG")]),_:1})]),_:1}),t(u,{outline:"",color:"red",icon:"delete",onClick:T,disable:!p.value},{default:e(()=>[t(k,null,{default:e(()=>[i("Delete")]),_:1})]),_:1},8,["disable"])]),_:1})])]),d("div",_e,[d("div",ve,[t(H,{bordered:""},{default:e(()=>[f.value.length===0?R((_(),w(A,{key:0,class:"q-my-sm",clickable:"",tag:"label"},{default:e(()=>[g.value?(_(),w(v,{key:0},{default:e(()=>[i(" Data is loading, please wait. ")]),_:1})):(_(),w(v,{key:1},{default:e(()=>[i(" No Data Available ! ")]),_:1}))]),_:1})),[[M]]):(_(!0),Q(G,{key:1},U(f.value,(b,z)=>R((_(),w(A,{key:z,class:"q-my-sm",clickable:"",tag:"label"},{default:e(()=>[t(v,{side:"",top:""},{default:e(()=>[t(oe,{modelValue:c.value,"onUpdate:modelValue":n[3]||(n[3]=E=>c.value=E),val:b.id},null,8,["modelValue","val"])]),_:2},1024),t(v,null,{default:e(()=>[t(P,null,{default:e(()=>[i(I(b.MCONDITION_DESCRIPTION),1)]),_:2},1024),t(P,{caption:"",lines:"1"},{default:e(()=>[i("Description")]),_:1})]),_:2},1024),t(v,{side:""},{default:e(()=>[t(u,{icon:"delete",color:"red",outline:"",onClick:E=>s(b.id)},null,8,["onClick"])]),_:2},1024)]),_:2},1024)),[[M]])),128))]),_:1})])])])])]))}};export{Te as default};
