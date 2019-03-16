module.exports = function solveSudoku(matrix) {
  // your solution
  var arr = [[]];

  //копирую массив для безопасного обращения с данными
  for (var i = 0; i < 9; i++) { 
    arr[i] = [];
    for (var j = 0; j < 9; j++) { 
      arr[i][j] = matrix[i][j];
    }
  }
  
  var position = findPosition(arr, 0, 0);
  i = position[0];
  j = position[1];

  var stackVariants = [];
  var stackPositions = [];

  stackPositions.push([i, j]);

  var k;
  while(true) {
    for (k = 1; k < 10; k++) {
      if (check(arr, i, j, k)) {
        arr[i][j] = k;
        stackVariants.push(k);
        break;
      }
    }
    while (k == 10) {
      stackPositions.pop();
      position = stackPositions[stackPositions.length - 1];
      i = position[0]; 
      j = position[1];
      arr[i][j] = 0;
      for (k = stackVariants.pop() + 1; k < 10; k++) {
        if (check(arr, i, j, k)) {
          arr[i][j] = k;
          stackVariants.push(k);
          break;
        }
      }
    }

    position = findPosition(arr, i, j);
    if (position.length == 0) break;

    i = position[0];
    j = position[1];

    stackPositions.push([i, j]);
  }

  return arr;
}

function findPosition(arr, i, j) {
  var position = [];

  while (i < 9) {
    if (arr[i][j] == 0) {
      position[0] = i;
      position[1] = j;
      break;
    }

    if (j < 8) j++;
    else {
      j = 0;
      i++;
    }
  }

  return position;
}

function check(arr, i, j, k) {
  //проверка по строке
  if (arr[i].indexOf(k) != -1) return false;

  //проверка по столбцу
  for (var m = 0; m < 9; m++) {
    
    if (arr[m][j] == k) return false;
  }

  //проверка по квадрату
  var posI = Math.floor(i / 3) * 3;
  var posJ = Math.floor(j / 3) * 3;

  for (var n = 0; n < 3; n++) {
    for (m = 0; m < 3; m++) {

      if (arr[posI + n][posJ + m] == k) return false;
    }
  }
  return true;
}
