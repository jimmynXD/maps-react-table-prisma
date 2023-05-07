import { PageLayout } from '@/meta'
import { useEffect, useState } from 'react'
interface RestProps {
  restaurantName: string
  note?: string
}
export function MyList() {
  const [myResponse, setMyResponse] = useState<{ data: RestProps[] }>(
    {} as { data: RestProps[] }
  )

  const readDb = async () => {
    try {
      const response = await fetch('/api/restaurant', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      })
      setMyResponse(await response.json())
      if (response.status !== 200) {
        console.log('something went wrong')
      } else {
        console.log('data found!')
      }
    } catch (error) {
      console.log('there was an error submitting', error)
    }
  }
  useEffect(() => {
    readDb()
  }, [])

  console.log(myResponse)
  return (
    <PageLayout title="My List">
      <main>
        <ul>
          {myResponse.data?.map((item, index) => (
            <li key={index}>
              <h2>{item.restaurantName}</h2>
              <p>{item.note}</p>
            </li>
          ))}
        </ul>
      </main>
    </PageLayout>
  )
}
