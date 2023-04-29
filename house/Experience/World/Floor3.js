import Experience from "../Experience"
import * as THREE from "three"
import GSAP from "gsap"

export default class Floor{
    constructor(){
        this.experience = new Experience();
        this.scene = this.experience.scene;

        this.light = new THREE.PointLight( 0xffffff, 10, 20 );
        this.light.position.set( 0,0,1.5 );
        // this.light.rotation.x = Math.PI / 2;
        // this.light.position.y = -0.3;

        this.scene.add( this.light );

        const sphereSize = 500;
        this.pointLightHelper = new THREE.PointLightHelper( this.light, sphereSize );
        this.scene.add( this.pointLightHelper );

        this.setFloor();

    }

    setFloor() {
      this.geometry = new THREE.PlaneGeometry(100, 100);
      this.material = new THREE.MeshStandardMaterial({
          color: 0xffe6a2,
        // color: 0x801801,
          side: THREE.BackSide,
      });
      this.plane = new THREE.Mesh(this.geometry, this.material);
      this.scene.add(this.plane);
      this.plane.rotation.x = Math.PI / 2;
      this.plane.position.y = -0.3;
      this.plane.receiveShadow = true;

  }


    resize(){

    }

    update(){
    }
}

