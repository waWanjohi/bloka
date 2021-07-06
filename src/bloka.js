import { pornMap } from "./lists";

// Do this once extension is removed
chrome.runtime.setUninstallURL(
  "https://docs.google.com/forms/d/11rWt4h6KQaRuuJlMjHdgQL7Tx_feB2f7jwwflrjU4nk/",
  function() {}
);

// On startup ...
chrome.storage.local.get("notFirstTime", function(returnValue) {
  if (returnValue.notFirstTime === undefined) {
    openLink("options.html");
    chrome.storage.local.set({ notFirstTime: true }, function() {});
  }
});

// Start calling methods
document.addEventListener("DOMContentLoaded", function(event) {
  // First update the db with firebase
  setIncognito();
  initialize();
});


// Extract the domain name from the inputted url and check if the input's
//  domain name is a porn site domain
// @param url The url whose domain name we check against the porn sites
// @param name The name of the url
// @param origin The name of the function that called isBanned
function isBanned(url, name, origin) {
  chrome.storage.local.get("realtimeBannedLinks", function(retValue) {
    let bannedLinks = retValue.realtimeBannedLinks;

    // Final test
    if (isBannedURLRaceCondition(url, bannedLinks)) {
      return true;
    }
    // Origin tag exists bcuz initList() can add list items without unnecessarily
    //  calling storage.set calls, whereas submit() needs to create a list item along
    //  with a storage call
    else if (origin === "submit") {
      addLink(url, name);
    }

    // Link isn't banned ^_^
    return false;
  });
}

// Function isBannedURLRaceCondition()
// Race condition boooooo
// This function does the checking of a link's ban-status. It exists to remove the undesired effects
//  from asynchronous behaviors that were affecting Antiporn's functionality
// @param url The url to test
// @param bannedLinks
function isBannedURLRaceCondition(url, bannedLinks) {
  let lowerCase = url.toLowerCase();

  // Let's attempt to pull out the domain name
  // Trim URL in order to use our pornMap hashmap
  let trimmedURL = lowerCase;
  let start = trimmedURL.indexOf(".");

  if (trimmedURL.includes("www.")) {
    trimmedURL = trimmedURL.substring(start + 1);
  }
  // Some URls don't have a www., so we will instead look for the http header
  // start + 2 to remove both slashes without having to double-check
  else if (trimmedURL.includes("http")) {
    start = trimmedURL.indexOf("/");
    trimmedURL = trimmedURL.substring(start + 2);
  }

  // Remove everything after the domain (ie. domain.com/additional+parameters+blah)
  if (trimmedURL.includes("/")) {
    start = trimmedURL.indexOf("/");
    trimmedURL = trimmedURL.substring(0, start);
  }

  // Screen for domain in that good O(1)
  if (pornMap[trimmedURL]) {
    // GTFOOOO
    document.getElementById("ERROR_MSG").innerHTML =
      "Sorry, that link won't work. Please try another link.";

    // If the link is also saved in storage, remove it
    chrome.storage.sync.remove([url], function() {});
    return true;
  }

  
  // Compare domain name (well, and the rest of the link) with porn domains
  // O(n) worst case feels bad but wh(O)lesome porn-checker feels good
  for (let i = 0; i < bannedLinks.length; i++) {
    if (lowerCase.includes(bannedLinks[i].toLowerCase())) {
      // GTFOOOO
      document.getElementById("ERROR_MSG").innerHTML =
        "Sorry, that link won't work. Please try another link.";

      // If the link is also saved in storage, remove it
      chrome.storage.sync.remove([url], function() {});
      return true;
    }
  }
  // If need be, we could do Object.keys(pornMap) and do a full in-depth search
  // We will wait and see if users really try to redirect to porn URLs and then implement
  // Because I don't want to do that right now and spike the runtime up to ~25000 elements

  return false;
}

