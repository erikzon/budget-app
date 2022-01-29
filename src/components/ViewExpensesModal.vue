<script setup>
import useBudgets from "../contexts/useBudgets";
import { currencyFormatter } from "../utils";

const props = defineProps({
    selectedBudget: Object
})

const { getBudgetExpenses } = useBudgets()

const expenses = getBudgetExpenses(props.selectedBudget.id)
const emit = defineEmits(['closeModal'])

</script>

<template>
    <section>
        <form @submit.prevent="handleSubmit">
            <header>
                <h2>Expenses for {{props.selectedBudget.name}}</h2>
                <h2 @click="$emit('closeModal')">&times;</h2>
            </header>
            <div>
                <ul>
                    <li v-for="expense in expenses" :key="expense.id" class="text-3xl">
                        {{expense.description}}
                        {{currencyFormatter.format(expense.amount)}}
                        <span>&times;</span>
                    </li>
                </ul>
            </div>
            <!-- <div>
                <label>
                    Name
                    <input type="text" required v-model="name"/>
                </label>
                <label>
                    Maximum Spending
                    <input type="number" step="1" required v-model="max"/>
                </label>
                <button class="button primary" type="submit">Add</button>
                 @click="$emit('closeModal')
            </div> -->
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