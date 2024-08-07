import { shape2path } from "https://cdn.jsdelivr.net/npm/@marmooo/shape2path@0.0.2/+esm";
import svgpath from "https://cdn.jsdelivr.net/npm/svgpath@2.6.0/+esm";

const courseNode = document.getElementById("course");
let audioContext;
const audioBufferCache = {};
loadConfig();

function loadConfig() {
  if (localStorage.getItem("darkMode") == 1) {
    document.documentElement.setAttribute("data-bs-theme", "dark");
  }
}

function toggleDarkMode() {
  if (localStorage.getItem("darkMode") == 1) {
    localStorage.setItem("darkMode", 0);
    document.documentElement.setAttribute("data-bs-theme", "light");
  } else {
    localStorage.setItem("darkMode", 1);
    document.documentElement.setAttribute("data-bs-theme", "dark");
  }
}

function createAudioContext() {
  if (globalThis.AudioContext) {
    return new globalThis.AudioContext();
  } else {
    console.error("Web Audio API is not supported in this browser");
    return null;
  }
}

function unlockAudio() {
  if (audioContext) {
    audioContext.resume();
  } else {
    audioContext = createAudioContext();
    loadAudio("error", "/number-icon/mp3/boyon1.mp3");
    loadAudio("correct1", "/number-icon/mp3/pa1.mp3");
    loadAudio("correct2", "/number-icon/mp3/papa1.mp3");
    loadAudio("correctAll", "/number-icon/mp3/levelup1.mp3");
  }
  document.removeEventListener("pointerdown", unlockAudio);
  document.removeEventListener("keydown", unlockAudio);
}

async function loadAudio(name, url) {
  if (!audioContext) return;
  if (audioBufferCache[name]) return audioBufferCache[name];
  try {
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
    audioBufferCache[name] = audioBuffer;
    return audioBuffer;
  } catch (error) {
    console.error(`Loading audio ${name} error:`, error);
    throw error;
  }
}

function playAudio(name, volume) {
  if (!audioContext) return;
  const audioBuffer = audioBufferCache[name];
  if (!audioBuffer) {
    console.error(`Audio ${name} is not found in cache`);
    return;
  }
  const sourceNode = audioContext.createBufferSource();
  sourceNode.buffer = audioBuffer;
  const gainNode = audioContext.createGain();
  if (volume) gainNode.gain.value = volume;
  gainNode.connect(audioContext.destination);
  sourceNode.connect(gainNode);
  sourceNode.start();
}

function changeLang() {
  const langObj = document.getElementById("lang");
  const lang = langObj.options[langObj.selectedIndex].value;
  location.href = `/number-icon/${lang}/`;
}

function createPath(node) {
  const path = document.createElementNS(svgNamespace, "path");
  for (const attribute of node.attributes) {
    path.setAttribute(attribute.name, attribute.value);
  }
  return path;
}

function isOverlapped(target, rect) {
  return target.some((targetRect) =>
    targetRect.left < rect.right &&
    targetRect.right > rect.left &&
    targetRect.top < rect.bottom &&
    targetRect.bottom > rect.top
  );
}

function handleTextClick(text, pathIndex, value) {
  if (clickIndex + 1 != value) {
    playAudio("error");
    return;
  }
  clickIndex += 1;
  const currPath = problem[pathIndex].path;
  if (textIndex != 0) currPath.nextElementSibling.remove();
  text.style.cursor = "initial";
  text.setAttribute("fill-opacity", 0.5);
  text.onclick = null;

  const path = createPath(problem[pathIndex].path);
  resetCurrentColor(path);
  path.style.fill = "";
  path.style.stroke = "";
  const pathData = svgpath.from(problem[pathIndex].pathData);

  if (textIndex + 1 == problem[pathIndex].texts.length) {
    path.setAttribute("d", pathData.toString());
    currPath.after(path);

    problem[pathIndex].texts.forEach((prevText) => {
      prevText.remove();
    });
    if (pathIndex + 1 == problem.length) {
      playAudio("correctAll");
    } else {
      playAudio("correct2");
      currPathIndex += 1;
      textIndex = 0;
      problem[currPathIndex].texts.forEach((currText) => {
        currText.style.display = "initial";
      });
    }
  } else {
    const segmentIndex = problem[pathIndex].rects[textIndex].i;
    pathData.segments = pathData.segments.slice(0, segmentIndex + 1);
    path.setAttribute("d", pathData.toString());
    currPath.after(path);

    playAudio("correct1");
    textIndex += 1;
  }
}

