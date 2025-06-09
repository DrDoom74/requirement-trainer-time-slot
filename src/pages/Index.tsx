
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
    text: 'Каждому пользователю доступно бронирование.',
    explanation: 'Не указано ограничение: 1 встреча в день.',
    attribute: 'Полнота'
  },
  {
    id: '1.5',
    text: 'Бронирование должно повысить удовлетворённость пользователей.',
    explanation: 'Непроверяемо, абстрактно.',
    attribute: 'Проверяемость'
  },
  {
    id: '2.1',
    text: 'Календарь должен отображать ближайшие доступные даты.',
    explanation: 'Не указано, сколько дней (7? 30?).',
    attribute: 'Однозначность'
  },
  {
    id: '2.3',
    text: 'Система должна позволять бронировать время в течение дня.',
    explanation: 'Не определено, какие часы считаются доступными.',
    attribute: 'Полнота'
  },
  {
    id: '2.5',
    text: 'Введённое имя должно сохраняться.',
    explanation: 'Непонятно, где и зачем сохраняется.',
    attribute: 'Ясность'
  },
  {
    id: '2.6',
    text: 'Пользователь не может изменить встречу после бронирования.',
    explanation: 'Противоречит ожидаемому поведению.',
    attribute: 'Реализуемость'
  },
  {
    id: '3.4',
    text: 'После успешного бронирования должно появиться сообщение.',
    explanation: 'Не указано, какой текст, где и как долго.',
    attribute: 'Проверяемость'
  }
];

const Index = () => {
  const [foundErrors, setFoundErrors] = useState<FoundError[]>([]);

  const handleErrorFound = useCallback((selectedText: string) => {
    const matchedError = VALID_ERRORS.find(error => 
      error.text === selectedText.trim()
    );
    
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
      <header className="bg-primary text-primary-foreground p-4 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-6">
            <h1 className="text-xl font-bold">Тренажёр по анализу требований</h1>
            <div className="text-lg font-semibold">
              Найдено ошибок: {foundErrors.length} / 7
            </div>
          </div>
          <div className="flex gap-3">
            <Button 
              variant="secondary" 
              onClick={resetProgress}
              className="bg-secondary hover:bg-secondary/80"
            >
              Сбросить прогресс
            </Button>
            <Button 
              variant="outline" 
              asChild
              className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
            >
              <a href="https://boosty.to/aklimenko" target="_blank" rel="noopener noreferrer">
                Ответы
              </a>
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto p-6 space-y-8">
        {/* Task Description */}
        <section className="bg-card p-6 rounded-lg shadow-sm border">
          <h2 className="text-2xl font-bold mb-4 text-primary">Задание</h2>
          <p className="text-muted-foreground leading-relaxed">
            Вы — начинающий тестировщик. Перед вами — описание требований к фиче "Выбор времени встречи".
            Некоторые формулировки содержат ошибки: они могут быть <strong>противоречивыми, неполными, двусмысленными или нереализуемыми</strong>.
            Ваша задача — найти и <strong>отметить эти ошибки</strong>, выделив соответствующий текст и нажав кнопку <strong>"Отметить ошибку"</strong>.
          </p>
          <p className="text-muted-foreground leading-relaxed mt-2">
            Используйте реализацию фичи ниже, чтобы сравнить требования с поведением системы и найти несоответствия.
          </p>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
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
      <footer className="bg-muted mt-12 p-6 text-center">
        <p className="text-muted-foreground">
          <strong>Школа Алексея Клименко по тестированию ПО</strong>
        </p>
        <a 
          href="https://t.me/QA_AKlimenko" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-primary hover:text-primary/80 underline"
        >
          Telegram-канал
        </a>
      </footer>
    </div>
  );
};

export default Index;
