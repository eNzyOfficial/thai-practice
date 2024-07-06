<script setup>
import { ref, computed, onMounted } from 'vue';

const synth = window.speechSynthesis;
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
const voices = ref(synth.getVoices());
const voiceIndex = ref(null);
const rate = ref(1);
const text = ref('');
const recording = ref(false);
const log = ref('');

const currentVoice = computed(() => voices.value[voiceIndex.value]);

onMounted(() => {
    recognition.lang = 'th-TH';
    recognition.continuous = true;

    recognition.onstart = function() {
        log.value = 'Speech recognition started. Speak into the microphone.';
    }

    recognition.onresult = (event) => {
        // const transcript = event.results[0][0].transcript;
        // const confidence = event.results[0][0].confidence;

        const accumulatedResult = [];
      for (const result of event.results) accumulatedResult.push(`${result[0].transcript} (confidence: ${result[0].confidence})`);

      text.value = accumulatedResult.join('\n');

        // text.value = transcript + ' (confidence: ' + confidence + ')';
    };

    recognition.onerror = function(event) {
        log.value = 'Speech recognition error detected: ' + event.error;
    };

    synth.onvoiceschanged = () => {
        voices.value = synth.getVoices();
    };

    voices.value.forEach((voice, index) => {
        if (voice.lang === 'th-TH') {
            voiceIndex.value = index;
        }
    });
});

function tts() {
    const utterance = new SpeechSynthesisUtterance(text.value);

    if (currentVoice.value) {
        utterance.lang = currentVoice.value.lang;
        utterance.voice = currentVoice.value;
    }

    utterance.rate = rate.value;

    synth.speak(utterance);
}

function speechToText() {
    if (recording.value) {
        recognition.stop();
        recording.value = false;
    } else {
        recognition.start();
        recording.value = true;
    }
}
</script>

<template>
    <div class="p-4">
        <div class="flex flex-col mb-4">
            <label for="rate">Rate ({{ rate }}): </label>
            <input type="range" id="rate" min="0.5" max="2" v-model="rate" step="0.1">
        </div>

        <div class="flex flex-col mb-4">
            <label for="voice">TTS Voice {{ currentVoice ? currentVoice.lang : '' }}: </label>
            <select id="voice" v-model="voiceIndex" class="border rounded border-slate-700">
                <option v-for="(voice, index) in voices" :key="index" :value="index">({{ index }}) {{ voice.name }} {{ voice.lang }}
                </option>
            </select>
        </div>

        <div class="flex flex-col mb-4">
            <label for="text">Text: </label>
            <textarea v-model="text" class="border rounded border-slate-700"></textarea>
        </div>

        <button @click="tts" class="rounded bg-slate-600 text-white p-4 py-2">Speak</button>
        <button @click="speechToText" class="rounded bg-slate-600 text-white p-4 py-2 ml-4">{{ !recording ? 'Record' : 'Finished' }}</button>

        <div>{{ log }}</div>
    </div>
</template>
