import{s as r,o as _,B as m,P as v,I as e,E as l,D as s,Z as f,am as h,L as b,M as n,bc as S,O as o,aX as g,Q as w}from"./index.d3ac9442.js";import{a as C,k as p}from"./QTable.040cb88d.js";import"./axios.b1aaea61.js";const x={class:"q-pa-md"},V={class:"row"},D={class:"col"},M={class:"q-pa-xs col-xs-12 col-sm-6 col-md-4"},N={class:"text-h5 text-bold"},Q={class:"text-h6 text-bold"},R={class:"text-subtitle2"},U={class:"text-h6 text-bold"},I=e("div",{class:"text-subtitle2"},"Resolved Items",-1),O={class:"row"},k={class:"col"},H=e("div",{class:"col text-right"},null,-1),y={__name:"serviceApproval",setup(B){C(),r([{name:"SRVH_DOCNO",label:"SPK No",field:"SRVH_DOCNO",sortable:!0,align:"left"},{name:"MCUS_CUSNM",label:"Customer Name",field:"MCUS_CUSNM",sortable:!0,align:"left"},{name:"resolve",label:"Resolved Line",sortable:!0,align:"left",field:t=>t.resolve.length},{name:"unresolve",label:"Unresolved Line",sortable:!0,align:"left",field:t=>t.unresolve.length},{name:"SRVH_ISSDT",label:"Submited Date",field:"SRVH_ISSDT",sortable:!0,align:"left"}]);const c=r([]),i=r(""),u=r(!1);return r(null),_(()=>{}),(t,d)=>(m(),v("div",x,[e("div",V,[e("div",D,[l(p,{grid:"",flat:"",bordered:"","card-container-class":t.cardContainerClass,title:"Service Approval List",rows:c.value,columns:t.columns,"row-key":"name",filter:i.value,"hide-header":"",pagination:{rowsPerPage:50},loading:u.value},{"top-right":s(()=>[l(f,{borderless:"",dense:"",debounce:"300",modelValue:i.value,"onUpdate:modelValue":d[0]||(d[0]=a=>i.value=a),placeholder:"Search"},{append:s(()=>[l(h,{name:"search"})]),_:1},8,["modelValue"])]),item:s(a=>[e("div",M,[l(b,{flat:"",bordered:""},{default:s(()=>[l(n,{class:S(`text-center bg-${t.statusMaker(a.row).color} text-white`)},{default:s(()=>[e("div",N,o(a.row.SRVH_DOCNO),1),e("div",null,o(t.statusMaker(a.row).label),1)]),_:2},1032,["class"]),l(g),l(n,null,{default:s(()=>[e("div",Q,o(a.row.MCUS_CUSNM),1),e("div",R,o(a.row.SRVH_ISSDT),1)]),_:2},1024),l(n,null,{default:s(()=>[e("div",U,o(a.row.resolve.length)+" of "+o(a.row.detail.length),1),I]),_:2},1024),l(n,null,{default:s(()=>[e("div",O,[e("div",k,[l(w,{label:"View Data",color:"primary",outline:""})]),H])]),_:1})]),_:2},1024)])]),_:1},8,["card-container-class","rows","columns","filter","loading"])])])]))}};export{y as default};
