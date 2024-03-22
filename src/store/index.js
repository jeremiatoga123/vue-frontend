import {defineStore} from "pinia";
import { useCookies } from "vue3-cookies";


export const useIndexStore = defineStore('index', {
    state: () => ({
        show: true,
        darkMode: false,
        user: {
            id: null,
            username: null,
            personable_type: null,
            personable_id: null,
            role: null,
            created_at: null,
            updated_at: null,
            personable: {
                id: null,
                email: null,
                created_at: null,
                updated_at: null
            }
        }
    }),
    getters: {
        username: (state) => {
            return (state.user.personable?.student_name ?? state.user.personable?.lecturer_name) ?? state.user.personable?.mentor_name
        }
    },
    actions: {
        setDarkMode() {
            this.darkMode = !this.darkMode
            localStorage.setItem('dark-mode', this.darkMode)
            if (this.darkMode) {
                document.documentElement.classList.add('dark')
            } else {
                document.documentElement.classList.remove('dark')
            }
            console.log(this.user)
        },
        loadUser(user) {
            this.user = user;
        },
        unloadUser() {
            const {cookies} = useCookies()
            this.user = null;
            cookies.remove('token')
            location.href = '/login'
        },
        toggleSideBar (){
            this.show = !this.show
        }
    }
})