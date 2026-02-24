import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, FileText, Calendar, User, ExternalLink } from 'lucide-react';
import { BaseCrudService } from '@/integrations';
import { JobApplications } from '@/entities';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export default function EmpresasPage() {
  const [applications, setApplications] = useState<JobApplications[]>([]);
  const [filteredApplications, setFilteredApplications] = useState<JobApplications[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedJob, setSelectedJob] = useState('');
  const [hasNext, setHasNext] = useState(false);
  const [skip, setSkip] = useState(0);
  const LIMIT = 20;

  const loadApplications = async (skipValue: number = 0) => {
    try {
      const result = await BaseCrudService.getAll<JobApplications>('jobapplications', {}, { limit: LIMIT, skip: skipValue });
      if (skipValue === 0) {
        setApplications(result.items);
        setFilteredApplications(result.items);
      } else {
        setApplications(prev => [...prev, ...result.items]);
        setFilteredApplications(prev => [...prev, ...result.items]);
      }
      setHasNext(result.hasNext);
      setSkip(result.nextSkip || 0);
    } catch (error) {
      console.error('Error loading applications:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadApplications();
  }, []);

  useEffect(() => {
    let filtered = applications;

    if (searchTerm) {
      filtered = filtered.filter(app =>
        app.candidateName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.candidateEmail?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.appliedJobTitle?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedJob) {
      filtered = filtered.filter(app => app.appliedJobTitle === selectedJob);
    }

    setFilteredApplications(filtered);
  }, [searchTerm, selectedJob, applications]);

  const jobTitles = Array.from(new Set(applications.map(app => app.appliedJobTitle).filter(Boolean)));

  const formatDate = (date: Date | string | undefined) => {
    if (!date) return 'Data não disponível';
    try {
      const dateObj = typeof date === 'string' ? new Date(date) : date;
      return format(dateObj, "dd/MM/yyyy 'às' HH:mm", { locale: ptBR });
    } catch {
      return 'Data não disponível';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6 md:px-12 max-w-[100rem] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-6xl md:text-7xl font-heading font-bold text-foreground mb-6">
            Painel da <span className="text-secondary-foreground">Empresa</span>
          </h1>
          <p className="text-xl font-paragraph text-surface max-w-3xl mx-auto">
            Gerencie todas as candidaturas recebidas em um só lugar
          </p>
        </motion.div>
      </section>

      {/* Filters */}
      <section className="px-6 md:px-12 max-w-[100rem] mx-auto mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="space-y-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Search */}
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar por nome, email ou vaga..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-secondary/50 text-foreground font-paragraph px-4 py-3 border border-secondary-foreground/30 rounded-lg focus:outline-none focus:border-secondary-foreground focus:ring-2 focus:ring-secondary-foreground/30 backdrop-blur-sm transition"
              />
            </div>

            {/* Job Filter */}
            <select
              value={selectedJob}
              onChange={(e) => setSelectedJob(e.target.value)}
              className="bg-secondary/50 text-foreground font-paragraph px-4 py-3 border border-secondary-foreground/30 rounded-lg focus:outline-none focus:border-secondary-foreground focus:ring-2 focus:ring-secondary-foreground/30 backdrop-blur-sm transition"
            >
              <option value="">Todas as Vagas</option>
              {jobTitles.map(title => (
                <option key={title} value={title}>{title}</option>
              ))}
            </select>
          </div>

          {/* Results Count */}
          <p className="font-paragraph text-surface">
            <span className="text-secondary-foreground font-heading">{filteredApplications.length}</span> {filteredApplications.length === 1 ? 'candidatura' : 'candidaturas'}
          </p>
        </motion.div>
      </section>

      {/* Applications List */}
      <section className="px-6 md:px-12 max-w-[100rem] mx-auto pb-20">
        <div className="min-h-[600px]">
          {isLoading ? null : filteredApplications.length > 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >
              {filteredApplications.map((application, index) => (
                <motion.div
                  key={application._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.03 }}
                  whileHover={{ y: -5, boxShadow: '0 20px 40px rgba(127, 255, 0, 0.1)' }}
                  className="bg-secondary/50 backdrop-blur-sm border border-secondary-foreground/30 rounded-2xl p-8 hover:border-secondary-foreground/50 transition-all"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Candidate Info */}
                    <div className="lg:col-span-2">
                      <div className="mb-6">
                        <h3 className="font-heading text-3xl font-bold text-foreground mb-2">
                          {application.candidateName}
                        </h3>
                        {application.appliedJobTitle && (
                          <p className="font-paragraph text-surface text-lg">
                            Candidato para: <span className="text-secondary-foreground font-bold">{application.appliedJobTitle}</span>
                          </p>
                        )}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {application.candidateEmail && (
                          <div className="flex items-center gap-3">
                            <Mail className="w-5 h-5 text-secondary-foreground flex-shrink-0" />
                            <div>
                              <p className="font-heading text-xs font-bold text-secondary-foreground mb-1">Email</p>
                              <a
                                href={`mailto:${application.candidateEmail}`}
                                className="font-paragraph text-surface hover:text-secondary-foreground transition-all break-all"
                              >
                                {application.candidateEmail}
                              </a>
                            </div>
                          </div>
                        )}

                        {application.candidatePhone && (
                          <div className="flex items-center gap-3">
                            <Phone className="w-5 h-5 text-secondary-foreground flex-shrink-0" />
                            <div>
                              <p className="font-heading text-xs font-bold text-secondary-foreground mb-1">Telefone</p>
                              <a
                                href={`tel:${application.candidatePhone}`}
                                className="font-paragraph text-surface hover:text-secondary-foreground transition-all"
                              >
                                {application.candidatePhone}
                              </a>
                            </div>
                          </div>
                        )}

                        {application._createdDate && (
                          <div className="flex items-center gap-3">
                            <Calendar className="w-5 h-5 text-secondary-foreground flex-shrink-0" />
                            <div>
                              <p className="font-heading text-xs font-bold text-secondary-foreground mb-1">Data da Candidatura</p>
                              <p className="font-paragraph text-surface">
                                {formatDate(application._createdDate)}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="lg:col-span-1 flex flex-col justify-center gap-4">
                      {application.resumeFile && (
                        <motion.a
                          href={application.resumeFile}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="bg-secondary-foreground text-background font-heading font-bold px-6 py-4 text-center rounded-lg transition-all flex items-center justify-center gap-2"
                        >
                          <FileText className="w-5 h-5" />
                          Ver Currículo
                          <ExternalLink className="w-4 h-4" />
                        </motion.a>
                      )}

                      <motion.a
                        href={`mailto:${application.candidateEmail}`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-secondary/50 border border-secondary-foreground/30 text-secondary-foreground font-heading font-bold px-6 py-4 text-center rounded-lg hover:border-secondary-foreground/50 transition-all flex items-center justify-center gap-2"
                      >
                        <Mail className="w-5 h-5" />
                        Entrar em Contato
                      </motion.a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <User className="w-24 h-24 text-secondary-foreground mx-auto mb-6" />
              <p className="font-heading text-3xl font-bold text-foreground mb-4">
                Nenhuma candidatura encontrada
              </p>
              <p className="font-paragraph text-surface text-lg">
                {searchTerm || selectedJob
                  ? 'Tente ajustar seus filtros de busca'
                  : 'Ainda não há candidaturas para suas vagas'}
              </p>
            </motion.div>
          )}
        </div>

        {/* Load More */}
        {hasNext && !isLoading && (
          <div className="text-center mt-12">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(127, 255, 0, 0.3)' }}
              whileTap={{ scale: 0.95 }}
              onClick={() => loadApplications(skip)}
              className="bg-secondary-foreground text-background font-heading font-bold px-12 py-4 text-lg rounded-lg transition-all"
            >
              Carregar Mais Candidaturas
            </motion.button>
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
}
