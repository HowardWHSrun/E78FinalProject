// Peak Identification Database - Band 6 (300 MHz - 1.3 GHz)
// Turner Engineering Corporation - EMC Testing Support
// 
// ========================================================================
// BAND 6: ULTRA HIGH FREQUENCY (UHF) - LOWER PORTION
// ========================================================================
// 
// Frequency Range: 273 MHz - 1.3 GHz
// Total Allocations: ~66 frequency segments
// Spectrum Coverage: UHF band including TV, cellular, and satellite services
// 
// KEY SERVICES COVERED:
// • Television Broadcasting:
//   - UHF TV Channels 14-69 (470-806 MHz)
//   - Digital TV transition frequencies
// • Cellular and PCS Systems:
//   - Various cellular bands
//   - Public safety allocations
// • Amateur Radio:
//   - 70 cm band (420-450 MHz)
//   - 33 cm band (902-928 MHz)
//   - 23 cm band (1240-1300 MHz)
// • Satellite Services:
//   - Mobile satellite communications
//   - GPS and navigation satellites
//   - Weather satellites
// • Public Safety and Emergency Services
// • ISM Applications (902-928 MHz)
// • Unlicensed devices and spread spectrum
// 
// NOTABLE FREQUENCIES:
// • 420-450 MHz - Amateur radio 70cm band
// • 470-806 MHz - UHF television broadcasting
// • 806-824/851-869 MHz - Cellular telephone
// • 902-928 MHz - ISM band, amateur radio
// • 1090 MHz - Aviation transponders (Mode S)
// • 1227.6 MHz - GPS L2 frequency
// 
// FCC PART REFERENCES:
// • Part 15: Unlicensed devices
// • Part 22: Cellular services
// • Part 25: Satellite communications
// • Part 27: Wireless communications
// • Part 73: Television broadcasting
// • Part 87: Aviation services
// • Part 90: Land mobile services
// • Part 97: Amateur radio
// 
// ITU FOOTNOTES: Complex 5.xxx series covering broadcasting
// coordination, satellite coordination, and mobile services
// 
// TECHNICAL NOTES:
// • Line-of-sight propagation
// • Significant building penetration limitations
// • High data rate capabilities
// • Satellite communication links
// • Digital modulation techniques
// • Interference coordination requirements
// 
// ========================================================================

