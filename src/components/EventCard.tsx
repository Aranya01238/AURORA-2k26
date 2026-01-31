import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Users, Clock } from "lucide-react";
import { Link } from "react-router-dom";

interface EventCardProps {
  date: string;
  day: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  teamSize?: string;
  duration?: string;
  house: 'gryffindor' | 'slytherin' | 'ravenclaw' | 'hufflepuff';
  link: string;
}

const houseColors = {
  gryffindor: 'from-red-700 to-red-900',
  slytherin: 'from-green-700 to-green-900',
  ravenclaw: 'from-blue-700 to-blue-900',
  hufflepuff: 'from-yellow-600 to-yellow-800',
};

const houseBorders = {
  gryffindor: 'hover:border-red-500/50',
  slytherin: 'hover:border-green-500/50',
  ravenclaw: 'hover:border-blue-500/50',
  hufflepuff: 'hover:border-yellow-500/50',
};

const EventCard = ({ date, day, title, description, icon, teamSize, duration, house, link }: EventCardProps) => {
  return (
    <Link to={link} className="block">
      <Card className={`magical-border bg-card/80 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:magical-glow ${houseBorders[house]} group cursor-pointer`}>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between mb-2">
            <Badge variant="secondary" className={`bg-gradient-to-r ${houseColors[house]} text-white border-0`}>
              {day}
            </Badge>
            <div className="flex items-center gap-1 text-muted-foreground text-sm">
              <Calendar className="w-4 h-4" />
              {date}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-full bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
              {icon}
            </div>
            <CardTitle className="text-xl text-foreground">{title}</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <CardDescription className="text-muted-foreground text-base mb-4">
            {description}
          </CardDescription>
          <div className="flex flex-wrap gap-3">
            {teamSize && (
              <div className="flex items-center gap-1 text-sm text-muted-foreground bg-black/20 px-2 py-1 rounded-full">
                <Users className="w-4 h-4 text-primary" />
                <span>{teamSize}</span>
              </div>
            )}
            {duration && (
              <div className="flex items-center gap-1 text-sm text-muted-foreground bg-black/20 px-2 py-1 rounded-full">
                <Clock className="w-4 h-4 text-primary" />
                <span>{duration}</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default EventCard;
