"use strict";var s=Object.create;var r=Object.defineProperty;var _=Object.getOwnPropertyDescriptor;var l=Object.getOwnPropertyNames;var D=Object.getPrototypeOf,P=Object.prototype.hasOwnProperty;var c=(o,e)=>{for(var n in e)r(o,n,{get:e[n],enumerable:!0})},m=(o,e,n,i)=>{if(e&&typeof e=="object"||typeof e=="function")for(let t of l(e))!P.call(o,t)&&t!==n&&r(o,t,{get:()=>e[t],enumerable:!(i=_(e,t))||i.enumerable});return o};var p=(o,e,n)=>(n=o!=null?s(D(o)):{},m(e||!o||!o.__esModule?r(n,"default",{value:o,enumerable:!0}):n,o)),d=o=>m(r({},"__esModule",{value:!0}),o);var y={};c(y,{default:()=>x});module.exports=d(y);var a=p(require("./last_name_pattern")),f=p(require("./name"));const u={last_name_pattern:a.default,name:f.default};var x=u;
