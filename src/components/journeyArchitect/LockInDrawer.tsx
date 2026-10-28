import { Fragment, useState, FormEvent } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import axios from 'axios'
import { FiCheck, FiX } from 'react-icons/fi'
import { CalculatorInput, CostBreakdown as CostBreakdownData, RouteStop } from '../../lib/calculator-utils'
import { ErrorField } from '../ErrorField'
import { getTheme } from '../../styles/themes'

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

interface LockInDrawerProps {
  isOpen: boolean
  onClose: () => void
  input: CalculatorInput
  breakdown: CostBreakdownData
  routeStops: RouteStop[]
}

export function LockInDrawer({ isOpen, onClose, input, breakdown, routeStops }: LockInDrawerProps) {
  const theme = getTheme()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [fieldError, setFieldError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<null | 'success' | 'error'>(null)

  const routeSummary = routeStops.map((stop) => stop.location).join(' → ')

  const handleClose = () => {
    setFieldError(null)
    setSubmitStatus(null)
    onClose()
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (!name.trim() || !email.trim()) {
      setFieldError('Please provide your name and email.')
      return
    }
    if (!emailRegex.test(email)) {
      setFieldError('Please enter a valid email address.')
      return
    }

    setFieldError(null)
    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      const response = await axios.post(
        '/api/contact',
        {
          name,
          email,
          phone,
          message: `Journey Architect enquiry — ${input.durationDays} days, ${input.adults} adult(s), ${input.children} child(ren), traveling as ${input.travelerType}. Route: ${routeSummary}. Estimated cost: $${breakdown.totalUsd}.`,
          source: 'journey-architect',
          durationDays: input.durationDays,
          adults: input.adults,
          children: input.children,
          travelerType: input.travelerType,
          estimatedCostUsd: breakdown.totalUsd,
          routeSummary,
        },
        { headers: { 'Content-Type': 'application/json' } }
      )

      setSubmitStatus(response.status === 201 ? 'success' : 'error')
    } catch (error) {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog onClose={handleClose} className="relative z-50">
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/40" aria-hidden="true" />
        </Transition.Child>

        <div className="fixed inset-0 flex items-end sm:items-center justify-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-200"
            enterFrom="opacity-0 translate-y-8 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-8 sm:translate-y-0 sm:scale-95"
          >
            <Dialog.Panel className="w-full sm:max-w-md bg-white rounded-t-2xl sm:rounded-2xl p-6 shadow-warm-xl">
              <div className="flex items-start justify-between mb-4">
                <Dialog.Title className="text-lg font-bold text-gray-800">Lock in this itinerary</Dialog.Title>
                <button type="button" onClick={handleClose} aria-label="Close">
                  <FiX className="w-5 h-5 text-stone-500" />
                </button>
              </div>

              {submitStatus === 'success' ? (
                <div className="text-center py-6">
                  <div
                    className={`inline-flex items-center justify-center w-12 h-12 rounded-full ${theme.primaryLight} mb-3`}
                  >
                    <FiCheck className={`w-6 h-6 ${theme.primaryText}`} />
                  </div>
                  <p className="font-semibold text-gray-800 mb-1">Request sent!</p>
                  <p className="text-sm text-stone-600">
                    Our team will confirm your itinerary and final quote shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <p className="text-sm text-stone-600">
                    {input.durationDays} days · {input.adults} adult{input.adults === 1 ? '' : 's'}
                    {input.children > 0 ? `, ${input.children} child${input.children === 1 ? '' : 'ren'}` : ''} ·
                    estimated ${breakdown.totalUsd.toLocaleString()}
                  </p>
                  <div>
                    <label htmlFor="ja-name" className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    <input
                      id="ja-name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-3 bg-white border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 text-base"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="ja-email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      id="ja-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 bg-white border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 text-base"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="ja-phone" className="block text-sm font-medium text-gray-700 mb-1">
                      WhatsApp Number
                    </label>
                    <input
                      id="ja-phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-4 py-3 bg-white border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 text-base"
                      placeholder="+1 234 567 8900"
                    />
                  </div>

                  {fieldError && <ErrorField error={fieldError} />}
                  {submitStatus === 'error' && (
                    <p className="text-sm text-red-600">
                      Something went wrong sending your request. Please try again.
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold text-white transition ${theme.primary} ${theme.primaryHover} ${
                      isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                    }`}
                  >
                    {isSubmitting ? 'Sending...' : 'Confirm Request'}
                  </button>
                </form>
              )}
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  )
}
