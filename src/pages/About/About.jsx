function About() {
  return (
    <div className="px-12 py-12 min-h-screen">
      <div className="max-w-2xl">
        <div className="flex justify-end mb-8">
          <div className="space-x-4 text-sm">
            <a href="#" className="text-gray-500 hover:text-black">Log in</a>
            <a href="#" className="text-gray-500 hover:text-black">Sign up</a>
          </div>
        </div>

        <h1 className="text-lg font-normal text-black mb-8">
          Explore
        </h1>

        <div className="space-y-8 text-base">
          <div className="space-y-4">
            <p className="text-gray-600">
              Discover websites created with Afner.
            </p>

            <div className="space-y-6">
              <div>
                <h2 className="text-base font-normal text-black mb-2">
                  Featured Sites
                </h2>
                <p className="text-gray-600">
                  A curated collection of exceptional Afner sites.
                </p>
              </div>

              <div>
                <h2 className="text-base font-normal text-black mb-2">
                  Recent Updates
                </h2>
                <p className="text-gray-600">
                  See what the community has been building lately.
                </p>
              </div>

              <div>
                <h2 className="text-base font-normal text-black mb-2">
                  Browse by Tag
                </h2>
                <p className="text-gray-600">
                  Find sites organized by topic and interest.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About