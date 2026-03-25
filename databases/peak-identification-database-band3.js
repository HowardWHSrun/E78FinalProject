// Peak Identification Database - Band 3 (VHF: 2.5 MHz- 7.5 MHz)
// Turner Engineering Corporation - EMC Testing Support
// 
// ========================================================================
// BAND 3: HIGH FREQUENCY (HF) - CORE BANDS
// ========================================================================
// 
// Frequency Range: 2.495 - 8.1 MHz
// Total Allocations: 47 frequency segments
// Spectrum Coverage: Core HF bands including major amateur allocations
// 
// KEY SERVICES COVERED:
// • Standard Time/Frequency Signals (2.5 MHz, 5 MHz - WWV)
// • Amateur Radio Bands:
//   - 80 meters (3.5-4.0 MHz)
//   - 60 meters (5.3515-5.3665 MHz)  
//   - 40 meters (7.0-7.2 MHz)
// • International Broadcasting (5.9-6.2 MHz, 7.3-7.4 MHz)
// • Maritime Mobile (4.063-4.438 MHz, 6.2-6.525 MHz)
// • Aeronautical Mobile (Route and Off-Route)
// • Fixed and Mobile Services
// 
// NOTABLE FREQUENCIES:
// • 2.5 MHz - Standard frequency/time signal (WWV)
// • 5.0 MHz - Standard frequency/time signal (WWV)
// • 3.5-4.0 MHz - Amateur radio 80m band
// • 7.0-7.2 MHz - Amateur radio 40m band
// • 5.9-6.2 MHz - International broadcasting
// 
// FCC PART REFERENCES:
// • Part 73F: International Broadcasting
// • Part 80: Maritime Services
// • Part 87: Aviation Services
// • Part 90: Private Land Mobile
// • Part 97: Amateur Radio
// 
// ITU FOOTNOTES: Complex 5.xxx series including broadcasting
// coordination, amateur band plans, and aeronautical requirements
// 
// TECHNICAL NOTES:
// • Prime HF propagation characteristics
// • Major amateur radio DX bands
// • International broadcasting coordination
// • Maritime HF communications
// • Standard frequency/time distribution (NIST)
// • Day/night propagation pattern changes
// 
// ========================================================================

