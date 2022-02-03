import { ref } from 'vue'
import { v4 as uuidV4 } from 'uuid'

const useBudgets = () => {
    const BUDGETS_KEY = "budgets-erick_oliva"
    const EXPENSES_KEY = "expenses-erick_oliva"
    const UNCATEGORIZED_BUDGET_ID = "Uncategorized"
    
    const budgets = ref([])
    const expenses = ref([])

    budgets.value = JSON.parse(localStorage.getItem(BUDGETS_KEY) || "[]")
    expenses.value = JSON.parse(localStorage.getItem(EXPENSES_KEY) || "[]")

    function getBudgetExpenses(budgetId) {
        return expenses.value.filter(expense => expense.budgetId === budgetId)
    }

    function addExpense({ description, amount, budgetId }) {
        expenses.value.push({ id: uuidV4(), description, amount, budgetId })
        localStorage.setItem(EXPENSES_KEY, JSON.stringify(expenses.value))
    }

    function addBudget({ name, max }) {
        if (budgets.value.find(budget => budget.name === name)) {
            return
        }
        budgets.value.push({ id: uuidV4(), name, max });
        localStorage.setItem(BUDGETS_KEY, JSON.stringify(budgets.value))
    }

    function deleteBudget(id) {
        // TODO; detail with expenses
        budgets.value = budgets.value.filter(budget => budget.id !== id)
        localStorage.setItem(BUDGETS_KEY, JSON.stringify(budgets.value))
    }

    function deleteExpense( id ) {
        expenses.value = expenses.value.filter(expense => expense.id !== id)
        localStorage.setItem(EXPENSES_KEY, JSON.stringify(expenses.value))
    }

    return { budgets, expenses, UNCATEGORIZED_BUDGET_ID, getBudgetExpenses, addExpense, addBudget, deleteBudget, deleteExpense }
}

export default useBudgets