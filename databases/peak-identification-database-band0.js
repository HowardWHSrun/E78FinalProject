// Peak Identification Database - Band 0 (VLF/LF: 9-160 kHz)
// Turner Engineering Corporation - EMC Testing Support
// 
// ========================================================================
// BAND 0: VERY LOW FREQUENCY (VLF) AND LOW FREQUENCY (LF)
// ========================================================================
// 
// Frequency Range: 9 kHz - 160 kHz
// Total Allocations: 22 frequency segments
// Spectrum Coverage: VLF (3-30 kHz) and LF (30-300 kHz) portions
// 
// KEY SERVICES COVERED:
// • Standard Time/Frequency Signals (20 kHz, 60 kHz)
// • Radionavigation and Maritime Navigation
// • Maritime Mobile Communications
// • Amateur Radio (135.7-137.8 kHz - 2200 meter band)
// • Fixed Services
// • Radiolocation
// • Broadcasting (upper edge)
// 
// NOTABLE FREQUENCIES:
// • 20 kHz - WWVB Time Signal
// • 60 kHz - Time Signal (Europe: MSF, DCF77, etc.)
// • 135.7-137.8 kHz - Amateur Radio 2200m band
// 
// FCC PART REFERENCES:
// • Part 80: Maritime Services
// • Part 87: Aviation Services  
// • Part 90: Private Land Mobile
// • Part 97: Amateur Radio
// 
// ITU FOOTNOTES: Extensive 5.xxx series references for international
// coordination and regional variations
// 
// TECHNICAL NOTES:
// • Ground wave propagation dominates
// • High atmospheric noise levels
// • Limited bandwidth applications
// • Global propagation characteristics
// • Critical for navigation and time distribution
// 
// ========================================================================

