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
    <div
        class="fixed z-10 inset-0 overflow-y-auto"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
    >
        <div
            class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
        >
            <div
                class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                aria-hidden="true"
            ></div>
            <!-- This element is to trick the browser into centering the modal contents. -->
            <span
                class="hidden sm:inline-block sm:align-middle sm:h-screen"
                aria-hidden="true"
            >&#8203;</span>
            <div
                class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
            >
                <div class="flex flex-col sm:flex">
                    <header
                        class="container align-baseline mx-auto flex self-center gap-3 mb-6 p-4 bg-blue-300"
                    >
                        <h2 class="grow">New Expense</h2>
                        <span
                            @click="$emit('closeModal')"
                            class="hover:text-red-600 cursor-pointer text-5xl"
                        >&times;</span>
                    </header>
                    <form class="flex flex-col p-4" @submit.prevent="handleSubmit">
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
                        <div class="px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                            <button class="button primary" type="submit">Add</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
label {
    @apply text-lg font-semibold mb-4;
}

h2 {
    @apply text-4xl;
}

input, select {
    @apply bg-slate-100 border-2 rounded-lg w-full border-blue-500 h-11;
}
input:focus {
    @apply bg-slate-50 border-4;
}


</style>