import { pornMap, bannedWordsList } from "./lists";

// A random list of youtube channels :: -> I've removed because they can be used to trigger the "videoplayback" glitch!
// let uris = [
//   "https://youtu.be/2fOWFfpLYW0",
//   "https://youtu.be/ZKzeejOwoXk",
//   "https://youtu.be/H7Gp-GRnGdA",
//   "https://youtu.be/Gt2mYPwXyAc",
//   "https://youtu.be/8LGW5xDVUIA",
//   "https://youtu.be/Sm31U_V5TkU",
//   "https://youtu.be/GM0E93B-Ztg",
//   "https://youtu.be/H7Gp-GRnGdA",
// ];

let uris = ["https://google.com"];

let links = [];
links.push();
let size = -1;
let counter = 0;
let safeSearch = "&safe=active";

// Let a link be shuffled from the array of links [ google.com ]
let defaultLink = uris[~~(uris.length * Math.random())];

// Let's go
main();

// Function main()
// Evaluates current site for ban status
function main() {
  let location = window.location;

  if (isUnsafeGoogleSearch(location)) {
    window.location.href = location + safeSearch;
    return;
  }

  // Check from the local storage ...
  chrome.storage.local.get("realtimeBannedLinks", function(returnValue) {
    let firebaseLinks = returnValue.realtimeBannedLinks;
    let hostname = location.hostname;

    // console.log(firebaseLinks);
    // If the url is a porn site, blockSite!
    if (
      isBannedFirebase(firebaseLinks) &&
      location.hostname !== "console.firebase.google.com" &&
      location.hostname !== "www.google.com"
    ) {
      if (
        hostname.includes("google") ||
        hostname.includes("gmail") ||
        hostname.includes("youtube") ||
        hostname.includes("amazon") ||
        hostname.includes("instagram") ||
        hostname.includes("is.muni.cs") ||
        hostname.includes("virtual-addiction")
      ) {
        return;
      } else {
        blockSite();
      }
    } else {
      return;
    }
  });

  // ROUTE HARDCODED ( FASTER but does not contain latest links )
  // I've combatted this by running a periodic script @lists/update.sh
  // If the url is a porn site, call blockSite
  if (
    isBannedURL() &&
    window.location.hostname !== "console.firebase.google.com" &&
    window.location.hostname !== "www.google.com"
  ) {
    let hostname = window.location.hostname;

    if (
      hostname.includes("google") ||
      hostname.includes("gmail") ||
      hostname.includes("youtube") ||
      hostname.includes("amazon") ||
      hostname.includes("instagram") ||
      hostname.includes("is.muni.cs") ||
      hostname.includes("virtual-addiction")
    ) {
      return;
    } else {
      // blockSite();  ==> Had a slow implementation, 0(n) worst case ...
      window.location.href = defaultLink;
    }
  }
}

// Function blockSite()
// Adds links from storage to our links array so that
// openLink() can select a random wholesome link to fill the user's window with
function blockSite() {
  window.stop();

  // Array that stores all the keys (in our case, the urls)
  let allKeys;

  // Get all/no urls currently in storage
  chrome.storage.sync.get(null, function(items) {
    urls = Object.keys(items);
    size = urls.length;

    // If urls[0] is undefined (aka nothing exists in storage), open
    //  the default link
    if (urls[0] !== undefined) {
      // Iterate through the urls array
      //  and add the urls to our links list to select from
      for (let i = 0; urls[i] !== undefined; i++) {
        links.push(urls[i]);
      }
      openLink();
    } else {
      // When your wholesome list is empty, redirect to quality education
      window.location.href = defaultLink;
    }
  });
}

// Function openLink()
// Redirects users to a random website from their wholesome sites lists
// Runs only after links[] is fully filled with the links from storage
function openLink() {
  // Selecting a random link
  let linkIndex = Math.floor(Math.random() * links.length);
  let linkToOpen = links[linkIndex];
  // Open within same window
  window.location.href = linkToOpen;
}

// Function evaluateWords()
// Goes through bannedWordsList and counts the number of banned words
//  in the current window's url
function evaluateWords() {
  let counter = 0;

  let url = window.location.href.toLowerCase();

  // Remove all "url buffers" for easier parsing
  while (url.indexOf("-") != -1) {
    url = url.replace("-", " ");
  }
  while (url.indexOf("+") != -1) {
    url = url.replace("+", " ");
  }

  // mfw 12000~ array size
  console.log(url);
  console.log("evaluateWords() -- List of keywords:");
  for (let i = 0; i < bannedWordsList.length; i++) {
    if (url.includes(bannedWordsList[i].toLowerCase())) {
      // console.log(bannedWordsList[i]);
      counter++;
    }
    // >== because I don't know how async works and I don't want async
    //  to increment counter from four to five+ too fast
    if (counter >= 4) {
      return true;
    }
  }

  // If we reach here, counter is < 4
  return false;
}

// Function checkTitle()
// Evaluates the title of the current page for porn clues
// Usually a better indicator than the URL (less false positives)
function checkTitle() {
  document.addEventListener("DOMContentLoaded", function(event) {
    //do work
    let title = document.title.toLowerCase();
    let ctr = 0;

    for (let i = 0; i < bannedWordsList.length; i++) {
      if (title.includes(bannedWordsList[i])) {
        ctr++;
      }
    }
    // Moment of silence for IBM XFORCE
    // RIP
    // Here comes some fresh NLP, title analysis
    // 3 because fun
    if (ctr >= 3) {
      store(window.location.hostname);
    }
  });
}

function isBannedURL() {
  // Header(s) removed so that we can find the correct period to substring to
  //  in order to collect only the domain name

  let url = window.location.hostname.toLowerCase();
  let idx = url.indexOf(".");

  // 8 to account for sites with extended intros (ie. boards.4chan)
  // This evaluates to false for a URL that looks like abcdefgh.name.com
  // Here's to hoping that there aren't too many of those URLs around
  if (idx < 8) {
    url = url.substring(idx + 1);
  }

  // O(1) and whO(l)esome
  if (!url.includes("fightthenewdrug") && !url.includes("github")) {
    if (pornMap[url]) {
      window.stop();
      return true;
    }
  }

  // Inconclusive
  return false;
}

function isUnsafeGoogleSearch() {
  return (
    location.href.includes("google.com/search?") &&
    !location.href.includes(safeSearch)
  );
}
