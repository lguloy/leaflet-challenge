// Query URL
var queryURL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

d3.json(queryURL).then(function(data) {
  // Once we get a response, send the data.features object to the createFeatures function
  console.log(data.features)
  
    
  
  //creates a circle layer everytime
  for (var i = 0; i < data.features.length; i++){
    Coords = [data.features[i].geometry.coordinates[1], data.features[i].geometry.coordinates[0]]
    earthquakes = L.circle(Coords, {
      fillOpacity: 0.75,
      color: "white",
      fillColor: Depthcolors(+data.features[i].geometry.coordinates[2]) ,
      radius: (+data.features[i].properties.mag)*10000
    }).bindPopup("<h1>"+data.features[i].properties.title+"</h1>").addTo(myMap);
  };
  
  //Create a legend
  var legend = L.control({ position: "bottomright" });
  legend.onAdd = function () {

    var div = L.DomUtil.create('div', 'info legend');
    
    var legendinfo = "<div style = \"background-color:white;\">" + "<h1> Depth Levels </h1>" +
    "<div class=\"labels\" >" +
    "<div style = \"background-color:#33FF99;\"> " + "-10-30" + "</div>" +
    "<div style = \"background-color:#33FF33;\">" + "10-30" + "</div>" +
    "<div style = \"background-color:#99FF33;\">" + "30-50" + "</div>" +
    "<div style = \"background-color:#FFFF33;\">" + "50-70" + "</div>" +
    "<div style = \"background-color:#FF9933;\">" + "70-90" + "</div>" +
    "<div style = \"background-color:#FF3333;\">" + "90+" + "</div>" +
    "</div>"
    "</div>";

    div.innerHTML = legendinfo
     return div;
    }

  legend.addTo(myMap)
});


// Color function

function Depthcolors(depth) {
  if (depth >= 90) {
    return "#FF3333"
  }
  else if (depth < 90 && depth >= 70) {
    return "#FF9933"
  }
  else if (depth < 70 && depth >= 50) {
    return "#FFFF33"
  }
  else if (depth < 50 && depth >= 30) {
    return "#99FF33"
  }
  else if (depth < 30 && depth >= 10){
    return "#33FF33"
  }
  else{
    return  "#33FF99"
  }
}




// MAP CREATIONS 

var myMap = L.map("map", {
  center: [45.52, -122.67],
  zoom: 6
});

  // Adding a tile layer (the background map image) to our map
  // We use the addTo method to add objects to our map
var bigmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/streets-v11",
  accessToken: API_KEY
}).addTo(myMap);

