import{c as r,a as l,h as s,d as u}from"./index.86cc3a7c.js";var d=r({name:"QBtnGroup",props:{unelevated:Boolean,outline:Boolean,flat:Boolean,rounded:Boolean,square:Boolean,push:Boolean,stretch:Boolean,glossy:Boolean,spread:Boolean},setup(o,{slots:n}){const t=l(()=>{const a=["unelevated","outline","flat","rounded","square","push","stretch","glossy"].filter(e=>o[e]===!0).map(e=>`q-btn-group--${e}`).join(" ");return`q-btn-group row no-wrap${a.length!==0?" "+a:""}`+(o.spread===!0?" q-btn-group--spread":" inline")});return()=>s("div",{class:t.value},u(n.default))}});export{d as Q};
