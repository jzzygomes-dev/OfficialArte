const categories = [
  { name: "CURIOSIDADE", count: 1 },
  { name: "ENTREVISTA", count: 23 },
  { name: "FAMA", count: 195 },
  { name: "LANÇAMENTO", count: 7 },
  { name: "SOCIEDADE", count: 61 },
  { name: "AGENDAS", count: 14 },
];

const CategoriesFooter = () => {
  return (
    <section className="container mx-auto py-8">
      <span className="section-title mb-4">CATEGORIAS POPULARES</span>
      <div className="mt-4 divide-y divide-border">
        {categories.map((cat) => (
          <a
            key={cat.name}
            href="#"
            className="flex items-center justify-between py-2.5 hover:text-primary transition-colors"
          >
            <span className="text-sm font-semibold text-foreground uppercase tracking-wide font-body">
              {cat.name}
            </span>
            <span className="text-muted-foreground text-sm">{cat.count}</span>
          </a>
        ))}
      </div>
    </section>
  );
};

export default CategoriesFooter;
