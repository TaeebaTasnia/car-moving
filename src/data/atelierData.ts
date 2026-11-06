import { VehicleBuild, TransitionPhase, CraftImage } from '../types/atelier';

export const VEHICLE_BUILDS: VehicleBuild[] = [
  {
    id: 'g-wagon',
    name: 'VANTARE G-APEX',
    subtitle: 'Tactical Widebody Monolith',
    chassis: 'Mercedes-AMG G63 Platform',
    engine: '4.0L Twin-Turbo V8 Atelier-Spec',
    power: '820 HP / 1,050 Nm',
    acceleration: '0-100 km/h in 3.4s',
    topSpeed: '280 km/h (electronically limited)',
    position: 'left',
    spotlightColor: 'rgba(255, 255, 255, 0.15)',
    accentColor: '#ffffff',
    description: 'Forged carbon-fiber widened track (+100mm), darkened titanium exhaust routing, and bespoke matrix round headlights with matte satin stealth paint finish.',
    features: [
      'Exposed 2x2 Twill Matte Carbon Aero Package',
      'Atelier 24" Forged Monoblock Directional Wheels',
      'Dual-side active valved titanium sports exhaust',
      'Full interior re-trim in Anthracite perforated Alcantara'
    ]
  },
  {
    id: 'gt3rs',
    name: 'VANTARE RS-CORSA',
    subtitle: 'Street-Legal Aerodynamic Prototype',
    chassis: 'Porsche 992 GT3 RS Platform',
    engine: '4.0L Naturally Aspirated Boxer-6',
    power: '565 HP @ 9,000 RPM',
    acceleration: '0-100 km/h in 2.9s',
    topSpeed: '305 km/h',
    position: 'center',
    spotlightColor: 'rgba(239, 68, 68, 0.25)',
    accentColor: '#ef4444',
    description: 'The flagship centerpiece: Finished in Guards Red with exposed carbon aero nostril ducts, top-mounted swan-neck DRS wing, center-lock magnesium wheels, and scarlet roll cage.',
    features: [
      'Active Drag Reduction System (DRS) wing profile',
      'Full FIA-spec gloss red chromoly roll-cage cage',
      'Carbon bucket racing shells with 6-point Schroth harnesses',
      'Inconel race manifold with ceramic heat barrier coating'
    ]
  },
  {
    id: 'defender',
    name: 'VANTARE EXPEDITION',
    subtitle: 'Overland Bespoke Armored Concept',
    chassis: 'Land Rover Defender 110 V8',
    engine: '5.0L Supercharged V8',
    power: '650 HP / 850 Nm',
    acceleration: '0-100 km/h in 4.5s',
    topSpeed: '240 km/h',
    position: 'right',
    spotlightColor: 'rgba(200, 200, 200, 0.15)',
    accentColor: '#a3a3a3',
    description: 'A monolithic tactical SUV with squared dual-halo signature LEDs, satin obsidian coachwork, reinforced underbody skid plates, and integrated atelier winch assembly.',
    features: [
      'Custom widened fender flares with exposed fasteners',
      'Roofline aerodynamic LED matrix spotlight bar',
      'Saddle tan saddleback leather with diamond stitch',
      'Adaptive air suspension with +75mm dynamic clearance'
    ]
  }
];

