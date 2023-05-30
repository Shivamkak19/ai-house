import { EventEmitter } from "events";
import Experience from "./Experience"
import GSAP from "gsap";
import convert from "./Utils/convert"

export default class Preloader extends EventEmitter{
    constructor(){
        super();

        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.sizes = this.experience.sizes;
        this.resources = this.experience.resources;
        this.time = this.experience.time;
        this.camera = this.experience.camera;
        this.world = this.experience.world;
        this.device = this.sizes.device;


        this.sizes.on("switchdevice", (device) => {
            this.device = device;
        })

        this.world.on("worldready", ()=>{

            this.floor = this.experience.world.floor;

            this.setAssets();
            this.playIntro();

        })
    }

    setAssets(){

        //Convert.js file converts divs to spans of 1 char size, sets overflow hidden (hides the text)
        convert(document.querySelector(".intro-text"));
        convert(document.querySelector(".hero-main-title"));
        convert(document.querySelector(".hero-main-description"));

        this.room = this.experience.world.room.actualRoom;
        this.roomChildren = this.experience.world.room.roomChildren;
        console.log(this.roomChildren);
    }

    intro1(){
        //Asynchronous programming for javascript
        return new Promise((resolve) =>{
            this.timeline = new GSAP.timeline();

            //For mobile responsiveness ///////////
            this.timeline.set(".animated", {
                y: 0,
                yPercent: 100,
            })
            //For mobile responsiveness ///////////


            //Preloader animation timeline///////////////
            this.timeline.to(".preloader", {
                opacity: 0,
                delay: 1.5, //how long the preloader stays at minimum
                onComplete: () =>{
                    document.querySelector(".preloader").classList.add("hidden"); //find out why this is "hidden" instead of ".hidden"
                }
            })
            /////////////////////////////////////////////

            if(this.device === "desktop"){
    
                this.timeline.to(this.roomChildren.cubicle.scale, {
                    x: 1.4,
                    y: 1.4,
                    z: 1.4,
                    ease: "back.out(2.5)",
                    duration: 0.7,
                }).to(this.room.position, {
                    x: -1,
                    ease: "power1.out",
                    duration: 1,
                    // onComplete: resolve,
                })
            }
    
            //mobile
            else{
                this.timeline.to(this.roomChildren.cubicle.scale, {
                    x: 1.4,
                    y: 1.4,
                    z: 1.4,
                    ease: "back.out(2.5)",
                    duration: 0.7,
                }).to(this.room.position, {
                    z: -1,
                    ease: "power1.out",
                    duration: 0.7,
                    // onComplete: resolve,

                })
            }
            
            // Separate timeline for text so that it does not appear simultaneously with room
            this.timeline.to(".intro-text .animated", {
                yPercent: 0,
                stagger: 0.05, //Staggers each character's entrance
                ease: "back.out(1.7)", //same ease, less intensity
            })
            .to(".arrow-svg-wrapper", {
                opacity: 1,
                onComplete: resolve,
            }, ">-0.5")
            

            // .to(this.floor.plane, {
            //     visible: true,
            //     ease: 0.8,
            //     scrub: true,
            //     duration: 30,
            //     onComplete: resolve,
            // })

        })
    }

