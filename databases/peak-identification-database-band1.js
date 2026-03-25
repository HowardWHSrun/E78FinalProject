// Peak Identification Database - Band 1 (MF: 160 kHz - 3 MHz)
// Turner Engineering Corporation - EMC Testing Support
// 
// ========================================================================
// BAND 1: MEDIUM FREQUENCY (MF)
// ========================================================================
// 
// Frequency Range: 148.5 kHz - 1.605 MHz (with overlap)
// Total Allocations: 22 frequency segments
// Spectrum Coverage: Medium Frequency (300 kHz - 3 MHz) band
// 
// KEY SERVICES COVERED:
// • AM Broadcasting Band (535-1605 kHz)
// • Extended AM Broadcasting (1605-1705 kHz)
// • Aeronautical Radionavigation (NDB beacons)
// • Maritime Mobile Communications
// • Maritime Radionavigation (radiobeacons)
// • Amateur Radio (472-479 kHz - 630 meter band)
// • Distress and Safety Communications (500 kHz)
// 
// NOTABLE FREQUENCIES:
// • 500 kHz - International maritime distress frequency
// • 535-1605 kHz - Standard AM broadcast band
// • 472-479 kHz - Amateur radio 630m band (Region 2)
// • Various NDB (Non-Directional Beacon) frequencies
// 
// FCC PART REFERENCES:
// • Part 73: AM Radio Broadcasting
// • Part 80: Maritime Services
// • Part 87: Aviation Services (NDB)
// • Part 90: Private Land Mobile
// • Part 97: Amateur Radio
// 
// ITU FOOTNOTES: Comprehensive 5.xxx series references including
// maritime coordination and broadcasting agreements
// 
// TECHNICAL NOTES:
// • Ground wave and sky wave propagation
// • AM broadcasting interference considerations
// • Maritime safety and distress communications
// • Aviation navigation infrastructure
// • Night/day propagation variations
// 
// ========================================================================

