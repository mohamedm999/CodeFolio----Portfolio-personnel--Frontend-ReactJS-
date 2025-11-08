import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_PORTFOLIO } from '../graphql/portfolio';
import { Portfolio, Skill } from '../types/graphql';
import { Loading } from '../components/ui/Loading';
import { ErrorMessage } from '../components/ui/ErrorMessage';
import { Card } from '../components/ui/Card';

export const Home: React.FC = () => {
  const { data, loading, error } = useQuery<{ getPortfolio: Portfolio }>(GET_PORTFOLIO);

  if (loading) return <Loading />;
  if (error) return <ErrorMessage error={error} />;
  if (!data) return <ErrorMessage message="No data available" />;

  const { profile, projects, skills, experiences } = data.getPortfolio;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-secondary py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center text-white">
            {profile.avatar && (
              <img
                src={profile.avatar}
                alt={profile.name}
                className="w-32 h-32 rounded-full mx-auto mb-6 border-4 border-white shadow-xl"
              />
            )}
            <h1 className="text-5xl font-bold mb-4">{profile.name}</h1>
            <p className="text-2xl mb-6 opacity-90">{profile.title}</p>
            {profile.bio && (
              <p className="text-lg opacity-80 max-w-2xl mx-auto">{profile.bio}</p>
            )}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            Projects
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project: any) => (
                <Card key={project.id} hoverable>
                  {project.imageUrl && (
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                  )}
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                      {project.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.map((tech: any) => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-3">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline text-sm"
                        >
                          GitHub →
                        </a>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            Skills
          </h2>
          <div className="max-w-4xl mx-auto">
            {Object.entries(
              skills.reduce((acc, skill) => {
                if (!acc[skill.category]) acc[skill.category] = [];
                acc[skill.category].push(skill);
                return acc;
              }, {} as Record<string, Skill[]>)
            ).map(([category, categorySkills]: [string, Skill[]]) => (
              <div key={category} className="mb-8">
                <h3 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
                  {category}
                </h3>
                <div className="space-y-4">
                  {categorySkills.map((skill: any) => (
                      <div key={skill.id}>
                        <div className="flex justify-between mb-2">
                          <span className="text-gray-700 dark:text-gray-300">{skill.name}</span>
                          <span className="text-primary font-semibold">{skill.level}%</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div
                            className="bg-primary h-2 rounded-full transition-all duration-500"
                            style={{ width: `${skill.level}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            Experience
          </h2>
          <div className="max-w-3xl mx-auto space-y-8">
            {experiences.map((exp: any) => (
                <Card key={exp.id}>
                  <div className="p-6">
                    <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
                      {exp.poste}
                    </h3>
                    <p className="text-xl text-primary mb-2">{exp.entreprise}</p>
                    {exp.lieu && (
                      <p className="text-gray-600 dark:text-gray-400 mb-2">{exp.lieu}</p>
                    )}
                    <p className="text-gray-500 dark:text-gray-500 mb-4">
                      {exp.dateDebut} - {exp.actuel ? 'Present' : exp.dateFin}
                    </p>
                    {exp.description && (
                      <p className="text-gray-700 dark:text-gray-300">{exp.description}</p>
                    )}
                  </div>
                </Card>
              ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-gray-100 dark:bg-gray-800">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-8 text-gray-900 dark:text-white">
            Get In Touch
          </h2>
          <div className="max-w-2xl mx-auto">
            {profile.email && (
              <p className="text-lg mb-4 text-gray-700 dark:text-gray-300">
                Email: <a href={`mailto:${profile.email}`} className="text-primary hover:underline">{profile.email}</a>
              </p>
            )}
            {profile.phone && (
              <p className="text-lg mb-4 text-gray-700 dark:text-gray-300">
                Phone: <a href={`tel:${profile.phone}`} className="text-primary hover:underline">{profile.phone}</a>
              </p>
            )}
            {profile.location && (
              <p className="text-lg text-gray-700 dark:text-gray-300">
                Location: {profile.location}
              </p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
