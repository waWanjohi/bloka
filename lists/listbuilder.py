#!/usr/bin/env python3
# ./listBuilder.py ; cat lists.js

def main():

    DEV = "testFile.txt"
    PROD = "lists.js"

    PATH_URLS = "Urls/"
    PATH_KEYWORDS = "Keywords/"

    # w = [over]write, a = append
    outputFile = open(PROD, "w")

    header = "// Bloka\n"
    header += "// lists.js THIS FILE WAS GENERATED WITH listBuilder.py DO NOT EDIT DIRECTLY\n"
    header += "// Fetched from:\n"
    header += "// https://github.com/Bon-Appetit/porn-domains/blob/master/domains.txt\n"
    header += "\n"

    outputFile.write(header)

    s = "let pornMap={"
    for c in "0123456789abcdefghijklmnopqrstuvwxyzABC":
        name = PATH_URLS + c + ".txt"
        urls = open(name, "r")

        for url in urls:
            urlWithoutNewLine = "\"" + url[:-1] + "\":!0"
            s += urlWithoutNewLine + ","

    s = s[:-1]
    s += "};\n"

    outputFile.write(s)

    s = "let bannedWordsList=["
    for c in "abcdefghijklmnopqrstuvwxyz":
        name = PATH_KEYWORDS + c + ".txt"
        urls = open(name, "r")

        for url in urls:
            urlWithoutNewLine = "\"" + url[:-1] + "\""
            s += urlWithoutNewLine + ","

    s = s[:-1]
    s += "];\n"

    outputFile.write(s)
    outputFile.close()
    print("Now run cp lists.js src/lists.js")

if (__name__ == "__main__"):
    main()
