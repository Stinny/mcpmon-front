function Report() {
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
          Templates
        </h1>

        <div className="space-y-8 text-base">
          <div className="space-y-4">
            <p className="text-gray-600">
              Browse our collection of templates to customize your site's appearance.
            </p>

            <div className="space-y-6">
              <div>
                <h2 className="text-base font-normal text-black mb-2">
                  Default
                </h2>
                <p className="text-gray-600">
                  A clean, minimal template perfect for blogs and portfolios.
                </p>
              </div>

              <div>
                <h2 className="text-base font-normal text-black mb-2">
                  Journal
                </h2>
                <p className="text-gray-600">
                  Designed for personal writing and long-form content.
                </p>
              </div>

              <div>
                <h2 className="text-base font-normal text-black mb-2">
                  Portfolio
                </h2>
                <p className="text-gray-600">
                  Showcase your work with a grid-based layout.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Report