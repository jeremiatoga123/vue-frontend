<script>
import { BuildingOfficeIcon, UserGroupIcon, Squares2X2Icon, ChevronDoubleRightIcon } from '@heroicons/vue/20/solid'
import { defineComponent } from 'vue'
import { useIndexStore } from "@/store";

export default defineComponent({
    components: {
        BuildingOfficeIcon, UserGroupIcon, Squares2X2Icon, ChevronDoubleRightIcon
    },
    setup() {
        const store = useIndexStore()
        return {
            store
        }
    },
    methods: {
        toggleSidebar() {
            this.store.toggleSideBar()
        }
    }
})
</script>

<template>
    <div v-if="store.show" @click="toggleSidebar"
        class="h-screen w-screen absolute left-0 top-0 z-[20] bg-black/25 backdrop-blur block sm:hidden"></div>
    <aside
        class="sidebar m-0 sm:m-4 me-0 shrink-0 overflow-visible sm:rounded-xl bg-white dark:bg-slate-800 dark:text-white   shadow-lg transition-all z-20 h-screen sm:h-auto duration-700 fixed sm:relative items-stretch flex flex-col justify-between"
        :class="!store.show ? 'w-0 sm:w-20' : 'w-64'">
        <div class="flex flex-col w-full relative z-10 overflow-hidden">
            <div class="h-14 flex justify-start items-center">
                <div class="w-20 flex-shrink-0 flex justify-center">
                    <img src="@/assets/logo.svg" alt="Logo" class="w-10">
                </div>
                <h1 class="text-lg font-bold">Brand</h1>
            </div>
            <RouterLink to="/" active-class="text-primary"
                class="whitespace-nowrap py-2 flex gap-3 justify-start items-center ">
                <div class="w-20 flex-shrink-0 flex justify-center">
                    <Squares2X2Icon class="w-6 h-6 flex-shrink-0" />
                </div>
                <span>Dashboard</span>
            </RouterLink>
            <RouterLink  to="/students" active-class="text-primary"
                class="  whitespace-nowrap py-2 flex gap-3 justify-start items-center ">
                <div class="w-20 flex-shrink-0 flex justify-center">
                    <UserGroupIcon class="w-6 h-6 flex-shrink-0" />
                </div>
                <span>Students</span>
            </RouterLink>
            <RouterLink to="/lecturers" active-class="text-primary"
                class="  whitespace-nowrap py-2 flex gap-3 justify-start items-center ">
                <div class="w-20 flex-shrink-0 flex justify-center">
                    <UserGroupIcon class="w-6 h-6 flex-shrink-0" />
                </div>
                <span>Lecturers</span>
            </RouterLink>
            <RouterLink to="/companies" active-class="text-primary"
                class="  whitespace-nowrap py-2 flex gap-3 justify-start items-center ">
                <div class="w-20 flex-shrink-0 flex justify-center">
                    <BuildingOfficeIcon class="w-6 h-6 flex-shrink-0" />
                </div>
                <span>Companies</span>
            </RouterLink>
            <RouterLink to="/reports" active-class="text-primary"
                class="  whitespace-nowrap py-2 flex gap-3 justify-start items-center ">
                <div class="w-20 flex-shrink-0 flex justify-center">
                    <BuildingOfficeIcon class="w-6 h-6 flex-shrink-0" />
                </div>
                <span>Reports</span>
            </RouterLink>
        </div>
        <button @click="toggleSidebar" class="flex justify-center pb-3">
            <ChevronDoubleRightIcon class="w-8 h-8 transition-all duration-500"
                :class="store.show ? '-rotate-180' : 'rotate-0'" />
        </button>
    </aside>
</template>