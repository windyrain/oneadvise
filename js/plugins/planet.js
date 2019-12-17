(function (global) {

  const container = document.querySelector('.planet-container');

  //设置场景的大小
  var width = container.clientWidth;
  var height = container.clientHeight;

  //设置相机的一些参数。
  var view_angle = 45;
  aspect = width / height;
  near = 0.1;
  far = 10000;

  //新建一个WebGL 渲染，以及相机
  var renderer = new THREE.WebGLRenderer();
  var camera =
    new THREE.PerspectiveCamera(
      view_angle, aspect, near, far
    );
  var scene = new THREE.Scene();

  //把相机添加到场景里面
  scene.add(camera);

  camera.position.z = 250;

  renderer.setSize(width, height);

  //附加DOM元素
  container.append(renderer.domElement);

  //设置球体的值
  var radius = 100, segemnt = 16, rings = 16;

  var sphereMaterial = new THREE.MeshLambertMaterial({ color: 0x542e82 });

  var sphere = new THREE.Mesh(
    new THREE.SphereGeometry(radius, segemnt, rings),
    sphereMaterial
  );

  sphere.geometry.verticesNeedUpdate = true;
  sphere.geometry.normalsNeedUpdate = true;

  scene.add(sphere);

  var spotLight = new THREE.SpotLight( 0xffffff );
      spotLight.position.set( 10, 50, 200 );

  var pointLight = new THREE.PointLight(0Xffffff);

  pointLight.position.x = 10;
  pointLight.position.y = 50;
  pointLight.position.z = 200;

  scene.add(spotLight);

  var animate = function () {
    requestAnimationFrame( animate );

    // sphere.rotation.x += 0.01;
    sphere.rotation.y += 0.01;

    renderer.render( scene, camera );
  };

  animate();

})(window);