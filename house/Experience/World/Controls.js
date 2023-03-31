import Experience from "../Experience"
import * as THREE from "three"
import GSAP from "gsap"
import {ScrollTrigger} from "gsap/ScrollTrigger"
// import Scrollbar from 'smooth-scrollbar';


export default class Controls{
    constructor(){
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.sizes = this.experience.sizes;
        this.resources = this.experience.resources;
        this.time = this.experience.time;
        this.camera = this.experience.camera;
        this.room = this.experience.world.room.actualRoom;

        this.room.children.forEach(child =>{
            if(child.type==="RectAreaLight"){
                this.rectLight = child;
            }
        })

        this.circle1 = this.experience.world.floor.circle1;
        // this.circle2 = this.experience.world.floor.circle2;
        // this.circle3 = this.experience.world.floor.circle3;

        //Registers the GSAP plug in
        GSAP.registerPlugin(ScrollTrigger);        

        //Added because the overflow: hidden wasn't working
        this.preloader = this.experience.preloader;
        this.preloader.on("enablecontrols", ()=>{
            // this.setSmoothScroll();
            this.setScrollTrigger();
            document.querySelector(".page").style.overflow = "visible";
        })


    }

    //matches the Media, has a different scroll Trigger based on size of the screen
    //uses arrow function as opposed to function() {} from the docs, to retain access to local variables

    // setSmoothScroll(){
    //     Scrollbar.init(document.querySelector('#my-scrollbar'));
    //     Scrollbar.initAll()
    // }

