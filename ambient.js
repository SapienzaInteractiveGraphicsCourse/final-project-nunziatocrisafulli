class startLawn {
    constructor() {
        this.lawnGeometry = new THREE.BoxBufferGeometry(360, 45, 1 );
        this.texture = new THREE.TextureLoader().load('texture/lawn.jpg');
        this.texture.repeat.set(1, 1);
        this.texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
        this.material = new THREE.MeshPhongMaterial({ map: this.texture });
        this.lawn = new THREE.Mesh(this.lawnGeometry, this.material);
        this.lawn.receiveShadow = true;
        this.lawn.position.set(0,-65,0);
        scene.add(this.lawn);
    }    
}

class Bush {
    constructor(posX, posY = -54, posZ = 0) {
        this.bushGeometry = new THREE.DodecahedronBufferGeometry(10,1);
        this.texture = new THREE.TextureLoader().load('texture/bush.jpg');
        this.texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
        this.bushMaterial = new THREE.MeshPhongMaterial({ map: this.texture});
        this.bush = new THREE.Mesh(this.bushGeometry, this.bushMaterial);
        this.bush.position.set(posX, posY, posZ);
        this.bush.receiveShadow = true;
        scene.add(this.bush)
    }
}

class Tree { // trunk + bush
    constructor(posX = 0) {
        this.group = new THREE.Group();
        this.trunkGeometry = new THREE.BoxBufferGeometry(2,2,32);
        this.texture = new THREE.TextureLoader().load('texture/trunk.jpg');
        this.texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
        this.trunkMaterial = new THREE.MeshPhongMaterial({ map: this.texture });
        this.trunk = new THREE.Mesh(this.trunkGeometry, this.trunkMaterial);
        this.trunk.position.set(posX,62,16);
        this.group.add(this.trunk)
        this.bush = new Bush(posX, 62, 31);
        this.bush.bush.scale.set(0.8, 0.8, 0.8)
        this.group.add(this.bush.bush);
        scene.add(this.group)
    }
}

class streetLamp {
    constructor(posX, posY) {
        this.group = new THREE.Group()
        this.lampTrunkGeometry = new THREE.BoxBufferGeometry(3, 3, 30 );
        this.texture = new THREE.TextureLoader().load('texture/streetLamp.jpg');
        this.texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
        this.lampTrunkMaterial = new THREE.MeshPhongMaterial({ map: this.texture });
        this.lampTrunk = new THREE.Mesh(this.lampTrunkGeometry, this.lampTrunkMaterial);
        this.lampTrunk.position.set(posX,posY,15);
        this.group.add(this.lampTrunk)
        this.headLamp = new THREE.CubeGeometry(5,8,5);
        this.headLampMaterial = new THREE.MeshPhongMaterial({map: this.texture});
        this.headLamp = new THREE.Mesh(this.headLamp, this.headLampMaterial)
        if (posY<0) {
            this.headLamp.position.set(posX-2,posY+3,33);
            this.headLamp.rotation.z+=0.5;
        }
        else {
            this.headLamp.position.set(posX+2,posY-3,33)
            this.headLamp.rotation.z+=0.5;
        }
        this.group.add(this.headLamp)
        scene.add(this.group)
    }
}

class Street {
    constructor() {
        this.streetGeometry = new THREE.BoxBufferGeometry(360, 100, 1 );
        this.texture = new THREE.TextureLoader().load('texture/street.jpg');
        this.texture.repeat.set(1, 1);
        this.texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
        this.streetMaterial = new THREE.MeshPhongMaterial( { map: this.texture } );
        this.street = new THREE.Mesh(this.streetGeometry, this.streetMaterial);
        this.street.position.set(0, 0,0);
        scene.add(this.street);
    }    
}


class finishLawn {
    constructor() {
        this.finishLawnGeometry = new THREE.BoxBufferGeometry(360, 60, 1 );
        this.texture = new THREE.TextureLoader().load('texture/lawn.jpg');
        this.texture.repeat.set(1, 1);
        this.texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
        this.finishLawnMaterial = new THREE.MeshPhongMaterial( { map: this.texture } );
        this.finishLawn = new THREE.Mesh(this.finishLawnGeometry, this.finishLawnMaterial);
        this.finishLawn.position.set(0,81,0);
        scene.add(this.finishLawn);
    }    
}