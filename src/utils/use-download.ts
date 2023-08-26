import html2canvas from 'html2canvas'
import { useLayoutStore } from '../store/layout'
import { RouteLocationNormalizedLoaded } from 'vue-router'

export const useRouteDownload = (route:RouteLocationNormalizedLoaded,scale:number = 20) => {
    const saveAsClass = route.meta.saveAsClass 
    const selector = saveAsClass ? `.${saveAsClass}` : null
    if(selector){
        document.querySelectorAll(selector).forEach(el=>{
            html2canvas(el as HTMLElement,{scale,backgroundColor:null}).then(canvas=>{
                let anchor = document.createElement("a")
                anchor.href = canvas.toDataURL()
                anchor.download = ["ios-styled",saveAsClass,useLayoutStore().theme].join('-')
                anchor.click()
            })
        })
    }
}

export const useDownload = (selector:string,scale:number = 20) => {
    document.querySelectorAll(selector).forEach(el=>{
        html2canvas(el as HTMLElement,{scale,backgroundColor:null}).then(canvas=>{
            let anchor = document.createElement("a")
			anchor.href = canvas.toDataURL()
			anchor.download = "ios-styled-storage-box-" + useLayoutStore().theme
			anchor.click()
        })
    })
}