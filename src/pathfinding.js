import * as THREE from 'three';
import { World } from './world';

const getKey = (coords) => `${coords.x}-${coords.y}`


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

    console.log(start, end);
    
    //if same space return
    if(start.x === end.x && start.y === end.y) return [];

    const maxDistance = 20;
    const visited = new Set();
    const frontier = [start];

    while (frontier.length > 0) {

        frontier.sort((v1,v2) => {
            const d1 = start.manhattanDistanceTo(v1);
            const d2 = start.manhattanDistanceTo(v2);
            return d1 - d2;  
        })

        const candidate = frontier.shift();

        if(candidate.x === end.x && candidate.y === end.y) {
            console.log(candidate);

            break;
        }

        if (start.manhattanDistanceTo(candidate) > maxDistance) {
            break;
        }

        visited.add(getKey(candidate));

        const neighbors = getNeighbors(candidate, world, visited);
        frontier.push(...neighbors);

    }


}

/**
 * 
 * @param {THREE.Vector2} coords 
 */

function getNeighbors(coords, world, visited) {
    let neighbors = [];

  // Left
  if (coords.x > 0) {
    neighbors.push(new THREE.Vector2(coords.x - 1, coords.y));
  }
  // Right
  if (coords.x < world.width - 1) {
    neighbors.push(new THREE.Vector2(coords.x + 1, coords.y));
  }
  // Top
  if (coords.y > 0) {
    neighbors.push(new THREE.Vector2(coords.x, coords.y - 1));
  }
  // Bottom
  if (coords.y < world.height - 1) {
    neighbors.push(new THREE.Vector2(coords.x, coords.y + 1));
  }

  // Exclude any squares that are already visited, as well
  // as any squares that are occupied
  neighbors = neighbors.filter((coords) => {
    const key = getKey(coords);
    return !visited.has(key);
  }
  );
    return neighbors; 
}