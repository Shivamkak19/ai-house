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
        document.querySelector(".aitt-page").style.overflow = "visible";

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
        console.log("alternate scrolling operational");
    }


    setSmoothScroll(){
        this.asscroll = this.setOtherScroll();
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


                    console.log("hit section2");
                    GSAP.to(section, {
                        borderTopLeftRadius: 0,
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

                })

             }
        })
    }


    resize(){

    }

    update(){

    }
}


