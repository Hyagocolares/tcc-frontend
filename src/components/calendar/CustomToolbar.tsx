// src/components/calendar/CustomToolbar.tsx
import React from 'react';
import { ToolbarProps, NavigateAction } from 'react-big-calendar';
import { MyEvent } from './Calendar'
import moment from 'moment';
import './CustomToolbar.css';

const CustomToolbar: React.FC<ToolbarProps<MyEvent, object>> = (toolbar) => {
  const goToBack = () => {
    toolbar.onNavigate('PREV' as NavigateAction);
  };

  const goToNext = () => {
    toolbar.onNavigate('NEXT' as NavigateAction);
  };

  const goToToday = () => {
    toolbar.onNavigate('TODAY' as NavigateAction);
  };

  const goToMonth = () => {
    toolbar.onView('month');
  };
  

  return (
    <div className="rbc-toolbar custom-toolbar">
      <span className="rbc-btn-group">
        <button type="button" className="btn-calendar" onClick={goToToday}>Hoje</button>
        <button type="button" className="btn-calendar" onClick={goToBack}>Anterior</button>
        <button type="button" className="btn-calendar" onClick={goToNext}>Próximo</button>
      </span>
      <span className="rbc-toolbar-label">
      {moment(toolbar.date).format('MMMM YYYY').replace(/^\w/, c => c.toUpperCase())}
      </span>
      <span className="rbc-btn-group">
        <button type="button" className="btn-calendar" onClick={goToMonth}>Mês</button>
      </span>
    </div>
  );
};

export default CustomToolbar;
