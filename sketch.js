var zoom = 1;
let curr_ip_data;
let map_img;
function setup()
{
	//createCanvas(ww,hh);
	translate(width/2,height/2);
	imageMode(CENTER);
	$.getJSON('http://gd.geobytes.com/GetCityDetails?callback=?', function(data) {
		let data_cp=data;
	  curr_ip_data=data.geobytesipaddress;
	$.getJSON("http://api.ipstack.com/"+curr_ip_data+"?access_key=795b81a0c1ee039639d33b6e46f101f3",function(data){
	map_img=createImg('https://dev.virtualearth.net/REST/V1/Imagery/Map/Road/'+data.latitude+'%2C'+data.longitude+'/13?mapSize=500,250&format=png&pushpin='+data.latitude+','+data.longitude+';64;Hi&key=AqB0MpU-01rhZ-j_isOHf_fad-KN7EFYtospc-vBpnwwVtZxbYFVqH3rviMasWAQ');
	image(map_img,0,0);
	let current_city=createDiv();
		current_city.style("font-size","28pt")
		current_city.html('Hello, You are in '+data.city);
		let latitude=data.latitude;
		$.getJSON('https://openweathermap.org/data/2.5/weather?q='+data.city+'&appid=b6907d289e10d714a6e88b30761fae22',function(weather_raw){
			let banner=createDiv();
			banner.style("text-shadow", "0.5px 0.5px #000000");
			banner.style("font-size","20pt");
			banner.html("Weather In your Area:");
			let switch_to_fahr=createButton('Switch To Fahrenheit');
			let temperature=createDiv();
			temperature.style("text-shadow", "0.5px 0.5px #000000");
			temperature.style("font-size","15pt");
			temperature.html('Temperature : '+ weather_raw.main.temp+"° C");
			let cel_b=true;
			switch_to_fahr.mousePressed(changebutton);
			function changebutton(){
				let temp_fah;
				temp_fah=celciustofahren(weather_raw.main.temp);
				if(cel_b==true)
				{
					
					temperature.html('Temperature : '+ celciustofahren(weather_raw.main.temp)+"° F");
					switch_to_fahr.html('Switch To Celcius');
					cel_b=false;
				}
				else
				{
					temperature.html('Temperature : '+ fahrentocelcius(temp_fah)+"° C");
					switch_to_fahr.html('Switch To Fahrenheit');
					cel_b=true;
				}
			
			}//end of changebutton
			let pressure=createDiv(),humidity=createDiv();
			pressure.style("text-shadow", "0.5px 0.5px #000000");
			pressure.style("font-size","15pt");
			humidity.style("text-shadow", "0.5px 0.5px #000000");
			humidity.style("font-size","15pt");
			
			if(weather_raw.main.pressure!==undefined)
			{
				pressure.html('Pressure : '+weather_raw.main.pressure+" milliBars");
			}
			else
			{
				pressure.html('Pressure : not available currently from API');
			}
			if(weather_raw.main.humidity!==undefined)
			{
				humidity.html('Humidity : '+weather_raw.main.humidity+"%");
			}
			else{
				humidity.html('Humidity : not available currently from API');
			}
			 

			function celciustofahren(cel)
			{
				return (cel*1.8+32);
			}
			function fahrentocelcius(fah)
			{
				return ((fah-32)/1.8).toFixed(2);
			}

			let searchbox=createInput('Enter Search City');
			let searchButton=createButton('Search Weather');
			searchButton.mousePressed(searchweather);
			function searchweather()
			{
				switch_to_fahr.hide();
				let switch_to_fahr2=createButton('Switch To Fahrenheit');

				banner.html('Weather in '+searchbox.value()+" :");
				$.getJSON('https://openweathermap.org/data/2.5/weather?q='+searchbox.value()+'&appid=b6907d289e10d714a6e88b30761fae22',function(search_weather_raw){
				temperature.html('Temperature : '+ search_weather_raw.main.temp+"° C");

				map_img=createImg('https://dev.virtualearth.net/REST/V1/Imagery/Map/Road/'+search_weather_raw.coord.lat+'%2C'+search_weather_raw.coord.lon+'/13?mapSize=500,250&format=png&pushpin='+search_weather_raw.coord.lat+','+search_weather_raw.coord.lon+';64;Hi&key=AqB0MpU-01rhZ-j_isOHf_fad-KN7EFYtospc-vBpnwwVtZxbYFVqH3rviMasWAQ');
				image(map_img,-width/2,-height/2);
				
				if(search_weather_raw.main.pressure!==undefined)
				{
					pressure.html('Pressure : '+search_weather_raw.main.pressure+" milliBars");
				}
				else{
					pressure.html('Pressure : not available currently from API');
				}
				if(search_weather_raw.main.humidity!==undefined)
				{
					humidity.html('Humidity : '+search_weather_raw.main.humidity+"%");
				}
				else{
					humidity.html('Humidity : not available currently from API');
				}
				switch_to_fahr2.mousePressed(changebutton2);
				let cel_b2=true;
				function changebutton2()
				{
					let temp_fah2=celciustofahren(search_weather_raw.main.temp);
				if(cel_b2==true)
				{
					
					temperature.html('Temperature : '+ celciustofahren(search_weather_raw.main.temp)+"° F");
					switch_to_fahr2.html('Switch To Celcius');
					cel_b2=false;
				}
				else
				{
					temperature.html('Temperature : '+ fahrentocelcius(temp_fah2)+"° C");
					switch_to_fahr2.html('Switch To Fahrenheit');
					cel_b2=true;
				}
				}

			});
			
		}


		});
});
});


}
