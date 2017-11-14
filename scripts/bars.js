var example = (function(){

    "use strict";
    var scene=new THREE.Scene(),
    renderer = window.WebGLRenderingContext ? new THREE.WebGLRenderer() : new THREE.CanvasRenderer(),
    light= new THREE.AmbientLight(0xffffff, .2),
    pointLight = new THREE.PointLight(0xffffff),
    camera,
    controls,
    directionalLight,
    bar,
    bars = [],
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
        25  ,
        element.offsetWidth  / element.offsetHeight,
        1,
        900
        );
        camera.position.x = 0
        camera.position.z= 0;
        camera.position.y= 400;
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

        setupGui();
        //_____________Box 1______________________




        //_____________Create Multiple Boxes______________________
        for (var i = 0; i < 100; i++) {
          var randomR = Math.floor(Math.random() * 230);
          var randomG = Math.floor(Math.random() * 230);
          var randomB = Math.floor(Math.random() * 230);
          var barWidth = i;
          var newBox = new THREE.Mesh(
          new THREE.BoxGeometry(100, 10 ,20),
          new THREE.MeshPhongMaterial({
            // color: 'rgb(20, 23, 230)',
            color: `rgba(${randomR},${randomG}, ${randomB})`,
          })
          );
          newBox.position.z = (-i*30) + 600

          newBox.name="bar" + i;
          bars.push(newBox);
          scene.add(newBox);
        }
        render();
    }


    function scaleBoxes(){
      audioCtx.analyser.getByteFrequencyData(audioCtx.frequencyData);
      bars.forEach((bar, i)=>{
        bar.scale.x = audioCtx.frequencyData[60-i]/100;
        // bar.scale.x = audioCtx.frequencyData[30-i]/100;
        // bar.scale.z = audioCtx.frequencyData[30-i]/100;
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
        scene: scene,
        camera: camera
    }


//______________________Dat set up______________________________________

            function setupGui(){

                //var cube = scene.getObjectByName('cube');

                //note we could link the various object properties directly to the gui but this would prevent us from being able to modify them e.g. radians to degrees
                var itemsToControl = new function() {

                    this.cameraXPos = camera.position.x,
                    this.cameraYPos = camera.position.y,
                    this.cameraZPos = camera.position.z;
                    this.cameraXRotation = camera.rotation.x;
                    this.cameraYRotation = camera.rotation.y;
                    this.cameraZRotation = camera.rotation.z;

                    // this.cubeXPos = cube.position.x,
                    // this.cubeYPos = cube.position.y,
                    // this.cubeZPos = cube.position.z,
                    // this.cubeXRotation = cube.rotation.x;
                    // this.cubeYRotation = cube.rotation.y;
                    // this.cubeZRotation = cube.rotation.z;

                    // this.cubeXScale = cube.scale.x;
                    // this.cubeYScale = cube.scale.y;
                    // this.cubeZScale = cube.scale.z;

                };

                var gui = new dat.GUI();


                 //camera
                var cameraXPos = gui.add(itemsToControl, 'cameraXPos', -200, 200);
                var cameraYPos = gui.add(itemsToControl, 'cameraYPos', -200, 200);
                var cameraZPos = gui.add(itemsToControl, 'cameraZPos', -400, 400);
                var cameraXRotation = gui.add(itemsToControl, 'cameraXRotation', 0, 360);
                var cameraYRotation = gui.add(itemsToControl, 'cameraYRotation', 0, 360);
                var cameraZRotation = gui.add(itemsToControl, 'cameraZRotation', 0, 360);

                cameraXPos.onChange(function(value){move(camera,'x',value)});
                cameraYPos.onChange(function(value){move(camera,'y',value)});
                cameraZPos.onChange(function(value){move(camera,'z',value)});
                cameraXRotation.onChange(function(value){rotate(camera, 'x', value)});
                cameraYRotation.onChange(function(value){rotate(camera, 'y', value)});
                cameraZRotation.onChange(function(value){rotate(camera, 'z', value)});

                //cube
                // var cubeXPos = gui.add(itemsToControl, 'cubeXPos', -200, 200);
                // var cubeYPos = gui.add(itemsToControl, 'cubeYPos', -200, 200);
                // var cubeZPos = gui.add(itemsToControl, 'cubeZPos', -200, 200);
                // var cubeXRotation = gui.add(itemsToControl, 'cubeXRotation', 0, 360);
                // var cubeYRotation = gui.add(itemsToControl, 'cubeYRotation', 0, 360);
                // var cubeZRotation = gui.add(itemsToControl, 'cubeZRotation', 0, 360);
                // var cubeXScale = gui.add(itemsToControl, 'cubeXScale', 1, 10);
                // var cubeYScale = gui.add(itemsToControl, 'cubeYScale', 1, 10);
                // var cubeZScale = gui.add(itemsToControl, 'cubeZScale', 1, 10);
                //
                // cubeXPos.onChange(function(value){move(cube,'x',value)});
                // cubeYPos.onChange(function(value){move(cube,'y',value)});
                // cubeZPos.onChange(function(value){move(cube,'z',value)});
                // cubeXRotation.onChange(function(value){rotate(cube, 'x', value)});
                // cubeYRotation.onChange(function(value){rotate(cube, 'y', value)});
                // cubeZRotation.onChange(function(value){rotate(cube, 'z', value)});
                // cubeXScale.onChange(function(value){scale(cube, 'x', value)});
                // cubeYScale.onChange(function(value){scale(cube, 'y', value)});
                // cubeZScale.onChange(function(value){scale(cube, 'z', value)});
            }

            function rotate(object, axis, value){
                object.rotation[axis] = value * (Math.PI/180);
            }

            function move(item, axis, value){
                item.position[axis] = value;
            }

             function scale(item, axis, value){
                item.scale[axis] = value;
            }











})();
