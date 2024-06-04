import{Q as H}from"./QTooltip.ee3fa4ea.js";import{o as j,t as S,C as L,D as h,E as l,F as e,M as ae,O as $,J as s,$ as m,X as oe,Q as v,Y as q,Z as te,an as P,U as w,R as y,a_ as ve,a0 as Oe,P as R,S as B,T as G,V as De,I as O,W as pe,aY as Ce}from"./index.8180fff2.js";import{a as K,u as se,l as N,Q as fe,b as X,c as A,d as p,k as Le,m as Z}from"./QTable.c887845b.js";import{Q as z,a as ee}from"./QTd.d4c9857e.js";import{api_web as V,api as ge}from"./axios.425acea2.js";import{Q as k,a as Q,C as Y}from"./ClosePopup.75cfc801.js";import{Q as Ee}from"./QBtnToggle.c7a88c14.js";import{d as Ae}from"./date.a5e3b0c9.js";import"./use-render-cache.3aae9b27.js";import"./QBtnGroup.91413fa8.js";const Ve=s("div",{class:"text-h6"},"Customer Detail",-1),Ue={class:"row"},be={class:"col"},Ie={class:"col q-pl-md"},Re={class:"col q-pl-md"},he={class:"row q-pt-md"},we={class:"col"},Pe={class:"row q-pt-md"},Ne={class:"col"},ye={__name:"customerView",props:{custData:Array},setup(M){K();const g=M;j(()=>{_.value=g.custData});const _=S({TSLO_CUSCD:"",MCUS_CUSNM:"",TSLO_ATTN:"",TSLO_ADDRESS_NAME:"",TSLO_ADDRESS_DESCRIPTION:""}),t=()=>{f(_.value)},{dialogRef:U,onDialogHide:b,onDialogOK:f,onDialogCancel:n}=se();return(I,u)=>(L(),h(te,{ref_key:"dialogRef",ref:U,onHide:q(b),"transition-show":"slide-up","transition-hide":"slide-down","full-width":""},{default:l(()=>[e(ae,{class:"q-dialog-plugin bg-white q-pa-sm"},{default:l(()=>[e($,null,{default:l(()=>[Ve]),_:1}),e($,{class:"q-pa-sm"},{default:l(()=>[s("div",Ue,[s("div",be,[e(m,{label:"Customer Code",readonly:"",modelValue:_.value.TSLO_CUSCD,"onUpdate:modelValue":u[0]||(u[0]=T=>_.value.TSLO_CUSCD=T),dense:""},null,8,["modelValue"])]),s("div",Ie,[e(m,{label:"Customer Name",readonly:"",modelValue:_.value.MCUS_CUSNM,"onUpdate:modelValue":u[1]||(u[1]=T=>_.value.MCUS_CUSNM=T),dense:""},null,8,["modelValue"])]),s("div",Re,[e(m,{label:"Attn.",modelValue:_.value.TSLO_ATTN,"onUpdate:modelValue":u[2]||(u[2]=T=>_.value.TSLO_ATTN=T),dense:""},null,8,["modelValue"])])]),s("div",he,[s("div",we,[e(m,{label:"Destination Name",modelValue:_.value.TSLO_ADDRESS_NAME,"onUpdate:modelValue":u[3]||(u[3]=T=>_.value.TSLO_ADDRESS_NAME=T),dense:""},null,8,["modelValue"])])]),s("div",Pe,[s("div",Ne,[e(m,{label:"Destination Address",modelValue:_.value.TSLO_ADDRESS_DESCRIPTION,"onUpdate:modelValue":u[4]||(u[4]=T=>_.value.TSLO_ADDRESS_DESCRIPTION=T),dense:""},null,8,["modelValue"])])])]),_:1}),e(oe,{align:"right"},{default:l(()=>[e(v,{label:"OK",color:"primary",onClick:u[5]||(u[5]=T=>t()),disable:I.stateSubmit,loading:I.loading},null,8,["disable","loading"]),e(v,{flat:"",label:"Cancel",color:"red",onClick:q(n)},null,8,["onClick"])]),_:1})]),_:1})]),_:1},8,["onHide"]))}},Me=s("div",{class:"text-h6"},"RO Maintenance",-1),ke={style:{border:"1px black solid","border-radius":"10px"}},Qe=s("legend",{style:{"margin-left":"1em",padding:"0.2em 0.8em"}},[s("b",null,"Header")],-1),Ye={class:"row"},$e={class:"col"},qe={class:"col q-pl-md"},xe={class:"row items-center justify-end"},Fe={class:"col q-pl-md"},He={class:"row items-center justify-end"},Be={class:"row"},Ge={class:"col"},je={class:"col q-pl-md"},Ke={class:"col q-pl-md"},Je={class:"row q-py-md"},We={class:"col"},Xe={key:0,class:"row"},Ze={class:"col"},ze={class:"row"},el={class:"col"},ll={style:{border:"1px black solid","border-radius":"10px",height:"35vh",overflow:"auto"},class:"q-pa-md"},al=s("legend",{style:{"margin-left":"1em",padding:"0.2em 0.8em"}},[s("b",null,"Detail Items")],-1),ol={class:"row q-pb-md"},tl={class:"col"},sl={class:"text-h6"},nl={class:"col text-right"},dl={class:"row"},il={class:"col"},ul={class:"row items-center justify-end"},rl={class:"row items-center justify-end"},le={__name:"salesOrderCreate",props:{sloHeader:String},setup(M){const g=K(),_=M,t=S({TSLO_SLOCD:"",TSLO_ISSUDT:Ae.formatDate(Date.now(),"YYYY-MM-DD"),TSLO_PLAN_DLVDT:"",TSLO_QUOCD:"",TSLO_POCD:"",TSLO_CUSCD:"",TSLO_ATTN:"",TSLO_TYPE:1,TSLO_ADDRESS_NAME:"",TSLO_ADDRESS_DESCRIPTION:"",TSLO_SERVTRANS_COST:0,TSLO_ISCON:!1});S(""),S("");const U=S([]),b=S([]),f=S([]),n=S(!1),I=S(1),u=S([]),T=S([]);j(async()=>{await W(),await J(),_.sloHeader&&_.sloHeader!==""&&(await ne(_.sloHeader),console.log(t.value),await D(t.value.TSLO_QUOCD))});const c=(d,a,o,C)=>{a(async()=>{C==="quotation"&&await D(d),C==="item"&&await r(d),C==="cust"&&await J(d),C==="usage"&&await W(d)})},D=async(d="")=>{n.value=!0,await V.post("quotation/search",{searchBy:"MCUS_CUSNM",searchValue:d,approval:1}).then(a=>{n.value=!1,U.value=a.data.data}).catch(a=>{n.value=!1})},r=async d=>{n.value=!0,await V.post("item/searchAPI",{searchValue:d}).then(a=>{n.value=!1,b.value=a.data.data}).catch(()=>{n.value=!1})},E=()=>t.value.TSLO_TYPE===1?"Rental":t.value.TSLO_TYPE===2?"Sales":"Service",J=async d=>{n.value=!0,await V.post("customer/searchAPI",{searchValue:d}).then(a=>{n.value=!1,f.value=a.data.data}).catch(()=>{n.value=!1})},W=async d=>{n.value=!0,await V.post("usage/searchAPI",{searchValue:d}).then(a=>{n.value=!1,T.value=a.data.data}).catch(()=>{n.value=!1})},ne=async d=>{n.value=!0,await V.get(`receive-order/getData/${btoa(d)}`).then(a=>{n.value=!1,console.log(a.data.det),t.value=a.data,t.value.TSLO_TYPE=parseInt(a.data.TSLO_TYPE),u.value=a.data.det}).catch(()=>{n.value=!1})},de=async d=>{console.log(d),n.value=!0,await ge.get(`transaction/quotation/view/${btoa(d)}`).then(a=>{n.value=!1,console.log(a.data.data),t.value.TSLO_CUSCD=a.data.data.TQUO_CUSCD,t.value.TSLO_ADDRESS_NAME=a.data.data.cust.MCUS_CUSNM,t.value.TSLO_ADDRESS_DESCRIPTION=a.data.data.cust.TQUO_PROJECT_LOCATION,t.value.TSLO_ATTN=a.data.data.TQUO_ATTN,t.value.TSLO_TYPE=parseInt(a.data.data.TQUO_TYPE),t.value.TSLO_SERVTRANS_COST=parseInt(a.data.TQUO_SERVTRANS_COST),u.value=[],a.data.data.det.map(o=>{u.value.push({TSLODETA_ITMCD:o.TQUODETA_ITMCD,TSLODETA_ITMQT:o.TQUODETA_ITMQT,TSLODETA_USAGE_DESCRIPTION:parseInt(o.TQUODETA_USAGE),TSLODETA_PRC:o.TQUODETA_PRC,TSLODETA_PERIOD_FR:o.TQUODETA_PERIOD_FR,TSLODETA_PERIOD_TO:o.TQUODETA_PERIOD_TO})})}).catch(a=>{n.value=!1})},ie=()=>{u.value.push({TSLODETA_ITMCD:"",TSLODETA_ITMQT:"",TSLODETA_USAGE_DESCRIPTION:"",TSLODETA_PRC:0,TSLODETA_PERIOD_FR:"",TSLODETA_PERIOD_TO:""})},ue=d=>{g.dialog({title:"Confirmation",message:`Do you want to delete this lines no ${d+1} ?`,cancel:!0,persistent:!0}).onOk(async()=>{u.value.splice(d,1)})},re=()=>{g.dialog({title:"Confirmation",message:"Are you sure want to save this RO ?",cancel:!0,persistent:!0}).onOk(async()=>{n.value=!0,await V.post("receive-order/saveAPI",{...t.value,det:u.value}).then(d=>{n.value=!1,g.notify({color:"green",message:`${d.data.msg}`}),me()}).catch(()=>{n.value=!1})})},_e=()=>{g.dialog({component:ye,componentProps:{custData:{TSLO_CUSCD:t.value.TSLO_CUSCD,MCUS_CUSNM:t.value.TSLO_ADDRESS_NAME,TSLO_ATTN:t.value.TSLO_ATTN,TSLO_ADDRESS_NAME:t.value.TSLO_ADDRESS_NAME,TSLO_ADDRESS_DESCRIPTION:t.value.TSLO_ADDRESS_DESCRIPTION}}}).onOk(async d=>{console.log(d),t.value.TSLO_CUSCD=d.TSLO_CUSCD,t.value.TSLO_ATTN=d.TSLO_ATTN,t.value.TSLO_ADDRESS_NAME=d.TSLO_ADDRESS_NAME,t.value.TSLO_ADDRESS_DESCRIPTION=d.TSLO_ADDRESS_DESCRIPTION})},{dialogRef:Se,onDialogHide:Te,onDialogOK:me,onDialogCancel:ce}=se();return(d,a)=>(L(),h(te,{ref_key:"dialogRef",ref:Se,onHide:q(Te),"transition-show":"slide-up","transition-hide":"slide-down","full-width":""},{default:l(()=>[e(ae,{class:"q-dialog-plugin bg-white q-pa-sm"},{default:l(()=>[e($,null,{default:l(()=>[Me]),_:1}),e($,{class:"q-pa-sm"},{default:l(()=>[s("fieldset",ke,[Qe,s("div",Ye,[s("div",$e,[e(m,{label:"RO Code",dense:"",filled:"",modelValue:t.value.TSLO_SLOCD,"onUpdate:modelValue":a[0]||(a[0]=o=>t.value.TSLO_SLOCD=o),disable:"",loading:n.value},null,8,["modelValue","loading"])]),s("div",qe,[e(m,{filled:"",modelValue:t.value.TSLO_ISSUDT,"onUpdate:modelValue":a[2]||(a[2]=o=>t.value.TSLO_ISSUDT=o),dense:"",label:"Issue Date",loading:n.value,onClick:a[3]||(a[3]=o=>d.quotationIssueDate.qDateProxy.show()),mask:"####-##-##","fill-mask":"",hint:"Mask: YYYY-MM-DD"},{append:l(()=>[e(P,{name:"event",class:"cursor-pointer"},{default:l(()=>[e(k,{cover:"","transition-show":"scale","transition-hide":"scale"},{default:l(()=>[e(Q,{modelValue:t.value.TSLO_ISSUDT,"onUpdate:modelValue":a[1]||(a[1]=o=>t.value.TSLO_ISSUDT=o),mask:"YYYY-MM-DD"},{default:l(()=>[s("div",xe,[w(e(v,{label:"Close",color:"primary",flat:""},null,512),[[Y]])])]),_:1},8,["modelValue"])]),_:1})]),_:1})]),_:1},8,["modelValue","loading"])]),s("div",Fe,[e(m,{filled:"",modelValue:t.value.TSLO_PLAN_DLVDT,"onUpdate:modelValue":a[5]||(a[5]=o=>t.value.TSLO_PLAN_DLVDT=o),dense:"",label:"Delivery Date",loading:n.value,onClick:a[6]||(a[6]=o=>d.quotationIssueDate.qDateProxy.show()),mask:"####-##-##","fill-mask":"",hint:"Mask: YYYY-MM-DD"},{append:l(()=>[e(P,{name:"event",class:"cursor-pointer"},{default:l(()=>[e(k,{cover:"","transition-show":"scale","transition-hide":"scale"},{default:l(()=>[e(Q,{modelValue:t.value.TSLO_PLAN_DLVDT,"onUpdate:modelValue":a[4]||(a[4]=o=>t.value.TSLO_PLAN_DLVDT=o),mask:"YYYY-MM-DD"},{default:l(()=>[s("div",He,[w(e(v,{label:"Close",color:"primary",flat:""},null,512),[[Y]])])]),_:1},8,["modelValue"])]),_:1})]),_:1})]),_:1},8,["modelValue","loading"])])]),s("div",Be,[s("div",Ge,[e(N,{dense:"",filled:"",label:"Sales Quotation Code",modelValue:t.value.TSLO_QUOCD,"onUpdate:modelValue":[a[7]||(a[7]=o=>t.value.TSLO_QUOCD=o),de],"use-input":"","input-debounce":"500",options:U.value,onFilter:a[8]||(a[8]=(o,C,i)=>c(o,C,i,"quotation")),behavior:"dialog","option-label":"DESCSEL","option-value":"TQUO_QUOCD","emit-value":"","map-options":"",loading:n.value},null,8,["modelValue","options","loading"])]),s("div",je,[e(m,{label:"PO Number",dense:"",filled:"",modelValue:t.value.TSLO_POCD,"onUpdate:modelValue":a[9]||(a[9]=o=>t.value.TSLO_POCD=o),loading:n.value},null,8,["modelValue","loading"])]),s("div",Ke,[e(N,{dense:"",filled:"",label:"Customer Name",modelValue:t.value.TSLO_CUSCD,"onUpdate:modelValue":a[10]||(a[10]=o=>t.value.TSLO_CUSCD=o),"use-input":"","input-debounce":"500",options:f.value,onFilter:a[11]||(a[11]=(o,C,i)=>c(o,C,i,"cust")),behavior:"dialog","option-label":"MCUS_CUSNM","option-value":"MCUS_CUSCD","emit-value":"","map-options":"",loading:n.value,readonly:I.value===3},null,8,["modelValue","options","loading","readonly"])])])]),s("div",Je,[s("div",We,[e(Ee,{modelValue:t.value.TSLO_TYPE,"onUpdate:modelValue":a[12]||(a[12]=o=>t.value.TSLO_TYPE=o),spread:"","no-caps":"","toggle-color":"purple",color:"white","text-color":"black",options:[{label:"Rental",value:1},{label:"Sales",value:2},{label:"Service",value:3}],disable:t.value.TSLO_QUOCD!==""},null,8,["modelValue","disable"])])]),t.value.TSLO_TYPE!=1?(L(),y("div",Xe,[s("div",Ze,[e(m,{prefix:"Rp",label:"Service & Transportation Price",modelValue:t.value.TSLO_SERVTRANS_COST,"onUpdate:modelValue":a[13]||(a[13]=o=>t.value.TSLO_SERVTRANS_COST=o),filled:"",dense:""},null,8,["modelValue"])])])):ve("",!0),s("div",ze,[s("div",el,[e(Oe,{modelValue:t.value.TSLO_ISCON,"onUpdate:modelValue":a[14]||(a[14]=o=>t.value.TSLO_ISCON=o),label:"Is Contract ?",color:"teal","toggle-indeterminate":!1,"true-value":1,"false-value":0,"indeterminate-value":0,disable:n.value},null,8,["modelValue","disable"])])]),s("fieldset",ll,[al,s("div",ol,[s("div",tl,[s("span",sl,R(E()),1)]),s("div",nl,[e(v,{flat:"",icon:"add",color:"blue",label:"Add Lines",onClick:ie,loading:n.value},null,8,["loading"]),e(v,{flat:"",icon:"person",color:"indigo",label:"Customer",onClick:_e,loading:n.value},null,8,["loading"])])]),s("div",dl,[s("div",il,[e(fe,{bordered:"",dense:""},{default:l(()=>[u.value.length>0?(L(!0),y(B,{key:0},G(u.value,(o,C)=>(L(),h(X,{key:C,class:"q-my-sm",dense:""},{default:l(()=>[e(A,{avatar:""},{default:l(()=>[e(De,{"text-color":"blue"},{default:l(()=>[O(R(C+1),1)]),_:2},1024)]),_:2},1024),e(A,null,{default:l(()=>[e(p,{class:"text-center"},{default:l(()=>[e(N,{dense:"",filled:"",label:"Item Name",modelValue:o.TSLODETA_ITMCD,"onUpdate:modelValue":i=>o.TSLODETA_ITMCD=i,"use-input":"","input-debounce":"500",options:b.value,onFilter:a[15]||(a[15]=(i,x,F)=>c(i,x,F,"item")),behavior:"dialog","option-label":"MITM_ITMNM","option-value":"MITM_ITMNM","emit-value":"","map-options":"",loading:n.value},null,8,["modelValue","onUpdate:modelValue","options","loading"])]),_:2},1024),e(p,{caption:""},{default:l(()=>[O(" Item Name ")]),_:1})]),_:2},1024),e(A,null,{default:l(()=>[e(p,null,{default:l(()=>[e(m,{modelValue:o.TSLODETA_ITMQT,"onUpdate:modelValue":i=>o.TSLODETA_ITMQT=i,dense:""},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1024),e(p,{caption:""},{default:l(()=>[O(" Qty ")]),_:1})]),_:2},1024),e(A,null,{default:l(()=>[e(p,null,{default:l(()=>[e(N,{dense:"",filled:"",label:"Usage",modelValue:o.TSLODETA_USAGE_DESCRIPTION,"onUpdate:modelValue":i=>o.TSLODETA_USAGE_DESCRIPTION=i,"use-input":"","input-debounce":"500",options:T.value,onFilter:a[16]||(a[16]=(i,x,F)=>c(i,x,F,"usage")),behavior:"dialog","option-label":"MUSAGE_DESCALL","option-value":"id","emit-value":"","map-options":"",loading:n.value},null,8,["modelValue","onUpdate:modelValue","options","loading"])]),_:2},1024),e(p,{caption:""},{default:l(()=>[O(" Usage ")]),_:1})]),_:2},1024),e(A,null,{default:l(()=>[e(p,null,{default:l(()=>[e(m,{modelValue:o.TSLODETA_PRC,"onUpdate:modelValue":i=>o.TSLODETA_PRC=i,dense:""},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1024),e(p,{caption:""},{default:l(()=>[O(" Price ")]),_:1})]),_:2},1024),e(A,null,{default:l(()=>[e(p,null,{default:l(()=>[e(m,{filled:"",modelValue:o.TSLODETA_PERIOD_FR,"onUpdate:modelValue":i=>o.TSLODETA_PERIOD_FR=i,dense:"",loading:n.value,onClick:a[17]||(a[17]=i=>d.quotationIssueDate.qDateProxy.show()),mask:"####-##-##","fill-mask":""},{append:l(()=>[e(P,{name:"event",class:"cursor-pointer"},{default:l(()=>[e(k,{cover:"","transition-show":"scale","transition-hide":"scale"},{default:l(()=>[e(Q,{modelValue:o.TSLODETA_PERIOD_FR,"onUpdate:modelValue":i=>o.TSLODETA_PERIOD_FR=i,mask:"YYYY-MM-DD"},{default:l(()=>[s("div",ul,[w(e(v,{label:"Close",color:"primary",flat:""},null,512),[[Y]])])]),_:2},1032,["modelValue","onUpdate:modelValue"])]),_:2},1024)]),_:2},1024)]),_:2},1032,["modelValue","onUpdate:modelValue","loading"])]),_:2},1024),e(p,{caption:""},{default:l(()=>[O(" Period From ")]),_:1})]),_:2},1024),e(A,null,{default:l(()=>[e(p,null,{default:l(()=>[e(m,{filled:"",modelValue:o.TSLODETA_PERIOD_TO,"onUpdate:modelValue":i=>o.TSLODETA_PERIOD_TO=i,dense:"",loading:n.value,onClick:a[18]||(a[18]=i=>d.quotationIssueDate.qDateProxy.show()),mask:"####-##-##","fill-mask":""},{append:l(()=>[e(P,{name:"event",class:"cursor-pointer"},{default:l(()=>[e(k,{cover:"","transition-show":"scale","transition-hide":"scale"},{default:l(()=>[e(Q,{modelValue:o.TSLODETA_PERIOD_TO,"onUpdate:modelValue":i=>o.TSLODETA_PERIOD_TO=i,mask:"YYYY-MM-DD"},{default:l(()=>[s("div",rl,[w(e(v,{label:"Close",color:"primary",flat:""},null,512),[[Y]])])]),_:2},1032,["modelValue","onUpdate:modelValue"])]),_:2},1024)]),_:2},1024)]),_:2},1032,["modelValue","onUpdate:modelValue","loading"])]),_:2},1024),e(p,{caption:""},{default:l(()=>[O(" Period To ")]),_:1})]),_:2},1024),e(A,{side:""},{default:l(()=>[e(v,{icon:"delete",color:"red",flat:"",onClick:i=>ue(C)},null,8,["onClick"])]),_:2},1024)]),_:2},1024))),128)):w((L(),h(X,{key:1,class:"q-my-sm",clickable:""},{default:l(()=>[e(A,null,{default:l(()=>[e(p,null,{default:l(()=>[O(" No Items Added ")]),_:1})]),_:1})]),_:1})),[[pe]])]),_:1})])])])]),_:1}),e(oe,{align:"right"},{default:l(()=>[e(v,{label:"OK",color:"primary",onClick:a[19]||(a[19]=o=>re()),disable:d.stateSubmit,loading:n.value},null,8,["disable","loading"]),e(v,{flat:"",label:"Cancel",color:"red",onClick:q(ce)},null,8,["onClick"])]),_:1})]),_:1})]),_:1},8,["onHide"]))}};const _l={class:"q-pa-md"},Sl={class:"row q-pb-md"},Tl=s("div",{class:"col"},[s("span",{class:"text-h4"},"Sales Order / Receive Order")],-1),ml={class:"col text-right"},cl={class:"row q-pt-md"},vl={class:"col"},Ul={__name:"salesOrderView",setup(M){const g=K(),_=S("TSLO_SLOCD"),t=S(""),U=S([]),b=S([{name:"TSLO_SLOCD",label:"RO. Code",field:"TSLO_SLOCD",sortable:!0,align:"left"},{name:"MCUS_CUSNM",label:"Customer Name",field:"MCUS_CUSNM",sortable:!0,align:"left"},{name:"TSLO_ADDRESS_NAME",label:"Customer Addr.",field:"TSLO_ADDRESS_NAME",sortable:!0,align:"left"},{name:"TSLO_CUSCD",label:"Customer Code",field:"TSLO_CUSCD",sortable:!0,align:"left"},{name:"TSLO_ISSUDT",label:"Issue Date",field:"TSLO_ISSUDT",sortable:!0,align:"left"},{name:"TSLO_QUOCD",label:"Quot. Code",field:"TSLO_QUOCD",sortable:!0,align:"left"}]),f=S(!1);j(()=>{n()});const n=async()=>{f.value=!0,await V.post("receive-order/searchAPI",{searchBy:_.value,searchValue:t.value}).then(c=>{f.value=!1,U.value=c.data.data}).catch(c=>{f.value=!1})},I=()=>{g.dialog({component:le}).onOk(async c=>{n()})},u=c=>{console.log(c),g.dialog({component:le,componentProps:{sloHeader:c}}).onOk(async D=>{n()})},T=c=>{g.dialog({title:"Confirmation",message:"Are you sure want to delete this data ?",cancel:!0,persistent:!0}).onOk(async()=>{f.value=!0,await V.delete(`receive-order/itemsAPI/${btoa(c)}`).then(D=>{f.value=!1,n()})})};return(c,D)=>(L(),y("div",_l,[s("div",Sl,[Tl,s("div",ml,[e(v,{icon:"add",color:"blue",onClick:D[0]||(D[0]=r=>I())},{default:l(()=>[e(H,null,{default:l(()=>[O("Create New RO")]),_:1})]),_:1})])]),e(Ce),s("div",cl,[s("div",vl,[e(Le,{title:"Created RO",rows:U.value,columns:b.value,"row-key":"name",loading:f.value,dense:"",pagination:{rowsPerPage:20},class:"my-sticky-header-column-table"},{"top-right":l(()=>[e(N,{outlined:"",modelValue:_.value,"onUpdate:modelValue":D[1]||(D[1]=r=>_.value=r),options:b.value,label:"Search Columns","option-value":"name","option-label":"label","emit-value":"",dense:"","map-options":""},null,8,["modelValue","options"]),e(m,{borderless:"",dense:"",modelValue:t.value,"onUpdate:modelValue":[D[2]||(D[2]=r=>t.value=r),D[3]||(D[3]=r=>n())],placeholder:"Search",outlined:"",debounce:"1000"},{append:l(()=>[e(P,{name:"search"})]),_:1},8,["modelValue"])]),header:l(r=>[e(z,{props:r},{default:l(()=>[e(Z,{"auto-width":""},{default:l(()=>[O("Action")]),_:1}),(L(!0),y(B,null,G(r.cols,E=>(L(),h(Z,{key:E.name,props:r},{default:l(()=>[O(R(E.label),1)]),_:2},1032,["props"]))),128))]),_:2},1032,["props"])]),body:l(r=>[e(z,{props:r},{default:l(()=>[e(ee,{"auto-width":""},{default:l(()=>[e(v,{flat:"",color:r.row.dlv.length>0?"grey":"orange",icon:"edit",onClick:E=>u(r.row.TSLO_SLOCD),dense:""},{default:l(()=>[e(H,null,{default:l(()=>[O(R(r.row.dlv.length>0?"RO already used for delivery, cannot edit !":"Edit this RO"),1)]),_:2},1024)]),_:2},1032,["color","onClick"]),e(v,{flat:"",color:r.row.dlv.length>0?"grey":"red",icon:"delete",onClick:E=>T(r.row.TSLO_SLOCD),dense:"",disable:r.row.dlv.length>0},{default:l(()=>[e(H,null,{default:l(()=>[O(R(r.row.dlv.length>0?"RO already used for delivery, cannot delete !":"Delete this RO"),1)]),_:2},1024)]),_:2},1032,["color","onClick","disable"])]),_:2},1024),(L(!0),y(B,null,G(r.cols,E=>(L(),h(ee,{key:E.name,props:r},{default:l(()=>[O(R(E.value),1)]),_:2},1032,["props"]))),128))]),_:2},1032,["props"])]),_:1},8,["rows","columns","loading"])])])]))}};export{Ul as default};
