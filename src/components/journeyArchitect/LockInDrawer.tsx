import { Fragment, useState, FormEvent } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import axios from 'axios'
import { FiCheck, FiX } from 'react-icons/fi'
import { CalculatorInput, CostBreakdown as CostBreakdownData, RouteStop } from '../../lib/calculator-utils'

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

interface LockInDrawerProps {
  isOpen: boolean
  onClose: () => void
  input: CalculatorInput
  breakdown: CostBreakdownData
  routeStops: RouteStop[]
}

export function LockInDrawer({ isOpen, onClose, input, breakdown, routeStops }: LockInDrawerProps) {
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
          <div className="fixed inset-0 bg-emerald-950/70" aria-hidden="true" />
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
            <Dialog.Panel className="max-h-[92vh] w-full overflow-y-auto bg-brand-ivory p-6 sm:max-w-md sm:p-8">
              <div className="mb-4 flex items-start justify-between gap-4">
                <Dialog.Title className="font-heading text-3xl font-medium leading-tight text-stone-900">Lock in this itinerary</Dialog.Title>
                <button type="button" onClick={handleClose} aria-label="Close" className="-mr-2 -mt-2 flex h-11 w-11 items-center justify-center text-stone-600 hover:text-emerald-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-900">
                  <FiX className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>

              {submitStatus === 'success' ? (
                <div className="py-6" role="status">
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-emerald-900 text-amber-200">
                    <FiCheck className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <p className="mb-1 font-heading text-2xl font-medium text-stone-900">Request sent!</p>
                  <p className="text-sm text-stone-700">
                    Our team will confirm your itinerary and final quote shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <p className="border-y border-stone-300 py-3 text-sm text-stone-700">
                    {input.durationDays} days · {input.adults} adult{input.adults === 1 ? '' : 's'}
                    {input.children > 0 ? `, ${input.children} child${input.children === 1 ? '' : 'ren'}` : ''} ·
                    estimated ${breakdown.totalUsd.toLocaleString()}
                  </p>
                  <div>
                    <label htmlFor="ja-name" className="mb-1 block text-[11px] font-semibold uppercase tracking-[0.2em] text-stone-600">
                      Full Name
                    </label>
                    <input
                      id="ja-name"
                      autoComplete="name"
                      aria-invalid={fieldError ? true : undefined}
                      aria-describedby={fieldError ? 'ja-error' : undefined}
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="block min-h-[48px] w-full border-0 border-b border-stone-400 bg-transparent px-0 py-3 text-base text-stone-900 placeholder:text-stone-400 focus:border-emerald-900 focus:outline-none focus:ring-0 focus-visible:shadow-[0_1px_0_0_#183C32]"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="ja-email" className="mb-1 block text-[11px] font-semibold uppercase tracking-[0.2em] text-stone-600">
                      Email
                    </label>
                    <input
                      id="ja-email"
                      autoComplete="email"
                      aria-invalid={fieldError ? true : undefined}
                      aria-describedby={fieldError ? 'ja-error' : undefined}
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="block min-h-[48px] w-full border-0 border-b border-stone-400 bg-transparent px-0 py-3 text-base text-stone-900 placeholder:text-stone-400 focus:border-emerald-900 focus:outline-none focus:ring-0 focus-visible:shadow-[0_1px_0_0_#183C32]"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="ja-phone" className="mb-1 block text-[11px] font-semibold uppercase tracking-[0.2em] text-stone-600">
                      WhatsApp Number
                    </label>
                    <input
                      id="ja-phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="block min-h-[48px] w-full border-0 border-b border-stone-400 bg-transparent px-0 py-3 text-base text-stone-900 placeholder:text-stone-400 focus:border-emerald-900 focus:outline-none focus:ring-0 focus-visible:shadow-[0_1px_0_0_#183C32]"
                      placeholder="+1 234 567 8900"
                    />
                  </div>

                  {fieldError && (
                    <p id="ja-error" role="alert" className="text-sm font-medium text-red-700">
                      {fieldError}
                    </p>
                  )}
                  {submitStatus === 'error' && (
                    <p role="alert" className="text-sm font-medium text-red-700">
                      Something went wrong sending your request. Please try again.
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex min-h-[52px] w-full items-center justify-center gap-2 rounded-full bg-emerald-900 px-8 py-4 text-[13px] font-semibold uppercase tracking-[0.14em] text-white transition-colors hover:bg-emerald-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-900 disabled:cursor-not-allowed disabled:opacity-70"
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
