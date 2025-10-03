arg="$1"

catty() {
     node cat.js "$arg" 0> node from.js
}

catty 