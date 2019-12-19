(function (global) {

  const container = document.querySelector('.planet-container');

  //设置场景的大小
  const width = container.clientWidth;
  const height = container.clientHeight;

  //设置相机的一些参数。
  const view_angle = 45;
  aspect = width / height;
  near = 0.1;
  far = 10000;

  //新建一个WebGL 渲染，以及相机
  const renderer = new THREE.WebGLRenderer();
  const camera =
    new THREE.PerspectiveCamera(
      view_angle, aspect, near, far
    );
  const scene = new THREE.Scene();

  //把相机添加到场景里面
  scene.add(camera);

  camera.position.z = 260;

  renderer.setSize(width, height);

  //附加DOM元素
  container.append(renderer.domElement);

  //设置球体的值
  const radius = 100, segemnt = 16, rings = 16;

  const loader = new THREE.TextureLoader();
  let mesh;
  loader.load('assets/2k_mars.jpg', function ( texture ) {

      const geometry = new THREE.SphereGeometry(radius, segemnt, rings);

      const material = new THREE.MeshBasicMaterial( { map: texture, overdraw: 0.5 } );
      mesh = new THREE.Mesh( geometry, material );

      scene.add(mesh);
  } );

  // const sphereMaterial = new THREE.MeshLambertMaterial({ color: 0x542e82 });

  // const sphere = new THREE.Mesh(
  //   new THREE.SphereGeometry(radius, segemnt, rings),
  //   sphereMaterial
  // );

  // sphere.geometry.verticesNeedUpdate = true;
  // sphere.geometry.normalsNeedUpdate = true;

  // scene.add(sphere);

  const spotLight = new THREE.SpotLight(0xffffff);
  spotLight.position.set(10, 50, 200);

  const pointLight = new THREE.PointLight(0Xffffff);

  pointLight.position.x = 10;
  pointLight.position.y = 50;
  pointLight.position.z = 200;

  scene.add(spotLight);

  const animate = function () {
    requestAnimationFrame(animate);

    if (mesh) mesh.rotation.y += 0.01;

    renderer.render(scene, camera);
  };

  animate();


})(window);