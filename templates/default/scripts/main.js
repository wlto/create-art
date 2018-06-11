const art = (function () {

  let renderer, camera, scene;

  function mountRenderer() {
    if (!Detector.webgl) Detector.addGetWebGLMessage();
    renderer =
      window.WebGLRenderingContext
      ? new THREE.WebGLRenderer()
      : new THREE.CanvasRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('WebGLContainer').appendChild(renderer.domElement);
  }

  function initializeScene() {
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.z = 100;
    scene.add(camera);

    let light = new THREE.AmbientLight(0xffffff);
    scene.add(light);

    let directionalLight = new THREE.DirectionalLight(0xffffff);
    scene.add(directionalLight);

    // Event listeners
    window.addEventListener('resize', onWindowResize, false);
  }

  function render() {
    renderer.render(scene, camera);
    window.requestAnimationFrame(render);
  }

  function onWindowResize(e) {
    renderer.setSize(window.innerWidth, window.innerHeight);
  }

  // Demo ---
  function addBox() {
    let boxGeometry = new THREE.BoxGeometry(20, 20, 20);
    let boxMaterial = new THREE.MeshLambertMaterial({ color: Math.random() * 0xffffff });
    
    let box = new THREE.Mesh(boxGeometry, boxMaterial);
    scene.add(box);
  }
  // --------

  window.onload = () => {
    mountRenderer();
    initializeScene();

    // Demo ---
    addBox();
    // --------

    render();
  }
})();