# Cat Replica 🐱

A small Node.js + Bash project that mimics the basic functionality of the Unix `cat` command.  
It allows you to read and display the contents of files directly from the terminal.

---

## 📂 Project Structure
cat-replica/
│── cat.js # Node script to read a file and print its contents
│── from.js # Node script to handle input/output stream
│── scripts.sh # Bash script that ties everything together

---

## ⚙️ How It Works
- `cat.js` reads the file given as an argument.
- `from.js` receives and processes the stream.
- `scripts.sh` is the executable wrapper that wires everything together, simulating the `cat` command.

Example:

```bash
cat file.txt


is replicated by running:

bash
./scripts.sh file.txt



🚀 Installation & Setup
Clone or download this repository.

Make sure you have Node.js installed.

Give execution permissions to scripts.sh:

bash
chmod +x scripts.sh

(Optional) Create a handy alias in your ~/.bashrc or ~/.zshrc:

bash
alias show='cd "/path/to/cat-replica" && ./scripts.sh'
source ~/.bashrc


▶️ Usage

Run the script with a file path as an argument:

bash

./scripts.sh myfile.txt

Or, if you added the alias:

bash
show myfile.txt

✨ Features
Reads and displays file contents.

Works like the Unix cat command.

Built with Node.js streams + Bash scripting.

Lightweight and easy to run.

