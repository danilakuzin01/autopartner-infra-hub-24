
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { MessageSquare } from "lucide-react";

interface Message {
  id: string;
  sender: {
    name: string;
    id: string;
  };
  receiver: {
    name: string;
    id: string;
  };
  content: string;
  timestamp: string;
  read: boolean;
}

const Messages = () => {
  const { toast } = useToast();
  const [selectedContact, setSelectedContact] = useState<string | null>(null);
  const [messageInput, setMessageInput] = useState("");

  const [contacts] = useState([
    { id: "1", name: "Смирнов Андрей", unreadCount: 0 },
    { id: "2", name: "Иванова Мария", unreadCount: 2 },
    { id: "3", name: "Петров Алексей", unreadCount: 0 },
    { id: "4", name: "Николаев Артем", unreadCount: 1 },
    { id: "5", name: "Козлова Ольга", unreadCount: 0 },
  ]);

  const [messages] = useState<Message[]>([
    {
      id: "1",
      sender: { name: "Иванова Мария", id: "2" },
      receiver: { name: "Вы", id: "current" },
      content: "Здравствуйте! Не могу войти в 1С, пишет ошибку авторизации. Можете помочь?",
      timestamp: "2025-04-26T09:30:00",
      read: false
    },
    {
      id: "2",
      sender: { name: "Вы", id: "current" },
      receiver: { name: "Иванова Мария", id: "2" },
      content: "Добрый день! Проверю настройки и сообщу вам о результатах.",
      timestamp: "2025-04-26T09:35:00",
      read: true
    },
    {
      id: "3",
      sender: { name: "Иванова Мария", id: "2" },
      receiver: { name: "Вы", id: "current" },
      content: "Спасибо большое за оперативность!",
      timestamp: "2025-04-26T09:37:00",
      read: false
    },
    {
      id: "4",
      sender: { name: "Николаев Артем", id: "4" },
      receiver: { name: "Вы", id: "current" },
      content: "Привет! Завтра будем обновлять ПО на серверах. Начнем в 22:00.",
      timestamp: "2025-04-26T14:15:00",
      read: false
    }
  ]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageInput.trim() || !selectedContact) return;

    // In a real app, this would send the message to the server
    toast({
      title: "Сообщение отправлено",
      description: `Сообщение для ${contacts.find(c => c.id === selectedContact)?.name} успешно отправлено.`,
    });

    setMessageInput("");
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part.charAt(0))
      .join('')
      .toUpperCase();
  };

  const formatMessageTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const filteredMessages = messages.filter(
    message => 
      (message.sender.id === selectedContact && message.receiver.id === "current") || 
      (message.sender.id === "current" && message.receiver.id === selectedContact)
  ).sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());

  return (
    <div className="space-y-6">
      <Card className="h-[calc(100vh-200px)]">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div>
            <CardTitle className="text-xl">Сообщения</CardTitle>
            <p className="text-sm text-gray-500">Общение с сотрудниками компании</p>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="flex h-full">
            {/* Contacts sidebar */}
            <div className="w-1/3 border-r border-gray-200 h-full">
              <div className="p-4">
                <Input placeholder="Поиск контактов..." className="mb-4" />
                <div className="space-y-1">
                  {contacts.map((contact) => (
                    <div
                      key={contact.id}
                      onClick={() => setSelectedContact(contact.id)}
                      className={`flex items-center gap-3 p-2 rounded-md cursor-pointer ${
                        selectedContact === contact.id ? "bg-blue-50" : "hover:bg-gray-50"
                      }`}
                    >
                      <Avatar>
                        <AvatarFallback>{getInitials(contact.name)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="font-medium">{contact.name}</div>
                      </div>
                      {contact.unreadCount > 0 && (
                        <div className="h-5 w-5 rounded-full bg-autopartner-primary text-white text-xs flex items-center justify-center">
                          {contact.unreadCount}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Message content */}
            <div className="flex-1 flex flex-col h-full">
              {selectedContact ? (
                <>
                  {/* Selected contact header */}
                  <div className="p-4 border-b border-gray-200">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback>
                          {getInitials(contacts.find(c => c.id === selectedContact)?.name || "")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{contacts.find(c => c.id === selectedContact)?.name}</div>
                        <div className="text-xs text-green-600">В сети</div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Messages */}
                  <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
                    {filteredMessages.length > 0 ? (
                      <div className="space-y-4">
                        {filteredMessages.map((message) => (
                          <div
                            key={message.id}
                            className={`flex ${
                              message.sender.id === "current" ? "justify-end" : "justify-start"
                            }`}
                          >
                            <div
                              className={`max-w-[70%] rounded-lg p-3 ${
                                message.sender.id === "current"
                                  ? "bg-autopartner-primary text-white"
                                  : "bg-white border border-gray-200"
                              }`}
                            >
                              <div className="text-sm">{message.content}</div>
                              <div className={`text-xs mt-1 ${
                                message.sender.id === "current" ? "text-blue-100" : "text-gray-500"
                              }`}>
                                {formatMessageTime(message.timestamp)}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="h-full flex flex-col items-center justify-center text-gray-500">
                        <MessageSquare className="h-12 w-12 mb-2 text-gray-300" />
                        <p>Нет сообщений</p>
                        <p className="text-sm">Начните общение прямо сейчас</p>
                      </div>
                    )}
                  </div>
                  
                  {/* Message input */}
                  <div className="p-4 border-t border-gray-200">
                    <form onSubmit={handleSendMessage} className="flex gap-2">
                      <Input
                        placeholder="Введите сообщение..."
                        value={messageInput}
                        onChange={(e) => setMessageInput(e.target.value)}
                        className="flex-1"
                      />
                      <Button
                        type="submit"
                        className="bg-autopartner-primary hover:bg-autopartner-dark"
                        disabled={!messageInput.trim()}
                      >
                        Отправить
                      </Button>
                    </form>
                  </div>
                </>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-gray-500">
                  <MessageSquare className="h-16 w-16 mb-4 text-gray-300" />
                  <p className="text-lg">Выберите контакт для общения</p>
                  <p className="text-sm">Выберите сотрудника из списка слева, чтобы начать общение</p>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Messages;
