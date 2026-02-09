import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LogOut, Plus, Eye, Trash2, Building2 } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useAuthStore } from '@/store/authStore';
import { BaseCrudService } from '@/integrations';
import { ListagemdeVagas } from '@/entities';
import { Image } from '@/components/ui/image';

export default function ContractorPage() {
  const navigate = useNavigate();
  const { isAuthenticated, userRole, logout } = useAuthStore();
  const [jobs, setJobs] = useState<ListagemdeVagas[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated || userRole !== 'contractor') {
      navigate('/login');
      return;
    }

    const fetchJobs = async () => {
      try {
        const result = await BaseCrudService.getAll<ListagemdeVagas>('joblistings', [], { limit: 50 });
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
          <h1 className="font-heading text-3xl uppercase text-primary">Área do Contratante</h1>
          <div className="flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 bg-primary text-primary-foreground font-heading uppercase px-6 py-3 tracking-wider hover:bg-white hover:text-background transition-all"
            >
              <Plus className="w-5 h-5" />
              Nova Vaga
            </motion.button>
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
              Gerencie suas vagas e encontre os melhores talentos
            </p>
          </motion.div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {[
              { label: 'Vagas Ativas', value: jobs.length, icon: Building2 },
              { label: 'Candidaturas', value: '0', icon: Eye },
              { label: 'Contratações', value: '0', icon: Plus },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-secondary border border-white/10 p-8"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-heading uppercase text-sm tracking-widest text-foreground/70">
                    {stat.label}
                  </h3>
                  <stat.icon className="w-6 h-6 text-primary" />
                </div>
                <p className="font-heading text-5xl text-primary">{stat.value}</p>
              </motion.div>
            ))}
          </div>

          {/* Jobs Table */}
          <div className="mb-8">
            <h3 className="font-heading text-3xl uppercase text-foreground mb-6">Suas Vagas</h3>

            {isLoading ? (
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="bg-secondary border border-white/10 p-6 animate-pulse">
                    <div className="h-6 bg-white/10 mb-3 w-1/3" />
                    <div className="h-4 bg-white/10 w-1/2" />
                  </div>
                ))}
              </div>
            ) : jobs.length > 0 ? (
              <div className="space-y-4">
                {jobs.map((job, index) => (
                  <motion.div
                    key={job._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="group bg-secondary border-2 border-white/10 p-6 hover:border-primary transition-all duration-300"
                  >
                    <div className="flex items-start justify-between gap-6">
                      <div className="flex-grow">
                        <h4 className="font-heading text-2xl uppercase text-foreground mb-2">
                          {job.jobTitle}
                        </h4>
                        <p className="font-paragraph text-foreground/60 mb-3 line-clamp-2">
                          {job.jobDescription}
                        </p>
                        <div className="flex flex-wrap gap-4 text-sm text-foreground/70">
                          {job.jobLocation && <span>{job.jobLocation}</span>}
                          {job.salaryRange && <span>{job.salaryRange}</span>}
                          {job.employmentType && <span>{job.employmentType}</span>}
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => navigate(`/vagas/${job._id}`)}
                          className="p-3 bg-primary text-primary-foreground hover:bg-white hover:text-background transition-colors"
                          title="Ver detalhes"
                        >
                          <Eye className="w-5 h-5" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          className="p-3 bg-destructive text-destructiveforeground hover:bg-opacity-90 transition-colors"
                          title="Deletar vaga"
                        >
                          <Trash2 className="w-5 h-5" />
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-secondary border border-white/10 p-8">
                <p className="font-paragraph text-foreground/60 text-lg">
                  Você ainda não publicou nenhuma vaga
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
