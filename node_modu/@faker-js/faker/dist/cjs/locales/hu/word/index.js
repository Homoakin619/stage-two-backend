"use strict";var v=Object.create;var n=Object.defineProperty;var b=Object.getOwnPropertyDescriptor;var D=Object.getOwnPropertyNames;var W=Object.getPrototypeOf,l=Object.prototype.hasOwnProperty;var s=(o,r)=>{for(var i in r)n(o,i,{get:r[i],enumerable:!0})},f=(o,r,i,e)=>{if(r&&typeof r=="object"||typeof r=="function")for(let m of D(r))!l.call(o,m)&&m!==i&&n(o,m,{get:()=>r[m],enumerable:!(e=b(r,m))||e.enumerable});return o};var t=(o,r,i)=>(i=o!=null?v(W(o)):{},f(r||!o||!o.__esModule?n(i,"default",{value:o,enumerable:!0}):i,o)),w=o=>f(n({},"__esModule",{value:!0}),o);var g={};s(g,{default:()=>y});module.exports=w(g);var p=t(require("./adjective")),d=t(require("./adverb")),c=t(require("./conjunction")),a=t(require("./interjection")),j=t(require("./noun")),u=t(require("./verb"));const x={adjective:p.default,adverb:d.default,conjunction:c.default,interjection:a.default,noun:j.default,verb:u.default};var y=x;
