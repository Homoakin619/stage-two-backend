!function(r,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports):"function"==typeof define&&define.amd?define(["exports"],t):t((r="undefined"!=typeof globalThis?globalThis:r||self)["fast-copy"]={})}(this,(function(r){"use strict";var t=Function.prototype.toString,e=Object.create,n=Object.prototype.toString,o=function(){function r(){this._keys=[],this._values=[]}return r.prototype.has=function(r){return!!~this._keys.indexOf(r)},r.prototype.get=function(r){return this._values[this._keys.indexOf(r)]},r.prototype.set=function(r,t){this._keys.push(r),this._values.push(t)},r}();var a="undefined"!=typeof WeakMap?function(){return new WeakMap}:function(){return new o};function c(r){if(!r)return e(null);var n=r.constructor;if(n===Object)return r===Object.prototype?{}:e(r);if(n&&~t.call(n).indexOf("[native code]"))try{return new n}catch(r){}return e(r)}var u="g"===/test/g.flags?function(r){return r.flags}:function(r){var t="";return r.global&&(t+="g"),r.ignoreCase&&(t+="i"),r.multiline&&(t+="m"),r.unicode&&(t+="u"),r.sticky&&(t+="y"),t};function i(r){var t=n.call(r);return t.substring(8,t.length-1)}var f="undefined"!=typeof Symbol?function(r){return r[Symbol.toStringTag]||i(r)}:i,s=Object.defineProperty,p=Object.getOwnPropertyDescriptor,y=Object.getOwnPropertyNames,l=Object.getOwnPropertySymbols,v=Object.prototype,d=v.hasOwnProperty,b=v.propertyIsEnumerable,h="function"==typeof l;var g=h?function(r){return y(r).concat(l(r))}:y;function O(r,t,e){for(var n=g(r),o=0,a=n.length,c=void 0,u=void 0;o<a;++o)if("callee"!==(c=n[o])&&"caller"!==c)if(u=p(r,c)){u.get||u.set||(u.value=e.copier(u.value,e));try{s(t,c,u)}catch(r){t[c]=u.value}}else t[c]=e.copier(r[c],e);return t}function j(r,t){return r.slice(0)}function w(r,t){var e=new t.Constructor;return t.cache.set(r,e),r.forEach((function(r,n){e.set(n,t.copier(r,t))})),e}var m=h?function(r,t){var e=c(t.prototype);for(var n in t.cache.set(r,e),r)d.call(r,n)&&(e[n]=t.copier(r[n],t));for(var o=l(r),a=0,u=o.length,i=void 0;a<u;++a)i=o[a],b.call(r,i)&&(e[i]=t.copier(r[i],t));return e}:function(r,t){var e=c(t.prototype);for(var n in t.cache.set(r,e),r)d.call(r,n)&&(e[n]=t.copier(r[n],t));return e};function C(r,t){return new t.Constructor(r.valueOf())}function A(r,t){return r}function B(r,t){var e=new t.Constructor;return t.cache.set(r,e),r.forEach((function(r){e.add(t.copier(r,t))})),e}var _=Array.isArray,x=Object.assign,S=Object.getPrototypeOf||function(r){return r.__proto__},k={array:function(r,t){var e=new t.Constructor;t.cache.set(r,e);for(var n=0,o=r.length;n<o;++n)e[n]=t.copier(r[n],t);return e},arrayBuffer:j,blob:function(r,t){return r.slice(0,r.size,r.type)},dataView:function(r,t){return new t.Constructor(j(r.buffer))},date:function(r,t){return new t.Constructor(r.getTime())},error:A,map:w,object:m,regExp:function(r,t){var e=new t.Constructor(r.source,u(r));return e.lastIndex=r.lastIndex,e},set:B},P=x({},k,{array:function(r,t){var e=new t.Constructor;return t.cache.set(r,e),O(r,e,t)},map:function(r,t){return O(r,w(r,t),t)},object:function(r,t){var e=c(t.prototype);return t.cache.set(r,e),O(r,e,t)},set:function(r,t){return O(r,B(r,t),t)}});function E(r){var t=function(r){return{Arguments:r.object,Array:r.array,ArrayBuffer:r.arrayBuffer,Blob:r.blob,Boolean:C,DataView:r.dataView,Date:r.date,Error:r.error,Float32Array:r.arrayBuffer,Float64Array:r.arrayBuffer,Int8Array:r.arrayBuffer,Int16Array:r.arrayBuffer,Int32Array:r.arrayBuffer,Map:r.map,Number:C,Object:r.object,Promise:A,RegExp:r.regExp,Set:r.set,String:C,WeakMap:A,WeakSet:A,Uint8Array:r.arrayBuffer,Uint8ClampedArray:r.arrayBuffer,Uint16Array:r.arrayBuffer,Uint32Array:r.arrayBuffer,Uint64Array:r.arrayBuffer}}(x({},k,r)),e=t.Array,n=t.Object;function o(r,o){if(o.prototype=o.Constructor=void 0,!r||"object"!=typeof r)return r;if(o.cache.has(r))return o.cache.get(r);if(o.prototype=S(r),o.Constructor=o.prototype&&o.prototype.constructor,!o.Constructor||o.Constructor===Object)return n(r,o);if(_(r))return e(r,o);var a=t[f(r)];return a?a(r,o):"function"==typeof r.then?r:n(r,o)}return function(r){return o(r,{Constructor:void 0,cache:a(),copier:o,prototype:void 0})}}function I(r){return E(x({},P,r))}var M=I({}),U=E({});r.copyStrict=M,r.createCopier=E,r.createStrictCopier=I,r.default=U,Object.defineProperty(r,"__esModule",{value:!0})}));
//# sourceMappingURL=index.js.map
