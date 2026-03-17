import NewsNavbar from "@/components/NewsNavbar";
import NewsFooter from "@/components/NewsFooter";

const Termos = () => {
  return (
    <div className="min-h-screen bg-background">
      <NewsNavbar />
      <main className="container mx-auto px-4 py-12 max-w-3xl">
        <h1 className="font-display text-3xl md:text-4xl font-extrabold text-foreground uppercase mb-6">
          Termos de Uso
        </h1>

        <div className="space-y-6 text-foreground/80 text-sm leading-relaxed font-body">
          <section>
            <h2 className="font-display text-lg font-bold text-foreground uppercase mb-2">1. Aceitação dos Termos</h2>
            <p>
              Ao aceder e utilizar o site da Official Arte Entretenimento, o utilizador concorda com os presentes termos e condições de uso. Caso não concorde, deverá cessar a utilização do site.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg font-bold text-foreground uppercase mb-2">2. Propriedade Intelectual</h2>
            <p>
              Todo o conteúdo publicado neste site, incluindo textos, imagens, logótipos, vídeos e gráficos, é propriedade da Official Arte Entretenimento ou dos respectivos autores e está protegido por leis de direitos autorais.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg font-bold text-foreground uppercase mb-2">3. Uso do Conteúdo</h2>
            <p>
              A reprodução total ou parcial do conteúdo deste site sem autorização prévia e por escrito é proibida. Citações são permitidas desde que seja dado o devido crédito à fonte.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg font-bold text-foreground uppercase mb-2">4. Responsabilidade</h2>
            <p>
              A Official Arte Entretenimento não se responsabiliza por danos directos ou indirectos decorrentes do uso deste site, incluindo links para sites de terceiros.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg font-bold text-foreground uppercase mb-2">5. Conteúdo do Utilizador</h2>
            <p>
              Comentários e contribuições dos utilizadores devem respeitar as normas de convivência. A Official Arte Entretenimento reserva-se o direito de remover conteúdo ofensivo, discriminatório ou que viole direitos de terceiros.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg font-bold text-foreground uppercase mb-2">6. Alterações aos Termos</h2>
            <p>
              Reservamo-nos o direito de alterar estes termos a qualquer momento. As alterações entram em vigor após a sua publicação no site.
            </p>
          </section>

          <p className="text-muted-foreground text-xs mt-8">
            Última actualização: Março de 2026
          </p>
        </div>
      </main>
      <NewsFooter />
    </div>
  );
};

export default Termos;
