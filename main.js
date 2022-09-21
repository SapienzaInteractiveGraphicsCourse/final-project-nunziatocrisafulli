// global var
var scene, renderer;

// light var
var light, spotLight1, spotLight2;
var ambient = true, lightSwitch = false;

// objects var
var startL, startL, street, finishL, bush1, bush2, tree1, tree2, streetL1, streetL2, car, truck, tractor, lightTargetLeft, lightTargetRight, vehicles, spawnPositions, vehiclesColors;

function vehiclesAnimation() {
    for (let i = 0; i < vehicles.length; i++) {
        var velocity = Math.floor(Math.random() * 2);
        vehicles[i].startAnimation(velocity);
    }
}

function initListeners() {
    document.getElementById("lightSwitch").onclick = function(){lightSwitch = true};
}

function turnOffVehiclesLights() {
    for (let i = 0; i < vehicles.length; i++) {
        vehicles[i].headLight1.intensity = 0.0;
        vehicles[i].headLight2.intensity = 0.0;
        vehicles[i].tailLight1.intensity = 0.0;
        vehicles[i].tailLight1.intensity = 0.0;
    }
}

function turnOnVehiclesLights() {
    for (let i = 0; i < vehicles.length; i++) {
        vehicles[i].headLight1.intensity = 0.5;
        vehicles[i].headLight2.intensity = 0.5;
        vehicles[i].tailLight1.intensity = 0.2;
        vehicles[i].tailLight1.intensity = 0.2;
    }
}

function refreshLight() {

    if (lightSwitch) {
        scene.remove(light);
        streetL1.headLamp.remove( spotLight1 );
        streetL2.headLamp.remove( spotLight2 );
        turnOffVehiclesLights()
        lightSwitch=!lightSwitch;
        ambient=!ambient;
    }

    if (ambient == true) {
        light = new THREE.AmbientLight(0xffffff, 1.2);
        scene.add( light );
    } else {
        light = new THREE.AmbientLight(0xffffff, 0.5 );
        scene.add( light );

        spotLight1 = new THREE.SpotLight( 0xffffff, 1 );
        spotLight1.penumbra = 0.05;
        spotLight1.decay = 8;
        spotLight1.distance = 500;
        spotLight1.shadow.mapSize.width = 1024;
        spotLight1.shadow.mapSize.height = 1024;
        spotLight1.shadow.camera.near = 10;
        spotLight1.shadow.camera.far = 200;
        streetL1.headLamp.add( spotLight1 );

        spotLight2 = new THREE.SpotLight( 0xffffff, 1 );
        spotLight2.penumbra = 0.05;
        spotLight2.decay = 8;
        spotLight2.distance = 500;
        spotLight2.shadow.mapSize.width = 1024;
        spotLight2.shadow.mapSize.height = 1024;
        spotLight2.shadow.camera.near = 10;
        spotLight2.shadow.camera.far = 200;
        streetL2.headLamp.add( spotLight2 );

        turnOnVehiclesLights();
    }

    lightSwitch = false;
}

function createAmbient() {
    startL = new startLawn();
    street = new Street();
    finishL = new finishLawn();
    bush1 = new Bush(-35);
    bush2 = new Bush(35);
    tree1 = new Tree(-35);
    tree2 = new Tree(35);
    streetL1 = new streetLamp(55, -62);
    streetL2 = new streetLamp(-55, 62);
    lightTargetLeft =  new THREE.Object3D();
    lightTargetLeft.position.set(-1000,0,0);
    lightTargetRight = new THREE.Object3D();
    lightTargetRight.position.set(1000,0,0);
    scene.add(lightTargetLeft);
    scene.add(lightTargetRight);
}

function spawnVehicles() {
    vehicles = [];
    spawnPositions = [[-60, -37.5], [-60, -12.5], [60, 12.5], [60,37.5]]
    vehiclesColors = [0xff5733, 0xffbb33, 0xc1f33, 0x33ff6e, 0x33ffec, 0x335eff, 0xce33ff, 0xff3171];
    for (let i = 0; i < spawnPositions.length; i++) {
        var color = vehiclesColors[Math.floor(Math.random() * vehiclesColors.length)]
        var vehicleIndex = Math.floor(Math.random() * 3);
        if (vehicleIndex == 0) {
            if (spawnPositions[i][0] < 0) var vehicle = new Car(spawnPositions[i][0], spawnPositions[i][1], color, lightTargetRight, lightTargetLeft);
            else var vehicle = new Car(spawnPositions[i][0], spawnPositions[i][1], color, lightTargetLeft, lightTargetRight);
            scene.add(vehicle.centralBlock);
            vehicles.push(vehicle)
        } else if (vehicleIndex == 1) {
            if (spawnPositions[i][0] < 0) var vehicle = new Truck(spawnPositions[i][0], spawnPositions[i][1], color, lightTargetRight, lightTargetLeft);
            else var vehicle = new Truck(spawnPositions[i][0], spawnPositions[i][1], color, lightTargetLeft, lightTargetRight);
            scene.add(vehicle.frontBlock);
            vehicles.push(vehicle)
        } else {
            if (spawnPositions[i][0] < 0) var vehicle = new Tractor(spawnPositions[i][0], spawnPositions[i][1], color, lightTargetRight, lightTargetLeft);
            else var vehicle = new Tractor(spawnPositions[i][0], spawnPositions[i][1], color, lightTargetLeft, lightTargetRight);
            scene.add(vehicle.frontBlock);
            vehicles.push(vehicle)
        }
    }
}

function enableAnimations() {
    TODO
}

function runGame() {
    TODO
}

function init() {
    width = 768,
    height = 768;
  
    scene = new THREE.Scene();
    
    camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    renderer = new THREE.WebGLRenderer();

    renderer.setClearColor(0xffffff);
	renderer.setSize(width, height);
    document.body.appendChild(renderer.domElement);

    initListeners();
    createAmbient();
    spawnVehicles();
    refreshLight();
    //enableAnimations();
    //runGame();

    camera.position.set(0, -200, 150);
    //camera.position.set(0, 0, 120);
    //camera.position.set(0, -40, 0);
    //camera.position.set(-40, 0, 0);
    camera.lookAt(scene.position);
    render();
}

function render() {
    if (lightSwitch) {
        refreshLight();
    }
    //vehiclesAnimation();
    requestAnimationFrame( render );
    renderer.render(scene, camera);    
}

init();