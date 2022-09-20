class Car {
    constructor(col) {
        // central block
        this.carTexture = new THREE.TextureLoader().load('texture/car.jpg');
        this.carTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();

        this.centralBlockGeometry = new THREE.BoxBufferGeometry(18, 10, 10 );
        this.centralBlockMaterial = new THREE.MeshPhongMaterial({ map: this.carTexture, color: col });
        this.centralBlock = new THREE.Mesh(this.centralBlockGeometry, this.centralBlockMaterial);
        this.centralBlock.position.set(0,0,5);

        // front block
        this.frontBlockGeometry = new THREE.BoxBufferGeometry(10, 10, 5 );
        this.frontBlockMaterial = new THREE.MeshPhongMaterial({ map: this.carTexture, color: col });
        this.frontBlock = new THREE.Mesh(this.frontBlockGeometry, this.frontBlockMaterial);
        this.frontBlock.position.set(-13,0,-2.5);
        this.centralBlock.add(this.frontBlock);

        // front wheels
        this.wheelTexture = new THREE.TextureLoader().load('texture/wheel.jpg');
        this.wheelTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();
        
        this.rightFrontWheelGeometry = new THREE.CircleGeometry(3,12);
        this.rightFrontWheelMaterial = new THREE.MeshPhongMaterial({map: this.wheelTexture})
        this.rightFrontWheel = new THREE.Mesh(this.rightFrontWheelGeometry, this.rightFrontWheelMaterial);
        this.rightFrontWheel.rotation.x = THREE.Math.degToRad( 90 );
        this.rightFrontWheel.position.set(0,5.1,-2.5)
        this.frontBlock.add(this.rightFrontWheel);

        this.leftFrontWheelGeometry = new THREE.CircleGeometry(3,12);
        this.leftFrontWheelMaterial = new THREE.MeshPhongMaterial({map: this.wheelTexture})
        this.leftFrontWheel = new THREE.Mesh(this.leftFrontWheelGeometry, this.leftFrontWheelMaterial);
        this.leftFrontWheel.rotation.x = THREE.Math.degToRad( 90 );
        this.leftFrontWheel.position.set(0,-5.1,-2.5)
        this.frontBlock.add(this.leftFrontWheel);

        // frontlights
        this.leftFrontLightGeometry = new THREE.BoxBufferGeometry (1,1,0);
        this.frontLightTexture = new THREE.TextureLoader().load('texture/frontLight.jpg');
        this.frontLightTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();
        this.leftFrontLightMaterial = new THREE.MeshPhongMaterial({map: this.frontLightTexture})
        this.leftFrontLight = new THREE.Mesh(this.leftFrontLightGeometry, this.leftFrontLightMaterial)
        this.frontBlock.add(this.leftFrontLight)
        this.leftFrontLight.position.set(-5.1,-2.5,0);

        this.rightFrontLightGeometry = new THREE.BoxBufferGeometry (1,1,0);
        this.rightFrontLightMaterial = new THREE.MeshPhongMaterial({map: this.frontLightTexture})
        this.rightFrontLight = new THREE.Mesh(this.rightFrontLightGeometry, this.rightFrontLightMaterial)
        this.frontBlock.add(this.rightFrontLight)
        this.rightFrontLight.position.set(-5.1,2.5,0);

        // back block
        this.backBlockGeometry = new THREE.BoxBufferGeometry(10, 10, 5 );
        this.backBlockMaterial = new THREE.MeshPhongMaterial({ map: this.carTexture, color: col });
        this.backBlock = new THREE.Mesh(this.backBlockGeometry, this.backBlockMaterial);
        this.backBlock.position.set(13,0,-2.5);
        this.centralBlock.add(this.backBlock);

        // back wheels
        this.rightBackWheelGeometry = new THREE.CircleGeometry(3,12);
        this.rightBackWheelMaterial = new THREE.MeshPhongMaterial({map: this.wheelTexture})
        this.rightBackWheel = new THREE.Mesh(this.rightBackWheelGeometry, this.rightBackWheelMaterial);
        this.rightBackWheel.rotation.x = THREE.Math.degToRad( 90 );
        this.rightBackWheel.position.set(0,5.1,-2.5)
        this.backBlock.add(this.rightBackWheel);

        this.leftBackWheelGeometry = new THREE.CircleGeometry(3,12);
        this.leftBackWheelMaterial = new THREE.MeshPhongMaterial({map: this.wheelTexture})
        this.leftBackWheel = new THREE.Mesh(this.leftBackWheelGeometry, this.leftBackWheelMaterial);
        this.leftBackWheel.rotation.x = THREE.Math.degToRad( 90 );
        this.leftBackWheel.position.set(0,-5.1,-2.5)
        this.backBlock.add(this.leftBackWheel);

        // taillights
        this.leftBackLightGeometry = new THREE.BoxBufferGeometry (1,1,0);
        this.backLightTexture = new THREE.TextureLoader().load('texture/backLight.jpg');
        this.backLightTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();
        this.leftBackLightMaterial = new THREE.MeshPhongMaterial({map: this.backLightTexture})
        this.leftBackLight = new THREE.Mesh(this.leftBackLightGeometry, this.leftBackLightMaterial)
        this.backBlock.add(this.leftBackLight)
        this.leftBackLight.position.set(5.1,-2.5,0);

        this.rightBackLightGeometry = new THREE.BoxBufferGeometry (1,1,0);
        this.rightBackLightMaterial = new THREE.MeshPhongMaterial({map: this.backLightTexture})
        this.rightBackLight = new THREE.Mesh(this.rightBackLightGeometry, this.rightBackLightMaterial)
        this.backBlock.add(this.rightBackLight)
        this.rightBackLight.position.set(5.1,2.5,0);

        this.centralBlock.position.z+=3
        this.centralBlock.position.y+=10
        this.centralBlock.scale.set(0.8, 1, 0.8)
    }    
}

class Tractor {
    constructor() {
        
    }    
}

class Truck {
    constructor() {
        
    }    
}