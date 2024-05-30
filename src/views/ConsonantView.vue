<script setup>
import { ref } from 'vue';
const backButton = () => history.back();

const showSettings = ref(true)
</script>

<template>
    <div class="min-h-screen flex flex-col">
        <van-nav-bar title="Title" left-text="Back" right-text="Settings" left-arrow @click-left="backButton"
            @click-right="showSettings = true" />
        <div class="flex-grow">
            Hello world
        </div>
    </div>

    <van-popup v-model:show="showSettings" closeable position="bottom" class="min-h-screen">Content</van-popup>
</template>