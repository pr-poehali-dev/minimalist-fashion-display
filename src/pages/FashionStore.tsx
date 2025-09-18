import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import Icon from '@/components/ui/icon'

interface ClothingItem {
  id: number
  name: string
  price: number
  category: 'shirt' | 'pants' | 'dress' | 'jacket'
  color: string
  image: string
}

interface OutfitItem {
  item: ClothingItem
  position: string
}

const mockClothingItems: ClothingItem[] = [
  { id: 1, name: 'Классическая рубашка', price: 2500, category: 'shirt', color: 'white', image: '/placeholder.svg' },
  { id: 2, name: 'Прямые джинсы', price: 3200, category: 'pants', color: 'blue', image: '/placeholder.svg' },
  { id: 3, name: 'Летнее платье', price: 4100, category: 'dress', color: 'pink', image: '/placeholder.svg' },
  { id: 4, name: 'Пиджак slim', price: 5800, category: 'jacket', color: 'black', image: '/placeholder.svg' },
  { id: 5, name: 'Поло базовое', price: 1900, category: 'shirt', color: 'gray', image: '/placeholder.svg' },
  { id: 6, name: 'Чиносы', price: 2800, category: 'pants', color: 'beige', image: '/placeholder.svg' },
  { id: 7, name: 'Макси платье', price: 4700, category: 'dress', color: 'red', image: '/placeholder.svg' },
  { id: 8, name: 'Бомбер', price: 4200, category: 'jacket', color: 'green', image: '/placeholder.svg' }
]

