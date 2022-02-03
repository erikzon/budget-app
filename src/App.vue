<script setup>
import BudgetCard from './components/BudgetCard.vue'
import AddBudgetModal from './components/AddBudgetModal.vue'
import AddExpensesModal from './components/AddExpensesModal.vue'
import useBudgets from "./contexts/useBudgets"
import { onMounted, ref } from 'vue'
import ViewExpensesModal from './components/ViewExpensesModal.vue'

const { budgets, expenses, getBudgetExpenses, UNCATEGORIZED_BUDGET_ID, addBudget, addExpense, deleteExpense, deleteBudget } = useBudgets()

const defaultID = ref(UNCATEGORIZED_BUDGET_ID);
const showBudgetModal = ref(false)
const showExpensesModal = ref(false)
const showViewExpensesModal = ref(false)
const selectedBudget = ref({ id: UNCATEGORIZED_BUDGET_ID, name: "Uncategorized", max: 0 })
const defaultBudgetObject = { id: UNCATEGORIZED_BUDGET_ID, name: "Uncategorized", max: 0 };
onMounted(() => {
  //console.log(selectedBudget.value);
})

function BudgetSelection(budget) {
  selectedBudget.value = budget
}

function toggleBudgetModal() {
  showBudgetModal.value = !showBudgetModal.value;
}

function toggleExpensesModal() {
  showExpensesModal.value = !showExpensesModal.value;
}

function toggleViewExpensesModal() {
  showViewExpensesModal.value = !showViewExpensesModal.value;
}

function getBudgetExpensesFor(budgetId) {
  return getBudgetExpenses(budgetId).reduce((total, expense) => total + expense.amount, 0)
}

function handleAddExpensesFromHeader() {
  selectedBudget.value = { id: UNCATEGORIZED_BUDGET_ID, name: "Uncategorized", max: 0 }
  toggleExpensesModal();
}

function maxAll() {
  return budgets.value.reduce((total, budget) => total + budget.max, 0)
}

function amountAll() {
  return expenses.value.reduce((total, expense) => total + expense.amount, 0)
}

function handleAddBudget(value) {
  addBudget({name: value.name, max: value.max})
}

function handleAddExpense(value) {
  addExpense({
    description: value.description, 
    amount: value.amount, 
    budgetId: value.budgetId
  })
}

function handleDeleteExpense(value) {
  deleteExpense(value)
}

function handleDeleteBudget(value) {
  deleteBudget(value)
}

</script>

<template>
  <header class="container mx-auto p-5 flex justify-between align-baseline gap-3">
    <h1 class="text-6xl grow">Budgets</h1>
    <button class="button primary" @click="toggleBudgetModal">Add Budget</button>
    <button class="button" @click="handleAddExpensesFromHeader">Add Expense</button>
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
      v-on:toggleViewExpensesModal="toggleViewExpensesModal"
      v-on:budgetSelection="BudgetSelection(budget)"
    />
    <BudgetCard
      v-if="getBudgetExpensesFor(UNCATEGORIZED_BUDGET_ID) > 0"
      :key="UNCATEGORIZED_BUDGET_ID"
      name="Uncategorized"
      :amount="getBudgetExpensesFor(UNCATEGORIZED_BUDGET_ID)"
      :grey="true"
      :showButton="true"
      v-on:toggleExpensesModal="toggleExpensesModal"
      v-on:toggleViewExpensesModal="toggleViewExpensesModal"
      v-on:budgetSelection="BudgetSelection(defaultBudgetObject)"
    />
    <BudgetCard
      :key="123"
      name="Total"
      :amount="amountAll()"
      :max="maxAll()"
      :grey="true"
      :showButton="false"
    />
  </main>
  <AddBudgetModal
    v-if="showBudgetModal"
    v-on:closeModal="toggleBudgetModal"
    v-on:addBudget="handleAddBudget"
  />
  <AddExpensesModal
    v-show="showExpensesModal"
    v-on:closeModal="toggleExpensesModal"
    v-on:addExpense="handleAddExpense"
    :defaultBudget="selectedBudget"
    :budgets = "budgets"
  />
  <ViewExpensesModal
    v-if="showViewExpensesModal"
    v-on:closeModal="toggleViewExpensesModal"
    v-on:deleteExpense="handleDeleteExpense"
    v-on:deleteBudget="handleDeleteBudget"
    :selectedBudget="selectedBudget"
    :budgetExpenses="getBudgetExpenses(selectedBudget.id)"
  />
</template>

<style>
</style>
