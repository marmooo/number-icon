import svgpath from"https://cdn.jsdelivr.net/npm/svgpath@2.6.0/+esm";const audioContext=new AudioContext,audioBufferCache={};loadAudio("error","/number-icon/mp3/boyon1.mp3"),loadAudio("correct1","/number-icon/mp3/pa1.mp3"),loadAudio("correct2","/number-icon/mp3/papa1.mp3"),loadAudio("correctAll","/number-icon/mp3/levelup1.mp3"),loadConfig();function loadConfig(){localStorage.getItem("darkMode")==1&&document.documentElement.setAttribute("data-bs-theme","dark")}function toggleDarkMode(){localStorage.getItem("darkMode")==1?(localStorage.setItem("darkMode",0),document.documentElement.setAttribute("data-bs-theme","light")):(localStorage.setItem("darkMode",1),document.documentElement.setAttribute("data-bs-theme","dark"))}async function playAudio(e,t){const s=await loadAudio(e,audioBufferCache[e]),n=audioContext.createBufferSource();if(n.buffer=s,t){const e=audioContext.createGain();e.gain.value=t,e.connect(audioContext.destination),n.connect(e),n.start()}else n.connect(audioContext.destination),n.start()}async function loadAudio(e,t){if(audioBufferCache[e])return audioBufferCache[e];const s=await fetch(t),o=await s.arrayBuffer(),n=await audioContext.decodeAudioData(o);return audioBufferCache[e]=n,n}function unlockAudio(){audioContext.resume()}function changeLang(){const e=document.getElementById("lang"),t=e.options[e.selectedIndex].value;location.href=`/number-icon/${t}/`}export class Circle{constructor(e,t,n,s){this.cx=e,this.cy=t,this.rx=n,this.ry=s}toSVG(){return`<path d="${this.d()}"/>`}d(){return this.toArray().map(e=>e.join(" ")).join(" ")}}export class TwoArcsCircle extends Circle{constructor(e,t,n,s){super(e,t,n,s)}toArray(){const{cx:t,cy:n,rx:e,ry:s}=this;return[["M",t-e,n],["A",e,s,0,1,0,t+e,n],["A",e,s,0,1,0,t-e,n]]}}export class CubicBezierCircle extends Circle{static KAPPA=(-1+Math.sqrt(2))/3*4;constructor(e,t,n,s){super(e,t,n,s)}toArray(){const{cx:e,cy:t,rx:n,ry:s}=this,o=CubicBezierCircle.KAPPA;return[["M",e-n,t],["C",e-n,t-o*s,e-o*n,t-s,e,t-s],["C",e+o*n,t-s,e+n,t-o*s,e+n,t],["C",e+n,t+o*s,e+o*n,t+s,e,t+s],["C",e-o*n,t+s,e-n,t+o*s,e-n,t]]}}export class QuadBezierCircle extends Circle{constructor(e,t,n,s,o=8){super(e,t,n,s),this.segments=o}toArray(){const e=2*Math.PI/this.segments,{cx:t,cy:n,rx:s,ry:o}=this,a=t=>{const n=s*Math.cos(t),i=o*Math.sin(t),a=n+s*Math.tan(e/2)*Math.cos(t-Math.PI/2),r=i+o*Math.tan(e/2)*Math.sin(t-Math.PI/2);return[a,r,n,i]},i=[["M",t+s,n]];for(let s=1;s<=this.segments;s++){const o=s*e,[r,c,l,d]=a(o);i.push(["Q",r+t,c+n,l+t,d+n])}return i}range(e,t){const n=t-e;return[...Array(n+1).keys()].map(t=>t+e)}}function selectCircle(e,t,n,s,o){const i=o.circleSegments||8;switch(o.circleAlgorithm){case"TwoArcs":return new TwoArcsCircle(e,t,n,s);case"CubicBezier":return new CubicBezierCircle(e,t,n,s);case"QuadBezier":return new QuadBezierCircle(e,t,n,s,i);default:return new TwoArcsCircle(e,t,n,s)}}export function circleToPath(e,t,n){const i=Number(e.getAttribute("cx")),a=Number(e.getAttribute("cy")),o=Number(e.getAttribute("r")),r=selectCircle(i,a,o,o,n).d(),s=t(e);return s.setAttribute("d",r),["cx","cy","r"].forEach(e=>{s.removeAttribute(e)}),e.replaceWith(s),s}export function ellipseToPath(e,t,n){const o=Number(e.getAttribute("cx")),i=Number(e.getAttribute("cy")),a=Number(e.getAttribute("rx")),r=Number(e.getAttribute("ry")),c=selectCircle(o,i,a,r,n).d(),s=t(e);return s.setAttribute("d",c),["cx","cy","rx","ry"].forEach(e=>{s.removeAttribute(e)}),e.replaceWith(s),s}export function rectToPath(e,t){const c=Number(e.getAttribute("x"))||0,l=Number(e.getAttribute("y"))||0,o=Number(e.getAttribute("width")),a=Number(e.getAttribute("height")),d=Number(e.getAttribute("rx")),u=Number(e.getAttribute("ry")),n=Math.min(d||u||0,o/2),s=Math.min(u||d||0,a/2);let r;n===0||s===0?r=`M${c} ${l}h${o}v${a}h${-o}z`:r=`M${c} ${l+s}
a${n} ${s} 0 0 1 ${n} ${-s}
h${o-n-n}
a${n} ${s} 0 0 1 ${n} ${s}
v${a-s-s}
a${n} ${s} 0 0 1 ${-n} ${s}
h${n+n-o}
a${n} ${s} 0 0 1 ${-n} ${-s}
z`;const i=t(e);return i.setAttribute("d",r),["cx","cy","r"].forEach(e=>{i.removeAttribute(e)}),e.replaceWith(i),i}export function lineToPath(e,t){const s=e.getAttribute("x1"),o=e.getAttribute("y1"),i=e.getAttribute("x2"),a=e.getAttribute("y2"),r=`M${s} ${o}L${i} ${a}`,n=t(e);return n.setAttribute("d",r),["x1","y1","x2","y2"].forEach(e=>{n.removeAttribute(e)}),e.replaceWith(n),n}export function polylineToPath(e,t){const s=e.getAttribute("points").trim().replaceAll(","," ").split(/\s+/).map(Number),i=s.slice(0,2).join(" "),a=s.slice(2).join(" ");let o=`M${i}L${a}`;e.tagName.toLowerCase()==="polygon"&&(o+="z");const n=t(e);return n.setAttribute("d",o),n.removeAttribute("points"),e.replaceWith(n),n}function*traverse(e){yield e;const t=e.childNodes;if(t)for(let e=0;e<t.length;e++)yield*traverse(t[e])}export function shape2path(e,t,n={}){for(const s of traverse(e)){if(!s.tagName)continue;switch(s.tagName.toLowerCase()){case"rect":rectToPath(s,t);break;case"circle":circleToPath(s,t,n);break;case"ellipse":ellipseToPath(s,t,n);break;case"line":lineToPath(s,t);break;case"polyline":case"polygon":polylineToPath(s,t);break}}}function createPath(e){const t=document.createElementNS(svgNamespace,"path");for(const n of e.attributes)t.setAttribute(n.name,n.value);return t}function isOverlapped(e,t){return e.some(e=>!(e.right<=t.left||e.left>=t.right||e.bottom<=t.top||e.top>=t.bottom))}function addNumber(e,t,n,s){const o=document.createElementNS(svgNamespace,"text");return o.setAttribute("x",e),o.setAttribute("y",t),o.setAttribute("r",n),o.setAttribute("text-anchor","middle"),o.setAttribute("font-size",n),o.style.cursor="pointer",o.textContent=s,o.onclick=()=>{if(clickIndex+1!=s){playAudio("error");return}clickIndex+=1;const n=svg.querySelector("text");segmentIndex!=1&&workspaceGroup.lastElementChild.remove(),o.style.cursor="initial",o.setAttribute("fill-opacity",.5),o.onclick=null;const e=createPath(paths[pathIndex]);resetCurrentColor(e),e.style.fill="",e.style.stroke="";const t=svgpath.from(currPath);t.segments=t.segments.slice(0,segmentIndex);const i=t.toString();if(e.setAttribute("d",i),workspaceGroup.appendChild(e),svg.insertBefore(svg.firstElementChild,n),segmentIndex==currPath.segments.length){const e=[...svg.getElementsByTagName("text")];for(const t of e)t.remove();pathIndex+1==paths.length?playAudio("correctAll"):(playAudio("correct2"),pathIndex+=1,currPath=addNumbers(fontSize),segmentIndex=1)}else playAudio("correct1"),segmentIndex+=1},svg.appendChild(o),o}function replaceNumber(e,t,n){let s=t.top;for(;isOverlapped(e,t);)t.top+=n,t.bottom+=n,s+=n;return s}function addNumbers(e){let s=clickIndex+1;const o=[],a=paths[pathIndex],i=svgpath(a.getAttribute("d"));let t=0,n=0;for(const a of i.segments)switch(a[0]){case"H":{t=a[1];const i={left:t,top:n,right:t+e,bottom:n+e},r=replaceNumber(o,i,e);o.push(i),addNumber(t,r,e,s),s+=1;break}case"h":{t+=a[1];const i={left:t,top:n,right:t+e,bottom:n+e},r=replaceNumber(o,i,e);o.push(i),addNumber(t,r,e,s),s+=1;break}case"V":{n=a[1];const i={left:t,top:n,right:t+e,bottom:n+e},r=replaceNumber(o,i,e);o.push(i),addNumber(t,r,e,s),s+=1;break}case"v":{n+=a[1];const i={left:t,top:n,right:t+e,bottom:n+e},r=replaceNumber(o,i,e);o.push(i),addNumber(t,r,e,s),s+=1;break}case"M":case"L":case"C":case"S":case"Q":case"T":case"A":{t=a.at(-2),n=a.at(-1);const i={left:t,top:n,right:t+e,bottom:n+e},r=replaceNumber(o,i,e);o.push(i),addNumber(t,r,e,s),s+=1;break}case"m":case"l":case"c":case"s":case"q":case"t":case"a":{t+=a.at(-2),n+=a.at(-1);const i={left:t,top:n,right:t+e,bottom:n+e},r=replaceNumber(o,i,e);o.push(i),addNumber(t,r,e,s),s+=1;break}case"Z":case"z":break}return i.segments=i.segments.filter(e=>!e[0].match(/[zZ]/)),i}function getTransforms(e){const t=[];for(;e.tagName;){const n=e.getAttribute("transform");n&&t.push(n),e=e.parentNode}return t.reverse()}function removeTransforms(e){for(const t of e.getElementsByTagName("path")){const s=t.getAttribute("d"),n=getTransforms(t);if(n.length>0){const e=svgpath(s);n.forEach(t=>{e.transform(t)}),t.setAttribute("d",e.toString())}}for(const t of e.querySelectorAll("[transform]"))t.removeAttribute("transform")}function removeUseTags(e){const t=[...e.getElementsByTagName("use")];for(const n of t){let s=n.getAttributeNS(xlinkNamespace,"href").slice(1);if(s||(s=n.getAttribute("href").slice(1)),!s)continue;const o=e.getElementById(s).cloneNode(!0);for(const e of n.attributes){if(e.localName=="href")continue;o.setAttribute(e.name,e.value)}o.removeAttribute("id"),n.replaceWith(o)}}function getFontSize(e){const t=e.getAttribute("viewBox");if(t){const e=Number(t.split(" ")[2]);return e/40}const n=Number(e.getAttribute("width"));return n/40}function setViewBox(e,t){const n=t*2,s=e.getAttribute("viewBox").split(" ").map(Number);if(s){const t=s[0]-n,o=s[1]-n,i=s[2]+n*2,a=s[3]+n*2;e.setAttribute("viewBox",`${t} ${o} ${i} ${a}`)}else{const t=-n,s=-n,o=Number(e.getAttribute("width"))+n*2,i=Number(e.getAttribute("height"))+n*2;e.setAttribute("viewBox",`${t} ${s} ${o} ${i}`)}}function hideIcon(){for(const e of paths)e.style.fill="none",e.style.stroke="none"}async function fetchIconList(e){const t=await fetch(`/number-icon/data/${e}.txt`),n=await t.text();return n.trimEnd().split(`
`)}async function fetchIcon(e){const t=await fetch(e),n=await t.text();return(new DOMParser).parseFromString(n,"image/svg+xml")}function getRandomInt(e,t){return e=Math.ceil(e),t=Math.floor(t),Math.floor(Math.random()*(t-e))+e}const presentationAttributes=new Set(["alignment-baseline","baseline-shift","clip","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cursor","direction","display","dominant-baseline","enable-background","fill","fill-opacity","fill-rule","filter","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","glyph-orientation-horizontal","glyph-orientation-vertical","image-rendering","kerning","letter-spacing","lighting-color","marker-end","marker-mid","marker-start","mask","opacity","overflow","pointer-events","shape-rendering","solid-color","solid-opacity","stop-color","stop-opacity","stroke","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke-width","text-anchor","text-decoration","text-rendering","transform","unicode-bidi","vector-effect","visibility","word-spacing","writing-mode"]);function removeSvgTagAttributes(e){const t=[];if([...e.attributes].forEach(n=>{presentationAttributes.has(n.name)&&(t.push(n),e.removeAttribute(n.name))}),t.length>0){const n=document.createElementNS(svgNamespace,"g");for(const t of e.children)n.appendChild(t);return e.appendChild(n),t.forEach(e=>{n.setAttribute(e.name,e.value)}),n}return e}function fixIconCode(e){const t=document.getElementById("course"),n=t.options[t.selectedIndex].value;if(n=="Solar-icon-set"){for(const t of e.querySelectorAll("[fill=black]"))t.setAttribute("fill","gray");for(const t of e.querySelectorAll("[stroke=black]"))t.setAttribute("stroke","gray")}}function computeAttribute(e,t){let n;for(;!n&&e&&e.tagName;)n=e.getAttribute(t),e=e.parentNode;return n}function resetCurrentColor(e){const t=computeAttribute(e,"fill"),n=computeAttribute(e,"stroke");t&&t.toLowerCase()=="currentcolor"&&e.setAttribute("fill","gray"),n&&n.toLowerCase()=="currentcolor"&&e.setAttribute("stroke","gray")}function styleAttributeToAttributes(e){[...e.querySelectorAll("[style]")].forEach(e=>{e.getAttribute("style").split(";").forEach(t=>{const[n,s]=t.split(":").map(e=>e.trim());presentationAttributes.has(n)&&(e.setAttribute(n,s),e.style.removeProperty(n))})})}async function nextProblem(){clickIndex=0,segmentIndex=1,pathIndex=0;const e=document.getElementById("course"),t=e.options[e.selectedIndex].value;iconList.length==0&&(iconList=await fetchIconList(t));const n=iconList[getRandomInt(0,iconList.length)],s=`/icons/${t}/${n}`,o=await fetchIcon(s);svg=o.documentElement,fixIconCode(svg),styleAttributeToAttributes(svg),svg.getAttribute("fill")||svg.setAttribute("fill","gray"),resetCurrentColor(svg),workspaceGroup=removeSvgTagAttributes(svg),shape2path(svg,createPath,{circleAlgorithm:"QuadBezier"}),removeUseTags(svg),removeTransforms(svg),paths=[...svg.getElementsByTagName("path")],hideIcon(svg),fontSize=getFontSize(svg),setViewBox(svg,fontSize),currPath=addNumbers(fontSize),svg.style.width="100%",svg.style.height="100%",document.getElementById("iconContainer").replaceChildren(svg)}async function changeCourse(){const e=document.getElementById("course"),t=e.options[e.selectedIndex].value;iconList=await fetchIconList(t)}const svgNamespace="http://www.w3.org/2000/svg",xlinkNamespace="http://www.w3.org/1999/xlink";let clickIndex=0,segmentIndex=1,pathIndex=0,svg,paths,fontSize,currPath,workspaceGroup,iconList=[];nextProblem(),document.getElementById("toggleDarkMode").onclick=toggleDarkMode,document.getElementById("lang").onchange=changeLang,document.getElementById("startButton").onclick=nextProblem,document.getElementById("course").onclick=changeCourse,document.addEventListener("click",unlockAudio,{once:!0,useCapture:!0})