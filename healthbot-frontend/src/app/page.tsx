"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";
import {
  MessageSquare,
  User,
  Stethoscope,
  Building2,
  Star,
  MapPin,
  Clock,
  Phone,
  Search,
  Send,
  ArrowRight,
  Menu,
  X,
  ChevronRight,
  Shield,
  Zap,
  Heart,
  Brain,
  Activity,
  CheckCircle2,
  Sparkles,
  LogOut,
  Settings,
  History,
  Lightbulb,
  Award,
  Calendar,
  Filter,
  ExternalLink,
  Navigation,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Cpu,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

// ============================================
// Types
// ============================================
type Page = "landing" | "chat" | "profile" | "doctors" | "hospitals";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  reviews: number;
  location: string;
  distance: string;
  available: boolean;
  avatar: string;
  nextAvailable: string;
  experience: string;
}

interface Hospital {
  id: string;
  name: string;
  type: string;
  rating: number;
  distance: string;
  address: string;
  phone: string;
  openNow: boolean;
  image: string;
}

interface UserProfile {
  name: string;
  email: string;
  avatar: string;
  memberSince: string;
  chatsCount: number;
  healthScore: number;
}

interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  avatar: string;
  rating: number;
}

interface HealthTip {
  id: number;
  title: string;
  description: string;
  icon: typeof Activity;
  color: string;
}

interface ChatHistoryItem {
  id: number;
  title: string;
  date: string;
  preview: string;
}

// ============================================
// Constants & Mock Data
// ============================================
const DOCTORS: Doctor[] = [
  {
    id: "1",
    name: "Dr. Priya Sharma",
    specialty: "Cardiologist",
    rating: 4.9,
    reviews: 342,
    location: "Apollo Hospitals, Jubilee Hills",
    distance: "2.3 km",
    available: true,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya",
    nextAvailable: "Today, 3:00 PM",
    experience: "15 years",
  },
  {
    id: "2",
    name: "Dr. Rajesh Kumar",
    specialty: "Neurologist",
    rating: 4.8,
    reviews: 289,
    location: "NIMS, Panjagutta",
    distance: "4.1 km",
    available: true,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rajesh",
    nextAvailable: "Tomorrow, 10:00 AM",
    experience: "12 years",
  },
  {
    id: "3",
    name: "Dr. Anjali Reddy",
    specialty: "Pediatrician",
    rating: 4.9,
    reviews: 412,
    location: "Rainbow Children's Hospital, Banjara Hills",
    distance: "1.8 km",
    available: false,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Anjali",
    nextAvailable: "Dec 20, 9:00 AM",
    experience: "10 years",
  },
  {
    id: "4",
    name: "Dr. Venkat Rao",
    specialty: "Dermatologist",
    rating: 4.7,
    reviews: 256,
    location: "Kamineni Hospitals, LB Nagar",
    distance: "5.5 km",
    available: true,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Venkat",
    nextAvailable: "Today, 5:30 PM",
    experience: "8 years",
  },
  {
    id: "5",
    name: "Dr. Lakshmi Devi",
    specialty: "Orthopedic Surgeon",
    rating: 4.8,
    reviews: 301,
    location: "Sunshine Hospitals, Secunderabad",
    distance: "6.2 km",
    available: true,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lakshmi",
    nextAvailable: "Tomorrow, 2:00 PM",
    experience: "14 years",
  },
  {
    id: "6",
    name: "Dr. Suresh Babu",
    specialty: "General Physician",
    rating: 4.9,
    reviews: 545,
    location: "Care Hospitals, Nampally",
    distance: "2.8 km",
    available: true,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Suresh",
    nextAvailable: "Today, 4:00 PM",
    experience: "20 years",
  },
];

const HOSPITALS: Hospital[] = [
  {
    id: "1",
    name: "Apollo Hospitals",
    type: "Multi-Specialty",
    rating: 4.8,
    distance: "2.3 km",
    address: "Jubilee Hills, Road No. 72, Hyderabad",
    phone: "+91 40 2360 7777",
    openNow: true,
    image: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=400&h=250&fit=crop&auto=format",
  },
  {
    id: "2",
    name: "NIMS Hospital",
    type: "Government Hospital",
    rating: 4.5,
    distance: "4.1 km",
    address: "Punjagutta, Hyderabad, Telangana",
    phone: "+91 40 2340 1234",
    openNow: true,
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=400&h=250&fit=crop&auto=format",
  },
  {
    id: "3",
    name: "Rainbow Children's Hospital",
    type: "Pediatric Specialty",
    rating: 4.9,
    distance: "1.8 km",
    address: "Road No. 14, Banjara Hills, Hyderabad",
    phone: "+91 40 2355 5678",
    openNow: true,
    image: "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?w=400&h=250&fit=crop&auto=format",
  },
  {
    id: "4",
    name: "Care Hospitals",
    type: "Multi-Specialty",
    rating: 4.7,
    distance: "2.8 km",
    address: "Nampally, Hyderabad, Telangana",
    phone: "+91 40 2333 8989",
    openNow: true,
    image: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=400&h=250&fit=crop&auto=format",
  },
  {
    id: "5",
    name: "Sunshine Hospitals",
    type: "Multi-Specialty",
    rating: 4.6,
    distance: "6.2 km",
    address: "Secunderabad, Hyderabad, Telangana",
    phone: "+91 40 2789 4567",
    openNow: false,
    image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?w=400&h=250&fit=crop&auto=format",
  },
  {
    id: "6",
    name: "KIMS Hospitals",
    type: "Multi-Specialty",
    rating: 4.7,
    distance: "3.5 km",
    address: "Minister Road, Secunderabad, Telangana",
    phone: "+91 40 2756 7890",
    openNow: true,
    image: "https://images.unsplash.com/photo-1584982751601-97dcc096659c?w=400&h=250&fit=crop&auto=format",
  },
];

