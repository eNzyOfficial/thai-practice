<script setup>
import { computed, ref, onMounted } from 'vue';
import { useAlphabetStore } from '@/stores/alphabet';
import { useRouter } from 'vue-router';

const alphabetStore = useAlphabetStore();
const router = useRouter();

const backButton = () => router.push({ name: 'home' });

const vowels = ref(true);
const consonants = ref(true);
const numbers = ref(true);

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
    alphabet.value = shuffle.value
        ? alphabetStore.classCharacters.slice().sort(() => Math.random() - 0.5)
        : alphabetStore.classCharacters;

    currentIndex.value = 0;

    let characters = []

    if (vowels.value) {
        characters = characters.concat(alphabetStore.vowels)
    }

    if (consonants.value) {
        characters = characters.concat(alphabetStore.consonants)
    }

    if (numbers.value) {
        characters = characters.concat(alphabetStore.numbers)
    }

    alphabet.value = shuffle.value
        ? characters.slice().sort(() => Math.random() - 0.5)
        : characters;

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

function setCharacter(type, value) {
    if (!value && [vowels.value, consonants.value, numbers.value].filter(v => v).length < 2) {
        return;
    }

    switch (type) {
        case 'vowels':
            vowels.value = value;
            break;
        case 'consonants':
            consonants.value = value;
            break;
        case 'numbers':
            numbers.value = value;
            break;
    }

    resetGame();
}
</script>

<template>
    <div class="min-h-screen flex flex-col">
        <van-nav-bar title="Character Flash Cards" left-text="Back" left-arrow @click-left="backButton" />


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
        <van-cell center title="Vowels">
            <van-switch :model-value="vowels" @update:model-value="value => setCharacter('vowels', value)" />
        </van-cell>
        <van-cell center title="Consonants">
            <van-switch :model-value="consonants" @update:model-value="value => setCharacter('consonants', value)" />
        </van-cell>
        <van-cell center title="Numbers">
            <van-switch :model-value="numbers" @update:model-value="value => setCharacter('numbers', value)" />
        </van-cell>

        <div class="flex flex-col flex-grow p-4">
            <div class="flex flex-col text-center flex-grow justify-center">
                <p v-if="!gameFinished" class="text-8xl">{{ currentCharacter.character }}</p>
                <span v-if="!gameFinished && !cheat" class="text-sm text-slate-300 cursor-default" @click="cheat = true">Show information</span>
                <p v-if="!gameFinished && cheat" class="text-sm cursor-default" @click="cheat = false">
                    Name: {{ currentCharacter.name }}<br>
                    Type: {{ currentCharacter.type }}<br>
                    Example: {{ currentCharacter.example }} ({{ currentCharacter.example_english }})
                </p>
            </div>

            <p v-if="!infinite && !gameFinished" class="text-center text-md mb-4">{{ currentIndex + 1 }} of {{
            alphabet.length }}</p>

            <van-button type="primary" round @click="getNextCharacter" v-if="!gameFinished">Next</van-button>
            <van-button type="primary" round @click="resetGame" v-if="gameFinished">Reset</van-button>
        </div>
    </div>
</template>