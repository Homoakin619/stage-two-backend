"use strict";var c=Object.create;var n=Object.defineProperty;var p=Object.getOwnPropertyDescriptor;var s=Object.getOwnPropertyNames;var u=Object.getPrototypeOf,D=Object.prototype.hasOwnProperty;var M=(i,o)=>{for(var t in o)n(i,t,{get:o[t],enumerable:!0})},f=(i,o,t,r)=>{if(o&&typeof o=="object"||typeof o=="function")for(let e of s(o))!D.call(i,e)&&e!==t&&n(i,e,{get:()=>o[e],enumerable:!(r=p(o,e))||r.enumerable});return i};var a=(i,o,t)=>(t=i!=null?c(u(i)):{},f(o||!i||!i.__esModule?n(t,"default",{value:i,enumerable:!0}):t,i)),d=i=>f(n({},"__esModule",{value:!0}),i);var x={};M(x,{default:()=>l});module.exports=d(x);var m=a(require("./genre"));const g={genre:m.default};var l=g;