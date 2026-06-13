// ─── Real-Time Data Fetchers ────────────────────────────────────────────────
// Uses 100% free, no-auth-required public APIs

// ── USGS Earthquake API ──────────────────────────────────────────────────────
export interface EarthquakeEvent {
  id: string;
  magnitude: number;
  place: string;
  time: number;
  lat: number;
  lng: number;
  depth: number;
  url: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
}

export async function fetchEarthquakes(minMag = 4.0): Promise<EarthquakeEvent[]> {
  try {
    const res = await fetch(
      `https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson`,
      { next: { revalidate: 300 } }
    );
    const data = await res.json();
    return data.features.slice(0, 30).map((f: any) => {
      const mag = f.properties.mag;
      return {
        id: f.id,
        magnitude: mag,
        place: f.properties.place,
        time: f.properties.time,
        lat: f.geometry.coordinates[1],
        lng: f.geometry.coordinates[0],
        depth: f.geometry.coordinates[2],
        url: f.properties.url,
        severity: mag >= 6.5 ? 'critical' : mag >= 5.5 ? 'high' : mag >= 5.0 ? 'medium' : 'low',
      };
    });
  } catch {
    return [];
  }
}

// ── CoinGecko Free API (no key needed) ──────────────────────────────────────
export interface CryptoPrice {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  price_change_percentage_24h: number;
  market_cap: number;
  volume: number;
  sparkline: number[];
}

export async function fetchCryptoPrices(): Promise<CryptoPrice[]> {
  try {
    const res = await fetch(
      'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,ethereum,solana,binancecoin,ripple&order=market_cap_desc&sparkline=true&price_change_percentage=24h',
      { next: { revalidate: 60 } }
    );
    const data = await res.json();
    return data.map((c: any) => ({
      id: c.id,
      symbol: c.symbol.toUpperCase(),
      name: c.name,
      current_price: c.current_price,
      price_change_percentage_24h: c.price_change_percentage_24h,
      market_cap: c.market_cap,
      volume: c.total_volume,
      sparkline: c.sparkline_in_7d?.price?.slice(-24) || [],
    }));
  } catch {
    return [];
  }
}

// ── Exchange rates (open API) ────────────────────────────────────────────────
export interface ForexData {
  base: string;
  rates: Record<string, number>;
  timestamp: number;
}

export async function fetchForex(): Promise<ForexData | null> {
  try {
    const res = await fetch('https://open.er-api.com/v6/latest/USD', {
      next: { revalidate: 3600 },
    });
    const data = await res.json();
    return {
      base: 'USD',
      rates: data.rates,
      timestamp: data.time_last_update_unix,
    };
  } catch {
    return null;
  }
}

// ── arXiv API (AI + Security papers) ────────────────────────────────────────
export interface ArxivPaper {
  id: string;
  title: string;
  authors: string[];
  summary: string;
  published: string;
  category: string;
  link: string;
}

export async function fetchArxivPapers(query = 'AI+agent+safety+governance', max = 10): Promise<ArxivPaper[]> {
  try {
    const res = await fetch(
      `https://export.arxiv.org/api/query?search_query=all:${query}&start=0&max_results=${max}&sortBy=submittedDate&sortOrder=descending`,
      { next: { revalidate: 3600 } }
    );
    const text = await res.text();
    const parser = typeof DOMParser !== 'undefined' ? new DOMParser() : null;
    if (!parser) return [];

    const xml = parser.parseFromString(text, 'text/xml');
    const entries = Array.from(xml.querySelectorAll('entry'));

    return entries.map((entry) => ({
      id: entry.querySelector('id')?.textContent?.split('/').pop() || '',
      title: entry.querySelector('title')?.textContent?.trim().replace(/\s+/g, ' ') || '',
      authors: Array.from(entry.querySelectorAll('author name')).map(n => n.textContent || '').slice(0, 3),
      summary: entry.querySelector('summary')?.textContent?.trim().slice(0, 200) + '...' || '',
      published: entry.querySelector('published')?.textContent?.slice(0, 10) || '',
      category: entry.querySelector('category')?.getAttribute('term') || 'cs.AI',
      link: entry.querySelector('id')?.textContent || '',
    }));
  } catch {
    return [];
  }
}

// ── Open-Meteo weather API (no key needed) ───────────────────────────────────
export interface WeatherEvent {
  location: string;
  lat: number;
  lng: number;
  temperature: number;
  windspeed: number;
  weathercode: number;
  description: string;
  severity: string;
}

