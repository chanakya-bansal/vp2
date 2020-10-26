var dogImg,dogHImg,bottleImg,dog,bottle,mud,mudImg,status,remain,bone,database,feed,addFood,feedTime,lastFed,foodObj


function preload()
{
  dogImg=loadImage("dogImg.png")
  dogHImg=loadImage("dogImg1.png")
  bottleImg=loadImage("bottle.png")
  mudImg=loadImage("mud.png")
 
}

function setup() {
  createCanvas(800,700);
 
  database=firebase.database()

  mud=createSprite(400,620,10,10)
  mud.addImage(mudImg)
  mud.scale=0.3

  dog=createSprite(400,520,20,20)
  dog.addImage(dogImg)
  dog.scale=0.25

  
 
   foodObj=new Food()

   feed=createButton("feed the dog")
   feed.position(700,95)
   feed.mousePressed(feedDog)

   addFood=createButton("add food")
   addFood.position(800,95)
   addFood.mousePressed(addFoods)
 
 
}


function draw() {  
  background(255,203,43)

 foodObj.display()
 
 


 feedTime=database.ref("feedTime")
 feedTime.on("value",function(data){
 lastFed=data.val()
 })

 
 
 fill(255,255,254)
 textSize(15)
 if(lastFed>=12){
   text("last feed :"+ lastFed%12 + "PM",350,30)
 }else if(lastFed==0){
   text("last feed : 12 AM ",350,30)
 }else{
   text("last feed : "+lastFed+"AM",350,30)
 }
 
 
 

 stroke (0)
 fill (0)
 textSize(15)
 text("bottles remaining :"+remain,540,20)

 






  drawSprites();
}



function feedDog(){
 dog.addImage(dogHImg)
 time=hour()
 foodObj.updateFoodStock(foodObj.getFoodStock()-1)
 database.ref('/').update({
   food:foodObj.getFoodStock(),
   feedTime:time
 })
}
function addFoods(){
 foodS++
 database.ref('/').update({
   food:foodS
 })
}