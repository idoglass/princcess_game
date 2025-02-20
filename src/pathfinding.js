import * as THREE from 'three';
import { World } from './world';
import { log } from 'three/tsl';

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

    const cameFrom = new Map();
    
    console.log(world.width, world.height);
    
    //if same space return
    if(start.x === end.x && start.y === end.y) return [];

    let pathFound = false;
    const maxDistance = 20;
    const cost = new Map();
    const frontier = [start];

    cost.set(getKey(start), 0);

    let counter = 0;

    while (frontier.length > 0) {

        frontier.sort((v1,v2) => {
            const g1 = start.manhattanDistanceTo(v1);
            const g2 = start.manhattanDistanceTo(v2);
            const h1 = v1.manhattanDistanceTo(end);
            const h2 = v2.manhattanDistanceTo(end);
            const f1 = g1 + h1;
            const f2 = g2 + h2;
            return f1 - f2;
        })

        const candidate = frontier.shift();
        counter++;


        if(candidate.x === end.x && candidate.y === end.y) {
            console.log(candidate);
            pathFound = true;
            break;
        }

        if (start.manhattanDistanceTo(candidate) > maxDistance) {
            console.log('Path too long');
            break;
        }


        const neighbors = getNeighbors(candidate, world, cost);
        frontier.push(...neighbors);

        //mark each candidate each neighbor came from
        neighbors.forEach((neighbor) => {
            cameFrom.set(getKey(neighbor), candidate);
        });

    }

    console.log(`Pathfinding took ${counter} iterations`);
    if (!pathFound) {  
        console.log('No path found'); 
        return null;
    }

    //reconstruct the path
    const path = [end];
    let current = path[0];
    while (current.x !== start.x || current.y !== start.y) {
        const prev = cameFrom.get(getKey(current));
        path.push(prev);
        current = prev;
    }

    path.reverse();
    return path;
}

/**
 * 
 * @param {THREE.Vector2} coords 
 * @param {World} world
 * @param {Map<string, number>} cost
 * @returns {THREE.Vector2[]}
 */

function getNeighbors(coords, world, cost) {
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

    const newCost = cost.get(getKey(coords)) + 1;

    // Exclude any squares that are already visited, as well
    // as any squares that are occupied
    neighbors = neighbors.filter(coords => {
        // If neighboring square has not yet been visited, or this
        // is a cheaper path cost, then include it in the search
        if (!cost.has(getKey(coords)) || newCost < cost.get(getKey(coords))) {
          cost.set(getKey(coords), newCost);
          return true;
        } else {
          return false;
        }
      })
      .filter(coords => !world.getObject(coords));
    
    return neighbors; 
}