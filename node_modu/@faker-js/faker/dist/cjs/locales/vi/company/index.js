"use strict";var y=Object.create;var n=Object.defineProperty;var c=Object.getOwnPropertyDescriptor;var x=Object.getOwnPropertyNames;var C=Object.getPrototypeOf,D=Object.prototype.hasOwnProperty;var d=(o,t)=>{for(var i in t)n(o,i,{get:t[i],enumerable:!0})},r=(o,t,i,p)=>{if(t&&typeof t=="object"||typeof t=="function")for(let m of x(t))!D.call(o,m)&&m!==i&&n(o,m,{get:()=>t[m],enumerable:!(p=c(t,m))||p.enumerable});return o};var e=(o,t,i)=>(i=o!=null?y(C(o)):{},r(t||!o||!o.__esModule?n(i,"default",{value:o,enumerable:!0}):i,o)),l=o=>r(n({},"__esModule",{value:!0}),o);var _={};d(_,{default:()=>u});module.exports=l(_);var f=e(require("./name_pattern")),a=e(require("./prefix"));const s={name_pattern:f.default,prefix:a.default};var u=s;
