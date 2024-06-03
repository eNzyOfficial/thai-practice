<script setup>

</script>

<template>
  <main class="p-4">
    <p class="text-center text-2xl mb-4">Practice Thai</p>

    <van-space direction="vertical" fill>
      <van-button type="primary" block to="character-audio">Character Audio</van-button>
      <van-button type="primary" block to="character-flashcard">Character Flashcards</van-button>
      <van-button type="primary" block to="consonant-classes">Consonants (Classes)</van-button>
      <van-button type="primary" block to="dead-live">Consonants (Dead or Live)</van-button>
      <van-button type="primary" block to="consonant-final" disabled>Consonants (Final)</van-button>
      <van-button type="primary" block to="short-long">Short or Long Vowel</van-button>
      <van-button type="primary" block to="short-long" disabled>Tone quiz</van-button>
    </van-space>
  </main>
</template>
