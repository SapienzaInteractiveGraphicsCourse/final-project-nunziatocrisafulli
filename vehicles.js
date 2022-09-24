class Car {
    constructor(posX, posY, col, headTarget, tailTarget) {
        this.type = 0;
        this.posX = posX;
        // central block
        this.carTexture = new THREE.TextureLoader().load('texture/car.jpg');
        this.carTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();

        this.normalTexture = new THREE.TextureLoader().load('texture/carNormal.jpg');
        this.normalTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();

        this.specularTexture = new THREE.TextureLoader().load('texture/carSpecular.jpg');
        this.specularTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();

        this.centralBlockGeometry = new THREE.BoxBufferGeometry(18, 10, 10 );
        this.centralBlockMaterial = new THREE.MeshPhongMaterial({ map: this.carTexture, normalMap: this.normalTexture, specularMap: this.specularTexture, color: col });
        this.centralBlock = new THREE.Mesh(this.centralBlockGeometry, this.centralBlockMaterial);
        this.centralBlock.position.set(0,0,5);

        // front block
        this.frontBlockGeometry = new THREE.BoxBufferGeometry(10, 10, 5 );
        this.frontBlockMaterial = new THREE.MeshPhongMaterial({ map: this.carTexture, normalMap: this.normalTexture, specularMap: this.specularTexture, color: col });
        this.frontBlock = new THREE.Mesh(this.frontBlockGeometry, this.frontBlockMaterial);
        this.frontBlock.position.set(-13,0,-2.5);
        this.centralBlock.add(this.frontBlock);

        // front wheels
        this.wheelTexture = new THREE.TextureLoader().load('texture/wheel.jpg');
        this.wheelTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();
        this.wheelNormalTexture = new THREE.TextureLoader().load('texture/wheelNormal.jpg');
        this.wheelNormalTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();
        this.wheelSpecularTexture = new THREE.TextureLoader().load('texture/wheelSpecular.jpg');
        this.wheelSpecularTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();
        
        this.rightFrontWheelGeometry = new THREE.CircleGeometry(3,12);
        this.rightFrontWheelMaterial = new THREE.MeshPhongMaterial({map: this.wheelTexture, normalMap: this.wheelNormalTexture, specularMap: this.wheelSpecularTexture})
        this.rightFrontWheel = new THREE.Mesh(this.rightFrontWheelGeometry, this.rightFrontWheelMaterial);
        this.rightFrontWheel.rotation.x = THREE.Math.degToRad( -90 );
        this.rightFrontWheel.position.set(0,5.1,-2.5)
        this.frontBlock.add(this.rightFrontWheel);

        this.leftFrontWheelGeometry = new THREE.CircleGeometry(3,12);
        this.leftFrontWheelMaterial = new THREE.MeshPhongMaterial({map: this.wheelTexture, normalMap: this.wheelNormalTexture, specularMap: this.wheelSpecularTexture})
        this.leftFrontWheel = new THREE.Mesh(this.leftFrontWheelGeometry, this.leftFrontWheelMaterial);
        this.leftFrontWheel.rotation.x = THREE.Math.degToRad( 90 );
        this.leftFrontWheel.position.set(0,-5.1,-2.5)
        this.frontBlock.add(this.leftFrontWheel);

        // frontlights
        this.leftFrontLightGeometry = new THREE.BoxBufferGeometry (1,1,0);
        this.frontLightTexture = new THREE.TextureLoader().load('texture/frontLight.jpg');
        this.frontLightTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();

        this.frontLightNormalTexture = new THREE.TextureLoader().load('texture/frontLightNormal.jpg');
        this.frontLightTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();

        this.frontLightSpecularTexture = new THREE.TextureLoader().load('texture/frontLightSpecular.jpg');
        this.frontLightTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();

        this.leftFrontLightMaterial = new THREE.MeshPhongMaterial({map: this.frontLightTexture, normalMap: this.frontLightNormalTexture, specularMap: this.frontLightSpecularTexture})
        this.leftFrontLight = new THREE.Mesh(this.leftFrontLightGeometry, this.leftFrontLightMaterial)
        this.frontBlock.add(this.leftFrontLight)
        this.leftFrontLight.position.set(-5.1,-2.5,0);

        this.rightFrontLightGeometry = new THREE.BoxBufferGeometry (1,1,0);
        this.rightFrontLightMaterial = new THREE.MeshPhongMaterial({map: this.frontLightTexture, normalMap: this.frontLightNormalTexture, specularMap: this.frontLightSpecularTexture})
        this.rightFrontLight = new THREE.Mesh(this.rightFrontLightGeometry, this.rightFrontLightMaterial)
        this.frontBlock.add(this.rightFrontLight)
        this.rightFrontLight.position.set(-5.1,2.5,0);

        // back block
        this.backBlockGeometry = new THREE.BoxBufferGeometry(10, 10, 5 );
        this.backBlockMaterial = new THREE.MeshPhongMaterial({ map: this.carTexture, normalMap: this.normalTexture, specularMap: this.specularTexture, color: col });
        this.backBlock = new THREE.Mesh(this.backBlockGeometry, this.backBlockMaterial);
        this.backBlock.position.set(13,0,-2.5);
        this.centralBlock.add(this.backBlock);

        // back wheels
        this.rightBackWheelGeometry = new THREE.CircleGeometry(3,12);
        this.rightBackWheelMaterial = new THREE.MeshPhongMaterial({map: this.wheelTexture, normalMap: this.wheelNormalTexture, specularMap: this.wheelSpecularTexture})
        this.rightBackWheel = new THREE.Mesh(this.rightBackWheelGeometry, this.rightBackWheelMaterial);
        this.rightBackWheel.rotation.x = THREE.Math.degToRad( -90 );
        this.rightBackWheel.position.set(0,5.1,-2.5)
        this.backBlock.add(this.rightBackWheel);

        this.leftBackWheelGeometry = new THREE.CircleGeometry(3,12);
        this.leftBackWheelMaterial = new THREE.MeshPhongMaterial({map: this.wheelTexture, normalMap: this.wheelNormalTexture, specularMap: this.wheelSpecularTexture})
        this.leftBackWheel = new THREE.Mesh(this.leftBackWheelGeometry, this.leftBackWheelMaterial);
        this.leftBackWheel.rotation.x = THREE.Math.degToRad( 90 );
        this.leftBackWheel.position.set(0,-5.1,-2.5)
        this.backBlock.add(this.leftBackWheel);

        // taillights
        this.leftBackLightGeometry = new THREE.BoxBufferGeometry (1,1,0);
        this.backLightTexture = new THREE.TextureLoader().load('texture/backLight.jpg');
        this.backLightTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();
        this.backLightNormalTexture = new THREE.TextureLoader().load('texture/backLightNormal.jpg');
        this.backLightTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();
        this.backLightSpecularTexture = new THREE.TextureLoader().load('texture/backLightSpecular.jpg');
        this.backLightTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();

        this.leftBackLightMaterial = new THREE.MeshPhongMaterial({map: this.backLightTexture, normalMap: this.backLightNormalTexture, specularMap: this.backLightSpecularTexture})
        this.leftBackLight = new THREE.Mesh(this.leftBackLightGeometry, this.leftBackLightMaterial)
        this.backBlock.add(this.leftBackLight)
        this.leftBackLight.position.set(5.1,-2.5,0);

        this.rightBackLightGeometry = new THREE.BoxBufferGeometry (1,1,0);
        this.rightBackLightMaterial = new THREE.MeshPhongMaterial({map: this.backLightTexture})
        this.rightBackLight = new THREE.Mesh(this.rightBackLightGeometry, this.rightBackLightMaterial)
        this.backBlock.add(this.rightBackLight)
        this.rightBackLight.position.set(5.1,2.5,0);

        this.centralBlock.position.x = posX
        this.centralBlock.position.y = posY
        this.centralBlock.position.z+=1.5
        this.centralBlock.scale.set(0.8, 1, 0.8)
        if (posX<0) this.centralBlock.rotation.z = THREE.Math.degToRad( 180 );

        this.headLight1 = new THREE.SpotLight( 0xffffff, 0.0 );
        this.headLight1.penumbra = 0.05;
        this.headLight1.decay = 1;
        this.headLight1.distance = 25;
        this.headLight1.shadow.mapSize.width = 1024;
        this.headLight1.shadow.mapSize.height = 1024;
        this.headLight1.shadow.camera.near = 10;
        this.headLight1.shadow.camera.far = 200;
        this.headLight1.target = headTarget;
        this.headLight1.angle = THREE.Math.degToRad( 30 );

        this.headLight2 = new THREE.SpotLight( 0xffffff, 0.0 );
        this.headLight2.penumbra = 0.05;
        this.headLight2.decay = 1;
        this.headLight2.distance = 25;
        this.headLight2.shadow.mapSize.width = 1024;
        this.headLight2.shadow.mapSize.height = 1024;
        this.headLight2.shadow.camera.near = 10;
        this.headLight2.shadow.camera.far = 200;
        this.headLight2.target = headTarget;
        this.headLight2.angle = THREE.Math.degToRad( 30 );

        this.leftFrontLight.add(this.headLight1)
        this.rightFrontLight.add(this.headLight2)

        this.tailLight1 = new THREE.SpotLight( 0xff0000, 0.0 );
        this.tailLight1.penumbra = 0.05;
        this.tailLight1.decay = 1;
        this.tailLight1.distance = 15;
        this.tailLight1.shadow.mapSize.width = 1024;
        this.tailLight1.shadow.mapSize.height = 1024;
        this.tailLight1.shadow.camera.near = 10;
        this.tailLight1.shadow.camera.far = 200;
        this.tailLight1.target = tailTarget;
        this.tailLight1.angle = THREE.Math.degToRad( 45 );

        this.tailLight2 = new THREE.SpotLight( 0xff0000, 0.0 );
        this.tailLight2.penumbra = 0.05;
        this.tailLight2.decay = 1;
        this.tailLight2.distance = 15;
        this.tailLight2.shadow.mapSize.width = 1024;
        this.tailLight2.shadow.mapSize.height = 1024;
        this.tailLight2.shadow.camera.near = 10;
        this.tailLight2.shadow.camera.far = 200;
        this.tailLight2.target = tailTarget;
        this.tailLight2.angle = THREE.Math.degToRad( 45 );

        this.leftBackLight.add(this.tailLight1);
        this.rightBackLight.add(this.tailLight2)
    }
}

