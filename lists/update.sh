#!/bin/sh
# Open remote updated files
curl https://raw.githubusercontent.com/Bon-Appetit/porn-domains/master/block.txt > Urls/A.txt
curl https://raw.githubusercontent.com/Bon-Appetit/porn-domains/master/ignore.txt > Urls/B.txt
curl https://raw.githubusercontent.com/Bon-Appetit/porn-domains/master/white.txt  > Urls/C.txt

# Make a list
python listbuilder.py