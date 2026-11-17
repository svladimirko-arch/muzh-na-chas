import { useCallback, useState } from 'react'
import { MASTERS } from './data/catalog'
import type { Service } from './data/catalog'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { Services } from './components/Services'
import { Masters } from './components/Masters'
import { HowItWorks } from './components/HowItWorks'
import { Contacts } from './components/Contacts'
import { Footer } from './components/Footer'
import { PriceModal } from './components/PriceModal'
import { OrderModal } from './components/order/OrderModal'

export default function App() {
  const [priceService, setPriceService] = useState<Service | null>(null)
  const [order, setOrder] = useState<{ serviceId: string; masterId: string } | null>(null)
  const [filter, setFilter] = useState<string | null>(null)

  const openOrder = useCallback((serviceId = '', masterId = 'any') => {
    setPriceService(null)
    setOrder({ serviceId, masterId })
  }, [])

  /** Из прайса — к карточкам мастеров, отфильтрованным по услуге. */
  const gotoMasters = useCallback((serviceId: string) => {
    setPriceService(null)
    setFilter(serviceId)
    document.getElementById('masters')?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  /** Кнопка «Заказать» в карточке мастера: услуга подставляется по его специализации. */
  const orderForMaster = useCallback(
    (masterId: string) => {
      const m = MASTERS.find(x => x.id === masterId)
      openOrder(m ? m.serviceIds[0] : '', masterId)
    },
    [openOrder],
  )

  return (
    <>
      <Header onOrder={() => openOrder()} />
      <main>
        <Hero onOrder={() => openOrder()} />
        <Services onOpenPrice={setPriceService} />
        <Masters filter={filter} onFilter={setFilter} onOrder={orderForMaster} />
        <HowItWorks />
        <Contacts onOrder={() => openOrder()} />
      </main>
      <Footer />

      {priceService && (
        <PriceModal
          service={priceService}
          onClose={() => setPriceService(null)}
          onMasters={gotoMasters}
          onOrder={id => openOrder(id, 'any')}
        />
      )}
      {order && (
        <OrderModal
          initialServiceId={order.serviceId}
          initialMasterId={order.masterId}
          onClose={() => setOrder(null)}
        />
      )}
    </>
  )
}
