/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at https://mozilla.org/MPL/2.0/. */

export const images: NewTab.BraveBackground[] = [{
  'type': 'brave',
  'wallpaperImageUrl': 'ekrem-osmanoglu-2R0gbZXaUqM-unsplash.webp',
  'author': 'Resulmuslu',
  'link': 'https://depositphotos.com/photo/istanbul-turkey-beautiful-istanbul-sunrise-landscape-ortakoy-istanbul-bosphorus-bridge-448562958.html',
  'originalUrl': 'Contributor sent the hi-res version through email',
  'license': 'used with permission'
  },
  {
    'type': 'brave',
    'wallpaperImageUrl': 'ayse-bek-YLdYVzHopto-unsplash.webp',
    'author': 'kanuman',
    'link': 'https://depositphotos.com/photo/beautiful-architecture-of-jerusalem-100199214.html',
    'originalUrl': 'Contributor sent the hi-res version through email',
    'license': 'used with permission'
  },
  {
    'type': 'brave',
    'wallpaperImageUrl': 'fahrul-azmi-gyKmF0vnfBs-unsplash.webp',
    'author': 'EyeEm',
    'link': 'https://www.freepik.com/premium-photo/illuminated-mosque-by-sea-dusk_126169533.htm#fromView=author&page=17&position=26&uuid=be227329-bf1d-4662-89f8-01a51a35c254&query=Al+Hussain+Mosque',
    'originalUrl': 'Contributor sent the hi-res version through email',
    'license': 'used with permission'
  },
  {
    'type': 'brave',
    'wallpaperImageUrl': 'fatih-yurur-kNSREmtaGOE-unsplash.webp',
    'author': 'Alenthien',
    'link': 'https://depositphotos.com/photo/kota-kinabalu-floating-mosque-dramatics-clouds-sunset-beautiful-sunset-kota-213862416.html',
    'originalUrl': 'Contributor sent the hi-res version through email',
    'license': 'used with permission'
  },

  {
    'type': 'brave',
    'wallpaperImageUrl': 'abdurahman-iseini-DNwQ35LdxXQ-unsplash.webp',
    'author': 'anujakjaimook',
    'link': 'https://depositphotos.com/photo/sultan-omar-ali-saifuddien-mosque-in-brunei-72569583.html',
    'originalUrl': 'Contributor sent the hi-res version through email',
    'license': 'used with permission'
  },

  {
    'type': 'brave',
    'wallpaperImageUrl': 'Sultan-Qaboos.webp',
    'author': 'emilymwilson@comcast.net',
    'link': 'https://depositphotos.com/photo/middle-east-arabian-peninsula-oman-muscat-sunset-view-sultan-qaboos-442500928.html',
    'originalUrl': 'Contributor sent the hi-res version through email',
    'license': 'used with permission'
  },

  {
    'type': 'brave',
    'wallpaperImageUrl': 'Mosque-interior.webp',
    'author': 'Garry Killian',
    'link': 'https://www.freepik.com/free-photo/moon-light-shine-through-window-into-islamic-mosque-interior_15347313.htm',
    'originalUrl': 'Contributor sent the hi-res version through email',
    'license': 'used with permission'
  },

  {
    'type': 'brave',
    'wallpaperImageUrl': 'Melaka-Malacca.webp',
    'author': 'fiz_zero',
    'link': 'https://www.shutterstock.com/image-photo/sunset-long-exposure-sky-strait-mosque-251354668',
    'originalUrl': 'Contributor sent the hi-res version through email',
    'license': 'used with permission'
  }
]
// If you change the size of this array (e.g. adding a new background, adding a new property),
// then you must also update `script/generate_licenses.py`

export const updateImages = (newImages: NewTab.BraveBackground[]) => {
  if (!newImages.length) {
    return
    // This can happen when the component for NTP is not downloaded yet on
    // a fresh profile.
  }

  images.splice(0, images.length, ...newImages)
}

export const defaultSolidBackgroundColor = '#151E9A'

export const solidColorsForBackground: NewTab.ColorBackground[] = [
  '#5B5C63', '#000000', '#151E9A', '#2197F9', '#1FC3DC', '#086582', '#67D4B4', '#077D5A',
  '#3C790B', '#AFCE57', '#F0CB44', '#F28A29', '#FC798F', '#C1226E', '#FAB5EE', '#C0C4FF',
  '#9677EE', '#5433B0', '#4A000C'
].map((color): NewTab.ColorBackground => ({ 'type': 'color', 'wallpaperColor': color }))

export const defaultGradientColor = 'linear-gradient(125.83deg, #392DD1 0%, #A91B78 99.09%)'

export const gradientColorsForBackground: NewTab.ColorBackground[] = [
  'linear-gradient(125.83deg, #392DD1 0%, #A91B78 99.09%)',
  'linear-gradient(125.83deg, #392DD1 0%, #22B8CF 99.09%)',
  'linear-gradient(90deg, #4F30AB 0.64%, #845EF7 99.36%)',
  'linear-gradient(126.47deg, #A43CE4 16.99%, #A72B6D 86.15%)',
  'radial-gradient(69.45% 69.45% at 89.46% 81.73%, #641E0C 0%, #500F39 43.54%, #060141 100%)',
  'radial-gradient(80% 80% at 101.61% 76.99%, #2D0264 0%, #030023 100%)',
  'linear-gradient(128.12deg, #43D4D4 6.66%, #1596A9 83.35%)',
  'linear-gradient(323.02deg, #DD7131 18.65%, #FBD460 82.73%)',
  'linear-gradient(128.12deg, #4F86E2 6.66%, #694CD9 83.35%)',
  'linear-gradient(127.39deg, #851B6A 6.04%, #C83553 86.97%)',
  'linear-gradient(130.39deg, #FE6F4C 9.83%, #C53646 85.25%)'
].map((color): NewTab.ColorBackground => ({ 'type': 'color', 'wallpaperColor': color }));
