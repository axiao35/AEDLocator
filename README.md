# AEDLocator Delivery Documentation

## Team JID-3100

### Our project involves creating a smartphone based application that allows the user to find the nearest automated external defibrillator (AED), contact medical professionals and provide mandatory training videos to improve reaction time to medical emergencies.

### Our tech stack will be using React Native for development and mongoDB for database management.

### This application is designed to allow a user to quickly access AED locating capabilities as quickly as possible with as little confusion on the front-end as possible. This is intended to allow easy navigation through the application. AED information will be stored using a mongoDB database.

# Release Notes
# Version 1.0.0
## Primary Features
#### All Users:
- User can use app to locate the nearest AED
  - App currently contains 211 AEDs on the Georgia Tech campus in Atlanta
  - Map view contains pins indicating the location of the nearest AEDs
  - If granted location access, users will see the map centered around their current location
  - Else, users can manually enter in a location into the search bar with autocomplete
  - Upon selecting to get directions for an AED, the user is redirected to Google Maps to receive navigation instructions
- User can directly call 911 through a button
- User can view basic life support instructions
  - This includes the following:
    - Prompt recognition of cardiac arrest
    - Signs of life from the victim
    - Call for urgent medical assistance
- User can view videos with instructions for how to use an AED
#### Logged-in Users:
- Users can create a personal account and login with their email and password
- User can track the progress they have made with watching training videos
- User can update their personal information in their account
  - This includes updating email and password
- User can add emergency contacts to their account profile
  - User can call emergency contacts
  - User can update emergency contact information
- User can add/modify the AED information stored in the database
  - User can add a new AED location with all the relevant information
  - User can update a pre-existing AED if the information is not accurate
- Error handling on features
  - User receives error message if an invalid email or password is entered
  - User must enter all required personal information while creating an account
  - The old email / old password must accurately match the user's current one when updating account information
  - All information fields must be filled when an emergency contact is added 

## Bug Fixes (discovered & fixed during development)
- Fixed buttons being not being consistently responsive to the user pressing them
- Fixed bug that double counted training progress for multiple videos
-   Fixed training progress bar so that it updates correctly
- Fixed login button not being reachable on home screen
- Fixed attempt to call ‘undefined’ if no emergency contact was available in the user's information
- Fixed duplicate email glitch on back-end
- Fixed user flow
  - User home page can only be accessed after the user successfully logs in
  - User specific features cannot be accessed without logging in
  - Logged-in user has access to all logged-out features on their home page along with logged-in features
- Fixed search bar bug (input bars update accordingly with user inputs)
- Fixed user being able enter in their current email as 'new email' while updating account information

## Known Bugs and Defects
- App currently does not send out notifcations
  - Need Apple Developer account to push notifications to IOS devices

# Install Guide
### Pre-requisites
- Have JDK installed and configured before proceeding (see https://docs.oracle.com/en/java/javase/20/install/installation-jdk-microsoft-windows-platforms.html#GUID-A7E27B90-A28D-4237-9383-A58B416071CA)
- Install Git on your operating system (see https://github.com/git-guides/install-git)

### Dependencies
- Install all necessary dependencies for React Native (for all sub-bullets under this, see https://reactnative.dev/docs/environment-setup?guide=native)
  - Install Homebrew (see https://brew.sh/)
    - Use Homebrew to install Node and Watchman
      - ```brew install node```
      - ```brew install watchman```
    - If you already have Node, make sure it is version 16 or newer
  - Install Xcode from the Mac App Store (this contains an iOS simulator)
    -  Version 10 or newer is needed
  - Install the Xcode Command Line Tools
    - In Xcode, choose Settings or Preferences from the menu
    - At the Locations panel, install the tools by selecting the most recent version in the Command Line Tools dropdown
  - Install a simulator
    - Open Xcode, then Settings (or Preferences)
    - Select the Platforms (or Components) tab
    - Select a simulator with the corresponding version of iOS you are using
  - Install CocoaPods, a dependency management system for iOS (see https://guides.cocoapods.org/using/getting-started.html)
- Install the Expo Go app on your phone (see https://expo.dev/client)

### Download Instructions
- Clone the repository onto your computer
  - In your terminal, make sure to be in whichever folder you wish the project to be contained in
    - Run the commmand ```git clone https://github.gatech.edu/bjameson7/JID-3100-AEDLocator.git``` in your terminal
    - Run ``` git pull origin main ``` if any new updates have been added

### Build/Installation Instructions
- If you see 'invalid active developer path', refer to the troubleshooting section
- In your terminal, run the following commands:
  - Make sure you are in the main repository folder before running the commands (folder name: JID-3100-AEDLocator)
  - ```npm install```
  - ```npm add expo```
- If you see the following message: 'Failed to resolve plugin on an uninstalled package', refer to the troubleshooting section

### Run Instructions
- Run the following commands:
  - ```cd aed-loc```
  - ```npx expo start```
  - Scan the QR code that appears with your phone to open the app in Expo Go
    - You can also follow any of the instructions that pop-up under the QR code to open in a different simulator
  - If you would like to access the database (hosted on mongodb) for viewing or further development, please contact Ethan (ethandilley68@gmail.com)

### Troubleshooting
- If in the build step,you see the following message: 'invalid active developer path'
  - If you just updated to MacOS Ventura or if xcode is not already installed
    - Run ```xcode-select --install```
- If in the build step, you see the following message: 'Failed to resolve plugin on an uninstalled package'
  - Run ```npm cache clean --force``` and ```npm install```

# Previous Release Notes
# Version 0.4.0
## Features
- Address Autocomplete for AED Placement
- AED Training Status Notification
- Redesign of User Home Screen
- Redesign of Landing Screen
- AED Training Tracked for Logged-In Users
## Bug Fixes
- None
## Known Issues
- Need Apple Developer account to push notifications to IOS devices

# Version 0.3.0
## Features
- Navigation to Closest AED
- Retrieving User's Location
- Calling/Messaging of Emergency Contacts
- Calling of Emergency Services
- Display of 3 Closest AEDs
## Bug Fixes
- Fixed login button not being reachable on home screen
## Known Issues
- None

# Version 0.2.0
## Features
- Training Progress
- AED Pins on Map
- AED Location and Accessability
- Initialized Database
- Record and Report AEDs
- Database Created
## Bug Fixes
- Fixed bug that double counted training progress for multiple videos
## Known Issues
- None

# Version 0.1.0
## Features
- Home Page
- Map Page
- Login Page
- Create Account Page
## Bug Fixes
- None
## Known Issues
- None
