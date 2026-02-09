import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Briefcase, DollarSign, Calendar, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { BaseCrudService } from '@/integrations';
import { ListagemdeVagas } from '@/entities';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
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
    <div className="min-h-screen bg-background">
      <Header />

      <div className="w-full bg-background py-16">
        <div className="max-w-[100rem] mx-auto px-8">
          <div className="min-h-[600px]">
            {isLoading ? (
              <div className="flex items-center justify-center py-20">
                <LoadingSpinner />
              </div>
            ) : !job ? (
              <div className="text-center py-20">
                <h2 className="font-heading text-4xl uppercase text-primary mb-4">
                  Vaga não encontrada
                </h2>
                <p className="font-paragraph text-foreground text-lg mb-8">
                  A vaga que você está procurando não existe ou foi removida.
                </p>
                <Link to="/vagas">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-primary text-primary-foreground font-heading uppercase px-8 py-4 text-lg tracking-wider inline-flex items-center gap-2"
                  >
                    <ArrowLeft className="w-5 h-5" />
                    Voltar para Vagas
                  </motion.button>
                </Link>
              </div>
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
                    className="font-heading uppercase text-primary hover:text-foreground transition-all mb-8 inline-flex items-center gap-2"
                  >
                    <ArrowLeft className="w-5 h-5" />
                    Voltar
                  </motion.button>
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                  {/* Main Content */}
                  <div className="lg:col-span-2">
                    <div className="bg-secondary border-2 border-primary p-10">
                      <h1 className="font-heading text-5xl uppercase text-primary mb-8">
                        {job.jobTitle}
                      </h1>

                      {/* Job Meta */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10 pb-8 border-b border-primary">
                        {job.jobLocation && (
                          <div className="flex items-center gap-3">
                            <MapPin className="w-6 h-6 text-primary flex-shrink-0" />
                            <div>
                              <p className="font-heading text-xs uppercase text-primary mb-1">Localização</p>
                              <p className="font-paragraph text-foreground">{job.jobLocation}</p>
                            </div>
                          </div>
                        )}

                        {job.employmentType && (
                          <div className="flex items-center gap-3">
                            <Briefcase className="w-6 h-6 text-primary flex-shrink-0" />
                            <div>
                              <p className="font-heading text-xs uppercase text-primary mb-1">Tipo</p>
                              <p className="font-paragraph text-foreground">{job.employmentType}</p>
                            </div>
                          </div>
                        )}

                        {job.salaryRange && (
                          <div className="flex items-center gap-3">
                            <DollarSign className="w-6 h-6 text-primary flex-shrink-0" />
                            <div>
                              <p className="font-heading text-xs uppercase text-primary mb-1">Salário</p>
                              <p className="font-paragraph text-foreground">{job.salaryRange}</p>
                            </div>
                          </div>
                        )}

                        {job.datePosted && (
                          <div className="flex items-center gap-3">
                            <Calendar className="w-6 h-6 text-primary flex-shrink-0" />
                            <div>
                              <p className="font-heading text-xs uppercase text-primary mb-1">Publicada em</p>
                              <p className="font-paragraph text-foreground">{formatDate(job.datePosted)}</p>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Description */}
                      {job.jobDescription && (
                        <div className="mb-10">
                          <h2 className="font-heading text-3xl uppercase text-primary mb-6">
                            Sobre a Vaga
                          </h2>
                          <p className="font-paragraph text-foreground text-lg leading-relaxed whitespace-pre-line">
                            {job.jobDescription}
                          </p>
                        </div>
                      )}

                      {/* Requirements */}
                      {job.requirements && (
                        <div className="mb-10">
                          <h2 className="font-heading text-3xl uppercase text-primary mb-6">
                            Requisitos
                          </h2>
                          <div className="space-y-3">
                            {job.requirements.split('\n').filter(Boolean).map((req, index) => (
                              <div key={index} className="flex items-start gap-3">
                                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                                <p className="font-paragraph text-foreground text-lg">{req}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Sidebar */}
                  <div className="lg:col-span-1">
                    <div className="bg-primary p-8 sticky top-24">
                      <h3 className="font-heading text-3xl uppercase text-primary-foreground mb-6">
                        Interessado?
                      </h3>
                      <p className="font-paragraph text-primary-foreground mb-8 text-lg">
                        Candidate-se agora e faça parte de uma equipe incrível!
                      </p>

                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleApply}
                        className="w-full bg-background text-primary font-heading uppercase py-5 text-lg tracking-wider hover:bg-secondary transition-all mb-6"
                      >
                        Candidatar-se
                      </motion.button>

                      {job.jobCategory && (
                        <div className="pt-6 border-t border-primary-foreground">
                          <p className="font-heading text-sm uppercase text-primary-foreground mb-2">
                            Categoria
                          </p>
                          <p className="font-paragraph text-primary-foreground text-lg">
                            {job.jobCategory}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
