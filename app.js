"use strict";

/* ============================================================
   UK Innovation Map — app.js
   ============================================================ */

// ─────────────────────────────────────────────────────────────
// DATA: Combined Authorities
// ─────────────────────────────────────────────────────────────
const COMBINED_AUTHORITIES = {
  "Greater Manchester": {
    color: "#E8965A",
    mayor: "Andy Burnham", party: "Labour", mayorSince: "2017",
    website: "https://www.greatermanchester-ca.gov.uk",
    initiatives: ["Greater Manchester Investment Zone — advanced manufacturing","Atom Valley science park (Rochdale/Bury)","Digital & tech sector growth strategy"]
  },
  "West Midlands": {
    color: "#9B59B6",
    mayor: "Richard Parker", party: "Labour", mayorSince: "2024",
    website: "https://www.wmca.org.uk",
    initiatives: ["West Midlands Investment Zone","Commonwealth Games legacy — infrastructure & skills","Hydrogen economy strategy"]
  },
  "West Yorkshire": {
    color: "#3498DB",
    mayor: "Tracy Brabin", party: "Labour", mayorSince: "2021",
    website: "https://www.westyorks-ca.gov.uk",
    initiatives: ["West Yorkshire Investment Fund (£150m)","Trailblazer devolution deal — transport & planning","Advanced manufacturing and digital focus"]
  },
  "South Yorkshire": {
    color: "#27AE60",
    mayor: "Oliver Coppard", party: "Labour", mayorSince: "2022",
    website: "https://www.southyorkshire-ca.gov.uk",
    initiatives: ["AMRC — advanced manufacturing R&D hub","South Yorkshire Investment Zone","Flourishing Places growth strategy"]
  },
  "Liverpool City Region": {
    color: "#E74C3C",
    mayor: "Steve Rotheram", party: "Labour", mayorSince: "2017",
    website: "https://www.liverpoolcityregion-ca.gov.uk",
    initiatives: ["Liverpool Innovation and Technology Economy (LITE)","Mersey Tidal Power project","Port logistics and clean energy cluster"]
  },
  "North East": {
    color: "#1ABC9C",
    mayor: "Kim McGuinness", party: "Labour", mayorSince: "2024",
    website: "https://www.northeast-ca.gov.uk",
    initiatives: ["Advanced manufacturing and automotive (Nissan)","North Sea offshore wind supply chain","CPI process innovation network"]
  },
  "Greater London": {
    color: "#F39C12",
    mayor: "Sadiq Khan", party: "Labour", mayorSince: "2016",
    website: "https://www.london.gov.uk",
    initiatives: ["London Growth Plan — tech, life sciences, finance","East Bank cultural & innovation quarter (Stratford)","MedCity life sciences cluster"]
  },
  "Tees Valley": {
    color: "#2980B9",
    mayor: "Ben Houchen", party: "Conservative", mayorSince: "2017",
    website: "https://www.teesvalley-ca.gov.uk",
    initiatives: ["Teesworks Freeport — largest brownfield site in UK","Net Zero Industry Valley — hydrogen & CCUS","Offshore wind manufacturing cluster"]
  },
  "York and North Yorkshire": {
    color: "#8E44AD",
    mayor: "David Skaith", party: "Labour", mayorSince: "2024",
    website: "https://www.yorknorthyorkshire-ca.gov.uk",
    initiatives: ["Net zero agriculture pilot programme","Rural innovation and tourism economy","National Railway Museum rail engineering cluster"]
  },
  "East Midlands": {
    color: "#D35400",
    mayor: "Claire Ward", party: "Labour", mayorSince: "2024",
    website: "https://www.eastmidlands-ca.gov.uk",
    initiatives: ["Advanced Manufacturing Investment Zone","East Midlands Freeport (EMA airport area)","Rolls-Royce and GKN aerospace cluster"]
  },
  "Greater Lincolnshire": {
    color: "#16A085",
    mayor: "Dame Andrea Jenkyns", party: "Conservative", mayorSince: "2025",
    website: "https://www.lincolnshire.gov.uk",
    initiatives: ["Humber Freeport — energy estuary","Agri-tech innovation cluster","Defence technology corridor"]
  },
  "Hull and East Yorkshire": {
    color: "#C0392B",
    mayor: "Luke Campbell", party: "Labour", mayorSince: "2024",
    website: "https://www.hyca.gov.uk",
    initiatives: ["Humber zero-carbon energy hub","Siemens Gamesa offshore wind blade factory","Digital health innovation (Hull)"]
  },
  "Cambridgeshire and Peterborough": {
    color: "#2C3E50",
    mayor: "Dr Nik Johnson", party: "Labour", mayorSince: "2021",
    website: "https://www.cambridgeshirepeterborough-ca.gov.uk",
    initiatives: ["Cambridge tech and life sciences cluster","Oxford-Cambridge Arc alignment","Peterborough industrial renaissance"]
  },
  "West of England": {
    color: "#7F8C8D",
    mayor: "Dan Norris", party: "Labour", mayorSince: "2024",
    website: "https://www.westofengland-ca.gov.uk",
    initiatives: ["Aerospace and advanced engineering (Airbus, Rolls-Royce)","National Composites Centre","Temple Quarter innovation district, Bristol"]
  }
};

