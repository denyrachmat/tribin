import{s as g,g as l}from"./index.9eab07fe.js";const f=()=>!0;function m(t){const e={};return t.forEach(n=>{e[n]=f}),e}function i(){const{emit:t,proxy:e}=l(),n=g(null);function c(){n.value.show()}function o(){n.value.hide()}function u(r){t("ok",r),o()}function a(){t("hide")}return Object.assign(e,{show:c,hide:o}),{dialogRef:n,onDialogHide:a,onDialogOK:u,onDialogCancel:o}}const s=["ok","hide"];i.emits=s;i.emitsObject=m(s);export{m as g,i as u};
