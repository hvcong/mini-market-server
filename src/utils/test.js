const data = require('./dvhc.json')
const city = data.data
const x = city.values()
const onlyCites = city.map((item)=>{
    return {
        id : item.level1_id,
        name : item.name,
        type : item.type,
    }
})
// console.log(city.entries())
for( const e of x){
    console.log(e)
}
// console.log("city",city)
// console.log(onlyCites)

