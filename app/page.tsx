import React from 'react';
import Hero from '@/components/home/Hero';
import SignatureDishes from '@/components/home/SignatureDishes';
import PerfectPlateBuilder from '@/components/home/PerfectPlateBuilder';
import SmartRecommender from '@/components/home/SmartRecommender';
import ExperienceSection from '@/components/home/ExperienceSection';
import Testimonials from '@/components/home/Testimonials';

export default function HomePage() {
  return (
    <>
      <Hero />
      <SignatureDishes />
      <PerfectPlateBuilder />
      <SmartRecommender />
      <ExperienceSection />
      <Testimonials />
    </>
  );
}