const USER_PROFILE: UserProfile = {
  name: "Rahul Mehta",
  email: "rahul.mehta@example.com",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rahul",
  memberSince: "January 2024",
  chatsCount: 47,
  healthScore: 85,
};

const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: "Dr. Kavitha Nair",
    role: "Healthcare Professional",
    content: "HealthBot AI has revolutionized how I manage patient inquiries. The AI responses are incredibly accurate and helpful.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Kavitha",
    rating: 5,
  },
  {
    id: 2,
    name: "Arjun Reddy",
    role: "Patient",
    content: "I found my current doctor through HealthBot AI. The recommendations were spot-on, and the booking process was seamless.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Arjun",
    rating: 5,
  },
  {
    id: 3,
    name: "Dr. Srinivas Prasad",
    role: "Medical Researcher",
    content: "The accuracy of medical information provided by HealthBot AI is impressive. It's a valuable tool for both professionals and patients.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Srinivas",
    rating: 5,
  },
];

const HEALTH_TIPS: HealthTip[] = [
  { id: 1, title: "Stay Hydrated", description: "Drink at least 8 glasses of water daily", icon: Activity, color: "text-slate-400" },
  { id: 2, title: "Regular Exercise", description: "30 minutes of moderate activity, 5 days a week", icon: Heart, color: "text-slate-400" },
  { id: 3, title: "Quality Sleep", description: "Get 7-9 hours of restful sleep nightly", icon: Brain, color: "text-slate-400" },
  { id: 4, title: "Balanced Diet", description: "Include fruits, vegetables, and whole grains", icon: Sparkles, color: "text-slate-400" },
];

const CHAT_HISTORY: ChatHistoryItem[] = [
  { id: 1, title: "Headache Consultation", date: "Today", preview: "Discussion about recurring headaches..." },
  { id: 2, title: "Nutrition Advice", date: "Yesterday", preview: "Asked about balanced diet plans..." },
  { id: 3, title: "Exercise Routine", date: "Dec 15", preview: "Recommended workout schedule..." },
  { id: 4, title: "Sleep Issues", date: "Dec 12", preview: "Tips for better sleep quality..." },
];

const BOT_RESPONSES: Record<string, string> = {
  default: `I understand you're concerned about your health. Let me provide some helpful information:

**Key Points:**
- It's important to maintain regular check-ups with your healthcare provider
- Keep track of any symptoms you're experiencing
- Stay hydrated and get adequate rest

> This AI assistant provides general health information and should not replace professional medical advice.

**Next Steps:**
1. Schedule an appointment if symptoms persist
2. Document your symptoms for better diagnosis
3. Consider lifestyle factors affecting your health

Would you like me to help you find a doctor nearby?`,
  hello: `Hello! Welcome to HealthBot AI. I'm your personal healthcare assistant powered by NVIDIA Nemotron.

**How can I help you today?**

- **Symptom Analysis**: Describe your symptoms for preliminary guidance
- **Find Doctors**: Search for specialists in your area
- **Health Tips**: Get personalized wellness recommendations
- **Medication Info**: Learn about medications and their uses

Feel free to ask me anything health-related!`,
  headache: `I understand you're experiencing headaches. Here are some common causes and solutions:

**Common Causes:**
- Dehydration
- Eye strain from screens
- Lack of sleep
- Stress and tension

**Immediate Relief:**
1. Rest in a quiet, dark room
2. Apply a cold or warm compress
3. Stay hydrated with water
4. Gentle neck stretches

**When to See a Doctor:**
- Headaches lasting more than 3 days
- Severe pain with fever
- Vision changes

Would you like me to recommend a neurologist in your area?`,
  doctor: `I'd be happy to help you find the right doctor!

**Search by Specialty:**
- Cardiologist
- Neurologist
- Dermatologist
- Pediatrician
- General Practitioner

**Available Features:**
- View doctor profiles and ratings
- Check real-time availability
- Get directions to clinics
- Read patient reviews

Would you like to search for a specific specialty?`,
};

// ============================================
// Animation Variants
// ============================================
const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

const slideUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
};

const staggerContainer = {
  animate: { transition: { staggerChildren: 0.05 } },
};

// ============================================
// Chat Input Component (extracted to prevent re-renders)
// ============================================
const ChatInput = ({ 
  inputMessage, 
  setInputMessage, 
  handleSendMessage 
}: { 
  inputMessage: string; 
  setInputMessage: (v: string) => void;
  handleSendMessage: () => void;
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  // Keep focus on input
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className="glass-card border-t border-white/5 p-4 flex-shrink-0">
      <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }} className="flex gap-2">
        <Input
          ref={inputRef}
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Ask me anything about health..."
          className="flex-1 bg-white/5 border-white/10 text-white placeholder:text-slate-500 input-focus"
        />
        <Button type="submit" disabled={!inputMessage.trim()} className="btn-primary px-4" size="icon">
          <Send className="w-4 h-4" />
        </Button>
      </form>
      <p className="text-slate-600 text-xs text-center mt-2">This AI provides general information only. Consult a professional for medical advice.</p>
    </div>
  );
};

