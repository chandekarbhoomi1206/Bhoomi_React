import React, { useState, useEffect } from 'react';

function Navbar({ cartCount }) {
  const [navItems, setNavItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch XML data from public/data folder
    fetch('/data/navbar.xml')
      .then(response => response.text())
      .then(xmlText => {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlText, 'text/xml');
        
        // Check for parse errors
        if (xmlDoc.getElementsByTagName('parsererror').length) {
          console.error('XML Parse Error');
          loadFallback();
          return;
        }

        // Extract items from XML
        const items = Array.from(xmlDoc.querySelectorAll('item')).map(item => ({
          id: item.querySelector('id')?.textContent || '',
          label: item.querySelector('label')?.textContent || '',
          dynamic: item.querySelector('dynamic')?.textContent === 'true'
        }));
        
        if (items.length > 0) {
          setNavItems(items);
        } else {
          loadFallback();
        }
        setLoading(false);
      })
      .catch(error => {
        console.error('Error loading navbar XML:', error);
        loadFallback();
      });
  }, []);

  const loadFallback = () => {
    const fallbackItems = [
      { id: 'home', label: 'HOME', dynamic: false },
      { id: 'about', label: 'ABOUT', dynamic: false },
      { id: 'interiors', label: 'INTERIORS', dynamic: false },
      { id: 'menu', label: 'MENU', dynamic: false },
      { id: 'cart', label: 'CART', dynamic: true },
      { id: 'reservation', label: 'RESERVATION', dynamic: false },
      { id: 'chefs', label: 'CHEFS', dynamic: false },
      { id: 'location', label: 'LOCATION', dynamic: false },
      { id: 'contact', label: 'CONTACT', dynamic: false }
    ];
    setNavItems(fallbackItems);
    setLoading(false);
  };

  const handleScroll = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (loading) {
    return <div className="navbar"></div>;
  }

  return (
    <div className="navbar">
      {navItems.map((item) => (
        <a
          key={item.id}
          href={`#${item.id}`}
          onClick={(e) => {
            e.preventDefault();
            handleScroll(item.id);
          }}
          className="nav-link"
        >
          {item.dynamic ? `${item.label} (${cartCount})` : item.label}
        </a>
      ))}
    </div>
  );
}

export default Navbar;