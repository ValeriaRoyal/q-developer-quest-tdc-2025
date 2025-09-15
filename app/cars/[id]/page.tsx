import { Metadata } from 'next'
import { notFound } from 'next/navigation'

interface Props {
  params: { id: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    // Buscar dados do carro para metadata
    const response = await fetch(`${process.env.NEXTAUTH_URL}/api/cars/${params.id}`)
    
    if (!response.ok) {
      return {
        title: 'Carro não encontrado - Hot Wheels Catalog',
        description: 'O carro solicitado não foi encontrado em nossa coleção.'
      }
    }

    const car = await response.json()

    return {
      title: `${car.nome} (${car.ano}) - Hot Wheels Catalog`,
      description: `Detalhes do ${car.nome} da série ${car.serie}, ano ${car.ano}. Raridade: ${car.raridade}`,
      openGraph: {
        title: `${car.nome} - Hot Wheels`,
        description: `${car.serie} ${car.ano} - ${car.raridade}`,
        type: 'article',
        images: car.imagem ? [{ url: car.imagem }] : []
      },
      twitter: {
        card: 'summary_large_image',
        title: `${car.nome} - Hot Wheels`,
        description: `${car.serie} ${car.ano}`
      }
    }
  } catch {
    return {
      title: 'Erro - Hot Wheels Catalog',
      description: 'Erro ao carregar informações do carro.'
    }
  }
}

export default function CarPage({ params }: Props) {
  // Componente da página do carro
  return (
    <div>
      <h1>Detalhes do Carro {params.id}</h1>
      {/* Conteúdo da página */}
    </div>
  )
}
