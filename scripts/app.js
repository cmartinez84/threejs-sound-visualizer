var example = (function(){

    "use strict";
    var scene=new THREE.Scene(),
    renderer = window.WebGLRenderingContext ? new THREE.WebGLRenderer() : new THREE.CanvasRenderer(),
    light= new THREE.AmbientLight(0xffffff, .2),
    pointLight = new THREE.PointLight(0xffffff),
    camera,
    controls,
    directionalLight,
    box,
    box2,
    boxes = [],
    audioCtx;

    ///from audioloader.js
    audioCtx = createAudioContext();

    function initScene(){

        renderer.setSize(window.innerWidth, window.innerHeight);

        var element = document.getElementById("webgl-container");
        element.appendChild(renderer.domElement);

        scene.add(light);
        light.position.z = 221;

        //______________Cam Position_____________________
        camera = new THREE.PerspectiveCamera(
        35,
        element.offsetWidth  / element.offsetHeight,
        1,
        1000
        );

        camera.position.z= 100;
        camera.position.y= 1;
        //_____________Orbit Controls______________________

        controls = new THREE.OrbitControls( camera);
				controls.enableZoom = true;
        //_____________Directional light______________________

        directionalLight = new THREE.DirectionalLight( 0xffffff, 1 );
        directionalLight.position.z = 2;
        directionalLight.position.x = 2;
        directionalLight.position.y = 2;
        ///



        scene.add( camera );
        scene.add( directionalLight );
        //_____________Box 1______________________




        //_____________Create Multiple Boxes______________________
        for (var i = 0; i < 20; i++) {
          var randomR = Math.floor(Math.random() * 230);
          var randomG = Math.floor(Math.random() * 230);
          var randomB = Math.floor(Math.random() * 230);
          var boxWidth = 10 + i*10;
          var newBox = new THREE.Mesh(
          new THREE.BoxGeometry(boxWidth, 10 ,boxWidth),
          new THREE.MeshPhongMaterial({
            // color: 'rgb(20, 23, 230)',
            color: `rgba(${randomR},${randomG}, ${randomB})`,
          })
          );
          newBox.position.y = -i*10;

          newBox.name="box" + i;
          boxes.push(newBox);
          scene.add(newBox);
        }
        render();
    }


    function scaleBoxes(){
      audioCtx.analyser.getByteFrequencyData(audioCtx.frequencyData);
      boxes.forEach((box, i)=>{
        box.scale.x = audioCtx.frequencyData[30-i]/100;
        box.scale.z = audioCtx.frequencyData[30-i]/100;
      })
    }

    function render() {
        renderer.render(scene, camera);
        requestAnimationFrame(render);
        scaleBoxes();
        controls.update();
    };

    window.onload = initScene;

    return {
        scene: scene
    }

})();
