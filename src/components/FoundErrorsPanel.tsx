
import React from 'react';

interface FoundError {
  id: string;
  text: string;
  explanation: string;
  attribute: string;
}

interface FoundErrorsPanelProps {
  foundErrors: FoundError[];
}

const FoundErrorsPanel: React.FC<FoundErrorsPanelProps> = ({ foundErrors }) => {
  return (
    <div className="bg-card p-6 rounded-lg shadow-sm border sticky top-6 max-h-[calc(100vh-3rem)] overflow-y-auto" style={{ top: 'max(1.5rem, calc(100vh - 100%))' }}>
      <h3 className="text-xl font-semibold mb-4 text-primary">Найденные ошибки</h3>
      
      {foundErrors.length === 0 ? (
        <p className="text-muted-foreground text-sm">
          Ошибки ещё не найдены. Выделите проблемный текст в требованиях и нажмите "Отметить ошибку".
        </p>
      ) : (
        <div className="space-y-4">
          {foundErrors.map((error, index) => (
            <div key={error.id} className="border-l-4 border-destructive pl-4 py-2">
              <div className="text-sm font-medium text-destructive mb-1">
                Ошибка #{index + 1}
              </div>
              
              <div className="mb-2">
                <strong className="text-sm">Текст:</strong>
                <p className="text-sm text-muted-foreground italic">
                  "{error.text}"
                </p>
              </div>
              
              <div className="mb-2">
                <strong className="text-sm">Ошибка:</strong>
                <p className="text-sm text-muted-foreground">
                  {error.explanation}
                </p>
              </div>
              
              <div>
                <strong className="text-sm">Нарушен атрибут:</strong>
                <span className="text-sm font-medium text-primary ml-1">
                  {error.attribute}
                </span>
              </div>
            </div>
          ))}
          
          {foundErrors.length === 7 && (
            <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-sm text-green-800 font-medium">
                🎉 Поздравляем! Вы нашли все ошибки в требованиях!
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FoundErrorsPanel;
