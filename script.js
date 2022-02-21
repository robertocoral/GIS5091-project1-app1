var map = L.map('map').setView([39, -95], 5);

L.tileLayer('https://a.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	attribution: 'Map tiles by Stamen Design, under CC BY 3.0.',
	maxZoom: 18
}).addTo(map);

$.getJSON("https://gist.githubusercontent.com/erincaughey/2f221501645757e28b715c4063e87595/raw/a90be1b434b1a8cdf71c2abc3373ca63987e2d23/nps-geo-boundary.json",function(data){
    L.geoJSON(data, {
		onEachFeature: function (feature, layer) {
			layer.bindPopup('<h3>'+feature.properties.UNIT_NAME+'</h3>');
		},
		filter: nationalParkFilter,
		style: parkStyle
	}).addTo(map);
    function nationalParkFilter(feature) {
      return feature.properties.UNIT_TYPE === "National Park"
    }
});

var parkStyle = {
    "color": "#228B22",
    "weight": 3
};

$.getJSON("https://raw.githubusercontent.com/robertocoral/GIS5091-project1-app1/main/us-airports.geojson",function(data){
    L.geoJSON(data, {
		onEachFeature: function (feature, layer) {
			layer.bindPopup('<h3>'+feature.properties.name+'</h3>');
		},
		pointToLayer: function(point, latlng) {
			return L.marker(latlng, { icon: airportIcon})
		}
	}).addTo(map);
});

var airportIcon = new L.Icon({
     iconSize: [27, 27],
     iconAnchor: [13, 27],
     popupAnchor:  [1, -24],
     iconUrl: 'https://cdn2.iconfinder.com/data/icons/rental-icon/240/airport-512.png'
 });
