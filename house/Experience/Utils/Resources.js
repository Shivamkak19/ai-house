//This file loads all of the resources in the project
//check
import * as THREE from "three"
import { EventEmitter } from "events";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader"
import {DRACOLoader} from "three/examples/jsm/loaders/DRACOLoader"
import Experience from "../Experience"
import Renderer from "../Renderer";

export default class Resources extends EventEmitter{
    constructor(assets){
        super();
        this.experience = new Experience();
        this.renderer = this.experience.renderer;

        this.assets = assets;
        this.items = {};

        // disabling video texture: 1
        // enable: queue = 2
        // this.assets.length
        this.queue = 2; 

        this.loaded = 0;

        this.setLoaders();
        this.startLoading();
    }

    setLoaders(){
        this.loaders = {};
        this.loaders.gltfLoader = new GLTFLoader();
        this.loaders.dracoLoader = new DRACOLoader();
        this.loaders.dracoLoader.setDecoderPath("/draco/");
        this.loaders.gltfLoader.setDRACOLoader(this.loaders.dracoLoader);
    }

    startLoading(){
        for(const asset of this.assets){
            if(asset.type === "glbModel"){
                this.loaders.gltfLoader.load(asset.path, (file)=>{
                    this.singleAssetLoaded(asset, file);
                });
            }

            // disabled video texture to improve performance

            else if(asset.type === "videoTexture"){
                this.video = {};
                this.videoTexture = {};

                //Hardcoding the video texture
                this.video[asset.name] = document.createElement("video");
                this.video[asset.name].src = asset.path;
                this.video[asset.name].muted = true;
                this.video[asset.name].playsInline = true;
                this.video[asset.name].autoplay = true;
                this.video[asset.name].loop = true;
                this.video[asset.name].play();

                //div element
                this.videoTexture[asset.name] = new THREE.VideoTexture(this.video[asset.name]);
                this.videoTexture[asset.name].flipY = false;
                this.videoTexture[asset.name].minFilter = THREE.NearestFilter;
                this.videoTexture[asset.name].magFilter = THREE.NearestFilter;
                this.videoTexture[asset.name].generateMigmaps = false;
                this.videoTexture[asset.name].encoding = THREE.sRGBEncoding;

                this.singleAssetLoaded(asset, this.videoTexture[asset.name]);


            }
        }
    }

    singleAssetLoaded(asset, file){
        this.items[asset.name] = file;
        this.loaded++;

        //if this is true, that means all of the assets are loaded
        if(this.loaded === this.queue){
            this.emit("ready");
        }
    }
}
