# GTA DURANGO: Game Design Document
## "Vice City Meets the San Juans"

**Version:** 1.0  
**Last Updated:** 2026-01-28  
**Status:** Concept / Pre-Production

---

## Table of Contents
1. [Executive Summary](#executive-summary)
2. [Core Concept & Aesthetic Vision](#core-concept--aesthetic-vision)
3. [Technical Approach (GIS Data Pipeline)](#technical-approach-gis-data-pipeline)
4. [Gameplay Mechanics](#gameplay-mechanics)
5. [World Design](#world-design)
6. [Unique Durango Elements](#unique-durango-elements)
7. [Narrative Framework](#narrative-framework)
8. [Monetization Strategy](#monetization-strategy)
9. [MVP Scope](#mvp-scope)
10. [Development Roadmap](#development-roadmap)
11. [Technical Research Summary](#technical-research-summary)
12. [Appendix: GIS Data Sources](#appendix-gis-data-sources)

---

## Executive Summary

**GTA Durango** is an open-world action-adventure game that combines the neon-soaked aesthetic of GTA Vice City with the rugged mountain-town character of Durango, Colorado. Built on real-world GIS data, the game transforms this historic railroad and ski town into a vibrant, stylized playground.

**Tagline:** *"The altitude's illegal."*

**Core Hook:** What if Vice City's Tommy Vercetti retired to a Colorado mountain town—and trouble followed him?

### Key Differentiators
- **Real-world geography** imported from GIS data with stylized aesthetics
- **Unique setting**: No open-world game has tackled a small mountain town
- **Verticality**: River canyon, ski slopes, mountain passes create 3D gameplay
- **Trains**: Driveable/hijackable historic narrow-gauge railroad
- **Weather extremes**: Blizzards, monsoons, wildfire smoke as gameplay elements

---

## Core Concept & Aesthetic Vision

### The "Outrun Mountain" Aesthetic

We're blending two distinct visual languages:

#### Vice City DNA (1980s Miami Outrun)
- **Color Palette:**
  - Hot pink sunset gradients: `#FF1493`
  - Deep purple twilight: `#9D4EDD`
  - Cyan neon accents: `#00CED1`
  - Warm orange: `#FF6B35`
- **Visual Elements:**
  - Neon signs on every storefront
  - Chrome detailing on vehicles
  - Sunset/sunrise golden hour lighting emphasis
  - Retrofuturistic UI design
  - Synthwave soundtrack

#### Mountain Town DNA (Durango Reality)
- **Color Palette:**
  - Pine forest greens: `#2D5016`
  - Aspen gold: `#FFD700`
  - Red rock rust: `#8B4513`
  - Snow white: `#F5F5F5`
  - River turquoise: `#40E0D0`
- **Visual Elements:**
  - Victorian-era architecture (1880s mining town)
  - Narrow-gauge railroad
  - Ski resort infrastructure
  - Whitewater rapids
  - Mesa Verde-inspired ancient ruins

### Visual Fusion: "Neon Alpine"

The magic happens when these worlds collide:
- Victorian buildings with neon tube lighting tracing their gingerbread trim
- Snow-covered peaks reflecting pink/purple sunset gradients
- Steam locomotives with underglow lighting
- Ski gondolas with interior neon
- River kayaks leaving bioluminescent trails at night
- Main Avenue as a smaller, more intimate Ocean Drive

### Art Direction Principles

1. **Time of Day is King**: Most gameplay/cinematics during "golden hour" (sunset/sunrise)
2. **Neon Everything**: Even in wilderness, there's camp lights, headlamps, trail markers
3. **Contrast**: Sterile snow vs. warm interiors, wild nature vs. human neon
4. **Verticality**: Always show elevation—looking up at peaks, down into canyons
5. **Weather as Mood**: Blizzards = danger, clear nights = freedom, rain = noir

---

## Technical Approach (GIS Data Pipeline)

### Recommended Engine: Unreal Engine 5 + Cesium

Based on research, **Unreal Engine 5 with Cesium for Unreal** provides the most robust pipeline for GIS-to-game conversion.

#### Why Unreal + Cesium?
- **Cesium for Unreal** streams real-world 3D terrain, imagery, and buildings
- Native support for geospatial coordinate systems
- High-accuracy full-scale globe capability
- Supports: GeoTIFF, DEM, CityGML, LAS/LAZ point clouds, OBJ, FBX, glTF
- Active development and commercial support
- UE5's Nanite handles high-poly imported geometry efficiently

#### Alternative Engines Considered

| Engine | GIS Support | Pros | Cons |
|--------|-------------|------|------|
| **Unreal + Cesium** | Excellent | Best terrain/building pipeline, photorealism | Steep learning curve, heavy |
| **Unity + CityGen3D** | Good | Faster iteration, more tutorials | Less sophisticated terrain |
| **Unity + Mapbox** | Good | Real-time streaming | Limited offline capability |
| **Godot + Terrain3D** | Basic | Free, lightweight, indie-friendly | Manual GIS import, less tooling |

### Data Pipeline Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        DATA SOURCES                             │
├─────────────────────────────────────────────────────────────────┤
│  Terrain        │  Buildings       │  Roads           │  POIs   │
│  ─────────────  │  ─────────────   │  ─────────────   │ ─────── │
│  USGS 3DEP DEM  │  Microsoft AI    │  OpenStreetMap   │  OSM    │
│  Colorado LiDAR │  OSM Footprints  │  City of Durango │  Google │
│  Cesium World   │  City GIS Data   │  Colorado DOT    │  Manual │
└────────┬────────┴────────┬─────────┴────────┬─────────┴────┬────┘
         │                 │                  │              │
         ▼                 ▼                  ▼              ▼
┌─────────────────────────────────────────────────────────────────┐
│                     PROCESSING LAYER                            │
├─────────────────────────────────────────────────────────────────┤
│  QGIS / FME / Houdini                                           │
│  ├── Coordinate transformation (WGS84 → Local)                  │
│  ├── Terrain mesh generation from DEM                           │
│  ├── Building extrusion from footprints                         │
│  ├── Road network vectorization                                 │
│  └── Data cleanup / merging                                     │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                    STYLIZATION LAYER                            │
├─────────────────────────────────────────────────────────────────┤
│  Blender / Houdini / Custom Tools                               │
│  ├── Building procedural detail (windows, signs, balconies)     │
│  ├── Terrain texture painting (snow, rock, forest)              │
│  ├── Neon sign placement (procedural + manual)                  │
│  ├── Vegetation scattering (SpeedTree / PCG)                    │
│  └── LOD generation                                             │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                    UNREAL ENGINE 5                              │
├─────────────────────────────────────────────────────────────────┤
│  ├── World Partition (streaming)                                │
│  ├── Nanite (geometry)                                          │
│  ├── Lumen (lighting)                                           │
│  ├── Chaos (physics)                                            │
│  └── Game logic / AI / Vehicles                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Scale Considerations

**Real Durango:**
- City proper: ~15 sq mi
- Downtown core: ~0.5 sq mi
- Durango to Silverton: 45 mi by train
- Purgatory Resort: 20 mi north

**Game World Options:**

| Scale | Play Area | Pros | Cons |
|-------|-----------|------|------|
| 1:1 | 15 sq mi | Authenticity | Sparse, boring |
| 1:4 | ~4 sq mi | Good density | Still large |
| 1:8 | ~2 sq mi | **Sweet spot** | Some compression |
| 1:16 | ~1 sq mi | Manageable | Feels cramped |

**Recommendation:** 1:8 scale for MVP, allowing ~2 sq mi play area with densified content.

### Terrain Resolution

- **DEM Source:** USGS 3DEP (1-meter resolution available for Colorado)
- **In-Game:** 2-meter terrain resolution for playable areas
- **Distant LOD:** 10-30 meter for mountain backdrop

---

## Gameplay Mechanics

### Core Loop

```
EXPLORE → EARN → UPGRADE → CONQUER → EXPAND → EXPLORE
    ↑                                              │
    └──────────────────────────────────────────────┘
```

### Primary Activities

#### 1. Vehicular Gameplay (40% of gameplay)

**Ground Vehicles:**
- Trucks, SUVs, muscle cars (Main Avenue cruising)
- ATVs, dirt bikes (mountain trails)
- Snowmobiles (winter zones)
- **Narrow-gauge trains** (unique to this game!)

**Water Vehicles:**
- Kayaks, rafts (Animas River)
- Jet skis (reservoir)

**Air Vehicles (late game):**
- Helicopters (mountain rescue aesthetic)
- Hang gliders (launch from ski slopes)
- Wingsuit (extreme late-game unlock)

**Train Mechanics (Signature Feature):**
- Drive/hijack the Durango & Silverton locomotive
- Switch tracks at junctions
- Couple/decouple cars
- Rob train passengers (missions)
- Train-to-train jumps on parallel tracks
- Use train as mobile base/fast travel

#### 2. On-Foot Gameplay (30% of gameplay)

**Combat:**
- Third-person cover shooting
- Melee with improvised weapons (ski poles, oars, pickaxes)
- Environmental takedowns (push off cliffs, into river)

**Traversal:**
- Climbing (rock faces, buildings)
- Skiing/snowboarding (Purgatory slopes)
- River swimming (with current physics)
- Rappelling (canyon descent)

**Activities:**
- Stealth infiltration
- Races (foot, ski, kayak)
- Photography (wildlife, tourist traps)
- Treasure hunting (abandoned mines)

#### 3. Economic Gameplay (20% of gameplay)

**Legal Businesses:**
- Dispensary management (Colorado, baby!)
- Brewery ownership
- Ski lodge/rental shops
- River rafting tours
- Real estate

**Illegal Enterprises:**
- Drug smuggling (train routes to Mexico connection)
- Illegal wildlife trade
- Casino operations
- Protection rackets
- Car theft ring

#### 4. Social/Story (10% of gameplay)

- Character relationships
- Faction reputation
- Main story missions
- Side character arcs

### Progression Systems

**Player Stats:**
- Driving skill (per vehicle type)
- Combat proficiency
- Stamina/athletics
- Persuasion/intimidation
- Technical skills (hacking, explosives)

**Economic Progression:**
- Cash on hand
- Business income
- Real estate value
- Vehicle collection

**World State:**
- Faction control (who owns what turf)
- Law enforcement heat level
- Community reputation

### Wanted System: "Mountain Justice"

Unlike urban GTA, law enforcement behaves differently:

| Stars | Response | Escape Options |
|-------|----------|----------------|
| ⭐ | Local sheriff, slow pursuit | Outrun, hide |
| ⭐⭐ | Multiple deputies, roadblocks | Off-road escape |
| ⭐⭐⭐ | State patrol, helicopter | Tunnels, mines, trains |
| ⭐⭐⭐⭐ | Multi-agency, spike strips | Leave region |
| ⭐⭐⭐⭐⭐ | Military (National Guard) | Underground bunker |

**Unique Escape Mechanics:**
- Jump into the Animas River (current carries you)
- Hop a moving train
- Ski down slopes (cops can't follow)
- Hide in abandoned mines
- Wildlife distraction (aggro a bear)

---

## World Design

### Districts/Zones

```
                    ┌─────────────────┐
                    │   SILVERTON     │
                    │  (Ghost Town)   │
                    │   Mining/Crime  │
                    └────────┬────────┘
                             │ Train Route
                    ┌────────┴────────┐
                    │  ANIMAS CANYON  │
                    │   Wilderness    │
                    │   River/Hiking  │
                    └────────┬────────┘
                             │
    ┌───────────┐   ┌────────┴────────┐   ┌───────────┐
    │ PURGATORY │───│    DOWNTOWN     │───│  COLLEGE  │
    │ Ski Resort│   │   Main Avenue   │   │   MESA    │
    │ High-End  │   │  Commercial Hub │   │  Student  │
    └───────────┘   └────────┬────────┘   └───────────┘
                             │
                    ┌────────┴────────┐
                    │   THREE SPRINGS │
                    │    Suburban     │
                    │   Residential   │
                    └────────┬────────┘
                             │
                    ┌────────┴────────┐
                    │   BODO PARK     │
                    │   Industrial    │
                    │   Warehouses    │
                    └─────────────────┘
```

### Zone Details

#### 1. Downtown / Main Avenue
- **Vibe:** Neon-lit Victorian storefronts
- **Key Locations:**
  - Train Depot (fast travel hub)
  - Rowdy bars and breweries
  - Tourist shops
  - Hotel/safehouse
  - Underground speakeasy
- **Activities:** Street racing, bar fights, shopping, missions

#### 2. Animas River Corridor
- **Vibe:** Wild, dangerous, beautiful
- **Key Locations:**
  - Whitewater sections
  - Fishing spots
  - Hidden camps
  - Cliff jumping points
  - Abandoned railway spur
- **Activities:** Kayak races, smuggling, fishing, treasure hunting

#### 3. Purgatory Resort
- **Vibe:** Wealthy tourists, exclusive clubs
- **Key Locations:**
  - Ski village
  - Luxury condos
  - Underground gambling den
  - Lift maintenance (infiltration)
  - Backcountry gates
- **Activities:** Skiing, heists, high-society infiltration, avalanche escapes

#### 4. College Mesa (Fort Lewis)
- **Vibe:** Young, rebellious, party scene
- **Key Locations:**
  - Campus buildings
  - Student housing
  - Underground party venues
  - Small dispensaries
- **Activities:** Recruiting, drug distribution, parties, races

#### 5. Silverton (North)
- **Vibe:** Abandoned mining town, lawless
- **Key Locations:**
  - Abandoned mines
  - Ghost buildings
  - Hidden grow operations
  - Old saloon (faction HQ)
- **Activities:** Mining resources, hideouts, major heists

#### 6. Industrial Zone (Bodo)
- **Vibe:** Working class, warehouses
- **Key Locations:**
  - Rail yard
  - Warehouses
  - Auto shops
  - Illegal fighting ring
- **Activities:** Vehicle acquisition, storage, fencing goods

---

## Unique Durango Elements

### 1. The Durango & Silverton Railroad 🚂

**The Most Unique Feature in Any GTA-Like Game**

The historic narrow-gauge railroad becomes a central gameplay element:

**Train Types:**
- Steam locomotive (slow, powerful, scenic)
- Diesel locomotive (faster, less conspicuous)
- Handcar (stealth/speed for short distances)

**Gameplay Integration:**
- **Heists:** Plan and execute train robberies (Old West style)
- **Smuggling:** Hide contraband in coal cars
- **Chases:** Epic train-to-train pursuits through canyons
- **Set Pieces:** Boss fights on moving trains
- **Base of Operations:** Convert a train car into mobile HQ

**Technical Challenge:** Real-time train physics with decoupling, track switching, and collision with vehicles attempting to cross.

### 2. The Animas River 🌊

**Whitewater as Gameplay**

- Class III-IV rapids that affect vehicle/swimming physics
- River current as movement system (faster downstream)
- Seasonal flooding changes accessible areas
- Ice fishing in winter (at calmer spots)
- Kayak/raft races with procedural obstacle courses
- Bodies... disposal (dark, but it's a crime game)

### 3. Ski Culture ⛷️

**Purgatory-Inspired Winter Sports**

- Full skiing/snowboarding mechanics (SSX meets GTA)
- Ski lift access (and stunts jumping between)
- Avalanche mechanics (trigger them on pursuers)
- Backcountry exploration with danger
- Seasonal activities (summer: mountain biking same trails)

### 4. College Town Energy 🎓

**Fort Lewis-Inspired Student Life**

- Party missions
- Student NPCs with distinct behaviors
- Recruitment for operations
- Campus as heist location
- Rivalry between student groups

### 5. Cannabis Culture 🌿

**Legal Weed, Illegal Opportunity**

Colorado's legal marijuana creates unique gameplay:
- Own and operate dispensaries (legal)
- Undercut with black market (illegal)
- Transport across state lines (federal crime)
- Strain development (mini-game)
- Market manipulation

### 6. Weather Extremes 🌨️

**Dynamic Weather as Gameplay**

| Weather | Frequency | Effect |
|---------|-----------|--------|
| **Blizzard** | Winter | Reduced visibility, slippery roads, closed passes |
| **Monsoon** | Summer | Flash floods, mudslides, river danger |
| **Wildfire Smoke** | Late Summer | Reduced visibility, health effects, evacuations |
| **Clear Night** | Year-round | Best visibility, stargazing mini-game |
| **Thunder** | Summer | Lightning strike hazard in exposed areas |

### 7. Indigenous Heritage 🏛️

**Mesa Verde / Ancestral Puebloan Connection**

- Ancient ruins as explorable locations
- Respectful inclusion of indigenous history
- Treasure hunting for artifacts (ethical dilemmas)
- Native characters with agency (not stereotypes)

---

## Narrative Framework

### Setting: Present Day, Alternate Reality

**Premise:** Durango is a thriving small city of 50,000 that has become a nexus for:
- Legal cannabis industry (billions in revenue)
- Crypto-mining operations (cheap hydropower)
- Adventure tourism (wealthy clientele)
- And therefore... criminal opportunity

### Main Character: "The Newcomer"

**Background Options (player choice):**
1. **Ex-Cartel Runner:** Fled Mexico, seeking fresh start
2. **Disgraced Wall Street Banker:** Lost everything, starting over
3. **Returning Local:** Left for military, back after discharge
4. **Witness Protection:** New identity, old enemies

### Major Factions

#### 1. The Mountain Mafia
- **Leader:** "Old Man Winters" - 70s ski legend turned crime boss
- **Territory:** Purgatory Resort, wealthy areas
- **Business:** Cocaine, money laundering, real estate
- **Style:** Sophisticated, suits, expensive tastes

#### 2. The Iron Rail Gang
- **Leader:** "Conductor" - mysterious figure who controls the trains
- **Territory:** Railroad, industrial zone
- **Business:** Smuggling, weapons, human trafficking
- **Style:** Railroad aesthetic, bandanas, brutal

#### 3. The Green Rush Collective
- **Leader:** "Mary Jane" - cannabis queen turned underground boss
- **Territory:** Downtown, college area
- **Business:** Marijuana (legal facade), psychedelics, protection
- **Style:** Hippie-corporate hybrid, peaceful until crossed

#### 4. The River Runners
- **Leader:** "Rapids" Rodriguez - former Olympic kayaker
- **Territory:** Animas River corridor, wilderness
- **Business:** Eco-terrorism, theft, guides for criminal escapes
- **Style:** Outdoor gear, environmental zealotry

### Main Story Arc (Three Acts)

**Act 1: Arrival (5-10 hours)**
- Arrive in Durango with nothing
- Establish basic income (small jobs)
- Meet all factions
- Choose initial allegiance
- First property acquisition

**Act 2: Expansion (15-25 hours)**
- Build business empire
- Navigate faction politics
- Major heists (train robbery, resort heist, etc.)
- Romantic subplot options
- Betrayal from ally

**Act 3: Reckoning (10-15 hours)**
- All-out faction war
- Federal investigation pressure
- Final choice: escape, dominate, or reform
- Multiple endings based on choices

---

## Monetization Strategy

### Premium Game Model (Recommended)

**Base Game:** $39.99 - $49.99
- Complete single-player experience
- Full map and story
- 40-60 hours of content

### DLC Strategy

#### Expansion 1: "Silverton Secrets" ($19.99)
- Extended Silverton map
- New story chapter
- Mine exploration mechanics
- New vehicles (mining equipment)

#### Expansion 2: "Winter Games" ($19.99)
- Enhanced ski mechanics
- Snowmobile races
- New Purgatory interiors
- Winter-specific story

#### Expansion 3: "River Wild" ($19.99)
- Extended river system
- New water vehicles
- Fishing mechanics
- Wilderness survival mode

### Cosmetic Microtransactions (Optional)

**If live-service elements added:**
- Vehicle skins
- Character outfits
- Property decorations
- NO pay-to-win elements

### Alternative Models

#### Free-to-Play (Not Recommended)
- Would require aggressive monetization
- Risks alienating core audience
- Consider only if scope dramatically reduced

#### Early Access ($29.99)
- Release MVP, iterate based on feedback
- Build community
- Risk: negative reviews before ready

---

## MVP Scope

### Philosophy: "Minimum Delightful Product"

The MVP should be the smallest version that:
1. Demonstrates the core "Neon Alpine" aesthetic
2. Proves the GIS pipeline works
3. Has one complete gameplay loop
4. Is fun enough to generate interest

### MVP Feature Set

#### World (✅ Must Have)
- [ ] Downtown area only (~0.3 sq mi)
- [ ] Main Avenue street
- [ ] Train depot
- [ ] Small section of Animas River
- [ ] One mountain viewpoint
- [ ] 5-10 enterable interiors

#### Vehicles (✅ Must Have)
- [ ] 3 land vehicles (car, truck, motorcycle)
- [ ] 1 train (single locomotive + 2 cars)
- [ ] 1 boat (kayak)

#### Gameplay (✅ Must Have)
- [ ] On-foot movement + basic combat
- [ ] Driving physics
- [ ] Train operation (drive on tracks)
- [ ] 1 wanted star system
- [ ] Basic economy (cash, one purchasable)

#### Content (✅ Must Have)
- [ ] 5 story missions (proof of narrative)
- [ ] 10 side activities (races, etc.)
- [ ] Day/night cycle
- [ ] Basic weather (sunny, rain)

#### Technical (✅ Must Have)
- [ ] 30 FPS on mid-range PC
- [ ] Basic NPC population
- [ ] Collision/physics

### MVP Cut List (Save for Later)

- ❌ Silverton area
- ❌ Purgatory ski resort
- ❌ Full faction system
- ❌ Property ownership
- ❌ Aircraft
- ❌ Advanced weather (blizzards, etc.)
- ❌ Multiplayer

### MVP Development Estimate

| Component | Time (Solo) | Time (Small Team) |
|-----------|-------------|-------------------|
| GIS Pipeline | 2-3 months | 1 month |
| World Art | 4-6 months | 2-3 months |
| Core Systems | 3-4 months | 1-2 months |
| Content | 3-4 months | 1-2 months |
| Polish | 2-3 months | 1-2 months |
| **Total** | **14-20 months** | **6-10 months** |

### MVP Success Criteria

1. **Technical:** GIS data successfully imported and stylized
2. **Aesthetic:** "Neon Alpine" look achieved and distinctive
3. **Gameplay:** Train mission is fun and unique
4. **Interest:** Demo generates social media engagement

---

## Development Roadmap

### Phase 0: Proof of Concept (2-3 months)
- [ ] Acquire GIS data for downtown Durango
- [ ] Import terrain into Unreal Engine
- [ ] Import building footprints, extrude basic shapes
- [ ] Apply neon aesthetic shader test
- [ ] Playable walking demo

### Phase 1: MVP Development (6-9 months)
- [ ] Complete downtown area
- [ ] Implement vehicle physics
- [ ] Build train system
- [ ] Create 5 story missions
- [ ] Polish and playtest

### Phase 2: Alpha Expansion (6-9 months)
- [ ] Add Animas River corridor
- [ ] Add Purgatory area (summer version)
- [ ] Expand to 15 missions
- [ ] Add faction system
- [ ] Implement property ownership

### Phase 3: Beta / Content Complete (6 months)
- [ ] Add Silverton
- [ ] Complete story
- [ ] All vehicles
- [ ] All weather systems
- [ ] Full wanted system

### Phase 4: Polish & Launch (3 months)
- [ ] Performance optimization
- [ ] Bug fixing
- [ ] Localization
- [ ] Marketing campaign
- [ ] Launch!

---

## Technical Research Summary

### GIS Data Sources Identified

#### Terrain/Elevation
| Source | Resolution | Format | Cost |
|--------|------------|--------|------|
| USGS 3DEP | 1-meter | GeoTIFF/IMG | Free |
| Colorado LiDAR | Sub-meter | LAS/LAZ | Free |
| Cesium World Terrain | Variable | Streaming | Free tier |

#### Building Footprints
| Source | Coverage | Format | Cost |
|--------|----------|--------|------|
| Microsoft AI | USA-wide | GeoJSON | Free |
| OpenStreetMap | Variable | OSM/PBF | Free |
| City of Durango | City limits | Shapefile | Free (request) |

#### Roads/Infrastructure
| Source | Type | Format | Cost |
|--------|------|--------|------|
| OpenStreetMap | Roads, POIs | OSM | Free |
| Colorado DOT | Highways | Shapefile | Free |
| City of Durango | Local roads | Shapefile | Free |

### Engine Decision Matrix

| Criteria | Unreal 5 | Unity | Godot |
|----------|----------|-------|-------|
| GIS Support | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐ |
| Visual Quality | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ |
| Learning Curve | ⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| Cost | Free* | Free* | Free |
| Community | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| Vehicle Physics | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ |

**Recommendation:** Unreal Engine 5 + Cesium for serious development, Godot for solo/learning prototype.

### Comparable Projects Studied

1. **Microsoft Flight Simulator**
   - Bing Maps + Azure AI procedural generation
   - ~400 cities with photogrammetry
   - Proves global-scale GIS is possible

2. **The Crew**
   - 1:15 scale USA
   - Hand-designed landmarks, procedural fill
   - ~40 min coast-to-coast drive

3. **Yakuza Series**
   - 1:1 scale small districts of Japanese cities
   - Extreme detail in small area
   - Model for our Downtown scope

---

## Appendix: GIS Data Sources

### Primary Sources for Durango

```markdown
## City of Durango Official GIS
- Website: https://www.durangoco.gov/390/GIS-Maps
- ArcGIS Portal: https://data-cityofdurango.opendata.arcgis.com/
- Request Form: https://survey123.arcgis.com/share/50ed1c6a7496486794d2723b0bdb0f3c
- Contains: Parcels, utilities, zoning, some building data

## Colorado State GIS
- Portal: https://geodata.colorado.gov/
- Contains: Statewide terrain, roads, boundaries

## OpenStreetMap Colorado Extract
- Download: https://download.geofabrik.de/north-america/us/colorado.html
- Format: OSM PBF, Shapefiles
- Contains: Roads, buildings, POIs

## Microsoft Building Footprints
- GitHub: https://github.com/microsoft/USBuildingFootprints
- Contains: AI-generated building outlines for all USA
- Format: GeoJSON

## USGS 3DEP (Terrain)
- Portal: https://apps.nationalmap.gov/downloader/
- Contains: 1-meter DEM for Colorado
- Format: GeoTIFF

## Colorado LiDAR
- Clearinghouse: https://coloradohazardmapping.com/lidarDownload
- Contains: Point cloud data for detailed terrain
- Format: LAS/LAZ
```

### Tools Required

```markdown
## GIS Processing
- QGIS (Free) - Data viewing, transformation, export
- FME (Commercial) - Advanced data pipeline automation
- Houdini ($$) - Procedural processing, game-ready export

## 3D Processing
- Blender (Free) - Building detail, stylization
- SpeedTree (Commercial) - Vegetation
- World Machine (Commercial) - Terrain enhancement

## Game Engine
- Unreal Engine 5 (Free until $1M revenue)
- Cesium for Unreal (Free plugin + optional subscription)
```

---

## Next Steps

1. **Immediately:** Research and download actual GIS data sources
2. **Week 1-2:** Import terrain into Unreal, test Cesium pipeline
3. **Week 3-4:** Import OSM building data, test extrusion
4. **Month 2:** Create "Neon Alpine" shader prototype
5. **Month 3:** Walking demo of single city block

---

## Document History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-01-28 | Initial creation |

---

*"In Durango, the powder's always fresh—whether you're on the slopes or running from the law."*
