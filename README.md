## What does Mistake do?

Display a custom message at the top of any webpage that meets the criteria you define.

## Why would I want to do such a thing?

Have you ever worked having **multiple tabs of the same application** open, but in **different environments**? Then you know how easy it is to live everyone's worst nightmare: screwing things up in production.</p>
After yet another near miss, I decided to take matters into my own hands and design this plug-in. Now, when I'm in production, at least I'm significantly reducing the odds of making a _Mistake_.

## Installation

- Download this repository and unpack the contents
- Open Google Chrome
- Menu -> More tools -> Extensions -> Toggle developer mode
- Click "Load unpacked" and select the folder on your local drive that contains this repository. Mistake should now be visible in your list of extensions.
- To pin Mistake, click on the extensions icon next to the menu icon (3 dots) and click on the pin icon next to "Mistake".
- To open the options page and add a new rule, click on the Mistake icon ("M") and click "Options".

## How does it work?

When you add a new rule to the options page and save, the details of that rule are saved to local sync storage.
Sync storage means you can also access any saved rules on any other Chrome browser which you are logged into.

When you navigate to a new page in any tab, the extension will check if the URL matches with one of the rules that you have saved.
If it does, your message is prepended to the body tag.

Learn more about Chrome extensions at https://developer.chrome.com/home.
