import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LogOut, Briefcase, MapPin, DollarSign, Calendar, ArrowRight, Bookmark, BookmarkCheck, Trash2, MessageCircle } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Chat from '@/components/Chat';
import { useAuthStore } from '@/store/authStore';
import { BaseCrudService } from '@/integrations';
import { ListagemdeVagas, JobApplications, PerfisdeUsurios } from '@/entities';
import { Image } from '@/components/ui/image';
import { DigitalSphere, GlassCard, NetworkParticles } from '@/components/3D';

export default function ProfessionalPage() {
  const navigate = useNavigate();
  const { isAuthenticated, userRole, logout } = useAuthStore();
  const [jobs, setJobs] = useState<ListagemdeVagas[]>([]);
  const [applications, setApplications] = useState<JobApplications[]>([]);
  const [savedJobs, setSavedJobs] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'available' | 'applications' | 'saved'>('available');
  const [chatOpen, setChatOpen] = useState(false);
  const [selectedChatRecipient, setSelectedChatRecipient] = useState<{ id: string; name: string } | null>(null);

  useEffect(() => {
    if (!isAuthenticated || userRole !== 'professional') {
      navigate('/login');
      return;
    }

    const fetchData = async () => {
      try {
        const jobsResult = await BaseCrudService.getAll<ListagemdeVagas>('joblistings', [], { limit: 50 });
        const applicationsResult = await BaseCrudService.getAll<JobApplications>('jobapplications', [], { limit: 100 });
        setJobs(jobsResult.items);
        setApplications(applicationsResult.items);
        // Load saved jobs from localStorage
        const saved = localStorage.getItem('savedJobs');
        if (saved) {
          setSavedJobs(JSON.parse(saved));
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [isAuthenticated, userRole, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const toggleSaveJob = (jobId: string) => {
    const updated = savedJobs.includes(jobId)
      ? savedJobs.filter(id => id !== jobId)
      : [...savedJobs, jobId];
    setSavedJobs(updated);
    localStorage.setItem('savedJobs', JSON.stringify(updated));
  };

  const handleDeleteApplication = async (appId: string) => {
    if (!confirm('Tem certeza que deseja remover esta candidatura?')) return;

    try {
      await BaseCrudService.delete('jobapplications', appId);
      setApplications(applications.filter(app => app._id !== appId));
    } catch (error) {
      console.error('Error deleting application:', error);
      alert('Erro ao remover candidatura');
    }
  };

  const getSavedJobs = () => {
    return jobs.filter(job => savedJobs.includes(job._id));
  };

  const getApplicationDetails = (appId: string) => {
    return applications.find(app => app._id === appId);
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col relative overflow-hidden">
      <NetworkParticles />
      <Header />

      {/* Top Bar */}
      <div className="bg-secondary border-b border-white/10 px-8 py-6 relative z-20">
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
      <div className="flex-grow relative z-10">
        <div className="max-w-[120rem] mx-auto px-8 py-16">
          {/* Welcome Section with 3D */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          >
            <div>
              <h2 className="font-heading text-5xl md:text-6xl uppercase text-foreground mb-4">
                Bem-vindo de volta!
              </h2>
              <p className="font-paragraph text-foreground/60 text-lg mb-8">
                Explore as melhores oportunidades de carreira disponíveis
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-secondary border border-white/10 p-6">
                  <p className="text-secondary-foreground font-heading text-2xl font-bold">{jobs.length}</p>
                  <p className="text-foreground/60 font-paragraph text-sm">Vagas Disponíveis</p>
                </div>
                <div className="bg-secondary border border-white/10 p-6">
                  <p className="text-secondary-foreground font-heading text-2xl font-bold">{applications.length}</p>
                  <p className="text-foreground/60 font-paragraph text-sm">Minhas Candidaturas</p>
                </div>
              </div>
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <DigitalSphere />
            </motion.div>
          </motion.div>

          {/* Tabs */}
          <div className="flex gap-4 mb-12 border-b border-white/10">
            {[
              { id: 'available', label: 'Vagas Disponíveis' },
              { id: 'applications', label: `Minhas Candidaturas (${applications.length})` },
              { id: 'saved', label: `Vagas Salvas (${savedJobs.length})` },
            ].map((tab) => (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`font-heading uppercase text-sm tracking-widest px-4 py-4 border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-primary text-primary'
                    : 'border-transparent text-foreground/60 hover:text-foreground'
                }`}
              >
                {tab.label}
              </motion.button>
            ))}
          </div>

          {/* Available Jobs Tab */}
          {activeTab === 'available' && (
            <>
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

                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-grow">
                          <h3 className="font-heading text-2xl uppercase text-foreground mb-2 line-clamp-2">
                            {job.jobTitle}
                          </h3>
                          <p className="font-paragraph text-foreground/60 text-sm line-clamp-2">
                            {job.jobDescription}
                          </p>
                        </div>
                        <motion.button
                          whileHover={{ scale: 1.2 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => toggleSaveJob(job._id)}
                          className="ml-2 text-primary hover:text-white transition-colors"
                        >
                          {savedJobs.includes(job._id) ? (
                            <BookmarkCheck className="w-6 h-6" />
                          ) : (
                            <Bookmark className="w-6 h-6" />
                          )}
                        </motion.button>
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
            </>
          )}

          {/* Applications Tab */}
          {activeTab === 'applications' && (
            <>
              {isLoading ? (
                <div className="space-y-4">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="bg-secondary border border-white/10 p-6 animate-pulse">
                      <div className="h-6 bg-white/10 mb-3 w-1/3" />
                      <div className="h-4 bg-white/10 w-1/2" />
                    </div>
                  ))}
                </div>
              ) : applications.length > 0 ? (
                <div className="space-y-4">
                  {applications.map((app, index) => (
                    <motion.div
                      key={app._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="bg-secondary border-2 border-white/10 p-6 hover:border-primary transition-all duration-300"
                    >
                      <div className="flex items-start justify-between gap-6">
                        <div className="flex-grow">
                          <h4 className="font-heading text-2xl uppercase text-foreground mb-2">
                            {app.appliedJobTitle}
                          </h4>
                          <div className="space-y-2 text-foreground/70 font-paragraph text-sm">
                            <p>📧 {app.candidateEmail}</p>
                            <p>📱 {app.candidatePhone}</p>
                            {app.resumeFile && (
                              <p>
                                📄{' '}
                                <a
                                  href={app.resumeFile}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-primary hover:underline"
                                >
                                  Ver Currículo
                                </a>
                              </p>
                            )}
                          </div>
                          <p className="text-foreground/50 text-xs mt-3">
                            Candidatura em {new Date(app._createdDate || '').toLocaleDateString('pt-BR')}
                          </p>
                        </div>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleDeleteApplication(app._id)}
                          className="p-3 bg-destructive text-destructiveforeground hover:bg-opacity-90 transition-colors"
                          title="Remover candidatura"
                        >
                          <Trash2 className="w-5 h-5" />
                        </motion.button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 bg-secondary border border-white/10 p-8">
                  <p className="font-paragraph text-foreground/60 text-lg">
                    Você ainda não se candidatou a nenhuma vaga
                  </p>
                </div>
              )}
            </>
          )}

          {/* Saved Jobs Tab */}
          {activeTab === 'saved' && (
            <>
              {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="bg-secondary border border-white/10 p-8 animate-pulse">
                      <div className="h-6 bg-white/10 mb-4 w-3/4" />
                      <div className="h-4 bg-white/10 mb-3 w-full" />
                      <div className="h-4 bg-white/10 w-1/2" />
                    </div>
                  ))}
                </div>
              ) : getSavedJobs().length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {getSavedJobs().map((job, index) => (
                    <motion.div
                      key={job._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="group relative bg-secondary border-2 border-primary p-8 hover:border-white transition-all duration-300"
                    >
                      <div className="absolute top-0 left-0 w-0 h-1 bg-primary group-hover:w-full transition-all duration-300" />

                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-grow">
                          <h3 className="font-heading text-2xl uppercase text-foreground mb-2 line-clamp-2">
                            {job.jobTitle}
                          </h3>
                          <p className="font-paragraph text-foreground/60 text-sm line-clamp-2">
                            {job.jobDescription}
                          </p>
                        </div>
                        <motion.button
                          whileHover={{ scale: 1.2 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => toggleSaveJob(job._id)}
                          className="ml-2 text-primary hover:text-white transition-colors"
                        >
                          <BookmarkCheck className="w-6 h-6" />
                        </motion.button>
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
                <div className="text-center py-16 bg-secondary border border-white/10 p-8">
                  <p className="font-paragraph text-foreground/60 text-lg">
                    Você ainda não salvou nenhuma vaga
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
