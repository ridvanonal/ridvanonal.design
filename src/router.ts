import { createRouter, createWebHistory } from 'vue-router'

export const router = createRouter({
    history:createWebHistory(),
    routes:[
        {
            name:'Home',
            path:'/',
            component:()=>import('./views/HomeView.vue'),
            meta:{
                index:0,
                palette:'ios'
            }
        },
        {
            name:'iOS Styled Storage Box',
            path:'/storage-box',
            component:()=>import('./views/ios-styled/StorageBoxView.vue'),
            meta:{
                saveAsClass:'storage-box',
                index:1,
                palette:'ios'
            }
        },
        {
            name:'iOS Styled Keyboard',
            path:'/ios-styled/keyboard',
            component:()=>import('./views/ios-styled/KeyboardView.vue'),
            meta:{
                saveAsClass:'keyboard',
                index:2,
                palette:'ios'
            }
        },
        {
            name:'iOS Styled Lock Screen Music Player',
            path:'/ios-styled/lock-screen-music-player',
            component:()=>import('./views/ios-styled/LockScreenMusicPlayerView.vue'),
            meta:{
                saveAsClass:'lock-screen-music-player',
                backgroundClass:['ios-17'],
                index:2,
                palette:'ios'
            }
        },
        {
            name:'Test',
            path:'/test',
            component:()=>import('./views/TestView.vue'),
            meta:{
                saveAsClass:'keyboard',
                index:3,
                palette:'ios'
            }
        },
    ]
})

router.beforeEach((to)=>{
    document.documentElement.dataset.palette = to.meta.palette
    document.title = to.name?.toString() || "iOS Styled"
})