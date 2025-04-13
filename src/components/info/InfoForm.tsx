'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'react-toastify';
import * as Icon from "@phosphor-icons/react";

const infoSchema = z.object({
  phone: z.string().min(1, 'Phone number is required'),
  email: z.string().email('Invalid email address'),
  address: z.string().min(1, 'Address is required'),
  mapUrl: z.string().url('Invalid map URL'),
  socialMedia: z.object({
    facebook: z.string().url('Invalid Facebook URL'),
    twitter: z.string().url('Invalid Twitter URL'),
    instagram: z.string().url('Invalid Instagram URL'),
    linkedin: z.string().url('Invalid LinkedIn URL'),
    youtube: z.string().url('Invalid Youtube URL')
  })
});

type InfoFormData = z.infer<typeof infoSchema>;

const defaultValues: InfoFormData = {
  phone: "+1 234 567 890",
  email: "contact@example.com",
  address: "123 Business Street, New York, NY 10001",
  mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d...",
  socialMedia: {
    facebook: "https://facebook.com/example",
    twitter: "https://twitter.com/example",
    instagram: "https://instagram.com/example",
    linkedin: "https://linkedin.com/company/example",
    youtube: "https://youtube.com/company/example"

  }
};

export default function InfoForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty }
  } = useForm<InfoFormData>({
    resolver: zodResolver(infoSchema),
    defaultValues
  });

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const response = await fetch('/api/admin/info');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        if (data.error) {
          throw new Error(data.error);
        }
        reset(data);
      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error('Failed to load information. Using default values.');
      } finally {
        setIsInitializing(false);
      }
    };

    fetchInfo();
  }, [reset]);

  const onSubmit = async (data: InfoFormData) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/admin/info', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update');
      }

      toast.success('Information updated successfully');
    } catch (error) {
      console.error('Error updating data:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to update information');
    } finally {
      setIsLoading(false);
    }
  };

  if (isInitializing) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="flex items-center gap-2">
          <Icon.CircleNotch className="w-6 h-6 animate-spin text-blue" />
          <span>Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-2xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
          <Icon.Buildings className="w-6 h-6" />
          General Information
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <input
              {...register('phone')}
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue focus:border-blue"
              placeholder="+1 234 567 890"
            />
            {errors.phone && (
              <p className="mt-1 text-sm text-critical">{errors.phone.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              {...register('email')}
              type="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue focus:border-blue"
              placeholder="contact@example.com"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-critical">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Address
            </label>
            <textarea
              {...register('address')}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue focus:border-blue"
              placeholder="Enter your business address"
            />
            {errors.address && (
              <p className="mt-1 text-sm text-critical">{errors.address.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Google Maps Embed URL
            </label>
            <input
              {...register('mapUrl')}
              type="url"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue focus:border-blue"
              placeholder="https://www.google.com/maps/embed?pb=..."
            />
            {errors.mapUrl && (
              <p className="mt-1 text-sm text-critical">{errors.mapUrl.message}</p>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
          <Icon.ShareNetwork className="w-6 h-6" />
          Social Media Links
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Facebook
            </label>
            <input
              {...register('socialMedia.facebook')}
              type="url"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue focus:border-blue"
              placeholder="https://facebook.com/example"
            />
            {errors.socialMedia?.facebook && (
              <p className="mt-1 text-sm text-critical">{errors.socialMedia.facebook.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Twitter
            </label>
            <input
              {...register('socialMedia.twitter')}
              type="url"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue focus:border-blue"
              placeholder="https://twitter.com/example"
            />
            {errors.socialMedia?.twitter && (
              <p className="mt-1 text-sm text-critical">{errors.socialMedia.twitter.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Instagram
            </label>
            <input
              {...register('socialMedia.instagram')}
              type="url"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue focus:border-blue"
              placeholder="https://instagram.com/example"
            />
            {errors.socialMedia?.instagram && (
              <p className="mt-1 text-sm text-critical">{errors.socialMedia.instagram.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              LinkedIn
            </label>
            <input
              {...register('socialMedia.linkedin')}
              type="url"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue focus:border-blue"
              placeholder="https://linkedin.com/company/example"
            />
            {errors.socialMedia?.linkedin && (
              <p className="mt-1 text-sm text-critical">{errors.socialMedia.linkedin.message}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Youtube
            </label>
            <input
              {...register('socialMedia.youtube')}
              type="url"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue focus:border-blue"
              placeholder="https://youtube.com/company/example"
            />
            {errors.socialMedia?.youtube && (
              <p className="mt-1 text-sm text-critical">{errors.socialMedia.youtube.message}</p>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <button
          type="button"
          onClick={() => reset(defaultValues)}
          className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Reset
        </button>
        <button
          type="submit"
          disabled={isLoading || !isDirty}
          className="px-6 py-2 bg-blue text-white rounded-lg hover:bg-blue/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {isLoading ? (
            <>
              <Icon.CircleNotch className="w-5 h-5 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Icon.FloppyDisk className="w-5 h-5" />
              Save Changes
            </>
          )}
        </button>
      </div>
    </form>
  );
}