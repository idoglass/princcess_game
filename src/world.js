import * as THREE from 'three';
import { Tree } from './objects/Tree';
import { Rock } from './objects/Rock';
import { Bush } from './objects/Bush';
import { getKey } from './utils/util';

const tileTexture = new THREE.TextureLoader().load('textures/grass.jpg')
export class World extends THREE.Group {
    #objectMap = new Map();



    constructor(width, height) {
        super();

        this.width = width;
        this.height = height;
        this.treesCount = 10;
        this.rocksCount = 10;
        this.bushesCount = 10;


        this.bushes = new THREE.Group();
        this.add(this.bushes);

        this.rocks = new THREE.Group();
        this.add(this.rocks);

        this.trees = new THREE.Group();
        this.add(this.trees);

        this.path = new THREE.Group();
        this.add(this.path);

        this.createWorld();
    }

    createWorld() {
        this.clearWorld();
        this.createTerrain();
        this.createTrees();
        this.createRocks();
        this.createBushes();
    }

    clearWorld() {
        if (this.terrain) {
            this.terrain.geometry.dispose();
            this.terrain.material.dispose();
            this.remove(this.terrain);
        }
        if (this.trees) {
            this.trees.children.forEach(tree => {
                tree.geometry.dispose();
                tree.material.dispose();
            })
            this.trees.clear();
        }
        if (this.rocks) {
            this.rocks.children.forEach(rock => {
                rock.geometry.dispose();
                rock.material.dispose();
            })
            this.rocks.clear();
        }
        if (this.bushes) {
            this.bushes.children.forEach(bush => {
                bush.geometry.dispose();
                bush.material.dispose();
            })
            this.bushes.clear();
        }
        this.#objectMap.clear();

    }

    createTerrain() {

        tileTexture.repeat = new THREE.Vector2(this.width, this.height);
        tileTexture.wrapS = THREE.RepeatWrapping
        tileTexture.wrapT = THREE.RepeatWrapping
        tileTexture.colorSpace = THREE.SRGBColorSpace;


        const worldGeometry = new THREE.PlaneGeometry(this.width, this.height, this.width, this.height);
        const worldGMaterial = new THREE.MeshStandardMaterial({
            map: tileTexture,
            wireframe: false
        })
        this.terrain = new THREE.Mesh(worldGeometry, worldGMaterial);
        this.terrain.rotation.x = -Math.PI / 2;
        this.terrain.position.set(this.width / 2, 0, this.height / 2)

        this.add(this.terrain);
    }

    createTrees() {
        for (let index = 0; index < this.treesCount; index++) {
            const coords = new THREE.Vector3(
                Math.floor(this.width * Math.random()),
                0,
                Math.floor(this.height * Math.random())
            )
            
            const tree = new Tree(coords);
            this.addObject(coords, tree, this.trees);
        }
    }

    createBushes() {
        for (let index = 0; index < this.treesCount; index++) {
            const coords = new THREE.Vector3(
                Math.floor(this.width * Math.random()),
                0,
                Math.floor(this.height * Math.random())
            )
            
            const bush = new Bush(coords);
            this.addObject(coords, bush, this.bushes);
        }
    }

      /**
     * Adds an object to the world at the specified coordinates unless
     * an object already exists at those coordinates
     * @param {THREE.Vector3} coords 
      * @param {GameObject} object 
     * @param {THREE.Group} group The group to add the object to
     * @returns 
     */
    addObject(coords, object, group) { 
        if (this.#objectMap.has(getKey(coords))) return false;
        group.add(object)
        this.#objectMap.set(getKey(coords), object);
        return true;
    }


    createRocks() {
        for (let index = 0; index < this.rocksCount; index++) {

            const coords = new THREE.Vector3(
                Math.floor(this.width * Math.random()),
                0,
                Math.floor(this.height * Math.random())
            );

            const rock = new Rock(coords);   
            this.addObject(coords, rock, this.rocks);
        }
    }

    /**
     * Return object at coord or null
     * @param {THREE.Vector2} coords 
     * @returns {object | null}
     */

    getObject(coords) {
        return this.#objectMap.get(getKey(coords)) ?? null
    }
}