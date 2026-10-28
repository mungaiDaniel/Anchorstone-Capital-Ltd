export interface SiteImage {
  slot: string;
  src: string;
  alt: string;
  width: number;
  height: number;
  blurDataURL: string;
  credit: { name: string; url: string; source: string; pageUrl: string; licence: string };
}

/** Stock photography (Nappy). People shown are models, never Anchorstone staff, clients or success stories. */
export const images: Record<string, SiteImage> = {
  "home-hero": {
    slot: "home-hero",
    src: "/images/home-hero.webp",
    alt: "Woman in a cream sweater using a phone at a desk in a bright office",
    width: 2400,
    height: 1350,
    blurDataURL: "data:image/webp;base64,UklGRmYAAABXRUJQVlA4IFoAAADwAQCdASoQAAkAA4BaJbACdADv9Lo1gaAAog+D1mO9xy3+nGTiX8WZ6vMF/YlYAnUF2SKGVaVbZORhD3NUvstQyzdngn3KAxqGiHy/YLymghLlFzY6PFgapAA=",
    credit: { name: "Aspen", url: "https://nappy.co/user/Aspen", source: "Nappy", pageUrl: "https://nappy.co/photo/focused-female-professional-at-the-office+yJocZYawPj0UjsLWedjAF", licence: "Nappy License (free commercial use)" },
  },
  "logbook": {
    slot: "logbook",
    src: "/images/logbook.webp",
    alt: "Man driving a car, seen through the open driver’s window",
    width: 1200,
    height: 900,
    blurDataURL: "data:image/webp;base64,UklGRoYAAABXRUJQVlA4IHoAAABQAgCdASoQAAwAA4BaJagCdAYv1gd+7nS+TAAA/tot3Jqze6Jdn12eb1K+3DGecB97MKsvPsfdwPS16vJ4vHvqwWNyi8OWlc8XUPvKERp+XHp56uGUFtU6qO8mrR68eihs9ffgSfDuMkr7V1bcKePIRBoVixIXOAAAAA==",
    credit: { name: "Nappy contributor (7a93e9f2)", url: "https://nappy.co/user/7a93e9f2", source: "Nappy", pageUrl: "https://nappy.co/photo/man-driving-car+iDfw030Q5-IRDLBT0FxWl", licence: "Nappy License (free commercial use)" },
  },
  "personal-secured": {
    slot: "personal-secured",
    src: "/images/personal-secured.webp",
    alt: "Woman working on a laptop on a sofa at home",
    width: 1200,
    height: 900,
    blurDataURL: "data:image/webp;base64,UklGRmYAAABXRUJQVlA4IFoAAADQAQCdASoQAAwAA4BaJZwAAt+3tD8yAAD+8dGtc4p3IIE7tY3h3bSe2vCx7XHeNUcLuy7qsLkphv/EX/x2mHzMUm5QKLprDALXD39ofXrys3wKn2HFKcsIAAA=",
    credit: { name: "Aspen", url: "https://nappy.co/user/Aspen", source: "Nappy", pageUrl: "https://nappy.co/photo/woman-working-from-home-with-laptop+6XoZMrOQU-IWrrvEoluoR", licence: "Nappy License (free commercial use)" },
  },
  "study-abroad": {
    slot: "study-abroad",
    src: "/images/study-abroad.webp",
    alt: "Student with glasses studying on a laptop at home",
    width: 1200,
    height: 900,
    blurDataURL: "data:image/webp;base64,UklGRmoAAABXRUJQVlA4IF4AAAAwAgCdASoQAAwAA4BaJZQCw7YwxOWYy1nFwAD+CHnvacuH2NgXphFxGBbZbA/Sk9I8ox4Vzaguh0EMZlgbS3vsAxeok/QSiHZ4e3E/LxDi1Ia401O7XYNjRsL7XAAA",
    credit: { name: "Aspen", url: "https://nappy.co/user/Aspen", source: "Nappy", pageUrl: "https://nappy.co/photo/academic-work-student-on-laptop+U0D2-a14GQ1JKLoZzOSFQ", licence: "Nappy License (free commercial use)" },
  },
  "sme": {
    slot: "sme",
    src: "/images/sme.webp",
    alt: "Shop owner sitting in his stall surrounded by beads and crafts",
    width: 1200,
    height: 900,
    blurDataURL: "data:image/webp;base64,UklGRmgAAABXRUJQVlA4IFwAAADQAQCdASoQAAwAA4BaJYwAAlxdZr6ygADif9zgHbur9+urrSMi8IBlpzMjYfTNtOqyIkScOpA6AK5UBI3metpxd84HZPNgnds9x8vPNHMYic/Xf7S4Pf4TeAwAAA==",
    credit: { name: "exploringphotography", url: "https://nappy.co/user/exploringphotography", source: "Nappy", pageUrl: "https://nappy.co/photo/nigeria-art-market+cJL-fzDZv8UGiysGCovHb", licence: "Nappy License (free commercial use)" },
  },
  "insurance": {
    slot: "insurance",
    src: "/images/insurance.webp",
    alt: "Father feeding his baby a bottle in a bright kitchen",
    width: 1200,
    height: 900,
    blurDataURL: "data:image/webp;base64,UklGRngAAABXRUJQVlA4IGwAAAAQAgCdASoQAAwAA4BaJYwCdAEOOoL1dKoAAOHyj/5c5c2MYOHd+iilHmpl4zXl1IjO/3l7RGzFq92fiPO5avnkjlKH0OfxvZ1349sHQ4/24W269+o7YCbE9h6nGmJqAWJi3XRbLyh+XECAAAA=",
    credit: { name: "Yemster", url: "https://nappy.co/user/Yemster", source: "Nappy", pageUrl: "https://nappy.co/photo/father-and-son+vgYqIE8kPXhxSRPD20rM3", licence: "Nappy License (free commercial use)" },
  },
  "about-story": {
    slot: "about-story",
    src: "/images/about-story.webp",
    alt: "Colleagues in conversation around a meeting-room table",
    width: 1200,
    height: 900,
    blurDataURL: "data:image/webp;base64,UklGRnwAAABXRUJQVlA4IHAAAABwAgCdASoQAAwAA4BaJQBOgMW+7MR4ECtWtcgAAP7SJ00Cgib795mk8+mQT5caaYvROG9cl69YQqSWz+qnptlv1Tt8fVSHyKWWanVgUMTa9noOlGJp5jCOW3I1QKob/r5v5+zmJChs959qWCIQAAAA",
    credit: { name: "WOCInTech", url: "https://nappy.co/user/WOCInTech", source: "Nappy", pageUrl: "https://nappy.co/photo/team-meeting-in-a-conference-room+zyyU5YnUy2AOWYKTbnN1k", licence: "Nappy License (free commercial use)" },
  },
  "about-values": {
    slot: "about-values",
    src: "/images/about-values.webp",
    alt: "Team seated at a long table in a glass-walled meeting room",
    width: 1200,
    height: 900,
    blurDataURL: "data:image/webp;base64,UklGRlwAAABXRUJQVlA4IFAAAACwAQCdASoQAAwAA4BaJaQAAv4aY6AAAP71NFrPQOLogcKAXts9+NzKdNmxg/28BQ0UJdqKzk5NTUKumc3fzxfqv+WKo+veXS/bKwS0O+4AAA==",
    credit: { name: "WOCInTech", url: "https://nappy.co/user/WOCInTech", source: "Nappy", pageUrl: "https://nappy.co/photo/conference-room-with-professionals+o1kuXbznzhMeC7s_S6KT0", licence: "Nappy License (free commercial use)" },
  },
  "how-it-works": {
    slot: "how-it-works",
    src: "/images/how-it-works.webp",
    alt: "Hand holding a smartphone",
    width: 1200,
    height: 900,
    blurDataURL: "data:image/webp;base64,UklGRmQAAABXRUJQVlA4IFgAAADwAQCdASoQAAwAA4BaJYwC7AC1RYeraNAA/HDe29a/v8h21Ijs9oNwckb/2hUzWguiAfPoRksC4AAB6g4hchKX4TLkLQHXJbRjxPDGeX2DoFOoR/+DcAAA",
    credit: { name: "MetaLab", url: "https://nappy.co/user/MetaLab", source: "Nappy", pageUrl: "https://nappy.co/photo/woman-holding-a-phone+hr4C8bqbdm1kl2TFaM1G8", licence: "Nappy License (free commercial use)" },
  },
  "careers-hero": {
    slot: "careers-hero",
    src: "/images/careers-hero.webp",
    alt: "Two colleagues laughing together at a table with a laptop",
    width: 2400,
    height: 1350,
    blurDataURL: "data:image/webp;base64,UklGRmgAAABXRUJQVlA4IFwAAADwAQCdASoQAAkAA4BaJbACdADNAR0LWsAA/vYRbfLUdolNMt6hu4stc1XgqPbS1du4oMOUASObumMk9+eLD+b76gRcRBMKEbaOHCSDLkiBtYyFJvFACKBWU4AAAA==",
    credit: { name: "WOCInTech", url: "https://nappy.co/user/WOCInTech", source: "Nappy", pageUrl: "https://nappy.co/photo/team-conference-talk+SXAeGOpVamBigwxvuajXh", licence: "Nappy License (free commercial use)" },
  },
  "careers-culture-2": {
    slot: "careers-culture-2",
    src: "/images/careers-culture-2.webp",
    alt: "Woman writing on a whiteboard while holding a tablet",
    width: 1000,
    height: 1250,
    blurDataURL: "data:image/webp;base64,UklGRm4AAABXRUJQVlA4IGIAAADwAwCdASoQABQAPu1kq04ppaQiMAgBMB2JZQCsAB6WfV/HrBvLdXoAAP4CTXHZgw1ePxAkd6eIL/CX85ItGPoldSPSXMRjXBeGW4ARenXk2LZrpmiEmRamaVih+GUBYwEgAA==",
    credit: { name: "Aspen", url: "https://nappy.co/user/Aspen", source: "Nappy", pageUrl: "https://nappy.co/photo/woman-using-tablet-at-whiteboard+vrafO9pecnUtXmTx6YuOS", licence: "Nappy License (free commercial use)" },
  },
  "partners": {
    slot: "partners",
    src: "/images/partners.webp",
    alt: "Two professionals talking across a table in a sunlit office",
    width: 2400,
    height: 1350,
    blurDataURL: "data:image/webp;base64,UklGRmQAAABXRUJQVlA4IFgAAAAQAgCdASoQAAkAA4BaJQBOgMWlyqjIcKsAAP7yhBjmwJF7FeJQxQwcEGvY1xbVxgGka0Uv/zNt6CMhAq/WggyEqwNqUDqUmdWCMBOTOsFI4k2atq5CNgAA",
    credit: { name: "liwordson", url: "https://nappy.co/user/liwordson", source: "Nappy", pageUrl: "https://nappy.co/photo/office-meeting+cTFuZftUIIZfy91UU-I-U", licence: "Nappy License (free commercial use)" },
  },
  "media": {
    slot: "media",
    src: "/images/media.webp",
    alt: "Person reading a business newspaper at a desk",
    width: 2400,
    height: 1350,
    blurDataURL: "data:image/webp;base64,UklGRlgAAABXRUJQVlA4IEwAAADwAQCdASoQAAkAA4BaJQBadCLMGDY1cwAA/s0bA1ROchjYhx3eg7SdEgvycwSTlpbVgTnIadUrDFmtnDYhULyVooYTHgjWO0eg4AAA",
    credit: { name: "olueletu", url: "https://nappy.co/user/olueletu", source: "Nappy", pageUrl: "https://nappy.co/photo/man-reading-newspaper+WD7BtUdBP7G20XU-WMTbZ", licence: "Nappy License (free commercial use)" },
  },
};

export const getImage = (slot: string): SiteImage | undefined => images[slot];

const productSlots: Record<string, string> = {
  "logbook-loan": "logbook",
  "personal-secured-loan": "personal-secured",
  "study-abroad-loan": "study-abroad",
  "sme-loan": "sme",
  insurance: "insurance",
};
export const getProductImage = (slug: string): SiteImage | undefined => images[productSlots[slug]];
