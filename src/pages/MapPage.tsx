import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { motion, AnimatePresence } from 'motion/react';
import { CITIES, ARCHITECTURES, City, Architecture } from '../data/appData';
import { Navigation, Info, ArrowRight, MapPin, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '../lib/utils';
import L from 'leaflet';

// Fix for default marker icon in Leaflet
const DefaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

function ChangeView({ center, zoom }: { center: [number, number], zoom: number }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom, { animate: true });
  }, [center, zoom, map]);
  return null;
}

export default function MapPage({ lang }: { lang: 'EN' | 'ZH' }) {
  const [selectedCity, setSelectedCity] = useState<City>(CITIES[0]);
  const [mapCenter, setMapCenter] = useState<[number, number]>(CITIES[0].coordinates);
  const [showPanel, setShowPanel] = useState(true);

  const cityArchitectures = ARCHITECTURES.filter(a => a.cityId === selectedCity.id);

  const handleCityChange = (city: City) => {
    setSelectedCity(city);
    setMapCenter(city.coordinates);
  };

  return (
    <div className="relative h-[calc(100vh-64px)] overflow-hidden bg-parchment">
      {/* City Switcher Overlay */}
      <div className="absolute top-6 left-6 z-[1000] flex flex-col gap-2">
        <label className="text-[10px] font-bold text-charcoal/50 uppercase tracking-widest bg-white/80 px-2 py-1 rounded backdrop-blur-sm self-start">
          {lang === 'EN' ? 'Capitals' : '都城选择'}
        </label>
        <div className="flex bg-white/90 backdrop-blur-md p-1 rounded-full shadow-lg border border-imperial-red/10">
          {CITIES.map((city) => (
            <button
              key={city.id}
              onClick={() => handleCityChange(city)}
              className={cn(
                "px-4 py-2 rounded-full text-xs font-bold transition-all",
                selectedCity.id === city.id 
                  ? "bg-imperial-red text-white" 
                  : "hover:bg-imperial-red/10 text-charcoal/60"
              )}
            >
              {lang === 'EN' ? city.name : city.nameZh}
            </button>
          ))}
        </div>
      </div>

      {/* Main Map */}
      <div className="w-full h-full z-0">
        <MapContainer 
          center={mapCenter} 
          zoom={13} 
          scrollWheelZoom={true}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <ChangeView center={mapCenter} zoom={13} />
          
          {cityArchitectures.map((arch) => (
            <Marker key={arch.id} position={arch.coordinates}>
              <Popup className="custom-popup">
                <div className="p-2 min-w-[200px]">
                  <img src={arch.image} className="w-full h-24 object-cover rounded-lg mb-2" alt={arch.name} />
                  <h3 className="font-serif font-bold text-imperial-red">{lang === 'EN' ? arch.name : arch.nameZh}</h3>
                  <p className="text-xs text-charcoal/60 line-clamp-2 mt-1">
                    {lang === 'EN' ? arch.description : arch.descriptionZh}
                  </p>
                  <Link 
                    to={`/detail/${arch.id}`}
                    className="mt-3 block text-center bg-imperial-red text-white text-[10px] font-bold py-2 rounded-lg uppercase tracking-wider"
                  >
                    {lang === 'EN' ? 'View Details' : '查看详情'}
                  </Link>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      {/* Side Info Panel */}
      <AnimatePresence>
        {showPanel && (
          <motion.div 
            initial={{ x: 400 }}
            animate={{ x: 0 }}
            exit={{ x: 400 }}
            className="absolute top-0 right-0 w-80 md:w-96 h-full bg-white/95 backdrop-blur-xl border-l border-imperial-red/10 z-[1000] shadow-2xl overflow-y-auto p-8"
          >
            <button 
              onClick={() => setShowPanel(false)}
              className="absolute top-4 right-4 text-charcoal/30 hover:text-imperial-red transition-colors"
            >
              <ArrowRight />
            </button>

            <div className="mb-12">
              <span className="text-imperial-gold text-[10px] font-bold tracking-[0.2em] uppercase block mb-2">{selectedCity.era}</span>
              <h1 className="text-4xl font-serif font-bold mb-4">{lang === 'EN' ? selectedCity.name : selectedCity.nameZh}</h1>
              <p className="text-sm text-charcoal/60 leading-relaxed mb-8">
                {lang === 'EN' ? selectedCity.description : selectedCity.descriptionZh}
              </p>
            </div>

            <div className="space-y-8">
               <h3 className="text-sm font-bold uppercase tracking-widest text-imperial-red border-b border-imperial-red/10 pb-2">
                 {lang === 'EN' ? 'Key Landmarks' : '核心地标'}
               </h3>
               {cityArchitectures.map((arch) => (
                 <Link key={arch.id} to={`/detail/${arch.id}`}>
                   <div className="group cursor-pointer flex gap-4 p-2 -mx-2 hover:bg-imperial-red/5 rounded-2xl transition-all mb-4">
                      <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 border border-imperial-red/5">
                        <img src={arch.image} className="w-full h-full object-cover transition-transform group-hover:scale-110" alt={arch.name} />
                      </div>
                      <div className="flex flex-col justify-center">
                        <h4 className="font-serif font-bold text-charcoal group-hover:text-imperial-red transition-colors">
                          {lang === 'EN' ? arch.name : arch.nameZh}
                        </h4>
                        <span className="text-[10px] text-charcoal/40 uppercase tracking-widest">{arch.type} • {arch.year}</span>
                        <div className="flex items-center gap-1 mt-1 text-[10px] text-imperial-gold font-bold">
                           <Info size={10} />
                           {lang === 'EN' ? 'Details' : '详情'}
                        </div>
                      </div>
                   </div>
                 </Link>
               ))}
            </div>

            <div className="mt-12 bg-charcoal text-white p-6 rounded-3xl">
               <div className="flex items-center gap-2 mb-4">
                 <Navigation size={18} className="text-imperial-gold" />
                 <h3 className="font-bold text-sm tracking-widest uppercase">
                   {lang === 'EN' ? 'One Day Tour' : '一日游推荐'}
                 </h3>
               </div>
               <div className="space-y-4">
                  {selectedCity.highlights.map((h, i) => (
                    <div key={i} className="flex gap-3 text-xs">
                      <span className="text-imperial-gold font-mono">0{i+1}</span>
                      <span className="opacity-80">{h}</span>
                    </div>
                  ))}
               </div>
               <button className="w-full mt-6 bg-imperial-red py-3 rounded-full text-[10px] font-bold uppercase tracking-widest hover:brightness-110 transition-all">
                  {lang === 'EN' ? 'Generate Route' : '生成路线规划'}
               </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!showPanel && (
        <button 
          onClick={() => setShowPanel(true)}
          className="absolute top-1/2 right-4 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-xl flex items-center justify-center text-imperial-red z-[1001] border border-imperial-red/10"
        >
          <MapPin />
        </button>
      )}
    </div>
  );
}
