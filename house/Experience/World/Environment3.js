import Experience from "../Experience"
import * as THREE from "three"
import GSAP from "gsap"
import GUI from 'lil-gui'; 

export default class Environment{
    constructor(){
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;

        // this.gui = new GUI({container: document.querySelector(".hero-main")});
        this.obj = {
            colorObj: {r: 0, g: 0, b: 0},
            intensity: 3,
        }

        this.setSunlight();
        // this.setGUI();
    }

    setGUI(){

        this.gui.addColor(this.obj, "colorObj").onChange(() =>{
            this.sunLight.color.copy(this.obj.colorObj);
            this.ambientLight.color.copy(this.obj.colorObj)
            // console.log(this.obj.colorObj)
        });

        this.gui.add(this.obj, "intensity", 0, 10).onChange(() =>{
            //.copy does not work on the intensity attribute
            this.sunLight.intensity = this.obj.intensity;
            this.ambientLight.intensity = this.obj.intensity;
        })


    }

    //Setting up the Environment lights
    setSunlight(){
        this.sunLight = new THREE.DirectionalLight("#ffffff", 1);
        this.sunLight.castShadow = true;
        this.sunLight.shadow.camera.far = 20;
        this.sunLight.shadow.mapSize.set(2048, 2048);
        this.sunLight.shadow.normalBias = 0.05;
        this.sunLight.position.set(-1.5, 7, 3);

        this.scene.add(this.sunLight);

        this.ambientLight = new THREE.AmbientLight("#ffffff", 0);
        this.scene.add(this.ambientLight);

    }

    //Animates the lights using GSAP, on receiving "switch" event from button click
    switchTheme(theme){
        // console.log(this.sunLight)
        if(theme === "dark"){
            //Dark mode color
            GSAP.to(this.sunLight.color, {
                r: 58 / 255, 
                g: 71/ 255, 
                b: 120 / 255,
            });
            GSAP.to(this.ambientLight.color, {
                r: 34 / 255, 
                g: 25/ 255, 
                b: 119 / 255,
            });

            //Dark Mode intensity
            GSAP.to(this.sunLight, {
                intensity: 1.52
            })
            GSAP.to(this.ambientLight, {
                intensity: 1.52
            })
            }
        else{
            //Light Mode color
            GSAP.to(this.sunLight.color, {
                r: 255 / 255, 
                g: 255 / 255, 
                b: 255 / 255,
            });
            GSAP.to(this.ambientLight.color, {
                r: 255 / 255, 
                g: 255 / 255, 
                b: 255 / 255,
            });

            //Light Mode Intensity
            GSAP.to(this.sunLight, {
                intensity: 3
            })
            GSAP.to(this.ambientLight, {
                intensity: 0
            })
        }
    }
    
    resize(){

    }

    update(){
        
        
    }
}