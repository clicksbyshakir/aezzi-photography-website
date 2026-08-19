/* ==========================================================================
   Site data — the one file to edit when photographs, quotes or contact
   details change. Everything else reads from here.

   Images currently point at the WordPress media library that the previous
   version of the site was built on. To host them from this repo instead,
   drop the files into /assets/img/ and swap the `src` values for paths like
   "assets/img/ajnuts-1.jpg" — nothing else needs to change.
   ========================================================================== */

const SITE = {
  name: "Aezziphotography",
  photographer: "Abdulhussain Ezzi",
  location: "Nairobi, Kenya",
  email: "photography.aezzi@gmail.com",
  phone: "+254 737 675 553",
  phoneHref: "tel:+254737675553",
  whatsapp: "http://wa.link/4n0kmk",
  instagram: "https://www.instagram.com/aezziwildlife/",
  instagramHandle: "@aezziwildlife",

  /* Optional: paste a form endpoint (Formspree, Basin, Netlify Forms, Web3Forms…)
     to have the contact form POST directly. Left empty, the form falls back to
     opening the visitor's mail client with the message pre-filled. */
  formEndpoint: ""
};

/* Hero slideshow on the front page. */
const SLIDESHOW = [
  { src: "https://aezziphotography.com/wp-content/uploads/2024/08/hyatt-regency-nairobi-4.jpg?w=1600", alt: "Interior of a suite at the Hyatt Regency Nairobi" },
  { src: "https://aezziphotography.com/wp-content/uploads/2024/08/bed-side-view.jpg?w=1600",           alt: "Bedroom interior photographed from the bedside" },
  { src: "https://aezziphotography.com/wp-content/uploads/2024/07/hyatt-regency-nairobi-3-1.jpg?w=1600", alt: "Hotel room at the Hyatt Regency Nairobi" },
  { src: "https://aezziphotography.com/wp-content/uploads/2024/08/dsc_1359.jpg?w=1600",               alt: "Photograph from the Aezziphotography portfolio" },
  { src: "https://aezziphotography.com/wp-content/uploads/2024/07/1000002667.jpg?w=1600",             alt: "Photograph from the Aezziphotography portfolio" }
];

const PORTRAIT = {
  src: "https://aezziphotography.com/wp-content/uploads/2024/07/17220050285415121593955415211141.jpg?w=1000",
  alt: "Abdulhussain Ezzi on location with his camera"
};

/* ---------------------------------------------------------------------------
   Galleries. Each set renders as its own section on the portfolio page and as
   a tile in the category grid. A set with an empty `images` array still gets a
   tile, marked as an archive in progress — add photographs and it goes live.
   --------------------------------------------------------------------------- */
