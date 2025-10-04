
alias build="chmod +x ./scripts.sh &&  ./scripts.sh"

catty() {
node /c/Users/xhady\ ayan/Desktop/Coding/pure-node/UNIX/cat-replica/cat.js "$1" | \
node /c/Users/xhady\ ayan/Desktop/Coding/pure-node/UNIX/cat-replica/from.js

}
catty "$1"