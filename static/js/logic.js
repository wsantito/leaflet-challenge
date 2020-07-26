
// Store our API endpoint inside queryUrl
// var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"
var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson"
var tectonicPlatesURL = "https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json"

var TXT = ""

// Past Day
let PD_SE = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_day.geojson"
let PD_4_5E = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_day.geojson"
let PD_2_5E = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_day.geojson"
let PD_1E = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/1.0_day.geojson"
let PD_All = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson"
// //Last 7 Days
let L7D_SE = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_week.geojson"
let L7D_4_5E = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson"
let L7D_2_5E = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojson"
let L7D_1E = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/1.0_week.geojson"
let L7D_All = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"
// //Last 30 Days
let L30D_SE = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson"
let L30D_4_5E = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_month.geojson"
let L30D_2_5E = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_month.geojson"
let L30D_1E = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/1.0_month.geojson"
let L30D_All = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson"

function changeURLD(){
    if(document.getElementById("propertydropdown").value == "Significant Earthquakes"){
        url = PD_SE ;
        TXT = "Significant Earthquakes";
        console.log(url)
        MapUpdate(url)
    }
    else if(document.getElementById("propertydropdown").value == "M4.5+ Earthquakes"){
        url = PD_4_5E;
        TXT = "M4.5+ Earthquakes";
        console.log(url)
        MapUpdate(url)
    }
    else if(document.getElementById("propertydropdown").value == "M2.5+ Earthquakes"){
        url = PD_2_5E;
        TXT = "M2.5+ Earthquakes";
        console.log(url)
        MapUpdate(url)
    }
    else if(document.getElementById("propertydropdown").value == "M1.0+ Earthquakes"){
        url = PD_1E;
        TXT = "M1.0+ Earthquakes";
        console.log(url)
        MapUpdate(url)
    } 
    else if(document.getElementById("propertydropdown").value == "All Earthquakes"){
        url = PD_All;
        TXT = "All Earthquakes";
        console.log(url)
        MapUpdate(url)
    }
   // document.getElementById("EarthQuakeTXT").innerHTML=("Past Day " +TXT);
  };
  
// function myFunction() {
//     document.getElementById("myDropdown").classList.toggle("show");
//   }

// window.onclick = function(e) {
//     if (!e.target.matches('.dropbtn')) {
//     var myDropdown = document.getElementById("myDropdown");
//       if (myDropdown.classList.contains('show')) {
//         myDropdown.classList.remove('show');
//       }
//     }
//   }


function Features(EQData, TctncData) {

    var Tectonics = L.geoJSON(TctncData, {
        color: "orange",
      })
    var Earthquakes = L.geoJSON(EQData, {
        onEachFeature: function(feature, layer) {
            layer.bindPopup("<p> <b>" + feature.properties.place +
            "</b></p><p>" + new Date(feature.properties.time) + "</p><p>" + "Magnitude: " + feature.properties.mag) + "</p>";
          },

          pointToLayer: function (feature, latlng) {
            return new L.circle(latlng,
              {radius: Radius(feature.properties.mag),
              fillColor: Color(feature.properties.mag),
              fillOpacity: .6,
              color: "#000",
              stroke: true,
              weight: .8
          })
        }
        });

    createMap(Earthquakes, Tectonics);
}

 // Sending our earthquakes layer to the createMap function

function createMap(Earthquakes, Tectonics) {

    // Type of Maps layers
    const streetmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
            attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
            maxZoom: 18,
            id: "mapbox.streets",
            accessToken: API_KEY
    });

    const darkmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
            attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
            maxZoom: 18,
            id: "mapbox.dark",
            accessToken: API_KEY
    });

    const satellite = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 18,
        id: "mapbox.satellite",
        accessToken: API_KEY
});

    
    // selction of the type of Maps
    const baseMaps = {
            "Street Map": streetmap,
            "Dark Map": darkmap,
            "Satellite": satellite
    };

    // Create everlay for the layers
    const overlayMaps = {
            Earthquakes: Earthquakes,
            tectonicPlates: Tectonics
    };

    // Create map
    const myMap = L.map("map", {
            center: [39.68, -111.00],
            zoom: 5,
            layers: [streetmap, Earthquakes, Tectonics]
    });

    // Add layers control to the map
    L.control.layers(baseMaps,overlayMaps, {
            collapsed: true
    }).addTo(myMap);

    //    Create legend
   var legend = L.control({
    position: "bottomright"
    });

    legend.onAdd = function(myMap) {
      var div = L.DomUtil.create("div", "info legend"),
      grades = [0, 1, 2, 3, 4, 5],
      labels = [];


    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
        '<i style="background:' + Color(grades[i] + 1) + '"></i> ' +
        grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    }
        return div;
    };

    legend.addTo(myMap);


}

(async function(){
    var PlotData = await d3.json(url);
    let TctncData = await d3.json(tectonicPlatesURL);
    Features(PlotData.features, TctncData.features);
})()

function MapUpdate(){
    PlotData = d3.json(url);
    let TctncData = d3.json(tectonicPlatesURL);
    Features(PlotData.features, TctncData.features);
};


// function for magnitude colors
function Color(magnitude) {
    if (magnitude > 5) {
        return 'red'
    } else if (magnitude > 4) {
        return 'orange'
    } else if (magnitude > 3) {
        return 'purple'
    } else if (magnitude > 2) {
        return 'yellow'
    } else if (magnitude > 1) {
        return 'green'
    } else {
        return 'lightgreen'
    }
};

function Radius(magnitude) {
    return magnitude * 10000;
};