// ─────────────────────────────────────────────────────────────
// DATA: LIPF Areas
// ─────────────────────────────────────────────────────────────
const LIPF_AREAS = {
  "Greater Manchester (LIPF \u00a350m)":    { strand: "earmarked_50", caMatch: "Greater Manchester" },
  "West Midlands (LIPF \u00a350m)":         { strand: "earmarked_50", caMatch: "West Midlands" },
  "Glasgow City Region (LIPF \u00a350m)":   { strand: "earmarked_50", caMatch: null },
  "South Yorkshire (LIPF \u00a330m)":       { strand: "earmarked_30", caMatch: "South Yorkshire" },
  "West Yorkshire (LIPF \u00a330m)":        { strand: "earmarked_30", caMatch: "West Yorkshire" },
  "Liverpool City Region (LIPF \u00a330m)": { strand: "earmarked_30", caMatch: "Liverpool City Region" },
  "North East (LIPF \u00a330m)":            { strand: "earmarked_30", caMatch: "North East" },
  "Greater London (LIPF \u00a330m)":        { strand: "earmarked_30", caMatch: "Greater London" },
  "Cardiff Capital Region (LIPF \u00a330m)":{ strand: "earmarked_30", caMatch: null },
  "East Midlands":                      { strand: "competed", theme: "Advanced manufacturing & clean energy", caMatch: "East Midlands" },
  "Hull & East Yorkshire / Tees Valley":{ strand: "competed", theme: "Clean energy & industrial decarbonisation", award: "\u00a330m combined", caMatch: ["Hull and East Yorkshire", "Tees Valley"] },
  "Greater Lincolnshire":               { strand: "competed", theme: "Agri-tech & defence", caMatch: "Greater Lincolnshire" },
  "Great South West":                   { strand: "competed", theme: "Autonomous technology", note: "Not a CA \u2014 Plymouth, Devon, Cornwall, Somerset, Dorset", caMatch: null },
  "Oxford-Cambridge Growth Corridor":   { strand: "competed", theme: "Autonomous vehicles, engineering & space", note: "Not a CA \u2014 Beds, Bucks, MK, Northants", caMatch: null },
  "South West Wales":                   { strand: "competed", theme: "Energy & materials security", caMatch: null },
  "Tay Cities Region":                  { strand: "competed", theme: "Creative technologies", caMatch: null }
};

// ─────────────────────────────────────────────────────────────
// DATA: Planned CAs
// ─────────────────────────────────────────────────────────────
const PLANNED_CAS = {
  "Hampshire & Solent":    { status: "Mayor target May 2026", codes: ["E10000014","E06000044","E06000045","E06000046"] },
  "Norfolk & Suffolk":     { status: "Mayor target May 2026", codes: ["E10000020","E10000029"] },
  "Greater Essex":         { status: "Mayor target May 2026", codes: ["E10000012"] },
  "Sussex & Brighton":     { status: "Mayor target May 2026", codes: ["E10000030","E06000043","E10000032"] },
  "Cheshire & Warrington": { status: "Mayor target 2027",     codes: ["E06000049","E06000050","E06000051"] },
  "Cumbria":               { status: "Mayor target 2027",     codes: ["E06000063","E06000064"] }
};

// ─────────────────────────────────────────────────────────────
// DATA: Non-CA LIPF geographic circles
// ─────────────────────────────────────────────────────────────
const LIPF_GEO_CIRCLES = {
  "Glasgow City Region (LIPF \u00a350m)":   { lat: 55.86, lng: -4.25, radiusDeg: 0.38, strand: "earmarked_50", note: "Scotland \u2014 Glasgow City Region partnership" },
  "Cardiff Capital Region (LIPF \u00a330m)": { lat: 51.50, lng: -3.20, radiusDeg: 0.35, strand: "earmarked_30", note: "Wales \u2014 Cardiff Capital Region" },
  "Great South West":                   { lat: 50.75, lng: -3.75, radiusDeg: 1.10, strand: "competed", theme: "Autonomous technology", note: "Not a CA \u2014 Plymouth, Devon, Cornwall, Somerset, Dorset" },
  "Oxford-Cambridge Growth Corridor":   { lat: 52.05, lng: -0.75, radiusDeg: 0.78, strand: "competed", theme: "Autonomous vehicles, engineering & space", note: "Not a CA \u2014 Beds, Bucks, MK, Northants" },
  "South West Wales":                   { lat: 51.80, lng: -4.05, radiusDeg: 0.52, strand: "competed", theme: "Energy & materials security", note: "Wales" },
  "Tay Cities Region":                  { lat: 56.46, lng: -3.01, radiusDeg: 0.30, strand: "competed", theme: "Creative technologies", note: "Scotland" }
};

