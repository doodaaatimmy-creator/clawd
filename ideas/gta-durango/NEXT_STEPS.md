# GTA Durango: Next Steps

## Completed ✅
- Comprehensive Game Design Document created
- Research on GIS data sources for Durango
- Research on game engines with GIS support
- Research on real-world city replica games
- Full aesthetic vision, mechanics, and technical pipeline documented

## Follow-Up Task Needed 🔄

### GIS Data Acquisition & Testing

**Priority:** High - This validates the entire technical approach

**Tasks:**

1. **Download Colorado OSM Data**
   - URL: https://download.geofabrik.de/north-america/us/colorado.html
   - File: `colorado-latest.osm.pbf` (~350-500 MB)
   - Extract Durango area using `osmium` tool

2. **Download Microsoft Building Footprints**
   - URL: https://github.com/microsoft/USBuildingFootprints
   - Find Colorado GeoJSON file
   - Filter to La Plata County / Durango area

3. **Download USGS Terrain Data**
   - Portal: https://apps.nationalmap.gov/downloader/
   - Search: La Plata County, Colorado
   - Get 1-meter DEM data for Durango area

4. **Request City of Durango GIS Data**
   - Submit request at: https://survey123.arcgis.com/share/50ed1c6a7496486794d2723b0bdb0f3c
   - Ask for: Building footprints, roads, parcels, zoning

5. **Test Import Pipeline**
   - Install QGIS
   - Import downloaded data
   - Verify coverage and quality
   - Export sample to game-ready format

**Document findings in:** `/Users/clawdchad/clawd/ideas/gta-durango/GIS_DATA_SOURCES.md`

## Quick Commands to Get Started

```bash
# Install tools (macOS)
brew install osmium-tool qgis gdal

# Download Colorado OSM
curl -O https://download.geofabrik.de/north-america/us/colorado-latest.osm.pbf

# Extract Durango area (approx bounding box)
osmium extract \
  --bbox=-107.92,-107.82,37.24,37.32 \
  colorado-latest.osm.pbf \
  -o durango.osm.pbf

# Convert to GeoJSON for easier inspection
osmium export durango.osm.pbf -o durango.geojson
```

## File Locations

```
/Users/clawdchad/clawd/ideas/gta-durango/
├── GAME_DESIGN.md      # Main design document ✅
├── NEXT_STEPS.md       # This file ✅
├── GIS_DATA_SOURCES.md # To be created (data inventory)
└── data/               # To be created (downloaded GIS files)
    ├── terrain/
    ├── buildings/
    └── roads/
```
