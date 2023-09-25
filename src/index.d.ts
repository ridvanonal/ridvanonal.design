export {}
declare module 'vue-router' {
    interface RouteMeta {
        index:number
        palette:'ios'|'original'
        prefix:'ios-styled'|'original'|'material-styled'|'github-styled'
        saveAsClass?:string
        backgroundClass?:string[]
    }
}