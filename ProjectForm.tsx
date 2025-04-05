// src/components/ProjectForm.tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const schema = z.object({
  title: z.string().min(1, 'Title is required').max(255),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  category: z.string().min(1, 'Category is required'),
  author: z.string().min(1, 'Author is required'),
  image_url: z.string().url('Invalid URL format'),
});

type FormData = z.infer<typeof schema>;

export default function ProjectForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
    // Submit to API
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          {...register('title')}
          className="w-full p-2 border rounded"
        />
        {errors.title && <p className="text-red-500">{errors.title.message}</p>}
      </div>
      
      {/* Other form fields similarly */}
      
      <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
        Submit
      </button>
    </form>
  );
}
