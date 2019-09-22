import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  constructor() { }
  grid = [];
  row;
  column;
  width;
  height;
  corX;
  corY;
  velX;
  velY;
  desX;
  desY;
  isMarioMoving = false;
  coordinatesArray = [];
  ngOnInit() {
    let row = '10';
    // do{
    //   row = prompt("Enter a number between 5 and 10");
    // }
    //   while(row == null || row == "" || isNaN(parseInt(row)) || parseInt(row) > 10 || parseInt(row) < 5);
    this.row = row;
    this.column = this.row;
    this.width = 500 / this.column;
    this.height = 500 / this.row;
    this.generateGrid(this.row, this.column);
    this.corX = this.row % 2 == 0 ? Math.floor(this.row / 2) - 1 : Math.floor(this.row / 2);
    this.corY = this.corX;
    this.coordinatesArray.push({ x: 0, y: 0 });
    this.coordinatesArray.push({ x: 4, y: 3 });
    this.coordinatesArray.push({ x: this.column-1, y: this.row-1 });
    this.moveToPositions();
    // this.startGame();


  }


  eatRed() {
    if(this.grid[this.corY][this.corX] == 1) {
      this.grid[this.corY][this.corX] = 0;
    }
  }
 

  shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
  }


  generateGrid(rows, columns) {
    let arr = [];
    for(let i = 0; i < rows*columns; i++){
      if(i<rows){
        arr.push(1);
      }
      else {
        arr.push(0);
      }
    }
    arr = this.shuffle(arr);
    this.grid = [];
    let arrIndex = 0;
    for (let rowi = 0; rowi < rows; rowi++) {
      let row = [];
      for (let i = 0; i < columns; i++) {
        row.push(arr[arrIndex++]);
      }
      this.grid.push(row);
    }
  }

  placeMario(x, y) {
    this.corX = x;
    this.corY = y;
  }

  moveMarioUp() {
    this.placeMario(this.corX, this.corY > 0 ? this.corY - 1 : this.corY);
  }

  moveMarioDown() {
    this.placeMario(this.corX, this.corY < this.row ? this.corY + 1 : this.corY);
  }

  moveMarioleft() {
    this.placeMario(this.corX > 0 ? this.corX - 1 : this.corX, this.corY);
  }

  moveMarioRight() {
    this.placeMario(this.corX < this.column ? this.corX + 1 : this.corX, this.corY);
  }

  moveMario() {
    if (this.velX == -1 && this.velY == 0) {
      this.moveMarioleft();
    }
    if (this.velX == 0 && this.velY == -1) {
      this.moveMarioUp();
    }
    if (this.velX == 0 && this.velY == 1) {
      this.moveMarioDown();
    }
    if (this.velX == 1 && this.velY == 0) {
      this.moveMarioRight();
    }
    this.eatRed();
    this.checkState();
  }

  goToCoordinates(x, y) {
    if (x < this.column && x >= 0 && y >= 0 && y < this.row) {
      this.desX = x;
      this.desY = y;
    }
  }


  checkState() {
    if (this.corX == this.desX && this.corY == this.desY) {
      this.velX = 0;
      this.velY = 0;
      this.isMarioMoving = false;
    }
    else {
      this.isMarioMoving = true;
    }
    if (this.corY < this.desY) {
      this.velX = 0;
      this.velY = 1;
      return;
    }
    if (this.desX > this.corX) {
      this.velX = 1;
      this.velY = 0;
      return;
    }
    if (this.desY < this.corY) {
      this.velX = 0;
      this.velY = -1;
      return;
    }
    if (this.desX < this.corX) {
      this.velX = -1;
      this.velY = 0;
      return;
    }

  }

  startGame() {
    setInterval(() => {
      this.moveMario();
    }, 500);
  }


  moveToPositions() {
    let i = 0;
    setInterval(() => {
      if (!this.isMarioMoving) {
        if (this.coordinatesArray[i]) {
          this.goToCoordinates(this.coordinatesArray[i].x, this.coordinatesArray[i].y);
          i++;
        }
      }
    }, 500);
  }
}