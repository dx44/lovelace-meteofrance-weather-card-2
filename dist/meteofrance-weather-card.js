/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const e="undefined"!=typeof window&&null!=window.customElements&&void 0!==window.customElements.polyfillWrapFlushCallback,t=(e,t,n=null)=>{for(;t!==n;){const n=t.nextSibling;e.removeChild(t),t=n}},n=`{{lit-${String(Math.random()).slice(2)}}}`,i=`\x3c!--${n}--\x3e`,r=new RegExp(`${n}|${i}`);class s{constructor(e,t){this.parts=[],this.element=t;const i=[],s=[],a=document.createTreeWalker(t.content,133,null,!1);let h=0,u=-1,d=0;const{strings:p,values:{length:g}}=e;for(;d<g;){const e=a.nextNode();if(null!==e){if(u++,1===e.nodeType){if(e.hasAttributes()){const t=e.attributes,{length:n}=t;let i=0;for(let e=0;e<n;e++)o(t[e].name,"$lit$")&&i++;for(;i-- >0;){const t=p[d],n=c.exec(t)[2],i=n.toLowerCase()+"$lit$",s=e.getAttribute(i);e.removeAttribute(i);const o=s.split(r);this.parts.push({type:"attribute",index:u,name:n,strings:o}),d+=o.length-1}}"TEMPLATE"===e.tagName&&(s.push(e),a.currentNode=e.content)}else if(3===e.nodeType){const t=e.data;if(t.indexOf(n)>=0){const n=e.parentNode,s=t.split(r),a=s.length-1;for(let t=0;t<a;t++){let i,r=s[t];if(""===r)i=l();else{const e=c.exec(r);null!==e&&o(e[2],"$lit$")&&(r=r.slice(0,e.index)+e[1]+e[2].slice(0,-"$lit$".length)+e[3]),i=document.createTextNode(r)}n.insertBefore(i,e),this.parts.push({type:"node",index:++u})}""===s[a]?(n.insertBefore(l(),e),i.push(e)):e.data=s[a],d+=a}}else if(8===e.nodeType)if(e.data===n){const t=e.parentNode;null!==e.previousSibling&&u!==h||(u++,t.insertBefore(l(),e)),h=u,this.parts.push({type:"node",index:u}),null===e.nextSibling?e.data="":(i.push(e),u--),d++}else{let t=-1;for(;-1!==(t=e.data.indexOf(n,t+1));)this.parts.push({type:"node",index:-1}),d++}}else a.currentNode=s.pop()}for(const e of i)e.parentNode.removeChild(e)}}const o=(e,t)=>{const n=e.length-t.length;return n>=0&&e.slice(n)===t},a=e=>-1!==e.index,l=()=>document.createComment(""),c=/([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;function h(e,t){const{element:{content:n},parts:i}=e,r=document.createTreeWalker(n,133,null,!1);let s=d(i),o=i[s],a=-1,l=0;const c=[];let h=null;for(;r.nextNode();){a++;const e=r.currentNode;for(e.previousSibling===h&&(h=null),t.has(e)&&(c.push(e),null===h&&(h=e)),null!==h&&l++;void 0!==o&&o.index===a;)o.index=null!==h?-1:o.index-l,s=d(i,s),o=i[s]}c.forEach(e=>e.parentNode.removeChild(e))}const u=e=>{let t=11===e.nodeType?0:1;const n=document.createTreeWalker(e,133,null,!1);for(;n.nextNode();)t++;return t},d=(e,t=-1)=>{for(let n=t+1;n<e.length;n++){const t=e[n];if(a(t))return n}return-1};
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const p=new WeakMap,g=e=>"function"==typeof e&&p.has(e),m={},f={};
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
class y{constructor(e,t,n){this.__parts=[],this.template=e,this.processor=t,this.options=n}update(e){let t=0;for(const n of this.__parts)void 0!==n&&n.setValue(e[t]),t++;for(const e of this.__parts)void 0!==e&&e.commit()}_clone(){const t=e?this.template.element.content.cloneNode(!0):document.importNode(this.template.element.content,!0),n=[],i=this.template.parts,r=document.createTreeWalker(t,133,null,!1);let s,o=0,l=0,c=r.nextNode();for(;o<i.length;)if(s=i[o],a(s)){for(;l<s.index;)l++,"TEMPLATE"===c.nodeName&&(n.push(c),r.currentNode=c.content),null===(c=r.nextNode())&&(r.currentNode=n.pop(),c=r.nextNode());if("node"===s.type){const e=this.processor.handleTextExpression(this.options);e.insertAfterNode(c.previousSibling),this.__parts.push(e)}else this.__parts.push(...this.processor.handleAttributeExpressions(c,s.name,s.strings,this.options));o++}else this.__parts.push(void 0),o++;return e&&(document.adoptNode(t),customElements.upgrade(t)),t}}
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */const _=window.trustedTypes&&trustedTypes.createPolicy("lit-html",{createHTML:e=>e}),w=` ${n} `;class v{constructor(e,t,n,i){this.strings=e,this.values=t,this.type=n,this.processor=i}getHTML(){const e=this.strings.length-1;let t="",r=!1;for(let s=0;s<e;s++){const e=this.strings[s],o=e.lastIndexOf("\x3c!--");r=(o>-1||r)&&-1===e.indexOf("--\x3e",o+1);const a=c.exec(e);t+=null===a?e+(r?w:i):e.substr(0,a.index)+a[1]+a[2]+"$lit$"+a[3]+n}return t+=this.strings[e],t}getTemplateElement(){const e=document.createElement("template");let t=this.getHTML();return void 0!==_&&(t=_.createHTML(t)),e.innerHTML=t,e}}
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */const S=e=>null===e||!("object"==typeof e||"function"==typeof e),b=e=>Array.isArray(e)||!(!e||!e[Symbol.iterator]);class x{constructor(e,t,n){this.dirty=!0,this.element=e,this.name=t,this.strings=n,this.parts=[];for(let e=0;e<n.length-1;e++)this.parts[e]=this._createPart()}_createPart(){return new E(this)}_getValue(){const e=this.strings,t=e.length-1,n=this.parts;if(1===t&&""===e[0]&&""===e[1]){const e=n[0].value;if("symbol"==typeof e)return String(e);if("string"==typeof e||!b(e))return e}let i="";for(let r=0;r<t;r++){i+=e[r];const t=n[r];if(void 0!==t){const e=t.value;if(S(e)||!b(e))i+="string"==typeof e?e:String(e);else for(const t of e)i+="string"==typeof t?t:String(t)}}return i+=e[t],i}commit(){this.dirty&&(this.dirty=!1,this.element.setAttribute(this.name,this._getValue()))}}class E{constructor(e){this.value=void 0,this.committer=e}setValue(e){e===m||S(e)&&e===this.value||(this.value=e,g(e)||(this.committer.dirty=!0))}commit(){for(;g(this.value);){const e=this.value;this.value=m,e(this)}this.value!==m&&this.committer.commit()}}class C{constructor(e){this.value=void 0,this.__pendingValue=void 0,this.options=e}appendInto(e){this.startNode=e.appendChild(l()),this.endNode=e.appendChild(l())}insertAfterNode(e){this.startNode=e,this.endNode=e.nextSibling}appendIntoPart(e){e.__insert(this.startNode=l()),e.__insert(this.endNode=l())}insertAfterPart(e){e.__insert(this.startNode=l()),this.endNode=e.endNode,e.endNode=this.startNode}setValue(e){this.__pendingValue=e}commit(){if(null===this.startNode.parentNode)return;for(;g(this.__pendingValue);){const e=this.__pendingValue;this.__pendingValue=m,e(this)}const e=this.__pendingValue;e!==m&&(S(e)?e!==this.value&&this.__commitText(e):e instanceof v?this.__commitTemplateResult(e):e instanceof Node?this.__commitNode(e):b(e)?this.__commitIterable(e):e===f?(this.value=f,this.clear()):this.__commitText(e))}__insert(e){this.endNode.parentNode.insertBefore(e,this.endNode)}__commitNode(e){this.value!==e&&(this.clear(),this.__insert(e),this.value=e)}__commitText(e){const t=this.startNode.nextSibling,n="string"==typeof(e=null==e?"":e)?e:String(e);t===this.endNode.previousSibling&&3===t.nodeType?t.data=n:this.__commitNode(document.createTextNode(n)),this.value=e}__commitTemplateResult(e){const t=this.options.templateFactory(e);if(this.value instanceof y&&this.value.template===t)this.value.update(e.values);else{const n=new y(t,e.processor,this.options),i=n._clone();n.update(e.values),this.__commitNode(i),this.value=n}}__commitIterable(e){Array.isArray(this.value)||(this.value=[],this.clear());const t=this.value;let n,i=0;for(const r of e)n=t[i],void 0===n&&(n=new C(this.options),t.push(n),0===i?n.appendIntoPart(this):n.insertAfterPart(t[i-1])),n.setValue(r),n.commit(),i++;i<t.length&&(t.length=i,this.clear(n&&n.endNode))}clear(e=this.startNode){t(this.startNode.parentNode,e.nextSibling,this.endNode)}}class P{constructor(e,t,n){if(this.value=void 0,this.__pendingValue=void 0,2!==n.length||""!==n[0]||""!==n[1])throw new Error("Boolean attributes can only contain a single expression");this.element=e,this.name=t,this.strings=n}setValue(e){this.__pendingValue=e}commit(){for(;g(this.__pendingValue);){const e=this.__pendingValue;this.__pendingValue=m,e(this)}if(this.__pendingValue===m)return;const e=!!this.__pendingValue;this.value!==e&&(e?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name),this.value=e),this.__pendingValue=m}}class $ extends x{constructor(e,t,n){super(e,t,n),this.single=2===n.length&&""===n[0]&&""===n[1]}_createPart(){return new N(this)}_getValue(){return this.single?this.parts[0].value:super._getValue()}commit(){this.dirty&&(this.dirty=!1,this.element[this.name]=this._getValue())}}class N extends E{}let M=!1;(()=>{try{const e={get capture(){return M=!0,!1}};window.addEventListener("test",e,e),window.removeEventListener("test",e,e)}catch(e){}})();class T{constructor(e,t,n){this.value=void 0,this.__pendingValue=void 0,this.element=e,this.eventName=t,this.eventContext=n,this.__boundHandleEvent=e=>this.handleEvent(e)}setValue(e){this.__pendingValue=e}commit(){for(;g(this.__pendingValue);){const e=this.__pendingValue;this.__pendingValue=m,e(this)}if(this.__pendingValue===m)return;const e=this.__pendingValue,t=this.value,n=null==e||null!=t&&(e.capture!==t.capture||e.once!==t.once||e.passive!==t.passive),i=null!=e&&(null==t||n);n&&this.element.removeEventListener(this.eventName,this.__boundHandleEvent,this.__options),i&&(this.__options=D(e),this.element.addEventListener(this.eventName,this.__boundHandleEvent,this.__options)),this.value=e,this.__pendingValue=m}handleEvent(e){"function"==typeof this.value?this.value.call(this.eventContext||this.element,e):this.value.handleEvent(e)}}const D=e=>e&&(M?{capture:e.capture,passive:e.passive,once:e.once}:e.capture)
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */;function O(e){let t=A.get(e.type);void 0===t&&(t={stringsArray:new WeakMap,keyString:new Map},A.set(e.type,t));let i=t.stringsArray.get(e.strings);if(void 0!==i)return i;const r=e.strings.join(n);return i=t.keyString.get(r),void 0===i&&(i=new s(e,e.getTemplateElement()),t.keyString.set(r,i)),t.stringsArray.set(e.strings,i),i}const A=new Map,k=new WeakMap;
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */const H=new
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
class{handleAttributeExpressions(e,t,n,i){const r=t[0];if("."===r){return new $(e,t.slice(1),n).parts}if("@"===r)return[new T(e,t.slice(1),i.eventContext)];if("?"===r)return[new P(e,t.slice(1),n)];return new x(e,t,n).parts}handleTextExpression(e){return new C(e)}};
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */"undefined"!=typeof window&&(window.litHtmlVersions||(window.litHtmlVersions=[])).push("1.3.0");const F=(e,...t)=>new v(e,t,"html",H)
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */,V=(e,t)=>`${e}--${t}`;let U=!0;void 0===window.ShadyCSS?U=!1:void 0===window.ShadyCSS.prepareTemplateDom&&(console.warn("Incompatible ShadyCSS version detected. Please update to at least @webcomponents/webcomponentsjs@2.0.2 and @webcomponents/shadycss@1.3.1."),U=!1);const R=e=>t=>{const i=V(t.type,e);let r=A.get(i);void 0===r&&(r={stringsArray:new WeakMap,keyString:new Map},A.set(i,r));let o=r.stringsArray.get(t.strings);if(void 0!==o)return o;const a=t.strings.join(n);if(o=r.keyString.get(a),void 0===o){const n=t.getTemplateElement();U&&window.ShadyCSS.prepareTemplateDom(n,e),o=new s(t,n),r.keyString.set(a,o)}return r.stringsArray.set(t.strings,o),o},Y=["html","svg"],z=new Set,L=(e,t,n)=>{z.add(e);const i=n?n.element:document.createElement("template"),r=t.querySelectorAll("style"),{length:s}=r;if(0===s)return void window.ShadyCSS.prepareTemplateStyles(i,e);const o=document.createElement("style");for(let e=0;e<s;e++){const t=r[e];t.parentNode.removeChild(t),o.textContent+=t.textContent}(e=>{Y.forEach(t=>{const n=A.get(V(t,e));void 0!==n&&n.keyString.forEach(e=>{const{element:{content:t}}=e,n=new Set;Array.from(t.querySelectorAll("style")).forEach(e=>{n.add(e)}),h(e,n)})})})(e);const a=i.content;n?function(e,t,n=null){const{element:{content:i},parts:r}=e;if(null==n)return void i.appendChild(t);const s=document.createTreeWalker(i,133,null,!1);let o=d(r),a=0,l=-1;for(;s.nextNode();){l++;for(s.currentNode===n&&(a=u(t),n.parentNode.insertBefore(t,n));-1!==o&&r[o].index===l;){if(a>0){for(;-1!==o;)r[o].index+=a,o=d(r,o);return}o=d(r,o)}}}(n,o,a.firstChild):a.insertBefore(o,a.firstChild),window.ShadyCSS.prepareTemplateStyles(i,e);const l=a.querySelector("style");if(window.ShadyCSS.nativeShadow&&null!==l)t.insertBefore(l.cloneNode(!0),t.firstChild);else if(n){a.insertBefore(o,a.firstChild);const e=new Set;e.add(o),h(n,e)}};window.JSCompiler_renameProperty=(e,t)=>e;const j={toAttribute(e,t){switch(t){case Boolean:return e?"":null;case Object:case Array:return null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){switch(t){case Boolean:return null!==e;case Number:return null===e?null:Number(e);case Object:case Array:return JSON.parse(e)}return e}},I=(e,t)=>t!==e&&(t==t||e==e),q={attribute:!0,type:String,converter:j,reflect:!1,hasChanged:I};class W extends HTMLElement{constructor(){super(),this.initialize()}static get observedAttributes(){this.finalize();const e=[];return this._classProperties.forEach((t,n)=>{const i=this._attributeNameForProperty(n,t);void 0!==i&&(this._attributeToPropertyMap.set(i,n),e.push(i))}),e}static _ensureClassProperties(){if(!this.hasOwnProperty(JSCompiler_renameProperty("_classProperties",this))){this._classProperties=new Map;const e=Object.getPrototypeOf(this)._classProperties;void 0!==e&&e.forEach((e,t)=>this._classProperties.set(t,e))}}static createProperty(e,t=q){if(this._ensureClassProperties(),this._classProperties.set(e,t),t.noAccessor||this.prototype.hasOwnProperty(e))return;const n="symbol"==typeof e?Symbol():"__"+e,i=this.getPropertyDescriptor(e,n,t);void 0!==i&&Object.defineProperty(this.prototype,e,i)}static getPropertyDescriptor(e,t,n){return{get(){return this[t]},set(i){const r=this[e];this[t]=i,this.requestUpdateInternal(e,r,n)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this._classProperties&&this._classProperties.get(e)||q}static finalize(){const e=Object.getPrototypeOf(this);if(e.hasOwnProperty("finalized")||e.finalize(),this.finalized=!0,this._ensureClassProperties(),this._attributeToPropertyMap=new Map,this.hasOwnProperty(JSCompiler_renameProperty("properties",this))){const e=this.properties,t=[...Object.getOwnPropertyNames(e),..."function"==typeof Object.getOwnPropertySymbols?Object.getOwnPropertySymbols(e):[]];for(const n of t)this.createProperty(n,e[n])}}static _attributeNameForProperty(e,t){const n=t.attribute;return!1===n?void 0:"string"==typeof n?n:"string"==typeof e?e.toLowerCase():void 0}static _valueHasChanged(e,t,n=I){return n(e,t)}static _propertyValueFromAttribute(e,t){const n=t.type,i=t.converter||j,r="function"==typeof i?i:i.fromAttribute;return r?r(e,n):e}static _propertyValueToAttribute(e,t){if(void 0===t.reflect)return;const n=t.type,i=t.converter;return(i&&i.toAttribute||j.toAttribute)(e,n)}initialize(){this._updateState=0,this._updatePromise=new Promise(e=>this._enableUpdatingResolver=e),this._changedProperties=new Map,this._saveInstanceProperties(),this.requestUpdateInternal()}_saveInstanceProperties(){this.constructor._classProperties.forEach((e,t)=>{if(this.hasOwnProperty(t)){const e=this[t];delete this[t],this._instanceProperties||(this._instanceProperties=new Map),this._instanceProperties.set(t,e)}})}_applyInstanceProperties(){this._instanceProperties.forEach((e,t)=>this[t]=e),this._instanceProperties=void 0}connectedCallback(){this.enableUpdating()}enableUpdating(){void 0!==this._enableUpdatingResolver&&(this._enableUpdatingResolver(),this._enableUpdatingResolver=void 0)}disconnectedCallback(){}attributeChangedCallback(e,t,n){t!==n&&this._attributeToProperty(e,n)}_propertyToAttribute(e,t,n=q){const i=this.constructor,r=i._attributeNameForProperty(e,n);if(void 0!==r){const e=i._propertyValueToAttribute(t,n);if(void 0===e)return;this._updateState=8|this._updateState,null==e?this.removeAttribute(r):this.setAttribute(r,e),this._updateState=-9&this._updateState}}_attributeToProperty(e,t){if(8&this._updateState)return;const n=this.constructor,i=n._attributeToPropertyMap.get(e);if(void 0!==i){const e=n.getPropertyOptions(i);this._updateState=16|this._updateState,this[i]=n._propertyValueFromAttribute(t,e),this._updateState=-17&this._updateState}}requestUpdateInternal(e,t,n){let i=!0;if(void 0!==e){const r=this.constructor;n=n||r.getPropertyOptions(e),r._valueHasChanged(this[e],t,n.hasChanged)?(this._changedProperties.has(e)||this._changedProperties.set(e,t),!0!==n.reflect||16&this._updateState||(void 0===this._reflectingProperties&&(this._reflectingProperties=new Map),this._reflectingProperties.set(e,n))):i=!1}!this._hasRequestedUpdate&&i&&(this._updatePromise=this._enqueueUpdate())}requestUpdate(e,t){return this.requestUpdateInternal(e,t),this.updateComplete}async _enqueueUpdate(){this._updateState=4|this._updateState;try{await this._updatePromise}catch(e){}const e=this.performUpdate();return null!=e&&await e,!this._hasRequestedUpdate}get _hasRequestedUpdate(){return 4&this._updateState}get hasUpdated(){return 1&this._updateState}performUpdate(){if(!this._hasRequestedUpdate)return;this._instanceProperties&&this._applyInstanceProperties();let e=!1;const t=this._changedProperties;try{e=this.shouldUpdate(t),e?this.update(t):this._markUpdated()}catch(t){throw e=!1,this._markUpdated(),t}e&&(1&this._updateState||(this._updateState=1|this._updateState,this.firstUpdated(t)),this.updated(t))}_markUpdated(){this._changedProperties=new Map,this._updateState=-5&this._updateState}get updateComplete(){return this._getUpdateComplete()}_getUpdateComplete(){return this._updatePromise}shouldUpdate(e){return!0}update(e){void 0!==this._reflectingProperties&&this._reflectingProperties.size>0&&(this._reflectingProperties.forEach((e,t)=>this._propertyToAttribute(t,this[t],e)),this._reflectingProperties=void 0),this._markUpdated()}updated(e){}firstUpdated(e){}}W.finalized=!0;
/**
@license
Copyright (c) 2019 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
const B=window.ShadowRoot&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,J=Symbol();class Z{constructor(e,t){if(t!==J)throw new Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e}get styleSheet(){return void 0===this._styleSheet&&(B?(this._styleSheet=new CSSStyleSheet,this._styleSheet.replaceSync(this.cssText)):this._styleSheet=null),this._styleSheet}toString(){return this.cssText}}const G=(e,...t)=>{const n=t.reduce((t,n,i)=>t+(e=>{if(e instanceof Z)return e.cssText;if("number"==typeof e)return e;throw new Error(`Value passed to 'css' function must be a 'css' function result: ${e}. Use 'unsafeCSS' to pass non-literal values, but\n            take care to ensure page security.`)})(n)+e[i+1],e[0]);return new Z(n,J)};
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
(window.litElementVersions||(window.litElementVersions=[])).push("2.4.0");const K={};class Q extends W{static getStyles(){return this.styles}static _getUniqueStyles(){if(this.hasOwnProperty(JSCompiler_renameProperty("_styles",this)))return;const e=this.getStyles();if(Array.isArray(e)){const t=(e,n)=>e.reduceRight((e,n)=>Array.isArray(n)?t(n,e):(e.add(n),e),n),n=t(e,new Set),i=[];n.forEach(e=>i.unshift(e)),this._styles=i}else this._styles=void 0===e?[]:[e];this._styles=this._styles.map(e=>{if(e instanceof CSSStyleSheet&&!B){const t=Array.prototype.slice.call(e.cssRules).reduce((e,t)=>e+t.cssText,"");return new Z(String(t),J)}return e})}initialize(){super.initialize(),this.constructor._getUniqueStyles(),this.renderRoot=this.createRenderRoot(),window.ShadowRoot&&this.renderRoot instanceof window.ShadowRoot&&this.adoptStyles()}createRenderRoot(){return this.attachShadow({mode:"open"})}adoptStyles(){const e=this.constructor._styles;0!==e.length&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow?B?this.renderRoot.adoptedStyleSheets=e.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet):this._needsShimAdoptedStyleSheets=!0:window.ShadyCSS.ScopingShim.prepareAdoptedCssText(e.map(e=>e.cssText),this.localName))}connectedCallback(){super.connectedCallback(),this.hasUpdated&&void 0!==window.ShadyCSS&&window.ShadyCSS.styleElement(this)}update(e){const t=this.render();super.update(e),t!==K&&this.constructor.render(t,this.renderRoot,{scopeName:this.localName,eventContext:this}),this._needsShimAdoptedStyleSheets&&(this._needsShimAdoptedStyleSheets=!1,this.constructor._styles.forEach(e=>{const t=document.createElement("style");t.textContent=e.cssText,this.renderRoot.appendChild(t)}))}render(){return K}}Q.finalized=!0,Q.render=(e,n,i)=>{if(!i||"object"!=typeof i||!i.scopeName)throw new Error("The `scopeName` option is required.");const r=i.scopeName,s=k.has(n),o=U&&11===n.nodeType&&!!n.host,a=o&&!z.has(r),l=a?document.createDocumentFragment():n;if(((e,n,i)=>{let r=k.get(n);void 0===r&&(t(n,n.firstChild),k.set(n,r=new C(Object.assign({templateFactory:O},i))),r.appendInto(n)),r.setValue(e),r.commit()})(e,l,Object.assign({templateFactory:R(r)},i)),a){const e=k.get(l);k.delete(l);const i=e.value instanceof y?e.value.template:void 0;L(r,l,i),t(n,n.firstChild),n.appendChild(l),k.set(n,e)}!s&&o&&window.ShadyCSS.styleElement(n.host)};var X=/d{1,4}|M{1,4}|YY(?:YY)?|S{1,3}|Do|ZZ|Z|([HhMsDm])\1?|[aA]|"[^"]*"|'[^']*'/g,ee="[^\\s]+",te=/\[([^]*?)\]/gm;function ne(e,t){for(var n=[],i=0,r=e.length;i<r;i++)n.push(e[i].substr(0,t));return n}var ie=function(e){return function(t,n){var i=n[e].map((function(e){return e.toLowerCase()})).indexOf(t.toLowerCase());return i>-1?i:null}};function re(e){for(var t=[],n=1;n<arguments.length;n++)t[n-1]=arguments[n];for(var i=0,r=t;i<r.length;i++){var s=r[i];for(var o in s)e[o]=s[o]}return e}var se=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],oe=["January","February","March","April","May","June","July","August","September","October","November","December"],ae=ne(oe,3),le={dayNamesShort:ne(se,3),dayNames:se,monthNamesShort:ae,monthNames:oe,amPm:["am","pm"],DoFn:function(e){return e+["th","st","nd","rd"][e%10>3?0:(e-e%10!=10?1:0)*e%10]}},ce=re({},le),he=function(e,t){for(void 0===t&&(t=2),e=String(e);e.length<t;)e="0"+e;return e},ue={D:function(e){return String(e.getDate())},DD:function(e){return he(e.getDate())},Do:function(e,t){return t.DoFn(e.getDate())},d:function(e){return String(e.getDay())},dd:function(e){return he(e.getDay())},ddd:function(e,t){return t.dayNamesShort[e.getDay()]},dddd:function(e,t){return t.dayNames[e.getDay()]},M:function(e){return String(e.getMonth()+1)},MM:function(e){return he(e.getMonth()+1)},MMM:function(e,t){return t.monthNamesShort[e.getMonth()]},MMMM:function(e,t){return t.monthNames[e.getMonth()]},YY:function(e){return he(String(e.getFullYear()),4).substr(2)},YYYY:function(e){return he(e.getFullYear(),4)},h:function(e){return String(e.getHours()%12||12)},hh:function(e){return he(e.getHours()%12||12)},H:function(e){return String(e.getHours())},HH:function(e){return he(e.getHours())},m:function(e){return String(e.getMinutes())},mm:function(e){return he(e.getMinutes())},s:function(e){return String(e.getSeconds())},ss:function(e){return he(e.getSeconds())},S:function(e){return String(Math.round(e.getMilliseconds()/100))},SS:function(e){return he(Math.round(e.getMilliseconds()/10),2)},SSS:function(e){return he(e.getMilliseconds(),3)},a:function(e,t){return e.getHours()<12?t.amPm[0]:t.amPm[1]},A:function(e,t){return e.getHours()<12?t.amPm[0].toUpperCase():t.amPm[1].toUpperCase()},ZZ:function(e){var t=e.getTimezoneOffset();return(t>0?"-":"+")+he(100*Math.floor(Math.abs(t)/60)+Math.abs(t)%60,4)},Z:function(e){var t=e.getTimezoneOffset();return(t>0?"-":"+")+he(Math.floor(Math.abs(t)/60),2)+":"+he(Math.abs(t)%60,2)}},de=function(e){return+e-1},pe=[null,"[1-9]\\d?"],ge=[null,ee],me=["isPm",ee,function(e,t){var n=e.toLowerCase();return n===t.amPm[0]?0:n===t.amPm[1]?1:null}],fe=["timezoneOffset","[^\\s]*?[\\+\\-]\\d\\d:?\\d\\d|[^\\s]*?Z?",function(e){var t=(e+"").match(/([+-]|\d\d)/gi);if(t){var n=60*+t[1]+parseInt(t[2],10);return"+"===t[0]?n:-n}return 0}],ye=(ie("monthNamesShort"),ie("monthNames"),{default:"ddd MMM DD YYYY HH:mm:ss",shortDate:"M/D/YY",mediumDate:"MMM D, YYYY",longDate:"MMMM D, YYYY",fullDate:"dddd, MMMM D, YYYY",isoDate:"YYYY-MM-DD",isoDateTime:"YYYY-MM-DDTHH:mm:ssZ",shortTime:"HH:mm",mediumTime:"HH:mm:ss",longTime:"HH:mm:ss.SSS"});var _e=function(e,t,n){if(void 0===t&&(t=ye.default),void 0===n&&(n={}),"number"==typeof e&&(e=new Date(e)),"[object Date]"!==Object.prototype.toString.call(e)||isNaN(e.getTime()))throw new Error("Invalid Date pass to format");var i=[];t=(t=ye[t]||t).replace(te,(function(e,t){return i.push(t),"@@@"}));var r=re(re({},ce),n);return(t=t.replace(X,(function(t){return ue[t](e,r)}))).replace(/@@@/g,(function(){return i.shift()}))},we=(function(){try{(new Date).toLocaleDateString("i")}catch(e){return"RangeError"===e.name}}(),function(){try{(new Date).toLocaleString("i")}catch(e){return"RangeError"===e.name}}(),function(){try{(new Date).toLocaleTimeString("i")}catch(e){return"RangeError"===e.name}}(),function(e,t,n,i){i=i||{},n=null==n?{}:n;var r=new Event(t,{bubbles:void 0===i.bubbles||i.bubbles,cancelable:Boolean(i.cancelable),composed:void 0===i.composed||i.composed});return r.detail=n,e.dispatchEvent(r),r});const ve={clear:"day","clear-night":"night",cloudy:"cloudy",fog:"fog",hail:"rainy-7",lightning:"thunder","lightning-rainy":"lightning-rainy",partlycloudy:"cloudy-day-3",pouring:"rainy-6",rainy:"rainy-5",snowy:"snowy-6","snowy-rainy":"snowy-rainy",sunny:"day",windy:"windy","windy-variant":"windy",exceptional:"!!"},Se={...ve,clear:"night",sunny:"night",partlycloudy:"cloudy-night-3","windy-variant":"cloudy-night-3"},be=["N","NNE","NE","ENE","E","ESE","SE","SSE","S","SSO","SO","OSO","O","ONO","NO","NNO","N"],xe={"Vent violent":"mdi:weather-windy","Pluie-inondation":"mdi:weather-pouring",Orages:"mdi:weather-lightning",Inondation:"mdi:home-flood","Neige-verglas":"mdi:weather-snowy-heavy",Canicule:"mdi:weather-sunny-alert","Grand-froid":"mdi:snowflake",Avalanches:"mdi:image-filter-hdr","Vagues-submersion":"mdi:waves"},Ee=new Map([["Pas de valeur",.1],["Temps sec",.1],["Pluie faible",.4],["Pluie modérée",.7],["Pluie forte",1]]),Ce=[["cloudCoverEntity","_cloud_cover"],["rainChanceEntity","_rain_chance"],["freezeChanceEntity","_freeze_chance"],["snowChanceEntity","_snow_chance"],["uvEntity","_uv"],["rainForecastEntity","_next_rain"]];var Pe={name:"Meteo france weather card",description:"This card allow you to disply informations from Meteo France integration.",not_available:"Entity is not avaialable",toggle_power:"Turn on/off"},$e={common:Pe},Ne={name:"Cette Météo France",description:"Cette carte permet d'afficher les entités de l'intégration Météo France.",not_available:"Entité introuvable.",toggle_power:"Turn on/off"},Me={clear:"Ciel dégagé","clear-night":"Nuit claire",cloudy:"Nuageux",fog:"Brouillard",hail:"Risque de grèle",lightning:"Orages","lightning-rainy":"Pluies orageuses",partlycloudy:"Eclaircies",pouring:"Pluie forte",rainy:"Pluie",snowy:"Neige","snowy-rainy":"Pluie verglaçante",sunny:"Ensoleillé",windy:"Venteux","windy-variant":"Venteux variable",exceptional:"Exceptionnel"},Te={wind_direction:["N","NNE","NE","ENE","E","ESE","SE","SSE","S","SSO","SO","OSO","O","ONO","NO","NNO","N"],sunset_up:"Heure de lever",sunset_down:"Heure de coucher",humidity:"Humidité",air_pressure:"Pression atmosphérique",forecast:"",wind:"vent"},De={cloud_cover:"Couverture nuageuse",rain_chance:"Risque de pluie",freeze_chance:"Risque de gel",snow_chance:"Risque de neige",uv:"Indice UV",alert:"Vigilance",next_rain:"Pluie dans l'heure",one_hour_forecast_raining:"{%s} dans {%s}",one_hour_forecast_no_rain:"Pas de pluie dans l'heure.",alert_level_red:"rouge",alert_level_orange:"orange",alert_level_yellow:"jaune",alert_level_green:"verte",alert_type_flood:"inondation",alert_message:"Vigilance {level} en cours."},Oe={name:"Nom",entity:"Entité",icons_location:"Emplacement des icones",details:"Détails",show_current:"Principale",show_details:"Détails",show_one_hour:"Dans l'heure",show_alert:"Vigilances",show_forecast:"Tendances",number_futur_forecast:"Nombre de prévision"},Ae={no_entity:"Une entité doit être définie.",entity_unavailable:"Entité non disponible."},ke={common:Ne,phenomena:Me,weather:Te,sensor:De,editor:Oe,error:Ae},He={en:Object.freeze({__proto__:null,common:Pe,default:$e}),fr:Object.freeze({__proto__:null,common:Ne,phenomena:Me,weather:Te,sensor:De,editor:Oe,error:Ae,default:ke})};function Fe(e,t,n){const[i,r]=e.split(".");let s;try{s=JSON.parse(localStorage.getItem("selectedLanguage"))}catch(e){s=localStorage.getItem("selectedLanguage")}const o=(s||navigator.language.split("-")[0]||"en").replace(/['"]+/g,"").replace("-","_");let a;try{a=He[o][i][r]}catch(e){a=He.en[i][r]}if(void 0===a&&(a=He.en[i][r]),void 0!==a)return""!==t&&""!==n&&(a=a.replace(t,n)),a}customElements.define("meteofrance-weather-card-editor",class extends Q{setConfig(e){this.config={...e}}static get properties(){return{hass:{},config:{}}}get entity(){return this.config.entity||""}get _name(){return this.config.name||""}get _icons(){return this.config.icons||""}get showCurrent(){return!1!==this.config.current}get showDetails(){return!1!==this.config.details}get showForecast(){return!1!==this.config.forecast}get number_of_forecasts(){return this.config.number_of_forecasts||5}get showOne_hour_forecast(){return!1!==this.config.one_hour_forecast}get showAlert_forecast(){return!1!==this.config.alert_forecast}get _alertEntity(){return this.config.alertEntity||""}get _cloudCoverEntity(){return this.config.cloudCoverEntity||""}get _freezeChanceEntity(){return this.config.freezeChanceEntity||""}get _rainChanceEntity(){return this.config.rainChanceEntity||""}get _rainForecastEntity(){return this.config.rainForecastEntity||""}get _snowChanceEntity(){return this.config.snowChanceEntity||""}get _uvEntity(){return this.config.uvEntity||""}get _detailEntity(){return this.config.detailEntity||""}render(){return this.hass?F`
      <div class="card-config">
        <div>
          <paper-input
            label=${Fe("editor.name")}
            .value="${this._name}"
            .configValue="${"name"}"
            @value-changed="${this._valueChanged}"
          ></paper-input>
          ${this.renderSensorPicker(Fe("editor.details"),this._detailEntity,"detailEntity")}
          <paper-input
            label=${Fe("editor.icons_location")}
            .value="${this._icons}"
            .configValue="${"icons"}"
            @value-changed="${this._valueChanged}"
          ></paper-input>
          <!-- Primary weather entity -->
          ${this.renderWeatherPicker(Fe("editor.entity"),this.entity,"entity")}
          <!-- Switches -->
          <ul class="switches">
            ${this.renderSwitchOption(Fe("editor.show_current"),this.showCurrent,"current")}
            ${this.renderSwitchOption(Fe("editor.show_details"),this.showDetails,"details")}
            ${this.renderSwitchOption(Fe("editor.show_one_hour"),this.showOne_hour_forecast,"one_hour_forecast")}
            ${this.renderSwitchOption(Fe("editor.show_alert"),this.showAlert_forecast,"alert_forecast")}
            ${this.renderSwitchOption(Fe("editor.show_alert"),this.showForecast,"forecast")}
          </ul>
          <!-- -->
          <paper-input
            label=${Fe("editor.number_futur_forecast")}
            type="number"
            min="1"
            max="8"
            value=${this.number_of_forecasts}
            .configValue="${"number_of_forecasts"}"
            @value-changed="${this._valueChanged}"
          ></paper-input>
          <!-- Meteo France weather entities -->
          ${this.renderSensorPicker(Fe("sensor.rain_chance"),this._rainChanceEntity,"rainChanceEntity")}
          ${this.renderSensorPicker(Fe("sensor.uv"),this._uvEntity,"uvEntity")}
          ${this.renderSensorPicker(Fe("sensor.cloud_cover"),this._cloudCoverEntity,"cloudCoverEntity")}
          ${this.renderSensorPicker(Fe("sensor.freeze_chance"),this._freezeChanceEntity,"freezeChanceEntity")}
          ${this.renderSensorPicker(Fe("sensor.snow_chance"),this._snowChanceEntity,"snowChanceEntity")}
          ${this.renderSensorPicker(Fe("sensor.alert"),this._alertEntity,"alertEntity")}
          ${this.renderSensorPicker(Fe("sensor.next_rain"),this._rainForecastEntity,"rainForecastEntity")}
        </div>
      </div>
    `:F``}renderWeatherPicker(e,t,n){return this.renderPicker(e,t,n,"weather")}renderSensorPicker(e,t,n){return this.renderPicker(e,t,n,"sensor")}renderPicker(e,t,n,i){return F`
              <ha-entity-picker
                label="${e}"
                .hass="${this.hass}"
                .value="${t}"
                .configValue="${n}"
                .includeDomains="${i}"
                @change="${this._valueChanged}"
                allow-custom-entity
              ></ha-entity-picker>
            `}renderSwitchOption(e,t,n){return F`
      <li class="switch">
              <ha-switch
                .checked=${t}
                .configValue="${n}"
                @change="${this._valueChanged}"
              ></ha-switch
              ><span>${e}</span>
            </div>
          </li>
    `}_weatherEntityChanged(e){Ce.forEach((t,n)=>{const i="sensor."+e+t;void 0!==this.hass.states[i]&&(this.config={...this.config,[n]:i})})}_valueChanged(e){if(!this.config||!this.hass)return;const t=e.target;this["show"+Ve(t.configValue)]!==t.value&&(t.configValue&&(""===t.value?delete this.config[t.configValue]:("entity"===t.configValue&&this._weatherEntityChanged(t.value.split(".")[1]),this.config={...this.config,[t.configValue]:void 0!==t.checked?t.checked:t.value})),we(this,"config-changed",{config:this.config},{bubbles:!0,composed:!0}))}static get styles(){return G`
      .switches {
        margin: 8px 0;
        display: flex;
        flex-flow: row wrap;
        list-style: none;
        padding: 0;
      }
      .switch {
        display: flex;
        align-items: center;
        width: 50%;
        height: 40px;
      }
      .switches span {
        padding: 0 16px;
      }
    `}});const Ve=e=>"string"!=typeof e?"":e.charAt(0).toUpperCase()+e.slice(1);var Ue=G`
    ha-card {
    cursor: pointer;
    margin: auto;
    overflow: hidden;
    padding: 0.5em 1em;
    position: relative;
    }

    ha-card ul {
    list-style: none;
    padding: 0;
    margin: 0;
    }

    .spacer {
    padding-top: 1em;
    }

    .clear {
    clear: both;
    }

    .flow-row {
    display: flex;
    flex-flow: row wrap;
    }

    .flow-column {
    display: flex;
    flex-flow: column wrap;
    }

    .ha-icon {
    height: 0.8em;
    margin-right: 5px;
    color: var(--paper-item-icon-color);
    }

    /* Current Forecast */
    .current {
    flex-wrap: nowrap;
    }

    .current > *:first-child {
    min-width: 100px;
    height: 100px;
    margin-right: 10px;
    }

    .current > *:last-child  {
    margin-left: auto;
    min-width: max-content;
    text-align: right;
    }

    .current > *:last-child sup {
    font-size: initial;
    }

    .current > li {
    font-size: 2em;
    line-height: 1.2;
    align-self: center;
    }

    .current > li > *:last-child {
    line-height: 1;
    font-size: 0.6em;
    color: var(--secondary-text-color);
    }

    /* Details */
    .details {
    justify-content: space-between;
    font-weight: 300;
    }

    .details ha-icon {
    height: 22px;
    margin-right: 5px;
    color: var(--paper-item-icon-color);
    }

    .details > li {
    flex-basis: auto;
    width: 50%;
    }

    .details > li:nth-child(2n) {
    text-align: right;
    }

    .details > li:nth-child(2n) ha-icon {
    margin-right: 0;
    margin-left: 8px;
    float: right;
    }

    /* One Hour Forecast */
    .oneHour {
    height: 1em;
    }

    .oneHour > li {
    background-color: var(--paper-item-icon-color);
    border-right: 1px solid var(--lovelace-background, var(--primary-background-color));
    }

    .oneHour > li:first-child {
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
    }

    .oneHour > li:last-child {
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
    border: 0;
    }

    /* One Hour Labels */
    .rain-0min, .rain-5min, .rain-10min, .rain-15min, .rain-20min, .rain-25min {
    flex: 1 1 0;
    }

    .rain-35min, .rain-45min, .rain-55min {
    flex: 2 1 0;
    }

    .oneHourLabel > li {
    flex: 1 1 0;
    }

    /* One Hour Header */
    .oneHourHeader {
    justify-content: space-between;
    }

    .oneHourHeader li:last-child {
    text-align: right;
    }

    /* Alert */
    .alert {
    border-radius: 5px;
    padding: 5px 10px;
    font-weight: 600;
    color: var(--primary -text -color);
    margin: 2px;
    }

    .alert > *:first-child {
    margin-right: auto;
    }

    .alert.jaune {
    background-color: rgba(255,235,0,0.5);
    }

    .alert.orange {
    background-color: rgba(255,152,0,0.5);
    }

    .alert.rouge {
    background-color: rgba(244,67,54,0.5);
    }

    /* Forecast */
    .forecast {
    justify-content: space-between;
    flex-wrap: nowrap;
    }

    .forecast > li {
    flex: 1;
    border-right: 0.1em solid #d9d9d9;
    }

    .forecast > *:last-child {
    border-right: 0;
    }

    .forecast ul.day {
    align-items: center;
    }

    .forecast ul.day > *:first-child {
    text-transform: uppercase;
    }

    .forecast ul.day .highTemp {
    font-weight: bold;
    }

    .forecast ul.day .lowTemp {
    color: var(--secondary-text-color);
    }

    .forecast ul.day .icon {
    width: 50px;
    height: 50px;
    margin-right: 5px;
    }`;window.customCards=window.customCards||[],window.customCards.push({type:"meteofrance-weather-card",name:"Carte Météo France par HACF",description:"Carte pour l'intégration Météo France.",preview:!0,documentationURL:"https://github.com/hacf-fr/lovelace-meteofrance-weather-card"});customElements.define("meteofrance-weather-card",class extends Q{static get properties(){return{config:{},hass:{}}}static get styles(){return Ue}static async getConfigElement(){return document.createElement("meteofrance-weather-card-editor")}static getStubConfig(e,t,n){let i=this.getDefaultWeatherEntity(t,n);if(i){let t=this.getWeatherEntitiesFromEntity(e,i.entity.split(".")[1],n);i={...i,...t}}return i}static getDefaultWeatherEntity(e,t){let n=e.find(e=>"weather"===e.split(".")[0]);return n||(n=t.find(e=>"weather"===e.split(".")[0])),{entity:n}}static getWeatherEntitiesFromEntity(e,t,n){let i={};return Ce.forEach(r=>{const s="sensor."+t+r[0];if(void 0!==e.states[s]){let e=n[s];e||(i={...i,[e[1]]:s})}}),i}get entity(){return this.getSensor("entity")}getSensor(e){return this.hass.states[this.config[e]]}setConfig(e){if(!e.entity)throw new Error(Fe("error.no_entity"));this.config=e}shouldUpdate(e){return function(e,t,n){if(t.has("config")||n)return!0;if(e.config.entity){var i=t.get("hass");return!i||i.states[e.config.entity]!==e.hass.states[e.config.entity]}return!1}(this,e)}isSelected(e){return void 0===e||!0===e}render(){return this.config&&this.hass?(this.numberElements=0,this.entity?F`
      <ha-card @click="${this._handleClick}">
        ${this.isSelected(this.config.current)?this.renderCurrent():""}

        ${this.isSelected(this.config.details)?this.renderDetails():""}

        ${this.isSelected(this.config.one_hour_forecast)?this.renderOneHourForecast():""}

        ${this.isSelected(this.config.alert_forecast)?this.renderAlertForecast():""}

        ${this.isSelected(this.config.forecast)?this.renderForecast(this.entity.attributes.forecast):""}
      </ha-card>
    `:F`
        <style>
          .not-found {
            flex: 1;
            background-color: yellow;
            padding: 8px;
          }
        </style>
        <ha-card>
          <div class="not-found">
            ${Fe("error.entity_unavailable")}: ${this.config.entity}
          </div>
        </ha-card>
      `):F``}renderCurrent(){return this.numberElements++,F`
        <ul class="flow-row current">
          <li style="background: none, url('${this.getWeatherIcon(this.entity.state.toLowerCase(),this.getSensor("sun.sun"))}') no-repeat; background-size: contain;">
          </li>
          <li>
            ${this.getPhenomenaText(this.entity.state,this.getSensor("sun.sun"))}
            ${this.config.name?F` <div> ${this.config.name} </div>`:""}
          </li>
          <li>
              ${"°F"==this.getUnit("temperature")?Math.round(this.entity.attributes.temperature):this.entity.attributes.temperature}
              <sup>${this.getUnit("temperature")}</sup>
            <ul>
              ${this.renderMeteoFranceDetail(this.getSensor("detailEntity"))}
            </ul>
          </li>
        </ul>
    `}renderDetails(){const e=this.hass.states["sun.sun"];let t,n;return e&&(t=new Date(e.attributes.next_rising),n=new Date(e.attributes.next_setting)),this.numberElements++,F`
      <ul class="flow-row details ${this.numberElements>1?" spacer":""}">
        <!-- Cloudy -->
        ${this.renderMeteoFranceDetail(this.getSensor("cloudCoverEntity"))}
        <!-- Wind -->
        ${this.renderDetail((null==this.entity.attributes.wind_bearing?" ":be[parseInt((this.entity.attributes.wind_bearing+11.25)/22.5)]+" ")+this.entity.attributes.wind_speed,Fe("weather.wind"),"mdi:weather-windy",this.getUnit("speed"))}
        <!-- Rain -->
        ${this.renderMeteoFranceDetail(this.getSensor("rainChanceEntity"))}
        <!-- Humidity -->
        ${this.renderDetail(this.entity.attributes.humidity,Fe("weather.humidity"),"mdi:water-percent","%")}
        <!-- Freeze -->
        ${this.renderMeteoFranceDetail(this.getSensor("freezeChanceEntity"))}
        <!-- Pressure -->
        ${this.renderDetail(this.entity.attributes.pressure,Fe("weather.air_pressure"),"mdi:gauge",this.getUnit("air_pressure"))}
        <!-- Snow -->
        ${this.renderMeteoFranceDetail(this.getSensor("snowChanceEntity"))}
        <!-- UV -->
        ${this.renderMeteoFranceDetail(this.getSensor("uvEntity"))}
      </ul>
      <ul class="flow-row details">
        <!-- Sunset up -->
        ${t?this.renderDetail(t.toLocaleTimeString(),Fe("weather.sunset_up"),"mdi:weather-sunset-up"):""}
        <!-- Sunset down -->
        ${n?this.renderDetail(n.toLocaleTimeString(),Fe("weather.sunset_down"),"mdi:weather-sunset-down"):""}
      </ul>
    `}renderMeteoFranceDetail(e){return void 0!==e?this.renderDetail(e.state,Fe(e.entity_id.replace(this.config.entity.split(".")[1]+"_","")),e.attributes.icon,e.attributes.unit_of_measurement):""}renderDetail(e,t,n,i){return F`
      <li>
        <ha-icon icon="${n}" title="${t}"></ha-icon>
        ${e}${i?F`${i}`:""}
      </li>
    `}renderOneHourForecast(){const e=this.getSensor("rainForecastEntity");if(!e||0===e.length)return F``;this.numberElements++;const t=this.getOneHourBeginHour(e);return F`
      <ul class="flow-row oneHourHeader ${this.numberElements>1?" spacer":""}">
        <li> ${t} </li>
        <li>${this.getOneHourNextRainText(e)}</li>
        <li> ${t+1} </li>
      </ul>
      <ul class="flow-row oneHour">
        ${F`
        ${this.getOneHourForecast(e).map(e=>F`
        <li class="rain-${e[0]}min" style="opacity: ${e[1]}" title="${e[2]+" "+(0==e[0]?" actuellement":"dans "+e[0]+" min")}">
        </li>`)}
        `}
      </ul>
      <ul class="flow-row oneHourLabel">
        <li></li>
        <li>10</li>
        <li>20</li>
        <li>30</li>
        <li>40</li>
        <li>50</li>
      </ul>`}renderAlertForecast(){const e=this.getSensor("alertEntity");return e?(this.numberElements++,F`
      ${this.renderAlertType("Rouge",e)}
      ${this.renderAlertType("Orange",e)}
      ${this.renderAlertType("Jaune",e)}`):F``}renderAlertType(e,t){if(0==this.getAlertForecast(e,t).length)return F``;let n=e.toLowerCase();return F`
    <ul class="flow-row alert ${n}">
      <li>
        <ha-icon icon="mdi:alert"></ha-icon>Vigilance ${n} en cours
      </li>
        ${this.getAlertForecast(e,t).map(e=>F`
      <li>
        <ha-icon icon="${e[1]}" title="${e[0]}"></ha-icon>
      </li>`)}
      </div>
    </ul>`}renderForecast(e){if(!e||0===e.length)return F``;const t=this.hass.selectedLanguage||this.hass.language,n=this.isDailyForecast(e);return this.numberElements++,F`
      <ul class="flow-row forecast ${this.numberElements>1?" spacer":""}">
        ${e.slice(0,this.config.number_of_forecasts?this.config.number_of_forecasts:5).map(e=>this.renderDailyForecast(e,t,n))}
      </ul>`}renderDailyForecast(e,t,n){return F`
        <li>
          <ul class="flow-column day">
            <li>
            ${n?new Date(e.datetime).toLocaleDateString(t,{weekday:"short"}):new Date(e.datetime).toLocaleTimeString(t,{hour:"2-digit",minute:"2-digit"})}
            </li>
            <li class="icon" style="background: none, url('${this.getWeatherIcon(e.condition.toLowerCase())}') no-repeat; background-size: contain">
            </li>
            <li class="highTemp">
            ${e.temperature}${this.getUnit("temperature")}
            </li>
          ${void 0!==e.templow?F`
            <li class="lowTemp">
            ${e.templow}${this.getUnit("temperature")}
            </li>
          `:""}
          ${void 0!==e.precipitation&&null!==e.precipitation?F`
            <li class="precipitation">
              ${Math.round(10*e.precipitation)/10} ${this.getUnit("precipitation")}
            </li>
          `:""}
          ${void 0!==e.precipitation_probability&&null!==e.precipitation_probability?F`
            <li class="precipitation_probability">
            ${Math.round(e.precipitation_probability)} ${this.getUnit("precipitation_probability")}
            </li>
          `:""}
          </ul>
        </li>`}isDailyForecast(e){return new Date(e[1].datetime)-new Date(e[0].datetime)>36e5}getOneHourBeginHour(e){return new Date(e.attributes.forecast_time_ref).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})}getOneHourForecast(e){let t=[];for(let[n,i]of Object.entries(e.attributes["1_hour_forecast"]))null!=n&&n.match(/[0-9]*min/g)&&(n=n.replace("min","").trim(),t.push([n,Ee.get(i),i]));return t}getOneHourNextRainText(e){for(let[t,n]of Object.entries(e.attributes["1_hour_forecast"]))if(null!=t&&Ee.get(n)>.1)return n+("0 min"==t?" actuellement !":" dans "+t+".");return"Pas de pluie dans l'heure."}getAlertForecast(e,t){if(null==t)return[];let n=[];for(const[i,r]of Object.entries(t.attributes))r==e&&n.push([i,xe[i]]);return n}getWeatherIcon(e,t){return`${this.config.icons?this.config.icons:"/local/community/lovelace-meteofrance-weather-card/icons/"}${t&&"below_horizon"==t.state?Se[e]:ve[e]}.svg`}getPhenomenaText(e,t){return""+(t&&"below_horizon"==t.state&&"sunny"==e?Fe("phenomena.clear-night"):Fe("phenomena."+e))}getUnit(e){const t=this.hass.config.unit_system.length;switch(e){case"air_pressure":return"km"===t?"hPa":"inHg";case"length":return t;case"precipitation":return"km"===t?"mm":"in";case"precipitation_probability":return"%";case"speed":return"km"===t?"km/h":"mph";default:return this.hass.config.unit_system[e]||""}}_handleClick(){we(this,"hass-more-info",{entityId:this.config.entity},{bubbles:!0,composed:!0})}getCardSize(){return 3}});
