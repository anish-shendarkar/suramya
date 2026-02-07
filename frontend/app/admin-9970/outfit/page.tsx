'use client'
import React, { use, useEffect, useState } from 'react'
import AdminNavbar from '@/components/AdminNavbar'
import { Typewriter } from 'react-simple-typewriter'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'
import Image from 'next/image'
import { Button } from '@/components/ui/button'

function Outfit() {
  const [outfits, setOutfits] = useState<any[]>([])
  const router = useRouter()

  useEffect(() => {
    const token = Cookies.get('auth-token');
    if (!token) {
      alert('You are not logged in. Please log in to access this page.')
      router.push('/admin-9970/login')
    }
    // Fetch outfits from the API
    const fetchAllOutfits = async () => {
      try {
        const response = await fetch('http://localhost:3333/admin/getoutfits', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        if (!response.ok) {
          throw new Error('Failed to fetch outfits')
        }
        const data = await response.json()
        setOutfits(data)
      } catch (error) {
        console.error('Error fetching outfits:', error)
      }
    };
    fetchAllOutfits()
  }, [])

  const handleDeleteOutfit = async (outfitId: string) => {
    const token = Cookies.get('auth-token');
    const confirmDelete = confirm('Are you sure you want to delete this outfit?')
    if (confirmDelete) {
      try {
        const response = await fetch(`http://localhost:3333/admin/deleteoutfit/${outfitId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        if (!response.ok) {
          throw new Error('Failed to delete outfit')
        }
        // Remove the deleted outfit from the state
        setOutfits(outfits.filter(outfit => outfit._id !== outfitId))
      } catch (error) {
        console.error('Error deleting outfit:', error)
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
            {''}Outfits
          </h2>
          <button onClick={() => router.push(`outfit/create`)} className="px-4 py-2 rounded-md border border-neutral-300 bg-neutral-100 text-slate-700 text-sm hover:-translate-y-1 transform transition duration-200 hover:shadow-md">
            Create New Outfit
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-8">
          {outfits.length > 0 ? (
            outfits.map((outfit) => (
              <div key ={outfit._id} className="rounded-lg p-4 shadow-md border-2 border-transparent transition-all duration-300 hover:border-rose-300 hover:shadow-purple-400 cursor-pointer">
                <Image
                  src={outfit.coverImage}
                  alt={outfit?.name || "Outfit Image"}
                  className="object-cover w-full h-64"
                  width={300}
                  height={400}
                />
                <h2 className="text-xl font-semibold mt-2">{outfit?.name}</h2>
                <Button
                  className="mt-2 bg-rose-400 text-white hover:bg-rose-500"
                  onClick={() => router.push(`/admin-9970/outfit/edit/${outfit._id}`)}
                >
                  Edit
                </Button>

                <Button
                  className="mx-2 mt-2 bg-red-500 text-white hover:bg-rose-700"
                  onClick={() => { handleDeleteOutfit(outfit._id) }}>
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

export default Outfit
