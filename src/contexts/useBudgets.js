import { ref } from 'vue'
import { v4 as uuidV4} from 'uuid'

const useBudgets = () => {
    const budgets = ref([]);
    const expenses = ref([]);

    function getBudgetExpenses(budgetId) {
        return expenses.value.filter(expense => expense.budgetId === budgetId)
    }

    function addExpense({description, amount, budgetId}) {
        expenses.value.push({id: uuidV4(), description, amount, budgetId});
    }

    function addBudget({name, max}) {
        if (budgets.value.find(budget => budget.name === name)) {
            return
        }
        budgets.value.push({id: uuidV4(), name, max});
        // budgets.value = [...budgets.value, { id: uuidV4(), name, max }]
    }

    function deleteBudget({id}) {
        // TODO; detal with expenses
        budgets.value = budgets.value.filter(budget => budget.id !== id)
    }

    function deleteExpense({id}) {
        expenses.value = expenses.value.filter(expense => expense.id !== id)
    }

    return { budgets, expenses, getBudgetExpenses, addExpense, addBudget, deleteBudget, deleteExpense }
}

export default useBudgets