    setScrollTrigger(){
        ScrollTrigger.matchMedia({
	
            //Desktop
            "(min-width: 969px)": () => {

                //Resets////////////////
                this.room.scale.set(0.11, 0.11, 0.11);
                this.rectLight.width = 0.5;
                this.rectLight.height = 0.7;
                this.camera.orthographicCamera.position.set(0, 6.5, 10);
                this.room.position.set(0, 0, 0);

                //First section desktop/////////////////////////////////////////
                this.firstMoveTimeline = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: ".first-move",
                        markers: false,
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 1.5,
                        invalidateOnRefresh: true,
                    }
                })

                .fromTo(this.room.position, {x: 0}, 
                    {x: () => {
                        return this.sizes.width * 0.0014;
                    }, 
                    duration: 1})


                // this.firstMoveTimeline.to(this.room.position, {
                //     x: () => {
                //         return this.sizes.width * 0.0014;
                //     }
                // })

                //2nd section desktop//////////////////////////////////////////////
                this.secondMoveTimeline = new GSAP.timeline({ 
                    scrollTrigger: {
                        trigger: ".second-move",
                        markers: false,
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 1.5,
                        invalidateOnRefresh: true,
                    }
                })

                // .fromTo(this.room.position, 
                //     {x: () => {
                //     return this.sizes.width * 0.0014;
                //     },
                //     z: 0}, 

                //     {x: () => {
                //         return 1;
                //     }, 
                //     z: ()=>{
                //         return this.sizes.height * 0.0032;
                //     },
                //     duration: 1})

     

                .to(this.room.position, {
                    x: () => {
                        return 1;
                    },
                    z: ()=>{
                        return this.sizes.height * 0.0032;
                    },
                },
                "same" //makes position and scaling happen together
                )    
                
                // .fromTo(this.room.scale, {x: 0.11, y: 0.11, z: 0.11}, 
                //     {x: 0.4, y: 0.4, z: 0.4, duration: 1}, "same")


                // .fromTo(this.rectLight, {width: 0.5, height: 0.7, intensity: 7}, 
                //     {width: 0.5 *4, height: 0.7 *4, intensity: 10, duration: 1}, "same")           
                
                .to(this.room.scale, {
                    x: 0.4,
                    y: 0.4,
                    z: 0.4,
                },
                "same"
                )     
                .to(this.rectLight, {
                    width: 0.5 * 4,
                    height: 0.7 * 4,
                    intensity: 10,
                },
                "same"
                ) 

                //4th section desktop//////////////////////////////////////////////
                this.secondMoveTimeline = new GSAP.timeline({ 
                    scrollTrigger: {
                        trigger: ".fourth-move",
                        markers: false,
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 1.5,
                        invalidateOnRefresh: true,
                    }
                })

                // .fromTo(this.room.scale, {x: 0.4, y: 0.4, z: 0.4}, 
                //     {x: 0.3, y: 0.3, z: 0.3, duration: 1}, "same2")


                // .fromTo(this.camera.orthographicCamera.position, {x: 0, y: 6.5}, 
                //     {x: 1, y: 8, duration: 1}, "same2")           
    
                .to(this.room.scale, {
                    x: 0.3,
                    y: 0.3,
                    z: 0.3,
                    duration: 0.5,

                }, "same")    
                .to(this.camera.orthographicCamera.position, {
                    x: 1,
                    y: 8,
                    duration: 0.5,

                }, "same") 

                //5th section desktop//////////////////////////////////////////////
                this.secondMoveTimeline = new GSAP.timeline({ 
                    scrollTrigger: {
                        trigger: ".fifth-move",
                        markers: false,
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 1.5,
                        invalidateOnRefresh: true,
                    }
                })

                // .fromTo(this.camera.orthographicCamera.position, {y: 8}, 
                //     {y: 6.5, duration: 1}, "same3")   

                // .fromTo(this.room.rotation, {y: 0}, 
                //     {y: Math.PI / 2, duration: 1}, "same3")


                .to(this.camera.orthographicCamera.position, {
                    x: 1,
                    y: 6.5,
                }, "same") 
                .to(this.room.rotation, {
                    y: Math.PI / 2,
                }, "same") 
                
                //third section desktop//////////////////////////////////////////////////////
                this.thirdMoveTimeline = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: ".third-move",
                        markers: false,
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 1.5,
                        invalidateOnRefresh: true,
                    }
                })

                // .fromTo(this.camera.orthographicCamera.position, {x: 1, y: 6.5}, 
                //     {x: -1.25, y: 6, duration: 1}, "same4")   

                // .fromTo(this.room.rotation, {y: Math.PI / 2}, 
                //     {y: 0, duration: 1}, "same4")

                // .fromTo(this.room.scale, {x: 0.3, y: 0.3, z: 0.3}, 
                // {x: 0.16, y: 0.16, z: 0.16, duration: 1}, "same4")

                .to(this.camera.orthographicCamera.position, {
                    x: -1.25,
                    y: 6,
                    }, "same"
                )
                .to(this.room.rotation, {
                    y: 0,
                }, "same") 

                .to(this.room.scale, {
                    x: 0.16,
                    y: 0.16,
                    z: 0.16,
                }, "same") 
 



            },
            
            //Mobile/////////////////////////////////////////////////////////
            "(max-width: 968px)": () => {

                //Resets

                this.room.scale.set(0.07, 0.07, 0.07)
                this.room.position.set(0,0,0);
                this.rectLight.width = 0.3;
                this.rectLight.height = 0.4;
                this.camera.orthographicCamera.position.set(0, 6.5, 10);

                //First section mobile/////////////////////////////////////////
                this.firstMoveTimeline = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: ".first-move",
                        markers: false,
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 2,
                        invalidateOnRefresh: true,
                    }
                })
                .to(this.room.scale,{
                    x: 0.1,
                    y: 0.1,
                    z: 0.1,
                })

                //2nd section mobile//////////////////////////////////////////////
                this.secondMoveTimeline = new GSAP.timeline({ 
                    scrollTrigger: {
                        trigger: ".second-move",
                        markers: false,
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 3,
                        invalidateOnRefresh: true,
                    }
                }).to(this.room.scale,{
                    x: 0.25,
                    y: 0.25,
                    z: 0.25,
                }, "same").to(this.rectLight, {
                    width: 0.3 * 3.4,
                    height: 0.4 * 3.4
                }, "same").to(this.room.position, {
                    x: 1.5,
                    y: 0,
                }, "same")

                //third section mobile//////////////////////////////////////////////////////

                this.thirdMoveTimeline = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: ".third-move",
                        markers: false,
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 2,
                        invalidateOnRefresh: true,
                    }
                }).to(this.room.position, {
                    z: -4.5,
                })

                //fourth section mobile//////////////////////////////////////////////////////

                this.thirdMoveTimeline = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: ".fourth-move",
                        markers: false,
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 2,
                        invalidateOnRefresh: true,
                    }
                }).to(this.room.position, {
                    z: 0,
                })

                //fifth section mobile//////////////////////////////////////////////////////

                this.thirdMoveTimeline = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: ".fifth-move",
                        markers: false,
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 2,
                        invalidateOnRefresh: true,
                    }
                }).to(this.room.scale, {
                    x: 0.35,
                    y: 0.35,
                    z: 0.35,
                }, "same").to(this.room.position, {
                    z: 2,
                }, "same")
            },
          
            //All - Animated GSAP for all media queries /////////////////////////////////
            "all": () => {

                //Grabs the section class to animate progress bar
                this.sections = document.querySelectorAll(".section");
                this.sections.forEach((section) => {
                    this.progressWrapper = section.querySelector(".progress-wrapper");
                    this.progressBar = section.querySelector(".progress-bar");

                    //Puts the scroll trigger directly inside the tween because there is only 1 tween so this parses
                    if(section.classList.contains("right")){
                        GSAP.to(section, {
                            borderTopLeftRadius: 100,
                            scrollTrigger:{
                                trigger: section,
                                start: "top bottom",
                                end: "top top",
                                scrub: 0.6,
                            }
                        })
                        GSAP.to(section, {
                            borderBottomLeftRadius: 700,
                            scrollTrigger:{
                                trigger: section,
                                start: "bottom bottom",
                                end: "bottom top",
                                scrub: 0.6,
                            }
                        })
                    }
                    //For left sections
                    else{
                        GSAP.to(section, {
                            borderTopRightRadius: 100,
                            scrollTrigger:{
                                trigger: section,
                                start: "top bottom",
                                end: "top top",
                                scrub: 0.6,
                            }
                        })
                        GSAP.to(section, {
                            borderBottomRightRadius: 700,
                            scrollTrigger:{
                                trigger: section,
                                start: "bottom bottom",
                                end: "bottom top",
                                scrub: 0.6,
                            }
                        })                        
                    }

                    GSAP.from(this.progressBar, {
                        scaleY: 0,
                        scrollTrigger: {
                            trigger: section,
                            start: "+=100",
                            end: "+=500",
                            scrub: 0.8,
                            pin: this.progressWrapper,
                            pinSpacing: false,
                        }
                    })
                })

                //Circle Animations//////////////////////////////////////////////

                                //First section desktop/////////////////////////////////////////
                                this.firstMoveTimeline = new GSAP.timeline({
                                    scrollTrigger: {
                                        trigger: ".first-move",
                                        markers: false,
                                        start: "top top",
                                        end: "bottom bottom",
                                        scrub: 4,
                                        invalidateOnRefresh: true,
                                    }
                                }).to(this.circle1.scale, {
                                    x: 3, 
                                    y: 3,
                                    z: 3,
                                })
                
                
            }
          }); 


    }


    resize(){

    }

    update(){

    }
}

