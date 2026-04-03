import React, { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';

function App() {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [activeTab, setActiveTab] = useState('soup');
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [orderFormData, setOrderFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: ''
  });
  const [orderErrors, setOrderErrors] = useState({});
  const [resFormData, setResFormData] = useState({
    name: '',
    guests: '',
    datetime: '',
    message: ''
  });
  const [resErrors, setResErrors] = useState({});
  const [showQR, setShowQR] = useState(false);

  const menuData = {
    soup: [
      { name: 'Tomato Soup', price: 92 },
      { name: 'Ministrone Soup', price: 92 },
      { name: 'Cream of Veg. Soup', price: 92 },
      { name: 'Sweet Corn Veg. Soup', price: 92 },
      { name: 'Veg. Manchow Soup', price: 95 },
      { name: 'Veg. Noodles Soup', price: 95 },
      { name: 'Hot \'N\' Sour Soup', price: 95 },
      { name: 'Veg. Mushroom Soup', price: 95 }
    ],
    roasted: [
      { name: 'Paneer Tikka Dry', price: 185 },
      { name: 'Makhmali Tikka Dry', price: 185 },
      { name: 'Malai Paneer Tikka Dry', price: 185 },
      { name: 'Cripsy Chilli Veg', price: 175 },
      { name: 'Veg. Lollipop Dry', price: 175 },
      { name: 'Stuffed Potato Dry', price: 170 },
      { name: 'Aloo Tikka Dry', price: 170 },
      { name: 'Tandoori Platter', price: 295 }
    ],
    oven: [
      { name: 'Baked Macaroni with Pineapple', price: 170 },
      { name: 'Baked Spaghetti with Pineapple', price: 170 },
      { name: 'Baked Veg with Pineapple', price: 170 },
      { name: 'Burmese Spaghetti', price: 165 },
      { name: 'Baked Macaroni Cheese', price: 170 },
      { name: 'Baked Spaghetti Cheese', price: 165 },
      { name: 'Baked Mushroom', price: 170 }
    ],
    chinese: [
      { name: 'Veg. Manchurian', price: 165 },
      { name: 'Paneer Manchurian', price: 179 },
      { name: 'Paneer Chilly Dry', price: 179 },
      { name: 'Veg. Hakka Noodles', price: 155 },
      { name: 'Veg. Mushroom', price: 160 },
      { name: 'Veg. Chowmein', price: 155 },
      { name: 'Veg. Manchurian with Noodles', price: 190 }
    ],
    hindustani: [
      { name: 'Veg. Kadai', price: 165 },
      { name: 'Special Veg. Momeato', price: 170 },
      { name: 'Khoya Kaju', price: 180 },
      { name: 'Fried Kaju Handi', price: 180 },
      { name: 'Diwani Handi', price: 170 },
      { name: 'Veg. Kohlapuri', price: 155 },
      { name: 'Veg. Jaipuri', price: 155 },
      { name: 'Veg. Makkhanwala', price: 160 },
      { name: 'Navratna Korma', price: 165 },
      { name: 'Shahi Vegetable', price: 155 },
      { name: 'Tomato Corn Bharta', price: 160 },
      { name: 'Mushroom Mutter', price: 165 },
      { name: 'Palak Corn Capsicum', price: 155 },
      { name: 'Veg. Hara Masala', price: 160 },
      { name: 'Dum Alu', price: 155 },
      { name: 'Kashmiri Dum Alu (Sweet)', price: 160 },
      { name: 'Alu Methi', price: 130 },
      { name: 'Alu Palak', price: 135 },
      { name: 'Alu Dahiwala', price: 135 },
      { name: 'Mix Veg', price: 130 },
      { name: 'Suki Bhaji', price: 120 },
      { name: 'Bhindi Masala', price: 110 },
      { name: 'Chana Masala', price: 130 }
    ],
    paneer: [
      { name: 'Cheese Paneer Masala', price: 175 },
      { name: 'Paneer Kadai', price: 175 },
      { name: 'Paneer Tikka Masala', price: 180 },
      { name: 'Paneer Butter Masala', price: 155 },
      { name: 'Paneer Shahi Korma', price: 170 },
      { name: 'Paneer Bhurji', price: 180 },
      { name: 'Paneer Methi Masala', price: 190 },
      { name: 'Mutter Paneer', price: 155 },
      { name: 'Palak Paneer', price: 190 },
      { name: 'Paneer Pahadi', price: 155 },
      { name: 'Paneer Lajawab', price: 190 },
      { name: 'Paneer Handi', price: 185 },
      { name: 'Paneer Tufani', price: 190 },
      { name: 'Paneer Lababdar', price: 155 },
      { name: 'Paneer Zapak', price: 190 },
      { name: 'Paneer Tawa Masala', price: 195 },
      { name: 'Paneer Kohlapuri', price: 190 }
    ],
    tandoori: [
      { name: 'Roti', price: 18 },
      { name: 'Butter Roti', price: 21 },
      { name: 'Missi Roti', price: 29 },
      { name: 'Plain Parotha', price: 29 },
      { name: 'Butter Parotha', price: 32 },
      { name: 'Stuffed Parotha', price: 48 },
      { name: 'Plain Naan', price: 46 },
      { name: 'Butter Naan', price: 51 },
      { name: 'Cheese Naan', price: 56 },
      { name: 'Stuffed Naan', price: 60 },
      { name: 'Cheese Chilly Naan', price: 52 },
      { name: 'Cheese Garlic Naan', price: 60 },
      { name: 'Butter Kucha', price: 67 },
      { name: 'Stuffed Kucha', price: 70 },
      { name: 'Puri', price: 22 }
    ],
    rice: [
      { name: 'Hyderabadi Biryani', price: 120 },
      { name: 'Veg. Biryani', price: 115 },
      { name: 'Shahjani Pulav (Sweet)', price: 115 },
      { name: 'Kashmiri Pulav (Sweet)', price: 115 },
      { name: 'Veg. Pulav', price: 110 },
      { name: 'Peas Pulav', price: 110 },
      { name: 'Jeera Fry Rice', price: 105 },
      { name: 'Plain Rice', price: 90 },
      { name: 'Steam Plain Rice', price: 90 }
    ],
    icecream: [
      { name: 'Honeymoon Special', price: 99 },
      { name: 'Double Sundae', price: 90 },
      { name: 'Raj Bhoj', price: 55 },
      { name: 'Raja Rani', price: 58 },
      { name: 'Almond Carnival', price: 55 },
      { name: 'Kaju Anjir', price: 53 },
      { name: 'Butter Scotch', price: 49 },
      { name: 'Mango', price: 49 },
      { name: 'Casata', price: 60 },
      { name: 'Pineapple', price: 45 },
      { name: 'Vanilla', price: 42 },
      { name: 'Cherry Berry', price: 42 }
    ],
    south: [
      { name: 'Plain Dosa', price: 50 },
      { name: 'Masala Dosa', price: 90 },
      { name: 'Mysore Plain Dosa', price: 100 },
      { name: 'Mysore Masala Dosa', price: 120 },
      { name: 'Idli (3 pcs)', price: 55 },
      { name: 'Masala Idli (3 pcs)', price: 75 },
      { name: 'Plain Uttapa', price: 50 },
      { name: 'Masala Uttapa', price: 70 },
      { name: 'Onion Uttapa', price: 75 },
      { name: 'Tomato Uttapa', price: 80 },
      { name: 'Tomato Onion Uttapa', price: 90 }
    ],
    gujarati: [
      { name: 'Fafda Gathiya (250 gms)', price: 93 },
      { name: 'Papdi Gathiya (250 gms)', price: 69 },
      { name: 'Bhavnagari Gathiya (250 gms)', price: 75 },
      { name: 'Khandvi (250 gms)', price: 90 },
      { name: 'Fulwadi (250 gms)', price: 100 },
      { name: 'Patra (250 gms)', price: 120 },
      { name: 'Jalebi (250 gms)', price: 110 },
      { name: 'Khaman (250 gms)', price: 70 },
      { name: 'Dhokla (250 gms)', price: 75 },
      { name: 'Sev Khamani (250 gms)', price: 80 },
      { name: 'Navtad Samosa (6 pcs)', price: 90 }
    ],
    falooda: [
      { name: 'Mix Icecream Falooda', price: 80 },
      { name: 'Kaju Falooda', price: 90 },
      { name: 'Butter Scotch Falooda', price: 100 },
      { name: 'Black Current Falooda', price: 110 },
      { name: 'Royal Falooda', price: 110 },
      { name: 'Chocolate Falooda', price: 130 },
      { name: 'Mango Falooda', price: 130 },
      { name: 'Malai Falooda', price: 140 },
      { name: 'Royal Malai Falooda', price: 140 },
      { name: 'Green Pista Falooda', price: 140 }
    ]
  };

  const tabLabels = {
    soup: 'Soup',
    roasted: 'Roasted Starter',
    oven: 'Oven Baked',
    chinese: 'Chinese',
    hindustani: 'Hindustani Sabji',
    paneer: 'Paneer ki Sabji',
    tandoori: 'Tandoori',
    rice: 'Rice',
    icecream: 'Icecream',
    south: 'South Indian',
    gujarati: 'Gujarati Snacks',
    falooda: 'Falooda'
  };

  // Cart Functions
  const addToCart = (name, price) => {
    setCart([...cart, { name, price }]);
    setTotal(total + price);
  };

  const removeFromCart = (index) => {
    setTotal(total - cart[index].price);
    setCart(cart.filter((_, i) => i !== index));
  };

  const clearCart = () => {
    setCart([]);
    setTotal(0);
  };

  // Order Form Functions
  const handleOrderInputChange = (e) => {
    const { name, value } = e.target;
    setOrderFormData({
      ...orderFormData,
      [name]: value
    });
  };

  const validateOrder = () => {
    setOrderErrors({});
    let newErrors = {};

    if (orderFormData.name.trim().length < 3) {
      newErrors.name = 'Name must be at least 3 characters';
    }

    if (!/^\d{10}$/.test(orderFormData.phone.trim())) {
      newErrors.phone = 'Phone must be exactly 10 digits';
    }

    if (orderFormData.email.trim().length < 8) {
      newErrors.email = 'Email must be at least 8 characters';
    }

    if (orderFormData.address.trim().length < 12) {
      newErrors.address = 'Address must be at least 12 characters';
    }

    if (Object.keys(newErrors).length === 0) {
      setShowQR(true);
    } else {
      setOrderErrors(newErrors);
    }
  };

  const validateCOD = () => {
    setOrderErrors({});
    let newErrors = {};

    if (orderFormData.name.trim().length < 3) {
      newErrors.name = 'Name must be at least 3 characters';
    }

    if (!/^\d{10}$/.test(orderFormData.phone.trim())) {
      newErrors.phone = 'Phone must be exactly 10 digits';
    }

    if (orderFormData.email.trim().length < 8) {
      newErrors.email = 'Email must be at least 8 characters';
    }

    if (orderFormData.address.trim().length < 12) {
      newErrors.address = 'Address must be at least 12 characters';
    }

    if (Object.keys(newErrors).length === 0) {
      const itemsText = cart.map(i => `${i.name} - ₹${i.price}`).join('\n');
      alert(
        `Order Placed Successfully! (Cash on Delivery)\n\nName: ${orderFormData.name}\nPhone: ${orderFormData.phone}\nEmail: ${orderFormData.email}\nAddress: ${orderFormData.address}\n\nItems:\n${itemsText}\n\nTotal: ₹${total}`
      );
      clearCart();
      setOrderFormData({ name: '', phone: '', email: '', address: '' });
      setShowOrderForm(false);
      setShowQR(false);
    } else {
      setOrderErrors(newErrors);
    }
  };

  const confirmPayment = () => {
    const itemsText = cart.map(i => `${i.name} - ₹${i.price}`).join('\n');
    alert(
      `Payment Successful! Order Sent!\n\nName: ${orderFormData.name}\nPhone: ${orderFormData.phone}\nEmail: ${orderFormData.email}\nAddress: ${orderFormData.address}\n\nItems:\n${itemsText}\n\nTotal: ₹${total}\nPayment Type: Prepaid (QR Payment)`
    );
    clearCart();
    setOrderFormData({ name: '', phone: '', email: '', address: '' });
    setShowOrderForm(false);
    setShowQR(false);
  };

  // Reservation Functions
  const handleResInputChange = (e) => {
    const { name, value } = e.target;
    setResFormData({
      ...resFormData,
      [name]: value
    });
  };

  const validateReservation = () => {
    setResErrors({});
    let newErrors = {};

    if (resFormData.name.trim().length < 3) {
      newErrors.name = 'Name must be at least 3 characters';
    }

    if (resFormData.guests === '' || resFormData.guests < 1) {
      newErrors.guests = 'Minimum 1 guest required';
    }

    if (resFormData.datetime === '') {
      newErrors.datetime = 'Please select date and time';
    }

    if (Object.keys(newErrors).length === 0) {
      alert(
        `Table Reserved Successfully!\n\nName: ${resFormData.name}\nGuests: ${resFormData.guests}\nDate & Time: ${resFormData.datetime}\nMessage: ${resFormData.message || 'N/A'}`
      );
      setResFormData({ name: '', guests: '', datetime: '', message: '' });
    } else {
      setResErrors(newErrors);
    }
  };

  return (
    <>
      {/* NAVBAR FROM XML */}
      <Navbar cartCount={cart.length} />

      {/* HEADER */}
      <div id="home" className="bgimg" style={{backgroundImage: "url('images/Photo1.png')"}}>
        <div className="tag">Open from 10am to 11pm</div>
      </div>

      {/* ABOUT */}
      <div id="about" className="section">
        <div className="card">
          <h1>About</h1>
          <div className="about-text">
            <p>The Momeato Restaurant was started in 2010 by Miss. Anupama Joshi.</p>
            <p>This restaurant serves one of the best foods in Ahmedabad.</p>
            <p>This is PURE VEG Restaurant.</p>
            <p>The aim is to serve quality food.</p>
            <p>The chefs are all Housewives.</p>
            <p>Not listed on Swiggy or Zomato.</p>
            <p>It is open from 10 am to 11 pm (All Seven Days).</p>
          </div>
          <p><b>The Chef?</b> Mrs. Anupama A. Kapadia</p>
          <img src="images/Photo2.png" className="circle" alt="Chef" />
          <img src="images/Photo10.png" className="fullimg" alt="Restaurant" />
        </div>
      </div>

      {/* INTERIORS */}
      <div id="interiors" className="section">
        <div className="card">
          <h1>Interiors</h1>
          <img src="images/Photo3.png" className="fullimg" alt="Interior 1" />
          <img src="images/Photo4.png" className="fullimg" alt="Interior 2" />
          <img src="images/Photo5.png" className="fullimg" alt="Interior 3" />
          <img src="images/Photo6.png" className="fullimg" alt="Interior 4" />
        </div>
      </div>

      {/* MENU */}
      <div id="menu" className="section">
        <div className="card">
          <h1>Menu</h1>

          <div className="tabs">
            {Object.keys(tabLabels).map((tab) => (
              <div
                key={tab}
                className={`tab ${activeTab === tab ? 'active' : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                {tabLabels[tab]}
              </div>
            ))}
          </div>

          <div className="menu-box">
            {menuData[activeTab].map((item, index) => (
              <h2 key={index}>
                <span>{item.name}</span>
                <span className="price-span">
                  ₹{item.price}
                  <button
                    className="add-btn"
                    onClick={() => addToCart(item.name, item.price)}
                  >
                    Add
                  </button>
                </span>
              </h2>
            ))}
          </div>
        </div>
      </div>

      {/* CART */}
      <div id="cart" className="section">
        <div className="card">
          <h1>Your Cart</h1>

          <div id="cart-items">
            {cart.length === 0 ? (
              <p className="empty">Your cart is empty (0 items)</p>
            ) : (
              cart.map((item, index) => (
                <div key={index} className="cart-item">
                  <span>{item.name}</span>
                  <span className="price-btn-span">
                    ₹{item.price}
                    <button
                      className="remove-btn"
                      onClick={() => removeFromCart(index)}
                    >
                      ✖
                    </button>
                  </span>
                </div>
              ))
            )}
          </div>

          <h3>Total ₹ <span id="cart-total">{total}</span></h3>

          {cart.length > 0 && (
            <button
              id="order-btn"
              onClick={() => setShowOrderForm(true)}
            >
              ORDER NOW
            </button>
          )}

          {/* ORDER FORM */}
          {showOrderForm && !showQR && (
            <div id="order-form" className="order-form-display">

              <input
                id="order-name"
                type="text"
                name="name"
                placeholder="Name"
                value={orderFormData.name}
                onChange={handleOrderInputChange}
                className={orderErrors.name ? 'error' : ''}
              />
              {orderErrors.name && (
                <div className="error-text">{orderErrors.name}</div>
              )}

              <input
                id="order-phone"
                type="text"
                name="phone"
                placeholder="Phone Number"
                value={orderFormData.phone}
                onChange={handleOrderInputChange}
                className={orderErrors.phone ? 'error' : ''}
              />
              {orderErrors.phone && (
                <div className="error-text">{orderErrors.phone}</div>
              )}

              <input
                id="order-email"
                type="text"
                name="email"
                placeholder="Email ID"
                value={orderFormData.email}
                onChange={handleOrderInputChange}
                className={orderErrors.email ? 'error' : ''}
              />
              {orderErrors.email && (
                <div className="error-text">{orderErrors.email}</div>
              )}

              <textarea
                id="order-address"
                name="address"
                placeholder="Address"
                value={orderFormData.address}
                onChange={handleOrderInputChange}
                className={orderErrors.address ? 'error' : ''}
              />
              {orderErrors.address && (
                <div className="error-text">{orderErrors.address}</div>
              )}

              <button onClick={validateOrder}>Pay Now</button>
              <button className="cod" onClick={validateCOD}>
                Cash on Delivery
              </button>
            </div>
          )}

          {/* QR BOX */}
          {showQR && (
            <div id="qr-box" className="qr-display">
              <p>Scan QR & Click Confirm Payment</p>
              <img src="images/qr.png" width="180" alt="QR Code" /><br /><br />
              <button onClick={confirmPayment}>CONFIRM PAYMENT</button>
            </div>
          )}
        </div>
      </div>

      {/* RESERVATION */}
      <div id="reservation" className="section">
        <div className="card">
          <h1>Table Reservation</h1>

          <input
            id="res-name"
            type="text"
            name="name"
            placeholder="Name"
            value={resFormData.name}
            onChange={handleResInputChange}
            className={resErrors.name ? 'error' : ''}
          />
          {resErrors.name && (
            <div className="error-text">{resErrors.name}</div>
          )}

          <input
            id="res-guests"
            type="number"
            name="guests"
            min="1"
            placeholder="Number of Guests"
            value={resFormData.guests}
            onChange={handleResInputChange}
            className={resErrors.guests ? 'error' : ''}
          />
          {resErrors.guests && (
            <div className="error-text">{resErrors.guests}</div>
          )}

          <input
            id="res-datetime"
            type="datetime-local"
            name="datetime"
            value={resFormData.datetime}
            onChange={handleResInputChange}
            className={resErrors.datetime ? 'error' : ''}
          />
          {resErrors.datetime && (
            <div className="error-text">{resErrors.datetime}</div>
          )}

          <input
            id="res-message"
            type="text"
            name="message"
            placeholder="Message"
            value={resFormData.message}
            onChange={handleResInputChange}
          />

          <button onClick={validateReservation}>SEND MESSAGE</button>

        </div>
      </div>

      {/* CHEFS */}
      <div id="chefs" className="section">
        <div className="card">
          <h1>Our Chefs</h1>
          <div className="chef-grid">
            <div>
              <img src="images/Photo7.png" alt="Chef 1" />
              <h3>Anupama Kapadia</h3>
              <p>Head Chef</p>
            </div>
            <div>
              <img src="images/Photo8.png" alt="Chef 2" />
              <h3>Anjali Patel</h3>
              <p>Specialist of Punjabi Cuisine</p>
            </div>
            <div>
              <img src="images/Photo9.png" alt="Chef 3" />
              <h3>Pooja Bhavsar</h3>
              <p>Specialist of South Indian Cuisine</p>
            </div>
          </div>
        </div>
      </div>

      {/* LOCATION */}
      <div id="location" className="section">
        <div className="card">
          <h1>Location</h1>
          <iframe
            title="Momeato Restaurant Location"
            src="https://www.google.com/maps/embed"
            width="100%"
            height="450"
            style={{ border: 'none', borderRadius: '20px' }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>

      {/* CONTACT */}
      <div id="contact" className="section">
        <div className="card">
          <h1>Contact</h1>

          <h2>Address :</h2>
          <div className="contact-address">
            <p><b>Dairy Corner,</b></p>
            <p><b>Kankaria Road,</b></p>
            <p><b>Near Diwan Ballubhai School</b></p>
            <p><b>Kankaria Gate No. : 3,</b></p>
            <p><b>Kankaria,</b></p>
            <p><b>Ahmedabad - 380008.</b></p>
          </div>

          <h2>Phone Number :</h2>
          <div className="contact-phone">
            <p><b>8866436934</b></p>
            <p><b>8200016294</b></p>
          </div>

          <p className="contact-note">
            <span className="note-span">NOTE :</span>
            {' '}We offer full-service catering for any event, large or small.
            We understand your needs and we will cater the food to satisfy the biggest
            criteria of them all, both look and taste.
          </p>
        </div>
      </div>

      {/* FOOTER */}
      <footer>
        Powered & Designed by <a href="https://www.linkedin.com/in/bhoomi" target="_blank" rel="noopener noreferrer">Bhoomi S. Chandekar</a>
      </footer>
    </>
  );
}

export default App;