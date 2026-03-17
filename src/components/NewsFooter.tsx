import logoF from "@/assets/oa-logo-f.png";

const NewsFooter = () => {
  return (
    <footer className="bg-accent text-accent-foreground py-6 mt-8">
      <div className="container mx-auto flex flex-col items-center gap-3">
        <img src={logoF} alt="Official Arte Entretenimento" className="h-16 w-auto" />
        <p className="text-accent-foreground/60 text-xs">
          © 2026 Official Arte Entretenimento. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
};

export default NewsFooter;
