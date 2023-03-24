//Create browser
let loginBrowser = mp.browsers.new("package://CEF/serverLoginReg/index.html");
//Create camera
let camera = mp.cameras.new("camera", new mp.Vector3(-2019.26, -1194.51, 138.71), new mp.Vector3(-10, 0, 15), 55);
camera.pointAtCoord(-1258.393310546875, -1317.548583984375, 3.0165023803710938); 
camera.setActive(true);
mp.game.cam.renderScriptCams(true, false, 0, true, false); 
 
setTimeout(() => {
    
    mp.gui.cursor.visible = true;   

}, 1000);


// mp.events.add("playerReady", async () => {
//     let userName = mp.players.local.name;
//     var registeredAlready = await mp.events.callRemoteProc("playerIsRegisteredAlready", userName);
    
//     if(registeredAlready) browserInitiated = mp.browsers.new("package://CEF/serverLoginReg/login/index.html"); 
//     else {
//         browserInitiated = mp.browsers.new("package://CEF/serverLoginReg/register/index.html");
//         browserInitiated.execute(`execute(${userName})`);
//     }
//     console.log(registeredAlready);
// })

   
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
 