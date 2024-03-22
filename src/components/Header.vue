<script>
import { defineComponent } from 'vue'
import { useIndexStore } from "@/store";
import { Bars3Icon, BellIcon, ChevronDownIcon, MoonIcon, SunIcon } from "@heroicons/vue/20/solid";
import { RouterLink } from 'vue-router';

export default defineComponent({
  name: "HeaderO",
  components: { SunIcon, ChevronDownIcon, Bars3Icon, BellIcon, MoonIcon, RouterLink },
  setup() {
    const store = useIndexStore();
    console.log(store.user)
    return {
      store
    }
  },
  props: [],
  created() {
  },
  data() {
    return {
      showNotification: false
    }
  },
  methods: {
    toggleDarkMode() {
      this.store.setDarkMode()
    },
    toggleSidebar() {
      this.store.toggleSideBar()
    },
    toggleNotification() {
      this.showNotification = !this.showNotification
    },
    logout() {
      this.store.unloadUser()
    }
  }
})
</script>

<template>
  <header class="top-0 w-full z-10 sticky">
    <div
      class="flex justify-between items-center z-10 rounded-b-xl sm:rounded-xl p-2  bg-white dark:bg-slate-800 dark:text-white drop-shadow-lg">
      <button class="block sm:hidden">
        <Bars3Icon class="w-6 h-6" @click="toggleSidebar" />
      </button>
      <div id="breadcrumbs" class="hidden sm:block">
        <ol class="flex ">
          <li class="px-2"><a href="#" class="hover:underline">Home</a></li>
          <!-- <li class="text-gray-500 select-none">/</li>
          <li class="px-2"><a href="#" class="hover:underline">Series</a></li>
          <li class="text-gray-500 select-none">/</li>
          <li class="px-2 text-indigo-600">Game of thrones</li> -->
        </ol>
      </div>
      <div id="navbar-end" class="flex gap-3">
        <button @click="toggleDarkMode">
          <MoonIcon v-if="!store.darkMode" class="w-6 h-6 transition-all" />
          <SunIcon v-else class="w-6 h-6 transition-all" />
        </button>
        <button>
          <BellIcon class="w-6 h-6" />
        </button>
        <Dropdown buttonClass="profile flex gap-3 items-center flex-row text-start">
          <img src="https://picsum.photos/200" alt="" class="w-10 h-10 rounded-full">
          <div class="flex-col hidden sm:flex">
            <span class="font-semibold">{{ store.username }}</span>
            <span>Administrator</span>
          </div>
          <ChevronDownIcon class="w-4 h-4" />

          <template #items>
            <RouterLink to="/setting">
              <DropdownItem>Setting</DropdownItem>
            </RouterLink>
            <DropdownItem @click="logout">Logout</DropdownItem>
          </template>
        </Dropdown>
      </div>
    </div>
  </header>
</template>

<style scoped></style>