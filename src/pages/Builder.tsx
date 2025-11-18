import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Briefcase, Link2, Palette, Eye, Save, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Builder = () => {
  const navigate = useNavigate();
  const [cardData, setCardData] = useState({
    name: "John Doe",
    role: "Creative Director",
    bio: "Passionate about design and innovation",
    company: "AJ STUDIOZ",
    email: "john@ajstudioz.com",
    phone: "+1 234 567 8900",
  });

  const handleSave = () => {
    toast.success("Card saved successfully!");
  };

  const handlePreview = () => {
    navigate("/preview");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border backdrop-blur-sm sticky top-0 z-50 bg-background/80">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div 
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <Sparkles className="w-8 h-8 text-primary" />
            <span className="text-2xl font-bold text-gradient-gold">AJ STUDIOZ</span>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={handlePreview}>
              <Eye className="w-4 h-4 mr-2" />
              Preview
            </Button>
            <Button onClick={handleSave} className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Save className="w-4 h-4 mr-2" />
              Save Card
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Card Builder</h1>
          <p className="text-muted-foreground">Create your perfect digital business card</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Editor Panel */}
          <div className="space-y-6">
            <Tabs defaultValue="profile" className="w-full">
              <TabsList className="grid w-full grid-cols-4 bg-secondary">
                <TabsTrigger value="profile">
                  <User className="w-4 h-4 mr-2" />
                  Profile
                </TabsTrigger>
                <TabsTrigger value="contact">
                  <Briefcase className="w-4 h-4 mr-2" />
                  Contact
                </TabsTrigger>
                <TabsTrigger value="links">
                  <Link2 className="w-4 h-4 mr-2" />
                  Links
                </TabsTrigger>
                <TabsTrigger value="theme">
                  <Palette className="w-4 h-4 mr-2" />
                  Theme
                </TabsTrigger>
              </TabsList>

              <TabsContent value="profile" className="space-y-4 mt-6">
                <Card className="p-6 bg-card border-border">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={cardData.name}
                        onChange={(e) => setCardData({ ...cardData, name: e.target.value })}
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label htmlFor="role">Role / Title</Label>
                      <Input
                        id="role"
                        value={cardData.role}
                        onChange={(e) => setCardData({ ...cardData, role: e.target.value })}
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label htmlFor="company">Company</Label>
                      <Input
                        id="company"
                        value={cardData.company}
                        onChange={(e) => setCardData({ ...cardData, company: e.target.value })}
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea
                        id="bio"
                        value={cardData.bio}
                        onChange={(e) => setCardData({ ...cardData, bio: e.target.value })}
                        className="mt-2"
                        rows={4}
                      />
                    </div>
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="contact" className="space-y-4 mt-6">
                <Card className="p-6 bg-card border-border">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={cardData.email}
                        onChange={(e) => setCardData({ ...cardData, email: e.target.value })}
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        value={cardData.phone}
                        onChange={(e) => setCardData({ ...cardData, phone: e.target.value })}
                        className="mt-2"
                      />
                    </div>
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="links" className="space-y-4 mt-6">
                <Card className="p-6 bg-card border-border">
                  <p className="text-muted-foreground">Social links coming soon...</p>
                </Card>
              </TabsContent>

              <TabsContent value="theme" className="space-y-4 mt-6">
                <Card className="p-6 bg-card border-border">
                  <p className="text-muted-foreground">Theme customization coming soon...</p>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Live Preview Panel */}
          <div className="lg:sticky lg:top-24 h-fit">
            <Card className="p-8 bg-card border-border">
              <div className="text-center space-y-6">
                <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center shadow-gold-glow">
                  <span className="text-4xl font-bold text-primary-foreground">
                    {cardData.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                  </span>
                </div>

                <div className="space-y-2">
                  <h2 className="text-3xl font-bold">{cardData.name}</h2>
                  <p className="text-primary font-medium">{cardData.role}</p>
                  <p className="text-muted-foreground">{cardData.company}</p>
                </div>

                <p className="text-muted-foreground">{cardData.bio}</p>

                <div className="space-y-3 pt-4">
                  <Button 
                    variant="outline" 
                    className="w-full border-primary/20 hover:bg-primary/5"
                  >
                    {cardData.email}
                  </Button>
                  <Button 
                    variant="outline"
                    className="w-full border-primary/20 hover:bg-primary/5"
                  >
                    {cardData.phone}
                  </Button>
                </div>

                <div className="flex justify-center gap-3 pt-4">
                  {[...Array(4)].map((_, i) => (
                    <div 
                      key={i} 
                      className="w-12 h-12 rounded-full bg-secondary hover:bg-primary/20 transition-smooth cursor-pointer flex items-center justify-center"
                    >
                      <Link2 className="w-5 h-5 text-muted-foreground" />
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Builder;