class Truck {
    constructor(posX, posY, col, headTarget, tailTarget) {
        this.type = 1;
        this.posX = posX;
        this.truckTexture = new THREE.TextureLoader().load('texture/car.jpg');
        this.truckTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();

        this.normalTexture = new THREE.TextureLoader().load('texture/carNormal.jpg');
        this.normalTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();

        this.specularTexture = new THREE.TextureLoader().load('texture/carSpecular.jpg');
        this.specularTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();

        // front block
        this.frontBlockGeometry = new THREE.BoxBufferGeometry(7.5, 10, 10 );
        this.frontBlockMaterial = new THREE.MeshPhongMaterial({ map: this.truckTexture, normalMap: this.normalTexture, specularMap: this.specularTexture, color: col });
        this.frontBlock = new THREE.Mesh(this.frontBlockGeometry, this.frontBlockMaterial);

        // frontlights
        this.leftFrontLightGeometry = new THREE.BoxBufferGeometry (1,1,0);
        this.frontLightTexture = new THREE.TextureLoader().load('texture/frontLight.jpg');
        this.frontLightTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();

        this.frontLightNormalTexture = new THREE.TextureLoader().load('texture/frontLightNormal.jpg');
        this.frontLightTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();

        this.frontLightSpecularTexture = new THREE.TextureLoader().load('texture/frontLightSpecular.jpg');
        this.frontLightTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();

        this.leftFrontLightMaterial = new THREE.MeshPhongMaterial({map: this.frontLightTexture, normalMap: this.frontLightNormalTexture, specularMap: this.frontLightSpecularTexture})
        this.leftFrontLight = new THREE.Mesh(this.leftFrontLightGeometry, this.leftFrontLightMaterial)
        this.frontBlock.add(this.leftFrontLight)
        this.leftFrontLight.position.set(-3.76,-3,-1.5);

        this.rightFrontLightGeometry = new THREE.BoxBufferGeometry (1,1,0);
        this.rightFrontLightMaterial = new THREE.MeshPhongMaterial({map: this.frontLightTexture, normalMap: this.frontLightNormalTexture, specularMap: this.frontLightSpecularTexture})
        this.rightFrontLight = new THREE.Mesh(this.rightFrontLightGeometry, this.rightFrontLightMaterial)
        this.frontBlock.add(this.rightFrontLight)
        this.rightFrontLight.position.set(-3.76,3,-1.5);
        
        // back block
        this.backBlockGeometry = new THREE.BoxBufferGeometry(18, 10, 13 );
        this.backBlockMaterial = new THREE.MeshPhongMaterial({map: this.truckTexture, normalMap: this.normalTexture, specularMap: this.specularTexture, color: col });
        this.backBlock = new THREE.Mesh(this.backBlockGeometry, this.backBlockMaterial);

        this.frontBlock.add(this.backBlock);
        this.backBlock.position.set(13,0,1.5);

        // taillights
        this.leftBackLightGeometry = new THREE.BoxBufferGeometry (1,1,0);
        this.backLightTexture = new THREE.TextureLoader().load('texture/backLight.jpg');
        this.backLightTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();
        this.backLightNormalTexture = new THREE.TextureLoader().load('texture/backLightNormal.jpg');
        this.backLightTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();
        this.backLightSpecularTexture = new THREE.TextureLoader().load('texture/backLightSpecular.jpg');
        this.backLightTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();

        this.leftBackLightMaterial = new THREE.MeshPhongMaterial({map: this.backLightTexture, normalMap: this.backLightNormalTexture, specularMap: this.backLightSpecularTexture})
        this.leftBackLight = new THREE.Mesh(this.leftBackLightGeometry, this.leftBackLightMaterial)
        this.backBlock.add(this.leftBackLight)
        this.leftBackLight.position.set(9.1,-3,-4);

        this.rightBackLightGeometry = new THREE.BoxBufferGeometry (1,1,0);
        this.rightBackLightMaterial = new THREE.MeshPhongMaterial({map: this.backLightTexture, normalMap: this.backLightNormalTexture, specularMap: this.backLightSpecularTexture})
        this.rightBackLight = new THREE.Mesh(this.rightBackLightGeometry, this.rightBackLightMaterial)
        this.backBlock.add(this.rightBackLight)
        this.rightBackLight.position.set(9.1,3,-4);

        // front wheels
        this.wheelTexture = new THREE.TextureLoader().load('texture/wheel.jpg');
        this.wheelTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();
        this.wheelNormalTexture = new THREE.TextureLoader().load('texture/wheelNormal.jpg');
        this.wheelNormalTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();
        this.wheelSpecularTexture = new THREE.TextureLoader().load('texture/wheelSpecular.jpg');
        this.wheelSpecularTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();
        
        this.rightFrontWheelGeometry = new THREE.CircleGeometry(3,12);
        this.rightFrontWheelMaterial = new THREE.MeshPhongMaterial({map: this.wheelTexture, normalMap: this.wheelNormalTexture, specularMap: this.wheelSpecularTexture})
        this.rightFrontWheel = new THREE.Mesh(this.rightFrontWheelGeometry, this.rightFrontWheelMaterial);
        this.rightFrontWheel.rotation.x = THREE.Math.degToRad( -90 );
        this.rightFrontWheel.position.set(0,5.1,-5)
        this.frontBlock.add(this.rightFrontWheel);

        this.leftFrontWheelGeometry = new THREE.CircleGeometry(3,12);
        this.leftFrontWheelMaterial = new THREE.MeshPhongMaterial({map: this.wheelTexture, normalMap: this.wheelNormalTexture, specularMap: this.wheelSpecularTexture})
        this.leftFrontWheel = new THREE.Mesh(this.leftFrontWheelGeometry, this.leftFrontWheelMaterial);
        this.leftFrontWheel.rotation.x = THREE.Math.degToRad( 90 );
        this.leftFrontWheel.position.set(0,-5.1,-5)
        this.frontBlock.add(this.leftFrontWheel);

        // back wheels
        this.rightBackWheelGeometry = new THREE.CircleGeometry(3,12);
        this.rightBackWheelMaterial = new THREE.MeshPhongMaterial({map: this.wheelTexture, normalMap: this.wheelNormalTexture, specularMap: this.wheelSpecularTexture})
        this.rightBackWheel = new THREE.Mesh(this.rightBackWheelGeometry, this.rightBackWheelMaterial);
        this.rightBackWheel.rotation.x = THREE.Math.degToRad( -90 );
        this.rightBackWheel.position.set(6,5.1,-6.5)
        this.backBlock.add(this.rightBackWheel);

        this.leftBackWheelGeometry = new THREE.CircleGeometry(3,12);
        this.leftBackWheelMaterial = new THREE.MeshPhongMaterial({map: this.wheelTexture, normalMap: this.wheelNormalTexture, specularMap: this.wheelSpecularTexture})
        this.leftBackWheel = new THREE.Mesh(this.leftBackWheelGeometry, this.leftBackWheelMaterial);
        this.leftBackWheel.rotation.x = THREE.Math.degToRad( 90 );
        this.leftBackWheel.position.set(6,-5.1,-6.5)
        this.backBlock.add(this.leftBackWheel);
        
        this.frontBlock.position.x = posX
        this.frontBlock.position.y = posY
        this.frontBlock.rotation.z = THREE.Math.degToRad( 0 );
        this.frontBlock.position.z+=8.1
        if (posX<0) this.frontBlock.rotation.z = THREE.Math.degToRad( 180 );

        this.headLight1 = new THREE.SpotLight( 0xffffff, 0.0 );
        this.headLight1.penumbra = 0.05;
        this.headLight1.decay = 1;
        this.headLight1.distance = 25;
        this.headLight1.shadow.mapSize.width = 1024;
        this.headLight1.shadow.mapSize.height = 1024;
        this.headLight1.shadow.camera.near = 10;
        this.headLight1.shadow.camera.far = 200;
        this.headLight1.target = headTarget;
        this.headLight1.angle = THREE.Math.degToRad( 30 );

        this.headLight2 = new THREE.SpotLight( 0xffffff, 0.0 );
        this.headLight2.penumbra = 0.05;
        this.headLight2.decay = 1;
        this.headLight2.distance = 25;
        this.headLight2.shadow.mapSize.width = 1024;
        this.headLight2.shadow.mapSize.height = 1024;
        this.headLight2.shadow.camera.near = 10;
        this.headLight2.shadow.camera.far = 200;
        this.headLight2.target = headTarget;
        this.headLight2.angle = THREE.Math.degToRad( 30 );

        this.leftFrontLight.add(this.headLight1)
        this.rightFrontLight.add(this.headLight2)

        this.tailLight1 = new THREE.SpotLight( 0xff0000, 0.0 );
        this.tailLight1.penumbra = 0.05;
        this.tailLight1.decay = 1;
        this.tailLight1.distance = 15;
        this.tailLight1.shadow.mapSize.width = 1024;
        this.tailLight1.shadow.mapSize.height = 1024;
        this.tailLight1.shadow.camera.near = 10;
        this.tailLight1.shadow.camera.far = 200;
        this.tailLight1.target = tailTarget;
        this.tailLight1.angle = THREE.Math.degToRad( 45 );

        this.tailLight2 = new THREE.SpotLight( 0xff0000, 0.0 );
        this.tailLight2.penumbra = 0.05;
        this.tailLight2.decay = 1;
        this.tailLight2.distance = 15;
        this.tailLight2.shadow.mapSize.width = 1024;
        this.tailLight2.shadow.mapSize.height = 1024;
        this.tailLight2.shadow.camera.near = 10;
        this.tailLight2.shadow.camera.far = 200;
        this.tailLight2.target = tailTarget;
        this.tailLight2.angle = THREE.Math.degToRad( 45 );

        this.leftBackLight.add(this.tailLight1);
        this.rightBackLight.add(this.tailLight2)
    }    
}

