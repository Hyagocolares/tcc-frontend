// src/components/calendar/Calendar.tsx
// import React, { useEffect, useState } from 'react';
// import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
// import moment from 'moment';
// import 'react-big-calendar/lib/css/react-big-calendar.css';
// import './Calendar.css'; // Estilos customizados
// import CustomToolbar from './CustomToolbar'; // Importa a custom toolbar
// import api from '../../utils/API';

// // Define o locale para pt-BR
// moment.locale('pt-br', {
//     months: 'janeiro_fevereiro_março_abril_maio_junho_julho_agosto_setembro_outubro_novembro_dezembro'.split('_'),
//     monthsShort: 'jan_fev_mar_abr_mai_jun_jul_ago_set_out_nov_dez'.split('_'),
//     weekdays: 'domingo_segunda-feira_terça-feira_quarta-feira_quinta-feira_sexta-feira_sábado'.split('_'),
//     weekdaysShort: 'dom_seg_ter_qua_qui_sex_sáb'.split('_'),
//     weekdaysMin: 'D_S_T_Q_Q_S_S'.split('_'),
//     longDateFormat: {
//         LT: 'HH:mm',
//         LTS: 'HH:mm:ss',
//         L: 'DD/MM/YYYY',
//         LL: 'D [de] MMMM [de] YYYY',
//         LLL: 'D [de] MMMM [de] YYYY [às] HH:mm',
//         LLLL: 'dddd, D [de] MMMM [de] YYYY [às] HH:mm'
//     }
// });

// // Configure o localizador com moment
// const localizer = momentLocalizer(moment);

// export interface MyEvent {
//     id: number;
//     nameUser: string;
//     status: 'Rascunho' | 'Em andamento' | 'Pendente' | 'Aprovado' | 'Rejeitado';
//     start: Date;
//     end: Date;
//     color?: string;
// }

// const Calendar: React.FC = () => {
//     const [events, setEvents] = useState<MyEvent[]>([]);
//     const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
//     const [selectedEvents, setSelectedEvents] = useState<MyEvent[]>([]);

//     const formatData = (data: any[]): MyEvent[] => {
//         return data.map((request) => {
//             const firstLocation = request.locations[0];
//             return {
//                 id: request.id,
//                 nameUser: request.user.name,
//                 status: request.status,
//                 start: new Date(firstLocation.start),
//                 end: new Date(firstLocation.end),
//                 color: request.status === 'Aprovado' ? 'green' :
//                     request.status === 'Rascunho' ? '#065f46' :
//                         request.status === 'Em andamento' ? '#84cc16' :
//                             request.status === 'Pendente' ? '#dc2626' :
//                                 request.status === 'Rejeitado' ? 'red' : undefined
//             }
//         })
//     };

//     useEffect(() => {
//         const fetchRequests = async () => {
//             try {
//                 const response = await api.get('/v1/requests/paginated');
//                 if (response.data?.formattedRequests) {
//                     const formattedData = formatData(response.data.formattedRequests);
//                     setEvents(formattedData);
//                 } else {
//                     console.error('Resposta da API não contém "formattedRequests".', response);
//                 }
//             } catch (error: any) {
//                 console.error('Erro ao buscar requerimentos:', error);
//             }
//         };

//         fetchRequests();
//     }, []);


//     const handleSelectSlot = (slotInfo: { start: Date }) => {
//         setSelectedDate(slotInfo.start);
//         const filtered = events.filter(event =>
//             moment(event.start).isSame(slotInfo.start, 'day')
//         );
//         setSelectedEvents(filtered);
//     };

//     const handleSelectEvent = (event: MyEvent) => {
//         setSelectedDate(event.start);
//         setSelectedEvents([event]);
//     };

//     return (
//         <div className="calendar-container">
//             <div className="calendar-left">
//                 <BigCalendar
//                     localizer={localizer}
//                     events={events}
//                     startAccessor="start"
//                     endAccessor="end"
//                     selectable
//                     onSelectSlot={handleSelectSlot}
//                     onSelectEvent={handleSelectEvent}
//                     components={{ toolbar: CustomToolbar }}
//                     formats={{
//                         weekdayFormat: (date) => {
//                             const day = moment(date).format('dddd').replace('-feira', '');
//                             return day.charAt(0).toUpperCase() + day.slice(1);
//                         }
//                     }}
//                     style={{ height: 600, width: '100%' }}
//                 />
//             </div>
//             <div className="calendar-right">
//                 {selectedDate ? (
//                     <div>
//                         <h2>{moment(selectedDate).format('LL')}</h2>
//                         {selectedEvents.length > 0 ? (
//                             selectedEvents.map((event, index) => (
//                                 <a
//                                     key={index}
//                                     href={`/request/${event.id}`}
//                                     //className="event-details"
//                                 // style={{ textDecoration: 'none', color: 'inherit' }}
//                                 >
//                                     <div key={index} className="event-details">