// ─────────────────────────────────────────────────────────────
// DATA: Innovation Assets
// ─────────────────────────────────────────────────────────────
const INNOVATION_ASSETS = [
  // Catapult HQs / major centres
  { name: "Connected Places Catapult", type: "catapult", org: "CPC", lat: 51.505, lng: -0.091, city: "London", url: "https://cp.catapult.org.uk" },
  { name: "Digital Catapult", type: "catapult", org: "Digital", lat: 51.531, lng: -0.123, city: "London", url: "https://www.digicatapult.org.uk" },
  { name: "Cell & Gene Therapy Catapult", type: "catapult", org: "CGT", lat: 51.501, lng: -0.087, city: "London (Guy's Hospital)", url: "https://www.catapultcgt.org.uk" },
  { name: "Cell & Gene Therapy Catapult", type: "catapult", org: "CGT", lat: 51.913, lng: -0.199, city: "Stevenage", url: "https://www.catapultcgt.org.uk" },
  { name: "Medicines Discovery Catapult", type: "catapult", org: "MDC", lat: 53.324, lng: -2.182, city: "Alderley Park", url: "https://www.md.catapult.org.uk" },
  { name: "HVM Catapult \u2014 AMRC", type: "catapult", org: "AMRC", lat: 53.383, lng: -1.363, city: "Rotherham / Sheffield", url: "https://www.amrc.co.uk" },
  { name: "HVM Catapult \u2014 MTC", type: "catapult", org: "MTC", lat: 52.444, lng: -1.469, city: "Coventry", url: "https://www.the-mtc.org" },
  { name: "HVM Catapult \u2014 WMG", type: "catapult", org: "WMG", lat: 52.381, lng: -1.561, city: "Warwick", url: "https://warwick.ac.uk/fac/sci/wmg" },
  { name: "HVM Catapult \u2014 NCC", type: "catapult", org: "NCC", lat: 51.483, lng: -2.567, city: "Bristol", url: "https://www.nccuk.com" },
  { name: "HVM Catapult \u2014 CPI", type: "catapult", org: "CPI", lat: 54.572, lng: -1.152, city: "Redcar (HQ)", url: "https://www.uk-cpi.com" },
  { name: "Offshore Renewable Energy Catapult", type: "catapult", org: "OREC", lat: 55.858, lng: -4.259, city: "Glasgow", url: "https://ore.catapult.org.uk" },
  { name: "Offshore Renewable Energy Catapult", type: "catapult", org: "OREC", lat: 55.127, lng: -1.514, city: "Blyth", url: "https://ore.catapult.org.uk" },
  { name: "Satellite Applications Catapult", type: "catapult", org: "SAC", lat: 51.570, lng: -1.302, city: "Harwell", url: "https://sa.catapult.org.uk" },
  { name: "Compound Semiconductor Applications Catapult", type: "catapult", org: "CSAC", lat: 51.499, lng: -3.172, city: "Newport", url: "https://csa.catapult.org.uk" },
  { name: "Energy Systems Catapult", type: "catapult", org: "ESC", lat: 52.481, lng: -1.899, city: "Birmingham", url: "https://es.catapult.org.uk" },
  { name: "Future Flight Challenge (BEIS/UKRI)", type: "catapult", org: "FFC", lat: 52.454, lng: -1.748, city: "Coventry (base)", url: "https://www.ukri.org/our-work/our-main-funds-and-programmes/industrial-strategy-challenge-fund/future-of-mobility/future-flight-challenge/" },
  // Innovation districts
  { name: "Manchester Innovation District", type: "innovation_district", lat: 53.466, lng: -2.234, city: "Manchester", url: "https://www.manchesterid.co.uk" },
  { name: "Glasgow City Innovation District", type: "innovation_district", lat: 55.862, lng: -4.248, city: "Glasgow", url: "https://glasgowcityinnovationdistrict.com" },
  { name: "Newcastle Helix", type: "innovation_district", lat: 54.974, lng: -1.624, city: "Newcastle", url: "https://newcastlehelix.com" },
  { name: "West Tech Cluster / Innovation Birmingham", type: "innovation_district", lat: 52.487, lng: -1.888, city: "Birmingham", url: "https://www.innovateuk.org" },
  { name: "Cambridge Science Park", type: "innovation_district", lat: 52.238, lng: 0.148, city: "Cambridge", url: "https://www.cambridgesciencepark.co.uk" },
  { name: "Oxford Science Park", type: "innovation_district", lat: 51.718, lng: -1.210, city: "Oxford", url: "https://www.oxfordsp.com" },
  { name: "Harwell Science & Innovation Campus", type: "innovation_district", lat: 51.570, lng: -1.302, city: "Harwell", url: "https://www.harwell.org.uk" },
  { name: "Alderley Park", type: "innovation_district", lat: 53.324, lng: -2.182, city: "Macclesfield", url: "https://www.alderleypark.co.uk" },
  { name: "Knowledge Quarter Liverpool", type: "innovation_district", lat: 53.408, lng: -2.969, city: "Liverpool", url: "https://www.kqliverpool.co.uk" },
  { name: "Leeds Innovation District", type: "innovation_district", lat: 53.804, lng: -1.552, city: "Leeds", url: "https://www.leedsinnovationdistrict.co.uk" },
  { name: "Bristol & Bath Science Park", type: "innovation_district", lat: 51.440, lng: -2.513, city: "Bristol", url: "https://www.bbsp.co.uk" },
  { name: "Tees Valley Advanced Manufacturing Park", type: "innovation_district", lat: 54.572, lng: -1.200, city: "Tees Valley", url: "https://www.teesvalley-ca.gov.uk" },
  // Universities (top by research income)
  { name: "University of Manchester", type: "university", lat: 53.468, lng: -2.233, city: "Manchester", researchIncome: "\u00a3664m" },
  { name: "UCL", type: "university", lat: 51.524, lng: -0.134, city: "London", researchIncome: "\u00a3760m" },
  { name: "University of Oxford", type: "university", lat: 51.755, lng: -1.254, city: "Oxford", researchIncome: "\u00a3741m" },
  { name: "University of Cambridge", type: "university", lat: 52.204, lng: 0.115, city: "Cambridge", researchIncome: "\u00a3689m" },
  { name: "Imperial College London", type: "university", lat: 51.499, lng: -0.175, city: "London", researchIncome: "\u00a3567m" },
  { name: "King's College London", type: "university", lat: 51.512, lng: -0.116, city: "London", researchIncome: "\u00a3318m" },
  { name: "University of Birmingham", type: "university", lat: 52.451, lng: -1.930, city: "Birmingham", researchIncome: "\u00a3318m" },
  { name: "University of Leeds", type: "university", lat: 53.807, lng: -1.554, city: "Leeds", researchIncome: "\u00a3275m" },
  { name: "University of Sheffield", type: "university", lat: 53.381, lng: -1.488, city: "Sheffield", researchIncome: "\u00a3234m" },
  { name: "University of Liverpool", type: "university", lat: 53.407, lng: -2.963, city: "Liverpool", researchIncome: "\u00a3230m" },
  { name: "Newcastle University", type: "university", lat: 54.980, lng: -1.614, city: "Newcastle", researchIncome: "\u00a3208m" },
  { name: "University of Bristol", type: "university", lat: 51.458, lng: -2.603, city: "Bristol", researchIncome: "\u00a3283m" },
  { name: "University of Edinburgh", type: "university", lat: 55.945, lng: -3.189, city: "Edinburgh", researchIncome: "\u00a3502m" },
  { name: "University of Glasgow", type: "university", lat: 55.872, lng: -4.288, city: "Glasgow", researchIncome: "\u00a3344m" },
  { name: "University of Nottingham", type: "university", lat: 52.939, lng: -1.197, city: "Nottingham", researchIncome: "\u00a3239m" },
  { name: "University of Warwick", type: "university", lat: 52.381, lng: -1.561, city: "Coventry", researchIncome: "\u00a3220m" },
  { name: "Queen Mary University of London", type: "university", lat: 51.524, lng: -0.041, city: "London", researchIncome: "\u00a3175m" },
  { name: "University of Southampton", type: "university", lat: 50.934, lng: -1.396, city: "Southampton", researchIncome: "\u00a3244m" },
  { name: "Cardiff University", type: "university", lat: 51.487, lng: -3.179, city: "Cardiff", researchIncome: "\u00a3212m" },
  { name: "Durham University", type: "university", lat: 54.768, lng: -1.573, city: "Durham", researchIncome: "\u00a3112m" },
  { name: "University of Exeter", type: "university", lat: 50.737, lng: -3.531, city: "Exeter", researchIncome: "\u00a3121m" },
  { name: "University of York", type: "university", lat: 53.945, lng: -1.052, city: "York", researchIncome: "\u00a3100m" }
];

