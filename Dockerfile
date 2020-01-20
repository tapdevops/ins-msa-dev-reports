FROM oraclelinux:7-slim

# Install Required Plugin
RUN yum update -y && \
	yum install -y oracle-release-el7 && \
	yum install -y oracle-nodejs-release-el7 && \
	yum install -y nodejs && \
	yum install -y oracle-instantclient19.3-basic.x86_64 && \
	yum clean all && \
	node --version && \
	npm --version && \
	npm install oracledb && \
	echo Installed

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package.json /usr/src/app

RUN npm install
# If you are building your code for production
# RUN npm install --only=production

# Bundle app source
COPY . /usr/src/app

EXPOSE 4013
CMD [ "npm", "start" ]