function addNumber(x, y, fontSize, i, pathIndex, display) {
  const text = document.createElementNS(svgNamespace, "text");
  text.setAttribute("x", x);
  text.setAttribute("y", y + fontSize);
  text.setAttribute("text-anchor", "middle");
  text.setAttribute("font-size", fontSize);
  text.setAttribute("fill", "currentColor");
  text.style.display = display;
  text.style.cursor = "pointer";
  text.textContent = i;
  text.onclick = () => handleTextClick(text, pathIndex, i);
  svg.appendChild(text);
  return text;
}

function getAccessList(n) {
  const list = new Array(n * 2 + 1);
  for (let x = -n; x <= n; x++) {
    for (let y = -n; y <= n; y++) {
      const distance = Math.abs(x) + Math.abs(y);
      if (list[distance]) {
        list[distance].push([x, y]);
      } else {
        list[distance] = [[x, y]];
      }
    }
  }
  return list;
}

function getPoints(pathData) {
  const points = [];
  let x = 0;
  let y = 0;
  let n = 0;
  pathData.segments.forEach((segment, i) => {
    switch (segment[0]) {
      case "H":
        x = segment[1];
        points.push([x, y]);
        break;
      case "h":
        x += segment[1];
        points.push([x, y]);
        break;
      case "V":
        y = segment[1];
        points.push([x, y]);
        break;
      case "v":
        y += segment[1];
        points.push([x, y]);
        break;
      case "M":
        x = segment.at(-2);
        y = segment.at(-1);
        n = i;
        points.push([x, y]);
        break;
      case "L":
      case "C":
      case "S":
      case "Q":
      case "T":
      case "A":
        x = segment.at(-2);
        y = segment.at(-1);
        points.push([x, y]);
        break;
      case "m":
        x += segment.at(-2);
        y += segment.at(-1);
        n = i;
        points.push([x, y]);
        break;
      case "l":
      case "c":
      case "s":
      case "q":
      case "t":
      case "a":
        x += segment.at(-2);
        y += segment.at(-1);
        points.push([x, y]);
        break;
      case "Z":
      case "z":
        x = points[n][0];
        y = points[n][1];
        points.push([x, y]);
        break;
    }
  });
  return points;
}

function replaceNumber(numbers, rect, width, fontSize) {
  const newRect = structuredClone(rect);
  for (const positions of accessList) {
    for (const [x, y] of positions) {
      const dx = width * x / 2;
      const dy = fontSize * y / 2;
      newRect.left = rect.left + dx;
      newRect.right = rect.right + dx;
      newRect.top = rect.top + dy;
      newRect.bottom = rect.bottom + dy;
      if (!isOverlapped(numbers, newRect)) return newRect;
    }
  }
  return newRect;
}

function getRects(points, index, fontSize, skipThreshold) {
  const rects = [];
  const margin = 1;
  let px = -Infinity;
  let py = -Infinity;
  points.forEach(([x, y], i) => {
    const distance = Math.sqrt((x - px) ** 2 + (y - py) ** 2);
    if (skipThreshold < distance) {
      const n = index + i;
      const w = (n.toString().length / 2 + margin) * fontSize;
      const w2 = w / 2;
      const rect = {
        left: x - w2,
        top: y,
        right: x + w2,
        bottom: y + fontSize,
        i,
      };
      const newRect = replaceNumber(rects, rect, w, fontSize);
      rects.push(newRect);
      px = x;
      py = y;
    }
  });
  return rects;
}

function addNumbers(fontSize) {
  const viewBox = getViewBox(svg);
  const skipThreshold = viewBox[3] * skipFactor;
  let index = 1;
  problem.forEach((data, pathIndex) => {
    const pathData = svgpath(data.path.getAttribute("d"));
    const points = getPoints(pathData);
    const rects = getRects(points, index, fontSize, skipThreshold);

    const texts = [];
    const display = (pathIndex == 0) ? "initial" : "none";
    rects.forEach((rect) => {
      const left = rect.left + (rect.right - rect.left) / 2;
      const text = addNumber(
        left,
        rect.top,
        fontSize,
        index,
        pathIndex,
        display,
      );
      texts.push(text);
      index += 1;
    });

    data.rects = rects;
    data.texts = texts;
    data.pathData = pathData;
  });
}

function removeTransforms(svg) {
  // getCTM() requires visibility=visible & numerical width/height attributes
  const viewBox = getViewBox(svg);
  svg.setAttribute("width", viewBox[2]);
  svg.setAttribute("height", viewBox[3]);
  for (const path of svg.getElementsByTagName("path")) {
    const { a, b, c, d, e, f } = path.getCTM();
    const pathData = svgpath(path.getAttribute("d"));
    pathData.matrix([a, b, c, d, e, f]);
    path.setAttribute("d", pathData.toString());
  }
  for (const node of svg.querySelectorAll("[transform]")) {
    node.removeAttribute("transform");
  }
}