// ─────────────────────────────────────────────────────────────
// CONFIG
// ─────────────────────────────────────────────────────────────
const LIPF_COLORS = { earmarked_50: "#BA7517", earmarked_30: "#0F6E56", competed: "#D85A30" };
const LIPF_LABELS = { earmarked_50: "LIPF Earmarked \u2014 \u00a350m", earmarked_30: "LIPF Earmarked \u2014 \u00a330m", competed: "LIPF Competed (announced Apr 2026)" };
const ASSET_COLORS = { catapult: "#BA7517", innovation_district: "#0F6E56", university: "#1B4F9E" };
const ASSET_LABELS = { catapult: "Catapult centre", innovation_district: "Innovation district", university: "University" };

// UK bounding box for initial projection fit
const UK_BBOX = {
  type: "Feature",
  geometry: { type: "Polygon", coordinates: [[[-8.2,49.5],[2.0,49.5],[2.0,61.0],[-8.2,61.0],[-8.2,49.5]]] },
  properties: {}
};

// ONS GeoJSON APIs — &resultRecordCount=500 ensures we get all features
const ONS = "https://services1.arcgis.com/ESMARspQHYMw9BZ9/arcgis/rest/services";
const API = {
  countries: ONS+"/Countries_December_2023_GB_BUC/FeatureServer/0/query?where=1%3D1&outFields=CTRY23NM&outSR=4326&f=geojson&resultRecordCount=10",
  // Try without trailing year suffix; fall back to _2022 variant
  cas:       ONS+"/Combined_Authorities_December_2023_EN_BUC/FeatureServer/0/query?where=1%3D1&outFields=CAUTH23CD%2CCAUTH23NM&outSR=4326&f=geojson&resultRecordCount=500",
  cas_alt:   ONS+"/Combined_Authorities_December_2023_EN_BUC_2022/FeatureServer/0/query?where=1%3D1&outFields=CAUTH23CD%2CCAUTH23NM&outSR=4326&f=geojson&resultRecordCount=500",
  counties:  ONS+"/Counties_and_Unitary_Authorities_April_2023_EN_BUC/FeatureServer/0/query?where=1%3D1&outFields=CTYUA23CD%2CCTYUA23NM&outSR=4326&f=geojson&resultRecordCount=500"
};

// ─────────────────────────────────────────────────────────────
// STATE
// ─────────────────────────────────────────────────────────────
let svg, projection, pathGen, zoomGroup, currentK = 1;

// Layer toggle state (mirrors checkbox defaults)
const LAYER_VISIBLE = {
  ca: true, lipf: true, planned: false, catapult: true, districts: true, universities: false
};

// ─────────────────────────────────────────────────────────────
// UTILITIES
// ─────────────────────────────────────────────────────────────
function normalizeCAName(name) {
  return (name || "")
    .toLowerCase()
    .replace(/\s+(mayoral\s+)?combined\s+(county\s+)?authority\b/gi, "")
    .replace(/\s+authority\b/gi, "")
    .trim();
}

function hexToRgba(hex, alpha) {
  const r = parseInt(hex.slice(1,3),16), g = parseInt(hex.slice(3,5),16), b = parseInt(hex.slice(5,7),16);
  return "rgba("+r+","+g+","+b+","+alpha+")";
}

function parseIncome(str) {
  return parseFloat((str||"0").replace(/[\u00a3m]/g,"")) || 0;
}

function getLipfForCA(caName) {
  for (const [key, val] of Object.entries(LIPF_AREAS)) {
    const ms = Array.isArray(val.caMatch) ? val.caMatch : (val.caMatch ? [val.caMatch] : []);
    if (ms.includes(caName)) return { key, strand: val.strand, theme: val.theme, award: val.award };
  }
  return null;
}

function escHtml(s) {
  return String(s||"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");
}

// ─────────────────────────────────────────────────────────────
// MAP SETUP
// ─────────────────────────────────────────────────────────────
function setupMap() {
  const container = document.getElementById("map-container");
  const rect = container.getBoundingClientRect();
  // Guard against zero layout (shouldn't happen at window.load but just in case)
  const w = rect.width  || container.offsetWidth  || window.innerWidth;
  const h = rect.height || container.offsetHeight || (window.innerHeight - 52);

  svg = d3.select("#map")
    .attr("width", w)
    .attr("height", h);

  projection = d3.geoMercator()
    .fitExtent([[20,20],[w-20,h-20]], UK_BBOX);
  pathGen = d3.geoPath().projection(projection);

  zoomGroup = svg.append("g").attr("id","zoom-group");

  // Layer groups (back to front)
  zoomGroup.append("g").attr("id","bg-layer");
  zoomGroup.append("g").attr("id","planned-ca-layer");
  zoomGroup.append("g").attr("id","ca-layer");
  zoomGroup.append("g").attr("id","lipf-stroke-layer");
  zoomGroup.append("g").attr("id","lipf-circle-layer");
  const al = zoomGroup.append("g").attr("id","assets-layer");
  al.append("g").attr("id","uni-layer");
  al.append("g").attr("id","district-layer");
  al.append("g").attr("id","catapult-layer");

  // Zoom behaviour
  const zoom = d3.zoom()
    .scaleExtent([1, 10])
    .on("zoom", onZoom);
  svg.call(zoom);

  // Click on map background closes popup
  svg.on("click", function(event) {
    if (event.target === this || event.target.tagName === "svg") closePopup();
  });

  // Resize handler
  window.addEventListener("resize", debounce(onResize, 200));
}

