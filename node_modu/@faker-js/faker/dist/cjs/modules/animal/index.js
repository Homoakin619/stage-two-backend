"use strict";var t=Object.defineProperty;var l=Object.getOwnPropertyDescriptor;var h=Object.getOwnPropertyNames;var f=Object.prototype.hasOwnProperty;var o=(r,e)=>{for(var a in e)t(r,a,{get:e[a],enumerable:!0})},m=(r,e,a,n)=>{if(e&&typeof e=="object"||typeof e=="function")for(let i of h(e))!f.call(r,i)&&i!==a&&t(r,i,{get:()=>e[i],enumerable:!(n=l(e,i))||n.enumerable});return r};var k=r=>m(t({},"__esModule",{value:!0}),r);var p={};o(p,{AnimalModule:()=>d});module.exports=k(p);var s=require("../../internal/module-base");class d extends s.ModuleBase{dog(){return this.faker.helpers.arrayElement(this.faker.definitions.animal.dog)}cat(){return this.faker.helpers.arrayElement(this.faker.definitions.animal.cat)}snake(){return this.faker.helpers.arrayElement(this.faker.definitions.animal.snake)}bear(){return this.faker.helpers.arrayElement(this.faker.definitions.animal.bear)}lion(){return this.faker.helpers.arrayElement(this.faker.definitions.animal.lion)}cetacean(){return this.faker.helpers.arrayElement(this.faker.definitions.animal.cetacean)}horse(){return this.faker.helpers.arrayElement(this.faker.definitions.animal.horse)}bird(){return this.faker.helpers.arrayElement(this.faker.definitions.animal.bird)}cow(){return this.faker.helpers.arrayElement(this.faker.definitions.animal.cow)}fish(){return this.faker.helpers.arrayElement(this.faker.definitions.animal.fish)}crocodilia(){return this.faker.helpers.arrayElement(this.faker.definitions.animal.crocodilia)}insect(){return this.faker.helpers.arrayElement(this.faker.definitions.animal.insect)}rabbit(){return this.faker.helpers.arrayElement(this.faker.definitions.animal.rabbit)}rodent(){return this.faker.helpers.arrayElement(this.faker.definitions.animal.rodent)}type(){return this.faker.helpers.arrayElement(this.faker.definitions.animal.type)}}0&&(module.exports={AnimalModule});