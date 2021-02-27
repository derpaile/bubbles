class Bubble {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
  }

  show() {
    stroke(255);
    strokeWeight(0.1);
     //noFill();
    xoff = xoff+0.01;
    let farbe = colorPicker.color();
    farbe.setAlpha(slidercolor.value());
    fill(farbe);
    ellipse(this.x, this.y, this.size);
  }  
  move() {
     this.x = this.x + random(-1,1);
     this.y = this.y-1;
  }
  grow(){
    this.size = this.size++;
  }

}
