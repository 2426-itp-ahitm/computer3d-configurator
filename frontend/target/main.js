/*! For license information please see main.js.LICENSE.txt */
(()=>{"use strict";const t=globalThis,e=t.trustedTypes,s=e?e.createPolicy("lit-html",{createHTML:t=>t}):void 0,i="$lit$",n=`lit$${Math.random().toFixed(9).slice(2)}$`,o="?"+n,r=`<${o}>`,h=document,a=()=>h.createComment(""),c=t=>null===t||"object"!=typeof t&&"function"!=typeof t,l=Array.isArray,d="[ \t\n\f\r]",p=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,$=/-->/g,u=/>/g,m=RegExp(`>|${d}(?:([^\\s"'>=/]+)(${d}*=${d}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),_=/'/g,A=/"/g,g=/^(?:script|style|textarea|title)$/i,v=t=>(e,...s)=>({_$litType$:t,strings:e,values:s}),f=v(1),b=(v(2),v(3),Symbol.for("lit-noChange")),y=Symbol.for("lit-nothing"),x=new WeakMap,w=h.createTreeWalker(h,129);function H(t,e){if(!l(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==s?s.createHTML(e):e}const C=(t,e)=>{const s=t.length-1,o=[];let h,a=2===e?"<svg>":3===e?"<math>":"",c=p;for(let e=0;e<s;e++){const s=t[e];let l,d,v=-1,f=0;for(;f<s.length&&(c.lastIndex=f,d=c.exec(s),null!==d);)f=c.lastIndex,c===p?"!--"===d[1]?c=$:void 0!==d[1]?c=u:void 0!==d[2]?(g.test(d[2])&&(h=RegExp("</"+d[2],"g")),c=m):void 0!==d[3]&&(c=m):c===m?">"===d[0]?(c=h??p,v=-1):void 0===d[1]?v=-2:(v=c.lastIndex-d[2].length,l=d[1],c=void 0===d[3]?m:'"'===d[3]?A:_):c===A||c===_?c=m:c===$||c===u?c=p:(c=m,h=void 0);const b=c===m&&t[e+1].startsWith("/>")?" ":"";a+=c===p?s+r:v>=0?(o.push(l),s.slice(0,v)+i+s.slice(v)+n+b):s+n+(-2===v?e:b)}return[H(t,a+(t[s]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),o]};class M{constructor({strings:t,_$litType$:s},r){let h;this.parts=[];let c=0,l=0;const d=t.length-1,p=this.parts,[$,u]=C(t,s);if(this.el=M.createElement($,r),w.currentNode=this.el.content,2===s||3===s){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(h=w.nextNode())&&p.length<d;){if(1===h.nodeType){if(h.hasAttributes())for(const t of h.getAttributeNames())if(t.endsWith(i)){const e=u[l++],s=h.getAttribute(t).split(n),i=/([.?@])?(.*)/.exec(e);p.push({type:1,index:c,name:i[2],strings:s,ctor:"."===i[1]?I:"?"===i[1]?S:"@"===i[1]?B:k}),h.removeAttribute(t)}else t.startsWith(n)&&(p.push({type:6,index:c}),h.removeAttribute(t));if(g.test(h.tagName)){const t=h.textContent.split(n),s=t.length-1;if(s>0){h.textContent=e?e.emptyScript:"";for(let e=0;e<s;e++)h.append(t[e],a()),w.nextNode(),p.push({type:2,index:++c});h.append(t[s],a())}}}else if(8===h.nodeType)if(h.data===o)p.push({type:2,index:c});else{let t=-1;for(;-1!==(t=h.data.indexOf(n,t+1));)p.push({type:7,index:c}),t+=n.length-1}c++}}static createElement(t,e){const s=h.createElement("template");return s.innerHTML=t,s}}function N(t,e,s=t,i){if(e===b)return e;let n=void 0!==i?s._$Co?.[i]:s._$Cl;const o=c(e)?void 0:e._$litDirective$;return n?.constructor!==o&&(n?._$AO?.(!1),void 0===o?n=void 0:(n=new o(t),n._$AT(t,s,i)),void 0!==i?(s._$Co??=[])[i]=n:s._$Cl=n),void 0!==n&&(e=N(t,n._$AS(t,e.values),n,i)),e}class T{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:s}=this._$AD,i=(t?.creationScope??h).importNode(e,!0);w.currentNode=i;let n=w.nextNode(),o=0,r=0,a=s[0];for(;void 0!==a;){if(o===a.index){let e;2===a.type?e=new E(n,n.nextSibling,this,t):1===a.type?e=new a.ctor(n,a.name,a.strings,this,t):6===a.type&&(e=new P(n,this,t)),this._$AV.push(e),a=s[++r]}o!==a?.index&&(n=w.nextNode(),o++)}return w.currentNode=h,i}p(t){let e=0;for(const s of this._$AV)void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}}class E{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,s,i){this.type=2,this._$AH=y,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=N(this,t,e),c(t)?t===y||null==t||""===t?(this._$AH!==y&&this._$AR(),this._$AH=y):t!==this._$AH&&t!==b&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>l(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==y&&c(this._$AH)?this._$AA.nextSibling.data=t:this.T(h.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:s}=t,i="number"==typeof s?this._$AC(t):(void 0===s.el&&(s.el=M.createElement(H(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===i)this._$AH.p(e);else{const t=new T(i,this),s=t.u(this.options);t.p(e),this.T(s),this._$AH=t}}_$AC(t){let e=x.get(t.strings);return void 0===e&&x.set(t.strings,e=new M(t)),e}k(t){l(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let s,i=0;for(const n of t)i===e.length?e.push(s=new E(this.O(a()),this.O(a()),this,this.options)):s=e[i],s._$AI(n),i++;i<e.length&&(this._$AR(s&&s._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t&&t!==this._$AB;){const e=t.nextSibling;t.remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class k{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,s,i,n){this.type=1,this._$AH=y,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=n,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=y}_$AI(t,e=this,s,i){const n=this.strings;let o=!1;if(void 0===n)t=N(this,t,e,0),o=!c(t)||t!==this._$AH&&t!==b,o&&(this._$AH=t);else{const i=t;let r,h;for(t=n[0],r=0;r<n.length-1;r++)h=N(this,i[s+r],e,r),h===b&&(h=this._$AH[r]),o||=!c(h)||h!==this._$AH[r],h===y?t=y:t!==y&&(t+=(h??"")+n[r+1]),this._$AH[r]=h}o&&!i&&this.j(t)}j(t){t===y?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class I extends k{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===y?void 0:t}}class S extends k{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==y)}}class B extends k{constructor(t,e,s,i,n){super(t,e,s,i,n),this.type=5}_$AI(t,e=this){if((t=N(this,t,e,0)??y)===b)return;const s=this._$AH,i=t===y&&s!==y||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,n=t!==y&&(s===y||i);i&&this.element.removeEventListener(this.name,this,s),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class P{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){N(this,t)}}const U=t.litHtmlPolyfillSupport;U?.(M,E),(t.litHtmlVersions??=[]).push("3.2.1");const R=(t,e,s)=>{const i=s?.renderBefore??e;let n=i._$litPart$;if(void 0===n){const t=s?.renderBefore??null;i._$litPart$=n=new E(e.insertBefore(a(),t),t,void 0,s??{})}return n._$AI(t),n};class W extends HTMLElement{constructor(){super(),this.cpus=[],this.tableTemplate=t=>{const e=t.map((t=>f`
            <div class="CpuContainer">
        <div class="CpuDetails">
            <p class="CpuName"><strong>${t.name}</strong></p>
            <div class="ContentWrapper">
                <div class="Image">
                    <img src="${t.img}" alt="${t.name}">
                </div>
                <div class="Info">
                    <p>Preis: ${t.price}</p>
                    <p>Sockel: ${t.socket}</p>
                    <!--<button class="addButton" onclick="addCpu(${t.cpu_id})">Hinzufügen</button>-->
                    <button class="addButton" @click=${()=>this.addCpu(t.cpu_id)}>Press me!</button>
                </div>
            </div>
        </div>
    </div>        
            `));return f`
                ${e}
                
    `},this.attachShadow({mode:"open"})}async connectedCallback(){const t=await fetch("../../style.css"),e=await t.text(),s=document.createElement("style");s.textContent=e,this.shadowRoot.appendChild(s),this.cpus=await async function(){const t=await fetch("/api/cpus");return await t.json()}(),this.renderCPUs()}renderCPUs(){R(this.tableTemplate(this.cpus),this.shadowRoot)}addCpu(t){const e=new CustomEvent("add-cpu",{detail:{cpuid:t}});this.dispatchEvent(e)}}customElements.define("cpu-component",W);class j extends HTMLElement{constructor(){super(),this.motherboards=[],this.attachShadow({mode:"open"})}async connectedCallback(){this.motherboards=await async function(){const t=await fetch("/api/motherboards");return await t.json()}(),this.renderMotherboards()}renderMotherboards(){R((()=>{const t=this.motherboards.map((t=>f`   
        <div class="MbContainer">
    <div class="MbDetails">
        <p class="MbName"><strong>${t.name}</strong></p>
        <div class="ContentWrapper">
            <div class="Image">
                <img src="${t.img}" alt="${t.name}">
            </div>
            <div class="Info">
                <p>Preis: ${t.price}</p>
                <p>Sockel: ${t.socket}</p>
                <button class="addButton" onclick="addMotherboard(${t.motherboard_id})">Hinzufügen</button>
            </div>
        </div>
    </div>
</div>                 
        `));return f`
            ${t}      
    <style>
         .MbContainer {
            background-color: rgba(255, 255, 255, 0.409);
        color: white;
        padding: 1vw;
        margin: 1vw;
        border-radius: 10px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    }

    .MbDetails {
        color: white;
        display: flex;
        flex-direction: column;
    }

    .MbName {
        color: white;
        font-size: 1.5vw;
        margin-bottom: 1vw;
    }

    .ContentWrapper {
        display: flex;
        align-items: center;
    }

    .Image img {
        mix-blend-mode: multiply;
        width: 10vw;
        height: auto;
        margin-right: 1.5vw;
    }

    .Info {
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .addButton {
        background-color: black;
        color: white;
        border: none;
        padding: 0.8vw 1.5vw;
        font-size: 1vw;
        cursor: pointer;
        border-radius: 1vw;
        margin-top: 1vw;
    }

    .addButton:hover {
        background-color: #444;
    }
    </style>
`})(),this.shadowRoot)}updateMotherboards(t){this.motherboards=t,this.renderMotherboards()}}customElements.define("mb-component",j);const L=f`
        <h2>CPUs</h2>
        <cpu-component></cpu-component>
        <h2>Motherboards</h2>
        <mb-component></mb-component>
`;class D extends HTMLElement{connectedCallback(){R(L,this)}}customElements.define("app-component",D)})();
//# sourceMappingURL=main.js.map