//                                         <p>Status: {event.status}</p>
//                                         <p>
//                                             {moment(event.start).format('LT')} - {moment(event.end).format('LT')}
//                                         </p>
//                                     </div>
//                                 </a>
//                             ))
//                         ) : (
//                             <p>Nenhum evento para essa data.</p>
//                         )}
//                     </div>
//                 ) : (
//                     <p>Selecione uma data no calendário para visualizar os eventos.</p>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default Calendar;

// src/components/calendar/Calendar.tsx
import React, { useEffect, useState } from 'react';
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './Calendar.css';
import CustomToolbar from './CustomToolbar';
import api from '../../utils/API';

moment.locale('pt-br', {
    months: 'janeiro_fevereiro_março_abril_maio_junho_julho_agosto_setembro_outubro_novembro_dezembro'.split('_'),
    monthsShort: 'jan_fev_mar_abr_mai_jun_jul_ago_set_out_nov_dez'.split('_'),
    weekdays: 'domingo_segunda-feira_terça-feira_quarta-feira_quinta-feira_sexta-feira_sábado'.split('_'),
    weekdaysShort: 'dom_seg_ter_qua_qui_sex_sáb'.split('_'),
    weekdaysMin: 'D_S_T_Q_Q_S_S'.split('_'),
    longDateFormat: {
        LT: 'HH:mm',
        LTS: 'HH:mm:ss',
        L: 'DD/MM/YYYY',
        LL: 'D [de] MMMM [de] YYYY',
        LLL: 'D [de] MMMM [de] YYYY [às] HH:mm',
        LLLL: 'dddd, D [de] MMMM [de] YYYY [às] HH:mm'
    }
});

const localizer = momentLocalizer(moment);

export interface MyEvent {
    id: number;
    nameUser: string;
    status: string
    start: Date;
    end: Date;
}

const Calendar: React.FC = () => {
    const [events, setEvents] = useState<MyEvent[]>([]);
    const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
    const [selectedEvents, setSelectedEvents] = useState<MyEvent[]>([]);

    useEffect(() => {
        const today = new Date();
        setSelectedDate(today);
        const filtered = events.filter(event =>
            moment(event.start).isSame(today, 'day')
        );
        setSelectedEvents(filtered);
    }, [events]);

    const formatData = (data: any[]): MyEvent[] => {
        return data.map((item) => {
            const firstLocation = item.locations[0];
            return {
                id: item.id,
                nameUser: item.user.name || 'Sem usuário',
                status: item.status,
                title: item.user.name || 'Título não informado',
                start: new Date(firstLocation.start),
                end: new Date(firstLocation.end)
            };
        });
    };

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const response = await api.get('/v1/requests/paginated');
                if (response.data && response.data.formattedRequests) {
                    const formattedData = formatData(response.data.formattedRequests);
                    setEvents(formattedData);
                    console.log(formattedData);
                } else {
                    console.error('Resposta da API não contém "formattedRequests".', response);
                }
            } catch (error: any) {
                console.error('Erro ao buscar requerimentos:', error);
            }
        };

        fetchRequests();
    }, []);

    const handleSelectSlot = (slotInfo: { start: Date }) => {
        setSelectedDate(slotInfo.start);
        const filtered = events.filter(event =>
            moment(event.start).isSame(slotInfo.start, 'day')
        );
        setSelectedEvents(filtered);
    };

    const handleSelectEvent = (event: MyEvent) => {
        setSelectedDate(event.start);
        setSelectedEvents([event]);
    };

    return (
        <div className="calendar-container">
            <div className="calendar-left">
                <BigCalendar
                    localizer={localizer}
                    events={events}
                    startAccessor="start"
                    endAccessor="end"
                    selectable
                    onSelectSlot={handleSelectSlot}
                    onSelectEvent={handleSelectEvent}
                    components={{ toolbar: CustomToolbar }}
                    dayPropGetter={(date) => {
                        if (selectedDate && moment(date).isSame(selectedDate, 'day')) {
                            return {
                                style: {
                                    backgroundColor: '#d1fae5',
                                }
                            };
                        }
                        return {};
                    }}
                    formats={{
                        weekdayFormat: (date) => {
                            const day = moment(date).format('dddd').replace('-feira', '');
                            return day.charAt(0).toUpperCase() + day.slice(1);
                        }
                    }}
                    style={{ height: 600, width: '100%' }}
                />
            </div>
            <div className="calendar-right">
                {selectedDate ? (
                    <div>
                        <h2>{moment(selectedDate).format('LL')}</h2>
                        {selectedEvents.length > 0 ? (
                            selectedEvents.map((event, index) => (
                                <a key={index} href={`/request/${event.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                    <div className="event-details">
                                        <h3>{event.nameUser}</h3>
                                        <p>Status: {event.status}</p>
                                        <p>
                                            {moment(event.start).format('LT')} - {moment(event.end).format('LT')}
                                        </p>
                                    </div>
                                </a>
                            ))
                        ) : (
                            <p>Nenhum evento para essa data.</p>
                        )}
                    </div>
                ) : (
                    <p>Selecione uma data no calendário para visualizar os eventos.</p>
                )}
            </div>
        </div>
    );
};

export default Calendar;
