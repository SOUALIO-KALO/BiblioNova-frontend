import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 w-full">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">À propos de nous </h3>
            <p className="text-gray-300">
              Votre source de confiance en matière de livres et de littérature.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Liens rapides</h3>
            <ul className="link space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/borrowed-books"
                  className="text-gray-300 hover:text-white"
                >
                  My Books
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-white">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Info</h3>
            <address className="text-gray-300 not-italic">
              <p>123 Rue de la Bibliothèque</p>
              <p>La Cité du Livre, BC 12345</p>
              <p>Email: info@biblionova.com</p>
              <p>Phone: (123) 456-7890</p>
            </address>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-center">
          <p className="text-gray-300">
            © {new Date().getFullYear()} BiblioNova. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
