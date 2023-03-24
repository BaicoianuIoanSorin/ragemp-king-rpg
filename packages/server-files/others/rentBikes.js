var struct = require('../struct.js');
require('../mysql.js');
require('../index.js');

const rentBikeSpawn = [
    [-1038.108, -2727.862, 20.068, -123.50635528564453], // 1 (vehicle)
    [-1028.713, -2730.226, 20.176, -97.68315124511719], // 1 (vehicle)
    [-1036.058, -2734.067, 20.169, -56.126529693603516], // 1 (vehicle)
    [-1034.003, -2728.060, 20.162, -124.82415771484375 ], // 1 (vehicle)

];

//Loaded from database informations
gm.mysql.handle.query('SELECT * FROM server_rent_bikes', [], function (error, results, fields) {
    for (let i = 0; i < results.length; i++) {

        struct.rentBike[i].rentModelID = results[i].rentID;

        struct.rentBike[i].rentModelName = results[i].rentModel;
        struct.rentBike[i].rentModelPrice = results[i].rentPrice;
        struct.rentBike[i].rentModelStock = results[i].rentStock;

        loaded_rentBike_count++;
    }

    console.log(`[MYSQL] Loaded rent bikes: ${loaded_rentBike_count.toString()}`);
});


//Blip, text, etc
mp.markers.new(1, new mp.Vector3(-1039.499, -2731.480, 20.188), 1, {
    color: [246, 205, 97, 200],
    dimension: 0
});

mp.blips.new(409, new mp.Vector3(-1039.499, -2731.480, 20.188), {
    name: 'Rent bikes',
    color: 70,
    shortRange: true,
    dimension: 0
});

mp.labels.new(`~r~Rent bike~s~\nUse [~r~/rentbike~s~] to rent a bike.`, new mp.Vector3(-1039.499, -2731.480, 20.188),
    {
        los: true,
        font: 4,
        drawDistance: 50,
    });

//Commands and functions
mp.events.addCommand('rentbike', (player) => {
    let rentString = '';

    if(loaded_rentBike_count == 0)
        return sendMessage(player, 'ffffff', "No bike is available for rent.");

    if(!player.IsInRange(-1039.499, -2731.480, 20.188, 5))
        return sendMessage(player, 'FFFFFF', `You are not at Rent Bike place.`);

    for(let x = 0; x < loaded_rentBike_count; x++)
    {
        rentString += `<tr><td>${x + 1}</td><td>${struct.rentBike[x].rentModelName}</td><td>${player.formatMoney(struct.rentBike[x].rentModelPrice, 0)}$</td><td>${struct.rentBike[x].rentModelStock}</td><td><button class="btn btn-success btn-sm" id = "rentAVehicle" onclick = "sendRentInfo(${struct.rentBike[x].rentModelID});">Rent</button></td> </tr>`;
    }

    player.call("showRentBikeBrowser", [player, rentString]);
});

mp.events.add('playerPressRentBikeButton', (player, type) => {

    const x = (type - 1);
    const spawn = rentBikeSpawn[Math.floor(Math.random() * rentBikeSpawn.length)];

    if(player.getVariable('bikeRentedTime') > 0)
        return sendMessage(player, 'FFFFFF', `You already have a bike rented.`);

    if(struct.rentBike[x].rentModelPrice > player.data.money)
        return sendMessage(player, 'FFFFFF', `You don't have enough money to rent this vehicle.`);

    player.setVariable('bikeRentedTime', (60 * 30));
    player.giveMoney(1, struct.rentBike[x].rentModelPrice);

    player.data.rentedBike = player.createVehicle(player, struct.rentBike[x].rentModelName, new mp.Vector3(spawn[0], spawn[1], spawn[2]), generateRGB(), generateRGB(), spawn[3], 1);

    player.call("closePlayerRentBikeBrowser");

    struct.rentBike[x].rentModelStock = struct.rentBike[x].rentModelStock - parseInt(1);
    mysql_action('UPDATE `server_rent_bikes` SET rentStock = ? WHERE rentID = ? LIMIT 1', [struct.rentBike[x].rentModelStock, struct.rentBike[x].rentModelID]);

    sendMessage(player, 'FFFFFF', `------------------!{ff4d4d}(Rent bikes):!{ffffff}----------------`);
    sendMessage(player, 'FFFFFF', `Bike rented this !{ff4d4d}${struct.rentBike[x].rentModelName}!{ffffff} for !{ff4d4d}${player.formatMoney(struct.rentBike[x].rentModelPrice, 0)}!{ffffff}$`);
    sendMessage(player, 'FFFFFF', `This vehicle is available for !{ff4d4d}30:00!{ffffff} minutes.`);
    sendMessage(player, 'FFFFFF', `------------------------------------------------------`);
});

mp.events.add("timerRentBike", (player) => {

    const last = player.getVariable('bikeRentedTime');
    player.setVariable('bikeRentedTime', (last - 1));

    switch(player.getVariable('bikeRentedTime'))
    {
        case 0:
        {
            player.data.rentedBike.destroy();

            sendMessage(player, 'ff4d4d', `(Rent timer):!{ffffff} Your bike has been despawned because time expired.`);
            break;
        }
        case 300:
        {
            sendMessage(player, 'ff4d4d', `(Rent timer):!{ffffff} Your bike has been despawned in ${Calculate(player.getVariable('bikeRentedTime'))}.`);
            break;
        }
    }
});


mp.events.addCommand('unrentbike', (player) => {

    if(player.getVariable('bikeRentedTime') === 0)
        return sendMessage(player, 'ffffff', 'You not rented a bike.');

    player.setVariable('bikeRentedTime', 0);
    player.data.rentedBike.destroy();
    sendMessage(player, 'ff4d4d', `(Rent bike):!{ffffff} You unrented this bike.`);
});