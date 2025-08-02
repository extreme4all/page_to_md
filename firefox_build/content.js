function v(U){for(var q=1;q<arguments.length;q++){var $=arguments[q];for(var j in $)if($.hasOwnProperty(j))U[j]=$[j]}return U}function R(U,q){return Array(q+1).join(U)}function h(U){return U.replace(/^\n*/,"")}function m(U){var q=U.length;while(q>0&&U[q-1]===`
`)q--;return U.substring(0,q)}var x=["ADDRESS","ARTICLE","ASIDE","AUDIO","BLOCKQUOTE","BODY","CANVAS","CENTER","DD","DIR","DIV","DL","DT","FIELDSET","FIGCAPTION","FIGURE","FOOTER","FORM","FRAMESET","H1","H2","H3","H4","H5","H6","HEADER","HGROUP","HR","HTML","ISINDEX","LI","MAIN","MENU","NAV","NOFRAMES","NOSCRIPT","OL","OUTPUT","P","PRE","SECTION","TABLE","TBODY","TD","TFOOT","TH","THEAD","TR","UL"];function X(U){return M(U,x)}var y=["AREA","BASE","BR","COL","COMMAND","EMBED","HR","IMG","INPUT","KEYGEN","LINK","META","PARAM","SOURCE","TRACK","WBR"];function A(U){return M(U,y)}function f(U){return B(U,y)}var S=["A","TABLE","THEAD","TBODY","TFOOT","TH","TD","IFRAME","SCRIPT","AUDIO","VIDEO"];function g(U){return M(U,S)}function a(U){return B(U,S)}function M(U,q){return q.indexOf(U.nodeName)>=0}function B(U,q){return U.getElementsByTagName&&q.some(function($){return U.getElementsByTagName($).length})}var O={};O.paragraph={filter:"p",replacement:function(U){return`

`+U+`

`}};O.lineBreak={filter:"br",replacement:function(U,q,$){return $.br+`
`}};O.heading={filter:["h1","h2","h3","h4","h5","h6"],replacement:function(U,q,$){var j=Number(q.nodeName.charAt(1));if($.headingStyle==="setext"&&j<3){var G=R(j===1?"=":"-",U.length);return`

`+U+`
`+G+`

`}else return`

`+R("#",j)+" "+U+`

`}};O.blockquote={filter:"blockquote",replacement:function(U){return U=U.replace(/^\n+|\n+$/g,""),U=U.replace(/^/gm,"> "),`

`+U+`

`}};O.list={filter:["ul","ol"],replacement:function(U,q){var $=q.parentNode;if($.nodeName==="LI"&&$.lastElementChild===q)return`
`+U;else return`

`+U+`

`}};O.listItem={filter:"li",replacement:function(U,q,$){U=U.replace(/^\n+/,"").replace(/\n+$/,`
`).replace(/\n/gm,`
    `);var j=$.bulletListMarker+"   ",G=q.parentNode;if(G.nodeName==="OL"){var J=G.getAttribute("start"),Q=Array.prototype.indexOf.call(G.children,q);j=(J?Number(J)+Q:Q+1)+".  "}return j+U+(q.nextSibling&&!/\n$/.test(U)?`
`:"")}};O.indentedCodeBlock={filter:function(U,q){return q.codeBlockStyle==="indented"&&U.nodeName==="PRE"&&U.firstChild&&U.firstChild.nodeName==="CODE"},replacement:function(U,q,$){return`

    `+q.firstChild.textContent.replace(/\n/g,`
    `)+`

`}};O.fencedCodeBlock={filter:function(U,q){return q.codeBlockStyle==="fenced"&&U.nodeName==="PRE"&&U.firstChild&&U.firstChild.nodeName==="CODE"},replacement:function(U,q,$){var j=q.firstChild.getAttribute("class")||"",G=(j.match(/language-(\S+)/)||[null,""])[1],J=q.firstChild.textContent,Q=$.fence.charAt(0),Y=3,K=new RegExp("^"+Q+"{3,}","gm"),Z;while(Z=K.exec(J))if(Z[0].length>=Y)Y=Z[0].length+1;var z=R(Q,Y);return`

`+z+G+`
`+J.replace(/\n$/,"")+`
`+z+`

`}};O.horizontalRule={filter:"hr",replacement:function(U,q,$){return`

`+$.hr+`

`}};O.inlineLink={filter:function(U,q){return q.linkStyle==="inlined"&&U.nodeName==="A"&&U.getAttribute("href")},replacement:function(U,q){var $=q.getAttribute("href");if($)$=$.replace(/([()])/g,"\\$1");var j=_(q.getAttribute("title"));if(j)j=' "'+j.replace(/"/g,"\\\"")+'"';return"["+U+"]("+$+j+")"}};O.referenceLink={filter:function(U,q){return q.linkStyle==="referenced"&&U.nodeName==="A"&&U.getAttribute("href")},replacement:function(U,q,$){var j=q.getAttribute("href"),G=_(q.getAttribute("title"));if(G)G=' "'+G+'"';var J,Q;switch($.linkReferenceStyle){case"collapsed":J="["+U+"][]",Q="["+U+"]: "+j+G;break;case"shortcut":J="["+U+"]",Q="["+U+"]: "+j+G;break;default:var Y=this.references.length+1;J="["+U+"]["+Y+"]",Q="["+Y+"]: "+j+G}return this.references.push(Q),J},references:[],append:function(U){var q="";if(this.references.length)q=`

`+this.references.join(`
`)+`

`,this.references=[];return q}};O.emphasis={filter:["em","i"],replacement:function(U,q,$){if(!U.trim())return"";return $.emDelimiter+U+$.emDelimiter}};O.strong={filter:["strong","b"],replacement:function(U,q,$){if(!U.trim())return"";return $.strongDelimiter+U+$.strongDelimiter}};O.code={filter:function(U){var q=U.previousSibling||U.nextSibling,$=U.parentNode.nodeName==="PRE"&&!q;return U.nodeName==="CODE"&&!$},replacement:function(U){if(!U)return"";U=U.replace(/\r?\n|\r/g," ");var q=/^`|^ .*?[^ ].* $|`$/.test(U)?" ":"",$="`",j=U.match(/`+/gm)||[];while(j.indexOf($)!==-1)$=$+"`";return $+q+U+q+$}};O.image={filter:"img",replacement:function(U,q){var $=_(q.getAttribute("alt")),j=q.getAttribute("src")||"",G=_(q.getAttribute("title")),J=G?' "'+G+'"':"";return j?"!["+$+"]("+j+J+")":""}};function _(U){return U?U.replace(/(\n+\s*)+/g,`
`):""}function E(U){this.options=U,this._keep=[],this._remove=[],this.blankRule={replacement:U.blankReplacement},this.keepReplacement=U.keepReplacement,this.defaultRule={replacement:U.defaultReplacement},this.array=[];for(var q in U.rules)this.array.push(U.rules[q])}E.prototype={add:function(U,q){this.array.unshift(q)},keep:function(U){this._keep.unshift({filter:U,replacement:this.keepReplacement})},remove:function(U){this._remove.unshift({filter:U,replacement:function(){return""}})},forNode:function(U){if(U.isBlank)return this.blankRule;var q;if(q=C(this.array,U,this.options))return q;if(q=C(this._keep,U,this.options))return q;if(q=C(this._remove,U,this.options))return q;return this.defaultRule},forEach:function(U){for(var q=0;q<this.array.length;q++)U(this.array[q],q)}};function C(U,q,$){for(var j=0;j<U.length;j++){var G=U[j];if(u(G,q,$))return G}return}function u(U,q,$){var j=U.filter;if(typeof j==="string"){if(j===q.nodeName.toLowerCase())return!0}else if(Array.isArray(j)){if(j.indexOf(q.nodeName.toLowerCase())>-1)return!0}else if(typeof j==="function"){if(j.call(U,q,$))return!0}else throw new TypeError("`filter` needs to be a string, array, or function")}function l(U){var{element:q,isBlock:$,isVoid:j}=U,G=U.isPre||function(k){return k.nodeName==="PRE"};if(!q.firstChild||G(q))return;var J=null,Q=!1,Y=null,K=L(Y,q,G);while(K!==q){if(K.nodeType===3||K.nodeType===4){var Z=K.data.replace(/[ \r\n\t]+/g," ");if((!J||/ $/.test(J.data))&&!Q&&Z[0]===" ")Z=Z.substr(1);if(!Z){K=D(K);continue}K.data=Z,J=K}else if(K.nodeType===1){if($(K)||K.nodeName==="BR"){if(J)J.data=J.data.replace(/ $/,"");J=null,Q=!1}else if(j(K)||G(K))J=null,Q=!0;else if(J)Q=!1}else{K=D(K);continue}var z=L(Y,K,G);Y=K,K=z}if(J){if(J.data=J.data.replace(/ $/,""),!J.data)D(J)}}function D(U){var q=U.nextSibling||U.parentNode;return U.parentNode.removeChild(U),q}function L(U,q,$){if(U&&U.parentNode===q||$(q))return q.nextSibling||q.parentNode;return q.firstChild||q.nextSibling||q.parentNode}var V=typeof window!=="undefined"?window:{};function c(){var U=V.DOMParser,q=!1;try{if(new U().parseFromString("","text/html"))q=!0}catch($){}return q}function p(){var U=function(){};if(s())U.prototype.parseFromString=function(q){var $=new window.ActiveXObject("htmlfile");return $.designMode="on",$.open(),$.write(q),$.close(),$};else U.prototype.parseFromString=function(q){var $=document.implementation.createHTMLDocument("");return $.open(),$.write(q),$.close(),$};return U}function s(){var U=!1;try{document.implementation.createHTMLDocument("").open()}catch(q){if(V.ActiveXObject)U=!0}return U}var r=c()?V.DOMParser:p();function d(U,q){var $;if(typeof U==="string"){var j=i().parseFromString('<x-turndown id="turndown-root">'+U+"</x-turndown>","text/html");$=j.getElementById("turndown-root")}else $=U.cloneNode(!0);return l({element:$,isBlock:X,isVoid:A,isPre:q.preformattedCode?o:null}),$}var H;function i(){return H=H||new r,H}function o(U){return U.nodeName==="PRE"||U.nodeName==="CODE"}function t(U,q){return U.isBlock=X(U),U.isCode=U.nodeName==="CODE"||U.parentNode.isCode,U.isBlank=n(U),U.flankingWhitespace=e(U,q),U}function n(U){return!A(U)&&!g(U)&&/^\s*$/i.test(U.textContent)&&!f(U)&&!a(U)}function e(U,q){if(U.isBlock||q.preformattedCode&&U.isCode)return{leading:"",trailing:""};var $=UU(U.textContent);if($.leadingAscii&&F("left",U,q))$.leading=$.leadingNonAscii;if($.trailingAscii&&F("right",U,q))$.trailing=$.trailingNonAscii;return{leading:$.leading,trailing:$.trailing}}function UU(U){var q=U.match(/^(([ \t\r\n]*)(\s*))(?:(?=\S)[\s\S]*\S)?((\s*?)([ \t\r\n]*))$/);return{leading:q[1],leadingAscii:q[2],leadingNonAscii:q[3],trailing:q[4],trailingNonAscii:q[5],trailingAscii:q[6]}}function F(U,q,$){var j,G,J;if(U==="left")j=q.previousSibling,G=/ $/;else j=q.nextSibling,G=/^ /;if(j){if(j.nodeType===3)J=G.test(j.nodeValue);else if($.preformattedCode&&j.nodeName==="CODE")J=!1;else if(j.nodeType===1&&!X(j))J=G.test(j.textContent)}return J}var qU=Array.prototype.reduce,$U=[[/\\/g,"\\\\"],[/\*/g,"\\*"],[/^-/g,"\\-"],[/^\+ /g,"\\+ "],[/^(=+)/g,"\\$1"],[/^(#{1,6}) /g,"\\$1 "],[/`/g,"\\`"],[/^~~~/g,"\\~~~"],[/\[/g,"\\["],[/\]/g,"\\]"],[/^>/g,"\\>"],[/_/g,"\\_"],[/^(\d+)\. /g,"$1\\. "]];function w(U){if(!(this instanceof w))return new w(U);var q={rules:O,headingStyle:"setext",hr:"* * *",bulletListMarker:"*",codeBlockStyle:"indented",fence:"```",emDelimiter:"_",strongDelimiter:"**",linkStyle:"inlined",linkReferenceStyle:"full",br:"  ",preformattedCode:!1,blankReplacement:function($,j){return j.isBlock?`

`:""},keepReplacement:function($,j){return j.isBlock?`

`+j.outerHTML+`

`:j.outerHTML},defaultReplacement:function($,j){return j.isBlock?`

`+$+`

`:$}};this.options=v({},q,U),this.rules=new E(this.options)}w.prototype={turndown:function(U){if(!JU(U))throw new TypeError(U+" is not a string, or an element/document/fragment node.");if(U==="")return"";var q=W.call(this,new d(U,this.options));return jU.call(this,q)},use:function(U){if(Array.isArray(U))for(var q=0;q<U.length;q++)this.use(U[q]);else if(typeof U==="function")U(this);else throw new TypeError("plugin must be a Function or an Array of Functions");return this},addRule:function(U,q){return this.rules.add(U,q),this},keep:function(U){return this.rules.keep(U),this},remove:function(U){return this.rules.remove(U),this},escape:function(U){return $U.reduce(function(q,$){return q.replace($[0],$[1])},U)}};function W(U){var q=this;return qU.call(U.childNodes,function($,j){j=new t(j,q.options);var G="";if(j.nodeType===3)G=j.isCode?j.nodeValue:q.escape(j.nodeValue);else if(j.nodeType===1)G=GU.call(q,j);return b($,G)},"")}function jU(U){var q=this;return this.rules.forEach(function($){if(typeof $.append==="function")U=b(U,$.append(q.options))}),U.replace(/^[\t\r\n]+/,"").replace(/[\t\r\n\s]+$/,"")}function GU(U){var q=this.rules.forNode(U),$=W.call(this,U),j=U.flankingWhitespace;if(j.leading||j.trailing)$=$.trim();return j.leading+q.replacement($,U,this.options)+j.trailing}function b(U,q){var $=m(U),j=h(q),G=Math.max(U.length-$.length,q.length-j.length),J=`

`.substring(0,G);return $+J+j}function JU(U){return U!=null&&(typeof U==="string"||U.nodeType&&(U.nodeType===1||U.nodeType===9||U.nodeType===11))}var N=w;console.log("content.js injected");var KU=new N,T=document.title,OU=document.querySelector("article")||document.querySelector("main")||document.body,QU=OU.innerHTML,YU=KU.turndown(QU),ZU=new Blob([`# ${T}

${YU}`],{type:"text/markdown"}),P=URL.createObjectURL(ZU),IU=T.replace(/[^a-z0-9]/gi,"_").toLowerCase()+".md",I=document.createElement("a");I.href=P;I.download=IU;I.style.display="none";document.body.appendChild(I);I.click();I.remove();URL.revokeObjectURL(P);

//# debugId=28204F739C16628F64756E2164756E21
//# sourceMappingURL=content.js.map