const peakIdentificationBand6 = [
    {
        startFreq: 273.0,
        endFreq: 312.0,
        unit: 'MHz',
        primaryService: 'FIXED; MOBILE 5.254',
        secondaryService: 'FIXED; MOBILE 5.254',
        usAllocations: 'FIXED; MOBILE G27 G100',
        notes: '',
        fccPart: '',
        description: 'Fixed and Mobile services',
        band: 'UHF'
    },
    {
        startFreq: 312.0,
        endFreq: 315.0,
        unit: 'MHz',
        primaryService: 'FIXED; MOBILE; Mobile-satellite (Earth-to-space) 5.254 5.255',
        secondaryService: 'FIXED; MOBILE; Mobile-satellite (Earth-to-space) 5.254 5.255',
        usAllocations: 'FIXED; MOBILE G27 G100',
        notes: '',
        fccPart: '',
        description: 'Fixed, Mobile, and Mobile-Satellite (Earth-to-space) services',
        band: 'UHF'
    },
    {
        startFreq: 315.0,
        endFreq: 322.0,
        unit: 'MHz',
        primaryService: 'FIXED; MOBILE 5.254',
        secondaryService: 'FIXED; MOBILE 5.254',
        usAllocations: 'FIXED; MOBILE G27 G100',
        notes: '',
        fccPart: '',
        description: 'Fixed and Mobile services',
        band: 'UHF'
    },
    {
        startFreq: 322.0,
        endFreq: 328.6,
        unit: 'MHz',
        primaryService: 'FIXED; MOBILE; RADIO ASTRONOMY 5.149',
        secondaryService: 'FIXED; MOBILE; RADIO ASTRONOMY 5.149',
        usAllocations: 'FIXED; MOBILE US342 G27',
        notes: 'US342',
        fccPart: '',
        description: 'Fixed, Mobile, and Radio Astronomy services',
        band: 'UHF'
    },
    {
        startFreq: 328.6,
        endFreq: 335.4,
        unit: 'MHz',
        primaryService: 'AERONAUTICAL RADIONAVIGATION 5.258 5.259',
        secondaryService: 'AERONAUTICAL RADIONAVIGATION 5.258 5.259',
        usAllocations: 'AERONAUTICAL RADIONAVIGATION 5.258',
        notes: '',
        fccPart: 'Aviation (87)',
        description: 'Aeronautical Radionavigation',
        band: 'UHF'
    },
    {
        startFreq: 335.4,
        endFreq: 387.0,
        unit: 'MHz',
        primaryService: 'FIXED; MOBILE 5.254',
        secondaryService: 'FIXED; MOBILE 5.254',
        usAllocations: 'FIXED; MOBILE G27 G100',
        notes: '',
        fccPart: '',
        description: 'Fixed and Mobile services',
        band: 'UHF'
    },
    {
        startFreq: 387.0,
        endFreq: 390.0,
        unit: 'MHz',
        primaryService: 'FIXED; MOBILE; Mobile-satellite (space-to-Earth) 5.208A 5.208B 5.254 5.255',
        secondaryService: 'FIXED; MOBILE; Mobile-satellite (space-to-Earth) 5.208A 5.208B 5.254 5.255',
        usAllocations: 'FIXED; MOBILE G27 G100',
        notes: '',
        fccPart: '',
        description: 'Fixed, Mobile, and Mobile-Satellite (space-to-Earth) services',
        band: 'UHF'
    },
    {
        startFreq: 390.0,
        endFreq: 399.9,
        unit: 'MHz',
        primaryService: 'FIXED; MOBILE 5.254',
        secondaryService: 'FIXED; MOBILE 5.254',
        usAllocations: 'FIXED; MOBILE G27 G100',
        notes: '',
        fccPart: '',
        description: 'Fixed and Mobile services',
        band: 'UHF'
    },
    {
        startFreq: 399.9,
        endFreq: 400.05,
        unit: 'MHz',
        primaryService: 'MOBILE-SATELLITE (Earth-to-space) 5.209 5.220 5.260A 5.260B',
        secondaryService: 'MOBILE-SATELLITE (Earth-to-space) 5.209 5.220 5.260A 5.260B',
        usAllocations: 'MOBILE-SATELLITE (Earth-to-space) US320; RADIONAVIGATION-SATELLITE',
        notes: '',
        fccPart: 'Satellite Communications (25)',
        description: 'Mobile-Satellite and Radionavigation-Satellite services',
        band: 'UHF'
    },
    {
        startFreq: 400.05,
        endFreq: 400.15,
        unit: 'MHz',
        primaryService: 'STANDARD FREQUENCY AND TIME SIGNAL-SATELLITE (400.1 MHz) 5.261 5.262',
        secondaryService: 'STANDARD FREQUENCY AND TIME SIGNAL-SATELLITE (400.1 MHz) 5.261 5.262',
        usAllocations: 'STANDARD FREQUENCY AND TIME SIGNAL-SATELLITE (400.1 MHz) 5.261',
        notes: '',
        fccPart: '',
        description: 'Standard Frequency and Time Signal-Satellite',
        band: 'UHF'
    },
    {
        startFreq: 400.15,
        endFreq: 401.0,
        unit: 'MHz',
        primaryService: 'METEOROLOGICAL AIDS; METEOROLOGICAL-SATELLITE (space-to-Earth); MOBILE-SATELLITE (space-to-Earth) 5.208A 5.208B 5.209; SPACE RESEARCH (space-to-Earth) 5.263; Space operation (space-to-Earth) 5.262 5.264',
        secondaryService: 'METEOROLOGICAL AIDS; METEOROLOGICAL-SATELLITE (space-to-Earth); MOBILE-SATELLITE (space-to-Earth) 5.208A 5.208B 5.209; SPACE RESEARCH (space-to-Earth) 5.263; Space operation (space-to-Earth) 5.262 5.264',
        usAllocations: 'METEOROLOGICAL AIDS (radiosonde) US70; METEOROLOGICAL-SATELLITE (space-to-Earth); MOBILE-SATELLITE (space-to-Earth) US319 US320 US324; SPACE RESEARCH (space-to-Earth) 5.263; Space operation (space-to-Earth) 5.264',
        notes: 'METEOROLOGICAL AIDS (radiosonde) US70; MOBILE-SATELLITE (space-to-Earth) US319 US320 US324; SPACE RESEARCH (space-to-Earth) 5.263; Space operation (space-to-Earth) 5.264',
        fccPart: 'Satellite Communications (25)',
        description: 'Meteorological, Satellite, and Space Research services',
        band: 'UHF'
    },
    {
        startFreq: 401.0,
        endFreq: 402.0,
        unit: 'MHz',
        primaryService: 'METEOROLOGICAL AIDS; SPACE OPERATION (space-to-Earth); EARTH EXPLORATION-SATELLITE (Earth-to-space); METEOROLOGICAL-SATELLITE (Earth-to-space); Fixed; Mobile except aeronautical mobile 5.264A 5.264B',
        secondaryService: 'METEOROLOGICAL AIDS; SPACE OPERATION (space-to-Earth); EARTH EXPLORATION-SATELLITE (Earth-to-space); METEOROLOGICAL-SATELLITE (Earth-to-space); Fixed; Mobile except aeronautical mobile 5.264A 5.264B',
        usAllocations: 'METEOROLOGICAL AIDS (radiosonde) US70; SPACE OPERATION (space-to-Earth); EARTH EXPLORATION-SATELLITE (Earth-to-space); METEOROLOGICAL-SATELLITE (Earth-to-space) US64 US384',
        notes: 'METEOROLOGICAL AIDS (radiosonde) US70; SPACE OPERATION (space-to-Earth); Earth exploration-satellite (Earth-to-space); Meteorological-satellite (Earth-to-space) US64 US384',
        fccPart: 'MedRadio (95I)',
        description: 'Meteorological, Space, and Satellite services',
        band: 'UHF'
    },
    {
        startFreq: 402.0,
        endFreq: 403.0,
        unit: 'MHz',
        primaryService: 'METEOROLOGICAL AIDS; EARTH EXPLORATION-SATELLITE (Earth-to-space); METEOROLOGICAL-SATELLITE (Earth-to-space); Fixed; Mobile except aeronautical mobile 5.264A 5.264B',
        secondaryService: 'METEOROLOGICAL AIDS; EARTH EXPLORATION-SATELLITE (Earth-to-space); METEORological-SATELLITE (Earth-to-space); Fixed; Mobile except aeronautical mobile 5.264A 5.264B',
        usAllocations: 'METEOROLOGICAL AIDS (radiosonde) US70; EARTH EXPLORATION-SATELLITE (Earth-to-space); METEOROLOGICAL-SATELLITE (Earth-to-space) US64 US384',
        notes: 'METEOROLOGICAL AIDS (radiosonde) US70; Earth exploration-satellite (Earth-to-space); Meteorological-satellite (Earth-to-space) US64 US384',
        fccPart: '',
        description: 'Meteorological and Satellite services',
        band: 'UHF'
    },
    {
        startFreq: 403.0,
        endFreq: 406.0,
        unit: 'MHz',
        primaryService: 'METEOROLOGICAL AIDS; Fixed; Mobile except aeronautical mobile 5.265',
        secondaryService: 'METEOROLOGICAL AIDS; Fixed; Mobile except aeronautical mobile 5.265',
        usAllocations: 'METEOROLOGICAL AIDS (radiosonde) US70 US64 G6',
        notes: 'METEOROLOGICAL AIDS (radiosonde) US70 US64',
        fccPart: '',
        description: 'Meteorological Aids, Fixed, and Mobile services',
        band: 'UHF'
    },
    {
        startFreq: 406.0,
        endFreq: 406.1,
        unit: 'MHz',
        primaryService: 'MOBILE-SATELLITE (Earth-to-space) 5.265 5.266 5.267',
        secondaryService: 'MOBILE-SATELLITE (Earth-to-space) 5.265 5.266 5.267',
        usAllocations: 'MOBILE-SATELLITE (Earth-to-space) 5.266 5.267',
        notes: '',
        fccPart: 'Maritime (EPIRBs) (80V); Aviation (ELTs) (87F); Personal Radio (95)',
        description: 'Mobile-Satellite (Earth-to-space) for distress beacons',
        band: 'UHF'
    },
    {
        startFreq: 406.1,
        endFreq: 410.0,
        unit: 'MHz',
        primaryService: 'FIXED; MOBILE except aeronautical mobile; RADIO ASTRONOMY 5.149 5.265',
        secondaryService: 'FIXED; MOBILE except aeronautical mobile; RADIO ASTRONOMY 5.149 5.265',
        usAllocations: 'FIXED; MOBILE; RADIO ASTRONOMY US74 US13 US55 US117 G5 G6',
        notes: 'RADIO ASTRONOMY US74 US13 US55 US117',
        fccPart: 'Private Land Mobile (90)',
        description: 'Fixed, Mobile, and Radio Astronomy services',
        band: 'UHF'
    },
    {
        startFreq: 410.0,
        endFreq: 420.0,
        unit: 'MHz',
        primaryService: 'FIXED; MOBILE except aeronautical mobile; SPACE RESEARCH (space-to-space) 5.268',
        secondaryService: 'FIXED; MOBILE except aeronautical mobile; SPACE RESEARCH (space-to-space) 5.268',
        usAllocations: 'FIXED; MOBILE; SPACE RESEARCH (space-to-space) 5.268 US13 US55 US64 G5',
        notes: 'US13 US55 US64',
        fccPart: 'Private Land Mobile (90); MedRadio (95I)',
        description: 'Fixed, Mobile, and Space Research services',
        band: 'UHF'
    },
    {
        startFreq: 420.0,
        endFreq: 430.0,
        unit: 'MHz',
        primaryService: 'FIXED; MOBILE except aeronautical mobile; Radiolocation 5.269 5.270 5.271',
        secondaryService: 'FIXED; MOBILE except aeronautical mobile; Radiolocation 5.269 5.270 5.271',
        usAllocations: 'RADIOLOCATION G2 G129',
        notes: 'Amateur US270',
        fccPart: 'Private Land Mobile (90); MedRadio (95I); Amateur Radio (97)',
        description: 'Fixed, Mobile, and Radiolocation services',
        band: 'UHF'
    },
    {
        startFreq: 430.0,
        endFreq: 432.0,
        unit: 'MHz',
        primaryService: 'AMATEUR; RADIOLOCATION 5.271 5.274 5.275 5.276 5.277',
        secondaryService: 'RADIOLOCATION; Amateur 5.271 5.276 5.277 5.278 5.279',
        usAllocations: 'RADIOLOCATION G2 G129',
        notes: 'Amateur US270',
        fccPart: 'Private Land Mobile (90); MedRadio (95I); Amateur Radio (97)',
        description: 'Amateur and Radiolocation services',
        band: 'UHF'
    },
    {
        startFreq: 432.0,
        endFreq: 438.0,
        unit: 'MHz',
        primaryService: 'AMATEUR; RADIOLOCATION; Earth exploration-satellite (active) 5.279A 5.138 5.271 5.276 5.277 5.280 5.281 5.282',
        secondaryService: 'RADIOLOCATION; Amateur; Earth exploration-satellite (active) 5.279A 5.271 5.276 5.277 5.278 5.279 5.281 5.282',
        usAllocations: 'RADIOLOCATION G2 G129',
        notes: 'Amateur US270',
        fccPart: 'Private Land Mobile (90); MedRadio (95I); Amateur Radio (97)',
        description: 'Amateur, Radiolocation, and Earth Exploration-Satellite services',
        band: 'UHF'
    },
    {
        startFreq: 438.0,
        endFreq: 440.0,
        unit: 'MHz',
        primaryService: 'AMATEUR; RADIOLOCATION 5.271 5.274 5.275 5.276 5.277 5.283',
        secondaryService: 'RADIOLOCATION; Amateur 5.271 5.276 5.277 5.278 5.279',
        usAllocations: 'RADIOLOCATION G2 G129',
        notes: 'Amateur US270',
        fccPart: 'Private Land Mobile (90); MedRadio (95I); Amateur Radio (97)',
        description: 'Amateur and Radiolocation services',
        band: 'UHF'
    },
    {
        startFreq: 440.0,
        endFreq: 450.0,
        unit: 'MHz',
        primaryService: 'FIXED; MOBILE except aeronautical mobile; Radiolocation 5.269 5.270 5.271 5.284 5.285 5.286',
        secondaryService: 'FIXED; MOBILE except aeronautical mobile; Radiolocation 5.269 5.270 5.271 5.284 5.285 5.286',
        usAllocations: 'RADIOLOCATION 5.286 US64 US87 US230 US269 US270 US397 G8',
        notes: 'Amateur 5.282 5.286 US64 US87 US230 US269 US397',
        fccPart: 'Private Land Mobile (90); MedRadio (95I); Amateur Radio (97)',
        description: 'Fixed, Mobile, and Radiolocation services',
        band: 'UHF'
    },
    {
        startFreq: 450.0,
        endFreq: 454.0,
        unit: 'MHz',
        primaryService: 'FIXED; MOBILE 5.286AA 5.209 5.271 5.286 5.286A 5.286B 5.286C 5.286D 5.286E',
        secondaryService: 'FIXED; MOBILE 5.286AA 5.209 5.271 5.286 5.286A 5.286B 5.286C 5.286D 5.286E',
        usAllocations: '5.286 US64 US87',
        notes: 'LAND MOBILE 5.286 US64 US87 NG112 NG124',
        fccPart: 'Remote Pickup (74D); Low Power Auxiliary (74H); Private Land Mobile (90); MedRadio (95I)',
        description: 'Fixed and Mobile services',
        band: 'UHF'
    },
    {
        startFreq: 454.0,
        endFreq: 455.0,
        unit: 'MHz',
        primaryService: 'FIXED; MOBILE 5.286AA 5.209 5.271 5.286 5.286A 5.286B 5.286C 5.286D 5.286E',
        secondaryService: 'FIXED; MOBILE 5.286AA 5.209 5.271 5.286 5.286A 5.286B 5.286C 5.286D 5.286E',
        usAllocations: 'US64',
        notes: 'FIXED; LAND MOBILE US64 NG32 NG112 NG148',
        fccPart: 'Public Mobile (22); Maritime (80); MedRadio (95I)',
        description: 'Fixed and Mobile services',
        band: 'UHF'
    },
    {
        startFreq: 455.0,
        endFreq: 456.0,
        unit: 'MHz',
        primaryService: 'FIXED; MOBILE 5.286AA 5.209 5.271 5.286A 5.286B 5.286C 5.286E',
        secondaryService: 'FIXED; MOBILE 5.286AA; MOBILE-SATELLITE (Earth-to-space) 5.286A 5.286B 5.286C 5.209',
        usAllocations: 'US64',
        notes: 'LAND MOBILE US64',
        fccPart: 'Remote Pickup (74D); Low Power Auxiliary (74H); MedRadio (95I)',
        description: 'Fixed, Mobile, and Mobile-Satellite services',
        band: 'UHF'
    },
    {
        startFreq: 456.0,
        endFreq: 459.0,
        unit: 'MHz',
        primaryService: 'FIXED; MOBILE 5.286AA 5.271 5.287 5.288',
        secondaryService: 'FIXED; MOBILE 5.286AA 5.271 5.287 5.288',
        usAllocations: 'US64 US287 US288',
        notes: 'FIXED; LAND MOBILE US64 US287 US288 NG32 NG112 NG124 NG148',
        fccPart: 'Public Mobile (22); Maritime (80); Private Land Mobile (90); MedRadio (95I)',
        description: 'Fixed and Mobile services',
        band: 'UHF'
    },
    {
        startFreq: 459.0,
        endFreq: 460.0,
        unit: 'MHz',
        primaryService: 'FIXED; MOBILE 5.286AA 5.209 5.271 5.286A 5.286B 5.286C 5.286E',
        secondaryService: 'FIXED; MOBILE 5.286AA; MOBILE-SATELLITE (Earth-to-space) 5.286A 5.286B 5.286C 5.209',
        usAllocations: 'US64 US287 US288',
        notes: 'FIXED; LAND MOBILE US64 US287 US288 NG32 NG112 NG124 NG148',
        fccPart: 'Public Mobile (22); Maritime (80); Private Land Mobile (90); MedRadio (95I)',
        description: 'Fixed, Mobile, and Mobile-Satellite services',
        band: 'UHF'
    },
    {
        startFreq: 460.0,
        endFreq: 462.5375,
        unit: 'MHz',
        primaryService: 'FIXED; MOBILE 5.286AA; Meteorological-satellite (space-to-Earth) 5.287 5.288 5.289 5.290',
        secondaryService: 'FIXED; MOBILE 5.286AA; Meteorological-satellite (space-to-Earth) 5.287 5.288 5.289 5.290',
        usAllocations: 'Meteorological-satellite (space-to-Earth) US73 US209 US287 US288 US289',
        notes: 'FIXED; LAND MOBILE US209 US289 NG124',
        fccPart: 'Private Land Mobile (90)',
        description: 'Fixed, Mobile, and Meteorological-Satellite services',
        band: 'UHF'
    },
    {
        startFreq: 462.5375,
        endFreq: 462.7375,
        unit: 'MHz',
        primaryService: 'FIXED; MOBILE 5.286AA; Meteorological-satellite (space-to-Earth) 5.287 5.288 5.289 5.290',
        secondaryService: 'FIXED; MOBILE 5.286AA; Meteorological-satellite (space-to-Earth) 5.287 5.288 5.289 5.290',
        usAllocations: 'Meteorological-satellite (space-to-Earth) US73 US209 US287 US288 US289',
        notes: 'LAND MOBILE US289',
        fccPart: 'Personal Radio (95)',
        description: 'Fixed, Mobile, and Meteorological-Satellite services',
        band: 'UHF'
    },
    {
        startFreq: 462.7375,
        endFreq: 467.5375,
        unit: 'MHz',
        primaryService: 'FIXED; MOBILE 5.286AA; Meteorological-satellite (space-to-Earth) 5.287 5.288 5.289 5.290',
        secondaryService: 'FIXED; MOBILE 5.286AA; Meteorological-satellite (space-to-Earth) 5.287 5.288 5.289 5.290',
        usAllocations: 'Meteorological-satellite (space-to-Earth) US73 US209 US287 US288 US289',
        notes: 'FIXED; LAND MOBILE US73 US209 US287 US288 US289 NG124',
        fccPart: 'Maritime (80); Private Land Mobile (90)',
        description: 'Fixed, Mobile, and Meteorological-Satellite services',
        band: 'UHF'
    },
    {
        startFreq: 467.5375,
        endFreq: 467.7375,
        unit: 'MHz',
        primaryService: 'FIXED; MOBILE 5.286AA; Meteorological-satellite (space-to-Earth) 5.287 5.288 5.289 5.290',
        secondaryService: 'FIXED; MOBILE 5.286AA; Meteorological-satellite (space-to-Earth) 5.287 5.288 5.289 5.290',
        usAllocations: 'Meteorological-satellite (space-to-Earth) US73 US209 US287 US288 US289',
        notes: 'LAND MOBILE US287 US288 US289',
        fccPart: 'Maritime (80); Personal Radio (95)',
        description: 'Fixed, Mobile, and Meteorological-Satellite services',
        band: 'UHF'
    },
    {
        startFreq: 467.7375,
        endFreq: 470.0,
        unit: 'MHz',
        primaryService: 'FIXED; MOBILE 5.286AA; Meteorological-satellite (space-to-Earth) 5.287 5.288 5.289 5.290',
        secondaryService: 'FIXED; MOBILE 5.286AA; Meteorological-satellite (space-to-Earth) 5.287 5.288 5.289 5.290',
        usAllocations: 'Meteorological-satellite (space-to-Earth) US73 US209 US287 US288 US289',
        notes: 'FIXED; LAND MOBILE US73 US288 US289 NG124',
        fccPart: 'Maritime (80); Private Land Mobile (90)',
        description: 'Fixed, Mobile, and Meteorological-Satellite services',
        band: 'UHF'
    },
    {
        startFreq: 470.0,
        endFreq: 512.0,
        unit: 'MHz',
        primaryService: 'BROADCASTING',
        secondaryService: 'BROADCASTING; Fixed; Mobile 5.292 5.293 5.295',
        usAllocations: 'FIXED; LAND MOBILE; BROADCASTING NG5 NG14 NG66 NG115 NG149',
        notes: '',
        fccPart: 'Public Mobile (22); Broadcast Radio (TV)(73); LPTV, TV Translator/Booster (74G); Low Power Auxiliary (74H); Private Land Mobile (90)',
        description: 'Broadcasting, Fixed, and Mobile services',
        band: 'UHF'
    },
    {
        startFreq: 512.0,
        endFreq: 608.0,
        unit: 'MHz',
        primaryService: 'BROADCASTING',
        secondaryService: 'BROADCASTING 5.295 5.297',
        usAllocations: 'BROADCASTING',
        notes: 'BROADCASTING NG5 NG14 NG115 NG149',
        fccPart: 'Broadcast Radio (TV)(73); LPTV, TV Translator/Booster (74G); Low Power Auxiliary (74H)',
        description: 'Broadcasting services',
        band: 'UHF'
    },
    {
        startFreq: 608.0,
        endFreq: 614.0,
        unit: 'MHz',
        primaryService: 'BROADCASTING',
        secondaryService: 'RADIO ASTRONOMY; Mobile-satellite except aeronautical mobile-satellite (Earth-to-space)',
        usAllocations: 'LAND MOBILE (medical telemetry and medical telecommand); RADIO ASTRONOMY US74 US246',
        notes: '',
        fccPart: 'Personal Radio (95)',
        description: 'Broadcasting, Radio Astronomy, and Mobile-Satellite services',
        band: 'UHF'
    },
    {
        startFreq: 614.0,
        endFreq: 694.0,
        unit: 'MHz',
        primaryService: 'BROADCASTING',
        secondaryService: 'BROADCASTING; Fixed; Mobile 5.293 5.308 5.308A 5.309',
        usAllocations: 'FIXED; MOBILE; Mobile-satellite NG33A NG5 NG14 NG33 NG115 NG149',
        notes: '',
        fccPart: 'RF Devices (15); Satellite Communications (25); Wireless Communications (27); LPTV, TV Translator/Booster (74G); Low Power Auxiliary (74H)',
        description: 'Broadcasting, Fixed, Mobile, and Mobile-Satellite services',
        band: 'UHF'
    },
    {
        startFreq: 694.0,
        endFreq: 698.0,
        unit: 'MHz',
        primaryService: 'MOBILE except aeronautical mobile 5.312A 5.317A; BROADCASTING',
        secondaryService: 'BROADCASTING; Fixed; Mobile 5.293 5.308 5.308A 5.309',
        usAllocations: 'FIXED; MOBILE; Mobile-satellite NG33A NG5 NG14 NG33 NG115 NG149',
        notes: '',
        fccPart: 'RF Devices (15); Satellite Communications (25); Wireless Communications (27); LPTV, TV Translator/Booster (74G); Low Power Auxiliary (74H)',
        description: 'Mobile, Broadcasting, Fixed, and Mobile-Satellite services',
        band: 'UHF'
    },
    {
        startFreq: 698.0,
        endFreq: 758.0,
        unit: 'MHz',
        primaryService: 'MOBILE except aeronautical mobile 5.312A 5.317A; BROADCASTING',
        secondaryService: 'MOBILE 5.317A; BROADCASTING; Fixed 5.293 5.309',
        usAllocations: 'FIXED; MOBILE; BROADCASTING; Mobile-satellite NG33A NG159',
        notes: '',
        fccPart: 'Satellite Communications (25); Wireless Communications (27); LPTV and TV Translator (74G)',
        description: 'Mobile, Broadcasting, Fixed, and Mobile-Satellite services',
        band: 'UHF'
    },
    {
        startFreq: 758.0,
        endFreq: 775.0,
        unit: 'MHz',
        primaryService: 'MOBILE except aeronautical mobile 5.312A 5.317A; BROADCASTING',
        secondaryService: 'MOBILE 5.317A; BROADCASTING; Fixed 5.293 5.309',
        usAllocations: 'FIXED; MOBILE; Mobile-satellite NG33A NG34 NG159',
        notes: '',
        fccPart: 'Satellite Communications (25); Public Safety Land Mobile (90R)',
        description: 'Mobile, Broadcasting, Fixed, and Mobile-Satellite services',
        band: 'UHF'
    },
    {
        startFreq: 775.0,
        endFreq: 788.0,
        unit: 'MHz',
        primaryService: 'MOBILE except aeronautical mobile 5.312A 5.317A; BROADCASTING',
        secondaryService: 'MOBILE 5.317A; BROADCASTING; Fixed 5.293 5.309',
        usAllocations: 'FIXED; MOBILE; BROADCASTING; Mobile-satellite NG33A NG159',
        notes: '',
        fccPart: 'Satellite Communications (25); Wireless Communications (27); LPTV and TV Translator (74G)',
        description: 'Mobile, Broadcasting, Fixed, and Mobile-Satellite services',
        band: 'UHF'
    },
    {
        startFreq: 788.0,
        endFreq: 790.0,
        unit: 'MHz',
        primaryService: 'MOBILE except aeronautical mobile 5.312A 5.317A; BROADCASTING',
        secondaryService: 'MOBILE 5.317A; BROADCASTING; Fixed 5.293 5.309',
        usAllocations: 'FIXED; MOBILE; Mobile-satellite NG33A NG34 NG159',
        notes: '',
        fccPart: 'Satellite Communications (25); Public Safety Land Mobile (90R)',
        description: 'Mobile, Broadcasting, Fixed, and Mobile-Satellite services',
        band: 'UHF'
    },
    {
        startFreq: 790.0,
        endFreq: 806.0,
        unit: 'MHz',
        primaryService: 'FIXED; MOBILE except aeronautical mobile 5.316B 5.317A; BROADCASTING 5.317 5.318',
        secondaryService: 'MOBILE 5.317A; BROADCASTING; Fixed 5.293 5.309',
        usAllocations: 'FIXED; MOBILE; BROADCASTING; Mobile-satellite NG33A NG159',
        notes: '',
        fccPart: 'Satellite Communications (25); Wireless Communications (27); LPTV and TV Translator (74G)',
        description: 'Fixed, Mobile, and Broadcasting services',
        band: 'UHF'
    },
    {
        startFreq: 806.0,
        endFreq: 809.0,
        unit: 'MHz',
        primaryService: 'FIXED; MOBILE except aeronautical mobile 5.316B 5.317A; BROADCASTING 5.317 5.318',
        secondaryService: 'FIXED; MOBILE 5.317A; BROADCASTING',
        usAllocations: 'LAND MOBILE',
        notes: '',
        fccPart: 'Public Safety Land Mobile (90S)',
        description: 'Fixed, Mobile, and Broadcasting services',
        band: 'UHF'
    },
    {
        startFreq: 809.0,
        endFreq: 849.0,
        unit: 'MHz',
        primaryService: 'FIXED; MOBILE except aeronautical mobile 5.316B 5.317A; BROADCASTING 5.317 5.318',
        secondaryService: 'FIXED; MOBILE 5.317A; BROADCASTING',
        usAllocations: 'FIXED; LAND MOBILE; Mobile-satellite NG33A',
        notes: '',
        fccPart: 'Public Mobile (22); Satellite Communications (25); Private Land Mobile (90)',
        description: 'Fixed, Mobile, Broadcasting, and Mobile-Satellite services',
        band: 'UHF'
    },
    {
        startFreq: 849.0,
        endFreq: 851.0,
        unit: 'MHz',
        primaryService: 'FIXED; MOBILE except aeronautical mobile 5.316B 5.317A; BROADCASTING 5.317 5.318',
        secondaryService: 'FIXED; MOBILE 5.317A; BROADCASTING',
        usAllocations: 'AERONAUTICAL MOBILE',
        notes: '',
        fccPart: 'Public Mobile (22)',
        description: 'Fixed, Mobile, Broadcasting, and Aeronautical Mobile services',
        band: 'UHF'
    },
    {
        startFreq: 851.0,
        endFreq: 854.0,
        unit: 'MHz',
        primaryService: 'FIXED; MOBILE except aeronautical mobile 5.316B 5.317A; BROADCASTING 5.317 5.318',
        secondaryService: 'FIXED; MOBILE 5.317A; BROADCASTING',
        usAllocations: 'LAND MOBILE',
        notes: '',
        fccPart: 'Public Safety Land Mobile (90S)',
        description: 'Fixed, Mobile, and Broadcasting services',
        band: 'UHF'
    },
    {
        startFreq: 854.0,
        endFreq: 862.0,
        unit: 'MHz',
        primaryService: 'FIXED; MOBILE except aeronautical mobile 5.316B 5.317A; BROADCASTING 5.317 5.318',
        secondaryService: 'FIXED; MOBILE 5.317A; BROADCASTING',
        usAllocations: 'FIXED; LAND MOBILE; Mobile-satellite NG33A US116 US268',
        notes: '',
        fccPart: 'Public Mobile (22); Satellite Communications (25); Private Land Mobile (90)',
        description: 'Fixed, Mobile, Broadcasting, and Mobile-Satellite services',
        band: 'UHF'
    },
    {
        startFreq: 862.0,
        endFreq: 890.0,
        unit: 'MHz',
        primaryService: 'FIXED; MOBILE except aeronautical mobile 5.317A; BROADCASTING 5.322 5.319 5.323 5.320',
        secondaryService: 'FIXED; MOBILE 5.317A; BROADCASTING',
        usAllocations: 'FIXED; LAND MOBILE; Mobile-satellite NG33A US116 US268',
        notes: '',
        fccPart: 'Public Mobile (22); Satellite Communications (25); Private Land Mobile (90)',
        description: 'Fixed, Mobile, Broadcasting, and Mobile-Satellite services',
        band: 'UHF'
    },
    {
        startFreq: 890.0,
        endFreq: 894.0,
        unit: 'MHz',
        primaryService: 'FIXED; MOBILE except aeronautical mobile 5.317A; BROADCASTING 5.322; Radiolocation 5.318 5.325',
        secondaryService: 'FIXED; MOBILE except aeronautical mobile 5.317A; Radiolocation',
        usAllocations: 'AERONAUTICAL MOBILE US116 US268',
        notes: '',
        fccPart: 'Public Mobile (22)',
        description: 'Fixed, Mobile, Broadcasting, Radiolocation, and Aeronautical Mobile services',
        band: 'UHF'
    },
    {
        startFreq: 894.0,
        endFreq: 896.0,
        unit: 'MHz',
        primaryService: 'FIXED; MOBILE except aeronautical mobile 5.317A; BROADCASTING 5.322; Radiolocation 5.318 5.325',
        secondaryService: 'FIXED; MOBILE except aeronautical mobile 5.317A; Radiolocation',
        usAllocations: 'AERONAUTICAL MOBILE US116 US268',
        notes: '',
        fccPart: 'Public Mobile (22)',
        description: 'Fixed, Mobile, Broadcasting, Radiolocation, and Aeronautical Mobile services',
        band: 'UHF'
    },
    {
        startFreq: 896.0,
        endFreq: 897.5,
        unit: 'MHz',
        primaryService: 'FIXED; MOBILE except aeronautical mobile 5.317A; BROADCASTING 5.322; Radiolocation 5.318 5.325',
        secondaryService: 'FIXED; MOBILE except aeronautical mobile 5.317A; Radiolocation',
        usAllocations: 'FIXED; LAND MOBILE US116 US268',
        notes: '',
        fccPart: 'Private Land Mobile (90)',
        description: 'Fixed, Mobile, Broadcasting, and Radiolocation services',
        band: 'UHF'
    },
    {
        startFreq: 897.5,
        endFreq: 900.5,
        unit: 'MHz',
        primaryService: 'FIXED; MOBILE except aeronautical mobile 5.317A; BROADCASTING 5.322; Radiolocation 5.318 5.325',
        secondaryService: 'FIXED; MOBILE except aeronautical mobile 5.317A; Radiolocation',
        usAllocations: 'FIXED; MOBILE except aeronautical mobile US116 US268',
        notes: '',
        fccPart: 'Wireless Communications (27); Private Land Mobile (90)',
        description: 'Fixed, Mobile, Broadcasting, and Radiolocation services',
        band: 'UHF'
    },
    {
        startFreq: 900.5,
        endFreq: 901.0,
        unit: 'MHz',
        primaryService: 'FIXED; MOBILE except aeronautical mobile 5.317A; BROADCASTING 5.322; Radiolocation 5.318 5.325',
        secondaryService: 'FIXED; MOBILE except aeronautical mobile 5.317A; Radiolocation',
        usAllocations: 'FIXED; LAND MOBILE US116 US268',
        notes: '',
        fccPart: 'Private Land Mobile (90)',
        description: 'Fixed, Mobile, Broadcasting, and Radiolocation services',
        band: 'UHF'
    },
    {
        startFreq: 901.0,
        endFreq: 902.0,
        unit: 'MHz',
        primaryService: 'FIXED; MOBILE except aeronautical mobile 5.317A; BROADCASTING 5.322; Radiolocation 5.318 5.325',
        secondaryService: 'FIXED; MOBILE except aeronautical mobile 5.317A; Radiolocation',
        usAllocations: 'FIXED; MOBILE US116 US268',
        notes: '',
        fccPart: 'Personal Communications (24)',
        description: 'Fixed, Mobile, Broadcasting, and Radiolocation services',
        band: 'UHF'
    },
    {
        startFreq: 902.0,
        endFreq: 928.0,
        unit: 'MHz',
        primaryService: 'FIXED; Amateur; Mobile except aeronautical mobile 5.325A; Radiolocation 5.150 5.325 5.326',
        secondaryService: 'FIXED; Amateur; Mobile except aeronautical mobile 5.325A; Radiolocation 5.150 5.325 5.326',
        usAllocations: 'RADIOLOCATION G59 5.150 US218 US267 US275 G11',
        notes: '5.150 US218 US267 US275',
        fccPart: 'RF Devices (15); ISM Equipment (18); Private Land Mobile (90); Amateur Radio (97)',
        description: 'Fixed, Amateur, Mobile, and Radiolocation services',
        band: 'UHF'
    },
    {
        startFreq: 928.0,
        endFreq: 929.0,
        unit: 'MHz',
        primaryService: 'FIXED; MOBILE except aeronautical mobile 5.317A; Radiolocation',
        secondaryService: 'FIXED; MOBILE except aeronautical mobile 5.317A; Radiolocation',
        usAllocations: 'FIXED US116 US268 NG35',
        notes: '',
        fccPart: 'Public Mobile (22); Private Land Mobile (90); Fixed Microwave (101)',
        description: 'Fixed, Mobile, and Radiolocation services',
        band: 'UHF'
    },
    {
        startFreq: 929.0,
        endFreq: 930.0,
        unit: 'MHz',
        primaryService: 'FIXED; MOBILE except aeronautical mobile 5.317A; Radiolocation',
        secondaryService: 'FIXED; MOBILE except aeronautical mobile 5.317A; Radiolocation',
        usAllocations: 'FIXED; LAND MOBILE US116 US268',
        notes: '',
        fccPart: 'Private Land Mobile (90)',
        description: 'Fixed, Mobile, and Radiolocation services',
        band: 'UHF'
    },
    {
        startFreq: 930.0,
        endFreq: 931.0,
        unit: 'MHz',
        primaryService: 'FIXED; MOBILE except aeronautical mobile 5.317A; Radiolocation',
        secondaryService: 'FIXED; MOBILE except aeronautical mobile 5.317A; Radiolocation',
        usAllocations: 'FIXED; MOBILE US116 US268',
        notes: '',
        fccPart: 'Personal Communications (24)',
        description: 'Fixed, Mobile, and Radiolocation services',
        band: 'UHF'
    },
    {
        startFreq: 931.0,
        endFreq: 932.0,
        unit: 'MHz',
        primaryService: 'FIXED; MOBILE except aeronautical mobile 5.317A; Radiolocation',
        secondaryService: 'FIXED; MOBILE except aeronautical mobile 5.317A; Radiolocation',
        usAllocations: 'FIXED; LAND MOBILE US116 US268',
        notes: '',
        fccPart: 'Public Mobile (22)',
        description: 'Fixed, Mobile, and Radiolocation services',
        band: 'UHF'
    },
    {
        startFreq: 932.0,
        endFreq: 935.0,
        unit: 'MHz',
        primaryService: 'FIXED; MOBILE except aeronautical mobile 5.317A; BROADCASTING 5.322 5.323 5.325 5.327',
        secondaryService: 'FIXED; MOBILE except aeronautical mobile 5.317A; BROADCASTING 5.322 5.323 5.325 5.327',
        usAllocations: 'FIXED US268 G2',
        notes: 'FIXED US268 NG35',
        fccPart: 'Public Mobile (22); Fixed Microwave (101)',
        description: 'Fixed, Mobile, and Broadcasting services',
        band: 'UHF'
    },
    {
        startFreq: 935.0,
        endFreq: 936.5,
        unit: 'MHz',
        primaryService: 'FIXED; MOBILE except aeronautical mobile 5.317A; BROADCASTING 5.322 5.323 5.325 5.327',
        secondaryService: 'FIXED; MOBILE except aeronautical mobile 5.317A; BROADCASTING 5.322 5.323 5.325 5.327',
        usAllocations: 'FIXED; LAND MOBILE US116 US268',
        notes: '',
        fccPart: 'Private Land Mobile (90)',
        description: 'Fixed, Mobile, and Broadcasting services',
        band: 'UHF'
    },
    {
        startFreq: 936.5,
        endFreq: 939.5,
        unit: 'MHz',
        primaryService: 'FIXED; MOBILE except aeronautical mobile 5.317A; BROADCASTING 5.322 5.323 5.325 5.327',
        secondaryService: 'FIXED; MOBILE except aeronautical mobile 5.317A; BROADCASTING 5.322 5.323 5.325 5.327',
        usAllocations: 'FIXED; MOBILE except aeronautical mobile US116 US268',
        notes: '',
        fccPart: 'Wireless Communications (27); Private Land Mobile (90)',
        description: 'Fixed, Mobile, and Broadcasting services',
        band: 'UHF'
    },
    {
        startFreq: 939.5,
        endFreq: 940.0,
        unit: 'MHz',
        primaryService: 'FIXED; MOBILE except aeronautical mobile 5.317A; BROADCASTING 5.322 5.323 5.325 5.327',
        secondaryService: 'FIXED; MOBILE except aeronautical mobile 5.317A; BROADCASTING 5.322 5.323 5.325 5.327',
        usAllocations: 'FIXED; LAND MOBILE US116 US268',
        notes: '',
        fccPart: 'Private Land Mobile (90)',
        description: 'Fixed, Mobile, and Broadcasting services',
        band: 'UHF'
    },
    {
        startFreq: 940.0,
        endFreq: 941.0,
        unit: 'MHz',
        primaryService: 'FIXED; MOBILE except aeronautical mobile 5.317A; BROADCASTING 5.322 5.323 5.325 5.327',
        secondaryService: 'FIXED; MOBILE except aeronautical mobile 5.317A; BROADCASTING 5.322 5.323 5.325 5.327',
        usAllocations: 'FIXED; MOBILE US116 US268',
        notes: '',
        fccPart: 'Personal Communications (24)',
        description: 'Fixed, Mobile, and Broadcasting services',
        band: 'UHF'
    },
    {
        startFreq: 941.0,
        endFreq: 942.0,
        unit: 'MHz',
        primaryService: 'FIXED; MOBILE except aeronautical mobile 5.317A; BROADCASTING 5.322 5.323 5.325 5.327',
        secondaryService: 'FIXED; MOBILE 5.317A',
        usAllocations: 'FIXED US84 US268 US301 G2',
        notes: 'FIXED US84 US268 US301 NG30 NG35',
        fccPart: 'Public Mobile (22); Aural Broadcast Auxiliary (74E); Low Power Auxiliary (74H); Fixed Microwave (101)',
        description: 'Fixed, Mobile, and Broadcasting services',
        band: 'UHF'
    },
    {
        startFreq: 942.0,
        endFreq: 944.0,
        unit: 'MHz',
        primaryService: 'FIXED; MOBILE except aeronautical mobile 5.317A; BROADCASTING 5.322 5.323',
        secondaryService: 'FIXED; MOBILE 5.317A',
        usAllocations: 'FIXED US84 US268 US301 G2',
        notes: 'FIXED US84 US268 US301 NG30 NG35',
        fccPart: 'Public Mobile (22); Aural Broadcast Auxiliary (74E); Low Power Auxiliary (74H); Fixed Microwave (101)',
        description: 'Fixed, Mobile, and Broadcasting services',
        band: 'UHF'
    },
    {
        startFreq: 944.0,
        endFreq: 960.0,
        unit: 'MHz',
        primaryService: 'FIXED; MOBILE except aeronautical mobile 5.317A; BROADCASTING 5.322 5.323',
        secondaryService: 'FIXED; MOBILE 5.317A',
        usAllocations: 'FIXED',
        notes: 'FIXED NG35',
        fccPart: '',
        description: 'Fixed, Mobile, and Broadcasting services',
        band: 'UHF'
    },
    {
        startFreq: 960.0,
        endFreq: 1164.0,
        unit: 'MHz',
        primaryService: 'AERONAUTICAL MOBILE (R) 5.327A; AERONAUTICAL RADIONAVIGATION 5.328 5.328AA',
        secondaryService: 'AERONAUTICAL MOBILE (R) 5.327A; AERONAUTICAL RADIONAVIGATION 5.328 5.328AA',
        usAllocations: 'AERONAUTICAL MOBILE (R) 5.327A; AERONAUTICAL RADIONAVIGATION 5.328 US224',
        notes: '',
        fccPart: 'Aviation (87)',
        description: 'Aeronautical Mobile and Aeronautical Radionavigation services',
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
        description: 'Aeronautical Radionavigation and Radionavigation-Satellite services',
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
        description: 'Earth Exploration-Satellite, Radiolocation, Radionavigation-Satellite, and Space Research services',
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
        description: 'Earth Exploration-Satellite, Radiolocation, Radionavigation-Satellite, Space Research, and Amateur services',
        band: 'UHF'
    }
];

// Export for use in main application
if (typeof module !== 'undefined' && module.exports) {
    module.exports = peakIdentificationBand6;
} else if (typeof window !== 'undefined') {
    window.peakIdentificationBand6 = peakIdentificationBand6;
}