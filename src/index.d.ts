export {}
declare module 'vue-router' {
    interface RouteMeta {
        index:number
        palette:'ios'|'original'
        prefix:'ios'|'original'
        saveAsClass?:string
        backgroundClasses?:string[]
    }
}