
let cols;
let rows;
let current = [];
let previous = [];
let dampening = 0.95;
let iteration = 0;
let type = 1;
  
function setup() {
	pixelDensity(1);
	width = 800;
	height = 600;
	//width = window.innerWidth
	//height = window.innerHeight
	createCanvas(width, height);
	cols = width;
	rows = height;
	for (let i = 0; i < cols; i++){
		current[i] = [];
		previous[i] = [];
		for (let j = 0; j < rows; j++){
			current[i][j] = 0;
			previous[i][j] = 0;
		}
	}
}

function mouseDragged(){
	current[mouseX][mouseY] = 255;
}

function drops(){
	current[int(random(width))][int(random(height))] = 255;	
}

function draw() {
	background(0);
	loadPixels();
	if (iteration > 1000){
		drops();
		iteration = 0;
	}
		
	for (let x = 1; x < cols-1; x++){
		for (let y = 1; y < rows-1; y++){
			if (type == 0){
				current[x][y] = (previous[x-1][y] + 
									previous[x+1][y] + 
									previous[x][y-1] + 
									previous[x][y+1] + 
									previous[x-1][y-1] + 
									previous[x+1][y-1] + 
									previous[x-1][y+1] + 
									previous[x+1][y+1]) / 4 - 
									current[x][y];
			}
			else{					
				current[x][y] = (previous[x-1][y] + 
									previous[x+1][y] + 
									previous[x][y-1] + 
									previous[x][y+1]) / 2 - 
									current[x][y];
			}
			
			current[x][y] = current[x][y] * dampening;

			let index = (x + y * cols) * 4;
			
			pixels[index + 0] = current[x][y] * 255;
			pixels[index + 1] = current[x][y] * 255;
			pixels[index + 2] = current[x][y] * 255;
			pixels[index + 3] = 255;

		}
	}
	updatePixels();
	
	let temp = previous;
	previous = current;
	current = temp;
	
	iteration = iteration + random(50);
}