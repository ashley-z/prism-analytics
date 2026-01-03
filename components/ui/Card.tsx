import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
}

export const Card: React.FC<CardProps> = ({ children, className = '', title }) => {
  return (
    <div className={`bg-surface rounded-card shadow-card border border-border p-6 transition-colors duration-300 ${className}`}>
      {title && (
        <h3 className="text-lg font-semibold text-text-primary mb-4">{title}</h3>
      )}
      {children}
    </div>
  );
};