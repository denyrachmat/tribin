import{Q as F}from"./QTooltip.6af8dc08.js";import{t as m,o as le,C as v,D as M,E as t,F as e,M as ie,O as L,J as d,$ as U,an as ae,U as x,Q as R,R as S,S as B,T as Y,V as de,I as b,P as E,W as ue,X as re,Y as j,Z as ce,aY as Re}from"./index.c259f9a3.js";import{a as oe,u as me,l as h,Q as pe,b as J,c as O,d as w,k as be,m as te}from"./QTable.7c638637.js";import{Q as ne,a as se}from"./QTd.02d7b1a4.js";import{api_web as T}from"./axios.c3783f7e.js";import{Q as Ce,a as ve}from"./QInnerLoading.d5f3af93.js";import{Q as _e,a as Ve,C as fe}from"./ClosePopup.56c1129d.js";import{Q as De}from"./QBtnToggle.f0cf052a.js";import"./use-render-cache.3aae9b27.js";import"./date.5c5b5cc4.js";import"./QBtnGroup.73bd131d.js";const Se=d("div",{class:"text-h6"},"Create Incoming",-1),ye={style:{border:"1px black solid","border-radius":"10px"}},Oe=d("legend",{style:{"margin-left":"1em",padding:"0.2em 0.8em"}},[d("b",null,"Header")],-1),Ue={class:"row q-col-gutter-md"},he={class:"col-12 col-sm-6"},Ie={class:"col-12 col-sm-6"},Pe={class:"row items-center justify-end"},we={class:"row q-col-gutter-md q-pt-md"},Me={key:0,class:"col-12 col-sm-6"},Ne={key:1,class:"col-12 col-sm-6"},ke={key:2,class:"col-12 col-sm-6"},Fe={key:3,class:"col-12 col-sm-6"},Ee={class:"row q-col-gutter-md q-pt-md"},qe={class:"col"},$e={class:"row q-py-md"},Ae={class:"col"},He={style:{border:"1px black solid","border-radius":"10px",height:"35vh",overflow:"auto"}},Qe=d("legend",{style:{"margin-left":"1em",padding:"0.2em 0.8em"}},[d("b",null,"List Of Items")],-1),Le={class:"row q-pb-sm"},xe={class:"col text-right"},Be={__name:"incomingCreate",props:{dataHeader:Array},setup(A){const y=oe(),p=A,i=m({TRCV_RCVCD:"",TRCV_SUPCD:"",TRCV_ISSUDT:"",TRCV_REFFNO:"",TRCV_DOCNO:""}),V=m(1),r=m([]),n=m(!1),N=m([]),I=m([]),P=m([]),k=m([]),C=m([]);le(async()=>{await g(""),await q(""),await $(""),p.dataHeader&&Object.values(p.dataHeader).length>0&&(i.value={TRCV_RCVCD:p.dataHeader.TRCV_RCVCD,TRCV_SUPCD:p.dataHeader.MSUP_SUPCD,TRCV_ISSUDT:p.dataHeader.TRCV_ISSUDT,TRCV_REFFNO:p.dataHeader.TRCV_REFFNO,TRCV_DOCNO:p.dataHeader.TRCV_DOCNO},V.value=p.dataHeader.RCV_STATE,p.dataHeader.det.map(a=>{r.value.push({item_code:a.item_code,quantity:a.quantity,unit_price:a.unit_price})}))});const D=()=>{i.value={TRCV_RCVCD:"",TRCV_SUPCD:"",TRCV_ISSUDT:"",TRCV_REFFNO:"",TRCV_DOCNO:""},r.value=[]},c=(a,o,l,_)=>{o(async()=>{_==="supp"&&await q(a),_==="cust"&&await $(a),_==="item"&&await g(a),_==="po"&&await K(a),_==="inv"&&await H(a)})},g=async a=>{n.value=!0,await T.post("item/searchAPI",{searchValue:a,isITMCD:1}).then(o=>{n.value=!1,k.value=o.data.data}).catch(()=>{n.value=!1})},q=async(a,o="MSUP_SUPNM")=>{n.value=!0,await T.post("supplier/searchAPI",{searchValue:a,searchCol:o}).then(l=>{n.value=!1,N.value=l.data.data}).catch(()=>{n.value=!1})},$=async(a,o="MCUS_CUSNM")=>{n.value=!0,await T.post("customer/searchAPI",{searchValue:a,searchCol:o}).then(l=>{n.value=!1,I.value=l.data.data}).catch(()=>{n.value=!1})},K=async(a,o="TPCHORD_PCHCD")=>{n.value=!0,await T.post("purchase-order/searchApprovedPO",{searchValue:a,searchCol:o}).then(l=>{n.value=!1,P.value=l.data.data}).catch(()=>{n.value=!1})},z=a=>{y.dialog({title:"Confirmation",message:`Do you want to delete this lines no ${a+1} ?`,cancel:!0,persistent:!0}).onOk(async()=>{r.value.splice(a,1)})},G=()=>{r.value.push({item_code:"",quantity:"",unit_price:""})},H=async(a,o="TDLVORD_DLVCD")=>{n.value=!0,await T.post("invoices/search",{searchBy:o,searchValue:a}).then(l=>{n.value=!1,C.value=l.data.data}).catch(l=>{n.value=!1})},W=a=>{let o=P.value.filter(l=>l.TPCHORD_PCHCD==a);r.value=[],o.length>0&&(i.value.TRCV_SUPCD=o[0].TPCHORD_SUPCD,o[0].det.map(l=>{r.value.push({item_code:l.TPCHORDDETA_ITMCD,quantity:l.TPCHORDDETA_ITMQT,unit_price:l.TPCHORDDETA_ITMPRC_PER})}))},X=a=>{let o=C.value.filter(l=>l.TDLVORD_DLVCD==a);r.value=[],o.length>0&&(i.value.TRCV_SUPCD=o[0].TDLVORD_CUSCD,o[0].dlvacc.map(l=>{r.value.push({item_code:l.TDLVACCESSORY_ITMCD,quantity:l.TDLVACCESSORY_ITMQT,unit_price:0})}),o[0].dlvdet.map(l=>{r.value.push({item_code:l.TDLVORDDETA_ITMCD,quantity:l.TDLVORDDETA_ITMQT,unit_price:l.TDLVORDDETA_PRC})}))},Z=()=>{y.dialog({title:"Confirmation",message:"Are you sure want to save this Incoming ?",cancel:!0,persistent:!0}).onOk(async()=>{n.value=!0,await T.post("receive/saveAPI",{...i.value,det:r.value}).then(a=>{n.value=!1,y.notify({color:"green",message:`${a.data.msg}`}),u()}).catch(()=>{n.value=!1})})},{dialogRef:Q,onDialogHide:ee,onDialogOK:u,onDialogCancel:s}=me();return(a,o)=>(v(),M(ce,{ref_key:"dialogRef",ref:Q,onHide:j(ee),"transition-show":"slide-up","transition-hide":"slide-down","full-width":"",persistent:""},{default:t(()=>[e(ie,{class:"q-dialog-plugin bg-white q-pa-sm"},{default:t(()=>[e(L,null,{default:t(()=>[Se]),_:1}),e(L,{class:"q-pa-sm"},{default:t(()=>[d("fieldset",ye,[Oe,e(Ce,{showing:n.value,dark:""},{default:t(()=>[e(ve,{size:"50px",color:"primary"})]),_:1},8,["showing"]),d("div",Ue,[d("div",he,[e(U,{label:"Code",readonly:"",dense:"",filled:"",modelValue:i.value.TRCV_RCVCD,"onUpdate:modelValue":o[0]||(o[0]=l=>i.value.TRCV_RCVCD=l)},null,8,["modelValue"])]),d("div",Ie,[e(U,{filled:"",modelValue:i.value.TRCV_ISSUDT,"onUpdate:modelValue":o[2]||(o[2]=l=>i.value.TRCV_ISSUDT=l),dense:"",label:"Receive Date"},{append:t(()=>[e(ae,{name:"event",class:"cursor-pointer"},{default:t(()=>[e(_e,{cover:"","transition-show":"scale","transition-hide":"scale"},{default:t(()=>[e(Ve,{modelValue:i.value.TRCV_ISSUDT,"onUpdate:modelValue":o[1]||(o[1]=l=>i.value.TRCV_ISSUDT=l),mask:"YYYY-MM-DD"},{default:t(()=>[d("div",Pe,[x(e(R,{label:"Close",color:"primary",flat:""},null,512),[[fe]])])]),_:1},8,["modelValue"])]),_:1})]),_:1})]),_:1},8,["modelValue"])])]),d("div",we,[V.value==1?(v(),S("div",Me,[e(h,{dense:"",filled:"",label:"Supplier Name",modelValue:i.value.TRCV_SUPCD,"onUpdate:modelValue":o[3]||(o[3]=l=>i.value.TRCV_SUPCD=l),"use-input":"","input-debounce":"500",options:N.value,onFilter:o[4]||(o[4]=(l,_,f)=>c(l,_,f,"supp")),behavior:"dialog","option-label":"MSUP_SUPNM","option-value":"MSUP_SUPCD","emit-value":"","map-options":"",loading:n.value,disable:i.value.TRCV_RCVCD!==""||V.value==1},null,8,["modelValue","options","loading","disable"])])):(v(),S("div",Ne,[e(h,{dense:"",filled:"",label:"Customer Name",modelValue:i.value.TRCV_SUPCD,"onUpdate:modelValue":o[5]||(o[5]=l=>i.value.TRCV_SUPCD=l),"use-input":"","input-debounce":"500",options:I.value,onFilter:o[6]||(o[6]=(l,_,f)=>c(l,_,f,"cust")),behavior:"dialog","option-label":"MCUS_CUSNM","option-value":"MCUS_CUSCD","emit-value":"","map-options":"",loading:n.value,disable:i.value.TRCV_RCVCD!==""||V.value==1},null,8,["modelValue","options","loading","disable"])])),V.value==1?(v(),S("div",ke,[e(h,{dense:"",filled:"",label:"PO Number",modelValue:i.value.TRCV_REFFNO,"onUpdate:modelValue":[o[7]||(o[7]=l=>i.value.TRCV_REFFNO=l),o[9]||(o[9]=l=>W(l))],"use-input":"","input-debounce":"500",options:P.value,onFilter:o[8]||(o[8]=(l,_,f)=>c(l,_,f,"po")),behavior:"dialog","option-label":"PO_CUSTDESC","option-value":"TPCHORD_PCHCD","emit-value":"","map-options":"",loading:n.value,disable:i.value.TRCV_RCVCD!==""},null,8,["modelValue","options","loading","disable"])])):(v(),S("div",Fe,[e(h,{dense:"",filled:"",label:"JAT Invoice No",modelValue:i.value.TRCV_REFFNO,"onUpdate:modelValue":[o[10]||(o[10]=l=>i.value.TRCV_REFFNO=l),o[12]||(o[12]=l=>X(l))],"use-input":"","input-debounce":"500",options:C.value,onFilter:o[11]||(o[11]=(l,_,f)=>c(l,_,f,"inv")),behavior:"dialog","option-label":"LABEL","option-value":"TDLVORD_DLVCD","emit-value":"","map-options":"",loading:n.value,disable:i.value.TRCV_RCVCD!==""},null,8,["modelValue","options","loading","disable"])]))]),d("div",Ee,[d("div",qe,[e(U,{label:"Doc Supplier No",dense:"",filled:"",modelValue:i.value.TRCV_DOCNO,"onUpdate:modelValue":o[13]||(o[13]=l=>i.value.TRCV_DOCNO=l)},null,8,["modelValue"])])])]),d("div",$e,[d("div",Ae,[e(De,{modelValue:V.value,"onUpdate:modelValue":[o[14]||(o[14]=l=>V.value=l),o[15]||(o[15]=l=>D())],spread:"","no-caps":"","toggle-color":"purple",color:"white","text-color":"black",options:[{label:"From PO",value:1},{label:"Return",value:2}],disable:i.value.TRCV_RCVCD!==""},null,8,["modelValue","disable"])])]),d("fieldset",He,[Qe,d("div",Le,[d("div",xe,[e(R,{flat:"",icon:"add",color:"blue",label:"Add Lines",onClick:G,loading:n.value},null,8,["loading"])])]),e(pe,{bordered:"",dense:""},{default:t(()=>[r.value.length>0?(v(!0),S(B,{key:0},Y(r.value,(l,_)=>(v(),M(J,{key:_,class:"q-my-sm",dense:"",loading:n.value},{default:t(()=>[e(O,{avatar:""},{default:t(()=>[e(de,{"text-color":"blue"},{default:t(()=>[b(E(_+1),1)]),_:2},1024)]),_:2},1024),e(O,null,{default:t(()=>[e(w,null,{default:t(()=>[e(h,{dense:"",filled:"",label:"Item Code",modelValue:l.item_code,"onUpdate:modelValue":f=>l.item_code=f,"use-input":"","input-debounce":"500",options:k.value,onFilter:o[16]||(o[16]=(f,ge,Te)=>c(f,ge,Te,"item")),behavior:"dialog","option-label":"MITM_ITMNMREAL","option-value":"MITM_ITMNM","emit-value":"","map-options":"",loading:n.value,disable:l.IS_CONFIRMED==1||i.value.TRCV_RCVCD!==""},null,8,["modelValue","onUpdate:modelValue","options","loading","disable"])]),_:2},1024)]),_:2},1024),e(O,null,{default:t(()=>[e(w,null,{default:t(()=>[e(U,{dense:"",label:"Qty",filled:"",modelValue:l.quantity,"onUpdate:modelValue":f=>l.quantity=f,disable:l.IS_CONFIRMED==1},null,8,["modelValue","onUpdate:modelValue","disable"])]),_:2},1024)]),_:2},1024),e(O,null,{default:t(()=>[e(w,null,{default:t(()=>[e(U,{dense:"",label:"Price",filled:"",modelValue:l.unit_price,"onUpdate:modelValue":f=>l.unit_price=f,disable:l.IS_CONFIRMED==1},null,8,["modelValue","onUpdate:modelValue","disable"])]),_:2},1024)]),_:2},1024),e(O,{side:""},{default:t(()=>[e(R,{icon:"delete",color:"red",flat:"",onClick:f=>z(_),disable:l.IS_CONFIRMED==1},{default:t(()=>[e(F,null,{default:t(()=>[b(E(l.IS_CONFIRMED==1?"Cannot delete, already confirmed line":"Delete line"),1)]),_:2},1024)]),_:2},1032,["onClick","disable"])]),_:2},1024)]),_:2},1032,["loading"]))),128)):x((v(),M(J,{key:1,class:"q-my-sm",clickable:""},{default:t(()=>[e(O,null,{default:t(()=>[e(w,null,{default:t(()=>[b(" Choose sales order first to access item list ")]),_:1})]),_:1})]),_:1})),[[ue]])]),_:1})])]),_:1}),e(re,{align:"right"},{default:t(()=>[e(R,{label:"OK",color:"primary",onClick:o[17]||(o[17]=l=>Z()),disable:a.stateSubmit,loading:n.value},null,8,["disable","loading"]),e(R,{flat:"",label:"Cancel",color:"red",onClick:j(s)},null,8,["onClick"])]),_:1})]),_:1})]),_:1},8,["onHide"]))}},Ye=d("div",{class:"text-h6"},"Confirm Incoming",-1),je={style:{border:"1px black solid","border-radius":"10px"}},Je=d("legend",{style:{"margin-left":"1em",padding:"0.2em 0.8em"}},[d("b",null,"Header")],-1),Ke={class:"row q-col-gutter-md"},ze={class:"col-12 col-sm-6"},Ge={class:"col-12 col-sm-6"},We={class:"row items-center justify-end"},Xe={class:"row q-col-gutter-md q-pt-md"},Ze={key:0,class:"col-12 col-sm-6"},el={key:1,class:"col-12 col-sm-6"},ll={key:2,class:"col-12 col-sm-6"},al={key:3,class:"col-12 col-sm-6"},ol={class:"row q-col-gutter-md q-pt-md"},tl={class:"col"},nl={class:"row q-py-md"},sl={class:"col"},il={style:{border:"1px black solid","border-radius":"10px",height:"35vh",overflow:"auto"}},dl=d("legend",{style:{"margin-left":"1em",padding:"0.2em 0.8em"}},[d("b",null,"List Of Items")],-1),ul={__name:"incomingConfirmDet",props:{dataHeader:Array},setup(A){const y=oe(),p=A,i=m({TRCV_RCVCD:"",TRCV_SUPCD:"",TRCV_ISSUDT:"",TRCV_REFFNO:"",TRCV_DOCNO:""}),V=m(1),r=m([]),n=m(!1),N=m([]),I=m([]),P=m([]),k=m([]),C=m([]);le(async()=>{await g(""),await q(""),await $(""),p.dataHeader&&Object.values(p.dataHeader).length>0&&(i.value={TRCV_RCVCD:p.dataHeader.TRCV_RCVCD,TRCV_SUPCD:p.dataHeader.MSUP_SUPCD,TRCV_ISSUDT:p.dataHeader.TRCV_ISSUDT,TRCV_REFFNO:p.dataHeader.TRCV_REFFNO,TRCV_DOCNO:p.dataHeader.TRCV_DOCNO},V.value=p.dataHeader.RCV_STATE,p.dataHeader.det.map(u=>{r.value.push({item_code:u.item_code,quantity:u.quantity,unit_price:u.unit_price})}))});const D=()=>{i.value={TRCV_RCVCD:"",TRCV_SUPCD:"",TRCV_ISSUDT:"",TRCV_REFFNO:"",TRCV_DOCNO:""},r.value=[]},c=(u,s,a,o)=>{s(async()=>{o==="supp"&&await q(u),o==="cust"&&await $(u),o==="item"&&await g(u),o==="po"&&await K(u),o==="inv"&&await z(u)})},g=async u=>{n.value=!0,await T.post("item/searchAPI",{searchValue:u,isITMCD:1}).then(s=>{n.value=!1,k.value=s.data.data}).catch(()=>{n.value=!1})},q=async(u,s="MSUP_SUPNM")=>{n.value=!0,await T.post("supplier/searchAPI",{searchValue:u,searchCol:s}).then(a=>{n.value=!1,N.value=a.data.data}).catch(()=>{n.value=!1})},$=async(u,s="MCUS_CUSNM")=>{n.value=!0,await T.post("customer/searchAPI",{searchValue:u,searchCol:s}).then(a=>{n.value=!1,I.value=a.data.data}).catch(()=>{n.value=!1})},K=async(u,s="TPCHORD_PCHCD")=>{n.value=!0,await T.post("purchase-order/searchApprovedPO",{searchValue:u,searchCol:s}).then(a=>{n.value=!1,P.value=a.data.data}).catch(()=>{n.value=!1})},z=async(u,s="TDLVORD_DLVCD")=>{n.value=!0,await T.post("invoices/search",{searchBy:s,searchValue:u}).then(a=>{n.value=!1,C.value=a.data.data}).catch(a=>{n.value=!1})},G=u=>{y.dialog({dark:!0,title:"Confirm Incoming",message:`Put qty to be confirmed, Total qty is (${r.value[u].quantity})`,prompt:{model:r.value[u].quantity,type:"number",min:1,max:r.value[u].quantity,isValid:s=>s<=r.value[u].quantity},cancel:!0,persistent:!0}).onOk(s=>{r.value[u].IS_CONFIRMED=1,r.value[u].CONFIRMED_QTY=s})},H=async(u=!1)=>{u?(n.value=!0,await T.post("receive/confirmIncoming",{...i.value,det:r.value}).then(s=>{n.value=!1,y.notify({color:"green",message:`${s.data.msg}`}),Q()}).catch(()=>{n.value=!1})):y.dialog({title:"Confirmation",message:"Are you sure want to confirm all this item ?",cancel:!0,persistent:!0}).onOk(async()=>{n.value=!0,await T.post("receive/confirmIncoming",{...i.value,det:r.value}).then(s=>{n.value=!1,y.notify({color:"green",message:`${s.data.msg}`}),Q()}).catch(()=>{n.value=!1})})},W=()=>{y.dialog({title:"Confirmation",message:"Are you sure want to confirm all incoming item and save data ?",cancel:!0,persistent:!0}).onOk(async()=>{r.value.map(u=>{u.IS_CONFIRMED=1}),H(!0)})},{dialogRef:X,onDialogHide:Z,onDialogOK:Q,onDialogCancel:ee}=me();return(u,s)=>(v(),M(ce,{ref_key:"dialogRef",ref:X,onHide:j(Z),"transition-show":"slide-up","transition-hide":"slide-down","full-width":"",persistent:""},{default:t(()=>[e(ie,{class:"q-dialog-plugin bg-white q-pa-sm"},{default:t(()=>[e(L,null,{default:t(()=>[Ye]),_:1}),e(L,{class:"q-pa-sm"},{default:t(()=>[d("fieldset",je,[Je,e(Ce,{showing:n.value,dark:""},{default:t(()=>[e(ve,{size:"50px",color:"primary"})]),_:1},8,["showing"]),d("div",Ke,[d("div",ze,[e(U,{label:"Code",readonly:"",dense:"",filled:"",modelValue:i.value.TRCV_RCVCD,"onUpdate:modelValue":s[0]||(s[0]=a=>i.value.TRCV_RCVCD=a)},null,8,["modelValue"])]),d("div",Ge,[e(U,{filled:"",modelValue:i.value.TRCV_ISSUDT,"onUpdate:modelValue":s[2]||(s[2]=a=>i.value.TRCV_ISSUDT=a),dense:"",label:"Receive Date",readonly:""},{append:t(()=>[e(ae,{name:"event",class:"cursor-pointer"},{default:t(()=>[e(_e,{cover:"","transition-show":"scale","transition-hide":"scale"},{default:t(()=>[e(Ve,{modelValue:i.value.TRCV_ISSUDT,"onUpdate:modelValue":s[1]||(s[1]=a=>i.value.TRCV_ISSUDT=a),mask:"YYYY-MM-DD"},{default:t(()=>[d("div",We,[x(e(R,{label:"Close",color:"primary",flat:""},null,512),[[fe]])])]),_:1},8,["modelValue"])]),_:1})]),_:1})]),_:1},8,["modelValue"])])]),d("div",Xe,[V.value==1?(v(),S("div",Ze,[e(h,{dense:"",filled:"",label:"Supplier Name",modelValue:i.value.TRCV_SUPCD,"onUpdate:modelValue":s[3]||(s[3]=a=>i.value.TRCV_SUPCD=a),"use-input":"","input-debounce":"500",options:N.value,onFilter:s[4]||(s[4]=(a,o,l)=>c(a,o,l,"supp")),behavior:"dialog","option-label":"MSUP_SUPNM","option-value":"MSUP_SUPCD","emit-value":"","map-options":"",loading:n.value,readonly:""},null,8,["modelValue","options","loading"])])):(v(),S("div",el,[e(h,{dense:"",filled:"",label:"Customer Name",modelValue:i.value.TRCV_SUPCD,"onUpdate:modelValue":s[5]||(s[5]=a=>i.value.TRCV_SUPCD=a),"use-input":"","input-debounce":"500",options:I.value,onFilter:s[6]||(s[6]=(a,o,l)=>c(a,o,l,"cust")),behavior:"dialog","option-label":"MCUS_CUSNM","option-value":"MCUS_CUSCD","emit-value":"","map-options":"",loading:n.value,readonly:""},null,8,["modelValue","options","loading"])])),V.value==1?(v(),S("div",ll,[e(h,{dense:"",filled:"",label:"PO Number",modelValue:i.value.TRCV_REFFNO,"onUpdate:modelValue":s[7]||(s[7]=a=>i.value.TRCV_REFFNO=a),"use-input":"","input-debounce":"500",options:P.value,onFilter:s[8]||(s[8]=(a,o,l)=>c(a,o,l,"po")),behavior:"dialog","option-label":"PO_CUSTDESC","option-value":"TPCHORD_PCHCD","emit-value":"","map-options":"",loading:n.value,readonly:""},null,8,["modelValue","options","loading"])])):(v(),S("div",al,[e(h,{dense:"",filled:"",label:"JAT Invoice No",modelValue:i.value.TRCV_REFFNO,"onUpdate:modelValue":s[9]||(s[9]=a=>i.value.TRCV_REFFNO=a),"use-input":"","input-debounce":"500",options:C.value,onFilter:s[10]||(s[10]=(a,o,l)=>c(a,o,l,"inv")),behavior:"dialog","option-label":"LABEL","option-value":"TDLVORD_DLVCD","emit-value":"","map-options":"",loading:n.value,readonly:""},null,8,["modelValue","options","loading"])]))]),d("div",ol,[d("div",tl,[e(U,{label:"Doc Supplier No",dense:"",filled:"",modelValue:i.value.TRCV_DOCNO,"onUpdate:modelValue":s[11]||(s[11]=a=>i.value.TRCV_DOCNO=a),readonly:""},null,8,["modelValue"])])])]),d("div",nl,[d("div",sl,[e(De,{modelValue:V.value,"onUpdate:modelValue":[s[12]||(s[12]=a=>V.value=a),s[13]||(s[13]=a=>D())],spread:"","no-caps":"","toggle-color":"purple",color:"white","text-color":"black",options:[{label:"From PO",value:1},{label:"Return",value:2}],readonly:""},null,8,["modelValue"])])]),d("fieldset",il,[dl,e(pe,{bordered:"",dense:""},{default:t(()=>[r.value.length>0?(v(!0),S(B,{key:0},Y(r.value,(a,o)=>(v(),M(J,{key:o,class:"q-my-sm",dense:"",loading:n.value},{default:t(()=>[e(O,{avatar:""},{default:t(()=>[e(de,{"text-color":"blue"},{default:t(()=>[b(E(o+1),1)]),_:2},1024)]),_:2},1024),e(O,null,{default:t(()=>[e(w,null,{default:t(()=>[e(h,{dense:"",filled:"",label:"Item Code",modelValue:a.item_code,"onUpdate:modelValue":l=>a.item_code=l,"use-input":"","input-debounce":"500",options:k.value,onFilter:s[14]||(s[14]=(l,_,f)=>c(l,_,f,"item")),behavior:"dialog","option-label":"MITM_ITMNMREAL","option-value":"MITM_ITMNM","emit-value":"","map-options":"",loading:n.value,readonly:""},null,8,["modelValue","onUpdate:modelValue","options","loading"])]),_:2},1024)]),_:2},1024),e(O,null,{default:t(()=>[e(w,null,{default:t(()=>[e(U,{dense:"",label:"Qty",filled:"",modelValue:a.quantity,"onUpdate:modelValue":l=>a.quantity=l,readonly:""},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1024)]),_:2},1024),e(O,null,{default:t(()=>[e(w,null,{default:t(()=>[e(U,{dense:"",label:"Price",filled:"",modelValue:a.unit_price,"onUpdate:modelValue":l=>a.unit_price=l,readonly:""},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1024)]),_:2},1024),e(O,{side:""},{default:t(()=>[e(R,{icon:"check",color:a.IS_CONFIRMED==1?"grey":"indigo",flat:"",onClick:l=>G(o),disable:a.IS_CONFIRMED==1},{default:t(()=>[e(F,null,{default:t(()=>[b(E(a.IS_CONFIRMED==1?"Already confirmed":"Not confirmed yet, click to confirm."),1)]),_:2},1024)]),_:2},1032,["color","onClick","disable"])]),_:2},1024)]),_:2},1032,["loading"]))),128)):x((v(),M(J,{key:1,class:"q-my-sm",clickable:""},{default:t(()=>[e(O,null,{default:t(()=>[e(w,null,{default:t(()=>[b(" Choose incoming first to access item list ")]),_:1})]),_:1})]),_:1})),[[ue]])]),_:1})])]),_:1}),e(re,{align:"right"},{default:t(()=>[e(R,{label:"Save",color:"primary",onClick:s[15]||(s[15]=a=>H()),disable:r.value.filter(a=>a.IS_CONFIRMED>0).length>0,loading:n.value},null,8,["disable","loading"]),e(R,{label:"Confirm All",color:"indigo",onClick:s[16]||(s[16]=a=>W()),disable:u.stateSubmit,loading:n.value},null,8,["disable","loading"]),e(R,{flat:"",label:"Cancel",color:"red",onClick:j(ee)},null,8,["onClick"])]),_:1})]),_:1})]),_:1},8,["onHide"]))}},rl={class:"q-pa-md"},cl={class:"row q-pb-md"},ml=d("div",{class:"col"},[d("span",{class:"text-h4"},"Incoming")],-1),pl={class:"col text-right"},Cl={class:"row q-pt-md"},vl={class:"col"},Ul={__name:"incomingIndex",setup(A){const y=oe(),p=m([]),i=m([{name:"TRCV_RCVCD",label:"Receive ID",field:"TRCV_RCVCD",sortable:!0,align:"left"},{name:"MSUP_SUPNM",label:"Supplier Name",field:"MSUP_SUPNM",sortable:!0,align:"left"},{name:"TOT_RCV",label:"Total Qty",field:"TOT_RCV",sortable:!0,align:"left",format:C=>`${C.toLocaleString()}`},{name:"MSUP_CURCD",label:"Currency",field:"MSUP_CURCD",sortable:!0,align:"left"},{name:"TOT_AMT",label:"Total Amount",field:"TOT_AMT",sortable:!0,align:"left",format:C=>`${C.toLocaleString()}`}]),V=m(!1),r=m(""),n=m("");le(()=>{N()});const N=async()=>{V.value=!0,await T.post("receive/searchAPI",{searchBy:r.value,searchValue:n.value}).then(C=>{V.value=!1,p.value=C.data.data}).catch(C=>{V.value=!1})},I=(C=[])=>{y.dialog({component:Be,componentProps:{dataHeader:C}}).onOk(async D=>{getOutgoingData()})},P=(C=[])=>{y.dialog({component:ul,componentProps:{dataHeader:C}}).onOk(async D=>{getOutgoingData()})},k=C=>{};return(C,D)=>(v(),S("div",rl,[d("div",cl,[ml,d("div",pl,[e(R,{icon:"add",color:"blue",onClick:D[0]||(D[0]=c=>I())},{default:t(()=>[e(F,null,{default:t(()=>[b("Create New Delivery")]),_:1})]),_:1})])]),e(Re),d("div",Cl,[d("div",vl,[e(be,{title:"Outgoing List",rows:p.value,columns:i.value,"row-key":"TDLVORD_DLVCD",loading:V.value,dense:"",pagination:{rowsPerPage:20},class:"my-sticky-header-column-table"},{"top-right":t(()=>[e(h,{outlined:"",modelValue:r.value,"onUpdate:modelValue":D[1]||(D[1]=c=>r.value=c),options:C.columns,label:"Search Columns","option-value":"name","option-label":"label","emit-value":"",dense:"","map-options":""},null,8,["modelValue","options"]),e(U,{borderless:"",dense:"",modelValue:n.value,"onUpdate:modelValue":[D[2]||(D[2]=c=>n.value=c),D[3]||(D[3]=c=>C.getOutgoingData())],placeholder:"Search",outlined:"",debounce:"1000"},{append:t(()=>[e(ae,{name:"search"})]),_:1},8,["modelValue"])]),header:t(c=>[e(ne,{props:c},{default:t(()=>[e(te,{"auto-width":""},{default:t(()=>[b("Action")]),_:1}),(v(!0),S(B,null,Y(c.cols,g=>(v(),M(te,{key:g.name,props:c},{default:t(()=>[b(E(g.label),1)]),_:2},1032,["props"]))),128))]),_:2},1032,["props"])]),body:t(c=>[e(ne,{props:c},{default:t(()=>[e(se,{"auto-width":""},{default:t(()=>[e(R,{flat:"",color:"orange",icon:"edit",onClick:g=>I(c.row),dense:"",disable:c.row.TRCV_SUBMITTED_AT},{default:t(()=>[e(F,null,{default:t(()=>[b("Edit Data")]),_:1})]),_:2},1032,["onClick","disable"]),e(R,{flat:"",color:"red",icon:"delete",onClick:g=>k(c.row.id),dense:"",disable:c.row.TRCV_SUBMITTED_AT},{default:t(()=>[e(F,null,{default:t(()=>[b("Delete Data")]),_:1})]),_:2},1032,["onClick","disable"]),e(R,{flat:"",color:"indigo",icon:"check",onClick:g=>P(c.row),dense:""},{default:t(()=>[e(F,null,{default:t(()=>[b("Confirm Data")]),_:1})]),_:2},1032,["onClick"])]),_:2},1024),(v(!0),S(B,null,Y(c.cols,g=>(v(),M(se,{key:g.name,props:c},{default:t(()=>[b(E(g.value),1)]),_:2},1032,["props"]))),128))]),_:2},1032,["props"])]),_:1},8,["rows","columns","loading"])])])]))}};export{Ul as default};
