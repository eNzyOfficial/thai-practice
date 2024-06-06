<script setup>
import { computed, ref } from 'vue';
import { useTonesStore } from '@/stores/tones';
import { useRouter } from 'vue-router';

const tonesStore = useTonesStore();
const router = useRouter();

const backButton = () => router.push({ name: 'home' });

const cheat = ref(false);
const infinite = ref(false);
const shuffle = ref(false);
const gameFinished = ref(false);
const currentIndex = ref(0);

const rules = ref(tonesStore.rules);
const currentCharacter = computed(() => rules.value[currentIndex.value]);

const currentScore = ref({
    correct: 0,
    incorrect: 0,
    total: 0,
    accuracy: 0,
    score: 0,
});

function answerQuestion(answer) {
    cheat.value = false;

    if (answer === currentCharacter.value.tone) {
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
    if (!infinite.value && currentIndex.value >= rules.value.length - 1) {
        gameFinished.value = true;
        return;
    }

    currentIndex.value = currentIndex.value < (rules.value.length - 1)
        ? currentIndex.value + 1
        : 0;
}

function infiniteMode(value) {
    infinite.value = value
    resetGame();
}

function shuffleCharacters(value) {
    shuffle.value = value;

    resetGame();
}

function resetGame() {
    rules.value = shuffle.value
        ? tonesStore.rules.slice().sort(() => Math.random() - 0.5)
        : tonesStore.rules;

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
</script>

<template>
    <div class="min-h-screen flex flex-col">
        <van-nav-bar title="Tone Rules" left-text="Back" left-arrow @click-left="backButton" />

        <van-cell center title="Infinite Mode">
            <template #right-icon>
                <van-switch :model-value="infinite" @update:model-value="infiniteMode" size="1rem" />
            </template>
        </van-cell>
        <van-cell center title="Shuffle">
            <template #right-icon>
                <van-switch :model-value="shuffle" @update:model-value="shuffleCharacters" size="1rem" />
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
                <p v-if="!gameFinished" class="text-6xl">
                    {{ currentCharacter.class }}<br>
                    {{ currentCharacter.type }}
                </p>
                <p v-if="!gameFinished" class="text-sm text-slate-200 cursor-default mt-2" @click="cheat = !cheat">
                    <span v-if="!cheat">cheat</span>
                    <span v-else>{{ currentCharacter.tone }}</span>
                </p>
            </div>

            <p v-if="!infinite && !gameFinished" class="text-center text-md mb-4">{{ currentIndex + 1 }} of {{
            rules.length }}</p>

            <van-space direction="vertical" fill v-if="!gameFinished">
                <van-button type="primary" block @click="answerQuestion('high')">High</van-button>
                <van-button type="primary" block @click="answerQuestion('falling')">Falling</van-button>
                <van-button type="primary" block @click="answerQuestion('medium')">Medium</van-button>
                <van-button type="primary" block @click="answerQuestion('rising')">Rising</van-button>
                <van-button type="primary" block @click="answerQuestion('low')">Low</van-button>
                <van-button type="primary" block @click="answerQuestion('-')">-</van-button>
            </van-space>

            <van-button type="primary" round @click="resetGame" v-if="gameFinished">Reset</van-button>
        </div>
    </div>
</template>