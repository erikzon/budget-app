<script setup>
import useBudgets from "../contexts/useBudgets";

const {addBudget} = useBudgets()

const emit = defineEmits(['closeModal'])

</script>

<template>
    <section>
        <form @submit.prevent="handleSubmit">
            <header>
                <h2>New Budget</h2>
                <h2 @click="$emit('closeModal')">&times;</h2>
            </header>
            <div>
                <label>
                    Name
                    <input type="text" required v-model="name"/>
                </label>
                <label>
                    Maximum Spending
                    <input type="number" step="1" required v-model="max"/>
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
</style>