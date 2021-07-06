#!/bin/sh
# Open remote updated files
curl https://raw.githubusercontent.com/Bon-Appetit/porn-domains/master/block.txt > Urls/A.txt
curl https://raw.githubusercontent.com/Bon-Appetit/porn-domains/master/ignore.txt > Urls/B.txt
curl https://raw.githubusercontent.com/Bon-Appetit/porn-domains/master/white.txt  > Urls/C.txt

# Compress the list
python listbuilder.py


# Update in the src folder
# mv lists.js ../src/content-scripts/lists.js
