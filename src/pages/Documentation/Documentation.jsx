function Documentation() {
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
          Documentation
        </h1>

        <div className="space-y-8 text-base">
          <section>
            <h2 className="text-base font-normal text-black mb-4">
              Getting Started
            </h2>
            <div className="space-y-4 text-gray-600">
              <div>
                <h3 className="text-black mb-1">Quick Start</h3>
                <p className="leading-relaxed">
                  Navigate to the sites page and create your first site to begin.
                </p>
              </div>
              <div>
                <h3 className="text-black mb-1">Requirements</h3>
                <p className="leading-relaxed">
                  No special installation required. Works with any text editor and file manager.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-base font-normal text-black mb-4">
              Basic Usage
            </h2>
            <div className="space-y-4 text-gray-600">
              <div>
                <h3 className="text-black mb-1">Creating Sites</h3>
                <p className="leading-relaxed">
                  Turn any folder into a website by connecting it to Afner.
                </p>
              </div>
              <div>
                <h3 className="text-black mb-1">Publishing Content</h3>
                <p className="leading-relaxed">
                  Simply add files to your folder and they'll appear on your site automatically.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-base font-normal text-black mb-4">
              Advanced Features
            </h2>
            <div className="space-y-4 text-gray-600">
              <div>
                <h3 className="text-black mb-1">Templates</h3>
                <p className="leading-relaxed">
                  Customize your site's appearance with our collection of templates.
                </p>
              </div>
              <div>
                <h3 className="text-black mb-1">Custom Domains</h3>
                <p className="leading-relaxed">
                  Connect your own domain name to give your site a professional look.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default Documentation