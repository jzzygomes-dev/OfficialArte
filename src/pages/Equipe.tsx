import NewsNavbar from "@/components/NewsNavbar";
import NewsFooter from "@/components/NewsFooter";
import team1 from "@/assets/ceo.webp";
import team2 from "@/assets/member1.webp";
import team3 from "@/assets/member2.webp";
import team4 from "@/assets/team-4.jpg";

const team = [
  {
    name: "ANTÓNIO LOCE",
    role: "DIRECTOR EXECUTIVO & FUNDADOR",
    description: "Visionário e apaixonado pela música angolana, TONY LOCE fundou a OFFICIAL ARTE ENTRETENIMENTO com o objectivo de dar visibilidade aos artistas locais e internacionais.",
    image: team1,
  },
  {
    name: "NGUINAMAU GARCIA",
    role: "DIRETOR TÉCNICO",
    description: "Músico com mais de 20 anos de experiência. KIAZAYA MÁGNOO Responsável pela linha análise de conteúdos e qualidade do conteúdo publicado.",
    image: team2,
  },
  {
    name: "JÚLIO GOMES",
    role: "DIRECTOR DE CONTEÚDOS DIGITAIS",
    description: "Especialista em media digital e redes sociais, CEO JZZY que o nosso conteúdo chega ao público certo, no momento certo.",
    image: team4,
  },
];

const Equipe = () => {
  return (
    <div className="min-h-screen bg-background">
      <NewsNavbar />
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="font-display text-3xl md:text-4xl font-extrabold text-foreground uppercase mb-2">
          Nossa Equipe
        </h1>
        <p className="text-muted-foreground text-sm font-body mb-10">
          Conheça as pessoas por trás da Official Arte Entretenimento.
        </p>

        <div className="grid sm:grid-cols-2 gap-6">
          {team.map((member) => (
            <div
              key={member.name}
              className="bg-card border border-border rounded-xl overflow-hidden hover:border-primary/50 transition-colors"
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-5">
                <h3 className="font-display text-lg font-bold text-foreground">{member.name}</h3>
                <p className="text-primary text-xs font-display font-bold uppercase tracking-wide mt-1">
                  {member.role}
                </p>
                <p className="text-foreground/70 text-sm font-body mt-3 leading-relaxed">
                  {member.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </main>
      <NewsFooter />
    </div>
  );
};

export default Equipe;