function removeUseTags(svg) {
  const uses = [...svg.getElementsByTagName("use")];
  for (const use of uses) {
    let id = use.getAttributeNS(xlinkNamespace, "href").slice(1);
    if (!id) id = use.getAttribute("href").slice(1); // SVG 2
    if (!id) continue;
    const g = svg.getElementById(id).cloneNode(true);
    for (const attribute of use.attributes) {
      if (attribute.localName == "href") continue;
      g.setAttribute(attribute.name, attribute.value);
    }
    g.removeAttribute("id");
    use.replaceWith(g);
  }
}

// https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Values_and_units
function lengthToPixel(str) {
  const x = parseFloat(str);
  switch (str.slice(0, -2)) {
    case "cm":
      return x / 96 * 2.54;
    case "mm":
      return x / 96 * 254;
    case "in":
      return x / 96;
    case "pc":
      return x * 16;
    case "pt":
      return x / 96 * 72;
    case "px":
      return x;
    default:
      return x;
  }
}

function getFontSize(svg) {
  const viewBox = svg.getAttribute("viewBox");
  if (viewBox) {
    const width = Number(viewBox.split(" ")[2]);
    return width / 40;
  } else {
    const width = lengthToPixel(svg.getAttribute("width"));
    return width / 40;
  }
}

function getViewBox(svg) {
  const viewBox = svg.getAttribute("viewBox");
  if (viewBox) {
    return viewBox.split(" ").map(Number);
  } else {
    const width = lengthToPixel(svg.getAttribute("width"));
    const height = lengthToPixel(svg.getAttribute("height"));
    return [0, 0, width, height];
  }
}

function setViewBox(svg) {
  const viewBox = getViewBox(svg);
  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;
  problem.forEach((data) => {
    data.rects.forEach((rect) => {
      const { left, top, right, bottom } = rect;
      if (left < minX) minX = left;
      if (top < minY) minY = top;
      if (maxX < right) maxX = right;
      if (maxY < bottom) maxY = bottom;
    });
  });
  minX = Math.floor(minX);
  minY = Math.floor(minY);
  maxX = Math.ceil(maxX);
  maxY = Math.ceil(maxY);
  const viewBoxMaxX = viewBox[0] + viewBox[2];
  const viewBoxMaxY = viewBox[1] + viewBox[3];
  if (viewBox[0] < minX) minX = viewBox[0];
  if (viewBox[1] < minY) minY = viewBox[1];
  if (maxX < viewBoxMaxX) maxX = viewBoxMaxX;
  if (maxY < viewBoxMaxY) maxY = viewBoxMaxY;
  viewBox[0] = minX;
  viewBox[1] = minY;
  viewBox[2] = maxX - minX;
  viewBox[3] = maxY - minY;
  svg.setAttribute("viewBox", viewBox.join(" "));
}

function hideIcon() {
  problem.forEach((data) => {
    const path = data.path;
    path.style.fill = "none";
    path.style.stroke = "none";
  });
}

async function fetchIconList(course) {
  const response = await fetch(`/number-icon/data/${course}.txt`);
  const text = await response.text();
  return text.trimEnd().split("\n");
}

