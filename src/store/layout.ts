import { defineStore } from "pinia";
import { ref } from "vue";

export const useLayoutStore = defineStore('layout',()=>{
    const theme = ref<'dark'|'light'>('light')
    const toggleTheme = () => {
        theme.value == 'dark' ? theme.value = 'light' : theme.value = 'dark'
        setTheme(theme.value)
    }
    const setTheme = (theme:'dark'|'light') => document.documentElement.dataset.theme = theme

    const backgroundClass = ref<string|null>(null)
    const setBackgroundClass = (cls:string|null) =>  backgroundClass.value = cls

    const fullscreen = ref<boolean>(false)
    const setFullscreen = (value:boolean) => fullscreen.value = value

    return {
        theme,
        toggleTheme,
        setTheme,
        fullscreen,
        setFullscreen,
        backgroundClass,
        setBackgroundClass
    }
})