function onZoom(event) {
  const { transform } = event;
  currentK = transform.k;
  zoomGroup.attr("transform", transform);
  // Keep strokes constant in screen pixels
  svg.selectAll(".ca-path").attr("stroke-width", 0.8 / currentK);
  svg.selectAll(".lipf-stroke").attr("stroke-width", 2.5 / currentK);
  svg.selectAll(".planned-ca-path").attr("stroke-width", 1.5 / currentK);
  svg.selectAll(".lipf-circle-path").attr("stroke-width", 1.8 / currentK);
  // Keep markers constant size
  svg.selectAll(".marker-inner").attr("transform", "scale("+(1/currentK)+")");
  // Show CA labels only when zoomed in
  const showLabels = currentK >= 2.5;
  svg.selectAll(".ca-label").style("display", showLabels ? null : "none");
}

function onResize() {
  const container = document.getElementById("map-container");
  const w = container.clientWidth, h = container.clientHeight;
  svg.attr("width", w).attr("height", h);
  projection.fitExtent([[20,20],[w-20,h-20]], UK_BBOX);
  pathGen = d3.geoPath().projection(projection);
  // Redraw paths
  svg.selectAll(".ca-path,.country-bg,.planned-ca-path,.lipf-stroke,.lipf-circle-path")
    .attr("d", function(d) { return d ? pathGen(d) : null; });
  // Reposition markers
  svg.selectAll(".marker-group").attr("transform", function(d) {
    const [x,y] = projection([d.lng, d.lat]);
    return "translate("+x+","+y+")";
  });
  // Reposition LIPF circle labels
  svg.selectAll(".lipf-circle-label").each(function(d) {
    const [x,y] = projection([d.lng, d.lat]);
    d3.select(this).attr("x", x).attr("y", y);
  });
  // Reposition CA labels
  svg.selectAll(".ca-label").each(function(d) {
    const c = pathGen.centroid(d);
    d3.select(this).attr("x", c[0]).attr("y", c[1]);
  });
}

function debounce(fn, ms) {
  let t;
  return function() { clearTimeout(t); t = setTimeout(fn, ms); };
}

// ─────────────────────────────────────────────────────────────
// RENDER: Background countries
// ─────────────────────────────────────────────────────────────
function renderBackground(geoData) {
  if (!geoData) return;
  d3.select("#bg-layer").selectAll("path")
    .data(geoData.features)
    .join("path")
    .attr("class","country-bg")
    .attr("d", pathGen);
}

// ─────────────────────────────────────────────────────────────
// RENDER: Combined Authority polygons
// ─────────────────────────────────────────────────────────────
function renderCAs(caGeoData, caFeatureMap) {
  if (!caGeoData) return;
  const layer = d3.select("#ca-layer");

  layer.selectAll("path")
    .data(caGeoData.features)
    .join("path")
    .attr("class","ca-path")
    .attr("d", pathGen)
    .attr("stroke","#fff")
    .attr("stroke-width", 0.8)
    .attr("fill", function(d) {
      const name = getCADisplayName(d);
      const ca = COMBINED_AUTHORITIES[name];
      return ca ? hexToRgba(ca.color, 0.38) : "rgba(180,180,180,0.25)";
    })
    .attr("data-ca-name", function(d) { return getCADisplayName(d); })
    .style("cursor","pointer")
    .on("click", function(event, d) {
      event.stopPropagation();
      const name = getCADisplayName(d);
      showPopup("ca", name, event);
    });

  // Labels (hidden until zoom >= 2.5)
  layer.selectAll("text")
    .data(caGeoData.features)
    .join("text")
    .attr("class","ca-label")
    .attr("x", function(d) { return pathGen.centroid(d)[0]; })
    .attr("y", function(d) { return pathGen.centroid(d)[1]; })
    .text(function(d) { return getCADisplayName(d); })
    .style("display","none");
}

function getCADisplayName(feature) {
  const raw = feature.properties.CAUTH23NM || feature.properties.name || "";
  const norm = normalizeCAName(raw);
  // Try exact match first
  for (const key of Object.keys(COMBINED_AUTHORITIES)) {
    if (normalizeCAName(key) === norm) return key;
  }
  // Partial match fallback
  for (const key of Object.keys(COMBINED_AUTHORITIES)) {
    if (norm.includes(normalizeCAName(key)) || normalizeCAName(key).includes(norm)) return key;
  }
  return raw;
}

// ─────────────────────────────────────────────────────────────
// RENDER: Planned CA county outlines
// ─────────────────────────────────────────────────────────────
function renderPlannedCAs(countyGeoData) {
  if (!countyGeoData) return;
  // Build reverse lookup: code -> planned CA name
  const codeToCA = {};
  for (const [name, data] of Object.entries(PLANNED_CAS)) {
    for (const code of data.codes) codeToCA[code] = name;
  }

  const matching = countyGeoData.features.filter(function(f) {
    return codeToCA[f.properties.CTYUA23CD];
  });

  d3.select("#planned-ca-layer").selectAll("path")
    .data(matching)
    .join("path")
    .attr("class","planned-ca-path")
    .attr("d", pathGen)
    .attr("stroke-width", 1.5)
    .attr("data-planned-ca", function(d) { return codeToCA[d.properties.CTYUA23CD]; })
    .on("click", function(event, d) {
      event.stopPropagation();
      const caName = codeToCA[d.properties.CTYUA23CD];
      showPopup("planned", caName, event);
    });
}

