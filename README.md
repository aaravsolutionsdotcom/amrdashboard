# amrdashboard
AMR Dashboard angular App

Installation Steps for windows :
Install Python 2.7 and export the path
1) Remove package-lock.json
2) run npm cache clean --force 
3) npm install --save-dev @angular-devkit/build-angular
4) npm install -g @angular/cli
5) run npm install --no-optional
6) npm install typescript@~2.7.2
7) npm install node-sass
Note: Delete binding.node from C:\Users\Administrator\AppData\Roaming\npm-cache\node-sass\4.x.x, if error prompts at binding.node

Installation Steps for linux:

Install prerequisites:
1) Install Python 2.7 and export the path
2) Install nvm: curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.32.0/install.sh | bash
3) Activate nvm: . ~/.nvm/nvm.sh
4) Install node using nvm: nvm install 8.11.3
5) Install Git: sudo yum install git

Install Steps:
1) Remove rm -rf package-lock.json 
2) sudo npm cache clean --force 
3) sudo npm install --save-dev @angular-devkit/build-angular
4) npm install -g @angular/cli
5) sudo npm install --no-optional
Note: Enable hostheader
	node_modules/webpack-dev-server/lib/Server.js
	522   const hostHeader = headers.host;
	523   if (!hostHeader) return true;

6) nohup ng serve --host 172.31.16.38 --disableHostCheck true &



