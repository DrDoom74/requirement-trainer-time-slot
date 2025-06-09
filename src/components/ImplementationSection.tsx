
import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Calendar, Clock } from 'lucide-react';

interface BookingSlot {
  date: string;
  time: string;
  available: boolean;
}

const ImplementationSection: React.FC = () => {
  const [selectedSlot, setSelectedSlot] = useState<BookingSlot | null>(null);
  const [userName, setUserName] = useState('');
  const [bookedSlots, setBookedSlots] = useState<Set<string>>(new Set());
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [bookingMessage, setBookingMessage] = useState('');

  // Генерируем слоты на 7 дней вперёд
  const generateSlots = (): BookingSlot[] => {
    const slots: BookingSlot[] = [];
    const today = new Date();
    
    for (let dayOffset = 0; dayOffset < 7; dayOffset++) {
      const date = new Date(today);
      date.setDate(today.getDate() + dayOffset);
      
      // Пропускаем выходные (проблема: не указано в требованиях точно)
      if (date.getDay() === 0 || date.getDay() === 6) continue;
      
      const dateStr = date.toLocaleDateString('ru-RU');
      
      // Генерируем временные слоты (проблема: без указания таймзоны)
      const times = ['10:00', '11:00', '14:00', '15:00', '16:00'];
      
      times.forEach(time => {
        const slotKey = `${dateStr}-${time}`;
        slots.push({
          date: dateStr,
          time: time,
          available: !bookedSlots.has(slotKey)
        });
      });
    }
    
    return slots;
  };

  const slots = generateSlots();

  const handleSlotClick = (slot: BookingSlot) => {
    if (!slot.available) return;
    
    setSelectedSlot(slot);
    setShowBookingForm(true);
    setBookingMessage('');
  };

  const handleBooking = () => {
    if (!selectedSlot || !userName.trim()) return;
    
    const slotKey = `${selectedSlot.date}-${selectedSlot.time}`;
    setBookedSlots(prev => new Set([...prev, slotKey]));
    setBookingMessage('Встреча успешно забронирована');
    setShowBookingForm(false);
    setSelectedSlot(null);
    setUserName('');
  };

  const cancelBooking = () => {
    setShowBookingForm(false);
    setSelectedSlot(null);
    setUserName('');
  };

  // Группируем слоты по датам
  const slotsByDate = slots.reduce((acc, slot) => {
    if (!acc[slot.date]) acc[slot.date] = [];
    acc[slot.date].push(slot);
    return acc;
  }, {} as Record<string, BookingSlot[]>);

  return (
    <div className="bg-card p-6 rounded-lg shadow-sm border">
      <div className="flex items-center gap-2 mb-6">
        <Calendar className="h-6 w-6 text-primary" />
        <h2 className="text-2xl font-bold text-primary">Реализация: Выбор времени встречи</h2>
      </div>

      {bookingMessage && (
        <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-green-800 font-medium">{bookingMessage}</p>
        </div>
      )}

      <div className="space-y-6">
        {Object.entries(slotsByDate).map(([date, dateSlots]) => (
          <div key={date} className="bg-muted/30 p-4 rounded-lg">
            <h3 className="font-semibold mb-3 text-foreground">{date}</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
              {dateSlots.map((slot, index) => (
                <Button
                  key={index}
                  variant={slot.available ? "outline" : "secondary"}
                  size="sm"
                  onClick={() => handleSlotClick(slot)}
                  disabled={!slot.available}
                  className={`flex items-center gap-1 ${
                    slot.available 
                      ? 'hover:bg-primary hover:text-primary-foreground' 
                      : 'opacity-50 cursor-not-allowed'
                  }`}
                >
                  <Clock className="h-3 w-3" />
                  {slot.time}
                </Button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Booking Form Modal */}
      {showBookingForm && selectedSlot && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-card p-6 rounded-lg shadow-lg border max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">Бронирование встречи</h3>
            
            <div className="mb-4">
              <p className="text-sm text-muted-foreground">
                <strong>Дата:</strong> {selectedSlot.date}
              </p>
              <p className="text-sm text-muted-foreground">
                <strong>Время:</strong> {selectedSlot.time}
              </p>
            </div>

            <div className="mb-4">
              <label htmlFor="userName" className="block text-sm font-medium mb-2">
                Ваше имя
              </label>
              <Input
                id="userName"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Введите ваше имя"
              />
            </div>

            <div className="flex gap-3">
              <Button
                onClick={handleBooking}
                disabled={!userName.trim()}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white"
              >
                Забронировать
              </Button>
              <Button
                variant="outline"
                onClick={cancelBooking}
                className="flex-1"
              >
                Отмена
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Implementation Issues Note */}
      <div className="mt-6 p-4 bg-orange-50 border border-orange-200 rounded-lg">
        <h4 className="font-medium text-orange-800 mb-2">💡 Попробуйте протестировать:</h4>
        <ul className="text-sm text-orange-700 space-y-1">
          <li>• Можете ли вы отменить забронированную встречу?</li>
          <li>• Указана ли таймзона для времени встреч?</li>
          <li>• Все ли требования выполняются корректно?</li>
        </ul>
      </div>
    </div>
  );
};

export default ImplementationSection;
