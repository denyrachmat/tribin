import{Q as E}from"./QTooltip.d60d89d9.js";import{t as m,o as le,C as v,D as M,E as t,F as e,M as se,O as L,J as u,$ as I,at as ae,U as Y,Q as g,R as y,S as x,T as B,V as de,I as b,P as U,W as ue,X as re,Y as j,Z as ce,aM as ge}from"./index.70bc36b0.js";import{e as h,Q as J,a as O,b as N}from"./QSelect.0bfbe308.js";import{u as me,Q as Ce,a as be,b as te}from"./QTable.f36347a7.js";import{Q as ne,a as ie}from"./QTd.333dcf7c.js";import{api_web as R}from"./axios.bf39d10f.js";import{u as oe}from"./format.fdaf787e.js";import{Q as pe,a as ve}from"./QInnerLoading.610b9f35.js";import{Q as _e,a as Ve,C as fe}from"./ClosePopup.27c19365.js";import{Q as Te}from"./QBtnToggle.96357067.js";import"./use-render-cache.3aae9b27.js";import"./date.789cb854.js";import"./QBtnGroup.46377460.js";const ye=u("div",{class:"text-h6"},"Create Incoming",-1),Se={style:{border:"1px black solid","border-radius":"10px"}},Oe=u("legend",{style:{"margin-left":"1em",padding:"0.2em 0.8em"}},[u("b",null,"Header")],-1),Ie={class:"row q-col-gutter-md"},he={class:"col-12 col-sm-6"},Ue={class:"col-12 col-sm-6"},we={class:"row items-center justify-end"},Pe={class:"row q-col-gutter-md q-pt-md"},Ne={key:0,class:"col-12 col-sm-6"},Me={key:1,class:"col-12 col-sm-6"},Fe={key:2,class:"col-12 col-sm-6"},ke={key:3,class:"col-12 col-sm-6"},Ee={class:"row q-col-gutter-md q-pt-md"},qe={class:"col"},Qe={class:"row q-py-md"},$e={class:"col"},Ae={style:{border:"1px black solid","border-radius":"10px",height:"35vh",overflow:"auto"}},He=u("legend",{style:{"margin-left":"1em",padding:"0.2em 0.8em"}},[u("b",null,"List Of Items")],-1),Le={class:"row q-pb-sm"},Ye={class:"col text-right"},xe={__name:"incomingCreate",props:{dataHeader:Array},setup($){const S=oe(),C=$,s=m({TRCV_RCVCD:"",TRCV_SUPCD:"",TRCV_ISSUDT:"",TRCV_REFFNO:"",TRCV_DOCNO:""}),V=m(1),c=m([]),n=m(!1),F=m([]),w=m([]),P=m([]),k=m([]),p=m([]);le(async()=>{await D(""),await q(""),await Q(""),C.dataHeader&&Object.values(C.dataHeader).length>0&&(s.value={TRCV_RCVCD:C.dataHeader.TRCV_RCVCD,TRCV_SUPCD:C.dataHeader.MSUP_SUPCD,TRCV_ISSUDT:C.dataHeader.TRCV_ISSUDT,TRCV_REFFNO:C.dataHeader.TRCV_REFFNO,TRCV_DOCNO:C.dataHeader.TRCV_DOCNO},V.value=C.dataHeader.RCV_STATE,C.dataHeader.det.map(a=>{c.value.push({item_code:a.item_code,quantity:a.quantity,unit_price:a.unit_price})}))});const T=()=>{s.value={TRCV_RCVCD:"",TRCV_SUPCD:"",TRCV_ISSUDT:"",TRCV_REFFNO:"",TRCV_DOCNO:""},c.value=[]},d=(a,o,l,_)=>{o(async()=>{_==="supp"&&await q(a),_==="cust"&&await Q(a),_==="item"&&await D(a),_==="po"&&await K(a),_==="inv"&&await A(a)})},D=async a=>{n.value=!0,await R.post("item/searchAPI",{searchValue:a,isITMCD:1}).then(o=>{n.value=!1,k.value=o.data.data}).catch(()=>{n.value=!1})},q=async(a,o="MSUP_SUPNM")=>{n.value=!0,await R.post("supplier/searchAPI",{searchValue:a,searchCol:o}).then(l=>{n.value=!1,F.value=l.data.data}).catch(()=>{n.value=!1})},Q=async(a,o="MCUS_CUSNM")=>{n.value=!0,await R.post("customer/searchAPI",{searchValue:a,searchCol:o}).then(l=>{n.value=!1,w.value=l.data.data}).catch(()=>{n.value=!1})},K=async(a,o="TPCHORD_PCHCD")=>{n.value=!0,await R.post("purchase-order/searchApprovedPO",{searchValue:a,searchCol:o}).then(l=>{n.value=!1,P.value=l.data.data}).catch(()=>{n.value=!1})},z=a=>{S.dialog({title:"Confirmation",message:`Do you want to delete this lines no ${a+1} ?`,cancel:!0,persistent:!0}).onOk(async()=>{c.value.splice(a,1)})},G=()=>{c.value.push({item_code:"",quantity:"",unit_price:""})},A=async(a,o="TDLVORD_DLVCD")=>{n.value=!0,await R.post("invoices/search",{searchBy:o,searchValue:a}).then(l=>{n.value=!1,p.value=l.data.data}).catch(l=>{n.value=!1})},W=a=>{let o=P.value.filter(l=>l.TPCHORD_PCHCD==a);c.value=[],o.length>0&&(s.value.TRCV_SUPCD=o[0].TPCHORD_SUPCD,o[0].det.map(l=>{c.value.push({item_code:l.TPCHORDDETA_ITMCD,quantity:l.TPCHORDDETA_ITMQT,unit_price:l.TPCHORDDETA_ITMPRC_PER})}))},X=a=>{let o=p.value.filter(l=>l.TDLVORD_DLVCD==a);c.value=[],o.length>0&&(s.value.TRCV_SUPCD=o[0].TDLVORD_CUSCD,o[0].dlvacc.map(l=>{c.value.push({item_code:l.TDLVACCESSORY_ITMCD,quantity:l.TDLVACCESSORY_ITMQT,unit_price:0})}),o[0].dlvdet.map(l=>{c.value.push({item_code:l.TDLVORDDETA_ITMCD,quantity:l.TDLVORDDETA_ITMQT,unit_price:l.TDLVORDDETA_PRC})}))},Z=()=>{S.dialog({title:"Confirmation",message:"Are you sure want to save this Incoming ?",cancel:!0,persistent:!0}).onOk(async()=>{n.value=!0,await R.post("receive/saveAPI",{...s.value,det:c.value}).then(a=>{n.value=!1,S.notify({color:"green",message:`${a.data.msg}`}),r()}).catch(()=>{n.value=!1})})},{dialogRef:H,onDialogHide:ee,onDialogOK:r,onDialogCancel:i}=me();return(a,o)=>(v(),M(ce,{ref_key:"dialogRef",ref:H,onHide:j(ee),"transition-show":"slide-up","transition-hide":"slide-down","full-width":"",persistent:""},{default:t(()=>[e(se,{class:"q-dialog-plugin bg-white q-pa-sm"},{default:t(()=>[e(L,null,{default:t(()=>[ye]),_:1}),e(L,{class:"q-pa-sm"},{default:t(()=>[u("fieldset",Se,[Oe,e(pe,{showing:n.value,dark:""},{default:t(()=>[e(ve,{size:"50px",color:"primary"})]),_:1},8,["showing"]),u("div",Ie,[u("div",he,[e(I,{label:"Code",readonly:"",dense:"",filled:"",modelValue:s.value.TRCV_RCVCD,"onUpdate:modelValue":o[0]||(o[0]=l=>s.value.TRCV_RCVCD=l)},null,8,["modelValue"])]),u("div",Ue,[e(I,{filled:"",modelValue:s.value.TRCV_ISSUDT,"onUpdate:modelValue":o[2]||(o[2]=l=>s.value.TRCV_ISSUDT=l),dense:"",label:"Receive Date"},{append:t(()=>[e(ae,{name:"event",class:"cursor-pointer"},{default:t(()=>[e(_e,{cover:"","transition-show":"scale","transition-hide":"scale"},{default:t(()=>[e(Ve,{modelValue:s.value.TRCV_ISSUDT,"onUpdate:modelValue":o[1]||(o[1]=l=>s.value.TRCV_ISSUDT=l),mask:"YYYY-MM-DD"},{default:t(()=>[u("div",we,[Y(e(g,{label:"Close",color:"primary",flat:""},null,512),[[fe]])])]),_:1},8,["modelValue"])]),_:1})]),_:1})]),_:1},8,["modelValue"])])]),u("div",Pe,[V.value==1?(v(),y("div",Ne,[e(h,{dense:"",filled:"",label:"Supplier Name",modelValue:s.value.TRCV_SUPCD,"onUpdate:modelValue":o[3]||(o[3]=l=>s.value.TRCV_SUPCD=l),"use-input":"","input-debounce":"500",options:F.value,onFilter:o[4]||(o[4]=(l,_,f)=>d(l,_,f,"supp")),behavior:"dialog","option-label":"MSUP_SUPNM","option-value":"MSUP_SUPCD","emit-value":"","map-options":"",loading:n.value,disable:s.value.TRCV_RCVCD!==""||V.value==1},null,8,["modelValue","options","loading","disable"])])):(v(),y("div",Me,[e(h,{dense:"",filled:"",label:"Customer Name",modelValue:s.value.TRCV_SUPCD,"onUpdate:modelValue":o[5]||(o[5]=l=>s.value.TRCV_SUPCD=l),"use-input":"","input-debounce":"500",options:w.value,onFilter:o[6]||(o[6]=(l,_,f)=>d(l,_,f,"cust")),behavior:"dialog","option-label":"MCUS_CUSNM","option-value":"MCUS_CUSCD","emit-value":"","map-options":"",loading:n.value,disable:s.value.TRCV_RCVCD!==""||V.value==1},null,8,["modelValue","options","loading","disable"])])),V.value==1?(v(),y("div",Fe,[e(h,{dense:"",filled:"",label:"PO Number",modelValue:s.value.TRCV_REFFNO,"onUpdate:modelValue":[o[7]||(o[7]=l=>s.value.TRCV_REFFNO=l),o[9]||(o[9]=l=>W(l))],"use-input":"","input-debounce":"500",options:P.value,onFilter:o[8]||(o[8]=(l,_,f)=>d(l,_,f,"po")),behavior:"dialog","option-label":"PO_CUSTDESC","option-value":"TPCHORD_PCHCD","emit-value":"","map-options":"",loading:n.value,disable:s.value.TRCV_RCVCD!==""},null,8,["modelValue","options","loading","disable"])])):(v(),y("div",ke,[e(h,{dense:"",filled:"",label:"JAT Invoice No",modelValue:s.value.TRCV_REFFNO,"onUpdate:modelValue":[o[10]||(o[10]=l=>s.value.TRCV_REFFNO=l),o[12]||(o[12]=l=>X(l))],"use-input":"","input-debounce":"500",options:p.value,onFilter:o[11]||(o[11]=(l,_,f)=>d(l,_,f,"inv")),behavior:"dialog","option-label":"LABEL","option-value":"TDLVORD_DLVCD","emit-value":"","map-options":"",loading:n.value,disable:s.value.TRCV_RCVCD!==""},null,8,["modelValue","options","loading","disable"])]))]),u("div",Ee,[u("div",qe,[e(I,{label:"Doc Supplier No",dense:"",filled:"",modelValue:s.value.TRCV_DOCNO,"onUpdate:modelValue":o[13]||(o[13]=l=>s.value.TRCV_DOCNO=l)},null,8,["modelValue"])])])]),u("div",Qe,[u("div",$e,[e(Te,{modelValue:V.value,"onUpdate:modelValue":[o[14]||(o[14]=l=>V.value=l),o[15]||(o[15]=l=>T())],spread:"","no-caps":"","toggle-color":"purple",color:"white","text-color":"black",options:[{label:"From PO",value:1},{label:"Return",value:2}],disable:s.value.TRCV_RCVCD!==""},null,8,["modelValue","disable"])])]),u("fieldset",Ae,[He,u("div",Le,[u("div",Ye,[e(g,{flat:"",icon:"add",color:"blue",label:"Add Lines",onClick:G,loading:n.value},null,8,["loading"])])]),e(Ce,{bordered:"",dense:""},{default:t(()=>[c.value.length>0?(v(!0),y(x,{key:0},B(c.value,(l,_)=>(v(),M(J,{key:_,class:"q-my-sm",dense:"",loading:n.value},{default:t(()=>[e(O,{avatar:""},{default:t(()=>[e(de,{"text-color":"blue"},{default:t(()=>[b(U(_+1),1)]),_:2},1024)]),_:2},1024),e(O,null,{default:t(()=>[e(N,null,{default:t(()=>[e(h,{dense:"",filled:"",label:"Item Code",modelValue:l.item_code,"onUpdate:modelValue":f=>l.item_code=f,"use-input":"","input-debounce":"500",options:k.value,onFilter:o[16]||(o[16]=(f,De,Re)=>d(f,De,Re,"item")),behavior:"dialog","option-label":"MITM_ITMNMREAL","option-value":"MITM_ITMNM","emit-value":"","map-options":"",loading:n.value,disable:l.IS_CONFIRMED==1||s.value.TRCV_RCVCD!==""},null,8,["modelValue","onUpdate:modelValue","options","loading","disable"])]),_:2},1024)]),_:2},1024),e(O,null,{default:t(()=>[e(N,null,{default:t(()=>[e(I,{dense:"",label:"Qty",filled:"",modelValue:l.quantity,"onUpdate:modelValue":f=>l.quantity=f,disable:l.IS_CONFIRMED==1},null,8,["modelValue","onUpdate:modelValue","disable"])]),_:2},1024)]),_:2},1024),e(O,null,{default:t(()=>[e(N,null,{default:t(()=>[e(I,{dense:"",label:"Price",filled:"",modelValue:l.unit_price,"onUpdate:modelValue":f=>l.unit_price=f,disable:l.IS_CONFIRMED==1},null,8,["modelValue","onUpdate:modelValue","disable"])]),_:2},1024)]),_:2},1024),e(O,{side:""},{default:t(()=>[e(g,{icon:"delete",color:"red",flat:"",onClick:f=>z(_),disable:l.IS_CONFIRMED==1},{default:t(()=>[e(E,null,{default:t(()=>[b(U(l.IS_CONFIRMED==1?"Cannot delete, already confirmed line":"Delete line"),1)]),_:2},1024)]),_:2},1032,["onClick","disable"])]),_:2},1024)]),_:2},1032,["loading"]))),128)):Y((v(),M(J,{key:1,class:"q-my-sm",clickable:""},{default:t(()=>[e(O,null,{default:t(()=>[e(N,null,{default:t(()=>[b(" Choose sales order first to access item list ")]),_:1})]),_:1})]),_:1})),[[ue]])]),_:1})])]),_:1}),e(re,{align:"right"},{default:t(()=>[e(g,{label:"OK",color:"primary",onClick:o[17]||(o[17]=l=>Z()),disable:a.stateSubmit,loading:n.value},null,8,["disable","loading"]),e(g,{flat:"",label:"Cancel",color:"red",onClick:j(i)},null,8,["onClick"])]),_:1})]),_:1})]),_:1},8,["onHide"]))}},Be=u("div",{class:"text-h6"},"Confirm Incoming",-1),je={style:{border:"1px black solid","border-radius":"10px"}},Je=u("legend",{style:{"margin-left":"1em",padding:"0.2em 0.8em"}},[u("b",null,"Header")],-1),Ke={class:"row q-col-gutter-md"},ze={class:"col-12 col-sm-6"},Ge={class:"col-12 col-sm-6"},We={class:"row items-center justify-end"},Xe={class:"row q-col-gutter-md q-pt-md"},Ze={key:0,class:"col-12 col-sm-6"},el={key:1,class:"col-12 col-sm-6"},ll={key:2,class:"col-12 col-sm-6"},al={key:3,class:"col-12 col-sm-6"},ol={class:"row q-col-gutter-md q-pt-md"},tl={class:"col"},nl={class:"row q-py-md"},il={class:"col"},sl={style:{border:"1px black solid","border-radius":"10px",height:"35vh",overflow:"auto"}},dl=u("legend",{style:{"margin-left":"1em",padding:"0.2em 0.8em"}},[u("b",null,"List Of Items")],-1),ul={__name:"incomingConfirmDet",props:{dataHeader:Array},setup($){const S=oe(),C=$,s=m({TRCV_RCVCD:"",TRCV_SUPCD:"",TRCV_ISSUDT:"",TRCV_REFFNO:"",TRCV_DOCNO:""}),V=m(1),c=m([]),n=m(!1),F=m([]),w=m([]),P=m([]),k=m([]),p=m([]);le(async()=>{await D(""),await q(""),await Q(""),C.dataHeader&&Object.values(C.dataHeader).length>0&&(s.value={TRCV_RCVCD:C.dataHeader.TRCV_RCVCD,TRCV_SUPCD:C.dataHeader.MSUP_SUPCD,TRCV_ISSUDT:C.dataHeader.TRCV_ISSUDT,TRCV_REFFNO:C.dataHeader.TRCV_REFFNO,TRCV_DOCNO:C.dataHeader.TRCV_DOCNO},V.value=C.dataHeader.RCV_STATE,C.dataHeader.det.map(r=>{c.value.push({id:r.id,item_code:r.item_code,quantity:r.quantity,unit_price:r.unit_price})}))});const T=()=>{s.value={TRCV_RCVCD:"",TRCV_SUPCD:"",TRCV_ISSUDT:"",TRCV_REFFNO:"",TRCV_DOCNO:""},c.value=[]},d=(r,i,a,o)=>{i(async()=>{o==="supp"&&await q(r),o==="cust"&&await Q(r),o==="item"&&await D(r),o==="po"&&await K(r),o==="inv"&&await z(r)})},D=async r=>{n.value=!0,await R.post("item/searchAPI",{searchValue:r,isITMCD:1}).then(i=>{n.value=!1,k.value=i.data.data}).catch(()=>{n.value=!1})},q=async(r,i="MSUP_SUPNM")=>{n.value=!0,await R.post("supplier/searchAPI",{searchValue:r,searchCol:i}).then(a=>{n.value=!1,F.value=a.data.data}).catch(()=>{n.value=!1})},Q=async(r,i="MCUS_CUSNM")=>{n.value=!0,await R.post("customer/searchAPI",{searchValue:r,searchCol:i}).then(a=>{n.value=!1,w.value=a.data.data}).catch(()=>{n.value=!1})},K=async(r,i="TPCHORD_PCHCD")=>{n.value=!0,await R.post("purchase-order/searchApprovedPO",{searchValue:r,searchCol:i}).then(a=>{n.value=!1,P.value=a.data.data}).catch(()=>{n.value=!1})},z=async(r,i="TDLVORD_DLVCD")=>{n.value=!0,await R.post("invoices/search",{searchBy:i,searchValue:r}).then(a=>{n.value=!1,p.value=a.data.data}).catch(a=>{n.value=!1})},G=r=>{S.dialog({dark:!0,title:"Confirm Incoming",message:`Put qty to be confirmed, Total qty is (${c.value[r].quantity})`,prompt:{model:c.value[r].quantity,type:"number",min:1,max:c.value[r].quantity,isValid:i=>i<=c.value[r].quantity},cancel:!0,persistent:!0}).onOk(i=>{c.value[r].IS_CONFIRMED=1,c.value[r].CONFIRMED_QTY=i})},A=async(r=!1)=>{r?(n.value=!0,await R.post("receive/confirmIncoming",{...s.value,det:c.value}).then(i=>{n.value=!1,S.notify({color:"green",message:`${i.data.msg}`}),H()}).catch(()=>{n.value=!1})):S.dialog({title:"Confirmation",message:"Are you sure want to confirm all this item ?",cancel:!0,persistent:!0}).onOk(async()=>{n.value=!0,await R.post("receive/confirmIncoming",{...s.value,det:c.value}).then(i=>{n.value=!1,S.notify({color:"green",message:`${i.data.msg}`}),H()}).catch(()=>{n.value=!1})})},W=()=>{S.dialog({title:"Confirmation",message:"Are you sure want to confirm all incoming item and save data ? This will confirm default qty.",cancel:!0,persistent:!0}).onOk(async()=>{c.value.map(r=>{r.IS_CONFIRMED=1,r.CONFIRMED_QTY=r.quantity}),A(!0)})},{dialogRef:X,onDialogHide:Z,onDialogOK:H,onDialogCancel:ee}=me();return(r,i)=>(v(),M(ce,{ref_key:"dialogRef",ref:X,onHide:j(Z),"transition-show":"slide-up","transition-hide":"slide-down","full-width":"",persistent:""},{default:t(()=>[e(se,{class:"q-dialog-plugin bg-white q-pa-sm"},{default:t(()=>[e(L,null,{default:t(()=>[Be]),_:1}),e(L,{class:"q-pa-sm"},{default:t(()=>[u("fieldset",je,[Je,e(pe,{showing:n.value,dark:""},{default:t(()=>[e(ve,{size:"50px",color:"primary"})]),_:1},8,["showing"]),u("div",Ke,[u("div",ze,[e(I,{label:"Code",readonly:"",dense:"",filled:"",modelValue:s.value.TRCV_RCVCD,"onUpdate:modelValue":i[0]||(i[0]=a=>s.value.TRCV_RCVCD=a)},null,8,["modelValue"])]),u("div",Ge,[e(I,{filled:"",modelValue:s.value.TRCV_ISSUDT,"onUpdate:modelValue":i[2]||(i[2]=a=>s.value.TRCV_ISSUDT=a),dense:"",label:"Receive Date",readonly:""},{append:t(()=>[e(ae,{name:"event",class:"cursor-pointer"},{default:t(()=>[e(_e,{cover:"","transition-show":"scale","transition-hide":"scale"},{default:t(()=>[e(Ve,{modelValue:s.value.TRCV_ISSUDT,"onUpdate:modelValue":i[1]||(i[1]=a=>s.value.TRCV_ISSUDT=a),mask:"YYYY-MM-DD"},{default:t(()=>[u("div",We,[Y(e(g,{label:"Close",color:"primary",flat:""},null,512),[[fe]])])]),_:1},8,["modelValue"])]),_:1})]),_:1})]),_:1},8,["modelValue"])])]),u("div",Xe,[V.value==1?(v(),y("div",Ze,[e(h,{dense:"",filled:"",label:"Supplier Name",modelValue:s.value.TRCV_SUPCD,"onUpdate:modelValue":i[3]||(i[3]=a=>s.value.TRCV_SUPCD=a),"use-input":"","input-debounce":"500",options:F.value,onFilter:i[4]||(i[4]=(a,o,l)=>d(a,o,l,"supp")),behavior:"dialog","option-label":"MSUP_SUPNM","option-value":"MSUP_SUPCD","emit-value":"","map-options":"",loading:n.value,readonly:""},null,8,["modelValue","options","loading"])])):(v(),y("div",el,[e(h,{dense:"",filled:"",label:"Customer Name",modelValue:s.value.TRCV_SUPCD,"onUpdate:modelValue":i[5]||(i[5]=a=>s.value.TRCV_SUPCD=a),"use-input":"","input-debounce":"500",options:w.value,onFilter:i[6]||(i[6]=(a,o,l)=>d(a,o,l,"cust")),behavior:"dialog","option-label":"MCUS_CUSNM","option-value":"MCUS_CUSCD","emit-value":"","map-options":"",loading:n.value,readonly:""},null,8,["modelValue","options","loading"])])),V.value==1?(v(),y("div",ll,[e(h,{dense:"",filled:"",label:"PO Number",modelValue:s.value.TRCV_REFFNO,"onUpdate:modelValue":i[7]||(i[7]=a=>s.value.TRCV_REFFNO=a),"use-input":"","input-debounce":"500",options:P.value,onFilter:i[8]||(i[8]=(a,o,l)=>d(a,o,l,"po")),behavior:"dialog","option-label":"PO_CUSTDESC","option-value":"TPCHORD_PCHCD","emit-value":"","map-options":"",loading:n.value,readonly:""},null,8,["modelValue","options","loading"])])):(v(),y("div",al,[e(h,{dense:"",filled:"",label:"JAT Invoice No",modelValue:s.value.TRCV_REFFNO,"onUpdate:modelValue":i[9]||(i[9]=a=>s.value.TRCV_REFFNO=a),"use-input":"","input-debounce":"500",options:p.value,onFilter:i[10]||(i[10]=(a,o,l)=>d(a,o,l,"inv")),behavior:"dialog","option-label":"LABEL","option-value":"TDLVORD_DLVCD","emit-value":"","map-options":"",loading:n.value,readonly:""},null,8,["modelValue","options","loading"])]))]),u("div",ol,[u("div",tl,[e(I,{label:"Doc Supplier No",dense:"",filled:"",modelValue:s.value.TRCV_DOCNO,"onUpdate:modelValue":i[11]||(i[11]=a=>s.value.TRCV_DOCNO=a),readonly:""},null,8,["modelValue"])])])]),u("div",nl,[u("div",il,[e(Te,{modelValue:V.value,"onUpdate:modelValue":[i[12]||(i[12]=a=>V.value=a),i[13]||(i[13]=a=>T())],spread:"","no-caps":"","toggle-color":"purple",color:"white","text-color":"black",options:[{label:"From PO",value:1},{label:"Return",value:2}],readonly:""},null,8,["modelValue"])])]),u("fieldset",sl,[dl,e(Ce,{bordered:"",dense:""},{default:t(()=>[c.value.length>0?(v(!0),y(x,{key:0},B(c.value,(a,o)=>(v(),M(J,{key:o,class:"q-my-sm",dense:"",loading:n.value},{default:t(()=>[e(O,{avatar:""},{default:t(()=>[e(de,{"text-color":"blue"},{default:t(()=>[b(U(o+1),1)]),_:2},1024)]),_:2},1024),e(O,null,{default:t(()=>[e(N,null,{default:t(()=>[e(h,{dense:"",filled:"",label:"Item Code",modelValue:a.item_code,"onUpdate:modelValue":l=>a.item_code=l,"use-input":"","input-debounce":"500",options:k.value,onFilter:i[14]||(i[14]=(l,_,f)=>d(l,_,f,"item")),behavior:"dialog","option-label":"MITM_ITMNMREAL","option-value":"MITM_ITMNM","emit-value":"","map-options":"",loading:n.value,readonly:""},null,8,["modelValue","onUpdate:modelValue","options","loading"])]),_:2},1024)]),_:2},1024),e(O,null,{default:t(()=>[e(N,null,{default:t(()=>[e(I,{dense:"",label:"Qty",filled:"",modelValue:a.quantity,"onUpdate:modelValue":l=>a.quantity=l,readonly:""},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1024)]),_:2},1024),e(O,null,{default:t(()=>[e(N,null,{default:t(()=>[e(I,{dense:"",label:"Price",filled:"",modelValue:a.unit_price,"onUpdate:modelValue":l=>a.unit_price=l,readonly:""},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1024)]),_:2},1024),e(O,{side:""},{default:t(()=>[e(g,{icon:"check",color:a.IS_CONFIRMED==1?"grey":"indigo",flat:"",onClick:l=>G(o),disable:a.IS_CONFIRMED==1},{default:t(()=>[e(E,null,{default:t(()=>[b(U(a.IS_CONFIRMED==1?"Already confirmed":"Not confirmed yet, click to confirm."),1)]),_:2},1024)]),_:2},1032,["color","onClick","disable"])]),_:2},1024)]),_:2},1032,["loading"]))),128)):Y((v(),M(J,{key:1,class:"q-my-sm",clickable:""},{default:t(()=>[e(O,null,{default:t(()=>[e(N,null,{default:t(()=>[b(" Choose incoming first to access item list ")]),_:1})]),_:1})]),_:1})),[[ue]])]),_:1})])]),_:1}),e(re,{align:"right"},{default:t(()=>[e(g,{label:"Save",color:"primary",onClick:i[15]||(i[15]=a=>A()),disable:c.value.filter(a=>a.IS_CONFIRMED>0).length>0,loading:n.value},null,8,["disable","loading"]),e(g,{label:"Confirm All",color:"indigo",onClick:i[16]||(i[16]=a=>W()),disable:r.stateSubmit,loading:n.value},null,8,["disable","loading"]),e(g,{flat:"",label:"Cancel",color:"red",onClick:j(ee)},null,8,["onClick"])]),_:1})]),_:1})]),_:1},8,["onHide"]))}},rl={class:"q-pa-md"},cl={class:"row q-pb-md"},ml=u("div",{class:"col"},[u("span",{class:"text-h4"},"Incoming")],-1),Cl={class:"col text-right"},pl={class:"row q-pt-md"},vl={class:"col"},Ul={__name:"incomingIndex",setup($){const S=oe(),C=m([]),s=m([{name:"TRCV_RCVCD",label:"Receive ID",field:"TRCV_RCVCD",sortable:!0,align:"left"},{name:"MSUP_SUPNM",label:"Supplier Name",field:"MSUP_SUPNM",sortable:!0,align:"left"},{name:"TOT_RCV",label:"Total Qty",field:"TOT_RCV",sortable:!0,align:"left",format:p=>`${p.toLocaleString()}`},{name:"MSUP_CURCD",label:"Currency",field:"MSUP_CURCD",sortable:!0,align:"left"},{name:"TOT_AMT",label:"Total Amount",field:"TOT_AMT",sortable:!0,align:"left",format:p=>`${p.toLocaleString()}`}]),V=m(!1),c=m(""),n=m("");le(()=>{F()});const F=async()=>{V.value=!0,await R.post("receive/searchAPI",{searchBy:c.value,searchValue:n.value}).then(p=>{V.value=!1,C.value=p.data.data}).catch(p=>{V.value=!1})},w=(p=[])=>{S.dialog({component:xe,componentProps:{dataHeader:p}}).onOk(async T=>{getOutgoingData()})},P=(p=[])=>{S.dialog({component:ul,componentProps:{dataHeader:p}}).onOk(async T=>{getOutgoingData()})},k=p=>{};return(p,T)=>(v(),y("div",rl,[u("div",cl,[ml,u("div",Cl,[e(g,{icon:"add",color:"blue",onClick:T[0]||(T[0]=d=>w())},{default:t(()=>[e(E,null,{default:t(()=>[b("Create New Delivery")]),_:1})]),_:1})])]),e(ge),u("div",pl,[u("div",vl,[e(be,{title:"Outgoing List",rows:C.value,columns:s.value,"row-key":"TDLVORD_DLVCD",loading:V.value,dense:"",pagination:{rowsPerPage:20},class:"my-sticky-header-column-table"},{"top-right":t(()=>[e(h,{outlined:"",modelValue:c.value,"onUpdate:modelValue":T[1]||(T[1]=d=>c.value=d),options:p.columns,label:"Search Columns","option-value":"name","option-label":"label","emit-value":"",dense:"","map-options":""},null,8,["modelValue","options"]),e(I,{borderless:"",dense:"",modelValue:n.value,"onUpdate:modelValue":[T[2]||(T[2]=d=>n.value=d),T[3]||(T[3]=d=>p.getOutgoingData())],placeholder:"Search",outlined:"",debounce:"1000"},{append:t(()=>[e(ae,{name:"search"})]),_:1},8,["modelValue"])]),header:t(d=>[e(ne,{props:d},{default:t(()=>[e(te,{"auto-width":""},{default:t(()=>[b("Action")]),_:1}),(v(!0),y(x,null,B(d.cols,D=>(v(),M(te,{key:D.name,props:d},{default:t(()=>[b(U(D.label),1)]),_:2},1032,["props"]))),128))]),_:2},1032,["props"])]),body:t(d=>[e(ne,{props:d},{default:t(()=>[e(ie,{"auto-width":""},{default:t(()=>[e(g,{flat:"",color:parseInt(d.row.CONFIRMED_QTY)==d.row.TOT_RCV?"grey":"orange",icon:"edit",onClick:D=>w(d.row),dense:"",disable:parseInt(d.row.CONFIRMED_QTY)==d.row.TOT_RCV},{default:t(()=>[e(E,null,{default:t(()=>[b(U(parseInt(d.row.CONFIRMED_QTY)==d.row.TOT_RCV?"All qty already confirmed":"Edit Data"),1)]),_:2},1024)]),_:2},1032,["color","onClick","disable"]),e(g,{flat:"",color:parseInt(d.row.CONFIRMED_QTY)==d.row.TOT_RCV?"grey":"red",icon:"delete",onClick:D=>k(d.row.id),dense:"",disable:parseInt(d.row.CONFIRMED_QTY)==d.row.TOT_RCV},{default:t(()=>[e(E,null,{default:t(()=>[b(U(parseInt(d.row.CONFIRMED_QTY)==d.row.TOT_RCV?"All qty already confirmed":"Delete Data"),1)]),_:2},1024)]),_:2},1032,["color","onClick","disable"]),e(g,{flat:"",color:parseInt(d.row.CONFIRMED_QTY)==d.row.TOT_RCV?"grey":"indigo",icon:"check",onClick:D=>P(d.row),dense:"",disable:parseInt(d.row.CONFIRMED_QTY)==d.row.TOT_RCV},{default:t(()=>[e(E,null,{default:t(()=>[b(U(parseInt(d.row.CONFIRMED_QTY)==d.row.TOT_RCV?"All qty already confirmed":"Confirm Data"),1)]),_:2},1024)]),_:2},1032,["color","onClick","disable"])]),_:2},1024),(v(!0),y(x,null,B(d.cols,D=>(v(),M(ie,{key:D.name,props:d},{default:t(()=>[b(U(D.value),1)]),_:2},1032,["props"]))),128))]),_:2},1032,["props"])]),_:1},8,["rows","columns","loading"])])])]))}};export{Ul as default};
