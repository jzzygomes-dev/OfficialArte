import NewsNavbar from "@/components/NewsNavbar";
import NewsFooter from "@/components/NewsFooter";

const Privacidade = () => {
  return (
    <div className="min-h-screen bg-background">
      <NewsNavbar />
      <main className="container mx-auto px-4 py-12 max-w-3xl">
        <h1 className="font-display text-3xl md:text-4xl font-extrabold text-foreground uppercase mb-6">
          Política de Privacidade
        </h1>

        <div className="space-y-6 text-foreground/80 text-sm leading-relaxed font-body">
          <section>
            <h2 className="font-display text-lg font-bold text-foreground uppercase mb-2">1. Recolha de Dados</h2>
            <p>
              A Official Arte Entretenimento recolhe informações pessoais apenas quando fornecidas voluntariamente pelos utilizadores, como nome, endereço de e-mail e dados de contacto através de formulários no nosso site.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg font-bold text-foreground uppercase mb-2">2. Utilização dos Dados</h2>
            <p>
              Os dados recolhidos são utilizados exclusivamente para melhorar a experiência do utilizador, enviar newsletters e comunicações relevantes, e responder a pedidos de contacto.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg font-bold text-foreground uppercase mb-2">3. Protecção dos Dados</h2>
            <p>
              Implementamos medidas de segurança adequadas para proteger as informações pessoais contra acesso não autorizado, alteração, divulgação ou destruição.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg font-bold text-foreground uppercase mb-2">4. Cookies</h2>
            <p>
              O nosso site utiliza cookies para melhorar a experiência de navegação. Os cookies permitem-nos analisar o tráfego do site e personalizar o conteúdo. Pode desactivar os cookies nas definições do seu navegador.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg font-bold text-foreground uppercase mb-2">5. Partilha de Informações</h2>
            <p>
              Não vendemos, trocamos ou transferimos informações pessoais a terceiros sem o consentimento do utilizador, excepto quando exigido por lei.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg font-bold text-foreground uppercase mb-2">6. Direitos do Utilizador</h2>
            <p>
              O utilizador tem o direito de aceder, corrigir ou eliminar os seus dados pessoais a qualquer momento, contactando-nos através dos canais disponíveis na página de contacto.
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

export default Privacidade;
