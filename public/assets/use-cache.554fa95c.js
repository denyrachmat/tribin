import{c as u,a as l,h as a,d as n,g as v}from"./index.bdc91b27.js";var p=u({name:"QTr",props:{props:Object,noHover:Boolean},setup(t,{slots:e}){const o=l(()=>"q-tr"+(t.props===void 0||t.props.header===!0?"":" "+t.props.__trClass)+(t.noHover===!0?" q-tr--no-hover":""));return()=>a("tr",{class:o.value},n(e.default))}}),h=u({name:"QTd",props:{props:Object,autoWidth:Boolean,noHover:Boolean},setup(t,{slots:e}){const o=v(),s=l(()=>"q-td"+(t.autoWidth===!0?" q-table--col-auto-width":"")+(t.noHover===!0?" q-td--no-hover":"")+" ");return()=>{if(t.props===void 0)return a("td",{class:s.value},n(e.default));const d=o.vnode.key,r=(t.props.colsMap!==void 0?t.props.colsMap[d]:null)||t.props.col;if(r===void 0)return;const{row:c}=t.props;return a("td",{class:s.value+r.__tdClass(c),style:r.__tdStyle(c)},n(e.default))}}});function f(){const t=new Map;return{getCache:function(e,o){return t[e]===void 0?t[e]=o:t[e]},getCacheWithFn:function(e,o){return t[e]===void 0?t[e]=o():t[e]}}}export{p as Q,h as a,f as u};
