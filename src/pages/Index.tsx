
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
    explanation: 'Не указано, насколько чаще, и за какой период.',
    attribute: 'Проверяемость, полнота'
  },
  {
    id: '1.5',
    text: 'Решение должно быть интуитивно понятным и приносить пользу клиентам.',
    explanation: 'Субъективно и непроверяемо.',
    attribute: 'Однозначность, проверяемость'
  },
  {
    id: '2.3',
    text: 'Система должна позволять бронировать любое время в течение дня.',
    explanation: 'Не указано, какие часы считаются «днём».',
    attribute: 'Полнота, однозначность'
  },
  {
    id: '2.7',
    text: 'Имя, введённое пользователем, должно сохраняться.',
    explanation: 'Неясно, где и зачем сохраняется имя.',
    attribute: 'Ясность, реализуемость'
  },
  {
    id: '2.8',
    text: 'Пользователь не может изменить встречу после бронирования.',
    explanation: 'Не обосновано, может быть неудобно для пользователя.',
    attribute: 'Согласованность, реализуемость'
  },
  {
    id: '3.4',
    text: 'Цвет кнопки «Забронировать» должен соответствовать общепринятому стилю.',
    explanation: 'Не указано, какой это стиль или цвет.',
    attribute: 'Однозначность'
  },
  {
    id: '3.9',
    text: 'После успешного бронирования должно появиться уведомление, отображающееся не менее 3 секунд с текстом «Встреча успешно забронирована».',
    explanation: 'Не указано, где и как именно отображается уведомление.',
    attribute: 'Полнота, однозначность'
  }
];

const Index = () => {
  const [foundErrors, setFoundErrors] = useState<FoundError[]>([]);
  const [resetKey, setResetKey] = useState(0);

  const handleErrorFound = useCallback((requirementId: string) => {
    const matchedError = VALID_ERRORS.find(error => error.id === requirementId);
    
    if (matchedError && !foundErrors.find(err => err.id === matchedError.id)) {
      setFoundErrors(prev => [...prev, matchedError]);
      return true;
    }
    return false;
  }, [foundErrors]);

  const resetProgress = () => {
    setFoundErrors([]);
    setResetKey(prev => prev + 1);
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
          </p>
          <p className="text-muted-foreground leading-relaxed mt-2 text-sm md:text-base">
            🟡 <strong>Наведите курсор на номер требования. Если считаете, что оно составлено с ошибкой, нажмите «Отметить как ошибку».</strong>
          </p>
          <p className="text-muted-foreground leading-relaxed mt-2 text-sm md:text-base">
            Используйте реализацию фичи ниже, чтобы сравнить требования с поведением системы и найти несоответствия.
          </p>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-8">
          {/* Requirements Section */}
          <div className="lg:col-span-2">
            <RequirementsSection onErrorFound={handleErrorFound} resetKey={resetKey} />
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
