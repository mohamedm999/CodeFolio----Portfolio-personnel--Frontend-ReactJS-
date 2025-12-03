import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FolderKanban, Github, ExternalLink, Code2, Save, X, Image } from 'lucide-react';
import { Loading } from '../../components/ui/Loading';
import { ErrorMessage } from '../../components/ui/ErrorMessage';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input, TextArea } from '../../components/ui/Input';
import { ImageUpload } from '../../components/ui/ImageUpload';
import { useErrorHandler } from '../../hooks/useErrorHandler';
import { createProject, getProjectById, updateProject } from '../../services/firebase/projects.service';

export const ProjectForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { handleError, handleSuccess } = useErrorHandler();
  const isEdit = Boolean(id);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    imageUrl: '',
    githubUrl: '',
    demoUrl: '',
    technologies: '',
  });

  useEffect(() => {
    if (isEdit && id) {
      const fetchProject = async () => {
        try {
          setLoading(true);
          const project = await getProjectById(id);
          if (project) {
            setFormData({
              title: project.title,
              description: project.description || '',
              imageUrl: project.imageUrl || '',
              githubUrl: project.githubUrl || '',
              demoUrl: project.demoUrl || '',
              technologies: project.technologies?.join(', ') || '',
            });
          }
        } catch (err: any) {
          setError(err);
        } finally {
          setLoading(false);
        }
      };
      fetchProject();
    }
  }, [isEdit, id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      const input = {
        title: formData.title,
        description: formData.description || undefined,
        imageUrl: formData.imageUrl || undefined,
        githubUrl: formData.githubUrl || undefined,
        demoUrl: formData.demoUrl || undefined,
        technologies: formData.technologies
          ? formData.technologies.split(',').map((t) => t.trim()).filter(Boolean)
          : [],
      };

      if (isEdit && id) {
        await updateProject(id, input, imageFile || undefined);
        handleSuccess('✅ Project updated successfully!');
      } else {
        await createProject(input, imageFile || undefined);
        handleSuccess('✅ Project created successfully!');
      }

      navigate('/admin/projects');
    } catch (err: any) {
      handleError(err, 'Error saving project');
    } finally {
      setLoading(false);
    }
  };

  if (loading && !formData.title) return <Loading />;
  if (error) return <ErrorMessage error={error} />;

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold text-white">
          {isEdit ? 'Edit Project' : 'New Project'}
        </h1>
        <p className="text-gray-400 mt-1">
          {isEdit ? 'Update your project information' : 'Create a new portfolio project'}
        </p>
      </motion.div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Form */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2 space-y-6"
          >
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20">
                  <FolderKanban className="w-5 h-5 text-purple-400" />
                </div>
                <h2 className="text-xl font-bold text-white">Project Details</h2>
              </div>

              <div className="space-y-5">
                <Input
                  label="Project Title *"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="My Awesome Project"
                />

                <TextArea
                  label="Description *"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={5}
                  placeholder="Describe your project in detail..."
                />

                <Input
                  label="Technologies *"
                  name="technologies"
                  value={formData.technologies}
                  onChange={handleChange}
                  placeholder="React, Node.js, MongoDB, TypeScript"
                  icon={<Code2 className="w-5 h-5" />}
                />
                <p className="text-sm text-gray-500 -mt-3">
                  Separate technologies with commas
                </p>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20">
                  <ExternalLink className="w-5 h-5 text-cyan-400" />
                </div>
                <h2 className="text-xl font-bold text-white">Links</h2>
              </div>

              <div className="space-y-5">
                <Input
                  label="GitHub URL"
                  name="githubUrl"
                  value={formData.githubUrl}
                  onChange={handleChange}
                  placeholder="https://github.com/username/project"
                  icon={<Github className="w-5 h-5" />}
                />

                <Input
                  label="Demo URL"
                  name="demoUrl"
                  value={formData.demoUrl}
                  onChange={handleChange}
                  placeholder="https://project-demo.com"
                  icon={<ExternalLink className="w-5 h-5" />}
                />
              </div>
            </Card>
          </motion.div>

          {/* Sidebar */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-xl bg-gradient-to-br from-pink-500/20 to-purple-500/20">
                  <Image className="w-5 h-5 text-pink-400" />
                </div>
                <h2 className="text-xl font-bold text-white">Project Image</h2>
              </div>
              <ImageUpload
                currentImageUrl={formData.imageUrl}
                onImageSelected={(file) => setImageFile(file)}
                onImageRemoved={() => {
                  setImageFile(null);
                  setFormData(prev => ({ ...prev, imageUrl: '' }));
                }}
              />
            </Card>

            <div className="flex flex-col gap-3">
              <Button
                type="submit"
                loading={loading}
                className="w-full"
                icon={<Save className="w-5 h-5" />}
              >
                {loading ? 'Saving...' : 'Save Project'}
              </Button>
              <Button
                type="button"
                variant="ghost"
                onClick={() => navigate('/admin/projects')}
                className="w-full"
                icon={<X className="w-5 h-5" />}
              >
                Cancel
              </Button>
            </div>
          </motion.div>
        </div>
      </form>
    </div>
  );
};
