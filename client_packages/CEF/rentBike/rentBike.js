let rentBikeBrowser = null;
let dealershipBrowser = null;  
  
//Rent car browser
mp.events.add('showRentBikeBrowser', (player, text) => {

    if(rentBikeBrowser == null) rentBikeBrowser = mp.browsers.new("package://CEF/rentBike/rentBike.html");
    mp.gui.cursor.visible = true; 
 
    rentBikeBrowser.execute(`document.getElementById('rentBikeInfo-placeholder').innerHTML = '${text}'`);
});
 
function sendRentInfo(state) { mp.trigger("sendRentBikeInfo2", state); }
mp.events.add("sendRentBikeInfo2", (state) => {

    switch(state)
    {
        case 0:
        {
            if(rentBikeBrowser != null) {
                rentBikeBrowser.destroy();

                rentBikeBrowser = null;
                mp.gui.cursor.visible = false;  
                return;
            } 
        }
        default: return mp.events.callRemote("playerPressRentBikeButton", state);
    } 
});
 
mp.events.add('closePlayerRentBikeBrowser', () => {

    if(rentBikeBrowser != null) {
        rentBikeBrowser.destroy();

        rentBikeBrowser = null;
        mp.gui.cursor.visible = false;
        return; 
    } 
}); 