const peakIdentificationBand1 = [
    {
        startFreq: 148.5,
        endFreq: 160.0,
        unit: 'kHz',
        primaryService: 'BROADCASTING',
        secondaryService: 'FIXED; MARITIME MOBILE',
        usAllocations: 'FIXED; MARITIME MOBILE 5.64 US2',
        fccPart: 'Maritime (80)',
        description: 'Broadcasting and maritime mobile services (overlap with Band 0)',
        band: 'MF'
    },
    {
        startFreq: 160.0,
        endFreq: 190.0,
        unit: 'kHz',
        primaryService: 'FIXED',
        secondaryService: 'FIXED; Aeronautical radionavigation',
        usAllocations: 'FIXED US2',
        notes: 'FIXED US2',
        description: 'Fixed communications services',
        band: 'MF'
    },
    {
        startFreq: 190.0,
        endFreq: 200.0,
        unit: 'kHz',
        primaryService: 'AERONAUTICAL RADIONAVIGATION 5.68 5.69 5.70',
        secondaryService: 'AERONAUTICAL RADIONAVIGATION',
        usAllocations: 'AERONAUTICAL RADIONAVIGATION US18 US2',
        fccPart: 'Aviation (87)',
        description: 'Aeronautical radionavigation services',
        band: 'MF'
    },
    {
        startFreq: 200.0,
        endFreq: 255.0,
        unit: 'kHz',
        primaryService: 'AERONAUTICAL RADIONAVIGATION; Aeronautical mobile',
        secondaryService: 'AERONAUTICAL RADIONAVIGATION; Aeronautical mobile',
        usAllocations: 'AERONAUTICAL RADIONAVIGATION US18; Aeronautical mobile US2',
        fccPart: 'Aviation (87)',
        description: 'Aeronautical radionavigation and mobile services',
        band: 'MF'
    },
    {
        startFreq: 255.0,
        endFreq: 275.0,
        unit: 'kHz',
        primaryService: 'BROADCASTING; AERONAUTICAL RADIONAVIGATION 5.70',
        secondaryService: 'AERONAUTICAL RADIONAVIGATION; Aeronautical mobile',
        usAllocations: 'AERONAUTICAL RADIONAVIGATION US18; Aeronautical mobile US2',
        fccPart: 'Aviation (87)',
        description: 'Broadcasting and aeronautical radionavigation services',
        band: 'MF'
    },
    {
        startFreq: 275.0,
        endFreq: 283.5,
        unit: 'kHz',
        primaryService: 'AERONAUTICAL RADIONAVIGATION; Aeronautical mobile; Maritime radionavigation (radiobeacons)',
        secondaryService: 'AERONAUTICAL RADIONAVIGATION; Aeronautical mobile',
        usAllocations: 'AERONAUTICAL RADIONAVIGATION; Aeronautical mobile; Maritime radionavigation (radiobeacons) US2 US18',
        fccPart: 'Aviation (87)',
        description: 'Aeronautical and maritime radionavigation services',
        band: 'MF'
    },
    {
        startFreq: 283.5,
        endFreq: 285.0,
        unit: 'kHz',
        primaryService: 'AERONAUTICAL RADIONAVIGATION; MARITIME RADIONAVIGATION (radiobeacons) 5.73',
        secondaryService: 'AERONAUTICAL RADIONAVIGATION; Aeronautical mobile',
        usAllocations: 'AERONAUTICAL RADIONAVIGATION; Aeronautical mobile; Maritime radionavigation (radiobeacons) US2 US18',
        fccPart: 'Aviation (87)',
        description: 'Aeronautical and maritime radionavigation radiobeacons',
        band: 'MF'
    },
    {
        startFreq: 285.0,
        endFreq: 315.0,
        unit: 'kHz',
        primaryService: 'AERONAUTICAL RADIONAVIGATION; MARITIME RADIONAVIGATION (radiobeacons) 5.73 5.74',
        secondaryService: 'MARITIME RADIONAVIGATION (radiobeacons) 5.73; Aeronautical radionavigation (radiobeacons)',
        usAllocations: 'AERONAUTICAL RADIONAVIGATION; MARITIME RADIONAVIGATION (radiobeacons) 5.73 US2 US18 US364',
        fccPart: 'Aviation (87)',
        description: 'Primary radionavigation radiobeacon services',
        band: 'MF'
    },
    {
        startFreq: 315.0,
        endFreq: 325.0,
        unit: 'kHz',
        primaryService: 'AERONAUTICAL RADIONAVIGATION; Maritime radionavigation (radiobeacons) 5.73 5.75',
        secondaryService: 'MARITIME RADIONAVIGATION (radiobeacons) 5.73; Aeronautical radionavigation',
        usAllocations: 'AERONAUTICAL RADIONAVIGATION; MARITIME RADIONAVIGATION (radiobeacons) 5.73 US2 US18 US364',
        fccPart: 'Aviation (87)',
        description: 'Aeronautical and maritime radionavigation radiobeacons',
        band: 'MF'
    },
    {
        startFreq: 325.0,
        endFreq: 335.0,
        unit: 'kHz',
        primaryService: 'AERONAUTICAL RADIONAVIGATION',
        secondaryService: 'AERONAUTICAL RADIONAVIGATION; Aeronautical mobile; Maritime radionavigation (radiobeacons)',
        usAllocations: 'AERONAUTICAL RADIONAVIGATION (radiobeacons); Aeronautical mobile; Maritime radionavigation (radiobeacons) US2 US18',
        fccPart: 'Aviation (87)',
        description: 'Aeronautical radionavigation services',
        band: 'MF'
    },
    {
        startFreq: 335.0,
        endFreq: 405.0,
        unit: 'kHz',
        primaryService: 'AERONAUTICAL RADIONAVIGATION',
        secondaryService: 'AERONAUTICAL RADIONAVIGATION; Aeronautical mobile',
        usAllocations: 'AERONAUTICAL RADIONAVIGATION (radiobeacons) US18; Aeronautical mobile US2',
        fccPart: 'Aviation (87)',
        description: 'Aeronautical radionavigation and mobile services',
        band: 'MF'
    },
    {
        startFreq: 405.0,
        endFreq: 415.0,
        unit: 'kHz',
        primaryService: 'RADIONAVIGATION 5.76',
        secondaryService: 'RADIONAVIGATION 5.76; Aeronautical mobile',
        usAllocations: 'RADIONAVIGATION 5.76 US18; Aeronautical mobile US2',
        fccPart: 'Maritime (80); Aviation (87)',
        description: 'General radionavigation services',
        band: 'MF'
    },
    {
        startFreq: 415.0,
        endFreq: 435.0,
        unit: 'kHz',
        primaryService: 'MARITIME MOBILE 5.79; AERONAUTICAL RADIONAVIGATION',
        secondaryService: 'MARITIME MOBILE 5.79; Aeronautical radionavigation 5.77 5.80',
        usAllocations: 'MARITIME MOBILE US79A; AERONAUTICAL RADIONAVIGATION US2',
        description: 'Maritime mobile and aeronautical radionavigation services',
        band: 'MF'
    },
    {
        startFreq: 435.0,
        endFreq: 472.0,
        unit: 'kHz',
        primaryService: 'MARITIME MOBILE 5.79; Aeronautical radionavigation 5.77 5.78 5.82',
        secondaryService: 'MARITIME MOBILE 5.79; Aeronautical radionavigation 5.77 5.80 5.82',
        usAllocations: 'MARITIME MOBILE US79A; Aeronautical radionavigation 5.82 US2 US231',
        notes: 'MARITIME MOBILE US79A 5.82 US2 US231',
        description: 'Maritime mobile and aeronautical radionavigation services',
        band: 'MF'
    },
    {
        startFreq: 472.0,
        endFreq: 479.0,
        unit: 'kHz',
        primaryService: 'MARITIME MOBILE 5.79; Amateur 5.80A; Aeronautical radionavigation 5.77 5.80 5.80B 5.82',
        secondaryService: 'MARITIME MOBILE 5.79; Aeronautical radionavigation 5.77 5.80 5.82',
        usAllocations: 'US2',
        notes: 'Amateur 5.80A 5.82 US2 NG8',
        fccPart: 'Amateur Radio (97)',
        description: 'Maritime mobile, amateur radio, and aeronautical radionavigation',
        band: 'MF'
    },
    {
        startFreq: 479.0,
        endFreq: 495.0,
        unit: 'kHz',
        primaryService: 'MARITIME MOBILE 5.79 5.79A; Aeronautical radionavigation 5.77 5.82',
        secondaryService: 'MARITIME MOBILE 5.79 5.79A; Aeronautical radionavigation 5.77 5.80 5.82',
        usAllocations: 'MARITIME MOBILE US79A 5.79A; Aeronautical radionavigation 5.82 US2 US231',
        notes: 'MARITIME MOBILE US79A 5.79A 5.82 US2 US231',
        fccPart: 'Maritime (80)',
        description: 'Maritime mobile and aeronautical radionavigation services',
        band: 'MF'
    },
    {
        startFreq: 495.0,
        endFreq: 505.0,
        unit: 'kHz',
        primaryService: 'MARITIME MOBILE 5.82C',
        secondaryService: 'MARITIME MOBILE 5.82C',
        usAllocations: 'MARITIME MOBILE',
        fccPart: 'Maritime (80); Aviation (87)',
        description: 'Maritime mobile distress and safety communications',
        band: 'MF'
    },
    {
        startFreq: 505.0,
        endFreq: 510.0,
        unit: 'kHz',
        primaryService: 'MARITIME MOBILE 5.79 5.79A 5.84; AERONAUTICAL RADIONAVIGATION',
        secondaryService: 'MARITIME MOBILE 5.79',
        usAllocations: 'MARITIME MOBILE US79A',
        fccPart: 'Maritime (80)',
        description: 'Maritime mobile and aeronautical radionavigation services',
        band: 'MF'
    },
    {
        startFreq: 510.0,
        endFreq: 525.0,
        unit: 'kHz',
        primaryService: 'MARITIME MOBILE 5.79 5.79A 5.84; AERONAUTICAL RADIONAVIGATION',
        secondaryService: 'AERONAUTICAL RADIONAVIGATION; MARITIME MOBILE 5.79A 5.84',
        usAllocations: 'MARITIME MOBILE (ships only) 5.79A 5.84; AERONAUTICAL RADIONAVIGATION (radiobeacons) US18 US14 US225',
        fccPart: 'Maritime (80); Aviation (87)',
        description: 'Maritime mobile and aeronautical radionavigation services',
        band: 'MF'
    },
    {
        startFreq: 525.0,
        endFreq: 526.5,
        unit: 'kHz',
        primaryService: 'BROADCASTING 5.86; AERONAUTICAL RADIONAVIGATION',
        secondaryService: 'AERONAUTICAL RADIONAVIGATION; MOBILE US221',
        usAllocations: 'AERONAUTICAL RADIONAVIGATION (radiobeacons) US18; MOBILE US221',
        fccPart: 'Aviation (87); Private Land Mobile (90)',
        description: 'Broadcasting and aeronautical radionavigation services',
        band: 'MF'
    },
    {
        startFreq: 526.5,
        endFreq: 535.0,
        unit: 'kHz',
        primaryService: 'BROADCASTING 5.88',
        secondaryService: 'BROADCASTING; Mobile',
        usAllocations: 'AERONAUTICAL RADIONAVIGATION (radiobeacons) US18; MOBILE US221',
        notes: 'BROADCASTING US239',
        fccPart: 'Aviation (87); Private Land Mobile (90); Radio Broadcast (AM)(73)',
        description: 'AM broadcasting band (lower edge)',
        band: 'MF'
    },
    {
        startFreq: 535.0,
        endFreq: 1605.0,
        unit: 'kHz',
        primaryService: 'BROADCASTING 5.87 5.87A',
        secondaryService: 'BROADCASTING',
        usAllocations: 'BROADCASTING',
        notes: 'BROADCASTING NG1 NG5',
        fccPart: 'Radio Broadcast (AM)(73); Private Land Mobile (90)',
        description: 'AM broadcasting band (535-1605 kHz)',
        band: 'MF'
    }
];

// Export for use in main application
if (typeof module !== 'undefined' && module.exports) {
    module.exports = peakIdentificationBand1;
} else if (typeof window !== 'undefined') {
    window.peakIdentificationBand1 = peakIdentificationBand1;
} 