import React from "react";
import { Link } from "react-router-dom";
import { image1, image2, image3 } from "../Image";

const Home = () => {
  return (
    <div className="bg-gradient-to-r from-blue-100 via-blue-200 to-blue-300 min-h-screen flex flex-col items-center justify-center p-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 leading-tight mb-4">
          Welcome to iNoteBook
        </h1>
        <p className="text-lg text-gray-700 mb-4">
          A simple, beautiful, and secure cloud-based notebook to store your
          notes and ideas.
        </p>
        <div className="flex justify-center space-x-6 mb-8">
          <Link
            to="/signup"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Sign Up
          </Link>
          <Link
            to="/login"
            className="bg-transparent text-blue-600 px-6 py-3 border-2 border-blue-600 rounded-lg shadow-md hover:bg-blue-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Log In
          </Link>
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-6">
        <div className="w-full md:w-1/2 lg:w-1/3 p-4 flex">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col h-full">
            <img
              src={image1}
              alt="Notes"
              className="w-full h-48 object-cover"
            />
            <div className="p-6 flex flex-col justify-between flex-grow">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                Keep Your Notes Safe
              </h3>
              <p className="text-gray-600">
                Store all your important notes securely in the cloud, and access
                them from anywhere.
              </p>
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/2 lg:w-1/3 p-4 flex">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col h-full">
            <img src={image2} alt="Sync" className="w-full h-48 object-cover" />
            <div className="p-6 flex flex-col justify-between flex-grow">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                Sync Across Devices
              </h3>
              <p className="text-gray-600">
                Access your notes on any device with our seamless cloud sync
                feature.
              </p>
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/2 lg:w-1/3 p-4 flex">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col h-full">
            <img
              src={image3}
              alt="Collaboration"
              className="w-full h-48 object-cover"
            />
            <div className="p-6 flex flex-col justify-between flex-grow">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                Collaborate with Ease
              </h3>
              <p className="text-gray-600">
                Share your notes and collaborate with others in real-time.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="mt-12 text-center">
        <p className="text-lg text-gray-600">
          Start using iNoteBook today, and experience the simplicity and
          security of cloud-based notes.
        </p>
      </div> */}
    </div>
  );
};

export default Home;
