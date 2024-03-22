<script>
import axios from 'axios'
import { defineComponent, ref } from 'vue'
import { useCookies } from 'vue3-cookies'
import NewLecturerView from './NewLecturerView.vue'

export default defineComponent({
    components: {
        NewLecturerView,
    },
    data() {
        return {
            data: {
                records: null,
                paging: null
            },
            params: {
                search: null,
                page: 1,
                role: 'Lecturer',
                order_column: null,
                order_value: null,
                per_page: 10,
            },
            columns: [
                {
                    name: 'NIP',
                    path: 'personable.lecturer_nip'
                },
                {
                    name: 'Username',
                    path: 'username'
                },
                {
                    name: 'Name',
                    path: 'personable.lecturer_name'
                },
                {
                    name: 'Email',
                    path: 'personable.email'
                },
            ],
            mode: 'index',
            // url: 'https://dummyjson.com/users',
        }
    },
    setup(props) {
        const NewLecturer = ref(null)
        return {
            NewLecturer
        }
    },
    created() {
        this.fetchRecords()
    },
    methods: {
        fetchRecords() {
            const { cookies } = useCookies()
            axios.get(
                '/users', {
                params: this.params,
            }).then((response) => {
                return response.data
            }).then((data) => {
                console.log(data.data.paging)
                this.data.records = data.data.user.data;
                this.data.paging = data.data.paging
            })
        },
        reload({ currentPage, currentPageSize, search, order_by, order_dir, per_page }) {
            console.log(currentPage)
            this.params.search = search;
            this.params.page = currentPage;
            this.params.order_column = order_by
            this.params.order_value = order_dir
            this.params.per_page = per_page
            this.fetchRecords()
        },
        onNewLecturerClosed() {
            this.mode = 'index'
        },
        newLecturer() {
            this.mode = 'create';
            this.NewLecturer.addData()
        }
    },
})
</script>
<template>
    <NewLecturerView ref="NewLecturer" @on-close="onNewLecturerClosed"></NewLecturerView>
    <div class="flex flex-col gap-3" v-if="mode == 'index'">
        <div class="flex gap-3 w-full items-center pt-18">
            <div class="relative grow">
                <div class="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                    <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 16">
                        <path
                            d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
                        <path
                            d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
                    </svg>
                </div>
                <input type="text" id="input-group-1"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-4  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Nama Program Studi">
            </div>
            <button type="button"
                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Search</button>

        </div>
        <div class="bg-white dark:bg-slate-900 dark:text-white rounded-lg ">
            <div class="flex justify-between items-center p-3">
                <h1 class="text-lg font-bold">Lecturer Data</h1>
                <!-- <button
                class="inline-block rounded bg-success px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#14a44d] transition duration-150 ease-in-out hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(20,164,77,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)]"
                @click="onNewStudentClick">New Student</button> -->
                <Button type="primary" @click="newLecturer">New Lecturer</Button>
                <!-- <Button type="">AAA</Button> -->
            </div>
            <Table v-if="data.records != null && data.paging != null" :data="data" @reload="reload" :columns="columns"
                :rowActions="[
                    {
                        name: 'Edit',
                        exec: (id) => {
                            console.log('edit clicked')
                        }
                    },
                    {
                        name: 'Delete',
                        exec: (id) => {
                            console.log('delete clicked')
                        }
                    }
                ]" />
        </div>
    </div>
</template>