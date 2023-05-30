import Experience from "../Experience"
import * as THREE from "three"
import GSAP from "gsap"
import {ScrollTrigger} from "gsap/ScrollTrigger"
import ASScroll from '@ashthornton/asscroll'
import Scrollbar from 'smooth-scrollbar';



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

        console.log("got to controls2");
        this.setSmoothScroll();
        this.setScrollTrigger();
        document.querySelector(".home-page").style.overflowy = "visible";

    }

    setOtherScroll(){
        const scroller = document.querySelector('.scroller');

const bodyScrollBar = Scrollbar.init(scroller, { damping: 0.1, delegateTo: document, alwaysShowTracks: true });

ScrollTrigger.scrollerProxy(".scroller", {
  scrollTop(value) {
    if (arguments.length) {
      bodyScrollBar.scrollTop = value;
    }
    return bodyScrollBar.scrollTop;
  }
});

bodyScrollBar.addListener(ScrollTrigger.update);

ScrollTrigger.defaults({ scroller: scroller });
console.log("operation");
    }

    setupASScroll() {
        // https://github.com/ashthornton/asscroll
        const asscroll = new ASScroll({
            disableRaf: true
        });
    
        GSAP.ticker.add(asscroll.update);
    
        ScrollTrigger.defaults({
            scroller: asscroll.containerElement
        });
    
        ScrollTrigger.scrollerProxy(asscroll.containerElement, {
            scrollTop(value) {
                if (arguments.length) {
                    asscroll.currentPos = value;
                    return;
                }
                return asscroll.currentPos;
            },
            getBoundingClientRect() {
                return { top: 100, left: 100, width: window.innerWidth, height: window.innerHeight }
            },
            fixedMarkers: true
        });
    
        asscroll.on("update", ScrollTrigger.update);
        ScrollTrigger.addEventListener("refresh", asscroll.resize);
        
        requestAnimationFrame(() => {
           asscroll.enable({
                newScrollElements: document.querySelectorAll(".gsap-marker-start, .gsap-marker-end, [asscroll]")
            }); 
        });
        return asscroll;
    }

    setSmoothScroll(){
        this.asscroll = this.setOtherScroll();
    }
    
    setScrollTrigger(){

        ScrollTrigger.matchMedia({
            "(min-width: 969px)": () => {

                //Resets////////////////
                this.camera.orthographicCamera.position.set(0, 6.5, 10);


                //2nd section desktop//////////////////////////////////////////////
                this.firstMoveTimeline = new GSAP.timeline({ 
                    scrollTrigger: {
                        trigger: "#anchor1",
                        markers: false,
                        start: "top top",
                        end: "+=250",
                        scrub: 1,
                        invalidateOnRefresh: true,
                    }
                })

                .to(this.camera.orthographicCamera.position, {
                    x: -2,
                    y: 6.5,
                    z: 10,
                }) 


                //2nd section desktop//////////////////////////////////////////////
                this.secondMoveTimeline = new GSAP.timeline({ 
                    scrollTrigger: {
                        trigger: "#anchor2",
                        markers: false,
                        start: "top top",
                        end: "+=250",
                        scrub: 1,
                        invalidateOnRefresh: true,
                    }
                })

                .to(this.camera.orthographicCamera.position, {
                    x: 2,
                    y: 6.5,
                    z: 10,
                }) 

                // //3rd section desktop//////////////////////////////////////////////
                // this.thirdMoveTimeline = new GSAP.timeline({ 
                //     scrollTrigger: {
                //         trigger: "#anchor3",
                //         markers: false,
                //         start: "top top",
                //         end: "+=250",
                //         scrub: 1,
                //         invalidateOnRefresh: true,
                //     }
                // })

                // .to(this.camera.orthographicCamera.position, {
                //     x: -2,
                //     y: 6.5,
                //     z: 10,
                // }) 

                
                // //4th section desktop//////////////////////////////////////////////////////
                // this.fourthMoveTimeline = new GSAP.timeline({
                //     scrollTrigger: {
                //         trigger: "#anchor4",
                //         markers: false,
                //         start: "top top",
                //         end: "+=250",
                //         scrub: 1,
                //         invalidateOnRefresh: true,
                //     }
                // })

                // .to(this.camera.orthographicCamera.position, {
                //     x: 2,
                //     y: 6.5,
                //     z: 10,
                // }) 

                //5th section desktop//////////////////////////////////////////////////////
                this.fifthMoveTimeline = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: "#anchor5",
                        markers: false,
                        start: "top top",
                        end: "+=250",
                        scrub: 1,
                        invalidateOnRefresh: true,
                    }
                })

                .to(this.camera.orthographicCamera.position, {
                    x: -2,
                    y: 6.5,
                    z: 10,
                }) 

            },
            
            //Mobile/////////////////////////////////////////////////////////
            "(max-width: 968px)": () => {

                //Resets
                this.room.position.set(0,0,0);

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

                // //third section mobile//////////////////////////////////////////////////////

                // this.thirdMoveTimeline = new GSAP.timeline({
                //     scrollTrigger: {
                //         trigger: ".third-move",
                //         markers: false,
                //         start: "top top",
                //         end: "bottom bottom",
                //         scrub: 2,
                //         invalidateOnRefresh: true,
                //     }
                // }).to(this.room.position, {
                //     z: -4.5,
                // })

                // //fourth section mobile//////////////////////////////////////////////////////

                // this.fourthMoveTimeline = new GSAP.timeline({
                //     scrollTrigger: {
                //         trigger: ".fourth-move",
                //         markers: false,
                //         start: "top top",
                //         end: "bottom bottom",
                //         scrub: 2,
                //         invalidateOnRefresh: true,
                //     }
                // }).to(this.room.position, {
                //     z: 0,
                // })

                //fifth section mobile//////////////////////////////////////////////////////

                this.fifthMoveTimeline = new GSAP.timeline({
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

             }
        })
    }

    //matches the Media, has a different scroll Trigger based on size of the screen
    //uses arrow function as opposed to function() {} from the docs, to retain access to local variables

    // setSmoothScroll(){
    //     Scrollbar.init(document.querySelector('#my-scrollbar'));
    //     Scrollbar.initAll()
    // }


    resize(){

    }

    update(){

    }
}



