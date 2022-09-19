var scene, renderer, light, spotLight1, spotLight2;
var ambient = true;

function switchLight(streetL1, streetL2) {
    if (ambient == true) {
        light = new THREE.AmbientLight(0xffffff, 1 );
        scene.add( light );
    } else {
        scene.remove(light)
        light = new THREE.AmbientLight(0xffffff, 0.5 );
        scene.add( light );
    }
}

function createAmbient() {
    var startL = new startLawn();
    var street = new Street();
    var finishL = new finishLawn();
    var bush1 = new Bush(-35);
    var bush2 = new Bush(35);
    var tree1 = new Tree(-35);
    var tree2 = new Tree(35);
    var streetL1 = new streetLamp(55, -62);
    var streetL2 = new streetLamp(-55, 62);
    switchLight(streetL1, streetL2);
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

    createAmbient();
    //createObjects();
    //enableAnimations();
    //runGame();

    camera.position.set(0, -40, 120); // x, y, z move along y to follow animal
    camera.lookAt(scene.position);
    render();
}

function render() {
    requestAnimationFrame( render );
    renderer.render(scene, camera);    
}

init();