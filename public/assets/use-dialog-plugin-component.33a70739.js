import{c,a as d,h as p,d as g,s as f,g as h}from"./index.689625c0.js";var v=c({name:"QBtnGroup",props:{unelevated:Boolean,outline:Boolean,flat:Boolean,rounded:Boolean,square:Boolean,push:Boolean,stretch:Boolean,glossy:Boolean,spread:Boolean},setup(e,{slots:t}){const o=d(()=>{const a=["unelevated","outline","flat","rounded","square","push","stretch","glossy"].filter(n=>e[n]===!0).map(n=>`q-btn-group--${n}`).join(" ");return`q-btn-group row no-wrap${a.length!==0?" "+a:""}`+(e.spread===!0?" q-btn-group--spread":" inline")});return()=>p("div",{class:o.value},g(t.default))}});const m=()=>!0;function B(e){const t={};return e.forEach(o=>{t[o]=m}),t}function s(){const{emit:e,proxy:t}=h(),o=f(null);function a(){o.value.show()}function n(){o.value.hide()}function r(i){e("ok",i),n()}function l(){e("hide")}return Object.assign(t,{show:a,hide:n}),{dialogRef:o,onDialogHide:l,onDialogOK:r,onDialogCancel:n}}const u=["ok","hide"];s.emits=u;s.emitsObject=B(u);export{v as Q,s as u};
