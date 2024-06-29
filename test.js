// function analyzeThaiSyllable(syllable) {
//     const highClassConsonants = 'ขฉฐถผฝศษสห';
//     const middleClassConsonants = 'กจฎฏดตบปอ';
//     const lowClassConsonants = 'คฆงชซฌญฑฒณทธนพฟภมยรลวฬฮ';
//     const deadSyllableEndings = 'กขคฆปพภฟบตฏถฐทฒฑธจซฌญชศสฎ';
//     const liveSyllableEndings = 'นณญรลฬงมยว';
//     const invalidEndings = 'ฉผฝหฮ';
//     const toneMarkers = {
//         '่': 'mái-èek',
//         '้': 'mái-thoo',
//         '๊': 'mái-dtrii',
//         '๋': 'mái-jàt-dtà-waa'
//     };

//     const shortVowels = ['ะ', 'ิ', 'ึ', 'ุ', 'เ-ะ', 'แ-ะ', 'เอียะ', 'เอือะ', 'อัวะ', 'โ-ะ', 'เ-าะ', 'เ-อะ', 'ใ-', 'อำ', 'ฤ'];
//     const longVowels = ['า', 'ี', 'ือ', 'ู', 'เ-', 'แ-', 'เอีย', 'เอือ', 'อัว', 'โ-', 'อ', 'เ-อ', 'ไ-', 'เ-า', 'ฤๅ'];

//     const transformShortVowels = {
//         'ั': 'ะ',
//         'ิ': 'ิ',
//         'ึ': 'ึ',
//         'ุ': 'ุ',
//         '็': 'ะ',
//         '์': '-',
//         'ื': 'ื',
//         'เ': 'เ-ะ',
//         'แ': 'แ-ะ',
//         'โ': 'โ-ะ',
//         'ฤ': 'ฤ'
//     };

//     const clusters = [
//         'กร', 'กล', 'กว', 'ขร', 'ขล', 'ขว', 'คร', 'คล', 'คว', 'ปร', 'ปล', 'ผล', 'พร', 'พล', 'ตร',
//         'บร', 'บล', 'ดร', 'ฟร', 'ฟล', 'ทร', 'จร', 'สร', 'ศร'
//     ];

//     function getConsonantClass(consonant) {
//         if (highClassConsonants.includes(consonant)) return 'high';
//         if (middleClassConsonants.includes(consonant)) return 'middle';
//         if (lowClassConsonants.includes(consonant)) return 'low';
//         return null;
//     }

//     function getVowelLength(vowel) {
//         if (shortVowels.includes(vowel)) return 'short';
//         if (longVowels.includes(vowel)) return 'long';
//         return null;
//     }

//     function isFinalConsonantDead(consonant) {
//         if (deadSyllableEndings.includes(consonant)) return true;
//         if (liveSyllableEndings.includes(consonant)) return false;
//         return null;
//     }

//     function determineSpokenTone(consonantClass, vowelLength, toneMarker, isFinalConsonantDead) {
//         if (toneMarker) {
//             switch (toneMarker) {
//                 case '่':
//                     if (consonantClass === 'middle' || consonantClass === 'high') return 'low';
//                     if (consonantClass === 'low') return 'falling';
//                     break;
//                 case '้':
//                     if (consonantClass === 'middle' || consonantClass === 'high') return 'falling';
//                     if (consonantClass === 'low') return 'high';
//                     break;
//                 case '๊':
//                     if (consonantClass === 'middle') return 'high';
//                     break;
//                 case '๋':
//                     if (consonantClass === 'middle') return 'rising';
//                     break;
//             }
//         } else {
//             if (consonantClass === 'middle') {
//                 if (vowelLength === 'short') return isFinalConsonantDead ? 'low' : 'medium';
//                 if (vowelLength === 'long') return isFinalConsonantDead ? 'low' : 'medium';
//             }
//             if (consonantClass === 'high') {
//                 if (vowelLength === 'short') return isFinalConsonantDead ? 'low' : 'rising';
//                 if (vowelLength === 'long') return isFinalConsonantDead ? 'low' : 'rising';
//             }
//             if (consonantClass === 'low') {
//                 if (vowelLength === 'short') return isFinalConsonantDead ? 'high-short' : 'medium';
//                 if (vowelLength === 'long') return isFinalConsonantDead ? 'falling' : 'medium';
//             }
//         }
//         return null;
//     }

//     let initialConsonant = '';
//     let finalConsonant = '';
//     let vowel = '';
//     let toneMarker = null;

