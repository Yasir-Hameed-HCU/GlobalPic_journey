// app.js

// Initialize deferredPrompt for use later to show browser install prompt.
let deferredPrompt;

// Check if service workers are supported
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(reg => {
                console.log('Service worker registered.', reg);
            })
            .catch(err => {
                console.error('Error during service worker registration:', err);
            });
    });
}

// Capture the event that fires before the install prompt
window.addEventListener('beforeinstallprompt', (event) => {
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    event.preventDefault();
    // Stash the event so it can be triggered later.
    deferredPrompt = event;
});

// Add an event listener for the 'appinstalled' event to track successful installations
window.addEventListener('appinstalled', (event) => {
    console.log('GlobePics Journey has been installed.', event);
});

// Function to trigger the install prompt
function showInstallPrompt() {
    if (deferredPrompt) {
        // Show the install prompt
        deferredPrompt.prompt();
        // Wait for the user to respond to the prompt
        deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
                console.log('User accepted the install prompt');
            } else {
                console.log('User dismissed the install prompt');
            }
            deferredPrompt = null;
        });
    }
}

// Call showInstallPrompt at the appropriate time in your app to show the install button
// Example usage: A button with the id 'installButton' that calls showInstallPrompt when clicked
const installButton = document.getElementById('installButton');
if (installButton) {
    installButton.addEventListener('click', showInstallPrompt);
}
