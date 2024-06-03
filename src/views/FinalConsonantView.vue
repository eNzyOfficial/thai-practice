<script setup>
import { computed, ref } from 'vue';
import { useAlphabetStore } from '@/stores/alphabet';
import { useRouter } from 'vue-router';

const alphabetStore = useAlphabetStore();
const router = useRouter();

const backButton = () => router.push({ name: 'home' });

const cheat = ref(false);
const infinite = ref(false);
const shuffle = ref(false);
const gameFinished = ref(false);
const currentIndex = ref(0);

const currentScore = ref({
    correct: 0,
    incorrect: 0,
    total: 0,
    accuracy: 0,
    score: 0,
});

const alphabet = ref(alphabetStore.finalConsonants);
const currentCharacter = computed(() => alphabet.value[currentIndex.value]);

function answerQuestion(answer) {
    cheat.value = false;

    if (answer === currentCharacter.value.final_consonant) {
        currentScore.value.correct++;
        currentScore.value.score += 10;
    } else {
        currentScore.value.incorrect++;
        currentScore.value.score -= 5;
    }

    recalculateScore();
    getNextCharacter();
}

function recalculateScore() {
    currentScore.value.total = currentScore.value.correct + currentScore.value.incorrect;
    currentScore.value.accuracy = Math.round((currentScore.value.correct / currentScore.value.total) * 100);
}

function getNextCharacter() {
    if (!infinite.value && currentIndex.value >= alphabet.value.length - 1) {
        gameFinished.value = true;
        return;
    }

    currentIndex.value = currentIndex.value < (alphabet.value.length - 1)
        ? currentIndex.value + 1
        : 0;
}

function resetGame() {
    alphabet.value = shuffle.value
        ? alphabetStore.finalConsonants.slice().sort(() => Math.random() - 0.5)
        : alphabetStore.finalConsonants;

    currentIndex.value = 0;

    currentScore.value = {
        correct: 0,
        incorrect: 0,
        total: 0,
        accuracy: 0,
        score: 0,
    };

    gameFinished.value = false;
    cheat.value = false;
}

function changeGameMode(value) {
    infinite.value = value
    resetGame();
}

function shuffleCharacters(value) {
    shuffle.value = value;

    resetGame();
}
</script>

<template>
    <div class="min-h-screen flex flex-col">
        <van-nav-bar title="Consonant Classes" left-text="Back" left-arrow @click-left="backButton" />


        <van-cell center title="Infinite Mode">
            <template #right-icon>
                <van-switch :model-value="infinite" @update:model-value="changeGameMode" />
            </template>
        </van-cell>
        <van-cell center title="Shuffle">
            <template #right-icon>
                <van-switch :model-value="shuffle" @update:model-value="shuffleCharacters" />
            </template>
        </van-cell>

        <van-space class="w-full justify-between">
            <van-cell title="Correct/Incorrect" :label="currentScore.correct + '/' + currentScore.incorrect" />
            <van-cell title="Total" :label="currentScore.total" />
            <van-cell title="Accuracy" :label="currentScore.accuracy + '%'" />
            <van-cell title="Score" :label="currentScore.score" />
        </van-space>

        <div class="flex flex-col flex-grow p-4">
            <div class="flex flex-col text-center flex-grow justify-center">
                <p v-if="!gameFinished" class="text-8xl">{{ currentCharacter.character }}</p>
                <span v-if="!gameFinished" class="text-sm text-slate-200 cursor-default" @click="cheat = !cheat">{{
                    cheat ?
                        currentCharacter.final_consonant :
                        'cheat'
                }}</span>
            </div>

            <p v-if="!infinite && !gameFinished" class="text-center text-md mb-4">{{ currentIndex + 1 }} of {{
                alphabet.length }}</p>

            <van-space direction="vertical" fill v-if="!gameFinished">
                <van-button v-for="character in alphabetStore.finalConsonantCharacters" :key="character" type="primary"
                    block @click="answerQuestion(character)">{{ character }}</van-button>
            </van-space>

            <van-button type="primary" round @click="resetGame" v-if="gameFinished">Reset</van-button>
        </div>
    </div>
</template>