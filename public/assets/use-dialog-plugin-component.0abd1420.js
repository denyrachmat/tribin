import{t as g,g as l}from"./index.735157aa.js";const f=()=>!0;function m(n){const e={};return n.forEach(t=>{e[t]=f}),e}function i(){const{emit:n,proxy:e}=l(),t=g(null);function c(){t.value.show()}function o(){t.value.hide()}function u(r){n("ok",r),o()}function a(){n("hide")}return Object.assign(e,{show:c,hide:o}),{dialogRef:t,onDialogHide:a,onDialogOK:u,onDialogCancel:o}}const s=["ok","hide"];i.emits=s;i.emitsObject=m(s);export{m as g,i as u};
