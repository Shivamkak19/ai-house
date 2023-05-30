import * as THREE from "three";
import { EventEmitter } from "events";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import Experience from "../Experience";
import Renderer from "../Renderer";

export default class Resources extends EventEmitter {
  constructor(assets) {
    super();
    this.experience = new Experience();
    this.renderer = this.experience.renderer;

    this.assets = assets;
    this.items = {};

    this.queue = 2;
    this.loaded = 0;

    this.setLoaders();
    this.startLoading();
  }

  setLoaders() {
    this.loaders = {};
    this.loaders.gltfLoader = new GLTFLoader();
    this.loaders.dracoLoader = new DRACOLoader();
    this.loaders.dracoLoader.setDecoderPath("/draco/");
    this.loaders.gltfLoader.setDRACOLoader(this.loaders.dracoLoader);
  }

  //Sets res to 1/2 for no GPU detected
  startLoading() {
    const gpuPresent = this.checkGPUPresence();

    for (const asset of this.assets) {
      if (asset.type === "glbModel") {
        const loaderOptions = {
          ...asset.loaderOptions,
          dracoOptions: asset.loaderOptions?.dracoOptions
            ? {
                ...asset.loaderOptions.dracoOptions,
                decodeMeshes: gpuPresent,
                meshResolution: gpuPresent ? 1 : 0.5,
              }
            : undefined,
        };

        this.loaders.gltfLoader.load(
          asset.path,
          (file) => {
            this.singleAssetLoaded(asset, file);
          },
          undefined,
          (error) => {
            console.error("Error loading GLTF model:", error);
          },
          loaderOptions
        );
      } else if (asset.type === "videoTexture") {
        this.video = {};
        this.videoTexture = {};

        this.video[asset.name] = document.createElement("video");
        this.video[asset.name].src = asset.path;
        this.video[asset.name].muted = true;
        this.video[asset.name].playsInline = true;
        this.video[asset.name].autoplay = true;
        this.video[asset.name].loop = true;
        this.video[asset.name].play();

        this.videoTexture[asset.name] = new THREE.VideoTexture(this.video[asset.name]);
        this.videoTexture[asset.name].flipY = false;
        this.videoTexture[asset.name].minFilter = THREE.NearestFilter;
        this.videoTexture[asset.name].magFilter = THREE.NearestFilter;
        this.videoTexture[asset.name].generateMipmaps = false;
        this.videoTexture[asset.name].encoding = THREE.sRGBEncoding;

        this.singleAssetLoaded(asset, this.videoTexture[asset.name]);
      }
    }
  }

  singleAssetLoaded(asset, file) {
    this.items[asset.name] = file;
    this.loaded++;

    if (this.loaded === this.queue) {
      this.emit("ready");
    }
  }

  checkGPUPresence() {
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    return !!gl;
  }
}