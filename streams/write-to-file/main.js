
const fs = require("fs")
const Main = async()=>{
    const stream = fs.createWriteStream("test.txt")

    let i =0

    const write =async ()=>{
        while(i<1000000){

            const chunkSize = 1000;
            let chunk = ""
            for (let j = 0; j < chunkSize && i < 1000000; j++) {
                const buff = Buffer.from(`${i} \n`);
                chunk += buff.toString();
                i++;
            }
            if (!stream.write(chunk)) {
                return
            }
        }
        stream.end()
    }
    write()

    stream.on("drain",()=>{
        write()
    })

    stream.on("finish",()=>{
        console.log("done")
        stream.close()
    })
    stream.on("error",(err)=>{
        console.log(err)
    })

}
Main()

