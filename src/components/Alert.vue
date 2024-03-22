<script>
import { defineComponent } from 'vue';
import { CheckCircleIcon, ExclamationCircleIcon } from '@heroicons/vue/24/solid';


export default defineComponent({
    components: { CheckCircleIcon, ExclamationCircleIcon },
    props: ['type', 'size', 'icon'],
    data() {
        return {
            classes: {
                success: "mb-3 inline-flex w-full items-center rounded-lg bg-success-100 px-6 py-5 text-base text-success-700",
                warning: 'mb-4 inline-flex w-full items-center rounded-lg bg-warning-100 px-6 py-5 text-base text-warning-800',
                danger: "mb-4 inline-flex w-full items-center rounded-lg bg-danger-100 px-6 py-5 text-base text-danger-700",
               
            }
        }
    },
    setup(props){
        console.log(props.icon)
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
    <div
  :class="classes[type]"
  role="alert">
  <span class="mr-2">
   <!-- <component :is="icon"></component> -->
   <CheckCircleIcon class="w-7 h-7" v-if="type == 'success'" />
   <ExclamationCircleIcon class="w-7 h-7" v-if="type == 'danger'" />
   <ExclamationCircleIcon class="w-7 h-7" v-if="type == 'warning'" />

  </span>
  <slot>
    
  </slot>
  
</div>
</template>