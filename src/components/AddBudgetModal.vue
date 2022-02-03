<script setup>
import { ref } from 'vue';

const emit = defineEmits(['closeModal', 'addBudget'])

const name = ref("")
const max = ref(0)

function handleSubmit() {
    emit('addBudget', { name: name.value, max: max.value });
    name.value = ""
    max.value = ""
    emit('closeModal');
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
                        <h2 class="grow">New Budget</h2>
                        <span
                            @click="$emit('closeModal')"
                            class="hover:text-red-600 cursor-pointer text-5xl"
                        >&times;</span>
                    </header>
                    <form class="flex flex-col p-4" @submit.prevent="handleSubmit">
                        <label>
                            Name
                            <input type="text" required v-model="name" />
                        </label>
                        <label>
                            Maximum Spending
                            <input type="number" step="1" required v-model="max" />
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

input {
    @apply bg-slate-100 border-2 rounded-lg w-full border-blue-500 h-11;
}
input:focus {
    @apply bg-slate-50 border-4;
}

</style>