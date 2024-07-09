import{Q as F}from"./QTooltip.5fd60144.js";import{t as m,o as ee,C as p,D as k,E as n,F as a,M as ie,O as L,J as d,$ as S,at as le,U as Z,Q as b,R as T,S as Y,T as x,V as de,I as O,P as h,W as De,X as ue,Y as B,Z as re,b7 as Re,aM as ge}from"./index.7df123a4.js";import{e as I,Q as oe,a as M,b as H}from"./QSelect.dd008a3d.js";import{u as ce,Q as be,a as ye,b as te}from"./QTable.2e59ec8d.js";import{Q as ne,a as se}from"./QTd.8497f35e.js";import{api_web as g}from"./axios.d1e464ce.js";import{u as ae}from"./format.5d475f2e.js";import{Q as me,a as Ce}from"./QInnerLoading.3d2d72ce.js";import{Q as ve,a as pe,C as _e}from"./ClosePopup.25212aaf.js";import{Q as Ve}from"./QBtnToggle.c1ea98ca.js";import"./use-render-cache.3aae9b27.js";import"./date.6a0a70e3.js";import"./QBtnGroup.b2a27a2d.js";const Oe=d("div",{class:"text-h6"},"Create Incoming",-1),Se={style:{border:"1px black solid","border-radius":"10px"}},Ie=d("legend",{style:{"margin-left":"1em",padding:"0.2em 0.8em"}},[d("b",null,"Header")],-1),he={class:"row q-col-gutter-md"},Ue={class:"col-12 col-sm-6"},we={class:"col-12 col-sm-6"},Pe={class:"row items-center justify-end"},Ne={class:"row q-col-gutter-md q-pt-md"},Me={key:0,class:"col-12 col-sm-6"},Fe={key:1,class:"col-12 col-sm-6"},ke={key:2,class:"col-12 col-sm-6"},Ee={key:3,class:"col-12 col-sm-6"},Qe={class:"row q-col-gutter-md q-pt-md"},qe={class:"col"},$e={class:"row q-py-md"},Ae={class:"col"},He={style:{border:"1px black solid","border-radius":"10px",height:"35vh",overflow:"auto"}},Le=d("legend",{style:{"margin-left":"1em",padding:"0.2em 0.8em"}},[d("b",null,"List Of Items")],-1),Ye={class:"row q-pb-sm"},xe={class:"col text-right"},Be={__name:"incomingCreate",props:{dataHeader:Array},setup(q){const y=ae(),C=q,i=m({TRCV_RCVCD:"",TRCV_SUPCD:"",TRCV_ISSUDT:"",TRCV_REFFNO:"",TRCV_DOCNO:""}),V=m(1),c=m([]),t=m(!1),P=m([]),U=m([]),w=m([]),N=m([]),v=m([]);ee(async()=>{await R(""),await E(""),await Q(""),C.dataHeader&&Object.values(C.dataHeader).length>0&&(i.value={TRCV_RCVCD:C.dataHeader.TRCV_RCVCD,TRCV_SUPCD:C.dataHeader.MSUP_SUPCD,TRCV_ISSUDT:C.dataHeader.TRCV_ISSUDT,TRCV_REFFNO:C.dataHeader.TRCV_REFFNO,TRCV_DOCNO:C.dataHeader.TRCV_DOCNO},V.value=C.dataHeader.RCV_STATE,C.dataHeader.det.map(l=>{c.value.push({item_code:l.item_code,quantity:l.quantity,unit_price:l.unit_price})}))});const D=()=>{i.value={TRCV_RCVCD:"",TRCV_SUPCD:"",TRCV_ISSUDT:"",TRCV_REFFNO:"",TRCV_DOCNO:""},c.value=[]},u=(l,o,e,_)=>{o(async()=>{_==="supp"&&await E(l),_==="cust"&&await Q(l),_==="item"&&await R(l),_==="po"&&await j(l),_==="inv"&&await $(l)})},R=async l=>{t.value=!0,await g.post("item/searchAPI",{searchValue:l,isITMCD:1}).then(o=>{t.value=!1,N.value=o.data.data}).catch(()=>{t.value=!1})},E=async(l,o="MSUP_SUPNM")=>{t.value=!0,await g.post("supplier/searchAPI",{searchValue:l,searchCol:o}).then(e=>{t.value=!1,P.value=e.data.data}).catch(()=>{t.value=!1})},Q=async(l,o="MCUS_CUSNM")=>{t.value=!0,await g.post("customer/searchAPI",{searchValue:l,searchCol:o}).then(e=>{t.value=!1,U.value=e.data.data}).catch(()=>{t.value=!1})},j=async(l,o="TPCHORD_PCHCD")=>{t.value=!0,await g.post("purchase-order/searchApprovedPO",{searchValue:l,searchCol:o}).then(e=>{t.value=!1,w.value=e.data.data}).catch(()=>{t.value=!1})},z=l=>{y.dialog({title:"Confirmation",message:`Do you want to delete this lines no ${l+1} ?`,cancel:!0,persistent:!0}).onOk(async()=>{c.value.splice(l,1)})},J=()=>{c.value.push({item_code:"",quantity:"",unit_price:""})},$=async(l,o="TDLVORD_DLVCD")=>{t.value=!0,await g.post("invoices/search",{searchBy:o,searchValue:l}).then(e=>{t.value=!1,v.value=e.data.data}).catch(e=>{t.value=!1})},K=l=>{let o=w.value.filter(e=>e.TPCHORD_PCHCD==l);c.value=[],o.length>0&&(i.value.TRCV_SUPCD=o[0].TPCHORD_SUPCD,o[0].det.map(e=>{c.value.push({item_code:e.TPCHORDDETA_ITMCD,quantity:e.TPCHORDDETA_ITMQT,unit_price:e.TPCHORDDETA_ITMPRC_PER})}))},G=l=>{let o=v.value.filter(e=>e.TDLVORD_DLVCD==l);c.value=[],o.length>0&&(i.value.TRCV_SUPCD=o[0].TDLVORD_CUSCD,o[0].dlvacc.map(e=>{c.value.push({item_code:e.TDLVACCESSORY_ITMCD,quantity:e.TDLVACCESSORY_ITMQT,unit_price:0})}),o[0].dlvdet.map(e=>{c.value.push({item_code:e.TDLVORDDETA_ITMCD,quantity:e.TDLVORDDETA_ITMQT,unit_price:e.TDLVORDDETA_PRC})}))},W=()=>{y.dialog({title:"Confirmation",message:"Are you sure want to save this Incoming ?",cancel:!0,persistent:!0}).onOk(async()=>{t.value=!0,await g.post("receive/saveAPI",{...i.value,det:c.value}).then(l=>{t.value=!1,y.notify({color:"green",message:`${l.data.msg}`}),r()}).catch(()=>{t.value=!1})})},{dialogRef:A,onDialogHide:X,onDialogOK:r,onDialogCancel:s}=ce();return(l,o)=>(p(),k(re,{ref_key:"dialogRef",ref:A,onHide:B(X),"transition-show":"slide-up","transition-hide":"slide-down","full-width":"",persistent:""},{default:n(()=>[a(ie,{class:"q-dialog-plugin bg-white q-pa-sm"},{default:n(()=>[a(L,null,{default:n(()=>[Oe]),_:1}),a(L,{class:"q-pa-sm"},{default:n(()=>[d("fieldset",Se,[Ie,a(me,{showing:t.value,dark:""},{default:n(()=>[a(Ce,{size:"50px",color:"primary"})]),_:1},8,["showing"]),d("div",he,[d("div",Ue,[a(S,{label:"Code",readonly:"",dense:"",filled:"",modelValue:i.value.TRCV_RCVCD,"onUpdate:modelValue":o[0]||(o[0]=e=>i.value.TRCV_RCVCD=e)},null,8,["modelValue"])]),d("div",we,[a(S,{filled:"",modelValue:i.value.TRCV_ISSUDT,"onUpdate:modelValue":o[2]||(o[2]=e=>i.value.TRCV_ISSUDT=e),dense:"",label:"Receive Date"},{append:n(()=>[a(le,{name:"event",class:"cursor-pointer"},{default:n(()=>[a(ve,{cover:"","transition-show":"scale","transition-hide":"scale"},{default:n(()=>[a(pe,{modelValue:i.value.TRCV_ISSUDT,"onUpdate:modelValue":o[1]||(o[1]=e=>i.value.TRCV_ISSUDT=e),mask:"YYYY-MM-DD"},{default:n(()=>[d("div",Pe,[Z(a(b,{label:"Close",color:"primary",flat:""},null,512),[[_e]])])]),_:1},8,["modelValue"])]),_:1})]),_:1})]),_:1},8,["modelValue"])])]),d("div",Ne,[V.value==1?(p(),T("div",Me,[a(I,{dense:"",filled:"",label:"Supplier Name",modelValue:i.value.TRCV_SUPCD,"onUpdate:modelValue":o[3]||(o[3]=e=>i.value.TRCV_SUPCD=e),"use-input":"","input-debounce":"500",options:P.value,onFilter:o[4]||(o[4]=(e,_,f)=>u(e,_,f,"supp")),behavior:"dialog","option-label":"MSUP_SUPNM","option-value":"MSUP_SUPCD","emit-value":"","map-options":"",loading:t.value,disable:i.value.TRCV_RCVCD!==""||V.value==1},null,8,["modelValue","options","loading","disable"])])):(p(),T("div",Fe,[a(I,{dense:"",filled:"",label:"Customer Name",modelValue:i.value.TRCV_SUPCD,"onUpdate:modelValue":o[5]||(o[5]=e=>i.value.TRCV_SUPCD=e),"use-input":"","input-debounce":"500",options:U.value,onFilter:o[6]||(o[6]=(e,_,f)=>u(e,_,f,"cust")),behavior:"dialog","option-label":"MCUS_CUSNM","option-value":"MCUS_CUSCD","emit-value":"","map-options":"",loading:t.value,disable:i.value.TRCV_RCVCD!==""||V.value==1},null,8,["modelValue","options","loading","disable"])])),V.value==1?(p(),T("div",ke,[a(I,{dense:"",filled:"",label:"PO Number",modelValue:i.value.TRCV_REFFNO,"onUpdate:modelValue":[o[7]||(o[7]=e=>i.value.TRCV_REFFNO=e),o[9]||(o[9]=e=>K(e))],"use-input":"","input-debounce":"500",options:w.value,onFilter:o[8]||(o[8]=(e,_,f)=>u(e,_,f,"po")),behavior:"dialog","option-label":"PO_CUSTDESC","option-value":"TPCHORD_PCHCD","emit-value":"","map-options":"",loading:t.value,disable:i.value.TRCV_RCVCD!==""},null,8,["modelValue","options","loading","disable"])])):(p(),T("div",Ee,[a(I,{dense:"",filled:"",label:"JAT Invoice No",modelValue:i.value.TRCV_REFFNO,"onUpdate:modelValue":[o[10]||(o[10]=e=>i.value.TRCV_REFFNO=e),o[12]||(o[12]=e=>G(e))],"use-input":"","input-debounce":"500",options:v.value,onFilter:o[11]||(o[11]=(e,_,f)=>u(e,_,f,"inv")),behavior:"dialog","option-label":"LABEL","option-value":"TDLVORD_DLVCD","emit-value":"","map-options":"",loading:t.value,disable:i.value.TRCV_RCVCD!==""},null,8,["modelValue","options","loading","disable"])]))]),d("div",Qe,[d("div",qe,[a(S,{label:"Doc Supplier No",dense:"",filled:"",modelValue:i.value.TRCV_DOCNO,"onUpdate:modelValue":o[13]||(o[13]=e=>i.value.TRCV_DOCNO=e)},null,8,["modelValue"])])])]),d("div",$e,[d("div",Ae,[a(Ve,{modelValue:V.value,"onUpdate:modelValue":[o[14]||(o[14]=e=>V.value=e),o[15]||(o[15]=e=>D())],spread:"","no-caps":"","toggle-color":"purple",color:"white","text-color":"black",options:[{label:"From PO",value:1},{label:"Return",value:2}],disable:i.value.TRCV_RCVCD!==""},null,8,["modelValue","disable"])])]),d("fieldset",He,[Le,d("div",Ye,[d("div",xe,[a(b,{flat:"",icon:"add",color:"blue",label:"Add Lines",onClick:J,loading:t.value},null,8,["loading"])])]),a(be,{bordered:"",dense:""},{default:n(()=>[c.value.length>0?(p(!0),T(Y,{key:0},x(c.value,(e,_)=>(p(),k(oe,{key:_,class:"q-my-sm",dense:"",loading:t.value},{default:n(()=>[a(M,{avatar:""},{default:n(()=>[a(de,{"text-color":"blue"},{default:n(()=>[O(h(_+1),1)]),_:2},1024)]),_:2},1024),a(M,null,{default:n(()=>[a(H,null,{default:n(()=>[a(I,{dense:"",filled:"",label:"Item Code",modelValue:e.item_code,"onUpdate:modelValue":f=>e.item_code=f,"use-input":"","input-debounce":"500",options:N.value,onFilter:o[16]||(o[16]=(f,fe,Te)=>u(f,fe,Te,"item")),behavior:"dialog","option-label":"MITM_ITMNMREAL","option-value":"MITM_ITMNM","emit-value":"","map-options":"",loading:t.value,disable:e.IS_CONFIRMED==1||i.value.TRCV_RCVCD!==""},null,8,["modelValue","onUpdate:modelValue","options","loading","disable"])]),_:2},1024)]),_:2},1024),a(M,null,{default:n(()=>[a(H,null,{default:n(()=>[a(S,{dense:"",label:"Qty",filled:"",modelValue:e.quantity,"onUpdate:modelValue":f=>e.quantity=f,disable:e.IS_CONFIRMED==1},null,8,["modelValue","onUpdate:modelValue","disable"])]),_:2},1024)]),_:2},1024),a(M,null,{default:n(()=>[a(H,null,{default:n(()=>[a(S,{dense:"",label:"Price",filled:"",modelValue:e.unit_price,"onUpdate:modelValue":f=>e.unit_price=f,disable:e.IS_CONFIRMED==1},null,8,["modelValue","onUpdate:modelValue","disable"])]),_:2},1024)]),_:2},1024),a(M,{side:""},{default:n(()=>[a(b,{icon:"delete",color:"red",flat:"",onClick:f=>z(_),disable:e.IS_CONFIRMED==1},{default:n(()=>[a(F,null,{default:n(()=>[O(h(e.IS_CONFIRMED==1?"Cannot delete, already confirmed line":"Delete line"),1)]),_:2},1024)]),_:2},1032,["onClick","disable"])]),_:2},1024)]),_:2},1032,["loading"]))),128)):Z((p(),k(oe,{key:1,class:"q-my-sm",clickable:""},{default:n(()=>[a(M,null,{default:n(()=>[a(H,null,{default:n(()=>[O(" Choose sales order first to access item list ")]),_:1})]),_:1})]),_:1})),[[De]])]),_:1})])]),_:1}),a(ue,{align:"right"},{default:n(()=>[a(b,{label:"OK",color:"primary",onClick:o[17]||(o[17]=e=>W()),disable:l.stateSubmit,loading:t.value},null,8,["disable","loading"]),a(b,{flat:"",label:"Cancel",color:"red",onClick:B(s)},null,8,["onClick"])]),_:1})]),_:1})]),_:1},8,["onHide"]))}},je=d("div",{class:"text-h6"},"Confirm Incoming",-1),ze={style:{border:"1px black solid","border-radius":"10px"}},Je=d("legend",{style:{"margin-left":"1em",padding:"0.2em 0.8em"}},[d("b",null,"Header")],-1),Ke={class:"row q-col-gutter-md"},Ge={class:"col-12 col-sm-6"},We={class:"col-12 col-sm-6"},Xe={class:"row items-center justify-end"},Ze={class:"row q-col-gutter-md q-pt-md"},el={key:0,class:"col-12 col-sm-6"},ll={key:1,class:"col-12 col-sm-6"},al={key:2,class:"col-12 col-sm-6"},ol={key:3,class:"col-12 col-sm-6"},tl={class:"row q-col-gutter-md q-pt-md"},nl={class:"col"},sl={class:"row q-py-md"},il={class:"col"},dl={style:{border:"1px black solid","border-radius":"10px",height:"35vh",overflow:"auto"}},ul=d("legend",{style:{"margin-left":"1em",padding:"0.2em 0.8em"}},[d("b",null,"List Of Items")],-1),rl={class:"col-12 col-sm-1 text-center"},cl={class:"col-12 col-sm-3"},ml={class:"col-12 col-sm-2"},Cl={class:"col-12 col-sm-2"},vl={class:"col-12 col-sm-3"},pl={class:"col-12 col-sm-1 text-center"},_l={key:1,class:"row"},Vl=d("div",{class:"col-12 text-center"}," Choose incoming first to access item list ",-1),fl=[Vl],Tl={__name:"incomingConfirmDet",props:{dataHeader:Array},setup(q){const y=ae(),C=q,i=m({TRCV_RCVCD:"",TRCV_SUPCD:"",TRCV_ISSUDT:"",TRCV_REFFNO:"",TRCV_DOCNO:""}),V=m(1),c=m([]),t=m(!1),P=m([]),U=m([]),w=m([]),N=m([]),v=m([]);ee(async()=>{await R(""),await E(""),await Q(""),C.dataHeader&&Object.values(C.dataHeader).length>0&&(i.value={TRCV_RCVCD:C.dataHeader.TRCV_RCVCD,TRCV_SUPCD:C.dataHeader.MSUP_SUPCD,TRCV_ISSUDT:C.dataHeader.TRCV_ISSUDT,TRCV_REFFNO:C.dataHeader.TRCV_REFFNO,TRCV_DOCNO:C.dataHeader.TRCV_DOCNO},V.value=C.dataHeader.RCV_STATE,C.dataHeader.det.map(r=>{c.value.push({id:r.id,item_code:r.item_code,quantity:r.quantity,unit_price:r.unit_price})}))});const D=()=>{i.value={TRCV_RCVCD:"",TRCV_SUPCD:"",TRCV_ISSUDT:"",TRCV_REFFNO:"",TRCV_DOCNO:""},c.value=[]},u=(r,s,l,o)=>{s(async()=>{o==="supp"&&await E(r),o==="cust"&&await Q(r),o==="item"&&await R(r),o==="po"&&await j(r),o==="inv"&&await z(r)})},R=async r=>{t.value=!0,await g.post("item/searchAPI",{searchValue:r,isITMCD:1}).then(s=>{t.value=!1,N.value=s.data.data}).catch(()=>{t.value=!1})},E=async(r,s="MSUP_SUPNM")=>{t.value=!0,await g.post("supplier/searchAPI",{searchValue:r,searchCol:s}).then(l=>{t.value=!1,P.value=l.data.data}).catch(()=>{t.value=!1})},Q=async(r,s="MCUS_CUSNM")=>{t.value=!0,await g.post("customer/searchAPI",{searchValue:r,searchCol:s}).then(l=>{t.value=!1,U.value=l.data.data}).catch(()=>{t.value=!1})},j=async(r,s="TPCHORD_PCHCD")=>{t.value=!0,await g.post("purchase-order/searchApprovedPO",{searchValue:r,searchCol:s}).then(l=>{t.value=!1,w.value=l.data.data}).catch(()=>{t.value=!1})},z=async(r,s="TDLVORD_DLVCD")=>{t.value=!0,await g.post("invoices/search",{searchBy:s,searchValue:r}).then(l=>{t.value=!1,v.value=l.data.data}).catch(l=>{t.value=!1})},J=r=>{y.dialog({dark:!0,title:"Confirm Incoming",message:`Put qty to be confirmed, Total qty is (${c.value[r].quantity})`,prompt:{model:c.value[r].quantity,type:"number",min:1,max:c.value[r].quantity,isValid:s=>s<=c.value[r].quantity},cancel:!0,persistent:!0}).onOk(s=>{c.value[r].IS_CONFIRMED=1,c.value[r].CONFIRMED_QTY=s})},$=async(r=!1)=>{r?(t.value=!0,await g.post("receive/confirmIncoming",{...i.value,det:c.value}).then(s=>{t.value=!1,y.notify({color:"green",message:`${s.data.msg}`}),A()}).catch(()=>{t.value=!1})):y.dialog({title:"Confirmation",message:"Are you sure want to confirm all this item ?",cancel:!0,persistent:!0}).onOk(async()=>{t.value=!0,await g.post("receive/confirmIncoming",{...i.value,det:c.value}).then(s=>{t.value=!1,y.notify({color:"green",message:`${s.data.msg}`}),A()}).catch(()=>{t.value=!1})})},K=()=>{y.dialog({title:"Confirmation",message:"Are you sure want to confirm all incoming item and save data ? This will confirm default qty.",cancel:!0,persistent:!0}).onOk(async()=>{c.value.map(r=>{r.IS_CONFIRMED=1,r.CONFIRMED_QTY=r.quantity}),$(!0)})},{dialogRef:G,onDialogHide:W,onDialogOK:A,onDialogCancel:X}=ce();return(r,s)=>(p(),k(re,{ref_key:"dialogRef",ref:G,onHide:B(W),"transition-show":"slide-up","transition-hide":"slide-down","full-width":"",persistent:""},{default:n(()=>[a(ie,{class:"q-dialog-plugin bg-white q-pa-sm"},{default:n(()=>[a(L,null,{default:n(()=>[je]),_:1}),a(L,{class:"q-pa-sm"},{default:n(()=>[d("fieldset",ze,[Je,a(me,{showing:t.value,dark:""},{default:n(()=>[a(Ce,{size:"50px",color:"primary"})]),_:1},8,["showing"]),d("div",Ke,[d("div",Ge,[a(S,{label:"Code",readonly:"",dense:"",filled:"",modelValue:i.value.TRCV_RCVCD,"onUpdate:modelValue":s[0]||(s[0]=l=>i.value.TRCV_RCVCD=l)},null,8,["modelValue"])]),d("div",We,[a(S,{filled:"",modelValue:i.value.TRCV_ISSUDT,"onUpdate:modelValue":s[2]||(s[2]=l=>i.value.TRCV_ISSUDT=l),dense:"",label:"Receive Date",readonly:""},{append:n(()=>[a(le,{name:"event",class:"cursor-pointer"},{default:n(()=>[a(ve,{cover:"","transition-show":"scale","transition-hide":"scale"},{default:n(()=>[a(pe,{modelValue:i.value.TRCV_ISSUDT,"onUpdate:modelValue":s[1]||(s[1]=l=>i.value.TRCV_ISSUDT=l),mask:"YYYY-MM-DD"},{default:n(()=>[d("div",Xe,[Z(a(b,{label:"Close",color:"primary",flat:""},null,512),[[_e]])])]),_:1},8,["modelValue"])]),_:1})]),_:1})]),_:1},8,["modelValue"])])]),d("div",Ze,[V.value==1?(p(),T("div",el,[a(I,{dense:"",filled:"",label:"Supplier Name",modelValue:i.value.TRCV_SUPCD,"onUpdate:modelValue":s[3]||(s[3]=l=>i.value.TRCV_SUPCD=l),"use-input":"","input-debounce":"500",options:P.value,onFilter:s[4]||(s[4]=(l,o,e)=>u(l,o,e,"supp")),behavior:"dialog","option-label":"MSUP_SUPNM","option-value":"MSUP_SUPCD","emit-value":"","map-options":"",loading:t.value,readonly:""},null,8,["modelValue","options","loading"])])):(p(),T("div",ll,[a(I,{dense:"",filled:"",label:"Customer Name",modelValue:i.value.TRCV_SUPCD,"onUpdate:modelValue":s[5]||(s[5]=l=>i.value.TRCV_SUPCD=l),"use-input":"","input-debounce":"500",options:U.value,onFilter:s[6]||(s[6]=(l,o,e)=>u(l,o,e,"cust")),behavior:"dialog","option-label":"MCUS_CUSNM","option-value":"MCUS_CUSCD","emit-value":"","map-options":"",loading:t.value,readonly:""},null,8,["modelValue","options","loading"])])),V.value==1?(p(),T("div",al,[a(I,{dense:"",filled:"",label:"PO Number",modelValue:i.value.TRCV_REFFNO,"onUpdate:modelValue":s[7]||(s[7]=l=>i.value.TRCV_REFFNO=l),"use-input":"","input-debounce":"500",options:w.value,onFilter:s[8]||(s[8]=(l,o,e)=>u(l,o,e,"po")),behavior:"dialog","option-label":"PO_CUSTDESC","option-value":"TPCHORD_PCHCD","emit-value":"","map-options":"",loading:t.value,readonly:""},null,8,["modelValue","options","loading"])])):(p(),T("div",ol,[a(I,{dense:"",filled:"",label:"JAT Invoice No",modelValue:i.value.TRCV_REFFNO,"onUpdate:modelValue":s[9]||(s[9]=l=>i.value.TRCV_REFFNO=l),"use-input":"","input-debounce":"500",options:v.value,onFilter:s[10]||(s[10]=(l,o,e)=>u(l,o,e,"inv")),behavior:"dialog","option-label":"LABEL","option-value":"TDLVORD_DLVCD","emit-value":"","map-options":"",loading:t.value,readonly:""},null,8,["modelValue","options","loading"])]))]),d("div",tl,[d("div",nl,[a(S,{label:"Doc Supplier No",dense:"",filled:"",modelValue:i.value.TRCV_DOCNO,"onUpdate:modelValue":s[11]||(s[11]=l=>i.value.TRCV_DOCNO=l),readonly:""},null,8,["modelValue"])])])]),d("div",sl,[d("div",il,[a(Ve,{modelValue:V.value,"onUpdate:modelValue":[s[12]||(s[12]=l=>V.value=l),s[13]||(s[13]=l=>D())],spread:"","no-caps":"","toggle-color":"purple",color:"white","text-color":"black",options:[{label:"From PO",value:1},{label:"Return",value:2}],readonly:""},null,8,["modelValue"])])]),d("fieldset",dl,[ul,c.value.length>0?(p(!0),T(Y,{key:0},x(c.value,(l,o)=>(p(),T("div",{class:Re(`row q-col-gutter-md ${o>0?"q-pt-md":null}`),key:o},[d("div",rl,[a(de,{"text-color":"blue"},{default:n(()=>[O(h(o+1),1)]),_:2},1024)]),d("div",cl,[a(I,{dense:"",filled:"",label:"Item Code",modelValue:l.item_code,"onUpdate:modelValue":e=>l.item_code=e,"use-input":"","input-debounce":"500",options:N.value,onFilter:s[14]||(s[14]=(e,_,f)=>u(e,_,f,"item")),behavior:"dialog","option-label":"MITM_ITMNMREAL","option-value":"MITM_ITMNM","emit-value":"","map-options":"",loading:t.value,readonly:""},null,8,["modelValue","onUpdate:modelValue","options","loading"])]),d("div",ml,[a(S,{dense:"",label:"Qty",filled:"",modelValue:l.quantity,"onUpdate:modelValue":e=>l.quantity=e,readonly:""},null,8,["modelValue","onUpdate:modelValue"])]),d("div",Cl,[a(S,{dense:"",label:"Confirmed Qty",filled:"",modelValue:l.CONFIRMED_QTY,"onUpdate:modelValue":e=>l.CONFIRMED_QTY=e,readonly:""},null,8,["modelValue","onUpdate:modelValue"])]),d("div",vl,[a(S,{dense:"",label:"Price",filled:"",modelValue:l.unit_price,"onUpdate:modelValue":e=>l.unit_price=e,readonly:""},null,8,["modelValue","onUpdate:modelValue"])]),d("div",pl,[a(b,{icon:"check",color:l.IS_CONFIRMED==1?"grey":"indigo",flat:"",onClick:e=>J(o),disable:l.IS_CONFIRMED==1},{default:n(()=>[a(F,null,{default:n(()=>[O(h(l.IS_CONFIRMED==1?"Already confirmed":"Not confirmed yet, click to confirm."),1)]),_:2},1024)]),_:2},1032,["color","onClick","disable"])])],2))),128)):(p(),T("div",_l,fl))])]),_:1}),a(ue,{align:"right"},{default:n(()=>[a(b,{label:"Save",color:"primary",onClick:s[15]||(s[15]=l=>$()),disable:c.value.filter(l=>l.CONFIRMED_QTY>0).length==0,loading:t.value},null,8,["disable","loading"]),a(b,{label:"Confirm All",color:"indigo",onClick:s[16]||(s[16]=l=>K()),disable:r.stateSubmit,loading:t.value},null,8,["disable","loading"]),a(b,{flat:"",label:"Cancel",color:"red",onClick:B(X)},null,8,["onClick"])]),_:1})]),_:1})]),_:1},8,["onHide"]))}},Dl={class:"q-pa-md"},Rl={class:"row q-pb-md"},gl=d("div",{class:"col"},[d("span",{class:"text-h4"},"Incoming")],-1),bl={class:"col text-right"},yl={class:"row q-pt-md"},Ol={class:"col"},$l={__name:"incomingIndex",setup(q){const y=ae(),C=m([]),i=m([{name:"TRCV_RCVCD",label:"Receive ID",field:"TRCV_RCVCD",sortable:!0,align:"left"},{name:"MSUP_SUPNM",label:"Supplier Name",field:"MSUP_SUPNM",sortable:!0,align:"left"},{name:"TOT_RCV",label:"Total Qty",field:"TOT_RCV",sortable:!0,align:"left",format:v=>`${v.toLocaleString()}`},{name:"MSUP_CURCD",label:"Currency",field:"MSUP_CURCD",sortable:!0,align:"left"},{name:"TOT_AMT",label:"Total Amount",field:"TOT_AMT",sortable:!0,align:"left",format:v=>`${v.toLocaleString()}`}]),V=m(!1),c=m(""),t=m("");ee(()=>{P()});const P=async()=>{V.value=!0,await g.post("receive/searchAPI",{searchBy:c.value,searchValue:t.value}).then(v=>{V.value=!1,C.value=v.data.data}).catch(v=>{V.value=!1})},U=(v=[])=>{y.dialog({component:Be,componentProps:{dataHeader:v}}).onOk(async D=>{getOutgoingData()})},w=(v=[])=>{y.dialog({component:Tl,componentProps:{dataHeader:v}}).onOk(async D=>{getOutgoingData()})},N=v=>{};return(v,D)=>(p(),T("div",Dl,[d("div",Rl,[gl,d("div",bl,[a(b,{icon:"add",color:"blue",onClick:D[0]||(D[0]=u=>U())},{default:n(()=>[a(F,null,{default:n(()=>[O("Create New Delivery")]),_:1})]),_:1})])]),a(ge),d("div",yl,[d("div",Ol,[a(ye,{title:"Outgoing List",rows:C.value,columns:i.value,"row-key":"TDLVORD_DLVCD",loading:V.value,dense:"",pagination:{rowsPerPage:20},class:"my-sticky-header-column-table"},{"top-right":n(()=>[a(I,{outlined:"",modelValue:c.value,"onUpdate:modelValue":D[1]||(D[1]=u=>c.value=u),options:v.columns,label:"Search Columns","option-value":"name","option-label":"label","emit-value":"",dense:"","map-options":""},null,8,["modelValue","options"]),a(S,{borderless:"",dense:"",modelValue:t.value,"onUpdate:modelValue":[D[2]||(D[2]=u=>t.value=u),D[3]||(D[3]=u=>v.getOutgoingData())],placeholder:"Search",outlined:"",debounce:"1000"},{append:n(()=>[a(le,{name:"search"})]),_:1},8,["modelValue"])]),header:n(u=>[a(ne,{props:u},{default:n(()=>[a(te,{"auto-width":""},{default:n(()=>[O("Action")]),_:1}),(p(!0),T(Y,null,x(u.cols,R=>(p(),k(te,{key:R.name,props:u},{default:n(()=>[O(h(R.label),1)]),_:2},1032,["props"]))),128))]),_:2},1032,["props"])]),body:n(u=>[a(ne,{props:u},{default:n(()=>[a(se,{"auto-width":""},{default:n(()=>[a(b,{flat:"",color:parseInt(u.row.CONFIRMED_QTY)==u.row.TOT_RCV?"grey":"orange",icon:"edit",onClick:R=>U(u.row),dense:"",disable:parseInt(u.row.CONFIRMED_QTY)==u.row.TOT_RCV},{default:n(()=>[a(F,null,{default:n(()=>[O(h(parseInt(u.row.CONFIRMED_QTY)==u.row.TOT_RCV?"All qty already confirmed":"Edit Data"),1)]),_:2},1024)]),_:2},1032,["color","onClick","disable"]),a(b,{flat:"",color:parseInt(u.row.CONFIRMED_QTY)==u.row.TOT_RCV?"grey":"red",icon:"delete",onClick:R=>N(u.row.id),dense:"",disable:parseInt(u.row.CONFIRMED_QTY)==u.row.TOT_RCV},{default:n(()=>[a(F,null,{default:n(()=>[O(h(parseInt(u.row.CONFIRMED_QTY)==u.row.TOT_RCV?"All qty already confirmed":"Delete Data"),1)]),_:2},1024)]),_:2},1032,["color","onClick","disable"]),a(b,{flat:"",color:parseInt(u.row.CONFIRMED_QTY)==u.row.TOT_RCV?"grey":"indigo",icon:"check",onClick:R=>w(u.row),dense:"",disable:parseInt(u.row.CONFIRMED_QTY)==u.row.TOT_RCV},{default:n(()=>[a(F,null,{default:n(()=>[O(h(parseInt(u.row.CONFIRMED_QTY)==u.row.TOT_RCV?"All qty already confirmed":"Confirm Data"),1)]),_:2},1024)]),_:2},1032,["color","onClick","disable"])]),_:2},1024),(p(!0),T(Y,null,x(u.cols,R=>(p(),k(se,{key:R.name,props:u},{default:n(()=>[O(h(R.value),1)]),_:2},1032,["props"]))),128))]),_:2},1032,["props"])]),_:1},8,["rows","columns","loading"])])])]))}};export{$l as default};
