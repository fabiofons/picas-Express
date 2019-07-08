const express = require('express');
const app = express();
const cookieSession = require('cookie-session');

app.set('view engine', 'pug');
app.set('views', 'views');
app.use(express.urlencoded());
app.use(cookieSession({
  secret: 'barranquilla inmortal',
  maxAge:  3* 60 * 1000,
}));

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
  console.log(computerNum);
  let valuesIndex = {};
  for(let i = 0; i < computerNum.length; i++){
   valuesIndex[computerNum[i]] = `${i}`;
  }
  return valuesIndex;
}

function validation(userArr, objValues){
  let answer = '';
  for(let i = 0; i < userArr.length; i++){
   if(objValues[userArr[i]]){
    if(objValues[userArr[i]] === `${i}`){
     answer += 'F';
    }else {
     answer += 'P'
    }
   }
  } 
  return answer;
}

app.get('/',(req,res) =>{
  req.session.random = getValues();
  console.log(req.session.random);
  res.render('index');
})

app.post('/',(req,res) => {
  let number = req.body.number;
  const result = validation(number.split(""), req.session.random);

  res.render('index',{ number, result } );
})


app.listen(3000,()=> console.log("Listening on port 3000"))