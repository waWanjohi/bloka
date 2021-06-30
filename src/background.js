
import { pornMap } from "./lists"
import "./bloka";

let uris = [
    "ftnd.org",
    "https://www.webmd.com/connect-to-care/addiction-treatment-recovery/porn-addiction-treatments",
    "https://www.rehabs.com/addiction/porn-rehabs/",
    "https://www.flfamily.org/get-help/porn-addiction",
    "https://trafalgarresidence.com/blog/porn-addiction-recovery/",
    "https://www.cru.org/us/en/how-to-know-god/my-story-a-life-changed/how-i-overcame-my-porn-addiction.html",
    "https://fiftyshadesoflove.org/#connection"
  ];
  
let links = [];
let size = -1;
let counter = 0;
let safesearch = '&safe=active';
let defaultLink = uris[~~(uris.length * Math.random())];

main();


function main() {
    let location = window.location;

    // Returns user to a safe search
    if (isUnsafeGoogleSearch(location)){
        window.location.href = defaultLink;
        return;
    }
  getLocalLinks();
  getHardCodedRoutes();

}


// Determine of search is safe
function isUnsafeGoogleSearch() {
    return location.href.includes('google.com/search?') && !location.href.includes(safeSearch)
}


browser.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log("Hello from the background");

  browser.tabs.executeScript({
    file: "content-script.js",
  });
});




// THE BLOCKER FUNCTION
// Function blockSite()
// Adds links from storage to our links array so that
// openLink() can select a random wholesome link to fill the user's window with
function blockSite() {
  window.stop()

  // Array that stores all the keys (aka the urls)
  // let allKeys;

  // Get all/no urls currently in storage
  chrome.storage.sync.get(null, function (items) {
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
    }
    else {
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


// To prevent an error
function findURL() {}



// looks for any cached links on the browser
function getLocalLinks() {
  // ROUTE LOCALSTORAGE ( [ideally is] MOST UP TO DATE )
  chrome.storage.local.get("realtimeBannedLinks", function (returnValue) {
   let firebaseLinks = returnValue.realtimeBannedLinks;
   let hostname = location.hostname;
 
 
   // console.log(firebaseLinks);
   // If the url is a porn site, blockSite!
   if (isBannedFB(firebaseLinks) && location.hostname !== 'console.firebase.google.com' && location.hostname !== 'www.google.com') {
     if (hostname.includes('google') ||
       hostname.includes('gmail') ||
       hostname.includes('youtube') ||
       hostname.includes('amazon') ||
       hostname.includes('instagram') ||
       hostname.includes('is.muni.cs') ||
       hostname.includes('virtual-addiction')
     ) {
       return;
     }
     else {
       blockSite();
     }
   }
   else {
     findURL();
   }
 });
 }
 

   // ROUTE HARDCODED ( FASTER but does not contain latest links )
  // If the url is a porn site, call blockSite
 function getHardCodedRoutes() { 
   if (isBannedSite() && window.location.hostname !== 'console.firebase.google.com' && window.location.hostname !== 'www.google.com') {
     let hostname = window.location.hostname;
 
     if (hostname.includes('google') ||
       hostname.includes('gmail') ||
       hostname.includes('youtube') ||
       hostname.includes('amazon') ||
       hostname.includes('instagram') ||
       hostname.includes('is.muni.cs') ||
       hostname.includes('virtual-addiction')
     ) {
       return;
     }
     else {
       blockSite();
     }
  }
}



function isBannedSite() {
  // Remove site header in order to collect only the domain name
  let url = window.location.hostname.toLocaleLowerCase();
  let index = url.indexOf('.');


  // The number 8 caters for sites with extended eg. boards.4chan
  // This defaults to false for a URL that looks like abcdefgh.name.com => prevents bypass
  if (index < 8) {
    url = url.substring(index + 1);
  }

  // 0(1) and 0(wholesome)
  if(!url.includes('fightthenewdrug') && !url.includes('github')) {
    // Check whether it's in the pornManp list (lists.js), and catch it
    if(pornMap[url]) {
      window.stop();
      return true;
    }
  }

  // If not, let's return void.
  // Hold up, it's a bool LOL :)
  return false;
}

// Function isBanned
// Extract the domain name from the inputted url and check if the input's
//  domain name is a porn site domain
// @param url The url whose domain name we check against the porn sites

// Check whether it's banned on firebase
function isBannedFB(linksFromFirebase){
  let url = window.location.href.toLowerCase();

  if (linksFromFirebase && !url.includes('fightthenewdrug') && !url.includes('github')) {
    // O(n) worst case, => 0(wholesome)
    for (let i = 0; linksFromFirebase[i]; i++) {
     if (url.includes(linksFromFirebase[i].toLocaleLowerCase())) {
       return true;
     }       
    }
  }
  return false;
}