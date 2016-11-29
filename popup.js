// Copyright (c) 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

window.React = {};

chrome.browserAction.onClicked.addListener(openPopupPage);

function openPopupPage(callback) {
    chrome.tabs.create({
                           url: 'popup.html'
                        });
}


/**
 * Get the current URL.
 *
 * @param {function(string)} callback - called when the URL of the current tab
 *   is found.
 */


function getCurrentTabUrl(callback) {
    // Query filter to be passed to chrome.tabs.query - see
    // https://developer.chrome.com/extensions/tabs#method-query
    var queryInfo = {
        active: true,
        currentWindow: true
    };

    chrome.tabs.query(queryInfo, function (tabs) {
        // chrome.tabs.query invokes the callback with a list of tabs that match the
        // query. When the popup is opened, there is certainly a window and at least
        // one tab, so we can safely assume that |tabs| is a non-empty array.
        // A window can only have one active tab at a time, so the array consists of
        // exactly one tab.
        var tab = tabs[0];

        // A tab is a plain object that provides information about the tab.
        // See https://developer.chrome.com/extensions/tabs#type-Tab
        var url = tab.url;

        // tab.url is only available if the "activeTab" permission is declared.
        // If you want to see the URL of other tabs (e.g. after removing active:true
        // from |queryInfo|), then the "tabs" permission is required to see their
        // "url" properties.
        console.assert(typeof url == 'string', 'tab.url should be a string');

        callback(url);
    });

    // Most methods of the Chrome extension APIs are asynchronous. This means that
    // you CANNOT do something like this:
    //
    // var url;
    // chrome.tabs.query(queryInfo, function(tabs) {
    //   url = tabs[0].url;
    // });
    // alert(url); // Shows "undefined", because chrome.tabs.query is async.
}

/**
 * @param {string} searchTerm - Search term for Google Image search.
 * @param {function(string,number,number)} callback - Called when an image has
 *   been found. The callback gets the URL, width and height of the image.
 * @param {function(string)} errorCallback - Called when the image is not found.
 *   The callback gets a string that describes the failure reason.
 */
function getImageUrl(searchTerm, callback, errorCallback) {
    // Google image search - 100 searches per day.
    // https://developers.google.com/image-search/
    var searchUrl = 'https://ajax.googleapis.com/ajax/services/search/images' +
        '?v=1.0&q=' + encodeURIComponent(searchTerm);
    var x = new XMLHttpRequest();
    x.open('GET', searchUrl);
    // The Google image search API responds with JSON, so let Chrome parse it.
    x.responseType = 'json';
    x.onload = function () {
        // Parse and process the response from Google Image Search.
        var response = x.response;
        if (!response || !response.responseData || !response.responseData.results ||
            response.responseData.results.length === 0) {
            errorCallback('No response from Google Image search!');
            return;
        }
        var firstResult = response.responseData.results[0];
        // Take the thumbnail instead of the full image to get an approximately
        // consistent image size.
        var imageUrl = firstResult.tbUrl;
        var width = parseInt(firstResult.tbWidth);
        var height = parseInt(firstResult.tbHeight);
        console.assert(
            typeof imageUrl == 'string' && !isNaN(width) && !isNaN(height),
            'Unexpected respose from the Google Image Search API!');
        callback(imageUrl, width, height);
    };
    x.onerror = function () {
        errorCallback('Network error.');
    };
    x.send();
}

function renderStatus(statusText) {
    document.getElementById('status').textContent = statusText;
}

function extractDomain(url) {
    var domain;
    //find & remove protocol (http, ftp, etc.) and get domain
    if (url.indexOf("://") > -1) {
        domain = url.split('/')[2];
    }
    else {
        domain = url.split('/')[0];
    }

    //find & remove port number
    domain = domain.split(':')[0];

    return domain;
}

function getWindowsAndTabs() {
    chrome.windows.getAll({populate: true}, function (windows) {
        var count = 1;
        windows.forEach(function (window) {
            console.log("Window number " + count)
            var tabs = window.tabs;
            console.log(tabs)
            var urls = [];
            var c = 0;
            console.log('window', window);
            document.getElementById('status').innerHTML += '<h2 class="window-separator"> window id:'+window.id+' '+count+'</h2>';            
            tabs.forEach(function (element) {
                //console.log(element.url);
                urls[c] = element.url;
                document.getElementById('status').innerHTML += `
                <div class="link-object">
                  <a href="${element.url}">${element.title}
                  <span class="link-short">${extractDomain(element.url)}</span>

                  </a>
                </div>`;

                c++;
            }, this);
            //console.log("///////////////////////////urls//////////////////"+'\n'+urls[0])
            // var x = ""
            var jsonA = "{ \"windowName\":\"" + count + "\"";
            //jsonA += ", \"urls\":[ \"0\":\"" + urls[0] + "\""
            for (var i = 0; i < urls.length; i++) {
                // var key = String(i)
                // var value = String(urls[i])
                jsonA += ", \"" + String(i) + "\":\"" + String(urls[i]) + "\""
            }
            jsonA += " }"
            var json = JSON.parse(jsonA)
            chrome.storage.sync.set(json, function () {
                // Notify that we saved.
                console.log('Settings saved');
            });
            count = count + 1;
        });

        document.getElementById('link-length').innerHTML = `tabs ${document.querySelectorAll("#status a").length}`
    });
//setTimeout(getWindowsAndTabs, 3000);

}

var myListener = function(tabId, changeInfo, updateTab) {
    console.log(tabId, changeInfo, updateTab);
}

function injector(file, message) {
    chrome.tabs.executeScript(tab.id, {file: file, runAt: 'document_end'}, function(r) {
        chrome.tabs.sendMessage(tab.id, message, function(result) { });
    });
    chrome.tabs.onUpdated.removeListener(myListener);
}

chrome.tabs.onUpdated.addListener(myListener);




document.addEventListener('DOMContentLoaded', function () {
    // getCurrentTabUrl(function(url) {
    //   // Put the image URL in Google search.
    //   renderStatus('Performing Google Image search for ' + url);

    //   getImageUrl(url, function(imageUrl, width, height) {

    //     renderStatus('Search term: ' + url + '\n' +
    //         'Google image search result: ' + imageUrl);
    //     var imageResult = document.getElementById('image-result');
    //     // Explicitly set the width/height to minimize the number of reflows. For
    //     // a single image, this does not matter, but if you're going to embed
    //     // multiple external images in your page, then the absence of width/height
    //     // attributes causes the popup to resize multiple times.
    //     imageResult.width = width;
    //     imageResult.height = height;
    //     imageResult.src = imageUrl;
    //     imageResult.hidden = false;

    //   }, function(errorMessage) {
    //     renderStatus('Cannot display image. ' + errorMessage);
    //   });
    // });
    getWindowsAndTabs()
});