const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');
const jsFiles = JSON.parse(fs.readFileSync('/tmp/seowork/jsfiles_ordered.json', 'utf8'));

let out = html;
out = out.replace(/<link rel="stylesheet" href="https:\/\/cdn\.jsdelivr\.net\/npm\/maplibre-gl[^>]*>\s*/,'');
out = out.replace(/<script src="https:\/\/cdn\.jsdelivr\.net\/npm\/maplibre-gl[^>]*><\/script>\s*/,'');
out = out.replace('<link rel="stylesheet" href="contentmap_style.css">', '');

const stub = `<script>
window.maplibregl = {
  Map: function(opts){
    this._handlers = {};
    this.flyTo = function(){};
    this.fitBounds = function(){};
    this.addControl = function(){};
    this.on = function(ev, cb){ this._handlers[ev] = this._handlers[ev] || []; this._handlers[ev].push(cb); };
    this.getSource = function(){ return { setData:function(){} }; };
    this.addSource = function(){};
    this.addLayer = function(){};
    this.getLayer = function(){ return null; };
    this.getCanvas = function(){ return { style:{} }; };
    this.resize = function(){};
    this.setLayoutProperty = function(){};
    this.easeTo = function(){};
    this.getZoom = function(){ return 6; };
    this.getCenter = function(){ return { lng:138, lat:36.2 }; };
  },
  NavigationControl: function(){},
  LngLatBounds: function(){
    this._pts = [];
    this.extend = function(pt){ this._pts.push(pt); return this; };
  },
  Popup: function(){
    this.setLngLat = function(){ return this; };
    this.setHTML = function(){ return this; };
    this.addTo = function(){ return this; };
    this.remove = function(){ return this; };
  }
};
</script>
`;
out = out.replace('<head>', '<head>\n' + stub);

for (const f of jsFiles){
  const code = fs.readFileSync(f, 'utf8');
  const re = new RegExp('<script src="' + f + '"></script>');
  out = out.replace(re, '<script>\n' + code + '\n</script>');
}

fs.writeFileSync('/tmp/seowork/test_index.html', out);
console.log('built /tmp/seowork/test_index.html, length', out.length);
