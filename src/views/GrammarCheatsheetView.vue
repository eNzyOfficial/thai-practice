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


        <div class="flex flex-col flex-grow p-4">
            Test
        </div>
    </div>
</template>