async function fetchIcon(url) {
  const response = await fetch(url);
  const svg = await response.text();
  return new DOMParser().parseFromString(svg, "image/svg+xml");
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

// https://developer.mozilla.org/en-US/docs/Web/SVG/Element/svg
const presentationAttributes = new Set([
  "alignment-baseline",
  "baseline-shift",
  "clip",
  "clip-path",
  "clip-rule",
  "color",
  "color-interpolation",
  "color-interpolation-filters",
  "color-profile",
  "color-rendering",
  "cursor",
  // "d",
  "direction",
  "display",
  "dominant-baseline",
  "enable-background",
  "fill",
  "fill-opacity",
  "fill-rule",
  "filter",
  "flood-color",
  "flood-opacity",
  "font-family",
  "font-size",
  "font-size-adjust",
  "font-stretch",
  "font-style",
  "font-variant",
  "font-weight",
  "glyph-orientation-horizontal",
  "glyph-orientation-vertical",
  "image-rendering",
  "kerning",
  "letter-spacing",
  "lighting-color",
  "marker-end",
  "marker-mid",
  "marker-start",
  "mask",
  "opacity",
  "overflow",
  "pointer-events",
  "shape-rendering",
  "solid-color",
  "solid-opacity",
  "stop-color",
  "stop-opacity",
  "stroke",
  "stroke-dasharray",
  "stroke-dashoffset",
  "stroke-linecap",
  "stroke-linejoin",
  "stroke-miterlimit",
  "stroke-opacity",
  "stroke-width",
  "text-anchor",
  "text-decoration",
  "text-rendering",
  "transform",
  "unicode-bidi",
  "vector-effect",
  "visibility",
  "word-spacing",
  "writing-mode",
]);

function removeSvgTagAttributes(svg) {
  const candidates = [];
  [...svg.attributes].forEach((attribute) => {
    if (presentationAttributes.has(attribute.name)) {
      candidates.push(attribute);
      svg.removeAttribute(attribute.name);
    }
  });
  if (candidates.length > 0) {
    const g = document.createElementNS(svgNamespace, "g");
    candidates.forEach((attribute) => {
      g.setAttribute(attribute.name, attribute.value);
    });
    [...svg.children].forEach((node) => {
      g.appendChild(node);
    });
    svg.appendChild(g);
  }
}

function fixIconCode(svg) {
  const course = courseNode.options[courseNode.selectedIndex].value;
  switch (course) {
    case "tabler-icons":
      svg.firstElementChild.remove();
      break;
    case "streamline-vectors":
      for (const node of svg.querySelectorAll('[stroke="#3e3e3e"]')) {
        node.setAttribute("stroke", "gray");
      }
      break;
  }
}

function computeAttribute(node, attributeName) {
  let attributeValue;
  while (!attributeValue && node && node.tagName) {
    attributeValue = node.getAttribute(attributeName);
    node = node.parentNode;
  }
  return attributeValue;
}

function resetCurrentColor(node) {
  const fill = computeAttribute(node, "fill");
  const stroke = computeAttribute(node, "stroke");
  if (fill && fill.toLowerCase() == "currentcolor") {
    node.setAttribute("fill", "gray");
  }
  if (stroke && stroke.toLowerCase() == "currentcolor") {
    node.setAttribute("stroke", "gray");
  }
}

function styleAttributeToAttributes(svg) {
  [...svg.querySelectorAll("[style]")].forEach((node) => {
    node.getAttribute("style").split(";").forEach((style) => {
      const [property, value] = style.split(":").map((str) => str.trim());
      if (presentationAttributes.has(property)) {
        node.setAttribute(property, value);
        node.style.removeProperty(property);
      }
    });
  });
}

async function nextProblem() {
  clickIndex = 0;
  textIndex = 0;
  currPathIndex = 0;
  const courseNode = document.getElementById("course");
  const course = courseNode.options[courseNode.selectedIndex].value;
  if (iconList.length == 0) {
    iconList = await fetchIconList(course);
  }
  const filePath = iconList[getRandomInt(0, iconList.length)];
  const url = `/svg/${course}/${filePath}`;
  const icon = await fetchIcon(url);
  svg = icon.documentElement;

  fixIconCode(svg);
  styleAttributeToAttributes(svg);
  if (!svg.getAttribute("fill")) svg.setAttribute("fill", "gray");
  resetCurrentColor(svg);
  removeSvgTagAttributes(svg);
  shape2path(svg, createPath, { circleAlgorithm: "QuadBezier" });
  removeUseTags(svg);

  document.getElementById("iconContainer").replaceChildren(svg);
  removeTransforms(svg);

  problem = [];
  [...svg.getElementsByTagName("path")].forEach((path) => {
    problem.push({ path });
  });
  hideIcon(svg);
  addNumbers(getFontSize(svg));

  svg.style.width = "100%";
  svg.style.height = "100%";
  setViewBox(svg);
}

async function changeCourse() {
  const course = courseNode.options[courseNode.selectedIndex].value;
  iconList = await fetchIconList(course);
  selectAttribution(courseNode.selectedIndex);
  nextProblem();
}

function selectRandomCourse() {
  const index = getRandomInt(0, courseNode.options.length);
  courseNode.options[index].selected = true;
  selectAttribution(index);
}

function selectAttribution(index) {
  const divs = [...document.getElementById("attribution").children];
  divs.forEach((div, i) => {
    if (i == index) {
      div.classList.remove("d-none");
    } else {
      div.classList.add("d-none");
    }
  });
}

const svgNamespace = "http://www.w3.org/2000/svg";
const xlinkNamespace = "http://www.w3.org/1999/xlink";
const accessList = getAccessList(5);
const skipFactor = 0.05;
let clickIndex = 0;
let textIndex = 0;
let currPathIndex = 0;
let svg;
let problem;
let iconList = [];

selectRandomCourse();
nextProblem();

document.getElementById("toggleDarkMode").onclick = toggleDarkMode;
document.getElementById("lang").onchange = changeLang;
document.getElementById("startButton").onclick = nextProblem;
courseNode.onclick = changeCourse;
document.addEventListener("pointerdown", unlockAudio, { once: true });
document.addEventListener("keydown", unlockAudio, { once: true });