//     // Handling leading consonants
//     if (syllable.length > 1 && (syllable[0] === 'ห' || syllable[0] === 'อ') && !clusters.includes(syllable.substring(0, 2))) {
//         initialConsonant = syllable[0];
//         syllable = syllable.substring(1);
//     }

//     // Identify tone marker if any
//     const lastChar = syllable[syllable.length - 1];
//     if (toneMarkers[lastChar]) {
//         toneMarker = lastChar;
//         syllable = syllable.slice(0, -1);
//     }

//     // Determine initial consonant, vowel, and final consonant
//     const matchCluster = clusters.find(cluster => syllable.startsWith(cluster));
//     if (matchCluster) {
//         initialConsonant = matchCluster;
//         syllable = syllable.slice(matchCluster.length);
//     } else {
//         initialConsonant += syllable[0];
//         syllable = syllable.slice(1);
//     }

//     if (syllable.length > 1) {
//         finalConsonant = syllable[syllable.length - 1];
//         vowel = syllable.slice(0, -1);
//     } else {
//         vowel = syllable;
//     }

//     // Adjust vowel if it is transformed
//     if (transformShortVowels[vowel]) {
//         vowel = transformShortVowels[vowel];
//     }

//     console.log('Initial consonant:', initialConsonant);
//     console.log('Vowel:', vowel);
//     console.log('Final consonant:', finalConsonant);
//     console.log('Tone marker:', toneMarker);

//     const consonantClass = getConsonantClass(initialConsonant);
//     const vowelLength = getVowelLength(vowel);
//     const hasFinalConsonant = !!finalConsonant;
//     const isFinalConsonantDead2 = finalConsonant ? isFinalConsonantDead(finalConsonant) : null;
//     const spokenTone = determineSpokenTone(consonantClass, vowelLength, toneMarker, isFinalConsonantDead2);

//     return {
//         consonant_class: consonantClass,
//         vowel_length: vowelLength,
//         has_final_consonant: hasFinalConsonant,
//         is_final_consonant_dead: isFinalConsonantDead2,
//         spoken_tone: spokenTone,
//         tone_marker: toneMarker || null
//     };
// }

// // Example usage
// const word = 'ใหม่';  // Example Thai word
// console.log(analyzeThaiSyllable(word));

// function extractVowel(syllable) {
//     const compositeVowels = [
//         'เ-ะ', 'แ-ะ', 'โ-ะ', 'เ-าะ', 'เ-อะ', 'เอีย', 'เอือ', 'อัว', 'เอียะ', 'เอือะ', 'อัวะ',
//         'เ-', 'แ-', 'โ-', 'ไ-', 'ใ-'
//     ];

//     const simpleVowels = [
//         'ะ', 'า', 'ิ', 'ี', 'ึ', 'ื', 'ุ', 'ู', 'เ', 'แ', 'โ', 'ใ', 'ไ', 'ฤ', 'ฤๅ', 'อำ'
//     ];

//     // Handle composite vowels first, including those with placeholders
//     for (const vowel of compositeVowels) {
//         if (vowel.includes('-')) {
//             // If the vowel has a placeholder
//             const parts = vowel.split('-');
//             const leading = parts[0];
//             const trailing = parts[1];

//             if (syllable.startsWith(leading) && syllable.endsWith(trailing)) {
//                 return vowel;
//             }
//         } else if (syllable.includes(vowel)) {
//             return vowel;
//         }
//     }

//     // Check for simple vowels
//     for (const vowel of simpleVowels) {
//         if (syllable.includes(vowel)) {
//             return vowel;
//         }
//     }

//     return null;  // Return null if no vowel is found
// }

// // Example usage
// const syllable = 'เอียะ';  // Example Thai syllable
// const vowel = extractVowel(syllable);
// console.log('Vowel:', vowel);

