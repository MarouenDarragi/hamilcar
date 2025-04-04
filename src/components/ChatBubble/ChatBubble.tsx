
'use client'

import { useState, useEffect, useRef } from 'react'
import * as Icon from "@phosphor-icons/react"
import { motion, AnimatePresence } from 'framer-motion'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

const chatVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.8 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 24
    }
  },
  exit: { 
    opacity: 0, 
    y: 50, 
    scale: 0.8,
    transition: {
      duration: 0.3
    }
  }
}

const messageVariants = {
  hidden: (role: string) => ({
    opacity: 0,
    x: role === 'user' ? 50 : -50,
    y: 20
  }),
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 500,
      damping: 25
    }
  }
}

export default function ChatBubble() {
  const [isOpen, setIsOpen] = useState(false)
  const [message, setMessage] = useState('')
  const [chatHistory, setChatHistory] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [threadId, setThreadId] = useState<string | null>(null)
  const chatRef = useRef<HTMLDivElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isOpen &&
        chatRef.current &&
        buttonRef.current &&
        !chatRef.current.contains(event.target as Node) &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [chatHistory])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!message.trim()) return

    setError(null)
    const newMessage = { role: 'user' as const, content: message }
    setChatHistory(prev => [...prev, newMessage])
    setMessage('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          message: message.trim(),
          threadId: threadId 
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to get response')
      }

      const data = await response.json()
      
      if (data.error) {
        throw new Error(data.error)
      }

      if (data.threadId) {
        setThreadId(data.threadId)
      }

      setChatHistory(prev => [...prev, { 
        role: 'assistant', 
        content: data.response 
      }])
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An error occurred')
      console.error('Chat error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.div
            ref={chatRef}
            variants={chatVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="bg-white rounded-lg shadow-xl w-80 mb-4 border border-gray-200 overflow-hidden"
          >
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="p-4 border-b border-gray-200 bg-gradient-to-r from-blue-500 to-blue-600"
            >
              <h3 className="text-lg font-semibold text-bleu animate__animated animate__fadeIn">AI Assistant</h3>
            </motion.div>
            <motion.div 
              className="h-96 overflow-y-auto p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {chatHistory.map((msg, index) => (
                <motion.div
                  key={index}
                  custom={msg.role}
                  variants={messageVariants}
                  initial="hidden"
                  animate="visible"
                  className={`mb-4 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}
                >
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className={`inline-block p-3 rounded-lg animate__animated ${
                      msg.role === 'user'
                        ? 'bg-blue text-black animate__slideInRight'
                        : 'bg-gray text-gray-800 animate__slideInLeft'
                    } shadow-md`}
                  >
                    {msg.content}
                  </motion.div>
                </motion.div>
              ))}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center"
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="rounded-full h-8 w-8 border-2 border-blue-500 border-t-transparent mx-auto"
                  />
                </motion.div>
              )}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-3 rounded-lg bg-red-50 text-red-500 text-center animate__animated animate__shakeX"
                >
                  {error}
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </motion.div>
            <motion.form
              onSubmit={handleSubmit}
              className="p-4 border-t border-gray-200 bg-gray-50"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex gap-2">
                <motion.input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 p-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  initial={{ scale: 0.95 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.4 }}
                />
                <motion.button
                  type="submit"
                  disabled={isLoading || !message.trim()}
                  className="bg-blue text-white p-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon.PaperPlaneRight weight="fill" className="w-5 h-5" />
                </motion.button>
              </div>
            </motion.form>
          </motion.div>
        )}
      </AnimatePresence>
      <motion.button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className="bg-blue text-white p-4 rounded-full shadow-lg hover:bg-blue-600 transition-colors"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={isOpen ? { rotate: 180 } : { rotate: 0 }}
      >
        {isOpen ? (
          <Icon.X weight="bold" className="w-6 h-6" />
        ) : (
          <Icon.ChatCircleText weight="fill" className="w-6 h-6 animate__animated animate__bounceIn" />
        )}
      </motion.button>
    </div>
  )
}

