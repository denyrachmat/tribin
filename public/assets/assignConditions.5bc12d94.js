import{s as n,o as T,B as h,C as k,D as a,J as y,E as e,K as g,I as i,L as Q,Q as d,H as f,M as P,O as x}from"./index.27e3d426.js";import{Q as v}from"./QTooltip.25f632d9.js";import{u as B,a as M,Q as V,b as q}from"./use-dialog-plugin-component.901d821b.js";import{api as _}from"./axios.e105bf57.js";import{_ as A}from"./assignConditionsView.c64aeac8.js";const G=i("div",{class:"text-h6"},"Assign Condition Group",-1),R={class:"row"},S={class:"col"},K={class:"col text-right"},$={class:"row q-pt-md"},E={class:"col"},Y={__name:"assignConditions",setup(H){const C=n([{name:"id",align:"left",label:"ID",field:"id",sortable:!0},{name:"MCONDITION_DESCRIPTION",align:"left",label:"Description",field:"MCONDITION_DESCRIPTION",sortable:!0}]),m=n([]),b=n({sortBy:"desc",descending:!1,rowsPerPage:0}),l=n([]),t=n(""),u=n("new"),c=B(),{dialogRef:U,onDialogHide:J,onDialogOK:L,onDialogCancel:D}=M();T(()=>{O()});const p=()=>{l.value=[],t.value="",u.value="new"},w=()=>{c.dialog({title:"Confirmation",message:"Are you sure want to delete this group ?",cancel:!0,persistent:!0}).onOk(async()=>{await _.delete(`/master/conditions/deleteDataGroup/${btoa(t.value)}`).then(o=>{p()})})},O=async()=>{await _.get("/master/conditions/getdata").then(o=>{console.log(o),m.value=o.data})},N=()=>{c.dialog({component:A}).onOk(async o=>{t.value=o.MCONDITION_RPT_STAT,l.value=o.group,u.value="edit"})},I=()=>{c.dialog({title:"Confirmation",message:"Do you want to save this group ?",cancel:!0,persistent:!0}).onOk(async()=>{await _.post("/master/conditions/assignGroup",{data:l.value,MCONDITION_RPT_STAT:t.value}).then(o=>{p()})})};return(o,s)=>(h(),k(y,{class:"q-dialog-plugin bg-white q-pa-sm"},{default:a(()=>[e(g,null,{default:a(()=>[G]),_:1}),e(g,{class:"q-pa-sm"},{default:a(()=>[i("div",R,[i("div",S,[e(Q,{label:"Group Name",outlined:"",dense:"",modelValue:t.value,"onUpdate:modelValue":s[0]||(s[0]=r=>t.value=r),disable:u.value==="edit"},{after:a(()=>[e(d,{dense:"",icon:"search",color:"blue",flat:"",onClick:N})]),_:1},8,["modelValue","disable"])]),i("div",K,[e(V,{outline:""},{default:a(()=>[e(d,{outline:"",color:"blue",icon:"description",onClick:p},{default:a(()=>[e(v,null,{default:a(()=>[f("New")]),_:1})]),_:1}),e(d,{outline:"",color:"red",icon:"delete",onClick:w},{default:a(()=>[e(v,null,{default:a(()=>[f("Delete")]),_:1})]),_:1})]),_:1})])]),i("div",$,[i("div",E,[e(q,{class:"my-sticky-header-table",flat:"",bordered:"",title:"Conditions",rows:m.value,columns:C.value,"row-key":"id",dense:"",pagination:b.value,selection:"multiple",selected:l.value,"onUpdate:selected":s[1]||(s[1]=r=>l.value=r)},null,8,["rows","columns","pagination","selected"])])])]),_:1}),e(x,{align:"right"},{default:a(()=>[e(d,{label:"OK",color:"primary",onClick:s[2]||(s[2]=r=>I()),disable:l.value.length===0||!t.value},null,8,["disable"]),e(d,{flat:"",label:"Cancel",color:"red",onClick:P(D)},null,8,["onClick"])]),_:1})]),_:1}))}};export{Y as default};
