const express=require("express");
const https=require("https");

const app=express();

app.get("/",function(req,res){
    const url="https://api.openweathermap.org/data/2.5/weather?q=Bengaluru&appid=91eb372d8e63e43cbf2647bb43726274&units=metric"
    https.get(url,function(response){
        console.log(response.statusCode); 
        
        response.on("data",function(data){
            const weatherData=JSON.parse(data); 
            
            const temp=weatherData.main.temp;
            const weatherDesc=weatherData.weather[0].description; // to print description(we can install json viewer,open the link of api in
            //  browser and see what we want and copy path)
            const icon=weatherData.weather[0].icon;
            const imageURL="https://openweathermap.org/img/wn/" + icon + "@2x.png"
            
            console.log(weatherDesc);
            res.write("<p> the weather description is : " + weatherDesc + "</p>")
            res.write("<h1> The temperature of Bangalore is "+ temp +" degree celsius </h1> " ) 
            res.write("<image src=" + imageURL + " /> ")
            res.send() // we can have only one res.send() in a app method
        })
        
        
    })
})

app.listen(3000,function(){
    console.log("Server is running on port 3000");
})