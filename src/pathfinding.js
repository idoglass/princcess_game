import * as THREE from 'three';
import { World } from './world';

/**
 * Finds the path between the start and end point (if one exists)
 * @param {THREE.Vector3} start 
 * @param {THREE.Vector3} end 
 * @param {World} world 
 * @return {THREE.Vector3[] | null} If path is found, returns the array of
 * coordinates that make up the path, otherwise returns null
 */
export function search(start, end, world) {
    const o = world.getObject(start);
    console.log(o.name);
}