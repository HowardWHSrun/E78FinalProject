// Peak Identification Database - Band 7 (1 GHz - 6 GHz)
// Turner Engineering Corporation - EMC Testing Support
// 
// ========================================================================
// BAND 7: SUPER HIGH FREQUENCY (SHF) - LOWER PORTION
// ========================================================================
// 
// Frequency Range: 960 MHz - 6 GHz
// Total Allocations: ~55 frequency segments
// Spectrum Coverage: Lower SHF including cellular, PCS, WiFi, and satellite
// 
// KEY SERVICES COVERED:
// • Cellular and PCS Systems:
//   - GSM/CDMA cellular (1710-1980 MHz)
//   - PCS bands (1850-1990 MHz)
//   - AWS bands (1710-2180 MHz)
// • WiFi and Unlicensed:
//   - 2.4 GHz ISM band (2400-2500 MHz)
//   - 5 GHz U-NII bands (5150-5925 MHz)
// • Satellite Services:
//   - GPS L1 (1575.42 MHz)
//   - Iridium (1616-1626.5 MHz)
// • Aviation:
//   - DME (Distance Measuring Equipment)
//   - TCAS (Traffic Collision Avoidance)
//   - Secondary radar (1030/1090 MHz)
// • Amateur Radio:
//   - 23 cm band (1240-1300 MHz)
//   - 13 cm band (2300-2450 MHz)
// • Fixed Microwave Links
// • Radio Astronomy (passive bands)
// 
// NOTABLE FREQUENCIES:
// • 1030/1090 MHz - Aviation transponders
// • 1575.42 MHz - GPS L1 frequency
// • 1710-1755/2110-2155 MHz - AWS cellular
// • 1850-1910/1930-1990 MHz - PCS
// • 2400-2500 MHz - WiFi, Bluetooth, ISM
// • 5150-5925 MHz - WiFi, U-NII bands
// 
// FCC PART REFERENCES:
// • Part 15: Unlicensed devices (WiFi)
// • Part 22: Cellular services
// • Part 24: Personal communications
// • Part 25: Satellite communications
// • Part 27: Wireless communications
// • Part 87: Aviation services
// • Part 97: Amateur radio
// • Part 101: Fixed microwave
// 
// ITU FOOTNOTES: Extensive 5.xxx series covering satellite
// coordination, cellular harmonization, and passive service protection
// 
// TECHNICAL NOTES:
// • Significant atmospheric attenuation
// • High-capacity data transmission
// • Advanced digital modulation
// • Beam-forming and MIMO technologies
// • Rain fade considerations
// • Passive service protection requirements
// 
// ========================================================================

