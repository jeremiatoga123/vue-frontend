<script>
import { defineComponent } from 'vue';

export default defineComponent({
    props: {
        type: String,
        size: String,
    },
    data() {
        return {
            classes: {
                secondary: 'inline-block whitespace-nowrap rounded-full bg-success-100 px-[0.65em] pb-[0.25em] pt-[0.35em] text-center align-baseline text-[14px] font-bold leading-none text-success-700',
                primary: 'inline-block whitespace-nowrap rounded-[0.27rem] bg-info-100 px-[0.65em] pb-[0.25em] pt-[0.35em] text-center align-baseline text-[14px] font-bold leading-none text-info-800',
                danger: 'inline-block whitespace-nowrap rounded-[0.27rem] bg-danger-100 px-[0.65em] pb-[0.25em] pt-[0.35em] text-center align-baseline text-[14px]font-bold leading-none text-danger-700',
            }
        }
    },
    methods: {
        getSizeClass(size) {
            switch (size) {
                default:
                    return 'text-sm';
            }
        }
    }
})
</script>

<template>
    <div :class="classes[$props.type]">
        <slot></slot>
    </div>
</template>