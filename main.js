var scene, renderer;
var xAxis = 0;
var yAxis = 1;
var zAxis = 2;
var axis = -1

init();

function createAmbient() {
    var startL = new startLawn();
    var street = new Street();
    var finishL = new finishLawn();
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
    
    camera = new THREE.PerspectiveCamera(120, width / height, 0.1, 1000);
    renderer = new THREE.WebGLRenderer();

    renderer.setClearColor(0x00000000);
	renderer.setSize(width, height);
    document.body.appendChild(renderer.domElement);

    createAmbient();
    //createObjects();
    //enableAnimations();
    //runGame();

    camera.position.set(0, 0, 20);
    camera.lookAt(scene.position);
    render();
}

function render() {
    requestAnimationFrame( render );
    renderer.render(scene, camera);    
}