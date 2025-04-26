
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex flex-col items-center md:items-start space-y-2">
            <span className="text-sm text-muted-foreground">
              © {currentYear} ООО "АВТОПАРТНЕР". Все права защищены.
            </span>
          </div>
          <div className="flex space-x-6">
            <Link to="/settings" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Настройки
            </Link>
            <Link to="/help" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Помощь
            </Link>
            <a href="tel:+7800555555" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Поддержка
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
