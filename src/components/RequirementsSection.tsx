
import React, { useState } from 'react';
import { Button } from './ui/button';

interface RequirementsSectionProps {
  onErrorFound: (requirementId: string) => boolean;
}

const RequirementsSection: React.FC<RequirementsSectionProps> = ({ onErrorFound }) => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [showButton, setShowButton] = useState<string | null>(null);
  const [markedRequirements, setMarkedRequirements] = useState<Set<string>>(new Set());

  const requirements = {
    business: [
      {
        id: '1.1',
        text: 'Онлайн-бронирование должно сократить среднее время записи на консультацию с 5 до 2 минут в течение первого месяца после запуска.'
      },
      {
        id: '1.2',
        text: 'В течение 3 месяцев после запуска система должна обеспечить не менее 70 % всех записей на консультации через онлайн-интерфейс.'
      },
      {
        id: '1.3',
        text: 'Пользователи должны чаще приходить на встречи после бронирования.'
      },
      {
        id: '1.4',
        text: 'Количество завершённых консультаций должно вырасти на 20 % за первые два квартала.'
      },
      {
        id: '1.5',
        text: 'Решение должно быть интуитивно понятным и приносить пользу клиентам.'
      }
    ],
    functional: [
      {
        id: '2.1',
        text: 'Календарь должен отображать ближайшие 7 дней, начиная с текущей даты.'
      },
      {
        id: '2.2',
        text: 'Пользователь может выбрать один из доступных слотов в интервале 10:00-16:00 (местное время).'
      },
      {
        id: '2.3',
        text: 'Система должна позволять бронировать любое время в течение дня.'
      },
      {
        id: '2.4',
        text: 'После бронирования слот становится недоступным для других пользователей.'
      },
      {
        id: '2.5',
        text: 'Имя, введённое пользователем, должно сохраняться.'
      },
      {
        id: '2.6',
        text: 'Пользователь не может изменить встречу после бронирования.'
      },
      {
        id: '2.7',
        text: 'При попытке второго бронирования в один день система должна показать сообщение об ошибке: «Вы уже записаны на сегодня».'
      }
    ],
    ui: [
      {
        id: '3.1',
        text: 'Календарь выводится сеткой с датами, сгруппированными по неделям.'
      },
      {
        id: '3.2',
        text: 'Временные слоты отображаются интерактивными кнопками с временем (напр. «10:00»).'
      },
      {
        id: '3.3',
        text: 'Цвет кнопки «Забронировать» должен соответствовать общепринятому стилю.'
      },
      {
        id: '3.4',
        text: 'После успешного бронирования должно появиться уведомление не менее чем на 3 секунды с текстом «Встреча успешно забронирована».'
      },
      {
        id: '3.5',
        text: 'Поле ввода имени обязательно к заполнению до отправки формы.'
      },
      {
        id: '3.6',
        text: 'После бронирования временного слота соответствующая кнопка с указанием времени должна становиться неактивной (disabled), визуально отличаться от доступных слотов и не реагировать на нажатия.'
      }
    ]
  };

  const handleNumberClick = (requirementId: string) => {
    if (markedRequirements.has(requirementId)) return;
    setShowButton(showButton === requirementId ? null : requirementId);
  };

  const handleMarkError = (requirementId: string) => {
    const success = onErrorFound(requirementId);
    setMarkedRequirements(prev => new Set([...prev, requirementId]));
    setShowButton(null);
  };

  const getNumberClassName = (requirementId: string) => {
    if (markedRequirements.has(requirementId)) {
      return "bg-green-200 text-green-800";
    }
    if (hoveredId === requirementId) {
      return "bg-yellow-200 text-yellow-800";
    }
    return "bg-blue-100 text-blue-800 hover:bg-yellow-200 hover:text-yellow-800";
  };

  const renderRequirement = (req: { id: string; text: string }) => (
    <div key={req.id} className="flex items-start gap-2 md:gap-3 relative">
      <span
        className={`inline-flex items-center justify-center min-w-[2.5rem] h-6 px-2 py-1 rounded-md text-xs font-medium cursor-pointer transition-colors ${getNumberClassName(req.id)}`}
        onMouseEnter={() => setHoveredId(req.id)}
        onMouseLeave={() => setHoveredId(null)}
        onClick={() => handleNumberClick(req.id)}
      >
        {req.id}
      </span>
      <p className="text-card-foreground leading-relaxed text-sm md:text-base flex-1">
        {req.text}
      </p>
      {showButton === req.id && (
        <div className="absolute left-0 top-8 z-10">
          <Button
            onClick={() => handleMarkError(req.id)}
            className="bg-destructive hover:bg-destructive/90 text-destructive-foreground shadow-lg text-xs"
            size="sm"
          >
            Отметить как ошибку
          </Button>
        </div>
      )}
    </div>
  );

  return (
    <div className="space-y-4 md:space-y-6">
      <h2 className="text-xl md:text-2xl font-bold text-primary">Требования</h2>
      
      {/* Business Requirements */}
      <div className="bg-card p-4 md:p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg md:text-xl font-semibold mb-3 md:mb-4 text-primary">1. Бизнес-требования</h3>
        <div className="space-y-3 md:space-y-4">
          {requirements.business.map(renderRequirement)}
        </div>
      </div>

      {/* Functional Requirements */}
      <div className="bg-card p-4 md:p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg md:text-xl font-semibold mb-3 md:mb-4 text-primary">2. Функциональные требования</h3>
        <div className="space-y-3 md:space-y-4">
          {requirements.functional.map(renderRequirement)}
        </div>
      </div>

      {/* UI Requirements */}
      <div className="bg-card p-4 md:p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg md:text-xl font-semibold mb-3 md:mb-4 text-primary">3. UI-требования</h3>
        <div className="space-y-3 md:space-y-4">
          {requirements.ui.map(renderRequirement)}
        </div>
      </div>
    </div>
  );
};

export default RequirementsSection;