export const TRANSITION_PHASES: TransitionPhase[] = [
  {
    id: 'phase-1',
    title: 'Phase 1: Trio Formation & Volumetric Spotlight',
    timeRange: '0.00s — 2.10s',
    timeStart: 0,
    timeEnd: 2.1,
    badge: 'STAGE 1',
    headline: 'For Those Who Refuse Ordinary',
    subtext: 'A LUXURY AUTOMOTIVE ATELIER FOR BESPOKE STYLING, PERFORMANCE AND CRAFTSMANSHIP.',
    frameImage: '/hero-poster.jpg',
    cameraMovement: 'Static wide-angle isometric framing (28mm equivalent), zero shake, slow atmospheric haze drift.',
    easingCurve: 'cubic-bezier(0.16, 1, 0.3, 1) [Smooth Expo-Out deceleration]',
    lightingSetup: 'Single overhead 5600K key softbox slicing down on wet-ground asphalt. Specular red reflection from the RS-Corsa centerpiece.',
    interactionModel: 'Hovering over vehicles displays crosshair target reticle, dynamic ambient glow, and interactive vehicle specs trigger.',
    technicalDetails: [
      'Floor wet reflection masked with CSS linear-gradient and overlay blend-mode',
      'Typography rendered in high-contrast editorial serif (Playfair / Cormorant Garamond) with subtle letter-tracking',
      'Nav items spaced with [0.25em] tracking and hairline underline hover states',
      'Center chevron monogram for Vantare brand identity'
    ]
  },
  {
    id: 'phase-2',
    title: 'Phase 2: Cockpit Macro Zoom & DOF Shift',
    timeRange: '2.10s — 3.80s',
    timeStart: 2.1,
    timeEnd: 3.8,
    badge: 'STAGE 2',
    headline: 'Into The Cockpit',
    subtext: 'AN UNCOMPROMISING DRIVER ENCLOSURE BUILT WITH RACE-GRADE MATERIALS.',
    frameImage: '/interior.jpg',
    cameraMovement: 'Rapid forward tracking shot along the center optical axis (scale 1.0 → 3.8, z-translation +450px) pulling directly into the vehicle interior.',
    easingCurve: 'cubic-bezier(0.76, 0, 0.24, 1) [Quintic camera rush into interior]',
    lightingSetup: 'Directional rear cockpit lighting catching carbon-weave bucket contours and vivid red chromoly roll-cage tubes.',
    interactionModel: 'Mouse scrubbing simulates camera tilt and parallax displacement of the Alcantara steering wheel and bucket seats.',
    technicalDetails: [
      'Focal plane shifts from infinity (studio cars) to macro foreground (headrests at 0.8m distance)',
      'Subtle motion blur along the windshield periphery to convey high-speed transition impact',
      'Micro-stitch red thread highlighted across bolster seams with specular sheen',
      'Volumetric cabin shadows deepening in footwell and floor console'
    ]
  },
  {
    id: 'phase-3',
    title: 'Phase 3: Interactive Craftsmanship Fan & Magnetic Ribbon',
    timeRange: '3.80s — 5.60s',
    timeStart: 3.8,
    timeEnd: 5.6,
    badge: 'STAGE 3',
    headline: 'We Don’t Modify Vehicles. We Build Them For You.',
    subtext: 'HAND-CRAFTED COMPONENT STACK EXHIBITING CARBON, BRAKES, METAL FINISHING AND COATING.',
    frameImage: '/craftsmanship.jpg',
    cameraMovement: 'Pure void black background (#050505) with interactive floating cards fanning out dynamically following the cursor.',
    easingCurve: 'spring({ stiffness: 260, damping: 20, mass: 0.8 }) for physical pointer inertia',
    lightingSetup: 'Dark-field macro studio lighting with high rim highlights on carbon-fiber weave and ceramic brake rotors.',
    interactionModel: 'Moving pointer causes card stack to fan out along an elliptic arc with staggered delay and depth-sorting (z-index).',
    technicalDetails: [
      'Each card transforms with: translateX(i * deltaX) translateY(i * deltaY) rotate(i * 3.5deg)',
      'Hovering individual craft cards scales them by 1.15x and lifts them to top z-index with drop-shadow glow',
      'Headline centered with high-fashion staggered letter-reveal',
      'Clicking any card reveals full technical atelier fabrication notes'
    ]
  },
  {
    id: 'phase-4',
    title: 'Phase 4: Ultra-Macro Leather Upholstery & Brand Mark',
    timeRange: '5.60s — 7.00s',
    timeStart: 5.6,
    timeEnd: 7.0,
    badge: 'STAGE 4',
    headline: 'Our Approach To Every Build',
    subtext: 'BESPOKE · PERFORMANCE · CRAFT — MASTERY DOWN TO THE INDIVIDUAL THREAD.',
    frameImage: '/leather-stitch.jpg',
    cameraMovement: 'Extreme macro dolly shot tracking the artisan’s hand drawing curved saddler’s needle through perforations.',
    easingCurve: 'cubic-bezier(0.25, 1, 0.5, 1) [Gentle organic drift]',
    lightingSetup: 'Low-angle raking light highlighting the pebbled texture of semi-aniline Nappa leather and red bonded nylon tensile threads.',
    interactionModel: 'Circular focus loupe reveals 200% magnification and high-res stitching detail.',
    technicalDetails: [
      'High-contrast macro depth of field (shallow focal plane with blurred background thumb and leather curvature)',
      'Atelier footer with copyright line: © 2026 VANTARE ATELIER and craft pillars',
      'Timeline scrubber progress indicator syncing current time percentage with active navigation status',
      'Seamless loop transition back to Phase 1'
    ]
  }
];

export const CRAFT_IMAGES: CraftImage[] = [
  {
    id: 'craft-1',
    title: 'Hand-Laminated Pre-Preg Carbon Weave',
    category: 'AERODYNAMICS',
    image: '/craft-1.jpg',
    description: 'Dry autoclave-cured 2x2 twill carbon fiber with custom resin tint to achieve optimal structural rigidity and sub-millimeter aero tolerances.',
    rotation: -8,
    offsetX: -120,
    offsetY: -35
  },
  {
    id: 'craft-2',
    title: 'Ceramic-Composite Brakes & Calipers',
    category: 'CHASSIS DYNAMICS',
    image: '/craft-2.jpg',
    description: 'Bespoke 420mm drilled carbon-ceramic friction rings clamped by monoblock 6-piston calipers in signature Vantare Racing Yellow.',
    rotation: -3,
    offsetX: -40,
    offsetY: -15
  },
  {
    id: 'craft-3',
    title: 'Artisan Wheel Arch Metal Surfacing',
    category: 'COACHWORK',
    image: '/craft-3.jpg',
    description: 'Master panel beaters hand-wheeling aerospace-grade aluminum fender flares to house widened track offsets with zero panel gaps.',
    rotation: 4,
    offsetX: 40,
    offsetY: 10
  },
  {
    id: 'craft-4',
    title: 'Infrared Thermal Paint Curing Chamber',
    category: 'FINISH & COATING',
    image: '/craft-4.jpg',
    description: 'Multi-stage wet-sanded paint application cured under controlled infrared banks for a mirror-deep, orange-peel-free liquid reflection.',
    rotation: 9,
    offsetX: 120,
    offsetY: 35
  }
];
