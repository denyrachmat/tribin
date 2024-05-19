import{o as O,t as k,C as t,D as s,E as e,F as a,M as $,O as Q,J as g,R as v,Q as I,a_ as T,U as C,I as n,W as R,S as H,T as E,V as K,P as f,$ as b,X as J,Y as F,Z as W}from"./index.189217e1.js";import{u as X,a as Z,Q as j,b as S,c as u,d as i,l as z}from"./QTable.c4a738fc.js";import{api_web as G}from"./axios.4c69f5aa.js";const ee={class:"row"},ae=g("div",{class:"col"},[g("div",{class:"text-h6"},"Update Used Item")],-1),le={key:0,class:"col text-right"},te={key:0},oe={key:0},ne={key:0},ie={class:"text-h5 text-bold"},re={__name:"serviceOprItemAdd",props:{mode:String,dataItem:Array},setup(y){const{dialogRef:D,onDialogHide:P,onDialogOK:N,onDialogCancel:h}=X(),M=Z(),o=y;O(async()=>{o.dataItem.listFixDet&&(m.value=o.dataItem.listFixDet,await w())});const V=k([]),m=k([]),_=k(!1),x=()=>{m.value.push({TSRVD_ID:o.dataItem.id,TSRVF_ITMCD:"",TSRVF_PRC:0,TSRVF_QTY:1})},L=(c,d,l,p)=>{d(async()=>{p==="item"&&await w(c)})},w=async c=>{_.value=!0,await G.post("item/searchAPITBL",{searchValue:c}).then(d=>{_.value=!1,V.value=d.data.data}).catch(()=>{_.value=!1})},U=()=>{o.mode==="view"?h():M.dialog({title:"Confirmation",message:"Are you sure want to save this items ?",cancel:!0,persistent:!0}).onOk(async()=>{N(m.value)})},q=c=>{M.dialog({title:"Confirmation",message:`Do you want to delete this lines no ${c+1} ?`,cancel:!0,persistent:!0}).onOk(async()=>{m.value.splice(c,1)})},A=c=>{let d=0;return c.map(l=>{d+=parseInt(l.TSRVF_PRC)*parseInt(l.TSRVF_QTY)}),d.toLocaleString()};return(c,d)=>(t(),s(W,{ref_key:"dialogRef",ref:D,onHide:F(P),"transition-show":"slide-up","transition-hide":"slide-down","full-width":""},{default:e(()=>[a($,{class:"q-dialog-plugin bg-white q-pa-sm"},{default:e(()=>[a(Q,null,{default:e(()=>[g("div",ee,[ae,o.mode!=="view"?(t(),v("div",le,[a(I,{icon:"add",outline:"",color:"blue",onClick:x})])):T("",!0)])]),_:1}),a(Q,{class:"q-pa-sm",style:{"max-height":"50vh"}},{default:e(()=>[a(j,{bordered:""},{default:e(()=>[m.value.length===0?C((t(),s(S,{key:0,class:"q-my-sm",clickable:""},{default:e(()=>[a(u,null,{default:e(()=>[n(" No items added ")]),_:1})]),_:1})),[[R]]):T("",!0),(t(!0),v(H,null,E(m.value,(l,p)=>C((t(),s(S,{key:p,class:"q-my-sm",clickable:""},{default:e(()=>[a(u,{avatar:""},{default:e(()=>[a(K,{color:"primary","text-color":"white"},{default:e(()=>[n(f(p+1),1)]),_:2},1024)]),_:2},1024),a(u,null,{default:e(()=>[a(i,null,{default:e(()=>[o.mode==="view"?(t(),v("div",te,[_.value?(t(),s(i,{key:1},{default:e(()=>[n(" Please wait, loading item description ")]),_:1})):(t(),s(i,{key:0},{default:e(()=>[n(f(l.MITM_ITMNM?l.MITM_ITMNM:V.value.filter(r=>r.MITM_ITMCD==l.TSRVF_ITMCD)[0].MITM_ITMNM),1)]),_:2},1024)),a(i,{caption:""},{default:e(()=>[n(" Item ")]),_:1})])):(t(),s(z,{key:1,dense:"",filled:"",label:"Item Name",modelValue:l.TSRVF_ITMCD,"onUpdate:modelValue":r=>l.TSRVF_ITMCD=r,"use-input":"","input-debounce":"500",options:V.value,onFilter:d[0]||(d[0]=(r,Y,B)=>L(r,Y,B,"item")),behavior:"dialog","option-label":"MITM_ITMNM","option-value":"MITM_ITMCD","emit-value":"","map-options":"",loading:_.value,readonly:o.mode==="view"},null,8,["modelValue","onUpdate:modelValue","options","loading","readonly"]))]),_:2},1024)]),_:2},1024),a(u,null,{default:e(()=>[o.mode==="view"?(t(),v("div",oe,[a(i,null,{default:e(()=>[n(f(l.TSRVF_PRC.toLocaleString()),1)]),_:2},1024),a(i,{caption:""},{default:e(()=>[n(" Price ")]),_:1})])):(t(),s(b,{key:1,label:"Price",modelValue:l.TSRVF_PRC,"onUpdate:modelValue":r=>l.TSRVF_PRC=r,filled:"",dense:"",readonly:o.mode==="view"},null,8,["modelValue","onUpdate:modelValue","readonly"]))]),_:2},1024),a(u,null,{default:e(()=>[o.mode==="view"?(t(),v("div",ne,[a(i,null,{default:e(()=>[n(f(l.TSRVF_QTY.toLocaleString()),1)]),_:2},1024),a(i,{caption:""},{default:e(()=>[n(" Qty ")]),_:1})])):(t(),s(b,{key:1,label:"Qty",modelValue:l.TSRVF_QTY,"onUpdate:modelValue":r=>l.TSRVF_QTY=r,filled:"",dense:"",readonly:o.mode==="view"},null,8,["modelValue","onUpdate:modelValue","readonly"]))]),_:2},1024),o.mode==="view"?(t(),s(u,{key:0},{default:e(()=>[a(i,null,{default:e(()=>[n(" Rp "+f((parseInt(l.TSRVF_PRC)*parseInt(l.TSRVF_QTY)).toLocaleString()),1)]),_:2},1024),a(i,{caption:""},{default:e(()=>[n(" Total Price ")]),_:1})]),_:2},1024)):T("",!0),y.mode!=="view"?(t(),s(u,{key:1,side:""},{default:e(()=>[a(I,{icon:"delete",flat:"",color:"red",onClick:r=>q(p)},null,8,["onClick"])]),_:2},1024)):T("",!0)]),_:2},1024)),[[R]])),128)),y.mode==="view"?C((t(),s(S,{key:1,class:"q-my-sm",clickable:""},{default:e(()=>[a(u),a(u),a(u),a(u,null,{default:e(()=>[a(i,null,{default:e(()=>[g("span",ie," Rp "+f(A(m.value)),1)]),_:1}),a(i,{caption:""},{default:e(()=>[n(" Total Price ")]),_:1})]),_:1})]),_:1})),[[R]]):T("",!0)]),_:1})]),_:1}),a(J,{align:"right"},{default:e(()=>[a(I,{label:"OK",color:"primary",onClick:d[1]||(d[1]=l=>U()),disable:_.value,loading:_.value},null,8,["disable","loading"]),a(I,{flat:"",label:"Cancel",color:"red",onClick:F(h),loading:_.value},null,8,["onClick","loading"])]),_:1})]),_:1})]),_:1},8,["onHide"]))}};export{re as _};
