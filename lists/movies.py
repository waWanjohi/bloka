#!/usr/bin/env python3
# ./listBuilder.py ; cat lists.js

def main():
    PROD = "movies.js"

    PATH_URLS = "Urls/"
    PATH_KEYWORDS = "Keywords/"

    # w = [over]write, a = append
    outputFile = open(PROD, "w")

    header = "// Bloka\n"
    header += "// movies.js THIS FILE WAS GENERATED WITH movies.py DO NOT EDIT DIRECTLY\n"

    outputFile.write(header)

    s = "export let moviesMap={"
    for c in "X":
        name = PATH_URLS + c + ".txt"
        urls = open(name, "r")

        for url in urls:
            urlWithoutNewLine = "\"" + url[:-1] + "\":!0"
            s += urlWithoutNewLine + ","

    s = s[:-1]
    s += "};\n"

    outputFile.write(s)

    s = "export let bannedWordsList=["
    for c in "1":
        name = PATH_KEYWORDS + c + ".txt"
        urls = open(name, "r")

        for url in urls:
            urlWithoutNewLine = "\"" + url[:-1] + "\""
            s += urlWithoutNewLine + ","

    s = s[:-1]
    s += "];\n"

    outputFile.write(s)
    outputFile.close()
    print("Now run cp movies.js src/movies.js")

if (__name__ == "__main__"):
    main()
