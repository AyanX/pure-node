
console.time("test")

const fs = require("fs/promises")
const Main = async()=>{

    const file = await fs.open("test.txt","w")
    const stream = file.createWriteStream()

    let i =0

    const write =async ()=>{
        while(i<1000000){

            const buff = Buffer.from(`${i} \n`)

           if (!stream.writable){
            break
           }

           

           i++
            stream.write(buff)
            if (i == 1000000-1){
                stream.end()
           }
        }
    }
    write()

    stream.on("drain",()=>{
        console.log("draining")
        write()
    })

    stream.on("finish",()=>{
        console.log("done")
        
console.timeEnd("test")
    })



    await file.close()

}
Main()

