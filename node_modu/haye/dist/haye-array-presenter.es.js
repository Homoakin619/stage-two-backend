function n(){return{nodes:[],currentNode:null,add:function(){this.currentNode={name:"",args:[]},this.nodes.push(this.currentNode)},appendKey:function(n,e){32!==e&&(this.currentNode.name+=n)},appendValue:function(n){this.currentNode.args[this.currentNode.args.length-1]+=n},shiftValue:function(){this.currentNode.args.push("")},toJSON:function(){return this.nodes}}}export default n;
