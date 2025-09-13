const fs = require("fs");

// Create a file with dummy data
const createFile = () => {
  const writeStream = fs.createWriteStream("src.txt");
  for (let i = 0; i < 1_000_000; i++) {
    if (!writeStream.write(`${i}\n`)) {
      writeStream.once("drain", () => i++);
      break;
    }
  }
  writeStream.end();
};

// Copy file using streams
const copyFile = () => {
  const readStream = fs.createReadStream("src.txt");
  const writeStream = fs.createWriteStream("src-copy.txt");

  readStream.pipe(writeStream);

  writeStream.on("finish", () => {
    console.log("File copied successfully");
  });
};

createFile();
setTimeout(copyFile, 2000); // wait a bit for file creation
