function h(G){for(var J=1;J<arguments.length;J++){var K=arguments[J];for(var Q in K)if(K.hasOwnProperty(Q))G[Q]=K[Q]}return G}function C(G,J){return Array(J+1).join(G)}function x(G){return G.replace(/^\n*/,"")}function f(G){var J=G.length;while(J>0&&G[J-1]===`
`)J--;return G.substring(0,J)}var m=["ADDRESS","ARTICLE","ASIDE","AUDIO","BLOCKQUOTE","BODY","CANVAS","CENTER","DD","DIR","DIV","DL","DT","FIELDSET","FIGCAPTION","FIGURE","FOOTER","FORM","FRAMESET","H1","H2","H3","H4","H5","H6","HEADER","HGROUP","HR","HTML","ISINDEX","LI","MAIN","MENU","NAV","NOFRAMES","NOSCRIPT","OL","OUTPUT","P","PRE","SECTION","TABLE","TBODY","TD","TFOOT","TH","THEAD","TR","UL"];function F(G){return R(G,m)}var W=["AREA","BASE","BR","COL","COMMAND","EMBED","HR","IMG","INPUT","KEYGEN","LINK","META","PARAM","SOURCE","TRACK","WBR"];function y(G){return R(G,W)}function g(G){return S(G,W)}var E=["A","TABLE","THEAD","TBODY","TFOOT","TH","TD","IFRAME","SCRIPT","AUDIO","VIDEO"];function a(G){return R(G,E)}function u(G){return S(G,E)}function R(G,J){return J.indexOf(G.nodeName)>=0}function S(G,J){return G.getElementsByTagName&&J.some(function(K){return G.getElementsByTagName(K).length})}var q={};q.paragraph={filter:"p",replacement:function(G){return`

`+G+`

`}};q.lineBreak={filter:"br",replacement:function(G,J,K){return K.br+`
`}};q.heading={filter:["h1","h2","h3","h4","h5","h6"],replacement:function(G,J,K){var Q=Number(J.nodeName.charAt(1));if(K.headingStyle==="setext"&&Q<3){var Y=C(Q===1?"=":"-",G.length);return`

`+G+`
`+Y+`

`}else return`

`+C("#",Q)+" "+G+`

`}};q.blockquote={filter:"blockquote",replacement:function(G){return G=G.replace(/^\n+|\n+$/g,""),G=G.replace(/^/gm,"> "),`

`+G+`

`}};q.list={filter:["ul","ol"],replacement:function(G,J){var K=J.parentNode;if(K.nodeName==="LI"&&K.lastElementChild===J)return`
`+G;else return`

`+G+`

`}};q.listItem={filter:"li",replacement:function(G,J,K){G=G.replace(/^\n+/,"").replace(/\n+$/,`
`).replace(/\n/gm,`
    `);var Q=K.bulletListMarker+"   ",Y=J.parentNode;if(Y.nodeName==="OL"){var Z=Y.getAttribute("start"),I=Array.prototype.indexOf.call(Y.children,J);Q=(Z?Number(Z)+I:I+1)+".  "}return Q+G+(J.nextSibling&&!/\n$/.test(G)?`
`:"")}};q.indentedCodeBlock={filter:function(G,J){return J.codeBlockStyle==="indented"&&G.nodeName==="PRE"&&G.firstChild&&G.firstChild.nodeName==="CODE"},replacement:function(G,J,K){return`

    `+J.firstChild.textContent.replace(/\n/g,`
    `)+`

`}};q.fencedCodeBlock={filter:function(G,J){return J.codeBlockStyle==="fenced"&&G.nodeName==="PRE"&&G.firstChild&&G.firstChild.nodeName==="CODE"},replacement:function(G,J,K){var Q=J.firstChild.getAttribute("class")||"",Y=(Q.match(/language-(\S+)/)||[null,""])[1],Z=J.firstChild.textContent,I=K.fence.charAt(0),U=3,$=new RegExp("^"+I+"{3,}","gm"),O;while(O=$.exec(Z))if(O[0].length>=U)U=O[0].length+1;var D=C(I,U);return`

`+D+Y+`
`+Z.replace(/\n$/,"")+`
`+D+`

`}};q.horizontalRule={filter:"hr",replacement:function(G,J,K){return`

`+K.hr+`

`}};q.inlineLink={filter:function(G,J){return J.linkStyle==="inlined"&&G.nodeName==="A"&&G.getAttribute("href")},replacement:function(G,J){var K=J.getAttribute("href");if(K)K=K.replace(/([()])/g,"\\$1");var Q=X(J.getAttribute("title"));if(Q)Q=' "'+Q.replace(/"/g,"\\\"")+'"';return"["+G+"]("+K+Q+")"}};q.referenceLink={filter:function(G,J){return J.linkStyle==="referenced"&&G.nodeName==="A"&&G.getAttribute("href")},replacement:function(G,J,K){var Q=J.getAttribute("href"),Y=X(J.getAttribute("title"));if(Y)Y=' "'+Y+'"';var Z,I;switch(K.linkReferenceStyle){case"collapsed":Z="["+G+"][]",I="["+G+"]: "+Q+Y;break;case"shortcut":Z="["+G+"]",I="["+G+"]: "+Q+Y;break;default:var U=this.references.length+1;Z="["+G+"]["+U+"]",I="["+U+"]: "+Q+Y}return this.references.push(I),Z},references:[],append:function(G){var J="";if(this.references.length)J=`

`+this.references.join(`
`)+`

`,this.references=[];return J}};q.emphasis={filter:["em","i"],replacement:function(G,J,K){if(!G.trim())return"";return K.emDelimiter+G+K.emDelimiter}};q.strong={filter:["strong","b"],replacement:function(G,J,K){if(!G.trim())return"";return K.strongDelimiter+G+K.strongDelimiter}};q.code={filter:function(G){var J=G.previousSibling||G.nextSibling,K=G.parentNode.nodeName==="PRE"&&!J;return G.nodeName==="CODE"&&!K},replacement:function(G){if(!G)return"";G=G.replace(/\r?\n|\r/g," ");var J=/^`|^ .*?[^ ].* $|`$/.test(G)?" ":"",K="`",Q=G.match(/`+/gm)||[];while(Q.indexOf(K)!==-1)K=K+"`";return K+J+G+J+K}};q.image={filter:"img",replacement:function(G,J){var K=X(J.getAttribute("alt")),Q=J.getAttribute("src")||"",Y=X(J.getAttribute("title")),Z=Y?' "'+Y+'"':"";return Q?"!["+K+"]("+Q+Z+")":""}};function X(G){return G?G.replace(/(\n+\s*)+/g,`
`):""}function N(G){this.options=G,this._keep=[],this._remove=[],this.blankRule={replacement:G.blankReplacement},this.keepReplacement=G.keepReplacement,this.defaultRule={replacement:G.defaultReplacement},this.array=[];for(var J in G.rules)this.array.push(G.rules[J])}N.prototype={add:function(G,J){this.array.unshift(J)},keep:function(G){this._keep.unshift({filter:G,replacement:this.keepReplacement})},remove:function(G){this._remove.unshift({filter:G,replacement:function(){return""}})},forNode:function(G){if(G.isBlank)return this.blankRule;var J;if(J=H(this.array,G,this.options))return J;if(J=H(this._keep,G,this.options))return J;if(J=H(this._remove,G,this.options))return J;return this.defaultRule},forEach:function(G){for(var J=0;J<this.array.length;J++)G(this.array[J],J)}};function H(G,J,K){for(var Q=0;Q<G.length;Q++){var Y=G[Q];if(l(Y,J,K))return Y}return}function l(G,J,K){var Q=G.filter;if(typeof Q==="string"){if(Q===J.nodeName.toLowerCase())return!0}else if(Array.isArray(Q)){if(Q.indexOf(J.nodeName.toLowerCase())>-1)return!0}else if(typeof Q==="function"){if(Q.call(G,J,K))return!0}else throw new TypeError("`filter` needs to be a string, array, or function")}function c(G){var{element:J,isBlock:K,isVoid:Q}=G,Y=G.isPre||function(v){return v.nodeName==="PRE"};if(!J.firstChild||Y(J))return;var Z=null,I=!1,U=null,$=L(U,J,Y);while($!==J){if($.nodeType===3||$.nodeType===4){var O=$.data.replace(/[ \r\n\t]+/g," ");if((!Z||/ $/.test(Z.data))&&!I&&O[0]===" ")O=O.substr(1);if(!O){$=V($);continue}$.data=O,Z=$}else if($.nodeType===1){if(K($)||$.nodeName==="BR"){if(Z)Z.data=Z.data.replace(/ $/,"");Z=null,I=!1}else if(Q($)||Y($))Z=null,I=!0;else if(Z)I=!1}else{$=V($);continue}var D=L(U,$,Y);U=$,$=D}if(Z){if(Z.data=Z.data.replace(/ $/,""),!Z.data)V(Z)}}function V(G){var J=G.nextSibling||G.parentNode;return G.parentNode.removeChild(G),J}function L(G,J,K){if(G&&G.parentNode===J||K(J))return J.nextSibling||J.parentNode;return J.firstChild||J.nextSibling||J.parentNode}var A=typeof window!=="undefined"?window:{};function p(){var G=A.DOMParser,J=!1;try{if(new G().parseFromString("","text/html"))J=!0}catch(K){}return J}function s(){var G=function(){};if(r())G.prototype.parseFromString=function(J){var K=new window.ActiveXObject("htmlfile");return K.designMode="on",K.open(),K.write(J),K.close(),K};else G.prototype.parseFromString=function(J){var K=document.implementation.createHTMLDocument("");return K.open(),K.write(J),K.close(),K};return G}function r(){var G=!1;try{document.implementation.createHTMLDocument("").open()}catch(J){if(A.ActiveXObject)G=!0}return G}var d=p()?A.DOMParser:s();function i(G,J){var K;if(typeof G==="string"){var Q=o().parseFromString('<x-turndown id="turndown-root">'+G+"</x-turndown>","text/html");K=Q.getElementById("turndown-root")}else K=G.cloneNode(!0);return c({element:K,isBlock:F,isVoid:y,isPre:J.preformattedCode?t:null}),K}var M;function o(){return M=M||new d,M}function t(G){return G.nodeName==="PRE"||G.nodeName==="CODE"}function n(G,J){return G.isBlock=F(G),G.isCode=G.nodeName==="CODE"||G.parentNode.isCode,G.isBlank=e(G),G.flankingWhitespace=GG(G,J),G}function e(G){return!y(G)&&!a(G)&&/^\s*$/i.test(G.textContent)&&!g(G)&&!u(G)}function GG(G,J){if(G.isBlock||J.preformattedCode&&G.isCode)return{leading:"",trailing:""};var K=JG(G.textContent);if(K.leadingAscii&&B("left",G,J))K.leading=K.leadingNonAscii;if(K.trailingAscii&&B("right",G,J))K.trailing=K.trailingNonAscii;return{leading:K.leading,trailing:K.trailing}}function JG(G){var J=G.match(/^(([ \t\r\n]*)(\s*))(?:(?=\S)[\s\S]*\S)?((\s*?)([ \t\r\n]*))$/);return{leading:J[1],leadingAscii:J[2],leadingNonAscii:J[3],trailing:J[4],trailingNonAscii:J[5],trailingAscii:J[6]}}function B(G,J,K){var Q,Y,Z;if(G==="left")Q=J.previousSibling,Y=/ $/;else Q=J.nextSibling,Y=/^ /;if(Q){if(Q.nodeType===3)Z=Y.test(Q.nodeValue);else if(K.preformattedCode&&Q.nodeName==="CODE")Z=!1;else if(Q.nodeType===1&&!F(Q))Z=Y.test(Q.textContent)}return Z}var KG=Array.prototype.reduce,QG=[[/\\/g,"\\\\"],[/\*/g,"\\*"],[/^-/g,"\\-"],[/^\+ /g,"\\+ "],[/^(=+)/g,"\\$1"],[/^(#{1,6}) /g,"\\$1 "],[/`/g,"\\`"],[/^~~~/g,"\\~~~"],[/\[/g,"\\["],[/\]/g,"\\]"],[/^>/g,"\\>"],[/_/g,"\\_"],[/^(\d+)\. /g,"$1\\. "]];function _(G){if(!(this instanceof _))return new _(G);var J={rules:q,headingStyle:"setext",hr:"* * *",bulletListMarker:"*",codeBlockStyle:"indented",fence:"```",emDelimiter:"_",strongDelimiter:"**",linkStyle:"inlined",linkReferenceStyle:"full",br:"  ",preformattedCode:!1,blankReplacement:function(K,Q){return Q.isBlock?`

`:""},keepReplacement:function(K,Q){return Q.isBlock?`

`+Q.outerHTML+`

`:Q.outerHTML},defaultReplacement:function(K,Q){return Q.isBlock?`

`+K+`

`:K}};this.options=h({},J,G),this.rules=new N(this.options)}_.prototype={turndown:function(G){if(!$G(G))throw new TypeError(G+" is not a string, or an element/document/fragment node.");if(G==="")return"";var J=w.call(this,new i(G,this.options));return YG.call(this,J)},use:function(G){if(Array.isArray(G))for(var J=0;J<G.length;J++)this.use(G[J]);else if(typeof G==="function")G(this);else throw new TypeError("plugin must be a Function or an Array of Functions");return this},addRule:function(G,J){return this.rules.add(G,J),this},keep:function(G){return this.rules.keep(G),this},remove:function(G){return this.rules.remove(G),this},escape:function(G){return QG.reduce(function(J,K){return J.replace(K[0],K[1])},G)}};function w(G){var J=this;return KG.call(G.childNodes,function(K,Q){Q=new n(Q,J.options);var Y="";if(Q.nodeType===3)Y=Q.isCode?Q.nodeValue:J.escape(Q.nodeValue);else if(Q.nodeType===1)Y=ZG.call(J,Q);return P(K,Y)},"")}function YG(G){var J=this;return this.rules.forEach(function(K){if(typeof K.append==="function")G=P(G,K.append(J.options))}),G.replace(/^[\t\r\n]+/,"").replace(/[\t\r\n\s]+$/,"")}function ZG(G){var J=this.rules.forNode(G),K=w.call(this,G),Q=G.flankingWhitespace;if(Q.leading||Q.trailing)K=K.trim();return Q.leading+J.replacement(K,G,this.options)+Q.trailing}function P(G,J){var K=f(G),Q=x(J),Y=Math.max(G.length-K.length,J.length-Q.length),Z=`

`.substring(0,Y);return K+Z+Q}function $G(G){return G!=null&&(typeof G==="string"||G.nodeType&&(G.nodeType===1||G.nodeType===9||G.nodeType===11))}var T=_;var qG=new T,b=document.title,IG=new Date,UG=IG.toISOString().slice(0,10),OG=document.querySelector("article")||document.querySelector("main")||document.body,jG=OG?.innerHTML??"",zG=qG.turndown(jG),DG=new Blob([`# ${b}

${zG}`],{type:"text/markdown"}),k=URL.createObjectURL(DG),z=b.replace(/[^a-z0-9]/gi,"_").toLowerCase();z=z.replace(/_+/g,"_");z=`${UG}_${z}.md`;var j=document.createElement("a");j.href=k;j.download=z;j.style.display="none";document.body.appendChild(j);j.click();j.remove();URL.revokeObjectURL(k);

//# debugId=FC92B4EDC3CDB93064756E2164756E21
//# sourceMappingURL=content.js.map
