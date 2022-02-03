<script setup>
import { ref } from "vue";
import useBudgets from "../contexts/useBudgets";
import { currencyFormatter } from "../utils";

const props = defineProps({
    selectedBudget: Object,
    budgetExpenses: Object
})

const emit = defineEmits(['closeModal','deleteExpense','deleteBudget'])

function handleDeleteExpense(id) {
    emit('deleteExpense', id)
}

function handleDeleteBudget(id) {
    emit('deleteBudget', id)
    emit('closeModal')
}

</script>

<template>
    <section>
        <form @submit.prevent="handleSubmit">
            <header>
                <h2>Expenses for {{props.selectedBudget.name}}</h2>
                <h2 @click="$emit('closeModal')">&times;</h2>
                <button
                    v-if="props.selectedBudget.id !== 'Uncategorized'"
                 @click="handleDeleteBudget(props.selectedBudget.id)" class="button">Delete this budget</button>
            </header>
            <div>
                <ul>
                    <li v-for="expense in budgetExpenses" :key="expense.id" class="text-3xl">
                        {{expense.description}}
                        {{currencyFormatter.format(expense.amount)}}
                        <span @click="handleDeleteExpense(expense.id)">&times;</span>
                    </li>
                </ul>
            </div>
        </form>
    </section>
</template>

<style scoped>
label {
    @apply text-2xl;
}

h2 {
    @apply text-4xl;
}

input {
    @apply bg-slate-100 border-2;
}
</style>