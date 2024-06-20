import{o as x,t as V,C as o,D as r,E as e,F as a,M as E,O as F,J as S,R as p,Q as y,a_ as v,U as k,I as u,W as M,S as H,T as J,V as W,P as T,$ as D,X,Y as Q,Z}from"./index.4d3df21d.js";import{u as j,a as z,Q as G,b as R,c as _,d as c,l as ee}from"./QTable.1179b6b7.js";import{api_web as ae}from"./axios.459c65cf.js";const le={class:"row"},te=S("div",{class:"col"},[S("div",{class:"text-h6"},"Update Used Item")],-1),oe={key:0,class:"col text-right"},ne={key:0},se={key:0},ie={key:0},de={class:"text-h5 text-bold"},_e={__name:"serviceOprItemAdd",props:{mode:String,dataItem:Array},setup(C){const{dialogRef:b,onDialogHide:P,onDialogOK:N,onDialogCancel:h}=j(),I=z(),d=C;x(async()=>{d.dataItem.listFixDet&&(i.value=d.dataItem.listFixDet,await w())});const g=V([]),i=V([]),f=V(!1),L=()=>{i.value.push({TSRVD_ID:d.dataItem.id,TSRVF_ITMCD:"",TSRVF_PRC:0,TSRVF_QTY:1})},O=(n,t,l,m)=>{t(async()=>{m==="item"&&await w(n)})},w=async n=>{f.value=!0,await ae.post("item/searchAPITBL",{searchValue:n}).then(t=>{f.value=!1,g.value=t.data.data}).catch(()=>{f.value=!1})},U=()=>{d.mode==="view"?h():I.dialog({title:"Confirmation",message:"Are you sure want to save this items ?",cancel:!0,persistent:!0}).onOk(async()=>{N(i.value)})},A=n=>{I.dialog({title:"Confirmation",message:`Do you want to delete this lines no ${n+1} ?`,cancel:!0,persistent:!0}).onOk(async()=>{i.value.splice(n,1)})},Y=n=>{let t=0;return n.map(l=>{t+=parseInt(l.TSRVF_PRC)*parseInt(l.TSRVF_QTY)}),t.toLocaleString()},$=(n,t)=>{const l=g.value.filter(m=>m.MITM_ITMCD===n);l.length>0&&(l[0].STOCK>0?(i.value[t].TSRVF_PRC=l[0].LATEST_PRC,i.value[t].STOCK=l[0].STOCK):(i.value[t].TSRVF_ITMCD="",I.notify({color:"red",message:`Stock item ${n} (${l[0].MITM_ITMNM}) is 0, please check stock status !`})))},q=(n,t)=>{n>i.value[t].STOCK&&(I.notify({color:"red",message:`Stock item ${i.value[t].TSRVF_ITMCD} is 0, please check stock status !`}),i.value[t].TSRVF_QTY=0)};return(n,t)=>(o(),r(Z,{ref_key:"dialogRef",ref:b,onHide:Q(P),"transition-show":"slide-up","transition-hide":"slide-down","full-width":""},{default:e(()=>[a(E,{class:"q-dialog-plugin bg-white q-pa-sm"},{default:e(()=>[a(F,null,{default:e(()=>[S("div",le,[te,d.mode!=="view"?(o(),p("div",oe,[a(y,{icon:"add",outline:"",color:"blue",onClick:L})])):v("",!0)])]),_:1}),a(F,{class:"q-pa-sm",style:{"max-height":"50vh"}},{default:e(()=>[a(G,{bordered:""},{default:e(()=>[i.value.length===0?k((o(),r(R,{key:0,class:"q-my-sm",clickable:""},{default:e(()=>[a(_,null,{default:e(()=>[u(" No items added ")]),_:1})]),_:1})),[[M]]):v("",!0),(o(!0),p(H,null,J(i.value,(l,m)=>k((o(),r(R,{key:m,class:"q-my-sm",clickable:""},{default:e(()=>[a(_,{avatar:""},{default:e(()=>[a(W,{color:"primary","text-color":"white"},{default:e(()=>[u(T(m+1),1)]),_:2},1024)]),_:2},1024),a(_,null,{default:e(()=>[a(c,null,{default:e(()=>[d.mode==="view"?(o(),p("div",ne,[f.value?(o(),r(c,{key:1},{default:e(()=>[u(" Please wait, loading item description ")]),_:1})):(o(),r(c,{key:0},{default:e(()=>[u(T(l.MITM_ITMNM?l.MITM_ITMNM:g.value.filter(s=>s.MITM_ITMCD==l.TSRVF_ITMCD)[0].MITM_ITMNM),1)]),_:2},1024)),a(c,{caption:""},{default:e(()=>[u(" Item ")]),_:1})])):(o(),r(ee,{key:1,dense:"",filled:"",label:"Item Name",modelValue:l.TSRVF_ITMCD,"onUpdate:modelValue":[s=>l.TSRVF_ITMCD=s,s=>$(s,m)],"use-input":"","input-debounce":"500",options:g.value,onFilter:t[0]||(t[0]=(s,B,K)=>O(s,B,K,"item")),behavior:"dialog","option-label":"MITM_ITMNM","option-value":"MITM_ITMCD","emit-value":"","map-options":"",loading:f.value,readonly:d.mode==="view"},null,8,["modelValue","onUpdate:modelValue","options","loading","readonly"]))]),_:2},1024)]),_:2},1024),a(_,null,{default:e(()=>[d.mode==="view"?(o(),p("div",se,[a(c,null,{default:e(()=>[u(T(l.TSRVF_PRC.toLocaleString()),1)]),_:2},1024),a(c,{caption:""},{default:e(()=>[u(" Price ")]),_:1})])):(o(),r(D,{key:1,label:"Price",modelValue:l.TSRVF_PRC,"onUpdate:modelValue":s=>l.TSRVF_PRC=s,filled:"",dense:"",readonly:d.mode==="view"},null,8,["modelValue","onUpdate:modelValue","readonly"]))]),_:2},1024),a(_,null,{default:e(()=>[d.mode==="view"?(o(),p("div",ie,[a(c,null,{default:e(()=>[u(T(l.TSRVF_QTY.toLocaleString()),1)]),_:2},1024),a(c,{caption:""},{default:e(()=>[u(" Qty ")]),_:1})])):(o(),r(D,{key:1,label:"Qty",modelValue:l.TSRVF_QTY,"onUpdate:modelValue":[s=>l.TSRVF_QTY=s,s=>q(s,m)],filled:"",dense:"",readonly:d.mode==="view"},null,8,["modelValue","onUpdate:modelValue","readonly"]))]),_:2},1024),d.mode==="view"?(o(),r(_,{key:0},{default:e(()=>[a(c,null,{default:e(()=>[u(" Rp "+T((parseInt(l.TSRVF_PRC)*parseInt(l.TSRVF_QTY)).toLocaleString()),1)]),_:2},1024),a(c,{caption:""},{default:e(()=>[u(" Total Price ")]),_:1})]),_:2},1024)):v("",!0),C.mode!=="view"?(o(),r(_,{key:1,side:""},{default:e(()=>[a(y,{icon:"delete",flat:"",color:"red",onClick:s=>A(m)},null,8,["onClick"])]),_:2},1024)):v("",!0)]),_:2},1024)),[[M]])),128)),C.mode==="view"?k((o(),r(R,{key:1,class:"q-my-sm",clickable:""},{default:e(()=>[a(_),a(_),a(_),a(_,null,{default:e(()=>[a(c,null,{default:e(()=>[S("span",de," Rp "+T(Y(i.value)),1)]),_:1}),a(c,{caption:""},{default:e(()=>[u(" Total Price ")]),_:1})]),_:1})]),_:1})),[[M]]):v("",!0)]),_:1})]),_:1}),a(X,{align:"right"},{default:e(()=>[a(y,{label:"OK",color:"primary",onClick:t[1]||(t[1]=l=>U()),disable:f.value,loading:f.value},null,8,["disable","loading"]),a(y,{flat:"",label:"Cancel",color:"red",onClick:Q(h),loading:f.value},null,8,["onClick","loading"])]),_:1})]),_:1})]),_:1},8,["onHide"]))}};export{_e as _};
