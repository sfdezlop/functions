//VERSIÓN 01 DE 12/01/23

//FUNCIONES PARA OPERAR CON STRINGS
reverseAString=(a)=>{
reverse = "";
for (i=a.length-1;i>=0;i--) {//no funciona si ponemos i=0 como segundo argumento en los for descendentes
reverse = reverse + a.charAt(i);
}
return reverse;
}

//End of Function reverseAString 

//FUNCIONES PARA OPERAR CON ARRAYS DE OBJETOS
sqlUnionQueryOfArraysOfObjects =(a,b)=>{
/*a is the first array of objets
b is the second array of objets*/
a.forEach(element=>element.origin="a Array");//if you want to identify the arrays of origin in the result array
result=a//firstly, we 'push' the content of the first array of objects to the result union array
b.forEach(element=>element.origin="b Array");//if you want to identify the arrays of origin in the result array
b.forEach(element=>result.push(element))/*secondly, we push the content of the second array of objects to the result union array.
We can also use the code of the spread operator result.push(...b) or result=a.concat(b) or result=[...a,...b]*/
return result
}
arrayEjemplo1 =[
  {user: "nuri", firstName: "Nuria"},
  {user: "dani", firstName: "Daniela"},
  {user: "santi", firstName: "Santiago"}
];
arrayEjemplo2 =[
  {user: "pili", firstName: "Pilar"},
  {user: "palo", firstName: "Paloma"}
]
console.table(arrayEjemplo1);
console.table(arrayEjemplo2);
console.table(sqlUnionQueryOfArraysOfObjects(arrayEjemplo1,arrayEjemplo2));
//End of Function sqlUnionQueryOfArraysOfObjects 

accumulateValueOfAPropertyInAFilteredArrayOfObjects = (a,b,c,d)=>{
/*a is the Array of Objects
b is the property of the objects where we want to calculate the accumulate value
c is the property of the objects where we want to filter the Array of Objects
d is the filter to apply in property c*/ 
result=a.filter(element => element[c]===d).reduce((accumulateValue, element)=>{
  accumulateValue=accumulateValue+element[b];
  return accumulateValue;
  },0);//initial value of the callback to avoid NaN errors and 'Reduce of empty array with no initial value' errors
return result;
}
const arrayEjemplo =[
//sample of a movement wallet table where we want to work out the balance per user
{user: "santi", date: "2022/01/01 00:00:01", type: "Wallet Opening", ammount: 50},
{user: "nuri", date: "2022/01/01 00:00:01", type: "Wallet Opening", ammount: 40},
{user: "dani", date: "2022/01/01 00:00:01", type: "Wallet Opening", ammount: 30},
{user: "santi", date: "2022/01/02 00:00:01", type: "Recharge", ammount: 100},
{user: "santi", date: "2022/01/03 00:00:01", type: "Purchase", ammount: -20},
{user: "nuri", date: "2022/01/04 00:00:01", type: "Purchase", ammount: -26},
{user: "dani", date: "2022/01/05 00:00:01", type: "Purchase", ammount: -13}
];
console.log(accumulateValueOfAPropertyInAFilteredArrayOfObjects(arrayEjemplo, "ammount", "user", "santi"));//130
console.log(accumulateValueOfAPropertyInAFilteredArrayOfObjects(arrayEjemplo, "ammount", "user", "nuri"));//14
console.log(accumulateValueOfAPropertyInAFilteredArrayOfObjects(arrayEjemplo, "ammount", "user", "dani"));//17
console.log(accumulateValueOfAPropertyInAFilteredArrayOfObjects(arrayEjemplo, "ammount", "user", "pepa"));//0 (case of an empty array)
//End of Function accumulateValueOfAPropertyInAFilteredArrayOfObjects 

