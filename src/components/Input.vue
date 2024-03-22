
<script>
import { defineComponent } from 'vue';
import { CheckCircleIcon, ExclamationCircleIcon } from '@heroicons/vue/24/solid';


export default defineComponent({
    components: { CheckCircleIcon, ExclamationCircleIcon },
    props: ['type','label','title','placeholder', 'model'],
    emits: ['update:model']
})
</script>
  
<template>
    <div>
        <label :for="$props.label" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{ $props.title }}</label>
        <input :type="$props.type" :id="$props.label" :value="model" @change="$emit('update:model', $event.target.value)"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            :placeholder="$props.placeholder" required>
    </div>
</template>