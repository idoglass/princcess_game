import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

import Stats from 'three/examples/jsm/libs/stats.module.js';
import { GUI } from  'three/addons/libs/lil-gui.module.min.js'

import { World } from './world';
import { HumanPlayer } from './players/HumanPlayer';
import { CombatManager } from './CombatManager';

const gui = new GUI;
const stats = new Stats()

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop( animate );
renderer.setPixelRatio(devicePixelRatio)
document.body.appendChild( renderer.domElement );



const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.layers.enable(1);

const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(5, 0, 5);
camera.position.set(0, 7, 0);
controls.update();

const world = new World(10,10);
scene.add(world);

const playerCoords = new THREE.Vector3(5,0,5);
const player = new HumanPlayer(playerCoords, camera, world);
scene.add(player)

const player1Coords = new THREE.Vector3(4,0,5);
const player1 = new HumanPlayer(player1Coords, camera, world);
scene.add(player1)


const sun = new THREE.DirectionalLight();
sun.intensity = 3;
sun.position.set(1,1,1)
scene.add(sun);


const ambiant = new THREE.AmbientLight();
ambiant.intensity = 0.5;

scene.add(ambiant);


function animate() {

    controls.update()

	renderer.render( scene, camera );

    stats.update();

}

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
})

const worldFolder = gui.addFolder("World");
worldFolder.add(world, 'width', 1, 20, 1).name('Width')
worldFolder.add(world, 'height', 1, 20, 1).name('Height')
worldFolder.add(world, 'treesCount', 1, 20, 1).name('Trees')
worldFolder.add(world, 'rocksCount', 1, 20, 1).name('Rocks')


worldFolder.addColor(world.terrain.material, 'color')
worldFolder.add(world, 'createWorld').name('Create World')


const combatManager = new CombatManager;

combatManager.takeTurns([player,player1], world)
