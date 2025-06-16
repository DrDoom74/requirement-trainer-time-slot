
import React, { useState, useRef } from 'react';
import { Button } from './ui/button';

interface RequirementsSectionProps {
  onErrorFound: (selectedText: string) => boolean;
}

const RequirementsSection: React.FC<RequirementsSectionProps> = ({ onErrorFound }) => {
  const [selectedText, setSelectedText] = useState('');
  const [showButton, setShowButton] = useState(false);
  const [buttonPosition, setButtonPosition] = useState({ x: 0, y: 0 });
  const sectionRef = useRef<HTMLDivElement>(null);

  const handleTextSelection = () => {
    const selection = window.getSelection();
    if (selection && selection.toString().trim()) {
      const selectedStr = selection.toString().trim();
      setSelectedText(selectedStr);
      
      // Получаем позицию для кнопки
      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      const sectionRect = sectionRef.current?.getBoundingClientRect();
      
      if (sectionRect) {
        setButtonPosition({
          x: rect.left + rect.width / 2 - sectionRect.left,
          y: rect.top - sectionRect.top - 50
        });
      }
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  };

  const handleMarkError = () => {
    const success = onErrorFound(selectedText);
    if (success) {
      // Очищаем выделение при успехе
      window.getSelection()?.removeAllRanges();
    }
    setShowButton(false);
    setSelectedText('');
  };

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
      "2.2. Пользователь может выбрать один из доступных слотов в интервале 09:00-18:00 (местное время).",
      "2.3. Система должна позволять бронировать любое время в течение дня.",
      "2.4. После бронирования слот становится недоступным для других пользователей.",
      "2.5. Имя, введённое пользователем, должно сохраняться.",
      "2.6. Пользователь не может изменить встречу после бронирования.",
      "2.7. При попытке второго бронирования в один день система должна показать сообщение об ошибке: «Вы уже записаны на сегодня»."
    ],
    ui: [
      "3.1. Календарь выводится сеткой с датами, сгруппированными по неделям.",
      "3.2. Временные слоты отображаются интерактивными кнопками с временем (напр. «10:00»).",
      "3.3. Цвет кнопки «Забронировать» должен соответствовать фирменному стилю.",
      "3.4. После успешного бронирования должно появиться уведомление не менее чем на 3 секунды с текстом «Встреча успешно забронирована».",
      "3.5. Поле ввода имени обязательно к заполнению до отправки формы."
    ]
  };

  return (
    <div className="space-y-6 relative" ref={sectionRef}>
      <h2 className="text-2xl font-bold text-primary">Требования</h2>
      
      {/* Business Requirements */}
      <div className="bg-card p-6 rounded-lg shadow-sm border">
        <h3 className="text-xl font-semibold mb-4 text-primary">1. Бизнес-требования</h3>
        <div className="space-y-3">
          {requirements.business.map((req, index) => (
            <p 
              key={index} 
              className="text-card-foreground leading-relaxed cursor-text"
              onMouseUp={handleTextSelection}
            >
              {req}
            </p>
          ))}
        </div>
      </div>

      {/* Functional Requirements */}
      <div className="bg-card p-6 rounded-lg shadow-sm border">
        <h3 className="text-xl font-semibold mb-4 text-primary">2. Функциональные требования</h3>
        <div className="space-y-3">
          {requirements.functional.map((req, index) => (
            <p 
              key={index} 
              className="text-card-foreground leading-relaxed cursor-text"
              onMouseUp={handleTextSelection}
            >
              {req}
            </p>
          ))}
        </div>
      </div>

      {/* UI Requirements */}
      <div className="bg-card p-6 rounded-lg shadow-sm border">
        <h3 className="text-xl font-semibold mb-4 text-primary">3. UI-требования</h3>
        <div className="space-y-3">
          {requirements.ui.map((req, index) => (
            <p 
              key={index} 
              className="text-card-foreground leading-relaxed cursor-text"
              onMouseUp={handleTextSelection}
            >
              {req}
            </p>
          ))}
        </div>
      </div>

      {/* Floating Button */}
      {showButton && (
        <div
          className="absolute z-50 pointer-events-none"
          style={{
            left: buttonPosition.x - 75,
            top: buttonPosition.y
          }}
        >
          <Button
            onClick={handleMarkError}
            className="pointer-events-auto bg-destructive hover:bg-destructive/90 text-destructive-foreground shadow-lg"
            size="sm"
          >
            Отметить ошибку
          </Button>
        </div>
      )}
    </div>
  );
};

export default RequirementsSection;
