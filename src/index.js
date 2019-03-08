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
  recurs(arr, 0, 0);

  console.log(arr);
  return arr;
}

function recurs(arr, i, j) {
  var position = findPosition(arr, i, j);
  if (position.length == 0) return true;

  i = position[0];
  j = position[1];

  if (i == -1) return true;

  for (var k = 1; k <= 9; k++) {
    if (check(arr, i, j, k)) {
      arr[i][j] = k;

      if ( recurs(arr, i, j) ) return true;

      arr[i][j] = 0;
    }
  }
  return false;
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


// solveSudoku([
//   [6, 5, 0, 7, 3, 0, 0, 8, 0],
//   [0, 0, 0, 4, 8, 0, 5, 3, 0],
//   [8, 4, 0, 9, 2, 5, 0, 0, 0],
//   [0, 9, 0, 8, 0, 0, 0, 0, 0],
//   [5, 3, 0, 2, 0, 9, 6, 0, 0],
//   [0, 0, 6, 0, 0, 0, 8, 0, 0],
//   [0, 0, 9, 0, 0, 0, 0, 0, 6],
//   [0, 0, 7, 0, 0, 0, 0, 5, 0],
//   [1, 6, 5, 3, 9, 0, 4, 7, 0]
// ]);