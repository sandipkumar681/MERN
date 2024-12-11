import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="bg-gradient-to-r from-blue-500 via-purple-600 to-pink-600 min-h-screen flex flex-col items-center justify-center text-white py-16">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-semibold">About Our Cloud Notebook</h1>
        <p className="mt-4 text-lg text-gray-200">
          A simple, beautiful, and secure cloud-based notebook for your notes
          and ideas.
        </p>
      </div>

      <div className="w-full max-w-4xl px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Feature 1 */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-indigo-600">
              Store Notes Securely
            </h2>
            <p className="mt-4 text-gray-800">
              With our cloud-based storage, you can securely store all your
              important notes. Everything is encrypted and backed up, ensuring
              that your data remains safe.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-indigo-600">
              Access Anytime, Anywhere
            </h2>
            <p className="mt-4 text-gray-800">
              Access your notes from any device—whether it’s your phone, tablet,
              or computer. Our seamless cloud sync ensures that your notes are
              always available when you need them.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-indigo-600">
              Seamless Sync Across Devices
            </h2>
            <p className="mt-4 text-gray-800">
              Our cloud sync feature ensures that all your notes are
              automatically updated across all your devices. Make a change on
              one device, and see it reflected everywhere instantly.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-indigo-600">
              User-Friendly Interface
            </h2>
            <p className="mt-4 text-gray-800">
              With an intuitive and easy-to-use interface, organizing your notes
              has never been easier. Create, edit, and categorize notes
              effortlessly.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-16 text-center">
        <h3 className="text-xl font-semibold">Join Us Today!</h3>
        <p className="mt-4 text-lg">
          Start using Cloud Notebook and enjoy secure, convenient access to all
          your notes!
        </p>
        {!localStorage.getItem("authToken") ? (
          <Link
            to="/signup"
            className="mt-6 inline-block px-6 py-3 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Get Started
          </Link>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default About;
