
<script>
import { RouterView } from 'vue-router'
import { defineComponent } from 'vue';


export default defineComponent({
  components: {
    RouterView
  },
  setup() {

  }
})
</script>

<template>
  <div
    class="flex w-full before:absolute before:contents-[''] before:w-full before:h-1/3 before:bg-green-500 dark:before:bg-green-800 bg-white dark:bg-slate-700">
    <Sidebar />
    <main class="relative
         w-full gap-3 p-0 sm:p-4 ps-0 sm:ps-0 sm:pe-2 flex z-10 flex-col sm:scrollbar-thin scrollbar-thumb-gray-600 
            scrollbar-thumb-rounded-lg overflow-auto">
      <!--        <app-header-v2 />-->
      <Header />
      <RouterView />
    </main>
  </div>
</template>
<!-- 
<style>
@media (min-width: 1024px) {
    .dashboard {
        min-height: 100vh;
        display: flex;
        align-items: center;
    }
}
</style> -->
