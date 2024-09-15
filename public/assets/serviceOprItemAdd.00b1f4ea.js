import{o as x,t as V,C as o,D as d,E as e,F as a,M as H,O as b,J as S,R as v,Q as y,aZ as T,U as M,I as u,W as h,S as E,T as Z,V as j,P as p,$ as Q,X as J,Y as D,Z as W}from"./index.df428477.js";import{Q as k,a as m,b as r,c as X}from"./QSelect.ec06c079.js";import{Q as z}from"./QList.bc6df198.js";import{api_web as G}from"./axios.d1ec4fca.js";import{u as ee}from"./format.7894c26f.js";import{u as ae}from"./use-dialog-plugin-component.527f6ede.js";const te={class:"row"},le=S("div",{class:"col"},[S("div",{class:"text-h6"},"Update Used Item")],-1),oe={key:0,class:"col text-right"},ne={key:0},ie={key:0},se={key:0},de={class:"text-h5 text-bold"},Te={__name:"serviceOprItemAdd",props:{mode:String,dataItem:Array,header:Object},setup(C){const{dialogRef:F,onDialogHide:P,onDialogOK:N,onDialogCancel:R}=ae(),I=ee(),n=C;x(async()=>{console.log(n),n.dataItem.listFixDet&&(c.value=n.dataItem.listFixDet,await w())});const g=V([]),c=V([]),f=V(!1),O=()=>{c.value.push({TSRVD_ID:n.dataItem.id,TSRVF_ITMCD:"",TSRVF_PRC:0,TSRVF_QTY:1})},L=(i,l,t,_)=>{l(async()=>{_==="item"&&await w(i)})},w=async i=>{f.value=!0,await G.post("item/searchAPITBL",{searchValue:i}).then(l=>{f.value=!1,g.value=l.data.data}).catch(()=>{f.value=!1})},U=()=>{n.mode==="view"?R():I.dialog({title:"Confirmation",message:"Are you sure want to save this items ?",cancel:!0,persistent:!0}).onOk(async()=>{N(c.value)})},Y=i=>{I.dialog({title:"Confirmation",message:`Do you want to delete this lines no ${i+1} ?`,cancel:!0,persistent:!0}).onOk(async()=>{c.value.splice(i,1)})},A=i=>{let l=0;return i.map(t=>{l+=parseInt(t.TSRVF_PRC)*parseInt(t.TSRVF_QTY)}),l.toLocaleString()},$=(i,l)=>{const t=g.value.filter(_=>_.MITM_ITMCD===i);t.length>0&&(t[0].STOCK>0?(c.value[l].TSRVF_PRC=t[0].LATEST_PRC,c.value[l].STOCK=t[0].STOCK):I.notify({color:"warning",message:`Stock item ${i} (${t[0].MITM_ITMNM}) is 0, You might be can't use this item !`}))},q=(i,l)=>{i>c.value[l].STOCK&&I.notify({color:"warning",message:`Stock item ${c.value[l].TSRVF_ITMCD} is 0, You might be can't use this item !`})};return(i,l)=>(o(),d(W,{ref_key:"dialogRef",ref:F,onHide:D(P),"transition-show":"slide-up","transition-hide":"slide-down","full-width":""},{default:e(()=>[a(H,{class:"q-dialog-plugin bg-white q-pa-sm"},{default:e(()=>[a(b,null,{default:e(()=>[S("div",te,[le,n.mode!=="view"?(o(),v("div",oe,[a(y,{icon:"add",outline:"",color:"blue",onClick:O})])):T("",!0)])]),_:1}),a(b,{class:"q-pa-sm",style:{"max-height":"50vh"}},{default:e(()=>[a(z,{bordered:""},{default:e(()=>[c.value.length===0?M((o(),d(k,{key:0,class:"q-my-sm",clickable:""},{default:e(()=>[a(m,null,{default:e(()=>[u(" No items added ")]),_:1})]),_:1})),[[h]]):T("",!0),(o(!0),v(E,null,Z(c.value,(t,_)=>M((o(),d(k,{key:_,class:"q-my-sm",clickable:""},{default:e(()=>[a(m,{avatar:""},{default:e(()=>[a(j,{color:"primary","text-color":"white"},{default:e(()=>[u(p(_+1),1)]),_:2},1024)]),_:2},1024),a(m,null,{default:e(()=>[a(r,null,{default:e(()=>[n.mode==="view"?(o(),v("div",ne,[f.value?(o(),d(r,{key:1},{default:e(()=>[u(" Please wait, loading item description ")]),_:1})):(o(),d(r,{key:0},{default:e(()=>[u(p(t.MITM_ITMNM?t.MITM_ITMNM:g.value.filter(s=>s.MITM_ITMCD==t.TSRVF_ITMCD)[0].MITM_ITMNM),1)]),_:2},1024)),a(r,{caption:""},{default:e(()=>[u(" Item ")]),_:1})])):(o(),d(X,{key:1,dense:"",filled:"",label:"Item Name",modelValue:t.TSRVF_ITMCD,"onUpdate:modelValue":[s=>t.TSRVF_ITMCD=s,s=>$(s,_)],"use-input":"","input-debounce":"500",options:g.value,onFilter:l[0]||(l[0]=(s,B,K)=>L(s,B,K,"item")),behavior:"dialog","option-label":"MITM_ITMNM","option-value":"MITM_ITMCD","emit-value":"","map-options":"",loading:f.value,readonly:n.mode==="view"},null,8,["modelValue","onUpdate:modelValue","options","loading","readonly"]))]),_:2},1024)]),_:2},1024),n.header.SRVH_ISINT==0?(o(),d(m,{key:0},{default:e(()=>[n.mode==="view"?(o(),v("div",ie,[a(r,null,{default:e(()=>[u(p(t.TSRVF_PRC.toLocaleString()),1)]),_:2},1024),a(r,{caption:""},{default:e(()=>[u(" Price ")]),_:1})])):(o(),d(Q,{key:1,label:"Price",modelValue:t.TSRVF_PRC,"onUpdate:modelValue":s=>t.TSRVF_PRC=s,filled:"",dense:"",readonly:n.mode==="view"},null,8,["modelValue","onUpdate:modelValue","readonly"]))]),_:2},1024)):T("",!0),a(m,null,{default:e(()=>[n.mode==="view"?(o(),v("div",se,[a(r,null,{default:e(()=>[u(p(t.TSRVF_QTY.toLocaleString()),1)]),_:2},1024),a(r,{caption:""},{default:e(()=>[u(" Qty ")]),_:1})])):(o(),d(Q,{key:1,label:"Qty",modelValue:t.TSRVF_QTY,"onUpdate:modelValue":[s=>t.TSRVF_QTY=s,s=>q(s,_)],filled:"",dense:"",readonly:n.mode==="view"},null,8,["modelValue","onUpdate:modelValue","readonly"]))]),_:2},1024),n.mode==="view"?(o(),d(m,{key:1},{default:e(()=>[a(r,null,{default:e(()=>[u(" Rp "+p((parseInt(t.TSRVF_PRC)*parseInt(t.TSRVF_QTY)).toLocaleString()),1)]),_:2},1024),a(r,{caption:""},{default:e(()=>[u(" Total Price ")]),_:1})]),_:2},1024)):T("",!0),C.mode!=="view"?(o(),d(m,{key:2,side:""},{default:e(()=>[a(y,{icon:"delete",flat:"",color:"red",onClick:s=>Y(_)},null,8,["onClick"])]),_:2},1024)):T("",!0)]),_:2},1024)),[[h]])),128)),C.mode==="view"?M((o(),d(k,{key:1,class:"q-my-sm",clickable:""},{default:e(()=>[a(m),a(m),a(m),a(m,null,{default:e(()=>[a(r,null,{default:e(()=>[S("span",de," Rp "+p(A(c.value)),1)]),_:1}),a(r,{caption:""},{default:e(()=>[u(" Total Price ")]),_:1})]),_:1})]),_:1})),[[h]]):T("",!0)]),_:1})]),_:1}),a(J,{align:"right"},{default:e(()=>[a(y,{label:"OK",color:"primary",onClick:l[1]||(l[1]=t=>U()),disable:f.value,loading:f.value},null,8,["disable","loading"]),a(y,{flat:"",label:"Cancel",color:"red",onClick:D(R),loading:f.value},null,8,["onClick","loading"])]),_:1})]),_:1})]),_:1},8,["onHide"]))}};export{Te as _};
