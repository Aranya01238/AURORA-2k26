import { Card, CardContent } from "@/components/ui/card";

interface TeamMemberCardProps {
  name: string;
  role: string;
  image?: string;
}

const TeamMemberCard = ({ name, role, image }: TeamMemberCardProps) => {
  return (
    <Card className="magical-border bg-card/80 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:magical-glow group overflow-hidden">
      <CardContent className="p-0">
        <div className="aspect-square relative overflow-hidden">
          {image ? (
            <img
              src={image}
              alt={name}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-secondary to-accent/50 flex items-center justify-center">
              <span className="text-6xl font-bold text-primary/30">
                {name.charAt(0)}
              </span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        </div>
        <div className="p-4 text-center">
          <h3 className="text-lg font-bold text-foreground mb-1">{name}</h3>
          <p className="text-sm text-primary">{role}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default TeamMemberCard;
