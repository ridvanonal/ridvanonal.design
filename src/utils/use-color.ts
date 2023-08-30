import Color from 'color'

const getRatio = (level:'AAA'|'AA' = 'AA',size:number = 16,bold:boolean = false) => {
    let ratio:number = 4.5
    if(level == 'AAA') ratio = 7
    if(size < 24){
        if(size >= 19 && bold){
            if(level === 'AAA') ratio = 4.5
            else ratio = 3
        }
    }else{
        ratio = 3
        if(level == 'AAA') ratio = 4.5
    }
    return ratio
}

export const onColor = (bg:Color,fg?:Color,level:'AAA'|'AA' = 'AA',size:number = 16, bold:boolean = false):Color => {
    fg = fg ? fg : bg
    const ratio = getRatio(level,size,bold)
    const originalContrast = fg.contrast(bg)
    if(originalContrast >= ratio){
        return fg
    }else {
        let step = 5
        if(fg.isLight() && bg.isLight()){
            step = -step
        } else if (fg.isDark() && bg.isLight()){
            step = -step
        }
        let turn = 0 
        while (fg.contrast(bg) < ratio && turn < 200){
            const saturationIncreasable = fg.saturationl() >= 10 && fg.saturationl() < 100
            const saturationDecreasable = fg.saturationl() > 11 && fg.saturationl() <= 100
            const ligthnessIncreasable = fg.lightness() >= 0 && fg.saturationl() < 100
            const ligthnessDecreasable = fg.lightness() > 0 && fg.saturationl() <= 100
            if(step > 0 && !saturationIncreasable && !ligthnessIncreasable) break;
            if(step < 0 && !saturationDecreasable && !ligthnessDecreasable) break;
            fg = fg.lightness(fg.lightness()+step).saturationl(fg.saturationl() + step)
            turn ++
        }
        if(turn == 200) alert('over turn')
        return fg
    }

}