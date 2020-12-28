ruby generate-site.rb ENV=production

rm -rf ../temp-generated-stream-overlay
mkdir ../temp-generated-stream-overlay

cp -a generated/. ../temp-generated-stream-overlay
git checkout static-site

rm *.*
rm Gemfile
rm -rf generated
rm -rf images
rm -rf javascript
rm -rf single-speaker
rm -rf templates
rm -rf side-by-side-overlay/
rm -rf single-speaker-overlay/
rm -rf slides-overlay/
rm -rf speaker-with-slides-overlay/
rm -rf two-speakers-overlay/

cp -a ../temp-generated-stream-overlay/. .
git add .
git commit -m 'New updates'
git push origin static-site

git checkout main
