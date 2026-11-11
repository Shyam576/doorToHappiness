import { Container } from '../../components/Container'
import { JourneyArchitect } from '../../components/journeyArchitect/JourneyArchitect'
import Seo from '../../components/Seo'

export default function PlanYourTripPage() {
  return (
    <>
      <Seo
        title="Plan Your Bhutan Trip - Door to Happiness Holiday"
        description="Build your own Bhutan itinerary: choose your trip length and travelers, see a live cost estimate and route, then lock it in."
        path="/plan-your-trip"
        ogTitle="Plan Your Bhutan Trip | Door to Happiness Holiday"
        ogDescription="Build your own Bhutan itinerary with a live cost estimate and route timeline."
      />

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
