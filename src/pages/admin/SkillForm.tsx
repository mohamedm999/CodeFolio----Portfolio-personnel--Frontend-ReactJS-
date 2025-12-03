import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, Save, X, Zap } from 'lucide-react';
import { Loading } from '../../components/ui/Loading';
import { ErrorMessage } from '../../components/ui/ErrorMessage';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input, Select } from '../../components/ui/Input';
import { useErrorHandler } from '../../hooks/useErrorHandler';
import { createSkill, getSkillById, updateSkill } from '../../services/firebase/skills.service';

export const SkillForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { handleError, handleSuccess } = useErrorHandler();
  const isEdit = Boolean(id);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    category: 'Frontend',
    level: '50',
    icon: '',
  });

  useEffect(() => {
    if (isEdit && id) {
      const fetchSkill = async () => {
        try {
          setLoading(true);
          const skill = await getSkillById(id);
          if (skill) {
            setFormData({
              name: skill.name,
              category: skill.category,
              level: skill.level?.toString() || '50',
              icon: skill.icon || '',
            });
          }
        } catch (err: any) {
          setError(err);
        } finally {
          setLoading(false);
        }
      };
      fetchSkill();
    }
  }, [isEdit, id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
        name: formData.name,
        category: formData.category,
        level: parseInt(formData.level),
        icon: formData.icon || undefined,
      };

      if (isEdit && id) {
        await updateSkill(id, input);
        handleSuccess('✅ Skill updated successfully!');
      } else {
        await createSkill(input);
        handleSuccess('✅ Skill created successfully!');
      }

      navigate('/admin/skills');
    } catch (err: any) {
      handleError(err, 'Error saving skill');
    } finally {
      setLoading(false);
    }
  };

  if (loading && !formData.name) return <Loading />;
  if (error) return <ErrorMessage error={error} />;

  const categoryOptions = [
    { value: 'Frontend', label: 'Frontend' },
    { value: 'Backend', label: 'Backend' },
    { value: 'Database', label: 'Database' },
    { value: 'DevOps', label: 'DevOps' },
    { value: 'Mobile', label: 'Mobile' },
    { value: 'Tools', label: 'Tools' },
    { value: 'Design', label: 'Design' },
    { value: 'Other', label: 'Other' },
  ];

  return (
    <div className="space-y-6 max-w-2xl">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold text-white">
          {isEdit ? 'Edit Skill' : 'New Skill'}
        </h1>
        <p className="text-gray-400 mt-1">
          {isEdit ? 'Update your skill information' : 'Add a new skill to your portfolio'}
        </p>
      </motion.div>

      <form onSubmit={handleSubmit}>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="p-6 mb-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20">
                <Sparkles className="w-5 h-5 text-cyan-400" />
              </div>
              <h2 className="text-xl font-bold text-white">Skill Details</h2>
            </div>

            <div className="space-y-6">
              <Input
                label="Skill Name *"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="React, TypeScript, Figma..."
                icon={<Zap className="w-5 h-5" />}
              />

              <Select
                label="Category *"
                name="category"
                value={formData.category}
                onChange={handleChange}
                options={categoryOptions}
              />

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-3">
                  Proficiency Level
                </label>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500 text-sm">Beginner</span>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 font-bold text-lg">
                      {formData.level}%
                    </span>
                    <span className="text-gray-500 text-sm">Expert</span>
                  </div>
                  <input
                    type="range"
                    name="level"
                    min="0"
                    max="100"
                    value={formData.level}
                    onChange={handleChange}
                    className="w-full h-2 bg-gray-800 rounded-full appearance-none cursor-pointer accent-purple-500"
                    style={{
                      background: `linear-gradient(to right, #A855F7 0%, #EC4899 ${formData.level}%, #1f2937 ${formData.level}%)`
                    }}
                  />
                </div>
              </div>

              <Input
                label="Icon (Emoji)"
                name="icon"
                value={formData.icon}
                onChange={handleChange}
                placeholder="⚛️ 🚀 💻 🎨"
              />
              <p className="text-sm text-gray-500 -mt-3">
                Use an emoji to represent this skill
              </p>
            </div>
          </Card>

          {/* Preview */}
          <Card className="p-6 mb-6">
            <h3 className="text-lg font-semibold text-white mb-4">Preview</h3>
            <div 
              className="p-4 rounded-xl border border-purple-500/20"
              style={{ background: 'rgba(15, 23, 42, 0.5)' }}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{formData.icon || '💻'}</span>
                  <h4 className="font-semibold text-white">
                    {formData.name || 'Skill Name'}
                  </h4>
                </div>
                <span className="text-sm text-purple-400 font-medium">{formData.level}%</span>
              </div>
              <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${formData.level}%` }}
                  transition={{ duration: 0.5 }}
                  className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                />
              </div>
              <p className="text-gray-500 text-xs mt-2">{formData.category}</p>
            </div>
          </Card>

          <div className="flex gap-3">
            <Button
              type="submit"
              loading={loading}
              className="flex-1"
              icon={<Save className="w-5 h-5" />}
            >
              {loading ? 'Saving...' : 'Save Skill'}
            </Button>
            <Button
              type="button"
              variant="ghost"
              onClick={() => navigate('/admin/skills')}
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
