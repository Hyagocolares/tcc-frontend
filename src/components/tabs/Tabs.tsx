// src/components/tabs/Tabs.tsx
import React from 'react';
import './Tabs.css';
import { getUserRole } from '../../utils/accessControl';

interface TabsProps {
  selectedTab: string;
  onSelect: (tab: string) => void;
}

const Tabs: React.FC<TabsProps> = ({ selectedTab, onSelect }) => {

  const userRole = getUserRole();

  return (
    <div className="tabs-container">
      {userRole === 'Teacher' && (
        <button
          className={selectedTab === 'Teacher' ? 'active' : ''}
          onClick={() => {
            console.log('Selecionando Teacher');
            onSelect('Teacher');
          }}
        >
          Professor
        </button>
      )}
      {userRole === 'Coordinator' && (
        <button
          className={selectedTab === 'Coordinator' ? 'active' : ''}
          onClick={() => {
            console.log('Selecionando Coordinator');
            onSelect('Coordinator');
          }}
        >
          Coordenador
        </button>
      )}
      {userRole === 'Director' && (
        <button
          className={selectedTab === 'Director' ? 'active' : ''}
          onClick={() => {
            console.log('Selecionando Director');
            onSelect('Director');
          }}
        >
          Diretor
        </button>
      )}
    </div>
  );
};

export default Tabs;
