<script setup>
</script>

<script>
import Editor from '@tinymce/tinymce-vue';
import { CalendarIcon } from '@heroicons/vue/20/solid';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { defineComponent } from 'vue'
export default defineComponent({
    components: {
        CalendarIcon
    },
    setup() {
        return {

        }
    },
    name: 'app',
    data() {
        return {
            editor: ClassicEditor,
            editorData: '<p>Content of the editor.</p>',
            editorConfig: {
                // The configuration of the editor.
            }
        };
    }
})
</script>

<template>
    <!-- <div class="flex gap-3 w-full items-center pt-18">
        <div class="relative grow">
            <div class="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor" viewBox="0 0 20 16">
                    <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
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

    </div> -->
    <h1 class="text-lg font-bold text-black">Create Report</h1>
    <form class="flex flex-col gap-3 h-full bg-white p-4 rounded-xl drop-shadow dark:bg-gray-900">
        <label for="" class="font-bold">Date</label>
        <div class="relative w-full items-center">
            <input type="text" id="voice-search"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search Mockups, Logos, Design Templates..." required>
            <button type="button" class="absolute inset-y-0 right-0 pr-3">
                <CalendarIcon class="w-5 h-5" />
            </button>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
            <div class="">
                <label for="" class="font-bold">Start Time</label>
                <div class="relative">
                    <input type="text" id="voice-search"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Search Mockups, Logos, Design Templates..." required>
                    <button type="button" class="absolute inset-y-0 right-0 flex items-center pr-3">
                        <CalendarIcon class="w-5 h-5" />
                    </button>
                </div>
            </div>
            <div class="">
                <label for="" class="font-bold">End Time</label>
                <div class="relative">
                    <input type="text" id="voice-search"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Search Mockups, Logos, Design Templates..." required>
                    <button type="button" class="absolute inset-y-0 right-0 flex items-center pr-3">
                        <CalendarIcon class="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
        <div class="mt-3">
            <label for="" class="font-bold">Activity</label>
            <ckeditor :editor="editor" v-model="editorData" :config="editorConfig" />
        </div>
        <div class="mt-3">
            <label for="" class="font-bold">Work Steps</label>
            <ckeditor :editor="editor" v-model="editorData" :config="editorConfig" />
        </div>
        <div class="mt-3">
            <label for="" class="font-bold">Result</label>
            <ckeditor :editor="editor" v-model="editorData" :config="editorConfig" />
        </div>
        <div class="flex mt-auto justify-end ">
            <button type="submit"
                class="text-white bg-blue-700 w-full sm:w-auto text-center hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                New Report</button>
        </div>
    </form>
</template>