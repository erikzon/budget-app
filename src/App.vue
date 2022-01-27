<script setup>
import BudgetCard from './components/BudgetCard.vue'
import AddBudgetModal from './components/AddBudgetModal.vue';
import AddExpensesModal from './components/AddExpensesModal.vue';
import useBudgets from "./contexts/useBudgets";
import { ref } from 'vue';

const { budgets, getBudgetExpenses, UNCATEGORIZED_BUDGET_ID } = useBudgets()

const defaultID = ref(UNCATEGORIZED_BUDGET_ID);
const showBudgetModal = ref(false);
const showExpensesModal = ref(true);

function toggleBudgetModal() {
  showBudgetModal.value = !showBudgetModal.value;
}

function toggleExpensesModal() {
  showExpensesModal.value = !showExpensesModal.value;
}

function getBudgetExpensesFor(budgetId) {
  return getBudgetExpenses(budgetId).reduce((total, expense) => total + expense.amount,0)
}
</script>

<template>
  <header class="container mx-auto p-5 flex justify-between align-baseline gap-3">
    <h1 class="text-6xl grow">Budgets</h1>
    <button class="button primary" @click="toggleBudgetModal">Add Budget</button>
    <button class="button" @click="toggleExpensesModal">Add Expense</button>
  </header>
  <main class="grid grid-cols-2 gap-2 items-start p-4">
    <BudgetCard
      v-for="budget in budgets"
      :key="budget.id"
      :name="budget.name"
      :amount="getBudgetExpensesFor(budget.id)"
      :max="budget.max"
      :grey="false"
      v-on:toggleExpensesModal="toggleExpensesModal"
    />
  </main>
  <AddBudgetModal v-show="showBudgetModal" v-on:closeModal="toggleBudgetModal" />
  <AddExpensesModal
    v-show="showExpensesModal"
    v-on:closeModal="toggleExpensesModal"
    :defaultBudgetId="defaultID"
  />
</template>

<style>
</style>
