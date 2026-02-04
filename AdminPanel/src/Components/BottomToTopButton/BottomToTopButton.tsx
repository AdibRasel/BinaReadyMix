import React, { useEffect, useState } from 'react';

const BottomToTopButton: React.FC = () => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.scrollY > 100) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <button
      onClick={scrollToTop}
      className={`scroll-to-top-btn position-fixed bottom-0 end-0 m-5 btn btn-primary rounded-circle shadow ${
        visible ? 'd-block' : 'd-none'
      }`}
      title="Scroll to top"
    >
      ↑
    </button>
  );
};

export default BottomToTopButton;
