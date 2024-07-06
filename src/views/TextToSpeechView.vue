<script setup>
import { ref, onMounted } from 'vue';

const synth = window.speechSynthesis;
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
const voices = ref(synth.getVoices());
const voiceIndex = ref(null);
const rate = ref(1);
const text = ref('');
const recording = ref(false);

onMounted(() => {
    recognition.lang = 'th-TH';

    recognition.onstart = function() {
        text.value = 'Speech recognition started. Speak into the microphone.';
    }

    recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        const confidence = event.results[0][0].confidence;

        text.value = transcript + ' (confidence: ' + confidence + ')';
    };

    recognition.onerror = function(event) {
        text.value = 'Speech recognition error detected: ' + event.error;
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
    // utterance.voiceURI = 'native';
    utterance.lang = 'th-TH';

    if (voices.value[voiceIndex.value]) {
        utterance.voice = 46;//voices.value[voiceIndex.value];
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
    <div v-if="voiceIndex">
        Unable to find Thai voice.
    </div>

    <div class="p-4" v-else>
        <div class="flex flex-col mb-4">
            <label for="rate">Rate ({{ rate }}): </label>
            <input type="range" id="rate" min="0.5" max="2" v-model="rate" step="0.1">
        </div>

        <div class="flex flex-col mb-4">
            <label for="voice">Voice: </label>
            <select id="voice" v-model="voiceIndex" class="border rounded border-slate-700">
                <option v-for="(voice, index) in voices" :key="index" :value="index">{{ voice.name }} {{ voice.lang }}
                </option>
            </select>
        </div>

        <div class="flex flex-col mb-4">
            <label for="text">Text: </label>
            <textarea v-model="text" class="border rounded border-slate-700"></textarea>
        </div>

        <button @click="tts" class="rounded bg-slate-600 text-white p-4 py-2">Speak</button>
        <button @click="speechToText" class="rounded bg-slate-600 text-white p-4 py-2 ml-4">{{ !recording ? 'Record' : 'Finished' }}</button>
    </div>
</template>
