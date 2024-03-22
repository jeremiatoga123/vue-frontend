<script>
import axios from 'axios'
import { defineComponent, ref } from 'vue'
import { useCookies } from 'vue3-cookies'

import NewStudent from './NewStudentView.vue'

export default defineComponent({
    components: { NewStudent },
    data() {
        return {
            data: {
                records: null,
                paging: null
            },
            params: {
                search: null,
                page: 1,
                role: 'Student',
                order_column: null,
                order_value: null,
                per_page: 10,
            },
            columns: [
                {
                    name: 'NIM',
                    path: 'personable.student_nim',
                    orderable: true
                },
                {
                    name: 'Username',
                    path: 'username'
                },
                {
                    name: 'Name',
                    path: 'personable.student_name'
                },
                {
                    name: 'Major',
                    path: 'personable.major'
                },
                {
                    name: 'Email',
                    path: 'personable.email'
                },
            ],
            mode: 'view'
            // url: 'https://dummyjson.com/users',
        }
    },
    setup() {
        const StudentForm = ref(null)

        return {
            StudentForm
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
        reload({ currentPage, search, order_by, order_dir, per_page }) {
            this.params.search = search;
            this.params.page = currentPage;
            this.params.order_column = order_by
            this.params.order_value = order_dir
            this.params.per_page = per_page
            this.fetchRecords()
        },
        onStudentFormClose() {
            this.mode = 'view'
            this.fetchRecords()

        },
        onNewStudentClick() {
            this.mode = 'create'
            this.StudentForm.addData();
        },
        onEditStudentClick(user) {
            this.mode = 'edit'
            this.StudentForm.editData(user)
        }
    },
})
</script>
<template>
    <NewStudent ref="StudentForm" @on-close="onStudentFormClose"></NewStudent>
    <div class="bg-white dark:bg-slate-900 dark:text-white rounded-lg " v-if="mode == 'view'">
        <div class="flex justify-between items-center p-3">
            <h1 class="text-lg font-bold">Student View</h1>
            <!-- <button
                class="inline-block rounded bg-success px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#14a44d] transition duration-150 ease-in-out hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(20,164,77,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)]"
                @click="onNewStudentClick">New Student</button> -->
            <Button type="primary" @click="onNewStudentClick">New Student</Button>
            <!-- <Button type="">AAA</Button> -->
        </div>
        <Table recordKey="id" v-if="data.records != null && data.paging != null" :data="data" @reload="reload"
            :columns="columns" :rowActions="[
                {
                    name: 'Edit',
                    exec: onEditStudentClick
                },
                {
                    name: 'Delete',
                    exec: (id) => {
                        console.log('delete clicked')
                    }
                }
            ]" />
    </div>
</template>