// src/pages/Projects.tsx
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import ProjectCard from '../components/ProjectCard';
import SearchBar from '../components/SearchBar';

const fetchProjects = async (searchTerm = '') => {
  const response = await fetch(`/api/projects?search=${searchTerm}`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

export default function Projects() {
  const [searchTerm, setSearchTerm] = useState('');
  const { data, isLoading, error } = useQuery({
    queryKey: ['projects', searchTerm],
    queryFn: () => fetchProjects(searchTerm),
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="space-y-4">
      <SearchBar onSearch={setSearchTerm} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data?.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}
