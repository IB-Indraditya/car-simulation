const scene = new THREE.Scene();

scene.background = new THREE.Color(0x020617);

const camera = new THREE.PerspectiveCamera(
75,
window.innerWidth / window.innerHeight,
0.1,
1000
);

camera.position.set(0,5,10);

const renderer = new THREE.WebGLRenderer({
canvas: document.querySelector('#bg'),
antialias:true
});

renderer.setSize(window.innerWidth, window.innerHeight);

const ambientLight = new THREE.AmbientLight(0xffffff,0.7);
scene.add(ambientLight);

const roadGeometry = new THREE.PlaneGeometry(200,20);

const roadMaterial = new THREE.MeshStandardMaterial({
color:0x111827
});

const road = new THREE.Mesh(roadGeometry,roadMaterial);

road.rotation.x = -Math.PI/2;

scene.add(road);

const carGroup = new THREE.Group();

const bodyGeometry = new THREE.BoxGeometry(2,0.8,4);

const bodyMaterial = new THREE.MeshStandardMaterial({
color:0x00F5FF
});

const carBody = new THREE.Mesh(bodyGeometry,bodyMaterial);

carGroup.add(carBody);

scene.add(carGroup);

let speed = 0;

const keys = {};

window.addEventListener('keydown',(e)=>{
keys[e.key]=true;
});

window.addEventListener('keyup',(e)=>{
keys[e.key]=false;
});

function animate(){

requestAnimationFrame(animate);

if(keys['ArrowUp']){
speed += 0.02;
}

if(keys['ArrowDown']){
speed -= 0.02;
}

speed *= 0.98;

if(keys['ArrowLeft']){
carGroup.rotation.y += 0.03;
}

if(keys['ArrowRight']){
carGroup.rotation.y -= 0.03;
}

carGroup.position.x += Math.sin(carGroup.rotation.y) * speed;

carGroup.position.z += Math.cos(carGroup.rotation.y) * speed;

camera.position.x = carGroup.position.x;

camera.position.z = carGroup.position.z + 10;

camera.lookAt(carGroup.position);

document.getElementById('speed').innerText =
Math.abs(speed * 300).toFixed(0);

renderer.render(scene,camera);
}

animate();
