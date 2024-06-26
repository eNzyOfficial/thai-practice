<script setup>
import { computed, ref, onMounted } from 'vue';
import { useAlphabetStore } from '@/stores/alphabet';
import { useRouter } from 'vue-router';

const alphabetStore = useAlphabetStore();
const router = useRouter();

const backButton = () => router.push({ name: 'home' });

const gameMode = ref('consonants');

const cheat = ref(false);
const infinite = ref(false);
const shuffle = ref(false);
const gameFinished = ref(false);
const currentIndex = ref(0);

const alphabet = ref(alphabetStore.classCharacters);
const currentCharacter = computed(() => alphabet.value[currentIndex.value]);

onMounted(() => resetGame());

function getNextCharacter() {
    cheat.value = false

    if (!infinite.value && currentIndex.value >= alphabet.value.length - 1) {
        gameFinished.value = true;
        return;
    }

    currentIndex.value = currentIndex.value < (alphabet.value.length - 1)
        ? currentIndex.value + 1
        : 0;
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

    currentIndex.value = 0;

    gameFinished.value = false;
    cheat.value = false;
}

function infiniteMode(value) {
    infinite.value = value
    resetGame();
}

function shuffleCharacters(value) {
    shuffle.value = value;

    resetGame();
}

function changeGameMode(value) {
    gameMode.value = value;
    resetGame();
}
</script>

<template>
    <div class="min-h-screen flex flex-col">
        <van-nav-bar title="Character Flash Cards" left-text="Back" left-arrow @click-left="backButton" />


        <van-cell center title="Characters">
            <template #right-icon>
                <van-radio-group v-model="gameMode" direction="horizontal" @update:model-value="changeGameMode" class="text-xs md:text-lg">
                    <van-radio name="consonants" icon-size="1rem">Consonants</van-radio>
                    <van-radio name="vowels" icon-size="1rem">Vowels</van-radio>
                    <van-radio name="numbers" icon-size="1rem">Numbers</van-radio>
                    <van-radio name="marks" icon-size="1rem">Marks</van-radio>
                </van-radio-group>
            </template>
        </van-cell>
        <van-cell center title="Infinite Mode">
            <template #right-icon>
                <van-switch :model-value="infinite" @update:model-value="infiniteMode" />
            </template>
        </van-cell>
        <van-cell center title="Shuffle">
            <template #right-icon>
                <van-switch :model-value="shuffle" @update:model-value="shuffleCharacters" />
            </template>
        </van-cell>

        <div class="flex flex-col flex-grow p-4">
            <div class="flex flex-col text-center flex-grow justify-center">
                <p v-if="!gameFinished" class="text-8xl">{{ currentCharacter.character }}</p>
                <span v-if="!gameFinished && !cheat" class="text-sm text-slate-300 cursor-default"
                    @click="cheat = true">Show
                    information</span>
                <p v-if="!gameFinished && cheat" class="text-sm cursor-default" @click="cheat = false">
                    Name: {{ currentCharacter.name }}<br>
                    Type: {{ currentCharacter.type }}<br>
                    Example: {{ currentCharacter.example }} ({{ currentCharacter.example_english }})<br>
                    <span v-if="![undefined, 'null'].includes(currentCharacter.is_live)">Dead/Alive: {{
            currentCharacter.is_live
                ? 'Alive' : 'Dead' }}<br></span>
                    <span v-if="['mid', 'high', 'low'].includes(currentCharacter.class)">Class: {{
            currentCharacter.class
        }}<br></span>
                </p>
            </div>

            <p v-if="!infinite && !gameFinished" class="text-center text-md mb-4">{{ currentIndex + 1 }} of {{
            alphabet.length }}</p>

            <van-button type="primary" round @click="getNextCharacter" v-if="!gameFinished">Next</van-button>
            <van-button type="primary" round @click="resetGame" v-if="gameFinished">Reset</van-button>
        </div>
    </div>
</template>