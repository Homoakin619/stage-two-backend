"use strict";var n=Object.defineProperty;var o=Object.getOwnPropertyDescriptor;var p=Object.getOwnPropertyNames;var r=Object.prototype.hasOwnProperty;var m=(a,e)=>{for(var l in e)n(a,l,{get:e[l],enumerable:!0})},u=(a,e,l,s)=>{if(e&&typeof e=="object"||typeof e=="function")for(let t of p(e))!r.call(a,t)&&t!==l&&n(a,t,{get:()=>e[t],enumerable:!(s=o(e,t))||s.enumerable});return a};var _=a=>u(n({},"__esModule",{value:!0}),a);var h={};m(h,{default:()=>g});module.exports=_(h);var g=[{value:"{{person.last_name}}",weight:8},{value:"{{person.last_name}} {{person.last_name}}",weight:2}];