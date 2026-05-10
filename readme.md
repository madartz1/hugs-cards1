# HUGS Shop Site — Fixed Send A Hug Page

This fixes the clean URL error for:

https://hugs-shop-site.netlify.app/pages/send-a-hug

## What changed

- Added `/pages/send-a-hug/index.html`
- Kept `/pages/send-a-hug.html` as a fallback
- Added `_redirects` for Netlify clean routing
- Changed all card image paths to absolute `/assets/cards/...`
- Included matched HUGS bear images for all card placeholders

## Upload

Upload the full contents of this zip to your repo root:

/index.html
/_redirects
/pages/send-a-hug/index.html
/pages/send-a-hug.html
/pages/gallery.html
/pages/faq.html
/assets/cards/

## Stripe

Replace every instance of:

YOUR_STRIPE_PAYMENT_LINK_HERE

with your real Stripe Payment Link.
