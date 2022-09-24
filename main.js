    // global var
var scene, renderer;

// light var
var light, spotLight1, spotLight2;
var ambient = true, lightSwitch = false;

// objects var
var startL, startL, street, finishL, bush1, bush2, tree1, tree2, streetL1, streetL2, car, truck, tractor, lightTargetLeft, lightTargetRight, vehicles, spawnPositions, vehiclesColors, rabbit, backHipLeft, backHipLeftR, backHipRight, backHipRightR, frontHipLeft, frontHipLeftR, frontHipRight, frontHipRightR;

// animations var
var firstJump;
var win = false;
var crash = false;
var crashFunction;

function enableAnimations() {
    for (let i = 0; i < vehicles.length; i++) {
        var time = Math.floor(1000+Math.random()*2500)
        if (vehicles[i].type == 0) {
            new TWEEN.Tween(vehicles[i].centralBlock.position).to({x: -vehicles[i].posX}, time).start().repeat(Infinity);
        } else {
            new TWEEN.Tween(vehicles[i].frontBlock.position).to({x: -vehicles[i].posX}, time).start().repeat(Infinity);
        }
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
        renderer.setClearColor(0x87ceeb);
        light = new THREE.AmbientLight(0xffffff, 1.2);
        scene.add( light );
    } else {
        renderer.setClearColor(0x2e4482);
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
    spawnPositions = [[-130, -37.5], [-130, -12.5], [130, 12.5], [130,37.5]]
    vehiclesColors = [0xff5733, 0xffbb33, 0xc1f33, 0x33ff6e, 0x33ffec, 0x335eff, 0xce33ff, 0xff3171];
    for (let i = 0; i < spawnPositions.length; i++) {
        var color = vehiclesColors[Math.floor(Math.random() * vehiclesColors.length+1)]
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

function rabbitPosition() {
    rabbit.rotation.x = THREE.Math.degToRad( 90 );
    rabbit.rotation.y = THREE.Math.degToRad( 180 );
    rabbit.position.set(0,-62,0.3);
    rabbit.scale.set(0.5,0.5,0.5);
    if (win) {
        alert("YOU WIN! CONGRATULATION!");
        win = false;
    }
    if (crash) {
        alert("CRASH!");
        crash = false;
    }
    firstJump = true;
    crashFunction = setInterval(checkCrash, 1);
}

function loadRabbitModel() {
    const loader = new THREE.GLTFLoader();
    loader.load( './rabbit/scene.gltf', function ( gltf ) {
        rabbit = gltf.scene;
        
        // pointer to back hips
        backHipLeft = rabbit.children[0].children[0].children[0].children[0].children[0].children[0].children[0].children[0].children[3];
        backHipRight = rabbit.children[0].children[0].children[0].children[0].children[0].children[0].children[0].children[0].children[0];
        backHipLeftR = rabbit.children[0].children[0].children[0].children[0].children[0].children[0].children[0].children[0].children[3].rotation.z;
        backHipRightR = rabbit.children[0].children[0].children[0].children[0].children[0].children[0].children[0].children[0].children[0].rotation.z;
        backHipLeftRY = rabbit.children[0].children[0].children[0].children[0].children[0].children[0].children[0].children[0].children[3].rotation.y;
        backHipRightRY = rabbit.children[0].children[0].children[0].children[0].children[0].children[0].children[0].children[0].children[0].rotation.y;

        // pointer to front hip
        frontHipLeft = rabbit.children[0].children[0].children[0].children[0].children[0].children[0].children[0].children[0].children[2].children[0].children[0].children[2].children[0]
        frontHipRight = rabbit.children[0].children[0].children[0].children[0].children[0].children[0].children[0].children[0].children[2].children[0].children[0].children[0].children[0]
        frontHipLeftR = rabbit.children[0].children[0].children[0].children[0].children[0].children[0].children[0].children[0].children[2].children[0].children[0].children[2].children[0].rotation.z
        frontHipRightR = rabbit.children[0].children[0].children[0].children[0].children[0].children[0].children[0].children[0].children[2].children[0].children[0].children[0].children[0].rotation.z
        frontHipLeftRY = rabbit.children[0].children[0].children[0].children[0].children[0].children[0].children[0].children[0].children[2].children[0].children[0].children[2].children[0].rotation.y
        frontHipRightRY = rabbit.children[0].children[0].children[0].children[0].children[0].children[0].children[0].children[0].children[2].children[0].children[0].children[0].children[0].rotation.y

	    scene.add( rabbit );
        rabbitPosition();
    }, undefined, function ( error ) {
	    console.error( error );
    } );
    
}

function jumpForward(offset) {
    var t0 = new TWEEN.Tween(rabbit.rotation).to({y: THREE.Math.degToRad( 180 )}, 100);
    
    var t2 = new TWEEN.Tween(backHipLeft.rotation).to({z: THREE.Math.degToRad( 30 )}, 200).onStart(function() {
        new TWEEN.Tween(backHipRight.rotation).to({z: THREE.Math.degToRad( -120 )}, 200).onStart(function() {
            new TWEEN.Tween(frontHipLeft.rotation).to({z: THREE.Math.degToRad( 120 )}, 200).onStart(function() {
                new TWEEN.Tween(frontHipRight.rotation).to({z: THREE.Math.degToRad( 120 )}, 200).onStart(function() {
                    new TWEEN.Tween(rabbit.position).to({y: rabbit.position.y+offset, z: rabbit.position.z+20}, 400).easing(TWEEN.Easing.Exponential.Out).start();
                }).start()
            }).start();
        }).start();
    });

    var t6 = new TWEEN.Tween(rabbit.position).to({y: rabbit.position.y+offset+7, z: rabbit.position.z}, 400).easing(TWEEN.Easing.Exponential.In).onStart(function() {
        new TWEEN.Tween(backHipLeft.rotation).to({z: backHipLeftR}, 200).onStart(function() {
            new TWEEN.Tween(backHipRight.rotation).to({z: backHipRightR}, 200).onStart(function() {
                new TWEEN.Tween(frontHipLeft.rotation).to({z: frontHipLeftR}, 200).onStart(function() {
                    new TWEEN.Tween(frontHipRight.rotation).to({z: frontHipRightR}, 200).start()
                }).start();
            }).start();
        }).start();
    }).onComplete(initAnimationListeners);
    
    t0.chain(t2.chain(t6)).start();
}

function jumpRight(offset) {
    var t0 = new TWEEN.Tween(rabbit.rotation).to({y: THREE.Math.degToRad( 90 )}, 100);
    
    var t2 = new TWEEN.Tween(backHipLeft.rotation).to({z: THREE.Math.degToRad( 30 )}, 200).onStart(function() {
        new TWEEN.Tween(backHipRight.rotation).to({z: THREE.Math.degToRad( -120 )}, 200).onStart(function() {
            new TWEEN.Tween(frontHipLeft.rotation).to({z: THREE.Math.degToRad( 120 )}, 200).onStart(function() {
                new TWEEN.Tween(frontHipRight.rotation).to({z: THREE.Math.degToRad( 120 )}, 200).onStart(function() {
                    new TWEEN.Tween(rabbit.position).to({x: rabbit.position.x+offset, z: rabbit.position.z+20}, 400).easing(TWEEN.Easing.Exponential.Out).start();
                }).start()
            }).start();
        }).start();
    });

    var t6 = new TWEEN.Tween(rabbit.position).to({x: rabbit.position.x+offset+7, z: rabbit.position.z}, 400).easing(TWEEN.Easing.Exponential.In).onStart(function() {
        new TWEEN.Tween(backHipLeft.rotation).to({z: backHipLeftR}, 200).onStart(function() {
            new TWEEN.Tween(backHipRight.rotation).to({z: backHipRightR}, 200).onStart(function() {
                new TWEEN.Tween(frontHipLeft.rotation).to({z: frontHipLeftR}, 200).onStart(function() {
                    new TWEEN.Tween(frontHipRight.rotation).to({z: frontHipRightR}, 200).start()
                }).start();
            }).start();
        }).start();
    }).onComplete(initAnimationListeners);
    
    t0.chain(t2.chain(t6)).start();
}

function jumpLeft(offset) {
    var t0 = new TWEEN.Tween(rabbit.rotation).to({y: THREE.Math.degToRad( 270 )}, 100);
    
    var t2 = new TWEEN.Tween(backHipLeft.rotation).to({z: THREE.Math.degToRad( 30 )}, 200).onStart(function() {
        new TWEEN.Tween(backHipRight.rotation).to({z: THREE.Math.degToRad( -120 )}, 200).onStart(function() {
            new TWEEN.Tween(frontHipLeft.rotation).to({z: THREE.Math.degToRad( 120 )}, 200).onStart(function() {
                new TWEEN.Tween(frontHipRight.rotation).to({z: THREE.Math.degToRad( 120 )}, 200).onStart(function() {
                    new TWEEN.Tween(rabbit.position).to({x: rabbit.position.x-offset, z: rabbit.position.z+20}, 400).easing(TWEEN.Easing.Exponential.Out).start();
                }).start()
            }).start();
        }).start();
    });


    var t6 = new TWEEN.Tween(rabbit.position).to({x: rabbit.position.x-offset-7, z: rabbit.position.z}, 400).easing(TWEEN.Easing.Exponential.In).onStart(function() {
        new TWEEN.Tween(backHipLeft.rotation).to({z: backHipLeftR}, 200).onStart(function() {
            new TWEEN.Tween(backHipRight.rotation).to({z: backHipRightR}, 200).onStart(function() {
                new TWEEN.Tween(frontHipLeft.rotation).to({z: frontHipLeftR}, 200).onStart(function() {
                    new TWEEN.Tween(frontHipRight.rotation).to({z: frontHipRightR}, 200).start()
                }).start();
            }).start();
        }).start();
    }).onComplete(initAnimationListeners);
    
    t0.chain(t2.chain(t6)).start();
}


function initAnimationListeners() {
    if (rabbit != null && rabbit.position.y > 60) {
        win = true;
        rabbitPosition();
    }
    document.addEventListener('keypress', (event) => {
        var offset = 20;
        if (firstJump) {
            offset -= 5;
            firstJump = false;
        }
        if (event.code == "KeyW") jumpForward(offset);
        else if (event.code == "KeyD") jumpRight(offset);
        else if (event.code == "KeyA") jumpLeft(offset);
        else initAnimationListeners ();
    }, {once: true});
}

function init() {
    width = 768,
    height = 768;
  
    scene = new THREE.Scene();
    
    camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    renderer = new THREE.WebGLRenderer();

    
	renderer.setSize(width, height);
    document.body.appendChild(renderer.domElement);

    initListeners();
    createAmbient();
    spawnVehicles();
    refreshLight();
    enableAnimations();
    loadRabbitModel();
    initAnimationListeners();

    camera.position.set(0, -90, 150);
    camera.lookAt(scene.position);
    render();
}
function crashAnimation() {
   
    var t0 = new TWEEN.Tween(backHipLeft.rotation).to({y: THREE.Math.degToRad( 90 )}, 200).onStart(function() {
        new TWEEN.Tween(backHipRight.rotation).to({y: THREE.Math.degToRad( -60 )}, 200).onStart(function() {
            new TWEEN.Tween(frontHipLeft.rotation).to({y: THREE.Math.degToRad( 60 )}, 200).onStart(function() {
                new TWEEN.Tween(frontHipRight.rotation).to({y: THREE.Math.degToRad( 60 )}, 200).onStart(function() {
                    new TWEEN.Tween(rabbit.position).to({ z: rabbit.position.z+50}, 500).easing(TWEEN.Easing.Exponential.Out).start();
                }).start()
            }).start();
        }).start();
    });

    var t1 = new TWEEN.Tween(rabbit.position).to({ z: rabbit.position.z}, 500).easing(TWEEN.Easing.Exponential.In).onStart(function() {
        new TWEEN.Tween(backHipLeft.rotation).to({y: backHipLeftRY}, 200).onStart(function() {
            new TWEEN.Tween(backHipRight.rotation).to({y: backHipRightRY}, 200).onStart(function() {
                new TWEEN.Tween(frontHipLeft.rotation).to({y: frontHipLeftRY}, 200).onStart(function() {
                    new TWEEN.Tween(frontHipRight.rotation).to({y: frontHipRightRY}, 200).start()
                }).start();
            }).start();
        }).start();
    }).onComplete(rabbitPosition);
    
    t0.chain(t1).start();
}

function checkCrash() {
    if (rabbit != null) {
        var rabbitPosX = rabbit.position.x;
        var rabbitPosY = rabbit.position.y;
        var rabbitPosZ = rabbit.position.z;
        for (let i = 0; i < vehicles.length; i++) {
            var vehicle = vehicles[i];
            var vehicleType = vehicle.type
            var offsetX;
            var offsetY;
            var offsetZ;
            var vehiclePosX;
            var vehiclePosY;
            var vehiclePosZ;
            if (vehicleType == 0) {
                offsetX = 19.5;
                offsetY = 6.5;
                offsetZ = 6.5;
                vehiclePosX = vehicle.centralBlock.position.x
                vehiclePosY = vehicle.centralBlock.position.y
                vehiclePosZ = vehicle.centralBlock.position.z
            } else if (vehicleType == 1) {
                offsetX = 14.25;
                offsetY = 6.5;
                offsetZ = 8;
                vehiclePosX = vehicle.frontBlock.position.x
                vehiclePosY = vehicle.frontBlock.position.y
                vehiclePosZ = vehicle.frontBlock.position.z
            } else {
                offsetX = 9;
                offsetY = 4;
                offsetZ = 8;
                vehiclePosX = vehicle.frontBlock.position.x
                vehiclePosY = vehicle.frontBlock.position.y
                vehiclePosZ = vehicle.frontBlock.position.z
            }
            if (Math.abs(rabbitPosX-vehiclePosX) < offsetX) {
                if (Math.abs(rabbitPosY-vehiclePosY) < offsetY) {
                    if (Math.abs(rabbitPosZ-vehiclePosZ) < offsetZ) {
                        crash = true;
                        clearInterval(crashFunction);
                        crashAnimation();
                    }
                }
            }
        }
    }
}

function render() {
    if (lightSwitch) refreshLight();
    requestAnimationFrame( render );
    TWEEN.update() 
    renderer.render(scene, camera);    
}

init();