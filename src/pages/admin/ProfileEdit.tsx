import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Phone, MapPin, Github, Linkedin, Twitter, Globe, Save } from 'lucide-react';
import { Loading } from '../../components/ui/Loading';
import { ErrorMessage } from '../../components/ui/ErrorMessage';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input, TextArea } from '../../components/ui/Input';
import { ImageUpload } from '../../components/ui/ImageUpload';
import { useErrorHandler } from '../../hooks/useErrorHandler';
import { getProfile, updateProfile } from '../../services/firebase/profile.service';

export const ProfileEdit = () => {
  const { handleError, handleSuccess } = useErrorHandler();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    title: '',
    bio: '',
    email: '',
    phone: '',
    location: '',
    avatar: '',
    socialLinks: {
      github: '',
      linkedin: '',
      twitter: '',
      website: '',
    },
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profile = await getProfile();
        if (profile) {
          setFormData({
            name: profile.name || '',
            title: profile.title || '',
            bio: profile.bio || '',
            email: profile.email || '',
            phone: profile.phone || '',
            location: profile.location || '',
            avatar: profile.avatar || '',
            socialLinks: {
              github: profile.socialLinks?.github || '',
              linkedin: profile.socialLinks?.linkedin || '',
              twitter: profile.socialLinks?.twitter || '',
              website: profile.socialLinks?.website || '',
            },
          });
        }
      } catch (err: any) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name.startsWith('social.')) {
      const socialKey = name.split('.')[1];
      setFormData((prev) => ({
        ...prev,
        socialLinks: {
          ...prev.socialLinks,
          [socialKey]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setSaving(true);
      await updateProfile(formData, avatarFile || undefined);
      handleSuccess('✅ Profile updated successfully!');
    } catch (err: any) {
      handleError(err, 'Error updating profile');
    } finally {
      setSaving(false);
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
      >
        <h1 className="text-3xl font-bold text-white">My Profile</h1>
        <p className="text-gray-400 mt-1">Manage your personal information</p>
      </motion.div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Info */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2 space-y-6"
          >
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20">
                  <User className="w-5 h-5 text-purple-400" />
                </div>
                <h2 className="text-xl font-bold text-white">Basic Information</h2>
              </div>
              <div className="space-y-5">
                <Input
                  label="Full Name *"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  icon={<User className="w-5 h-5" />}
                />

                <Input
                  label="Professional Title *"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Full Stack Developer"
                />

                <TextArea
                  label="Bio"
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  rows={4}
                  placeholder="A short description about yourself..."
                />
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20">
                  <Mail className="w-5 h-5 text-cyan-400" />
                </div>
                <h2 className="text-xl font-bold text-white">Contact Information</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <Input
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  icon={<Mail className="w-5 h-5" />}
                />

                <Input
                  label="Phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+1 234 567 890"
                  icon={<Phone className="w-5 h-5" />}
                />

                <div className="md:col-span-2">
                  <Input
                    label="Location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="New York, USA"
                    icon={<MapPin className="w-5 h-5" />}
                  />
                </div>
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
              <h2 className="text-xl font-bold text-white mb-4">Avatar</h2>
              <ImageUpload
                currentImageUrl={formData.avatar}
                onImageSelected={(file) => setAvatarFile(file)}
                onImageRemoved={() => {
                  setAvatarFile(null);
                  setFormData(prev => ({ ...prev, avatar: '' }));
                }}
                className="mb-4"
              />
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-xl bg-gradient-to-br from-pink-500/20 to-purple-500/20">
                  <Globe className="w-5 h-5 text-pink-400" />
                </div>
                <h2 className="text-xl font-bold text-white">Social Links</h2>
              </div>
              <div className="space-y-4">
                <Input
                  label="GitHub"
                  name="social.github"
                  value={formData.socialLinks.github}
                  onChange={handleChange}
                  placeholder="https://github.com/..."
                  icon={<Github className="w-5 h-5" />}
                />
                <Input
                  label="LinkedIn"
                  name="social.linkedin"
                  value={formData.socialLinks.linkedin}
                  onChange={handleChange}
                  placeholder="https://linkedin.com/in/..."
                  icon={<Linkedin className="w-5 h-5" />}
                />
                <Input
                  label="Twitter / X"
                  name="social.twitter"
                  value={formData.socialLinks.twitter}
                  onChange={handleChange}
                  placeholder="https://twitter.com/..."
                  icon={<Twitter className="w-5 h-5" />}
                />
                <Input
                  label="Website"
                  name="social.website"
                  value={formData.socialLinks.website}
                  onChange={handleChange}
                  placeholder="https://..."
                  icon={<Globe className="w-5 h-5" />}
                />
              </div>
            </Card>

            <Button
              type="submit"
              loading={saving}
              className="w-full"
              icon={<Save className="w-5 h-5" />}
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </Button>
          </motion.div>
        </div>
      </form>
    </div>
  );
};
