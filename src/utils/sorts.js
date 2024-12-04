// sort columms/cards
export const mapOrder = (origialnArray, orderArray, key) => {
  if ( !origialnArray || !orderArray || !key) return []
  return [... origialnArray].sort (( first, second ) => orderArray.indexOf(first[key]) - orderArray.indexOf(second[key] ))
  // const clonedArray= [... origialnArray]
  // const result = clonedArray.sort (( first, second ) => orderArray.indexOf(first[key]) - orderArray.indexOf(second[key] ))
  // return result
}