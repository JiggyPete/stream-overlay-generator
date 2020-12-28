echo "Clearing temp-generated-stream-overlay"
rm -rf ../temp-generated-stream-overlay
mkdir ../temp-generated-stream-overlay

ruby generate-site.rb ENV=production

echo "Moving production code to temp-generated-stream-overlay"
cp -a generated/. ../temp-generated-stream-overlay

git checkout .

echo "checking out static-site"
git checkout static-site

echo "Deleting everything in static-site branch"
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

echo "copying back from temp-generated-stream-overlay"
cp -a ../temp-generated-stream-overlay/. .

git add .
git commit -m 'New updates'
git push origin static-site

echo "checking out main"
git checkout main
