<script setup>
import { ref } from 'vue';
import useBudgets from "../contexts/useBudgets";

const { addExpense, budgets, UNCATEGORIZED_BUDGET_ID } = useBudgets()

const props = defineProps({
    defaultBudgetId: String
})
const emit = defineEmits(['closeModal'])

const description = ref("")
const amount = ref(0)
const budgetId = ref("")

function handleSubmit() {
    addExpense({ description: description.value, amount: amount.value, budgetId: budgetId.value })
    console.log(budgetId.value);
    description.value = ""
    amount.value = ""
    budgetId.value = ""
    emit('closeModal');
}
</script>

<template>
    <section>
        <form @submit.prevent="handleSubmit">
            <header>
                <h2>New Expense</h2>
                <h2 @click="$emit('closeModal')">&times;</h2>
            </header>
            <div>
                <label>
                    Description
                    <input type="text" required v-model="description" />
                </label>
                <label>
                    Amount
                    <input type="number" step="1" required v-model="amount" />
                </label>
                <label>
                    Budget
                    <select required v-model="budgetId" :id="UNCATEGORIZED_BUDGET_ID" >
                        <option :id="UNCATEGORIZED_BUDGET_ID" 
                        :value="UNCATEGORIZED_BUDGET_ID" 
                        selected>Uncategorized</option>
                        <option
                            v-for="budget in budgets"
                            :key="budget"
                            :id="budget.id"
                            :value="budget.id"
                        >{{ budget.name }}</option>
                    </select>
                </label>
                <button class="button primary" type="submit">Add</button>
                <!-- @click="$emit('closeModal') -->
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

select {
    @apply border-2 border-slate-300 bg-slate-100
    text-xl
}

option {
    @apply text-base
}
</style>