// ─────────────────────────────────────────────────────────────
// RENDER: LIPF strokes on CA polygons
// ─────────────────────────────────────────────────────────────
function renderLIPFStrokes(caFeatureMap) {
  const layer = d3.select("#lipf-stroke-layer");
  const strokeData = [];

  for (const [lipfName, lipf] of Object.entries(LIPF_AREAS)) {
    if (!lipf.caMatch) continue;
    const matches = Array.isArray(lipf.caMatch) ? lipf.caMatch : [lipf.caMatch];
    for (const caName of matches) {
      const feature = caFeatureMap.get(normalizeCAName(caName));
      if (!feature) continue;
      strokeData.push({ feature, lipfName, strand: lipf.strand, caName });
    }
  }

  layer.selectAll("path")
    .data(strokeData)
    .join("path")
    .attr("class","lipf-stroke")
    .attr("d", function(d) { return pathGen(d.feature); })
    .attr("fill","none")
    .attr("stroke", function(d) { return LIPF_COLORS[d.strand]; })
    .attr("stroke-width", 2.5)
    .attr("stroke-dasharray","8 4")
    .attr("pointer-events","none");
}

// ─────────────────────────────────────────────────────────────
// RENDER: LIPF geographic circles (non-CA areas)
// ─────────────────────────────────────────────────────────────
function renderLIPFCircles() {
  const layer = d3.select("#lipf-circle-layer");
  const geoCircle = d3.geoCircle();
  const entries = Object.entries(LIPF_GEO_CIRCLES);

  const circleFeatures = entries.map(function([name, d]) {
    const feat = geoCircle.center([d.lng, d.lat]).radius(d.radiusDeg)();
    return Object.assign({}, d, { name, feat });
  });

  // Circle paths
  layer.selectAll("path")
    .data(circleFeatures)
    .join("path")
    .attr("class","lipf-circle-path")
    .attr("d", function(d) { return pathGen(d.feat); })
    .attr("fill", function(d) { return hexToRgba(LIPF_COLORS[d.strand], 0.12); })
    .attr("stroke", function(d) { return LIPF_COLORS[d.strand]; })
    .attr("stroke-width", 1.8)
    .attr("stroke-dasharray","6 3")
    .style("cursor","pointer")
    .on("click", function(event, d) {
      event.stopPropagation();
      showPopup("lipf_circle", d, event);
    });

  // Labels
  layer.selectAll("text")
    .data(circleFeatures)
    .join("text")
    .attr("class","lipf-circle-label")
    .attr("x", function(d) { return projection([d.lng, d.lat])[0]; })
    .attr("y", function(d) { return projection([d.lng, d.lat])[1]; })
    .attr("fill", function(d) { return LIPF_COLORS[d.strand]; })
    .attr("font-size","10px")
    .attr("font-weight","600")
    .attr("text-anchor","middle")
    .attr("dominant-baseline","middle")
    .attr("pointer-events","none")
    .text(function(d) { return d.name; });
}

// ─────────────────────────────────────────────────────────────
// RENDER: Innovation asset markers
// ─────────────────────────────────────────────────────────────
const uniScale = d3.scaleSqrt().domain([100, 760]).range([5, 13]);

function renderAssets() {
  renderUniversities();
  renderDistricts();
  renderCatapults();
}

function renderUniversities() {
  const layer = d3.select("#uni-layer");
  layer.selectAll("g")
    .data(INNOVATION_ASSETS.filter(function(d){ return d.type === "university"; }))
    .join("g")
    .attr("class","marker-group")
    .attr("transform", function(d) {
      const [x,y] = projection([d.lng, d.lat]);
      return "translate("+x+","+y+")";
    })
    .each(function(d) {
      const g = d3.select(this);
      const r = uniScale(parseIncome(d.researchIncome));
      const inner = g.append("g").attr("class","marker-inner");
      inner.append("circle")
        .attr("class","uni-marker")
        .attr("r", r);
      // Tooltip title
      g.append("title").text(d.name+" — "+d.city+" ("+d.researchIncome+" research income)");
    })
    .on("click", function(event, d) {
      event.stopPropagation();
      showPopup("asset", d, event);
    });
}

function renderDistricts() {
  const layer = d3.select("#district-layer");
  layer.selectAll("g")
    .data(INNOVATION_ASSETS.filter(function(d){ return d.type === "innovation_district"; }))
    .join("g")
    .attr("class","marker-group")
    .attr("transform", function(d) {
      const [x,y] = projection([d.lng, d.lat]);
      return "translate("+x+","+y+")";
    })
    .each(function(d) {
      const inner = d3.select(this).append("g").attr("class","marker-inner");
      inner.append("circle").attr("class","district-marker").attr("r",8);
      d3.select(this).append("title").text(d.name+" \u2014 "+d.city);
    })
    .on("click", function(event, d) {
      event.stopPropagation();
      showPopup("asset", d, event);
    });
}

function renderCatapults() {
  const layer = d3.select("#catapult-layer");
  layer.selectAll("g")
    .data(INNOVATION_ASSETS.filter(function(d){ return d.type === "catapult"; }))
    .join("g")
    .attr("class","marker-group")
    .attr("transform", function(d) {
      const [x,y] = projection([d.lng, d.lat]);
      return "translate("+x+","+y+")";
    })
    .each(function(d) {
      const inner = d3.select(this).append("g").attr("class","marker-inner");
      inner.append("polygon")
        .attr("class","catapult-marker")
        .attr("points","-9,0 0,-9 9,0 0,9");
      d3.select(this).append("title").text(d.name+" \u2014 "+d.city);
    })
    .on("click", function(event, d) {
      event.stopPropagation();
      showPopup("asset", d, event);
    });
}

