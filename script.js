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
sprite.crossOrigin = '*';
let sprite2 = sprite.load('img/supernova.png')
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
    // REDSTAPLER - USED FOR MOVEMENT
    // star.velocity = 0;
    // star.acceleration = 0.0005;
    starGeo.vertices.push(star);
}
sprite = new THREE.TextureLoader().load('img/star.png');
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
            node.position.x += 0.03;
        }
        if (node.position.x > 50) {
            node.position.x = -25;
        }
    })
    // REDSTAPLER MOVEMENT
    // starGeo.vertices.forEach(p => {
    //     p.velocity += p.acceleration
    //     p.x -= p.velocity;

    //     if (p.x < -200) {
    //         p.x = 200;
    //         p.velocity = 0;
    //     }
    // });
    // starGeo.verticesNeedUpdate = true;

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}
animate();

this.tl = new TimelineMax({ onStart: myFunc });
this.tl.to(supernovaMat, 17, { size: 1.5, ease: Expo.easeOut, delay: .75 });


function myFunc() {
    document.getElementById('unhide').classList.remove('explosion');
    document.getElementById('unhide').classList.add('animate__animated');
    document.getElementById('unhide').classList.add('animate__zoomIn');
    document.getElementById('unhide').classList.add('animate__slower');

    setTimeout(function () {
        document.getElementById('unhide').classList.remove('animate__animated');
        document.getElementById('unhide').classList.remove('animate__zoomIn');
        document.getElementById('unhide').classList.remove('animate__slower');
    }, 20000);
}

// FORM VALIDATION 
function validation() {
    let name = document.getElementById("Name").value;
    let email = document.getElementById("Email").value;
    let message = document.getElementById("message").value;
    let error_message = document.getElementById("error-message");
    let Message = ""

    error_message.style.padding = "10px";
    error_message.style.border = "3px solid white";

    if (message == "" || message == " ") {
        Message = "Please Enter a Valid Message"
    }

    if (email.indexOf("@") == -1) {
        Message = "Please Enter a Valid Email"
    }

    if (name == "" || name == " ") {
        Message = "Please Enter a Valid Name"
    }

    if (Message != "") {
        error_message.innerHTML = Message
        return false;
    }

    return true;
}

//Smooth Scroll by cferdinandi - https:github.com/cferdinandi/smooth-scroll
var scroll = new SmoothScroll('a[href*="#"]');

//Add active to navigation bar that is scrolled or clicked too 
// idea and code from https://stackoverflow.com/questions/9979827/change-active-menu-item-on-page-scroll and https://stackoverflow.com/questions/25455009/uncaught-typeerror-cannot-read-property-top-of-undefined

jQuery(document).ready(function ($) {
    $(document).on("scroll", onScroll);
});

function onScroll(event) {
    var scrollPos = $(document).scrollTop();
    $('#navbarMenu a').each(function () {
        var currLink = $(this);
        var refElement = currLink.attr("href");
        var splitEle = refElement.split('#');
        if ($("#" + splitEle[1]).offset().top -25 <= scrollPos && $("#" + splitEle[1]).offset().top + $("#" + splitEle[1]).height() - 75 > scrollPos) {
            $('#navbarMenu ul').removeClass("active");
            currLink.parent().addClass("active");
        } else {
            currLink.parent().removeClass("active");
        }
    });
}

// Gallery select
// Function that filters projects based on class names
function filterSelection(n) {
    let x = document.getElementsByClassName('proj');
    let b = document.getElementsByClassName('btn');
    let a = document.getElementsByClassName('proj-animate')

    for (let i = 0; i < b.length; i++) {
        if (b[i].classList.contains(n)) {
            b[i].classList.add('gal-active')
            b[i].classList.remove('gal-inactive')
        }
        else {
            b[i].classList.remove('gal-active')
            b[i].classList.add('gal-inactive')
        }
    }
    if (n == 'all') n = 'proj';

    for (let i = 0; i < x.length; i++) {
        if (!x[i].classList.contains('d-none')) {
            x[i].classList.add('d-none')
        }
    }


    for (let i = 0; i < x.length; i++) {
        if (!x[i].classList.contains(n)) {
            x[i].classList.add('d-none')
            x[i].classList.add('animate__animated')
            x[i].classList.remove('animate__backInUp')
            x[i].classList.add('animate__backOutDown')
            x[i].classList.add('animate__slower')
        }
        else {
            x[i].classList.remove('d-none')
            x[i].classList.add('animate__animated')
            x[i].classList.remove('animate__backOutDown')
            x[i].classList.add('animate__backInUp')
            x[i].classList.add('animate__slower')
        }
    }
}

// Carousel
$(document).ready(function () {
    $(".owl-carousel").owlCarousel(
        {
            loop: true,
            margin: 10,
            items: 1,
            center: true,
            autoplay: true,
            autoplayTimeout: 10000,
            autoplayHoverPause: true
        }
    );
});

