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
            show: false,
            title: "",
            formData: {
                name: null,
                email: null,
                username: null,
                password: "",
                password_confirmation: "",
                personable_type: "App\\Models\\Mentor",
                role: "mentor"
            }
        };
    },
    methods: {
        addData() {
            this.title = "New Data"
            this.formData.username = null
            this.formData.password = null
            this.formData.password_confirmation = null

            this.show = true
        },
        editData(data) {
            this.formData.username = data.username
            this.formData.password = data.password
            this.formData.password_confirmation = data.password_confirmation
            this.formData.personable_type = data.personable_type
            this.formData.role = data.role

            this.title = "Edit Data"
            this.show = true
        },
        close() {
            this.show = false
            this.$emit("onClose")
        },

        onSubmit() {
            const { cookies } = useCookies()
            const params = this.formData
            console.log(params)
            axios.post(`/register`, params)
                .then((response) => response.data)
                .then((data) => {
                    this.close()
                    console.log(data)
                })
        },

    }
}
</script>

<template>
    <div v-if="show" class=" dark:text-white h-full bg-white p-4 rounded-lg drop-shadow dark:bg-gray-900">
        <!-- <Alert type="danger"> Delete</Alert> -->
        <div class="flex justify-between items-center pb-3">
            <h1 class="text-lg font-bold">{{ title }}</h1>

        </div>
        <div class="flex flex-col gap-3 ">
            <Input type="text" placeholder="Name" label="Name" title="Name" v-model:model="formData.name"></Input>
            <Input type="text" placeholder="Email" label="Email" title="Email" v-model:model="formData.email"></Input>
            <Input type="text" placeholder="Username" label="Username" title="Username"
                v-model:model="formData.username"></Input>

            <Input type="password" placeholder="Password" label="Password" title="Password"
                v-model:model="formData.password"></Input>
            <Input type="password" placeholder="Password Confirmation" label="Password Confirmation"
                title="Password Confirmation" v-model:model="formData.password_confirmation"></Input>

            <div class="flex mt-auto justify-end ">
                <Button type="danger" @click="close">
                    batal</Button>
                <Button type="secondary" @click="onSubmit">
                    Tambah</Button>
            </div>
        </div>
    </div>
</template>