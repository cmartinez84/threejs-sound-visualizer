
var createAudioContext = function (){
  var audio = new Audio();
  audio.src = 'audio/Hector_Oaks_-Uno_A_.mp3';
  audio.controls = true;
  audio.autoplay = true;
  document.body.appendChild(audio);
  var index = 0;
  var audioCtx = new AudioContext();
  var analyser = audioCtx.createAnalyser();
  analyser.smoothingTimeConstant = .95;
  var filter = audioCtx.createBiquadFilter();
  var audioBuffer;
  var frequencyData;

  var source = audioCtx.createMediaElementSource(audio);
  source.connect(analyser);
  analyser.connect(audioCtx.destination);
  analyser.smoothingTimeConstant = .95;

  frequencyData = new Uint8Array(analyser.frequencyBinCount);


  return{
    analyser: analyser,
    frequencyData: frequencyData
  }
}
