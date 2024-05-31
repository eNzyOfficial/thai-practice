import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import toneRulesData from '../data/toneRules.json'
import toneData from '../data/tones.json'

export const useAlphabetStore = defineStore('alphabet', () => {
    const rules = ref(toneRulesData)
    const tones = ref(toneData)

    return {
        rules,
        tones
    }
})