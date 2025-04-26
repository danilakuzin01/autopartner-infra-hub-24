
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Edit } from 'lucide-react';

const ProfileEditor = () => {
  const { user } = useAuth();
  const [formData, setFormData] = React.useState({
    name: user?.name || '',
    position: user?.position || '',
    contact: user?.contact || '',
    office: user?.office || '',
    room: user?.room || '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically update the user profile
    // For now we'll just console.log the data
    console.log('Updated profile:', formData);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Edit className="h-5 w-5 text-muted-foreground" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Редактировать профиль</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">ФИО</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="position">Должность</Label>
              <Input
                id="position"
                name="position"
                value={formData.position}
                onChange={handleChange}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="contact">Контактные данные</Label>
              <Input
                id="contact"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="office">Офис</Label>
              <Input
                id="office"
                name="office"
                value={formData.office}
                onChange={handleChange}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="room">Кабинет</Label>
              <Input
                id="room"
                name="room"
                value={formData.room}
                onChange={handleChange}
              />
            </div>
          </div>
          <Button type="submit" className="w-full">Сохранить</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileEditor;
