import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMember } from '@/integrations';
import { BaseCrudService } from '@/integrations';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { PerfisdeUsurios } from '@/entities';

export default function SignUpPage() {
  const navigate = useNavigate();
  const { actions } = useMember();
  const [profileType, setProfileType] = useState<'empresa' | 'contratante' | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    companyDescription: '',
    contractorExperience: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profileType) {
      setError('Por favor, selecione um tipo de perfil');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Create user profile in CMS
      const profileData: PerfisdeUsurios = {
        _id: crypto.randomUUID(),
        profileType,
        userName: formData.name,
        userEmail: formData.email,
        companyDescription: profileType === 'empresa' ? formData.companyDescription : undefined,
        contractorExperience: profileType === 'contratante' ? formData.contractorExperience : undefined,
      };

      await BaseCrudService.create('userprofiles', profileData);

      // Redirect to login to authenticate
      navigate('/login', { state: { email: formData.email } });
    } catch (err) {
      setError('Erro ao criar perfil. Tente novamente.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <Card className="w-full max-w-md p-8 bg-secondary border-secondary-foreground/20">
          <h1 className="text-3xl font-bold text-primary-foreground mb-2 font-heading">Criar Conta</h1>
          <p className="text-secondary-foreground mb-6">Escolha seu tipo de perfil para começar</p>

          {/* Profile Type Selection */}
          {!profileType ? (
            <div className="space-y-4 mb-6">
              <button
                onClick={() => setProfileType('empresa')}
                className="w-full p-4 border-2 border-secondary-foreground/30 rounded-lg hover:border-secondary-foreground/60 transition text-left"
              >
                <h3 className="font-bold text-primary-foreground">Empresa</h3>
                <p className="text-sm text-secondary-foreground">Publique vagas e encontre candidatos</p>
              </button>
              <button
                onClick={() => setProfileType('contratante')}
                className="w-full p-4 border-2 border-secondary-foreground/30 rounded-lg hover:border-secondary-foreground/60 transition text-left"
              >
                <h3 className="font-bold text-primary-foreground">Contratante</h3>
                <p className="text-sm text-secondary-foreground">Encontre oportunidades de trabalho</p>
              </button>
            </div>
          ) : (
            <>
              <button
                onClick={() => setProfileType(null)}
                className="text-sm text-secondary-foreground hover:text-primary-foreground mb-4 transition"
              >
                ← Voltar
              </button>

              <form onSubmit={handleSignUp} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-primary-foreground mb-2">
                    Nome {profileType === 'empresa' ? 'da Empresa' : 'Completo'}
                  </label>
                  <Input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder={profileType === 'empresa' ? 'Sua Empresa' : 'Seu Nome'}
                    required
                    className="bg-background border-secondary-foreground/30 text-primary-foreground"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-primary-foreground mb-2">
                    Email
                  </label>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="seu@email.com"
                    required
                    className="bg-background border-secondary-foreground/30 text-primary-foreground"
                  />
                </div>

                {profileType === 'empresa' && (
                  <div>
                    <label className="block text-sm font-medium text-primary-foreground mb-2">
                      Descrição da Empresa
                    </label>
                    <textarea
                      name="companyDescription"
                      value={formData.companyDescription}
                      onChange={handleInputChange}
                      placeholder="Descreva sua empresa..."
                      rows={3}
                      className="w-full px-3 py-2 bg-background border border-secondary-foreground/30 rounded-md text-primary-foreground placeholder-secondary-foreground/50 focus:outline-none focus:border-secondary-foreground"
                    />
                  </div>
                )}

                {profileType === 'contratante' && (
                  <div>
                    <label className="block text-sm font-medium text-primary-foreground mb-2">
                      Experiência Profissional
                    </label>
                    <textarea
                      name="contractorExperience"
                      value={formData.contractorExperience}
                      onChange={handleInputChange}
                      placeholder="Descreva sua experiência..."
                      rows={3}
                      className="w-full px-3 py-2 bg-background border border-secondary-foreground/30 rounded-md text-primary-foreground placeholder-secondary-foreground/50 focus:outline-none focus:border-secondary-foreground"
                    />
                  </div>
                )}

                {error && (
                  <div className="p-3 bg-destructive/20 border border-destructive rounded text-destructive text-sm">
                    {error}
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  {loading ? 'Criando conta...' : 'Criar Conta'}
                </Button>
              </form>

              <p className="text-center text-sm text-secondary-foreground mt-4">
                Já tem conta?{' '}
                <button
                  onClick={() => navigate('/login')}
                  className="text-secondary-foreground hover:text-primary-foreground transition font-medium"
                >
                  Faça login
                </button>
              </p>
            </>
          )}
        </Card>
      </main>
      <Footer />
    </div>
  );
}
