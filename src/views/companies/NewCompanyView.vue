<script>
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import axios from 'axios';
import { useCookies } from 'vue3-cookies';

export default {
    emits: ['onClose'],
    name: 'app',
    data() {
        return {
            editor: ClassicEditor,
            editorData: '<p>Content of the editor.</p>',
            editorConfig: {
                // The configuration of the editor.
            },
            formData: {
                company_name: null,
                company_address: null,
            },
            show: false,
        };
    },
    methods: {
        addData() {
            this.show = true;
        },
        onSubmit() {
            const { cookies } = useCookies()
            const params = this.formData

            axios.post(`company`, params)
                .then((response) => response.data)
                .then((data) => {
                    console.log(data)
                }).catch((reason) => {

                })
        },
        close() {
            this.clearFormData()

            this.show = false
            this.$emit('onClose')
        },
        clearFormData() {
            for (let key in this.formData) {
                this.formData[key] = null
            }
        }
    }
}
</script>

<template>
    <div class="" v-if="show">
        <h1 class="text-lg font-bold text-black">Create Company</h1>
        <div class="flex flex-col gap-3 h-full bg-white p-4 rounded-xl drop-shadow dark:bg-gray-900">
            <Input type="text" placeholder="Company Name" label="Company Name" title="Company Name" v-model:model="formData.company_name"></Input>
      <Input type="text" placeholder="Company Address" label="Company Address" title="Company Address" v-model:model="formData.company_address"></Input>
      
            <div class="flex mt-auto justify-end gap-3 ">
                <Button type="danger" @click="close">Batal</Button>
                <Button type="secondary" @click="onSubmit">
                    Submit</Button>
            </div>
        </div>
    </div>
</template>