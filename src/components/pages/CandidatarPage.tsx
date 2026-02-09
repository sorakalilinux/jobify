import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Send, CheckCircle } from 'lucide-react';
import { BaseCrudService } from '@/integrations';
import { ListagemdeVagas } from '@/entities';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

export default function CandidatarPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [job, setJob] = useState<ListagemdeVagas | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [formData, setFormData] = useState({
    candidateName: '',
    candidateEmail: '',
    candidatePhone: '',
    resumeFile: '',
  });

  const [errors, setErrors] = useState({
    candidateName: '',
    candidateEmail: '',
    candidatePhone: '',
    resumeFile: '',
  });

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

  const validateForm = () => {
    const newErrors = {
      candidateName: '',
      candidateEmail: '',
      candidatePhone: '',
      resumeFile: '',
    };

    let isValid = true;

    if (!formData.candidateName.trim()) {
      newErrors.candidateName = 'Nome é obrigatório';
      isValid = false;
    }

    if (!formData.candidateEmail.trim()) {
      newErrors.candidateEmail = 'Email é obrigatório';
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.candidateEmail)) {
      newErrors.candidateEmail = 'Email inválido';
      isValid = false;
    }

    if (!formData.candidatePhone.trim()) {
      newErrors.candidatePhone = 'Telefone é obrigatório';
      isValid = false;
    }

    if (!formData.resumeFile.trim()) {
      newErrors.resumeFile = 'Link do currículo é obrigatório';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      await BaseCrudService.create('jobapplications', {
        _id: crypto.randomUUID(),
        candidateName: formData.candidateName,
        candidateEmail: formData.candidateEmail,
        candidatePhone: formData.candidatePhone,
        resumeFile: formData.resumeFile,
        appliedJobTitle: job?.jobTitle || '',
      });

      setIsSuccess(true);
      
      setTimeout(() => {
        navigate('/vagas');
      }, 3000);
    } catch (error) {
      console.error('Error submitting application:', error);
      alert('Erro ao enviar candidatura. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="w-full bg-background py-20">
          <div className="max-w-[100rem] mx-auto px-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-2xl mx-auto text-center"
            >
              <div className="bg-secondary border-2 border-primary p-12">
                <CheckCircle className="w-24 h-24 text-primary mx-auto mb-6" />
                <h1 className="font-heading text-5xl uppercase text-primary mb-6">
                  Candidatura Enviada!
                </h1>
                <p className="font-paragraph text-foreground text-xl mb-8">
                  Sua candidatura foi enviada com sucesso. A empresa entrará em contato em breve.
                </p>
                <p className="font-paragraph text-foreground text-sm">
                  Redirecionando para a página de vagas...
                </p>
              </div>
            </motion.div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

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
                className="max-w-4xl mx-auto"
              >
                {/* Back Button */}
                <Link to={`/vagas/${id}`}>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="font-heading uppercase text-primary hover:text-foreground transition-all mb-8 inline-flex items-center gap-2"
                  >
                    <ArrowLeft className="w-5 h-5" />
                    Voltar
                  </motion.button>
                </Link>

                <div className="bg-secondary border-2 border-primary p-10">
                  <h1 className="font-heading text-5xl uppercase text-primary mb-4">
                    Candidatar-se
                  </h1>
                  <p className="font-paragraph text-foreground text-xl mb-2">
                    Vaga: <span className="text-primary">{job.jobTitle}</span>
                  </p>
                  <p className="font-paragraph text-foreground mb-10">
                    Preencha o formulário abaixo para enviar sua candidatura
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name */}
                    <div>
                      <label htmlFor="candidateName" className="font-heading uppercase text-primary text-sm mb-2 block">
                        Nome Completo *
                      </label>
                      <input
                        type="text"
                        id="candidateName"
                        name="candidateName"
                        value={formData.candidateName}
                        onChange={handleChange}
                        className={`w-full bg-background text-foreground font-paragraph px-4 py-4 border-2 ${
                          errors.candidateName ? 'border-destructive' : 'border-primary'
                        } focus:outline-none focus:ring-2 focus:ring-primary`}
                        placeholder="Seu nome completo"
                      />
                      {errors.candidateName && (
                        <p className="font-paragraph text-destructive text-sm mt-2">{errors.candidateName}</p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label htmlFor="candidateEmail" className="font-heading uppercase text-primary text-sm mb-2 block">
                        Email *
                      </label>
                      <input
                        type="email"
                        id="candidateEmail"
                        name="candidateEmail"
                        value={formData.candidateEmail}
                        onChange={handleChange}
                        className={`w-full bg-background text-foreground font-paragraph px-4 py-4 border-2 ${
                          errors.candidateEmail ? 'border-destructive' : 'border-primary'
                        } focus:outline-none focus:ring-2 focus:ring-primary`}
                        placeholder="seu.email@exemplo.com"
                      />
                      {errors.candidateEmail && (
                        <p className="font-paragraph text-destructive text-sm mt-2">{errors.candidateEmail}</p>
                      )}
                    </div>

                    {/* Phone */}
                    <div>
                      <label htmlFor="candidatePhone" className="font-heading uppercase text-primary text-sm mb-2 block">
                        Telefone *
                      </label>
                      <input
                        type="tel"
                        id="candidatePhone"
                        name="candidatePhone"
                        value={formData.candidatePhone}
                        onChange={handleChange}
                        className={`w-full bg-background text-foreground font-paragraph px-4 py-4 border-2 ${
                          errors.candidatePhone ? 'border-destructive' : 'border-primary'
                        } focus:outline-none focus:ring-2 focus:ring-primary`}
                        placeholder="(11) 99999-9999"
                      />
                      {errors.candidatePhone && (
                        <p className="font-paragraph text-destructive text-sm mt-2">{errors.candidatePhone}</p>
                      )}
                    </div>

                    {/* Resume URL */}
                    <div>
                      <label htmlFor="resumeFile" className="font-heading uppercase text-primary text-sm mb-2 block">
                        Link do Currículo *
                      </label>
                      <input
                        type="url"
                        id="resumeFile"
                        name="resumeFile"
                        value={formData.resumeFile}
                        onChange={handleChange}
                        className={`w-full bg-background text-foreground font-paragraph px-4 py-4 border-2 ${
                          errors.resumeFile ? 'border-destructive' : 'border-primary'
                        } focus:outline-none focus:ring-2 focus:ring-primary`}
                        placeholder="https://drive.google.com/..."
                      />
                      <p className="font-paragraph text-foreground text-sm mt-2">
                        Cole o link do seu currículo (Google Drive, Dropbox, etc.)
                      </p>
                      {errors.resumeFile && (
                        <p className="font-paragraph text-destructive text-sm mt-2">{errors.resumeFile}</p>
                      )}
                    </div>

                    {/* Submit Button */}
                    <div className="pt-6">
                      <motion.button
                        type="submit"
                        disabled={isSubmitting}
                        whileHover={{ scale: isSubmitting ? 1 : 1.05 }}
                        whileTap={{ scale: isSubmitting ? 1 : 0.95 }}
                        className="w-full bg-primary text-primary-foreground font-heading uppercase py-5 text-lg tracking-wider hover:bg-opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                      >
                        {isSubmitting ? (
                          <>
                            <LoadingSpinner />
                            Enviando...
                          </>
                        ) : (
                          <>
                            <Send className="w-5 h-5" />
                            Enviar Candidatura
                          </>
                        )}
                      </motion.button>
                    </div>
                  </form>
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
