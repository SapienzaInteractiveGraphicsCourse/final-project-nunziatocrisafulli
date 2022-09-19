// global var
var scene, renderer;

// light var
var light, spotLight1, spotLight2;
var ambient = true, lightSwitch = false;

// objects var
var startL, startL, street, finishL, bush1, bush2, tree1, tree2, streetL1, streetL2;



function initListeners() {
    document.getElementById("lightSwitch").onclick = function(){lightSwitch = true};
}

function refreshLight() {

    if (lightSwitch) {
        scene.remove(light);
        scene.remove(spotLight1);
        scene.remove(spotLight2);
        lightSwitch=!lightSwitch;
        ambient=!ambient;
    }

    if (ambient == true) {
        light = new THREE.AmbientLight(0xffffff, 1);
        scene.add( light );
    } else {
        light = new THREE.AmbientLight(0xffffff, 0.5 );
        scene.add( light );

        spotLight1 = new THREE.SpotLight( 0xffffff, 1 );
        spotLight1.position.set( 55, -62, 18 );
        spotLight1.penumbra = 0.05;
        spotLight1.decay = 8;
        spotLight1.distance = 500;
        spotLight1.shadow.mapSize.width = 1024;
        spotLight1.shadow.mapSize.height = 1024;
        spotLight1.shadow.camera.near = 10;
        spotLight1.shadow.camera.far = 200;
        scene.add( spotLight1 );

        spotLight2 = new THREE.SpotLight( 0xffffff, 1 );
        spotLight2.position.set( -55, 62,  18);
        spotLight2.penumbra = 0.05;
        spotLight2.decay = 8;
        spotLight2.distance = 500;
        spotLight2.shadow.mapSize.width = 1024;
        spotLight2.shadow.mapSize.height = 1024;
        spotLight2.shadow.camera.near = 10;
        spotLight2.shadow.camera.far = 200;
        scene.add( spotLight2 );
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

function createObjects() {
    TODO
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
    
    camera = new THREE.PerspectiveCamera(80, width / height, 0.1, 1000);
    renderer = new THREE.WebGLRenderer();

    renderer.setClearColor(0x00000000);
	renderer.setSize(width, height);
    document.body.appendChild(renderer.domElement);

    initListeners();
    createAmbient();
    //createObjects();
    //enableAnimations();
    //runGame();

    camera.position.set(0, -40, 120); // x, y, z move along y to follow animal
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