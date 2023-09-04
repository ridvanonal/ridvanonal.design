export const useMapRange = (desiredValue:number,existingRangeMinValue:number,existingRangeMaxValue:number,desiredRangeMinValue:number,desiredRangeMaxValue:number) => {
    const ranged = (desiredRangeMinValue+(desiredRangeMaxValue-desiredRangeMinValue)*(desiredValue-existingRangeMinValue)/(existingRangeMaxValue-existingRangeMinValue))
    if(ranged < desiredRangeMinValue) return desiredRangeMinValue
    else if(ranged > desiredRangeMaxValue) return desiredRangeMaxValue
    else return ranged
}