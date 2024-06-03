import { ref } from 'vue'
import { defineStore } from 'pinia'
import toneRulesData from '../data/toneRules.json'
import toneData from '../data/tones.json'

export const useTonesStore = defineStore('tones', () => {
    const rules = ref(toneRulesData)
    const tones = ref(toneData)

    return {
        rules,
        tones
    }
})