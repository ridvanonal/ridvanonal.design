import { defineStore } from "pinia";
import { ref } from "vue";

export const useLayoutStore = defineStore('layout',()=>{
    const theme = ref<'dark'|'light'>('light')
    const toggleTheme = () => {
        theme.value == 'dark' ? theme.value = 'light' : theme.value = 'dark'
        setTheme()
    }
    const setTheme = () => document.documentElement.dataset.theme = theme.value

    const fullscreen = ref<boolean>(false)
    const setFullscreen = (value:boolean) => fullscreen.value = value

    return {
        theme,
        toggleTheme,
        setTheme,
        fullscreen,
        setFullscreen
    }
})