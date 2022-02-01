<script setup>
import useBudgets from "../contexts/useBudgets";
import { currencyFormatter } from "../utils";

const props = defineProps({
    selectedBudget: Object
})

const { getBudgetExpenses, deleteExpense, deleteBudget } = useBudgets()

const expenses = getBudgetExpenses(props.selectedBudget.id)
const emit = defineEmits(['closeModal'])

function handleDeleteExpense(id) {
    deleteExpense(id)
}

function handleDeleteBudget(id) {
    deleteBudget(id)
}

</script>

<template>
    <section>
        <form @submit.prevent="handleSubmit">
            <header>
                <h2>Expenses for {{props.selectedBudget.name}}</h2>
                <h2 @click="$emit('closeModal')">&times;</h2>
                <button @click="deleteBudget(props.selectedBudget.id)" class="button">Delete this budget</button>
            </header>
            <div>
                <ul>
                    <li v-for="expense in expenses" :key="expense.id" class="text-3xl">
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