class Tractor {
    constructor(posX, posY, col, headTarget, tailTarget) {
        this.type = 2;
        this.posX = posX;
        this.tractorTexture = new THREE.TextureLoader().load('texture/car.jpg');
        this.tractorTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();

        this.normalTexture = new THREE.TextureLoader().load('texture/carNormal.jpg');
        this.normalTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();

        this.specularTexture = new THREE.TextureLoader().load('texture/carSpecular.jpg');
        this.specularTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();


        // front block
        this.frontBlockGeometry = new THREE.BoxBufferGeometry(5, 5, 5 );
        this.frontBlockMaterial = new THREE.MeshPhongMaterial({ map: this.tractorTexture,  normalMap: this.normalTexture, specularMap: this.specularTexture, color: col });
        this.frontBlock = new THREE.Mesh(this.frontBlockGeometry, this.frontBlockMaterial);

        // frontlights
        this.leftFrontLightGeometry = new THREE.BoxBufferGeometry (1,1,0);
        this.frontLightTexture = new THREE.TextureLoader().load('texture/frontLight.jpg');
        this.frontLightTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();

        this.frontLightNormalTexture = new THREE.TextureLoader().load('texture/frontLightNormal.jpg');
        this.frontLightTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();

        this.frontLightSpecularTexture = new THREE.TextureLoader().load('texture/frontLightSpecular.jpg');
        this.frontLightTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();

        this.leftFrontLightMaterial = new THREE.MeshPhongMaterial({map: this.frontLightTexture, normalMap: this.frontLightNormalTexture, specularMap: this.frontLightSpecularTexture})
        this.leftFrontLight = new THREE.Mesh(this.leftFrontLightGeometry, this.leftFrontLightMaterial)
        this.frontBlock.add(this.leftFrontLight)
        this.leftFrontLight.position.set(-2.51,-1.5,-1.2);
        this.leftFrontLight.scale.set(0.8, 0.8, 0.8);

        this.rightFrontLightGeometry = new THREE.BoxBufferGeometry (1,1,0);
        this.rightFrontLightMaterial = new THREE.MeshPhongMaterial({map: this.frontLightTexture, normalMap: this.frontLightNormalTexture, specularMap: this.frontLightSpecularTexture})
        this.rightFrontLight = new THREE.Mesh(this.rightFrontLightGeometry, this.rightFrontLightMaterial)
        this.frontBlock.add(this.rightFrontLight)
        this.rightFrontLight.position.set(-2.51,1.5,-1.2);
        this.rightFrontLight.scale.set(0.8, 0.8, 0.8);

        // back block
        this.backBlockGeometry = new THREE.BoxBufferGeometry(10, 5, 13 );
        this.backBlockMaterial = new THREE.MeshPhongMaterial({ map: this.tractorTexture,  normalMap: this.normalTexture, specularMap: this.specularTexture, color: col });
        this.backBlock = new THREE.Mesh(this.backBlockGeometry, this.backBlockMaterial);

        this.frontBlock.add(this.backBlock);
        this.backBlock.position.set(7.5,0,4);

        // taillights
        this.leftBackLightGeometry = new THREE.BoxBufferGeometry (1,1,0);
        this.backLightTexture = new THREE.TextureLoader().load('texture/backLight.jpg');
        this.backLightTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();
        this.backLightNormalTexture = new THREE.TextureLoader().load('texture/backLightNormal.jpg');
        this.backLightTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();
        this.backLightSpecularTexture = new THREE.TextureLoader().load('texture/backLightSpecular.jpg');
        this.backLightTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();

        this.leftBackLightMaterial = new THREE.MeshPhongMaterial({map: this.backLightTexture, normalMap: this.backLightNormalTexture, specularMap: this.backLightSpecularTexture})
        this.leftBackLight = new THREE.Mesh(this.leftBackLightGeometry, this.leftBackLightMaterial)
        this.backBlock.add(this.leftBackLight)
        this.leftBackLight.position.set(5.1,-1.5,-5);

        this.rightBackLightGeometry = new THREE.BoxBufferGeometry (1,1,0);
        this.rightBackLightMaterial = new THREE.MeshPhongMaterial({map: this.backLightTexture, normalMap: this.backLightNormalTexture, specularMap: this.backLightSpecularTexture})
        this.rightBackLight = new THREE.Mesh(this.rightBackLightGeometry, this.rightBackLightMaterial)
        this.backBlock.add(this.rightBackLight)
        this.rightBackLight.position.set(5.1,1.5,-5);
        this.rightFrontLight.scale.set(0.7, 0.7, 0.7);

        // front wheels
        this.wheelTexture = new THREE.TextureLoader().load('texture/tractorWheel.jpg');
        this.wheelTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();
        this.wheelNormalTexture = new THREE.TextureLoader().load('texture/tractorWheelNormal.jpg');
        this.wheelNormalTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();
        this.wheelSpecularTexture = new THREE.TextureLoader().load('texture/tractorWheelSpecular.jpg');
        this.wheelSpecularTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();
        
        
        this.rightFrontWheelGeometry = new THREE.CircleGeometry(2,12);
        this.rightFrontWheelMaterial = new THREE.MeshPhongMaterial({map: this.wheelTexture, normalMap: this.wheelNormalTexture, specularMap: this.wheelSpecularTexture})
        this.rightFrontWheel = new THREE.Mesh(this.rightFrontWheelGeometry, this.rightFrontWheelMaterial);
        this.rightFrontWheel.rotation.x = THREE.Math.degToRad( -90 );
        this.rightFrontWheel.position.set(0,2.51,-2.5)
        this.frontBlock.add(this.rightFrontWheel);

        this.leftFrontWheelGeometry = new THREE.CircleGeometry(2,12);
        this.leftFrontWheelMaterial = new THREE.MeshPhongMaterial({map: this.wheelTexture, normalMap: this.wheelNormalTexture, specularMap: this.wheelSpecularTexture})
        this.leftFrontWheel = new THREE.Mesh(this.leftFrontWheelGeometry, this.leftFrontWheelMaterial);
        this.leftFrontWheel.rotation.x = THREE.Math.degToRad( 90 );
        this.leftFrontWheel.position.set(0,-2.51,-2.5)
        this.frontBlock.add(this.leftFrontWheel);

        // back wheels
        this.rightBackWheelGeometry = new THREE.CircleGeometry(4,12);
        this.rightBackWheelMaterial = new THREE.MeshPhongMaterial({map: this.wheelTexture, normalMap: this.wheelNormalTexture, specularMap: this.wheelSpecularTexture})
        this.rightBackWheel = new THREE.Mesh(this.rightBackWheelGeometry, this.rightBackWheelMaterial);
        this.rightBackWheel.rotation.x = THREE.Math.degToRad( -90 );
        this.rightBackWheel.position.set(0,2.52,-4.5)
        this.backBlock.add(this.rightBackWheel);

        this.leftBackWheelGeometry = new THREE.CircleGeometry(4,12);
        this.leftBackWheelMaterial = new THREE.MeshPhongMaterial({map: this.wheelTexture, normalMap: this.wheelNormalTexture, specularMap: this.wheelSpecularTexture})
        this.leftBackWheel = new THREE.Mesh(this.leftBackWheelGeometry, this.leftBackWheelMaterial);
        this.leftBackWheel.rotation.x = THREE.Math.degToRad( 90 );
        this.leftBackWheel.position.set(0,-2.52,-4.5)
        this.backBlock.add(this.leftBackWheel);

        this.frontBlock.position.x = posX
        this.frontBlock.position.y = posY
        this.frontBlock.rotation.z = THREE.Math.degToRad( 0 );
        this.frontBlock.position.z+=4.6
        if (posX<0) this.frontBlock.rotation.z = THREE.Math.degToRad( 180 );

        this.headLight1 = new THREE.SpotLight( 0xffffff, 0.0 );
        this.headLight1.penumbra = 0.05;
        this.headLight1.decay = 1;
        this.headLight1.distance = 25;
        this.headLight1.shadow.mapSize.width = 1024;
        this.headLight1.shadow.mapSize.height = 1024;
        this.headLight1.shadow.camera.near = 10;
        this.headLight1.shadow.camera.far = 200;
        this.headLight1.target = headTarget;
        this.headLight1.angle = THREE.Math.degToRad( 30 );

        this.headLight2 = new THREE.SpotLight( 0xffffff, 0.0 );
        this.headLight2.penumbra = 0.05;
        this.headLight2.decay = 1;
        this.headLight2.distance = 25;
        this.headLight2.shadow.mapSize.width = 1024;
        this.headLight2.shadow.mapSize.height = 1024;
        this.headLight2.shadow.camera.near = 10;
        this.headLight2.shadow.camera.far = 200;
        this.headLight2.target = headTarget;
        this.headLight2.angle = THREE.Math.degToRad( 30 );

        this.leftFrontLight.add(this.headLight1)
        this.rightFrontLight.add(this.headLight2)

        this.tailLight1 = new THREE.SpotLight( 0xff0000, 0.0 );
        this.tailLight1.penumbra = 0.05;
        this.tailLight1.decay = 1;
        this.tailLight1.distance = 15;
        this.tailLight1.shadow.mapSize.width = 1024;
        this.tailLight1.shadow.mapSize.height = 1024;
        this.tailLight1.shadow.camera.near = 10;
        this.tailLight1.shadow.camera.far = 200;
        this.tailLight1.target = tailTarget;
        this.tailLight1.angle = THREE.Math.degToRad( 45 );

        this.tailLight2 = new THREE.SpotLight( 0xff0000, 0.0 );
        this.tailLight2.penumbra = 0.05;
        this.tailLight2.decay = 1;
        this.tailLight2.distance = 15;
        this.tailLight2.shadow.mapSize.width = 1024;
        this.tailLight2.shadow.mapSize.height = 1024;
        this.tailLight2.shadow.camera.near = 10;
        this.tailLight2.shadow.camera.far = 200;
        this.tailLight2.target = tailTarget;
        this.tailLight2.angle = THREE.Math.degToRad( 45 );

        this.leftBackLight.add(this.tailLight1);
        this.rightBackLight.add(this.tailLight2);
    }
}