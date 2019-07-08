const readlineSync = require('readline-sync');

const getRandomNum = function() {
  const num = [0,1,2,3,4,5,6,7,8,9];
  const randomNum = [];
  let i = num.length;
  let j = 0;
 
  while(i) {
   j = Math.floor(Math.random() * (i));
   randomNum.push(num[j]);
   num.splice(j,1);
   if(randomNum.length === 4){
    i = 1;
   }
   i--;
  }
  return randomNum;
}
 
function getValues() {
  const computerNum = getRandomNum();
  console.log(computerNum)
  let valuesIndex = {};
  for(let i = 0; i < computerNum.length; i++){
   valuesIndex[computerNum[i]] = `${i}`;
  }
  return valuesIndex;
}
 
function getUserNum() {
  const num = readlineSync.question('Comencemos el juego.... \nIngresa un numero de 4 digitos ');
  const userNum = num.split('');
  if(userNum.length !== 4) {
   console.log('Ingresaste un numero inválido');
   getUserNum();
  }
  return userNum; 
}
 
function validation(userArr, objValues){
  let answer = '';
  for(let i = 0; i < userArr.length; i++){
   if(objValues[userArr[i]]){
    if(objValues[userArr[i]] === `${i}`){
     answer += 'F ';
    }else {
     answer += 'P '
    }
   }
  } 
  return answer;
}
 
function playGame() {
  let userNum = getUserNum();
  const valuesComp = getValues();
  console.log(valuesComp);
  while(true){
   if(validation(userNum, valuesComp) !== 'F F F F ') {
    console.log(`Obtuviste "${validation(userNum, valuesComp)}" \n :( Intentalo nuevamente`);
    userNum = getUserNum();
    validation(userNum, valuesComp);
   }else {
    console.log('Ganaste :):)');
    break;
   }
  }
  if (!readlineSync.keyInYNStrict('Deseas seguir jugando?')) {
    process.exit();
  }
  playGame();
}
playGame();