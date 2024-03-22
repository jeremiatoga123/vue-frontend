<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
    props: ['text', 'action'],
    setup(props) {
        const isAnchor = ref(false)
        try {
            new URL(props.action)
            isAnchor.value = true;
        } catch {
            // console.log('err')
        }
        return {
            ...props,
            isAnchor
        }
    },
})
</script>

<template>
    <li>
        <a v-if="isAnchor" :href="url"
            class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
            <slot></slot>
        </a>
        <button v-if="!isAnchor"
            class="block px-4 py-2 w-full text-start hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
            <slot></slot>
        </button>
    </li>
</template>