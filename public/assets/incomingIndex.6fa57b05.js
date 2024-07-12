import{Q as F}from"./QTooltip.c9b9860c.js";import{t as C,o as ee,C as p,D as E,E as n,F as l,M as se,O as L,J as d,$ as S,at as le,U as Z,Q as b,R,S as Y,T as x,V as de,I as O,P as I,W as De,X as ue,Y as B,Z as re,b8 as Re,aM as ge}from"./index.58ba4cd5.js";import{e as h,Q as oe,a as k,b as H}from"./QSelect.5ab140e7.js";import{Q as be,a as ye,b as te}from"./QTable.c21ac173.js";import{Q as ne,a as ie}from"./QTd.7b26ee5b.js";import{api_web as g}from"./axios.f3267fc2.js";import{u as ae}from"./format.77726bc8.js";import{Q as ce,a as me}from"./QInnerLoading.f7357b02.js";import{Q as Ce,a as ve,C as pe}from"./ClosePopup.ec3cb4d6.js";import{Q as _e}from"./QBtnToggle.4f89964b.js";import{u as Ve}from"./use-dialog-plugin-component.3217b2b6.js";import"./use-render-cache.3aae9b27.js";import"./date.c249395c.js";import"./QBtnGroup.430bda4b.js";const Oe=d("div",{class:"text-h6"},"Create Incoming",-1),Se={style:{border:"1px black solid","border-radius":"10px"}},he=d("legend",{style:{"margin-left":"1em",padding:"0.2em 0.8em"}},[d("b",null,"Header")],-1),Ie={class:"row q-col-gutter-md"},we={class:"col-12 col-sm-6"},Ue={class:"col-12 col-sm-6"},Pe={class:"row items-center justify-end"},Ne={class:"row q-col-gutter-md q-pt-md"},Me={key:0,class:"col-12 col-sm-6"},Fe={key:1,class:"col-12 col-sm-6"},ke={key:2,class:"col-12 col-sm-6"},Ee={key:3,class:"col-12 col-sm-6"},Qe={class:"row q-col-gutter-md q-pt-md"},qe={class:"col"},$e={class:"row q-py-md"},Ae={class:"col"},He={style:{border:"1px black solid","border-radius":"10px",height:"35vh",overflow:"auto"}},Le=d("legend",{style:{"margin-left":"1em",padding:"0.2em 0.8em"}},[d("b",null,"List Of Items")],-1),Ye={class:"row q-pb-sm"},xe={class:"col text-right"},Be={__name:"incomingCreate",props:{dataHeader:Array},setup(q){const y=ae(),v=q,s=C({TRCV_RCVCD:"",TRCV_SUPCD:"",TRCV_ISSUDT:"",TRCV_REFFNO:"",TRCV_DOCNO:""}),_=C(1),c=C([]),t=C(!1),w=C([]),U=C([]),P=C([]),M=C([]),N=C([]);ee(async()=>{await u(""),await D(""),await Q(""),v.dataHeader&&Object.values(v.dataHeader).length>0&&(s.value={TRCV_RCVCD:v.dataHeader.TRCV_RCVCD,TRCV_SUPCD:v.dataHeader.MSUP_SUPCD,TRCV_ISSUDT:v.dataHeader.TRCV_ISSUDT,TRCV_REFFNO:v.dataHeader.TRCV_REFFNO,TRCV_DOCNO:v.dataHeader.TRCV_DOCNO},_.value=v.dataHeader.RCV_STATE,v.dataHeader.det.map(a=>{c.value.push({item_code:a.item_code,quantity:a.quantity,unit_price:a.unit_price})}))});const V=()=>{s.value={TRCV_RCVCD:"",TRCV_SUPCD:"",TRCV_ISSUDT:"",TRCV_REFFNO:"",TRCV_DOCNO:""},c.value=[]},m=(a,o,e,f)=>{o(async()=>{f==="supp"&&await D(a),f==="cust"&&await Q(a),f==="item"&&await u(a),f==="po"&&await j(a),f==="inv"&&await $(a)})},u=async a=>{t.value=!0,await g.post("item/searchAPI",{searchValue:a,isITMCD:1}).then(o=>{t.value=!1,M.value=o.data.data}).catch(()=>{t.value=!1})},D=async(a,o="MSUP_SUPNM")=>{t.value=!0,await g.post("supplier/searchAPI",{searchValue:a,searchCol:o}).then(e=>{t.value=!1,w.value=e.data.data}).catch(()=>{t.value=!1})},Q=async(a,o="MCUS_CUSNM")=>{t.value=!0,await g.post("customer/searchAPI",{searchValue:a,searchCol:o}).then(e=>{t.value=!1,U.value=e.data.data}).catch(()=>{t.value=!1})},j=async(a,o="TPCHORD_PCHCD")=>{t.value=!0,await g.post("purchase-order/searchApprovedPO",{searchValue:a,searchCol:o}).then(e=>{t.value=!1,P.value=e.data.data}).catch(()=>{t.value=!1})},z=a=>{y.dialog({title:"Confirmation",message:`Do you want to delete this lines no ${a+1} ?`,cancel:!0,persistent:!0}).onOk(async()=>{c.value.splice(a,1)})},J=()=>{c.value.push({item_code:"",quantity:"",unit_price:""})},$=async(a,o="TDLVORD_DLVCD")=>{t.value=!0,await g.post("invoices/search",{searchBy:o,searchValue:a}).then(e=>{t.value=!1,N.value=e.data.data}).catch(e=>{t.value=!1})},K=a=>{let o=P.value.filter(e=>e.TPCHORD_PCHCD==a);c.value=[],o.length>0&&(s.value.TRCV_SUPCD=o[0].TPCHORD_SUPCD,o[0].det.map(e=>{c.value.push({item_code:e.TPCHORDDETA_ITMCD,quantity:e.TPCHORDDETA_ITMQT,unit_price:e.TPCHORDDETA_ITMPRC_PER})}))},W=a=>{let o=N.value.filter(e=>e.TDLVORD_DLVCD==a);c.value=[],o.length>0&&(s.value.TRCV_SUPCD=o[0].TDLVORD_CUSCD,o[0].dlvacc.map(e=>{c.value.push({item_code:e.TDLVACCESSORY_ITMCD,quantity:e.TDLVACCESSORY_ITMQT,unit_price:0})}),o[0].dlvdet.map(e=>{c.value.push({item_code:e.TDLVORDDETA_ITMCD,quantity:e.TDLVORDDETA_ITMQT,unit_price:e.TDLVORDDETA_PRC})}))},G=()=>{y.dialog({title:"Confirmation",message:"Are you sure want to save this Incoming ?",cancel:!0,persistent:!0}).onOk(async()=>{t.value=!0,await g.post("receive/saveAPI",{...s.value,det:c.value}).then(a=>{t.value=!1,y.notify({color:"green",message:`${a.data.msg}`}),r()}).catch(()=>{t.value=!1})})},{dialogRef:A,onDialogHide:X,onDialogOK:r,onDialogCancel:i}=Ve();return(a,o)=>(p(),E(re,{ref_key:"dialogRef",ref:A,onHide:B(X),"transition-show":"slide-up","transition-hide":"slide-down","full-width":"",persistent:""},{default:n(()=>[l(se,{class:"q-dialog-plugin bg-white q-pa-sm"},{default:n(()=>[l(L,null,{default:n(()=>[Oe]),_:1}),l(L,{class:"q-pa-sm"},{default:n(()=>[d("fieldset",Se,[he,l(ce,{showing:t.value,dark:""},{default:n(()=>[l(me,{size:"50px",color:"primary"})]),_:1},8,["showing"]),d("div",Ie,[d("div",we,[l(S,{label:"Code",readonly:"",dense:"",filled:"",modelValue:s.value.TRCV_RCVCD,"onUpdate:modelValue":o[0]||(o[0]=e=>s.value.TRCV_RCVCD=e)},null,8,["modelValue"])]),d("div",Ue,[l(S,{filled:"",modelValue:s.value.TRCV_ISSUDT,"onUpdate:modelValue":o[2]||(o[2]=e=>s.value.TRCV_ISSUDT=e),dense:"",label:"Receive Date"},{append:n(()=>[l(le,{name:"event",class:"cursor-pointer"},{default:n(()=>[l(Ce,{cover:"","transition-show":"scale","transition-hide":"scale"},{default:n(()=>[l(ve,{modelValue:s.value.TRCV_ISSUDT,"onUpdate:modelValue":o[1]||(o[1]=e=>s.value.TRCV_ISSUDT=e),mask:"YYYY-MM-DD"},{default:n(()=>[d("div",Pe,[Z(l(b,{label:"Close",color:"primary",flat:""},null,512),[[pe]])])]),_:1},8,["modelValue"])]),_:1})]),_:1})]),_:1},8,["modelValue"])])]),d("div",Ne,[_.value==1?(p(),R("div",Me,[l(h,{dense:"",filled:"",label:"Supplier Name",modelValue:s.value.TRCV_SUPCD,"onUpdate:modelValue":o[3]||(o[3]=e=>s.value.TRCV_SUPCD=e),"use-input":"","input-debounce":"500",options:w.value,onFilter:o[4]||(o[4]=(e,f,T)=>m(e,f,T,"supp")),behavior:"dialog","option-label":"MSUP_SUPNM","option-value":"MSUP_SUPCD","emit-value":"","map-options":"",loading:t.value,disable:s.value.TRCV_RCVCD!==""||_.value==1},null,8,["modelValue","options","loading","disable"])])):(p(),R("div",Fe,[l(h,{dense:"",filled:"",label:"Customer Name",modelValue:s.value.TRCV_SUPCD,"onUpdate:modelValue":o[5]||(o[5]=e=>s.value.TRCV_SUPCD=e),"use-input":"","input-debounce":"500",options:U.value,onFilter:o[6]||(o[6]=(e,f,T)=>m(e,f,T,"cust")),behavior:"dialog","option-label":"MCUS_CUSNM","option-value":"MCUS_CUSCD","emit-value":"","map-options":"",loading:t.value,disable:s.value.TRCV_RCVCD!==""||_.value==1},null,8,["modelValue","options","loading","disable"])])),_.value==1?(p(),R("div",ke,[l(h,{dense:"",filled:"",label:"PO Number",modelValue:s.value.TRCV_REFFNO,"onUpdate:modelValue":[o[7]||(o[7]=e=>s.value.TRCV_REFFNO=e),o[9]||(o[9]=e=>K(e))],"use-input":"","input-debounce":"500",options:P.value,onFilter:o[8]||(o[8]=(e,f,T)=>m(e,f,T,"po")),behavior:"dialog","option-label":"PO_CUSTDESC","option-value":"TPCHORD_PCHCD","emit-value":"","map-options":"",loading:t.value,disable:s.value.TRCV_RCVCD!==""},null,8,["modelValue","options","loading","disable"])])):(p(),R("div",Ee,[l(h,{dense:"",filled:"",label:"JAT Invoice No",modelValue:s.value.TRCV_REFFNO,"onUpdate:modelValue":[o[10]||(o[10]=e=>s.value.TRCV_REFFNO=e),o[12]||(o[12]=e=>W(e))],"use-input":"","input-debounce":"500",options:N.value,onFilter:o[11]||(o[11]=(e,f,T)=>m(e,f,T,"inv")),behavior:"dialog","option-label":"LABEL","option-value":"TDLVORD_DLVCD","emit-value":"","map-options":"",loading:t.value,disable:s.value.TRCV_RCVCD!==""},null,8,["modelValue","options","loading","disable"])]))]),d("div",Qe,[d("div",qe,[l(S,{label:"Doc Supplier No",dense:"",filled:"",modelValue:s.value.TRCV_DOCNO,"onUpdate:modelValue":o[13]||(o[13]=e=>s.value.TRCV_DOCNO=e)},null,8,["modelValue"])])])]),d("div",$e,[d("div",Ae,[l(_e,{modelValue:_.value,"onUpdate:modelValue":[o[14]||(o[14]=e=>_.value=e),o[15]||(o[15]=e=>V())],spread:"","no-caps":"","toggle-color":"purple",color:"white","text-color":"black",options:[{label:"From PO",value:1},{label:"Return",value:2}],disable:s.value.TRCV_RCVCD!==""},null,8,["modelValue","disable"])])]),d("fieldset",He,[Le,d("div",Ye,[d("div",xe,[l(b,{flat:"",icon:"add",color:"blue",label:"Add Lines",onClick:J,loading:t.value},null,8,["loading"])])]),l(be,{bordered:"",dense:""},{default:n(()=>[c.value.length>0?(p(!0),R(Y,{key:0},x(c.value,(e,f)=>(p(),E(oe,{key:f,class:"q-my-sm",dense:"",loading:t.value},{default:n(()=>[l(k,{avatar:""},{default:n(()=>[l(de,{"text-color":"blue"},{default:n(()=>[O(I(f+1),1)]),_:2},1024)]),_:2},1024),l(k,null,{default:n(()=>[l(H,null,{default:n(()=>[l(h,{dense:"",filled:"",label:"Item Code",modelValue:e.item_code,"onUpdate:modelValue":T=>e.item_code=T,"use-input":"","input-debounce":"500",options:M.value,onFilter:o[16]||(o[16]=(T,fe,Te)=>m(T,fe,Te,"item")),behavior:"dialog","option-label":"MITM_ITMNMREAL","option-value":"MITM_ITMNM","emit-value":"","map-options":"",loading:t.value,disable:e.IS_CONFIRMED==1||s.value.TRCV_RCVCD!==""},null,8,["modelValue","onUpdate:modelValue","options","loading","disable"])]),_:2},1024)]),_:2},1024),l(k,null,{default:n(()=>[l(H,null,{default:n(()=>[l(S,{dense:"",label:"Qty",filled:"",modelValue:e.quantity,"onUpdate:modelValue":T=>e.quantity=T,disable:e.IS_CONFIRMED==1},null,8,["modelValue","onUpdate:modelValue","disable"])]),_:2},1024)]),_:2},1024),l(k,null,{default:n(()=>[l(H,null,{default:n(()=>[l(S,{dense:"",label:"Price",filled:"",modelValue:e.unit_price,"onUpdate:modelValue":T=>e.unit_price=T,disable:e.IS_CONFIRMED==1},null,8,["modelValue","onUpdate:modelValue","disable"])]),_:2},1024)]),_:2},1024),l(k,{side:""},{default:n(()=>[l(b,{icon:"delete",color:"red",flat:"",onClick:T=>z(f),disable:e.IS_CONFIRMED==1},{default:n(()=>[l(F,null,{default:n(()=>[O(I(e.IS_CONFIRMED==1?"Cannot delete, already confirmed line":"Delete line"),1)]),_:2},1024)]),_:2},1032,["onClick","disable"])]),_:2},1024)]),_:2},1032,["loading"]))),128)):Z((p(),E(oe,{key:1,class:"q-my-sm",clickable:""},{default:n(()=>[l(k,null,{default:n(()=>[l(H,null,{default:n(()=>[O(" Choose sales order first to access item list ")]),_:1})]),_:1})]),_:1})),[[De]])]),_:1})])]),_:1}),l(ue,{align:"right"},{default:n(()=>[l(b,{label:"OK",color:"primary",onClick:o[17]||(o[17]=e=>G()),disable:a.stateSubmit,loading:t.value},null,8,["disable","loading"]),l(b,{flat:"",label:"Cancel",color:"red",onClick:B(i)},null,8,["onClick"])]),_:1})]),_:1})]),_:1},8,["onHide"]))}},je=d("div",{class:"text-h6"},"Confirm Incoming",-1),ze={style:{border:"1px black solid","border-radius":"10px"}},Je=d("legend",{style:{"margin-left":"1em",padding:"0.2em 0.8em"}},[d("b",null,"Header")],-1),Ke={class:"row q-col-gutter-md"},We={class:"col-12 col-sm-6"},Ge={class:"col-12 col-sm-6"},Xe={class:"row items-center justify-end"},Ze={class:"row q-col-gutter-md q-pt-md"},el={key:0,class:"col-12 col-sm-6"},ll={key:1,class:"col-12 col-sm-6"},al={key:2,class:"col-12 col-sm-6"},ol={key:3,class:"col-12 col-sm-6"},tl={class:"row q-col-gutter-md q-pt-md"},nl={class:"col"},il={class:"row q-py-md"},sl={class:"col"},dl={style:{border:"1px black solid","border-radius":"10px",height:"35vh",overflow:"auto"}},ul=d("legend",{style:{"margin-left":"1em",padding:"0.2em 0.8em"}},[d("b",null,"List Of Items")],-1),rl={class:"col-12 col-sm-1 text-center"},cl={class:"col-12 col-sm-3"},ml={class:"col-12 col-sm-2"},Cl={class:"col-12 col-sm-2"},vl={class:"col-12 col-sm-3"},pl={class:"col-12 col-sm-1 text-center"},_l={key:1,class:"row"},Vl=d("div",{class:"col-12 text-center"}," Choose incoming first to access item list ",-1),fl=[Vl],Tl={__name:"incomingConfirmDet",props:{dataHeader:Array},setup(q){const y=ae(),v=q,s=C({TRCV_RCVCD:"",TRCV_SUPCD:"",TRCV_ISSUDT:"",TRCV_REFFNO:"",TRCV_DOCNO:""}),_=C(1),c=C([]),t=C(!1),w=C([]),U=C([]),P=C([]),M=C([]),N=C([]);ee(async()=>{await u(""),await D(""),await Q(""),v.dataHeader&&Object.values(v.dataHeader).length>0&&(s.value={TRCV_RCVCD:v.dataHeader.TRCV_RCVCD,TRCV_SUPCD:v.dataHeader.MSUP_SUPCD,TRCV_ISSUDT:v.dataHeader.TRCV_ISSUDT,TRCV_REFFNO:v.dataHeader.TRCV_REFFNO,TRCV_DOCNO:v.dataHeader.TRCV_DOCNO},_.value=v.dataHeader.RCV_STATE,v.dataHeader.det.map(r=>{c.value.push({id:r.id,item_code:r.item_code,quantity:r.quantity,unit_price:r.unit_price})}))});const V=()=>{s.value={TRCV_RCVCD:"",TRCV_SUPCD:"",TRCV_ISSUDT:"",TRCV_REFFNO:"",TRCV_DOCNO:""},c.value=[]},m=(r,i,a,o)=>{i(async()=>{o==="supp"&&await D(r),o==="cust"&&await Q(r),o==="item"&&await u(r),o==="po"&&await j(r),o==="inv"&&await z(r)})},u=async r=>{t.value=!0,await g.post("item/searchAPI",{searchValue:r,isITMCD:1}).then(i=>{t.value=!1,M.value=i.data.data}).catch(()=>{t.value=!1})},D=async(r,i="MSUP_SUPNM")=>{t.value=!0,await g.post("supplier/searchAPI",{searchValue:r,searchCol:i}).then(a=>{t.value=!1,w.value=a.data.data}).catch(()=>{t.value=!1})},Q=async(r,i="MCUS_CUSNM")=>{t.value=!0,await g.post("customer/searchAPI",{searchValue:r,searchCol:i}).then(a=>{t.value=!1,U.value=a.data.data}).catch(()=>{t.value=!1})},j=async(r,i="TPCHORD_PCHCD")=>{t.value=!0,await g.post("purchase-order/searchApprovedPO",{searchValue:r,searchCol:i}).then(a=>{t.value=!1,P.value=a.data.data}).catch(()=>{t.value=!1})},z=async(r,i="TDLVORD_DLVCD")=>{t.value=!0,await g.post("invoices/search",{searchBy:i,searchValue:r}).then(a=>{t.value=!1,N.value=a.data.data}).catch(a=>{t.value=!1})},J=r=>{y.dialog({dark:!0,title:"Confirm Incoming",message:`Put qty to be confirmed, Total qty is (${c.value[r].quantity})`,prompt:{model:c.value[r].quantity,type:"number",min:1,max:c.value[r].quantity,isValid:i=>i<=c.value[r].quantity},cancel:!0,persistent:!0}).onOk(i=>{c.value[r].IS_CONFIRMED=1,c.value[r].CONFIRMED_QTY=i})},$=async(r=!1)=>{r?(t.value=!0,await g.post("receive/confirmIncoming",{...s.value,det:c.value}).then(i=>{t.value=!1,y.notify({color:"green",message:`${i.data.msg}`}),A()}).catch(()=>{t.value=!1})):y.dialog({title:"Confirmation",message:"Are you sure want to confirm all this item ?",cancel:!0,persistent:!0}).onOk(async()=>{t.value=!0,await g.post("receive/confirmIncoming",{...s.value,det:c.value}).then(i=>{t.value=!1,y.notify({color:"green",message:`${i.data.msg}`}),A()}).catch(()=>{t.value=!1})})},K=()=>{y.dialog({title:"Confirmation",message:"Are you sure want to confirm all incoming item and save data ? This will confirm default qty.",cancel:!0,persistent:!0}).onOk(async()=>{c.value.map(r=>{r.IS_CONFIRMED=1,r.CONFIRMED_QTY=r.quantity}),$(!0)})},{dialogRef:W,onDialogHide:G,onDialogOK:A,onDialogCancel:X}=Ve();return(r,i)=>(p(),E(re,{ref_key:"dialogRef",ref:W,onHide:B(G),"transition-show":"slide-up","transition-hide":"slide-down","full-width":"",persistent:""},{default:n(()=>[l(se,{class:"q-dialog-plugin bg-white q-pa-sm"},{default:n(()=>[l(L,null,{default:n(()=>[je]),_:1}),l(L,{class:"q-pa-sm"},{default:n(()=>[d("fieldset",ze,[Je,l(ce,{showing:t.value,dark:""},{default:n(()=>[l(me,{size:"50px",color:"primary"})]),_:1},8,["showing"]),d("div",Ke,[d("div",We,[l(S,{label:"Code",readonly:"",dense:"",filled:"",modelValue:s.value.TRCV_RCVCD,"onUpdate:modelValue":i[0]||(i[0]=a=>s.value.TRCV_RCVCD=a)},null,8,["modelValue"])]),d("div",Ge,[l(S,{filled:"",modelValue:s.value.TRCV_ISSUDT,"onUpdate:modelValue":i[2]||(i[2]=a=>s.value.TRCV_ISSUDT=a),dense:"",label:"Receive Date",readonly:""},{append:n(()=>[l(le,{name:"event",class:"cursor-pointer"},{default:n(()=>[l(Ce,{cover:"","transition-show":"scale","transition-hide":"scale"},{default:n(()=>[l(ve,{modelValue:s.value.TRCV_ISSUDT,"onUpdate:modelValue":i[1]||(i[1]=a=>s.value.TRCV_ISSUDT=a),mask:"YYYY-MM-DD"},{default:n(()=>[d("div",Xe,[Z(l(b,{label:"Close",color:"primary",flat:""},null,512),[[pe]])])]),_:1},8,["modelValue"])]),_:1})]),_:1})]),_:1},8,["modelValue"])])]),d("div",Ze,[_.value==1?(p(),R("div",el,[l(h,{dense:"",filled:"",label:"Supplier Name",modelValue:s.value.TRCV_SUPCD,"onUpdate:modelValue":i[3]||(i[3]=a=>s.value.TRCV_SUPCD=a),"use-input":"","input-debounce":"500",options:w.value,onFilter:i[4]||(i[4]=(a,o,e)=>m(a,o,e,"supp")),behavior:"dialog","option-label":"MSUP_SUPNM","option-value":"MSUP_SUPCD","emit-value":"","map-options":"",loading:t.value,readonly:""},null,8,["modelValue","options","loading"])])):(p(),R("div",ll,[l(h,{dense:"",filled:"",label:"Customer Name",modelValue:s.value.TRCV_SUPCD,"onUpdate:modelValue":i[5]||(i[5]=a=>s.value.TRCV_SUPCD=a),"use-input":"","input-debounce":"500",options:U.value,onFilter:i[6]||(i[6]=(a,o,e)=>m(a,o,e,"cust")),behavior:"dialog","option-label":"MCUS_CUSNM","option-value":"MCUS_CUSCD","emit-value":"","map-options":"",loading:t.value,readonly:""},null,8,["modelValue","options","loading"])])),_.value==1?(p(),R("div",al,[l(h,{dense:"",filled:"",label:"PO Number",modelValue:s.value.TRCV_REFFNO,"onUpdate:modelValue":i[7]||(i[7]=a=>s.value.TRCV_REFFNO=a),"use-input":"","input-debounce":"500",options:P.value,onFilter:i[8]||(i[8]=(a,o,e)=>m(a,o,e,"po")),behavior:"dialog","option-label":"PO_CUSTDESC","option-value":"TPCHORD_PCHCD","emit-value":"","map-options":"",loading:t.value,readonly:""},null,8,["modelValue","options","loading"])])):(p(),R("div",ol,[l(h,{dense:"",filled:"",label:"JAT Invoice No",modelValue:s.value.TRCV_REFFNO,"onUpdate:modelValue":i[9]||(i[9]=a=>s.value.TRCV_REFFNO=a),"use-input":"","input-debounce":"500",options:N.value,onFilter:i[10]||(i[10]=(a,o,e)=>m(a,o,e,"inv")),behavior:"dialog","option-label":"LABEL","option-value":"TDLVORD_DLVCD","emit-value":"","map-options":"",loading:t.value,readonly:""},null,8,["modelValue","options","loading"])]))]),d("div",tl,[d("div",nl,[l(S,{label:"Doc Supplier No",dense:"",filled:"",modelValue:s.value.TRCV_DOCNO,"onUpdate:modelValue":i[11]||(i[11]=a=>s.value.TRCV_DOCNO=a),readonly:""},null,8,["modelValue"])])])]),d("div",il,[d("div",sl,[l(_e,{modelValue:_.value,"onUpdate:modelValue":[i[12]||(i[12]=a=>_.value=a),i[13]||(i[13]=a=>V())],spread:"","no-caps":"","toggle-color":"purple",color:"white","text-color":"black",options:[{label:"From PO",value:1},{label:"Return",value:2}],readonly:""},null,8,["modelValue"])])]),d("fieldset",dl,[ul,c.value.length>0?(p(!0),R(Y,{key:0},x(c.value,(a,o)=>(p(),R("div",{class:Re(`row q-col-gutter-md ${o>0?"q-pt-md":null}`),key:o},[d("div",rl,[l(de,{"text-color":"blue"},{default:n(()=>[O(I(o+1),1)]),_:2},1024)]),d("div",cl,[l(h,{dense:"",filled:"",label:"Item Code",modelValue:a.item_code,"onUpdate:modelValue":e=>a.item_code=e,"use-input":"","input-debounce":"500",options:M.value,onFilter:i[14]||(i[14]=(e,f,T)=>m(e,f,T,"item")),behavior:"dialog","option-label":"MITM_ITMNMREAL","option-value":"MITM_ITMNM","emit-value":"","map-options":"",loading:t.value,readonly:""},null,8,["modelValue","onUpdate:modelValue","options","loading"])]),d("div",ml,[l(S,{dense:"",label:"Qty",filled:"",modelValue:a.quantity,"onUpdate:modelValue":e=>a.quantity=e,readonly:""},null,8,["modelValue","onUpdate:modelValue"])]),d("div",Cl,[l(S,{dense:"",label:"Confirmed Qty",filled:"",modelValue:a.CONFIRMED_QTY,"onUpdate:modelValue":e=>a.CONFIRMED_QTY=e,readonly:""},null,8,["modelValue","onUpdate:modelValue"])]),d("div",vl,[l(S,{dense:"",label:"Price",filled:"",modelValue:a.unit_price,"onUpdate:modelValue":e=>a.unit_price=e,readonly:""},null,8,["modelValue","onUpdate:modelValue"])]),d("div",pl,[l(b,{icon:"check",color:a.IS_CONFIRMED==1?"grey":"indigo",flat:"",onClick:e=>J(o),disable:a.IS_CONFIRMED==1},{default:n(()=>[l(F,null,{default:n(()=>[O(I(a.IS_CONFIRMED==1?"Already confirmed":"Not confirmed yet, click to confirm."),1)]),_:2},1024)]),_:2},1032,["color","onClick","disable"])])],2))),128)):(p(),R("div",_l,fl))])]),_:1}),l(ue,{align:"right"},{default:n(()=>[l(b,{label:"Save",color:"primary",onClick:i[15]||(i[15]=a=>$()),disable:c.value.filter(a=>a.CONFIRMED_QTY>0).length==0,loading:t.value},null,8,["disable","loading"]),l(b,{label:"Confirm All",color:"indigo",onClick:i[16]||(i[16]=a=>K()),disable:r.stateSubmit,loading:t.value},null,8,["disable","loading"]),l(b,{flat:"",label:"Cancel",color:"red",onClick:B(X)},null,8,["onClick"])]),_:1})]),_:1})]),_:1},8,["onHide"]))}},Dl={class:"q-pa-md"},Rl={class:"row q-pb-md"},gl=d("div",{class:"col"},[d("span",{class:"text-h4"},"Incoming")],-1),bl={class:"col text-right"},yl={class:"row q-pt-md"},Ol={class:"col"},Al={__name:"incomingIndex",setup(q){const y=ae(),v=C([]),s=C([{name:"TRCV_RCVCD",label:"Receive ID",field:"TRCV_RCVCD",sortable:!0,align:"left"},{name:"MSUP_SUPNM",label:"Supplier Name",field:"MSUP_SUPNM",sortable:!0,align:"left"},{name:"TOT_RCV",label:"Total Qty",field:"TOT_RCV",sortable:!0,align:"left",format:V=>`${V.toLocaleString()}`},{name:"MSUP_CURCD",label:"Currency",field:"MSUP_CURCD",sortable:!0,align:"left"},{name:"TOT_AMT",label:"Total Amount",field:"TOT_AMT",sortable:!0,align:"left",format:V=>`${V.toLocaleString()}`}]),_=C(!1),c=C(""),t=C("");ee(()=>{w()});const w=async()=>{_.value=!0,await g.post("receive/searchAPI",{searchBy:c.value,searchValue:t.value}).then(V=>{_.value=!1,v.value=V.data.data}).catch(V=>{_.value=!1})},U=(V=[])=>{y.dialog({component:Be,componentProps:{dataHeader:V}}).onOk(async m=>{w()})},P=(V=[])=>{y.dialog({component:Tl,componentProps:{dataHeader:V}}).onOk(async m=>{w()})},M=V=>{},N=V=>{y.dialog({title:"Confirmation",message:"Are you sure want to print all of this DO barcode ?",cancel:!0,persistent:!0}).onOk(async()=>{_.value=!0,await g.post("receiveBarcode/printBarcode",{data:V}).then(m=>{_.value=!1,window.open("").document.write("<iframe width='100%' height='100%' src='data:application/pdf;base64, "+encodeURI(m.data)+"'></iframe>")})})};return(V,m)=>(p(),R("div",Dl,[d("div",Rl,[gl,d("div",bl,[l(b,{icon:"add",color:"blue",onClick:m[0]||(m[0]=u=>U())},{default:n(()=>[l(F,null,{default:n(()=>[O("Create New Incoming")]),_:1})]),_:1})])]),l(ge),d("div",yl,[d("div",Ol,[l(ye,{title:"Updated Incoming List",rows:v.value,columns:s.value,"row-key":"TDLVORD_DLVCD",loading:_.value,dense:"",pagination:{rowsPerPage:20},class:"my-sticky-header-column-table"},{"top-right":n(()=>[l(h,{outlined:"",modelValue:c.value,"onUpdate:modelValue":m[1]||(m[1]=u=>c.value=u),options:V.col,label:"Search Columns","option-value":"name","option-label":"label","emit-value":"",dense:"","map-options":""},null,8,["modelValue","options"]),l(S,{borderless:"",dense:"",modelValue:t.value,"onUpdate:modelValue":[m[2]||(m[2]=u=>t.value=u),m[3]||(m[3]=u=>V.getOutgoingData())],placeholder:"Search",outlined:"",debounce:"1000"},{append:n(()=>[l(le,{name:"search"})]),_:1},8,["modelValue"])]),header:n(u=>[l(ne,{props:u},{default:n(()=>[l(te,{"auto-width":""},{default:n(()=>[O("Action")]),_:1}),(p(!0),R(Y,null,x(u.cols,D=>(p(),E(te,{key:D.name,props:u},{default:n(()=>[O(I(D.label),1)]),_:2},1032,["props"]))),128))]),_:2},1032,["props"])]),body:n(u=>[l(ne,{props:u},{default:n(()=>[l(ie,{"auto-width":""},{default:n(()=>[l(b,{flat:"",color:parseInt(u.row.CONFIRMED_QTY)==u.row.TOT_RCV?"grey":"orange",icon:"edit",onClick:D=>U(u.row),dense:"",disable:parseInt(u.row.CONFIRMED_QTY)==u.row.TOT_RCV},{default:n(()=>[l(F,null,{default:n(()=>[O(I(parseInt(u.row.CONFIRMED_QTY)==u.row.TOT_RCV?"All qty already confirmed":"Edit Data"),1)]),_:2},1024)]),_:2},1032,["color","onClick","disable"]),l(b,{flat:"",color:parseInt(u.row.CONFIRMED_QTY)==u.row.TOT_RCV?"grey":"red",icon:"delete",onClick:D=>M(u.row.id),dense:"",disable:parseInt(u.row.CONFIRMED_QTY)==u.row.TOT_RCV},{default:n(()=>[l(F,null,{default:n(()=>[O(I(parseInt(u.row.CONFIRMED_QTY)==u.row.TOT_RCV?"All qty already confirmed":"Delete Data"),1)]),_:2},1024)]),_:2},1032,["color","onClick","disable"]),l(b,{flat:"",color:parseInt(u.row.CONFIRMED_QTY)==u.row.TOT_RCV?"grey":"indigo",icon:"check",onClick:D=>P(u.row),dense:"",disable:parseInt(u.row.CONFIRMED_QTY)==u.row.TOT_RCV},{default:n(()=>[l(F,null,{default:n(()=>[O(I(parseInt(u.row.CONFIRMED_QTY)==u.row.TOT_RCV?"All qty already confirmed":"Confirm Data"),1)]),_:2},1024)]),_:2},1032,["color","onClick","disable"]),l(b,{flat:"",color:u.row.bc.length==0?"grey":"indigo",icon:"print",onClick:D=>N(u.row.bc),dense:"",disable:u.row.bc.length==0},{default:n(()=>[l(F,null,{default:n(()=>[O(I(parseInt(u.row.CONFIRMED_QTY)==u.row.TOT_RCV?"All qty already confirmed":"Confirm Data"),1)]),_:2},1024)]),_:2},1032,["color","onClick","disable"])]),_:2},1024),(p(!0),R(Y,null,x(u.cols,D=>(p(),E(ie,{key:D.name,props:u},{default:n(()=>[O(I(D.value),1)]),_:2},1032,["props"]))),128))]),_:2},1032,["props"])]),_:1},8,["rows","columns","loading"])])])]))}};export{Al as default};
