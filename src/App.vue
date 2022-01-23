<script setup>
import BudgetCard from './components/BudgetCard.vue'
</script>

<template>
  <header class="container mx-auto p-5 flex justify-between align-baseline gap-3">
      <h1 class="text-6xl grow">Budgets</h1>
      <button class="button primary">Add Budget</button>
      <button class="button">Add Expense</button>
  </header>
  <main class="grid grid-cols-2 gap-2 items-start p-4">
    <BudgetCard name="Entertainment" :amount="100" :max="1000" :grey="false" />
  </main>
</template>

<style>

</style>
