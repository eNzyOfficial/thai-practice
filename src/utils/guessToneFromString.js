// const shortVowelPattern = /[ะิึุูเแัำๅ](?![เาแโไใ์])/u;
// const shortVowelPattern = /[ะิึุูเแัำๅ]/u;
const shortVowelPattern = /[ะิึุูเแัำๅ](?![เาแโไใๅะำเฯๆ])/u;
// const longVowelPattern = /[เาแอไโใไะาฤฦ\u0E30-\u0E39\u0E3F-\u0E46]/u;
const longVowelPattern = /[เแอไโใไาอำ](?![ะ])/u;



const deadConsonantEndingsPattern = /[กขคฆปพภฟบตฏถฐทฒฑธจซฌญชศสฎ]/u;
const liveConsonantEndingsPattern = /[นณญรลฬงมยว]/u;
const invalidConsonantEndingsPattern = /[ฉผฝหฮ]/u;

const highClassConsonantPattern = /[ขฉฐถผฝศษสห]/u;
const middleClassConsonantPattern = /[กจฎฏดตบปอ]/u;
const lowClassConsonantPattern = /[คฆงชซฌญฑฒณทธนพฟภมยรลวฬฮ]/u;

const endingVowelCharacterPattern = /อ[ืุูึะำีฯๆ]?/u;

const thaiVowelPattern = /[\u0E30-\u0E39\u0E3F-\u0E46ะาิีึืุูเแัำๅ]/gu;
const thaiToneMarkerPattern = /\u0E48|\u0E49|\u0E4A|\u0E4B/gu;

export default function analyzeThaiWord(word) {
  const payload = {
    longShort: null,
    isLive: null,
    classValue: null,
    toneMarker: null,
  };

  word = word.normalize("NFC").trim();

  if (word.length === 0) {
    return payload;
  }

  const lastChar = word[word.length - 1];
  const haawHipLeads = /ห[ก-ฮ]/u.test(word);
  const awAangLeads = /อ[งนมยรลว]/u.test(word);

  const isShortVowel = shortVowelPattern.test(word);
  const isLongVowel = longVowelPattern.test(word);

  const consonantsOnly = word.replace(thaiVowelPattern, "").replace(thaiToneMarkerPattern, "");

  const isDeadConsonant = deadConsonantEndingsPattern .test(word);
  const isLiveConsonant = liveConsonantEndingsPattern.test(word);
  const isLastLetterLive = consonantsOnly.includes(word[word.length-1]) && liveConsonantEndingsPattern.test(word[word.length-1]);

  const isHighClass = highClassConsonantPattern.test(consonantsOnly[0]);
  const isMiddleClass = middleClassConsonantPattern.test(consonantsOnly[0]);
  const isLowClass = lowClassConsonantPattern.test(consonantsOnly[0]);

//   const hasHiddenVowel = word.length - consonantsOnly.length > 0;

    // eg. คน
  const hasHiddenVowel = word.length - consonantsOnly.length > 0;

  const endsWithSpecificConsonants = /น$|ม$|ง$/u; // Adjust as per linguistic observations
    if (endsWithSpecificConsonants.test(word)) {
        payload.longShort = "long";
    } else if (isLongVowel || (hasHiddenVowel && !isShortVowel)) {
    payload.longShort = "long";
  } else if (isShortVowel) {
    payload.longShort = "short";
  } else {
    payload.longShort = null;
  }

  if (
    !highClassConsonantPattern.test(lastChar) &&
    !middleClassConsonantPattern.test(lastChar) &&
    !lowClassConsonantPattern.test(lastChar)
  ) {
    payload.isLive = null;
  } else if (consonantsOnly.length === 1 || (consonantsOnly.length === 2 && haawHipLeads)) {
    payload.isLive = null;
  } else if (endingVowelCharacterPattern.test(word)) {
    payload.isLive = null;
  } else if (isDeadConsonant && !isLastLetterLive) {
    payload.isLive = false;
  } else if (isLiveConsonant || isLastLetterLive) {
    payload.isLive = true;
  } else {
    payload.isLive = null;
  }

  if ((isHighClass || haawHipLeads) && !awAangLeads) {
    payload.classValue = "high";
  } else if (isMiddleClass || awAangLeads) {
    payload.classValue = "middle";
  } else if (isLowClass) {
    payload.classValue = "low";
  } else {
    payload.classValue = null;
  }

  if (word.includes("่")) {
    payload.toneMarker = "ayk";
  } else if (word.includes("้")) {
    payload.toneMarker = "toh";
  } else if (word.includes("๊")) {
    payload.toneMarker = "dtree";
  } else if (word.includes("๋")) {
    payload.toneMarker = "jatwaa";
  } else {
    payload.toneMarker = null;
  }

  const toneKey = toneKeyGenerator(payload);

  payload.tone = toneRuleGenerator(toneKey);

  console.log({
    word,
    lastChar,
    haawHipLeads,
    awAangLeads,
    isShortVowel,
    isLongVowel,
    consonantsOnly,
    isDeadConsonant,
    isLiveConsonant,
    isLastLetterLive,
    isHighClass,
    isMiddleClass,
    isLowClass,
    hasHiddenVowel,
    payload
  })

  return payload;
}

export function toneKeyGenerator({ toneMarker, classValue, longShort, isLive }) {
  if (toneMarker !== null) {
    return `marker:${toneMarker}|class:${classValue}`;
  }

  if (isLive === null) {
    return `class:${classValue}|length:${longShort}`;
  }

  return `class:${classValue}|length:${longShort}|live:${isLive}`;
}

export function toneRuleGenerator(toneKey) {
  let tone;

  switch (toneKey) {
    case "class:low|length:short":
    case "class:low|length:short|live:false":
      tone = "high-short";
      break;

    case "marker:ayk|class:low":
    case "marker:toh|class:middle":
    case "marker:toh|class:high":
    case "class:low|length:long|live:false":
      tone = "falling";
      break;

    case "marker:toh|class:low":
    case "marker:dtree|class:middle":
      tone = "high";
      break;

    case "marker:jatwaa|class:middle":
    case "class:high|length:long":
    case "class:high|length:short|live:true":
    case "class:high|length:long|live:true":
      tone = "rising";
      break;

    case "class:middle|length:long":
    case "class:low|length:long":
    case "class:middle|length:short|live:true":
    case "class:middle|length:long|live:true":
    case "class:low|length:long|live:true":
    case "class:low|length:short|live:true":
      tone = "medium";
      break;

    case "class:middle|length:short":
    case "class:high|length:short":
    case "marker:ayk|class:middle":
    case "marker:ayk|class:high":
    case "class:middle|length:short|live:false":
    case "class:middle|length:long|live:false":
    case "class:high|length:short|live:false":
    case "class:high|length:long|live:false":
      tone = "low";
      break;

    case "marker:dtree|class:high":
    case "marker:dtree|class:low":
    case "marker:jatwaa|class:high":
    case "marker:jatwaa|class:low":
      tone = "-";
      break;

    default:
      tone = null;
      break;
  }

  return tone;
}