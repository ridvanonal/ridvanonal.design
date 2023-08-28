export interface IAverageColor{
    r:number,
    g:number,
    b:number,
    rgb:string
}

const toRGB = (rgb:{r:number,g:number,b:number}) => `rgb(${rgb.r},${rgb.g},${rgb.b})`

export const useAverageColor = (image:HTMLImageElement|null|undefined,callback:(rgb:IAverageColor)=>void) => {
    const blockSize:number = 5
    const defaultRGB = {r:0,g:0,b:0}
    const canvas:HTMLCanvasElement = document.createElement('canvas')
    const context:CanvasRenderingContext2D|null = canvas.getContext && canvas.getContext('2d',{willReadFrequently:true})
    const rgb = {r:0,g:0,b:0}
    let data:ImageData, width:number, height:number, length:number
    if(image){
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
                callback({...defaultRGB,rgb:toRGB(defaultRGB)})
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

            callback({...rgb,rgb:toRGB(rgb)})
        }
        image.onerror = () => callback({...defaultRGB,rgb:toRGB(defaultRGB)})
    }else callback({...defaultRGB,rgb:toRGB(defaultRGB)})
}