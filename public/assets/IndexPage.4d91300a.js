import{c as d,i as c,e as t,a as i,h as g,d as h,g as f,l as y,f as x,_,A as m,C as v,D as C,E as $,G as P}from"./index.a1f073b5.js";var Q=d({name:"QPage",props:{padding:Boolean,styleFn:Function},setup(n,{slots:o}){const{proxy:{$q:s}}=f(),e=c(y,t);if(e===t)return console.error("QPage needs to be a deep child of QLayout"),t;if(c(x,t)===t)return console.error("QPage needs to be child of QPageContainer"),t;const r=i(()=>{const a=(e.header.space===!0?e.header.size:0)+(e.footer.space===!0?e.footer.size:0);if(typeof n.styleFn=="function"){const p=e.isContainer.value===!0?e.containerHeight.value:s.screen.height;return n.styleFn(a,p)}return{minHeight:e.isContainer.value===!0?e.containerHeight.value-a+"px":s.screen.height===0?a!==0?`calc(100vh - ${a}px)`:"100vh":s.screen.height-a+"px"}}),u=i(()=>`q-page${n.padding===!0?" q-layout-padding":""}`);return()=>g("main",{class:u.value,style:r.value},h(o.default))}}),F="/assets/quasar-logo-vertical.55e9c854.svg";const q=m({name:"IndexPage"}),B=P("img",{alt:"Quasar logo",src:F,style:{width:"200px",height:"200px"}},null,-1);function H(n,o,s,e,l,r){return v(),C(Q,{class:"flex flex-center"},{default:$(()=>[B]),_:1})}var b=_(q,[["render",H]]);export{b as default};
