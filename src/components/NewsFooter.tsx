const NewsFooter = () => {
  return (
    <footer className="bg-accent text-accent-foreground py-6 mt-8">
      <div className="container mx-auto text-center">
        <p className="font-display text-lg font-bold uppercase text-primary">
          Musico<span className="text-accent-foreground">Mania</span> News
        </p>
        <p className="text-accent-foreground/60 text-xs mt-1">
          © 2026 MusicoMania News. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
};

export default NewsFooter;
