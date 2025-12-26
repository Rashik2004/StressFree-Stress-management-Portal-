import React from 'react';
import MeditationHero from '../components/Meditation/MeditationHero';
import BeginnersGuide from '../components/Meditation/BeginnersGuide';
import MeditationTypes from '../components/Meditation/MeditationTypes';
import MeditationBySituation from '../components/Meditation/MeditationBySituation';
import GuidedSessions from '../components/Meditation/GuidedSessions';
import { useSearchParams } from 'react-router-dom';
import SearchResults from '../components/Meditation/SearchResults';

const Meditations = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("search");

  if (query) {
    return (
      <div className="min-h-screen bg-background font-sans selection:bg-accent selection:text-primary transition-colors duration-500 pt-20">
        <SearchResults />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background font-sans selection:bg-accent selection:text-primary transition-colors duration-500">
      <MeditationHero />
      <BeginnersGuide />
      <MeditationTypes />
      <MeditationBySituation />
      <GuidedSessions />
    </div>
  );
};

export default Meditations;
