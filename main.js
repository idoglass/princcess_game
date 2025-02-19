import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

import Stats from 'three/examples/jsm/libs/stats.module.js';
import { GUI } from  'three/addons/libs/lil-gui.module.min.js'

import { World } from './world';

const gui = new GUI;
const stats = new Stats()

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop( animate );
document.body.appendChild( renderer.domElement );



const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
const controls = new OrbitControls( camera, renderer.domElement);

const world = new World(10,10);
scene.add(world);


const sun = new THREE.DirectionalLight();
sun.intensity = 3;
sun.position.set(1,1,1)
scene.add(sun);


const ambiant = new THREE.AmbientLight();
ambiant.intensity = 0.5;

scene.add(ambiant);


camera.position.set(10,2,10);

controls.update();

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
