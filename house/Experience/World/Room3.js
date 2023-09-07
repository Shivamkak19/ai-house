import Experience from "../Experience"
import * as THREE from "three"
import GSAP from "gsap"
import { RectAreaLightHelper }  from "three/examples/jsm/helpers/RectAreaLightHelper.js"

export default class Room{
    constructor(){
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.time = this.experience.time;
        this.room = this.resources.items.room;
        this.actualRoom = this.room.scene;
        this.roomChildren = {}; // Creates an empty object

        this.lerp = {
            current: 0,
            target: 0,
            ease: 0.1,
        }

        

        this.setModel();
        this.onMouseMove();
        this.setAnimation();

    }


    setModel(){

        //Adds shadows for each child of the model (each mesh)
        this.actualRoom.children.forEach(child=>{

            child.castShadow = true;
            child.receiveShadow = true;

            if(child instanceof THREE.Group){ //might not be working
                child.children.forEach((groupchild)=>{
                    groupchild.castShadow = true;
                    groupchild.receiveShadow = true;
                })
            }

            //Set materials of individual objects by Name ID from Blender
            //Consider simulating an environment map here
            // if(child.name ==="fish_tank"){
            //     child.children[0].material = new THREE.MeshPhysicalMaterial();
            //     child.children[0].material.roughness = 0;
            //     child.children[0].material.color.set(0x549dd2);
            //     child.children[0].material.ior = 3;
            //     child.children[0].material.transmission = 1;
            //     child.children[0].material.opacity = 1;
            // }

            if(child.name ==="Computer"){
                child.children[1].material = new THREE.MeshBasicMaterial({
                    map: this.resources.items.screen,
                });
            }

            //Setting the scale for animations
            if(child.name === "Garden_Floor"){
                child.position.x = 0.44;
                child.position.z = 6.7;
            }

            // if(child.name === "Mailbox" ||
            //     child.name === "Lamp" ||
            //     child.name === "Flower1" ||
            //     child.name === "Flower2"        
            // ){
            //     child.scale.set(0,0,0);
            // }

            // Old Version
            // if(child.name ==="Computer"){
            //     child.material = new THREE.MeshBasicMaterial({
            //         map: this.resources.items.screen,
            //     });
            // }

            child.scale.set(1, 1, 1);

            if(child.name ==="cubicle"){
                // child.scale.set(1, 1, 1);
                child.position.set(0, -1.5, 0)
                child.rotation.y = Math.PI / 4;
            }

            //Converts child name to lower case, assigns it to roomChildren object
            this.roomChildren[child.name.toLowerCase()] = child;
        })

        //Area Light Over the Fish Tank (vertical)

        const width = 0.5;
        const height = 0.7;
        const intensity = 1;
        const rectLight = new THREE.RectAreaLight(
            0xffffff,
            intensity,
            width,
            height
        );        
        rectLight.position.set(7.68244, 7, 0.5);
        rectLight.rotation.x = -Math.PI / 2;
        rectLight.rotation.z = Math.PI / 4;        
        this.actualRoom.add( rectLight )

        this.roomChildren["rectLight"] = rectLight;


        //Horizontal Light
        // const width = 2.5;
        // const height = 3.5;
        // const intensity = 10;
        // const rectLight = new THREE.RectAreaLight( 0xffffff, intensity,  width, height );
        // rectLight.position.set( 6.9413, 5, 1.0311);
        // // rectLight.rotation.x = -Math.PI / 2;
        // // rectLight.rotation.z = Math.PI / 4;
        // this.actualRoom.add( rectLight )
        
        // const rectLightHelper = new RectAreaLightHelper( rectLight );
        // rectLight.add( rectLightHelper );

        this.scene.add(this.actualRoom);
        this.actualRoom.scale.set(0.11, 0.11, 0.11)
        this.actualRoom.rotation.y = 0;
    }

    setAnimation(){
        this.mixer =  new THREE.AnimationMixer(this.actualRoom);
        this.swim = this.mixer.clipAction(this.room.animations[1]);
        this.swim.play();
        
        // Tiger animation mixer
        this.mixerTiger = new THREE.AnimationMixer(this.actualRoom);
        this.tigerWalk = this.mixerTiger.clipAction(this.room.animations[25]);
        this.tigerWalk.play();

        //Control tiger animation with User Scroll
        window.addEventListener("scroll-manual", () => {
            // console.log("tigerUpdate");
            
            this.mixerTiger.update(this.time.delta * 0.0015)

        })

    }

    onMouseMove(){
        window.addEventListener("mousemove", (e) => {
            //normalizes the rotation value from -1 to 1, think (x + y / 2 vs. x - y / 2)
            this.rotation = ((e.clientX - window.innerWidth / 2) * 2) / window.innerWidth;
            this.scale =  ((e.clientY - window.innerHeight / 2) * 2) / window.innerHeight;

            //For up/down rotation, target clientY as well
            this.lerp.target = this.rotation * .1;
            this.lerp.target2 = this.scale * .1;

        })
    }

    resize(){

    }

    update(){

        this.lerp.current = GSAP.utils.interpolate(this.lerp.current, this.lerp.target, this.lerp.ease);
        this.actualRoom.rotation.y = this.lerp.current;

        // this.lerp.current2 = GSAP.utils.interpolate(this.lerp.current2, this.lerp.target2, this.lerp.ease);
        
        //Control speed of animation
        this.mixer.update(this.time.delta * 0.0009);


        
    }
}