// Peak Identification Database - Band 2 (HF: 500kHz-3 MHz)
// Turner Engineering Corporation - EMC Testing Support
// 
// ========================================================================
// BAND 2: HIGH FREQUENCY (HF) - LOWER PORTION
// ========================================================================
// 
// Frequency Range: 535 kHz - 3.025 MHz (with overlap from Band 1)
// Total Allocations: 27 frequency segments
// Spectrum Coverage: Lower HF band transition and entry
// 
// KEY SERVICES COVERED:
// • Extended AM Broadcasting (1605-1705 kHz)
// • Amateur Radio 160m band (1800-2000 kHz)
// • Fixed and Mobile Services
// • Maritime Mobile Communications
// • Aeronautical Mobile (Route and Off-Route)
// • Standard Time/Frequency Signals (2.5 MHz)
// • Radiolocation Services
// 
// NOTABLE FREQUENCIES:
// • 1800-2000 kHz - Amateur radio 160 meter band
// • 2500 kHz - Standard frequency and time signal
// • 2173.5-2190.5 kHz - Distress and calling frequencies
// • Various maritime mobile channels
// 
// FCC PART REFERENCES:
// • Part 73: AM Broadcasting (extended band)
// • Part 80: Maritime Services
// • Part 87: Aviation Services
// • Part 90: Private Land Mobile
// • Part 97: Amateur Radio
// 
// ITU FOOTNOTES: Extensive 5.xxx series covering international
// broadcasting, maritime, and amateur coordination
// 
// TECHNICAL NOTES:
// • Transition from ground wave to sky wave propagation
// • Increased HF propagation characteristics
// • Broadcasting band expansion considerations
// • Long-range communication capabilities
// • Amateur radio DX (long distance) operations
// 
// ========================================================================