const GALLERIES = [
  {
    id: "wildlife",
    title: "Wildlife",
    tagline: "Telling the stories of the voiceless",
    blurb: "Made across Kenya's conservancies and reserves — from Ol Pejeta, where this whole journey started with (the late) Sudan, the last male northern white rhino.",
    images: []
  },
  {
    id: "interiors",
    title: "Interiors & Real Estate",
    tagline: "Hotels, homes and architecture",
    blurb: "Rooms, suites and spaces shot for hospitality groups, developers and agents — plus 360° virtual tours for listings that need to be walked through, not just scrolled.",
    images: [
      { src: "https://aezziphotography.com/wp-content/uploads/2024/08/hyatt-regency-nairobi-4.jpg?w=1400",   w: 1400, h: 933, alt: "Guest room at the Hyatt Regency Nairobi", caption: "Hyatt Regency Nairobi" },
      { src: "https://aezziphotography.com/wp-content/uploads/2024/07/hyatt-regency-nairobi-3-1.jpg?w=1400", w: 1400, h: 933, alt: "Suite interior at the Hyatt Regency Nairobi", caption: "Hyatt Regency Nairobi" },
      { src: "https://aezziphotography.com/wp-content/uploads/2024/08/bed-side-view.jpg?w=1400",             w: 1400, h: 933, alt: "Bedroom photographed from the bedside", caption: "Bedroom, side view" }
    ]
  },
  {
    id: "weddings",
    title: "Weddings & Events",
    tagline: "The moments between the moments",
    blurb: "Full-day coverage that stays out of the way. Photography and video, delivered fast — the thing clients mention most often in their reviews.",
    images: []
  },
  {
    id: "product",
    title: "Product & Brand",
    tagline: "Studio, styled and on location",
    blurb: "Furniture, food and packaging shot for Kenyan brands — including Fourmax Builders, AJ's Nuts and Flavours of Zanzibar.",
    images: [
      { src: "https://aezziphotographydotcom.wordpress.com/wp-content/uploads/2025/03/ajnuts-1.jpg?w=1024",  w: 1024, h: 683, alt: "Packaged nuts styled for a product shoot", caption: "AJ's Nuts" },
      { src: "https://aezziphotographydotcom.wordpress.com/wp-content/uploads/2025/03/ajnuts-2.jpg?w=1024",  w: 1024, h: 683, alt: "Packaged nuts styled for a product shoot", caption: "AJ's Nuts" },
      { src: "https://aezziphotographydotcom.wordpress.com/wp-content/uploads/2025/03/ajnuts-4.jpg?w=1024",  w: 1024, h: 683, alt: "Packaged nuts styled for a product shoot", caption: "AJ's Nuts" },
      { src: "https://aezziphotographydotcom.wordpress.com/wp-content/uploads/2025/03/ajnuts-5.jpg?w=1024",  w: 1024, h: 683, alt: "Packaged nuts styled for a product shoot", caption: "AJ's Nuts" },
      { src: "https://aezziphotographydotcom.wordpress.com/wp-content/uploads/2025/03/ajnuts-10.jpg?w=1024", w: 1024, h: 683, alt: "Packaged nuts styled for a product shoot", caption: "AJ's Nuts" },
      { src: "https://aezziphotographydotcom.wordpress.com/wp-content/uploads/2025/03/bed-1.jpg?w=1024",     w: 1024, h: 683, alt: "Bed frame photographed for a furniture catalogue", caption: "Fourmax Builders" },
      { src: "https://aezziphotographydotcom.wordpress.com/wp-content/uploads/2025/03/bed-cu-1.jpg?w=1024",  w: 1024, h: 683, alt: "Close detail of a bed frame", caption: "Fourmax Builders" },
      { src: "https://aezziphotographydotcom.wordpress.com/wp-content/uploads/2025/03/bedside-1.jpg?w=1024", w: 1024, h: 683, alt: "Bedside table photographed for a furniture catalogue", caption: "Fourmax Builders" },
      { src: "https://aezziphotographydotcom.wordpress.com/wp-content/uploads/2025/03/bed-1-1.jpg?w=1024",   w: 1024, h: 683, alt: "Bed frame photographed for a furniture catalogue", caption: "Fourmax Builders" },
      { src: "https://aezziphotographydotcom.wordpress.com/wp-content/uploads/2025/03/bed-2.jpg?w=1024",     w: 1024, h: 683, alt: "Bed frame photographed for a furniture catalogue", caption: "Fourmax Builders" },
      { src: "https://aezziphotographydotcom.wordpress.com/wp-content/uploads/2025/03/bed-3.jpg?w=1024",     w: 1024, h: 683, alt: "Bed frame photographed for a furniture catalogue", caption: "Fourmax Builders" },
      { src: "https://aezziphotographydotcom.wordpress.com/wp-content/uploads/2025/03/bed-2-1.jpg?w=1024",   w: 1024, h: 683, alt: "Bed frame photographed for a furniture catalogue", caption: "Fourmax Builders" },
      { src: "https://aezziphotographydotcom.wordpress.com/wp-content/uploads/2025/03/bed-3-1.jpg?w=1024",   w: 1024, h: 683, alt: "Bed frame photographed for a furniture catalogue", caption: "Fourmax Builders" },
      { src: "https://aezziphotographydotcom.wordpress.com/wp-content/uploads/2025/03/bed-4.jpg?w=1024",     w: 1024, h: 683, alt: "Bed frame photographed for a furniture catalogue", caption: "Fourmax Builders" },
      { src: "https://aezziphotographydotcom.wordpress.com/wp-content/uploads/2025/03/glass-holder.jpg?w=1024", w: 1024, h: 683, alt: "Glass holder photographed as a styled product still life", caption: "Glass holder" },
      { src: "https://aezziphotographydotcom.wordpress.com/wp-content/uploads/2025/03/sea-horse.jpg?w=683",  w: 683, h: 1024, alt: "Sea horse ornament photographed as a styled product still life", caption: "Sea horse" },
      { src: "https://aezziphotographydotcom.wordpress.com/wp-content/uploads/2025/03/chocolate-milkshake.jpg?w=819",     w: 819, h: 1024, alt: "Chocolate milkshake styled for a drinks menu", caption: "Chocolate milkshake" },
      { src: "https://aezziphotographydotcom.wordpress.com/wp-content/uploads/2025/03/oreo-milkshake.jpg?w=819",          w: 819, h: 1024, alt: "Cookies-and-cream milkshake styled for a drinks menu", caption: "Oreo milkshake" },
      { src: "https://aezziphotographydotcom.wordpress.com/wp-content/uploads/2025/03/salted-caramel-milkshake.jpg?w=819", w: 819, h: 1024, alt: "Salted caramel milkshake styled for a drinks menu", caption: "Salted caramel milkshake" },
      { src: "https://aezziphotographydotcom.wordpress.com/wp-content/uploads/2025/03/vanilla-milkshake.jpg?w=819",       w: 819, h: 1024, alt: "Vanilla milkshake styled for a drinks menu", caption: "Vanilla milkshake" },
      { src: "https://aezziphotographydotcom.wordpress.com/wp-content/uploads/2025/03/tano-bora-savannah-oasis-2.jpg?w=819", w: 819, h: 1024, alt: "Tano Bora product styled for Savannah Oasis", caption: "Tano Bora — Savannah Oasis" },
      { src: "https://aezziphotographydotcom.wordpress.com/wp-content/uploads/2025/03/tano-bora-savannah-oasis-3.jpg?w=819", w: 819, h: 1024, alt: "Tano Bora product styled for Savannah Oasis", caption: "Tano Bora — Savannah Oasis" },
      { src: "https://aezziphotographydotcom.wordpress.com/wp-content/uploads/2025/03/tano-bora-savannah-oasis-4.jpg?w=819", w: 819, h: 1024, alt: "Tano Bora product styled for Savannah Oasis", caption: "Tano Bora — Savannah Oasis" },
      { src: "https://aezziphotographydotcom.wordpress.com/wp-content/uploads/2025/03/tano-bora-savannah-oasis-5.jpg?w=819", w: 819, h: 1024, alt: "Tano Bora product styled for Savannah Oasis", caption: "Tano Bora — Savannah Oasis" }
    ]
  },
  {
    id: "travel",
    title: "Travel",
    tagline: "Safaris, coastlines and the road between",
    blurb: "Location work for tour operators and travel brands, shot the way a guest would actually experience the place.",
    images: []
  }
];

