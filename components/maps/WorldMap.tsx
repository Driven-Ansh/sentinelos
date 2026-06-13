'use client';

import { useEffect, useState } from 'react';
import { ComposableMap, Geographies, Geography, Marker, ZoomableGroup } from 'react-simple-maps';

const GEO_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json';

interface MapMarker {
  id: string;
  coordinates: [number, number];
  color: string;
  severity: string;
  label: string;
  pulse?: boolean;
}

interface WorldMapProps {
  markers?: MapMarker[];
  height?: number;
  zoom?: number;
  onMarkerClick?: (marker: MapMarker) => void;
}

export default function WorldMap({ markers = [], height = 360, zoom = 1, onMarkerClick }: WorldMapProps) {
  return (
    <div
      className="relative w-full overflow-hidden rounded-xl border border-slate-800"
      style={{ height, background: '#030912' }}
    >
      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(14,165,233,0.04) 0%, transparent 70%)',
        }}
      />

      <ComposableMap
        projection="geoNaturalEarth1"
        projectionConfig={{ scale: 160 }}
        width={800}
        height={height}
        style={{ width: '100%', height: '100%' }}
      >
        <ZoomableGroup zoom={zoom} center={[0, 0]}>
          <Geographies geography={GEO_URL}>
            {({ geographies }: { geographies: any[] }) =>
              geographies.map((geo: any) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill="rgba(14,165,233,0.07)"
                  stroke="rgba(14,165,233,0.18)"
                  strokeWidth={0.4}
                  style={{
                    default: { outline: 'none' },
                    hover: { fill: 'rgba(14,165,233,0.14)', outline: 'none' },
                    pressed: { outline: 'none' },
                  }}
                />
              ))
            }
          </Geographies>

          {/* Grid lines at equator and tropics */}
          {markers.map((marker) => (
            <Marker
              key={marker.id}
              coordinates={marker.coordinates}
              onClick={() => onMarkerClick?.(marker)}
            >
              {/* Outer pulse ring for critical */}
              {marker.pulse && (
                <circle r={10} fill="none" stroke={marker.color} strokeWidth={1} opacity={0.4}>
                  <animate attributeName="r" from="6" to="18" dur="2s" repeatCount="indefinite" />
                  <animate attributeName="opacity" from="0.6" to="0" dur="2s" repeatCount="indefinite" />
                </circle>
              )}
              {/* Secondary pulse */}
              {marker.pulse && (
                <circle r={10} fill="none" stroke={marker.color} strokeWidth={0.5} opacity={0.2}>
                  <animate attributeName="r" from="6" to="28" dur="2s" begin="0.5s" repeatCount="indefinite" />
                  <animate attributeName="opacity" from="0.4" to="0" dur="2s" begin="0.5s" repeatCount="indefinite" />
                </circle>
              )}
              {/* Core dot */}
              <circle
                r={marker.severity === 'critical' ? 5 : marker.severity === 'high' ? 4 : 3}
                fill={marker.color}
                fillOpacity={0.9}
                stroke="#fff"
                strokeWidth={0.5}
                style={{ cursor: 'pointer' }}
              />
            </Marker>
          ))}
        </ZoomableGroup>
      </ComposableMap>

      {/* Lat/lng overlay label */}
      <div
        className="absolute top-3 left-3 text-[9px] tracking-widest uppercase"
        style={{ color: 'rgba(14,165,233,0.4)', fontFamily: 'JetBrains Mono' }}
      >
        SentinelOS · Live Global Monitor
      </div>
    </div>
  );
}
