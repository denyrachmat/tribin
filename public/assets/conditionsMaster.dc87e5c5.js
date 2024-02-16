import{c as ue,J as Ie,K as Ne,L as Pe,s as c,a as M,M as Se,O as qe,P as Re,R as $e,S as xe,w as ee,j as te,T as oe,U as ne,k as Ee,h as L,V as Me,g as de,d as ce,W as Be,i as He,X as Ve,o as B,B as H,C as Q,D as t,E as e,Y as A,Z as T,$ as K,Q as v,a0 as I,a1 as G,I as f,a2 as W,H as S,a3 as Qe,a4 as Ae}from"./index.c027e7e8.js";import{u as Ke,v as ae,a as Ge,p as le,b as je,c as Ue,r as se,s as Le,d as ie,e as We,Q as ge,f as F,g as re}from"./QTable.195b4e7f.js";import{api as R,api_web as V}from"./axios.0f0588b7.js";var q=ue({name:"QTooltip",inheritAttrs:!1,props:{...Ke,...Ie,...Ne,maxHeight:{type:String,default:null},maxWidth:{type:String,default:null},transitionShow:{default:"jump-down"},transitionHide:{default:"jump-up"},anchor:{type:String,default:"bottom middle",validator:ae},self:{type:String,default:"top middle",validator:ae},offset:{type:Array,default:()=>[14,14],validator:Ge},scrollTarget:{default:void 0},delay:{type:Number,default:0},hideDelay:{type:Number,default:0}},emits:[...Pe],setup(n,{slots:i,emit:a,attrs:s}){let l,r;const p=de(),{proxy:{$q:u}}=p,m=c(null),_=c(!1),w=M(()=>le(n.anchor,u.lang.rtl)),d=M(()=>le(n.self,u.lang.rtl)),o=M(()=>n.persistent!==!0),{registerTick:g,removeTick:h}=Se(),{registerTimeout:b}=qe(),{transitionProps:O,transitionStyle:y}=Re(n),{localScrollTarget:D,changeScrollEvent:P,unconfigureScrollTarget:ve}=je(n,Z),{anchorEl:k,canShow:_e,anchorEvents:x}=Ue({showing:_,configureAnchorEl:De}),{show:he,hide:j}=$e({showing:_,canShow:_e,handleShow:be,handleHide:Oe,hideOnRouteChange:o,processOnMount:!0});Object.assign(x,{delayShow:we,delayHide:ye});const{showPortal:J,hidePortal:X,renderPortal:Ce}=xe(p,m,Te,"tooltip");if(u.platform.is.mobile===!0){const C={anchorEl:k,innerRef:m,onClickOutside(N){return j(N),N.target.classList.contains("q-dialog__backdrop")&&Be(N),!0}},U=M(()=>n.modelValue===null&&n.persistent!==!0&&_.value===!0);ee(U,N=>{(N===!0?We:se)(C)}),te(()=>{se(C)})}function be(C){J(),g(()=>{r=new MutationObserver(()=>E()),r.observe(m.value,{attributes:!1,childList:!0,characterData:!0,subtree:!0}),E(),Z()}),l===void 0&&(l=ee(()=>u.screen.width+"|"+u.screen.height+"|"+n.self+"|"+n.anchor+"|"+u.lang.rtl,E)),b(()=>{J(!0),a("show",C)},n.transitionDuration)}function Oe(C){h(),X(),Y(),b(()=>{X(!0),a("hide",C)},n.transitionDuration)}function Y(){r!==void 0&&(r.disconnect(),r=void 0),l!==void 0&&(l(),l=void 0),ve(),oe(x,"tooltipTemp")}function E(){Le({targetEl:m.value,offset:n.offset,anchorEl:k.value,anchorOrigin:w.value,selfOrigin:d.value,maxHeight:n.maxHeight,maxWidth:n.maxWidth})}function we(C){if(u.platform.is.mobile===!0){ie(),document.body.classList.add("non-selectable");const U=k.value,N=["touchmove","touchcancel","touchend","click"].map(z=>[U,z,"delayHide","passiveCapture"]);ne(x,"tooltipTemp",N)}b(()=>{he(C)},n.delay)}function ye(C){u.platform.is.mobile===!0&&(oe(x,"tooltipTemp"),ie(),setTimeout(()=>{document.body.classList.remove("non-selectable")},10)),b(()=>{j(C)},n.hideDelay)}function De(){if(n.noParentEvent===!0||k.value===null)return;const C=u.platform.is.mobile===!0?[[k.value,"touchstart","delayShow","passive"]]:[[k.value,"mouseenter","delayShow","passive"],[k.value,"mouseleave","delayHide","passive"]];ne(x,"anchor",C)}function Z(){if(k.value!==null||n.scrollTarget!==void 0){D.value=Ee(k.value,n.scrollTarget);const C=n.noParentEvent===!0?E:j;P(D.value,C)}}function ke(){return _.value===!0?L("div",{...s,ref:m,class:["q-tooltip q-tooltip--style q-position-engine no-pointer-events",s.class],style:[s.style,y.value],role:"tooltip"},ce(i.default)):null}function Te(){return L(Me,O.value,ke)}return te(Y),Object.assign(p.proxy,{updatePosition:E}),Ce}}),fe=ue({name:"QBtnGroup",props:{unelevated:Boolean,outline:Boolean,flat:Boolean,rounded:Boolean,square:Boolean,push:Boolean,stretch:Boolean,glossy:Boolean,spread:Boolean},setup(n,{slots:i}){const a=M(()=>{const s=["unelevated","outline","flat","rounded","square","push","stretch","glossy"].filter(l=>n[l]===!0).map(l=>`q-btn-group--${l}`).join(" ");return`q-btn-group row no-wrap${s.length!==0?" "+s:""}`+(n.spread===!0?" q-btn-group--spread":" inline")});return()=>L("div",{class:a.value},ce(i.default))}});function me(){return He(Ve)}const Fe=()=>!0;function Je(n){const i={};return n.forEach(a=>{i[a]=Fe}),i}function $(){const{emit:n,proxy:i}=de(),a=c(null);function s(){a.value.show()}function l(){a.value.hide()}function r(u){n("ok",u),l()}function p(){n("hide")}return Object.assign(i,{show:s,hide:l}),{dialogRef:a,onDialogHide:p,onDialogOK:r,onDialogCancel:l}}const pe=["ok","hide"];$.emits=pe;$.emitsObject=Je(pe);const Xe=f("div",{class:"text-h6"},"List Conditions",-1),Ye={__name:"chooseConditions",setup(n){const i=c([{name:"MCONDITION_DESCRIPTION",align:"left",label:"Description",field:"MCONDITION_DESCRIPTION",sortable:!0}]),a=c([]),s=c({sortBy:"desc",descending:!1,rowsPerPage:0}),{dialogRef:l,onDialogHide:r,onDialogOK:p,onDialogCancel:u}=$();B(()=>{m()});const m=async()=>{await R.get("/master/conditions/getdata").then(d=>{console.log(d),a.value=d.data})},_=d=>{console.log(d),p(d)},w=()=>{};return(d,o)=>(H(),Q(G,{ref_key:"dialogRef",ref:l,onHide:I(r),"transition-show":"slide-up","transition-hide":"slide-down","full-width":""},{default:t(()=>[e(A,{class:"q-dialog-plugin bg-white q-pa-sm"},{default:t(()=>[e(T,null,{default:t(()=>[Xe]),_:1}),e(T,{class:"q-pa-sm"},{default:t(()=>[e(ge,{bordered:"",class:"rounded-borders"},{default:t(()=>[e(F,{class:"my-sticky-header-table",flat:"",bordered:"",title:"Conditions",rows:a.value,columns:i.value,"row-key":"id",dense:"",onRowClick:o[0]||(o[0]=(g,h,b)=>_(h)),pagination:s.value},null,8,["rows","columns","pagination"])]),_:1})]),_:1}),e(K,{align:"right"},{default:t(()=>[e(v,{label:"OK",color:"primary",onClick:o[1]||(o[1]=g=>w())}),e(v,{flat:"",label:"Cancel",color:"red",onClick:I(u)},null,8,["onClick"])]),_:1})]),_:1})]),_:1},8,["onHide"]))}};const Ze=f("div",{class:"text-h6"},"List Group Conditions",-1),ze={__name:"assignConditionsView",setup(n){const i=c([{name:"MCONDITION_RPT_STAT",align:"left",label:"Group Desc",field:"MCONDITION_RPT_STAT",sortable:!0}]),a=c([]),s=c({sortBy:"desc",descending:!1,rowsPerPage:0}),{dialogRef:l,onDialogHide:r,onDialogOK:p,onDialogCancel:u}=$();B(()=>{m()});const m=async()=>{await R.get("/master/conditions/getdataGroup").then(d=>{console.log(d),a.value=d.data.data})},_=d=>{p(d)},w=()=>{};return(d,o)=>(H(),Q(G,{ref_key:"dialogRef",ref:l,onHide:I(r),"transition-show":"slide-up","transition-hide":"slide-down","full-width":""},{default:t(()=>[e(A,{class:"q-dialog-plugin bg-white q-pa-sm"},{default:t(()=>[e(T,null,{default:t(()=>[Ze]),_:1}),e(T,{class:"q-pa-sm"},{default:t(()=>[e(ge,{bordered:"",class:"rounded-borders"},{default:t(()=>[e(F,{class:"my-sticky-header-table",flat:"",bordered:"",title:"Group",rows:a.value,columns:i.value,dense:"",onRowClick:o[0]||(o[0]=(g,h,b)=>_(h)),pagination:s.value},null,8,["rows","columns","pagination"])]),_:1})]),_:1}),e(K,{align:"right"},{default:t(()=>[e(v,{label:"OK",color:"primary",onClick:o[1]||(o[1]=g=>w())}),e(v,{flat:"",label:"Cancel",color:"red",onClick:I(u)},null,8,["onClick"])]),_:1})]),_:1})]),_:1},8,["onHide"]))}};const et=f("div",{class:"text-h6"},"Assign Condition Group",-1),tt={class:"row"},ot={class:"col"},nt={class:"col text-right"},at={class:"row q-pt-md"},lt={class:"col"},st={__name:"assignConditions",setup(n){const i=c([{name:"id",align:"left",label:"ID",field:"id",sortable:!0},{name:"MCONDITION_DESCRIPTION",align:"left",label:"Description",field:"MCONDITION_DESCRIPTION",sortable:!0}]),a=c([]),s=c({sortBy:"desc",descending:!1,rowsPerPage:0}),l=c([]),r=c(""),p=c("new"),u=me(),{dialogRef:m,onDialogHide:_,onDialogOK:w,onDialogCancel:d}=$();B(()=>{h()});const o=()=>{l.value=[],r.value="",p.value="new"},g=()=>{u.dialog({title:"Confirmation",message:"Are you sure want to delete this group ?",cancel:!0,persistent:!0}).onOk(async()=>{await R.delete(`/master/conditions/deleteDataGroup/${btoa(r.value)}`).then(y=>{o()})})},h=async()=>{await R.get("/master/conditions/getdata").then(y=>{console.log(y),a.value=y.data})},b=()=>{u.dialog({component:ze}).onOk(async y=>{r.value=y.MCONDITION_RPT_STAT,l.value=y.group,p.value="edit"})},O=()=>{u.dialog({title:"Confirmation",message:"Do you want to save this group ?",cancel:!0,persistent:!0}).onOk(async()=>{await R.post("/master/conditions/assignGroup",{data:l.value,MCONDITION_RPT_STAT:r.value}).then(y=>{o()})})};return(y,D)=>(H(),Q(G,{ref_key:"dialogRef",ref:m,onHide:I(_),"transition-show":"slide-up","transition-hide":"slide-down","full-width":""},{default:t(()=>[e(A,{class:"q-dialog-plugin bg-white q-pa-sm"},{default:t(()=>[e(T,null,{default:t(()=>[et]),_:1}),e(T,{class:"q-pa-sm"},{default:t(()=>[f("div",tt,[f("div",ot,[e(W,{label:"Group Name",outlined:"",dense:"",modelValue:r.value,"onUpdate:modelValue":D[0]||(D[0]=P=>r.value=P),disable:p.value==="edit"},{after:t(()=>[e(v,{dense:"",icon:"search",color:"blue",flat:"",onClick:b})]),_:1},8,["modelValue","disable"])]),f("div",nt,[e(fe,{outline:""},{default:t(()=>[e(v,{outline:"",color:"blue",icon:"description",onClick:o},{default:t(()=>[e(q,null,{default:t(()=>[S("New")]),_:1})]),_:1}),e(v,{outline:"",color:"red",icon:"delete",onClick:g},{default:t(()=>[e(q,null,{default:t(()=>[S("Delete")]),_:1})]),_:1})]),_:1})])]),f("div",at,[f("div",lt,[e(F,{class:"my-sticky-header-table",flat:"",bordered:"",title:"Conditions",rows:a.value,columns:i.value,"row-key":"id",dense:"",pagination:s.value,selection:"multiple",selected:l.value,"onUpdate:selected":D[1]||(D[1]=P=>l.value=P)},null,8,["rows","columns","pagination","selected"])])])]),_:1}),e(K,{align:"right"},{default:t(()=>[e(v,{label:"OK",color:"primary",onClick:D[2]||(D[2]=P=>O()),disable:l.value.length===0||!r.value},null,8,["disable"]),e(v,{flat:"",label:"Cancel",color:"red",onClick:I(d)},null,8,["onClick"])]),_:1})]),_:1})]),_:1},8,["onHide"]))}},it=f("div",{class:"text-h6"},"Import Data from another business",-1),rt={class:"row"},ut={class:"col"},dt={class:"row q-pt-md"},ct={class:"col"},gt={__name:"importData",setup(n){const i=c([]),a=c([]),s=c(""),l=c(""),{dialogRef:r,onDialogHide:p,onDialogOK:u,onDialogCancel:m}=$();B(()=>{_()});const _=async()=>{await R.get("/master/conditions/getCompaniesDetail").then(d=>{i.value=d.data.companies,a.value=d.data.CurrentCompanies,l.value=a.value[0],connection})},w=()=>{$q.dialog({title:"Confirmation",message:`Do you want to import data from ${s.value.name} ?`,cancel:!0,persistent:!0}).onOk(async()=>{await V.post("condition/import",{fromConnection:s.value}).then(d=>{newData()}),u()})};return(d,o)=>(H(),Q(G,{ref_key:"dialogRef",ref:r,onHide:I(p),"transition-show":"slide-up","transition-hide":"slide-down"},{default:t(()=>[e(A,{class:"q-dialog-plugin bg-white q-pa-sm"},{default:t(()=>[e(T,null,{default:t(()=>[it]),_:1}),e(T,{class:"q-pa-sm"},{default:t(()=>[f("div",rt,[f("div",ut,[e(re,{standout:"",modelValue:s.value,"onUpdate:modelValue":o[0]||(o[0]=g=>s.value=g),options:i.value,label:"From Source","option-value":"connection","option-label":"name"},null,8,["modelValue","options"])])]),f("div",dt,[f("div",ct,[e(re,{standout:"",modelValue:l.value,"onUpdate:modelValue":o[1]||(o[1]=g=>l.value=g),options:a.value,label:"Destination Source","option-value":"connection","option-label":"name"},null,8,["modelValue","options"])])])]),_:1}),e(K,{align:"right"},{default:t(()=>[e(v,{label:"OK",color:"primary",onClick:o[2]||(o[2]=g=>w())}),e(v,{flat:"",label:"Cancel",color:"red",onClick:I(m)},null,8,["onClick"])]),_:1})]),_:1})]),_:1},8,["onHide"]))}},ft={class:"q-pa-md"},mt={class:"row q-pb-md"},pt=f("div",{class:"col"},[f("span",{class:"text-h4"}," Condition Master ")],-1),vt={class:"col text-right"},_t={class:"row q-pt-md"},ht={class:"col"},Ct={class:"col q-pl-md"},yt={__name:"conditionsMaster",setup(n){const i=me(),a=c(""),s=c(""),l=c("");c([]),B(()=>{let o=r("CGID");l.value=o});const r=o=>{for(var g=o+"=",h=document.cookie.split(";"),b=0;b<h.length;b++){for(var O=h[b];O.charAt(0)==" ";)O=O.substring(1,O.length);if(O.indexOf(g)==0)return O.substring(g.length,O.length)}return null},p=()=>{i.dialog({component:gt}).onOk(async o=>{})},u=()=>{i.dialog({title:"Confirmation",message:"Do you want to save this data ?",cancel:!0,persistent:!0}).onOk(async()=>{a.value?await V.put(`condition/${btoa(a.value)}`,{MCONDITION_DESCRIPTION:s.value,MCONDITION_ORDER_NUMBER:null}).then(o=>{m()}):await V.post("condition",{MCONDITION_DESCRIPTION:s.value,MCONDITION_ORDER_NUMBER:null}).then(o=>{m()})})},m=()=>{a.value="",s.value=""},_=()=>{i.dialog({component:Ye}).onOk(async o=>{a.value=o.id,s.value=o.MCONDITION_DESCRIPTION})},w=()=>{i.dialog({title:"Confirmation",message:"Are you sure want to delete this data ?",cancel:!0,persistent:!0}).onOk(async()=>{await V.delete(`condition/${btoa(a.value)}`).then(o=>{m()})})},d=()=>{i.dialog({component:st}).onOk(async o=>{console.log(o)})};return(o,g)=>(H(),Qe("div",ft,[f("div",mt,[pt,f("div",vt,[e(fe,{outline:""},{default:t(()=>[e(v,{outline:"",color:"blue",label:"Assign Condition Group",onClick:d}),e(v,{outline:"",color:"blue",icon:"description",onClick:m},{default:t(()=>[e(q,null,{default:t(()=>[S("New")]),_:1})]),_:1}),e(v,{outline:"",color:"blue",icon:"save",onClick:u},{default:t(()=>[e(q,null,{default:t(()=>[S("Save")]),_:1})]),_:1}),e(v,{outline:"",color:"blue",icon:"send",onClick:p},{default:t(()=>[e(q,null,{default:t(()=>[S("Import Data")]),_:1})]),_:1}),e(v,{outline:"",color:"red",icon:"delete",disable:!a.value,onClick:w},{default:t(()=>[e(q,null,{default:t(()=>[S("Delete")]),_:1})]),_:1},8,["disable"])]),_:1})])]),e(Ae),f("div",_t,[f("div",ht,[e(W,{label:"Condition Code",dense:"",outlined:"",modelValue:a.value,"onUpdate:modelValue":g[0]||(g[0]=h=>a.value=h),disable:""},{after:t(()=>[e(v,{dense:"",icon:"search",color:"blue",flat:"",onClick:_})]),_:1},8,["modelValue"])]),f("div",Ct,[e(W,{label:"Condition Name",dense:"",outlined:"",modelValue:s.value,"onUpdate:modelValue":g[1]||(g[1]=h=>s.value=h),type:"textarea"},null,8,["modelValue"])])])]))}};export{yt as default};
