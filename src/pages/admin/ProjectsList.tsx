import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plus, Edit3, Trash2, ExternalLink, Github, FolderKanban } from 'lucide-react';
import { Loading } from '../../components/ui/Loading';
import { ErrorMessage } from '../../components/ui/ErrorMessage';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { useErrorHandler } from '../../hooks/useErrorHandler';
import { useFirestore } from '../../hooks/useFirestore';
import { deleteProject } from '../../services/firebase/projects.service';
import { Project } from '../../types/firebase.types';

export const ProjectsList = () => {
  const { data: projects, loading, error, refresh } = useFirestore<Project>('projects', [], true);
  const { handleError, handleSuccess } = useErrorHandler();

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await deleteProject(id);
        handleSuccess('✅ Project deleted successfully');
      } catch (err: any) {
        handleError(err, 'Error deleting project');
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
          <h1 className="text-3xl font-bold text-white">Projects</h1>
          <p className="text-gray-400 mt-1">Manage your portfolio projects</p>
        </div>
        <Link to="/admin/projects/new">
          <Button icon={<Plus className="w-5 h-5" />}>
            New Project
          </Button>
        </Link>
      </motion.div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card 
              hoverable 
              glow="purple"
              className="overflow-hidden group h-full flex flex-col"
            >
              {/* Image */}
              {project.imageUrl ? (
                <div className="relative h-48 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a091a] via-transparent to-transparent opacity-80 z-10" />
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                  {/* Featured Badge */}
                  {project.featured && (
                    <div className="absolute top-3 left-3 z-20 px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                      Featured
                    </div>
                  )}
                </div>
              ) : (
                <div className="h-48 bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center">
                  <FolderKanban className="w-16 h-16 text-purple-500/50" />
                </div>
              )}

              {/* Content */}
              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-400 text-sm mb-4 line-clamp-2 flex-1">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies?.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-xs rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies && project.technologies.length > 3 && (
                    <span className="px-3 py-1 text-xs rounded-full bg-gray-500/10 text-gray-400 border border-gray-500/20">
                      +{project.technologies.length - 3}
                    </span>
                  )}
                </div>

                {/* Links */}
                <div className="flex items-center gap-3 mb-4">
                  {project.demoUrl && (
                    <a 
                      href={project.demoUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-purple-400 transition-colors"
                    >
                      <ExternalLink className="w-5 h-5" />
                    </a>
                  )}
                  {project.githubUrl && (
                    <a 
                      href={project.githubUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-purple-400 transition-colors"
                    >
                      <Github className="w-5 h-5" />
                    </a>
                  )}
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-4 border-t border-purple-500/20">
                  <Link to={`/admin/projects/edit/${project.id}`} className="flex-1">
                    <Button variant="secondary" size="sm" className="w-full" icon={<Edit3 className="w-4 h-4" />}>
                      Edit
                    </Button>
                  </Link>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(project.id)}
                    icon={<Trash2 className="w-4 h-4" />}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {projects.length === 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <Card className="text-center py-16 border-2 border-dashed border-purple-500/30">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 mb-4">
              <FolderKanban className="w-8 h-8 text-purple-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">No projects yet</h3>
            <p className="text-gray-400 mb-6">Create your first project to showcase your work</p>
            <Link to="/admin/projects/new">
              <Button icon={<Plus className="w-5 h-5" />}>
                Create Your First Project
              </Button>
            </Link>
          </Card>
        </motion.div>
      )}
    </div>
  );
};
