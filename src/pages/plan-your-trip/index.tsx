import Head from 'next/head'
import { Container } from '../../components/Container'
import { JourneyArchitect } from '../../components/journeyArchitect/JourneyArchitect'

export default function PlanYourTripPage() {
  return (
    <>
      <Head>
        <title>Plan Your Bhutan Trip - Door to Happiness Holiday</title>
        <meta
          name="description"
          content="Build your own Bhutan itinerary: choose your trip length and travelers, see a live cost estimate and route, then lock it in."
        />
        <meta property="og:title" content="Plan Your Bhutan Trip | Door to Happiness Holiday" />
        <meta
          property="og:description"
          content="Build your own Bhutan itinerary with a live cost estimate and route timeline."
        />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://www.doortohappinessholidays.com/plan-your-trip" />
      </Head>

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 sm:py-16">
        <Container>
          <div className="max-w-5xl mx-auto">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-2">Plan Your Bhutan Trip</h1>
            <p className="text-stone-600 mb-8 sm:mb-10 max-w-2xl">
              Adjust your trip length and travelers to see a live cost estimate and route, then lock in your
              itinerary and our team will confirm the details.
            </p>
            <JourneyArchitect />
          </div>
        </Container>
      </div>
    </>
  )
}
