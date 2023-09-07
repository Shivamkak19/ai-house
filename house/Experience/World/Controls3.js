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

        this.device = this.sizes.device;


        this.camera.orthographicCamera.position.set(0, 6.5, 10);

        this.room.children.forEach(child =>{
            if(child.type==="RectAreaLight"){
                this.rectLight = child;
            }
        })

        //Registers the GSAP plug in
        GSAP.registerPlugin(ScrollTrigger);        

        console.log("hit alternate controls3");
        this.setSmoothScroll();
        this.setScrollTrigger();

        // console.log("hit alternate controls3");
        // this.setSmoothScroll();
        // this.setScrollTrigger();
        // document.querySelector(".aitt-page").style.overflowy = "visible";

    }

    setDesktopScroll(){
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
        console.log("operation 3");

        // Used to override the scroll DOM event when the Scrollbar plug in updates
        bodyScrollBar.addListener(({ offset }) => {
            window.dispatchEvent(new Event('scroll-manual'));
            // console.log("Scroll position updated:", offset.y);
        });

    }


    setMobileScroll() {
        const scroller = document.querySelector('.scroller');
      
        const bodyScrollBar = Scrollbar.init(scroller, { damping: 0.5, delegateTo: document });
      
        ScrollTrigger.scrollerProxy(".scroller", {
          scrollTop(value) {
            if (arguments.length) {
              bodyScrollBar.scrollTop = value;
            }
            return bodyScrollBar.scrollTop;
          },
          scrollLeft(value) {
            // Prevent horizontal scrolling
            return 0;
          }
        });
      
        bodyScrollBar.addListener(ScrollTrigger.update);
      
        ScrollTrigger.defaults({ scroller: scroller, vertical: true });
      
        // Disable touch-based horizontal scrolling
        let isTouchMove = false;
        let startX = 0;
        let startY = 0;
      
        scroller.addEventListener('touchstart', function(event) {
          startX = event.touches[0].clientX;
          startY = event.touches[0].clientY;
          isTouchMove = false;
        });
      
        scroller.addEventListener('touchmove', function(event) {
          const deltaX = Math.abs(event.touches[0].clientX - startX);
          const deltaY = Math.abs(event.touches[0].clientY - startY);
      
          if (deltaX > deltaY) {
            event.preventDefault();
            isTouchMove = true;
          }
        });
      
        scroller.addEventListener('touchend', function(event) {
          if (isTouchMove) {
            event.preventDefault();
            isTouchMove = false;
          }
        });
      
        // console.log("operation");
      }


    setSmoothScroll(){
        if(this.device === "desktop"){
            console.log("hite desktop 3")
            this.asscroll = this.setDesktopScroll();
        }
        else{
            console.log("hite mobile 3")
            //mobile scroll idea did not work
            this.asscroll = this.setMobileScroll();

        }
    }

    setScrollTrigger(){
        
        ScrollTrigger.matchMedia({
            "(min-width: 969px)": () => {

            this.camera.orthographicCamera.position.set(0, 6.5, 10);

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

                this.fourthMoveTimeline = new GSAP.timeline({
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
                this.sections = document.querySelectorAll(".section-notIndexPage");
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


    resize(){

    }

    update(){

    }
}


