
import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';

interface RequirementsSectionProps {
  onErrorFound: (requirementId: string) => boolean;
  resetKey: number;
}

const RequirementsSection: React.FC<RequirementsSectionProps> = ({ onErrorFound, resetKey }) => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [showButton, setShowButton] = useState<string | null>(null);
  const [markedRequirements, setMarkedRequirements] = useState<Set<string>>(new Set());

  // Reset state when resetKey changes
  useEffect(() => {
    setMarkedRequirements(new Set());
    setShowButton(null);
    setHoveredId(null);
  }, [resetKey]);

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
        text: 'Календарь должен отображать ближайшие 5 дней, начиная с текущей даты.'
      },
      {
        id: '2.2',
        text: 'Пользователь может выбрать один из доступных временных слотов в интервале 10:00–16:00 по местному времени.'
      },
      {
        id: '2.3',
        text: 'Система должна позволять бронировать любое время в течение дня.'
      },
      {
        id: '2.4',
        text: 'Поле ввода имени должно быть обязательным для заполнения.'
      },
      {
        id: '2.5',
        text: 'Поле email должно быть обязательным для заполнения и проходить проверку на соответствие формату name@domain.tld.'
      },
      {
        id: '2.6',
        text: 'После бронирования слот становится недоступным для других пользователей.'
      },
      {
        id: '2.7',
        text: 'Имя, введённое пользователем, должно сохраняться.'
      },
      {
        id: '2.8',
        text: 'Пользователь не может изменить встречу после бронирования.'
      },
      {
        id: '2.9',
        text: 'Повторное бронирование в один и тот же день должно блокироваться по email.'
      },
      {
        id: '2.10',
        text: 'При попытке второго бронирования в течение одного дня на ранее использованный email система должна отображать сообщение об ошибке: «Вы уже записаны на сегодня».'
      }
    ],
    ui: [
      {
        id: '3.1',
        text: 'Календарь должен быть представлен в виде сетки с датами, разделёнными по дням.'
      },
      {
        id: '3.2',
        text: 'Временные слоты отображаются в виде интерактивных кнопок с указанием времени (например, «10:00»).'
      },
      {
        id: '3.3',
        text: 'Нажатие на активную кнопку временного слота должно вызывать окно бронирования, содержащее поля: Ваше имя, email, кнопку «Забронировать», кнопку «Отмена».'
      },
      {
        id: '3.4',
        text: 'Цвет кнопки «Забронировать» должен соответствовать общепринятому стилю.'
      },
      {
        id: '3.5',
        text: 'Кнопка «Забронировать» в окне бронирования становится доступной после заполнения полей «Ваше имя» и «email».'
      },
      {
        id: '3.6',
        text: 'При ошибке в поле email должно отображаться сообщение «Введите корректный email» под полем, красным текстом.'
      },
      {
        id: '3.7',
        text: 'При попытке второго бронирования в течение одного дня на ранее использованный email поверх формы должно выводиться окно с сообщением об ошибке: «Вы уже записаны на сегодня».'
      },
      {
        id: '3.8',
        text: 'После бронирования слота его кнопка должна становиться неактивной (disabled), визуально отличаться от доступных слотов и не реагировать на нажатие.'
      },
      {
        id: '3.9',
        text: 'После успешного бронирования должно появиться уведомление, отображающееся не менее 3 секунд с текстом «Встреча успешно забронирована».'
      }
    ]
  };

  const handleNumberClick = (requirementId: string) => {
    setShowButton(showButton === requirementId ? null : requirementId);
  };

  const handleMarkError = (requirementId: string) => {
    const success = onErrorFound(requirementId);
    if (success) {
      setMarkedRequirements(prev => new Set([...prev, requirementId]));
    }
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
        <h3 className="text-lg md:text-xl font-semibold mb-3 md:mb-4 text-primary">📘 Бизнес-требования</h3>
        <div className="space-y-3 md:space-y-4">
          {requirements.business.map(renderRequirement)}
        </div>
      </div>

      {/* Functional Requirements */}
      <div className="bg-card p-4 md:p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg md:text-xl font-semibold mb-3 md:mb-4 text-primary">⚙️ Функциональные требования</h3>
        <div className="space-y-3 md:space-y-4">
          {requirements.functional.map(renderRequirement)}
        </div>
      </div>

      {/* UI Requirements */}
      <div className="bg-card p-4 md:p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg md:text-xl font-semibold mb-3 md:mb-4 text-primary">🎨 UI-требования</h3>
        <div className="space-y-3 md:space-y-4">
          {requirements.ui.map(renderRequirement)}
        </div>
      </div>
    </div>
  );
};

export default RequirementsSection;