    intro2(){

        return new Promise((resolve) =>{

        this.secondTimeline = new GSAP.timeline();

        //Second Animation for Text ////////////////////////////////////
            this.secondTimeline.to(".intro-text .animated", {
                yPercent: 100,
                stagger: 0.05, //Staggers each character's entrance
                ease: "back.in(1.7)", //same ease, less intensity

            }, "fadeOut").to(".arrow-svg-wrapper", {
                opacity: 0,
            }, "fadeOut")

        ///////////////////////////////////////////////////////////////
            .to(this.room.position, {
                x: 0,
                y: 0,
                z: 0,
                ease: "power1.out",
                // duration: 0.7,
            }, "same")

            .to(this.roomChildren.cubicle.rotation, {
                y: 2*Math.PI + Math.PI/4
            }, "same")

            .to(this.roomChildren.cubicle.scale, {
                x: 10,
                y: 10,
                z: 10,
            }, "same")

            .to(this.camera.orthographicCamera.position, {
                y: 6.5,

            }, "same")
            
            .to(this.roomChildren.cubicle.position, {
                x: 0.488,
                y: 7.253,
                z: 0.0689,

                //Loading the Room object animations
            }, "same")
            
            .set(this.roomChildren.room.scale, {
                x: 1, 
                y: 1,
                z: 1,
            }, ">0.4")
            
            .to(this.roomChildren.cubicle.scale, {
                x: 0,
                y: 0,
                z: 0,
                duration: 1,

        //Intro-Text Animations after cubicle goes to 0 //////////////////////
            }, "introText").to(".hero-main .animated", {
                yPercent: 0,
                stagger: 0.07, 
                ease: "back.out(1.7)", 
            }, "introText").to(".hero-main-description .animated", {
                yPercent: 0,
                stagger: 0.07, 
                ease: "back.out(1.7)",   
            }, "introText").to(".first-sub .animated", {
                yPercent: 0,
                stagger: 0.07, 
                ease: "back.out(1.7)", 
            }, "introText").to(".second-sub .animated", {
                yPercent: 0,
                stagger: 0.07, 
                ease: "back.out(1.7)",               
        ///////////////////////////////////////////////////////////////////
        //">-0.4" tags play the animations earlier, to make the animation more fluid
        
            }, "introText").to(this.roomChildren.table_base.scale, {
                x: 1,
                y: 1,
                z: 1,
                ease: "back.out.(2.2)",
                duration: 0.4,
            }).to(this.roomChildren.stool.scale, {
                x: 1,
                y: 1,
                z: 1,
                ease: "back.out.(2.2)",
                duration: 0.4,
            })
            
            .to(this.roomChildren.fish_tank.scale, {
                x: 1,
                y: 1,
                z: 1,
                ease: "back.out.(2.2)",
                duration: 0.4,
            }, ">-0.5")

            .to(this.roomChildren.clock.scale, {
                x: 1,
                y: 1,
                z: 1,
                ease: "back.out.(2.2)",
                duration: 0.4,
            }, ">-0.325").to(this.roomChildren.desk_content.scale, {
                x: 1,
                y: 1,
                z: 1,
                ease: "back.out.(2.2)",
                duration: 0.4,
            }, ">-0.3125")

            .to(this.roomChildren.cos126.scale, {
                x: 1,
                y: 1,
                z: 1,
                ease: "back.out.(2.2)",
                duration: 0.4,
            }, ">-0.3")
            
            .to(this.roomChildren.computer.scale, {
                x: 1,
                y: 1,
                z: 1,
                ease: "back.out.(2.2)",
                duration: 0.4,
            }, ">-0.2875")

            .to(this.roomChildren.cos226.scale, {
                x: 1,
                y: 1,
                z: 1,
                ease: "back.out.(2.2)",
                duration: 0.4,
            }, ">-0.275")
            
            .to(this.roomChildren.smallprinceton.scale, {
                x: 1,
                y: 1,
                z: 1,
                ease: "back.out.(2.2)",
                duration: 0.4,
            }, ">-0.2625")
            
            .to(this.roomChildren.fish.scale, {
                x: 1,
                y: 1,
                z: 1,
                ease: "back.out.(1.2)",
                duration: 0.4,
            }, ">-0.25").to(this.roomChildren.rectLight.scale, {
                x: 1,
                y: 1,
                z: 1,
                ease: "back.out.(2.2)",
                duration: 0.4,
            }, ">-0.2375").to(this.roomChildren.shelf_1.scale, {
                x: 1,
                y: 1,
                z: 1,
                ease: "back.out.(2.2)",
                duration: 0.4,
            }, ">-0.2250")
            
            .to(this.roomChildren.shelf_2.scale, {
                x: 1,
                y: 1,
                z: 1,
                ease: "back.out.(2.2)",
                duration: 0.4,
            }, ">-0.2125")

            .to(this.roomChildren.cos.scale, {
                x: 1,
                y: 1,
                z: 1,
                ease: "back.out.(2.2)",
                duration: 0.4,
            }, ">-0.2")
            
            .to(this.roomChildren.chair.scale, {
                x: 1,
                y: 1,
                z: 1,
                ease: "back.out.(2.2)",
                duration: 0.4,
            }, "chair").to(this.roomChildren.chair.rotation, {
                y: 4 * Math.PI + Math.PI / 4,
                ease: "power2.out",
                duration: 1,
            }, "chair").to(this.roomChildren.chair_seat.scale, {
                x: 1,
                y: 1,
                z: 1,
                ease: "back.out.(2.2)",
                duration: 0.4,
            }, "chair")
            
            //Last arrow-svg animation after room animation is complete ////////////////////////////
            .to(".arrow-svg-wrapper", {
                opacity: 1,
            })
            ////////////////////////////////////

            .to(this.roomChildren.garden_floor.scale, {
                x: 1,
                y: 1,
                z: 1,
                ease: "back.out.(2.2)",
                duration: 0.4,
            }, "chair")

            .to("#logoID", {
                opacity: 1,
            }, "chair")

            .to(".toggle-bar", {
                opacity: 1,
            }, "chair")

            .to(".navContainer", {
                opacity: 1,
                onComplete: resolve,
            }, "chair")


            
        })
    }

