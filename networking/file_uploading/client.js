const net = require("net");
const fs = require("fs");
const path = require("path");

const fsPromises = require("fs/promises");
//create a connection here



const socket = net.createConnection("5005", async () => {
  const pathName = process.argv[2];

  if (!pathName) {
    console.log("Please provide a file name");
    process.exit(1);
  }

  const fullPath = path.basename(pathName);

  //send the file name first
  const buffer = Buffer.from(JSON.stringify({ fullPath }));
  socket.write(buffer);

  // and our readStream
  const rStream = fs.createReadStream(fullPath);

  // find total file size : for uploading %
  let fileSize = 0;
  let sizeWritten = 0;
  async function findSizeOfFile() {
    const openFile = await fsPromises.open(fullPath);
    const file = await openFile.stat();
    fileSize = file.size;
    await openFile.close();
  }
  await findSizeOfFile();

  // if the file/ stream has data , send it to the server
  rStream.on("data", (data) => {
    if (!socket.write(data)) {
      rStream.pause();
    }
    //chunk size
    sizeWritten += data.length;

    let percentageWritten = Math.floor((sizeWritten / fileSize) * 100);

    if (percentageWritten) {
      console.log(`Uploading file ${fullPath} ... ${percentageWritten}%`);
    }
  });

  rStream.on("end", () => {
    console.log("File sent successfully");
    rStream.close();
    socket.end();
  });
  socket.on("drain", () => {
    rStream.resume();
  });
});