const peakIdentificationBand2 = [
    {
        startFreq: 535.0,
        endFreq: 1605.0,
        unit: 'kHz',
        primaryService: 'BROADCASTING 5.87 5.87A',
        secondaryService: 'BROADCASTING',
        usAllocations: 'BROADCASTING',
        notes: 'BROADCASTING NG1 NG5',
        fccPart: 'Radio Broadcast (AM)(73); Private Land Mobile (90)',
        description: 'AM broadcasting band (overlap with Band 1)',
        band: 'HF'
    },
    {
        startFreq: 1605.0,
        endFreq: 1606.5,
        unit: 'kHz',
        primaryService: 'BROADCASTING 5.89',
        secondaryService: 'BROADCASTING',
        usAllocations: 'MOBILE US221 G127',
        notes: 'BROADCASTING NG1 NG5',
        fccPart: 'Radio Broadcast (AM)(73); Alaska Fixed (80); Private Land Mobile (90)',
        description: 'Extended AM broadcasting band',
        band: 'HF'
    },
    {
        startFreq: 1606.5,
        endFreq: 1615.0,
        unit: 'kHz',
        primaryService: 'FIXED; MARITIME MOBILE 5.90; LAND MOBILE',
        secondaryService: 'BROADCASTING',
        usAllocations: 'MOBILE US221 G127',
        notes: 'BROADCASTING US299 NG1 NG5',
        fccPart: 'Radio Broadcast (AM)(73); Alaska Fixed (80); Private Land Mobile (90)',
        description: 'Fixed, maritime mobile, and land mobile services',
        band: 'HF'
    },
    {
        startFreq: 1615.0,
        endFreq: 1625.0,
        unit: 'kHz',
        primaryService: 'FIXED; MARITIME MOBILE 5.90; LAND MOBILE',
        secondaryService: 'FIXED; MOBILE; BROADCASTING 5.89; Radiolocation',
        usAllocations: 'FIXED; MOBILE; RADIOLOCATION; AERONAUTICAL RADIONAVIGATION',
        notes: 'BROADCASTING US299 NG1 NG5',
        fccPart: 'Radio Broadcast (AM)(73); Alaska Fixed (80); Private Land Mobile (90)',
        description: 'Fixed, maritime mobile, and land mobile services',
        band: 'HF'
    },
    {
        startFreq: 1625.0,
        endFreq: 1635.0,
        unit: 'kHz',
        primaryService: 'RADIOLOCATION 5.93',
        secondaryService: 'FIXED; MOBILE; BROADCASTING 5.89; Radiolocation',
        usAllocations: 'FIXED; MOBILE; RADIOLOCATION; AERONAUTICAL RADIONAVIGATION',
        notes: 'BROADCASTING US299 NG1 NG5',
        fccPart: 'Radio Broadcast (AM)(73); Alaska Fixed (80); Private Land Mobile (90)',
        description: 'Radiolocation services',
        band: 'HF'
    },
    {
        startFreq: 1635.0,
        endFreq: 1705.0,
        unit: 'kHz',
        primaryService: 'FIXED; MARITIME MOBILE 5.90; LAND MOBILE 5.92 5.96',
        secondaryService: 'FIXED; MOBILE; BROADCASTING 5.89; Radiolocation',
        usAllocations: 'FIXED; MOBILE; RADIOLOCATION; AERONAUTICAL RADIONAVIGATION',
        notes: 'BROADCASTING US299 NG1 NG5',
        fccPart: 'Radio Broadcast (AM)(73); Alaska Fixed (80); Private Land Mobile (90)',
        description: 'Fixed, maritime mobile, and land mobile services',
        band: 'HF'
    },
    {
        startFreq: 1705.0,
        endFreq: 1800.0,
        unit: 'kHz',
        primaryService: 'FIXED; MARITIME MOBILE 5.90; LAND MOBILE 5.92 5.96',
        secondaryService: 'FIXED; MOBILE; RADIOLOCATION',
        usAllocations: 'FIXED; MOBILE; RADIOLOCATION; AERONAUTICAL RADIONAVIGATION US240',
        notes: 'FIXED; MOBILE; RADIOLOCATION',
        fccPart: 'Alaska Fixed (80); Private Land Mobile (90)',
        description: 'Fixed, maritime mobile, and land mobile services',
        band: 'HF'
    },
    {
        startFreq: 1800.0,
        endFreq: 1810.0,
        unit: 'kHz',
        primaryService: 'RADIOLOCATION 5.93',
        secondaryService: 'AMATEUR',
        usAllocations: 'AMATEUR',
        notes: 'AMATEUR',
        fccPart: 'Maritime (80); Amateur Radio (97)',
        description: 'Amateur radio band (160 meters)',
        band: 'HF'
    },
    {
        startFreq: 1810.0,
        endFreq: 1850.0,
        unit: 'kHz',
        primaryService: 'AMATEUR 5.98 5.99 5.100',
        secondaryService: 'AMATEUR',
        usAllocations: 'AMATEUR',
        notes: 'AMATEUR',
        fccPart: 'Maritime (80); Amateur Radio (97)',
        description: 'Amateur radio band (160 meters)',
        band: 'HF'
    },
    {
        startFreq: 1850.0,
        endFreq: 2000.0,
        unit: 'kHz',
        primaryService: 'FIXED; MOBILE except aeronautical mobile 5.92 5.96 5.103',
        secondaryService: 'AMATEUR; FIXED; MOBILE except aeronautical mobile; RADIOLOCATION; RADIONAVIGATION 5.97 5.102',
        usAllocations: 'AMATEUR',
        notes: 'AMATEUR NG92',
        fccPart: 'Maritime (80); Amateur Radio (97)',
        description: 'Fixed, mobile, and amateur radio services',
        band: 'HF'
    },
    {
        startFreq: 2000.0,
        endFreq: 2025.0,
        unit: 'kHz',
        primaryService: 'FIXED; MOBILE except aeronautical mobile (R) 5.92 5.103',
        secondaryService: 'FIXED; MOBILE',
        usAllocations: 'FIXED; MOBILE US340',
        notes: 'MARITIME MOBILE US340 NG7',
        fccPart: 'Maritime (80); Private Land Mobile (90)',
        description: 'Fixed and mobile services',
        band: 'HF'
    },
    {
        startFreq: 2025.0,
        endFreq: 2045.0,
        unit: 'kHz',
        primaryService: 'FIXED; MOBILE except aeronautical mobile (R); Meteorological aids 5.104 5.92 5.103',
        secondaryService: 'FIXED; MOBILE',
        usAllocations: 'FIXED; MOBILE US340',
        notes: 'MARITIME MOBILE US340 NG7',
        fccPart: 'Maritime (80); Private Land Mobile (90)',
        description: 'Fixed, mobile, and meteorological aids',
        band: 'HF'
    },
    {
        startFreq: 2045.0,
        endFreq: 2065.0,
        unit: 'kHz',
        primaryService: 'FIXED; MARITIME MOBILE; LAND MOBILE 5.92',
        secondaryService: 'FIXED; MOBILE',
        usAllocations: 'FIXED; MOBILE US340',
        notes: 'MARITIME MOBILE US340 NG7',
        fccPart: 'Maritime (80); Private Land Mobile (90)',
        description: 'Fixed, maritime mobile, and land mobile services',
        band: 'HF'
    },
    {
        startFreq: 2065.0,
        endFreq: 2107.0,
        unit: 'kHz',
        primaryService: 'FIXED; MARITIME MOBILE; LAND MOBILE 5.92',
        secondaryService: 'MARITIME MOBILE 5.105 5.106',
        usAllocations: 'MARITIME MOBILE 5.105 US296 US340',
        fccPart: 'Maritime (80)',
        description: 'Fixed, maritime mobile, and land mobile services',
        band: 'HF'
    },
    {
        startFreq: 2107.0,
        endFreq: 2160.0,
        unit: 'kHz',
        primaryService: 'FIXED; MARITIME MOBILE; LAND MOBILE 5.92',
        secondaryService: 'FIXED; MOBILE',
        usAllocations: 'FIXED; MOBILE US340',
        notes: 'FIXED; MOBILE except aeronautical mobile US340 NG7',
        fccPart: 'Maritime (80); Private Land Mobile (90)',
        description: 'Fixed, maritime mobile, and land mobile services',
        band: 'HF'
    },
    {
        startFreq: 2160.0,
        endFreq: 2170.0,
        unit: 'kHz',
        primaryService: 'RADIOLOCATION 5.93 5.107',
        secondaryService: 'FIXED; MOBILE',
        usAllocations: 'FIXED; MOBILE US340',
        notes: 'FIXED; MOBILE except aeronautical mobile US340 NG7',
        fccPart: 'Maritime (80); Private Land Mobile (90)',
        description: 'Radiolocation services',
        band: 'HF'
    },
    {
        startFreq: 2170.0,
        endFreq: 2173.5,
        unit: 'kHz',
        primaryService: 'MARITIME MOBILE',
        secondaryService: 'MARITIME MOBILE',
        usAllocations: 'MARITIME MOBILE (telephony) US340',
        notes: 'MARITIME MOBILE US340',
        fccPart: 'Maritime (80)',
        description: 'Maritime mobile telephony',
        band: 'HF'
    },
    {
        startFreq: 2173.5,
        endFreq: 2190.5,
        unit: 'kHz',
        primaryService: 'MOBILE (distress and calling) 5.108 5.109 5.110 5.111',
        secondaryService: 'MOBILE (distress and calling) 5.108 5.109 5.110 5.111',
        usAllocations: 'MOBILE (distress and calling) 5.108 5.109 5.110 5.111 US279 US340',
        fccPart: 'Maritime (80); Aviation (87)',
        description: 'Mobile distress and calling frequencies',
        band: 'HF'
    },
    {
        startFreq: 2190.5,
        endFreq: 2194.0,
        unit: 'kHz',
        primaryService: 'MARITIME MOBILE',
        secondaryService: 'MARITIME MOBILE',
        usAllocations: 'MARITIME MOBILE (telephony) US340',
        notes: 'MARITIME MOBILE US340',
        fccPart: 'Maritime (80)',
        description: 'Maritime mobile telephony',
        band: 'HF'
    },
    {
        startFreq: 2194.0,
        endFreq: 2300.0,
        unit: 'kHz',
        primaryService: 'FIXED; MOBILE except aeronautical mobile (R) 5.92 5.103 5.112',
        secondaryService: 'FIXED; MOBILE 5.112',
        usAllocations: 'FIXED; MOBILE US22 US340',
        notes: 'FIXED; MOBILE except aeronautical mobile US22 US340 NG7',
        fccPart: 'Maritime (80); Private Land Mobile (90)',
        description: 'Fixed and mobile services',
        band: 'HF'
    },
    {
        startFreq: 2300.0,
        endFreq: 2495.0,
        unit: 'kHz',
        primaryService: 'FIXED; MOBILE except aeronautical mobile (R); BROADCASTING 5.113 5.103',
        secondaryService: 'FIXED; MOBILE; BROADCASTING 5.113',
        usAllocations: 'FIXED; MOBILE US22 US340',
        notes: 'FIXED; MOBILE except aeronautical mobile US22 US340 NG7',
        fccPart: 'Maritime (80); Private Land Mobile (90)',
        description: 'Fixed, mobile, and broadcasting services',
        band: 'HF'
    },
    {
        startFreq: 2495.0,
        endFreq: 2501.0,
        unit: 'kHz',
        primaryService: 'STANDARD FREQUENCY AND TIME SIGNAL (2500 kHz)',
        secondaryService: 'STANDARD FREQUENCY AND TIME SIGNAL (2500 kHz)',
        usAllocations: 'STANDARD FREQUENCY AND TIME SIGNAL (2500 kHz) US1 US340',
        description: 'Standard frequency and time signal at 2500 kHz',
        band: 'HF'
    },
    {
        startFreq: 2501.0,
        endFreq: 2502.0,
        unit: 'kHz',
        primaryService: 'STANDARD FREQUENCY AND TIME SIGNAL; Space research',
        secondaryService: 'STANDARD FREQUENCY AND TIME SIGNAL (2500 kHz)',
        usAllocations: 'STANDARD FREQUENCY AND TIME SIGNAL US1 US340',
        description: 'Standard frequency/time signal and space research',
        band: 'HF'
    },
    {
        startFreq: 2502.0,
        endFreq: 2625.0,
        unit: 'kHz',
        primaryService: 'FIXED; MOBILE except aeronautical mobile (R) 5.92 5.103 5.114',
        secondaryService: 'FIXED; MOBILE',
        usAllocations: 'FIXED; MOBILE US285 US22 US340',
        notes: 'FIXED; MOBILE except aeronautical mobile US285 US22 US340',
        fccPart: 'Maritime (80); Aviation (87); Private Land Mobile (90)',
        description: 'Fixed and mobile services',
        band: 'HF'
    },
    {
        startFreq: 2625.0,
        endFreq: 2650.0,
        unit: 'kHz',
        primaryService: 'MARITIME MOBILE; MARITIME RADIONAVIGATION 5.92',
        secondaryService: 'FIXED; MOBILE',
        usAllocations: 'FIXED; MOBILE US285 US22 US340',
        notes: 'FIXED; MOBILE except aeronautical mobile US285 US22 US340',
        fccPart: 'Maritime (80); Aviation (87); Private Land Mobile (90)',
        description: 'Maritime mobile and radionavigation services',
        band: 'HF'
    },
    {
        startFreq: 2650.0,
        endFreq: 2850.0,
        unit: 'kHz',
        primaryService: 'FIXED; MOBILE except aeronautical mobile (R) 5.92 5.103',
        secondaryService: 'FIXED; MOBILE',
        usAllocations: 'FIXED; MOBILE US285 US22 US340',
        notes: 'FIXED; MOBILE except aeronautical mobile US285 US22 US340',
        fccPart: 'Maritime (80); Aviation (87); Private Land Mobile (90)',
        description: 'Fixed and mobile services',
        band: 'HF'
    },
    {
        startFreq: 2850.0,
        endFreq: 3025.0,
        unit: 'kHz',
        primaryService: 'AERONAUTICAL MOBILE (R) 5.111 5.115',
        secondaryService: 'AERONAUTICAL MOBILE (R) 5.111 5.115',
        usAllocations: 'AERONAUTICAL MOBILE (R) 5.111 5.115 US283 US340',
        fccPart: 'Aviation (87)',
        description: 'Aeronautical mobile (route) services',
        band: 'HF'
    }
];

// Export for use in main application
if (typeof module !== 'undefined' && module.exports) {
    module.exports = peakIdentificationBand2;
} else if (typeof window !== 'undefined') {
    window.peakIdentificationBand2 = peakIdentificationBand2;
} 