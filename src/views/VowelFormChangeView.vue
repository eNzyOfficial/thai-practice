<template>
    <div class="min-h-screen flex flex-col">
        <van-nav-bar title="Vowel Form Change" left-text="Back" left-arrow @click-left="backButton" />

        <div class="flex flex-col text-center flex-grow m-4">
            <div class="flex-grow flex flex-col">
                <div class="text-2xl">
                    What does the word change to when <span class="text-emerald-400 text-4xl">{{ originalWord }}</span>
                    has a
                    final
                    consonant
                    of <span class="text-emerald-400 text-4xl">{{
                        finalConsonant }}</span>?
                </div>

                <div class="text-6xl flex-grow flex items-center justify-center">
                    <p>{{ userAnswer || '_____' }}</p>
                </div>

                <div v-if="!showResult" class="flex flex-wrap items-center justify-center space-x-4 mb-2">
                    <van-button v-for="option in options" :key="option" @click="selectCharacter(option)" plain hairline
                        type="primary">
                        <span class="text-xl text-slate-600 p-2">{{ option }}</span>
                    </van-button>
                    <van-button @click="removeLastCharacterFromAnswer" plain hairline type="warning">
                        ⌫
                    </van-button>
                </div>
                <div v-if="showResult" class="text-4xl p-4 text-slate-500">{{ result }} ({{ correctAnswer }})</div>
            </div>
            <van-button v-if="showResult" @click="nextQuestion" round type="primary">Next Question</van-button>
            <van-button v-if="!showResult" @click="checkAnswer" round type="primary">Check Answer</van-button>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const backButton = () => router.push({ name: 'home' });

const rule = ref(null);
const rules = ref([
    { pattern: '_ะ', replacement: '_ั' },
    { pattern: '_ือ', replacement: '_ื' },
    { pattern: 'เ_ะ', replacement: 'เ_็' },
    { pattern: 'แ_ะ', replacement: 'แ_็' },
    { pattern: 'โ_ะ', replacement: '_ะ' },
    { pattern: '_ัว', replacement: '_ว' },
    { pattern: 'เ_อ', replacement: 'เ_ิ' }
]);
const originalWord = ref('');
const initialConsonant = ref('');
const finalConsonant = ref('');
const correctAnswer = ref('');
const options = ref([]);
const result = ref('');
const showResult = ref(false);
const userAnswer = ref('');
const consonants = ref('กขฃคฅฆงจฉชซฌญฎฏฐฑฒณดตถทธนบปผฝพฟภมยรฤลฦวศษสหฬอฮ');
const medial = ref('ะือัุ');

const characters = computed(() => medial.value.split('').concat(consonants.value.split('')));

function nextQuestion() {
    rule.value = rules.value[Math.floor(Math.random() * rules.value.length)];

    initialConsonant.value = consonants.value[Math.floor(Math.random() * consonants.value.length)];
    finalConsonant.value = consonants.value[Math.floor(Math.random() * consonants.value.length)];
    originalWord.value = rule.value.pattern.replace('_', initialConsonant.value);
    correctAnswer.value = rule.value.replacement.replace('_', initialConsonant.value) + finalConsonant.value;
    userAnswer.value = '';

    const optionsValue = correctAnswer.value.split('')
        .concat(originalWord.value.split(''))
        .filter((char, index, self) => self.indexOf(char) === index);

    while (optionsValue.length < 15) {
        const availableCharacters = characters.value.filter(char => !optionsValue.includes(char));

        if (availableCharacters.length === 0) {
            break;
        }

        const option = availableCharacters[Math.floor(Math.random() * medial.value.length)];

        optionsValue.push(option);
    }

    options.value = optionsValue.sort(() => Math.random() - 0.5);
    showResult.value = false;
}

function selectCharacter(char) {
    userAnswer.value += char;
}

function removeLastCharacterFromAnswer() {
    userAnswer.value = userAnswer.value.slice(0, -1);
}

function checkAnswer() {
    result.value = userAnswer.value === correctAnswer.value
        ? 'Correct!'
        : 'Incorrect!';

    showResult.value = true;
}

onMounted(() => nextQuestion());
</script>