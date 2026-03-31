import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Briefcase, DollarSign, Calendar, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { BaseCrudService } from '@/integrations';
import { ListagemdeVagas } from '@/entities';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { NetworkParticles } from '@/components/3D';
import PageTransition from '@/components/PageTransition';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export default function VagaDetalhePage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [job, setJob] = useState<ListagemdeVagas | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadJob = async () => {
      try {
        const data = await BaseCrudService.getById<ListagemdeVagas>('joblistings', id!);
        setJob(data);
      } catch (error) {
        console.error('Error loading job:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadJob();
  }, [id]);

  const formatDate = (date: Date | string | undefined) => {
    if (!date) return 'Data não disponível';
    try {
      const dateObj = typeof date === 'string' ? new Date(date) : date;
      return format(dateObj, "dd 'de' MMMM 'de' yyyy", { locale: ptBR });
    } catch {
      return 'Data não disponível';
    }
  };

  const handleApply = () => {
    navigate(`/candidatar/${id}`);
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-background overflow-hidden">
        <NetworkParticles />
        <Header />

      <div className="pt-32 pb-20 px-6 md:px-12 max-w-[100rem] mx-auto">
        <div className="min-h-[600px]">
          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <LoadingSpinner />
            </div>
          ) : !job ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <h2 className="font-heading text-4xl font-bold text-foreground mb-4">
                Vaga não encontrada
              </h2>
              <p className="font-paragraph text-surface text-lg mb-8">
                A vaga que você está procurando não existe ou foi removida.
              </p>
              <Link to="/vagas">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-secondary-foreground text-background font-heading font-bold px-8 py-4 text-lg rounded-lg inline-flex items-center gap-2"
                >
                  <ArrowLeft className="w-5 h-5" />
                  Voltar para Vagas
                </motion.button>
              </Link>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {/* Back Button */}
              <Link to="/vagas">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="font-heading font-bold text-secondary-foreground hover:text-foreground transition-all mb-8 inline-flex items-center gap-2"
                >
                  <ArrowLeft className="w-5 h-5" />
                  Voltar
                </motion.button>
              </Link>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Main Content */}
                <div className="lg:col-span-2">
                  <div className="bg-secondary/50 backdrop-blur-sm border border-secondary-foreground/30 rounded-2xl p-10">
                    <h1 className="font-heading text-5xl font-bold text-foreground mb-8">
                      {job.jobTitle}
                    </h1>

                    {/* Job Meta */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10 pb-8 border-b border-secondary-foreground/20">
                      {job.jobLocation && (
                        <div className="flex items-center gap-3">
                          <MapPin className="w-6 h-6 text-secondary-foreground flex-shrink-0" />
                          <div>
                            <p className="font-heading text-xs font-bold text-secondary-foreground mb-1">Localização</p>
                            <p className="font-paragraph text-surface">{job.jobLocation}</p>
                          </div>
                        </div>
                      )}

                      {job.employmentType && (
                        <div className="flex items-center gap-3">
                          <Briefcase className="w-6 h-6 text-secondary-foreground flex-shrink-0" />
                          <div>
                            <p className="font-heading text-xs font-bold text-secondary-foreground mb-1">Tipo</p>
                            <p className="font-paragraph text-surface">{job.employmentType}</p>
                          </div>
                        </div>
                      )}

                      {job.salaryRange && (
                        <div className="flex items-center gap-3">
                          <DollarSign className="w-6 h-6 text-secondary-foreground flex-shrink-0" />
                          <div>
                            <p className="font-heading text-xs font-bold text-secondary-foreground mb-1">Salário</p>
                            <p className="font-paragraph text-surface">{job.salaryRange}</p>
                          </div>
                        </div>
                      )}

                      {job.datePosted && (
                        <div className="flex items-center gap-3">
                          <Calendar className="w-6 h-6 text-secondary-foreground flex-shrink-0" />
                          <div>
                            <p className="font-heading text-xs font-bold text-secondary-foreground mb-1">Publicada em</p>
                            <p className="font-paragraph text-surface">{formatDate(job.datePosted)}</p>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Description */}
                    {job.jobDescription && (
                      <div className="mb-10">
                        <h2 className="font-heading text-3xl font-bold text-foreground mb-6">
                          Sobre a Vaga
                        </h2>
                        <p className="font-paragraph text-surface text-lg leading-relaxed whitespace-pre-line">
                          {job.jobDescription}
                        </p>
                      </div>
                    )}

                    {/* Requirements */}
                    {job.requirements && (
                      <div className="mb-10">
                        <h2 className="font-heading text-3xl font-bold text-foreground mb-6">
                          Requisitos
                        </h2>
                        <div className="space-y-3">
                          {job.requirements.split('\n').filter(Boolean).map((req, index) => (
                            <div key={index} className="flex items-start gap-3">
                              <CheckCircle2 className="w-5 h-5 text-secondary-foreground flex-shrink-0 mt-1" />
                              <p className="font-paragraph text-surface text-lg">{req}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Sidebar */}
                <div className="lg:col-span-1">
                  <motion.div
                    className="bg-gradient-to-br from-secondary-foreground/10 to-secondary-foreground/5 border border-secondary-foreground/30 rounded-2xl p-8 sticky top-32"
                    whileHover={{ boxShadow: '0 20px 40px rgba(127, 255, 0, 0.1)' }}
                  >
                    <h3 className="font-heading text-3xl font-bold text-foreground mb-6">
                      Interessado?
                    </h3>
                    <p className="font-paragraph text-surface mb-8 text-lg">
                      Candidate-se agora e faça parte de uma equipe incrível!
                    </p>

                    <motion.button
                      whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(127, 255, 0, 0.3)' }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleApply}
                      className="w-full bg-secondary-foreground text-background font-heading font-bold py-5 text-lg rounded-lg transition-all mb-6"
                    >
                      Candidatar-se
                    </motion.button>

                    {job.jobCategory && (
                      <div className="pt-6 border-t border-secondary-foreground/20">
                        <p className="font-heading text-sm font-bold text-secondary-foreground mb-2">
                          Categoria
                        </p>
                        <p className="font-paragraph text-surface text-lg">
                          {job.jobCategory}
                        </p>
                      </div>
                    )}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      <Footer />
      </div>
    </PageTransition>
  );
}
