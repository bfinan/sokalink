import { supabase } from './supabaseClient.js';

// on install, set the default submitter ID to the extension ID and direct the user to the tutorial page
chrome.runtime.onInstalled.addListener(() => {
    // initialize a local storage variable to store the submitter ID
    const submitterId = "Uninitialized user";
    console.log("Initializing Submitter ID:", submitterId);

    chrome.storage.local.set({ submitterId: submitterId }, () => {
        console.log("Submitter ID stored in extension storage:", submitterId);
    });

    chrome.tabs.create({ url: "https://sokalink.com/welcome/tutorial" });

});

// Listen for messages from the Sokalink website
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log("Message received from website:", message);
    if (message.type === 'SET_USER_ID') {
        const userId = message.userId;
        chrome.storage.local.set({ submitterId: userId }, () => {
            console.log("Submitter ID stored in extension storage:", userId);
        });
    }
    sendResponse({ status: 'success' });
});

chrome.action.onClicked.addListener(async (tab) => {
    console.log("Sokalink button clicked!");

    if (tab.url) {
        console.log("Publishing URL:", tab.url);
        console.log("Page Title:", tab.title);

        try {
            // Retrieve the submitter string from extension storage
            chrome.storage.local.get('submitterId', async (result) => {
                const submitterId = result.submitterId;
                console.log("Retrieved Submitter ID from storage:", submitterId);

                // Send the URL to Supabase
                const { data, error } = await supabase
                    .from('links')
                    .insert([{ url: tab.url, submitter: submitterId, title: tab.title }]);

                if (error) {
                    console.error("Failed to publish URL:", error);
                    chrome.notifications.create({
                        type: "basic",
                        iconUrl: "icons/fail48.png",
                        title: "Sokalink",
                        message: error.message
                    });
                } else {
                    console.log("URL published successfully:", data);

                    chrome.notifications.create({
                        type: "basic",
                        iconUrl: "icons/icon48.png",
                        title: "Sokalink",
                        message: "URL Published!"
                    });
                }
            });
        } catch (error) {
            console.error("Unexpected error:", error);
        }
    } else {
        console.log("No URL found");
    }
});