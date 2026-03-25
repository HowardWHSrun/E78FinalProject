// Peak Identification Database - Band 4 (HF: 5-30 MHz)
// Turner Engineering Corporation - EMC Testing Support
// 
// ========================================================================
// BAND 4: HIGH FREQUENCY (HF) - UPPER BANDS
// ========================================================================
// 
// Frequency Range: 5 - 30 MHz
// Total Allocations: ~95 frequency segments
// Spectrum Coverage: Upper HF including major amateur and ISM bands
// 
// KEY SERVICES COVERED:
// • Amateur Radio Bands:
//   - 20 meters (14.0-14.35 MHz) - Primary DX band
//   - 17 meters (18.068-18.168 MHz)
//   - 15 meters (21.0-21.45 MHz)
//   - 12 meters (24.89-24.99 MHz)
//   - 10 meters (28.0-29.7 MHz)
// • Citizens Band Radio (26.965-27.405 MHz)
// • ISM Band (26.957-27.283 MHz)
// • International Broadcasting (Multiple bands)
// • Maritime Mobile Communications
// • Aeronautical Mobile (Route and Off-Route)
// • Standard Time/Frequency Signals (10 MHz, 15 MHz, 20 MHz, 25 MHz)
// 
// NOTABLE FREQUENCIES:
// • 10 MHz - WWV standard frequency
// • 14.0-14.35 MHz - 20m amateur (primary DX band)
// • 21.0-21.45 MHz - 15m amateur
// • 26.965-27.405 MHz - Citizens Band (CB)
// • 28.0-29.7 MHz - 10m amateur
// • Various VOLMET aviation weather frequencies
// 
// FCC PART REFERENCES:
// • Part 73F: International Broadcasting
// • Part 80: Maritime Services
// • Part 87: Aviation Services
// • Part 95: Citizens Band Radio
// • Part 97: Amateur Radio
// • Part 18: ISM Equipment
// 
// ITU FOOTNOTES: Extensive 5.xxx series covering amateur
// frequency coordination, broadcasting, and ISM applications
// 
// TECHNICAL NOTES:
// • Optimal HF propagation for long-distance communication
// • Major amateur radio DX (long distance) bands
// • Citizens Band and personal radio services
// • ISM applications (industrial, scientific, medical)
// • International broadcasting coordination
// • Solar cycle dependent propagation
// 
// ========================================================================

