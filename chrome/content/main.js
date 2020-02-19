var { gQuicktext } = ChromeUtils.import("chrome://quicktext/content/modules/wzQuicktext.jsm");
var { ConversionHelper } = ChromeUtils.import("chrome://quicktext/content/modules/ConversionHelper.jsm");

var quicktext = {
  onloadoptions: function ()
  {
    window.close();
  }
,
  onunloadoptions: function ()
  {
    this.openSettings();
  }
,
  openSettings: function()
  {
    var settingsHandle = window.open("chrome://quicktext/content/settings.xul", "quicktextConfig", "chrome,resizable,centerscreen");
    settingsHandle.focus();
  }
}

/////// NEW ///////////////////////////
// For some reason I cannot add an onload to the overlay "main.xul", so I have
// to call this manually, but only if it is called from messenger.xul
if (window.location.href == "chrome://messenger/content/messenger.xul") {
  main();
}

async function main() {
  await ConversionHelper.webExtensionStartupCompleted("main.xul / main.js");
  gQuicktext.loadLocales(document);
  await gQuicktext.loadSettings(false);
}

document.addEventListener('keydown', (event) => {
  const keyName = event.key;

  if (keyName === 'Control') {
    // do not alert when only Control key is pressed.
    return;
  }

  if (event.ctrlKey) {
    // Even though event.key is not 'Control' (e.g., 'a' is pressed),
    // event.ctrlKey may be true if Ctrl key is pressed at the same time.
    alert(`Combination of ctrlKey + ${keyName}`);
  } else {
    alert(`Key pressed ${keyName}`);
  }
}, false);

document.addEventListener('keyup', (event) => {
  const keyName = event.key;

  // As the user releases the Ctrl key, the key is no longer active,
  // so event.ctrlKey is false.
  if (keyName === 'Control') {
    alert('Control key was released');
  }
}, false);
