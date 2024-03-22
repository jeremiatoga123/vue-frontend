<script>
import Dropdown from './Dropdown.vue';
import DropdownItem from './DropdownItem.vue';
import { ChevronDoubleLeftIcon, ChevronLeftIcon, ChevronRightIcon, ChevronDoubleRightIcon, ChevronDownIcon, EllipsisVerticalIcon, AdjustmentsVerticalIcon } from '@heroicons/vue/24/solid';
import dotaccess from 'dot-access'
import { defineComponent, ref } from 'vue';

export default defineComponent({
    components: { Dropdown, DropdownItem, ChevronDoubleLeftIcon, ChevronLeftIcon, ChevronRightIcon, ChevronDoubleRightIcon, ChevronDownIcon, EllipsisVerticalIcon, AdjustmentsVerticalIcon },
    emits: ['reload'],
    props: {
        data: {
            records: Array,
            paging: Object
        },
        columns: Array,
        rowActions: Array,
        bulkActions: Array,
        filters: {
            type: Array,
            default: []
        },
        recordKey: String,
        onRowClicked: Function,
    },
    data() {
        return {
            q: null,
            bulkActionActive: false,
            currentPage: 1,
            perPage: 10,
            showFilter: false
        }
    },
    setup(props, context) {
        if (props.columns != null && props.columns.length < 1 && props.data.records.length > 0) {
            for (var key in props.data.records[0]) {
                props.columns.push(key)
            }
        } else {
            for (var i in props.columns) {
                props.columns[i].class = 'px-6 py-3'
                if (props.columns[i].orderable) {
                    props.columns[i].class += ' orderable'
                }
            }
        }

        console.log(props.columns)

        const perPageFilter = ref(props.perPageFilter ?? [10, 25, 50, 100])
        return {
            perPageFilter,
            ...props,
            dotaccess,
        }
    },
    watch: {
        q() {
            this.currentPage = 1
            this.reload()
        },
        currentPage() {
            this.reload()
        },
    },

    methods: {
        reload() {
            // this.pagesToShow = this.generatePagination(currentPage) 
            let currentPage = this.currentPage
            let search = this.q
            let per_page = this.perPage
            this.$emit('reload', { search, currentPage, per_page });
        },
        perPageChange(perPage) {
            this.perPage = perPage;
            this.reload()
        },
        toggleFilter() {
            this.showFilter = !this.showFilter
        }
    }
})
</script>

