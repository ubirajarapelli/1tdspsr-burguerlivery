'use client'
import { Transition } from '@headlessui/react'
import { CircleCheck, CircleX } from 'lucide-react'
import 'animate.css'

interface NotificationProps {
    type: string
    title: string
    description: string
    onClose: () => void
}

export default function Notification({ type, title, description, onClose }: NotificationProps) {

  return (
    <>
      <div
        aria-live="assertive"
        className="animate__animated animate__lightSpeedInRight pointer-events-none fixed inset-0 flex items-end px-4 py-6 sm:items-start sm:p-6"
      >
        <div className="flex w-full flex-col items-center space-y-4 sm:items-end">
          <Transition show={true}>
            <div className="w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
              <div className="p-4">
                <div className="flex items-start">
                  <div className="shrink-0">
                   {type === "success" && <CircleCheck aria-hidden="true" className="size-6 text-green-400" />} 
                   {type === "danger" && <CircleCheck aria-hidden="true" className="size-6 text-red-400" />} 
                  </div>
                  <div className="ml-3 w-0 flex-1 pt-0.5">
                    <p className="text-sm font-medium text-gray-900">{title}</p>
                    <p className="mt-1 text-sm text-gray-500">{description}</p>
                  </div>
                  <div className="ml-4 flex shrink-0">
                    <button
                      type="button"
                      onClick={onClose}

                      className="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      <span className="sr-only">Close</span>
                      <CircleX aria-hidden="true" className="size-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </>
  )
}