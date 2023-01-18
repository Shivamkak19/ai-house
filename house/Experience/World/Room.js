import Experience from "../Experience"
import * as THREE from "three"
import GSAP from "gsap"

export default class Room{
    constructor(){
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.time = this.experience.time;
        this.room = this.resources.items.room;
        this.actualRoom = this.room.scene;

        this.lerp = {
            current: 0,
            target: 0,
            ease: 0.1,
        }

        this.setModel();
        this.setAnimation();
        this.onMouseMove();
        
    }

    setModel(){
        //Adds shadows for each child of the model (each mesh)
        this.actualRoom.children.forEach(child=>{
            child.castShadow = true;
            child.receiveShadow = true;

            if(child instanceof THREE.Group){
                child.children.forEach((groupchild)=>{
                    groupchild.castShadow = true;
                    groupchild.receiveShadow = true;
                })
            }

            //Set materials of individual objects by Name ID from Blender
            //Consider simulating an environment map here
            if(child.name ==="Water"){
                child.material = new THREE.MeshPhysicalMaterial();
                child.material.roughness = 0;
                child.material.color.set(0x549dd2);
                child.material.ior = 3;
                child.material.transmission = 1;
                child.material.opacity = 1;
            }

            if(child.name ==="Computer_Screen"){
                child.material = new THREE.MeshBasicMaterial({
                    map: this.resources.items.screen,
                });
            }
        })

        this.scene.add(this.actualRoom);
        this.actualRoom.scale.set(0.11, 0.11, 0.11)
        this.actualRoom.rotation.y = 0;
    }

    setAnimation(){
        this.mixer =  new THREE.AnimationMixer(this.actualRoom);
        this.swim = this.mixer.clipAction(this.room.animations[158]);
        this.swim.play();

    }

    onMouseMove(){
        window.addEventListener("mousemove", (e) => {
            //normalizes the rotation value from -1 to 1, think (x + y / 2 vs. x - y / 2)
            this.rotation = ((e.clientX - window.innerWidth / 2) * 2) / window.innerWidth;

            //For up/down rotation, target clientY as well
            this.lerp.target = this.rotation * .1;
        })
    }

    resize(){

    }

    update(){

        this.lerp.current = GSAP.utils.interpolate(this.lerp.current, this.lerp.target, this.lerp.ease);
        this.actualRoom.rotation.y = this.lerp.current;

        //Control speed of animation
        this.mixer.update(this.time.delta * 0.0009);


        
    }
}