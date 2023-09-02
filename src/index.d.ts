export {}
declare module 'vue-router' {
    interface RouteMeta {
        index:number
        palette:'ios'|'original'
        prefix:'ios-styled'|'original'
        saveAsClass?:string
        backgroundClasses?:string[]
    }
}