"use strict";var l=Object.create;var n=Object.defineProperty;var c=Object.getOwnPropertyDescriptor;var d=Object.getOwnPropertyNames;var A=Object.getPrototypeOf,D=Object.prototype.hasOwnProperty;var g=(i,o)=>{for(var t in o)n(i,t,{get:o[t],enumerable:!0})},a=(i,o,t,r)=>{if(o&&typeof o=="object"||typeof o=="function")for(let m of d(o))!D.call(i,m)&&m!==t&&n(i,m,{get:()=>o[m],enumerable:!(r=c(o,m))||r.enumerable});return i};var f=(i,o,t)=>(t=i!=null?l(A(i)):{},a(o||!i||!i.__esModule?n(t,"default",{value:i,enumerable:!0}):t,i)),s=i=>a(n({},"__esModule",{value:!0}),i);var y={};g(y,{default:()=>x});module.exports=s(y);var e=f(require("./cat")),p=f(require("./dog"));const u={cat:e.default,dog:p.default};var x=u;
