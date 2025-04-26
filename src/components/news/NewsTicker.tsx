
import React, { useEffect, useState } from 'react';
import { Newspaper } from 'lucide-react';

interface News {
  id: string;
  text: string;
}

const mockNews: News[] = [
  { id: '1', text: 'Обновление системы учета оборудования запланировано на следующую неделю' },
  { id: '2', text: 'Новый регламент обслуживания серверного оборудования' },
  { id: '3', text: 'Завершена инвентаризация сетевого оборудования' },
];

const NewsTicker: React.FC = () => {
  const [currentNewsIndex, setCurrentNewsIndex] = useState(0);
  const [news] = useState<News[]>(mockNews);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentNewsIndex((prev) => (prev + 1) % news.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [news.length]);

  return (
    <div className="hidden lg:flex items-center space-x-2 px-4 py-2 bg-muted/30 rounded-full">
      <Newspaper className="h-4 w-4 text-muted-foreground shrink-0" />
      <div className="overflow-hidden whitespace-nowrap">
        <div
          className="animate-[ticker_20s_linear_infinite]"
          style={{
            animation: `ticker 20s linear infinite`,
          }}
        >
          {news[currentNewsIndex].text}
        </div>
      </div>
    </div>
  );
};

export default NewsTicker;
