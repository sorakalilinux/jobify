import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LogOut, Plus, Eye, Trash2, Building2, Users, Edit2, X } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useAuthStore } from '@/store/authStore';
import { BaseCrudService } from '@/integrations';
import { ListagemdeVagas, JobApplications } from '@/entities';
import { Image } from '@/components/ui/image';

export default function ContractorPage() {
  const navigate = useNavigate();
  const { isAuthenticated, userRole, logout } = useAuthStore();
  const [jobs, setJobs] = useState<ListagemdeVagas[]>([]);
  const [applications, setApplications] = useState<JobApplications[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showNewJobForm, setShowNewJobForm] = useState(false);
  const [editingJob, setEditingJob] = useState<ListagemdeVagas | null>(null);
  const [formData, setFormData] = useState({
    jobTitle: '',
    jobDescription: '',
    requirements: '',
    jobLocation: '',
    salaryRange: '',
    jobCategory: '',
    employmentType: '',
  });

  useEffect(() => {
    if (!isAuthenticated || userRole !== 'contractor') {
      navigate('/login');
      return;
    }

    const fetchData = async () => {
      try {
        const jobsResult = await BaseCrudService.getAll<ListagemdeVagas>('joblistings', [], { limit: 50 });
        const applicationsResult = await BaseCrudService.getAll<JobApplications>('jobapplications', [], { limit: 100 });
        setJobs(jobsResult.items);
        setApplications(applicationsResult.items);
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

  const handleCreateJob = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.jobTitle || !formData.jobDescription) {
      alert('Preencha os campos obrigatórios');
      return;
    }

    try {
      const newJob = await BaseCrudService.create<ListagemdeVagas>('joblistings', {
        ...formData,
        _id: crypto.randomUUID(),
        datePosted: new Date(),
      });
      setJobs([newJob, ...jobs]);
      setFormData({
        jobTitle: '',
        jobDescription: '',
        requirements: '',
        jobLocation: '',
        salaryRange: '',
        jobCategory: '',
        employmentType: '',
      });
      setShowNewJobForm(false);
    } catch (error) {
      console.error('Error creating job:', error);
      alert('Erro ao criar vaga');
    }
  };

  const handleUpdateJob = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingJob || !formData.jobTitle || !formData.jobDescription) {
      alert('Preencha os campos obrigatórios');
      return;
    }

    try {
      await BaseCrudService.update<ListagemdeVagas>('joblistings', {
        _id: editingJob._id,
        ...formData,
      });
      setJobs(jobs.map(j => j._id === editingJob._id ? { ...editingJob, ...formData } : j));
      setEditingJob(null);
      setFormData({
        jobTitle: '',
        jobDescription: '',
        requirements: '',
        jobLocation: '',
        salaryRange: '',
        jobCategory: '',
        employmentType: '',
      });
    } catch (error) {
      console.error('Error updating job:', error);
      alert('Erro ao atualizar vaga');
    }
  };

  const handleDeleteJob = async (jobId: string) => {
    if (!confirm('Tem certeza que deseja deletar esta vaga?')) return;

    try {
      await BaseCrudService.delete('joblistings', jobId);
      setJobs(jobs.filter(j => j._id !== jobId));
    } catch (error) {
      console.error('Error deleting job:', error);
      alert('Erro ao deletar vaga');
    }
  };

  const startEditJob = (job: ListagemdeVagas) => {
    setEditingJob(job);
    setFormData({
      jobTitle: job.jobTitle || '',
      jobDescription: job.jobDescription || '',
      requirements: job.requirements || '',
      jobLocation: job.jobLocation || '',
      salaryRange: job.salaryRange || '',
      jobCategory: job.jobCategory || '',
      employmentType: job.employmentType || '',
    });
    setShowNewJobForm(true);
  };

  const getApplicationsForJob = (jobTitle: string) => {
    return applications.filter(app => app.appliedJobTitle === jobTitle);
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
              onClick={() => {
                setShowNewJobForm(true);
                setEditingJob(null);
                setFormData({
                  jobTitle: '',
                  jobDescription: '',
                  requirements: '',
                  jobLocation: '',
                  salaryRange: '',
                  jobCategory: '',
                  employmentType: '',
                });
              }}
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
              { label: 'Candidaturas', value: applications.length, icon: Users },
              { label: 'Total de Vagas', value: jobs.length, icon: Plus },
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

          {/* New/Edit Job Form Modal */}
          {showNewJobForm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
              onClick={() => setShowNewJobForm(false)}
            >
              <motion.div
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-secondary border border-white/10 p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-heading text-3xl uppercase text-primary">
                    {editingJob ? 'Editar Vaga' : 'Nova Vaga'}
                  </h3>
                  <button
                    onClick={() => setShowNewJobForm(false)}
                    className="text-foreground/60 hover:text-foreground transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <form onSubmit={editingJob ? handleUpdateJob : handleCreateJob} className="space-y-6">
                  <div>
                    <label className="block font-heading uppercase text-sm tracking-widest text-foreground mb-2">
                      Título da Vaga *
                    </label>
                    <input
                      type="text"
                      value={formData.jobTitle}
                      onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
                      placeholder="Ex: Desenvolvedor React"
                      className="w-full bg-background border border-white/10 text-foreground px-4 py-3 font-paragraph focus:outline-none focus:border-primary transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block font-heading uppercase text-sm tracking-widest text-foreground mb-2">
                      Descrição *
                    </label>
                    <textarea
                      value={formData.jobDescription}
                      onChange={(e) => setFormData({ ...formData, jobDescription: e.target.value })}
                      placeholder="Descreva a vaga e responsabilidades"
                      rows={4}
                      className="w-full bg-background border border-white/10 text-foreground px-4 py-3 font-paragraph focus:outline-none focus:border-primary transition-colors resize-none"
                    />
                  </div>

                  <div>
                    <label className="block font-heading uppercase text-sm tracking-widest text-foreground mb-2">
                      Requisitos
                    </label>
                    <textarea
                      value={formData.requirements}
                      onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                      placeholder="Requisitos necessários"
                      rows={3}
                      className="w-full bg-background border border-white/10 text-foreground px-4 py-3 font-paragraph focus:outline-none focus:border-primary transition-colors resize-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-heading uppercase text-sm tracking-widest text-foreground mb-2">
                        Localização
                      </label>
                      <input
                        type="text"
                        value={formData.jobLocation}
                        onChange={(e) => setFormData({ ...formData, jobLocation: e.target.value })}
                        placeholder="Ex: São Paulo, SP"
                        className="w-full bg-background border border-white/10 text-foreground px-4 py-3 font-paragraph focus:outline-none focus:border-primary transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block font-heading uppercase text-sm tracking-widest text-foreground mb-2">
                        Faixa Salarial
                      </label>
                      <input
                        type="text"
                        value={formData.salaryRange}
                        onChange={(e) => setFormData({ ...formData, salaryRange: e.target.value })}
                        placeholder="Ex: R$ 5.000 - R$ 8.000"
                        className="w-full bg-background border border-white/10 text-foreground px-4 py-3 font-paragraph focus:outline-none focus:border-primary transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-heading uppercase text-sm tracking-widest text-foreground mb-2">
                        Categoria
                      </label>
                      <input
                        type="text"
                        value={formData.jobCategory}
                        onChange={(e) => setFormData({ ...formData, jobCategory: e.target.value })}
                        placeholder="Ex: Tecnologia"
                        className="w-full bg-background border border-white/10 text-foreground px-4 py-3 font-paragraph focus:outline-none focus:border-primary transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block font-heading uppercase text-sm tracking-widest text-foreground mb-2">
                        Tipo de Contrato
                      </label>
                      <input
                        type="text"
                        value={formData.employmentType}
                        onChange={(e) => setFormData({ ...formData, employmentType: e.target.value })}
                        placeholder="Ex: CLT, PJ, Temporário"
                        className="w-full bg-background border border-white/10 text-foreground px-4 py-3 font-paragraph focus:outline-none focus:border-primary transition-colors"
                      />
                    </div>
                  </div>

                  <div className="flex gap-4 pt-4">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      className="flex-1 bg-primary text-primary-foreground font-heading uppercase py-3 tracking-wider hover:bg-white hover:text-background transition-colors"
                    >
                      {editingJob ? 'Atualizar Vaga' : 'Criar Vaga'}
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="button"
                      onClick={() => setShowNewJobForm(false)}
                      className="flex-1 bg-secondary border border-white/10 text-foreground font-heading uppercase py-3 tracking-wider hover:border-primary transition-colors"
                    >
                      Cancelar
                    </motion.button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}

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
                {jobs.map((job, index) => {
                  const jobApplications = getApplicationsForJob(job.jobTitle || '');
                  return (
                    <motion.div
                      key={job._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="group bg-secondary border-2 border-white/10 p-6 hover:border-primary transition-all duration-300"
                    >
                      <div className="flex items-start justify-between gap-6 mb-4">
                        <div className="flex-grow">
                          <h4 className="font-heading text-2xl uppercase text-foreground mb-2">
                            {job.jobTitle}
                          </h4>
                          <p className="font-paragraph text-foreground/60 mb-3 line-clamp-2">
                            {job.jobDescription}
                          </p>
                          <div className="flex flex-wrap gap-4 text-sm text-foreground/70 mb-3">
                            {job.jobLocation && <span>📍 {job.jobLocation}</span>}
                            {job.salaryRange && <span>💰 {job.salaryRange}</span>}
                            {job.employmentType && <span>📋 {job.employmentType}</span>}
                          </div>
                          <div className="flex items-center gap-2 text-primary font-heading text-sm">
                            <Users className="w-4 h-4" />
                            {jobApplications.length} candidato{jobApplications.length !== 1 ? 's' : ''}
                          </div>
                        </div>
                        <div className="flex gap-3">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => startEditJob(job)}
                            className="p-3 bg-primary text-primary-foreground hover:bg-white hover:text-background transition-colors"
                            title="Editar vaga"
                          >
                            <Edit2 className="w-5 h-5" />
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleDeleteJob(job._id)}
                            className="p-3 bg-destructive text-destructiveforeground hover:bg-opacity-90 transition-colors"
                            title="Deletar vaga"
                          >
                            <Trash2 className="w-5 h-5" />
                          </motion.button>
                        </div>
                      </div>

                      {/* Candidates for this job */}
                      {jobApplications.length > 0 && (
                        <div className="mt-4 pt-4 border-t border-white/10">
                          <p className="font-heading text-sm uppercase tracking-widest text-foreground/70 mb-3">
                            Candidatos
                          </p>
                          <div className="space-y-2">
                            {jobApplications.map((app) => (
                              <div key={app._id} className="bg-background/50 p-3 text-sm">
                                <p className="font-heading text-foreground">{app.candidateName}</p>
                                <p className="text-foreground/60">{app.candidateEmail}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </motion.div>
                  );
                })}
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