const peakIdentificationBand4 = [
    {
        startFreq: 4.995,
        endFreq: 5.003,
        unit: 'MHz',
        primaryService: 'STANDARD FREQUENCY AND TIME SIGNAL (5 MHz)',
        secondaryService: 'STANDARD FREQUENCY AND TIME SIGNAL (5 MHz)',
        usAllocations: 'STANDARD FREQUENCY AND TIME SIGNAL (5 MHz) US1 US340',
        notes: '',
        fccPart: '',
        description: 'Standard Frequency and Time Signal',
        band: 'HF'
    },
    {
        startFreq: 5.003,
        endFreq: 5.005,
        unit: 'MHz',
        primaryService: 'STANDARD FREQUENCY AND TIME SIGNAL; Space research',
        secondaryService: 'STANDARD FREQUENCY AND TIME SIGNAL (5 MHz)',
        usAllocations: 'STANDARD FREQUENCY AND TIME SIGNAL (5 MHz) US1 US340',
        notes: '',
        fccPart: '',
        description: 'Standard Frequency and Time Signal, Space research',
        band: 'HF'
    },
    {
        startFreq: 5.005,
        endFreq: 5.06,
        unit: 'MHz',
        primaryService: 'FIXED; BROADCASTING 5.113',
        secondaryService: 'FIXED; BROADCASTING 5.113',
        usAllocations: 'FIXED US22 US340',
        notes: '',
        fccPart: 'Aviation (87); Private Land Mobile (90)',
        description: 'Fixed and Broadcasting services',
        band: 'HF'
    },
    {
        startFreq: 5.06,
        endFreq: 5.25,
        unit: 'MHz',
        primaryService: 'FIXED; Mobile except aeronautical mobile 5.133',
        secondaryService: 'FIXED; Mobile except aeronautical mobile 5.133',
        usAllocations: 'FIXED US22; Mobile except aeronautical mobile US212 US340',
        notes: '',
        fccPart: 'Maritime (80); Aviation (87); Private Land Mobile (90)',
        description: 'Fixed and Mobile services',
        band: 'HF'
    },
    {
        startFreq: 5.25,
        endFreq: 5.275,
        unit: 'MHz',
        primaryService: 'FIXED; MOBILE except aeronautical mobile; Radiolocation 5.132A 5.133A',
        secondaryService: 'FIXED; MOBILE except aeronautical mobile; RADIOLOCATION 5.132A',
        usAllocations: 'FIXED; MOBILE except aeronautical mobile; RADIOLOCATION 5.132A US340',
        notes: '',
        fccPart: 'Maritime (80); Private Land Mobile (90)',
        description: 'Fixed, Mobile, and Radiolocation services',
        band: 'HF'
    },
    {
        startFreq: 5.275,
        endFreq: 5.3515,
        unit: 'MHz',
        primaryService: 'FIXED; MOBILE except aeronautical mobile',
        secondaryService: 'FIXED; MOBILE except aeronautical mobile',
        usAllocations: 'FIXED US22; Mobile except aeronautical mobile US23 US340',
        notes: '',
        fccPart: 'Maritime (80); Aviation (87); Private Land Mobile (90); Amateur Radio (97)',
        description: 'Fixed and Mobile services',
        band: 'HF'
    },
    {
        startFreq: 5.3515,
        endFreq: 5.3665,
        unit: 'MHz',
        primaryService: 'FIXED; MOBILE except aeronautical mobile; Amateur 5.133B',
        secondaryService: 'FIXED; MOBILE except aeronautical mobile; Amateur 5.133B',
        usAllocations: 'FIXED US22; Mobile except aeronautical mobile US23 US340',
        notes: '',
        fccPart: 'Maritime (80); Aviation (87); Private Land Mobile (90); Amateur Radio (97)',
        description: 'Fixed, Mobile, and Amateur Radio services',
        band: 'HF'
    },
    {
        startFreq: 5.3665,
        endFreq: 5.45,
        unit: 'MHz',
        primaryService: 'FIXED; MOBILE except aeronautical mobile',
        secondaryService: 'FIXED; MOBILE except aeronautical mobile',
        usAllocations: 'FIXED US22; Mobile except aeronautical mobile US23 US340',
        notes: '',
        fccPart: 'Maritime (80); Aviation (87); Private Land Mobile (90); Amateur Radio (97)',
        description: 'Fixed and Mobile services',
        band: 'HF'
    },
    {
        startFreq: 5.45,
        endFreq: 5.48,
        unit: 'MHz',
        primaryService: 'FIXED; AERONAUTICAL MOBILE (OR); LAND MOBILE',
        secondaryService: 'AERONAUTICAL MOBILE (R)',
        usAllocations: 'AERONAUTICAL MOBILE (R) 5.111 5.115 US283 US340',
        notes: '',
        fccPart: 'Aviation (87)',
        description: 'Fixed, Aeronautical Mobile, and Land Mobile services',
        band: 'HF'
    },
    {
        startFreq: 5.48,
        endFreq: 5.68,
        unit: 'MHz',
        primaryService: 'AERONAUTICAL MOBILE (R) 5.111 5.115',
        secondaryService: 'AERONAUTICAL MOBILE (R) 5.111 5.115',
        usAllocations: 'AERONAUTICAL MOBILE (R) 5.111 5.115 US283 US340',
        notes: '',
        fccPart: 'Aviation (87)',
        description: 'Aeronautical Mobile (Route)',
        band: 'HF'
    },
    {
        startFreq: 5.68,
        endFreq: 5.73,
        unit: 'MHz',
        primaryService: 'AERONAUTICAL MOBILE (OR) 5.111 5.115',
        secondaryService: 'AERONAUTICAL MOBILE (OR) 5.111 5.115',
        usAllocations: 'AERONAUTICAL MOBILE (OR) 5.111 5.115 US340',
        notes: '',
        fccPart: '',
        description: 'Aeronautical Mobile (Off-Route)',
        band: 'HF'
    },
    {
        startFreq: 5.73,
        endFreq: 5.9,
        unit: 'MHz',
        primaryService: 'FIXED; LAND MOBILE',
        secondaryService: 'FIXED; MOBILE except aeronautical mobile (R)',
        usAllocations: 'FIXED; MOBILE except aeronautical mobile (R) US340',
        notes: '',
        fccPart: 'Maritime (80); Aviation (87); Private Land Mobile (90)',
        description: 'Fixed and Land Mobile services',
        band: 'HF'
    },
    {
        startFreq: 5.9,
        endFreq: 5.95,
        unit: 'MHz',
        primaryService: 'BROADCASTING 5.134 5.136',
        secondaryService: 'BROADCASTING 5.134',
        usAllocations: 'BROADCASTING 5.134 US136 US340',
        notes: '',
        fccPart: 'International Broadcast Stations (73F)',
        description: 'Broadcasting',
        band: 'HF'
    },
    {
        startFreq: 5.95,
        endFreq: 6.2,
        unit: 'MHz',
        primaryService: 'BROADCASTING',
        secondaryService: 'BROADCASTING 5.134',
        usAllocations: 'BROADCASTING 5.134 US136 US340',
        notes: '',
        fccPart: 'International Broadcast Stations (73F)',
        description: 'Broadcasting',
        band: 'HF'
    },
    {
        startFreq: 6.2,
        endFreq: 6.525,
        unit: 'MHz',
        primaryService: 'MARITIME MOBILE 5.109 5.110 5.130 5.132 5.137',
        secondaryService: 'MARITIME MOBILE 5.109 5.110 5.130 5.132 5.137',
        usAllocations: 'MARITIME MOBILE 5.109 5.110 5.130 5.132 US82 US296 US340',
        notes: '',
        fccPart: 'Maritime (80)',
        description: 'Maritime Mobile',
        band: 'HF'
    },
    {
        startFreq: 6.525,
        endFreq: 6.685,
        unit: 'MHz',
        primaryService: 'AERONAUTICAL MOBILE (R)',
        secondaryService: 'AERONAUTICAL MOBILE (R)',
        usAllocations: 'AERONAUTICAL MOBILE (R) US283 US340',
        notes: '',
        fccPart: 'Aviation (87)',
        description: 'Aeronautical Mobile (Route)',
        band: 'HF'
    },
    {
        startFreq: 6.685,
        endFreq: 6.765,
        unit: 'MHz',
        primaryService: 'AERONAUTICAL MOBILE (OR)',
        secondaryService: 'AERONAUTICAL MOBILE (OR)',
        usAllocations: 'AERONAUTICAL MOBILE (OR) US340',
        notes: '',
        fccPart: '',
        description: 'Aeronautical Mobile (Off-Route)',
        band: 'HF'
    },
    {
        startFreq: 6.765,
        endFreq: 7,
        unit: 'MHz',
        primaryService: 'FIXED; MOBILE except aeronautical mobile (R) 5.138',
        secondaryService: 'FIXED; MOBILE except aeronautical mobile (R) 5.138',
        usAllocations: 'FIXED US22; MOBILE except aeronautical mobile (R) 5.138 US340',
        notes: '',
        fccPart: 'ISM Equipment (18); Private Land Mobile (90)',
        description: 'Fixed and Mobile services',
        band: 'HF'
    },
    {
        startFreq: 7,
        endFreq: 7.1,
        unit: 'MHz',
        primaryService: 'AMATEUR; AMATEUR-SATELLITE 5.140 5.141 5.141A',
        secondaryService: 'AMATEUR; AMATEUR-SATELLITE 5.140 5.141 5.141A',
        usAllocations: 'AMATEUR; AMATEUR-SATELLITE US340',
        notes: '',
        fccPart: 'Amateur Radio (97)',
        description: 'Amateur and Amateur-Satellite Radio',
        band: 'HF'
    },
    {
        startFreq: 7.1,
        endFreq: 7.2,
        unit: 'MHz',
        primaryService: 'AMATEUR 5.142 5.141A 5.141B',
        secondaryService: 'AMATEUR 5.142',
        usAllocations: 'AMATEUR US340',
        notes: 'AMATEUR US340',
        fccPart: 'Amateur Radio (97)',
        description: 'Amateur Radio',
        band: 'HF'
    },
    {
        startFreq: 7.2,
        endFreq: 7.3,
        unit: 'MHz',
        primaryService: 'BROADCASTING',
        secondaryService: 'AMATEUR 5.142',
        usAllocations: 'US142 US340',
        notes: 'AMATEUR US142 US340',
        fccPart: 'International Broadcast Stations (73F); Amateur Radio (97)',
        description: 'Broadcasting and Amateur Radio',
        band: 'HF'
    },
    {
        startFreq: 7.3,
        endFreq: 7.4,
        unit: 'MHz',
        primaryService: 'BROADCASTING 5.134 5.143 5.143A 5.143B 5.143C 5.143D',
        secondaryService: 'BROADCASTING 5.134',
        usAllocations: 'BROADCASTING 5.134 US136 US340',
        notes: '',
        fccPart: 'International Broadcast Stations (73F); Maritime (80); Private Land Mobile (90)',
        description: 'Broadcasting',
        band: 'HF'
    },
    {
        startFreq: 7.4,
        endFreq: 7.45,
        unit: 'MHz',
        primaryService: 'BROADCASTING 5.143B 5.143C',
        secondaryService: 'FIXED; MOBILE except aeronautical mobile (R)',
        usAllocations: 'FIXED; MOBILE except aeronautical mobile (R) US142 US340',
        notes: '',
        fccPart: 'Maritime (80); Private Land Mobile (90)',
        description: 'Broadcasting, Fixed and Mobile services',
        band: 'HF'
    },
    {
        startFreq: 7.45,
        endFreq: 8.1,
        unit: 'MHz',
        primaryService: 'FIXED; MOBILE except aeronautical mobile (R) 5.144',
        secondaryService: 'FIXED; MOBILE except aeronautical mobile (R) 5.144',
        usAllocations: 'FIXED US22; MOBILE except aeronautical mobile (R) US340',
        notes: '',
        fccPart: 'Maritime (80); Aviation (87); Private Land Mobile (90)',
        description: 'Fixed and Mobile services',
        band: 'HF'
    },
    {
        startFreq: 8.1,
        endFreq: 8.195,
        unit: 'MHz',
        primaryService: 'FIXED; MARITIME MOBILE',
        secondaryService: 'FIXED; MARITIME MOBILE',
        usAllocations: 'FIXED; MARITIME MOBILE US340',
        notes: '',
        fccPart: 'Maritime (80)',
        description: 'Fixed and Maritime Mobile services',
        band: 'HF'
    },
    {
        startFreq: 8.195,
        endFreq: 8.815,
        unit: 'MHz',
        primaryService: 'MARITIME MOBILE 5.109 5.110 5.132 5.145 5.111',
        secondaryService: 'MARITIME MOBILE 5.109 5.110 5.132 5.145 5.111',
        usAllocations: 'MARITIME MOBILE 5.109 5.110 5.132 5.145 US82 5.111 US296 US340',
        notes: '',
        fccPart: 'Maritime (80); Aviation (87)',
        description: 'Maritime Mobile',
        band: 'HF'
    },
    {
        startFreq: 8.815,
        endFreq: 8.965,
        unit: 'MHz',
        primaryService: 'AERONAUTICAL MOBILE (R)',
        secondaryService: 'AERONAUTICAL MOBILE (R)',
        usAllocations: 'AERONAUTICAL MOBILE (R) US340',
        notes: '',
        fccPart: 'Aviation (87)',
        description: 'Aeronautical Mobile (Route)',
        band: 'HF'
    },
    {
        startFreq: 8.965,
        endFreq: 9.04,
        unit: 'MHz',
        primaryService: 'AERONAUTICAL MOBILE (OR)',
        secondaryService: 'AERONAUTICAL MOBILE (OR)',
        usAllocations: 'AERONAUTICAL MOBILE (OR) US340',
        notes: '',
        fccPart: '',
        description: 'Aeronautical Mobile (Off-Route)',
        band: 'HF'
    },
    {
        startFreq: 9.04,
        endFreq: 9.305,
        unit: 'MHz',
        primaryService: 'FIXED',
        secondaryService: 'FIXED',
        usAllocations: 'FIXED',
        notes: 'FIXED',
        fccPart: 'Maritime (80); Private Land Mobile (90)',
        description: 'Fixed services',
        band: 'HF'
    },
    {
        startFreq: 9.305,
        endFreq: 9.355,
        unit: 'MHz',
        primaryService: 'FIXED; Radiolocation 5.145A 5.145B',
        secondaryService: 'FIXED',
        usAllocations: 'FIXED',
        notes: 'FIXED',
        fccPart: 'Maritime (80); Private Land Mobile (90)',
        description: 'Fixed and Radiolocation services',
        band: 'HF'
    },
    {
        startFreq: 9.355,
        endFreq: 9.4,
        unit: 'MHz',
        primaryService: 'FIXED',
        secondaryService: 'FIXED',
        usAllocations: 'FIXED US340',
        notes: '',
        fccPart: 'Maritime (80); Private Land Mobile (90)',
        description: 'Fixed services',
        band: 'HF'
    },
    {
        startFreq: 9.4,
        endFreq: 9.5,
        unit: 'MHz',
        primaryService: 'BROADCASTING 5.134 5.146',
        secondaryService: 'BROADCASTING 5.134',
        usAllocations: 'BROADCASTING 5.134 US136 US340',
        notes: '',
        fccPart: 'International Broadcast Stations (73F)',
        description: 'Broadcasting',
        band: 'HF'
    },
    {
        startFreq: 9.5,
        endFreq: 9.9,
        unit: 'MHz',
        primaryService: 'BROADCASTING 5.147',
        secondaryService: 'BROADCASTING 5.134',
        usAllocations: 'BROADCASTING 5.134 US136 US340',
        notes: '',
        fccPart: 'International Broadcast Stations (73F)',
        description: 'Broadcasting',
        band: 'HF'
    },
    {
        startFreq: 9.9,
        endFreq: 9.995,
        unit: 'MHz',
        primaryService: 'FIXED',
        secondaryService: 'FIXED',
        usAllocations: 'FIXED US340',
        notes: '',
        fccPart: 'Private Land Mobile (90)',
        description: 'Fixed services',
        band: 'HF'
    },
    {
        startFreq: 9.995,
        endFreq: 10.003,
        unit: 'MHz',
        primaryService: 'STANDARD FREQUENCY AND TIME SIGNAL (10 MHz) 5.111',
        secondaryService: 'STANDARD FREQUENCY AND TIME SIGNAL (10 MHz) 5.111',
        usAllocations: 'STANDARD FREQUENCY AND TIME SIGNAL (10 MHz) 5.111 US1 US340',
        notes: '',
        fccPart: '',
        description: 'Standard Frequency and Time Signal',
        band: 'HF'
    },
    {
        startFreq: 10.003,
        endFreq: 10.005,
        unit: 'MHz',
        primaryService: 'STANDARD FREQUENCY AND TIME SIGNAL; Space research 5.111',
        secondaryService: 'STANDARD FREQUENCY AND TIME SIGNAL (10 MHz) 5.111',
        usAllocations: 'STANDARD FREQUENCY AND TIME SIGNAL (10 MHz) 5.111 US1 US340',
        notes: '',
        fccPart: '',
        description: 'Standard Frequency and Time Signal, Space research',
        band: 'HF'
    },
    {
        startFreq: 10.005,
        endFreq: 10.1,
        unit: 'MHz',
        primaryService: 'AERONAUTICAL MOBILE (R) 5.111',
        secondaryService: 'AERONAUTICAL MOBILE (R) 5.111',
        usAllocations: 'AERONAUTICAL MOBILE (R) 5.111 US283 US340',
        notes: '',
        fccPart: 'Aviation (87)',
        description: 'Aeronautical Mobile (Route)',
        band: 'HF'
    },
    {
        startFreq: 10.1,
        endFreq: 10.15,
        unit: 'MHz',
        primaryService: 'FIXED; Amateur',
        secondaryService: 'FIXED; Amateur',
        usAllocations: 'US247 US340',
        notes: 'AMATEUR US247 US340',
        fccPart: 'Amateur Radio (97)',
        description: 'Fixed and Amateur Radio services',
        band: 'HF'
    },
    {
        startFreq: 10.15,
        endFreq: 11.175,
        unit: 'MHz',
        primaryService: 'FIXED; Mobile except aeronautical mobile (R)',
        secondaryService: 'FIXED; Mobile except aeronautical mobile (R)',
        usAllocations: 'FIXED; Mobile except aeronautical mobile (R) US340',
        notes: '',
        fccPart: 'Private Land Mobile (90)',
        description: 'Fixed and Mobile services',
        band: 'HF'
    },
    {
        startFreq: 11.175,
        endFreq: 11.275,
        unit: 'MHz',
        primaryService: 'AERONAUTICAL MOBILE (OR)',
        secondaryService: 'AERONAUTICAL MOBILE (OR)',
        usAllocations: 'AERONAUTICAL MOBILE (OR) US340',
        notes: '',
        fccPart: '',
        description: 'Aeronautical Mobile (Off-Route)',
        band: 'HF'
    },
    {
        startFreq: 11.275,
        endFreq: 11.4,
        unit: 'MHz',
        primaryService: 'AERONAUTICAL MOBILE (R)',
        secondaryService: 'AERONAUTICAL MOBILE (R)',
        usAllocations: 'AERONAUTICAL MOBILE (R) US283 US340',
        notes: '',
        fccPart: 'Aviation (87)',
        description: 'Aeronautical Mobile (Route)',
        band: 'HF'
    },
    {
        startFreq: 11.4,
        endFreq: 11.6,
        unit: 'MHz',
        primaryService: 'FIXED',
        secondaryService: 'FIXED',
        usAllocations: 'FIXED US340',
        notes: '',
        fccPart: 'Private Land Mobile (90)',
        description: 'Fixed services',
        band: 'HF'
    },
    {
        startFreq: 11.6,
        endFreq: 11.65,
        unit: 'MHz',
        primaryService: 'BROADCASTING 5.134 5.146',
        secondaryService: 'BROADCASTING 5.134',
        usAllocations: 'BROADCASTING 5.134 US136 US340',
        notes: '',
        fccPart: 'International Broadcast Stations (73F)',
        description: 'Broadcasting',
        band: 'HF'
    },
    {
        startFreq: 11.65,
        endFreq: 12.05,
        unit: 'MHz',
        primaryService: 'BROADCASTING 5.147',
        secondaryService: 'BROADCASTING 5.134',
        usAllocations: 'BROADCASTING 5.134 US136 US340',
        notes: '',
        fccPart: 'International Broadcast Stations (73F)',
        description: 'Broadcasting',
        band: 'HF'
    },
    {
        startFreq: 12.05,
        endFreq: 12.1,
        unit: 'MHz',
        primaryService: 'BROADCASTING 5.134 5.146',
        secondaryService: 'BROADCASTING 5.134',
        usAllocations: 'BROADCASTING 5.134 US136 US340',
        notes: '',
        fccPart: 'International Broadcast Stations (73F)',
        description: 'Broadcasting',
        band: 'HF'
    },
    {
        startFreq: 12.1,
        endFreq: 12.23,
        unit: 'MHz',
        primaryService: 'FIXED',
        secondaryService: 'FIXED',
        usAllocations: 'FIXED US340',
        notes: '',
        fccPart: 'Private Land Mobile (90)',
        description: 'Fixed services',
        band: 'HF'
    },
    {
        startFreq: 12.23,
        endFreq: 13.2,
        unit: 'MHz',
        primaryService: 'MARITIME MOBILE 5.109 5.110 5.132 5.145',
        secondaryService: 'MARITIME MOBILE 5.109 5.110 5.132 5.145',
        usAllocations: 'MARITIME MOBILE 5.109 5.110 5.132 5.145 US82 US296 US340',
        notes: '',
        fccPart: 'Maritime (80)',
        description: 'Maritime Mobile',
        band: 'HF'
    },
    {
        startFreq: 13.2,
        endFreq: 13.26,
        unit: 'MHz',
        primaryService: 'AERONAUTICAL MOBILE (OR)',
        secondaryService: 'AERONAUTICAL MOBILE (OR)',
        usAllocations: 'AERONAUTICAL MOBILE (OR) US340',
        notes: '',
        fccPart: '',
        description: 'Aeronautical Mobile (Off-Route)',
        band: 'HF'
    },
    {
        startFreq: 13.26,
        endFreq: 13.36,
        unit: 'MHz',
        primaryService: 'AERONAUTICAL MOBILE (R)',
        secondaryService: 'AERONAUTICAL MOBILE (R)',
        usAllocations: 'AERONAUTICAL MOBILE (R) US283 US340',
        notes: '',
        fccPart: 'Aviation (87)',
        description: 'Aeronautical Mobile (Route)',
        band: 'HF'
    },
    {
        startFreq: 13.36,
        endFreq: 13.41,
        unit: 'MHz',
        primaryService: 'FIXED; RADIO ASTRONOMY 5.149',
        secondaryService: 'FIXED; RADIO ASTRONOMY 5.149',
        usAllocations: 'RADIO ASTRONOMY US342 G115',
        notes: 'RADIO ASTRONOMY US342',
        fccPart: '',
        description: 'Fixed and Radio Astronomy services',
        band: 'HF'
    },
    {
        startFreq: 13.41,
        endFreq: 13.45,
        unit: 'MHz',
        primaryService: 'FIXED; Mobile except aeronautical mobile (R)',
        secondaryService: 'FIXED; Mobile except aeronautical mobile (R)',
        usAllocations: 'FIXED; Mobile except aeronautical mobile (R) US340',
        notes: 'FIXED US340',
        fccPart: 'Private Land Mobile (90)',
        description: 'Fixed and Mobile services',
        band: 'HF'
    },
    {
        startFreq: 13.45,
        endFreq: 13.55,
        unit: 'MHz',
        primaryService: 'FIXED; Mobile except aeronautical mobile (R); Radiolocation 5.132A 5.149A',
        secondaryService: 'FIXED; Mobile except aeronautical mobile (R); Radiolocation 5.132A',
        usAllocations: 'FIXED; Radiolocation 5.132A US340',
        notes: 'FIXED; Radiolocation 5.132A US340',
        fccPart: '',
        description: 'Fixed, Mobile, and Radiolocation services',
        band: 'HF'
    },
    {
        startFreq: 13.55,
        endFreq: 13.57,
        unit: 'MHz',
        primaryService: 'FIXED; Mobile except aeronautical mobile (R) 5.150',
        secondaryService: 'FIXED; Mobile except aeronautical mobile (R) 5.150',
        usAllocations: 'FIXED; Mobile except aeronautical mobile (R) 5.150 US340',
        notes: 'FIXED 5.150 US340',
        fccPart: 'ISM Equipment (18); Private Land Mobile (90)',
        description: 'Fixed and Mobile services, ISM Equipment',
        band: 'HF'
    },
    {
        startFreq: 13.57,
        endFreq: 13.6,
        unit: 'MHz',
        primaryService: 'BROADCASTING 5.134 5.151',
        secondaryService: 'BROADCASTING 5.134',
        usAllocations: 'BROADCASTING 5.134 US136 US340',
        notes: '',
        fccPart: 'International Broadcast Stations (73F)',
        description: 'Broadcasting',
        band: 'HF'
    },
    {
        startFreq: 13.6,
        endFreq: 13.8,
        unit: 'MHz',
        primaryService: 'BROADCASTING',
        secondaryService: 'BROADCASTING 5.134',
        usAllocations: 'BROADCASTING 5.134 US136 US340',
        notes: '',
        fccPart: 'International Broadcast Stations (73F)',
        description: 'Broadcasting',
        band: 'HF'
    },
    {
        startFreq: 13.8,
        endFreq: 13.87,
        unit: 'MHz',
        primaryService: 'BROADCASTING 5.134 5.151',
        secondaryService: 'BROADCASTING 5.134',
        usAllocations: 'BROADCASTING 5.134 US136 US340',
        notes: '',
        fccPart: 'International Broadcast Stations (73F)',
        description: 'Broadcasting',
        band: 'HF'
    },
    {
        startFreq: 13.87,
        endFreq: 14,
        unit: 'MHz',
        primaryService: 'FIXED; Mobile except aeronautical mobile (R)',
        secondaryService: 'FIXED; Mobile except aeronautical mobile (R)',
        usAllocations: 'FIXED; Mobile except aeronautical mobile (R) US340',
        notes: 'FIXED US340',
        fccPart: 'Private Land Mobile (90)',
        description: 'Fixed and Mobile services',
        band: 'HF'
    },
    {
        startFreq: 14,
        endFreq: 14.25,
        unit: 'MHz',
        primaryService: 'AMATEUR; AMATEUR-SATELLITE',
        secondaryService: 'AMATEUR; AMATEUR-SATELLITE',
        usAllocations: 'AMATEUR; AMATEUR-SATELLITE US340',
        notes: '',
        fccPart: 'Amateur Radio (97)',
        description: 'Amateur and Amateur-Satellite Radio',
        band: 'HF'
    },
    {
        startFreq: 14.25,
        endFreq: 14.35,
        unit: 'MHz',
        primaryService: 'AMATEUR 5.152',
        secondaryService: 'AMATEUR; AMATEUR-SATELLITE',
        usAllocations: 'AMATEUR US340',
        notes: 'AMATEUR US340',
        fccPart: 'Amateur Radio (97)',
        description: 'Amateur and Amateur-Satellite Radio',
        band: 'HF'
    },
    {
        startFreq: 14.35,
        endFreq: 14.99,
        unit: 'MHz',
        primaryService: 'FIXED; Mobile except aeronautical mobile (R)',
        secondaryService: 'FIXED; Mobile except aeronautical mobile (R)',
        usAllocations: 'FIXED; Mobile except aeronautical mobile (R) US340',
        notes: 'FIXED US340',
        fccPart: 'Private Land Mobile (90)',
        description: 'Fixed and Mobile services',
        band: 'HF'
    },
    {
        startFreq: 14.99,
        endFreq: 15.005,
        unit: 'MHz',
        primaryService: 'STANDARD FREQUENCY AND TIME SIGNAL (15 MHz) 5.111',
        secondaryService: 'STANDARD FREQUENCY AND TIME SIGNAL (15 MHz)',
        usAllocations: 'STANDARD FREQUENCY AND TIME SIGNAL (15 MHz) 5.111 US1 US340',
        notes: '',
        fccPart: '',
        description: 'Standard Frequency and Time Signal',
        band: 'HF'
    },
    {
        startFreq: 15.005,
        endFreq: 15.01,
        unit: 'MHz',
        primaryService: 'STANDARD FREQUENCY AND TIME SIGNAL; Space research',
        secondaryService: 'STANDARD FREQUENCY AND TIME SIGNAL (15 MHz)',
        usAllocations: 'STANDARD FREQUENCY AND TIME SIGNAL (15 MHz) 5.111 US1 US340',
        notes: '',
        fccPart: '',
        description: 'Standard Frequency and Time Signal, Space research',
        band: 'HF'
    },
    {
        startFreq: 15.01,
        endFreq: 15.1,
        unit: 'MHz',
        primaryService: 'AERONAUTICAL MOBILE (OR)',
        secondaryService: 'AERONAUTICAL MOBILE (OR)',
        usAllocations: 'AERONAUTICAL MOBILE (OR) US340',
        notes: '',
        fccPart: '',
        description: 'Aeronautical Mobile (Off-Route)',
        band: 'HF'
    },
    {
        startFreq: 15.1,
        endFreq: 15.6,
        unit: 'MHz',
        primaryService: 'BROADCASTING',
        secondaryService: 'BROADCASTING 5.134',
        usAllocations: 'BROADCASTING 5.134 US136 US340',
        notes: '',
        fccPart: 'International Broadcast Stations (73F)',
        description: 'Broadcasting',
        band: 'HF'
    },
    {
        startFreq: 15.6,
        endFreq: 15.8,
        unit: 'MHz',
        primaryService: 'BROADCASTING 5.134 5.146',
        secondaryService: 'BROADCASTING 5.134',
        usAllocations: 'BROADCASTING 5.134 US136 US340',
        notes: '',
        fccPart: 'International Broadcast Stations (73F)',
        description: 'Broadcasting',
        band: 'HF'
    },
    {
        startFreq: 15.8,
        endFreq: 16.1,
        unit: 'MHz',
        primaryService: 'FIXED 5.153',
        secondaryService: 'FIXED 5.153',
        usAllocations: 'FIXED US340',
        notes: '',
        fccPart: 'Private Land Mobile (90)',
        description: 'Fixed services',
        band: 'HF'
    },
    {
        startFreq: 16.1,
        endFreq: 16.2,
        unit: 'MHz',
        primaryService: 'FIXED; Radiolocation 5.145A 5.145B',
        secondaryService: 'FIXED; RADIOLOCATION 5.145A',
        usAllocations: 'FIXED; RADIOLOCATION 5.145A US340',
        notes: '',
        fccPart: '',
        description: 'Fixed and Radiolocation services',
        band: 'HF'
    },
    {
        startFreq: 16.2,
        endFreq: 16.36,
        unit: 'MHz',
        primaryService: 'FIXED',
        secondaryService: 'FIXED',
        usAllocations: 'FIXED US340',
        notes: '',
        fccPart: '',
        description: 'Fixed services',
        band: 'HF'
    },
    {
        startFreq: 16.36,
        endFreq: 17.41,
        unit: 'MHz',
        primaryService: 'MARITIME MOBILE 5.109 5.110 5.132 5.145',
        secondaryService: 'MARITIME MOBILE 5.109 5.110 5.132 5.145',
        usAllocations: 'MARITIME MOBILE 5.109 5.110 5.132 5.145 US82 US296 US340',
        notes: '',
        fccPart: 'Maritime (80)',
        description: 'Maritime Mobile',
        band: 'HF'
    },
    {
        startFreq: 17.41,
        endFreq: 17.48,
        unit: 'MHz',
        primaryService: 'FIXED',
        secondaryService: 'FIXED',
        usAllocations: 'FIXED US340',
        notes: '',
        fccPart: 'Private Land Mobile (90)',
        description: 'Fixed services',
        band: 'HF'
    },
    {
        startFreq: 17.48,
        endFreq: 17.55,
        unit: 'MHz',
        primaryService: 'BROADCASTING 5.134 5.146',
        secondaryService: 'BROADCASTING 5.134',
        usAllocations: 'BROADCASTING 5.134 US136 US340',
        notes: '',
        fccPart: 'International Broadcast Stations (73F)',
        description: 'Broadcasting',
        band: 'HF'
    },
    {
        startFreq: 17.55,
        endFreq: 17.9,
        unit: 'MHz',
        primaryService: 'BROADCASTING',
        secondaryService: 'BROADCASTING 5.134',
        usAllocations: 'BROADCASTING 5.134 US136 US340',
        notes: '',
        fccPart: 'International Broadcast Stations (73F)',
        description: 'Broadcasting',
        band: 'HF'
    },
    {
        startFreq: 17.9,
        endFreq: 17.97,
        unit: 'MHz',
        primaryService: 'AERONAUTICAL MOBILE (R)',
        secondaryService: 'AERONAUTICAL MOBILE (R)',
        usAllocations: 'AERONAUTICAL MOBILE (R) US283 US340',
        notes: '',
        fccPart: 'Aviation (87)',
        description: 'Aeronautical Mobile (Route)',
        band: 'HF'
    },
    {
        startFreq: 17.97,
        endFreq: 18.03,
        unit: 'MHz',
        primaryService: 'AERONAUTICAL MOBILE (OR)',
        secondaryService: 'AERONAUTICAL MOBILE (OR)',
        usAllocations: 'AERONAUTICAL MOBILE (OR) US340',
        notes: '',
        fccPart: '',
        description: 'Aeronautical Mobile (Off-Route)',
        band: 'HF'
    },
    {
        startFreq: 18.03,
        endFreq: 18.052,
        unit: 'MHz',
        primaryService: 'FIXED',
        secondaryService: 'FIXED',
        usAllocations: 'FIXED US340',
        notes: '',
        fccPart: 'Maritime (80); Private Land Mobile (90)',
        description: 'Fixed services',
        band: 'HF'
    },
    {
        startFreq: 18.052,
        endFreq: 18.068,
        unit: 'MHz',
        primaryService: 'FIXED; Space research',
        secondaryService: 'FIXED; Space research',
        usAllocations: 'FIXED US340',
        notes: '',
        fccPart: 'Maritime (80); Private Land Mobile (90)',
        description: 'Fixed and Space research services',
        band: 'HF'
    },
    {
        startFreq: 18.068,
        endFreq: 18.168,
        unit: 'MHz',
        primaryService: 'AMATEUR; AMATEUR-SATELLITE 5.154',
        secondaryService: 'AMATEUR; AMATEUR-SATELLITE 5.154',
        usAllocations: 'US340',
        notes: 'AMATEUR; AMATEUR-SATELLITE US340',
        fccPart: 'Amateur Radio (97)',
        description: 'Amateur and Amateur-Satellite Radio',
        band: 'HF'
    },
    {
        startFreq: 18.168,
        endFreq: 18.78,
        unit: 'MHz',
        primaryService: 'FIXED; Mobile except aeronautical mobile',
        secondaryService: 'FIXED; Mobile except aeronautical mobile',
        usAllocations: 'FIXED; Mobile US340',
        notes: '',
        fccPart: 'Maritime (80); Private Land Mobile (90)',
        description: 'Fixed and Mobile services',
        band: 'HF'
    },
    {
        startFreq: 18.78,
        endFreq: 18.9,
        unit: 'MHz',
        primaryService: 'MARITIME MOBILE',
        secondaryService: 'MARITIME MOBILE',
        usAllocations: 'MARITIME MOBILE US82 US296 US340',
        notes: '',
        fccPart: 'Maritime (80)',
        description: 'Maritime Mobile',
        band: 'HF'
    },
    {
        startFreq: 18.9,
        endFreq: 19.02,
        unit: 'MHz',
        primaryService: 'BROADCASTING 5.134 5.146',
        secondaryService: 'BROADCASTING 5.134',
        usAllocations: 'BROADCASTING 5.134 US136 US340',
        notes: '',
        fccPart: 'International Broadcast Stations (73F)',
        description: 'Broadcasting',
        band: 'HF'
    },
    {
        startFreq: 19.02,
        endFreq: 19.68,
        unit: 'MHz',
        primaryService: 'FIXED',
        secondaryService: 'FIXED',
        usAllocations: 'FIXED US340',
        notes: '',
        fccPart: 'Private Land Mobile (90)',
        description: 'Fixed services',
        band: 'HF'
    },
    {
        startFreq: 19.68,
        endFreq: 19.8,
        unit: 'MHz',
        primaryService: 'MARITIME MOBILE 5.132',
        secondaryService: 'MARITIME MOBILE 5.132',
        usAllocations: 'MARITIME MOBILE 5.132 US340',
        notes: '',
        fccPart: 'Maritime (80)',
        description: 'Maritime Mobile',
        band: 'HF'
    },
    {
        startFreq: 19.8,
        endFreq: 19.99,
        unit: 'MHz',
        primaryService: 'FIXED',
        secondaryService: 'FIXED',
        usAllocations: 'FIXED US340',
        notes: '',
        fccPart: 'Private Land Mobile (90)',
        description: 'Fixed services',
        band: 'HF'
    },
    {
        startFreq: 19.99,
        endFreq: 19.995,
        unit: 'MHz',
        primaryService: 'STANDARD FREQUENCY AND TIME SIGNAL; Space research 5.111',
        secondaryService: 'STANDARD FREQUENCY AND TIME SIGNAL (20 MHz)',
        usAllocations: 'STANDARD FREQUENCY AND TIME SIGNAL (20 MHz) 5.111 US1 US340',
        notes: '',
        fccPart: '',
        description: 'Standard Frequency and Time Signal, Space research',
        band: 'HF'
    },
    {
        startFreq: 19.995,
        endFreq: 20.01,
        unit: 'MHz',
        primaryService: 'STANDARD FREQUENCY AND TIME SIGNAL (20 MHz) 5.111',
        secondaryService: 'STANDARD FREQUENCY AND TIME SIGNAL (20 MHz)',
        usAllocations: 'STANDARD FREQUENCY AND TIME SIGNAL (20 MHz) 5.111 US1 US340',
        notes: '',
        fccPart: '',
        description: 'Standard Frequency and Time Signal',
        band: 'HF'
    },
    {
        startFreq: 20.01,
        endFreq: 21,
        unit: 'MHz',
        primaryService: 'FIXED; Mobile',
        secondaryService: 'FIXED; Mobile',
        usAllocations: 'FIXED; Mobile US340',
        notes: 'FIXED US340',
        fccPart: 'Private Land Mobile (90)',
        description: 'Fixed and Mobile services',
        band: 'HF'
    },
    {
        startFreq: 21,
        endFreq: 21.45,
        unit: 'MHz',
        primaryService: 'AMATEUR; AMATEUR-SATELLITE',
        secondaryService: 'AMATEUR; AMATEUR-SATELLITE',
        usAllocations: 'US340',
        notes: 'AMATEUR; AMATEUR-SATELLITE US340',
        fccPart: 'Amateur Radio (97)',
        description: 'Amateur and Amateur-Satellite Radio',
        band: 'HF'
    },
    {
        startFreq: 21.45,
        endFreq: 21.85,
        unit: 'MHz',
        primaryService: 'BROADCASTING',
        secondaryService: 'BROADCASTING',
        usAllocations: 'BROADCASTING US340',
        notes: '',
        fccPart: 'International Broadcast Stations (73F)',
        description: 'Broadcasting',
        band: 'HF'
    },
    {
        startFreq: 21.85,
        endFreq: 21.87,
        unit: 'MHz',
        primaryService: 'FIXED 5.155A 5.155',
        secondaryService: 'FIXED',
        usAllocations: 'FIXED US340',
        notes: '',
        fccPart: 'Aviation (87); Private Land Mobile (90)',
        description: 'Fixed services',
        band: 'HF'
    },
    {
        startFreq: 21.87,
        endFreq: 21.924,
        unit: 'MHz',
        primaryService: 'FIXED 5.155B',
        secondaryService: 'FIXED',
        usAllocations: 'FIXED US340',
        notes: '',
        fccPart: 'Aviation (87); Private Land Mobile (90)',
        description: 'Fixed services',
        band: 'HF'
    },
    {
        startFreq: 21.924,
        endFreq: 22,
        unit: 'MHz',
        primaryService: 'AERONAUTICAL MOBILE (R)',
        secondaryService: 'AERONAUTICAL MOBILE (R)',
        usAllocations: 'AERONAUTICAL MOBILE (R) US340',
        notes: '',
        fccPart: 'Aviation (87)',
        description: 'Aeronautical Mobile (Route)',
        band: 'HF'
    },
    {
        startFreq: 22,
        endFreq: 22.855,
        unit: 'MHz',
        primaryService: 'MARITIME MOBILE 5.132 5.156',
        secondaryService: 'MARITIME MOBILE 5.132 5.156',
        usAllocations: 'MARITIME MOBILE 5.132 US82 US296 US340',
        notes: '',
        fccPart: 'Maritime (80)',
        description: 'Maritime Mobile',
        band: 'HF'
    },
    {
        startFreq: 22.855,
        endFreq: 23,
        unit: 'MHz',
        primaryService: 'FIXED 5.156',
        secondaryService: 'FIXED 5.156',
        usAllocations: 'FIXED US340',
        notes: '',
        fccPart: 'Private Land Mobile (90)',
        description: 'Fixed services',
        band: 'HF'
    },
    {
        startFreq: 23,
        endFreq: 23.2,
        unit: 'MHz',
        primaryService: 'FIXED; Mobile except aeronautical mobile (R) 5.156',
        secondaryService: 'FIXED; Mobile except aeronautical mobile (R) 5.156',
        usAllocations: 'FIXED; Mobile except aeronautical mobile (R) US340',
        notes: 'FIXED US340',
        fccPart: '',
        description: 'Fixed and Mobile services',
        band: 'HF'
    },
    {
        startFreq: 23.2,
        endFreq: 23.35,
        unit: 'MHz',
        primaryService: 'FIXED 5.156A; AERONAUTICAL MOBILE (OR)',
        secondaryService: 'FIXED 5.156A; AERONAUTICAL MOBILE (OR)',
        usAllocations: 'AERONAUTICAL MOBILE (OR) US340',
        notes: '',
        fccPart: '',
        description: 'Fixed and Aeronautical Mobile (Off-Route) services',
        band: 'HF'
    },
    {
        startFreq: 23.35,
        endFreq: 24,
        unit: 'MHz',
        primaryService: 'FIXED; MOBILE except aeronautical mobile 5.157',
        secondaryService: 'FIXED; MOBILE except aeronautical mobile 5.157',
        usAllocations: 'FIXED; MOBILE except aeronautical mobile US340',
        notes: 'FIXED US340',
        fccPart: 'Private Land Mobile (90)',
        description: 'Fixed and Mobile services',
        band: 'HF'
    },
    {
        startFreq: 24,
        endFreq: 24.45,
        unit: 'MHz',
        primaryService: 'FIXED; LAND MOBILE',
        secondaryService: 'FIXED; MOBILE except aeronautical mobile',
        usAllocations: 'FIXED; MOBILE except aeronautical mobile US340',
        notes: 'FIXED US340',
        fccPart: 'Private Land Mobile (90)',
        description: 'Fixed and Land Mobile services',
        band: 'HF'
    },
    {
        startFreq: 24.45,
        endFreq: 24.6,
        unit: 'MHz',
        primaryService: 'FIXED; LAND MOBILE; Radiolocation 5.132A 5.158',
        secondaryService: 'FIXED; LAND MOBILE; RADIOLOCATION 5.132A',
        usAllocations: 'FIXED; MOBILE except aeronautical mobile; RADIOLOCATION 5.132A US340',
        notes: 'FIXED; RADIOLOCATION 5.132A US340',
        fccPart: '',
        description: 'Fixed, Land Mobile, and Radiolocation services',
        band: 'HF'
    },
    {
        startFreq: 24.6,
        endFreq: 24.65,
        unit: 'MHz',
        primaryService: 'FIXED; LAND MOBILE',
        secondaryService: 'FIXED; LAND MOBILE; RADIOLOCATION 5.132A',
        usAllocations: 'FIXED; MOBILE except aeronautical mobile; RADIOLOCATION 5.132A US340',
        notes: 'FIXED; RADIOLOCATION 5.132A US340',
        fccPart: '',
        description: 'Fixed, Land Mobile, and Radiolocation services',
        band: 'HF'
    },
    {
        startFreq: 24.65,
        endFreq: 24.89,
        unit: 'MHz',
        primaryService: 'FIXED; LAND MOBILE',
        secondaryService: 'FIXED; LAND MOBILE',
        usAllocations: 'FIXED; MOBILE except aeronautical mobile US340',
        notes: 'FIXED US340',
        fccPart: '',
        description: 'Fixed and Land Mobile services',
        band: 'HF'
    },
    {
        startFreq: 24.89,
        endFreq: 24.99,
        unit: 'MHz',
        primaryService: 'AMATEUR; AMATEUR-SATELLITE',
        secondaryService: 'AMATEUR; AMATEUR-SATELLITE',
        usAllocations: 'US340',
        notes: 'AMATEUR; AMATEUR-SATELLITE US340',
        fccPart: 'Amateur Radio (97)',
        description: 'Amateur and Amateur-Satellite Radio',
        band: 'HF'
    },
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
        band: 'HF'
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
        band: 'HF'
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
        band: 'HF'
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
        description: 'Maritime Mobile',
        band: 'HF'
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
        band: 'HF'
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
        band: 'HF'
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
        band: 'HF'
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
        description: 'Broadcasting',
        band: 'HF'
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
        description: 'Maritime Mobile',
        band: 'HF'
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
        band: 'HF'
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
        band: 'HF'
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
        band: 'HF'
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
        band: 'HF'
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
        band: 'HF'
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
        band: 'HF'
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
        band: 'HF'
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
        band: 'HF'
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
        band: 'HF'
    },
    {
        startFreq: 27.54,
        endFreq: 28,
        unit: 'MHz',
        primaryService: 'METEOROLOGICAL AIDS; FIXED; MOBILE',
        secondaryService: 'FIXED; MOBILE',
        usAllocations: 'FIXED; MOBILE US298 US340',
        notes: '',
        fccPart: '',
        description: 'Meteorological Aids, Fixed and Mobile services',
        band: 'HF'
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
        description: 'Amateur and Amateur-Satellite Radio',
        band: 'HF'
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
        band: 'HF'
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
        band: 'HF'
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
        band: 'HF'
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
        band: 'HF'
    }
];

// Export for use in main application
if (typeof module !== 'undefined' && module.exports) {
    module.exports = peakIdentificationBand4;
} else if (typeof window !== 'undefined') {
    window.peakIdentificationBand4 = peakIdentificationBand4;
}