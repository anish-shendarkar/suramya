'use client'
import React, { use, useEffect, useState } from 'react'
import AdminNavbar from '@/components/AdminNavbar'
import { Typewriter } from 'react-simple-typewriter'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'
import Image from 'next/image'
import { Button } from '@/components/ui/button'

function allJewellery() {
  const [jewellery, setJewellery] = useState<any[]>([])
  const router = useRouter()

  useEffect(() => {
    const token = Cookies.get('auth-token');
    if (!token) {
      alert('You are not logged in. Please log in to access this page.')
      router.push('/admin-9970/login')
    }
    // Fetch Jewellerys from the API
    const fetchAllJewellery = async () => {
      try {
        const response = await fetch('http://localhost:3333/admin/getjewelleryitems', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        if (!response.ok) {
          throw new Error('Failed to fetch Jewellery')
        }
        const data = await response.json()
        setJewellery(data)
      } catch (error) {
        console.error('Error fetching Jewellery:', error)
      }
    };
    fetchAllJewellery()
  }, [])

  const handleDeleteJewellery = async (jewelleryId: string) => {
    const token = Cookies.get('auth-token');
    const confirmDelete = confirm('Are you sure you want to delete this Jewellery?')
    if (confirmDelete) {
      try {
        const response = await fetch(`http://localhost:3333/admin/deleteJewellery/${jewelleryId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        if (!response.ok) {
          throw new Error('Failed to delete Jewellery')
        }
        // Remove the deleted Jewellery from the state
        setJewellery(jewellery.filter(jewellery => jewellery._id !== jewelleryId))
      } catch (error) {
        console.error('Error deleting Jewellery:', error)
      }
    }
  };

  return (
    <>
      <AdminNavbar />
      <div className='flex flex-col h-screen bg-gray-100'>
        <div className='flex items-center justify-between px-8 mt-4'>
          <h2 className='text-2xl font-semibold'>
            <span className='text-rose-500'>
              <Typewriter
                words={['Create', 'Edit', 'Delete', 'Manage']}
                loop={2}
                cursor
                cursorStyle='_'
                typeSpeed={70}
                deleteSpeed={50}
                delaySpeed={1000}
              />
            </span>
            {''}Jewellery
          </h2>
          <button onClick={() => router.push(`jewellery/create`)} className="px-4 py-2 rounded-md border border-neutral-300 bg-neutral-100 text-slate-700 text-sm hover:-translate-y-1 transform transition duration-200 hover:shadow-md">
            Create New Jewellery
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-8">
          {jewellery.length > 0 ? (
            jewellery.map((jewellery) => (
              <div key ={jewellery._id} className="rounded-lg p-4 shadow-md border-2 border-transparent transition-all duration-300 hover:border-rose-300 hover:shadow-purple-400 cursor-pointer">
                <Image
                  src={`http://localhost:3333/uploads/jewellery/${jewellery.images[0]}`}
                  alt={jewellery?.name || "Jewellery Image"}
                  className="object-cover w-full h-64"
                  width={300}
                  height={400}
                />
                <h2 className="text-xl font-semibold mt-2">{jewellery?.name}</h2>
                <Button
                  className="mt-2 bg-rose-400 text-white hover:bg-rose-500"
                  onClick={() => router.push(`/admin-9970/Jewellery/edit/${jewellery._id}`)}
                >
                  Edit
                </Button>

                <Button
                  className="mx-2 mt-2 bg-red-500 text-white hover:bg-rose-700"
                  onClick={() => { handleDeleteJewellery(jewellery._id) }}>
                  Delete
                </Button>

              </div>
            ))
          ) : (
            <p className="text-gray-500">No products available for this category.</p>
          )}
        </div>
      </div>
    </>
  )
}

export default allJewellery
