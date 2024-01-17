# emojis
rsync -a --delete vendor/noto-emoji/svg/ docs/svg/noto-emoji/
rsync -a --delete vendor/twemoji/assets/svg/ docs/svg/twemoji/
rsync -a --delete vendor/blobmoji/svg/ docs/svg/blobmoji/
rsync -a --delete vendor/emojitwo/svg/ docs/svg/emojitwo/
rsync -a --delete vendor/emojitwo/svg_bw/ docs/svg/emojitwo-twotone/
deno run --allow-read --allow-write build-emoji.js
# icons
rsync -a --delete vendor/material-symbols/svg/400/outlined/ docs/svg/material-symbols/
rsync -a --delete vendor/material-design-icons/svg/filled/ docs/svg/material-design-icons/filled/
rsync -a --delete vendor/material-design-icons/svg/outlined/ docs/svg/material-design-icons/outlined/
rsync -a --delete vendor/bootstrap-icons/icons/ docs/svg/bootstrap-icons/
rsync -a --delete vendor/RemixIcon/icons/ docs/svg/RemixIcon/
rsync -a --delete vendor/phosphor-icons/assets/regular/ docs/svg/phosphor-icons/regular/
rsync -a --delete vendor/phosphor-icons/assets/fill/ docs/svg/phosphor-icons/fill/
rsync -a --delete vendor/tabler-icons/icons/ docs/svg/tabler-icons/
rsync -a --delete vendor/Solar-icon-set/icons/SVG/Linear/ docs/svg/Solar-icon-set/
rsync -a --delete vendor/iconoir/icons/ docs/svg/iconoir/
rsync -a --delete vendor/majesticons/line/ docs/svg/majesticons/line/
rsync -a --delete vendor/majesticons/solid/ docs/svg/majesticons/solid/
rsync -a --delete-excluded --exclude="*.json" vendor/lucide/icons/ docs/svg/lucide/