// ─────────────────────────────────────────────────────────────
// LAYER TOGGLES
// ─────────────────────────────────────────────────────────────
function setupToggles() {
  const toggleMap = {
    "toggle-ca":           { layerIds: ["ca-layer", "lipf-stroke-layer"], key: "ca" },
    "toggle-lipf":         { layerIds: ["lipf-stroke-layer", "lipf-circle-layer"], key: "lipf" },
    "toggle-planned":      { layerIds: ["planned-ca-layer"], key: "planned" },
    "toggle-catapult":     { layerIds: ["catapult-layer"], key: "catapult" },
    "toggle-districts":    { layerIds: ["district-layer"], key: "districts" },
    "toggle-universities": { layerIds: ["uni-layer"], key: "universities" }
  };

  for (const [id, cfg] of Object.entries(toggleMap)) {
    const cb = document.getElementById(id);
    if (!cb) continue;
    cb.checked = LAYER_VISIBLE[cfg.key];
    applyLayerVisibility(cfg.layerIds, LAYER_VISIBLE[cfg.key]);
    cb.addEventListener("change", function() {
      LAYER_VISIBLE[cfg.key] = cb.checked;
      // Special case: LIPF strokes only show when both CA and LIPF are on
      if (cfg.key === "ca" || cfg.key === "lipf") {
        applyLayerVisibility(["lipf-stroke-layer"], LAYER_VISIBLE.ca && LAYER_VISIBLE.lipf);
        applyLayerVisibility(["ca-layer"], LAYER_VISIBLE.ca);
        applyLayerVisibility(["lipf-circle-layer"], LAYER_VISIBLE.lipf);
      } else {
        applyLayerVisibility(cfg.layerIds, cb.checked);
      }
    });
  }
}

function applyLayerVisibility(ids, visible) {
  for (const id of ids) {
    const el = document.getElementById(id);
    if (el) el.style.display = visible ? "" : "none";
  }
}

// ─────────────────────────────────────────────────────────────
// POPUP SYSTEM
// ─────────────────────────────────────────────────────────────
function showPopup(type, data, event) {
  const overlay = document.getElementById("popup-overlay");
  const popup   = document.getElementById("popup");
  const content = document.getElementById("popup-content");

  content.innerHTML = buildPopupHTML(type, data);
  overlay.classList.remove("popup-hidden");

  if (window.innerWidth >= 768) {
    // Desktop: floating card near click point
    overlay.style.background = "transparent";
    const pw = 320, ph = Math.min(popup.scrollHeight || 400, window.innerHeight * 0.7);
    let left = event.clientX + 16;
    let top  = event.clientY - 20;
    if (left + pw > window.innerWidth - 10)  left = event.clientX - pw - 16;
    if (top  + ph > window.innerHeight - 10) top  = window.innerHeight - ph - 10;
    if (top  < 10) top = 10;
    if (left < 10) left = 10;
    popup.style.left   = left + "px";
    popup.style.top    = top  + "px";
    popup.style.bottom = "auto";
    popup.style.right  = "auto";
  } else {
    // Mobile: bottom sheet
    overlay.style.background = "rgba(0,0,0,0.3)";
    popup.style.left   = "0";
    popup.style.right  = "0";
    popup.style.bottom = "0";
    popup.style.top    = "auto";
  }
}

function closePopup() {
  document.getElementById("popup-overlay").classList.add("popup-hidden");
}

function buildPopupHTML(type, data) {
  if (type === "ca") {
    return buildCAPopup(data);
  } else if (type === "planned") {
    return buildPlannedPopup(data);
  } else if (type === "asset") {
    return buildAssetPopup(data);
  } else if (type === "lipf_circle") {
    return buildLIPFCirclePopup(data);
  }
  return "";
}

function buildCAPopup(caName) {
  const ca = COMBINED_AUTHORITIES[caName] || {};
  const lipf = getLipfForCA(caName);
  let html = '<div class="popup-title">'+escHtml(caName)+'</div>';
  html += '<span class="popup-badge badge-ca">Combined Authority</span>';

  if (ca.mayor) {
    const partyColour = ca.party === "Labour" ? "#d32011" : ca.party === "Conservative" ? "#0087dc" : "#555";
    html += '<div class="popup-row"><strong>Mayor:</strong><span>'+escHtml(ca.mayor)+
      ' <span style="color:'+partyColour+';font-weight:600">('+escHtml(ca.party)+')</span>'+
      ' &mdash; since '+escHtml(ca.mayorSince)+'</span></div>';
  }

  if (lipf) {
    const lc = LIPF_COLORS[lipf.strand];
    html += '<div style="margin:8px 0"><span class="popup-lipf-badge" style="background:'+
      hexToRgba(lc,0.15)+';color:'+lc+';border:1px solid '+lc+'">'+
      escHtml(LIPF_LABELS[lipf.strand])+'</span>';
    if (lipf.theme) html += '<span style="font-size:12px;color:#666;margin-left:6px">'+escHtml(lipf.theme)+'</span>';
    if (lipf.award) html += '<div style="font-size:12px;color:#D85A30;margin-top:4px">Joint award: '+escHtml(lipf.award)+'</div>';
    html += '</div>';
  }

  if (ca.initiatives && ca.initiatives.length) {
    html += '<ul class="popup-initiatives">';
    for (const item of ca.initiatives) html += '<li>'+escHtml(item)+'</li>';
    html += '</ul>';
  }

  if (ca.website) {
    html += '<a href="'+escHtml(ca.website)+'" target="_blank" rel="noopener" class="popup-link">Visit website &rarr;</a>';
  }
  return html;
}

