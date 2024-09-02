<script setup>
// import { computed, ref, onMounted } from 'vue';
// import { useAlphabetStore } from '@/stores/alphabet';
import { useRouter } from 'vue-router';

// const alphabetStore = useAlphabetStore();
const router = useRouter();

const backButton = () => router.push({ name: 'home' });
</script>

<template>
    <div class="min-h-screen flex flex-col">
        <van-nav-bar title="Grammar cheatsheet" left-text="Back" left-arrow @click-left="backButton" />


        <div class="flex flex-col flex-grow p-4 text-lg">
            <h1 class="font-bold">HIGH CLASS CONSONANT</h1>
            <div class="text-2xl flex mt-2 gap-x-2 gap-y-2 items-center justify-between flex-wrap">
                <p class="bg-slate-50 rounded p-2">ข</p>
                <p class="bg-slate-50 rounded p-2">ฉ</p>
                <p class="bg-slate-50 rounded p-2">ฐ</p>
                <p class="bg-slate-50 rounded p-2">ถ</p>
                <p class="bg-slate-50 rounded p-2">ผ</p>
                <p class="bg-slate-50 rounded p-2">ฝ</p>
                <p class="bg-slate-50 rounded p-2">ศ</p>
                <p class="bg-slate-50 rounded p-2">ษ</p>
                <p class="bg-slate-50 rounded p-2">ส</p>
                <p class="bg-slate-50 rounded p-2">ห</p>
            </div>

            <hr class="mt-4 mb-2">

            <h1 class="font-bold">MIDDLE CLASS CONSONANT</h1>
            <div class="text-2xl flex mt-2 gap-x-2 gap-y-2 items-center justify-between flex-wrap">
                <p class="bg-slate-50 rounded p-2">ก</p>
                <p class="bg-slate-50 rounded p-2">จ</p>
                <p class="bg-slate-50 rounded p-2">ฎ</p>
                <p class="bg-slate-50 rounded p-2">ฏ</p>
                <p class="bg-slate-50 rounded p-2">ด</p>
                <p class="bg-slate-50 rounded p-2">ต</p>
                <p class="bg-slate-50 rounded p-2">บ</p>
                <p class="bg-slate-50 rounded p-2">ป</p>
                <p class="bg-slate-50 rounded p-2">อ</p>
            </div>

            <hr class="mt-4 mb-2">

            <h1 class="font-bold">LOW CLASS CONSONANT</h1>
            <div class="text-2xl flex mt-2 gap-x-2 gap-y-2 items-center justify-between flex-wrap">
                <p class="bg-slate-50 rounded p-2">ค</p>
                <p class="bg-slate-50 rounded p-2">ฆ</p>
                <p class="bg-slate-50 rounded p-2">ง</p>
                <p class="bg-slate-50 rounded p-2">ช</p>
                <p class="bg-slate-50 rounded p-2">ซ</p>
                <p class="bg-slate-50 rounded p-2">ฌ</p>
                <p class="bg-slate-50 rounded p-2">ญ</p>
                <p class="bg-slate-50 rounded p-2">ฑ</p>
                <p class="bg-slate-50 rounded p-2">ฒ</p>
                <p class="bg-slate-50 rounded p-2">ณ</p>
                <p class="bg-slate-50 rounded p-2">ท</p>
                <p class="bg-slate-50 rounded p-2">น</p>
                <p class="bg-slate-50 rounded p-2">พ</p>
                <p class="bg-slate-50 rounded p-2">ฟ</p>
                <p class="bg-slate-50 rounded p-2">ภ</p>
                <p class="bg-slate-50 rounded p-2">ม</p>
                <p class="bg-slate-50 rounded p-2">ย</p>
                <p class="bg-slate-50 rounded p-2">ร</p>
                <p class="bg-slate-50 rounded p-2">ล</p>
                <p class="bg-slate-50 rounded p-2">ว</p>
                <p class="bg-slate-50 rounded p-2">ฬ</p>
                <p class="bg-slate-50 rounded p-2">ฮ</p>
            </div>

            <hr class="mt-4 mb-2">

            <h1 class="font-bold">FINAL CONSONANTS</h1>
            <table class="table-auto border-collapse border border-gray-300 mt-2 text-2xl">
                <tbody>
                    <tr>
                        <td colspan="2" class="border p-2 text-base bg-emerald-100">LIVE SYLLABLE</td>
                    </tr>
                    <tr>
                        <td class="border p-2">น</td>
                        <td class="border p-2">ร ล ฬ ญ ณ</td>
                    </tr>

                    <tr>
                        <td class="border p-2">ง</td>
                        <td class="border p-2"></td>
                    </tr>

                    <tr>
                        <td class="border p-2">ม</td>
                        <td class="border p-2"></td>
                    </tr>

                    <tr>
                        <td class="border p-2">ย</td>
                        <td class="border p-2"></td>
                    </tr>

                    <tr>
                        <td class="border p-2">ว</td>
                        <td class="border p-2"></td>
                    </tr>

                    <tr>
                        <td colspan="2" class="border p-2 text-base bg-red-100">DEAD SYLLABLE</td>
                    </tr>

                    <tr>
                        <td class="border p-2">ด</td>
                        <td class="border p-2">จ ช ซ ฌ ฎ ฏ ฐ ฑ ฒ ต ถ ท ธ ศ ษ ส</td>
                    </tr>

                    <tr>
                        <td class="border p-2">ก</td>
                        <td class="border p-2">ข ค ฆ</td>
                    </tr>

                    <tr>
                        <td class="border p-2">บ</td>
                        <td class="border p-2">ป ฝ ฟ ภ</td>
                    </tr>
                </tbody>
            </table>

            <hr class="mt-4 mb-2">

            <h1 class="font-bold">VOWELS SHORT/LONG</h1>
            <table class="table-auto text-center border-collapse border border-gray-300 mt-2">
                <thead>
                    <tr>
                        <th>Short</th>
                        <th>Transliteration</th>
                        <th>Long</th>
                    </tr>
                </thead>
                <tbody class="text-3xl">
                    <tr>
                        <td class="border py-2">-ะ</td>
                        <td class="border text-xl">ah</td>
                        <td class="border py-2">-า</td>
                    </tr>
                    <tr>
                        <td class="border py-2">-ิ</td>
                        <td class="border text-xl">ee</td>
                        <td class="border py-2">-ี</td>
                    </tr>

                    <tr>
                        <td class="border py-2">-ึ</td>
                        <td class="border text-xl">eu</td>
                        <td class="border py-2">-ื</td>
                    </tr>

                    <tr>
                        <td class="border py-2">-ุ</td>
                        <td class="border text-xl">oo</td>
                        <td class="border py-2">-ู</td>
                    </tr>

                    <tr>
                        <td class="border py-2">เ-ะ</td>
                        <td class="border text-xl">ay</td>
                        <td class="border py-2">เ-</td>
                    </tr>

                    <tr>
                        <td class="border py-2">แ-ะ</td>
                        <td class="border text-xl">ae</td>
                        <td class="border py-2">แ-</td>
                    </tr>

                    <tr>
                        <td class="border py-2">โ-ะ</td>
                        <td class="border text-xl">oh</td>
                        <td class="border py-2">โ-</td>
                    </tr>

                    <tr>
                        <td class="border py-2">เ-าะ</td>
                        <td class="border text-xl">aw</td>
                        <td class="border py-2">-อ</td>
                    </tr>

                    <tr>
                        <td class="border py-2">อัวะ</td>
                        <td class="border text-xl">ua</td>
                        <td class="border py-2">อัว</td>
                    </tr>

                    <tr>
                        <td class="border py-2">เ-ียะ</td>
                        <td class="border text-xl">ia</td>
                        <td class="border py-2">เ-ีย</td>
                    </tr>

                    <tr>
                        <td class="border py-2">เอือะ</td>
                        <td class="border text-xl">eua</td>
                        <td class="border py-2">เอือ</td>
                    </tr>

                    <tr>
                        <td class="border py-2">เ-อะ</td>
                        <td class="border text-xl">euh</td>
                        <td class="border py-2">เ-อ</td>
                    </tr>

                    <tr>
                        <td class="border py-2">ฤ</td>
                        <td class="border text-xl">reu</td>
                        <td class="border py-2">ฤๅ</td>
                    </tr>

                    <tr>
                        <td class="border py-2">ฦ</td>
                        <td class="border text-xl">leu</td>
                        <td class="border py-2">ฦๅ</td>
                    </tr>

                    <tr>
                        <td class="border text-xs text-red-400 p-2" colspan="3">Note: Below are pronounced short but
                            considered long vowel for tone
                            rules.</td>
                    </tr>

                    <tr>
                        <td class="border py-2">ใ-</td>
                        <td class="border text-xl">ai</td>
                    </tr>

                    <tr>
                        <td class="border py-2">ไ-</td>
                        <td class="border text-xl">
                            <span>ai</span>
                        </td>
                    </tr>

                    <tr>
                        <td class="border py-2">อำ</td>
                        <td class="border text-xl">am</td>
                    </tr>

                    <tr>
                        <td class="border py-2">เ-า</td>
                        <td class="border text-xl">ao</td>
                    </tr>
                </tbody>
            </table>

            <hr class="mt-4 mb-2">

            <h1 class="font-bold">TONE RULES</h1>
            <table class="table-auto text-center border-collapse border border-gray-300 mt-2">
                <thead>
                    <tr>
                        <td class="border"></td>
                        <td class="font-bold border bg-emerald-100">Middle</td>
                        <td class="font-bold border bg-orange-100">High</td>
                        <td class="font-bold border bg-red-100">Low</td>
                    </tr>
                </thead>

                <tbody>
                    <tr>
                        <td class="border font-bold bg-gray-500 text-white" colspan="4">NO FINAL CONSONANT</td>
                    </tr>

                    <tr>
                        <td class="border bg-slate-100">Short</td>
                        <td class="border bg-emerald-50">Low</td>
                        <td class="border bg-orange-50">Low</td>
                        <td class="border bg-red-50">High short</td>
                    </tr>

                    <tr>
                        <td class="border bg-slate-300">Long</td>
                        <td class="border bg-emerald-50">Medium</td>
                        <td class="border bg-orange-50">Rising</td>
                        <td class="border bg-red-50">Medium</td>
                    </tr>

                    <tr>
                        <td class="border font-bold bg-gray-500 text-white" colspan="4">TONE MARKERS</td>
                    </tr>

                    <tr>
                        <td class="border text-3xl">-่</td>
                        <td class="border bg-emerald-50">Low</td>
                        <td class="border bg-orange-50">Low</td>
                        <td class="border bg-red-50">Falling</td>
                    </tr>

                    <tr>
                        <td class="border text-3xl">-้</td>
                        <td class="border bg-emerald-50">Falling</td>
                        <td class="border bg-orange-50">Falling</td>
                        <td class="border bg-red-50">High</td>
                    </tr>

                    <tr>
                        <td class="border text-3xl">-๊</td>
                        <td class="border bg-emerald-50">High</td>
                        <td></td>
                        <td></td>
                    </tr>

                    <tr>
                        <td class="border text-3xl">-๋</td>
                        <td class="border bg-emerald-50">Rising</td>
                        <td></td>
                        <td></td>
                    </tr>

                    <tr>
                        <td class="border font-bold bg-gray-500 text-white" colspan="4">LIVE</td>
                    </tr>
                    <tr>
                        <td class="border bg-slate-100">Short</td>
                        <td class="border bg-emerald-50" rowspan="2">Medium</td>
                        <td class="border bg-orange-50" rowspan="2">Rising</td>
                        <td class="border bg-red-50" rowspan="2">Medium</td>
                    </tr>

                    <tr>
                        <td class="border bg-slate-300">Long</td>
                    </tr>

                    <tr>
                        <td class="border font-bold bg-gray-500 text-white" colspan="4">DEAD</td>
                    </tr>
                    <tr>
                        <td class="border bg-slate-100">Short</td>
                        <td class="border bg-emerald-50" rowspan="2">Low</td>
                        <td class="border bg-orange-50" rowspan="2">Low</td>
                        <td class="border bg-red-50">High Short</td>
                    </tr>

                    <tr>
                        <td class="border bg-slate-300">Long</td>
                        <td class="border bg-red-50">Falling</td>
                    </tr>
                </tbody>
            </table>

            <hr class="mt-4 mb-2">

            <h1 class="font-bold">VOWEL FORM CHANGE</h1>
            <p class="text-sm border-b pb-2">Some vowels change form with final consonants.</p>

            <ol class="list-decimal list-inside space-y-4 text-sm mt-2">
                <li class="border-b pb-4">
                    <div class="inline-flex items-center space-x-1">
                        <span class="font-bold text-xl px-2 bg-orange-100 rounded">-ะ</span> to
                        <span class="font-bold text-xl px-2 bg-emerald-100 rounded">-ั</span> (e.g., <span
                            class="font-bold text-xl px-2 bg-slate-100 rounded">มะ → มัง</span>)
                    </div>
                </li>

                <li class="border-b pb-4">
                    <div class="inline-flex items-center space-x-1">
                        <span class="font-bold text-xl px-2 bg-orange-100 rounded">อือ</span> drops trailing <span
                            class="font-bold text-xl px-2 bg-emerald-100 rounded">อ</span> (e.g., <span
                            class="font-bold text-xl px-2 bg-slate-100 rounded">อือ + ง = อืง</span>)
                    </div>
                </li>

                <li class="border-b pb-4">
                    <div class="inline-flex items-center space-x-1">
                        <span class="font-bold text-xl px-2 bg-orange-100 rounded">เ-ะ</span> to <span
                            class="font-bold text-xl px-2 bg-emerald-100 rounded">-็ </span>(e.g., <span
                            class="font-bold text-xl px-2 bg-slate-100 rounded">เปะ → เป็น</span>)
                    </div>
                </li>

                <li class="border-b pb-4">
                    <div class="inline-flex items-center space-x-1">
                        <span class="font-bold text-xl px-2 bg-orange-100 rounded">แ-ะ</span> to <span
                            class="font-bold text-xl px-2 bg-emerald-100 rounded">-็ </span>(e.g., <span
                            class="font-bold text-xl px-2 bg-slate-100 rounded">แปะ → แป็น</span>)
                    </div>
                </li>

                <li class="border-b pb-4">
                    <div class="inline-flex items-center space-x-1">
                        <span class="font-bold text-xl px-2 bg-orange-100 rounded">โ-ะ</span> to <span
                            class="font-bold text-xl px-2 bg-emerald-100 rounded">no
                            vowel</span> (e.g., <span class="font-bold text-xl px-2 bg-slate-100 rounded">โปะ
                            → ปน</span>)
                    </div>
                </li>

                <li class="border-b pb-4">
                    <div class="inline-flex items-center space-x-1">
                        <span class="font-bold text-xl px-2 bg-orange-100 rounded">อัว</span> to <span
                            class="font-bold text-xl px-2 bg-emerald-100 rounded">อวน</span> (e.g., <span
                            class="font-bold text-xl px-2 bg-slate-100 rounded">วัว →
                            ววน</span>)
                    </div>
                </li>

                <li>
                    <div class="inline-flex items-center space-x-1">
                        <span class="font-bold text-xl px-2 bg-orange-100 rounded">เออ</span> to <span
                            class="font-bold text-xl px-2 bg-emerald-100 rounded">เอิก</span> (e.g., <span
                            class="font-bold text-xl px-2 bg-slate-100 rounded">เออ → เอิก</span>)
                    </div>
                </li>
            </ol>

            <hr class="mt-4 mb-2">

            <h1 class="font-bold">ห AND อ LEADS</h1>
            <p>ห- and อ- adjust tone rules but are silent in pronunciation.</p>
            <p class="text-3xl font-bold"> TODO </p>

            <hr class="mt-4 mb-2">

            <h1 class="font-bold">ใ- WORDS</h1>
            <table class="table-auto border-collapse border border-gray-300 mt-2 text-sm">
                <thead>
                    <tr class="text-left">
                        <th class="border p-2">Word</th>
                        <th class="border p-2">Meaning</th>
                        <th class="border p-2">Word</th>
                        <th class="border p-2">Meaning</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td class="text-lg font-bold border p-2">ใหญ่</td>
                        <td class="border p-2">Big</td>
                        <td class="text-lg font-bold border p-2">ใหม่</td>
                        <td class="border p-2">New</td>
                    </tr>

                    <tr>
                        <td class="text-lg font-bold border p-2">ให้</td>
                        <td class="border p-2">Give</td>
                        <td class="text-lg font-bold border p-2">สะใภ้</td>
                        <td class="border p-2">Female relative (by marriage)</td>
                    </tr>

                    <tr>
                        <td class="text-lg font-bold border p-2">ใช้ </td>
                        <td class="border p-2">Use</td>
                        <td class="text-lg font-bold border p-2">ใจ</td>
                        <td class="border p-2">Heart</td>
                    </tr>

                    <tr>
                        <td class="text-lg font-bold border p-2">ใส่</td>
                        <td class="border p-2">Put In</td>
                        <td class="text-lg font-bold border p-2">ใคร</td>
                        <td class="border p-2">Who</td>
                    </tr>

                    <tr>
                        <td class="text-lg font-bold border p-2">ใคร่</td>
                        <td class="border p-2">Desires</td>
                        <td class="text-lg font-bold border p-2">หลงไหล</td>
                        <td class="border p-2">Crazy about</td>
                    </tr>

                    <tr>
                        <td class="text-lg font-bold border p-2">ใบ</td>
                        <td class="border p-2">Classifier for flat objects or leaf</td>
                        <td class="text-lg font-bold border p-2">ใน</td>
                        <td class="border p-2">In</td>
                    </tr>

                    <tr>
                        <td class="text-lg font-bold border p-2">ใช่</td>
                        <td class="border p-2">Yes</td>
                        <td class="text-lg font-bold border p-2">ใส</td>
                        <td class="border p-2">Clear (color)</td>
                    </tr>

                    <tr>
                        <td class="text-lg font-bold border p-2">ใด</td>
                        <td class="border p-2">Whatsoever</td>
                        <td class="text-lg font-bold border p-2">ใต้</td>
                        <td class="border p-2">Under</td>
                    </tr>

                    <tr>
                        <td class="text-lg font-bold border p-2">ใย</td>
                        <td class="border p-2">Web</td>
                        <td class="text-lg font-bold border p-2">ใบ้</td>
                        <td class="border p-2">Mute person</td>
                    </tr>

                    <tr>
                        <td class="text-lg font-bold border p-2">ใกล้</td>
                        <td class="border p-2">Near, close</td>
                    </tr>
                </tbody>
            </table>

            <hr class="mt-4 mb-2">

            <h1 class="font-bold">3 CONSONANTS WITH NO VOWELS</h1>
            <p>อะ and โอะ (e.g., "chanok" - ชนก)</p>
            <p class="text-3xl font-bold"> TODO </p>

            <hr class="mt-4 mb-2">

            <h1 class="font-bold">LOW CLASS FOLLOWS MIDDLE/HIGH CLASS CONSONANT</h1>
            <p>When a low class consonant follows a middle or high class consonant, tone rules follow the first
                consonant.</p>
            <p class="text-3xl font-bold"> TODO </p>

            <hr class="mt-4 mb-2">

            <h1 class="font-bold">CLUSTERS</h1>
            <p class="text-sm text-red-400">
                Note: The first consonant of the cluster always determines class for tone rules.
            </p>

            <p class="text-sm text-red-400">
                Note: ร is silent when combined with ส, ศ, จ
            </p>

            <table class="table-auto text-center border-collapse border border-gray-300 mt-2 text-2xl">
                <thead>
                    <tr>
                        <th class="border p-2"></th>
                        <th class="border p-2">ว</th>
                        <th class="border p-2">ร</th>
                        <th class="border p-2">ล</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td colspan="4" class="border p-2 text-base bg-emerald-100">REAL CLUSTER</td>
                    </tr>
                    <tr>
                        <td class="border p-2">ก</td>
                        <td class="border p-2">กว</td>
                        <td class="border p-2">กร</td>
                        <td class="border p-2">กล</td>
                    </tr>

                    <tr>
                        <td class="border p-2">ต</td>
                        <td class="border p-2">-</td>
                        <td class="border p-2">ตร</td>
                        <td class="border p-2">-</td>
                    </tr>

                    <tr>
                        <td class="border p-2">ป</td>
                        <td class="border p-2">-</td>
                        <td class="border p-2">ปร</td>
                        <td class="border p-2">ปล</td>
                    </tr>

                    <tr>
                        <td class="border p-2">ข</td>
                        <td class="border p-2">ขว</td>
                        <td class="border p-2">ขร</td>
                        <td class="border p-2">ขล</td>
                    </tr>

                    <tr>
                        <td class="border p-2">ผ</td>
                        <td class="border p-2">-</td>
                        <td class="border p-2">-</td>
                        <td class="border p-2">ผล</td>
                    </tr>

                    <tr>
                        <td class="border p-2">ค</td>
                        <td class="border p-2">คว</td>
                        <td class="border p-2">คร</td>
                        <td class="border p-2">คล</td>
                    </tr>

                    <tr>
                        <td class="border p-2">พ</td>
                        <td class="border p-2">-</td>
                        <td class="border p-2">พร</td>
                        <td class="border p-2">พล</td>
                    </tr>

                    <tr>
                        <td colspan="4" class="border p-2 text-base bg-red-100">FAKE CLUSTER</td>
                    </tr>

                    <tr>
                        <td class="border p-2">ส</td>
                        <td class="border p-2">-</td>
                        <td class="border p-2">สร</td>
                        <td class="border p-2">-</td>
                    </tr>

                    <tr>
                        <td class="border p-2">ศ</td>
                        <td class="border p-2">-</td>
                        <td class="border p-2">ศร</td>
                        <td class="border p-2">-</td>
                    </tr>

                    <tr>
                        <td class="border p-2">จ</td>
                        <td class="border p-2">-</td>
                        <td class="border p-2">จร</td>
                        <td class="border p-2">-</td>
                    </tr>
                </tbody>
            </table>

            <hr class="mt-4 mb-2">

            <h1 class="font-bold">DOUBLE รร</h1>
            <p class="text-3xl font-bold"> TODO </p>

            <hr class="mt-4 mb-2">

            <h1 class="font-bold">ร AS FINAL POSITION</h1>
            <p class="text-3xl font-bold"> TODO </p>

            <hr class="mt-4 mb-2">

            <h1 class="font-bold">ร AS FINAL CONSONANT</h1>
            <p class="text-3xl font-bold"> TODO </p>

            <hr class="mt-4 mb-2">

            <h1 class="font-bold">ทร PRONOUNCED AS ซ</h1>
            <p class="text-3xl font-bold"> TODO </p>

            <hr class="mt-4 mb-2">

            <h1 class="font-bold">MAI GAARAN SILENT ต์</h1>
            <p><span class="font-bold text-2xl rounded bg-emerald-50 px-2 pb-2">ต์</span> makes letters silent. (eg., <span class="rounded bg-slate-50 p-2 font-bold">การันต์ → การัน</span>)</p>
            <p class="text-3xl font-bold"> TODO </p>

            <hr class="mt-4 mb-2">

            <h1 class="font-bold">MAI YAMOK ๆ</h1>
            <p><span class="font-bold text-2xl rounded bg-emerald-50 px-2 pb-2">ๆ</span> repeats the preceding word or phrase. (eg., <span class="rounded bg-slate-50 p-2 font-bold">มากๆ → มาก มาก</span>)</p>

            <hr class="mt-4 mb-2">

            <h1 class="font-bold">SILENT VOWEL ENDINGS</h1>
            <p class="text-3xl font-bold"> TODO </p>

            <hr class="mt-4 mb-2">

            <h1 class="font-bold">ฤ PRONOUNCIATION</h1>
            <p class="text-3xl font-bold"> TODO </p>
            <hr class="mt-4 mb-2">

            <h1 class="font-bold">DOUBLE FUNCTION CONSONANTS</h1>
            <p class="text-3xl font-bold"> TODO </p>

            <hr class="mt-4 mb-2">

            <h1 class="font-bold">PREFIX BAWRI</h1>
            <p class="text-3xl font-bold"> TODO </p>

            <hr class="mt-4 mb-2">

            <h1 class="font-bold">BPAIYAANLEK ฯ</h1>
            <p><span class="font-bold text-2xl rounded bg-emerald-50 p-2">ฯ</span> indicates repetition (e.g., <span class="rounded bg-slate-50 p-2 font-bold">กรุงเทพมหานครฯ</span>).</p>
        </div>
    </div>
</template>