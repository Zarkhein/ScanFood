/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

$(document).ready(function(){
    
    var city = localStorage.getItem("city");
    var weatherType = localStorage.getItem("weatherType");
    var cardSelector = $("#card");

    function getWeather(){
        if(city == null)
        {
            cardSelector.append("<p>Vous n'avez pas rentrer de ville</p>")
        }
        else
        {
            $("#card *:not(div)").remove();
            var myAPPID = "60f762fb029c28aae2cb2f6b6189ffdb";

            $.getJSON("http://api.openweathermap.org/data/2.5/weather?APPID=" + myAPPID + "&q=" + city, function(result){
            var cityName = result.name;
            var weatherType = result.weather[0].main;
            var iconCode = result.weather[0].icon;
            var temp = result.main.temp;
            var tempInCelsius = (temp - 273.15).toFixed(1);


            cardSelector.append("<ul><li>Ville: " + cityName + "</li><li>Météo: " + weatherType+ "</li><li>Temperature: " +tempInCelsius+ "&deg;C</li></ul>")
            cardSelector.append("<img src='img/" + iconCode + ".png' alt='Weather Icon' width='80px' height='80px'>");
            });
        }
    }
    function getPosWeather(position)
    {
        // onSuccess Rappel
// Cette méthode accepte un objet Position, qui contient le
// coordonnées GPS actuelles
//
function pos(position){
    console.log('ok' + position.coords.latitude + " " + position.coords.longitude)
    $("#card *:not(div)").remove();
    var myAPPID = "60f762fb029c28aae2cb2f6b6189ffdb";

    $.getJSON("http://api.openweathermap.org/data/2.5/weather?lat=" + position.coords.latitude + "&lon=" + position.coords.longitude + "&appid=" + myAPPID, function(result){
    var cityName = result.name;
    var weatherType = result.weather[0].main;
    var iconCode = result.weather[0].icon;
    var temp = result.main.temp;
    var tempInCelsius = (temp - 273.15).toFixed(1);

    cardSelector.append("<ul><li>Ville: " + cityName + "</li><li>Météo: " + weatherType+ "</li><li>Temperature: " +tempInCelsius+ "&deg;C</li></ul>")
    cardSelector.append("<img src='img/" + iconCode + ".png' alt='Weather Icon' width='80px' height='80px'>");
    
    localStorage.setItem("city", cityName);
    localStorage.setItem("weatherType", weatherType);
    }); 
}

// onError Callback reçoit un objet PositionError
//
function onError(error) {
    cardSelector.append("<p>Erreur coordonnées null</p>")
}
        navigator.geolocation.getCurrentPosition(pos, onError)
        
    }
        function submitFrom(){
            var myCity = $('input').val();
            if(myCity.length >=3)
            {
                localStorage.setItem("city", myCity);
                localStorage.setItem("weatherType", weatherType);
                city = myCity;
                getWeather();
            }else{
                alert('Empty field');
            }
        }

        $('#getWeather').on('click', function(){
            submitFrom();
        });

        $('form').submit(function(event){
            event.preventDefault();
            submitFrom();
        })

        $('#getPos').on('click', function(){
            getPosWeather();
            
        })

        getWeather();



});

