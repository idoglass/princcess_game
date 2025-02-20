import * as THREE from 'three';
import { GameObject } from './GameObject';
import { getRandomFloat } from '../utils/random';


const rockGeometry = new THREE.SphereGeometry(
    1,
    8,
    5
);
const rockMaterial = new THREE.MeshStandardMaterial({
    color: 0xb0b0b0,
    flatShading: true
});


export class Rock extends GameObject {
    

    minRockRadius = 0.1;
    maxRockRadius = 0.3;

    minRockHeight = 0.1;
    maxRockHeight = 0.3;


    /**
     * @type {THREE.Vector3}
     */
    coords;


    /**
     * 
     * @param {THREE.Vector3} coords 
     * @param {THREE.BufferGeometry} geomatry
     * @param {THREE.Material} material
     */
    constructor(coords) {
        super(coords, rockGeometry, rockMaterial);
        const radius = getRandomFloat(this.minRockRadius, this.maxRockRadius);
        const height = getRandomFloat(this.minRockHeight, this.maxRockHeight);

        this.scale.set(radius, radius, radius);
        this.name = `Rock (${coords.x},${coords.y})`
        
        console.log(radius, height);
        
        this.position.set(
            coords.x + 0.5,
            coords.y + height / 2,
            coords.z + 0.5
        )
    }
}