const thaiConsonants = '[ก-ฮ]'
const shortVowelPatterns = [
    new RegExp(`เ(${thaiConsonants})ิ`, 'g'), // เอิ
    new RegExp(`(?<=${thaiConsonants})ั(?=${thaiConsonants})`, 'g'), // อัอ
  new RegExp(`(${thaiConsonants})ะ`, 'g'), // อะ
  new RegExp(`(${thaiConsonants})ิ`, 'g'), // อิ
  new RegExp(`(${thaiConsonants})ึ`, 'g'), // อึ
  new RegExp(`(${thaiConsonants})ุ`, 'g'), // อุ
  new RegExp(`เ(${thaiConsonants})ะ`, 'g'), // เอะ
  new RegExp(`แ(${thaiConsonants})ะ`, 'g'), // แอะ
  new RegExp(`เ(${thaiConsonants})ียะ`, 'g'), // เอียะ
  new RegExp(`เ(${thaiConsonants})ือะ`, 'g'), // เอือะ
  new RegExp(`(${thaiConsonants})ัวะ`, 'g'), // อัวะ
  new RegExp(`โ(${thaiConsonants})ะ`, 'g'), // โอะ
  new RegExp(`เ(${thaiConsonants})าะ`, 'g'), // เอาะ
  new RegExp(`เ(${thaiConsonants})อะ`, 'g'), // เออะ
  new RegExp(`ฤ(${thaiConsonants})`, 'g') // ฤอ
]

const longVowelPatterns = [
    new RegExp(`(?<=${thaiConsonants})ว(?=${thaiConsonants})`, 'g'), // อวอ
    new RegExp(`(${thaiConsonants})[า](?!ะ)`, 'g'), // Long vowels with tone markers
    new RegExp(`(${thaiConsonants})[ี]`, 'g'), // อี
    new RegExp(`(${thaiConsonants})[ื]`, 'g'), // อื
    new RegExp(`(${thaiConsonants})[ู]`, 'g'), // อู
    new RegExp(`เ(${thaiConsonants})(?!ะ)`, 'g'), // เ-ี excluding เ-ียะ
    new RegExp(`แ(${thaiConsonants})(?!ะ)`, 'g'), // แอ (excluding แ-ะ)
    new RegExp(`เ(${thaiConsonants})ีย(?!ะ)`, 'g'), // เอีย (excluding เ-ียะ)
    new RegExp(`เ(${thaiConsonants})ือ(?!ะ)`, 'g'), // เอือ (excluding เ-ือะ)
    new RegExp(`(${thaiConsonants})[ั]ว(?!ะ)`, 'g'), // อัว (excluding อ-ะ)
    new RegExp(`โ(${thaiConsonants})(?!ะ)`, 'g'), // โอ
    new RegExp(`ใ(${thaiConsonants})(?!ะ)`, 'g'), // ใอ
    new RegExp(`(${thaiConsonants})[อ](?!ะ)`, 'g'), // ออ (excluding อ-ะ)
    new RegExp(`เ(${thaiConsonants})[อ](?!ะ)`, 'g'), // เออ (excluding เ-อะ)
    new RegExp(`ไ(${thaiConsonants})(?!ะ)`, 'g'), // ไอ
    new RegExp(`เ(${thaiConsonants})[า](?!ะ)`, 'g'), // เอา
    new RegExp(`ฤๅ`, 'g'), // ฤๅ (unique character)
    new RegExp(`(${thaiConsonants})[ำ](?!ะ)`, 'g') // อำ
  ];

// const longVowelPatterns = [
//     new RegExp(`(${thaiConsonants})า(?!ะ)`, 'g'), // อา
//     new RegExp(`(${thaiConsonants})(?!ียะ|ือะ)ี(?!ะ)`, 'g'), // อี excluding เอียะ
//     new RegExp(`(${thaiConsonants})(?!ือะ)ื(?!ะ)`, 'g'), // อื excluding เอือะ
//     new RegExp(`(${thaiConsonants})ู(?!ะ)`, 'g'), // อู
//     new RegExp(`เ(${thaiConsonants})(?!ะ|ียะ|ือะ)(?=[^ะ]*$)`, 'g'), // เอ (excluding เ-ะ, เ-ียะ, เ-ือะ)
//     new RegExp(`แ(${thaiConsonants})(?!ะ)`, 'g'), // แอ (excluding แ-ะ)
//     new RegExp(`เ(${thaiConsonants})ีย(?!ะ)`, 'g'), // เอีย (excluding เ-ียะ)
//     new RegExp(`เ(${thaiConsonants})ือ(?!ะ)`, 'g'), // เอือ (excluding เ-ือะ)
//     new RegExp(`(${thaiConsonants})ัว(?!ะ)`, 'g'), // -ัว (excluding -ัวะ)
//     new RegExp(`โ(${thaiConsonants})(?!ะ)`, 'g'), // โอ
//     new RegExp(`ใ(${thaiConsonants})(?!ะ)`, 'g'), // ใอ
//     new RegExp(`(${thaiConsonants})อ(?!ะ)`, 'g'), // ออ (excluding อ-ะ)
//     new RegExp(`เ(${thaiConsonants})อ(?!ะ)`, 'g'), // เออ (excluding เ-อะ)
//     new RegExp(`ไ(${thaiConsonants})(?!ะ)`, 'g'), // ไอ
//     new RegExp(`เ(${thaiConsonants})า(?!ะ)`, 'g'), // เอา
//     new RegExp(`ฤๅ`, 'g'), // ฤๅ (since ฤๅ is a unique character and doesn't fit the placeholder pattern)
//     new RegExp(`(${thaiConsonants})ำ(?!ะ)`, 'g') // อำ
//   ];

