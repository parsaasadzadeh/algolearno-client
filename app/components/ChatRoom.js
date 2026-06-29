"use client"
import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import api from '../services/api'; 

const SOCKET_URL = process.env.NEXT_PUBLIC_ASSETS_URL; 
const socket = io(SOCKET_URL, { autoConnect: false }); 

const ChatRoom = ({ user }) => { 
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  
  const [isUploading, setIsUploading] = useState(false);
  const [replyingTo, setReplyingTo] = useState(null); 
  
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null); 

  const currentUserId = user?._id || user?.id;

  useEffect(() => {
    if (currentUserId) {
      socket.connect(); 
    }
    return () => {
      socket.disconnect(); 
    }
  }, [currentUserId]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await api.get('/chat'); 
        setMessages(response.data);
      } catch (error) {
        console.error("خطا در دریافت تاریخچه چت:", error);
      }
    };
    fetchHistory();
  }, []);

  useEffect(() => {
    const handleReceive = (newMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setIsUploading(false); 
    };

    socket.on('receive_message', handleReceive);
    return () => {
      socket.off('receive_message', handleReceive);
    };
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!inputText.trim() && !isUploading) return; 

    const messageData = {
      userId: currentUserId, 
      user: user, 
      message: inputText,    
      image: null,
      replyTo: replyingTo ? replyingTo._id : null 
    };

    socket.emit('send_message', messageData);
    setInputText('');
    setReplyingTo(null); 
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file && currentUserId) {
      if (file.size > 10 * 1024 * 1024) {
        alert("حجم عکس نباید بیشتر از 10 مگابایت باشد!");
        return;
      }

      setIsUploading(true); 

      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Image = reader.result;
        
        const messageData = {
          userId: currentUserId,
          user: user,
          message: '',
          image: base64Image,
          replyTo: replyingTo ? replyingTo._id : null
        };

        socket.emit('send_message', messageData);
        setReplyingTo(null);
        
        if (fileInputRef.current) fileInputRef.current.value = '';
      };
      reader.readAsDataURL(file);
    }
  };

  const getAvatar = (userData) => {
    if (userData?.avatar) {
      return `${userData.avatar}`;
    }
    return '/default-avatar.png';
  };

  return (
    // 🟢 تغییرات اصلی موبایل: استفاده از 100dvh برای ارتفاع داینامیک، حذف گردی و مارجین در موبایل
    <div dir="rtl" className="flex flex-col w-full max-w-5xl mx-auto h-[100dvh] md:h-[80vh] md:max-h-[800px] md:mt-4 bg-slate-50 md:rounded-2xl md:shadow-lg md:border border-slate-200 overflow-hidden font-vazir relative">
      
      {/* هدر */}
      <div className="flex items-center justify-between bg-white/90 backdrop-blur-md border-b border-slate-200 px-4 md:px-6 py-3 md:py-4 sticky top-0 z-10 shadow-sm shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]"></div>
          <h3 className="text-slate-800 font-bold text-base md:text-lg">چت روم اختصاصی</h3>
        </div>
      </div>

      {/* بخش پیام‌ها - پدینگ کمتر در موبایل */}
      <div className="flex-1 overflow-y-auto p-3 md:p-6 space-y-4 md:space-y-6 scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-transparent">
        {messages.map((msg, index) => {
          const isMe = msg.user?._id === currentUserId || msg.userId === currentUserId;
          const senderName = isMe ? (user?.fullName || 'من') : (msg.user?.fullName || 'کاربر');
          const avatarUrl = getAvatar(isMe ? user : msg.user);
          
          return (
            <div key={index} className={`flex w-full ${isMe ? 'justify-start' : 'justify-end'}`}>
              {/* عرض پیام در موبایل 90 درصد و در دسکتاپ 70 درصد */}
              <div className={`flex gap-2 md:gap-3 max-w-[90%] md:max-w-[70%] ${isMe ? 'flex-row' : 'flex-row-reverse'}`}>
                
                {/* عکس پروفایل */}
                <div className="flex-shrink-0 mt-auto mb-1 hidden sm:block">
                  <img 
                    src={avatarUrl} 
                    alt={senderName} 
                    className="w-8 h-8 md:w-10 md:h-10 rounded-full object-cover border-2 border-white shadow-sm"
                  />
                </div>

                {/* بدنه پیام */}
                <div className={`flex flex-col ${isMe ? 'items-start' : 'items-end'} w-full`}>
                  <span className="text-[10px] md:text-xs text-slate-400 mb-1 px-2 font-medium">{senderName}</span>
                  
                  <div className={`group relative p-3 md:p-4 rounded-2xl md:rounded-3xl shadow-sm transition-all hover:shadow-md w-full
                    ${isMe 
                      ? 'bg-gradient-to-bl from-indigo-600 to-indigo-500 text-white rounded-br-sm' 
                      : 'bg-white text-slate-800 border border-slate-100 rounded-bl-sm'
                    }`}
                  >
                    {/* دکمه ریپلای (در موبایل همیشه کمی پیداست یا با لمس کار میکند) */}
                    <button 
                      onClick={() => setReplyingTo(msg)}
                      className={`absolute -top-3 ${isMe ? '-right-2 md:-right-3' : '-left-2 md:-left-3'} 
                      opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity p-1 md:p-1.5 bg-white shadow-md border border-slate-100 rounded-full text-slate-400 hover:text-indigo-600 z-10`}
                      title="پاسخ دادن"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3 h-3 md:w-4 md:h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
                      </svg>
                    </button>

                    {/* نمایش پیام ریپلای شده */}
                    {msg.replyTo && (
                      <div className={`mb-2 md:mb-3 p-2 md:p-2.5 rounded-lg md:rounded-xl text-[10px] md:text-xs backdrop-blur-sm border-r-4 
                        ${isMe ? 'bg-white/20 border-white text-indigo-50' : 'bg-slate-100 border-indigo-500 text-slate-600'}`}>
                        <div className="font-bold mb-0.5 md:mb-1">{msg.replyTo.user?.fullName || 'کاربر'}</div>
                        <div className="truncate opacity-90">{msg.replyTo.message || '📷 تصویر'}</div>
                      </div>
                    )}
                    
                    {/* متن پیام */}
                    {msg.message && <p className="leading-relaxed whitespace-pre-wrap text-[13px] md:text-base break-words">{msg.message}</p>}
                    
                    {/* عکس پیام */}
                    {msg.image && (
                      <img src={msg.image} alt="رسانه" className="mt-2 rounded-lg md:rounded-xl max-w-full shadow-sm border border-black/5 object-cover max-h-48 md:max-h-72" />
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* نمایش وضعیت ریپلای */}
      {replyingTo && (
        <div className="bg-white px-4 md:px-6 py-2 md:py-3 border-t border-slate-200 flex justify-between items-center shadow-[0_-4px_10px_rgba(0,0,0,0.02)] shrink-0">
          <div className="flex flex-col border-r-4 border-indigo-500 pr-2 md:pr-3 overflow-hidden">
            <span className="text-[10px] md:text-xs font-bold text-indigo-600 mb-0.5">پاسخ به {replyingTo.user?.fullName || 'کاربر'}</span>
            <span className="text-xs md:text-sm text-slate-500 truncate max-w-[200px] md:max-w-md">{replyingTo.message || '📷 تصویر'}</span>
          </div>
          <button onClick={() => setReplyingTo(null)} className="p-1.5 md:p-2 text-slate-400 hover:text-rose-500 transition-colors bg-slate-50 rounded-full shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 md:w-5 md:h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}

      {/* باکس ارسال پیام */}
      <div className="bg-white p-2 md:p-4 border-t border-slate-200 shadow-[0_-10px_15px_-3px_rgba(0,0,0,0.03)] pb-safe shrink-0">
        <form className="max-w-4xl mx-auto flex items-end gap-1.5 md:gap-3 bg-slate-50 p-1 md:p-2 rounded-2xl md:rounded-3xl border border-slate-200 focus-within:border-indigo-300 focus-within:ring-2 focus-within:ring-indigo-50 transition-all" onSubmit={sendMessage}>
          
          <label className={`flex-shrink-0 p-2.5 md:p-3 rounded-full cursor-pointer transition-colors ${isUploading ? 'bg-slate-200 text-slate-400' : 'bg-white text-indigo-600 shadow-sm hover:bg-indigo-50 border border-slate-100'}`}>
            {isUploading ? (
               <div className="w-5 h-5 md:w-6 md:h-6 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 md:w-6 md:h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
              </svg>
            )}
            <input type="file" accept="image/*" ref={fileInputRef} onChange={handleImageUpload} disabled={isUploading} className="hidden" />
          </label>
          
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendMessage(e);
              }
            }}
            placeholder={isUploading ? "آپلود عکس..." : "پیام شما..."}
            disabled={isUploading}
            className="w-full bg-transparent border-none focus:ring-0 resize-none max-h-24 md:max-h-32 min-h-[40px] md:min-h-[48px] py-2.5 md:py-3 px-1 md:px-2 text-slate-700 text-[13px] md:text-sm placeholder-slate-400"
            rows="1"
          />
          
          <button 
            type="submit" 
            className={`flex-shrink-0 p-2.5 md:p-3 rounded-full transition-all ${
              inputText.trim() || isUploading 
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200 hover:bg-indigo-700 hover:scale-105' 
              : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`} 
            disabled={isUploading || (!inputText.trim() && !isUploading)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 md:w-6 md:h-6 rotate-180">
              <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatRoom;