<template>
    <div class="overflow-y-auto sm:scrollbar-thin scrollbar-thumb-gray-600 
            scrollbar-thumb-rounded-lg shadow-md sm:rounded-lg bg-white dark:bg-gray-900 ">
        <div class="h-32" v-if="showFilter"></div>
        <div class="flex flex-col-reverse gap-3 sm:flex-row items-center justify-between pb-4 pt-4 px-4 dark:text-white">
            <div class="flex items-center gap-2">
                <span>
                    Showing
                </span>
                <Dropdown v-model:buttonText="perPage"
                    buttonClass="dark:text-white bg-white border hover:bg-gray-200 dark:border-slate-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-1.5 text-center inline-flex items-center dark:bg-slate-600 dark:hover:bg-slate-700 dark:focus:ring-slate-800">
                    <template #icon>
                        <ChevronDownIcon class="w-3 h-5 ms-2" />
                    </template>
                    <template #items>
                        <DropdownItem @click="() => { perPageChange(perPage) }" v-for="(perPage, index) in perPageFilter"
                            :key="index">
                            {{ perPage }}
                        </DropdownItem>
                    </template>
                </Dropdown>
                <span>
                    per page
                </span>
                <Button type="secondary" v-if="filters.length > 0" @click="toggleFilter" title="Filter" class="border">
                    <AdjustmentsVerticalIcon class="w-5" />
                </Button>
            </div>
            <div class="">
                <label for="table-search" class="sr-only">Search</label>
                <div class="relative">
                    <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                        </svg>
                    </div>
                    <input v-model.lazy="$data.q" type="text" id="table-search-users"
                        class="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Search for users">
                </div>
            </div>
        </div>
        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400 overflow-auto max-h-full">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" class="p-4" v-if="bulkActions">
                        <div class="flex items-center">
                            <input id="checkbox-all-search" type="checkbox"
                                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                            <label for="checkbox-all-search" class="sr-only">checkbox</label>
                        </div>
                    </th>
                    <th scope="col" :class="column['class']" v-for="(column, index) in columns" :key="index">
                        {{ column['name'] }}
                    </th>
                    <th v-if="rowActions.length > 0" scope="col" class="px-6 py-3">
                        Action
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(record, index) in data.records" :key="index"
                    class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <td class="w-4 p-4" v-if="bulkActions">
                        <div class="flex items-center">
                            <input id="checkbox-table-search-1" type="checkbox"
                                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                            <label for="checkbox-table-search-1" class="sr-only">checkbox</label>
                        </div>
                    </td>
                    <td v-for="(column, index) in columns" :key="index" class="px-6 py-4">
                        {{ dotaccess.get(record, column.path) }}
                    </td>
                    <td class="px-6 py-4" v-if="rowActions.length > 0">
                        <Dropdown position="left"
                            buttonClass="dark:text-white bg-white  hover:bg-gray-200 dark:border-slate-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm  py-1.5 text-center inline-flex items-center dark:bg-slate-600 dark:hover:bg-slate-700 dark:focus:ring-slate-800">
                            <EllipsisVerticalIcon class="w-6 h-6" />
                            <template #items>
                                <DropdownItem @click="() => { rowAction.exec(record) }"
                                    v-for="(rowAction, index) in rowActions" :key="index">
                                    {{ rowAction.name }}
                                </DropdownItem>
                            </template>
                        </Dropdown>
                    </td>
                </tr>
            </tbody>
        </table>
        <div class="flex items-center justify-center md:justify-between gap-3 p-4 flex-wrap" aria-label="Table navigation">
            <span class="text-sm font-normal text-gray-500 dark:text-gray-400">Showing <span
                    class="font-semibold text-gray-900 dark:text-white">{{ data.paging?.from }} -
                    {{ data.paging?.to }}</span> of <span
                    class="font-semibold text-gray-900 dark:text-white">{{ data.paging?.total }}</span></span>
            <vue-awesome-paginate :total-items="data.paging.total" type="button" :showEndingButtons="true"
                :items-per-page="data.paging.per_page" :max-pages-shown="5" v-model="currentPage"
                :showBreakpointButtons="false" :on-click="(page) => { currentPage = page }">
                <template #first-page-button>
                    <ChevronDoubleLeftIcon class="w-5" />
                </template>
                <template #prev-button>
                    <ChevronLeftIcon class="w-5" />
                </template>
                <template #next-button>
                    <ChevronRightIcon class="w-5" />
                </template>
                <template #last-page-button>
                    <ChevronDoubleRightIcon class="w-5" />
                </template>
            </vue-awesome-paginate>
        </div>
    </div>
</template>

<style>
.paginate-buttons {
    @apply flex items-center justify-center px-3 h-8  bg-white
}

.paginate-buttons.First,
.paginate-buttons.last-page-button {
    @apply items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white
}

.paginate-buttons.First {
    @apply rounded-l-lg
}

.paginate-buttons.last-page-button {
    @apply rounded-r-lg
}

.paginate-buttons.back-button,
.paginate-buttons.next-button {
    @apply items-center justify-center px-3 h-8 leading-tight text-gray-500 border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white
}

.paginate-buttons.number-buttons {
    @apply leading-tight text-gray-500 border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white
}

.paginate-buttons.number-buttons.active-page {
    @apply text-blue-600 border border-gray-300 bg-blue-300 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white !important
}

table thead th.orderable {
    @apply relative cursor-pointer
}

table thead th.orderable::before,
table thead th.orderable::after
{
    @apply absolute block opacity-[.125] right-[10px] leading-[9px] text-[.8em]
}
table thead th.orderable::before {
    @apply bottom-1/2 content-['▲']
}
table thead th.orderable::after {
    @apply top-1/2 content-['▼']
}
table thead th.orderable.order_desc::after,
table thead th.orderable.order_asc::before {
    @apply opacity-60
}
</style>