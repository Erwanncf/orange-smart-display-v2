var myVar = setInterval(myTimer, 1000);
var timeout = 0;
var temperatur = 'nc';
var Humidite='nc';
var PsAtmo= 'nc';
var Luminosite = 'nc';
var bruit = 'nc';
var Altitude = 'nc';
var tempCaf = 'nc';
var heure= 'nc';
var Message = 'nc';
var d= new Date();

		  var dateData;
		  var dateDataMemory ;

function displayMyVar (targetElementId)
  {
	document.getElementById('target1').innerHTML = temperatur ;
	document.getElementById('target2').innerHTML = Humidite;
	document.getElementById('target3').innerHTML = PsAtmo;
	document.getElementById('target5').innerHTML = bruit;
	document.getElementById('target6').innerHTML = tempCaf;
	document.getElementById('target7').innerHTML = Message;
  }

function getSensors(dateData)
{
	var urlSensors = 'https://liveobjects.orange-business.com/api/v0/data/streams/urn%3Alo%3Ansid%3AsmartDisplay%3A1856745!Data?limit=100';
	var req = new XMLHttpRequest();
	req.onreadystatechange = function (aEvt) 
	{  
	  if (req.readyState == 4) 
	  {
			console.log(req.readyState);
			console.log(req.status);
			if(req.status == 200)
			{
			
				var ArrData = JSON.parse(req.responseText);
				var LastData= ArrData[0];				
				console.log(LastData);
				
				var AllValue = LastData.value;
				console.log(AllValue);
				
				
				dateData = LastData.timestamp;
				console.log(dateData);
				document.getElementById("demo").innerHTML = new Date(dateData);
				
								
				heure = d.getHours();
				// console.log(heure);
				
				if (dateData != dateDataMemory)
				{	if(tempCaf >50 | bruit > 0  )
					{
						document.getElementById('xyz').play();
					}
					timeout = 30;
					dateDataMemory = dateData;
				}
				
				temperatur= AllValue.Temp;
				console.log(temperatur);
				
				Humidite= AllValue.Hygro;
				console.log(Humidite);
				
				PsAtmo= AllValue.PsAt;
				console.log(PsAtmo);
				
				Luminosite= AllValue.Lum;
				console.log(Luminosite);
				
				bruit= AllValue.Bruit;
				console.log(bruit);
				
				Altitude= AllValue.Alt;
				console.log(Altitude);
        
				tempCaf= AllValue.tempCaf;
				console.log(tempCaf);
				
				Message= AllValue.Message;
				console.log(Message);
				
				displayMyVar ();	
		
			}
			else
			{
				console.log("Erreur pendant le chargement de la page.\n");
			}
	  }
	};
	req.open('GET', urlSensors , true);
	req.setRequestHeader("X-API-KEY", '7ef7949fb37c454aa3087f63c276573d');
	req.send(null);	
}

function myTimer() 
{
	timeout = timeout -1;
	if (timeout == -1)
	{
	  timeout = 0;
	}
	document.getElementById("demo1").innerHTML = timeout;
	console.log(dateDataMemory);
	console.log(dateData);
	getSensors();
}
	