const peakIdentificationBand3 = [
    {
        startFreq: 2.495,
        endFreq: 2.501,
        unit: 'MHz',
        primaryService: 'STANDARD FREQUENCY AND TIME SIGNAL (2500 kHz)',
        secondaryService: 'STANDARD FREQUENCY AND TIME SIGNAL (2500 kHz)',
        usAllocations: 'STANDARD FREQUENCY AND TIME SIGNAL (2500 kHz) US1 US340',
        description: 'Standard frequency and time signal at 2.5 MHz',
        band: 'HF'
    },
    {
        startFreq: 2.501,
        endFreq: 2.502,
        unit: 'MHz',
        primaryService: 'STANDARD FREQUENCY AND TIME SIGNAL; Space research',
        secondaryService: 'STANDARD FREQUENCY AND TIME SIGNAL (2500 kHz)',
        usAllocations: 'STANDARD FREQUENCY AND TIME SIGNAL US1 US340',
        description: 'Standard frequency/time signal and space research',
        band: 'HF'
    },
    {
        startFreq: 2.502,
        endFreq: 2.625,
        unit: 'MHz',
        primaryService: 'FIXED; MOBILE except aeronautical mobile (R) 5.92 5.103 5.114',
        secondaryService: 'FIXED; MOBILE',
        usAllocations: 'FIXED; MOBILE US285 US22 US340',
        notes: 'FIXED; MOBILE except aeronautical mobile US285 US22 US340',
        fccPart: 'Maritime (80); Aviation (87); Private Land Mobile (90)',
        description: 'Fixed and mobile services',
        band: 'HF'
    },
    {
        startFreq: 2.625,
        endFreq: 2.650,
        unit: 'MHz',
        primaryService: 'MARITIME MOBILE; MARITIME RADIONAVIGATION 5.92',
        secondaryService: 'FIXED; MOBILE',
        usAllocations: 'FIXED; MOBILE US285 US22 US340',
        notes: 'FIXED; MOBILE except aeronautical mobile US285 US22 US340',
        fccPart: 'Maritime (80); Aviation (87); Private Land Mobile (90)',
        description: 'Maritime mobile and radionavigation services',
        band: 'HF'
    },
    {
        startFreq: 2.650,
        endFreq: 2.850,
        unit: 'MHz',
        primaryService: 'FIXED; MOBILE except aeronautical mobile (R) 5.92 5.103',
        secondaryService: 'FIXED; MOBILE',
        usAllocations: 'FIXED; MOBILE US285 US22 US340',
        notes: 'FIXED; MOBILE except aeronautical mobile US285 US22 US340',
        fccPart: 'Maritime (80); Aviation (87); Private Land Mobile (90)',
        description: 'Fixed and mobile services',
        band: 'HF'
    },
    {
        startFreq: 2.850,
        endFreq: 3.025,
        unit: 'MHz',
        primaryService: 'AERONAUTICAL MOBILE (R) 5.111 5.115',
        secondaryService: 'AERONAUTICAL MOBILE (R) 5.111 5.115',
        usAllocations: 'AERONAUTICAL MOBILE (R) 5.111 5.115 US283 US340',
        fccPart: 'Aviation (87)',
        description: 'Aeronautical mobile (route) services',
        band: 'HF'
    },
    {
        startFreq: 3.025,
        endFreq: 3.155,
        unit: 'MHz',
        primaryService: 'AERONAUTICAL MOBILE (OR)',
        secondaryService: 'AERONAUTICAL MOBILE (OR)',
        usAllocations: 'AERONAUTICAL MOBILE (OR) US340',
        fccPart: 'Aviation (87)',
        description: 'Aeronautical mobile (off-route) services',
        band: 'HF'
    },
    {
        startFreq: 3.155,
        endFreq: 3.200,
        unit: 'MHz',
        primaryService: 'FIXED; MOBILE except aeronautical mobile (R) 5.116 5.117',
        secondaryService: 'FIXED; MOBILE except aeronautical mobile (R)',
        usAllocations: 'FIXED; MOBILE except aeronautical mobile (R) US22 US340',
        fccPart: 'Maritime (80); Private Land Mobile (90)',
        description: 'Fixed and mobile services',
        band: 'HF'
    },
    {
        startFreq: 3.200,
        endFreq: 3.230,
        unit: 'MHz',
        primaryService: 'FIXED; MOBILE except aeronautical mobile (R); BROADCASTING 5.113 5.116',
        secondaryService: 'FIXED; MOBILE except aeronautical mobile (R)',
        usAllocations: 'FIXED; MOBILE except aeronautical mobile (R) US22 US340',
        fccPart: 'Maritime (80); Private Land Mobile (90)',
        description: 'Fixed, mobile, and broadcasting services',
        band: 'HF'
    },
    {
        startFreq: 3.230,
        endFreq: 3.400,
        unit: 'MHz',
        primaryService: 'FIXED; MOBILE except aeronautical mobile; BROADCASTING 5.113 5.116 5.118',
        secondaryService: 'FIXED; MOBILE except aeronautical mobile; BROADCASTING 5.113 5.116 5.118',
        usAllocations: 'FIXED; MOBILE except aeronautical mobile; Radiolocation US340',
        fccPart: 'Maritime (80); Aviation (87); Private Land Mobile (90)',
        description: 'Fixed, mobile, and broadcasting services',
        band: 'HF'
    },
    {
        startFreq: 3.400,
        endFreq: 3.500,
        unit: 'MHz',
        primaryService: 'AERONAUTICAL MOBILE (R)',
        secondaryService: 'AERONAUTICAL MOBILE (R)',
        usAllocations: 'AERONAUTICAL MOBILE (R) US283 US340',
        fccPart: 'Aviation (87)',
        description: 'Aeronautical mobile (route) services',
        band: 'HF'
    },
    {
        startFreq: 3.500,
        endFreq: 3.750,
        unit: 'MHz',
        primaryService: 'AMATEUR; FIXED; MOBILE except aeronautical mobile 5.92',
        secondaryService: 'AMATEUR 5.119',
        usAllocations: 'AMATEUR',
        fccPart: 'Amateur Radio (97)',
        description: 'Amateur radio band (80 meters)',
        band: 'HF'
    },
    {
        startFreq: 3.750,
        endFreq: 3.800,
        unit: 'MHz',
        primaryService: 'AMATEUR; FIXED; MOBILE except aeronautical mobile 5.92',
        secondaryService: 'AMATEUR; FIXED; MOBILE except aeronautical mobile (R)',
        usAllocations: 'AMATEUR',
        fccPart: 'Amateur Radio (97)',
        description: 'Amateur radio band (80 meters)',
        band: 'HF'
    },
    {
        startFreq: 3.800,
        endFreq: 3.900,
        unit: 'MHz',
        primaryService: 'FIXED; AERONAUTICAL MOBILE (OR); LAND MOBILE',
        secondaryService: 'AMATEUR; FIXED; MOBILE except aeronautical mobile (R)',
        usAllocations: 'AMATEUR',
        fccPart: 'Amateur Radio (97)',
        description: 'Fixed, aeronautical mobile, land mobile, and amateur radio',
        band: 'HF'
    },
    {
        startFreq: 3.900,
        endFreq: 3.950,
        unit: 'MHz',
        primaryService: 'AERONAUTICAL MOBILE (OR) 5.123',
        secondaryService: 'AERONAUTICAL MOBILE (OR) 5.123',
        usAllocations: 'AERONAUTICAL MOBILE (OR) 5.123',
        notes: 'AMATEUR',
        fccPart: 'Amateur Radio (97)',
        description: 'Aeronautical mobile (off-route) and amateur radio',
        band: 'HF'
    },
    {
        startFreq: 3.950,
        endFreq: 4.000,
        unit: 'MHz',
        primaryService: 'FIXED; BROADCASTING 5.122 5.125',
        secondaryService: 'FIXED; BROADCASTING 5.126',
        usAllocations: 'FIXED US340',
        notes: 'AMATEUR; BROADCASTING US340',
        fccPart: 'Amateur Radio (97)',
        description: 'Fixed, broadcasting, and amateur radio',
        band: 'HF'
    },
    {
        startFreq: 4.000,
        endFreq: 4.063,
        unit: 'MHz',
        primaryService: 'FIXED; MARITIME MOBILE 5.127 5.126',
        secondaryService: 'FIXED; MARITIME MOBILE 5.127 5.126',
        usAllocations: 'FIXED; MARITIME MOBILE US340',
        fccPart: 'Maritime (80)',
        description: 'Fixed and maritime mobile services',
        band: 'HF'
    },
    {
        startFreq: 4.063,
        endFreq: 4.438,
        unit: 'MHz',
        primaryService: 'MARITIME MOBILE 5.79A 5.109 5.110 5.130 5.131 5.132 5.128',
        secondaryService: 'MARITIME MOBILE 5.79A 5.109 5.110 5.130 5.131 5.132 5.128',
        usAllocations: 'MARITIME MOBILE 5.79A 5.109 5.110 5.130 5.131 5.132 US82 US296 US340',
        fccPart: 'Maritime (80); Aviation (87)',
        description: 'Maritime mobile services',
        band: 'HF'
    },
    {
        startFreq: 4.438,
        endFreq: 4.488,
        unit: 'MHz',
        primaryService: 'FIXED; MOBILE except aeronautical mobile (R); Radiolocation 5.132A 5.132B',
        secondaryService: 'FIXED; MOBILE except aeronautical mobile (R); RADIOLOCATION 5.132A',
        usAllocations: 'FIXED; MOBILE except aeronautical mobile (R); RADIOLOCATION 5.132A US340',
        fccPart: 'Maritime (80); Private Land Mobile (90)',
        description: 'Fixed, mobile, and radiolocation services',
        band: 'HF'
    },
    {
        startFreq: 4.488,
        endFreq: 4.650,
        unit: 'MHz',
        primaryService: 'FIXED; MOBILE except aeronautical mobile (R)',
        secondaryService: 'FIXED; MOBILE except aeronautical mobile',
        usAllocations: 'FIXED; MOBILE except aeronautical mobile (R) US22 US340',
        fccPart: 'Maritime (80); Aviation (87); Private Land Mobile (90)',
        description: 'Fixed and mobile services',
        band: 'HF'
    },
    {
        startFreq: 4.650,
        endFreq: 4.700,
        unit: 'MHz',
        primaryService: 'AERONAUTICAL MOBILE (R)',
        secondaryService: 'AERONAUTICAL MOBILE (R)',
        usAllocations: 'AERONAUTICAL MOBILE (R) US282 US283 US340',
        fccPart: 'Aviation (87)',
        description: 'Aeronautical mobile (route) services',
        band: 'HF'
    },
    {
        startFreq: 4.700,
        endFreq: 4.750,
        unit: 'MHz',
        primaryService: 'AERONAUTICAL MOBILE (OR)',
        secondaryService: 'AERONAUTICAL MOBILE (OR)',
        usAllocations: 'AERONAUTICAL MOBILE (OR) US340',
        description: 'Aeronautical mobile (off-route) services',
        band: 'HF'
    },
    {
        startFreq: 4.750,
        endFreq: 4.850,
        unit: 'MHz',
        primaryService: 'FIXED; AERONAUTICAL MOBILE (OR); LAND MOBILE; BROADCASTING 5.113',
        secondaryService: 'FIXED; MOBILE except aeronautical mobile (R); BROADCASTING 5.113',
        usAllocations: 'FIXED; MOBILE except aeronautical mobile (R) US340',
        fccPart: 'Maritime (80); Private Land Mobile (90)',
        description: 'Fixed, aeronautical mobile, land mobile, and broadcasting',
        band: 'HF'
    },
    {
        startFreq: 4.850,
        endFreq: 4.995,
        unit: 'MHz',
        primaryService: 'FIXED; LAND MOBILE; BROADCASTING 5.113',
        secondaryService: 'FIXED; LAND MOBILE; BROADCASTING 5.113',
        usAllocations: 'FIXED; MOBILE US340',
        notes: 'FIXED US340',
        fccPart: 'Aviation (87); Private Land Mobile (90)',
        description: 'Fixed, land mobile, and broadcasting services',
        band: 'HF'
    },
    {
        startFreq: 4.995,
        endFreq: 5.003,
        unit: 'MHz',
        primaryService: 'STANDARD FREQUENCY AND TIME SIGNAL (5 MHz)',
        secondaryService: 'STANDARD FREQUENCY AND TIME SIGNAL (5 MHz)',
        usAllocations: 'STANDARD FREQUENCY AND TIME SIGNAL (5 MHz) US1 US340',
        description: 'Standard frequency and time signal at 5 MHz (WWV)',
        band: 'HF'
    },
    {
        startFreq: 5.003,
        endFreq: 5.005,
        unit: 'MHz',
        primaryService: 'STANDARD FREQUENCY AND TIME SIGNAL; Space research',
        secondaryService: 'STANDARD FREQUENCY AND TIME SIGNAL (5 MHz)',
        usAllocations: 'STANDARD FREQUENCY AND TIME SIGNAL (5 MHz) US1 US340',
        description: 'Standard frequency/time signal and space research',
        band: 'HF'
    },
    {
        startFreq: 5.005,
        endFreq: 5.060,
        unit: 'MHz',
        primaryService: 'FIXED; BROADCASTING 5.113',
        secondaryService: 'FIXED; BROADCASTING 5.113',
        usAllocations: 'FIXED US22 US340',
        fccPart: 'Aviation (87); Private Land Mobile (90)',
        description: 'Fixed and broadcasting services',
        band: 'HF'
    },
    {
        startFreq: 5.060,
        endFreq: 5.250,
        unit: 'MHz',
        primaryService: 'FIXED; Mobile except aeronautical mobile 5.133',
        secondaryService: 'FIXED; Mobile except aeronautical mobile 5.133',
        usAllocations: 'FIXED US22; Mobile except aeronautical mobile US212 US340',
        fccPart: 'Maritime (80); Aviation (87); Private Land Mobile (90)',
        description: 'Fixed and mobile services',
        band: 'HF'
    },
    {
        startFreq: 5.250,
        endFreq: 5.275,
        unit: 'MHz',
        primaryService: 'FIXED; MOBILE except aeronautical mobile; Radiolocation 5.132A 5.133A',
        secondaryService: 'FIXED; MOBILE except aeronautical mobile; RADIOLOCATION 5.132A',
        usAllocations: 'FIXED; MOBILE except aeronautical mobile; RADIOLOCATION 5.132A US340',
        fccPart: 'Maritime (80); Private Land Mobile (90)',
        description: 'Fixed, mobile, and radiolocation services',
        band: 'HF'
    },
    {
        startFreq: 5.275,
        endFreq: 5.3515,
        unit: 'MHz',
        primaryService: 'FIXED; MOBILE except aeronautical mobile',
        secondaryService: 'FIXED; MOBILE except aeronautical mobile',
        usAllocations: 'FIXED US22; Mobile except aeronautical mobile US23 US340',
        fccPart: 'Maritime (80); Aviation (87); Private Land Mobile (90); Amateur Radio (97)',
        description: 'Fixed and mobile services',
        band: 'HF'
    },
    {
        startFreq: 5.3515,
        endFreq: 5.3665,
        unit: 'MHz',
        primaryService: 'FIXED; MOBILE except aeronautical mobile; Amateur 5.133B',
        secondaryService: 'FIXED; MOBILE except aeronautical mobile; Amateur 5.133B',
        usAllocations: 'FIXED US22; Mobile except aeronautical mobile US23 US340',
        fccPart: 'Maritime (80); Aviation (87); Private Land Mobile (90); Amateur Radio (97)',
        description: 'Fixed, mobile, and amateur radio services (60 meters)',
        band: 'HF'
    },
    {
        startFreq: 5.3665,
        endFreq: 5.450,
        unit: 'MHz',
        primaryService: 'FIXED; MOBILE except aeronautical mobile',
        secondaryService: 'FIXED; MOBILE except aeronautical mobile',
        usAllocations: 'FIXED US22; Mobile except aeronautical mobile US23 US340',
        fccPart: 'Maritime (80); Aviation (87); Private Land Mobile (90); Amateur Radio (97)',
        description: 'Fixed and mobile services',
        band: 'HF'
    },
    {
        startFreq: 5.450,
        endFreq: 5.480,
        unit: 'MHz',
        primaryService: 'FIXED; AERONAUTICAL MOBILE (OR); LAND MOBILE',
        secondaryService: 'AERONAUTICAL MOBILE (R)',
        usAllocations: 'AERONAUTICAL MOBILE (R) 5.111 5.115 US283 US340',
        fccPart: 'Aviation (87)',
        description: 'Fixed, aeronautical mobile, and land mobile services',
        band: 'HF'
    },
    {
        startFreq: 5.480,
        endFreq: 5.680,
        unit: 'MHz',
        primaryService: 'AERONAUTICAL MOBILE (R) 5.111 5.115',
        secondaryService: 'AERONAUTICAL MOBILE (R) 5.111 5.115',
        usAllocations: 'AERONAUTICAL MOBILE (R) 5.111 5.115 US283 US340',
        fccPart: 'Aviation (87)',
        description: 'Aeronautical mobile (route) services',
        band: 'HF'
    },
    {
        startFreq: 5.680,
        endFreq: 5.730,
        unit: 'MHz',
        primaryService: 'AERONAUTICAL MOBILE (OR) 5.111 5.115',
        secondaryService: 'AERONAUTICAL MOBILE (OR) 5.111 5.115',
        usAllocations: 'AERONAUTICAL MOBILE (OR) 5.111 5.115 US340',
        description: 'Aeronautical mobile (off-route) services',
        band: 'HF'
    },
    {
        startFreq: 5.730,
        endFreq: 5.900,
        unit: 'MHz',
        primaryService: 'FIXED; LAND MOBILE',
        secondaryService: 'FIXED; MOBILE except aeronautical mobile (R)',
        usAllocations: 'FIXED; MOBILE except aeronautical mobile (R) US340',
        fccPart: 'Maritime (80); Aviation (87); Private Land Mobile (90)',
        description: 'Fixed and land mobile services',
        band: 'HF'
    },
    {
        startFreq: 5.900,
        endFreq: 5.950,
        unit: 'MHz',
        primaryService: 'BROADCASTING 5.134 5.136',
        secondaryService: 'BROADCASTING 5.134',
        usAllocations: 'BROADCASTING 5.134 US136 US340',
        fccPart: 'International Broadcast Stations (73F)',
        description: 'International broadcasting',
        band: 'HF'
    },
    {
        startFreq: 5.950,
        endFreq: 6.200,
        unit: 'MHz',
        primaryService: 'BROADCASTING',
        secondaryService: 'BROADCASTING 5.134',
        usAllocations: 'BROADCASTING 5.134 US136 US340',
        fccPart: 'International Broadcast Stations (73F)',
        description: 'International broadcasting',
        band: 'HF'
    },
    {
        startFreq: 6.200,
        endFreq: 6.525,
        unit: 'MHz',
        primaryService: 'MARITIME MOBILE 5.109 5.110 5.130 5.132 5.137',
        secondaryService: 'MARITIME MOBILE 5.109 5.110 5.130 5.132 5.137',
        usAllocations: 'MARITIME MOBILE 5.109 5.110 5.130 5.132 US82 US296 US340',
        fccPart: 'Maritime (80)',
        description: 'Maritime mobile services',
        band: 'HF'
    },
    {
        startFreq: 6.525,
        endFreq: 6.685,
        unit: 'MHz',
        primaryService: 'AERONAUTICAL MOBILE (R)',
        secondaryService: 'AERONAUTICAL MOBILE (R)',
        usAllocations: 'AERONAUTICAL MOBILE (R) US283 US340',
        fccPart: 'Aviation (87)',
        description: 'Aeronautical mobile (route) services',
        band: 'HF'
    },
    {
        startFreq: 6.685,
        endFreq: 6.765,
        unit: 'MHz',
        primaryService: 'AERONAUTICAL MOBILE (OR)',
        secondaryService: 'AERONAUTICAL MOBILE (OR)',
        usAllocations: 'AERONAUTICAL MOBILE (OR) US340',
        description: 'Aeronautical mobile (off-route) services',
        band: 'HF'
    },
    {
        startFreq: 6.765,
        endFreq: 7.000,
        unit: 'MHz',
        primaryService: 'FIXED; MOBILE except aeronautical mobile (R) 5.138',
        secondaryService: 'FIXED; MOBILE except aeronautical mobile (R) 5.138',
        usAllocations: 'FIXED US22; MOBILE except aeronautical mobile (R) 5.138 US340',
        fccPart: 'ISM Equipment (18); Private Land Mobile (90)',
        description: 'Fixed and mobile services',
        band: 'HF'
    },
    {
        startFreq: 7.000,
        endFreq: 7.100,
        unit: 'MHz',
        primaryService: 'AMATEUR; AMATEUR-SATELLITE 5.140 5.141 5.141A',
        secondaryService: 'AMATEUR; AMATEUR-SATELLITE 5.140 5.141 5.141A',
        usAllocations: 'AMATEUR; AMATEUR-SATELLITE US340',
        fccPart: 'Amateur Radio (97)',
        description: 'Amateur radio and amateur satellite (40 meters)',
        band: 'HF'
    },
    {
        startFreq: 7.100,
        endFreq: 7.200,
        unit: 'MHz',
        primaryService: 'AMATEUR 5.142 5.141A 5.141B',
        secondaryService: 'AMATEUR 5.142',
        usAllocations: 'AMATEUR US340',
        notes: 'AMATEUR US340',
        fccPart: 'Amateur Radio (97)',
        description: 'Amateur radio band (40 meters)',
        band: 'HF'
    },
    {
        startFreq: 7.200,
        endFreq: 7.300,
        unit: 'MHz',
        primaryService: 'BROADCASTING',
        secondaryService: 'AMATEUR 5.142',
        usAllocations: 'US142 US340',
        notes: 'AMATEUR US142 US340',
        fccPart: 'International Broadcast Stations (73F); Amateur Radio (97)',
        description: 'Broadcasting and amateur radio',
        band: 'HF'
    },
    {
        startFreq: 7.300,
        endFreq: 7.400,
        unit: 'MHz',
        primaryService: 'BROADCASTING 5.134 5.143 5.143A 5.143B 5.143C 5.143D',
        secondaryService: 'BROADCASTING 5.134',
        usAllocations: 'BROADCASTING 5.134 US136 US340',
        fccPart: 'International Broadcast Stations (73F); Maritime (80); Private Land Mobile (90)',
        description: 'International broadcasting',
        band: 'HF'
    },
    {
        startFreq: 7.400,
        endFreq: 7.450,
        unit: 'MHz',
        primaryService: 'BROADCASTING 5.143B 5.143C',
        secondaryService: 'FIXED; MOBILE except aeronautical mobile (R)',
        usAllocations: 'FIXED; MOBILE except aeronautical mobile (R) US142 US340',
        fccPart: 'Maritime (80); Private Land Mobile (90)',
        description: 'Broadcasting and fixed/mobile services',
        band: 'HF'
    },
    {
        startFreq: 7.450,
        endFreq: 8.100,
        unit: 'MHz',
        primaryService: 'FIXED; MOBILE except aeronautical mobile (R) 5.144',
        secondaryService: 'FIXED; MOBILE except aeronautical mobile (R) 5.144',
        usAllocations: 'FIXED US22; MOBILE except aeronautical mobile (R) US340',
        fccPart: 'Maritime (80); Aviation (87); Private Land Mobile (90)',
        description: 'Fixed and mobile services',
        band: 'HF'
    }
];

// Export for use in main application
if (typeof module !== 'undefined' && module.exports) {
    module.exports = peakIdentificationBand3;
} else if (typeof window !== 'undefined') {
    window.peakIdentificationBand3 = peakIdentificationBand3;
} 