async function cookie(){
    const cookie = await browser.cookies.get({name: '.ROBLOSECURITY', url: 'https://www.roblox.com'});;
    console.log(cookie.value);
    
    var tempInput = document.createElement('input');
    tempInput.setAttribute('type', 'text');
    tempInput.setAttribute('value', cookie.value);
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);
}

if (browser) {
    browser.menus.create(
        {
            id: "get-cookie",
            title: "copy cookie",
            contexts: ["all"],
        }
    );

    browser.menus.create(
        {
            id: "rem-cookie",
            title: "remove cookie",
            contexts: ["all"],
        }
    );

    browser.menus.create(
        {
            id: "goto-settings",
            title: "goto settings",
            contexts: ["all"],
        }
    );

    browser.menus.onClicked.addListener((info, tab) => {
        switch (info.menuItemId) {
            case "get-cookie":
                cookie()
                break;
            case "rem-cookie":
                browser.cookies.remove({name: '.ROBLOSECURITY', url: 'https://www.roblox.com'})
                    .then(() => {
                        browser.tabs.update(tab.id, {url: "https://www.roblox.com/?returnUrl="+encodeURIComponent(tab.url)});
                    });
                break;
            case "goto-settings":
                browser.tabs.update(tab.id, {url: "https://www.roblox.com/my/account"});
                break;
        }
    });
}