import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'

// Components
import Sidebar from './components/Sidebar.vue'
import Header from './components/Header.vue'
import Button from './components/Button.vue';
import Alert from './components/Alert.vue';
import Table from './components/Table.vue'
import Input from './components/Input.vue'


import Dropdown from '@/components/Dropdown.vue'
import DropdownItem from '@/components/DropdownItem.vue'

// Layout
import DashboardLayout from './components/layouts/DashboardLayout.vue';
import EmptyLayout from './components/layouts/EmptyLayout.vue';

// Router
import router from './router'

// Modules
import VueAwesomePaginate from "vue-awesome-paginate";
import "vue-awesome-paginate/dist/style.css";
import CKEditor from '@ckeditor/ckeditor5-vue'
import {createPinia, setActivePinia} from "pinia";
import VueCookies from 'vue3-cookies'

// Axios
import './api/axios'

// App
const pinia = createPinia()
const app = createApp(App);

// Layouts
app.component('default-layout', DashboardLayout);
app.component('empty-layout', EmptyLayout);

// Components
app.component('Sidebar', Sidebar)
app.component('Header', Header)
app.component('Table', Table)
app.component('Button', Button)
app.component('Alert', Alert)
app.component('Input', Input)
// app.component(IconDropdownButton)
app.component('Dropdown', Dropdown)
app.component('DropdownItem', DropdownItem)

// Modules
app.use(pinia)
app.use(router)
app.use(CKEditor)
app.use(VueCookies)
app.use(VueAwesomePaginate)
setActivePinia(pinia)

app.mount('#app')
