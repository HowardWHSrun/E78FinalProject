// Peak Identification Database - Band 5 (30-300 MHz)
// Turner Engineering Corporation - EMC Testing Support
// 
// ========================================================================
// BAND 5: VERY HIGH FREQUENCY (VHF)
// ========================================================================
// 
// Frequency Range: 25 - 325 MHz
// Total Allocations: ~65 frequency segments
// Spectrum Coverage: VHF band including broadcasting and amateur allocations
// 
// KEY SERVICES COVERED:
// • Amateur Radio Bands:
//   - 10 meters (28-29.7 MHz) - Upper portion
//   - 6 meters (50-54 MHz)
//   - 2 meters (144-148 MHz)
//   - 1.25 meters (220-225 MHz)
// • FM Broadcasting (88-108 MHz)
// • Television Broadcasting:
//   - VHF-Lo: Channels 2-4 (54-72 MHz)
//   - VHF-Hi: Channels 7-13 (174-216 MHz)
// • Aviation:
//   - VOR/ILS (108-118 MHz)
//   - Air Traffic Control (118-137 MHz)
// • Weather Satellites (137-138 MHz)
// • Maritime VHF (156-162 MHz)
// • Public Safety/Land Mobile (150.8-174 MHz)
// • Radio Astronomy (73-74.6 MHz)
// 
// NOTABLE FREQUENCIES:
// • 88-108 MHz - FM broadcasting band
// • 108-118 MHz - Aviation navigation (VOR/ILS)
// • 118-137 MHz - Aviation communications
// • 144-148 MHz - Amateur radio 2m band
// • 156-162 MHz - Maritime VHF
// • 162.4-162.55 MHz - NOAA Weather Radio
// 
// FCC PART REFERENCES:
// • Part 73: FM Radio and TV Broadcasting
// • Part 74: Low Power TV and Translators
// • Part 80: Maritime Services
// • Part 87: Aviation Services
// • Part 90: Private Land Mobile
// • Part 97: Amateur Radio
// 
// ITU FOOTNOTES: Extensive 5.xxx series covering broadcasting
// coordination, aeronautical requirements, and amateur allocations
// 
// TECHNICAL NOTES:
// • Line-of-sight propagation dominates
// • Tropospheric propagation enhancements
// • FM broadcasting and stereo multiplex
// • Aviation safety-critical communications
// • Emergency and public safety systems
// • Satellite weather downlinks
// 
// ========================================================================


