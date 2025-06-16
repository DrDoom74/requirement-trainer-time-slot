
import React, { useState } from 'react';
import { Button } from './ui/button';

interface RequirementsSectionProps {
  onErrorFound: (requirementId: string) => boolean;
}

const RequirementsSection: React.FC<RequirementsSectionProps> = ({ onErrorFound }) => {
  const [hoveredNumber, setHoveredNumber] = useState<string | null>(null);
  const [clickedNumber, setClickedNumber] = useState<string | null>(null);
  const [showButton, setShowButton] = useState(false);
  const [buttonPosition, setButtonPosition] = useState({ x: 0, y: 0 });
  const [processedNumbers, setProcessedNumbers] = useState<Set<string>>(new Set());

  const requirements = {
    business: [
      "1.1. Онлайн-бронирование должно сократить среднее время записи на консультацию с 5 до 2 минут в течение первого месяца после запуска.",
      "1.2. В течение 3 месяцев после запуска система должна обеспечить не менее 70 % всех записей на консультации через онлайн-интерфейс.",
      "1.3. Пользователи должны чаще приходить на встречи после бронирования.",
      "1.4. Количество завершённых консультаций должно вырасти на 20 % за первые два квартала.",
      "1.5. Решение должно быть интуитивно понятным и приносить пользу клиентам."
    ],
    functional: [
      "2.1. Календарь должен отображать ближайшие 7 дней, начиная с текущей даты.",
      "2.2. Пользователь может выбрать один из доступных слотов в интервале 10:00-16:00 (местное время).",
      "2.3. Система должна позволять бронировать любое время в течение дня.",
      "2.4. После бронирования слот становится недоступным для других пользователей.",
      "2.5. Имя, введённое пользователем, должно сохраняться.",
      "2.6. Пользователь не может изменить встречу после бронирования.",
      "2.7. При попытке второго бронирования в один день система должна показать сообщение об ошибке: «Вы уже записаны на сегодня»."
    ],
    ui: [
      "3.1. Календарь выводится сеткой с датами, сгруппированными по неделям.",
      "3.2. Временные слоты отображаются интерактивными кнопками с временем (напр. «10:00»).",
      "3.3. Цвет кнопки «Забронировать» должен соответствовать общепринятому стилю.",
      "3.4. После успешного бронирования должно появиться уведомление не менее чем на 3 секунды с текстом «Встреча успешно забронирована».",
      "3.5. Поле ввода имени обязательно к заполнению до отправки формы.",
      "3.6. После бронирования временного слота соответствующая кнопка с указанием времени должна становиться неактивной (disabled), визуально отличаться от доступных слотов и не реагировать на нажатия."
    ]
  };

  const extractRequirementNumber = (req: string) => {
    const match = req.match(/^(\d\.\d)/);
    return match ? match[1] : '';
  };

  const getNumberBackgroundColor = (number: string) => {
    if (processedNumbers.has(number)) {
      const isError = onErrorFound(number);
      return isError ? 'bg-green-200' : 'bg-gray-300';
    }
    if (hoveredNumber === number) {
      return 'bg-red-100';
    }
    return '';
  };

  const handleNumberClick = (event: React.MouseEvent, requirement: string) => {
    const number = extractRequirementNumber(requirement);
    
    if (processedNumbers.has(number)) {
      return; // Уже обработан
    }

    setClickedNumber(number);
    
    const rect = (event.target as HTMLElement).getBoundingClientRect();
    setButtonPosition({
      x: rect.left + rect.width / 2,
      y: rect.bottom + 10
    });
    setShowButton(true);
  };

  const handleMarkAsError = () => {
    if (!clickedNumber) return;
    
    const success = onErrorFound(clickedNumber);
    setProcessedNumbers(prev => new Set(prev).add(clickedNumber));
    
    setShowButton(false);
    setClickedNumber(null);
  };

  const renderRequirement = (req: string, index: number) => {
    const number = extractRequirementNumber(req);
    const text = req.substring(number.length + 1); // Убираем номер и точку
    const isProcessed = processedNumbers.has(number);

    return (
      <p key={index} className="text-card-foreground leading-relaxed text-sm md:text-base">
        <span
          className={`inline-block cursor-pointer px-1 py-0.5 rounded transition-colors ${
            isProcessed ? 'cursor-default' : 'hover:bg-red-100'
          } ${getNumberBackgroundColor(number)}`}
          onMouseEnter={() => !isProcessed && setHoveredNumber(number)}
          onMouseLeave={() => setHoveredNumber(null)}
          onClick={(e) => handleNumberClick(e, req)}
        >
          {number}.
        </span>
        {text}
      </p>
    );
  };

  return (
    <div className="space-y-4 md:space-y-6 relative">
      <h2 className="text-xl md:text-2xl font-bold text-primary">Требования</h2>
      
      {/* Business Requirements */}
      <div className="bg-card p-4 md:p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg md:text-xl font-semibold mb-3 md:mb-4 text-primary">1. Бизнес-требования</h3>
        <div className="space-y-2 md:space-y-3">
          {requirements.business.map((req, index) => renderRequirement(req, index))}
        </div>
      </div>

      {/* Functional Requirements */}
      <div className="bg-card p-4 md:p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg md:text-xl font-semibold mb-3 md:mb-4 text-primary">2. Функциональные требования</h3>
        <div className="space-y-2 md:space-y-3">
          {requirements.functional.map((req, index) => renderRequirement(req, index))}
        </div>
      </div>

      {/* UI Requirements */}
      <div className="bg-card p-4 md:p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg md:text-xl font-semibold mb-3 md:mb-4 text-primary">3. UI-требования</h3>
        <div className="space-y-2 md:space-y-3">
          {requirements.ui.map((req, index) => renderRequirement(req, index))}
        </div>
      </div>

      {/* Floating Button */}
      {showButton && (
        <div
          className="fixed z-50 pointer-events-none"
          style={{
            left: Math.max(10, buttonPosition.x - 100),
            top: buttonPosition.y
          }}
        >
          <Button
            onClick={handleMarkAsError}
            className="pointer-events-auto bg-destructive hover:bg-destructive/90 text-destructive-foreground shadow-lg text-xs md:text-sm"
            size="sm"
          >
            Отметить как ошибку
          </Button>
        </div>
      )}
    </div>
  );
};

export default RequirementsSection;
