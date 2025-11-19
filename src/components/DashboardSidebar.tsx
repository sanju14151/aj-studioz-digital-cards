/**
 * Dashboard Sidebar - wcard.io style navigation
 * Provides main navigation for all dashboard features
 */

import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/contexts/AuthContext';
import { 
  CreditCard,
  Radio,
  QrCode,
  Users,
  MessageSquare,
  Video,
  Mail,
  BarChart3,
  Zap,
  ChevronDown
} from 'lucide-react';
import { cn } from '@/lib/utils';

const menuItems = [
  {
    title: 'My Profile',
    icon: null,
    path: '/dashboard/profile',
    isHeader: true
  },
  {
    title: 'Web Cards',
    icon: CreditCard,
    path: '/dashboard',
  },
  {
    title: 'NFC Cards',
    icon: Radio,
    path: '/dashboard/nfc-cards',
  },
  {
    title: 'QR Codes',
    icon: QrCode,
    path: '/dashboard/qr-codes',
  },
  {
    title: 'Contacts',
    icon: Users,
    path: '/dashboard/contacts',
  },
  {
    title: 'My Leads',
    icon: MessageSquare,
    path: '/dashboard/leads',
  },
  {
    title: 'Virtual Background',
    icon: Video,
    path: '/dashboard/virtual-background',
  },
  {
    title: 'Email Signature',
    icon: Mail,
    path: '/dashboard/email-signature',
  },
  {
    title: 'Analytics',
    icon: BarChart3,
    path: '/dashboard/analytics',
  },
  {
    title: 'Integrations',
    icon: Zap,
    path: '/dashboard/integrations',
  },
];

export const DashboardSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/auth');
  };

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  return (
    <motion.aside
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="w-56 h-screen bg-gradient-to-br from-indigo-600 via-blue-600 to-cyan-500 flex flex-col sticky top-0 text-white shadow-2xl"
    >
      {/* Logo */}
      <div className="p-5 flex items-center justify-center border-b border-white/10">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center p-1">
            <img src="/AJ.svg" alt="AJ STUDIOZ" className="w-full h-full" />
          </div>
          <span className="font-bold text-lg">AJ STUDIOZ</span>
        </div>
      </div>

      {/* User Profile Button */}
      <div className="p-3">
        <button 
          onClick={() => navigate('/dashboard/profile')}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/10 transition-all"
        >
          <Avatar className="w-8 h-8 ring-2 ring-white/30">
            <AvatarImage src={user?.avatarUrl} />
            <AvatarFallback className="bg-white text-emerald-600 text-sm font-semibold">
              {user?.fullName.split(' ').map(n => n[0]).join('').toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 text-left">
            <p className="font-semibold text-sm truncate">{user?.fullName.toUpperCase()}</p>
          </div>
          <ChevronDown className="w-4 h-4 opacity-70" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-2 px-3 space-y-0.5">
        <div className="px-3 py-2 text-xs font-semibold text-white/60 uppercase tracking-wider">
          My Profile
        </div>
        
        {menuItems.map((item) => {
          if (item.isHeader) return null;
          
          const Icon = item.icon;
          const active = isActive(item.path);
          
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all text-left",
                active 
                  ? "bg-white/20 text-white font-medium shadow-lg" 
                  : "text-white/90 hover:bg-white/10"
              )}
            >
              {Icon && <Icon className="w-5 h-5" />}
              <span className="text-sm">{item.title}</span>
            </button>
          );
        })}
      </nav>

      {/* Upgrade Banner */}
      <div className="p-4 m-3 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl shadow-lg">
        <div className="text-center mb-3">
          <h3 className="font-bold text-white text-base mb-1">Upgrade Now</h3>
          <p className="text-xs text-white/90">
            Get premium features and unlock full potential
          </p>
        </div>
        <Button 
          size="sm" 
          className="w-full bg-white text-orange-600 hover:bg-white/90 font-semibold shadow-md"
          onClick={() => navigate('/pricing')}
        >
          Upgrade Now
        </Button>
      </div>
    </motion.aside>
  );
};

export default DashboardSidebar;
