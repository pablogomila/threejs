import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import * as dat from 'dat.gui'

// Creo Scene
const scene = new THREE.Scene();
// Creo Camara
const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 1000 );

// Creo el renderer
const renderer = new THREE.WebGLRenderer();

// Seteo el tamaño, en este caso el width y height de la pantalla
renderer.setSize( window.innerWidth, window.innerHeight );

// Le digo al renderer la animacion que ejecutar, definida abajo
renderer.setAnimationLoop( animate );

// Lo agrego el renderer al DOM
document.body.appendChild( renderer.domElement );

// Agrego el OrbitControls para poder girar la animacion con el mouse
const orbit = new OrbitControls(camera, renderer.domElement)

// Agrego la utilidad de dat.gui para usarla en el site
const gui = new dat.GUI()

// Creo un objeto, geometria, material y lo creo
const cubeGeometry = new THREE.BoxGeometry( 1, 1, 1 );
const cubeMaterial = new THREE.MeshBasicMaterial( { color: "#E65100" } );
const cube = new THREE.Mesh( cubeGeometry, cubeMaterial );
cube.position.y = 2

// Creo otro objeto, geometria, material y lo creo
const planeGeometry = new THREE.PlaneGeometry(30,30);
const planeMaterial = new THREE.MeshBasicMaterial( { 
    color: "#42A5F5",
     side: THREE.DoubleSide 
    } );
const plane = new THREE.Mesh( planeGeometry, planeMaterial );
plane.rotation.x = -0.5 * Math.PI
plane.position.y= -4

// Creo otro objeto esfera, geometria, material y lo creo

const sphereGeometry = new THREE.SphereGeometry(4)
const sphereMaterial = new THREE.MeshBasicMaterial({color: "#8BC34A", wireframe: false})
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)
sphere.position.set(-10, 5, 5)
scene.add(sphere)


const axesHelper = new THREE.AxesHelper(3);

// Agrego el objeto y el helper de axis a la escena
scene.add(cube);
scene.add(plane)
scene.add(axesHelper)

// agrego gridHelper para ver como esta el plano de la escena
const gridHelper = new THREE.GridHelper(30)
scene.add(gridHelper)

// cambio la posicion de la camara para ver algo al inicio
camera.position.set(-10,30,30)
orbit.update()


// creo animacion para esfera rebotando
let step = 0

function animate(time) {
    
    cube.rotation.x = time / 1500;
	cube.rotation.y = time / 1500;

    step += options.speed
    sphere.position.y = 5 * Math.abs(Math.sin(step))
    
	renderer.render( scene, camera );

}

// creo las opciones para el dat.gui
const options = {
    sphereColor: '#8BC34A',
    wireframe: false,
    speed: 0.01
}

// y le doy los atibutos que puede cambiar el color y como
gui.addColor(options, 'sphereColor').onChange(function(e){
    sphere.material.color.set(e)
})

gui.add(options, 'wireframe').onChange(function(e){
    sphere.material.wireframe = e
})

gui.add(options, 'speed', 0, 0.1)