//Old setPath Function
// setScrollTrigger(){
//     //Creates animation for the room movement with ScrollTrigger

//     //Triggers are html elements (these serve as anchor points)
//     this.timeline = new GSAP.timeline();

//     //Consider scaling down the size of the model as you reduce window size as well
//     this.timeline.to(this.room.position, {
//         x: () =>{
//             return this.sizes.width * 0.0055;
//          }, 
//         scrollTrigger: {
//             trigger: ".first-move",
//             markers: false,
//             start: "top top", //marker location and activation location?
//             end: "bottom",
//             scrub: 0.8, //eases the scrub
//             invalidateOnRefresh: true,
//         }
//     })

//     //Automatic
//     // //Creates animation for the room movement
//     // this.timeline = new GSAP.timeline();
//     // this.timeline.to(this.room.position, {
//     //     x: 5,
//     //     duration: 20,
//     // })
// }

/* Camera Customization

More things to consider:
use conditionals
use gsap to rotate the camera depending on point in curve
lerp rotations

Camera options: 

Option 1: Camera is animated along a loop, goes forward or backward

    onWheel(){
        window.addEventListener("wheel", (e) => {
            if(e.deltaY > 0){
                this.lerp.target += 0.01;
                this.back = false;
            }
            else{
                this.lerp.target -= 0.01;
                this.back = true;
            }
        })
    }

    update(){
    this.lerp.current = GSAP.utils.interpolate(this.lerp.current, this.lerp.target, this.lerp.ease);
    this.lerp.target = GSAP.utils.clamp(0, 1, this.lerp.target)
    this.lerp.current = GSAP.utils.clamp(0, 1, this.lerp.current)

    if(this.back){
        this.lerp.target += 0.001;
    }
    else{
        this.lerp.target -= 0.001;
    }

    // this.lerp.target += 0.0001; To animate LERP
    this.curve.getPointAt(this.lerp.current, this.vector1);
    this.experience.camera.orthographicCamera.position.copy(this.vector1);
    }

Option 2: Camera is manually scrolled along a loop with LERPing

    onWheel(){
        window.addEventListener("wheel", (e) => {
            if(e.deltaY > 0){
                this.lerp.target += 0.01;
            }
            else{
                this.lerp.target -= 0.01;
            }
        })
    }

    update(){
    this.lerp.current = GSAP.utils.interpolate(this.lerp.current, this.lerp.target, this.lerp.ease);
    this.lerp.target = GSAP.utils.clamp(0, 1, this.lerp.target)
    this.lerp.current = GSAP.utils.clamp(0, 1, this.lerp.current)

    this.curve.getPointAt(this.lerp.current, this.vector1);
    this.experience.camera.orthographicCamera.position.copy(this.vector1);
    }

Option 3: Infinite Loop along curve (mix/match with other options)

    onWheel(){
        window.addEventListener("wheel", (e) => {
            if(e.deltaY > 0){
                this.progress += 0.01;
                if(this.progress > 1){
                    this.progress = 0;
                }                
            }
            else{
                this.progress -= 0.01;
                if(this.progress < 0){
                    this.progress = 1;
                }
            }
        })
    }

    update(){
    //Animates the curve to the parameterization of Catmull Curve
    //this.progress % 1 returns values [0,1]
    this.curve.getPointAt(this.progress % 1, this.vector1);
    this.experience.camera.orthographicCamera.position.copy(this.vector1);
    }

Option 4: Camera looks at the path as it travels, manual scroll, LERPing

    onWheel(){
        window.addEventListener("wheel", (e) => {
            if(e.deltaY > 0){
                this.lerp.target += 0.01;
                this.back = false;
            }
            else{
                this.lerp.target -= 0.01;
                this.back = true;
            }
        })
    }

    update(){
        this.lerp.current = GSAP.utils.interpolate(this.lerp.current, this.lerp.target, this.lerp.ease);
        this.lerp.target = GSAP.utils.clamp(0, 1, this.lerp.target)
        this.lerp.current = GSAP.utils.clamp(0, 1, this.lerp.current)

        if(this.back){
            this.lerp.target += 0.001;
        }
        else{
            this.lerp.target -= 0.001;
        }

        // this.lerp.target += 0.0001; To animate LERP
        this.curve.getPointAt(this.lerp.current, this.vector1);

        this.curve.getPointAt(this.lerp.current + 0.00001, this.vector2);

        this.experience.camera.orthographicCamera.position.copy(this.vector1);
        this.camera.orthographicCamera.lookAt(this.vector2)

    }

Option 5: Camera goes along loop, always points radially inward

    this.directionalVector = new THREE.Vector3(0,0,0);
    this.staticVector = new THREE.Vector3(0,1,0);
    this.crossVector = new THREE.Vector3(0,0,0);

    onWheel(){
    window.addEventListener("wheel", (e) => {
        if(e.deltaY > 0){
            this.lerp.target += 0.01;
            this.back = false;
        }
        else{
            this.lerp.target -= 0.01;
            this.back = true;
        }
    })
    
    update(){
        this.lerp.current = GSAP.utils.interpolate(this.lerp.current, this.lerp.target, this.lerp.ease);

        this.curve.getPointAt(this.lerp.current % 1, this.vector1);
        this.camera.orthographicCamera.position.copy(this.vector1);

        //Finds tangent to the curve, direction vector. Takes cross product of the tangent and the vector (0,1, 0)
        
        this.directionalVector.subVectors(
             //automatically generates a new vector
            this.curve.getPointAt((this.lerp.current % 1) + 0.000001),
            this.vector1
            )
        this.directionalVector.normalize();
        this.crossVector.crossVectors(this.directionalVector, this.staticVector);

        //Scales the cross product so that it is effectively not starting at the origin
        this.crossVector.multiplyScalar(100000);
        
        //For more complex curves, consider setting to lookAt(0,0,0) for impression that camera is focused on the house
        this.camera.orthographicCamera.lookAt(this.crossVector)
    }

    //To make the camera outward vs inward facing, toggle static vector between (0,1,0) and (0,-1,0)
    //The multiply scalar is necessary to make sure the directional vector used 
    //is effectively the one on the path, not the one starting at the origin

Set Path function + class constructor, to create a curve to follow for camera:

    constructor(){
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.time = this.experience.time;
        this.camera = this.experience.camera;
        this.progress = 0;
        this.vector1 = new THREE.Vector3(0,0,0);
        this.vector2 = new THREE.Vector3(0,0,0);

        //linear interpolation, for GSAP scroll
        this.lerp = {
            current: 0,
            target: 0,
            ease: 0.1,
        }

        this.directionalVector = new THREE.Vector3(0,0,0);
        this.staticVector = new THREE.Vector3(0,1,0);
        this.crossVector = new THREE.Vector3(0,0,0);
        
    }

    setPath(){
            //CatmullRomCurve 3 from three.js docs
            this.curve = new THREE.CatmullRomCurve3( [
                new THREE.Vector3( -5, 0, 0),
                new THREE.Vector3( 0, 0, -5),
                new THREE.Vector3( 5, 0, 0 ),
                new THREE.Vector3( 0, 0, 5 ),
            ] );
            this.curve.closed = true;

            const points = this.curve.getPoints( 50 );
            const geometry = new THREE.BufferGeometry().setFromPoints( points );
            const material = new THREE.LineBasicMaterial( { color: 0xff0000 } );
            // Create the final object to add to the scene
            const curveObject = new THREE.Line( geometry, material );
            this.scene.add(curveObject);

        }

*/

