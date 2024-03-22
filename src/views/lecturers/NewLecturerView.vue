<script>
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export default {
    name: 'app',
    data() {
        return {
            editor: ClassicEditor,
            editorData: '<p>Content of the editor.</p>',
            editorConfig: {
                // The configuration of the editor.
            },
            formData: {
                name: null,
        email: null,
        identity: null,
        username: null,
        password: "",
        password_confirmation: "",
        personable_type: "App\\Models\\Lecturer",
        role: "lecturer"
            },
            show: false
        };
    },
    methods: {
        addData() {
            this.show = true;
        },
        editData(data) {
            this.show = true;
        },
        close() {
            this.show = false;
        }
    }
}
</script>

<template>
    <div class="" v-if="show">
        <h1 class="text-lg font-bold text-black">Create Lecturer</h1>
        <form class="flex flex-col gap-3 h-full bg-white p-4 rounded-xl drop-shadow">
            <Input type="text" placeholder="Name" label="Name" title="Name" v-model:model="formData.name"></Input>
      <Input type="text" placeholder="Email" label="Email" title="Email" v-model:model="formData.email"></Input>
      <Input type="text" placeholder="NIP" label="NIP" title="NIP" v-model:model="formData.identity"></Input>
      
      <Input type="text" placeholder="Username" label="Username" title="Username" v-model:model="formData.username"></Input>
      
      <Input type="password" placeholder="Password" label="Password" title="Password" v-model:model="formData.password"></Input>
      <Input type="password" placeholder="Password Confirmation" label="Password Confirmation" title="Password Confirmation" v-model:model="formData.password_confirmation"></Input>
      
            <div class="flex mt-auto justify-end ">
                <button type="primary"
                    class="text-white bg-blue-700 w-full sm:w-auto text-center hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                    New Lecturer</button>
            </div>
        </form>
    </div>
</template>