// Example usage
const testWords = [
    'กิน', 'น้ำ', 'ไป', 'มา', 'ให้', 'กลับ', 'นาน', 'อยู่', 'ดี', 'หนาว',
  'ร้อน', 'กว่า', 'ถูก', 'ผิด', 'ค่อน', 'มาก', 'น้อย', 'เดิน', 'วิ่ง', 'คิด',
  'ดื่ม', 'รอ', 'หลับ', 'ตื่น', 'อ่าน', 'เขียน', 'ใส่', 'ถอด', 'ให้', 'เปิด',
  'ปิด', 'เหมาะ', 'เหมือน', 'แปลก', 'สนุก', 'เบื่อ', 'เศร้า', 'ดี', 'เลว', 'รวย',
  'จน', 'สะ','ดวก', 'แพง', 'ถูก', 'เป็น', 'คือ', 'ต้อง', 'ไม่', 'ควร',
  'เป็น', 'คน', 'คน', 'ของ', 'ขอ', 'นะ', 'เวลา', 'ตั้ง', 'รู้', 'จำ',
  'น่า', 'แล้ว', 'อีก', 'จำนวน', 'ตาม', 'นั้น', 'ไป', 'ที่', 'ตลอด', 'ชีวิต',
  'บาง', 'เหลือ', 'หาย', 'ใหญ่', 'เล็ก', 'ครบ', 'แบบ', 'สวย', 'หรือ', 'น่า',
  'สอง', 'หนึ่ง', 'เสีย', 'เรียก', 'ออก', 'เข้า', 'ใน', 'ด้าน', 'หลัง', 'ส่วน',
  'คำ', 'ใด', 'ดัง', 'ดั้ง', 'เห','ตุ', 'เหมือน', 'เช่น', 'เหมือน', 'รุ่น', 'ชาว',
//   'เช่า', 'แพง', 'ถูก', 'เพิ่ม', 'ลด', 'มี', 'ไม่', 'มี', 'ปัจจุบัน', 'ประมาณ',
//   'เหตุ', 'แห่ง', 'ช่วง', 'เดิน', 'กิน', 'นั่ง', 'ลง', 'ขึ้น', 'ขึ้น', 'จบ',
//   'เรียก', 'แน่นอน', 'บอก', 'หลาย', 'ทุก', 'ให้', 'ความ', 'ขอบคุณ', 'ขอบคุณ', 'ใน',
//   'รวม', 'คิด', 'พิจารณา', 'คิด', 'ว่า', 'คิด', 'ความ', 'ความ', 'ความ', 'เลว', 'ความ',
//   'ตอนนี้', 'ขอบคุณ', 'ปกติ', 'บ้าง', 'บาง', 'ใหญ่', 'เล็ก', 'เพียงพอ', 'เดียว', 'ดั้ง',
//   'ทาง', 'ตาม', 'ต่าง', 'เขต', 'ตรวจสอบ', 'ตาม', 'สิ่ง', 'ข้อ', 'ฝีมือ', 'ข้อ',
//   'ข้อ', 'แนะนำ', 'ข้อ', 'ขอ', 'ตัว', 'ขอ', 'นาฬิกา', 'กองทุน', 'พัฒนา', 'พัฒนา',
//   'จะ', 'ทำ', 'น่า', 'จะ', 'ทำ', 'สำเร็จ', 'ได้', 'ไหม', 'ไหม',
];
  

const results = testWords.map((word) => {
    word = word.replace(/[่้๊๋]/g, '')
  const is_long = longVowelPatterns.some((pattern) => word.match(pattern))
  const is_short = shortVowelPatterns.some((pattern) => word.match(pattern))

  return {
    word,
    is_short,
    is_long
  }
}).filter(({ is_short, is_long }) => (is_short && is_long) || (!is_short && !is_long))
// .length

console.log(results)
