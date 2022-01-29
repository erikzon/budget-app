<script setup>
import { currencyFormatter } from "../utils";

defineProps({
    name: String,
    amount: Number,
    max: Number,
    grey: Boolean,
    showButton: Boolean
})

const emit = defineEmits(['toggleExpensesModal','budgetSelection', 'toggleViewExpensesModal'])

function handleAddExpense() {
    emit('toggleExpensesModal')
    emit('budgetSelection')
}

function handleViewExpenses() {
    emit('toggleViewExpensesModal')
    emit('budgetSelection')
}

function status(amount, max) {
    const ratio = amount / max;
    if (ratio < 0.5) {
        return "default"
    }
    if (ratio < 0.75) {
        return "warning"
    }
    return "danger"
}

function cardBackground(amount, max, grey) {
    if (amount >= max) {
        return "red_background"
    }
    if (grey) {
        return "grey_background"
    }
}
</script>

<template>
    <section
        class="p-8 border-slate-500 border-2 flex rounded-md justify-between align-baseline font-normal mb-3 flex-wrap"
        :class="[cardBackground(amount, max, grey)]"
    >
        <h2>{{ name }}</h2>
        <h3>
            {{ currencyFormatter.format(amount) }} 
            <span
                class="text-slate-500 text-2xl"
                v-if="max"
            > / {{ currencyFormatter.format(max) }}</span>
        </h3>
        <progress
            v-if="max"
            :id="name"
            :value="amount"
            :max="max"
            class="basis-full"
            :class="[status(amount, max)]"
        ></progress>
        <div class="flex gap-4 items-end ml-auto" v-if="showButton">
            <button class="button" @click="handleAddExpense">Add Expense</button>
            <button class="button secondary" @click="handleViewExpenses">View Expenses</button>
        </div>
    </section>
</template>

<style scoped>
progress{
    @apply my-6 h-6
}

progress::-webkit-progress-bar {
    @apply bg-slate-300 rounded-2xl;
}

.default::-webkit-progress-value {
    @apply bg-blue-600 rounded-2xl;
}

.warning::-webkit-progress-value {
    @apply bg-yellow-600 rounded-2xl;
}

.danger::-webkit-progress-value {
    @apply bg-red-600 rounded-2xl;
}

.grey_background {
    @apply bg-slate-100;
}
.red_background {
    @apply bg-red-200;
}

h2 {
    @apply text-4xl;
}

h3 {
    @apply text-3xl;
}
</style>
