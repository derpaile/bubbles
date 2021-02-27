var mic;
var vol;
let bubbles = [];
var hoehe = 800;
var breite = 500;
let spectrum;
let slidersize;
let slidercolor;
let slidervolumelimit;
let xoff = 0;
let colorPicker;



function setup() {
  colorMode(HSB);
  createCanvas(breite, hoehe);
  
  slidersize = createSlider(1, 1000, 100);
  slidersize.position(20, hoehe); 
  
  slidercolor = createSlider(0, 255, 60);
  slidercolor.position(breite/3,hoehe);
  
  slidervolumelimit = createSlider(0.1,100,1);
  slidervolumelimit.position(2*breite/3-30,hoehe);

  colorPicker = createColorPicker('#ed225d');
  colorPicker.position(breite-50, hoehe , 0);

  
  mic = new p5.AudioIn();
  mic.start();
  fft = new p5.FFT(0.1,1024);
  fft.setInput(mic)
}


function draw() {
  background(10);
  listenforlevel();
  for (let i = 0; i < bubbles.length; i++) {
    
    bubbles[i].move();
    bubbles[i].show();
    
    if (bubbles[i].y < 0){
       //Blasen werden zerstört sobald sie aus dem Fenster fliegen
      bubbles.splice(i,1);
      
      
    }  
  }
    

    spectrum = fft.analyze();
    centroid = fft.getCentroid();
    centroid_mapped = map(centroid,0,5000,0,breite)
    maximum = max(spectrum);
    noFill();
    console.log('Centroid:',centroid,'max:',maximum);
}


function listenforlevel(ton) {
  vol = 100 * mic.getLevel();
  if (vol > slidervolumelimit.value()/50) {
    // let b = new Bubble (maximum,hoehe,slidersize.value())
      let b = new Bubble (centroid_mapped,hoehe-5,20*mic.getLevel()*slidersize.value());

    bubbles.push(b);
  }

}


  

