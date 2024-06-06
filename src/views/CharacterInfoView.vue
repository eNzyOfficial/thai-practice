<script setup>
import { computed, ref } from 'vue';
import { useAlphabetStore } from '@/stores/alphabet';
import { useRouter } from 'vue-router';

const alphabetStore = useAlphabetStore();
const router = useRouter();

const backButton = () => router.push({ name: 'home' });

const currentIndex = ref(0);
const gameMode = ref('consonants');

const alphabet = ref(alphabetStore.consonants);
const currentCharacter = computed(() => alphabet.value[currentIndex.value]);
const currentCharacterAudio = computed(() => new Audio(`audio/female/${currentCharacter.value.audio}`));

function resetGame() {
    switch (gameMode.value) {
        case 'consonants':
            alphabet.value = alphabetStore.consonants;
            break;
        case 'vowels':
            alphabet.value = alphabetStore.vowels;
            break;
        case 'numbers':
            alphabet.value = alphabetStore.numbers;
            break;
        case 'marks':
            alphabet.value = alphabetStore.marks;
            break;
    }

    currentIndex.value = 0;
}

function changeGameMode(value) {
    gameMode.value = value;
    resetGame();
}

function selectCharacter(value) {
    currentIndex.value = value;

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

        <div class="flex flex-grow justify-center items-center">

            <p class="text-6xl text-red-500">{{ currentCharacter.character }}</p>

            <van-icon @click="currentCharacterAudio.play()" type="primary" name="volume-o" size="2rem"
                class="ml-4 p-4 text-white rounded bg-blue-500 active:bg-blue-600 hover:bg-blue-400 hover:cursor-pointer" />

            <p class="text-sm cursor-default ml-4">
                <strong>Name:</strong> {{ currentCharacter.name }}<br>
                <strong>Type:</strong> {{ currentCharacter.type }}<br>
                <strong>Example:</strong> {{ currentCharacter.example }}<br>
                <strong>Example English:</strong> {{ currentCharacter.example_english }}<br>

                <span v-if="![undefined, 'null'].includes(currentCharacter.is_live)">
                    <strong>Dead/Alive:</strong> {{ currentCharacter.is_live ? 'Alive' : 'Dead' }}<br>
                </span>

                <span v-if="['mid', 'high', 'low'].includes(currentCharacter.class)">
                    <strong>Class:</strong> {{
                        currentCharacter.class
                    }}<br>
                </span>

                <span v-if="currentCharacter.final_consonant">
                    <strong>Final Consonant:</strong> {{ currentCharacter.final_consonant }}<br>
                </span>

                <span v-if="![undefined, 'null'].includes(currentCharacter.is_short)">
                    <strong>Short/Long:</strong> {{ currentCharacter.is_short ? 'Short' : 'Long' }}<br>
                </span>
            </p>
        </div>

        <div
            class="grid grid-cols-6 sm:grid-cols-8 lg:grid-cols-10 xl:grid-cols-12 gap-1 p-2 sm:p-2 sm:gap-2 xl:p-10 xl:gap-4">
            <div v-for="(character, index) in alphabet" :key="index" class="hover:cursor-pointer select-none"
                @click="selectCharacter(index)">
                <div class="rounded text-center text-sm sm:text-xl p-1 py-3 sm:p-2 sm:py-6 md:p-5 lg:p-6 lg:py-8 pointer-events-none"
                    :class="{
                        'bg-slate-100': currentIndex !== index,
                        'bg-slate-600 text-white': currentIndex === index
                    }">
                    {{ character.character }}
                </div>
            </div>
        </div>
    </div>
</template>