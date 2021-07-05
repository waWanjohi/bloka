#!/bin/sh
# Open remote updated files
# Get the tlds from https://data.iana.org/TLD/tlds-alpha-by-domain.txt
curl https://raw.githubusercontent.com/Bon-Appetit/porn-domains/master/block.txt > Urls/A.txt
curl https://raw.githubusercontent.com/Bon-Appetit/porn-domains/master/ignore.txt > Urls/B.txt
curl https://raw.githubusercontent.com/Bon-Appetit/porn-domains/master/white.txt  > Urls/C.txt

# Make a list
python listbuilder.py