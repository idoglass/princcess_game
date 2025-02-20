import * as THREE from 'three';

const tileTexture = new THREE.TextureLoader().load('textures/grass.jpg')
export class World extends THREE.Group {
    #objectMap = new Map();

    getKey = (coords) => `${coords.x}-${coords.y}`


    constructor(width, height) {
        super();

        this.width = width;
        this.height = height;
        this.treesCount = 20;
        this.rocksCount = 20;
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
            }
            )

            this.trees.clear();
        }
        if (this.rocks) {
            this.rocks.children.forEach(rock => {
                rock.geometry.dispose();
                rock.material.dispose();
            }
            )

            this.rocks.clear();
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

        const treeHeight = 1;
        const treeRadius = 0.2;

        const treeGeometry = new THREE.ConeGeometry(treeRadius, treeHeight, 8);
        const treeMaterial = new THREE.MeshStandardMaterial({
            color: 0x305100,
            flatShading: true
        });


        this.trees.clear();

        for (let index = 0; index < this.treesCount; index++) {

            const coords = new THREE.Vector2(
                Math.floor(this.width * Math.random()),
                Math.floor(this.height * Math.random())
            )

            if (this.#objectMap.has(this.getKey(coords))) continue;
            const treeMesh = new THREE.Mesh(treeGeometry, treeMaterial);
            treeMesh.position.set(
                coords.x + 0.5,
                treeHeight / 2,
                coords.y + 0.5
            )

            treeMesh.name = `Tree (${coords.x},${coords.y})`


            this.trees.add(treeMesh)
            this.#objectMap.set(this.getKey(coords), treeMesh);
        }
    }


    createRocks() {


        const minRockRadius = 0.1;
        const maxRockRadius = 0.3;

        const minRockHeight = 0.5;
        const maxRockHeight = 1;

        this.rocks.clear();

        for (let index = 0; index < this.rocksCount; index++) {
            const radius = minRockRadius + Math.random() * (maxRockRadius - minRockRadius);
            const height = minRockHeight + Math.random() * (maxRockHeight - minRockHeight);
            const rockGeometry = new THREE.SphereGeometry(
                radius,
                8,
                5
            );
            const rockMaterial = new THREE.MeshStandardMaterial({
                color: 0xb0b0b0,
                flatShading: true
            });

            const coords = new THREE.Vector2(
                Math.floor(this.width * Math.random()),
                Math.floor(this.height * Math.random())
            );
            if (this.#objectMap.has(this.getKey(coords))) continue;

            const rockMesh = new THREE.Mesh(rockGeometry, rockMaterial);
            rockMesh.scale.y = height;
            rockMesh.position.set(
                coords.x + 0.5,
                0,
                coords.y + 0.5
            )
            rockMesh.name = `Rock (${coords.x},${coords.y})`

            this.rocks.add(rockMesh)
            this.#objectMap.set(this.getKey(coords), rockMesh);

        }
    }

    /**
     * Return object at coord or null
     * @param {THREE.Vector2} coords 
     * @returns {object | null}
     */

    getObject(coords) {
        return this.#objectMap.get(this.getKey(coords)) ?? null
    }
}