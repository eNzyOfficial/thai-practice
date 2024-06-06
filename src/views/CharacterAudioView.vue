<script setup>
import { computed, ref, onMounted } from 'vue';
import { useAlphabetStore } from '@/stores/alphabet';
import { useRouter } from 'vue-router';

const alphabetStore = useAlphabetStore();
const router = useRouter();

onMounted(() => resetGame());

const backButton = () => router.push({ name: 'home' });

const infinite = ref(false);
const shuffle = ref(false);
const gameFinished = ref(false);
const disablePreviousCharacters = ref(true);
const currentIndex = ref(0);
const gameMode = ref('consonants');

const alphabet = ref(alphabetStore.consonants);
const currentCharacter = computed(() => alphabet.value[currentIndex.value]);
const currentCharacterAudio = computed(() => new Audio(`audio/female/${currentCharacter.value.audio}`));
const previousCharacters = ref([]);

const currentScore = ref({
    correct: 0,
    incorrect: 0,
    total: 0,
    accuracy: 0,
    score: 0,
});

function recalculateScore() {
    currentScore.value.total = currentScore.value.correct + currentScore.value.incorrect;
    currentScore.value.accuracy = Math.round((currentScore.value.correct / currentScore.value.total) * 100);
}

function resetGame() {
    switch (gameMode.value) {
        case 'consonants':
            alphabet.value = shuffle.value
                ? alphabetStore.consonants.slice().sort(() => Math.random() - 0.5)
                : alphabetStore.consonants;
            break;
        case 'vowels':
            alphabet.value = shuffle.value
                ? alphabetStore.vowels.slice().sort(() => Math.random() - 0.5)
                : alphabetStore.vowels;
            break;
        case 'numbers':
            alphabet.value = shuffle.value
                ? alphabetStore.numbers.slice().sort(() => Math.random() - 0.5)
                : alphabetStore.numbers;
            break;
        case 'marks':
            alphabet.value = shuffle.value
                ? alphabetStore.marks.slice().sort(() => Math.random() - 0.5)
                : alphabetStore.marks;
            break;
    }

    currentScore.value = {
        correct: 0,
        incorrect: 0,
        total: 0,
        accuracy: 0,
        score: 0,
    };

    previousCharacters.value = [];
    currentIndex.value = Math.floor(Math.random() * alphabet.value.length);

    gameFinished.value = false;

    currentCharacterAudio.value.play();
}

function infiniteMode(value) {
    infinite.value = value
    resetGame();
}

function changeGameMode(value) {
    gameMode.value = value;
    resetGame();
}

function shuffleCharacters(value) {
    shuffle.value = value;

    resetGame();
}

function setDisablePreviousCharacters(value) {
    disablePreviousCharacters.value = value;
    resetGame();
}

function answer(value) {
    if (value === currentIndex.value) {
        currentScore.value.correct++;
        currentScore.value.score += 10;
    } else {
        currentScore.value.incorrect++;
        currentScore.value.score -= 5;
    }

    recalculateScore();

    previousCharacters.value.push(currentIndex.value);

    if (previousCharacters.value.length === alphabet.value.length) {
        gameFinished.value = true;
        return;
    }

    nextCharacter()
}

function nextCharacter() {
    let randomIndex

    do {
        randomIndex = Math.floor(Math.random() * alphabet.value.length);
    } while (previousCharacters.value.includes(randomIndex))

    currentIndex.value = randomIndex;

    currentCharacterAudio.value.play();
}
</script>

<template>
    <div class="min-h-screen flex flex-col">
        <van-nav-bar title="Character Audio" left-text="Back" left-arrow @click-left="backButton" />

        <van-cell center title="Characters">
            <template #right-icon>
                <van-radio-group v-model="gameMode" direction="horizontal" @update:model-value="changeGameMode"
                    class="text-xs sm:text-lg">
                    <van-radio name="consonants" icon-size="1rem">Consonants</van-radio>
                    <van-radio name="vowels" icon-size="1rem">Vowels</van-radio>
                    <van-radio name="numbers" icon-size="1rem">Numbers</van-radio>
                    <van-radio name="marks" icon-size="1rem">Marks</van-radio>
                </van-radio-group>
            </template>
        </van-cell>

        <van-cell center title="Disable Previous Characters">
            <template #right-icon>
                <van-switch :model-value="disablePreviousCharacters" @update:model-value="setDisablePreviousCharacters"
                    size="1rem" />
            </template>
        </van-cell>
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

        <div class="flex flex-grow justify-center items-center">
            <van-icon v-if="!gameFinished" @click="currentCharacterAudio.play()" type="primary" name="volume-o"
                size="3rem"
                class="p-4 text-white rounded bg-blue-500 active:bg-blue-600 hover:bg-blue-400 hover:cursor-pointer" />
        </div>

        <div v-if="!gameFinished"
            class="grid grid-cols-6 sm:grid-cols-8 lg:grid-cols-10 xl:grid-cols-12 gap-1 p-2 sm:p-2 sm:gap-2 xl:p-10 xl:gap-4">
            <div v-for="(character, index) in alphabet" :key="index" class="hover:cursor-pointer select-none"
                @click="!previousCharacters.includes(index) && answer(index)">
                <div class="rounded text-center text-sm sm:text-xl p-1 py-3 sm:p-2 sm:py-6 md:p-5 lg:p-6 lg:py-8 pointer-events-none"
                    :class="{
                        'bg-slate-100': !disablePreviousCharacters || !previousCharacters.includes(index),
                        'bg-slate-600 text-white': disablePreviousCharacters && previousCharacters.includes(index)
                    }">
                    {{ character.character }}
                </div>
            </div>
        </div>

        <div v-else class="p-4">
            <van-button type="primary" block round @click="resetGame">Reset</van-button>
        </div>
    </div>
</template>