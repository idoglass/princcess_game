import * as THREE from 'three';

export class World extends THREE.Mesh {
    #objectMap = new Map();

    constructor(width, height) {
        super();
        
        this.width = width;
        this.height = height;
        this.treesCount = 20;
        this.rocksCount = 20;
        this.rocks = new THREE.Group();
        this.trees = new THREE.Group();

        this.createWorld();
    }

    createWorld() {
        this.clearWorld();
        this.createTerrain();
        this.createTrees();
        this.createRocks();
    }

    clearWorld() {
        if(this.terrain) {
            this.terrain.geometry.dispose();
            this.terrain.material.dispose();
            this.remove(this.terrain);
        }
        if(this.trees) {
            this.trees.children.forEach(tree => {
                tree.geometry.dispose();
                tree.material.dispose();
            }
            )

            this.trees.clear();
        }
        if(this.rocks) {
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
        if(this.terrain) {
            this.terrain.geometry.dispose();
            this.terrain.material.dispose();
            this.remove(this.terrain);
        }
        const worldGeometry = new THREE.PlaneGeometry(this.width, this.height,this.width, this.height);
        const worldGMaterial = new THREE.MeshStandardMaterial({
            color: 0x50a000,
            wireframe: false
        })
        this.terrain = new THREE.Mesh(worldGeometry, worldGMaterial);
        this.terrain.rotation.x = -Math.PI / 2;
        this.terrain.position.set(this.width / 2, 0, this.height /2)
        
        this.add(this.terrain);
    }

    createTrees() {

        const treeHeight = 1;
        const treeRadius = 0.2;

        const treeGeometry = new THREE.ConeGeometry(treeRadius,treeHeight,8);
        const treeMaterial = new THREE.MeshStandardMaterial({
            color: 0x305100,
            flatShading: true
        });

        this.add(this.trees)

        this.trees.clear();

        for (let index = 0; index < this.treesCount; index++) {

            const treeMesh = new THREE.Mesh(treeGeometry,treeMaterial);
            const coords = new THREE.Vector2(
                Math.floor(this.width * Math.random()), 
                Math.floor(this.height * Math.random())
            )

            if(this.#objectMap.has(`${coords.x}-${coords.y}`)) continue;
            treeMesh.position.set(
                coords.x + 0.5,
                treeHeight / 2,
                coords.y + 0.5
            )  
            


            this.trees.add(treeMesh)
            this.#objectMap.set(`${coords.x}-${coords.y}`, treeMesh);
        }
    }


    createRocks() {


        const minRockRadius = 0.1;
        const maxRockRadius = 0.3;

        const minRockHeight = 0.5;
        const maxRockHeight = 1;

        this.add(this.rocks)

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
            if(this.#objectMap.has(`${coords.x}-${coords.y}`)) continue;

            const rockMesh = new THREE.Mesh(rockGeometry,rockMaterial);
            rockMesh.scale.y = height;
            rockMesh.position.set(
               coords.x + 0.5,
               0,
                coords.y + 0.5
            )

            this.rocks.add(rockMesh)
            this.#objectMap.set(`${coords.x}-${coords.y}`, rockMesh);

        }
    }
}