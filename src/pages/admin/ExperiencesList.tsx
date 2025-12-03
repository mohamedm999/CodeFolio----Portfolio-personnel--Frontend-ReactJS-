import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plus, Edit3, Trash2, Briefcase, MapPin, Calendar, Building2 } from 'lucide-react';
import { Loading } from '../../components/ui/Loading';
import { ErrorMessage } from '../../components/ui/ErrorMessage';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { useErrorHandler } from '../../hooks/useErrorHandler';
import { useFirestore } from '../../hooks/useFirestore';
import { deleteExperience } from '../../services/firebase/experiences.service';
import { Experience } from '../../types/firebase.types';

export const ExperiencesList = () => {
  const { data: experiences, loading, error } = useFirestore<Experience>('experiences', [], true);
  const { handleError, handleSuccess } = useErrorHandler();

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this experience?')) {
      try {
        await deleteExperience(id);
        handleSuccess('✅ Experience deleted successfully');
      } catch (err: any) {
        handleError(err, 'Error deleting experience');
      }
    }
  };

  if (loading) return <Loading />;
  if (error) return <ErrorMessage error={error} />;

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold text-white">Experiences</h1>
          <p className="text-gray-400 mt-1">Manage your work experiences</p>
        </div>
        <Link to="/admin/experiences/new">
          <Button icon={<Plus className="w-5 h-5" />}>
            New Experience
          </Button>
        </Link>
      </motion.div>

      {/* Timeline */}
      <div className="relative space-y-6">
        {/* Timeline Line */}
        {experiences.length > 0 && (
          <div className="absolute left-6 top-8 bottom-8 w-0.5 bg-gradient-to-b from-purple-500 via-pink-500 to-purple-500/20 hidden md:block" />
        )}

        {experiences.map((experience, index) => (
          <motion.div
            key={experience.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="relative"
          >
            {/* Timeline Dot */}
            <div className="absolute left-4 top-8 w-4 h-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 border-4 border-[#0a091a] hidden md:block z-10" />

            <Card className="md:ml-12 p-6 group hover:border-purple-500/40 transition-all">
              <div className="flex flex-col lg:flex-row justify-between gap-6">
                <div className="flex-1">
                  {/* Header */}
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <h3 className="text-xl font-bold text-white group-hover:text-purple-400 transition-colors">
                      {experience.position}
                    </h3>
                    <span className="px-4 py-1.5 rounded-full text-sm font-medium bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 border border-purple-500/30">
                      <Building2 className="w-4 h-4 inline mr-1" />
                      {experience.company}
                    </span>
                    {experience.current && (
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-400 border border-green-500/30">
                        Current
                      </span>
                    )}
                  </div>

                  {/* Meta Info */}
                  <div className="flex flex-wrap gap-4 text-sm text-gray-400 mb-4">
                    <span className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-purple-400" />
                      {experience.startDate} — {experience.current ? 'Present' : experience.endDate}
                    </span>
                    {experience.location && (
                      <span className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-pink-400" />
                        {experience.location}
                      </span>
                    )}
                  </div>

                  {/* Description */}
                  <p className="text-gray-300 mb-4 whitespace-pre-line leading-relaxed">
                    {experience.description}
                  </p>

                  {/* Technologies */}
                  {experience.technologies && experience.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {experience.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 text-xs rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex lg:flex-col gap-2 lg:justify-start shrink-0">
                  <Link to={`/admin/experiences/edit/${experience.id}`}>
                    <Button variant="secondary" size="sm" icon={<Edit3 className="w-4 h-4" />}>
                      Edit
                    </Button>
                  </Link>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(experience.id)}
                    icon={<Trash2 className="w-4 h-4" />}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}

        {/* Empty State */}
        {experiences.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <Card className="text-center py-16 border-2 border-dashed border-purple-500/30">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-pink-500/20 to-purple-500/20 mb-4">
                <Briefcase className="w-8 h-8 text-pink-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">No experiences yet</h3>
              <p className="text-gray-400 mb-6">Add your first experience to showcase your journey</p>
              <Link to="/admin/experiences/new">
                <Button icon={<Plus className="w-5 h-5" />}>
                  Add Your First Experience
                </Button>
              </Link>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
};
