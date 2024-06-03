<script setup>

</script>

<template>
  <main class="p-4">
    <p class="text-center text-2xl mb-4">Practice Thai</p>

    <van-space direction="vertical" fill>
      <van-divider>Characters</van-divider>
      <van-button type="primary" block :to="{ name: 'character-audio' }">Audio</van-button>
      <van-button type="primary" block :to="{ name: 'character-flashcard' }">Flashcards</van-button>
        
      <van-divider>Consonants</van-divider>
      <van-button type="primary" block :to="{ name: 'consonant-classes' }">Classes</van-button>
      <van-button type="primary" block :to="{ name: 'consonant-dead-live' }">Dead or Live</van-button>
      <van-button type="primary" block :to="{ name: 'consonant-final' }">Final</van-button>
      
      <van-divider>Vowels</van-divider>
      <van-button type="primary" block :to="{ name: 'vowel-short-long' }">Short or Long</van-button>
      
      <van-divider>Tones</van-divider>
      <van-button type="primary" block :to="{ name: 'tone-rules' }">Rules</van-button>
    </van-space>
  </main>
</template>