// ============================================
// Main Component
// ============================================
export default function HealthBotAI() {
  // State
  const [currentPage, setCurrentPage] = useState<Page>("landing");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "register">("login");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [doctorSearchQuery, setDoctorSearchQuery] = useState("");
  const [specialtyFilter, setSpecialtyFilter] = useState("all");
  const [hospitalSearchQuery, setHospitalSearchQuery] = useState("");
  const [user, setUser] = useState<UserProfile | null>(null);
  const [authEmail, setAuthEmail] = useState("");
  const [authPassword, setAuthPassword] = useState("");
  const [authName, setAuthName] = useState("");
  const [authLoading, setAuthLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Effects
  useEffect(() => {
    fetch('/users/api/me/')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.user) {
          setIsAuthenticated(true);
          setUser(data.user);
        }
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Handlers
  const handleSendMessage = useCallback(async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      content: inputMessage,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    const currentInput = inputMessage;
    setInputMessage("");
    setIsTyping(true);

    try {
      const res = await fetch('/chat/get_response/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: currentInput })
      });
      const data = await res.json();
      
      const botMessage: Message = {
        id: `bot-${Date.now()}`,
        role: "assistant",
        content: data.response || "Sorry, I could not process your request.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error(error);
      const errorMessage: Message = {
        id: `error-${Date.now()}`,
        role: "assistant",
        content: "Network error occurred while reaching the server.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  }, [inputMessage]);

  const handleLogin = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);
    try {
      const res = await fetch('/users/api/login/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: authEmail, password: authPassword })
      });
      const data = await res.json();
      if (data.success) {
        setIsAuthenticated(true);
        setUser(data.user);
        setShowAuthModal(false);
        setCurrentPage("chat");
        toast.success("Welcome back!");
      } else {
        toast.error(data.message || "Login failed");
      }
    } catch (err) {
      toast.error("An error occurred during login.");
    } finally {
      setAuthLoading(false);
      setAuthPassword("");
    }
  }, [authEmail, authPassword]);

  const handleRegister = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);
    try {
      const res = await fetch('/users/api/register/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: authName, email: authEmail, password: authPassword })
      });
      const data = await res.json();
      if (data.success) {
        setIsAuthenticated(true);
        setUser(data.user);
        setShowAuthModal(false);
        setCurrentPage("chat");
        toast.success("Account created successfully!");
      } else {
        toast.error(data.message || "Registration failed");
      }
    } catch (err) {
      toast.error("An error occurred during registration.");
    } finally {
      setAuthLoading(false);
      setAuthPassword("");
    }
  }, [authEmail, authPassword, authName]);

  const handleLogout = useCallback(async () => {
    try {
      await fetch('/users/api/logout/', { method: 'POST' });
    } catch (e) { console.error(e); }
    setIsAuthenticated(false);
    setUser(null);
    setCurrentPage("landing");
    setMessages([]);
    toast.info("Logged out successfully");
  }, []);
  // Filtered Data
  const filteredDoctors = useMemo(() => 
    DOCTORS.filter((doctor) => {
      const matchesSearch = doctor.name.toLowerCase().includes(doctorSearchQuery.toLowerCase()) ||
        doctor.specialty.toLowerCase().includes(doctorSearchQuery.toLowerCase());
      const matchesSpecialty = specialtyFilter === "all" ||
        doctor.specialty.toLowerCase().includes(specialtyFilter.toLowerCase());
      return matchesSearch && matchesSpecialty;
    }),
    [doctorSearchQuery, specialtyFilter]
  );

  const filteredHospitals = useMemo(() =>
    HOSPITALS.filter((hospital) =>
      hospital.name.toLowerCase().includes(hospitalSearchQuery.toLowerCase())
    ),
    [hospitalSearchQuery]
  );

  // ============================================
  // Sub-Components
  // ============================================
  
  // Navigation
  const AppNavigation = () => (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0c0f1a]/90 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.button
            className="flex items-center gap-2.5"
            onClick={() => setCurrentPage("landing")}
            whileHover={{ opacity: 0.8 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center">
              <Heart className="w-4.5 h-4.5 text-white" />
            </div>
            <span className="text-lg font-semibold tracking-tight">
              <span className="text-white">HealthBot</span>
              <span className="text-slate-400"> AI</span>
            </span>
          </motion.button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {isAuthenticated ? (
              <>
                <NavButton active={currentPage === "chat"} onClick={() => setCurrentPage("chat")}>
                  <MessageSquare className="w-4 h-4 mr-1.5" />
                  Chat
                </NavButton>
                <NavButton active={currentPage === "doctors"} onClick={() => setCurrentPage("doctors")}>
                  <Stethoscope className="w-4 h-4 mr-1.5" />
                  Doctors
                </NavButton>
                <NavButton active={currentPage === "hospitals"} onClick={() => setCurrentPage("hospitals")}>
                  <Building2 className="w-4 h-4 mr-1.5" />
                  Hospitals
                </NavButton>
                <NavButton active={currentPage === "profile"} onClick={() => setCurrentPage("profile")}>
                  <User className="w-4 h-4 mr-1.5" />
                  Profile
                </NavButton>
                <Separator orientation="vertical" className="h-5 mx-2 bg-white/10" />
                <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white" onClick={handleLogout}>
                  <LogOut className="w-4 h-4 mr-1.5" />
                  Logout
                </Button>
              </>
            ) : (
              <>
                <NavButton active={currentPage === "landing"} onClick={() => setCurrentPage("landing")}>
                  Home
                </NavButton>
                <Button
                  size="sm"
                  className="ml-3 btn-primary"
                  onClick={() => { setShowAuthModal(true); setAuthMode("login"); }}
                >
                  Sign In
                  <ArrowRight className="w-4 h-4 ml-1.5" />
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu */}
          <Button variant="ghost" size="icon" className="md:hidden text-slate-400" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-white/5 bg-[#0c0f1a]/95 backdrop-blur-md"
          >
            <div className="px-4 py-4 space-y-1">
              {isAuthenticated ? (
                <>
                  <MobileNavItem onClick={() => { setCurrentPage("chat"); setMobileMenuOpen(false); }} icon={MessageSquare}>AI Chat</MobileNavItem>
                  <MobileNavItem onClick={() => { setCurrentPage("doctors"); setMobileMenuOpen(false); }} icon={Stethoscope}>Find Doctors</MobileNavItem>
                  <MobileNavItem onClick={() => { setCurrentPage("hospitals"); setMobileMenuOpen(false); }} icon={Building2}>Hospitals</MobileNavItem>
                  <MobileNavItem onClick={() => { setCurrentPage("profile"); setMobileMenuOpen(false); }} icon={User}>Profile</MobileNavItem>
                  <Separator className="my-2 bg-white/10" />
                  <MobileNavItem onClick={() => { handleLogout(); setMobileMenuOpen(false); }} icon={LogOut}>Logout</MobileNavItem>
                </>
              ) : (
                <>
                  <MobileNavItem onClick={() => { setCurrentPage("landing"); setMobileMenuOpen(false); }} icon={Heart}>Home</MobileNavItem>
                  <Button className="w-full mt-3 btn-primary" onClick={() => { setShowAuthModal(true); setAuthMode("login"); setMobileMenuOpen(false); }}>
                    Sign In
                  </Button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );

  const NavButton = ({ children, active, onClick }: { children: React.ReactNode; active?: boolean; onClick?: () => void }) => (
    <motion.button
      onClick={onClick}
      className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
        active ? "text-white bg-white/10" : "text-slate-400 hover:text-white hover:bg-white/5"
      }`}
      whileTap={{ scale: 0.98 }}
    >
      {children}
    </motion.button>
  );

  const MobileNavItem = ({ children, onClick, icon: Icon }: { children: React.ReactNode; onClick?: () => void; icon: typeof MessageSquare }) => (
    <button onClick={onClick} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/5 transition-colors">
      <Icon className="w-4 h-4" />
      {children}
    </button>
  );

  // ============================================
  // Pages
  // ============================================

  // Landing Page
  const LandingPage = () => (
    <div className="min-h-screen bg-[#0c0f1a]">
      {/* Hero Section */}
      <section className="relative pt-28 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-violet-500/10 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto relative">
          <motion.div className="text-center" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            {/* Badge */}
            <motion.div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 mb-6"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
            >
              <Cpu className="w-3.5 h-3.5 text-indigo-400" />
              <span className="text-xs text-indigo-300 font-medium">Powered by NVIDIA Nemotron</span>
            </motion.div>

            {/* Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-5">
              <span className="text-white">Your AI Healthcare</span>
              <br />
              <span className="text-indigo-400">Assistant</span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-8 leading-relaxed">
              Get instant medical guidance, find qualified doctors, and locate nearby hospitals — all powered by advanced AI technology.
            </p>

            {/* CTA */}
            <motion.div className="flex flex-col sm:flex-row items-center justify-center gap-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
              <Button size="lg" className="btn-primary px-8" onClick={() => { setShowAuthModal(true); setAuthMode("register"); }}>
                Get Started
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button size="lg" variant="outline" className="border-white/10 text-slate-300 hover:bg-white/5" onClick={() => document.getElementById("features")?.scrollIntoView({ behavior: "smooth" })}>
                Learn More
              </Button>
            </motion.div>
          </motion.div>

          {/* Preview Card */}
          <motion.div
            className="mt-16 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <div className="glass-card rounded-2xl overflow-hidden">
              {/* Chat Preview Header */}
              <div className="px-5 py-4 border-b border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center">
                    <Heart className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-medium text-white text-sm">HealthBot AI</h3>
                    <div className="flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse-subtle" />
                      <span className="text-xs text-slate-500">Online</span>
                    </div>
                  </div>
                </div>
                <Badge variant="outline" className="text-xs border-indigo-500/30 text-indigo-300">
                  <Sparkles className="w-3 h-3 mr-1" />
                  NIM Powered
                </Badge>
              </div>

              {/* Sample Messages */}
              <div className="p-5 space-y-4">
                <div className="flex justify-end">
                  <div className="message-user px-4 py-2.5 max-w-xs">
                    <p className="text-white text-sm">I&apos;ve been having headaches lately, what should I do?</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center flex-shrink-0">
                    <Heart className="w-4 h-4 text-white" />
                  </div>
                  <div className="message-bot px-4 py-2.5 max-w-sm">
                    <p className="text-slate-300 text-sm mb-2">I understand you&apos;re experiencing headaches. Here are some suggestions:</p>
                    <ul className="space-y-1 text-xs text-slate-400">
                      <li className="flex items-center gap-2"><CheckCircle2 className="w-3 h-3 text-emerald-400" /> Stay hydrated</li>
                      <li className="flex items-center gap-2"><CheckCircle2 className="w-3 h-3 text-emerald-400" /> Reduce screen time</li>
                      <li className="flex items-center gap-2"><CheckCircle2 className="w-3 h-3 text-emerald-400" /> Get adequate sleep</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <motion.div className="text-center mb-12" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">Everything You Need</h2>
            <p className="text-slate-400 max-w-xl mx-auto">Comprehensive healthcare tools to help you stay informed and connected.</p>
          </motion.div>

          <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-5" variants={staggerContainer} initial="initial" whileInView="animate" viewport={{ once: true }}>
            {[
              { icon: MessageSquare, title: "AI Health Chat", desc: "Get instant answers from our AI-powered medical assistant.", color: "text-indigo-400", bg: "bg-indigo-500/10" },
              { icon: Stethoscope, title: "Find Doctors", desc: "Search and book appointments with verified specialists.", color: "text-emerald-400", bg: "bg-emerald-500/10" },
              { icon: Building2, title: "Locate Hospitals", desc: "Find nearby hospitals with real-time availability.", color: "text-amber-400", bg: "bg-amber-500/10" },
            ].map((feature, i) => (
              <motion.div key={i} variants={slideUp} className="glass-card rounded-xl p-6 card-hover">
                <div className={`w-12 h-12 rounded-lg ${feature.bg} flex items-center justify-center mb-4`}>
                  <feature.icon className={`w-5 h-5 ${feature.color}`} />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <motion.div className="text-center mb-12" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">Trusted by Thousands</h2>
            <p className="text-slate-400">See what healthcare professionals and patients are saying.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {TESTIMONIALS.map((testimonial, i) => (
              <motion.div key={testimonial.id} className="glass-card rounded-xl p-6 card-hover" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <div className="flex items-center gap-0.5 mb-4">
                  {[...Array(testimonial.rating)].map((_, j) => (
                    <Star key={j} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-slate-300 text-sm leading-relaxed mb-4">&ldquo;{testimonial.content}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <Avatar className="w-9 h-9">
                    <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                    <AvatarFallback className="bg-slate-700 text-white text-xs">{testimonial.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-white text-sm font-medium">{testimonial.name}</p>
                    <p className="text-slate-500 text-xs">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-white/5">
        <div className="max-w-3xl mx-auto">
          <motion.div className="glass-card rounded-2xl p-8 sm:p-10 text-center" initial={{ opacity: 0, scale: 0.98 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">Ready to Get Started?</h2>
            <p className="text-slate-400 mb-6">Join thousands of users making informed health decisions.</p>
            <Button size="lg" className="btn-primary px-8" onClick={() => { setShowAuthModal(true); setAuthMode("register"); }}>
              Create Free Account
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <p className="text-slate-500 text-xs mt-4">No credit card required</p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 sm:px-6 lg:px-8 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center">
              <Heart className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="text-slate-500 text-sm">© 2024 HealthBot AI</span>
          </div>
          <Badge variant="outline" className="text-xs border-white/10 text-slate-500">
            <Cpu className="w-3 h-3 mr-1" />
            NVIDIA NIM
          </Badge>
        </div>
      </footer>
    </div>
  );

  // Chat Page
  const ChatPage = () => (
    <div className="min-h-screen bg-[#0c0f1a] pt-16">
      <div className="max-w-3xl mx-auto h-[calc(100vh-4rem)] flex flex-col">
        {/* Chat Header */}
        <div className="glass-card border-b border-white/5 px-5 py-3 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 rounded-full border-2 border-[#0c0f1a]" />
            </div>
            <div>
              <h2 className="font-medium text-white text-sm">HealthBot AI</h2>
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse-subtle" />
                <span className="text-xs text-slate-500">Online</span>
              </div>
            </div>
          </div>
          <Badge variant="outline" className="text-xs border-indigo-500/30 text-indigo-300">
            <Sparkles className="w-3 h-3 mr-1" />
            NIM
          </Badge>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1">
          <div className="p-4 space-y-4">
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full min-h-[350px] text-center py-8">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center mb-5">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-1.5">Welcome to HealthBot AI</h3>
                <p className="text-slate-400 text-sm max-w-sm mb-6">I&apos;m your AI healthcare assistant. Ask me anything about health.</p>
                <div className="grid grid-cols-2 gap-2 max-w-xs">
                  {[
                    { icon: Activity, text: "Analyze symptoms" },
                    { icon: Stethoscope, text: "Find a doctor" },
                    { icon: Building2, text: "Locate hospitals" },
                    { icon: Lightbulb, text: "Health tips" },
                  ].map((item, i) => (
                    <motion.button
                      key={i}
                      onClick={() => setInputMessage(item.text)}
                      className="flex items-center gap-2 p-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 text-left transition-colors"
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                    >
                      <item.icon className="w-4 h-4 text-indigo-400" />
                      <span className="text-xs text-slate-300">{item.text}</span>
                    </motion.button>
                  ))}
                </div>
              </div>
            ) : (
              <>
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 8, x: message.role === "user" ? 8 : -8 }}
                    animate={{ opacity: 1, y: 0, x: 0 }}
                    className={`flex gap-3 ${message.role === "user" ? "justify-end" : ""}`}
                  >
                    {message.role === "assistant" && (
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center flex-shrink-0">
                        <Heart className="w-4 h-4 text-white" />
                      </div>
                    )}
                    <div className={`max-w-[85%] ${message.role === "user" ? "message-user" : "message-bot"} px-4 py-2.5`}>
                      {message.role === "assistant" ? (
                        <div className="markdown-content text-sm">
                          <ReactMarkdown>{message.content}</ReactMarkdown>
                        </div>
                      ) : (
                        <p className="text-white text-sm">{message.content}</p>
                      )}
                    </div>
                    {message.role === "user" && (
                      <Avatar className="w-8 h-8 flex-shrink-0">
                        <AvatarImage src={user?.avatar} />
                        <AvatarFallback className="bg-indigo-500 text-white text-xs">{user?.name?.charAt(0) || "U"}</AvatarFallback>
                      </Avatar>
                    )}
                  </motion.div>
                ))}
                {isTyping && (
                  <motion.div className="flex gap-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center flex-shrink-0">
                      <Heart className="w-4 h-4 text-white" />
                    </div>
                    <div className="message-bot px-4 py-3">
                      <div className="flex items-center gap-1">
                        <div className="w-1.5 h-1.5 rounded-full bg-slate-400 typing-dot" />
                        <div className="w-1.5 h-1.5 rounded-full bg-slate-400 typing-dot" />
                        <div className="w-1.5 h-1.5 rounded-full bg-slate-400 typing-dot" />
                      </div>
                    </div>
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </>
            )}
          </div>
        </ScrollArea>

        {/* Input */}
        <ChatInput 
          inputMessage={inputMessage} 
          setInputMessage={setInputMessage} 
          handleSendMessage={handleSendMessage} 
        />
      </div>
    </div>
  );

  // Profile Page
  const ProfilePage = () => (
    <div className="min-h-screen bg-[#0c0f1a] pt-20 pb-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <motion.div className="glass-card rounded-xl p-6" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <div className="text-center mb-5">
                <Avatar className="w-20 h-20 mx-auto mb-3 ring-2 ring-white/10">
                  <AvatarImage src={user?.avatar} />
                  <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-indigo-600 text-white text-xl">{user?.name?.charAt(0) || "U"}</AvatarFallback>
                </Avatar>
                <h2 className="text-lg font-semibold text-white">{user?.name}</h2>
                <p className="text-slate-400 text-sm">{user?.email}</p>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between"><span className="text-slate-400">Member since</span><span className="text-white">{user?.memberSince}</span></div>
                <div className="flex justify-between"><span className="text-slate-400">Total chats</span><span className="text-white">{user?.chatsCount}</span></div>
                <Separator className="bg-white/10" />
                <div>
                  <div className="flex justify-between mb-1.5"><span className="text-slate-400">Health Score</span><span className="text-slate-300">{user?.healthScore}%</span></div>
                  <Progress value={user?.healthScore} className="h-1.5 bg-white/10" />
                </div>
              </div>
              <div className="mt-5 space-y-2">
                <Button variant="outline" size="sm" className="w-full border-white/10 text-slate-300 hover:bg-white/5">
                  <Settings className="w-4 h-4 mr-2" /> Settings
                </Button>
                <Button variant="outline" size="sm" className="w-full border-white/10 text-red-400 hover:bg-red-500/10" onClick={handleLogout}>
                  <LogOut className="w-4 h-4 mr-2" /> Logout
                </Button>
              </div>
            </motion.div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-5">
            {/* Stats */}
            <motion.div className="grid grid-cols-2 sm:grid-cols-4 gap-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
              {[
                { icon: MessageSquare, label: "Chats", value: "47", color: "text-slate-300" },
                { icon: Calendar, label: "Appointments", value: "12", color: "text-slate-300" },
                { icon: Award, label: "Streak", value: "14 days", color: "text-slate-300" },
                { icon: Heart, label: "Health Score", value: "85%", color: "text-slate-300" },
              ].map((stat, i) => (
                <div key={i} className="glass-card rounded-lg p-4 text-center card-hover">
                  <stat.icon className={`w-5 h-5 ${stat.color} mx-auto mb-1.5`} />
                  <p className="text-lg font-semibold text-white">{stat.value}</p>
                  <p className="text-xs text-slate-500">{stat.label}</p>
                </div>
              ))}
            </motion.div>

            {/* Chat History */}
            <motion.div className="glass-card rounded-xl p-5" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium text-white flex items-center gap-2"><History className="w-4 h-4 text-indigo-400" /> Chat History</h3>
                <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white h-7 text-xs">View All <ChevronRight className="w-3 h-3 ml-1" /></Button>
              </div>
              <div className="space-y-2">
                {CHAT_HISTORY.map((chat) => (
                  <div key={chat.id} className="flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 cursor-pointer transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-indigo-500/10 flex items-center justify-center">
                        <MessageSquare className="w-4 h-4 text-indigo-400" />
                      </div>
                      <div>
                        <p className="text-white text-sm font-medium">{chat.title}</p>
                        <p className="text-slate-500 text-xs">{chat.preview}</p>
                      </div>
                    </div>
                    <span className="text-slate-600 text-xs">{chat.date}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Health Tips */}
            <motion.div className="glass-card rounded-xl p-5" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
              <h3 className="font-medium text-white flex items-center gap-2 mb-4"><Lightbulb className="w-4 h-4 text-amber-400" /> Health Tips</h3>
              <div className="grid grid-cols-2 gap-3">
                {HEALTH_TIPS.map((tip) => (
                  <div key={tip.id} className="flex items-start gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                    <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0">
                      <tip.icon className={`w-4 h-4 ${tip.color}`} />
                    </div>
                    <div>
                      <p className="text-white text-sm font-medium">{tip.title}</p>
                      <p className="text-slate-500 text-xs">{tip.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );

  // Doctors Page
  const DoctorsPage = () => (
    <div className="min-h-screen bg-[#0c0f1a] pt-20 pb-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div className="mb-6" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1">Find Doctors</h1>
          <p className="text-slate-400 text-sm">Discover qualified healthcare professionals near you</p>
        </motion.div>

        {/* Search & Filter */}
        <motion.div className="glass-card rounded-xl p-4 mb-5" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <Input value={doctorSearchQuery} onChange={(e) => setDoctorSearchQuery(e.target.value)} placeholder="Search by name or specialty..." className="pl-9 bg-white/5 border-white/10 text-white placeholder:text-slate-500" />
            </div>
            <Select value={specialtyFilter} onValueChange={setSpecialtyFilter}>
              <SelectTrigger className="w-full sm:w-44 bg-white/5 border-white/10 text-white"><Filter className="w-3.5 h-3.5 mr-1.5 text-slate-500" /><SelectValue placeholder="Specialty" /></SelectTrigger>
              <SelectContent className="bg-[#1a1f3a] border-white/10">
                <SelectItem value="all">All Specialties</SelectItem>
                <SelectItem value="cardiologist">Cardiologist</SelectItem>
                <SelectItem value="neurologist">Neurologist</SelectItem>
                <SelectItem value="pediatrician">Pediatrician</SelectItem>
                <SelectItem value="dermatologist">Dermatologist</SelectItem>
                <SelectItem value="orthopedic">Orthopedic</SelectItem>
                <SelectItem value="general">General</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </motion.div>

        {/* Doctor Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredDoctors.map((doctor, i) => (
            <motion.div key={doctor.id} className="glass-card rounded-xl p-5 card-hover" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 + i * 0.03 }}>
              <div className="flex items-start gap-3 mb-3">
                <Avatar className="w-12 h-12 ring-1 ring-white/10">
                  <AvatarImage src={doctor.avatar} alt={doctor.name} />
                  <AvatarFallback className="bg-indigo-500/20 text-indigo-300">{doctor.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-medium text-white text-sm">{doctor.name}</h3>
                      <p className="text-indigo-400 text-xs">{doctor.specialty}</p>
                    </div>
                    {doctor.available && <Badge className="text-[10px] bg-emerald-500/15 text-emerald-400 border-0 px-1.5 py-0">Available</Badge>}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1.5 mb-3">
                <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                <span className="text-white text-xs">{doctor.rating}</span>
                <span className="text-slate-500 text-xs">({doctor.reviews} reviews)</span>
              </div>
              <div className="space-y-1.5 mb-4 text-xs text-slate-400">
                <div className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" />{doctor.location} • {doctor.distance}</div>
                <div className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" />Next: {doctor.nextAvailable}</div>
              </div>
              <div className="flex gap-2">
                <Button size="sm" className="flex-1 btn-primary text-xs">Book</Button>
                <Button size="sm" variant="outline" className="border-white/10 text-slate-300 hover:bg-white/5 px-2.5"><Phone className="w-3.5 h-3.5" /></Button>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredDoctors.length === 0 && (
          <div className="text-center py-12">
            <Stethoscope className="w-10 h-10 text-slate-600 mx-auto mb-3" />
            <p className="text-slate-400">No doctors found</p>
          </div>
        )}
      </div>
    </div>
  );

  // Hospitals Page
  const HospitalsPage = () => (
    <div className="min-h-screen bg-[#0c0f1a] pt-20 pb-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div className="mb-6" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1">Find Hospitals</h1>
          <p className="text-slate-400 text-sm">Locate medical facilities near you</p>
        </motion.div>

        {/* Search */}
        <motion.div className="glass-card rounded-xl p-4 mb-5" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <Input value={hospitalSearchQuery} onChange={(e) => setHospitalSearchQuery(e.target.value)} placeholder="Search hospitals..." className="pl-9 bg-white/5 border-white/10 text-white placeholder:text-slate-500" />
          </div>
        </motion.div>

        {/* Hospital Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {filteredHospitals.map((hospital, i) => (
            <motion.div key={hospital.id} className="glass-card rounded-xl overflow-hidden card-hover" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 + i * 0.03 }}>
              <div className="relative h-32 bg-slate-800">
                <img src={hospital.image} alt={hospital.name} className="w-full h-full object-cover opacity-70" />
                <div className="absolute top-3 right-3">
                  {hospital.openNow ? <Badge className="text-[10px] bg-emerald-500/15 text-emerald-400 border-0">Open</Badge> : <Badge className="text-[10px] bg-white/10 text-slate-400 border-0">Closed</Badge>}
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-medium text-white text-sm mb-0.5">{hospital.name}</h3>
                <p className="text-slate-500 text-xs mb-2">{hospital.type}</p>
                <div className="flex items-center gap-3 mb-3 text-xs">
                  <div className="flex items-center gap-1"><Star className="w-3 h-3 text-amber-400 fill-amber-400" /><span className="text-white">{hospital.rating}</span></div>
                  <div className="flex items-center gap-1 text-slate-400"><MapPin className="w-3 h-3" />{hospital.distance}</div>
                </div>
                <div className="space-y-1 mb-3 text-xs text-slate-400">
                  <div className="flex items-center gap-1.5"><Navigation className="w-3 h-3" />{hospital.address}</div>
                  <div className="flex items-center gap-1.5"><Phone className="w-3 h-3" />{hospital.phone}</div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" className="flex-1 btn-primary text-xs">Directions <ExternalLink className="w-3 h-3 ml-1" /></Button>
                  <Button size="sm" variant="outline" className="border-white/10 text-slate-300 hover:bg-white/5 px-2.5"><Phone className="w-3.5 h-3.5" /></Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredHospitals.length === 0 && (
          <div className="text-center py-12">
            <Building2 className="w-10 h-10 text-slate-600 mx-auto mb-3" />
            <p className="text-slate-400">No hospitals found</p>
          </div>
        )}
      </div>
    </div>
  );

  // Auth Modal
  const AuthModal = () => (
    <Dialog open={showAuthModal} onOpenChange={setShowAuthModal}>
      <DialogContent className="sm:max-w-md glass-card border-white/10 text-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-center">{authMode === "login" ? "Welcome Back" : "Create Account"}</DialogTitle>
          <DialogDescription className="text-center text-slate-400 text-sm">{authMode === "login" ? "Sign in to continue" : "Join HealthBot AI"}</DialogDescription>
        </DialogHeader>
        <Tabs value={authMode} onValueChange={(v) => setAuthMode(v as "login" | "register")}>
          <TabsList className="grid w-full grid-cols-2 bg-white/5 mb-5 h-9">
            <TabsTrigger value="login" className="data-[state=active]:bg-indigo-500 data-[state=active]:text-white text-xs">Login</TabsTrigger>
            <TabsTrigger value="register" className="data-[state=active]:bg-indigo-500 data-[state=active]:text-white text-xs">Register</TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <form onSubmit={handleLogin} className="space-y-3">
              <div><Label className="text-slate-300 text-xs">Email</Label><div className="relative mt-1"><Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" /><Input type="email" value={authEmail} onChange={(e) => setAuthEmail(e.target.value)} placeholder="you@example.com" className="pl-9 bg-white/5 border-white/10 text-white placeholder:text-slate-500" required /></div></div>
              <div><Label className="text-slate-300 text-xs">Password</Label><div className="relative mt-1"><Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" /><Input type={showPassword ? "text" : "password"} value={authPassword} onChange={(e) => setAuthPassword(e.target.value)} placeholder="••••••••" className="pl-9 pr-9 bg-white/5 border-white/10 text-white placeholder:text-slate-500" required /><button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white">{showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}</button></div></div>
              <Button type="submit" disabled={authLoading} className="w-full btn-primary">{authLoading ? "Authenticating..." : "Sign In"} <ArrowRight className="w-4 h-4 ml-1.5" /></Button>
            </form>
          </TabsContent>
          <TabsContent value="register">
            <form onSubmit={handleRegister} className="space-y-3">
              <div><Label className="text-slate-300 text-xs">Full Name</Label><div className="relative mt-1"><User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" /><Input type="text" value={authName} onChange={(e) => setAuthName(e.target.value)} placeholder="John Doe" className="pl-9 bg-white/5 border-white/10 text-white placeholder:text-slate-500" required /></div></div>
              <div><Label className="text-slate-300 text-xs">Email</Label><div className="relative mt-1"><Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" /><Input type="email" value={authEmail} onChange={(e) => setAuthEmail(e.target.value)} placeholder="you@example.com" className="pl-9 bg-white/5 border-white/10 text-white placeholder:text-slate-500" required /></div></div>
              <div><Label className="text-slate-300 text-xs">Password</Label><div className="relative mt-1"><Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" /><Input type={showPassword ? "text" : "password"} value={authPassword} onChange={(e) => setAuthPassword(e.target.value)} placeholder="••••••••" className="pl-9 pr-9 bg-white/5 border-white/10 text-white placeholder:text-slate-500" required /><button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white">{showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}</button></div></div>
              <Button type="submit" disabled={authLoading} className="w-full btn-primary">{authLoading ? "Creating..." : "Create Account"} <ArrowRight className="w-4 h-4 ml-1.5" /></Button>
            </form>
          </TabsContent>
        </Tabs>
        <div className="relative my-4"><Separator className="bg-white/10" /><span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#161b2e] px-2 text-xs text-slate-500">or</span></div>
        <div className="grid grid-cols-2 gap-2">
          <Button variant="outline" size="sm" className="border-white/10 text-slate-300 hover:bg-white/5"><svg className="w-4 h-4 mr-1.5" viewBox="0 0 24 24"><path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>Google</Button>
          <Button variant="outline" size="sm" className="border-white/10 text-slate-300 hover:bg-white/5"><svg className="w-4 h-4 mr-1.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>GitHub</Button>
        </div>
      </DialogContent>
    </Dialog>
  );

  // ============================================
  // Render
  // ============================================
  return (
    <div className="min-h-screen bg-[#0c0f1a]">
      {AppNavigation()}
      <AnimatePresence mode="wait">
        <motion.div key={currentPage} variants={fadeIn} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.2 }}>
          {currentPage === "landing" && LandingPage()}
          {currentPage === "chat" && ChatPage()}
          {currentPage === "profile" && ProfilePage()}
          {currentPage === "doctors" && DoctorsPage()}
          {currentPage === "hospitals" && HospitalsPage()}
        </motion.div>
      </AnimatePresence>
      {AuthModal()}
    </div>
  );
}
