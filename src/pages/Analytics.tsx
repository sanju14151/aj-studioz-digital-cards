/**
 * Analytics Page - Track card performance and engagement
 */

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DashboardSidebar } from '@/components/DashboardSidebar';
import { 
  BarChart3, 
  TrendingUp, 
  Eye, 
  MousePointerClick, 
  Download,
  Users,
  Calendar,
  Globe
} from 'lucide-react';

const Analytics = () => {
  const navigate = useNavigate();

  const stats = [
    { label: 'Total Views', value: '0', icon: Eye, color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { label: 'Profile Clicks', value: '0', icon: MousePointerClick, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
    { label: 'Contact Saves', value: '0', icon: Download, color: 'text-purple-500', bg: 'bg-purple-500/10' },
    { label: 'Unique Visitors', value: '0', icon: Users, color: 'text-amber-500', bg: 'bg-amber-500/10' },
  ];

  return (
    <div className="flex min-h-screen bg-background">
      <DashboardSidebar />
      
      <div className="flex-1 flex flex-col">
        <header className="border-b border-border/50 backdrop-blur-xl sticky top-0 z-40 bg-background/80">
          <div className="container mx-auto px-6 py-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <BarChart3 className="w-6 h-6 text-primary" />
              <h1 className="text-2xl font-bold">
                <span className="text-gradient-gold">Analytics</span>
              </h1>
            </div>
            
            <div className="flex gap-3">
              <Button variant="outline">
                <Calendar className="w-4 h-4 mr-2" />
                Last 30 Days
              </Button>
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Export Report
              </Button>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-6 py-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {/* Stats Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="p-6 bg-gradient-to-br from-card to-secondary/30 border-2 border-border/50">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`p-3 rounded-lg ${stat.bg}`}>
                        <stat.icon className={`w-6 h-6 ${stat.color}`} />
                      </div>
                      <TrendingUp className="w-4 h-4 text-emerald-500" />
                    </div>
                    <div>
                      <p className="text-3xl font-bold mb-1">{stat.value}</p>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Empty State */}
            <Card className="p-12 bg-gradient-to-br from-card to-secondary/30 border-2 border-border/50">
              <div className="text-center">
                <div className="w-32 h-32 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                  <BarChart3 className="w-16 h-16 text-primary" />
                </div>
                
                <h2 className="text-3xl font-bold mb-3">Start Tracking Your Success</h2>
                <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
                  Share your digital card to start seeing analytics. Track views, clicks, and engagement in real-time.
                </p>

                <div className="flex gap-4 justify-center">
                  <Button size="lg" onClick={() => navigate('/dashboard')}>
                    <Eye className="w-5 h-5 mr-2" />
                    View My Cards
                  </Button>
                  <Button size="lg" variant="outline" onClick={() => navigate('/builder')}>
                    Create New Card
                  </Button>
                </div>
              </div>
            </Card>

            {/* Features Grid */}
            <div className="grid md:grid-cols-3 gap-6 mt-8">
              {[
                { icon: Globe, title: 'Geographic Data', desc: 'See where your visitors are from' },
                { icon: Calendar, title: 'Time Analysis', desc: 'Track peak engagement times' },
                { icon: MousePointerClick, title: 'Click Tracking', desc: 'Monitor which links get clicked' },
              ].map((feature, index) => (
                <Card key={index} className="p-6 bg-card border-2 border-border/50">
                  <feature.icon className="w-10 h-10 text-primary mb-4" />
                  <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.desc}</p>
                </Card>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
