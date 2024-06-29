<script setup>
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import words from '@/data/words.json';
import guessToneFromString, { toneKeyGenerator, toneRuleGenerator } from '@/utils/guessToneFromString.js';

const router = useRouter();

const backButton = () => router.push({ name: 'home' });

const currentIndex = ref(0);

const save = ref(false)
const list = ref(words);
const notDuplicatesList = computed(() => list.value.filter((word, index, self) => index === self.findIndex((t) => (t.character === word.character))));

const currentCharacter = computed(() => list.value[currentIndex.value]);

// true/false/null
const isLive = ref(null);

// long/short
const longShort = ref('long');

// high/middle/low
const classValue = ref('middle');

// ayk/toh/dtree/jatwaa/null
const toneMarker = ref(null);

const toneKey = computed(() => toneKeyGenerator({
    classValue: classValue.value,
    longShort: longShort.value,
    isLive: isLive.value,
    toneMarker: toneMarker.value,
}))

const toneRule = computed(() => toneRuleGenerator(toneKey.value))

tryToWorkOutTheWord()



for (let i = 0; i < list.value.length; i++) {
    if (list.value[i].tone) {
        continue;
    }

    currentIndex.value = i;

    tryToWorkOutTheWord()

    break;
}

// for(let i = 0; i < list.value.length; i++) {
//     currentIndex.value = i;

//     addSortedWord()
// }

function addSortedWord() {
    list.value[currentIndex.value] = {
        character: currentCharacter.value.character,
        tone: toneRule.value,
        class: classValue.value,
        length: longShort.value,
        dead: isLive.value,
        marker: toneMarker.value,
    };

    if (currentIndex.value < list.value.length - 1) {
        currentIndex.value++;

        tryToWorkOutTheWord()
    }
}

function tryToWorkOutTheWord() {
    const word = currentCharacter.value.character.normalize('NFC').trim()

    if (word.length === 0) {
        return;
    }

    const result = guessToneFromString(word);
    longShort.value = result.longShort || null;

    isLive.value = result.isLive || null;

    classValue.value = result.classValue || null;

    toneMarker.value = result.toneMarker || null;
}
</script>

<template>
    <div class="min-h-screen flex flex-col">
        <van-nav-bar title="Word sorter" left-text="Back" left-arrow @click-left="backButton" />

        <div class="flex flex-col flex-grow p-4">
            <div class="flex flex-col text-center flex-grow justify-center">
                <p class="text-8xl">
                    {{ currentCharacter.character }}

                </p><br>
                <p>{{ toneRule }}</p>
            </div>

            <div class="flex items-center justify-center mb-4">
                <input type="text" class="border rounded border-slate-200 w-12 mr-2" v-model="currentIndex" />
                <p class="text-center text-md">of {{
                    words.length }}</p>
            </div>

            <div class="mb-4">
                <p>Class</p>

                <van-radio-group direction="horizontal" class="text-xs sm:text-lg" v-model="classValue">
                    <van-radio name="high" icon-size="1rem">High</van-radio>
                    <van-radio name="middle" icon-size="1rem">Middle</van-radio>
                    <van-radio name="low" icon-size="1rem">Low</van-radio>
                </van-radio-group>

                <p>Long/Short</p>

                <van-radio-group direction="horizontal" class="text-xs sm:text-lg" v-model="longShort">
                    <van-radio name="long" icon-size="1rem">Long</van-radio>
                    <van-radio name="short" icon-size="1rem">Short</van-radio>
                </van-radio-group>

                <p>Dead/Live</p>

                <van-radio-group direction="horizontal" class="text-xs sm:text-lg" v-model="isLive">
                    <van-radio :name="false" icon-size="1rem">Dead</van-radio>
                    <van-radio :name="true" icon-size="1rem">Live</van-radio>
                    <van-radio :name="null" icon-size="1rem">-</van-radio>
                </van-radio-group>

                <p>Tone</p>

                <van-radio-group direction="horizontal" class="text-xs sm:text-lg" v-model="toneMarker">
                    <van-radio name="ayk" icon-size="1rem">Ayk</van-radio>
                    <van-radio name="toh" icon-size="1rem">Toh</van-radio>
                    <van-radio name="dtree" icon-size="1rem">Dtree</van-radio>
                    <van-radio name="jatwaa" icon-size="1rem">Jatwaa</van-radio>
                    <van-radio :name="null" icon-size="1rem">None</van-radio>
                </van-radio-group>
            </div>

            <van-button type="primary" @click="addSortedWord" round>Next</van-button>
            <van-button type="success" @click="save = true" round>Save</van-button>
        </div>
    </div>
    <div v-if="save" class="fixed top-0 left-0 bg-slate-500 z-50 w-screen h-screen flex flex-col">
        <textarea class="grow">{{ JSON.stringify(notDuplicatesList) }}</textarea>
        <div>{{ notDuplicatesList.length }}/{{ list.length }}</div>
        <button @click="save = false" class="bg-slate-100">Close</button>
    </div>
</template>