const monitoredCities = [
  { name: 'New York', lat: 40.71, lng: -74.01 },
  { name: 'London', lat: 51.51, lng: -0.13 },
  { name: 'Tokyo', lat: 35.69, lng: 139.69 },
  { name: 'Mumbai', lat: 19.08, lng: 72.88 },
  { name: 'Sydney', lat: -33.87, lng: 151.21 },
  { name: 'Dubai', lat: 25.20, lng: 55.27 },
  { name: 'São Paulo', lat: -23.55, lng: -46.63 },
  { name: 'Lagos', lat: 6.52, lng: 3.38 },
];

function weatherCodeToDescription(code: number): string {
  if (code === 0) return 'Clear sky';
  if (code <= 3) return 'Partly cloudy';
  if (code <= 9) return 'Fog';
  if (code <= 19) return 'Drizzle';
  if (code <= 29) return 'Rain';
  if (code <= 39) return 'Snow';
  if (code <= 49) return 'Freezing rain';
  if (code <= 59) return 'Rain showers';
  if (code <= 69) return 'Snow showers';
  if (code <= 79) return 'Thunderstorm';
  if (code <= 99) return 'Severe thunderstorm';
  return 'Unknown';
}

export async function fetchWeatherEvents(): Promise<WeatherEvent[]> {
  try {
    const results = await Promise.allSettled(
      monitoredCities.map(async (city) => {
        const res = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${city.lat}&longitude=${city.lng}&current_weather=true&hourly=windspeed_10m`,
          { next: { revalidate: 1800 } }
        );
        const data = await res.json();
        const cw = data.current_weather;
        const windspeed = cw.windspeed;
        const severity = windspeed > 80 ? 'critical' : windspeed > 50 ? 'high' : windspeed > 30 ? 'medium' : 'low';
        return {
          location: city.name,
          lat: city.lat,
          lng: city.lng,
          temperature: Math.round(cw.temperature),
          windspeed: Math.round(windspeed),
          weathercode: cw.weathercode,
          description: weatherCodeToDescription(cw.weathercode),
          severity,
        } as WeatherEvent;
      })
    );
    return results.filter((r): r is PromiseFulfilledResult<WeatherEvent> => r.status === 'fulfilled').map(r => r.value);
  } catch {
    return [];
  }
}

// ── Threat Intelligence (simulated from real IP ranges + patterns) ───────────
export interface LiveThreat {
  id: string;
  type: string;
  sourceIp: string;
  country: string;
  lat: number;
  lng: number;
  target: string;
  severity: 'critical' | 'high' | 'medium';
  blocked: boolean;
  timestamp: string;
  vector: string;
}

const threatSources = [
  { country: 'Unknown (TOR)', lat: 48.86, lng: 2.35 },
  { country: 'Netherlands', lat: 52.37, lng: 4.9 },
  { country: 'Russia', lat: 55.75, lng: 37.62 },
  { country: 'China', lat: 39.91, lng: 116.39 },
  { country: 'Brazil', lat: -23.55, lng: -46.63 },
  { country: 'India', lat: 28.6, lng: 77.21 },
  { country: 'USA', lat: 37.77, lng: -122.42 },
  { country: 'Germany', lat: 52.52, lng: 13.41 },
  { country: 'Singapore', lat: 1.35, lng: 103.82 },
  { country: 'Ukraine', lat: 50.45, lng: 30.52 },
];

const threatTypes = [
  { type: 'Prompt Injection', vector: 'LLM API endpoint' },
  { type: 'Brute Force', vector: 'Authentication service' },
  { type: 'SQL Injection', vector: 'Database connector' },
  { type: 'Permission Escalation', vector: 'Agent runtime' },
  { type: 'Data Exfiltration', vector: 'Network egress' },
  { type: 'XSS Attempt', vector: 'Web interface' },
  { type: 'API Key Theft', vector: 'Config endpoint' },
  { type: 'Model Inversion', vector: 'Inference API' },
];

function randomIp(prefix: string) {
  return `${prefix}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`;
}

export function generateLiveThreat(): LiveThreat {
  const src = threatSources[Math.floor(Math.random() * threatSources.length)];
  const th = threatTypes[Math.floor(Math.random() * threatTypes.length)];
  const severity = Math.random() < 0.15 ? 'critical' : Math.random() < 0.4 ? 'high' : 'medium';
  const prefixes = ['185.220', '45.142', '91.108', '103.75', '198.54'];
  return {
    id: `thr-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
    type: th.type,
    sourceIp: randomIp(prefixes[Math.floor(Math.random() * prefixes.length)]),
    country: src.country,
    lat: src.lat + (Math.random() - 0.5) * 2,
    lng: src.lng + (Math.random() - 0.5) * 2,
    target: ['Certification Engine', 'Agent Runtime', 'Permission Firewall', 'Auth Service', 'Data Layer'][Math.floor(Math.random() * 5)],
    severity,
    blocked: Math.random() > 0.08,
    timestamp: new Date().toISOString(),
    vector: th.vector,
  };
}
