
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

const Settings = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";

  const handleSaveGeneral = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Настройки сохранены",
      description: "Общие настройки успешно обновлены.",
    });
  };

  const handleSaveNotifications = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Настройки уведомлений сохранены",
      description: "Настройки уведомлений успешно обновлены.",
    });
  };

  const handleSaveBackup = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Настройки резервного копирования сохранены",
      description: "Настройки резервного копирования успешно обновлены.",
    });
  };

  const handleSaveSecurity = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Настройки безопасности сохранены",
      description: "Настройки безопасности успешно обновлены.",
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Настройки системы</CardTitle>
          <CardDescription>
            Управление настройками системы учета и инфраструктуры
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="general" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-4">
              <TabsTrigger value="general">Общие</TabsTrigger>
              <TabsTrigger value="notifications">Уведомления</TabsTrigger>
              {isAdmin && <TabsTrigger value="backup">Резервное копирование</TabsTrigger>}
              {isAdmin && <TabsTrigger value="security">Безопасность</TabsTrigger>}
            </TabsList>

            {/* General Settings Tab */}
            <TabsContent value="general">
              <form onSubmit={handleSaveGeneral} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="company">Название компании</Label>
                    <Input id="company" defaultValue="ООО АВТОПАРТНЕР" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="timezone">Часовой пояс</Label>
                    <Select defaultValue="europe-moscow">
                      <SelectTrigger id="timezone">
                        <SelectValue placeholder="Выберите часовой пояс" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="europe-moscow">Москва (UTC+3)</SelectItem>
                        <SelectItem value="europe-kaliningrad">Калининград (UTC+2)</SelectItem>
                        <SelectItem value="asia-yekaterinburg">Екатеринбург (UTC+5)</SelectItem>
                        <SelectItem value="asia-novosibirsk">Новосибирск (UTC+7)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="language">Язык системы</Label>
                    <Select defaultValue="ru">
                      <SelectTrigger id="language">
                        <SelectValue placeholder="Выберите язык" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ru">Русский</SelectItem>
                        <SelectItem value="en">English</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dateformat">Формат даты</Label>
                    <Select defaultValue="dd.mm.yyyy">
                      <SelectTrigger id="dateformat">
                        <SelectValue placeholder="Выберите формат даты" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="dd.mm.yyyy">ДД.ММ.ГГГГ</SelectItem>
                        <SelectItem value="mm.dd.yyyy">ММ.ДД.ГГГГ</SelectItem>
                        <SelectItem value="yyyy-mm-dd">ГГГГ-ММ-ДД</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="auto-logout">Автоматический выход при неактивности</Label>
                    <Switch id="auto-logout" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="analytics">Сбор аналитических данных</Label>
                    <Switch id="analytics" defaultChecked />
                  </div>
                </div>
                <Button type="submit" className="bg-autopartner-primary hover:bg-autopartner-dark">
                  Сохранить настройки
                </Button>
              </form>
            </TabsContent>

            {/* Notifications Tab */}
            <TabsContent value="notifications">
              <form onSubmit={handleSaveNotifications} className="space-y-4">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Уведомления по электронной почте</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="email-tasks">Новые задачи</Label>
                      <Switch id="email-tasks" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="email-messages">Новые сообщения</Label>
                      <Switch id="email-messages" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="email-equipment">Изменения статуса оборудования</Label>
                      <Switch id="email-equipment" defaultChecked />
                    </div>
                  </div>

                  <h3 className="text-lg font-medium">Уведомления в системе</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="system-tasks">Новые задачи</Label>
                      <Switch id="system-tasks" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="system-messages">Новые сообщения</Label>
                      <Switch id="system-messages" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="system-announcements">Объявления</Label>
                      <Switch id="system-announcements" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="system-equipment">Изменения статуса оборудования</Label>
                      <Switch id="system-equipment" defaultChecked />
                    </div>
                  </div>
                </div>
                <Button type="submit" className="bg-autopartner-primary hover:bg-autopartner-dark">
                  Сохранить настройки уведомлений
                </Button>
              </form>
            </TabsContent>

            {/* Backup Tab - Admin Only */}
            {isAdmin && (
              <TabsContent value="backup">
                <form onSubmit={handleSaveBackup} className="space-y-4">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Резервное копирование данных</h3>
                    <div className="space-y-2">
                      <Label htmlFor="backup-frequency">Частота резервного копирования</Label>
                      <Select defaultValue="daily">
                        <SelectTrigger id="backup-frequency">
                          <SelectValue placeholder="Выберите частоту" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="hourly">Каждый час</SelectItem>
                          <SelectItem value="daily">Ежедневно</SelectItem>
                          <SelectItem value="weekly">Еженедельно</SelectItem>
                          <SelectItem value="monthly">Ежемесячно</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="retention-period">Срок хранения резервных копий</Label>
                      <Select defaultValue="30days">
                        <SelectTrigger id="retention-period">
                          <SelectValue placeholder="Выберите срок хранения" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="7days">7 дней</SelectItem>
                          <SelectItem value="30days">30 дней</SelectItem>
                          <SelectItem value="90days">90 дней</SelectItem>
                          <SelectItem value="365days">1 год</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="backup-location">Место хранения резервных копий</Label>
                      <Input id="backup-location" defaultValue="/backup" />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="auto-backup">Автоматическое резервное копирование</Label>
                      <Switch id="auto-backup" defaultChecked />
                    </div>
                  </div>
                  <Button type="submit" className="bg-autopartner-primary hover:bg-autopartner-dark">
                    Сохранить настройки резервного копирования
                  </Button>
                  <div className="border-t pt-4 mt-4">
                    <Button type="button" variant="outline">
                      Создать резервную копию сейчас
                    </Button>
                  </div>
                </form>
              </TabsContent>
            )}

            {/* Security Tab - Admin Only */}
            {isAdmin && (
              <TabsContent value="security">
                <form onSubmit={handleSaveSecurity} className="space-y-4">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Настройки безопасности</h3>
                    <div className="space-y-2">
                      <Label htmlFor="password-policy">Политика паролей</Label>
                      <Select defaultValue="strong">
                        <SelectTrigger id="password-policy">
                          <SelectValue placeholder="Выберите политику" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="basic">Базовая (минимум 8 символов)</SelectItem>
                          <SelectItem value="medium">Средняя (буквы + цифры, мин. 8 символов)</SelectItem>
                          <SelectItem value="strong">Строгая (буквы + цифры + спецсимволы, мин. 10 символов)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password-expiry">Истечение срока действия пароля</Label>
                      <Select defaultValue="90days">
                        <SelectTrigger id="password-expiry">
                          <SelectValue placeholder="Выберите срок действия" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="never">Никогда</SelectItem>
                          <SelectItem value="30days">30 дней</SelectItem>
                          <SelectItem value="60days">60 дней</SelectItem>
                          <SelectItem value="90days">90 дней</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="session-timeout">Тайм-аут сессии (в минутах)</Label>
                      <Input id="session-timeout" type="number" defaultValue={30} />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="two-factor">Двухфакторная аутентификация</Label>
                        <Switch id="two-factor" />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="ip-restriction">Ограничение по IP-адресам</Label>
                        <Switch id="ip-restriction" />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="audit-logging">Аудит действий пользователей</Label>
                        <Switch id="audit-logging" defaultChecked />
                      </div>
                    </div>
                  </div>
                  <Button type="submit" className="bg-autopartner-primary hover:bg-autopartner-dark">
                    Сохранить настройки безопасности
                  </Button>
                </form>
              </TabsContent>
            )}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings;
