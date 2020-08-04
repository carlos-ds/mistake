chrome.storage.sync.get(null, function (syncItems) {
  for (const [key, value] of Object.entries(syncItems)) {
    if (value.ruleExpression === window.location.href) {
      // Display message here
      console.log(key);
      console.log(value);
    }
  }
});
