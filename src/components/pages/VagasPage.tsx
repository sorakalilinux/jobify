import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, MapPin, Briefcase, DollarSign, Calendar, ChevronRight } from 'lucide-react';
import { BaseCrudService } from '@/integrations';
import { ListagemdeVagas } from '@/entities';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
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
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="w-full bg-secondary py-20 border-b-2 border-primary">
        <div className="max-w-[100rem] mx-auto px-8">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-heading text-6xl md:text-7xl uppercase text-primary text-center mb-6"
          >
            Explore Oportunidades
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-paragraph text-xl text-foreground text-center max-w-3xl mx-auto"
          >
            Encontre a vaga perfeita para impulsionar sua carreira
          </motion.p>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="w-full bg-background py-12 border-b border-primary">
        <div className="max-w-[100rem] mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Search */}
            <div className="lg:col-span-2 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-primary w-5 h-5" />
              <input
                type="text"
                placeholder="Buscar por título ou descrição..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-secondary text-foreground font-paragraph pl-12 pr-4 py-4 border-2 border-primary focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-secondary text-foreground font-paragraph px-4 py-4 border-2 border-primary focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary"
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
              className="bg-secondary text-foreground font-paragraph px-4 py-4 border-2 border-primary focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary"
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
              className="bg-secondary text-foreground font-paragraph px-4 py-4 border-2 border-primary focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary"
            >
              <option value="">Todos os Tipos</option>
              {types.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          {/* Results Count */}
          <div className="mt-6">
            <p className="font-paragraph text-foreground text-lg">
              <span className="text-primary font-heading">{filteredJobs.length}</span> {filteredJobs.length === 1 ? 'vaga encontrada' : 'vagas encontradas'}
            </p>
          </div>
        </div>
      </section>

      {/* Jobs Grid */}
      <section className="w-full bg-background py-16">
        <div className="max-w-[100rem] mx-auto px-8">
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
                      <div className="bg-secondary border-2 border-primary p-8 hover:bg-primary hover:text-primary-foreground transition-all group h-full flex flex-col">
                        <div className="flex-1">
                          <h3 className="font-heading text-2xl uppercase text-primary group-hover:text-primary-foreground mb-4 line-clamp-2">
                            {job.jobTitle}
                          </h3>

                          <div className="space-y-3 mb-6">
                            {job.jobLocation && (
                              <div className="flex items-center gap-2">
                                <MapPin className="w-4 h-4 text-primary group-hover:text-primary-foreground flex-shrink-0" />
                                <span className="font-paragraph text-foreground group-hover:text-primary-foreground text-sm">
                                  {job.jobLocation}
                                </span>
                              </div>
                            )}

                            {job.employmentType && (
                              <div className="flex items-center gap-2">
                                <Briefcase className="w-4 h-4 text-primary group-hover:text-primary-foreground flex-shrink-0" />
                                <span className="font-paragraph text-foreground group-hover:text-primary-foreground text-sm">
                                  {job.employmentType}
                                </span>
                              </div>
                            )}

                            {job.salaryRange && (
                              <div className="flex items-center gap-2">
                                <DollarSign className="w-4 h-4 text-primary group-hover:text-primary-foreground flex-shrink-0" />
                                <span className="font-paragraph text-foreground group-hover:text-primary-foreground text-sm">
                                  {job.salaryRange}
                                </span>
                              </div>
                            )}

                            {job.datePosted && (
                              <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-primary group-hover:text-primary-foreground flex-shrink-0" />
                                <span className="font-paragraph text-foreground group-hover:text-primary-foreground text-sm">
                                  {formatDate(job.datePosted)}
                                </span>
                              </div>
                            )}
                          </div>

                          {job.jobDescription && (
                            <p className="font-paragraph text-foreground group-hover:text-primary-foreground line-clamp-3 mb-6">
                              {job.jobDescription}
                            </p>
                          )}
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t border-primary group-hover:border-primary-foreground">
                          {job.jobCategory && (
                            <span className="font-heading text-sm uppercase text-primary group-hover:text-primary-foreground">
                              {job.jobCategory}
                            </span>
                          )}
                          <ChevronRight className="w-5 h-5 text-primary group-hover:text-primary-foreground" />
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <div className="text-center py-20">
                <p className="font-heading text-3xl uppercase text-primary mb-4">
                  Nenhuma vaga encontrada
                </p>
                <p className="font-paragraph text-foreground text-lg">
                  Tente ajustar seus filtros de busca
                </p>
              </div>
            )}
          </div>

          {/* Load More */}
          {hasNext && !isLoading && (
            <div className="text-center mt-12">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => loadJobs(skip)}
                className="bg-primary text-primary-foreground font-heading uppercase px-12 py-4 text-lg tracking-wider hover:bg-opacity-90 transition-all"
              >
                Carregar Mais Vagas
              </motion.button>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
