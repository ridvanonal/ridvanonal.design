export const useDeviceOritantationEvent = () => {
    return new Promise<boolean>((resolve,reject)=>{
        if(typeof (DeviceOrientationEvent as any).requestPermission === 'function'){
            (DeviceOrientationEvent as any).requestPermission()
            .then((res:any)=> { res === 'granted' ? resolve(true) : reject()})
            .catch(()=>reject())
        }else reject()
    })
}