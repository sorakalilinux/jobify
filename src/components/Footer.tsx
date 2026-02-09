import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full bg-secondary border-t-2 border-primary">
      <div className="max-w-[100rem] mx-auto px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <h3 className="font-heading text-3xl uppercase text-primary mb-6 tracking-wider">
              JobMatch
            </h3>
            <p className="font-paragraph text-foreground leading-relaxed">
              Conectando talentos excepcionais com empresas inovadoras desde 2026.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading text-xl uppercase text-primary mb-6 tracking-wider">
              Links Rápidos
            </h4>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="font-paragraph text-foreground hover:text-primary transition-all">
                  Início
                </Link>
              </li>
              <li>
                <Link to="/vagas" className="font-paragraph text-foreground hover:text-primary transition-all">
                  Vagas
                </Link>
              </li>
              <li>
                <Link to="/empresas" className="font-paragraph text-foreground hover:text-primary transition-all">
                  Empresas
                </Link>
              </li>
            </ul>
          </div>

          {/* For Companies */}
          <div>
            <h4 className="font-heading text-xl uppercase text-primary mb-6 tracking-wider">
              Para Empresas
            </h4>
            <ul className="space-y-3">
              <li>
                <Link to="/empresas" className="font-paragraph text-foreground hover:text-primary transition-all">
                  Publicar Vaga
                </Link>
              </li>
              <li>
                <Link to="/empresas" className="font-paragraph text-foreground hover:text-primary transition-all">
                  Ver Candidaturas
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading text-xl uppercase text-primary mb-6 tracking-wider">
              Contato
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                <span className="font-paragraph text-foreground">contato@jobmatch.com</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                <span className="font-paragraph text-foreground">+55 11 9999-9999</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                <span className="font-paragraph text-foreground">São Paulo, Brasil</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-primary">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="font-paragraph text-foreground text-sm">
              © 2026 JobMatch. Todos os direitos reservados.
            </p>
            <div className="flex gap-6">
              <Link to="#" className="font-paragraph text-foreground text-sm hover:text-primary transition-all">
                Política de Privacidade
              </Link>
              <Link to="#" className="font-paragraph text-foreground text-sm hover:text-primary transition-all">
                Termos de Uso
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
