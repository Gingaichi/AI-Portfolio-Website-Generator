'use client';

import { useRouter } from 'next/navigation';
import { useForm, useFieldArray } from 'react-hook-form';
import { useState } from 'react';

type FormValues = {
  name: string;
  bio: string;
  skills: { value: string }[];
  projects: { title: string; description: string }[];
  contact: string;
};

export default function PortfolioForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, control } = useForm<FormValues>({
    defaultValues: {
      name: '',
      bio: '',
      contact: '',
      skills: [{ value: '' }],
      projects: [{ title: '', description: '' }],
    },
  });

  const { fields: skillFields, append: addSkill } = useFieldArray({
    control,
    name: 'skills',
  });

  const { fields: projectFields, append: addProject } = useFieldArray({
    control,
    name: 'projects',
  });

  const onSubmit = (data: FormValues) => {
    setIsLoading(true);
    localStorage.setItem('portfolioData', JSON.stringify(data));
    setTimeout(() => {
      router.push('/preview');
    }, 500);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4 text-white">Create Your Portfolio</h2>

      <div>
        <label className="block font-semibold text-white">Name</label>
        <input
          {...register('name')}
          className="w-full border p-2 rounded"
          placeholder="Your full name"
          disabled={isLoading}
        />
      </div>

      <div>
        <label className="block font-semibold text-white">Bio</label>
        <textarea
          {...register('bio')}
          className="w-full border p-2 rounded"
          placeholder="A short personal bio"
          disabled={isLoading}
        />
      </div>

      <div>
        <label className="block font-semibold text-white">Skills</label>
        {skillFields.map((field, index) => (
          <input
            key={field.id}
            {...register(`skills.${index}.value`)}
            className="w-full border p-2 rounded mb-2"
            placeholder={`Skill #${index + 1}`}
            disabled={isLoading}
          />
        ))}
        <button
          type="button"
          onClick={() => addSkill({ value: '' })}
          className="text-blue-600 text-sm mt-2"
          disabled={isLoading}
        >
          + Add Skill
        </button>
      </div>

      <div>
        <label className="block font-semibold text-white">Projects</label>
        {projectFields.map((field, index) => (
          <div key={field.id} className="mb-4 space-y-2">
            <input
              {...register(`projects.${index}.title`)}
              className="w-full border p-2 rounded"
              placeholder="Project Title"
              disabled={isLoading}
            />
            <textarea
              {...register(`projects.${index}.description`)}
              className="w-full border p-2 rounded"
              placeholder="Project Description"
              disabled={isLoading}
            />
          </div>
        ))}
        <button
          type="button"
          onClick={() => addProject({ title: '', description: '' })}
          className="text-blue-600 text-sm"
          disabled={isLoading}
        >
          + Add Project
        </button>
      </div>

      <div>
        <label className="block font-semibold text-white">Contact Info</label>
        <input
          {...register('contact')}
          className="w-full border p-2 rounded"
          placeholder="Email, phone, or link"
          disabled={isLoading}
        />
      </div>

      <button
        type="submit"
        className={`px-6 py-2 rounded text-white ${isLoading ? 'bg-gray-600 cursor-not-allowed' : 'bg-black hover:bg-gray-800'}`}
        disabled={isLoading}
      >
        {isLoading ? 'Generating...' : 'Generate Portfolio'}
      </button>
    </form>
  );
}
