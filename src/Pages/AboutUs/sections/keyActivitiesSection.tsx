import { Code, Users, Mic, Rocket } from "lucide-react";

export default function KeyActivities() {
  const stats = [
    {
      value: "12+",
      label: "Tech Activities",
      sub: "Code Wars, SQL Wars, Debugging Battles",
      icon: <Code className="w-12 h-12 text-primary" />,
    },
    {
      value: "08+",
      label: "Non-Tech Events",
      sub: "Debates, Treasure Hunts, Case Studies",
      icon: <Users className="w-12 h-12 text-primary" />,
    },
    {
      value: "15+",
      label: "Expert & Senior Talks",
      sub: "Industry experts & senior mentorship",
      icon: <Mic className="w-12 h-12 text-primary" />,
    },
    {
      value: "04",
      label: "Hackathons",
      sub: "Club-led & institute-wide hackathons",
      icon: <Rocket className="w-12 h-12 text-primary" />,
    },
  ];

  return (
    <section id="activities" className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-2 gap-20">

        {/* LEFT — Heading + Description */}
        <div>
          <div className="flex items-center gap-4 mb-4">
            <div className="h-[2px] w-12 bg-primary"></div>
            <p className="text-sm tracking-widest text-primary font-semibold">
              OUR ACTIVITIES
            </p>
          </div>

          <h2 className="text-5xl font-semibold leading-tight text-foreground mb-6">
            What We Do
          </h2>

          <p className="text-base text-muted-foreground leading-relaxed max-w-md">
            The Tech Talk Club organizes a dynamic blend of technical competitions,
            non-technical activities, inspiring expert talks, and large-scale 
            hackathons — fostering a culture of innovation, collaboration, and 
            continuous learning.
          </p>
        </div>

        {/* RIGHT — Lucide Grid */}
        <div className="grid grid-cols-2 gap-12">
          {stats.map((item, index) => (
            <div key={index} className="space-y-4">

              {/* Icon */}
              <div className="rounded-xl flex items-center justify-center h-40 bg-card border border-border shadow-sm">
                {item.icon}
              </div>

              {/* Stat + Title */}
              <div>
                <h3 className="text-4xl font-bold text-foreground">{item.value}</h3>
                <p className="text-sm font-medium text-muted-foreground">
                  {item.label}
                </p>
                <p className="text-xs text-muted-foreground mt-1">{item.sub}</p>
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
