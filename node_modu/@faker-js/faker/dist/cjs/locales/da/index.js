"use strict";var L=Object.create;var e=Object.defineProperty;var b=Object.getOwnPropertyDescriptor;var h=Object.getOwnPropertyNames;var w=Object.getPrototypeOf,x=Object.prototype.hasOwnProperty;var _=(o,r)=>{for(var t in r)e(o,t,{get:r[t],enumerable:!0})},f=(o,r,t,p)=>{if(r&&typeof r=="object"||typeof r=="function")for(let i of h(r))!x.call(o,i)&&i!==t&&e(o,i,{get:()=>r[i],enumerable:!(p=b(r,i))||p.enumerable});return o};var m=(o,r,t)=>(t=o!=null?L(w(o)):{},f(r||!o||!o.__esModule?e(t,"default",{value:o,enumerable:!0}):t,o)),g=o=>f(e({},"__esModule",{value:!0}),o);var q={};_(q,{default:()=>k});module.exports=g(q);var n=m(require("./commerce")),a=m(require("./company")),c=m(require("./date")),d=m(require("./internet")),l=m(require("./location")),s=m(require("./metadata")),u=m(require("./person")),y=m(require("./phone_number")),D=m(require("./word"));const j={commerce:n.default,company:a.default,date:c.default,internet:d.default,location:l.default,metadata:s.default,person:u.default,phone_number:y.default,word:D.default};var k=j;