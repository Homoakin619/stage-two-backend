"use strict";var p=Object.defineProperty;var i=Object.getOwnPropertyDescriptor;var o=Object.getOwnPropertyNames;var T=Object.prototype.hasOwnProperty;var V=(a,e)=>{for(var r in e)p(a,r,{get:e[r],enumerable:!0})},g=(a,e,r,u)=>{if(e&&typeof e=="object"||typeof e=="function")for(let l of o(e))!T.call(a,l)&&l!==r&&p(a,l,{get:()=>e[l],enumerable:!(u=i(e,l))||u.enumerable});return a};var t=a=>g(p({},"__esModule",{value:!0}),a);var s={};V(s,{groupBy:()=>d});module.exports=t(s);function d(a,e,r=u=>u){const u={};for(const l of a){const n=e(l);u[n]===void 0&&(u[n]=[]),u[n].push(r(l))}return u}0&&(module.exports={groupBy});
