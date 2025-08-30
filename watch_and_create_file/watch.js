const fs = require("fs/promises")


const CREATE_FILE = "create a file"
const DELETE_FILE = "delete the file"


const createFile = async (file_name) => {
  var file;
  try {
    file = await fs.open(file_name, "r")
    file.close()
    return console.log(`file ${file_name} exists`)
  }
  catch (e) {
    file = await fs.open(file_name, "w")
    file.close()
    console.log(`file ${file_name} created`)
    return
  }

}

const deleteFile = async(path)=> {
  try{ 
      console.log(`deleting ${path} ...`)
      await fs.unlink(path)
      console.log(` ${path} deleted...`)
  }catch(e){
      console.log(`${path} does not exist`)
  }
}


const watcher = async () => {

  const watch = fs.watch("./commander.txt")

  for await (const w of watch) {

    if (w.eventType == "change") {
      commanderFile = await fs.open("./commander.txt", "r")
      const size = (await commanderFile.stat()).size
      const content = await commanderFile.read(Buffer.alloc(size))
      const userContentInFile = content.buffer.toString()
       //check for create delete
      if (userContentInFile.includes(CREATE_FILE))  {
        let file_name = userContentInFile.substring(CREATE_FILE.length + 1).trim()
          // check for dumb users
          if (  file_name && (file_name.includes(CREATE_FILE)  || file_name.includes(DELETE_FILE) || file_name.includes(" ") ))  {
             return console.log("You lost your way ....")
          }


        if (file_name) {
          createFile(file_name)
        }else{
          return
        }
      }

       if (userContentInFile.includes(DELETE_FILE)) {
        let file_name = userContentInFile.substring(DELETE_FILE.length + 1).trim()

        if (  file_name && (file_name.includes(CREATE_FILE)  || file_name.includes(DELETE_FILE) || file_name.includes(" ") ))  {
             return console.log("You lost your way ....")
          }


        if (file_name) {
          deleteFile(file_name)
        }else{
          return
        }
      }

    }
  }


}



watcher()
