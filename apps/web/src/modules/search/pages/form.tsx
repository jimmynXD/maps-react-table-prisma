import { PageLayout } from '~/modules/meta'
import clsx from 'clsx'
import { useState } from 'react'
import { Button, Input } from 'ui-local'

interface RestProps {
  restaurantName: string
  note?: string
}
export function Form() {
  const [restName, setRestName] = useState<string>('')
  const [note, setNote] = useState<string>('')

  const inputGpCls = clsx('flex flex-col space-y-1')
  const inputCls = 'border border-gray-700 rounded'
  const inputLabel = clsx('text-gray-700 text-sm')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const body: RestProps = { restaurantName: restName, note }
    try {
      const response = await fetch('/api/restaurant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      if (response.status !== 200) {
        console.log('something went wrong')
        //set an error banner here
      } else {
        resetForm()
        console.log('form submitted successfully !!!')
        //set a success banner here
      }
      //check response, if success is false, dont take them to success page
    } catch (error) {
      console.log('there was an error submitting', error)
    }
  }

  const resetForm = () => {
    setRestName('')
    setNote('')
  }

  return (
    <PageLayout title="form">
      <main className="p-8">
        <form className="space-y-4" onSubmit={handleSubmit} onReset={resetForm}>
          <div>
            <label className={inputGpCls}>
              <span className={inputLabel}>Restaurant Name</span>
              <Input
                value={restName}
                onChange={(e) => setRestName(e.target.value)}
                parentClassName={inputCls}
              />
            </label>
          </div>
          <div>
            <label className={inputGpCls}>
              <span className={inputLabel}>notes</span>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className={clsx(inputCls, 'p-2')}
              />
            </label>
          </div>
          <div className="space-x-4">
            <Button type="submit" kind="primary">
              Submit
            </Button>
            <Button type="reset" kind="secondary">
              Reset
            </Button>
          </div>
        </form>
      </main>
    </PageLayout>
  )
}
