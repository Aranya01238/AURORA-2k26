import TeamMemberCard from "./TeamMemberCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import HarryPotterBackground from "./HarryPotterBackground";

const organizingTeam = [
  { name: "Add Name", role: "Event Head" },
  { name: "Add Name", role: "Event Co-Head" },
  { name: "Add Name", role: "Technical Lead" },
  { name: "Add Name", role: "Creative Lead" },
  { name: "Add Name", role: "Logistics Head" },
  { name: "Add Name", role: "PR & Marketing Head" },
];

const coreTeam = [
  { name: "Add Name", role: "Core Member" },
  { name: "Add Name", role: "Core Member" },
  { name: "Add Name", role: "Core Member" },
  { name: "Add Name", role: "Core Member" },
  { name: "Add Name", role: "Core Member" },
  { name: "Add Name", role: "Core Member" },
  { name: "Add Name", role: "Core Member" },
  { name: "Add Name", role: "Core Member" },
];

const volunteers = [
  { name: "Add Name", role: "Volunteer" },
  { name: "Add Name", role: "Volunteer" },
  { name: "Add Name", role: "Volunteer" },
  { name: "Add Name", role: "Volunteer" },
  { name: "Add Name", role: "Volunteer" },
  { name: "Add Name", role: "Volunteer" },
  { name: "Add Name", role: "Volunteer" },
  { name: "Add Name", role: "Volunteer" },
  { name: "Add Name", role: "Volunteer" },
  { name: "Add Name", role: "Volunteer" },
  { name: "Add Name", role: "Volunteer" },
  { name: "Add Name", role: "Volunteer" },
];

const TeamSection = () => {
  return (
    <section id="team" className="py-24 px-4 relative overflow-hidden">
      {/* Harry Potter Background */}
      <HarryPotterBackground />
      
      <div className="max-w-7xl mx-auto relative" style={{ zIndex: 10 }}>
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gradient-gold mb-4">
            The Wizards Behind The Magic
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Meet the talented team making AURORA 2K26 a reality
          </p>
        </div>

        {/* Team tabs */}
        <Tabs defaultValue="organizing" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-12 bg-muted/50">
            <TabsTrigger value="organizing" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Organizing Team
            </TabsTrigger>
            <TabsTrigger value="core" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Core Team
            </TabsTrigger>
            <TabsTrigger value="volunteers" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Volunteers
            </TabsTrigger>
          </TabsList>

          <TabsContent value="organizing">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {organizingTeam.map((member, index) => (
                <TeamMemberCard key={index} {...member} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="core">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6">
              {coreTeam.map((member, index) => (
                <TeamMemberCard key={index} {...member} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="volunteers">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {volunteers.map((member, index) => (
                <TeamMemberCard key={index} {...member} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default TeamSection;
