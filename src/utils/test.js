const data = require('./dvhc.json')
const city = data.data
const onlyCites = city.map((item)=>{
    return {
        id : item.level1_id,
        name : item.name,        
    }
})

const onlyDistricts = 

// console.log("city",city)
console.log(onlyCites)

