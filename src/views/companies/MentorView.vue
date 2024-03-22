<script>
import { PencilIcon, TrashIcon } from '@heroicons/vue/24/solid';
import axios from 'axios';
import { defineComponent } from 'vue';
import { useCookies } from 'vue3-cookies';

import { ref } from 'vue';
import NewMentor from './NewMentorView.vue';

export default defineComponent({
    components: { NewMentor },
    data() {
        return {
            data: {
                records: null,
                paging: null
            },
            params: {
                search: null,
                page: 1,
                order_column: 'mentor_name',
                order_value: 'desc',
                per_page: 10,
                company_id: null
            },
            columns: [
                {
                    name: 'Mentor Name',
                    path: 'mentor_name'
                },
                {
                    name: 'Mentor Email',
                    path: 'email'
                },
            ],
            show: false,
            record: null,
            mode:'view',
        };
    },
    setup() {
        const MentorForm = ref(null)

        return {
            MentorForm
        }
    },
    methods: {
        showData(record) {
            this.record = record;
            this.params.company_id = record.id
            this.show = true;
            this.fetchRecords()
        },
        fetchRecords() {
            const params = this.params;
            axios.get(`/mentor`, {
                params: this.params,
            })
                .then((response) => { return response.data })
                .then((data) => {
                    this.data.records = data.data.mentors
                    this.data.paging = data.data.paging
                })
        },onMentorFormClose() {
            this.mode = 'view'
            this.fetchRecords()

        },
        onNewMentorClick() {
            this.mode = 'create'
            this.MentorForm.addData();
        },
        reload() {
            this.fetchRecords()
        }
    },
    // components: { TrashIcon, PencilIcon, NewMentorView }
})
</script>

<template>
    <!-- <div class="flex gap-3 w-full items-center pt-18">
        <div class="relative grow">
            <div class="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
            
            </div>
            
        </div>
        
    </div> -->
    <NewMentor ref="MentorForm" @on-close="onMentorFormClose"></NewMentor>

    <div class="flex flex-col gap-3" v-if="show && mode == 'view'">
        <div class="p-5 bg-white dark:bg-gray-900 dark:text-white rounded-lg w-96">
            <div class="font-bold">
                Nama Perusahaan / Instansi
            </div>
            <div class="text-red-500">
                {{ record.company_name }}
            </div>

        </div>
        <div class="bg-white dark:bg-slate-900 dark:text-white rounded-lg ">
            <div class="flex justify-between items-center p-3">
                <h1 class="text-lg font-bold">Mentor Data</h1>
                <!-- <button
                class="inline-block rounded bg-success px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#14a44d] transition duration-150 ease-in-out hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(20,164,77,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)]"
                @click="onNewStudentClick">New Student</button> -->
                <Button type="primary" @click="onNewMentorClick">New Mentor</Button>
                <!-- <Button type="">AAA</Button> -->
            </div>
            <Table v-if="data.records != null && data.paging != null" :data="data" @reload="reload" :columns="columns"
                :rowActions="[
                    {
                        name: 'View',
                        exec: (data) => {
                            console.log('view clicked')
                        }
                    },
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