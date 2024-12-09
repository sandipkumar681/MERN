const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <p className="text-lg font-semibold mb-2">Created by Sandip</p>

        <div className="flex justify-center space-x-6">
          <a
            href="https://github.com/sandipkumar681"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-indigo-400"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/sandip-kumar-behera-209299256/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-indigo-400"
          >
            LinkedIn
          </a>
          <a
            href="mailto:sandipbehera681@gmail.com.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-indigo-400"
          >
            Email
          </a>
        </div>
        {/* <p className="text-sm text-gray-400 mt-4">
          &copy; {new Date().getFullYear()} sandip681. All Rights Reserved.
        </p> */}
      </div>
    </footer>
  );
};

export default Footer;
