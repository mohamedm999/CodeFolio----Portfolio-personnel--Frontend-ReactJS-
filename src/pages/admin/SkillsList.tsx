import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plus, Edit3, Trash2, Sparkles, Zap } from 'lucide-react';
import { Loading } from '../../components/ui/Loading';
import { ErrorMessage } from '../../components/ui/ErrorMessage';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { useErrorHandler } from '../../hooks/useErrorHandler';
import { useFirestore } from '../../hooks/useFirestore';
import { deleteSkill } from '../../services/firebase/skills.service';
import { Skill } from '../../types/firebase.types';

export const SkillsList = () => {
  const { data: skills, loading, error } = useFirestore<Skill>('skills', [], true);
  const { handleError, handleSuccess } = useErrorHandler();

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this skill?')) {
      try {
        await deleteSkill(id);
        handleSuccess('✅ Skill deleted successfully');
      } catch (err: any) {
        handleError(err, 'Error deleting skill');
      }
    }
  };

  if (loading) return <Loading />;
  if (error) return <ErrorMessage error={error} />;

  // Group skills by category
  const groupedSkills = skills.reduce((acc, skill) => {
    const category = skill.category || 'Other';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  const categoryColors: Record<string, string> = {
    'Frontend': 'from-purple-500 to-pink-500',
    'Backend': 'from-cyan-500 to-blue-500',
    'Database': 'from-green-500 to-emerald-500',
    'Tools': 'from-orange-500 to-yellow-500',
    'Other': 'from-gray-500 to-slate-500'
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold text-white">Skills</h1>
          <p className="text-gray-400 mt-1">Manage your technical skills</p>
        </div>
        <Link to="/admin/skills/new">
          <Button icon={<Plus className="w-5 h-5" />}>
            New Skill
          </Button>
        </Link>
      </motion.div>

      {/* Skills by Category */}
      <div className="space-y-8">
        {Object.entries(groupedSkills).map(([category, categorySkills], categoryIndex) => (
          <motion.div
            key={category}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: categoryIndex * 0.1 }}
          >
            <Card className="p-6">
              {/* Category Header */}
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-purple-500/20">
                <div className={`p-2 rounded-xl bg-gradient-to-br ${categoryColors[category] || categoryColors['Other']}`}>
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">{category}</h2>
                  <p className="text-gray-400 text-sm">{categorySkills.length} skills</p>
                </div>
              </div>

              {/* Skills Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {categorySkills.map((skill, index) => (
                  <motion.div
                    key={skill.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className="group p-4 rounded-xl border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300"
                    style={{ background: 'rgba(15, 23, 42, 0.5)' }}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl group-hover:scale-110 transition-transform">
                          {skill.icon || '💻'}
                        </span>
                        <h3 className="font-semibold text-white group-hover:text-purple-400 transition-colors">
                          {skill.name}
                        </h3>
                      </div>
                      <span className="text-sm text-purple-400 font-medium">{skill.level}%</span>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden mb-4">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.level}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                      />
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Link to={`/admin/skills/edit/${skill.id}`} className="flex-1">
                        <Button variant="ghost" size="sm" className="w-full" icon={<Edit3 className="w-4 h-4" />}>
                          Edit
                        </Button>
                      </Link>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(skill.id)}
                        className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>
        ))}

        {/* Empty State */}
        {skills.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <Card className="text-center py-16 border-2 border-dashed border-purple-500/30">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 mb-4">
                <Sparkles className="w-8 h-8 text-cyan-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">No skills yet</h3>
              <p className="text-gray-400 mb-6">Add your first skill to showcase your expertise</p>
              <Link to="/admin/skills/new">
                <Button icon={<Plus className="w-5 h-5" />}>
                  Add Your First Skill
                </Button>
              </Link>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
};
