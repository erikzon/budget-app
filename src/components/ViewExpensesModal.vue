<script setup>
import { ref } from "vue";
import useBudgets from "../contexts/useBudgets";
import { currencyFormatter } from "../utils";

const props = defineProps({
    selectedBudget: Object,
    budgetExpenses: Object
})

const emit = defineEmits(['closeModal', 'deleteExpense', 'deleteBudget'])

function handleDeleteExpense(id) {
    emit('deleteExpense', id)
}

function handleDeleteBudget(id) {
    emit('deleteBudget', id)
    emit('closeModal')
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
                        class="container align-baseline mx-auto flex self-center gap-3 mb-2 p-4 bg-blue-300"
                    >
                        <h2 class="grow">Expenses for {{ props.selectedBudget.name }}</h2>

                        <button
                            v-if="props.selectedBudget.id !== 'Uncategorized'"
                            @click="handleDeleteBudget(props.selectedBudget.id)"
                            class="button"
                        >Delete this budget</button>
                        <span
                            @click="$emit('closeModal')"
                            class="hover:text-red-600 cursor-pointer text-5xl"
                        >&times;</span>
                    </header>
                    <table class="m-4">
                        <caption></caption>
                        <thead>
                            <tr class="text-lg">
                                <th>Expense Description</th>
                                <th>Amount</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr
                                v-for="expense in budgetExpenses"
                                :key="expense.id"
                                class="text-2xl"
                            >
                                <td>{{ expense.description }}</td>
                                <td>{{ currencyFormatter.format(expense.amount) }}</td>
                                <td>
                                    <span @click="handleDeleteExpense(expense.id)" class="hover:text-red-600 cursor-pointer text-4xl">&times;</span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
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

input {
    @apply bg-slate-100 border-2 rounded-lg w-full border-blue-500 h-11;
}

input:focus {
    @apply bg-slate-50 border-4;
}

th, tr:nth-child(even) {
    @apply bg-blue-100
}
</style>