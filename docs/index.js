class t{constructor(e,t,n,s){this.cx=e,this.cy=t,this.rx=n,this.ry=s}toSVG(){return`<path d="${this.d()}"/>`}d(){return this.toArray().map(e=>e.join(" ")).join(" ")}}class e extends t{constructor(e,t,n,s){super(e,t,n,s)}toArray(){const{cx:t,cy:n,rx:e,ry:s}=this;return[["M",t-e,n],["A",e,s,0,1,0,t+e,n],["A",e,s,0,1,0,t-e,n]]}}class r extends t{constructor(e,t,n,s){super(e,t,n,s)}toArray(){const{cx:e,cy:t,rx:n,ry:s}=this,o=r.KAPPA;return[["M",e-n,t],["C",e-n,t-o*s,e-o*n,t-s,e,t-s],["C",e+o*n,t-s,e+n,t-o*s,e+n,t],["C",e+n,t+o*s,e+o*n,t+s,e,t+s],["C",e-o*n,t+s,e-n,t+o*s,e-n,t]]}}Object.defineProperty(r,"KAPPA",{enumerable:!0,configurable:!0,writable:!0,value:(-1+Math.sqrt(2))/3*4});class c extends t{constructor(e,t,n,s,o=8){super(e,t,n,s),this.segments=o}toArray(){const e=2*Math.PI/this.segments,{cx:t,cy:n,rx:s,ry:o}=this,a=t=>{const n=s*Math.cos(t),i=o*Math.sin(t);return[n+s*Math.tan(e/2)*Math.cos(t-Math.PI/2),i+o*Math.tan(e/2)*Math.sin(t-Math.PI/2),n,i]},i=[["M",t+s,n]];for(let s=1;s<=this.segments;s++){const o=s*e,[r,c,l,d]=a(o);i.push(["Q",r+t,c+n,l+t,d+n])}return i}range(e,t){return[...Array(t-e+1).keys()].map(t=>t+e)}}function n(t,n,s,o,i){const a=i.circleSegments||8;switch(i.circleAlgorithm){case"TwoArcs":default:return new e(t,n,s,o);case"CubicBezier":return new r(t,n,s,o);case"QuadBezier":return new c(t,n,s,o,a)}}function i(e,t,s){const a=Number(e.getAttribute("cx")),r=Number(e.getAttribute("cy")),i=Number(e.getAttribute("r")),c=n(a,r,i,i,s).d(),o=t(e);return o.setAttribute("d",c),["cx","cy","r"].forEach(e=>{o.removeAttribute(e)}),e.replaceWith(o),o}function s(e,t,s){const i=n(Number(e.getAttribute("cx")),Number(e.getAttribute("cy")),Number(e.getAttribute("rx")),Number(e.getAttribute("ry")),s).d(),o=t(e);return o.setAttribute("d",i),["cx","cy","rx","ry"].forEach(e=>{o.removeAttribute(e)}),e.replaceWith(o),o}function u(e,t){const r=Number(e.getAttribute("x"))||0,c=Number(e.getAttribute("y"))||0,o=Number(e.getAttribute("width")),a=Number(e.getAttribute("height")),l=Number(e.getAttribute("rx")),d=Number(e.getAttribute("ry")),n=Math.min(l||d||0,o/2),s=Math.min(d||l||0,a/2);let u;u=0===n||0===s?`M${r} ${c}h${o}v${a}h${-o}z`:`M${r} ${c+s}
a${n} ${s} 0 0 1 ${n} ${-s}
h${o-n-n}
a${n} ${s} 0 0 1 ${n} ${s}
v${a-s-s}
a${n} ${s} 0 0 1 ${-n} ${s}
h${n+n-o}
a${n} ${s} 0 0 1 ${-n} ${-s}
z`;const i=t(e);return i.setAttribute("d",u),["cx","cy","r"].forEach(e=>{i.removeAttribute(e)}),e.replaceWith(i),i}function o(e,t){const s=`M${e.getAttribute("x1")} ${e.getAttribute("y1")}L${e.getAttribute("x2")} ${e.getAttribute("y2")}`,n=t(e);return n.setAttribute("d",s),["x1","y1","x2","y2"].forEach(e=>{n.removeAttribute(e)}),e.replaceWith(n),n}function a(e,t){const s=e.getAttribute("points").trim().replaceAll(","," ").split(/\s+/).map(Number);let o=`M${s.slice(0,2).join(" ")}L${s.slice(2).join(" ")}`;"polygon"===e.tagName.toLowerCase()&&(o+="z");const n=t(e);return n.setAttribute("d",o),n.removeAttribute("points"),e.replaceWith(n),n}function*b(e){yield e;const t=e.childNodes;if(t)for(let e=0;e<t.length;e++)yield*b(t[e])}function h(e,t,n={}){for(const r of b(e))if(r.tagName)switch(r.tagName.toLowerCase()){case"rect":u(r,t);break;case"circle":i(r,t,n);break;case"ellipse":s(r,t,n);break;case"line":o(r,t);break;case"polyline":case"polygon":a(r,t)}}var _,S,M,F,t1={a:7,c:6,h:1,l:2,m:2,r:4,q:4,s:4,t:2,v:1,z:0},e1=[5760,6158,8192,8193,8194,8195,8196,8197,8198,8199,8200,8201,8202,8239,8287,12288,65279];function r1(e){return e>=48&&e<=57}function a1(e){return e>=48&&e<=57||43===e||45===e||46===e}function s1(e){this.index=0,this.path=e,this.max=e.length,this.result=[],this.param=0,this.err="",this.segmentStart=0,this.data=[]}function i1(e){for(var t;e.index<e.max&&(10===(t=e.path.charCodeAt(e.index))||13===t||8232===t||8233===t||32===t||9===t||11===t||12===t||160===t||t>=5760&&e1.indexOf(t)>=0);)e.index++}function n1(e){var t=e.path.charCodeAt(e.index);return 48===t?(e.param=0,void e.index++):49===t?(e.param=1,void e.index++):void(e.err="SvgPath: arc flag can be 0 or 1 only (at pos "+e.index+")")}function h1(e){var n,o=e.index,t=o,s=e.max,i=!1,a=!1,r=!1,c=!1;if(t>=s)e.err="SvgPath: missed param (at pos "+t+")";else if(43!==(n=e.path.charCodeAt(t))&&45!==n||(n=++t<s?e.path.charCodeAt(t):0),r1(n)||46===n){if(46!==n){if(i=48===n,n=++t<s?e.path.charCodeAt(t):0,i&&t<s&&n&&r1(n))return void(e.err="SvgPath: numbers started with `0` such as `09` are illegal (at pos "+o+")");for(;t<s&&r1(e.path.charCodeAt(t));)t++,a=!0;n=t<s?e.path.charCodeAt(t):0}if(46===n){for(c=!0,t++;r1(e.path.charCodeAt(t));)t++,r=!0;n=t<s?e.path.charCodeAt(t):0}if(101===n||69===n){if(c&&!a&&!r)return void(e.err="SvgPath: invalid float exponent (at pos "+t+")");if(43!==(n=++t<s?e.path.charCodeAt(t):0)&&45!==n||t++,!(t<s&&r1(e.path.charCodeAt(t))))return void(e.err="SvgPath: invalid float exponent (at pos "+t+")");for(;t<s&&r1(e.path.charCodeAt(t));)t++}e.index=t,e.param=parseFloat(e.path.slice(o,t))+0}else e.err="SvgPath: param should start with 0..9 or `.` (at pos "+t+")"}function o1(e){var n,s=(n=e.path[e.segmentStart]).toLowerCase(),t=e.data;if("m"===s&&t.length>2&&(e.result.push([n,t[0],t[1]]),t=t.slice(2),s="l",n="m"===n?"l":"L"),"r"===s)e.result.push([n].concat(t));else for(;t.length>=t1[s]&&(e.result.push([n].concat(t.splice(0,t1[s]))),t1[s]););}function c1(e){var t,n,s,o,i,a=e.max;if(e.segmentStart=e.index,s=e.path.charCodeAt(e.index),i=97==(32|s),function(e){switch(32|e){case 109:case 122:case 108:case 104:case 118:case 99:case 115:case 113:case 116:case 97:case 114:return!0}return!1}(s))if(o=t1[e.path[e.index].toLowerCase()],e.index++,i1(e),e.data=[],o){for(n=!1;;){for(t=o;t>0;t--){if(!i||3!==t&&4!==t?h1(e):n1(e),e.err.length)return void o1(e);e.data.push(e.param),i1(e),n=!1,e.index<a&&44===e.path.charCodeAt(e.index)&&(e.index++,i1(e),n=!0)}if(!n){if(e.index>=e.max)break;if(!a1(e.path.charCodeAt(e.index)))break}}o1(e)}else o1(e);else e.err="SvgPath: bad command "+e.path[e.index]+" (at pos "+e.index+")"}function u1(){if(!(this instanceof u1))return new u1;this.queue=[],this.cache=null}u1.prototype.matrix=function(e){return 1===e[0]&&0===e[1]&&0===e[2]&&1===e[3]&&0===e[4]&&0===e[5]||(this.cache=null,this.queue.push(e)),this},u1.prototype.translate=function(e,t){return 0===e&&0===t||(this.cache=null,this.queue.push([1,0,0,1,e,t])),this},u1.prototype.scale=function(e,t){return 1===e&&1===t||(this.cache=null,this.queue.push([e,0,0,t,0,0])),this},u1.prototype.rotate=function(e,t,n){var s,o,i;return 0!==e&&(this.translate(t,n),s=e*Math.PI/180,o=Math.cos(s),i=Math.sin(s),this.queue.push([o,i,-i,o,0,0]),this.cache=null,this.translate(-t,-n)),this},u1.prototype.skewX=function(e){return 0!==e&&(this.cache=null,this.queue.push([1,0,Math.tan(e*Math.PI/180),1,0,0])),this},u1.prototype.skewY=function(e){return 0!==e&&(this.cache=null,this.queue.push([1,Math.tan(e*Math.PI/180),0,1,0,0])),this},u1.prototype.toArray=function(){if(this.cache)return this.cache;if(!this.queue.length)return this.cache=[1,0,0,1,0,0],this.cache;if(this.cache=this.queue[0],1===this.queue.length)return this.cache;for(var e,t,n=1;n<this.queue.length;n++)this.cache=(e=this.cache,t=this.queue[n],[e[0]*t[0]+e[2]*t[1],e[1]*t[0]+e[3]*t[1],e[0]*t[2]+e[2]*t[3],e[1]*t[2]+e[3]*t[3],e[0]*t[4]+e[2]*t[5]+e[4],e[1]*t[4]+e[3]*t[5]+e[5]]);return this.cache},u1.prototype.calc=function(e,t,n){var s;return this.queue.length?(this.cache||(this.cache=this.toArray()),[e*(s=this.cache)[0]+t*s[2]+(n?0:s[4]),e*s[1]+t*s[3]+(n?0:s[5])]):[e,t]};var f=u1,l=f,p={matrix:!0,scale:!0,rotate:!0,translate:!0,skewX:!0,skewY:!0},d=/\s*(matrix|translate|scale|rotate|skewX|skewY)\s*\(\s*(.+?)\s*\)[\s,]*/,v=/[\s,]+/,x=2*Math.PI;function m(e,t,n,s){var o=e*n+t*s;return o>1&&(o=1),o<-1&&(o=-1),(e*s-t*n<0?-1:1)*Math.acos(o)}function g(e,t){var n=4/3*Math.tan(t/4),s=Math.cos(e),o=Math.sin(e),i=Math.cos(e+t),a=Math.sin(e+t);return[s,o,s-o*n,o+s*n,i+a*n,a-i*n,i,a]}_=1e-10,M=Math.PI/180;function y(e,t,n){if(!(this instanceof y))return new y(e,t,n);this.rx=e,this.ry=t,this.ax=n}y.prototype.transform=function(e){var s=Math.cos(this.ax*M),o=Math.sin(this.ax*M),t=[this.rx*(e[0]*s+e[2]*o),this.rx*(e[1]*s+e[3]*o),this.ry*(-e[0]*o+e[2]*s),this.ry*(-e[1]*o+e[3]*s)],l=t[0]*t[0]+t[2]*t[2],i=t[1]*t[1]+t[3]*t[3],a=((t[0]-t[3])*(t[0]-t[3])+(t[2]+t[1])*(t[2]+t[1]))*((t[0]+t[3])*(t[0]+t[3])+(t[2]-t[1])*(t[2]-t[1])),r=(l+i)/2;if(a<_*r)return this.rx=this.ry=Math.sqrt(r),this.ax=0,this;var c=t[0]*t[1]+t[2]*t[3],n=r+(a=Math.sqrt(a))/2,d=r-a/2;return this.ax=Math.abs(c)<_&&Math.abs(n-i)<_?90:180*Math.atan(Math.abs(c)>Math.abs(n-i)?(n-l)/c:c/(n-i))/Math.PI,this.ax>=0?(this.rx=Math.sqrt(n),this.ry=Math.sqrt(d)):(this.ax+=90,this.rx=Math.sqrt(d),this.ry=Math.sqrt(n)),this},y.prototype.isDegenerate=function(){return this.rx<_*this.ry||this.ry<_*this.rx};var k=function(e){var t=new s1(e),n=t.max;for(i1(t);t.index<n&&!t.err.length;)c1(t);return t.result.length&&("mM".indexOf(t.result[0][0])<0?(t.err="SvgPath: string should start with `M` or `m`",t.result=[]):t.result[0][0]="M"),{err:t.err,segments:t.result}},w=function(e){var t,s,n=new l;return e.split(d).forEach(function(e){if(e.length)if(void 0===p[e])switch(t=e.split(v).map(function(e){return+e||0}),s){case"matrix":return void(6===t.length&&n.matrix(t));case"scale":return void(1===t.length?n.scale(t[0],t[0]):2===t.length&&n.scale(t[0],t[1]));case"rotate":return void(1===t.length?n.rotate(t[0],0,0):3===t.length&&n.rotate(t[0],t[1],t[2]));case"translate":return void(1===t.length?n.translate(t[0],0):2===t.length&&n.translate(t[0],t[1]));case"skewX":return void(1===t.length&&n.skewX(t[0]));case"skewY":return void(1===t.length&&n.skewY(t[0]))}else s=e}),n},A=f,q=function(e,t,n,s,o,i,a,r,c){var u,b,l=Math.sin(c*x/360),d=Math.cos(c*x/360),p=d*(e-n)/2+l*(t-s)/2,v=-l*(e-n)/2+d*(t-s)/2;if(0===p&&0===v)return[];if(0===a||0===r)return[];a=Math.abs(a),r=Math.abs(r),u=p*p/(a*a)+v*v/(r*r),u>1&&(a*=Math.sqrt(u),r*=Math.sqrt(u));var h=function(e,t,n,s,o,i,a,r,c,l){var h=l*(e-n)/2+c*(t-s)/2,u=-c*(e-n)/2+l*(t-s)/2,v=a*a,b=r*r,j=h*h,w=u*u,d=v*b-v*w-b*j;d<0&&(d=0),d/=v*w+b*j;var g=(d=Math.sqrt(d)*(o===i?-1:1))*a/r*u,p=d*-r/a*h,O=l*g-c*p+(e+n)/2,C=c*g+l*p+(t+s)/2,y=(h-g)/a,_=(u-p)/r,E=(-h-g)/a,k=(-u-p)/r,A=m(1,0,y,_),f=m(y,_,E,k);return 0===i&&f>0&&(f-=x),1===i&&f<0&&(f+=x),[O,C,A,f]}(e,t,n,s,o,i,a,r,l,d),j=[],y=h[2],f=h[3],_=Math.max(Math.ceil(Math.abs(f)/(x/4)),1);f/=_;for(b=0;b<_;b++)j.push(g(y,f)),y+=f;return j.map(function(e){for(t=0;t<e.length;t+=2){var t,n=e[t+0],s=e[t+1],o=d*(n*=a)-l*(s*=r),i=l*n+d*s;e[t+0]=o+h[0],e[t+1]=i+h[1]}return e})},C=y;function b1(e){if(!(this instanceof b1))return new b1(e);var t=k(e);this.segments=t.segments,this.err=t.err,this.__stack=[]}b1.from=function(e){if("string"==typeof e)return new b1(e);if(e instanceof b1){var t=new b1("");return t.err=e.err,t.segments=e.segments.map(function(e){return e.slice()}),t.__stack=e.__stack.map(function(e){return A().matrix(e.toArray())}),t}throw new Error("SvgPath.from: invalid param type "+e)},b1.prototype.__matrix=function(e){var t,n=this;e.queue.length&&this.iterate(function(s,o,i,a){switch(s[0]){case"v":c=0===(r=e.calc(0,s[1],!0))[0]?["v",r[1]]:["l",r[0],r[1]];break;case"V":c=(r=e.calc(i,s[1],!1))[0]===e.calc(i,a,!1)[0]?["V",r[1]]:["L",r[0],r[1]];break;case"h":c=0===(r=e.calc(s[1],0,!0))[1]?["h",r[0]]:["l",r[0],r[1]];break;case"H":c=(r=e.calc(s[1],a,!1))[1]===e.calc(i,a,!1)[1]?["H",r[0]]:["L",r[0],r[1]];break;case"a":case"A":var r,c,d,h,l=e.toArray(),u=C(s[1],s[2],s[3]).transform(l);if(l[0]*l[3]-l[1]*l[2]<0&&(s[5]=s[5]?"0":"1"),r=e.calc(s[6],s[7],"a"===s[0]),"A"===s[0]&&s[6]===i&&s[7]===a||"a"===s[0]&&0===s[6]&&0===s[7]){c=["a"===s[0]?"l":"L",r[0],r[1]];break}c=u.isDegenerate()?["a"===s[0]?"l":"L",r[0],r[1]]:[s[0],u.rx,u.ry,u.ax,s[4],s[5],r[0],r[1]];break;case"m":d=o>0,c=["m",(r=e.calc(s[1],s[2],d))[0],r[1]];break;default:for(c=[h=s[0]],d=h.toLowerCase()===h,t=1;t<s.length;t+=2)r=e.calc(s[t],s[t+1],d),c.push(r[0],r[1])}n.segments[o]=c},!0)},b1.prototype.__evaluateStack=function(){var e,t;if(this.__stack.length){if(1===this.__stack.length)return this.__matrix(this.__stack[0]),void(this.__stack=[]);for(e=A(),t=this.__stack.length;--t>=0;)e.matrix(this.__stack[t].toArray());this.__matrix(e),this.__stack=[]}},b1.prototype.toString=function(){var e,n,s,o,i,c,t="",a="",r=!1;this.__evaluateStack();for(s=0,c=this.segments.length;s<c;s++){o=this.segments[s],e=o[0],e!==a||"m"===e||"M"===e?("m"===e&&"z"===a&&(t+=" "),t+=e,r=!1):r=!0;for(n=1;n<o.length;n++)i=o[n],1===n?r&&i>=0&&(t+=" "):i>=0&&(t+=" "),t+=i;a=e}return t},b1.prototype.translate=function(e,t){return this.__stack.push(A().translate(e,t||0)),this},b1.prototype.scale=function(e,t){return this.__stack.push(A().scale(e,t||0===t?t:e)),this},b1.prototype.rotate=function(e,t,n){return this.__stack.push(A().rotate(e,t||0,n||0)),this},b1.prototype.skewX=function(e){return this.__stack.push(A().skewX(e)),this},b1.prototype.skewY=function(e){return this.__stack.push(A().skewY(e)),this},b1.prototype.matrix=function(e){return this.__stack.push(A().matrix(e)),this},b1.prototype.transform=function(e){return e.trim()?(this.__stack.push(w(e)),this):this},b1.prototype.round=function(e){var s,o=0,i=0,t=0,n=0;return e=e||0,this.__evaluateStack(),this.segments.forEach(function(a){var r=a[0].toLowerCase()===a[0];switch(a[0]){case"H":case"h":return r&&(a[1]+=t),t=a[1]-a[1].toFixed(e),void(a[1]=+a[1].toFixed(e));case"V":case"v":return r&&(a[1]+=n),n=a[1]-a[1].toFixed(e),void(a[1]=+a[1].toFixed(e));case"Z":case"z":return t=o,void(n=i);case"M":case"m":return r&&(a[1]+=t,a[2]+=n),t=a[1]-a[1].toFixed(e),n=a[2]-a[2].toFixed(e),o=t,i=n,a[1]=+a[1].toFixed(e),void(a[2]=+a[2].toFixed(e));case"A":case"a":return r&&(a[6]+=t,a[7]+=n),t=a[6]-a[6].toFixed(e),n=a[7]-a[7].toFixed(e),a[1]=+a[1].toFixed(e),a[2]=+a[2].toFixed(e),a[3]=+a[3].toFixed(e+2),a[6]=+a[6].toFixed(e),void(a[7]=+a[7].toFixed(e));default:return s=a.length,r&&(a[s-2]+=t,a[s-1]+=n),t=a[s-2]-a[s-2].toFixed(e),n=a[s-1]-a[s-1].toFixed(e),void a.forEach(function(t,n){n&&(a[n]=+a[n].toFixed(e))})}}),this},b1.prototype.iterate=function(e,t){var o,i,a,c=this.segments,r={},l=!1,n=0,s=0,d=0,u=0;if(t||this.__evaluateStack(),c.forEach(function(t,o){var i,a=e(t,o,n,s);switch(Array.isArray(a)&&(r[o]=a,l=!0),i=t[0]===t[0].toLowerCase(),t[0]){case"m":case"M":return n=t[1]+(i?n:0),s=t[2]+(i?s:0),d=n,void(u=s);case"h":case"H":return void(n=t[1]+(i?n:0));case"v":case"V":return void(s=t[1]+(i?s:0));case"z":case"Z":return n=d,void(s=u);default:n=t[t.length-2]+(i?n:0),s=t[t.length-1]+(i?s:0)}}),!l)return this;for(a=[],o=0;o<c.length;o++)if(void 0!==r[o])for(i=0;i<r[o].length;i++)a.push(r[o][i]);else a.push(c[o]);return this.segments=a,this},b1.prototype.abs=function(){return this.iterate(function(e,t,n,s){var o,i=e[0],a=i.toUpperCase();if(i!==a)switch(e[0]=a,i){case"v":return void(e[1]+=s);case"a":return e[6]+=n,void(e[7]+=s);default:for(o=1;o<e.length;o++)e[o]+=o%2?n:s}},!0),this},b1.prototype.rel=function(){return this.iterate(function(e,t,n,s){var o,i=e[0],a=i.toLowerCase();if(i!==a&&(0!==t||"M"!==i))switch(e[0]=a,i){case"V":return void(e[1]-=s);case"A":return e[6]-=n,void(e[7]-=s);default:for(o=1;o<e.length;o++)e[o]-=o%2?n:s}},!0),this},b1.prototype.unarc=function(){return this.iterate(function(e,t,n,s){var o,i,r,c=[],a=e[0];return"A"!==a&&"a"!==a?null:("a"===a?(o=n+e[6],i=s+e[7]):(o=e[6],i=e[7]),0===(r=q(n,s,o,i,e[4],e[5],e[1],e[2],e[3])).length?[["a"===e[0]?"l":"L",e[6],e[7]]]:(r.forEach(function(e){c.push(["C",e[2],e[3],e[4],e[5],e[6],e[7]])}),c))}),this},b1.prototype.unshort=function(){var e,t,n,s,o,i=this.segments;return this.iterate(function(a,r,c,l){var d,u=a[0],h=u.toUpperCase();r&&("T"===h?(d="t"===u,"Q"===(e=i[r-1])[0]?(t=e[1]-c,n=e[2]-l):"q"===e[0]?(t=e[1]-e[3],n=e[2]-e[4]):(t=0,n=0),s=-t,o=-n,d||(s+=c,o+=l),i[r]=[d?"q":"Q",s,o,a[1],a[2]]):"S"===h&&(d="s"===u,"C"===(e=i[r-1])[0]?(t=e[3]-c,n=e[4]-l):"c"===e[0]?(t=e[3]-e[5],n=e[4]-e[6]):(t=0,n=0),s=-t,o=-n,d||(s+=c,o+=l),i[r]=[d?"c":"C",s,o,a[1],a[2],a[3],a[4]]))}),this},F=b1,S=F.from;const courseNode=document.getElementById("course"),audioContext=new AudioContext,audioBufferCache={};loadAudio("error","/number-icon/mp3/boyon1.mp3"),loadAudio("correct1","/number-icon/mp3/pa1.mp3"),loadAudio("correct2","/number-icon/mp3/papa1.mp3"),loadAudio("correctAll","/number-icon/mp3/levelup1.mp3"),loadConfig();function loadConfig(){localStorage.getItem("darkMode")==1&&document.documentElement.setAttribute("data-bs-theme","dark")}function toggleDarkMode(){localStorage.getItem("darkMode")==1?(localStorage.setItem("darkMode",0),document.documentElement.setAttribute("data-bs-theme","light")):(localStorage.setItem("darkMode",1),document.documentElement.setAttribute("data-bs-theme","dark"))}async function playAudio(e,t){const s=await loadAudio(e,audioBufferCache[e]),n=audioContext.createBufferSource();if(n.buffer=s,t){const e=audioContext.createGain();e.gain.value=t,e.connect(audioContext.destination),n.connect(e),n.start()}else n.connect(audioContext.destination),n.start()}async function loadAudio(e,t){if(audioBufferCache[e])return audioBufferCache[e];const s=await fetch(t),o=await s.arrayBuffer(),n=await audioContext.decodeAudioData(o);return audioBufferCache[e]=n,n}function unlockAudio(){audioContext.resume()}function changeLang(){const e=document.getElementById("lang"),t=e.options[e.selectedIndex].value;location.href=`/number-icon/${t}/`}function createPath(e){const t=document.createElementNS(svgNamespace,"path");for(const n of e.attributes)t.setAttribute(n.name,n.value);return t}function isOverlapped(e,t){return e.some(e=>e.left<t.right&&e.right>t.left&&e.top<t.bottom&&e.bottom>t.top)}function handleTextClick(e,t,n){if(clickIndex+1!=n){playAudio("error");return}clickIndex+=1;const i=problem[t].path;textIndex!=0&&i.nextElementSibling.remove(),e.style.cursor="initial",e.setAttribute("fill-opacity",.5),e.onclick=null;const s=createPath(problem[t].path);resetCurrentColor(s),s.style.fill="",s.style.stroke="";const o=F.from(problem[t].pathData);if(textIndex+1==problem[t].texts.length)s.setAttribute("d",o.toString()),i.after(s),problem[t].texts.forEach(e=>{e.remove()}),t+1==problem.length?playAudio("correctAll"):(playAudio("correct2"),currPathIndex+=1,textIndex=0,problem[currPathIndex].texts.forEach(e=>{e.style.display="initial"}));else{const e=problem[t].rects[textIndex].i;o.segments=o.segments.slice(0,e+1),s.setAttribute("d",o.toString()),i.after(s),playAudio("correct1"),textIndex+=1}}function addNumber(e,t,n,s,o,i){const a=document.createElementNS(svgNamespace,"text");return a.setAttribute("x",e),a.setAttribute("y",t+n),a.setAttribute("text-anchor","middle"),a.setAttribute("font-size",n),a.setAttribute("fill","currentColor"),a.style.display=i,a.style.cursor="pointer",a.textContent=s,a.onclick=()=>handleTextClick(a,o,s),svg.appendChild(a),a}function getAccessList(e){const t=new Array(e*2+1);for(let n=-e;n<=e;n++)for(let s=-e;s<=e;s++){const o=Math.abs(n)+Math.abs(s);t[o]?t[o].push([n,s]):t[o]=[[n,s]]}return t}function getPoints(e){const s=[];let t=0,n=0,o=0;return e.segments.forEach((e,i)=>{switch(e[0]){case"H":t=e[1],s.push([t,n]);break;case"h":t+=e[1],s.push([t,n]);break;case"V":n=e[1],s.push([t,n]);break;case"v":n+=e[1],s.push([t,n]);break;case"M":t=e.at(-2),n=e.at(-1),o=i,s.push([t,n]);break;case"L":case"C":case"S":case"Q":case"T":case"A":t=e.at(-2),n=e.at(-1),s.push([t,n]);break;case"m":t+=e.at(-2),n+=e.at(-1),o=i,s.push([t,n]);break;case"l":case"c":case"s":case"q":case"t":case"a":t+=e.at(-2),n+=e.at(-1),s.push([t,n]);break;case"Z":case"z":t=s[o][0],n=s[o][1],s.push([t,n]);break}}),s}function replaceNumber(e,t,n,s){const o=structuredClone(t);for(const i of accessList)for(const[c,l]of i){const a=n*c/2,r=s*l/2;if(o.left=t.left+a,o.right=t.right+a,o.top=t.top+r,o.bottom=t.bottom+r,!isOverlapped(e,o))return o}return o}function getRects(e,t,n,s){const o=[];let i=-(1/0),a=-(1/0);return e.forEach(([e,r],c)=>{const l=Math.sqrt((e-i)**2+(r-a)**2);if(s<l){const d=t+c,s=(d.toString().length/2+1)*n,l=s/2,u={left:e-l,top:r,right:e+l,bottom:r+n,i:c},h=replaceNumber(o,u,s,n);o.push(h),i=e,a=r}}),o}function addNumbers(e){const n=getViewBox(svg),s=n[3]*skipFactor;let t=1;problem.forEach((n,o)=>{const i=F(n.path.getAttribute("d")),c=getPoints(i),a=getRects(c,t,e,s),r=[],l=o==0?"initial":"none";a.forEach(n=>{const s=n.left+(n.right-n.left)/2,i=addNumber(s,n.top,e,t,o,l);r.push(i),t+=1}),n.rects=a,n.texts=r,n.pathData=i})}function removeTransforms(e){const t=getViewBox(e);e.setAttribute("width",t[2]),e.setAttribute("height",t[3]);for(const t of e.getElementsByTagName("path")){const{a:s,b:o,c:i,d:a,e:r,f:c}=t.getCTM(),n=F(t.getAttribute("d"));n.matrix([s,o,i,a,r,c]),t.setAttribute("d",n.toString())}for(const t of e.querySelectorAll("[transform]"))t.removeAttribute("transform")}function removeUseTags(e){const t=[...e.getElementsByTagName("use")];for(const n of t){let s=n.getAttributeNS(xlinkNamespace,"href").slice(1);if(s||(s=n.getAttribute("href").slice(1)),!s)continue;const o=e.getElementById(s).cloneNode(!0);for(const e of n.attributes){if(e.localName=="href")continue;o.setAttribute(e.name,e.value)}o.removeAttribute("id"),n.replaceWith(o)}}function lengthToPixel(e){const t=parseFloat(e);switch(e.slice(0,-2)){case"cm":return t/96*2.54;case"mm":return t/96*254;case"in":return t/96;case"pc":return t*16;case"pt":return t/96*72;case"px":return t;default:return t}}function getFontSize(e){const t=e.getAttribute("viewBox");if(t){const e=Number(t.split(" ")[2]);return e/40}const n=lengthToPixel(e.getAttribute("width"));return n/40}function getViewBox(e){const t=e.getAttribute("viewBox");if(t)return t.split(" ").map(Number);const n=lengthToPixel(e.getAttribute("width")),s=lengthToPixel(e.getAttribute("height"));return[0,0,n,s]}function setViewBox(e){const t=getViewBox(e);let n=1/0,s=1/0,o=-(1/0),i=-(1/0);problem.forEach(e=>{e.rects.forEach(e=>{const{left:t,top:a,right:r,bottom:c}=e;t<n&&(n=t),a<s&&(s=a),o<r&&(o=r),i<c&&(i=c)})}),n=Math.floor(n),s=Math.floor(s),o=Math.ceil(o),i=Math.ceil(i);const a=t[0]+t[2],r=t[1]+t[3];t[0]<n&&(n=t[0]),t[1]<s&&(s=t[1]),o<a&&(o=a),i<r&&(i=r),t[0]=n,t[1]=s,t[2]=o-n,t[3]=i-s,e.setAttribute("viewBox",t.join(" "))}function hideIcon(){problem.forEach(e=>{const t=e.path;t.style.fill="none",t.style.stroke="none"})}async function fetchIconList(e){const t=await fetch(`/number-icon/data/${e}.txt`),n=await t.text();return n.trimEnd().split(`
`)}async function fetchIcon(e){const t=await fetch(e),n=await t.text();return(new DOMParser).parseFromString(n,"image/svg+xml")}function getRandomInt(e,t){return e=Math.ceil(e),t=Math.floor(t),Math.floor(Math.random()*(t-e))+e}const presentationAttributes=new Set(["alignment-baseline","baseline-shift","clip","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cursor","direction","display","dominant-baseline","enable-background","fill","fill-opacity","fill-rule","filter","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","glyph-orientation-horizontal","glyph-orientation-vertical","image-rendering","kerning","letter-spacing","lighting-color","marker-end","marker-mid","marker-start","mask","opacity","overflow","pointer-events","shape-rendering","solid-color","solid-opacity","stop-color","stop-opacity","stroke","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke-width","text-anchor","text-decoration","text-rendering","transform","unicode-bidi","vector-effect","visibility","word-spacing","writing-mode"]);function removeSvgTagAttributes(e){const t=[];if([...e.attributes].forEach(n=>{presentationAttributes.has(n.name)&&(t.push(n),e.removeAttribute(n.name))}),t.length>0){const n=document.createElementNS(svgNamespace,"g");t.forEach(e=>{n.setAttribute(e.name,e.value)}),[...e.children].forEach(e=>{n.appendChild(e)}),e.appendChild(n)}}function fixIconCode(e){const t=courseNode.options[courseNode.selectedIndex].value;switch(t){case"Solar-icon-set":for(const t of e.querySelectorAll("[fill=black]"))t.setAttribute("fill","gray");for(const t of e.querySelectorAll("[stroke=black]"))t.setAttribute("stroke","gray");break;case"tabler-icons":e.firstElementChild.remove();break;case"streamline-vectors":for(const t of e.querySelectorAll('[stroke="#3e3e3e"]'))t.setAttribute("stroke","gray");break}}function computeAttribute(e,t){let n;for(;!n&&e&&e.tagName;)n=e.getAttribute(t),e=e.parentNode;return n}function resetCurrentColor(e){const t=computeAttribute(e,"fill"),n=computeAttribute(e,"stroke");t&&t.toLowerCase()=="currentcolor"&&e.setAttribute("fill","gray"),n&&n.toLowerCase()=="currentcolor"&&e.setAttribute("stroke","gray")}function styleAttributeToAttributes(e){[...e.querySelectorAll("[style]")].forEach(e=>{e.getAttribute("style").split(";").forEach(t=>{const[n,s]=t.split(":").map(e=>e.trim());presentationAttributes.has(n)&&(e.setAttribute(n,s),e.style.removeProperty(n))})})}async function nextProblem(){clickIndex=0,textIndex=0,currPathIndex=0;const e=document.getElementById("course"),t=e.options[e.selectedIndex].value;iconList.length==0&&(iconList=await fetchIconList(t));const n=iconList[getRandomInt(0,iconList.length)],s=`/svg/${t}/${n}`,o=await fetchIcon(s);svg=o.documentElement,fixIconCode(svg),styleAttributeToAttributes(svg),svg.getAttribute("fill")||svg.setAttribute("fill","gray"),resetCurrentColor(svg),removeSvgTagAttributes(svg),h(svg,createPath,{circleAlgorithm:"QuadBezier"}),removeUseTags(svg),document.getElementById("iconContainer").replaceChildren(svg),removeTransforms(svg),problem=[],[...svg.getElementsByTagName("path")].forEach(e=>{problem.push({path:e})}),hideIcon(svg),addNumbers(getFontSize(svg)),svg.style.width="100%",svg.style.height="100%",setViewBox(svg)}async function changeCourse(){const e=courseNode.options[courseNode.selectedIndex].value;iconList=await fetchIconList(e),selectAttribution(courseNode.selectedIndex),nextProblem()}function selectRandomCourse(){const e=getRandomInt(0,courseNode.options.length);courseNode.options[e].selected=!0,selectAttribution(e)}function selectAttribution(e){const t=[...document.getElementById("attribution").children];t.forEach((t,n)=>{n==e?t.classList.remove("d-none"):t.classList.add("d-none")})}const svgNamespace="http://www.w3.org/2000/svg",xlinkNamespace="http://www.w3.org/1999/xlink",accessList=getAccessList(5),skipFactor=.05;let clickIndex=0,textIndex=0,currPathIndex=0,svg,problem,iconList=[];selectRandomCourse(),nextProblem(),document.getElementById("toggleDarkMode").onclick=toggleDarkMode,document.getElementById("lang").onchange=changeLang,document.getElementById("startButton").onclick=nextProblem,courseNode.onclick=changeCourse,document.addEventListener("click",unlockAudio,{once:!0,useCapture:!0})