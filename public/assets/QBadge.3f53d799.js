import{c as i,a as l,h as r,z as u}from"./index.4aa67db9.js";const d=["top","middle","bottom"];var c=i({name:"QBadge",props:{color:String,textColor:String,floating:Boolean,transparent:Boolean,multiLine:Boolean,outline:Boolean,rounded:Boolean,label:[Number,String],align:{type:String,validator:e=>d.includes(e)}},setup(e,{slots:a}){const n=l(()=>e.align!==void 0?{verticalAlign:e.align}:null),o=l(()=>{const t=e.outline===!0&&e.color||e.textColor;return`q-badge flex inline items-center no-wrap q-badge--${e.multiLine===!0?"multi":"single"}-line`+(e.outline===!0?" q-badge--outline":e.color!==void 0?` bg-${e.color}`:"")+(t!==void 0?` text-${t}`:"")+(e.floating===!0?" q-badge--floating":"")+(e.rounded===!0?" q-badge--rounded":"")+(e.transparent===!0?" q-badge--transparent":"")});return()=>r("div",{class:o.value,style:n.value,role:"status","aria-label":e.label},u(a.default,e.label!==void 0?[e.label]:[]))}});export{c as Q};
