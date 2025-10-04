
const {stdout} = require("node:process") 

const fs = require("node:fs");
const path = require("node:path");

const fileName = process.argv[2]

const filePath = path.resolve(process.cwd(), fileName);


fs.stat(filePath, (err, stats) => {
    if (err) {
        console.error(`file does not exist: ${filePath}`);
        return;
    }

    if (stats.isDirectory()) {
        console.error("Error: cannot read, it's a directory!" , `${filePath}`);
        return;
    }

    const stream = fs.createReadStream(filePath);

    stream.on("data", data => process.stdout.write(data));
});

