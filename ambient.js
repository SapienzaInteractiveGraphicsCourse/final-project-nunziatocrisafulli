class startLawn {
    constructor() {
        this.lawnGeometry = new THREE.BoxBufferGeometry(80, 12, 1 );
        this.lawnMaterial = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
        this.lawn = new THREE.Mesh(this.lawnGeometry, this.lawnMaterial);
        this.lawn.position.set(0,-28,0)
        scene.add(this.lawn);
        // var texture = new THREE.TextureLoader().load('texture/startLawn.jpg')
        // this.material = new THREE.MeshStandardMaterial({ map: texture });
    }    
}

class bush {
    TODO    
}

class streetLamp {
    TODO
}

class Street {
    constructor() {
        this.streetGeometry = new THREE.BoxBufferGeometry(80, 45, 1 );
        this.streetMaterial = new THREE.MeshBasicMaterial( { color: 0xbbbbbb } );
        this.street = new THREE.Mesh(this.streetGeometry, this.streetMaterial);
        this.street.position.set(0,0,0)
        scene.add(this.street);
        // var texture = new THREE.TextureLoader().load('texture/startLawn.jpg')
        // this.material = new THREE.MeshStandardMaterial({ map: texture });
    }    
}

class finishLawn {
    constructor() {
        this.finishLawnGeometry = new THREE.BoxBufferGeometry(80, 12, 1 );
        this.finishLawnMaterial = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
        this.finishLawn = new THREE.Mesh(this.finishLawnGeometry, this.finishLawnMaterial);
        this.finishLawn.position.set(0,28,0)
        scene.add(this.finishLawn);
        // var texture = new THREE.TextureLoader().load('texture/startLawn.jpg')
        // this.material = new THREE.MeshStandardMaterial({ map: texture });
    }    
}