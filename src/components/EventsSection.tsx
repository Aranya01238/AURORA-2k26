import EventCard from "./EventCard";
import { Film, Code, Mic2, HelpCircle, Lightbulb } from "lucide-react";
import HarryPotterBackground from "./HarryPotterBackground";

const events = [
  {
    date: "23rd Feb",
    day: "Day 1",
    title: "Documentary Event",
    description: "Showcase your storytelling prowess through the magical art of documentary filmmaking. Capture the essence of magic and wonder.",
    icon: <Film className="w-6 h-6" />,
    house: 'gryffindor' as const,
    link: "/events/documentary",
  },
  {
    date: "24th Feb",
    day: "Day 2",
    title: "Coding Competition",
    description: "Cast your programming spells and solve challenging problems. Let your code create magic!",
    icon: <Code className="w-6 h-6" />,
    house: 'ravenclaw' as const,
    link: "/events/coding",
  },
  {
    date: "25th Feb",
    day: "Day 3",
    title: "Standup Comedy Competition",
    description: "Bring laughter to the Great Hall with your comedic wizardry. Make the crowd roar like a Hungarian Horntail!",
    icon: <Mic2 className="w-6 h-6" />,
    house: 'hufflepuff' as const,
    link: "/events/comedy",
  },
  {
    date: "26th Feb",
    day: "Day 4",
    title: "Quiz Competition",
    description: "Test your knowledge across magical and muggle realms in this open house quiz challenge.",
    icon: <HelpCircle className="w-6 h-6" />,
    teamSize: "5 Members Team",
    house: 'slytherin' as const,
    link: "/events/quiz",
  },
  {
    date: "27th Feb",
    day: "Day 5",
    title: "Ideathon",
    description: "A 4-hour hackathon to brew innovative ideas and create magical solutions. Innovation meets imagination!",
    icon: <Lightbulb className="w-6 h-6" />,
    teamSize: "3 Members Team",
    duration: "4 Hours",
    house: 'gryffindor' as const,
    link: "/events/ideathon",
  },
];

const EventsSection = () => {
  return (
    <section id="events" className="py-24 px-4 relative overflow-hidden">
      {/* Magical Objects Harry Potter Background */}
      <HarryPotterBackground />
      
      <div className="max-w-7xl mx-auto relative" style={{ zIndex: 10 }}>
        {/* Section header with enhanced styling */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gradient-gold mb-4 drop-shadow-2xl">
            🏰 The Magical Events 🏰
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto bg-black/30 backdrop-blur-sm px-6 py-3 rounded-full">
            Five days of magical competitions awaiting the bravest wizards and witches
          </p>
        </div>

        {/* Events grid with magical styling */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event, index) => (
            <div key={index} className="transform hover:scale-105 transition-all duration-300">
              <EventCard {...event} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EventsSection;
