"use strict";var n=Object.defineProperty;var s=Object.getOwnPropertyDescriptor;var p=Object.getOwnPropertyNames;var f=Object.prototype.hasOwnProperty;var i=(t,e)=>{for(var a in e)n(t,a,{get:e[a],enumerable:!0})},l=(t,e,a,o)=>{if(e&&typeof e=="object"||typeof e=="function")for(let r of p(e))!f.call(t,r)&&r!==a&&n(t,r,{get:()=>e[r],enumerable:!(o=s(e,r))||o.enumerable});return t};var _=t=>l(n({},"__esModule",{value:!0}),t);var x={};i(x,{default:()=>m});module.exports=_(x);var m=["{{location.street_prefix}} {{person.first_name}} {{person.last_name}}"];
