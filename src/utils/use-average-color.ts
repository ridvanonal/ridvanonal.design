import Color from "color";
import { onColor } from "./use-color";

export interface IAverageColor{
    color:Color
    accessible:Color
}

export const useAverageColor = (
        image:HTMLImageElement|undefined,
        callback:(rgb:IAverageColor)=>void,
        defaultRGB:Color=Color.rgb(0,0,0),
        defaultOnRGB:Color = Color.rgb(255,255,255)
    ) => {
    const blockSize:number = 5
    const canvas:HTMLCanvasElement = document.createElement('canvas')
    const context:CanvasRenderingContext2D|null = canvas.getContext && canvas.getContext('2d',{willReadFrequently:true})
    const rgb = {r:0,g:0,b:0}
    let data:ImageData, width:number, height:number, length:number
    if(image){
        image.crossOrigin = 'Anonymous'
        callback({color:defaultRGB,accessible:defaultOnRGB})
        image.onload = () => {
            let count = 0
            let i = -4

            if(!context) return defaultRGB

            height = canvas.height = image.naturalHeight || image.offsetHeight || image.height
            width = canvas.width = image.naturalWidth || image.offsetWidth || image.width
            context.clearRect(0, 0, width, height)

            context.drawImage(image,0,0)

            try{
                data = context.getImageData(0,0,width,height)
            } catch (e){
                callback({color:defaultRGB,accessible:defaultOnRGB})
            }

            length = data.data.length

            while((i+= blockSize * 4) < length){
                ++count;
                rgb.r += data.data[i]
                rgb.g += data.data[i+1]
                rgb.b += data.data[i+2]
            }

            rgb.r = ~~(rgb.r/count)
            rgb.g = ~~(rgb.g/count)
            rgb.b = ~~(rgb.b/count)

            const color = Color.rgb(rgb.r,rgb.g,rgb.b)
            callback({color:color,accessible:onColor(color)})
        }
        image.onerror = () => callback({color:defaultRGB,accessible:defaultOnRGB})
    }else callback({color:defaultRGB,accessible:defaultOnRGB})
}