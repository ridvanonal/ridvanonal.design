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
                palette:'ios',
                prefix:'ios-styled'
            }
        },
        {
            name:'iOS Styled Storage Box',
            path:'/storage-box',
            component:()=>import('./views/ios-styled/StorageBoxView.vue'),
            meta:{
                saveAsClass:'storage-box',
                index:1,
                palette:'ios',
                prefix:'ios-styled'
            }
        },
        {
            name:'iOS Styled Keyboard',
            path:'/ios-styled/keyboard',
            component:()=>import('./views/ios-styled/KeyboardView.vue'),
            meta:{
                saveAsClass:'keyboard',
                index:2,
                palette:'ios',
                prefix:'ios-styled'
            }
        },
        {
            name:'iOS Styled Lock Screen Music Player',
            path:'/ios-styled/lock-screen-music-player',
            component:()=>import('./views/ios-styled/LockScreenMusicPlayerView.vue'),
            meta:{
                saveAsClass:'lock-screen-music-player',
                backgroundClass:['ios-17','ratio-9-16'],
                index:3,
                palette:'ios',
                prefix:'ios-styled'
            }
        },
        {
            name:'Cover Colored Music Player',
            path:'/original/cover-colored-music-player',
            component:()=>import('./views/original/CoverColoredMusicPlayerView.vue'),
            meta:{
                saveAsClass:'cover-colored-music-player',
                index:4,
                palette:'ios',
                prefix:'original'
            }
        },
        {
            name:'iOS Styled Battery Indicator',
            path:'/ios-styled/battery-indicator',
            component:()=>import('./views/ios-styled/BatteryIndicatorView.vue'),
            meta:{
                saveAsClass:'battery-indicator',
                index:5,
                backgroundClass:['ios-17'],
                palette:'ios',
                prefix:'ios-styled'
            }
        },
        {
            name:'Test',
            path:'/test',
            component:()=>import('./views/test/TestView.vue'),
            meta:{
                saveAsClass:'test',
                index:6,
                palette:'ios',
                prefix:'ios-styled'
            }
        },
    ]
})

router.beforeEach((to)=>{
    document.documentElement.dataset.palette = to.meta.palette
    document.title = to.name?.toString() || "iOS Styled"
})