/* ---------------------------------------------------------------------------
   Services. `featured` decides which four appear on the front page.
   --------------------------------------------------------------------------- */
const SERVICES = [
  {
    id: "content",
    title: "Content Creation & Management",
    featured: true,
    blurb: "An ongoing feed for brands that need to post consistently — shot, edited, captioned and scheduled, so the account never goes quiet.",
    items: ["Monthly photo & video packages", "Reels and short-form edits", "Captioning and scheduling", "Account management & reporting"]
  },
  {
    id: "wildlife",
    title: "Wildlife Photography",
    featured: true,
    blurb: "Conservancy and reserve work built on patience — the images that started this whole practice, and the ones I care about most.",
    items: ["Conservancy & reserve shoots", "Conservation storytelling", "Fine-art wildlife prints", "Licensing for print & editorial"]
  },
  {
    id: "interiors",
    title: "Interior, Hotel & Architecture",
    featured: true,
    blurb: "Spaces photographed for the details others walk past. For hospitality groups, developers, agents and interior designers.",
    items: ["Hotel & hospitality photography", "Architecture & interiors", "Real-estate listing sets", "360° virtual property tours"]
  },
  {
    id: "weddings",
    title: "Weddings & Events",
    featured: true,
    blurb: "Unobtrusive full-day coverage in Nairobi and beyond, delivered sooner than you expect.",
    items: ["Wedding photography & video", "Engagements and pre-wedding", "Birthdays, milestones, corporate events", "Fireworks & night events"]
  },
  {
    id: "product",
    title: "Product Photography",
    featured: false,
    blurb: "Studio and on-location product work for furniture, food, drinks and packaging — shot for catalogues, menus and online storefronts.",
    items: ["E-commerce & catalogue sets", "Styled food & drink", "Golden-hour lifestyle shots", "Flat lays and detail crops"]
  },
  {
    id: "video",
    title: "Videography",
    featured: false,
    blurb: "Films and cutdowns for events, brands and campaigns — from a single hero film to a month of social edits.",
    items: ["Event films & highlight reels", "Brand and product video", "Colour grading & sound", "Delivery in every aspect ratio"]
  },
  {
    id: "motion",
    title: "Animation & VFX",
    featured: false,
    blurb: "A background in graphic design and 2D/3D animation, put to work where a photograph alone won't carry the idea.",
    items: ["2D & 3D animation", "Motion graphics & titles", "Visual effects", "Logo stings and brand assets"]
  },
  {
    id: "prints",
    title: "Fine-Art Prints",
    featured: false,
    blurb: "Wildlife photographs printed for walls — homes, offices, lodges and hotel interiors.",
    items: ["Limited wildlife prints", "Framing and sizing advice", "Office & lodge commissions", "Delivery across Kenya"]
  }
];

