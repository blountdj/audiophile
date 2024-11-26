export function removeScriptsFromBody(e) { e.forEach((e => { const a = document.body.getElementsByTagName("script"); for (let t = a.length - 1; t >= 0; t--)a[t].src && a[t].src.includes(e) && a[t].parentNode.removeChild(a[t]) })) } export function addScriptsToBody(e) { e.forEach((e => { const a = document.createElement("script"); a.src = e, a.type = "module", document.body.appendChild(a) })) } export function addFilesCssToBody(e) { e.forEach((e => { const a = document.createElement("link"); a.rel = "stylesheet", a.href = e, document.body.appendChild(a) })) } export function removeCssFilesFromBody(e) { e.forEach((e => { const a = document.body.getElementsByTagName("link"); for (let t = a.length - 1; t >= 0; t--)a[t].href && a[t].href.includes(e) && a[t].parentNode.removeChild(a[t]) })) } export function createCSSFileLink(e) { const a = e, t = document.createElement("link"); return t.rel = "stylesheet", t.href = a, t } export function applyAnimationClass(e, a) { e.classList.add(a), e.addEventListener("animationend", (function () { e.classList.remove(a) }), { once: !0 }) } export function getCartItems() { return JSON.parse(localStorage.getItem("cart")) || [] } export const exampleImagesUrls = ["https://assets.lummi.ai/assets/QmQTpXmZP7n5QBAppvijbbm4LL69nR3rRKQTkjXNa4UPYZ?auto=format&w=1500", "https://assets.lummi.ai/assets/QmSJJ1RaYRdQiLc4ookd9mZFBvA89s7sBoJgKFrtZUYZfZ?auto=format&w=1500", "https://assets.lummi.ai/assets/QmNLp8R9b71HLTLBJkGssbJWCqo4LWZ3vkqpLsjZgxW7R7?auto=format&w=1500", "https://assets.lummi.ai/assets/QmTv7Cv5ZTrFGGtBYByfMME9feFqAbHo2ZQH5BdETGPq9A?auto=format&w=1500", "https://assets.lummi.ai/assets/QmNaeHZVH4xCEKVW39YN2Uzgs437iYSWiN9Bjf5hEQwgd2?auto=format&w=1500", "https://assets.lummi.ai/assets/QmT6DGxzW2WvPe6ecuKX5WDtwttXocJ8e1dxv5qndT6ak7?auto=format&w=1500"]; export const headphonesImagesUrls = ["https://cdn.prod.website-files.com/668513a42a5375354f72cff0/6685158f6f88836baa887ab7_image-product.webp", "https://cdn.prod.website-files.com/668513a42a5375354f72cff0/6685157414c88707f3380e12_image-gallery-3.webp", "https://cdn.prod.website-files.com/668513a42a5375354f72cff0/6685153e0eac814a09e2545e_image-gallery-3.webp", "https://cdn.prod.website-files.com/668513a42a5375354f72cff0/66851511ce562bb1300b2181_image-product.webp", "https://cdn.prod.website-files.com/668513a42a5375354f72cff0/668514ea5a9ed8fbff626346_image-gallery-3.webp", "https://cdn.prod.website-files.com/668513a42a5375354f72cff0/668514d370d95079ea05e1ab_image-gallery-1.webp"]; export const earphonesImagesUrls = ["https://cdn.prod.website-files.com/668513a42a5375354f72cff0/668515d8e5fda663bda61c5a_image-product.webp", "https://cdn.prod.website-files.com/668513a42a5375354f72cff0/668515ec8cac803568e2cc42_image-gallery-3.webp", "https://cdn.prod.website-files.com/668513a42a5375354f72cff0/6686938f7ca7bb0b59b7e34f_image-gallery-1.webp", "https://cdn.prod.website-files.com/668513a42a5375354f72cff0/668515ec8cac803568e2cc42_image-gallery-3.webp", "https://cdn.prod.website-files.com/668513a42a5375354f72cff0/6686938f7ca7bb0b59b7e34f_image-gallery-1.webp", "https://cdn.prod.website-files.com/668513a42a5375354f72cff0/6685142bf2eff78b4fe00fd8_image-earphones-yx1.webp"]; export const speakersImagesUrls = ["https://cdn.prod.website-files.com/668513a42a5375354f72cff0/6685b574d7aca2296742b9a8_image-speaker-zx9.webp", "https://cdn.prod.website-files.com/668513a42a5375354f72cff0/6685164e87761e4ce89a1f28_image-gallery-3.webp", "https://cdn.prod.website-files.com/668513a42a5375354f72cff0/6685164e2492ff79aa388873_image-gallery-1.webp", "https://cdn.prod.website-files.com/668513a42a5375354f72cff0/6685164ec490eff43eb791ad_image-product.webp", "https://cdn.prod.website-files.com/668513a42a5375354f72cff0/668516a8add4786765765949_image-product.webp", "https://cdn.prod.website-files.com/668513a42a5375354f72cff0/668516a887761e4ce89a54b9_image-gallery-3.webp"]; export const homeImagesUrls = ["https://cdn.prod.website-files.com/668513a42a5375354f72cff0/6685170f51d70afae77c65d6_image-xx99-mark-one-headphones.webp", "https://cdn.prod.website-files.com/668513a42a5375354f72cff0/6685170fdc4e39c5d2f199d6_image-xx99-mark-two-headphones.webp", "https://cdn.prod.website-files.com/668513a42a5375354f72cff0/6685170fec6db407d8fa8fc5_image-xx59-headphones.webp", "https://cdn.prod.website-files.com/668513a42a5375354f72cff0/6685170f3de22134739f3550_image-zx9-speaker.jpg", "https://cdn.prod.website-files.com/668513a42a5375354f72cff0/6685170f9fdbb3639bbfae6f_image-zx7-speaker.webp", "https://cdn.prod.website-files.com/668513a42a5375354f72cff0/668515d80c6cad858d9876b4_image-category-page-preview.webp"]; export const checkoutImagesUrls = ["https://cdn.prod.website-files.com/668513a42a5375354f72cff0/6685153e0eac814a09e2545e_image-gallery-3.webp", "https://cdn.prod.website-files.com/668513a42a5375354f72cff0/6685157414c88707f3380e12_image-gallery-3.webp", "https://cdn.prod.website-files.com/668513a42a5375354f72cff0/668514d370d95079ea05e1ab_image-gallery-1.webp", "https://cdn.prod.website-files.com/668513a42a5375354f72cff0/668514bbddd019b6098296f7_image-gallery-3.webp", "https://cdn.prod.website-files.com/668513a42a5375354f72cff0/668516bcfca75909ddf5922c_image-gallery-1.webp", "https://cdn.prod.website-files.com/668513a42a5375354f72cff0/668517346225e9a7f7b26f5c_image-best-gear.webp"];