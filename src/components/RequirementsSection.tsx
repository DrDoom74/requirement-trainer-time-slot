
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
      "1.1. Пользователь может выбрать и забронировать удобное время встречи с консультантом.",
      "1.2. Встречи проводятся в будние дни.",
      "1.3. Каждому пользователю доступно бронирование.",
      "1.4. После успешного бронирования пользователь получит подтверждение.",
      "1.5. Бронирование должно повысить удовлетворённость пользователей."
    ],
    functional: [
      "2.1. Календарь должен отображать ближайшие доступные даты.",
      "2.2. Пользователь может выбрать свободный временной слот из предложенных.",
      "2.3. Система должна позволять бронировать время в течение дня.",
      "2.4. После бронирования слот исчезает из доступных.",
      "2.5. Введённое имя должно сохраняться.",
      "2.6. Пользователь не может изменить встречу после бронирования.",
      "2.7. Бронирование возможно только в случае, если пользователь ещё не бронировал встречу на этот день."
    ],
    ui: [
      "3.1. Календарь должен быть представлен в виде сетки с датами.",
      "3.2. Временные слоты отображаются в виде кнопок.",
      "3.3. Кнопка «Забронировать» должна быть зелёной.",
      "3.4. После успешного бронирования должно появиться сообщение.",
      "3.5. Имя пользователя вводится в поле перед бронированием."
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
