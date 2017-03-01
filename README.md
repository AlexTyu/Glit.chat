
# glit.chat

Cryptographic/Big-brother/Glitch-style user-admin chat, built as part of the real-life quest organized for our friend as a birthday gift. 

![alt tag](https://s3-us-west-2.amazonaws.com/s.cdpn.io/298209/IMG_1064.jpeg)

## Admin Features
• Admin has full controll over Chat UI, ALL changes are broadcasted to the client in real-time.

• Immediate client connection status notification 

• Control over user's input type (text, password, date, month, time)

• 24 Background gifs or Enter Image URL to change Background

• Scripted Animations and css-effects (Tv-Off, Tv-On, Windows blue screen of death, glitches etc)

• Live CSS change input

• Extra layer that duplicates current BG image, for glitches using Blending modes, -Webkit-filters and transformations

• Prompt message. Changable font size and background.


## Technologies
Node.js
Express
Angular.js
Socket.io

## To launch locally
```
$ npm install
$ node index.js

```
Admin panel
`http://localhost:3000/admin.html`

Client
`http://localhost:3000/admin.html`
Initial pass – РJEK3-2LNBP-IIOD

Watcher(sees admin console, but has no control)
`http://localhost:3000/watch.html`

## Live demo

http://glit.chat – User
http://glit.chat/admin.html – admin
http://glit.chat/watch.html – Watcher(sees admin console, but has no control)


## To-do

• Support of multiple users.
• More glitches and animation
• Control UI for mobile. 
• Global UI controls for every user.
