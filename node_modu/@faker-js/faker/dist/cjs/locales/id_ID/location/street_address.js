"use strict";var e=Object.defineProperty;var a=Object.getOwnPropertyDescriptor;var r=Object.getOwnPropertyNames;var c=Object.prototype.hasOwnProperty;var d=(l,o)=>{for(var t in o)e(l,t,{get:o[t],enumerable:!0})},u=(l,o,t,i)=>{if(o&&typeof o=="object"||typeof o=="function")for(let n of r(o))!c.call(l,n)&&n!==t&&e(l,n,{get:()=>o[n],enumerable:!(i=a(o,n))||i.enumerable});return l};var s=l=>u(e({},"__esModule",{value:!0}),l);var m={};d(m,{default:()=>b});module.exports=s(m);var b={normal:"{{location.street}} no {{location.buildingNumber}}",full:"{{location.street}} no {{location.buildingNumber}} {{location.secondaryAddress}}"};
