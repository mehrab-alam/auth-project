FROM ubuntu:22.04
ARG TOKEN
ARG USERNAME
ENV GITHUB_TOKEN ${TOKEN}
ENV  GITHUB_USERNAME ${USERNAME}
ENV GITHUB_PROJECT_URL https://${GITHUB_USERNAME}:${GITHUB_TOKEN}@github.com/mehrab-alam/auth-project.git
RUN mkdir -p /app
WORKDIR /app
COPY . .
RUN apt-get update
RUN apt-get install curl -y
RUN curl -s https// deb.nodesource.com/setup_18.x | bash
RUN apt-get install -y nodejs 
RUN apt-get install git -y
RUN git clone $GITHUB_PROJECT_URL 
RUN cd auth-project
RUN npm install -g npm@9.6.7
RUN npm install
RUN npm install next-auth
RUN npm install @prisma/client @auth/prisma-adapter 
RUN npm install prisma --save-dev
RUN npx prisma migrate dev
EXPOSE 3000
CMD [ "npm","run","dev"]

