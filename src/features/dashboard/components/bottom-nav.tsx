'use client'

import { Home, List, PlusCircle, Calendar, User } from 'lucide-react'
import { cn } from '@/lib/utils'

type NavItem = 'home' | 'viagens' | 'calendario' | 'perfil'

interface BottomNavProps {
  currentView: NavItem
  onChangeView: (view: NavItem) => void
  onAddClick: () => void
}

export function BottomNav({ currentView, onChangeView, onAddClick }: BottomNavProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800 pb-safe-area-inset-bottom">
      <div className="flex items-center justify-around h-16">
        <button
          onClick={() => onChangeView('home')}
          className={cn(
            "flex flex-col items-center justify-center w-full h-full space-y-1",
            currentView === 'home' ? "text-primary" : "text-gray-500 hover:text-gray-900 dark:hover:text-gray-300"
          )}
        >
          <Home className="w-5 h-5" />
          <span className="text-[10px] font-medium">Início</span>
        </button>

        <button
          onClick={() => onChangeView('viagens')}
          className={cn(
            "flex flex-col items-center justify-center w-full h-full space-y-1",
            currentView === 'viagens' ? "text-primary" : "text-gray-500 hover:text-gray-900 dark:hover:text-gray-300"
          )}
        >
          <List className="w-5 h-5" />
          <span className="text-[10px] font-medium">Viagens</span>
        </button>

        <button
          onClick={onAddClick}
          className="flex flex-col items-center justify-center w-full h-full -mt-5"
        >
          <div className="bg-primary text-primary-foreground p-3 rounded-full shadow-lg">
            <PlusCircle className="w-6 h-6" />
          </div>
          <span className="text-[10px] font-medium mt-1 text-gray-500">Nova</span>
        </button>

        <button
          onClick={() => onChangeView('calendario')}
          className={cn(
            "flex flex-col items-center justify-center w-full h-full space-y-1",
            currentView === 'calendario' ? "text-primary" : "text-gray-500 hover:text-gray-900 dark:hover:text-gray-300"
          )}
        >
          <Calendar className="w-5 h-5" />
          <span className="text-[10px] font-medium">Agenda</span>
        </button>

        <button
          onClick={() => onChangeView('perfil')}
          className={cn(
            "flex flex-col items-center justify-center w-full h-full space-y-1",
            currentView === 'perfil' ? "text-primary" : "text-gray-500 hover:text-gray-900 dark:hover:text-gray-300"
          )}
        >
          <User className="w-5 h-5" />
          <span className="text-[10px] font-medium">Perfil</span>
        </button>
      </div>
    </div>
  )
}