    onScroll(e){
        if(e.deltaY > 0){
            this.removeEventListeners();
            // this.playIntro2();
        }
    }

    onTouch(e){
        this.initialY = e.touches[0].clientY;
    }

    //For when user touches on mobile, triggers intro2 instead of scroll
    onTouchMove(e){
        console.log(e)

        let currentY = e.touches[0].clientY;
        let difference = this.initialY - currentY;
        if(difference > 0){
            console.log("swiped up");
            this.removeEventListeners();
            this.playIntro2();
        }
        this.initialY = null;
    }

    removeEventListeners(){
        window.removeEventListener("wheel", this.scrollOnceEvent);
        window.removeEventListener("touchstart", this.touchStart);
        window.removeEventListener("touchmove", this.touchMove);
    }

    async playIntro(){
        //Waits till animation1 is complete before sending signal
        await this.intro1();
        this.moveFlag = true;

        this.playIntro2();
        console.log("hit 1")

        //onScroll cannot remove itself, so establish a pointer
        this.scrollOnceEvent = this.onScroll.bind(this);
        this.touchStart = this.onTouch.bind(this);
        this.touchMove = this.onTouchMove.bind(this);

        //calls these functions upon the EventListener
        window.addEventListener("wheel", this.scrollOnceEvent);
        window.addEventListener("touchstart", this.touchStart);
        window.addEventListener("touchmove", this.touchMove);

        
    }

    async playIntro2(){

        const delay = ms => new Promise(res => setTimeout(res, ms));

        await delay(1000);
        console.log("hit 2")

        this.moveFlag = false;
        this.scaleFlag = true;
        await this.intro2();
        this.scaleFlag = false; //Hosue scaling only needed till end of preloader animations

        this.emit("enablecontrols");

    }

    //Shifts the location of the preloader depending on mobile vs desktop device
    move(){
        if(this.device === "desktop"){
            this.room.position.set(-1, 0, 0);
        }
        else{
            this.room.position.set(0, 0, -1)
        }
    }

    scale(){
        this.roomChildren.rectLight.width = 0;
        this.roomChildren.rectLight.height = 0;

        if(this.device === "desktop"){
            this.room.scale.set(0.11, 0.11, 0.11);
        }
        else{
            this.room.scale.set(0.07, 0.07, 0.07);
        }
    }

    update(){
        //Only calls this update function between intro1 and intro2, where moveFlag is set from true to false
        if(this.moveFlag){
            this.move();
        }

        if(this.scaleFlag){
            this.scale();
        }
    }

}