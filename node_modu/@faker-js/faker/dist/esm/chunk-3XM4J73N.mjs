import{a as r}from"./chunk-VJTQBXK2.mjs";import{b as e}from"./chunk-LSZKOVGW.mjs";import{j as t,k as o}from"./chunk-GTEBSQTL.mjs";var i=["qc.ca","ca","com","biz","info","name","net","org"];var a=["gmail.com","yahoo.ca","hotmail.com"];var C={domain_suffix:i,free_email:a},n=C;var f=["{{location.city_prefix}} {{person.firstName}}{{location.city_suffix}}","{{location.city_prefix}} {{person.firstName}}","{{person.firstName}}{{location.city_suffix}}","{{person.last_name}}{{location.city_suffix}}"];var m=["Canada"];var p=["A#? #?#","B#? #?#","C#? #?#","E#? #?#","G#? #?#","H#? #?#","J#? #?#","K#? #?#","L#? #?#","M#? #?#","N#? #?#","P#? #?#","R#? #?#","S#? #?#","T#? #?#","V#? #?#","X#? #?#","Y#? #?#"];var s=["Alberta","Colombie-Britannique","Manitoba","Nouveau-Brunswick","Terre-Neuve-et-Labrador","Nouvelle-\xC9cosse","Territoires du Nord-Ouest","Nunavut","Ontario","\xCEle-du-Prince-\xC9douard","Qu\xE9bec","Saskatchewan","Yukon"];var u=["AB","BC","MB","NB","NL","NS","NU","NT","ON","PE","QC","SK","YK"];var l=["{{person.firstName}} {{location.street_suffix}}","{{person.lastName}} {{location.street_suffix}}"];var D={city_pattern:f,default_country:m,postcode:p,state:s,state_abbr:u,street_pattern:l},c=D;var h={title:"French (Canada)",code:"fr_CA",country:"CA",language:"fr",endonym:"Fran\xE7ais (Canada)",dir:"ltr",script:"Latn"},d=h;var x=[{value:"{{person.last_name}}",weight:1}];var B={last_name_pattern:x},_=B;var N=["### ###-####","1 ### ###-####","### ###-####, poste ###"];var P={formats:N},y=P;var L={internet:n,location:c,metadata:d,person:_,phone_number:y},b=L;var mt=new t({locale:[b,r,e,o]});export{b as a,mt as b};