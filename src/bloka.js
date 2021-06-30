// Do this once extension is removed
chrome.runtime.setUninstallURL(
  "https://docs.google.com/forms/d/11rWt4h6KQaRuuJlMjHdgQL7Tx_feB2f7jwwflrjU4nk/",
  function() {}
);

// On startup ...
chrome.storage.local.get("notFirstTime", function(returnValue) {
  if (returnValue.notFirstTime === undefined) {
    openLink("options.html");
    openLink("index.html");
    chrome.storage.local.set({ notFirstTime: true }, function() {});
  }
});

// Start calling methods
document.addEventListener("DOMContentLoaded", function(event) {
  // First update the db with firebase
  // updateDB();
  setIncognito();
  initialize();
});

// Function to update db
function updateDB() {
  chrome.storage.local.get(null, function(items) {
    let linkNames = Object.keys(items);
    // Do stuff with the links:: FINETUNE LATER
    // DBOperation(linkNames);
  });
}

// FINETUNE LATER
// function to do db operations
function DBOperation(linkNames) {
  //     // Cross-check the api key
  //     if(!API_KEY) {
  //         console.warn("Firebase API Key invalid");
  //     }
  //     return;
  // // FIRESTORE SETUP
  // const API_KEY = "AIzaSyAV-2d0ZSHseDpEM_LqdUXmA75Qe_QvBj8";
  // const AUTH_DOMAIN = "antiporn-f6472.firebaseapp.com";
  // const DATABASE_URL = "antiporn-f6472";
  // const PROJECT_ID = "antiporn-f6472";
  // const STORAGE_BUCKET = "117423349655";
  // const MESSAGING_SENDER_ID = "1:117423349655:web:b0ff68691d6826fb642ed2";
  // // Firebase
  // let config = {
  //     apiKey: API_KEY,
  //     authDomain: AUTH_DOMAIN,
  //     databaseURL: DATABASE_URL,
  //     projectId: PROJECT_ID,
  //     storageBucket: STORAGE_BUCKET,
  //     messagingSenderId: MESSAGING_SENDER_ID
  //   };
  // // Initialize a FB app
  // firebase.initializeApp(config);
  // // invoke firestore
  // let db = firebase.firestore();
  // // To prevent app from breaking due to an error,
  // let settings = {
  //     /* Settings here ... */
  //     timestampsInSnapshots: true
  // }
  // db.settings(settings);
  // let linksToAdd = [];
  // // Add links
  // for (let currentLink = 0; linkNames[currentLink] !== undefined; currentLink++) {
  //     let val = linkNames[currentLink];
  //     if (val !== 'realtimeBannedLinks' && vals !== 'notFirstTime') {
  //         db.collection('links').doc(val).set({
  //             // Adding this line will write another document ( links -> link -> link:currentLink )
  //             url: val
  //         });
  //        // Debugging
  //       // .then(function(docRef) {
  //       //   console.log('Document written with id: ', docRef.id);
  //       // })
  //       // .catch(function(error) {
  //       //   console.error('Error adding document: ', error);
  //       // });
  //       linksToAdd.push(val);
  //     }
  // }
  // // Now let's update the main array of links
  // let allLinks  = db.collection('links').doc('realtimeBannedLinks')
  // allLinks.get().then(function (doc) {
  //     if(doc.exists) {
  //         // Get updated list
  //         let currentLinks = doc.data().url;
  //         // Add the links from local storage to the copy of the realtimeBannedLinks
  //       console.log('length INIT: ' + currentLinks.length);
  //       for (let i = 0; linksToAdd[i] !== undefined; i++) {
  //           currentLinks.push(linksToAdd[i]);
  //         // Clear local storage to free up space
  //         chrome.storage.local.remove([linksToAdd[i]], function () {});
  //       }
  //       console.log('length FINAL: ' + currentLinks.length);
  //     // Then, update the array of links saved in local storage and update the
  //     //realtimeBannedLinks in Firebase
  //     // Do this, and you will have successfully created a method of updating
  //     // Firebase and everyone else's local storage copies of realtimeBannedLinks
  //     chrome.storage.local.set({ realtimeBannedLinks: currentLinks }, function () { });
  //     db.collection('links').doc('realtimeBannedLinks').set({
  //         url: currentLinks
  //     });
  //   }
  //   else {
  //     //   doc.data() will be empty
  //     console.log("Document does not exist!");
  //   }
  // }).catch(function (error) {
  //     console.log("Gideon, We have a problem!" + error);
  // })
  // // END FIREBASE
}

// LOCAL STUFF

// Function submit()
// Begin the process of creating a new list item when clicking on the "Add" button
function submit() {
  let url = document.getElementById("link_url").value.trim();
  let name = document.getElementById("link_name").value.trim();

  // Boolean flag to avoid modifiying filepath submissions
  let isURL = !url.includes("file://");

  // URL checks
  if (isURL) {
    // Input blank, do nothing
    if (url === "") {
      // Set error message to blank
      document.getElementById("ERROR_MSG").innerHTML = "";

      return;
    }

    // Any spaces, display error
    else if (url.includes(" ")) {
      document.getElementById("ERROR_MSG").innerHTML =
        "Invalid format, sorry. Do not include spaces in the link.";
      return;
    }
  }

  isBanned(url, name, "submit");
}

// Extract the domain name from the inputted url and check if the input's
//  domain name is a porn site domain
// Ya boi Vivek out here writing a porn filter ayy lmao
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
// @param bannedLinks The entire list of links, hardcoded and from storage
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

  // Else, screen for domain in that alright O(n)
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

// Function helpIncognito()
// Should users click on the incognito tip, they are directed to Antiporn's
//  extension page to help with the process of enabling "Allow in incognito"
function helpIncognito() {
  chrome.tabs.create({
    url: "chrome://extensions/?id=" + chrome.runtime.id,
  });
}

// Function emergency()
// emergency button functionality
// open all redirects in separate windows
// Why so many windows? so many windows to maximize the amount of time user
//  spends looking at the stuff that motivates him/her
// More exposure may lead to more conversion of sexual energy into positive energy
function emergency() {
  chrome.storage.sync.get(null, function(items) {
    urls = Object.keys(items);

    // Add quality education to the opened links
    urls.push("https://fightthenewdrug.org/overview/");
    urls.push("http://virtual-addiction.com/online-pornography-test/");
    urls.push("user_manual/welcome.html");
    // Iterate through the urls array
    //  and mass-open all the links
    for (let i = 0; urls[i] !== undefined; i++) {
      openWindow(urls[i]);
    }
  });
}

function initialize() {
  // Have an array store all keys
  let urls;

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
