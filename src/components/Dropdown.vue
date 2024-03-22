<script>
import { defineComponent, ref } from 'vue'
import { EllipsisVerticalIcon } from '@heroicons/vue/24/solid'
import { onClickOutside } from '@vueuse/core'

export default defineComponent({
    components: { EllipsisVerticalIcon },
    props: ['buttonText', 'icon', 'buttonClass', 'position'],
    name: 'Dropdown',
    setup(props) {
        const target = ref(null)
        const isOpen = ref(false)

        onClickOutside(target, (event) => {
            isOpen.value = false
        })

        let positionClass = ""
        switch (props.position) {
            case "left":
                positionClass = "-translate-x-full"
                break;
        }

        return {
            target,
            isOpen,
            positionClass
        }
    },
    methods: {
        toggle() {
            this.isOpen = !this.isOpen
        }
    }

})
</script>

<template>
    <div>
        <button id="dropdownDefaultButton" @click="toggle" ref="target" :class="buttonClass" type="button">{{ buttonText }}
            <slot></slot>
        </button>
        <!-- Dropdown menu -->
        <div v-if="isOpen" :class="positionClass"
            class="z-10 absolute  bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
            <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                <slot name="items"></slot>
            </ul>
        </div>
    </div>
</template>