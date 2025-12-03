import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FolderKanban, Sparkles, Briefcase, User, Plus, ExternalLink, Edit3 } from 'lucide-react';
import { Loading } from '../../components/ui/Loading';
import { ErrorMessage } from '../../components/ui/ErrorMessage';
import { Card, StatCard } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { useFirestore } from '../../hooks/useFirestore';
import { getProfile } from '../../services/firebase/profile.service';
import { Profile } from '../../types/firebase.types';

export const Dashboard = () => {
  const { data: projects, loading: projectsLoading, error: projectsError } = useFirestore('projects');
  const { data: skills, loading: skillsLoading, error: skillsError } = useFirestore('skills');
  const { data: experiences, loading: experiencesLoading, error: experiencesError } = useFirestore('experiences');

  const [profile, setProfile] = useState<Profile | null>(null);
  const [profileLoading, setProfileLoading] = useState(true);
  const [profileError, setProfileError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfile();
        setProfile(data);
      } catch (err: any) {
        console.error('Error fetching profile:', err);
        setProfileError(err);
      } finally {
        setProfileLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const loading = projectsLoading || skillsLoading || experiencesLoading || profileLoading;
  const error = projectsError || skillsError || experiencesError || profileError;

  if (loading) return <Loading />;
  if (error) return <ErrorMessage error={error} />;

  const stats = [
    {
      title: 'Projects',
      count: projects?.length || 0,
      link: '/admin/projects',
      color: 'purple' as const,
      icon: <FolderKanban className="w-6 h-6 text-white" />,
    },
    {
      title: 'Skills',
      count: skills?.length || 0,
      link: '/admin/skills',
      color: 'cyan' as const,
      icon: <Sparkles className="w-6 h-6 text-white" />,
    },
    {
      title: 'Experience',
      count: experiences?.length || 0,
      link: '/admin/experiences',
      color: 'pink' as const,
      icon: <Briefcase className="w-6 h-6 text-white" />,
    },
    {
      title: 'Profile',
      count: profile ? '✓' : '—',
      link: '/admin/profile',
      color: 'green' as const,
      icon: <User className="w-6 h-6 text-white" />,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold text-white">Dashboard</h1>
          <p className="text-gray-400 mt-1">Welcome back! Here's an overview of your portfolio.</p>
        </div>
        <Link to="/" target="_blank">
          <Button variant="outline" icon={<ExternalLink className="w-4 h-4" />}>
            View Portfolio
          </Button>
        </Link>
      </motion.div>

      {/* Statistics Cards */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {stats.map((stat, index) => (
          <Link key={stat.title} to={stat.link}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <StatCard
                title={stat.title}
                value={stat.count}
                icon={stat.icon}
                color={stat.color}
              />
            </motion.div>
          </Link>
        ))}
      </motion.div>

      {/* Profile Overview */}
      {profile && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">Profile Overview</h2>
              <Link to="/admin/profile">
                <Button size="sm" variant="secondary" icon={<Edit3 className="w-4 h-4" />}>
                  Edit Profile
                </Button>
              </Link>
            </div>
            <div className="flex flex-col sm:flex-row items-start gap-6">
              {profile.avatar ? (
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full blur-lg opacity-50" />
                  <img
                    src={profile.avatar}
                    alt={profile.name}
                    className="relative w-24 h-24 rounded-full object-cover border-2 border-purple-500/50"
                  />
                </div>
              ) : (
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                  <User className="w-10 h-10 text-white" />
                </div>
              )}
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-white">{profile.name}</h3>
                <p className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 font-medium text-lg">
                  {profile.title}
                </p>
                <p className="text-gray-400 mt-3 line-clamp-2">{profile.bio}</p>
                {profile.email && (
                  <p className="text-gray-500 mt-2 text-sm">{profile.email}</p>
                )}
              </div>
            </div>
          </Card>
        </motion.div>
      )}

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h2 className="text-xl font-bold text-white mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link to="/admin/projects/new">
            <Card 
              hoverable 
              glow="purple"
              className="p-8 text-center border-2 border-dashed border-purple-500/30 hover:border-purple-500/50 group"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 mb-4 group-hover:scale-110 transition-transform">
                <Plus className="w-7 h-7 text-purple-400" />
              </div>
              <h3 className="font-semibold text-white text-lg">Add New Project</h3>
              <p className="text-gray-500 text-sm mt-1">Showcase your latest work</p>
            </Card>
          </Link>
          <Link to="/admin/skills/new">
            <Card 
              hoverable 
              glow="cyan"
              className="p-8 text-center border-2 border-dashed border-cyan-500/30 hover:border-cyan-500/50 group"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 mb-4 group-hover:scale-110 transition-transform">
                <Sparkles className="w-7 h-7 text-cyan-400" />
              </div>
              <h3 className="font-semibold text-white text-lg">Add New Skill</h3>
              <p className="text-gray-500 text-sm mt-1">Update your tech stack</p>
            </Card>
          </Link>
          <Link to="/admin/experiences/new">
            <Card 
              hoverable 
              glow="pink"
              className="p-8 text-center border-2 border-dashed border-pink-500/30 hover:border-pink-500/50 group"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-pink-500/20 to-purple-500/20 mb-4 group-hover:scale-110 transition-transform">
                <Briefcase className="w-7 h-7 text-pink-400" />
              </div>
              <h3 className="font-semibold text-white text-lg">Add Experience</h3>
              <p className="text-gray-500 text-sm mt-1">Document your journey</p>
            </Card>
          </Link>
        </div>
      </motion.div>
    </div>
  );
};
