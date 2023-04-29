  // setScrollTrigger(){
    //     ScrollTrigger.matchMedia({
	
    //         //Desktop
    //         "(min-width: 969px)": () => {

    //             //Resets////////////////
    //             this.room.scale.set(0.11, 0.11, 0.11);
    //             this.rectLight.width = 0.5;
    //             this.rectLight.height = 0.7;
    //             this.camera.orthographicCamera.position.set(0, 6.5, 10);
    //             this.room.position.set(0, 0, 0);

    //             //First section desktop/////////////////////////////////////////
    //             this.firstMoveTimeline = new GSAP.timeline({
    //                 scrollTrigger: {
    //                     trigger: ".first-move",
    //                     markers: false,
    //                     start: "top top",
    //                     end: "bottom bottom",
    //                     scrub: 1.5,
    //                     invalidateOnRefresh: true,
    //                 }
    //             })

    //             // .fromTo(this.room.position, {x: 0}, 
    //             //     {x: () => {
    //             //         return this.sizes.width * 0.0014;
    //             //     }, 
    //             //     duration: 1})


    //             // this.firstMoveTimeline.to(this.room.position, {
    //             //     x: () => {
    //             //         return this.sizes.width * 0.0014;
    //             //     }
    //             // })

    //             //2nd section desktop//////////////////////////////////////////////
    //             this.secondMoveTimeline = new GSAP.timeline({ 
    //                 scrollTrigger: {
    //                     trigger: ".second-move",
    //                     markers: false,
    //                     start: "top top",
    //                     end: "bottom bottom",
    //                     scrub: 1.5,
    //                     invalidateOnRefresh: true,
    //                 }
    //             })

    //             // .fromTo(this.room.position, 
    //             //     {x: () => {
    //             //     return this.sizes.width * 0.0014;
    //             //     },
    //             //     z: 0}, 

    //             //     {x: () => {
    //             //         return 1;
    //             //     }, 
    //             //     z: ()=>{
    //             //         return this.sizes.height * 0.0032;
    //             //     },
    //             //     duration: 1})

     

    //             .to(this.room.position, {
    //                 x: () => {
    //                     return 1;
    //                 },
    //                 z: ()=>{
    //                     return this.sizes.height * 0.0032;
    //                 },
    //             },
    //             "same" //makes position and scaling happen together
    //             )    
                
    //             // .fromTo(this.room.scale, {x: 0.11, y: 0.11, z: 0.11}, 
    //             //     {x: 0.4, y: 0.4, z: 0.4, duration: 1}, "same")


    //             // .fromTo(this.rectLight, {width: 0.5, height: 0.7, intensity: 7}, 
    //             //     {width: 0.5 *4, height: 0.7 *4, intensity: 10, duration: 1}, "same")           
                
    //             // .to(this.room.scale, {
    //             //     x: 0.4,
    //             //     y: 0.4,
    //             //     z: 0.4,
    //             // },
    //             // "same"
    //             // )     
    //             // .to(this.rectLight, {
    //             //     width: 0.5 * 4,
    //             //     height: 0.7 * 4,
    //             //     intensity: 10,
    //             // },
    //             // "same"
    //             // ) 

    //             //4th section desktop//////////////////////////////////////////////
    //             this.secondMoveTimeline = new GSAP.timeline({ 
    //                 scrollTrigger: {
    //                     trigger: ".fourth-move",
    //                     markers: false,
    //                     start: "top top",
    //                     end: "bottom bottom",
    //                     scrub: 1.5,
    //                     invalidateOnRefresh: true,
    //                 }
    //             })

    //             // .fromTo(this.room.scale, {x: 0.4, y: 0.4, z: 0.4}, 
    //             //     {x: 0.3, y: 0.3, z: 0.3, duration: 1}, "same2")


    //             // .fromTo(this.camera.orthographicCamera.position, {x: 0, y: 6.5}, 
    //             //     {x: 1, y: 8, duration: 1}, "same2")           
    
    //             // .to(this.room.scale, {
    //             //     x: 0.3,
    //             //     y: 0.3,
    //             //     z: 0.3,
    //             //     duration: 0.5,

    //             // }, "same")    
    //             // .to(this.camera.orthographicCamera.position, {
    //             //     x: 1,
    //             //     y: 8,
    //             //     duration: 0.5,

    //             // }, "same") 

    //             //5th section desktop//////////////////////////////////////////////
    //             this.secondMoveTimeline = new GSAP.timeline({ 
    //                 scrollTrigger: {
    //                     trigger: ".fifth-move",
    //                     markers: false,
    //                     start: "top top",
    //                     end: "bottom bottom",
    //                     scrub: 1.5,
    //                     invalidateOnRefresh: true,
    //                 }
    //             })

    //             // .fromTo(this.camera.orthographicCamera.position, {y: 8}, 
    //             //     {y: 6.5, duration: 1}, "same3")   

    //             // .fromTo(this.room.rotation, {y: 0}, 
    //             //     {y: Math.PI / 2, duration: 1}, "same3")


    //             // .to(this.camera.orthographicCamera.position, {
    //             //     x: 1,
    //             //     y: 6.5,
    //             // }, "same") 
    //             // .to(this.room.rotation, {
    //             //     y: Math.PI / 2,
    //             // }, "same") 
                
    //             //third section desktop//////////////////////////////////////////////////////
    //             this.thirdMoveTimeline = new GSAP.timeline({
    //                 scrollTrigger: {
    //                     trigger: ".third-move",
    //                     markers: false,
    //                     start: "top top",
    //                     end: "bottom bottom",
    //                     scrub: 1.5,
    //                     invalidateOnRefresh: true,
    //                 }
    //             })

    //             // .fromTo(this.camera.orthographicCamera.position, {x: 1, y: 6.5}, 
    //             //     {x: -1.25, y: 6, duration: 1}, "same4")   

    //             // .fromTo(this.room.rotation, {y: Math.PI / 2}, 
    //             //     {y: 0, duration: 1}, "same4")

    //             // .fromTo(this.room.scale, {x: 0.3, y: 0.3, z: 0.3}, 
    //             // {x: 0.16, y: 0.16, z: 0.16, duration: 1}, "same4")

    //             // .to(this.camera.orthographicCamera.position, {
    //             //     x: -1.25,
    //             //     y: 6,
    //             //     }, "same"
    //             // )
    //             // .to(this.room.rotation, {
    //             //     y: 0,
    //             // }, "same") 

    //             // .to(this.room.scale, {
    //             //     x: 0.16,
    //             //     y: 0.16,
    //             //     z: 0.16,
    //             // }, "same") 
 



    //         },
            
    //         //Mobile/////////////////////////////////////////////////////////
    //         "(max-width: 968px)": () => {

    //             //Resets

    //             this.room.scale.set(0.07, 0.07, 0.07)
    //             this.room.position.set(0,0,0);
    //             this.rectLight.width = 0.3;
    //             this.rectLight.height = 0.4;
    //             this.camera.orthographicCamera.position.set(0, 6.5, 10);

    //             //First section mobile/////////////////////////////////////////
    //             this.firstMoveTimeline = new GSAP.timeline({
    //                 scrollTrigger: {
    //                     trigger: ".first-move",
    //                     markers: false,
    //                     start: "top top",
    //                     end: "bottom bottom",
    //                     scrub: 2,
    //                     invalidateOnRefresh: true,
    //                 }
    //             })
    //             .to(this.room.scale,{
    //                 x: 0.1,
    //                 y: 0.1,
    //                 z: 0.1,
    //             })

    //             //2nd section mobile//////////////////////////////////////////////
    //             this.secondMoveTimeline = new GSAP.timeline({ 
    //                 scrollTrigger: {
    //                     trigger: ".second-move",
    //                     markers: false,
    //                     start: "top top",
    //                     end: "bottom bottom",
    //                     scrub: 3,
    //                     invalidateOnRefresh: true,
    //                 }
    //             }).to(this.room.scale,{
    //                 x: 0.25,
    //                 y: 0.25,
    //                 z: 0.25,
    //             }, "same").to(this.rectLight, {
    //                 width: 0.3 * 3.4,
    //                 height: 0.4 * 3.4
    //             }, "same").to(this.room.position, {
    //                 x: 1.5,
    //                 y: 0,
    //             }, "same")

    //             //third section mobile//////////////////////////////////////////////////////

    //             this.thirdMoveTimeline = new GSAP.timeline({
    //                 scrollTrigger: {
    //                     trigger: ".third-move",
    //                     markers: false,
    //                     start: "top top",
    //                     end: "bottom bottom",
    //                     scrub: 2,
    //                     invalidateOnRefresh: true,
    //                 }
    //             }).to(this.room.position, {
    //                 z: -4.5,
    //             })

    //             //fourth section mobile//////////////////////////////////////////////////////

    //             this.thirdMoveTimeline = new GSAP.timeline({
    //                 scrollTrigger: {
    //                     trigger: ".fourth-move",
    //                     markers: false,
    //                     start: "top top",
    //                     end: "bottom bottom",
    //                     scrub: 2,
    //                     invalidateOnRefresh: true,
    //                 }
    //             }).to(this.room.position, {
    //                 z: 0,
    //             })

    //             //fifth section mobile//////////////////////////////////////////////////////

    //             this.thirdMoveTimeline = new GSAP.timeline({
    //                 scrollTrigger: {
    //                     trigger: ".fifth-move",
    //                     markers: false,
    //                     start: "top top",
    //                     end: "bottom bottom",
    //                     scrub: 2,
    //                     invalidateOnRefresh: true,
    //                 }
    //             }).to(this.room.scale, {
    //                 x: 0.35,
    //                 y: 0.35,
    //                 z: 0.35,
    //             }, "same").to(this.room.position, {
    //                 z: 2,
    //             }, "same")
    //         },
          
    //         //All - Animated GSAP for all media queries /////////////////////////////////
    //         "all": () => {

    //             //Grabs the section class to animate progress bar
    //             this.sections = document.querySelectorAll(".section");
    //             this.sections.forEach((section) => {
    //                 this.progressWrapper = section.querySelector(".progress-wrapper");
    //                 this.progressBar = section.querySelector(".progress-bar");

    //                 //Puts the scroll trigger directly inside the tween because there is only 1 tween so this parses
    //                 if(section.classList.contains("right")){
    //                     GSAP.to(section, {
    //                         borderTopLeftRadius: 100,
    //                         scrollTrigger:{
    //                             trigger: section,
    //                             start: "top bottom",
    //                             end: "top top",
    //                             scrub: 0.6,
    //                         }
    //                     })
    //                     GSAP.to(section, {
    //                         borderBottomLeftRadius: 700,
    //                         scrollTrigger:{
    //                             trigger: section,
    //                             start: "bottom bottom",
    //                             end: "bottom top",
    //                             scrub: 0.6,
    //                         }
    //                     })
    //                 }
    //                 //For left sections
    //                 else{
    //                     GSAP.to(section, {
    //                         borderTopRightRadius: 100,
    //                         scrollTrigger:{
    //                             trigger: section,
    //                             start: "top bottom",
    //                             end: "top top",
    //                             scrub: 0.6,
    //                         }
    //                     })
    //                     GSAP.to(section, {
    //                         borderBottomRightRadius: 700,
    //                         scrollTrigger:{
    //                             trigger: section,
    //                             start: "bottom bottom",
    //                             end: "bottom top",
    //                             scrub: 0.6,
    //                         }
    //                     })                        
    //                 }

    //                 GSAP.from(this.progressBar, {
    //                     scaleY: 0,
    //                     scrollTrigger: {
    //                         trigger: section,
    //                         start: "+=100",
    //                         end: "+=500",
    //                         scrub: 0.8,
    //                         pin: this.progressWrapper,
    //                         pinSpacing: false,
    //                     }
    //                 })
    //             })

    //             //Circle Animations//////////////////////////////////////////////

    //                             //First section desktop/////////////////////////////////////////
    //                             this.firstMoveTimeline = new GSAP.timeline({
    //                                 scrollTrigger: {
    //                                     trigger: ".first-move",
    //                                     markers: false,
    //                                     start: "top top",
    //                                     end: "bottom bottom",
    //                                     scrub: 4,
    //                                     invalidateOnRefresh: true,
    //                                 }
    //                             }).to(this.circle1.scale, {
    //                                 x: 3, 
    //                                 y: 3,
    //                                 z: 3,
    //                             })
                
                
    //         }
    //       }); 


    // }