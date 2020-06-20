// Landing page idea came from Red Stapler - https://redstapler.co/space-warp-background-effect-three-js/
// I attempted to create the points on my own but the geometry constructor used to make the star points is less laggy in the tutorial.
//THREE JS MAIN OBJECTS 
let scene, camera, renderer, sprite, pointsGeo, pointsMat, points, supernovaGeo, supernovaMat, supernova, starGeo, stars
scene = new THREE.Scene();
camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 10000);
camera.position.z = 1;

renderer = new THREE.WebGLRenderer({ antialias: true });

let container = document.getElementById('home')
renderer.setSize($(container).width(), $(container).height());
container.appendChild(renderer.domElement);

window.addEventListener('resize', () => {
    let container = document.getElementById('home')
    renderer.setSize($(container).width(), $(container).height());
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});

// //3D star points -- Created lag so used Geometry as Red Stapler used
// pointsGeo = new THREE.SphereGeometry(0.03, 5, 5);
// pointsMat = new THREE.MeshBasicMaterial({ color: 0xFFFFFF });

// //creating 1500 spherical star points and adding it to scene
// for (let i = 0; i < 500; i++) {
//     points = new THREE.Mesh(pointsGeo, pointsMat);
//     points.position.set((Math.random() * 75 - 45), (Math.random() * 75 - 45), (Math.random() * 75 - 45));
//     scene.add(points);
// }

//Supernova
supernovaGeo = new THREE.Geometry();
supernovaGeo.vertices.push(new THREE.Vector3(0, 0, 0));
sprite = new THREE.TextureLoader()
sprite.crossOrigin='*';
let sprite2 = sprite.load('supernova.png')
supernovaMat = new THREE.PointsMaterial({
    color: '#FFFFFF',
    size: 0.1,
    transparent: true,
    map: sprite2
});
supernova = new THREE.Points(supernovaGeo, supernovaMat);
scene.add(supernova);
scene.children[0].name = "supernova"

//Red stapler stars
starGeo = new THREE.Geometry();
for (let i = 0; i < 15000; i++) {
    let star = new THREE.Vector3(
        Math.random() * 600 - 300,
        Math.random() * 600 - 300,
        Math.random() * 600 - 300
    );
    star.velocity = 0;
    star.acceleration = 0.005;
    starGeo.vertices.push(star);
}
sprite = new THREE.TextureLoader().load('star.png');
let starMaterial = new THREE.PointsMaterial({
    color: '#FFFFFF',
    size: 0.7,
    map: sprite
});
stars = new THREE.Points(starGeo, starMaterial);
scene.add(stars);
scene.children[1].name = "stars"

//Animation function that renders objects on to the screen
function animate() {
    // moving each star point in +x direction
    scene.traverse(function (node) {
        if (node instanceof THREE.Points && node.name != "supernova") {
            node.position.x += 0.01;
            if (node.position.x > 25) {
                node.position.x = -25;
            }
        }
    })

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}
animate();

this.tl = new TimelineMax({ onComplete: myFunc });
this.tl.to(supernovaMat, 1, { size: 1.5, ease: Expo.easeOut });


function myFunc() {
    console.log("1");
    console.log(document.getElementById('unhide').classList);
    document.getElementById('unhide').classList.remove('explosion');
}