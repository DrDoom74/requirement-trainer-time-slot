
import React from 'react';
import { Button } from './ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { HelpCircle } from 'lucide-react';

const HelpDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button 
          variant="secondary" 
          className="text-xs md:text-sm flex-1 sm:flex-none"
          size="sm"
        >
          <HelpCircle className="w-4 h-4 mr-1" />
          Справка
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Виды требований</DialogTitle>
        </DialogHeader>
        <div className="space-y-6 text-sm leading-relaxed">
          <div>
            <h3 className="font-semibold text-lg mb-2">Бизнес-требования (business requirements)</h3>
            <p className="text-muted-foreground">
              Выражают цель, ради которой разрабатывается продукт (зачем вообще он нужен, какая от него ожидается польза, 
              как заказчик с его помощью будет получать прибыль). Результатом выявления требований на этом уровне является 
              общее видение (vision and scope) — документ, который, как правило, представлен простым текстом и таблицами. 
              Здесь нет детализации поведения системы и иных технических характеристик, но вполне могут быть определены 
              приоритеты решаемых бизнес-задач, риски и т.п.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-2">Функциональные требования (functional requirements)</h3>
            <p className="text-muted-foreground">
              Описывают поведение системы, т.е. её действия (вычисления, преобразования, проверки, обработку и т.д.). 
              В контексте проектирования функциональные требования в основном влияют на дизайн системы.
            </p>
            <p className="text-muted-foreground mt-2">
              Стоит помнить, что к поведению системы относится не только то, что система должна делать, но и то, 
              что она не должна делать (например: «приложение не должно выгружать из оперативной памяти фоновые 
              документы в течение 30 минут с момента выполнения с ними последней операции»).
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-2">Требования к пользовательскому интерфейсу</h3>
            <p className="text-muted-foreground">
              Относятся к визуальному дизайну, макету и представлению пользовательского интерфейса программной системы. 
              Они касаются эстетических аспектов, визуальной иерархии и общего вида и восприятия пользовательского интерфейса.
            </p>
          </div>

          <div className="border-t pt-4 space-y-2">
            <p className="text-xs text-muted-foreground">
              <strong>Источник:</strong> Святослав Куликов. "Тестирование программного обеспечения. Базовый курс. (3-е издание)"
            </p>
            <p className="text-xs text-muted-foreground">
              <a 
                href="https://svyatoslav.biz/software_testing_book/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                https://svyatoslav.biz/software_testing_book/
              </a>
            </p>
            <p className="text-xs text-muted-foreground">
              <a 
                href="https://qat.com/guide-user-requirements/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                https://qat.com/guide-user-requirements/
              </a>
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default HelpDialog;