/* ---------------------------------------------------------------------------
   Testimonials, carried over from the previous site.
   --------------------------------------------------------------------------- */
const TESTIMONIALS = [
  {
    category: "Weddings",
    author: "Husein & Arwa",
    quote: "I was referred to Aezziphotography by someone else and took the judgement of choosing him based off of what a cousin had told me. With only a slight glance at the Instagram profile, I didn't think twice and confirmed the booking. Needless to say, don't regret it one bit. I have a collection of photos to keep that are as valuable as gold to look at, smile, and cherish. They were delivered in way less time than anticipated and the best part, not a single capture disappointed. Would refer Aezziphotography in a blink of an eye and assure that no problems will be encountered. Kudos to him. He did a great job that's for sure!"
  },
  {
    category: "Weddings",
    author: "Hamza & Zahra",
    quote: "Honestly, the way Abdulhussain was passionate about taking our photos was truly amazing — we've never had this experience before! The shots he captured are awesome, and we are really happy with them. His attention to detail and ability to capture genuine moments made all the difference. If you're looking for someone who goes above and beyond to deliver breathtaking photos, look no further than Abdulhussain!"
  },
  {
    category: "Weddings",
    author: "Hatim & Zainab",
    quote: "Abdulhussain's videography skills are brilliant but I think it's his friendly nature and spontaneity which resulted in the most beautiful videos of our wedding… to be cherished forever."
  },
  {
    category: "Weddings",
    author: "Hasan & Sakina",
    quote: "You have an eye for detail!! It was really nice having you as our photographer!! I am truly hoping that you prosper in your work and reach great heights in life!!"
  },
  {
    category: "Weddings",
    author: "Adam & Fatema",
    quote: "We just wanted to take a moment to thank you for capturing all our wedding events so beautifully. The photos are truly stunning, and we're so grateful for the way you managed to capture not just the moments, but also the emotions of the day. Your professionalism, patience, and creative eye really stood out, and we couldn't have asked for a better photographer. We'll cherish these memories forever, thanks to your work."
  },
  {
    category: "Events",
    author: "Jays Pyrotechnics Ltd",
    quote: "When it comes to fireworks, timing and capturing the right shot from the right angle is very important. At Jays Pyrotechnics, I can attest Aezziphotography is the place to go. They have captured our Sky Theatre shots ever since and will continue to do so! Keep up the great work!"
  },
  {
    category: "Events",
    author: "Zainab Moiz",
    quote: "We are delighted with the pictures Aezziphotography took of us and our newborn baby. He was friendly and very helpful throughout. I look forward to working with Aezziphotography and would definitely recommend him to others."
  },
  {
    category: "Events",
    author: "Nafisa Hamid",
    quote: "Abdulhussain was amazing! We had him for 3 hrs and he captured so much in such a short time. He arrived on time, was friendly and approachable and patiently listened to our ideas for the pictures. The pictures have turned out exactly how I'd imagined."
  },
  {
    category: "Events",
    author: "Murtaza Burhani",
    quote: "I am very impressed by Abdulhussain's photography and videography skills. His attention to detail is amazing. The video was beyond my expectations. There was no interference throughout the function from him, which adds to his skill and professionalism. I would definitely recommend him anytime. Thank you Abdulhussain."
  },
  {
    category: "Events",
    author: "Burhanuddin Fakhri",
    quote: "Absolutely delighted with the experience! I booked this talented young photographer for my baby's 3rd birthday, and I couldn't be happier with the results. He was incredibly calm and patient, even when my little one got fussy. Not once did he show frustration — instead, he kept a warm smile and was always ready to capture another beautiful moment. What truly impressed me was how quickly he delivered the final photos, so much sooner than I expected, and the quality was amazing! I highly recommend him for any event."
  },
  {
    category: "Events",
    author: "Ummehani Idris",
    quote: "Hey, loved the coverage! You captured some nice candid moments :) Thank you for that. Reach for the stars, focus on the moment, and capture the beauty that unfolds. Keep shooting, keep learning, and your lens will take you to new heights!"
  },
  {
    category: "Events",
    author: "Murtaza Walijee",
    quote: "Thank you, Abdulhussain. Much appreciated, you have taken very good photos. Thanks for being part of Ummehani's 5th Waras."
  },
  {
    category: "Product",
    author: "Fourmax Builders Ltd",
    quote: "Abdulhussain, at a young age, has a remarkable eye for capturing the essence of our work at Fourmax Builders Limited. His talent in showcasing the beauty of our furniture brought our designs to life. His professionalism and keen attention to detail made the entire experience smooth and enjoyable. Highly recommended!"
  },
  {
    category: "Product",
    author: "AJ's Nuts",
    quote: "We had a lovely experience working with Abdulhussain. The product photos were exceptional, especially the creative angles and stunning shots taken during the golden hour. The video he sent us was a fantastic addition and received a lot of positive feedback from our audience. We highly recommend his services and look forward to collaborating again for future product photography needs."
  },
  {
    category: "Product",
    author: "Flavours of Zanzibar KE",
    quote: "A brilliant photographer. Keen on details. Delivers exactly as asked. Very innovative, creative and versatile. Prompt and professional. Keep up the good work!"
  },
  {
    category: "Content Creation",
    author: "Tourwithpipi",
    quote: "Loved working with Abdulhussain — professional, friendly, reliable and delivered work as requested. Both photos and videos were great. His wildlife photography is amazing. Highly recommend."
  },
  {
    category: "Content Creation",
    author: "Midway Refreshments",
    quote: "Abdulhussain has a professional approach and has quite the talent with photography. He will take particular interest in the minor details for the best outcome. He ensures to satisfy all your requirements within the photos, as his pictures say a thousand words."
  },
  {
    category: "Referrals",
    author: "Husain Ezzi",
    quote: "I had an amazing experience with Abdulhussain during my portrait session! He made me feel comfortable and confident in front of the camera, resulting in marvelous, natural-looking photos."
  },
  {
    category: "Referrals",
    author: "Via Google Business Reviews",
    quote: "No doubt the most talented photographer I have met. Although he may seem young, Abdulhussain never fails to please and satisfy his audience with top quality work. I look forward to seeing more of him in the future. Godspeed."
  },
  {
    category: "Referrals",
    author: "Karali Pics",
    quote: "Aezzi is a very talented photographer and his work ethic is unrivalled. Privileged to have worked with him and I can vouch for him. Dope guy."
  }
];
