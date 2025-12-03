import React from 'react';

/**
 * Example: Responsive Card Grid Component
 * 
 * This demonstrates:
 * - Auto-responsive grid using Tailwind
 * - Responsive typography
 * - Responsive images
 * - Hover effects
 * 
 * Breakpoints:
 * - Mobile: 1 column
 * - Tablet (md): 2 columns
 * - Desktop (lg): 3 columns
 * - Large (xl): 4 columns
 */

interface CardItem {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
}

interface ResponsiveCardGridProps {
  items: CardItem[];
}

export const ResponsiveCardGrid: React.FC<ResponsiveCardGridProps> = ({ items }) => {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
      {/* Grid Container */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {items.map((item) => (
          <div
            key={item.id}
            className="rounded-xl backdrop-blur-xl transition-all duration-300 hover:scale-105 overflow-hidden"
            style={{
              background: 'rgba(10, 9, 26, 0.6)',
              border: '1px solid rgba(90, 107, 140, 0.3)',
            }}
          >
            {/* Responsive Image */}
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-48 sm:h-56 object-cover"
            />

            {/* Card Content */}
            <div className="p-4 sm:p-6">
              {/* Responsive Title */}
              <h3
                className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3"
                style={{ color: '#F0F0F0' }}
              >
                {item.title}
              </h3>

              {/* Responsive Description */}
              <p
                className="text-sm sm:text-base mb-4 line-clamp-3"
                style={{ color: '#5A6B8C' }}
              >
                {item.description}
              </p>

              {/* Responsive Tags */}
              <div className="flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 sm:px-3 sm:py-1 text-xs sm:text-sm rounded-full"
                    style={{
                      background: 'rgba(58, 127, 255, 0.2)',
                      color: '#3A7FFF',
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

/**
 * Usage Example:
 * 
 * const projects = [
 *   {
 *     id: '1',
 *     title: 'Project Name',
 *     description: 'Project description here...',
 *     image: '/project-image.jpg',
 *     tags: ['React', 'TypeScript', 'GraphQL']
 *   },
 *   // ... more projects
 * ];
 * 
 * <ResponsiveCardGrid items={projects} />
 */