// Function addLink()
// Creates a li item of a non-banned url and saves the url in storage
// @param url The url to save
// @param name The name to assign the url item in the popup
function addLink(url, name) {
  // Set error message to blank
  document.getElementById("ERROR_MSG").innerHTML = "";

  // "Declare" a li object
  let li = document.createElement("li");
  let isURL = !url.includes("file://");

  // Yay! Input seems to be valid
  // Assert that the url begins with http:// or https:// (necessary for when we want to open new tabs)
  // If not, add the http (helps smoothen user experience)
  if (!(url.includes("http://") || url.includes("https://")) && isURL) {
    url = "http://" + url;
  }

  // If name field was left blank, use the url as the text to display
  let t = "";
  if (name === "") {
    t = document.createTextNode(url);
    name = url;
  } else {
    t = document.createTextNode(name);
  }
  li.appendChild(t);

  // Add new key-value of the new url to storage
  // Why try-catch?
  // The Google storage documentation (https://developer.chrome.com/extensions/storage#property-sync):
  //  MAX_WRITE_OPERATIONS_PER_MINUTE, 120
  //  MAX_WRITE_OPERATIONS_PER_HOUR, 1800
  // When the limits are exceeded, we receive an error message. We handle that
  //  in the catch block
  try {
    chrome.storage.sync.set({ [url]: name }, function() {
      // Add new li object if storage.sync was a success and
      //  give the element the id of the url received as input to enable onClick
      // document.getElementById("websites").appendChild(li);
      // li.id = input;
      li.id = url;
      document.getElementById("websites").appendChild(li);
      if (!isURL) {
        document.getElementById(
          "ERROR_MSG"
        ).innerHTML = "Reminder: Local files can't be accessed on other machines, unless you copy the file to that machine.".fontcolor(
          "DeepPink"
        );
      }
    });
  } catch (err) {
    document.getElementById("ERROR_MSG").innerHTML =
      "Error...please try again later, sorry!";
  }

  // Empty the input field
  document.getElementById("INPUT_url").value = "";
  document.getElementById("INPUT_name").value = "";

  let span = document.createElement("SPAN");
  let txt = document.createTextNode("\u00D7");
  span.className = "delete";
  span.id = "delete";
  span.appendChild(txt);
  li.appendChild(span);
}

// Function openLink()
// Clicking on a list item should open the url it
//  corresponds to in a new tab within the same window
// The url is gathered from the clicked li object's id
// @param URL The url to open in the new tab
function openLink(URL) {
  chrome.tabs.getSelected(null, function(tab) {
    chrome.tabs.create({ url: URL });
  });
}

// Function openWindow()
// helper function that open URL in a new window
function openWindow(URL) {
  chrome.windows.getCurrent(null, function(tab) {
    // Maintain incognito status for opened windows
    if (tab.incognito) {
      chrome.windows.create({ url: URL, incognito: true });
    } else {
      chrome.windows.create({ url: URL });
    }
  });
}

// Function setIncognito()
// This function checks whether or not Antiporn is enabled in incognito browsing
// If not, we show the tip message because forcing users will only hurt our intentions
function setIncognito() {
  chrome.extension.isAllowedIncognitoAccess(function(isAllowedAccess) {
    // If we are enabled in incognito, remove the tip
    if (isAllowedAccess && document.getElementById("setIncognito")) {
      document.getElementById("setIncognito").remove();
    }
  });
}


function initialize() {
  // Have an array store all keys
  let urls = pornMap;

  chrome.storage.sync.get(null, (items) => {
    urls = Object.keys(items);
    console.log("LOADED KEYS INITIALIZE: " + urls);

    // If urls[0], then skip initialixation
    if (urls[0] !== undefined) {
      // Iterate through urls, collect names and add them to list
      for (let i = 0; urls[i] !== undefined; i++) {
        initList(urls[i]);
      }
    }

    // If list is empty, Let the user know
    else {
      if (document.getElementById("ERROR_MSG")) {
        let message = "Nothing yet. List is empty";
        document.getElementById("ERROR_MSG").innerHTML = message.fontcolor(
          "red"
        );
      }
    }
  });
}

// Creates the li objects with the values passed in from initialize()
// The reason this function exists is to avoid race conditions between the for loop
//  iteration and the value sent into the get(). The loop resolves faster than the
//  get method can return the associated value and create an li, so we were left with
//  several "undefined" list objects
// @param currentKey The key we are retrieving the value of from storage
function initList(currentKey) {
  chrome.storage.sync.get(currentKey, (returnValue) => {
    let url = currentKey;

    // check if this key-value pair exists
    if (returnValue[url] !== undefined) {
      // Check if it's banned
      if (isBanned(url, returnValue[url], "initList")) {
        console.log(
          "This key:value pair is removed from storage in isBanned()"
        );
      } else {
        let name = returnValue[url];
        let li = document.createElement("li");
        let t = document.createTextNode(name);

        li.appendChild(t);
        document.getElementById("websites").appendChild(t);

        // Add an Id to the element
        li.id = url;

        // create a few more dom elemetns
        let span = document.createElement("span");
        let txt = document.createTextNode("\u00D7");
        span.className = "delete";
        span.id = "delete";
        span.appendChild(txt);
        li.appendChild(span);
      }
    }
  });
}
