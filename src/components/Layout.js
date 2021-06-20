import Head from 'next/head';
import Link from 'next/link';

const Layout = ({ children }) => {
  return (
    <>
      <Head>
        <title>Katarina Ilišković</title>
      </Head>
      <div className=" text-gray-900">
        <Header />
        <main>{children}</main>
        <Footer />
      </div>
    </>
  );
};

export default Layout;

const Header = () => {
  const NAVIGATION = [
    { name: 'Work', url: '/work' },
    { name: 'Services', url: '/service' },
    // { name: 'Licence', url: '/licence' },
    // { name: 'Blog', url: '/blog' },
    { name: 'Contact', url: '/contact' },
    { name: 'About', url: '/about' },
  ];

  return (
    <header className="py-8 text-white fixed left-0 right-0 top-0 z-50 text-gray-900">
      <div className="container mx-auto flex justify-between items-center">
        <div>
          <Link href="/">
            <a>
              <h1 className="text-2xl leading-none">
                Katarina Ilišković
              </h1>
            </a>
          </Link>
        </div>

        <nav>
          <ul className="flex space-x-6 text-base lowercase">
            {NAVIGATION.map((item, index) => (
              <li key={index}>
                <Link href={item.url}>
                  <a>{item.name}</a>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

const Footer = () => {
  return (
    <footer>
      <div className="bg-accent-cream py-8">
        <div className="container mx-auto  flex justify-between">
          <div className="w-4/12">
            <p className="text-gray-600">Available for bookings</p>
            <p className="font-bold">WORLDWIDE</p>
          </div>

          <div className="w-4/12">
            <p className="text-gray-600">Let’s get in touch </p>
            <p className="font-bold">
              <a href="mailto:iliskovickatarina@gmail.com">
                iliskovickatarina@gmail.com
              </a>
            </p>
          </div>
          <div className="w-4/12">
            <p className="text-gray-600">Follow me on</p>
          </div>
        </div>
      </div>
      <div className="text-center text-base py-6 bg-accent-purple text-white">
        <p>Katarina Ilišković © 2021 All Rights Reserved</p>
      </div>
    </footer>
  );
};
