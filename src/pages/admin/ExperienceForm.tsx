import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Briefcase, Building2, MapPin, Calendar, Code2, Save, X } from 'lucide-react';
import { Loading } from '../../components/ui/Loading';
import { ErrorMessage } from '../../components/ui/ErrorMessage';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input, TextArea } from '../../components/ui/Input';
import { useErrorHandler } from '../../hooks/useErrorHandler';
import { createExperience, getExperienceById, updateExperience } from '../../services/firebase/experiences.service';

export const ExperienceForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { handleError, handleSuccess } = useErrorHandler();
  const isEdit = Boolean(id);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const [formData, setFormData] = useState({
    company: '',
    position: '',
    description: '',
    startDate: '',
    endDate: '',
    current: false,
    location: '',
    technologies: '',
  });

  useEffect(() => {
    if (isEdit && id) {
      const fetchExperience = async () => {
        try {
          setLoading(true);
          const experience = await getExperienceById(id);
          if (experience) {
            setFormData({
              company: experience.company,
              position: experience.position,
              description: experience.description || '',
              startDate: experience.startDate,
              endDate: experience.endDate || '',
              current: experience.current || false,
              location: experience.location || '',
              technologies: experience.technologies?.join(', ') || '',
            });
          }
        } catch (err: any) {
          setError(err);
        } finally {
          setLoading(false);
        }
      };
      fetchExperience();
    }
  }, [isEdit, id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = e.target.type === 'checkbox'
      ? (e.target as HTMLInputElement).checked
      : e.target.value;

    setFormData({
      ...formData,
      [e.target.name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      const input = {
        company: formData.company,
        position: formData.position,
        description: formData.description || undefined,
        startDate: formData.startDate,
        endDate: formData.current ? undefined : (formData.endDate || undefined),
        current: formData.current,
        location: formData.location || undefined,
        technologies: formData.technologies
          ? formData.technologies.split(',').map((t) => t.trim()).filter(Boolean)
          : [],
      };

      if (isEdit && id) {
        await updateExperience(id, input);
        handleSuccess('✅ Experience updated successfully!');
      } else {
        await createExperience(input);
        handleSuccess('✅ Experience created successfully!');
      }

      navigate('/admin/experiences');
    } catch (err: any) {
      handleError(err, 'Error saving experience');
    } finally {
      setLoading(false);
    }
  };

  if (loading && !formData.company) return <Loading />;
  if (error) return <ErrorMessage error={error} />;

  return (
    <div className="space-y-6 max-w-3xl">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold text-white">
          {isEdit ? 'Edit Experience' : 'New Experience'}
        </h1>
        <p className="text-gray-400 mt-1">
          {isEdit ? 'Update your experience information' : 'Add a new professional experience'}
        </p>
      </motion.div>

      <form onSubmit={handleSubmit}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-6"
        >
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-xl bg-gradient-to-br from-pink-500/20 to-purple-500/20">
                <Briefcase className="w-5 h-5 text-pink-400" />
              </div>
              <h2 className="text-xl font-bold text-white">Position Details</h2>
            </div>

            <div className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <Input
                  label="Company *"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="Google, Amazon, Startup..."
                  icon={<Building2 className="w-5 h-5" />}
                />

                <Input
                  label="Position *"
                  name="position"
                  value={formData.position}
                  onChange={handleChange}
                  placeholder="Senior Frontend Developer"
                  icon={<Briefcase className="w-5 h-5" />}
                />
              </div>

              <Input
                label="Location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Paris, France (or Remote)"
                icon={<MapPin className="w-5 h-5" />}
              />
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20">
                <Calendar className="w-5 h-5 text-cyan-400" />
              </div>
              <h2 className="text-xl font-bold text-white">Duration</h2>
            </div>

            <div className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <Input
                  label="Start Date *"
                  name="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={handleChange}
                />

                <div className="space-y-3">
                  <Input
                    label="End Date"
                    name="endDate"
                    type="date"
                    value={formData.endDate}
                    onChange={handleChange}
                    disabled={formData.current}
                  />
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <div className="relative">
                      <input
                        type="checkbox"
                        id="current"
                        name="current"
                        checked={formData.current}
                        onChange={handleChange}
                        className="sr-only"
                      />
                      <div 
                        className={`w-10 h-6 rounded-full transition-all ${
                          formData.current 
                            ? 'bg-gradient-to-r from-purple-500 to-pink-500' 
                            : 'bg-gray-700'
                        }`}
                      >
                        <div 
                          className={`w-4 h-4 bg-white rounded-full shadow transition-transform mt-1 ${
                            formData.current ? 'translate-x-5 ml-0' : 'translate-x-1'
                          }`}
                        />
                      </div>
                    </div>
                    <span className="text-gray-300 group-hover:text-white transition-colors">
                      Current Position
                    </span>
                  </label>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20">
                <Code2 className="w-5 h-5 text-purple-400" />
              </div>
              <h2 className="text-xl font-bold text-white">Details</h2>
            </div>

            <div className="space-y-5">
              <TextArea
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={5}
                placeholder="Describe your responsibilities and achievements..."
              />

              <Input
                label="Technologies"
                name="technologies"
                value={formData.technologies}
                onChange={handleChange}
                placeholder="React, Node.js, AWS..."
                icon={<Code2 className="w-5 h-5" />}
              />
              <p className="text-sm text-gray-500 -mt-3">
                Separate technologies with commas
              </p>
            </div>
          </Card>

          <div className="flex gap-3">
            <Button
              type="submit"
              loading={loading}
              className="flex-1"
              icon={<Save className="w-5 h-5" />}
            >
              {loading ? 'Saving...' : 'Save Experience'}
            </Button>
            <Button
              type="button"
              variant="ghost"
              onClick={() => navigate('/admin/experiences')}
              icon={<X className="w-5 h-5" />}
            >
              Cancel
            </Button>
          </div>
        </motion.div>
      </form>
    </div>
  );
};
