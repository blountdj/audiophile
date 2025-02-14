// export function textSplit(elem) {
//     return new SplitType(elem, { types: "words, chars" })
// }

export function removeScriptsFromBody(scripts) {
  scripts.forEach(script => {
    const bodyScripts = document.body.getElementsByTagName('script');
    for (let i = bodyScripts.length - 1; i >= 0; i--) {
      if (bodyScripts[i].src && bodyScripts[i].src.includes(script)) {
        bodyScripts[i].parentNode.removeChild(bodyScripts[i]);
      }
    }
  })
}

export function addScriptsToBody(scripts) {
  scripts.forEach(script => {
    const scriptElem = document.createElement('script');
    scriptElem.src = script;
    scriptElem.type = 'module';
    document.body.appendChild(scriptElem);
  })
}

export function addFilesCssToBody(cssFiles) {
  cssFiles.forEach(cssFile => {
    const linkTag = document.createElement('link');
    linkTag.rel = 'stylesheet';
    linkTag.href = cssFile;
    document.body.appendChild(linkTag);
  })
}

export function removeCssFilesFromBody(cssFiles) {
  cssFiles.forEach(cssFile => {
    const bodyLinks = document.body.getElementsByTagName('link');
    for (let i = bodyLinks.length - 1; i >= 0; i--) {
      if (bodyLinks[i].href && bodyLinks[i].href.includes(cssFile)) {
        bodyLinks[i].parentNode.removeChild(bodyLinks[i]);
      }
    }
  });
}


// export function addScriptsToBodyNotModule(scripts) {
//   scripts.forEach(script => {
//     const scriptElem = document.createElement('script');
//     scriptElem.src = script;
//     // scriptElem.type = 'module';
//     document.body.appendChild(scriptElem);
//   })
// }

export function createCSSFileLink(file) {
  const cssFileUrl = file;
  const linkTag = document.createElement('link');
  linkTag.rel = 'stylesheet';
  linkTag.href = cssFileUrl;
  return linkTag
}



export function applyAnimationClass(element, animationName) {
  element.classList.add(animationName);

  // Remove the class after the animation ends to allow for re-triggering
  element.addEventListener('animationend', function () {
    element.classList.remove(animationName);
  }, { once: true });
}

export function getCartItems() {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  return cart;
}

export const exampleImagesUrls = [
  "https://assets.lummi.ai/assets/QmQTpXmZP7n5QBAppvijbbm4LL69nR3rRKQTkjXNa4UPYZ?auto=format&w=1500",
  "https://assets.lummi.ai/assets/QmSJJ1RaYRdQiLc4ookd9mZFBvA89s7sBoJgKFrtZUYZfZ?auto=format&w=1500",
  "https://assets.lummi.ai/assets/QmNLp8R9b71HLTLBJkGssbJWCqo4LWZ3vkqpLsjZgxW7R7?auto=format&w=1500",
  "https://assets.lummi.ai/assets/QmTv9Cv5ZTrFGGtBYByfMME9feFqAbHo2ZQH5BdETGPq9A?auto=format&w=1500",
  "https://assets.lummi.ai/assets/QmNaeHZVH4xCEKVW39YN2Uzgs437iYSWiN9Bjf5hEQwgd2?auto=format&w=1500",
  "https://assets.lummi.ai/assets/QmT6DGxzW2WvPe6ecuKX5WDtwttXocJ8e1dxv5qndT6ak7?auto=format&w=1500"
];

export const headphonesImagesUrls = [
  "https://cdn.prod.website-files.com/668513a42a5375354f72cff0/6685158f6f88836baa887ab7_image-product.webp",
  "https://cdn.prod.website-files.com/668513a42a5375354f72cff0/6685157414c88707f3380e12_image-gallery-3.webp",
  "https://cdn.prod.website-files.com/668513a42a5375354f72cff0/6685153e0eac814a09e2545e_image-gallery-3.webp",
  "https://cdn.prod.website-files.com/668513a42a5375354f72cff0/66851511ce562bb1300b2181_image-product.webp",
  "https://cdn.prod.website-files.com/668513a42a5375354f72cff0/668514ea5a9ed8fbff626346_image-gallery-3.webp",
  "https://cdn.prod.website-files.com/668513a42a5375354f72cff0/668514d370d95079ea05e1ab_image-gallery-1.webp"
]

