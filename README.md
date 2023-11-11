# AEDLocator

# Team JID-3100

# Our project involves creating a smartphone based application that allows the user to find the nearest automated external defibrillator (AED), contact medical professionals and provide mandatory training videos to improve reaction time to medical emergencies.

# Our tech stack will be using React Native for development and mongoDB for database management.

# This application is designed to allow a user to quickly access AED locating capabilities as quickly as possible with as little confusion on the front-end as possible. This is intended to allow easy navigation through the application. AED information will be stored using a mongoDB database.

# Set-up Instructions:
- run ``` git pull origin main ``` to get project
- (if just updated to MacOS Ventura, & see 'invalid active developer path', or if xcode is not already installed, run ```xcode-select --install```)
- ```npm install```
- ```npm add expo```
- ```cd aed-loc```
- ```npx expo start```
- if 'Failed to resolve plugin on an uninstalled package' error, ```npm cache clean --force``` & ```npm install```
- download expo on phone, scan QR on phone

# Version 0.3.0
## Features
### - Navigation to Closest AED
### - Retrieving User's Location
### - Calling/Messaging of Emergency Contacts
### - Calling of Emergency Services
### - Display of 3 Closest AEDs
## Bug Fixes
### - Fixed login button not being reachable on home screen
## Known Issues
### None

# Version 0.2.0
## Features
### - Training Progress
### - AED Pins on Map
### - AED Location and Accessability
### - Initialized Database
### - Record and Report AEDs
### - Database Created
## Bug Fixes
### - Fixed bug that double counted training progress for multiple videos
## Known Issues
### None

# Version 0.1.0
## Features
### - Home Page
### - Map Page
### - Login Page
### - Create Account Page
## Bug Fixes
### None
## Known Issues
### None