const peakIdentificationBand7 = [
    {
        startFreq: 960.0,
        endFreq: 1164.0,
        unit: 'MHz',
        primaryService: 'AERONAUTICAL MOBILE (R) 5.327A; AERONAUTICAL RADIONAVIGATION 5.328 5.328AA',
        secondaryService: 'AERONAUTICAL MOBILE (R) 5.327A; AERONAUTICAL RADIONAVIGATION 5.328 5.328AA',
        usAllocations: 'AERONAUTICAL MOBILE (R) 5.327A; AERONAUTICAL RADIONAVIGATION 5.328 US224',
        notes: '',
        fccPart: 'Aviation (87)',
        description: 'Aeronautical Mobile (R) and Aeronautical Radionavigation services.',
        band: 'UHF'
    },
    {
        startFreq: 1164.0,
        endFreq: 1215.0,
        unit: 'MHz',
        primaryService: 'AERONAUTICAL RADIONAVIGATION 5.328; RADIONAVIGATION-SATELLITE (space-to-Earth) (space-to-space) 5.328B 5.328A',
        secondaryService: 'AERONAUTICAL RADIONAVIGATION 5.328; RADIONAVIGATION-SATELLITE (space-to-Earth) (space-to-space) 5.328B 5.328A',
        usAllocations: 'AERONAUTICAL RADIONAVIGATION 5.328; RADIONAVIGATION-SATELLITE (space-to-Earth) (space-to-space) 5.328A US224',
        notes: '',
        fccPart: '',
        description: 'Aeronautical Radionavigation and Radionavigation-Satellite services.',
        band: 'UHF'
    },
    {
        startFreq: 1215.0,
        endFreq: 1240.0,
        unit: 'MHz',
        primaryService: 'EARTH EXPLORATION-SATELLITE (active); RADIOLOCATION; RADIONAVIGATION-SATELLITE (space-to-Earth) (space-to-space) 5.328B 5.329 5.329A; SPACE RESEARCH (active) 5.330 5.331 5.332',
        secondaryService: 'EARTH EXPLORATION-SATELLITE (active); RADIOLOCATION; RADIONAVIGATION-SATELLITE (space-to-Earth) (space-to-space) 5.328B 5.329 5.329A; SPACE RESEARCH (active) 5.330 5.331 5.332',
        usAllocations: 'EARTH EXPLORATION-SATELLITE (active); RADIOLOCATION G56; RADIONAVIGATION-SATELLITE (space-to-Earth) (space-to-space) G132; SPACE RESEARCH (active) 5.332',
        notes: 'Earth exploration-satellite (active); Space research (active)',
        fccPart: '',
        description: 'Earth Exploration-Satellite, Radiolocation, Radionavigation-Satellite, and Space Research services.',
        band: 'UHF'
    },
    {
        startFreq: 1240.0,
        endFreq: 1300.0,
        unit: 'MHz',
        primaryService: 'EARTH EXPLORATION-SATELLITE (active); RADIOLOCATION; RADIONAVIGATION-SATELLITE (space-to-Earth) (space-to-space) 5.328B 5.329 5.329A; SPACE RESEARCH (active); Amateur 5.282 5.330 5.331 5.332 5.335 5.335A',
        secondaryService: 'EARTH EXPLORATION-SATELLITE (active); RADIOLOCATION; RADIONAVIGATION-SATELLITE (space-to-Earth) (space-to-space) 5.328B 5.329 5.329A; SPACE RESEARCH (active); Amateur 5.282 5.330 5.331 5.332 5.335 5.335A',
        usAllocations: 'EARTH EXPLORATION-SATELLITE (active); RADIOLOCATION G56; SPACE RESEARCH (active); AERONAUTICAL RADIONAVIGATION 5.332 5.335',
        notes: 'AERONAUTICAL RADIONAVIGATION; Amateur; Earth exploration-satellite (active); Space research (active) 5.282',
        fccPart: 'Amateur Radio (97)',
        description: 'Earth Exploration-Satellite, Radiolocation, Radionavigation-Satellite, Space Research, and Amateur services.',
        band: 'UHF'
    },
    {
        startFreq: 1300.0,
        endFreq: 1350.0,
        unit: 'MHz',
        primaryService: 'RADIOLOCATION; AERONAUTICAL RADIONAVIGATION 5.337; RADIONAVIGATION-SATELLITE (Earth-to-space) 5.149 5.337A',
        secondaryService: 'RADIOLOCATION; AERONAUTICAL RADIONAVIGATION 5.337; RADIONAVIGATION-SATELLITE (Earth-to-space) 5.149 5.337A',
        usAllocations: 'AERONAUTICAL RADIONAVIGATION 5.337; Radiolocation G2 US342',
        notes: 'AERONAUTICAL RADIONAVIGATION 5.337 US342',
        fccPart: 'Aviation (87)',
        description: 'Radiolocation, Aeronautical Radionavigation, and Radionavigation-Satellite services.',
        band: 'UHF'
    },
    {
        startFreq: 1350.0,
        endFreq: 1390.0,
        unit: 'MHz',
        primaryService: 'FIXED; MOBILE; RADIOLOCATION 5.149 5.338 5.338A 5.339',
        secondaryService: 'RADIOLOCATION 5.338A 5.149 5.334 5.339',
        usAllocations: 'FIXED; MOBILE; RADIOLOCATION G2 5.334 5.339 US342 US385 G27 G114',
        notes: '5.334 5.339 US342 US385',
        fccPart: '',
        description: 'Fixed, Mobile, and Radiolocation services.',
        band: 'UHF'
    },
    {
        startFreq: 1390.0,
        endFreq: 1395.0,
        unit: 'MHz',
        primaryService: 'FIXED; MOBILE; RADIOLOCATION 5.149 5.338 5.338A 5.339',
        secondaryService: 'RADIOLOCATION 5.338A 5.149 5.334 5.339',
        usAllocations: '5.339 US79 US342 US385',
        notes: 'FIXED; MOBILE except aeronautical mobile 5.339 US79 US342 US385 NG338A',
        fccPart: 'Wireless Communications (27)',
        description: 'Fixed, Mobile, and Radiolocation services.',
        band: 'UHF'
    },
    {
        startFreq: 1395.0,
        endFreq: 1400.0,
        unit: 'MHz',
        primaryService: 'FIXED; MOBILE; RADIOLOCATION 5.149 5.338 5.338A 5.339',
        secondaryService: 'RADIOLOCATION 5.338A 5.149 5.334 5.339',
        usAllocations: 'LAND MOBILE (medical telemetry and medical telecommand) 5.339 US79 US342 US385',
        notes: '',
        fccPart: 'Personal Radio (95)',
        description: 'Fixed, Mobile, Radiolocation, and Land Mobile services for medical telemetry.',
        band: 'UHF'
    },
    {
        startFreq: 1400.0,
        endFreq: 1427.0,
        unit: 'MHz',
        primaryService: 'EARTH EXPLORATION-SATELLITE (passive); RADIO ASTRONOMY; SPACE RESEARCH (passive) 5.340 5.341',
        secondaryService: 'EARTH EXPLORATION-SATELLITE (passive); RADIO ASTRONOMY; SPACE RESEARCH (passive) 5.340 5.341',
        usAllocations: 'EARTH EXPLORATION-SATELLITE (passive); RADIO ASTRONOMY US74; SPACE RESEARCH (passive) 5.341 US246',
        notes: '',
        fccPart: '',
        description: 'Passive services including Earth Exploration-Satellite, Radio Astronomy, and Space Research.',
        band: 'UHF'
    },
    {
        startFreq: 1427.0,
        endFreq: 1429.5,
        unit: 'MHz',
        primaryService: 'SPACE OPERATION (Earth-to-space); FIXED; MOBILE except aeronautical mobile 5.341A 5.341B 5.341C 5.338A 5.341',
        secondaryService: 'FIXED; MOBILE 5.341B 5.341C 5.343 5.341 US79 US350 NG338A',
        usAllocations: 'LAND MOBILE (medical telemetry and medical telecommand) US350; LAND MOBILE (telemetry and telecommand); Fixed (telemetry)',
        notes: '',
        fccPart: 'Private Land Mobile (90); Personal Radio (95)',
        description: 'Space Operation, Fixed, Mobile, and Land Mobile services for telemetry and telecommand.',
        band: 'UHF'
    },
    {
        startFreq: 1429.5,
        endFreq: 1432.0,
        unit: 'MHz',
        primaryService: 'SPACE OPERATION (Earth-to-space); FIXED; MOBILE except aeronautical mobile 5.341A 5.341B 5.341C 5.338A 5.341',
        secondaryService: 'FIXED; MOBILE 5.341B 5.341C 5.343 5.341 US79 US350 NG338A',
        usAllocations: 'FIXED (telemetry and telecommand); LAND MOBILE (telemetry and telecommand) 5.341 US79 US350',
        notes: 'FIXED; MOBILE except aeronautical mobile 5.341 US79 US350 NG338A',
        fccPart: '',
        description: 'Space Operation, Fixed, Mobile, and Land Mobile services for telemetry and telecommand.',
        band: 'UHF'
    },
    {
        startFreq: 1432.0,
        endFreq: 1435.0,
        unit: 'MHz',
        primaryService: 'SPACE OPERATION (Earth-to-space); FIXED; MOBILE except aeronautical mobile 5.341A 5.341B 5.341C 5.338A 5.341 5.342',
        secondaryService: 'FIXED; MOBILE 5.341B 5.341C 5.343 5.341 US79 US350 NG338A',
        usAllocations: '5.341 US83',
        notes: 'FIXED; MOBILE except aeronautical mobile 5.341 US83 NG338A',
        fccPart: 'Wireless Communications (27)',
        description: 'Space Operation, Fixed, and Mobile services.',
        band: 'UHF'
    },
    {
        startFreq: 1435.0,
        endFreq: 1518.0,
        unit: 'MHz',
        primaryService: 'FIXED; MOBILE except aeronautical mobile 5.346; BROADCASTING; BROADCASTING-SATELLITE 5.208B 5.341 5.342 5.345',
        secondaryService: 'FIXED; MOBILE 5.341B 5.343 5.346A; BROADCASTING; BROADCASTING-SATELLITE 5.208B 5.341 5.344 5.345',
        usAllocations: 'MOBILE (aeronautical telemetry) US338A; FIXED US84 US343',
        notes: 'MOBILE (aeronautical telemetry) US338A',
        fccPart: 'Aviation (87)',
        description: 'Fixed, Mobile, Broadcasting, and Broadcasting-Satellite services, including aeronautical telemetry.',
        band: 'UHF'
    },
    {
        startFreq: 1518.0,
        endFreq: 1525.0,
        unit: 'MHz',
        primaryService: 'FIXED; MOBILE except aeronautical mobile; MOBILE-SATELLITE (space-to-Earth) 5.348 5.348A 5.348B 5.351A 5.341 5.342',
        secondaryService: 'FIXED; MOBILE 5.343; MOBILE-SATELLITE (space-to-Earth) 5.348 5.348A 5.348B 5.351A 5.341 5.344',
        usAllocations: 'MOBILE (aeronautical telemetry) US338A; FIXED US84 US343',
        notes: 'MOBILE (aeronautical telemetry) US338A',
        fccPart: 'Aviation (87)',
        description: 'Fixed, Mobile, and Mobile-Satellite services, including aeronautical telemetry.',
        band: 'UHF'
    },
    {
        startFreq: 1525.0,
        endFreq: 1530.0,
        unit: 'MHz',
        primaryService: 'SPACE OPERATION (space-to-Earth); FIXED; MOBILE-SATELLITE (space-to-Earth) 5.208B 5.351A; Earth exploration-satellite; Mobile except aeronautical mobile 5.349 5.341 5.342 5.350 5.351 5.352A 5.354',
        secondaryService: 'SPACE OPERATION (space-to-Earth); MOBILE-SATELLITE (space-to-Earth) 5.208B 5.351A; Earth exploration-satellite; Fixed; Mobile 5.343 5.341 5.351 5.354',
        usAllocations: 'MOBILE-SATELLITE (space-to-Earth) US315 US380',
        notes: '',
        fccPart: 'Satellite Communications (25); Maritime (80)',
        description: 'Space Operation, Fixed, Mobile-Satellite, and Earth Exploration-Satellite services.',
        band: 'UHF'
    },
    {
        startFreq: 1530.0,
        endFreq: 1535.0,
        unit: 'MHz',
        primaryService: 'SPACE OPERATION (space-to-Earth); MOBILE-SATELLITE (space-to-Earth) 5.208B 5.351A 5.353A; Earth exploration-satellite; Fixed; Mobile except aeronautical mobile 5.341 5.342 5.351 5.354',
        secondaryService: 'SPACE OPERATION (space-to-Earth); MOBILE-SATELLITE (space-to-Earth) 5.208B 5.351A 5.353A; Earth exploration-satellite; Fixed; Mobile 5.343 5.341 5.351 5.354',
        usAllocations: 'MOBILE-SATELLITE (space-to-Earth) US315 US380',
        notes: '',
        fccPart: 'Satellite Communications (25); Maritime (80)',
        description: 'Space Operation, Mobile-Satellite, and Earth Exploration-Satellite services.',
        band: 'UHF'
    },
    {
        startFreq: 1535.0,
        endFreq: 1559.0,
        unit: 'MHz',
        primaryService: 'MOBILE-SATELLITE (space-to-Earth) 5.208B 5.351A 5.341 5.351 5.353A 5.354 5.355 5.356 5.357 5.357A 5.359 5.362A',
        secondaryService: 'MOBILE-SATELLITE (space-to-Earth) 5.208B 5.351A 5.341 5.351 5.353A 5.354 5.355 5.356 5.357 5.357A 5.359 5.362A',
        usAllocations: 'MOBILE-SATELLITE (space-to-Earth) US308 US309 US315 US380 5.341 5.351 5.356',
        notes: '',
        fccPart: 'Satellite Communications (25); Maritime (80); Aviation (87)',
        description: 'Mobile-Satellite (space-to-Earth) services.',
        band: 'UHF'
    },
    {
        startFreq: 1559.0,
        endFreq: 1610.0,
        unit: 'MHz',
        primaryService: 'AERONAUTICAL RADIONAVIGATION; RADIONAVIGATION-SATELLITE (space-to-Earth) (space-to-space) 5.208B 5.328B 5.329A 5.341',
        secondaryService: 'AERONAUTICAL RADIONAVIGATION; RADIONAVIGATION-SATELLITE (space-to-Earth) (space-to-space) 5.208B 5.328B 5.329A 5.341',
        usAllocations: 'AERONAUTICAL RADIONAVIGATION; RADIONAVIGATION-SATELLITE (space-to-Earth)(space-to-space) 5.341 US85 US208 US260',
        notes: '',
        fccPart: 'Aviation (87)',
        description: 'Aeronautical Radionavigation and Radionavigation-Satellite services.',
        band: 'UHF'
    },
    {
        startFreq: 1610.0,
        endFreq: 1610.6,
        unit: 'MHz',
        primaryService: 'MOBILE-SATELLITE (Earth-to-space) 5.351A; AERONAUTICAL RADIONAVIGATION 5.341 5.355 5.359 5.364 5.366 5.367 5.368 5.369 5.371 5.372',
        secondaryService: 'MOBILE-SATELLITE (Earth-to-space) 5.351A; AERONAUTICAL RADIONAVIGATION; RADIODETERMINATION-SATELLITE (Earth-to-space) 5.341 5.364 5.366 5.367 5.368 5.370 5.372',
        usAllocations: 'MOBILE-SATELLITE (Earth-to-space) US319 US380; AERONAUTICAL RADIONAVIGATION US260; RADIODETERMINATION-SATELLITE (Earth-to-space) 5.341 5.364 5.366 5.367 5.368 5.372 US208',
        notes: '',
        fccPart: 'Satellite Communications (25); Aviation (87)',
        description: 'Mobile-Satellite, Aeronautical Radionavigation, and Radiodetermination-Satellite services.',
        band: 'UHF'
    },
    {
        startFreq: 1610.6,
        endFreq: 1613.8,
        unit: 'MHz',
        primaryService: 'MOBILE-SATELLITE (Earth-to-space) 5.351A; RADIO ASTRONOMY; AERONAUTICAL RADIONAVIGATION 5.149 5.341 5.355 5.359 5.364 5.366 5.367 5.368 5.369 5.371 5.372',
        secondaryService: 'MOBILE-SATELLITE (Earth-to-space) 5.351A; RADIO ASTRONOMY; AERONAUTICAL RADIONAVIGATION; RADIODETERMINATION-SATELLITE (Earth-to-space) 5.149 5.341 5.364 5.366 5.367 5.368 5.370 5.372',
        usAllocations: 'MOBILE-SATELLITE (Earth-to-space) US319 US380; RADIO ASTRONOMY; AERONAUTICAL RADIONAVIGATION US260; RADIODETERMINATION-SATELLITE (Earth-to-space) 5.341 5.364 5.366 5.367 5.368 5.372 US208 US342',
        notes: '',
        fccPart: '',
        description: 'Mobile-Satellite, Radio Astronomy, Aeronautical Radionavigation, and Radiodetermination-Satellite services.',
        band: 'UHF'
    },
    {
        startFreq: 1613.8,
        endFreq: 1621.35,
        unit: 'MHz',
        primaryService: 'MOBILE-SATELLITE (Earth-to-space) 5.351A; AERONAUTICAL RADIONAVIGATION; Mobile-satellite (space-to-Earth) 5.208B 5.341 5.355 5.359 5.364 5.365 5.366 5.367 5.368 5.369 5.371 5.372',
        secondaryService: 'MOBILE-SATELLITE (Earth-to-space) 5.351A; AERONAUTICAL RADIONAVIGATION; RADIODETERMINATION-SATELLITE (Earth-to-space); Mobile-satellite (space-to-Earth) 5.208B 5.341 5.364 5.365 5.366 5.367 5.368 5.370 5.372',
        usAllocations: 'MOBILE-SATELLITE (Earth-to-space) US319 US380; AERONAUTICAL RADIONAVIGATION US260; RADIODETERMINATION-SATELLITE (Earth-to-space); Mobile-satellite (space-to-Earth) 5.341 5.364 5.365 5.366 5.367 5.368 5.372 US208',
        notes: '',
        fccPart: '',
        description: 'Mobile-Satellite, Aeronautical Radionavigation, and Radiodetermination-Satellite services.',
        band: 'UHF'
    },
    {
        startFreq: 1621.35,
        endFreq: 1626.5,
        unit: 'MHz',
        primaryService: 'MARITIME MOBILE-SATELLITE (space-to-Earth) 5.373 5.373A; MOBILE-SATELLITE (Earth-to-space) 5.351A; AERONAUTICAL RADIONAVIGATION; Mobile-satellite (space-to-Earth) except maritime mobile-satellite (space-to-Earth) 5.208B 5.341 5.355 5.359 5.364 5.365 5.366 5.367 5.368 5.369 5.371 5.372',
        secondaryService: 'MARITIME MOBILE-SATELLITE (space-to-Earth) 5.373 5.373A; MOBILE-SATELLITE (Earth-to-space) 5.351A; AERONAUTICAL RADIONAVIGATION; RADIODETERMINATION-SATELLITE (Earth-to-space); Mobile-satellite (space-to-Earth) except maritime mobile-satellite (space-to-Earth) 5.208B 5.341 5.364 5.365 5.366 5.367 5.368 5.370 5.372',
        usAllocations: 'MOBILE-SATELLITE (Earth-to-space) US319 US380; AERONAUTICAL RADIONAVIGATION US260; RADIODETERMINATION-SATELLITE (Earth-to-space); Mobile-satellite (space-to-Earth) 5.341 5.364 5.365 5.366 5.367 5.368 5.372 US208',
        notes: '',
        fccPart: '',
        description: 'Maritime Mobile-Satellite, Mobile-Satellite, Aeronautical Radionavigation, and Radiodetermination-Satellite services.',
        band: 'UHF'
    },
    {
        startFreq: 1626.5,
        endFreq: 1660.0,
        unit: 'MHz',
        primaryService: 'MOBILE-SATELLITE (Earth-to-space) 5.351A 5.341 5.351 5.353A 5.354 5.355 5.357A 5.359 5.362A 5.374 5.375 5.376',
        secondaryService: 'MOBILE-SATELLITE (Earth-to-space) 5.351A 5.341 5.351 5.353A 5.354 5.355 5.357A 5.359 5.362A 5.374 5.375 5.376',
        usAllocations: 'MOBILE-SATELLITE (Earth-to-space) US308 US309 US315 US380 5.341 5.351 5.375',
        notes: '',
        fccPart: 'Satellite Communications (25); Maritime (80); Aviation (87)',
        description: 'Mobile-Satellite (Earth-to-space) services.',
        band: 'UHF'
    },
    {
        startFreq: 1660.0,
        endFreq: 1660.5,
        unit: 'MHz',
        primaryService: 'MOBILE-SATELLITE (Earth-to-space) 5.351A; RADIO ASTRONOMY 5.149 5.341 5.351 5.354 5.362A 5.376A',
        secondaryService: 'MOBILE-SATELLITE (Earth-to-space) 5.351A; RADIO ASTRONOMY 5.149 5.341 5.351 5.354 5.362A 5.376A',
        usAllocations: 'MOBILE-SATELLITE (Earth-to-space) US308 US309 US380; RADIO ASTRONOMY 5.341 5.351 US342',
        notes: '',
        fccPart: 'Satellite Communications (25); Aviation (87)',
        description: 'Mobile-Satellite and Radio Astronomy services.',
        band: 'UHF'
    },
    {
        startFreq: 1660.5,
        endFreq: 1668.0,
        unit: 'MHz',
        primaryService: 'RADIO ASTRONOMY; SPACE RESEARCH (passive); Fixed; Mobile except aeronautical mobile 5.149 5.341 5.379 5.379A',
        secondaryService: 'RADIO ASTRONOMY; SPACE RESEARCH (passive); Fixed; Mobile except aeronautical mobile 5.149 5.341 5.379 5.379A',
        usAllocations: 'RADIO ASTRONOMY US74; SPACE RESEARCH (passive) 5.341 US246',
        notes: '',
        fccPart: '',
        description: 'Passive services including Radio Astronomy and Space Research, plus Fixed and Mobile.',
        band: 'UHF'
    },
    {
        startFreq: 1668.0,
        endFreq: 1668.4,
        unit: 'MHz',
        primaryService: 'MOBILE-SATELLITE (Earth-to-space) 5.351A 5.379B 5.379C; RADIO ASTRONOMY; SPACE RESEARCH (passive); Fixed; Mobile except aeronautical mobile 5.149 5.341 5.379 5.379A',
        secondaryService: 'MOBILE-SATELLITE (Earth-to-space) 5.351A 5.379B 5.379C; RADIO ASTRONOMY; SPACE RESEARCH (passive); Fixed; Mobile except aeronautical mobile 5.149 5.341 5.379 5.379A',
        usAllocations: 'RADIO ASTRONOMY US74; SPACE RESEARCH (passive) 5.341 US246',
        notes: '',
        fccPart: '',
        description: 'Mobile-Satellite, Radio Astronomy, Space Research, Fixed, and Mobile services.',
        band: 'UHF'
    },
    {
        startFreq: 1668.4,
        endFreq: 1670.0,
        unit: 'MHz',
        primaryService: 'METEOROLOGICAL AIDS; FIXED; MOBILE except aeronautical mobile; MOBILE-SATELLITE (Earth-to-space) 5.351A 5.379B 5.379C; RADIO ASTRONOMY 5.149 5.341 5.379D 5.379E',
        secondaryService: 'METEOROLOGICAL AIDS; FIXED; MOBILE except aeronautical mobile; MOBILE-SATELLITE (Earth-to-space) 5.351A 5.379B 5.379C; RADIO ASTRONOMY 5.149 5.341 5.379D 5.379E',
        usAllocations: 'METEOROLOGICAL AIDS (radiosonde); RADIO ASTRONOMY US74 5.341 US99 US342',
        notes: '',
        fccPart: '',
        description: 'Meteorological Aids, Fixed, Mobile, Mobile-Satellite, and Radio Astronomy services.',
        band: 'UHF'
    },
    {
        startFreq: 1670.0,
        endFreq: 1675.0,
        unit: 'MHz',
        primaryService: 'METEOROLOGICAL AIDS; FIXED; METEOROLOGICAL-SATELLITE (space-to-Earth); MOBILE; MOBILE-SATELLITE (Earth-to-space) 5.351A 5.379B 5.341 5.379D 5.379E 5.380A',
        secondaryService: 'METEOROLOGICAL AIDS; FIXED; METEOROLOGICAL-SATELLITE (space-to-Earth); MOBILE; MOBILE-SATELLITE (Earth-to-space) 5.351A 5.379B 5.341 5.379D 5.379E 5.380A',
        usAllocations: '5.341 US211 US362',
        notes: 'FIXED; MOBILE except aeronautical mobile 5.341 US211 US362',
        fccPart: 'Wireless Communications (27)',
        description: 'Meteorological Aids, Fixed, Meteorological-Satellite, Mobile, and Mobile-Satellite services.',
        band: 'UHF'
    },
    {
        startFreq: 1675.0,
        endFreq: 1690.0,
        unit: 'MHz',
        primaryService: 'METEOROLOGICAL AIDS; FIXED; METEOROLOGICAL-SATELLITE (space-to-Earth); MOBILE except aeronautical mobile 5.341',
        secondaryService: 'METEOROLOGICAL AIDS; FIXED; METEOROLOGICAL-SATELLITE (space-to-Earth); MOBILE except aeronautical mobile 5.341',
        usAllocations: 'METEOROLOGICAL AIDS (radiosonde); METEOROLOGICAL-SATELLITE (space-to-Earth) US88 5.341 US211 US289',
        notes: '',
        fccPart: '',
        description: 'Meteorological Aids, Fixed, Meteorological-Satellite, and Mobile services.',
        band: 'UHF'
    },
    {
        startFreq: 1690.0,
        endFreq: 1695.0,
        unit: 'MHz',
        primaryService: 'METEOROLOGICAL AIDS; METEOROLOGICAL-SATELLITE (space-to-Earth); Fixed; Mobile except aeronautical mobile 5.289 5.341 5.382',
        secondaryService: 'METEOROLOGICAL AIDS; METEOROLOGICAL-SATELLITE (space-to-Earth); Fixed; Mobile except aeronautical mobile 5.289 5.341 5.381',
        usAllocations: 'METEOROLOGICAL AIDS (radiosonde); METEOROLOGICAL-SATELLITE (space-to-Earth) US88 5.341 US211 US289',
        notes: '',
        fccPart: '',
        description: 'Meteorological Aids, Meteorological-Satellite, Fixed, and Mobile services.',
        band: 'UHF'
    },
    {
        startFreq: 1695.0,
        endFreq: 1700.0,
        unit: 'MHz',
        primaryService: 'METEOROLOGICAL AIDS; METEOROLOGICAL-SATELLITE (space-to-Earth); Fixed; Mobile except aeronautical mobile 5.289 5.341 5.382',
        secondaryService: 'METEOROLOGICAL AIDS; METEOROLOGICAL-SATELLITE (space-to-Earth); Fixed; Mobile except aeronautical mobile 5.289 5.341 5.381',
        usAllocations: 'METEOROLOGICAL-SATELLITE (space-to-Earth) US88',
        notes: 'FIXED; MOBILE except aeronautical mobile',
        fccPart: 'Wireless Communications (27)',
        description: 'Meteorological Aids, Meteorological-Satellite, Fixed, and Mobile services.',
        band: 'UHF'
    },
    {
        startFreq: 1700.0,
        endFreq: 1710.0,
        unit: 'MHz',
        primaryService: 'FIXED; METEOROLOGICAL-SATELLITE (space-to-Earth); MOBILE except aeronautical mobile 5.289 5.341',
        secondaryService: 'FIXED; METEOROLOGICAL-SATELLITE (space-to-Earth); MOBILE except aeronautical mobile 5.289 5.341 5.384',
        usAllocations: 'METEOROLOGICAL-SATELLITE (space-to-Earth) US88',
        notes: 'FIXED; MOBILE except aeronautical mobile',
        fccPart: 'Wireless Communications (27)',
        description: 'Fixed, Meteorological-Satellite, and Mobile services.',
        band: 'UHF'
    },
    {
        startFreq: 1710.0,
        endFreq: 1761.0,
        unit: 'MHz',
        primaryService: 'FIXED; MOBILE 5.384A 5.388A 5.388B 5.149 5.341 5.385 5.386 5.387 5.388',
        secondaryService: 'FIXED; MOBILE 5.384A 5.388A 5.388B 5.149 5.341 5.385 5.386 5.387 5.388',
        usAllocations: '5.341 US91 US378 US385',
        notes: 'FIXED; MOBILE',
        fccPart: 'RF Devices (15); Personal Communications (24); Satellite Communications (25); Wireless Communications (27); Fixed Microwave (101)',
        description: 'Fixed and Mobile services.',
        band: 'UHF'
    },
    {
        startFreq: 1761.0,
        endFreq: 1780.0,
        unit: 'MHz',
        primaryService: 'FIXED; MOBILE 5.384A 5.388A 5.388B 5.149 5.341 5.385 5.386 5.387 5.388',
        secondaryService: 'FIXED; MOBILE 5.384A 5.388A 5.388B 5.149 5.341 5.385 5.386 5.387 5.388',
        usAllocations: 'SPACE OPERATION (Earth-to-space) G42 5.341 US91 US378 US385',
        notes: 'FIXED; MOBILE',
        fccPart: 'RF Devices (15); Personal Communications (24); Satellite Communications (25); Wireless Communications (27); Fixed Microwave (101)',
        description: 'Fixed, Mobile, and Space Operation services.',
        band: 'UHF'
    },
    {
        startFreq: 1780.0,
        endFreq: 1850.0,
        unit: 'MHz',
        primaryService: 'FIXED; MOBILE 5.384A 5.388A 5.388B 5.149 5.341 5.385 5.386 5.387 5.388',
        secondaryService: 'FIXED; MOBILE 5.384A 5.388A 5.388B 5.149 5.341 5.385 5.386 5.387 5.388',
        usAllocations: 'FIXED; MOBILE; SPACE OPERATION (Earth-to-space) G42',
        notes: 'FIXED; MOBILE; Mobile-satellite NG33A',
        fccPart: 'RF Devices (15); Personal Communications (24); Satellite Communications (25); Wireless Communications (27); Fixed Microwave (101)',
        description: 'Fixed, Mobile, and Space Operation services.',
        band: 'UHF'
    },
    {
        startFreq: 1850.0,
        endFreq: 1930.0,
        unit: 'MHz',
        primaryService: 'FIXED; MOBILE 5.384A 5.388A 5.388B 5.149 5.341 5.385 5.386 5.387 5.388',
        secondaryService: 'FIXED; MOBILE 5.384A 5.388A 5.388B 5.149 5.341 5.385 5.386 5.387 5.388',
        usAllocations: 'FIXED; MOBILE; Mobile-satellite NG33A',
        notes: '',
        fccPart: 'RF Devices (15); Personal Communications (24); Satellite Communications (25); Wireless Communications (27); Fixed Microwave (101)',
        description: 'Fixed, Mobile, and Mobile-Satellite services.',
        band: 'UHF'
    },
    {
        startFreq: 1930.0,
        endFreq: 1970.0,
        unit: 'MHz',
        primaryService: 'FIXED; MOBILE 5.388A 5.388B 5.388',
        secondaryService: 'FIXED; MOBILE 5.388A 5.388B; Mobile-satellite (Earth-to-space) 5.388',
        usAllocations: 'FIXED; MOBILE; Mobile-satellite NG33A',
        notes: '',
        fccPart: 'RF Devices (15); Personal Communications (24); Satellite Communications (25); Wireless Communications (27); Fixed Microwave (101)',
        description: 'Fixed, Mobile, and Mobile-Satellite services.',
        band: 'UHF'
    },
    {
        startFreq: 1970.0,
        endFreq: 1980.0,
        unit: 'MHz',
        primaryService: 'FIXED; MOBILE 5.388A 5.388B 5.388',
        secondaryService: 'FIXED; MOBILE 5.388A 5.388B; Mobile-satellite (Earth-to-space) 5.388',
        usAllocations: 'FIXED; MOBILE; Mobile-satellite NG33A',
        notes: '',
        fccPart: 'RF Devices (15); Personal Communications (24); Satellite Communications (25); Wireless Communications (27); Fixed Microwave (101)',
        description: 'Fixed, Mobile, and Mobile-Satellite services.',
        band: 'UHF'
    },
    {
        startFreq: 1980.0,
        endFreq: 2000.0,
        unit: 'MHz',
        primaryService: 'FIXED; MOBILE; MOBILE-SATELLITE (Earth-to-space) 5.351A 5.388 5.389A 5.389B 5.389F',
        secondaryService: 'FIXED; MOBILE; MOBILE-SATELLITE (Earth-to-space) 5.351A 5.388 5.389A 5.389B 5.389F',
        usAllocations: 'FIXED; MOBILE; Mobile-satellite NG33A',
        notes: '',
        fccPart: 'RF Devices (15); Personal Communications (24); Satellite Communications (25); Wireless Communications (27); Fixed Microwave (101)',
        description: 'Fixed, Mobile, and Mobile-Satellite services.',
        band: 'UHF'
    },
    {
        startFreq: 2000.0,
        endFreq: 2010.0,
        unit: 'MHz',
        primaryService: 'FIXED; MOBILE; MOBILE-SATELLITE (Earth-to-space) 5.351A 5.388 5.389A 5.389B 5.389F',
        secondaryService: 'FIXED; MOBILE; MOBILE-SATELLITE (Earth-to-space) 5.351A 5.388 5.389A 5.389B 5.389F',
        usAllocations: 'FIXED; MOBILE; MOBILE-SATELLITE (Earth-to-space)',
        notes: '',
        fccPart: 'Satellite Communications (25); Wireless Communications (27)',
        description: 'Fixed, Mobile, and Mobile-Satellite services.',
        band: 'UHF'
    },
    {
        startFreq: 2010.0,
        endFreq: 2020.0,
        unit: 'MHz',
        primaryService: 'FIXED; MOBILE 5.388A 5.388B',
        secondaryService: 'FIXED; MOBILE; MOBILE-SATELLITE (Earth-to-space) 5.388 5.389C 5.389E',
        usAllocations: 'FIXED; MOBILE; MOBILE-SATELLITE (Earth-to-space)',
        notes: '',
        fccPart: 'Satellite Communications (25); Wireless Communications (27)',
        description: 'Fixed, Mobile, and Mobile-Satellite services.',
        band: 'UHF'
    },
    {
        startFreq: 2020.0,
        endFreq: 2025.0,
        unit: 'MHz',
        primaryService: 'FIXED; MOBILE 5.388A 5.388B',
        secondaryService: 'FIXED; MOBILE; MOBILE-SATELLITE (Earth-to-space) 5.388 5.389C 5.389E',
        usAllocations: 'FIXED; MOBILE; MOBILE-SATELLITE (Earth-to-space)',
        notes: '',
        fccPart: 'Satellite Communications (25); Wireless Communications (27)',
        description: 'Fixed, Mobile, and Mobile-Satellite services.',
        band: 'UHF'
    },
    {
        startFreq: 2025.0,
        endFreq: 2110.0,
        unit: 'MHz',
        primaryService: 'SPACE OPERATION (Earth-to-space) (space-to-space); EARTH EXPLORATION-SATELLITE (Earth-to-space) (space-to-space); FIXED; MOBILE 5.391; SPACE RESEARCH (Earth-to-space) (space-to-space) 5.392',
        secondaryService: 'SPACE OPERATION (Earth-to-space) (space-to-space); EARTH EXPLORATION-SATELLITE (Earth-to-space) (space-to-space); FIXED; MOBILE 5.391; SPACE RESEARCH (Earth-to-space) (space-to-space) 5.392',
        usAllocations: 'SPACE OPERATION (Earth-to-space) (space-to-space); EARTH EXPLORATION-SATELLITE (Earth-to-space) (space-to-space); SPACE RESEARCH (Earth-to-space) (space-to-space); FIXED; MOBILE 5.391 5.392 US90 US92 US222 US346 US347',
        notes: 'FIXED NG118; MOBILE 5.391; Space Operation (Earth-to-space) US94 5.392 US90 US92 US222 US346 US347',
        fccPart: 'Space Launch Services (26); TV Auxiliary Broadcasting (74F); Cable TV Relay (78); Local TV Transmission (101J)',
        description: 'Space Operation, Earth Exploration-Satellite, Fixed, Mobile, and Space Research services.',
        band: 'SHF'
    },
    {
        startFreq: 2110.0,
        endFreq: 2120.0,
        unit: 'MHz',
        primaryService: 'FIXED; MOBILE 5.388A 5.388B; SPACE RESEARCH (deep space) (Earth-to-space) 5.388',
        secondaryService: 'FIXED; MOBILE 5.388A 5.388B; SPACE RESEARCH (deep space) (Earth-to-space) 5.388',
        usAllocations: 'US252',
        notes: 'FIXED; MOBILE US252',
        fccPart: 'Public Mobile (22); Wireless Communications (27); Fixed Microwave (101)',
        description: 'Fixed, Mobile, and Space Research services.',
        band: 'SHF'
    },
    {
        startFreq: 2120.0,
        endFreq: 2160.0,
        unit: 'MHz',
        primaryService: 'FIXED; MOBILE 5.388A 5.388B',
        secondaryService: 'FIXED; MOBILE 5.388A 5.388B; Mobile-satellite (space-to-Earth) 5.388',
        usAllocations: 'FIXED; MOBILE NG41',
        notes: '',
        fccPart: '',
        description: 'Fixed and Mobile services.',
        band: 'SHF'
    },
    {
        startFreq: 2160.0,
        endFreq: 2170.0,
        unit: 'MHz',
        primaryService: 'FIXED; MOBILE 5.388A 5.388B',
        secondaryService: 'FIXED; MOBILE; MOBILE-SATELLITE (space-to-Earth) 5.388 5.389C 5.389E',
        usAllocations: 'FIXED; MOBILE NG41',
        notes: '',
        fccPart: '',
        description: 'Fixed, Mobile, and Mobile-Satellite services.',
        band: 'SHF'
    },
    {
        startFreq: 2170.0,
        endFreq: 2180.0,
        unit: 'MHz',
        primaryService: 'FIXED; MOBILE; MOBILE-SATELLITE (space-to-Earth) 5.351A 5.388 5.389A 5.389F',
        secondaryService: 'FIXED; MOBILE; MOBILE-SATELLITE (space-to-Earth) 5.351A 5.388 5.389A 5.389F',
        usAllocations: 'FIXED; MOBILE NG41',
        notes: '',
        fccPart: '',
        description: 'Fixed, Mobile, and Mobile-Satellite services.',
        band: 'SHF'
    },
    {
        startFreq: 2180.0,
        endFreq: 2200.0,
        unit: 'MHz',
        primaryService: 'FIXED; MOBILE; MOBILE-SATELLITE (space-to-Earth) 5.351A 5.388 5.389A 5.389F',
        secondaryService: 'FIXED; MOBILE; MOBILE-SATELLITE (space-to-Earth) 5.351A 5.388 5.389A 5.389F',
        usAllocations: 'FIXED; MOBILE; MOBILE-SATELLITE (space-to-Earth)',
        notes: '',
        fccPart: 'Satellite Communications (25); Wireless Communications (27)',
        description: 'Fixed, Mobile, and Mobile-Satellite services.',
        band: 'SHF'
    },
    {
        startFreq: 2200.0,
        endFreq: 2290.0,
        unit: 'MHz',
        primaryService: 'SPACE OPERATION (space-to-Earth) (space-to-space); EARTH EXPLORATION-SATELLITE (space-to-Earth) (space-to-space); FIXED; MOBILE 5.391 5.392',
        secondaryService: 'SPACE OPERATION (space-to-Earth) (space-to-space); EARTH EXPLORATION-SATELLITE (space-to-Earth) (space-to-space); FIXED; MOBILE 5.391 5.392',
        usAllocations: 'SPACE OPERATION (space-to-Earth) (space-to-space) US96; EARTH EXPLORATION-SATELLITE (space-to-Earth) (space-to-space); FIXED (line-of-sight only); MOBILE (line-of-sight only including aeronautical telemetry, but excluding flight testing of manned aircraft) 5.391; SPACE RESEARCH (space-to-Earth) (space-to-space) 5.392 US303',
        notes: 'US96 US303',
        fccPart: 'Space Launch Services (26)',
        description: 'Space Operation, Earth Exploration-Satellite, Fixed, Mobile, and Space Research services.',
        band: 'SHF'
    },
    {
        startFreq: 2290.0,
        endFreq: 2300.0,
        unit: 'MHz',
        primaryService: 'FIXED; MOBILE except aeronautical mobile; SPACE RESEARCH (deep space) (space-to-Earth)',
        secondaryService: 'FIXED; MOBILE except aeronautical mobile; SPACE RESEARCH (deep space) (space-to-Earth)',
        usAllocations: 'SPACE RESEARCH (deep space) (space-to-Earth)',
        notes: '',
        fccPart: '',
        description: 'Fixed, Mobile, and Space Research services.',
        band: 'SHF'
    },
    {
        startFreq: 2300.0,
        endFreq: 2305.0,
        unit: 'MHz',
        primaryService: 'FIXED; MOBILE 5.384A; Amateur; Radiolocation 5.150 5.282 5.395',
        secondaryService: 'FIXED; MOBILE 5.384A; RADIOLOCATION; Amateur 5.150 5.282 5.393 5.394',
        usAllocations: 'G122',
        notes: 'Amateur',
        fccPart: 'Amateur Radio (97)',
        description: 'Fixed, Mobile, Amateur, and Radiolocation services.',
        band: 'SHF'
    },
    {
        startFreq: 2305.0,
        endFreq: 2310.0,
        unit: 'MHz',
        primaryService: 'FIXED; MOBILE 5.384A; Amateur; Radiolocation 5.150 5.282 5.395',
        secondaryService: 'FIXED; MOBILE 5.384A; RADIOLOCATION; Amateur 5.150 5.282 5.393 5.394',
        usAllocations: 'US97 G122',
        notes: 'FIXED; MOBILE except aeronautical mobile; RADIOLOCATION; Amateur US97',
        fccPart: 'Wireless Communications (27); Amateur Radio (97)',
        description: 'Fixed, Mobile, Amateur, and Radiolocation services.',
        band: 'SHF'
    },
    {
        startFreq: 2310.0,
        endFreq: 2320.0,
        unit: 'MHz',
        primaryService: 'FIXED; MOBILE 5.384A; Amateur; Radiolocation 5.150 5.282 5.395',
        secondaryService: 'FIXED; MOBILE 5.384A; RADIOLOCATION; Amateur 5.150 5.282 5.393 5.394',
        usAllocations: 'Fixed; Mobile US100; Radiolocation G2 US97 US327',
        notes: 'FIXED; MOBILE; BROADCASTING-SATELLITE; RADIOLOCATION US97 US100 US327',
        fccPart: 'Wireless Communications (27)',
        description: 'Fixed, Mobile, Amateur, Radiolocation, and Broadcasting-Satellite services.',
        band: 'SHF'
    },
    {
        startFreq: 2320.0,
        endFreq: 2345.0,
        unit: 'MHz',
        primaryService: 'FIXED; MOBILE 5.384A; Amateur; Radiolocation 5.150 5.282 5.395',
        secondaryService: 'FIXED; MOBILE 5.384A; RADIOLOCATION; Amateur 5.150 5.282 5.393 5.394',
        usAllocations: 'Fixed; Radiolocation G2 US327',
        notes: 'BROADCASTING-SATELLITE US327',
        fccPart: 'Satellite Communications (25)',
        description: 'Fixed, Mobile, Amateur, Radiolocation, and Broadcasting-Satellite services.',
        band: 'SHF'
    },
    {
        startFreq: 2345.0,
        endFreq: 2360.0,
        unit: 'MHz',
        primaryService: 'FIXED; MOBILE 5.384A; Amateur; Radiolocation 5.150 5.282 5.395',
        secondaryService: 'FIXED; MOBILE 5.384A; RADIOLOCATION; Amateur 5.150 5.282 5.393 5.394',
        usAllocations: 'Fixed; Mobile US100; Radiolocation G2 US327',
        notes: 'FIXED; MOBILE US100; BROADCASTING-SATELLITE; RADIOLOCATION US327',
        fccPart: 'Wireless Communications (27)',
        description: 'Fixed, Mobile, Amateur, Radiolocation, and Broadcasting-Satellite services.',
        band: 'SHF'
    },
    {
        startFreq: 2360.0,
        endFreq: 2390.0,
        unit: 'MHz',
        primaryService: 'FIXED; MOBILE 5.384A; Amateur; Radiolocation 5.150 5.282 5.395',
        secondaryService: 'FIXED; MOBILE 5.384A; RADIOLOCATION; Amateur 5.150 5.282 5.393 5.394',
        usAllocations: 'MOBILE US276; RADIOLOCATION G2 G120; Fixed US101',
        notes: 'MOBILE US276; Space Operation (Earth-to-space) (space-to-Earth) NG42 US101',
        fccPart: 'Space Launch Services (26); Aviation (87); Personal Radio (95)',
        description: 'Fixed, Mobile, Amateur, Radiolocation, and Space Operation services.',
        band: 'SHF'
    },
    {
        startFreq: 2390.0,
        endFreq: 2395.0,
        unit: 'MHz',
        primaryService: 'FIXED; MOBILE 5.384A; Amateur; Radiolocation 5.150 5.282 5.395',
        secondaryService: 'FIXED; MOBILE 5.384A; RADIOLOCATION; Amateur 5.150 5.282 5.393 5.394',
        usAllocations: 'MOBILE US276 US101',
        notes: 'AMATEUR; MOBILE US276; Space Operation (Earth-to-space) (space-to-Earth) NG42 US101',
        fccPart: 'Space Launch Services (26); Aviation (87); Personal Radio (95); Amateur Radio (97)',
        description: 'Fixed, Mobile, Amateur, Radiolocation, and Space Operation services.',
        band: 'SHF'
    },
    {
        startFreq: 2395.0,
        endFreq: 2400.0,
        unit: 'MHz',
        primaryService: 'FIXED; MOBILE 5.384A; Amateur; Radiolocation 5.150 5.282 5.395',
        secondaryService: 'FIXED; MOBILE 5.384A; RADIOLOCATION; Amateur 5.150 5.282 5.393 5.394',
        usAllocations: 'US101 G122',
        notes: 'AMATEUR US101',
        fccPart: 'Personal Radio (95); Amateur Radio (97)',
        description: 'Fixed, Mobile, Amateur, and Radiolocation services.',
        band: 'SHF'
    },
    {
        startFreq: 2400.0,
        endFreq: 2417.0,
        unit: 'MHz',
        primaryService: 'FIXED; MOBILE 5.384A; Amateur; Radiolocation 5.150 5.282 5.395',
        secondaryService: 'FIXED; MOBILE 5.384A; RADIOLOCATION; Amateur 5.150 5.282 5.393 5.394',
        usAllocations: '5.150 G122',
        notes: 'AMATEUR 5.150 5.282',
        fccPart: 'RF Devices (15); ISM Equipment (18); Amateur Radio (97)',
        description: 'Fixed, Mobile, Amateur, and Radiolocation services.',
        band: 'SHF'
    },
    {
        startFreq: 2417.0,
        endFreq: 2450.0,
        unit: 'MHz',
        primaryService: 'FIXED; MOBILE 5.384A; Amateur; Radiolocation 5.150 5.282 5.395',
        secondaryService: 'FIXED; MOBILE 5.384A; RADIOLOCATION; Amateur 5.150 5.282 5.393 5.394',
        usAllocations: 'Radiolocation G2 5.150',
        notes: 'Amateur 5.150 5.282',
        fccPart: 'RF Devices (15); ISM Equipment (18); Amateur Radio (97)',
        description: 'Fixed, Mobile, Amateur, and Radiolocation services.',
        band: 'SHF'
    },
    {
        startFreq: 2450.0,
        endFreq: 2483.5,
        unit: 'MHz',
        primaryService: 'FIXED; MOBILE; Radiolocation 5.150',
        secondaryService: 'FIXED; MOBILE; Radiolocation 5.150',
        usAllocations: '5.150 US41',
        notes: 'FIXED; MOBILE; Radiolocation 5.150 US41',
        fccPart: 'RF Devices (15); ISM Equipment (18); TV Auxiliary Broadcasting (74F); Private Land Mobile (90); Fixed Microwave (101)',
        description: 'Fixed, Mobile, and Radiolocation services.',
        band: 'SHF'
    },
    {
        startFreq: 2483.5,
        endFreq: 2495.0,
        unit: 'MHz',
        primaryService: 'FIXED; MOBILE; MOBILE-SATELLITE (space-to-Earth) 5.351A; RADIODETERMINATION-SATELLITE (space-to-Earth) 5.398; Radiolocation 5.398A 5.150 5.399 5.401 5.402',
        secondaryService: 'FIXED; MOBILE; MOBILE-SATELLITE (space-to-Earth) 5.351A; RADIOLOCATION; RADIODETERMINATION-SATELLITE (space-to-Earth) 5.398 5.150 5.402',
        usAllocations: 'MOBILE-SATELLITE (space-to-Earth) US319 US380 US391; RADIODETERMINATION-SATELLITE (space-to-Earth) 5.398 5.150 5.402 US41',
        notes: 'MOBILE-SATELLITE (space-to-Earth) US380; RADIODETERMINATION-SATELLITE (space-to-Earth) 5.398 5.150 5.402 US41 US319 NG147',
        fccPart: 'ISM Equipment (18); Satellite Communications (25)',
        description: 'Fixed, Mobile, Mobile-Satellite, Radiodetermination-Satellite, and Radiolocation services.',
        band: 'SHF'
    },
    {
        startFreq: 2495.0,
        endFreq: 2500.0,
        unit: 'MHz',
        primaryService: 'FIXED; MOBILE; MOBILE-SATELLITE (space-to-Earth) 5.351A; RADIODETERMINATION-SATELLITE (space-to-Earth) 5.398; Radiolocation 5.398A 5.150 5.399 5.401 5.402',
        secondaryService: 'FIXED; MOBILE; MOBILE-SATELLITE (space-to-Earth) 5.351A; RADIOLOCATION; RADIODETERMINATION-SATELLITE (space-to-Earth) 5.398 5.150 5.402',
        usAllocations: 'MOBILE-SATELLITE (space-to-Earth) US319 US380 US391; RADIODETERMINATION-SATELLITE (space-to-Earth) 5.398 5.150 5.402 US41',
        notes: 'FIXED; MOBILE except aeronautical mobile; MOBILE-SATELLITE (space-to-Earth) US380; RADIODETERMINATION-SATELLITE (space-to-Earth) 5.398 5.150 5.402 US41 US319 US391 NG147',
        fccPart: 'ISM Equipment (18); Satellite Communications (25); Wireless Communications (27)',
        description: 'Fixed, Mobile, Mobile-Satellite, Radiodetermination-Satellite, and Radiolocation services.',
        band: 'SHF'
    },
    {
        startFreq: 2500.0,
        endFreq: 2655.0,
        unit: 'MHz',
        primaryService: 'FIXED 5.410; MOBILE except aeronautical mobile 5.384A; BROADCASTING-SATELLITE 5.413 5.416 5.339 5.412 5.418B 5.418C',
        secondaryService: 'FIXED 5.410; FIXED-SATELLITE (space-to-Earth) 5.415; MOBILE except aeronautical mobile 5.384A; BROADCASTING-SATELLITE 5.413 5.416 5.404 5.339 5.418 5.418A 5.418B 5.418C',
        usAllocations: 'FIXED US205; MOBILE except aeronautical mobile 5.339 US205',
        notes: '',
        fccPart: 'Wireless Communications (27)',
        description: 'Fixed, Mobile, and Broadcasting-Satellite services.',
        band: 'SHF'
    },
    {
        startFreq: 2655.0,
        endFreq: 2690.0,
        unit: 'MHz',
        primaryService: 'FIXED 5.410; MOBILE except aeronautical mobile 5.384A; BROADCASTING-SATELLITE 5.208B 5.413 5.416; Earth exploration-satellite (passive); Radio astronomy; Space research (passive) 5.149 5.412',
        secondaryService: 'FIXED 5.410; FIXED-SATELLITE (Earth-to-space) (space-to-Earth) 5.415; MOBILE except aeronautical mobile 5.384A; BROADCASTING-SATELLITE 5.413 5.416; Earth exploration-satellite (passive); Radio astronomy; Space research (passive) 5.149 5.208B',
        usAllocations: 'Earth exploration-satellite (passive); Radio astronomy US385; Space research (passive)',
        notes: 'FIXED US205; MOBILE except aeronautical mobile; Earth exploration-satellite (passive); Radio astronomy; Space research (passive) US205 US385',
        fccPart: '',
        description: 'Fixed, Mobile, Broadcasting-Satellite, Earth Exploration-Satellite, Radio Astronomy, and Space Research services.',
        band: 'SHF'
    },
    {
        startFreq: 2690.0,
        endFreq: 2700.0,
        unit: 'MHz',
        primaryService: 'EARTH EXPLORATION-SATELLITE (passive); RADIO ASTRONOMY; SPACE RESEARCH (passive) 5.340 5.422',
        secondaryService: 'EARTH EXPLORATION-SATELLITE (passive); RADIO ASTRONOMY; SPACE RESEARCH (passive) 5.340 5.422',
        usAllocations: 'EARTH EXPLORATION-SATELLITE (passive); RADIO ASTRONOMY US74; SPACE RESEARCH (passive) US246',
        notes: '',
        fccPart: '',
        description: 'Passive services including Earth Exploration-Satellite, Radio Astronomy, and Space Research.',
        band: 'SHF'
    },
    {
        startFreq: 2700.0,
        endFreq: 2900.0,
        unit: 'MHz',
        primaryService: 'AERONAUTICAL RADIONAVIGATION 5.337; Radiolocation 5.423 5.424',
        secondaryService: 'AERONAUTICAL RADIONAVIGATION 5.337; Radiolocation 5.423 5.424',
        usAllocations: 'METEOROLOGICAL AIDS; AERONAUTICAL RADIONAVIGATION 5.337 US18; Radiolocation G2 5.423 G15',
        notes: '5.423 US18',
        fccPart: 'Aviation (87)',
        description: 'Aeronautical Radionavigation, Radiolocation, and Meteorological Aids.',
        band: 'SHF'
    },
    {
        startFreq: 2900.0,
        endFreq: 3100.0,
        unit: 'MHz',
        primaryService: 'RADIOLOCATION 5.424A; RADIONAVIGATION 5.426 5.425 5.427',
        secondaryService: 'RADIOLOCATION 5.424A; RADIONAVIGATION 5.426 5.425 5.427',
        usAllocations: 'RADIOLOCATION 5.424A G56; MARITIME RADIONAVIGATION 5.427 US44 US316',
        notes: 'MARITIME RADIONAVigation; Radiolocation US44 5.427 US316',
        fccPart: 'Maritime (80); Private Land Mobile (90)',
        description: 'Radiolocation and Radionavigation services.',
        band: 'SHF'
    },
    {
        startFreq: 3100.0,
        endFreq: 3300.0,
        unit: 'MHz',
        primaryService: 'RADIOLOCATION; Earth exploration-satellite (active); Space research (active) 5.149 5.428',
        secondaryService: 'RADIOLOCATION; Earth exploration-satellite (active); Space research (active) 5.149 5.428',
        usAllocations: 'RADIOLOCATION G59; Earth exploration-satellite (active); Space research (active) US342',
        notes: 'Earth exploration-satellite (active); Space research (active); Radiolocation US342',
        fccPart: 'Private Land Mobile (90)',
        description: 'Radiolocation, Earth Exploration-Satellite, and Space Research services.',
        band: 'SHF'
    },
    {
        startFreq: 3300.0,
        endFreq: 3400.0,
        unit: 'MHz',
        primaryService: 'RADIOLOCATION 5.149 5.429 5.429A 5.429B 5.430',
        secondaryService: 'RADIOLOCATION; Amateur; Fixed; Mobile 5.149 5.429C 5.429D',
        usAllocations: 'RADIOLOCATION US431B G2',
        notes: 'US103 US342',
        fccPart: '',
        description: 'Radiolocation, Amateur, Fixed, and Mobile services.',
        band: 'SHF'
    },
    {
        startFreq: 3400.0,
        endFreq: 3450.0,
        unit: 'MHz',
        primaryService: 'FIXED; FIXED-SATELLITE (space-to-Earth); MOBILE except aeronautical mobile 5.430A; Radiolocation 5.431',
        secondaryService: 'FIXED; FIXED-SATELLITE (space-to-Earth); MOBILE except aeronautical mobile 5.431A 5.431B; Amateur; Radiolocation 5.433 5.282',
        usAllocations: 'RADIOLOCATION US431B G2',
        notes: 'US103 US342',
        fccPart: '',
        description: 'Fixed, Fixed-Satellite, Mobile, Amateur, and Radiolocation services.',
        band: 'SHF'
    },
    {
        startFreq: 3450.0,
        endFreq: 3500.0,
        unit: 'MHz',
        primaryService: 'FIXED; FIXED-SATELLITE (space-to-Earth); MOBILE except aeronautical mobile 5.430A; Radiolocation 5.431',
        secondaryService: 'FIXED; FIXED-SATELLITE (space-to-Earth); MOBILE except aeronautical mobile 5.431A 5.431B; Amateur; Radiolocation 5.433 5.282',
        usAllocations: 'RADIOLOCATION US431B G2',
        notes: 'FIXED; MOBILE except aeronautical mobile US103 US105 US431B US433',
        fccPart: 'Wireless Communications (27); Citizens Broadband (96)',
        description: 'Fixed, Fixed-Satellite, Mobile, Amateur, and Radiolocation services.',
        band: 'SHF'
    },
    {
        startFreq: 3500.0,
        endFreq: 3550.0,
        unit: 'MHz',
        primaryService: 'FIXED; FIXED-SATELLITE (space-to-Earth); MOBILE except aeronautical mobile 5.431B; Radiolocation 5.433',
        secondaryService: 'FIXED; FIXED-SATELLITE (space-to-Earth); MOBILE except aeronautical mobile 5.433A; Radiolocation 5.433',
        usAllocations: 'RADIOLOCATION G59; AERONAUTICAL RADIONAVIGATION (ground-based) G110 US103 US431B',
        notes: 'FIXED; MOBILE except aeronautical mobile US103 US105 US431B US433',
        fccPart: 'Wireless Communications (27); Citizens Broadband (96)',
        description: 'Fixed, Fixed-Satellite, Mobile, Radiolocation, and Aeronautical Radionavigation services.',
        band: 'SHF'
    },
    {
        startFreq: 3550.0,
        endFreq: 3600.0,
        unit: 'MHz',
        primaryService: 'FIXED; FIXED-SATELLITE (space-to-Earth); MOBILE except aeronautical mobile 5.431B; Radiolocation 5.433',
        secondaryService: 'FIXED; FIXED-SATELLITE (space-to-Earth); MOBILE except aeronautical mobile 5.433A; Radiolocation 5.433',
        usAllocations: 'RADIOLOCATION G59; AERONAUTICAL RADIONAVIGATION (ground-based) G110 US105 US107 US245 US433',
        notes: 'FIXED; MOBILE except aeronautical mobile US103 US105 US431B US433',
        fccPart: 'Wireless Communications (27); Citizens Broadband (96)',
        description: 'Fixed, Fixed-Satellite, Mobile, Radiolocation, and Aeronautical Radionavigation services.',
        band: 'SHF'
    },
    {
        startFreq: 3600.0,
        endFreq: 3650.0,
        unit: 'MHz',
        primaryService: 'FIXED; FIXED-SATELLITE (space-to-Earth); Mobile',
        secondaryService: 'FIXED; FIXED-SATELLITE (space-to-Earth); MOBILE except aeronautical mobile 5.434; Radiolocation 5.433',
        usAllocations: 'FIXED; FIXED-SATELLITE (space-to-Earth) US107 US245 NG169; MOBILE except aeronautical mobile US105 US109 US349 US433',
        notes: 'FIXED; MOBILE except aeronautical mobile US109 US349',
        fccPart: 'Satellite Communications (25); Citizens Broadband (96)',
        description: 'Fixed, Fixed-Satellite, Mobile, and Radiolocation services.',
        band: 'SHF'
    },
    {
        startFreq: 3650.0,
        endFreq: 3700.0,
        unit: 'MHz',
        primaryService: 'FIXED; FIXED-SATELLITE (space-to-Earth); Mobile',
        secondaryService: 'FIXED; FIXED-SATELLITE (space-to-Earth); MOBILE except aeronautical mobile 5.434; Radiolocation 5.433',
        usAllocations: 'FIXED; FIXED-SATELLITE (space-to-Earth) US107 US245 NG169; MOBILE except aeronautical mobile US105 US109 US349 US433',
        notes: 'FIXED; MOBILE except aeronautical mobile US109 US349',
        fccPart: 'Satellite Communications (25); Citizens Broadband (96)',
        description: 'Fixed, Fixed-Satellite, Mobile, and Radiolocation services.',
        band: 'SHF'
    },
    {
        startFreq: 3700.0,
        endFreq: 4000.0,
        unit: 'MHz',
        primaryService: 'FIXED; FIXED-SATELLITE (space-to-Earth); Mobile',
        secondaryService: 'FIXED; FIXED-SATELLITE (space-to-Earth); MOBILE except aeronautical mobile',
        usAllocations: 'FIXED; MOBILE except aeronautical mobile NG182 NG457A',
        notes: '',
        fccPart: 'Wireless Communications (27)',
        description: 'Fixed, Fixed-Satellite, and Mobile services.',
        band: 'SHF'
    },
    {
        startFreq: 4000.0,
        endFreq: 4200.0,
        unit: 'MHz',
        primaryService: 'FIXED; FIXED-SATELLITE (space-to-Earth); Mobile',
        secondaryService: 'FIXED; FIXED-SATELLITE (space-to-Earth); MOBILE except aeronautical mobile',
        usAllocations: 'FIXED; FIXED-SATELLITE (space-to-Earth) NG457A NG182',
        notes: '',
        fccPart: 'Satellite Communications (25)',
        description: 'Fixed, Fixed-Satellite, and Mobile services.',
        band: 'SHF'
    },
    {
        startFreq: 4200.0,
        endFreq: 4400.0,
        unit: 'MHz',
        primaryService: 'AERONAUTICAL MOBILE (R) 5.436; AERONAUTICAL RADIONAVIGATION 5.438 5.437 5.439 5.440',
        secondaryService: 'AERONAUTICAL MOBILE (R) 5.436; AERONAUTICAL RADIONAVIGATION 5.438 5.437 5.439 5.440',
        usAllocations: 'AERONAUTICAL RADIONAVIGATION 5.440 US261',
        notes: '',
        fccPart: 'Aviation (87)',
        description: 'Aeronautical Mobile and Aeronautical Radionavigation services.',
        band: 'SHF'
    },
    {
        startFreq: 4400.0,
        endFreq: 4500.0,
        unit: 'MHz',
        primaryService: 'FIXED; MOBILE 5.440A',
        secondaryService: 'FIXED; MOBILE 5.440A',
        usAllocations: 'FIXED; MOBILE',
        notes: '',
        fccPart: '',
        description: 'Fixed and Mobile services.',
        band: 'SHF'
    },
    {
        startFreq: 4500.0,
        endFreq: 4800.0,
        unit: 'MHz',
        primaryService: 'FIXED; FIXED-SATELLITE (space-to-Earth) 5.441; MOBILE 5.440A',
        secondaryService: 'FIXED; FIXED-SATELLITE (space-to-Earth) 5.441; MOBILE 5.440A',
        usAllocations: 'FIXED; MOBILE; FIXED-SATELLITE (space-to-Earth) 5.441 US245',
        notes: '',
        fccPart: '',
        description: 'Fixed, Fixed-Satellite, and Mobile services.',
        band: 'SHF'
    },
    {
        startFreq: 4800.0,
        endFreq: 4940.0,
        unit: 'MHz',
        primaryService: 'FIXED; MOBILE 5.440A 5.441A 5.441B 5.442; Radio astronomy 5.149 5.339 5.443',
        secondaryService: 'FIXED; MOBILE 5.440A 5.441A 5.441B 5.442; Radio astronomy 5.149 5.339 5.443',
        usAllocations: 'FIXED; MOBILE US113 US245 US342',
        notes: 'US113 US342',
        fccPart: '',
        description: 'Fixed, Mobile, and Radio Astronomy services.',
        band: 'SHF'
    },
    {
        startFreq: 4940.0,
        endFreq: 4990.0,
        unit: 'MHz',
        primaryService: 'FIXED; MOBILE 5.440A 5.441A 5.441B 5.442; Radio astronomy 5.149 5.339 5.443',
        secondaryService: 'FIXED; MOBILE 5.440A 5.441A 5.441B 5.442; Radio astronomy 5.149 5.339 5.443',
        usAllocations: '5.339 US342 US385 G122',
        notes: 'FIXED; MOBILE except aeronautical mobile 5.339 US342 US385',
        fccPart: 'Public Safety Land Mobile (90Y)',
        description: 'Fixed, Mobile, and Radio Astronomy services.',
        band: 'SHF'
    },
    {
        startFreq: 4990.0,
        endFreq: 5000.0,
        unit: 'MHz',
        primaryService: 'FIXED; MOBILE except aeronautical mobile; RADIO ASTRONOMY; Space research (passive) 5.149',
        secondaryService: 'FIXED; MOBILE except aeronautical mobile; RADIO ASTRONOMY; Space research (passive) 5.149',
        usAllocations: 'RADIO ASTRONOMY US74; Space research (passive) US246',
        notes: '',
        fccPart: '',
        description: 'Fixed, Mobile, Radio Astronomy, and Space Research (passive) services.',
        band: 'SHF'
    },
    {
        startFreq: 5000.0,
        endFreq: 5010.0,
        unit: 'MHz',
        primaryService: 'AERONAUTICAL MOBILE-SATELLITE (R) 5.443AA; AERONAUTICAL RADIONAVIGATION; RADIONAVIGATION-SATELLITE (Earth-to-space)',
        secondaryService: 'AERONAUTICAL MOBILE-SATELLITE (R) 5.443AA; AERONAUTICAL RADIONAVIGATION; RADIONAVIGATION-SATELLITE (Earth-to-space)',
        usAllocations: 'AERONAUTICAL MOBILE (R) US1',
        notes: '',
        fccPart: '',
        description: 'Aeronautical Mobile-Satellite, Aeronautical Radionavigation, and Radionavigation-Satellite services.',
        band: 'SHF'
    },
    {
        startFreq: 5010.0,
        endFreq: 5030.0,
        unit: 'MHz',
        primaryService: 'AERONAUTICAL MOBILE-SATELLITE (R) 5.443AA; AERONAUTICAL RADIONAVIGATION; RADIONAVIGATION-SATELLITE (space-to-Earth) (space-to-space) 5.328B 5.443B',
        secondaryService: 'AERONAUTICAL MOBILE-SATELLITE (R) 5.443AA; AERONAUTICAL RADIONAVIGATION; RADIONAVIGATION-SATELLITE (space-to-Earth) (space-to-space) 5.328B 5.443B',
        usAllocations: 'AERONAUTICAL MOBILE-SATELLITE (R) 5.443AA; AERONAUTICAL RADIONAVIGATION US260; RADIONAVIGATION-SATELLITE (space-to-Earth) (space-to-space) 5.443B US115 US211',
        notes: '',
        fccPart: '',
        description: 'Aeronautical Mobile-Satellite, Aeronautical Radionavigation, and Radionavigation-Satellite services.',
        band: 'SHF'
    },
    {
        startFreq: 5030.0,
        endFreq: 5091.0,
        unit: 'MHz',
        primaryService: 'AERONAUTICAL MOBILE (R) 5.443C; AERONAUTICAL MOBILE-SATELLITE (R) 5.443D; AERONAUTICAL RADIONAVIGATION 5.444',
        secondaryService: 'AERONAUTICAL MOBILE (R) 5.443C; AERONAUTICAL MOBILE-SATELLITE (R) 5.443D; AERONAUTICAL RADIONAVIGATION 5.444',
        usAllocations: 'AERONAUTICAL MOBILE (R) 5.443C; AERONAUTICAL MOBILE-SATELLITE (R) 5.443D; AERONAUTICAL RADIONAVIGATION US260 US211 US444',
        notes: '',
        fccPart: '',
        description: 'Aeronautical Mobile, Aeronautical Mobile-Satellite, and Aeronautical Radionavigation services.',
        band: 'SHF'
    },
    {
        startFreq: 5091.0,
        endFreq: 5150.0,
        unit: 'MHz',
        primaryService: 'FIXED-SATELLITE (Earth-to-space) 5.444A; AERONAUTICAL MOBILE 5.444B; AERONAUTICAL MOBILE-SATELLITE (R) 5.443AA; AERONAUTICAL RADIONAVIGATION 5.444',
        secondaryService: 'FIXED-SATELLITE (Earth-to-space) 5.444A; AERONAUTICAL MOBILE 5.444B; AERONAUTICAL MOBILE-SATELLITE (R) 5.443AA; AERONAUTICAL RADIONAVIGATION 5.444',
        usAllocations: 'AERONAUTICAL MOBILE US111 US444B; AERONAUTICAL MOBILE-SATELLITE (R) 5.443AA; AERONAUTICAL RADIONAVIGATION US260 US211 US344 US444 US444A',
        notes: '',
        fccPart: 'Satellite Communications (25); Aviation (87)',
        description: 'Fixed-Satellite, Aeronautical Mobile, Aeronautical Mobile-Satellite, and Aeronautical Radionavigation services.',
        band: 'SHF'
    },
    {
        startFreq: 5150.0,
        endFreq: 5250.0,
        unit: 'MHz',
        primaryService: 'FIXED-SATELLITE (Earth-to-space) 5.447A; MOBILE except aeronautical mobile 5.446A 5.446B; AERONAUTICAL RADIONAVIGATION 5.446 5.446C 5.446D 5.447 5.447B 5.447C',
        secondaryService: 'FIXED-SATELLITE (Earth-to-space) 5.447A; MOBILE except aeronautical mobile 5.446A 5.446B; AERONAUTICAL RADIONAVIGATION 5.446 5.446C 5.446D 5.447 5.447B 5.447C',
        usAllocations: 'AERONAUTICAL RADIONAVIGATION US260 US211 US307 US344',
        notes: 'FIXED-SATELLITE (Earth-to-space) 5.447A US344; AERONAUTICAL RADIONAVIGATION US260 5.447C US211 US307',
        fccPart: 'RF Devices (15); Satellite Communications (25); Aviation (87)',
        description: 'Fixed-Satellite, Mobile, and Aeronautical Radionavigation services.',
        band: 'SHF'
    },
    {
        startFreq: 5250.0,
        endFreq: 5255.0,
        unit: 'MHz',
        primaryService: 'EARTH EXPLORATION-SATELLITE (active); MOBILE except aeronautical mobile 5.446A 5.447F; RADIOLOCATION; SPACE RESEARCH 5.447D 5.447E 5.448 5.448A',
        secondaryService: 'EARTH EXPLORATION-SATELLITE (active); MOBILE except aeronautical mobile 5.446A 5.447F; RADIOLOCATION; SPACE RESEARCH 5.447D 5.447E 5.448 5.448A',
        usAllocations: 'EARTH EXPLORATION-SATELLITE (active); RADIOLOCATION G59; SPACE RESEARCH (active) 5.447D 5.448A',
        notes: 'Earth exploration-satellite (active); Radiolocation; Space research',
        fccPart: 'RF Devices (15); Private Land Mobile (90)',
        description: 'Earth Exploration-Satellite, Mobile, Radiolocation, and Space Research services.',
        band: 'SHF'
    },
    {
        startFreq: 5255.0,
        endFreq: 5350.0,
        unit: 'MHz',
        primaryService: 'EARTH EXPLORATION-SATELLITE (active); MOBILE except aeronautical mobile 5.446A 5.447F; RADIOLOCATION; SPACE RESEARCH (active) 5.447E 5.448 5.448A',
        secondaryService: 'EARTH EXPLORATION-SATELLITE (active); MOBILE except aeronautical mobile 5.446A 5.447F; RADIOLOCATION; SPACE RESEARCH (active) 5.447E 5.448 5.448A',
        usAllocations: 'EARTH EXPLORATION-SATELLITE (active); RADIOLOCATION G59; SPACE RESEARCH (active) 5.448A',
        notes: 'Earth exploration-satellite (active); Radiolocation; Space research (active) 5.448A',
        fccPart: '',
        description: 'Earth Exploration-Satellite, Mobile, Radiolocation, and Space Research services.',
        band: 'SHF'
    },
    {
        startFreq: 5350.0,
        endFreq: 5460.0,
        unit: 'MHz',
        primaryService: 'EARTH EXPLORATION-SATELLITE (active) 5.448B; RADIOLOCATION 5.448D; AERONAUTICAL RADIONAVIGATION 5.449; SPACE RESEARCH (active) 5.448C',
        secondaryService: 'EARTH EXPLORATION-SATELLITE (active) 5.448B; RADIOLOCATION 5.448D; AERONAUTICAL RADIONAVIGATION 5.449; SPACE RESEARCH (active) 5.448C',
        usAllocations: 'EARTH EXPLORATION-SATELLITE (active) 5.448B; RADIOLOCATION G56; AERONAUTICAL RADIONAVIGATION 5.449; SPACE RESEARCH (active) US390 G130',
        notes: 'AERONAUTICAL RADIONAVIGATION 5.449; Earth exploration-satellite (active) 5.448B; Radiolocation; Space research (active) US390',
        fccPart: 'Aviation (87); Private Land Mobile (90)',
        description: 'Earth Exploration-Satellite, Radiolocation, Aeronautical Radionavigation, and Space Research services.',
        band: 'SHF'
    },
    {
        startFreq: 5460.0,
        endFreq: 5470.0,
        unit: 'MHz',
        primaryService: 'EARTH EXPLORATION-SATELLITE (active); RADIOLOCATION 5.448D; RADIONAVIGATION 5.449; SPACE RESEARCH (active) 5.448B',
        secondaryService: 'EARTH EXPLORATION-SATELLITE (active); RADIOLOCATION 5.448D; RADIONAVIGATION 5.449; SPACE RESEARCH (active) 5.448B',
        usAllocations: 'EARTH EXPLORATION-SATELLITE (active); RADIOLOCATION G56; RADIONAVIGATION 5.449 US65; SPACE RESEARCH (active) 5.448B US49 G130',
        notes: 'RADIONAVIGATION 5.449 US65; Earth exploration-satellite (active); Radiolocation; Space research (active) 5.448B US49',
        fccPart: 'Maritime (80); Aviation (87); Private Land Mobile (90)',
        description: 'Earth Exploration-Satellite, Radiolocation, Radionavigation, and Space Research services.',
        band: 'SHF'
    },
    {
        startFreq: 5470.0,
        endFreq: 5570.0,
        unit: 'MHz',
        primaryService: 'EARTH EXPLORATION-SATELLITE (active); MOBILE except aeronautical mobile 5.446A 5.450A; RADIOLOCATION 5.450B; MARITIME RADIONAVIGATION; SPACE RESEARCH (active) 5.448B 5.450 5.451',
        secondaryService: 'EARTH EXPLORATION-SATELLITE (active); MOBILE except aeronautical mobile 5.446A 5.450A; RADIOLOCATION 5.450B; MARITIME RADIONAVIGATION; SPACE RESEARCH (active) 5.448B 5.450 5.451',
        usAllocations: 'EARTH EXPLORATION-SATELLITE (active); RADIOLOCATION G56; MARITIME RADIONAVIGATION US65; SPACE RESEARCH (active) 5.448B US50 G131',
        notes: 'RADIOLOCATION; MARITIME RADIONAVIGATION US65; Earth exploration-satellite (active); Space research (active) US50',
        fccPart: 'RF Devices (15); Maritime (80); Private Land Mobile (90)',
        description: 'Earth Exploration-Satellite, Mobile, Radiolocation, Maritime Radionavigation, and Space Research services.',
        band: 'SHF'
    },
    {
        startFreq: 5570.0,
        endFreq: 5600.0,
        unit: 'MHz',
        primaryService: 'MOBILE except aeronautical mobile 5.446A 5.450A; RADIOLOCATION 5.450B; MARITIME RADIONAVIGATION 5.450 5.451 5.452',
        secondaryService: 'MOBILE except aeronautical mobile 5.446A 5.450A; RADIOLOCATION 5.450B; MARITIME RADIONAVIGATION 5.450 5.451 5.452',
        usAllocations: 'RADIOLOCATION G56; MARITIME RADIONAVIGATION US65 US50 G131',
        notes: 'RADIOLOCATION; MARITIME RADIONAVIGATION US65 US50',
        fccPart: '',
        description: 'Mobile, Radiolocation, and Maritime Radionavigation services.',
        band: 'SHF'
    },
    {
        startFreq: 5600.0,
        endFreq: 5650.0,
        unit: 'MHz',
        primaryService: 'MOBILE except aeronautical mobile 5.446A 5.450A; RADIOLOCATION 5.450B; MARITIME RADIONAVIGATION 5.450 5.451 5.452',
        secondaryService: 'MOBILE except aeronautical mobile 5.446A 5.450A; RADIOLOCATION 5.450B; MARITIME RADIONAVIGATION 5.450 5.451 5.452',
        usAllocations: 'METEOROLOGICAL AIDS; RADIOLOCATION G56; MARITIME RADIONAVIGATION US65 5.452 US50 G131',
        notes: 'METEOROLOGICAL AIDS; RADIOLOCATION; MARITIME RADIONAVIGATION US65 5.452 US50',
        fccPart: '',
        description: 'Mobile, Radiolocation, Maritime Radionavigation, and Meteorological Aids.',
        band: 'SHF'
    },
    {
        startFreq: 5650.0,
        endFreq: 5725.0,
        unit: 'MHz',
        primaryService: 'MOBILE except aeronautical mobile 5.446A 5.450A; RADIOLOCATION; Amateur; Space research (deep space) 5.282 5.451 5.453 5.454 5.455',
        secondaryService: 'MOBILE except aeronautical mobile 5.446A 5.450A; RADIOLOCATION; Amateur; Space research (deep space) 5.282 5.451 5.453 5.454 5.455',
        usAllocations: 'RADIOLOCATION G2',
        notes: 'Amateur 5.150 5.282',
        fccPart: 'RF Devices (15); ISM Equipment (18); Amateur Radio (97)',
        description: 'Mobile, Radiolocation, Amateur, and Space Research services.',
        band: 'SHF'
    },
    {
        startFreq: 5725.0,
        endFreq: 5830.0,
        unit: 'MHz',
        primaryService: 'FIXED-SATELLITE (Earth-to-space); RADIOLOCATION; Amateur 5.150 5.451 5.453 5.455',
        secondaryService: 'FIXED-SATELLITE (Earth-to-space); RADIOLOCATION; Amateur 5.150 5.451 5.453 5.455',
        usAllocations: 'RADIOLOCATION G2',
        notes: 'Amateur 5.150 5.282',
        fccPart: 'RF Devices (15); ISM Equipment (18); Amateur Radio (97)',
        description: 'Fixed-Satellite, Radiolocation, and Amateur services.',
        band: 'SHF'
    },
    {
        startFreq: 5830.0,
        endFreq: 5850.0,
        unit: 'MHz',
        primaryService: 'FIXED-SATELLITE (Earth-to-space); RADIOLOCATION; Amateur; Amateur-satellite (space-to-Earth) 5.150 5.451 5.453 5.455',
        secondaryService: 'FIXED-SATELLITE (Earth-to-space); RADIOLOCATION; Amateur; Amateur-satellite (space-to-Earth) 5.150 5.451 5.453 5.455',
        usAllocations: 'RADIOLOCATION G2',
        notes: 'Amateur; Amateur-satellite (space-to-Earth) 5.150',
        fccPart: '',
        description: 'Fixed-Satellite, Radiolocation, and Amateur services.',
        band: 'SHF'
    },
    {
        startFreq: 5850.0,
        endFreq: 5925.0,
        unit: 'MHz',
        primaryService: 'FIXED; FIXED-SATELLITE (Earth-to-space); MOBILE 5.150',
        secondaryService: 'FIXED; FIXED-SATELLITE (Earth-to-space); MOBILE; Amateur; Radiolocation 5.150',
        usAllocations: 'RADIOLOCATION G2; FIXED-SATELLITE (Earth-to-space) US245',
        notes: 'FIXED-SATELLITE (Earth-to-space) US245; MOBILE NG160; Amateur 5.150',
        fccPart: 'RF Devices (15); ISM Equipment (18); Private Land Mobile (90); Personal Radio (95); Amateur Radio (97)',
        description: 'Fixed, Fixed-Satellite, Mobile, Amateur, and Radiolocation services.',
        band: 'SHF'
    },
    {
        startFreq: 5925.0,
        endFreq: 6425.0,
        unit: 'MHz',
        primaryService: 'FIXED 5.457; FIXED-SATELLITE (Earth-to-space) 5.457A 5.457B; MOBILE 5.457C 5.149 5.440 5.458',
        secondaryService: 'FIXED 5.457; FIXED-SATELLITE (Earth-to-space) 5.457A 5.457B; MOBILE 5.457C 5.149 5.440 5.458',
        usAllocations: 'FIXED; FIXED-SATELLITE (Earth-to-space) NG457A',
        notes: '',
        fccPart: 'RF Devices (15); Satellite Communications (25); Fixed Microwave (101)',
        description: 'Fixed, Fixed-Satellite, and Mobile services.',
        band: 'SHF'
    }
];

// Export for use in main application
if (typeof module !== 'undefined' && module.exports) {
    module.exports = peakIdentificationBand7;
} else if (typeof window !== 'undefined') {
    window.peakIdentificationBand7 = peakIdentificationBand7;
}