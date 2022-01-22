<script setup>
import { currencyFormatter } from "../utils";

defineProps({
    name: String,
    amount: Number,
    max: Number
})
</script>

<template>
    <section
        class="p-8 border-slate-500 border-2 flex rounded-md
        justify-between align-baseline font-normal mb-3 flex-wrap"
    >
        <h2>{{ name }}</h2>
        <h3>
            {{ currencyFormatter.format(amount) }} /
            <span
                class="text-slate-500 text-2xl"
            >{{ currencyFormatter.format(max) }}</span>
        </h3>
        <progress :value="amount" :max="max" class="basis-full"></progress>
    </section>
</template>

<style scoped>
progress::-webkit-progress-bar { 
    @apply bg-slate-300 rounded-2xl h-6 mb-2
}

progress::-webkit-progress-value { 
    @apply bg-blue-600 rounded-2xl
}

h2 {
    @apply text-4xl;
}

h3 {
    @apply text-3xl;
}
</style>
