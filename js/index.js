var myVar = setInterval(myTimer, 30000);
var newDataFlag = 1;
var temperatur = 'nc';
var Humidite='nc';
var PsAtmo= 'nc';
var Luminosite = 'nc';
var bruit = 'nc';
var Altitude = 'nc';
var tempCaf = 'nc';
var heure= 'nc';
var Message = 'nc';
var IP = 'nc';
var d= new Date();
	 // récupérer l'heure (initialement définie à 0 en html)
var h = 30;
var dateData;
var dateDataMemory ;
var etatCaf = "Eteinte";
var Occupation  = "Non occupée";
var c = false;

      function sendNotif()
	  {
        console.log('begin');
        var http = new XMLHttpRequest();
		var alertBody = {};
		alertBody.titleNotif = document.getElementById('titleNotif').value;
		alertBody.textNotif = document.getElementById('textNotif').value;;
 
        var params =  JSON.stringify(alertBody);
        http.open("POST", "/", true);
		console.log(params);
        http.setRequestHeader("Content-type", "application/json");
        //http.setRequestHeader("Content-length", params.length);
        //http.setRequestHeader("Connection", "close");

        http.onreadystatechange = function() 
		{
				   alert("begin");
            console.log('onreadystatechange');
            if (http.readyState == 4 && http.status == 200) {
                alert(http.responseText);
            }
            else 
			{
                console.log('readyState=' + http.readyState + ', status: ' + http.status);
            }
        }

        console.log('sending...')
        http.send(params);
        console.log('end');
     }


	(function(w, d, s, id, n)
			{

				w[n] = w[n] || {q: [],

					init: function(o) {w[n].initOpts = o;},

					ready: function(c) {w[n].q.push(c);}};

				var js, fjs = d.getElementsByTagName(s)[0];

				if (d.getElementById(id)) {return;}

				js = d.createElement(s); js.id = id;

				js.src = "https://cdn.by.wonderpush.com/sdk/1.1/wonderpush-loader.min.js";

				fjs.parentNode.insertBefore(js, fjs);

			}(window, document, "script", "wonderpush-jssdk-loader", "WonderPush"));

			 

			WonderPush.init({

				webKey: "f8af2631e9bc3fede55d22dfa04bd264a2cba99f467e7dd3046295ae8a140b4c",

				optInOptions: {

					// You can modify or translate the following:

					modalBoxMessage: "We will send you personalized notifications.<br/>You can always unsubscribe at any time.",

					modalBoxButton: "Got it!",

					externalBoxProcessingMessage: "Subscribing...",

					externalBoxSuccessMessage: "Thanks for subscribing!",

					externalBoxFailureMessage: "Sorry, something went wrong.",

					externalBoxTooLongHint: "Poor connection or private browsing?",

					externalBoxCloseHint: "Close"

				}

			});
			


function displayMyVar (targetElementId)
  {
	document.getElementById('target1').innerHTML = temperatur ;
	document.getElementById('target2').innerHTML = Humidite;
	document.getElementById('target3').innerHTML = PsAtmo;
	document.getElementById('target5').innerHTML = bruit;
	document.getElementById('target6').innerHTML = tempCaf;
	document.getElementById('target7').innerHTML = Message;
	document.getElementById('target8').innerHTML = IP;
    document.getElementById('target9').innerHTML = etatCaf;
	document.getElementById('target10').innerHTML = Occupation;

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
					h = 30;
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
				
				IP= AllValue.IP;
				console.log(IP);
				
				if (tempCaf > 50)
				{
					etatCaf = "Allummée"
					c = true;
				}
				else 
				{
					etatCaf = "Eteinte"
					c = false;
				}
				
				if (bruit > 1)
				{
					Occupation = "Occupée"
				}
				else 
				{
					Occupation  = "Non occupée"
				}
				
				if(c== true) 
				{
				  document.getElementById("img").setAttribute("src","http://p5.storage.canalblog.com/56/87/833312/83378583_o.gif"); 
				}
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

function myTimer(setTime) 
{

	if ( h>setTime ) {
		//l'incrémenter 
		h--;
		//inserer la nouvelle heure 
		document.getElementById("heure").innerHTML = h;
      }
	  else
	  {
		getSensors();  
	  }
	  
}

//déclencher la fonction toutes les secondes
window.setInterval("myTimer(0)", 1000); 


	