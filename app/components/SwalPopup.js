'use client';

import React, { useEffect } from 'react';
import Swal from 'sweetalert2';

const SwalPopup = () => {
  useEffect(() => {

    Swal.fire({
      title: 'Welcome to my Digital Space 🌟',
      // text: 'Let\'s start exploring this website with a musical vibe 🎸🎧🎷',
      text: 'Grab your headphones & explore the rhythm of innovation 🎸💻🎧',
      imageUrl: '/profile3.jpg',
      imageAlt: 'Title Logo',
      showConfirmButton: true,
      confirmButtonText: "Explore 🚀",
      background: `
        rgba(0, 0, 3, 0.8)
        url("/popupbg.jpg")
        center center
        no-repeat
      `
    }).then((result) => {
        const audio = new Audio("audio\\intro.mp3");
        audio.play();
      });

  }, []); 

  return null;
};

export default SwalPopup;