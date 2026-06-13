'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, AlertTriangle, Waves, Wind, Flame, Activity, Clock, MapPin, Radio, RefreshCw } from 'lucide-react';
import { ComposableMap, Geographies, Geography, Marker, ZoomableGroup } from 'react-simple-maps';
import { fetchEarthquakes, fetchWeatherEvents, type EarthquakeEvent, type WeatherEvent } from '@/lib/realtime';
import { pageTransition } from '@/lib/animations';

const GEO_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json';

const severityConfig = {
  critical: { color: '#EF4444', bg: 'bg-red-400/10 border-red-400/20', textColor: 'text-red-400' },
  high: { color: '#F97316', bg: 'bg-orange-400/10 border-orange-400/20', textColor: 'text-orange-400' },
  medium: { color: '#F59E0B', bg: 'bg-yellow-400/10 border-yellow-400/20', textColor: 'text-yellow-400' },
  low: { color: '#0EA5E9', bg: 'bg-sky-400/10 border-sky-400/20', textColor: 'text-sky-400' },
};

interface MapEvent {
  id: string;
  lat: number;
  lng: number;
  label: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  type: string;
  color: string;
}

function DisasterWorldMap({ events }: { events: MapEvent[] }) {
  const [tooltip, setTooltip] = useState<{ event: MapEvent; x: number; y: number } | null>(null);

  return (
    <div className="relative w-full rounded-xl border border-slate-800 overflow-hidden" style={{ height: 400, background: '#030912' }}>
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(14,165,233,0.05) 0%, transparent 70%)',
      }} />

      <ComposableMap
        projection="geoNaturalEarth1"
        projectionConfig={{ scale: 155, center: [0, 15] }}
        width={900}
        height={420}
        style={{ width: '100%', height: '100%' }}
      >
        <ZoomableGroup zoom={1}>
          <Geographies geography={GEO_URL}>
            {({ geographies }: { geographies: any[] }) =>
              geographies.map((geo: any) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill="rgba(14,165,233,0.07)"
                  stroke="rgba(14,165,233,0.2)"
                  strokeWidth={0.4}
                  style={{
                    default: { outline: 'none' },
                    hover: { fill: 'rgba(14,165,233,0.12)', outline: 'none' },
                    pressed: { outline: 'none' },
                  }}
                />
              ))
            }
          </Geographies>

          {events.map((ev) => {
            const cfg = severityConfig[ev.severity];
            const r = ev.severity === 'critical' ? 6 : ev.severity === 'high' ? 5 : 4;
            return (
              <Marker
                key={ev.id}
                coordinates={[ev.lng, ev.lat]}
                onMouseEnter={(e: any) => setTooltip({ event: ev, x: e.clientX, y: e.clientY })}
                onMouseLeave={() => setTooltip(null)}
              >
                {/* Pulse rings for critical/high */}
                {(ev.severity === 'critical' || ev.severity === 'high') && (
                  <>
                    <circle r={r} fill="none" stroke={cfg.color} strokeWidth={1} opacity={0.5}>
                      <animate attributeName="r" values={`${r};${r * 3.5}`} dur="2s" repeatCount="indefinite" />
                      <animate attributeName="opacity" values="0.6;0" dur="2s" repeatCount="indefinite" />
                    </circle>
                    <circle r={r} fill="none" stroke={cfg.color} strokeWidth={0.5} opacity={0.3}>
                      <animate attributeName="r" values={`${r};${r * 5}`} dur="2s" begin="0.6s" repeatCount="indefinite" />
                      <animate attributeName="opacity" values="0.4;0" dur="2s" begin="0.6s" repeatCount="indefinite" />
                    </circle>
                  </>
                )}
                <circle
                  r={r}
                  fill={cfg.color}
                  fillOpacity={0.9}
                  stroke="rgba(255,255,255,0.4)"
                  strokeWidth={0.5}
                  style={{ cursor: 'pointer' }}
                />
              </Marker>
            );
          })}
        </ZoomableGroup>
      </ComposableMap>

      {/* Tooltip */}
      {tooltip && (
        <div
          className="absolute pointer-events-none z-20 bg-[#0D1117] border border-slate-700 rounded-xl p-3 shadow-2xl"
          style={{ left: Math.min(tooltip.x - 200, 680), top: 8, maxWidth: 240 }}
        >
          <div className="flex items-center gap-2 mb-1.5">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: severityConfig[tooltip.event.severity].color }} />
            <span className="text-xs font-bold text-white capitalize">{tooltip.event.type}</span>
            <span className={`text-[10px] font-bold ml-auto ${severityConfig[tooltip.event.severity].textColor}`}>
              {tooltip.event.severity.toUpperCase()}
            </span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">{tooltip.event.label}</p>
        </div>
      )}

      {/* Legend */}
      <div className="absolute bottom-3 left-3 flex items-center gap-3">
        {Object.entries(severityConfig).map(([k, v]) => (
          <div key={k} className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: v.color }} />
            <span className="text-[9px] text-slate-500 capitalize">{k}</span>
          </div>
        ))}
      </div>

      {/* HUD top left */}
      <div className="absolute top-3 left-3 space-y-0.5" style={{ fontFamily: 'JetBrains Mono' }}>
        <div className="text-[9px] text-slate-600 tracking-widest">SENTINEL DISASTER INTELLIGENCE</div>
        <div className="flex items-center gap-1.5 text-[9px] text-red-400">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
          LIVE · USGS + OPEN-METEO
        </div>
      </div>
    </div>
  );
}

