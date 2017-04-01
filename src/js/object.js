var container;
var camera, scene, renderer;
var mouseX = 0, mouseY = 0;
var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;


function init() {

  // creating canvas
  container = document.getElementById('canvas');
  document.body.appendChild(container);

  // camera position
  // camera = new THREE.PerspectiveCamera(120, window.innerWidth / window.innerHeight, 1, 100);
  // camera.position.x = 0;
  // camera.position.y = 0;
  // camera.position.z = 20;


  camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.set(0, 100, 250);

  // scene
  scene = new THREE.Scene();


  // Sphere

  // var floorMat = new THREE.MeshPhongMaterial( { map: THREE.ImageUtils.loadTexture('images/wood-floor.jpg') } );
  // var wallMat = new THREE.MeshPhongMaterial( { map: THREE.ImageUtils.loadTexture('images/bricks.jpg') } );
  var redMat = new THREE.MeshPhongMaterial( { color: 0xff3300, specular: 0x555555, shininess: 30 } );
  var purpleMat = new THREE.MeshPhongMaterial( { color: 0x6F6CC5, specular: 0x555555, shininess: 30 } );
    var sphere = new THREE.Mesh(new THREE.SphereGeometry(20, 70, 20), redMat);
    sphere.position.set(-25, 100, -20);
    scene.add(sphere);

    // Knot thingy
    var knot = new THREE.Mesh(new THREE.TorusKnotGeometry( 40, 3, 100, 16 ), purpleMat);
    knot.position.set(0, 60, 30);
    scene.add(knot);

  // randomizing colors
  // var randomColor1 = '#' + (Math.random() * 0xFFFFFF << 0).toString(16);
  // var randomColor2 = '#' + (Math.random() * 0xFFFFFF << 0).toString(16);
  // var randomColor3 = '#' + (Math.random() * 0xFFFFFF << 0).toString(16);

  // lights
  // var ambient = new THREE.AmbientLight(0xFFDCFF);
  // scene.add(ambient);
  //
  // var directionalLight = new THREE.DirectionalLight(0xAD7DFF);
  // directionalLight.position.set(0, -20, 100).normalize();
  // scene.add(directionalLight);
  //
  // var directionalLight2 = new THREE.DirectionalLight(0xEFA8FF);
  // directionalLight2.position.set(20, 0, -100).normalize();
  // scene.add(directionalLight2);

  // ambient = new THREE.AmbientLight(0xffffff, 1);
  // scene.add(ambient);

  keyLight = new THREE.DirectionalLight(0xFFDCFF, 1.0);
  keyLight.position.set(-100, 0, 100).normalize();

  fillLight = new THREE.DirectionalLight(0xAD7DFF, 1);
  fillLight.position.set(100, 0, 100).normalize();

  backLight = new THREE.DirectionalLight(0xEFA8FF, 1.0);
  backLight.position.set(100, 0, -100).normalize();

  hemLight = new THREE.HemisphereLight(0xffe5bb, 0xFFBF00, .1);
  scene.add(hemLight);

  scene.add(keyLight);
  scene.add(fillLight);
  scene.add(backLight);


  var spotLight = new THREE.SpotLight(0xffffff, 1, 200, 20, 10);
spotLight.position.set( 0, 150, 0 );

var spotTarget = new THREE.Object3D();
spotTarget.position.set(0, 0, 0);
spotLight.target = spotTarget;

scene.add(spotLight);
// scene.add(new THREE.PointLightHelper(spotLight, 1));


  // var pointLight = new THREE.PointLight(randomColor3);
  // scene.add(pointLight);
  //
  // var pointLight2 = new THREE.PointLight(randomColor2);
  // scene.add(pointLight2);

  // setTimeout(function() {
  //   scene.add(directionalLight);
  // }, 3000);

  // var directionalLight = new THREE.DirectionalLight(0xffffff);
  // directionalLight.position.set(0, 0, 1);
  // scene.add(directionalLight);

  // camera = new THREE.PerspectiveCamera( 20, window.innerWidth / window.innerHeight, 1, 100 );
  // camera.position.z = 18;
  // scene = new THREE.Scene();
  // light = new THREE.DirectionalLight( 0xffffff );
  // light.position.set( 0, 0, 1 );
  // scene.add( light );

  // texture

  var manager = new THREE.LoadingManager();
  manager.onProgress = function(item, loaded, total) {

    console.log(item, loaded, total);

  };

  //var texture = new THREE.Texture();

  var onProgress = function(xhr) {
    if (xhr.lengthComputable) {
      var percentComplete = xhr.loaded / xhr.total * 100;
      console.log(Math.round(percentComplete, 2) + '% downloaded');
    }
  };

  var onError = function(xhr) {};

  //
  // var loader = new THREE.ImageLoader( manager );
  // loader.load( 'assets/js/three/textures/water.jpg', function ( image ) {
  //
  // 	texture.image = image;
  // 	texture.needsUpdate = true;
  //
  // } );

  // model

  var loader = new THREE.OBJLoader(manager);
  loader.load('assets/js/three/obj/devign_logo.obj', function(object) {

    // object.traverse( function ( child ) {
    //
    // 	// if ( child instanceof THREE.Mesh ) {
    // 	//
    // 	// 	child.material.map = texture;
    // 	//
    // 	// }
    //
    // } );
    object.scale.multiplyScalar(1);
    object.position.y = 0;
    scene.add(object);

  }, onProgress, onError);

  //
  renderer = new THREE.WebGLRenderer({alpha: true});
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  container.appendChild(renderer.domElement);

  document.addEventListener('mousemove', onDocumentMouseMove, false);

  //

  window.addEventListener('resize', onWindowResize, false);

}

function addObjects() {

}

function onWindowResize() {

  windowHalfX = window.innerWidth / 2;
  windowHalfY = window.innerHeight / 2;

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);

}

function onDocumentMouseMove(event) {

  mouseX = (event.clientX - windowHalfX) / 10;
  mouseY = (event.clientY - windowHalfY) / 10;

}

//

function animate() {

  requestAnimationFrame(animate);
  render();

}

function render() {

  //
  // camera.position.x += ( mouseX - camera.position.x ) * 0.05;
  // camera.position.y += ( - mouseY - camera.position.y ) * 0.05;
  // camera.lookAt( scene.position );
  // renderer.render( scene, camera );

  camera.position.x += (mouseX - camera.position.x) * 0.05;
  camera.position.y += (-mouseY - camera.position.y) * 0.05;
  camera.lookAt(scene.position);

  scene.rotation.x += 0.005;
  scene.rotation.y += 0.005;

  renderer.render(scene, camera);
}

init();
animate();
