export {}
declare module 'vue-router' {
    interface RouteMeta {
        index:number
        palette:'ios'|'original'
        saveAsClass?:string
        backgroundClasses?:string[]
    }
}