export const earphonesImagesUrls = [
  "https://cdn.prod.website-files.com/668513a42a5375354f72cff0/668515d8e5fda663bda61c5a_image-product.webp",
  "https://cdn.prod.website-files.com/668513a42a5375354f72cff0/668515ec8cac803568e2cc42_image-gallery-3.webp",
  "https://cdn.prod.website-files.com/668513a42a5375354f72cff0/6686938f7ca7bb0b59b7e34f_image-gallery-1.webp",
  "https://cdn.prod.website-files.com/668513a42a5375354f72cff0/668515ec8cac803568e2cc42_image-gallery-3.webp",
  "https://cdn.prod.website-files.com/668513a42a5375354f72cff0/6686938f7ca7bb0b59b7e34f_image-gallery-1.webp",
  "https://cdn.prod.website-files.com/668513a42a5375354f72cff0/6685142bf2eff78b4fe00fd8_image-earphones-yx1.webp",
]

export const speakersImagesUrls = [
  "https://cdn.prod.website-files.com/668513a42a5375354f72cff0/6685b574d7aca2296742b9a8_image-speaker-zx9.webp",
  "https://cdn.prod.website-files.com/668513a42a5375354f72cff0/6685164e87761e4ce89a1f28_image-gallery-3.webp",
  "https://cdn.prod.website-files.com/668513a42a5375354f72cff0/6685164e2492ff79aa388873_image-gallery-1.webp",
  "https://cdn.prod.website-files.com/668513a42a5375354f72cff0/6685164ec490eff43eb791ad_image-product.webp",
  "https://cdn.prod.website-files.com/668513a42a5375354f72cff0/668516a8add4786765765949_image-product.webp",
  "https://cdn.prod.website-files.com/668513a42a5375354f72cff0/668516a887761e4ce89a54b9_image-gallery-3.webp",
]

export const homeImagesUrls = [
  "https://cdn.prod.website-files.com/668513a42a5375354f72cff0/6685170f51d70afae77c65d6_image-xx99-mark-one-headphones.webp",
  "https://cdn.prod.website-files.com/668513a42a5375354f72cff0/6685170fdc4e39c5d2f199d6_image-xx99-mark-two-headphones.webp",
  "https://cdn.prod.website-files.com/668513a42a5375354f72cff0/6685170fec6db407d8fa8fc5_image-xx59-headphones.webp",
  "https://cdn.prod.website-files.com/668513a42a5375354f72cff0/6685170f3de22134739f3550_image-zx9-speaker.jpg",
  "https://cdn.prod.website-files.com/668513a42a5375354f72cff0/6685170f9fdbb3639bbfae6f_image-zx7-speaker.webp",
  "https://cdn.prod.website-files.com/668513a42a5375354f72cff0/668515d80c6cad858d9876b4_image-category-page-preview.webp",
]

export const checkoutImagesUrls = [
  "https://cdn.prod.website-files.com/668513a42a5375354f72cff0/6685153e0eac814a09e2545e_image-gallery-3.webp",
  "https://cdn.prod.website-files.com/668513a42a5375354f72cff0/6685157414c88707f3380e12_image-gallery-3.webp",
  "https://cdn.prod.website-files.com/668513a42a5375354f72cff0/668514d370d95079ea05e1ab_image-gallery-1.webp",
  "https://cdn.prod.website-files.com/668513a42a5375354f72cff0/668514bbddd019b6098296f7_image-gallery-3.webp",
  "https://cdn.prod.website-files.com/668513a42a5375354f72cff0/668516bcfca75909ddf5922c_image-gallery-1.webp",
  "https://cdn.prod.website-files.com/668513a42a5375354f72cff0/668517346225e9a7f7b26f5c_image-best-gear.webp",
]