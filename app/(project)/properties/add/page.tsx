'use client'
import PropertyAddForm from '@/components/PropertyAddForm'
import { NextPage } from 'next'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'

const AddPage: NextPage = ({}) => {
  const { data: session } = useSession()

  if (!session?.user) {
    redirect('/')
  }
  return (
    <section className="bg-blue-50">
      <div className="container m-auto max-w-2xl py-24">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <PropertyAddForm />
        </div>
      </div>
    </section>
  )
}

export default AddPage
