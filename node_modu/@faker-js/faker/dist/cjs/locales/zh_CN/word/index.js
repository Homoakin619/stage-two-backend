"use strict";var v=Object.create;var e=Object.defineProperty;var b=Object.getOwnPropertyDescriptor;var c=Object.getOwnPropertyNames;var D=Object.getPrototypeOf,W=Object.prototype.hasOwnProperty;var j=(o,r)=>{for(var i in r)e(o,i,{get:r[i],enumerable:!0})},d=(o,r,i,f)=>{if(r&&typeof r=="object"||typeof r=="function")for(let t of c(r))!W.call(o,t)&&t!==i&&e(o,t,{get:()=>r[t],enumerable:!(f=b(r,t))||f.enumerable});return o};var m=(o,r,i)=>(i=o!=null?v(D(o)):{},d(r||!o||!o.__esModule?e(i,"default",{value:o,enumerable:!0}):i,o)),l=o=>d(e({},"__esModule",{value:!0}),o);var w={};j(w,{default:()=>u});module.exports=l(w);var p=m(require("./adjective")),n=m(require("./adverb")),a=m(require("./verb"));const s={adjective:p.default,adverb:n.default,verb:a.default};var u=s;