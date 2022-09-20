// global var
var scene, renderer;

// light var
var light, spotLight1, spotLight2;
var ambient = true, lightSwitch = false;

// objects var
var startL, startL, street, finishL, bush1, bush2, tree1, tree2, streetL1, streetL2, car;
var vehicles = [];



function initListeners() {
    document.getElementById("lightSwitch").onclick = function(){lightSwitch = true};
}

function turnOffVehiclesLights() {
    TODO
}

function turnOnVehiclesLights() {
    TODO
}

function refreshLight() {

    if (lightSwitch) {
        scene.remove(light);
        streetL1.headLamp.remove( spotLight1 );
        streetL2.headLamp.remove( spotLight2 );
        //turnOffVehiclesLights()
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

        //turnOnVehiclesLights();
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
    refreshLight();
}

function spawnVehicles() {
   //car = new Car(0xee4b2b);
   //scene.add(car.centralBlock)
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
    //enableAnimations();
    //runGame();

    camera.position.set(0, -200, 150); // x, y, z move along y to follow animal
    //camera.position.set(0, 0, 120);
    //camera.position.set(0, -40, 50);
    //camera.position.set(-40, 0, 0);
    camera.lookAt(scene.position);
    render();
}

function render() {
    if (lightSwitch) {
        refreshLight();
    }
    requestAnimationFrame( render );
    renderer.render(scene, camera);    
}

init();