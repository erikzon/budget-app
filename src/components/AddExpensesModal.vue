<script setup>
import { ref } from 'vue';
import useBudgets from "../contexts/useBudgets";

const { UNCATEGORIZED_BUDGET_ID } = useBudgets()

const props = defineProps({
    defaultBudget: Object,
    budgets: Object
})
const emit = defineEmits(['closeModal', 'addExpense'])

const description = ref("")
const amount = ref(0)
const budgetId = props.defaultBudget.id

function handleSubmit() {
    emit('addExpense', { description: description.value, amount: amount.value, budgetId: document.getElementById("budgetId").value })
    description.value = ""
    amount.value = ""
    budgetId.value = ""
    emit('closeModal');
}

function selectedOption(id) {
    if (props.defaultBudget.id == id) {
        return true
    }
    return false
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
                    <select required id="budgetId">
                        <!-- v-model="budgetId" -->
                        <option
                            :value="UNCATEGORIZED_BUDGET_ID"
                            :selected="selectedOption(UNCATEGORIZED_BUDGET_ID)"
                        >Uncategorized</option>
                        <option
                            v-for="budget in budgets"
                            :key="budget.id"
                            :id="budget.id"
                            :value="budget.id"
                            :selected="selectedOption(budget.id)"
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
    text-xl;
}

option {
    @apply text-base;
}
</style>