const peakIdentificationBand0 = [
    {
        startFreq: 9.0,
        endFreq: 11.3,
        unit: 'kHz',
        primaryService: 'METEOROLOGICAL AIDS 5.54A; RADIONAVIGATION',
        secondaryService: 'METEOROLOGICAL AIDS 5.54A; RADIONAVIGATION',
        usAllocations: 'RADIONAVIGATION US18 US2',
        description: 'Meteorological aids and radionavigation services',
        band: 'VLF'
    },
    {
        startFreq: 11.3,
        endFreq: 14.0,
        unit: 'kHz',
        primaryService: 'RADIONAVIGATION',
        secondaryService: 'RADIONAVIGATION',
        usAllocations: 'RADIONAVIGATION US18 US2',
        description: 'Radionavigation services',
        band: 'VLF'
    },
    {
        startFreq: 14.0,
        endFreq: 19.95,
        unit: 'kHz',
        primaryService: 'FIXED; MARITIME MOBILE 5.57 5.55 5.56',
        secondaryService: 'FIXED; MARITIME MOBILE 5.57',
        usAllocations: 'FIXED; MARITIME MOBILE 5.57 US2',
        notes: 'Fixed US2',
        description: 'Fixed and maritime mobile communications',
        band: 'VLF'
    },
    {
        startFreq: 19.95,
        endFreq: 20.05,
        unit: 'kHz',
        primaryService: 'STANDARD FREQUENCY AND TIME SIGNAL (20 kHz)',
        secondaryService: 'STANDARD FREQUENCY AND TIME SIGNAL (20 kHz)',
        usAllocations: 'STANDARD FREQUENCY AND TIME SIGNAL (20 kHz) US2',
        description: 'Standard frequency and time signal at 20 kHz',
        band: 'VLF'
    },
    {
        startFreq: 20.05,
        endFreq: 59.0,
        unit: 'kHz',
        primaryService: 'FIXED; MARITIME MOBILE 5.57 5.56 5.58',
        secondaryService: 'FIXED; MARITIME MOBILE 5.57',
        usAllocations: 'FIXED; MARITIME MOBILE 5.57 US2',
        notes: 'FIXED US2',
        description: 'Fixed and maritime mobile communications',
        band: 'LF'
    },
    {
        startFreq: 59.0,
        endFreq: 61.0,
        unit: 'kHz',
        primaryService: '',
        secondaryService: '',
        usAllocations: 'STANDARD FREQUENCY AND TIME SIGNAL (60 kHz) US2',
        description: 'Standard frequency and time signal at 60 kHz',
        band: 'LF'
    },
    {
        startFreq: 61.0,
        endFreq: 70.0,
        unit: 'kHz',
        primaryService: 'FIXED; MARITIME MOBILE 5.57',
        secondaryService: 'FIXED; MARITIME MOBILE 5.57',
        usAllocations: 'FIXED; MARITIME MOBILE 5.57 US2',
        notes: 'FIXED US2',
        description: 'Fixed and maritime mobile communications',
        band: 'LF'
    },
    {
        startFreq: 70.0,
        endFreq: 72.0,
        unit: 'kHz',
        primaryService: 'RADIONAVIGATION 5.60',
        secondaryService: 'FIXED; MARITIME MOBILE 5.57; MARITIME RADIONAVIGATION 5.60; Radiolocation',
        usAllocations: 'FIXED; MARITIME MOBILE 5.57; Radiolocation',
        notes: 'FIXED; Radiolocation',
        fccPart: 'Private Land Mobile (90)',
        description: 'Radionavigation and radiolocation services',
        band: 'LF'
    },
    {
        startFreq: 72.0,
        endFreq: 84.0,
        unit: 'kHz',
        primaryService: 'FIXED; MARITIME MOBILE 5.57; RADIONAVIGATION 5.60 5.56',
        secondaryService: 'FIXED; MARITIME MOBILE 5.57; MARITIME RADIONAVIGATION 5.60; Radiolocation',
        usAllocations: 'FIXED; MARITIME MOBILE 5.57; Radiolocation',
        notes: 'FIXED; Radiolocation',
        fccPart: 'Private Land Mobile (90)',
        description: 'Fixed, maritime mobile, and radionavigation services',
        band: 'LF'
    },
    {
        startFreq: 84.0,
        endFreq: 86.0,
        unit: 'kHz',
        primaryService: 'RADIONAVIGATION 5.60',
        secondaryService: 'FIXED; MARITIME MOBILE 5.57; MARITIME RADIONAVIGATION 5.60; Radiolocation',
        usAllocations: 'FIXED; MARITIME MOBILE 5.57; Radiolocation',
        notes: 'FIXED; Radiolocation',
        fccPart: 'Private Land Mobile (90)',
        description: 'Radionavigation and radiolocation services',
        band: 'LF'
    },
    {
        startFreq: 86.0,
        endFreq: 90.0,
        unit: 'kHz',
        primaryService: 'FIXED; MARITIME MOBILE 5.57; RADIONAVIGATION 5.56 5.61',
        secondaryService: 'FIXED; MARITIME MOBILE 5.57; MARITIME RADIONAVIGATION 5.60; Radiolocation',
        usAllocations: 'FIXED; MARITIME MOBILE 5.57; Radiolocation US2',
        notes: 'FIXED; Radiolocation US2',
        fccPart: 'Private Land Mobile (90)',
        description: 'Fixed, maritime mobile, and radionavigation services',
        band: 'LF'
    },
    {
        startFreq: 90.0,
        endFreq: 110.0,
        unit: 'kHz',
        primaryService: 'RADIONAVIGATION 5.62; Fixed 5.64',
        secondaryService: 'RADIONAVIGATION 5.62',
        usAllocations: 'RADIONAVIGATION 5.62 US18 US2 US104',
        fccPart: 'Aviation (87); Private Land Mobile (90)',
        description: 'Radionavigation services',
        band: 'LF'
    },
    {
        startFreq: 110.0,
        endFreq: 112.0,
        unit: 'kHz',
        primaryService: 'FIXED; MARITIME MOBILE; RADIONAVIGATION 5.64',
        secondaryService: 'FIXED; MARITIME MOBILE; MARITIME RADIONAVIGATION 5.60; Radiolocation',
        usAllocations: 'FIXED; MARITIME MOBILE; Radiolocation',
        fccPart: 'Private Land Mobile (90)',
        description: 'Fixed, maritime mobile, and radionavigation services',
        band: 'LF'
    },
    {
        startFreq: 112.0,
        endFreq: 115.0,
        unit: 'kHz',
        primaryService: 'RADIONAVIGATION 5.60',
        secondaryService: 'FIXED; MARITIME MOBILE; MARITIME RADIONAVIGATION 5.60; Radiolocation',
        usAllocations: 'FIXED; MARITIME MOBILE; Radiolocation',
        fccPart: 'Private Land Mobile (90)',
        description: 'Radionavigation services',
        band: 'LF'
    },
    {
        startFreq: 115.0,
        endFreq: 117.6,
        unit: 'kHz',
        primaryService: 'RADIONAVIGATION 5.60; Fixed; Maritime mobile 5.64 5.66',
        secondaryService: 'FIXED; MARITIME MOBILE; MARITIME RADIONAVIGATION 5.60; Radiolocation',
        usAllocations: 'FIXED; MARITIME MOBILE; Radiolocation',
        fccPart: 'Private Land Mobile (90)',
        description: 'Radionavigation, fixed, and maritime mobile services',
        band: 'LF'
    },
    {
        startFreq: 117.6,
        endFreq: 126.0,
        unit: 'kHz',
        primaryService: 'FIXED; MARITIME MOBILE; RADIONAVIGATION 5.60 5.64',
        secondaryService: 'FIXED; MARITIME MOBILE; MARITIME RADIONAVIGATION 5.60; Radiolocation',
        usAllocations: 'FIXED; MARITIME MOBILE; Radiolocation',
        fccPart: 'Private Land Mobile (90)',
        description: 'Fixed, maritime mobile, and radionavigation services',
        band: 'LF'
    },
    {
        startFreq: 126.0,
        endFreq: 129.0,
        unit: 'kHz',
        primaryService: 'RADIONAVIGATION 5.60',
        secondaryService: 'FIXED; MARITIME MOBILE; MARITIME RADIONAVIGATION 5.60; Radiolocation',
        usAllocations: 'FIXED; MARITIME MOBILE; Radiolocation',
        fccPart: 'Private Land Mobile (90)',
        description: 'Radionavigation services',
        band: 'LF'
    },
    {
        startFreq: 129.0,
        endFreq: 130.0,
        unit: 'kHz',
        primaryService: 'FIXED; MARITIME MOBILE; RADIONAVIGATION 5.60 5.61 5.64',
        secondaryService: 'FIXED; MARITIME MOBILE; MARITIME RADIONAVIGATION 5.60; Radiolocation',
        usAllocations: 'FIXED; MARITIME MOBILE; Radiolocation 5.64 US2',
        fccPart: 'Private Land Mobile (90)',
        description: 'Fixed, maritime mobile, and radionavigation services',
        band: 'LF'
    },
    {
        startFreq: 130.0,
        endFreq: 135.7,
        unit: 'kHz',
        primaryService: 'FIXED; MARITIME MOBILE 5.64 5.67',
        secondaryService: 'FIXED; MARITIME MOBILE 5.64',
        usAllocations: 'FIXED; MARITIME MOBILE 5.64 US2',
        fccPart: 'Maritime (80)',
        description: 'Fixed and maritime mobile communications',
        band: 'LF'
    },
    {
        startFreq: 135.7,
        endFreq: 137.8,
        unit: 'kHz',
        primaryService: 'FIXED; MARITIME MOBILE; Amateur 5.67A 5.64 5.67 5.67B',
        secondaryService: 'FIXED; MARITIME MOBILE; Amateur 5.67A 5.64',
        usAllocations: 'FIXED; MARITIME MOBILE 5.64 US2',
        notes: 'Amateur 5.67A US2',
        fccPart: 'Amateur Radio (97)',
        description: 'Fixed, maritime mobile, and amateur radio services',
        band: 'LF'
    },
    {
        startFreq: 137.8,
        endFreq: 148.5,
        unit: 'kHz',
        primaryService: 'FIXED; MARITIME MOBILE 5.64 5.67',
        secondaryService: 'FIXED; MARITIME MOBILE',
        usAllocations: 'FIXED; MARITIME MOBILE 5.64 US2',
        fccPart: 'Maritime (80)',
        description: 'Fixed and maritime mobile communications',
        band: 'LF'
    },
    {
        startFreq: 148.5,
        endFreq: 160.0,
        unit: 'kHz',
        primaryService: 'BROADCASTING',
        secondaryService: 'FIXED; MARITIME MOBILE',
        usAllocations: 'FIXED; MARITIME MOBILE 5.64 US2',
        fccPart: 'Maritime (80)',
        description: 'Broadcasting and maritime mobile services',
        band: 'LF'
    }
];

// Export for use in main application
if (typeof module !== 'undefined' && module.exports) {
    module.exports = peakIdentificationBand0;
} else if (typeof window !== 'undefined') {
    window.peakIdentificationBand0 = peakIdentificationBand0;
} 