const peakIdentificationBand5 = [
    {
        startFreq: 24.99,
        endFreq: 25.005,
        unit: 'MHz',
        primaryService: 'STANDARD FREQUENCY AND TIME SIGNAL (25 MHz)',
        secondaryService: 'STANDARD FREQUENCY AND TIME SIGNAL (25 MHz)',
        usAllocations: 'STANDARD FREQUENCY AND TIME SIGNAL (25 MHz) US1 US340',
        notes: '',
        fccPart: '',
        description: 'Standard Frequency and Time Signal',
        band: 'VHF'
    },
    {
        startFreq: 25.005,
        endFreq: 25.01,
        unit: 'MHz',
        primaryService: 'STANDARD FREQUENCY AND TIME SIGNAL; Space research',
        secondaryService: 'STANDARD FREQUENCY AND TIME SIGNAL (25 MHz)',
        usAllocations: 'STANDARD FREQUENCY AND TIME SIGNAL (25 MHz) US1 US340',
        notes: '',
        fccPart: '',
        description: 'Standard Frequency and Time Signal, Space research',
        band: 'VHF'
    },
    {
        startFreq: 25.01,
        endFreq: 25.07,
        unit: 'MHz',
        primaryService: 'FIXED; MOBILE except aeronautical mobile',
        secondaryService: 'FIXED; MOBILE except aeronautical mobile',
        usAllocations: 'US340',
        notes: 'LAND MOBILE US340 NG112',
        fccPart: 'Private Land Mobile (90)',
        description: 'Fixed and Mobile services',
        band: 'VHF'
    },
    {
        startFreq: 25.07,
        endFreq: 25.21,
        unit: 'MHz',
        primaryService: 'MARITIME MOBILE',
        secondaryService: 'MARITIME MOBILE',
        usAllocations: 'MARITIME MOBILE US82 US281 US296 US340',
        notes: 'MARITIME MOBILE US82 US281 US296 US340 NG112',
        fccPart: 'Maritime (80); Private Land Mobile (90)',
        description: 'Maritime Mobile services',
        band: 'VHF'
    },
    {
        startFreq: 25.21,
        endFreq: 25.33,
        unit: 'MHz',
        primaryService: 'FIXED; MOBILE except aeronautical mobile',
        secondaryService: 'FIXED; MOBILE except aeronautical mobile',
        usAllocations: 'US340',
        notes: 'LAND MOBILE US340',
        fccPart: 'Private Land Mobile (90)',
        description: 'Fixed and Mobile services',
        band: 'VHF'
    },
    {
        startFreq: 25.33,
        endFreq: 25.55,
        unit: 'MHz',
        primaryService: 'FIXED; MOBILE except aeronautical mobile',
        secondaryService: 'FIXED; MOBILE except aeronautical mobile',
        usAllocations: 'FIXED; MOBILE except aeronautical mobile US340',
        notes: '',
        fccPart: '',
        description: 'Fixed and Mobile services',
        band: 'VHF'
    },
    {
        startFreq: 25.55,
        endFreq: 25.67,
        unit: 'MHz',
        primaryService: 'RADIO ASTRONOMY 5.149',
        secondaryService: 'RADIO ASTRONOMY 5.149',
        usAllocations: 'RADIO ASTRONOMY US74 US342',
        notes: '',
        fccPart: '',
        description: 'Radio Astronomy',
        band: 'VHF'
    },
    {
        startFreq: 25.67,
        endFreq: 26.1,
        unit: 'MHz',
        primaryService: 'BROADCASTING',
        secondaryService: 'BROADCASTING',
        usAllocations: 'BROADCASTING US25 US340',
        notes: '',
        fccPart: 'International Broadcast Stations (73F); Remote Pickup (74D)',
        description: 'Broadcasting services',
        band: 'VHF'
    },
    {
        startFreq: 26.1,
        endFreq: 26.175,
        unit: 'MHz',
        primaryService: 'MARITIME MOBILE 5.132',
        secondaryService: 'MARITIME MOBILE 5.132',
        usAllocations: 'MARITIME MOBILE 5.132 US25 US340',
        notes: '',
        fccPart: 'Remote Pickup (74D); Low Power Auxiliary (74H); Maritime (80)',
        description: 'Maritime Mobile services',
        band: 'VHF'
    },
    {
        startFreq: 26.175,
        endFreq: 26.2,
        unit: 'MHz',
        primaryService: 'FIXED; MOBILE except aeronautical mobile',
        secondaryService: 'FIXED; MOBILE except aeronautical mobile',
        usAllocations: 'US340',
        notes: 'LAND MOBILE US340',
        fccPart: 'Remote Pickup (74D); Low Power Auxiliary (74H)',
        description: 'Fixed and Mobile services',
        band: 'VHF'
    },
    {
        startFreq: 26.2,
        endFreq: 26.35,
        unit: 'MHz',
        primaryService: 'FIXED; MOBILE except aeronautical mobile; Radiolocation 5.132A 5.133A',
        secondaryService: 'FIXED; MOBILE except aeronautical mobile; RADIOLOCATION 5.132A',
        usAllocations: 'RADIOLOCATION US132A US340',
        notes: 'LAND MOBILE; RADIOLOCATION US132A US340',
        fccPart: 'Remote Pickup (74D); Low Power Auxiliary (74H); Private Land Mobile (90)',
        description: 'Fixed, Mobile, and Radiolocation services',
        band: 'VHF'
    },
    {
        startFreq: 26.35,
        endFreq: 26.42,
        unit: 'MHz',
        primaryService: 'FIXED; MOBILE except aeronautical mobile 5.150',
        secondaryService: 'FIXED; MOBILE except aeronautical mobile; RADIOLOCATION 5.132A',
        usAllocations: 'RADIOLOCATION US132A US340',
        notes: 'LAND MOBILE; RADIOLOCATION US132A US340',
        fccPart: 'Remote Pickup (74D); Low Power Auxiliary (74H); Private Land Mobile (90)',
        description: 'Fixed, Mobile, and Radiolocation services',
        band: 'VHF'
    },
    {
        startFreq: 26.42,
        endFreq: 26.48,
        unit: 'MHz',
        primaryService: 'FIXED; MOBILE except aeronautical mobile 5.150',
        secondaryService: 'FIXED; MOBILE except aeronautical mobile 5.150',
        usAllocations: 'US340',
        notes: 'LAND MOBILE US340',
        fccPart: 'Remote Pickup (74D); Low Power Auxiliary (74H)',
        description: 'Fixed and Mobile services',
        band: 'VHF'
    },
    {
        startFreq: 26.48,
        endFreq: 26.95,
        unit: 'MHz',
        primaryService: 'FIXED; MOBILE except aeronautical mobile 5.150',
        secondaryService: 'FIXED; MOBILE except aeronautical mobile 5.150',
        usAllocations: 'FIXED; MOBILE except aeronautical mobile US340',
        notes: '',
        fccPart: '',
        description: 'Fixed and Mobile services',
        band: 'VHF'
    },
    {
        startFreq: 26.95,
        endFreq: 26.96,
        unit: 'MHz',
        primaryService: 'FIXED; MOBILE except aeronautical mobile 5.150',
        secondaryService: 'FIXED; MOBILE except aeronautical mobile 5.150',
        usAllocations: '5.150 US340',
        notes: 'FIXED 5.150 US340',
        fccPart: 'ISM Equipment (18)',
        description: 'Fixed and Mobile services, ISM Equipment',
        band: 'VHF'
    },
    {
        startFreq: 26.96,
        endFreq: 27.23,
        unit: 'MHz',
        primaryService: 'FIXED; MOBILE except aeronautical mobile 5.150',
        secondaryService: 'FIXED; MOBILE except aeronautical mobile 5.150',
        usAllocations: '5.150 US340',
        notes: 'MOBILE except aeronautical mobile 5.150 US340',
        fccPart: 'ISM Equipment (18); Personal Radio (95)',
        description: 'Fixed and Mobile services, ISM Equipment, Personal Radio',
        band: 'VHF'
    },
    {
        startFreq: 27.23,
        endFreq: 27.41,
        unit: 'MHz',
        primaryService: 'FIXED; MOBILE except aeronautical mobile 5.150',
        secondaryService: 'FIXED; MOBILE except aeronautical mobile 5.150',
        usAllocations: '5.150 US340',
        notes: 'FIXED; MOBILE except aeronautical mobile 5.150 US340',
        fccPart: 'ISM Equipment (18); Private Land Mobile (90); Personal Radio (95)',
        description: 'Fixed and Mobile services, ISM Equipment, Private Land Mobile, Personal Radio',
        band: 'VHF'
    },
    {
        startFreq: 27.41,
        endFreq: 27.54,
        unit: 'MHz',
        primaryService: 'METEOROLOGICAL AIDS; FIXED; MOBILE',
        secondaryService: 'FIXED; MOBILE except aeronautical mobile 5.150',
        usAllocations: 'US340',
        notes: 'FIXED; LAND MOBILE US340',
        fccPart: 'Private Land Mobile (90)',
        description: 'Meteorological Aids, Fixed and Mobile services',
        band: 'VHF'
    },
    {
        startFreq: 27.54,
        endFreq: 28,
        unit: 'MHz',
        primaryService: 'METEORological AIDS; FIXED; MOBILE',
        secondaryService: 'FIXED; MOBILE',
        usAllocations: 'FIXED; MOBILE US298 US340',
        notes: '',
        fccPart: '',
        description: 'Meteorological Aids, Fixed and Mobile services',
        band: 'VHF'
    },
    {
        startFreq: 28,
        endFreq: 29.7,
        unit: 'MHz',
        primaryService: 'AMATEUR; AMATEUR-SATELLITE',
        secondaryService: 'AMATEUR; AMATEUR-SATELLITE',
        usAllocations: 'US340',
        notes: 'AMATEUR; AMATEUR-SATELLITE US340',
        fccPart: 'Amateur Radio (97)',
        description: 'Amateur and Amateur-Satellite radio',
        band: 'VHF'
    },
    {
        startFreq: 29.7,
        endFreq: 29.8,
        unit: 'MHz',
        primaryService: 'FIXED; MOBILE',
        secondaryService: 'FIXED; MOBILE',
        usAllocations: 'US340',
        notes: 'LAND MOBILE US340',
        fccPart: 'Private Land Mobile (90)',
        description: 'Fixed and Mobile services',
        band: 'VHF'
    },
    {
        startFreq: 29.8,
        endFreq: 29.89,
        unit: 'MHz',
        primaryService: 'FIXED; MOBILE',
        secondaryService: 'FIXED; MOBILE',
        usAllocations: 'US340',
        notes: 'FIXED US340',
        fccPart: '',
        description: 'Fixed and Mobile services',
        band: 'VHF'
    },
    {
        startFreq: 29.89,
        endFreq: 29.91,
        unit: 'MHz',
        primaryService: 'FIXED; MOBILE',
        secondaryService: 'FIXED; MOBILE',
        usAllocations: 'FIXED; MOBILE US340',
        notes: '',
        fccPart: '',
        description: 'Fixed and Mobile services',
        band: 'VHF'
    },
    {
        startFreq: 29.91,
        endFreq: 30.005,
        unit: 'MHz',
        primaryService: 'FIXED; MOBILE',
        secondaryService: 'FIXED; MOBILE',
        usAllocations: 'US340',
        notes: 'FIXED US340',
        fccPart: '',
        description: 'Fixed and Mobile services',
        band: 'VHF'
    },
    {
        startFreq: 30.005,
        endFreq: 30.01,
        unit: 'MHz',
        primaryService: 'SPACE OPERATION (satellite identification); FIXED; MOBILE; SPACE RESEARCH',
        secondaryService: 'SPACE OPERATION (satellite identification); FIXED; MOBILE; SPACE RESEARCH',
        usAllocations: 'FIXED; MOBILE',
        notes: 'FIXED; MOBILE NG124',
        fccPart: 'Private Land Mobile (90)',
        description: 'Space Operation, Fixed, Mobile, and Space Research services',
        band: 'VHF'
    },
    {
        startFreq: 30.01,
        endFreq: 30.56,
        unit: 'MHz',
        primaryService: 'FIXED; MOBILE',
        secondaryService: 'FIXED; MOBILE',
        usAllocations: 'FIXED; MOBILE',
        notes: 'FIXED; MOBILE NG124',
        fccPart: 'Private Land Mobile (90)',
        description: 'Fixed and Mobile services',
        band: 'VHF'
    },
    {
        startFreq: 30.56,
        endFreq: 32,
        unit: 'MHz',
        primaryService: 'FIXED; MOBILE',
        secondaryService: 'FIXED; MOBILE',
        usAllocations: 'FIXED; MOBILE',
        notes: 'FIXED; LAND MOBILE NG124',
        fccPart: 'Private Land Mobile (90)',
        description: 'Fixed and Mobile services',
        band: 'VHF'
    },
    {
        startFreq: 32,
        endFreq: 33,
        unit: 'MHz',
        primaryService: 'FIXED; MOBILE',
        secondaryService: 'FIXED; MOBILE',
        usAllocations: 'FIXED; MOBILE',
        notes: 'FIXED; LAND MOBILE NG124',
        fccPart: 'Private Land Mobile (90)',
        description: 'Fixed and Mobile services',
        band: 'VHF'
    },
    {
        startFreq: 33,
        endFreq: 34,
        unit: 'MHz',
        primaryService: 'FIXED; MOBILE',
        secondaryService: 'FIXED; MOBILE',
        usAllocations: 'FIXED; MOBILE',
        notes: 'FIXED; LAND MOBILE NG124',
        fccPart: 'Private Land Mobile (90)',
        description: 'Fixed and Mobile services',
        band: 'VHF'
    },
    {
        startFreq: 34,
        endFreq: 35,
        unit: 'MHz',
        primaryService: 'FIXED; MOBILE',
        secondaryService: 'FIXED; MOBILE',
        usAllocations: 'FIXED; MOBILE',
        notes: 'FIXED; LAND MOBILE',
        fccPart: 'Public Mobile (22); Private Land Mobile (90)',
        description: 'Fixed and Mobile services',
        band: 'VHF'
    },
    {
        startFreq: 35,
        endFreq: 36,
        unit: 'MHz',
        primaryService: 'FIXED; MOBILE',
        secondaryService: 'FIXED; MOBILE',
        usAllocations: 'FIXED; MOBILE',
        notes: 'FIXED; LAND MOBILE',
        fccPart: 'Public Mobile (22); Private Land Mobile (90)',
        description: 'Fixed and Mobile services',
        band: 'VHF'
    },
    {
        startFreq: 36,
        endFreq: 37,
        unit: 'MHz',
        primaryService: 'FIXED; MOBILE US220',
        secondaryService: 'FIXED; MOBILE US220',
        usAllocations: 'FIXED; MOBILE US220',
        notes: '',
        fccPart: '',
        description: 'Fixed and Mobile services',
        band: 'VHF'
    },
    {
        startFreq: 37,
        endFreq: 37.5,
        unit: 'MHz',
        primaryService: 'FIXED; MOBILE; Radio astronomy 5.149',
        secondaryService: 'FIXED; MOBILE; Radio astronomy 5.149',
        usAllocations: 'Radio astronomy US342',
        notes: 'LAND MOBILE; Radio astronomy US342 NG59 NG124',
        fccPart: 'Private Land Mobile (90)',
        description: 'Fixed, Mobile, and Radio Astronomy services',
        band: 'VHF'
    },
    {
        startFreq: 37.5,
        endFreq: 38.25,
        unit: 'MHz',
        primaryService: 'FIXED; MOBILE; Radio astronomy 5.149',
        secondaryService: 'FIXED; MOBILE; RADIO ASTRONOMY',
        usAllocations: 'FIXED; MOBILE; RADIO ASTRONOMY US81 US342',
        notes: '',
        fccPart: '',
        description: 'Fixed, Mobile, and Radio Astronomy services',
        band: 'VHF'
    },
    {
        startFreq: 38.25,
        endFreq: 39,
        unit: 'MHz',
        primaryService: 'FIXED; MOBILE',
        secondaryService: 'FIXED; MOBILE',
        usAllocations: 'FIXED; MOBILE',
        notes: 'LAND MOBILE',
        fccPart: 'Private Land Mobile (90)',
        description: 'Fixed and Mobile services',
        band: 'VHF'
    },
    {
        startFreq: 39,
        endFreq: 39.5,
        unit: 'MHz',
        primaryService: 'FIXED; MOBILE',
        secondaryService: 'FIXED; MOBILE; Radiolocation 5.132A 5.159',
        usAllocations: 'FIXED; MOBILE; RADIOLOCATION 5.132A NG124',
        notes: 'LAND MOBILE',
        fccPart: 'Private Land Mobile (90)',
        description: 'Fixed, Mobile, and Radiolocation services',
        band: 'VHF'
    },
    {
        startFreq: 39.5,
        endFreq: 39.986,
        unit: 'MHz',
        primaryService: 'FIXED; MOBILE',
        secondaryService: 'FIXED; MOBILE',
        usAllocations: 'FIXED; MOBILE; RADIOLOCATION 5.132A NG124',
        notes: 'LAND MOBILE',
        fccPart: 'Private Land Mobile (90)',
        description: 'Fixed, Mobile, and Radiolocation services',
        band: 'VHF'
    },
    {
        startFreq: 39.986,
        endFreq: 40.02,
        unit: 'MHz',
        primaryService: 'FIXED; MOBILE; Space research',
        secondaryService: 'FIXED; MOBILE; Space research',
        usAllocations: 'FIXED; MOBILE; RADIOLOCATION 5.132A; Space research',
        notes: 'LAND MOBILE 5.150 US210 US220',
        fccPart: 'ISM Equipment (18); Private Land Mobile (90)',
        description: 'Fixed, Mobile, Space research, Radiolocation, and ISM Equipment',
        band: 'VHF'
    },
    {
        startFreq: 40.02,
        endFreq: 40.98,
        unit: 'MHz',
        primaryService: 'FIXED; MOBILE 5.150',
        secondaryService: 'FIXED; MOBILE 5.150',
        usAllocations: 'FIXED; MOBILE 5.150 US210 US220',
        notes: 'LAND MOBILE 5.150 US210 US220',
        fccPart: 'ISM Equipment (18); Private Land Mobile (90)',
        description: 'Fixed and Mobile services, ISM Equipment',
        band: 'VHF'
    },
    {
        startFreq: 40.98,
        endFreq: 41.015,
        unit: 'MHz',
        primaryService: 'FIXED; MOBILE; Space research 5.160 5.161',
        secondaryService: 'FIXED; MOBILE; Space research 5.160 5.161',
        usAllocations: 'FIXED; MOBILE; RADIOLOCATION US132A US220',
        notes: 'RADIOLOCATION US132A US220',
        fccPart: 'Private Land Mobile (90)',
        description: 'Fixed, Mobile, Space research, and Radiolocation',
        band: 'VHF'
    },
    {
        startFreq: 41.015,
        endFreq: 41.665,
        unit: 'MHz',
        primaryService: 'FIXED; MOBILE 5.160 5.161 5.161A',
        secondaryService: 'FIXED; MOBILE 5.160 5.161 5.161A',
        usAllocations: 'FIXED; MOBILE; RADIOLOCATION US132A US220',
        notes: 'RADIOLOCATION US132A US220',
        fccPart: 'Private Land Mobile (90)',
        description: 'Fixed, Mobile, and Radiolocation services',
        band: 'VHF'
    },
    {
        startFreq: 41.665,
        endFreq: 42,
        unit: 'MHz',
        primaryService: 'FIXED; MOBILE 5.160 5.161 5.161A',
        secondaryService: 'FIXED; MOBILE 5.160 5.161 5.161A',
        usAllocations: 'FIXED; MOBILE US220',
        notes: '',
        fccPart: '',
        description: 'Fixed and Mobile services',
        band: 'VHF'
    },
    {
        startFreq: 42,
        endFreq: 42.5,
        unit: 'MHz',
        primaryService: 'FIXED; MOBILE; Radiolocation 5.132A 5.160 5.161B',
        secondaryService: 'FIXED; MOBILE 5.161',
        usAllocations: 'FIXED; MOBILE',
        notes: 'FIXED; LAND MOBILE',
        fccPart: 'Public Mobile (22); Private Land Mobile (90)',
        description: 'Fixed, Mobile, and Radiolocation services',
        band: 'VHF'
    },
    {
        startFreq: 42.5,
        endFreq: 43.35,
        unit: 'MHz',
        primaryService: 'FIXED; MOBILE 5.160 5.161 5.161A',
        secondaryService: 'FIXED; MOBILE 5.160 5.161 5.161A',
        usAllocations: 'FIXED; MOBILE',
        notes: 'FIXED; LAND MOBILE',
        fccPart: 'Public Mobile (22); Private Land Mobile (90)',
        description: 'Fixed and Mobile services',
        band: 'VHF'
    },
    {
        startFreq: 43.35,
        endFreq: 43.69,
        unit: 'MHz',
        primaryService: 'FIXED; MOBILE 5.160 5.161 5.161A',
        secondaryService: 'FIXED; MOBILE 5.160 5.161 5.161A',
        usAllocations: 'RADIOLOCATION US132A',
        notes: 'FIXED; LAND MOBILE; RADIOLOCATION US132A NG124',
        fccPart: 'Private Land Mobile (90)',
        description: 'Fixed, Mobile, and Radiolocation services',
        band: 'VHF'
    },
    {
        startFreq: 43.69,
        endFreq: 44,
        unit: 'MHz',
        primaryService: 'FIXED; MOBILE 5.160 5.161 5.161A',
        secondaryService: 'FIXED; MOBILE 5.160 5.161 5.161A',
        usAllocations: 'RADIOLOCATION US132A',
        notes: 'LAND MOBILE; RADIOLOCATION US132A NG124',
        fccPart: 'Private Land Mobile (90)',
        description: 'Fixed, Mobile, and Radiolocation services',
        band: 'VHF'
    },
    {
        startFreq: 44,
        endFreq: 46.6,
        unit: 'MHz',
        primaryService: 'FIXED; MOBILE 5.162 5.162A',
        secondaryService: 'FIXED; MOBILE 5.162 5.162A',
        usAllocations: 'FIXED; MOBILE',
        notes: 'LAND MOBILE NG124 NG141',
        fccPart: '',
        description: 'Fixed and Mobile services',
        band: 'VHF'
    },
    {
        startFreq: 46.6,
        endFreq: 47,
        unit: 'MHz',
        primaryService: 'FIXED; MOBILE 5.162 5.162A',
        secondaryService: 'FIXED; MOBILE 5.162 5.162A',
        usAllocations: 'FIXED; MOBILE',
        notes: 'FIXED; MOBILE',
        fccPart: '',
        description: 'Fixed and Mobile services',
        band: 'VHF'
    },
    {
        startFreq: 47,
        endFreq: 49.6,
        unit: 'MHz',
        primaryService: 'BROADCASTING 5.162A 5.163 5.164 5.165',
        secondaryService: 'FIXED; MOBILE',
        usAllocations: 'FIXED; MOBILE',
        notes: 'LAND MOBILE NG124',
        fccPart: 'Private Land Mobile (90)',
        description: 'Broadcasting, Fixed, and Mobile services',
        band: 'VHF'
    },
    {
        startFreq: 49.6,
        endFreq: 50,
        unit: 'MHz',
        primaryService: 'BROADCASTING 5.162A 5.163 5.164 5.165',
        secondaryService: 'FIXED; MOBILE',
        usAllocations: 'FIXED; MOBILE',
        notes: 'FIXED; MOBILE',
        fccPart: '',
        description: 'Broadcasting, Fixed, and Mobile services',
        band: 'VHF'
    },
    {
        startFreq: 50,
        endFreq: 52,
        unit: 'MHz',
        primaryService: 'BROADCASTING; Amateur 5.166A 5.166B 5.166C 5.166D 5.166E 5.169 5.169A 5.169B 5.162A 5.164 5.165',
        secondaryService: 'AMATEUR 5.162A 5.167 5.167A 5.168 5.170',
        usAllocations: 'AMATEUR',
        notes: 'AMATEUR',
        fccPart: 'Amateur Radio (97)',
        description: 'Broadcasting and Amateur Radio',
        band: 'VHF'
    },
    {
        startFreq: 52,
        endFreq: 54,
        unit: 'MHz',
        primaryService: 'BROADCASTING 5.162A 5.163 5.164 5.165 5.169 5.169A 5.169B 5.171',
        secondaryService: 'AMATEUR 5.162A 5.167 5.167A 5.168 5.170',
        usAllocations: 'AMATEUR',
        notes: 'AMATEUR',
        fccPart: 'Amateur Radio (97)',
        description: 'Broadcasting and Amateur Radio',
        band: 'VHF'
    },
    {
        startFreq: 54,
        endFreq: 68,
        unit: 'MHz',
        primaryService: 'BROADCASTING 5.162A 5.163 5.164 5.165 5.169 5.169A 5.169B 5.171',
        secondaryService: 'BROADCASTING; Fixed; Mobile 5.172',
        usAllocations: 'BROADCASTING',
        notes: 'BROADCASTING NG5 NG14 NG115 NG149',
        fccPart: 'Broadcast Radio (TV)(73); LPTV, TV Translator/Booster (74G); Low Power Auxiliary (74H)',
        description: 'Broadcasting, Fixed, and Mobile services',
        band: 'VHF'
    },
    {
        startFreq: 68,
        endFreq: 72,
        unit: 'MHz',
        primaryService: 'FIXED; MOBILE except aeronautical mobile 5.149 5.175 5.177 5.179',
        secondaryService: 'BROADCASTING; Fixed; Mobile 5.173',
        usAllocations: 'BROADCASTING',
        notes: 'BROADCASTING NG5 NG14 NG115 NG149',
        fccPart: 'Broadcast Radio (TV)(73); LPTV, TV Translator/Booster (74G); Low Power Auxiliary (74H)',
        description: 'Fixed, Mobile, and Broadcasting services',
        band: 'VHF'
    },
    {
        startFreq: 72,
        endFreq: 73,
        unit: 'MHz',
        primaryService: 'FIXED; MOBILE except aeronautical mobile 5.149 5.175 5.177 5.179',
        secondaryService: 'FIXED; MOBILE',
        usAllocations: 'FIXED; MOBILE',
        notes: 'FIXED; MOBILE NG3 NG16 NG56',
        fccPart: 'Public Mobile (22); Maritime (80); Aviation (87); Private Land Mobile (90); Personal Radio (95)',
        description: 'Fixed and Mobile services',
        band: 'VHF'
    },
    {
        startFreq: 73,
        endFreq: 74.6,
        unit: 'MHz',
        primaryService: 'RADIO ASTRONOMY 5.178',
        secondaryService: 'RADIO ASTRONOMY 5.178',
        usAllocations: 'RADIO ASTRONOMY US74 US246',
        notes: '',
        fccPart: '',
        description: 'Radio Astronomy',
        band: 'VHF'
    },
    {
        startFreq: 74.6,
        endFreq: 74.8,
        unit: 'MHz',
        primaryService: 'FIXED; MOBILE except aeronautical mobile 5.149 5.175 5.177 5.179',
        secondaryService: 'FIXED; MOBILE',
        usAllocations: 'FIXED; MOBILE US273',
        notes: '',
        fccPart: 'Private Land Mobile (90)',
        description: 'Fixed and Mobile services',
        band: 'VHF'
    },
    {
        startFreq: 74.8,
        endFreq: 75.2,
        unit: 'MHz',
        primaryService: 'AERONAUTICAL RADIONAVIGATION 5.180 5.181',
        secondaryService: 'AERONAUTICAL RADIONAVIGATION 5.180 5.181',
        usAllocations: 'AERONAUTICAL RADIONAVIGATION 5.180',
        notes: '',
        fccPart: 'Aviation (87)',
        description: 'Aeronautical Radionavigation',
        band: 'VHF'
    },
    {
        startFreq: 75.2,
        endFreq: 75.4,
        unit: 'MHz',
        primaryService: 'FIXED; MOBILE except aeronautical mobile 5.179',
        secondaryService: 'FIXED; MOBILE',
        usAllocations: 'FIXED; MOBILE US273',
        notes: '',
        fccPart: 'Private Land Mobile (90)',
        description: 'Fixed and Mobile services',
        band: 'VHF'
    },
    {
        startFreq: 75.4,
        endFreq: 76,
        unit: 'MHz',
        primaryService: 'FIXED; MOBILE except aeronautical mobile 5.179',
        secondaryService: 'FIXED; MOBILE',
        usAllocations: 'FIXED; MOBILE',
        notes: 'FIXED; MOBILE NG3 NG16 NG56',
        fccPart: 'Public Mobile (22); Maritime (80); Aviation (87); Private Land Mobile (90); Personal Radio (95)',
        description: 'Fixed and Mobile services',
        band: 'VHF'
    },
    {
        startFreq: 76,
        endFreq: 87.5,
        unit: 'MHz',
        primaryService: 'FIXED; MOBILE except aeronautical mobile 5.175 5.179 5.187',
        secondaryService: 'BROADCASTING; Fixed; Mobile 5.185',
        usAllocations: 'BROADCASTING',
        notes: 'BROADCASTING NG5 NG14 NG115 NG149',
        fccPart: 'Broadcast Radio (TV)(73); LPTV, TV Translator/Booster (74G); Low Power Auxiliary (74H)',
        description: 'Fixed, Mobile, and Broadcasting services',
        band: 'VHF'
    },
    {
        startFreq: 87.5,
        endFreq: 88,
        unit: 'MHz',
        primaryService: 'FIXED; MOBILE; BROADCASTING 5.175 5.179 5.187',
        secondaryService: 'BROADCASTING 5.190',
        usAllocations: 'BROADCASTING',
        notes: 'BROADCASTING NG2 US93 NG5',
        fccPart: 'Broadcast Radio (FM)(73); FM Translator/Booster (74L)',
        description: 'Fixed, Mobile, and Broadcasting services',
        band: 'VHF'
    },
    {
        startFreq: 88,
        endFreq: 100,
        unit: 'MHz',
        primaryService: 'BROADCASTING',
        secondaryService: 'BROADCASTING 5.190',
        usAllocations: 'BROADCASTING',
        notes: 'BROADCASTING NG2 US93 NG5',
        fccPart: 'Broadcast Radio (FM)(73); FM Translator/Booster (74L)',
        description: 'Broadcasting services (FM)',
        band: 'VHF'
    },
    {
        startFreq: 100,
        endFreq: 108,
        unit: 'MHz',
        primaryService: 'BROADCASTING 5.192 5.194',
        secondaryService: 'BROADCASTING 5.192 5.194',
        usAllocations: 'BROADCASTING',
        notes: 'BROADCASTING NG2 US93 NG5',
        fccPart: 'Broadcast Radio (FM)(73); FM Translator/Booster (74L)',
        description: 'Broadcasting services (FM)',
        band: 'VHF'
    },
    {
        startFreq: 108,
        endFreq: 117.975,
        unit: 'MHz',
        primaryService: 'AERONAUTICAL RADIONAVIGATION 5.197 5.197A',
        secondaryService: 'AERONAUTICAL RADIONAVIGATION 5.197 5.197A',
        usAllocations: 'AERONAUTICAL RADIONAVIGATION 5.197A US93',
        notes: '',
        fccPart: 'Aviation (87)',
        description: 'Aeronautical Radionavigation',
        band: 'VHF'
    },
    {
        startFreq: 117.975,
        endFreq: 121.9375,
        unit: 'MHz',
        primaryService: 'AERONAUTICAL MOBILE (R)',
        secondaryService: 'AERONAUTICAL MOBILE (R)',
        usAllocations: 'AERONAUTICAL MOBILE (R) 5.111 5.200 US26 US28 US36',
        notes: '',
        fccPart: 'Aviation (87)',
        description: 'Aeronautical Mobile (Route)',
        band: 'VHF'
    },
    {
        startFreq: 121.9375,
        endFreq: 123.0875,
        unit: 'MHz',
        primaryService: 'AERONAUTICAL MOBILE (R)',
        secondaryService: 'AERONAUTICAL MOBILE (R)',
        usAllocations: 'US30 US31 US33 US80 US102 US213',
        notes: 'AERONAUTICAL MOBILE US30 US31 US33 US80 US102 US213',
        fccPart: 'Aviation (87)',
        description: 'Aeronautical Mobile',
        band: 'VHF'
    },
    {
        startFreq: 123.0875,
        endFreq: 123.5875,
        unit: 'MHz',
        primaryService: 'AERONAUTICAL MOBILE (R)',
        secondaryService: 'AERONAUTICAL MOBILE (R)',
        usAllocations: 'AERONAUTICAL MOBILE 5.200 US32 US33 US112',
        notes: '',
        fccPart: 'Aviation (87)',
        description: 'Aeronautical Mobile',
        band: 'VHF'
    },
    {
        startFreq: 123.5875,
        endFreq: 128.8125,
        unit: 'MHz',
        primaryService: 'AERONAUTICAL MOBILE (R)',
        secondaryService: 'AERONAUTICAL MOBILE (R)',
        usAllocations: 'AERONAUTICAL MOBILE (R) US26 US36',
        notes: '',
        fccPart: 'Aviation (87)',
        description: 'Aeronautical Mobile (Route)',
        band: 'VHF'
    },
    {
        startFreq: 128.8125,
        endFreq: 132.0125,
        unit: 'MHz',
        primaryService: 'AERONAUTICAL MOBILE (R)',
        secondaryService: 'AERONAUTICAL MOBILE (R)',
        usAllocations: 'AERONAUTICAL MOBILE (R)',
        notes: '',
        fccPart: 'Aviation (87)',
        description: 'Aeronautical Mobile (Route)',
        band: 'VHF'
    },
    {
        startFreq: 132.0125,
        endFreq: 136,
        unit: 'MHz',
        primaryService: 'AERONAUTICAL MOBILE (R)',
        secondaryService: 'AERONAUTICAL MOBILE (R)',
        usAllocations: 'AERONAUTICAL MOBILE (R) US26',
        notes: '',
        fccPart: 'Aviation (87)',
        description: 'Aeronautical Mobile (Route)',
        band: 'VHF'
    },
    {
        startFreq: 136,
        endFreq: 137,
        unit: 'MHz',
        primaryService: 'AERONAUTICAL MOBILE (R) 5.111 5.200 5.201 5.202',
        secondaryService: 'AERONAUTICAL MOBILE (R) 5.111 5.200 5.201 5.202',
        usAllocations: 'AERONAUTICAL MOBILE (R) US244',
        notes: 'AERONAUTICAL MOBILE (R) US244',
        fccPart: 'Aviation (87)',
        description: 'Aeronautical Mobile (Route)',
        band: 'VHF'
    },
    {
        startFreq: 137,
        endFreq: 137.025,
        unit: 'MHz',
        primaryService: 'SPACE OPERATION (space-to-Earth) 5.203C; METEOROLOGICAL-SATELLITE (space-to-Earth); MOBILE-SATELLITE (space-to-Earth) 5.208A 5.208B 5.209; SPACE RESEARCH (space-to-Earth); Fixed; Mobile except aeronautical mobile (R) 5.204 5.205 5.206 5.207 5.208',
        secondaryService: 'SPACE OPERATION (space-to-Earth) 5.203C; METEOROLOGICAL-SATELLITE (space-to-Earth); MOBILE-SATELLITE (space-to-Earth) 5.208A 5.208B 5.209; SPACE RESEARCH (space-to-Earth); Fixed; Mobile except aeronautical mobile (R) 5.204 5.205 5.206 5.207 5.208',
        usAllocations: 'SPACE OPERATION (space-to-Earth); METEOROLOGICAL-SATELLITE (space-to-Earth); MOBILE-SATELLITE (space-to-Earth) US319 US320; SPACE RESEARCH (space-to-Earth) 5.208',
        notes: '',
        fccPart: 'Satellite Communications (25)',
        description: 'Satellite communication and research services',
        band: 'VHF'
    },
    {
        startFreq: 137.025,
        endFreq: 137.175,
        unit: 'MHz',
        primaryService: 'SPACE OPERATION (space-to-Earth) 5.203C; METEOROLOGICAL-SATELLITE (space-to-Earth); SPACE RESEARCH (space-to-Earth); Fixed; Mobile except aeronautical mobile (R); Mobile-satellite (space-to-Earth) 5.208A 5.208B 5.209 5.204 5.205 5.206 5.207 5.208',
        secondaryService: 'SPACE OPERATION (space-to-Earth) 5.203C; METEOROLOGICAL-SATELLITE (space-to-Earth); SPACE RESEARCH (space-to-Earth); Fixed; Mobile except aeronautical mobile (R); Mobile-satellite (space-to-Earth) 5.208A 5.208B 5.209 5.204 5.205 5.206 5.207 5.208',
        usAllocations: 'SPACE OPERATION (space-to-Earth); METEOROLOGICAL-SATELLITE (space-to-Earth); SPACE RESEARCH (space-to-Earth); Mobile-satellite (space-to-Earth) US319 US320 5.208',
        notes: '',
        fccPart: 'Satellite Communications (25)',
        description: 'Satellite communication and research services',
        band: 'VHF'
    },
    {
        startFreq: 137.175,
        endFreq: 137.825,
        unit: 'MHz',
        primaryService: 'SPACE OPERATION (space-to-Earth) 5.203C 5.209A; METEOROLOGICAL-SATELLITE (space-to-Earth); MOBILE-SATELLITE (space-to-Earth) 5.208A 5.208B 5.209; SPACE RESEARCH (space-to-Earth); Fixed; Mobile except aeronautical mobile (R) 5.204 5.205 5.206 5.207 5.208',
        secondaryService: 'SPACE OPERATION (space-to-Earth) 5.203C 5.209A; METEOROLOGICAL-SATELLITE (space-to-Earth); MOBILE-SATELLITE (space-to-Earth) 5.208A 5.208B 5.209; SPACE RESEARCH (space-to-Earth); Fixed; Mobile except aeronautical mobile (R) 5.204 5.205 5.206 5.207 5.208',
        usAllocations: 'SPACE OPERATION (space-to-Earth); METEOROLOGICAL-SATELLITE (space-to-Earth); MOBILE-SATELLITE (space-to-Earth) US319 US320; SPACE RESEARCH (space-to-Earth) 5.208',
        notes: '',
        fccPart: 'Satellite Communications (25)',
        description: 'Satellite communication and research services',
        band: 'VHF'
    },
    {
        startFreq: 137.825,
        endFreq: 138,
        unit: 'MHz',
        primaryService: 'SPACE OPERATION (space-to-Earth) 5.203C; METEOROLOGICAL-SATELLITE (space-to-Earth); SPACE RESEARCH (space-to-Earth); Fixed; Mobile except aeronautical mobile (R); Mobile-satellite (space-to-Earth) 5.208A 5.208B 5.209 5.204 5.205 5.206 5.207 5.208',
        secondaryService: 'SPACE OPERATION (space-to-Earth) 5.203C; METEOROLOGICAL-SATELLITE (space-to-Earth); SPACE RESEARCH (space-to-Earth); Fixed; Mobile except aeronautical mobile (R); Mobile-satellite (space-to-Earth) 5.208A 5.208B 5.209 5.204 5.205 5.206 5.207 5.208',
        usAllocations: 'SPACE OPERATION (space-to-Earth); METEOROLOGICAL-SATELLITE (space-to-Earth); SPACE RESEARCH (space-to-Earth); Mobile-satellite (space-to-Earth) US319 US320 5.208',
        notes: '',
        fccPart: 'Satellite Communications (25)',
        description: 'Satellite communication and research services',
        band: 'VHF'
    },
    {
        startFreq: 138,
        endFreq: 143.6,
        unit: 'MHz',
        primaryService: 'AERONAUTICAL MOBILE (OR) 5.210 5.211 5.212 5.214',
        secondaryService: 'FIXED; MOBILE; RADIOLOCATION; Space research (space-to-Earth)',
        usAllocations: 'FIXED; MOBILE G30',
        notes: '',
        fccPart: '',
        description: 'Aeronautical Mobile, Fixed, Mobile, Radiolocation, and Space Research services',
        band: 'VHF'
    },
    {
        startFreq: 143.6,
        endFreq: 143.65,
        unit: 'MHz',
        primaryService: 'AERONAUTICAL MOBILE (OR); SPACE RESEARCH (space-to-Earth) 5.211 5.212 5.214',
        secondaryService: 'FIXED; MOBILE; RADIOLOCATION; SPACE RESEARCH (space-to-Earth)',
        usAllocations: 'FIXED; MOBILE G30',
        notes: '',
        fccPart: '',
        description: 'Aeronautical Mobile, Space Research, Fixed, Mobile, and Radiolocation services',
        band: 'VHF'
    },
    {
        startFreq: 143.65,
        endFreq: 144,
        unit: 'MHz',
        primaryService: 'AERONAUTICAL MOBILE (OR) 5.210 5.211 5.212 5.214',
        secondaryService: 'FIXED; MOBILE; RADIOLOCATION; Space research (space-to-Earth)',
        usAllocations: 'FIXED; MOBILE G30',
        notes: '',
        fccPart: '',
        description: 'Aeronautical Mobile, Fixed, Mobile, Radiolocation, and Space Research services',
        band: 'VHF'
    },
    {
        startFreq: 144,
        endFreq: 146,
        unit: 'MHz',
        primaryService: 'AMATEUR; AMATEUR-SATELLITE 5.216',
        secondaryService: 'AMATEUR; AMATEUR-SATELLITE 5.216',
        usAllocations: 'AMATEUR; AMATEUR-SATELLITE',
        notes: '',
        fccPart: 'Amateur Radio (97)',
        description: 'Amateur and Amateur-Satellite Radio',
        band: 'VHF'
    },
    {
        startFreq: 146,
        endFreq: 148,
        unit: 'MHz',
        primaryService: 'FIXED; MOBILE except aeronautical mobile (R)',
        secondaryService: 'AMATEUR 5.217',
        usAllocations: 'AMATEUR',
        notes: 'AMATEUR',
        fccPart: 'Amateur Radio (97)',
        description: 'Fixed, Mobile, and Amateur Radio services',
        band: 'VHF'
    },
    {
        startFreq: 148,
        endFreq: 149.9,
        unit: 'MHz',
        primaryService: 'FIXED; MOBILE except aeronautical mobile (R); MOBILE-SATELLITE (Earth-to-space) 5.209 5.218 5.218A 5.219 5.221',
        secondaryService: 'FIXED; MOBILE; MOBILE-SATELLITE (Earth-to-space) 5.209 5.218 5.218A 5.219 5.221',
        usAllocations: 'FIXED; MOBILE; MOBILE-SATELLITE (Earth-to-space) US319 US320 US323 US325 5.218 5.219 G30',
        notes: 'MOBILE-SATELLITE (Earth-to-space) US320 US323 US325 5.218 5.219 US319',
        fccPart: 'Satellite Communications (25)',
        description: 'Fixed, Mobile, and Mobile-Satellite services',
        band: 'VHF'
    },
    {
        startFreq: 149.9,
        endFreq: 150.05,
        unit: 'MHz',
        primaryService: 'MOBILE-SATELLITE (Earth-to-space) 5.209 5.220',
        secondaryService: 'MOBILE-SATELLITE (Earth-to-space) 5.209 5.220',
        usAllocations: 'MOBILE-SATELLITE (Earth-to-space) US319 US320; RADIONAVIGATION-SATELLITE',
        notes: '',
        fccPart: '',
        description: 'Mobile-Satellite and Radionavigation-Satellite services',
        band: 'VHF'
    },
    {
        startFreq: 150.05,
        endFreq: 150.8,
        unit: 'MHz',
        primaryService: 'FIXED; MOBILE except aeronautical mobile; RADIO ASTRONOMY 5.149',
        secondaryService: 'FIXED; MOBILE 5.225',
        usAllocations: 'FIXED; MOBILE US73 G30',
        notes: '',
        fccPart: '',
        description: 'Fixed, Mobile, and Radio Astronomy services',
        band: 'VHF'
    },
    {
        startFreq: 150.8,
        endFreq: 152.855,
        unit: 'MHz',
        primaryService: 'FIXED; MOBILE except aeronautical mobile; RADIO ASTRONOMY 5.149',
        secondaryService: 'FIXED; MOBILE 5.225',
        usAllocations: 'FIXED; MOBILE US73',
        notes: 'FIXED; LAND MOBILE NG4 NG51 NG112 US73 NG124',
        fccPart: 'Public Mobile (22); Private Land Mobile (90); Personal Radio (95)',
        description: 'Fixed, Mobile, and Radio Astronomy services',
        band: 'VHF'
    },
    {
        startFreq: 152.855,
        endFreq: 153,
        unit: 'MHz',
        primaryService: 'FIXED; MOBILE except aeronautical mobile; RADIO ASTRONOMY 5.149',
        secondaryService: 'FIXED; MOBILE 5.225',
        usAllocations: 'FIXED; MOBILE US73',
        notes: 'LAND MOBILE NG4 NG124',
        fccPart: 'Remote Pickup (74D); Private Land Mobile (90)',
        description: 'Fixed, Mobile, and Radio Astronomy services',
        band: 'VHF'
    },
    {
        startFreq: 153,
        endFreq: 154,
        unit: 'MHz',
        primaryService: 'FIXED; MOBILE except aeronautical mobile (R); Meteorological aids',
        secondaryService: 'FIXED; MOBILE 5.225',
        usAllocations: 'FIXED; MOBILE US73',
        notes: 'LAND MOBILE NG4 NG124',
        fccPart: 'Remote Pickup (74D); Private Land Mobile (90)',
        description: 'Fixed, Mobile, and Meteorological Aids services',
        band: 'VHF'
    },
    {
        startFreq: 154,
        endFreq: 156.2475,
        unit: 'MHz',
        primaryService: 'FIXED; MOBILE except aeronautical mobile (R) 5.225A 5.226',
        secondaryService: 'FIXED; MOBILE 5.226',
        usAllocations: 'FIXED; LAND MOBILE NG112 5.226 NG22 NG124 NG148',
        notes: '',
        fccPart: 'Maritime (80); Private Land Mobile (90); Personal Radio (95)',
        description: 'Fixed and Mobile services',
        band: 'VHF'
    },
    {
        startFreq: 156.2475,
        endFreq: 156.4875,
        unit: 'MHz',
        primaryService: 'FIXED; MOBILE except aeronautical mobile (R) 5.225A 5.226',
        secondaryService: 'FIXED; MOBILE 5.226',
        usAllocations: '5.226 US52 US227 US266',
        notes: 'MARITIME MOBILE NG22 5.226 US52 US227 US266 NG124',
        fccPart: 'Maritime (80); Aviation (87)',
        description: 'Fixed and Mobile services',
        band: 'VHF'
    },
    {
        startFreq: 156.4875,
        endFreq: 156.5125,
        unit: 'MHz',
        primaryService: 'MARITIME MOBILE (distress and calling via DSC) 5.111 5.226 5.227',
        secondaryService: 'FIXED; MOBILE 5.226',
        usAllocations: '5.226 US52 US227 US266',
        notes: 'MARITIME MOBILE NG22 5.226 US52 US227 US266 NG124',
        fccPart: 'Maritime (80); Aviation (87)',
        description: 'Maritime Mobile (Distress and Calling via DSC)',
        band: 'VHF'
    },
    {
        startFreq: 156.5125,
        endFreq: 156.5375,
        unit: 'MHz',
        primaryService: 'MARITIME MOBILE (distress and calling via DSC) 5.111 5.226 5.227',
        secondaryService: 'MARITIME MOBILE (distress, urgency, safety and calling via DSC) 5.111 5.226 US266',
        usAllocations: '5.226 US52 US227 US266',
        notes: 'MARITIME MOBILE NG22 5.226 US52 US227 US266 NG124',
        fccPart: 'Maritime (80); Aviation (87)',
        description: 'Maritime Mobile (Distress, Urgency, Safety and Calling via DSC)',
        band: 'VHF'
    },
    {
        startFreq: 156.5375,
        endFreq: 156.5625,
        unit: 'MHz',
        primaryService: 'MARITIME MOBILE (distress and calling via DSC) 5.111 5.226 5.227',
        secondaryService: 'FIXED; MOBILE 5.226',
        usAllocations: '5.226 US52 US227 US266',
        notes: 'MARITIME MOBILE 5.226 US52 US227 US266',
        fccPart: 'Maritime (80); Aviation (87)',
        description: 'Maritime Mobile (Distress and Calling via DSC)',
        band: 'VHF'
    },
    {
        startFreq: 156.5625,
        endFreq: 156.7625,
        unit: 'MHz',
        primaryService: 'FIXED; MOBILE except aeronautical mobile (R) 5.226',
        secondaryService: 'FIXED; MOBILE 5.226',
        usAllocations: '5.226 US52 US227 US266',
        notes: 'MARITIME MOBILE 5.226 US52 US227 US266',
        fccPart: 'Maritime (80); Aviation (87)',
        description: 'Fixed and Mobile services',
        band: 'VHF'
    },
    {
        startFreq: 156.7625,
        endFreq: 156.7875,
        unit: 'MHz',
        primaryService: 'MARITIME MOBILE; Mobile-satellite (Earth-to-space) 5.111 5.226 5.228',
        secondaryService: 'MARITIME MOBILE; MOBILE-SATELLITE (Earth-to-space) 5.111 5.226 5.228',
        usAllocations: 'MOBILE-SATELLITE (Earth-to-space) (AIS 3) 5.226 US52 US266',
        notes: '',
        fccPart: 'Satellite Communications (25); Maritime (80)',
        description: 'Maritime Mobile and Mobile-Satellite (AIS 3)',
        band: 'VHF'
    },
    {
        startFreq: 156.7875,
        endFreq: 156.8125,
        unit: 'MHz',
        primaryService: 'MARITIME MOBILE (distress and calling) 5.111 5.226',
        secondaryService: 'MARITIME MOBILE (distress and calling) 5.111 5.226',
        usAllocations: 'MARITIME MOBILE (distress, urgency, safety and calling) 5.111 5.226 US266',
        notes: '',
        fccPart: 'Maritime (80); Aviation (87)',
        description: 'Maritime Mobile (Distress, Urgency, Safety and Calling)',
        band: 'VHF'
    },
    {
        startFreq: 156.8125,
        endFreq: 156.8375,
        unit: 'MHz',
        primaryService: 'MARITIME MOBILE; Mobile-satellite (Earth-to-space) 5.111 5.226 5.228',
        secondaryService: 'MARITIME MOBILE; MOBILE-SATELLITE (Earth-to-space) 5.111 5.226 5.228',
        usAllocations: 'MOBILE-SATELLITE (Earth-to-space) (AIS 4) 5.226 US52 US266',
        notes: '',
        fccPart: 'Satellite Communications (25); Maritime (80)',
        description: 'Maritime Mobile and Mobile-Satellite (AIS 4)',
        band: 'VHF'
    },
    {
        startFreq: 156.8375,
        endFreq: 157.0375,
        unit: 'MHz',
        primaryService: 'FIXED; MOBILE except aeronautical mobile 5.226',
        secondaryService: 'FIXED; MOBILE 5.226',
        usAllocations: '5.226 US52 US266',
        notes: 'MARITIME MOBILE 5.226 US52 US266',
        fccPart: 'Maritime (80); Aviation (87)',
        description: 'Fixed and Mobile services',
        band: 'VHF'
    },
    {
        startFreq: 157.0375,
        endFreq: 157.1875,
        unit: 'MHz',
        primaryService: 'FIXED; MOBILE except aeronautical mobile 5.226',
        secondaryService: 'FIXED; MOBILE 5.226',
        usAllocations: 'MARITIME MOBILE US214 5.226 US266 G109',
        notes: '5.226 US214 US266',
        fccPart: 'Maritime (80)',
        description: 'Fixed and Mobile services',
        band: 'VHF'
    },
    {
        startFreq: 157.1875,
        endFreq: 157.3375,
        unit: 'MHz',
        primaryService: 'FIXED; MOBILE except aeronautical mobile; Maritime mobile-satellite 5.208A 5.208B 5.228AB 5.228AC 5.226',
        secondaryService: 'FIXED; MOBILE; Maritime mobile-satellite 5.208A 5.208B 5.228AB 5.228AC 5.226',
        usAllocations: 'MOBILE except aeronautical mobile US266',
        notes: '',
        fccPart: 'Maritime (80); Aviation (87); Private Land Mobile (90)',
        description: 'Fixed, Mobile, and Maritime Mobile-Satellite services',
        band: 'VHF'
    },
    {
        startFreq: 157.3375,
        endFreq: 157.45,
        unit: 'MHz',
        primaryService: 'FIXED; MOBILE except aeronautical mobile 5.226',
        secondaryService: 'FIXED; MOBILE 5.226',
        usAllocations: 'MOBILE except aeronautical mobile US266',
        notes: '',
        fccPart: 'Maritime (80); Aviation (87); Private Land Mobile (90)',
        description: 'Fixed and Mobile services',
        band: 'VHF'
    },
    {
        startFreq: 157.45,
        endFreq: 161.575,
        unit: 'MHz',
        primaryService: 'FIXED; MOBILE except aeronautical mobile 5.226',
        secondaryService: 'FIXED; MOBILE 5.226',
        usAllocations: 'FIXED; LAND MOBILE NG28 NG111 NG112 5.226 NG6 NG70 NG124 NG148 NG155',
        notes: '',
        fccPart: 'Public Mobile (22); Remote Pickup (74D); Maritime (80); Private Land Mobile (90)',
        description: 'Fixed and Mobile services',
        band: 'VHF'
    },
    {
        startFreq: 161.575,
        endFreq: 161.625,
        unit: 'MHz',
        primaryService: 'FIXED; MOBILE except aeronautical mobile 5.226',
        secondaryService: 'FIXED; MOBILE 5.226',
        usAllocations: '5.226 US52',
        notes: 'MARITIME MOBILE 5.226 US52 NG6 NG17',
        fccPart: 'Public Mobile (22); Maritime (80)',
        description: 'Fixed and Mobile services',
        band: 'VHF'
    },
    {
        startFreq: 161.625,
        endFreq: 161.775,
        unit: 'MHz',
        primaryService: 'FIXED; MOBILE except aeronautical mobile 5.226',
        secondaryService: 'FIXED; MOBILE 5.226',
        usAllocations: 'US266',
        notes: 'LAND MOBILE NG6 5.226',
        fccPart: 'Public Mobile (22); Remote Pickup (74D); Low Power Auxiliary (74H)',
        description: 'Fixed and Mobile services',
        band: 'VHF'
    },
    {
        startFreq: 161.775,
        endFreq: 161.7875,
        unit: 'MHz',
        primaryService: 'FIXED; MOBILE except aeronautical mobile 5.226',
        secondaryService: 'FIXED; MOBILE 5.226',
        usAllocations: 'US266',
        notes: 'MOBILE except aeronautical mobile US266 NG6 5.226',
        fccPart: 'Maritime (80); Private Land Mobile (90)',
        description: 'Fixed and Mobile services',
        band: 'VHF'
    },
    {
        startFreq: 161.7875,
        endFreq: 161.9375,
        unit: 'MHz',
        primaryService: 'FIXED; MOBILE except aeronautical mobile; Maritime mobile-satellite 5.208A 5.208B 5.228AB 5.228AC 5.226',
        secondaryService: 'FIXED; MOBILE; Maritime mobile-satellite 5.208A 5.208B 5.228AB 5.228AC 5.226',
        usAllocations: 'US266',
        notes: 'MOBILE except aeronautical mobile US266 NG6 5.226',
        fccPart: 'Maritime (80); Private Land Mobile (90)',
        description: 'Fixed, Mobile, and Maritime Mobile-Satellite services',
        band: 'VHF'
    },
    {
        startFreq: 161.9375,
        endFreq: 161.9625,
        unit: 'MHz',
        primaryService: 'FIXED; MOBILE except aeronautical mobile; Maritime mobile-satellite (Earth-to-space) 5.228AA 5.226',
        secondaryService: 'FIXED; MOBILE; Maritime mobile-satellite (Earth-to-space) 5.228AA 5.226',
        usAllocations: 'AERONAUTICAL MOBILE (OR) (AIS 1); MARITIME MOBILE (AIS 1); MOBILE-SATELLITE (Earth-to-space) (AIS 1) 5.228C US52',
        notes: 'MOBILE except aeronautical mobile US266 NG6 5.226',
        fccPart: 'Satellite Communications (25); Maritime (80)',
        description: 'Fixed, Mobile, Maritime Mobile-Satellite, and Aeronautical Mobile services',
        band: 'VHF'
    },
    {
        startFreq: 161.9625,
        endFreq: 161.9875,
        unit: 'MHz',
        primaryService: 'FIXED; MOBILE except aeronautical mobile; Mobile-satellite (Earth-to-space) 5.228F 5.226 5.228A 5.228B',
        secondaryService: 'AERONAUTICAL MOBILE (OR); MARITIME MOBILE; MOBILE-SATELLITE (Earth-to-space) 5.228C 5.228D',
        usAllocations: 'AERONAUTICAL MOBILE (OR) (AIS 1); MARITIME MOBILE (AIS 1); MOBILE-SATELLITE (Earth-to-space) (AIS 1) 5.228C US52',
        notes: '',
        fccPart: 'Satellite Communications (25); Maritime (80)',
        description: 'Fixed, Mobile, Aeronautical Mobile, Maritime Mobile, and Mobile-Satellite services (AIS 1)',
        band: 'VHF'
    },
    {
        startFreq: 161.9875,
        endFreq: 162.0125,
        unit: 'MHz',
        primaryService: 'FIXED; MOBILE except aeronautical mobile; Maritime mobile-satellite (Earth-to-space) 5.228AA 5.226 5.229',
        secondaryService: 'FIXED; MOBILE; Maritime mobile-satellite (Earth-to-space) 5.228AA 5.226',
        usAllocations: 'MOBILE except aeronautical mobile 5.226',
        notes: '',
        fccPart: 'Maritime (80)',
        description: 'Fixed, Mobile, and Maritime Mobile-Satellite services',
        band: 'VHF'
    },
    {
        startFreq: 162.0125,
        endFreq: 162.0375,
        unit: 'MHz',
        primaryService: 'FIXED; MOBILE except aeronautical mobile; Mobile-satellite (Earth-to-space) 5.228F 5.226 5.228A 5.228B 5.229',
        secondaryService: 'AERONAUTICAL MOBILE (OR); MARITIME MOBILE; MOBILE-SATELLITE (Earth-to-space) 5.228C 5.228D',
        usAllocations: 'AERONAUTICAL MOBILE (OR) (AIS 2); MARITIME MOBILE (AIS 2); MOBILE-SATELLITE (Earth-to-space) (AIS 2) 5.228C US52',
        notes: '',
        fccPart: 'Satellite Communications (25); Maritime (80)',
        description: 'Fixed, Mobile, Aeronautical Mobile, Maritime Mobile, and Mobile-Satellite services (AIS 2)',
        band: 'VHF'
    },
    {
        startFreq: 162.0375,
        endFreq: 173.2,
        unit: 'MHz',
        primaryService: 'FIXED; MOBILE except aeronautical mobile 5.226 5.229',
        secondaryService: 'FIXED; MOBILE 5.226 5.230 5.231',
        usAllocations: 'FIXED; MOBILE US8 US11 US13 US55 US73 US300 US312 G5',
        notes: 'US8 US11 US13 US55 US73 US300 US312',
        fccPart: 'Remote Pickup (74D); Private Land Mobile (90)',
        description: 'Fixed and Mobile services',
        band: 'VHF'
    },
    {
        startFreq: 173.2,
        endFreq: 173.4,
        unit: 'MHz',
        primaryService: 'FIXED; MOBILE except aeronautical mobile 5.226 5.229',
        secondaryService: 'FIXED; MOBILE 5.226 5.230 5.231',
        usAllocations: 'FIXED; Land mobile',
        notes: '',
        fccPart: 'Private Land Mobile (90)',
        description: 'Fixed and Mobile services',
        band: 'VHF'
    },
    {
        startFreq: 173.4,
        endFreq: 174,
        unit: 'MHz',
        primaryService: 'FIXED; MOBILE except aeronautical mobile 5.226 5.229',
        secondaryService: 'FIXED; MOBILE 5.226 5.230 5.231',
        usAllocations: 'FIXED; MOBILE G5',
        notes: '',
        fccPart: '',
        description: 'Fixed and Mobile services',
        band: 'VHF'
    },
    {
        startFreq: 174,
        endFreq: 216,
        unit: 'MHz',
        primaryService: 'BROADCASTING 5.235 5.237 5.243',
        secondaryService: 'BROADCASTING; Fixed; Mobile',
        usAllocations: 'BROADCASTING',
        notes: 'BROADCASTING NG5 NG14 NG115 NG149',
        fccPart: 'Broadcast Radio (TV)(73); LPTV, TV Translator/Booster (74G); Low Power Auxiliary (74H)',
        description: 'Broadcasting, Fixed, and Mobile services',
        band: 'VHF'
    },
    {
        startFreq: 216,
        endFreq: 217,
        unit: 'MHz',
        primaryService: 'FIXED; MARITIME MOBILE; Radiolocation 5.241 5.242',
        secondaryService: 'Fixed; Land mobile US210 US241 G2',
        usAllocations: 'Fixed; Land mobile US210 US241 G2',
        notes: 'FIXED; MOBILE except aeronautical mobile US210 US241 NG173',
        fccPart: 'Maritime (80); Private Land Mobile (90); Personal Radio (95)',
        description: 'Fixed, Maritime Mobile, and Radiolocation services',
        band: 'VHF'
    },
    {
        startFreq: 217,
        endFreq: 219,
        unit: 'MHz',
        primaryService: 'FIXED; MARITIME MOBILE; Radiolocation 5.241 5.242',
        secondaryService: 'Fixed; Mobile US210 US241',
        usAllocations: 'Fixed; Mobile US210 US241',
        notes: 'FIXED; MOBILE except aeronautical mobile US210 US241 NG173',
        fccPart: 'Maritime (80); Private Land Mobile (90); Personal Radio (95)',
        description: 'Fixed, Maritime Mobile, and Radiolocation services',
        band: 'VHF'
    },
    {
        startFreq: 219,
        endFreq: 220,
        unit: 'MHz',
        primaryService: 'FIXED; MARITIME MOBILE; Radiolocation 5.241 5.242',
        secondaryService: 'Fixed; Mobile US210 US241',
        usAllocations: 'Fixed; Mobile US210 US241',
        notes: 'FIXED; MOBILE except aeronautical mobile; Amateur NG152 US210 US241 NG173',
        fccPart: 'Maritime (80); Private Land Mobile (90); Amateur Radio (97)',
        description: 'Fixed, Maritime Mobile, Radiolocation and Amateur services',
        band: 'VHF'
    },
    {
        startFreq: 220,
        endFreq: 222,
        unit: 'MHz',
        primaryService: 'AMATEUR; FIXED; MOBILE; Radiolocation 5.241',
        secondaryService: 'AMATEUR; FIXED; MOBILE; Radiolocation 5.241',
        usAllocations: 'FIXED; LAND MOBILE US241 US242',
        notes: '',
        fccPart: 'Private Land Mobile (90)',
        description: 'Amateur, Fixed, Mobile, and Radiolocation services',
        band: 'VHF'
    },
    {
        startFreq: 222,
        endFreq: 223,
        unit: 'MHz',
        primaryService: 'AMATEUR; FIXED; MOBILE; Radiolocation 5.241',
        secondaryService: 'AMATEUR; FIXED; MOBILE; Radiolocation 5.241',
        usAllocations: 'AMATEUR',
        notes: 'AMATEUR',
        fccPart: 'Amateur Radio (97)',
        description: 'Amateur, Fixed, Mobile, and Radiolocation services',
        band: 'VHF'
    },
    {
        startFreq: 223,
        endFreq: 225,
        unit: 'MHz',
        primaryService: 'BROADCASTING; Fixed; Mobile 5.243 5.246 5.247',
        secondaryService: 'AMATEUR; FIXED; MOBILE; Radiolocation 5.241',
        usAllocations: 'AMATEUR',
        notes: 'AMATEUR',
        fccPart: 'Amateur Radio (97)',
        description: 'Broadcasting, Fixed, Mobile, Amateur, and Radiolocation services',
        band: 'VHF'
    },
    {
        startFreq: 225,
        endFreq: 235,
        unit: 'MHz',
        primaryService: 'BROADCASTING; Fixed; Mobile 5.243 5.246 5.247',
        secondaryService: 'FIXED; MOBILE',
        usAllocations: 'FIXED; MOBILE G27',
        notes: '',
        fccPart: '',
        description: 'Broadcasting, Fixed, and Mobile services',
        band: 'VHF'
    },
    {
        startFreq: 235,
        endFreq: 267,
        unit: 'MHz',
        primaryService: 'FIXED; MOBILE 5.111 5.252 5.254 5.256 5.256A',
        secondaryService: 'FIXED; MOBILE 5.111 5.252 5.254 5.256 5.256A',
        usAllocations: 'FIXED; MOBILE 5.111 5.256 G27 G100',
        notes: '5.111 5.256',
        fccPart: '',
        description: 'Fixed and Mobile services',
        band: 'VHF'
    },
    {
        startFreq: 267,
        endFreq: 272,
        unit: 'MHz',
        primaryService: 'FIXED; MOBILE; Space operation (space-to-Earth) 5.254 5.257',
        secondaryService: 'FIXED; MOBILE; Space operation (space-to-Earth) 5.254 5.257',
        usAllocations: 'FIXED; MOBILE G27 G100',
        notes: '',
        fccPart: '',
        description: 'Fixed, Mobile, and Space Operation services',
        band: 'VHF'
    },
    {
        startFreq: 272,
        endFreq: 273,
        unit: 'MHz',
        primaryService: 'SPACE OPERATION (space-to-Earth); FIXED; MOBILE 5.254',
        secondaryService: 'SPACE OPERATION (space-to-Earth); FIXED; MOBILE 5.254',
        usAllocations: 'FIXED; MOBILE G27 G100',
        notes: '',
        fccPart: '',
        description: 'Space Operation, Fixed, and Mobile services',
        band: 'VHF'
    },
    {
        startFreq: 273,
        endFreq: 312,
        unit: 'MHz',
        primaryService: 'FIXED; MOBILE 5.254',
        secondaryService: 'FIXED; MOBILE 5.254',
        usAllocations: 'FIXED; MOBILE G27 G100',
        notes: '',
        fccPart: '',
        description: 'Fixed and Mobile services',
        band: 'VHF'
    },
    {
        startFreq: 312,
        endFreq: 315,
        unit: 'MHz',
        primaryService: 'FIXED; MOBILE; Mobile-satellite (Earth-to-space) 5.254 5.255',
        secondaryService: 'FIXED; MOBILE; Mobile-satellite (Earth-to-space) 5.254 5.255',
        usAllocations: 'FIXED; MOBILE G27 G100',
        notes: '',
        fccPart: '',
        description: 'Fixed, Mobile, and Mobile-Satellite services',
        band: 'VHF'
    },
    {
        startFreq: 315,
        endFreq: 322,
        unit: 'MHz',
        primaryService: 'FIXED; MOBILE 5.254',
        secondaryService: 'FIXED; MOBILE 5.254',
        usAllocations: 'FIXED; MOBILE G27 G100',
        notes: '',
        fccPart: '',
        description: 'Fixed and Mobile services',
        band: 'VHF'
    }
];

// Export for use in main application
if (typeof module !== 'undefined' && module.exports) {
    module.exports = peakIdentificationBand5;
} else if (typeof window !== 'undefined') {
    window.peakIdentificationBand5 = peakIdentificationBand5;
}