orderByPropertyAnArrayOfObjects=(a,b,c)=>{
/*a is the array to order
b is the property to order by
c is the type of order ("ASCE" or "DESC")*/
result = a.sort((item1, item2)=>{
if (c==="DESC"){
  if (item1[b]===item2[b]){
  return 0;
  }
  if (item1[b] < item2[b]){
  return 1;
  }
  return -1;
} else {
  if (item1[b]===item2[b]){
  return 0;
  }
  if (item1[b] > item2[b]){
  return 1;
  }
  return -1;
}
}
)
return result;
}

const arrayEjemplo=[{product: "a", quantity: 12}, {product: "c", quantity: 6}, {product: "b", quantity: 13}];

console.table(orderByPropertyAnArrayOfObjects(arrayEjemplo, "product", "ASCE"));
console.table(orderByPropertyAnArrayOfObjects(arrayEjemplo, "product", "DESC"));
console.table(orderByPropertyAnArrayOfObjects(arrayEjemplo, "quantity", "ASCE"));
console.table(orderByPropertyAnArrayOfObjects(arrayEjemplo, "quantity", "DESC"));
//End of Function orderByPropertyAnArrayOfObjects 

maximumValueOfAPropertyInAnArrayOfObjects = (a, b) =>{
/*a is the array of object and b is the property in which you want to calculate
the maximum value betwween all de objects of the array*/
result = 0;
for (i=0; i<a.length; i++){
  if (result < a[i][b]){//it doest work is you use the typical a[i].b syntaxis to refer to properties because the function need to evaluate b
  result = a[i][b];
  }
}
return result;
}
arrayEjemplo=[
{name: "santiago", age: 52, heigth: 185},
{name: "nuria", age: 49, heigth: 162},
{name: "daniela", age: 15, heigth: 164}
];
console.log(maximumValueOfAPropertyInAnArrayOfObjects(arrayEjemplo, "age"));//52
console.log(maximumValueOfAPropertyInAnArrayOfObjects(arrayEjemplo, "heigth"));//185
//End of Function maximumValueOfAPropertyInAnArrayOfObjects 

groupByAPropertyAnArrayOfObjects=(a,b)=>{
/*a is the array of objects to group by
b is the property of the objects of the array where you want to group by*/
setOfGroups=[];
for(i=0;i<a.length;i++){
possibleGroupToAddToTheSet = a[i][b];//it doest work is you use the typical a[i].b syntaxis to refer to properties.
while (setOfGroups.includes(possibleGroupToAddToTheSet)===false) {setOfGroups.push(possibleGroupToAddToTheSet)}
}
return (setOfGroups);
}
const arrayEjemplo = [
  {name: "santiago", country: "spain"},
  {name: "nuria", country: "spain"},
  {name: "daniela", country: "portugal"},
];
console.log(groupByAPropertyAnArrayOfObjects(arrayEjemplo,"country").join());//spain,portugal
//End of Function groupByAPropertyAnArrayOfObjects 


//FUNCIONES PARA OPERAR CON ARRAYS
accumulateValueOfAnArray=(a)=>{
//a is the array
result=a.reduce((c,d)=>c+d,0);////initial value of the callback to avoid 'Reduce of empty array with no initial value' errors
return result
} 
const arrayEjemplo0Elementos=[]
const arrayEjemploNElementos=[1,2,3,4]
console.log(accumulateValueOfAnArray(arrayEjemplo0Elementos))//0
console.log(accumulateValueOfAnArray(arrayEjemploNElementos))//10
//End of Function accumulateValueOfAnArray

