function Support() {
  return (
    <div className="px-12 py-12">
      <div className="max-w-lg">
        <h1 className="text-lg font-normal text-black mb-2">Support</h1>
        <p className="text-sm text-gray-600 mb-8">
          Get help with your affiliate link scanning needs
        </p>

        <form className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm text-black mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full border border-gray-300 px-3 py-2 text-sm text-black focus:outline-none focus:border-black rounded-md"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm text-black mb-2">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={6}
              className="w-full border border-gray-300 px-3 py-2 text-sm text-black focus:outline-none focus:border-black rounded-md resize-none"
              placeholder="Describe your issue or question"
            />
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="border border-gray-300 px-6 py-2 text-sm text-black hover:bg-black hover:text-white transition-colors rounded-md"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Support