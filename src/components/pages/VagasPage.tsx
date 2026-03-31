import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, MapPin, Briefcase, DollarSign, Calendar, ChevronRight, Filter, X } from 'lucide-react';
import { BaseCrudService } from '@/integrations';
import { ListagemdeVagas } from '@/entities';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { NetworkParticles } from '@/components/3D';
import PageTransition from '@/components/PageTransition';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export default function VagasPage() {
  const [jobs, setJobs] = useState<ListagemdeVagas[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<ListagemdeVagas[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [hasNext, setHasNext] = useState(false);
  const [skip, setSkip] = useState(0);
  const [showFilters, setShowFilters] = useState(false);
  const LIMIT = 12;

  const loadJobs = async (skipValue: number = 0) => {
    try {
      const result = await BaseCrudService.getAll<ListagemdeVagas>('joblistings', {}, { limit: LIMIT, skip: skipValue });
      if (skipValue === 0) {
        setJobs(result.items);
        setFilteredJobs(result.items);
      } else {
        setJobs(prev => [...prev, ...result.items]);
        setFilteredJobs(prev => [...prev, ...result.items]);
      }
      setHasNext(result.hasNext);
      setSkip(result.nextSkip || 0);
    } catch (error) {
      console.error('Error loading jobs:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadJobs();
  }, []);

  useEffect(() => {
    let filtered = jobs;

    if (searchTerm) {
      filtered = filtered.filter(job =>
        job.jobTitle?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.jobDescription?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter(job => job.jobCategory === selectedCategory);
    }

    if (selectedLocation) {
      filtered = filtered.filter(job => job.jobLocation === selectedLocation);
    }

    if (selectedType) {
      filtered = filtered.filter(job => job.employmentType === selectedType);
    }

    setFilteredJobs(filtered);
  }, [searchTerm, selectedCategory, selectedLocation, selectedType, jobs]);

  const categories = Array.from(new Set(jobs.map(job => job.jobCategory).filter(Boolean)));
  const locations = Array.from(new Set(jobs.map(job => job.jobLocation).filter(Boolean)));
  const types = Array.from(new Set(jobs.map(job => job.employmentType).filter(Boolean)));

  const formatDate = (date: Date | string | undefined) => {
    if (!date) return 'Data não disponível';
    try {
      const dateObj = typeof date === 'string' ? new Date(date) : date;
      return format(dateObj, "dd 'de' MMMM 'de' yyyy", { locale: ptBR });
    } catch {
      return 'Data não disponível';
    }
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-background overflow-hidden">
        <NetworkParticles />
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
            Explore <span className="text-secondary-foreground">Oportunidades</span>
          </h1>
          <p className="text-xl font-paragraph text-surface max-w-3xl mx-auto">
            Encontre a vaga perfeita para impulsionar sua carreira
          </p>
        </motion.div>
      </section>

      {/* Search and Filters */}
      <section className="px-6 md:px-12 max-w-[100rem] mx-auto mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="space-y-6"
        >
          {/* Main Search */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-secondary-foreground w-5 h-5" />
            <input
              type="text"
              placeholder="Buscar por título ou descrição..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-secondary/50 text-foreground font-paragraph pl-12 pr-4 py-4 border border-secondary-foreground/30 rounded-lg focus:outline-none focus:border-secondary-foreground focus:ring-2 focus:ring-secondary-foreground/30 backdrop-blur-sm transition"
            />
          </div>

          {/* Filter Toggle Button */}
          <div className="flex justify-between items-center">
            <motion.button
              onClick={() => setShowFilters(!showFilters)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 text-secondary-foreground hover:text-foreground transition"
            >
              {showFilters ? <X size={20} /> : <Filter size={20} />}
              {showFilters ? 'Fechar Filtros' : 'Mostrar Filtros'}
            </motion.button>
            <p className="font-paragraph text-surface">
              <span className="text-secondary-foreground font-heading">{filteredJobs.length}</span> {filteredJobs.length === 1 ? 'vaga' : 'vagas'}
            </p>
          </div>

          {/* Filters Grid */}
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: showFilters ? 1 : 0, height: showFilters ? 'auto' : 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
              {/* Category Filter */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-secondary/50 text-foreground font-paragraph px-4 py-3 border border-secondary-foreground/30 rounded-lg focus:outline-none focus:border-secondary-foreground focus:ring-2 focus:ring-secondary-foreground/30 backdrop-blur-sm transition"
              >
                <option value="">Todas as Categorias</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>

              {/* Location Filter */}
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="bg-secondary/50 text-foreground font-paragraph px-4 py-3 border border-secondary-foreground/30 rounded-lg focus:outline-none focus:border-secondary-foreground focus:ring-2 focus:ring-secondary-foreground/30 backdrop-blur-sm transition"
              >
                <option value="">Todas as Localizações</option>
                {locations.map(loc => (
                  <option key={loc} value={loc}>{loc}</option>
                ))}
              </select>

              {/* Type Filter */}
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="bg-secondary/50 text-foreground font-paragraph px-4 py-3 border border-secondary-foreground/30 rounded-lg focus:outline-none focus:border-secondary-foreground focus:ring-2 focus:ring-secondary-foreground/30 backdrop-blur-sm transition"
              >
                <option value="">Todos os Tipos</option>
                {types.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Jobs Grid */}
      <section className="px-6 md:px-12 max-w-[100rem] mx-auto pb-20">
        <div className="min-h-[600px]">
          {isLoading ? null : filteredJobs.length > 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredJobs.map((job, index) => (
                <motion.div
                  key={job._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link to={`/vagas/${job._id}`}>
                    <motion.div
                      whileHover={{ y: -10, boxShadow: '0 20px 40px rgba(127, 255, 0, 0.1)' }}
                      className="bg-secondary/50 backdrop-blur-sm border border-secondary-foreground/30 rounded-2xl p-8 hover:border-secondary-foreground/50 transition-all group h-full flex flex-col"
                    >
                      <div className="flex-1">
                        <h3 className="font-heading text-2xl font-bold text-foreground group-hover:text-secondary-foreground mb-4 line-clamp-2 transition">
                          {job.jobTitle}
                        </h3>

                        <div className="space-y-3 mb-6">
                          {job.jobLocation && (
                            <div className="flex items-center gap-2">
                              <MapPin className="w-4 h-4 text-secondary-foreground flex-shrink-0" />
                              <span className="font-paragraph text-surface text-sm">
                                {job.jobLocation}
                              </span>
                            </div>
                          )}

                          {job.employmentType && (
                            <div className="flex items-center gap-2">
                              <Briefcase className="w-4 h-4 text-secondary-foreground flex-shrink-0" />
                              <span className="font-paragraph text-surface text-sm">
                                {job.employmentType}
                              </span>
                            </div>
                          )}

                          {job.salaryRange && (
                            <div className="flex items-center gap-2">
                              <DollarSign className="w-4 h-4 text-secondary-foreground flex-shrink-0" />
                              <span className="font-paragraph text-surface text-sm">
                                {job.salaryRange}
                              </span>
                            </div>
                          )}

                          {job.datePosted && (
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4 text-secondary-foreground flex-shrink-0" />
                              <span className="font-paragraph text-surface text-sm">
                                {formatDate(job.datePosted)}
                              </span>
                            </div>
                          )}
                        </div>

                        {job.jobDescription && (
                          <p className="font-paragraph text-surface line-clamp-3 mb-6">
                            {job.jobDescription}
                          </p>
                        )}
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-secondary-foreground/20">
                        {job.jobCategory && (
                          <span className="font-heading text-sm font-bold text-secondary-foreground">
                            {job.jobCategory}
                          </span>
                        )}
                        <ChevronRight className="w-5 h-5 text-secondary-foreground group-hover:translate-x-1 transition" />
                      </div>
                    </motion.div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <p className="font-heading text-3xl font-bold text-foreground mb-4">
                Nenhuma vaga encontrada
              </p>
              <p className="font-paragraph text-surface text-lg">
                Tente ajustar seus filtros de busca
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
              onClick={() => loadJobs(skip)}
              className="bg-secondary-foreground text-background font-heading font-bold px-12 py-4 text-lg rounded-lg transition-all"
            >
              Carregar Mais Vagas
            </motion.button>
          </div>
        )}
      </section>

      <Footer />
      </div>
    </PageTransition>
  );
}