export default function FashionStore() {
  const [darkMode, setDarkMode] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [hoveredItem, setHoveredItem] = useState<ClothingItem | null>(null)
  const [currentOutfit, setCurrentOutfit] = useState<OutfitItem[]>([])
  const [cartItems, setCartItems] = useState<ClothingItem[]>([])

  const filteredItems = mockClothingItems.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const addToOutfit = (item: ClothingItem) => {
    const newOutfitItem: OutfitItem = {
      item,
      position: getPositionForCategory(item.category)
    }
    setCurrentOutfit(prev => {
      const filtered = prev.filter(outfit => outfit.item.category !== item.category)
      return [...filtered, newOutfitItem]
    })
  }

  const addToCart = (item: ClothingItem) => {
    setCartItems(prev => [...prev, item])
  }

  const getPositionForCategory = (category: string) => {
    switch (category) {
      case 'shirt': return 'top-8 left-1/2 transform -translate-x-1/2'
      case 'pants': return 'top-24 left-1/2 transform -translate-x-1/2'
      case 'dress': return 'top-8 left-1/2 transform -translate-x-1/2'
      case 'jacket': return 'top-4 left-1/2 transform -translate-x-1/2'
      default: return 'top-8 left-1/2 transform -translate-x-1/2'
    }
  }

  const toggleTheme = () => {
    setDarkMode(!darkMode)
    document.documentElement.classList.toggle('dark')
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark bg-gray-900' : 'bg-white'}`}>
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          {/* Logo */}
          <div className="text-2xl font-thin tracking-widest text-black dark:text-white">
            FASHION
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Button variant="ghost" className="font-light text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800">
              Главная
            </Button>
            <Button variant="ghost" className="font-light text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800">
              Поиск
            </Button>
            <Button variant="ghost" className="font-light text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 relative">
              <Icon name="ShoppingBag" size={20} />
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-black dark:bg-white text-white dark:text-black text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </Button>
            <Button 
              variant="ghost" 
              onClick={toggleTheme}
              className="font-light text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <Icon name={darkMode ? "Sun" : "Moon"} size={20} />
            </Button>
          </nav>
        </div>
      </header>

      {/* Search Bar */}
      <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-40 w-96">
        <Input
          type="text"
          placeholder="Поиск одежды..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border border-gray-200 dark:border-gray-700 font-light"
        />
      </div>

      {/* Main Content */}
      <main className="pt-32 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-12 gap-8">
            
            {/* Left Column - Products */}
            <div className="col-span-3">
              <div className="space-y-4">
                {filteredItems.slice(0, Math.ceil(filteredItems.length / 2)).map((item) => (
                  <Card 
                    key={item.id} 
                    className="cursor-pointer transition-all duration-300 hover:scale-105 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
                    onMouseEnter={() => setHoveredItem(item)}
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    <CardContent className="p-4">
                      <div className="aspect-square bg-gray-100 dark:bg-gray-700 rounded-lg mb-3 flex items-center justify-center">
                        <Icon name="Shirt" size={40} className="text-gray-400" />
                      </div>
                      <h3 className="font-light text-sm text-black dark:text-white mb-1">{item.name}</h3>
                      <p className="text-gray-600 dark:text-gray-300 font-thin text-xs mb-3">{item.price} ₽</p>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => addToOutfit(item)}
                        className="w-full font-light text-xs border-gray-300 dark:border-gray-600 text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        <Icon name="Plus" size={14} className="mr-1" />
                        На манекен
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Center Column - Mannequin */}
            <div className="col-span-6 flex justify-center">
              <div className="relative">
                <div className="w-64 h-96 bg-gray-50 dark:bg-gray-800 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-200 dark:border-gray-600">
                  <img 
                    src="/img/b4cffa80-1425-4284-b3ec-ff45414121e8.jpg" 
                    alt="Mannequin" 
                    className="w-48 h-80 object-contain opacity-30 dark:opacity-20"
                  />
                  
                  {/* Display current outfit */}
                  {currentOutfit.map((outfitItem, index) => (
                    <div 
                      key={index}
                      className={`absolute ${outfitItem.position} w-16 h-8 bg-blue-200 dark:bg-blue-700 rounded opacity-80 flex items-center justify-center text-xs font-light border border-blue-300 dark:border-blue-600`}
                    >
                      {outfitItem.item.category}
                    </div>
                  ))}
                  
                  {/* Show hovered item preview */}
                  {hoveredItem && (
                    <div 
                      className={`absolute ${getPositionForCategory(hoveredItem.category)} w-16 h-8 bg-blue-200 dark:bg-blue-700 rounded opacity-60 flex items-center justify-center text-xs font-light animate-pulse`}
                    >
                      {hoveredItem.category}
                    </div>
                  )}
                </div>
                
                {/* Outfit Actions */}
                {currentOutfit.length > 0 && (
                  <div className="mt-4 flex justify-center space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setCurrentOutfit([])}
                      className="font-light text-xs"
                    >
                      Очистить
                    </Button>
                    <Button 
                      size="sm"
                      onClick={() => {
                        currentOutfit.forEach(outfit => addToCart(outfit.item))
                        setCurrentOutfit([])
                      }}
                      className="font-light text-xs bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200"
                    >
                      В корзину
                    </Button>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column - Products */}
            <div className="col-span-3">
              <div className="space-y-4">
                {filteredItems.slice(Math.ceil(filteredItems.length / 2)).map((item) => (
                  <Card 
                    key={item.id} 
                    className="cursor-pointer transition-all duration-300 hover:scale-105 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
                    onMouseEnter={() => setHoveredItem(item)}
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    <CardContent className="p-4">
                      <div className="aspect-square bg-gray-100 dark:bg-gray-700 rounded-lg mb-3 flex items-center justify-center">
                        <Icon name="Shirt" size={40} className="text-gray-400" />
                      </div>
                      <h3 className="font-light text-sm text-black dark:text-white mb-1">{item.name}</h3>
                      <p className="text-gray-600 dark:text-gray-300 font-thin text-xs mb-3">{item.price} ₽</p>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => addToOutfit(item)}
                        className="w-full font-light text-xs border-gray-300 dark:border-gray-600 text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        <Icon name="Plus" size={14} className="mr-1" />
                        На манекен
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer - Hotline */}
      <footer className="fixed bottom-4 right-4 z-40">
        <div className="flex items-center space-x-2 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-200 dark:border-gray-700">
          <Icon name="Phone" size={16} className="text-red-500" />
          <span className="text-xs font-light text-black dark:text-white">+7 (999) 123-45-67</span>
        </div>
      </footer>
    </div>
  )
}