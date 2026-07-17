import React, { useState, useEffect } from "react";
import { 
  Shield, 
  ChevronRight, 
  Copy, 
  Check, 
  Sparkles, 
  BookOpen, 
  AlertTriangle, 
  RotateCcw, 
  Volume2, 
  Award, 
  HelpCircle, 
  Download, 
  Compass, 
  ExternalLink,
  Car,
  FileText,
  Users,
  Eye,
  Sliders,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

// --- TYPES & INTERFACES ---
interface CampaignData {
  slogans: string[];
  caption: string;
  graphicAdvice: string;
}

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

// --- CONSTANTS & PRESETS ---
const TOPICS = [
  { 
    id: "lane_discipline", 
    label: "Lane Discipline (Keep Left)", 
    icon: Compass, 
    badge: "Most Critical",
    desc: "Keep slow vehicles on the left, overtaking lane clear in the middle/right." 
  },
  { 
    id: "speed_limits", 
    label: "Speed Limits (Strict Zones)", 
    icon: Sliders, 
    badge: "Variable Speed",
    desc: "Adjust speed: 30 km/h residential, 50 km/h Ring Road, 80 km/h open highway." 
  },
  { 
    id: "helmet_seatbelt", 
    label: "Helmet & Seatbelt Safety", 
    icon: Shield, 
    badge: "Life Savers",
    desc: "Strap on high-quality helmets for two-wheelers and buckle seatbelts in cars." 
  },
  { 
    id: "license_bluebook", 
    label: "License & Blue Book", 
    icon: FileText, 
    badge: "Legally Required",
    desc: "Always carry your valid driver's license and the vehicle Blue Book." 
  },
  { 
    id: "general_awareness", 
    label: "Anti-MaPaSe & Zebra Crossings", 
    icon: Users, 
    badge: "Social Shield",
    desc: "Absolutely zero alcohol/drugs (MaPaSe), give way to pedestrians at zebra crossings." 
  }
];

const PRESET_CAMPAIGNS: Record<string, CampaignData> = {
  lane_discipline: {
    slogans: [
      "बायाँ च्यापेर चलाऔं, सुरक्षित यात्रा गरौं! (Keep Left, Drive Safe!)",
      "The Overtaking Lane is a Passing Lane, Not a Parking Lane!",
      "सडक अनुशासन, हाम्रो अभियान: Keep Left for a Smooth Ride!"
    ],
    caption: `🛣️ Lane Discipline: The Foundation of Safe Driving in Nepal! 🇳🇵

Did you know? In Nepal, we drive on the LEFT side of the road. That means the right-most or middle lane is reserved EXCLUSIVELY for overtaking! 

🚨 The Hazard: Slow vehicles (motorcycles, scooters, heavily loaded local trucks, public buses) cruising in the overtaking lane force faster vehicles to pass on the left. This creates a dangerous blind spot and is a leading cause of highway crashes in Nepal.

Let's make Nepalese roads safer together:
✅ Keep to the left-hand lane by default.
✅ Use the right lane ONLY for passing/overtaking.
✅ Signal early before changing lanes.
✅ Return to the left lane as soon as it is safe to do so.

Spread the word! Safe lanes save lives. ❤️

#KeepLeftNepal #LaneDiscipline #OvertakeRight #NepalPoliceTraffic #DriveOnLeft #NepalRoadSafety #KathmanduRingRoad #HighwayRules`,
    graphicAdvice: "Display a clean two-lane highway where a slow loaded truck and a scooter rider are on the left lane. The middle/right lane is clear. A red car is safely overtaking from the right side. Include bold road signs showing 'KEEP LEFT' and 'PASS RIGHT'."
  },
  speed_limits: {
    slogans: [
      "गति सीमित राखौं, दुर्घटनाबाट बचौं! (Limit Speed, Save Lives)",
      "Nepal Has No Single Speed Limit: Always Read the Signs!",
      "Ring Road is 50, Residential is 30. Drive Responsibly!"
    ],
    caption: `⏱️ Speed Limits in Nepal: Know Your Zones! 🇳🇵

There is NO single speed limit across Nepal! Road conditions, mountain curves, and pedestrian density dictate distinct speed caps. Traffic police enforce speed traps strictly—always check roadside signs!

🚙 Standard Speed Guidelines:
• Residential & Busy School Zones: 30–40 km/h
• Major City Roads (e.g., parts of Kathmandu Ring Road): 50 km/h
• Open Trunk Highways (e.g., Terai or East-West Highway): 60–80 km/h

🏔️ Mountain Warning: On Nepal's steep, twisting hill highways, the posted speed limit may drop down to 20 km/h on blind curves. High speed on curves leads to tragic side-slips and drops.

Drive at a speed that allows you to stop safely in any emergency!

#SpeedLimitNepal #SlowDownNepal #NepalRoadSafety #DriveResponsibly #RingRoadKathmandu #HillRoadSafety #NepalTrafficPolice #RadarGunCheck`,
    graphicAdvice: "Show a split highway representing three zones: residential (30 km/h with school warning), city street (50 km/h with Ring Road backdrop), and wide highway (80 km/h). Overlay a digital speedometer that glows amber to warn against speeding."
  },
  helmet_seatbelt: {
    slogans: [
      "हेल्मेट र सिट बेल्ट अनिवार्य लगाऔं! (Always Wear Helmet & Seatbelt!)",
      "Click the Seatbelt, Strap the Helmet: Your Primary Shields!",
      "सुरक्षित यात्राको सुरुवात: Helmet & Seatbelt on from the Start!"
    ],
    caption: `🛡️ Buckle Up & Strap On: Your Primary Life Insurance! 🇳🇵

Two-wheelers represent over 70% of registered vehicles in Nepal, making riders the most vulnerable on our streets. Meanwhile, seatbelts are the single most effective safety device in cars.

Make safety a non-negotiable habit:
🏍️ Helmet Protocol:
• Wear a certified helmet with a high-impact shell.
• ALWAYS buckle the chin strap. An unbuckled helmet flies off before impact!
• Both the rider and pillion passenger are encouraged to wear protective gear.

🚗 Seatbelt Protocol:
• Click your seatbelt before starting the engine.
• Front-seat passengers must buckle up as well (legally enforced in Nepal).

Let's click and strap on before we start! 

#WearAHelmet #SeatbeltSavesLives #SafetyFirstNepal #TwoWheelerSafety #DriveSafeNepal #StrapYourHelmet #ClickItNepal`,
    graphicAdvice: "Show two main visual highlights: a motorcycle rider wearing a professional helmet with the chin-strap securely clipped, and a driver in a passenger car buckled with a highly visible three-point seatbelt."
  },
  license_bluebook: {
    slogans: [
      "लाइसेन्स र ब्लु बुक साथमा राखौं, जरिवानाबाट बचौं! (Carry Documents, Avoid Fines)",
      "Before the Ignition: Check Your License & Blue Book!",
      "No Documents, No Insurance: Keep License & Blue Book Updated!"
    ],
    caption: `📄 Wallet Check: License and Blue Book (ब्लु बुक) ready? 🇳🇵

Under the Motor Vehicle and Transport Management Act of Nepal, you are legally required to carry original vehicle and driver documentation at all times. 

What to carry on every ride or drive:
1️⃣ Original Driving License (सवारी चालक अनुमति पत्र): Proof that you have passed the rigorous legal test to control a vehicle.
2️⃣ Vehicle Registration Book (Blue Book / दर्ता किताब): The ultimate identity document of your vehicle, showing taxes paid and active registrations.

⚠️ The Consequences: 
Driving without these documents leads to immediate fine receipts, vehicle impoundment at traffic checkpoints, and the total denial of insurance coverage during crashes.

Stay legal, stay secure! Carry them always.

#NepalBlueBook #DrivingLicense #TrafficInspectionNepal #StayLegal #NepalPoliceChecks #DriveInsured #CarryYourDocuments`,
    graphicAdvice: "Illustrate a clean flat lay representing essential documents: a modern smart card driver's license from Nepal, and the classic blue-colored paper booklet (the Blue Book), resting cleanly next to car keys on an executive dashboard."
  },
  general_awareness: {
    slogans: [
      "मापासे शून्य बनाऔं, अकाल मृत्युबाट बचौं! (Zero MaPaSe, Zero Crashes)",
      "Indicators On Before You Turn: Communicate on the Road!",
      "Zebra Crossings belong to Pedestrians: Slow Down and Yield!"
    ],
    caption: `🛑 Absolute Zero: Say NO to MaPaSe (Drunk Driving) in Nepal! 🇳🇵

Nepal Police Traffic enforces a strict ZERO TOLERANCE policy on alcohol and driving (locally known as MaPaSe - मादक पदार्थ सेवन). Even a single sip can impair your reflexes, posing a danger to yourself and families on the road.

🚶‍♂️ Pedestrian Safety & Ethics:
• Always slow down and yield completely to pedestrians waiting at zebra crossings.
• Zebra crossings are legal safe zones; block them, and you block safety!

💡 Communication is Key:
• Always use indicators at least 50 meters before turning or changing lanes.
• Avoid using mobile phones. Head up, phone down, hands on the wheel.

Let's foster mutual respect and safety on Nepali streets!

#ZeroMaPaSe #NepalTrafficPolice #ZebraCrossingRespect #UseIndicators #NepalRoadSafety #NoDistractedDriving #MaPaSeCampaign`,
    graphicAdvice: "An intense high-contrast awareness design: a clear circular red hazard sign with 'No Drink Driving' (MaPaSe) overlaid on a silhouette of Kathmandu streets. Show a zebra crossing where a car is standing still to let school kids cross safely."
  }
};

const VISUAL_THEMES = {
  slate: {
    name: "Cosmic Slate",
    bg: "bg-slate-900",
    border: "border-slate-800",
    text: "text-slate-100",
    accent: "bg-emerald-500",
    accentText: "text-emerald-400",
    cardBg: "bg-slate-950/80",
    roadBg: "bg-slate-800",
    skyBg: "from-slate-950 to-slate-900"
  },
  crimson: {
    name: "Nepal Crimson Danger",
    bg: "bg-red-950",
    border: "border-red-900",
    text: "text-red-50",
    accent: "bg-red-500",
    accentText: "text-red-400",
    cardBg: "bg-red-950/70",
    roadBg: "bg-neutral-800",
    skyBg: "from-red-950 to-neutral-900"
  },
  blue: {
    name: "Traffic Royal Blue",
    bg: "bg-sky-950",
    border: "border-sky-900",
    text: "text-sky-100",
    accent: "bg-sky-500",
    accentText: "text-sky-300",
    cardBg: "bg-sky-950/70",
    roadBg: "bg-slate-800",
    skyBg: "from-sky-950 to-slate-950"
  },
  dark: {
    name: "Midnight Safety",
    bg: "bg-neutral-950",
    border: "border-neutral-800",
    text: "text-neutral-100",
    accent: "bg-amber-500",
    accentText: "text-amber-400",
    cardBg: "bg-neutral-900/90",
    roadBg: "bg-neutral-850",
    skyBg: "from-black to-neutral-950"
  }
};

const TRAFFIC_QUIZ: QuizQuestion[] = [
  {
    id: 1,
    question: "In Nepal, which lane are slow-moving vehicles legally required to stay in?",
    options: [
      "Any lane they want",
      "The left-hand lane",
      "The middle/right overtaking lane",
      "Directly on the road shoulder"
    ],
    correctAnswer: 1,
    explanation: "In Nepal's left-hand drive system, slow vehicles (scooters, heavy trucks, loaded buses) are legally mandated to stay in the left-hand lane, keeping the right-hand/middle lane clear for overtaking."
  },
  {
    id: 2,
    question: "What is the typical speed limit for major city roads, like parts of Kathmandu Ring Road?",
    options: [
      "Around 30 km/h",
      "Around 50 km/h",
      "Around 80 km/h",
      "100 km/h"
    ],
    correctAnswer: 1,
    explanation: "Major city roads like Kathmandu Ring Road typically have a posted speed limit of around 50 km/h. Busy urban/residential zones drop to 30-40 km/h."
  },
  {
    id: 3,
    question: "What does the popular term 'MaPaSe' (मापासे) refer to in Nepal traffic enforcement?",
    options: [
      "Mandatory helmet and seatbelt checkpoints",
      "Speed limit detection using radar guns",
      "Drunk driving inspection (MAdak Padartha SEwan)",
      "Blue Book document validation booklet"
    ],
    correctAnswer: 2,
    explanation: "MaPaSe (मापासे) is the abbreviation for Madak Padartha Sewan (मादक पदार्थ सेवन), representing Nepal's strict zero-tolerance breathalyzer checks on drink driving."
  },
  {
    id: 4,
    question: "Which of these original documents must you always carry while driving or riding in Nepal?",
    options: [
      "Only a copy of your citizenship certificate",
      "Your driving license and vehicle Blue Book (registration booklet)",
      "Only your driver's license card",
      "A temporary tax clearance slip"
    ],
    correctAnswer: 1,
    explanation: "You must always carry your original driving license and the vehicle's registration booklet, popularly called the 'Blue Book' (ब्लु बुक)."
  },
  {
    id: 5,
    question: "When overtaking a vehicle in Nepal, you should always pass on which side?",
    options: [
      "The left side",
      "The right side (with proper signaling)",
      "Either side depends on space",
      "Only on blind corners"
    ],
    correctAnswer: 1,
    explanation: "Since Nepal has a left-hand drive system, you must always overtake vehicles from the RIGHT side. Overtaking on the left is illegal and highly dangerous."
  }
];

export default function App() {
  // --- STATE ---
  const [activeTopic, setActiveTopic] = useState<string>("lane_discipline");
  const [activePlatform, setActivePlatform] = useState<string>("instagram");
  const [activeTone, setActiveTone] = useState<string>("creative");
  const [extraPrompt, setExtraPrompt] = useState<string>("");
  const [selectedTheme, setSelectedTheme] = useState<keyof typeof VISUAL_THEMES>("slate");
  
  // Loaded campaign campaign details (Slogan, Caption, Advice)
  const [campaignData, setCampaignData] = useState<CampaignData>(PRESET_CAMPAIGNS.lane_discipline);
  const [selectedSloganIndex, setSelectedSloganIndex] = useState<number>(0);
  const [editableSlogan, setEditableSlogan] = useState<string>(PRESET_CAMPAIGNS.lane_discipline.slogans[0]);
  const [editableCaption, setEditableCaption] = useState<string>(PRESET_CAMPAIGNS.lane_discipline.caption);
  
  // Simulator State
  const [laneDiscipline, setLaneDiscipline] = useState<"correct" | "incorrect">("correct");
  const [speedZone, setSpeedZone] = useState<"residential" | "city_road" | "highway" | "mountain">("city_road");
  const [currentSpeed, setCurrentSpeed] = useState<number>(45);
  const [animationRunning, setAnimationRunning] = useState<boolean>(true);
  const [overtakeTriggered, setOvertakeTriggered] = useState<boolean>(false);
  const [playerCarLane, setPlayerCarLane] = useState<"left" | "right">("left");
  const [playerCarX, setPlayerCarX] = useState<number>(10);
  const [leftIndicator, setLeftIndicator] = useState<boolean>(false);
  const [rightIndicator, setRightIndicator] = useState<boolean>(false);
  const [hazardFlasher, setHazardFlasher] = useState<boolean>(false);

  // Gemini State
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [apiError, setApiError] = useState<string | null>(null);

  // Copy Feedback state
  const [copiedCaption, setCopiedCaption] = useState<boolean>(false);
  const [copiedSlogan, setCopiedSlogan] = useState<boolean>(false);

  // Quiz State
  const [quizIndex, setQuizIndex] = useState<number>(0);
  const [quizSelected, setQuizSelected] = useState<number | null>(null);
  const [quizScore, setQuizScore] = useState<number>(0);
  const [quizFinished, setQuizFinished] = useState<boolean>(false);
  const [showExplanation, setShowExplanation] = useState<boolean>(false);

  // Sync state with theme and active topic
  useEffect(() => {
    // Whenever topic changes, load pre-baked defaults
    const defaultData = PRESET_CAMPAIGNS[activeTopic] || PRESET_CAMPAIGNS.lane_discipline;
    setCampaignData(defaultData);
    setSelectedSloganIndex(0);
    setEditableSlogan(defaultData.slogans[0]);
    setEditableCaption(defaultData.caption);

    // Sync simulator parameters based on topic
    if (activeTopic === "speed_limits") {
      setSpeedZone("highway");
      setCurrentSpeed(70);
    } else if (activeTopic === "lane_discipline") {
      setSpeedZone("city_road");
      setCurrentSpeed(42);
    } else if (activeTopic === "helmet_seatbelt") {
      setSpeedZone("residential");
      setCurrentSpeed(28);
    } else {
      setSpeedZone("city_road");
      setCurrentSpeed(35);
    }
  }, [activeTopic]);

  // Adjust default speed limits based on speed zones
  useEffect(() => {
    if (speedZone === "residential") {
      setCurrentSpeed(30);
    } else if (speedZone === "city_road") {
      setCurrentSpeed(48);
    } else if (speedZone === "highway") {
      setCurrentSpeed(75);
    } else if (speedZone === "mountain") {
      setCurrentSpeed(25);
    }
  }, [speedZone]);

  // Handle automatic indicator or blinking animations
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (leftIndicator || rightIndicator || hazardFlasher) {
      interval = setInterval(() => {
        // Handled by pure CSS keyframes on indicators
      }, 500);
    }
    return () => clearInterval(interval);
  }, [leftIndicator, rightIndicator, hazardFlasher]);

  // Simulator Overtaking Sequencer
  const handleTriggerOvertake = () => {
    if (laneDiscipline !== "correct" || overtakeTriggered) return;
    
    setOvertakeTriggered(true);
    setRightIndicator(true);
    
    // Step 1: Signal right and merge to right (overtaking) lane
    setTimeout(() => {
      setPlayerCarLane("right");
      setRightIndicator(false);
      // Speed up during overtake
      const targetSpeed = speedZone === "highway" ? 95 : speedZone === "city_road" ? 65 : 45;
      setCurrentSpeed(targetSpeed);
    }, 1000);

    // Step 2: Drive forward past the slow truck (animate X coordinate)
    setTimeout(() => {
      setPlayerCarX(65);
    }, 2000);

    // Step 3: Turn on left indicator to return to left lane
    setTimeout(() => {
      setLeftIndicator(true);
    }, 3500);

    // Step 4: Merge back to left lane in front of slow truck
    setTimeout(() => {
      setPlayerCarLane("left");
      setLeftIndicator(false);
      // Return to cruise speed
      const normalSpeed = speedZone === "highway" ? 75 : speedZone === "city_road" ? 48 : 30;
      setCurrentSpeed(normalSpeed);
    }, 4500);

    // Step 5: Reset positioning
    setTimeout(() => {
      setPlayerCarX(10);
      setOvertakeTriggered(false);
    }, 6500);
  };

  // Trigger Gemini API Server Route
  const handleGenerateCampaign = async () => {
    setIsGenerating(true);
    setApiError(null);
    try {
      const response = await fetch("/api/generate-campaign", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic: activeTopic,
          platform: activePlatform,
          tone: activeTone,
          extraPrompt: extraPrompt
        })
      });

      if (!response.ok) {
        const errJson = await response.json();
        throw new Error(errJson.error || "Failed to contact generator service.");
      }

      const generated: CampaignData = await response.json();
      
      // Update states with AI generated output
      setCampaignData(generated);
      if (generated.slogans && generated.slogans.length > 0) {
        setSelectedSloganIndex(0);
        setEditableSlogan(generated.slogans[0]);
      }
      setEditableCaption(generated.caption);
    } catch (err: any) {
      console.error(err);
      setApiError(err.message || "Something went wrong while generating safety campaign.");
    } finally {
      setIsGenerating(false);
    }
  };

  // Copy utility
  const handleCopyText = (text: string, type: "caption" | "slogan") => {
    navigator.clipboard.writeText(text);
    if (type === "caption") {
      setCopiedCaption(true);
      setTimeout(() => setCopiedCaption(false), 2000);
    } else {
      setCopiedSlogan(true);
      setTimeout(() => setCopiedSlogan(false), 2000);
    }
  };

  // Quiz progression
  const handleQuizAnswer = (optionIndex: number) => {
    setQuizSelected(optionIndex);
    setShowExplanation(true);
    if (optionIndex === TRAFFIC_QUIZ[quizIndex].correctAnswer) {
      setQuizScore(prev => prev + 1);
    }
  };

  const handleNextQuiz = () => {
    setShowExplanation(false);
    setQuizSelected(null);
    if (quizIndex < TRAFFIC_QUIZ.length - 1) {
      setQuizIndex(prev => prev + 1);
    } else {
      setQuizFinished(true);
    }
  };

  const handleRestartQuiz = () => {
    setQuizIndex(0);
    setQuizSelected(null);
    setQuizScore(0);
    setQuizFinished(false);
    setShowExplanation(false);
  };

  // Helper variables for speed enforcement
  const getSpeedWarning = () => {
    if (speedZone === "residential" && currentSpeed > 40) return { title: "Speed Limit Violated", desc: "Residential limit is 30-40 km/h. High risk for kids!", level: "danger" };
    if (speedZone === "city_road" && currentSpeed > 50) return { title: "Over Limit on Ring Road", desc: "Katmandu Ring Road standard limit is 50 km/h. Radar guns actively check this!", level: "warning" };
    if (speedZone === "highway" && currentSpeed > 80) return { title: "High-Speed Risk", desc: "Highway speed exceeds 80 km/h. Increased braking distance!", level: "warning" };
    if (speedZone === "mountain" && currentSpeed > 30) return { title: "Dangerous Mountain Speed", desc: "Steep mountain roads require 20-30 km/h. Fatal slip hazard on corners!", level: "danger" };
    return null;
  };

  const speedWarning = getSpeedWarning();
  const theme = VISUAL_THEMES[selectedTheme];

  return (
    <div id="nepal-road-safety-campaign-app" className="min-h-screen bg-[#05070A] text-white font-sans selection:bg-red-600 selection:text-white pb-16 relative">
      {/* Decorative ambient glowing backdrops from design */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/10 blur-[120px] rounded-full pointer-events-none z-0"></div>
      <div className="absolute bottom-1/2 left-0 w-96 h-96 bg-blue-600/10 blur-[120px] rounded-full pointer-events-none z-0"></div>

      {/* HEADER SECTION */}
      <header id="app-header" className="sticky top-0 z-50 bg-[#05070A]/85 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            {/* Round Red badge for Nepal Police traffic awareness */}
            <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center border-2 border-white/20 shrink-0 shadow-lg animate-pulse">
              <span className="font-bold text-[8px] leading-tight text-center text-white">NEPAL<br/>POLICE</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-3xl md:text-4xl font-black tracking-tighter uppercase italic text-white drop-shadow-[0_0_15px_rgba(239,68,68,0.5)]">
                  SACHETANA
                </h1>
                <span className="text-[10px] md:text-xs font-mono font-bold text-red-500 bg-red-500/10 border border-red-500/20 px-2 py-0.5 rounded uppercase tracking-wider">
                  Traffic Awareness Hub
                </span>
              </div>
              <p className="text-[10px] md:text-xs tracking-[0.2em] text-red-500 font-bold uppercase mt-0.5">
                Traffic Awareness Campaign 2026
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center space-x-3 bg-white/5 px-4 py-2 rounded-full border border-white/10">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
              <span className="text-xs font-mono text-slate-300">Nepal Standard: <strong className="text-emerald-400 font-mono">DRIVE LEFT</strong></span>
            </div>
            <div className="text-center md:text-right bg-white/5 md:bg-transparent border border-white/10 md:border-transparent p-2 rounded-xl md:p-0">
              <p className="text-[10px] text-white/50 uppercase tracking-widest leading-none">Emergency Hotline</p>
              <p className="text-xl md:text-2xl font-mono font-bold text-red-500 leading-none mt-1">103</p>
            </div>
          </div>
        </div>
        {/* Flag decorative colored strip at top of page header */}
        <div className="h-1 w-full bg-gradient-to-r from-red-600 via-blue-700 to-red-600"></div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 space-y-8">
        
        {/* EDUCATIONAL HERO INTRO */}
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 md:p-8 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-0 left-10 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="max-w-3xl space-y-4 relative z-10">
            <h2 className="text-2xl md:text-3xl font-black font-display tracking-tight text-white uppercase italic">
              NEPAL ROAD SAFETY & LATEST TRAFFIC AWARENESS
            </h2>
            <p className="text-white/80 leading-relaxed text-sm md:text-base">
              An interactive public awareness campaign raising standard driving discipline on Nepal's highways and city streets. In our left-hand drive traffic system, slower vehicles must keep left. The right overtaking lane remains open for smooth traffic flow and collision prevention.
            </p>
            
            {/* Grid of quick safety facts */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-2">
              <div className="bg-black/40 p-4 rounded-xl border border-white/10 shadow-[0_0_15px_rgba(255,255,255,0.05)]">
                <p className="text-xs text-red-500 font-black uppercase tracking-wider font-mono">Lane Standard</p>
                <p className="text-sm font-bold text-white mt-1">Drive on Left</p>
                <p className="text-[10px] text-white/60 mt-0.5">Overtake on Right only</p>
              </div>
              <div className="bg-black/40 p-4 rounded-xl border border-white/10 shadow-[0_0_15px_rgba(255,255,255,0.05)]">
                <p className="text-xs text-red-500 font-black uppercase tracking-wider font-mono">Overtake Zone</p>
                <p className="text-sm font-bold text-white mt-1">Middle Lane Clear</p>
                <p className="text-[10px] text-white/60 mt-0.5">Keep free for passing</p>
              </div>
              <div className="bg-black/40 p-4 rounded-xl border border-white/10 shadow-[0_0_15px_rgba(255,255,255,0.05)]">
                <p className="text-xs text-red-500 font-black uppercase tracking-wider font-mono">Speed Caps</p>
                <p className="text-sm font-bold text-white mt-1">30 to 80 km/h</p>
                <p className="text-[10px] text-white/60 mt-0.5">Strict municipal zones</p>
              </div>
              <div className="bg-black/40 p-4 rounded-xl border border-white/10 shadow-[0_0_15px_rgba(255,255,255,0.05)]">
                <p className="text-xs text-red-500 font-black uppercase tracking-wider font-mono">Checkpoints</p>
                <p className="text-sm font-bold text-white mt-1">Blue Book & Lic.</p>
                <p className="text-[10px] text-white/60 mt-0.5">Always carry originals</p>
              </div>
            </div>
          </div>
        </div>

        {/* TOPIC SELECTION BAR */}
        <div className="flex flex-col space-y-2 relative z-10">
          <label className="text-xs font-black tracking-[0.2em] text-red-500 uppercase font-mono">
            1. Select Campaign Topic & Road Safety Rule
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {TOPICS.map((topic) => {
              const Icon = topic.icon;
              const isSelected = activeTopic === topic.id;
              return (
                <button
                   key={topic.id}
                   onClick={() => setActiveTopic(topic.id)}
                   className={`flex flex-col justify-between items-start text-left p-4 rounded-xl transition-all relative overflow-hidden group ${
                     isSelected 
                       ? "bg-red-600/20 border-2 border-red-600 text-white shadow-[0_0_20px_rgba(220,38,38,0.3)]" 
                       : "bg-white/5 hover:bg-white/10 border border-white/10 text-white/80"
                   }`}
                >
                  <div className="flex items-center justify-between w-full mb-3">
                    <div className={`p-2 rounded-lg ${isSelected ? "bg-red-600 text-white" : "bg-white/10 text-white/75 group-hover:text-white"}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    {topic.badge && (
                      <span className={`text-[9px] px-1.5 py-0.5 rounded font-mono font-bold uppercase tracking-wider ${
                        isSelected ? "bg-red-500/30 text-red-300" : "bg-white/10 text-white/50"
                      }`}>
                        {topic.badge}
                      </span>
                    )}
                  </div>
                  <div>
                    <h3 className="text-xs font-black tracking-tight uppercase">{topic.label}</h3>
                    <p className="text-[10px] text-white/60 mt-1 line-clamp-2 leading-tight">{topic.desc}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* MAIN SPLIT GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: VISUAL POST PREVIEW & SIMULATOR (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* SOCIAL MEDIA CAROUSEL POST CARD */}
            <div className="flex flex-col space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-mono tracking-wider text-slate-400 uppercase">
                  2. Live Campaign Poster & Lane Simulator Card ({activePlatform})
                </label>
                <div className="flex space-x-2">
                  {(["slate", "crimson", "blue", "dark"] as const).map((t) => (
                    <button
                      key={t}
                      onClick={() => setSelectedTheme(t)}
                      className={`w-4 h-4 rounded-full border ${selectedTheme === t ? "ring-2 ring-rose-500 border-white" : "border-transparent"}`}
                      style={{
                        backgroundColor: 
                          t === "slate" ? "#0f172a" : 
                          t === "crimson" ? "#991b1b" : 
                          t === "blue" ? "#075985" : "#171717"
                      }}
                      title={VISUAL_THEMES[t].name}
                    />
                  ))}
                </div>
              </div>

              {/* POST CONTAINER */}
              <div 
                id="exportable-campaign-poster" 
                className={`relative rounded-2xl overflow-hidden border transition-all duration-300 bg-[#05070A] border-white/15 shadow-2xl`}
              >
                {/* Visual grid / vignette details for graphic design feel */}
                <div className="absolute inset-0 bg-radial-vignette opacity-20 pointer-events-none"></div>

                {/* Poster Header */}
                <div className="p-5 flex items-center justify-between border-b border-white/10 bg-black/35">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-red-600 border border-white/20 flex items-center justify-center font-display text-[9px] font-black text-white leading-tight text-center">
                      NEPAL<br/>POLICE
                    </div>
                    <div>
                      <div className="flex items-center space-x-1.5">
                        <span className="text-xs font-black font-display tracking-tight text-white uppercase italic">Nepal Road Safety Campaigns</span>
                        <Check className="w-3.5 h-3.5 text-blue-500 fill-blue-500" />
                      </div>
                      <span className="text-[10px] text-red-500 font-bold uppercase tracking-widest">Public Awareness Campaign </span>
                    </div>
                  </div>
                  <div className="bg-white/5 border border-white/10 text-[10px] text-white/80 px-2.5 py-1 rounded-full font-mono uppercase tracking-wider">
                    #ObeyTrafficRules
                  </div>
                </div>

                {/* Poster Display Text & Slogan Accent */}
                <div className="p-6 pb-2 text-center space-y-2">
                  <div className="inline-block text-[10px] font-black tracking-widest text-red-500 uppercase bg-red-500/10 px-3 py-1 rounded-full border border-red-500/20 mb-2">
                    {TOPICS.find(t => t.id === activeTopic)?.label}
                  </div>
                  <h2 className="text-xl md:text-2xl font-black font-display text-white tracking-tight leading-snug max-w-xl mx-auto drop-shadow-md uppercase italic">
                    "{editableSlogan}"
                  </h2>
                </div>

                {/* HIGH-FIDELITY ANIMATED NEPAL HIGHWAY SIMULATOR */}
                <div className="px-6 py-4">
                  <div className="relative rounded-xl overflow-hidden border border-white/10 bg-black p-4 min-h-[220px] flex flex-col justify-between shadow-[0_0_20px_rgba(255,255,255,0.03)]">
                    
                    {/* Sky/Backdrop of highway */}
                    <div className="absolute top-0 inset-x-0 h-12 bg-gradient-to-b from-red-600/5 to-transparent pointer-events-none opacity-40"></div>
                    
                    {/* SIMULATOR SIGN POSTS (RECONSTRUCTED ACCORDING TO CURRENT ZONE AND TOPIC) */}
                    <div className="z-10 flex items-center justify-between w-full pointer-events-none">
                      {/* Left Side: Standard Rule sign */}
                      <div className="bg-black/80 border border-white/15 px-3 py-1.5 rounded flex items-center space-x-2 shadow-lg">
                        <div className="w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-[10px]">
                          L
                        </div>
                        <div>
                          <p className="text-[9px] text-white/40 font-mono leading-none uppercase">TRAFFIC SIDES</p>
                          <p className="text-[10px] text-white font-bold font-sans">DRIVE ON LEFT</p>
                        </div>
                      </div>

                      {/* Speed warning alert box */}
                      {speedWarning && (
                        <div className={`px-2.5 py-1 rounded flex items-center space-x-1 border animate-bounce ${
                          speedWarning.level === "danger" 
                            ? "bg-red-950/90 border-red-500 text-red-300" 
                            : "bg-amber-950/90 border-amber-500 text-amber-300"
                        }`}>
                          <AlertTriangle className="w-3.5 h-3.5 text-red-500" />
                          <span className="text-[9px] font-mono font-bold uppercase tracking-wider">{speedWarning.title}</span>
                        </div>
                      )}

                      {/* Right Side: Nepal Speed Limit Sign (Strictly enforced) */}
                      <div className="flex items-center space-x-2">
                        <div className="w-10 h-10 rounded-full bg-white border-4 border-red-600 flex flex-col items-center justify-center text-black font-bold shadow-[0_0_15px_rgba(220,38,38,0.6)]">
                          <span className="text-[8px] font-bold text-red-600 leading-none">SPEED</span>
                          <span className="text-sm font-black leading-none mt-0.5 font-mono">
                            {speedZone === "residential" ? 30 : speedZone === "city_road" ? 50 : speedZone === "highway" ? 80 : 30}
                          </span>
                        </div>
                        <div className="bg-black/80 border border-white/15 px-2 py-1 rounded text-right">
                          <p className="text-[8px] text-white/40 font-mono leading-none">ZONE TYPE</p>
                          <p className="text-[9px] text-white font-bold uppercase mt-0.5">
                            {speedZone.replace("_", " ")}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* ROAD CONTAINER */}
                    <div className="relative h-28 my-auto flex flex-col justify-between py-1 bg-[#1A1C20] border-y-2 border-white/20 select-none overflow-hidden rounded">
                      
                      {/* Overtaking zone background visual alerts */}
                      {laneDiscipline === "incorrect" && (
                        <div className="absolute inset-0 bg-red-600/10 flex items-center justify-center pointer-events-none animate-pulse">
                          <div className="border border-red-500/30 px-3 py-1 bg-red-950/80 rounded text-[10px] text-red-400 font-mono uppercase font-bold flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" />
                            Overtaking Lane Blocked / Hazard
                          </div>
                        </div>
                      )}

                      {/* TOP LANE: RIGHT / OVERTAKING LANE (Must stay clear in left drive systems!) */}
                      <div className="relative h-12 flex items-center justify-between px-4">
                        <div className="absolute inset-x-0 bottom-0 h-0.5 border-b border-dashed border-slate-500/55"></div>
                        
                        {/* Background guide label */}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                          <span className="text-[9px] font-mono font-semibold tracking-widest text-slate-500/20 uppercase">
                            OVERTAKING LANE (PASSING ONLY)
                          </span>
                        </div>

                        {/* Overtaking Vehicle - Player Car (when overtaking is triggered) */}
                        <AnimatePresence>
                          {playerCarLane === "right" && (
                            <motion.div 
                              initial={{ x: 10, y: 0 }}
                              animate={{ x: `${playerCarX}%` }}
                              transition={{ duration: 1.2, ease: "easeInOut" }}
                              className="absolute z-20"
                            >
                              <div className="relative flex flex-col items-center">
                                {/* Sleek player car */}
                                <Car className="w-10 h-10 text-rose-500 filter drop-shadow-md" />
                                <div className="absolute -top-1 bg-rose-600 text-white text-[7px] font-mono px-1 rounded">PLAYER</div>
                                
                                {/* Indicators */}
                                {rightIndicator && <span className="absolute -bottom-1 -right-1 w-1.5 h-1.5 bg-amber-400 rounded-full animate-ping"></span>}
                                {leftIndicator && <span className="absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-amber-400 rounded-full animate-ping"></span>}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>

                        {/* HAZARDOUS BLOCKER: A vehicle wrongly driving slowly on the right overtaking lane */}
                        {laneDiscipline === "incorrect" && (
                          <div className="absolute left-[40%] flex flex-col items-center">
                            <span className="bg-red-500/20 text-red-400 border border-red-500/30 text-[8px] font-mono px-1 rounded mb-1 animate-pulse">BLOCKER</span>
                            <div className="relative p-1 bg-slate-800 rounded border border-red-500/40">
                              <Car className="w-8 h-8 text-slate-500" />
                            </div>
                          </div>
                        )}
                      </div>

                      {/* BOTTOM LANE: LEFT / SLOW DRIVING LANE (Standard traffic cruises here) */}
                      <div className="relative h-12 flex items-center justify-between px-4">
                        
                        {/* Background guide label */}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                          <span className="text-[9px] font-mono font-semibold tracking-widest text-slate-500/20 uppercase">
                            SLOW TRAFFIC KEEP LEFT
                          </span>
                        </div>

                        {/* Slow Truck (The Traditional Nepalese truck style!) */}
                        <div className="absolute left-[45%] flex flex-col items-center">
                          <span className="text-[7px] font-mono font-bold tracking-tight text-emerald-400 uppercase bg-emerald-950/60 px-1 rounded mb-0.5 border border-emerald-900/50">SLOW BUS/TRUCK</span>
                          
                          {/* Colorful SVG representation of Nepal Highway Truck */}
                          <svg className="w-14 h-8" viewBox="0 0 100 50">
                            {/* Wooden plank aesthetic body with safety slogans */}
                            <rect x="5" y="5" width="65" height="30" fill="#dc2626" rx="2" />
                            <rect x="5" y="10" width="65" height="2" fill="#eab308" />
                            <rect x="5" y="18" width="65" height="2" fill="#2563eb" />
                            <rect x="5" y="26" width="65" height="2" fill="#16a34a" />
                            
                            {/* Cab of truck */}
                            <path d="M 70 35 L 70 12 L 85 12 L 95 24 L 95 35 Z" fill="#1e3a8a" />
                            <rect x="74" y="15" width="10" height="10" fill="#93c5fd" />
                            
                            {/* Tailgate art banner */}
                            <text x="37" y="24" fontSize="6.5" fill="#ffffff" fontWeight="black" textAnchor="middle" fontFamily="sans-serif">HORN PLEASE</text>
                            
                            {/* Wheels */}
                            <circle cx="20" cy="38" r="7" fill="#171717" stroke="#ffffff" strokeWidth="1.5" />
                            <circle cx="60" cy="38" r="7" fill="#171717" stroke="#ffffff" strokeWidth="1.5" />
                            <circle cx="80" cy="38" r="7" fill="#171717" stroke="#ffffff" strokeWidth="1.5" />
                          </svg>
                        </div>

                        {/* Scooter rider representing local commuters */}
                        <div className="absolute left-[20%] flex flex-col items-center">
                          <span className="text-[7px] font-mono font-bold text-slate-400 leading-none mb-1">Commuter</span>
                          <div className="relative">
                            {/* Scooter with Helmet indicator overlay */}
                            <div className="absolute -top-2 -right-1 flex items-center space-x-0.5 bg-slate-900/90 border border-emerald-500/30 px-1 py-0.5 rounded">
                              <span className="w-1 h-1 rounded-full bg-emerald-400"></span>
                              <span className="text-[6px] font-mono font-bold text-emerald-300">HELMET ON</span>
                            </div>
                            
                            {/* Bicycle/Scooter styling */}
                            <svg className="w-8 h-8" viewBox="0 0 40 40">
                              <circle cx="10" cy="30" r="5" fill="none" stroke="#6b7280" strokeWidth="2" />
                              <circle cx="30" cy="30" r="5" fill="none" stroke="#6b7280" strokeWidth="2" />
                              <line x1="10" y1="30" x2="20" y2="20" stroke="#f43f5e" strokeWidth="3" />
                              <line x1="20" y1="20" x2="30" y2="30" stroke="#f43f5e" strokeWidth="3" />
                              <line x1="20" y1="20" x2="22" y2="12" stroke="#6b7280" strokeWidth="2" />
                              {/* Rider Head with Helmet */}
                              <circle cx="22" cy="10" r="4.5" fill="#facc15" /> {/* Helmet yellow */}
                              <rect x="20" y="11" width="4" height="1.5" fill="#171717" /> {/* Buckle strap */}
                            </svg>
                          </div>
                        </div>

                        {/* Player Car cruising in Left Lane */}
                        {playerCarLane === "left" && (
                          <div 
                            style={{ 
                              position: "absolute", 
                              left: `${playerCarX}%`,
                              transition: "left 1.2s ease-in-out" 
                            }}
                            className="z-20"
                          >
                            <div className="relative flex flex-col items-center">
                              {/* Sleek red player sedan */}
                              <svg className="w-11 h-7" viewBox="0 0 50 25">
                                <path d="M 5 18 L 10 8 L 35 8 L 45 14 L 48 18 Z" fill="#e11d48" />
                                <rect x="12" y="10" width="10" height="5" fill="#e0f2fe" />
                                <rect x="24" y="10" width="9" height="5" fill="#e0f2fe" />
                                {/* Wheels */}
                                <circle cx="14" cy="18" r="4.5" fill="#171717" />
                                <circle cx="36" cy="18" r="4.5" fill="#171717" />
                              </svg>
                              <div className="absolute -top-1 bg-rose-600 text-white text-[7.5px] font-mono px-1 rounded">PLAYER</div>
                              
                              {/* Amber indicators */}
                              {rightIndicator && <span className="absolute bottom-1 -right-1 w-1.5 h-1.5 bg-amber-400 rounded-full animate-ping"></span>}
                              {leftIndicator && <span className="absolute bottom-1 -left-1 w-1.5 h-1.5 bg-amber-400 rounded-full animate-ping"></span>}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* LIVE METERS */}
                    <div className="flex items-center justify-between text-slate-400 text-[10px] font-mono border-t border-white/5 pt-2">
                      <div className="flex items-center space-x-4">
                        <span className="flex items-center gap-1">
                          <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                          Player Speed: <strong className="text-white">{currentSpeed} km/h</strong>
                        </span>
                        <span className="hidden sm:inline text-slate-500">|</span>
                        <span className="hidden sm:inline flex items-center gap-1">
                          Lane Alignment: 
                          <strong className={laneDiscipline === "correct" ? "text-emerald-400" : "text-red-400"}>
                            {laneDiscipline === "correct" ? "✓ LEGAL LEFT" : "✗ ILLEGAL CLUTTER"}
                          </strong>
                        </span>
                      </div>
                      <div className="bg-slate-900 border border-slate-800 px-2 py-0.5 rounded text-slate-300">
                        UTC Clock Active
                      </div>
                    </div>
                  </div>
                </div>

                {/* Campaign Post Footer/Badge inside poster */}
                <div className="p-5 border-t border-white/5 bg-black/20 flex flex-col sm:flex-row items-center justify-between text-slate-400 text-xs gap-3">
                  <div className="flex items-center space-x-2">
                    <Shield className="w-4 h-4 text-rose-500" />
                    <span>Joint Awareness Campaign by <strong>Nepal Safe Highways Alliance</strong></span>
                  </div>
                  <div className="font-mono text-[10px] bg-white/5 border border-white/10 px-2.5 py-0.5 rounded text-white">
                    VERIFIED SAFETY CARD
                  </div>
                </div>
              </div>
            </div>

            {/* SIMULATOR CONTROLLER CONSOLE CARD */}
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 space-y-4 shadow-xl">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-black tracking-wider text-white uppercase font-mono flex items-center gap-1.5">
                  <Sliders className="w-4 h-4 text-red-500" />
                  Simulator Interactive Controls
                </h3>
                <span className="text-xs bg-red-600/20 text-red-500 px-2.5 py-0.5 rounded-full border border-red-500/30 font-mono font-bold uppercase tracking-wider">
                  Educational Sandbox
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                {/* Lane Discipline Mode selector */}
                <div className="space-y-2">
                  <span className="text-xs font-mono text-white/60">Lane Alignment Discipline:</span>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => {
                        setLaneDiscipline("correct");
                        setPlayerCarLane("left");
                      }}
                      className={`py-2.5 px-3 rounded-xl border text-xs font-bold uppercase tracking-tight flex items-center justify-center gap-2 transition-all ${
                        laneDiscipline === "correct"
                          ? "bg-emerald-500/20 border-emerald-500 text-emerald-400 shadow-lg shadow-emerald-950/20"
                          : "bg-white/5 border-white/10 text-white/60 hover:text-white"
                      }`}
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Correct Keep Left
                    </button>
                    <button
                      onClick={() => {
                        setLaneDiscipline("incorrect");
                        setPlayerCarLane("left");
                      }}
                      className={`py-2.5 px-3 rounded-xl border text-xs font-bold uppercase tracking-tight flex items-center justify-center gap-2 transition-all ${
                        laneDiscipline === "incorrect"
                          ? "bg-red-500/20 border-red-500 text-red-400 shadow-lg shadow-red-950/20"
                          : "bg-white/5 border-white/10 text-white/60 hover:text-white"
                      }`}
                    >
                      <AlertTriangle className="w-3.5 h-3.5" />
                      Incorrect Blocking
                    </button>
                  </div>
                </div>

                {/* Simulation Action Trigger */}
                <div className="space-y-2">
                  <span className="text-xs font-mono text-white/60">Interactive Simulation Action:</span>
                  <button
                    onClick={handleTriggerOvertake}
                    disabled={laneDiscipline !== "correct" || overtakeTriggered}
                    className={`w-full py-2.5 px-4 rounded-xl border text-xs font-black uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
                      laneDiscipline !== "correct"
                        ? "bg-white/5 border-white/5 text-white/30 cursor-not-allowed"
                        : overtakeTriggered
                        ? "bg-red-950/30 border-red-900/50 text-red-400 animate-pulse cursor-not-allowed"
                        : "bg-red-600 hover:bg-red-500 border-red-500 text-white shadow-[0_0_15px_rgba(220,38,38,0.4)]"
                    }`}
                  >
                    <Car className="w-4 h-4" />
                    {overtakeTriggered ? "Overtaking in Progress..." : "Trigger Safe Right-Side Overtake"}
                  </button>
                </div>
              </div>

              {/* Terrain Zones Selection */}
              <div className="space-y-3 pt-2">
                <span className="text-xs font-mono text-white/60 block">Highway Environment & Local Speed Limits in Nepal:</span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: "residential", label: "Residential Zone", cap: "30-40 km/h" },
                    { id: "city_road", label: "Katmandu Ring Road", cap: "50 km/h limit" },
                    { id: "highway", label: "Trunk Highway", cap: "60-80 km/h" },
                    { id: "mountain", label: "Hill Road / Twist", cap: "30 km/h max" }
                  ].map((z) => (
                    <button
                      key={z.id}
                      onClick={() => setSpeedZone(z.id as any)}
                      className={`p-2.5 rounded-xl border text-left transition-all ${
                        speedZone === z.id
                          ? "bg-blue-600/20 border-blue-500 text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.25)]"
                          : "bg-white/5 border-white/10 text-white/60 hover:text-white"
                      }`}
                    >
                      <p className="text-[10px] font-black uppercase tracking-tight leading-tight">{z.label}</p>
                      <p className="text-[9px] font-mono text-white/40 mt-0.5">{z.cap}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Speed Controller Slider */}
              <div className="space-y-2 pt-2">
                <div className="flex items-center justify-between text-xs font-mono text-white/60">
                  <span>Custom Speed Regulator:</span>
                  <span className={speedWarning ? "text-red-500 font-bold" : "text-white font-bold"}>
                    {currentSpeed} km/h
                  </span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="110"
                  value={currentSpeed}
                  onChange={(e) => setCurrentSpeed(Number(e.target.value))}
                  className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-red-600"
                />
              </div>

              {/* Safe Advice Notice */}
              <div className="bg-white/5 rounded-xl p-4 border border-white/10 flex items-start space-x-3 text-xs text-white/80">
                <BookOpen className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
                <p className="leading-normal">
                  <strong className="text-white">Educational Note:</strong> Blocking the overtaking lane in the middle is a critical safety violation on Nepal highways (like Prithvi Highway). Slow vehicles must keep left to enable safe highway speeds and zero lane collisions.
                </p>
              </div>
            </div>

            {/* NEPAL TRAFFIC RULES MANDATORY HANDBOOK CHECKLIST */}
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 space-y-4 shadow-xl">
              <h3 className="text-sm font-black tracking-wider text-white uppercase font-mono flex items-center gap-1.5">
                <Shield className="w-4 h-4 text-red-500" />
                Mandatory Safety Protocols Checklist (Nepal Police Traffic)
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { title: "Drive on Left Hand Side", text: "In Nepal, always stay on the left. Passing must strictly be executed from the right side." },
                  { title: "Carry License & Blue Book Booklet", text: "Always carry your physical driver license and vehicle ownership booklet (Blue Book)." },
                  { title: "Secured Helmet Protocol", text: "Ensure helmets have a thick impact cushion and are securely buckled. Same for pillions where mandatory." },
                  { title: "Buckled Seatbelt Shield", text: "Always buckle seatbelts in passenger cars (mandatory for driver and front seat passengers)." },
                  { title: "Zero Tolerated MaPaSe", text: "Strict zero limit breathalyzers at checkpoints. Violators face heavily penalty receipts & licensing holds." },
                  { title: "Zebra Crossing Priority", text: "Pedestrians have legal right of way on marked zebra crossings. Drivers must yield." }
                ].map((item, i) => (
                  <div key={i} className="flex items-start space-x-3 p-3.5 bg-white/5 rounded-xl border border-white/10">
                    <div className="w-5 h-5 rounded-full bg-red-600/20 border border-red-500/30 text-red-500 flex items-center justify-center font-mono text-[10px] font-black shrink-0 mt-0.5">
                      {i + 1}
                    </div>
                    <div>
                      <h4 className="text-xs font-black text-white uppercase tracking-tight">{item.title}</h4>
                      <p className="text-[10px] text-white/60 leading-normal mt-0.5">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: CAMPAIGN POST BUILDER & EXPORT CONTROLS (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* AI CAMPAIGN GENERATOR PANEL */}
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 space-y-5 shadow-xl relative overflow-hidden">
              {/* Subtle top decoration */}
              <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-red-600 via-blue-600 to-red-500"></div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-black tracking-wider text-white uppercase font-mono flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-red-500 animate-pulse" />
                    AI Campaign Poster Generator
                  </h3>
                  <p className="text-[10px] text-white/40 mt-0.5 uppercase tracking-wide">Powered by server-side Gemini 3.5-flash AI</p>
                </div>
                <div className="bg-red-600/20 border border-red-500/30 text-red-500 px-2.5 py-0.5 rounded text-[10px] font-mono font-bold uppercase">
                  No Browser Keys Exposed
                </div>
              </div>

              {/* Target Platform Preset Selection */}
              <div className="space-y-2">
                <label className="text-xs font-mono text-white/60 block">Target Campaign Platform Presets:</label>
                <div className="grid grid-cols-4 gap-2">
                  {["instagram", "facebook", "twitter", "linkedin"].map((p) => (
                    <button
                      key={p}
                      onClick={() => setActivePlatform(p)}
                      className={`py-2 px-2 rounded-lg border text-[10px] font-black uppercase tracking-wider text-center transition-all ${
                        activePlatform === p
                          ? "bg-red-600/20 border-red-500 text-white shadow-[0_0_15px_rgba(220,38,38,0.25)]"
                          : "bg-white/5 border-white/10 text-white/60 hover:text-white"
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              {/* Campaign Slogan Tone selection */}
              <div className="space-y-2">
                <label className="text-xs font-mono text-white/60 block">Slogan & Caption Tone of Voice:</label>
                <div className="grid grid-cols-4 gap-2">
                  {["creative", "urgent", "informative", "humorous"].map((t) => (
                    <button
                      key={t}
                      onClick={() => setActiveTone(t)}
                      className={`py-2 px-2 rounded-lg border text-[10px] font-black uppercase tracking-wider text-center transition-all ${
                        activeTone === t
                          ? "bg-red-600/20 border-red-500 text-white shadow-[0_0_15px_rgba(220,38,38,0.25)]"
                          : "bg-white/5 border-white/10 text-white/60 hover:text-white"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Optional custom instructions to AI */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-mono text-white/60">Additional Slogan/Caption Request:</label>
                  <span className="text-[9px] text-white/40 uppercase font-bold">Optional</span>
                </div>
                <textarea
                  placeholder="e.g. Include local references to Kathmandu, Mugling road safety, or write slogans in full Nepali script..."
                  value={extraPrompt}
                  onChange={(e) => setExtraPrompt(e.target.value)}
                  className="w-full h-20 text-xs bg-white/5 border border-white/10 hover:border-white/20 rounded-xl p-3.5 text-white placeholder:text-white/20 focus:outline-none focus:border-red-500 transition-all resize-none"
                />
              </div>

              {/* Generate Trigger Button */}
              <button
                onClick={handleGenerateCampaign}
                disabled={isGenerating}
                className={`w-full py-3.5 rounded-xl border text-xs font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${
                  isGenerating
                    ? "bg-white/5 border-white/5 text-white/30 cursor-wait"
                    : "bg-red-600 hover:bg-red-500 border-red-500 text-white shadow-[0_0_20px_rgba(220,38,38,0.45)]"
                }`}
              >
                {isGenerating ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></span>
                    Generating Campaign Content via Gemini...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    Generate Custom Nepal Campaign Post with AI
                  </>
                )}
              </button>

              {apiError && (
                <div className="p-3.5 bg-red-950/60 border border-red-500/40 rounded-xl flex items-start space-x-2 text-xs text-red-300">
                  <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5 text-red-500" />
                  <p className="leading-snug">{apiError}</p>
                </div>
              )}
            </div>

            {/* MANUAL SLOGAN & ACCENT CUSTOMIZER */}
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 space-y-4 shadow-xl">
              <h3 className="text-sm font-black tracking-wider text-white uppercase font-mono flex items-center gap-1.5">
                <Sliders className="w-4 h-4 text-red-500" />
                Customize Slogan text manually
              </h3>

              <div className="space-y-3">
                {/* Slogan variation carousel */}
                <div className="space-y-1.5">
                  <span className="text-xs font-mono text-white/60">Available Slogans:</span>
                  <div className="space-y-1.5">
                    {campaignData.slogans.map((slogan, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          setSelectedSloganIndex(idx);
                          setEditableSlogan(slogan);
                        }}
                        className={`w-full p-3 rounded-xl border text-left text-xs transition-all leading-normal ${
                          selectedSloganIndex === idx
                            ? "bg-red-600/20 border-red-500 text-white font-bold"
                            : "bg-white/5 border-white/10 text-white/60 hover:text-white"
                        }`}
                      >
                        {slogan}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Slogan manual overrides */}
                <div className="space-y-1">
                  <span className="text-xs font-mono text-white/60">Custom Manual Slogan Overlay:</span>
                  <input
                    type="text"
                    value={editableSlogan}
                    onChange={(e) => setEditableSlogan(e.target.value)}
                    className="w-full text-xs bg-white/5 border border-white/10 hover:border-white/20 rounded-xl p-3.5 text-white placeholder:text-white/20 focus:outline-none focus:border-red-500 transition-all"
                    placeholder="Enter custom awareness slogan..."
                  />
                </div>
              </div>
            </div>

            {/* AI CAMPAIGN TEXT COPY CENTER (CAPTION & HASHTAG HUB) */}
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 space-y-4 shadow-xl relative">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-black tracking-wider text-white uppercase font-mono flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-red-500" />
                  Awareness Campaign Social Caption
                </h3>
                <button
                  onClick={() => handleCopyText(editableCaption, "caption")}
                  className="p-1.5 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-lg text-white flex items-center space-x-1 transition-all text-[11px] font-bold uppercase tracking-wider"
                  title="Copy Full Caption"
                >
                  {copiedCaption ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400 font-bold">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Caption</span>
                    </>
                  )}
                </button>
              </div>

              {/* Editable Social Post Caption Area */}
              <div className="space-y-2">
                <textarea
                  value={editableCaption}
                  onChange={(e) => setEditableCaption(e.target.value)}
                  className="w-full h-80 text-xs font-mono bg-white/5 border border-white/10 hover:border-white/20 rounded-xl p-4 text-white/90 leading-relaxed focus:outline-none focus:border-red-500 transition-all"
                />
                <span className="text-[10px] text-white/40 leading-snug block uppercase tracking-wide font-mono">
                  💡 <strong>Tip:</strong> Copy this text directly to publish as a campaign post along with the generated visual design. The emojis, structure, and hashtags are optimized for high organic traffic.
                </span>
              </div>
            </div>

            {/* GRAPHIC ADVICE DETAIL PANEL */}
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 space-y-3 shadow-xl">
              <h4 className="text-xs font-black uppercase tracking-widest text-red-500 font-mono">
                🎨 Poster Composition & Graphic Advice:
              </h4>
              <p className="text-xs text-white/80 leading-relaxed bg-white/5 p-4 rounded-xl border border-white/10">
                {campaignData.graphicAdvice}
              </p>
            </div>

          </div>

        </div>

        {/* NEPAL TRAFFIC SAFETY TRIVIA & QUIZ CENTER */}
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 md:p-8 relative shadow-2xl overflow-hidden mt-8">
          <div className="absolute top-0 right-0 w-80 h-80 bg-red-600/5 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="max-w-4xl mx-auto space-y-6">
            
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between border-b border-white/10 pb-4 gap-4">
              <div>
                <h3 className="text-lg font-black font-display text-white flex items-center gap-2 uppercase tracking-wide">
                  <Award className="w-5 h-5 text-red-500 animate-pulse" />
                  Nepal Highway Code & Traffic Rules Mini-Quiz
                </h3>
                <p className="text-xs text-white/50 mt-1 uppercase tracking-wider font-mono">Test your road discipline intelligence! Carry on safety practices in Nepal.</p>
              </div>
              
              {!quizFinished && (
                <div className="bg-black/40 px-3.5 py-1 rounded-full border border-white/10 text-xs font-mono text-white/80 font-bold uppercase tracking-wider">
                  Question <strong className="text-red-500">{quizIndex + 1}</strong> of <strong>{TRAFFIC_QUIZ.length}</strong>
                </div>
              )}
            </div>

            <AnimatePresence mode="wait">
              {!quizFinished ? (
                <motion.div
                  key={quizIndex}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  <p className="text-sm md:text-base font-black text-white uppercase tracking-tight">
                    {TRAFFIC_QUIZ[quizIndex].question}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                    {TRAFFIC_QUIZ[quizIndex].options.map((option, idx) => {
                      const isSelected = quizSelected === idx;
                      const isCorrect = idx === TRAFFIC_QUIZ[quizIndex].correctAnswer;
                      
                      let btnStyle = "bg-white/5 hover:bg-white/10 border-white/10 text-white hover:border-white/20";
                      if (quizSelected !== null) {
                        if (isCorrect) {
                          btnStyle = "bg-emerald-500/20 border-emerald-500 text-emerald-300 font-bold shadow-[0_0_15px_rgba(16,185,129,0.2)]";
                        } else if (isSelected) {
                          btnStyle = "bg-red-500/20 border-red-500 text-red-300 font-bold shadow-[0_0_15px_rgba(239,68,68,0.2)]";
                        } else {
                          btnStyle = "bg-white/5 border-white/5 text-white/20 cursor-not-allowed";
                        }
                      }

                      return (
                        <button
                          key={idx}
                          onClick={() => quizSelected === null && handleQuizAnswer(idx)}
                          disabled={quizSelected !== null}
                          className={`p-4 rounded-xl border text-left text-xs transition-all flex items-center justify-between gap-3 ${btnStyle}`}
                        >
                          <span className="font-bold uppercase tracking-tight">{option}</span>
                          {quizSelected !== null && isCorrect && <Check className="w-4 h-4 text-emerald-400 shrink-0" />}
                          {quizSelected !== null && isSelected && !isCorrect && <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />}
                        </button>
                      );
                    })}
                  </div>

                  {showExplanation && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 bg-black/40 rounded-xl border border-white/10 space-y-2 mt-4"
                    >
                      <div className="flex items-center space-x-2 text-xs font-black uppercase tracking-widest text-red-500 font-mono">
                        <HelpCircle className="w-4 h-4" />
                        <span>Explanation & Rule Context:</span>
                      </div>
                      <p className="text-xs text-white/80 leading-relaxed">
                        {TRAFFIC_QUIZ[quizIndex].explanation}
                      </p>
                      
                      <div className="flex justify-end pt-2">
                        <button
                          onClick={handleNextQuiz}
                          className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded-lg text-xs font-black uppercase tracking-widest transition-all flex items-center gap-1.5 shadow-[0_0_15px_rgba(220,38,38,0.3)]"
                        >
                          <span>{quizIndex === TRAFFIC_QUIZ.length - 1 ? "Finish Quiz" : "Next Question"}</span>
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-6 space-y-4"
                >
                  <div className="w-16 h-16 bg-red-600/10 rounded-full flex items-center justify-center text-red-500 mx-auto border border-red-500/20 shadow-lg">
                    <Award className="w-8 h-8 animate-bounce" />
                  </div>
                  <div>
                    <h4 className="text-lg font-black text-white uppercase tracking-tight">Nepal Traffic Code Quiz Completed!</h4>
                    <p className="text-xs text-white/40 mt-1 uppercase tracking-wide font-mono">Excellent work on building your road safety awareness.</p>
                  </div>

                  <div className="text-3xl font-black font-mono text-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.15)] inline-block px-4 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
                    {quizScore} / {TRAFFIC_QUIZ.length}
                  </div>

                  <p className="text-xs text-white/80 max-w-md mx-auto leading-relaxed">
                    {quizScore === TRAFFIC_QUIZ.length 
                      ? "Outstanding! You are a master of Nepal highway code and traffic discipline. Spread this knowledge to keep others safe!" 
                      : "Good job! Reviewing these rules helps maintain safe highway spaces. Let's make safety a habit on every trip."}
                  </p>

                  <button
                    onClick={handleRestartQuiz}
                    className="inline-flex items-center space-x-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 px-4 py-2.5 rounded-xl text-xs font-black text-white uppercase tracking-widest transition-all shadow-md"
                  >
                    <RotateCcw className="w-4 h-4 text-red-500" />
                    <span>Try Quiz Again</span>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </div>

      </div>

      {/* FOOTER */}
      <footer className="mt-16 border-t border-white/10 pt-8 text-center text-xs text-white/40 space-y-3 pb-8">
        <div className="flex flex-wrap justify-center gap-6 pb-2">
          <a href="https://traffic.nepalpolice.gov.np" target="_blank" rel="noreferrer" className="text-red-500 hover:text-red-400 font-bold uppercase tracking-wider flex items-center gap-1">
            Nepal Police Traffic <ExternalLink className="w-3 h-3" />
          </a>
          <span>•</span>
          <span className="uppercase tracking-widest font-mono">Drive on the Left side</span>
          <span>•</span>
          <span className="uppercase tracking-widest font-mono">Keep Overtaking Lane Clear</span>
        </div>
        <p className="uppercase tracking-widest text-[10px] font-mono">© 2026 Nepal Road Safety Campaign Hub. Crafted under SACHETANA directives.</p>
      </footer>
    </div>
  );
}
