echo "Switching to branch linode"
git checkout linode

echo "Building app..."
yarn run build

echo "Deploying files to server..."
scp -r build/* arun@192.46.214.84:/var/www/192.46.214.84

echo "Done!"