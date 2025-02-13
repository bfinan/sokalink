import { supabase } from './supabaseClient.js';

chrome.action.onClicked.addListener(async (tab) => {
    console.log("Sokalink button clicked!");

    if (tab.url) {
        console.log("Publishing URL:", tab.url);
        console.log("Page Title:", tab.title);

        try {
            // Send the URL to Supabase
            const { data, error } = await supabase
                .from('links')
                .insert([{ url: tab.url , title:tab.title}]);

            if (error) {
                console.error("Failed to publish URL:", error);
            } else {
                console.log("URL published successfully:", data);

                chrome.notifications.create({
                    type: "basic",
                    iconUrl: "icons/icon48.png",
                    title: "Sokalink",
                    message: "URL Published!"
                });
            }
        } catch (error) {
            console.error("Unexpected error:", error);
        }
    } else {
        console.log("No URL found");
    }
});