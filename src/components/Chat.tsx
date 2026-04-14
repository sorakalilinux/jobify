import { useState, useEffect, useRef } from 'react';
import { BaseCrudService } from '@/integrations';
import { useMember } from '@/integrations';
import { Messages, PerfisdeUsurios } from '@/entities';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { X } from 'lucide-react';

interface ChatProps {
  recipientId: string;
  recipientName: string;
  onClose: () => void;
}

export default function Chat({ recipientId, recipientName, onClose }: ChatProps) {
  const { member } = useMember();
  const [messages, setMessages] = useState<Messages[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    loadMessages();
    const interval = setInterval(loadMessages, 2000); // Poll for new messages
    return () => clearInterval(interval);
  }, [recipientId]);

  const loadMessages = async () => {
    try {
      const result = await BaseCrudService.getAll<Messages>('mensagens');
      const filtered = result.items.filter(
        msg =>
          (msg.senderId === member?._id && msg.recipientId === recipientId) ||
          (msg.senderId === recipientId && msg.recipientId === member?._id)
      );
      setMessages(filtered.sort((a, b) => {
        const dateA = new Date(a.sentDate || 0).getTime();
        const dateB = new Date(b.sentDate || 0).getTime();
        return dateA - dateB;
      }));
      setLoading(false);
    } catch (err) {
      console.error('Error loading messages:', err);
      setLoading(false);
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !member?._id) return;

    setSending(true);
    try {
      const message: Messages = {
        _id: crypto.randomUUID(),
        senderId: member._id,
        recipientId,
        messageContent: newMessage,
        sentDate: new Date(),
        isRead: false,
      };

      await BaseCrudService.create('mensagens', message);
      setNewMessage('');
      await loadMessages();
    } catch (err) {
      console.error('Error sending message:', err);
    } finally {
      setSending(false);
    }
  };

  return (
    <Card className="fixed bottom-4 right-4 w-96 h-96 bg-secondary border-secondary-foreground/20 flex flex-col shadow-lg z-50">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-secondary-foreground/20">
        <h3 className="font-bold text-primary-foreground">{recipientName}</h3>
        <button
          onClick={onClose}
          className="text-secondary-foreground hover:text-primary-foreground transition"
        >
          <X size={20} />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <LoadingSpinner />
          </div>
        ) : messages.length === 0 ? (
          <p className="text-center text-secondary-foreground text-sm">Nenhuma mensagem ainda</p>
        ) : (
          messages.map(msg => (
            <div
              key={msg._id}
              className={`flex ${msg.senderId === member?._id ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs px-3 py-2 rounded-lg ${
                  msg.senderId === member?._id
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary-foreground/20 text-primary-foreground'
                }`}
              >
                <p className="text-sm">{msg.messageContent}</p>
                <p className="text-xs opacity-70 mt-1">
                  {new Date(msg.sentDate || 0).toLocaleTimeString('pt-BR', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSendMessage} className="p-4 border-t border-secondary-foreground/20 flex gap-2">
        <Input
          type="text"
          value={newMessage}
          onChange={e => setNewMessage(e.target.value)}
          placeholder="Digite uma mensagem..."
          disabled={sending}
          className="bg-background border-secondary-foreground/30 text-primary-foreground flex-1"
        />
        <Button
          type="submit"
          disabled={sending || !newMessage.trim()}
          className="bg-primary hover:bg-primary/90 text-primary-foreground"
        >
          {sending ? '...' : 'Enviar'}
        </Button>
      </form>
    </Card>
  );
}