export default function DisasterAgentPage() {
  const [earthquakes, setEarthquakes] = useState<EarthquakeEvent[]>([]);
  const [weather, setWeather] = useState<WeatherEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [activeTab, setActiveTab] = useState<'map' | 'earthquakes' | 'weather'>('map');

  const loadData = async () => {
    setLoading(true);
    const [eq, wx] = await Promise.all([fetchEarthquakes(), fetchWeatherEvents()]);
    setEarthquakes(eq);
    setWeather(wx);
    setLastUpdated(new Date());
    setLoading(false);
  };

  useEffect(() => {
    loadData();
    const interval = setInterval(loadData, 5 * 60 * 1000); // refresh every 5 min
    return () => clearInterval(interval);
  }, []);

  // Combine all events for the map
  const mapEvents: MapEvent[] = [
    ...earthquakes.map(eq => ({
      id: eq.id,
      lat: eq.lat,
      lng: eq.lng,
      label: `M${eq.magnitude.toFixed(1)} — ${eq.place}`,
      severity: eq.severity,
      type: 'earthquake',
      color: severityConfig[eq.severity].color,
    })),
    ...weather
      .filter(w => w.severity !== 'low')
      .map(w => ({
        id: `wx-${w.location}`,
        lat: w.lat,
        lng: w.lng,
        label: `${w.description} · ${w.windspeed} km/h · ${w.temperature}°C — ${w.location}`,
        severity: w.severity as 'critical' | 'high' | 'medium' | 'low',
        type: 'weather',
        color: '#8B5CF6',
      })),
  ];

  const criticalCount = mapEvents.filter(e => e.severity === 'critical').length;
  const highCount = mapEvents.filter(e => e.severity === 'high').length;

  return (
    <motion.div variants={pageTransition} initial="hidden" animate="visible" className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl text-3xl flex items-center justify-center" style={{ backgroundColor: '#0EA5E912', border: '1px solid #0EA5E925' }}>
            🌐
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white" style={{ fontFamily: 'Space Grotesk' }}>
              Disaster Intelligence Agent
            </h1>
            <p className="text-sm text-slate-400 mt-0.5">Real-time global disaster monitoring via USGS + Open-Meteo APIs</p>
            <div className="flex items-center gap-3 mt-2">
              <span className="sentinel-badge text-cyan-300 bg-cyan-300/10 border-cyan-300/30">SOVEREIGN</span>
              <span className="text-xs text-emerald-400">● Live Data</span>
              {lastUpdated && (
                <span className="text-xs text-slate-500">Updated {lastUpdated.toLocaleTimeString()}</span>
              )}
            </div>
          </div>
        </div>
        <button
          onClick={loadData}
          disabled={loading}
          className="flex items-center gap-2 px-3 py-2 border border-slate-700 rounded-lg text-slate-400 hover:text-white text-sm transition-colors disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          {loading ? 'Fetching...' : 'Refresh'}
        </button>
      </div>

      {/* Live stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Earthquakes (7d)', value: loading ? '—' : earthquakes.length.toString(), color: '#F59E0B' },
          { label: 'Critical Events', value: loading ? '—' : criticalCount.toString(), color: '#EF4444' },
          { label: 'High Severity', value: loading ? '—' : highCount.toString(), color: '#F97316' },
          { label: 'Cities Monitored', value: '8', color: '#10B981' },
        ].map(s => (
          <div key={s.label} className="sentinel-card p-4">
            <div className="text-xl font-bold mb-1" style={{ color: s.color, fontFamily: 'Space Grotesk' }}>
              {s.value}
            </div>
            <div className="text-xs text-slate-500">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Source badge */}
      <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl border border-sky-500/20 bg-sky-500/5 text-xs text-sky-400">
        <Globe className="w-4 h-4 flex-shrink-0" />
        <span>
          <strong>Live data sources:</strong> USGS Earthquake Hazards Program (real-time M4.5+ global earthquakes) &
          Open-Meteo (weather conditions for 8 major cities) — updated every 5 minutes
        </span>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2">
        {(['map', 'earthquakes', 'weather'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-2 rounded-lg text-sm font-medium capitalize transition-all ${
              activeTab === tab ? 'bg-sky-500/15 text-sky-400 border border-sky-500/30' : 'text-slate-500 border border-slate-800 hover:text-slate-300'
            }`}
          >
            {tab === 'map' ? 'Live Global Map' : tab === 'earthquakes' ? `Earthquakes (${earthquakes.length})` : 'Weather Events'}
          </button>
        ))}
      </div>

      {/* Map tab */}
      {activeTab === 'map' && (
        <div className="sentinel-card p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-white" style={{ fontFamily: 'Space Grotesk' }}>
              Real-Time Disaster Map
            </h3>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span>● Earthquakes</span>
              <span style={{ color: '#8B5CF6' }}>● Weather</span>
            </div>
          </div>
          {loading ? (
            <div className="flex items-center justify-center h-80 text-slate-500">
              <RefreshCw className="w-6 h-6 animate-spin mr-2" />
              Fetching live data...
            </div>
          ) : (
            <DisasterWorldMap events={mapEvents} />
          )}
        </div>
      )}

      {/* Earthquake tab */}
      {activeTab === 'earthquakes' && (
        <div className="space-y-3">
          {loading ? (
            <div className="sentinel-card p-8 flex items-center justify-center text-slate-500">
              <RefreshCw className="w-5 h-5 animate-spin mr-2" /> Loading USGS data...
            </div>
          ) : earthquakes.length === 0 ? (
            <div className="sentinel-card p-8 text-center text-slate-500">No earthquake data available</div>
          ) : (
            earthquakes.map(eq => {
              const cfg = severityConfig[eq.severity];
              return (
                <div key={eq.id} className="sentinel-card p-5">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center font-bold text-sm flex-shrink-0"
                      style={{ backgroundColor: `${cfg.color}15`, border: `1px solid ${cfg.color}25`, color: cfg.color }}>
                      M{eq.magnitude.toFixed(1)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <span className={`sentinel-badge ${cfg.bg} ${cfg.textColor}`}>{eq.severity}</span>
                        <span className="text-sm font-medium text-white">{eq.place}</span>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-slate-500 mt-1">
                        <span>Depth: {eq.depth.toFixed(1)} km</span>
                        <span>Lat: {eq.lat.toFixed(2)}°, Lng: {eq.lng.toFixed(2)}°</span>
                      </div>
                    </div>
                    <div className="text-right text-xs text-slate-600 flex-shrink-0">
                      {new Date(eq.time).toLocaleString()}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}

      {/* Weather tab */}
      {activeTab === 'weather' && (
        <div className="grid md:grid-cols-2 gap-4">
          {loading ? (
            <div className="col-span-2 sentinel-card p-8 flex items-center justify-center text-slate-500">
              <RefreshCw className="w-5 h-5 animate-spin mr-2" /> Loading weather data...
            </div>
          ) : (
            weather.map(w => {
              const cfg = severityConfig[w.severity as keyof typeof severityConfig] || severityConfig.low;
              return (
                <div key={w.location} className="sentinel-card p-5">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-slate-500" />
                      <span className="font-semibold text-white" style={{ fontFamily: 'Space Grotesk' }}>{w.location}</span>
                    </div>
                    <span className={`sentinel-badge ${cfg.bg} ${cfg.textColor} text-[10px]`}>{w.severity}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="text-center">
                      <div className="text-xl font-bold text-white">{w.temperature}°C</div>
                      <div className="text-[10px] text-slate-500">Temperature</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xl font-bold text-white">{w.windspeed}</div>
                      <div className="text-[10px] text-slate-500">Wind km/h</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm font-medium text-slate-300">{w.description}</div>
                      <div className="text-[10px] text-slate-500">Condition</div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}
    </motion.div>
  );
}
