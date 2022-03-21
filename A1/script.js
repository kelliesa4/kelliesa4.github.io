mapboxgl.accessToken = 'pk.eyJ1Ijoia2VsbHNhNCIsImEiOiJja3p5NzJuNnMwOGRuMnZvNjQ4bnJkNmRpIn0.p2ynLJ3ME0bfdGjdaasQQA';

mapboxgl.accessToken= 'pk.eyJ1Ijoia2VsbHNhNCIsImEiOiJja3p5NzJuNnMwOGRuMnZvNjQ4bnJkNmRpIn0.p2ynLJ3ME0bfdGjdaasQQA';

const style_2019 = "mapbox://styles/kellsa4/cl0qh0uf7006b16meelpz8jv2";
const style_2021 = "mapbox://styles/kellsa4/cl0pmoygc002814qzqyeo9caq";

const map = new mapboxgl.Map({
  container: 'map', // container id
  style: style_2019 // replace this with your style URL
});

const layerList = document.getElementById("menu");
 const inputs = layerList.getElementsByTagName("input");
//On click the radio button, toggle the style of the map.
for (const input of inputs) {
 input.onclick = (layer) => {
  if (layer.target.id == "style_2019") {
   map.setStyle(style_2019);
  }
  if (layer.target.id == "style_2021") {
   map.setStyle(style_2021);
  }
 };
}

map.on('load', () => {
  const layers = [
  '<b>Most Qualifications</b>',
  '0-40',
  '40-80',
  '80-120',
  '120-160',
  '160-200',
  '200-250',
  '250-300',
  '300+',
  '<b>Least Qualifications</b>'
];
const colors = [
  '#ffffff',
  '#4575b4',
  '#74add1',
  '#abd9e9',
  '#e0f3f8',
  '#f6e8c3',
  '#fdae61',
  '#f46d43',
  '#d73027'
  ];
 
 
// create legend
const legend = document.getElementById('legend');

layers.forEach((layer, i) => {
  const color = colors[i];
  const item = document.createElement('div');
  const key = document.createElement('span');
  key.className = 'legend-key';
  key.style.backgroundColor = color;

  const value = document.createElement('span');
  value.innerHTML = `${layer}`;
  item.appendChild(key);
  item.appendChild(value);
  legend.appendChild(item);
 });
});

map.on('mousemove', (event) => {
  const Neighbourhood = map.queryRenderedFeatures(event.point, {
    layers: ['glasgowandedinburgh-7t945r']
  });
  document.getElementById('pd1').innerHTML = Neighbourhood.length
    ? `<h3>${Neighbourhood[0].properties.Name}</h3><p><strong>${Neighbourhood[0].properties.no_qualifications}</strong> people with no qualifications <em>(standardised ratio)</em></p>`
    : `<p>Hover Over a Neighbourhood to see the number of people without qualifications!</p>`;
});
 
map.addControl(new mapboxgl.NavigationControl(),"top-left");
  map.addControl(
 new mapboxgl.GeolocateControl({
 positionOptions: {
 enableHighAccuracy: true
 },
 trackUserLocation: true,
 showUserHeading: true
 }),
 "top-left"
);
 const geocoder = new MapboxGeocoder({
    // Initialize the geocoder
 accessToken: mapboxgl.accessToken, // Set the access token
 mapboxgl: mapboxgl, // Set the mapbox-gl instance
 marker: false, // Do not use the default marker style
 placeholder:"Search for places in Glasgow and Edinburgh",
    proximity: {
 longitude: 55.8642,
 latitude: -4.251433 
      // Placeholder text for the search bar
  } // Coordinates of Glasgow center
}); 
 
map.on('click', (event) => {
  const dzone = map.queryRenderedFeatures(event.point, {
    layers: ['glasgowandedinburgh-1anwn1']
  });
  document.getElementById('pd').innerHTML = dzone.length
    ? `</h3><p><strong>${dzone[0].properties.income_count}</strong> people are income deprived</em></p>`
    : `<p>Click on a circle to see the number of people that are income deprived!</p>`;
  });

map.on('load', () => {
  const layers = [
  '0-300',
  '300-600',
  '600+'
];
  const colors = [
  '#252525',
  '#252525',
  '#252525'
  ];
 
// create legend
const legend = document.getElementById('legend1');

layers.forEach((layer, i) => {
  const color = colors[i];
  const item = document.createElement('div');
  const key = document.createElement('span');
  key.className = 'legend1-key';
  key.style.backgroundColor = color;

  const value = document.createElement('span');
  value.innerHTML = `${layer}`;
  item.appendChild(key);
  item.appendChild(value);
  legend.appendChild(item);
 });
});