personalizedJoinOfAnArray=(a, b, c)=>{
/*a is the array, 
b are the characters you want to show between all the elements but between the penultimate and the last element
c are the characters you want to show between the penultimate and the last element*/
joinToShow="";
for (index in a){
  if(Number(index)<a.length-2){
  joinToShow=joinToShow+a[index]+b
  }else{
    if(Number(index)===a.length-2){
    joinToShow=joinToShow+a[index]+c;
    } else{
    joinToShow=joinToShow+a[index];
    }
  }
}
return joinToShow;
}
const arrayEjemplo5Elementos =["item1", "item2", "item3", "item4", "item5"];
const arrayEjemplo4Elementos =["item1", "item2", "item3", "item4"];
const arrayEjemplo3Elementos =["item1", "item2", "item3"];
const arrayEjemplo2Elementos =["item1", "item2"];
const arrayEjemplo1Elementos =["item1"];
const arrayEjemplo0Elementos =[];
console.log(personalizedJoinOfAnArray (arrayEjemplo5Elementos, ", ", " and "));// item1, item2, item3, item4 and item5
console.log(personalizedJoinOfAnArray (arrayEjemplo4Elementos, ", ", " and "));// item1, item2, item3 and item4
console.log(personalizedJoinOfAnArray (arrayEjemplo3Elementos, ", ", " and "));// item1, item2 and item3
console.log(personalizedJoinOfAnArray (arrayEjemplo2Elementos, ", ", " and "));// item1 and item2
console.log(personalizedJoinOfAnArray (arrayEjemplo1Elementos, ", ", " and "));// item1
console.log(personalizedJoinOfAnArray (arrayEjemplo0Elementos, ", ", " and "));// 
//End of Function personalizedJoinOfAnArray

groupByAnArray=(a)=>{
//a is the array to group by
setOfGroups=[];
for(i=0;i<a.length;i++){
possibleGroupToAddToTheSet = a[i];
while (setOfGroups.includes(possibleGroupToAddToTheSet)===false) {setOfGroups.push(possibleGroupToAddToTheSet)}
}
return (setOfGroups);
}
const arrayEjemplo = ["santiago", "santiago", "santiago", "nuria", "nuria", "daniela"];
console.log(groupByAnArray(arrayEjemplo).join());//santiago,nuria,daniela
//End of Function groupByAnArray

//FUNCIONES MATEMÁTICAS
roundToDecimals=(a,b)=>{
/*a is the number to round
b is the quantity of decimals you want to round
similar behaviour as redondear(a,b) in Excel*/
ax10ElevadoAb = a * Math.pow(10, b);
return Math.round(ax10ElevadoAb) / Math.pow(10, b);
}
const numeroEjemplo =511.3456;
console.log(roundToDecimals(numeroEjemplo, 4));//511.3456
console.log(roundToDecimals(numeroEjemplo, 3));//511.346
console.log(roundToDecimals(numeroEjemplo, 2));//511.35
console.log(roundToDecimals(numeroEjemplo, 1));//511.3
console.log(roundToDecimals(numeroEjemplo, 0));//511
console.log(roundToDecimals(numeroEjemplo, -1));//510
console.log(roundToDecimals(numeroEjemplo, -2));//500
console.log(roundToDecimals(numeroEjemplo, -3));//1000
//End of Function roundToDecimals

factorialOfAIntegerNumber=(a)=>{
factorial=1;
for (i=1;i<=a;i++){
factorial = factorial*i;
}
result=factorial;
return result;
}
console.log(factorialOfAIntegerNumber(0));//1
console.log(factorialOfAIntegerNumber(1));//1
console.log(factorialOfAIntegerNumber(2));//2
console.log(factorialOfAIntegerNumber(3));//6
//End of Function factorialOfAIntegerNumber

//FUNCIONES DE FECHAS
americanLargeFormatOfADate=(a) =>{
year = a.getFullYear()
if (Number(a.getMonth()+1)<10) {month="0"+ (a.getMonth()+1)} else {month=a.getMonth()+1};
if (a.getDate()<10) {day="0"+ a.getDate()} else {day=a.getDate()};
if (a.getHours()<10) {hour="0"+ a.getHours()} else {hour=a.getHours()};
if (a.getMinutes()<10) {minute="0"+ a.getMinutes()} else {minute=a.getMinutes()};
if (a.getSeconds()<10) {second="0"+ a.getSeconds()} else {second=a.getSeconds()};
result = year + "/" + month + "/" + day + " " + hour + ":" + minute + ":" + second + "." + a.getMilliseconds();
return result;
}
//End of Function americanLargeFormatOfADate
