
import React, { useState, useCallback } from 'react';
import RequirementsSection from '../components/RequirementsSection';
import ImplementationSection from '../components/ImplementationSection';
import FoundErrorsPanel from '../components/FoundErrorsPanel';
import { Button } from '../components/ui/button';

interface FoundError {
  id: string;
  text: string;
  explanation: string;
  attribute: string;
}

const VALID_ERRORS = [
  {
    id: '1.3',
    text: 'Пользователи должны чаще приходить на встречи после бронирования.',
    explanation: 'Неопределено, насколько «чаще» и за какой период',
    attribute: 'Проверяемость / полнота'
  },
  {
    id: '1.5',
    text: 'Решение должно быть интуитивно понятным и приносить пользу клиентам.',
    explanation: 'Субъективно, невозможно измерить',
    attribute: 'Однозначность / проверяемость'
  },
  {
    id: '2.3',
    text: 'Система должна позволять бронировать любое время в течение дня.',
    explanation: 'Противоречит требованию 2.2',
    attribute: 'Непротиворечивость'
  },
  {
    id: '2.5',
    text: 'Имя, введённое пользователем, должно сохраняться.',
    explanation: 'Не ясно, где должно хранится имя',
    attribute: 'Ясность / реализуемость'
  },
  {
    id: '2.6',
    text: 'Пользователь не может изменить встречу после бронирования.',
    explanation: 'Не обоснован запрет, может противоречить UX',
    attribute: 'Согласованность / реализуемость'
  },
  {
    id: '3.3',
    text: 'Цвет кнопки «Забронировать» должен соответствовать общепринятому стилю.',
    explanation: 'Стиль не описан, цвет не указан',
    attribute: 'Однозначность / проверяемость'
  },
  {
    id: '3.4',
    text: 'После успешного бронирования должно появиться уведомление не менее чем на 3 секунды с текстом «Встреча успешно забронирована».',
    explanation: 'Не указано место появления уведомления',
    attribute: 'Полнота / однозначность'
  }
];

const Index = () => {
  const [foundErrors, setFoundErrors] = useState<FoundError[]>([]);

  const handleErrorFound = useCallback((selectedText: string) => {
    const trimmedText = selectedText.trim();
    
    // Ищем точное совпадение основного текста ошибки
    let matchedError = VALID_ERRORS.find(error => 
      error.text === trimmedText
    );
    
    // Если не найдено точное совпадение, проверяем содержится ли основной текст в выделении
    if (!matchedError) {
      matchedError = VALID_ERRORS.find(error => 
        trimmedText.includes(error.text)
      );
    }
    
    // Проверяем выделение по номеру пункта (например, "1.3", "2.6")
    if (!matchedError) {
      const numberMatch = trimmedText.match(/^(\d\.\d)/);
      if (numberMatch) {
        const number = numberMatch[1];
        matchedError = VALID_ERRORS.find(error => error.id === number);
      }
    }
    
    if (matchedError && !foundErrors.find(err => err.id === matchedError.id)) {
      setFoundErrors(prev => [...prev, matchedError]);
      return true;
    }
    return false;
  }, [foundErrors]);

  const resetProgress = () => {
    setFoundErrors([]);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary text-primary-foreground p-3 md:p-4 shadow-lg">
        <div className="container mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-6">
            <h1 className="text-lg md:text-xl font-bold">Тренажёр по анализу требований</h1>
            <div className="text-base md:text-lg font-semibold">
              Найдено ошибок: {foundErrors.length} / 7
            </div>
          </div>
          <div className="flex gap-2 md:gap-3 w-full sm:w-auto">
            <Button 
              variant="secondary" 
              onClick={resetProgress}
              className="bg-secondary hover:bg-secondary/80 text-xs md:text-sm flex-1 sm:flex-none"
              size="sm"
            >
              Сбросить прогресс
            </Button>
            <Button 
              variant="secondary"
              asChild
              className="text-xs md:text-sm flex-1 sm:flex-none"
              size="sm"
            >
              <a href="https://boosty.to/aklimenko" target="_blank" rel="noopener noreferrer">
                Ответы
              </a>
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto p-3 md:p-6 space-y-6 md:space-y-8">
        {/* Task Description */}
        <section className="bg-card p-4 md:p-6 rounded-lg shadow-sm border">
          <h2 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 text-primary">Задание</h2>
          <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
            Вы — начинающий тестировщик. Перед вами — описание требований к фиче "Выбор времени встречи".
            Некоторые формулировки содержат ошибки: они могут быть <strong>противоречивыми, неполными, двусмысленными или нереализуемыми</strong>.
            Ваша задача — найти и <strong>отметить эти ошибки</strong>, выделив соответствующий текст и нажав кнопку <strong>"Отметить ошибку"</strong>.
          </p>
          <p className="text-muted-foreground leading-relaxed mt-2 text-sm md:text-base">
            Используйте реализацию фичи ниже, чтобы сравнить требования с поведением системы и найти несоответствия.
          </p>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-8">
          {/* Requirements Section */}
          <div className="lg:col-span-2">
            <RequirementsSection onErrorFound={handleErrorFound} />
          </div>

          {/* Found Errors Panel */}
          <div className="lg:col-span-1">
            <FoundErrorsPanel foundErrors={foundErrors} />
          </div>
        </div>

        {/* Implementation Section */}
        <ImplementationSection />
      </main>

      {/* Footer */}
      <footer className="bg-muted mt-8 md:mt-12 p-4 md:p-6 text-center">
        <p className="text-muted-foreground text-sm md:text-base">
          <strong>Школа Алексея Клименко по тестированию ПО</strong>
        </p>
        <a 
          href="https://t.me/QA_AKlimenko" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-primary hover:text-primary/80 underline text-sm md:text-base"
        >
          Telegram-канал
        </a>
      </footer>
    </div>
  );
};

export default Index;
