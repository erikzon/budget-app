<script setup>
import BudgetCard from './components/BudgetCard.vue'
import AddBudgetModal from './components/AddBudgetModal.vue';
import AddExpensesModal from './components/AddExpensesModal.vue';
import useBudgets from "./contexts/useBudgets";
import { ref } from 'vue';

const { budgets, expenses, getBudgetExpenses, UNCATEGORIZED_BUDGET_ID } = useBudgets()

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

function maxAll() {
  return budgets.value.reduce((total, budget) => total + budget.max, 0)
}

function amountAll() {
  return expenses.value.reduce((total, expense) => total + expense.amount, 0)
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
      :showButton="true"
      v-on:toggleExpensesModal="toggleExpensesModal"
    />
    <BudgetCard
      v-if="getBudgetExpensesFor(UNCATEGORIZED_BUDGET_ID) > 0"
      :key="UNCATEGORIZED_BUDGET_ID"
      name="Uncategorized"
      :amount="getBudgetExpensesFor(UNCATEGORIZED_BUDGET_ID)"
      :grey="true"
      :showButton="true"
      v-on:toggleExpensesModal="toggleExpensesModal"
    />
    <BudgetCard
      v-if="getBudgetExpensesFor(UNCATEGORIZED_BUDGET_ID) > 0"
      :key="UNCATEGORIZED_BUDGET_ID"
      name="Total"
      :amount="amountAll()"
      :max="maxAll()"
      :grey="true"
      :showButton="false"
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
