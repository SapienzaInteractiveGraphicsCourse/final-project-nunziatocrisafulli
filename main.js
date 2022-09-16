
init();

function createAmbient() {
    TODO
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
    width = window.innerWidth,
    height = window.innerHeight;
  
    scene = new THREE.Scene();
    
    camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.lookAt(scene.position);
    camera.position.set(0, 0, 0);

    renderer = new THREE.WebGLRenderer();

	renderer.setClearColor(0x00000000);
	renderer.setSize(width, height);

    //createAmbient();
    //createObjects();
    //enableAnimations();
    //runGame();

    render();
}

function render() {
    requestAnimationFrame( render );
    renderer.render(scene, camera);    
}