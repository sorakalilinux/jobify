import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LogOut, Briefcase, MapPin, DollarSign, Calendar, ArrowRight } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useAuthStore } from '@/store/authStore';
import { BaseCrudService } from '@/integrations';
import { ListagemdeVagas } from '@/entities';
import { Image } from '@/components/ui/image';

export default function ProfessionalPage() {
  const navigate = useNavigate();
  const { isAuthenticated, userRole, logout } = useAuthStore();
  const [jobs, setJobs] = useState<ListagemdeVagas[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated || userRole !== 'professional') {
      navigate('/login');
      return;
    }

    const fetchJobs = async () => {
      try {
        const result = await BaseCrudService.getAll<ListagemdeVagas>('joblistings', [], { limit: 12 });
        setJobs(result.items);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobs();
  }, [isAuthenticated, userRole, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Header />

      {/* Top Bar */}
      <div className="bg-secondary border-b border-white/10 px-8 py-6">
        <div className="max-w-[120rem] mx-auto flex items-center justify-between">
          <h1 className="font-heading text-3xl uppercase text-primary">Área do Profissional</h1>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLogout}
            className="flex items-center gap-2 bg-destructive text-destructiveforeground font-heading uppercase px-6 py-3 tracking-wider hover:bg-opacity-90 transition-all"
          >
            <LogOut className="w-5 h-5" />
            Sair
          </motion.button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-grow">
        <div className="max-w-[120rem] mx-auto px-8 py-16">
          {/* Welcome Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-16"
          >
            <h2 className="font-heading text-5xl md:text-6xl uppercase text-foreground mb-4">
              Bem-vindo de volta!
            </h2>
            <p className="font-paragraph text-foreground/60 text-lg">
              Explore as melhores oportunidades de carreira disponíveis
            </p>
          </motion.div>

          {/* Jobs Grid */}
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-secondary border border-white/10 p-8 animate-pulse">
                  <div className="h-6 bg-white/10 mb-4 w-3/4" />
                  <div className="h-4 bg-white/10 mb-3 w-full" />
                  <div className="h-4 bg-white/10 w-1/2" />
                </div>
              ))}
            </div>
          ) : jobs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {jobs.map((job, index) => (
                <motion.div
                  key={job._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="group relative bg-secondary border-2 border-white/10 p-8 hover:border-primary transition-all duration-300"
                >
                  <div className="absolute top-0 left-0 w-0 h-1 bg-primary group-hover:w-full transition-all duration-300" />

                  <div className="mb-6">
                    <h3 className="font-heading text-2xl uppercase text-foreground mb-2 line-clamp-2">
                      {job.jobTitle}
                    </h3>
                    <p className="font-paragraph text-foreground/60 text-sm line-clamp-2">
                      {job.jobDescription}
                    </p>
                  </div>

                  <div className="space-y-3 mb-6">
                    {job.jobLocation && (
                      <div className="flex items-center gap-3 text-foreground/70">
                        <MapPin className="w-4 h-4 text-primary" />
                        <span className="font-paragraph text-sm">{job.jobLocation}</span>
                      </div>
                    )}
                    {job.salaryRange && (
                      <div className="flex items-center gap-3 text-foreground/70">
                        <DollarSign className="w-4 h-4 text-primary" />
                        <span className="font-paragraph text-sm">{job.salaryRange}</span>
                      </div>
                    )}
                    {job.employmentType && (
                      <div className="flex items-center gap-3 text-foreground/70">
                        <Briefcase className="w-4 h-4 text-primary" />
                        <span className="font-paragraph text-sm">{job.employmentType}</span>
                      </div>
                    )}
                    {job.datePosted && (
                      <div className="flex items-center gap-3 text-foreground/70">
                        <Calendar className="w-4 h-4 text-primary" />
                        <span className="font-paragraph text-sm">
                          {new Date(job.datePosted).toLocaleDateString('pt-BR')}
                        </span>
                      </div>
                    )}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => navigate(`/vagas/${job._id}`)}
                    className="w-full bg-primary text-primary-foreground font-heading uppercase py-3 tracking-wider flex items-center justify-center gap-2 hover:bg-white hover:text-background transition-colors"
                  >
                    Ver Detalhes <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="font-paragraph text-foreground/60 text-lg">
                Nenhuma vaga disponível no momento
              </p>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