function buildPlannedPopup(caName) {
  const planned = PLANNED_CAS[caName] || {};
  let html = '<div class="popup-title">'+escHtml(caName)+'</div>';
  html += '<span class="popup-badge badge-planned">Planned Combined Authority</span>';
  html += '<div class="popup-row"><strong>Status:</strong><span>'+escHtml(planned.status||"")+'</span></div>';
  html += '<div class="popup-note">This area has a devolution deal in progress. Boundaries shown are the constituent counties and unitary authorities.</div>';
  return html;
}

function buildAssetPopup(asset) {
  const lc = ASSET_COLORS[asset.type] || "#333";
  let html = '<div class="popup-title">'+escHtml(asset.name)+'</div>';
  html += '<span class="popup-badge badge-'+escHtml(asset.type)+'">'+escHtml(ASSET_LABELS[asset.type]||asset.type)+'</span>';
  html += '<div class="popup-row"><strong>Location:</strong><span>'+escHtml(asset.city)+'</span></div>';

  if (asset.type === "university" && asset.researchIncome) {
    html += '<div class="popup-row"><strong>Research:</strong><span>'+escHtml(asset.researchIncome)+' annual income</span></div>';
  }
  if (asset.org) {
    html += '<div class="popup-row"><strong>Org code:</strong><span>'+escHtml(asset.org)+'</span></div>';
  }
  if (asset.url) {
    html += '<a href="'+escHtml(asset.url)+'" target="_blank" rel="noopener" class="popup-link">Visit website &rarr;</a>';
  }
  return html;
}

function buildLIPFCirclePopup(d) {
  const lc = LIPF_COLORS[d.strand] || "#333";
  let html = '<div class="popup-title">'+escHtml(d.name)+'</div>';
  html += '<span class="popup-lipf-badge" style="background:'+hexToRgba(lc,0.15)+';color:'+lc+
    ';border:1px solid '+lc+'">'+escHtml(LIPF_LABELS[d.strand])+'</span>';
  if (d.theme) html += '<div class="popup-theme">Theme: '+escHtml(d.theme)+'</div>';
  if (d.note)  html += '<div class="popup-note">'+escHtml(d.note)+'</div>';
  return html;
}

// ─────────────────────────────────────────────────────────────
// LEGEND
// ─────────────────────────────────────────────────────────────
function setupLegend() {
  document.getElementById("legend-btn").addEventListener("click", function() {
    document.getElementById("legend-panel").classList.toggle("legend-hidden");
  });
  document.getElementById("legend-close").addEventListener("click", function() {
    document.getElementById("legend-panel").classList.add("legend-hidden");
  });
}

// ─────────────────────────────────────────────────────────────
// DATA LOADING
// ─────────────────────────────────────────────────────────────
function fetchJson(url) {
  return fetch(url).then(function(r) {
    if (!r.ok) throw new Error("HTTP " + r.status + " for " + url);
    return r.json();
  }).then(function(data) {
    // ArcGIS returns an error object when the service name is wrong
    if (data && data.error) throw new Error("ArcGIS error: " + JSON.stringify(data.error));
    return data;
  });
}

async function loadData() {
  // Try primary CA URL, fall back to _2022 variant
  async function loadCAs() {
    try {
      const d = await fetchJson(API.cas);
      if (d.features && d.features.length > 0) return d;
      throw new Error("Empty feature set");
    } catch(e) {
      console.warn("Primary CA URL failed, trying fallback:", e.message);
      return fetchJson(API.cas_alt).catch(function(e2) {
        console.warn("CA fallback also failed:", e2.message);
        return null;
      });
    }
  }

  const [countriesResult, caResult, countyResult] = await Promise.allSettled([
    fetchJson(API.countries),
    loadCAs(),
    fetchJson(API.counties)
  ]);

  if (countriesResult.status === "rejected") console.warn("Countries GeoJSON failed:", countriesResult.reason);
  if (countyResult.status === "rejected")    console.warn("Counties GeoJSON failed:", countyResult.reason);

  return {
    countriesData: countriesResult.status === "fulfilled" ? countriesResult.value : null,
    caData:        caResult.status === "fulfilled" ? caResult.value : null,
    countyData:    countyResult.status === "fulfilled" ? countyResult.value : null
  };
}

// Build a feature map keyed by normalised CA name for LIPF matching
function buildCAFeatureMap(caData) {
  const map = new Map();
  if (!caData || !caData.features) return map;
  for (const feature of caData.features) {
    const raw = feature.properties.CAUTH23NM || feature.properties.name || "";
    map.set(normalizeCAName(raw), feature);
    // Also store by the COMBINED_AUTHORITIES display key if we can match it
    const displayName = getCADisplayName(feature);
    if (displayName) map.set(normalizeCAName(displayName), feature);
  }
  return map;
}

// ─────────────────────────────────────────────────────────────
// INIT
// ─────────────────────────────────────────────────────────────
async function init() {
  setupMap();
  setupLegend();

  // Wire up popup close handlers
  document.getElementById("popup-close").addEventListener("click", closePopup);
  document.getElementById("popup-overlay").addEventListener("click", function(event) {
    if (event.target === this) closePopup();
  });
  document.getElementById("popup").addEventListener("click", function(event) {
    event.stopPropagation();
  });

  // Load geographic data
  const { countriesData, caData, countyData } = await loadData();

  // Build feature lookup map
  const caFeatureMap = buildCAFeatureMap(caData);

  // Render all layers
  renderBackground(countriesData);
  renderPlannedCAs(countyData);
  renderCAs(caData, caFeatureMap);
  renderLIPFStrokes(caFeatureMap);
  renderLIPFCircles();
  renderAssets();

  // Set up layer toggles (applies default visibility states)
  setupToggles();

  // Hide loading spinner
  const loading = document.getElementById("loading");
  if (loading) loading.classList.add("hidden");
}

// Use window.load (not DOMContentLoaded) so flex layout is fully calculated
// before we read container dimensions for the projection.
if (document.readyState === "complete") {
  init();
} else {
  window.addEventListener("load", init);
}
