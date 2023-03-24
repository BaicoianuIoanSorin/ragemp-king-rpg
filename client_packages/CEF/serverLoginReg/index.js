//Create browser
var loginBrowser = mp.browsers.new("package://CEF/serverLoginReg/index.html"); 

//Create camera
let camera = mp.cameras.new("camera", new mp.Vector3(877.3869018554688, 917.0142211914062,  369.2461242675781), new mp.Vector3(-10, 0, 15), 55);
camera.pointAtCoord(496.5565185546875, 1254.3896484375, 293.2616882324219);
camera.setActive(true);
mp.game.cam.renderScriptCams(true, false, 0, true, false); 
 
setTimeout(() => {
    
    mp.gui.cursor.visible = true;   

}, 1000);

   
mp.events.add("checkData", (state, loginName, loginPass, playerEmail) => { 
   
    //                                                 ------Login------    ---Register---
    mp.events.callRemote("loginConnectPlayer", state, loginName, loginPass,  playerEmail);
}); 
 
mp.events.add("destroyLoginBrowser", () => { 

    if(loginBrowser)
    {
        //Destroy browser
        loginBrowser.destroy();
        loginBrowser = null;

        mp.gui.cursor.visible = false;   
 
        //Destroy camera 
        if(camera)
        {
            camera.destroy();
            camera = null;
        }
       
        //camera.destroy();
        mp.game.cam.renderScriptCams(false, false, 3000, true, true); 
        
        //Show chat
        mp.events.call("ToggleChatBoxActive", true); 

        //Hide cursor
        mp.gui.cursor.visible = false;  
 
        mp.players.local.freezePosition(false);   
    } 
});
  
function preloadAccountInfo(state) {

    //Login account
    const loginName = document.getElementById("loginName");
    const loginPass = document.getElementById("loginPass");
 
    //Register account 
    const playerEmail = document.getElementById("registerEmail");
 

    //                             -------------Login--------------  ------Register-----
    mp.trigger("checkData", state, loginName.value, loginPass.value, playerEmail.value);
} 
 